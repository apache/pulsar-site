`pulsar-perf` is a tool used to test the performance of Pulsar brokers.

## Environment variables

You can use the following environment variables to configure `pulsar-perf`.

|Variable|Description|Default|
|---|---|---|
|`PULSAR_LOG_CONF`|Log4j configuration file|conf/log4j2.yaml|
|`PULSAR_CLIENT_CONF`|Configuration file for the client|conf/client.conf|
|`PULSAR_EXTRA_OPTS`|Extra options passed to the JVM|N/A|
|`PULSAR_EXTRA_CLASSPATH`|Extra paths for Pulsar's classpath|N/A|