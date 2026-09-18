---
id: admin-api-functions
title: Manage Functions
sidebar_label: "Functions"
description: Learn how to manage functions using Pulsar CLI and admin APIs.
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

:::tip

This page only shows **some frequently used operations**. For the latest and complete information, see the **reference docs** below.

:::

Category|Method|If you want to manage functions...
|---|---|---
[Pulsar CLI](reference-cli-tools.md) |[pulsar-admin](/reference/#/@pulsar:version_reference@/pulsar-admin/), which lists all commands, flags, descriptions, and more.| See the `functions` command
[Pulsar admin APIs](admin-api-overview.md)| {@inject: rest:REST API:/}, which lists all parameters, responses, samples, and more.|See the `/admin/v3/functions` endpoint
[Pulsar admin APIs](admin-api-overview.md)|[Java admin API](@pulsar:javadoc:admin@/), which lists all classes, methods, descriptions, and more.|See the `functions` method of the `PulsarAdmin` object


You can perform the following operations on [functions](functions-overview.md/#what-are-pulsar-functions).
## Create a function

You can create a Pulsar function in cluster mode (deploy it on a Pulsar cluster) using the Admin CLI, the REST API or the Java admin API. Every interface takes the same two inputs:

- the **configuration**: the fields of [`FunctionConfig`](@pulsar:javadoc:admin@/org/apache/pulsar/common/functions/FunctionConfig.html) (`tenant`, `namespace`, `name`, `className`, `inputs`, `output`, `parallelism`, `userConfig`, `resources`, ...). Every field is available in every interface under the same name: as command-line options or the keys of the YAML file for the CLI, the keys of the JSON `functionConfig` part for the REST API, and the setters of the `FunctionConfig` object in Java, for both create and [update](#update-a-function);
- the **package**, in one of three forms:

| Package | How to pass it | Notes |
| --- | --- | --- |
| A file | CLI: `--jar`, `--py` or `--go`; REST: the `data` file part; Java: the file name argument | Uploaded to the function worker. |
| A URL | CLI: `jar: <url>` in the configuration file; REST: the `url` form field; Java: `createFunctionWithUrl` | Fetched by the function worker; the URL must be allowed, see below. |
| A [built-in function](functions-deploy-cluster-builtin.md) | `jar: builtin://<function name>` in the configuration, no package | The worker uses the function from its `functionsDirectory`. |

A package URL is fetched by the function worker and must be allowed by its configuration in `conf/functions_worker.yml`; a URL that is not allowed fails with `400 Function Package url is not valid`:

- `file:///path/on/the/worker`: the path must lie inside the worker's `functionsDirectory`, with `enableReferencingFunctionsDirectoryFiles: true` (the default).
- `http://...` or `https://...`: the URL must match one of the regular expressions in `additionalEnabledFunctionsUrlPatterns` (empty by default). A `file://` path outside the functions directory can be allowed the same way.
- `function://tenant/namespace/name@version`: a package uploaded to [package management](admin-api-packages.md); requires `functionsWorkerEnablePackageManagement: true`.
- Sources and sinks use `connectorsDirectory`, `enableReferencingConnectorDirectoryFiles` and `additionalEnabledConnectorUrlPatterns` instead.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`create`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=create) subcommand. The configuration can be given as command-line options:

```shell
pulsar-admin functions create \
    --tenant public \
    --namespace default \
    --name exclamation \
    --classname org.apache.pulsar.functions.api.examples.ExclamationFunction \
    --inputs persistent://public/default/test-input-topic \
    --output persistent://public/default/test-output-topic \
    --parallelism 1 \
    --jar $PWD/examples/api-examples.jar
```

or kept in a YAML file passed with `--function-config-file`, which is easier to maintain: it can live in version control, and the same file serves [`update`](#update-a-function) later. Command-line options override the values in the file.

```shell
cat > exclamation.yaml <<EOF
tenant: public
namespace: default
name: exclamation
className: org.apache.pulsar.functions.api.examples.ExclamationFunction
inputs:
  - persistent://public/default/test-input-topic
output: persistent://public/default/test-output-topic
parallelism: 1
EOF

pulsar-admin functions create \
    --function-config-file exclamation.yaml \
    --jar $PWD/examples/api-examples.jar
```

For a package URL or a built-in function, put it in the `jar` key of the file (`jar: https://...` or `jar: builtin://<function name>`) and drop `--jar`.

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/registerFunction)

The request is a `multipart/form-data` `POST` with the JSON configuration in the `functionConfig` part, which must be sent with the content type `application/json`, and the package as the `data` file part or the `url` form field (`-F "url=https://..."`). With `curl`:

```shell
cat > /tmp/functionconfig.json <<EOF
{
  "tenant": "public",
  "namespace": "default",
  "name": "exclamation",
  "className": "org.apache.pulsar.functions.api.examples.ExclamationFunction",
  "runtime": "JAVA",
  "inputs": ["persistent://public/default/test-input-topic"],
  "output": "persistent://public/default/test-output-topic",
  "parallelism": 1
}
EOF

curl -X POST \
  -H "Authorization: Bearer $(cat token)" \
  -F "functionConfig=@/tmp/functionconfig.json;type=application/json" \
  -F "data=@$PWD/examples/api-examples.jar;type=application/octet-stream" \
  http://localhost:8080/admin/v3/functions/public/default/exclamation
```

For a built-in function, send no package and set `jar` in the configuration:

```shell
cat > /tmp/functionconfig.json <<EOF
{
  "tenant": "public",
  "namespace": "default",
  "name": "myfunction",
  "jar": "builtin://builtin-function-name",
  "runtime": "JAVA",
  "inputs": ["persistent://public/default/input-topic"],
  "output": "persistent://public/default/output-topic",
  "parallelism": 1
}
EOF

curl -X POST \
  -H "Authorization: Bearer $(cat token)" \
  -F "functionConfig=@/tmp/functionconfig.json;type=application/json" \
  http://localhost:8080/admin/v3/functions/public/default/myfunction
```

Send the request to the broker's web service port (8080) when the function worker [runs with the brokers](functions-worker-corun.md), or to the worker's own port (`workerPort`, 6750 by default) when it [runs separately](functions-worker-run-separately.md). Sources and sinks use the same shape with a `sourceConfig` or `sinkConfig` part.

</TabItem>
<TabItem value="Java">

```java
FunctionConfig functionConfig = new FunctionConfig();
functionConfig.setTenant(tenant);
functionConfig.setNamespace(namespace);
functionConfig.setName(functionName);
functionConfig.setRuntime(FunctionConfig.Runtime.JAVA);
functionConfig.setParallelism(1);
functionConfig.setClassName("org.apache.pulsar.functions.api.examples.ExclamationFunction");
functionConfig.setProcessingGuarantees(FunctionConfig.ProcessingGuarantees.ATLEAST_ONCE);
functionConfig.setTopicsPattern(sourceTopicPattern);
functionConfig.setSubName(subscriptionName);
functionConfig.setOutput(sinkTopic);
admin.functions().createFunction(functionConfig, fileName);
```

</TabItem>

</Tabs>
````

## Update a function

You can update a function that is already deployed using the Admin CLI, the REST API or the Java admin API. An update takes the same configuration and package as [create](#create-a-function) and uses the same requests, so the examples above apply; what differs is how the function worker treats them:

- The configuration is **merged** into the deployed one: settings you leave out keep their current values, and the tenant, namespace and name must match the deployed function. You can therefore send either the complete configuration the function was created with, or only its identity (tenant, namespace, name) and the settings to change.
- Some settings **cannot be changed** by an update: the input topics, the subscription name, the processing guarantees, the ordering guarantees and the runtime. To change those, delete the function and create it again.
- The **package is optional**: leave it out to keep the deployed code, or provide it to roll out a new build.
- An update that changes neither the configuration nor the package is rejected with `400 Update contains no change`.
- The update-only option `--update-auth-data` (`updateOptions.updateAuthData` in the REST and Java APIs) makes the worker replace the authentication data stored for the function, for example the token the function uses to connect to Pulsar, with the credentials of the caller.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`update`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=update) subcommand. Update merges into the deployed configuration, so you can pass the same configuration file as in the create example, a file with only `tenant`, `namespace`, `name` and the settings to change, or just command-line options; either way, pass `--jar` (or `--py`, `--go`) to also roll out a new implementation, and leave it out to keep the deployed one.

**Example**

```shell
# roll out a new build of the function (with whatever the file contains, changed or not)
pulsar-admin functions update \
    --function-config-file exclamation.yaml \
    --jar $PWD/examples/api-examples-2.jar

# change only the configuration, for example after setting parallelism: 2 in the file;
# the deployed implementation is kept
pulsar-admin functions update \
    --function-config-file exclamation.yaml

# the same change with command-line options only: the function's identity and the settings to change
pulsar-admin functions update \
    --tenant public \
    --namespace default \
    --name exclamation \
    --parallelism 2
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/updateFunction)

The same `multipart/form-data` request as for create, sent as a `PUT`. Update merges into the deployed configuration, so the `functionConfig` part can be the complete configuration or only the function's identity and the settings to change; include the `data` part (or the `url` field) to also roll out a new implementation, leave it out to keep the deployed one, and add the optional `updateOptions` part to replace the stored authentication data:

```shell
# roll out a new build of the function (with whatever the file contains, changed or not)
curl -X PUT \
  -H "Authorization: Bearer $(cat token)" \
  -F "functionConfig=@/tmp/functionconfig.json;type=application/json" \
  -F "data=@$PWD/examples/api-examples-2.jar;type=application/octet-stream" \
  http://localhost:8080/admin/v3/functions/public/default/exclamation

# change only the configuration, for example after setting "parallelism": 2 in the file;
# the deployed implementation is kept. Also replace the stored authentication data with the caller's
curl -X PUT \
  -H "Authorization: Bearer $(cat token)" \
  -F "functionConfig=@/tmp/functionconfig.json;type=application/json" \
  -F 'updateOptions={"updateAuthData":true};type=application/json' \
  http://localhost:8080/admin/v3/functions/public/default/exclamation

# the same change with a minimal configuration: the function's identity and the settings to change
curl -X PUT \
  -H "Authorization: Bearer $(cat token)" \
  -F 'functionConfig={"tenant":"public","namespace":"default","name":"exclamation","parallelism":2};type=application/json' \
  http://localhost:8080/admin/v3/functions/public/default/exclamation
```

</TabItem>
<TabItem value="Java">

```java
// Update merges into the deployed configuration, so the function's identity and the settings
// to change are enough; the complete configuration from the create example works as well.
FunctionConfig update = new FunctionConfig();
update.setTenant(tenant);
update.setNamespace(namespace);
update.setName(functionName);

// roll out a new build of the function, keeping the deployed configuration
admin.functions().updateFunction(update, "/path/to/api-examples-2.jar", new UpdateOptionsImpl());

// change only the configuration, here the parallelism; the deployed implementation is kept
update.setParallelism(2);
admin.functions().updateFunction(update, null, new UpdateOptionsImpl());

// also replace the stored authentication data with the caller's credentials
UpdateOptionsImpl updateOptions = new UpdateOptionsImpl();
updateOptions.setUpdateAuthData(true);
admin.functions().updateFunction(update, null, updateOptions);
```

`UpdateOptionsImpl` (`org.apache.pulsar.common.functions`, in `pulsar-common`) implements the `UpdateOptions` interface that `updateFunction` takes.

</TabItem>

</Tabs>
````

## Start a function

You can [start an instance of a function](#start-an-instance-of-a-function) or [start all instances of a function](#start-all-instances-of-a-function).
### Start an instance of a function

You can start a stopped function instance with `instance-id` using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`start`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=start) subcommand.

```shell
pulsar-admin functions start \
    --tenant public \
    --namespace default \
    --name (the name of Pulsar Functions) \
    --instance-id 1
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/startFunction_1)

</TabItem>
<TabItem value="Java">

```java
admin.functions().startFunction(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Start all instances of a function

You can start all stopped function instances using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`start`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=start) subcommand.

**Example**

```shell
pulsar-admin functions start \
    --tenant public \
    --namespace default \
    --name (the name of Pulsar Functions) \
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/startFunction)

