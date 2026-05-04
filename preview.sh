#!/bin/bash
if [[ "$1" == "help" || "$1" == "--help" ]]; then
    echo "Usage: ./preview.sh [--clean] [version1] [version2] [version3]"
    exit 0
fi

if [[ "$1" == "--clean" || "$1" == "-c" ]]; then
    shift
    CLEAN=true
fi

BUILD_VERSIONS='["current"'
for version in "$@"; do
    BUILD_VERSIONS="${BUILD_VERSIONS}, \"${version}\""
done
BUILD_VERSIONS="${BUILD_VERSIONS}]"

echo "$BUILD_VERSIONS" >.build-versions.json

show_yarn_installation_help() {
    local brew_prefix
    brew_prefix="$(brew --prefix 2>/dev/null || echo "/opt/homebrew")"
    echo "*** yarn / Corepack is not working. ***"
    echo
    echo "If you see any of the following errors, the fix is almost always to run 'corepack enable':"
    echo "  - 'command not found: yarn'"
    echo "  - 'Internal Error: ... does not match the signature' / 'Cannot find matching keyid' (Corepack signature errors)"
    echo "  - 'Cannot find module' errors when yarn starts"
    echo "  - any other unexpected error from the Node.js package manager on a fresh machine"
    echo
    echo "Run this first:"
    echo "  corepack enable"
    echo
    echo "Background: yarn is distributed via Corepack, which is bundled with the Node runtime."
    echo "Corepack must be activated once per Node installation before yarn can be used."
    echo
    echo "Install Node.js 24 LTS either with fnm (https://github.com/Schniz/fnm) or with Homebrew."
    echo "Don't install yarn separately from a package manager. With Homebrew, uninstall any existing yarn installation with 'brew uninstall yarn'"
    echo "If 'corepack enable' still fails, delete the broken symlinks in Homebrew's bin and run it again:"
    echo "  find ${brew_prefix}/bin -type l ! -exec test -e {} \; -delete && corepack enable"
    echo "If it still fails due to file conflicts, remove the conflicting files manually from ${brew_prefix}/bin and try again."
}

if ! command -v yarn &>/dev/null; then
    show_yarn_installation_help
    exit 1
fi

yarn help >/dev/null 2>&1 || {
    show_yarn_installation_help
    exit 1
}

yarn install
if [[ "$CLEAN" == true ]]; then
    yarn run docusaurus clear
fi
yarn start
