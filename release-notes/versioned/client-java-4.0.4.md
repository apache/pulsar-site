---
id: client-java-4.0.4
title: Client Java 4.0.4
sidebar_label: Client Java 4.0.4
---

- [fix][client] Copy eventTime to retry letter topic and DLQ messages ([#24059](https://github.com/apache/pulsar/pull/24059))
- [fix][client] Fix building broken batched message when publishing ([#24061](https://github.com/apache/pulsar/pull/24061))
- [fix][client] Fix consumer leak when thread is interrupted before subscribe completes ([#24100](https://github.com/apache/pulsar/pull/24100))
- [fix][client] Pattern subscription regression when broker-side evaluation is disabled ([#24104](https://github.com/apache/pulsar/pull/24104))
- [fix][client] PIP-409 retry/dead letter topic producer config don't take effect. ([#24071](https://github.com/apache/pulsar/pull/24071))
- [improve][client] PIP-409: support producer configuration for retry/dead letter topic producer ([#24020](https://github.com/apache/pulsar/pull/24020))
- [improve][client] Prevent NullPointException when closing ClientCredentialsFlow ([#24123](https://github.com/apache/pulsar/pull/24123))
- [clean][client] Clean code for the construction of retry/dead letter topic name ([#24082](https://github.com/apache/pulsar/pull/24082))
- [improve] Upgrade Netty to 4.1.119.Final ([#24049](https://github.com/apache/pulsar/pull/24049))