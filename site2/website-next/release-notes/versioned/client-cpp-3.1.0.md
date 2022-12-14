---
id: client-cpp-3.1.0
title: Client CPP 3.1.0
sidebar_label: Client CPP 3.1.0
---

## What's Changed
* [feat] Consumer support batch receive messages. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/21
* [feat] Support KeyValue Schema. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/22
* [feat] Support acknowledging a list of messages by @shibd in https://github.com/apache/pulsar-client-cpp/pull/23
* Use parametrized job to build packages by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/36
* Improved the CI check completion by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/40
* Stick clang-format version to 11 and add back docker-format.sh by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/45
* Updated Github actions versions to avoid deprecations by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/49
* [flaky-test] Fix very flaky tests for TEST_P by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/59
* [flaky tests] Fix flaky ShutdownTest::testDestructor by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/62
* [refactor] Apply forward declaration as much as possible by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/64
* Fix macOS compilation errors caused by forward declaration by @Demogorgon314 in https://github.com/apache/pulsar-client-cpp/pull/67
* [ci] Add macOS build workflow by @Demogorgon314 in https://github.com/apache/pulsar-client-cpp/pull/68
* [fix][doc] explicitly instruct clone the repo by @tisonkun in https://github.com/apache/pulsar-client-cpp/pull/69
* [feat] Support expiration for chunked messages by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/71
* Add windows release artifacts by @yaalsn in https://github.com/apache/pulsar-client-cpp/pull/72
* Support linking static dependencies when building with MSVC by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/73
* [refactor] Remove useless files and config. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/76
* Fix CI install deps failed. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/96
* [fix] Flush no batch message when call producer.flush by @shibd in https://github.com/apache/pulsar-client-cpp/pull/98
* [Build] Use Windows server 2019 to release Windows artifacts by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/99
* [fix] Fix consumer doesn't clear incomingMessageQueue during seek by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/101
* Fix Doxygen generation by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/103
* Add MessageId::batchSize() and the MessageIdBuilder by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/105
* Fix MessageId::getDataAsString() crashed with MSVC debug config by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/108
* [feat] Support WaitForExclusive producer access mode. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/109
* [fix] Fix wrong behavior when removing the chunkedMessageCtx by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/110
* [Improve][Build] Use pulsar client as a submodule for C++ projects by @fregate in https://github.com/apache/pulsar-client-cpp/pull/115
* Fix getLastMessageId method dead recursion. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/117
* [feat] Support consumer seek by timestamp and reader seek for C Api by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/118

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/commits/v3.1.0

## New Contributors
* @fregate made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/115
