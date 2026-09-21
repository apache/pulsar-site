# functions

Interface for managing Pulsar Functions (lightweight, Lambda-style compute processes that work with Pulsar)


```shell
$ pulsar-admin functions subcommand
```



## localrun

Run a Pulsar Function locally, rather than deploy to a Pulsar cluster)

**Command:**

```shell
$ pulsar-admin functions localrun options
```

**Options:**

|Flag|Description|Default|Support|
|---|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|Java, Python|
| `[--tenant]` | The tenant of a Pulsar Function|null|Java, Python, Go|
| `[--namespace]` | The namespace of a Pulsar Function|null|Java, Python, Go|
| `[--name]` | The name of a Pulsar Function|null|Java, Python, Go|
| `[--classname]` | The class name of a Pulsar Function|null|Java, Python|
| `[-t, --function-type]` | The built-in Pulsar Function type|null||
| `[--cleanup-subscription]` | Whether delete the subscription when function is deleted|null||
| `[--jar]` | Path to the JAR file for the function (if the function is written in Java). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Java|
| `[--py]` | Path to the main Python file/Python Wheel file for the function (if the function is written in Python). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Python|
| `[--go]` | Path to the main Go executable binary for the function (if the function is written in Go). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Go|
| `[-i, --inputs]` | The input topic or topics (multiple topics can be specified as a comma-separated list) of a Pulsar Function|null|Java, Python, Go|
| `[--topics-pattern]` | The topic pattern to consume from a list of topics under a namespace that matches the pattern. [--input] and [--topics-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java functions only)|null|Java, Python|
| `[-o, --output]` | The output topic of a Pulsar Function (If none is specified, no output is written)|null|Java, Python, Go|
| `[--producer-config]` | The custom producer configuration (as a JSON string)|null|Java|
| `[--log-topic]` | The topic to which the logs of a Pulsar Function are produced|null|Java, Python, Go|
| `[-st, --schema-type]` | The builtin schema type or custom schema class name to be used for messages output by the function||Java|
| `[--custom-serde-inputs]` | The map of input topics to SerDe class names (as a JSON string)|null|Java, Python|
| `[--custom-schema-inputs]` | The map of input topics to Schema properties (as a JSON string)|null|Java, Python|
| `[--custom-schema-outputs]` | The map of input topics to Schema properties (as a JSON string)|null|Java|
| `[--input-specs]` | The map of inputs to custom configuration (as a JSON string)|null|Java, Python, Go|
| `[--input-type-class-name]` | The class name of input type class|null|Java, Python, Go|
| `[--output-serde-classname]` | The SerDe class to be used for messages output by the function|null|Java, Python|
| `[--output-type-class-name]` | The class name of output type class|null|Java, Python, Go|
| `[--function-config-file]` | The path to a YAML config file that specifies the configuration of a Pulsar Function|null|Java, Python, Go|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the function. Available values are: `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, the `ATLEAST_ONCE` delivery guarantee is used.|null|Java, Python, Go|
| `[--user-config]` | User-defined config key/values|null|Java, Python, Go|
| `[--retain-ordering]` | Function consumes and processes messages in order|null|Java, Python, Go|
| `[--retain-key-ordering]` | Function consumes and processes messages in key order|null|Java, Python, Go|
| `[--batch-builder]` | BatcherBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT|null||
| `[--forward-source-message-property]` | Forwarding input message's properties to output topic when processing (use false to disable it)|true|Java|
| `[--subs-name]` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|Java, Python, Go|
| `[--subs-position]` | Pulsar source subscription position if user wants to consume messages from the specified location|null|Java|
| `[--skip-to-latest]` | Whether or not the consumer skip to latest message upon function instance restart|null||
| `[--parallelism]` | The parallelism factor of a Pulsar Function (i.e. the number of function instances to run)|null|Java|
| `[--cpu]` | The cpu in cores that need to be allocated per function instance(applicable only to docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--ram]` | The ram in bytes that need to be allocated per function instance(applicable only to process/docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--disk]` | The disk in bytes that need to be allocated per function instance(applicable only to docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--window-length-count]` | The number of messages per window|null|Java|
| `[--window-length-duration-ms]` | The time duration of the window in milliseconds|null|Java|
| `[--sliding-interval-count]` | The number of messages after which the window slides|null|Java|
| `[--sliding-interval-duration-ms]` | The time duration after which the window slides|null|Java|
| `[--auto-ack]` | Whether or not the framework acknowledges messages automatically|null|Java, Python, Go|
| `[--timeout-ms]` | The message timeout in milliseconds|null|Java, Python|
| `[--max-message-retries]` | How many times should we try to process a message before giving up|null|Java|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|Java|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|Java, Python|
| `[--dead-letter-topic]` | The topic where messages that are not processed successfully are sent to|null|Java|
| `[--runtime-flags]` | Any flags that you want to pass to a runtime (for process & Kubernetes runtime only).|null||
| `[--state-storage-service-url]` | The URL for the state storage service (the default is Apache BookKeeper)|null|Java, Python|
| `[--broker-service-url]` | The URL for Pulsar broker|null|Java, Python, Go|
| `[--web-service-url]` | The URL for Pulsar web service|null|Java, Python|
| `[--client-auth-plugin]` | Client authentication plugin using which function-process can connect to broker|null|Java, Python|
| `[--client-auth-params]` | Client authentication param|null|Java, Python|
| `[--use-tls]` | Use tls connection|false|Java, Python|
| `[--tls-allow-insecure]` | Allow insecure tls connection|false|Java, Python|
| `[--hostname-verification-enabled]` | Enable hostname verification|false|Java, Python|
| `[--tls-trust-cert-path]` | tls trust cert file path|null|Java, Python|
| `[--instance-id-offset]` | Start the instanceIds from this offset|0|Java, Python|
| `[--runtime]` | either THREAD or PROCESS. Only applies for Java functions|null|Java|
| `[--secrets-provider-classname]` | Whats the classname for secrets provider|null|Java, Python|
| `[--secrets-provider-config]` | Config that needs to be passed to secrets provider|null|Java, Python|
| `[--metrics-port-start]` | The starting port range for metrics server|null|Java, Python, Go|
| `[-h, --help]` | Show this help message and exit.|false||
| `[-v, --version]` | Print version information and exit.|false||


