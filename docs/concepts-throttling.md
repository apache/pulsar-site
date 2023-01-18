---
id: concepts-throttling
title: Message dispatch throttling
sidebar_label: "Message dispatch throttling"
---

## Overview

### What is message dispatch throttling?

Large message payloads can cause memory usage spikes that lead to performance decreases. Pulsar adopts a rate-limit throttling mechanism for message dispatch, avoiding a traffic surge and improving message deliverability. It allows you to set a threshold to limit the number of messages and the byte size of entries that can be delivered to clients, blocking subsequent deliveries when the traffic per unit of time exceeds the threshold.

For example, when you configure the dispatch rate limit to 10 messages per second, then the number of messages that can be delivered to the client per second is up to 10.

![Rate-limit dispatch throttling](/assets/throttling-dispatch.svg)

### Why use it?

Message dispatch throttling brings the following benefits in detail:

- **Limit broker’s read request loads to BookKeeper**

  Messages are persistently stored in the BookKeeper cluster. If a large number of read requests cannot be fulfilled using the cached data, the BookKeeper cluster may become too busy to respond, and the broker's I/O or CPU resources can be fully occupied. Using the message dispatch throttling feature can make Pulsar work steadily by limiting the broker’s I/O and CPU load, as well as BookKeeper’s read request load.

- **Balance the allocation of Pulsar I/O resources to clients at topic/subscription levels**

  A broker instance serves multiple topics simultaneously. If a topic is frequently looked up, it will occupy almost all of the I/O resources, and other topics cannot be looked up. Using the message dispatch throttling feature can balance the allocation of I/O resources to clients across topics.

- **Balance the allocation of computing resources on the client side**

  When there is a large backlog of messages to consume, clients may receive a large amount of data in a short period of time, which monopolizes their computing resources. Since the client has no mechanisms to proactively limit the consumption rate, using the message dispatch throttling feature can also balance the computing resource allocation of the client.


### How it works?

The process of message dispatch throttling can be divided into the following steps:
1. The broker estimates the number of entries to read from the bookies by calculating the remaining quota. 
2. The broker reads the messages from the bookies.
3. The broker dispatches the messages to the client and updates the counter to decrease the quota.

:::note
Operations like `seek` or `redeliver` may deliver messages to a client multiple times. The broker counts them as different messages and updates the counter.
:::

### Limitations

Message dispatch throttling may cause messages over-delivered per unit of time due to the following reasons:

1. The broker may read more entries or bytes from the bookies than the throttling limit.
   - The byte size of messages delivered to the client may exceed the configured threshold. 
   
     When you set the dispatch rate limit per byte size, the broker calculates the number of entries to read from the bookies through this formula:
   
     $$
     The \ number \ of \ entries \ to \ read \ from \ bookies = {{The \ maximum \ byte \ size \ to \ read} \over{The \ average \ byte \ size \ per \ entry}}
     $$

     Given that the broker reads as many entries as possible in a read request, the maximum byte size to read equals the dispatch rate limit within each throttling period.

     The broker uses the following two metrics to get the average byte size per entry:
       - Average publish size: the average byte size per entry stored in the bookies when the broker receives a publish request.
       - Average dispatch size: the average number of messages that have been delivered to the client. 

    The broker uses the average publish size in preference to the average dispatch size. If the average publish size is unavailable, then it uses the average dispatch size. When none of the two metrics are available, the broker only reads one entry at the first attempt.

   - The number of messages delivered to the client may exceed the configured threshold. 
     
     When you set the dispatch rate limit per message count and batching (`batch-send`) is enabled, the broker counts an entry as one message (despite the message count per entry) and calculates the number of entries to read from the bookies through this formula:
      
     $$
     The \ number \ of \ entries \ to \ read \ from \ the \ bookies = {{The \ maximum \ number \ of \ messages \ to \ read} \over{The \ average \ message \ count \ per \ entry} \ (=1)}
     $$

     Since there is a number of messages per entry, the number of messages delivered to the client is always larger than or equals the configured threshold.

