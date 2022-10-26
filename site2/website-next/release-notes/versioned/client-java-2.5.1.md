---
id: client-java-2.5.1
title: Client Java 2.5.1 
sidebar_label: Client Java 2.5.1 
---

* [Client] Start reader inside batch result in read first message in batch. [#6345](https://github.com/apache/pulsar/pull/6345)
* [Client] Stop shade snappy-java in pulsar-client-shaded [#6375](https://github.com/apache/pulsar/pull/6375)
* [Client] MultiTopics discovery is broken due to discovery task scheduled twice instead of pendingBatchReceiveTask [#6407](https://github.com/apache/pulsar/pull/6407)
* [Client] Make SubscriptionMode a member of ConsumerConfigurationData [#6337](https://github.com/apache/pulsar/pull/6337)
* [Client] Should set either start message id or start message from roll back duration. [#6392](https://github.com/apache/pulsar/pull/6392)
* [Client] BatchReceivePolicy implements Serializable. [#6423](https://github.com/apache/pulsar/pull/6423)
* [Client] Remove duplicate cnx method [#6490](https://github.com/apache/pulsar/pull/6490)
* [Client] Pulsar Java client: Use System.nanoTime() instead of System.currentTimeMillis() to measure elapsed time [#6454](https://github.com/apache/pulsar/pull/6454)
* [Client] Make tests more stable by using JSONAssert equals [#6247](https://github.com/apache/pulsar/pull/6247)
* [Client] make acker in BatchMessageIdImpl transient [#6064](https://github.com/apache/pulsar/pull/6064)