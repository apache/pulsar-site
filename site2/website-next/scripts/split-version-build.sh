#! /bin/sh
node scripts/split-version.js

locals=("en" "zh-CN" "zh-TW" "ja" "ko" "fr")
latest=$(cat scripts/.latest)
BUILD_ALL_LANGUAGE="0"
buildVersion="next"

echo "changed files: "
echo $@

function _build() {
    if [[ "$BUILD_ALL_LANGUAGE" == "0" ]]; then
        echo "only build en"
        yarn build --locale en
    else
        echo "build all"
        yarn build
    fi
}

function _buildVersion() {
    if [[ $buildVersion = "next" ]]; then
        echo "..." ${buildVersion} "and" $latest" begin build..."
        echo "[\"en\", \"zh-CN\", \"zh-TW\", \"ja\", \"fr\", \"ko\"]" >./.build-languages.json
        echo "[\"current\", \"${latest}\"]" >.build-versions.json
    else
        echo "..." $buildVersion "begin build..."
        echo "[\"en\", \"zh-CN\"]" >./.build-languages.json
        echo "[\"${buildVersion}\"]" >.build-versions.json
    fi

    _build

    if [[ $buildVersion != $latest ]]; then
        mkdir -p build-${buildVersion}/${buildVersion}
        mkdir -p build-assets
        cp -r build/docs/${buildVersion}/* build-${buildVersion}/${buildVersion}
        cp -r build/assets/* build-assets/
        rm -rf build/docs/${buildVersion}
        for language in ${locals[@]}; do
            if [ -d "build/${language}/docs/${buildVersion}" ]; then
                mkdir -p build-${language}-${buildVersion}/${buildVersion}
                cp -r build/${language}/docs/${buildVersion}/* build-${language}-${buildVersion}/${buildVersion}
                rm -rf build/${language}/docs/${buildVersion}
            fi
        done
    fi
    echo "..." $buildVersion "build done..."
}

COMMIT_MSG=$(git show -s --format=%s)
FORCE_BUILD_ALL_LANGUAGE=$(echo $COMMIT_MSG | sed 's/.*BUILD_ALL_LANGUAGE=\([0-1]*\).*/\1/g')
FORCE_BUILD_ALL_VERSION=$(echo $COMMIT_MSG | sed 's/.*BUILD_ALL_VERSION=\([0-1]*\).*/\1/g')
FORCE_CROWDIN_ALL=$(echo $COMMIT_MSG | sed 's/.*CROWDIN_ALL=\([0-1]*\).*/\1/g')
FORCE_CROWDIN_UP=$(echo $COMMIT_MSG | sed 's/.*CROWDIN_UP=\([0-1]*\).*/\1/g')
FORCE_CROWDIN_DOWN=$(echo $COMMIT_MSG | sed 's/.*CROWDIN_DOWN=\([0-1]*\).*/\1/g')

yarn write-translations
CURRENT_HOUR=$(date +%H)
CURRENT_HOUR=${CURRENT_HOUR#0}
echo "CURRENT_HOUR: "$CURRENT_HOUR

if [[ $FORCE_BUILD_ALL_LANGUAGE"" == "1" ]] || [[ $FORCE_BUILD_ALL_LANGUAGE"" == "0" ]]; then
    BUILD_ALL_LANGUAGE=$FORCE_BUILD_ALL_LANGUAGE""
    echo "force build all languages"
fi
if [[ $FORCE_BUILD_ALL_VERSION"" == "1" ]] || [[ $FORCE_BUILD_ALL_VERSION"" == "0" ]]; then
    BUILD_ALL_VERSION=$FORCE_BUILD_ALL_VERSION""
    echo "force build all versions"
fi

if [[ $CURRENT_HOUR -eq 0 ]] || [[ $FORCE_CROWDIN_ALL"" == "1" ]] || [[ $FORCE_CROWDIN_UP"" == "1" ]]; then
    echo "exec crowdin upload"
    yarn run crowdin-upload
else
    echo "skip crowdin upload"
fi

if [[ $CURRENT_HOUR -eq 18 ]] || [[ $BUILD_ALL_LANGUAGE"" == "1" ]] || [[ $FORCE_CROWDIN_ALL"" == "1" ]] || [[ $FORCE_CROWDIN_DOWN"" == "1" ]]; then
    echo "exec crowdin download"
    yarn crowdin-download
else
    echo "skip crowdin download"
fi

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

cp -r build-assets/* build/assets/
rm -rf build-assets

echo $BUILD_ALL_VERSION""$BUILD_ALL_LANGUAGE >scripts/.build
