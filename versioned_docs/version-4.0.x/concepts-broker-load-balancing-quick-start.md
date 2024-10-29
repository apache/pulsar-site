---
id: concepts-broker-load-balancing-quick-start
title: Quick start
sidebar_label: "Quick start"
---

[Broker load balancing](./concepts-broker-load-balancing-overview.md) helps you distribute messages evenly among brokers and ensure efficient utilization of resources across Pulsar clusters.

This tutorial guides you through the steps for getting started with broker load balancing using Pulsar 3.0.0 in Docker.

## Prerequisites

- [Install Pulsar](./getting-started-standalone.md):

  - If you want to run the modular load balancer, use Pulsar 1.7.0 or later versions.

  - If you want to run the extensible load balancer, use Pulsar 3.0.0 or later versions.

- Install Docker and allocate at least 8 GB of memory.


## Configure broker load balancer to run automatically

If you want to use broker load balancing automatically, follow the steps below.

### Step 1. Start ZooKeeper, bookie, and broker

Create a `docker-compose.yaml` file and copy the following code to that file.

This example starts a ZooKeeper server, a bookie, and 2 brokers, sets the load balancer type to extensible, sets the unloading strategy to [TransferShedder](./concepts-broker-load-balancing-concepts.md#bundle-unloading-strategies), and enables debug mode.

```yaml
version: '3'
networks:
  pulsar:
    driver: bridge
services:
  # Start ZooKeeper
  zookeeper:
    image: apachepulsar/pulsar:3.0.1
    container_name: zookeeper
    restart: on-failure
    networks:
      - pulsar
    volumes:
      - ./data/zookeeper:/pulsar/data/zookeeper
    environment:
      - metadataStoreUrl=zk:zookeeper:2181
      - PULSAR_MEM=-Xms256m -Xmx256m -XX:MaxDirectMemorySize=256m
    command: >
      bash -c "bin/apply-config-from-env.py conf/zookeeper.conf && \
             bin/generate-zookeeper-config.sh conf/zookeeper.conf && \
             exec bin/pulsar zookeeper"
    healthcheck:
      test: ["CMD", "bin/pulsar-zookeeper-ruok.sh"]
      interval: 10s
      timeout: 5s
      retries: 30

  # Initialize cluster metadata
  pulsar-init:
    container_name: pulsar-init
    hostname: pulsar-init
    image: apachepulsar/pulsar:3.0.1
    networks:
      - pulsar
    command: >
      bin/pulsar initialize-cluster-metadata \
               --cluster cluster-a \
               --zookeeper zookeeper:2181 \
               --configuration-store zookeeper:2181 \
               --web-service-url http://broker:8080 \
               --broker-service-url pulsar://broker:6650
    depends_on:
      zookeeper:
        condition: service_healthy

  # Start bookie
  bookie:
    image: apachepulsar/pulsar:3.0.1
    container_name: bookie
    restart: on-failure
    networks:
      - pulsar
    environment:
      - clusterName=cluster-a
      - zkServers=zookeeper:2181
      - metadataServiceUri=metadata-store:zk:zookeeper:2181
      - advertisedAddress=bookie
      - BOOKIE_MEM=-Xms512m -Xmx512m -XX:MaxDirectMemorySize=256m
    depends_on:
      zookeeper:
        condition: service_healthy
      pulsar-init:
        condition: service_completed_successfully
    volumes:
      - ./data/bookkeeper:/pulsar/data/bookkeeper
    command: bash -c "bin/apply-config-from-env.py conf/bookkeeper.conf && exec bin/pulsar bookie"

  # Start broker 1
  broker-1:
    image: apachepulsar/pulsar:3.0.1
    container_name: broker-1
    hostname: broker-1
    restart: on-failure
    networks:
      - pulsar
    environment:
      - metadataStoreUrl=zk:zookeeper:2181
      - zookeeperServers=zookeeper:2181
      - clusterName=cluster-a
      - managedLedgerDefaultEnsembleSize=1
      - managedLedgerDefaultWriteQuorum=1
      - managedLedgerDefaultAckQuorum=1
      - advertisedAddress=broker-1
      - internalListenerName=internal
      - advertisedListeners=internal:pulsar://broker-1:6650
      - brokerServicePort=6650
      - webServicePort=8080
      - PULSAR_MEM=-Xms128m -Xmx2096m -XX:MaxDirectMemorySize=256m
      # Load Manager. Here uses the extensible load balancer, sets the unloading strategy to TransferShedder, and enables debug mode.
      - loadManagerClassName=org.apache.pulsar.broker.loadbalance.extensions.ExtensibleLoadManagerImpl
      - loadBalancerLoadSheddingStrategy=org.apache.pulsar.broker.loadbalance.extensions.scheduler.TransferShedder
      - PULSAR_PREFIX_loadBalancerDebugModeEnabled=true
    depends_on:
      zookeeper:
        condition: service_healthy
      bookie:
        condition: service_started
    command: bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"

  # Start broker 2
  broker-2:
    image: apachepulsar/pulsar:3.0.1
    container_name: broker-2
    hostname: broker-2
    restart: on-failure
    networks:
      - pulsar
    environment:
      - metadataStoreUrl=zk:zookeeper:2181
      - zookeeperServers=zookeeper:2181
      - clusterName=cluster-a
      - managedLedgerDefaultEnsembleSize=1
      - managedLedgerDefaultWriteQuorum=1
      - managedLedgerDefaultAckQuorum=1
      - advertisedAddress=broker-2
      - internalListenerName=internal
      - advertisedListeners=internal:pulsar://broker-2:6650
      - webServicePort=8080
      - brokerServicePort=6650
      - PULSAR_MEM=-Xms128m -Xmx2096m -XX:MaxDirectMemorySize=256m
      # Load Manager. Here uses the extensible load balancer, sets the unloading strategy to TransferShedder, and enables debug mode.
      - loadManagerClassName=org.apache.pulsar.broker.loadbalance.extensions.ExtensibleLoadManagerImpl
      - loadBalancerLoadSheddingStrategy=org.apache.pulsar.broker.loadbalance.extensions.scheduler.TransferShedder
      - PULSAR_PREFIX_loadBalancerDebugModeEnabled=true

    depends_on:
      zookeeper:
        condition: service_healthy
      bookie:
        condition: service_started
    command: bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"
```

:::tip

If you use other ways instead of using a yaml file as above, you can choose a broker load balancer type or set an unloading strategy by updating [loadManagerClassName](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1309C7-L1309C7) or [loadBalancerLoadSheddingStrategy](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1324) in the broker.conf file

It is not recommended to use the [pulsar-admin update-dynamic-config]((pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/brokers?id=update-dynamic-config)) because it will throw an exception if the Pulsar version and the unloading strategy are incompatible.
:::

### Step 2. Start a Pulsar cluster

2.1 Open a tab in the terminal (i.e., terminal tab 1) and execute the following commands.

2.2 Start a Pulsar cluster.

**Input**

```
docker compose up -d
```

**Output**

The output shows that the broker 1 and broker 2 are running.

```bash
[+] Running 12/12
 ✔ broker-1 Pulled                                                                                                                                                   242.5s
 ✔ zookeeper Pulled                                                                                                                                                  242.5s
 ✔ broker-2 Pulled                                                                                                                                                   242.5s
 ✔ pulsar-init Pulled                                                                                                                                                242.5s
 ✔ bookie 7 layers [⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                                                                  242.5s
   ✔ 3153aa388d02 Already exists                                                                                                                                       0.0s
   ✔ 5d127458ab3b Pull complete                                                                                                                                       83.3s
   ✔ 1f99067df50d Pull complete                                                                                                                                      160.0s
   ✔ 85fd7b6fa5dc Pull complete                                                                                                                                      160.0s
   ✔ ff6d7ec52b64 Pull complete                                                                                                                                      160.0s
   ✔ b53efccabef0 Pull complete                                                                                                                                      238.5s
   ✔ 6425449412d7 Pull complete                                                                                                                                      238.8s
[+] Running 11/11
 ✔ Network docker_pulsar                                                                                                                                      Created  0.1s
 ✔ Container zookeeper                                                                                                                                        Healthy 25.1s
 ! zookeeper The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested            0.0s
 ✔ Container pulsar-init                                                                                                                                      Exited  24.0s
 ! pulsar-init The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested          0.0s
 ✔ Container bookie                                                                                                                                           Started 24.2s
 ! bookie The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested               0.0s
 ✔ Container broker-1                                                                                                                                         Started 25.0s
 ✔ Container broker-2                                                                                                                                         Started 25.0s
 ! broker-1 The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested             0.0s
 ! broker-2 The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested             0.0s
```

### Step 3. Check the status of broker and load balancer (Optional)

In terminal tab 1, execute the following commands.

3.1 Enter the container of broker 1.

**Input**

```bash
docker exec -it broker-1 bash
```

**Output**

If there is no output, the operation is successful.

3.2 Display the list of brokers in your cluster.

**Input**

```bash
bin/pulsar-admin brokers list my-cluster
```

**Output**

The output shows there are 2 brokers.

```
broker-2:8081
broker-1:8080
```

3.3 Verify the load balancer type.

**Input**

```bash
bin/pulsar-admin brokers get-runtime-config | grep loadManagerClassName
```

**Output**

The output shows the load balancer type is extensible.

```bash
loadManagerClassName org.apache.pulsar.broker.loadbalance.extensions.ExtensibleLoadManagerImpl
```

### Step 4. Create a topic

In terminal tab 1, execute the following commands.

4.1 Enter the container of broker 1.

**Input**

```bash
docker exec -it broker-1 bash
```

**Output**

If there is no output, the operation is successful.

4.2 Create a partitioned topic named my-topic-1 with 2000 partitions under my-tenant-1/my-namespace-1.

:::tip

This example simplifies the task by only specifying 1 bundle. For details on how to set a reasonable number of bundles, see [defaultNumberOfNamespaceBundles](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L281C7-L281C7).

:::

**Input**

```bash
bin/pulsar-admin tenants create my-tenant-1
bin/pulsar-admin namespaces create my-tenant-1/my-namespace-1 --bundles 1
bin/pulsar-admin topics create-partitioned-topic persistent://my-tenant-1/my-namespace-1/my-topic-1 -p 2000
```

**Output**

If there is no output, the operation is successful.

4.3 Produce messages to the topic using the [pulsar-perf tool](./reference-cli-tools.md).

**Input**

```bash
bin/pulsar-perf produce persistent://my-tenant-1/my-namespace-1/my-topic-1 -r 400 -bm 1 -mk random
```

**Output**

The output shows that messages have been produced.

```bash
2023-07-21T05:08:24,261+0000 [main] INFO org.apache.pulsar.testclient.PerformanceProducer - JVM args [-Dlog4j.configurationFile=log4j2.yaml, -Djava.net.preferIPv4Stack=true, --add-opens=java.base/sun.net=ALL-UNNAMED, --add-opens=java.base/java.lang=ALL-UNNAMED, -Dpulsar.allocator.exit_on_oom=true, -Dio.netty.recycler.maxCapacityPerThread=4096, -Dpulsar.log.appender=Console, -Dpulsar.log.level=info, -Dpulsar.log.root.level=info, -Dpulsar.log.immediateFlush=false, -Dpulsar.log.dir=/pulsar/logs, -Dpulsar.log.file=pulsar-perftest.log] 2023-07-21T05:08:24,305+0000 [main] INFO org.apache.pulsar.testclient.PerformanceProducer - Netty max memory (PlatformDependent.maxDirectMemory()) 1 GB 2023-07-21T05:08:24,305+0000 [main] INFO org.apache.pulsar.testclient.PerformanceProducer - JVM max heap memory (Runtime.getRuntime().maxMemory()) 1 GB 2023-07-21T05:08:24,409+0000 [main] INFO org.apache.pulsar.testclient.PerformanceProducer - Starting Pulsar perf producer with config: {
...
```

### Step 5. Split bundles

5.1 Open another tab in the terminal (i.e., terminal tab 2) and execute the following commands.

5.2 Enter the container of broker 2.

**Input**

```bash
docker exec -it broker-2 bash
```

**Output**

If there is no output, the operation is successful.

5.3 Verify whether the bundles are split after 5 minutes. It takes a little time for Pulsar to split bundles.

:::tip

- The automatic bundle splitting is **enabled by default**. To disable it, update the following configurations to false in the broker.conf file.

    - [loadBalancerAutoBundleSplitEnabled](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1278)

    - [loadBalancerAutoUnloadSplitBundlesEnabled](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1281C4-L1281C4)

- The default bundle splitting algorithm is `range_equally_divide`. You can change it to other [bundle splitting algorithms](./concepts-broker-load-balancing-concepts.md#bundle-splitting-algorithms) by updating [defaultNamespaceBundleSplitAlgorithm](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1321C18-L1321C18) in the broker.conf file.

- For bundle splitting thresholds, you can set more configurations in the broker.conf file. Any existing bundle that exceeds any of the thresholds is a candidate to be split.
:::

**Input**

```bash
bin/pulsar-admin namespaces bundles my-tenant/my-namespace
```

**Output**

The output shows that the bundle has been split into 3 ranges.

```bash
{
  "boundaries" : [ "0x00000000", "0x3fffffff", "0x7fffffff", "0xffffffff" ],
  "numBundles" : 3
}
```

:::note

The number of bundles may vary depending on the time. For example, if you wait longer than 5 minutes, the number of bundles may increase. If the number of bundles is equal to or greater than 2, it means that the bundle has been split.
:::

### Step 6. Unload bundles

You can verify if a bundle has been unloaded using the metric [pulsar_lb_unload_bundle_total](./reference-metrics.md#load-balancing). This method is only supported in the automatic way.

:::tip

- The automatic bundle unloading is **enabled by default**. To disable it, update [loadBalancerSheddingEnabled](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1259C14-L1259C14) to false in the broker.conf file.

- The **default** bundle unloading strategy is TransferShedder (for the extensible broker load balancer) or ThresholdShedder (for the modular broker load balancer). You can change it to other [bundle unloading strategies](./concepts-broker-load-balancing-concepts.md#bundle-unloading-strategies) by updating [loadBalancerLoadSheddingStrategy](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1324C52-L1324C52) in the broker.conf file.

- For bundle unloading conditions, you can set more configurations in the broker.conf file.
:::

## Configure broker load balancer to run manually

If you want to use broker load balancing manually, follow the steps below.

### Step 1. Start ZooKeeper, bookie, and broker

This is the same as [Step 1. Start ZooKeeper, bookie, and broker](#step-1-start-zookeeper-bookie-and-broker) in the automatic method.

### Step 2. Start a Pulsar cluster

This is the same as [Step 2. Start a Pulsar cluster](#step-2-start-a-pulsar-cluster) in the automatic method.

### Step 3. Create a topic

3.1 Enter the container of broker 1.

**Input**

```bash
docker exec -it broker-1 bash
```

**Output**

If there is no output, the operation is successful.

3.2 Create a partitioned topic named topic-manual with 20 partitions under public/default.

**Input**

```bash
bin/pulsar-admin topics create-partitioned-topic persistent://public/default/topic-manual -p 20
```

**Output**

If there is no output, the operation is successful.

### Step 4. Split bundles

4.1 List all bundles.

**Input**

```bash
bin/pulsar-admin namespaces bundles public/default
```

**Output**

The output shows that the number of bundles is 17.

```bash
{
  "boundaries" : [ "0x00000000", "0x08000000", "0x10000000", "0x20000000", "0x30000000", "0x40000000", "0x50000000", "0x60000000", "0x70000000", "0x80000000", "0x90000000", "0xa0000000", "0xb0000000", "0xc0000000", "0xd0000000", "0xe0000000", "0xf0000000", "0xffffffff" ],
  "numBundles" : 17
}
```

4.2 Specify the range `public/default/0x00000000_0x08000000` to be split.

**Input**

```bash
bin/pulsar-admin namespaces split-bundle --bundle 0x00000000_0x08000000 public/default
```

**Output**

If there is no output, the operation is successful.

:::tip

- The **default** bundle splitting algorithm is `range_equally_divide`. You can change it to other [bundle splitting algorithms](./concepts-broker-load-balancing-concepts.md#bundle-splitting-algorithms) using one of the following methods:

  - Update [defaultNamespaceBundleSplitAlgorithm](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1321C18-L1321C18) in the broker.conf file

  - Use [pulsar-admin namespaces split-bundle](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/namespaces?id=split-bundle)

- For bundle splitting thresholds, you can set more configurations in the broker.conf file. Any existing bundle that exceeds any of the thresholds is a candidate to be split.

:::

:::note

Manual settings will override automatic configurations. For example, `range_equally_divide` is the **default** bundling splitting algorithm, but if you manually set the bundling splitting algorithm to `topic_count_equally_divide`, then `topic_count_equally_divide` is used.

:::

4.3 Verify if the bundle has been split.

**Input**

```bash
bin/pulsar-admin namespaces bundles public/default
```

**Output**

The output shows that the number of bundles is 18 (increased from 17), which means the bundle has been split.

```bash
{
  "boundaries" : [ "0x00000000", "0x04000000", "0x08000000", "0x10000000", "0x20000000", "0x30000000", "0x40000000", "0x50000000", "0x60000000", "0x70000000", "0x80000000", "0x90000000", "0xa0000000", "0xb0000000", "0xc0000000", "0xd0000000", "0xe0000000", "0xf0000000", "0xffffffff" ],
  "numBundles" : 18
}
```

### Step 5. Check ownerships between topics and brokers

Check the ownerships between topics (partitions) and brokers. This step is preparing to verify the result for [Step 6. Unload bundles](#step-6-unload-bundles).

**Input**

```bash
bin/pulsar-admin topics partitioned-lookup persistent://public/default/topic-manual
```

**Output**

The output shows that more partitions belong to the broker 1.

```bash
persistent://public/default/topic-manual-2-partition-0    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-1    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-2    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-3    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-4    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-5    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-6    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-7    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-8    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-9    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-10    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-11    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-12    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-13    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-14    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-15    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-16    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-17    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-18    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-19    pulsar://broker-1:6650
```

### Step 6. Unload bundles

6.1 Unload the bundle range `public/default/0x10000000_0x20000000` and allocate bundles to broker 1.

**Input**

```bash
bin/pulsar-admin namespaces unload public/default -b 0x10000000_0x20000000 -d http://broker-1:8080
```

**Output**

If there is no output, the operation is successful.

6.2 Verify if this range has been unloaded by checking the ownerships between topics (partitions) and brokers.

**Input**

```bash
bin/pulsar-admin topics partitioned-lookup persistent://public/default/topic-manual
```

**Output**

Compared to the result of [Step 5. Check ownerships between topics and brokers](#step-5-check-ownerships-between-topics-and-brokers), the output shows that more partitions belong to the broker 2.

```bash
persistent://public/default/topic-manual-2-partition-0    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-1    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-2    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-3    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-4    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-5    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-6    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-7    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-8    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-9    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-10    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-11    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-12    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-13    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-14    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-15    pulsar://broker-2:6650
persistent://public/default/topic-manual-2-partition-16    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-17    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-18    pulsar://broker-1:6650
persistent://public/default/topic-manual-2-partition-19    pulsar://broker-2:6650
```

## Related topics

- To get a comprehensive understanding and discover the key insights, see [Broker load balancing | Overview](./concepts-broker-load-balancing-overview.md).

- To discover different usage scenarios, see [Broker load balancing | Use cases](./concepts-broker-load-balancing-use-cases.md).

- To explore functionalities, see [Broker load balancing | Features](./concepts-broker-load-balancing-features.md).

- To understand advantages, see [Broker load balancing | Benefits](./concepts-broker-load-balancing-benefits.md).

- To learn essential fundamentals, see [Broker load balancing | Concepts](./concepts-broker-load-balancing-concepts.md).

- To review various versions of broker load balancers, see [Broker load balancing | Types](./concepts-broker-load-balancing-types.md).

- To migrate one broker load balancer type to another, see [Broker load balancing | Migration](./concepts-broker-load-balancing-migration.md).

- To understand design ideas and implementation details of the extensible load balancer, see [PIP-192: New Pulsar Broker Load Balancer](https://github.com/apache/pulsar/issues/16691).
