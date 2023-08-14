# proxy



```shell
$ pulsar proxy options
```

|Flag|Description|Default|
|---|---|---|
| `-c, --config` | Configuration file path|conf/proxy.conf|
| `-cms, --configuration-metadata-store` | The metadata store URL for the configuration data||
| `-cs, --configuration-store-servers` | Configuration store connection string, please use --configuration-metadata-store instead||
| `-g, --generate-docs` | Generate docs|true|
| `-gzk, --global-zookeeper-servers` | Global zookeeper connection string, please use --configuration-metadata-store instead||
| `-h, --help` | Show this help message|false|
| `-md, --metadata-store` | Metadata Store service url. eg: zk:my-zk:2181||
| `-zk, --zookeeper-servers` | Local zookeeper connection string, please use --metadata-store instead||

