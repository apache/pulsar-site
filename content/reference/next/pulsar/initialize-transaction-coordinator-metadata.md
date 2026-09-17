# initialize-transaction-coordinator-metadata



```shell
$ pulsar initialize-transaction-coordinator-metadata options
```

|Flag|Description|Default|
|---|---|---|
| `-c, --cluster` | Cluster name|null|
| `-cs, --configuration-store` | Configuration Store connection string|null|
| `-cmscp, --configuration-metadata-store-config-path` | Configuration Metadata Store config path|null|
| `--zookeeper-session-timeout-ms` | Local zookeeper session timeout ms|30000|
| `--initial-num-transaction-coordinators` | Num transaction coordinators will assigned in cluster|16|
| `-sbn, --system-namespace-bundle-number` | The bundle numbers for the system namespace (pulsar/system) if it does not exist yet, default is 64|0|
| `-h, --help` | Show this help message|false|
| `-g, --generate-docs` | Generate docs|false|

