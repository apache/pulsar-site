---
id: client-java-3.3.0
title: Client Java 3.3.0
sidebar_label: Client Java 3.3.0
---

- [feat][client] Introduce Refresh API in the TableView (#21417)
- [fix][client] Consumer lost message ack due to race condition in acknowledge with batch message (#22353)
- [fix][client] Do no retrying for error subscription not found when disabled allowAutoSubscriptionCreation (#22164)
- [fix][client] Fix Consumer should return configured batch receive max messages (#22619)
- [fix][client] Fix ConsumerBuilderImpl#subscribe silent stuck when using pulsar-client:3.0.x with jackson-annotations prior to 2.12.0 (#21985)
- [fix][client] Fix DLQ producer name conflicts when multiples consumers send messages to DLQ (#21890)
- [fix][client] Fix client side memory leak when call MessageImpl.create and fix imprecise client-side metrics: pendingMessagesUpDownCounter, pendingBytesUpDownCounter, latencyHistogram (#22393)
- [fix][client] Fix messages in the batch container timed out unexpectedly (#21889)
- [fix][client] Fix multi-topics consumer could receive old messages after seek (#21945)
- [fix][client] Fix wrong results of hasMessageAvailable and readNext after seeking by timestamp (#22363)
- [fix][client] GenericProtobufNativeSchema not implement getNativeSchema method. (#22204)
- [fix][client] Messages lost due to TopicListWatcher reconnect (#21853)
- [fix][client] Unclear error message when creating a consumer with two same topics (#22255)
- [fix][client] fix Reader.hasMessageAvailable might return true after seeking to latest (#22201)
- [fix][client] fix huge permits if acked a half batched message (#22091)
- [fix][client]Fixed getting an incorrect `maxMessageSize` value when accessing multiple clusters in the same process (#22306)
- [improve][client] Mention partitioning in failover priorityLevel javaDoc (#21980)
- [improve][client] add physicalAddress as part of connection pool key (#22196)
