#! /bin/sh

node scripts/split-version.js

locals=("en" "zh-CN" "zh-TW" "ja" "ko" "fr")
latest=$(cat scripts/.latest)
buildLanguage=$(cat scripts/.language)
buildVersion="next"

echo "changed files: "
echo $@

function _build() {
    if [[ "$buildLanguage" == "en" ]]; then
        echo "only build en"
        yarn build --locale en
    else
        echo "build all"
        yarn build
    fi
}

function _buildVersion() {
    echo "..." $buildVersion "begin build..."
    if [[ $buildVersion = "next" ]]; then
        echo "[\"current\"]" >.build-versions.json
    else
        echo "[\"${buildVersion}\"]" >.build-versions.json
    fi

    _build

    if [[ $buildVersion != $latest ]]; then
        mkdir -p build-${buildVersion}/${buildVersion} build-${buildVersion}/${buildVersion}.md
        cp -r build/docs/${buildVersion}/* build-${buildVersion}/${buildVersion}
        cp -r build/docs/${buildVersion}.md/* build-${buildVersion}/${buildVersion}.md
        rm -rf build/docs/${buildVersion} build/docs/${buildVersion}.md
        for language in ${locals[@]}; do
            if [ -d "build/${language}/docs/${buildVersion}" ]; then
                mkdir -p build-${language}-${buildVersion}/${buildVersion} build-${language}-${buildVersion}/${buildVersion}.md
                cp -r build/${language}/docs/${buildVersion}/* build-${language}-${buildVersion}/${buildVersion}
                cp -r build/${language}/docs/${buildVersion}.md/* build-${language}-${buildVersion}/${buildVersion}.md
                rm -rf build/${language}/docs/${buildVersion} build/${language}/docs/${buildVersion}.md
            fi
        done
    fi
    echo "..." $buildVersion "build done..."
}

# force build all versions
# BUILD_ALL_VERSION="1"

# sometimes need build specify versions
SUPPLEMENT_VERSIONS=""

# Build only the versions that has changed
# Build next version that has any changed
while read version; do
    buildVersion=$version
    if [[ $@ == *website-next/versioned_docs/version-$version* || $buildVersion == "next" || $BUILD_ALL_VERSION == "1" || $BUILD_VERSION == *$buildVersion* || $SUPPLEMENT_VERSIONS == *$buildVersion* ]]; then
        _buildVersion
    else
        echo "..." $buildVersion "no change, skip"
    fi
done <scripts/.versions

while read version; do
    if [ -d "build-$version" ]; then
        mv -f build-$version/* build/docs
        rm -rf build-$version

        for language in ${locals[@]}; do
            if [ -d "build-$language-$version" ]; then
                mv -f build-$language-$version/* build/$language/docs
                rm -rf build-$language-$version
            fi
        done
    fi
done <scripts/.versions
