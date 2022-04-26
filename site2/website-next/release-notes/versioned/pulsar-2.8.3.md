---
id: pulsar-2.8.3
title: Apache Pulsar 2.8.3 
sidebar_label: Apache Pulsar 2.8.3 
---

#### 2022-03-21

### Important Notices

- Fix detecting number of NICs in EC2 [#14252](https://github.com/apache/pulsar/pull/14252). In the event that Pulsar cannot determine the NIC speed from the host, please set `loadBalancerOverrideBrokerNicSpeedGbps`.
- Bump BookKeeper 4.14.3 [12906](https://github.com/apache/pulsar/pull/12906)
- Add broker config `isAllowAutoUpdateSchema` [12786](https://github.com/apache/pulsar/pull/12786)

### Security
- Upgrade Postgres driver to 42.2.25 to get rid of CVE-2022-21724 [14119](https://github.com/apache/pulsar/pull/14119)
- Get rid of CVEs in Solr connector [13822](https://github.com/apache/pulsar/pull/13822)
- Get rid of CVEs in InfluxDB connector [13821](https://github.com/apache/pulsar/pull/13821)
- Get rid of CVEs in batch-data-generator [13820](https://github.com/apache/pulsar/pull/13820)
- Get rid of CVEs brought in with aerospike [13819](https://github.com/apache/pulsar/pull/13819)
- [owasp] suppress false positive Avro CVE-2021-43045 [13764](https://github.com/apache/pulsar/pull/13764)
- Upgrade protobuf to 3.16.1 to address CVE-2021-22569 [13695](https://github.com/apache/pulsar/pull/13695)
- Upgrade Jackson to 2.12.6 [13694](https://github.com/apache/pulsar/pull/13694)
- Upgrade Log4j to 2.17.1 to address CVE-2021-44832 [13552](https://github.com/apache/pulsar/pull/13552)
- Cipher params not work in KeyStoreSSLContext [13322](https://github.com/apache/pulsar/pull/13322)
- [Broker] Remove tenant permission verification when list partitioned-topic [13138](https://github.com/apache/pulsar/pull/13138)
- Use JDK default security provider when Conscrypt isn't available [12938](https://github.com/apache/pulsar/pull/12938)
- [Authorization] Return if namespace policies are read only [12514](https://github.com/apache/pulsar/pull/12514)

### Pulsar Admin
- Make sure policies.is_allow_auto_update_schema not null [14409](https://github.com/apache/pulsar/pull/14409)
- pulsar admin exposes secret for source and sink [13059](https://github.com/apache/pulsar/pull/13059)
- Fix deleting tenants with active namespaces with 500. [13020](https://github.com/apache/pulsar/pull/13020)
- [function] pulsar admin exposes secrets for function [12950](https://github.com/apache/pulsar/pull/12950)

### Bookkeeper
- Upgrade BK to 4.14.4 and Grpc to 1.42.1 [13714](https://github.com/apache/pulsar/pull/13714)
- Bump BookKeeper 4.14.3 [12906](https://github.com/apache/pulsar/pull/12906)

### Broker
- Fix the wrong parameter in the log. [14309](https://github.com/apache/pulsar/pull/14309)
- Fix batch ack count is negative issue. [14288](https://github.com/apache/pulsar/pull/14288)
- bug fix: IllegalArgumentException: Invalid period 0.0 to calculate rate [14280](https://github.com/apache/pulsar/pull/14280)
- Clean up individually deleted messages before the mark-delete position [14261](https://github.com/apache/pulsar/pull/14261)
- If mark-delete operation fails, mark the cursor as "dirty" [14256](https://github.com/apache/pulsar/pull/14256)
- Fixed detecting number of NICs in EC2 [14252](https://github.com/apache/pulsar/pull/14252)
- Remove log unacked msg. [14246](https://github.com/apache/pulsar/pull/14246)
- Change broker producer fence log level [14196](https://github.com/apache/pulsar/pull/14196)
- Fix NPE of cumulative ack mode and incorrect unack message count [14021](https://github.com/apache/pulsar/pull/14021)
- KeyShared stickyHashRange subscription: prevent stuck subscription in case of consumer restart [14014](https://github.com/apache/pulsar/pull/14014)
- Trim configuration value string which contains blank prefix or suffix [13984](https://github.com/apache/pulsar/pull/13984)
- waitingCursors potential  heap memory leak  [13939](https://github.com/apache/pulsar/pull/13939)
- Fix read schema compatibility strategy priority [13938](https://github.com/apache/pulsar/pull/13938)
- NPE when get isAllowAutoUploadSchema [13831](https://github.com/apache/pulsar/pull/13831)
- Fix call sync method in async rest API for ``internalGetSubscriptionsForNonPartitionedTopic`` [13745](https://github.com/apache/pulsar/pull/13745)
- Fix the deadlock while using zookeeper thread to create ledger [13744](https://github.com/apache/pulsar/pull/13744)
- Fix inefficient forEach loop [13742](https://github.com/apache/pulsar/pull/13742)
- [Issue 13640] Fix non persistent topic subscription error. [13685](https://github.com/apache/pulsar/pull/13685)
- Fix invalid rack name cause bookie join rack failed [13683](https://github.com/apache/pulsar/pull/13683)
- Avoid call sync method in async rest API for force delete subscription  [13668](https://github.com/apache/pulsar/pull/13668)
- Avoid call sync method in async rest API for delete subscription [13666](https://github.com/apache/pulsar/pull/13666)
- Fix getInternalStats occasional lack of LeaderInfo [13656](https://github.com/apache/pulsar/pull/13656)
- Fix reader skipped remaining compacted data during the topic unloading. [13629](https://github.com/apache/pulsar/pull/13629)
- [Issue 13479] Fixed internal topic effect by InactiveTopicPolicy. [13611](https://github.com/apache/pulsar/pull/13611)
- Fix bug :Infinity value for CPU or Bandwidth usage [13609](https://github.com/apache/pulsar/pull/13609)
- Change ``ContextClassLoader`` to ``NarClassLoader`` in BrokerInterceptor [13589](https://github.com/apache/pulsar/pull/13589)
- Fix NPE when unloading namespace bundle [13571](https://github.com/apache/pulsar/pull/13571)
- update log content  [13540](https://github.com/apache/pulsar/pull/13540)
- Return message ID from compacted ledger while the compaction cursor reach the end of the topic [13533](https://github.com/apache/pulsar/pull/13533)
- Change ContextClassLoader to NarClassLoader in AdditionalServlet [13501](https://github.com/apache/pulsar/pull/13501)
- fix(Auth): Fix multi roles authz cannot handle empty roles case [13477](https://github.com/apache/pulsar/pull/13477)
- Fix getting the last message-id from an empty compact ledger [13476](https://github.com/apache/pulsar/pull/13476)
- Fixes the NPE in system topics policies service [13469](https://github.com/apache/pulsar/pull/13469)
- Fix race conditions in closing producers and consumers [13428](https://github.com/apache/pulsar/pull/13428)
- Fix batch message ack does not decrease the unacked-msg count. [13383](https://github.com/apache/pulsar/pull/13383)
- [Issue 13194][pulsar-broker] Fix dead loop in BacklogQuotaManager.dropBacklogForTimeLimit [13249](https://github.com/apache/pulsar/pull/13249)
- Modify return result of NamespacesBase#internalGetPublishRate [13237](https://github.com/apache/pulsar/pull/13237)
- Optimize ManagedLedger Ledger Ownership Check [13222](https://github.com/apache/pulsar/pull/13222)
- Close old compacted ledger when open new. [13210](https://github.com/apache/pulsar/pull/13210)
- Fix shedding heartbeat ns [13208](https://github.com/apache/pulsar/pull/13208)
- Fix when deleting topic with NotFoundException, do not return to client. [13203](https://github.com/apache/pulsar/pull/13203)
- Update cursor last active timestamp when reseting cursor  [13166](https://github.com/apache/pulsar/pull/13166)
- Remove tenant permission verification when list partitioned-topic [13138](https://github.com/apache/pulsar/pull/13138)
- Use current resourceUsage value as historyUsage when leader change in ThresholdShedder [13136](https://github.com/apache/pulsar/pull/13136)
- Don't attempt to delete pending ack store unless transactions are enabled [13041](https://github.com/apache/pulsar/pull/13041)
- Fix NPE in `PersistentTopic.checkSubscriptionTypesEnable` [12961](https://github.com/apache/pulsar/pull/12961)
- Fix wrong isEmpty method of ConcurrentOpenLongPairRangeSet [12953](https://github.com/apache/pulsar/pull/12953)
- Correct param of delete method for v1 topic [12936](https://github.com/apache/pulsar/pull/12936)
- Clean up the metadata of the non-persistent partitioned topics. [12910](https://github.com/apache/pulsar/pull/12910)
- Fix topic policy listener deleted by mistake. [12904](https://github.com/apache/pulsar/pull/12904)
- Fix deleting tenants with active namespaces with 500. [12848](https://github.com/apache/pulsar/pull/12848)
- [Issue 12757] add broker config isAllowAutoUpdateSchema [12786](https://github.com/apache/pulsar/pull/12786)
- Remove unused listeners if it have no listeners. [12654](https://github.com/apache/pulsar/pull/12654)
- Clean up the metadata of the non-persistent partitioned topics. [12550](https://github.com/apache/pulsar/pull/12550)
- [managedledger] NPE on OpAddEntry while ManagedLedger is closing [12364](https://github.com/apache/pulsar/pull/12364)
- fix issues 11964, deadlock bug when use key_shared mode [11965](https://github.com/apache/pulsar/pull/11965)

### Build
- [C++] Fix GCC compilation failure caused by warning macro [14402](https://github.com/apache/pulsar/pull/14402)
- [C++] Fix Version.h not found when CMake binary directory is customized [13324](https://github.com/apache/pulsar/pull/13324)
- [Issue 9888] add python3.9 on manylinux2014 build support [10954](https://github.com/apache/pulsar/pull/10954)

### CI
- Upgrade Windows runner os to windows-2022 and generator [14368](https://github.com/apache/pulsar/pull/14368)
- Replace deprecated "adopt" OpenJDK distribution with "temurin" in GitHub Actions config [12945](https://github.com/apache/pulsar/pull/12945)

### Pulsar CLI
- Feat(cli): support autorecovery service in pulsar cli [12985](https://github.com/apache/pulsar/pull/12985)
- [pulsar-perf] Write histogram files for consume command [12569](https://github.com/apache/pulsar/pull/12569)

### Compaction
- Fix reader skipped remaining compacted data during the topic unloading. [13629](https://github.com/apache/pulsar/pull/13629)
- Return message ID from compacted ledger while the compaction cursor reach the end of the topic [13533](https://github.com/apache/pulsar/pull/13533)
- [Broker] Fix getting the last message-id from an empty compact ledger [13476](https://github.com/apache/pulsar/pull/13476)

### Functions
- Fix(functions): missing runtime set in GoInstanceConfig [13031](https://github.com/apache/pulsar/pull/13031)
- [function] pulsar admin exposes secrets for function [12950](https://github.com/apache/pulsar/pull/12950)

### Pulsar IO
- Pulsar admin exposes secret for source and sink [13059](https://github.com/apache/pulsar/pull/13059)
- Pass client builder if no service url provided to debezium connector  [12145](https://github.com/apache/pulsar/pull/12145)
- [Cherry-pick] Pass client builder to debezium database history [12112](https://github.com/apache/pulsar/pull/12112)
- Pass client builder if no service url provided to debezium connector [14040](https://github.com/apache/pulsar/pull/14040)

### Key-Shared Subscription
- [Issue 12885] Fix unordered consuming case in Key_Shared subscription. [12890](https://github.com/apache/pulsar/pull/12890)

### Pulsar Metadata
- AbstractMetadataStore: invalidate childrenCache correctly when node created [14177](https://github.com/apache/pulsar/pull/14177)

### Metrics
- Fix: bug when allAll bucket [13467](https://github.com/apache/pulsar/pull/13467)

### Pulsar proxy
- Fix port exhaustion and connection issues in Pulsar Proxy [14078](https://github.com/apache/pulsar/pull/14078)
- Allow config of IO and acceptor threads in proxy [14054](https://github.com/apache/pulsar/pull/14054)
- Remove unnecessary Pulsar Client usage from Pulsar Proxy [13836](https://github.com/apache/pulsar/pull/13836)

### Schema
- Fix parse BigDecimal [14019](https://github.com/apache/pulsar/pull/14019)
- Fix pulsar use json or avro primitive schema. [12886](https://github.com/apache/pulsar/pull/12886)

### SQL
- Support protobuf/timestamp [13287](https://github.com/apache/pulsar/pull/13287)
- Fix time field use error [12249](https://github.com/apache/pulsar/pull/12249)

### Test
- Improved 9 flaky tests.

### Tools
- Fix NPE in cmdTopics [13450](https://github.com/apache/pulsar/pull/13450)
- [pulsar-perf] Support listenerThreads configuration. [12892](https://github.com/apache/pulsar/pull/12892)
- [docs] Fix doc for pulsar-admin bookies cmd [12542](https://github.com/apache/pulsar/pull/12542)

### Topic policy
- [Broker] Avoid thread deadlock problem when creating topic policy reader [13837](https://github.com/apache/pulsar/pull/13837)
- Fixed internal topic effect by InactiveTopicPolicy. [13816](https://github.com/apache/pulsar/pull/13816)

### Transaction
- Fix topicTransactionBuffer handle null snapshot (#12758) [14510](https://github.com/apache/pulsar/pull/14510)
- Fix transaction system topic create in loop [12889](https://github.com/apache/pulsar/pull/12889)
- Fix transaction system topic create in loop. [12749](https://github.com/apache/pulsar/pull/12749)

### Dependency
- Upgrade Gson version 2.8.6 to 2.8.9 [13610](https://github.com/apache/pulsar/pull/13610)
- Upgrade commons-cli to 1.5.0 [14094](https://github.com/apache/pulsar/pull/14094)
- Bump netty version to 4.1.74.Final [14257](https://github.com/apache/pulsar/pull/14257) 

