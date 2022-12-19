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

## <em>list</em>

List active brokers of the cluster

### Usage

------------

```shell
$ pulsar-admin brokers list options
```

## <em>leader-broker</em>

Get the information of the leader broker

### Usage

------------

```shell
$ pulsar-admin brokers leader-broker options
```

## <em>namespaces</em>

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

## <em>update-dynamic-config</em>

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

## <em>delete-dynamic-config</em>

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

## <em>list-dynamic-config</em>

Get list of updatable configuration name

### Usage

------------

```shell
$ pulsar-admin brokers list-dynamic-config options
```

## <em>get-all-dynamic-config</em>

Get all overridden dynamic-configuration values

### Usage

------------

```shell
$ pulsar-admin brokers get-all-dynamic-config options
```

## <em>get-internal-config</em>

Get internal configuration information

### Usage

------------

```shell
$ pulsar-admin brokers get-internal-config options
```

## <em>get-runtime-config</em>

Get runtime configuration values

### Usage

------------

```shell
$ pulsar-admin brokers get-runtime-config options
```

## <em>healthcheck</em>

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

## <em>backlog-quota-check</em>

Manually trigger backlogQuotaCheck

### Usage

------------

```shell
$ pulsar-admin brokers backlog-quota-check options
```

## <em>version</em>

Get the version of the currently connected broker

### Usage

------------

```shell
$ pulsar-admin brokers version options
```


