---
id: client-java-2.9.3
title: Client Java 2.9.3
sidebar_label: Client Java 2.9.3
---

- [fix][java] Fix ConsumerBuilderImpl can not set null to deadLetterPolicy [#14980](https://github.com/apache/pulsar/pull/14980)
- [fix][java] Fix conversion of `TimestampMillisConversion` has no effect when Jsr310Conversion enabled [#15863](https://github.com/apache/pulsar/pull/15863)
- [fix][java] Fix messages sent by producers without schema cannot be decoded [#15622](https://github.com/apache/pulsar/pull/15622)
- [fix][java] Fix performance regression with message listener [#15162](https://github.com/apache/pulsar/pull/15162)
- [fix][java] Fix potentially unfinished CompletableFuture in doReconsumeLater [#14947](https://github.com/apache/pulsar/pull/14947)
- [fix][java] Fix race condition in consumer redelivery [#14687](https://github.com/apache/pulsar/pull/14687)
- [fix][java] Fix the producer OOM if got an exception while adding messages to batch container [#12170](https://github.com/apache/pulsar/pull/12170)
- [fix][java] PartitionsAutoUpdateFuture never complete [#14625](https://github.com/apache/pulsar/pull/14625)
- [fix][java] Remove consumer when close consumer command is received [#15761](https://github.com/apache/pulsar/pull/15761)
- [fix][java] Fix PartitionedProducerImpl flushAsync always fail when one partition send TimeOutException [#14602](https://github.com/apache/pulsar/pull/14602)
- [improve][java] Add pending messages information while printing the producer stats [#15440](https://github.com/apache/pulsar/pull/15440)
- [improve][java] AsyncHttpConnector doesn't use the system properties configured [#15307](https://github.com/apache/pulsar/pull/15307)
- [improve][java] Avoid timer task run before previous subscribe complete [#14818](https://github.com/apache/pulsar/pull/14818)
- [improve][java] Process maxRedeliverCount is 0 of DeadLeddterPolicy [#14706](https://github.com/apache/pulsar/pull/14706)
- [improve][java] Improve logic when ACK grouping tracker checks duplicated message id [#15465](https://github.com/apache/pulsar/pull/15465)