---
id: setup-debugging
title: Debugging Pulsar source code in IDE
sidebar_label: "Debugging"
description: Getting started to debugging Pulsar in IDE.
---

Debugging the Pulsar with its source code can be essential for identifying and resolving issues during development. This page provides step-by-step instructions on debugging Pulsar in standalone mode and debugging the source version of Apache Pulsar.

## Debugging Pulsar in Standalone Mode 

### Download and Extract Pulsar Binary Distribution

Download the binary distribution of the desired Pulsar release and extract it to a directory of your choice.

### Run Pulsar in Standalone Mode with Debugger Options

Navigate to the Pulsar directory and run the following command:
   
```bash
OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar standalone -nss -nfw
```

:::note

`suspend=n` allows the process to start without waiting for the debugger to connect immediately. You can change `suspend=n` to `suspend=y` if you want the process to wait for the debugger to connect.

:::

:::note

In your IDE, follow the instructions at [Setting up an IDE](setup-ide.md) to configure your IDE for Pulsar development.

:::

## Configure IntelliJ IDEA for Remote Debugging

First, Open Your Pulsar Project in IntelliJ IDEA:
    
1. Open IntelliJ IDEA.
2. Go to `File > Open` and navigate to your Pulsar project.


Then, create a Remote Debugger Configuration:

1. Open the `Run/Debug Configurations` dialog by clicking on the dropdown near the top-right corner (next to the `Run/Debug` button) and selecting `Edit Configurations`.
2. Click the `+` button to add a new configuration and choose `Remote` from the list.
3. Provide a name for your configuration (e.g., "Pulsar Remote Debugger"). 
4. Set `Debugger mode` to `Attach to remote JVM`.
5. Set `Host` to localhost or the IP address of the machine running Pulsar.
6. Set `Port` to the same port number used in your Pulsar startup command (e.g., 5005).
7. Click `Ok` to save the configuration.


:::note

To reset the persistent state, you can remove data under the `data` folder before starting, with: `rm -rf data`.

:::

## Debugging the source version of Pulsar

Clone and compile Pulsar from source code and run Pulsar in standalone mode with debugger options:

```bash
git clone https://github.com/apache/pulsar
cd pulsar
mvn -Pcore-modules,-main -T 1C install -DskipTests -Dspotbugs.skip=true
OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar standalone -nss -nfw
```

## Debugging pulsar-shell and pulsar-client 

```bash
# For Pulsar-Shell
OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar-shell
# For Pulsar-Client
# Consumer
OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar-client consume -s sub apache/pulsar/test-topic -n 0  
# Producer
OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar-client produce apache/pulsar/test-topic  -m "---------hello apache pulsar-------" -n 10
```

Ensure that the debugger is configured in your IDE to connect to the specified port.

By following these steps, you can effectively debug both the standalone mode and the source version of Apache Pulsar, including pulsar-shell and pulsar-client processes.

## Enabling debug logging for specific classes when running unit tests in IDE or locally

When working on Pulsar unit tests, you sometimes want to enable debug logging for a specific class, a set of classes, or a certain package to observe what the code is doing while you're running it. Stepping through with a debugger isn't a feasible approach for different race conditions and when timings and timeouts are involved. In those cases, you could add debug log statements to the code if they don't already exist. This helps understand the behavior of a failing test case.

For tests in the pulsar-broker module, you need to edit the [`pulsar-broker/src/test/resources/log4j2.xml` file](https://github.com/apache/pulsar/blob/master/pulsar-broker/src/test/resources/log4j2.xml) to enable logging. Adding a `Logger` element in `Loggers` can be used to enable debug logging for a complete package tree or specific classes.

```xml
    <Logger name="<<package or classname>>" level="DEBUG" additivity="false">
      <AppenderRef ref="CONSOLE"/>
    </Logger>
```

Here's an example:

```xml
<Configuration xmlns="http://logging.apache.org/log4j/2.0/config"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="http://logging.apache.org/log4j/2.0/config https://logging.apache.org/log4j/2.0/log4j-core.xsd">
  <Appenders>
    <!-- setting follow="true" is required for using ConsoleCaptor to validate log messages -->
    <Console name="CONSOLE" target="SYSTEM_OUT" follow="true">
      <PatternLayout pattern="%d{ISO8601} - %-5p - [%t:%c{1}] - %m%n"/>
    </Console>
  </Appenders>
  <Loggers>
    <Root level="INFO">
      <AppenderRef ref="CONSOLE"/>
    </Root>
    <Logger name="org.apache.pulsar.broker.service.persistent.PersistentStickyKeyDispatcherMultipleConsumers" level="DEBUG" additivity="false">
      <AppenderRef ref="CONSOLE"/>
    </Logger>
    <!-- loggers for debugging Key_Shared / PIP-379 -->
    <Logger name="org.apache.pulsar.broker.service.persistent.PersistentStickyKeyDispatcherMultipleConsumers" level="DEBUG" additivity="false">
      <AppenderRef ref="CONSOLE"/>
    </Logger>
    <Logger name="org.apache.pulsar.broker.service.DrainingHashesTracker" level="DEBUG" additivity="false">
      <AppenderRef ref="CONSOLE"/>
    </Logger>
    <Logger name="org.apache.pulsar.broker.service.persistent.RescheduleReadHandler" level="DEBUG" additivity="false">
      <AppenderRef ref="CONSOLE"/>
    </Logger>
  </Loggers>
</Configuration>
```

You can also set debugging at a package level to debug and exclude classes that are causing verbose logging. In those cases, you'd set the log level to `WARN` for the classes that are too verbose for your debugging case.

```xml
    <Logger name="org.apache.pulsar.client.impl.ClientCnx" level="WARN" additivity="false">
      <AppenderRef ref="CONSOLE"/>
    </Logger>
```

The same approach can be used to modify Pulsar standalone's logging configuration available at `conf/log4j2.yaml` when you are debugging Pulsar standalone instead of debugging a Pulsar unit test failure. The main difference is that the syntax is in YAML. The default config file contains examples for over logger-specific configuration.