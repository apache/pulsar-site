------------

# functions-worker

### Usage

`$functions-worker`

------------

Operations to collect function-worker statistics


```bdocs-tab:example_shell
$ pulsar-admin functions-worker subcommand
```

* `function-stats`
* `monitoring-metrics`
* `get-cluster`
* `get-cluster-leader`
* `get-function-assignments`
* `rebalance`


## <em>function-stats</em>

Dump all functions stats running on this broker

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin functions-worker function-stats options
```



## <em>monitoring-metrics</em>

Dump metrics for Monitoring

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin functions-worker monitoring-metrics options
```



## <em>get-cluster</em>

Get all workers belonging to this cluster

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin functions-worker get-cluster options
```



## <em>get-cluster-leader</em>

Get the leader of the worker cluster

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin functions-worker get-cluster-leader options
```



## <em>get-function-assignments</em>

Get the assignments of the functions across the worker cluster

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin functions-worker get-function-assignments options
```



## <em>rebalance</em>

Triggers a rebalance of functions to workers

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin functions-worker rebalance options
```


