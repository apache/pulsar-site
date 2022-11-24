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

from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter

import semver
from execute import pydoctor_generator, pdoc_generator


def _dispatch(version: str):
    ver = semver.VersionInfo.parse(version)
    if ver.compare('3.0.0') < 0:
        pdoc_generator.execute(version)
    else:
        pydoctor_generator.execute(version)


if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.set_defaults(func=_dispatch)
    parser.add_argument('version', metavar='VERSION', help='version of Pulsar C++ Client')

    args = parser.parse_args()
    fn = args.func
    args = dict(vars(args))
    del args['func']
    fn(**args)
