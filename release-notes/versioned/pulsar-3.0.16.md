---
id: pulsar-3.0.16
title: Apache Pulsar 3.0.16
sidebar_label: Apache Pulsar 3.0.16
---

#### 2026-02-16

### Library updates

- [fix][sec] Bump github.com/dvsekhvalnov/jose2go from 1.6.0 to 1.7.0 in /pulsar-function-go ([#24987](https://github.com/apache/pulsar/pull/24987))
- [fix][sec] Upgrade jose4j to 0.9.6 to address CVE-2024-29371 ([#25095](https://github.com/apache/pulsar/pull/25095))
- [fix][sec] Upgrade log4j to 2.25.3 to address CVE-2025-68161 ([#25102](https://github.com/apache/pulsar/pull/25102))
- [fix][sec] Upgrade Netty to 4.1.130.Final ([#25078](https://github.com/apache/pulsar/pull/25078))
- [fix][sec] Upgrade vertx to address CVE-2026-1002 ([#25152](https://github.com/apache/pulsar/pull/25152))
- [fix][test] Upgrade docker-java to 3.7.0 ([#25209](https://github.com/apache/pulsar/pull/25209))
- [fix] Upgrade gson to 2.13.2 ([#25022](https://github.com/apache/pulsar/pull/25022))

### Broker

- [fix][broker] Fix chunked message loss when no consumers are available ([#25077](https://github.com/apache/pulsar/pull/25077))
- [fix][broker] Fix creation of replicated subscriptions for partitioned topics ([#24997](https://github.com/apache/pulsar/pull/24997))
- [fix][broker] Fix httpProxyTimeout config ([#25223](https://github.com/apache/pulsar/pull/25223))
- [fix][broker] Fix incomplete futures in topic property update/delete methods ([#25228](https://github.com/apache/pulsar/pull/25228))
- [fix][broker] Fix issue with schemaValidationEnforced in geo-replication ([#25012](https://github.com/apache/pulsar/pull/25012))
- [fix][broker] Fix MultiRolesTokenAuthorizationProvider error when subscription prefix doesn't match. ([#25121](https://github.com/apache/pulsar/pull/25121))
- [fix][broker] Fix regex matching of namespace name which might contain a regex char ([#25136](https://github.com/apache/pulsar/pull/25136))
- [fix][broker] Fix transactionMetadataFuture completeExceptionally with null value ([#25231](https://github.com/apache/pulsar/pull/25231))
- [fix][broker] Fix various error-prone detected errors mainly in logging and String.format parameters ([#25059](https://github.com/apache/pulsar/pull/25059))
- [fix][broker] Force EnsemblePolicies to resolve network location after rackInfoMap is updated due to changes in /ledgers/available znode ([#25067](https://github.com/apache/pulsar/pull/25067))
- [fix][broker] Use `poll` instead `remove` to avoid `NoSuchElementException` ([#24933](https://github.com/apache/pulsar/pull/24933))
- [fix][broker][branch-3.0] fix prepareInitPoliciesCacheAsync in SystemTopicBasedTopicPoliciesService ([#24978](https://github.com/apache/pulsar/pull/24978))
- [fix][admin] Fix asyncGetRequest to handle 204 ([#25124](https://github.com/apache/pulsar/pull/25124))
- [fix][ml] Fix NoSuchElementException in EntryCountEstimator caused by a race condition ([#25177](https://github.com/apache/pulsar/pull/25177))
- [fix][meta] Use `getChildrenFromStore` to read children data to avoid lost data ([#24665](https://github.com/apache/pulsar/pull/24665))
- [improve][broker] Give the detail error msg when authenticate failed with AuthenticationException ([#25221](https://github.com/apache/pulsar/pull/25221))
- [improve][ml] Optimize ledger opening by skipping fully acknowledged ledgers ([#24655](https://github.com/apache/pulsar/pull/24655))
- [improve][meta] Improve fault tolerance of blocking calls by supporting timeout ([#21028](https://github.com/apache/pulsar/pull/21028))
- [fix] Handle TLS close_notify to avoid SslClosedEngineException: SSLEngine closed already ([#24986](https://github.com/apache/pulsar/pull/24986))

### Client

- [fix][client] Fix AutoProduceBytesSchema.clone() method ([#25015](https://github.com/apache/pulsar/pull/25015))
- [fix][client] Fix double recycling of the message in isValidConsumerEpoch method ([#25008](https://github.com/apache/pulsar/pull/25008))
- [fix][client] Fix invalid parameter type passed to Map.get in TopicsImpl.getListAsync method ([#25069](https://github.com/apache/pulsar/pull/25069))
- [fix][client] Fix producer synchronous retry handling in failPendingMessages method ([#25207](https://github.com/apache/pulsar/pull/25207))
- [fix][client] Fix race condition between isDuplicate() and flushAsync() method in PersistentAcknowledgmentsGroupingTracker due to incorrect use Netty Recycler ([#25208](https://github.com/apache/pulsar/pull/25208))
- [fix][client] Fix thread-safety of AutoProduceBytesSchema ([#25014](https://github.com/apache/pulsar/pull/25014))
- [fix][client] PIP-84: Skip processing a message in the message listener if the consumer epoch is no longer valid ([#25007](https://github.com/apache/pulsar/pull/25007))
- [fix][client] Skip processing messages in the listener when the consumer has been closed ([#25006](https://github.com/apache/pulsar/pull/25006))
- [fix][client]Producer stuck or geo-replication stuck due to wrong value of message.numMessagesInBatch ([#25106](https://github.com/apache/pulsar/pull/25106))
- [improve][client] Test no exception could be thrown for invalid epoch in message ([#25013](https://github.com/apache/pulsar/pull/25013))
- [fix] Handle TLS close_notify to avoid SslClosedEngineException: SSLEngine closed already ([#24986](https://github.com/apache/pulsar/pull/24986))

### Pulsar IO and Pulsar Functions

- [fix][fn] complete flushAsync before closeAsync in ProducerCache and wait for completion in closing the cache ([#25140](https://github.com/apache/pulsar/pull/25140))
- [fix][fn] Fix graceful Pulsar Function shutdown so that consumers and producers are closed ([#25157](https://github.com/apache/pulsar/pull/25157))

### Others

- [fix][proxy] Close client connection immediately when credentials expire and forwardAuthorizationCredentials is disabled ([#25179](https://github.com/apache/pulsar/pull/25179))
- [fix][proxy] Fix memory leaks in ParserProxyHandler ([#25142](https://github.com/apache/pulsar/pull/25142))
- [improve][proxy] Add regression tests for package upload with 'Expect: 100-continue' ([#25211](https://github.com/apache/pulsar/pull/25211))
- [fix][misc] Allow JWT tokens in OpenID auth without nbf claim ([#25197](https://github.com/apache/pulsar/pull/25197))
- [improve] Eliminate unnecessary duplicate schema lookups for partitioned topics in client and geo-replication ([#25011](https://github.com/apache/pulsar/pull/25011))

### Tests & CI

- [fix][build] Remove Confluent and Restlet maven repositories from top level pom.xml ([#24981](https://github.com/apache/pulsar/pull/24981))
- [improve][test][branch-3.0] Add test for issue [#25220](https://github.com/apache/pulsar/pull/25220)

For the complete list, check the [full changelog](https://github.com/apache/pulsar/compare/v3.0.15...v3.0.16).
