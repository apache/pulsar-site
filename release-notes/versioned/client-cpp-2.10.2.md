---
id: client-cpp-2.10.2
title: Client CPP 2.10.2 
sidebar_label: Client CPP 2.10.2 
---

- [fix][c++] Rename function name: pulsar_producer_configuration_set_crypto_failure_action [#16031](https://github.com/apache/pulsar/pull/16031)
- [fix][c++] Fix the close of Client might stuck or return a wrong result [#16285](https://github.com/apache/pulsar/pull/16285)
- [fix][c++] Fix libcurl build failure when building deb package [#17614](https://github.com/apache/pulsar/pull/17614)
- [fix][c++] Fix multi-topics consumer close segmentation fault [#17239](https://github.com/apache/pulsar/pull/17239)
- [fix][c++] Fix potential segfault when resending messages [#17395](https://github.com/apache/pulsar/pull/17395)
- [improve][c++] Reset `havePendingPingRequest` flag for any data received from broker [#17658](https://github.com/apache/pulsar/pull/17658)
- [improve][c++] Use an atomic `state_` instead of the lock to improve performance [#16940](https://github.com/apache/pulsar/pull/16940)
- [improve][c++] Upgrade OpenSSL to version 1.1.1n [#17538](https://github.com/apache/pulsar/pull/17538)
- [improve][c++] Delete PartitionedConsumerImpl, use MultiTopicsConsumerImpl instead [#16969](https://github.com/apache/pulsar/pull/16969)
- [cleanup][c++] Clean up C++ client curl configuration [#16064](https://github.com/apache/pulsar/pull/16064)
