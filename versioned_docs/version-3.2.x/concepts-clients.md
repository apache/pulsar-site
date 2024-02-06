---
id: concepts-clients
title: Pulsar Clients
sidebar_label: "Clients"
description: Get a comprehensive understanding of client APIs with language bindings for Java, C++, Go, Python, Node.js and C# in Pulsar.
---

Pulsar exposes a client API with language bindings for [Java](client-libraries-java.md), [C++](client-libraries-cpp.md), [Go](client-libraries-go.md), [Python](client-libraries-python.md), [Node.js](client-libraries-node.md) and [C#](client-libraries-dotnet.md). The client API optimizes and encapsulates Pulsar's client-broker communication protocol and exposes a simple and intuitive API for use by applications.

Pulsar client libraries support transparent reconnection and/or connection failover to brokers, queuing of messages until acknowledged by the broker, and heuristics such as connection retries with backoff.

## Client setup phase

Before an application creates a producer/consumer, the Pulsar client library needs to initiate a setup phase including two steps:

1. The client attempts to determine the owner of the topic by sending an HTTP lookup request to the broker. 

    The request could reach one of the active brokers which, by looking at the (cached) Zookeeper metadata knows who is serving the topic or, in case nobody is serving it, tries to assign it to the least loaded broker.

2. Once the client library has the broker address, it creates a TCP connection (or reuses an existing connection from the pool) and authenticates it. 
    
    Within this connection, the client and broker exchange binary commands from a custom protocol. At this point, the client sends a command to create producer/consumer to the broker, which will comply after having validated the authorization policy.

Whenever the TCP connection breaks, the client immediately re-initiates this setup phase and keeps trying with exponential backoff to re-establish the producer or consumer until the operation succeeds.

## Producer

A producer is a process that attaches to a topic and publishes messages to a Pulsar [broker](concepts-architecture-overview.md#broker). The Pulsar broker processes the messages.

### Send mode

Send mode is a mechanism determining whether producers send messages to brokers synchronously (sync) or asynchronously (async).

| Mode       | Description                                                                                                                                                                                                                                                                                                                                                      |
|:-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sync send  | The producer waits for an acknowledgment from the broker after sending every message. If the acknowledgment is not received, the producer treats the sending operation as a failure.                                                                                                                                                                             |
| Async send | The producer puts a message in a blocking queue and returns immediately. The client library sends the message to the broker in the background. If the queue is full (you can [configure](reference-configuration.md#broker) the maximum size), the producer is blocked or fails immediately when calling the API, depending on arguments passed to the producer. |

### Access mode

Access mode is a mechanism determining the permissions of producers on topics.

| Access mode            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|:-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Shared`               | Multiple producers can publish on a topic. <br /><br />This is the **default** setting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `Exclusive`            | Only one producer can publish on a topic. <br /><br />If there is already a producer connected, other producers trying to publish on this topic get errors immediately.<br /><br />The "old" producer is evicted and a "new" producer is selected to be the next exclusive producer if the "old" producer experiences a network partition with the broker.                                                                                                                                                                                                                                                                                                                                       |
| `ExclusiveWithFencing` | Only one producer can publish on a topic. <br /><br />If there is already a producer connected, it will be removed and invalidated immediately.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `WaitForExclusive`     | If there is already a producer connected, the producer creation is pending (rather than timing out) until the producer gets the `Exclusive` access.<br /><br />The producer that succeeds in becoming the exclusive one is treated as the leader. Consequently, if you want to implement a leader election scheme for your application, you can use this access mode. Note that the leader pattern scheme mentioned refers to using Pulsar as a Write-Ahead Log (WAL) which means the leader writes its "decisions" to the topic. On error cases, the leader will get notified it is no longer the leader *only* when it tries to write a message and fails on appropriate error, by the broker. |

:::note

Once an application creates a producer with `Exclusive` or `WaitForExclusive` access mode successfully, the instance of this application is guaranteed to be the **only writer** to the topic. Any other producers trying to produce messages on this topic will either get errors immediately or have to wait until they get the `Exclusive` access.
For more information, see [PIP 68: Exclusive Producer](https://github.com/apache/pulsar/wiki/PIP-68:-Exclusive-Producer).

:::

You can set producer access mode through [Java Client API](/api/client/). For more information, see `ProducerAccessMode` in [ProducerBuilder.java](https://github.com/apache/pulsar/blob/fc5768ca3bbf92815d142fe30e6bfad70a1b4fc6/pulsar-client-api/src/main/java/org/apache/pulsar/client/api/ProducerBuilder.java) file.


## Consumer

A consumer is a process that attaches to a topic via a subscription and then receives messages.

![Message processing workflow of a consumer in Pulsar](/assets/consumer.svg)

A consumer sends a [flow permit request](developing-binary-protocol.md#flow-control) to a broker to get messages. There is a queue at the consumer side to receive messages pushed from the broker. You can configure the queue size with the [`receiverQueueSize`](pathname:///reference/#/@pulsar:version_reference@/client/client-configuration-consumer?id=receiverqueuesize) parameter. The default size is `1000`). Each time `consumer.receive()` is called, a message is dequeued from the buffer.

### Receive mode

Receive mode is a mechanism determining whether messages are received from [brokers](concepts-architecture-overview.md#brokers) synchronously (sync) or asynchronously (async).

| Mode          | Description                                                                                                                                                                                                   |
|:--------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sync receive  | A sync receive is blocked until a message is available.                                                                                                                                                  |
| Async receive | An async receive returns immediately with a future value—for example, a [`CompletableFuture`](http://www.baeldung.com/java-completablefuture) in Java—that completes once a new message is available. |

### Listener

Client libraries provide listener implementation for consumers. For example, the [Java client](client-libraries-java.md) provides a [MesssageListener](/api/client/org/apache/pulsar/client/api/MessageListener) interface. In this interface, the `received` method is called whenever a new message is received.

## Reader

In Pulsar, the "standard" [consumer interface](#consumer) involves using consumers to listen on [topics](concepts-messaging.md#topics), process incoming messages, and finally acknowledge those messages when they are processed. Whenever a new subscription is created, it is initially positioned at the end of the topic (by default), and consumers associated with that subscription begin reading with the first message created afterward.  Whenever a consumer connects to a topic using a pre-existing subscription, it begins reading from the earliest message un-acked within that subscription. In summary, with the consumer interface, subscription cursors are automatically managed by Pulsar in response to [message acknowledgments](concepts-messaging.md#acknowledgment).

The **reader interface** for Pulsar enables applications to manually manage cursors. When you use a reader to connect to a topic---rather than a consumer---you need to specify *which* message the reader begins reading from when it connects to a topic. When connecting to a topic, the reader interface enables you to begin with:

* The **earliest** available message in the topic.
* The **latest** available message in the topic.
* Some other messages between the earliest and the latest. If you select this option, you'll need to explicitly provide a message ID. Your application will be responsible for "knowing" this message ID in advance, perhaps fetching it from a persistent data store or cache.

The reader interface is helpful for use cases like using Pulsar to provide effectively-once processing semantics for a stream processing system. For this use case, the stream processing system must be able to "rewind" topics to a specific message and begin reading there. The reader interface provides Pulsar clients with the low-level abstraction necessary to "manually position" themselves within a topic.

Internally, the reader interface is implemented as a consumer using an exclusive, non-durable subscription to the topic with a randomly-allocated name.

:::tip

Unlike subscription/consumer, readers are non-durable in nature and do not prevent data in a topic from being deleted, thus it is ***strongly*** advised that [data retention](cookbooks-retention-expiry.md) be configured. If data retention for a topic is not configured for an adequate amount of time, messages that the reader has not yet read might be deleted.  This causes the readers to essentially skip messages. Configuring the data retention for a topic guarantees the reader with a certain duration to read a message.

Please also note that a reader can have a "backlog", but the metric is only used for users to know how behind the reader is. The metric is not considered for any backlog quota calculations.

:::

![Consumer and reader interfaces in Pulsar](/assets/pulsar-reader-consumer-interfaces.png)

## TableView

The TableView interface serves an encapsulated access pattern, providing a continuously updated key-value map view of the compacted topic data. Messages without keys will be ignored.

With TableView, Pulsar clients can fetch all the message updates from a topic and construct a map with the latest values of each key. These values can then be used to build a local cache of data. In addition, you can register consumers with the TableView by specifying a listener to perform a scan of the map and then receive notifications when new messages are received. Consequently, event handling can be triggered to serve use cases, such as event-driven applications and message monitoring.

:::note

Each TableView uses one Reader instance per partition, and reads the topic starting from the compacted view by default. It is highly recommended to enable automatic compaction by [configuring the topic compaction policies](cookbooks-compaction.md#configure-compaction-to-run-automatically) for the given topic or namespace. More frequent compaction results in shorter startup times because less data is replayed to reconstruct the TableView of the topic. Starting from Pulsar 2.11.0, TableView also supports reading non-persistent topics, but it does not guarantee data consistency.

:::

The following figure illustrates the dynamic construction of a TableView updated with newer values of each key.

![Dynamic construction of a TableView in Pulsar](/assets/tableview.png)
