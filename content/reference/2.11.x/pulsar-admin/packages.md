# packages

Operations about packages


```shell
$ pulsar-admin packages subcommand
```



## get-metadata

Get a package metadata information.

**Command:**

```shell
$ pulsar-admin packages get-metadata options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## update-metadata

Update a package metadata information.

**Command:**

```shell
$ pulsar-admin packages update-metadata options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-d, --description` | descriptions of a package|null||
| `--properties, -P` | external information of a package|{}||
| `-c, --contact` | contact info of a package|null||


## upload

Upload a package

**Command:**

```shell
$ pulsar-admin packages upload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--contact` | contact information of a package|null||
| `--path` | file path of the package|null||
| `--properties, -P` | external infromations of a package|{}||
| `--description` | descriptions of a package|null||


## download

Download a package

**Command:**

```shell
$ pulsar-admin packages download options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--path` | download destiny path of the package|null||


## list

List all packages with given type in the specified namespace

**Command:**

```shell
$ pulsar-admin packages list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--type` | type of the package|null||


## list-versions

List all versions of the given package

**Command:**

```shell
$ pulsar-admin packages list-versions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## delete

Delete a package

**Command:**

```shell
$ pulsar-admin packages delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|

