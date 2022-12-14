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
from pathlib import Path

from command import find_command, run
from constant import site_path


def execute(master: Path):
    master_swaggers = master / 'pulsar-broker' / 'target' / 'docs'

    if not master_swaggers.exists():  # generate master swaggers
        mvn = find_command('mvn', msg="mvn is required")
        run(mvn, '-pl', 'pulsar-broker', 'install', '-DskipTests', '-Pswagger', cwd=master)

    shutil.copytree(master_swaggers, site_path() / 'static' / 'swagger' / 'master', dirs_exist_ok=True)
