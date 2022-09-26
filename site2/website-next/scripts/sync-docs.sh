#! /bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)

SRC_DIR=$ROOT_DIR/../pulsar/site2
if [ "" != $1"" ]; then # when preview in pulsar repo
    SRC_DIR=$ROOT_DIR/../..
fi

cp -r $SRC_DIR/docs/* $ROOT_DIR/site2/website-next/docs
cp -r $ROOT_DIR/site2/website-next/docs/assets/* $ROOT_DIR/site2/website-next/static/assets
rm -rf $ROOT_DIR/site2/website-next/docs/assets
cp -r $SRC_DIR/website/versioned_docs/* $ROOT_DIR/site2/website-next/versioned_docs
cp -r $SRC_DIR/website/versioned_sidebars/* $ROOT_DIR/site2/website-next/versioned_sidebars
cp -r $SRC_DIR/website/sidebars.json $ROOT_DIR/site2/website-next/sidebars.json
cp -r $SRC_DIR/website/versions.json $ROOT_DIR/site2/website-next/versions.json
cp -r $SRC_DIR/website/releases.json $ROOT_DIR/site2/website-next/releases.json
cp -r $SRC_DIR/website/pulsar-manager-release-notes.md $ROOT_DIR/site2/website-next/pulsar-manager/pulsar-manager-release-notes.md
cp -r $SRC_DIR/website/pulsar-manager-release.json $ROOT_DIR/site2/website-next/pulsar-manager/pulsar-manager-release.json
cp -r $SRC_DIR/website/pulsar-adapters-release.json $ROOT_DIR/site2/website-next/pulsar-manager/pulsar-adapters-release.json
cp -r $SRC_DIR/website/static/swagger/* $ROOT_DIR/site2/website-next/static/swagger/
cp -r $SRC_DIR/website/static/api $ROOT_DIR/site2/website-next/static/

cd $ROOT_DIR/site2/website-next
if [ -d "node_modules" ]; then
    :
else
    yarn install
fi

node scripts/split-swagger-by-version.js

echo "full sync done..."
