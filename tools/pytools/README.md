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

# Python tools to support Pulsar document/website development

## Prerequisite

Pytools requires Python 3.10+.

Pytools uses [poetry](https://python-poetry.org/) to manage dependencies and projects.

1. Install poetry:

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

2. Add the executable to `PATH`:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

3. Fetch and install all dependencies:

```bash
poetry install
```

## Executable

Pytools provides the following executables:

### [cpp-apidoc-generator](bin/cpp-apidoc-generator.py)

This executable generates API docs for Pulsar C++ Client using [`doxygen`](https://doxygen.nl/):

```bash
poetry run bin/cpp-apidoc-generator.py <VERSION>
```

... where the `VERSION` is released semantic version like `2.10.2` or `3.0.0`.

### [py-apidoc-generator](bin/py-apidoc-generator.py)

This executable generates API docs for Pulsar Python Client:

```bash
poetry run bin/py-apidoc-generator.py <VERSION>
```

... where the `VERSION` is released semantic version like `2.10.2` or `3.0.0`.

* Releases start from 3.0.0 uses [`pydoctor`](https://github.com/twisted/pydoctor) to generate API docs.
* Releases before 3.0.0 uses [`pdoc`](https://github.com/mitmproxy/pdoc) to generate API docs.

### [java-apidoc-generator](bin/java-apidoc-generator.py)

This executable generates API docs for Pulsar Java Client, Admin and Functions using Maven:

```bash
poetry run bin/java-apidoc-generator.py <VERSION>
```

... where the `VERSION` is released semantic version like `2.10.2`.

### [site-updater](bin/site-updater.py)

This executable synchronizes site content from the main repo:

```bash
poetry run bin/site-updater.py --master-path=<PATH> [--push={y|n|auto}]
```

... where:

1. `master-path` is path to the main repo;
2. `push` specifies whether push to the remote site repo.

### [reference-doc-generator](bin/reference-doc-generator.py)

This executable generates Pulsar references, including command-line documents and configs:

```bash
poetry run bin/reference-doc-generator.py --master-path=<path> [--version=<VERSION>]
  [--kind={all|admin|cient|config|perf|pulsar}]
```

... where:

1. `master-path` is path to the main repo, which must be built to execute the `bin` scripts;
2. `version` is the version of the main repo, default to `next` a.k.a. the latest master branch;
3. `kind` is what references to generate, default to `all`.
