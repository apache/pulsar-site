# transactions

Operations on transactions


```shell
$ pulsar-admin transactions subcommand
```



## coordinator-internal-stats

Get transaction coordinator internal stats

**Command:**

```shell
$ pulsar-admin transactions coordinator-internal-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-c, --coordinator-id` | The coordinator id|0||
| `-m, --metadata` | Flag to include ledger metadata|false||


## pending-ack-internal-stats

Get pending ack internal stats

**Command:**

```shell
$ pulsar-admin transactions pending-ack-internal-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription-name` | Subscription name|null||
| `-m, --metadata` | Flag to include ledger metadata|false||
| `-t, --topic` | Topic name|null||


## coordinator-stats

Get transaction coordinator stats

**Command:**

```shell
$ pulsar-admin transactions coordinator-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-c, --coordinator-id` | The coordinator id|null||


## transaction-buffer-stats

Get transaction buffer stats

**Command:**

```shell
$ pulsar-admin transactions transaction-buffer-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-l, --low-water-mark` | Whether to get information about lowWaterMarks stored in transaction buffer.|false||
| `-t, --topic` | The topic|null||


## pending-ack-stats

Get transaction pending ack stats

**Command:**

```shell
$ pulsar-admin transactions pending-ack-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --topic` | The topic name|null||
| `-s, --sub-name` | The subscription name|null||
| `-l, --low-water-mark` | Whether to get information about lowWaterMarks stored in transaction pending ack.|false||


## transaction-in-buffer-stats

Get transaction in buffer stats

**Command:**

```shell
$ pulsar-admin transactions transaction-in-buffer-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-l, --least-sig-bits` | The least sig bits|0||
| `-t, --topic` | The topic name|null||
| `-m, --most-sig-bits` | The most sig bits|0||


## transaction-in-pending-ack-stats

Get transaction in pending ack stats

**Command:**

```shell
$ pulsar-admin transactions transaction-in-pending-ack-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --topic` | The topic name|null||
| `-s, --sub-name` | The subscription name|null||
| `-m, --most-sig-bits` | The most sig bits|0||
| `-l, --least-sig-bits` | The least sig bits|0||


## transaction-metadata

Get transaction metadata

**Command:**

```shell
$ pulsar-admin transactions transaction-metadata options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --most-sig-bits` | The most sig bits|0||
| `-l, --least-sig-bits` | The least sig bits|0||


## slow-transactions

Get slow transactions.

**Command:**

```shell
$ pulsar-admin transactions slow-transactions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-c, --coordinator-id` | The coordinator id|null||
| `-t, --time` | The transaction timeout time. (eg: 1s, 10s, 1m, 5h, 3d)|1s||


## scale-transactionCoordinators

Update the scale of transaction coordinators

**Command:**

```shell
$ pulsar-admin transactions scale-transactionCoordinators options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-r, --replicas` | The scale of the transaction coordinators|0||


## position-stats-in-pending-ack

Get the position stats in transaction pending ack

**Command:**

```shell
$ pulsar-admin transactions position-stats-in-pending-ack options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-e, --entry-id` | Entry ID of the position|null||
| `-b, --batch-index` | Batch index of the position|null||
| `-t, --topic` | The topic name|null||
| `-l, --ledger-id` | Ledger ID of the position|null||
| `-s, --subscription-name` | Subscription name|null||


## coordinators-list

List transaction coordinators

**Command:**

```shell
$ pulsar-admin transactions coordinators-list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|

