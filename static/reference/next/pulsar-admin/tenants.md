# tenants

Operations about tenants


```shell
$ pulsar-admin tenants subcommand
```



## list

List the existing tenants

**Command:**

```shell
$ pulsar-admin tenants list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get

Gets the configuration of a tenant

**Command:**

```shell
$ pulsar-admin tenants get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## create

Creates a new tenant

**Command:**

```shell
$ pulsar-admin tenants create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--admin-roles, -r]` | Comma separated list of auth principal allowed to administrate the tenant|null|
| `[--allowed-clusters, -c]` | Comma separated allowed clusters. If empty, the tenant will have access to all clusters|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## update

Updates the configuration for a tenant

**Command:**

```shell
$ pulsar-admin tenants update options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--admin-roles, -r]` | Comma separated list of auth principal allowed to administrate the tenant. If empty the current set of roles won't be modified|null|
| `[--allowed-clusters, -c]` | Comma separated allowed clusters. If omitted, the current set of clusters will be preserved|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## delete

Deletes an existing tenant

**Command:**

```shell
$ pulsar-admin tenants delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-f, --force]` | Delete a tenant forcefully by deleting all namespaces under it.|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

