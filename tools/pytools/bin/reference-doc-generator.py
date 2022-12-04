#!/usr/bin/env python3

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

import enum
from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter
from pathlib import Path

from execute import config_doc_generator, pulsar_admin_clidoc_generator, pulsar_clidoc_generator
from execute import pulsar_client_clidoc_generator, pulsar_perf_clidoc_generator


class Kind(enum.Enum):
    all = 'all'
    config = 'config'
    admin = 'admin'
    pulsar = 'pulsar'
    client = 'client'
    perf = 'perf'


if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument('--master-path', required=True, type=str, metavar='PATH', help='path to pulsar main repo')
    parser.add_argument('--version', default='next', metavar='VERSION', help='version of Apache Pulsar')
    parser.add_argument('--kind', default=[Kind.all], type=Kind, choices=list(Kind), nargs='+')

    args = parser.parse_args()
    master_path = Path(args.master_path)
    kinds = set(args.kind)
    if Kind.all in kinds:
        kinds = {Kind.config, Kind.admin, Kind.pulsar, Kind.client, Kind.perf}

    for kind in kinds:
        match kind:
            case Kind.config:
                config_doc_generator.execute(master_path, args.version)
            case Kind.admin:
                pulsar_admin_clidoc_generator.execute(master_path, args.version)
            case Kind.pulsar:
                pulsar_clidoc_generator.execute(master_path, args.version)
            case Kind.client:
                pulsar_client_clidoc_generator.execute(master_path, args.version)
            case Kind.perf:
                pulsar_perf_clidoc_generator.execute(master_path, args.version)
