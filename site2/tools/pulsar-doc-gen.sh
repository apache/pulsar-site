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
VERSION=`${ROOT_DIR}/src/get-project-version.py`
DEST_DIR=$ROOT_DIR/generated-site
WEBSITE=$1
SITE_DIR=$DEST_DIR/tools/pulsar/${VERSION}

cd $ROOT_DIR

mkdir -p $SITE_DIR
mkdir -p $SITE_DIR/node_modules
mkdir -p ${WEBSITE}/brodocs/documents

${ROOT_DIR}/site2/tools/pulsar-md.sh $ROOT_DIR $WEBSITE

cd ${WEBSITE}/brodocs
cp pulsar-manifest.json manifest.json
node brodoc.js

cp index.html navData.js stylesheet.css scroll.js tabvisibility.js favicon.ico $SITE_DIR
mkdir -p $SITE_DIR/node_modules/bootstrap/dist/css
cp -r ${WEBSITE}/node_modules/bootstrap/dist/css/bootstrap.min.css $SITE_DIR/node_modules/bootstrap/dist/css
mkdir -p $SITE_DIR/node_modules/font-awesome/css
cp -r ${WEBSITE}/node_modules/font-awesome/css/font-awesome.min.css $SITE_DIR/node_modules/font-awesome/css
mkdir -p $SITE_DIR/node_modules/highlight.js/styles
cp -r ${WEBSITE}/node_modules/highlight.js/styles/default.css $SITE_DIR/node_modules/highlight.js/styles
mkdir -p $SITE_DIR/node_modules/jquery/dist
cp -r ${WEBSITE}/node_modules/jquery/dist/jquery.min.js $SITE_DIR/node_modules/jquery/dist/
mkdir -p $SITE_DIR/node_modules/jquery.scrollto
cp -r ${WEBSITE}/node_modules/jquery.scrollto/jquery.scrollTo.min.js $SITE_DIR/node_modules/jquery.scrollto


