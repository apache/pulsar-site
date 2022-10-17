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
| `-k, --key` | message key to add |null|
| `-dr, --disable-replication` | Disable geo-replication for messages.|false|
| `-c, --chunking` | Should split the message and publish in chunks if message size is larger than allowed max size|false|
| `-ekn, --encryption-key-name` | The public key name to encrypt payload|null|
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

