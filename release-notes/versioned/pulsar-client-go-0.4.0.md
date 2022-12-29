---
id: pulsar-client-go-0.4.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Feature

* Support send timeout in Producer side, see [PR-394](https://github.com/apache/pulsar-client-go/pull/394).
* Add metric for internal publish latency, see [PR-397](https://github.com/apache/pulsar-client-go/pull/397).
* Add key_based Batch logic, see [PR-363](https://github.com/apache/pulsar-client-go/pull/400).
* Add error label to publish errors metric, see [PR-405](https://github.com/apache/pulsar-client-go/pull/405).
* Add const client label to metrics, see [PR-406](https://github.com/apache/pulsar-client-go/pull/406).
* Attach topic and custom labels to Prometheus metrics, see [PR-410](https://github.com/apache/pulsar-client-go/pull/410).
* Add orderingKey apis, see [PR-427](https://github.com/apache/pulsar-client-go/pull/427).
* Support jwt and trusted cert for pulsar perf client, see [PR-427](https://github.com/apache/pulsar-client-go/pull/428).


## Improve

* Fix bot action CI yaml file, see [PR-395](https://github.com/apache/pulsar-client-go/pull/395).
* Update go-keyring to v1.1.6 to remove warnings on MacOS Catalina+ , see [PR-404](https://github.com/apache/pulsar-client-go/pull/404).
* Read the clock fewer times during message routing, see [PR-372](https://github.com/apache/pulsar-client-go/pull/408).
* Close dangling autoDiscovery goroutine in consumer, see [PR-411](https://github.com/apache/pulsar-client-go/pull/411).
* Fix discard unacked messages, see [PR-413](https://github.com/apache/pulsar-client-go/pull/413).
* Fixed logic to attempt reconnections to same broker, see [PR-414](https://github.com/apache/pulsar-client-go/pull/414).
* Reduce the default TCP connection timeout from 30 to 5 seconds, see [PR-415](https://github.com/apache/pulsar-client-go/pull/415).
* Removed unused `import "C"` statement, see [PR-416](https://github.com/apache/pulsar-client-go/pull/416).
* Renamed `Metrics.RpcRequestCount` to `RPCRequestCount` to conform to style check, see [PR-417](https://github.com/apache/pulsar-client-go/pull/417).
* Fix leaked nack tracker goroutine, see [PR-418](https://github.com/apache/pulsar-client-go/pull/418).
* Clearing message queues after seek requests, see [PR-419](https://github.com/apache/pulsar-client-go/pull/419).
* Fix retry policy not effective with partitioned topic, see [PR-425](https://github.com/apache/pulsar-client-go/pull/425).
* Deduplicate user provided topics before using them, see [PR-426](https://github.com/apache/pulsar-client-go/pull/426).
* The `reader.HasNext()` returns true on empty topic, see [PR-441](https://github.com/apache/pulsar-client-go/pull/441).
* Upgrade `gogo/protobuf` to 1.3.2, see [PR-446](https://github.com/apache/pulsar-client-go/pull/446).
* Fix `logrusWrapper` shrink interfaces slice into an interface, see [PR-449](https://github.com/apache/pulsar-client-go/pull/449).
* Logging what really caused lookup failure, see [PR-450](https://github.com/apache/pulsar-client-go/pull/450).
* Make state thread safe in consumer_partition and connection, see [PR-451](https://github.com/apache/pulsar-client-go/pull/451).
* Fix `KeyFileTypeServiceAccount` not found compile error, see [PR-455](https://github.com/apache/pulsar-client-go/pull/455).
* Fix unsubscribe blocked when consumer is closing or has closed, see [PR-457](https://github.com/apache/pulsar-client-go/pull/457).
* The asynchronized send timeout checking without pending queue lock, see [PR-460](https://github.com/apache/pulsar-client-go/pull/460).
