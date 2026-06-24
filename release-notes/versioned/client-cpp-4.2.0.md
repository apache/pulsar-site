---
id: client-cpp-4.2.0
title: Client CPP 4.2.0
sidebar_label: Client CPP 4.2.0
---

## What's Changed
* [fix][cmake] apple build by @daeho-ro in https://github.com/apache/pulsar-client-cpp/pull/562
* Fix broken CI due to token string not trimmed by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/565
* [fix][client-cpp] modern boost cancel method without args by @daeho-ro in https://github.com/apache/pulsar-client-cpp/pull/561
* [feat][client] Support null value messages by @Bhargavkonidena in https://github.com/apache/pulsar-client-cpp/pull/563
* [fix][cpp-client] Pass seek error to callback when SEEK command fails by @zhanglistar in https://github.com/apache/pulsar-client-cpp/pull/549
* [fix][client-cpp] Fail producers immediately when topic is terminated by @dwang-qm in https://github.com/apache/pulsar-client-cpp/pull/567
* [fix][client-cpp] Restore pulsar/Version.h for the dev package by @dwarburt in https://github.com/apache/pulsar-client-cpp/pull/572
* [cleanup] remove unused openssl header by @hdu-sdlzx in https://github.com/apache/pulsar-client-cpp/pull/574
* [fix][cpp] Clear stale consumer connection after reconnect subscribe failure by @shibd in https://github.com/apache/pulsar-client-cpp/pull/577
* [improve][client] Implement tls_client_auth for AuthOauth2  by @izumo27 in https://github.com/apache/pulsar-client-cpp/pull/575
* [fix][client-cpp] Fix TypedMessageTest to use receiveAsync template overload with decoder by @geniusjoe in https://github.com/apache/pulsar-client-cpp/pull/580
* feat: introduce a v2 createProducer API to carry error message when fail by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/579
* feat: add v2 APIs to create Consumer, Reader or TableView by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/581
* Fix macOS cross-architecture build on arm64 when target arch is x86_64 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/582
* chore: remove unnecessary WARN logs for send or receive timeouts by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/584
* feat: expose replicated_from proto field to Message by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/583
* Fix release workflows by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/586

## New Contributors
* @daeho-ro made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/562
* @Bhargavkonidena made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/563
* @dwang-qm made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/567
* @dwarburt made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/572
* @geniusjoe made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/580

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v4.1.0...v4.2.0
