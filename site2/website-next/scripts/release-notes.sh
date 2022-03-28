#! /bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)

# echo $TOKEN >$ROOT_DIR/site2/website-next/scripts/token
# gh auth login --with-token <$ROOT_DIR/site2/website-next/scripts/token
# rm $ROOT_DIR/site2/website-next/scripts/token

# cd $ROOT_DIR/../pulsar

# mkdir -p $ROOT_DIR/site2/website-next/scripts/release-notes

# VERSIONS=$(cat $ROOT_DIR/site2/website-next/versions-full.json | jq -r ".[]")
# for version in $VERSIONS; do
#     gh pr list --limit 200 --label "release/"$version --state merged --json labels,title,number > $ROOT_DIR/site2/website-next/scripts/release-notes/$version.json
# done

# node $ROOT_DIR/site2/website-next/scripts/release-notes.js $ROOT_DIR
node $ROOT_DIR/site2/website-next/scripts/release-notes-other.js $ROOT_DIR