**Workaround**

Configuring `preciseDispatcherFlowControl` or `dispatchThrottlingOnBatchMessageEnabled` can improve the over-delivery issue. See [Throttling configurations](#throttling-configurations) for more details.

2. Concurrent throttling processes may not decrease the quota in a timely manner. 

   As introduced in [How it works](#how-it-works), the dispatch throttling process is: `1.get remaining quota` $$\to$$ `2.load data` $$\to$$ `3.decrease amount`. 
   
   When two processes "dispatch replay messages (process-R)" and "dispatch non-replay messages (process-N)" in the same subscription are executed concurrently, their throttling processes can be interwoven in this order: 

     1) process-R: `1.get remaining quota`

     2) process-R: `2.load data`

     3) process-N: `1.get remaining quota`

     4) process-N: `2.load data`

     5) process-R: `3.decrease quota`

     6) process-N: `3.decrease quota`

   As a result, the total number of dispatched messages may exceed the quota.

When over-delivery happens, and the delivered message count exceeds the quota in the current period, then the quota for the next period will be reduced accordingly. For example, if the rate limit is set to `10/s`, and `11` messages have been delivered to the client in the first period, then only up to `9` messages can be delivered to the client in the next period.

![An example of over-delivery occurred within a throttling period](/assets/throttling-limitation.svg)

## Concepts

### Throttling levels

The following table outlines the three levels that you can throttle message dispatch.

