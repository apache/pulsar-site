# brokers

Operations about brokers


```shell
$ pulsar-admin brokers subcommand
```



## <em>list</em>

List active brokers of the cluster

**Command:**

```shell
$ pulsar-admin brokers list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>leader-broker</em>

Get the information of the leader broker

**Command:**

```shell
$ pulsar-admin brokers leader-broker options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>namespaces</em>

List namespaces owned by the broker

**Command:**

```shell
$ pulsar-admin brokers namespaces options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-u, --url` | broker-url|null||


## <em>update-dynamic-config</em>

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


## <em>delete-dynamic-config</em>

Delete dynamic-serviceConfiguration of broker

**Command:**

```shell
$ pulsar-admin brokers delete-dynamic-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-c, --config` | service-configuration name|null||


## <em>list-dynamic-config</em>

Get list of updatable configuration name

**Command:**

```shell
$ pulsar-admin brokers list-dynamic-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-all-dynamic-config</em>

Get all overridden dynamic-configuration values

**Command:**

```shell
$ pulsar-admin brokers get-all-dynamic-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-internal-config</em>

Get internal configuration information

**Command:**

```shell
$ pulsar-admin brokers get-internal-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-runtime-config</em>

Get runtime configuration values

**Command:**

```shell
$ pulsar-admin brokers get-runtime-config options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>healthcheck</em>

Run a health check against the broker

**Command:**

```shell
$ pulsar-admin brokers healthcheck options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-tv, --topic-version` | topic version V1 is default|null||


## <em>backlog-quota-check</em>

Manually trigger backlogQuotaCheck

**Command:**

```shell
$ pulsar-admin brokers backlog-quota-check options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>version</em>

Get the version of the currently connected broker

**Command:**

```shell
$ pulsar-admin brokers version options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>shutdown</em>

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