</TabItem>
<TabItem value="Java">

```java
admin.functions().startFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

## Stop a function

You can [stop an instance of a function](#stop-an-instance-of-a-function) or [stop all instances of a function](#stop-all-instances-of-a-function).

### Stop an instance of a function

You can stop a function instance with `instance-id` using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`stop`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=stop) subcommand.

**Example**

```shell
pulsar-admin functions stop \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--instance-id 1
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/stopFunction_1)

</TabItem>
<TabItem value="Java">

```java
admin.functions().stopFunction(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Stop all instances of a function

You can stop all function instances using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`stop`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=stop) subcommand.

**Example**

```shell
pulsar-admin functions stop \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/stopFunction)

</TabItem>
<TabItem value="Java">

```java
admin.functions().stopFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

## Restart a function

You can [restart an instance of a function](#restart-an-instance-of-a-function) or [restart all instances of a function](#restart-all-instances-of-a-function).

### Restart an instance of a function

Restart a function instance with `instance-id` using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`restart`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=restart) subcommand.

**Example**

```shell
pulsar-admin functions restart \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--instance-id 1
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/restartFunction_1)

</TabItem>
<TabItem value="Java">

```java
admin.functions().restartFunction(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Restart all instances of a function

You can restart all function instances using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`restart`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=restart) subcommand.

**Example**

```shell
pulsar-admin functions restart \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/restartFunction)

