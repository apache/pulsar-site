------------

# sources

### Usage

`$sources`

------------

Interface for managing Pulsar IO Sources (ingress data into Pulsar)

```shell
$ pulsar-admin sources subcommand
```

* `create`
* `update`
* `delete`
* `get`
* `status`
* `list`
* `stop`
* `start`
* `restart`
* `localrun`
* `available-sources`
* `reload`

## create

Submit a Pulsar IO source connector to run in a Pulsar cluster

### Usage

------------

```shell
$ pulsar-admin sources create options
```

Options

| Flag                          | Description                                                                                                                                                                                         | Default |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--processing-guarantees`     | The processing guarantees (aka delivery semantics) applied to the source                                                                                                                            | null    |
| `--disk`                      | The disk (in bytes) that need to be allocated per source instance (applicable only to Docker runtime)                                                                                               | null    |
| `--producer-config`           | The custom producer configuration (as a JSON string)                                                                                                                                                | null    |
| `--batch-builder`             | BatchBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT                                                                                 | null    |
| `--custom-runtime-options`    | A string that encodes options to customize the runtime, see docs for configured runtime for details                                                                                                 | null    |
| `--className`                 | The source's class name if archive is file-url-path (file://)                                                                                                                                       | null    |
| `--sourceConfigFile`          | The path to a YAML config file specifying the source's configuration                                                                                                                                | null    |
| `--source-config`             | Source config key/values                                                                                                                                                                            | null    |
| `--ram`                       | The RAM (in bytes) that need to be allocated per source instance (applicable only to the process and Docker runtimes)                                                                               | null    |
| `--secrets`                   | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider                                                                                   | null    |
| `--deserializationClassName`  | The SerDe classname for the source                                                                                                                                                                  | null    |
| `--processingGuarantees`      | The processing guarantees (aka delivery semantics) applied to the Source                                                                                                                            | null    |
| `--sourceConfig`              | Source config key/values                                                                                                                                                                            | null    |
| `-st, --schema-type`          | The schema type (either a builtin schema like 'avro', 'json', etc.. or custom Schema class name to be used to encode messages emitted from the source                                               | null    |
| `--batch-source-config`       | Batch source config key/values                                                                                                                                                                      | null    |
| `--deserialization-classname` | The SerDe classname for the source                                                                                                                                                                  | null    |
| `--cpu`                       | The CPU (in cores) that needs to be allocated per source instance (applicable only to Docker runtime)                                                                                               | null    |
| `-a, --archive`               | The path to the NAR archive for the Source. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package. | null    |
| `--source-config-file`        | The path to a YAML config file specifying the source's configuration                                                                                                                                | null    |
| `--parallelism`               | The source's parallelism factor (i.e. the number of source instances to run)                                                                                                                        | null    |
| `--namespace`                 | The source's namespace                                                                                                                                                                              | null    |
| `--name`                      | The source's name                                                                                                                                                                                   | null    |
| `--destination-topic-name`    | The Pulsar topic to which data is sent                                                                                                                                                              | null    |
| `-o, --destinationTopicName`  | The Pulsar topic to which data is sent                                                                                                                                                              | null    |
| `-t, --source-type`           | The source's connector provider                                                                                                                                                                     | null    |
| `--classname`                 | The source's class name if archive is file-url-path (file://)                                                                                                                                       | null    |
| `--tenant`                    | The source's tenant                                                                                                                                                                                 | null    |

## update

Update a Pulsar IO source connector

### Usage

------------

```shell
$ pulsar-admin sources update options
```

Options

| Flag                          | Description                                                                                                                                                                                         | Default |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--processing-guarantees`     | The processing guarantees (aka delivery semantics) applied to the source                                                                                                                            | null    |
| `--disk`                      | The disk (in bytes) that need to be allocated per source instance (applicable only to Docker runtime)                                                                                               | null    |
| `--producer-config`           | The custom producer configuration (as a JSON string)                                                                                                                                                | null    |
| `--batch-builder`             | BatchBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT                                                                                 | null    |
| `--custom-runtime-options`    | A string that encodes options to customize the runtime, see docs for configured runtime for details                                                                                                 | null    |
| `--className`                 | The source's class name if archive is file-url-path (file://)                                                                                                                                       | null    |
| `--sourceConfigFile`          | The path to a YAML config file specifying the source's configuration                                                                                                                                | null    |
| `--source-config`             | Source config key/values                                                                                                                                                                            | null    |
| `--ram`                       | The RAM (in bytes) that need to be allocated per source instance (applicable only to the process and Docker runtimes)                                                                               | null    |
| `--secrets`                   | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider                                                                                   | null    |
| `--deserializationClassName`  | The SerDe classname for the source                                                                                                                                                                  | null    |
| `--processingGuarantees`      | The processing guarantees (aka delivery semantics) applied to the Source                                                                                                                            | null    |
| `--sourceConfig`              | Source config key/values                                                                                                                                                                            | null    |
| `--update-auth-data`          | Whether or not to update the auth data                                                                                                                                                              | false   |
| `-st, --schema-type`          | The schema type (either a builtin schema like 'avro', 'json', etc.. or custom Schema class name to be used to encode messages emitted from the source                                               | null    |
| `--batch-source-config`       | Batch source config key/values                                                                                                                                                                      | null    |
| `--deserialization-classname` | The SerDe classname for the source                                                                                                                                                                  | null    |
| `--cpu`                       | The CPU (in cores) that needs to be allocated per source instance (applicable only to Docker runtime)                                                                                               | null    |
| `-a, --archive`               | The path to the NAR archive for the Source. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package. | null    |
| `--source-config-file`        | The path to a YAML config file specifying the source's configuration                                                                                                                                | null    |
| `--parallelism`               | The source's parallelism factor (i.e. the number of source instances to run)                                                                                                                        | null    |
| `--namespace`                 | The source's namespace                                                                                                                                                                              | null    |
| `--name`                      | The source's name                                                                                                                                                                                   | null    |
| `--destination-topic-name`    | The Pulsar topic to which data is sent                                                                                                                                                              | null    |
| `-o, --destinationTopicName`  | The Pulsar topic to which data is sent                                                                                                                                                              | null    |
| `-t, --source-type`           | The source's connector provider                                                                                                                                                                     | null    |
| `--classname`                 | The source's class name if archive is file-url-path (file://)                                                                                                                                       | null    |
| `--tenant`                    | The source's tenant                                                                                                                                                                                 | null    |

## delete

Stops a Pulsar IO source connector

### Usage

------------

```shell
$ pulsar-admin sources delete options
```

Options

| Flag          | Description            | Default |
|---------------|------------------------|---------|
| `--namespace` | The source's namespace | null    |
| `--name`      | The source's name      | null    |
| `--tenant`    | The source's tenant    | null    |

## get

Gets the information about a Pulsar IO source connector

### Usage

------------

```shell
$ pulsar-admin sources get options
```

Options

| Flag          | Description            | Default |
|---------------|------------------------|---------|
| `--namespace` | The source's namespace | null    |
| `--name`      | The source's name      | null    |
| `--tenant`    | The source's tenant    | null    |

## status

Check the current status of a Pulsar Source

### Usage

------------

```shell
$ pulsar-admin sources status options
```

Options

| Flag            | Description                                                                       | Default |
|-----------------|-----------------------------------------------------------------------------------|---------|
| `--instance-id` | The source instanceId (Get-status of all instances if instance-id is not provided | null    |
| `--namespace`   | The source's namespace                                                            | null    |
| `--name`        | The source's name                                                                 | null    |
| `--tenant`      | The source's tenant                                                               | null    |

## list

List all running Pulsar IO source connectors

### Usage

------------

```shell
$ pulsar-admin sources list options
```

Options

| Flag          | Description          | Default |
|---------------|----------------------|---------|
| `--namespace` | The sink's namespace | null    |
| `--tenant`    | The sink's tenant    | null    |

## stop

Stop source instance

### Usage

------------

```shell
$ pulsar-admin sources stop options
```

Options

| Flag            | Description                                                              | Default |
|-----------------|--------------------------------------------------------------------------|---------|
| `--instance-id` | The source instanceId (stop all instances if instance-id is not provided | null    |
| `--namespace`   | The source's namespace                                                   | null    |
| `--name`        | The source's name                                                        | null    |
| `--tenant`      | The source's tenant                                                      | null    |

## start

Start source instance

### Usage

------------

```shell
$ pulsar-admin sources start options
```

Options

| Flag            | Description                                                               | Default |
|-----------------|---------------------------------------------------------------------------|---------|
| `--instance-id` | The source instanceId (start all instances if instance-id is not provided | null    |
| `--namespace`   | The source's namespace                                                    | null    |
| `--name`        | The source's name                                                         | null    |
| `--tenant`      | The source's tenant                                                       | null    |

## restart

Restart source instance

### Usage

------------

```shell
$ pulsar-admin sources restart options
```

Options

| Flag            | Description                                                                 | Default |
|-----------------|-----------------------------------------------------------------------------|---------|
| `--instance-id` | The source instanceId (restart all instances if instance-id is not provided | null    |
| `--namespace`   | The source's namespace                                                      | null    |
| `--name`        | The source's name                                                           | null    |
| `--tenant`      | The source's tenant                                                         | null    |

## localrun

Run a Pulsar IO source connector locally (rather than deploying it to the Pulsar cluster)

### Usage

------------

```shell
$ pulsar-admin sources localrun options
```

Options

| Flag                              | Description                                                                                                                                                                                         | Default |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--processing-guarantees`         | The processing guarantees (aka delivery semantics) applied to the source                                                                                                                            | null    |
| `--disk`                          | The disk (in bytes) that need to be allocated per source instance (applicable only to Docker runtime)                                                                                               | null    |
| `--producer-config`               | The custom producer configuration (as a JSON string)                                                                                                                                                | null    |
| `--batch-builder`                 | BatchBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT                                                                                 | null    |
| `--custom-runtime-options`        | A string that encodes options to customize the runtime, see docs for configured runtime for details                                                                                                 | null    |
| `--className`                     | The source's class name if archive is file-url-path (file://)                                                                                                                                       | null    |
| `--sourceConfigFile`              | The path to a YAML config file specifying the source's configuration                                                                                                                                | null    |
| `--broker-service-url`            | The URL for the Pulsar broker                                                                                                                                                                       | null    |
| `--tls-allow-insecure`            | Allow insecure tls connection                                                                                                                                                                       | false   |
| `--secrets-provider-classname`    | Whats the classname for secrets provider                                                                                                                                                            | null    |
| `--clientAuthParams`              | Client authentication param                                                                                                                                                                         | null    |
| `--secrets-provider-config`       | Config that needs to be passed to secrets provider                                                                                                                                                  | null    |
| `--source-config`                 | Source config key/values                                                                                                                                                                            | null    |
| `--ram`                           | The RAM (in bytes) that need to be allocated per source instance (applicable only to the process and Docker runtimes)                                                                               | null    |
| `--secrets`                       | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider                                                                                   | null    |
| `--tls_allow_insecure`            | Allow insecure tls connection                                                                                                                                                                       | null    |
| `--deserializationClassName`      | The SerDe classname for the source                                                                                                                                                                  | null    |
| `--processingGuarantees`          | The processing guarantees (aka delivery semantics) applied to the Source                                                                                                                            | null    |
| `--use_tls`                       | Use tls connection                                                                                                                                                                                  | null    |
| `--use-tls`                       | Use tls connection                                                                                                                                                                                  | false   |
| `--sourceConfig`                  | Source config key/values                                                                                                                                                                            | null    |
| `-st, --schema-type`              | The schema type (either a builtin schema like 'avro', 'json', etc.. or custom Schema class name to be used to encode messages emitted from the source                                               | null    |
| `--batch-source-config`           | Batch source config key/values                                                                                                                                                                      | null    |
| `--deserialization-classname`     | The SerDe classname for the source                                                                                                                                                                  | null    |
| `--hostname-verification-enabled` | Enable hostname verification                                                                                                                                                                        | false   |
| `--cpu`                           | The CPU (in cores) that needs to be allocated per source instance (applicable only to Docker runtime)                                                                                               | null    |
| `--client-auth-plugin`            | Client authentication plugin using which function-process can connect to broker                                                                                                                     | null    |
| `--tls_trust_cert_path`           | tls trust cert file path                                                                                                                                                                            | null    |
| `--state-storage-service-url`     | The URL for the state storage service (the default is Apache BookKeeper)                                                                                                                            | null    |
| `-a, --archive`                   | The path to the NAR archive for the Source. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package. | null    |
| `--source-config-file`            | The path to a YAML config file specifying the source's configuration                                                                                                                                | null    |
| `--tls-trust-cert-path`           | tls trust cert file path                                                                                                                                                                            | null    |
| `--parallelism`                   | The source's parallelism factor (i.e. the number of source instances to run)                                                                                                                        | null    |
| `--namespace`                     | The source's namespace                                                                                                                                                                              | null    |
| `--client-auth-params`            | Client authentication param                                                                                                                                                                         | null    |
| `--brokerServiceUrl`              | The URL for the Pulsar broker                                                                                                                                                                       | null    |
| `--name`                          | The source's name                                                                                                                                                                                   | null    |
| `--metrics-port-start`            | The starting port range for metrics server                                                                                                                                                          | null    |
| `--destination-topic-name`        | The Pulsar topic to which data is sent                                                                                                                                                              | null    |
| `--clientAuthPlugin`              | Client authentication plugin using which function-process can connect to broker                                                                                                                     | null    |
| `-o, --destinationTopicName`      | The Pulsar topic to which data is sent                                                                                                                                                              | null    |
| `-t, --source-type`               | The source's connector provider                                                                                                                                                                     | null    |
| `--hostname_verification_enabled` | Enable hostname verification                                                                                                                                                                        | null    |
| `--classname`                     | The source's class name if archive is file-url-path (file://)                                                                                                                                       | null    |
| `--tenant`                        | The source's tenant                                                                                                                                                                                 | null    |

## available-sources

Get the list of Pulsar IO connector sources supported by Pulsar cluster

### Usage

------------

```shell
$ pulsar-admin sources available-sources options
```

## reload

Reload the available built-in connectors

### Usage

------------

```shell
$ pulsar-admin sources reload options
```


