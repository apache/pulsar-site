---
id: pulsar-2.7.5
title: Apache Pulsar 2.7.5
sidebar_label: Apache Pulsar 2.7.5
---

#### 2022-09-03

#### Broker
- [fix][broker] Fix NPE when ledger id not found in `OpReadEntry`[#16966](https://github.com/apache/pulsar/pull/16966)
- [fix][broker] Validate rack name [#16850](https://github.com/apache/pulsar/pull/16850)
- [fix][broker] Fix invalid rack name cause bookie join rack failed [#16845](https://github.com/apache/pulsar/pull/16845)
- [fix][broker] Avoid potentially blocking calls to metadata in PersistentTopic#getMessageTTL [#16899](https://github.com/apache/pulsar/pull/16899)
- [fix][broker] Fix create client with TLS config [#16326](https://github.com/apache/pulsar/pull/16326)
- [fix][broker] Fixed deadlock on metadata cache missing while doing checkReplication [#16889](https://github.com/apache/pulsar/pull/16889)
- [fix][broker] Fix the wrong unit of NIC speed on Linux  [#15770](https://github.com/apache/pulsar/pull/15770)
- [fix][broker] Close connection if a ping or pong message cannot be sent [#15382](https://github.com/apache/pulsar/pull/15382)
- [fix][broker] Fix MessageDeduplication#inactiveProducers may not be persistence correctly [#15206](https://github.com/apache/pulsar/pull/15206)
- [fix][broker] Fix messageDedup delete inactive producer name [#12493](https://github.com/apache/pulsar/pull/12493)
- [fix][broker] Fix the reader skips compacted data which original ledger been removed. [#16407](https://github.com/apache/pulsar/pull/16407)
- [fix][broker] Fix getting the last message-id from an empty compact ledger. [#16402](https://github.com/apache/pulsar/pull/16402)
- [fix][broker] Return message ID from compacted ledger while the compaction cursor reaches the end of the topic. [#16395](https://github.com/apache/pulsar/pull/16395)
- [fix][broker] Fix skips compacted data for reader/consumer [#16301](https://github.com/apache/pulsar/pull/16301)
- [fix][broker] Fix reader skipped remaining compacted data during the topic unloading [#16300](https://github.com/apache/pulsar/pull/16300)
- [fix][broker] Fix passing incorrect authentication data [#16201](https://github.com/apache/pulsar/pull/16201)
- [fix][broker] Fix incorrect returned last message ID while the lastConfirmedEntry with negative entry ID [#16299](https://github.com/apache/pulsar/pull/16299)
- [fix][broker] Fix can not enable system topic if `AutoUpdateSchemaEnabled=false`. [#15754](https://github.com/apache/pulsar/pull/15754)
- [fix][broker] Fix lost message issue due to ledger rollover. [#14703](https://github.com/apache/pulsar/pull/14703)
- [fix][broker] Fix lost message issues 12221 [#12223](https://github.com/apache/pulsar/pull/12223)
- [fix][broker] Fix TopicPoliciesCacheNotInitException issue. [#14293](https://github.com/apache/pulsar/pull/14293)
- [fix][broker] Fix deadlock when use key_shared mode [#11965](https://github.com/apache/pulsar/pull/11965)
- [fix][broker] Fix log content error when OverloadShedder is not used. [#13540](https://github.com/apache/pulsar/pull/13540)
- [improve][broker] Skip unnecessary DNS resolution when creating AuthenticationDataHttp instance [#15221](https://github.com/apache/pulsar/pull/15221)
- [improve][broker] Improve error logging for topic not found [#13950) [#14893](https://github.com/apache/pulsar/pull/14893)
- [improve][broker] Trim configuration value string which contains blank prefix or suffix string [#13984](https://github.com/apache/pulsar/pull/13984)
- [improve][broker] Configure DLog Bookie, Pulsar, and Admin clients via pass-through config [#15818](https://github.com/apache/pulsar/pull/15818)
- [cleanup][broker] Improve skipping of DNS resolution when creating AuthenticationDataHttp instance [#15228](https://github.com/apache/pulsar/pull/15228)
- [cleanup][broker] Remove useless code to avoid confusion in OpReadEntry#checkReadCompletion. [#15104](https://github.com/apache/pulsar/pull/15104)
- [cleanup][broker] Clean up individually deleted messages before the mark-delete position [#14261](https://github.com/apache/pulsar/pull/14261)

#### Security
- [improve][sec] Improve get the basic authentication config [#16947](https://github.com/apache/pulsar/pull/16947)
- [improve][sec] Support for get token from HTTP params [#16892](https://github.com/apache/pulsar/pull/16892)
- [fix][sec] AuthorizationService should use provider's canLookupAsync method [#11777](https://github.com/apache/pulsar/pull/11777)
- [fix][sec] Avoid AuthenticationDataSource mutation for subscription name [#16065](https://github.com/apache/pulsar/pull/16065)
- [fix][sec] Return if namespace policies are read only [#12514](https://github.com/apache/pulsar/pull/12514)
- [refactor][sec] Switch to rely on Netty for Hostname Verification [#15824](https://github.com/apache/pulsar/pull/15824)
- [cleanup][sec] Ignore case when obfuscating passwords in configuration scripts [#15077](https://github.com/apache/pulsar/pull/15077)

#### Storage
- [fix][storage] ManagedCursor: mark delete no callback when create meta-ledger fail [#16841](https://github.com/apache/pulsar/pull/16841)
- [fix][storage] Cancel offload tasks when managed ledger closed [#16808](https://github.com/apache/pulsar/pull/16808)
- [fix][storage] Fix lost compaction data due to compaction properties missed during reset-cursor. [#16404](https://github.com/apache/pulsar/pull/16404)
- [fix][storage] Do not move the non-durable cursor position when trimming ledgers while topic with compaction. [#16403](https://github.com/apache/pulsar/pull/16403)
- [fix][storage] Fix issues in advanceNonDurableCursors [#10667](https://github.com/apache/pulsar/pull/10667)
- [fix][storage] Follow up on race condition fixes in ManagedCursorImpl #15031 [#15067](https://github.com/apache/pulsar/pull/15067)
- [fix][storage] Fix race condition in updating lastMarkDeleteEntry field [#15031](https://github.com/apache/pulsar/pull/15031)
- [fix][storage] Fix NPE when removing cursor [#12297](https://github.com/apache/pulsar/pull/12297)
- [improve][storage] If mark-delete operation fails, mark the cursor as "dirty" [#14256](https://github.com/apache/pulsar/pull/14256)

#### Proxy
- [fix][proxy] Fix client service url [#16894](https://github.com/apache/pulsar/pull/16894)
- [fix][proxy] Prevent leak of unreleased lookupRequestSemaphore permits [#13812](https://github.com/apache/pulsar/pull/13812)
- [fix][proxy] Remove unnecessary blocking DNS lookup in LookupProxyHandler [#15415](https://github.com/apache/pulsar/pull/15415)
- [fix][proxy] Fix proxy connection leak when inbound connection closes while connecting is in progress [#15366](https://github.com/apache/pulsar/pull/15366)
- [fix][proxy] Fix port exhaustion and connection issues in Pulsar Proxy [#14078](https://github.com/apache/pulsar/pull/14078)
- [fix][proxy] Fix DNS server denial-of-service issue when DNS entry expires [#15403](https://github.com/apache/pulsar/pull/15403)
- [fix][proxy] Configure Netty DNS resolver to match JDK DNS caching setting, share DNS resolver instance in Proxy [#15219](https://github.com/apache/pulsar/pull/15219)
- [refactor][proxy] Refactor Proxy code and fix connection stalling by switching to auto read mode [#14713](https://github.com/apache/pulsar/pull/14713)
- [improve][proxy] Fail proxy startup if brokerServiceURL is missing scheme [#14682](https://github.com/apache/pulsar/pull/14682)
- [improve][proxy] Remove unnecessary Pulsar Client usage from Pulsar Proxy [#13836](https://github.com/apache/pulsar/pull/13836)

#### Admin
- [fix][admin] Fix validateGlobalNamespaceOwnership wrap exception issue. [#14269](https://github.com/apache/pulsar/pull/14269)
- [cleanup][admin] Update/fix Swagger Annotation for param: authoritative [#16222](https://github.com/apache/pulsar/pull/16222)

#### Function
- [fix][fn] Fix python instance not process zip file correctly [#16697](https://github.com/apache/pulsar/pull/16697)

#### Test & Others
- [improve][test] Verify the authentication data in the authorization provider [#16945](https://github.com/apache/pulsar/pull/16945)
- [improve][test] Exclude inner classes in surefire [#9875](https://github.com/apache/pulsar/pull/9875)
- [fix][test] Enable ignored tests [#16435](https://github.com/apache/pulsar/pull/16435)
- [fix][test] Fix setting Bookie dbStorage_*CacheMaxSizeMb in pulsar-test-latest-version docker image [#9623](https://github.com/apache/pulsar/pull/9623)
- [improve][doc] Add more configuration methods for basic authentication [#16941](https://github.com/apache/pulsar/pull/16941)
- [fix][build] Use grpc-bom to align grpc library versions [#15234](https://github.com/apache/pulsar/pull/15234)
- [improve][ci] Add set up Java [#16430](https://github.com/apache/pulsar/pull/16430)
- Update notice year. [#13653](https://github.com/apache/pulsar/pull/13653)

#### Dependency Updates
- Upgrade protobuf to 3.16.1 to address CVE-2021-22569 [#13695](https://github.com/apache/pulsar/pull/13695)
- Upgrade aircompressor to 0.20 [#11790](https://github.com/apache/pulsar/pull/11790)
- Upgrade the BookKeeper version to 4.12.1 [#16775](https://github.com/apache/pulsar/pull/16775)
- Upgrade Gson version 2.8.6 to 2.8.9 [#13610](https://github.com/apache/pulsar/pull/13610)
- Upgrade Log4j2 to 2.17.1 [#13552](https://github.com/apache/pulsar/pull/13552)
- Upgrade log4j2 version to 2.18.0 [#16884](https://github.com/apache/pulsar/pull/16884)