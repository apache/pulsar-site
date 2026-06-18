# topics

Operations on persistent topics


```shell
$ pulsar-admin topics subcommand
```



## <em>list</em>

Get the list of topics under a namespace.

**Command:**

```shell
$ pulsar-admin topics list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-b, --bundle` | Namespace bundle to get list of topics|null||
| `-ist, --include-system-topic` | Include system topic|false||
| `-td, --topic-domain` | Allowed topic domain (persistent, non_persistent).|null||


## <em>list-partitioned-topics</em>

Get the list of partitioned topics under a namespace.

**Command:**

```shell
$ pulsar-admin topics list-partitioned-topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ist, --include-system-topic` | Include system topic|false||


## <em>permissions</em>

Get the permissions on a topic. Retrieve the effective permissions for a topic. These permissions are defined by the permissions set at the namespace level combined (union) with any eventual specific permission set on the topic.

**Command:**

```shell
$ pulsar-admin topics permissions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>grant-permission</em>

Grant a new permission to a client role on a single topic.

**Command:**

```shell
$ pulsar-admin topics grant-permission options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-r, --role` | Client role to which grant permissions|null||
| `-a, --actions` | Actions to be granted (produce,consume,sources,sinks,functions,packages)|null||


## <em>revoke-permission</em>

Revoke permissions on a topic. Revoke permissions to a client role on a single topic. If the permission was not set at the topic level, but rather at the namespace level, this operation will return an error (HTTP status code 412).

**Command:**

```shell
$ pulsar-admin topics revoke-permission options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-r, --role` | Client role to which revoke permissions|null||


## <em>lookup</em>

Lookup a topic from the current serving broker

**Command:**

```shell
$ pulsar-admin topics lookup options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>partitioned-lookup</em>

Lookup a partitioned topic from the current serving broker

**Command:**

```shell
$ pulsar-admin topics partitioned-lookup options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --sort-by-broker` | Sort partitioned-topic by Broker Url|false||


## <em>bundle-range</em>

Get Namespace bundle range of a topic

**Command:**

```shell
$ pulsar-admin topics bundle-range options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>delete</em>

Delete a topic. The topic cannot be deleted if there's any active subscription or producers connected to it.And the application is not able to connect to the topic(delete then re-create with same name) again if the schema auto uploading is disabled. Besides, users should to use the truncate cmd to clean up data of the topic instead of delete cmd if users continue to use this topic later.

**Command:**

```shell
$ pulsar-admin topics delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-f, --force` | Close all producer/consumer/replicator and delete topic forcefully|false||


## <em>truncate</em>

Truncate a topic. 
		The truncate operation will move all cursors to the end of the topic and delete all inactive ledgers. 

**Command:**

```shell
$ pulsar-admin topics truncate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>unload</em>

Unload a topic.

**Command:**

```shell
$ pulsar-admin topics unload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>subscriptions</em>

Get the list of subscriptions on the topic

**Command:**

```shell
$ pulsar-admin topics subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>unsubscribe</em>

Delete a durable subscriber from a topic. The subscription cannot be deleted if there are any active consumers attached to it

**Command:**

```shell
$ pulsar-admin topics unsubscribe options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-f, --force` | Disconnect and close all consumers and delete subscription forcefully|false||
| `-s, --subscription` | Subscription to be deleted|null||


## <em>create-subscription</em>

Create a new subscription on a topic

**Command:**

```shell
$ pulsar-admin topics create-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription to reset position on|null||
| `-m, --messageId` | messageId where to create the subscription. It can be either 'latest', 'earliest' or (ledgerId:entryId)|latest||
| `-r, --replicated` | replicated subscriptions|false||
| `--property, -p` | key value pair properties(-p a=b -p c=d)|null||


## <em>update-subscription-properties</em>

Update the properties of a subscription on a topic

**Command:**

```shell
$ pulsar-admin topics update-subscription-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--property, -p` | key value pair properties(-p a=b -p c=d)|null||
| `-s, --subscription` | Subscription to update|null||
| `--clear, -c` | Remove all properties|false||


## <em>get-subscription-properties</em>

Get the properties of a subscription on a topic

**Command:**

```shell
$ pulsar-admin topics get-subscription-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription to describe|null||


