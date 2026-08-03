---
id: client-java-4.0.13
title: Client Java 4.0.13
sidebar_label: Client Java 4.0.13
---

- [fix][sec][branch-4.0] Upgrade Jackson version to 2.18.9 ([#26187](https://github.com/apache/pulsar/pull/26187))
- [fix][sec][branch-4.0] Upgrade Netty to 4.1.136.Final ([#26170](https://github.com/apache/pulsar/pull/26170))
- [fix][client] Fix lookup permit double-release, waiting queue starvation and timeout-response races in ClientCnx ([#26143](https://github.com/apache/pulsar/pull/26143))
- [fix][client] Fix lookup request semaphore not release problem ([#25038](https://github.com/apache/pulsar/pull/25038))
- [fix][client] Fix UnAckedMessageRedeliveryTracker to skip cancelled timeouts ([#26043](https://github.com/apache/pulsar/pull/26043))
- [fix][client] Fix unAckedMessageTracker cleanup on multi-topics batch ack ([#26001](https://github.com/apache/pulsar/pull/26001))
- [fix][client] Preserve null values in pulsar-admin schema output ([#26196](https://github.com/apache/pulsar/pull/26196))
- [fix][client] Sync ackSet in client with broker to stop acked messages reaching the DLQ ([#26135](https://github.com/apache/pulsar/pull/26135))
