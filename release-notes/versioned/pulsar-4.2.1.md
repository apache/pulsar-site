---
id: pulsar-4.2.1
title: Apache Pulsar 4.2.1
sidebar_label: Apache Pulsar 4.2.1
---

#### 2026-04-27

### Library updates

- [fix][sec] Upgrade BouncyCastle to 1.84 (CVE-2026-5588, CVE-2026-0636) ([#25569](https://github.com/apache/pulsar/pull/25569))
- [fix][sec] Upgrade Jetty to address CVE-2026-2332 ([#25527](https://github.com/apache/pulsar/pull/25527))
- [fix][sec] Upgrade Jetty to address CVE-2026-5795 ([#25532](https://github.com/apache/pulsar/pull/25532))
- [fix][sec] Upgrade to async-http-client 2.14.5 to address CVE-2026-40490 ([#25546](https://github.com/apache/pulsar/pull/25546))
- [fix][sec] Upgrade to Netty 4.1.132.Final to address CVEs ([#25399](https://github.com/apache/pulsar/pull/25399))
- [fix][sec] Upgrade log4j to 2.25.4 to address CVE-2026-34477, CVE-2026-34478, CVE-2026-34480, CVE-2026-34481
- [fix] Upgrade Jetty to 12.1.6 to fix CVE-2026-1605 ([#25485](https://github.com/apache/pulsar/pull/25485))

### Broker

- [fix][broker] Change the schema incompatible log from ERROR to WARN level ([#25483](https://github.com/apache/pulsar/pull/25483))
- [fix][broker] Fix backlog clearing for unloaded namespace bundles ([#25272](https://github.com/apache/pulsar/pull/25272))
- [fix][broker] Lower log level of DrainingHashesTracker not-found entry to DEBUG ([#25558](https://github.com/apache/pulsar/pull/25558))
- [fix][broker] Prevent timed-out producer creation from racing with retry ([#25460](https://github.com/apache/pulsar/pull/25460))
- [fix][broker] pulsar admin stats internal with metadata command ([#25557](https://github.com/apache/pulsar/pull/25557))
- [fix][broker] Revert "[improve][broker] Enhance advertised address resolution with fallback to localhost ([#25238](https://github.com/apache/pulsar/pull/25238))" ([#25523](https://github.com/apache/pulsar/pull/25523))
- [fix][broker] Unthrottle producers immediately when publish rate limiting is disabled ([#25502](https://github.com/apache/pulsar/pull/25502))
- [fix][broker]Namespaces can be created with may empty replication_clusters policy ([#25551](https://github.com/apache/pulsar/pull/25551))
- [fix][admin] Refactor namespace migration operation to async in rest api ([#25478](https://github.com/apache/pulsar/pull/25478))
- [improve][broker] Close connection when close consumer write fails ([#25520](https://github.com/apache/pulsar/pull/25520))
- [improve][broker] Use full bundle name for namespace bundle destination affinity in ModularLoadManagerImpl ([#25518](https://github.com/apache/pulsar/pull/25518))

### Client

- [fix][client] Fix thread-safety and refactor MessageCryptoBc key management ([#25400](https://github.com/apache/pulsar/pull/25400))

### Pulsar IO and Pulsar Functions

- [fix][io] Restore lz4 compression with Kafka IO connector after [#25198](https://github.com/apache/pulsar/pull/25198) exclusion

### Others

- [improve][common] Optimize TopicName.get() to reduce lock contention on cache lookup ([#25367](https://github.com/apache/pulsar/pull/25367))
- [improve][broker] Improve the performance of TopicName constructor ([#24463](https://github.com/apache/pulsar/pull/24463))

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
- [cleanup][build] Bumped version to 4.2.1-SNAPSHOT
- [fix][build][branch-4.2] Use correct Jetty ee8 BOM coordinates
- [improve][ci] Backport fix for ssh-access action

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v4.2.0...v4.2.1).
