---
id: client-java-4.0.14
title: Client Java 4.0.14
sidebar_label: Client Java 4.0.14
---

- [fix][client] Apply no-memory-limit producer queue defaults at producer creation ([#26342](https://github.com/apache/pulsar/pull/26342))
- [fix][client] Avoid exception in ConsumerImpl hasMessageAvailable before first receive ([#25857](https://github.com/apache/pulsar/pull/25857))
- [fix][client] Complete table view refresh after applying messages ([#26566](https://github.com/apache/pulsar/pull/26566))
- [fix][client] Defer op cmd release to the write event loop on send timeout ([#26456](https://github.com/apache/pulsar/pull/26456))
- [fix][client] Divide the across-partitions budget only when it was set explicitly ([#26384](https://github.com/apache/pulsar/pull/26384))
- [fix][client] Drop a send receipt for a removed producer, not the connection ([#26618](https://github.com/apache/pulsar/pull/26618))
- [fix][client] Enable TableView compacted reads for short topic names ([#26626](https://github.com/apache/pulsar/pull/26626))
- [fix][client] Fix buffer ownership on the send failure paths ([#26455](https://github.com/apache/pulsar/pull/26455))
- [fix][client] Flush acknowledgment groups at the combined size limit ([#26594](https://github.com/apache/pulsar/pull/26594))
- [fix][client] Keep transactional and non-transactional messages in separate batches ([#26547](https://github.com/apache/pulsar/pull/26547))
- [fix][client] Prevent duplicate cleanup and leaks on producer send failures ([#26641](https://github.com/apache/pulsar/pull/26641))
- [fix][client] Release connections opened after close ([#26733](https://github.com/apache/pulsar/pull/26733))
- [fix][client] Release the command header when send serialization fails ([#26492](https://github.com/apache/pulsar/pull/26492))
- [fix][client] Release the reserved memory only once when failing a send in a terminal state ([#26476](https://github.com/apache/pulsar/pull/26476))
- [fix][client] Restore OAuth2 HTTP client after deserialization ([#26325](https://github.com/apache/pulsar/pull/26325))
- [fix][client] Stop tracking ack timeouts on non-persistent topics ([#26548](https://github.com/apache/pulsar/pull/26548))
- [improve][client] Avoid eager broker metadata allocation for outgoing messages ([#26521](https://github.com/apache/pulsar/pull/26521))
- [improve][client] Avoid unused send-stat snapshots for default callbacks ([#26519](https://github.com/apache/pulsar/pull/26519))
- [improve][client] Coalesce message listener drain scheduling ([#26531](https://github.com/apache/pulsar/pull/26531))
- [fix][client] Remove the dead letter candidate entry using the entry-level message id