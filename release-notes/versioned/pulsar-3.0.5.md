---
id: pulsar-3.0.5
title: Apache Pulsar 3.0.5
sidebar_label: Apache Pulsar 3.0.5
---

#### 2024-05-17

### Broker

- [fix][broker] Fix force delete subscription not working ([#22423](https://github.com/apache/pulsar/pull/22423))
- [fix][broker] Avoid being stuck when closing the broker with extensible load manager ([#22573](https://github.com/apache/pulsar/pull/22573))
- [fix][broker] Create new ledger after the current ledger is closed ([#22034](https://github.com/apache/pulsar/pull/22034))
- [fix][broker] Disable system topic message deduplication ([#22582](https://github.com/apache/pulsar/pull/22582))
- [fix][broker] Fix BufferOverflowException and EOFException bugs in /metrics gzip compression ([#22576](https://github.com/apache/pulsar/pull/22576))
- [fix][broker] Fix NPE causing dispatching to stop when using Key_Shared mode and allowOutOfOrderDelivery=true ([#22533](https://github.com/apache/pulsar/pull/22533))
- [fix][broker] Fix ProducerBusy issue due to incorrect userCreatedProducerCount on non-persistent topic ([#22685](https://github.com/apache/pulsar/pull/22685))
- [fix][broker] Fix a deadlock in SystemTopicBasedTopicPoliciesService during NamespaceEventsSystemTopicFactory init ([#22528](https://github.com/apache/pulsar/pull/22528))
- [fix][broker] Fix broken topic policy implementation compatibility with old pulsar version ([#22535](https://github.com/apache/pulsar/pull/22535))
- [fix][broker] Fix configurationMetadataSyncEventTopic is marked supporting dynamic setting, but not implemented  ([#22684](https://github.com/apache/pulsar/pull/22684))
- [fix][broker] Fix consumer stops receiving messages when with large backlogs processing ([#22454](https://github.com/apache/pulsar/pull/22454))
- [fix][broker] Fix invalid condition in logging exceptions ([#22412](https://github.com/apache/pulsar/pull/22412))
- [fix][broker] Fix message drop record in producer stat ([#22458](https://github.com/apache/pulsar/pull/22458))
- [fix][broker] Fix metrics pulsar_topic_load_failed_count is 0 when load non-persistent topic fails and fix the flaky test testBrokerStatsTopicLoadFailed ([#22580](https://github.com/apache/pulsar/pull/22580))
- [fix][broker] Fix nothing changed after removing dynamic configs ([#22673](https://github.com/apache/pulsar/pull/22673))
- [fix][broker] Fix typos in Consumer class ([#22532](https://github.com/apache/pulsar/pull/22532))
- [fix][broker] Fix typos lister -> listener ([#21068](https://github.com/apache/pulsar/pull/21068))
- [fix][broker] One topic can be closed multiple times concurrently ([#17524](https://github.com/apache/pulsar/pull/17524))
- [fix][broker] Optimize /metrics, fix unbounded request queue issue and fix race conditions in metricsBufferResponse mode ([#22494](https://github.com/apache/pulsar/pull/22494))
- [fix][broker] Part-1: Replicator can not created successfully due to an orphan replicator in the previous topic owner ([#21946](https://github.com/apache/pulsar/pull/21946))
- [fix][broker] Part-2: Replicator can not created successfully due to an orphan replicator in the previous topic owner ([#21948](https://github.com/apache/pulsar/pull/21948))
- [fix][broker] Prevent long deduplication cursor backlog so that topic loading wouldn't timeout ([#22479](https://github.com/apache/pulsar/pull/22479))
- [fix][broker] Reader stuck after call hasMessageAvailable when enable replicateSubscriptionState ([#22572](https://github.com/apache/pulsar/pull/22572))
- [fix][broker] Skip topic.close during unloading if the topic future fails with ownership check, and fix isBundleOwnedByAnyBroker to use ns.checkOwnershipPresentAsync for ExtensibleLoadBalancer ([#22379](https://github.com/apache/pulsar/pull/22379)) ([#22403](https://github.com/apache/pulsar/pull/22403))
- [fix][broker] Support OIDC providers with JWK without alg field set in keys ([#22421](https://github.com/apache/pulsar/pull/22421))
- [fix][broker] Update TransferShedder underloaded broker check to consider max loaded broker's msgThroughputEMA and update IsExtensibleLoadBalancerImpl check ([#22321](https://github.com/apache/pulsar/pull/22321)) ([#22416](https://github.com/apache/pulsar/pull/22416))
- [fix][broker] Update topic partition failed when config maxNumPartitionsPerPartitionedTopic<0 ([#22397](https://github.com/apache/pulsar/pull/22397))
- [fix][broker] avoid offload system topic ([#22497](https://github.com/apache/pulsar/pull/22497))
- [fix][broker] fix replicated subscriptions for transactional messages ([#22452](https://github.com/apache/pulsar/pull/22452))
- [fix][broker] rename to changeMaxReadPositionCount ([#22656](https://github.com/apache/pulsar/pull/22656))
- [fix][broker] usedLocallySinceLastReport should always be reset ([#22672](https://github.com/apache/pulsar/pull/22672))
- [fix][broker][admin] Fix cannot update properties on NonDurable subscription. ([#22411](https://github.com/apache/pulsar/pull/22411))
- [fix][broker] Fix Reader can be stuck from transaction aborted messages. ([#22610](https://github.com/apache/pulsar/pull/22610))
- [improve][broker] Make the config `metricsBufferResponse` description more effective ([#22490](https://github.com/apache/pulsar/pull/22490))
- [improve][broker] Retry re-validating ResourceLock with backoff after errors ([#22617](https://github.com/apache/pulsar/pull/22617))
- [improve][broker] Add `topic_load_failed` metric ([#19236](https://github.com/apache/pulsar/pull/19236))
- [improve][broker] Add topic name to emitted error messages. ([#22506](https://github.com/apache/pulsar/pull/22506))
- [improve][broker] Avoid repeated Read-and-discard when using Key_Shared mode ([#22245](https://github.com/apache/pulsar/pull/22245))
- [improve][broker] Create partitioned topics automatically when enable topic level replication ([#22537](https://github.com/apache/pulsar/pull/22537))
- [improve][broker] Don't log brokerClientAuthenticationParameters and bookkeeperClientAuthenticationParameters by default ([#22395](https://github.com/apache/pulsar/pull/22395))
- [improve][broker] Improve Gzip compression, allow excluding specific paths or disabling it ([#22370](https://github.com/apache/pulsar/pull/22370))
- [improve][broker] Optimize gzip compression for /metrics endpoint by sharing/caching compressed result ([#22521](https://github.com/apache/pulsar/pull/22521))
- [improve][broker] Propagate cause exception in TopicBusyException when applicable ([#22596](https://github.com/apache/pulsar/pull/22596))
- [improve][broker] Repeat the handleMetadataChanges callback when configurationMetadataStore equals localMetadataStore ([#22519](https://github.com/apache/pulsar/pull/22519))
- [improve][broker] Servlet support response compression ([#21667](https://github.com/apache/pulsar/pull/21667))
- [improve][broker] Support X-Forwarded-For and HA Proxy Protocol for resolving original client IP of http/https requests ([#22524](https://github.com/apache/pulsar/pull/22524))
- [improve][broker] backlog quota exceed limit log replaced with `debug` ([#22488](https://github.com/apache/pulsar/pull/22488))
- [fix][ml] Fix NPE of getValidPositionAfterSkippedEntries when recovering a terminated managed ledger ([#22552](https://github.com/apache/pulsar/pull/22552))
- [fix][ml] Mark delete stuck due to switching cursor ledger fails ([#22662](https://github.com/apache/pulsar/pull/22662))
- [fix][ml] No rollover inactive ledgers when metadata service invalid ([#22284](https://github.com/apache/pulsar/pull/22284))
- [fix][offload] Fix OOM in tiered storage, caused by unbounded offsets cache ([#22679](https://github.com/apache/pulsar/pull/22679))
- [fix][offload] Increase file upload limit from 2048MiB to 4096MiB for GCP/GCS offloading ([#22554](https://github.com/apache/pulsar/pull/22554))
- [fix][storage] ReadonlyManagedLedger initialization does not fill in the properties ([#22630](https://github.com/apache/pulsar/pull/22630))
- [fix][admin] Fix namespace admin api exception response ([#22587](https://github.com/apache/pulsar/pull/22587))
- [fix][txn]Handle exceptions in the transaction pending ack init ([#21274](https://github.com/apache/pulsar/pull/21274))
- [improve][log] Print source client addr when enabled haProxyProtocolEnabled ([#22686](https://github.com/apache/pulsar/pull/22686))
- [improve][meta] Log a warning when ZK batch fails with connectionloss ([#22566](https://github.com/apache/pulsar/pull/22566))
- [improve][offload] Apply autoSkipNonRecoverableData configuration to tiered storage ([#22531](https://github.com/apache/pulsar/pull/22531))
- [improve][offload] Replace usage of shaded class in OffsetsCache ([#22683](https://github.com/apache/pulsar/pull/22683))
- [improve][sec] Align some namespace level policy authorisation check ([#21640](https://github.com/apache/pulsar/pull/21640))

### Client

- [fix][client] Fix Consumer should return configured batch receive max messages ([#22619](https://github.com/apache/pulsar/pull/22619))
- [fix][client] Fix ReaderBuilder doest not give illegalArgument on connection failure retry ([#22639](https://github.com/apache/pulsar/pull/22639))
- [fix][client] Fix client side memory leak when call MessageImpl.create and fix imprecise client-side metrics: pendingMessagesUpDownCounter, pendingBytesUpDownCounter, latencyHistogram ([#22393](https://github.com/apache/pulsar/pull/22393))

### Pulsar IO and Pulsar Functions

- [fix][fn] make sure the classloader for ContextImpl is `functionClassLoader` in different runtimes ([#22501](https://github.com/apache/pulsar/pull/22501))
- [fix][io] CompressionEnabled didn't work on elasticsearch sink ([#22565](https://github.com/apache/pulsar/pull/22565))
- [fix][io] Fix es index creation ([#22654](https://github.com/apache/pulsar/pull/22654)) ([#22701](https://github.com/apache/pulsar/pull/22701))
- [fix][io] Kafka Source connector maybe stuck ([#22511](https://github.com/apache/pulsar/pull/22511))
- [improve][io]: Add validation for JDBC sink not supporting primitive schema ([#22376](https://github.com/apache/pulsar/pull/22376))

### Others

- [improve][ws] Add memory limit configuration for Pulsar client used in Websocket proxy ([#22666](https://github.com/apache/pulsar/pull/22666))
- [fix][build] Fix building docker images without setting UBUNTU_MIRROR
- [fix][build] Fix networkaddress.cache.negative.ttl config ([#22400](https://github.com/apache/pulsar/pull/22400))
- [improve][misc] Specify valid home dir for the default user in the Ubuntu based docker image ([#22446](https://github.com/apache/pulsar/pull/22446))

### Library updates

- [fix][broker] upgrade jclouds 2.5.0 -> 2.6.0 ([#22220](https://github.com/apache/pulsar/pull/22220))
- [improve][misc] Upgrade to Bookkeeper 4.16.5 ([#22484](https://github.com/apache/pulsar/pull/22484))
- [improve][misc] Upgrade to Netty 4.1.108 and tcnative 2.0.65 ([#22369](https://github.com/apache/pulsar/pull/22369))
- [fix][misc] Rename all shaded Netty native libraries ([#22415](https://github.com/apache/pulsar/pull/22415))
- [fix][sec] Upgrade Bouncycastle to 1.78 ([#22509](https://github.com/apache/pulsar/pull/22509))
- [fix][sec] Upgrade aws-sdk.version to avoid CVE-2024-21634 ([#22633](https://github.com/apache/pulsar/pull/22633))
- [fix][sec] Upgrade elasticsearch-java version to avoid CVE-2023-4043 ([#22640](https://github.com/apache/pulsar/pull/22640))
- [fix][sec] Upgrade postgresql version to avoid CVE-2024-1597 ([#22635](https://github.com/apache/pulsar/pull/22635))
- [improve][build] Upgrade Lombok to 1.18.32 for Java 22 support ([#22425](https://github.com/apache/pulsar/pull/22425))

### Tests & CI

- [fix][test] Clear MockedPulsarServiceBaseTest fields to prevent test runtime memory leak ([#22659](https://github.com/apache/pulsar/pull/22659))
- [fix][test] Clear fields in test cleanup to reduce memory consumption ([#22583](https://github.com/apache/pulsar/pull/22583))
- [fix][test] Fix NPE in BookKeeperClusterTestCase tearDown ([#22493](https://github.com/apache/pulsar/pull/22493))
- [fix][test] Fix flaky test ReplicatorTest ([#22594](https://github.com/apache/pulsar/pull/22594))
- [fix][test] Fix resource leak in TransactionCoordinatorClientTest ([#21380](https://github.com/apache/pulsar/pull/21380))
- [fix][test] Fix the flaky tests of ManagedLedgerImplUtilsTest ([#22611](https://github.com/apache/pulsar/pull/22611))
- [fix][test] Flaky-test: ManagedLedgerTest.testTimestampOnWorkingLedger ([#22600](https://github.com/apache/pulsar/pull/22600))
- [fix][test] Flaky-test: testMessageExpiryWithTimestampNonRecoverableException and testIncorrectClientClock ([#22489](https://github.com/apache/pulsar/pull/22489))
- [fix][test] SchemaMap in AutoConsumeSchema has been reused ([#22500](https://github.com/apache/pulsar/pull/22500))
- [fix][test][branch-3.0] Fix test PersistentTopicsTest.testUpdatePartitionedTopic
- [improve][test] Move ShadowManagedLedgerImplTest to flaky tests ([#22526](https://github.com/apache/pulsar/pull/22526))
- [improve][test] Move most flaky tests to flaky group ([#22433](https://github.com/apache/pulsar/pull/22433))
- [improve][test] Replace usage of curl in Java test and fix stream leaks ([#22463](https://github.com/apache/pulsar/pull/22463))
- [improve][ci][branch-3.0] Upgrade actions in pulsar-ci and pulsar-ci-flaky, port owasp cache change
- [improve][build] Upgrade OWASP Dependency check version to 9.1.0 ([#22530](https://github.com/apache/pulsar/pull/22530))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.4...v3.0.5).