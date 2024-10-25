---
id: io-azuredataexplorer-sink
title: Azure Data Explorer sink connector
sidebar_label: "Azure Data Explorer sink connector"
---

:::note

You can download all the Pulsar connectors on [download page](pathname:///download).

:::

The Azure Data Explorer(ADX) sink connector pulls messages from Pulsar topics and sink the messages to ADX clusters.

## Configuration

The configuration of the ADX sink connector has the following properties.

### Property

| Name                  | Type   | Required | Default        | Description                                                                          |
|-----------------------|--------|----------|----------------|--------------------------------------------------------------------------------------|
| `clusterUrl`          | String | true     | (empty string) | The ADX cluster URL.                                                                 |
| `database`            | String | true     | (empty string) | The database name to which data need to be ingested                                  |
| `table`               | String | true     | (empty string) | Table name to which pulsar data need to be ingested                                  |
| `appId`               | String | false    | (empty string) | The AAD app Id for authentication                                                    |
| `appKey`              | String | false    | (empty string) | The AAD app secret for authentication                                                |
| `tenantId`            | String | false    | (empty string) | The tenant Id for authentication                                                     |
| `managedIdentityId`   | String | false    | (empty string) | The Managed Identity credential for authentication. Set this with clientId in case of user assigned MI and 'system' in case of system assigned managed identity|
| `mappingRefName`      | String | false    | (empty string) | The mapping reference for ingestion                                                  |
| `mappingRefType`      | String | false    | (empty string) | The type of mapping reference provided. Eg. CSV, JSON etc.                           |
| `flushImmediately`    | Boolean| false    | false          | Denotes if flush should happen immediately without aggregation. Not recommended to enable flushImmediately for production workloads |
| `batchSize`    | Int  | false    | 100    | For batching, this defines the number of records to hold for batching, to sink data to ADX            |
| `batchTimeMs`  | Long | false    | 10000  | For batching, this defines the time(in ms) to hold records before sink to ADX                         |
| `maxRetryAttempts`| Int | false  | 1      | Max retry attempts, In case of transient ingestion errors                                             |
| `retryBackOffTime`| Long |false  | 10     | Period of time in milliseconds to backoff before retry for transient errors                           |

### Example

Before using the ADX sink connector, you need to create a configuration file through one of the following methods.

* JSON

  ```json
  {
     "configs": {
         "clusterUrl":"https://somecluster.eastus.kusto.windows.net",
         "database":"somedb",
         "table": "tableName",
         "appId": "xxxx-xxxx-xxxx-xxxx",
         "appKey": "xxxx-xxxx-xxxx-xxxx",
         "tenantId": "xxxx-xxxx-xxxx-xxxx",
         "mappingRefName": "mapping ref name",
         "mappingRefType":"CSV",
         "flushImmediately":true,
         "batchSize":100,
         "batchTimeMs":10000,
     }
  }
  ```

* YAML

  ```yaml
  configs:
      clusterUrl: https://somecluster.eastus.kusto.windows.net,
      database: somedb,
      table: tableName,
      appId: xxxx-xxxx-xxxx-xxxx,
      appKey: xxxx-xxxx-xxxx-xxxx,
      tenantId: xxxx-xxxx-xxxx-xxxx,
      mappingRefName: mapping ref name,
      mappingRefType: CSV,
      flushImmediately: true,
      batchSize: 100,
      batchTimeMs: 10000,
  ```
