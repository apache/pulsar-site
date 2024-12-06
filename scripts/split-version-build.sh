#! /bin/sh

set -x -e

node scripts/split-version.js

latest=$(cat scripts/.latest)
buildVersion="next"

echo "changed files: "
echo $@

function _build() {
    yarn build
}

function _buildVersion() {
    if [[ $buildVersion = "next" ]]; then
        echo "..." ${buildVersion} "and" $latest" begin build..."
        echo "[\"current\", \"${latest}\"]" >.build-versions.json
    else
        echo "..." $buildVersion "begin build..."
        echo "[\"${buildVersion}\"]" >.build-versions.json
    fi

    _build

    if [[ $buildVersion != $latest ]]; then
        mkdir -p build-${buildVersion}/${buildVersion}
        mkdir -p build-assets
        cp -r build/docs/${buildVersion}/* build-${buildVersion}/${buildVersion}
        cp -r build/assets/* build-assets/
        rm -rf build/docs/${buildVersion}
    fi
    echo "..." $buildVersion "build done..."
}

COMMIT_MSG=$(git show -s --format="%s %B")
FORCE_BUILD_ALL_VERSION=$(echo $COMMIT_MSG | sed 's/.*BUILD_ALL_VERSION=\([0-1]*\).*/\1/g')
FORCE_BUILD_VERSIONS=$(echo $COMMIT_MSG | sed 's/.*BUILD_VERSIONS=\([0-9\.x,]*\).*/\1/g')
if [[ $FORCE_BUILD_VERSIONS =~ ^[0-9\.x,]+$ ]]; then
    SUPPLEMENT_VERSIONS=$FORCE_BUILD_VERSIONS
else
    SUPPLEMENT_VERSIONS=""
fi

CURRENT_HOUR=$(date +%H)
CURRENT_HOUR=${CURRENT_HOUR#0}
echo "CURRENT_HOUR: "$CURRENT_HOUR

if [[ $FORCE_BUILD_ALL_VERSION"" == "1" ]] || [[ $FORCE_BUILD_ALL_VERSION"" == "0" ]]; then
    BUILD_ALL_VERSION=$FORCE_BUILD_ALL_VERSION""
    echo "force build all versions"
fi

# Build only the versions that has changed and build next version that has any changed
while read version; do
    buildVersion=$version
    if [[ $@ == *versioned_docs/version-$version* || $buildVersion == "next" || $BUILD_ALL_VERSION == "1" || $BUILD_VERSION == *$buildVersion* || $SUPPLEMENT_VERSIONS == *$buildVersion* ]]; then
        _buildVersion
    else
        echo "..." $buildVersion "no change, skip"
    fi
done <scripts/.versions

while read version; do
    if [ -d "build-$version" ]; then
        mv -f build-$version/* build/docs
        rm -rf build-$version
    fi
done <scripts/.versions

cp -r build-assets/* build/assets/
rm -rf build-assets
cp static/.htaccess build/

echo $BUILD_ALL_VERSION >scripts/.build
