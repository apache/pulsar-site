---
id: pulsar-4.0.5
title: Apache Pulsar 4.0.5
sidebar_label: Apache Pulsar 4.0.5
---

#### 2025-05-22

### Library updates

- [fix][sec] Upgrade Jetty to 9.4.57.v20241219 to mitigate CVE-2024-6763 ([#24232](https://github.com/apache/pulsar/pull/24232))
- [improve] Upgrade Netty to 4.1.121.Final ([#24214](https://github.com/apache/pulsar/pull/24214))
- [improve] Upgrade Apache Commons library versions to compatible versions ([#24205](https://github.com/apache/pulsar/pull/24205))
- [improve] Upgrade pulsar-client-python to 3.7.0 in Docker image ([#24302](https://github.com/apache/pulsar/pull/24302))
- [improve][build] Upgrade commons-compress version from 1.27.0 to 1.27.1 ([#24270](https://github.com/apache/pulsar/pull/24270))
- [improve][build] Upgrade Lombok to 1.18.38 to support JDK 24 ([#24237](https://github.com/apache/pulsar/pull/24237))

### Broker

- [fix][broker] Consumer stuck when delete subscription __compaction failed ([#23980](https://github.com/apache/pulsar/pull/23980))
- [fix][broker] Fix broker shutdown delay by resolving hanging health checks ([#24210](https://github.com/apache/pulsar/pull/24210))
- [fix][broker] Fix ByteBuf memory leak in REST API for publishing messages ([#24228](https://github.com/apache/pulsar/pull/24228))
- [fix][broker] Fix cluster level OffloadedReadPriority to bookkeeper-first does not work ([#24151](https://github.com/apache/pulsar/pull/24151))
- [fix][broker] Fix compaction service log's wrong condition ([#24207](https://github.com/apache/pulsar/pull/24207))
- [fix][broker] fix ExtensibleLoadManager to override the ownerships concurrently without blocking load manager thread ([#24156](https://github.com/apache/pulsar/pull/24156))
- [fix][broker] Fix HashedWheelTimer leak in PulsarService by stopping it in shutdown ([#24275](https://github.com/apache/pulsar/pull/24275))
- [fix][broker] Fix HealthChecker deadlock in shutdown ([#24216](https://github.com/apache/pulsar/pull/24216))
- [fix][broker] Fix NPE from the wrong iterator in the ownership cleanup job(ExtensibleLoadManagerImpl only) ([#24196](https://github.com/apache/pulsar/pull/24196))
- [fix][broker] Fix potential deadlock when creating partitioned topic ([#24313](https://github.com/apache/pulsar/pull/24313))
- [fix][broker] Fix some problems in calculate totalAvailableBookies in method getExcludedBookiesWithIsolationGroups when some bookies belongs to multiple isolation groups. ([#24091](https://github.com/apache/pulsar/pull/24091))
- [fix][broker] Fix tenant creation and update with null value ([#24209](https://github.com/apache/pulsar/pull/24209))
- [fix][broker] fix wrong method name checkTopicExists. ([#24293](https://github.com/apache/pulsar/pull/24293))
- [fix][broker] Fixes Inconsistent ServiceUnitStateData View (ExtensibleLoadManagerImpl only) ([#24186](https://github.com/apache/pulsar/pull/24186))
- [fix][broker] Orphan schema after disabled a cluster for a namespace ([#24223](https://github.com/apache/pulsar/pull/24223))
- [fix][broker] The feature brokerDeleteInactivePartitionedTopicMetadataEnabled leaves orphan topic policies and topic schemas ([#24150](https://github.com/apache/pulsar/pull/24150))
- [fix][broker] Unregister non-static metrics collectors registered in Prometheus default registry ([#24257](https://github.com/apache/pulsar/pull/24257))
- [fix][broker]Fix incorrect priority between topic policies and global topic policies ([#24254](https://github.com/apache/pulsar/pull/24254))
- [fix][broker]fix memory leak, messages lost, incorrect replication state if using multiple schema versions(auto_produce) ([#24178](https://github.com/apache/pulsar/pull/24178))
- [fix][admin] Backlog quota's policy is null which causes a NPE ([#24192](https://github.com/apache/pulsar/pull/24192))
- [fix][ml] Fix ML thread blocking issue in internalGetPartitionedStats API ([#24167](https://github.com/apache/pulsar/pull/24167))
- [fix][ml] Skip deleting cursor if it was already deleted before calling unsubscribe ([#24098](https://github.com/apache/pulsar/pull/24098))

### Client

- [fix][client] Fix incorrect producer.getPendingQueueSize due to incomplete queue implementation ([#24184](https://github.com/apache/pulsar/pull/24184))
- [fix][client] Fix producer publishing getting stuck after message with incompatible schema is discarded ([#24282](https://github.com/apache/pulsar/pull/24282))
- [improve][client] validate ClientConfigurationData earlier to avoid resource leaks ([#24187](https://github.com/apache/pulsar/pull/24187))
- [improve][client]Improve transaction log when a TXN command timeout ([#24230](https://github.com/apache/pulsar/pull/24230))

### Pulsar IO and Pulsar Functions

- [fix][io] Fix SyntaxWarning in Pulsar Python functions ([#24297](https://github.com/apache/pulsar/pull/24297))
- [improve][io] Add configuration parameter for disabling aggregation for Kinesis Producers ([#24289](https://github.com/apache/pulsar/pull/24289))
- [improve][io] support kafka connect transforms and predicates ([#24221](https://github.com/apache/pulsar/pull/24221))
- [improve][io] Upgrade Kafka client and compatible Confluent platform version ([#24201](https://github.com/apache/pulsar/pull/24201))
- [improve][io][kca] support fully-qualified topic names in source records ([#24248](https://github.com/apache/pulsar/pull/24248))

### Others

- [cleanup] Remove unused config `autoShrinkForConsumerPendingAcksMap` ([#24315](https://github.com/apache/pulsar/pull/24315))
- [cleanup] remove unused config messagePublishBufferCheckIntervalInMillis ([#24252](https://github.com/apache/pulsar/pull/24252))
- [cleanup] Remove unused static fields in BrokerService ([#24251](https://github.com/apache/pulsar/pull/24251))
- [cleanup][misc] Add override annotation ([#24033](https://github.com/apache/pulsar/pull/24033))
- [cleanup][test] Remove unused parameter from deleteNamespaceWithRetry method in MockedPulsarServiceBaseTest ([#24283](https://github.com/apache/pulsar/pull/24283))
- [fix] chore: remove unused preciseTopicPublishRateLimiterEnable ([#24249](https://github.com/apache/pulsar/pull/24249))
- [fix][misc] Fix ByteBuf leak in SchemaUtils ([#24274](https://github.com/apache/pulsar/pull/24274))
- [fix][misc] Fix ByteBuf leaks in tests by making ByteBufPair.coalesce release the input ByteBufPair ([#24273](https://github.com/apache/pulsar/pull/24273))
- [fix][misc]: ignore deleted ledger when tear down cluster ([#23831](https://github.com/apache/pulsar/pull/23831))
- [fix][proxy] Fix incorrect client error when calling get topic metadata ([#24181](https://github.com/apache/pulsar/pull/24181))
- [fix][proxy] Propagate client connection feature flags through Pulsar Proxy to Broker ([#24158](https://github.com/apache/pulsar/pull/24158))
- [fix][schema] Reject unsupported Avro schema types during schema registration ([#24103](https://github.com/apache/pulsar/pull/24103))
- [improve][cli] Make pulsar-perf termination more responsive by using Thread interrupt status ([#24309](https://github.com/apache/pulsar/pull/24309))
- [improve][misc] Migrate from multiple nullness annotation libraries to JSpecify annotations ([#24239](https://github.com/apache/pulsar/pull/24239))

### Tests & CI

- [fix][build] Ensure that buildtools is Java 8 compatible and fix remaining compatibility issue ([#24307](https://github.com/apache/pulsar/pull/24307))
- [fix][build] Fix docker image building by replacing deprecated and removed compress argument ([#24155](https://github.com/apache/pulsar/pull/24155))
- [fix][build] Fix errorprone maven profile configuration ([#24246](https://github.com/apache/pulsar/pull/24246))
- [fix][build] Fix skipTag and use explicit tag for image name ([#24168](https://github.com/apache/pulsar/pull/24168))
- [improve] Adapt startup scripts for Java 24 changes ([#24236](https://github.com/apache/pulsar/pull/24236))
- [improve][broker]Improve the feature "Optimize subscription seek (cursor reset) by timestamp": search less entries ([#24219](https://github.com/apache/pulsar/pull/24219))
- [improve][build] Allow building and running tests on JDK 24 and upcoming JDK 25 LTS ([#24268](https://github.com/apache/pulsar/pull/24268))
- [improve][build] Build apachepulsar/pulsar-io-kinesis-sink-kinesis_producer with Alpine 3.21 ([#24180](https://github.com/apache/pulsar/pull/24180))
- [improve][build] Improve thread leak detector by ignoring "Attach Listener" thread ([#24277](https://github.com/apache/pulsar/pull/24277))
- [improve][build] Suppress JVM class sharing warning when running tests ([#24278](https://github.com/apache/pulsar/pull/24278))
- [improve][build] Upgrade errorprone to 2.38.0 ([#24242](https://github.com/apache/pulsar/pull/24242))
- [improve][build] Upgrade Gradle Develocity Maven Extension dependencies ([#24260](https://github.com/apache/pulsar/pull/24260))
- [improve][build] Upgrade Mockito to 5.17.0 and byte-buddy to 1.15.11 ([#24241](https://github.com/apache/pulsar/pull/24241))
- [improve][build] Upgrade SpotBugs to 4.9.x ([#24243](https://github.com/apache/pulsar/pull/24243))
- [improve][build] Upgrade to jacoco 0.8.13 ([#24240](https://github.com/apache/pulsar/pull/24240))
- [improve][build] Upgrade zstd version from 1.5.2-3 to 1.5.7-3 ([#24263](https://github.com/apache/pulsar/pull/24263))
- [improve][ci] Add Netty leak detection reporting to Pulsar CI ([#24272](https://github.com/apache/pulsar/pull/24272))
- [improve][ci] Disable detailed console logging for integration tests in CI ([#24266](https://github.com/apache/pulsar/pull/24266))
- [improve][test] Use configured session timeout for MockZooKeeper and TestZKServer in PulsarTestContext ([#24171](https://github.com/apache/pulsar/pull/24171))
- [fix][test] Fix flaky BatchMessageWithBatchIndexLevelTest.testBatchMessageAck ([#24212](https://github.com/apache/pulsar/pull/24212))
- [fix][test] Fix flaky BrokerServiceChaosTest ([#24162](https://github.com/apache/pulsar/pull/24162))
- [fix][test] Fix flaky BrokerServiceChaosTest.testFetchPartitionedTopicMetadataWithCacheRefresh ([#24161](https://github.com/apache/pulsar/pull/24161))
- [fix][test] Fix flaky ManagedCursorTest.testLastActiveAfterResetCursor and disable failing SchemaTest ([#24261](https://github.com/apache/pulsar/pull/24261))
- [fix][test] Fix flaky ManagedCursorTest.testSkipEntriesWithIndividualDeletedMessages ([#24244](https://github.com/apache/pulsar/pull/24244))
- [fix][test] Fix flaky NamespacesTest.testNamespacesApiRedirects ([#24194](https://github.com/apache/pulsar/pull/24194))
- [fix][test] Fix invalid test CompactionTest.testDeleteCompactedLedgerWithSlowAck ([#24166](https://github.com/apache/pulsar/pull/24166))
- [fix][test] Fix more Netty ByteBuf leaks in tests ([#24299](https://github.com/apache/pulsar/pull/24299))
- [fix][test] Fix more resource leaks in tests ([#24314](https://github.com/apache/pulsar/pull/24314))
- [fix][test] Fix multiple ByteBuf leaks in tests ([#24281](https://github.com/apache/pulsar/pull/24281))
- [fix][test] Fix multiple resource leaks in tests ([#24218](https://github.com/apache/pulsar/pull/24218))
- [fix][test] Fix remaining UnfinishedStubbingException issue with AuthZTests ([#24174](https://github.com/apache/pulsar/pull/24174))
- [fix][test] Fix resource leaks in ProxyTest and fix invalid tests ([#24204](https://github.com/apache/pulsar/pull/24204))
- [fix][test] Fix resource leaks in PulsarBrokerStarterTest ([#24235](https://github.com/apache/pulsar/pull/24235))
- [fix][test] Fix TestNG BetweenTestClassesListenerAdapter listener ([#24258](https://github.com/apache/pulsar/pull/24258))
- [fix][test] Fix UnfinishedStubbing issue in AuthZTests ([#24165](https://github.com/apache/pulsar/pull/24165))
- [fix][test] Improve reliability of IncrementPartitionsTest ([#24172](https://github.com/apache/pulsar/pull/24172))
- [fix][test] Simplify BetweenTestClassesListenerAdapter and fix issue with BeforeTest/AfterTest annotations ([#24304](https://github.com/apache/pulsar/pull/24304))
- [fix][test] Update partitioned topic subscription assertions in IncrementPartitionsTest ([#24056](https://github.com/apache/pulsar/pull/24056))
- [fix][test]flaky-test:ManagedLedgerInterceptorImplTest.testManagedLedgerPayloadInputProcessorFailure ([#24170](https://github.com/apache/pulsar/pull/24170))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.4...v4.0.5).
