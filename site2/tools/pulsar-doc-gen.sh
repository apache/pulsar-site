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

ROOT_DIR=$(git rev-parse --show-toplevel)
WEBSITE=$1
DOCS_DIR=$WEBSITE/docsify/pulsar

$ROOT_DIR/bin/pulsar broker -g > $DOCS_DIR/broker.md
$ROOT_DIR/bin/pulsar broker-tool gen-doc > $DOCS_DIR/broker-tool.md
$ROOT_DIR/bin/pulsar compact-topic -t tmp -g > $DOCS_DIR/compact-topic.md
$ROOT_DIR/bin/pulsar tokens gen-doc > $DOCS_DIR/tokens.md
$ROOT_DIR/bin/pulsar proxy -g > $DOCS_DIR/proxy.md
$ROOT_DIR/bin/pulsar functions-worker -g > $DOCS_DIR/functions-worker.md
$ROOT_DIR/bin/pulsar standalone -g > $DOCS_DIR/standalone.md
$ROOT_DIR/bin/pulsar initialize-cluster-metadata -cs cs -uw uw -zk zk -c c -g > $DOCS_DIR/initialize-cluster-metadata.md
$ROOT_DIR/bin/pulsar delete-cluster-metadata -zk zk -g > $DOCS_DIR/delete-cluster-metadata.md
$ROOT_DIR/bin/pulsar initialize-transaction-coordinator-metadata -cs cs -c c -g > $DOCS_DIR/initialize-transaction-coordinator-metadata.md
$ROOT_DIR/bin/pulsar initialize-namespace -cs cs -c c -g demo > $DOCS_DIR/initialize-namespace.md
$ROOT_DIR/bin/pulsar version -g > $DOCS_DIR/version.md
$ROOT_DIR/bin/pulsar websocket -g > $DOCS_DIR/websocket.md


