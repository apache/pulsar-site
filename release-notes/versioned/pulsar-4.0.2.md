---
id: pulsar-4.0.2
title: Apache Pulsar 4.0.2
sidebar_label: Apache Pulsar 4.0.2
---

#### 2025-01-20

### Library updates

- [fix][sec] Bump commons-io version to 2.18.0 ([#23684](https://github.com/apache/pulsar/pull/23684))
- [fix][sec] Mitigate CVE-2024-53990 by disabling AsyncHttpClient CookieStore ([#23725](https://github.com/apache/pulsar/pull/23725))
- [fix][sec] Upgrade async-http-client to 2.12.4 to address CVE-2024-53990 ([#23732](https://github.com/apache/pulsar/pull/23732))
- [fix][sec] Upgrade golang.org/x/crypto from 0.21.0 to 0.31.0 in pulsar-function-go ([#23743](https://github.com/apache/pulsar/pull/23743))
- [improve] Upgrade lombok to 1.18.36 ([#23752](https://github.com/apache/pulsar/pull/23752))
- [improve] Upgrade to Netty 4.1.116.Final and io_uring to 0.0.26.Final ([#23813](https://github.com/apache/pulsar/pull/23813))
- [improve][monitor] Upgrade OTel to 1.45.0 ([#23756](https://github.com/apache/pulsar/pull/23756))

### Broker

- [fix][admin] Fix exception loss in getMessageId method ([#23766](https://github.com/apache/pulsar/pull/23766))
- [fix][admin] Fix exception thrown in getMessageId method ([#23784](https://github.com/apache/pulsar/pull/23784))
- [fix][admin] Listen partitioned topic creation event ([#23680](https://github.com/apache/pulsar/pull/23680))
- [fix][admin] Verify is policies read only before revoke permissions on topic ([#23730](https://github.com/apache/pulsar/pull/23730))
- [fix][broker] Add consumer name for subscription stats ([#23671](https://github.com/apache/pulsar/pull/23671))
- [fix][broker] Avoid block markDeletePosition forward when skip lost entries ([#21210](https://github.com/apache/pulsar/pull/21210))
- [fix][broker] Catch exception for entry payload interceptor processor ([#23683](https://github.com/apache/pulsar/pull/23683))
- [fix][broker] Continue using the next provider for authentication if one fails ([#23797](https://github.com/apache/pulsar/pull/23797))
- [fix][broker] Continue using the next provider for http authentication if one fails ([#23842](https://github.com/apache/pulsar/pull/23842))
- [fix][broker] Fix acknowledgeCumulativeAsync block when ackReceipt is enabled ([#23841](https://github.com/apache/pulsar/pull/23841))
- [fix][broker] Fix bug causing loss of migrated information when setting other localPolicies in namespace ([#23764](https://github.com/apache/pulsar/pull/23764))
- [fix][broker] Fix config replicationStartAt does not work when set it to earliest ([#23719](https://github.com/apache/pulsar/pull/23719))
- [fix][broker] Fix deadlock in Key_Shared PIP-379 implementation ([#23854](https://github.com/apache/pulsar/pull/23854))
- [fix][broker] Fix enableReplicatedSubscriptions ([#23781](https://github.com/apache/pulsar/pull/23781))
- [fix][broker] Fix items in dispatcher.recentlyJoinedConsumers are out-of-order, which may cause a delivery stuck ([#23802](https://github.com/apache/pulsar/pull/23802))
- [fix][broker] Fix possible mark delete NPE when batch index ack is enabled ([#23833](https://github.com/apache/pulsar/pull/23833))
- [fix][broker] Fix the retry mechanism in `MetadataCache#readModifyUpdateOrCreate` ([#23686](https://github.com/apache/pulsar/pull/23686))
- [fix][broker] Invoke custom BrokerInterceptor's `onFilter` method if it's defined ([#23676](https://github.com/apache/pulsar/pull/23676))
- [fix][broker] Msg delivery is stuck due to items in the collection recentlyJoinedConsumers are out-of-order ([#23795](https://github.com/apache/pulsar/pull/23795))
- [fix][broker] PIP-399: Fix Metric Name for Delayed Queue ([#23712](https://github.com/apache/pulsar/pull/23712))
- [fix][broker] Remove blocking calls from internalGetPartitionedStats ([#23832](https://github.com/apache/pulsar/pull/23832))
- [fix][broker] Remove failed OpAddEntry from pendingAddEntries ([#23817](https://github.com/apache/pulsar/pull/23817))
- [fix][broker] Revert "[fix][broker] Cancel possible pending replay read in cancelPendingRead ([#23384](https://github.com/apache/pulsar/pull/23384))" ([#23855](https://github.com/apache/pulsar/pull/23855))
- [fix][broker] System topic should not be migrated during blue-green cluster migration ([#23767](https://github.com/apache/pulsar/pull/23767))
- [fix][broker] fix NPE when calculating a topic's backlogQuota ([#23720](https://github.com/apache/pulsar/pull/23720))
- [fix][broker] support missing cluster level fine-granted permissions ([#23675](https://github.com/apache/pulsar/pull/23675))
- [fix][broker] topic policy deadlock block metadata thread. ([#23786](https://github.com/apache/pulsar/pull/23786))
- [fix][ml] Topic load timeout due to ml data ledger future never finishes ([#23772](https://github.com/apache/pulsar/pull/23772))
- [improve][admin] Opt-out of topic-existence check ([#23709](https://github.com/apache/pulsar/pull/23709))
- [improve][broker] Improve SystemTopicBasedTopicPoliciesService reader to reduce GC pressure ([#23780](https://github.com/apache/pulsar/pull/23780))
- [improve][broker] Optimize subscription seek (cursor reset) by timestamp ([#22792](https://github.com/apache/pulsar/pull/22792))
- [improve][broker] Reduce unnecessary REPLICATED_SUBSCRIPTION_SNAPSHOT_REQUEST ([#23839](https://github.com/apache/pulsar/pull/23839))
- [improve][log] Print ZK path if write to ZK fails due to data being too large to persist ([#23652](https://github.com/apache/pulsar/pull/23652))
- [improve][ml] Optimize BlobStoreManagedLedgerOffloader.getOffloadPolicies ([#23776](https://github.com/apache/pulsar/pull/23776))
- [improve][txn] Improve Reader in TransactionBuffer to reduce GC pressure ([#23779](https://github.com/apache/pulsar/pull/23779))

### Client

- [Fix][Client] Fix pending message not complete when closeAsync ([#23761](https://github.com/apache/pulsar/pull/23761))
- [fix][client] Cannot access message data inside ProducerInterceptor#onSendAcknowledgement ([#23791](https://github.com/apache/pulsar/pull/23791))
- [fix][client] Fix compatibility between kerberos and tls ([#23798](https://github.com/apache/pulsar/pull/23798))
- [fix][client] Fix enableRetry for consumers using legacy topic naming where cluster name is included ([#23753](https://github.com/apache/pulsar/pull/23753))
- [fix][client] Fix memory leak when publishing encountered a corner case error ([#23738](https://github.com/apache/pulsar/pull/23738))
- [fix][client] Fix reader message filtering issue during blue-green cluster switch ([#23693](https://github.com/apache/pulsar/pull/23693))
- [fix][client] Fix wrong start message id when it's a chunked message id ([#23713](https://github.com/apache/pulsar/pull/23713))
- [fix][client] Make DeadLetterPolicy & KeySharedPolicy serializable ([#23718](https://github.com/apache/pulsar/pull/23718))
- [fix][client] Orphan producer when concurrently calling producer closing and reconnection ([#23853](https://github.com/apache/pulsar/pull/23853))
- [fix][client] Prevent retry topic and dead letter topic producer leaks when sending of message fails ([#23824](https://github.com/apache/pulsar/pull/23824))
- [fix][doc] Refine ClientBuilder#memoryLimit and ConsumerBuilder#autoScaledReceiverQueueSizeEnabled javadoc ([#23687](https://github.com/apache/pulsar/pull/23687))
- [improve][client] Make replicateSubscriptionState nullable ([#23757](https://github.com/apache/pulsar/pull/23757))
- [improve][client] PIP-393: Improve performance of Negative Acknowledgement ([#23600](https://github.com/apache/pulsar/pull/23600))
- [improve][client] PIP-393: Support configuring NegativeAckPrecisionBitCnt while building consumer. ([#23804](https://github.com/apache/pulsar/pull/23804))
- [improve][client] Print consumer stats log if prefetched messages are not zero ([#23698](https://github.com/apache/pulsar/pull/23698))

### Pulsar IO and Pulsar Functions

- [improve][fn] Improve closing of producers in Pulsar Functions ProducerCache invalidation ([#23734](https://github.com/apache/pulsar/pull/23734))
- [improve][fn] Improve implementation for maxPendingAsyncRequests async concurrency limit when return type is CompletableFuture&lt;Void&gt; ([#23708](https://github.com/apache/pulsar/pull/23708))
- [improve][io] Bump io.lettuce:lettuce-core from 5.0.2.RELEASE to 6.5.1.RELEASE in /pulsar-io/redis ([#23685](https://github.com/apache/pulsar/pull/23685))

### Others

- [fix][common] TopicName: Throw IllegalArgumentException if localName is whitespace only ([#23691](https://github.com/apache/pulsar/pull/23691))
- [fix] Fix issues with Pulsar Alpine docker image stability: remove glibc-compat  ([#23762](https://github.com/apache/pulsar/pull/23762))
- [fix][cli] Fix set topic retention policy failed ([#23688](https://github.com/apache/pulsar/pull/23688))
- [fix][cli] Fix set-retention with >2GB size value for topic policy ([#23689](https://github.com/apache/pulsar/pull/23689))
- [fix][misc] Honor dynamic log levels in log4j2.yaml ([#23847](https://github.com/apache/pulsar/pull/23847))
- [improve] Support overriding java.net.preferIPv4Stack with OPTS ([#23846](https://github.com/apache/pulsar/pull/23846))
- [improve] Install coreutils in docker image to improve compatibility ([#23667](https://github.com/apache/pulsar/pull/23667))

### Tests & CI

- [fix][test] Add reconsumeLater call in RetryTopicTest#testRetryTopicWithMultiTopic. ([#23857](https://github.com/apache/pulsar/pull/23857))
- [fix][test] Fix flaky KeySharedSubscriptionTest.testNoKeySendAndReceiveWithHashRangeAutoSplitStickyKeyConsumerSelector ([#23747](https://github.com/apache/pulsar/pull/23747))
- [fix][test] Remove useless test code ([#23823](https://github.com/apache/pulsar/pull/23823))
- [fix][test] Flaky-test: GetPartitionMetadataMultiBrokerTest.testCompatibilityDifferentBrokersForNonPersistentTopic ([#23666](https://github.com/apache/pulsar/pull/23666))
- [fix][test] Fix flaky test testTopicUnloadAfterSessionRebuild ([#23852](https://github.com/apache/pulsar/pull/23852))
- [improve][ci] Move ZkSessionExpireTest to flaky group to unblock CI ([#23810](https://github.com/apache/pulsar/pull/23810))
- [improve][ci] Publish build scans to develocity.apache.org ([#23851](https://github.com/apache/pulsar/pull/23851))
- [improve][test] Add more test for the case that client receives a SendError, which relates to the PR [#23038](https://github.com/apache/pulsar/pull/23038) ([#23721](https://github.com/apache/pulsar/pull/23721))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.1...v4.0.2).
