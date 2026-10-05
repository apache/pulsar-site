---
id: develop-tools
title: Load testing tools
sidebar_label: "Load testing tools"
---

Use the [Pulsar performance tools](performance-pulsar-perf.md) to generate publish and consume workloads with controlled message rates and sizes. For repeatable scenarios, comparisons between revisions, metrics, and profiling, see the [performance testing framework](https://github.com/apache/pulsar/blob/master/tests/performance/README.md).

The old `pulsar-perf simulation-client` and `simulation-controller` commands and their `LoadSimulationClient` / `LoadSimulationController` implementations were removed. Update scripts that invoke these commands to use the current performance tools; their controller commands are no longer available.

## Broker Monitor
To observe load-manager data, use the broker monitor, which is
implemented in `org.apache.pulsar.testclient.BrokerMonitor`. The broker monitor will print tabular load data to the
console as it is updated using watchers.

### Usage
To start a broker monitor, use the `monitor-brokers` command in the `pulsar-perf` script:

```shell
pulsar-perf monitor-brokers --connect-string <zookeeper host:port>
```

The console will then continuously print load data until it is interrupted.

