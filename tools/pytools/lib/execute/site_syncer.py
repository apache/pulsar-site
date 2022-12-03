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

from constant import site_path
from execute import swagger_sorter


def execute(master: Path):
    main = master / 'site2'
    site = site_path()

    shutil.copytree(main / 'docs', site / 'docs', dirs_exist_ok=True)
    shutil.copytree(site / 'docs' / 'assets', site / 'static' / 'assets', dirs_exist_ok=True)
    shutil.rmtree(site / 'docs' / 'assets')

    main = main / 'website'
    shutil.copytree(main / 'versioned_docs', site / 'versioned_docs', dirs_exist_ok=True)
    shutil.copytree(main / 'versioned_sidebars', site / 'versioned_sidebars', dirs_exist_ok=True)
    shutil.copy2(main / 'sidebars.json', site / 'sidebars.json')
    shutil.copy2(main / 'versions.json', site / 'versions.json')
    shutil.copy2(main / 'releases.json', site / 'releases.json')

    shutil.copy2(
        main / 'pulsar-manager-release-notes.md',
        site / 'pulsar-manager' / 'pulsar-manager-release-notes.md')
    shutil.copy2(
        main / 'pulsar-manager-release.json',
        site / 'pulsar-manager' / 'pulsar-manager-release.json')
    shutil.copy2(
        main / 'pulsar-adapters-release.json',
        site / 'pulsar-manager' / 'pulsar-adapters-release.json')

    shutil.copytree(main / 'static' / 'swagger', site / 'static' / 'swagger', dirs_exist_ok=True)
    swagger_sorter.execute(site / 'static' / 'swagger')
