---
id: pulsar-3.0.10
title: Apache Pulsar 3.0.10
sidebar_label: Apache Pulsar 3.0.10
---

#### 2025-02-27

### Library updates

- [improve] Upgrade to Netty 4.1.117.Final ([#23863](https://github.com/apache/pulsar/pull/23863))
- [fix][sec] Upgrade to Netty 4.1.118 to address [CVE-2025-24970](https://github.com/netty/netty/security/advisories/GHSA-4g8c-wm8x-jfhw) ([#23965](https://github.com/apache/pulsar/pull/23965))
- [fix] Bump org.apache.solr:solr-core from 8.11.3 to 9.8.0 in /pulsar-io/solr ([#23899](https://github.com/apache/pulsar/pull/23899))
- [fix][build] Upgrade json-smart to 2.5.2 ([#23966](https://github.com/apache/pulsar/pull/23966))

### Broker

- [fix][broker] Fix bug in RangeCache where different instance of the key wouldn't ever match ([#23903](https://github.com/apache/pulsar/pull/23903))
- [fix][broker] Closed topics won't be removed from the cache ([#23884](https://github.com/apache/pulsar/pull/23884))
- [fix][broker] Continue using the next provider for http authentication if one fails ([#23842](https://github.com/apache/pulsar/pull/23842))
- [fix][broker] Fix acknowledgeCumulativeAsync block when ackReceipt is enabled ([#23841](https://github.com/apache/pulsar/pull/23841))
- [fix][broker] Fix incorrect blockedConsumerOnUnackedMsgs value when maxUnackedMessagesPerConsumer is 1 ([#23796](https://github.com/apache/pulsar/pull/23796))
- [fix][broker] Fix possible mark delete NPE when batch index ack is enabled ([#23833](https://github.com/apache/pulsar/pull/23833))
- [fix][broker] Fix repeatedly acquired pending reads quota ([#23869](https://github.com/apache/pulsar/pull/23869))
- [fix][broker] Fix the retry mechanism in `MetadataCache#readModifyUpdateOrCreate` ([#23686](https://github.com/apache/pulsar/pull/23686))
- [fix][broker] Make InflightReadsLimiter asynchronous and apply it for replay queue reads ([#23901](https://github.com/apache/pulsar/pull/23901))
- [fix][broker] PIP-399: Fix Metric Name for Delayed Queue ([#23712](https://github.com/apache/pulsar/pull/23712))
- [fix][broker] Remove blocking calls from internalGetPartitionedStats ([#23832](https://github.com/apache/pulsar/pull/23832))
- [fix][broker] Revert "[fix][broker] Cancel possible pending replay read in cancelPendingRead ([#23384](https://github.com/apache/pulsar/pull/23384))" ([#23855](https://github.com/apache/pulsar/pull/23855))
- [fix][broker] Support large number of unack message store for cursor recovery ([#9292](https://github.com/apache/pulsar/pull/9292))
- [fix][broker] fix broker may lost rack information ([#23331](https://github.com/apache/pulsar/pull/23331))
- [cleanup][admin] Do not print full stacktrace when get partitioned metadata not found ([#20979](https://github.com/apache/pulsar/pull/20979))
- [fix][meta] Fix ephemeral Zookeeper put which creates a persistent znode ([#23984](https://github.com/apache/pulsar/pull/23984))
- [fix][meta] Fix ephemeral handling of ZK nodes and fix MockZooKeeper ephemeral and ZK stat handling ([#23988](https://github.com/apache/pulsar/pull/23988))
- [fix][misc] Honor dynamic log levels in log4j2.yaml ([#23847](https://github.com/apache/pulsar/pull/23847))
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
- [improve][broker] Improve Consumer.equals performance ([#23864](https://github.com/apache/pulsar/pull/23864))
- [improve][broker] Reduce unnecessary REPLICATED_SUBSCRIPTION_SNAPSHOT_REQUEST ([#23839](https://github.com/apache/pulsar/pull/23839))
- [improve][broker] Remove spamming logs for customized managed ledger ([#23862](https://github.com/apache/pulsar/pull/23862))
- [improve][broker] Support values up to 2^32 in ConcurrentBitmapSortedLongPairSet ([#23878](https://github.com/apache/pulsar/pull/23878))
- [improve][meta] Simplify getting parent path in ZKMetadataStore without using java.io.File ([#23996](https://github.com/apache/pulsar/pull/23996))

### Client

- [feat][client] Support forward proxy for the ZTS server in pulsar-client-auth-athenz ([#23947](https://github.com/apache/pulsar/pull/23947))
- [fix] Avoid NPE when closing an uninitialized SameAuthParamsLookupAutoClusterFailover ([#23911](https://github.com/apache/pulsar/pull/23911))
- [fix] Initialize UrlServiceProvider before trying to use transaction coordinator ([#23914](https://github.com/apache/pulsar/pull/23914))
- [fix][client] Fix LoadManagerReport not found ([#23886](https://github.com/apache/pulsar/pull/23886))
- [fix][client] Fix memory leak in ClientCnx.newLookup when there's TooManyRequestsException ([#23971](https://github.com/apache/pulsar/pull/23971))
- [fix][client] Fix memory leak when message size exceeds max message size and batching is enabled ([#23967](https://github.com/apache/pulsar/pull/23967))
- [fix][client] Orphan producer when concurrently calling producer closing and reconnection ([#23853](https://github.com/apache/pulsar/pull/23853))
- [fix][client] call redeliver 1 msg but did 2 msgs ([#23943](https://github.com/apache/pulsar/pull/23943))
- [fix][client] fix retry topic with exclusive mode. ([#23859](https://github.com/apache/pulsar/pull/23859))
- [improve][client] Avoid logging errors for retriable errors when creating producer [#23935](https://github.com/apache/pulsar/pull/23935)

### Pulsar IO and Pulsar Functions

- [fix][io] Fix pulsar-io:pom not found ([#23979](https://github.com/apache/pulsar/pull/23979))
- [improve] Validate user paths in Functions utils ([#22833](https://github.com/apache/pulsar/pull/22833))
- [improve][io] Allow skipping connector deployment ([#23932](https://github.com/apache/pulsar/pull/23932))

### Others

- [improve][proxy] Make keep-alive interval configurable in Pulsar Proxy ([#23981](https://github.com/apache/pulsar/pull/23981))
- [fix] fix for code scanning alert no. 48: Uncontrolled data used in path expression ([#23985](https://github.com/apache/pulsar/pull/23985))
- [fix][build] Add develops for buildtools ([#23992](https://github.com/apache/pulsar/pull/23992))
- [improve] Support overriding java.net.preferIPv4Stack with OPTS ([#23846](https://github.com/apache/pulsar/pull/23846))

### Tests & CI

- [improve][test] Add solution to PulsarMockBookKeeper for intercepting reads ([#23875](https://github.com/apache/pulsar/pull/23875))
- [fix][test] Add reconsumeLater call in RetryTopicTest#testRetryTopicWithMultiTopic. ([#23857](https://github.com/apache/pulsar/pull/23857))
- [fix][test] Fix flaky DelayedDeliveryTest.testEnableTopicDelayedDelivery ([#23893](https://github.com/apache/pulsar/pull/23893))
- [fix][test] Fix quiet time implementation in BrokerTestUtil.receiveMessages ([#23876](https://github.com/apache/pulsar/pull/23876))
- [fix][test] fix flaky testNegativeAcksWithBackoff when batch enabled. ([#23986](https://github.com/apache/pulsar/pull/23986))
- [fix][test]Fix flaky test testTopicUnloadAfterSessionRebuild ([#23852](https://github.com/apache/pulsar/pull/23852))
- [fix][ci] Configure Docker data-root to /mnt/docker to avoid running out of disk space ([#23909](https://github.com/apache/pulsar/pull/23909))
- [improve][ci] Increase Maven max heap size to 2048M and tune GCLockerRetryAllocationCount ([#23883](https://github.com/apache/pulsar/pull/23883))
- [improve][ci] Publish build scans to develocity.apache.org ([#23851](https://github.com/apache/pulsar/pull/23851))
- [improve][ci] Skip "OWASP dependency check" when data wasn't found in cache ([#23970](https://github.com/apache/pulsar/pull/23970))
- [improve][ci] Update GitHub Workflows to Ubuntu 22.04 ([#20729](https://github.com/apache/pulsar/pull/20729))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.9...v3.0.10).
