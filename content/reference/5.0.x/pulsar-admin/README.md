`pulsar-admin` is the command-line tool for administering Pulsar: clusters, tenants, namespaces, topics, schemas, functions, connectors, packages, transactions, brokers and bookies. It ships in the `bin` directory of the Pulsar distribution and is a client of the admin REST API, so everything it does can also be done with the REST API or the Java and Go admin clients; see [Pulsar admin interfaces - Get started](/docs/5.0.x/admin-get-started ':ignore') for the interfaces, their setup and a first walk-through.

## Usage

```shell
bin/pulsar-admin [global options] <group> <command> [command options]
```

Every group and command prints its help with `--help`, for example `bin/pulsar-admin topics --help` or `bin/pulsar-admin topics create-partitioned-topic --help`. The groups are listed in the sidebar and in the table below.

The connection settings are read from `conf/client.conf` (`webServiceUrl`, `authPlugin`, `authParams` and the TLS settings, see [Get started](/docs/5.0.x/admin-get-started ':ignore')) and can be overridden per invocation with the global options `--admin-url`, `--auth-plugin`, `--auth-params`, `--tls-trust-cert-path`, `--tls-allow-insecure`, `--tls-enable-hostname-verification` and `--request-timeout`.

## Command groups

| Group | Operations |
| --- | --- |
| [bookies](/5.0.x/pulsar-admin/bookies) | Bookie rack placement |
| [broker-stats](/5.0.x/pulsar-admin/broker-stats) | Broker statistics |
| [brokers](/5.0.x/pulsar-admin/brokers) | Brokers: list, health check, dynamic configuration, graceful shutdown |
| [clusters](/5.0.x/pulsar-admin/clusters) | Clusters, failure domains and namespace isolation policies |
| [functions](/5.0.x/pulsar-admin/functions) | Pulsar Functions |
| [functions-worker](/5.0.x/pulsar-admin/functions-worker) | Function worker statistics and rebalancing |
| [migration](/5.0.x/pulsar-admin/migration) | Metadata store migration |
| [namespaces](/5.0.x/pulsar-admin/namespaces) | Namespaces, bundles and namespace policies |
| [ns-isolation-policy](/5.0.x/pulsar-admin/ns-isolation-policy) | Namespace isolation policies |
| [packages](/5.0.x/pulsar-admin/packages) | Packages of functions and connectors |
| [proxy-stats](/5.0.x/pulsar-admin/proxy-stats) | Proxy statistics |
| [resource-quotas](/5.0.x/pulsar-admin/resource-quotas) | Resource quotas of namespace bundles |
| [resourcegroups](/5.0.x/pulsar-admin/resourcegroups) | Resource groups |
| [scalable-topics](/5.0.x/pulsar-admin/scalable-topics) | Scalable topics |
| [schemas](/5.0.x/pulsar-admin/schemas) | Schemas |
| [sinks](/5.0.x/pulsar-admin/sinks) | Pulsar IO sinks (egress data from Pulsar) |
| [sources](/5.0.x/pulsar-admin/sources) | Pulsar IO sources (ingress data into Pulsar) |
| [tenants](/5.0.x/pulsar-admin/tenants) | Tenants |
| [topicPolicies](/5.0.x/pulsar-admin/topicPolicies) | Topic-level policies |
| [topics](/5.0.x/pulsar-admin/topics) | Topics, partitions, subscriptions and messages |
| [transactions](/5.0.x/pulsar-admin/transactions) | Transactions and transaction coordinators |

## Environment variables

You can use the following environment variables to configure `pulsar-admin`.

| Variable                 | Description                        | Default          |
|--------------------------|------------------------------------|------------------|
| `PULSAR_LOG_CONF`        | Log4j configuration file           | conf/log4j2.yaml |
| `PULSAR_CLIENT_CONF`     | Configuration file for the client  | conf/client.conf |
| `PULSAR_EXTRA_OPTS`      | Extra options passed to the JVM    | N/A              |
| `PULSAR_EXTRA_CLASSPATH` | Extra paths for Pulsar's classpath | N/A              |

## Related topics

- [Pulsar admin interfaces - Get started](/docs/5.0.x/admin-get-started ':ignore')
- [Pulsar shell](/5.0.x/pulsar-shell/pulsar-shell), an interactive shell around the same commands
