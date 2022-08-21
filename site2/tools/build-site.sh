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

ROOT_DIR=$(git rev-parse --show-toplevel)
VERSION=$(${ROOT_DIR}/src/get-project-version.py)

NEXT=$1
WEBSITE_DIR=${ROOT_DIR}/site2/website
if [ -n "$NEXT" ]; then
  WEBSITE_DIR=${ROOT_DIR}/site2/website-$NEXT
fi
TOOLS_DIR=${ROOT_DIR}/site2/tools
GEN_SITE_DIR=$GEN_SITE_DIR

function workaround_crowdin_problem_by_copying_files() {
  # TODO: remove this after figuring out why crowdin removed code tab when generating translated files
  # https://github.com/apache/pulsar/issues/5816
  node scripts/fix-tab.js
}

function crowdin() {
  yarn write-translations
  if [ "$CROWDIN_DOCUSAURUS_API_KEY" != "UNSET" ]; then
    # The crowdin upload and download take a long time to run, and have resulted in timeouts. In order to ensure that the
    # website is still able to get published, we only run the download and upload if current hour is 0-5.
    # This leads to executing crowdin-upload and crowdin-download once per day when website build is scheduled
    # to run with cron expression '0 */6 * * *'
    CURRENT_HOUR=$(date +%H)
    CURRENT_HOUR=${CURRENT_HOUR#0}
    if [[ "$CROWDIN_UPLOAD" == "1" || $CURRENT_HOUR -lt 6 ]]; then
      yarn run crowdin-upload
    fi
    if [[ "$CROWDIN_DOWNLOAD" == "1" || $CURRENT_HOUR -gt 12 ]]; then
      yarn crowdin-download
      workaround_crowdin_problem_by_copying_files
    fi
  else
    # set English as the only language to build in this case
    cat >languages.js <<'EOF'
const languages = [
{
  enabled: true,
  name: 'English',
  tag: 'en',
}];
module.exports = languages;
EOF
  fi
}

set -x -e

export NODE_OPTIONS="--max-old-space-size=16000"
$TOOLS_DIR/generate-api-docs.sh
cd $WEBSITE_DIR

yarn

if [ -n "$NEXT" ]; then
  node scripts/replace.js
  node scripts/split-swagger-by-version.js
  # Because there are too many versions of the document, the memory overflows during the full build.
  # The split-version-build script is used to build in different versions, and finally the build results are merged.
  bash scripts/split-version-build.sh $@
else
  crowdin
  yarn build
  node ./scripts/replace.js
  node ./scripts/split-swagger-by-version.js
fi

# Generate document for command line tools.
$TOOLS_DIR/pulsar-admin-doc-gen.sh $WEBSITE_DIR
$TOOLS_DIR/pulsar-client-doc-gen.sh $WEBSITE_DIR
$TOOLS_DIR/pulsar-perf-doc-gen.sh $WEBSITE_DIR
$TOOLS_DIR/pulsar-doc-gen.sh $WEBSITE_DIR
$TOOLS_DIR/pulsar-config-doc-gen.sh $WEBSITE_DIR
cd $WEBSITE_DIR

CONTENT_DIR=$GEN_SITE_DIR/content

rm -rf $CONTENT_DIR
mkdir -p $CONTENT_DIR
cp -R $GEN_SITE_DIR/reference $CONTENT_DIR
cp -R $GEN_SITE_DIR/api $CONTENT_DIR
if [ -n "$NEXT" ]; then
  cp -R ./build/* $CONTENT_DIR
else
  cp -R ./build/pulsar/* $CONTENT_DIR
fi
cp -R $GEN_SITE_DIR/tools $CONTENT_DIR
cp -R $WEBSITE_DIR/static/swagger/* $CONTENT_DIR/swagger/
