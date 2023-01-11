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

from command import find_command, run_pipe
from constant import site_path


def execute():
    git = find_command('git', msg="git is required")
    modified_files = run_pipe(git, 'diff', '--name-only', 'HEAD~1', 'HEAD', cwd=site_path()).read().strip()
    modified_files = modified_files.split('\n')
    for file in modified_files:
        print(f"{file} was modified")
    modified_files = ' '.join(modified_files)


if __name__ == '__main__':
    execute()
