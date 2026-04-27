---
id: pulsar-4.0.10
title: Apache Pulsar 4.0.10
sidebar_label: Apache Pulsar 4.0.10
---

#### 2026-04-27

### Upgrade notice

This release upgrades Jetty from 9.4.x to 12.1.8 to address several high-severity CVEs in Jetty 9.4.x ([#25534](https://github.com/apache/pulsar/pull/25534)). For background and discussion, see the [dev list thread](https://lists.apache.org/thread/2mcnfn7f0nq3zww3ph2wf41cbh6xcsjj).

The upgrade introduces the following breaking changes:

1. **`AdditionalServlet` interface change.** The `org.apache.pulsar.broker.web.plugin.servlet.AdditionalServlet` interface was coupled directly to the Jetty 9 `org.eclipse.jetty.servlet.ServletHolder` class. This coupling has been removed, so external implementations of this plugin API need to be updated.

2. **Athenz authentication requires Java 17+.** `pulsar-client-auth-athenz` now depends on Jetty and therefore requires Java 17+. The Pulsar Client and Pulsar Admin client themselves remain Java 8+ compatible.

3. **Prometheus metrics provider class relocation.** The default Prometheus metrics provider classes for BookKeeper and ZooKeeper have been replaced because the previous defaults depended on Jetty 9.4.x. If you are using the previous default configuration file in your deployment, update the following settings:

   | Config file | Setting | Old value | New value |
   | --- | --- | --- | --- |
   | `bookkeeper.conf` | `statsProviderClass` | `org.apache.bookkeeper.stats.prometheus.PrometheusMetricsProvider` | `org.apache.pulsar.metrics.prometheus.bookkeeper.PrometheusMetricsProvider` |
   | `zookeeper.conf` | `metricsProvider.className` | `org.apache.zookeeper.metrics.prometheus.PrometheusMetricsProvider` | `org.apache.pulsar.metrics.prometheus.zookeeper.PrometheusMetricsProvider` |

Users of the Apache Pulsar Helm chart prior to version 4.6.0 will need to set the `bookie.configData.statsProviderClass` key to `org.apache.pulsar.metrics.prometheus.bookkeeper.PrometheusMetricsProvider`:

```yaml
bookie:
  configData:
    statsProviderClass: "org.apache.pulsar.metrics.prometheus.bookkeeper.PrometheusMetricsProvider"
```

### Library updates

- [fix][sec] Upgrade BouncyCastle to 1.84 (CVE-2026-5588, CVE-2026-0636) ([#25569](https://github.com/apache/pulsar/pull/25569))
- [fix][sec] Upgrade to async-http-client 2.14.5 to address CVE-2026-40490 ([#25546](https://github.com/apache/pulsar/pull/25546))
- [fix][sec] Upgrade to Netty 4.1.132.Final to address CVEs ([#25399](https://github.com/apache/pulsar/pull/25399))
- [fix][sec] Bump google.golang.org/grpc from 1.60.0 to 1.79.3 in /pulsar-function-go ([#25353](https://github.com/apache/pulsar/pull/25353))
- [fix][sec] Bump org.apache.zookeeper:zookeeper from 3.9.4 to 3.9.5 ([#25303](https://github.com/apache/pulsar/pull/25303))
- [fix][sec] Upgrade aircompressor to 2.0.3 to resolve CVE-2025-67721 ([#25256](https://github.com/apache/pulsar/pull/25256))
- [fix][sec] Upgrade Jackson version to 2.18.6 ([#25264](https://github.com/apache/pulsar/pull/25264))
- [fix][sec] Upgrade Python protobuf version to 6.33.5 to address CVE-2026-0994 ([#25250](https://github.com/apache/pulsar/pull/25250))
- [fix][sec][branch-4.0] Upgrade to Jetty 12.1.8 to address several CVEs ([#25534](https://github.com/apache/pulsar/pull/25534))
- [improve][fn] Upgrade Pulsar Python client version to 3.10.0 ([#25251](https://github.com/apache/pulsar/pull/25251))
- [fix][sec] Upgrade log4j to 2.25.4 to address CVE-2026-34477, CVE-2026-34478, CVE-2026-34480, CVE-2026-34481
- [improve] Upgrade RoaringBitmap to 1.6.9 version ([#25253](https://github.com/apache/pulsar/pull/25253))

### Broker

- [fix][broker] Change the schema incompatible log from ERROR to WARN level ([#25483](https://github.com/apache/pulsar/pull/25483))
- [fix][broker] Fix backlog clearing for unloaded namespace bundles ([#25272](https://github.com/apache/pulsar/pull/25272))
- [fix][broker] Lower log level of DrainingHashesTracker not-found entry to DEBUG ([#25558](https://github.com/apache/pulsar/pull/25558))
- [fix][broker] Prevent timed-out producer creation from racing with retry ([#25460](https://github.com/apache/pulsar/pull/25460))
- [fix][broker] pulsar admin stats internal with metadata command ([#25557](https://github.com/apache/pulsar/pull/25557))
- [fix][broker] Unthrottle producers immediately when publish rate limiting is disabled ([#25502](https://github.com/apache/pulsar/pull/25502))
- [fix][broker]Namespaces can be created with may empty replication_clusters policy ([#25551](https://github.com/apache/pulsar/pull/25551))
- [fix][admin] Refactor namespace migration operation to async in rest api ([#25478](https://github.com/apache/pulsar/pull/25478))
- [improve][broker] Close connection when close consumer write fails ([#25520](https://github.com/apache/pulsar/pull/25520))
- [improve][broker] Use full bundle name for namespace bundle destination affinity in ModularLoadManagerImpl ([#25518](https://github.com/apache/pulsar/pull/25518))
- [fix][broker] Fix concurrency bug in BucketDelayedDeliveryTracker ([#25346](https://github.com/apache/pulsar/pull/25346))
- [fix][broker] Fix ExtensibleLoadManagerImpl stuck Assigning bundle state after broker restart ([#25379](https://github.com/apache/pulsar/pull/25379))
- [fix][broker] fix flaky test in SystemTopicBasedTopicPoliciesServiceTest ([#25098](https://github.com/apache/pulsar/pull/25098))
- [fix][broker] Fix IllegalArgumentException in BucketDelayedDeliveryTracker.addMessage ([#25371](https://github.com/apache/pulsar/pull/25371))
- [fix][broker] Fix race condition in ServerCnx producer/consumer async callbacks ([#25352](https://github.com/apache/pulsar/pull/25352))
- [fix][broker] Guard AsyncTokenBucket against long overflow ([#25262](https://github.com/apache/pulsar/pull/25262))
- [fix][broker] Handle missing replicator during snapshot request processing ([#25266](https://github.com/apache/pulsar/pull/25266))
- [fix][broker] Return failed future instead of throwing exception in async methods ([#25289](https://github.com/apache/pulsar/pull/25289))
- [fix][broker] Support namespace unsubscribe when bundles are unloaded ([#25276](https://github.com/apache/pulsar/pull/25276))
- [fix][broker]Producer with AUTO_PRODUCE schema failed to reconnect, which caused by schema incompatible ([#25437](https://github.com/apache/pulsar/pull/25437))
- [fix][broker]system topic was created with different partitions acrossing clusters after enabled namespace-level replication ([#25312](https://github.com/apache/pulsar/pull/25312))
- [fix][admin] Refactor namespace anti affinity group sync operations to async in rest api ([#25086](https://github.com/apache/pulsar/pull/25086))
- [fix][offload] Close all resources in BlobStoreBackedReadHandleImplV2.closeAsync ([#25296](https://github.com/apache/pulsar/pull/25296))
- [improve][broker] Change log level from warn to debug when cursor mark-deleted position ledger doesn't exist ([#25200](https://github.com/apache/pulsar/pull/25200))
- [improve][broker] Optimize AsyncTokenBucket overflow solution further to reduce fallback to BigInteger ([#25269](https://github.com/apache/pulsar/pull/25269))
- [improve][broker]Reduce the lock range of SimpleCache to enhance performance ([#25293](https://github.com/apache/pulsar/pull/25293))
- [refactor][broker] Decouple delayed delivery trackers from dispatcher ([#25384](https://github.com/apache/pulsar/pull/25384))

### Client

- [fix][client] Fix thread-safety and refactor MessageCryptoBc key management ([#25400](https://github.com/apache/pulsar/pull/25400))
- [fix][client] Fail messages immediately in ProducerImpl when in terminal state ([#25317](https://github.com/apache/pulsar/pull/25317))
- [fix][client] Fix async APIs to return failed futures on validation errors ([#25287](https://github.com/apache/pulsar/pull/25287))
- [fix][client] Reduce logging in OAuth auth to fix parsing of Pulsar cli command output ([#25254](https://github.com/apache/pulsar/pull/25254))
- [improve][client][branch-4.0] Deduplicate in-progress lookup requests also for HttpLookupService ([#25017](https://github.com/apache/pulsar/pull/25017))

### Pulsar IO and Pulsar Functions

- [fix][io][kca] kafka headers silently dropped ([#25325](https://github.com/apache/pulsar/pull/25325))
- [fix][io] Restore lz4 compression with Kafka IO connector after [#25198](https://github.com/apache/pulsar/pull/25198) exclusion

### Others

- [improve][common] Optimize TopicName.get() to reduce lock contention on cache lookup ([#25367](https://github.com/apache/pulsar/pull/25367))
- [improve][broker] Improve the performance of TopicName constructor ([#24463](https://github.com/apache/pulsar/pull/24463))
- [feat][bookkeeper] add certs refresh ([#25370](https://github.com/apache/pulsar/pull/25370))

### Tests & CI

- [fix][ci] Ensure discard_max_bytes is set to 0 only for existing block devices ([#25510](https://github.com/apache/pulsar/pull/25510))
- [fix][test] Extend SameAuthParamsLookupAutoClusterFailoverTest phase timeouts ([#25563](https://github.com/apache/pulsar/pull/25563))
- [fix][test] Fix flaky BrokerRegistryIntegrationTest port binding race ([#25463](https://github.com/apache/pulsar/pull/25463))
- [fix][test] Fix flaky ExtensibleLoadManagerImpl client reconnection tests: PulsarClientException$AlreadyClosedException: Client already closed ([#25509](https://github.com/apache/pulsar/pull/25509))
- [fix][test] Fix flaky ExtensibleLoadManagerTest.startBroker timeout ([#25500](https://github.com/apache/pulsar/pull/25500))
- [fix][test] Fix flaky OffloadPrefixTest.testPositionOnEdgeOfLedger race with ledger rollover ([#25561](https://github.com/apache/pulsar/pull/25561))
- [fix][test] Fix flaky ServerCnxTest.testCreateProducerTimeoutThenCreateSameNamedProducerShouldFail ([#25497](https://github.com/apache/pulsar/pull/25497))
- [fix][test] Fix flaky testLoadBalancerServiceUnitTableViewSyncer ([#25427](https://github.com/apache/pulsar/pull/25427))
- [fix][test] Flaky SameAuthParamsLookupAutoClusterFailoverTest ([#25566](https://github.com/apache/pulsar/pull/25566))
- [fix][test] Recreate EventLoop in PublishRateLimiterTest setup ([#25560](https://github.com/apache/pulsar/pull/25560))
- [fix][test] Relax BrokerRegistryIntegrationTest broker-close threshold ([#25562](https://github.com/apache/pulsar/pull/25562))
- [improve][ci] Cleanup tune-runner-vm and clean-disk actions ([#25444](https://github.com/apache/pulsar/pull/25444))
- [cleanup][ci] Remove documentation label bot ([#25469](https://github.com/apache/pulsar/pull/25469))
- [cleanup][ci] Remove ready-to-test label enforcement ([#25470](https://github.com/apache/pulsar/pull/25470))
- [fix][ci] Disable trivy-action ([#25373](https://github.com/apache/pulsar/pull/25373))
- [fix][ci] Fix .github/actions/ssh-access which is used for debugging Pulsar CI in forks ([#25075](https://github.com/apache/pulsar/pull/25075))
- [fix][test] Fix flaky ExtensibleLoadManagerImplTest.testLoadBalancerServiceUnitTableViewSyncer ([#25378](https://github.com/apache/pulsar/pull/25378))
- [fix][test] Fix flaky OneWayReplicatorUsingGlobalZKTest cleanup ([#25313](https://github.com/apache/pulsar/pull/25313))
- [fix][test] Fix flaky OneWayReplicatorUsingGlobalZKTest.cleanup ([#25389](https://github.com/apache/pulsar/pull/25389))
- [fix][test] Fix flaky PersistentStickyKeyDispatcherMultipleConsumersClassicTest.testSkipRedeliverTemporally ([#25385](https://github.com/apache/pulsar/pull/25385))
- [fix][test] Fix flaky PulsarDebeziumOracleSourceTest ([#25314](https://github.com/apache/pulsar/pull/25314))
- [fix][test] Fix flaky ReplicatorTest.testResumptionAfterBacklogRelaxed ([#25358](https://github.com/apache/pulsar/pull/25358))
- [fix][test] Fix flaky SingleThreadNonConcurrentFixedRateSchedulerTest.testPeriodicTaskCancellation ([#24823](https://github.com/apache/pulsar/pull/24823))
- [fix][test] Stabilize FunctionAssignmentTailerTest.testErrorNotifier by synchronizing mock stubbing with CountDownLatch ([#24875](https://github.com/apache/pulsar/pull/24875))
- [fix] Fix flaky OneWayReplicatorTest.testTopicPoliciesReplicationRule ([#25316](https://github.com/apache/pulsar/pull/25316))
- [fix] Fix flaky testEstimatedTimeBasedBacklogQuotaCheckWhenNoBacklog ([#25307](https://github.com/apache/pulsar/pull/25307))
- [cleanup][build] Bumped version to 4.0.10-SNAPSHOT
- [fix][build] Fix license file for shell distribution
- [fix][build][branch-4.0] Fix broken compilation after cherry-picking [#25400](https://github.com/apache/pulsar/pull/25400)
- [fix][build][branch-4.0] Fix missing exclusion in cherry-picking [#25264](https://github.com/apache/pulsar/pull/25264)
- [fix][test][branch-4.0] Backport Pulsar IO Debezium connector test framework changes
- [improve][build][branch-4.0] Support docker.golang.image/GOLANG_IMAGE in latest-version-image
- [improve][ci] Backport fix for ssh-access action

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.0.10...v4.0.10).
