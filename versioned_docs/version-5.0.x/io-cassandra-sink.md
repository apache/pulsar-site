---
id: io-cassandra-sink
title: Cassandra sink connector
sidebar_label: "Cassandra sink connector"
---

:::note

You can download all the Pulsar connectors on [download page](pathname:///download).

:::

The Cassandra sink connector pulls messages from Pulsar topics to Cassandra or ScyllaDB clusters.

## ScyllaDB Compatibility

The Cassandra sink connector is fully compatible with [ScyllaDB](https://www.scylladb.com/). ScyllaDB is a drop-in replacement for Cassandra that maintains full CQL protocol compatibility. You can use the same `pulsar-io-cassandra` connector with both Apache Cassandra and ScyllaDB without any modifications.

The configuration is identical for both databases. For more information about using Pulsar with ScyllaDB, see [Streaming Real-Time Chat Messages into ScyllaDB with Apache Pulsar](https://www.scylladb.com/2022/04/25/streaming-real-time-chat-messages-into-scylladb-with-apache-pulsar/).

## Configuration

The configuration of the Cassandra sink connector has the following properties.

### Property

| Name | Type|Required | Default | Description
|------|----------|----------|---------|-------------|
| `roots` | String|true | " " (empty string) | A comma-separated list of Cassandra hosts to connect to.|
| `keyspace` | String|true| " " (empty string)| The key space used for writing pulsar messages. <br /><br />**Note: `keyspace` should be created prior to a Cassandra sink.**|
| `keyname` | String|true| " " (empty string)| The key name of the Cassandra column family. <br /><br />The column is used for storing Pulsar message keys. <br /><br />If a Pulsar message doesn't have any key associated, the message value is used as the key. |
| `columnFamily` | String|true| " " (empty string)| The Cassandra column family name.<br /><br />**Note: `columnFamily` should be created prior to a Cassandra sink.**|
| `columnName` | String|true| " " (empty string) | The column name of the Cassandra column family.<br /><br /> The column is used for storing Pulsar message values. |

### Example

Before using the Cassandra sink connector, you need to create a configuration file through one of the following methods.

* JSON

  ```json
  {
     "configs": {
        "roots": "localhost:9042",
        "keyspace": "pulsar_test_keyspace",
        "columnFamily": "pulsar_test_table",
        "keyname": "key",
        "columnName": "col"
     }
  }
  ```

* YAML

  ```
  configs:
      roots: "localhost:9042"
      keyspace: "pulsar_test_keyspace"
      columnFamily: "pulsar_test_table"
      keyname: "key"
      columnName: "col"
  ```

## Usage

For more information about **how to connect Pulsar with Cassandra and ScyllaDB**, see [here](io-quickstart.md#connect-pulsar-to-cassandra-and-scylladb).
