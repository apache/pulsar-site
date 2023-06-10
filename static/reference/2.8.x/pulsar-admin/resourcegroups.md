------------

# resourcegroups

### Usage

`$resourcegroups`

------------

Operations about ResourceGroups

```shell
$ pulsar-admin resourcegroups subcommand
```

* `list`
* `get`
* `create`
* `update`
* `delete`

## list

List the existing resourcegroups

### Usage

------------

```shell
$ pulsar-admin resourcegroups list options
```

## get

Gets the configuration of a resourcegroup

### Usage

------------

```shell
$ pulsar-admin resourcegroups get options
```

## create

Creates a new resourcegroup

### Usage

------------

```shell
$ pulsar-admin resourcegroups create options
```

Options

| Flag                        | Description                                                        | Default |
|-----------------------------|--------------------------------------------------------------------|---------|
| `--msg-publish-rate, -mp`   | message-publish-rate (default -1 will be overwrite if not passed)  | -1      |
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)    | -1      |
| `--byte-publish-rate, -bp`  | byte-publish-rate (default -1 will be overwrite if not passed)     | -1      |
| `--msg-dispatch-rate, -md`  | message-dispatch-rate (default -1 will be overwrite if not passed) | -1      |

## update

Updates a resourcegroup

### Usage

------------

```shell
$ pulsar-admin resourcegroups update options
```

Options

| Flag                        | Description                                                        | Default |
|-----------------------------|--------------------------------------------------------------------|---------|
| `--byte-publish-rate, -bp`  | byte-publish-rate (default -1 will be overwrite if not passed)     | -1      |
| `--msg-publish-rate, -mp`   | message-publish-rate (default -1 will be overwrite if not passed)  | -1      |
| `--msg-dispatch-rate, -md`  | message-dispatch-rate (default -1 will be overwrite if not passed) | -1      |
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)    | -1      |

## delete

Deletes an existing ResourceGroup

### Usage

------------

```shell
$ pulsar-admin resourcegroups delete options
```


