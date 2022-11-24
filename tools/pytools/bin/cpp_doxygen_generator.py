#!/usr/bin/env python3

from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter

from execute import doxygen_generator

if __name__ == '__main__':
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.set_defaults(func=parser.print_help)

    parser.set_defaults(func=doxygen_generator.execute)
    parser.add_argument('version', metavar='VERSION', help='version of Pulsar C++ Client')

    args = parser.parse_args()
    fn = args.func
    args = dict(vars(args))
    del args['func']
    fn(**args)
