------------

# topics

### Usage

`$topics`

------------

Operations on persistent topics

```shell
$ pulsar-admin topics subcommand
```

* `list`
* `list-partitioned-topics`
* `permissions`
* `grant-permission`
* `revoke-permission`
* `lookup`
* `partitioned-lookup`
* `bundle-range`
* `delete`
* `truncate`
* `unload`
* `subscriptions`
* `unsubscribe`
* `create-subscription`
* `stats`
* `stats-internal`
* `info-internal`
* `partitioned-stats`
* `partitioned-stats-internal`
* `skip`
* `clear-backlog`
* `expire-messages`
* `expire-messages-all-subscriptions`
* `create-partitioned-topic`
* `create-missed-partitions`
* `create`
* `update-partitioned-topic`
* `get-partitioned-topic-metadata`
* `delete-partitioned-topic`
* `peek-messages`
* `examine-messages`
* `get-message-by-id`
* `get-message-id`
* `reset-cursor`
* `terminate`
* `compact`
* `compaction-status`
* `offload`
* `offload-status`
* `last-message-id`
* `get-backlog-quotas`
* `set-backlog-quota`
* `remove-backlog-quota`
* `get-message-ttl`
* `set-message-ttl`
* `remove-message-ttl`
* `get-retention`
* `set-retention`
* `remove-retention`
* `enable-deduplication`
* `disable-deduplication`
* `get-deduplication-enabled`
* `set-deduplication`
* `get-deduplication`
* `remove-deduplication`
* `get-deduplication-snapshot-interval`
* `set-deduplication-snapshot-interval`
* `remove-deduplication-snapshot-interval`
* `get-delayed-delivery`
* `set-delayed-delivery`
* `remove-delayed-delivery`
* `get-persistence`
* `set-persistence`
* `remove-persistence`
* `get-offload-policies`
* `set-offload-policies`
* `remove-offload-policies`
* `get-dispatch-rate`
* `set-dispatch-rate`
* `remove-dispatch-rate`
* `get-subscription-dispatch-rate`
* `set-subscription-dispatch-rate`
* `remove-subscription-dispatch-rate`
* `get-replicator-dispatch-rate`
* `set-replicator-dispatch-rate`
* `remove-replicator-dispatch-rate`
* `get-compaction-threshold`
* `set-compaction-threshold`
* `remove-compaction-threshold`
* `get-max-unacked-messages-on-consumer`
* `set-max-unacked-messages-on-consumer`
* `remove-max-unacked-messages-on-consumer`
* `get-max-unacked-messages-on-subscription`
* `set-max-unacked-messages-on-subscription`
* `remove-max-unacked-messages-on-subscription`
* `get-max-unacked-messages-per-consumer`
* `set-max-unacked-messages-per-consumer`
* `remove-max-unacked-messages-per-consumer`
* `get-max-unacked-messages-per-subscription`
* `set-max-unacked-messages-per-subscription`
* `remove-max-unacked-messages-per-subscription`
* `get-publish-rate`
* `set-publish-rate`
* `remove-publish-rate`
* `set-subscription-types-enabled`
* `get-subscription-types-enabled`
* `get-maxProducers`
* `set-maxProducers`
* `remove-maxProducers`
* `get-max-producers`
* `set-max-producers`
* `remove-max-producers`
* `get-max-subscriptions`
* `set-max-subscriptions`
* `remove-max-subscriptions`
* `get-max-message-size`
* `set-max-message-size`
* `remove-max-message-size`
* `get-max-consumers-per-subscription`
* `set-max-consumers-per-subscription`
* `remove-max-consumers-per-subscription`
* `get-inactive-topic-policies`
* `set-inactive-topic-policies`
* `remove-inactive-topic-policies`
* `get-max-consumers`
* `set-max-consumers`
* `remove-max-consumers`
* `get-subscribe-rate`
* `set-subscribe-rate`
* `remove-subscribe-rate`
* `set-replicated-subscription-status`
* `get-backlog-size`

## <em>list

Get the list of topics under a namespace.

### Usage

------------

```shell
$ pulsar-admin topics list options
```

Options

| Flag                  | Description                                        | Default |
|-----------------------|----------------------------------------------------|---------|
| `-td, --topic-domain` | Allowed topic domain (persistent, non_persistent). | null    |

## <em>list-partitioned-topics

Get the list of partitioned topics under a namespace.

### Usage

------------

```shell
$ pulsar-admin topics list-partitioned-topics options
```

## <em>permissions

