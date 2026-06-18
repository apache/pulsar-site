---
id: java-v5
title: Java client (V5)
sidebar_label: "V5 (scalable topics)"
description: Set up and use the Pulsar V5 Java client for scalable topics — producers, the three consumer types, schemas, and transactions.
---

The **V5 Java client** is a client SDK built for [scalable topics](pathname:///docs/concepts-scalable-topics). It offers three purpose-built consumer types and a modern, sync-first API, and it also works against existing partitioned and non-partitioned topics -- so you can adopt it before migrating any topic.

For how it compares to the current Java client, see [Java client SDKs](java.md#java-client-sdks). For the messaging model and a deeper API walkthrough, see [Messaging](pathname:///docs/concepts-messaging).

:::note

The V5 client requires **Java 17**. Scalable-topic support in the other language SDKs is planned; today the V5 client is available in Java.

:::

## Install

The V5 client is published to Maven Central as `pulsar-client-v5` (available from **@pulsar:version:latest@**). The API lives under the `org.apache.pulsar.client.api.v5` package.

### Maven

```xml
<dependency>
  <groupId>org.apache.pulsar</groupId>
  <artifactId>pulsar-client-v5</artifactId>
  <version>@pulsar:version:latest@</version>
</dependency>
```

### Gradle

```groovy
dependencies {
    implementation "org.apache.pulsar:pulsar-client-v5:@pulsar:version:latest@"
}
```

## Create a client

Build one `PulsarClient` and share it across producers and consumers; close it on shutdown.

```java
import org.apache.pulsar.client.api.v5.PulsarClient;

PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();

// ... create producers and consumers ...

client.close();
```

The service URL uses the `pulsar://` (or `pulsar+ssl://`) scheme. Authentication, TLS, operation timeouts, and memory limits are set on the same builder.

## Produce messages

Create a producer with a [schema](#schemas) and a topic, then build and send messages:

```java
Producer<String> producer = client.newProducer(Schema.string())
        .topic("topic://public/default/orders")
        .create();

producer.newMessage()
        .key("user-123")
        .value("order placed")
        .send();
```

Send asynchronously through `async()`:

```java
var async = producer.async();
async.newMessage().value("order placed").send()
        .thenAccept(id -> System.out.println("sent " + id));
async.flush().join();
```

## Consume messages

The V5 client replaces the four classic subscription types with three consumer types. Choose one by how you intend to consume; see [Consumers](pathname:///docs/concepts-messaging#consumers) for the full semantics.

### Stream consumer

Ordered consumption with cumulative acknowledgment:

```java
StreamConsumer<String> consumer = client.newStreamConsumer(Schema.string())
        .topic("topic://public/default/orders")
        .subscriptionName("my-sub")
        .subscribe();

Message<String> msg = consumer.receive(Duration.ofSeconds(5)); // null on timeout
if (msg != null) {
    process(msg.value());
    consumer.acknowledgeCumulative(msg.id());
}
```

### Queue consumer

Parallel consumption with individual acknowledgment, negative acknowledgment, and dead-letter support:

```java
QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .topic("topic://public/default/orders")
        .subscriptionName("workers")
        .subscribe();

Message<String> msg = consumer.receive(Duration.ofSeconds(5));
if (msg != null) {
    try {
        process(msg.value());
        consumer.acknowledge(msg.id());
    } catch (Exception e) {
        consumer.negativeAcknowledge(msg.id());
    }
}
```

### Checkpoint consumer

For stream-processing engines that track their own position -- no subscription and no acknowledgment. Capture a serializable `Checkpoint` and restore from it:

```java
CheckpointConsumer<String> consumer = client.newCheckpointConsumer(Schema.string())
        .topic("topic://public/default/orders")
        .startPosition(Checkpoint.earliest())   // earliest(), latest(), or a saved checkpoint
        .create();

Message<String> msg = consumer.receive(Duration.ofSeconds(5));
byte[] state = consumer.checkpoint().toByteArray();   // persist externally
// resume later with: .startPosition(Checkpoint.fromByteArray(state))
```

## Schemas

Pass a schema when creating any producer or consumer. The V5 schema factories are lowercase methods:

```java
Schema.string()            // String
Schema.json(Order.class)   // JSON-encoded POJO
Schema.avro(Order.class)   // Avro-encoded POJO
```

Primitive factories (`Schema.int32()`, `Schema.bool()`, `Schema.bytes()`, …) and `Schema.protobuf(...)` are also available.

## Transactions

Produce messages and acknowledge consumed messages atomically. Bind a produce with `.transaction(txn)` on the message builder and an acknowledgment with the two-argument `acknowledge`:

```java
Transaction txn = client.newTransaction();
try {
    producer.newMessage().transaction(txn).value(result).send();
    consumer.acknowledge(msg.id(), txn);
    txn.commit();
} catch (Exception e) {
    txn.abort();
}
```

## What's next

- [Messaging](pathname:///docs/concepts-messaging) -- the messaging model and a deeper V5 API walkthrough.
- [Scalable topics](pathname:///docs/concepts-scalable-topics) -- the topic model the V5 client is built for.
- [Manage scalable topics](pathname:///docs/admin-api-scalable-topics) -- create and administer scalable topics.
