---
id: client-java-3.2.4
title: Client Java 3.2.4
sidebar_label: Client Java 3.2.4
---

- [fix][client] Fix negative acknowledgement by messageId ([#23060](https://github.com/apache/pulsar/pull/23060))
- [fix][client] Fix orphan consumer when reconnection and closing are concurrency executing ([#22958](https://github.com/apache/pulsar/pull/22958))
- [fix][client] Fix pattern consumer create crash if a part of partitions of a topic have been deleted ([#22854](https://github.com/apache/pulsar/pull/22854))
- [fix][client] Fix resource leak in Pulsar Client since HttpLookupService doesn't get closed ([#22858](https://github.com/apache/pulsar/pull/22858))
- [improve][client] improve the class GetTopicsResult ([#22766](https://github.com/apache/pulsar/pull/22766))
