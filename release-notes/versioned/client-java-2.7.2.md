---
id: client-java-2.7.2
title: Client Java 2.7.2 
sidebar_label: Client Java 2.7.2 
---

- [Java] Fix: seemingly equal ClientConfigurationData's objects end up not being equal [#10091](https://github.com/apache/pulsar/pull/10091)
- [Java] Fix AutoConsumeSchema KeyValue encoding [#10089](https://github.com/apache/pulsar/pull/10089)
- [Java] Fix error OutOfMemoryError while using KeyValue&lt;GenericRecord, GenericRecord&gt; [#9981](https://github.com/apache/pulsar/pull/9981)
- [Java] Fix concurrency issue in incrementing epoch (#10278) [#10436](https://github.com/apache/pulsar/pull/10436)
- [Java] Allow pulsar client receive external timer [#9802](https://github.com/apache/pulsar/pull/9802)
- [Java] Handle NPE while receiving ack for closed producer [#8979](https://github.com/apache/pulsar/pull/8979)
- [Java] Fix batch size not set when deserializing from byte array [#9855](https://github.com/apache/pulsar/pull/9855)
- [Java] Fix ensure single-topic consumer can be closed [#9849](https://github.com/apache/pulsar/pull/9849)
- [Java] Issue 9585: delete disconnected consumers to allow auto-discovery [#9660](https://github.com/apache/pulsar/pull/9660)

