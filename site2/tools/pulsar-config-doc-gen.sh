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

# common variables
ROOT_DIR=$(git rev-parse --show-toplevel)
WEBSITE=$1
VERSION=$2
VERSIONED_DIR=$WEBSITE/static/reference/$VERSION
JAVA=java
f=$ROOT_DIR/distribution/server/target/classpath.txt

# config doc gen variables
DOCS_DIR=$VERSIONED_DIR/config
GEN_DOCS_BROKER=org.apache.pulsar.utils.CmdGenerateDocumentation
GEN_DOCS_PROXY=org.apache.pulsar.proxy.util.CmdGenerateDocumentation

# client config doc gen variables
CLIENT_DIR=$VERSIONED_DIR/client
CLIENT_CP=$ROOT_DIR/pulsar-client/target/classes
CLIENT_CONF=org.apache.pulsar.client.impl.conf
GEN_DOCS_CLIENT=$CLIENT_CONF.CmdGenerateDocumentation

# config doc gen
cp "$WEBSITE"/docs/reference-configuration*.md "$DOCS_DIR"

$JAVA -cp "$(cat "$f")" $GEN_DOCS_BROKER -c org.apache.pulsar.broker.ServiceConfiguration > "$DOCS_DIR"/reference-configuration-broker.md
$JAVA -cp "$(cat "$f")" $GEN_DOCS_BROKER -c org.apache.pulsar.client.impl.conf.ClientConfigurationData > "$DOCS_DIR"/reference-configuration-client.md
$JAVA -cp "$(cat "$f")" $GEN_DOCS_BROKER -c org.apache.pulsar.websocket.service.WebSocketProxyConfiguration > "$DOCS_DIR"/reference-configuration-websocket.md
$JAVA -cp "$(cat "$f")" $GEN_DOCS_PROXY -c org.apache.pulsar.proxy.server.ProxyConfiguration > "$DOCS_DIR"/reference-configuration-pulsar-proxy.md

cp "$DOCS_DIR"/reference-configuration-broker.md "$DOCS_DIR"/reference-configuration-standalone.md

# client config doc gen
$JAVA -cp "$CLIENT_CP:$(cat "$f")" $GEN_DOCS_CLIENT -c $CLIENT_CONF.ClientConfigurationData > "$CLIENT_DIR"/client-configuration-client.md
$JAVA -cp "$CLIENT_CP:$(cat "$f")" $GEN_DOCS_CLIENT -c $CLIENT_CONF.ProducerConfigurationData > "$CLIENT_DIR"/client-configuration-producer.md
$JAVA -cp "$CLIENT_CP:$(cat "$f")" $GEN_DOCS_CLIENT -c $CLIENT_CONF.ConsumerConfigurationData > "$CLIENT_DIR"/client-configuration-consumer.md
$JAVA -cp "$CLIENT_CP:$(cat "$f")" $GEN_DOCS_CLIENT -c $CLIENT_CONF.ReaderConfigurationData > "$CLIENT_DIR"/client-configuration-reader.md

# copy CLI tools docs
tools="bookkeeper pulsar-daemon pulsar-shell"
for tool in $tools
do
    cp "$WEBSITE/docs/reference-cli-$tool.md" "$VERSIONED_DIR/$tool/$tool.md"
done
