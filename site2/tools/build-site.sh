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
WEBSITE_DIR="website"
if [ -n "$NEXT" ]; then
  WEBSITE_DIR="website-"$NEXT
fi

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
${ROOT_DIR}/site2/tools/generate-api-docs.sh
cd ${ROOT_DIR}/site2/$WEBSITE_DIR

yarn

if [ -n "$NEXT" ]; then
  yarn write-translations
  CURRENT_HOUR=$(date +%H)
  CURRENT_HOUR=${CURRENT_HOUR#0}
  echo "------ crowdin envs:" "CROWDIN_UPLOAD: "$CROWDIN_UPLOAD "CROWDIN_DOWNLOAD: "$CROWDIN_DOWNLOAD "CURRENT_HOUR: "$CURRENT_HOUR
  if [[ "$CROWDIN_UPLOAD" == "1" || $CURRENT_HOUR -eq 6 ]]; then
    echo "------ exec crowdin upload"
    yarn run crowdin-upload
  else
    echo "------ skip crowdin upload"
  fi
  if [[ "$CROWDIN_DOWNLOAD" == "1" || $CURRENT_HOUR -eq 12 ]]; then
    echo "------ exec crowdin download"
    yarn crowdin-download
    echo 'all' >scripts/.language
  else
    echo "------ skip crowdin download"
    echo 'en' >scripts/.language
  fi

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
${ROOT_DIR}/site2/tools/pulsar-admin-doc-gen.sh $WEBSITE_DIR
${ROOT_DIR}/site2/tools/pulsar-client-doc-gen.sh $WEBSITE_DIR
${ROOT_DIR}/site2/tools/pulsar-perf-doc-gen.sh $WEBSITE_DIR
${ROOT_DIR}/site2/tools/pulsar-doc-gen.sh $WEBSITE_DIR
cd ${ROOT_DIR}/site2/$WEBSITE_DIR

rm -rf ${ROOT_DIR}/generated-site/content
mkdir -p ${ROOT_DIR}/generated-site/content
cp -R ${ROOT_DIR}/generated-site/api ${ROOT_DIR}/generated-site/content
if [ -n "$NEXT" ]; then
  cp -R ./build/* ${ROOT_DIR}/generated-site/content
else
  cp -R ./build/pulsar/* ${ROOT_DIR}/generated-site/content
fi
cp -R ${ROOT_DIR}/generated-site/tools ${ROOT_DIR}/generated-site/content
cp -R ${ROOT_DIR}/site2/$WEBSITE_DIR/static/swagger/* ${ROOT_DIR}/generated-site/content/swagger/
