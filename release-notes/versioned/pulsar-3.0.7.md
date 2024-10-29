---
id: pulsar-3.0.7
title: Apache Pulsar 3.0.7
sidebar_label: Apache Pulsar 3.0.7
---

#### 2024-10-04

### Library updates

- [fix][sec] Upgrade Avro to 1.11.4 to address CVE-2024-47561 ([#23394](https://github.com/apache/pulsar/pull/23394))
- [fix][sec] Upgrade vertx to 4.5.10 to address CVE-2024-8391 ([#23338](https://github.com/apache/pulsar/pull/23338))
- [fix][sec][branch-3.0] Upgrade protobuf-java to 3.25.5 ([#23356](https://github.com/apache/pulsar/pull/23356)) ([#23357](https://github.com/apache/pulsar/pull/23357))
- [fix] Bump commons-io:commons-io from 2.8.0 to 2.14.0 ([#23393](https://github.com/apache/pulsar/pull/23393))
- [improve][misc] Upgrade Netty to 4.1.113 and netty-tcnative to 2.0.66 ([#23255](https://github.com/apache/pulsar/pull/23255))
- [improve][misc] Upgrade jersey to 2.41 ([#22290](https://github.com/apache/pulsar/pull/22290))
- [improve] Upgrade Pulsar Python client in docker image to 3.5.0 ([#23377](https://github.com/apache/pulsar/pull/23377))

### Broker

- [fix][broker] Cancel possible pending replay read in cancelPendingRead ([#23384](https://github.com/apache/pulsar/pull/23384))
- [fix][broker] Execute the pending callbacks in order before ready for incoming requests ([#23266](https://github.com/apache/pulsar/pull/23266))
- [fix][broker] Fix 'Disabled replicated subscriptions controller' logic and logging ([#23142](https://github.com/apache/pulsar/pull/23142))
- [fix][broker] Fix authenticate order in AuthenticationProviderList ([#23111](https://github.com/apache/pulsar/pull/23111))
- [fix][broker] Fix brokers still retry start replication after closed the topic ([#23237](https://github.com/apache/pulsar/pull/23237))
- [fix][broker] Fix compatibility issues for PIP-344 ([#23136](https://github.com/apache/pulsar/pull/23136))
- [fix][broker] Fix incomplete NAR file extraction which prevents broker from starting ([#23274](https://github.com/apache/pulsar/pull/23274))
- [fix][broker] Fix out-of-order issues with ConsistentHashingStickyKeyConsumerSelector ([#23327](https://github.com/apache/pulsar/pull/23327))
- [fix][broker] Fix shadow topics cannot be consumed when the entry is not cached ([#23147](https://github.com/apache/pulsar/pull/23147))
- [fix][broker] Fix system topic can not be loaded up if it contains data offloaded ([#23279](https://github.com/apache/pulsar/pull/23279))
- [fix][broker] Fix the bug that elected leader thinks it's a follower ([#23138](https://github.com/apache/pulsar/pull/23138))
- [fix][broker] Handle the case when `getOwnedServiceUnits` fails gracefully ([#23119](https://github.com/apache/pulsar/pull/23119))
- [fix][broker] Internal reader of __change_events can not started after metadata store session rebuilt ([#23018](https://github.com/apache/pulsar/pull/23018))
- [fix][broker] Let Pending ack handler can retry to init when encounters a metadata store error ([#23153](https://github.com/apache/pulsar/pull/23153))
- [fix][broker] Skip reading entries from closed cursor. ([#22751](https://github.com/apache/pulsar/pull/22751))
- [fix][broker] Topic can never be loaded up due to broker maintains a failed topic creation future ([#23184](https://github.com/apache/pulsar/pull/23184))
- [fix][broker] fix exception may hidden and result in stuck when topic loading ([#23102](https://github.com/apache/pulsar/pull/23102))
- [fix][broker] fix pulsar-admin topics stats-internal caused a BK client thread a deadlock ([#23258](https://github.com/apache/pulsar/pull/23258))
- [fix][broker] fix replicated namespaces filter in filterAndUnloadMatchedNamespaceAsync ([#23100](https://github.com/apache/pulsar/pull/23100))
- [fix][broker] fix the log format error in the AdminResource ([#23278](https://github.com/apache/pulsar/pull/23278))
- [fix][broker] type cast on exceptions in exceptionally can lead to lost calls ([#23117](https://github.com/apache/pulsar/pull/23117))
- [fix][broker]A failed consumer/producer future in ServerCnx can never be removed ([#23123](https://github.com/apache/pulsar/pull/23123))
- [fix][broker][branch-3.0] Fail fast if the extensible load manager failed to start ([#23297](https://github.com/apache/pulsar/pull/23297)) ([#23302](https://github.com/apache/pulsar/pull/23302))
- [fix][broker] StatsOutputStream: add string write function ([#23227](https://github.com/apache/pulsar/pull/23227))
- [improve][broker] Add msgInReplay subscription stat and metric to improve Key_Shared observability ([#23224](https://github.com/apache/pulsar/pull/23224))
- [improve][broker] Add retry for start service unit state channel (ExtensibleLoadManagerImpl only) ([#23230](https://github.com/apache/pulsar/pull/23230))
- [improve][broker] Avoid subscription fenced error with consumer.seek whenever possible ([#23163](https://github.com/apache/pulsar/pull/23163))
- [improve][broker] Explicitly close LB internal topics when playing a follower (ExtensibleLoadManagerImpl only) ([#23144](https://github.com/apache/pulsar/pull/23144))
- [improve][broker] Improve pulsar_topic_load_failed metric to record correct failed time ([#23199](https://github.com/apache/pulsar/pull/23199))
- [improve][broker] Optimize high CPU usage when consuming from topics with ongoing txn ([#23189](https://github.com/apache/pulsar/pull/23189))
- [improve][broker] Optimize performance for checking max topics when the topic is a system topic ([#23185](https://github.com/apache/pulsar/pull/23185))
- [improve][broker] Optimize the performance of individual acknowledgments ([#23072](https://github.com/apache/pulsar/pull/23072))
- [improve][broker] Part 2 of PIP-370: add metrics "pulsar_replication_disconnected_count" ([#23213](https://github.com/apache/pulsar/pull/23213))
- [improve][broker] Phase 1 of PIP-370 support disable create topics on remote cluster through replication  ([#23169](https://github.com/apache/pulsar/pull/23169))
- [improve][broker] Reduce the CPU pressure from the transaction buffer in rolling restarts ([#23062](https://github.com/apache/pulsar/pull/23062))
- [improve][broker] Should notify bundle ownership listener onLoad event when ServiceUnitState start (ExtensibleLoadManagerImpl only) ([#23152](https://github.com/apache/pulsar/pull/23152))
- [improve][broker] Support customized shadow managed ledger implementation ([#23179](https://github.com/apache/pulsar/pull/23179))
- [improve][broker] Support to specify auth-plugin, auth-parameters and tls-enable arguments when init cluster metadata ([#23087](https://github.com/apache/pulsar/pull/23087)) ([#23126](https://github.com/apache/pulsar/pull/23126))
- [improve][broker] Reuse method getAvailableBrokersAsync ([#23099](https://github.com/apache/pulsar/pull/23099))
- [improve][admin] PIP-369 Introduce `unload` flag in `ns-isolation-policy set` call ([#23120](https://github.com/apache/pulsar/pull/23120))

### Client

- [fix] DLQ to handle bytes key properly ([#23172](https://github.com/apache/pulsar/pull/23172))
- [fix][client] Copy orderingKey to retry letter topic and DLQ messages and fix bug in copying ([#23182](https://github.com/apache/pulsar/pull/23182))
- [fix][client] Create the retry producer async ([#23157](https://github.com/apache/pulsar/pull/23157))
- [fix][client] Fix for early hit `beforeConsume` for MultiTopicConsumer ([#23141](https://github.com/apache/pulsar/pull/23141))
- [fix][client] Fix timeout handling in Pulsar Admin client ([#23128](https://github.com/apache/pulsar/pull/23128))
- [fix][client] TransactionCoordinatorClient support retry ([#23081](https://github.com/apache/pulsar/pull/23081))
- [fix][client] fix negative message re-delivery twice issue ([#20750](https://github.com/apache/pulsar/pull/20750))
- [fix][client] the nullValue in msgMetadata should be true by default ([#22372](https://github.com/apache/pulsar/pull/22372))
- [improve][client] Add maxConnectionsPerHost and connectionMaxIdleSeconds to PulsarAdminBuilder ([#22541](https://github.com/apache/pulsar/pull/22541))
- [improve][client] Don't print info logs for each schema loaded by client ([#23206](https://github.com/apache/pulsar/pull/23206))
- [improve][client] Swallow Conscrypt ClassNotFoundException ([#20371](https://github.com/apache/pulsar/pull/20371))
- [improve][client]Add new ServiceUrlProvider implementation: SameAuthParamsAutoClusterFailover ([#23129](https://github.com/apache/pulsar/pull/23129))
- [improve][client]PIP-359:Support custom message listener executor for specific subscription ([#22861](https://github.com/apache/pulsar/pull/22861))

### Pulsar IO and Pulsar Functions

- [fix][fn] Make python install dependencies from requirements.txt ([#20174](https://github.com/apache/pulsar/pull/20174))
- [fix][io] Upgrade mssql server docker tag in DebeziumMsSqlContainer ([#23318](https://github.com/apache/pulsar/pull/23318))
- [improve][fn] Add support for overriding additionalJavaRuntimeArguments with PF_additionalJavaRuntimeArguments env ([#23130](https://github.com/apache/pulsar/pull/23130))
- [fix][sql][branch-3.0] Fix UUID convert failed for JSON schema ([#23292](https://github.com/apache/pulsar/pull/23292))

### Others

- [feat] Add scripts for updating BK RocksDB ini files ([#23178](https://github.com/apache/pulsar/pull/23178))
- [fix][log] Do not print error log if tenant/namespace does not exist when calling get topic metadata ([#23291](https://github.com/apache/pulsar/pull/23291))
- [fix][log] Do not print warn log when concurrently publishing and switching ledgers ([#23209](https://github.com/apache/pulsar/pull/23209))
- [fix][misc] Log Conscrypt security provider initialization warnings at debug level ([#23364](https://github.com/apache/pulsar/pull/23364))
- [improve][misc] Improve AES-GCM cipher performance ([#23122](https://github.com/apache/pulsar/pull/23122))
- [improve][misc] Optimize TLS performance by omitting extra buffer copies ([#23115](https://github.com/apache/pulsar/pull/23115))
- [improve][proxy] Reuse authentication instance in pulsar-proxy ([#23113](https://github.com/apache/pulsar/pull/23113))

### Tests & CI

- [fix][test] Fix flaky SubscriptionSeekTest.testSeekIsByReceive ([#23170](https://github.com/apache/pulsar/pull/23170))
- [fix][test] Fix flaky UnloadSubscriptionTest.testMultiConsumer ([#23243](https://github.com/apache/pulsar/pull/23243))
- [fix][test] Fix flaky test LeaderElectionTest.revalidateLeaderWithinSameSession ([#22383](https://github.com/apache/pulsar/pull/22383))
- [fix][build] Fix problem where git.commit.id.abbrev is missing in image tagging ([#23337](https://github.com/apache/pulsar/pull/23337))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.6...v3.0.7).