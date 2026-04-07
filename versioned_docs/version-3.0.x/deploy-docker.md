---
id: deploy-docker
title: Deploy a cluster on Docker
sidebar_label: "Docker"
---

To deploy a Pulsar cluster on Docker using Docker commands, you need to complete the following steps:
1. Pull a Pulsar Docker image.
2. Create a network.
3. Create and start the ZooKeeper, bookie, and broker containers.

## Step 1: Pull a Pulsar image

To run Pulsar on Docker, you need to create a container for each Pulsar component: ZooKeeper, bookie, and the broker. You can pull the images of ZooKeeper and bookie separately on Docker Hub, and pull the Pulsar image for the broker. You can also pull only one Pulsar image and create three containers with this image. This tutorial takes the second option as an example.

You can pull a Pulsar image from Docker Hub with the following command. If you do not want to use some connectors, you can use `apachepulsar/pulsar:latest` there.
```bash
docker pull apachepulsar/pulsar-all:latest
```

## Step 2: Create a network

To deploy a Pulsar cluster on Docker, you need to create a network and connect the containers of ZooKeeper, bookie, and broker to this network.
Use the following command to create the network `pulsar`:

```bash
docker network create pulsar
```

## Step 3: Create and start containers

### Create a ZooKeeper container

Create a ZooKeeper container and start the ZooKeeper service.

```bash
docker run -d -p 2181:2181 --net=pulsar \
    -e metadataStoreUrl=zk:zookeeper:2181 \
    -e cluster-name=cluster-a \
    -v $(pwd)/data/zookeeper:/pulsar/data/zookeeper \
    --name zookeeper --hostname zookeeper \
    apachepulsar/pulsar-all:latest \
    bash -c "bin/apply-config-from-env.py conf/zookeeper.conf && bin/generate-zookeeper-config.sh conf/zookeeper.conf && exec bin/pulsar zookeeper"
```

### Initialize the cluster metadata

After creating the ZooKeeper container successfully, you can use the following command to initialize the cluster metadata.

```bash
docker run --net=pulsar \
    --name initialize-pulsar-cluster-metadata \
    apachepulsar/pulsar-all:latest bash -c "bin/pulsar initialize-cluster-metadata \
--cluster cluster-a \
--zookeeper zookeeper:2181 \
--configuration-store zookeeper:2181 \
--web-service-url http://broker:8080 \
--broker-service-url pulsar://broker:6650"
```

### Create a bookie container

Create a bookie container and start the bookie service.

```bash
docker run -d -e clusterName=cluster-a \
    -e zkServers=zookeeper:2181 --net=pulsar \
    -e metadataServiceUri=metadata-store:zk:zookeeper:2181 \
    -v $(pwd)/data/bookkeeper:/pulsar/data/bookkeeper \
    --name bookie --hostname bookie \
    apachepulsar/pulsar-all:latest \
    bash -c "bin/apply-config-from-env.py conf/bookkeeper.conf && exec bin/pulsar bookie"
```

### Create a broker container

Create a broker container and start the broker service.

```bash
docker run -d -p 6650:6650 -p 8080:8080 --net=pulsar \
    -e metadataStoreUrl=zk:zookeeper:2181 \
    -e zookeeperServers=zookeeper:2181 \
    -e clusterName=cluster-a \
    --name broker --hostname broker \
    apachepulsar/pulsar-all:latest \
    bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"
```

## Step 4: Configuration overview

Pulsar Docker images support the following configuration categories:

- **JVM Configuration**: Controls JVM memory allocation and garbage collection for Broker and BookKeeper processes. In Docker, JVM parameters are set via environment variables such as `PULSAR_MEM` and `BOOKIE_MEM`.
- **Broker Configuration** (`broker.conf`): Core runtime parameters for the Pulsar Broker, including metadata store connection, cluster name, ports, and message replication settings.
- **BookKeeper Configuration** (`bookkeeper.conf`): Storage engine parameters for BookKeeper Bookies, including journal and ledger directories, compaction, and disk usage thresholds.
- **Log4j Configuration** (`log4j2.yaml`): Logging framework settings including log levels, output format, and file rolling strategies.
- **Dynamic Configuration**: Some Broker configuration properties can be updated at runtime without restarting the container, using the `pulsar-admin` CLI tool or the Admin REST API.

