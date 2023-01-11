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


class Mode(enum.Enum):
    y = 'y'
    n = 'n'
    auto = 'auto'


def _should_push(mode: Mode) -> bool:
    if mode != Mode.auto:
        return mode != Mode.n

    repo = os.getenv('GITHUB_REPOSITORY')
    event = os.getenv('GITHUB_EVENT_NAME')
    print(f'repo={repo}, event={event}')

    result = (repo is not None) and (repo == 'apache/pulsar-site')
    result = result and (event is not None) and (event != 'pull_request')
    return result


git = find_command('git', msg="git is required")


def _do_push(site: Path, asf_site: Path):
    commit = run_pipe(git, 'rev-parse', '--short', 'HEAD', cwd=site).read().strip()
    run(git, 'add', '-A', '.', cwd=asf_site)
    run(git, 'status', cwd=asf_site)
    run(git, 'remote', '-v', cwd=asf_site)
    if os.getenv('GITHUB_ACTIONS') is not None:
        if os.getenv('GITHUB_EVENT_NAME') != 'schedule':
            name = os.getenv('GITHUB_ACTOR')
            email = f'{name}@users.noreply.github.com'
        else:
            name = 'github-actions[bot]'
            email = f'41898282+{name}@users.noreply.github.com'
        run(git, 'config', 'user.name', name, cwd=asf_site)
        run(git, 'config', 'user.email', email, cwd=asf_site)
    changed = run_pipe(git, 'status', '--porcelain', cwd=asf_site).read().strip()
    if len(changed) != 0:
        run(git, 'commit', '-m', f'Docs sync done from apache/pulsar (#{commit})', cwd=asf_site)
        run(git, 'push', 'origin', 'main', cwd=asf_site)


if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument('--asf-site-path', type=str, metavar='PATH', help='path to pulsar-site asf-site-next branch')
    parser.add_argument('--push', type=Mode, default=Mode.auto, choices=list(Mode), help='whether push to remote')

    args = parser.parse_args()

    with tempfile.TemporaryDirectory() as cwd:
        if args.asf_site_path is None:
            run(git, 'clone', '-b', 'asf-site-next', '--depth', '1', 'https://github.com/apache/pulsar-site', cwd=cwd)
            asf_site_path = Path(cwd) / 'pulsar-site'
        else:
            asf_site_path = Path(args.asf_site_path)

        if _should_push(args.push):
            _do_push(root_path(), asf_site_path)
        else:  # show changes
            change_files = run_pipe(git, 'status', '--porcelain', cwd=asf_site_path).read().strip()
            print(f'\nchange files:\n{change_files}\n')
