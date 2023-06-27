---
id: concepts-broker-load-balancing-overview
title: Overview
sidebar_label: "Overview"
---


## Challenges of load balancing in distributed streaming systems

Like other distributed systems, load balancing is important in messaging and streaming systems. Without it, load imbalance can cause hot-spot brokers, resulting in performance degradation, cluster unavailability, and wasted broker resources.

Due to the unpredictable topic volume and physical distance among distributed brokers, it is not easy to dynamically distribute message loads among brokers. It requires the system to continuously monitor and route message loads based on changing conditions without compromising system performance. For example:

- When topics receive high traffic, exhausting CPU or memory resources on particular brokers, the cluster offloads the overloaded brokers and redistributes the load to other brokers.

- When brokers experience low traffic, become idle, or are added or removed, the cluster rebalances the load to avoid wasting resources.

- When topics are redistributed to other brokers, the cluster ensures the topics are instantaneously available to clients. The topics continue to guarantee the system performance, such as persistence, ordering, deduplication, subscription type, etc.

## Load balancing in Pulsar

Because Pulsar uses a segment-centric architecture and separates the message serving and storage layer, it is designed to benefit load balancing. 

- At the persistence layer (BookKeeper), message segments in topics are balanced across all the bookies in the cluster. When an individual bookie runs out of storage capacity, the rest segments are loaded into the available bookies. 

- At the serving layer (broker), topic rearrangement (balance) is seamless. Brokers do not need to copy messages from one broker to another when rebalancing topics among brokers. Instead, the current owner broker temporarily closes the topic and client sessions and transfers the ownership to the selected broker. Then, the selected broker takes ownership of the topic and opens the topic sessions to the clients.

Pulsar uses automatic broker load balancing to monitor the brokers' load internally and then dynamically balances topic sessions according to the load across all available brokers as evenly, dynamically, and flexibly as possible Consequently, it improves performance, availability, and usage of resources.

## Related topics

- To learn essential fundamentals, see [Broker load balancing | Concepts](./concepts-broker-load-balancing-concepts.md).
