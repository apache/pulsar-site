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

import os
from pathlib import Path

from command import run
from constant import site_path


def execute(basedir: Path, version: str):
    pulsar = basedir / 'bin' / 'pulsar'
    reference = site_path() / 'static' / 'reference' / version / 'pulsar'

    commands = [
        ('broker', '-g'),
        ('broker-tool', 'gen-doc'),
        ('compact-topic', '-t', 'tmp', '-g'),
        ('tokens', 'gen-doc'),
        ('proxy', '-g'),
        ('functions-worker', '-g'),
        ('standalone', '-g'),
        ('initialize-cluster-metadata', '-cs', 'cs', '-uw', 'uw', '-zk', 'zk', '-c', 'c', '-g'),
        ('delete-cluster-metadata', '-zk', 'zk', '-g'),
        ('initialize-transaction-coordinator-metadata', '-cs', 'cs', '-c', 'c', '-g'),
        ('initialize-namespace', '-cs', 'cs', '-c', 'c', '-g', 'demo'),
        ('version', '-g'),
        ('websocket', '-g'),
    ]

    for command in commands:
        p = (reference / f'{command[0]}.md')
        p.parent.mkdir(exist_ok=True, parents=True)
        with p.open('w') as f:
            run(str(pulsar.absolute()), *command, codes={0, 255}, stdout=f, env={
                'PULSAR_BROKER_CONF': 'conf/broker.conf',
                'PULSAR_WORKER_CONF': 'conf/functions_worker.yml',
                'PULSAR_PROXY_CONF': 'conf/proxy.conf',
                'PULSAR_STANDALONE_CONF': 'conf/standalone.conf',
                **os.environ,
            }, cwd=basedir)
