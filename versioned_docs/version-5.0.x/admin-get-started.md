---
id: admin-api-get-started
title: Get started
sidebar_label: "Get started"
description: The Pulsar admin interfaces (pulsar-admin CLI, REST API with OpenAPI specifications, Java and Go clients), how to set them up, and a first walk-through with each of them.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

Pulsar admin interfaces let you administer clusters: create, update, delete and inspect every entity of a Pulsar instance (clusters, tenants, namespaces, topics, schemas, functions, connectors, packages, transactions) and set the policies for data, resources and security. Every way of administering Pulsar goes through the admin REST API that the brokers serve; the command-line tool and the client libraries are clients of it. Pick the interface that fits how you work:

| Interface | Reference | Use it when |
| --- | --- | --- |
| **Command line**: `pulsar-admin` | [pulsar-admin CLI reference](/reference/#/@pulsar:version_reference@/pulsar-admin/) | You administer a cluster interactively or from shell scripts. It ships in the `bin` folder of the Pulsar installation and needs no extra setup, but each invocation starts a JVM. [Pulsar shell](administration-pulsar-shell.md) is an interactive shell around the same commands that starts the JVM once. |
| **REST API** | [REST APIs and OpenAPI specifications](reference-rest-api-overview.md), [endpoint reference](pathname:///admin-rest-api/?version=@pulsar:rest_api_version@) | You automate from any language or tool that speaks HTTP, for example an operator, a controller or a `curl` call in a script. Since Pulsar 5.0 the API has [OpenAPI 3 specifications](reference-rest-api-overview.md#openapi-specifications) from which you can [generate a client](reference-rest-api-overview.md#generate-a-client-from-the-specification) for your language. |
| **Java Library** | [Java admin API Javadoc](@pulsar:javadoc:admin@/) | You manage Pulsar from Java applications or tests. The client is the `org.apache.pulsar:pulsar-client-admin` artifact. |
| **Go Library** | [`pulsaradmin` package](https://pkg.go.dev/github.com/apache/pulsar-client-go/pulsaradmin) of the Go client | You manage Pulsar from Go applications, for example a Kubernetes operator. |

![Pulsar admin interfaces](/assets/admin-api-tools.svg)

The REST API deserves a closer look, because it is what the other interfaces are built on and the right choice when the CLI or the Java client does not fit:

- **Call it directly.** Every operation on the [feature pages](admin-api-features.md) has a REST API tab with the endpoint. Endpoints that upload a package (functions, sources, sinks) take a multipart request; see the [`curl` example for creating a function](admin-api-functions.md#create-a-function).
- **Use the OpenAPI specifications.** Since Pulsar 5.0, the REST API is described by [OpenAPI 3 documents](reference-rest-api-overview.md#openapi-specifications) generated from the broker source for every release, one per API (admin, lookup, functions, sources, sinks, packages, transactions). They can be [downloaded per release line](reference-rest-api-overview.md#download-the-specifications), imported into tools such as Postman, and are what renders the [REST API reference](reference-rest-api-overview.md).
- **Generate a client for your language.** With the specification and [OpenAPI Generator](https://openapi-generator.tech/), a client library for Go, Python, TypeScript, Rust, C# and many other languages is [generated instead of written](reference-rest-api-overview.md#generate-a-client-from-the-specification).

The rest of this page walks you through the quickest way to get started with the command line, the REST API and the Java API by managing a topic with each of them, including the setup each interface needs when authentication is enabled.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

[pulsar-admin CLI](/reference/#/@pulsar:version_reference@/pulsar-admin/) is a command-line tool and is available in the bin folder of your Pulsar installation.

</TabItem>
<TabItem value="REST API">

[REST API](pathname:///admin-rest-api/?version=@pulsar:rest_api_version@) belongs to HTTP calls, which are made against the admin APIs provided by brokers. In addition, both the Java admin API and pulsar-admin CLI use the REST API. The API is described by [OpenAPI specifications](reference-rest-api-overview.md#openapi-specifications) that you can use to [generate a client](reference-rest-api-overview.md#generate-a-client-from-the-specification) for other languages.

</TabItem>
<TabItem value="Java">

[Java admin API](@pulsar:javadoc:admin@/) is a programmable interface written in Java.

</TabItem>

</Tabs>
````

Check the detailed steps below.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="pulsar-admin"
  values={[{"label":"pulsar-admin","value":"pulsar-admin"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="pulsar-admin">

To manage topics using pulsar-admin CLI, complte the following steps.

1. Set the service URL.

2. Create a partitioned topic.

3. Update the number of a partition.

4. Produce messages to the topic.

5. Check the stats of the topic.

6. Delete the topic.

**Prerequisites**

- Install and start Pulsar standalone. This tutorial runs Pulsar 2.11 as an example.

**Steps**

**Step 1:** Set the service URLs to point to the broker service in [client.conf](https://github.com/apache/pulsar/blob/master/conf/client.conf).

    ```bash
    webServiceUrl=http://localhost:8080/
    brokerServiceUrl=pulsar://localhost:6650/
    ```

    If authentication is enabled in your cluster, configure the authentication plugin and its parameters in the same file, and the TLS settings when the web service uses TLS:

    |Name|Description|Default|
    |----|-----------|-------|
    |webServiceUrl|The web URL for the cluster.|http://localhost:8080/|
    |brokerServiceUrl|The Pulsar protocol URL for the cluster.|pulsar://localhost:6650/|
    |authPlugin|The authentication plugin.| |
    |authParams|The authentication parameters for the cluster, as a comma-separated string.| |
    |useTls|Whether or not TLS authentication will be enforced in the cluster.|false|
    |tlsAllowInsecureConnection|Accept untrusted TLS certificate from client.|false|
    |tlsTrustCertsFilePath|Path for the trusted TLS certificate file.| |

    See the [client configuration reference](/reference/#/@pulsar:version_reference@/config/reference-configuration-client) for all settings.

**Step 2:** Create a persistent topic named _test-topic-1_ with 6 partitions.

    **Input**

    ```bash
    bin/pulsar-admin topics create-partitioned-topic \
    persistent://public/default/test-topic-1 \
    --partitions 6
    ```

    **Output**

    There is no output. You can check the status of the topic in Step 5.

**Step 3:** Update the number of the partition to 8.

    **Input**

    ```bash
    bin/pulsar-admin topics update-partitioned-topic \
    persistent://public/default/test-topic-1 \
    --partitions 8
    ```

    **Output**

    There is no output. You can check the number of partitions in Step 5.

**Step 4:** Produce some messages to the partitioned topic _test-topic-1_.

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

**Step 5:** Check the internal stats of the partitioned topic _test-topic-1_.

    **Input**

    ```bash
    bin/pulsar-admin topics partitioned-stats-internal \
    persistent://public/default/test-topic-1
    ```

    **Output**

    Below is a part of the output. For detailed explanations of topic stats, see Pulsar statistics.

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

**Step 6:** Delete the topic _test-topic-1_.

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

</TabItem>
<TabItem value="REST API">

To manage topics using REST API, complete the following steps.

1. Create a partitioned topic

2. Update the number of a partition.

3. Produce messages to the topic.

4. Check the stats of the topic.

5. Delete the topic.

**Prerequisites**

- Install and start Pulsar standalone. This tutorial runs Pulsar 2.11 as an example.

**Steps**

**Step 1:** Create a persistent topic named _test-topic-2_ with 4 partitions.

    **Input**

    ```bash
    curl -X PUT http://localhost:8080/admin/v2/persistent/public/default/test-topic-2/partitions -H 'Content-Type: application/json' -d "4"
    ```

    If authentication is enabled, add the credential of your authentication provider to every request, for example a token with `-H "Authorization: Bearer $(cat token)"`; with TLS, use the `https://` web service URL (8443 by default). The endpoints are documented in the [REST API reference](pathname:///admin-rest-api/?version=@pulsar:rest_api_version@), and the [REST APIs and OpenAPI specifications](reference-rest-api-overview.md) page explains the API layout and how to generate a client.

    **Output**

    There is no output. You can check the topic in Step 4.

**Step 2:** Update the number of the partition to 5.

    **Input**

    ```bash
    curl -X POST http://localhost:8080/admin/v2/persistent/public/default/test-topic-2/partitions -H 'Content-Type: application/json' -d "5"
    ```

    **Output**

    There is no output. You can check the status of the topic in Step 4.

**Step 3:** Produce some messages to the partitioned topic _test-topic-2_.

    **Input**

    ```bash
    bin/pulsar-perf produce -u pulsar://localhost:6650 -r 1000 -i 1000 persistent://public/default/test-topic-2
    ```

    **Output**

    ```bash
    2023-03-08T15:47:06,268+0800 [main] INFO  org.apache.pulsar.testclient.PerformanceProducer - Starting Pulsar perf producer with config: {
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
      "topics" : [ "persistent://public/default/test-topic-2" ],
      "numTestThreads" : 1,
      "msgRate" : 1000,
      "msgSize" : 1024,
      "numTopics" : 1,
    "numProducers" : 1,
      "separator" : "-",
      "sendTimeout" : 0,
      "producerName" : null,
      "adminURL" : "http://localhost:8080/",
      "deprecatedAuthPluginClassName" : null,
      "maxOutstanding" : 0,
      "maxPendingMessagesAcrossPartitions" : 0,
      "partitions" : null,
      "numMessages" : 0,
      "compression" : "NONE",
      "payloadFilename" : null,
      "payloadDelimiter" : "\\n",
      "batchTimeMillis" : 1.0,
      "batchMaxMessages" : 1000,
      "batchMaxBytes" : 4194304,
      "testTime" : 0,
      "warmupTimeSeconds" : 1.0,
      "encKeyName" : null,
      "encKeyFile" : null,
      "delay" : 0,
      "exitOnFailure" : false,
      "messageKeyGenerationMode" : null,
      "producerAccessMode" : "Shared",
      "formatPayload" : false,
      "formatterClass" : "org.apache.pulsar.testclient.DefaultMessageFormatter",
      "transactionTimeout" : 10,
      "numMessagesPerTransaction" : 50,
      "isEnableTransaction" : false,

      "isAbortTransaction" : false,
      "histogramFile" : null
    }

    ...

    2023-03-08T15:53:28,178+0800 [Thread-0] INFO  org.apache.pulsar.testclient.PerformanceProducer - Aggregated latency stats --- Latency: mean:   4.481 ms - med:   2.918 - 95pct:  10.710 - 99pct:  38.928 - 99.9pct: 112.689 - 99.99pct: 154.241 - 99.999pct: 193.249 - Max: 241.717
    ```

**Step 4:** Check the internal stats of the topic _test-topic-2_.

    **Input**

    ```bash
    curl -X GET http://localhost:8080/admin/v2/persistent/public/default/test-topic-2/partitioned-internalStats
    ```

    **Output**

    For detailed explanations of topic stats, see Pulsar statistics.

    ```bash
    {"metadata":{"partitions":5},"partitions":{"persistent://public/default/test-topic-2-partition-3":{"entriesAddedCounter":47087,"numberOfEntries":47087,"totalSize":80406959,"currentLedgerEntries":47087,"currentLedgerSize":80406959,"lastLedgerCreatedTimestamp":"2023-03-08T15:47:07.273+08:00","waitingCursorsCount":0,"pendingAddEntriesCount":0,"lastConfirmedEntry":"117:47086","state":"LedgerOpened","ledgers":[{"ledgerId":117,"entries":0,"size":0,"offloaded":false,"underReplicated":false}],"cursors":{},"schemaLedgers":[],"compactedLedger":{"ledgerId":-1,"entries":-1,"size":-1,"offloaded":false,"underReplicated":false}},"persistent://public/default/test-topic-2-partition-2":{"entriesAddedCounter":46995,"numberOfEntries":46995,"totalSize":80445417,"currentLedgerEntries":46995,"currentLedgerSize":80445417,"lastLedgerCreatedTimestamp":"2023-03-08T15:47:07.43+08:00","waitingCursorsCount":0,"pendingAddEntriesCount":0,"lastConfirmedEntry":"118:46994","state":"LedgerOpened","ledgers":[{"ledgerId":118,"entries":0,"size":0,"offloaded":false,"underReplicated":false}],...
    ```

**Step 5:** Delete the topic _test-topic-2_.

    **Input**

    ```
    curl -X DELETE http://localhost:8080/admin/v2/persistent/public/default/test-topic-2/partitions
    ```

    **Output**

    There is no output. You can verify whether the _test-topic-2_ exists or not using the following command.

    **Input**

    List topics in `public/default` namespace.

    ```
    curl -X GET http://localhost:8080/admin/v2/persistent/public/default
    ```

</TabItem>
<TabItem value="Java">

To manage topics using Java admin API, complete following steps.

1. Initiate a Pulsar Java client.

2. Create a partitioned topic

3. Update the number of a partition.

4. Produce messages to the topic.

5. Check the stats of the topic.

6. Delete the topic.

**Prerequisites**

- Prepare a Java project and add the following dependency to your POM file.

  ```java
  <dependency>
        <groupId>org.apache.pulsar</groupId>
        <artifactId>pulsar-client-admin</artifactId>
        <version>@pulsar:version@</version>
    </dependency>
  ```

**Steps**

**Step 1:** Initiate a Pulsar Java client in your Java project.

    **Input**

    ```java
    String url = "http://localhost:8080";
    PulsarAdmin admin = PulsarAdmin.builder()
        .serviceHttpUrl(url)
        .build();
    ```

    The [PulsarAdmin](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/PulsarAdmin) object is created through a [PulsarAdminBuilder](@pulsar:javadoc:admin@/org/apache/pulsar/client/admin/PulsarAdminBuilder). If authentication is enabled, pass the authentication plugin and its parameters, and the TLS settings when the web service uses TLS. The service URL can list several brokers, separated by commas:

    ```java
    String url = "https://broker-1.example.com:8443,broker-2.example.com:8443,broker-3.example.com:8443";
    // The fully qualified class name of the authentication plugin, and its parameters
    String authPluginClassName = "org.apache.pulsar.client.impl.auth.AuthenticationToken";
    String authParams = "file:///path/to/token";
    boolean tlsAllowInsecureConnection = false;
    String tlsTrustCertsFilePath = "/path/to/ca.cert.pem";
    PulsarAdmin admin = PulsarAdmin.builder()
        .serviceHttpUrl(url)
        .authentication(authPluginClassName, authParams)
        .tlsTrustCertsFilePath(tlsTrustCertsFilePath)
        .allowTlsInsecureConnection(tlsAllowInsecureConnection)
        .build();
    ```

**Step 2:** Create a partitioned topic _test-topic-1_ with 4 partitions.

    **Input**

    ```java
    admin.topics().createPartitionedTopic("persistent://public/default/test-topic-1", 4);
    ```

**Step 3:** Update the number of the partition to 5.

    **Input**

    ```java
    admin.topics().updatePartitionedTopic("test-topic-1", 5);
    ```

**Step 4:** Produce some messages to the topic _test-topic-1_.

    **Input**

    ```java
    PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();

    Producer<String> producer = client.newProducer(Schema.STRING)
        .topic("test-topic-1")
        .blockIfQueueFull(true)
        .create();

    for (int i = 0; i < 100; ++i) {
        producer.newMessage().value("test").send();
    }
    producer.close();
    client.close();
    ```

**Step 5:** Check the stats of the topic _test-topic-1_.

    **Input**

    ```java
    PartitionedTopicStats stats = admin.topics().getPartitionedStats("persistent://public/default/test-topic-1",false);
    System.out.println(stats.getMsgInCounter());
    ```
    
    **Output**

    ```java
    100
    ```

**Step 6:** Delete the topic _test-topic-1_.

    **Input**

    ```java
    admin.topics().deletePartitionedTopic("test-topic-1");
    ```

</TabItem>

</Tabs>
````

## Related topics

- To learn common administrative tasks, see [Pulsar admin API - Features](admin-api-features.md).

- To check the detailed usage, see the references below.

  - [pulsar-admin CLI](/reference/#/@pulsar:version_reference@/pulsar-admin/)

  - Pulsar admin APIs

    - [REST API, OpenAPI specifications and generated clients](reference-rest-api-overview.md)

    - [Java admin API](@pulsar:javadoc:admin@/)