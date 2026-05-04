---
id: client-java-3.0.12
title: Client Java 3.0.12
sidebar_label: Client Java 3.0.12
---

- [improve] Upgrade Netty to 4.1.121.Final ([#24214](https://github.com/apache/pulsar/pull/24214))
- [fix][client] Fix incorrect producer.getPendingQueueSize due to incomplete queue implementation ([#24184](https://github.com/apache/pulsar/pull/24184))
- [fix][client] Fix producer publishing getting stuck after message with incompatible schema is discarded ([#24282](https://github.com/apache/pulsar/pull/24282))
- [improve][client] validate ClientConfigurationData earlier to avoid resource leaks ([#24187](https://github.com/apache/pulsar/pull/24187))
- [improve][client]Improve transaction log when a TXN command timeout ([#24230](https://github.com/apache/pulsar/pull/24230))