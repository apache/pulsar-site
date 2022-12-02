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

import semver
from command import find_command, run
from constant import site_path, pytools_path


def execute(version: str):
    git = find_command('git', msg="git is required")
    poetry = find_command('poetry', msg="poetry is required")

    ver = semver.VersionInfo.parse(version)
    assert ver.compare('3.0.0') >= 0

    tmpdir = (Path(pytools_path()) / 'tmp').absolute()
    with tempfile.TemporaryDirectory(dir=tmpdir) as cwd:
        v = f"{ver.major}.{ver.minor}.x"
        tag = f"v{ver.major}.{ver.minor}.{ver.patch}"
        remote = 'https://github.com/apache/pulsar-client-python'
        run(git, 'clone', '--depth=1', '--single-branch', f'--branch={tag}', remote, cwd=cwd)
        options = [
            'run', 'pydoctor',
            '--make-html',
            f'--html-viewsource-base=https://github.com/apache/pulsar-client-python/tree/{tag}',
            '--docformat=numpy', '--theme=readthedocs',
            '--intersphinx=https://docs.python.org/3/objects.inv',
            f'--html-output={site_path()}/static/api/python/{v}',
            f'{cwd}/pulsar-client-python/pulsar'
        ]
        run(poetry, *options)
