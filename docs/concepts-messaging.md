---
id: concepts-messaging
title: Messaging
sidebar_label: "Messaging"
description: Pulsar's messaging model — scalable topics, the V5 client API, producers, the three consumer types, schemas, transactions, and delivery semantics.
---

Pulsar is built on the [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) pattern (pub-sub). [Producers](concepts-clients.md#producer) publish messages to [topics](#topics); [consumers](concepts-clients.md#consumer) [subscribe](#consumers) to those topics, process incoming messages, and acknowledge them when processing is finished. When a subscription is created, Pulsar [retains](concepts-architecture-overview.md#persistent-storage) all messages until they are acknowledged, even if the consumer disconnects.

![publish-subscribe pattern in Pulsar](/assets/pub-sub-border.svg)

:::note

This page describes Pulsar's current messaging model: **[scalable topics](concepts-scalable-topics.md)** and the **V5 client API**, recommended for new applications. For the classic model -- partitioned topics, the four subscription types (Exclusive, Failover, Shared, Key_Shared), and the v4 client API -- see [Messaging (classic topics)](concepts-messaging-legacy.md). Both are fully supported.

:::

## Topics

A topic is a named channel that carries messages from producers to consumers. In the current model, topics are [scalable topics](concepts-scalable-topics.md), addressed with the `topic://` scheme:

```
topic://tenant/namespace/name
```

A scalable topic grows and shrinks at runtime by splitting and merging key-range segments, so you never pick a partition count and per-key ordering is preserved across every resize. The segment topology is managed by the broker and never surfaces to your application -- to your code, a scalable topic is a single stream. See [Scalable topics](concepts-scalable-topics.md) for the model in depth.

The V5 client also operates against existing `persistent://` topics, so you can adopt the new API before migrating any topic. Non-persistent topics are not supported by the V5 client.

## Messages

Messages are the basic unit of Pulsar. A message carries:

| Component | Description |
|-----------|-------------|
| Value | The payload, typed and (de)serialized by a [schema](#schemas). |
| Key | An optional string key. Messages with the same key are routed to the same segment and stay ordered relative to each other. |
| Properties | An optional map of user-defined string key/value pairs. |
| Event time | An optional application-assigned timestamp (`Instant`), distinct from the broker publish time. |
| Sequence ID | A per-producer monotonic ID, used for [deduplication](#message-deduplication). |

## The V5 client

Scalable topics are served through the V5 client API. The Java V5 client requires **Java 17** and these dependencies:

```xml
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client-v5</artifactId>
  <version>@pulsar:version@</version>
</dependency>
```

The API lives under `org.apache.pulsar.client.api.v5`:

```java
import org.apache.pulsar.client.api.v5.PulsarClient;
import org.apache.pulsar.client.api.v5.Producer;
import org.apache.pulsar.client.api.v5.StreamConsumer;
import org.apache.pulsar.client.api.v5.QueueConsumer;
import org.apache.pulsar.client.api.v5.CheckpointConsumer;
import org.apache.pulsar.client.api.v5.Message;
import org.apache.pulsar.client.api.v5.Transaction;
import org.apache.pulsar.client.api.v5.schema.Schema;
```

Build one `PulsarClient` and share it across producers and consumers; close it on shutdown:

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();

// ... create producers and consumers ...

client.close();
```

The service URL uses the `pulsar://` (or `pulsar+ssl://`) scheme. Authentication, TLS, operation timeouts, and memory limits are configured on the same builder, for example `.authentication(AuthenticationFactory.token("..."))`.

## Producers

Create a producer with a [schema](#schemas) and a topic, then build and send messages:

```java
Producer<String> producer = client.newProducer(Schema.string())
        .topic("topic://public/default/orders")
        .create();

producer.newMessage()
        .value("order placed")
        .send();
```

The message builder exposes every per-message option:

```java
producer.newMessage()
        .key("user-123")                                 // routing + per-key ordering
        .value("order placed")
        .property("source", "web")                       // user metadata
        .eventTime(Instant.now())
        .deliverAfter(Duration.ofMinutes(30))  // or deliverAt(Instant)
        .send();
```

`send()` returns a `MessageId`. For high throughput, send asynchronously through `async()` and flush when needed:

```java
var async = producer.async();
async.newMessage().key("user-123").value("order placed").send()
        .thenAccept(id -> System.out.println("sent " + id));
async.flush().join();
```

## Consumers

The V5 API replaces the four classic subscription types with three purpose-built consumers. Choose one by how you intend to consume.

### Stream consumer

Ordered consumption with cumulative acknowledgment -- for log-style processing where order matters. Acknowledging a message acknowledges it and everything before it.

```java
StreamConsumer<String> consumer = client.newStreamConsumer(Schema.string())
        .topic("topic://public/default/orders")
        .subscriptionName("my-sub")
        .subscriptionInitialPosition(SubscriptionInitialPosition.EARLIEST)
        .subscribe();

Message<String> msg = consumer.receive(Duration.ofSeconds(5)); // null on timeout
if (msg != null) {
    process(msg.value());
    consumer.acknowledgeCumulative(msg.id());
}
```

### Queue consumer

Parallel consumption with individual acknowledgment -- for work-queue fan-out where throughput matters more than order. Acknowledge each message on success, or negatively acknowledge it to have it redelivered:

```java
QueueConsumer<Order> consumer = client.newQueueConsumer(Schema.json(Order.class))
        .topic("topic://public/default/orders")
        .subscriptionName("order-processor")
        .subscribe();

Message<Order> msg = consumer.receive(Duration.ofSeconds(10));
if (msg != null) {
    try {
        process(msg.value());
        consumer.acknowledge(msg.id());
    } catch (Exception e) {
        consumer.negativeAcknowledge(msg.id());
    }
}
```

A queue consumer can route repeatedly-failing messages to a [dead-letter topic](#dead-letter-topic) and back off redeliveries:

```java
client.newQueueConsumer(Schema.json(Order.class))
        .topic("topic://public/default/orders")
        .subscriptionName("order-processor")
        .processingTimeout(ProcessingTimeoutPolicy.of(Duration.ofSeconds(30)))
        .negativeAckRedeliveryBackoff(
                BackoffPolicy.exponential(Duration.ofSeconds(1),
                                          Duration.ofMinutes(5)))
        .deadLetterPolicy(DeadLetterPolicy.builder().maxRedeliverCount(5).build())
        .subscribe();
```

### Checkpoint consumer

For stream-processing engines (such as Flink or Spark) that track their own position. A checkpoint consumer has no subscription and no acknowledgment; instead you capture an opaque, serializable `Checkpoint` and restore from it:

```java
CheckpointConsumer<SensorReading> consumer =
        client.newCheckpointConsumer(Schema.json(SensorReading.class))
                .topic("topic://public/default/sensor-data")
                .startPosition(Checkpoint.earliest())   // earliest(), latest(), or a saved checkpoint
                .create();

Messages<SensorReading> batch = consumer.receiveMulti(100, Duration.ofSeconds(1));
for (Message<SensorReading> m : batch) {
    process(m.value());
}

byte[] state = consumer.checkpoint().toByteArray();   // persist to your engine's state store
```

To resume, restore the checkpoint and pass it as the start position:

```java
Checkpoint restored = Checkpoint.fromByteArray(state);
CheckpointConsumer<SensorReading> consumer =
        client.newCheckpointConsumer(Schema.json(SensorReading.class))
                .topic("topic://public/default/sensor-data")
                .startPosition(restored)
                .create();
```

Repositioning by timestamp is an administrative operation -- see [Manage subscriptions](admin-api-scalable-topics.md#manage-subscriptions).

## Schemas

A schema types a topic's payload and handles (de)serialization. Pass it as the first argument when creating any producer or consumer:

```java
Schema.string()            // String
Schema.json(Order.class)   // JSON-encoded POJO
Schema.avro(Order.class)   // Avro-encoded POJO
```

Primitive factories (`Schema.int32()`, `Schema.bool()`, `Schema.bytes()`, and so on) and `Schema.protobuf(...)` are also available. Note the V5 factories are lowercase methods (`Schema.string()`), not the v4-style `Schema.STRING` constants.

## Acknowledgment

An acknowledgment tells the broker a message has been processed so it is not redelivered. The model depends on the consumer type:

- **Cumulative** (stream consumer): `acknowledgeCumulative(id)` acknowledges the message and all earlier ones.
- **Individual** (queue consumer): `acknowledge(id)` acknowledges one message; `negativeAcknowledge(id)` asks the broker to redeliver it.

`Message.redeliveryCount()` reports how many times a message has been redelivered, which you can use to make per-message decisions.

## Dead letter topic

When a queue consumer keeps failing to process a message, you usually don't want it redelivered forever. A `DeadLetterPolicy` caps redeliveries and diverts the message to a separate **dead-letter topic** for later inspection, so the main flow keeps moving:

```java
DeadLetterPolicy.builder()
        .maxRedeliverCount(5)
        .deadLetterTopic("topic://public/default/orders-dlq")  // optional; a default name is derived
        .build();
```

## Transactions

A transaction lets you produce messages and acknowledge consumed messages as a single atomic unit. Bind a produce to the transaction with `.transaction(txn)` on the message builder, and bind an acknowledgment with the two-argument `acknowledge`:

```java
Transaction txn = client.newTransaction();
try {
    producer.newMessage().transaction(txn).value(enrich(msg.value())).send();
    consumer.acknowledge(msg.id(), txn);
    txn.commit();
} catch (Exception e) {
    txn.abort();
}
```

The transaction API is unchanged from v4; only the topic addressing differs. See [Transactions](txn-what.md) for the full model.

## Message retention and expiry

By default, Pulsar stores a message until every subscription has acknowledged it, then deletes it. Two namespace-level policies change that:

- **Retention** keeps messages that have *already* been acknowledged, so they remain available for replay.
- **Time to live (TTL)** expires messages that have *not* been acknowledged within a deadline, so a slow or abandoned subscription does not accumulate an unbounded backlog.

Configure both per namespace or per topic -- see [Manage namespaces](admin-api-namespaces.md).

## Message deduplication

If a producer retries a send after a network hiccup, the broker can receive the same message twice. With deduplication enabled, the broker uses each producer's monotonic sequence ID to discard duplicates, giving idempotent producers and the foundation for effectively-once processing. Deduplication is enabled per namespace or topic.

## Delayed message delivery

A producer can defer when a message becomes visible to consumers, using `deliverAfter(Duration)` for a relative delay or `deliverAt(Instant)` for an absolute time (shown under [Producers](#producers)). Delayed delivery is useful for retries, scheduled notifications, and time-based workflows.

## Namespaces

A namespace groups related topics within a tenant (`tenant/namespace`) and is the unit at which most policies -- retention, TTL, deduplication, and [auto split/merge](admin-api-scalable-topics.md#configure-auto-splitmerge) -- are configured. See [Manage namespaces](admin-api-namespaces.md).

## The classic topic model

Partitioned and non-partitioned topics, the four subscription types (Exclusive, Failover, Shared, Key_Shared), partition routing modes, multi-topic subscriptions, and the v4 client API are documented in [Messaging (classic topics)](concepts-messaging-legacy.md). They remain fully supported; new applications should prefer scalable topics and the V5 API described above.
