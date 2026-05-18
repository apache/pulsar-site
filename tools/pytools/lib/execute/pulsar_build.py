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

import enum
from pathlib import Path

from command import run


class BuildSystem(enum.Enum):
    gradle = 'gradle'
    maven = 'maven'


# Apache Pulsar master switched to a Gradle build (no more `pom.xml` at the
# repo root, classpath/jars land under `build/`). Maintenance branches keep
# the legacy Maven layout (`pom.xml`, `target/`). Detect once per call site so
# the same generator code path works for both checkouts.
def detect(master: Path) -> BuildSystem:
    if (master / 'gradlew').exists() and (
        (master / 'build.gradle.kts').exists() or (master / 'build.gradle').exists()
    ):
        return BuildSystem.gradle
    if (master / 'pom.xml').exists():
        return BuildSystem.maven
    raise RuntimeError(
        f'Cannot determine pulsar build system in {master}: '
        f'no gradlew/build.gradle(.kts) or pom.xml found.'
    )


def server_classpath_file(master: Path, build: BuildSystem) -> Path:
    if build == BuildSystem.gradle:
        return master / 'distribution' / 'server' / 'build' / 'classpath.txt'
    return master / 'distribution' / 'server' / 'target' / 'classpath.txt'


def swagger_output_dir(master: Path, build: BuildSystem) -> Path:
    if build == BuildSystem.gradle:
        return master / 'pulsar-broker' / 'build' / 'docs'
    return master / 'pulsar-broker' / 'target' / 'docs'


# Pre-build the artifacts needed by the reference/CLI doc generators when the
# checkout uses Gradle. Maven branches are still primed by the GitHub Action
# step that runs `mvn install`, so this is a no-op there.
def ensure_built(master: Path, build: BuildSystem) -> None:
    if build != BuildSystem.gradle:
        return

    classpath_file = server_classpath_file(master, build)
    if classpath_file.exists():
        return

    gradlew = master / 'gradlew'
    if not gradlew.exists():
        raise RuntimeError(f'gradlew not found at {gradlew}')

    run(
        str(gradlew.absolute()),
        'assemble',
        ':distribution:pulsar-server-distribution:exportClasspath',
        ':distribution:pulsar-shell-distribution:exportClasspath',
        '--no-configuration-cache',
        '--no-daemon',
        cwd=master,
    )
