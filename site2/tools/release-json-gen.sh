#!/usr/bin/env bash
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#

set -x -e

ROOT_DIR=$(git rev-parse --show-toplevel)
GH_TOKEN=$1
WEBSITE=$2

DATA=$WEBSITE/data
OUTPUT_PULSAR=$DATA/release-pulsar.js
OUTPUT_JAVA=$DATA/release-java.js
OUTPUT_PYTHON=$DATA/release-python.js
OUTPUT_CPP=$DATA/release-cpp.js
OUTPUT_WS=$DATA/release-ws.js
OUTPUT_GO=$DATA/release-go.js
OUTPUT_NODE=$DATA/release-node.js
OUTPUT_CS=$DATA/release-cs.js
OUTPUT_LIST="$OUTPUT_PULSAR $OUTPUT_JAVA $OUTPUT_PYTHON $OUTPUT_CPP $OUTPUT_WS $OUTPUT_GO $OUTPUT_NODE $OUTPUT_CS"

BLOG_DIR=$WEBSITE/blog
TOKEN_FILE=$WEBSITE/scripts/token
# Retrieve the current latest version without patch number
LATEST=$(jq -r ".[0]" < "$WEBSITE"/versions.json)
LATEST=${LATEST%.*}

BASE_URL=https://pulsar.apache.org
RELEASE_NOTES=$BASE_URL/release-notes/versioned

cd "$ROOT_DIR" || exit

for OUTPUT in $OUTPUT_LIST
do
    echo "module.exports = [" > "$OUTPUT"
done

# login to GitHub
echo $GH_TOKEN > "$TOKEN_FILE"
gh auth login --with-token < "$TOKEN_FILE"
rm "$TOKEN_FILE"

