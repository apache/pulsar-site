------------

# clusters

### Usage

`$clusters`

------------

Operations about clusters

```shell
$ pulsar-admin clusters subcommand
```

* `get`
* `create`
* `update`
* `delete`
* `list`
* `update-peer-clusters`
* `get-peer-clusters`
* `get-failure-domain`
* `create-failure-domain`
* `update-failure-domain`
* `delete-failure-domain`
* `list-failure-domains`

## <em>get</em>

Get the configuration data for the specified cluster

### Usage

------------

```shell
$ pulsar-admin clusters get options
```

## <em>create</em>

Provisions a new cluster. This operation requires Pulsar super-user privileges

### Usage

------------

```shell
$ pulsar-admin clusters create options
```

Options

| Flag                         | Description                                                              | Default |
|------------------------------|--------------------------------------------------------------------------|---------|
| `--listener-name`            | listenerName when client would like to connect to cluster                | null    |
| `--proxy-url`                | Proxy-service url when client would like to connect to broker via proxy. | null    |
| `--tls-trust-store-type`     | TLS TrustStore type configuration for internal client eg: JKS            | null    |
| `--tls-enable`               | Enable tls connection                                                    | null    |
| `--auth-parameters`          | authentication parameters                                                | null    |
| `--proxy-protocol`           | protocol to decide type of proxy routing eg: SNI                         | null    |
| `--tls-allow-insecure`       | Allow insecure tls connection                                            | null    |
| `--url`                      | service-url                                                              | null    |
| `--broker-url`               | broker-service-url                                                       | null    |
| `--auth-plugin`              | authentication plugin                                                    | null    |
| `--tls-trust-certs-filepath` | path for the trusted TLS certificate file                                | null    |
| `--cluster-config-file`      | The path to a YAML config file specifying the cluster's configuration    | null    |
| `--tls-enable-keystore`      | Whether use KeyStore type to authenticate                                | null    |
| `--tls-trust-store-pwd`      | TLS TrustStore password for internal client                              | null    |
| `--tls-trust-store`          | TLS TrustStore path for internal client                                  | null    |
| `--broker-url-secure`        | broker-service-url for secure connection                                 | null    |
| `--url-secure`               | service-url for secure connection                                        | null    |

## <em>update</em>

Update the configuration for a cluster

### Usage

------------

```shell
$ pulsar-admin clusters update options
```

Options

| Flag                         | Description                                                              | Default |
|------------------------------|--------------------------------------------------------------------------|---------|
| `--listener-name`            | listenerName when client would like to connect to cluster                | null    |
| `--proxy-url`                | Proxy-service url when client would like to connect to broker via proxy. | null    |
| `--tls-trust-store-type`     | TLS TrustStore type configuration for internal client eg: JKS            | null    |
| `--tls-enable`               | Enable tls connection                                                    | null    |
| `--auth-parameters`          | authentication parameters                                                | null    |
| `--proxy-protocol`           | protocol to decide type of proxy routing eg: SNI                         | null    |
| `--tls-allow-insecure`       | Allow insecure tls connection                                            | null    |
| `--url`                      | service-url                                                              | null    |
| `--broker-url`               | broker-service-url                                                       | null    |
| `--auth-plugin`              | authentication plugin                                                    | null    |
| `--tls-trust-certs-filepath` | path for the trusted TLS certificate file                                | null    |
| `--cluster-config-file`      | The path to a YAML config file specifying the cluster's configuration    | null    |
| `--tls-enable-keystore`      | Whether use KeyStore type to authenticate                                | null    |
| `--tls-trust-store-pwd`      | TLS TrustStore password for internal client                              | null    |
| `--tls-trust-store`          | TLS TrustStore path for internal client                                  | null    |
| `--broker-url-secure`        | broker-service-url for secure connection                                 | null    |
| `--url-secure`               | service-url for secure connection                                        | null    |

## <em>delete</em>

Deletes an existing cluster

### Usage

------------

```shell
$ pulsar-admin clusters delete options
```

Options

| Flag        | Description                              | Default |
|-------------|------------------------------------------|---------|
| `-a, --all` | Delete all data (tenants) of the cluster | false   |

## <em>list</em>

List the existing clusters

### Usage

------------

```shell
$ pulsar-admin clusters list options
```

## <em>update-peer-clusters</em>

Update peer cluster names

### Usage

------------

```shell
$ pulsar-admin clusters update-peer-clusters options
```

Options

| Flag              | Description                                                              | Default |
|-------------------|--------------------------------------------------------------------------|---------|
| `--peer-clusters` | Comma separated peer-cluster names [Pass empty string "" to delete list] | null    |

## <em>get-peer-clusters</em>

Get list of peer-clusters

### Usage

------------

```shell
$ pulsar-admin clusters get-peer-clusters options
```

## <em>get-failure-domain</em>

Get the configuration brokers of a failure-domain

### Usage

------------

```shell
$ pulsar-admin clusters get-failure-domain options
```

Options

| Flag            | Description | Default |
|-----------------|-------------|---------|
| `--domain-name` | domain-name | null    |

## <em>create-failure-domain</em>

Create a new failure-domain for a cluster. updates it if already created.

### Usage

------------

```shell
$ pulsar-admin clusters create-failure-domain options
```

Options

| Flag            | Description                 | Default |
|-----------------|-----------------------------|---------|
| `--domain-name` | domain-name                 | null    |
| `--broker-list` | Comma separated broker list | null    |

## <em>update-failure-domain</em>

Update failure-domain for a cluster. Creates a new one if not exist.

### Usage

------------

```shell
$ pulsar-admin clusters update-failure-domain options
```

Options

| Flag            | Description                 | Default |
|-----------------|-----------------------------|---------|
| `--domain-name` | domain-name                 | null    |
| `--broker-list` | Comma separated broker list | null    |

## <em>delete-failure-domain</em>

Deletes an existing failure-domain

### Usage

------------

```shell
$ pulsar-admin clusters delete-failure-domain options
```

Options

| Flag            | Description | Default |
|-----------------|-------------|---------|
| `--domain-name` | domain-name | null    |

## <em>list-failure-domains</em>

List the existing failure-domains for a cluster

### Usage

------------

```shell
$ pulsar-admin clusters list-failure-domains options
```


