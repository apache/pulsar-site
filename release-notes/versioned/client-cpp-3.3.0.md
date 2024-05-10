---
id: client-cpp-3.3.0
title: Client CPP 3.3.0
sidebar_label: Client CPP 3.3.0
---

## What's Changed
* [feat] Support end-to-end encryption in C Reader API by @rbarbey in https://github.com/apache/pulsar-client-cpp/pull/262
* [doc] Fix compile perf on MacOS and Ubuntu. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/263
* [Doc] Add links to client docs and feature matrix in README.md by @momo-jun in https://github.com/apache/pulsar-client-cpp/pull/264
* Fix deadlock for negative acknowledgment by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/266
* Support specifying the C++ standard for some higher dependencies by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/269
* Bumped version to 3.3.0-pre by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/271
* Fix batch receive for C client unit test failed. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/272
* [improve] AuthAthenz supports Copper Argos by @shustsud in https://github.com/apache/pulsar-client-cpp/pull/274
* [feat][consumer] Support parse broker metadata by @Shoothzj in https://github.com/apache/pulsar-client-cpp/pull/276
* add cmake-build-debug dir to gitignore by @Shoothzj in https://github.com/apache/pulsar-client-cpp/pull/275
* [docs] Fix the developer guide for macOS users by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/279
* Fix flaky testConsumerEventWithoutPartition caused by the change of Pulsar 3.0 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/281
* [feat][Message] Add getIndex method on Message by @Shoothzj in https://github.com/apache/pulsar-client-cpp/pull/277
* Fix testSchemaIncompatibility for Protobuf 3.20.0 or later by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/282
* Remove log4cxx dependency and its specified configuration by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/283
* Close the socket gracefully on Windows by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/284
* Fix ci failed on macOS env. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/288
* Fix broker return error code confusion when not setting subscription name. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/289
* feat: Support message copy for C client. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/285
* Add missing TLS-related method definitions for C client. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/287
* [feat] Support configure startMessageIdInclusive for the reader by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/291
* Fix build failure with the Protobuf 23.3 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/290
* Fix retriable errors not handled well when creating producer or consumer by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/293
* [fix] producer will not be created when topic update partition by @TakaHiR07 in https://github.com/apache/pulsar-client-cpp/pull/295
* Fix the buggy Future and Promise implementations by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/299
* Fix the test script does not work for Docker on macOS by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/297
* feat: Support table view for C client. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/294
* Fix the wrong backoff computation when retrying by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/296
* Fix the build failure with C++20 standard by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/302
* [fix] callback of send batch message receives a wrong result when flushing by @TakaHiR07 in https://github.com/apache/pulsar-client-cpp/pull/303
* [fix][client] Memory leak during GET_LAST_MESSAGE_ID command processing. by @fundaev in https://github.com/apache/pulsar-client-cpp/pull/301

## New Contributors
* @rbarbey made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/262
* @momo-jun made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/264
* @shustsud made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/274
* @Shoothzj made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/276
* @TakaHiR07 made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/295
* @fundaev made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/301

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.2.0...v3.3.0
