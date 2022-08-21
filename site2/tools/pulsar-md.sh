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

ROOT_DIR=$1
WEBSITE=$2
DOCS_DIR=${WEBSITE}/brodocs/documents
PULSAR=$ROOT_DIR/bin/pulsar

mkdir -p $DOCS_DIR

$PULSAR broker -g > $DOCS_DIR/broker.md
$PULSAR broker-tool gen-doc > $DOCS_DIR/broker-tool.md
$PULSAR compact-topic -t tmp -g > $DOCS_DIR/compact-topic.md
$PULSAR tokens gen-doc > $DOCS_DIR/tokens.md
$PULSAR proxy -g > $DOCS_DIR/proxy.md
$PULSAR functions-worker -g > $DOCS_DIR/functions-worker.md
$PULSAR standalone -g > $DOCS_DIR/standalone.md
$PULSAR initialize-cluster-metadata -cs cs -uw uw -zk zk -c c -g > $DOCS_DIR/initialize-cluster-metadata.md
$PULSAR delete-cluster-metadata -zk zk -g > $DOCS_DIR/delete-cluster-metadata.md
$PULSAR initialize-transaction-coordinator-metadata -cs cs -c c -g > $DOCS_DIR/initialize-transaction-coordinator-metadata.md
$PULSAR initialize-namespace -cs cs -c c -g demo > $DOCS_DIR/initialize-namespace.md
$PULSAR version -g > $DOCS_DIR/version.md
$PULSAR websocket -g > $DOCS_DIR/websocket.md
