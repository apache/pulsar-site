import shutil
import tarfile
import tempfile
from pathlib import Path

import requests
import semver

from command import find_command, run
from constant import site_path


def execute(version: str):
    mvn = find_command('mvn', msg="mvn is required")
    ver = semver.VersionInfo.parse(version)
    assert ver.compare('2.8.0') >= 0  # versions before 2.8.0 did not have the -src suffix

    with tempfile.TemporaryDirectory() as cwd:
        v = f"{ver.major}.{ver.minor}.{ver.patch}"
        remote = f'https://archive.apache.org/dist/pulsar/pulsar-{v}/apache-pulsar-{v}-src.tar.gz'
        resp = requests.get(remote, stream=True)
        assert resp.status_code == 200
        print(f'Download source code from {remote}')
        f = tarfile.open(fileobj=resp.raw, mode='r|gz')
        f.extractall(cwd)
        print(f'Extract source code to {cwd}')
        src = Path(cwd) / f'apache-pulsar-{v}-src'

        # client
        dst = site_path() / 'static' / 'api' / 'client' / v
        run(mvn, '-pl', 'pulsar-client-api', 'javadoc:javadoc', cwd=src)
        shutil.copytree(src / 'pulsar-client-api' / 'target' / 'site' / 'apidocs', dst)

        # admin
        dst = site_path() / 'static' / 'api' / 'admin' / v
        run(mvn, '-pl', 'pulsar-client-admin-api', 'javadoc:javadoc', cwd=src)
        shutil.copytree(src / 'pulsar-client-admin-api' / 'target' / 'site' / 'apidocs', dst)

        # function
        dst = site_path() / 'static' / 'api' / 'pulsar-functions' / v
        run(mvn, '-pl', 'api-java', 'javadoc:javadoc', cwd=(src / 'pulsar-functions'))
        shutil.copytree(src / 'pulsar-functions' / 'api-java' / 'target' / 'site' / 'apidocs', dst)
