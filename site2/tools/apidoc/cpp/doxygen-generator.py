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

from argparse import ArgumentDefaultsHelpFormatter, ArgumentParser
from pathlib import Path
import re
from subprocess import PIPE, Popen
import sys
import tempfile
from typing import Any, Optional, TextIO


SEMVER_REGEX = re.compile(
    r"""
        ^
        (?P<major>0|[1-9]\d*)
        \.
        (?P<minor>0|[1-9]\d*)
        \.
        (?P<patch>0|[1-9]\d*)
        (?:-(?P<prerelease>
            (?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)
            (?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*
        ))?
        (?:\+(?P<build>
            [0-9a-zA-Z-]+
            (?:\.[0-9a-zA-Z-]+)*
        ))?
        $
    """,
    re.VERBOSE,
)

def run(*args: str, msg: Optional[str] = None, verbose: bool = False, **kwargs: Any) -> Popen:
    sys.stdout.flush()
    if verbose:
        print(f"$ {' '.join(args)}")

    p = Popen(args, **kwargs)
    code = p.wait()
    if code != 0:
        err = f"\nfailed to run: {args}\nexit with code: {code}\n"
        if msg:
            err += f"error message: {msg}\n"
        raise RuntimeError(err)

    return p

def run_pipe(*args: str, msg: Optional[str] = None, verbose: bool = False, **kwargs: Any) -> TextIO:
    p = run(*args, msg=msg, verbose=verbose, stdout=PIPE, universal_newlines=True, **kwargs)
    return p.stdout  # type: ignore

def find_command(command: str, msg: Optional[str] = None) -> str:
    return run_pipe("which", command, msg=msg).read().strip()

def doxygen_generate(version: str):
    basedir = Path(__file__).parent.absolute()
    rootdir = Path(__file__).parent.parent.parent.parent.parent.absolute()
    git = find_command('git', msg="git is required")
    doxygen = find_command('doxygen', msg="doxygen is required")

    semver_match = SEMVER_REGEX.match(version)
    if semver_match is None:
        raise RuntimeError(f"malformed semver, got: {version}")
    semver_dict = semver_match.groupdict()
    semver = (int(semver_dict["major"]), int(semver_dict["minor"]), int(semver_dict["patch"]))
    if semver < (3, 0, 0):
        repo = 'https://github.com/apache/pulsar'
    else:
        repo = 'https://github.com/apache/pulsar-client-cpp'
    tag = f'v{semver[0]}.{semver[1]}.{semver[2]}'

    with open(f'{basedir}/Doxyfile', 'r') as f:
        config = f.read()
    config += f"\nOUTPUT_DIRECTORY={rootdir}/site2/website-next/static/api/cpp\n"
    config += f"\nHTML_OUTPUT={semver[0]}.{semver[1]}.{semver[2]}\n"

    with tempfile.TemporaryDirectory() as tmpdirname:
        run(git, 'clone', '--depth=1', '--single-branch', f'--branch={tag}', repo, cwd=tmpdirname)
        if semver < (3, 0, 0):
            dir = (Path(tmpdirname) / 'pulsar' / 'pulsar-client-cpp').absolute()
        else:
            dir = (Path(tmpdirname) / 'pulsar-client-cpp').absolute()
        with tempfile.NamedTemporaryFile(mode='w+') as f:
            f.write(config)
            f.flush()
            run(doxygen, f'{f.name}', cwd=dir)

if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.set_defaults(func=parser.print_help)

    parser.set_defaults(func=doxygen_generate)
    parser.add_argument('version', metavar='VERSION', help='version of the C++ client')

    args = parser.parse_args()
    fn = args.func
    args = dict(vars(args))
    del args['func']
    fn(**args)