## create

Create a Pulsar Function in cluster mode (deploy it on a Pulsar cluster)

**Command:**

```shell
$ pulsar-admin functions create options
```

**Options:**

|Flag|Description|Default|Support|
|---|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|Java, Python|
| `[--tenant]` | The tenant of a Pulsar Function|null|Java, Python, Go|
| `[--namespace]` | The namespace of a Pulsar Function|null|Java, Python, Go|
| `[--name]` | The name of a Pulsar Function|null|Java, Python, Go|
| `[--classname]` | The class name of a Pulsar Function|null|Java, Python|
| `[-t, --function-type]` | The built-in Pulsar Function type|null||
| `[--cleanup-subscription]` | Whether delete the subscription when function is deleted|null||
| `[--jar]` | Path to the JAR file for the function (if the function is written in Java). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Java|
| `[--py]` | Path to the main Python file/Python Wheel file for the function (if the function is written in Python). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Python|
| `[--go]` | Path to the main Go executable binary for the function (if the function is written in Go). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Go|
| `[-i, --inputs]` | The input topic or topics (multiple topics can be specified as a comma-separated list) of a Pulsar Function|null|Java, Python, Go|
| `[--topics-pattern]` | The topic pattern to consume from a list of topics under a namespace that matches the pattern. [--input] and [--topics-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java functions only)|null|Java, Python|
| `[-o, --output]` | The output topic of a Pulsar Function (If none is specified, no output is written)|null|Java, Python, Go|
| `[--producer-config]` | The custom producer configuration (as a JSON string)|null|Java|
| `[--log-topic]` | The topic to which the logs of a Pulsar Function are produced|null|Java, Python, Go|
| `[-st, --schema-type]` | The builtin schema type or custom schema class name to be used for messages output by the function||Java|
| `[--custom-serde-inputs]` | The map of input topics to SerDe class names (as a JSON string)|null|Java, Python|
| `[--custom-schema-inputs]` | The map of input topics to Schema properties (as a JSON string)|null|Java, Python|
| `[--custom-schema-outputs]` | The map of input topics to Schema properties (as a JSON string)|null|Java|
| `[--input-specs]` | The map of inputs to custom configuration (as a JSON string)|null|Java, Python, Go|
| `[--input-type-class-name]` | The class name of input type class|null|Java, Python, Go|
| `[--output-serde-classname]` | The SerDe class to be used for messages output by the function|null|Java, Python|
| `[--output-type-class-name]` | The class name of output type class|null|Java, Python, Go|
| `[--function-config-file]` | The path to a YAML config file that specifies the configuration of a Pulsar Function|null|Java, Python, Go|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the function. Available values are: `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, the `ATLEAST_ONCE` delivery guarantee is used.|null|Java, Python, Go|
| `[--user-config]` | User-defined config key/values|null|Java, Python, Go|
| `[--retain-ordering]` | Function consumes and processes messages in order|null|Java, Python, Go|
| `[--retain-key-ordering]` | Function consumes and processes messages in key order|null|Java, Python, Go|
| `[--batch-builder]` | BatcherBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT|null||
| `[--forward-source-message-property]` | Forwarding input message's properties to output topic when processing (use false to disable it)|true|Java|
| `[--subs-name]` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|Java, Python, Go|
| `[--subs-position]` | Pulsar source subscription position if user wants to consume messages from the specified location|null|Java|
| `[--skip-to-latest]` | Whether or not the consumer skip to latest message upon function instance restart|null||
| `[--parallelism]` | The parallelism factor of a Pulsar Function (i.e. the number of function instances to run)|null|Java|
| `[--cpu]` | The cpu in cores that need to be allocated per function instance(applicable only to docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--ram]` | The ram in bytes that need to be allocated per function instance(applicable only to process/docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--disk]` | The disk in bytes that need to be allocated per function instance(applicable only to docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--window-length-count]` | The number of messages per window|null|Java|
| `[--window-length-duration-ms]` | The time duration of the window in milliseconds|null|Java|
| `[--sliding-interval-count]` | The number of messages after which the window slides|null|Java|
| `[--sliding-interval-duration-ms]` | The time duration after which the window slides|null|Java|
| `[--auto-ack]` | Whether or not the framework acknowledges messages automatically|null|Java, Python, Go|
| `[--timeout-ms]` | The message timeout in milliseconds|null|Java, Python|
| `[--max-message-retries]` | How many times should we try to process a message before giving up|null|Java|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|Java|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|Java, Python|
| `[--dead-letter-topic]` | The topic where messages that are not processed successfully are sent to|null|Java|
| `[--runtime-flags]` | Any flags that you want to pass to a runtime (for process & Kubernetes runtime only).|null||
| `[-h, --help]` | Show this help message and exit.|false||
| `[-v, --version]` | Print version information and exit.|false||


