# topics

Operations on persistent topics


```shell
$ pulsar-admin topics subcommand
```



## list

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


## list-partitioned-topics

Get the list of partitioned topics under a namespace.

**Command:**

```shell
$ pulsar-admin topics list-partitioned-topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ist, --include-system-topic` | Include system topic|false||


## permissions

Get the permissions on a topic. Retrieve the effective permissions for a topic. These permissions are defined by the permissions set at the namespace level combined (union) with any eventual specific permission set on the topic.

**Command:**

```shell
$ pulsar-admin topics permissions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## grant-permission

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


## revoke-permission

Revoke permissions on a topic. Revoke permissions to a client role on a single topic. If the permission was not set at the topic level, but rather at the namespace level, this operation will return an error (HTTP status code 412).

**Command:**

```shell
$ pulsar-admin topics revoke-permission options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-r, --role` | Client role to which revoke permissions|null||


## lookup

Lookup a topic from the current serving broker

**Command:**

```shell
$ pulsar-admin topics lookup options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## partitioned-lookup

Lookup a partitioned topic from the current serving broker

**Command:**

```shell
$ pulsar-admin topics partitioned-lookup options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --sort-by-broker` | Sort partitioned-topic by Broker Url|false||


## bundle-range

Get Namespace bundle range of a topic

**Command:**

```shell
$ pulsar-admin topics bundle-range options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## delete

Delete a topic. The topic cannot be deleted if there's any active subscription or producers connected to it.And the application is not able to connect to the topic(delete then re-create with same name) again if the schema auto uploading is disabled. Besides, users should to use the truncate cmd to clean up data of the topic instead of delete cmd if users continue to use this topic later.

**Command:**

```shell
$ pulsar-admin topics delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-f, --force` | Close all producer/consumer/replicator and delete topic forcefully|false||


## truncate

Truncate a topic. 
		The truncate operation will move all cursors to the end of the topic and delete all inactive ledgers. 

**Command:**

```shell
$ pulsar-admin topics truncate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## unload

Unload a topic.

**Command:**

```shell
$ pulsar-admin topics unload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## subscriptions

Get the list of subscriptions on the topic

**Command:**

```shell
$ pulsar-admin topics subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## unsubscribe

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


## create-subscription

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


## update-subscription-properties

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


## get-subscription-properties

Get the properties of a subscription on a topic

**Command:**

```shell
$ pulsar-admin topics get-subscription-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription to describe|null||


## stats

Get the stats for the topic and its connected producers and consumers. All the rates are computed over a 1 minute window and are relative the last completed 1 minute period.

**Command:**

```shell
$ pulsar-admin topics stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-sbs, --get-subscription-backlog-size` | Set true to get backlog size for each subscription, locking required.|false||
| `-gpb, --get-precise-backlog` | Set true to get precise backlog|false||
| `-etb, --get-earliest-time-in-backlog` | Set true to get earliest time in backlog|false||


## stats-internal

Get the internal stats for the topic

**Command:**

```shell
$ pulsar-admin topics stats-internal options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --metadata` | Flag to include ledger metadata|false||


## info-internal

Get the internal metadata info for the topic

**Command:**

```shell
$ pulsar-admin topics info-internal options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## partitioned-stats

Get the stats for the partitioned topic and its connected producers and consumers. All the rates are computed over a 1 minute window and are relative the last completed 1 minute period.

**Command:**

```shell
$ pulsar-admin topics partitioned-stats options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-gpb, --get-precise-backlog` | Set true to get precise backlog|false||
| `-sbs, --get-subscription-backlog-size` | Set true to get backlog size for each subscription, locking required.|false||
| `-etb, --get-earliest-time-in-backlog` | Set true to get earliest time in backlog|false||
| `--per-partition` | Get per partition stats|false||


## partitioned-stats-internal

Get the internal stats for the partitioned topic and its connected producers and consumers. All the rates are computed over a 1 minute window and are relative the last completed 1 minute period.

**Command:**

