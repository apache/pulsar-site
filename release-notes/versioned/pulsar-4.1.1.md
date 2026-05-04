---
id: pulsar-4.1.1
title: Apache Pulsar 4.1.1
sidebar_label: Apache Pulsar 4.1.1
---

#### 2025-09-27

### Library updates

- [fix][sec] Upgrade Netty to 4.1.127.Final to address CVEs ([#24717](https://github.com/apache/pulsar/pull/24717))
- [improve][build] Upgrade Lombok to 1.18.42 to fully support JDK25 ([#24763](https://github.com/apache/pulsar/pull/24763))
- [improve][build] Upgrade Apache Parent POM to version 35 ([#24742](https://github.com/apache/pulsar/pull/24742))
- [improve][build] Upgrade Mockito, AssertJ and ByteBuddy to fully support JDK25 ([#24764](https://github.com/apache/pulsar/pull/24764))
- [improve][build] Upgrade SpotBugs to a version that supports JDK25 ([#24768](https://github.com/apache/pulsar/pull/24768))
- [feat][misc] upgrade oxia version to 0.6.2 ([#24689](https://github.com/apache/pulsar/pull/24689))
- [improve][io] Upgrade to Debezium 3.2.2 ([#24712](https://github.com/apache/pulsar/pull/24712))

### Broker

- [fix][broker] Key_Shared subscription doesn't always deliver messages from the replay queue after a consumer disconnects and leaves a backlog ([#24736](https://github.com/apache/pulsar/pull/24736))
- [fix][broker] Ensure KeyShared sticky mode consumer respects assigned ranges ([#24730](https://github.com/apache/pulsar/pull/24730))
- [fix][broker] First entry will be skipped if opening NonDurableCursor while trimmed ledger is adding first entry. ([#24738](https://github.com/apache/pulsar/pull/24738))
- [fix][broker] Fix cannot shutdown broker gracefully by admin api ([#24731](https://github.com/apache/pulsar/pull/24731))
- [fix][broker] Fix memory leak when metrics are updated in a thread other than FastThreadLocalThread ([#24719](https://github.com/apache/pulsar/pull/24719))
- [fix][broker] Prevent unexpected recycle failure in dispatcher's read callback ([#24741](https://github.com/apache/pulsar/pull/24741))
- [fix][broker]Fix never recovered metadata store bad version issue if received a large response from ZK ([#24580](https://github.com/apache/pulsar/pull/24580))
- [fix][ml]Fix EOFException after enabled topics offloading ([#24753](https://github.com/apache/pulsar/pull/24753))
- [fix][broker] Fix NPE and annotate nullable return values for ManagedCursorContainer ([#24706](https://github.com/apache/pulsar/pull/24706))
- [fix][broker]Dispatcher did unnecessary sort for recentlyJoinedConsumers and printed noisy error logs ([#24634](https://github.com/apache/pulsar/pull/24634))
- [fix][broker]Fix dirty reading of namespace level offload thresholds ([#24696](https://github.com/apache/pulsar/pull/24696))
- [fix][ml] Negative backlog & acked positions does not exist & message lost when concurrently occupying topic owner ([#24722](https://github.com/apache/pulsar/pull/24722))
- [improve][broker] If there is a deadlock in the service, the probe should return a failure because the service may be unavailable ([#23634](https://github.com/apache/pulsar/pull/23634))
- [improve][broker] Allow deletion of empty persistent topics regardless of retention policy ([#24733](https://github.com/apache/pulsar/pull/24733))
- [improve][broker] PIP-402: Optionally prevent role/originalPrincipal logging ([#23386](https://github.com/apache/pulsar/pull/23386))
- [improve][broker] Reduce unnecessary MessageMetadata parsing by caching the parsed instance in the broker cache ([#24682](https://github.com/apache/pulsar/pull/24682))
- [improve][ml] Improve cache insert performance by removing exists check since it's already covered by putIfAbsent ([#24699](https://github.com/apache/pulsar/pull/24699))

### Client

- [fix][client] Avoid recycling the same ConcurrentBitSetRecyclable among different threads ([#24725](https://github.com/apache/pulsar/pull/24725))
- [fix][client] Fix receiver queue auto-scale without memory limit ([#24743](https://github.com/apache/pulsar/pull/24743))
- [fix][client]TopicListWatcher not closed when calling PatternMultiTopicsConsumerImpl.closeAsync() method ([#24698](https://github.com/apache/pulsar/pull/24698))
- [fix][client] rollback TopicListWatcher retry behavior ([#24752](https://github.com/apache/pulsar/pull/24752))
- [fix][client] Exclude io.prometheus:simpleclient_caffeine from client-side dependencies ([#24761](https://github.com/apache/pulsar/pull/24761))
- [improve][client]  PIP-407 Add newMessage with schema and transactions ([#23942](https://github.com/apache/pulsar/pull/23942))

### Pulsar IO and Pulsar Functions

- [fix][io] Improve Kafka Connect source offset flushing logic ([#24654](https://github.com/apache/pulsar/pull/24654))
- [feat][fn] Fallback to using `STATE_STORAGE_SERVICE_URL` in `PulsarMetadataStateStoreProviderImpl.init` ([#24721](https://github.com/apache/pulsar/pull/24721))

### Others

- [fix][misc] Fix compareTo contract violation for NamespaceBundleStats, TimeAverageMessageData and ResourceUnitRanking ([#24772](https://github.com/apache/pulsar/pull/24772))
- [fix] Exclude commons-lang dep from bookkeeper ([#24749](https://github.com/apache/pulsar/pull/24749))

### Tests & CI

- [fix][test] Flaky-test: BrokerServiceTest.testShutDownWithMaxConcurrentUnload ([#24769](https://github.com/apache/pulsar/pull/24769))
- [fix][broker] Fix testServiceConfigurationRetentionPolicy unit test ([#24756](https://github.com/apache/pulsar/pull/24756))
- [fix][broker]Fix the wrong logic of the test PartitionCreationTest.testCreateMissedPartitions ([#24683](https://github.com/apache/pulsar/pull/24683))
- [improve][build] Disable javadoc build failure ([#24594](https://github.com/apache/pulsar/pull/24594))
- [fix][ci] Fix CI for Java 25 including upgrade of Gradle Develocity Maven extension ([#24767](https://github.com/apache/pulsar/pull/24767))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.1.0...v4.1.1).
