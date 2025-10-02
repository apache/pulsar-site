# proxy



```shell
$ pulsar proxy options
```

|Flag|Description|Default|
|---|---|---|
| `-md, --metadata-store` | Metadata Store service url. eg: zk:my-zk:2181||
| `-h, --help` | Show this help message|false|
| `-c, --config` | Configuration file path|conf/proxy.conf|
| `-g, --generate-docs` | Generate docs|true|
| `-zk, --zookeeper-servers` | Local zookeeper connection string, please use --metadata-store instead||
| `-cms, --configuration-metadata-store` | The metadata store URL for the configuration data||
| `-cs, --configuration-store-servers` | Configuration store connection string, please use --configuration-metadata-store instead||
| `-gzk, --global-zookeeper-servers` | Global zookeeper connection string, please use --configuration-metadata-store instead||

