---
id: client-libraries-consumers
title: Work with consumer
sidebar_label: "Work with consumer"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

After setting up your clients, you can explore more to start working with [consumers](concepts-clients.md#consumers).

## Subscribe to topics

Pulsar has various [subscription types](concepts-messaging.md#subscription-types) to match different scenarios. A topic can have multiple subscriptions with different subscription types. However, a subscription can only have one subscription type at a time.

A subscription is identical to the subscription name; a subscription name can specify only one subscription type at a time. To change the subscription type, you should first stop all consumers of this subscription.

Different subscription types have different message distribution types. This section describes the differences between subscription types and how to use them.

To better describe their differences, assume you have a topic named "my-topic", and the producer has published 10 messages.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Producer<String> producer = client.newProducer(Schema.STRING)
        .topic("my-topic")
        .enableBatching(false)
        .create();
// 3 messages with "key-1", 3 messages with "key-2", 2 messages with "key-3" and 2 messages with "key-4"
producer.newMessage().key("key-1").value("message-1-1").send();
producer.newMessage().key("key-1").value("message-1-2").send();
producer.newMessage().key("key-1").value("message-1-3").send();
producer.newMessage().key("key-2").value("message-2-1").send();
producer.newMessage().key("key-2").value("message-2-2").send();
producer.newMessage().key("key-2").value("message-2-3").send();
producer.newMessage().key("key-3").value("message-3-1").send();
producer.newMessage().key("key-3").value("message-3-2").send();
producer.newMessage().key("key-4").value("message-4-1").send();
producer.newMessage().key("key-4").value("message-4-2").send();
```

  </TabItem>
  <TabItem value="Python">

```python
producer = client.create_producer('my-topic', batching_enabled=False)
# 3 messages with "key-1", 3 messages with "key-2", 2 messages with "key-3" and 2 messages with "key-4"
producer.send(b'message-1-1', partition_key='key-1')
producer.send(b'message-1-2', partition_key='key-1')
producer.send(b'message-1-3', partition_key='key-1')
producer.send(b'message-2-1', partition_key='key-2')
producer.send(b'message-2-2', partition_key='key-2')
producer.send(b'message-2-3', partition_key='key-2')
producer.send(b'message-3-1', partition_key='key-3')
producer.send(b'message-3-2', partition_key='key-3')
producer.send(b'message-4-1', partition_key='key-4')
producer.send(b'message-4-2', partition_key='key-4')
```

  </TabItem>
</Tabs>
````

#### Exclusive

Create a new consumer and subscribe with the `Exclusive` subscription type.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Consumer consumer = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscriptionType(SubscriptionType.Exclusive)
        .subscribe()
```

  </TabItem>
  <TabItem value="Python">

```python
consumer = client.subscribe('my-topic', 'my-subscription',
                             consumer_type=pulsar.ConsumerType.Exclusive)
```

  </TabItem>
</Tabs>
````

Only the first consumer is allowed to the subscription, and other consumers receive an error. The first consumer receives all 10 messages, and the consuming order is the same as the producing order.

:::note

If the topic is partitioned, the first consumer subscribes to all partitioned topics, and other consumers are not assigned with partitions and receive an error.

:::

#### Failover

Create new consumers and subscribe with the `Failover` subscription type.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Consumer consumer1 = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscriptionType(SubscriptionType.Failover)
        .subscribe()
Consumer consumer2 = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscriptionType(SubscriptionType.Failover)
        .subscribe()
//conumser1 is the active consumer, consumer2 is the standby consumer.
//consumer1 receives 5 messages and then crashes, consumer2 takes over as an  active consumer.
```

  </TabItem>
  <TabItem value="Python">

```python
consumer1 = client.subscribe('my-topic', 'my-subscription',
                              consumer_type=pulsar.ConsumerType.Failover)
consumer2 = client.subscribe('my-topic', 'my-subscription',
                              consumer_type=pulsar.ConsumerType.Failover)
```

  </TabItem>
</Tabs>
````

Multiple consumers can attach to the same subscription, yet only the first consumer is active, and others are standby. When the active consumer is disconnected, messages will be dispatched to one of standby consumers, and the standby consumer then becomes the active consumer.

If the first active consumer is disconnected after receiving 5 messages, the standby consumer becomes active consumer. Consumer1 will receive:

```
("key-1", "message-1-1")
("key-1", "message-1-2")
("key-1", "message-1-3")
("key-2", "message-2-1")
("key-2", "message-2-2")
```

consumer2 will receive:

```
("key-2", "message-2-3")
("key-3", "message-3-1")
("key-3", "message-3-2")
("key-4", "message-4-1")
("key-4", "message-4-2")
```

:::note

If a topic is a partitioned topic, each partition has only one active consumer, messages of one partition are distributed to only one consumer, and messages of multiple partitions are distributed to multiple consumers.

:::

#### Shared

Create new consumers and subscribe with `Shared` subscription type.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Consumer consumer1 = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscriptionType(SubscriptionType.Shared)
        .subscribe()

Consumer consumer2 = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscriptionType(SubscriptionType.Shared)
        .subscribe()
//Both consumer1 and consumer2 are active consumers.
```

  </TabItem>
  <TabItem value="Python">

```python
consumer1 = client.subscribe('my-topic', 'my-subscription',
                              consumer_type=pulsar.ConsumerType.Shared)
consumer2 = client.subscribe('my-topic', 'my-subscription',
                              consumer_type=pulsar.ConsumerType.Shared)
```

  </TabItem>
</Tabs>
````

In `Shared` subscription type, multiple consumers can attach to the same subscription and messages are delivered in a round-robin distribution across consumers.

If a broker dispatches only one message at a time, consumer1 receives the following information.

```
("key-1", "message-1-1")
("key-1", "message-1-3")
("key-2", "message-2-2")
("key-3", "message-3-1")
("key-4", "message-4-1")
```

consumer2 receives the following information.

```
("key-1", "message-1-2")
("key-2", "message-2-1")
("key-2", "message-2-3")
("key-3", "message-3-2")
("key-4", "message-4-2")
```

The `Shared` subscription is different from the `Exclusive` and `Failover` subscription types. `Shared` subscription has better flexibility, but cannot provide an ordering guarantee.

#### Key_shared

This is a new subscription type since 2.4.0 release. Create new consumers and subscribe with `Key_Shared` subscription type.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Consumer consumer1 = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscriptionType(SubscriptionType.Key_Shared)
        .subscribe()

Consumer consumer2 = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscriptionType(SubscriptionType.Key_Shared)
        .subscribe()
//Both consumer1 and consumer2 are active consumers.
```

  </TabItem>
  <TabItem value="Python">

```python
consumer1 = client.subscribe('my-topic', 'my-subscription',
                              consumer_type=pulsar.ConsumerType.KeyShared)
consumer2 = client.subscribe('my-topic', 'my-subscription',
                              consumer_type=pulsar.ConsumerType.KeyShared)
```

  </TabItem>
</Tabs>
````

Just like in the `Shared` subscription, all consumers in the `Key_Shared` subscription type can attach to the same subscription. But the `Key_Shared` subscription type is different from the `Shared` subscription. In the `Key_Shared` subscription type, messages with the same key are delivered to only one consumer in order. The possible distribution of messages between different consumers (by default we do not know in advance which keys will be assigned to a consumer, but a key will only be assigned to a consumer at the same time).

consumer1 receives the following information.

```
("key-1", "message-1-1")
("key-1", "message-1-2")
("key-1", "message-1-3")
("key-3", "message-3-1")
("key-3", "message-3-2")
```

consumer2 receives the following information.

```
("key-2", "message-2-1")
("key-2", "message-2-2")
("key-2", "message-2-3")
("key-4", "message-4-1")
("key-4", "message-4-2")
```

If batching is enabled at the producer side, messages with different keys are added to a batch by default. The broker will dispatch the batch to the consumer, so the default batch mechanism may break the Key_Shared subscription guaranteed message distribution semantics. The producer needs to use the `KeyBasedBatcher`.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Producer producer = client.newProducer()
        .topic("my-topic")
        .batcherBuilder(BatcherBuilder.KEY_BASED)
        .create();
```

  </TabItem>
  <TabItem value="Python">

```python
producer = client.create_producer('my-topic',
                                   batching_type=pulsar.BatchingType.KeyBased)
```

  </TabItem>
</Tabs>
````

Or the producer can disable batching.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Producer producer = client.newProducer()
        .topic("my-topic")
        .enableBatching(false)
        .create();
```

  </TabItem>
  <TabItem value="Python">

```python
producer = client.create_producer('my-topic', batching_enabled=False)
```

  </TabItem>
</Tabs>
````

:::note

If the message key is not specified, messages without keys are dispatched to one consumer in order by default.

:::

## Subscribe to multi-topics

In addition to subscribing a consumer to a single Pulsar topic, you can also subscribe to multiple topics simultaneously using [multi-topic subscriptions](concepts-messaging.md#multi-topic-subscriptions). To use multi-topic subscriptions you can supply either a regular expression (regex) or a `List` of topics. If you select topics via regex, all topics must be within the same Pulsar namespace.

The followings are some examples.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Go","value":"Go"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
import org.apache.pulsar.client.api.Consumer;
import org.apache.pulsar.client.api.PulsarClient;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

ConsumerBuilder consumerBuilder = pulsarClient.newConsumer()
        .subscriptionName(subscription);

// Subscribe to all topics in a namespace
Pattern allTopicsInNamespace = Pattern.compile("public/default/.*");
Consumer allTopicsConsumer = consumerBuilder
        .topicsPattern(allTopicsInNamespace)
        .subscribe();

// Subscribe to a subsets of topics in a namespace, based on regex
Pattern someTopicsInNamespace = Pattern.compile("public/default/foo.*");
Consumer allTopicsConsumer = consumerBuilder
        .topicsPattern(someTopicsInNamespace)
        .subscribe();
```

In the above example, the consumer subscribes to the `persistent` topics that can match the topic name pattern. If you want the consumer subscribes to all `persistent` and `non-persistent` topics that can match the topic name pattern, set `subscriptionTopicsMode` to `RegexSubscriptionMode.AllTopics`.

```java
Pattern pattern = Pattern.compile("public/default/.*");
pulsarClient.newConsumer()
        .subscriptionName("my-sub")
        .topicsPattern(pattern)
        .subscriptionTopicsMode(RegexSubscriptionMode.AllTopics)
        .subscribe();
```

:::note

By default, the `subscriptionTopicsMode` of the consumer is `PersistentOnly`. Available options of `subscriptionTopicsMode` are `PersistentOnly`, `NonPersistentOnly`, and `AllTopics`.

:::

You can also subscribe to an explicit list of topics (across namespaces if you wish):

```java
List<String> topics = Arrays.asList(
        "topic-1",
        "topic-2",
        "topic-3"
);

Consumer multiTopicConsumer = consumerBuilder
        .topics(topics)
        .subscribe();

// Alternatively:
Consumer multiTopicConsumer = consumerBuilder
        .topic(
            "topic-1",
            "topic-2",
            "topic-3"
        )
        .subscribe();
```

You can also subscribe to multiple topics asynchronously using the `subscribeAsync` method rather than the synchronous `subscribe` method. The following is an example.

```java
Pattern allTopicsInNamespace = Pattern.compile("persistent://public/default.*");
consumerBuilder
        .topics(topics)
        .subscribeAsync()
        .thenAccept(this::receiveMessageFromConsumer);

private void receiveMessageFromConsumer(Object consumer) {
    ((Consumer)consumer).receiveAsync().thenAccept(message -> {
                // Do something with the received message
                receiveMessageFromConsumer(consumer);
            });
}
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

topics := []string{"topic-1", "topic-2"}
consumer, err := client.Subscribe(pulsar.ConsumerOptions{
    // fill `Topics` field will create a multi-topic consumer
    Topics:           topics,
    SubscriptionName: "multi-topic-sub",
})
if err != nil {
    log.Fatal(err)
}
defer consumer.Close()
```

  </TabItem>
  <TabItem value="Python">

```python
import re
consumer = client.subscribe(re.compile('persistent://public/default/topic-*'), 'my-subscription')
while True:
    msg = consumer.receive()
    try:
        print("Received message '{}' id='{}'".format(msg.data(), msg.message_id()))
        # Acknowledge successful processing of the message
        consumer.acknowledge(msg)
    except Exception:
        # Message failed to be processed
        consumer.negative_acknowledge(msg)
client.close()
```

  </TabItem>
</Tabs>
````

## Unsubscribe from topics

This example shows how a consumer unsubscribes from a topic.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C#","value":"C#"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

   ```java
   consumer.unsubscribe();
   ```

  </TabItem>

<TabItem value="C#">

   ```csharp
   await consumer.Unsubscribe();
   ```

  </TabItem>

<TabItem value="Python">

   ```python
   consumer.unsubscribe()
   ```

  </TabItem>
</Tabs>
````

:::note

A consumer cannot be used and is disposed once the consumer unsubscribes from a topic.

:::

## Receive messages

This example shows how a consumer receives messages from a topic.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}, {"label":"C#","value":"C#"}, {"label":"Python","value":"Python"}]}>
<TabItem value="Java">

   ```java
   Message message = consumer.receive();
   ```

 </TabItem>

