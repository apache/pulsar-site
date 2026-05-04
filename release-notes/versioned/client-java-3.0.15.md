---
id: client-java-3.0.15
title: Client Java 3.0.15
sidebar_label: Client Java 3.0.15
---

- [improve][misc] Upgrade Netty to 4.1.128.Final ([#24911](https://github.com/apache/pulsar/pull/24911))
- [fix][client] Fix deduplication for getPartitionedTopicMetadata to include method parameters ([#24965](https://github.com/apache/pulsar/pull/24965))
- [fix][client] Fix getPendingQueueSize for PartitionedTopicProducerStatsRecorderImpl: avoid NPE and implement aggregation ([#24830](https://github.com/apache/pulsar/pull/24830))
- [fix][client] Fix thread leak in reloadLookUp method which is used by ServiceUrlProvider ([#24794](https://github.com/apache/pulsar/pull/24794))
- [fix][client] Make auto partitions update work for old brokers without PIP-344 ([#24822](https://github.com/apache/pulsar/pull/24822))
- [improve][client]Add null check for Pulsar client clock configuration ([#24848](https://github.com/apache/pulsar/pull/24848))
- [fix] Fix mixed lookup/partition metadata requests causing reliability issues and incorrect responses ([#24832](https://github.com/apache/pulsar/pull/24832))