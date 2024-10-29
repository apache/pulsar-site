---
id: pulsar-3.2.4
title: Apache Pulsar 3.2.4
sidebar_label: Apache Pulsar 3.2.4
---

#### 2024-08-01

### Broker

- [fix][broker] Asynchronously return brokerRegistry.lookupAsync when checking if broker is active(ExtensibleLoadManagerImpl only) ([#22899](https://github.com/apache/pulsar/pull/22899))
- [fix][broker] Check the broker is available for the SLA monitor bundle when the ExtensibleLoadManager is enabled ([#22485](https://github.com/apache/pulsar/pull/22485))
- [fix][broker] Check the markDeletePosition and calculate the backlog ([#22947](https://github.com/apache/pulsar/pull/22947))
- [fix][broker] Ensure that PulsarService is ready for serving incoming requests ([#22977](https://github.com/apache/pulsar/pull/22977))
- [fix][broker] EntryFilters fix NoClassDefFoundError due to closed classloader ([#22767](https://github.com/apache/pulsar/pull/22767))
- [fix][broker] Fix MessageDeduplication replay timeout cause topic loading stuck ([#23004](https://github.com/apache/pulsar/pull/23004))
- [fix][broker] Fix NPE after publishing a tombstone to the service unit channel ([#22859](https://github.com/apache/pulsar/pull/22859))
- [fix][broker] Fix Replicated Topic unload bug when ExtensibleLoadManager is enabled ([#22496](https://github.com/apache/pulsar/pull/22496))
- [fix][broker] Fix broker OOM when upload a large package. ([#22989](https://github.com/apache/pulsar/pull/22989))
- [fix][broker] Fix cursor should use latest ledger config ([#22644](https://github.com/apache/pulsar/pull/22644))
- [fix][broker] Fix geo-replication admin client url ([#22584](https://github.com/apache/pulsar/pull/22584))
- [fix][broker] Fix stuck when enable topic level replication and build remote admin fails ([#23028](https://github.com/apache/pulsar/pull/23028))
- [fix][broker] Fix updatePartitionedTopic when replication at ns level and topic policy is set ([#22971](https://github.com/apache/pulsar/pull/22971))
- [fix][broker] Immediately tombstone Deleted and Free state bundles ([#22743](https://github.com/apache/pulsar/pull/22743))
- [fix][broker] Make ExtensibleLoadManagerImpl.getOwnedServiceUnits async ([#22727](https://github.com/apache/pulsar/pull/22727))
- [fix][broker] Messages lost on the remote cluster when using topic level replication ([#22890](https://github.com/apache/pulsar/pull/22890))
- [fix][broker] PulsarStandalone started with error if --stream-storage-port is not 4181 ([#22993](https://github.com/apache/pulsar/pull/22993))
- [fix][broker] Support advertised listeners when gracefully transferring topics (ExtensibleLoadManagerImpl only) ([#22862](https://github.com/apache/pulsar/pull/22862))
- [fix][broker] Support lookup options for extensible load manager ([#22487](https://github.com/apache/pulsar/pull/22487))
- [fix][broker] The topic might reference a closed ledger ([#22860](https://github.com/apache/pulsar/pull/22860))
- [fix][broker] Update init and shutdown time and other minor logic (ExtensibleLoadManagerImpl only) ([#22930](https://github.com/apache/pulsar/pull/22930))
- [fix][broker] broker log a full thread dump when a deadlock is detected in healthcheck every time ([#22916](https://github.com/apache/pulsar/pull/22916))
- [fix][broker] fix deadlock when disable topic level Geo-Replication ([#22738](https://github.com/apache/pulsar/pull/22738))
- [fix][broker] fix topic partitions was expanded even if disabled topic level replication ([#22769](https://github.com/apache/pulsar/pull/22769))
- [fix][broker] maintain last active info in memory only. ([#22794](https://github.com/apache/pulsar/pull/22794))
- [fix][broker]Fix lookupService.getTopicsUnderNamespace can not work with a quote pattern ([#23014](https://github.com/apache/pulsar/pull/23014))
- [fix][broker][branch-3.2] Do not try to clean owned bundles from inactive source brokers (ExtensibleLoadManagerImpl only) ([#23064](https://github.com/apache/pulsar/pull/23064)) ([#23084](https://github.com/apache/pulsar/pull/23084))
- [cleanup][ml] ManagedCursor clean up. ([#22246](https://github.com/apache/pulsar/pull/22246))
- [fix] Make operations on `individualDeletedMessages` in lock scope ([#22966](https://github.com/apache/pulsar/pull/22966))
- [fix] Remove blocking calls from BookieRackAffinityMapping ([#22846](https://github.com/apache/pulsar/pull/22846))
- [fix][misc] Topic name from persistence name should decode local name ([#22879](https://github.com/apache/pulsar/pull/22879))
- [fix][ml] Add entry fail due to race condition about add entry failed/timeout and switch ledger ([#22221](https://github.com/apache/pulsar/pull/22221))
- [fix][ml] Fix race conditions in RangeCache ([#22789](https://github.com/apache/pulsar/pull/22789))
- [improve][ml] RangeCache refactoring: test race conditions and prevent endless loops ([#22814](https://github.com/apache/pulsar/pull/22814))
- [improve][ml] RangeCache refactoring follow-up: use StampedLock instead of synchronized ([#22818](https://github.com/apache/pulsar/pull/22818))
- [fix][ml]: subscription props could be lost in case of missing ledger during recovery ([#22637](https://github.com/apache/pulsar/pull/22637))
- [improve] Refactored BK ClientFactory to return futures ([#22853](https://github.com/apache/pulsar/pull/22853))
- [improve][broker] Clear thread local BrokerEntryMetadata instance before reuse ([#22752](https://github.com/apache/pulsar/pull/22752))
- [improve][broker] Close protocol handlers before unloading namespace bundles ([#22728](https://github.com/apache/pulsar/pull/22728))
- [improve][broker] GetPartitionMetadata fail also can produce messages ([#23050](https://github.com/apache/pulsar/pull/23050))
- [improve][broker] Improve exception for topic does not have schema to check ([#22974](https://github.com/apache/pulsar/pull/22974))
- [improve][broker] Include runtime dependencies in server distribution ([#22001](https://github.com/apache/pulsar/pull/22001))
- [improve][broker] Optimize PersistentTopic.getLastDispatchablePosition ([#22707](https://github.com/apache/pulsar/pull/22707))
- [improve][broker] Remove ClassLoaderSwitcher to avoid objects allocations and consistent the codestyle ([#22796](https://github.com/apache/pulsar/pull/22796))
- [improve][broker] Trigger offload on topic load ([#22652](https://github.com/apache/pulsar/pull/22652))
- [improve][broker] Use RoaringBitmap in tracking individual acks to reduce memory usage ([#23006](https://github.com/apache/pulsar/pull/23006))
- [improve][broker] avoid creating new objects when intercepting ([#22790](https://github.com/apache/pulsar/pull/22790))
- [improve][broker] make system topic distribute evenly. ([#22953](https://github.com/apache/pulsar/pull/22953))
- [improve][broker]Ensure namespace deletion doesn't fail ([#22627](https://github.com/apache/pulsar/pull/22627))
- [improve][broker][branch-3.0] PIP-364: Introduce a new load balance algorithm AvgShedder ([#23053](https://github.com/apache/pulsar/pull/23053))

### Client

- [fix][client] Fix negative acknowledgement by messageId ([#23060](https://github.com/apache/pulsar/pull/23060))
- [fix][client] Fix orphan consumer when reconnection and closing are concurrency executing ([#22958](https://github.com/apache/pulsar/pull/22958))
- [fix][client] Fix pattern consumer create crash if a part of partitions of a topic have been deleted ([#22854](https://github.com/apache/pulsar/pull/22854))
- [fix][client] Fix resource leak in Pulsar Client since HttpLookupService doesn't get closed ([#22858](https://github.com/apache/pulsar/pull/22858))
- [improve][client] improve the class GetTopicsResult ([#22766](https://github.com/apache/pulsar/pull/22766))

### Pulsar IO and Pulsar Functions

- [fix][fn] Enable optimized Netty direct byte buffer support for Pulsar Function runtimes ([#22910](https://github.com/apache/pulsar/pull/22910))
- [fix][fn] Support compression type and crypto config for all producers in Functions and Connectors ([#22950](https://github.com/apache/pulsar/pull/22950))
- [improve][fn] Make producer cache bounded and expiring in Functions/Connectors ([#22945](https://github.com/apache/pulsar/pull/22945))

### Others

- [fix][cli] Fix Pulsar standalone "--wipe-data" ([#22885](https://github.com/apache/pulsar/pull/22885))
- [fix][cli] Fix Pulsar standalone shutdown - bkCluster wasn't closed ([#22868](https://github.com/apache/pulsar/pull/22868))
- [fix][cli] Fix expiration of tokens created with "pulsar tokens create" ([#22815](https://github.com/apache/pulsar/pull/22815))
- [fix][cli] Fix the pulsar-daemon parameter passthrough syntax ([#22905](https://github.com/apache/pulsar/pull/22905))
- [fix][meta] Check if metadata store is closed in RocksdbMetadataStore ([#22852](https://github.com/apache/pulsar/pull/22852))
- [fix][offload] Break the fillbuffer loop when met EOF ([#22722](https://github.com/apache/pulsar/pull/22722))

### Library updates

- [fix][sec] Upgrade Bouncycastle libraries to address CVEs ([#22826](https://github.com/apache/pulsar/pull/22826))
- [improve] Upgrade IPAddress to 5.5.0 ([#22886](https://github.com/apache/pulsar/pull/22886))
- [improve] Upgrade Jetcd to 0.7.7 and VertX to 4.5.8 ([#22835](https://github.com/apache/pulsar/pull/22835))
- [cleanup][misc] Remove classifier from netty-transport-native-unix-common dependency ([#22951](https://github.com/apache/pulsar/pull/22951))
- [fix][misc] Remove RoaringBitmap dependency from pulsar-common ([#23008](https://github.com/apache/pulsar/pull/23008))
- [fix][misc] Rename netty native libraries in pulsar-client-admin-shaded ([#22954](https://github.com/apache/pulsar/pull/22954))
- [improve][misc] Replace rename-netty-native-libs.sh script with renaming with maven-shade-plugin ([#22957](https://github.com/apache/pulsar/pull/22957))
- [improve][misc] Upgrade to Netty 4.1.111.Final and switch to use grpc-netty-shaded ([#22892](https://github.com/apache/pulsar/pull/22892))
- [improve][misc][branch-3.2] Upgrade to Bookkeeper 4.16.6 ([#22963](https://github.com/apache/pulsar/pull/22963))

### Tests & CI

- [fix][ci] Fix OWASP Dependency Check download by using NVD API key ([#22999](https://github.com/apache/pulsar/pull/22999))
- [fix][ci] Fix jacoco code coverage report aggregation ([#22964](https://github.com/apache/pulsar/pull/22964))
- [fix][ci] Replace removed macos-11 with macos-latest in GitHub Actions ([#22965](https://github.com/apache/pulsar/pull/22965))
- [fix][test] Fix TableViewBuilderImplTest NPE and infinite loop ([#22924](https://github.com/apache/pulsar/pull/22924))
- [improve][build] Support git worktree working directory while building docker images ([#22851](https://github.com/apache/pulsar/pull/22851))
- [improve][build] Upgrade dependency-check-maven-plugin to 10.0.2 ([#23012](https://github.com/apache/pulsar/pull/23012))
- [improve][ci] Migrate from Gradle Enterprise to Develocity ([#22880](https://github.com/apache/pulsar/pull/22880))
- [improve][ci] Switch to use DEVELOCITY_ACCESS_KEY from GRADLE_ENTERPRISE_ACCESS_KEY ([#23090](https://github.com/apache/pulsar/pull/23090))
- [improve][test] Add a test to guarantee the TNX topics will not be replicated ([#22721](https://github.com/apache/pulsar/pull/22721))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.2.3...v3.2.4).