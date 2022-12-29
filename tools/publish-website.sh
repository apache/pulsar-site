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

ORIGIN_REPO=$(git remote show origin | grep 'Push  URL' | awk -F// '{print $NF}')
echo "ORIGIN_REPO: $ORIGIN_REPO"

NEXT=$1
BRANCH_CONTENT="asf-site"
if [ -n "$NEXT" ]; then
  BRANCH_CONTENT="asf-site-"$NEXT
fi

GENERATED_SITE_DIR=$ROOT_DIR/generated-site

PULSAR_SITE_TMP=/tmp/pulsar-site
(
  cd $ROOT_DIR
  REVISION=$(git rev-parse --short HEAD)
  BUILD_ALL=$(cat $ROOT_DIR/scripts/.build)

  rm -rf $PULSAR_SITE_TMP
  mkdir $PULSAR_SITE_TMP
  cd $PULSAR_SITE_TMP

  git clone -b $BRANCH_CONTENT --depth 1 "https://$GH_TOKEN@$ORIGIN_REPO" .
  git config user.name "Pulsar Site Updater"
  git config user.email "dev@pulsar.apache.org"

  # copy the apache generated dir
  if [ ! -d "$PULSAR_SITE_TMP/content/" ]; then
    mkdir -p $PULSAR_SITE_TMP/content/
  fi

  echo "BUILD_ALL:"$BUILD_ALL
  if [[ $BUILD_ALL"" == "1" ]]; then
    echo "clean all the old content"
    find $PULSAR_SITE_TMP/content -print \
      | grep -v $PULSAR_SITE_TMP/content$ \
      | grep -v $PULSAR_SITE_TMP/content/api \
      | grep -v $PULSAR_SITE_TMP/content/charts \
      | grep -v $PULSAR_SITE_TMP/content/css \
      | grep -v $PULSAR_SITE_TMP/content/tools \
      | xargs rm -rf
  fi
  rsync -a $GENERATED_SITE_DIR/content/ $PULSAR_SITE_TMP/content

  git add -A .
  git diff-index --quiet HEAD || (git commit -m "Updated site at revision $REVISION" && git push -q origin HEAD:$BRANCH_CONTENT)

  rm -rf $PULSAR_SITE_TMP
)
