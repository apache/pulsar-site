---
id: admin-api-scalable-topics
title: Manage scalable topics
sidebar_label: "Administration"
description: Create, inspect, migrate, and manage scalable topics with pulsar-admin, the REST API, or the Java admin client.
---

:::note

For the concepts behind this feature, see [Scalable topics](concepts-scalable-topics.md).

:::

This page covers administering scalable topics. To **produce and consume**, use a client with [V5 API support](concepts-scalable-topics.md#requirements); this page is about creating and operating the topics themselves.

Every operation is available three ways: the `pulsar-admin scalable-topics` CLI, the REST API under `/admin/v2/scalable`, and the Java admin client (`PulsarAdmin.scalableTopics()`). The examples below lead with the CLI; the [REST API reference](#rest-api-reference) lists every endpoint.

In the commands below, a topic is identified by its `tenant/namespace/topic` name (without a URL scheme).

## Create a scalable topic

A scalable topic is created with an initial number of segments. Start small -- one segment is the default -- and let [auto split/merge](concepts-scalable-topics.md#how-it-works) grow it to fit the load.

```shell
bin/pulsar-admin scalable-topics create my-tenant/my-namespace/my-topic --segments 1
```

| Option | Description | Default |
|--------|-------------|---------|
| `-s`, `--segments` | Number of initial segments | `1` |
| `-p`, `--property` | A `key=value` property; repeat for multiple | -- |

Java admin client:

```java
admin.scalableTopics().createScalableTopic("my-tenant/my-namespace/my-topic", 1);
```

## List scalable topics

List every scalable topic in a namespace:

```shell
bin/pulsar-admin scalable-topics list my-tenant/my-namespace
```

Filter to topics carrying specific properties (repeat `-p` to AND multiple filters):

```shell
bin/pulsar-admin scalable-topics list my-tenant/my-namespace -p team=ingest -p tier=gold
```

## Inspect a scalable topic

Get the topic metadata -- the segment DAG, including each segment's hash range and state:

```shell
bin/pulsar-admin scalable-topics get-metadata my-tenant/my-namespace/my-topic
```

Get aggregated runtime stats:

```shell
bin/pulsar-admin scalable-topics stats my-tenant/my-namespace/my-topic
```

## Manage subscriptions

Scalable-topic subscriptions span every segment in the DAG. The admin commands operate on the subscription as a whole.

Reset a subscription to a point in the past (the offset is relative to now -- accepts units such as `30m`, `1h`, `5d`):

```shell
bin/pulsar-admin scalable-topics seek my-tenant/my-namespace/my-topic \
  --subscription my-sub --time 1h
```

Skip all undelivered messages on a subscription, across every segment:

```shell
bin/pulsar-admin scalable-topics clear-backlog my-tenant/my-namespace/my-topic \
  --subscription my-sub
```

## Split and merge segments

Splitting a hot segment and merging cold adjacent segments normally happens **automatically** (see [auto split/merge](concepts-scalable-topics.md#how-it-works)). The commands below let you trigger them manually -- for testing, or to pre-scale ahead of a known traffic event.

Split one segment into two halves of its hash range:

```shell
bin/pulsar-admin scalable-topics split-segment my-tenant/my-namespace/my-topic --segment-id 3
```

Merge two adjacent segments back into one:

```shell
bin/pulsar-admin scalable-topics merge-segments my-tenant/my-namespace/my-topic \
  --segment-id-1 3 --segment-id-2 4
```

Segment IDs come from `get-metadata`. Merging requires the two segments to own adjacent hash ranges.

## Configure auto split/merge

Auto split/merge is **on by default**: each topic's controller splits any segment whose load crosses the split thresholds and merges adjacent segments that stay cold below the merge thresholds. It is configured at three levels, and the most specific value wins **per setting**:

1. **Broker defaults** in `broker.conf` (cluster-wide).
2. **Per-namespace override**.
3. **Per-topic override**.

An override only sets the fields it changes; unset fields inherit from the level above.

### Broker defaults (`broker.conf`)

| Setting | Description | Default |
|---------|-------------|---------|
| `scalableTopicAutoScaleEnabled` | Master switch for auto split/merge. When `false`, segments change only via manual `split-segment` / `merge-segments`. | `true` |
| `scalableTopicMaxSegments` | Hard ceiling on active segments; splits stop once reached. | `64` |
| `scalableTopicMinSegments` | Hard floor on active segments; merges stop once reached. | `1` |
| `scalableTopicMaxDagDepth` | Maximum merges in a segment's lineage; bounds split/merge flip-flopping (limits merges only -- splits are unaffected). | `10` |
| `scalableTopicSplitCooldownSeconds` | Minimum time between automatic splits on a topic (short -- only coalesces a burst of near-simultaneous triggers). | `60` |
| `scalableTopicMergeCooldownSeconds` | Minimum time between automatic merges on a topic. | `300` |
| `scalableTopicMergeWindowSeconds` | How long a segment must stay continuously below every merge threshold before it becomes merge-eligible. | `300` |
| `scalableTopicSplitMsgRateInThreshold` | Inbound messages/second above which a segment is split. | `10000` |
| `scalableTopicSplitBytesRateInThreshold` | Inbound bytes/second above which a segment is split. | `50000000` (50 MB/s) |
| `scalableTopicSplitMsgRateOutThreshold` | Outbound (dispatched) messages/second above which a segment is split. | `50000` |
| `scalableTopicSplitBytesRateOutThreshold` | Outbound bytes/second above which a segment is split. | `250000000` (250 MB/s) |
| `scalableTopicMergeMsgRateInThreshold` | Inbound messages/second below which a segment counts as cold for merging. | `1000` |
| `scalableTopicMergeBytesRateInThreshold` | Inbound bytes/second below which a segment counts as cold. | `5000000` (5 MB/s) |
| `scalableTopicMergeMsgRateOutThreshold` | Outbound messages/second below which a segment counts as cold. | `5000` |
| `scalableTopicMergeBytesRateOutThreshold` | Outbound bytes/second below which a segment counts as cold. | `25000000` (25 MB/s) |
| `scalableTopicAutoScaleIntervalSeconds` | Cadence of the controller's periodic traffic-driven evaluation. Consumer-count changes are handled immediately, independent of this interval. | `60` |
| `scalableTopicLoadReportIntervalSeconds` | How often a segment-owning broker samples segment load for auto-scaling. | `10` |
| `scalableTopicLoadReportRateChangeThreshold` | Minimum relative change in a segment's rate (`0.25` = 25%) since the last report that triggers a new load record; bounds metadata write volume. | `0.25` |

:::tip

Split thresholds sit well above the corresponding merge thresholds on purpose -- the gap between them is the hysteresis that stops a just-split segment from immediately re-merging. Preserve that ordering when you tune them.

Most of these settings are dynamic: apply them at runtime with `pulsar-admin brokers update-dynamic-config` without restarting. The two read only at broker startup are `scalableTopicAutoScaleIntervalSeconds` and `scalableTopicLoadReportIntervalSeconds`.

:::

### Per-namespace and per-topic overrides

Both override levels use the same fields as the broker settings (each optional; unset means inherit): `enabled`, `maxSegments`, `minSegments`, `maxDagDepth`, `splitCooldownSeconds`, `mergeCooldownSeconds`, `mergeWindowSeconds`, and the eight `split*`/`merge*` rate thresholds.

Overrides are set through the Java admin client or REST -- there is no `pulsar-admin` subcommand for them yet:

```java
AutoScalePolicyOverride override = AutoScalePolicyOverride.builder()
        .maxSegments(128)
        .splitMsgRateInThreshold(20_000.0)
        .build();

// Namespace level -- applies to every scalable topic in the namespace
admin.namespaces().setScalableTopicAutoScalePolicy("my-tenant/my-namespace", override);

// Topic level -- narrowest scope, wins over namespace and broker
admin.scalableTopics().setAutoScalePolicy("my-tenant/my-namespace/my-topic", override);
```

Read or clear an override with the matching `getScalableTopicAutoScalePolicy` / `removeScalableTopicAutoScalePolicy` (namespace) and `getAutoScalePolicy` / `removeAutoScalePolicy` (topic) methods.

### Disable auto-scaling

To run a topic with manual split/merge only, set `scalableTopicAutoScaleEnabled=false` cluster-wide, or apply an override with `enabled=false` at the namespace or topic level. The controller then leaves the layout untouched and you drive it with `split-segment` / `merge-segments`.

## Migrate a regular topic

An existing partitioned or non-partitioned topic can be migrated in place to a scalable topic, with no data copy:

```shell
bin/pulsar-admin scalable-topics migrate my-tenant/my-namespace/my-topic
```

The migration is rejected if legacy (non-V5) clients are still connected, unless you pass `--force`. Migration is **one-way** -- a scalable topic cannot be converted back. A full walkthrough, including the recommended sequence for upgrading clients first, is covered in the migration guide.

## Delete a scalable topic

```shell
bin/pulsar-admin scalable-topics delete my-tenant/my-namespace/my-topic
```

Pass `--force` to delete even when the topic has active subscriptions.

## REST API reference

All endpoints are under `/admin/v2/scalable` and take `tenant`, `namespace`, and (except for list) `topic` as path parameters.

| Method & path | Operation |
|---------------|-----------|
| `GET /{tenant}/{namespace}` | List scalable topics in a namespace |
| `PUT /{tenant}/{namespace}/{topic}` | Create a scalable topic |
| `GET /{tenant}/{namespace}/{topic}` | Get topic metadata (segment DAG) |
| `GET /{tenant}/{namespace}/{topic}/stats` | Get aggregated stats |
| `DELETE /{tenant}/{namespace}/{topic}` | Delete a scalable topic |
| `POST /{tenant}/{namespace}/{topic}/migrate` | Migrate a regular topic to scalable |
| `POST /{tenant}/{namespace}/{topic}/split/{segmentId}` | Split a segment |
| `POST /{tenant}/{namespace}/{topic}/merge/{segmentId1}/{segmentId2}` | Merge two adjacent segments |
| `GET /{tenant}/{namespace}/{topic}/autoScalePolicy` | Get the topic's auto split/merge override |
| `POST /{tenant}/{namespace}/{topic}/autoScalePolicy` | Set the topic's auto split/merge override |
| `DELETE /{tenant}/{namespace}/{topic}/autoScalePolicy` | Remove the topic's auto split/merge override |
| `PUT /{tenant}/{namespace}/{topic}/subscriptions/{subscription}` | Create a subscription |
| `DELETE /{tenant}/{namespace}/{topic}/subscriptions/{subscription}` | Delete a subscription |
| `POST /{tenant}/{namespace}/{topic}/subscriptions/{subscription}/seek` | Seek a subscription to a timestamp |
| `POST /{tenant}/{namespace}/{topic}/subscriptions/{subscription}/skip-all` | Clear a subscription's backlog |
