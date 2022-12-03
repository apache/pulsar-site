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

import enum
import os
import tempfile
from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter
from pathlib import Path

from command import run, find_command, run_pipe
from constant import root_path
from execute import site_syncer


class Mode(enum.Enum):
    y = 'y'
    n = 'n'
    auto = 'auto'


def _should_push(mode: Mode) -> bool:
    match mode:
        case Mode.y:
            return True
        case Mode.n:
            return False
        case Mode.auto:
            repo = os.getenv('GITHUB_REPOSITORY')
            event = os.getenv('GITHUB_EVENT_NAME')
            print(f'repo={repo}, event={event}')

            result = (repo is not None) and (repo == 'apache/pulsar')
            result = result and (event is not None) and (event != 'pull_request')
            return result


def _do_push(main: Path, site: Path):
    _git = find_command('git', msg="git is required")
    commit = run_pipe(_git, 'rev-parse', '--short', 'HEAD', cwd=main).read().strip()
    run(_git, 'add', '-A', '.', cwd=site)
    run(_git, 'status', cwd=site)
    run(_git, 'remote', '-v', cwd=site)
    run(_git, 'commit', '--allow-empty', '-m', f'Docs sync done from apache/pulsar (#{commit})', cwd=site)
    run(_git, 'push', 'origin', 'main', cwd=site)


if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument('--master-path', type=str, metavar='PATH', help='path to pulsar main repo')
    parser.add_argument('--push', type=Mode, default=Mode.auto, choices=list(Mode), help='whether push to remote')

    args = parser.parse_args()

    with tempfile.TemporaryDirectory() as cwd:
        if args.master_path is None:
            git = find_command('git', msg="git is required")
            run(git, 'clone', '-b', 'master', '--depth', '1', 'https://github.com/apache/pulsar', cwd=cwd)
            master = Path(cwd) / 'pulsar'
        else:
            master = Path(args.master_path)

        site_syncer.execute(master)
        if _should_push(args.push):
            _do_push(master, root_path())
