------------

# sinks

### Usage

`$sinks`

------------

Interface for managing Pulsar IO sinks (egress data from Pulsar)


```shell
$ pulsar-admin sinks subcommand
```

* `create`
* `update`
* `delete`
* `list`
* `get`
* `status`
* `stop`
* `start`
* `restart`
* `localrun`
* `available-sinks`
* `reload`


## <em>create</em>

Submit a Pulsar IO sink connector to run in a Pulsar cluster

### Usage

------------


```shell
$ pulsar-admin sinks create options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--customSerdeInputs` | The map of input topics to SerDe class names (as a JSON string)|null|
| `--name` | The sink's name|null|
| `--topics-pattern` | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topicsPattern] are mutually exclusive. Add SerDe class name for a pattern in --customSerdeInputs  (supported for java fun only)|null|
| `--retainOrdering` | Sink consumes and sinks messages in order|null|
| `--sink-config-file` | The path to a YAML config file specifying the sink's configuration|null|
| `--sink-config` | User defined configs key/values|null|
| `--topicsPattern` | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topicsPattern] are mutually exclusive. Add SerDe class name for a pattern in --customSerdeInputs  (supported for java fun only)|null|
| `--sinkConfigFile` | The path to a YAML config file specifying the sink's configuration|null|
| `--cpu` | The CPU (in cores) that needs to be allocated per sink instance (applicable only to Docker runtime)|null|
| `--tenant` | The sink's tenant|null|
| `--disk` | The disk (in bytes) that need to be allocated per sink instance (applicable only to Docker runtime)|null|
| `--sinkConfig` | User defined configs key/values|null|
| `--dead-letter-topic` | Name of the dead topic where the failing messages will be sent.|null|
| `-i, --inputs` | The sink's input topic or topics (multiple topics can be specified as a comma-separated list)|null|
| `--processing-guarantees` | The processing guarantees (aka delivery semantics) applied to the sink|null|
| `--className` | The sink's class name if archive is file-url-path (file://)|null|
| `--subs-position` | Pulsar source subscription position if user wants to consume messages from the specified location|null|
| `--ram` | The RAM (in bytes) that need to be allocated per sink instance (applicable only to the process and Docker runtimes)|null|
| `--custom-serde-inputs` | The map of input topics to SerDe class names (as a JSON string)|null|
| `-t, --sink-type` | The sinks's connector provider|null|
| `--subsName` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `--custom-schema-inputs` | The map of input topics to Schema types or class names (as a JSON string)|null|
| `--namespace` | The sink's namespace|null|
| `--retain-ordering` | Sink consumes and sinks messages in order|null|
| `--parallelism` | The sink's parallelism factor (i.e. the number of sink instances to run)|null|
| `--secrets` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
| `--input-specs` | The map of inputs to custom configuration (as a JSON string)|null|
| `--processingGuarantees` | The processing guarantees (aka delivery semantics) applied to the sink|null|
| `--classname` | The sink's class name if archive is file-url-path (file://)|null|
| `--custom-runtime-options` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `--timeout-ms` | The message timeout in milliseconds|null|
| `--negative-ack-redelivery-delay-ms` | The negative ack message redelivery delay in milliseconds|null|
| `--subs-name` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `--auto-ack` | Whether or not the framework will automatically acknowledge messages|null|
| `--max-redeliver-count` | Maximum number of times that a message will be redelivered before being sent to the dead letter queue|null|
| `-a, --archive` | Path to the archive file for the sink. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|


## <em>update</em>

Update a Pulsar IO sink connector

### Usage

------------


