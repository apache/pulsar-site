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
import sys
from pathlib import Path

from command import find_command, run
from constant import site_path
from execute import pulsar_build


def execute(master: Path, version: str):
    build = pulsar_build.detect(master)
    master_swaggers = pulsar_build.swagger_output_dir(master, build)

    if not master_swaggers.exists():
        if build == pulsar_build.BuildSystem.maven:
            mvn = find_command('mvn', msg="mvn is required")
            run(mvn, '-pl', 'pulsar-broker', 'install', '-DskipTests', '-Pswagger', cwd=master)
        else:
            # Gradle build on apache/pulsar master does not yet have a task
            # that regenerates the Swagger JSONs (the old `mvn -Pswagger`
            # invocation has no Gradle equivalent). Skip rather than fail so
            # the rest of the docs sync still produces useful output.
            print(
                f'[swagger_generator] Skipping Swagger generation: Gradle build at {master} '
                f'has no swagger task; expected output dir {master_swaggers} is missing.',
                file=sys.stderr,
            )
            return

    os.makedirs(site_path() / 'static' / 'swagger' / version, exist_ok=True)
    for f in master_swaggers.glob('*.json'):
        data = json.loads(f.read_text())
        with (site_path() / 'static' / 'swagger' / version / f'{f.stem}.json').open('w+') as m:
            json.dump(data, m, indent=4, sort_keys=True)
            m.write('\n')
