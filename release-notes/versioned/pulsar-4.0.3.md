---
id: pulsar-4.0.3
title: Apache Pulsar 4.0.3
sidebar_label: Apache Pulsar 4.0.3
---

#### 2025-02-27

### Known issues

There's a potential regression where consuming messages could fail due to https://github.com/apache/pulsar/pull/23931 changes. This is being addressed in https://github.com/apache/pulsar/pull/24055. No workarounds currently exist.

### Library updates

- [feat][misc] upgrade oxia java client to 0.5.0 ([#23871](https://github.com/apache/pulsar/pull/23871))
- [fix] Bump org.apache.solr:solr-core from 8.11.3 to 9.8.0 in /pulsar-io/solr ([#23899](https://github.com/apache/pulsar/pull/23899))
- [fix] Use Alpine 3.21 in base image ([#23964](https://github.com/apache/pulsar/pull/23964))
- [fix][build] Upgrade json-smart to 2.5.2 ([#23966](https://github.com/apache/pulsar/pull/23966))
- [improve] Upgrade to Netty 4.1.117.Final ([#23863](https://github.com/apache/pulsar/pull/23863))
- [fix][sec] Upgrade to Netty 4.1.118 to address [CVE-2025-24970](https://github.com/netty/netty/security/advisories/GHSA-4g8c-wm8x-jfhw) ([#23965](https://github.com/apache/pulsar/pull/23965))

### Broker

- [fix][broker] Fix bug in RangeCache where different instance of the key wouldn't ever match ([#23903](https://github.com/apache/pulsar/pull/23903))
- [fix][broker] Apply dispatcherMaxReadSizeBytes also for replay reads for Shared and Key_Shared subscriptions ([#23894](https://github.com/apache/pulsar/pull/23894))
- [fix][broker] Closed topics won't be removed from the cache ([#23884](https://github.com/apache/pulsar/pull/23884))
- [fix][broker] Fix BucketDelayedDeliveryTracker thread safety ([#24014](https://github.com/apache/pulsar/pull/24014))
- [fix][broker] Fix NPE during active consumer is disconnected ([#24008](https://github.com/apache/pulsar/pull/24008))
- [fix][broker] Fix incorrect blockedConsumerOnUnackedMsgs value when maxUnackedMessagesPerConsumer is 1 ([#23796](https://github.com/apache/pulsar/pull/23796))
- [fix][broker] Fix rate limiter token bucket and clock consistency issues causing excessive throttling and connection timeouts ([#23930](https://github.com/apache/pulsar/pull/23930))
- [fix][broker] Fix repeatedly acquired pending reads quota ([#23869](https://github.com/apache/pulsar/pull/23869))
- [fix][broker] Fix seeking by timestamp can be reset the cursor position to earliest ([#23919](https://github.com/apache/pulsar/pull/23919))
- [fix][broker] Geo Replication lost messages or frequently fails due to Deduplication is not appropriate for Geo-Replication ([#23697](https://github.com/apache/pulsar/pull/23697))
- [fix][broker] Make InflightReadsLimiter asynchronous and apply it for replay queue reads ([#23901](https://github.com/apache/pulsar/pull/23901))
- [fix][broker] PIP-322 Fix issue with rate limiters where rates can exceed limits initially and consumption pauses until token balance is positive ([#24012](https://github.com/apache/pulsar/pull/24012))
- [fix][broker] PIP-379 Key_Shared implementation race condition causing out-of-order message delivery ([#23874](https://github.com/apache/pulsar/pull/23874))
- [fix][broker] Skip to persist cursor info if it failed by cursor closed ([#23615](https://github.com/apache/pulsar/pull/23615))
- [fix][broker] fix broker identifying incorrect stuck topic ([#24006](https://github.com/apache/pulsar/pull/24006))
- [fix][broker] fix broker may lost rack information ([#23331](https://github.com/apache/pulsar/pull/23331))
- [fix][meta] Fix ephemeral Zookeeper put which creates a persistent znode ([#23984](https://github.com/apache/pulsar/pull/23984))
- [fix][meta] Fix ephemeral handling of ZK nodes and fix MockZooKeeper ephemeral and ZK stat handling ([#23988](https://github.com/apache/pulsar/pull/23988))
- [fix][ml] Fix cursor metadata compatability issue when switching the config unackedRangesOpenCacheSetEnabled ([#23759](https://github.com/apache/pulsar/pull/23759))
- [fix][ml] Fix deadlock in PendingReadsManager ([#23958](https://github.com/apache/pulsar/pull/23958))
- [fix][ml] Fix memory leak due to duplicated RangeCache value retain operations  ([#23955](https://github.com/apache/pulsar/pull/23955))
- [fix][ml] Fix memory leaks in ManagedCursorInfo and ManagedLedgerInfo decompression and compression ([#23960](https://github.com/apache/pulsar/pull/23960))
- [fix][ml] incorrect non-durable cursor's backlog due to concurrently trimming ledger and non-durable cursor creation ([#23951](https://github.com/apache/pulsar/pull/23951))
- [improve][broker] Avoid PersistentReplicator.expireMessages logic compute backlog twice ([#23957](https://github.com/apache/pulsar/pull/23957))
- [improve][broker] Avoid logging errors when there is a connection issue during subscription. ([#23939](https://github.com/apache/pulsar/pull/23939))
- [improve][broker] Avoid printing log for IncompatibleSchemaException in ServerCnx ([#23938](https://github.com/apache/pulsar/pull/23938))
- [improve][broker] Do not print error logs for NotFound or Conflict errors when using the Admin API ([#23928](https://github.com/apache/pulsar/pull/23928))
- [improve][broker] Don't print error logs for ProducerBusyException ([#23929](https://github.com/apache/pulsar/pull/23929))
- [improve][broker] Fix non-persistent system topic schema compatibility ([#23286](https://github.com/apache/pulsar/pull/23286))
- [improve][broker] Improve Consumer.equals performance ([#23864](https://github.com/apache/pulsar/pull/23864))
- [improve][broker] Make the estimated entry size more accurate ([#23931](https://github.com/apache/pulsar/pull/23931))
- [improve][broker] Refactor a private method to eliminate an unnecessary parameter ([#23915](https://github.com/apache/pulsar/pull/23915))
- [improve][broker] Remove spamming logs for customized managed ledger ([#23862](https://github.com/apache/pulsar/pull/23862))
- [improve][broker] Support values up to 2^32 in ConcurrentBitmapSortedLongPairSet ([#23878](https://github.com/apache/pulsar/pull/23878))
- [improve][meta] Simplify getting parent path in ZKMetadataStore without using java.io.File ([#23996](https://github.com/apache/pulsar/pull/23996))
- [improve][ml] Use lock-free queue in InflightReadsLimiter since there's no concurrent access  ([#23962](https://github.com/apache/pulsar/pull/23962))

### Client

- [feat][client] Support forward proxy for the ZTS server in pulsar-client-auth-athenz ([#23947](https://github.com/apache/pulsar/pull/23947))
- [fix] Avoid NPE when closing an uninitialized SameAuthParamsLookupAutoClusterFailover ([#23911](https://github.com/apache/pulsar/pull/23911))
- [fix] Initialize UrlServiceProvider before trying to use transaction coordinator ([#23914](https://github.com/apache/pulsar/pull/23914))
- [fix][client] Fix LoadManagerReport not found ([#23886](https://github.com/apache/pulsar/pull/23886))
- [fix][client] Fix memory leak in ClientCnx.newLookup when there's TooManyRequestsException ([#23971](https://github.com/apache/pulsar/pull/23971))
- [fix][client] Fix memory leak when message size exceeds max message size and batching is enabled ([#23967](https://github.com/apache/pulsar/pull/23967))
- [fix][client] call redeliver 1 msg but did 2 msgs ([#23943](https://github.com/apache/pulsar/pull/23943))
- [fix][client] fix retry topic with exclusive mode. ([#23859](https://github.com/apache/pulsar/pull/23859))
- [improve][client] Avoid logging errors for retriable errors when creating producer ([#23935](https://github.com/apache/pulsar/pull/23935))
- [improve][client] Update TypedMessageBuilder deliverAfter and deliverAt api comment ([#23969](https://github.com/apache/pulsar/pull/23969))
- [improve][cli] Support additional msg metadata for V1 topic on peek message cmd ([#23978](https://github.com/apache/pulsar/pull/23978))

### Pulsar IO and Pulsar Functions

- [fix][io] Fix pulsar-io:pom not found ([#23979](https://github.com/apache/pulsar/pull/23979))
- [improve][fn] Set default tenant and namespace for ListFunctions cmd ([#23881](https://github.com/apache/pulsar/pull/23881))
- [improve][io] Allow skipping connector deployment ([#23932](https://github.com/apache/pulsar/pull/23932))

### Others

- [fix] fix for code scanning alert no. 48: Uncontrolled data used in path expression ([#23985](https://github.com/apache/pulsar/pull/23985))
- [fix][build] Use amazoncorretto:21-alpine3.20 JDK build for Alpine 3.20 ([#23898](https://github.com/apache/pulsar/pull/23898))
- [fix][build] Add develops for buildtools ([#23992](https://github.com/apache/pulsar/pull/23992))
- [improve][proxy] Make keep-alive interval configurable in Pulsar Proxy ([#23981](https://github.com/apache/pulsar/pull/23981))

### Tests & CI

- [fix][test] Fix flaky DelayedDeliveryTest.testEnableTopicDelayedDelivery ([#23893](https://github.com/apache/pulsar/pull/23893))
- [fix][test] Fix flaky test MetadataStoreTest.emptyStoreTest ([#23998](https://github.com/apache/pulsar/pull/23998))
- [fix][test] Fix flaky test OneWayReplicatorUsingGlobalZKTest.testConfigReplicationStartAt ([#24011](https://github.com/apache/pulsar/pull/24011))
- [fix][test] Fix quiet time implementation in BrokerTestUtil.receiveMessages ([#23876](https://github.com/apache/pulsar/pull/23876))
- [fix][test] fix flaky testNegativeAcksWithBackoff when batch enabled. ([#23986](https://github.com/apache/pulsar/pull/23986))
- [fix][test]Fix flaky test V1_ProducerConsumerTest.testConcurrentConsumerReceiveWhileReconnect ([#24019](https://github.com/apache/pulsar/pull/24019))
- [improve][test] Add solution to PulsarMockBookKeeper for intercepting reads ([#23875](https://github.com/apache/pulsar/pull/23875))
- [improve][test] Support decorating topic, subscription, dispatcher, ManagedLedger and ManagedCursors instances in tests ([#23892](https://github.com/apache/pulsar/pull/23892))
- [improve][test] Upgrade Testcontainers to 1.20.4 and docker-java to 3.4.0 ([#24003](https://github.com/apache/pulsar/pull/24003))
- [fix][ci] Configure Docker data-root to /mnt/docker to avoid running out of disk space ([#23909](https://github.com/apache/pulsar/pull/23909))
- [improve][ci] Increase Maven max heap size to 2048M and tune GCLockerRetryAllocationCount ([#23883](https://github.com/apache/pulsar/pull/23883))
- [improve][ci] Skip "OWASP dependency check" when data wasn't found in cache ([#23970](https://github.com/apache/pulsar/pull/23970))
- [improve][ci] Upgrade Gradle Develocity Maven Extension to 1.23.1 ([#24004](https://github.com/apache/pulsar/pull/24004))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.2...v4.0.3).
