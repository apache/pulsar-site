------------

# brokers

### Usage

`$brokers`

------------

Operations about brokers

```shell
$ pulsar-admin brokers subcommand
```

* `list`
* `leader-broker`
* `namespaces`
* `update-dynamic-config`
* `delete-dynamic-config`
* `list-dynamic-config`
* `get-all-dynamic-config`
* `get-internal-config`
* `get-runtime-config`
* `healthcheck`
* `backlog-quota-check`
* `version`

## list

List active brokers of the cluster

### Usage

------------

```shell
$ pulsar-admin brokers list options
```

## leader-broker

Get the information of the leader broker

### Usage

------------

```shell
$ pulsar-admin brokers leader-broker options
```

## namespaces

List namespaces owned by the broker

### Usage

------------

```shell
$ pulsar-admin brokers namespaces options
```

Options

| Flag    | Description | Default |
|---------|-------------|---------|
| `--url` | broker-url  | null    |

## update-dynamic-config

Update dynamic-serviceConfiguration of broker

### Usage

------------

```shell
$ pulsar-admin brokers update-dynamic-config options
```

Options

| Flag       | Description                 | Default |
|------------|-----------------------------|---------|
| `--config` | service-configuration name  | null    |
| `--value`  | service-configuration value | null    |

## delete-dynamic-config

Delete dynamic-serviceConfiguration of broker

### Usage

------------

```shell
$ pulsar-admin brokers delete-dynamic-config options
```

Options

| Flag       | Description                | Default |
|------------|----------------------------|---------|
| `--config` | service-configuration name | null    |

## list-dynamic-config

Get list of updatable configuration name

### Usage

------------

```shell
$ pulsar-admin brokers list-dynamic-config options
```

## get-all-dynamic-config

Get all overridden dynamic-configuration values

### Usage

------------

```shell
$ pulsar-admin brokers get-all-dynamic-config options
```

## get-internal-config

Get internal configuration information

### Usage

------------

```shell
$ pulsar-admin brokers get-internal-config options
```

## get-runtime-config

Get runtime configuration values

### Usage

------------

```shell
$ pulsar-admin brokers get-runtime-config options
```

## healthcheck

Run a health check against the broker

### Usage

------------

```shell
$ pulsar-admin brokers healthcheck options
```

Options

| Flag              | Description                 | Default |
|-------------------|-----------------------------|---------|
| `--topic-version` | topic version V1 is default | null    |

## backlog-quota-check

Manually trigger backlogQuotaCheck

### Usage

------------

```shell
$ pulsar-admin brokers backlog-quota-check options
```

## version

Get the version of the currently connected broker

### Usage

------------

```shell
$ pulsar-admin brokers version options
```


