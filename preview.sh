#!/bin/bash
if [[ "$1" == "help" || "$1" == "--help" ]]; then
    echo "Usage: ./preview.sh [--clean] [version1] [version2] [version3]"
    exit 0
fi

if [[ "$1" == "--clean" || "$1" == "-c" ]]; then
    shift
    CLEAN=true
fi

BUILD_VERSIONS="[\"current\""
for version in $@; do
    BUILD_VERSIONS=$BUILD_VERSIONS", \""$version"\""
done
BUILD_VERSIONS=$BUILD_VERSIONS"]"

echo $BUILD_VERSIONS >.build-versions.json

show_yarn_installation_help() {
    echo "yarn is not available. yarn comes with corepack. corepack is part of the node runtime package in Homebrew."
    echo "You will need to activate corepack by running:"
    echo "corepack enable"
    echo "Don't install yarn separately from a package manager. With Homebrew, uninstall any existing yarn installation with 'brew uninstall yarn'"
    echo "You might have to run 'brew unlink node; brew link node; find /opt/homebrew/bin -type l ! -exec test -e {} \; -delete; corepack enable' to fix the installation."
    echo "If 'corepack enable' fails due to file conflicts, remove the conflictings files manually from /opt/homebrew/bin and try again."
}

if ! command -v yarn &>/dev/null; then
    show_yarn_installation_help
    exit 1
fi

yarn help 2>&1 >/dev/null || {
    show_yarn_installation_help
    exit 1
}

yarn install
if [[ "$CLEAN" == true ]]; then
    yarn run docusaurus clear
fi
yarn start
