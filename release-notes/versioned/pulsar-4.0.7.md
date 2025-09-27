---
id: pulsar-4.0.7
title: Apache Pulsar 4.0.7
sidebar_label: Apache Pulsar 4.0.7
---

#### 2025-09-27

### Library updates

- [fix][sec] Upgrade bouncycastle bcpkix-fips version to 1.79 to address CVE-2025-8916 ([#24650](https://github.com/apache/pulsar/pull/24650))
- [fix][sec] Upgrade Netty to 4.1.127.Final to address CVEs ([#24717](https://github.com/apache/pulsar/pull/24717))
- [fix][sec] Upgrade to Netty 4.1.124.Final to address CVE-2025-55163 ([#24637](https://github.com/apache/pulsar/pull/24637))
- [improve][io] Upgrade AWS SDK v1 & v2, Kinesis KPL and KPC versions ([#24661](https://github.com/apache/pulsar/pull/24661))
- [fix][misc] Upgrade dependencies to fix critical security vulnerabilities ([#24532](https://github.com/apache/pulsar/pull/24532))
- [improve][build] Upgrade Lombok to 1.18.42 to fully support JDK25 ([#24763](https://github.com/apache/pulsar/pull/24763))
- [improve][broker] Upgrade avro version to 1.12.0 ([#24617](https://github.com/apache/pulsar/pull/24617))
- [fix][misc] Upgrade fastutil to 8.5.16 ([#24659](https://github.com/apache/pulsar/pull/24659))
- [improve][build] Upgrade Apache Parent POM to version 35 ([#24742](https://github.com/apache/pulsar/pull/24742))
- [improve][build] Upgrade Mockito, AssertJ and ByteBuddy to fully support JDK25 ([#24764](https://github.com/apache/pulsar/pull/24764))
- [improve][build] Upgrade SpotBugs to a version that supports JDK25 ([#24768](https://github.com/apache/pulsar/pull/24768))
- [feat][misc] upgrade oxia version to 0.6.2 ([#24689](https://github.com/apache/pulsar/pull/24689))

### Broker

- [fix][broker] Key_Shared subscription doesn't always deliver messages from the replay queue after a consumer disconnects and leaves a backlog ([#24736](https://github.com/apache/pulsar/pull/24736))
- [fix][broker] Ensure KeyShared sticky mode consumer respects assigned ranges ([#24730](https://github.com/apache/pulsar/pull/24730))
- [fix][broker] PIP-428: Fix corrupted topic policies issues with sequential topic policy updates ([#24427](https://github.com/apache/pulsar/pull/24427))
- [fix][broker][branch-4.0]Can not access topic policies if topic partitions have not been created ([#24680](https://github.com/apache/pulsar/pull/24680))
- [fix][broker] Add double-check for non-durable cursor creation ([#24643](https://github.com/apache/pulsar/pull/24643))
- [fix][broker] First entry will be skipped if opening NonDurableCursor while trimmed ledger is adding first entry. ([#24738](https://github.com/apache/pulsar/pull/24738))
- [fix][broker] Fix cannot shutdown broker gracefully by admin api ([#24731](https://github.com/apache/pulsar/pull/24731))
- [fix][broker] Fix duplicate watcher registration after SessionReestablished ([#24621](https://github.com/apache/pulsar/pull/24621))
- [fix][broker] Fix memory leak when metrics are updated in a thread other than FastThreadLocalThread ([#24719](https://github.com/apache/pulsar/pull/24719))
- [fix][broker] Fix race condition in MetadataStoreCacheLoader causing inconsistent availableBroker list caching ([#24639](https://github.com/apache/pulsar/pull/24639))
- [fix][broker] Fix REST API to produce messages to single-partitioned topics ([#24450](https://github.com/apache/pulsar/pull/24450))
- [fix][broker] Invalid regex in PulsarLedgerManager causes zk data notification to be ignored ([#23977](https://github.com/apache/pulsar/pull/23977))
- [fix][broker] Prevent unexpected recycle failure in dispatcher's read callback ([#24741](https://github.com/apache/pulsar/pull/24741))
- [fix][broker]Fix never recovered metadata store bad version issue if received a large response from ZK ([#24580](https://github.com/apache/pulsar/pull/24580))
- [fix][ml]Fix EOFException after enabled topics offloading ([#24753](https://github.com/apache/pulsar/pull/24753))
- [fix][broker] Fix incorrect AuthData passed to AuthorizationService in proxy scenarios ([#24593](https://github.com/apache/pulsar/pull/24593))
- [fix][broker] Fix namespace deletion TLS URL selection for geo-replication ([#24591](https://github.com/apache/pulsar/pull/24591))
- [fix][broker] Fix NPE and annotate nullable return values for ManagedCursorContainer ([#24706](https://github.com/apache/pulsar/pull/24706))
- [fix][broker] Fix NPE being logged if load manager class name is blank ([#24570](https://github.com/apache/pulsar/pull/24570))
- [fix][broker]Dispatcher did unnecessary sort for recentlyJoinedConsumers and printed noisy error logs ([#24634](https://github.com/apache/pulsar/pull/24634))
- [fix][broker]Failed to create partitions after the partitions were deleted because topic GC ([#24651](https://github.com/apache/pulsar/pull/24651))
- [fix][broker]Fix dirty reading of namespace level offload thresholds ([#24696](https://github.com/apache/pulsar/pull/24696))
- [fix][broker]Fix thread safety issues in BucketDelayedDeliveryTracker with StampedLock optimistic reads ([#24542](https://github.com/apache/pulsar/pull/24542))
- [fix][broker]User topic failed to delete after removed cluster because of failed delete data from transaction buffer topic ([#24648](https://github.com/apache/pulsar/pull/24648))
- [fix][ml] Negative backlog & acked positions does not exist & message lost when concurrently occupying topic owner ([#24722](https://github.com/apache/pulsar/pull/24722))
- [fix][meta] Use `getChildrenFromStore` to read children data to avoid lost data ([#24665](https://github.com/apache/pulsar/pull/24665))
- [improve][admin] PIP-422 part 1: Support global topic-level replicated clusters policy ([#24390](https://github.com/apache/pulsar/pull/24390))
- [improve][broker]Part-2 Add Admin API to delete topic policies ([#24602](https://github.com/apache/pulsar/pull/24602))
- [improve][broker] If there is a deadlock in the service, the probe should return a failure because the service may be unavailable ([#23634](https://github.com/apache/pulsar/pull/23634))
- [improve][ml] Optimize ledger opening by skipping fully acknowledged ledgers ([#24655](https://github.com/apache/pulsar/pull/24655))
- [improve][broker] Allow deletion of empty persistent topics regardless of retention policy ([#24733](https://github.com/apache/pulsar/pull/24733))
- [improve][broker] Extract duplication in AbstractTopic#incrementTopicEpochIfNeeded ([#24520](https://github.com/apache/pulsar/pull/24520))
- [improve][broker]Find the target position at most once, during expiring messages for a topic, even though there are many subscriptions ([#24622](https://github.com/apache/pulsar/pull/24622))
- [improve][broker]Improve the anti-concurrency mechanism expirationCheckInProgress ([#24607](https://github.com/apache/pulsar/pull/24607))
- [improve][broker]Remove block calling that named cursor.asyncGetNth when expiring messages ([#24606](https://github.com/apache/pulsar/pull/24606))

### Client

- [fix][client] Avoid recycling the same ConcurrentBitSetRecyclable among different threads ([#24725](https://github.com/apache/pulsar/pull/24725))
- [fix][client] fix ArrayIndexOutOfBoundsException in SameAuthParamsLookupAutoClusterFailover ([#24662](https://github.com/apache/pulsar/pull/24662))
- [fix][client] Fix ArrayIndexOutOfBoundsException when using SameAuthParamsLookupAutoClusterFailover ([#23336](https://github.com/apache/pulsar/pull/23336))
- [fix][client] Fix receiver queue auto-scale without memory limit ([#24743](https://github.com/apache/pulsar/pull/24743))
- [fix][client] Retry for unknown exceptions when creating a producer or consumer ([#24599](https://github.com/apache/pulsar/pull/24599))
- [fix][client] Skip schema validation when sending messages to DLQ to avoid infinite loop when schema validation fails on an incoming message ([#24663](https://github.com/apache/pulsar/pull/24663))
- [fix][client]Prevent ZeroQueueConsumer from receiving batch messages when using MessagePayloadProcessor ([#24610](https://github.com/apache/pulsar/pull/24610))
- [fix][client]TopicListWatcher not closed when calling PatternMultiTopicsConsumerImpl.closeAsync() method ([#24698](https://github.com/apache/pulsar/pull/24698))
- [fix][client] rollback TopicListWatcher retry behavior ([#24752](https://github.com/apache/pulsar/pull/24752))
- [improve][client] Support load RSA PKCS[#8](https://github.com/apache/pulsar/pull/8) private key ([#24582](https://github.com/apache/pulsar/pull/24582))
- [fix][client] Exclude io.prometheus:simpleclient_caffeine from client-side dependencies ([#24761](https://github.com/apache/pulsar/pull/24761))
- [improve][client] Add OpenTelemetry metrics for client memory buffer usage ([#24647](https://github.com/apache/pulsar/pull/24647))
- [improve][client] RawReader support pause and resume ([#24597](https://github.com/apache/pulsar/pull/24597))
- [fix][client] Refactor AttributeWrappedMeasurement to use a class instead of a record to compatible with lower version JDK

### Pulsar IO and Pulsar Functions

- [fix][io] Improve Kafka Connect source offset flushing logic ([#24654](https://github.com/apache/pulsar/pull/24654))
- [improve][io] Add dependency file name information to error message when .nar file validation fails with ZipException ([#24604](https://github.com/apache/pulsar/pull/24604))
- [improve][io] Support specifying Kinesis KPL native binary path with 1.0 version specific path ([#24669](https://github.com/apache/pulsar/pull/24669))
- [improve][io] Add support for the complete KinesisProducerConfiguration in KinesisSinkConfig ([#24489](https://github.com/apache/pulsar/pull/24489))
- [feat][fn] Fallback to using `STATE_STORAGE_SERVICE_URL` in `PulsarMetadataStateStoreProviderImpl.init` ([#24721](https://github.com/apache/pulsar/pull/24721))

### Others

- [fix][proxy] Fix TooLongFrameException with Pulsar Proxy ([#24626](https://github.com/apache/pulsar/pull/24626))
- [fix][misc] Fix compareTo contract violation for NamespaceBundleStats, TimeAverageMessageData and ResourceUnitRanking ([#24772](https://github.com/apache/pulsar/pull/24772))
- [improve][doc] Improve the JavaDocs of sendAsync to avoid improper use ([#24601](https://github.com/apache/pulsar/pull/24601))
- [fix][offload] Exclude unnecessary dependencies from tiered storage provider / offloader nar files ([#24649](https://github.com/apache/pulsar/pull/24649))
- [fix][ws] Allow websocket principals to specify originalPrincipal without proxy role ([#24642](https://github.com/apache/pulsar/pull/24642))
- [fix][ws] Fix WebSocket authentication with authenticateOriginalAuthData enabled ([#24615](https://github.com/apache/pulsar/pull/24615))
- [fix][ws] Fix WebSocket proxy originalPrincipal for HTTP admin API calls ([#24613](https://github.com/apache/pulsar/pull/24613))
- [fix] Exclude commons-lang dep from bookkeeper ([#24749](https://github.com/apache/pulsar/pull/24749))

### Tests & CI

- [improve][build] Use org.apache.nifi:nifi-nar-maven-plugin:2.1.0 with skipDocGeneration=true ([#24668](https://github.com/apache/pulsar/pull/24668))
- [fix][ci] Fix code coverage metrics in Pulsar CI ([#24595](https://github.com/apache/pulsar/pull/24595))
- [fix][test] Fix ConcurrentModificationException in Ipv4Proxy ([#24632](https://github.com/apache/pulsar/pull/24632))
- [fix][test] Flaky-test: BrokerServiceTest.testShutDownWithMaxConcurrentUnload ([#24769](https://github.com/apache/pulsar/pull/24769))
- [fix][test]fix flaky ZeroQueueSizeTest.testZeroQueueGetExceptionWhenReceiveBatchMessage  ([#24633](https://github.com/apache/pulsar/pull/24633))
- [fix][test]fix flaky ZeroQueueSizeTest.testZeroQueueGetExceptionWhenReceiveBatchMessage ([#24630](https://github.com/apache/pulsar/pull/24630))
- [fix][broker] Fix flaky testReplicatorsInflightTaskListIsEmptyAfterReplicationFinished ([#24590](https://github.com/apache/pulsar/pull/24590))
- [fix][broker] Fix testServiceConfigurationRetentionPolicy unit test ([#24756](https://github.com/apache/pulsar/pull/24756))
- [fix][broker]Fix flaky test PartitionCreationTest.testCreateMissedPartitions ([#24679](https://github.com/apache/pulsar/pull/24679))
- [fix][broker]Fix the wrong logic of the test PartitionCreationTest.testCreateMissedPartitions ([#24683](https://github.com/apache/pulsar/pull/24683))
- [improve][build] Disable javadoc build failure ([#24594](https://github.com/apache/pulsar/pull/24594))
- [improve][build] Increase maven resolver's sync context timeout ([#24666](https://github.com/apache/pulsar/pull/24666))
- [improve][test] Add test for dead letter topic with max unacked messages blocking ([#24535](https://github.com/apache/pulsar/pull/24535))
- [improve][test] Refactor the way way pulsar-io-debezium-oracle nar file is patched when building the test image ([#24586](https://github.com/apache/pulsar/pull/24586))
- [fix][ci] Fix CI for Java 25 including upgrade of Gradle Develocity Maven extension ([#24767](https://github.com/apache/pulsar/pull/24767))
- [fix][build][branch-4.0] Fix checkstyle in BrokerServiceAutoTopicCreationTest

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.6...v4.0.7).
