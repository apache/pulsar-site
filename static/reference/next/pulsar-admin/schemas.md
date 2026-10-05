# schemas

Operations about schemas


```shell
$ pulsar-admin schemas subcommand
```



## get

Get the schema for a topic

**Command:**

```shell
$ pulsar-admin schemas get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-v, --version]` | version|null|
| `[-a, --all-version]` | all version|false|


## delete

Delete all versions schema of a topic

**Command:**

```shell
$ pulsar-admin schemas delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-f, --force]` | whether to delete schema completely. If true, delete all resources (including metastore and ledger), otherwise only do a mark deletion and not remove any resources indeed|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## upload

Update the schema for a topic

**Command:**

```shell
$ pulsar-admin schemas upload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-f, --filename]` | filename|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## extract

Provide the schema via a topic

**Command:**

```shell
$ pulsar-admin schemas extract options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-j, --jar]` | jar filepath|null|
| `[-t, --type]` | type avro or json|null|
| `[-c, --classname]` | class name of pojo|null|
| `[-a, --always-allow-null]` | set schema whether always allow null or not|true|
| `[-n, --dry-run]` | dost not apply to schema registry, just prints the post schema payload|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## metadata

Get the schema for a topic

**Command:**

```shell
$ pulsar-admin schemas metadata options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## compatibility

Test schema compatibility

**Command:**

```shell
$ pulsar-admin schemas compatibility options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-f, --filename]` | filename|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

