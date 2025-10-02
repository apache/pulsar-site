------------

# transactions

### Usage

`$transactions`

------------

Operations on transactions

```shell
$ pulsar-admin transactions subcommand
```

* `coordinator-internal-stats`
* `pending-ack-internal-stats`
* `coordinator-stats`
* `transaction-buffer-stats`
* `pending-ack-stats`
* `transaction-in-buffer-stats`
* `transaction-in-pending-ack-stats`
* `transaction-metadata`
* `slow-transactions`

## coordinator-internal-stats

Get transaction coordinator internal stats

### Usage

------------

```shell
$ pulsar-admin transactions coordinator-internal-stats options
```

Options

| Flag                   | Description                     | Default |
|------------------------|---------------------------------|---------|
| `-c, --coordinator-id` | The coordinator id              | 0       |
| `-m, --metadata`       | Flag to include ledger metadata | false   |

## pending-ack-internal-stats

Get pending ack internal stats

### Usage

------------

```shell
$ pulsar-admin transactions pending-ack-internal-stats options
```

Options

| Flag             | Description                     | Default |
|------------------|---------------------------------|---------|
| `-s, --sub-name` | the subscription name           | null    |
| `-m, --metadata` | Flag to include ledger metadata | false   |
| `-t, --topic`    | the topic name                  | null    |

## coordinator-stats

Get transaction coordinator stats

### Usage

------------

```shell
$ pulsar-admin transactions coordinator-stats options
```

Options

| Flag                   | Description        | Default |
|------------------------|--------------------|---------|
| `-c, --coordinator-id` | the coordinator id | null    |

## transaction-buffer-stats

Get transaction buffer stats

### Usage

------------

```shell
$ pulsar-admin transactions transaction-buffer-stats options
```

Options

| Flag          | Description | Default |
|---------------|-------------|---------|
| `-t, --topic` | the topic   | null    |

## pending-ack-stats

Get transaction pending ack stats

### Usage

------------

```shell
$ pulsar-admin transactions pending-ack-stats options
```

Options

| Flag             | Description           | Default |
|------------------|-----------------------|---------|
| `-t, --topic`    | the topic             | null    |
| `-s, --sub-name` | the subscription name | null    |

## transaction-in-buffer-stats

Get transaction in buffer stats

### Usage

------------

```shell
$ pulsar-admin transactions transaction-in-buffer-stats options
```

Options

| Flag                   | Description        | Default |
|------------------------|--------------------|---------|
| `-l, --least-sig-bits` | the least sig bits | 0       |
| `-t, --topic`          | the topic          | null    |
| `-m, --most-sig-bits`  | the most sig bits  | 0       |

## transaction-in-pending-ack-stats

Get transaction in pending ack stats

### Usage

------------

```shell
$ pulsar-admin transactions transaction-in-pending-ack-stats options
```

Options

| Flag                   | Description           | Default |
|------------------------|-----------------------|---------|
| `-t, --topic`          | the topic name        | null    |
| `-s, --sub-name`       | the subscription name | null    |
| `-m, --most-sig-bits`  | the most sig bits     | 0       |
| `-l, --least-sig-bits` | the least sig bits    | 0       |

## transaction-metadata

Get transaction metadata

### Usage

------------

```shell
$ pulsar-admin transactions transaction-metadata options
```

Options

| Flag                   | Description        | Default |
|------------------------|--------------------|---------|
| `-m, --most-sig-bits`  | the most sig bits  | 0       |
| `-l, --least-sig-bits` | the least sig bits | 0       |

## slow-transactions

Get slow transactions.

### Usage

------------

```shell
$ pulsar-admin transactions slow-transactions options
```

Options

| Flag                   | Description                                             | Default |
|------------------------|---------------------------------------------------------|---------|
| `-c, --coordinator-id` | The coordinator id                                      | null    |
| `-t, --time`           | The transaction timeout time. (eg: 1s, 10s, 1m, 5h, 3d) | 1s      |

