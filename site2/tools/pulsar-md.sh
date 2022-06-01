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

cd $ROOT_DIR

mkdir -p $ROOT_DIR/site2/${WEBSITE}/brodocs/documents

$ROOT_DIR/bin/pulsar broker -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/broker.md
$ROOT_DIR/bin/pulsar broker-tool gen-doc > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/broker-tool.md
$ROOT_DIR/bin/pulsar compact-topic -t tmp -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/compact-topic.md
$ROOT_DIR/bin/pulsar tokens gen-doc > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/tokens.md
$ROOT_DIR/bin/pulsar proxy -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/proxy.md
$ROOT_DIR/bin/pulsar functions-worker -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/functions-worker.md
$ROOT_DIR/bin/pulsar standalone -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/standalone.md
$ROOT_DIR/bin/pulsar initialize-cluster-metadata -cs cs -uw uw -zk zk -c c -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/initialize-cluster-metadata.md
$ROOT_DIR/bin/pulsar delete-cluster-metadata -zk zk -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/delete-cluster-metadata.md
$ROOT_DIR/bin/pulsar initialize-transaction-coordinator-metadata -cs cs -c c -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/initialize-transaction-coordinator-metadata.md
$ROOT_DIR/bin/pulsar initialize-namespace -cs cs -c c -g demo > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/initialize-namespace.md
$ROOT_DIR/bin/pulsar version -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/version.md
$ROOT_DIR/bin/pulsar websocket -g > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/websocket.md
