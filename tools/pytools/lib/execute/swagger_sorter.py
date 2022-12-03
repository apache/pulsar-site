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


def execute(base: Path):
    rest_api_versions = {}

    for f in sorted(base.glob('*/*.json')):
        filename = f.stem
        pulsar_version = f.parent.name

        data = json.loads(f.read_text())
        rest_api_version = data['info']['version']
        rest_api_dir = base / pulsar_version / rest_api_version
        os.makedirs(rest_api_dir, exist_ok=True)

        if pulsar_version in rest_api_versions:
            for v in rest_api_versions[pulsar_version]:
                if v['version'] == rest_api_version:
                    v['fileName'].append(filename)
                    break
            else:
                rest_api_versions[pulsar_version].append({'version': rest_api_version, 'fileName': [filename]})
        else:
            rest_api_versions[pulsar_version] = [{'version': rest_api_version, 'fileName': [filename]}]

        with (rest_api_dir / f.name).open('w+') as m:
            json.dump(data, m, indent=4)
            m.write('\n')

    with (base / 'restApiVersions.json').open('w+') as m:
        json.dump(rest_api_versions, m, indent=4, sort_keys=True)
        m.write('\n')
