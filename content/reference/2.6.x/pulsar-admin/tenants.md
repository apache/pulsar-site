------------

# tenants

### Usage

`$tenants`

------------

Operations about tenants

```shell
$ pulsar-admin tenants subcommand
```

* `list`
* `get`
* `create`
* `update`
* `delete`

## list

List the existing tenants

### Usage

------------

```shell
$ pulsar-admin tenants list options
```

## get

Gets the configuration of a tenant

### Usage

------------

```shell
$ pulsar-admin tenants get options
```

## create

Creates a new tenant

### Usage

------------

```shell
$ pulsar-admin tenants create options
```

Options

| Flag                     | Description                                                                             | Default |
|--------------------------|-----------------------------------------------------------------------------------------|---------|
| `--allowed-clusters, -c` | Comma separated allowed clusters. If empty, the tenant will have access to all clusters | null    |
| `--admin-roles, -r`      | Comma separated list of auth principal allowed to administrate the tenant               | null    |

## update

Updates the configuration for a tenant

### Usage

------------

```shell
$ pulsar-admin tenants update options
```

Options

| Flag                     | Description                                                                                                                    | Default |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------|---------|
| `--allowed-clusters, -c` | Comma separated allowed clusters. If omitted, the current set of clusters will be preserved                                    | null    |
| `--admin-roles, -r`      | Comma separated list of auth principal allowed to administrate the tenant. If empty the current set of roles won't be modified | null    |

## delete

Deletes an existing tenant

### Usage

------------

```shell
$ pulsar-admin tenants delete options
```

Options

| Flag          | Description                                                     | Default |
|---------------|-----------------------------------------------------------------|---------|
| `-f, --force` | Delete a tenant forcefully by deleting all namespaces under it. | false   |