```shell
$ pulsar-admin topics partitioned-stats-internal options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## skip

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


## clear-backlog

Skip all the messages for the subscription

**Command:**

```shell
$ pulsar-admin topics clear-backlog options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription to be cleared|null||


## expire-messages

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


## expire-messages-all-subscriptions

Expire messages that older than given expiry time (in seconds) for all subscriptions

**Command:**

```shell
$ pulsar-admin topics expire-messages-all-subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --expireTime` | Expire messages older than time in seconds (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w)|null||


## create-partitioned-topic

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


## create-missed-partitions

Try to create partitions for partitioned topic. The partitions of partition topic has to be created, can be used by repair partitions when topic auto creation is disabled

**Command:**

```shell
$ pulsar-admin topics create-missed-partitions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## create

Create a non-partitioned topic.

**Command:**

```shell
$ pulsar-admin topics create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--metadata, -m` | key value pair properties(a=a,b=b,c=c)|null||


## update-partitioned-topic

Update existing non-global partitioned topic. New updating number of partitions must be greater than existing number of partitions.

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


## get-partitioned-topic-metadata

Get the partitioned topic metadata. If the topic is not created or is a non-partitioned topic, it returns empty topic with 0 partitions

**Command:**

```shell
$ pulsar-admin topics get-partitioned-topic-metadata options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-properties

Get the topic properties.

**Command:**

```shell
$ pulsar-admin topics get-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## update-properties

Update the properties of on a topic

**Command:**

```shell
$ pulsar-admin topics update-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--property, -p` | key value pair properties(-p a=b -p c=d)|null||


## remove-properties

Remove the key in properties of a topic

**Command:**

```shell
$ pulsar-admin topics remove-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--key, -k` | The key to remove in the properties of topic|null||


## delete-partitioned-topic

Delete a partitioned topic. It will also delete all the partitions of the topic if it exists.And the application is not able to connect to the topic(delete then re-create with same name) again if the schema auto uploading is disabled. Besides, users should to use the truncate cmd to clean up data of the topic instead of delete cmd if users continue to use this topic later.

**Command:**

```shell
$ pulsar-admin topics delete-partitioned-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-f, --force` | Close all producer/consumer/replicator and delete topic forcefully|false||


## peek-messages

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


## examine-messages

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


## get-message-by-id

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


## get-message-id

Get message ID

**Command:**

```shell
$ pulsar-admin topics get-message-id options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-d, --datetime` | datetime at or before this messageId. This datetime is in format of ISO_OFFSET_DATE_TIME, e.g. 2021-06-28T16:53:08Z or 2021-06-28T16:53:08.123456789+08:00|null||


## reset-cursor

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


## terminate

Terminate a topic and don't allow any more messages to be published

**Command:**

```shell
$ pulsar-admin topics terminate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## partitioned-terminate

Terminate a partitioned topic and don't allow any more messages to be published

**Command:**

```shell
$ pulsar-admin topics partitioned-terminate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## compact

Compact a topic

**Command:**

```shell
$ pulsar-admin topics compact options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## compaction-status

Status of compaction on a topic

**Command:**

```shell
$ pulsar-admin topics compaction-status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-w, --wait-complete` | Wait for compaction to complete|false||


## offload

Trigger offload of data from a topic to long-term storage (e.g. Amazon S3)

**Command:**

```shell
$ pulsar-admin topics offload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --size-threshold` | Maximum amount of data to keep in BookKeeper for the specified topic (e.g. 10M, 5G).|null||


## offload-status

Check the status of data offloading from a topic to long-term storage

**Command:**

```shell
$ pulsar-admin topics offload-status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-w, --wait-complete` | Wait for offloading to complete|false||


## last-message-id

get the last commit message id of topic

**Command:**

```shell
$ pulsar-admin topics last-message-id options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-backlog-quotas

Get the backlog quota policies for a topic

**Command:**

```shell
$ pulsar-admin topics get-backlog-quotas options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-backlog-quota

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


## remove-backlog-quota

Remove a backlog quota policy from a topic

**Command:**