```shell
$ pulsar-admin sinks update options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--customSerdeInputs` | The map of input topics to SerDe class names (as a JSON string)|null|
| `--name` | The sink's name|null|
| `--topics-pattern` | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topicsPattern] are mutually exclusive. Add SerDe class name for a pattern in --customSerdeInputs  (supported for java fun only)|null|
| `--retainOrdering` | Sink consumes and sinks messages in order|null|
| `--sink-config-file` | The path to a YAML config file specifying the sink's configuration|null|
| `--sink-config` | User defined configs key/values|null|
| `--topicsPattern` | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topicsPattern] are mutually exclusive. Add SerDe class name for a pattern in --customSerdeInputs  (supported for java fun only)|null|
| `--sinkConfigFile` | The path to a YAML config file specifying the sink's configuration|null|
| `--cpu` | The CPU (in cores) that needs to be allocated per sink instance (applicable only to Docker runtime)|null|
| `--tenant` | The sink's tenant|null|
| `--update-auth-data` | Whether or not to update the auth data|false|
| `--disk` | The disk (in bytes) that need to be allocated per sink instance (applicable only to Docker runtime)|null|
| `--sinkConfig` | User defined configs key/values|null|
| `--dead-letter-topic` | Name of the dead topic where the failing messages will be sent.|null|
| `-i, --inputs` | The sink's input topic or topics (multiple topics can be specified as a comma-separated list)|null|
| `--processing-guarantees` | The processing guarantees (aka delivery semantics) applied to the sink|null|
| `--className` | The sink's class name if archive is file-url-path (file://)|null|
| `--subs-position` | Pulsar source subscription position if user wants to consume messages from the specified location|null|
| `--ram` | The RAM (in bytes) that need to be allocated per sink instance (applicable only to the process and Docker runtimes)|null|
| `--custom-serde-inputs` | The map of input topics to SerDe class names (as a JSON string)|null|
| `-t, --sink-type` | The sinks's connector provider|null|
| `--subsName` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `--custom-schema-inputs` | The map of input topics to Schema types or class names (as a JSON string)|null|
| `--namespace` | The sink's namespace|null|
| `--retain-ordering` | Sink consumes and sinks messages in order|null|
| `--parallelism` | The sink's parallelism factor (i.e. the number of sink instances to run)|null|
| `--secrets` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
| `--input-specs` | The map of inputs to custom configuration (as a JSON string)|null|
| `--processingGuarantees` | The processing guarantees (aka delivery semantics) applied to the sink|null|
| `--classname` | The sink's class name if archive is file-url-path (file://)|null|
| `--custom-runtime-options` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `--timeout-ms` | The message timeout in milliseconds|null|
| `--negative-ack-redelivery-delay-ms` | The negative ack message redelivery delay in milliseconds|null|
| `--subs-name` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `--auto-ack` | Whether or not the framework will automatically acknowledge messages|null|
| `--max-redeliver-count` | Maximum number of times that a message will be redelivered before being sent to the dead letter queue|null|
| `-a, --archive` | Path to the archive file for the sink. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|


## <em>delete</em>

Stops a Pulsar IO sink connector

### Usage

------------


```shell
$ pulsar-admin sinks delete options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--name` | The sink's name|null|
| `--namespace` | The sink's namespace|null|
| `--tenant` | The sink's tenant|null|


## <em>list</em>

List all running Pulsar IO sink connectors

### Usage

------------


```shell
$ pulsar-admin sinks list options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--tenant` | The sink's tenant|null|
| `--namespace` | The sink's namespace|null|


## <em>get</em>

Gets the information about a Pulsar IO sink connector

### Usage

------------


```shell
$ pulsar-admin sinks get options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--name` | The sink's name|null|
| `--namespace` | The sink's namespace|null|
| `--tenant` | The sink's tenant|null|


## <em>status</em>

Check the current status of a Pulsar Sink

### Usage

------------


