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

set -x

ROOT_DIR=$(git rev-parse --show-toplevel)
WEBSITE=$1
VERSION=$2
DOCS_DIR=$WEBSITE/docsify/$VERSION/pulsar-admin

DOC_GEN="$ROOT_DIR/bin/pulsar-admin documents generate"

COMMANDS="broker-stats brokers bookies clusters functions functions-worker namespaces ns-isolation-policy sources sinks topics topicPolicies proxy-stats resourcegroups transactions tenants resource-quotas schemas packages"

for CMD in $COMMANDS
do
    $DOC_GEN $CMD > $DOCS_DIR/$CMD.md
done
