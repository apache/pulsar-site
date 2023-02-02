---
id: client-libraries-dotnet-use
title: Use C# client
sidebar_label: "Use"
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