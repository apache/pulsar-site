---
id: pulsar-client-go-0.3.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Feature

* Support retry letter topic in Go client, see [PR-359](https://github.com/apache/pulsar-client-go/pull/359).
* Support limit the retry number of reconnectToBroker, see [PR-360](https://github.com/apache/pulsar-client-go/pull/360).
* Support key shared policy in Go client, see [PR-363](https://github.com/apache/pulsar-client-go/pull/363).
* Add schema logic in producer and consumer, see [PR-368](https://github.com/apache/pulsar-client-go/pull/368).


## Improve

* Fix panic on receiverQueueSize set to `-1`, see [PR-361](https://github.com/apache/pulsar-client-go/pull/361).
* Fix may lead to panic test case, see [PR-369](https://github.com/apache/pulsar-client-go/pull/369).
* Send delay message individually even batching is enabled, see [PR-372](https://github.com/apache/pulsar-client-go/pull/372).
* Fixed buffer resize when writing request on connection, see [PR-374](https://github.com/apache/pulsar-client-go/pull/374).
* Fixed deadlock in DLQ ack processing, see [PR-375](https://github.com/apache/pulsar-client-go/pull/375).
* Fix deadlock when connection closed, see [PR-376](https://github.com/apache/pulsar-client-go/pull/376).
* Fix producer deadlock after write failure, see [PR-378](https://github.com/apache/pulsar-client-go/pull/378).
* Fix maxMessageSize not effective even if aligned with broker, see [PR-381](https://github.com/apache/pulsar-client-go/pull/381).
* Update default router to switch partition on all batching thresholds, see [PR-383](https://github.com/apache/pulsar-client-go/pull/383).
* Replaced `github.com/DataDog/zstd` with `github.com/datadog/zstd`, see [PR-385](https://github.com/apache/pulsar-client-go/pull/385).
* Fix retry policy not effective with non-FQDN topics, see [PR-386](https://github.com/apache/pulsar-client-go/pull/386).
