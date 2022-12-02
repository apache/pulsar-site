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


def execute(dry_run: bool):
    git = find_command('git', msg="git is required")

    with tempfile.TemporaryDirectory() as cwd:
        print(f"cwd={cwd} dry_run={dry_run}")
        run(git, 'clone', '-b', 'main', '--depth', '1', 'https://github.com/apache/pulsar-site', cwd=cwd)
        run(git, 'clone', '-b', 'master', '--depth', '1', 'https://github.com/apache/pulsar', cwd=cwd)
        main = Path(cwd) / 'pulsar' / 'site2'
        site = Path(cwd) / 'pulsar-site' / 'site2' / 'website-next'
        shutil.move(main / 'docs', site / 'docs')
        shutil.move(site / 'docs' / 'assets', site / 'static' / 'assets')

        main = main / 'website'
        shutil.move(main / 'versioned_docs', site / 'versioned_docs')
        shutil.move(main / 'versioned_sidebars', site / 'versioned_sidebars')
        shutil.move(main / 'sidebars.json', site / 'sidebars.json')
        shutil.move(main / 'versions.json', site / 'versions.json')
        shutil.move(main / 'releases.json', site / 'releases.json')

        shutil.move(
            main / 'pulsar-manager-release-notes.md',
            site / 'pulsar-manager' / 'pulsar-manager-release-notes.md')
        shutil.move(
            main / 'pulsar-manager-release.json',
            site / 'pulsar-manager' / 'pulsar-manager-release.json')
        shutil.move(
            main / 'pulsar-adapters-release.json',
            site / 'pulsar-manager' / 'pulsar-adapters-release.json')

        shutil.move(main / 'static' / 'swagger', site / 'static' / 'swagger')

        input()


if __name__ == '__main__':
    execute(True)
