# resourcegroups

Operations about ResourceGroups


```shell
$ pulsar-admin resourcegroups subcommand
```



## <em>list</em>

List the existing resourcegroups

**Command:**

```shell
$ pulsar-admin resourcegroups list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get</em>

Gets the configuration of a resourcegroup

**Command:**

```shell
$ pulsar-admin resourcegroups get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>create</em>

Creates a new resourcegroup

**Command:**

```shell
$ pulsar-admin resourcegroups create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--msg-publish-rate, -mp` | message-publish-rate (default -1 will be overwrite if not passed)|null||
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|null||
| `--byte-publish-rate, -bp` | byte-publish-rate (default -1 will be overwrite if not passed)|null||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|null||


## <em>update</em>

Updates a resourcegroup

**Command:**

```shell
$ pulsar-admin resourcegroups update options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--byte-publish-rate, -bp` | byte-publish-rate |null||
| `--msg-publish-rate, -mp` | message-publish-rate |null||
| `--msg-dispatch-rate, -md` | message-dispatch-rate |null||
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate |null||


## <em>delete</em>

Deletes an existing ResourceGroup

**Command:**

```shell
$ pulsar-admin resourcegroups delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|

