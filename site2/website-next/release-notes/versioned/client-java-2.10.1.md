---
id: client-java-2.10.0
title: Client Java 2.10.0 
sidebar_label: Client Java 2.10.0 
---

- [Java] Support creating a consumer in the paused state [#11974](https://github.com/apache/pulsar/pull/11974)
- [Java] Support passing existing executor providers to the client [#12037](https://github.com/apache/pulsar/pull/12037)
- [Java] Fix the producer OOM if got an exception while adding messages to batch container [#12170](https://github.com/apache/pulsar/pull/12170)
- [Java] Allow to config client allocator out of memory policy [#12200](https://github.com/apache/pulsar/pull/12200)
- [Java] Support negative ack redelivery backoff [#12566](https://github.com/apache/pulsar/pull/12566)
- [Java] Fix confusing logs in UnAckedMessageTracker [#13017](https://github.com/apache/pulsar/pull/13017)
- [Java] Fix parseProtobufSchema method will be called two times [#13163](https://github.com/apache/pulsar/pull/13163)
- [Java] Add getNumPartitions method into PartitionedProducerImpl [#13239](https://github.com/apache/pulsar/pull/13239)
- [Java] Allow config client dns bind addr and port [#13390](https://github.com/apache/pulsar/pull/13390)
- [Java] Support adding custom properties for the reconsumeLater interface [#13461](https://github.com/apache/pulsar/pull/13461)
- [Java] Allow Client Builder set Dnslookup params [#13503](https://github.com/apache/pulsar/pull/13503)
- [Java] Avoid repeatedly set startMessageIdData to null for ConsumerImpl [#13606](https://github.com/apache/pulsar/pull/13606)
- [Java] Let the 'properties' to be empty for ConsumerBuilder and ProducerBuilder [#14074](https://github.com/apache/pulsar/pull/14074)
- [Java] Log producer batchSize and msgSize percentiles [#14229](https://github.com/apache/pulsar/pull/14229)