---
id: pulsar-4.0.8
title: Apache Pulsar 4.0.8
sidebar_label: Apache Pulsar 4.0.8
---

#### 2025-11-17

### Library updates

- [fix] Update gRPC to 1.75.0 ([#24813](https://github.com/apache/pulsar/pull/24813))
- [improve][misc] Upgrade Netty to 4.1.128.Final ([#24911](https://github.com/apache/pulsar/pull/24911))
- [improve][ml] Upgrade Oxia client to 0.7.0 ([#24824](https://github.com/apache/pulsar/pull/24824))
- [fix][sec] Added Exclusions for tomcat-embed-core and derby and override mina-core to remediate CVEs ([#24949](https://github.com/apache/pulsar/pull/24949))
- [fix][sec] Bump io.vertx:vertx-web from 4.5.10 to 4.5.22 ([#24889](https://github.com/apache/pulsar/pull/24889))
- [fix][sec] Override commons-beanutils and commons-configuration2 to remediate CVEs ([#24936](https://github.com/apache/pulsar/pull/24936))
- [fix][sec] Override kafka-clients in kinesis-kpl-shaded to remediate CVE-2024-31141 and CVE-2025-27817 ([#24935](https://github.com/apache/pulsar/pull/24935))
- [fix][sec] Override nimbus-jose-jwt to remediate CVE-2023-52428 and CVE-2025-53864 ([#24937](https://github.com/apache/pulsar/pull/24937))
- [fix][sec] Update Hbase version to 2.6.3-hadoop3 and exclude Avro from hbase-client to remediate CVEs ([#24953](https://github.com/apache/pulsar/pull/24953))
- [fix][sec] Upgrade BouncyCastle FIPS to 2.0.10 to remediate CVE-2025-8916 ([#24923](https://github.com/apache/pulsar/pull/24923))
- [fix][sec] Upgrade hadoop3 version from 3.4.0 to 3.4.1 ([#24950](https://github.com/apache/pulsar/pull/24950))
- [fix][sec] Upgrade Jetty to 9.4.58.v20250814 to address CVE-2025-5115 ([#24897](https://github.com/apache/pulsar/pull/24897))
- [fix][sec] Upgrade Spring to 6.2.12 to remediate CVE-2025-22233 and CVE-2025-41249 ([#24903](https://github.com/apache/pulsar/pull/24903))
- [improve][ci] Upgrade GitHub Actions workflows to use ubuntu-24.04 ([#24841](https://github.com/apache/pulsar/pull/24841))

### Broker

- [fix][broker] Allow intermittent error from topic policies service when loading topics ([#24829](https://github.com/apache/pulsar/pull/24829))
- [fix][broker] AvgShedder comparison error ([#24954](https://github.com/apache/pulsar/pull/24954))
- [fix][broker] Avoid recursive update in ConcurrentHashMap during policy cache cleanup ([#24939](https://github.com/apache/pulsar/pull/24939))
- [fix][broker] BacklogMessageAge is not reset when cursor mdPosition is on an open ledger ([#24915](https://github.com/apache/pulsar/pull/24915))
- [fix][broker] Ensure LoadSheddingTask is scheduled after metadata service is available again ([#24838](https://github.com/apache/pulsar/pull/24838))
- [fix][broker] ExtensibleLoadManager: handle SessionReestablished and Reconnected events to re-register broker metadata ([#24932](https://github.com/apache/pulsar/pull/24932))
- [fix][broker] Fix bug in PersistentMessageExpiryMonitor which blocked further expirations ([#24941](https://github.com/apache/pulsar/pull/24941))
- [fix][broker] fix getMaxReadPosition in TransactionBufferDisable should return latest ([#24898](https://github.com/apache/pulsar/pull/24898))
- [fix][broker] Fix incorrect topic loading latency metric and timeout might not be respected ([#24785](https://github.com/apache/pulsar/pull/24785))
- [fix][broker] Fix stack overflow caused by race condition when closing a connection ([#24934](https://github.com/apache/pulsar/pull/24934))
- [fix][broker] Fix totalAvailablePermits not reduced when removing consumer from non-persistent dispatcher ([#24885](https://github.com/apache/pulsar/pull/24885))
- [fix][broker] Fix wrong behaviour when using namespace.allowed_clusters, such as namespace deletion and namespace policies updating ([#24860](https://github.com/apache/pulsar/pull/24860))
- [fix][broker] Flaky-test: ExtensibleLoadManagerImplTest.testDisableBroker ([#24770](https://github.com/apache/pulsar/pull/24770))
- [fix][broker] Flaky-test: TopicTransactionBufferTest.testMessagePublishInOrder ([#24826](https://github.com/apache/pulsar/pull/24826))
- [fix][broker] Run ResourceGroup tasks only when tenants/namespaces registered ([#24859](https://github.com/apache/pulsar/pull/24859))
- [fix][broker] Stop to retry to read entries if the replicator has terminated ([#24880](https://github.com/apache/pulsar/pull/24880))
- [fix][broker] Trigger topic creation event only once for non-existent topic ([#24802](https://github.com/apache/pulsar/pull/24802))
- [fix][broker] Use `poll` instead `remove` to avoid `NoSuchElementException` ([#24933](https://github.com/apache/pulsar/pull/24933))
- [fix][broker]Leaving orphan schemas and topic-level policies after partitioned topic is deleted by GC ([#24971](https://github.com/apache/pulsar/pull/24971))
- [fix][broker]Transactional messages can never be sent successfully if concurrently taking transaction buffer snapshot ([#24945](https://github.com/apache/pulsar/pull/24945))
- [fix][admin] Set local policies overwrites "number of bundles" passed during namespace creation ([#24762](https://github.com/apache/pulsar/pull/24762))
- [fix][ml] Fix `getNumberOfEntries` may point to deleted ledger ([#24852](https://github.com/apache/pulsar/pull/24852))
- [fix][ml] Fix ledger trimming race causing cursor to point to deleted ledgers ([#24855](https://github.com/apache/pulsar/pull/24855))
- [fix]Fixed getChildren('/') on Oxia based provider ([#24863](https://github.com/apache/pulsar/pull/24863))
- [improve][broker] Add tests for using absolute FQDN for advertisedAddress and remove extra dot from brokerId ([#24787](https://github.com/apache/pulsar/pull/24787))
- [improve][broker] Don't log an error when updatePartitionedTopic is called on a non-partitioned topic ([#24943](https://github.com/apache/pulsar/pull/24943))
- [improve][broker] Optimize lookup result warn log ([#24942](https://github.com/apache/pulsar/pull/24942))
- [improve][broker] Part-1 of PIP-434: Expose Netty channel configuration WRITE_BUFFER_WATER_MARK to pulsar conf and pause receive requests when channel is unwritable ([#24423](https://github.com/apache/pulsar/pull/24423))
- [improve][broker] Part-2 of PIP-434: Use ServerCnxThrottleTracker, instead of modifying channel.readable directly ([#24799](https://github.com/apache/pulsar/pull/24799))
- [improve][broker] PIP-434: add configurations to broker.conf ([#24800](https://github.com/apache/pulsar/pull/24800))
- [improve][broker] Reduce the broker close time to avoid useless wait for event loop shutdown ([#24895](https://github.com/apache/pulsar/pull/24895))
- [improve][broker] Replace isServiceUnitActiveAsync with checkTopicNsOwnership ([#24780](https://github.com/apache/pulsar/pull/24780))
- [improve][broker]Call scheduleAtFixedRateNonConcurrently for scheduled tasks, instead of scheduleAtFixedRate ([#24596](https://github.com/apache/pulsar/pull/24596))
- [improve][broker]Improve NamespaceService log that is printed when cluster was removed ([#24801](https://github.com/apache/pulsar/pull/24801))
- [improve][broker]Skip to mark delete if the target position of expira… ([#24881](https://github.com/apache/pulsar/pull/24881))
- [fix][txn] fix concurrent error cause txn stuck in TransactionBufferHandlerImpl#endTxn ([#23551](https://github.com/apache/pulsar/pull/23551))
- [cleanup][broker] Remove unused configuration maxMessageSizeCheckIntervalInSeconds ([#24958](https://github.com/apache/pulsar/pull/24958))
- [fix][broker][branch-4.0] Fix failed testFinishTakeSnapshotWhenTopicLoading due to topic future cache conflicts ([#24947](https://github.com/apache/pulsar/pull/24947))
- [improve][broker] Separate offload read and write thread pool ([#24025](https://github.com/apache/pulsar/pull/24025))
- [fix][monitor] Fix the incorrect metrics name ([#21981](https://github.com/apache/pulsar/pull/21981))

### Client

- [fix][client] Fix deduplication for getPartitionedTopicMetadata to include method parameters ([#24965](https://github.com/apache/pulsar/pull/24965))
- [fix][client] Fix getPendingQueueSize for PartitionedTopicProducerStatsRecorderImpl: avoid NPE and implement aggregation ([#24830](https://github.com/apache/pulsar/pull/24830))
- [fix][client] Fix thread leak in reloadLookUp method which is used by ServiceUrlProvider ([#24794](https://github.com/apache/pulsar/pull/24794))
- [fix][client] Make auto partitions update work for old brokers without PIP-344 ([#24822](https://github.com/apache/pulsar/pull/24822))
- [improve][client] Deduplicate getTopicsUnderNamespace in BinaryProtoLookupService ([#24962](https://github.com/apache/pulsar/pull/24962))
- [improve][client]Add null check for Pulsar client clock configuration ([#24848](https://github.com/apache/pulsar/pull/24848))
- [fix] Fix mixed lookup/partition metadata requests causing reliability issues and incorrect responses ([#24832](https://github.com/apache/pulsar/pull/24832))

### Pulsar IO and Pulsar Functions

- [improve][fn] Use PulsarByteBufAllocator.DEFAULT instead of ByteBufAllocator.DEFAULT ([#24952](https://github.com/apache/pulsar/pull/24952))

### Tests & CI

- [fix][build] Fix maven deploy with maven-source-plugin 3.3.1 ([#24811](https://github.com/apache/pulsar/pull/24811))
- [fix][build] Remove invalid profile in settings.xml that caused gpg signing to fail ([#24812](https://github.com/apache/pulsar/pull/24812))
- [fix][test] Add Delta Tolerance in Double-Precision Assertions to Fix Rounding Flakiness ([#24972](https://github.com/apache/pulsar/pull/24972))
- [fix][test] BacklogQuotaManagerTest.backlogsAgeMetricsNoPreciseWithoutBacklogQuota handle empty /metrics scrape ([#24887](https://github.com/apache/pulsar/pull/24887))
- [fix][test] Fix flaky KeySharedSubscriptionBrokerCacheTest.testReplayQueueReadsGettingCached ([#24955](https://github.com/apache/pulsar/pull/24955))
- [fix][test] Fix flaky LookupPropertiesTest.testConcurrentLookupProperties ([#24854](https://github.com/apache/pulsar/pull/24854))
- [fix][test] Fix flaky NonPersistentTopicTest.testProducerRateLimit ([#24951](https://github.com/apache/pulsar/pull/24951))
- [fix][test] Fix flaky ReplicatorTest.testResumptionAfterBacklogRelaxed ([#24904](https://github.com/apache/pulsar/pull/24904))
- [fix][test] Fix flaky SubscriptionSeekTest.testSeekWillNotEncounteredFencedError by counting subscription is fenced only after seek ([#24865](https://github.com/apache/pulsar/pull/24865))
- [fix][test] Fix invalid test NonPersistentTopicTest.testProducerRateLimit ([#24957](https://github.com/apache/pulsar/pull/24957))
- [fix][test] Fixed Nondeterministic Ordering in SchemaInfoTest ([#24969](https://github.com/apache/pulsar/pull/24969))
- [fix][test] Fixed ResponseBody Check in Test Helper ([#24872](https://github.com/apache/pulsar/pull/24872))
- [fix][test] Made ProtobufNativeSchemaTest.testSchema order-independent ([#24805](https://github.com/apache/pulsar/pull/24805))
- [fix][test] Made ProtobufSchemaTest.testParsingInfoProperty order-independent ([#24807](https://github.com/apache/pulsar/pull/24807))
- [fix][test] Stabilize PublishRateLimiterOverconsumingTest by aligning measurement and using adjacent 2-sec averages ([#24864](https://github.com/apache/pulsar/pull/24864))
- [fix][test] Stabilize SequenceIdWithErrorTest by fencing after first publish to avoid empty-ledger deletion and send timeout ([#24861](https://github.com/apache/pulsar/pull/24861))
- [fix][test] Stabilize testMsgDropStat by reliably triggering non-persistent publisher drop ([#24929](https://github.com/apache/pulsar/pull/24929))
- [fix][test]fix flaky SimpleProducerConsumerTest.testReceiveAsyncCompletedWhenClosing ([#24858](https://github.com/apache/pulsar/pull/24858))
- [improve][ci] Move replication tests to new group Broker Group 5 in Pulsar CI ([#24917](https://github.com/apache/pulsar/pull/24917))
- [improve][test] Disable flaky PatternConsumerBackPressureTest until the problem is fixed ([#24948](https://github.com/apache/pulsar/pull/24948))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.7...v4.0.8).
