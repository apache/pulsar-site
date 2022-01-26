#! /bin/sh

node scripts/split-version.js

latest=$(cat scripts/.latest)

echo "changed files: " 
echo $@

while read version; do
    if [[ $@ == *website-next/versioned_docs/version-$version* ]]
    then
        echo $version "has changed, begin rebuild..."
        echo "[\"${latest}\", \"${version}\"]" >versions.json
        yarn build
        mkdir -p build-${version}/${version} build-${version}/${version}.md
        cp -r build/docs/${version}/* build-${version}/${version}
        cp -r build/docs/${version}.md/* build-${version}/${version}.md
        echo $version "build done..."
    else
        echo $version "no change, skip"
    fi
done <scripts/.versions

while read version; do
    if [[ $@ == *website-next/versioned_docs/version-$version* ]]
    then
        mv build-$version/* build/docs
        rm -rf build-$version
    fi
done <scripts/.versions
