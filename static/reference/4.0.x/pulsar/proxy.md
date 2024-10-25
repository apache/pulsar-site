# proxy



```shell
$ pulsar proxy options
```

|Flag|Description|Default|
|---|---|---|
| `-c, --config` | Configuration file path|null|
| `-zk, --zookeeper-servers` | Local zookeeper connection string, please use --metadata-store instead||
| `-md, --metadata-store` | Metadata Store service url. eg: zk:my-zk:2181||
| `-gzk, --global-zookeeper-servers` | Global zookeeper connection string, please use --configuration-metadata-store instead||
| `-cs, --configuration-store-servers` | Configuration store connection string, please use --configuration-metadata-store instead||
| `-cms, --configuration-metadata-store` | The metadata store URL for the configuration data||
| `-h, --help` | Show this help message|false|
| `-g, --generate-docs` | Generate docs|false|

