------------

# broker-stats

### Usage

`$broker-stats`

------------

Operations to collect broker statistics

```shell
$ pulsar-admin broker-stats subcommand
```

* `monitoring-metrics`
* `mbeans`
* `topics`
* `allocator-stats`
* `load-report`

## monitoring-metrics

dump metrics for Monitoring

### Usage

------------

```shell
$ pulsar-admin broker-stats monitoring-metrics options
```

Options

| Flag           | Description        | Default |
|----------------|--------------------|---------|
| `-i, --indent` | Indent JSON output | false   |

## mbeans

dump mbean stats

### Usage

------------

```shell
$ pulsar-admin broker-stats mbeans options
```

Options

| Flag           | Description        | Default |
|----------------|--------------------|---------|
| `-i, --indent` | Indent JSON output | false   |

## topics

dump topics stats

### Usage

------------

```shell
$ pulsar-admin broker-stats topics options
```

Options

| Flag           | Description        | Default |
|----------------|--------------------|---------|
| `-i, --indent` | Indent JSON output | false   |

## allocator-stats

dump allocator stats

### Usage

------------

```shell
$ pulsar-admin broker-stats allocator-stats options
```

## load-report

dump broker load-report

### Usage

------------

```shell
$ pulsar-admin broker-stats load-report options
```


