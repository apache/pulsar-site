# resource-quotas

Operations about resource quotas


```shell
$ pulsar-admin resource-quotas subcommand
```



## <em>get</em>

Get the resource quota for specified namespace bundle, or default quota if no namespace/bundle specified.

**Command:**

```shell
$ pulsar-admin resource-quotas get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--namespace, -n` | tenant/namespace, must be specified together with '--bundle'|null||
| `--bundle, -b` | {start-boundary}_{end-boundary}, must be specified together with '--namespace'|null||


## <em>set</em>

Set the resource quota for specified namespace bundle, or default quota if no namespace/bundle specified.

**Command:**

```shell
$ pulsar-admin resource-quotas set options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--msgRateIn, -mi` | expected incoming messages per second|0||
| `--bandwidthIn, -bi` | expected inbound bandwidth (bytes/second)|0||
| `--msgRateOut, -mo` | expected outgoing messages per second|0||
| `--namespace, -n` | tenant/namespace, must be specified together with '--bundle'|null||
| `--bundle, -b` | {start-boundary}_{end-boundary}, must be specified together with '--namespace'|null||
| `--memory, -mem` | expected memory usage (Mbytes)|0||
| `--dynamic, -d` | dynamic (allow to be dynamically re-calculated) or not|false||
| `--bandwidthOut, -bo` | expected outbound bandwidth (bytes/second)|0||


## <em>reset-namespace-bundle-quota</em>

Reset the specified namespace bundle's resource quota to default value.

**Command:**

```shell
$ pulsar-admin resource-quotas reset-namespace-bundle-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--bundle, -b` | {start-boundary}_{end-boundary}|null||
| `--namespace, -n` | tenant/namespace|null||

