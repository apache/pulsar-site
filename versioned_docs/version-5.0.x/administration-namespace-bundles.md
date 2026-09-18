---
id: administration-namespace-bundles
title: Namespace bundles
sidebar_label: "Namespace bundles"
description: Learn how many bundles a namespace gets, what a bundle costs, and how to choose the number of bundles.
---

A namespace is sharded into **bundles**, and a bundle is the unit that the [load manager](concepts-broker-load-balancing-overview.md) assigns to a broker. Each bundle owns a range of the 32-bit hash space of the namespace; a topic belongs to the bundle whose range contains the hash of its full topic name (for example `persistent://my-tenant/my-namespace/my-topic`). For partitioned topics, each partition is hashed separately, so the partitions of one topic spread across bundles and brokers.

The number of bundles decides how many brokers the topics of a namespace can be spread across. This page explains how that number is chosen, what a bundle costs, and how to size namespaces. For the mechanics of assignment, splitting and unloading, see [Broker load balancing | Concepts](concepts-broker-load-balancing-concepts.md).

## How many bundles a namespace gets

The number of bundles is fixed when the namespace is created and can afterwards only grow, by [splitting](#split-bundles).

| Namespace | Created by | Number of bundles |
|-----------|------------|-------------------|
| Any namespace created with `pulsar-admin namespaces create`, the REST API or the Java admin client without an explicit bundle count | Broker | `defaultNumberOfNamespaceBundles` in `broker.conf`, 32 by default (4 before Pulsar 5.0.0) |
| Same, with `pulsar-admin namespaces create ... --bundles N` | Broker | `N` |
| `public/default` | `pulsar initialize-cluster-metadata` | `--default-namespace-bundle-number`, 32 by default (16 before Pulsar 5.0.0) |
| Namespaces created with `pulsar initialize-namespace` | CLI tool | 32 |
| `pulsar/system` | `pulsar initialize-cluster-metadata` or `pulsar initialize-transaction-coordinator-metadata` | `--system-namespace-bundle-number`, 64 by default (16 before Pulsar 5.0.0) |
| `pulsar/system`, when it does not exist yet at start-up | Broker (extensible load manager) or `pulsar standalone` | `defaultNumberOfSystemNamespaceBundles` in `broker.conf`, 64 by default (before Pulsar 5.0.0: `defaultNumberOfNamespaceBundles`) |
| `public/default` | `pulsar standalone` | `defaultNumberOfNamespaceBundles` |
| The heartbeat namespaces of each broker | Broker | 1 (the full hash range) |

:::note Pulsar 5.0 milestones

The defaults in the table describe Pulsar 5.0.0 after the 5.0.0-M1/M2 milestones. Those milestone builds still use 4 bundles for broker-created namespaces and 16 for namespaces created during cluster metadata initialization. They do not provide `defaultNumberOfSystemNamespaceBundles` or `--system-namespace-bundle-number`; broker-created system namespaces use `defaultNumberOfNamespaceBundles`. Existing namespaces retain their bundle counts when upgraded.

:::

To see the bundles of a namespace:

```shell
pulsar-admin namespaces bundles my-tenant/my-namespace
```

To find the bundle of a topic:

```shell
pulsar-admin topics bundle-range persistent://my-tenant/my-namespace/my-topic
```

## What a bundle costs

A bundle only costs something once a topic in it has been looked up. Bundle ownership is acquired lazily: the first lookup of a topic in a bundle makes the load manager assign the bundle to a broker, and from then on the bundle has

- an ownership entry in the metadata store (an ephemeral node with the modular load manager, an entry in the ownership system topic with the extensible one),
- an entry in the owning broker's load report, and
- one unload step when the owning broker shuts down or the bundle is moved.

Bundles that nobody has looked up are only a boundary in the namespace policies. A namespace with 32 bundles and two topics has at most two owned bundles; the other 30 cost nothing. The cost of a namespace therefore scales with the number of *active* bundles, which is bounded by the number of active topics, not with the configured bundle count.

The consequence is that a generous default is cheap for small namespaces and pays off for large ones: a namespace with enough topics to occupy all of its bundles would have been split to a similar number of bundles by [automatic bundle splitting](#split-bundles) anyway, and starting with more bundles only means that its topics are spread across brokers from the beginning instead of after a series of split-and-unload cycles.

## Choose the number of bundles

The load manager balances brokers by moving bundles, so a namespace needs **more bundles than there are brokers** for its topics to be spread evenly. With fewer bundles than brokers, some brokers never get a bundle of the namespace, and with a count close to the number of brokers, the hashing of topics into bundles leaves the per-broker share uneven.

- For a namespace whose topics and traffic are known in advance, size it at creation with `--bundles`. Bundles can be split but never merged, so do not go far beyond what the expected number of topics justifies. As a rule of thumb, for a namespace with 1000 topics, 64 bundles achieve a good distribution across 16 brokers.
- For everything else, the default of 32 covers clusters of up to a few dozen brokers. Set `defaultNumberOfNamespaceBundles` lower only if you create very many namespaces and want to cap the number of bundles that can ever become active per namespace.
- The `pulsar/system` namespace holds a small, fixed set of topics: the `transaction_coordinator_assign` partitions, the transaction logs, the internal topics of the extensible load manager and the resource-usage topic. Its default of 64 bundles is chosen for the transaction coordinators: a coordinator is owned by whichever broker owns the bundle of its `transaction_coordinator_assign` partition, and 64 is the smallest number of bundles at which each of the default 16 coordinators hashes into a bundle of its own, so the coordinators can be spread across up to 16 brokers and moved one at a time. With 16 bundles, they hash into only 8 bundles. If you run more coordinators (`--initial-num-transaction-coordinators`), size the system namespace accordingly with `--system-namespace-bundle-number` when you initialize the cluster.

## Split bundles

When the load of a bundle grows past the thresholds in `broker.conf` (`loadBalancerNamespaceBundleMaxTopics`, `loadBalancerNamespaceBundleMaxSessions`, `loadBalancerNamespaceBundleMaxMsgRate`, `loadBalancerNamespaceBundleMaxBandwidthMbytes`), the load manager splits the bundle in two and, by default, unloads the halves so that they can be assigned to other brokers. Automatic splitting is on by default (`loadBalancerAutoBundleSplitEnabled=true`, `loadBalancerAutoUnloadSplitBundlesEnabled=true`) and stops at `loadBalancerNamespaceMaximumBundles` (128) bundles per namespace. You can also split manually:

```shell
pulsar-admin namespaces split-bundle my-tenant/my-namespace --bundle 0x00000000_0x08000000
```

Splits are permanent: there is no operation that merges bundles. For the split algorithms and their thresholds, see [Bundle splitting](concepts-broker-load-balancing-concepts.md#bundle-splitting) and [Split namespace bundles](administration-load-balance.md#split-namespace-bundles).

## Bundles and broker restarts

When a broker shuts down, it releases every bundle it owns. With the modular load manager, the broker unloads its owned bundles one after another (the topics within a bundle are closed in parallel), so the graceful shutdown time of a broker grows with the number of bundles it owns; with the extensible load manager, the broker transfers ownership to new owners using concurrent batches of ownership overrides, controlled by the dynamic setting `loadBalancerServiceUnitStateMaxConcurrentOverrides` (64 by default). This bounds the override batch size, not the per-second transfer rate or all client reconnections. Because only owned bundles are unloaded, unused bundles do not add to the shutdown time. See [Rolling upgrade of brokers](administration-rolling-upgrade.md) for how to keep restarts and the resulting rebalancing under control.
