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

from command import find_command, run_pipe, run
from constant import site_path


def execute():
    # 1. Get modified files
    git = find_command('git', msg="git is required")
    modified_files = run_pipe(git, 'diff', '--name-only', 'HEAD~1', 'HEAD', cwd=site_path()).read().strip()
    modified_files = modified_files.split('\n')
    for file in modified_files:
        print(f"{file} was modified")

    # 2. Install and build
    npm = find_command('npm', msg="npm is required")
    node = find_command('node', msg="node is required")
    bash = find_command('bash', msg="bash is required")
    run(npm, 'install', cwd=site_path())
    run(node, 'scripts/replace.js', cwd=site_path())
    run(bash, 'scripts/split-version-build.sh', *modified_files, cwd=site_path())


if __name__ == '__main__':
    execute()
