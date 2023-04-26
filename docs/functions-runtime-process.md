---
id: functions-runtime-process
title: Configure process runtime
sidebar_label: "Configure process runtime"
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

Pulsar Functions now supports setting runtime parameters using a configuration file. Currently, only the Python Runtime is supported. The path to the configuration file can be specified with the `--config-file` parameter.

The configuration file should be written in `.ini` format, with each parameter being configured as `key = value`. Here's an example:

```ini
[DEFAULT]
logging_level = info
max_pending_async_requests = 1000
max_concurrent_requests = 50
```

Note that parameters in the configuration file will override those of the same name specified on the command line.

Let's assume we have a configuration file named `config.ini` with the above contents. Then we can start the Python Runtime using the configuration file with the following command:

```shell
pulsar-admin functions localrun \
  --py /path/to/python_instance.py \
  --config-file /path/to/config.ini \
  --classname MyFunction \
  --logging_leve debug \
  --inputs persistent://public/default/my-input-topic \
  --output persistent://public/default/my-output-topic \
  --log-topic persistent://public/default/functions-logs
```

This starts the Python Runtime with the parameters specified in the configuration file. 

Note that when starting with a configuration file, all parameters can be set in the configuration file. If you specify parameters on the command line that are also present in the configuration file, the values of the parameters on the command line will take precedence over the values in the configuration file (In the example above, the `logging_level` will be set to `debug`).
