---
id: client-java-3.0.6
title: Client Java 3.0.6
sidebar_label: Client Java 3.0.6
---

- [fix][client] Fix negative acknowledgement by messageId ([#23060](https://github.com/apache/pulsar/pull/23060))
- [fix][client] Fix orphan consumer when reconnection and closing are concurrency executing ([#22958](https://github.com/apache/pulsar/pull/22958))
- [fix][client] Fix pattern consumer create crash if a part of partitions of a topic have been deleted ([#22854](https://github.com/apache/pulsar/pull/22854))
- [fix][client] Fix resource leak in Pulsar Client since HttpLookupService doesn't get closed ([#22858](https://github.com/apache/pulsar/pull/22858))
- [fix][client] PIP-344 Do not create partitioned metadata when calling pulsarClient.getPartitionsForTopic(topicName) ([#22206](https://github.com/apache/pulsar/pull/22206))
- [fix][client] fix producer/consumer perform lookup for migrated topic ([#21356](https://github.com/apache/pulsar/pull/21356))
- [improve][client] PIP-344 support feature flag supportsGetPartitionedMetadataWithoutAutoCreation ([#22773](https://github.com/apache/pulsar/pull/22773))
- [improve][client] improve the class GetTopicsResult ([#22766](https://github.com/apache/pulsar/pull/22766))