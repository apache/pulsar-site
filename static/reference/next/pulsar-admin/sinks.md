# sinks

Interface for managing Pulsar IO sinks (egress data from Pulsar)


```shell
$ pulsar-admin sinks subcommand
```



## create

Submit a Pulsar IO sink connector to run in a Pulsar cluster

**Command:**

```shell
$ pulsar-admin sinks create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[-t, --sink-type]` | The sinks's connector provider|null|
| `[--cleanup-subscription]` | Whether delete the subscription when sink is deleted|null|
| `[-i, --inputs]` | The sink's input topic or topics (multiple topics can be specified as a comma-separated list)|null|
| `[--topics-pattern]` | The topic pattern to consume from a list of topics under a namespace that matches the pattern. [--input] and [--topics-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs|null|
| `[--subs-name]` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `[--subs-position]` | Pulsar source subscription position if user wants to consume messages from the specified location|null|
| `[--custom-serde-inputs]` | The map of input topics to SerDe class names (as a JSON string)|null|
| `[--custom-schema-inputs]` | The map of input topics to Schema types or class names (as a JSON string)|null|
| `[--input-specs]` | The map of inputs to custom configuration (as a JSON string)|null|
| `[--max-redeliver-count]` | Maximum number of times that a message will be redelivered before being sent to the dead letter queue|null|
| `[--dead-letter-topic]` | Name of the dead topic where the failing messages will be sent.|null|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the sink. The '--processing-guarantees' implementation in Pulsar also relies on sink implementation. The available values are `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, `ATLEAST_ONCE` delivery guarantee is used.|null|
| `[--retain-ordering]` | Sink consumes and sinks messages in order|null|
| `[--parallelism]` | The sink's parallelism factor (i.e. the number of sink instances to run)|null|
| `[--retain-key-ordering]` | Sink consumes and processes messages in key order|null|
| `[-a, --archive]` | Path to the archive file for the sink. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|
| `[--classname]` | The sink's class name if archive is file-url-path (file://)|null|
| `[--sink-config-file]` | The path to a YAML config file specifying the sink's configuration|null|
| `[--cpu]` | The CPU (in cores) that needs to be allocated per sink instance (applicable only to Docker runtime)|null|
| `[--ram]` | The RAM (in bytes) that need to be allocated per sink instance (applicable only to the process and Docker runtimes)|null|
| `[--disk]` | The disk (in bytes) that need to be allocated per sink instance (applicable only to Docker runtime)|null|
| `[--sink-config]` | User defined configs key/values|null|
| `[--auto-ack]` | Whether or not the framework will automatically acknowledge messages|null|
| `[--timeout-ms]` | The message timeout in milliseconds|null|
| `[--negative-ack-redelivery-delay-ms]` | The negative ack message redelivery delay in milliseconds|null|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
| `[--transform-function]` | Transform function applied before the Sink|null|
| `[--transform-function-classname]` | The transform function class name|null|
| `[--transform-function-config]` | Configuration of the transform function applied before the Sink|null|
| `[--log-topic]` | The topic to which the logs of a Pulsar Sink are produced|null|
| `[--runtime-flags]` | Any flags that you want to pass to a runtime (for process & Kubernetes runtime only).|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## update

Update a Pulsar IO sink connector

**Command:**

```shell
$ pulsar-admin sinks update options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[-t, --sink-type]` | The sinks's connector provider|null|
| `[--cleanup-subscription]` | Whether delete the subscription when sink is deleted|null|
| `[-i, --inputs]` | The sink's input topic or topics (multiple topics can be specified as a comma-separated list)|null|
| `[--topics-pattern]` | The topic pattern to consume from a list of topics under a namespace that matches the pattern. [--input] and [--topics-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs|null|
| `[--subs-name]` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `[--subs-position]` | Pulsar source subscription position if user wants to consume messages from the specified location|null|
| `[--custom-serde-inputs]` | The map of input topics to SerDe class names (as a JSON string)|null|
| `[--custom-schema-inputs]` | The map of input topics to Schema types or class names (as a JSON string)|null|
| `[--input-specs]` | The map of inputs to custom configuration (as a JSON string)|null|
| `[--max-redeliver-count]` | Maximum number of times that a message will be redelivered before being sent to the dead letter queue|null|
| `[--dead-letter-topic]` | Name of the dead topic where the failing messages will be sent.|null|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the sink. The '--processing-guarantees' implementation in Pulsar also relies on sink implementation. The available values are `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, `ATLEAST_ONCE` delivery guarantee is used.|null|
| `[--retain-ordering]` | Sink consumes and sinks messages in order|null|
| `[--parallelism]` | The sink's parallelism factor (i.e. the number of sink instances to run)|null|
| `[--retain-key-ordering]` | Sink consumes and processes messages in key order|null|
| `[-a, --archive]` | Path to the archive file for the sink. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|
| `[--classname]` | The sink's class name if archive is file-url-path (file://)|null|
| `[--sink-config-file]` | The path to a YAML config file specifying the sink's configuration|null|
| `[--cpu]` | The CPU (in cores) that needs to be allocated per sink instance (applicable only to Docker runtime)|null|
| `[--ram]` | The RAM (in bytes) that need to be allocated per sink instance (applicable only to the process and Docker runtimes)|null|
| `[--disk]` | The disk (in bytes) that need to be allocated per sink instance (applicable only to Docker runtime)|null|
| `[--sink-config]` | User defined configs key/values|null|
| `[--auto-ack]` | Whether or not the framework will automatically acknowledge messages|null|
| `[--timeout-ms]` | The message timeout in milliseconds|null|
| `[--negative-ack-redelivery-delay-ms]` | The negative ack message redelivery delay in milliseconds|null|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
| `[--transform-function]` | Transform function applied before the Sink|null|
| `[--transform-function-classname]` | The transform function class name|null|
| `[--transform-function-config]` | Configuration of the transform function applied before the Sink|null|
| `[--log-topic]` | The topic to which the logs of a Pulsar Sink are produced|null|
| `[--runtime-flags]` | Any flags that you want to pass to a runtime (for process & Kubernetes runtime only).|null|
| `[--update-auth-data]` | Whether or not to update the auth data|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## delete

Stops a Pulsar IO sink connector

**Command:**

```shell
$ pulsar-admin sinks delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## list

List all running Pulsar IO sink connectors

**Command:**

```shell
$ pulsar-admin sinks list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get

Gets the information about a Pulsar IO sink connector

**Command:**

```shell
$ pulsar-admin sinks get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## status

Check the current status of a Pulsar Sink

**Command:**

```shell
$ pulsar-admin sinks status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[--instance-id]` | The sink instanceId (Get-status of all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## getstatus

Check the current status of a Pulsar Sink

**Command:**

```shell
$ pulsar-admin sinks getstatus options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[--instance-id]` | The sink instanceId (Get-status of all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## stop

Stops sink instance

**Command:**

```shell
$ pulsar-admin sinks stop options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[--instance-id]` | The sink instanceId (stop all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## start

Starts sink instance

**Command:**

```shell
$ pulsar-admin sinks start options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[--instance-id]` | The sink instanceId (start all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## restart

Restart sink instance

**Command:**

```shell
$ pulsar-admin sinks restart options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[--instance-id]` | The sink instanceId (restart all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## localrun

Run a Pulsar IO sink connector locally (rather than deploying it to the Pulsar cluster)

**Command:**

```shell
$ pulsar-admin sinks localrun options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The sink's tenant|null|
| `[--namespace]` | The sink's namespace|null|
| `[--name]` | The sink's name|null|
| `[-t, --sink-type]` | The sinks's connector provider|null|
| `[--cleanup-subscription]` | Whether delete the subscription when sink is deleted|null|
| `[-i, --inputs]` | The sink's input topic or topics (multiple topics can be specified as a comma-separated list)|null|
| `[--topics-pattern]` | The topic pattern to consume from a list of topics under a namespace that matches the pattern. [--input] and [--topics-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs|null|
| `[--subs-name]` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|
| `[--subs-position]` | Pulsar source subscription position if user wants to consume messages from the specified location|null|
| `[--custom-serde-inputs]` | The map of input topics to SerDe class names (as a JSON string)|null|
| `[--custom-schema-inputs]` | The map of input topics to Schema types or class names (as a JSON string)|null|
| `[--input-specs]` | The map of inputs to custom configuration (as a JSON string)|null|
| `[--max-redeliver-count]` | Maximum number of times that a message will be redelivered before being sent to the dead letter queue|null|
| `[--dead-letter-topic]` | Name of the dead topic where the failing messages will be sent.|null|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the sink. The '--processing-guarantees' implementation in Pulsar also relies on sink implementation. The available values are `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, `ATLEAST_ONCE` delivery guarantee is used.|null|
| `[--retain-ordering]` | Sink consumes and sinks messages in order|null|
| `[--parallelism]` | The sink's parallelism factor (i.e. the number of sink instances to run)|null|
| `[--retain-key-ordering]` | Sink consumes and processes messages in key order|null|
| `[-a, --archive]` | Path to the archive file for the sink. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|
| `[--classname]` | The sink's class name if archive is file-url-path (file://)|null|
| `[--sink-config-file]` | The path to a YAML config file specifying the sink's configuration|null|
| `[--cpu]` | The CPU (in cores) that needs to be allocated per sink instance (applicable only to Docker runtime)|null|
| `[--ram]` | The RAM (in bytes) that need to be allocated per sink instance (applicable only to the process and Docker runtimes)|null|
| `[--disk]` | The disk (in bytes) that need to be allocated per sink instance (applicable only to Docker runtime)|null|
| `[--sink-config]` | User defined configs key/values|null|
| `[--auto-ack]` | Whether or not the framework will automatically acknowledge messages|null|
| `[--timeout-ms]` | The message timeout in milliseconds|null|
| `[--negative-ack-redelivery-delay-ms]` | The negative ack message redelivery delay in milliseconds|null|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
| `[--transform-function]` | Transform function applied before the Sink|null|
| `[--transform-function-classname]` | The transform function class name|null|
| `[--transform-function-config]` | Configuration of the transform function applied before the Sink|null|
| `[--log-topic]` | The topic to which the logs of a Pulsar Sink are produced|null|
| `[--runtime-flags]` | Any flags that you want to pass to a runtime (for process & Kubernetes runtime only).|null|
| `[--state-storage-service-url]` | The URL for the state storage service (the default is Apache BookKeeper)|null|
| `[--broker-service-url]` | The URL for the Pulsar broker|null|
| `[--client-auth-plugin]` | Client authentication plugin using which function-process can connect to broker|null|
| `[--client-auth-params]` | Client authentication param|null|
| `[--use-tls]` | Use tls connection|false|
| `[--tls-allow-insecure]` | Allow insecure tls connection|false|
| `[--hostname-verification-enabled]` | Enable hostname verification|false|
| `[--tls-trust-cert-path]` | tls trust cert file path|null|
| `[--secrets-provider-classname]` | Whats the classname for secrets provider|null|
| `[--secrets-provider-config]` | Config that needs to be passed to secrets provider|null|
| `[--metrics-port-start]` | The starting port range for metrics server|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## available-sinks

Get the list of Pulsar IO connector sinks supported by Pulsar cluster

**Command:**

```shell
$ pulsar-admin sinks available-sinks options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## reload

Reload the available built-in connectors

**Command:**

```shell
$ pulsar-admin sinks reload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

