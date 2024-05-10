---
id: client-java-3.0.3
title: Client Java 3.0.3
sidebar_label: Client Java 3.0.3
---

- [fix] [client] fix huge permits if acked a half batched message [22091](https://github.com/apache/pulsar/pull/22091)
- [fix] [client] Do no retrying for error subscription not found when disabled allowAutoSubscriptionCreation [22078](https://github.com/apache/pulsar/pull/22078)
- [fix][client] Fix ConsumerBuilderImpl#subscribe silent stuck when using pulsar-client:3.0.x with jackson-annotations prior to 2.12.0 [21985](https://github.com/apache/pulsar/pull/21985)
- [fix][client] Fix multi-topics consumer could receive old messages after seek [21945](https://github.com/apache/pulsar/pull/21945)
- [cleanup][client] Fix inconsistent API annotations of `getTopicName` [21620]
- [fix][client] fix negative message re-delivery twice issue [20750](https://github.com/apache/pulsar/pull/20750)
- [fix][client] Fix messages in the batch container timed out unexpectedly [21889](https://github.com/apache/pulsar/pull/21889)
- [improve] [client] Prevent reserve memory with a negative memory size to avoid send task stuck [21804](https://github.com/apache/pulsar/pull/21804)
- [fix][client] Fix producer thread block forever on memory limit controller [21790](https://github.com/apache/pulsar/pull/21790)
- [fix] [client] Messages lost due to TopicListWatcher reconnect [21853](https://github.com/apache/pulsar/pull/21853)