## <em>stats</em>

Get the stats for the topic and its connected producers and consumers. All the rates are computed over a 1 minute window and are relative the last completed 1 minute period.

**Command:**

```shell
$ pulsar-admin topics stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-sbs, --get-subscription-backlog-size` | Set true to get backlog size for each subscription, locking required. If set to false, the attribute 'backlogSize' in the response will be -1|true||
| `-gpb, --get-precise-backlog` | Set true to get precise backlog|false||
| `-etb, --get-earliest-time-in-backlog` | Set true to get earliest time in backlog|false||


## <em>stats-internal</em>

Get the internal stats for the topic

**Command:**

```shell
$ pulsar-admin topics stats-internal options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --metadata` | Flag to include ledger metadata|false||


## <em>info-internal</em>

Get the internal metadata info for the topic

**Command:**

```shell
$ pulsar-admin topics info-internal options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>partitioned-stats</em>

Get the stats for the partitioned topic and its connected producers and consumers. All the rates are computed over a 1 minute window and are relative the last completed 1 minute period.

**Command:**

```shell
$ pulsar-admin topics partitioned-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-gpb, --get-precise-backlog` | Set true to get precise backlog|false||
| `-sbs, --get-subscription-backlog-size` | Set true to get backlog size for each subscription, locking required.|true||
| `-etb, --get-earliest-time-in-backlog` | Set true to get earliest time in backlog|false||
| `--per-partition` | Get per partition stats|false||


## <em>partitioned-stats-internal</em>

Get the internal stats for the partitioned topic and its connected producers and consumers. All the rates are computed over a 1 minute window and are relative the last completed 1 minute period.

**Command:**

```shell
$ pulsar-admin topics partitioned-stats-internal options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>skip</em>

Skip some messages for the subscription

**Command:**

```shell
$ pulsar-admin topics skip options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription to be skip messages on|null||
| `-n, --count` | Number of messages to skip|0||


## <em>clear-backlog</em>

Skip all the messages for the subscription

**Command:**

```shell
$ pulsar-admin topics clear-backlog options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription to be cleared|null||


## <em>expire-messages</em>

Expire messages that older than given expiry time (in seconds) for the subscription

**Command:**

```shell
$ pulsar-admin topics expire-messages options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-e, --exclude-reset-position` | Exclude the reset position, start consume messages from the next position.|false||
| `-s, --subscription` | Subscription to be skip messages on|null||
| `-t, --expireTime` | Expire messages older than time in seconds (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w)|null||
| `--position, -p` | message position to reset back to (ledgerId:entryId)|null||


## <em>expire-messages-all-subscriptions</em>

Expire messages that older than given expiry time (in seconds) for all subscriptions

**Command:**

```shell
$ pulsar-admin topics expire-messages-all-subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --expireTime` | Expire messages older than time in seconds (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w)|null||


## <em>create-partitioned-topic</em>

Create a partitioned topic. The partitioned topic has to be created before creating a producer on it.

**Command:**

```shell
$ pulsar-admin topics create-partitioned-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-p, --partitions` | Number of partitions for the topic|0||
| `--metadata, -m` | key value pair properties(a=a,b=b,c=c)|null||


## <em>create-missed-partitions</em>

Try to create partitions for partitioned topic. The partitions of partition topic has to be created, can be used by repair partitions when topic auto creation is disabled

**Command:**

