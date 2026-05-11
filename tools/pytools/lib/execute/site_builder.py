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

import shutil
from pathlib import Path
from typing import Optional

from command import find_command, run
from constant import site_path
from execute import version_build
from execute.changed_files import ChangeSet, compute_changed_files, full_build_paths


def execute(asf_site: Path, head_sha: str, token: Optional[str]):
    # Compute the change set vs. the last successful publish (.publish-ref in asf-site-next).
    # The CI workflow checks out main with fetch-depth=2, so a local `git diff` cannot span
    # more than the most recent commit; the GitHub compare API is the source of truth.
    change_set = compute_changed_files(asf_site, head_sha, token)
    if change_set.build_all:
        change_set = ChangeSet(
            files=full_build_paths(),
            build_all=True,
            force_versions=change_set.force_versions,
        )
    for file in change_set.files:
        print(f'{file} was modified')
    if change_set.force_versions:
        print(f'forced versions from commit messages: {sorted(change_set.force_versions)}')

    yarn = find_command('yarn', msg='yarn is required')
    run(yarn, 'install', cwd=site_path())
    version_build.execute(change_set)
    # Expand @pulsar:...@ tokens and rewrite `pathname:///` in the Docsify
    # reference site (build/reference/), which Docusaurus copies verbatim
    # from static/ and so isn't touched by the markdown preprocessor pipeline.
    run(yarn, 'process-reference-markdown', cwd=site_path())
    latest_content = site_path() / 'build'

    published_content = asf_site / 'content'
    if not published_content.exists():
        published_content.mkdir(parents=True, exist_ok=True)

    print(f'is_build_all: {change_set.build_all}')
    if change_set.build_all:
        whitelist = ['api', 'charts']
        old_files = [f for f in published_content.glob('*') if f.name not in whitelist]
        print(f'clean all the old content： {list(map(str, old_files))}')
        for old_file in old_files:
            if old_file.is_dir():
                shutil.rmtree(old_file)
            else:
                old_file.unlink()

    shutil.copytree(latest_content, published_content, dirs_exist_ok=True)
