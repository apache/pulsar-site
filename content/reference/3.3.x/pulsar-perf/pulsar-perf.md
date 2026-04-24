## produce

Test pulsar producer performance.


```shell
$ pulsar-perf produce [options]
```

|Flag|Description|Default|
|---|---|---|
| `-u, --service-url` | Pulsar Service URL|pulsar://localhost:6650/|
| `--auth-plugin` | Authentication plugin class name||
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".||
| `--trust-cert-file` | Path for the trusted TLS certificate file||
| `--tls-allow-insecure` | Allow insecure TLS connection|false|
| `--tls-enable-hostname-verification` | Enable TLS hostname verification|false|
| `-c, --max-connections` | Max number of TCP connections to a single broker|1|
| `-i, --stats-interval-seconds` | Statistics Interval Seconds. If 0, statistics will be disabled|0|
| `-ioThreads, --num-io-threads` | Set the number of threads to be used for handling connections to brokers. The default value is 1.|1|
| `-bw, --busy-wait` | Enable Busy-Wait on the Pulsar client|false|
| `--listener-name` | Listener name for the broker.|null|
| `-lt, --num-listener-threads` | Set the number of threads to be used for message listeners|1|
| `-mlr, --max-lookup-request` | Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker|50000|
| `--proxy-url` | Proxy-server URL to which to connect.||
| `--proxy-protocol` | Proxy protocol to select type of routing at proxy.||
| `-ml, --memory-limit` | Configure the Pulsar client memory limit (eg: 32M, 64M)|0|
| `-t, --num-topics, --num-topic` | Number of topics.  Must matchthe given number of topic arguments.|1|
| `-threads, --num-test-threads` | Number of test threads|1|
| `-r, --rate` | Publish rate msg/s across topics|100|
| `-s, --size` | Message size (bytes)|1024|
| `-n, --num-producers` | Number of producers (per topic)|1|
| `--separator` | Separator between the topic and topic number|-|
| `--send-timeout` | Set the sendTimeout value default 0 to keep compatibility with previous version of pulsar-perf|0|
| `-pn, --producer-name` | Producer Name|null|
| `-au, --admin-url` | Pulsar Admin URL|http://localhost:8080/|
| `-ch, --chunking` | Should split the message and publish in chunks if message size is larger than allowed max size|false|
| `-o, --max-outstanding` | Max number of outstanding messages|0|
| `-p, --max-outstanding-across-partitions` | Max number of outstanding messages across partitions|0|
| `-np, --partitions` | Create partitioned topics with the given number of partitions, set 0 to not try to create the topic|null|
| `-m, --num-messages` | Number of messages to publish in total. If <= 0, it will keep publishing|0|
| `-z, --compression` | Compress messages payload|NONE|
| `-f, --payload-file` | Use payload from an UTF-8 encoded text file and a payload will be randomly selected when publishing messages|null|
| `-e, --payload-delimiter` | The delimiter used to split lines when using payload from a file|\n|
| `-b, --batch-time-window` | Batch messages in 'x' ms window (Default: 1ms)|1.0|
| `-db, --disable-batching` | Disable batching if true|false|
| `-bm, --batch-max-messages` | Maximum number of messages per batch|1000|
| `-bb, --batch-max-bytes` | Maximum number of bytes per batch|4194304|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep publishing|0|
| `--warmup-time` | Warm-up time in seconds (Default: 1 sec)|1.0|
| `-k, --encryption-key-name` | The public key name to encrypt payload|null|
| `-v, --encryption-key-value-file` | The file which contains the public key to encrypt payload|null|
| `-d, --delay` | Mark messages with a given delay in seconds|0|
| `-dr, --delay-range` | Mark messages with a given delay by a random number of seconds. this value between the specified origin (inclusive) and the specified bound (exclusive). e.g. 1,300|null|
| `-set, --set-event-time` | Set the eventTime on messages|false|
| `-ef, --exit-on-failure` | Exit from the process on publish failure (default: disable)|false|
| `-mk, --message-key-generation-mode` | The generation mode of message key, valid options are: [autoIncrement, random]|null|
| `-am, --access-mode` | Producer access mode|Shared|
| `-fp, --format-payload` | Format %i as a message index in the stream from producer and/or %t as the timestamp nanoseconds.|false|
| `-fc, --format-class` | Custom Formatter class name|org.apache.pulsar.testclient.DefaultMessageFormatter|
| `-tto, --txn-timeout` | Set the time value of transaction timeout, and the time unit is second. (After --txn-enable setting to true, --txn-timeout takes effect)|10|
| `-nmt, --numMessage-perTransaction` | The number of messages sent by a transaction. (After --txn-enable setting to true, -nmt takes effect)|50|
| `-txn, --txn-enable` | Enable or disable the transaction|false|
| `-abort` | Abort the transaction. (After --txn-enable setting to true, -abort takes effect)|false|
| `--histogram-file` | HdrHistogram output file|null|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

