---
id: client-java-2.10.2
title: Client Java 2.10.2
sidebar_label: Client Java 2.10.2
---

- [fix][java] Fix PatternTopicsChangedListener blocked when topic removed [#16842](https://github.com/apache/pulsar/pull/16842)
- [fix][java] Forget to update memory usage when invalid message [#16835](https://github.com/apache/pulsar/pull/16835)
- [fix][java] Send CloseConsumer on client timeout [#16616](https://github.com/apache/pulsar/pull/16616)
- [fix][java] Fix ReconsumeLater will hang up if retryLetterProducer exception [#16655](https://github.com/apache/pulsar/pull/16655)
- [fix][java] Fix load trust certificate [#16789](https://github.com/apache/pulsar/pull/16789)
- [fix][java] Fix reach redeliverCount client can't send batch messags [#17317](https://github.com/apache/pulsar/pull/17317)
- [fix][java] Fix reach redeliverCount client can't send messages to DLQ [#17287](https://github.com/apache/pulsar/pull/17287)
- [fix][java] Fix the message present in incoming queue after go to DLQ [#17326](https://github.com/apache/pulsar/pull/17326)
- [fix][java] Fix the startMessageId can't be respected as the ChunkMessageID [#16154](https://github.com/apache/pulsar/pull/16154)
- [fix][java] Release semaphore before discarding messages in batchMessageContainer [#17019](https://github.com/apache/pulsar/pull/17019)
- [fix][java] Remove consumer when close consumer command is received [#15761](https://github.com/apache/pulsar/pull/15761)
- [fix][java] Remove producer when close producer command is received [#16028](https://github.com/apache/pulsar/pull/16028)
- [fix][java] Remove redundant check for chunked message TotalChunkMsgSize in ConsumerImpl [#16797](https://github.com/apache/pulsar/pull/16797)
- [fix][java] Fix MaxQueueSize semaphore release leak in createOpSendMsg [#16915](https://github.com/apache/pulsar/pull/16915)
- [fix][java] Fix auto cluster failover can't resolve host bug [#16152](https://github.com/apache/pulsar/pull/16152)
- [fix][java] Fix client memory limit currentUsage leak and semaphore release duplicated in ProducerImpl [#16837](https://github.com/apache/pulsar/pull/16837)
- [fix][java] Fix newLookup TooManyRequestsException message [#16594](https://github.com/apache/pulsar/pull/16594)
- [fix][java] Fix scheduledExecutorProvider not shutdown [#17527](https://github.com/apache/pulsar/pull/17527)
- [fix][java] Fixed cnx channel Inactive causing the request fail to time out and fail to return [#17051](https://github.com/apache/pulsar/pull/17051)
- [fix][java] Fix thread safety issue of `LastCumulativeAck` [#16072](https://github.com/apache/pulsar/pull/16072)
- [fix][java] Make DeadLetterPolicy deserializable [#16513](https://github.com/apache/pulsar/pull/16513)
- [improve][java] Improve performance of multi-topic consumer with more than one IO thread [#16336](https://github.com/apache/pulsar/pull/16336)
- [improve][java] Only trigger the batch receive timeout when having pending batch receives requests [#16160](https://github.com/apache/pulsar/pull/16160)
- [improve][java] Replace ScheduledExecutor to improve performance of message consumption [#16236](https://github.com/apache/pulsar/pull/16236)
- [improve][java] Support passing existing scheduled executor providers to the client [#16334](https://github.com/apache/pulsar/pull/16334)
- [improve][java] Add classLoader field for `SchemaDefinition` [#15915](https://github.com/apache/pulsar/pull/15915)
- [improve][java] Add message key if exists to deadLetter messages [#16615](https://github.com/apache/pulsar/pull/16615)
- [improve][java] Refactor SchemaHash to reduce call of hashFunction in SchemaHash [#17948](https://github.com/apache/pulsar/pull/17948)