<TabItem value="C#">

   ```csharp
   await foreach (var message in consumer.Messages())
   {
       Console.WriteLine("Received: " + Encoding.UTF8.GetString(message.Data.ToArray()));
   }
   ```

 </TabItem>

<TabItem value="Python">

   ```python
   msg = consumer.receive()
   ```

 </TabItem>
</Tabs>
````

## Receive messages with timeout

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}, {"label":"Go","value":"Go"}, {"label":"Python","value":"Python"}]}>
<TabItem value="Java">

   ```java
   consumer.receive(10, TimeUnit.SECONDS);
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

   topic := "test-topic-with-no-messages"
   ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
   defer cancel()

   // create consumer
   consumer, err := client.Subscribe(pulsar.ConsumerOptions{
       Topic:            topic,
       SubscriptionName: "my-sub1",
       Type:             pulsar.Shared,
   })
   if err != nil {
       log.Fatal(err)
   }
   defer consumer.Close()

   // receive message with a timeout
   msg, err := consumer.Receive(ctx)
   if err != nil {
       log.Fatal(err)
   }
   fmt.Println(msg.Payload())
   ```

  </TabItem>

  <TabItem value="Python">

   ```python
   # Receive with 10 second timeout (timeout in milliseconds)
   try:
       msg = consumer.receive(timeout_millis=10000)
   except Exception:
       print("No message received within timeout period")
   ```

  </TabItem>
