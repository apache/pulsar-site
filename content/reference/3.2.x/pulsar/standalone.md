# standalone



```shell
$ pulsar standalone options
```

|Flag|Description|Default|
|---|---|---|
| `-a, --advertised-address` | Standalone broker advertised address|null|
| `--bookkeeper-dir` | Local bookies base data directory|data/standalone/bookkeeper|
| `--bookkeeper-port` | Local bookies base port|3181|
| `-c, --config` | Configuration file path|conf/standalone.conf|
| `-fwc, --functions-worker-conf` | Configuration file for Functions Worker|conf/functions_worker.yml|
| `-g, --generate-docs` | Generate docs|true|
| `-h, --help` | Show this help message|false|
| `--metadata-dir` | Directory for storing metadata|data/metadata|
| `--metadata-url` | Metadata store url||
| `--no-broker` | Only start ZK and BK services, no broker|false|
| `-nfw, --no-functions-worker` | Run functions worker with Broker|false|
| `-nss, --no-stream-storage` | Disable stream storage|false|
| `--num-bookies` | Number of local Bookies|1|
| `--only-broker` | Only start Pulsar broker service (no ZK, BK)|false|
| `--stream-storage-port` | Local bookies stream storage port|4181|
| `--wipe-data` | Clean up previous ZK/BK data|false|
| `--zookeeper-dir` | Local zooKeeper's data directory|data/standalone/zookeeper|
| `--zookeeper-port` | Local zookeeper's port|2181|

