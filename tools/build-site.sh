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

GH_TOKEN=$1

ROOT_DIR=$(git rev-parse --show-toplevel)

WEBSITE_DIR=${ROOT_DIR}/
TOOLS_DIR=${ROOT_DIR}/tools
GEN_SITE_DIR=${ROOT_DIR}/generated-site
VERSION=next

export NODE_OPTIONS="--max-old-space-size=16000"

cd "$WEBSITE_DIR"

npm install

node scripts/replace.js
# Because there are too many versions of the document, the memory overflows during the full build.
# The split-version-build script is used to build in different versions, and finally the build results are merged.
bash scripts/split-version-build.sh $@

CONTENT_DIR="$GEN_SITE_DIR"/content
rm -rf "$CONTENT_DIR" && mkdir -p "$CONTENT_DIR"
rsync -a ./build/ "$CONTENT_DIR"