```shell
$ pulsar-admin topics remove-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --type` | Backlog quota type to remove|destination_storage||


## get-message-ttl

Get the message TTL for a topic

**Command:**

```shell
$ pulsar-admin topics get-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-message-ttl

Set message TTL for a topic

**Command:**

```shell
$ pulsar-admin topics set-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --ttl` | Message TTL for topic in second (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w), allowed range from 1 to Integer.MAX_VALUE|null||


## remove-message-ttl

Remove message TTL for a topic

**Command:**

```shell
$ pulsar-admin topics remove-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-retention

Get the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topics get-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-retention

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


## remove-retention

Remove the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topics remove-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## enable-deduplication

Enable the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics enable-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## disable-deduplication

Disable the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics disable-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-deduplication-enabled

Get the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics get-deduplication-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-deduplication

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


## get-deduplication

Get the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics get-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-deduplication

Remove the deduplication policy for a topic

**Command:**

```shell
$ pulsar-admin topics remove-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-deduplication-snapshot-interval

Get deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topics get-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-deduplication-snapshot-interval

Set deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topics set-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-i, --interval` | Deduplication snapshot interval for topic in second, allowed range from 0 to Integer.MAX_VALUE|0||


## remove-deduplication-snapshot-interval

Remove deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topics remove-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-delayed-delivery

Get the delayed delivery policy for a topic

**Command:**

```shell
$ pulsar-admin topics get-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-delayed-delivery

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


## remove-delayed-delivery

Remove the delayed delivery policy on a topic

**Command:**

```shell
$ pulsar-admin topics remove-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-persistence

Get the persistence policies for a topic

**Command:**

```shell
$ pulsar-admin topics get-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-persistence

Set the persistence policies for a topic

**Command:**

```shell
$ pulsar-admin topics set-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-e, --bookkeeper-ensemble` | Number of bookies to use for a topic|0||
| `-a, --bookkeeper-ack-quorum` | Number of acks (guaranteed copies) to wait for each entry|0||
| `-r, --ml-mark-delete-max-rate` | Throttling rate of mark-delete operation (0 means no throttle)|0.0||
| `-w, --bookkeeper-write-quorum` | How many writes to make of each entry|0||


## remove-persistence

Remove the persistence policy for a topic

**Command:**

```shell
$ pulsar-admin topics remove-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-offload-policies

Get the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topics get-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-offload-policies

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


## remove-offload-policies

Remove the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topics remove-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-dispatch-rate

Get message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-dispatch-rate

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


## remove-dispatch-rate

Remove message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-subscription-dispatch-rate

Get subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-subscription-dispatch-rate

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


## remove-subscription-dispatch-rate

Remove subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-replicator-dispatch-rate

Get replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-replicator-dispatch-rate

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


## remove-replicator-dispatch-rate

Remove replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-compaction-threshold

Get compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topics get-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-compaction-threshold

Set compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topics set-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--threshold, -t` | Maximum number of bytes in a topic backlog before compaction is triggered (eg: 10M, 16G, 3T). 0 disables automatic compaction|0||


## remove-compaction-threshold

Remove compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topics remove-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-unacked-messages-on-consumer

Get max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-unacked-messages-on-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-max-unacked-messages-on-consumer

Set max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-unacked-messages-on-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --maxNum` | max unacked messages num on consumer|0||


## remove-max-unacked-messages-on-consumer

Remove max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-unacked-messages-on-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-unacked-messages-on-subscription

Get max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-unacked-messages-on-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-max-unacked-messages-on-subscription

Set max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-unacked-messages-on-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --maxNum` | max unacked messages num on subscription|0||


## remove-max-unacked-messages-on-subscription

Remove max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-unacked-messages-on-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-unacked-messages-per-consumer

Get max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-max-unacked-messages-per-consumer

Set max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --maxNum` | max unacked messages num on consumer|0||


## remove-max-unacked-messages-per-consumer

Remove max unacked messages policy on consumer for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-unacked-messages-per-subscription

