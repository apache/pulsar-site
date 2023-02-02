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

## Publish messages to partitioned topics

By default, Pulsar topics are served by a single broker, which limits the maximum throughput of a topic. *Partitioned topics* can span multiple brokers and thus allow for higher throughput.

You can publish messages to partitioned topics using Pulsar client libraries. When publishing messages to partitioned topics, you must specify a routing mode. If you do not specify any routing mode when you create a new producer, the round-robin routing mode is used.

#### Routing mode

You can specify the routing mode in the `ProducerConfiguration` object used to configure your producer. The routing mode determines which partition (internal topic) each message should be published to.

The following {@inject: javadoc:MessageRoutingMode:/client/org/apache/pulsar/client/api/MessageRoutingMode} options are available.

Mode     | Description
:--------|:------------
`RoundRobinPartition` | If no key is provided, the producer publishes messages across all partitions in the round-robin policy to achieve the maximum throughput. Round-robin is not done per individual message. It is set to the same boundary of batching delay to ensure that batching is effective. If a key is specified on the message, the partitioned producer hashes the key and assigns the message to a particular partition. This is the default mode.
`SinglePartition`     | If no key is provided, the producer picks a single partition randomly and publishes all messages into that partition. If a key is specified on the message, the partitioned producer hashes the key and assigns the message to a particular partition.
`CustomPartition`     | Use custom message router implementation that is called to determine the partition for a particular message. You can create a custom routing mode by using the Java client and implementing the {@inject: javadoc:MessageRouter:/client/org/apache/pulsar/client/api/MessageRouter} interface.

The following is an example:

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

#### Custom message router

To use a custom message router, you need to provide an implementation of the {@inject: javadoc:MessageRouter:/client/org/apache/pulsar/client/api/MessageRouter} interface, which has just one `choosePartition` method:

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
String pulsarBrokerRootUrl = "pulsar://localhost:6650";
String topic = "persistent://my-tenant/my-cluster-my-namespace/my-topic";

PulsarClient pulsarClient = PulsarClient.builder().serviceUrl(pulsarBrokerRootUrl).build();
Producer<byte[]> producer = pulsarClient.newProducer()
        .topic(topic)
        .messageRouter(new AlwaysTenRouter())
        .create();
producer.send("Partitioned topic message".getBytes());
```

#### Choose partitions when using a key

If a message has a key, it supersedes the round robin routing policy. The following example illustrates how to choose the partition when using a key.

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

## Use message router - Go

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

## Async send messages

You can publish messages [asynchronously](concepts-clients.md#send-modes) using the Java client. With async send, the producer puts the message in a blocking queue and returns it immediately. Then the client library sends the message to the broker in the background. If the queue is full (max size configurable), the producer is blocked or fails immediately when calling the API, depending on arguments passed to the producer.

The following is an example.

```java
producer.sendAsync("my-async-message".getBytes()).thenAccept(msgId -> {
    System.out.println("Message with ID " + msgId + " successfully sent");
});
```

As you can see from the example above, async send operations return a {@inject: javadoc:MessageId:/client/org/apache/pulsar/client/api/MessageId} wrapped in a [`CompletableFuture`](http://www.baeldung.com/java-completablefuture).

## Send data - C#

This example shows how to send data.

```csharp
var data = Encoding.UTF8.GetBytes("Hello World");
await producer.Send(data);
```

## Send messages with customized metadata - C#

- Send messages with customized metadata by using the builder.

  ```csharp
  var messageId = await producer.NewMessage()
                                .Property("SomeKey", "SomeValue")
                                .Send(data);
  ```

- Send messages with customized metadata without using the builder.

  ```csharp
  var data = Encoding.UTF8.GetBytes("Hello World");
  var metadata = new MessageMetadata();
  metadata["SomeKey"] = "SomeValue";
  var messageId = await producer.Send(metadata, data));
  ```

## Configure messages

In addition to a value, you can set additional items on a given message:

```java
producer.newMessage()
    .key("my-message-key")
    .value("my-async-message".getBytes())
    .property("my-key", "my-value")
    .property("my-other-key", "my-other-value")
    .send();
