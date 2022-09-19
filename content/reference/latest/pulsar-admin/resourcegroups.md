------------

# resourcegroups

### Usage

`$resourcegroups`

------------

Operations about ResourceGroups


```bdocs-tab:example_shell
$ pulsar-admin resourcegroups subcommand
```

* `list`
* `get`
* `create`
* `update`
* `delete`


## <em>list</em>

List the existing resourcegroups

### Usage

------------

**Command:**

```bdocs-tab:example_shell
$ pulsar-admin resourcegroups list options
```



## <em>get</em>

Gets the configuration of a resourcegroup

### Usage

------------

**Command:**

```bdocs-tab:example_shell
$ pulsar-admin resourcegroups get options
```



## <em>create</em>

Creates a new resourcegroup

### Usage

------------

**Command:**

```bdocs-tab:example_shell
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

### Usage

------------

**Command:**

```bdocs-tab:example_shell
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

### Usage

------------

**Command:**

```bdocs-tab:example_shell
$ pulsar-admin resourcegroups delete options
```


