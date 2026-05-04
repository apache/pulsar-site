---
id: pulsar-3.3.4
title: Apache Pulsar 3.3.4
sidebar_label: Apache Pulsar 3.3.4
---

#### 2025-01-20

### Library updates

- [improve] Upgrade lombok to 1.18.36 ([#23752](https://github.com/apache/pulsar/pull/23752))
- [improve] Upgrade to Netty 4.1.116.Final and io_uring to 0.0.26.Final ([#23813](https://github.com/apache/pulsar/pull/23813))
- [improve][monitor] Upgrade OTel to 1.45.0 ([#23756](https://github.com/apache/pulsar/pull/23756))
- [fix][sec] Bump commons-io version to 2.18.0 ([#23684](https://github.com/apache/pulsar/pull/23684))
- [fix][sec] Mitigate CVE-2024-53990 by disabling AsyncHttpClient CookieStore ([#23725](https://github.com/apache/pulsar/pull/23725))
- [fix][sec] Upgrade async-http-client to 2.12.4 to address CVE-2024-53990 ([#23732](https://github.com/apache/pulsar/pull/23732))
- [fix][sec] Upgrade golang.org/x/crypto from 0.21.0 to 0.31.0 in pulsar-function-go ([#23743](https://github.com/apache/pulsar/pull/23743))

### Broker

- [feat][broker] Implement allowBrokerOperationAsync in PulsarAuthorizationProvider to avoid exception thrown ([#23663](https://github.com/apache/pulsar/pull/23663))
- [fix][admin] Fix exception loss in getMessageId method ([#23766](https://github.com/apache/pulsar/pull/23766))
- [fix][admin] Fix exception thrown in getMessageId method ([#23784](https://github.com/apache/pulsar/pull/23784))
- [fix][broker] Add consumer name for subscription stats ([#23671](https://github.com/apache/pulsar/pull/23671))
- [fix][broker] Catch exception for entry payload interceptor processor ([#23683](https://github.com/apache/pulsar/pull/23683))
- [fix][broker] Continue using the next provider for authentication if one fails ([#23797](https://github.com/apache/pulsar/pull/23797))
- [fix][broker] Fix bug causing loss of migrated information when setting other localPolicies in namespace ([#23764](https://github.com/apache/pulsar/pull/23764))
- [fix][broker] Fix config replicationStartAt does not work when set it to earliest ([#23719](https://github.com/apache/pulsar/pull/23719))
- [fix][broker] Fix enableReplicatedSubscriptions ([#23781](https://github.com/apache/pulsar/pull/23781))
- [fix][broker] Fix items in dispatcher.recentlyJoinedConsumers are out-of-order, which may cause a delivery stuck ([#23802](https://github.com/apache/pulsar/pull/23802))
- [fix][broker] Invoke custom BrokerInterceptor's `onFilter` method if it's defined ([#23676](https://github.com/apache/pulsar/pull/23676))
- [fix][broker] Remove failed OpAddEntry from pendingAddEntries ([#23817](https://github.com/apache/pulsar/pull/23817))
- [fix][broker] Skip to persist cursor info if it failed by cursor closed ([#23615](https://github.com/apache/pulsar/pull/23615))
- [fix][broker] System topic should not be migrated during blue-green cluster migration ([#23767](https://github.com/apache/pulsar/pull/23767))
- [fix][broker] fix NPE when calculating a topic's backlogQuota ([#23720](https://github.com/apache/pulsar/pull/23720))
- [fix][broker] support missing cluster level fine-granted permissions ([#23675](https://github.com/apache/pulsar/pull/23675))
- [fix][broker] support missing tenant level fine-granted permissions ([#23660](https://github.com/apache/pulsar/pull/23660))
- [fix][broker] support missing broker level fine-granted permissions ([#23637](https://github.com/apache/pulsar/pull/23637))
- [fix][broker] Msg delivery is stuck due to items in the collection recentlyJoinedConsumers are out-of-order ([#23795](https://github.com/apache/pulsar/pull/23795))
- [fix][common] TopicName: Throw IllegalArgumentException if localName is whitespace only ([#23691](https://github.com/apache/pulsar/pull/23691))
- [fix][ml] Topic load timeout due to ml data ledger future never finishes ([#23772](https://github.com/apache/pulsar/pull/23772))
- [improve][admin] Opt-out of topic-existence check ([#23709](https://github.com/apache/pulsar/pull/23709))
- [improve][broker][branch-3.3] Optimize PersistentTopic.getLastDispatchablePosition ([#22707](https://github.com/apache/pulsar/pull/22707)) ([#23826](https://github.com/apache/pulsar/pull/23826))

### Client

- [Fix][Client] Fix pending message not complete when closeAsync ([#23761](https://github.com/apache/pulsar/pull/23761))
- [fix][client] Cannot access message data inside ProducerInterceptor#onSendAcknowledgement ([#23791](https://github.com/apache/pulsar/pull/23791))
- [fix][client] Fix enableRetry for consumers using legacy topic naming where cluster name is included ([#23753](https://github.com/apache/pulsar/pull/23753))
- [fix][client] Fix memory leak when publishing encountered a corner case error ([#23738](https://github.com/apache/pulsar/pull/23738))
- [fix][client] Fix reader message filtering issue during blue-green cluster switch ([#23693](https://github.com/apache/pulsar/pull/23693))
- [fix][client] Make DeadLetterPolicy & KeySharedPolicy serializable ([#23718](https://github.com/apache/pulsar/pull/23718))
- [fix][client] Prevent retry topic and dead letter topic producer leaks when sending of message fails ([#23824](https://github.com/apache/pulsar/pull/23824))
- [improve][client] Make replicateSubscriptionState nullable ([#23757](https://github.com/apache/pulsar/pull/23757))

### Pulsar IO and Pulsar Functions

- [improve][fn] Improve closing of producers in Pulsar Functions ProducerCache invalidation ([#23734](https://github.com/apache/pulsar/pull/23734))
- [improve][fn] Improve implementation for maxPendingAsyncRequests async concurrency limit when return type is CompletableFuture&lt;Void&gt; ([#23708](https://github.com/apache/pulsar/pull/23708))

### Others

- [fix][cli] Fix set topic retention policy failed ([#23688](https://github.com/apache/pulsar/pull/23688))
- [fix][cli] Fix set-retention with >2GB size value for topic policy ([#23689](https://github.com/apache/pulsar/pull/23689))
- [fix] Fix issues with Pulsar Alpine docker image stability: remove glibc-compat  ([#23762](https://github.com/apache/pulsar/pull/23762))
- [improve] Install coreutils in docker image to improve compatibility ([#23667](https://github.com/apache/pulsar/pull/23667))

### Tests & CI

- [fix][test] Remove useless test code ([#23823](https://github.com/apache/pulsar/pull/23823))
- [fix][test]: Flaky-test: GetPartitionMetadataMultiBrokerTest.testCompatibilityDifferentBrokersForNonPersistentTopic ([#23666](https://github.com/apache/pulsar/pull/23666))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.3.3...v3.3.4).