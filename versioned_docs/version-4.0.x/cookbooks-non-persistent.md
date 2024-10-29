---
id: cookbooks-non-persistent
title: Non-persistent messaging
sidebar_label: "Non-persistent messaging"
description: Get a comprehensive understanding of concepts, usage methods and management methods of non-persistent messaging in Pulsar.
---

This cookbook provides:

* A basic [conceptual overview](#overview) of non-persistent topics
* Information about [configurable parameters](#configuration-for-standalone-mode) related to non-persistent topics
* A guide to the [CLI interface](#manage-with-cli) for managing non-persistent topics

## Overview

By default, Pulsar persistently stores *all* unacknowledged messages on multiple bookies (storage nodes). Data for messages on persistent topics can thus survive broker restarts and subscriber failover.

Pulsar also, however, supports **non-persistent topics**, which are topics on which messages are *never* persisted to disk and live only in memory. When using non-persistent delivery, killing a Pulsar [broker](reference-terminology.md#broker) or disconnecting a subscriber to a topic means that all in-transit messages are lost on that (non-persistent) topic, meaning that clients may see message loss.

Non-persistent topics have names of this form (note the `non-persistent` in the name):

```http
non-persistent://tenant/namespace/topic
```

> For more high-level information about non-persistent topics, see the [Concepts and Architecture](concepts-messaging.md#non-persistent-topics) documentation.

## Use

To use non-persistent topics, you need to [enable](#enable) them in your Pulsar broker configuration and differentiate them by name when interacting with them. This [`pulsar-client produce`](reference-cli-tools.md) command, for example, would produce one message on a non-persistent topic in a standalone cluster:

```bash
bin/pulsar-client produce non-persistent://public/default/example-np-topic \
  --num-produce 1 \
  --messages "This message will be stored only in memory"
```

> For a more thorough guide to non-persistent topics from an administrative perspective, see the [Non-persistent topics](admin-api-topics.md) guide.

## Enable

To enable non-persistent topics in a Pulsar broker, the [`enableNonPersistentTopics`](reference-configuration.md#broker-enableNonPersistentTopics) must be set to `true`. This is the default, so you won't need to take any action to enable non-persistent messaging.


> #### Configuration for standalone mode
> If you're running Pulsar in standalone mode, the same configurable parameters are available but in the [`standalone.conf`](reference-configuration.md#standalone) configuration file.

If you'd like to enable *only* non-persistent topics in a broker, you can set the [`enablePersistentTopics`](reference-configuration.md#broker-enablePersistentTopics) parameter to `false` and the `enableNonPersistentTopics` parameter to `true`.

## Manage with cli

Non-persistent topics can be managed using the [`pulsar-admin non-persistent`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/topics?id=topics) command-line interface. With that interface, you can perform actions like [create a partitioned non-persistent topic](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/topics?id=create-partitioned-topic), [get stats](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/topics?id=stats) for a non-persistent topic, [list](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/topics?id=list-partitioned-topics) non-persistent topics under a namespace, and more.

## Use with Pulsar clients

You shouldn't need to make any changes to your Pulsar clients to use non-persistent messaging beyond making sure that you use proper [topic names](#use) with `non-persistent` as the topic type.

