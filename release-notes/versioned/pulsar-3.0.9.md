---
id: pulsar-3.0.9
title: Apache Pulsar 3.0.9
sidebar_label: Apache Pulsar 3.0.9
---

#### 2025-01-20

### Library updates

- [fix][sec] Bump commons-io version to 2.18.0 ([#23684](https://github.com/apache/pulsar/pull/23684))
- [fix][sec] Mitigate CVE-2024-53990 by disabling AsyncHttpClient CookieStore ([#23725](https://github.com/apache/pulsar/pull/23725))
- [fix][sec] Upgrade async-http-client to 2.12.4 to address CVE-2024-53990 ([#23732](https://github.com/apache/pulsar/pull/23732))
- [fix][sec] Upgrade golang.org/x/crypto from 0.21.0 to 0.31.0 in pulsar-function-go ([#23743](https://github.com/apache/pulsar/pull/23743))
- [improve] Upgrade lombok to 1.18.36 ([#23752](https://github.com/apache/pulsar/pull/23752))
- [improve] Upgrade to Netty 4.1.116.Final and io_uring to 0.0.26.Final ([#23813](https://github.com/apache/pulsar/pull/23813))

### Broker

- [fix][broker] Msg delivery is stuck due to items in the collection recentlyJoinedConsumers are out-of-order ([#23795](https://github.com/apache/pulsar/pull/23795))
- [fix][broker] Add consumer name for subscription stats ([#23671](https://github.com/apache/pulsar/pull/23671))
- [fix][broker] Catch exception for entry payload interceptor processor ([#23683](https://github.com/apache/pulsar/pull/23683))
- [fix][broker] Continue using the next provider for authentication if one fails ([#23797](https://github.com/apache/pulsar/pull/23797))
- [fix][broker] Fix config replicationStartAt does not work when set it to earliest ([#23719](https://github.com/apache/pulsar/pull/23719))
- [fix][broker] Fix enableReplicatedSubscriptions ([#23781](https://github.com/apache/pulsar/pull/23781))
- [fix][broker] Fix items in dispatcher.recentlyJoinedConsumers are out-of-order, which may cause a delivery stuck ([#23802](https://github.com/apache/pulsar/pull/23802))
- [fix][broker] Remove failed OpAddEntry from pendingAddEntries ([#23817](https://github.com/apache/pulsar/pull/23817))
- [fix][broker] Skip to persist cursor info if it failed by cursor closed ([#23615](https://github.com/apache/pulsar/pull/23615))
- [fix][broker] fix NPE when calculating a topic's backlogQuota ([#23720](https://github.com/apache/pulsar/pull/23720))
- [fix][admin] Fix exception loss in getMessageId method ([#23766](https://github.com/apache/pulsar/pull/23766))
- [fix][admin] Fix exception thrown in getMessageId method ([#23784](https://github.com/apache/pulsar/pull/23784))
- [fix][admin] Listen partitioned topic creation event ([#23680](https://github.com/apache/pulsar/pull/23680))
- [improve][admin] Opt-out of topic-existence check ([#23709](https://github.com/apache/pulsar/pull/23709))
- [improve][log] Print ZK path if write to ZK fails due to data being too large to persist ([#23652](https://github.com/apache/pulsar/pull/23652))
- [fix][ml] Topic load timeout due to ml data ledger future never finishes ([#23772](https://github.com/apache/pulsar/pull/23772))

### Client

- [Fix][Client] Fix pending message not complete when closeAsync ([#23761](https://github.com/apache/pulsar/pull/23761))
- [fix][client] Cannot access message data inside ProducerInterceptor#onSendAcknowledgement ([#23791](https://github.com/apache/pulsar/pull/23791))
- [fix][client] Fix enableRetry for consumers using legacy topic naming where cluster name is included ([#23753](https://github.com/apache/pulsar/pull/23753))
- [fix][client] Fix memory leak when publishing encountered a corner case error ([#23738](https://github.com/apache/pulsar/pull/23738))
- [fix][client] Fix wrong start message id when it's a chunked message id ([#23713](https://github.com/apache/pulsar/pull/23713))
- [fix][client] Make DeadLetterPolicy & KeySharedPolicy serializable ([#23718](https://github.com/apache/pulsar/pull/23718))
- [fix][client] Prevent retry topic and dead letter topic producer leaks when sending of message fails ([#23824](https://github.com/apache/pulsar/pull/23824))
- [fix][client][branch-3.0] Fix compatibility between kerberos and tls ([#23801](https://github.com/apache/pulsar/pull/23801))
- [improve][client] Make replicateSubscriptionState nullable ([#23757](https://github.com/apache/pulsar/pull/23757))
- [fix][doc] Refine ClientBuilder#memoryLimit and ConsumerBuilder#autoScaledReceiverQueueSizeEnabled javadoc ([#23687](https://github.com/apache/pulsar/pull/23687))

### Pulsar IO and Pulsar Functions

- [improve][fn] Improve closing of producers in Pulsar Functions ProducerCache invalidation ([#23734](https://github.com/apache/pulsar/pull/23734))
- [improve][fn] Improve implementation for maxPendingAsyncRequests async concurrency limit when return type is CompletableFuture&lt;Void&gt; ([#23708](https://github.com/apache/pulsar/pull/23708))
- [improve][io] Bump io.lettuce:lettuce-core from 5.0.2.RELEASE to 6.5.1.RELEASE in /pulsar-io/redis ([#23685](https://github.com/apache/pulsar/pull/23685))
- [fix][fn][branch-3.0] Fix pulsar-function-go compilation

### Others

- [fix][common] TopicName: Throw IllegalArgumentException if localName is whitespace only ([#23691](https://github.com/apache/pulsar/pull/23691))

### Tests & CI

- [fix][test] Remove useless test code ([#23823](https://github.com/apache/pulsar/pull/23823))
- [fix][test]: Flaky-test: GetPartitionMetadataMultiBrokerTest.testCompatibilityDifferentBrokersForNonPersistentTopic ([#23666](https://github.com/apache/pulsar/pull/23666))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.8...v3.0.9).
