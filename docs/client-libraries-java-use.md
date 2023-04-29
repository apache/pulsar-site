---
id: client-libraries-java-use
title: Use a Java client
sidebar_label: "Use"
---

## Create a producer

Once you've instantiated a [PulsarClient](/api/client/org/apache/pulsar/client/api/PulsarClient) object, you can create a [Producer](/api/client/org/apache/pulsar/client/api/Producer) for a specific Pulsar [topic](reference-terminology.md#topic).

```java
Producer<byte[]> producer = client.newProducer()
        .topic("my-topic")
        .create();

// You can then send messages to the broker and topic you specified:
producer.send("My message".getBytes());
```

By default, producers produce messages that consist of byte arrays. You can produce different types by specifying a message [schema](#schema).

```java
Producer<String> stringProducer = client.newProducer(Schema.STRING)
        .topic("my-topic")
        .create();
stringProducer.send("My message");
```

> Make sure that you close your producers, consumers, and clients when you do not need them.

> ```java
> producer.close();
> consumer.close();
> client.close();
> ```

>
> Close operations can also be asynchronous:

> ```java
> producer.closeAsync()
>    .thenRun(() -> System.out.println("Producer closed"))
>    .exceptionally((ex) -> {
>        System.err.println("Failed to close producer: " + ex);
>        return null;
>    });
> ```

## Create a consumer

In Pulsar, consumers subscribe to topics and handle messages that producers publish to those topics. You can instantiate a new [consumer](reference-terminology.md#consumer) by first instantiating a [PulsarClient](/api/client/org/apache/pulsar/client/api/PulsarClient) object and passing it a URL for a Pulsar broker (as [above](#client-configuration)).

Once you've instantiated a [PulsarClient](/api/client/org/apache/pulsar/client/api/PulsarClient) object, you can create a [Consumer](/api/client/org/apache/pulsar/client/api/Consumer) by specifying a [topic](reference-terminology.md#topic) and a [subscription](concepts-messaging.md#subscription-types).

```java
Consumer consumer = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscribe();
```

The `subscribe` method will auto-subscribe the consumer to the specified topic and subscription. One way to make the consumer listen to the topic is to set up a `while` loop. In this example loop, the consumer listens for messages, prints the contents of any received message, and then [acknowledges](reference-terminology.md#acknowledgment-ack) that the message has been processed. If the processing logic fails, you can use [negative acknowledgment](reference-terminology.md#acknowledgment-ack) to redeliver the message later.

```java
while (true) {
  // Wait for a message
  Message msg = consumer.receive();

  try {
      // Do something with the message
      System.out.println("Message received: " + new String(msg.getData()));

      // Acknowledge the message
      consumer.acknowledge(msg);
  } catch (Exception e) {
      // Message failed to process, redeliver later
      consumer.negativeAcknowledge(msg);
  }
}
```

If you don't want to block your main thread but constantly listen for new messages, consider using a `MessageListener`. The `MessageListener` uses a thread pool inside the client. You can set the number of threads for message listeners in the ClientBuilder. The `MessageListener` will use a thread pool inside the PulsarClient. You can set the number of threads to use for message listeners in the ClientBuilder.

```java
MessageListener myMessageListener = (consumer, msg) -> {
  try {
      System.out.println("Message received: " + new String(msg.getData()));
      consumer.acknowledge(msg);
  } catch (Exception e) {
      consumer.negativeAcknowledge(msg);
  }
}

Consumer consumer = client.newConsumer()
     .topic("my-topic")
     .subscriptionName("my-subscription")
     .messageListener(myMessageListener)
     .subscribe();
```

## Create a reader

With the [reader interface](concepts-clients.md#reader-interface), Pulsar clients can "manually position" themselves within a topic and read all messages from a specified message onward. The Pulsar API for Java enables you to create [Reader](/api/client/org/apache/pulsar/client/api/Reader) objects by specifying a topic and a [MessageId](/api/client/org/apache/pulsar/client/api/MessageId).

The following is an example.

```java
byte[] msgIdBytes = // Some message ID byte array
MessageId id = MessageId.fromByteArray(msgIdBytes);
Reader reader = pulsarClient.newReader()
        .topic(topic)
        .startMessageId(id)
        .create();

while (true) {
    Message message = reader.readNext();
    // Process message
}
```

In the example above, a `Reader` object is instantiated for a specific topic and message (by ID); the reader iterates over each message in the topic after the message is identified by `msgIdBytes` (how that value is obtained depends on the application).

The code sample above shows pointing the `Reader` object to a specific message (by ID), but you can also use `MessageId.earliest` to point to the earliest available message on the topic of `MessageId.latest` to point to the most recent available message.