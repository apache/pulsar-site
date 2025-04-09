---
id: client-java-3.3.6
title: Client Java 3.3.6
sidebar_label: Client Java 3.3.6
---

- [fix][client] Copy eventTime to retry letter topic and DLQ messages ([#24059](https://github.com/apache/pulsar/pull/24059))
- [fix][client] Fix building broken batched message when publishing ([#24061](https://github.com/apache/pulsar/pull/24061))
- [fix][client] Fix consumer leak when thread is interrupted before subscribe completes ([#24100](https://github.com/apache/pulsar/pull/24100))
- [fix][client] Pattern subscription regression when broker-side evaluation is disabled ([#24104](https://github.com/apache/pulsar/pull/24104))
- [improve][client] Prevent NullPointException when closing ClientCredentialsFlow ([#24123](https://github.com/apache/pulsar/pull/24123))
- [clean][client] Clean code for the construction of retry/dead letter topic name ([#24082](https://github.com/apache/pulsar/pull/24082))
- [improve] Upgrade Netty to 4.1.119.Final ([#24049](https://github.com/apache/pulsar/pull/24049))