---
id: pulsar-3.2.2
title: Apache Pulsar 3.2.2
sidebar_label: Apache Pulsar 3.2.2
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
- [fix][offload] Fix Offload readHandle cannot close multi times. ([#22162](https://github.com/apache/pulsar/pull/22162))
- [fix][txn]Fix TopicTransactionBuffer potential thread safety issue ([#22149](https://github.com/apache/pulsar/pull/22149))
- [improve][admin] Fix the `createMissingPartitions` doesn't response correctly ([#22311](https://github.com/apache/pulsar/pull/22311))
- [improve][broker] Add createTopicIfDoesNotExist option to RawReader constructor ([#22264](https://github.com/apache/pulsar/pull/22264))
- [improve][broker] Add fine-grain authorization to ns/topic management endpoints ([#22305](https://github.com/apache/pulsar/pull/22305))
- [improve][broker] Add missing configuration keys for caching catch-up reads ([#22295](https://github.com/apache/pulsar/pull/22295))
- [improve][broker] Support create RawReader based on configuration ([#22280](https://github.com/apache/pulsar/pull/22280))

### Client

- [fix][client] Consumer lost message ack due to race condition in acknowledge with batch message ([#22353](https://github.com/apache/pulsar/pull/22353))
- [fix][client] Do no retrying for error subscription not found when disabled allowAutoSubscriptionCreation ([#22164](https://github.com/apache/pulsar/pull/22164))
- [fix][client] Fix wrong results of hasMessageAvailable and readNext after seeking by timestamp ([#22363](https://github.com/apache/pulsar/pull/22363))
- [fix][client] GenericProtobufNativeSchema not implement getNativeSchema method. ([#22204](https://github.com/apache/pulsar/pull/22204))
- [fix][client] Unclear error message when creating a consumer with two same topics ([#22255](https://github.com/apache/pulsar/pull/22255))
- [fix][client] fix Reader.hasMessageAvailable might return true after seeking to latest ([#22201](https://github.com/apache/pulsar/pull/22201))
- [fix][client]Fixed getting an incorrect `maxMessageSize` value when accessing multiple clusters in the same process ([#22306](https://github.com/apache/pulsar/pull/22306))

### Others

- [fix][misc] Make ConcurrentBitSet thread safe ([#22361](https://github.com/apache/pulsar/pull/22361))
- [improve][misc] Remove the call to sun InetAddressCachePolicy ([#22329](https://github.com/apache/pulsar/pull/22329))
- [fix][ws] Check the validity of config before start websocket service ([#22231](https://github.com/apache/pulsar/pull/22231))

### Library updates

- [fix][sec] Upgrade jose4j to 0.9.4 ([#22273](https://github.com/apache/pulsar/pull/22273))
- [fix][sec] Go Functions security updates ([#21844](https://github.com/apache/pulsar/pull/21844))
- [fix][sec] Upgrade Zookeeper to 3.9.2 to address CVE-2024-23944 ([#22275](https://github.com/apache/pulsar/pull/22275))
- [improve][misc] Include native epoll library for Netty for arm64 ([#22319](https://github.com/apache/pulsar/pull/22319))
- [improve][misc] Upgrade Netty version to 4.1.105.Final ([#21923](https://github.com/apache/pulsar/pull/21923))

### Tests & CI

- [fix][ci] Enable CI for branch-3.2 ([#22287](https://github.com/apache/pulsar/pull/22287))
- [fix][ci] Tolerate mount option change failing in CI ([#22241](https://github.com/apache/pulsar/pull/22241))
- [fix][test] Fix flaky ManagedLedgerErrorsTest.recoverAfterZnodeVersionError ([#22368](https://github.com/apache/pulsar/pull/22368))
- [fix][test] Fix flaky RGUsageMTAggrWaitForAllMsgsTest ([#22252](https://github.com/apache/pulsar/pull/22252))
- [fix][test] Fix flaky test BrokerServiceAutoSubscriptionCreationTest ([#22190](https://github.com/apache/pulsar/pull/22190))
- [fix][test] Fix flaky test ManagedLedgerTest.testGetNumberOfEntriesInStorage ([#22344](https://github.com/apache/pulsar/pull/22344))
- [fix][test] Fix thread leak in TopicPoliciesAuthZTest ([#22257](https://github.com/apache/pulsar/pull/22257))
- [fix][test][branch-3.2] Fix broken ManagedLedgerTest.testGetNumberOfEntriesInStorage
- [fix][fn] fix broken function-go test ([#22260](https://github.com/apache/pulsar/pull/22260))
- [fix][test] Fix the tests with same namespace name ([#22240](https://github.com/apache/pulsar/pull/22240))
- [fix][build] Fix version in pulsar-bom/pom.xml and fix src/set-project-version.sh
- [improve][test][branch-3.2] Improve ManagedLedgerTest.testGetNumberOfEntriesInStorage
- [improve][misc] Upgrade checkstyle to 10.14.2 ([#22291](https://github.com/apache/pulsar/pull/22291))

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.2.1...v3.2.2).