---
id: getting-started-docker-compose
title: Run a Pulsar cluster locally with Docker Compose
sidebar_label: "Run Pulsar locally with Docker Compose"
description: Get started with Apache Pulsar on your local machine using Docker Compose.
---

To run Pulsar loccally with Docker Compose, follow the steps below.

## Step 1: Configure the `compose.yml` template

To get up and run a Pulsar cluster quickly, you can use the following template to create a `compose.yml` file by modifying or adding the configurations in the **environment** section.

```yaml
version: '3'
networks:
  pulsar:
    driver: bridge
services:
  # Start zookeeper
  zookeeper:
    image: apachepulsar/pulsar:latest
    container_name: zookeeper
    restart: on-failure
    networks:
      - pulsar
    volumes:
      - ./data/zookeeper:/pulsar/data/zookeeper
    environment:
      - metadataStoreUrl=zk:zookeeper:2181
      - PULSAR_MEM=-Xms256m -Xmx256m -XX:MaxDirectMemorySize=256m
    command: |
      bash -c "bin/apply-config-from-env.py conf/zookeeper.conf && \
             bin/generate-zookeeper-config.sh conf/zookeeper.conf && \
             exec bin/pulsar zookeeper"
    healthcheck:
      test: ["CMD", "bin/pulsar-zookeeper-ruok.sh"]
      interval: 10s
      timeout: 5s
      retries: 30

  # Init cluster metadata
  pulsar-init:
    container_name: pulsar-init
    hostname: pulsar-init
    image: apachepulsar/pulsar:latest
    networks:
      - pulsar
    command: |
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
    image: apachepulsar/pulsar:latest
    container_name: bookie
    restart: on-failure
    networks:
      - pulsar
    environment:
      - clusterName=cluster-a
      - zkServers=zookeeper:2181
      - metadataServiceUri=metadata-store:zk:zookeeper:2181
      # otherwise every time we run docker compose uo or down we fail to start due to Cookie
      # See: https://github.com/apache/bookkeeper/blob/405e72acf42bb1104296447ea8840d805094c787/bookkeeper-server/src/main/java/org/apache/bookkeeper/bookie/Cookie.java#L57-68
      - advertisedAddress=bookie
      - BOOKIE_MEM=-Xms512m -Xmx512m -XX:MaxDirectMemorySize=256m
    depends_on:
      zookeeper:
        condition: service_healthy
      pulsar-init:
        condition: service_completed_successfully
    # Map the local directory to the container to avoid bookie startup failure due to insufficient container disks.
    volumes:
      - ./data/bookkeeper:/pulsar/data/bookkeeper
    command: bash -c "bin/apply-config-from-env.py conf/bookkeeper.conf && exec bin/pulsar bookie"

  # Start broker
  broker:
    image: apachepulsar/pulsar:latest
    container_name: broker
    hostname: broker
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
      - advertisedAddress=broker
      - advertisedListeners=external:pulsar://127.0.0.1:6650
      - PULSAR_MEM=-Xms512m -Xmx512m -XX:MaxDirectMemorySize=256m
    depends_on:
      zookeeper:
        condition: service_healthy
      bookie:
        condition: service_started
    ports:
      - "6650:6650"
      - "8080:8080"
    command: bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"
```

## Step 2: Create a Pulsar cluster

As preparation, create the data directories that the `compose.yml` file will bind-mount into the Pulsar containers.

On Linux, the mounted directories need to be owned by uid `10000` -- the default user inside the Pulsar Docker container -- so the containers can write to them:

```bash
sudo mkdir -p ./data/zookeeper ./data/bookkeeper
sudo chown -R 10000 data
```

:::note macOS and Windows (Docker Desktop)

On macOS and Windows, Docker Desktop runs containers inside a Linux VM and handles uid remapping for bind mounts for you, so the `chown -R 10000` step is not required and running it with `sudo` will typically fail or leave the files in a state that prevents `docker compose up` from starting cleanly (the bookie/zookeeper containers fail with permission errors on `./data/...`).

If you see permission errors on startup, remove the `./data` directory (or reset its ownership to your user) and create it without `chown`:

```bash
mkdir -p ./data/zookeeper ./data/bookkeeper
```

:::

To create a Pulsar cluster by using the `compose.yml` file, run the following command.

```bash
docker compose up -d
```

## Step 3: Destroy the Pulsar cluster

If you want to destroy the Pulsar cluster with all the containers, run the following command. It will also delete the network that the containers are connected to.

```bash
docker compose down
```
