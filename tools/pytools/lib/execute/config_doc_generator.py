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

import shutil
from dataclasses import dataclass
from pathlib import Path

import semver
from command import find_command, run
from constant import site_path


@dataclass
class Settings:
    type: str
    classname: str
    generator: str
    filename: str


def execute(master: Path, version: str):
    java = find_command('java', msg='java is required')

    reference = site_path() / 'static' / 'reference' / version
    classpath = master / 'distribution' / 'server' / 'target' / 'classpath.txt'
    classpath = classpath.read_text()

    broker_doc_generator = 'org.apache.pulsar.proxy.util.CmdGenerateDocumentation'
    client_doc_generator = 'org.apache.pulsar.proxy.util.CmdGenerateDocumentation'
    proxy_doc_generator = 'org.apache.pulsar.proxy.util.CmdGenerateDocumentation'

    # FIXME(*) b/w compatibility - removed if they are no longer maintained
    if version != "next" and semver.VersionInfo.parse(version[:-2] + ".0") <= "3.0.0":
        broker_doc_generator = 'org.apache.pulsar.utils.CmdGenerateDocumentation'
        client_doc_generator = 'org.apache.pulsar.client.impl.conf.CmdGenerateDocumentation'
        proxy_doc_generator = 'org.apache.pulsar.proxy.util.CmdGenerateDocumentation'

    configs = [
        Settings(
            'config',
            'org.apache.pulsar.broker.ServiceConfiguration',
            broker_doc_generator,
            'reference-configuration-broker.md'
        ),
        Settings(
            'config',
            'org.apache.pulsar.client.impl.conf.ClientConfigurationData',
            broker_doc_generator,
            'reference-configuration-client.md'
        ),
        Settings(
            'config',
            'org.apache.pulsar.websocket.service.WebSocketProxyConfiguration',
            broker_doc_generator,
            'reference-configuration-websocket.md'
        ),
        Settings(
            'config',
            'org.apache.pulsar.proxy.server.ProxyConfiguration',
            proxy_doc_generator,
            'reference-configuration-pulsar-proxy.md'
        ),
        Settings(
            'client',
            'org.apache.pulsar.client.impl.conf.ClientConfigurationData',
            client_doc_generator,
            'client-configuration-client.md'
        ),
        Settings(
            'client',
            'org.apache.pulsar.client.impl.conf.ProducerConfigurationData',
            client_doc_generator,
            'client-configuration-producer.md'
        ),
        Settings(
            'client',
            'org.apache.pulsar.client.impl.conf.ConsumerConfigurationData',
            client_doc_generator,
            'client-configuration-consumer.md'
        ),
        Settings(
            'client',
            'org.apache.pulsar.client.impl.conf.ReaderConfigurationData',
            client_doc_generator,
            'client-configuration-reader.md'
        ),
    ]

    for config in configs:
        p = (reference / config.type / config.filename)
        p.parent.mkdir(exist_ok=True, parents=True)
        with p.open('w') as f:
            run(java, '-cp', classpath, config.generator, '-c', config.classname, stdout=f)

    shutil.copy2(
        reference / 'config' / 'reference-configuration-broker.md',
        reference / 'config' / 'reference-configuration-standalone.md')
