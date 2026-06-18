## produce

Produce messages to a specified topic


```shell
$ pulsar-client produce [options]
```

|Flag|Description|Default|
|---|---|---|
| `[-m, --messages]` | Messages to send, either -m or -f must be specified. Specify -m for each message.|null|
|
| `[-f, --files]` | Comma separated file paths to send, either -m or -f must be specified.|null|
|
| `[-n, --num-produce]` | Number of times to send message(s), the count of messages/files * num-produce should below than 1000.|null|
|
| `[-r, --rate]` | Rate (in msg/sec) at which to produce, value 0 means to produce messages as fast as possible.|null|
|
| `[-db, --disable-batching]` | Disable batch sending of messages|null|
|
| `[-c, --chunking]` | Should split the message and publish in chunks if message size is larger than allowed max size|null|
|
| `[-s, --separator]` | Character to split messages string on default is comma|null|
|
| `[-p, --properties]` | Properties to add, Comma separated key=value string, like k1=v1,k2=v2.|null|
|
| `[-k, --key]` | Partitioning key to add to each message|null|
|
| `[-kvk, --key-value-key]` | Value to add as message key in KeyValue schema|null|
|
| `[-kvkf, --key-value-key-file]` | Path to file containing the value to add as message key in KeyValue schema. JSON and AVRO files are supported.|null|
|
| `[-vs, --value-schema]` | Schema type (can be bytes,avro,json,string...)|null|
|
| `[-ks, --key-schema]` | Schema type (can be bytes,avro,json,string...)|null|
|
| `[-kvet, --key-value-encoding-type]` | Key Value Encoding Type (it can be separated or inline)|null|
|
| `[-ekn, --encryption-key-name]` | The public key name to encrypt payload|null|
|
| `[-ekv, --encryption-key-value]` | The URI of public key to encrypt payload, for example file:///path/to/public.key or data:application/x-pem-file;base64,*****|null|
|
| `[-dr, --disable-replication]` | Disable geo-replication for messages.|null|
|
| `[-h, --help]` | Show this help message and exit.|null|
|
| `[-v, --version]` | Print version information and exit.|null|
|

## consume

Consume messages from a specified topic


```shell
$ pulsar-client consume [options]
```

|Flag|Description|Default|
|---|---|---|
| `[-t, --subscription-type]` | Subscription type.|null|
|
| `[-m, --subscription-mode]` | Subscription mode.|null|
|
| `[-p, --subscription-position]` | Subscription position.|null|
|
| `[-s, --subscription-name]` | Subscription name.|null|
|
| `[-n, --num-messages]` | Number of messages to consume, 0 means to consume forever.|null|
|
| `[--hex]` | Display binary messages in hex.|null|
|
| `[--hide-content]` | Do not write the message to console.|null|
|
| `[-r, --rate]` | Rate (in msg/sec) at which to consume, value 0 means to consume messages as fast as possible.|null|
|
| `[--regex]` | Indicate the topic name is a regex pattern|null|
|
| `[-q, --queue-size]` | Consumer receiver queue size.|null|
|
| `[-mc, --max_chunked_msg]` | Max pending chunk messages|null|
|
| `[-ac, --auto_ack_chunk_q_full]` | Auto ack for oldest message on queue is full|null|
|
| `[-ekv, --encryption-key-value]` | The URI of private key to decrypt payload, for example file:///path/to/private.key or data:application/x-pem-file;base64,*****|null|
|
| `[-st, --schema-type]` | Set a schema type on the consumer, it can be 'bytes' or 'auto_consume'|null|
|
| `[-pm, --pool-messages]` | Use the pooled message|null|
|
| `[-rs, --replicated]` | Whether the subscription status should be replicated|null|
|
| `[-h, --help]` | Show this help message and exit.|null|
|
| `[-v, --version]` | Print version information and exit.|null|
|

## read

Read messages from a specified topic


```shell
$ pulsar-client read [options]
```

|Flag|Description|Default|
|---|---|---|
| `[-m, --start-message-id]` | Initial reader position, it can be 'latest', 'earliest' or '<ledgerId>:<entryId>'|null|
|
| `[-i, --start-message-id-inclusive]` | Whether to include the position specified by -m option.|null|
|
| `[-n, --num-messages]` | Number of messages to read, 0 means to read forever.|null|
|
| `[--hex]` | Display binary messages in hex.|null|
|
| `[--hide-content]` | Do not write the message to console.|null|
|
| `[-r, --rate]` | Rate (in msg/sec) at which to read, value 0 means to read messages as fast as possible.|null|
|
| `[-q, --queue-size]` | Reader receiver queue size.|null|
|
| `[-mc, --max_chunked_msg]` | Max pending chunk messages|null|
|
| `[-ac, --auto_ack_chunk_q_full]` | Auto ack for oldest message on queue is full|null|
|
| `[-ekv, --encryption-key-value]` | The URI of private key to decrypt payload, for example file:///path/to/private.key or data:application/x-pem-file;base64,*****|null|
|
| `[-st, --schema-type]` | Set a schema type on the reader, it can be 'bytes' or 'auto_consume'|null|
|
| `[-pm, --pool-messages]` | Use the pooled message|null|
|
| `[-h, --help]` | Show this help message and exit.|null|
|
| `[-v, --version]` | Print version information and exit.|null|
|

