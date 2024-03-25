---
id: client-libraries-readers
title: Work with reader
sidebar_label: "Work with reader"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

After setting up your clients, you can explore more to start working with [readers](concepts-clients.md#reader-interface).

## Receive and read messages

A reader is just a consumer without a cursor. This means that Pulsar does not keep track of your progress and there is no need to acknowledge messages.

Here's an example that begins reading from the earliest available message on a topic.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C#","value":"C#"}]}>
<TabItem value="Java">

   ```java
   import org.apache.pulsar.client.api.Message;
   import org.apache.pulsar.client.api.MessageId;
   import org.apache.pulsar.client.api.Reader;

   // Create a reader on a topic and for a specific message (and onward)
   Reader<byte[]> reader = pulsarClient.newReader()
       .topic("reader-api-test")
       .startMessageId(MessageId.earliest)
       .create();

   while (true) {
       Message message = reader.readNext();

       // Process the message
   }
   ```

  </TabItem>
  <TabItem value="C#">

   ```csharp
   await foreach (var message in reader.Messages())
   {
       Console.WriteLine("Received: " + Encoding.UTF8.GetString(message.Data.ToArray()));
   }
   ```

  </TabItem>
</Tabs>
````

### Read `next` message

To create a reader that reads from the latest available message:

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Go","value":"Go"}]}>
<TabItem value="Java">

```java
Reader<byte[]> reader = pulsarClient.newReader()
    .topic(topic)
    .startMessageId(MessageId.latest)
    .create();
```

  </TabItem>
  <TabItem value="Go">

```go
import (
    "context"
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

    reader, err := client.CreateReader(pulsar.ReaderOptions{
        Topic:          "topic-1",
        StartMessageID: pulsar.EarliestMessageID(),
    })
    if err != nil {
        log.Fatal(err)
    }
    defer reader.Close()

    for reader.HasNext() {
        msg, err := reader.Next(context.Background())
        if err != nil {
            log.Fatal(err)
        }

        fmt.Printf("Received message msgId: %#v -- content: '%s'\n",
            msg.ID(), string(msg.Payload()))
    }
}
```

In the example above, the reader begins reading from the earliest available message (specified by `pulsar.EarliestMessage`). The reader can also begin reading from the latest message (`pulsar.LatestMessage`) or some other message ID specified by bytes using the `DeserializeMessageID` function, which takes a byte array and returns a `MessageID` object. Here's an example:

```go
lastSavedId := // Read last saved message id from external store as byte[]

reader, err := client.CreateReader(pulsar.ReaderOptions{
    Topic:          "my-golang-topic",
    StartMessageID: pulsar.DeserializeMessageID(lastSavedId),
})
```

  </TabItem>
</Tabs>
````

### Read specific messages

To create a reader that reads from some message between the earliest and the latest:

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Go","value":"Go"}]}>
<TabItem value="Java">

```java
byte[] msgIdBytes = // Some byte array
MessageId id = MessageId.fromByteArray(msgIdBytes);
Reader<byte[]> reader = pulsarClient.newReader()
    .topic(topic)
    .startMessageId(id)
    .create();
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

topic := "topic-1"
ctx := context.Background()

// create producer
producer, err := client.CreateProducer(pulsar.ProducerOptions{
    Topic:           topic,
    DisableBatching: true,
})
if err != nil {
    log.Fatal(err)
}
defer producer.Close()

// send 10 messages
msgIDs := [10]pulsar.MessageID{}
for i := 0; i < 10; i++ {
    msgID, _ := producer.Send(ctx, &pulsar.ProducerMessage{
        Payload: []byte(fmt.Sprintf("hello-%d", i)),
    })
    msgIDs[i] = msgID
}

// create reader on 5th message (not included)
reader, err := client.CreateReader(pulsar.ReaderOptions{
    Topic:                   topic,
    StartMessageID:          msgIDs[4],
    StartMessageIDInclusive: false,
})

if err != nil {
    log.Fatal(err)
}
defer reader.Close()

// receive the remaining 5 messages
for i := 5; i < 10; i++ {
    msg, err := reader.Next(context.Background())
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Read %d-th msg: %s\n", i, string(msg.Payload()))
}
// create reader on 5th message (included)
readerInclusive, err := client.CreateReader(pulsar.ReaderOptions{
    Topic:                   topic,
    StartMessageID:          msgIDs[4],
    StartMessageIDInclusive: true,
})

if err != nil {
    log.Fatal(err)
}
defer readerInclusive.Close()
```

  </TabItem>
</Tabs>
````

## Configure chunking

Configuring chunking for readers is similar to that for consumers. See [configure chunking for consumers](#configure-chunking) for more information.

The following is an example of how to configure message chunking for a reader.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

```java
Reader<byte[]> reader = pulsarClient.newReader()
        .topic(topicName)
        .startMessageId(MessageId.earliest)
        .maxPendingChunkedMessage(12)
        .autoAckOldestChunkedMessageOnQueueFull(true)
        .expireTimeOfIncompleteChunkedMessage(12, TimeUnit.MILLISECONDS)
        .create();
```

  </TabItem>
</Tabs>
````

## Intercept messages

Pulsar reader interceptor intercepts and possibly mutates messages with user-defined processing before [Pulsar reader](concepts-clients.md#reader-interface) reads them. With reader interceptors, you can apply unified messaging processes before messages can be read, such as modifying messages, adding properties, collecting statistics and etc, without creating similar mechanisms respectively.

![Reader interceptor](/assets/reader-interceptor.svg)

Pulsar reader interceptor works on top of Pulsar consumer interceptor. The plugin interface `ReaderInterceptor` can be treated as a subset of `ConsumerInterceptor` and it has two main events.
* `beforeRead` is triggered before readers read messages. You can modify messages within this event.
* `onPartitionsChange` is triggered when changes on partitions have been detected.

To perceive triggered events and perform customized processing, you can add `ReaderInterceptor` when creating a `Reader` as follows.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

```java
PulsarClient pulsarClient = PulsarClient.builder().serviceUrl("pulsar://localhost:6650").build();
Reader<byte[]> reader = pulsarClient.newReader()
        .topic("t1")
        .autoUpdatePartitionsInterval(5, TimeUnit.SECONDS)
        .intercept(new ReaderInterceptor<byte[]>() {
            @Override
            public void close() {
            }

            @Override
            public Message<byte[]> beforeRead(Reader<byte[]> reader, Message<byte[]> message) {
                // user-defined processing logic
                return message;
            }

            @Override
            public void onPartitionsChange(String topicName, int partitions) {
                // user-defined processing logic
            }
        })
        .startMessageId(MessageId.earliest)
        .create();
```

  </TabItem>
</Tabs>
````

## Sticky key range reader

In a sticky key range reader, broker only dispatches messages which hash of the message key contains by the specified key hash range. Multiple key hash ranges can be specified on a reader.

The following is an example to create a sticky key range reader.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"}]}>
<TabItem value="Java">

```java
pulsarClient.newReader()
        .topic(topic)
        .startMessageId(MessageId.earliest)
        .keyHashRange(Range.of(0, 10000), Range.of(20001, 30000))
        .create();
```

  </TabItem>
</Tabs>
````

The total hash range size is 65536, so the max end of the range should be less than or equal to 65535.