## delete

Delete a Pulsar Function that is running on a Pulsar cluster

**Command:**

```shell
$ pulsar-admin functions delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## update

Update a Pulsar Function that has been deployed to a Pulsar cluster

**Command:**

```shell
$ pulsar-admin functions update options
```

**Options:**

|Flag|Description|Default|Support|
|---|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|Java, Python|
| `[--tenant]` | The tenant of a Pulsar Function|null|Java, Python, Go|
| `[--namespace]` | The namespace of a Pulsar Function|null|Java, Python, Go|
| `[--name]` | The name of a Pulsar Function|null|Java, Python, Go|
| `[--classname]` | The class name of a Pulsar Function|null|Java, Python|
| `[-t, --function-type]` | The built-in Pulsar Function type|null||
| `[--cleanup-subscription]` | Whether delete the subscription when function is deleted|null||
| `[--jar]` | Path to the JAR file for the function (if the function is written in Java). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Java|
| `[--py]` | Path to the main Python file/Python Wheel file for the function (if the function is written in Python). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Python|
| `[--go]` | Path to the main Go executable binary for the function (if the function is written in Go). It also supports URL path [http/https/file (file protocol assumes that file already exists on worker host)/function (package URL from packages management service)] from which worker can download the package.|null|Go|
| `[-i, --inputs]` | The input topic or topics (multiple topics can be specified as a comma-separated list) of a Pulsar Function|null|Java, Python, Go|
| `[--topics-pattern]` | The topic pattern to consume from a list of topics under a namespace that matches the pattern. [--input] and [--topics-pattern] are mutually exclusive. Add SerDe class name for a pattern in --custom-serde-inputs (supported for java functions only)|null|Java, Python|
| `[-o, --output]` | The output topic of a Pulsar Function (If none is specified, no output is written)|null|Java, Python, Go|
| `[--producer-config]` | The custom producer configuration (as a JSON string)|null|Java|
| `[--log-topic]` | The topic to which the logs of a Pulsar Function are produced|null|Java, Python, Go|
| `[-st, --schema-type]` | The builtin schema type or custom schema class name to be used for messages output by the function||Java|
| `[--custom-serde-inputs]` | The map of input topics to SerDe class names (as a JSON string)|null|Java, Python|
| `[--custom-schema-inputs]` | The map of input topics to Schema properties (as a JSON string)|null|Java, Python|
| `[--custom-schema-outputs]` | The map of input topics to Schema properties (as a JSON string)|null|Java|
| `[--input-specs]` | The map of inputs to custom configuration (as a JSON string)|null|Java, Python, Go|
| `[--input-type-class-name]` | The class name of input type class|null|Java, Python, Go|
| `[--output-serde-classname]` | The SerDe class to be used for messages output by the function|null|Java, Python|
| `[--output-type-class-name]` | The class name of output type class|null|Java, Python, Go|
| `[--function-config-file]` | The path to a YAML config file that specifies the configuration of a Pulsar Function|null|Java, Python, Go|
| `[--processing-guarantees]` | The processing guarantees (as known as delivery semantics) applied to the function. Available values are: `ATLEAST_ONCE`, `ATMOST_ONCE`, `EFFECTIVELY_ONCE`. If it is not specified, the `ATLEAST_ONCE` delivery guarantee is used.|null|Java, Python, Go|
| `[--user-config]` | User-defined config key/values|null|Java, Python, Go|
| `[--retain-ordering]` | Function consumes and processes messages in order|null|Java, Python, Go|
| `[--retain-key-ordering]` | Function consumes and processes messages in key order|null|Java, Python, Go|
| `[--batch-builder]` | BatcherBuilder provides two types of batch construction methods, DEFAULT and KEY_BASED. The default value is: DEFAULT|null||
| `[--forward-source-message-property]` | Forwarding input message's properties to output topic when processing (use false to disable it)|true|Java|
| `[--subs-name]` | Pulsar source subscription name if user wants a specific subscription-name for input-topic consumer|null|Java, Python, Go|
| `[--subs-position]` | Pulsar source subscription position if user wants to consume messages from the specified location|null|Java|
| `[--skip-to-latest]` | Whether or not the consumer skip to latest message upon function instance restart|null||
| `[--parallelism]` | The parallelism factor of a Pulsar Function (i.e. the number of function instances to run)|null|Java|
| `[--cpu]` | The cpu in cores that need to be allocated per function instance(applicable only to docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--ram]` | The ram in bytes that need to be allocated per function instance(applicable only to process/docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--disk]` | The disk in bytes that need to be allocated per function instance(applicable only to docker runtime)|null|Java(Process & K8s),Python(K8s),Go(K8s)|
| `[--window-length-count]` | The number of messages per window|null|Java|
| `[--window-length-duration-ms]` | The time duration of the window in milliseconds|null|Java|
| `[--sliding-interval-count]` | The number of messages after which the window slides|null|Java|
| `[--sliding-interval-duration-ms]` | The time duration after which the window slides|null|Java|
| `[--auto-ack]` | Whether or not the framework acknowledges messages automatically|null|Java, Python, Go|
| `[--timeout-ms]` | The message timeout in milliseconds|null|Java, Python|
| `[--max-message-retries]` | How many times should we try to process a message before giving up|null|Java|
| `[--custom-runtime-options]` | A string that encodes options to customize the runtime, see docs for configured runtime for details|null|Java|
| `[--secrets]` | The map of secretName to an object that encapsulates how the secret is fetched by the underlying secrets provider|null|Java, Python|
| `[--dead-letter-topic]` | The topic where messages that are not processed successfully are sent to|null|Java|
| `[--runtime-flags]` | Any flags that you want to pass to a runtime (for process & Kubernetes runtime only).|null||
| `[--update-auth-data]` | Whether or not to update the auth data|false|Java, Python|
| `[-h, --help]` | Show this help message and exit.|false||
| `[-v, --version]` | Print version information and exit.|false||


## get

Fetch information about a Pulsar Function

**Command:**

```shell
$ pulsar-admin functions get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## restart

