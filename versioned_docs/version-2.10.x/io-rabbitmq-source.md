---
id: io-rabbitmq-source
title: RabbitMQ source connector
sidebar_label: "RabbitMQ source connector"
original_id: io-rabbitmq-source
---

The RabbitMQ source connector receives messages from RabbitMQ clusters
and writes messages to Pulsar topics.

## Configuration

The configuration of the RabbitMQ source connector has the following properties.

### Property

| Name                  | Type    | Required | Default        | Description                                                                            |
|-----------------------|---------|----------|----------------|----------------------------------------------------------------------------------------|
| `connectionName`      | String  | true     | (empty string) | The connection name.                                                                   |
| `host`                | String  | true     | (empty string) | The RabbitMQ host.                                                                     |
| `port`                | int     | true     | 5672           | The RabbitMQ port.                                                                     |
| `virtualHost`         | String  | true     | /              | The virtual host used to connect to RabbitMQ.                                          |
| `username`            | String  | false    | guest          | The username used to authenticate to RabbitMQ.                                         |
| `password`            | String  | false    | guest          | The password used to authenticate to RabbitMQ.                                         |
| `queueName`           | String  | true     | (empty string) | The RabbitMQ queue name that messages should be read from or written to.               |
| `requestedChannelMax` | int     | false    | 0              | The initially requested maximum channel number. <br/> 0 means unlimited.               |
| `requestedFrameMax`   | int     | false    | 0              | The initially requested maximum frame size in octets. <br/> 0 means unlimited.         |
| `connectionTimeout`   | int     | false    | 60000          | The timeout of TCP connection establishment in milliseconds. <br/> 0 means infinite.   |
| `handshakeTimeout`    | int     | false    | 10000          | The timeout of AMQP0-9-1 protocol handshake in milliseconds.                           |
| `requestedHeartbeat`  | int     | false    | 60             | The requested heartbeat timeout in seconds.                                            |
| `prefetchCount`       | int     | false    | 0              | The maximum number of messages that the server delivers.<br/> 0 means unlimited.       |
| `prefetchGlobal`      | boolean | false    | false          | Whether the setting should be applied to the entire channel rather than each consumer. |
| `passive`             | boolean | false    | false          | Whether the rabbitmq consumer should create its own queue or bind to an existing one.  |

### Example

Before using the RabbitMQ source connector, you need to create a configuration file through one of the following methods.

* JSON

  ```json

  {
     "configs": {
        "host": "localhost",
        "port": "5672",
        "virtualHost": "/",
        "username": "guest",
        "password": "guest",
        "queueName": "test-queue",
        "connectionName": "test-connection",
        "requestedChannelMax": "0",
        "requestedFrameMax": "0",
        "connectionTimeout": "60000",
        "handshakeTimeout": "10000",
        "requestedHeartbeat": "60",
        "prefetchCount": "0",
        "prefetchGlobal": "false",
        "passive": "false"
     }
  }

  ```

* YAML

  ```yaml

  configs:
      host: "localhost"
      port: 5672
      virtualHost: "/"
      username: "guest"
      password: "guest"
      queueName: "test-queue"
      connectionName: "test-connection"
      requestedChannelMax: 0
      requestedFrameMax: 0
      connectionTimeout: 60000
      handshakeTimeout: 10000
      requestedHeartbeat: 60
      prefetchCount: 0
      prefetchGlobal: "false"
      passive: "false"

  ```

## Usage


### Standalone mode

This example describes how to use the RabbitMQ source connector to feed data from RabbitMQ and write data to Pulsar topics in the standalone mode.

#### Prerequisites

- There is a RabbitMQ server with some history messages in the queue.

#### Steps

1. Get a Pulsar package and start Pulsar in standalone mode.

   ```bash
   wget https://archive.apache.org/dist/pulsar/pulsar-@pulsar:version@/apache-pulsar-@pulsar:version@-bin.tar.gz
   tar xvfz apache-pulsar-@pulsar:version@-bin.tar.gz
   cd apache-pulsar-@pulsar:version@
   bin/pulsar standalone
   ```

2. Download the [nar package](https://archive.apache.org/dist/pulsar/) corresponding to Pulsar's version and copy the following file to Pulsar's directory.

    ```bash
    wget https://archive.apache.org/dist/pulsar/pulsar-@pulsar:version@/connectors/pulsar-io-rabbitmq-@pulsar:version@.nar
    cp pulsar-io-rabbitmq-@pulsar:version@.nar ./connectors
    ```

3. Set the retention of the namespace, otherwise the messages into the Pulsar's topic which have not the subscription have been immediately deleted.

   ```bash
   ./bin/pulsar-admin namespaces set-retention -s 100M -t 3d public/default
   ```


4. Prepare a configuration file with name is _rabbitmq-source-queue-name.yaml_.
   ```yaml
    configs:
      host: "localhost"
      port: 5672
      virtualHost: "/"
      username: "guest"
      password: "guest"
      queueName: "test-queue"
      connectionName: "test-connection"
      requestedChannelMax: 0
      requestedFrameMax: 0
      connectionTimeout: 60000
      handshakeTimeout: 10000
      requestedHeartbeat: 60
      prefetchCount: 0
      prefetchGlobal: "false"
      passive: "false"
    ```

   Copy the configuration file to Pulsar‘s conf directory.
    ```bash
    cp rabbitmq-source-queue-name.yaml ./conf
    ```

5. Open a new terminal window and start the connector in local run mode.

   ```bash
   ./bin/pulsar-admin source localrun \
    --source-config-file conf/rabbitmq-source-queue-name.yaml \
    --archive connectors/pulsar-io-rabbitmq-@pulsar:version@.nar \
    --name rabbitmq-source \
    --destination-topic-name pulsar-rabbitmq-test-topic \
    --broker-service-url pulsar://{ip}:{port}
   ```

6. Open a new terminal window and check the topic is created automatically.

   ```bash
   ./bin/pulsar-admin topics list public/default \
   ```

   This topic is created automatically as follows:

    ```bash
    persistent://public/default/pulsar-rabbitmq-test-topic-partition-0
    ```

7. Consume this topic.

    ```bash
    ./bin/pulsar-client consume persistent://public/default/pulsar-rabbitmq-test-topic-partition-0 -s s1 -n 0 -p Earliest
    ```

   The following information appears on the consumer terminal window.

    ```bash
       ----- got message -----
       key:[quick.orange.pulsar], properties:[], content:message-topic-O(range) 0
       ----- got message -----
       key:[quick.orange.pulsar], properties:[], content:message-topic-O(range) 1

       ... ...

    ```
