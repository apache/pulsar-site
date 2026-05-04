---
id: client-java-3.0.16
title: Client Java 3.0.16
sidebar_label: Client Java 3.0.16
---

- [fix][client] Fix AutoProduceBytesSchema.clone() method ([#25015](https://github.com/apache/pulsar/pull/25015))
- [fix][client] Fix double recycling of the message in isValidConsumerEpoch method ([#25008](https://github.com/apache/pulsar/pull/25008))
- [fix][client] Fix invalid parameter type passed to Map.get in TopicsImpl.getListAsync method ([#25069](https://github.com/apache/pulsar/pull/25069))
- [fix][client] Fix producer synchronous retry handling in failPendingMessages method ([#25207](https://github.com/apache/pulsar/pull/25207))
- [fix][client] Fix race condition between isDuplicate() and flushAsync() method in PersistentAcknowledgmentsGroupingTracker due to incorrect use Netty Recycler ([#25208](https://github.com/apache/pulsar/pull/25208))
- [fix][client] Fix thread-safety of AutoProduceBytesSchema ([#25014](https://github.com/apache/pulsar/pull/25014))
- [fix][client] PIP-84: Skip processing a message in the message listener if the consumer epoch is no longer valid ([#25007](https://github.com/apache/pulsar/pull/25007))
- [fix][client] Skip processing messages in the listener when the consumer has been closed ([#25006](https://github.com/apache/pulsar/pull/25006))
- [fix][client]Producer stuck or geo-replication stuck due to wrong value of message.numMessagesInBatch ([#25106](https://github.com/apache/pulsar/pull/25106))
- [improve][client] Test no exception could be thrown for invalid epoch in message ([#25013](https://github.com/apache/pulsar/pull/25013))
- [fix] Handle TLS close_notify to avoid SslClosedEngineException: SSLEngine closed already ([#24986](https://github.com/apache/pulsar/pull/24986))
