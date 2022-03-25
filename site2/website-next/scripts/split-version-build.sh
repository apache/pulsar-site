#! /bin/sh

node scripts/split-version.js

latest=$(cat scripts/.latest)
language=$(cat scripts/.language)

echo "changed files: "
echo $@

function _build() {
    if [[ "$language" == "en" ]]; then
        echo "only build en"
        yarn build --locale en
    else
        echo "build all"
        yarn build
    fi
}

locals=("en" "zh-CN" "zh-TW" "ja" "ko" "fr")

while read version; do
    if [[ $@ == *website-next/versioned_docs/version-$version* ]]; then
        echo $version "has changed, begin rebuild..."
        echo "[\"${latest}\", \"${version}\"]" >versions.json
        _build
        mkdir -p build-${version}/${version} build-${version}/${version}.md
        cp -r build/docs/${version}/* build-${version}/${version}
        cp -r build/docs/${version}.md/* build-${version}/${version}.md
        for language in ${locals[@]}; do
            if [ -d "build/${language}/docs/${version}" ]; then
                mkdir -p build-${language}-${version}/${version} build-${language}-${version}/${version}.md
                cp -r build/${language}/docs/${version}/* build-${language}-${version}/${version}
                cp -r build/${language}/docs/${version}.md/* build-${language}-${version}/${version}.md
            fi
        done
        echo $version "build done..."
    else
        echo $version "no change, skip"
    fi
done <scripts/.versions

echo "latest version begin build..."
echo "[\"${latest}\"]" >versions.json
_build
echo "latest version build done..."

while read version; do
    if [[ $@ == *website-next/versioned_docs/version-$version* ]]; then
        mv build-$version/* build/docs
        rm -rf build-$version

        for language in ${locals[@]}; do
            if [ -d "build-$language-$version" ]; then
                mv build-$language-$version/* build/$language/docs
                rm -rf build-$language-$version
            fi
        done
    fi
done <scripts/.versions
