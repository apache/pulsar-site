---
id: concepts-broker-load-balancing-types
title: Types
sidebar_label: "Types"
---

Pulsar provides three types of broker load balancers:

- Simple broker load balancer: it existed since Pulsar's inception, but now is deprecated. No one uses it.

- [Modular broker load balancer](#side-by-side-comparisons)

- [Extensible broker load balancer](#side-by-side-comparisons)

The modular and extensible broker load balancer use similar implementation logic and algorithm and have similar functionalities. For example, they both employ a similar approach to distributing data loads among brokers, including:

- Dynamic [bundle-broker assignment](./concepts-broker-load-balancing-concepts.md#bundle-assignment)

- Dynamic [bundle splitting](./concepts-broker-load-balancing-concepts.md#bundle-splitting)

- Dynamic [bundle unloading (shedding)](./concepts-broker-load-balancing-concepts.md#bundle-unloading)  

As a result, brokers dynamically collect and share the current load with other brokers for better load balancing decisions. 

## Side-by-side comparisons

The extensible broker load balancer refactors the logic of the modular broker load balancer with better modularity and is less dependent on ZooKeeper, which makes Pulsar more stable and scalable. 

Dimension|Modular broker load balancer|Extensible broker load balancer
|---|---|---
Available version|Pulsar 1.7.0 <br/> <br/>2017|Pulsar 3.0.0 <br/> <br/>2023
Architecture|ZooKeeper plays an important role, which may cause a large overhead of load data replication.<br/> <br/> All broker load data and all bundle load data are stored in ZooKeeper and replicated to all brokers via ZooKeeper watchers. | ZooKeeper is less dependent (only lookup data is stored in ZooKeeper), which reduces the overhead of load data replication and minimizes data processing delays.<br/> <br/> Pulsar reads and writes data via system topics and table view rather than ZooKeeper: <br/> <br/> - [System topics](./concepts-messaging.md#system-topic): global ownership data is stored in bundle state channels within persistent topics. <br/> <br/> - [Table view](./concepts-clients.md#tableview): global ownership data is replicated using the compacted table view, where 1) All broker load data is replicated to all brokers via non-persistent topics. 2) Only the top-n bundle load data from each broker is replicated to the leader brokers via non-persistent topics. <br/> <br/> The absolute size of the shared load data and the complexity of the replication decreased due to passing the data through memory-only, non-persistent topics. 
Performance (1/2) | Load balance decisions might be made slowly, and data load might be distributed unevenly. <br/> <br/> - Single leader broker decides on bundle-broker assignment, bundle splitting, and bundle unloading. <br/> <br/> - This requires all load information to be passed to the leader broker, which may delay load balance executions. | It optimizes the overall performance, such as load balance decisions are made faster, and data load is distributed more evenly. <br/> <br/> - Each broker decides and runs bundle-broker assignments and bundle splitting. <br/> <br/> - The leader broker still decides on bundle unloading globally. <br/> <br/> - The load balance decisions are more distributed across brokers, expecting quicker load balance operations.
|Performance (2/2) | Topics might be temporarily unavailable during the bundle unloading process. <br/> <br/> -  When bundles are unloaded, the topics in the bundles will be closed, and producers and consumers need to reconnect to new owner brokers. <br/> <br/> - This new assignment process involves redirections talking to multiple brokers (including the leader broker), and this redirection can delay the reconnections of producers and consumers. |  Topics are more available during the bundle unloading process because the time of the reconnection from producer to consumers is faster. <br/> <br/> - The time of unloading bundles (topics) automatically is faster. A new unloading strategy, [TransferShedder](./concepts-broker-load-balancing-concepts.md#bundle-unloading-strategies), is introduced as  the default behavior, which means new brokers will be pre-assigned before topic connections are closed. <br/> <br/> - The time of unloading bundles (topics) manually is faster. The logic of pulsar-admin transfer is refactored and improved. The pub/consumers can connect to the new owner broker with lesser redirections. <br/> <br/> For detailed performance comparison results between the extensible broker load balancer and the modular broker load balancer, see [performance tests](#performance-tests).
Observability| You can monitor and analyze load balance with various [metrics](./reference-metrics.md) and the [pulsar-perf](pathname:///reference/#/@pulsar:version_reference@/pulsar-perf/) tool. | It improves the efficiency of monitoring and analyzing load balance by introducing more [metrics](./reference-metrics.md), a dedicated dashboard, a new log tool, and a new flag (`--extensions`) of the pulsar-perf tool, which allows you to perform more management operations. For example: <br/><br/> - Check the status of load balance decision breakdown and failure. <br/><br/> - Monitor metrics in dashboard. <br/><br/> - Use dynamic debug mode configurations to print more load balance decision logs.
Flexibility|You can set configurations for the load balance. For example,<br/><br/> - Adjust thresholds dynamically (e.g., max number of bundles, bundle splitting conditions, etc). <br/><br/> - Set unloading cycle delays. <br/><br/> - Configure bundle split intervals.<br/><br/> - Customize load balance strategy. | It increases the flexibility of managing load balance by introducing more configurations, which allows you to set more of them. For example,<br/><br/> - Configure bundle cleanup delays. <br/><br/> - Set broker load data TTL.

## Performance tests

The following tests have been conducted to explicitly show the performance improvement on the extensible broker load balancer.

This test is conducted on Pulsar 3.0.0.

Dimension | Goal | Test case | Modular broker load balancer | Extensible broker load balancer
|---|---|---|---|---
Scalability|Verify if the extensible broker load balancer can decrease the start and end time to reconnect publishers when a large Pulsar cluster with many bundles restarts all brokers in a short period.|Measure the connection recovery time of 100,000 publishers when restarting 100 brokers with 65,000 distributed bundles in 2 mins.|20 mins|10 mins
Publisher latency|Verify if the extensible broker load balancer can decrease individual message delays when topics are unloaded to other brokers.|Measure the latency time of P99.99 of messages (10,000 partitions, 1,000 bundles at 1,000 msgs/s) when restarting a cluster restarts 10 brokers one by one. |1841 ms|1228 ms
Unload balance (1/2)| Verify if the extensible broker load balancer can decrease the load balance time if some brokers join or leave a cluster.| Measure the time to balance the load (10,000 topics/publishers, 100 bundles) from scaling up from 5 brokers to 10 brokers. |7 mins <br/><br/> The load cannot be balanced without further tuning.|5 mins <br/><br/> The load can be balanced without further tuning.
Unload balance (2/2)|Same as above|Measure the time to balance the load (10,000 topics/publishers, 100 bundles) from scaling down from 10 brokers to 5 brokers. | 5 mins | 3 mins
Split balance|Verify if the extensible broker load balancer can decrease the time of automatic bundle splitting and balance the overloaded topics.| Measure the time of splitting 1 bundle into 128 bundles and balancing the load (10,000 topics/publishers) when hot-spot topics have high loads.|15 mins|13 mins

## Related topics

- To get a comprehensive understanding and discover the key insights, see [Broker load balancing | Overview](./concepts-broker-load-balancing-overview.md). 

- To discover different usage scenarios, see [Broker load balancing | Use cases](./concepts-broker-load-balancing-use-cases.md).
  
- To explore functionalities, see [Broker load balancing | Features](./concepts-broker-load-balancing-features.md).

- To understand advantages, see [Broker load balancing | Benefits](./concepts-broker-load-balancing-benefits.md).

- To learn essential fundamentals, see [Broker load balancing | Concepts](./concepts-broker-load-balancing-concepts.md).

