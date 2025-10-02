------------

# schemas

### Usage

`$schemas`

------------

Operations about schemas

```shell
$ pulsar-admin schemas subcommand
```

* `get`
* `delete`
* `upload`
* `extract`

## get

Get the schema for a topic

### Usage

------------

```shell
$ pulsar-admin schemas get options
```

Options

| Flag                | Description | Default |
|---------------------|-------------|---------|
| `-a, --all-version` | all version | false   |
| `-v, --version`     | version     | null    |

## delete

Delete the latest schema for a topic

### Usage

------------

```shell
$ pulsar-admin schemas delete options
```

## upload

Update the schema for a topic

### Usage

------------

```shell
$ pulsar-admin schemas upload options
```

Options

| Flag             | Description | Default |
|------------------|-------------|---------|
| `-f, --filename` | filename    | null    |

## extract

Provide the schema via a topic

### Usage

------------

```shell
$ pulsar-admin schemas extract options
```

Options

| Flag                  | Description                                                            | Default |
|-----------------------|------------------------------------------------------------------------|---------|
| `-n, --dry-run`       | dost not apply to schema registry, just prints the post schema payload | false   |
| `-c, --classname`     | class name of pojo                                                     | null    |
| `-j, --jar`           | jar filepath                                                           | null    |
| `--always-allow-null` | set schema whether always allow null or not                            | true    |
| `-t, --type`          | type avro or json                                                      | null    |

