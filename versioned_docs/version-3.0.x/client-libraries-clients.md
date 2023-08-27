---
id: client-libraries-clients
title: Work with clients
sidebar_label: "Work with clients"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

After setting up your client library and creating a client object, you can explore more to start working with your client.

## Create a client with multiple advertised listeners

To ensure clients in both internal and external networks can connect to a Pulsar cluster, Pulsar introduces [advertisedListeners](concepts-multiple-advertised-listeners.md).

The following example creates a Python client using multiple advertised listeners:


````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"},{"label":"Python","value":"Python"}]}>
  <TabItem value="Java">

  ```java
  PulsarClient client = PulsarClient.builder()
    .serviceUrl("pulsar://xxxx:6650")
    .listenerName("external")
    .build();
  ```

  </TabItem>
  <TabItem value="C++">

  ```cpp
  ClientConfiguration clientConfiguration;
  clientConfiguration.setListenerName("external");
  Client client("pulsar://xxxx:6650", clientConfiguration);
  ```

  </TabItem>
  <TabItem value="Python">

  ```python
  import pulsar

  client = pulsar.Client('pulsar://localhost:6650', listener_name='external')
  ```

  </TabItem>
</Tabs>
````

## Set memory limits

You can uses memory limits param to control client overall memory usage,
the producers and consumers under this client will compete for the memory assigned. See [PIP 74: Pulsar client memory limits](https://github.com/apache/pulsar/wiki/PIP-74%3A-Pulsar-client-memory-limits)

````mdx-code-block
<Tabs groupId="lang-choice"
defaultValue="Java"
values={[{"label":"Java","value":"Java"},{"label":"Go","value":"Go"}]}>
<TabItem value="Java">

  ```java
  PulsarClient client = PulsarClient.builder()
  .serviceUrl("pulsar://xxxx:6650")
  .memoryLimit(64, SizeUnit.MEGA_BYTES)
  .build();
  ```

</TabItem>
<TabItem value="Go">

  ```go
  client, err := pulsar.NewClient(pulsar.ClientOptions{
    URL: "pulsar://xxxx:6650",
    MemoryLimitBytes: 64 * 1024 * 1024, // Unit: byte
  })
  ```

</TabItem>
</Tabs>
````