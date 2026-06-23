---
id: getting-started-docker-compose
title: Run a Pulsar cluster locally with Docker Compose
sidebar_label: "Run Pulsar locally with Docker Compose"
description: Get started with Apache Pulsar on your local machine using Docker Compose.
---

To run Pulsar locally with Docker Compose, follow the steps below.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10+ recommended)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+ recommended)
- At least 8GB of available RAM for the cluster
- At least 10GB of free disk space

## Step 1: Configure the `compose.yml` template

To get up and run a Pulsar cluster quickly, you can use the following template to create a `compose.yml` file by modifying or adding the configurations in the **environment** section.

This cluster uses [Oxia](https://github.com/oxia-db/oxia) as its [metadata store](administration-metadata-store.md) — the recommended option for new Pulsar clusters. Oxia standalone serves a single `default` namespace, which both Pulsar and BookKeeper use here; production clusters use separate Oxia namespaces (see [Configure metadata store](administration-metadata-store.md#use-oxia-as-metadata-store)).

```yaml
version: '3'
networks:
  pulsar:
    driver: bridge
services:
  # Start Oxia (metadata store)
  oxia:
    image: oxia/oxia:latest
    container_name: oxia
    restart: on-failure
    networks:
      - pulsar
    volumes:
      - oxia-data:/data
    command:
      - oxia
      - standalone
    healthcheck:
      test: ["CMD", "oxia", "health", "--port=6648"]
      interval: 10s
      timeout: 5s
      retries: 30

  # Init cluster metadata
  pulsar-init:
    container_name: pulsar-init
    hostname: pulsar-init
    image: apachepulsar/pulsar:@pulsar:version@
    networks:
      - pulsar
    command:
      - bash
      - -c
      - |
        bin/pulsar initialize-cluster-metadata \
        --cluster cluster-a \
        --metadata-store oxia://oxia:6648/default \
        --configuration-store oxia://oxia:6648/default \
        --web-service-url http://broker:8080 \
        --broker-service-url pulsar://broker:6650
    depends_on:
      oxia:
        condition: service_healthy

  # Start bookie
  bookie:
    image: apachepulsar/pulsar:@pulsar:version@
    container_name: bookie
    restart: on-failure
    networks:
      - pulsar
    environment:
      - clusterName=cluster-a
      - metadataServiceUri=metadata-store:oxia://oxia:6648/default
      - advertisedAddress=bookie
      - BOOKIE_MEM=-Xms512m -Xmx512m -XX:MaxDirectMemorySize=256m
    depends_on:
      oxia:
        condition: service_healthy
      pulsar-init:
        condition: service_completed_successfully
    volumes:
      - bookie-data:/pulsar/data/bookkeeper
    command: bash -c "bin/apply-config-from-env.py conf/bookkeeper.conf && exec bin/pulsar bookie"

  # Start broker
  broker:
    image: apachepulsar/pulsar:@pulsar:version@
    container_name: broker
    hostname: broker
    restart: on-failure
    networks:
      - pulsar
    environment:
      - metadataStoreUrl=oxia://oxia:6648/default
      - clusterName=cluster-a
      - managedLedgerDefaultEnsembleSize=1
      - managedLedgerDefaultWriteQuorum=1
      - managedLedgerDefaultAckQuorum=1
      - advertisedAddress=broker
      - advertisedListeners=external:pulsar://127.0.0.1:6650
      - PULSAR_MEM=-Xms512m -Xmx512m -XX:MaxDirectMemorySize=256m
    depends_on:
      oxia:
        condition: service_healthy
      bookie:
        condition: service_started
    ports:
      - "6650:6650"
      - "8080:8080"
    command: bash -c "bin/apply-config-from-env.py conf/broker.conf && exec bin/pulsar broker"

volumes:
  oxia-data:
  bookie-data:
```

## Step 2: Create a Pulsar cluster

To create a Pulsar cluster by using the `compose.yml` file, run the following command.

```bash
docker compose up -d
```

:::note

This cluster persists its metadata and message data in named Docker volumes (`oxia-data` and `bookie-data`), so it survives `docker compose down` and `docker compose up`. To wipe the data and start completely fresh, run `docker compose down -v`.

:::

## Step 3: Destroy the Pulsar cluster

If you want to destroy the Pulsar cluster with all the containers, run the following command. The `-v` flag also removes the named volumes (the cluster's data), and the network that the containers are connected to.

```bash
docker compose down -v
```