# list all versions (>= v2.5.0) sorted by version number desc, including legacy tag releases
releases=$(gh release list -R apache/pulsar | head -n -10 | awk '{print $1}')
versions=$(printf '%s\nv2.5.0\nv2.6.3\nv2.9.1' "$releases" | sort -rV)
for v in $versions
do
    vnum=${v:1} # version number without the leading "v"
    vtag=$vnum

    # Version
    version=
    next=$(echo "$vnum" | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
    if [[ $versions != *$next* ]]; then
        # If the next patch version does not exist, then we add a version column
        version="${v%.*}.x"
    fi

    # Release Note URL
    release_notes=$RELEASE_NOTES/pulsar-$vnum/
    release_notes_java=$RELEASE_NOTES/client-java-$vnum/
    release_notes_python=$RELEASE_NOTES/client-python-$vnum/
    release_notes_cpp=$RELEASE_NOTES/client-cpp-$vnum/
    release_notes_ws=$RELEASE_NOTES/client-websocket-$vnum/

    # Release Blog URL
    release_blog="N/A"

    vdash=${vnum//./-} # replace . with -, e.g. 2.10.1 -> 2-10-1
    md=$(find "$BLOG_DIR" -name "*-Apache-Pulsar-$vdash.md" -exec basename {} \;)
    # should produce the file name e.g. 2022-07-12-Apache-Pulsar-2-10-1.md

    md=${md%.md} # remove the trailing ".md"
    date=${md%-A*} # extract the date, e.g. 2022-07-12
    date=${date//-/\/} # replace - with /, e.g. 2022-07-12 -> 2022/07/12
    path=${md:11} # extract the path, e.g. Apache-Pulsar-2-10-1

    if [[ $date != "" ]]; then # there is an existing blog post
        release_blog=$BASE_URL/blog/$date/$path
    fi

    # author, tagName, publishedAt info and release body
    if [[ $vnum == "2.5.0" || $vnum == "2.6.3" || $vnum == "2.9.1" ]]; then # legacy tag releases
        entry_input=$(cat "$DATA/$vnum.json")
        release_body_input=$(cat "$WEBSITE/release-notes/versioned/pulsar-$vnum.md")
    else
        entry_input=$(gh release view "$v" -R apache/pulsar --json author,tagName,publishedAt)
        release_body_input=$(gh release view "$v" -R apache/pulsar)
    fi

    # Documentation URL
    lower=$(printf '%s\n2.8.0' "$vnum" | sort -V | head -n1)
    if [[ $lower == "2.8.0" ]]; then # 2.8.0 or later, use ".x" as patch number
        vnum="${vnum%.*}.x"
        vtag="${vnum%.*}.x"
    fi
    if [[ ${vnum%.*} == "$LATEST" ]]; then # latest version, use docs/ directly
        vnum=""
    fi
    doc=$BASE_URL/docs/$vnum
    doc_java=$doc/client-libraries-java
    doc_python=$doc/client-libraries-python
    doc_cpp=$doc/client-libraries-cpp
    doc_ws=$doc/client-libraries-websocket

    # Construct Pulsar JSON
    entry=$(echo "$entry_input" | jq "{author:.author.login,tagName,publishedAt,vtag:\"$vtag\",releaseNotes:\"$release_notes\",releaseBlog:\"$release_blog\",doc:\"$doc\",version:\"$version\"}")
    echo "$entry," >> "$OUTPUT_PULSAR"

    # Construct Client JSON
    # Store the release notes body and lowercase it
    release_body=$(echo "$release_body_input" | tr '[:upper:]' '[:lower:]')

    # Java Client
    if [[ $release_body == *"java"* ]]; then
        entry="{tagName: \"$v\",vtag:\"$vtag\",releaseNotes:\"$release_notes_java\",doc:\"$doc_java\",version:\"$version\"}"
        echo "$entry," >> "$OUTPUT_JAVA"
    fi

    # Python Client
    if [[ $release_body == *"python"* ]]; then
        entry="{tagName: \"$v\",vtag:\"$vtag\",releaseNotes:\"$release_notes_python\",doc:\"$doc_python\",version:\"$version\"}"
        echo "$entry," >> "$OUTPUT_PYTHON"
    fi

    # C++ Client
    if [[ $release_body == *"c++"* ]]; then
        entry="{tagName: \"$v\",vtag:\"$vtag\",releaseNotes:\"$release_notes_cpp\",doc:\"$doc_cpp\",version:\"$version\"}"
        echo "$entry," >> "$OUTPUT_CPP"
    fi

    # Websocket Client
    if [[ $release_body == *"websocket"* ]]; then
        entry="{tagName: \"$v\",vtag:\"$vtag\",releaseNotes:\"$release_notes_ws\",doc:\"$doc_ws\",version:\"$version\"}"
        echo "$entry," >> "$OUTPUT_WS"
    fi
done

# Go Client
versions=$(gh release list -R apache/pulsar-client-go | awk '{print $(NF-1)}' | sort -rV)
for v in $versions
do
    vnum=${v:1} # version number without the leading "v"

    # Version
    version=
    next=$(echo "$vnum" | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
    if [[ $versions != *$next* ]]; then
        # If the next patch version exists, then we add a version column
        version="${v%.*}.x"
    fi

    # Release Note URL
    release_notes_go=$RELEASE_NOTES/pulsar-client-go-$vnum/

    # Documentation URL
    doc=$BASE_URL/docs
    doc_go=$doc/client-libraries-go

    entry="{tagName: \"$v\",releaseNotes:\"$release_notes_go\",doc:\"$doc_go\",version:\"$version\"}"
    echo "$entry," >> "$OUTPUT_GO"
done

# Node Client
versions=$(gh release list -R apache/pulsar-client-node | awk '{print $1}' | sort -rV)
for v in $versions
do
    vnum=${v:1} # version number without the leading "v"

    # Version
    version=
    next=$(echo "$vnum" | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
    if [[ $versions != *$next* ]]; then
        # If the next patch version exists, then we add a version column
        version="${v%.*}.x"
    fi

    # Release Note URL
    release_notes_node=$RELEASE_NOTES/pulsar-client-node-$vnum/

    # Documentation URL
    doc=$BASE_URL/docs
    doc_node=$doc/client-libraries-node

    entry="{tagName: \"$v\",releaseNotes:\"$release_notes_node\",doc:\"$doc_node\",version:\"$version\"}"
    echo "$entry," >> "$OUTPUT_NODE"
done

# C# Client (>= 0.9.6), note that we can only get the tags here
versions=$(gh api repos/apache/pulsar-dotpulsar/tags -q ".[].name" | head -n -11 | sort -rV)
for v in $versions
do
    # Version
    version=
    next=$(echo "$v" | awk -F. '{$NF = $NF + 1;} 1' | sed 's/ /./g')
    if [[ $versions != *$next* ]]; then
        # If the next patch version exists, then we add a version column
        version="${v%.*}.x"
    fi

    # Release Note URL
    release_notes_cs=$RELEASE_NOTES/pulsar-cs-$v/

    # Documentation URL
    doc=$BASE_URL/docs
    doc_cs=$doc/client-libraries-dotnet

    entry="{\"tagName\":\"$v\",\"releaseNotes\":\"$release_notes_cs\",\"doc\":\"$doc_cs\",version:\"$version\"}"
    echo "$entry," >> "$OUTPUT_CS"
done

for OUTPUT in $OUTPUT_LIST
do
    echo "]" >> "$OUTPUT"
done
