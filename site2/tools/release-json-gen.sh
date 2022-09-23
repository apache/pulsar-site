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
OUTPUT=$WEBSITE/data/release-table.js
BLOG_DIR=$WEBSITE/blog
TOKEN_FILE=$WEBSITE/scripts/token
LATEST=2.10

cd "$ROOT_DIR" || exit

echo "module.exports = [" > "$OUTPUT"

# gh auth login, ref: https://github.com/apache/pulsar-site/blob/760f7b47f437267a3c9d71d14c73e99ba32bd1ec/site2/website-next/scripts/release-notes.sh#L31-L33
echo "$TOKEN" > "$TOKEN_FILE"
gh auth login --with-token < "$TOKEN_FILE"
rm "$TOKEN_FILE"

versions=$(gh release list | awk '{print $1}')
for v in $versions
do
    if [[ $v != v* ]]; then # if the version doesn't start with v, add it
        v="v$v"
    fi
    vnum=${v:1} # version number without the leading "v"

    # Release Note URL
    release_notes=https://pulsar.apache.org/release-notes/versioned/pulsar-$vnum/
    
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
        release_blog=https://pulsar.apache.org/blog/$date/$path
    fi

    # Documentation URL
    lower=$(printf '%s\n2.8.0' "$vnum" | sort -V | head -n1)
    if [[ $lower == "2.8.0" ]]; then # 2.8.0 or later, use ".x" as patch number
        vnum="${vnum%.*}.x"
    fi
    if [[ ${vnum%.*} == "$LATEST" ]]; then # latest version, use docs/ directly
        vnum=""
    fi
    doc=https://pulsar.apache.org/docs/$vnum

    # Construct JSON
    entry=$(gh release view "$v" --json author,tagName,publishedAt | jq "{author:.author.login,tagName,publishedAt,releaseNotes:\"$release_notes\",releaseBlog:\"$release_blog\",doc:\"$doc\"}")
    echo "$entry," >> "$OUTPUT"
done

echo "]" >> "$OUTPUT"
