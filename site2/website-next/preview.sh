#! /bin/sh
BUILD_VERSIONS="[\"current\""
for version in $@; do
    BUILD_VERSIONS=$BUILD_VERSIONS", \""$version"\""
done
BUILD_VERSIONS=$BUILD_VERSIONS"]"

echo $BUILD_VERSIONS >.build-versions.json

yarn install
yarn start
