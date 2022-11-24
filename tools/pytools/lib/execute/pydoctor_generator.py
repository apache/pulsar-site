import tempfile
from pathlib import Path

import semver
from command import find_command, run
from constant import site_path, tool_path


def execute(version: str):
    git = find_command('git', msg="git is required")
    poetry = find_command('poetry', msg="poetry is required")

    ver = semver.VersionInfo.parse(version)
    assert ver.compare('3.0.0') >= 0

    tmpdir = (Path(tool_path()) / 'tmp').absolute()
    with tempfile.TemporaryDirectory(dir=tmpdir) as cwd:
        v = f"{ver.major}.{ver.minor}.{ver.patch}"
        tag = f"v{ver.major}.{ver.minor}.{ver.patch}"
        remote = 'https://github.com/apache/pulsar-client-python'
        run(git, 'clone', '--depth=1', '--single-branch', f'--branch={tag}', remote, cwd=cwd)
        options = [
            'run', 'pydoctor',
            '--make-html',
            f'--html-viewsource-base=https://github.com/apache/pulsar-client-python/tree/{tag}',
            '--docformat=numpy', '--theme=readthedocs',
            '--intersphinx=https://docs.python.org/3/objects.inv',
            f'--html-output={site_path()}/static/api/python/{v}',
            f'{cwd}/pulsar-client-python/pulsar'
        ]
        run(poetry, *options)
