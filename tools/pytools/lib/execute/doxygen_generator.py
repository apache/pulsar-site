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

import tempfile
from pathlib import Path

import requests
import semver
from command import find_command, run
from constant import site_path


def execute(version: str):
    git = find_command('git', msg="git is required")
    doxygen = find_command('doxygen', msg="doxygen is required")
    ver = semver.VersionInfo.parse(version)

    resp = requests.get('https://raw.githubusercontent.com/apache/pulsar-client-cpp/main/Doxyfile')
    assert resp.status_code == 200
    config = resp.text
    config += f"\nOUTPUT_DIRECTORY={site_path()}/static/api/cpp\n"
    config += f"\nHTML_OUTPUT={ver.major}.{ver.minor}.x\n"

    with tempfile.TemporaryDirectory() as cwd:
        tag = f"v{ver.major}.{ver.minor}.{ver.patch}"
        if ver.compare("3.0.0") < 0:
            remote = 'https://github.com/apache/pulsar'
            d = (Path(cwd) / 'pulsar' / 'pulsar-client-cpp').absolute()
        else:
            remote = 'https://github.com/apache/pulsar-client-cpp'
            d = (Path(cwd) / 'pulsar-client-cpp').absolute()
        run(git, 'clone', '--depth=1', '--single-branch', f'--branch={tag}', remote, cwd=cwd)
        with tempfile.NamedTemporaryFile(mode='w+') as f:
            f.write(config)
            f.flush()
            run(doxygen, f.name, cwd=d)
