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

$ROOT_DIR/bin/pulsar-admin documents generate broker-stats > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/broker-stats.md
$ROOT_DIR/bin/pulsar-admin documents generate brokers > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/brokers.md
$ROOT_DIR/bin/pulsar-admin documents generate clusters > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/clusters.md
$ROOT_DIR/bin/pulsar-admin documents generate functions > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/functions.md
$ROOT_DIR/bin/pulsar-admin documents generate functions-worker > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/functions-worker.md
$ROOT_DIR/bin/pulsar-admin documents generate namespaces > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/namespaces.md
$ROOT_DIR/bin/pulsar-admin documents generate ns-isolation-policy > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/ns-isolation-policy.md
$ROOT_DIR/bin/pulsar-admin documents generate sources > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/sources.md
$ROOT_DIR/bin/pulsar-admin documents generate sinks > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/sinks.md
$ROOT_DIR/bin/pulsar-admin documents generate topics > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/topics.md
$ROOT_DIR/bin/pulsar-admin documents generate topicPolicies > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/topicPolicies.md
$ROOT_DIR/bin/pulsar-admin documents generate proxy-stats > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/proxy-stats.md
$ROOT_DIR/bin/pulsar-admin documents generate resourcegroups > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/resourcegroups.md
$ROOT_DIR/bin/pulsar-admin documents generate transactions > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/transactions.md
$ROOT_DIR/bin/pulsar-admin documents generate tenants > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/tenants.md
$ROOT_DIR/bin/pulsar-admin documents generate resource-quotas > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/resource-quotas.md
$ROOT_DIR/bin/pulsar-admin documents generate schemas > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/schemas.md
$ROOT_DIR/bin/pulsar-admin documents generate packages > $ROOT_DIR/site2/${WEBSITE}/brodocs/documents/packages.md
