---
id: txn-advanced-features
title: Advanced features
sidebar_label: "Advanced features"
description: Get a comprehensive understanding of advanced features of transactions in Pulsar.
---

You can use the following advanced features with transactions in Pulsar.

## Ack batch messages

If you want to acknowledge batch messages with transactions, set `acknowledgmentAtBatchIndexLevelEnabled` to `true` in the [`broker.conf`](https://github.com/apache/pulsar/blob/master/conf/broker.conf) or [`standalone.conf`](https://github.com/apache/pulsar/blob/master/conf/standalone.conf) file.


```conf
acknowledgmentAtBatchIndexLevelEnabled=true
```

This example enables batch messages ack in transactions in the consumer builder.

```java
Consumer<byte[]> consumer = pulsarClient
    .newConsumer()
    .topic(transferTopic)
    .subscriptionName("transaction-sub")
    .subscriptionInitialPosition(SubscriptionInitialPosition.Earliest)
    .subscriptionType(SubscriptionType.Shared)
    .enableBatchIndexAcknowledgment(true) // enable batch index acknowledgment
    .subscribe();
```

## Enable authentication

If you want to enable authentication with transactions, follow the steps below.

1. [Grant "consume" permission](admin-api-topics.md#grant-permission) to the `persistent://pulsar/system/transaction_coordinator_assign` topic.

2. [Configure authentication](security-overview/#authentication) in a Pulsar client.

## Select transaction isolation level

In order to enhance the flexibility of pulsar transactions, pulsar transactions support two different isolation levels, the default isolation level is Read Committed:
- READ_COMMITTED, Consumer can only consume all transactional messages which have been committed.
- READ_UNCOMMITTED, Consumer can consume all messages, even transactional messages which have been aborted.

Note that this is a subscription dimension configuration, and all consumers under the same subscription need to be configured with the same IsolationLevel.
This example selects READ_UNCOMMITTED Isolation level in the consumer builder:

```java
Consumer<String> consumer = client
  .newConsumer(Schema.STRING)
  .topic("persistent://my-tenant/my-namespace/my-topic")
  .subscriptionName("my-subscription")
  .subscriptionType(SubscriptionType.Shared)
  .subscriptionIsolationLevel(SubscriptionIsolationLevel.READ_COMMITTED) // Adding the isolation level configuration
  .subscribe();
```

## Guarantee exactly-once semantics

If you want to guarantee exactly-once semantics with transactions, you can [enable message deduplication at the broker, namespace, or topic level](cookbooks-deduplication.md#enable-message-deduplication-at-namespace-or-topic-level).

## Related topics

- To get up quickly, see [Pulsar transactions - Get started](txn-use.md).
