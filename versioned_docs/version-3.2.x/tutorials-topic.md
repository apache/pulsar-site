---
Id: tutorials-topic
title: How to create a topic
sidebar_label: "Create a topic"
description: Learn how to create a topic in Pulsar.

---


Apache Pulsar is a distributed messaging system that supports high performance and low latency. [Topics](concepts-messaging.md#topics) are the primary way to structure data in Apache Pulsar. Each message in a topic has an offset, which uniquely identifies the message within the topic. 

## Prerequisites
[Publish to partitioned topics](admin-api-topics.md#publish-to-partitioned-topics)

## Create a topic

To create a topic, complete the following steps.

1. Create `test-topic` with 4 partitions in the namespace `apache/pulsar`.

   ```bash
   bin/pulsar-admin topics create-partitioned-topic apache/pulsar/test-topic -p 4
   ```

2. List all the partitioned topics in the namespace `apache/pulsar`.

   ```bash
   bin/pulsar-admin topics list-partitioned-topics apache/pulsar
   ```

#### Related Topics

- [Set up a tenant](tutorials-tenant.md)
- [Create a namespace](tutorials-namespace.md)
- [Produce and consume messages](tutorials-produce-consume.md)








