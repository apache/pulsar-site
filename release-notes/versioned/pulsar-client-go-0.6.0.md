---
id: pulsar-client-go-0.6.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Feature

* Make PartitionsAutoDiscoveryInterval configurable, see [PR-514](https://github.com/apache/pulsar-client-go/pull/514).
* Always check connection close channell, before attempting to put requests, see [PR-521](https://github.com/apache/pulsar-client-go/pull/521).
* Add `LedgerId,EntryId,BatchIdx,PartitionIdx` func for MessageId interface, see [PR-529](https://github.com/apache/pulsar-client-go/pull/529).
* Add DisableReplication to Producer Message, see [PR-543](https://github.com/apache/pulsar-client-go/pull/543).
* Updating comments to conform to golang comment specification, see [PR-532](https://github.com/apache/pulsar-client-go/pull/532).
* Producer respects Context passed to Send() and SendAsync() when applying backpressure, see [PR-534](https://github.com/apache/pulsar-client-go/pull/534).
* Simplify connection close logic, see [PR-559](https://github.com/apache/pulsar-client-go/pull/559).
* Add open tracing to pulsar go client, see [PR-518](https://github.com/apache/pulsar-client-go/pull/518).
* Update proto file, see [PR-562](https://github.com/apache/pulsar-client-go/pull/562).
* Add send error logic for connection, see [PR-566](https://github.com/apache/pulsar-client-go/pull/566).
* Add license file for depend on libs, see [PR-567](https://github.com/apache/pulsar-client-go/pull/567).

## Improve

* Update jwt-go dependency to resolve vulnerabilities, see [PR-524](https://github.com/apache/pulsar-client-go/pull/524).
* Fixed Athenz repository name, see [PR-522](https://github.com/apache/pulsar-client-go/pull/522).
* Fix reader latest position, see [PR-525](https://github.com/apache/pulsar-client-go/pull/525).
* Fix timeout guarantee for RequestOnCnx, see [PR-492](https://github.com/apache/pulsar-client-go/pull/492).
* Fix nil pointer error with GetPartitionedTopicMetadata, see [PR-536](https://github.com/apache/pulsar-client-go/pull/536).
* Release locks before calling producer consumer response callbacks, see [PR-542](https://github.com/apache/pulsar-client-go/pull/542).
* Fix lookup service not implemented GetTopicsOfNamespace, see [PR-541](https://github.com/apache/pulsar-client-go/pull/541).
* Regenerate the certs to work with Pulsar 2.8.0 and Java 11, see [PR-548](https://github.com/apache/pulsar-client-go/pull/548).
* Fix race condition when resend pendingItems, see [PR-551](https://github.com/apache/pulsar-client-go/pull/551).
* Fix data race while accessing connection in partitionConsumer, see [PR-535](https://github.com/apache/pulsar-client-go/pull/535).
* Fix channel data race, see [PR-558](https://github.com/apache/pulsar-client-go/pull/558).
* Fix write to closed channel panic() in internal/connection during connection close, see [PR-539](https://github.com/apache/pulsar-client-go/pull/539).
* Fix possible race condition in connection pool, see [PR-561](https://github.com/apache/pulsar-client-go/pull/561).
* Fix default connection timeout, see [PR-563](https://github.com/apache/pulsar-client-go/pull/563).
* Add lock for compressionProviders to fix data race problem, see [PR-533](https://github.com/apache/pulsar-client-go/pull/533).
* Fix send goroutine blocked, see [PR-530](https://github.com/apache/pulsar-client-go/pull/530).