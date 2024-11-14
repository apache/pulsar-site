# brokers

Operations about brokers


```shell
$ pulsar-admin brokers subcommand
```



## list

List active brokers of the cluster

**Command:**

```shell
$ pulsar-admin brokers list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## leader-broker

Get the information of the leader broker

**Command:**

```shell
$ pulsar-admin brokers leader-broker options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## namespaces

List namespaces owned by the broker

**Command:**

```shell
$ pulsar-admin brokers namespaces options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-u, --url` | broker-url|null||


## update-dynamic-config

Update dynamic-serviceConfiguration of broker

**Command:**

```shell
$ pulsar-admin brokers update-dynamic-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-c, --config` | service-configuration name|null||
| `-v, --value` | service-configuration value|null||


## delete-dynamic-config

Delete dynamic-serviceConfiguration of broker

**Command:**

```shell
$ pulsar-admin brokers delete-dynamic-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-c, --config` | service-configuration name|null||


## list-dynamic-config

Get list of updatable configuration name

**Command:**

```shell
$ pulsar-admin brokers list-dynamic-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-all-dynamic-config

Get all overridden dynamic-configuration values

**Command:**

```shell
$ pulsar-admin brokers get-all-dynamic-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-internal-config

Get internal configuration information

**Command:**

```shell
$ pulsar-admin brokers get-internal-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-runtime-config

Get runtime configuration values

**Command:**

```shell
$ pulsar-admin brokers get-runtime-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## healthcheck

Run a health check against the broker

**Command:**

```shell
$ pulsar-admin brokers healthcheck options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-tv, --topic-version` | topic version V1 is default|null||


## backlog-quota-check

Manually trigger backlogQuotaCheck

**Command:**

```shell
$ pulsar-admin brokers backlog-quota-check options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## version

Get the version of the currently connected broker

**Command:**

```shell
$ pulsar-admin brokers version options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## shutdown

Shutdown broker gracefully.

**Command:**

```shell
$ pulsar-admin brokers shutdown options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-concurrent-unload-per-sec, -m` | Max concurrent unload per second, if the value absent(value=0) means no concurrent limitation|0||
| `--forced-terminate-topic, -f` | Force terminate all topics on Broker|false||

