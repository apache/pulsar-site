#!/usr/bin/env python3

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
from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter
from pathlib import Path

from command import run, find_command, run_pipe
from constant import root_path
from execute import site_uploader, site_builder
from execute.site_uploader import Mode

if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument('--site-path', type=str, metavar='PATH', help='path to asf-site-next branch')
    parser.add_argument('--push', type=Mode, default=Mode.auto, choices=list(Mode), help='whether push to remote')
    args = parser.parse_args()

    git = find_command('git', msg="git is required")
    branch = 'asf-site-next'

    with tempfile.TemporaryDirectory() as cwd:
        if args.site_path is None:
            run(git, 'clone', '-b', branch, '--depth', '1', 'https://github.com/apache/pulsar-site', cwd=cwd)
            site = Path(cwd) / 'pulsar-site'
        else:
            site = Path(args.site_path)

        commit = run_pipe(git, 'rev-parse', '--short', 'HEAD', cwd=root_path()).read().strip()
        msg = f'Site updated at revision {commit}'

        site_builder.execute(site)
        site_uploader.execute(args.push, msg, site, branch)
