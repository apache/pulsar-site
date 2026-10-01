---
id: java-v5
title: Java client (v5)
sidebar_label: "v5 (scalable topics)"
description: Set up and use the Pulsar v5 Java client for scalable topics — producers, the three consumer types, schemas, and transactions.
---

The **v5 Java client** is a client SDK built for [scalable topics](pathname:///docs/concepts-scalable-topics). It offers three purpose-built consumer types and a modern, sync-first API, and it also works against existing partitioned and non-partitioned topics -- so you can adopt it before migrating any topic.

For how it compares to the v4 Java client, see [Java client SDKs](java.md#java-client-sdks). For the messaging model and a deeper API walkthrough, see [Messaging](pathname:///docs/concepts-messaging). Every type named below links to its [API reference](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/package-summary.html).

:::note

The v5 client requires **Java 17** and Pulsar 5.x brokers with `scalableTopicsEnabled=true`, including when it accesses regular `persistent://` topics. It does not support `non-persistent://` topics or older brokers that lack the scalable-topic protocol. Today the v5 client is available in Java.

:::

## Install

Use **`pulsar-client-v5-all`** and follow [Java client setup](java-setup.md#step-1-install-java-client-library) for the Maven and Gradle dependency examples, [Pulsar and Netty BOMs](java-dependency-configuration.md#pulsar-bom), and transitive dependency exclusions. The dependency configuration page also covers external dependencies and the shaded fallback for unresolved dependency conflicts.

The v5 API lives under [`org.apache.pulsar.client.api.v5`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/package-summary.html). Choosing a combined dependency does not switch an application from v4 to v5; changing the API is a separate [source migration](java-migrate-to-v5.md).

## Create a client

A [`PulsarClient`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/PulsarClient.html) is the entry point to the API: build one, share it across all producers and consumers, and close it on shutdown. [`PulsarClient.builder()`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/PulsarClient.html#builder()) returns a [`PulsarClientBuilder`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/PulsarClientBuilder.html) where you configure the connection.

```java
import org.apache.pulsar.client.api.v5.PulsarClient;

PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();

// ... create producers and consumers ...

client.close();
```

The service URL uses the `pulsar://` (or `pulsar+ssl://`) scheme. Authentication, TLS, operation timeouts, and memory limits are all set on the same builder.

Pulsar 5.x proxies can forward scalable-topic control connections and segment traffic. When using the Pulsar proxy protocol, configure it through `ConnectionPolicy`:

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://proxy.example.com:6650")
        .connectionPolicy(ConnectionPolicy.builder()
                .proxy("pulsar://proxy.example.com:6650", ProxyProtocol.SNI)
                .build())
        .build();
```

`ConnectionPolicy` and `ProxyProtocol` are in `org.apache.pulsar.client.api.v5.config`. Both service URLs must use the binary protocol scheme. The proxy must be able to select a broker through its configured broker service URL or broker discovery. Broker support for scalable topics is still required.

## Produce messages

Create a [`Producer`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/Producer.html) from the client with a [schema](#schemas) and a topic. [`client.newProducer(schema)`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/PulsarClient.html#newProducer(org.apache.pulsar.client.api.v5.schema.Schema)) returns a [`ProducerBuilder`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/ProducerBuilder.html); call [`create()`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/ProducerBuilder.html#create()) to get the producer. Each [`producer.newMessage()`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/Producer.html#newMessage()) returns a [`MessageBuilder`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/MessageBuilder.html) for setting the key, value, and other per-message properties before sending:

```java
Producer<String> producer = client.newProducer(Schema.string())
        .topic("topic://public/default/orders")
        .create();

producer.newMessage()
        .key("user-123")
        .value("order placed")
        .send();
```

Use the `topic://` scheme explicitly for scalable topics. A short name such as `orders` resolves to `persistent://public/default/orders`, and `tenant/namespace/orders` also selects the persistent domain. For a regular partitioned topic, use its base name; the v5 lookup rejects an individual `-partition-N` target.

For future-based sends, [`producer.async()`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/Producer.html#async()) returns an [`AsyncProducer`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/async/AsyncProducer.html) whose operations return `CompletableFuture`s:

```java
var async = producer.async();
async.newMessage().value("order placed").send()
        .thenAccept(id -> System.out.println("sent " + id));
async.flush().join();
```

### Bound pending sends

The client's memory limit bounds pending producer messages across segments. Configure it with a `MemorySize` value:

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .memoryLimit(MemorySize.ofMegabytes(128))
        .build();

Producer<String> producer = client.newProducer(Schema.string())
        .topic("topic://public/default/orders")
        .blockIfQueueFull(false)
        .create();
```

`MemorySize` is in `org.apache.pulsar.client.api.v5.config`. With the default `blockIfQueueFull(true)`, both synchronous and asynchronous send calls can block the caller when the memory limit is reached. Set it to `false` for immediate failure with `PulsarClientException.MemoryBufferIsFullException`, and handle retry or backpressure in your application. Sends from a client I/O thread fail at the limit regardless of this setting. `flush()` waits for pending sends to complete, including the futures returned to asynchronous callers; it does not acknowledge consumed messages. Check send futures for failures as well as awaiting a flush.

## Consume messages

The v5 client replaces the four v4 subscription types with three consumer types. Choose one by how you intend to consume; see [Consumers](pathname:///docs/concepts-messaging#consumers) for the full semantics. Each consumer hands you a [`Message`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/Message.html), identified by a [`MessageId`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/MessageId.html).

### Stream consumer

A [`StreamConsumer`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/StreamConsumer.html) gives ordered consumption with cumulative acknowledgment -- acknowledging a message also acknowledges everything before it:

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

Consumers sharing a subscription divide its segments and entry buckets. This allows key-shared parallelism without creating a segment for every consumer. A cumulative acknowledgment covers messages previously delivered to that consumer across its assigned segments and buckets, so process those messages successfully before acknowledging a later one. Closing a stream consumer does not acknowledge unprocessed deliveries.

### Queue consumer

A [`QueueConsumer`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/QueueConsumer.html) gives parallel consumption with individual acknowledgment, negative acknowledgment, and dead-letter support. It uses shared dispatch and does not guarantee per-key order:

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

To retry stalled deliveries and limit repeated redelivery, configure policy objects from `org.apache.pulsar.client.api.v5.config`:

```java
QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .topic("topic://public/default/orders")
        .subscriptionName("workers")
        .processingTimeout(ProcessingTimeoutPolicy.of(Duration.ofSeconds(30)))
        .negativeAckRedeliveryBackoff(
                BackoffPolicy.exponential(Duration.ofSeconds(1), Duration.ofSeconds(30)))
        .deadLetterPolicy(DeadLetterPolicy.builder()
                .maxRedeliverCount(5)
                .deadLetterTopic("topic://public/default/orders-DLQ")
                .build())
        .subscribe();
```

Processing timeouts are disabled by default. When enabled, the client requests redelivery for messages that remain unacknowledged beyond the timeout. Dead-letter forwarding acknowledges the source message only after publishing it to the dead-letter topic succeeds. Create a subscription on that topic to retain forwarded messages until they are consumed.

### Checkpoint consumer

A [`CheckpointConsumer`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/CheckpointConsumer.html) suits stream-processing engines that track their own position -- it has no subscription and no acknowledgment. Capture a serializable [`Checkpoint`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/Checkpoint.html) and restore from it later:

```java
CheckpointConsumer<String> consumer = client.newCheckpointConsumer(Schema.string())
        .topic("topic://public/default/orders")
        .startPosition(Checkpoint.earliest())   // earliest(), latest(), or a saved checkpoint
        .create();

Message<String> msg = consumer.receive(Duration.ofSeconds(5));
byte[] state = consumer.checkpoint().toByteArray();   // persist externally
// resume later with: .startPosition(Checkpoint.fromByteArray(state))
```

Without a group, each checkpoint consumer independently reads every segment. Set `.consumerGroup("processing-job")` to distribute segments and entry buckets across consumers with the same group name. The group coordinates live assignments; it does not persist a cursor or retain backlog. Each consumer must supply its own checkpoint on restart. A checkpoint advances as messages are received, so persist it only after the corresponding application processing is included in your recovery state. Configure [retention](pathname:///docs/concepts-scalable-topics#retention-across-layout-changes) to cover checkpoint recovery and replay.

### Initial positions and replay

Stream and queue consumers accept `.subscriptionInitialPosition(SubscriptionInitialPosition.EARLIEST)` or `LATEST` from `org.apache.pulsar.client.api.v5.config`. This applies when a subscription cursor is first created; reconnecting an existing subscription resumes its cursor. To replay an existing subscription from a timestamp, use the [scalable-topic seek admin API](pathname:///docs/admin-api-scalable-topics#manage-subscriptions). Checkpoint consumers start at `Checkpoint.earliest()`, `Checkpoint.latest()`, or a previously captured checkpoint; they have no timestamp-based seek method.

### Consume a namespace

Stream and queue consumers can follow all scalable topics in a namespace, optionally filtering their topic properties:

```java
QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .namespace("public/default", Map.of("team", "ingest", "tier", "gold"))
        .subscriptionName("ingest-workers")
        .subscribe();
```

The filters match exact values and all must match. `.namespace("public/default")` selects every scalable topic there. The consumer attaches when matching topics appear and detaches when they disappear or cease matching; discovery does not create topics. Select either `.topic(...)` or `.namespace(...)` on a builder. Namespace discovery selects `topic://` topics; regular persistent topics can be consumed individually with `.topic("persistent://...")`.

A namespace stream consumer's cumulative acknowledgment can cover previously delivered messages from **multiple topics**. Process those messages before acknowledging a later one. Closing the consumer or removing a topic from its matching set does not acknowledge unprocessed deliveries.

### Asynchronous receives and backpressure

Each consumer has an `.async()` view with future-based receives. These wait for messages without occupying a thread with a blocking receive. Timeout overloads on stream and checkpoint asynchronous consumers complete with `null` when no message arrives in time. Avoid blocking receive continuations with slow processing; use your own executor when appropriate.

Queue consumers expose `.receiverQueueSize(...)` to tune prefetch. Scalable consumers pause their per-segment receive loops when their shared delivery buffer fills and resume as it drains. The buffer can temporarily exceed its configured size by in-flight deliveries, and underlying segment consumers also buffer messages, so this setting is not a strict total-memory cap.

`BackoffPolicy` applies jitter by default, including with `fixed(...)`. Its default `jitterPercent` is `10`, which varies the base delay by up to 5% in either direction. Use the builder's `.jitterPercent(0)` when configuring a policy that needs no jitter.

## Schemas

Pass a [`Schema`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/schema/Schema.html) when creating any producer or consumer. The v5 schema factories are lowercase methods:

```java
Schema.string()            // String
Schema.json(Order.class)   // JSON-encoded POJO
Schema.avro(Order.class)   // Avro-encoded POJO
```

Primitive factories ([`Schema.int32()`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/schema/Schema.html#int32()), [`Schema.bool()`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/schema/Schema.html#bool()), [`Schema.bytes()`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/schema/Schema.html#bytes()), …) and [`Schema.protobuf(...)`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/schema/Schema.html#protobuf(java.lang.Class)) are also available.

## End-to-end encryption

Configure message encryption separately from TLS and authentication. The v5 producer uses `ProducerEncryptionPolicy`, and all three consumer builders accept `ConsumerEncryptionPolicy` (both in `org.apache.pulsar.client.api.v5.config`). For PEM files, use `PemFileKeyProvider` from `org.apache.pulsar.client.api.v5.auth`:

```java
var publicKeys = PemFileKeyProvider.builder()
        .publicKey("orders-v1", Path.of("/etc/keys/orders-public.pem"))
        .build();
var privateKeys = PemFileKeyProvider.builder()
        .privateKey("orders-v1", Path.of("/etc/keys/orders-private.pem"))
        .build();

Producer<String> producer = client.newProducer(Schema.string())
        .topic("topic://public/default/orders")
        .encryptionPolicy(ProducerEncryptionPolicy.builder()
                .publicKeyProvider(publicKeys)
                .keyName("orders-v1")
                .build())
        .create();

QueueConsumer<String> consumer = client.newQueueConsumer(Schema.string())
        .topic("topic://public/default/orders")
        .subscriptionName("encrypted-orders")
        .encryptionPolicy(ConsumerEncryptionPolicy.builder()
                .privateKeyProvider(privateKeys)
                .build())
        .subscribe();
```

Implement `PublicKeyProvider` or `PrivateKeyProvider` for other key sources. Their methods return futures of `EncryptionKey`; the private-key lookup also receives producer-supplied metadata. Producers can configure multiple `.keyNames(...)`, allowing a consumer with any matching private key to decrypt.

The v5 producer disables batching when encryption is configured. For unencrypted messages with batching enabled, it batches by entry bucket so each entry can be assigned to one consumer. Include the absence of batching when sizing encrypted workloads.

The default failure action is `FAIL` on both sides. A producer can explicitly choose `SEND_UNENCRYPTED`, which sends plaintext when encryption fails. A consumer can choose `DISCARD` to skip unreadable messages or `CONSUME` to deliver the encrypted payload for application handling; use a byte schema when handling ciphertext. A private-key provider is required with `FAIL`, and may be omitted for the other actions. Choose failure actions deliberately because they change what data is sent or delivered.

## Transactions

Enable transactions when creating the client:

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .transactionPolicy(TransactionPolicy.builder()
                .timeout(Duration.ofMinutes(1))
                .build())
        .build();
```

`TransactionPolicy` is in `org.apache.pulsar.client.api.v5.config`. The broker must also have transaction coordinator support configured. See [Transactions](pathname:///docs/txn-use).

A [`Transaction`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/Transaction.html) lets you produce messages and acknowledge consumed messages atomically. Start one with [`client.newTransaction()`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/PulsarClient.html#newTransaction()), bind a produce with [`.transaction(txn)`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/MessageMetadata.html#transaction(org.apache.pulsar.client.api.v5.Transaction)) on the message builder and an acknowledgment with the [two-argument `acknowledge`](@pulsar:javadoc:client-v5@/org/apache/pulsar/client/api/v5/QueueConsumer.html#acknowledge(org.apache.pulsar.client.api.v5.MessageId,org.apache.pulsar.client.api.v5.Transaction)), then commit or abort:

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

- [Messaging](pathname:///docs/concepts-messaging) -- the messaging model and a deeper v5 API walkthrough.
- [Scalable topics](pathname:///docs/concepts-scalable-topics) -- the topic model the v5 client is built for.
- [Manage scalable topics](pathname:///docs/admin-api-scalable-topics) -- create and administer scalable topics.
