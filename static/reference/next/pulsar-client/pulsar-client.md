## produce

Produce messages to a specified topic The topic picks the client: topic:// (scalable) topics use the V5 client; persistent://, non-persistent:// and unprefixed topics use the v4 client. --client-api overrides the choice. Options listed under a client's section apply only when that client is used.


```shell
$ pulsar-client produce [options]
```

### Common options

|Flag|Description|Default|
|---|---|---|
| `[--client-api]` | Client API to use: V4, V5. Defaults to V5 for topic:// (scalable) topics and to V4 for persistent://, non-persistent:// and unprefixed topics. Use V5 to drive a persistent:// topic with the V5 client.|null|
|
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
| `[-vs, --value-schema]` | Schema type (can be bytes,avro,json,string...)|null|
|
| `[-ekn, --encryption-key-name]` | The public key name to encrypt payload|null|
|
| `[-ekv, --encryption-key-value]` | The URI of public key to encrypt payload, for example file:///path/to/public.key or data:application/x-pem-file;base64,***** (data: URIs require the v4 client)|null|
|
| `[-h, --help]` | Show this help message and exit.|null|
|
| `[-v, --version]` | Print version information and exit.|null|
|

### v4 client options (default for persistent:// and non-persistent:// topics)

|Flag|Description|Default|
|---|---|---|
| `[-kvk, --key-value-key]` | Value to add as message key in KeyValue schema|null|
|
| `[-kvkf, --key-value-key-file]` | Path to file containing the value to add as message key in KeyValue schema. JSON and AVRO files are supported.|null|
|
| `[-ks, --key-schema]` | Schema type (can be bytes,avro,json,string...)|null|
|
| `[-kvet, --key-value-encoding-type]` | Key Value Encoding Type (it can be separated or inline)|null|
|
| `[-dr, --disable-replication]` | Disable geo-replication for messages.|null|
|


## consume

Consume messages from a specified topic The topic picks the client: topic:// (scalable) topics use the V5 client; persistent://, non-persistent:// and unprefixed topics use the v4 client. --client-api overrides the choice. Options listed under a client's section apply only when that client is used.


```shell
$ pulsar-client consume [options]
```

### Common options

|Flag|Description|Default|
|---|---|---|
| `[--client-api]` | Client API to use: V4, V5. Defaults to V5 for topic:// (scalable) topics and to V4 for persistent://, non-persistent:// and unprefixed topics. Use V5 to drive a persistent:// topic with the V5 client.|null|
|
| `[-t, --subscription-type]` | Subscription type.|null|
|
| `[-m, --subscription-mode]` | Subscription mode.|null|
|
| `[-s, --subscription-name]` | Subscription name.|null|
|
| `[-p, --subscription-position]` | Subscription position.|null|
|
| `[-n, --num-messages]` | Number of messages to consume, 0 means to consume forever.|null|
|
| `[--hex]` | Display binary messages in hex.|null|
|
| `[--hide-content]` | Do not write the message to console.|null|
|
| `[-r, --rate]` | Rate (in msg/sec) at which to consume, value 0 means to consume messages as fast as possible.|null|
|
| `[--regex]` | Indicate the topic name is a regex pattern. With the V5 client the pattern's tenant/namespace is subscribed to as a whole (namespace subscription).|null|
|
| `[-q, --queue-size]` | Consumer receiver queue size.|null|
|
| `[-ekv, --encryption-key-value]` | The URI of private key to decrypt payload, for example file:///path/to/private.key or data:application/x-pem-file;base64,***** (data: URIs require the v4 client)|null|
|
| `[-ca, --crypto-failure-action]` | Crypto Failure Action|null|
|
| `[-st, --schema-type]` | Set a schema type on the consumer, it can be 'bytes' or 'auto_consume'|null|
|
| `[-mp, --print-metadata]` | Message metadata|null|
|
| `[-etp, --end-timestamp]` | End timestamp for consuming messages|null|
|
| `[-h, --help]` | Show this help message and exit.|null|
|
| `[-v, --version]` | Print version information and exit.|null|
|

### v4 client options (default for persistent:// and non-persistent:// topics)

|Flag|Description|Default|
|---|---|---|
| `[-stp, --start-timestamp]` | Start timestamp for consuming messages|null|
|
| `[-mc, --max_chunked_msg]` | Max pending chunk messages|null|
|
| `[-ac, --auto_ack_chunk_q_full]` | Auto ack for oldest message on queue is full|null|
|
| `[-pm, --pool-messages]` | Use the pooled message|null|
|
| `[-rs, --replicated]` | Whether the subscription status should be replicated|null|
|


## read

Read messages from a specified topic The topic picks the client: topic:// (scalable) topics use the V5 client; persistent://, non-persistent:// and unprefixed topics use the v4 client. --client-api overrides the choice. Options listed under a client's section apply only when that client is used.


```shell
$ pulsar-client read [options]
```

### Common options

|Flag|Description|Default|
|---|---|---|
| `[--client-api]` | Client API to use: V4, V5. Defaults to V5 for topic:// (scalable) topics and to V4 for persistent://, non-persistent:// and unprefixed topics. Use V5 to drive a persistent:// topic with the V5 client.|null|
|
| `[-m, --start-message-id]` | Initial reader position, it can be 'latest', 'earliest' or '<ledgerId>:<entryId>' (the last form requires the v4 client)|null|
|
| `[-n, --num-messages]` | Number of messages to read, 0 means to read forever.|null|
|
| `[--hex]` | Display binary messages in hex.|null|
|
| `[--hide-content]` | Do not write the message to console.|null|
|
| `[-r, --rate]` | Rate (in msg/sec) at which to read, value 0 means to read messages as fast as possible.|null|
|
| `[-ekv, --encryption-key-value]` | The URI of private key to decrypt payload, for example file:///path/to/private.key or data:application/x-pem-file;base64,***** (data: URIs require the v4 client)|null|
|
| `[-ca, --crypto-failure-action]` | Crypto Failure Action|null|
|
| `[-st, --schema-type]` | Set a schema type on the reader, it can be 'bytes' or 'auto_consume'|null|
|
| `[-mp, --print-metadata]` | Message metadata|null|
|
| `[-h, --help]` | Show this help message and exit.|null|
|
| `[-v, --version]` | Print version information and exit.|null|
|

### v4 client options (default for persistent:// and non-persistent:// topics)

|Flag|Description|Default|
|---|---|---|
| `[-i, --start-message-id-inclusive]` | Whether to include the position specified by -m option.|null|
|
| `[-q, --queue-size]` | Reader receiver queue size.|null|
|
| `[-mc, --max_chunked_msg]` | Max pending chunk messages|null|
|
| `[-ac, --auto_ack_chunk_q_full]` | Auto ack for oldest message on queue is full|null|
|
| `[-pm, --pool-messages]` | Use the pooled message|null|
|


