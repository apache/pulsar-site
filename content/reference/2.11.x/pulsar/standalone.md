# standalone



```shell
$ pulsar standalone options
```

|Flag|Description|Default|
|---|---|---|
| `--num-bookies` | Number of local Bookies|1|
| `-g, --generate-docs` | Generate docs|true|
| `-h, --help` | Show this help message|false|
| `--wipe-data` | Clean up previous ZK/BK data|false|
| `-fwc, --functions-worker-conf` | Configuration file for Functions Worker|conf/functions_worker.yml|
| `-nss, --no-stream-storage` | Disable stream storage|false|
| `--metadata-url` | Metadata store url||
| `--no-broker` | Only start ZK and BK services, no broker|false|
| `--zookeeper-dir` | Local zooKeeper's data directory|data/standalone/zookeeper|
| `--only-broker` | Only start Pulsar broker service (no ZK, BK)|false|
| `-nfw, --no-functions-worker` | Run functions worker with Broker|false|
| `--metadata-dir` | Directory for storing metadata|data/metadata|
| `--stream-storage-port` | Local bookies stream storage port|4181|
| `-a, --advertised-address` | Standalone broker advertised address|null|
| `-c, --config` | Configuration file path|conf/standalone.conf|
| `--zookeeper-port` | Local zookeeper's port|2181|
| `--bookkeeper-port` | Local bookies base port|3181|
| `--bookkeeper-dir` | Local bookies base data directory|data/standalone/bookkeeper|

