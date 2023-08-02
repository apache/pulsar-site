---
id: develop-load-manager
title: Broker load balancer
sidebar_label: "Broker load balancer"
---

If you want to develop a broker load balancer, check out the following docs.

Pulsar has the following types of load managers:

- Simple load manager, implemented in [`SimpleLoadManagerImpl`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/impl/SimpleLoadManagerImpl.java), which attempts to simplify how the load is managed while also providing abstractions so that complex load management strategies may be implemented.

- Modular load manager, implemented in [`ModularLoadManagerImpl`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/impl/ModularLoadManagerImpl.java), which is a flexible alternative to the [`SimpleLoadManagerImpl`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/impl/SimpleLoadManagerImpl.java).

- Extensible load manager, implemented in 

## Concepts

Before starting the impelemtation, make sure you understand the following basics.

:::note

The following concepts are only availabe for the modular load manager.

:::

### Data

The data monitored by the modular load manager is contained in the [`LoadData`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/LoadData.java) class.
Here, the available data is subdivided into the bundle data and the broker data.

### Broker

The broker data is contained in the [`BrokerData`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/BrokerData.java) class. It is further subdivided into two parts,
one being the local data that every broker individually writes to ZooKeeper, and the other being the historical broker data that is written to ZooKeeper by the leader broker.

### Lead broker

The module load manager is _centralized_, meaning that all requests to assign a bundle---whether it's been seen before or whether this is the first time---only get handled by the lead broker (which can change over time). To determine the current lead broker, examine the `/loadbalance/leader` node in ZooKeeper.

### Local broker data

