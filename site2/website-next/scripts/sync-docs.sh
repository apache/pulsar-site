#! /bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR/../

cp -r pulsar/site2/docs/* pulsar-site/site2/docs
cp -r pulsar/site2/website/versioned_docs/* pulsar-site/site2/website/versioned_docs
cp -r pulsar/site2/website/versioned_sidebars/* pulsar-site/site2/website/versioned_sidebars
cp -r pulsar/site2/docs/assets/* pulsar-site/site2/website-next/static/assets

cp -r pulsar/site2/website/versions.json pulsar-site/site2/website/versions.json
cp -r pulsar/site2/website/versions.json pulsar-site/site2/website-next/versions.json
# cp -r pulsar/site2/docs/* pulsar-site/site2/website-next/docs
# cp -r pulsar-site/site2/website-next/docs/assets/* pulsar-site/site2/website-next/static/assets
# rm -rf pulsar-site/site2/website-next/docs/assets
# cp -r pulsar/site2/website/versioned_docs/* pulsar-site/site2/website-next/versioned_docs
# cp -r pulsar/site2/website/versioned_sidebars/* pulsar-site/site2/website-next/versioned_sidebars
# cp -r pulsar/site2/website/sidebars.json pulsar-site/site2/website-next/sidebars.json
# cp -r pulsar/site2/website/versions.json pulsar-site/site2/website-next/versions.json

cd pulsar-site/site2/website-next
if [ -d "node_modules" ]; then
    echo "skip install"
else
    yarn install
fi
node migrate/migrate-full.js
