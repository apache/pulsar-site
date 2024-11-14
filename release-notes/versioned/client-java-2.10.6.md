---
id: client-java-2.10.6
title: Client Java 2.10.6
sidebar_label: Client Java 2.10.6
---

## Client

### Fixes

- [fix][client] Fix ConsumerBuilderImpl#subscribe silent stuck when using pulsar-client:3.0.x with jackson-annotations prior to 2.12.0 [21985](https://github.com/apache/pulsar/pull/21985)
- [fix] [client] fix reader.hasMessageAvailable return false when incoming queue is not empty [21259](https://github.com/apache/pulsar/pull/21259)
- [fix][client] fix same producer/consumer use more than one connection per broker [21144](https://github.com/apache/pulsar/pull/21144)
- [fix][client] Fix repeat consume when using n-ack and batched messages [21116](https://github.com/apache/pulsar/pull/21116)
- [fix][client] Avoid ack hole for chunk message [21101](https://github.com/apache/pulsar/pull/21101)
- [fix][client] Fix consumer can't consume resent chunked messages [21070](https://github.com/apache/pulsar/pull/21070)
- [fix] [cli] the variable producerName of BatchMsgContainer is null [20819](https://github.com/apache/pulsar/pull/20819)
- [fix][client] fix negative message re-delivery twice issue [20750](https://github.com/apache/pulsar/pull/20750)
