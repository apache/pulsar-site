------------

# bookies

### Usage

`$bookies`

------------

Operations about bookies rack placement

```shell
$ pulsar-admin bookies subcommand
```

* `racks-placement`
* `list-bookies`
* `get-bookie-rack`
* `delete-bookie-rack`
* `set-bookie-rack`

## racks-placement

Gets the rack placement information for all the bookies in the cluster

### Usage

------------

```shell
$ pulsar-admin bookies racks-placement options
```

## list-bookies

List bookies

### Usage

------------

```shell
$ pulsar-admin bookies list-bookies options
```

## get-bookie-rack

Gets the rack placement information for a specific bookie in the cluster

### Usage

------------

```shell
$ pulsar-admin bookies get-bookie-rack options
```

Options

| Flag           | Description                             | Default |
|----------------|-----------------------------------------|---------|
| `-b, --bookie` | Bookie address (format: `address:port`) | null    |

## delete-bookie-rack

Remove rack placement information for a specific bookie in the cluster

### Usage

------------

```shell
$ pulsar-admin bookies delete-bookie-rack options
```

Options

| Flag           | Description                             | Default |
|----------------|-----------------------------------------|---------|
| `-b, --bookie` | Bookie address (format: `address:port`) | null    |

## set-bookie-rack

Updates the rack placement information for a specific bookie in the cluster (note. bookie address format:`address:port`)

### Usage

------------

```shell
$ pulsar-admin bookies set-bookie-rack options
```

Options

| Flag           | Description                             | Default |
|----------------|-----------------------------------------|---------|
| `-b, --bookie` | Bookie address (format: `address:port`) | null    |
| `-g, --group`  | Bookie group name                       | default |
| `-r, --rack`   | Bookie rack name                        | null    |
| `--hostname`   | Bookie host name                        | null    |

