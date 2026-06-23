---
id: functions-runtime-process
title: Configure process runtime
sidebar_label: "Configure process runtime"
description: Configure process runtime for functions in Pulsar.
---

You can use the default configurations of process runtime in the `conf/functions_worker.yml` file.

If you want to customize more parameters, refer to the following example.

```yaml
functionRuntimeFactoryClassName: org.apache.pulsar.functions.runtime.process.ProcessRuntimeFactory
functionRuntimeFactoryConfigs:
  # the directory for storing the function logs
  logDirectory:
  # change the jar location only when you put the java instance jar in a different location
  javaInstanceJarLocation:
  # change the python instance location only when you put the python instance jar in a different location
  pythonInstanceLocation:
  # change the extra dependencies location:
  extraFunctionDependenciesDir:
```

For more details, see [code](https://github.com/apache/pulsar/blob/master/pulsar-functions/runtime/src/main/java/org/apache/pulsar/functions/runtime/process/ProcessRuntimeFactoryConfig.java).

### Set runtime parameter with configuration file

Pulsar Functions now supports setting runtime parameters using a configuration file **in Python**. 

**Example**

You can start a Python runtime using the configuration file `config.ini` with the following command.

```shell
pulsar-admin functions localrun \
  --py /path/to/python_instance.py \
  --config-file /path/to/config.ini \
  --classname MyFunction \
  --logging_level debug \
  --inputs persistent://public/default/my-input-topic \
  --output persistent://public/default/my-output-topic \
  --log-topic persistent://public/default/functions-logs
```

` --config-file` is the path to the configuration file. Note that:

- The ` --config-file` should be written in `.ini` format, with each parameter being configured as `key = value`. 

    **Example**

    ```ini
    [DEFAULT]
    logging_level = info
    max_pending_async_requests = 1000
    max_concurrent_requests = 50
    ```

- When you set a parameter through both the configuration file and the command line, like `logging_level` in the example above, the value set through the command line will **take precedence over** the one set through the configuration file. As a result, the value of `logging_level` is `debug`.