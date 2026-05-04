---
id: client-cpp-4.1.0
title: Client CPP 4.1.0
sidebar_label: Client CPP 4.1.0
---

## What's Changed
* [improve][client] Add TLSv1.3 support by @ciuncan in https://github.com/apache/pulsar-client-cpp/pull/529
* Fix the seek method could be blocked forever when subscribe RPC is slower than seek RPC by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/533
* Fix use of deprecated Boost Asio API by @arhoads in https://github.com/apache/pulsar-client-cpp/pull/535
* Fix multi-topics consumer will crash if one internal consumer fails getBrokerConsumerStatsAsync by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/538
* [improve][client] Enhance connection and timeout logging by @zhanglistar in https://github.com/apache/pulsar-client-cpp/pull/539
* Bump dependencies to latest versions for CVEs by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/540
* [feat][client-cpp] Add operation timeout configuration in milliseconds by @zhanglistar in https://github.com/apache/pulsar-client-cpp/pull/543
* Fix clang tidy errors not detected as well as the errors by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/544
* [Test][C++] Fix flaky ReaderTest.testAsyncRead by @zhanglistar in https://github.com/apache/pulsar-client-cpp/pull/545
* Fix incorrect last sequence id when sending messages in batch by @zhanglistar in https://github.com/apache/pulsar-client-cpp/pull/546
* Fix crash due to asio object lifetime and thread safety issue by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/551
* PIP-121: Introduce ServiceInfoProvider to update service info dynamically by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/541
* [Test] Fix log after client close by @zhanglistar in https://github.com/apache/pulsar-client-cpp/pull/548
* PIP-121: Implement AutoClusterFailover by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/547
* [fix][client-cpp] Fix Reader segfault when messageListenerThreads=0 by @zhanglistar in https://github.com/apache/pulsar-client-cpp/pull/553
* [fix][client-cpp] Implement missing pulsar_message_set_schema_version in C API by @zhanglistar in https://github.com/apache/pulsar-client-cpp/pull/552
* Fix connection leak by request timers not cancelled in time by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/555
* Fix hasMessageAvailable will return true after seeking to a timestamp newer than the last message by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/556
* Fix aarch64 build on Alpine by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/558

## New Contributors
* @ciuncan made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/529
* @zhanglistar made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/539

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v4.0.0...v4.1.0
