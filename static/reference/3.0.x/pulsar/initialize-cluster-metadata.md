# initialize-cluster-metadata



```shell
$ pulsar initialize-cluster-metadata options
```

|Flag|Description|Default|
|---|---|---|
| `-tb, --broker-service-url-tls` | Broker-service URL for new cluster with TLS encryption|null|
| `-bn, --default-namespace-bundle-number` | The bundle numbers for the default namespaces(public/default), default is 16|0|
| `-cs, --configuration-store` | Configuration Store connection string|cs|
| `-pp, --proxy-protocol` | Proxy protocol to select type of routing at proxy. Possible Values: [SNI]|null|
| `-pu, --proxy-url` | Proxy-server URL to which to connect.|null|
| `--initial-num-transaction-coordinators` | Num transaction coordinators will assigned in cluster|16|
| `-uw, --web-service-url` | Web-service URL for new cluster|uw|
| `--bookkeeper-metadata-service-uri` | The metadata service URI of the existing BookKeeper cluster that you want to use|null|
| `-h, --help` | Show this help message|false|
| `--existing-bk-metadata-service-uri` | The metadata service URI of the existing BookKeeper cluster that you want to use|null|
| `-ub, --broker-service-url` | Broker-service URL for new cluster|null|
| `-cms, --configuration-metadata-store` | Configuration Metadata Store connection string|null|
| `-g, --generate-docs` | Generate docs|true|
| `-gzk, --global-zookeeper` | Global ZooKeeper quorum connection string|null|
| `-tw, --web-service-url-tls` | Web-service URL for new cluster with TLS encryption|null|
| `-md, --metadata-store` | Metadata Store service url. eg: zk:my-zk:2181|null|
| `--zookeeper-session-timeout-ms` | Local zookeeper session timeout ms|30000|
| `-zk, --zookeeper` | Local ZooKeeper quorum connection string|zk|
| `-c, --cluster` | Cluster name|c|
| `--initial-num-stream-storage-containers` | Num storage containers of BookKeeper stream storage|16|

