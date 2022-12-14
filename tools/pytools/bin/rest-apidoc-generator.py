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

from command import run, find_command
from constant import site_path
from execute import swagger_generator, swagger_sorter

if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument('--master-path', type=str, metavar='PATH', help='path to pulsar main repo')
    parser.add_argument('--version', default='master', metavar='VERSION', help='version of Apache Pulsar')

    args = parser.parse_args()

    with tempfile.TemporaryDirectory() as cwd:
        if args.master_path is None:
            git = find_command('git', msg="git is required")
            run(git, 'clone', '-b', 'master', '--depth', '1', 'https://github.com/apache/pulsar', cwd=cwd)
            master = Path(cwd) / 'pulsar'
        else:
            master = Path(args.master_path)

        swagger_generator.execute(master, args.version)
        swagger_sorter.execute(site_path() / 'static' / 'swagger')