</TabItem>
<TabItem value="Java">

```java
admin.functions().restartFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

## List all functions

You can list all Pulsar functions running under a specific tenant and namespace using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`list`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=list) subcommand.

**Example**

```shell
pulsar-admin functions list \
	--tenant public \
	--namespace default
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/listFunctions)

</TabItem>
<TabItem value="Java">

```java
admin.functions().getFunctions(tenant, namespace);
```

</TabItem>

</Tabs>
````

## Delete a function

You can delete a Pulsar function that is running on a Pulsar cluster using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`delete`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=delete) subcommand.

**Example**

```shell
pulsar-admin functions delete \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/deregisterFunction)

</TabItem>
<TabItem value="Java">

```java
admin.functions().deleteFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

## Get info about a function

You can get information about a Pulsar function currently running in cluster mode using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`get`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=get) subcommand.

**Example**

```shell
pulsar-admin functions get \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/getFunctionInfo)

</TabItem>
<TabItem value="Java">

```java
admin.functions().getFunction(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

## Get status of a function

You can [get the status of an instance of a function](#get-status-of-an-instance-of-a-function) or [get the status of all instances of a function](#get-status-of-all-instances-of-a-function).

### Get status of an instance of a function

You can get the current status of a Pulsar function instance with `instance-id` using Admin CLI, REST API or Java Admin API.
````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`status`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=status) subcommand.

**Example**

```shell
pulsar-admin functions status \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--instance-id 1
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/getFunctionInstanceStatus)

</TabItem>
<TabItem value="Java">

```java
admin.functions().getFunctionStatus(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Get status of all instances of a function

You can get the current status of a Pulsar function instance using Admin CLI, REST API or Java Admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`status`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=status) subcommand.

**Example**

```shell
pulsar-admin functions status \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/getFunctionStatus)

</TabItem>
<TabItem value="Java">

```java
admin.functions().getFunctionStatus(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

## Get stats of a function

You can [get stats of an instance of a function](#get-stats-of-an-instance-of-a-function) or [get stats of all instances of a function](#get-stats-of-all-instances-of-a-function).
### Get stats of an instance of a function

You can get the current stats of a Pulsar Function instance with `instance-id` using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`stats`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=stats) subcommand.

**Example**

```shell
pulsar-admin functions stats \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--instance-id 1
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/getFunctionInstanceStats)

</TabItem>
<TabItem value="Java">

```java
admin.functions().getFunctionStats(tenant, namespace, functionName, Integer.parseInt(instanceId));
```

</TabItem>

</Tabs>
````

### Get stats of all instances of a function

You can get the current stats of a Pulsar function using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`stats`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=stats) subcommand.

**Example**

```shell
pulsar-admin functions stats \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions)
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/getFunctionStats)

