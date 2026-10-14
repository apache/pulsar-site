------------

# functions

### Usage

`$functions`

------------

Interface for managing Pulsar Functions (lightweight, Lambda-style compute processes that work with Pulsar)

```shell
$ pulsar-admin functions subcommand
```

* `localrun`
* `create`
* `delete`
* `update`
* `get`
* `restart`
* `stop`
* `start`
* `status`
* `stats`
* `list`
* `querystate`
* `putstate`
* `trigger`
* `upload`
* `download`

## localrun

Run a Pulsar Function locally, rather than deploy to a Pulsar cluster)

### Usage

------------

```shell
$ pulsar-admin functions localrun options
```

Options

| Flag                                | Description                                                                                                                                                                                                                                                                                                             | Default |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--hostname_verification_enabled`   | Enable hostname verification                                                                                                                                                                                                                                                                                            | null    |
| `--custom-schema-outputs`           | The map of input topics to Schema properties (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--processingGuarantees`            | The processing guarantees (aka delivery semantics) applied to the function                                                                                                                                                                                                                                              | null    |
| `--window-length-duration-ms`       | The time duration of the window in milliseconds                                                                                                                                                                                                                                                                         | null    |
| `--batch-builder`                   | BatcherBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT                                                                                                                                                                                                   | null    |
| `--custom-schema-inputs`            | The map of input topics to Schema properties (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--window-length-count`             | The number of messages per window                                                                                                                                                                                                                                                                                       | null    |
| `--forward-source-message-property` | Forwarding input message's properties to output topic when processing (use false to disable it)                                                                                                                                                                                                                         | true    |
| `--brokerServiceUrl`                | The URL for Pulsar broker                                                                                                                                                                                                                                                                                               | null    |
| `--metrics-port-start`              | The starting port range for metrics server                                                                                                                                                                                                                                                                              | null    |
| `--secrets`                         | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider                                                                                                                                                                                                       | null    |
| `--tls_allow_insecure`              | Allow insecure tls connection                                                                                                                                                                                                                                                                                           | null    |
| `--instanceIdOffset`                | Start the instanceIds from this offset                                                                                                                                                                                                                                                                                  | null    |
| `--ram`                             | The ram in bytes that need to be allocated per function instance(applicable only to process/docker runtime)                                                                                                                                                                                                             | null    |
| `--use_tls`                         | Use tls connection                                                                                                                                                                                                                                                                                                      | null    |
| `--function-config-file`            | The path to a YAML config file that specifies the configuration of a Pulsar Function                                                                                                                                                                                                                                    | null    |
| `--topicsPattern`                   | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topic-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java fun only)                                                                                | null    |
| `--tls_trust_cert_path`             | tls trust cert file path                                                                                                                                                                                                                                                                                                | null    |
| `--subs-name`                       | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer                                                                                                                                                                                                                     | null    |
| `--clientAuthPlugin`                | Client authentication plugin using which function-process can connect to broker                                                                                                                                                                                                                                         | null    |
| `--use-tls`                         | Use tls connection                                                                                                                                                                                                                                                                                                      | false   |
| `--dead-letter-topic`               | The topic where messages that are not processed successfully are sent to                                                                                                                                                                                                                                                | null    |
| `-i, --inputs`                      | The input topic or topics (multiple topics can be specified as a comma-separated list) of a Pulsar Function                                                                                                                                                                                                             | null    |
| `--auto-ack`                        | Whether or not the framework acknowledges messages automatically                                                                                                                                                                                                                                                        | null    |
| `--subs-position`                   | Pulsar source subscription position if user wants to consume messages from the specified location                                                                                                                                                                                                                       | null    |
| `--user-config`                     | User-defined config key/values                                                                                                                                                                                                                                                                                          | null    |
| `--secrets-provider-classname`      | Whats the classname for secrets provider                                                                                                                                                                                                                                                                                | null    |
| `--py`                              | Path to the main Python file/Python Wheel file for the function (if the function is written in Python). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package. | null    |
| `--broker-service-url`              | The URL for Pulsar broker                                                                                                                                                                                                                                                                                               | null    |
| `--functionConfigFile`              | The path to a YAML config file that specifies the configuration of a Pulsar Function                                                                                                                                                                                                                                    | null    |
| `--clientAuthParams`                | Client authentication param                                                                                                                                                                                                                                                                                             | null    |
| `--retainOrdering`                  | Function consumes and processes messages in order                                                                                                                                                                                                                                                                       | null    |
| `--slidingIntervalDurationMs`       | The time duration after which the window slides                                                                                                                                                                                                                                                                         | null    |
| `--go`                              | Path to the main Go executable binary for the function (if the function is written in Go). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.              | null    |
| `--parallelism`                     | The parallelism factor of a Pulsar Function (i.e. the number of function instances to run)                                                                                                                                                                                                                              | null    |
| `--tenant`                          | The tenant of a Pulsar Function                                                                                                                                                                                                                                                                                         | null    |
| `--producer-config`                 | The custom producer configuration (as a JSON string)                                                                                                                                                                                                                                                                    | null    |
| `--tls-trust-cert-path`             | tls trust cert file path                                                                                                                                                                                                                                                                                                | null    |
| `--log-topic`                       | The topic to which the logs of a Pulsar Function are produced                                                                                                                                                                                                                                                           | null    |
| `--processing-guarantees`           | The processing guarantees (aka delivery semantics) applied to the function                                                                                                                                                                                                                                              | null    |
| `--input-specs`                     | The map of inputs to custom configuration (as a JSON string)                                                                                                                                                                                                                                                            | null    |
| `--className`                       | The class name of a Pulsar Function                                                                                                                                                                                                                                                                                     | null    |
| `-o, --output`                      | The output topic of a Pulsar Function (If none is specified, no output is written)                                                                                                                                                                                                                                      | null    |
| `--jar`                             | Path to the JAR file for the function (if the function is written in Java). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.                             | null    |
| `--autoAck`                         | Whether or not the framework acknowledges messages automatically                                                                                                                                                                                                                                                        | null    |
| `--web-service-url`                 | The URL for Pulsar web service                                                                                                                                                                                                                                                                                          | null    |
| `--retain-ordering`                 | Function consumes and processes messages in order                                                                                                                                                                                                                                                                       | null    |
| `--state-storage-service-url`       | The URL for the state storage service (the default is Apache BookKeeper)                                                                                                                                                                                                                                                | null    |
| `--logTopic`                        | The topic to which the logs of a Pulsar Function are produced                                                                                                                                                                                                                                                           | null    |
| `-st, --schema-type`                | The builtin schema type or custom schema class name to be used for messages output by the function                                                                                                                                                                                                                      ||
| `--client-auth-plugin`              | Client authentication plugin using which function-process can connect to broker                                                                                                                                                                                                                                         | null    |
| `--fqfn`                            | The Fully Qualified Function Name (FQFN) for the function                                                                                                                                                                                                                                                               | null    |
| `--retain-key-ordering`             | Function consumes and processes messages in key order                                                                                                                                                                                                                                                                   | null    |
| `--sliding-interval-count`          | The number of messages after which the window slides                                                                                                                                                                                                                                                                    | null    |
| `--custom-runtime-options`          | A string that encodes options to customize the runtime, see docs for configured runtime for details                                                                                                                                                                                                                     | null    |
| `--custom-serde-inputs`             | The map of input topics to SerDe class names (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--windowLengthDurationMs`          | The time duration of the window in milliseconds                                                                                                                                                                                                                                                                         | null    |
| `--timeout-ms`                      | The message timeout in milliseconds                                                                                                                                                                                                                                                                                     | null    |
| `--max-message-retries`             | How many times should we try to process a message before giving up                                                                                                                                                                                                                                                      | null    |
| `--runtime`                         | either THREAD or PROCESS. Only applies for Java functions                                                                                                                                                                                                                                                               | null    |
| `--cpu`                             | The cpu in cores that need to be allocated per function instance(applicable only to docker runtime)                                                                                                                                                                                                                     | null    |
| `--userConfig`                      | User-defined config key/values                                                                                                                                                                                                                                                                                          | null    |
| `--topics-pattern`                  | The topic pattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topic-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java fun only)                                                                            | null    |
| `--tls-allow-insecure`              | Allow insecure tls connection                                                                                                                                                                                                                                                                                           | false   |
| `--slidingIntervalCount`            | The number of messages after which the window slides                                                                                                                                                                                                                                                                    | null    |
| `--secrets-provider-config`         | Config that needs to be passed to secrets provider                                                                                                                                                                                                                                                                      | null    |
| `--outputSerdeClassName`            | The SerDe class to be used for messages output by the function                                                                                                                                                                                                                                                          | null    |
| `--hostname-verification-enabled`   | Enable hostname verification                                                                                                                                                                                                                                                                                            | false   |
| `--instance-id-offset`              | Start the instanceIds from this offset                                                                                                                                                                                                                                                                                  | 0       |
| `--customSerdeInputs`               | The map of input topics to SerDe class names (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--name`                            | The name of a Pulsar Function                                                                                                                                                                                                                                                                                           | null    |
| `--stateStorageServiceUrl`          | The URL for the state storage service (the default is Apache BookKeeper)                                                                                                                                                                                                                                                | null    |
| `--classname`                       | The class name of a Pulsar Function                                                                                                                                                                                                                                                                                     | null    |
| `--client-auth-params`              | Client authentication param                                                                                                                                                                                                                                                                                             | null    |
| `--disk`                            | The disk in bytes that need to be allocated per function instance(applicable only to docker runtime)                                                                                                                                                                                                                    | null    |
| `--timeoutMs`                       | The message timeout in milliseconds                                                                                                                                                                                                                                                                                     | null    |
| `--output-serde-classname`          | The SerDe class to be used for messages output by the function                                                                                                                                                                                                                                                          | null    |
| `--windowLengthCount`               | The number of messages per window                                                                                                                                                                                                                                                                                       | null    |
| `--sliding-interval-duration-ms`    | The time duration after which the window slides                                                                                                                                                                                                                                                                         | null    |
| `--namespace`                       | The namespace of a Pulsar Function                                                                                                                                                                                                                                                                                      | null    |

## create

Create a Pulsar Function in cluster mode (deploy it on a Pulsar cluster)

### Usage

------------

```shell
$ pulsar-admin functions create options
```

Options

| Flag                                | Description                                                                                                                                                                                                                                                                                                             | Default |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--custom-schema-outputs`           | The map of input topics to Schema properties (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--processingGuarantees`            | The processing guarantees (aka delivery semantics) applied to the function                                                                                                                                                                                                                                              | null    |
| `--window-length-duration-ms`       | The time duration of the window in milliseconds                                                                                                                                                                                                                                                                         | null    |
| `--batch-builder`                   | BatcherBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT                                                                                                                                                                                                   | null    |
| `--custom-schema-inputs`            | The map of input topics to Schema properties (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--window-length-count`             | The number of messages per window                                                                                                                                                                                                                                                                                       | null    |
| `--forward-source-message-property` | Forwarding input message's properties to output topic when processing (use false to disable it)                                                                                                                                                                                                                         | true    |
| `--secrets`                         | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider                                                                                                                                                                                                       | null    |
| `--ram`                             | The ram in bytes that need to be allocated per function instance(applicable only to process/docker runtime)                                                                                                                                                                                                             | null    |
| `--function-config-file`            | The path to a YAML config file that specifies the configuration of a Pulsar Function                                                                                                                                                                                                                                    | null    |
| `--topicsPattern`                   | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topic-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java fun only)                                                                                | null    |
| `--subs-name`                       | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer                                                                                                                                                                                                                     | null    |
| `--dead-letter-topic`               | The topic where messages that are not processed successfully are sent to                                                                                                                                                                                                                                                | null    |
| `-i, --inputs`                      | The input topic or topics (multiple topics can be specified as a comma-separated list) of a Pulsar Function                                                                                                                                                                                                             | null    |
| `--auto-ack`                        | Whether or not the framework acknowledges messages automatically                                                                                                                                                                                                                                                        | null    |
| `--subs-position`                   | Pulsar source subscription position if user wants to consume messages from the specified location                                                                                                                                                                                                                       | null    |
| `--user-config`                     | User-defined config key/values                                                                                                                                                                                                                                                                                          | null    |
| `--py`                              | Path to the main Python file/Python Wheel file for the function (if the function is written in Python). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package. | null    |
| `--functionConfigFile`              | The path to a YAML config file that specifies the configuration of a Pulsar Function                                                                                                                                                                                                                                    | null    |
| `--retainOrdering`                  | Function consumes and processes messages in order                                                                                                                                                                                                                                                                       | null    |
| `--slidingIntervalDurationMs`       | The time duration after which the window slides                                                                                                                                                                                                                                                                         | null    |
| `--go`                              | Path to the main Go executable binary for the function (if the function is written in Go). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.              | null    |
| `--parallelism`                     | The parallelism factor of a Pulsar Function (i.e. the number of function instances to run)                                                                                                                                                                                                                              | null    |
| `--tenant`                          | The tenant of a Pulsar Function                                                                                                                                                                                                                                                                                         | null    |
| `--producer-config`                 | The custom producer configuration (as a JSON string)                                                                                                                                                                                                                                                                    | null    |
| `--log-topic`                       | The topic to which the logs of a Pulsar Function are produced                                                                                                                                                                                                                                                           | null    |
| `--processing-guarantees`           | The processing guarantees (aka delivery semantics) applied to the function                                                                                                                                                                                                                                              | null    |
| `--input-specs`                     | The map of inputs to custom configuration (as a JSON string)                                                                                                                                                                                                                                                            | null    |
| `--className`                       | The class name of a Pulsar Function                                                                                                                                                                                                                                                                                     | null    |
| `-o, --output`                      | The output topic of a Pulsar Function (If none is specified, no output is written)                                                                                                                                                                                                                                      | null    |
| `--jar`                             | Path to the JAR file for the function (if the function is written in Java). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.                             | null    |
| `--autoAck`                         | Whether or not the framework acknowledges messages automatically                                                                                                                                                                                                                                                        | null    |
| `--retain-ordering`                 | Function consumes and processes messages in order                                                                                                                                                                                                                                                                       | null    |
| `--logTopic`                        | The topic to which the logs of a Pulsar Function are produced                                                                                                                                                                                                                                                           | null    |
| `-st, --schema-type`                | The builtin schema type or custom schema class name to be used for messages output by the function                                                                                                                                                                                                                      ||
| `--fqfn`                            | The Fully Qualified Function Name (FQFN) for the function                                                                                                                                                                                                                                                               | null    |
| `--retain-key-ordering`             | Function consumes and processes messages in key order                                                                                                                                                                                                                                                                   | null    |
| `--sliding-interval-count`          | The number of messages after which the window slides                                                                                                                                                                                                                                                                    | null    |
| `--custom-runtime-options`          | A string that encodes options to customize the runtime, see docs for configured runtime for details                                                                                                                                                                                                                     | null    |
| `--custom-serde-inputs`             | The map of input topics to SerDe class names (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--windowLengthDurationMs`          | The time duration of the window in milliseconds                                                                                                                                                                                                                                                                         | null    |
| `--timeout-ms`                      | The message timeout in milliseconds                                                                                                                                                                                                                                                                                     | null    |
| `--max-message-retries`             | How many times should we try to process a message before giving up                                                                                                                                                                                                                                                      | null    |
| `--cpu`                             | The cpu in cores that need to be allocated per function instance(applicable only to docker runtime)                                                                                                                                                                                                                     | null    |
| `--userConfig`                      | User-defined config key/values                                                                                                                                                                                                                                                                                          | null    |
| `--topics-pattern`                  | The topic pattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topic-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java fun only)                                                                            | null    |
| `--slidingIntervalCount`            | The number of messages after which the window slides                                                                                                                                                                                                                                                                    | null    |
| `--outputSerdeClassName`            | The SerDe class to be used for messages output by the function                                                                                                                                                                                                                                                          | null    |
| `--customSerdeInputs`               | The map of input topics to SerDe class names (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--name`                            | The name of a Pulsar Function                                                                                                                                                                                                                                                                                           | null    |
| `--classname`                       | The class name of a Pulsar Function                                                                                                                                                                                                                                                                                     | null    |
| `--disk`                            | The disk in bytes that need to be allocated per function instance(applicable only to docker runtime)                                                                                                                                                                                                                    | null    |
| `--timeoutMs`                       | The message timeout in milliseconds                                                                                                                                                                                                                                                                                     | null    |
| `--output-serde-classname`          | The SerDe class to be used for messages output by the function                                                                                                                                                                                                                                                          | null    |
| `--windowLengthCount`               | The number of messages per window                                                                                                                                                                                                                                                                                       | null    |
| `--sliding-interval-duration-ms`    | The time duration after which the window slides                                                                                                                                                                                                                                                                         | null    |
| `--namespace`                       | The namespace of a Pulsar Function                                                                                                                                                                                                                                                                                      | null    |

## delete

Delete a Pulsar Function that is running on a Pulsar cluster

### Usage

------------

```shell
$ pulsar-admin functions delete options
```

Options

| Flag          | Description                                               | Default |
|---------------|-----------------------------------------------------------|---------|
| `--name`      | The name of a Pulsar Function                             | null    |
| `--fqfn`      | The Fully Qualified Function Name (FQFN) for the function | null    |
| `--namespace` | The namespace of a Pulsar Function                        | null    |
| `--tenant`    | The tenant of a Pulsar Function                           | null    |

## update

Update a Pulsar Function that has been deployed to a Pulsar cluster

### Usage

------------

```shell
$ pulsar-admin functions update options
```

Options

| Flag                                | Description                                                                                                                                                                                                                                                                                                             | Default |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--custom-schema-outputs`           | The map of input topics to Schema properties (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--processingGuarantees`            | The processing guarantees (aka delivery semantics) applied to the function                                                                                                                                                                                                                                              | null    |
| `--window-length-duration-ms`       | The time duration of the window in milliseconds                                                                                                                                                                                                                                                                         | null    |
| `--batch-builder`                   | BatcherBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT                                                                                                                                                                                                   | null    |
| `--custom-schema-inputs`            | The map of input topics to Schema properties (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--window-length-count`             | The number of messages per window                                                                                                                                                                                                                                                                                       | null    |
| `--forward-source-message-property` | Forwarding input message's properties to output topic when processing (use false to disable it)                                                                                                                                                                                                                         | true    |
| `--secrets`                         | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider                                                                                                                                                                                                       | null    |
| `--ram`                             | The ram in bytes that need to be allocated per function instance(applicable only to process/docker runtime)                                                                                                                                                                                                             | null    |
| `--function-config-file`            | The path to a YAML config file that specifies the configuration of a Pulsar Function                                                                                                                                                                                                                                    | null    |
| `--topicsPattern`                   | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topic-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java fun only)                                                                                | null    |
| `--subs-name`                       | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer                                                                                                                                                                                                                     | null    |
| `--dead-letter-topic`               | The topic where messages that are not processed successfully are sent to                                                                                                                                                                                                                                                | null    |
| `-i, --inputs`                      | The input topic or topics (multiple topics can be specified as a comma-separated list) of a Pulsar Function                                                                                                                                                                                                             | null    |
| `--auto-ack`                        | Whether or not the framework acknowledges messages automatically                                                                                                                                                                                                                                                        | null    |
| `--subs-position`                   | Pulsar source subscription position if user wants to consume messages from the specified location                                                                                                                                                                                                                       | null    |
| `--user-config`                     | User-defined config key/values                                                                                                                                                                                                                                                                                          | null    |
| `--update-auth-data`                | Whether or not to update the auth data                                                                                                                                                                                                                                                                                  | false   |
| `--py`                              | Path to the main Python file/Python Wheel file for the function (if the function is written in Python). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package. | null    |
| `--functionConfigFile`              | The path to a YAML config file that specifies the configuration of a Pulsar Function                                                                                                                                                                                                                                    | null    |
| `--retainOrdering`                  | Function consumes and processes messages in order                                                                                                                                                                                                                                                                       | null    |
| `--slidingIntervalDurationMs`       | The time duration after which the window slides                                                                                                                                                                                                                                                                         | null    |
| `--go`                              | Path to the main Go executable binary for the function (if the function is written in Go). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.              | null    |
| `--parallelism`                     | The parallelism factor of a Pulsar Function (i.e. the number of function instances to run)                                                                                                                                                                                                                              | null    |
| `--tenant`                          | The tenant of a Pulsar Function                                                                                                                                                                                                                                                                                         | null    |
| `--producer-config`                 | The custom producer configuration (as a JSON string)                                                                                                                                                                                                                                                                    | null    |
| `--log-topic`                       | The topic to which the logs of a Pulsar Function are produced                                                                                                                                                                                                                                                           | null    |
| `--processing-guarantees`           | The processing guarantees (aka delivery semantics) applied to the function                                                                                                                                                                                                                                              | null    |
| `--input-specs`                     | The map of inputs to custom configuration (as a JSON string)                                                                                                                                                                                                                                                            | null    |
| `--className`                       | The class name of a Pulsar Function                                                                                                                                                                                                                                                                                     | null    |
| `-o, --output`                      | The output topic of a Pulsar Function (If none is specified, no output is written)                                                                                                                                                                                                                                      | null    |
| `--jar`                             | Path to the JAR file for the function (if the function is written in Java). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.                             | null    |
| `--autoAck`                         | Whether or not the framework acknowledges messages automatically                                                                                                                                                                                                                                                        | null    |
| `--retain-ordering`                 | Function consumes and processes messages in order                                                                                                                                                                                                                                                                       | null    |
| `--logTopic`                        | The topic to which the logs of a Pulsar Function are produced                                                                                                                                                                                                                                                           | null    |
| `-st, --schema-type`                | The builtin schema type or custom schema class name to be used for messages output by the function                                                                                                                                                                                                                      ||
| `--fqfn`                            | The Fully Qualified Function Name (FQFN) for the function                                                                                                                                                                                                                                                               | null    |
| `--retain-key-ordering`             | Function consumes and processes messages in key order                                                                                                                                                                                                                                                                   | null    |
| `--sliding-interval-count`          | The number of messages after which the window slides                                                                                                                                                                                                                                                                    | null    |
| `--custom-runtime-options`          | A string that encodes options to customize the runtime, see docs for configured runtime for details                                                                                                                                                                                                                     | null    |
| `--custom-serde-inputs`             | The map of input topics to SerDe class names (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--windowLengthDurationMs`          | The time duration of the window in milliseconds                                                                                                                                                                                                                                                                         | null    |
| `--timeout-ms`                      | The message timeout in milliseconds                                                                                                                                                                                                                                                                                     | null    |
| `--max-message-retries`             | How many times should we try to process a message before giving up                                                                                                                                                                                                                                                      | null    |
| `--cpu`                             | The cpu in cores that need to be allocated per function instance(applicable only to docker runtime)                                                                                                                                                                                                                     | null    |
| `--userConfig`                      | User-defined config key/values                                                                                                                                                                                                                                                                                          | null    |
| `--topics-pattern`                  | The topic pattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topic-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java fun only)                                                                            | null    |
| `--slidingIntervalCount`            | The number of messages after which the window slides                                                                                                                                                                                                                                                                    | null    |
| `--outputSerdeClassName`            | The SerDe class to be used for messages output by the function                                                                                                                                                                                                                                                          | null    |
| `--customSerdeInputs`               | The map of input topics to SerDe class names (as a JSON string)                                                                                                                                                                                                                                                         | null    |
| `--name`                            | The name of a Pulsar Function                                                                                                                                                                                                                                                                                           | null    |
| `--classname`                       | The class name of a Pulsar Function                                                                                                                                                                                                                                                                                     | null    |
| `--disk`                            | The disk in bytes that need to be allocated per function instance(applicable only to docker runtime)                                                                                                                                                                                                                    | null    |
| `--timeoutMs`                       | The message timeout in milliseconds                                                                                                                                                                                                                                                                                     | null    |
| `--output-serde-classname`          | The SerDe class to be used for messages output by the function                                                                                                                                                                                                                                                          | null    |
| `--windowLengthCount`               | The number of messages per window                                                                                                                                                                                                                                                                                       | null    |
| `--sliding-interval-duration-ms`    | The time duration after which the window slides                                                                                                                                                                                                                                                                         | null    |
| `--namespace`                       | The namespace of a Pulsar Function                                                                                                                                                                                                                                                                                      | null    |

## get

Fetch information about a Pulsar Function

### Usage

------------

```shell
$ pulsar-admin functions get options
```

Options

| Flag          | Description                                               | Default |
|---------------|-----------------------------------------------------------|---------|
| `--name`      | The name of a Pulsar Function                             | null    |
| `--fqfn`      | The Fully Qualified Function Name (FQFN) for the function | null    |
| `--namespace` | The namespace of a Pulsar Function                        | null    |
| `--tenant`    | The tenant of a Pulsar Function                           | null    |

## restart

Restart function instance

### Usage

------------

```shell
$ pulsar-admin functions restart options
```

Options

| Flag            | Description                                                                    | Default |
|-----------------|--------------------------------------------------------------------------------|---------|
| `--name`        | The name of a Pulsar Function                                                  | null    |
| `--fqfn`        | The Fully Qualified Function Name (FQFN) for the function                      | null    |
| `--namespace`   | The namespace of a Pulsar Function                                             | null    |
| `--tenant`      | The tenant of a Pulsar Function                                                | null    |
| `--instance-id` | The function instanceId (restart all instances if instance-id is not provided) | null    |

## stop

Stops function instance

### Usage

------------

```shell
$ pulsar-admin functions stop options
```

Options

| Flag            | Description                                                                 | Default |
|-----------------|-----------------------------------------------------------------------------|---------|
| `--name`        | The name of a Pulsar Function                                               | null    |
| `--fqfn`        | The Fully Qualified Function Name (FQFN) for the function                   | null    |
| `--namespace`   | The namespace of a Pulsar Function                                          | null    |
| `--instance-id` | The function instanceId (stop all instances if instance-id is not provided) | null    |
| `--tenant`      | The tenant of a Pulsar Function                                             | null    |

## start

Starts a stopped function instance

### Usage

------------

```shell
$ pulsar-admin functions start options
```

Options

| Flag            | Description                                                                  | Default |
|-----------------|------------------------------------------------------------------------------|---------|
| `--name`        | The name of a Pulsar Function                                                | null    |
| `--instance-id` | The function instanceId (start all instances if instance-id is not provided) | null    |
| `--fqfn`        | The Fully Qualified Function Name (FQFN) for the function                    | null    |
| `--namespace`   | The namespace of a Pulsar Function                                           | null    |
| `--tenant`      | The tenant of a Pulsar Function                                              | null    |

## status

Check the current status of a Pulsar Function

### Usage

------------

```shell
$ pulsar-admin functions status options
```

Options

| Flag            | Description                                                                          | Default |
|-----------------|--------------------------------------------------------------------------------------|---------|
| `--name`        | The name of a Pulsar Function                                                        | null    |
| `--fqfn`        | The Fully Qualified Function Name (FQFN) for the function                            | null    |
| `--namespace`   | The namespace of a Pulsar Function                                                   | null    |
| `--tenant`      | The tenant of a Pulsar Function                                                      | null    |
| `--instance-id` | The function instanceId (Get-status of all instances if instance-id is not provided) | null    |

## stats

Get the current stats of a Pulsar Function

### Usage

------------

```shell
$ pulsar-admin functions stats options
```

Options

| Flag            | Description                                                                         | Default |
|-----------------|-------------------------------------------------------------------------------------|---------|
| `--name`        | The name of a Pulsar Function                                                       | null    |
| `--fqfn`        | The Fully Qualified Function Name (FQFN) for the function                           | null    |
| `--instance-id` | The function instanceId (Get-stats of all instances if instance-id is not provided) | null    |
| `--namespace`   | The namespace of a Pulsar Function                                                  | null    |
| `--tenant`      | The tenant of a Pulsar Function                                                     | null    |

## list

List all Pulsar Functions running under a specific tenant and namespace

### Usage

------------

```shell
$ pulsar-admin functions list options
```

Options

| Flag          | Description                        | Default |
|---------------|------------------------------------|---------|
| `--namespace` | The namespace of a Pulsar Function | null    |
| `--tenant`    | The tenant of a Pulsar Function    | null    |

## querystate

Fetch the current state associated with a Pulsar Function

### Usage

------------

```shell
$ pulsar-admin functions querystate options
```

Options

| Flag          | Description                                                                | Default |
|---------------|----------------------------------------------------------------------------|---------|
| `--name`      | The name of a Pulsar Function                                              | null    |
| `-k, --key`   | Key name of State                                                          | null    |
| `--fqfn`      | The Fully Qualified Function Name (FQFN) for the function                  | null    |
| `--namespace` | The namespace of a Pulsar Function                                         | null    |
| `-w, --watch` | Watch for changes in the value associated with a key for a Pulsar Function | false   |
| `--tenant`    | The tenant of a Pulsar Function                                            | null    |

## putstate

Put the state associated with a Pulsar Function

### Usage

------------

```shell
$ pulsar-admin functions putstate options
```

Options

| Flag          | Description                                               | Default |
|---------------|-----------------------------------------------------------|---------|
| `--name`      | The name of a Pulsar Function                             | null    |
| `--fqfn`      | The Fully Qualified Function Name (FQFN) for the function | null    |
| `--namespace` | The namespace of a Pulsar Function                        | null    |
| `--tenant`    | The tenant of a Pulsar Function                           | null    |
| `-s, --state` | The FunctionState that needs to be put                    | null    |

## trigger

Trigger the specified Pulsar Function with a supplied value

### Usage

------------

```shell
$ pulsar-admin functions trigger options
```

Options

| Flag              | Description                                                                                 | Default |
|-------------------|---------------------------------------------------------------------------------------------|---------|
| `--name`          | The name of a Pulsar Function                                                               | null    |
| `--fqfn`          | The Fully Qualified Function Name (FQFN) for the function                                   | null    |
| `--namespace`     | The namespace of a Pulsar Function                                                          | null    |
| `--trigger-value` | The value with which you want to trigger the function                                       | null    |
| `--trigger-file`  | The path to the file that contains the data with which you want to trigger the function     | null    |
| `--topic`         | The specific topic name that the function consumes from that you want to inject the data to | null    |
| `--triggerFile`   | The path to the file that contains the data with which you want to trigger the function     | null    |
| `--tenant`        | The tenant of a Pulsar Function                                                             | null    |
| `--triggerValue`  | The value with which you want to trigger the function                                       | null    |

## upload

Upload File Data to Pulsar

### Usage

------------

```shell
$ pulsar-admin functions upload options
```

Options

| Flag            | Description                                 | Default |
|-----------------|---------------------------------------------|---------|
| `--source-file` | The file whose contents need to be uploaded | null    |
| `--sourceFile`  | The file whose contents need to be uploaded | null    |
| `--path`        | Path where the contents need to be stored   | null    |

## download

Download File Data from Pulsar

### Usage

------------

```shell
$ pulsar-admin functions download options
```

Options

| Flag                 | Description                                               | Default |
|----------------------|-----------------------------------------------------------|---------|
| `--name`             | The name of a Pulsar Function                             | null    |
| `--fqfn`             | The Fully Qualified Function Name (FQFN) for the function | null    |
| `--namespace`        | The namespace of a Pulsar Function                        | null    |
| `--destinationFile`  | The file to store downloaded content                      | null    |
| `--path`             | Path to store the content                                 | null    |
| `--destination-file` | The file to store downloaded content                      | null    |
| `--tenant`           | The tenant of a Pulsar Function                           | null    |

