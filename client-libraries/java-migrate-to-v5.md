---
id: java-migrate-to-v5
title: Migrate to the v5 Java client
sidebar_label: "Migrate to v5"
description: Move existing Pulsar Java applications from the current client API to the v5 client API for scalable topics.
---

This guide explains how to migrate an existing Java application from the [v4 client](java.md#java-client-sdks) (`org.apache.pulsar.client.api`) to the [v5 client SDK](java-v5.md) (`org.apache.pulsar.client.api.v5`) used by [scalable topics](pathname:///docs/concepts-scalable-topics).

:::note

You do not have to migrate to the v5 API. The v4 Java client remains supported for applications using regular topics and for features such as non-persistent topics and TableView. Adopt the v5 API when you want scalable topics or its consumer model.

:::

## How migration works

Dependency migration, API migration, and topic migration are separate steps. Existing v4 applications using regular topics do not need to change their API or dependencies for a broker upgrade. The v4 client remains supported.

The two APIs can run **side by side in the same JVM**, so you can move one producer or consumer at a time. To adopt v5:

1. Follow [Java client setup](java-setup.md#step-1-install-java-client-library) to install `pulsar-client-v5-all` and align its dependencies. Your v4 source code can keep using `org.apache.pulsar.client.api`.
2. Move producers and consumers to `org.apache.pulsar.client.api.v5`. The v5 client works against **existing** `persistent://` topics when the brokers meet the requirements below, so no topic migration is needed for this step.
3. To use scalable topics, [migrate the topics themselves](#migrating-the-topics). This is a separate server-side operation with its own cutover requirements.

## Prerequisites

- **Java 17 or later.** The combined Java client artifacts require this runtime for both APIs.
- **Pulsar 5.x brokers with scalable topics enabled.** The v5 client requires the scalable-topic protocol even when accessing existing `persistent://` topics. It cannot connect through this API to older brokers or brokers with `scalableTopicsEnabled=false`. These v5 connection requirements do not apply merely because a v4 application uses a combined dependency.
- **Aligned dependencies.** Complete the [dependency setup and runtime graph checks](java-dependency-configuration.md#pulsar-bom) before migrating API usage.

## Dependencies

Follow [Java client setup](java-setup.md) for Maven and Gradle declarations, [Pulsar and Netty BOMs](java-dependency-configuration.md#pulsar-bom), and [transitive exclusions](java-dependency-configuration.md#replace-existing-dependencies). The dependency configuration page is the canonical dependency guide, including runtime graph checks and the shaded fallback for unresolved conflicts.

Changing dependencies does not require changing v4 application code. Continue with the API migration below when you are ready to adopt v5.

## API mapping

The biggest change is the consumer model: the four subscription types collapse into three purpose-built consumer types.

| v4 client | v5 client |
|-------------|--------|
| `org.apache.pulsar.client.api.PulsarClient` | `org.apache.pulsar.client.api.v5.PulsarClient` |
| Exclusive / Failover subscription | **Stream consumer** -- ordered, cumulative ack |
| Shared subscription | **Queue consumer** -- individual ack, negative ack, dead-letter |
| Key_Shared subscription | **Stream consumer** for ordered key-shared processing on scalable topics; adapt processing to cumulative acknowledgment |
| `Reader` | **Checkpoint consumer** -- external position via `Checkpoint` |
| `Schema.STRING`, `Schema.JSON(T.class)`, `Schema.AVRO(T.class)` | `Schema.string()`, `Schema.json(T.class)`, `Schema.avro(T.class)` |
| `consumer.acknowledge(msg)` | `consumer.acknowledge(msg.id())` |
| `reader.seek(messageId)` | a `Checkpoint` passed to `startPosition(...)` at build time |
| timeouts and delays as `long` milliseconds | `Duration` / `Instant` |
| builder option setters | immutable policy objects (`DeadLetterPolicy`, `BackoffPolicy`, …), with builders or static factories |

Keep the v4 client for anything the v5 client does not yet cover: `Reader`-style arbitrary seeking, `TableView`, and non-persistent topics. Scalable-topic support in the other language SDKs is planned; today the v5 client is Java-only.

## Client

The client builder is nearly identical; the package changes from `...client.api` to `...client.api.v5`.

```java
// v4
import org.apache.pulsar.client.api.PulsarClient;
// v5
import org.apache.pulsar.client.api.v5.PulsarClient;

PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();
```

## Producers

Producers and the message builder carry over almost unchanged. Note the lowercase schema factory, and that the same code works against an existing `persistent://` topic or a `topic://` scalable topic.

```java
// v4
Producer<String> producer = client.newProducer(Schema.STRING)
        .topic("persistent://public/default/orders")
        .create();

// v5
Producer<String> producer = client.newProducer(Schema.string())
        .topic("persistent://public/default/orders")   // or topic://... for a scalable topic
        .create();

producer.newMessage().key("user-123").value("order placed").send();
```

## Consumers

Pick the v5 consumer that matches your current subscription type.

For a durable subscription cutover, stop the old consumers before attaching consumers with a different subscription model. Do not assume that a live v4 Key_Shared or Failover subscription can be mixed with v5 stream consumers. While reading a regular topic, v5 stream consumers coordinate at the existing partition granularity; entry-bucket parallelism becomes available after migration to a scalable topic.

### Exclusive or Failover → Stream consumer

Ordered consumption with cumulative acknowledgment.

```java
// v4
Consumer<String> consumer = client.newConsumer(Schema.STRING)
        .topic("persistent://public/default/orders")
        .subscriptionName("my-sub")
        .subscriptionType(SubscriptionType.Failover)
        .subscribe();
Message<String> msg = consumer.receive();
consumer.acknowledgeCumulative(msg);

// v5
StreamConsumer<String> consumer = client.newStreamConsumer(Schema.string())
        .topic("persistent://public/default/orders")
        .subscriptionName("my-sub")
        .subscribe();
Message<String> msg = consumer.receive();
consumer.acknowledgeCumulative(msg.id());
```

### Shared → Queue consumer

Parallel consumption with individual acknowledgment, negative acknowledgment, and dead-letter support.

```java
// v4
Consumer<String> consumer = client.newConsumer(Schema.STRING)
        .topic("persistent://public/default/orders")
        .subscriptionName("workers")
        .subscriptionType(SubscriptionType.Shared)
        .subscribe();
Message<String> msg = consumer.receive();
consumer.acknowledge(msg);            // or consumer.negativeAcknowledge(msg);

// v5
QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .topic("persistent://public/default/orders")
        .subscriptionName("workers")
        .subscribe();
Message<String> msg = consumer.receive();
consumer.acknowledge(msg.id());       // or consumer.negativeAcknowledge(msg.id());
```

### Key_Shared → Stream consumer

On scalable topics, v5 stream consumers share segments by entry bucket and preserve per-key order. A queue consumer uses Shared dispatch and does not preserve that guarantee. Use a stream consumer for ordered keyed processing and adapt individual acknowledgments to cumulative acknowledgments: finish processing all previously delivered messages before acknowledging a later one. See [Stream consumer](java-v5.md#stream-consumer).

### Reader → Checkpoint consumer

For code that tracks its own position (a `Reader` started from a `MessageId`), use a checkpoint consumer with a serializable `Checkpoint`.

```java
// v4
Reader<String> reader = client.newReader(Schema.STRING)
        .topic("persistent://public/default/orders")
        .startMessageId(MessageId.earliest)
        .create();
Message<String> msg = reader.readNext();

// v5
CheckpointConsumer<String> consumer = client.newCheckpointConsumer(Schema.string())
        .topic("persistent://public/default/orders")
        .startPosition(Checkpoint.earliest())
        .create();
Message<String> msg = consumer.receive();
byte[] state = consumer.checkpoint().toByteArray();   // persist; restore via Checkpoint.fromByteArray(...)
```

A `Checkpoint` replaces the `MessageId` you would store with a reader. The two are **not interchangeable** -- a saved `MessageId` cannot be used as a `Checkpoint` -- so plan a clean cutover when migrating readers.

### Multiple topics: pattern subscriptions → namespace consumers

In the v4 client, a single consumer can attach to many topics with a topic list or a regular-expression pattern:

```java
// v4 -- pattern subscription
Consumer<String> consumer = client.newConsumer(Schema.STRING)
        .topicsPattern(Pattern.compile("persistent://tenant/ns/orders-.*"))
        .subscriptionName("workers")
        .subscriptionType(SubscriptionType.Shared)
        .subscribe();
```

In the v5 client, a stream or queue consumer attaches to an entire **namespace** instead, optionally narrowed by topic **properties** rather than a name pattern. Set `namespace(...)` in place of `topic(...)`:

```java
// v5 -- every scalable topic in the namespace
QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .namespace("tenant/ns")
        .subscriptionName("workers")
        .subscribe();

// v5 -- only topics whose properties match every filter (AND semantics)
Map<String, String> filters = Map.ofEntries(
        Map.entry("team", "orders"),
        Map.entry("tier", "gold"));

QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .namespace("tenant/ns", filters)
        .subscriptionName("workers")
        .subscribe();
```

The matching set is **live**: as topics are created or deleted in the namespace -- or as their properties change -- the consumer attaches and detaches automatically, the way a v4 pattern subscription tracks newly created topics. Set either `topic(...)` or `namespace(...)`, not both.

Filtering is by topic **properties**, not by a name regex, so tag topics with properties when you create them (`pulsar-admin scalable-topics create … --property team=orders`) and select them with a matching filter. Namespace consumption is available on stream and queue consumers; checkpoint consumers are single-topic.

## Schemas, transactions, and configuration

- **Schemas** -- replace the `Schema.STRING` / `Schema.JSON(...)` constants with the lowercase factory methods `Schema.string()` / `Schema.json(...)`. See [Schemas](java-v5.md#schemas).
- **Transactions** -- the model is unchanged: bind a produce with `.transaction(txn)` and an ack with the two-argument `acknowledge`. See [Transactions](java-v5.md#transactions).
- **Configuration** -- grouped options use immutable policy objects (`DeadLetterPolicy`, `BackoffPolicy`, `BatchingPolicy`, …), and time values use `Duration` / `Instant` instead of `long` milliseconds. Queue `ackTimeout` becomes `processingTimeout(ProcessingTimeoutPolicy)`. Enable transactions with `transactionPolicy(TransactionPolicy)` on the client builder.

## Migrating the topics

Adopting the v5 API does not require changing your topics -- the v5 client operates against existing `persistent://` topics. To gain the benefits of scalable topics (automatic split/merge, no fixed partition count), migrate a topic on the server:

```shell
bin/pulsar-admin scalable-topics migrate public/default/orders
```

This is a one-way operation. Upgrade and disconnect remaining v4 clients before running it; the broker rejects migration while they are connected unless forced. Connected v5 clients follow the new layout, and ordered consumers drain the old topics as sealed predecessors. Use `topic://public/default/orders` for subsequent client configuration. See [Migrate a regular topic](pathname:///docs/admin-api-scalable-topics#migrate-a-regular-topic).

## What's next

- [Java client (v5)](java-v5.md) -- the v5 client reference.
- [Scalable topics](pathname:///docs/concepts-scalable-topics) -- the topic model the v5 client is built for.
- [Manage scalable topics](pathname:///docs/admin-api-scalable-topics) -- create and migrate scalable topics.
