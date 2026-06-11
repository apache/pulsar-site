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
from execute import pulsar_build


def execute(master: Path, version: str):
    build = pulsar_build.detect(master)
    master_swaggers = pulsar_build.swagger_output_dir(master, build)

    if build == pulsar_build.BuildSystem.gradle:
        # The Gradle equivalent of the Maven `swagger` profile: writes the
        # JSONs flat into pulsar-broker/build/openapi (plus v2/ and v3/
        # copies, which the non-recursive glob below ignores). Run it
        # unconditionally: the task is incremental (cheap when up to date)
        # and its Sync output prunes stale files, so spec files added or
        # removed in the build are always reflected.
        gradlew = master / 'gradlew'
        run(
            str(gradlew.absolute()),
            ':pulsar-broker:generateOpenApiSpecs',
            '--no-configuration-cache',
            '--no-daemon',
            cwd=master,
        )
    elif not master_swaggers.exists():
        mvn = find_command('mvn', msg="mvn is required")
        run(mvn, '-pl', 'pulsar-broker', 'install', '-DskipTests', '-Pswagger', cwd=master)

    os.makedirs(site_path() / 'static' / 'swagger' / version, exist_ok=True)
    for f in master_swaggers.glob('*.json'):
        data = json.loads(f.read_text())
        with (site_path() / 'static' / 'swagger' / version / f'{f.stem}.json').open('w+') as m:
            json.dump(data, m, indent=4, sort_keys=True)
            m.write('\n')
