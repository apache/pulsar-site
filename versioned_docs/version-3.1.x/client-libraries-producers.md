---
id: client-libraries-producers
title: Work with producer
sidebar_label: "Work with producer"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

After setting up your clients, you can explore more to start working with [producers](concepts-clients.md#producers).

## Create the producer

This example shows how to create a producer.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"}]}>

  <TabItem value="Java">

  Create a producer synchronously:
  ```java
  Producer<String> producer = pulsarClient.newProducer(Schema.STRING)
                .topic("my-topic")
                .create();
  ```

  Create a producer asynchronously:
  ```java
  pulsarClient.newProducer(Schema.STRING)
                .topic("my-topic")
                .createAsync()
                .thenAccept(p -> {
                    log.info("Producer created: {}", p.getProducerName());
                });
  ```

  </TabItem>

  <TabItem value="C++">

  ```cpp
  Producer producer;
  Result result = client.createProducer("my-topic", producer);
  ```

  </TabItem>
</Tabs>
````

## Publish messages

Pulsar supports both synchronous and asynchronous publishing of messages in most clients. In some language-specific clients, such as Node.js and C#, you can publish messages synchronously based on the asynchronous method using language-specific mechanisms (like `await`).

With async publishment, the producer puts the message in a blocking queue and returns it immediately. Then the client library sends the message to the broker in the background. If the queue is full (max size configurable), the producer is blocked or fails immediately when calling the API, depending on arguments passed to the producer.

This example shows how to publish messages using producers. The publish operation is done until the broker tells you the message has been successfully published. The broker returns the message ID after the message is published successfully.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"},{"label":"Go","value":"Go"},{"label":"Node.js","value":"Node.js"},{"label":"C#","value":"C#"}]}>
<TabItem value="Java">

  Publish messages synchronously:
  ```java
  MessageId messageId = producer.newMessage()
                    .value("my-sync-message")
                    .send();
  ```

  Publish messages asynchronously:
  ```java
  producer.newMessage()
          .value("my-sync-message")
          .sendAsync()
          .thenAccept(messageId -> {
              log.info("Message ID: {}", messageId);
          });
  ```

  </TabItem>

  <TabItem value="C++">

  ```cpp
  Message msg = MessageBuilder()
                      .setContent("my-sync-message")
                      .build();
  Result res = producer.send(msg);
  ```

  </TabItem>

  <TabItem value="Go">

   ```go
    msg := pulsar.ProducerMessage{
        Payload: []byte("my-sync-message"),
    }

    if _, err := producer.send(msg); err != nil {
      log.Fatalf("Could not publish message due to: %v", err)
    }
   ```

  For all methods of the `ProducerMessage` object, see [Go API doc](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#ProducerMessage).

  </TabItem>
  <TabItem value="Node.js">

   ```javascript
   const msg = {
   data: Buffer.from('my-sync-message'),
   }

   await producer.send(msg);
   ```

The following keys are available for producer message objects:

| Parameter | Description |
| :-------- | :---------- |
| `data` | The actual data payload of the message. |
| `properties` | A Object for any application-specific metadata attached to the message. |
| `eventTimestamp` | The timestamp associated with the message. |
| `sequenceId` | The sequence ID of the message. |
| `partitionKey` | The optional key associated with the message (particularly useful for things like topic compaction). |
| `replicationClusters` | The clusters to which this message is replicated. Pulsar brokers handle message replication automatically; you should only change this setting if you want to override the broker default. |
| `deliverAt` | The absolute timestamp at or after which the message is delivered. | |
| `deliverAfter` | The relative delay after which the message is delivered. | |

**Message object operations**

In Pulsar Node.js client, you can receive (or read) message objects as consumers (or readers).

The message object has the following methods available:

| Method | Description | Return type |
| :----- | :---------- | :---------- |
| `getTopicName()` | Getter method of topic name. | `String` |
| `getProperties()` | Getter method of properties. | `Array<Object>` |
| `getData()` | Getter method of message data. | `Buffer` |
| `getMessageId()` | Getter method of [message id object](#message-id-object-operations). | `Object` |
| `getPublishTimestamp()` | Getter method of publish timestamp. | `Number` |
| `getEventTimestamp()` | Getter method of event timestamp. | `Number` |
| `getRedeliveryCount()` | Getter method of redelivery count. | `Number` |
| `getPartitionKey()` | Getter method of partition key. | `String` |

**Message ID object operations**

In Pulsar Node.js client, you can get message id objects from message objects.

The message id object has the following methods available:

| Method | Description | Return type |
| :----- | :---------- | :---------- |
| `serialize()` | Serialize the message id into a Buffer for storing. | `Buffer` |
| `toString()` | Get message id as String. | `String` |

The client has a static method of message id object. You can access it as `Pulsar.MessageId.someStaticMethod`.

The following static methods are available for the message id object:

| Method | Description | Return type |
| :----- | :---------- | :---------- |
| `earliest()` | MessageId representing the earliest, or oldest available message stored in the topic. | `Object` |
| `latest()` | MessageId representing the latest, or last published message in the topic. | `Object` |
| `deserialize(Buffer)` | Deserialize a message id object from a Buffer. | `Object` |

 </TabItem>

<TabItem value="C#">

```csharp
var data = Encoding.UTF8.GetBytes("Hello World");
await producer.Send(data);
```

  </TabItem>
</Tabs>
````

## Configure messages

You can set various properties of Pulsar's messages. The values of these properties are stored in the metadata of a message.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"},{"label":"C#","value":"C#"}]}>

<TabItem value="Java">

  ```java
  producer.newMessage()
                .key("my-key") // Set the message key
                .eventTime(System.currentTimeMillis()) // Set the event time
                .sequenceId(1203) // Set the sequenceId for the deduplication purposes
                .deliverAfter(1, TimeUnit.HOURS) // Delay message delivery for 1 hour
                .property("my-key", "my-value") // Set the customized metadata
                .property("my-other-key", "my-other-value")
                .replicationClusters(
                        Lists.newArrayList("r1", "r2")) // Set the geo-replication clusters for this message.
                .value("content")
                .send();
  ```

  For the Java client, you can also use `loadConf` to configure the message metadata. Here is an example:
  ```java
  Map<String, Object> conf = new HashMap<>();
  conf.put("key", "my-key");
  conf.put("eventTime", System.currentTimeMillis());
  producer.newMessage()
          .value("my-message")
          .loadConf(conf)
          .send();
  ```

</TabItem>

<TabItem value="C++">

  ```cpp
  Message msg = MessageBuilder()
                    .setContent("content")
                    .setProperty("my-key", "my-value")
                    .setProperty("my-other-key", "my-other-value")
                    .setDeliverAfter(std::chrono::minutes(3)) // Delay message delivery for 3 minutes
                    .build();
  Result res = producer.send(msg);
  ```

</TabItem>

<TabItem value="Go">

  ```go
  ID, err := producer.Send(context.Background(), &pulsar.ProducerMessage{
       Payload:      []byte(fmt.Sprintf("content")),
       DeliverAfter: 3 * time.Second, // Delay message delivery for 3 seconds
   })
   if err != nil {
       log.Fatal(err)
   }
  ```

</TabItem>

<TabItem value="C#">

  ```csharp
  var messageId = await producer.NewMessage()
                              .Property("SomeKey", "SomeValue")
                              .Send(data);
  ```

</TabItem>
</Tabs>
````

## Publish messages to partitioned topics

By default, Pulsar topics are served by a single broker, which limits the maximum throughput of a topic. *Partitioned topics* can span multiple brokers and thus allow for higher throughput.

You can publish messages to partitioned topics using Pulsar client libraries. When publishing messages to partitioned topics, you must specify a routing mode. If you do not specify any routing mode when you create a new producer, the round-robin routing mode is used.

### Use built-in message router

The routing mode determines which partition (internal topic) each message should be published to.

The following is an example:

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"},{"label":"Go","value":"Go"}]}>
  <TabItem value="Java">

   ```java
   Producer<byte[]> producer = pulsarClient.newProducer()
      .topic("my-topic")
      .messageRoutingMode(MessageRoutingMode.SinglePartition)
      .create();
   ```

  </TabItem>

  <TabItem value="C++">

   ```cpp
   #include "lib/RoundRobinMessageRouter.h" // Make sure include this header file

  Producer producer;
  Result result = client.createProducer(
      "my-topic",
      ProducerConfiguration().setMessageRouter(std::make_shared<RoundRobinMessageRouter>(
          ProducerConfiguration::BoostHash, true, 1000, 100000, boost::posix_time::seconds(1))),
      producer);
   ```

  </TabItem>

  <TabItem value="Go">

   ```go
    producer, err := client.CreateProducer(pulsar.ProducerOptions{
        Topic: "my-topic",
        MessageRouter: func(msg *pulsar.ProducerMessage, tm pulsar.TopicMetadata) int {
            fmt.Println("Topic has", tm.NumPartitions(), "partitions. Routing message ", msg, " to partition 2.")
            // always push msg to partition 2
            return 2
        },
    })
   ```

  </TabItem>
</Tabs>
````

### Customize message router

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"},{"label":"Go","value":"Go"}]}>
<TabItem value="Java">

To use a custom message router, you need to provide an implementation of the [MessageRouter](/api/client/org/apache/pulsar/client/api/MessageRouter) interface, which has just one `choosePartition` method:

```java
public interface MessageRouter extends Serializable {
    int choosePartition(Message msg);
}
```

The following router routes every message to partition 10:

```java
public class AlwaysTenRouter implements MessageRouter {
    public int choosePartition(Message msg) {
        return 10;
    }
}
```

With that implementation, you can send messages to partitioned topics as below.

```java
Producer<byte[]> producer = pulsarClient.newProducer()
        .topic("my-topic")
        .messageRouter(new AlwaysTenRouter())
        .create();
producer.send("Partitioned topic message".getBytes());
```

  </TabItem>

  <TabItem value="C++">

To use a custom message router, you need to provide an implementation of the `MessageRoutingPolicy` interface, which has one `getPartition` method:

```cpp
class MessageRouter : public MessageRoutingPolicy {
   public:
    MessageRouter() : {}

    int getPartition(const Message& msg, const TopicMetadata& topicMetadata) {
        // The implementation of getPartition
    }

};
```

The following router routes every message to partition 10:
```cpp
class MessageRouter : public MessageRoutingPolicy {
   public:
    MessageRouter() {}

    int getPartition(const Message& msg, const TopicMetadata& topicMetadata) {
        return 10;
    }
};
```

With that implementation, you can send messages to partitioned topics as below.
```cpp
Producer producer;
Result result = client.createProducer(
    "my-topic",
    ProducerConfiguration().setMessageRouter(std::make_shared<MessageRouter>()),
    producer);
Message msg = MessageBuilder().setContent("content").build();
result = producer.send(msg);
```
  </TabItem>

  <TabItem value="Go">

  In the Go client, you can configure a customized message router by passing a function.
   ```go
    producer, err := client.CreateProducer(pulsar.ProducerOptions{
        Topic: "my-topic",
        MessageRouter: func(msg *pulsar.ProducerMessage, tm pulsar.TopicMetadata) int {
            fmt.Println("Topic has", tm.NumPartitions(), "partitions. Routing message ", msg, " to partition 10.")
            // always push msg to partition 10
            return 10
        },
    })
   ```

  </TabItem>
</Tabs>
````

### Choose partitions when using a key

If a message has a key, it supersedes the round robin routing policy. The following java example code illustrates how to choose the partition when using a key.

```java
// If the message has a key, it supersedes the round robin routing policy
if (msg.hasKey()) {
    return signSafeMod(hash.makeHash(msg.getKey()), topicMetadata.numPartitions());
}

if (isBatchingEnabled) { // if batching is enabled, choose partition on `partitionSwitchMs` boundary.
    long currentMs = clock.millis();
    return signSafeMod(currentMs / partitionSwitchMs + startPtnIdx, topicMetadata.numPartitions());
} else {
    return signSafeMod(PARTITION_INDEX_UPDATER.getAndIncrement(this), topicMetadata.numPartitions());
}
```

## Enable chunking

Message [chunking](concepts-messaging.md#chunking) enables Pulsar to process large payload messages by splitting the message into chunks at the producer side and aggregating chunked messages on the consumer side.

The message chunking feature is OFF by default. The following is an example of how to enable message chunking when creating a producer.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"},{"label":"Go","value":"Go"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

   ```java
     Producer<byte[]> producer = client.newProducer()
        .topic(topic)
        .enableChunking(true)
        .enableBatching(false)
        .create();
   ```

  </TabItem>
  <TabItem value="C++">

   ```cpp
   ProducerConfiguration conf;
   conf.setBatchingEnabled(false);
   conf.setChunkingEnabled(true);
   Producer producer;
   client.createProducer("my-topic", conf, producer);
   ```

  </TabItem>
  <TabItem value="Go">

   ```go
   // The message chunking feature is OFF by default.
   // By default, a producer chunks the large message based on the max message size (`maxMessageSize`) configured at the broker side (for example, 5MB).
   // Client can also configure the max chunked size using the producer configuration `ChunkMaxMessageSize`.
   // Note: to enable chunking, you need to disable batching (`DisableBatching=true`) concurrently.
   producer, err := client.CreateProducer(pulsar.ProducerOptions{
     Topic:               "my-topic",
     DisableBatching:     true,
     EnableChunking:      true,
   })

   if err != nil {
   	log.Fatal(err)
   }
   defer producer.Close()
   ```

  </TabItem>
  <TabItem value="Python">

   ```python
   producer = client.create_producer(
            topic,
            chunking_enabled=True
        )
   ```

  </TabItem>
</Tabs>
````

By default, producer chunks the large message based on max message size (`maxMessageSize`) configured at broker (eg: 5MB). However, client can also configure max chunked size using producer configuration `chunkMaxMessageSize`.

:::note

To enable chunking, you need to disable batching (`enableBatching`=`false`) concurrently.

:::

## Intercept messages

`ProducerInterceptor` intercepts and possibly mutates messages received by the producer before they are published to the brokers.

The interface has three main events:
* `eligible` checks if the interceptor can be applied to the message.
* `beforeSend` is triggered before the producer sends the message to the broker. You can modify messages within this event.
* `onSendAcknowledgement` is triggered when the message is acknowledged by the broker or the sending failed.

To intercept messages, you can add a `ProducerInterceptor` or multiple ones when creating a `Producer` as follows.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"}]}>
<TabItem value="Java">

   ```java
   Producer<byte[]> producer = client.newProducer()
        .topic(topic)
        .intercept(new ProducerInterceptor {
			@Override
			boolean eligible(Message message) {
			    return true;  // process all messages
			}

			@Override
			Message beforeSend(Producer producer, Message message) {
			    // user-defined processing logic
			}

			@Override
			void onSendAcknowledgement(Producer producer, Message message, MessageId msgId, Throwable exception) {
			    // user-defined processing logic
			}
        })
        .create();
   ```

  </TabItem>

  <TabItem value="C++">
    Implement the custom interceptor:

   ```cpp
    class MyInterceptor : public ProducerInterceptor {
      public:
        MyInterceptor() {}

        Message beforeSend(const Producer& producer, const Message& message) override {
          // Your implementation code
          return message;
        }

        void onSendAcknowledgement(const Producer& producer, Result result, const Message& message,
                                  const MessageId& messageID) override {
          // Your implementation code
        }

        void close() override {
          // Your implementation code
        }
    };
   ```

   Configue the producer:

   ```cpp
    ProducerConfiguration conf;
    conf.intercept({std::make_shared<MyInterceptor>(),
                    std::make_shared<MyInterceptor>()}); // You can add multiple interceptors to the same producer
    Producer producer;
    client.createProducer(topic, conf, producer);
   ```

  </TabItem>
</Tabs>
````

:::note

Multiple interceptors apply in the order they are passed to the `intercept` method.

:::

## Configure encryption policies

The Pulsar C# client supports four kinds of encryption policies:

- `EnforceUnencrypted`: always use unencrypted connections.
- `EnforceEncrypted`: always use encrypted connections)
- `PreferUnencrypted`: use unencrypted connections, if possible.
- `PreferEncrypted`: use encrypted connections, if possible.

This example shows how to set the `EnforceUnencrypted` encryption policy.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="C#"
  values={[{"label":"C#","value":"C#"}]}>
<TabItem value="C#">

   ```csharp
   using DotPulsar;

   var client = PulsarClient.Builder()
                         .ConnectionSecurity(EncryptionPolicy.EnforceEncrypted)
                         .Build();
   ```

  </TabItem>
</Tabs>
````

## Configure access mode

[Access mode](concepts-clients.md#access-mode) allows applications to require exclusive producer access on a topic to achieve a "single-writer" situation.

This example shows how to set producer access mode.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"}]}>
<TabItem value="Java">

:::note

This feature is supported in Java client 2.8.0 or later versions.

:::

   ```java
   Producer<byte[]> producer = client.newProducer()
        .topic(topic)
        .accessMode(ProducerAccessMode.Exclusive)
        .create();
   ```

  </TabItem>

<TabItem value="C++">

:::note

This feature is supported in C++ client 3.1.0 or later versions.

:::

   ```cpp
    Producer producer;
    ProducerConfiguration producerConfiguration;
    producerConfiguration.setAccessMode(ProducerConfiguration::Exclusive);
    client.createProducer(topicName, producerConfiguration, producer);
   ```

  </TabItem>

</Tabs>
````
