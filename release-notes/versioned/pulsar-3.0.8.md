---
id: pulsar-3.0.8
title: Apache Pulsar 3.0.8
sidebar_label: Apache Pulsar 3.0.8
---

#### 2024-12-02

### Library updates

- [fix][sec] Upgrade Zookeeper to 3.9.3 to address CVE-2024-51504 ([#23581](https://github.com/apache/pulsar/pull/23581))
- [fix][sec] Upgrade to Netty 4.1.115.Final to address CVE-2024-47535 ([#23596](https://github.com/apache/pulsar/pull/23596))
- [improve][misc] Upgrade Jetty to 9.4.56.v20240826 ([#23405](https://github.com/apache/pulsar/pull/23405))

### Broker

- [fix][broker] Avoid orphan ledgers in BucketDelayedDeliveryTracker ([#22802](https://github.com/apache/pulsar/pull/22802))
- [fix][broker] Broker is failing to create non-durable sub if topic is fenced ([#23579](https://github.com/apache/pulsar/pull/23579))
- [fix][broker] Continue closing even when executor is shut down ([#22599](https://github.com/apache/pulsar/pull/22599))
- [fix][broker] Fix AvgShedder strategy check ([#23156](https://github.com/apache/pulsar/pull/23156))
- [fix][broker] Fix currently client retries until operation timeout if the topic does not exist ([#23530](https://github.com/apache/pulsar/pull/23530))
- [fix][broker] Fix failed TokenAuthenticatedProducerConsumerTest ([#23602](https://github.com/apache/pulsar/pull/23602))
- [fix][broker] Fix ownership loss ([#23515](https://github.com/apache/pulsar/pull/23515))
- [fix][broker] Fix race-condition causing repeated delete topic ([#23522](https://github.com/apache/pulsar/pull/23522))
- [fix][broker] Increase readBuffer size for bookkeeper.DLOutputStream ([#23548](https://github.com/apache/pulsar/pull/23548))
- [fix][broker] Topics failed to delete after remove cluster from replicated clusters set and caused OOM ([#23360](https://github.com/apache/pulsar/pull/23360))
- [fix][broker] fix null lookup result when brokers are starting ([#23642](https://github.com/apache/pulsar/pull/23642))
- [fix][broker] normalize path ([#23438](https://github.com/apache/pulsar/pull/23438))
- [improve][broker] Add log to track issue when `handleGetTopicsOfNamespace` ([#23434](https://github.com/apache/pulsar/pull/23434))
- [improve][broker] Close TopicPoliciesService to allow Pulsar broker graceful shutdown ([#22589](https://github.com/apache/pulsar/pull/22589))
- [improve][broker] Decouple pulsar_storage_backlog_age_seconds metric with backlogQuota check ([#23619](https://github.com/apache/pulsar/pull/23619))
- [improve][broker] Don't use forkjoin pool by default for deleting partitioned topics ([#22598](https://github.com/apache/pulsar/pull/22598))
- [improve][broker] Exclude system topics from namespace level publish and dispatch rate limiting ([#23589](https://github.com/apache/pulsar/pull/23589))
- [improve][broker] Make cluster metadata init command support metadata config path ([#23269](https://github.com/apache/pulsar/pull/23269))
- [improve][broker] Make cluster metadata teardown command support metadata config path ([#23520](https://github.com/apache/pulsar/pull/23520))
- [improve][broker] PIP-392: Add configuration to enable consistent hashing to select active consumer for partitioned topic ([#23584](https://github.com/apache/pulsar/pull/23584))
- [improve][broker] Support cleanup `replication cluster` and `allowed cluster` when cluster metadata teardown ([#23561](https://github.com/apache/pulsar/pull/23561))
- [improve][broker] replace HashMap with inner implementation ConcurrentLongLongPairHashMap in Negative Ack Tracker. ([#23582](https://github.com/apache/pulsar/pull/23582))

### Client

- [fix][admin] Fix lookup get a null result if uses proxy ([#23556](https://github.com/apache/pulsar/pull/23556))
- [fix][client] Fix Reader.hasMessageAvailable return wrong value after seeking by timestamp with startMessageIdInclusive ([#23502](https://github.com/apache/pulsar/pull/23502))
- [fix][client] Fix deadlock of NegativeAcksTracker ([#23651](https://github.com/apache/pulsar/pull/23651))
- [fix][client] Fix producer/consumer stop to reconnect or Pub/Sub due to IO thread race-condition  ([#23499](https://github.com/apache/pulsar/pull/23499))
- [fix][client] Fix race-condition causing doReconsumeLater to hang when creating retryLetterProducer has failed ([#23560](https://github.com/apache/pulsar/pull/23560))
- [fix][client] Fix the javadoc for ConsumerBuilder.isAckReceiptEnabled ([#23452](https://github.com/apache/pulsar/pull/23452))
- [fix][client] Fixed an issue where a cert chain could not be used in TLS authentication ([#23644](https://github.com/apache/pulsar/pull/23644))
- [fix][client] Initializing client-authentication using configured auth params ([#23610](https://github.com/apache/pulsar/pull/23610))
- [fix][client] Make protobuf-java dependency optional in java client libraries ([#23632](https://github.com/apache/pulsar/pull/23632))
- [fix][client] Prevent embedding protobuf-java class files in pulsar-client-admin and pulsar-client-all ([#23468](https://github.com/apache/pulsar/pull/23468))
- [fix][client] The partitionedProducer maxPendingMessages always is 0 ([#23593](https://github.com/apache/pulsar/pull/23593))
- [fix][client] Use dedicated executor for requests in BinaryProtoLookupService ([#23378](https://github.com/apache/pulsar/pull/23378)) ([#23461](https://github.com/apache/pulsar/pull/23461))
- [fix][client] fix incomingMessageSize and client memory usage is negative ([#23624](https://github.com/apache/pulsar/pull/23624))
- [fix][client] fix the beforeConsume() method earlier hit with message listener ([#23578](https://github.com/apache/pulsar/pull/23578))
- [improve][admin] Print error log if handle http response fails ([#23563](https://github.com/apache/pulsar/pull/23563))
- [improve][client] Enhance error handling for non-exist subscription in consumer creation ([#23254](https://github.com/apache/pulsar/pull/23254))
- [improve][client] Increase default Java client connectionMaxIdleSeconds to 60 seconds ([#23430](https://github.com/apache/pulsar/pull/23430))
- [improve][client] Reduce unshaded dependencies and shading warnings in shaded Java client modules ([#23647](https://github.com/apache/pulsar/pull/23647))

### Pulsar IO and Pulsar Functions

- [fix][fn] ack messages for window function when its result is null ([#23618](https://github.com/apache/pulsar/pull/23618))
- [fix][sql][branch-3.0] Fix long decimal compatibility in Trino 368. ([#23419](https://github.com/apache/pulsar/pull/23419))
- [fix][sql][branch-3.0] Fix shading configuration for presto-pulsar
- [improve][io] Support update subscription position for sink connector ([#23538](https://github.com/apache/pulsar/pull/23538))
- [improve][io] Upgrade Spring version to 6.1.13 in IO Connectors ([#23459](https://github.com/apache/pulsar/pull/23459))

### Others

- [fix] Restored method as deprecated in AbstractMetadataStore ([#21950](https://github.com/apache/pulsar/pull/21950))
- [fix][misc] Class conflict during jetcd-core-shaded shading process ([#23641](https://github.com/apache/pulsar/pull/23641))
- [fix][misc] Unable to connect an etcd metastore with recent releases due to jetc-core sharding problem ([#23604](https://github.com/apache/pulsar/pull/23604))
- [fix][ml] Managed ledger should recover after open ledger failed ([#23368](https://github.com/apache/pulsar/pull/23368))
- [fix][proxy] Fix pattern consumer does not work when using Proxy ([#23489](https://github.com/apache/pulsar/pull/23489))
- [fix][standalone] correctly delete bookie registration znode ([#23497](https://github.com/apache/pulsar/pull/23497))
- [improve] Improve logic for enabling Netty leak detection ([#23613](https://github.com/apache/pulsar/pull/23613))
- [improve] Use single buffer for metrics when noUnsafe use ([#23612](https://github.com/apache/pulsar/pull/23612))
- [fix][ws] Implement missing http header data functions in AuthenticationDataSubscription ([#23638](https://github.com/apache/pulsar/pull/23638))
- [improve][ml] Avoid repetitive nested lock for isMessageDeleted in ManagedCursorImpl ([#23609](https://github.com/apache/pulsar/pull/23609))
- [improve][offload] Use filesystemURI as the storage path ([#23591](https://github.com/apache/pulsar/pull/23591))
- Enabling DNS retryOnTimeout with TCP in DnsNameResolver ([#23590](https://github.com/apache/pulsar/pull/23590))

### Tests & CI

- [cleanup][build] skip generating pom.xml.versionsBackup ([#23639](https://github.com/apache/pulsar/pull/23639))
- [fix][build] Add basic support for vscode-java and Eclipse IDE ([#23448](https://github.com/apache/pulsar/pull/23448))
- [fix][build] Fix error "Element encoding is not allowed here" in pom.xml ([#23655](https://github.com/apache/pulsar/pull/23655))
- [fix][test] Address flaky GetPartitionMetadataMultiBrokerTest ([#23456](https://github.com/apache/pulsar/pull/23456))
- [fix][test] Fix DeadLetterTopicTest.testDeadLetterTopicWithInitialSubscriptionAndMultiConsumers ([#23552](https://github.com/apache/pulsar/pull/23552))
- [fix][test] Fix SimpleProducerConsumerTest.testMultiTopicsConsumerImplPauseForManualSubscription ([#23546](https://github.com/apache/pulsar/pull/23546))
- [fix][test] Fix flaky GetPartitionMetadataMultiBrokerTest.testCompatibilityDifferentBrokersForNonPersistentTopic ([#23259](https://github.com/apache/pulsar/pull/23259))
- [fix][test] Fix flaky test ManagedLedgerTest.testDeleteCurrentLedgerWhenItIsClosed ([#23437](https://github.com/apache/pulsar/pull/23437))
- [fix][test][branch-3.0] Fix PrecisTopicPublishRateThrottleTest that broke after [#23589](https://github.com/apache/pulsar/pull/23589) changes
- [fix][test][branch-3.0] Fix cherry-picking issue in 2f6c1a3 where Cleanup import was missing
- [improve][build] Require Java 17 for building Pulsar branch-3.0 ([#22875](https://github.com/apache/pulsar/pull/22875))
- [improve][build] Update maven-wrapper (mvnw) to recent stable version 3.3.2 ([#23410](https://github.com/apache/pulsar/pull/23410))
- [improve][build][branch-3.0] Upgrade docker-maven-plugin to 0.45.1
- [improve][test] Added message properties tests for batch and non-batch messages ([#23473](https://github.com/apache/pulsar/pull/23473))
- [improve][test] Reduce OneWayReplicatorUsingGlobalZKTest.testRemoveCluster execution time ([#23633](https://github.com/apache/pulsar/pull/23633))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.7...v3.0.8).