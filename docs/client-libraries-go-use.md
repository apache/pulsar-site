---
id: client-libraries-go-use
title: Use Pulsar Go client
sidebar_label: "Use"
---


## Create a producer

You can [configure](#producer-configuration) Go producers using a `ProducerOptions` object. Here's an example:

```go
producer, err := client.CreateProducer(pulsar.ProducerOptions{
    Topic: "my-topic",
})

if err != nil {
    log.Fatal(err)
}

_, err = producer.Send(context.Background(), &pulsar.ProducerMessage{
    Payload: []byte("hello"),
})

defer producer.Close()

if err != nil {
    fmt.Println("Failed to publish message", err)
}
fmt.Println("Published message")
```

For all available methods of `Producer` interface, see [here](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#Producer).

## Create a consumer

Pulsar consumers subscribe to one or more Pulsar topics and listen for incoming messages produced on that topic/those topics. You can configure Go consumers using a `ConsumerOptions` object. 

Here's a basic example that uses channels:

```go
consumer, err := client.Subscribe(pulsar.ConsumerOptions{
    Topic:            "topic-1",
    SubscriptionName: "my-sub",
    Type:             pulsar.Shared,
})
if err != nil {
    log.Fatal(err)
}
defer consumer.Close()

for i := 0; i < 10; i++ {
    // may block here
    msg, err := consumer.Receive(context.Background())
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Received message msgId: %#v -- content: '%s'\n",
        msg.ID(), string(msg.Payload()))

    consumer.Ack(msg)
}

if err := consumer.Unsubscribe(); err != nil {
    log.Fatal(err)
}
```

For all available methods of `Consumer` interface, see [here](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#Consumer).

## Create a reader

Pulsar readers process messages from Pulsar topics. Readers are different from consumers because with readers you need to explicitly specify which message in the stream you want to begin with (consumers, on the other hand, automatically begin with the most recent unacked message). You can [configure](#reader-configuration) Go readers using a `ReaderOptions` object. Here's an example:

```go
reader, err := client.CreateReader(pulsar.ReaderOptions{
    Topic:          "topic-1",
    StartMessageID: pulsar.EarliestMessageID(),
})
if err != nil {
    log.Fatal(err)
}
defer reader.Close()
```

For all available methods of the `Reader` interface, see [here](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#Reader).