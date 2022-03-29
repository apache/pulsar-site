#! /bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)
MAIN=(
    "pulsar"
    "client-java"
    "client-python"
    "client-cpp"
    "client-websocket"
)
OTHER=(
    "client-go"
    "client-node"
    "client-c#"
)

echo "Supported components: "${MAIN[@]} ${OTHER[@]}
read -p "Please enter component name: " COMPONENT
if [ ! $COMPONENT ]; then
    echo "Generate all release notes(all versions) of all components"
else
    read -p "Please enter version: " VERSION
    if [ ! $VERSION ]; then
        echo "Generate release notes(all versions) of $COMPONENT"
    else
        echo "Generate release notes($VERSION) of $COMPONENT"
    fi
fi

function _ghFromPulsar() {
    echo $TOKEN >$ROOT_DIR/site2/website-next/scripts/token
    gh auth login --with-token <$ROOT_DIR/site2/website-next/scripts/token
    rm $ROOT_DIR/site2/website-next/scripts/token

    cd $ROOT_DIR/../pulsar

    mkdir -p $ROOT_DIR/site2/website-next/scripts/release-notes

    if [ ! $VERSION ]; then
        VERSIONS=$(cat $ROOT_DIR/site2/website-next/versions-full.json | jq -r ".[]")
        for version in $VERSIONS; do
            gh pr list --limit 200 --label "release/"$version --state merged --json labels,title,number >$ROOT_DIR/site2/website-next/scripts/release-notes/$version.json
        done
    else
        gh pr list --limit 200 --label "release/"$VERSION --state merged --json labels,title,number >$ROOT_DIR/site2/website-next/scripts/release-notes/$VERSION.json
    fi
}

if [ ! $COMPONENT ]; then
    # _ghFromPulsar
    node $ROOT_DIR/site2/website-next/scripts/release-notes.js $ROOT_DIR
    node $ROOT_DIR/site2/website-next/scripts/release-notes-other.js $ROOT_DIR
else
    if [[ "${OTHER[@]}" =~ "${COMPONENT}" ]]; then
        node $ROOT_DIR/site2/website-next/scripts/release-notes-other.js $ROOT_DIR $COMPONENT $VERSION
    else
        # _ghFromPulsar
        node $ROOT_DIR/site2/website-next/scripts/release-notes.js $ROOT_DIR $COMPONENT $VERSION
    fi
fi
