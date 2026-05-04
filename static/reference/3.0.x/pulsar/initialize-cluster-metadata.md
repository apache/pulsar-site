# initialize-cluster-metadata



```shell
$ pulsar initialize-cluster-metadata options
```

|Flag|Description|Default|
|---|---|---|
| `-bn, --default-namespace-bundle-number` | The bundle numbers for the default namespaces(public/default), default is 16|0|
| `-cs, --configuration-store` | Configuration Store connection string|cs|
| `-pp, --proxy-protocol` | Proxy protocol to select type of routing at proxy. Possible Values: [SNI]|null|
| `-uw, --web-service-url` | Web-service URL for new cluster|uw|
| `-h, --help` | Show this help message|false|
| `-cmscp, --configuration-metadata-store-config-path` | Configuration Metadata Store config path|null|
| `-ub, --broker-service-url` | Broker-service URL for new cluster|null|
| `-cms, --configuration-metadata-store` | Configuration Metadata Store connection string|null|
| `-tw, --web-service-url-tls` | Web-service URL for new cluster with TLS encryption|null|
| `--auth-parameters` | The authentication parameters for new cluster|null|
| `-zk, --zookeeper` | Local ZooKeeper quorum connection string|zk|
| `--initial-num-stream-storage-containers` | Num storage containers of BookKeeper stream storage|16|
| `-te, --tls-enable` | Enable TLS connection for new cluster|null|
| `--auth-plugin` | The authentication plugin for new cluster|null|
| `-tb, --broker-service-url-tls` | Broker-service URL for new cluster with TLS encryption|null|
| `-pu, --proxy-url` | Proxy-server URL to which to connect.|null|
| `--initial-num-transaction-coordinators` | Num transaction coordinators will assigned in cluster|16|
| `--bookkeeper-metadata-service-uri` | The metadata service URI of the existing BookKeeper cluster that you want to use|null|
| `--existing-bk-metadata-service-uri` | The metadata service URI of the existing BookKeeper cluster that you want to use|null|
| `-g, --generate-docs` | Generate docs|true|
| `-gzk, --global-zookeeper` | Global ZooKeeper quorum connection string|null|
| `-md, --metadata-store` | Metadata Store service url. eg: zk:my-zk:2181|null|
| `--zookeeper-session-timeout-ms` | Local zookeeper session timeout ms|30000|
| `-c, --cluster` | Cluster name|c|
| `-mscp, --metadata-store-config-path` | Metadata Store config path|null|

