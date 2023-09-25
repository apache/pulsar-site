---
id: client-libraries-go-use
title: Use Pulsar Go client
sidebar_label: "Use"
description: Learn how to use Go client in Pulsar.
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

### Monitor

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

### Create a single-topic consumer

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

### Create a regex-topic consumer

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

### Monitor

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