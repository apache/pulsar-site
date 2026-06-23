# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

"""Decide which versioned-docs branches need rebuilding for a publish.

The change set is computed from a local ``git diff`` so there is no upper bound on
the number of changed files (the GitHub compare API silently truncates at 300 files,
which made dependency bumps and batches of cancelled-then-accumulated commits escalate
to a full rebuild of every version).

Two scenarios:

* **Publish** (push to ``main``): diff ``.publish-ref`` (the last successfully published
  source SHA, stored in the ``asf-site-next`` branch) against ``HEAD``. The CI checkout
  is shallow, so the local history usually doesn't reach back to ``.publish-ref``; we
  size a single ``git fetch --deepen`` from the compare API's ``total_commits`` so we
  fetch only the commits since the last publish — never the whole (large) history.

* **Precommit** (``pull_request``): it's enough to inspect the PR's own commits. The
  default ``pull_request`` checkout is the merge ref, whose first parent (``HEAD^1``) is
  the base branch, so ``HEAD^1..HEAD`` is exactly the PR diff — available at depth 2,
  with no token and no ``.publish-ref``.
"""

import json
import os
import re
import subprocess
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

import requests

from constant import root_path, site_path

REPO = 'apache/pulsar-site'
API_ROOT = 'https://api.github.com'
PUBLISH_REF_FILE = '.publish-ref'
RELEASE_PULSAR_PATH = 'data/release-pulsar.js'
VTAG_VERSION_RE = re.compile(r'^\d+\.\d+\.x$')

# The compare API counts at most this many commits. Beyond it we can't size the
# shallow fetch reliably, so we fall back to a full rebuild.
COMPARE_COMMIT_CAP = 250

BUILD_ALL_RE = re.compile(r'BUILD_ALL_VERSION=([01])')
BUILD_VERSIONS_RE = re.compile(r'BUILD_VERSIONS=([0-9.x,]+)')


@dataclass
class ChangeSet:
    files: List[str] = field(default_factory=list)
    build_all: bool = False
    force_versions: Set[str] = field(default_factory=set)


# --- git helpers (operate on the source checkout at root_path) ---

