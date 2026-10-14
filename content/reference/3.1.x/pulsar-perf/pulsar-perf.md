## produce

Test pulsar producer performance.


```shell
$ pulsar-perf produce [options]
```

|Flag|Description|Default|
|---|---|---|
| `-ch, --chunking` | Should split the message and publish in chunks if message size is larger than allowed max size|false|
| `-threads, --num-test-threads` | Number of test threads|1|
| `--separator` | Separator between the topic and topic number|-|
| `-au, --admin-url` | Pulsar Admin URL|null|
| `-db, --disable-batching` | Disable batching if true|false|
| `-cf, --conf-file` | Pulsar configuration file|null|
| `-pn, --producer-name` | Producer Name|null|
| `-fc, --format-class` | Custom Formatter class name|org.apache.pulsar.testclient.DefaultMessageFormatter|
| `-k, --encryption-key-name` | The public key name to encrypt payload|null|
| `-nmt, --numMessage-perTransaction` | The number of messages sent by a transaction. (After --txn-enable setting to true, -nmt takes effect)|50|
| `--tls-enable-hostname-verification` | Enable TLS hostname verification|null|
| `--tls-allow-insecure` | Allow insecure TLS connection|null|
| `-bw, --busy-wait` | Enable Busy-Wait on the Pulsar client|false|
| `-i, --stats-interval-seconds` | Statistics Interval Seconds. If 0, statistics will be disabled|0|
| `-np, --partitions` | Create partitioned topics with the given number of partitions, set 0 to not try to create the topic|null|
| `-txn, --txn-enable` | Enable or disable the transaction|false|
| `-fp, --format-payload` | Format %i as a message index in the stream from producer and/or %t as the timestamp nanoseconds.|false|
| `--proxy-protocol` | Proxy protocol to select type of routing at proxy.|null|
| `-dr, --delay-range` | Mark messages with a given delay by a random number of seconds. this value between the specified origin (inclusive) and the specified bound (exclusive). e.g. 1,300|null|
| `-t, --num-topics, --num-topic` | Number of topics.  Must matchthe given number of topic arguments.|1|
| `-v, --encryption-key-value-file` | The file which contains the public key to encrypt payload|null|
| `-bb, --batch-max-bytes` | Maximum number of bytes per batch|4194304|
| `-u, --service-url` | Pulsar Service URL|null|
| `-r, --rate` | Publish rate msg/s across topics|100|
| `-ef, --exit-on-failure` | Exit from the process on publish failure (default: disable)|false|
| `-p, --max-outstanding-across-partitions` | Max number of outstanding messages across partitions|0|
| `-f, --payload-file` | Use payload from an UTF-8 encoded text file and a payload will be randomly selected when publishing messages|null|
| `-mk, --message-key-generation-mode` | The generation mode of message key, valid options are: [autoIncrement, random]|null|
| `-c, --max-connections` | Max number of TCP connections to a single broker|1|
| `-e, --payload-delimiter` | The delimiter used to split lines when using payload from a file|\n|
| `-s, --size` | Message size (bytes)|1024|
| `-mlr, --max-lookup-request` | Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker|50000|
| `-d, --delay` | Mark messages with a given delay in seconds|0|
| `-b, --batch-time-window` | Batch messages in 'x' ms window (Default: 1ms)|1.0|
| `-am, --access-mode` | Producer access mode|Shared|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep publishing|0|
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".|null|
| `-ioThreads, --num-io-threads` | Set the number of threads to be used for handling connections to brokers. The default value is 1.|1|
| `-n, --num-producers` | Number of producers (per topic)|1|
| `-m, --num-messages` | Number of messages to publish in total. If <= 0, it will keep publishing|0|
| `-z, --compression` | Compress messages payload|NONE|
| `--warmup-time` | Warm-up time in seconds (Default: 1 sec)|1.0|
| `-bm, --batch-max-messages` | Maximum number of messages per batch|1000|
| `--send-timeout` | Set the sendTimeout value default 0 to keep compatibility with previous version of pulsar-perf|0|
| `-o, --max-outstanding` | Max number of outstanding messages|0|
| `-abort` | Abort the transaction. (After --txn-enable setting to true, -abort takes effect)|false|
| `-tto, --txn-timeout` | Set the time value of transaction timeout, and the time unit is second. (After --txn-enable setting to true, --txn-timeout takes effect)|10|
| `--trust-cert-file` | Path for the trusted TLS certificate file||
| `--proxy-url` | Proxy-server URL to which to connect.|null|
| `-set, --set-event-time` | Set the eventTime on messages|false|
| `--auth-plugin` | Authentication plugin class name|null|
| `--histogram-file` | HdrHistogram output file|null|
| `--listener-name` | Listener name for the broker.|null|
| `-h, --help` | Print help message|false|
| `-lt, --num-listener-threads` | Set the number of threads to be used for message listeners|1|

