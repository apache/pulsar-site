---
id: develop-load-manager
title: Broker load balancer
sidebar_label: "Broker load balancer"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

If you want to develop a broker load balancer, check out the following docs.

Pulsar has the following types of load managers:

- Simple load manager, implemented in [SimpleLoadManagerImpl](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/impl/SimpleLoadManagerImpl.java), which attempts to simplify how the load is managed while also providing abstractions so that complex load management strategies may be implemented.

- Modular load manager, implemented in [ModularLoadManagerImpl](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/impl/ModularLoadManagerImpl.java), which is a flexible alternative to the [`SimpleLoadManagerImpl`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/impl/SimpleLoadManagerImpl.java).

- Extensible load manager, implemented in [ExtensibleLoadManagerImpl](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/extensions/ExtensibleLoadManagerImpl.java), which is dependent on system topics and table views for load balance metadata store and replication.

## Concepts

Before starting the impelemtation, make sure you understand the following basics.

:::note

The following concepts are only availabe for the modular load manager.

:::

### Data

The data monitored by the modular load manager is contained in the [`LoadData`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/LoadData.java) class.
Here, the available data is subdivided into the bundle data and the broker data.

### Broker

The broker data is contained in the [`BrokerData`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/BrokerData.java) class. It is further subdivided into two parts,
one being the local data that every broker individually writes to ZooKeeper, and the other being the historical broker data that is written to ZooKeeper by the leader broker.

### Lead broker

The module load manager is _centralized_, meaning that all requests to assign a bundle---whether it's been seen before or whether this is the first time---only get handled by the lead broker (which can change over time). To determine the current lead broker, examine the `/loadbalance/leader` node in ZooKeeper.

### Local broker data