</Tabs>
````

## Async receive messages

The `receive` method receives messages synchronously (the consumer process is blocked until a message is available). You can also use [async receive](concepts-clients.md#receive-modes), which returns a [`CompletableFuture`](http://www.baeldung.com/java-completablefuture) object immediately once a new message is available.

The following is an example.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

   ```java
   CompletableFuture<Message> asyncMessage = consumer.receiveAsync();
   ```

   Async receive operations return a [Message](/api/client/org/apache/pulsar/client/api/Message) wrapped inside of a [`CompletableFuture`](http://www.baeldung.com/java-completablefuture).

 </TabItem>
 <TabItem value="Python">

   ```python
   import asyncio

   async def receive_messages():
       msg = await consumer.receive_async()
       return msg

   # Use in async context
   msg = asyncio.run(receive_messages())
   ```

   Async receive operations in Python use asyncio and return a coroutine that resolves to a Message.

 </TabItem>
</Tabs>
````

## Batch receive messages

Use `batchReceive` to receive multiple messages for each call.

The following is an example.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Messages messages = consumer.batchReceive();
for (Object message : messages) {
  // do something
}
consumer.acknowledge(messages)
```

  </TabItem>
  <TabItem value="Python">

```python
messages = consumer.batch_receive()
for msg in messages:
    # do something
    pass
consumer.acknowledge(messages)
```

  </TabItem>
</Tabs>
````

:::note

Batch receive policy limits the number and bytes of messages in a single batch. You can specify a timeout to wait for enough messages.
The batch receive is completed if any of the following conditions are met: enough number of messages, bytes of messages, wait timeout.

```java
Consumer consumer = client.newConsumer()
.topic("my-topic")
.subscriptionName("my-subscription")
.batchReceivePolicy(BatchReceivePolicy.builder()
.maxNumMessages(100)
.maxNumBytes(1024 * 1024)
.timeout(200, TimeUnit.MILLISECONDS)
.build())
.subscribe();
```

The default batch receive policy is:

```java
BatchReceivePolicy.builder()
.maxNumMessage(-1)
.maxNumBytes(10 * 1024 * 1024)
.timeout(100, TimeUnit.MILLISECONDS)
.build();
```

:::

## Acknowledge messages

Messages can be acknowledged individually or cumulatively. For details about message acknowledgment, see [acknowledgment](concepts-messaging.md#acknowledgment).

### Acknowledge messages individually

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C#","value":"C#"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

  ```java
  consumer.acknowledge(msg);
  ```


  </TabItem>
  <TabItem value="C#">

  ```csharp
  await consumer.Acknowledge(message);
  ```

  </TabItem>
  <TabItem value="Python">

  ```python
  consumer.acknowledge(msg)
  ```

  </TabItem>
</Tabs>
````

### Acknowledge messages cumulatively

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C#","value":"C#"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

  ```java
  consumer.acknowledgeCumulative(msg);
  ```

  </TabItem>
  <TabItem value="C#">

  ```csharp
  await consumer.AcknowledgeCumulative(message);
  ```

  </TabItem>
  <TabItem value="Python">

  ```python
  consumer.acknowledge_cumulative(msg)
  ```

  </TabItem>
</Tabs>
````

## Negative acknowledgment redelivery backoff

The `RedeliveryBackoff` introduces a redelivery backoff mechanism. You can achieve redelivery with different delays by setting the redelivery count of messages.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Consumer consumer =  client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .negativeAckRedeliveryBackoff(MultiplierRedeliveryBackoff.builder()
                .minDelayMs(1000)
                .maxDelayMs(60 * 1000)
                .build())
        .subscribe();
```

  </TabItem>
  <TabItem value="Python">

```python
consumer = client.subscribe(
    'my-topic',
    'my-subscription',
    negative_ack_redelivery_delay_ms=1000
)
```

  </TabItem>
</Tabs>
````

## Acknowledgment timeout redelivery backoff

The `RedeliveryBackoff` introduces a redelivery backoff mechanism. You can redeliver messages with different delays by setting the number of times the messages are retried.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Consumer consumer =  client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .ackTimeout(10, TimeUnit.SECOND)
        .ackTimeoutRedeliveryBackoff(MultiplierRedeliveryBackoff.builder()
                .minDelayMs(1000)
                .maxDelayMs(60000)
                .multiplier(2)
                .build())
        .subscribe();
```

  </TabItem>
  <TabItem value="Python">

```python
consumer = client.subscribe(
    'my-topic',
    'my-subscription',
    unacked_messages_timeout_ms=10000
)
```

  </TabItem>
</Tabs>
````

The message redelivery behavior should be as follows.

Redelivery count | Redelivery delay
:--------------------|:-----------
1 | 10 + 1 seconds
2 | 10 + 2 seconds
3 | 10 + 4 seconds
4 | 10 + 8 seconds
5 | 10 + 16 seconds
6 | 10 + 32 seconds
7 | 10 + 60 seconds
8 | 10 + 60 seconds

:::note

- The `negativeAckRedeliveryBackoff` does not work with `consumer.negativeAcknowledge(MessageId messageId)` because you are not able to get the redelivery count from the message ID.
- If a consumer crashes, it triggers the redelivery of unacked messages. In this case, `RedeliveryBackoff` does not take effect and the messages might get redelivered earlier than the delay time from the backoff.

:::

## Configure chunking

You can limit the maximum number of chunked messages a consumer maintains concurrently by configuring specific parameters. When the configured threshold is reached, the consumer drops pending messages by silently acknowledging them or asking the broker to redeliver them later.

The following is an example of how to configure message chunking.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"},{"label":"Go","value":"Go"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

   ```java
   Consumer<byte[]> consumer = client.newConsumer()
        .topic(topic)
        .subscriptionName("test")
        .autoAckOldestChunkedMessageOnQueueFull(true)
        .maxPendingChunkedMessage(100)
        .expireTimeOfIncompleteChunkedMessage(10, TimeUnit.MINUTES)
        .subscribe();
   ```

 </TabItem>
 <TabItem value="C++">

   ```cpp
   ConsumerConfiguration conf;
   conf.setAutoAckOldestChunkedMessageOnQueueFull(true);
   conf.setMaxPendingChunkedMessage(100);
   Consumer consumer;
   client.subscribe("my-topic", "my-sub", conf, consumer);
   ```

 </TabItem>
 <TabItem value="Go">
 Coming soon...

 </TabItem>
 <TabItem value="Python">

   ```python
   consumer = client.subscribe(topic, "my-subscription",
                    max_pending_chunked_message=10,
                    auto_ack_oldest_chunked_message_on_queue_full=False
                    )
   ```

  </TabItem>
</Tabs>
````

## Create a consumer with a message listener

You can avoid running a loop by blocking calls with an event-based style by using a message listener which is invoked for each message that is received.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"},{"label":"Go","value":"Go"},{"label":"Python","value":"Python"}]}>
<TabItem value="Java">

```java
Consumer<String> consumer = pulsarClient.newConsumer(Schema.STRING)
                      .topic("persistent://my-property/my-ns/my-topic")
                      .subscriptionName("my-subscription")
                      .messageListener((c, m) -> {
                          try {
                              c.acknowledge(m);
                          } catch (Exception e) {
                              Assert.fail("Failed to acknowledge", e);
                          }
                      })
                      .subscribe();
```

</TabItem>


<TabItem value="C++">

This example starts a subscription at the earliest offset and consumes 100 messages.

```cpp
#include <pulsar/Client.h>
#include <atomic>
#include <thread>

using namespace pulsar;

std::atomic<uint32_t> messagesReceived;

void handleAckComplete(Result res) {
    std::cout << "Ack res: " << res << std::endl;
}

void listener(Consumer consumer, const Message& msg) {
    std::cout << "Got message " << msg << " with content '" << msg.getDataAsString() << "'" << std::endl;
    messagesReceived++;
    consumer.acknowledgeAsync(msg.getMessageId(), handleAckComplete);
}

int main() {
    Client client("pulsar://localhost:6650");

    Consumer consumer;
    ConsumerConfiguration config;
    config.setMessageListener(listener);
    config.setSubscriptionInitialPosition(InitialPositionEarliest);
    Result result = client.subscribe("persistent://public/default/my-topic", "consumer-1", config, consumer);
    if (result != ResultOk) {
        std::cout << "Failed to subscribe: " << result << std::endl;
        return -1;
    }

    // wait for 100 messages to be consumed
    while (messagesReceived < 100) {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    std::cout << "Finished consuming asynchronously!" << std::endl;

    client.close();
    return 0;
}
```

</TabItem>
<TabItem value="Go">

```go
import (
    "fmt"
    "log"

    "github.com/apache/pulsar-client-go/pulsar"
)

func main() {
    client, err := pulsar.NewClient(pulsar.ClientOptions{URL: "pulsar://localhost:6650"})
    if err != nil {
        log.Fatal(err)
    }

    defer client.Close()

    // we can listen this channel
    channel := make(chan pulsar.ConsumerMessage, 100)

    options := pulsar.ConsumerOptions{
        Topic:            "topic-1",
        SubscriptionName: "my-subscription",
        Type:             pulsar.Shared,
        // fill `MessageChannel` field will create a listener
        MessageChannel: channel,
    }

    consumer, err := client.Subscribe(options)
    if err != nil {
        log.Fatal(err)
    }

    defer consumer.Close()

    // Receive messages from channel. The channel returns a struct `ConsumerMessage` which contains message and the consumer from where
    // the message was received. It's not necessary here since we have 1 single consumer, but the channel could be
    // shared across multiple consumers as well
    for cm := range channel {
        consumer := cm.Consumer
        msg := cm.Message
        fmt.Printf("Consumer %s received a message, msgId: %v, content: '%s'\n",
            consumer.Name(), msg.ID(), string(msg.Payload()))

        consumer.Ack(msg)
    }
}
```

  </TabItem>

  <TabItem value="Python">

```python
def my_listener(consumer, message):
    try:
        print("Received message: '{}' id='{}'".format(
            message.data(),
            message.message_id()
        ))
        consumer.acknowledge(message)
    except Exception as e:
        consumer.negative_acknowledge(message)
        print("Error processing message:", e)

consumer = client.subscribe(
    'persistent://my-property/my-ns/my-topic',
    'my-subscription',
    message_listener=my_listener
)
```

  </TabItem>
</Tabs>
````

## Intercept messages

`ConsumerInterceptor`s intercept and possibly mutate messages received by the consumer.

The interface has six main events:
* `beforeConsume` is triggered before the message is returned by `receive()` or `receiveAsync()`. You can modify messages within this event.
* `onAcknowledge` is triggered before the consumer sends the acknowledgement to the broker.
* `onAcknowledgeCumulative` is triggered before the consumer sends the cumulative acknowledgement to the broker.
* `onNegativeAcksSend` is triggered when a redelivery from a negative acknowledgement occurs.
* `onAckTimeoutSend` is triggered when a redelivery from an acknowledgement timeout occurs.
* `onPartitionsChange` is triggered when the partitions of the (partitioned) topic change.

To intercept messages, you can add one or multiple `ConsumerInterceptor`s when creating a `Consumer` as follows.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

   ```java
   Consumer<String> consumer = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .intercept(new ConsumerInterceptor<String> {
              @Override
              public Message<String> beforeConsume(Consumer<String> consumer, Message<String> message) {
                  // user-defined processing logic
              }

              @Override
              public void onAcknowledge(Consumer<String> consumer, MessageId messageId, Throwable cause) {
                  // user-defined processing logic
              }

              @Override
              public void onAcknowledgeCumulative(Consumer<String> consumer, MessageId messageId, Throwable cause) {
                  // user-defined processing logic
              }

              @Override
              public void onNegativeAcksSend(Consumer<String> consumer, Set<MessageId> messageIds) {
                  // user-defined processing logic
              }

              @Override
              public void onAckTimeoutSend(Consumer<String> consumer, Set<MessageId> messageIds) {
                  // user-defined processing logic
              }

              @Override
              public void onPartitionsChange(String topicName, int partitions) {
                  // user-defined processing logic
              }
        })
        .subscribe();
   ```

  </TabItem>
</Tabs>
````

:::note

If you are using multiple interceptors, they apply in the order they are passed to the `intercept` method.

:::