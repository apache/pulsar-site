---
id: client-java-2.8.4
title: Client Java 2.8.4
sidebar_label: Client Java 2.8.4
---

- [improve][java] Improve consumer listener logic [13273](https://github.com/apache/pulsar/pull/13273)
- [fix][java] Fix ConsumerBuilderImpl#subscribeAsync blocks calling thread [14614](https://github.com/apache/pulsar/pull/14614)
- [fix][java] Fix partitionsAutoUpdateFuture never completes [14625](https://github.com/apache/pulsar/pull/14625)
- [fix][java] Fix race condition in consumer redelivery [14687](https://github.com/apache/pulsar/pull/14687)
- [improve][java] Process maxRedeliverCount is 0 of DeadLetterPolicy [14706](https://github.com/apache/pulsar/pull/14706)
- [improve][java] Avoid timer task run before previous subscribe complete [14818](https://github.com/apache/pulsar/pull/14818)
- [fix][java] Fix potentially unfinished CompletableFuture in doReconsumeLater [14947](https://github.com/apache/pulsar/pull/14947)
- [fix][java] ConsumerBuilderImpl can not set null to deadLetterPolicy. [14980](https://github.com/apache/pulsar/pull/14980)
- [improve][java] Add test to ensure the message order in listener callbacks [15049](https://github.com/apache/pulsar/pull/15049)
- [fix][java] Fix performance regression with message listener [15162](https://github.com/apache/pulsar/pull/15162)
- [fix][java] Fix wrong behavior of deduplication for key based batching [15413](https://github.com/apache/pulsar/pull/15413)
- [improve][java] improve logic when ACK grouping tracker checks duplicated message id [15465](https://github.com/apache/pulsar/pull/15465)
- [fix][java] Remove consumer when close consumer command is received [15761](https://github.com/apache/pulsar/pull/15761)
- [fix][java] Fix conversion of `TimestampMillisConversion` has no effect when Jsr310Conversion is enabled [15863](https://github.com/apache/pulsar/pull/15863)
- [fix][java] Remove producer when close producer command is received [16028](https://github.com/apache/pulsar/pull/16028)
- [fix][java] Fix thread safety issue of `LastCumulativeAck` [16072](https://github.com/apache/pulsar/pull/16072)
- [improve][java] Send CloseConsumer on client timeout [16616](https://github.com/apache/pulsar/pull/16616)
- [fix][java] Fix ReconsumeLater will hang up if retryLetterProducer exception [16655](https://github.com/apache/pulsar/pull/16655)
- [fix][java] Fix load trust certificate [16789](https://github.com/apache/pulsar/pull/16789)
- [fix][java] Remove redundant check for chunked message TotalChunkMsgSize in ConsumerImpl [16797](https://github.com/apache/pulsar/pull/16797)
- [fix][java] Forget to update memory usage when message is invalid [16835](https://github.com/apache/pulsar/pull/16835)
- [fix][java] Fix PatternTopicsChangedListener blocked when topic removed [16842](https://github.com/apache/pulsar/pull/16842)
- [fix][java] Fix MaxQueueSize semaphore release leak in createOpSendMsg [16915](https://github.com/apache/pulsar/pull/16915)
