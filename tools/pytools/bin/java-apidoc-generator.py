#!/usr/bin/env python3

from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter

from execute import javadoc_generator

if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.set_defaults(func=javadoc_generator.execute)
    parser.add_argument('version', metavar='VERSION', help='version of Apache Pulsar')

    args = parser.parse_args()
    fn = args.func
    args = dict(vars(args))
    del args['func']
    fn(**args)
