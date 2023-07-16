---
id: pulsar-client-node-1.9.0
title: Pulsar Client Node 1.9.0
sidebar_label: Pulsar Client Node 1.9.0
---

## What's Changed
* [upgrade] Bump JSON5 and tsconfig-paths @dependabot in https://github.com/apache/pulsar-client-node/pull/270
* [improve] Add schema type to consumer and producer @romainbrancourt in https://github.com/apache/pulsar-client-node/pull/278
* [refactor] optimize ci and build from source code. @shibd in https://github.com/apache/pulsar-client-node/pull/280
* [fix] Fix the issue of the latest client does not work on Rocky Linux 8 @massakam in https://github.com/apache/pulsar-client-node/pull/285
* [fix] Rename binary module_name from Pulsar to pulsar @hrsakai in https://github.com/apache/pulsar-client-node/pull/290
* [upgrade] Upgrade CPP client version to 3.1.1 @shibd in https://github.com/apache/pulsar-client-node/pull/292
* [upgrade] Upgrade ansi-regex @hrsakai in https://github.com/apache/pulsar-client-node/pull/293
* [fix] Remove unnecessary / at the end of CPP_CLIENT_BASE_URL @massakam in https://github.com/apache/pulsar-client-node/pull/294
* [fix] Fix the binary host url @RobertIndie in https://github.com/apache/pulsar-client-node/pull/295
* [fix] Make it compatible with GLIBCXX_3.4.19 (CentOS 7) @BewareMyPower in https://github.com/apache/pulsar-client-node/pull/288
* [upgrade] Upgrade cpp client version to 3.1.2 @shibd in https://github.com/apache/pulsar-client-node/pull/297
* [fix] Use the certificate provided by the node.js @shibd in https://github.com/apache/pulsar-client-node/pull/301
* [fix] Fix error when falling back to local build @massakam in https://github.com/apache/pulsar-client-node/pull/302
* [fix] Fix the issue of incompatible with alpine 3.15 env @shibd https://github.com/apache/pulsar-client-node/pull/304
* [fix] Wrap C++ exception when creating client. @shibd in https://github.com/apache/pulsar-client-node/pull/307
* [fix] Fix symbols conflict of OpenSSL. @shibd in https://github.com/apache/pulsar-client-node/pull/310
* [fix] Add tests for produce and consume with TLS enabled @massakam in https://github.com/apache/pulsar-client-node/pull/313
* [docs] add typedoc to generate apidoc @tisonkun in https://github.com/apache/pulsar-client-node/pull/314
* [fix] Fix message listener doesn't respect receiver queue size @RobertIndie in https://github.com/apache/pulsar-client-node/pull/309
* [fix] Fix reader message listener doesn't respect receiver queue size @RobertIndie in https://github.com/apache/pulsar-client-node/pull/316
* [fix] Add NOTICE file. @shibd in https://github.com/apache/pulsar-client-node/pull/317
* [improve] Add error handling for the message listener @RobertIndie in https://github.com/apache/pulsar-client-node/pull/319
* [feat] Add partitioned topic unit test for Reader. @shibd in https://github.com/apache/pulsar-client-node/pull/329
* [fix] Fix CI always failed. @shibd in https://github.com/apache/pulsar-client-node/pull/333
* [feat] Support batch index ack. @shibd in https://github.com/apache/pulsar-client-node/pull/332
* [feat] Support producer access mode. @shibd in https://github.com/apache/pulsar-client-node/pull/331
* [feat] Support pattern subscription non persistent topic. @shibd in https://github.com/apache/pulsar-client-node/pull/334
* [feat] Support dead letter topic. @shibd in https://github.com/apache/pulsar-client-node/pull/335

**Full Changelog**: https://github.com/apache/pulsar-client-node/milestone/14?closed=1
