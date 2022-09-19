------------

# proxy-stats

### Usage

`$proxy-stats`

------------

Operations to collect Proxy statistics


```bdocs-tab:example_shell
$ pulsar-admin proxy-stats subcommand
```

* `connections`
* `topics`


## <em>connections</em>

dump connections metrics for Monitoring

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin proxy-stats connections options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-i, --indent` | Indent JSON output|false|


## <em>topics</em>

dump topics metrics for Monitoring

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin proxy-stats topics options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-i, --indent` | Indent JSON output|false|

