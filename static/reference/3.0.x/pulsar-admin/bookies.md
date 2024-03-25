# bookies

Operations about bookies rack placement


```shell
$ pulsar-admin bookies subcommand
```



## racks-placement

Gets the rack placement information for all the bookies in the cluster

**Command:**

```shell
$ pulsar-admin bookies racks-placement options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## list-bookies

List bookies

**Command:**

```shell
$ pulsar-admin bookies list-bookies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-bookie-rack

Gets the rack placement information for a specific bookie in the cluster

**Command:**

```shell
$ pulsar-admin bookies get-bookie-rack options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-b, --bookie` | Bookie address (format: `address:port`)|null||


## delete-bookie-rack

Remove rack placement information for a specific bookie in the cluster

**Command:**

```shell
$ pulsar-admin bookies delete-bookie-rack options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-b, --bookie` | Bookie address (format: `address:port`)|null||


## set-bookie-rack

Updates the rack placement information for a specific bookie in the cluster (note. bookie address format:`address:port`)

**Command:**

```shell
$ pulsar-admin bookies set-bookie-rack options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-b, --bookie` | Bookie address (format: `address:port`)|null||
| `-g, --group` | Bookie group name|default||
| `-r, --rack` | Bookie rack name. If you set a bookie rack name to slash (/) or an empty string (""): when using Pulsar earlier than 2.7.5, 2.8.3, and 2.9.2, an exception is thrown; if you use Pulsar 2.7.5, 2.8.3, 2.9.2 or later versions, it falls back to /default-rack or /default-region/default-rack.When `RackawareEnsemblePlacementPolicy` is enabled, the rack name is not allowed to contain slash (/) except for the beginning and end of the rack name string. For example, rack name like /rack0 is okay, but /rack/0 is not allowed. When `RegionawareEnsemblePlacementPolicy` is enabled, the rack name can only contain one slash (/) except for the beginning and end of the rack name string. For example, rack name like /region0/rack0 is okay, but /region0rack0 and /region0/rack/0 are not allowed.|null||
| `-hn, --hostname` | Bookie host name|null||

