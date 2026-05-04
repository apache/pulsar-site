---
id: client-java-4.1.3
title: Client Java 4.1.3
sidebar_label: Client Java 4.1.3
---

- [fix][client] ControlledClusterFailover avoid unnecessary reconnection. ([#25178](https://github.com/apache/pulsar/pull/25178))
- [fix][client] Fix AutoProduceBytesSchema.clone() method ([#25015](https://github.com/apache/pulsar/pull/25015))
- [fix][client] Fix double recycling of the message in isValidConsumerEpoch method ([#25008](https://github.com/apache/pulsar/pull/25008))
- [fix][client] Fix invalid parameter type passed to Map.get in TopicsImpl.getListAsync method ([#25069](https://github.com/apache/pulsar/pull/25069))
- [fix][client] Fix producer synchronous retry handling in failPendingMessages method ([#25207](https://github.com/apache/pulsar/pull/25207))
- [fix][client] Fix race condition between isDuplicate() and flushAsync() method in PersistentAcknowledgmentsGroupingTracker due to incorrect use Netty Recycler ([#25208](https://github.com/apache/pulsar/pull/25208))
- [fix][client] Fix thread-safety of AutoProduceBytesSchema ([#25014](https://github.com/apache/pulsar/pull/25014))
- [fix][client] PIP-84: Skip processing a message in the message listener if the consumer epoch is no longer valid ([#25007](https://github.com/apache/pulsar/pull/25007))
- [fix][client] Send all chunkMessageIds to broker for redelivery ([#25229](https://github.com/apache/pulsar/pull/25229))
- [fix][client] Skip processing messages in the listener when the consumer has been closed ([#25006](https://github.com/apache/pulsar/pull/25006))
- [fix][client]Producer stuck or geo-replication stuck due to wrong value of message.numMessagesInBatch ([#25106](https://github.com/apache/pulsar/pull/25106))
- [improve][client] Add null checks for MessageAcknowledger methods to prevent NullPointerException ([#25036](https://github.com/apache/pulsar/pull/25036))
- [improve][client] Make authorization server metadata path configurable in AuthenticationOAuth2 ([#25052](https://github.com/apache/pulsar/pull/25052))
- [improve][client] Test no exception could be thrown for invalid epoch in message ([#25013](https://github.com/apache/pulsar/pull/25013))
- [improve][client]Reduce unnecessary getPartitionedTopicMetadata requests when using retry and DLQ topics. ([#25172](https://github.com/apache/pulsar/pull/25172))
- [feat][client] oauth2 trustcerts file and timeouts ([#24944](https://github.com/apache/pulsar/pull/24944))
- [improve] Upgrade Netty to 4.1.131.Final ([#25232](https://github.com/apache/pulsar/pull/25232))
- [fix][sec] Eliminate commons-collections dependency ([#25024](https://github.com/apache/pulsar/pull/25024))
- [improve] Upgrade Apache Commons library versions ([#24983](https://github.com/apache/pulsar/pull/24983))
- [fix] Handle TLS close_notify to avoid SslClosedEngineException: SSLEngine closed already ([#24986](https://github.com/apache/pulsar/pull/24986))