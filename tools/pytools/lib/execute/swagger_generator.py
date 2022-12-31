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

import json
import os
from pathlib import Path

from command import find_command, run
from constant import site_path


def execute(master: Path, version: str):
    master_swaggers = master / 'pulsar-broker' / 'target' / 'docs'

    if not master_swaggers.exists():  # generate master swaggers
        mvn = find_command('mvn', msg="mvn is required")
        run(mvn, '-pl', 'pulsar-broker', 'install', '-DskipTests', '-Pswagger', cwd=master)

    os.makedirs(site_path() / 'static' / 'swagger' / version, exist_ok=True)
    for f in master_swaggers.glob('*.json'):
        data = json.loads(f.read_text())
        with (site_path() / 'static' / 'swagger' / version / f'{f.stem}.json').open('w+') as m:
            json.dump(data, m, indent=4, sort_keys=True)
            m.write('\n')