```shell
$ pulsar-admin topics create-missed-partitions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>create</em>

Create a non-partitioned topic.

**Command:**

```shell
$ pulsar-admin topics create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--metadata, -m` | key value pair properties(a=a,b=b,c=c)|null||


## <em>update-partitioned-topic</em>

Update existing partitioned topic. New updating number of partitions must be greater than existing number of partitions.

**Command:**

```shell
$ pulsar-admin topics update-partitioned-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-p, --partitions` | Number of partitions for the topic|0||
| `-f, --force` | Update forcefully without validating existing partitioned topic|false||
| `-ulo, --update-local-only` | Update partitions number for topic in local cluster only|false||


## <em>get-partitioned-topic-metadata</em>

Get the partitioned topic metadata. If the topic is not created or is a non-partitioned topic, it returns empty topic with 0 partitions

**Command:**

```shell
$ pulsar-admin topics get-partitioned-topic-metadata options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-properties</em>

Get the topic properties.

**Command:**

```shell
$ pulsar-admin topics get-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>update-properties</em>

Update the properties of on a topic

**Command:**

```shell
$ pulsar-admin topics update-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--property, -p` | key value pair properties(-p a=b -p c=d)|null||


## <em>remove-properties</em>

Remove the key in properties of a topic

**Command:**

```shell
$ pulsar-admin topics remove-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--key, -k` | The key to remove in the properties of topic|null||


## <em>delete-partitioned-topic</em>

Delete a partitioned topic. It will also delete all the partitions of the topic if it exists.And the application is not able to connect to the topic(delete then re-create with same name) again if the schema auto uploading is disabled. Besides, users should to use the truncate cmd to clean up data of the topic instead of delete cmd if users continue to use this topic later.

**Command:**

```shell
$ pulsar-admin topics delete-partitioned-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-f, --force` | Close all producer/consumer/replicator and delete topic forcefully|false||


## <em>peek-messages</em>

Peek some messages for the subscription

**Command:**

```shell
$ pulsar-admin topics peek-messages options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-n, --count` | Number of messages (default 1)|1||
| `-s, --subscription` | Subscription to get messages from|null||
| `-ssm, --show-server-marker` | Enables the display of internal server write markers.|false||
| `-til, --transaction-isolation-level` | Sets the isolation level for peeking messages within transactions. 'READ_COMMITTED' allows peeking only committed transactional messages. 'READ_UNCOMMITTED' allows peeking all messages, even transactional messages which have been aborted.|READ_COMMITTED||


## <em>examine-messages</em>

Examine a specific message on a topic by position relative to the earliest or the latest message.

**Command:**

```shell
$ pulsar-admin topics examine-messages options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-i, --initialPosition` | Relative start position to examine message.It can be 'latest' or 'earliest', default is latest|latest||
| `-m, --messagePosition` | The position of messages (default 1)|1||


## <em>get-message-by-id</em>

Get message by its ledgerId and entryId

**Command:**

```shell
$ pulsar-admin topics get-message-by-id options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-l, --ledgerId` | ledger id pointing to the desired ledger|0||
| `-e, --entryId` | entry id pointing to the desired entry|0||


## <em>get-message-id</em>

Get message ID

**Command:**

```shell
$ pulsar-admin topics get-message-id options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-d, --datetime` | datetime at or before this messageId. This datetime is in format of ISO_OFFSET_DATE_TIME, e.g. 2021-06-28T16:53:08Z or 2021-06-28T16:53:08.123456789+08:00|null||


## <em>reset-cursor</em>

Reset position for subscription to a position that is closest to timestamp or messageId.

**Command:**

```shell
$ pulsar-admin topics reset-cursor options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-e, --exclude-reset-position` | Exclude the reset position, start consume messages from the next position.|false||
| `--time, -t` | time in minutes to reset back to (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w)|null||
| `-s, --subscription` | Subscription to reset position on|null||
| `--messageId, -m` | messageId to reset back to ('latest', 'earliest', or 'ledgerId:entryId')|null||


## <em>terminate</em>

Terminate a topic and don't allow any more messages to be published

**Command:**

```shell
$ pulsar-admin topics terminate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>partitioned-terminate</em>

Terminate a partitioned topic and don't allow any more messages to be published

**Command:**

