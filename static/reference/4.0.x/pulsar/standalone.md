# standalone



```shell
$ pulsar standalone options
```

|Flag|Description|Default|
|---|---|---|
| `-c, --config` | Configuration file path|conf/standalone.conf|
| `--wipe-data` | Clean up previous ZK/BK data|false|
| `--num-bookies` | Number of local Bookies|1|
| `--metadata-dir` | Directory for storing metadata|data/metadata|
| `--metadata-url` | Metadata store url||
| `--bookkeeper-port` | Local bookies base port|3181|
| `--bookkeeper-dir` | Local bookies base data directory|data/standalone/bookkeeper|
| `--no-broker` | Only start ZK and BK services, no broker|false|
| `--only-broker` | Only start Pulsar broker service (no ZK, BK)|false|
| `-nfw, --no-functions-worker` | Run functions worker with Broker|false|
| `-fwc, --functions-worker-conf` | Configuration file for Functions Worker|conf/functions_worker.yml|
| `-nss, --no-stream-storage` | Disable stream storage|false|
| `--stream-storage-port` | Local bookies stream storage port|4181|
| `-a, --advertised-address` | Standalone broker advertised address|null|
| `-h, --help` | Show this help message|false|
| `-g, --generate-docs` | Generate docs|true|

