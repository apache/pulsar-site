#! /bin/sh
# echo -e "\n\nY\n" | ./release-notes.sh

ROOT_DIR=$(git rev-parse --show-toplevel)

TOKEN=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

echo $TOKEN >./token
# gh auth login --with-token <token
cd $ROOT_DIR/../pulsar

mkdir -p $ROOT_DIR/site2/website-next/scripts/release-notes

VERSIONS=$(cat $ROOT_DIR/site2/website-next/versions-full.json | jq -r ".[]")
# for version in $VERSIONS; do
#     gh pr list --limit 200 --label "release/"$version --state merged --json labels,title,number > $ROOT_DIR/site2/website-next/scripts/release-notes/$version.json
# done

node $ROOT_DIR/site2/website-next/scripts/release-notes.js $ROOT_DIR
