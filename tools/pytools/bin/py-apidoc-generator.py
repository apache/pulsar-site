#!/usr/bin/env python3

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
