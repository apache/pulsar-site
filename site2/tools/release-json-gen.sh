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
WEBSITE=$1

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

# gh auth login, ref: https://github.com/apache/pulsar-site/blob/760f7b47f437267a3c9d71d14c73e99ba32bd1ec/site2/website-next/scripts/release-notes.sh#L31-L33
echo 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 > "$TOKEN_FILE"
gh auth login --with-token < "$TOKEN_FILE"
rm "$TOKEN_FILE"

# list all versions sorted by version number desc
versions=$(gh release list -R apache/pulsar | awk '{print $1}' | sort -rV)
for v in $versions
do
    if [[ $v != v* ]]; then # if the version doesn't start with v, add it
        v="v$v"
    fi
    vnum=${v:1} # version number without the leading "v"

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

    # Documentation URL
    lower=$(printf '%s\n2.8.0' "$vnum" | sort -V | head -n1)
    if [[ $lower == "2.8.0" ]]; then # 2.8.0 or later, use ".x" as patch number
        vnum="${vnum%.*}.x"
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
    entry=$(gh release view "$v" -R apache/pulsar --json author,tagName,publishedAt | jq "{author:.author.login,tagName,publishedAt,releaseNotes:\"$release_notes\",releaseBlog:\"$release_blog\",doc:\"$doc\"}")
    echo "$entry," >> "$OUTPUT_PULSAR"

    # Construct Client JSON
    # Store the release notes body and lowercase it
    release_body=$(gh release view "$v" -R apache/pulsar | tr '[:upper:]' '[:lower:]')

    # Java Client
    if [[ $release_body == *"java"* ]]; then
        entry=$(gh release view "$v" -R apache/pulsar --json tagName | jq "{tagName,releaseNotes:\"$release_notes_java\",doc:\"$doc_java\"}")
        echo "$entry," >> "$OUTPUT_JAVA"
    fi

    # Python Client
    if [[ $release_body == *"python"* ]]; then
        entry=$(gh release view "$v" -R apache/pulsar --json tagName | jq "{tagName,releaseNotes:\"$release_notes_python\",doc:\"$doc_python\"}")
        echo "$entry," >> "$OUTPUT_PYTHON"
    fi

    # C++ Client
    if [[ $release_body == *"c++"* ]]; then
        entry=$(gh release view "$v" -R apache/pulsar --json tagName | jq "{tagName,releaseNotes:\"$release_notes_cpp\",doc:\"$doc_cpp\"}")
        echo "$entry," >> "$OUTPUT_CPP"
    fi

    # Websocket Client
    if [[ $release_body == *"websocket"* ]]; then
        entry=$(gh release view "$v" -R apache/pulsar --json tagName | jq "{tagName,releaseNotes:\"$release_notes_ws\",doc:\"$doc_ws\"}")
        echo "$entry," >> "$OUTPUT_WS"
    fi
done

# Go Client
versions=$(gh release list -R apache/pulsar-client-go | awk '{print $(NF-1)}' | sort -rV)
for v in $versions
do
    vnum=${v:1} # version number without the leading "v"

    # Release Note URL
    release_notes_go=$RELEASE_NOTES/pulsar-client-go-$vnum/

    # Documentation URL
    doc=$BASE_URL/docs
    doc_go=$doc/client-libraries-go

    entry=$(gh release view "$v" -R apache/pulsar-client-go --json tagName | jq "{tagName,releaseNotes:\"$release_notes_go\",doc:\"$doc_go\"}")
    echo "$entry," >> "$OUTPUT_GO"
done

# Node Client
versions=$(gh release list -R apache/pulsar-client-node | awk '{print $1}' | sort -rV)
for v in $versions
do
    vnum=${v:1} # version number without the leading "v"

    # Release Note URL
    release_notes_node=$RELEASE_NOTES/pulsar-client-node-$vnum/

    # Documentation URL
    doc=$BASE_URL/docs
    doc_node=$doc/client-libraries-node

    entry=$(gh release view "$v" -R apache/pulsar-client-node --json tagName | jq "{tagName,releaseNotes:\"$release_notes_node\",doc:\"$doc_node\"}")
    echo "$entry," >> "$OUTPUT_NODE"
done

# C# Client, note that we can only get the tags here
versions=$(gh api repos/apache/pulsar-dotpulsar/tags -q ".[].name" | sort -rV)
for v in $versions
do
    # Release Note URL
    release_notes_cs=$RELEASE_NOTES/pulsar-cs-$v/

    # Documentation URL
    doc=$BASE_URL/docs
    doc_cs=$doc/client-libraries-dotnet

    entry="{\"tagName\":\"$v\",\"releaseNotes\":\"$release_notes_cs\",\"doc\":\"$doc_cs\"}"
    echo "$entry," >> "$OUTPUT_CS"
done

for OUTPUT in $OUTPUT_LIST
do
    echo "]" >> "$OUTPUT"
done
