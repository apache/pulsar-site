---
id: client-java-3.0.7
title: Client Java 3.0.7
sidebar_label: Client Java 3.0.7
---

- [fix][sec] Upgrade Avro to 1.11.4 to address CVE-2024-47561 ([#23394](https://github.com/apache/pulsar/pull/23394))
- [fix][sec][branch-3.0] Upgrade protobuf-java to 3.25.5 ([#23356](https://github.com/apache/pulsar/pull/23356)) ([#23357](https://github.com/apache/pulsar/pull/23357))
- [improve][misc] Upgrade Netty to 4.1.113 and netty-tcnative to 2.0.66 ([#23255](https://github.com/apache/pulsar/pull/23255))
- [improve][misc] Improve AES-GCM cipher performance ([#23122](https://github.com/apache/pulsar/pull/23122))
- [improve][misc] Optimize TLS performance by omitting extra buffer copies ([#23115](https://github.com/apache/pulsar/pull/23115))
- [fix][misc] Log Conscrypt security provider initialization warnings at debug level ([#23364](https://github.com/apache/pulsar/pull/23364))
- [fix] DLQ to handle bytes key properly ([#23172](https://github.com/apache/pulsar/pull/23172))
- [fix][client] Copy orderingKey to retry letter topic and DLQ messages and fix bug in copying ([#23182](https://github.com/apache/pulsar/pull/23182))
- [fix][client] Create the retry producer async ([#23157](https://github.com/apache/pulsar/pull/23157))
- [fix][client] Fix for early hit `beforeConsume` for MultiTopicConsumer ([#23141](https://github.com/apache/pulsar/pull/23141))
- [fix][client] Fix timeout handling in Pulsar Admin client ([#23128](https://github.com/apache/pulsar/pull/23128))
- [fix][client] TransactionCoordinatorClient support retry ([#23081](https://github.com/apache/pulsar/pull/23081))
- [fix][client] fix negative message re-delivery twice issue ([#20750](https://github.com/apache/pulsar/pull/20750))
- [fix][client] the nullValue in msgMetadata should be true by default ([#22372](https://github.com/apache/pulsar/pull/22372))
- [improve][client] Add maxConnectionsPerHost and connectionMaxIdleSeconds to PulsarAdminBuilder ([#22541](https://github.com/apache/pulsar/pull/22541))
- [improve][client] Don't print info logs for each schema loaded by client ([#23206](https://github.com/apache/pulsar/pull/23206))
- [improve][client] Swallow Conscrypt ClassNotFoundException ([#20371](https://github.com/apache/pulsar/pull/20371))
- [improve][client]Add new ServiceUrlProvider implementation: SameAuthParamsAutoClusterFailover ([#23129](https://github.com/apache/pulsar/pull/23129))
- [improve][client]PIP-359:Support custom message listener executor for specific subscription ([#22861](https://github.com/apache/pulsar/pull/22861))