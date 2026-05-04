---
id: client-java-4.1.2
title: Client Java 4.1.2
sidebar_label: Client Java 4.1.2
---

- [improve][misc] Upgrade Netty to 4.1.128.Final ([#24911](https://github.com/apache/pulsar/pull/24911))
- [fix][client] Add description method to ClientBuilder ([#24728](https://github.com/apache/pulsar/pull/24728))
- [fix][client] Fix deduplication for getPartitionedTopicMetadata to include method parameters ([#24965](https://github.com/apache/pulsar/pull/24965))
- [fix][client] Fix getPendingQueueSize for PartitionedTopicProducerStatsRecorderImpl: avoid NPE and implement aggregation ([#24830](https://github.com/apache/pulsar/pull/24830))
- [fix][client] Fix PulsarAdmin description check and add test ([#24734](https://github.com/apache/pulsar/pull/24734))
- [fix][client] Fix thread leak in reloadLookUp method which is used by ServiceUrlProvider ([#24794](https://github.com/apache/pulsar/pull/24794))
- [fix][client] Make auto partitions update work for old brokers without PIP-344 ([#24822](https://github.com/apache/pulsar/pull/24822))
- [improve][client] Allow adding custom description to User-Agent header ([#24729](https://github.com/apache/pulsar/pull/24729))
- [improve][client] Deduplicate getTopicsUnderNamespace in BinaryProtoLookupService ([#24962](https://github.com/apache/pulsar/pull/24962))
- [improve][client] PIP-420: Update the schema ID format ([#24798](https://github.com/apache/pulsar/pull/24798))
- [improve][client]Add null check for Pulsar client clock configuration ([#24848](https://github.com/apache/pulsar/pull/24848))
- [feat][client] Implement PIP-234 for sharing thread pools and DNS resolver/cache across multiple Pulsar Client instances ([#24790](https://github.com/apache/pulsar/pull/24790))
- [feat][client] PIP-234: Support shared resources in PulsarAdmin to reduce thread usage ([#24893](https://github.com/apache/pulsar/pull/24893))
- [improve][client/broker] Add DnsResolverGroup to share DNS cache across multiple PulsarClient instances ([#24784](https://github.com/apache/pulsar/pull/24784))
- [fix] Fix mixed lookup/partition metadata requests causing reliability issues and incorrect responses ([#24832](https://github.com/apache/pulsar/pull/24832))