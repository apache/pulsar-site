# functions-worker

Operations to collect function-worker statistics


```shell
$ pulsar-admin functions-worker subcommand
```



## function-stats

Dump all functions stats running on this broker

**Command:**

```shell
$ pulsar-admin functions-worker function-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## monitoring-metrics

Dump metrics for Monitoring

**Command:**

```shell
$ pulsar-admin functions-worker monitoring-metrics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-cluster

Get all workers belonging to this cluster

**Command:**

```shell
$ pulsar-admin functions-worker get-cluster options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-cluster-leader

Get the leader of the worker cluster

**Command:**

```shell
$ pulsar-admin functions-worker get-cluster-leader options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-function-assignments

Get the assignments of the functions across the worker cluster

**Command:**

```shell
$ pulsar-admin functions-worker get-function-assignments options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## rebalance

Triggers a rebalance of functions to workers

**Command:**

```shell
$ pulsar-admin functions-worker rebalance options
```

**Options:**

|Flag|Description|Default|
|---|---|---|

