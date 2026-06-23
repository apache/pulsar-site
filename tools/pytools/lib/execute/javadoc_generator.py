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
import xml.etree.ElementTree as ET
from pathlib import Path

import requests
import semver

from command import find_command, run
from constant import site_path
from execute import pulsar_build


def find_apidocs_path(base_path):
    """Find the Maven apidocs directory, checking common locations."""
    candidates = [
        base_path / 'target' / 'site' / 'apidocs',
        base_path / 'target' / 'reports' / 'apidocs'
    ]

    for path in candidates:
        if path.exists():
            return path

    raise FileNotFoundError(f"Could not find apidocs in any of: {candidates}")


def _major_minor_x(version_text: str) -> str:
    """Turn a full project version (e.g. 5.0.0-M1) into the published 5.0.x form."""
    ver = semver.VersionInfo.parse(version_text)
    return f"{ver.major}.{ver.minor}.x"


def _source_version(src: Path, build: pulsar_build.BuildSystem) -> str:
    """Read the project version from a source checkout, in the X.Y.x form used
    for the published Javadoc directories. Gradle checkouts (Pulsar master/5.0.0+)
    carry it in gradle.properties; Maven checkouts in the root pom.xml."""
    if build == pulsar_build.BuildSystem.gradle:
        for line in (src / 'gradle.properties').read_text().splitlines():
            line = line.strip()
            if line.startswith('version='):
                return _major_minor_x(line.split('=', 1)[1].strip())
        raise RuntimeError(f'No version= entry found in {src / "gradle.properties"}')
    root = ET.parse(src / 'pom.xml').getroot()
    version_elem = root.find('{http://maven.apache.org/POM/4.0.0}version')
    return _major_minor_x(version_elem.text)


def _publish(apidocs: Path, name: str, v: str):
    dst = site_path() / 'static' / 'api' / name / v
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(apidocs, dst)


def _generate_gradle(src: Path, v: str):
    # Pulsar master/5.0.0+ build with Gradle: the modules' standard `javadoc`
    # tasks write to <module>/build/docs/javadoc. A single Gradle invocation
    # builds them all; the task graph compiles the dependent projects as needed.
    # pulsar-client-api-v5 (the V5 scalable-topics client) is new in 5.0.0 and
    # has no Maven counterpart, so it is published only on the Gradle path.
    gradlew = src / 'gradlew'
    run(
        str(gradlew.absolute()),
        ':pulsar-client-api:javadoc',
        ':pulsar-client-api-v5:javadoc',
        ':pulsar-client-admin-api:javadoc',
        ':pulsar-functions:pulsar-functions-api:javadoc',
        '--no-configuration-cache',
        '--no-daemon',
        cwd=src,
    )
    _publish(src / 'pulsar-client-api' / 'build' / 'docs' / 'javadoc', 'client', v)
    _publish(src / 'pulsar-client-api-v5' / 'build' / 'docs' / 'javadoc', 'client-v5', v)
    _publish(src / 'pulsar-client-admin-api' / 'build' / 'docs' / 'javadoc', 'admin', v)
    _publish(src / 'pulsar-functions' / 'api-java' / 'build' / 'docs' / 'javadoc',
             'pulsar-functions', v)


def _generate_maven(src: Path, v: str):
    # Pre-5.0 releases build with Maven: javadoc:javadoc writes to the module's
    # target/site/apidocs (or target/reports/apidocs).
    mvn = find_command('mvn', msg="mvn is required")

    # client
    run(mvn, '-Dlocale=en_US', '-pl', 'pulsar-client-api', 'javadoc:javadoc', cwd=src)
    _publish(find_apidocs_path(src / 'pulsar-client-api'), 'client', v)

    # admin
    run(mvn, '-Dlocale=en_US', '-pl', 'pulsar-client-admin-api', 'javadoc:javadoc', cwd=src)
    _publish(find_apidocs_path(src / 'pulsar-client-admin-api'), 'admin', v)

    # function
    run(mvn, '-Dlocale=en_US', '-pl', 'api-java', 'javadoc:javadoc', cwd=(src / 'pulsar-functions'))
    _publish(find_apidocs_path(src / 'pulsar-functions' / 'api-java'), 'pulsar-functions', v)


def _generate(src: Path, v: str):
    if pulsar_build.detect(src) == pulsar_build.BuildSystem.gradle:
        _generate_gradle(src, v)
    else:
        _generate_maven(src, v)


def execute(dir_or_version: str):
    if Path(dir_or_version).is_dir():
        src = Path(dir_or_version)
        _generate(src, _source_version(src, pulsar_build.detect(src)))
        return

    ver = semver.VersionInfo.parse(dir_or_version)
    assert ver.compare('2.8.0') >= 0, 'versions before 2.8.0 did not have the -src suffix'
    assert ver.compare('2.11.0') != 0, '2.11.0 is unsupported, see https://github.com/apache/pulsar/pull/19202'

    with tempfile.TemporaryDirectory() as cwd:
        full = f"{ver.major}.{ver.minor}.{ver.patch}"
        remote = f'https://archive.apache.org/dist/pulsar/pulsar-{full}/apache-pulsar-{full}-src.tar.gz'
        resp = requests.get(remote, stream=True)
        assert resp.status_code == 200
        print(f'Download source code from {remote}')
        f = tarfile.open(fileobj=resp.raw, mode='r|gz')
        f.extractall(cwd)
        print(f'Extract source code to {cwd}')

        src = Path(cwd) / f'apache-pulsar-{full}-src'
        _generate(src, f"{ver.major}.{ver.minor}.x")
