---
id: pulsar-4.0.11
title: Apache Pulsar 4.0.11
sidebar_label: Apache Pulsar 4.0.11
---

#### 2026-06-08

### Library updates

- [fix][sec][branch-4.0] Upgrade avro to 1.11.5 to address CVE-2025-33042 ([#25788](https://github.com/apache/pulsar/pull/25788))
- [fix][sec] Bump org.asynchttpclient:async-http-client from 2.14.5 to 2.15.0 ([#25818](https://github.com/apache/pulsar/pull/25818))
- [fix][sec] Upgrade commons-configuration2 to 2.15.0 to address CVE-2026-45205 ([#25844](https://github.com/apache/pulsar/pull/25844))
- [fix][sec] Upgrade Netty to 4.1.133.Final to address CVEs ([#25670](https://github.com/apache/pulsar/pull/25670))
- [improve][misc] Upgrade Netty to 4.1.134 ([#25870](https://github.com/apache/pulsar/pull/25870))
- [fix][sec] Upgrade Netty to 4.1.135.Final to address several CVEs ([#25918](https://github.com/apache/pulsar/pull/25918))
- [fix][sec] Upgrade thrift to 0.23.0 to address CVE-2026-43869 ([#25744](https://github.com/apache/pulsar/pull/25744))
- [fix][sec] Upgrade vert.x to 4.5.25 to address CVE-2026-6860 ([#25737](https://github.com/apache/pulsar/pull/25737))
- [fix][sec] Upgrade vertx to 4.5.27 to address CVE-2026-6860 ([#25745](https://github.com/apache/pulsar/pull/25745))
- [improve][misc] Upgrade vert.x to 4.5.28 ([#25924](https://github.com/apache/pulsar/pull/25924))
- [improve][build] Remove kotlin-stdlib override; upgrade okhttp3 5.3.2 and okio 3.17.0 ([#25855](https://github.com/apache/pulsar/pull/25855))
- [improve][build] Upgrade org.apache.kerby:kerb-simplekdc from 1.1.1 to 2.1.1 ([#25785](https://github.com/apache/pulsar/pull/25785))
- [improve][misc] Upgrade Jetty to 12.1.9 ([#25752](https://github.com/apache/pulsar/pull/25752))
- [improve][misc] Upgrade Jetty to 12.1.10 ([#25943](https://github.com/apache/pulsar/pull/25943))

### Broker

- [fix][broker] Clean up orphan ledger on concurrent initial schema creation in BookkeeperSchemaStorage ([#25514](https://github.com/apache/pulsar/pull/25514))
- [fix][broker] Close pending acks cleanup gap in BacklogQuotaManager ([#25624](https://github.com/apache/pulsar/pull/25624))
- [fix][broker] ConcurrentLongHashMap throw ArrayIndexOutOfBoundsException ([#25644](https://github.com/apache/pulsar/pull/25644))
- [fix][broker] Correct two race conditions in the tracker code and logic bug in InMemoryDelayedDeliveryTracker that failed with NoSuchElementException ([#25681](https://github.com/apache/pulsar/pull/25681))
- [fix][broker] Decrement unacked counter when removeAllUpTo removes pending acks ([#25581](https://github.com/apache/pulsar/pull/25581))
- [fix][broker] Fix compaction cursor reset may lose mark-delete properties ([#25862](https://github.com/apache/pulsar/pull/25862))
- [fix][broker] Fix ManagedLedgerImpl.advanceCursorsIfNecessary() method may lose non-durable cursor properties in race condition ([#25796](https://github.com/apache/pulsar/pull/25796))
- [fix][broker] Fix non-batched null-value messages not removed during topic compaction ([#25817](https://github.com/apache/pulsar/pull/25817))
- [fix][broker] Fix PersistentMessageExpiryMonitor findEntryComplete() method may lose mark-delete properties in race condition ([#25803](https://github.com/apache/pulsar/pull/25803))
- [fix][broker] Fix precision loss in DataSketchesSummaryLogger by replacing LongAdder with DoubleAdder for sum accumulation ([#25594](https://github.com/apache/pulsar/pull/25594))
- [fix][broker] Fix PulsarService.closeAsync where Condition.signalAll was called without holding a lock ([#25777](https://github.com/apache/pulsar/pull/25777))
- [fix][broker] Fix race in pending acks removal in redeliverUnacknowledgedMessages ([#25589](https://github.com/apache/pulsar/pull/25589))
- [fix][broker] Fix stuck chunks in SharedConsumerAssignor permit tracking ([#25620](https://github.com/apache/pulsar/pull/25620))
- [fix][broker] Merge broker offload extra configurations ([#25736](https://github.com/apache/pulsar/pull/25736))
- [fix][broker] Move pending acks cleanup to selected mark-delete callbacks ([#25592](https://github.com/apache/pulsar/pull/25592))
- [fix][broker] Race condition causes perpetual backlog on internal topics ([#25572](https://github.com/apache/pulsar/pull/25572))
- [fix][broker] Skip backlog-quota eviction on fenced/closing topics ([#25684](https://github.com/apache/pulsar/pull/25684))
- [fix][broker] Use effective offload policies for extra configs ([#25781](https://github.com/apache/pulsar/pull/25781))
- [fix][broker] Wait for orphan schema ledger cleanup before retry ([#25579](https://github.com/apache/pulsar/pull/25579))
- [fix][broker][fix][broker]Replication stats is empty when the cluster is the target cluster of a one-way replication ([#25583](https://github.com/apache/pulsar/pull/25583))
- [fix][broker]Replication is stuck because failed to read entries ([#25625](https://github.com/apache/pulsar/pull/25625))
- [fix][bk] Fix NPE in IsolatedBookieEnsemblePlacementPolicy when policy class does not match ([#25825](https://github.com/apache/pulsar/pull/25825))
- [fix][meta] Fix PulsarZooKeeperClient async addWatch callback retry behavior ([#25913](https://github.com/apache/pulsar/pull/25913))
- [fix][meta] Fix ZooKeeper session reconnect race condition in PulsarZooKeeperClient.clientCreator ([#25910](https://github.com/apache/pulsar/pull/25910))
- [improve][broker] optimize namespaceBundle validation to fix single-thread 100% CPU during unloading entire namespaces ([#25626](https://github.com/apache/pulsar/pull/25626))
- [improve][broker] PIP-380: Support-setting-up-specific-namespaces-to-skipping-the-load-shedding ([#23549](https://github.com/apache/pulsar/pull/23549))
- [improve][broker] Prevent stale replicator pending reads after termination ([#25767](https://github.com/apache/pulsar/pull/25767))
- [improve][offload] Coalesce automatic offload triggers to reduce retry loops and ledger scans ([#25793](https://github.com/apache/pulsar/pull/25793))

### Client

- [fix][client] Apply Avro logical type conversions when decoding schema without classloader ([#25759](https://github.com/apache/pulsar/pull/25759))
- [fix][client] Clean up unacked messages when unsubscribing a topic with ack timeout backoff ([#25916](https://github.com/apache/pulsar/pull/25916))
- [fix][client] Fix failed to close consumer because of the error: param memorySize is a negative value ([#25805](https://github.com/apache/pulsar/pull/25805))
- [fix][client] Fix stale Healthy state in SameAuthParamsLookupAutoClusterFailover causing flaky test ([#25388](https://github.com/apache/pulsar/pull/25388))
- [fix][client] Make ClientBuilder serializable ([#25730](https://github.com/apache/pulsar/pull/25730)) ([#25740](https://github.com/apache/pulsar/pull/25740))
- [fix][client] Match logical topic when removing unacked messages ([#25921](https://github.com/apache/pulsar/pull/25921))
- [fix][client] Preserve equals in FieldParser map values ([#25907](https://github.com/apache/pulsar/pull/25907))
- [fix][client] Prevent duplicate ServiceUrlProvider initialization ([#25899](https://github.com/apache/pulsar/pull/25899))
- [fix][client] Reset higher-index states on recovery in SameAuthParamsLookupAutoClusterFailover ([#25826](https://github.com/apache/pulsar/pull/25826))
- [fix][client] Stabilize scaleReceiverQueueHint against concurrent enqueue/take ([#25578](https://github.com/apache/pulsar/pull/25578))
- [fix][client]Broker-side producer handle leak if closes a producer which state is regitering schema ([#25725](https://github.com/apache/pulsar/pull/25725))
- [improve][client] Best-effort retry for individual/batch-index acks on send failure when ackReceiptEnabled=false ([#25525](https://github.com/apache/pulsar/pull/25525))
- [improve][client] Clean up unacked message tracker when topics are removed in multi-topic consumers ([#25923](https://github.com/apache/pulsar/pull/25923))
- [improve][client] Enable configurable preemptive OAuth2 token refresh ([#25363](https://github.com/apache/pulsar/pull/25363))
- [improve][client] Implement tls_client_auth for AuthenticationOAuth2 ([#25538](https://github.com/apache/pulsar/pull/25538))
- [improve][client] In cases where there is a risk of message loss, adjust the log level to error ([#25854](https://github.com/apache/pulsar/pull/25854))

### Pulsar IO and Pulsar Functions

- [fix][fn] Fix functions update issue where artifact is provided as a http url ([#25840](https://github.com/apache/pulsar/pull/25840))
- [fix][fn] Fix Go function runtime to continue after user exceptions and add neg-ack tests ([#25867](https://github.com/apache/pulsar/pull/25867))
- [fix][fn] Fix orphan exclusive producer on creation timeout in WorkerUtils.createExclusiveProducerWithRetry ([#25942](https://github.com/apache/pulsar/pull/25942))
- [improve][fn] Avoid gRPC timeout when getting status of a dead process runtime ([#25819](https://github.com/apache/pulsar/pull/25819))
- [improve][fn] make built-in connector reload incremental ([#25773](https://github.com/apache/pulsar/pull/25773))
- [improve][fn] make built-in functions reload incremental ([#25868](https://github.com/apache/pulsar/pull/25868))
- [refactor][fn] Use Map instead of TreeMap for connector/function API types ([#25790](https://github.com/apache/pulsar/pull/25790))
- [improve][functions] Allow customizing Kubernetes service domain suffix in Function Worker ([#25872](https://github.com/apache/pulsar/pull/25872))

### Others

- [improve][proxy][branch-4.0] Restore AdminProxyHandler changes which were accidentially reverted in Jetty 12 upgrade
- [fix][proxy] Avoid intermittent 502 when admin proxy follows a broker redirect for a request with a body ([#25919](https://github.com/apache/pulsar/pull/25919))
- [fix][proxy] Close channel on connection failure ([#25770](https://github.com/apache/pulsar/pull/25770))

### Tests & CI

- [fix][test] Add timeout to initial receives in ResendRequestTest.testSharedSingleAckedPartitionedTopic ([#25828](https://github.com/apache/pulsar/pull/25828))
- [fix][test] Fix flaky ExtensibleLoadManagerImplTest.testLoadBalancerServiceUnitTableViewSyncer ([#25596](https://github.com/apache/pulsar/pull/25596))
- [fix][test] Fix flaky MessagePublishBufferThrottleTest.testBlockByPublishRateLimiting ([#25365](https://github.com/apache/pulsar/pull/25365))
- [fix][test] Fix flaky OneWayReplicatorDeduplicationTest.testDeduplication ([#25679](https://github.com/apache/pulsar/pull/25679))
- [fix][test] Fix flaky ProducerCleanupTest timer cleanup ([#25864](https://github.com/apache/pulsar/pull/25864))
- [fix][test] Fix flaky PulsarFunctionTlsTest.testFunctionsCreation() test ([#25889](https://github.com/apache/pulsar/pull/25889))
- [fix][test] Fix flaky ResendRequestTest.testSharedSingleAckedPartitionedTopic() test ([#25852](https://github.com/apache/pulsar/pull/25852))
- [fix][test] Fix flaky SameAuthParamsLookupAutoClusterFailoverTest.testAutoClusterFailover() test ([#25892](https://github.com/apache/pulsar/pull/25892))
- [fix][test] Fix flaky testGetExcludedBookiesWithIsolationGroups ([#25640](https://github.com/apache/pulsar/pull/25640))
- [fix][test] Fix flaky testMsgDropStat in NonPersistentTopicTest ([#25426](https://github.com/apache/pulsar/pull/25426))
- [fix][test] Make NamespacesTest.cleanupAfterMethod tolerant of transient infra failures ([#25641](https://github.com/apache/pulsar/pull/25641))
- [fix][test] Reduce flakiness in testLoadBalancerServiceUnitTableViewSyncer ([#25638](https://github.com/apache/pulsar/pull/25638))
- [fix][test] Reduce flakiness in testLoadBalancerServiceUnitTableViewSyncer ([#25638](https://github.com/apache/pulsar/pull/25638))
- [fix][test] Stabilize testSecondaryIsolationGroupsBookiesNegative() test ([#25900](https://github.com/apache/pulsar/pull/25900))
- [fix][build][branch-4.0] Fix issue in backporting PR [#25644](https://github.com/apache/pulsar/pull/25644)
- [fix][test] Fix compile error in OffloadPoliciesTest
- [fix][test][branch-4.0] Fix AvroSchemaTest cases that were invalid
- [fix][test][branch-4.0] Fix PersistentMessageExpiryMonitorTest
- [fix][test][branch-4.0] Fix PulsarFunctionTlsTest

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.10...v4.0.11).
