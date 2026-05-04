---
id: pulsar-4.0.1
title: Apache Pulsar 4.0.1
sidebar_label: Apache Pulsar 4.0.1
---

#### 2024-12-02

### Library updates

- [feat][meta] Bump oxia java version from 0.4.5 to 0.4.7 ([#23471](https://github.com/apache/pulsar/pull/23471))
- [feat][misc] Upgrade oxia version to 0.4.9 ([#23607](https://github.com/apache/pulsar/pull/23607))
- [fix][sec] Replace bcprov-jdk15on dependency with bcprov-jdk18-on ([#23532](https://github.com/apache/pulsar/pull/23532))
- [fix][sec] Upgrade Zookeeper to 3.9.3 to address CVE-2024-51504 ([#23581](https://github.com/apache/pulsar/pull/23581))
- [fix][sec] Upgrade to Netty 4.1.115.Final to address CVE-2024-47535 ([#23596](https://github.com/apache/pulsar/pull/23596))
- [improve] Upgrade OpenTelemetry library to 1.44.1 version ([#23656](https://github.com/apache/pulsar/pull/23656))
- [improve] Upgrade oxia-java to 0.4.10 and fix closing of OxiaMetadataStore ([#23653](https://github.com/apache/pulsar/pull/23653))

### Broker

- [feat][broker] Implement allowBrokerOperationAsync in PulsarAuthorizationProvider to avoid exception thrown ([#23663](https://github.com/apache/pulsar/pull/23663))
- [fix][broker] Broker is failing to create non-durable sub if topic is fenced ([#23579](https://github.com/apache/pulsar/pull/23579))
- [fix][broker] Fix Broker migration NPE while broker tls url not configured ([#23534](https://github.com/apache/pulsar/pull/23534))
- [fix][broker] Fix currently client retries until operation timeout if the topic does not exist ([#23530](https://github.com/apache/pulsar/pull/23530))
- [fix][broker] Fix failed TokenAuthenticatedProducerConsumerTest ([#23602](https://github.com/apache/pulsar/pull/23602))
- [fix][broker] Fix ownership loss ([#23515](https://github.com/apache/pulsar/pull/23515))
- [fix][broker] Fix print cluster migration state response ([#23535](https://github.com/apache/pulsar/pull/23535))
- [fix][broker] Fix race-condition causing repeated delete topic ([#23522](https://github.com/apache/pulsar/pull/23522))
- [fix][broker] Increase readBuffer size for bookkeeper.DLOutputStream ([#23548](https://github.com/apache/pulsar/pull/23548))
- [fix][broker] Key_Shared subscription: Reject consumers with incompatible policy ([#23449](https://github.com/apache/pulsar/pull/23449))
- [fix][broker] Revert "[improve][client] Add log when can't add message to the container ([#23657](https://github.com/apache/pulsar/pull/23657))
- [fix][broker] fix logging with correct error message while loading the topic ([#23544](https://github.com/apache/pulsar/pull/23544))
- [fix][broker] fix null lookup result when brokers are starting ([#23642](https://github.com/apache/pulsar/pull/23642))
- [fix][broker] support missing tenant level fine-granted permissions ([#23660](https://github.com/apache/pulsar/pull/23660))
- [fix][broker]: support missing broker level fine-granted permissions ([#23637](https://github.com/apache/pulsar/pull/23637))
- [improve][broker] Decouple pulsar_storage_backlog_age_seconds metric with backlogQuota check ([#23619](https://github.com/apache/pulsar/pull/23619))
- [improve][broker] Exclude system topics from namespace level publish and dispatch rate limiting ([#23589](https://github.com/apache/pulsar/pull/23589))
- [improve][broker] Make cluster metadata teardown command support metadata config path ([#23520](https://github.com/apache/pulsar/pull/23520))
- [improve][broker] PIP-392: Add configuration to enable consistent hashing to select active consumer for partitioned topic ([#23584](https://github.com/apache/pulsar/pull/23584))
- [improve][broker] Reduce memory occupation of InMemoryRedeliveryTracker. ([#23640](https://github.com/apache/pulsar/pull/23640))
- [improve][broker] Reduce memory occupation of the delayed message queue ([#23611](https://github.com/apache/pulsar/pull/23611))
- [improve][broker] Skip unloading when bundle throughput is zero (ExtensibleLoadManagerImpl only) ([#23626](https://github.com/apache/pulsar/pull/23626))
- [improve][broker] Support cleanup `replication cluster` and `allowed cluster` when cluster metadata teardown ([#23561](https://github.com/apache/pulsar/pull/23561))
- [improve][broker] re-elect the channel owner if no channel owner is found ([#23516](https://github.com/apache/pulsar/pull/23516))
- [improve][broker] replace HashMap with inner implementation ConcurrentLongLongPairHashMap in Negative Ack Tracker. ([#23582](https://github.com/apache/pulsar/pull/23582))


### Client

- [fix][admin] Fix lookup get a null result if uses proxy ([#23556](https://github.com/apache/pulsar/pull/23556))
- [fix][client] Fix ConsumerStats.getRateMsgsReceived javadoc ([#21618](https://github.com/apache/pulsar/pull/21618))
- [fix][client] Fix DLQ producer name conflicts when there are same name consumers ([#23577](https://github.com/apache/pulsar/pull/23577))
- [fix][client] Fix Reader.hasMessageAvailable return wrong value after seeking by timestamp with startMessageIdInclusive ([#23502](https://github.com/apache/pulsar/pull/23502))
- [fix][client] Fix deadlock of NegativeAcksTracker ([#23651](https://github.com/apache/pulsar/pull/23651))
- [fix][client] Fix producer/consumer stop to reconnect or Pub/Sub due to IO thread race-condition  ([#23499](https://github.com/apache/pulsar/pull/23499))
- [fix][client] Fix race-condition causing doReconsumeLater to hang when creating retryLetterProducer has failed ([#23560](https://github.com/apache/pulsar/pull/23560))
- [fix][client] Fix the javadoc for startMessageIdInclusive ([#23508](https://github.com/apache/pulsar/pull/23508))
- [fix][client] Fixed an issue where a cert chain could not be used in TLS authentication ([#23644](https://github.com/apache/pulsar/pull/23644))
- [fix][client] Initializing client-authentication using configured auth params ([#23610](https://github.com/apache/pulsar/pull/23610))
- [fix][client] Make protobuf-java dependency optional in java client libraries ([#23632](https://github.com/apache/pulsar/pull/23632))
- [fix][client] Prevent embedding protobuf-java class files in pulsar-client-admin and pulsar-client-all ([#23468](https://github.com/apache/pulsar/pull/23468))
- [fix][client] The partitionedProducer maxPendingMessages always is 0 ([#23593](https://github.com/apache/pulsar/pull/23593))
- [fix][client] Use dedicated executor for requests in BinaryProtoLookupService ([#23378](https://github.com/apache/pulsar/pull/23378))
- [fix][client] fix incomingMessageSize and client memory usage is negative ([#23624](https://github.com/apache/pulsar/pull/23624))
- [fix][client] fix the beforeConsume() method earlier hit with message listener ([#23578](https://github.com/apache/pulsar/pull/23578))
- [improve][admin] Print error log if handle http response fails ([#23563](https://github.com/apache/pulsar/pull/23563))
- [improve][client] Enhance error handling for non-exist subscription in consumer creation ([#23254](https://github.com/apache/pulsar/pull/23254))
- [improve][client] Reduce unshaded dependencies and shading warnings in shaded Java client modules ([#23647](https://github.com/apache/pulsar/pull/23647))
- [improve][client] Replace NameUtil#generateRandomName with RandomStringUtils#randomAlphanumeric ([#23645](https://github.com/apache/pulsar/pull/23645))

### Pulsar IO and Pulsar Functions

- [fix][fn] ack messages for window function when its result is null ([#23618](https://github.com/apache/pulsar/pull/23618))
- [improve][io] Support update subscription position for sink connector ([#23538](https://github.com/apache/pulsar/pull/23538))
- [improve][io] Upgrade Spring version to 6.1.13 in IO Connectors ([#23459](https://github.com/apache/pulsar/pull/23459))
- [improve][io] Upgrade Spring version to 6.1.14 in IO Connectors ([#23481](https://github.com/apache/pulsar/pull/23481))

### Others

- [feat][monitor] Add offloader stats grafana dashboard ([#23479](https://github.com/apache/pulsar/pull/23479))
- [fix][misc] Class conflict during jetcd-core-shaded shading process ([#23641](https://github.com/apache/pulsar/pull/23641))
- [fix][misc] Unable to connect an etcd metastore with recent releases due to jetc-core sharding problem ([#23604](https://github.com/apache/pulsar/pull/23604))
- [fix][proxy] Fix pattern consumer does not work when using Proxy ([#23489](https://github.com/apache/pulsar/pull/23489))
- [fix][standalone] correctly delete bookie registration znode ([#23497](https://github.com/apache/pulsar/pull/23497))
- [fix][ws] Implement missing http header data functions in AuthenticationDataSubscription ([#23638](https://github.com/apache/pulsar/pull/23638))
- [improve] Improve logic for enabling Netty leak detection ([#23613](https://github.com/apache/pulsar/pull/23613))
- [improve] Use single buffer for metrics when noUnsafe use ([#23612](https://github.com/apache/pulsar/pull/23612))
- [improve][misc] Disable OTel by default when running the pulsar-perf tool ([#23585](https://github.com/apache/pulsar/pull/23585))
- [improve][ml] Avoid repetitive nested lock for isMessageDeleted in ManagedCursorImpl ([#23609](https://github.com/apache/pulsar/pull/23609))
- [improve][monitor] Upgrade OTel to 1.41.0 ([#23484](https://github.com/apache/pulsar/pull/23484))
- [improve][offload] Use filesystemURI as the storage path ([#23591](https://github.com/apache/pulsar/pull/23591))
- Enabling DNS retryOnTimeout with TCP in DnsNameResolver ([#23590](https://github.com/apache/pulsar/pull/23590))

### Tests & CI

- [cleanup][build] skip generating pom.xml.versionsBackup ([#23639](https://github.com/apache/pulsar/pull/23639))
- [fix][build] Fix error "Element encoding is not allowed here" in pom.xml ([#23655](https://github.com/apache/pulsar/pull/23655))
- [fix][test] Fix DeadLetterTopicTest.testDeadLetterTopicWithInitialSubscriptionAndMultiConsumers ([#23552](https://github.com/apache/pulsar/pull/23552))
- [fix][test] Fix ManagedCursorTest.testForceCursorRecovery ([#23518](https://github.com/apache/pulsar/pull/23518))
- [fix][test] Fix SimpleProducerConsumerTest.testMultiTopicsConsumerImplPauseForManualSubscription ([#23546](https://github.com/apache/pulsar/pull/23546))
- [fix][test] Fix memory leak via OTel shutdown hooks in tests ([#23483](https://github.com/apache/pulsar/pull/23483))
- [fix][test] Fix running ClusterMetadataSetupTest in IDE ([#23492](https://github.com/apache/pulsar/pull/23492))
- [fix][test] Prevent OOM in test by not spying invocations in SimpleProducerConsumerTest ([#23486](https://github.com/apache/pulsar/pull/23486))
- [fix][test]Flaky-test: SchemaServiceTest.testSchemaRegistryMetrics ([#23566](https://github.com/apache/pulsar/pull/23566))
- [improve][test] Clarify method signatures in Bookkeeper mock client ([#23598](https://github.com/apache/pulsar/pull/23598))
- [improve][test] Disable OTel autoconfigured exporters in tests ([#23540](https://github.com/apache/pulsar/pull/23540))
- [improve][test] Reduce OneWayReplicatorUsingGlobalZKTest.testRemoveCluster execution time ([#23633](https://github.com/apache/pulsar/pull/23633))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.0...v4.0.1).