For a complete list of all available configuration properties, see the [Pulsar Configuration Reference](https://pulsar.apache.org/reference/#/next/).

### How Docker configuration works

Pulsar Docker images include a Python script called `apply-config-from-env.py` that runs before the main process starts. This script reads all environment variables and maps them directly to configuration file properties:

1. If an environment variable name matches a key in the built-in configuration file shipped with the container (e.g., `broker.conf` or `bookkeeper.conf`), the script updates that key's value.
2. Environment variables prefixed with `PULSAR_PREFIX_` are also supported — the prefix is stripped and the remaining name is used as the configuration key. This is useful when the configuration key conflicts with existing system environment variables. Using `PULSAR_PREFIX_` is necessary for configuration keys that aren't available in the shipped configuration files, but are supported by the component (for example, keys available in Pulsar's [ServiceConfiguration](https://github.com/apache/pulsar/blob/master/pulsar-broker-common/src/main/java/org/apache/pulsar/broker/ServiceConfiguration.java)).

For example, setting `-e managedLedgerDefaultEnsembleSize=2` will update the `managedLedgerDefaultEnsembleSize` property in the target configuration file.

### Configuration methods

#### Method 1: Using `-e` environment variables

Pass configuration properties directly as environment variables in the `docker run` command:

```bash
docker run -d \
    -e metadataStoreUrl=zk:zookeeper:2181 \
    -e clusterName=cluster-a \
    -e managedLedgerDefaultEnsembleSize=2 \
    -e managedLedgerDefaultWriteQuorum=2 \
    -e managedLedgerDefaultAckQuorum=2 \
    apachepulsar/pulsar-all:latest \
    bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"
```

#### Method 2: Using `--env-file` for batch loading

For a large number of configuration properties, use an environment file to keep your `docker run` command clean:

```bash
docker run -d --env-file ./broker-config.env \
    apachepulsar/pulsar-all:latest \
    bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"
```

Example `broker-config.env` file:

```properties
metadataStoreUrl=zk:zookeeper:2181
clusterName=cluster-a
managedLedgerDefaultEnsembleSize=2
managedLedgerDefaultWriteQuorum=2
managedLedgerDefaultAckQuorum=2
PULSAR_MEM=-Xms4g -Xmx4g -XX:MaxDirectMemorySize=8g
```

#### Method 3: Using Docker Volume to mount custom configuration files

You can mount a custom configuration file from the host into the container, bypassing the environment variable mechanism entirely:

```bash
docker run -d \
    -e PULSAR_MEM="-Xms4g -Xmx4g -XX:MaxDirectMemorySize=8g" \
    -v $(pwd)/my-broker.conf:/pulsar/conf/broker.conf \
    apachepulsar/pulsar-all:latest \
    bin/pulsar broker
```

### Common configuration examples

Below are examples of commonly used configuration properties for BookKeeper and Broker containers. You can add more `-e` flags to the `docker run` command shown in [Step 3](#step-3-create-and-start-containers) to customize the behavior.

#### BookKeeper

```bash
docker run -d -e clusterName=cluster-a \
    -e zkServers=zookeeper:2181 --net=pulsar \
    -e metadataServiceUri=metadata-store:zk:zookeeper:2181 \
    # Storage directories: journal for write-ahead logs, ledgers for actual message data
    -e journalDirectory=/pulsar/data/bookkeeper/journal \
    -e ledgerDirectories=/pulsar/data/bookkeeper/ledgers \
    # Disk usage thresholds: bookie will reject writes when usage exceeds these limits
    -e diskUsageThreshold=0.95 \
    -e diskUsageWarnThreshold=0.90 \
    -e diskUsageLwmThreshold=0.87 \
    # GC and Compaction: reclaim disk space by removing unused ledger data
    -e gcWaitTime=900000 \
    -e minorCompactionThreshold=0.2 \
    -e minorCompactionInterval=3600 \
    -e majorCompactionThreshold=0.5 \
    -e majorCompactionInterval=86400 \
    # JVM memory
    -e BOOKIE_MEM="-Xms4g -Xmx4g -XX:MaxDirectMemorySize=4g" \
    # Extra JVM options: appended to JVM flags in the startup script, can override default JVM parameters
    -e BOOKIE_EXTRA_OPTS="-XX:+ExitOnOutOfMemoryError" \
    # Volume mounts: if possible, use separate physical disks for journal and ledger to improve read/write performance
    -v $(pwd)/data/bookkeeper/journal:/pulsar/data/bookkeeper/journal \
    -v $(pwd)/data/bookkeeper/ledgers:/pulsar/data/bookkeeper/ledgers \
    --name bookie --hostname bookie \
    apachepulsar/pulsar-all:latest \
    bash -c "bin/apply-config-from-env.py conf/bookkeeper.conf && exec bin/pulsar bookie"
```

#### Broker

```bash
docker run -d -p 6650:6650 -p 8080:8080 --net=pulsar \
    -e metadataStoreUrl=zk:zookeeper:2181 \
    -e zookeeperServers=zookeeper:2181 \
    -e clusterName=cluster-a \
    # Ensemble settings: control how messages are replicated across bookies (must not exceed the number of deployed bookies)
    -e managedLedgerDefaultEnsembleSize=2 \
    -e managedLedgerDefaultWriteQuorum=2 \
    -e managedLedgerDefaultAckQuorum=1 \
    # Ports: binary protocol port and HTTP admin port
    -e brokerServicePort=6650 \
    -e webServicePort=8080 \
    # JVM memory
    -e PULSAR_MEM="-Xms4g -Xmx4g -XX:MaxDirectMemorySize=8g" \
    # Extra JVM options: appended to JVM flags in the startup script, can override default JVM parameters
    -e PULSAR_EXTRA_OPTS="-Dio.netty.allocator.maxOrder=13 -Dio.netty.allocator.numDirectArenas=8 -Dio.netty.allocator.maxCachedBufferCapacity=1048576" \
    --name broker --hostname broker \
    apachepulsar/pulsar-all:latest \
    bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"
```

:::tip

You can also refer to the default configuration in the [Pulsar Helm Chart values.yaml](https://github.com/apache/pulsar-helm-chart/blob/master/charts/pulsar/values.yaml) as a tuning reference.

:::