Get the permissions on a topic. Retrieve the effective permissions for a topic. These permissions are defined by the
permissions set at the namespace level combined (union) with any eventual specific permission set on the topic.

### Usage

------------

```shell
$ pulsar-admin topics permissions options
```

## <em>grant-permission

Grant a new permission to a client role on a single topic.

### Usage

------------

```shell
$ pulsar-admin topics grant-permission options
```

Options

| Flag        | Description                             | Default |
|-------------|-----------------------------------------|---------|
| `--role`    | Client role to which grant permissions  | null    |
| `--actions` | Actions to be granted (produce,consume) | null    |

## <em>revoke-permission

Revoke permissions on a topic. Revoke permissions to a client role on a single topic. If the permission was not set at
the topic level, but rather at the namespace level, this operation will return an error (HTTP status code 412).

### Usage

------------

```shell
$ pulsar-admin topics revoke-permission options
```

Options

| Flag     | Description                             | Default |
|----------|-----------------------------------------|---------|
| `--role` | Client role to which revoke permissions | null    |

## <em>lookup

Lookup a topic from the current serving broker

### Usage

------------

```shell
$ pulsar-admin topics lookup options
```

## <em>partitioned-lookup

Lookup a partitioned topic from the current serving broker

### Usage

------------

```shell
$ pulsar-admin topics partitioned-lookup options
```

## <em>bundle-range

Get Namespace bundle range of a topic

### Usage

------------

```shell
$ pulsar-admin topics bundle-range options
```

## <em>delete

Delete a topic. The topic cannot be deleted if there's any active subscription or producers connected to it.

### Usage

------------

```shell
$ pulsar-admin topics delete options
```

Options

| Flag                 | Description                                                        | Default |
|----------------------|--------------------------------------------------------------------|---------|
| `-f, --force`        | Close all producer/consumer/replicator and delete topic forcefully | false   |
| `-d, --deleteSchema` | Delete schema while deleting topic                                 | false   |

## <em>truncate

Truncate a topic.
The truncate operation will move all cursors to the end of the topic and delete all inactive ledgers.

### Usage

------------

```shell
$ pulsar-admin topics truncate options
```

## <em>unload

Unload a topic.

### Usage

------------

```shell
$ pulsar-admin topics unload options
```

## <em>subscriptions

Get the list of subscriptions on the topic

### Usage

------------

```shell
$ pulsar-admin topics subscriptions options
```

## <em>unsubscribe

Delete a durable subscriber from a topic. The subscription cannot be deleted if there are any active consumers attached
to it

### Usage

------------

```shell
$ pulsar-admin topics unsubscribe options
```

Options

| Flag                 | Description                                                           | Default |
|----------------------|-----------------------------------------------------------------------|---------|
| `-f, --force`        | Disconnect and close all consumers and delete subscription forcefully | false   |
| `-s, --subscription` | Subscription to be deleted                                            | null    |

## <em>create-subscription

Create a new subscription on a topic

### Usage

------------

```shell
$ pulsar-admin topics create-subscription options
```

Options

| Flag                 | Description                                                                                             | Default |
|----------------------|---------------------------------------------------------------------------------------------------------|---------|
| `-s, --subscription` | Subscription to reset position on                                                                       | null    |
| `--messageId, -m`    | messageId where to create the subscription. It can be either 'latest', 'earliest' or (ledgerId:entryId) | latest  |

## <em>stats

Get the stats for the topic and its connected producers and consumers. All the rates are computed over a 1 minute window
and are relative the last completed 1 minute period.

### Usage

------------

```shell
$ pulsar-admin topics stats options
```

Options

| Flag                                    | Description                                                           | Default |
|-----------------------------------------|-----------------------------------------------------------------------|---------|
| `-sbs, --get-subscription-backlog-size` | Set true to get backlog size for each subscription, locking required. | false   |
| `-gpb, --get-precise-backlog`           | Set true to get precise backlog                                       | false   |

## <em>stats-internal

Get the internal stats for the topic

### Usage

------------

```shell
$ pulsar-admin topics stats-internal options
```

Options

| Flag             | Description                     | Default |
|------------------|---------------------------------|---------|
| `-m, --metadata` | Flag to include ledger metadata | false   |

## <em>info-internal

Get the internal metadata info for the topic

### Usage

------------

```shell
$ pulsar-admin topics info-internal options
```

## <em>partitioned-stats

Get the stats for the partitioned topic and its connected producers and consumers. All the rates are computed over a 1
minute window and are relative the last completed 1 minute period.

### Usage

------------

