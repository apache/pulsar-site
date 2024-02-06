---
id: get-started-pulsar-admin
title: Get started with pulsar-admin CLI tool
sidebar_label: "Get started with pulsar-admin"
---

This tutorial guides you through every step of using pulsar-admin CLI to manage topics. It includes the following steps:

1. Set the service URL.

2. Create a partitioned topic.

3. Update the number of a partition.

4. Produce messages to the topic.

5. Check the stats of the topic.

6. Delete the topic.

## Prerequisites

- [Install and start Pulsar standalone](getting-started-standalone.md). This tutorial runs Pulsar 2.11 as an example.

## Steps

1. Set the service URLs to point to the broker service in [client.conf](https://github.com/apache/pulsar/blob/master/conf/client.conf).

    ```bash
    webServiceUrl=http://localhost:8080/
    brokerServiceUrl=pulsar://localhost:6650/
    ```

2. Create a persistent topic named test-topic-1 with 6 partitions.

    **Input**

    ```bash
    bin/pulsar-admin topics create-partitioned-topic \
    persistent://public/default/test-topic-1 \
    --partitions 6
    ```

    **Output**

    There is no output. You can check the status of the topic in Step 5.

3. Update the number of the partition to 8.

    **Input**

    ```bash
    bin/pulsar-admin topics update-partitioned-topic \
    persistent://public/default/test-topic-1 \
    --partitions 8
    ```

    **Output**

    There is no output. You can check the number of partitions in Step 5.

4. Produce some messages to the partitioned topic test-topic-1.

    **Input**

    ```bash
    bin/pulsar-perf produce -u pulsar://localhost:6650 -r 1000 -i 1000 persistent://public/default/test-topic-1
    ```

    **Output**

    ```bash
    2023-03-07T15:33:56,832+0800 [main] INFO  org.apache.pulsar.testclient.PerformanceProducer - Starting Pulsar perf producer with config: {
      "confFile" : "/Users/yu/apache-pulsar-2.11.0/conf/client.conf",
      "serviceURL" : "pulsar://localhost:6650",
      "authPluginClassName" : "",
      "authParams" : "",
      "tlsTrustCertsFilePath" : "",
      "tlsAllowInsecureConnection" : false,
      "tlsHostnameVerificationEnable" : false,
      "maxConnections" : 1,
      "statsIntervalSeconds" : 1000,
      "ioThreads" : 1,
      "enableBusyWait" : false,
      "listenerName" : null,
      "listenerThreads" : 1,
      "maxLookupRequest" : 50000,
      "topics" : [ "persistent://public/default/test-topic-1" ],
      "numTestThreads" : 1,
      "msgRate" : 1000,
      "msgSize" : 1024,
      "numTopics" : 1,
    "numProducers" : 1,
      "separator" : "-",
      "sendTimeout" : 0,
      "producerName" : null,
      "adminURL" : "http://localhost:8080/",

    ...

    2023-03-07T15:35:03,769+0800 [Thread-0] INFO  org.apache.pulsar.testclient.PerformanceProducer - Aggregated latency stats --- Latency: mean:   8.931 ms - med:   3.775 - 95pct:  32.144 - 99pct:  98.432 - 99.9pct: 216.088 - 99.99pct: 304.807 - 99.999pct: 349.391 - Max: 351.235
    ```

5. Check the internal stats of the partitioned topic _test-topic-1_.

    **Input**

    ```bash
    bin/pulsar-admin topics partitioned-stats-internal \
    persistent://public/default/test-topic-1
    ```

    **Output**

    Below is a part of the output. For detailed explanations of topic stats, see [Pulsar statistics](administration-stats.md).

    ```bash
    {
      "metadata" : {
        "partitions" : 8
      },
      "partitions" : {
        "persistent://public/default/test-topic-1-partition-1" : {
          "entriesAddedCounter" : 4213,
          "numberOfEntries" : 4213,
          "totalSize" : 8817693,
          "currentLedgerEntries" : 4212,
          "currentLedgerSize" : 8806289,
          "lastLedgerCreatedTimestamp" : "2023-03-07T15:33:59.367+08:00",
          "waitingCursorsCount" : 0,
          "pendingAddEntriesCount" : 0,
          "lastConfirmedEntry" : "65:4211",
          "state" : "LedgerOpened",
          "ledgers" : [ {
            "ledgerId" : 49,
            "entries" : 1,
            "size" : 11404,
            "offloaded" : false,
            "underReplicated" : false
          }, {
            "ledgerId" : 65,
            "entries" : 0,
            "size" : 0,
            "offloaded" : false,
            "underReplicated" : false
          } ],
          "cursors" : {
            "test-subscriptio-1" : {
              "markDeletePosition" : "49:-1",
              "readPosition" : "49:0",
              "waitingReadOp" : false,
              "pendingReadOps" : 0,
              "messagesConsumedCounter" : 0,
              "cursorLedger" : -1,
              "cursorLedgerLastEntry" : -1,
      "individuallyDeletedMessages" : "[]",
              "lastLedgerSwitchTimestamp" : "2023-03-06T16:41:32.801+08:00",
              "state" : "NoLedger",
              "numberOfEntriesSinceFirstNotAckedMessage" : 1,
              "totalNonContiguousDeletedMessagesRange" : 0,
              "subscriptionHavePendingRead" : false,
              "subscriptionHavePendingReplayRead" : false,
              "properties" : { }
            },
            "test-subscription-1" : {
              "markDeletePosition" : "49:-1",
              "readPosition" : "49:0",
              "waitingReadOp" : false,
              "pendingReadOps" : 0,
              "messagesConsumedCounter" : 0,
              "cursorLedger" : -1,
              "cursorLedgerLastEntry" : -1,
              "individuallyDeletedMessages" : "[]",
              "lastLedgerSwitchTimestamp" : "2023-03-06T16:41:32.801+08:00",
              "state" : "NoLedger",
              "numberOfEntriesSinceFirstNotAckedMessage" : 1,
              "totalNonContiguousDeletedMessagesRange" : 0,
              "subscriptionHavePendingRead" : false,
              "subscriptionHavePendingReplayRead" : false,
              "properties" : { }
            }
          },
          "schemaLedgers" : [ ],
          "compactedLedger" : {
            "ledgerId" : -1,
            "entries" : -1,
            "size" : -1,
            "offloaded" : false,
            "underReplicated" : false
          }
        },
    ...

    ```

6. Delete the topic _test-topic-1_.

    **Input**

    ```bash
    bin/pulsar-admin topics delete-partitioned-topic persistent://public/default/test-topic-1
    ```

    **Output**

    There is no output. You can verify whether the _test-topic-1_ exists or not using the following command.

    **Input**

    List topics in `public/default` namespace.

    ```bash
    bin/pulsar-admin topics list public/default
    ```

## Related topics

To check the detailed usage of pulsar-admin CLI, see [pulsar-admin CLI reference](pathname:///reference/#/@pulsar:version_reference@/).