## consume

Test pulsar consumer performance.


```shell
$ pulsar-perf consume [options]
```

|Flag|Description|Default|
|---|---|---|
| `-u, --service-url` | Pulsar Service URL|pulsar://localhost:6650/|
| `--auth-plugin` | Authentication plugin class name||
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".||
| `--trust-cert-file` | Path for the trusted TLS certificate file||
| `--tls-allow-insecure` | Allow insecure TLS connection|false|
| `--tls-enable-hostname-verification` | Enable TLS hostname verification|false|
| `-c, --max-connections` | Max number of TCP connections to a single broker|1|
| `-i, --stats-interval-seconds` | Statistics Interval Seconds. If 0, statistics will be disabled|0|
| `-ioThreads, --num-io-threads` | Set the number of threads to be used for handling connections to brokers. The default value is 1.|1|
| `-bw, --busy-wait` | Enable Busy-Wait on the Pulsar client|false|
| `--listener-name` | Listener name for the broker.|null|
| `-lt, --num-listener-threads` | Set the number of threads to be used for message listeners|1|
| `-mlr, --max-lookup-request` | Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker|50000|
| `--proxy-url` | Proxy-server URL to which to connect.||
| `--proxy-protocol` | Proxy protocol to select type of routing at proxy.||
| `-ml, --memory-limit` | Configure the Pulsar client memory limit (eg: 32M, 64M)|0|
| `-t, --num-topics, --num-topic` | Number of topics.  Must matchthe given number of topic arguments.|1|
| `-n, --num-consumers` | Number of consumers (per subscription), only one consumer is allowed when subscriptionType is Exclusive|1|
| `-ns, --num-subscriptions` | Number of subscriptions (per topic)|1|
| `-ss, --subscriptions` | A list of subscriptions to consume (for example, sub1,sub2)|[sub]|
| `-st, --subscription-type` | Subscription type|Exclusive|
| `-sp, --subscription-position` | Subscription position|Latest|
| `-r, --rate` | Simulate a slow message consumer (rate in msg/s)|0.0|
| `-q, --receiver-queue-size` | Size of the receiver queue|1000|
| `-p, --receiver-queue-size-across-partitions` | Max total size of the receiver queue across partitions|50000|
| `-aq, --auto-scaled-receiver-queue-size` | Enable autoScaledReceiverQueueSize|false|
| `-rs, --replicated` | Whether the subscription status should be replicated|false|
| `--acks-delay-millis` | Acknowledgements grouping delay in millis|100|
| `-m, --num-messages` | Number of messages to consume in total. If <= 0, it will keep consuming|0|
| `-mc, --max_chunked_msg` | Max pending chunk messages|0|
| `-ac, --auto_ack_chunk_q_full` | Auto ack for oldest message on queue is full|false|
| `-e, --expire_time_incomplete_chunked_messages` | Expire time in ms for incomplete chunk messages|0|
| `-v, --encryption-key-value-file` | The file which contains the private key to decrypt payload|null|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep consuming|0|
| `--batch-index-ack` | Enable or disable the batch index acknowledgment|false|
| `-pm, --pool-messages` | Use the pooled message|true|
| `-tto, --txn-timeout` | Set the time value of transaction timeout, and the time unit is second. (After --txn-enable setting to true, --txn-timeout takes effect)|10|
| `-nmt, --numMessage-perTransaction` | The number of messages acknowledged by a transaction. (After --txn-enable setting to true, -numMessage-perTransaction takes effect|50|
| `-txn, --txn-enable` | Enable or disable the transaction|false|
| `-ntxn` | The number of opened transactions, 0 means keeping open.(After --txn-enable setting to true, -ntxn takes effect.)|0|
| `-abort` | Abort the transaction. (After --txn-enable setting to true, -abort takes effect)|false|
| `--histogram-file` | HdrHistogram output file|null|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

## transaction

Test pulsar transaction performance.


```shell
$ pulsar-perf transaction [options]
```

|Flag|Description|Default|
|---|---|---|
| `-u, --service-url` | Pulsar Service URL|pulsar://localhost:6650/|
| `--auth-plugin` | Authentication plugin class name||
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".||
| `--trust-cert-file` | Path for the trusted TLS certificate file||
| `--tls-allow-insecure` | Allow insecure TLS connection|false|
| `--tls-enable-hostname-verification` | Enable TLS hostname verification|false|
| `-c, --max-connections` | Max number of TCP connections to a single broker|1|
| `-i, --stats-interval-seconds` | Statistics Interval Seconds. If 0, statistics will be disabled|0|
| `-ioThreads, --num-io-threads` | Set the number of threads to be used for handling connections to brokers. The default value is 1.|1|
| `-bw, --busy-wait` | Enable Busy-Wait on the Pulsar client|false|
| `--listener-name` | Listener name for the broker.|null|
| `-lt, --num-listener-threads` | Set the number of threads to be used for message listeners|1|
| `-mlr, --max-lookup-request` | Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker|50000|
| `--proxy-url` | Proxy-server URL to which to connect.||
| `--proxy-protocol` | Proxy protocol to select type of routing at proxy.||
| `-ml, --memory-limit` | Configure the Pulsar client memory limit (eg: 32M, 64M)|0|
| `--topics-c` | All topics that need ack for a transaction|[test-consume]|
| `--topics-p` | All topics that need produce for a transaction|[test-produce]|
| `-threads, --num-test-threads` | Number of test threads.This thread is for a new transaction to ack messages from consumer topics and produce message to producer topics, and then commit or abort this transaction. Increasing the number of threads increases the parallelism of the performance test, thereby increasing the intensity of the stress test.|1|
| `-au, --admin-url` | Pulsar Admin URL|http://localhost:8080/|
| `-np, --partitions` | Create partitioned topics with a given number of partitions, 0 meansnot trying to create a topic|null|
| `-time, --test-duration` | Test duration (in second). 0 means keeping publishing|0|
| `-ss, --subscriptions` | A list of subscriptions to consume (for example, sub1,sub2)|[sub]|
| `-ns, --num-subscriptions` | Number of subscriptions (per topic)|1|
| `-sp, --subscription-position` | Subscription position|Earliest|
| `-st, --subscription-type` | Subscription type|Shared|
| `-rs, --replicated` | Whether the subscription status should be replicated|false|
| `-q, --receiver-queue-size` | Size of the receiver queue|1000|
| `-tto, --txn-timeout` | Set the time value of transaction timeout, and the time unit is second. (After --txn-enable setting to true, --txn-timeout takes effect)|5|
| `-ntxn, --number-txn` | Set the number of transaction. 0 means keeping open.If transaction disabled, it means the number of tasks. The task or transaction produces or consumes a specified number of messages.|0|
| `-nmp, --numMessage-perTransaction-produce` | Set the number of messages produced in  a transaction.If transaction disabled, it means the number of messages produced in a task.|1|
| `-nmc, --numMessage-perTransaction-consume` | Set the number of messages consumed in a transaction.If transaction disabled, it means the number of messages consumed in a task.|1|
| `--txn-disable` | Disable transaction|false|
| `-abort` | Abort the transaction. (After --txn-disEnable setting to false, -abort takes effect)|false|
| `-txnRate` | Set the rate of opened transaction or task. 0 means no limit|0|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

## read

Test pulsar reader performance.


```shell
$ pulsar-perf read [options]
```

|Flag|Description|Default|
|---|---|---|
| `-u, --service-url` | Pulsar Service URL|pulsar://localhost:6650/|
| `--auth-plugin` | Authentication plugin class name||
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".||
| `--trust-cert-file` | Path for the trusted TLS certificate file||
| `--tls-allow-insecure` | Allow insecure TLS connection|false|
| `--tls-enable-hostname-verification` | Enable TLS hostname verification|false|
| `-c, --max-connections` | Max number of TCP connections to a single broker|1|
| `-i, --stats-interval-seconds` | Statistics Interval Seconds. If 0, statistics will be disabled|0|
| `-ioThreads, --num-io-threads` | Set the number of threads to be used for handling connections to brokers. The default value is 1.|1|
| `-bw, --busy-wait` | Enable Busy-Wait on the Pulsar client|false|
| `--listener-name` | Listener name for the broker.|null|
| `-lt, --num-listener-threads` | Set the number of threads to be used for message listeners|1|
| `-mlr, --max-lookup-request` | Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker|50000|
| `--proxy-url` | Proxy-server URL to which to connect.||
| `--proxy-protocol` | Proxy protocol to select type of routing at proxy.||
| `-ml, --memory-limit` | Configure the Pulsar client memory limit (eg: 32M, 64M)|0|
| `-t, --num-topics, --num-topic` | Number of topics.  Must matchthe given number of topic arguments.|1|
| `-r, --rate` | Simulate a slow message reader (rate in msg/s)|0.0|
| `-m, --start-message-id` | Start message id. This can be either 'earliest', 'latest' or a specific message id by using 'lid:eid'|earliest|
| `-q, --receiver-queue-size` | Size of the receiver queue|1000|
| `-n, --num-messages` | Number of messages to consume in total. If <= 0, it will keep consuming|0|
| `--use-tls` | Use TLS encryption on the connection|false|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep consuming|0|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

## monitor-brokers

Monitors brokers and prints to the console information about their system resource usages, 
their topic and bundle counts, their message rates, and other metrics.


```shell
$ pulsar-perf monitor-brokers [options]
```

|Flag|Description|Default|
|---|---|---|
| `--connect-string` | Zookeeper or broker connect string|null|
| `--extensions` | true to monitor Load Balance Extensions.|false|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

## simulation-client

Simulate client load by maintaining producers and consumers for topics.


```shell
$ pulsar-perf simulation-client [options]
```

|Flag|Description|Default|
|---|---|---|
| `--port` | Port to listen on for controller|0|
| `--service-url` | Pulsar Service URL|null|
| `-ml, --memory-limit` | Configure the Pulsar client memory limit (eg: 32M, 64M)|0|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

## simulation-controller

Provides a shell for the user to dictate how simulation clients should incur load.


```shell
$ pulsar-perf simulation-controller [options]
```

|Flag|Description|Default|
|---|---|---|
| `--cluster` | Cluster to test on|null|
| `--clients` | Comma separated list of client hostnames|null|
| `--client-port` | Port that the clients are listening on|0|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

## websocket-producer

Test pulsar websocket producer performance.


```shell
$ pulsar-perf websocket-producer [options]
```

|Flag|Description|Default|
|---|---|---|
| `-cf, --conf-file` | Configuration file|null|
| `-u, --proxy-url` | Pulsar Proxy URL, e.g., "ws://localhost:8080/"|null|
| `-r, --rate` | Publish rate msg/s across topics|100|
| `-s, --size` | Message size in byte|1024|
| `-t, --num-topic` | Number of topics|1|
| `--auth-plugin` | Authentication plugin class name|null|
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".|null|
| `-m, --num-messages` | Number of messages to publish in total. If <= 0, it will keep publishing|0|
| `-f, --payload-file` | Use payload from a file instead of empty buffer|null|
| `-e, --payload-delimiter` | The delimiter used to split lines when using payload from a file|\n|
| `-fp, --format-payload` | Format %i as a message index in the stream from producer and/or %t as the timestamp nanoseconds|false|
| `-fc, --format-class` | Custom Formatter class name|org.apache.pulsar.testclient.DefaultMessageFormatter|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep publishing|0|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

## managed-ledger

Write directly on managed-ledgers


```shell
$ pulsar-perf managed-ledger [options]
```

|Flag|Description|Default|
|---|---|---|
| `-r, --rate` | Write rate msg/s across managed ledgers|100|
| `-s, --size` | Message size|1024|
| `-t, --num-topic` | Number of managed ledgers|1|
| `--threads` | Number of threads writing|1|
| `-md, --metadata-store` | Metadata store service URL. For example: zk:my-zk:2181|null|
| `-o, --max-outstanding` | Max number of outstanding requests|1000|
| `-c, --max-connections` | Max number of TCP connections to a single bookie|1|
| `-m, --num-messages` | Number of messages to publish in total. If <= 0, it will keep publishing|0|
| `-e, --ensemble-size` | Ledger ensemble size|1|
| `-w, --write-quorum` | Ledger write quorum|1|
| `-a, --ack-quorum` | Ledger ack quorum|1|
| `-dt, --digest-type` | BookKeeper digest type|CRC32C|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep publishing|0|
| `-h, --help` | Show this help message and exit.|false|
| `-V, --version` | Print version information and exit.|false|

