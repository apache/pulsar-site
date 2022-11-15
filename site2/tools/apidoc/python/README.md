<!--

    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

-->

# Pulsar Python Client Generated Docs

## 3.0.0 and Later

Releases start from 3.0.0 uses [`pydoctor`](https://github.com/twisted/pydoctor) to generate API docs.

When starting in the root directory of the `pulsar-site` project, you can run:

```shell
PULSAR_VERSION=3.0.0 ./site2/tools/apidoc/python/pydoctor-generator.sh
```

## Before 3.0.0

Releases before 3.0.0 uses [`pdoc`](https://github.com/mitmproxy/pdoc) to generate API docs.

When starting in the root directory of the `pulsar-site` project, you can run:

```shell
PULSAR_VERSION=2.8.3 ./site2/tools/apidoc/python/pdoc-generator.sh
```
