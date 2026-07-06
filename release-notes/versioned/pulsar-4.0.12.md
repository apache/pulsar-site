---
id: pulsar-4.0.12
title: Apache Pulsar 4.0.12
sidebar_label: Apache Pulsar 4.0.12
---

#### 2026-07-06

### Backported PIP

- [feat][pip] PIP-469: Legacy-aware topic policies backend routing and metadata-store topic policies ([#25547](https://github.com/apache/pulsar/pull/25547))

### Library updates

- [fix][sec] Bump github.com/go-jose/go-jose/v4 from 4.1.3 to 4.1.4 in /pulsar-function-go ([#26142](https://github.com/apache/pulsar/pull/26142))
- [fix][sec] Upgrade jline to 4.2.1 and picocli to 4.7.7, drop unused jline2 ([#26068](https://github.com/apache/pulsar/pull/26068))
- [fix][sec] Upgrade pulsar-client-go to v0.20.0 in pulsar-function-go, also address CVEs ([#26140](https://github.com/apache/pulsar/pull/26140))
- [fix][sec][branch-4.0] Upgrade Jackson version to 2.18.8 ([#26098](https://github.com/apache/pulsar/pull/26098))
- [improve][fn] Upgrade pulsar-client-python to 3.12.0 ([#26033](https://github.com/apache/pulsar/pull/26033))
- [improve][fn] Upgrade pulsar-client-python to 3.13.0 ([#26139](https://github.com/apache/pulsar/pull/26139))
- [improve][misc] Upgrade Apache Commons libraries and Apache Http components ([#25963](https://github.com/apache/pulsar/pull/25963))
- [fix][build][branch-4.0] Upgrade docker/setup-qemu-action to v4.1.0

### Broker

- [fix][broker] Avoid attaching a consumer to a migrated non-persistent topic on subscribe ([#26075](https://github.com/apache/pulsar/pull/26075))
- [fix][broker] Avoid blocking metadata read on the IO thread when redirecting migrated producers/consumers ([#26051](https://github.com/apache/pulsar/pull/26051))
- [fix][broker] Avoid blocking the bundle-throughput lookup on per-bundle metadata reads ([#26054](https://github.com/apache/pulsar/pull/26054))
- [fix][broker] Avoid blocking the dispatcher close path on delayed-delivery tracker close ([#26053](https://github.com/apache/pulsar/pull/26053))
- [fix][broker] Don't let a closing topic-policies reader abort a concurrent cache-init reload ([#26132](https://github.com/apache/pulsar/pull/26132))
- [fix][broker] Don't let a stuck or aborted topic policies cache init make a namespace's topics unloadable ([#26025](https://github.com/apache/pulsar/pull/26025))
- [fix][broker] Fail fast for load balancer misconfigurations instead of falling back to SimpleLoadManagerImpl ([#26031](https://github.com/apache/pulsar/pull/26031))
- [fix][broker] Fix compacted read could be stuck forever or message loss due to cursor mark delete ([#25998](https://github.com/apache/pulsar/pull/25998))
- [fix][broker] Fix forced topic/namespace deletion hanging or failing when compaction is in progress ([#26016](https://github.com/apache/pulsar/pull/26016))
- [fix][broker] Fix forced topic/namespace deletion still hanging when the compaction reader reconnect stalls ([#26026](https://github.com/apache/pulsar/pull/26026))
- [fix][broker] Fix geo-replication stuck after a failed publish to the remote cluster ([#26002](https://github.com/apache/pulsar/pull/26002))
- [fix][broker] Fix replication stall when a cursor rewind skips an in-flight read ([#26106](https://github.com/apache/pulsar/pull/26106))
- [fix][broker] Fix replicator getting stuck under rate limiter throttling and honor readBatchSize/maxReadSizeBytes on the default read path ([#26005](https://github.com/apache/pulsar/pull/26005))
- [fix][broker] Fix tableview divergence in ServiceUnitStateTableViewSyncer causing flaky tests ([#25946](https://github.com/apache/pulsar/pull/25946))
- [fix][broker] Forward topic policy updates after init failures ([#26110](https://github.com/apache/pulsar/pull/26110))
- [fix][broker] Guard BucketDelayedDeliveryTracker.nextDeliveryTime against empty queues ([#26080](https://github.com/apache/pulsar/pull/26080))
- [fix][broker] Prevent subscribe rate limit from stalling compaction and blocking forced deletion ([#26015](https://github.com/apache/pulsar/pull/26015))
- [fix][broker] Prevent topic policy initialization race with a buffering listener wrapper ([#26044](https://github.com/apache/pulsar/pull/26044))
- [fix][broker] Run the message expiry check off the topic policy update path ([#26040](https://github.com/apache/pulsar/pull/26040))
- [fix][broker] Run topic policy notifications on the topic-ordered executor ([#26042](https://github.com/apache/pulsar/pull/26042))
- [fix][broker]Do not trigger topic GC if replication is still active ([#25915](https://github.com/apache/pulsar/pull/25915))
- [fix][meta] Keep the leader value in the election cycle and make leader reads authoritative ([#26000](https://github.com/apache/pulsar/pull/26000))
- [fix][meta] Run ledger-underreplication notification callbacks off the metadata-store listener thread ([#26065](https://github.com/apache/pulsar/pull/26065))
- [improve][broker] Improve dispatch performance by summing entry bytes with a loop ([#26055](https://github.com/apache/pulsar/pull/26055))
- [improve][broker] Load topic policies on non-persistent topic load and gate the policy replay ([#26134](https://github.com/apache/pulsar/pull/26134))
- [improve][broker] Trim orphaned bucket snapshots when ledgers are deleted ([#25984](https://github.com/apache/pulsar/pull/25984))
- [fix][broker][branch-4.0] Fix NOT_FOUND for topic policy operations on idle non-persistent topics
- [feat][broker] Expose managed ledger properties via topic internal stats ([#26079](https://github.com/apache/pulsar/pull/26079))
- [feat][broker] PIP-469: Legacy-aware topic policies backend routing and metadata-store topic policies ([#25707](https://github.com/apache/pulsar/pull/25707))

### Client

- [fix][client] Run the failover health probe off the Netty event-loop thread ([#26064](https://github.com/apache/pulsar/pull/26064))

### Pulsar IO and Pulsar Functions

- [fix][fn] Make exclusiveLeaderProducer volatile in FunctionMetaDataManager ([#26046](https://github.com/apache/pulsar/pull/26046))
- [fix][fn] Reorder Function Worker shutdown to stop scheduler before runtime manager ([#26136](https://github.com/apache/pulsar/pull/26136))

### Others

- [fix][proxy] Avoid blocking the proxy IO thread on a cold broker cache ([#26052](https://github.com/apache/pulsar/pull/26052))
- [fix] functions: Run worker leader-election off the consumer event-listener thread ([#26059](https://github.com/apache/pulsar/pull/26059))

### Tests & CI

- [fix][test] Deflake TopicPoliciesTest.setupTestTopic by retrying forced namespace deletion ([#25974](https://github.com/apache/pulsar/pull/25974))
- [fix][test] Fix flaky AuditorBookieTest.testBookieClusterRestart ([#26122](https://github.com/apache/pulsar/pull/26122))
- [fix][test] Fix flaky ExtensibleLoadManagerImplTest by re-serving the channel topic in initializeState ([#25976](https://github.com/apache/pulsar/pull/25976))
- [fix][test] Fix flaky ExtensibleLoadManagerImplTest.initializeState by recovering wedged channel ownership ([#25977](https://github.com/apache/pulsar/pull/25977))
- [fix][test] Fix flaky PersistentTopicsTest setup caused by concurrent Mockito stubbing ([#26083](https://github.com/apache/pulsar/pull/26083))
- [fix][test] Fix flaky SchemaServiceTest.testSchemaRegistryMetrics ([#25645](https://github.com/apache/pulsar/pull/25645))
- [fix][test] Fix flaky testPrepareInitPoliciesCacheAsyncThrowExceptionAfterCreateReader ([#26049](https://github.com/apache/pulsar/pull/26049))
- [fix][test] Make SameAuthParamsLookupAutoClusterFailoverTest less timing-sensitive ([#25675](https://github.com/apache/pulsar/pull/25675))
- [fix][test] Run makeReadEntryProbFail's errorOrNot on a caller-provided executor ([#26123](https://github.com/apache/pulsar/pull/26123))
- [improve][test]Add test: test/testTopicPartitionCannotBeCreatedAfterTopicDeleted ([#26038](https://github.com/apache/pulsar/pull/26038))
- [fix][test][branch-4.0] Adapt ConfigurationDataUtilsTest to Jackson 2.18.8 InetSocketAddress deserialization
- [fix][test][branch-4.0] Backport configurable read/add delays in PulsarMockBookKeeper

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.11...v4.0.12).