```

You can terminate the builder chain with `sendAsync()` and get a future return.

## Construct messages - Node

In Pulsar Node.js client, you have to construct producer message objects for producers.

Here is an example of a message:

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

#### Message object operations

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

#### Message ID object operations

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

## Construct messages - Go

The Pulsar Go client provides a `ProducerMessage` interface that you can use to construct messages to producers on Pulsar topics. Here's an example message:

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

## Enable chunking

Message [chunking](concepts-messaging.md#chunking) enables Pulsar to process large payload messages by splitting the message into chunks at the producer side and aggregating chunked messages on the consumer side. 

The message chunking feature is OFF by default. The following is an example of how to enable message chunking when creating a producer.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"},{"label":"C++","value":"C++"},{"label":"Go","value":"Go"}]}>
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

:::note

Multiple interceptors apply in the order they are passed to the `intercept` method.

:::

## Configure encryption policies - C#

The Pulsar C# client supports four kinds of encryption policies:

- `EnforceUnencrypted`: always use unencrypted connections.
- `EnforceEncrypted`: always use encrypted connections)
- `PreferUnencrypted`: use unencrypted connections, if possible.
- `PreferEncrypted`: use encrypted connections, if possible.

This example shows how to set the `EnforceUnencrypted` encryption policy.

```csharp
using DotPulsar;

var client = PulsarClient.Builder()
                         .ConnectionSecurity(EncryptionPolicy.EnforceEncrypted)
                         .Build();
```

## Monitor producer - C#

This example shows how to monitor the producer state.

```csharp
private static async ValueTask Monitor(IProducer producer, CancellationToken cancellationToken)
{
    var state = ProducerState.Disconnected;

    while (!cancellationToken.IsCancellationRequested)
    {
        state = (await producer.StateChangedFrom(state, cancellationToken)).ProducerState;

        var stateMessage = state switch
        {
            ProducerState.Connected => $"The producer is connected",
            ProducerState.Disconnected => $"The producer is disconnected",
            ProducerState.Closed => $"The producer has closed",
            ProducerState.Faulted => $"The producer has faulted",
            ProducerState.PartiallyConnected => $"The producer is partially connected.",
            _ => $"The producer has an unknown state '{state}'"
        };

        Console.WriteLine(stateMessage);

        if (producer.IsFinalState(state))
            return;
    }
}
```

The following table lists states available for the producer.

| State | Description |
| ---- | ----|
| Closed | The producer or the Pulsar client has been disposed. |
| Connected | All is well. |
| Disconnected | The connection is lost and attempts are being made to reconnect. |
| Faulted | An unrecoverable error has occurred. |
| PartiallyConnected | Some of the sub-producers are disconnected. |

## Use Prometheus metrics - Go

Pulsar Go client registers client metrics using Prometheus. This section demonstrates how to create a simple Pulsar producer application that exposes Prometheus metrics via HTTP.

1. Write a simple producer application.

```go
// Create a Pulsar client
client, err := pulsar.NewClient(pulsar.ClientOptions{
    URL: "pulsar://localhost:6650",
})
if err != nil {
    log.Fatal(err)
}

defer client.Close()

// Start a separate goroutine for Prometheus metrics
// In this case, Prometheus metrics can be accessed via http://localhost:2112/metrics
go func() {
    prometheusPort := 2112
    log.Printf("Starting Prometheus metrics at http://localhost:%v/metrics\n", prometheusPort)
    http.Handle("/metrics", promhttp.Handler())
    err = http.ListenAndServe(":"+strconv.Itoa(prometheusPort), nil)
    if err != nil {
        log.Fatal(err)
    }
}()

// Create a producer
producer, err := client.CreateProducer(pulsar.ProducerOptions{
    Topic: "topic-1",
})
if err != nil {
    log.Fatal(err)
}

defer producer.Close()

ctx := context.Background()

// Write your business logic here
// In this case, you build a simple Web server. You can produce messages by requesting http://localhost:8082/produce
webPort := 8082
http.HandleFunc("/produce", func(w http.ResponseWriter, r *http.Request) {
    msgId, err := producer.Send(ctx, &pulsar.ProducerMessage{
        Payload: []byte(fmt.Sprintf("hello world")),
    })
    if err != nil {
        log.Fatal(err)
    } else {
        log.Printf("Published message: %v", msgId)
        fmt.Fprintf(w, "Published message: %v", msgId)
    }
})

err = http.ListenAndServe(":"+strconv.Itoa(webPort), nil)
if err != nil {
    log.Fatal(err)
}
```

2. To scrape metrics from applications, configure a local running Prometheus instance using a configuration file (`prometheus.yml`).

```yaml
scrape_configs:
- job_name: pulsar-client-go-metrics
  scrape_interval: 10s
  static_configs:
  - targets:
  - localhost:2112
```

## Use delay relative - Go

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