```shell
$ pulsar-admin topics partitioned-stats options
```

Options

| Flag                                    | Description                                                           | Default |
|-----------------------------------------|-----------------------------------------------------------------------|---------|
| `-gpb, --get-precise-backlog`           | Set true to get precise backlog                                       | false   |
| `-sbs, --get-subscription-backlog-size` | Set true to get backlog size for each subscription, locking required. | false   |
| `--per-partition`                       | Get per partition stats                                               | false   |

## <em>partitioned-stats-internal

Get the internal stats for the partitioned topic and its connected producers and consumers. All the rates are computed
over a 1 minute window and are relative the last completed 1 minute period.

### Usage

------------

```shell
$ pulsar-admin topics partitioned-stats-internal options
```

## <em>skip

Skip some messages for the subscription

### Usage

------------

```shell
$ pulsar-admin topics skip options
```

Options

| Flag                 | Description                         | Default |
|----------------------|-------------------------------------|---------|
| `-s, --subscription` | Subscription to be skip messages on | null    |
| `-n, --count`        | Number of messages to skip          | 0       |

## <em>clear-backlog

Skip all the messages for the subscription

### Usage

------------

```shell
$ pulsar-admin topics clear-backlog options
```

Options

| Flag                 | Description                | Default |
|----------------------|----------------------------|---------|
| `-s, --subscription` | Subscription to be cleared | null    |

## <em>expire-messages

Expire messages that older than given expiry time (in seconds) for the subscription

### Usage

------------

```shell
$ pulsar-admin topics expire-messages options
```

Options

| Flag                           | Description                                                                | Default |
|--------------------------------|----------------------------------------------------------------------------|---------|
| `-e, --exclude-reset-position` | Exclude the reset position, start consume messages from the next position. | false   |
| `-t, --expireTime`             | Expire messages older than time in seconds                                 | -1      |
| `-s, --subscription`           | Subscription to be skip messages on                                        | null    |
| `--position, -p`               | message position to reset back to (ledgerId:entryId)                       | null    |

## <em>expire-messages-all-subscriptions

Expire messages that older than given expiry time (in seconds) for all subscriptions

### Usage

------------

```shell
$ pulsar-admin topics expire-messages-all-subscriptions options
```

Options

| Flag               | Description                                | Default |
|--------------------|--------------------------------------------|---------|
| `-t, --expireTime` | Expire messages older than time in seconds | 0       |

## <em>create-partitioned-topic

Create a partitioned topic. The partitioned topic has to be created before creating a producer on it.

### Usage

------------

```shell
$ pulsar-admin topics create-partitioned-topic options
```

Options

| Flag               | Description                        | Default |
|--------------------|------------------------------------|---------|
| `-p, --partitions` | Number of partitions for the topic | 0       |

## <em>create-missed-partitions

Try to create partitions for partitioned topic. The partitions of partition topic has to be created, can be used by
repair partitions when topic auto creation is disabled

### Usage

------------

```shell
$ pulsar-admin topics create-missed-partitions options
```

## <em>create

Create a non-partitioned topic.

### Usage

------------

```shell
$ pulsar-admin topics create options
```

## <em>update-partitioned-topic

Update existing non-global partitioned topic. New updating number of partitions must be greater than existing number of
partitions.

### Usage

------------

```shell
$ pulsar-admin topics update-partitioned-topic options
```

Options

| Flag               | Description                                                     | Default |
|--------------------|-----------------------------------------------------------------|---------|
| `-p, --partitions` | Number of partitions for the topic                              | 0       |
| `-f, --force`      | Update forcefully without validating existing partitioned topic | false   |

## <em>get-partitioned-topic-metadata

Get the partitioned topic metadata. If the topic is not created or is a non-partitioned topic, it returns empty topic
with 0 partitions

### Usage

------------

```shell
$ pulsar-admin topics get-partitioned-topic-metadata options
```

## <em>delete-partitioned-topic

Delete a partitioned topic. It will also delete all the partitions of the topic if it exists.

### Usage

------------

```shell
$ pulsar-admin topics delete-partitioned-topic options
```

Options

| Flag                 | Description                                                        | Default |
|----------------------|--------------------------------------------------------------------|---------|
| `-d, --deleteSchema` | Delete schema while deleting topic                                 | false   |
| `-f, --force`        | Close all producer/consumer/replicator and delete topic forcefully | false   |

## <em>peek-messages

Peek some messages for the subscription

### Usage

------------

```shell
$ pulsar-admin topics peek-messages options
```

Options

