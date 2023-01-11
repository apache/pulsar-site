---
id: client-cpp-2.11.0
title: Client CPP 2.11.0
sidebar_label: Client CPP 2.11.0
---

- [feature][C++] Add basic authentication [#15822](https://github.com/apache/pulsar/pull/15822)
- [feature][C++] Support multiple brokers in service URL [#17162](https://github.com/apache/pulsar/pull/17162)
- [improve][C++] Use an atomic state_ instead of the lock to improve performance [#16940](https://github.com/apache/pulsar/pull/16940)
- [improve][C++] Add producerId to the log of closed producer [#17079](https://github.com/apache/pulsar/pull/17079)
- [improve][C++] Add getLastMessageIdAsync in Consumer [#16182](https://github.com/apache/pulsar/pull/16182)
- [improve][C++] Rename function name: pulsar_producer_configuration_set_crypto_failure_action [#16031](https://github.com/apache/pulsar/pull/16031)
- [improve][C++] Unblock all threads when Pulsar client is closed [#15726](https://github.com/apache/pulsar/pull/15726)
- [improve][C++] Avoid race condition causing double callback on close [#15508](https://github.com/apache/pulsar/pull/15508)
- [improve][C++] Add subscription properties to consumer for cpp [#15020](https://github.com/apache/pulsar/pull/15020)
- [improve][C++] Use an atomic state_ instead of the lock to improve performance [#16940](https://github.com/apache/pulsar/pull/16940)
- [improve][C++] Reset havePendingPingRequest flag for any data received from broker [#17658](https://github.com/apache/pulsar/pull/17658)
- [cleanup][C++] Remove the flaky and meaningless tests [#15271](https://github.com/apache/pulsar/pull/15271)
- [fix][C++] Fix potential segfault when resending messages [#17395](https://github.com/apache/pulsar/pull/17395)
- [fix][C++] Support retry and apply operation timeout for lookup requests [#17410](https://github.com/apache/pulsar/pull/17410)
- [fix][C++] Fix multi-topics consumer close segmentation fault [#17239](https://github.com/apache/pulsar/pull/17239)
- [fix][C++] Wait until event loop terminates when closing the Client [#15316](https://github.com/apache/pulsar/pull/15316)
- [fix][C++] Fix rpm and deb packaging [#17064](https://github.com/apache/pulsar/pull/17064)
- [fix][C++] Fix getLastMessageIdAsync returns ResultNotConnected after seek [#16943](https://github.com/apache/pulsar/pull/16943)
- [fix][C++] Generate correct well-known OpenID configuration URL [#15928](https://github.com/apache/pulsar/pull/15928)
- [fix][C++] Fix single message metadata not set correctly [#15072](https://github.com/apache/pulsar/pull/15072)
- [fix][C++] Fix UnknownError might be returned for a partitioned producer [#15161](https://github.com/apache/pulsar/pull/15161)
- [fix][C++] Fix connection is not closed when broker closes the connection to proxy[#14070](https://github.com/apache/pulsar/pull/14070)
- [fix][C++] Fix send callback might not be invoked in key based batching [#14898](https://github.com/apache/pulsar/pull/14898)
- [fix][C++] Fix C++ client compile error because of keyword optional is redundant in PaddingDemo.proto [#14862](https://github.com/apache/pulsar/pull/14862)
- [fix][C++] Fix segmentation fault when creating socket failed [#14834](https://github.com/apache/pulsar/pull/14834)
- [fix][C++] Fix the race condition of connect timeout task [#14823](https://github.com/apache/pulsar/pull/14823)
- [fix][C++] Fix producer is never destructed until client is closed [#14797](https://github.com/apache/pulsar/pull/14797)
- [fix][C++] Close messages_ when PartitionedConsumer is closed [#16887](https://github.com/apache/pulsar/pull/16887)