---
id: admin-api-debugging
title: Debugging Admin API
sidebar_label: "Debugging"
description: Getting started to debugging Pulsar admin API.
---

Debugging the Pulsar Admin API can be essential for identifying and resolving issues during development. This documentation provides step-by-step instructions on debugging Pulsar in standalone mode and debugging the source version of Apache Pulsar.

## Debugging Pulsar in Standalone Mode 

### Download and Extract Pulsar Binary Distribution

Download the binary distribution of the desired Pulsar release and extract it to a directory of your choice.

### Run Pulsar in Standalone Mode with Debugger Options

Navigate to the Pulsar directory and run the following command:
   
```bash
OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar standalone -nss -nfw
```

:::note

`suspend=n` allows the process to start without waiting for the debugger to connect immediately.
You can change `suspend=n` to `suspend=y` if you want the process to wait for the debugger to connect.

:::

:::note

In your IDE, follow the instructions at [Setting up an IDE](https://pulsar.apache.org/contribute/setup-ide/)
to configure your IDE for Pulsar development.

:::

## Configure Your IDE

### Configure IntelliJ for Remote Debugging
    
1. Open Your Pulsar Project in IntelliJ: 
2. Open IntelliJ IDEA.
3. Go to File > Open and navigate to your Pulsar project.
4. Create a Remote Debugger Configuration:
5. Open the Run/Debug Configurations dialog by clicking on the dropdown near the top-right corner (next to the Run/Debug button) and 
selecting Edit Configurations....
6. Click the + button to add a new configuration and choose Remote from the list.
7. Provide a name for your configuration (e.g., "Pulsar Remote Debugger"). 
8. Set the Debugger mode to Attach to remote JVM.
9. Set the Host to localhost or the IP address of the machine running Pulsar.
10. Set the Port to the same port number used in your Pulsar startup command (e.g., 5005). Click Ok to save the configuration.


:::note

To reset the persistent state, you can remove `data/*` before starting. `rm -rf data/*`.

:::

## Debugging the Source Version of Pulsar

### Clone and Compile Pulsar Source and Run Pulsar in Standalone Mode with Debugger Options


```bash
git clone https://github.com/apache/pulsar
cd pulsar
mvn -Pcore-modules,-main -T 1C install -DskipTests -Dspotbugs.skip=true
OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" ./bin/pulsar standalone -nss -nfw
```

## Debugging Pulsar-Shell and Pulsar Client 

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

By following these steps, you can effectively debug both the standalone mode and the source version of Apache Pulsar, including Pulsar-Shell and Pulsar Client processes.