| Flag                 | Description                       | Default |
|----------------------|-----------------------------------|---------|
| `-n, --count`        | Number of messages (default 1)    | 1       |
| `-s, --subscription` | Subscription to get messages from | null    |

## <em>examine-messages

Examine a specific message on a topic by position relative to the earliest or the latest message.

### Usage

------------

```shell
$ pulsar-admin topics examine-messages options
```

Options

| Flag                    | Description                                                                                    | Default |
|-------------------------|------------------------------------------------------------------------------------------------|---------|
| `-i, --initialPosition` | Relative start position to examine message.It can be 'latest' or 'earliest', default is latest | latest  |
| `-m, --messagePosition` | The position of messages (default 1)                                                           | 1       |

## <em>get-message-by-id

Get message by its ledgerId and entryId

### Usage

------------

```shell
$ pulsar-admin topics get-message-by-id options
```

Options

| Flag             | Description                              | Default |
|------------------|------------------------------------------|---------|
| `-l, --ledgerId` | ledger id pointing to the desired ledger | 0       |
| `-e, --entryId`  | entry id pointing to the desired entry   | 0       |

## <em>get-message-id

Get message ID

### Usage

------------

```shell
$ pulsar-admin topics get-message-id options
```

Options

| Flag             | Description                                                                                                                                                | Default |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `-d, --datetime` | datetime at or before this messageId. This datetime is in format of ISO_OFFSET_DATE_TIME, e.g. 2021-06-28T16:53:08Z or 2021-06-28T16:53:08.123456789+08:00 | null    |

## <em>reset-cursor

Reset position for subscription to a position that is closest to timestamp or messageId.

### Usage

------------

```shell
$ pulsar-admin topics reset-cursor options
```

Options

| Flag                           | Description                                                                          | Default |
|--------------------------------|--------------------------------------------------------------------------------------|---------|
| `-e, --exclude-reset-position` | Exclude the reset position, start consume messages from the next position.           | false   |
| `--time, -t`                   | time in minutes to reset back to (or minutes, hours,days,weeks eg: 100m, 3h, 2d, 5w) | null    |
| `-s, --subscription`           | Subscription to reset position on                                                    | null    |
| `--messageId, -m`              | messageId to reset back to (ledgerId:entryId)                                        | null    |

## <em>terminate

Terminate a topic and don't allow any more messages to be published

### Usage

------------

```shell
$ pulsar-admin topics terminate options
```

## <em>compact

Compact a topic

### Usage

------------

```shell
$ pulsar-admin topics compact options
```

## <em>compaction-status

Status of compaction on a topic

### Usage

------------

```shell
$ pulsar-admin topics compaction-status options
```

Options

| Flag                  | Description                     | Default |
|-----------------------|---------------------------------|---------|
| `-w, --wait-complete` | Wait for compaction to complete | false   |

## <em>offload

Trigger offload of data from a topic to long-term storage (e.g. Amazon S3)

### Usage

------------

```shell
$ pulsar-admin topics offload options
```

Options

| Flag                   | Description                                                                          | Default |
|------------------------|--------------------------------------------------------------------------------------|---------|
| `-s, --size-threshold` | Maximum amount of data to keep in BookKeeper for the specified topic (e.g. 10M, 5G). | null    |

## <em>offload-status

Check the status of data offloading from a topic to long-term storage

### Usage

------------

```shell
$ pulsar-admin topics offload-status options
```

Options

| Flag                  | Description                     | Default |
|-----------------------|---------------------------------|---------|
| `-w, --wait-complete` | Wait for offloading to complete | false   |

## <em>last-message-id

get the last commit message id of topic

### Usage

------------

```shell
$ pulsar-admin topics last-message-id options
```

## <em>get-backlog-quotas

Get the backlog quota policies for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-backlog-quotas options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-backlog-quota

Set a backlog quota policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-backlog-quota options
```

Options

| Flag               | Description                                                                                                                                      | Default             |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `-l, --limit`      | Size limit (eg: 10M, 16G)                                                                                                                        | -1                  |
| `-p, --policy`     | Retention policy to enforce when the limit is reached. Valid options are: [producer_request_hold, producer_exception, consumer_backlog_eviction] | null                |
| `-lt, --limitTime` | Time limit in second, non-positive number for disabling time limit.                                                                              | -1                  |
| `-t, --type`       | Backlog quota type to set                                                                                                                        | destination_storage |

## <em>remove-backlog-quota

Remove a backlog quota policy from a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-backlog-quota options
```

Options

