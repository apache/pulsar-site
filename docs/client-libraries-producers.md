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

This example shows how to create a producer:

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>

  <TabItem value="Java">

  ```java
Producer<String> producer = pulsarClient.newProducer(Schema.STRING)
                .topic("my-topic")
                .create();
  ```

  </TabItem>
</Tabs>
````

## Send messages

This example shows how to send messages using producers.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Go","value":"Go"},{"label":"Node.js","value":"Node.js"},{"label":"C#","value":"C#"}]}>
<TabItem value="Java">

   ```java
  producer.newMessage()
          .key("my-message-key")
          .value("my-async-message")
          .property("my-key", "my-value")
          .property("my-other-key", "my-other-value")
          .send();
   ```

   You can terminate the builder chain with `sendAsync()` and get a future return.

  </TabItem>
  <TabItem value="Go">

   ```go
    msg := pulsar.ProducerMessage{
        Payload: []byte("Here is some message data"),
        Key: "message-key",
        Properties: map[string]string{
            "foo": "bar",
        },
        EventTime: time.Now(),
        ReplicationClusters: []string{"cluster1", "cluster3"},
    }

    if _, err := producer.send(msg); err != nil {
      log.Fatalf("Could not publish message due to: %v", err)
    }
   ```

    For all methods of the `ProducerMessage` object, see [here](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#ProducerMessage).

  </TabItem>
  <TabItem value="Node.js">

   ```javascript
   const msg = {
   data: Buffer.from('Hello, Pulsar'),
   partitionKey: 'key1',
   properties: {
       'foo': 'bar',
   },
   eventTimestamp: Date.now(),
   replicationClusters: [
       'cluster1',
       'cluster2',
   ],
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

## Send messages with customized metadata

- Send messages with customized metadata by using the builder.

  ````mdx-code-block
  <Tabs groupId="lang-choice"
    defaultValue="C#"
    values={[{"label":"C#","value":"C#"}]}>
  <TabItem value="C#">

    ```csharp
    var messageId = await producer.NewMessage()
                                .Property("SomeKey", "SomeValue")
                                .Send(data);
    ```

    </TabItem>
  </Tabs>
  ````

- Send messages with customized metadata without using the builder.

  ````mdx-code-block
  <Tabs groupId="lang-choice"
    defaultValue="C#"
    values={[{"label":"C#","value":"C#"}]}>
  <TabItem value="C#">

  ```csharp
  var data = Encoding.UTF8.GetBytes("Hello World");
  var metadata = new MessageMetadata();
  metadata["SomeKey"] = "SomeValue";
  var messageId = await producer.Send(metadata, data));
  ```

  </TabItem>
  </Tabs>
  ````

## Async send messages

You can publish messages [asynchronously](concepts-clients.md#send-modes) using the Java client. With async send, the producer puts the message in a blocking queue and returns it immediately. Then the client library sends the message to the broker in the background. If the queue is full (max size configurable), the producer is blocked or fails immediately when calling the API, depending on arguments passed to the producer.

The following is an example.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

```java
producer.sendAsync("my-async-message".getBytes()).thenAccept(msgId -> {
    System.out.println("Message with ID " + msgId + " successfully sent");
});
```

</TabItem>
</Tabs>
````

As you can see from the example above, async send operations return a {@inject: javadoc:MessageId:/client/org/apache/pulsar/client/api/MessageId} wrapped in a [`CompletableFuture`](http://www.baeldung.com/java-completablefuture).

## Publish messages to partitioned topics

By default, Pulsar topics are served by a single broker, which limits the maximum throughput of a topic. *Partitioned topics* can span multiple brokers and thus allow for higher throughput.

You can publish messages to partitioned topics using Pulsar client libraries. When publishing messages to partitioned topics, you must specify a routing mode. If you do not specify any routing mode when you create a new producer, the round-robin routing mode is used.

### Use built-in message router

You can specify the [routing mode](concepts-messaging.md#routing-modes) in the `ProducerConfiguration` object to configure your producer. The routing mode determines which partition (internal topic) each message should be published to.

The following is an example:

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Go","value":"Go"}]}>
  <TabItem value="Java">

   ```java
   String pulsarBrokerRootUrl = "pulsar://localhost:6650";
   String topic = "persistent://my-tenant/my-namespace/my-topic";

   PulsarClient pulsarClient = PulsarClient.builder().serviceUrl(pulsarBrokerRootUrl).build();
   Producer<byte[]> producer = pulsarClient.newProducer()
      .topic(topic)
      .messageRoutingMode(MessageRoutingMode.SinglePartition)
      .create();
   producer.send("Partitioned topic message".getBytes());
   ```

  </TabItem>
  <TabItem value="Go">

   ```go
    client, err := pulsar.NewClient(pulsar.ClientOptions{
        URL: "pulsar://localhost:6650",
    })

    if err != nil {
        log.Fatal(err)
    }
    defer client.Close()

    producer, err := client.CreateProducer(pulsar.ProducerOptions{
        Topic: "my-partitioned-topic",
        MessageRouter: func(msg *pulsar.ProducerMessage, tm pulsar.TopicMetadata) int {
            fmt.Println("Topic has", tm.NumPartitions(), "partitions. Routing message ", msg, " to partition 2.")
            // always push msg to partition 2
            return 2
        },
    })

    if err != nil {
        log.Fatal(err)
    }
    defer producer.Close()

    for i := 0; i < 10; i++ {
        if msgId, err := producer.Send(context.Background(), &pulsar.ProducerMessage{
            Payload: []byte(fmt.Sprintf("message-%d", i)),
        }); err != nil {
            log.Fatal(err)
        } else {
            log.Println("Published message: ", msgId)
        }
    }

    // subscribe a specific partition of a topic
    // for demos only, not recommend to subscribe a specific partition
    consumer, err := client.Subscribe(pulsar.ConsumerOptions{
        // pulsar partition is a special topic has the suffix '-partition-xx'
        Topic:            "my-partitioned-topic-partition-2",
        SubscriptionName: "my-sub",
        Type:             pulsar.Shared,
    })
    if err != nil {
        log.Fatal(err)
    }
    defer consumer.Close()

    for i := 0; i < 10; i++ {
        msg, err := consumer.Receive(context.Background())
        if err != nil {
            log.Fatal(err)
        }
        fmt.Printf("Received message msgId: %#v -- content: '%s'\n", msg.ID(), string(msg.Payload()))
        consumer.Ack(msg)
    }
   ```

  </TabItem>
</Tabs>
````

### Customize message router

To use a custom message router, you need to provide an implementation of the {@inject: javadoc:MessageRouter:/client/org/apache/pulsar/client/api/MessageRouter} interface, which has just one `choosePartition` method:

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

```java
public interface MessageRouter extends Serializable {
    int choosePartition(Message msg);
}
```

  </TabItem>
</Tabs>
````

The following router routes every message to partition 10:

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

```java
public class AlwaysTenRouter implements MessageRouter {
    public int choosePartition(Message msg) {
        return 10;
    }
}
```

  </TabItem>
</Tabs>
````

With that implementation, you can send messages to partitioned topics as below.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

```java
String pulsarBrokerRootUrl = "pulsar://localhost:6650";
String topic = "persistent://my-tenant/my-cluster-my-namespace/my-topic";

