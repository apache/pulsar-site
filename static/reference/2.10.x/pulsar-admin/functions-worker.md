------------

# functions-worker

### Usage

`$functions-worker`

------------

Operations to collect function-worker statistics

```shell
$ pulsar-admin functions-worker subcommand
```

* `function-stats`
* `monitoring-metrics`
* `get-cluster`
* `get-cluster-leader`
* `get-function-assignments`

## function-stats

Dump all functions stats running on this broker

### Usage

------------

```shell
$ pulsar-admin functions-worker function-stats options
```

## monitoring-metrics

Dump metrics for Monitoring

### Usage

------------

```shell
$ pulsar-admin functions-worker monitoring-metrics options
```

## get-cluster

Get all workers belonging to this cluster

### Usage

------------

```shell
$ pulsar-admin functions-worker get-cluster options
```

## get-cluster-leader

Get the leader of the worker cluster

### Usage

------------

```shell
$ pulsar-admin functions-worker get-cluster-leader options
```

## get-function-assignments

Get the assignments of the functions across the worker cluster

### Usage

------------

```shell
$ pulsar-admin functions-worker get-function-assignments options
```