| Flag         | Description                  | Default             |
|--------------|------------------------------|---------------------|
| `-t, --type` | Backlog quota type to remove | destination_storage |

## <em>get-message-ttl

Get the message TTL for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-message-ttl options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-message-ttl

Set message TTL for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-message-ttl options
```

Options

| Flag        | Description                                                                | Default |
|-------------|----------------------------------------------------------------------------|---------|
| `-t, --ttl` | Message TTL for topic in second, allowed range from 1 to Integer.MAX_VALUE | 0       |

## <em>remove-message-ttl

Remove message TTL for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-message-ttl options
```

## <em>get-retention

Get the retention policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-retention options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-retention

Set the retention policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-retention options
```

Options

| Flag         | Description                                                                                                                              | Default |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--size, -s` | Retention size limit (eg: 10M, 16G, 3T). 0 or less than 1MB means no retention and -1 means infinite size retention                      | null    |
| `--time, -t` | Retention time in minutes (or minutes, hours,days,weeks eg: 100m, 3h, 2d, 5w). 0 means no retention and -1 means infinite time retention | null    |

## <em>remove-retention

Remove the retention policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-retention options
```

## <em>enable-deduplication

Enable the deduplication policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics enable-deduplication options
```

## <em>disable-deduplication

Disable the deduplication policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics disable-deduplication options
```

## <em>get-deduplication-enabled

Get the deduplication policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-deduplication-enabled options
```

## <em>set-deduplication

Enable or disable deduplication for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-deduplication options
```

Options

| Flag            | Description           | Default |
|-----------------|-----------------------|---------|
| `--disable, -d` | Disable deduplication | false   |
| `--enable, -e`  | Enable deduplication  | false   |

## <em>get-deduplication

Get the deduplication policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-deduplication options
```

## <em>remove-deduplication

Remove the deduplication policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-deduplication options
```

## <em>get-deduplication-snapshot-interval

Get deduplication snapshot interval for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-deduplication-snapshot-interval options
```

## <em>set-deduplication-snapshot-interval

Set deduplication snapshot interval for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-deduplication-snapshot-interval options
```

Options

| Flag             | Description                                                                                    | Default |
|------------------|------------------------------------------------------------------------------------------------|---------|
| `-i, --interval` | Deduplication snapshot interval for topic in second, allowed range from 0 to Integer.MAX_VALUE | 0       |

## <em>remove-deduplication-snapshot-interval

Remove deduplication snapshot interval for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-deduplication-snapshot-interval options
```

## <em>get-delayed-delivery

Get the delayed delivery policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-delayed-delivery options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-delayed-delivery

Set the delayed delivery policy on a topic

### Usage

------------

```shell
$ pulsar-admin topics set-delayed-delivery options
```

Options

| Flag            | Description                                                                                                                                                         | Default |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--disable, -d` | Disable delayed delivery messages                                                                                                                                   | false   |
| `--enable, -e`  | Enable delayed delivery messages                                                                                                                                    | false   |
| `--time, -t`    | The tick time for when retrying on delayed delivery messages, affecting the accuracy of the delivery time compared to the scheduled time. (eg: 1s, 10s, 1m, 5h, 3d) | 1s      |

## <em>remove-delayed-delivery

Remove the delayed delivery policy on a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-delayed-delivery options
```

## <em>get-persistence

Get the persistence policies for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-persistence options
```

## <em>set-persistence

Set the persistence policies for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-persistence options
```

Options

| Flag                            | Description                                                    | Default |
|---------------------------------|----------------------------------------------------------------|---------|
| `-e, --bookkeeper-ensemble`     | Number of bookies to use for a topic                           | 0       |
| `-a, --bookkeeper-ack-quorum`   | Number of acks (guaranteed copies) to wait for each entry      | 0       |
| `-r, --ml-mark-delete-max-rate` | Throttling rate of mark-delete operation (0 means no throttle) | 0.0     |
| `-w, --bookkeeper-write-quorum` | How many writes to make of each entry                          | 0       |

## <em>remove-persistence

Remove the persistence policy for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-persistence options
```

## <em>get-offload-policies

Get the offload policies for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-offload-policies options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-offload-policies

Set the offload policies for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-offload-policies options
```

Options

