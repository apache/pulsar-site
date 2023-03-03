## Pulsar configurations

Pulsar offers several command-line tools that you can use for managing Pulsar installations, performance testing, using command-line producers and consumers, and more.

You can manage Pulsar configurations through configuration files in the [`conf`](https://github.com/apache/pulsar/tree/master/conf) directory of a Pulsar installation.

- [BookKeeper](/next/config/reference-configuration-bookkeeper)
- [Broker](/next/config/reference-configuration-broker)
- [Client](/next/config/reference-configuration-client)
- [Log4j](/next/config/reference-configuration-log4j)
- [Log4j shell](/next/config/reference-configuration-log4j-shell)
- [Standalone](/next/config/reference-configuration-standalone)
- [WebSocket](/next/config/reference-configuration-websocket)
- [Pulsar proxy](/next/config/reference-configuration-pulsar-proxy)
- [ZooKeeper](/next/config/reference-configuration-zookeeper)

### Override client configurations

If you want to override the configurations of clients internal to brokers, websockets, and proxies, you can use the following prefix.

| Prefix        | Description                                                                                                                                                                                                                  |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| brokerClient_ | Configure **all** the Pulsar Clients and Pulsar Admin Clients of brokers, websockets, and proxies. These configurations are applied after hard-coded configurations and before the client configurations named in this site. |
| bookkeeper_   | Configure the broker's BookKeeper clients used by managed ledgers and the BookkeeperPackagesStorage bookkeeper client. Takes precedence over most other configuration values.                                                |

> Notes:
> * This override feature only applies to Pulsar 2.10.1 and later versions.
> * When running the function worker within the broker, you have to configure those clients by using the `functions_worker.yml` file. These prefixed configurations do not apply to any of those clients.