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

import base64
import json
import os
import re
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Set, Tuple

import requests

from constant import site_path

REPO = 'apache/pulsar-site'
API_ROOT = 'https://api.github.com'
PUBLISH_REF_FILE = '.publish-ref'
RELEASE_PULSAR_PATH = 'data/release-pulsar.js'
VTAG_VERSION_RE = re.compile(r'^\d+\.\d+\.x$')

# GitHub's compare API caps responses at 300 files / 250 commits. Beyond those
# thresholds the result is silently truncated, so we fall back to a full rebuild.
COMPARE_FILE_CAP = 300
COMPARE_COMMIT_CAP = 250

BUILD_ALL_RE = re.compile(r'BUILD_ALL_VERSION=([01])')
BUILD_VERSIONS_RE = re.compile(r'BUILD_VERSIONS=([0-9.x,]+)')


@dataclass
class ChangeSet:
    files: List[str] = field(default_factory=list)
    build_all: bool = False
    force_versions: Set[str] = field(default_factory=set)


def _auth_headers(token: str) -> dict:
    return {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    }


def _read_publish_ref(asf_site: Path) -> Optional[str]:
    ref_file = asf_site / PUBLISH_REF_FILE
    if not ref_file.is_file():
        return None
    sha = ref_file.read_text().strip()
    return sha or None


def _read_known_versions() -> Set[str]:
    """Return the set of versioned-docs branches from versions.json (the canonical source)."""
    return set(json.loads((site_path() / 'versions.json').read_text()))


def _fetch_release_pulsar_entries(sha: str, token: str) -> Optional[List[dict]]:
    """Fetch and parse data/release-pulsar.js at the given SHA into a list of entry dicts."""
    url = f'{API_ROOT}/repos/{REPO}/contents/{RELEASE_PULSAR_PATH}'
    try:
        resp = requests.get(url, headers=_auth_headers(token), params={'ref': sha}, timeout=30)
        resp.raise_for_status()
        payload = resp.json()
    except (requests.RequestException, ValueError) as e:
        print(f'failed to fetch {RELEASE_PULSAR_PATH}@{sha}: {e}')
        return None

    encoded = payload.get('content')
    if not encoded:
        print(f'no content field for {RELEASE_PULSAR_PATH}@{sha}')
        return None
    try:
        body = base64.b64decode(encoded).decode('utf-8')
    except (ValueError, UnicodeDecodeError) as e:
        print(f'failed to decode {RELEASE_PULSAR_PATH}@{sha}: {e}')
        return None

    # The file is `module.exports = [...]` where the array is valid JSON.
    start = body.find('[')
    end = body.rfind(']')
    if start < 0 or end < 0 or end <= start:
        print(f'could not locate JSON array in {RELEASE_PULSAR_PATH}@{sha}')
        return None
    try:
        entries = json.loads(body[start:end + 1])
    except json.JSONDecodeError as e:
        print(f'failed to parse {RELEASE_PULSAR_PATH}@{sha} as JSON: {e}')
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


def _release_pulsar_synthetic_paths(
    base_sha: str, head_sha: str, token: str
) -> Tuple[List[str], bool]:
    """Return (synthetic_paths, ok). When ok is False, caller should escalate to build_all.

    The returned paths are pseudo-arguments — never written to disk. They're appended to
    the file list whose substring matcher fires the corresponding versioned-docs build."""
    base_entries = _fetch_release_pulsar_entries(base_sha, token)
    head_entries = _fetch_release_pulsar_entries(head_sha, token)
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
    return [
        f'versioned_docs/version-{vtag}/' for vtag in rebuild
    ], True


def _parse_commit_directives(messages: Iterable[str]) -> Tuple[bool, Set[str]]:
    """Scan commit messages for BUILD_ALL_VERSION=1 / BUILD_VERSIONS=... directives.

    Returns (build_all, force_versions). Mirrors the regex behavior of the previous
    scripts/split-version-build.sh, but evaluates every commit in the range — not just HEAD."""
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


def compute_changed_files(
    asf_site: Path,
    head_sha: str,
    token: Optional[str],
) -> ChangeSet:
    """Compute the change set since the last successful publish.

    `build_all=True` signals the caller to rebuild every versioned-docs branch in
    versions.json. `force_versions` carries any explicit BUILD_VERSIONS=... selectors
    found in commit messages between .publish-ref and head_sha."""
    base_sha = _read_publish_ref(asf_site)
    if base_sha is None:
        print(f'{PUBLISH_REF_FILE} missing → full rebuild')
        return ChangeSet(build_all=True)

    if not token:
        if os.getenv('GITHUB_ACTIONS'):
            print('GITHUB_TOKEN not set in CI → full rebuild')
        else:
            print('no GITHUB_TOKEN (local run) → full rebuild')
        return ChangeSet(build_all=True)

    if base_sha == head_sha:
        print(f'{PUBLISH_REF_FILE} already at {head_sha} → no rebuild needed')
        return ChangeSet()

    url = f'{API_ROOT}/repos/{REPO}/compare/{base_sha}...{head_sha}'
    try:
        resp = requests.get(url, headers=_auth_headers(token), timeout=30)
        if resp.status_code == 404:
            print(f'compare {base_sha}...{head_sha} returned 404 → full rebuild')
            return ChangeSet(build_all=True)
        resp.raise_for_status()
        payload = resp.json()
    except (requests.RequestException, ValueError) as e:
        print(f'compare API failed: {e} → full rebuild')
        return ChangeSet(build_all=True)

    files = payload.get('files') or []
    total_commits = payload.get('total_commits', 0)
    if len(files) >= COMPARE_FILE_CAP or total_commits >= COMPARE_COMMIT_CAP:
        print(
            f'compare result truncated (files={len(files)}, commits={total_commits}) → full rebuild'
        )
        return ChangeSet(build_all=True)

    messages = [c.get('commit', {}).get('message', '') for c in payload.get('commits') or []]
    build_all, force_versions = _parse_commit_directives(messages)
    if build_all:
        print('BUILD_ALL_VERSION=1 found in a commit message → full rebuild')
    if force_versions:
        print(f'BUILD_VERSIONS commit directives → also build: {sorted(force_versions)}')

    changed = [f['filename'] for f in files if f.get('filename')]
    print(f'compare {base_sha[:12]}...{head_sha[:12]} → {len(changed)} changed file(s)')

    if RELEASE_PULSAR_PATH in changed:
        synthetic, ok = _release_pulsar_synthetic_paths(base_sha, head_sha, token)
        if not ok:
            print(f'failed to resolve {RELEASE_PULSAR_PATH} vtag diff → full rebuild')
            return ChangeSet(build_all=True)
        changed.extend(synthetic)

    return ChangeSet(files=changed, build_all=build_all, force_versions=force_versions)