```shell
$ pulsar-admin topics partitioned-terminate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>compact</em>

Compact a topic

**Command:**

```shell
$ pulsar-admin topics compact options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>compaction-status</em>

Status of compaction on a topic

**Command:**

```shell
$ pulsar-admin topics compaction-status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-w, --wait-complete` | Wait for compaction to complete|false||


## <em>offload</em>

Trigger offload of data from a topic to long-term storage (e.g. Amazon S3)

**Command:**

```shell
$ pulsar-admin topics offload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --size-threshold` | Maximum amount of data to keep in BookKeeper for the specified topic (e.g. 10M, 5G).|null||


## <em>offload-status</em>

Check the status of data offloading from a topic to long-term storage

**Command:**

```shell
$ pulsar-admin topics offload-status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-w, --wait-complete` | Wait for offloading to complete|false||


## <em>last-message-id</em>

get the last commit message id of topic

**Command:**

```shell
$ pulsar-admin topics last-message-id options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-backlog-quotas</em>

Get the backlog quota policies for a topic

**Command:**

```shell
$ pulsar-admin topics get-backlog-quotas options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-backlog-quota</em>

Set a backlog quota policy for a topic

**Command:**

```shell
$ pulsar-admin topics set-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-l, --limit` | Size limit (eg: 10M, 16G)|-1||
| `-p, --policy` | Retention policy to enforce when the limit is reached. Valid options are: [producer_request_hold, producer_exception, consumer_backlog_eviction]|null||
| `-t, --type` | Backlog quota type to set. Valid options are: destination_storage and message_age. destination_storage limits backlog by size (in bytes). message_age limits backlog by time, that is, message timestamp (broker or publish timestamp). You can set size or time to control the backlog, or combine them together to control the backlog. |destination_storage||
| `-lt, --limitTime` | Time limit in second (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w), non-positive number for disabling time limit.|null||


## <em>remove-backlog-quota</em>

Remove a backlog quota policy from a topic

**Command:**

```shell
$ pulsar-admin topics remove-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --type` | Backlog quota type to remove|destination_storage||


## <em>get-message-ttl</em>

Get the message TTL for a topic

**Command:**

```shell
$ pulsar-admin topics get-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-message-ttl</em>

Set message TTL for a topic

**Command:**

```shell
$ pulsar-admin topics set-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --ttl` | Message TTL for topic in second (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w), allowed range from 1 to Integer.MAX_VALUE|null||


## <em>remove-message-ttl</em>

Remove message TTL for a topic

**Command:**

```shell
$ pulsar-admin topics remove-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-retention</em>

Get the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topics get-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-retention</em>

Set the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topics set-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--size, -s` | Retention size limit with optional size unit suffix. For example, 4096, 10M, 16G, 3T.  The size unit suffix character can be k/K, m/M, g/G, or t/T.  If the size unit suffix is not specified, the default unit is bytes. 0 or less than 1MB means no retention and -1 means infinite size retention|null||
| `--time, -t` | Retention time with optional time unit suffix. For example, 100m, 3h, 2d, 5w. If the time unit is not specified, the default unit is seconds. For example, -t 120 will set retention to 2 minutes. 0 means no retention and -1 means infinite time retention.|null||


## <em>remove-retention</em>

Remove the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topics remove-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>enable-deduplication</em>

Enable the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics enable-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>disable-deduplication</em>

Disable the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics disable-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-deduplication-enabled</em>

Get the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics get-deduplication-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-deduplication</em>

Enable or disable deduplication for a topic

**Command:**

```shell
$ pulsar-admin topics set-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable deduplication|false||
| `--enable, -e` | Enable deduplication|false||


## <em>get-deduplication</em>

Get the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics get-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>remove-deduplication</em>

Remove the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics remove-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-deduplication-snapshot-interval</em>

Get deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topics get-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-deduplication-snapshot-interval</em>

