---
id: concepts-broker-load-balancing-types
title: Types
sidebar_label: "Types"
---

Pulsar provides three types of broker load balancers:

- Simple broker load balancer: it existed since Pulsar's inception, but now is deprecated.

- [Modular broker load balancer](#side-by-side-comparisons)

- [Extensible broker load balancer](#side-by-side-comparisons)

The modular and extensible broker load balancer implements similar load balance functionalities with different system designs. For example, they both employ a similar approach to distributing data loads among brokers, including:

- Dynamic [bundle-broker assignment](./concepts-broker-load-balancing-concepts.md#bundle-assignment)

- Dynamic [bundle splitting](./concepts-broker-load-balancing-concepts.md#bundle-splitting)

- Dynamic [bundle unloading (shedding)](./concepts-broker-load-balancing-concepts.md#bundle-unloading)

However, for bundle ownership and load data stores, the modular load balancer uses ZooKeeper, whereas the extensible load balancer uses [System topics](./concepts-messaging.md#system-topic) and [Table views](./concepts-clients.md#tableview).

## Side-by-side comparisons

| Dimension                                  | Modular broker load balancer                                                                                                                                                                                                                                                                   |Extensible broker load balancer
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---
 Available version                          | Pulsar 1.7.0 <br/> <br/>2017                                                                                                                                                                                                                                                                   |Pulsar 3.0.0 <br/> <br/>2023
 Load Balance Metadata Store and Replication | Dependent on ZooKeeper for load balance metadata store and replication.<br/> <br/> - All broker load data and all bundle load data are stored in ZooKeeper and replicated to all brokers via ZooKeeper watchers. <br/><br/>- All bundle ownerships are stored in ZooKeeper as ephemeral locks. | Dependent on system topics and table views for load balance metadata store and replication. <br/> <br/> - All broker load data are stored in a non-persistent system topic and replicated to all brokers via table views. <br/> <br/>- Each broker publishes only top k bundles' load data in a non-persistent system topic, and only the leader broker consumes it via a table view. <br/> <br/> - Bundle ownerships are stored in a persistent system topic and replicated to all brokers via table views.<br/> <br/> Note: The absolute size of the replicated load data and the complexity of the replication decreased due to passing the data through memory-only, non-persistent topics.
 Load Balance Decision<br/>(Load Balance leader dependency)| Single leader broker decides on bundle-broker assignment, bundle splitting, and bundle unloading. <br/> <br/> Note: The leader broker requires global load information                                                                                                                         | Each broker decides and runs bundle-broker assignment (lookup) and bundle splitting based on the local (replicated) information. <br/><br/> The leader broker still decides on bundle unloading globally.
 Pub/sub reconnection upon bundle unloading | When bundles are unloaded, the topics in the bundles are temporarily closed, and producers and consumers connect to new owner brokers. <br/> <br/> - Connecting to the new owner brokers involves redirecting lookup requests via the leader broker.                                           |  Any broker can respond to the lookup requests to locate the new owner brokers without asking the leader broker. The reconnection does not go through the leader broker.
 Observability                              | You can monitor and analyze load balance with various [metrics](./reference-metrics.md)                                                                                                                                                                                                        | It adds additional [metrics](./reference-metrics.md) and debug mode. For example: <br/><br/> - Check the status of load balance decision breakdown and failure. <br/><br/> - Use the dynamic debug mode configuration to dynamically turn on and off more load balance decision logs.

## Related topics

- To get a comprehensive understanding and discover the key insights, see [Broker load balancing | Overview](./concepts-broker-load-balancing-overview.md).

- To discover different usage scenarios, see [Broker load balancing | Use cases](./concepts-broker-load-balancing-use-cases.md).

- To explore functionalities, see [Broker load balancing | Features](./concepts-broker-load-balancing-features.md).

- To understand advantages, see [Broker load balancing | Benefits](./concepts-broker-load-balancing-benefits.md).

- To learn essential fundamentals, see [Broker load balancing | Concepts](./concepts-broker-load-balancing-concepts.md).

- To get up quickly, see [Broker load balancing | Quick start](./concepts-broker-load-balancing-quick-start.md).

- To migrate one broker load balancer type to another, see [Broker load balancing | Migration](./concepts-broker-load-balancing-migration.md).