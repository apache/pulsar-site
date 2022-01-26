#! /bin/sh

node scripts/split-version.js

latest=$(cat scripts/.latest)

while read version; do
    echo $version "build begin..."
    echo "[\"${latest}\", \"${version}\"]" >versions.json
    yarn build
    mkdir -p build-${version}/${version} build-${version}/${version}.md
    cp -r build/docs/${version}/* build-${version}/${version}
    cp -r build/docs/${version}.md/* build-${version}/${version}.md
    echo $version "build done..."
done <scripts/.versions

while read version; do
    mv build-$version/* build/docs
    rm -rf build-$version
done <scripts/.versions