Set deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topics set-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-i, --interval` | Deduplication snapshot interval for topic in second, allowed range from 0 to Integer.MAX_VALUE|0||


## <em>remove-deduplication-snapshot-interval</em>

Remove deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topics remove-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-delayed-delivery</em>

Get the delayed delivery policy for a topic

**Command:**

```shell
$ pulsar-admin topics get-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-delayed-delivery</em>

Set the delayed delivery policy on a topic

**Command:**

```shell
$ pulsar-admin topics set-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable delayed delivery messages|false||
| `--enable, -e` | Enable delayed delivery messages|false||
| `--time, -t` | The tick time for when retrying on delayed delivery messages, affecting the accuracy of the delivery time compared to the scheduled time. (eg: 1s, 10s, 1m, 5h, 3d)|1s||


## <em>remove-delayed-delivery</em>

Remove the delayed delivery policy on a topic

**Command:**

```shell
$ pulsar-admin topics remove-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-persistence</em>

Get the persistence policies for a topic

**Command:**

```shell
$ pulsar-admin topics get-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-persistence</em>

Set the persistence policies for a topic

**Command:**

```shell
$ pulsar-admin topics set-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-e, --bookkeeper-ensemble` | Number of bookies to use for a topic|2||
| `-a, --bookkeeper-ack-quorum` | Number of acks (guaranteed copies) to wait for each entry|2||
| `-r, --ml-mark-delete-max-rate` | Throttling rate of mark-delete operation (0 means no throttle)|0.0||
| `-w, --bookkeeper-write-quorum` | How many writes to make of each entry|2||


## <em>remove-persistence</em>

Remove the persistence policy for a topic

**Command:**

```shell
$ pulsar-admin topics remove-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-offload-policies</em>

Get the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topics get-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-offload-policies</em>

Set the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topics set-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-b, --bucket` | ManagedLedger offload bucket, s3 and google-cloud-storage requires this parameter|null||
| `-r, --region` | ManagedLedger offload region, s3 and google-cloud-storage requires this parameter|null||
| `--s3-role-session-name, -rsn` | S3 role session name used for STSAssumeRoleSessionCredentialsProvider|null||
| `--offloadedReadPriority, -orp` | Read priority for offloaded messages. By default, once messages are offloaded to long-term storage, brokers read messages from long-term storage, but messages can still exist in BookKeeper for a period depends on your configuration. For messages that exist in both long-term storage and BookKeeper, you can set where to read messages from with the option `tiered-storage-first` or `bookkeeper-first`.|null||
| `-e, --endpoint` | ManagedLedger offload service endpoint, only s3 requires this parameter|null||
| `-dl, --offloadDeletionLagInMillis` | ManagedLedger offload deletion lag in bytes|null||
| `-rb, --readBufferSizeInBytes` | ManagedLedger offload read buffer size in bytes,s3 and google-cloud-storage requires this parameter|0||
| `-i, --aws-id` | AWS Credential Id to use when using driver S3 or aws-s3|null||
| `-ts, --offloadThresholdInSeconds` | ManagedLedger offload threshold in seconds|null||
| `-d, --driver` | ManagedLedger offload driver|null||
| `--ro, --s3-role` | S3 Role used for STSAssumeRoleSessionCredentialsProvider|null||
| `-m, --maxBlockSizeInBytes` | ManagedLedger offload max block Size in bytes,s3 and google-cloud-storage requires this parameter|0||
| `-t, --offloadThresholdInBytes` | ManagedLedger offload threshold in bytes|0||
| `-s, --aws-secret` | AWS Credential Secret to use when using driver S3 or aws-s3|null||


## <em>remove-offload-policies</em>

Remove the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topics remove-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-dispatch-rate</em>

Get message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-dispatch-rate</em>

Set message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topics set-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false||


## <em>remove-dispatch-rate</em>

Remove message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-subscription-dispatch-rate</em>

Get subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-subscription-dispatch-rate</em>

Set subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics set-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false||
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||


## <em>remove-subscription-dispatch-rate</em>

Remove subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-replicator-dispatch-rate</em>

Get replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-replicator-dispatch-rate</em>

Set replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics set-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false||


## <em>remove-replicator-dispatch-rate</em>

Remove replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-compaction-threshold</em>

Get compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topics get-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-compaction-threshold</em>

Set compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topics set-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--threshold, -t` | Maximum number of bytes in a topic backlog before compaction is triggered (eg: 10M, 16G, 3T). 0 disables automatic compaction|0||


