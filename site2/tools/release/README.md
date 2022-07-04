<!--

    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

-->


## Apache Pulsar doc scripts to run for each release

This directory is a work in progress. It will contain the scripts required to create and install all generated docs for
the Pulsar website.

The previous flow built -SNAPSHOT docs on a regular cadence. The new paradigm is to build them for each release.

### Current Status

The following docs are generated per version:

1. Pulsar Javadocs (client, admin client, function api, broker)