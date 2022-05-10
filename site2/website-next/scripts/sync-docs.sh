#! /bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)
cd $ROOT_DIR/../

# --------------------------------------- Before new website launched ---------------------------------------
cp -r pulsar/site2/website/blog/* pulsar-site/site2/website/blog
cp -r pulsar/site2/website/blog/* pulsar-site/site2/website-next/blog

cp -r pulsar/site2/docs/* pulsar-site/site2/docs
cp -r pulsar/site2/website/sidebars.json pulsar-site/site2/website/sidebars.json
cp -r pulsar/site2/website/versioned_docs/* pulsar-site/site2/website/versioned_docs
cp -r pulsar/site2/website/versioned_sidebars/* pulsar-site/site2/website/versioned_sidebars
cp -r pulsar/site2/docs/assets/* pulsar-site/site2/website-next/static/assets

cp -r pulsar/site2/website/versions.json pulsar-site/site2/website/versions.json
cp -r pulsar/site2/website/releases.json pulsar-site/site2/website/releases.json
cp -r pulsar/site2/website/versions.json pulsar-site/site2/website-next/versions.json
cp -r pulsar/site2/website/releases.json pulsar-site/site2/website-next/releases.json

cp -r pulsar/site2/website/release-notes.md pulsar-site/site2/website/release-notes.md
cp -r pulsar/site2/website/pulsar-manager-release-notes.md pulsar-site/site2/website/pulsar-manager-release-notes.md
cp -r pulsar/site2/website/pulsar-manager-release-notes.md pulsar-site/site2/website-next/pulsar-manager/pulsar-manager-release-notes.md
cp -r pulsar/site2/website/pulsar-manager-release.json pulsar-site/site2/website/pulsar-manager-release.json
cp -r pulsar/site2/website/pulsar-manager-release.json pulsar-site/site2/website-next/pulsar-manager/pulsar-manager-release.json
cp -r pulsar/site2/website/pulsar-adapters-release.json pulsar-site/site2/website/pulsar-adapters-release.json
cp -r pulsar/site2/website/pulsar-adapters-release.json pulsar-site/site2/website-next/pulsar-manager/pulsar-adapters-release.json

cp -r pulsar/site2/website/static/swagger/* pulsar-site/site2/website/static/swagger/
cp -r pulsar/site2/website/static/swagger/* pulsar-site/site2/website-next/static/swagger/

cp -r pulsar/site2/website/static/api pulsar-site/site2/website/static/
cp -r pulsar/site2/website/static/api pulsar-site/site2/website-next/static/

cd pulsar-site/site2/website-next
if [ -d "node_modules" ]; then
    echo "skip install"
else
    yarn install
fi

node scripts/split-swagger-by-version.js
node migrate/migrate-blogs.js
node migrate/migrate-full.js

# --------------------------------------- After new website launched and old website backed up ---------------------------------------
# cp -r pulsar/site2/blog/* pulsar-site/site2/website-next/blog
# cp -r pulsar/site2/docs/* pulsar-site/site2/website-next/docs
# cp -r pulsar-site/site2/website-next/docs/assets/* pulsar-site/site2/website-next/static/assets
# rm -rf pulsar-site/site2/website-next/docs/assets
# cp -r pulsar/site2/website/versioned_docs/* pulsar-site/site2/website-next/versioned_docs
# cp -r pulsar/site2/website/versioned_sidebars/* pulsar-site/site2/website-next/versioned_sidebars
# cp -r pulsar/site2/website/sidebars.json pulsar-site/site2/website-next/sidebars.json
# cp -r pulsar/site2/website/versions.json pulsar-site/site2/website-next/versions.json
# cp -r pulsar/site2/website/releases.json pulsar-site/site2/website-next/releases.json
# cp -r pulsar/site2/website/pulsar-manager-release-notes.md pulsar-site/site2/website-next/pulsar-manager/pulsar-manager-release-notes.md
# cp -r pulsar/site2/website/pulsar-manager-release.json pulsar-site/site2/website-next/pulsar-manager/pulsar-manager-release.json
# cp -r pulsar/site2/website/pulsar-adapters-release.json pulsar-site/site2/website-next/pulsar-manager/pulsar-adapters-release.json
# cp -r pulsar/site2/website/static/swagger/* pulsar-site/site2/website-next/static/swagger/
# cp -r pulsar/site2/website/static/api pulsar-site/site2/website-next/static/