PulsarClient pulsarClient = PulsarClient.builder().serviceUrl(pulsarBrokerRootUrl).build();
Producer<byte[]> producer = pulsarClient.newProducer()
        .topic(topic)
        .messageRouter(new AlwaysTenRouter())
        .create();
producer.send("Partitioned topic message".getBytes());
```

  </TabItem>
</Tabs>
````

### Choose partitions when using a key

If a message has a key, it supersedes the round robin routing policy. The following example illustrates how to choose the partition when using a key.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

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

  </TabItem>
</Tabs>
````

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
   client, err := pulsar.NewClient(pulsar.ClientOptions{
   	URL: serviceURL,
   })

   if err != nil {
	   log.Fatal(err)
   }
   defer client.Close()

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

## Configure delayed message delivery

The following is an example of how to configure delayed message delivery for a producer.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Go","value":"Go"}]}>
<TabItem value="Java">

   ```java
   // message to be delivered at the configured delay interval
   producer.newMessage().deliverAfter(3L, TimeUnit.Minute).value("Hello Pulsar!").send();
   ```

  </TabItem>
  <TabItem value="Go">

   ```go
   client, err := pulsar.NewClient(pulsar.ClientOptions{
       URL: "pulsar://localhost:6650",
   })
   if err != nil {
       log.Fatal(err)
   }
   defer client.Close()

   topicName := "topic-1"
   producer, err := client.CreateProducer(pulsar.ProducerOptions{
       Topic:           topicName,
       DisableBatching: true,
   })
   if err != nil {
       log.Fatal(err)
   }
   defer producer.Close()

   consumer, err := client.Subscribe(pulsar.ConsumerOptions{
       Topic:            topicName,
       SubscriptionName: "subName",
       Type:             pulsar.Shared,
   })
   if err != nil {
       log.Fatal(err)
   }
   defer consumer.Close()

   ID, err := producer.Send(context.Background(), &pulsar.ProducerMessage{
       Payload:      []byte(fmt.Sprintf("test")),
       DeliverAfter: 3 * time.Second,
   })
   if err != nil {
       log.Fatal(err)
   }
   fmt.Println(ID)

   ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
   msg, err := consumer.Receive(ctx)
   if err != nil {
       log.Fatal(err)
   }
   fmt.Println(msg.Payload())
   cancel()

   ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
   msg, err = consumer.Receive(ctx)
   if err != nil {
       log.Fatal(err)
   }
   fmt.Println(msg.Payload())
   cancel()
   ```

  </TabItem>
</Tabs>
````

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
  values={[{"label":"Java","value":"Java"}]}>
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