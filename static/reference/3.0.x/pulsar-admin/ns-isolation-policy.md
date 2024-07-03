# ns-isolation-policy

Operations about namespace isolation policy


```shell
$ pulsar-admin ns-isolation-policy subcommand
```



## set

Create/Update a namespace isolation policy for a cluster. This operation requires Pulsar super-user privileges

**Command:**

```shell
$ pulsar-admin ns-isolation-policy set options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--auto-failover-policy-type` | auto failover policy type name ['min_available']|null||
| `--namespaces` | comma separated namespaces-regex list|null||
| `--primary` | comma separated  primary-broker-regex list. In Pulsar, when namespaces (more specifically, namespace bundles) are assigned dynamically to brokers, the namespace isolation policy limits the set of brokers that can be used for assignment. Before topics are assigned to brokers, you can set the namespace isolation policy with a primary or a secondary regex to select desired brokers. If no broker matches the specified regex, you cannot create a topic. If there are not enough primary brokers, topics are assigned to secondary brokers. If there are not enough secondary brokers, topics are assigned to other brokers which do not have any isolation policies.|null||
| `--secondary` | comma separated secondary-broker-regex list|[]||
| `--auto-failover-policy-params` | comma separated name=value auto failover policy parameters|null||


## get

Get namespace isolation policy of a cluster. This operation requires Pulsar super-user privileges

**Command:**

```shell
$ pulsar-admin ns-isolation-policy get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## list

List all namespace isolation policies of a cluster. This operation requires Pulsar super-user privileges

**Command:**

```shell
$ pulsar-admin ns-isolation-policy list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## delete

Delete namespace isolation policy of a cluster. This operation requires Pulsar super-user privileges

**Command:**

```shell
$ pulsar-admin ns-isolation-policy delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## brokers

List all brokers with namespace-isolation policies attached to it. This operation requires Pulsar super-user privileges

**Command:**

```shell
$ pulsar-admin ns-isolation-policy brokers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## broker

Get broker with namespace-isolation policies attached to it. This operation requires Pulsar super-user privileges

**Command:**

```shell
$ pulsar-admin ns-isolation-policy broker options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--broker` | Broker-name to get namespace-isolation policies attached to it|null||

