## produce

Produce messages to a specified topic


```shell
$ pulsar-client produce [options]
```

|Flag|Description|Default|
|---|---|---|
| `-ks, --key-schema` | Schema type (can be bytes,avro,json,string...)|string|
| `-db, --disable-batching` | Disable batch sending of messages|false|
| `-m, --messages` | Messages to send, either -m or -f must be specified. Specify -m for each message.|[]|
| `-s, --separator` | Character to split messages string on default is comma|,|
| `-n, --num-produce` | Number of times to send message(s), the count of messages/files * num-produce should below than 1000.|1|
| `-k, --key` | Partitioning key to add to each message|null|
| `-kvkf, --key-value-key-file` | Path to file containing the value to add as message key in KeyValue schema. JSON and AVRO files are supported.|null|
| `-dr, --disable-replication` | Disable geo-replication for messages.|false|
| `-c, --chunking` | Should split the message and publish in chunks if message size is larger than allowed max size|false|
| `-ekn, --encryption-key-name` | The public key name to encrypt payload|null|
| `-kvk, --key-value-key` | Value to add as message key in KeyValue schema|null|
| `-p, --properties` | Properties to add, Comma separated key=value string, like k1=v1,k2=v2.|[]|
| `-kvet, --key-value-encoding-type` | Key Value Encoding Type (it can be separated or inline)|null|
| `-ekv, --encryption-key-value` | The URI of public key to encrypt payload, for example file:///path/to/public.key or data:application/x-pem-file;base64,*****|null|
| `-f, --files` | Comma separated file paths to send, either -m or -f must be specified.|[]|
| `-vs, --value-schema` | Schema type (can be bytes,avro,json,string...)|bytes|
| `-r, --rate` | Rate (in msg/sec) at which to produce, value 0 means to produce messages as fast as possible.|0.0|

## consume

Consume messages from a specified topic


```shell
$ pulsar-client consume [options]
```

|Flag|Description|Default|
|---|---|---|
| `-t, --subscription-type` | Subscription type.|Exclusive|
| `--hide-content` | Do not write the message to console.|false|
| `-rs, --replicated` | Whether the subscription status should be replicated|false|
| `-n, --num-messages` | Number of messages to consume, 0 means to consume forever.|1|
| `-r, --rate` | Rate (in msg/sec) at which to consume, value 0 means to consume messages as fast as possible.|0.0|
| `-ekv, --encryption-key-value` | The URI of private key to decrypt payload, for example file:///path/to/private.key or data:application/x-pem-file;base64,*****|null|
| `-st, --schema-type` | Set a schema type on the consumer, it can be 'bytes' or 'auto_consume'|bytes|
| `-q, --queue-size` | Consumer receiver queue size.|0|
| `-p, --subscription-position` | Subscription position.|Latest|
| `-mc, --max_chunked_msg` | Max pending chunk messages|0|
| `--hex` | Display binary messages in hex.|false|
| `--regex` | Indicate the topic name is a regex pattern|false|
| `-m, --subscription-mode` | Subscription mode.|Durable|
| `-s, --subscription-name` | Subscription name.|null|
| `-ac, --auto_ack_chunk_q_full` | Auto ack for oldest message on queue is full|false|
| `-pm, --pool-messages` | Use the pooled message|true|

## read

Read messages from a specified topic


```shell
$ pulsar-client read [options]
```

|Flag|Description|Default|
|---|---|---|
| `-i, --start-message-id-inclusive` | Whether to include the position specified by -m option.|false|
| `-mc, --max_chunked_msg` | Max pending chunk messages|0|
| `-n, --num-messages` | Number of messages to read, 0 means to read forever.|1|
| `--hide-content` | Do not write the message to console.|false|
| `-ekv, --encryption-key-value` | The URI of private key to decrypt payload, for example file:///path/to/private.key or data:application/x-pem-file;base64,*****|null|
| `-pm, --pool-messages` | Use the pooled message|true|
| `-q, --queue-size` | Reader receiver queue size.|0|
| `--hex` | Display binary messages in hex.|false|
| `-r, --rate` | Rate (in msg/sec) at which to read, value 0 means to read messages as fast as possible.|0.0|
| `-m, --start-message-id` | Initial reader position, it can be 'latest', 'earliest' or '<ledgerId>:<entryId>'|latest|
| `-ac, --auto_ack_chunk_q_full` | Auto ack for oldest message on queue is full|false|
| `-st, --schema-type` | Set a schema type on the reader, it can be 'bytes' or 'auto_consume'|bytes|

