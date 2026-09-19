# sources

Interface for managing Pulsar IO Sources (ingress data into Pulsar)


```shell
$ pulsar-admin sources subcommand
```



## create

Submit a Pulsar IO source connector to run in a Pulsar cluster

**Command:**

```shell
$ pulsar-admin sources create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[-t, --source-type]` | The source's connector provider|null|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the source. A source connector receives messages from external system and writes messages to a Pulsar topic. The '--processing-guarantees' is used to ensure the processing guarantees for writing messages to the Pulsar topic. The available values are `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, `ATLEAST_ONCE` delivery guarantee is used.|null|
| `[--destination-topic-name]` | The Pulsar topic to which data is sent|null|
| `[--producer-config]` | The custom producer configuration (as a JSON string)|null|
| `[--batch-builder]` | BatchBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT|null|
| `[--deserialization-classname]` | The SerDe classname for the source|null|
| `[-st, --schema-type]` | The schema type (either a builtin schema like 'avro', 'json', etc.. or custom Schema class name to be used to encode messages emitted from the source|null|
| `[--parallelism]` | The source's parallelism factor (i.e. the number of source instances to run)|null|
| `[-a, --archive]` | The path to the NAR archive for the Source. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|
| `[--classname]` | The source's class name if archive is file-url-path (file://)|null|
| `[--source-config-file]` | The path to a YAML config file specifying the source's configuration|null|
| `[--cpu]` | The CPU (in cores) that needs to be allocated per source instance (applicable only to Docker runtime)|null|
| `[--ram]` | The RAM (in bytes) that need to be allocated per source instance (applicable only to the process and Docker runtimes)|null|
| `[--disk]` | The disk (in bytes) that need to be allocated per source instance (applicable only to Docker runtime)|null|
| `[--source-config]` | Source config key/values|null|
| `[--batch-source-config]` | Batch source config key/values|null|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
| `[--log-topic]` | The topic to which the logs of a Pulsar Sink are produced|null|
| `[--runtime-flags]` | Any flags that you want to pass to a runtime (for process & Kubernetes runtime only).|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## update

Update a Pulsar IO source connector

**Command:**

```shell
$ pulsar-admin sources update options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[-t, --source-type]` | The source's connector provider|null|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the source. A source connector receives messages from external system and writes messages to a Pulsar topic. The '--processing-guarantees' is used to ensure the processing guarantees for writing messages to the Pulsar topic. The available values are `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, `ATLEAST_ONCE` delivery guarantee is used.|null|
| `[--destination-topic-name]` | The Pulsar topic to which data is sent|null|
| `[--producer-config]` | The custom producer configuration (as a JSON string)|null|
| `[--batch-builder]` | BatchBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT|null|
| `[--deserialization-classname]` | The SerDe classname for the source|null|
| `[-st, --schema-type]` | The schema type (either a builtin schema like 'avro', 'json', etc.. or custom Schema class name to be used to encode messages emitted from the source|null|
| `[--parallelism]` | The source's parallelism factor (i.e. the number of source instances to run)|null|
| `[-a, --archive]` | The path to the NAR archive for the Source. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|
| `[--classname]` | The source's class name if archive is file-url-path (file://)|null|
| `[--source-config-file]` | The path to a YAML config file specifying the source's configuration|null|
| `[--cpu]` | The CPU (in cores) that needs to be allocated per source instance (applicable only to Docker runtime)|null|
| `[--ram]` | The RAM (in bytes) that need to be allocated per source instance (applicable only to the process and Docker runtimes)|null|
| `[--disk]` | The disk (in bytes) that need to be allocated per source instance (applicable only to Docker runtime)|null|
| `[--source-config]` | Source config key/values|null|
| `[--batch-source-config]` | Batch source config key/values|null|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
| `[--log-topic]` | The topic to which the logs of a Pulsar Sink are produced|null|
| `[--runtime-flags]` | Any flags that you want to pass to a runtime (for process & Kubernetes runtime only).|null|
| `[--update-auth-data]` | Whether or not to update the auth data|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## delete

Stops a Pulsar IO source connector

**Command:**

```shell
$ pulsar-admin sources delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get

Gets the information about a Pulsar IO source connector

**Command:**

```shell
$ pulsar-admin sources get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## status

Check the current status of a Pulsar Source

**Command:**

```shell
$ pulsar-admin sources status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[--instance-id]` | The source instanceId (Get-status of all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## getstatus

Check the current status of a Pulsar Source

**Command:**

```shell
$ pulsar-admin sources getstatus options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[--instance-id]` | The source instanceId (Get-status of all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## list

List all running Pulsar IO source connectors

**Command:**

```shell
$ pulsar-admin sources list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## stop

Stop source instance

**Command:**

```shell
$ pulsar-admin sources stop options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[--instance-id]` | The source instanceId (stop all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## start

Start source instance

**Command:**

```shell
$ pulsar-admin sources start options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[--instance-id]` | The source instanceId (start all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## restart

Restart source instance

**Command:**

```shell
$ pulsar-admin sources restart options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[--instance-id]` | The source instanceId (restart all instances if instance-id is not provided|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## localrun

Run a Pulsar IO source connector locally (rather than deploying it to the Pulsar cluster)

**Command:**

```shell
$ pulsar-admin sources localrun options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The source's tenant|null|
| `[--namespace]` | The source's namespace|null|
| `[--name]` | The source's name|null|
| `[-t, --source-type]` | The source's connector provider|null|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the source. A source connector receives messages from external system and writes messages to a Pulsar topic. The '--processing-guarantees' is used to ensure the processing guarantees for writing messages to the Pulsar topic. The available values are `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, `ATLEAST_ONCE` delivery guarantee is used.|null|
| `[--destination-topic-name]` | The Pulsar topic to which data is sent|null|
| `[--producer-config]` | The custom producer configuration (as a JSON string)|null|
| `[--batch-builder]` | BatchBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT|null|
| `[--deserialization-classname]` | The SerDe classname for the source|null|
| `[-st, --schema-type]` | The schema type (either a builtin schema like 'avro', 'json', etc.. or custom Schema class name to be used to encode messages emitted from the source|null|
| `[--parallelism]` | The source's parallelism factor (i.e. the number of source instances to run)|null|
| `[-a, --archive]` | The path to the NAR archive for the Source. It also supports url-path [http/https/file (file protocol assumes that file already exists on worker host)] from which worker can download the package.|null|
| `[--classname]` | The source's class name if archive is file-url-path (file://)|null|
| `[--source-config-file]` | The path to a YAML config file specifying the source's configuration|null|
| `[--cpu]` | The CPU (in cores) that needs to be allocated per source instance (applicable only to Docker runtime)|null|
| `[--ram]` | The RAM (in bytes) that need to be allocated per source instance (applicable only to the process and Docker runtimes)|null|
| `[--disk]` | The disk (in bytes) that need to be allocated per source instance (applicable only to Docker runtime)|null|
| `[--source-config]` | Source config key/values|null|
| `[--batch-source-config]` | Batch source config key/values|null|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|
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


## available-sources

Get the list of Pulsar IO connector sources supported by Pulsar cluster

**Command:**

```shell
$ pulsar-admin sources available-sources options
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
$ pulsar-admin sources reload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