def _git(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(
        ['git', *args], cwd=str(root_path()), capture_output=True, text=True
    )


def _is_ancestor(ancestor: str, descendant: str) -> bool:
    return _git('merge-base', '--is-ancestor', ancestor, descendant).returncode == 0


def _is_shallow() -> bool:
    return _git('rev-parse', '--is-shallow-repository').stdout.strip() == 'true'


def _first_parent(sha: str) -> Optional[str]:
    res = _git('rev-parse', '--verify', '--quiet', f'{sha}^1')
    out = res.stdout.strip()
    return out if res.returncode == 0 and out else None


def _changed_in_range(base: str, head: str) -> List[str]:
    res = _git('diff', '--name-only', base, head)
    if res.returncode != 0:
        raise RuntimeError(f'git diff {base}..{head} failed: {res.stderr.strip()}')
    return [line.strip() for line in res.stdout.splitlines() if line.strip()]


def _range_messages(base: str, head: str) -> str:
    res = _git('log', '--format=%B', f'{base}..{head}')
    return res.stdout if res.returncode == 0 else ''


# --- shallow deepening, sized via the compare API ---

def _auth_headers(token: str) -> dict:
    return {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    }


def _compare_total_commits(base: str, head: str, token: str) -> Optional[int]:
    """Number of commits in base..head per the GitHub compare API, or None on error."""
    url = f'{API_ROOT}/repos/{REPO}/compare/{base}...{head}'
    try:
        resp = requests.get(url, headers=_auth_headers(token), timeout=30)
        if resp.status_code == 404:
            print(f'compare {base[:12]}...{head[:12]} → 404')
            return None
        resp.raise_for_status()
        return int(resp.json().get('total_commits', 0))
    except (requests.RequestException, ValueError) as e:
        print(f'compare API failed: {e}')
        return None


def _ensure_base_reachable(base: str, head: str, token: Optional[str]) -> bool:
    """Make ``base`` an ancestor of ``head`` in the local clone, deepening only as far
    as the last publish ref. The compare API sizes the fetch so a large repo's full
    history is never pulled."""
    if _is_ancestor(base, head):
        return True
    if not _is_shallow():
        # Full clone yet base isn't an ancestor → history was rewritten/force-pushed.
        return False
    if not token:
        print('GITHUB_TOKEN not set → cannot size shallow fetch')
        return False
    total = _compare_total_commits(base, head, token)
    if total is None:
        return False
    if total >= COMPARE_COMMIT_CAP:
        print(f'{total}+ commits since last publish (compare cap) → full rebuild')
        return False
    # Deepen by the exact distance (plus a small margin) to reach the publish ref.
    _git('fetch', f'--deepen={total + 2}', 'origin')
    return _is_ancestor(base, head)


def _read_publish_ref(asf_site: Path) -> Optional[str]:
    ref_file = asf_site / PUBLISH_REF_FILE
    if not ref_file.is_file():
        return None
    sha = ref_file.read_text().strip()
    return sha or None


def _read_known_versions() -> Set[str]:
    """Return the set of versioned-docs branches from versions.json (the canonical source)."""
    return set(json.loads((site_path() / 'versions.json').read_text()))


# --- release-pulsar.js vtag diff (read both trees locally) ---

def _read_release_pulsar_entries_at(sha: str) -> Optional[List[dict]]:
    """Read and parse data/release-pulsar.js at the given SHA into a list of entry dicts."""
    res = _git('show', f'{sha}:{RELEASE_PULSAR_PATH}')
    if res.returncode != 0:
        print(f'failed to read {RELEASE_PULSAR_PATH}@{sha[:12]}: {res.stderr.strip()}')
        return None
    body = res.stdout
    # The file is `module.exports = [...]` where the array is valid JSON.
    start = body.find('[')
    end = body.rfind(']')
    if start < 0 or end < 0 or end <= start:
        print(f'could not locate JSON array in {RELEASE_PULSAR_PATH}@{sha[:12]}')
        return None
    try:
        entries = json.loads(body[start:end + 1])
    except json.JSONDecodeError as e:
        print(f'failed to parse {RELEASE_PULSAR_PATH}@{sha[:12]} as JSON: {e}')
        return None
    if not isinstance(entries, list):
        return None
    return entries


def _group_by_vtag(entries: List[dict]) -> Dict[str, Set[Tuple]]:
    """Group entries by vtag. Each entry becomes a frozen tuple of sorted items so we can
    diff them as set members. Vtags that aren't of the form X.Y.x are skipped — they refer
    to legacy per-patch versions for which there's no versioned_docs/version-* directory."""
    grouped: Dict[str, Set[Tuple]] = defaultdict(set)
    for entry in entries:
        vtag = entry.get('vtag')
        if not isinstance(vtag, str) or not VTAG_VERSION_RE.match(vtag):
            continue
        grouped[vtag].add(tuple(sorted(entry.items())))
    return grouped


def _release_pulsar_synthetic_paths(base: str, head: str) -> Tuple[List[str], bool]:
    """Return (synthetic_paths, ok). When ok is False, caller should escalate to build_all.

    The returned paths are pseudo-arguments — never written to disk. They're appended to
    the file list whose substring matcher fires the corresponding versioned-docs build."""
    base_entries = _read_release_pulsar_entries_at(base)
    head_entries = _read_release_pulsar_entries_at(head)
    if base_entries is None or head_entries is None:
        return [], False

    base_grouped = _group_by_vtag(base_entries)
    head_grouped = _group_by_vtag(head_entries)

    affected = {
        vtag for vtag in base_grouped.keys() | head_grouped.keys()
        if base_grouped.get(vtag, set()) != head_grouped.get(vtag, set())
    }
    if not affected:
        return [], True

    known = _read_known_versions()
    rebuild = sorted(affected & known)
    skipped = sorted(affected - known)
    if rebuild:
        print(f'release-pulsar.js changes → rebuild versions: {rebuild}')
    if skipped:
        print(f'release-pulsar.js changes (unknown versions, skipped): {skipped}')
    return [f'versioned_docs/version-{vtag}/' for vtag in rebuild], True


def _parse_commit_directives(messages) -> Tuple[bool, Set[str]]:
    """Scan commit messages for BUILD_ALL_VERSION=1 / BUILD_VERSIONS=... directives.

    Returns (build_all, force_versions). Evaluates every commit in the range, not just HEAD."""
    build_all = False
    force_versions: Set[str] = set()
    for msg in messages:
        if not msg:
            continue
        if any(m.group(1) == '1' for m in BUILD_ALL_RE.finditer(msg)):
            build_all = True
        for match in BUILD_VERSIONS_RE.finditer(msg):
            for v in match.group(1).split(','):
                v = v.strip()
                if v:
                    force_versions.add(v)
    return build_all, force_versions


def full_build_paths() -> List[str]:
    return [
        f'versioned_docs/version-{v}/'
        for v in sorted(_read_known_versions())
    ]


def _changeset_from_range(base: str, head: str) -> ChangeSet:
    """Build a ChangeSet from the local diff of base..head."""
    changed = _changed_in_range(base, head)
    print(f'changed files {base[:12]}..{head[:12]}: {len(changed)}')

    build_all, force_versions = _parse_commit_directives([_range_messages(base, head)])
    if build_all:
        print('BUILD_ALL_VERSION=1 found in a commit message → full rebuild')
    if force_versions:
        print(f'BUILD_VERSIONS commit directives → also build: {sorted(force_versions)}')

    if RELEASE_PULSAR_PATH in changed:
        synthetic, ok = _release_pulsar_synthetic_paths(base, head)
        if not ok:
            print(f'failed to resolve {RELEASE_PULSAR_PATH} vtag diff → full rebuild')
            return ChangeSet(build_all=True)
        changed.extend(synthetic)

    return ChangeSet(files=changed, build_all=build_all, force_versions=force_versions)


def compute_changed_files(
    asf_site: Path,
    head_sha: str,
    token: Optional[str] = None,
) -> ChangeSet:
    """Compute the change set that drives which versioned-docs branches get rebuilt.

    `build_all=True` signals the caller to rebuild every versioned-docs branch in
    versions.json. `force_versions` carries any explicit BUILD_VERSIONS=... selectors
    found in commit messages in the range."""
    # Precommit: it's enough to inspect the PR's own commits (HEAD^1..HEAD).
    if os.getenv('GITHUB_EVENT_NAME') == 'pull_request':
        base = _first_parent(head_sha)
        if base is None:
            print('PR base (HEAD^1) unavailable → full rebuild')
            return ChangeSet(build_all=True)
        print(f'pull_request: diffing PR range {base[:12]}..{head_sha[:12]}')
        return _changeset_from_range(base, head_sha)

    # Publish: diff since the last successful publish.
    base = _read_publish_ref(asf_site)
    if base is None:
        print(f'{PUBLISH_REF_FILE} missing → full rebuild')
        return ChangeSet(build_all=True)
    if base == head_sha:
        print(f'{PUBLISH_REF_FILE} already at {head_sha[:12]} → no rebuild needed')
        return ChangeSet()
    if not _ensure_base_reachable(base, head_sha, token):
        print(f'last publish ref {base[:12]} not reachable from {head_sha[:12]} → full rebuild')
        return ChangeSet(build_all=True)
    return _changeset_from_range(base, head_sha)