The local broker data is contained in the class [`LocalBrokerData`](https://github.com/apache/pulsar/blob/master/pulsar-common/src/main/java/org/apache/pulsar/policies/data/loadbalancer/LocalBrokerData.java) and provides information about the following resources:

* CPU usage
* JVM heap memory usage
* Direct memory usage
* Bandwidth in/out usage
* Most recent total message rate in/out across all bundles
* Total number of topics, bundles, producers, and consumers
* Names of all bundles assigned to this broker
* Most recent changes in bundle assignments for this broker

The local broker data is updated periodically according to the service configuration
"loadBalancerReportUpdateMaxIntervalMinutes". After any broker updates their local broker data, the leader broker will
receive the update immediately via a ZooKeeper watch, where the local data is read from the ZooKeeper node
`/loadbalance/brokers/<broker host/port>`

### Historical broker data

The historical broker data is contained in the [`TimeAverageBrokerData`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/TimeAverageBrokerData.java) class.

To reconcile the need to make good decisions in a steady-state scenario and make reactive decisions in a critical scenario, the historical data is split into two parts: the short-term data for reactive decisions, and the long-term data for steady-state decisions. Both time frames maintain the following information:

* Message rate in/out for the entire broker
* Message throughput in/out for the entire broker

Unlike the bundle data, the broker data does not maintain samples for the global broker message rates and throughputs, which is not expected to remain steady as new bundles are removed or added. Instead, this data is aggregated over the short-term and long-term data for the bundles. See the section on bundle data to understand how that data is collected and maintained.

The historical broker data is updated for each broker in memory by the leader broker whenever any broker writes their local data to ZooKeeper. Then, the historical data is written to ZooKeeper by the leader broker periodically according to the configuration `loadBalancerResourceQuotaUpdateIntervalMinutes`.

### Bundle data

The bundle data is contained in the [`BundleData`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/BundleData.java). Like the historical broker data, the bundle data is split into a short-term and long-term time frame. The information maintained in each time frame:

* Message rate in/out for this bundle
* Message Throughput In/Out for this bundle
* Current number of samples for this bundle

The time frames are implemented by maintaining the average of these values over a set, a limited number of samples, where the samples are obtained through the message rate and throughput values in the local data. Thus, if the update interval for the local data is 2 minutes, the number of short samples is 10 and the number of long samples is 1000, the short-term data is maintained over a period of `10 samples * 2 minutes / sample = 20 minutes`, while the long-term data is similarly over a period of 2000 minutes. Whenever there are not enough samples to satisfy a given time frame, the average is taken only over the existing samples. When no samples are available, default values are assumed until they are overwritten by the first sample. Currently, the default values are

* Message rate in/out: 50 messages per second both ways
* Message throughput in/out: 50KB per second both ways

The bundle data is updated in memory on the leader broker whenever any broker writes their local data to ZooKeeper.
Then, the bundle data is written to ZooKeeper by the leader broker periodically at the same time as the historical broker data, according to the configuration `loadBalancerResourceQuotaUpdateIntervalMinutes`.

### Traffic distribution

The modular load manager uses the abstraction provided by [`ModularLoadManagerStrategy`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/ModularLoadManagerStrategy.java) to make decisions about bundle assignments. The strategy makes a decision by considering the service configuration, the entire load data, and the bundle data for the bundle to be assigned. Currently, the only supported strategy is [`LeastLongTermMessageRate`](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/main/java/org/apache/pulsar/broker/loadbalance/impl/LeastLongTermMessageRate.java), though soon users will have the ability to inject their own strategies if desired.

### Least long term message rate strategy

As its name suggests, the least long-term message rate strategy attempts to distribute bundles across brokers so that
the message rate in the long-term time window for each broker is roughly the same. However, simply balancing load based
on message rate does not handle the issue of asymmetric resource burden per message on each broker. Thus, the system
resource usages, which are CPU, memory, direct memory, bandwidth in, and bandwidth out, are also considered in the
assignment process. This is done by weighting the final message rate according to
`1 / (overload_threshold - max_usage)`, where `overload_threshold` corresponds to the configuration
`loadBalancerBrokerOverloadedThresholdPercentage` and `max_usage` is the maximum proportion among the system resources that are being utilized by the candidate broker. This multiplier ensures that machines with are being more heavily taxed
by the same message rates will receive less load. In particular, it tries to ensure that if one machine is overloaded,
then all machines are approximately overloaded. In the case in which a broker's max usage exceeds the overload
threshold, that broker is not considered for bundle assignment. If all brokers are overloaded, the bundle is randomly
assigned.

## Enablement

You can enable a simple, modular, or extensible load manager by following the steps below.

### Enable simple load manager

You can enable the simple load manager using one of the following methods: 

- Method 1

  Update the value of [loadManagerClassName](https://github.com/apache/pulsar/blob/782e91fe327efe2c9c9107d6c679c2837d43935b/conf/broker.conf#L1309) to `org.apache.pulsar.broker.loadbalance.impl.SimpleLoadManagerImpl` in `conf/broker.conf`.

- Method 2
  
  Use the `pulsar-admin` tool. 

   ```shell
   pulsar-admin brokers update-dynamic-config \
   --config loadManagerClassName \
   --value org.apache.pulsar.broker.loadbalance.impl.SimpleLoadManagerImpl
   ``` 

  :::note 
  
  Any mistakes in specifying the load manager will cause Pulsar to default to `SimpleLoadManagerImpl`.

  :::

### Enable modular load manager

You can enable the modular load manager using one of the following methods: 

- Method 1

  Update the value of [loadManagerClassName](https://github.com/apache/pulsar/blob/782e91fe327efe2c9c9107d6c679c2837d43935b/conf/broker.conf#L1309) to `org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl` in `conf/broker.conf`.

- Method 2
  
  Use the `pulsar-admin` tool. 

   ```shell
   pulsar-admin brokers update-dynamic-config \
   --config loadManagerClassName \
   --value org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl
   ```

  :::note 
  
  Any mistakes in specifying the load manager will cause Pulsar to default to `SimpleLoadManagerImpl`.

  :::

### Enable extensible load manager

You can enable the extensible load manager by updating the value of [loadManagerClassName](https://github.com/apache/pulsar/blob/782e91fe327efe2c9c9107d6c679c2837d43935b/conf/broker.conf#L1309) to `org.apache.pulsar.broker.loadbalance.impl.ExtensibleLoadManagerImpl` in `conf/broker.conf`.

:::note

The pulsar-admin tool is not supported for enabling the extensible load manager.

:::

## Verification

If you want to verify which load manager is used, follow the steps below.

### Step 1: check loadManagerClassName

You can use the `pulsar-admin` tool to examine the `loadManagerClassName` element.

**Input**

```bash
bin/pulsar-admin brokers get-all-dynamic-config
```

**Output**

```bash
{
"loadManagerClassName" : "org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl"
}
```

If there is no `loadManagerClassName` element, then the value of [loadManagerClassName](https://github.com/apache/pulsar/blob/782e91fe327efe2c9c9107d6c679c2837d43935b/conf/broker.conf#L1309) in the `conf/broker.conf` file is used.

### Step 2: verify load manager (optional) 

To double-check which load manager is used, you can [check the ZooKeeper load report](#method-1-check-zookeeper-load-report) or [check monitor-brokers output](#method-2-check-monitor-brokers-output).  

#### Method 1: check ZooKeeper load report

Check the ZooKeeper load report. The load report in `/loadbalance/brokers/...`.

```bash
tbd
```
   
Different load managers have different ZooKeeper load reports. 

- [Simple load manager](./concepts-broker-load-balancing-types.md)

  ```json
  {
    "systemResourceUsage": {
      "bandwidthIn": {
        "limit": 10240000.0,
        "usage": 0.0
      },
      "bandwidthOut": {
        "limit": 10240000.0,
        "usage": 0.0
      },
      "cpu": {
        "limit": 2400.0,
        "usage": 0.0
      },
      "directMemory": {
        "limit": 16384.0,
        "usage": 1.0
      },
      "memory": {
        "limit": 8192.0,
        "usage": 3903.0
      }
    }
  }
  ```

- [Modular load manager](./concepts-broker-load-balancing-types.md)

   Modular load manager has different ZooKeeper load report from that of the simple load manager. For example, the `systemResourceUsage` sub-elements (`bandwidthIn`, `bandwidthOut`, etc.) are now all at the top level. 

  ```json
  {
    "bandwidthIn": {
      "limit": 10240000.0,
      "usage": 4.256510416666667
    },
    "bandwidthOut": {
      "limit": 10240000.0,
      "usage": 5.287239583333333
    },
    "bundles": [],
    "cpu": {
      "limit": 2400.0,
      "usage": 5.7353247655435915
    },
    "directMemory": {
      "limit": 16384.0,
      "usage": 1.0
    }
  }
  ```

- Extensible load manager

  :::note

  [Extensible load manager](./concepts-broker-load-balancing-types.md) does not have the ZooKeepr load report because its internal stats are stored in system topics rather than ZooKeeper.

  :::
   

#### Method 2: check monitor-brokers output

You can use the [pulsar-perf tool](reference-cli-tools.md) to start a broker monitor. 
  
```bash
pulsar-perf monitor-brokers --connect-string <zookeeper host:port>
````

Different load managers have different outputs. This output is the same as the output of the [Method 1: check ZooKeeper load report](#method-1-check-zookeeper-load-report), but it is well formatted for better readability.

- Simple load manager

  ```bash
  ===================================================================================================================
  ||COUNT          |TOPIC          |BUNDLE         |PRODUCER       |CONSUMER       |BUNDLE +       |BUNDLE -       ||
  ||               |4              |4              |0              |2              |0              |0              ||
  ||RAW SYSTEM     |CPU %          |MEMORY %       |DIRECT %       |BW IN %        |BW OUT %       |MAX %          ||
  ||               |0.25           |47.94          |0.01           |0.00           |0.00           |47.94          ||
  ||ALLOC SYSTEM   |CPU %          |MEMORY %       |DIRECT %       |BW IN %        |BW OUT %       |MAX %          ||
  ||               |0.20           |1.89           |               |1.27           |3.21           |3.21           ||
  ||RAW MSG        |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
  ||               |0.00           |0.00           |0.00           |0.01           |0.01           |0.01           ||
  ||ALLOC MSG      |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
  ||               |54.84          |134.48         |189.31         |126.54         |320.96         |447.50         ||
  ===================================================================================================================
  ```

  - Modular load manager

  ```bash
  ===================================================================================================================
  ||SYSTEM         |CPU %          |MEMORY %       |DIRECT %       |BW IN %        |BW OUT %       |MAX %          ||
  ||               |0.00           |48.33          |0.01           |0.00           |0.00           |48.33          ||
  ||COUNT          |TOPIC          |BUNDLE         |PRODUCER       |CONSUMER       |BUNDLE +       |BUNDLE -       ||
  ||               |4              |4              |0              |2              |4              |0              ||
  ||LATEST         |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
  ||               |0.00           |0.00           |0.00           |0.00           |0.00           |0.00           ||
  ||SHORT          |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
  ||               |0.00           |0.00           |0.00           |0.00           |0.00           |0.00           ||
  ||LONG           |MSG/S IN       |MSG/S OUT      |TOTAL          |KB/S IN        |KB/S OUT       |TOTAL          ||
  ||               |0.00           |0.00           |0.00           |0.00           |0.00           |0.00           ||
  ===================================================================================================================
  ```

 - Extensible load manager
   
   ```bash
   tbd
   ````
