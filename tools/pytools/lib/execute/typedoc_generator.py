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

import semver

from command import find_command, run
from constant import site_path


def execute(version: str):
    git = find_command('git', msg="git is required")
    npm = find_command('npm', msg="npm is required")
    npx = find_command('npx', msg="npx is required")

    ver = semver.VersionInfo.parse(version)
    assert ver.compare('1.8.1') > 0

    with tempfile.TemporaryDirectory() as cwd:
        tag = f"v{ver}"
        remote = 'https://github.com/apache/pulsar-client-node'
        run(git, 'clone', '--depth=1', '--single-branch', f'--branch={tag}', remote, cwd=cwd)

        d = (Path(cwd) / 'pulsar-client-node').absolute()
        run(npm, 'i', '-D', '@types/node', cwd=d)
        run(npx, 'typedoc', cwd=d)

        v = f"{ver.major}.{ver.minor}.x"
        dst = site_path() / 'static' / 'api' / 'js' / v
        shutil.copytree(d / 'apidocs', dst)
