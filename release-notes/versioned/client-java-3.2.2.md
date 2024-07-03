---
id: client-java-3.2.2
title: Client Java 3.2.2
sidebar_label: Client Java 3.2.2
---

- [fix][client] Consumer lost message ack due to race condition in acknowledge with batch message ([#22353](https://github.com/apache/pulsar/pull/22353))
- [fix][client] Do no retrying for error subscription not found when disabled allowAutoSubscriptionCreation ([#22164](https://github.com/apache/pulsar/pull/22164))
- [fix][client] Fix wrong results of hasMessageAvailable and readNext after seeking by timestamp ([#22363](https://github.com/apache/pulsar/pull/22363))
- [fix][client] GenericProtobufNativeSchema not implement getNativeSchema method. ([#22204](https://github.com/apache/pulsar/pull/22204))
- [fix][client] Unclear error message when creating a consumer with two same topics ([#22255](https://github.com/apache/pulsar/pull/22255))
- [fix][client] fix Reader.hasMessageAvailable might return true after seeking to latest ([#22201](https://github.com/apache/pulsar/pull/22201))
- [fix][client]Fixed getting an incorrect `maxMessageSize` value when accessing multiple clusters in the same process ([#22306](https://github.com/apache/pulsar/pull/22306))
- [fix][misc] Make ConcurrentBitSet thread safe ([#22361](https://github.com/apache/pulsar/pull/22361))
- [improve][misc] Remove the call to sun InetAddressCachePolicy ([#22329](https://github.com/apache/pulsar/pull/22329))
