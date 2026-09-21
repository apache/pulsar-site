# resource-quotas

Operations about resource quotas


```shell
$ pulsar-admin resource-quotas subcommand
```



## get

Get the resource quota for specified namespace bundle, or default quota if no namespace/bundle specified.

**Command:**

```shell
$ pulsar-admin resource-quotas get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--namespace, -n]` | tenant/namespace, must be specified together with '--bundle'|null|
| `[--bundle, -b]` | {start-boundary}_{end-boundary}, must be specified together with '--namespace'|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set

Set the resource quota for specified namespace bundle, or default quota if no namespace/bundle specified.

**Command:**

```shell
$ pulsar-admin resource-quotas set options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--namespace, -n]` | tenant/namespace, must be specified together with '--bundle'|null|
| `[--bundle, -b]` | {start-boundary}_{end-boundary}, must be specified together with '--namespace'|null|
| `[--msgRateIn, -mi]` | expected incoming messages per second|0|
| `[--msgRateOut, -mo]` | expected outgoing messages per second|0|
| `[--bandwidthIn, -bi]` | expected inbound bandwidth (bytes/second)|0|
| `[--bandwidthOut, -bo]` | expected outbound bandwidth (bytes/second)|0|
| `[--memory, -mem]` | expected memory usage (Mbytes)|0|
| `[--dynamic, -d]` | dynamic (allow to be dynamically re-calculated) or not|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## reset-namespace-bundle-quota

Reset the specified namespace bundle's resource quota to default value.

**Command:**

```shell
$ pulsar-admin resource-quotas reset-namespace-bundle-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--namespace, -n]` | tenant/namespace|null|
| `[--bundle, -b]` | {start-boundary}_{end-boundary}|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

