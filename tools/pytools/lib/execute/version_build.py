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

"""Per-version Docusaurus build orchestrator.

Replaces the legacy ``scripts/split-version-build.sh`` + ``scripts/split-version.js``
pair: reads versions.json directly, decides which versions to build based on the
ChangeSet, runs ``yarn build`` once per included version, and assembles
``build/docs/`` from the per-version outputs."""

import json
import shutil
from pathlib import Path
from typing import List

from command import find_command, run
from constant import site_path
from execute.changed_files import ChangeSet


def _should_build(bv: str, change_set: ChangeSet) -> bool:
    if bv == 'next':
        return True
    if change_set.build_all:
        return True
    if bv in change_set.force_versions:
        return True
    needle = f'versioned_docs/version-{bv}/'
    return any(needle in f for f in change_set.files)


def _write_build_versions(site: Path, build_versions: List[str]) -> None:
    (site / '.build-versions.json').write_text(json.dumps(build_versions) + '\n')


def _move_tree(src: Path, dst: Path) -> None:
    """Replace dst with src. dst is removed first if it exists."""
    if dst.exists():
        if dst.is_dir():
            shutil.rmtree(dst)
        else:
            dst.unlink()
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(src), str(dst))


def _merge_tree(src: Path, dst: Path) -> None:
    """Copy src/* into dst/, creating dst if needed. Files in dst are overwritten."""
    dst.mkdir(parents=True, exist_ok=True)
    for child in src.iterdir():
        target = dst / child.name
        if child.is_dir():
            shutil.copytree(child, target, dirs_exist_ok=True)
        else:
            shutil.copy2(child, target)


def execute(change_set: ChangeSet) -> None:
    """Build every required version into a single ``build/`` tree.

    The flow mirrors what split-version-build.sh did, just in Python:
    1. Iterate ``versions[1:] + ["next"]`` (latest is built as part of "next").
    2. For each included version, write ``.build-versions.json`` and run ``yarn build``.
       Each yarn build OVERWRITES ``build/`` — so we stash per-version output to
       ``build-{v}/`` and accumulated assets to ``build-assets/`` between runs.
    3. After the loop, fold every ``build-{v}/*`` back into ``build/docs/`` and
       merge ``build-assets/*`` into ``build/assets/``. Copy ``static/.htaccess``
       into ``build/`` (Docusaurus copies the rest of static/ but skips dot-files).

    The ``next`` iteration always runs (with ``buildVersions=["current", latest]``);
    its output places the latest version's docs under ``build/docs/{latest}/`` and
    the "current" docs under ``build/docs/next/`` (per ``versionsMap.current.path``
    in docusaurus.config.ts)."""
    site = site_path()
    yarn = find_command('yarn', msg='yarn is required')

    versions: List[str] = json.loads((site / 'versions.json').read_text())
    if not versions:
        raise RuntimeError('versions.json is empty')
    latest = versions[0]
    iter_versions = versions[1:] + ['next']

    build_dir = site / 'build'
    assets_stash = site / 'build-assets'

    for bv in iter_versions:
        if not _should_build(bv, change_set):
            print(f'... {bv} no change, skip')
            continue

        if bv == 'next':
            print(f'... {bv} and {latest} begin build...')
            _write_build_versions(site, ['current', latest])
        else:
            print(f'... {bv} begin build...')
            _write_build_versions(site, [bv])

        run(yarn, 'build', cwd=site)

        # bv == latest never happens here (latest is excluded from iter_versions),
        # so we always stash. Stashing the per-version subtree lets the next yarn
        # build overwrite build/ without losing what we just produced.
        built_subdir = build_dir / 'docs' / bv
        if not built_subdir.is_dir():
            raise RuntimeError(f'expected {built_subdir} after yarn build, not found')
        stash_root = site / f'build-{bv}'
        stash_subdir = stash_root / bv
        if stash_root.exists():
            shutil.rmtree(stash_root)
        stash_subdir.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(built_subdir), str(stash_subdir))

        assets_src = build_dir / 'assets'
        if assets_src.is_dir():
            _merge_tree(assets_src, assets_stash)

        print(f'... {bv} build done...')

    # Fold per-version stashes back under build/docs/.
    for bv in iter_versions:
        stash_root = site / f'build-{bv}'
        if not stash_root.is_dir():
            continue
        for child in stash_root.iterdir():
            _move_tree(child, build_dir / 'docs' / child.name)
        shutil.rmtree(stash_root)

    if assets_stash.is_dir():
        _merge_tree(assets_stash, build_dir / 'assets')
        shutil.rmtree(assets_stash)

    htaccess_src = site / 'static' / '.htaccess'
    if htaccess_src.is_file():
        shutil.copy2(htaccess_src, build_dir / '.htaccess')
