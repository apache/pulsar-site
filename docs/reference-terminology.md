---
id: reference-terminology
title: Pulsar Terminology
sidebar_label: "Terminology"
---

Here is a glossary of terms related to Apache Pulsar:

## Concepts

### Pulsar

Pulsar is a distributed messaging system originally created by Yahoo but now under the stewardship of the Apache Software Foundation.

### Namespace Bundle

A virtual group of [topics](#topic) that belong to the same [namespace](#namespace). A namespace bundle
is defined as a range between two 32-bit hashes, such as 0x00000000 and 0xffffffff.

### Pub-Sub

A messaging pattern in which [producer](#producer) processes publish messages on [topics](#topic) that
are then consumed (processed) by [consumer](#consumer) processes.


### Reader

Pulsar readers are message processors much like Pulsar [consumers](#consumer) but with two crucial differences:

- you can specify *where* on a topic readers begin processing messages (consumers always begin with the latest
  available unacked message);
- readers don't retain data or acknowledge messages.

### Cursor

The subscription position for a [consumer](#consumer).

### Unacknowledged

A message that has been delivered to a consumer for processing but not yet confirmed as processed by the consumer.

### Retention Policy

Size and time limits that you can set on a [namespace](#namespace) to configure retention of [messages](#message)
that have already been [acknowledged](#acknowledgment-ack).

### Multi-Tenancy

The ability to isolate [namespaces](#namespace), specify quotas, and configure authentication and authorization
on a per-[tenant](#tenant) basis.

### Failure Domain

A logical domain under a Pulsar cluster. Each logical domain contains a pre-configured list of brokers.

### Anti-affinity Namespaces

A group of namespaces that have anti-affinity to each other.


## Architecture

### Standalone

A lightweight Pulsar broker in which all components run in a single Java Virtual Machine (JVM) process. Standalone
clusters can be run on a single machine and are useful for development purposes.

### Instance

A group of Pulsar [clusters](#cluster) that act together as a single unit.

### Geo-Replication

Replication of messages across Pulsar [clusters](#cluster), potentially in different datacenters
or geographical regions.

### Topic Lookup

A service provided by Pulsar [brokers](#broker) that enables connecting clients to automatically determine
which Pulsar [cluster](#cluster) is responsible for a [topic](#topic) (and thus where message traffic for
the topic needs to be routed).

### Dispatcher

An asynchronous TCP server used for all data transfers in and out of a Pulsar [broker](#broker). The Pulsar
dispatcher uses a custom binary protocol for all communications.

## Storage

### Bookie

Bookie is the name of an individual BookKeeper server. It is effectively the storage server of Pulsar.
