`pulsar-admin` is the command-line tool for administering Pulsar: clusters, tenants, namespaces, topics, schemas, functions, connectors, packages, transactions, brokers and bookies. It ships in the `bin` directory of the Pulsar distribution and is a client of the admin REST API, so everything it does can also be done with the REST API or the Java and Go admin clients; see [Pulsar admin interfaces - Get started](pathname:///docs/@pulsar:version_reference@/admin-get-started ':ignore') for the interfaces, their setup and a first walk-through.

## Usage

```shell
bin/pulsar-admin [global options] <group> <command> [command options]
```

Every group and command prints its help with `--help`, for example `bin/pulsar-admin topics --help` or `bin/pulsar-admin topics create-partitioned-topic --help`. The groups are listed in the sidebar and in the table below.

The connection settings are read from `conf/client.conf` (`webServiceUrl`, `authPlugin`, `authParams` and the TLS settings, see [Get started](pathname:///docs/@pulsar:version_reference@/admin-get-started ':ignore')) and can be overridden per invocation with the global options `--admin-url`, `--auth-plugin`, `--auth-params`, `--tls-trust-cert-path`, `--tls-allow-insecure`, `--tls-enable-hostname-verification` and `--request-timeout`.

## Command groups

| Group | Operations |
| --- | --- |
| [bookies](/@pulsar:version_reference@/pulsar-admin/bookies) | Bookie rack placement |
| [broker-stats](/@pulsar:version_reference@/pulsar-admin/broker-stats) | Broker statistics |
| [brokers](/@pulsar:version_reference@/pulsar-admin/brokers) | Brokers: list, health check, dynamic configuration, graceful shutdown |
| [clusters](/@pulsar:version_reference@/pulsar-admin/clusters) | Clusters, failure domains and namespace isolation policies |
| [functions](/@pulsar:version_reference@/pulsar-admin/functions) | Pulsar Functions |
| [functions-worker](/@pulsar:version_reference@/pulsar-admin/functions-worker) | Function worker statistics and rebalancing |
| [migration](/@pulsar:version_reference@/pulsar-admin/migration) | Metadata store migration |
| [namespaces](/@pulsar:version_reference@/pulsar-admin/namespaces) | Namespaces, bundles and namespace policies |
| [ns-isolation-policy](/@pulsar:version_reference@/pulsar-admin/ns-isolation-policy) | Namespace isolation policies |
| [packages](/@pulsar:version_reference@/pulsar-admin/packages) | Packages of functions and connectors |
| [proxy-stats](/@pulsar:version_reference@/pulsar-admin/proxy-stats) | Proxy statistics |
| [resource-quotas](/@pulsar:version_reference@/pulsar-admin/resource-quotas) | Resource quotas of namespace bundles |
| [resourcegroups](/@pulsar:version_reference@/pulsar-admin/resourcegroups) | Resource groups |
| [scalable-topics](/@pulsar:version_reference@/pulsar-admin/scalable-topics) | Scalable topics |
| [schemas](/@pulsar:version_reference@/pulsar-admin/schemas) | Schemas |
| [sinks](/@pulsar:version_reference@/pulsar-admin/sinks) | Pulsar IO sinks (egress data from Pulsar) |
| [sources](/@pulsar:version_reference@/pulsar-admin/sources) | Pulsar IO sources (ingress data into Pulsar) |
| [tenants](/@pulsar:version_reference@/pulsar-admin/tenants) | Tenants |
| [topicPolicies](/@pulsar:version_reference@/pulsar-admin/topicPolicies) | Topic-level policies |
| [topics](/@pulsar:version_reference@/pulsar-admin/topics) | Topics, partitions, subscriptions and messages |
| [transactions](/@pulsar:version_reference@/pulsar-admin/transactions) | Transactions and transaction coordinators |

## Environment variables

You can use the following environment variables to configure `pulsar-admin`.

| Variable                 | Description                        | Default          |
|--------------------------|------------------------------------|------------------|
| `PULSAR_LOG_CONF`        | Log4j configuration file           | conf/log4j2.yaml |
| `PULSAR_CLIENT_CONF`     | Configuration file for the client  | conf/client.conf |
| `PULSAR_EXTRA_OPTS`      | Extra options passed to the JVM    | N/A              |
| `PULSAR_EXTRA_CLASSPATH` | Extra paths for Pulsar's classpath | N/A              |

## Related topics

- [Pulsar admin interfaces - Get started](pathname:///docs/@pulsar:version_reference@/admin-get-started ':ignore')
- [Pulsar shell](/@pulsar:version_reference@/pulsar-shell/pulsar-shell), an interactive shell around the same commands
