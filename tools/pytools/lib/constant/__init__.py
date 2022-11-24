import functools
from pathlib import Path


@functools.lru_cache
def root_path():
    return _basedir_relative(5)


@functools.lru_cache
def site_path():
    return root_path() / 'site2' / 'website-next'


def _basedir_relative(level: int) -> Path:
    result = Path(__file__)
    for _ in range(level):
        result = result.parent
    return result.absolute()
