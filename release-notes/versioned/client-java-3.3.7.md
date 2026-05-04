---
id: client-java-3.3.7
title: Client Java 3.3.7
sidebar_label: Client Java 3.3.7
---

- [improve] Upgrade Netty to 4.1.121.Final ([#24214](https://github.com/apache/pulsar/pull/24214))
- [improve] Upgrade Apache Commons library versions to compatible versions ([#24205](https://github.com/apache/pulsar/pull/24205))
- [improve][build] Upgrade commons-compress version from 1.27.0 to 1.27.1 ([#24270](https://github.com/apache/pulsar/pull/24270))
- [fix][client] Fix incorrect producer.getPendingQueueSize due to incomplete queue implementation ([#24184](https://github.com/apache/pulsar/pull/24184))
- [fix][client] Fix producer publishing getting stuck after message with incompatible schema is discarded ([#24282](https://github.com/apache/pulsar/pull/24282))
- [improve][client] validate ClientConfigurationData earlier to avoid resource leaks ([#24187](https://github.com/apache/pulsar/pull/24187))
- [improve][client]Improve transaction log when a TXN command timeout ([#24230](https://github.com/apache/pulsar/pull/24230))