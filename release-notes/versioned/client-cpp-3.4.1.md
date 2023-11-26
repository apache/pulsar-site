---
id: client-cpp-3.4.1
title: Client CPP 3.4.1
sidebar_label: Client CPP 3.4.1
---

## What's Changed
* Fix Protobuf symbols not found in libpulsarwithdeps.a when building on macOS by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/354
* Fix the flush callback might be called repeatedly by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/353
* Log topic lookup result by @erobot in https://github.com/apache/pulsar-client-cpp/pull/351
* Fix bad_weak_ptr when close a ClientConnection during construction by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/350
* Fix crash when removing connection from the pool by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/347
* Fix lazy partitioned producer might send duplicated messages by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/342
* Use absolute path to find credential files in unit tests by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/340
* Fix close() returns ResultAlreadyClosed after unsubscribe or close by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/338

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.4.0...v3.4.1
