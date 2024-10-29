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
import tarfile
import tempfile
from pathlib import Path

import requests
import semver

from command import find_command, run
from constant import site_path


def execute(dir_or_version: str):
    mvn = find_command('mvn', msg="mvn is required")
    
    if Path(dir_or_version).is_dir():
        src = Path(dir_or_version)
        import xml.etree.ElementTree as ET
        pom_path = src / 'pom.xml'
        tree = ET.parse(pom_path)
        root = tree.getroot()
        version_elem = root.find('{http://maven.apache.org/POM/4.0.0}version')
        ver = semver.VersionInfo.parse(version_elem.text)
        v = f"{ver.major}.{ver.minor}.x"
    else:
        ver = semver.VersionInfo.parse(dir_or_version)
        assert ver.compare('2.8.0') >= 0, 'versions before 2.8.0 did not have the -src suffix'
        assert ver.compare('2.11.0') != 0, '2.11.0 is unsupported, see https://github.com/apache/pulsar/pull/19202'

        with tempfile.TemporaryDirectory() as cwd:
            v = f"{ver.major}.{ver.minor}.{ver.patch}"
            remote = f'https://archive.apache.org/dist/pulsar/pulsar-{v}/apache-pulsar-{v}-src.tar.gz'
            resp = requests.get(remote, stream=True)
            assert resp.status_code == 200
            print(f'Download source code from {remote}')
            f = tarfile.open(fileobj=resp.raw, mode='r|gz')
            f.extractall(cwd)
            print(f'Extract source code to {cwd}')

            src = Path(cwd) / f'apache-pulsar-{v}-src'
            v = f"{ver.major}.{ver.minor}.x"

    # client
    dst = site_path() / 'static' / 'api' / 'client' / v
    run(mvn, '-Dlocale=en_US', '-pl', 'pulsar-client-api', 'javadoc:javadoc', cwd=src)
    shutil.copytree(src / 'pulsar-client-api' / 'target' / 'site' / 'apidocs', dst)

    # admin
    dst = site_path() / 'static' / 'api' / 'admin' / v
    run(mvn, '-Dlocale=en_US', '-pl', 'pulsar-client-admin-api', 'javadoc:javadoc', cwd=src)
    shutil.copytree(src / 'pulsar-client-admin-api' / 'target' / 'site' / 'apidocs', dst)

    # function
    dst = site_path() / 'static' / 'api' / 'pulsar-functions' / v
    run(mvn, '-Dlocale=en_US', '-pl', 'api-java', 'javadoc:javadoc', cwd=(src / 'pulsar-functions'))
    shutil.copytree(src / 'pulsar-functions' / 'api-java' / 'target' / 'site' / 'apidocs', dst)