#! /bin/sh
BUILD_VERSIONS="[\"current\""
for version in $@; do
    BUILD_VERSIONS=$BUILD_VERSIONS", \""$version"\""
done
BUILD_VERSIONS=$BUILD_VERSIONS"]"

echo $BUILD_VERSIONS >.build-versions.json

if ! command -v yarn &>/dev/null; then
    echo "yarn is not available. yarn comes with corepack, with homebrew you can install it by running:"
    echo "brew install corepack || brew link corepack"
    echo "corepack enable"
    exit 1
fi

yarn install
yarn start
