---
id: concepts-scalable-topics
title: Scalable topics
sidebar_label: "Overview"
description: Understand scalable topics (Topics v5), the topic type that grows and shrinks at runtime by splitting and merging key-range segments.
---

A **scalable topic** is a topic that adjusts its own capacity at runtime. Instead of being created with a fixed number of partitions, it is internally divided into key-range **segments** that the broker splits when load grows and merges when load drops -- with no downtime, no client changes, and no loss of per-key ordering. A scalable topic is addressed with the `topic://` scheme:

```
topic://tenant/namespace/name
```

:::note

Scalable topics are the recommended choice for **new applications**. Classic [partitioned and non-partitioned topics](concepts-messaging.md#topics) remain fully supported and are the right choice for existing applications and for clients that do not yet support the V5 API. See [When to use which](#when-to-use-which) below.

:::

## Why scalable topics

Classic partitioned topics scale by fixing a partition count when the topic is created. That model has three structural limits:

- **You must guess the right size upfront.** The partition count is chosen before you know the real traffic, and it bounds the maximum consumer parallelism for the life of the topic.
- **You cannot scale down.** A partitioned topic's partition count can be increased but never decreased, so a topic provisioned for a traffic spike stays oversized forever.
- **Resizing breaks key ordering.** Because messages are routed by `hash(key) % partitionCount`, changing the partition count remaps keys to different partitions, breaking the per-key ordering guarantee.

Scalable topics remove all three limits: capacity tracks load automatically in both directions, and per-key ordering is preserved across every resize.

## How it works

Internally, a scalable topic spreads the hash key space across a set of **segments**. Each segment owns a contiguous range of the key space and is backed by its own internal topic. Together the segments form a directed acyclic graph (DAG) that records how ranges have been split and merged over time.

- **Split.** When a segment gets hot, the controller splits its key range in two and hands each half to a new child segment. This raises parallelism for exactly the part of the key space that is under load.
- **Merge.** When adjacent segments go cold, the controller merges their ranges back into one, reclaiming capacity.
- **Range-based key routing.** A message key is mapped to whichever segment currently owns its hash range. Because routing is by *range* rather than by `hash(key) % N`, a split or merge only ever moves a key from a parent range to a child range that still contains it -- so the ordering of any individual key is never broken.

This split/merge activity is driven by a per-topic **controller** in the broker and is **automatic by default**; you can also trigger splits and merges manually. The segment topology is managed entirely on the server and pushed to clients as it changes, so applications never see segments or have to react to resizing. To an application, a scalable topic is just a single stream.

## Scalable vs. partitioned topics

| | Partitioned topic (classic) | Scalable topic |
|---|---|---|
| Unit of parallelism | Fixed partition count, set at creation | Segments; count changes at runtime |
| Scale up | Increase partition count (manual) | Automatic split of hot segments |
| Scale down | Not possible | Automatic merge of cold segments |
| Key routing | `hash(key) % partitionCount` | Range-based hash assignment |
| Key ordering when resized | Broken (keys remap across partitions) | Preserved across split and merge |
| Topology visible to the app | Partition count and indexes are exposed | Opaque; managed by the broker |
| Client | Any Pulsar client | A client with [V5 API](#requirements) support |

## Consumer model

Scalable topics use the V5 client API, which replaces the four classic subscription types (Exclusive, Failover, Shared, Key_Shared) with three purpose-built consumers:

- **Stream consumer** -- ordered consumption with cumulative acknowledgment, for log-style processing where order matters. Replaces Exclusive and Failover.
- **Queue consumer** -- parallel consumption with individual acknowledgment, negative acknowledgment, and dead-letter handling, for work-queue style fan-out. Replaces Shared and Key_Shared.
- **Checkpoint consumer** -- no subscription and no acknowledgment; the application tracks its own position with a serializable checkpoint. Designed for stream-processing engines such as Flink and Spark that manage their own offsets.

Each consumer type is covered in detail in the V5 client documentation.

## When to use which

- **New applications** -- prefer scalable topics. You get automatic right-sizing and you never have to pick a partition count.
- **Existing applications** -- keep using classic partitioned and non-partitioned topics. They are fully supported, and there is no requirement to migrate. When you are ready, an existing topic can be migrated in place to a scalable topic without copying data.
- **Clients without V5 support** -- use classic topics. Scalable topics require a client SDK that supports the V5 API (see below).

## Requirements

- **A V5-capable client SDK.** Scalable topics are served through the V5 client API; clients using the classic API are rejected when they address a `topic://`. The Java V5 client supports scalable topics today, with the other language SDKs following.
- **A metadata store with streaming watch support.** [Oxia](administration-metadata-store.md#use-oxia-as-metadata-store) is recommended, because the controller pushes topology changes to clients through streaming watches that Oxia supports natively. If you are still on ZooKeeper, see [Migrate metadata store](administration-metadata-store-migration.md).

## Next steps

- Configure metadata: [Configure metadata store](administration-metadata-store.md) and [Migrate metadata store from ZooKeeper to Oxia](administration-metadata-store-migration.md).
- Learn the classic topic model for comparison: [Messaging concepts -- Topics](concepts-messaging.md#topics).
