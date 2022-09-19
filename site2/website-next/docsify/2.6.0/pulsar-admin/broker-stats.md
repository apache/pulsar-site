------------

# broker-stats

### Usage

`$broker-stats`

------------

Operations to collect broker statistics


```bdocs-tab:example_shell
$ pulsar-admin broker-stats subcommand
```

* `monitoring-metrics`
* `mbeans`
* `topics`
* `allocator-stats`
* `load-report`


## <em>monitoring-metrics</em>

dump metrics for Monitoring

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin broker-stats monitoring-metrics options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-i, --indent` | Indent JSON output|false|


## <em>mbeans</em>

dump mbean stats

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin broker-stats mbeans options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-i, --indent` | Indent JSON output|false|


## <em>topics</em>

dump topics stats

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin broker-stats topics options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-i, --indent` | Indent JSON output|false|


## <em>allocator-stats</em>

dump allocator stats

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin broker-stats allocator-stats options
```



## <em>load-report</em>

dump broker load-report

### Usage

------------


```bdocs-tab:example_shell
$ pulsar-admin broker-stats load-report options
```


