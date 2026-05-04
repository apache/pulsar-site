---
id: client-cpp-3.8.0
title: Client CPP 3.8.0
sidebar_label: Client CPP 3.8.0
---

## What's Changed
* [fix] Fix an issue where zero queue consumers are unable to receive messages after topic unloading by @massakam in https://github.com/apache/pulsar-client-cpp/pull/473
* Make it optional to link statically to libgcc and libstdc++ by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/474
* Bumped version to 3.8.0-pre by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/470
* Fix multi-topics-consumer new topic listeners stuck in paused state by @oversearch in https://github.com/apache/pulsar-client-cpp/pull/481
* fix: ignore ping command in connection keepalive logic by @erobot in https://github.com/apache/pulsar-client-cpp/pull/480
* Bump curl, openssl, zlib to address CVEs by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/482
* [ci] Fix upload-artifact v3 is not supported by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/484
* Fix the scripts for downloading GitHub Action artifacts by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/485
* Fix TableView's existing key-value will never be updated by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/487
* Fix stage-release.sh does not delete the Windows temporary directories by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/488
* [CI] Add clang-tidy check with clang-analyzer and performance checks by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/490
* Avoid getLastMessageId RPC when calling hasMessageAvailable after seek by timestamp by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/491
* Fix acknowledgeCumulative never returns when accepting an invalid message id for a multi-topics consumer by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/492
* Remove static link to libstdc++ to avoid conflicts by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/493
* [improve] modify the negativeACK structure to reduce memory overhead by @gy-deng in https://github.com/apache/pulsar-client-cpp/pull/497
* Fix hasMessageAvailable incorrectly returns true when read to latest after seeking by timestamp by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/498
* fix: remove unnecessary copies by @gy-deng in https://github.com/apache/pulsar-client-cpp/pull/499
* Fix duplicated subscribed topics not deduplicated by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/501
* Fix crash caused by Message::getTopicName when the message is a producer message by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/503
* Use vcpkg to build alpine packages by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/505

## New Contributors
* @oversearch made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/481
* @gy-deng made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/497

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.7.0...v3.8.0
