# migration

Operations for metadata store migration


```shell
$ pulsar-admin migration subcommand
```



## start

Start metadata store migration to target

**Command:**

```shell
$ pulsar-admin migration start options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--target]` | Target metadata store URL (e.g., oxia://host:port/namespace)|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## status

Check migration status

**Command:**

```shell
$ pulsar-admin migration status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

