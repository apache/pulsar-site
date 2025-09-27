---
id: pulsar-3.3.9
title: Apache Pulsar 3.3.9
sidebar_label: Apache Pulsar 3.3.9
---

#### 2025-09-27

### Library updates

- [fix][sec] Upgrade bouncycastle bcpkix-fips version to 1.79 to address CVE-2025-8916 ([#24650](https://github.com/apache/pulsar/pull/24650))
- [fix][sec] Upgrade Netty to 4.1.127.Final to address CVEs ([#24717](https://github.com/apache/pulsar/pull/24717))
- [fix][sec] Upgrade to Netty 4.1.124.Final to address CVE-2025-55163 ([#24637](https://github.com/apache/pulsar/pull/24637))
- [improve][build] Bump org.apache.commons:commons-lang3 from 3.17.0 to 3.18.0 ([#24514](https://github.com/apache/pulsar/pull/24514))
- [improve][io] Upgrade AWS SDK v1 & v2, Kinesis KPL and KPC versions ([#24661](https://github.com/apache/pulsar/pull/24661))
- [fix][misc] Upgrade dependencies to fix critical security vulnerabilities ([#24532](https://github.com/apache/pulsar/pull/24532))
- [improve][build] Upgrade Lombok to 1.18.42 to fully support JDK25 ([#24763](https://github.com/apache/pulsar/pull/24763))
- [improve][build] Upgrade Apache Parent POM to version 35 ([#24742](https://github.com/apache/pulsar/pull/24742))

### Broker

- [fix][broker] Add double-check for non-durable cursor creation ([#24643](https://github.com/apache/pulsar/pull/24643))
- [fix][broker] Ensure KeyShared sticky mode consumer respects assigned ranges ([#24730](https://github.com/apache/pulsar/pull/24730))
- [fix][broker] First entry will be skipped if opening NonDurableCursor while trimmed ledger is adding first entry. ([#24738](https://github.com/apache/pulsar/pull/24738))
- [fix][broker] Fix cannot shutdown broker gracefully by admin api ([#24731](https://github.com/apache/pulsar/pull/24731))
- [fix][broker] Fix duplicate watcher registration after SessionReestablished ([#24621](https://github.com/apache/pulsar/pull/24621))
- [fix][broker] Fix memory leak when metrics are updated in a thread other than FastThreadLocalThread ([#24719](https://github.com/apache/pulsar/pull/24719))
- [fix][broker] Fix race condition in MetadataStoreCacheLoader causing inconsistent availableBroker list caching ([#24639](https://github.com/apache/pulsar/pull/24639))
- [fix][broker] Fix REST API to produce messages to single-partitioned topics ([#24450](https://github.com/apache/pulsar/pull/24450))
- [fix][broker] Invalid regex in PulsarLedgerManager causes zk data notification to be ignored ([#23977](https://github.com/apache/pulsar/pull/23977))
- [fix][broker] Prevent unexpected recycle failure in dispatcher's read callback ([#24741](https://github.com/apache/pulsar/pull/24741))
- [improve][broker] If there is a deadlock in the service, the probe should return a failure because the service may be unavailable ([#23634](https://github.com/apache/pulsar/pull/23634))
- [fix][meta] Use `getChildrenFromStore` to read children data to avoid lost data ([#24665](https://github.com/apache/pulsar/pull/24665))
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

### Pulsar IO and Pulsar Functions

- [fix][io] Improve Kafka Connect source offset flushing logic ([#24654](https://github.com/apache/pulsar/pull/24654))
- [improve][io] Add dependency file name information to error message when .nar file validation fails with ZipException ([#24604](https://github.com/apache/pulsar/pull/24604))
- [improve][io] Support specifying Kinesis KPL native binary path with 1.0 version specific path ([#24669](https://github.com/apache/pulsar/pull/24669))
- [feat][fn] Fallback to using `STATE_STORAGE_SERVICE_URL` in `PulsarMetadataStateStoreProviderImpl.init` ([#24721](https://github.com/apache/pulsar/pull/24721))

### Others

- [fix][proxy] Fix TooLongFrameException with Pulsar Proxy ([#24626](https://github.com/apache/pulsar/pull/24626))
- [fix][misc] Fix compareTo contract violation for NamespaceBundleStats, TimeAverageMessageData and ResourceUnitRanking ([#24772](https://github.com/apache/pulsar/pull/24772))
- [improve][doc] Improve the JavaDocs of sendAsync to avoid improper use ([#24601](https://github.com/apache/pulsar/pull/24601))
- [fix][offload] Exclude unnecessary dependencies from tiered storage provider / offloader nar files ([#24649](https://github.com/apache/pulsar/pull/24649))

### Tests & CI

- [improve][build] Use org.apache.nifi:nifi-nar-maven-plugin:2.1.0 with skipDocGeneration=true ([#24668](https://github.com/apache/pulsar/pull/24668))
- [fix][ci] Fix code coverage metrics in Pulsar CI ([#24595](https://github.com/apache/pulsar/pull/24595))
- [fix][test] Fix ConcurrentModificationException in Ipv4Proxy ([#24632](https://github.com/apache/pulsar/pull/24632))
- [fix][test] Flaky-test: BrokerServiceTest.testShutDownWithMaxConcurrentUnload ([#24769](https://github.com/apache/pulsar/pull/24769))
- [fix][test]fix flaky ZeroQueueSizeTest.testZeroQueueGetExceptionWhenReceiveBatchMessage  ([#24633](https://github.com/apache/pulsar/pull/24633))
- [fix][test]fix flaky ZeroQueueSizeTest.testZeroQueueGetExceptionWhenReceiveBatchMessage ([#24630](https://github.com/apache/pulsar/pull/24630))
- [fix][broker] Fix flaky testReplicatorsInflightTaskListIsEmptyAfterReplicationFinished ([#24590](https://github.com/apache/pulsar/pull/24590))
- [improve][build] Disable javadoc build failure ([#24594](https://github.com/apache/pulsar/pull/24594))
- [improve][build] Increase maven resolver's sync context timeout ([#24666](https://github.com/apache/pulsar/pull/24666))
- [improve][test] Add test for dead letter topic with max unacked messages blocking ([#24535](https://github.com/apache/pulsar/pull/24535))
- [improve][test] Refactor the way way pulsar-io-debezium-oracle nar file is patched when building the test image ([#24586](https://github.com/apache/pulsar/pull/24586))
- [fix][ci] Fix CI for Java 25 including upgrade of Gradle Develocity Maven extension ([#24767](https://github.com/apache/pulsar/pull/24767))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.3.8...v3.3.9).
