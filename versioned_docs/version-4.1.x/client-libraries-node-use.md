---
id: client-libraries-node-use
title: Usee Node.js client
sidebar_label: "Use"
description: Learn how to use Node.js client in Pulsar.
---

## Create a producer

You can configure Node.js producers using a [producer configuration](client-libraries-node-configs.md#producer-configuration) object.

Here is an example:

```javascript
const producer = await client.createProducer({
  topic: 'my-topic', // or 'my-tenant/my-namespace/my-topic' to specify topic's tenant and namespace
});

await producer.send({
  data: Buffer.from("Hello, Pulsar"),
});

await producer.close();
```

:::note

When you create a new Pulsar producer, the operation returns `Promise` object and get producer instance or an error through executor function. In the above example, use `await` operator instead of executor function.

:::

#### Producer operations

Pulsar Node.js producers have the following methods available:

| Method | Description | Return type |
| :----- | :---------- | :---------- |
| `send(Object)` | Publishes a [message](#messages) to the producer's topic. When the message is successfully acknowledged by the Pulsar broker, or an error is thrown, the Promise object whose result is the message ID runs executor function. | `Promise<Object>` |
| `flush()` | Sends message from send queue to Pulsar broker. When the message is successfully acknowledged by the Pulsar broker, or an error is thrown, the Promise object runs executor function. | `Promise<null>` |
| `close()` | Closes the producer and releases all resources allocated to it. Once `close()` is called, no more messages are accepted from the publisher. This method returns a Promise object. It runs the executor function when all pending publish requests are persisted by Pulsar. If an error is thrown, no pending writes are retried. | `Promise<null>` |
| `getProducerName()` | Getter method of the producer name. | `string` |
| `getTopic()` | Getter method of the name of the topic. | `string` |

#### Producer example

This example creates a Node.js producer for the `my-topic` topic and sends 10 messages to that topic:

```javascript
const Pulsar = require('pulsar-client');

(async () => {
  // Create a client
  const client = new Pulsar.Client({
    serviceUrl: 'pulsar://localhost:6650',
  });

  // Create a producer
  const producer = await client.createProducer({
    topic: 'my-topic',
  });

  // Send messages
  for (let i = 0; i < 10; i += 1) {
    const msg = `my-message-${i}`;
    producer.send({
      data: Buffer.from(msg),
    });
    console.log(`Sent message: ${msg}`);
  }
  await producer.flush();

  await producer.close();
  await client.close();
})();
```

## Create a consumer

You can configure Node.js consumers using a [consumer configuration](client-libraries-node-configs.md#consumer-configuration) object.

Here is an example:

```javascript
const consumer = await client.subscribe({
  topic: 'my-topic',
  subscription: 'my-subscription',
});

const msg = await consumer.receive();
console.log(msg.getData().toString());
consumer.acknowledge(msg);

await consumer.close();
```

:::note
When you create a new Pulsar consumer, the operation returns `Promise` object and get consumer instance or an error through executor function. In this example, use `await` operator instead of executor function.
:::

#### Consumer operations

Pulsar Node.js consumers have the following methods available:

| Method | Description | Return type |
| :----- | :---------- | :---------- |
| `receive()` | Receives a single message from the topic. When the message is available, the Promise object run executor function and get message object. | `Promise<Object>` |
| `receive(Number)` | Receives a single message from the topic with specific timeout in milliseconds. | `Promise<Object>` |
| `acknowledge(Object)` | [Acknowledges](reference-terminology.md#acknowledgment-ack) a message to the Pulsar [broker](reference-terminology.md#broker) by message object. | `void` |
| `acknowledgeId(Object)` | [Acknowledges](reference-terminology.md#acknowledgment-ack) a message to the Pulsar [broker](reference-terminology.md#broker) by message ID object. | `void` |
| `acknowledgeCumulative(Object)` | [Acknowledges](reference-terminology.md#acknowledgment-ack) *all* the messages in the stream, up to and including the specified message. The `acknowledgeCumulative` method returns void, and send the ack to the broker asynchronously. After that, the messages are *not* redelivered to the consumer. Cumulative acking can not be used with a [shared](concepts-messaging.md#shared) subscription type. | `void` |
| `acknowledgeCumulativeId(Object)` | [Acknowledges](reference-terminology.md#acknowledgment-ack) *all* the messages in the stream, up to and including the specified message ID. | `void` |
| `negativeAcknowledge(Message)`| [Negatively acknowledges](reference-terminology.md#negative-acknowledgment-nack)  a message to the Pulsar broker by message object. | `void` |
| `negativeAcknowledgeId(MessageId)` | [Negatively acknowledges](reference-terminology.md#negative-acknowledgment-nack) a message to the Pulsar broker by message ID object. | `void` |
| `close()` | Closes the consumer, disabling its ability to receive messages from the broker. | `Promise<null>` |
| `unsubscribe()` | Unsubscribes the subscription. | `Promise<null>` |

#### Consumer example

This example creates a Node.js consumer with the `my-subscription` subscription on the `my-topic` topic, receives messages, prints the content that arrive, and acknowledges each message to the Pulsar broker for 10 times:

```javascript
const Pulsar = require('pulsar-client');

(async () => {
  // Create a client
  const client = new Pulsar.Client({
    serviceUrl: 'pulsar://localhost:6650',
  });

  // Create a consumer
  const consumer = await client.subscribe({
    topic: 'my-topic',
    subscription: 'my-subscription',
    subscriptionType: 'Exclusive',
  });

  // Receive messages
  for (let i = 0; i < 10; i += 1) {
    const msg = await consumer.receive();
    console.log(msg.getData().toString());
    consumer.acknowledge(msg);
  }

  await consumer.close();
  await client.close();
})();
```

Instead, a consumer can be created with `listener` to process messages.

```javascript
// Create a consumer
const consumer = await client.subscribe({
  topic: 'my-topic',
  subscription: 'my-subscription',
  subscriptionType: 'Exclusive',
  listener: (msg, msgConsumer) => {
    console.log(msg.getData().toString());
    msgConsumer.acknowledge(msg);
  },
});
```

:::note

Pulsar Node.js client uses [AsyncWorker](https://github.com/nodejs/node-addon-api/blob/main/doc/async_worker). Asynchronous operations such as creating consumers/producers and receiving/sending messages are performed in worker threads.
Until completion of these operations, worker threads are blocked.
Since there are only 4 worker threads by default, a called method may never be complete.
To avoid this situation, you can set `UV_THREADPOOL_SIZE` to increase the number of worker threads, or define `listener` instead of calling `receive()` many times.

:::

## Create a reader

Pulsar readers are different from consumers because with readers you need to explicitly specify which message in the stream you want to begin with (consumers, on the other hand, automatically begin with the most recently unacked message). You can configure Node.js readers using a [reader configuration](client-libraries-node-configs.md#reader-configuration) object.

Here is an example:

```javascript
const reader = await client.createReader({
  topic: 'my-topic',
  startMessageId: Pulsar.MessageId.earliest(),
});

const msg = await reader.readNext();
console.log(msg.getData().toString());

await reader.close();
```

#### Reader operations

Pulsar Node.js readers have the following methods available:

| Method | Description | Return type |
| :----- | :---------- | :---------- |
| `readNext()` | Receives the next message on the topic (analogous to the `receive` method for [consumers](#consumer-operations)). When the message is available, the Promise object run executor function and get message object. | `Promise<Object>` |
| `readNext(Number)` | Receives a single message from the topic with specific timeout in milliseconds. | `Promise<Object>` |
| `hasNext()` | Return whether the broker has next message in target topic. | `Boolean` |
| `close()` | Closes the reader, disabling its ability to receive messages from the broker. | `Promise<null>` |

#### Reader example

This example creates a Node.js reader with the `my-topic` topic, reads messages, and prints the content that arrive for 10 times:

```javascript
const Pulsar = require('pulsar-client');

(async () => {
  // Create a client
  const client = new Pulsar.Client({
    serviceUrl: 'pulsar://localhost:6650',
    operationTimeoutSeconds: 30,
  });

  // Create a reader
  const reader = await client.createReader({
    topic: 'my-topic',
    startMessageId: Pulsar.MessageId.earliest(),
  });

  // read messages
  for (let i = 0; i < 10; i += 1) {
    const msg = await reader.readNext();
    console.log(msg.getData().toString());
  }

  await reader.close();
  await client.close();
})();
```