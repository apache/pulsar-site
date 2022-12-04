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

from command import run_pipe
from constant import site_path


def _generate_doc(pulsar: Path, reference: Path, filename: str, *args: str):
    output = run_pipe(str(pulsar.absolute()), *args, codes={0, 255}).read().strip()
    output = output.strip() + os.linesep
    (reference / filename).write_text(output)


def execute(basedir: Path, version: str):
    pulsar = basedir / 'bin' / 'pulsar'
    reference = site_path() / 'static' / 'reference' / version / 'pulsar'

    args = ['broker', '-g']
    _generate_doc(pulsar, reference, 'broker.md', *args)
    args = ['broker-tool', 'gen-doc']
    _generate_doc(pulsar, reference, 'broker-tool.md', *args)
    args = ['compact-topic', '-t', 'tmp', '-g']
    _generate_doc(pulsar, reference, 'compact-topic.md', *args)
    args = ['tokens', 'gen-doc']
    _generate_doc(pulsar, reference, 'tokens.md', *args)
    args = ['proxy', '-g']
    _generate_doc(pulsar, reference, 'proxy.md', *args)
    args = ['functions-worker', '-g']
    _generate_doc(pulsar, reference, 'functions-worker.md', *args)
    args = ['standalone', '-g']
    _generate_doc(pulsar, reference, 'standalone.md', *args)
    args = ['initialize-cluster-metadata', '-cs', 'cs', '-uw', 'uw', '-zk', 'zk', '-c', 'c', '-g']
    _generate_doc(pulsar, reference, 'initialize-cluster-metadata.md', *args)
    args = ['delete-cluster-metadata', '-zk', 'zk', '-g']
    _generate_doc(pulsar, reference, 'delete-cluster-metadata.md', *args)
    args = ['initialize-transaction-coordinator-metadata', '-cs', 'cs', '-c', 'c', '-g']
    _generate_doc(pulsar, reference, 'initialize-transaction-coordinator-metadata.md', *args)
    args = ['initialize-namespace', '-cs', 'cs', '-c', 'c', '-g', 'demo']
    _generate_doc(pulsar, reference, 'initialize-namespace.md', *args)
    args = ['version', '-g']
    _generate_doc(pulsar, reference, 'version.md', *args)
    args = ['websocket', '-g']
    _generate_doc(pulsar, reference, 'websocket.md', *args)