## <em>remove-compaction-threshold</em>

Remove compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topics remove-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-unacked-messages-on-consumer</em>

Get max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-unacked-messages-on-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-max-unacked-messages-on-consumer</em>

Set max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-unacked-messages-on-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --maxNum` | max unacked messages num on consumer|0||


## <em>remove-max-unacked-messages-on-consumer</em>

Remove max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-unacked-messages-on-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-unacked-messages-on-subscription</em>

Get max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-unacked-messages-on-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-max-unacked-messages-on-subscription</em>

Set max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-unacked-messages-on-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --maxNum` | max unacked messages num on subscription|0||


## <em>remove-max-unacked-messages-on-subscription</em>

Remove max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-unacked-messages-on-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-unacked-messages-per-consumer</em>

Get max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-max-unacked-messages-per-consumer</em>

Set max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --maxNum` | max unacked messages num on consumer|0||


## <em>remove-max-unacked-messages-per-consumer</em>

Remove max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-unacked-messages-per-subscription</em>

Get max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-max-unacked-messages-per-subscription</em>

Set max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --maxNum` | max unacked messages num on subscription|0||


## <em>remove-max-unacked-messages-per-subscription</em>

Remove max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-publish-rate</em>

Get publish rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-publish-rate</em>

Set publish rate for a topic

**Command:**

```shell
$ pulsar-admin topics set-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--byte-publish-rate, -b` | byte-publish-rate (default -1 will be overwrite if not passed)|-1||
| `--msg-publish-rate, -m` | message-publish-rate (default -1 will be overwrite if not passed)|-1||


## <em>remove-publish-rate</em>

Remove publish rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-subscription-types-enabled</em>

Set subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topics set-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--types, -t` | Subscription types enabled list (comma separated values). Possible values: (Exclusive, Shared, Failover, Key_Shared).|null||


## <em>get-subscription-types-enabled</em>

Get subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topics get-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>remove-subscription-types-enabled</em>

Remove subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topics remove-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-maxProducers</em>

Get max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics get-maxProducers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-maxProducers</em>

Set max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics set-maxProducers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-producers, -p` | Max producers for a topic|0||


## <em>remove-maxProducers</em>

Remove max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics remove-maxProducers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-producers</em>

Get max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-max-producers</em>

Set max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-producers, -p` | Max producers for a topic|0||


## <em>remove-max-producers</em>

Remove max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-subscriptions</em>

Get max number of subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-max-subscriptions</em>

Set max number of subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-subscriptions-per-topic, -m` | Maximum subscription limit for a topic|0||


## <em>remove-max-subscriptions</em>

Remove max number of subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-message-size</em>

Get max message size for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-max-message-size</em>

Set max message size for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-message-size, -m` | Max message size for a topic|0||


## <em>remove-max-message-size</em>

Remove max message size for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-consumers-per-subscription</em>

Get max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-max-consumers-per-subscription</em>

Set max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-consumers-per-subscription, -c` | maxConsumersPerSubscription for a namespace|0||


## <em>remove-max-consumers-per-subscription</em>

Remove max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-inactive-topic-policies</em>

Get the inactive topic policies on a topic

**Command:**