The local broker data is contained in the class [`LocalBrokerData`](https://github.com/apache/pulsar/blob/master/pulsar-common/src/main/java/org/apache/pulsar/policies/data/loadbalancer/LocalBrokerData.java) and provides information about the following resources:

* CPU usage
* JVM heap memory usage
* Direct memory usage
* Bandwidth in/out usage
* Most recent total message rate in/out across all bundles
* Total number of topics, bundles, producers, and consumers
* Names of all bundles assigned to this broker
* Most recent changes in bundle assignments for this broker

The local broker data is updated periodically according to the service configuration
"loadBalancerReportUpdateMaxIntervalMinutes". After any broker updates their local broker data, the leader broker will
receive the update immediately via a ZooKeeper watch, where the local data is read from the ZooKeeper node
`/loadbalance/brokers/<broker host/port>`

### Historical broker data

The historical broker data is contained in the [`TimeAverageBrokerData`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/TimeAverageBrokerData.java) class.

To reconcile the need to make good decisions in a steady-state scenario and make reactive decisions in a critical scenario, the historical data is split into two parts: the short-term data for reactive decisions, and the long-term data for steady-state decisions. Both time frames maintain the following information:

* Message rate in/out for the entire broker
* Message throughput in/out for the entire broker

Unlike the bundle data, the broker data does not maintain samples for the global broker message rates and throughputs, which is not expected to remain steady as new bundles are removed or added. Instead, this data is aggregated over the short-term and long-term data for the bundles. See the section on bundle data to understand how that data is collected and maintained.

The historical broker data is updated for each broker in memory by the leader broker whenever any broker writes their local data to ZooKeeper. Then, the historical data is written to ZooKeeper by the leader broker periodically according to the configuration `loadBalancerResourceQuotaUpdateIntervalMinutes`.

### Bundle data

The bundle data is contained in the [`BundleData`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/BundleData.java). Like the historical broker data, the bundle data is split into a short-term and long-term time frame. The information maintained in each time frame:

* Message rate in/out for this bundle
* Message Throughput In/Out for this bundle
* Current number of samples for this bundle

The time frames are implemented by maintaining the average of these values over a set, a limited number of samples, where the samples are obtained through the message rate and throughput values in the local data. Thus, if the update interval for the local data is 2 minutes, the number of short samples is 10 and the number of long samples is 1000, the short-term data is maintained over a period of `10 samples * 2 minutes / sample = 20 minutes`, while the long-term data is similarly over a period of 2000 minutes. Whenever there are not enough samples to satisfy a given time frame, the average is taken only over the existing samples. When no samples are available, default values are assumed until they are overwritten by the first sample. Currently, the default values are

* Message rate in/out: 50 messages per second both ways
* Message throughput in/out: 50KB per second both ways

The bundle data is updated in memory on the leader broker whenever any broker writes their local data to ZooKeeper.
Then, the bundle data is written to ZooKeeper by the leader broker periodically at the same time as the historical broker data, according to the configuration `loadBalancerResourceQuotaUpdateIntervalMinutes`.

### Traffic distribution

The modular load manager uses the abstraction provided by [`ModularLoadManagerStrategy`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/ModularLoadManagerStrategy.java) to make decisions about bundle assignments. The strategy makes a decision by considering the service configuration, the entire load data, and the bundle data for the bundle to be assigned. Currently, the only supported strategy is [`LeastLongTermMessageRate`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/impl/LeastLongTermMessageRate.java), though soon users will have the ability to inject their own strategies if desired.

### Least long term message rate strategy

As its name suggests, the least long-term message rate strategy attempts to distribute bundles across brokers so that
the message rate in the long-term time window for each broker is roughly the same. However, simply balancing load based
on message rate does not handle the issue of asymmetric resource burden per message on each broker. Thus, the system
resource usages, which are CPU, memory, direct memory, bandwidth in, and bandwidth out, are also considered in the
assignment process. This is done by weighting the final message rate according to
`1 / (overload_threshold - max_usage)`, where `overload_threshold` corresponds to the configuration
`loadBalancerBrokerOverloadedThresholdPercentage` and `max_usage` is the maximum proportion among the system resources that are being utilized by the candidate broker. This multiplier ensures that machines with are being more heavily taxed
by the same message rates will receive less load. In particular, it tries to ensure that if one machine is overloaded,
then all machines are approximately overloaded. In the case in which a broker's max usage exceeds the overload
threshold, that broker is not considered for bundle assignment. If all brokers are overloaded, the bundle is randomly
assigned.

## Enablement

You can enable a simple, modular, or extensible load manager by following the steps below.

:::note 

For simple and modular load managers:

- Any mistakes in specifying the load manager will cause Pulsar to default to `SimpleLoadManagerImpl`. 

- If you do not specify load manager, the default load manager (`ModularLoadManagerImpl`) is used.

:::

### Enable simple load manager

You can enable the simple load manager using one of the following methods: 

- Method 1

  Update the value of [loadManagerClassName](https://github.com/apache/pulsar/blob/782e91fe327efe2c9c9107d6c679c2837d43935b/conf/broker.conf#L1309) to `org.apache.pulsar.broker.loadbalance.impl.SimpleLoadManagerImpl` in `conf/broker.conf`.

- Method 2
  
  Use the `pulsar-admin` tool. 

   ```shell
   pulsar-admin brokers update-dynamic-config \
   --config loadManagerClassName \
   --value org.apache.pulsar.broker.loadbalance.impl.SimpleLoadManagerImpl
   ``` 

### Enable modular load manager

You can enable the modular load manager using one of the following methods: 

- Method 1

  Update the value of [loadManagerClassName](https://github.com/apache/pulsar/blob/782e91fe327efe2c9c9107d6c679c2837d43935b/conf/broker.conf#L1309) to `org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl` in `conf/broker.conf`.

- Method 2
  
  Use the `pulsar-admin` tool. 

   ```shell
   pulsar-admin brokers update-dynamic-config \
   --config loadManagerClassName \
   --value org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl
   ```

### Enable extensible load manager

You can enable the extensible load manager by updating the value of [loadManagerClassName](https://github.com/apache/pulsar/blob/782e91fe327efe2c9c9107d6c679c2837d43935b/conf/broker.conf#L1309) to `org.apache.pulsar.broker.loadbalance.extensions.ExtensibleLoadManagerImpl` in `conf/broker.conf`.

:::note

The [pulsar-admin tool](./reference-cli-tools.md) is not supported for enabling the extensible load manager.

:::

## Verification

If you want to verify which load manager is used, follow the steps below.

### Step 1: check loadManagerClassName

You can use the `pulsar-admin` tool to examine the `loadManagerClassName` element.

**Input**

```bash
bin/pulsar-admin brokers get-all-dynamic-config
```

**Output**

```bash
{
"loadManagerClassName" : "org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl"
}
```

If there is no `loadManagerClassName` element, then the value of [loadManagerClassName](https://github.com/apache/pulsar/blob/782e91fe327efe2c9c9107d6c679c2837d43935b/conf/broker.conf#L1309) in the `conf/broker.conf` file is used.

### Step 2: verify load manager (optional) 

To double-check which load manager is used, you can [check the ZooKeeper load report](#method-1-check-zookeeper-load-report) or [check monitor-brokers output](#method-2-check-monitor-brokers-output).  

#### Method 1: check load report

Different load managers have different load reports. You can verify which load manager is used based on the output.

````mdx-code-block
<Tabs groupId="load-manager-report"
  defaultValue="Simple"
  values={[{"label":"Simple","value":"Simple"},{"label":"Modular","value":"Modular"},{"label":"Extensible","value":"Extensible"}]}>
<TabItem value="Simple">

You can check ZooKeeper load reports.

1. Connect to ZooKeeper.

    **Input**

    ```bash
    bin/pulsar zookeeper-shell -server zookeeper:2181
    ```

    **Output**

    ```bash
    Connecting to zookeeper:2181
    2023-08-02T12:48:58,655+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:zookeeper.version=3.8.1-74db005175a4ec545697012f9069cb9dcc8cdda7, built on 2023-01-25 16:31 UTC
    2023-08-02T12:48:58,662+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:host.name=broker-1
    2023-08-02T12:48:58,662+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:java.version=17.0.7
    2023-08-02T12:48:58,662+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:java.vendor=Eclipse Adoptium
    2023-08-02T12:48:58,662+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:java.home=/usr/lib/jvm/temurin-17-jdk-amd64
    ```

2. List all brokers.

    **Input**

    ```bash
    ls /loadbalance/brokers
    ```

    **Output**

    This output shows that there are 2 brokers.

    ```bash
    [broker-1:8080, broker-2:8080]
    ```

3. Check ZooKeeper load report for broker 1. The load report in `/loadbalance/brokers/...`. 

    **Input**

    ```bash
    get /loadbalance/brokers/broker-1:8080
    ```

    **Output**

    ```bash
    {"name":"broker-1:8080","brokerVersionString":"3.1.0-SNAPSHOT","webServiceUrl":"http://broker-1:8080","pulsarServiceUrl":"pulsar://broker-1:6650","persistentTopicsEnabled":true,"nonPersistentTopicsEnabled":true,"timestamp":1691042931108,"msgRateIn":0.0,"msgRateOut":0.0,"numTopics":0,"numConsumers":0,"numProducers":0,"numBundles":0,"protocols":{},"loadManagerClassName":"org.apache.pulsar.broker.loadbalance.impl.SimpleLoadManagerImpl","startTimestamp":1691042931108,"systemResourceUsage":{"bandwidthIn":{"usage":0.595387281695773,"limit":1.0E7},"bandwidthOut":{"usage":0.5799226769764033,"limit":1.0E7},"cpu":{"usage":6.224803359552059,"limit":800.0},"memory":{"usage":152.0,"limit":2096.0},"directMemory":{"usage":0.0,"limit":256.0}},"bundleStats":{},"bundleGains":[],"bundleLosses":[],"allocatedCPU":0.0,"allocatedMemory":0.0,"allocatedBandwidthIn":0.0,"allocatedBandwidthOut":0.0,"allocatedMsgRateIn":0.0,"allocatedMsgRateOut":0.0,"preAllocatedCPU":0.0,"preAllocatedMemory":0.0,"preAllocatedBandwidthIn":0.0,"preAllocatedBandwidthOut":0.0,"preAllocatedMsgRateIn":0.0,"preAllocatedMsgRateOut":0.0,"underLoaded":true,"overLoaded":false,"loadReportType":"LoadReport","msgThroughputIn":0.0,"msgThroughputOut":0.0,"bandwidthIn":{"usage":0.595387281695773,"limit":1.0E7},"bandwidthOut":{"usage":0.5799226769764033,"limit":1.0E7},"memory":{"usage":152.0,"limit":2096.0},"cpu":{"usage":6.224803359552059,"limit":800.0},"directMemory":{"usage":0.0,"limit":256.0},"lastUpdate":1691042931108}
    ```

</TabItem>
<TabItem value="Modular">

You can check ZooKeeper load reports.

1. Connect to ZooKeeper.

    **Input**

    ```bash
    bin/pulsar zookeeper-shell -server zookeeper:2181
    ```

    **Output**

    ```bash
    Connecting to zookeeper:2181
    2023-08-02T12:48:58,655+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:zookeeper.version=3.8.1-74db005175a4ec545697012f9069cb9dcc8cdda7, built on 2023-01-25 16:31 UTC
    2023-08-02T12:48:58,662+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:host.name=broker-1
    2023-08-02T12:48:58,662+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:java.version=17.0.7
    2023-08-02T12:48:58,662+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:java.vendor=Eclipse Adoptium
    2023-08-02T12:48:58,662+0000 [main] INFO  org.apache.zookeeper.ZooKeeper - Client environment:java.home=/usr/lib/jvm/temurin-17-jdk-amd64
    ```

2. List all brokers.
  
    **Input**

    ```bash
    ls /loadbalance/brokers
    ```

    **Output**

    This output shows that there are 2 brokers.

    ```bash
    [broker-1:8080, broker-2:8080]
    ```

3. Check ZooKeeper load report for broker 1. The load report in `/loadbalance/brokers/...`. 
    
    **Input**

    ```bash
    get /loadbalance/brokers/broker-1:8080
    ```

    **Output**

    ```bash
    {"webServiceUrl":"http://broker-1:8080","pulsarServiceUrl":"pulsar://broker-1:6650","persistentTopicsEnabled":true,"nonPersistentTopicsEnabled":true,"cpu":{"usage":7.311714728372232,"limit":800.0},"memory":{"usage":124.0,"limit":2096.0},"directMemory":{"usage":36.0,"limit":256.0},"bandwidthIn":{"usage":0.8324254085661579,"limit":1.0E7},"bandwidthOut":{"usage":0.7155446715644209,"limit":1.0E7},"msgThroughputIn":0.0,"msgThroughputOut":0.0,"msgRateIn":0.0,"msgRateOut":0.0,"lastUpdate":1690979816792,"lastStats":{"my-tenant/my-namespace/0x4ccccccb_0x66666664":{"msgRateIn":0.0,"msgThroughputIn":0.0,"msgRateOut":0.0,"msgThroughputOut":0.0,"consumerCount":2,"producerCount":0,"topics":1,"cacheSize":0}},"numTopics":1,"numBundles":1,"numConsumers":2,"numProducers":0,"bundles":["my-tenant/my-namespace/0x4ccccccb_0x66666664"],"lastBundleGains":[],"lastBundleLosses":[],"brokerVersionString":"3.1.0-SNAPSHOT","protocols":{},"advertisedListeners":{"internal":{"brokerServiceUrl":"pulsar://broker-1:6650"}},"loadManagerClassName":"org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl","startTimestamp":1690940955211,"maxResourceUsage":0.140625,"loadReportType":"LocalBrokerData"}
    ```

</TabItem>
<TabItem value="Extensible">

:::note

[Extensible load manager](./concepts-broker-load-balancing-types.md) does not have the ZooKeepr load report because its internal stats are stored in system topics rather than ZooKeeper.

:::

You can check load report from system topics using the [pulsar-client tool](./reference-cli-tools.md).

**Input**

```bash
bin/pulsar-client consume non-persistent://pulsar/system/loadbalancer-broker-load-data --subscription-name test
```

**Output**

```bash
2023-08-03T06:21:48,841+0000 [pulsar-client-io-1-3] INFO  org.apache.pulsar.client.impl.ConnectionPool - [[id: 0x69a65535, L:/127.0.0.1:59086 - R:localhost/127.0.0.1:6650]] Connected to server
2023-08-03T06:21:48,926+0000 [pulsar-client-io-1-3] WARN  org.apache.pulsar.client.impl.ConsumerImpl - [non-persistent://pulsar/system/loadbalancer-broker-load-data] Cannot create a [Durable] subscription for a NonPersistentTopic, will use [NonDurable] to subscribe. Subscription name: test
2023-08-03T06:21:49,189+0000 [pulsar-client-io-1-3] INFO  org.apache.pulsar.client.impl.ConsumerStatsRecorderImpl - Starting Pulsar consumer status recorder with config: {"topicNames":["non-persistent://pulsar/system/loadbalancer-broker-load-data"],"topicsPattern":null,"subscriptionName":"test","subscriptionType":"Exclusive","subscriptionProperties":null,"subscriptionMode":"NonDurable","receiverQueueSize":1000,"acknowledgementsGroupTimeMicros":100000,"maxAcknowledgmentGroupSize":1000,"negativeAckRedeliveryDelayMicros":60000000,"maxTotalReceiverQueueSizeAcrossPartitions":50000,"consumerName":null,"ackTimeoutMillis":0,"tickDurationMillis":1000,"priorityLevel":0,"maxPendingChunkedMessage":10,"autoAckOldestChunkedMessageOnQueueFull":false,"expireTimeOfIncompleteChunkedMessageMillis":60000,"cryptoFailureAction":"FAIL","properties":{},"readCompacted":false,"subscriptionInitialPosition":"Latest","patternAutoDiscoveryPeriod":60,"regexSubscriptionMode":"PersistentOnly","deadLetterPolicy":null,"retryEnable":false,"autoUpdatePartitions":true,"autoUpdatePartitionsIntervalSeconds":60,"replicateSubscriptionState":false,"resetIncludeHead":false,"batchIndexAckEnabled":false,"ackReceiptEnabled":false,"poolMessages":true,"startPaused":false,"autoScaledReceiverQueueSizeEnabled":false,"topicConfigurations":[],"maxPendingChuckedMessage":10}
2023-08-03T06:21:49,214+0000 [pulsar-client-io-1-3] INFO  org.apache.pulsar.client.impl.ConsumerStatsRecorderImpl - Pulsar client config: {"serviceUrl":"pulsar://localhost:6650/","authPluginClassName":null,"authParams":null,"authParamMap":null,"operationTimeoutMs":30000,"lookupTimeoutMs":30000,"statsIntervalSeconds":60,"numIoThreads":8,"numListenerThreads":8,"connectionsPerBroker":1,"connectionMaxIdleSeconds":180,"useTcpNoDelay":true,"useTls":false,"tlsKeyFilePath":"","tlsCertificateFilePath":"","tlsTrustCertsFilePath":"","tlsAllowInsecureConnection":false,"tlsHostnameVerificationEnable":false,"concurrentLookupRequest":5000,"maxLookupRequest":50000,"maxLookupRedirects":20,"maxNumberOfRejectedRequestPerConnection":50,"keepAliveIntervalSeconds":30,"connectionTimeoutMs":10000,"requestTimeoutMs":60000,"readTimeoutMs":60000,"autoCertRefreshSeconds":300,"initialBackoffIntervalNanos":100000000,"maxBackoffIntervalNanos":60000000000,"enableBusyWait":false,"listenerName":null,"useKeyStoreTls":false,"sslProvider":null,"tlsKeyStoreType":"JKS","tlsKeyStorePath":"","tlsKeyStorePassword":"*****","tlsTrustStoreType":"JKS","tlsTrustStorePath":"","tlsTrustStorePassword":"*****","tlsCiphers":[],"tlsProtocols":[],"memoryLimitBytes":0,"proxyServiceUrl":null,"proxyProtocol":null,"enableTransaction":false,"dnsLookupBindAddress":null,"dnsLookupBindPort":0,"socks5ProxyAddress":null,"socks5ProxyUsername":null,"socks5ProxyPassword":null,"description":null}
2023-08-03T06:21:49,236+0000 [pulsar-client-io-1-5] INFO  org.apache.pulsar.client.impl.ConnectionPool - [[id: 0xbeee21f2, L:/172.31.0.4:44850 - R:broker-1/172.31.0.4:6650]] Connected to server
2023-08-03T06:21:49,241+0000 [pulsar-client-io-1-5] INFO  org.apache.pulsar.client.impl.ConsumerImpl - [non-persistent://pulsar/system/loadbalancer-broker-load-data][test] Subscribing to topic on cnx [id: 0xbeee21f2, L:/172.31.0.4:44850 - R:broker-1/172.31.0.4:6650], consumerId 0
2023-08-03T06:21:49,273+0000 [pulsar-client-io-1-5] INFO  org.apache.pulsar.client.impl.ConsumerImpl - [non-persistent://pulsar/system/loadbalancer-broker-load-data][test] Subscribed to topic on broker-1/172.31.0.4:6650 -- consumer: 0
----- got message -----
key:[broker-1:8080], properties:[], content:{"cpu":{"usage":14.397985201479854,"limit":800.0},"memory":{"usage":300.0,"limit":2096.0},"directMemory":{"usage":40.0,"limit":256.0},"bandwidthIn":{"usage":0.7817884878178855,"limit":1.0E7},"bandwidthOut":{"usage":0.7213945272139455,"limit":1.0E7},"msgThroughputIn":3.000538680274058,"msgThroughputOut":3.0005621893825616,"msgRateIn":0.03333931866971176,"msgRateOut":0.033339579882028465,"bundleCount":3,"topics":3,"maxResourceUsage":0.15625,"weightedMaxEMA":0.15625,"msgThroughputEMA":38.88925615962549,"updatedAt":1691043751060,"reportedAt":1691043631073}
```

</TabItem>

</Tabs>
````

#### Method 2: check monitor-brokers output

You can use the [pulsar-perf tool](reference-cli-tools.md) to start a broker monitor. 
  
Different load managers have different outputs. This output is the same as the output of the [Method 1: check ZooKeeper load report](#method-1-check-zookeeper-load-report), but it is well formatted for better readability.

````mdx-code-block
<Tabs groupId="load-manager-report"
  defaultValue="Simple"
  values={[{"label":"Simple","value":"Simple"},{"label":"Modular","value":"Modular"},{"label":"Extensible","value":"Extensible"}]}>
<TabItem value="Simple">

**Input**

```bash
pulsar-perf monitor-brokers --connect-string <zookeeper host:port>
````

**Output**

```bash
===================================================================================================================
||COUNT          |TOPIC          |BUNDLE         |PRODUCER       |CONSUMER       |BUNDLE +       |BUNDLE -       ||
||               |4              |4              |0              |2              |0              |0              ||
||RAW SYSTEM     |CPU %          |MEMORY %       |DIRECT %       |BW IN %        |BW OUT %       |MAX %          ||
||               |0.25           |47.94          |0.01           |0.00           |0.00           |47.94          ||
||ALLOC SYSTEM   |CPU %          |MEMORY %       |DIRECT %       |BW IN %        |BW OUT %       |MAX %          ||
||               |0.20           |1.89           |               |1.27           |3.21           |3.21           ||
||RAW MSG        |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
||               |0.00           |0.00           |0.00           |0.01           |0.01           |0.01           ||
||ALLOC MSG      |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
||               |54.84          |134.48         |189.31         |126.54         |320.96         |447.50         ||
===================================================================================================================
```

</TabItem>
<TabItem value="Modular">

**Input**

```bash
pulsar-perf monitor-brokers --connect-string <zookeeper host:port>
````

**Output**

```bash
===================================================================================================================
||SYSTEM         |CPU %          |MEMORY %       |DIRECT %       |BW IN %        |BW OUT %       |MAX %          ||
||               |0.00           |48.33          |0.01           |0.00           |0.00           |48.33          ||
||COUNT          |TOPIC          |BUNDLE         |PRODUCER       |CONSUMER       |BUNDLE +       |BUNDLE -       ||
||               |4              |4              |0              |2              |4              |0              ||
||LATEST         |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
||               |0.00           |0.00           |0.00           |0.00           |0.00           |0.00           ||
||SHORT          |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
||               |0.00           |0.00           |0.00           |0.00           |0.00           |0.00           ||
||LONG           |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
||               |0.00           |0.00           |0.00           |0.00           |0.00           |0.00           ||
===================================================================================================================
```

</TabItem>
<TabItem value="Extensible">

**Input**

```bash
pulsar-perf monitor-brokers --connect-string pulsar://<host:port> --extensions 
````

**Output**

```bash
===================================================================================================================
||SYSTEM         |CPU %          |MEMORY %       |DIRECT %       |BW IN %        |BW OUT %       |MAX %          ||
||               |17.24          |12.40          |26.95          |0.00           |0.00           |26.95          ||
||COUNT          |TOPIC          |BUNDLE         |PRODUCER       |CONSUMER       |BUNDLE +       |BUNDLE -       ||
||               |               |4              |               |               |               |               ||
||LATEST         |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
||               |100.02         |0.02           |100.03         |103.89         |0.01           |103.90         ||
===================================================================================================================
````

</TabItem>

</Tabs>
````