Get max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-max-unacked-messages-per-subscription

Set max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --maxNum` | max unacked messages num on subscription|0||


## remove-max-unacked-messages-per-subscription

Remove max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-publish-rate

Get publish rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-publish-rate

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


## remove-publish-rate

Remove publish rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-subscription-types-enabled

Set subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topics set-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--types, -t` | Subscription types enabled list (comma separated values). Possible values: (Exclusive, Shared, Failover, Key_Shared).|null||


## get-subscription-types-enabled

Get subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topics get-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-subscription-types-enabled

Remove subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topics remove-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-maxProducers

Get max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics get-maxProducers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-maxProducers

Set max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics set-maxProducers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-producers, -p` | Max producers for a topic|0||


## remove-maxProducers

Remove max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics remove-maxProducers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-producers

Get max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-max-producers

Set max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-producers, -p` | Max producers for a topic|0||


## remove-max-producers

Remove max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-subscriptions

Get max number of subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-subscriptions

Set max number of subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-subscriptions-per-topic, -m` | Maximum subscription limit for a topic|0||


## remove-max-subscriptions

Remove max number of subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-subscriptions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-message-size

Get max message size for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-message-size

Set max message size for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-message-size, -m` | Max message size for a topic|0||


## remove-max-message-size

Remove max message size for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-consumers-per-subscription

Get max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-consumers-per-subscription

Set max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-consumers-per-subscription, -c` | maxConsumersPerSubscription for a namespace|0||


## remove-max-consumers-per-subscription

Remove max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-inactive-topic-policies

Get the inactive topic policies on a topic

**Command:**

```shell
$ pulsar-admin topics get-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-inactive-topic-policies

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


## remove-inactive-topic-policies

Remove inactive topic policies from a topic

**Command:**

```shell
$ pulsar-admin topics remove-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-consumers

Get max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topics get-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-max-consumers

Set max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topics set-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-consumers, -c` | Max consumers for a topic|0||


## remove-max-consumers

Remove max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topics remove-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-subscribe-rate

Get consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topics get-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-subscribe-rate

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


## remove-subscribe-rate

Remove consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topics remove-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-replicated-subscription-status

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


## get-replicated-subscription-status

Get replicated subscription status on a topic

**Command:**

```shell
$ pulsar-admin topics get-replicated-subscription-status options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription name|null||


## get-backlog-size

Calculate backlog size by a message ID (in bytes).

**Command:**

```shell
$ pulsar-admin topics get-backlog-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--messageId, -m` | messageId used to calculate backlog size. It can be (ledgerId:entryId).|-1:-1||


## analyze-backlog

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


## get-replication-clusters

Get the replication clusters for a topic

**Command:**

```shell
$ pulsar-admin topics get-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-replication-clusters

Set the replication clusters for a topic

**Command:**

```shell
$ pulsar-admin topics set-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--clusters, -c` | Replication Cluster Ids list (comma separated values)|null||


## remove-replication-clusters

Remove the replication clusters for a topic

**Command:**

```shell
$ pulsar-admin topics remove-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-shadow-topics

Get the shadow topics for a topic

**Command:**

```shell
$ pulsar-admin topics get-shadow-topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-shadow-topics

Set the shadow topics for a topic

**Command:**

```shell
$ pulsar-admin topics set-shadow-topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--topics, -t` | Shadow topic list (comma separated values)|null||


## remove-shadow-topics

Remove the shadow topics for a topic

**Command:**

```shell
$ pulsar-admin topics remove-shadow-topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## create-shadow-topic

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


## get-shadow-source

Get the source topic for a shadow topic

**Command:**

```shell
$ pulsar-admin topics get-shadow-source options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-schema-validation-enforce

Get the schema validation enforced

**Command:**

```shell
$ pulsar-admin topics get-schema-validation-enforce options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## set-schema-validation-enforce

Set the schema whether open schema validation enforced

**Command:**

```shell
$ pulsar-admin topics set-schema-validation-enforce options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable schema validation enforced|false||