| Flag                                | Description                                                                                                                                                                                                                                                                                                                                                                                                      | Default |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `-b, --bucket`                      | ManagedLedger offload bucket, s3 and google-cloud-storage requires this parameter                                                                                                                                                                                                                                                                                                                                | null    |
| `-r, --region`                      | ManagedLedger offload region, s3 and google-cloud-storage requires this parameter                                                                                                                                                                                                                                                                                                                                | null    |
| `--s3-role-session-name, -rsn`      | S3 role session name used for STSAssumeRoleSessionCredentialsProvider                                                                                                                                                                                                                                                                                                                                            | null    |
| `--offloadedReadPriority, -orp`     | Read priority for offloaded messages. By default, once messages are offloaded to long-term storage, brokers read messages from long-term storage, but messages can still exist in BookKeeper for a period depends on your configuration. For messages that exist in both long-term storage and BookKeeper, you can set where to read messages from with the option `tiered-storage-first` or `bookkeeper-first`. | null    |
| `-e, --endpoint`                    | ManagedLedger offload service endpoint, only s3 requires this parameter                                                                                                                                                                                                                                                                                                                                          | null    |
| `-dl, --offloadDeletionLagInMillis` | ManagedLedger offload deletion lag in bytes                                                                                                                                                                                                                                                                                                                                                                      | null    |
| `-rb, --readBufferSizeInBytes`      | ManagedLedger offload read buffer size in bytes,s3 and google-cloud-storage requires this parameter                                                                                                                                                                                                                                                                                                              | 0       |
| `-i, --aws-id`                      | AWS Credential Id to use when using driver S3 or aws-s3                                                                                                                                                                                                                                                                                                                                                          | null    |
| `-d, --driver`                      | ManagedLedger offload driver                                                                                                                                                                                                                                                                                                                                                                                     | null    |
| `--ro, --s3-role`                   | S3 Role used for STSAssumeRoleSessionCredentialsProvider                                                                                                                                                                                                                                                                                                                                                         | null    |
| `-m, --maxBlockSizeInBytes`         | ManagedLedger offload max block Size in bytes,s3 and google-cloud-storage requires this parameter                                                                                                                                                                                                                                                                                                                | 0       |
| `-t, --offloadThresholdInBytes`     | ManagedLedger offload threshold in bytes                                                                                                                                                                                                                                                                                                                                                                         | 0       |
| `-s, --aws-secret`                  | AWS Credential Secret to use when using driver S3 or aws-s3                                                                                                                                                                                                                                                                                                                                                      | null    |

## <em>remove-offload-policies

Remove the offload policies for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-offload-policies options
```

## <em>get-dispatch-rate

Get message dispatch rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-dispatch-rate options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-dispatch-rate

Set message dispatch rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-dispatch-rate options
```

Options

| Flag                              | Description                                                                                                                                            | Default |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--byte-dispatch-rate, -bd`       | byte-dispatch-rate (default -1 will be overwrite if not passed)                                                                                        | -1      |
| `--msg-dispatch-rate, -md`        | message-dispatch-rate (default -1 will be overwrite if not passed)                                                                                     | -1      |
| `--dispatch-rate-period, -dt`     | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)                                                                 | 1       |
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate)) | false   |

## <em>remove-dispatch-rate

Remove message dispatch rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-dispatch-rate options
```

## <em>get-subscription-dispatch-rate

Get subscription message-dispatch-rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-subscription-dispatch-rate options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-subscription-dispatch-rate

Set subscription message-dispatch-rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-subscription-dispatch-rate options
```

Options

| Flag                              | Description                                                                                                                                            | Default |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate)) | false   |
| `--dispatch-rate-period, -dt`     | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)                                                                 | 1       |
| `--byte-dispatch-rate, -bd`       | byte-dispatch-rate (default -1 will be overwrite if not passed)                                                                                        | -1      |
| `--msg-dispatch-rate, -md`        | message-dispatch-rate (default -1 will be overwrite if not passed)                                                                                     | -1      |

## <em>remove-subscription-dispatch-rate

Remove subscription message-dispatch-rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-subscription-dispatch-rate options
```

## <em>get-replicator-dispatch-rate

Get replicator message-dispatch-rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-replicator-dispatch-rate options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-replicator-dispatch-rate

Set replicator message-dispatch-rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-replicator-dispatch-rate options
```

Options

| Flag                              | Description                                                                                                                                            | Default |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--byte-dispatch-rate, -bd`       | byte-dispatch-rate (default -1 will be overwrite if not passed)                                                                                        | -1      |
| `--dispatch-rate-period, -dt`     | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)                                                                 | 1       |
| `--msg-dispatch-rate, -md`        | message-dispatch-rate (default -1 will be overwrite if not passed)                                                                                     | -1      |
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate)) | false   |

## <em>remove-replicator-dispatch-rate

