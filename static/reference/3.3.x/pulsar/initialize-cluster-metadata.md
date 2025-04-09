# initialize-cluster-metadata



```shell
$ pulsar initialize-cluster-metadata options
```

|Flag|Description|Default|
|---|---|---|
| `-c, --cluster` | Cluster name|null|
| `-bn, --default-namespace-bundle-number` | The bundle numbers for the default namespaces(public/default), default is 16|0|
| `-uw, --web-service-url` | Web-service URL for new cluster|null|
| `-tw, --web-service-url-tls` | Web-service URL for new cluster with TLS encryption|null|
| `-ub, --broker-service-url` | Broker-service URL for new cluster|null|
| `-tb, --broker-service-url-tls` | Broker-service URL for new cluster with TLS encryption|null|
| `-te, --tls-enable` | Enable TLS connection for new cluster|null|
| `--auth-plugin` | The authentication plugin for new cluster|null|
| `--auth-parameters` | The authentication parameters for new cluster|null|
| `-md, --metadata-store` | Metadata Store service url. eg: zk:my-zk:2181|null|
| `--zookeeper-session-timeout-ms` | Local zookeeper session timeout ms|30000|
| `-cms, --configuration-metadata-store` | Configuration Metadata Store connection string|null|
| `-mscp, --metadata-store-config-path` | Metadata Store config path|null|
| `-cmscp, --configuration-metadata-store-config-path` | Configuration Metadata Store config path|null|
| `--initial-num-stream-storage-containers` | Num storage containers of BookKeeper stream storage|16|
| `--initial-num-transaction-coordinators` | Num transaction coordinators will assigned in cluster|16|
| `--existing-bk-metadata-service-uri` | The metadata service URI of the existing BookKeeper cluster that you want to use|null|
| `-pp, --proxy-protocol` | Proxy protocol to select type of routing at proxy. Possible Values: [SNI]|null|
| `-pu, --proxy-url` | Proxy-server URL to which to connect.|null|
| `-h, --help` | Show this help message|false|
| `-g, --generate-docs` | Generate docs|false|

