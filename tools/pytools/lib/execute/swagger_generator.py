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

import json
import os
from pathlib import Path

from command import find_command, run
from constant import site_path
from execute import pulsar_build


# Base URL shown in the Redoc "servers" dropdown and request samples. Pulsar
# standalone serves the admin REST API here by default, so it is a far more
# useful default than the docs site origin Redoc would otherwise fall back to.
DEFAULT_SERVER_URL = 'http://localhost:8080'

# OpenAPI path-item keys that denote operations (others such as 'parameters' or
# '$ref' are not operations).
_HTTP_METHODS = frozenset({'get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'})


def _group_untagged_operations(data: dict) -> None:
    """Give every operation a tag so Redoc can group it.

    Operations the source spec leaves untagged (e.g. the function-worker
    endpoints /worker and /worker-stats) are otherwise listed, ungrouped, at the
    very end of the rendered document. Fall back to grouping them under their
    first path segment (/worker/... -> "worker"), and declare any tag derived
    this way at the top level so it renders as a proper sidebar section.

    Runs before the server base path is folded into the path keys, so the first
    segment is the resource name (worker) rather than the base prefix (admin)."""
    paths = data.get('paths')
    if not isinstance(paths, dict):
        return
    declared = {t.get('name') for t in data.get('tags', []) if isinstance(t, dict)}
    added = set()
    for path, methods in paths.items():
        if not isinstance(methods, dict):
            continue
        segments = [s for s in path.split('/') if s]
        if not segments:
            continue
        fallback = segments[0]
        for method, operation in methods.items():
            if method.lower() not in _HTTP_METHODS or not isinstance(operation, dict):
                continue
            if operation.get('tags'):
                continue
            operation['tags'] = [fallback]
            if fallback not in declared:
                declared.add(fallback)
                added.add(fallback)
    if added:
        data.setdefault('tags', [])
        for name in sorted(added):
            data['tags'].append({'name': name})


def _fold_server_base_path(data: dict) -> None:
    """Fold an OpenAPI 3 relative server base path (e.g. /admin/v2) into every
    path key, then point servers[0].url at the default Pulsar broker address.

    Redoc 2.x tucks servers[].url behind a collapsed per-operation dropdown, so
    the /admin/vN prefix is hidden; folding it into the path keys makes it render
    inline the way Redoc 1.x inlined the Swagger 2.0 `basePath`. The servers
    entry is then reset to the broker base URL so the dropdown and request
    samples read http://localhost:8080/admin/v2/... rather than the docs origin.

    No-op for specs without a relative, variable-free server base, which also
    keeps the transform idempotent (a reset absolute URL is left untouched)."""
    servers = data.get('servers')
    if not servers:
        return
    base = (servers[0].get('url') or '').rstrip('/')
    if not base.startswith('/') or '{' in base:
        return
    paths = data.get('paths')
    if isinstance(paths, dict):
        data['paths'] = {base + key: value for key, value in paths.items()}
    data['servers'] = [{'url': DEFAULT_SERVER_URL}]


def execute(master: Path, version: str):
    build = pulsar_build.detect(master)
    master_swaggers = pulsar_build.swagger_output_dir(master, build)

    if build == pulsar_build.BuildSystem.gradle:
        # The Gradle equivalent of the Maven `swagger` profile: writes the
        # JSONs flat into pulsar-broker/build/openapi (plus v2/ and v3/
        # copies, which the non-recursive glob below ignores). Run it
        # unconditionally: the task is incremental (cheap when up to date)
        # and its Sync output prunes stale files, so spec files added or
        # removed in the build are always reflected.
        gradlew = master / 'gradlew'
        run(
            str(gradlew.absolute()),
            ':pulsar-broker:generateOpenApiSpecs',
            '--no-configuration-cache',
            '--no-daemon',
            cwd=master,
        )
    elif not master_swaggers.exists():
        mvn = find_command('mvn', msg="mvn is required")
        run(mvn, '-pl', 'pulsar-broker', 'install', '-DskipTests', '-Pswagger', cwd=master)

    # Gradle checkouts (Pulsar master/5.0.0+) emit OpenAPI 3 documents, which are
    # published under static/openapi/. Maven checkouts (pre-5.0 releases) keep
    # their Swagger 2.0 documents under static/swagger/.
    docs_root = 'openapi' if build == pulsar_build.BuildSystem.gradle else 'swagger'
    os.makedirs(site_path() / 'static' / docs_root / version, exist_ok=True)
    for f in master_swaggers.glob('*.json'):
        data = json.loads(f.read_text())
        stem = f.stem
        if docs_root == 'openapi':
            # Group operations the source spec left untagged (e.g. the
            # function-worker endpoints) by their first path segment, before the
            # base path is folded in (see _group_untagged_operations).
            _group_untagged_operations(data)
            # Fold the /admin/vN prefix from servers[0].url into the path keys so
            # Redoc 2.x shows it inline (see _fold_server_base_path).
            _fold_server_base_path(data)
            # The upstream build always names the files swagger*.json; publish
            # them as openapi*.json under the OpenAPI 3 tree.
            if stem.startswith('swagger'):
                stem = 'openapi' + stem[len('swagger'):]
        with (site_path() / 'static' / docs_root / version / f'{stem}.json').open('w+') as m:
            json.dump(data, m, indent=4, sort_keys=True)
            m.write('\n')
