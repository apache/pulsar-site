------------

# proxy-stats

### Usage

`$proxy-stats`

------------

Operations to collect Proxy statistics

```shell
$ pulsar-admin proxy-stats subcommand
```

* `connections`
* `topics`

## connections

dump connections metrics for Monitoring

### Usage

------------

```shell
$ pulsar-admin proxy-stats connections options
```

Options

| Flag           | Description        | Default |
|----------------|--------------------|---------|
| `-i, --indent` | Indent JSON output | false   |

## topics

dump topics metrics for Monitoring

### Usage

------------

```shell
$ pulsar-admin proxy-stats topics options
```

Options

| Flag           | Description        | Default |
|----------------|--------------------|---------|
| `-i, --indent` | Indent JSON output | false   |

