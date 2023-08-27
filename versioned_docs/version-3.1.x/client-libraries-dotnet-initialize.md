---
id: client-libraries-dotnet-initialize
title: Initialize C# client
sidebar_label: "Initialize"
---


This section introduces some hands-on examples to initialize the Pulsar C# client.

The following example shows how to create a Pulsar C# client connected to localhost.

```csharp
using DotPulsar;

var client = PulsarClient.Builder().Build();
```

To create a Pulsar C# client by using the builder, you can specify the following options.

| Option | Description | Default |
| ---- | ---- | ---- |
| ServiceUrl | Set the service URL for the Pulsar cluster. | pulsar://localhost:6650 |
| RetryInterval | Set the time to wait before retrying an operation or a reconnection. | 3s |