---
id: deploy-docker
title: Deploy a cluster on Docker
sidebar_label: "Docker"
---

To deploy a Pulsar cluster on Docker using Docker commands, you need to complete the following steps:
1. Pull a Pulsar Docker image.
2. Create a network.
3. Create and start the ZooKeeper, bookie, and broker containers.

## Pull a Pulsar image

To run Pulsar on Docker, you need to create a container for each Pulsar component: ZooKeeper, bookie, and the broker. You can pull the images of ZooKeeper and bookie separately on Docker Hub, and pull the Pulsar image for the broker. You can also pull only one Pulsar image and create three containers with this image. This tutorial takes the second option as an example.

You can pull a Pulsar image from Docker Hub with the following command. If you do not want to use some connectors, you can use `apachepulsar/pulsar:latest` there.
```bash
docker pull apachepulsar/pulsar-all:latest
```

## Create a network

To deploy a Pulsar cluster on Docker, you need to create a network and connect the containers of ZooKeeper, bookie, and broker to this network.
Use the following command to create the network `pulsar`:

```bash
docker network create pulsar
```

## Create and start containers

### Create a ZooKeeper container

Create a ZooKeeper container and start the ZooKeeper service.

```bash
docker run -d -p 2181:2181 --net=pulsar \
    -e metadataStoreUrl=zk:zookeeper:2181 \
    -e cluster-name=cluster-a -e managedLedgerDefaultEnsembleSize=1 \
    -e managedLedgerDefaultWriteQuorum=1 \
    -e managedLedgerDefaultAckQuorum=1 \
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
docker run -d -p 6650:6650 -p 8080:8080 --net=pulsar  -e metadataStoreUrl=zk:zookeeper:2181  -e zookeeperServers=zookeeper:2181 -e clusterName=cluster-a  -e managedLedgerDefaultEnsembleSize=1 -e managedLedgerDefaultWriteQuorum=1   -e managedLedgerDefaultAckQuorum=1 --name broker --hostname broker apachepulsar/pulsar-all:latest bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"
```