Level | Description
:-----|:------------
Per cluster | All subscriptions in the same Pulsar cluster share the quota.
Per topic | All subscriptions in the same topic share the quota. <br /><li>If it’s a non-partitioned topic, the quota equals the maximum number of messages that the topic can deliver per unit of time.</li><li>If a topic has multiple partitions, the quota refers to the maximum number of messages that each partition can deliver per unit of time. In other words, the actual dispatch rate limit of a [partitioned topic](concepts-messaging.md#partitioned-topics) is N times the configured one (N is the number of partitions inside the topic). For example, the topic `t0` has two partitions. If you set the quota to `10/s`, then the rate limit of both `t0-p0` and `t0-p1` is `10/s`, while the total rate limit of `t0` is `20/s`. Note that the quota cannot be shared among partitions, but among subscriptions inside a partition.</li>
Per subscription | <li>If it’s a non-partitioned topic, the rate limit refers to the maximum number of messages that a subscription can deliver to clients per unit of time.</li><li>If the subscribed topic has multiple partitions, the rate limit refers to the maximum number of messages that the subscription can deliver per partition per unit of time. In other words, the actual dispatch rate limit of a subscription for a [partitioned topic](concepts-messaging.md#partitioned-topics) is N times the configured one (N is the number of partitions inside the topic). For example, the topic `t1` has two partitions with the subscription `s1`. If you set the rate limit to `10/s`, then the rate limit for `s1` in both `t1-p0` and `t1-p1` is `10/s`, while the total rate limit of `s1` is `20/s`.</li>

:::note
The dispatch rate limits configured at multiple levels take effect simultaneously.
:::

### Throttling approaches

The following table outlines multiple approaches to configure the dispatch rate limits at different levels.

Approach | Per cluster | Per topic | Per subscription
:--------|:------------|:----------|:----------------
Set [broker configurations](#throttling-configurations) or [dynamic broker configurations](admin-api-brokers.md#dynamic-broker-configuration) | <li>`dispatchThrottlingRateInMsg`</li><li>`dispatchThrottlingRateInByte`</li> | <li>`dispatchThrottlingRatePerTopicInMsg`</li><li>`dispatchThrottlingRatePerTopicInByte`</li><br />It applies to all topics in the cluster. | <li>`dispatchThrottlingRatePerSubscriptionInMsg`</li><li>`dispatchThrottlingRatePerSubscriptionInByte`</li><br />It applies to all subscriptions in the cluster.
Set namespace policies | N/A | Refer to [Configure dispatch throttling for topics](admin-api-namespaces.md#configure-dispatch-throttling-for-topics). | Refer to [Configure dispatch throttling for subscriptions](admin-api-namespaces.md#configure-dispatch-throttling-for-subscription).
Set topic policies | N/A | Refer to [Set topic-level dispatch rate](https://pulsar.apache.org/admin-rest-api/#operation/persistent_setDispatchRate). | Refer to [Set subscription-level dispatch rate](https://pulsar.apache.org/admin-rest-api/#operation/getSubscriptionLevelDispatchRate).<br />It applies to all subscriptions in a topic.

:::note
You can use the above three approaches simultaneously. The priorities are topic policies > namespace policies > broker configurations. For example, if you have configured the dispatch throttling limit for a subscription using all the above three approaches, only the one configured through “topic policies” takes effect.
:::

### Throttling configurations

The following table outlines the parameters that you can configure for message dispatch throttling in the `conf/broker.conf` file.

Parameter | Description | Default value
:---------|:------------|:-------------
dispatchThrottlingRateInMsg | The maximum number of messages delivered per throttling period. | '-1', which means no limit.
dispatchThrottlingRateInByte | The maximum byte size of messages delivered per throttling period. | '-1', which means no limit.
ratePeriodInSecond | The period of time for dispatch throttling (in seconds). The counter is reset at the end of the period.<br />For example, if you want to configure the rate limit to `10,000 messages per minute`, you need to set `ratePeriodInSecond` to `60` and set `dispatchThrottlingRateInMsg` to `10,000`. | 1 (second)
preciseDispatcherFlowControl | Whether to apply a precise control on the dispatch throttling. By default, it’s disabled, which means the broker estimates the number of messages to read from the bookies using the minimum value between the remaining `consumer.receiverQueueSize` (defaults to 1000) and `dispatcherMaxReadBatchSize` (defaults to 100).<br /><br />When it’s set to `true`, the broker estimates the number of entries to read from the bookies through this formula:<br /><br />$$The \ number \ of \ entries \ to \ read \ from \ the \ bookies = {{The \ number \ of \ messages \ to \ read} \over{The \ average \ number \ of \ messages \ per \ entry}}$$<br /><br />For example, assume you’ve set the rate limit to `10/s`. When the average number of messages per entry is `6`, it means the broker reads 2 entries per second, and the count of messages to read exceeds the quota. However, when it’s set to ‘false`, the broker reads 10 entries, which exceeds the quota much more. | false
dispatchThrottlingOnBatchMessageEnabled | Whether to count messages by entry (batch). By default, it’s disabled.<br /><br />Setting it to `true` may lead to an inaccurate number of messages but maximize Pulsar's throughput while keeping stable read requests to the bookies. For example, assume you’ve set the rate limit to `10/s`, if you set `dispatchThrottlingOnBatchMessageEnabled` to `true`, the broker only reads and delivers 10 entries to the client per second, without caring about the number of messages per entry.  | false
dispatchThrottlingOnNonBacklogConsumerEnabled | Whether the dispatch throttling on non-backlog consumers is enabled. By default, it’s enabled.<br />When it is set to `false`:<br /><li>If all the consumers in one subscription have no backlog, the message dispatch throttling is turned off automatically even if `dispatchThrottlingRateInMsg` and `dispatchThrottlingRateInByte` are configured.</li><li>If at least one consumer has a backlog, the throttling is turned on automatically.</li> | true

:::note
- You can use `dispatchThrottlingRateInMsg` and `dispatchThrottlingRateInByte` simultaneously (logical AND).
- Ensure that only one of `preciseDispatcherFlowControl` and `dispatchThrottlingOnBatchMessageEnabled` is enabled since these two parameters are mutually exclusive.
:::