---
id: client-libraries-dotnet-use
title: Use C# client
sidebar_label: "Use"
description: Learn how to use C# client in Pulsar.
---

This section introduces some hands-on examples to get started with using the Pulsar C# client.

## Create a producer

This section describes how to create a producer.

- Create a producer by using the builder.

  ```csharp
  using DotPulsar;
  using DotPulsar.Extensions;

  var producer = client.NewProducer()
                       .Topic("persistent://public/default/mytopic")
                       .Create();
  ```

- Create a producer without using the builder.

  ```csharp
  using DotPulsar;

  var options = new ProducerOptions<byte[]>("persistent://public/default/mytopic", Schema.ByteArray);
  var producer = client.CreateProducer(options);
  ```

### Monitor

This example shows how to monitor the producer's state.

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

## Create a consumer

This section describes how to create a consumer.

- Create a consumer by using the builder.

  ```csharp
  using DotPulsar;
  using DotPulsar.Extensions;

  var consumer = client.NewConsumer()
                       .SubscriptionName("MySubscription")
                       .Topic("persistent://public/default/mytopic")
                       .Create();
  ```

- Create a consumer without using the builder.

  ```csharp
  using DotPulsar;

  var options = new ConsumerOptions<byte[]>("MySubscription", "persistent://public/default/mytopic", Schema.ByteArray);
  var consumer = client.CreateConsumer(options);
  ```

### Monitor

This example shows how to monitor the consumer's state.

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

## Create a reader

This section describes how to create a reader.

- Create a reader by using the builder.

  ```csharp
  using DotPulsar;
  using DotPulsar.Extensions;

  var reader = client.NewReader()
                     .StartMessageId(MessageId.Earliest)
                     .Topic("persistent://public/default/mytopic")
                     .Create();
  ```

- Create a reader without using the builder.

  ```csharp
  using DotPulsar;

  var options = new ReaderOptions<byte[]>(MessageId.Earliest, "persistent://public/default/mytopic", Schema.ByteArray);
  var reader = client.CreateReader(options);
  ```

### Monitor

This example shows how to monitor the reader's state.

```csharp
private static async ValueTask Monitor(IReader reader, CancellationToken cancellationToken)
{
    var state = ReaderState.Disconnected;

    while (!cancellationToken.IsCancellationRequested)
    {
        state = (await reader.StateChangedFrom(state, cancellationToken)).ReaderState;

        var stateMessage = state switch
        {
            ReaderState.Connected => "The reader is connected",
            ReaderState.Disconnected => "The reader is disconnected",
            ReaderState.Closed => "The reader has closed",
            ReaderState.ReachedEndOfTopic => "The reader has reached end of topic",
            ReaderState.Faulted => "The reader has faulted",
            _ => $"The reader has an unknown state '{state}'"
        };

        Console.WriteLine(stateMessage);

        if (reader.IsFinalState(state))
            return;
    }
}
```

The following table lists states available for the reader.

| State | Description |
| ---- | ----|
| Closed | The reader or the Pulsar client has been disposed. |
| Connected | All is well. |
| Disconnected | The connection is lost and attempts are being made to reconnect.
| Faulted | An unrecoverable error has occurred. |
| ReachedEndOfTopic | No more messages are delivered. |
