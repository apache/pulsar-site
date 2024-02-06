---
id: concepts-broker-load-balancing-benefits
title: Benefits
sidebar_label: "Benefits"
---

The broker load balancer plays a key role in preventing downtime and lost productivity. It not only ensures efficient use of all resources, but it also optimizes cluster performance, reliability, and capacity with lower latency. It delivers a number of benefits, including but not limited to the following.

## Efficiency

It efficiently distributes the load to maximize broker resources since it allows you to:

- Reduce idle brokers and save cluster resources.

- Distribute data loads evenly and efficiently.  

## Performance

It improves performance since it allows you to:

- Reduce hot spots and maintain message pub/sub latency.

- Minimize the likelihood of Pulsar cluster downtime, scale clusters to meet constantly data-changing needs, and ensure that no broker is overworked. Without it, Pulsar clusters would likely have performance degradation (e.g., slow down, drop requests, or even fail) when topics are suddenly overloaded. 

## Availability

It increases the availability and fault tolerance since it allows you to:

- Minimize topic unavailable time by shifting pub/sub sessions from unavailable brokers to available brokers. 

- Perform cluster maintenance without causing service disruption since pub/sub connections get rerouted to other brokers during maintenance.

## Scalability

It helps seamlessly scale up or down broker clusters since it allows you to:

- Unload topic loads automatically to new brokers when scaling up.

- Detect orphan topics and automatically and reassign them to available brokers when scaling down.

## Related topics

- To get a comprehensive understanding and discover the key insights, see [Broker load balancing | Overview](./concepts-broker-load-balancing-overview.md). 

- To discover different usage scenarios, see [Broker load balancing | Use cases](./concepts-broker-load-balancing-use-cases.md).
  
- To explore functionalities, see [Broker load balancing | Features](./concepts-broker-load-balancing-features.md).

- To learn essential fundamentals, see [Broker load balancing | Concepts](./concepts-broker-load-balancing-concepts.md).

- To review various versions of broker load balancers, see [Broker load balancing | Types](./concepts-broker-load-balancing-types.md).

- To get up quickly, see [Broker load balancing | Quick start](./concepts-broker-load-balancing-quick-start.md).

- To migrate one broker load balancer type to another, see [Broker load balancing | Migration](./concepts-broker-load-balancing-migration.md).

