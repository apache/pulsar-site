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

## Async receive messages

The `receive` method receives messages synchronously (the consumer process is blocked until a message is available). You can also use [async receive](concepts-clients.md#receive-modes), which returns a [`CompletableFuture`](http://www.baeldung.com/java-completablefuture) object immediately once a new message is available.

The following is an example.

```java
CompletableFuture<Message> asyncMessage = consumer.receiveAsync();
```

Async receive operations return a {@inject: javadoc:Message:/client/org/apache/pulsar/client/api/Message} wrapped inside of a [`CompletableFuture`](http://www.baeldung.com/java-completablefuture).

## Receive messages - C#

This example shows how a consumer receives messages from a topic.

```csharp
await foreach (var message in consumer.Messages())
{
    Console.WriteLine("Received: " + Encoding.UTF8.GetString(message.Data.ToArray()));
}
```

## Receive message with timeout - Go

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

## Batch receive messages

Use `batchReceive` to receive multiple messages for each call. 

The following is an example.

```java
Messages messages = consumer.batchReceive();
for (Object message : messages) {
  // do something
}
consumer.acknowledge(messages)
```

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

## Configure chunking

You can limit the maximum number of chunked messages a consumer maintains concurrently by configuring the following parameters:
- For Java clients: `maxPendingChunkedMessage` and `autoAckOldestChunkedMessageOnQueueFull`
- For C++ clients: `setMaxPendingChunkedMessage` and `setAutoAckOldestChunkedMessageOnQueueFull`

When the threshold is reached, the consumer drops pending messages by silently acknowledging them or asking the broker to redeliver them later. The `expireTimeOfIncompleteChunkedMessage` parameter decides the time interval to expire incomplete chunks if the consumer fails to receive all chunks of a message within the specified time period.

The following is an example of how to configure message chunking.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"},{"label":"C++","value":"C++"},{"label":"Go","value":"Go"}]}>
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
</Tabs>
````

## Negative acknowledgment redelivery backoff

The `RedeliveryBackoff` introduces a redelivery backoff mechanism. You can achieve redelivery with different delays by setting `redeliveryCount ` of messages. 

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

## Acknowledgment timeout redelivery backoff

The `RedeliveryBackoff` introduces a redelivery backoff mechanism. You can redeliver messages with different delays by setting the number of times the messages are retried.

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

## Multi-topic subscriptions

In addition to subscribing a consumer to a single Pulsar topic, you can also subscribe to multiple topics simultaneously using [multi-topic subscriptions](concepts-messaging.md#multi-topic-subscriptions). To use multi-topic subscriptions you can supply either a regular expression (regex) or a `List` of topics. If you select topics via regex, all topics must be within the same Pulsar namespace.

The followings are some examples.

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

## Subscription types

Pulsar has various [subscription types](concepts-messaging.md#subscription-types) to match different scenarios. A topic can have multiple subscriptions with different subscription types. However, a subscription can only have one subscription type at a time.

A subscription is identical to the subscription name; a subscription name can specify only one subscription type at a time. To change the subscription type, you should first stop all consumers of this subscription.

Different subscription types have different message distribution types. This section describes the differences between subscription types and how to use them.

To better describe their differences, assume you have a topic named "my-topic", and the producer has published 10 messages.

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

#### Exclusive

Create a new consumer and subscribe with the `Exclusive` subscription type.

```java
Consumer consumer = client.newConsumer()
        .topic("my-topic")
        .subscriptionName("my-subscription")
        .subscriptionType(SubscriptionType.Exclusive)
        .subscribe()
```

Only the first consumer is allowed to the subscription, other consumers receive an error. The first consumer receives all 10 messages, and the consuming order is the same as the producing order.

:::note

If topic is a partitioned topic, the first consumer subscribes to all partitioned topics, other consumers are not assigned with partitions and receive an error. 

:::

#### Failover

Create new consumers and subscribe with the`Failover` subscription type.

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

In Shared subscription type, multiple consumers can attach to the same subscription and messages are delivered in a round-robin distribution across consumers.

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

```java
Producer producer = client.newProducer()
        .topic("my-topic")
        .batcherBuilder(BatcherBuilder.KEY_BASED)
        .create();
```

Or the producer can disable batching.

```java
Producer producer = client.newProducer()
        .topic("my-topic")
        .enableBatching(false)
        .create();
```

:::note

If the message key is not specified, messages without keys are dispatched to one consumer in order by default.

:::

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

:::note

If you are using multiple interceptors, they apply in the order they are passed to the `intercept` method.

:::

## Subscribe to multi-topics

In addition to subscribing a consumer to a single Pulsar topic, you can also subscribe to multiple topics simultaneously. To use multi-topic subscriptions, you can supply a regular expression (regex) or a `List` of topics. If you select topics via regex, all topics must be within the same Pulsar namespace.

The following is an example:

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

## Create multi-topic consumer - Go

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

## Create consumer listener - Go

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

## Acknowledge messages - C#

Messages can be acknowledged individually or cumulatively. For details about message acknowledgment, see [acknowledgment](concepts-messaging.md#acknowledgment).

- Acknowledge messages individually.

  ```csharp
  await consumer.Acknowledge(message);
  ```

- Acknowledge messages cumulatively.

  ```csharp
  await consumer.AcknowledgeCumulative(message);
  ```

## Unsubscribe from topics - C#

This example shows how a consumer unsubscribes from a topic.

```csharp
await consumer.Unsubscribe();
```

:::note

A consumer cannot be used and is disposed once the consumer unsubscribes from a topic.

:::

## Monitor consumer - C#

This example shows how to monitor the consumer state.

```csharp
private static async ValueTask Monitor(IConsumer consumer, CancellationToken cancellationToken)
{
    var state = ConsumerState.Disconnected;

    while (!cancellationToken.IsCancellationRequested)
    {
        state = (await consumer.StateChangedFrom(state, cancellationToken)).ConsumerState;

        var stateMessage = state switch
        {
            ConsumerState.Active => "The consumer is active",
            ConsumerState.Inactive => "The consumer is inactive",
            ConsumerState.Disconnected => "The consumer is disconnected",
            ConsumerState.Closed => "The consumer has closed",
            ConsumerState.ReachedEndOfTopic => "The consumer has reached end of topic",
            ConsumerState.Faulted => "The consumer has faulted",
            ConsumerState.Unsubscribed => "The consumer is unsubscribed.",
            _ => $"The consumer has an unknown state '{state}'"
        };

        Console.WriteLine(stateMessage);

        if (consumer.IsFinalState(state))
            return;
    }
}
```

The following table lists states available for the consumer.

| State | Description |
| ---- | ----|
| Active | All is well. |
| Inactive | All is well. The subscription type is `Failover` and you are not the active consumer. |
| Closed | The consumer or the Pulsar client has been disposed. |
| Disconnected | The connection is lost and attempts are being made to reconnect. |
| Faulted | An unrecoverable error has occurred. |
| ReachedEndOfTopic | No more messages are delivered. |
| Unsubscribed | The consumer has unsubscribed. |

## Use Prometheus metrics - Go

In this guide, This section demonstrates how to create a simple Pulsar consumer application that exposes Prometheus metrics via HTTP.
1. Write a simple consumer application.

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

// Create a consumer
consumer, err := client.Subscribe(pulsar.ConsumerOptions{
    Topic:            "topic-1",
    SubscriptionName: "sub-1",
    Type:             pulsar.Shared,
})
if err != nil {
    log.Fatal(err)
}

defer consumer.Close()

ctx := context.Background()

// Write your business logic here
// In this case, you build a simple Web server. You can consume messages by requesting http://localhost:8083/consume
webPort := 8083
http.HandleFunc("/consume", func(w http.ResponseWriter, r *http.Request) {
    msg, err := consumer.Receive(ctx)
    if err != nil {
        log.Fatal(err)
    } else {
        log.Printf("Received message msgId: %v -- content: '%s'\n", msg.ID(), string(msg.Payload()))
        fmt.Fprintf(w, "Received message msgId: %v -- content: '%s'\n", msg.ID(), string(msg.Payload()))
        consumer.Ack(msg)
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
  - localhost: 2112
```

## Create single-topic consumer - Go

```go
client, err := pulsar.NewClient(pulsar.ClientOptions{URL: "pulsar://localhost:6650"})
if err != nil {
    log.Fatal(err)
}

defer client.Close()

consumer, err := client.Subscribe(pulsar.ConsumerOptions{
    // fill `Topic` field will create a single-topic consumer
    Topic:            "topic-1",
    SubscriptionName: "my-sub",
    Type:             pulsar.Shared,
})
if err != nil {
    log.Fatal(err)
}
defer consumer.Close()
```

## Create regex-topic consumer - Go

```go
client, err := pulsar.NewClient(pulsar.ClientOptions{
    URL: "pulsar://localhost:6650",
})
defer client.Close()

topicsPattern := "persistent://public/default/topic.*"
opts := pulsar.ConsumerOptions{
    // fill `TopicsPattern` field will create a regex consumer
    TopicsPattern:    topicsPattern,
    SubscriptionName: "regex-sub",
}

consumer, err := client.Subscribe(opts)
if err != nil {
    log.Fatal(err)
}
defer consumer.Close()
```

## Create a consumer with a message listener - C++

You can avoid running a loop by blocking calls with an event-based style by using a message listener which is invoked for each message that is received.

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