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

# Build Pulsar website within a Docker container

# Fail script in case of errors
set -e -x

ROOT_DIR=$(git rev-parse --show-toplevel)

BUILD_IMAGE_NAME="${BUILD_IMAGE_NAME:-apachepulsar/pulsar-build}"
BUILD_IMAGE_VERSION="${BUILD_IMAGE_VERSION:-website-v2}"

IMAGE="$BUILD_IMAGE_NAME:$BUILD_IMAGE_VERSION"

echo "---- Build Pulsar website using image $IMAGE"

#docker pull $IMAGE

CI_USER=$(id -u)
CI_GROUP=$(id -g)

DOCKER_CMD="docker run -i -e CI_USER=$CI_USER -e CI_GROUP=$CI_GROUP -v $HOME/.m2:/root/.m2 -v $ROOT_DIR:/pulsar $IMAGE"

sed -i "s#$ROOT_DIR#/pulsar#g" $ROOT_DIR/distribution/server/target/classpath.txt
sed -i "s#$HOME#/root#g" $ROOT_DIR/distribution/server/target/classpath.txt

CMD="cd /pulsar && /pulsar/site2/tools/build-site.sh $GH_TOKEN $@"
echo "docker exec cmd: "$CMD
$DOCKER_CMD bash -l -c "$CMD"
