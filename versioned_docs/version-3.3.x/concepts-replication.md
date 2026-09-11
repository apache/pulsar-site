---
id: concepts-replication
title: Geo Replication
sidebar_label: "Geo Replication"
description: Get a comprehensive understanding of geo-replication mechanisms and patterns in Pulsar.
---

Regardless of industries, when an unforeseen event occurs and brings day-to-day operations to a halt, an organization needs a well-prepared disaster recovery plan to quickly restore service to clients. However, a disaster recovery plan usually requires a multi-datacenter deployment with geographically dispersed data centers. Such a multi-datacenter deployment requires a geo-replication mechanism to provide additional redundancy in case a data center fails.

Pulsar's geo-replication mechanism is typically used for disaster recovery, enabling the replication of persistently stored message data across multiple data centers. For instance, your application is publishing data in one region and you would like to process it for consumption in other regions. With Pulsar's geo-replication mechanism, messages can be produced and consumed in different geo-locations.

The diagram below illustrates the process of [geo-replication](administration-geo.md). Whenever three producers (P1, P2 and P3) respectively publish messages to the T1 topic in three clusters, those messages are instantly replicated across clusters. Once the messages are replicated, two consumers (C1 and C2) can consume those messages from their clusters. Each consumer consumes through a subscription that is local to its own cluster; see [Subscriptions and consumers across clusters](#subscriptions-and-consumers-across-clusters) for how subscriptions behave when a topic is consumed from more than one cluster.

![Geo-replication example with full-mesh pattern in Pulsar](/assets/full-mesh-replication.svg)

## Subscriptions and consumers across clusters

Geo-replication replicates **topic data**, not subscriptions. A subscription belongs to the cluster where it is created, and each cluster dispatches messages only to the subscriptions that exist locally.

| Item | Replicated across clusters? |
|------|------------------------------|
| Messages (topic data) | Yes |
| Subscriptions, including their cursors, consumers, backlog, and acknowledgment state | No, each cluster keeps its own subscriptions |
| Mark-delete position of a [replicated subscription](administration-geo.md#replicated-subscriptions) | Yes, if explicitly enabled |
| Individual acknowledgments | No |

### Subscriptions are local to a cluster

When you use the same subscription name in two clusters, Pulsar creates **two independent subscriptions**, one in each cluster:

* Each subscription has its own cursor, backlog, consumers, and acknowledgment state. Acknowledging a message in one cluster does not advance the cursor of the subscription with the same name in another cluster.
* Each subscription applies its own [subscription type](concepts-messaging.md#subscription-types) locally. For example, an `exclusive` subscription in one cluster does not prevent a subscription with the same name from being created in another cluster.
* Each subscription consumes the local copy of the topic, which contains both messages produced locally and messages replicated from other clusters. How complete that copy is depends on the replication configuration: with 1-way geo-replication or [selective replication](administration-geo.md#selective-replication), a cluster receives only part of the topic data, and so do its subscriptions.

For the same reason, a consumer that reconnects to a different cluster with the same subscription name does not resume the original subscription. It triggers the creation of a new, unrelated subscription that only shares the name, as described in [PIP-33: Replicated subscriptions](https://github.com/apache/pulsar/blob/master/pip/pip-33.md).

Because subscriptions are local, they are also managed locally. For example, deleting a geo-replicated topic requires deleting the local subscriptions in every cluster.

### Consumers do not share the workload across clusters

Consumers that use the same subscription name in different clusters do not form a single consumer group, and Pulsar does not distribute messages among them. In the full-mesh example above, if consumer **C1** consumes the **T1** topic as `sub-1` in **Cluster-A** and consumer **C2** consumes the same topic as `sub-1` in **Cluster-B**, both of them receive every message published to **T1** in either cluster, because each cluster dispatches messages from its own copy. As a result, every message is processed once per cluster, which duplicates processing at the application level unless the application handles duplicates.

Reusing a subscription name across clusters therefore does not split the consumption of a replicated topic, because no single subscription spans clusters. To distribute the processing load across regions, shard the workload at the topic or partition level, for example, by using a different topic, or a different subset of partitions, per region.

### Replicated subscriptions: for failover, not for active-active consumption

By default, only messages are replicated. Pulsar also supports [replicated subscriptions](administration-geo.md#replicated-subscriptions), which keep the mark-delete position of a subscription in sync across clusters within a sub-second timeframe. This feature is intended for failover: the consumers of a subscription are active in a single cluster and, if that cluster becomes unavailable, they can restart in another cluster with a subscription of the same name and resume from a consistent position instead of reprocessing the whole topic.

Replicated subscriptions do not create a single subscription that spans clusters. When consumers are active in multiple clusters at the same time, Pulsar does not coordinate message dispatch between them: most messages are processed in both clusters (duplicate processing), and some messages may be processed in either cluster depending on replication timing. For this reason, when replicated subscriptions are enabled, process messages in a single cluster at a time.

## Replication mechanisms

The geo-replication mechanism can be categorized into synchronous geo-replication and asynchronous geo-replication strategies. Pulsar supports both replication mechanisms.

### Asynchronous geo-replication in Pulsar

An asynchronous geo-replicated cluster is composed of multiple physical clusters set up in different data centers. Messages produced on a Pulsar topic are first persisted to the local cluster and then replicated asynchronously to the remote clusters by brokers.

![Example of asynchronous geo-replication mechanism in Pulsar](/assets/geo-replication-async.svg)

In normal cases, when there are no connectivity issues, messages are replicated immediately, at the same time as they are dispatched to local consumers. Typically, end-to-end delivery latency is defined by the network round-trip time (RTT) between the data centers. Applications can create producers and consumers in any of the clusters, even when the remote clusters are not reachable (for example, during a network partition).

Asynchronous geo-replication provides lower latency but may result in weaker consistency guarantees due to the potential replication lag that some data hasn't been replicated.

### Synchronous geo-replication via BookKeeper

In synchronous geo-replication, data is synchronously replicated to multiple data centers and the client has to wait for an acknowledgment from the other data centers. As illustrated below, when the client issues a write request to one cluster, the written data will be replicated to the other two data centers. The write request is only acknowledged to the client when the majority of data centers (in this example, at least 2 data centers) have acknowledged that the write has been persisted.

![Example of synchronous geo-replication mechanism in Pulsar](/assets/geo-replication-sync.svg)

Synchronous geo-replication in Pulsar is achieved by BookKeeper. A synchronous geo-replicated cluster consists of a cluster of bookies and a cluster of brokers that run in multiple data centers, and a global Zookeeper installation (a ZooKeeper ensemble is running across multiple data centers). You need to configure a BookKeeper region-aware placement policy to store data across multiple data centers and guarantee availability constraints on writes.

Synchronous geo-replication provides the highest availability and also guarantees stronger data consistency between different data centers. However, your applications have to pay an extra latency penalty across data centers.


## Replication patterns

Pulsar provides a great degree of flexibility for customizing your replication strategy. You can set up different replication patterns to serve your replication strategy for an application between multiple data centers. 

Pulsar supports the following replication patterns:

### Full-mesh replication

Using full-mesh replication and applying the [selective message replication](administration-geo.md#selective-replication), you can customize your replication strategies and topologies between any number of data centers.

![Example of full-mesh replication pattern in Pulsar](/assets/full-mesh-replication.svg)

### Active-active replication

Active-active replication is a variation of full-mesh replication, with only two data centers. Producers can run at any data center to produce messages, and consumers in either data center can consume all messages produced in both data centers, because each data center holds a local copy of the topic. This message fan-out does not distribute the processing load across data centers: the consumers in each data center belong to their own local subscription and every subscription receives every message. See [Subscriptions and consumers across clusters](#subscriptions-and-consumers-across-clusters).

![Example of active-active replication pattern in Pulsar](/assets/active-active-replication.svg)

For how to use active-active replication to migrate data between clusters, refer to [here](administration-geo.md#migrate-data-between-clusters-using-geo-replication).

### Aggregation replication

The aggregation replication pattern is typically used when replicating messages from the edge to the cloud. For example, assume you have 3 clusters in 3 fronting data centers and one aggregated cluster in a central data center, and you want to replicate messages from multiple fronting data centers to the central data center for aggregation purposes. You can then create an individual namespace for the topics used by each fronting data center and assign the aggregated data center to those namespaces.

![Example of aggregation replication pattern in Pulsar](/assets/aggregation-replication.svg)
