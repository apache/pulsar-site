---
id: reference-terminology
title: Pulsar Terminology
sidebar_label: "Terminology"
description: Get a comprehensive understanding of Pulsar terminologies.
---

Here is a glossary of terms related to Apache Pulsar:

## Concepts

### Pulsar

Pulsar is a distributed messaging system originally created by Yahoo but now under the stewardship of the Apache Software Foundation.

### Namespace Bundle

Namespace bundle is a virtual group of [topics](concepts-messaging.md#topics) that belong to the same [namespace](concepts-multi-tenancy.md#namespaces). A namespace bundle
is defined as a range between two 32-bit hashes, such as 0x00000000 and 0xffffffff.

### Subscription

Subscription is a lease on a [topic](concepts-messaging.md#topics) established by a group of [consumers](concepts-clients.md#consumer). Pulsar has four subscription
modes (exclusive, shared, failover and key_shared).

### Pub-Sub

Pub-sub is a messaging pattern in which [producer](concepts-clients.md#producer) processes publish messages on [topics](concepts-messaging.md#topics) that
are then consumed (processed) by [consumer](concepts-clients.md#consumer) processes.


### Reader

Pulsar readers are message processors much like Pulsar [consumers](concepts-clients.md#consumer) but with two crucial differences:

- you can specify *where* on a topic readers begin processing messages (consumers always begin with the latest
  available unacked message);
- readers don't retain data or acknowledge messages.

### Cursor

Cursor is the subscription position for a [consumer](concepts-clients.md#consumer).

### Unacknowledged

Unacknowledged means a message that has been delivered to a consumer for processing but not yet confirmed as processed by the consumer.

### Retention Policy

Retention policy is the size and time limits that you can set on a [namespace](concepts-multi-tenancy.md#namespaces) to configure retention of [messages](concepts-messaging.md#messages)
that have already been [acknowledged](concepts-messaging.md#acknowledgment).

### Multi-Tenancy

Multi-tenancy is the ability to isolate [namespaces](concepts-multi-tenancy.md#namespaces), specify quotas, and configure authentication and authorization
on a per-[tenant](concepts-multi-tenancy.md#tenants) basis.

### Failure Domain

Failure domain is a logical domain under a Pulsar cluster. Each logical domain contains a pre-configured list of brokers.

### Anti-Affinity Namespaces

Anti-affinity namespaces are a group of namespaces that have anti-affinity to each other.


## Architecture

### Standalone

Standalone is a lightweight Pulsar broker in which all components run in a single Java Virtual Machine (JVM) process. Standalone
clusters can be run on a single machine and are useful for development purposes.

### Topic Lookup

Topic lookup is a service provided by Pulsar [brokers](concepts-architecture-overview.md#brokers) that enables connecting clients to automatically determine
which Pulsar [cluster](concepts-architecture-overview.md#clusters) is responsible for a [topic](concepts-messaging.md#topics) (and thus where message traffic for
the topic needs to be routed).

### Dispatcher

Dispatcher is an asynchronous TCP server used for all data transfers in and out of a Pulsar [broker](concepts-architecture-overview.md#brokers). The Pulsar
dispatcher uses a custom binary protocol for all communications.

## Storage

### Bookie

Bookie is the name of an individual BookKeeper server. It is effectively the storage server of Pulsar.
