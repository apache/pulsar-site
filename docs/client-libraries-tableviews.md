---
id: client-libraries-tableviews
title: Work with TableView
sidebar_label: "Work with TableView"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

After setting up your clients, you can explore more to start working with [TableView](concepts-clients.md#tableview).

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
    .create()
  ```

  You can use the available parameters in the `loadConf` configuration or related [API](/api/client/2.10.0-SNAPSHOT/org/apache/pulsar/client/api/TableViewBuilder.html) to customize your TableView.

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

  You can use the available parameters to customize your TableView.

  | Name | Type| Required? |  <div>Description</div> | Default
  |---|---|---|---|---
  | `topic` | string | yes | The topic name of the TableView. | N/A
  | `schemaInfo` | struct | no | Declare the schema of the data that this table view will be accepting. The schema will be checked against the schema of the topic, and the table view creation will fail if it's not compatible. | N/A
  | `subscriptionName` | string | no | The subscription name of the TableView. | reader-{random string}
  | `partititionsUpdateInterval` | int | no | Topic partitions update interval in seconds. In **C++ client**, `partititionsUpdateInterval` is global within the same client.  | 60


</TabItem>

</Tabs>
````

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

  // Register action for all existing messages
  tv.forEach((key, value) -> /*operations on all existing messages*/)
  ```

</TabItem>


<TabItem value="C++">

    ```cpp
    // Register listeners for all existing and incoming messages
    tableView.forEach([](const std::string& key, const std::string& value) {});

    // Register action for all existing messages
    tableView.forEachAndListen([](const std::string& key, const std::string& value) {});
    ```

</TabItem>

</Tabs>
````