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
import tempfile
from pathlib import Path

from command import find_command, run
from constant import site_path


def execute(asf_site: Path):
    # 1. Get modified files
    git = find_command('git', msg="git is required")
    with tempfile.TemporaryFile('w+') as f:
        run(git, 'diff', '--name-only', 'HEAD~1', 'HEAD', stdout=f, cwd=site_path())
        f.seek(0)
        modified_files = f.read().splitlines()
    for file in modified_files:
        print(f"{file} was modified")

    # # 2. Install and build
    yarn = find_command('yarn', msg="yarn is required")
    node = find_command('node', msg="node is required")
    bash = find_command('bash', msg="bash is required")
    run(yarn, '--version', cwd=site_path())
    run(yarn, 'install', '--immutable', cwd=site_path())
    run(node, 'scripts/replace.js', cwd=site_path())
    run(bash, 'scripts/split-version-build.sh', *modified_files, cwd=site_path())
    latest_content = site_path() / 'build'

    # 3. Publish content to asf-site-next branch
    published_content = asf_site / 'content'
    if not published_content.exists():
        published_content.mkdir(parents=True, exist_ok=True)

    is_build_all = (site_path() / 'scripts' / '.build').read_text().strip()
    is_build_all = is_build_all == "1"
    print(f'is_build_all: {is_build_all}')
    if is_build_all:
        whitelist = ['api', 'charts']
        old_files = [f for f in published_content.glob('*') if f.name not in whitelist]
        print(f'clean all the old content： {list(map(str, old_files))}')
        for old_file in old_files:
            if old_file.is_dir():
                shutil.rmtree(old_file)
            else:
                old_file.unlink()

    shutil.copytree(latest_content, published_content, dirs_exist_ok=True)
