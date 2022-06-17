#! /bin/sh
node scripts/split-version.js

locals=("en" "zh-CN" "zh-TW" "ja" "ko" "fr")
latest=$(cat scripts/.latest)
BUILD_ALL_LANGUAGE="en"
buildVersion="next"
slashDir=""

echo "changed files: "
echo $@

function _fileSlash() {
    if [ -d "$slashDir/" ]; then
        for file in $slashDir/*; do
            if test -f $file; then
                fname=$(basename $file)
                ex=${fname##*.}
                if [ $ex == "html" ]; then
                    dir=$(basename $fname ".$ex")
                    mkdir -p $slashDir/$dir
                    cp -r $file $slashDir/$dir/index.html
                    node scripts/fix-index.js $slashDir/$dir/index.html
                fi
            fi
        done
    fi
}

function _copySlash() {
    array=($buildVersion)
    if [ ${buildVersion} = "next" ]; then
        array=("next" "latest")
    fi
    for bv in ${array[@]}; do
        slashDir="build/docs/${bv}"
        if [ $bv = "latest" ]; then
            slashDir="build/docs"
        fi
        _fileSlash
        for language in ${locals[@]}; do
            slashDir="build/${language}/docs/${bv}"
            if [ $bv = "latest" ]; then
                slashDir="build/${language}/docs"
            fi
            _fileSlash
        done
    done
}

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
        _copySlash

        mkdir -p build-${buildVersion}/${buildVersion} #build-${buildVersion}/${buildVersion}.md
        cp -r build/docs/${buildVersion}/* build-${buildVersion}/${buildVersion}
        # cp -r build/docs/${buildVersion}.md/* build-${buildVersion}/${buildVersion}.md
        rm -rf build/docs/${buildVersion} #build/docs/${buildVersion}.md
        for language in ${locals[@]}; do
            if [ -d "build/${language}/docs/${buildVersion}" ]; then
                mkdir -p build-${language}-${buildVersion}/${buildVersion} #build-${language}-${buildVersion}/${buildVersion}.md
                cp -r build/${language}/docs/${buildVersion}/* build-${language}-${buildVersion}/${buildVersion}
                # cp -r build/${language}/docs/${buildVersion}.md/* build-${language}-${buildVersion}/${buildVersion}.md
                rm -rf build/${language}/docs/${buildVersion} #build/${language}/docs/${buildVersion}.md
            fi
        done
    fi
    echo "..." $buildVersion "build done..."
}

yarn write-translations
CURRENT_HOUR=$(date +%H)
CURRENT_HOUR=${CURRENT_HOUR#0}
echo "------ crowdin envs:" "CROWDIN_UPLOAD: "$CROWDIN_UPLOAD "CROWDIN_DOWNLOAD: "$CROWDIN_DOWNLOAD "CURRENT_HOUR: "$CURRENT_HOUR
if [[ $CURRENT_HOUR -eq 0 ]]; then
    echo "------ exec crowdin upload"
    yarn run crowdin-upload
else
    echo "------ skip crowdin upload"
fi

#force set CURRENT_HOUR for testing crowdin download and build all
# CURRENT_HOUR=18
if [[ $CURRENT_HOUR -eq 18 ]]; then
    echo "------ exec crowdin download"
    yarn crowdin-download
    BUILD_ALL_LANGUAGE="1"
    BUILD_ALL_VERSION="1"
else
    echo "------ skip crowdin download"
    BUILD_ALL_LANGUAGE="0"
    BUILD_ALL_VERSION="0"
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
