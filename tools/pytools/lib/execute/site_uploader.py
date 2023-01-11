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
from pathlib import Path

from command import run, find_command, run_pipe


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


def _do_push(msg: str, site: Path, branch: str):
    git = find_command('git', msg="git is required")

    run(git, 'add', '-A', '.', cwd=site)
    changed = run(git, 'diff-index', '--quiet', 'HEAD', codes={0, 1}).returncode
    print(f'changed: {changed}')

    run(git, 'status', cwd=site)
    run(git, 'remote', '-v', cwd=site)
    if os.getenv('GITHUB_ACTIONS') is not None:
        if os.getenv('GITHUB_EVENT_NAME') != 'schedule':
            name = os.getenv('GITHUB_ACTOR')
            email = f'{name}@users.noreply.github.com'
        else:
            name = 'github-actions[bot]'
            email = f'41898282+{name}@users.noreply.github.com'
        print(f'config with name: {name}, email: {email}')
        run(git, 'config', 'user.name', name, cwd=site)
        run(git, 'config', 'user.email', email, cwd=site)
    if changed != 0:
        run(git, 'commit', '-m', msg, cwd=site)
        run(git, 'push', 'origin', branch, cwd=site)


def execute(mode: Mode, msg: str, site: Path, branch: str):
    if _should_push(mode):
        _do_push(msg, site, branch)
    else:  # show changes
        git = find_command('git', msg="git is required")
        change_files = run_pipe(git, 'status', '--porcelain', cwd=site).read().strip()
        print(f'\nchange files:\n{change_files}\n')