## consume

Test pulsar consumer performance.


```shell
$ pulsar-perf consume [options]
```

|Flag|Description|Default|
|---|---|---|
| `-sp, --subscription-position` | Subscription position|Latest|
| `-rs, --replicated` | Whether the subscription status should be replicated|false|
| `-mc, --max_chunked_msg` | Max pending chunk messages|0|
| `-nmt, --numMessage-perTransaction` | The number of messages acknowledged by a transaction. (After --txn-enable setting to true, -numMessage-perTransaction takes effect|50|
| `-st, --subscription-type` | Subscription type|Exclusive|
| `-mlr, --max-lookup-request` | Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker|50000|
| `-r, --rate` | Simulate a slow message consumer (rate in msg/s)|0.0|
| `-txn, --txn-enable` | Enable or disable the transaction|false|
| `-e, --expire_time_incomplete_chunked_messages` | Expire time in ms for incomplete chunk messages|0|
| `-cf, --conf-file` | Pulsar configuration file|null|
| `-ns, --num-subscriptions` | Number of subscriptions (per topic)|1|
| `--tls-enable-hostname-verification` | Enable TLS hostname verification|null|
| `--acks-delay-millis` | Acknowledgements grouping delay in millis|100|
| `--tls-allow-insecure` | Allow insecure TLS connection|null|
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".|null|
| `-bw, --busy-wait` | Enable Busy-Wait on the Pulsar client|false|
| `-i, --stats-interval-seconds` | Statistics Interval Seconds. If 0, statistics will be disabled|0|
| `-ioThreads, --num-io-threads` | Set the number of threads to be used for handling connections to brokers. The default value is 1.|1|
| `-tto, --txn-timeout` | Set the time value of transaction timeout, and the time unit is second. (After --txn-enable setting to true, --txn-timeout takes effect)|10|
| `-n, --num-consumers` | Number of consumers (per subscription), only one consumer is allowed when subscriptionType is Exclusive|1|
| `-ntxn` | The number of opened transactions, 0 means keeping open.(After --txn-enable setting to true, -ntxn takes effect.)|0|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep consuming|0|
| `--proxy-protocol` | Proxy protocol to select type of routing at proxy.|null|
| `-m, --num-messages` | Number of messages to consume in total. If <= 0, it will keep consuming|0|
| `-abort` | Abort the transaction. (After --txn-enable setting to true, -abort takes effect)|false|
| `-ss, --subscriptions` | A list of subscriptions to consume (for example, sub1,sub2)|[sub]|
| `-pm, --pool-messages` | Use the pooled message|true|
| `-t, --num-topics, --num-topic` | Number of topics.  Must matchthe given number of topic arguments.|1|
| `--trust-cert-file` | Path for the trusted TLS certificate file||
| `--proxy-url` | Proxy-server URL to which to connect.|null|
| `--batch-index-ack` | Enable or disable the batch index acknowledgment|false|
| `--auth-plugin` | Authentication plugin class name|null|
| `-p, --receiver-queue-size-across-partitions` | Max total size of the receiver queue across partitions|50000|
| `-u, --service-url` | Pulsar Service URL|null|
| `-q, --receiver-queue-size` | Size of the receiver queue|1000|
| `-aq, --auto-scaled-receiver-queue-size` | Enable autoScaledReceiverQueueSize|false|
| `--histogram-file` | HdrHistogram output file|null|
| `-v, --encryption-key-value-file` | The file which contains the private key to decrypt payload|null|
| `-c, --max-connections` | Max number of TCP connections to a single broker|1|
| `--listener-name` | Listener name for the broker.|null|
| `-h, --help` | Print help message|false|
| `-ac, --auto_ack_chunk_q_full` | Auto ack for oldest message on queue is full|false|
| `-lt, --num-listener-threads` | Set the number of threads to be used for message listeners|1|

## transaction

Test pulsar transaction performance.


```shell
$ pulsar-perf transaction [options]
```

|Flag|Description|Default|
|---|---|---|
| `-q, --receiver-queue-size` | Size of the receiver queue|1000|
| `--txn-disable` | Disable transaction|false|
| `-mlr, --max-lookup-request` | Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker|50000|
| `-nmc, --numMessage-perTransaction-consume` | Set the number of messages consumed in a transaction.If transaction disabled, it means the number of messages consumed in a task.|1|
| `-rs, --replicated` | Whether the subscription status should be replicated|false|
| `-nmp, --numMessage-perTransaction-produce` | Set the number of messages produced in  a transaction.If transaction disabled, it means the number of messages produced in a task.|1|
| `-threads, --num-test-threads` | Number of test threads.This thread is for a new transaction to ack messages from consumer topics and produce message to producer topics, and then commit or abort this transaction. Increasing the number of threads increases the parallelism of the performance test, thereby increasing the intensity of the stress test.|1|
| `-cf, --conf-file` | Pulsar configuration file|null|
| `-time, --test-duration` | Test duration (in second). 0 means keeping publishing|0|
| `--tls-enable-hostname-verification` | Enable TLS hostname verification|null|
| `--tls-allow-insecure` | Allow insecure TLS connection|null|
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".|null|
| `-bw, --busy-wait` | Enable Busy-Wait on the Pulsar client|false|
| `-np, --partitions` | Create partitioned topics with a given number of partitions, 0 meansnot trying to create a topic|null|
| `-i, --stats-interval-seconds` | Statistics Interval Seconds. If 0, statistics will be disabled|0|
| `-ioThreads, --num-io-threads` | Set the number of threads to be used for handling connections to brokers. The default value is 1.|1|
| `-sp, --subscription-position` | Subscription position|Earliest|
| `--topics-p` | All topics that need produce for a transaction|[test-produce]|
| `-tto, --txn-timeout` | Set the time value of transaction timeout, and the time unit is second. (After --txn-enable setting to true, --txn-timeout takes effect)|5|
| `--proxy-protocol` | Proxy protocol to select type of routing at proxy.|null|
| `-ns, --num-subscriptions` | Number of subscriptions (per topic)|1|
| `-ntxn, --number-txn` | Set the number of transaction. 0 means keeping open.If transaction disabled, it means the number of tasks. The task or transaction produces or consumes a specified number of messages.|0|
| `-txnRate` | Set the rate of opened transaction or task. 0 means no limit|0|
| `-ss, --subscriptions` | A list of subscriptions to consume (for example, sub1,sub2)|[sub]|
| `--topics-c` | All topics that need ack for a transaction|[test-consume]|
| `-st, --subscription-type` | Subscription type|Shared|
| `--trust-cert-file` | Path for the trusted TLS certificate file||
| `--proxy-url` | Proxy-server URL to which to connect.|null|
| `--auth-plugin` | Authentication plugin class name|null|
| `-abort` | Abort the transaction. (After --txn-disEnable setting to false, -abort takes effect)|false|
| `-u, --service-url` | Pulsar Service URL|null|
| `-c, --max-connections` | Max number of TCP connections to a single broker|1|
| `--listener-name` | Listener name for the broker.|null|
| `-h, --help` | Print help message|false|
| `-au, --admin-url` | Pulsar Admin URL|null|
| `-lt, --num-listener-threads` | Set the number of threads to be used for message listeners|1|

## read

Test pulsar reader performance.


```shell
$ pulsar-perf read [options]
```

|Flag|Description|Default|
|---|---|---|
| `-mlr, --max-lookup-request` | Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker|50000|
| `-q, --receiver-queue-size` | Size of the receiver queue|1000|
| `-cf, --conf-file` | Pulsar configuration file|null|
| `--use-tls` | Use TLS encryption on the connection|false|
| `-r, --rate` | Simulate a slow message reader (rate in msg/s)|0.0|
| `--tls-enable-hostname-verification` | Enable TLS hostname verification|null|
| `--tls-allow-insecure` | Allow insecure TLS connection|null|
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".|null|
| `-bw, --busy-wait` | Enable Busy-Wait on the Pulsar client|false|
| `-i, --stats-interval-seconds` | Statistics Interval Seconds. If 0, statistics will be disabled|0|
| `-ioThreads, --num-io-threads` | Set the number of threads to be used for handling connections to brokers. The default value is 1.|1|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep consuming|0|
| `--proxy-protocol` | Proxy protocol to select type of routing at proxy.|null|
| `-n, --num-messages` | Number of messages to consume in total. If <= 0, it will keep consuming|0|
| `-t, --num-topics, --num-topic` | Number of topics.  Must matchthe given number of topic arguments.|1|
| `-m, --start-message-id` | Start message id. This can be either 'earliest', 'latest' or a specific message id by using 'lid:eid'|earliest|
| `--trust-cert-file` | Path for the trusted TLS certificate file||
| `--proxy-url` | Proxy-server URL to which to connect.|null|
| `--auth-plugin` | Authentication plugin class name|null|
| `-u, --service-url` | Pulsar Service URL|null|
| `-c, --max-connections` | Max number of TCP connections to a single broker|1|
| `--listener-name` | Listener name for the broker.|null|
| `-h, --help` | Print help message|false|
| `-lt, --num-listener-threads` | Set the number of threads to be used for message listeners|1|

## monitor-brokers

Monitors brokers and prints to the console information about their system resource usages, 
their topic and bundle counts, their message rates, and other metrics.


```shell
$ pulsar-perf monitor-brokers [options]
```

|Flag|Description|Default|
|---|---|---|
| `--extensions` | true to monitor Load Balance Extensions.|false|
| `-h, --help` | Help message|false|
| `--connect-string` | Zookeeper or broker connect string|null|

## simulation-client

Simulate client load by maintaining producers and consumers for topics.


```shell
$ pulsar-perf simulation-client [options]
```

|Flag|Description|Default|
|---|---|---|
| `-h, --help` | Help message|false|
| `--port` | Port to listen on for controller|0|
| `--service-url` | Pulsar Service URL|null|

## simulation-controller

Provides a shell for the user to dictate how simulation clients should incur load.


```shell
$ pulsar-perf simulation-controller [options]
```

|Flag|Description|Default|
|---|---|---|
| `-h, --help` | Help message|false|
| `--cluster` | Cluster to test on|null|
| `--client-port` | Port that the clients are listening on|0|
| `--clients` | Comma separated list of client hostnames|null|

## websocket-producer

Test pulsar websocket producer performance.


```shell
$ pulsar-perf websocket-producer [options]
```

|Flag|Description|Default|
|---|---|---|
| `-s, --size` | Message size in byte|1024|
| `--auth-params` | Authentication parameters, whose format is determined by the implementation of method `configure` in authentication plugin class, for example "key1:val1,key2:val2" or "{"key1":"val1","key2":"val2"}".|null|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep publishing|0|
| `-e, --payload-delimiter` | The delimiter used to split lines when using payload from a file|\n|
| `-h, --help` | Help message|false|
| `-fp, --format-payload` | Format %i as a message index in the stream from producer and/or %t as the timestamp nanoseconds|false|
| `-cf, --conf-file` | Configuration file|null|
| `-t, --num-topic` | Number of topics|1|
| `-f, --payload-file` | Use payload from a file instead of empty buffer|null|
| `--auth-plugin` | Authentication plugin class name|null|
| `-fc, --format-class` | Custom Formatter class name|org.apache.pulsar.testclient.DefaultMessageFormatter|
| `-u, --proxy-url` | Pulsar Proxy URL, e.g., "ws://localhost:8080/"|null|
| `-r, --rate` | Publish rate msg/s across topics|100|
| `-m, --num-messages` | Number of messages to publish in total. If <= 0, it will keep publishing|0|

## managed-ledger

Write directly on managed-ledgers


```shell
$ pulsar-perf managed-ledger [options]
```

|Flag|Description|Default|
|---|---|---|
| `-e, --ensemble-size` | Ledger ensemble size|1|
| `-w, --write-quorum` | Ledger write quorum|1|
| `-r, --rate` | Write rate msg/s across managed ledgers|100|
| `-m, --num-messages` | Number of messages to publish in total. If <= 0, it will keep publishing|0|
| `-a, --ack-quorum` | Ledger ack quorum|1|
| `--threads` | Number of threads writing|1|
| `-s, --size` | Message size|1024|
| `-c, --max-connections` | Max number of TCP connections to a single bookie|1|
| `-time, --test-duration` | Test duration in secs. If <= 0, it will keep publishing|0|
| `-md, --metadata-store` | Metadata store service URL. For example: zk:my-zk:2181|null|
| `-o, --max-outstanding` | Max number of outstanding requests|1000|
| `-h, --help` | Help message|false|
| `-t, --num-topic` | Number of managed ledgers|1|
| `-dt, --digest-type` | BookKeeper digest type|CRC32C|

