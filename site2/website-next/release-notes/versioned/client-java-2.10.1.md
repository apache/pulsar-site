---
id: client-java-2.10.1
title: Client Java 2.10.1
sidebar_label: Client Java 2.10.1
---

- [fix][Java] Fixes NPE when TableView handles null value message [15951](https://github.com/apache/pulsar/pull/15951)
- [fix][Java] Fix conversion of `TimestampMillisConversion` has no effect when Jsr310Conversion enabled [15863](https://github.com/apache/pulsar/pull/15863)
- [fix][Java] Fix messages sent by producers without schema cannot be decoded [15622](https://github.com/apache/pulsar/pull/15622)
- [improve][Java] improve logic when ACK grouping tracker checks duplicated message id [15465](https://github.com/apache/pulsar/pull/15465)
- [improve][Java] Add pending messages information while printing the producer stats [15440](https://github.com/apache/pulsar/pull/15440)
- [fix][Java] Fix negative ack not redelivery [15312](https://github.com/apache/pulsar/pull/15312)
- [improve][admin/client] AsyncHttpConnector doesn't use the system properties configured [15307](https://github.com/apache/pulsar/pull/15307)
- [fix][Java] TableView should cache created readers [15178](https://github.com/apache/pulsar/pull/15178)
- [fix][Java] Fix performance regression with message listener [15162](https://github.com/apache/pulsar/pull/15162)
- [fix][Java] Fix internal receive used wrong timeout type  [15014](https://github.com/apache/pulsar/pull/15014)
- [fix][Java] ConsumerBuilderImpl can not set null to deadLetterPolicy. [14980](https://github.com/apache/pulsar/pull/14980)
- [fix][Java] Returns immutable data set when use TableView. [14833](https://github.com/apache/pulsar/pull/14833)
- [improve][Java] Avoid timer task run before previous subscribe complete. [14818](https://github.com/apache/pulsar/pull/14818)
