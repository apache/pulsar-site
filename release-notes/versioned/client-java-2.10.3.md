---
id: client-java-2.10.3
title: Client Java 2.10.3
sidebar_label: Client Java 2.10.3
---

* [fix][client] For exclusive subscriptions, if two consumers are created repeatedly, the second consumer will block #18633
* [fix][client] Fixes batch_size not checked in MessageId#fromByteArrayWithTopic (#18405)
* [fix][client] Fix possible npe (#18406)
* [fix][client] Fix exception when calling loadConf on a ConsumerBuilder that has a KeySharedPolicy (#18345)
* [fix][client] Support LocalDateTime Conversion (#18334)
* [fix] [pulsar-client] Fix pendingLookupRequestSemaphore leak when Ser… (#18219)
* [fix][client] Fix failover/exclusive consumer with batch cumulate ack issue. (#18454)
* [improve][java-client]Add init capacity for messages in BatchMessageContainerImpl (#17822)
* [fix] [pulsar-client] Fix pendingLookupRequestSemaphore leak when channel inactive (#17856)
* [fix][client] Unwrap completion exception for Lookup Services (#17717)
* [fix][client] Avoid redelivering duplicated messages when batching is enabled #18486
* [fix][client] Fix multi-topic consumer stuck after redeliver messages (#18491)
* [fix][client] Fix IllegalThreadStateException when using newThread in ExecutorProvider.ExtendedThreadFactory
* [fix][client] Fix NPE of MultiTopicsConsumerImpl due to race condition (#18287)
