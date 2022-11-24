import docker
import semver

from constant import pytools_path, site_path

IMAGE = 'apachepulsar/pulsar-build:manylinux-cp38-cp38'


def execute(version: str):
    ver = semver.VersionInfo.parse(version)
    assert ver.compare('3.0.0') < 0

    v = f"{ver.major}.{ver.minor}.{ver.patch}"
    client = docker.from_env()
    client.containers.run(
        IMAGE,
        command='/scripts/pdoc-generator-helper',
        remove=True,
        environment=[f'PULSAR_VERSION={v}'],
        volumes=[
            f'{pytools_path()}/scripts:/scripts',
            f'{site_path()}/static/api:/api',
        ]
    )
