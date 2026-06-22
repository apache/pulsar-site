---
id: java-migrate-to-v5
title: Migrate to the V5 Java client
sidebar_label: "Migrate to V5"
description: Move existing Pulsar Java applications from the current client API to the V5 client API for scalable topics.
---

This guide explains how to migrate an existing Java application from the [current client SDK](java.md#java-client-sdks) (`org.apache.pulsar.client.api`) to the [V5 client SDK](java-v5.md) (`org.apache.pulsar.client.api.v5`) used by [scalable topics](pathname:///docs/concepts-scalable-topics).

:::note

You don't have to migrate. The current SDK is fully supported and remains the right choice for non-Java applications, for applications that don't need scalable topics, and for non-persistent topics (which the V5 client does not support). Migrate a Java application when you want scalable topics or the V5 API.

:::

## How migration works

The two SDKs are independent and can run **side by side in the same JVM**, so you can migrate incrementally -- one producer or consumer at a time -- rather than all at once. A typical path:

1. Add the `pulsar-client-v5` dependency (plus `pulsar-client-original` for the not-yet-migrated v4 code -- see [Dependencies](#dependencies)).
2. Move producers and consumers to the V5 API. The V5 client works against your **existing** `persistent://` topics, so you can do this without changing any topic.
3. When you're ready, [migrate the topics themselves to scalable topics](#migrating-the-topics) -- a separate, server-side step that is transparent to V5 applications.

## Prerequisites

- **Java 17.** The V5 client requires Java 17 (the current SDK supports Java 8+).
- **Dependencies.** Add `pulsar-client-v5`, plus `pulsar-client-original` while v4 code remains -- see [Dependencies](#dependencies) below.

## Dependencies

`pulsar-client-v5` already bundles the **unshaded** v4 client (`pulsar-client-original`). While you migrate incrementally, depend on `pulsar-client-original` for code still on the v4 API -- **not** the shaded `pulsar-client`, which would add a second, conflicting copy of the client classes. Once everything is on the V5 API, `pulsar-client-v5` alone is enough.

Use the [Pulsar BOM](java-setup.md#pulsar-bom) to keep all Pulsar artifacts on one version, and `netty-bom` to align Netty.

### Maven

```xml
<!-- in your <properties> block -->
<pulsar.version>@pulsar:version:latest@</pulsar.version>
<!-- set to the Netty version shipped with the Pulsar release above -->
<netty.version>...</netty.version>

<!-- in your <dependencyManagement> block -->
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-bom</artifactId>
  <version>${pulsar.version}</version>
  <type>pom</type>
  <scope>import</scope>
</dependency>
<dependency>
  <groupId>io.netty</groupId>
  <artifactId>netty-bom</artifactId>
  <version>${netty.version}</version>
  <type>pom</type>
  <scope>import</scope>
</dependency>

<!-- in your <dependencies> block; versions come from the BOMs -->
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client-v5</artifactId>
</dependency>
<!-- only while v4 code remains; remove once fully migrated -->
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client-original</artifactId>
</dependency>
```

### Gradle

```groovy
def pulsarVersion = '@pulsar:version:latest@'
def nettyVersion  = '...'   // the Netty version shipped with the Pulsar release above

dependencies {
    implementation enforcedPlatform("org.apache.pulsar:pulsar-bom:${pulsarVersion}")
    implementation enforcedPlatform("io.netty:netty-bom:${nettyVersion}")

    implementation 'org.apache.pulsar:pulsar-client-v5'
    // only while v4 code remains; remove once fully migrated
    implementation 'org.apache.pulsar:pulsar-client-original'
}
```

## API mapping

The biggest change is the consumer model: the four subscription types collapse into three purpose-built consumer types.

| Current SDK | V5 SDK |
|-------------|--------|
| `org.apache.pulsar.client.api.PulsarClient` | `org.apache.pulsar.client.api.v5.PulsarClient` |
| Exclusive / Failover subscription | **Stream consumer** -- ordered, cumulative ack |
| Shared / Key_Shared subscription | **Queue consumer** -- individual ack, negative ack, dead-letter |
| `Reader` | **Checkpoint consumer** -- external position via `Checkpoint` |
| `Schema.STRING`, `Schema.JSON(T.class)`, `Schema.AVRO(T.class)` | `Schema.string()`, `Schema.json(T.class)`, `Schema.avro(T.class)` |
| `consumer.acknowledge(msg)` | `consumer.acknowledge(msg.id())` |
| `reader.seek(messageId)` | a `Checkpoint` passed to `startPosition(...)` at build time |
| timeouts and delays as `long` milliseconds | `Duration` / `Instant` |
| builder option setters | immutable config records (`DeadLetterPolicy`, `BackoffPolicy`, …) |

Keep the current SDK for anything the V5 client does not yet cover: `Reader`-style arbitrary seeking, `TableView`, and non-persistent topics. Scalable-topic support in the other language SDKs is planned; today the V5 client is Java-only.

## Client

The client builder is nearly identical; the package changes from `...client.api` to `...client.api.v5`.

```java
// Current
import org.apache.pulsar.client.api.PulsarClient;
// V5
import org.apache.pulsar.client.api.v5.PulsarClient;

PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();
```

## Producers

Producers and the message builder carry over almost unchanged. Note the lowercase schema factory, and that the same code works against an existing `persistent://` topic or a `topic://` scalable topic.

```java
// Current
Producer<String> producer = client.newProducer(Schema.STRING)
        .topic("persistent://public/default/orders")
        .create();

// V5
Producer<String> producer = client.newProducer(Schema.string())
        .topic("persistent://public/default/orders")   // or topic://... for a scalable topic
        .create();

producer.newMessage().key("user-123").value("order placed").send();
```

## Consumers

Pick the V5 consumer that matches your current subscription type.

### Exclusive or Failover → Stream consumer

Ordered consumption with cumulative acknowledgment.

```java
// Current
Consumer<String> consumer = client.newConsumer(Schema.STRING)
        .topic("persistent://public/default/orders")
        .subscriptionName("my-sub")
        .subscriptionType(SubscriptionType.Failover)
        .subscribe();
Message<String> msg = consumer.receive();
consumer.acknowledgeCumulative(msg);

// V5
StreamConsumer<String> consumer = client.newStreamConsumer(Schema.string())
        .topic("persistent://public/default/orders")
        .subscriptionName("my-sub")
        .subscribe();
Message<String> msg = consumer.receive();
consumer.acknowledgeCumulative(msg.id());
```

### Shared or Key_Shared → Queue consumer

Parallel consumption with individual acknowledgment, negative acknowledgment, and dead-letter support.

```java
// Current
Consumer<String> consumer = client.newConsumer(Schema.STRING)
        .topic("persistent://public/default/orders")
        .subscriptionName("workers")
        .subscriptionType(SubscriptionType.Shared)
        .subscribe();
Message<String> msg = consumer.receive();
consumer.acknowledge(msg);            // or consumer.negativeAcknowledge(msg);

// V5
QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .topic("persistent://public/default/orders")
        .subscriptionName("workers")
        .subscribe();
Message<String> msg = consumer.receive();
consumer.acknowledge(msg.id());       // or consumer.negativeAcknowledge(msg.id());
```

### Reader → Checkpoint consumer

For code that tracks its own position (a `Reader` started from a `MessageId`), use a checkpoint consumer with a serializable `Checkpoint`.

```java
// Current
Reader<String> reader = client.newReader(Schema.STRING)
        .topic("persistent://public/default/orders")
        .startMessageId(MessageId.earliest)
        .create();
Message<String> msg = reader.readNext();

// V5
CheckpointConsumer<String> consumer = client.newCheckpointConsumer(Schema.string())
        .topic("persistent://public/default/orders")
        .startPosition(Checkpoint.earliest())
        .create();
Message<String> msg = consumer.receive();
byte[] state = consumer.checkpoint().toByteArray();   // persist; restore via Checkpoint.fromByteArray(...)
```

A `Checkpoint` replaces the `MessageId` you would store with a reader. The two are **not interchangeable** -- a saved `MessageId` cannot be used as a `Checkpoint` -- so plan a clean cutover when migrating readers.

### Multiple topics: pattern subscriptions → namespace consumers

In the current SDK, a single consumer can attach to many topics with a topic list or a regular-expression pattern:

```java
// Current -- pattern subscription
Consumer<String> consumer = client.newConsumer(Schema.STRING)
        .topicsPattern(Pattern.compile("persistent://tenant/ns/orders-.*"))
        .subscriptionName("workers")
        .subscriptionType(SubscriptionType.Shared)
        .subscribe();
```

In the V5 SDK, a stream or queue consumer attaches to an entire **namespace** instead, optionally narrowed by topic **properties** rather than a name pattern. Set `namespace(...)` in place of `topic(...)`:

```java
// V5 -- every scalable topic in the namespace
QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .namespace("tenant/ns")
        .subscriptionName("workers")
        .subscribe();

// V5 -- only topics whose properties match every filter (AND semantics)
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
- **Configuration** -- option setters become immutable records (`DeadLetterPolicy`, `BackoffPolicy`, `BatchingPolicy`, …), and time values use `Duration` / `Instant` instead of `long` milliseconds.

## Migrating the topics

Adopting the V5 API does not require changing your topics -- the V5 client operates against existing `persistent://` topics. To gain the benefits of scalable topics (automatic split/merge, no fixed partition count), migrate a topic on the server:

```shell
bin/pulsar-admin scalable-topics migrate persistent://public/default/orders
```

This is a one-way operation and is transparent to connected V5 clients. See [Migrate a regular topic](pathname:///docs/admin-api-scalable-topics#migrate-a-regular-topic).

## What's next

- [Java client (V5)](java-v5.md) -- the V5 client reference.
- [Scalable topics](pathname:///docs/concepts-scalable-topics) -- the topic model the V5 client is built for.
- [Manage scalable topics](pathname:///docs/admin-api-scalable-topics) -- create and migrate scalable topics.
