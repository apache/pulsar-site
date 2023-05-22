---
id: client-libraries-java-initialize
title: Initialize a Java client
sidebar_label: "Initialize"
---


You can instantiate a [PulsarClient](/api/client/org/apache/pulsar/client/api/PulsarClient) object using just a URL for the target Pulsar [cluster](reference-terminology.md#cluster) like this:

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();
```

If you have multiple brokers, you can initiate a PulsarClient like this:

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650,localhost:6651,localhost:6652")
        .build();
```

:::note

If you run a cluster in [standalone mode](getting-started-standalone.md), the broker is available at the `pulsar://localhost:6650` URL by default.

:::

For detailed client configurations, see the [reference doc](pathname:///reference/#/@pulsar:version_reference@/client/).