Remove replicator message-dispatch-rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-replicator-dispatch-rate options
```

## <em>get-compaction-threshold

Get compaction threshold for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-compaction-threshold options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-compaction-threshold

Set compaction threshold for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-compaction-threshold options
```

Options

| Flag              | Description                                                                                                                   | Default |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------|---------|
| `--threshold, -t` | Maximum number of bytes in a topic backlog before compaction is triggered (eg: 10M, 16G, 3T). 0 disables automatic compaction | 0       |

## <em>remove-compaction-threshold

Remove compaction threshold for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-compaction-threshold options
```

## <em>get-max-unacked-messages-on-consumer

Get max unacked messages policy on consumer for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-unacked-messages-on-consumer options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-max-unacked-messages-on-consumer

Set max unacked messages policy on consumer for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-unacked-messages-on-consumer options
```

Options

| Flag           | Description                          | Default |
|----------------|--------------------------------------|---------|
| `-m, --maxNum` | max unacked messages num on consumer | 0       |

## <em>remove-max-unacked-messages-on-consumer

Remove max unacked messages policy on consumer for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-unacked-messages-on-consumer options
```

## <em>get-max-unacked-messages-on-subscription

Get max unacked messages policy on subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-unacked-messages-on-subscription options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-max-unacked-messages-on-subscription

Set max unacked messages policy on subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-unacked-messages-on-subscription options
```

Options

| Flag           | Description                              | Default |
|----------------|------------------------------------------|---------|
| `-m, --maxNum` | max unacked messages num on subscription | 0       |

## <em>remove-max-unacked-messages-on-subscription

Remove max unacked messages policy on subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-unacked-messages-on-subscription options
```

## <em>get-max-unacked-messages-per-consumer

Get max unacked messages policy on consumer for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-unacked-messages-per-consumer options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-max-unacked-messages-per-consumer

Set max unacked messages policy on consumer for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-unacked-messages-per-consumer options
```

Options

| Flag           | Description                          | Default |
|----------------|--------------------------------------|---------|
| `-m, --maxNum` | max unacked messages num on consumer | 0       |

## <em>remove-max-unacked-messages-per-consumer

Remove max unacked messages policy on consumer for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-unacked-messages-per-consumer options
```

## <em>get-max-unacked-messages-per-subscription

Get max unacked messages policy on subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-unacked-messages-per-subscription options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-max-unacked-messages-per-subscription

Set max unacked messages policy on subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-unacked-messages-per-subscription options
```

Options

| Flag           | Description                              | Default |
|----------------|------------------------------------------|---------|
| `-m, --maxNum` | max unacked messages num on subscription | 0       |

## <em>remove-max-unacked-messages-per-subscription

Remove max unacked messages policy on subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-unacked-messages-per-subscription options
```

## <em>get-publish-rate

Get publish rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-publish-rate options
```

## <em>set-publish-rate

Set publish rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-publish-rate options
```

Options

| Flag                      | Description                                                       | Default |
|---------------------------|-------------------------------------------------------------------|---------|
| `--byte-publish-rate, -b` | byte-publish-rate (default -1 will be overwrite if not passed)    | -1      |
| `--msg-publish-rate, -m`  | message-publish-rate (default -1 will be overwrite if not passed) | -1      |

## <em>remove-publish-rate

Remove publish rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-publish-rate options
```

## <em>set-subscription-types-enabled

Set subscription types enabled for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-subscription-types-enabled options
```

Options

| Flag          | Description                                              | Default |
|---------------|----------------------------------------------------------|---------|
| `--types, -t` | Subscription types enabled list (comma separated values) | null    |

## <em>get-subscription-types-enabled

Get subscription types enabled for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-subscription-types-enabled options
```

## <em>get-maxProducers

Get max number of producers for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-maxProducers options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-maxProducers

Set max number of producers for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-maxProducers options
```

Options

| Flag                  | Description               | Default |
|-----------------------|---------------------------|---------|
| `--max-producers, -p` | Max producers for a topic | 0       |

## <em>remove-maxProducers

Remove max number of producers for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-maxProducers options
```

## <em>get-max-producers

Get max number of producers for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-producers options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-max-producers

Set max number of producers for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-producers options
```

Options

| Flag                  | Description               | Default |
|-----------------------|---------------------------|---------|
| `--max-producers, -p` | Max producers for a topic | 0       |

## <em>remove-max-producers

Remove max number of producers for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-producers options
```

## <em>get-max-subscriptions

