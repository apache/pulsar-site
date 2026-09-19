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
import re
from pathlib import Path

from command import run
from constant import site_path
from execute import pulsar_build


def remove_cumulative_output(document: str, command: str) -> str:
    """Keep the complete final snapshot emitted by affected Pulsar releases.

    Their generator prints its growing buffer inside the subcommand loop.
    Only discard earlier snapshots when each is a prefix of the final one;
    leave other output, including output from fixed releases, unchanged.
    """
    headings = list(re.finditer(rf'^# {re.escape(command)}[ \t]*$', document, re.MULTILINE))
    if len(headings) < 2 or headings[0].start() != 0:
        return document
    final = document[headings[-1].start():]
    for start, end in zip(headings, headings[1:]):
        snapshot = document[start.start():end.start()].rstrip()
        if not final.startswith(snapshot):
            return document
    return final


def execute(basedir: Path, version: str):
    build = pulsar_build.detect(basedir)
    pulsar_build.ensure_built(basedir, build)

    admin = basedir / 'bin' / 'pulsar-admin'
    reference = site_path() / 'static' / 'reference' / version / 'pulsar-admin'

    # Every `pulsar-admin` subcommand, mirroring `pulsar-admin --help`. Keep this
    # in sync when subcommands are added or removed; the only command
    # intentionally omitted is `documents`, which is the doc-generation command
    # itself.
    commands = [
        'broker-stats',
        'brokers',
        'bookies',
        'clusters',
        'functions',
        'functions-worker',
        'migration',
        'namespaces',
        'ns-isolation-policy',
        'sources',
        'sinks',
        'scalable-topics',
        'topics',
        'topicPolicies',
        'proxy-stats',
        'resourcegroups',
        'transactions',
        'tenants',
        'resource-quotas',
        'schemas',
        'packages',
    ]

    for command in commands:
        p = (reference / f'{command}.md')
        p.parent.mkdir(exist_ok=True, parents=True)
        with p.open('w') as f:
            run(str(admin.absolute()), 'documents', 'generate', command, stdout=f, env={
                **os.environ,
            })
        document = p.read_text()
        cleaned = remove_cumulative_output(document, command)
        if cleaned != document:
            p.write_text(cleaned)
