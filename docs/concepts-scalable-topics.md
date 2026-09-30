---
id: concepts-scalable-topics
title: Scalable topics
sidebar_label: "Overview"
description: Understand scalable topics (Topics v5), the topic type that grows and shrinks at runtime by splitting and merging key-range segments.
---

A **scalable topic** is a topic that adjusts its own capacity at runtime. Instead of being created with a fixed number of partitions, it is internally divided into key-range **segments** that the broker splits when load grows and merges when load drops -- with no downtime or application routing changes. Ordered consumers preserve per-key ordering across these changes. A scalable topic is addressed with the `topic://` scheme:

```
topic://tenant/namespace/name
```

:::note

Scalable topics are the recommended choice for **new applications** that meet the [requirements and limitations](#requirements). The existing [partitioned and non-partitioned topics](concepts-messaging.md#topics) (v4 topics) remain fully supported and are the right choice for existing applications and for clients that do not yet support the v5 API. See [When to use which](#when-to-use-which) below.

:::

## Why scalable topics

Classic partitioned topics scale by fixing a partition count when the topic is created. That model has three structural limits:

- **You must size capacity explicitly.** The initial partition count is chosen before you know the real traffic, and increasing it requires an administrative operation.
- **You cannot scale down.** A partitioned topic's partition count can be increased but never decreased, so a topic provisioned for a traffic spike stays oversized forever.
- **Resizing can break key ordering.** With routing based on `hash(key) % partitionCount`, changing the partition count can remap keys to different partitions. Consumers may read newer messages from the new partition before older messages from the old partition.

Scalable topics remove all three limits: capacity tracks load automatically in both directions, and per-key ordering is preserved across every resize.

## How it works

Internally, a scalable topic spreads the hash key space across a set of **segments**. Each segment owns a contiguous range of the key space and is backed by its own internal topic. Together the segments form a directed acyclic graph (DAG) that records how ranges have been split and merged over time.

- **Split.** When a segment gets hot, the controller splits its key range in two and hands each half to a new child segment. This raises parallelism for exactly the part of the key space that is under load.
- **Merge.** When adjacent segments go cold, the controller merges their ranges back into one, reclaiming capacity.
- **Range-based key routing.** A message key is mapped to whichever segment currently owns its hash range. A split or merge moves it to a successor range that still contains it. Ordered consumers drain predecessor data before consuming the corresponding successor data, preserving per-key order across the change.

This split/merge activity is driven by a per-topic **controller** in the broker and is **automatic by default**; you can also trigger splits and merges manually. The segment topology is managed entirely on the server and pushed to clients as it changes, so applications never see segments or have to react to resizing. To an application, a scalable topic is just a single stream.

### Entry buckets and consumer parallelism

A segment can serve several stream or checkpoint consumers without creating more physical segments. Within a segment, messages are grouped into **entry buckets** by key hash. The controller assigns these buckets to consumers in the same group, and the broker hands a bucket from one consumer to another only after the previous owner has drained it. This provides key-shared consumption while preserving per-key ordering.

By default, a new topic has an entry-bucket budget of four, distributed across its initial segments, with at least one bucket per segment. A one-segment topic therefore starts with four buckets. The bucket count is a limit on useful consumer parallelism within a segment; adding consumers beyond the available buckets can leave consumers idle.

When more stream consumers or grouped checkpoint consumers join, automatic scaling chooses between splitting a segment and increasing its bucket count. If the busiest segment receives at least 1,000 messages/second and the topic is below its segment limit, it can split. Otherwise, it can **rebucket**: seal a segment and create a successor covering the same key range with more buckets. The predecessor drains before its successor is consumed. Automatic rebucketing increases bucket counts; it does not reduce them when consumers leave.

These defaults and the split/merge thresholds are configurable. See [Configure auto split/merge](admin-api-scalable-topics.md#configure-auto-splitmerge).

## Scalable vs. partitioned topics

| | Partitioned topic (v4) | Scalable topic |
|---|---|---|
| Unit of parallelism | Fixed partition count, set at creation | Segments and entry buckets; capacity changes at runtime |
| Scale up | Increase partition count (manual) | Automatic split of hot segments |
| Scale down | Not possible | Automatic merge of cold segments |
| Key routing | `hash(key) % partitionCount` | Range-based hash assignment |
| Key ordering when resized | Keys can remap across partitions | Preserved across split and merge for ordered consumers |
| Topology visible to the app | Partition count and indexes are exposed | Opaque; managed by the broker |
| Client | Any Pulsar client | A client with [v5 API](#requirements) support |

## Consumer model

Scalable topics use the v5 client API, which replaces the four v4 subscription types (Exclusive, Failover, Shared, Key_Shared) with three purpose-built consumers:

- **Stream consumer** -- ordered consumption with cumulative acknowledgment, for log-style processing where order matters. The controller distributes segments and entry buckets across consumers in the subscription. Use this for ordered or key-shared processing.
- **Queue consumer** -- parallel consumption with individual acknowledgment, negative acknowledgment, and dead-letter handling, for work-queue style fan-out. It uses shared dispatch across consumers and does not guarantee per-key order.
- **Checkpoint consumer** -- no subscription and no acknowledgment; the application tracks its own position with a serializable checkpoint. Designed for stream-processing engines such as Flink and Spark that manage their own offsets.

Each consumer type is covered in detail in the [Java v5 client documentation](pathname:///docs/client-libraries/java-v5).

## When to use which

- **New applications** -- prefer scalable topics when the [requirements and limitations](#requirements) fit your application. You get automatic right-sizing and you never have to pick a partition count.
- **Existing applications** -- keep using v4 partitioned and non-partitioned topics. They are fully supported, and there is no requirement to migrate. When you are ready, an existing topic can be migrated in place to a scalable topic without copying data.
- **Clients without v5 support** -- use v4 topics. Scalable topics require a client SDK that supports the v5 API (see below).

## Requirements and limitations {#requirements}

- **A v5-capable client SDK.** Scalable topics are served through the v5 client API; clients using the v4 API are rejected when they address a `topic://`. The Java v5 client supports scalable topics. Check the documentation for an independently released language SDK before assuming it supports the v5 API.
- **Scalable topics enabled on the brokers.** `scalableTopicsEnabled` defaults to `true`. Setting it to `false` requires a broker restart and disables scalable-topic services, admin APIs, and client access. Existing scalable-topic data is retained but cannot be loaded while disabled. This switch is separate from disabling automatic scaling.
- **A supported Pulsar metadata store.** Scalable topics use the metadata store for their layout, controller election, and consumer coordination. ZooKeeper and [Oxia](administration-metadata-store.md#use-oxia-as-metadata-store) are supported; moving to Oxia is not a prerequisite for using scalable topics.
- **Geo-replication and replicated subscriptions are not supported for scalable topics.** Configuring replication clusters on the namespace does not replicate its scalable-topic segments. Use v4 topics for applications that require these features.
- **Ordering depends on the consumer model.** Stream and checkpoint consumers preserve per-key ordering across layout changes. Queue consumers provide shared work distribution. Splitting or rebucketing cannot parallelize processing of a single key while preserving that key's order.

## Retention across layout changes

Splits, merges, rebucketing, and migration leave sealed predecessor segments in the DAG so consumers can drain their existing messages. The controller removes a sealed segment only after its retention time has elapsed and all known subscriptions have drained it. Retention time is resolved from the parent topic's policy, then the namespace policy, then the broker default. Negative retention time retains sealed segments indefinitely.

Checkpoint consumers store their positions externally and do not hold a durable subscription backlog. Configure retention to cover the period during which those consumers may need to restore a checkpoint or replay data.

## Next steps

- Create, inspect, and tune topics: [Manage scalable topics](admin-api-scalable-topics.md).
- Configure metadata: [Configure metadata store](administration-metadata-store.md) and [Migrate metadata store from ZooKeeper to Oxia](administration-metadata-store-migration.md).
- Learn the v4 topic model for comparison: [Messaging concepts -- Topics](concepts-messaging.md#topics).
