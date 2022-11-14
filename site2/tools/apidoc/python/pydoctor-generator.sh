#!/usr/bin/env bash
#
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
#


set -x -e

if [ -z "$PULSAR_VERSION" ]; then
    echo "PULSAR_VERSION must be set."
    exit 1
fi

BUILD_IMAGE_NAME="${BUILD_IMAGE_NAME:-apachepulsar/pulsar-build}"
PYTHON_VERSION="${PYTHON_VERSION:-3.8}"
PYTHON_SPEC="${PYTHON_SPEC:-cp38-cp38}"
IMAGE=$BUILD_IMAGE_NAME:manylinux-$PYTHON_SPEC

# ROOT_DIR should be an absolute path so that Docker accepts it as a valid volumes path.
ROOT_DIR=`cd $(dirname $0)/../../../..; pwd`
cd $ROOT_DIR

echo "Build Python docs for python version $PYTHON_VERSION, spec $PYTHON_SPEC, and pulsar version ${PULSAR_VERSION}"
echo "Using image: $IMAGE"

VOLUME_OPTION=${VOLUME_OPTION:-"-v $ROOT_DIR:/pulsar"}
COMMAND="/pulsar/site2/tools/apidoc/python/pydoctor-generator-helper.sh"
DOCKER_CMD="docker run -e PULSAR_VERSION=${PULSAR_VERSION} --entrypoint ${COMMAND} -i ${VOLUME_OPTION} ${IMAGE}"

$DOCKER_CMD
