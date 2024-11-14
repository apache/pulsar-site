---
id: client-libraries-tableviews
title: Work with TableView
sidebar_label: "Work with TableView"
---

After setting up your clients, you can explore more to start working with [TableView](concepts-clients.md#tableview).

## Configure TableView

The following is an example of how to configure a TableView.

```java
TableView<String> tv = client.newTableViewBuilder(Schema.STRING)
  .topic("my-tableview")
  .create()
```

You can use the available parameters in the `loadConf` configuration or related [API](/api/client/2.10.0-SNAPSHOT/org/apache/pulsar/client/api/TableViewBuilder.html) to customize your TableView.

| Name | Type| Required? |  <div>Description</div> | Default
|---|---|---|---|---
| `topic` | string | yes | The topic name of the TableView. | N/A
| `autoUpdatePartitionInterval` | int | no | The interval to check for newly added partitions. | 60 (seconds)
| `subscriptionName` | string | no | The subscription name of the TableView. | null

## Register listeners

You can register listeners for both existing messages on a topic and new messages coming into the topic by using `forEachAndListen`, and specify to perform operations for all existing messages by using `forEach`.

The following is an example of how to register listeners with TableView.

```java
// Register listeners for all existing and incoming messages
tv.forEachAndListen((key, value) -> /*operations on all existing and incoming messages*/)

// Register action for all existing messages
tv.forEach((key, value) -> /*operations on all existing messages*/)
```