```shell
$ pulsar-admin sinks status options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--name` | The sink's name|null|
| `--namespace` | The sink's namespace|null|
| `--instance-id` | The sink instanceId (Get-status of all instances if instance-id is not provided|null|
| `--tenant` | The sink's tenant|null|


## <em>stop</em>

Stops sink instance

### Usage

------------


```shell
$ pulsar-admin sinks stop options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--name` | The sink's name|null|
| `--namespace` | The sink's namespace|null|
| `--tenant` | The sink's tenant|null|
| `--instance-id` | The sink instanceId (stop all instances if instance-id is not provided|null|


## <em>start</em>

Starts sink instance

### Usage

------------


```shell
$ pulsar-admin sinks start options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--name` | The sink's name|null|
| `--namespace` | The sink's namespace|null|
| `--tenant` | The sink's tenant|null|
| `--instance-id` | The sink instanceId (start all instances if instance-id is not provided|null|


## <em>restart</em>

Restart sink instance

### Usage

------------


```shell
$ pulsar-admin sinks restart options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--instance-id` | The sink instanceId (restart all instances if instance-id is not provided|null|
| `--name` | The sink's name|null|
| `--namespace` | The sink's namespace|null|
| `--tenant` | The sink's tenant|null|


## <em>localrun</em>

Run a Pulsar IO sink connector locally (rather than deploying it to the Pulsar cluster)

### Usage

------------


```shell
$ pulsar-admin sinks localrun options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--customSerdeInputs` | The map of input topics to SerDe class names (as a JSON string)|null|
| `--tls-allow-insecure` | Allow insecure tls connection|false|
| `--secrets-provider-classname` | Whats the classname for secrets provider|null|
| `--topics-pattern` | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topicsPattern] are mutually exclusive. Add SerDe class name for a pattern in --customSerdeInputs  (supported for java fun only)|null|
| `--sink-config-file` | The path to a YAML config file specifying the sink's configuration|null|
| `--topicsPattern` | TopicsPattern to consume from list of topics under a namespace that match the pattern. [--input] and [--topicsPattern] are mutually exclusive. Add SerDe class name for a pattern in --customSerdeInputs  (supported for java fun only)|null|
| `--cpu` | The CPU (in cores) that needs to be allocated per sink instance (applicable only to Docker runtime)|null|
| `--tenant` | The sink's tenant|null|
| `--disk` | The disk (in bytes) that need to be allocated per sink instance (applicable only to Docker runtime)|null|
| `--tls_trust_cert_path` | tls trust cert file path|null|
| `--sinkConfig` | User defined configs key/values|null|
| `--dead-letter-topic` | Name of the dead topic where the failing messages will be sent.|null|
| `-i, --inputs` | The sink's input topic or topics (multiple topics can be specified as a comma-separated list)|null|
| `--className` | The sink's class name if archive is file-url-path (file://)|null|
| `--tls_allow_insecure` | Allow insecure tls connection|null|
| `--subs-position` | Pulsar source subscription position if user wants to consume messages from the specified location|null|
| `--secrets-provider-config` | Config that needs to be passed to secrets provider|null|
| `--hostname-verification-enabled` | Enable hostname verification|false|
| `--clientAuthParams` | Client authentication param|null|
| `--subsName` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `--retain-ordering` | Sink consumes and sinks messages in order|null|
| `--parallelism` | The sink's parallelism factor (i.e. the number of sink instances to run)|null|
| `--input-specs` | The map of inputs to custom configuration (as a JSON string)|null|
| `--use-tls` | Use tls connection|false|
| `--processingGuarantees` | The processing guarantees (aka delivery semantics) applied to the sink|null|
| `--classname` | The sink's class name if archive is file-url-path (file://)|null|
| `--timeout-ms` | The message timeout in milliseconds|null|
| `--subs-name` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `--brokerServiceUrl` | The URL for the Pulsar broker|null|
| `--hostname_verification_enabled` | Enable hostname verification|null|
| `--use_tls` | Use tls connection|null|
| `--max-redeliver-count` | Maximum number of times that a message will be redelivered before being sent to the dead letter queue|null|
| `-a, --archive` | Path to the archive file for the sink. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|
| `--name` | The sink's name|null|
| `--retainOrdering` | Sink consumes and sinks messages in order|null|
| `--sink-config` | User defined configs key/values|null|
| `--sinkConfigFile` | The path to a YAML config file specifying the sink's configuration|null|
| `--state-storage-service-url` | The URL for the state storage service (the default is Apache BookKeeper)|null|
| `--client-auth-params` | Client authentication param|null|
| `--clientAuthPlugin` | Client authentication plugin using which function-process can connect to broker|null|
| `--processing-guarantees` | The processing guarantees (aka delivery semantics) applied to the sink|null|
| `--client-auth-plugin` | Client authentication plugin using which function-process can connect to broker|null|
| `--ram` | The RAM (in bytes) that need to be allocated per sink instance (applicable only to the process and Docker runtimes)|null|
| `--custom-serde-inputs` | The map of input topics to SerDe class names (as a JSON string)|null|
| `-t, --sink-type` | The sinks's connector provider|null|
| `--custom-schema-inputs` | The map of input topics to Schema types or class names (as a JSON string)|null|
| `--namespace` | The sink's namespace|null|
| `--secrets` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
| `--custom-runtime-options` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `--negative-ack-redelivery-delay-ms` | The negative ack message redelivery delay in milliseconds|null|
| `--broker-service-url` | The URL for the Pulsar broker|null|
| `--tls-trust-cert-path` | tls trust cert file path|null|
| `--metrics-port-start` | The starting port range for metrics server|null|
| `--auto-ack` | Whether or not the framework will automatically acknowledge messages|null|


## <em>available-sinks</em>

Get the list of Pulsar IO connector sinks supported by Pulsar cluster

### Usage

------------


```shell
$ pulsar-admin sinks available-sinks options
```



## <em>reload</em>

Reload the available built-in connectors

### Usage

------------


```shell
$ pulsar-admin sinks reload options
```


