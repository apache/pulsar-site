---
id: tableviews
title: Work with TableView
sidebar_label: "Work with TableView"
description: Learn how to work with TableView in Pulsar.
---

Follow [Java client setup](java-setup.md) to configure the combined dependency. This guide uses the v4 API (`org.apache.pulsar.client.api`); see [Java client (v5)](java-v5.md) for the v5 API.

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

After setting up your clients, you can explore more to start working with [TableView](pathname:///docs/concepts-clients#tableview).

## Configure TableView


````mdx-code-block
<Tabs groupId="lang-choice"
defaultValue="Java"
values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"}]}>
<TabItem value="Java">

  The following is an example of how to configure a TableView.
  
  ```java
    TableView<String> tv = client.newTableViewBuilder(Schema.STRING)
    .topic("my-tableview")
    .create();
  ```

You can use the available parameters in the `loadConf` configuration or the API [`TableViewBuilder`](@pulsar:javadoc:client@/org/apache/pulsar/client/api/TableViewBuilder.html) to customize your TableView.

  | Name | Type| Required? |  <div>Description</div> | Default
  |---|---|---|---|---
  | `topic` | string | yes | The topic name of the TableView. | N/A
  | `autoUpdatePartitionInterval` | int | no | The interval to check for newly added partitions. | 60 (seconds)
  | `subscriptionName` | string | no | The subscription name of the TableView. | null

</TabItem>

<TabItem value="C++">


  This feature is supported in C++ client 3.2.0 or later versions.


  ```cpp
  ClientConfiguration clientConfiguration;
  clientConfiguration.setPartititionsUpdateInterval(100);
  Client client("pulsar://localhost:6650", clientConfiguration);
  TableViewConfiguration tableViewConfiguration{schemaInfo, "test-subscription-name"};
  TableView tableView;
  client.createTableView("my-tableview", tableViewConfiguration, tableView)
  ```

  You can use the following parameters to customize your TableView.

  | Name | Type| Required? |  <div>Description</div> | Default
  |---|---|---|---|---
  | `topic` | string | yes | The topic name of the TableView. | N/A
  | `schemaInfo` | struct | no | Declare the schema of the data that this TableView can accept. The schema is checked against the schema of the topic, and the TableView creation fails if it's incompatible. | N/A
  | `subscriptionName` | string | no | The subscription name of the TableView. | reader-\{random string\}
  | `partititionsUpdateInterval` | int | no | Topic partitions update interval in seconds. In the C++ client, `partititionsUpdateInterval` is global within the same client.  | 60


</TabItem>

</Tabs>
````

:::note Tombstone (null-value) messages

`TableView` treats a message with a `null` payload as a **tombstone** - the key is removed from the map.

- `forEach(action)` iterates over the current map snapshot only, so it **does not** surface keys that have been tombstoned.
- `forEachAndListen(action)` first runs `forEach` over the current non-tombstoned entries, then registers the action as a live listener. Every subsequent update - **including tombstones** - is delivered to the listener as `action.accept(key, null)`. If you need to react to deletions (for example, to clean up downstream state), check for `value == null` in your listener.

:::

## Refresh a Java TableView

Call `refreshAsync()` when a read must include the messages published before the refresh captured the topic's latest positions:

```java
tv.refreshAsync().thenRun(() -> System.out.println(tv.get("my-key")));
```

The future completes after the view has applied those messages. New messages can continue updating the view, so refresh does not create a frozen snapshot across subsequent reads. Completion follows the map update, including when a refresh is initiated from a listener. Avoid blocking a client callback while waiting for the refresh.

For persistent topics, the view uses compacted reads. Short names such as `my-tableview` resolve to persistent topics just like their fully qualified `persistent://public/default/my-tableview` form.

## Map messages to Java TableView values

The v4 Java client can build a view whose values are derived from the complete message, including its properties and metadata, with `createMapped` or `createMappedAsync`. The message schema and the stored value type can differ:

```java
TableView<String> regions = client.newTableViewBuilder(Schema.STRING)
        .topic("persistent://public/default/customer-updates")
        .createMapped(message -> message.getProperty("region"));

CompletableFuture<TableView<Message<String>>> messages =
        client.newTableViewBuilder(Schema.STRING)
                .topic("persistent://public/default/customer-updates")
                .createMappedAsync(message -> message);
```

The view still uses the message key as its map key. Its mapper follows these rules:

- Messages without a key are ignored. For a keyed message with an empty payload, the view removes the key without calling the mapper.
- Returning `null` removes the key and notifies listeners of the deletion, just like a tombstone.
- If the mapper throws, the message is skipped. The key keeps its previous value (or remains absent), and listeners are not notified. The view invokes `TableViewMessageMapper.onMappingError(message, error)`; the default handler logs the failure. A custom handler can return `true` to suppress that log after handling the error.

Mapping and error callbacks run on a client internal thread and must not block. Do not close the TableView from its error callback. Mapped views disable message pooling, so retaining a `Message` is supported, but it also retains metadata, schema, and a connection reference. For large key sets, prefer copying the fields your application needs into a value object.

A mapped view rejects `topicCompactionStrategyClassName` supplied through `loadConf`: that custom strategy compares schema values, while the view stores mapped values. This restriction concerns the client-side strategy; the view can still read a compacted topic. The synchronous method throws `IllegalArgumentException` for a null mapper or configured strategy, and the asynchronous method completes its future exceptionally.

See [`TableViewMessageMapper`](@pulsar:javadoc:client@/org/apache/pulsar/client/api/TableViewMessageMapper.html) and [`TableViewBuilder`](@pulsar:javadoc:client@/org/apache/pulsar/client/api/TableViewBuilder.html) for the full contract. TableView remains a v4 client API; the v5 API does not expose it.

## Register listeners

You can register listeners for both existing messages on a topic and new messages coming into the topic by using `forEachAndListen`, and specify to perform operations for all existing messages by using `forEach`.

The following is an example of how to register listeners with TableView.


````mdx-code-block
<Tabs groupId="lang-choice"
defaultValue="Java"
values={[{"label":"Java","value":"Java"},{"label":"C++","value":"C++"}]}>

<TabItem value="Java">

  ```java
  // Register listeners for all existing and incoming messages
  tv.forEachAndListen((key, value) -> /*operations on all existing and incoming messages*/)

  // Register actions for all existing messages
  tv.forEach((key, value) -> /*operations on all existing messages*/)
  ```

</TabItem>


<TabItem value="C++">

    ```cpp
    // Register listeners for all existing and incoming messages
    tableView.forEach([](const std::string& key, const std::string& value) {});

    // Register actions for all existing messages
    tableView.forEachAndListen([](const std::string& key, const std::string& value) {});
    ```

</TabItem>

</Tabs>
````