Restart function instance

**Command:**

```shell
$ pulsar-admin functions restart options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[--instance-id]` | The function instanceId (restart all instances if instance-id is not provided)|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## stop

Stops function instance

**Command:**

```shell
$ pulsar-admin functions stop options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[--instance-id]` | The function instanceId (stop all instances if instance-id is not provided)|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## start

Starts a stopped function instance

**Command:**

```shell
$ pulsar-admin functions start options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[--instance-id]` | The function instanceId (start all instances if instance-id is not provided)|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## status

Check the current status of a Pulsar Function

**Command:**

```shell
$ pulsar-admin functions status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[--instance-id]` | The function instanceId (Get-status of all instances if instance-id is not provided)|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## getstatus

Check the current status of a Pulsar Function

**Command:**

```shell
$ pulsar-admin functions getstatus options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[--instance-id]` | The function instanceId (Get-status of all instances if instance-id is not provided)|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## stats

Get the current stats of a Pulsar Function

**Command:**

```shell
$ pulsar-admin functions stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[--instance-id]` | The function instanceId (Get-stats of all instances if instance-id is not provided)|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## list

List all Pulsar Functions running under a specific tenant and namespace

**Command:**

```shell
$ pulsar-admin functions list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## querystate

Fetch the current state associated with a Pulsar Function

**Command:**

```shell
$ pulsar-admin functions querystate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[-k, --key]` | Key name of State|null|
| `[-w, --watch]` | Watch for changes in the value associated with a key for a Pulsar Function|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## putstate

Put the state associated with a Pulsar Function

**Command:**

```shell
$ pulsar-admin functions putstate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[-s, --state]` | The FunctionState that needs to be put|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## trigger

Trigger the specified Pulsar Function with a supplied value

**Command:**

```shell
$ pulsar-admin functions trigger options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[--trigger-value]` | The value with which you want to trigger the function|null|
| `[--trigger-file]` | The path to the file that contains the data with which you want to trigger the function|null|
| `[--topic]` | The specific topic name that the function consumes from that you want to inject the data to|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## upload

Upload File Data to Pulsar

**Command:**

```shell
$ pulsar-admin functions upload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--source-file]` | The file whose contents need to be uploaded|null|
| `[--path]` | Path or functionPkgUrl where the contents need to be stored|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## download

Download File Data from Pulsar

**Command:**

```shell
$ pulsar-admin functions download options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--fqfn]` | The Fully Qualified Function Name (FQFN) for the function|null|
| `[--tenant]` | The tenant of a Pulsar Function|null|
| `[--namespace]` | The namespace of a Pulsar Function|null|
| `[--name]` | The name of a Pulsar Function|null|
| `[--destination-file]` | The file to store downloaded content|null|
| `[--transform-function]` | Download the transform Function of the connector|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## reload

Reload the available built-in functions

**Command:**

```shell
$ pulsar-admin functions reload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## available-functions

Get the list of Pulsar Functions supported by Pulsar cluster

**Command:**

```shell
$ pulsar-admin functions available-functions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

