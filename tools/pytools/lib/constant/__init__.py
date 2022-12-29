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

import functools
from pathlib import Path


@functools.lru_cache
def root_path():
    return _basedir_relative(5)


@functools.lru_cache
def site_path():
    return root_path()


@functools.lru_cache
def pytools_path():
    return root_path() / 'tools' / 'pytools'


def _basedir_relative(level: int) -> Path:
    result = Path(__file__)
    for _ in range(level):
        result = result.parent
    return result.absolute()