Get max number of subscriptions for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-subscriptions options
```

## <em>set-max-subscriptions

Set max number of subscriptions for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-subscriptions options
```

Options

| Flag                                | Description                            | Default |
|-------------------------------------|----------------------------------------|---------|
| `--max-subscriptions-per-topic, -m` | Maximum subscription limit for a topic | 0       |

## <em>remove-max-subscriptions

Remove max number of subscriptions for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-subscriptions options
```

## <em>get-max-message-size

Get max message size for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-message-size options
```

## <em>set-max-message-size

Set max message size for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-message-size options
```

Options

| Flag                     | Description                  | Default |
|--------------------------|------------------------------|---------|
| `--max-message-size, -m` | Max message size for a topic | 0       |

## <em>remove-max-message-size

Remove max message size for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-message-size options
```

## <em>get-max-consumers-per-subscription

Get max consumers per subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-consumers-per-subscription options
```

## <em>set-max-consumers-per-subscription

Set max consumers per subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-consumers-per-subscription options
```

Options

| Flag                                   | Description                                 | Default |
|----------------------------------------|---------------------------------------------|---------|
| `--max-consumers-per-subscription, -c` | maxConsumersPerSubscription for a namespace | 0       |

## <em>remove-max-consumers-per-subscription

Remove max consumers per subscription for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-consumers-per-subscription options
```

## <em>get-inactive-topic-policies

Get the inactive topic policies on a topic

### Usage

------------

```shell
$ pulsar-admin topics get-inactive-topic-policies options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-inactive-topic-policies

Set the inactive topic policies on a topic

### Usage

------------

```shell
$ pulsar-admin topics set-inactive-topic-policies options
```

Options

| Flag                                  | Description                                                                                                                               | Default |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `--delete-mode, -m`                   | Mode of delete inactive topic,Valid options are: [delete_when_no_subscriptions, delete_when_subscriptions_caught_up]                      | null    |
| `--enable-delete-while-inactive, -e`  | Enable delete while inactive                                                                                                              | false   |
| `--disable-delete-while-inactive, -d` | Disable delete while inactive                                                                                                             | false   |
| `--max-inactive-duration, -t`         | Max duration of topic inactivity in seconds,topics that are inactive for longer than this value will be deleted (eg: 1s, 10s, 1m, 5h, 3d) | null    |

## <em>remove-inactive-topic-policies

Remove inactive topic policies from a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-inactive-topic-policies options
```

## <em>get-max-consumers

Get max number of consumers for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-max-consumers options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-max-consumers

Set max number of consumers for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-max-consumers options
```

Options

| Flag                  | Description               | Default |
|-----------------------|---------------------------|---------|
| `--max-consumers, -c` | Max consumers for a topic | 0       |

## <em>remove-max-consumers

Remove max number of consumers for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-max-consumers options
```

## <em>get-subscribe-rate

Get consumer subscribe rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics get-subscribe-rate options
```

Options

| Flag             | Description                         | Default |
|------------------|-------------------------------------|---------|
| `-ap, --applied` | Get the applied policy of the topic | false   |

## <em>set-subscribe-rate

Set consumer subscribe rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics set-subscribe-rate options
```

Options

| Flag                           | Description                                                                              | Default |
|--------------------------------|------------------------------------------------------------------------------------------|---------|
| `--subscribe-rate-period, -st` | subscribe-rate-period in second type (default 30 second will be overwrite if not passed) | 30      |
| `--subscribe-rate, -sr`        | subscribe-rate (default -1 will be overwrite if not passed)                              | -1      |

## <em>remove-subscribe-rate

Remove consumer subscribe rate for a topic

### Usage

------------

```shell
$ pulsar-admin topics remove-subscribe-rate options
```

## <em>set-replicated-subscription-status

Enable or disable a replicated subscription on a topic

### Usage

------------

```shell
$ pulsar-admin topics set-replicated-subscription-status options
```

Options

| Flag                 | Description                                        | Default |
|----------------------|----------------------------------------------------|---------|
| `--disable, -d`      | Disable replication                                | false   |
| `-s, --subscription` | Subscription name to enable or disable replication | null    |
| `--enable, -e`       | Enable replication                                 | false   |

## <em>get-backlog-size

Calculate backlog size by a message ID (in bytes).

### Usage

------------

```shell
$ pulsar-admin topics get-backlog-size options
```

Options

| Flag              | Description                                                             | Default |
|-------------------|-------------------------------------------------------------------------|---------|
| `--messageId, -m` | messageId used to calculate backlog size. It can be (ledgerId:entryId). | -1:-1   |

