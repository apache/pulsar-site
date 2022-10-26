---
id: pulsar-client-go-0.7.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

## Feature
* Encryption support for producer, see [PR-560](https://github.com/apache/pulsar-client-go/pull/560)
* Decrytion support for consumer, see [PR-612](https://github.com/apache/pulsar-client-go/pull/612)
* User-defined metric cardinality, see [PR-604](https://github.com/apache/pulsar-client-go/pull/604)
* Better support for Azure AD OAuth 2.0, see [PR-630](https://github.com/apache/pulsar-client-go/pull/630), [PR-633](https://github.com/apache/pulsar-client-go/pull/633), [PR-634](https://github.com/apache/pulsar-client-go/pull/634)
* Removed testing for go versions 1.11 and 1.12, see [PR-632](https://github.com/apache/pulsar-client-go/pull/632)
* Add epoch to create producer to prevent a duplicate producer when broker is not available., see [PR-582](https://github.com/apache/pulsar-client-go/pull/582)

## Improve
* Fix batch size limit validation, see [PR-528](https://github.com/apache/pulsar-client-go/pull/528)
* Fix logic of command for sendError, see [PR-622](https://github.com/apache/pulsar-client-go/pull/622)
* Drain connection requests channel without closing, see [PR-645](https://github.com/apache/pulsar-client-go/pull/645)
* Fix ConsumersOpened counter not incremented when use multitopic or regexp consumer, see [PR-619](https://github.com/apache/pulsar-client-go/pull/619)
* Fix reconnection logic when topic is deleted, see [PR-627](https://github.com/apache/pulsar-client-go/pull/627)
* Fix panic when scale down partitions, see [PR-601](https://github.com/apache/pulsar-client-go/pull/601)
* Fix missing metrics for topics by registration of existing collector, see [PR-600](https://github.com/apache/pulsar-client-go/pull/600)
* Fix producer panic by oldProducers, see [PR-598](https://github.com/apache/pulsar-client-go/pull/598)
* Fail pending messages when topic is terminated, see [PR-588](https://github.com/apache/pulsar-client-go/pull/588)
* Fix handle send error panic, see [PR-576](https://github.com/apache/pulsar-client-go/pull/576)