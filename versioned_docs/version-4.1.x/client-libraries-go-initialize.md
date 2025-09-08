---
id: client-libraries-go-initialize
title: Initialize Pulsar Go client
sidebar_label: "Initialize"
description: Learn how to initialize Go client in Pulsar.
---

To interact with Pulsar, you need a [`Client`](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#Client) object first.

You can create a client object using the [`NewClient`](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#NewClient) function, passing in a [`ClientOptions`](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#ClientOptions) object.

Here's an example:

```go
import (
    "log"
    "time"

    "github.com/apache/pulsar-client-go/pulsar"
)

func main() {
    client, err := pulsar.NewClient(pulsar.ClientOptions{
        URL:               "pulsar://localhost:6650",
        OperationTimeout:  30 * time.Second,
        ConnectionTimeout: 30 * time.Second,
    })
    if err != nil {
        log.Fatalf("Could not instantiate Pulsar client: %v", err)
    }

    defer client.Close()
}
```

If you have multiple brokers, you can initiate a client object as below.

```go
import (
    "log"
    "time"
    "github.com/apache/pulsar-client-go/pulsar"
)

func main() {
    client, err := pulsar.NewClient(pulsar.ClientOptions{
        URL: "pulsar://localhost:6650,localhost:6651,localhost:6652",
        OperationTimeout:  30 * time.Second,
        ConnectionTimeout: 30 * time.Second,
    })
    if err != nil {
        log.Fatalf("Could not instantiate Pulsar client: %v", err)
    }

    defer client.Close()
}
```

For all configurable parameters, see [`ClientOptions`](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsar#ClientOptions).