```shell
$ pulsar-admin topics get-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-inactive-topic-policies</em>

Set the inactive topic policies on a topic

**Command:**

```shell
$ pulsar-admin topics set-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--delete-mode, -m` | Mode of delete inactive topic, Valid options are: [delete_when_no_subscriptions, delete_when_subscriptions_caught_up]|null||
| `--enable-delete-while-inactive, -e` | Enable delete while inactive|false||
| `--disable-delete-while-inactive, -d` | Disable delete while inactive|false||
| `--max-inactive-duration, -t` | Max duration of topic inactivity in seconds, topics that are inactive for longer than this value will be deleted (eg: 1s, 10s, 1m, 5h, 3d)|null||


## <em>remove-inactive-topic-policies</em>

Remove inactive topic policies from a topic

**Command:**

```shell
$ pulsar-admin topics remove-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-max-consumers</em>

Get max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-max-consumers</em>

Set max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-consumers, -c` | Max consumers for a topic|0||


## <em>remove-max-consumers</em>

Remove max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-subscribe-rate</em>

Get consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-subscribe-rate</em>

Set consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topics set-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--subscribe-rate-period, -st` | subscribe-rate-period in second type (default 30 second will be overwrite if not passed)|30||
| `--subscribe-rate, -sr` | subscribe-rate (default -1 will be overwrite if not passed)|-1||


## <em>remove-subscribe-rate</em>

Remove consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-replicated-subscription-status</em>

Enable or disable a replicated subscription on a topic

**Command:**

```shell
$ pulsar-admin topics set-replicated-subscription-status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable replication|false||
| `-s, --subscription` | Subscription name to enable or disable replication|null||
| `--enable, -e` | Enable replication|false||


## <em>get-replicated-subscription-status</em>

Get replicated subscription status on a topic

**Command:**

```shell
$ pulsar-admin topics get-replicated-subscription-status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription name|null||


## <em>get-backlog-size</em>

Calculate backlog size by a message ID (in bytes).

**Command:**

```shell
$ pulsar-admin topics get-backlog-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--messageId, -m` | messageId used to calculate backlog size. It can be (ledgerId:entryId).|-1:-1||


## <em>analyze-backlog</em>

Analyze the backlog of a subscription.

**Command:**

```shell
$ pulsar-admin topics analyze-backlog options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription to be analyzed|null||
| `--position, -p` | message position to start the scan from (ledgerId:entryId)|null||


## <em>get-replication-clusters</em>

Get the replication clusters for a topic

**Command:**

```shell
$ pulsar-admin topics get-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-replication-clusters</em>

Set the replication clusters for a topic

**Command:**

```shell
$ pulsar-admin topics set-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--clusters, -c` | Replication Cluster Ids list (comma separated values)|null||


## <em>remove-replication-clusters</em>

Remove the replication clusters for a topic

**Command:**

```shell
$ pulsar-admin topics remove-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-shadow-topics</em>

Get the shadow topics for a topic

**Command:**

```shell
$ pulsar-admin topics get-shadow-topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-shadow-topics</em>

Set the shadow topics for a topic

**Command:**

```shell
$ pulsar-admin topics set-shadow-topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--topics, -t` | Shadow topic list (comma separated values)|null||


## <em>remove-shadow-topics</em>

Remove the shadow topics for a topic

**Command:**

```shell
$ pulsar-admin topics remove-shadow-topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>create-shadow-topic</em>

Create a shadow topic for an existing source topic.

**Command:**

```shell
$ pulsar-admin topics create-shadow-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--source, -s` | source topic name|null||
| `--properties, -p` | key value pair properties(eg: a=a b=b c=c)|null||


## <em>get-shadow-source</em>

Get the source topic for a shadow topic

**Command:**

```shell
$ pulsar-admin topics get-shadow-source options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>get-schema-validation-enforce</em>

Get the schema validation enforced

**Command:**

```shell
$ pulsar-admin topics get-schema-validation-enforce options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-schema-validation-enforce</em>

Set the schema whether open schema validation enforced

**Command:**

```shell
$ pulsar-admin topics set-schema-validation-enforce options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable schema validation enforced|false||


## <em>trim-topic</em>

Trim a topic

**Command:**

```shell
$ pulsar-admin topics trim-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|

