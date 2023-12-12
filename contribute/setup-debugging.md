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