</TabItem>
<TabItem value="Java">

```java
admin.functions().getFunctionStats(tenant, namespace, functionName);
```

</TabItem>

</Tabs>
````

## Trigger a function

You can trigger a specified Pulsar function with a supplied value using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`trigger`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=trigger) subcommand.

**Example**

```shell
pulsar-admin functions trigger \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--topic (the name of input topic) \
	--trigger-value \"hello pulsar\"
	# or --trigger-file (the path of trigger file)
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/triggerFunction)

</TabItem>
<TabItem value="Java">

```java
admin.functions().triggerFunction(tenant, namespace, functionName, topic, triggerValue, triggerFile);
```

</TabItem>

</Tabs>
````



## Put state associated with a function

You can put the state associated with a Pulsar function using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`putstate`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=putstate) subcommand.

**Example**

```shell
pulsar-admin functions putstate \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--state "{\"key\":\"pulsar\", \"stringValue\":\"hello pulsar\"}"
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/putFunctionState)

</TabItem>
<TabItem value="Java">

```java
TypeReference<FunctionState> typeRef = new TypeReference<FunctionState>() {};
FunctionState stateRepr = ObjectMapperFactory.getThreadLocal().readValue(state, typeRef);
admin.functions().putFunctionState(tenant, namespace, functionName, stateRepr);
```

</TabItem>

</Tabs>
````

## Fetch state associated with a function

You can fetch the current state associated with a Pulsar function using Admin CLI, REST API or Java admin API.

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Admin CLI"
  values={[{"label":"Admin CLI","value":"Admin CLI"},{"label":"REST API","value":"REST API"},{"label":"Java","value":"Java"}]}>
<TabItem value="Admin CLI">

Use the [`querystate`](/reference/#/@pulsar:version_reference@/pulsar-admin/functions?id=querystate) subcommand.

**Example**

```shell
pulsar-admin functions querystate \
	--tenant public \
	--namespace default \
	--name (the name of Pulsar Functions) \
	--key (the key of state)
```

</TabItem>
<TabItem value="REST API">

[](swagger:/admin/v3/functions/getFunctionState)

</TabItem>
<TabItem value="Java">

```java
admin.functions().getFunctionState(tenant, namespace, functionName, key);
```

</TabItem>

</Tabs>
````
