---
id: pulsar-3.0.4
title: Apache Pulsar 3.0.4
sidebar_label: Apache Pulsar 3.0.4
---

#### 2024-04-02

### Broker

- [fix][broker] Avoid execute prepareInitPoliciesCacheAsync if namespace is deleted ([#22268](https://github.com/apache/pulsar/pull/22268))
- [fix][broker] Avoid expired unclosed ledgers when checking expired messages by ledger closure time ([#22335](https://github.com/apache/pulsar/pull/22335))
- [fix][broker] Check cursor state before adding it to the `waitingCursors` ([#22191](https://github.com/apache/pulsar/pull/22191))
- [fix][broker] Close dispatchers stuck due to mismatch between dispatcher.consumerList and dispatcher.consumerSet ([#22270](https://github.com/apache/pulsar/pull/22270))
- [fix][broker] Fix OpReadEntry.skipCondition NPE issue ([#22367](https://github.com/apache/pulsar/pull/22367))
- [fix][broker] Fix ResourceGroup report local usage ([#22340](https://github.com/apache/pulsar/pull/22340))
- [fix][broker] Fix ResourceGroups loading ([#21781](https://github.com/apache/pulsar/pull/21781))
- [fix][broker] Fix issue of field 'topic' is not set when handle GetSchema request ([#22377](https://github.com/apache/pulsar/pull/22377))
- [fix][broker] Fix wrong double-checked locking for readOnActiveConsumerTask in dispatcher ([#22279](https://github.com/apache/pulsar/pull/22279))
- [fix][broker] fix mismatch between dispatcher.consumerList and dispatcher.consumerSet ([#22283](https://github.com/apache/pulsar/pull/22283))
- [fix][ml]Expose ledger timestamp  ([#22338](https://github.com/apache/pulsar/pull/22338))
- [improve][admin] Fix the `createMissingPartitions` doesn't response correctly ([#22311](https://github.com/apache/pulsar/pull/22311))
- [improve][broker] Add createTopicIfDoesNotExist option to RawReader constructor ([#22264](https://github.com/apache/pulsar/pull/22264))
- [improve][broker] Add fine-grain authorization to ns/topic management endpoints ([#22309](https://github.com/apache/pulsar/pull/22309))
- [improve][broker] Add missing configuration keys for caching catch-up reads ([#22295](https://github.com/apache/pulsar/pull/22295))
- [improve][broker] Change log level to reduce duplicated logs ([#22147](https://github.com/apache/pulsar/pull/22147))

### Client

- [fix][client] Consumer lost message ack due to race condition in acknowledge with batch message ([#22353](https://github.com/apache/pulsar/pull/22353))
- [fix][client] Fix wrong results of hasMessageAvailable and readNext after seeking by timestamp ([#22363](https://github.com/apache/pulsar/pull/22363))
- [fix][client] GenericProtobufNativeSchema not implement getNativeSchema method. ([#22204](https://github.com/apache/pulsar/pull/22204))
- [fix][client] Unclear error message when creating a consumer with two same topics ([#22255](https://github.com/apache/pulsar/pull/22255))
- [fix][client] fix Reader.hasMessageAvailable might return true after seeking to latest ([#22201](https://github.com/apache/pulsar/pull/22201))
- [fix][client]Fixed getting an incorrect `maxMessageSize` value when accessing multiple clusters in the same process ([#22306](https://github.com/apache/pulsar/pull/22306))
- [improve][client] Add backoff for `seek` ([#20963](https://github.com/apache/pulsar/pull/20963))

### Pulsar IO and Pulsar Functions

- [fix][fn] enable Go function token auth and TLS ([#20468](https://github.com/apache/pulsar/pull/20468))

### Others

- [improve][misc] Remove the call to sun InetAddressCachePolicy ([#22329](https://github.com/apache/pulsar/pull/22329))
- [fix][misc] Make ConcurrentBitSet thread safe ([#22361](https://github.com/apache/pulsar/pull/22361))
- [fix][ws] Check the validity of config before start websocket service ([#22231](https://github.com/apache/pulsar/pull/22231))

### Library updates

- [fix][sec] Upgrade jose4j to 0.9.4 ([#22273](https://github.com/apache/pulsar/pull/22273))
- [fix][sec] Bump google.golang.org/grpc from 1.38.0 to 1.56.3 in /pulsar-function-go ([#21444](https://github.com/apache/pulsar/pull/21444))
- [fix][sec] Go Functions security updates ([#21844](https://github.com/apache/pulsar/pull/21844))
- [fix][sec] Upgrade Zookeeper to 3.9.2 to address CVE-2024-23944 ([#22275](https://github.com/apache/pulsar/pull/22275))
- [fix][sec] Upgrade prometheus client_golang to v1.12.2 to fix CVE-2022-21698 ([#20579](https://github.com/apache/pulsar/pull/20579))
- [fix][build] Upgrade alluxio version to 2.9.3 to fix CVE-2023-38889 ([#21715](https://github.com/apache/pulsar/pull/21715))
- [improve][misc] Include native epoll library for Netty for arm64 ([#22319](https://github.com/apache/pulsar/pull/22319))
- [improve][misc] Pin Netty version in pulsar-io/alluxio ([#21728](https://github.com/apache/pulsar/pull/21728))
- [improve][misc] Upgrade Netty version to 4.1.105.Final ([#21923](https://github.com/apache/pulsar/pull/21923))

### Tests & CI

- [fix][ci] Tolerate mount option change failing in CI ([#22241](https://github.com/apache/pulsar/pull/22241))
- [fix][ci][branch-3.0] Increase Maven's heap size from 1024m to 1500m as it is in master
- [fix][test] Fix flaky ManagedLedgerErrorsTest.recoverAfterZnodeVersionError ([#22368](https://github.com/apache/pulsar/pull/22368))
- [fix][test] Fix flaky RGUsageMTAggrWaitForAllMsgsTest ([#22252](https://github.com/apache/pulsar/pull/22252))
- [fix][test] Fix flaky test BrokerServiceAutoSubscriptionCreationTest ([#22190](https://github.com/apache/pulsar/pull/22190))
- [fix][test] Fix flaky test ManagedLedgerTest.testGetNumberOfEntriesInStorage ([#22344](https://github.com/apache/pulsar/pull/22344))
- [fix][test][branch-3.0] Fix broken ManagedLedgerTest.testGetNumberOfEntriesInStorage
- [fix][test] Fix the tests with same namespace name ([#22240](https://github.com/apache/pulsar/pull/22240))
- [improve][test][branch-3.0] Improve ManagedLedgerTest.testGetNumberOfEntriesInStorage
- [improve][misc] Upgrade checkstyle to 10.14.2 ([#22291](https://github.com/apache/pulsar/pull/22291))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.3...v3.0.4).