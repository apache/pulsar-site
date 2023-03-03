# topicPolicies

Operations on persistent topics


```shell
$ pulsar-admin topicPolicies subcommand
```



## <em>get-message-ttl</em>

Get the message TTL for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-message-ttl</em>

Set message TTL for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --ttl` | Message TTL for topic in seconds (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w), allowed range from 1 to Integer.MAX_VALUE|null||
| `--global, -g` | Whether to set this policy globally. If set to true, broker returned global topic policies|false||


## <em>remove-message-ttl</em>

Remove message TTL for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false||


## <em>get-max-unacked-messages-per-consumer</em>

Get max unacked messages policy per consumer for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-max-unacked-messages-per-consumer</em>

Set max unacked messages policy per consumer for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, broker returned global topic policies|false||
| `-m, --maxNum` | max unacked messages num on consumer|0||


## <em>remove-max-unacked-messages-per-consumer</em>

Remove max unacked messages policy per consumer for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false||


## <em>get-max-consumers-per-subscription</em>

Get max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-max-consumers-per-subscription</em>

Set max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-consumers-per-subscription, -c` | maxConsumersPerSubscription for a namespace|0||
| `--global, -g` | Whether to set this policy globally. If set to true, broker returned global topic policies|false||


## <em>remove-max-consumers-per-subscription</em>

Remove max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-subscription-types-enabled</em>

Set subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||
| `--types, -t` | Subscription types enabled list (comma separated values). Possible values: (Exclusive, Shared, Failover, Key_Shared).|null||


## <em>get-subscription-types-enabled</em>

Get subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>remove-subscription-types-enabled</em>

Remove subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-retention</em>

Get the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, the broker returns global topic policiesIf set to false or not set, the broker returns local topic policies|false||
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-retention</em>

Set the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--size, -s` | Retention size limit with optional size unit suffix. For example, 4096, 10M, 16G, 3T.  The size unit suffix character can be k/K, m/M, g/G, or t/T.  If the size unit suffix is not specified, the default unit is bytes. 0 or less than 1MB means no retention and -1 means infinite size retention|null||
| `--time, -t` | Retention time with optional time unit suffix. For example, 100m, 3h, 2d, 5w. If the time unit is not specified, the default unit is seconds. For example, -t 120 sets retention to 2 minutes. 0 means no retention and -1 means infinite time retention.|null||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy is replicated to other clusters asynchronously, If set to false or not set, the topic retention policy is replicated to local clusters.|false||


## <em>remove-retention</em>

Remove the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation is replicated to other clusters asynchronouslyIf set to false or not set, the topic retention policy is replicated to local clusters.|false||


## <em>get-backlog-quota</em>

Get the backlog quota policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-backlog-quota</em>

Set a backlog quota policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --type` | Backlog quota type to set. Valid options are: destination_storage (default) and message_age. destination_storage limits backlog by size. message_age limits backlog by time, that is, message timestamp (broker or publish timestamp). You can set size or time to control the backlog, or combine them together to control the backlog. |destination_storage||
| `-p, --policy` | Retention policy to enforce when the limit is reached. Valid options are: [producer_request_hold, producer_exception, consumer_backlog_eviction]|null||
| `-lt, --limitTime` | Time limit in second (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w), non-positive number for disabling time limit.|null||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `-l, --limit` | Size limit (eg: 10M, 16G)|null||


## <em>remove-backlog-quota</em>

Remove a backlog quota policy from a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||
| `-t, --type` | Backlog quota type to remove|destination_storage||


## <em>get-max-producers</em>

Get max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-max-producers</em>

Set max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `--max-producers, -p` | Max producers for a topic|0||


## <em>remove-max-producers</em>

Remove max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-max-message-size</em>

Get max message size for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returns global topic policies|false||


## <em>set-max-message-size</em>

Set max message size for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally.|false||
| `--max-message-size, -m` | Max message size for a topic|0||


## <em>remove-max-message-size</em>

Remove max message size for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. |false||


## <em>set-deduplication</em>

Enable or disable status for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||
| `--disable, -d` | Disable deduplication|false||
| `--enable, -e` | Enable deduplication|false||


## <em>get-deduplication</em>

Get the deduplication status for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. |false||


## <em>remove-deduplication</em>

Remove the deduplication status for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-deduplication-snapshot-interval</em>

Get deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returns global topic policies|false||


## <em>set-deduplication-snapshot-interval</em>

Set deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-i, --interval` | Deduplication snapshot interval for topic in second, allowed range from 0 to Integer.MAX_VALUE|0||
| `--global, -g` | Whether to set this policy globally.|false||


## <em>remove-deduplication-snapshot-interval</em>

Remove deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. |false||


## <em>get-persistence</em>

Get the persistence policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-persistence</em>

Set the persistence policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-r, --ml-mark-delete-max-rate` | Throttling rate of mark-delete operation (0 means no throttle)|0.0||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `-w, --bookkeeper-write-quorum` | How many writes to make of each entry|2||
| `-a, --bookkeeper-ack-quorum` | Number of acks (guaranteed copies) to wait for each entry|2||
| `-e, --bookkeeper-ensemble` | Number of bookies to use for a topic|2||


## <em>remove-persistence</em>

Remove the persistence policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-subscription-dispatch-rate</em>

Get subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--subscription, -s` | Get message-dispatch-rate of a specific subscription|null||
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-subscription-dispatch-rate</em>

Set subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--subscription, -s` | Set message-dispatch-rate for a specific subscription|null||
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false||


## <em>remove-subscription-dispatch-rate</em>

Remove subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `--subscription, -s` | Remove message-dispatch-rate for a specific subscription|null||


## <em>get-replicator-dispatch-rate</em>

Get replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-replicator-dispatch-rate</em>

Set replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false||


## <em>remove-replicator-dispatch-rate</em>

Remove replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>get-publish-rate</em>

Get publish rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returns global topic policies|false||


## <em>set-publish-rate</em>

Set publish rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--msg-publish-rate, -m` | message-publish-rate (default -1 will be overwrite if not passed)|-1||
| `--global, -g` | Whether to set this policy globally.|false||
| `--byte-publish-rate, -b` | byte-publish-rate (default -1 will be overwrite if not passed)|-1||


## <em>remove-publish-rate</em>

Remove publish rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. |false||


## <em>get-compaction-threshold</em>

Get compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-compaction-threshold</em>

Set compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--threshold, -t` | Maximum number of bytes in a topic backlog before compaction is triggered (eg: 10M, 16G, 3T). 0 disables automatic compaction|0||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>remove-compaction-threshold</em>

Remove compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-subscribe-rate</em>

Get consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returns global topic policies|false||


## <em>set-subscribe-rate</em>

Set consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--subscribe-rate, -sr` | subscribe-rate (default -1 will be overwrite if not passed)|-1||
| `--global, -g` | Whether to set this policy globally.|false||
| `--subscribe-rate-period, -st` | subscribe-rate-period in second type (default 30 second will be overwrite if not passed)|30||


## <em>remove-subscribe-rate</em>

Remove consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. |false||


## <em>get-max-consumers</em>

Get max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>set-max-consumers</em>

Set max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-consumers, -c` | Max consumers for a topic|0||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>remove-max-consumers</em>

Remove max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>get-delayed-delivery</em>

Get the delayed delivery policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-delayed-delivery</em>

Set the delayed delivery policy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable delayed delivery messages|false||
| `--disable, -d` | Disable delayed delivery messages|false||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `--time, -t` | The tick time for when retrying on delayed delivery messages, affecting the accuracy of the delivery time compared to the scheduled time. (eg: 1s, 10s, 1m, 5h, 3d)|1s||


## <em>remove-delayed-delivery</em>

Remove the delayed delivery policy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>get-dispatch-rate</em>

Get message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-dispatch-rate</em>

Set message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false||
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>remove-dispatch-rate</em>

Remove message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-offload-policies</em>

Get the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-offload-policies</em>

Set the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --offloadThresholdInBytes` | ManagedLedger offload threshold in bytes|0||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `-m, --maxBlockSizeInBytes` | ManagedLedger offload max block Size in bytes,s3 and google-cloud-storage requires this parameter|0||
| `-b, --bucket` | ManagedLedger offload bucket, s3 and google-cloud-storage requires this parameter|null||
| `-dl, --offloadDeletionLagInMillis` | ManagedLedger offload deletion lag in bytes|null||
| `-r, --region` | ManagedLedger offload region, s3 and google-cloud-storage requires this parameter|null||
| `-i, --aws-id` | AWS Credential Id to use when using driver S3 or aws-s3|null||
| `--ro, --s3-role` | S3 Role used for STSAssumeRoleSessionCredentialsProvider|null||
| `--s3-role-session-name, -rsn` | S3 role session name used for STSAssumeRoleSessionCredentialsProvider|null||
| `-ts, --offloadThresholdInSeconds` | ManagedLedger offload threshold in seconds|null||
| `--offloadedReadPriority, -orp` | Read priority for offloaded messages. By default, once messages are offloaded to long-term storage, brokers read messages from long-term storage, but messages can still exist in BookKeeper for a period depends on your configuration. For messages that exist in both long-term storage and BookKeeper, you can set where to read messages from with the option `tiered-storage-first` or `bookkeeper-first`.|null||
| `-d, --driver` | ManagedLedger offload driver|null||
| `-e, --endpoint` | ManagedLedger offload service endpoint, only s3 requires this parameter|null||
| `-s, --aws-secret` | AWS Credential Secret to use when using driver S3 or aws-s3|null||
| `-rb, --readBufferSizeInBytes` | ManagedLedger offload read buffer size in bytes,s3 and google-cloud-storage requires this parameter|0||


## <em>remove-offload-policies</em>

Remove the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-max-unacked-messages-per-subscription</em>

Get max unacked messages policy per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-max-unacked-messages-per-subscription</em>

Set max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||
| `-m, --maxNum` | max unacked messages num on subscription|0||


## <em>remove-max-unacked-messages-per-subscription</em>

Remove max unacked messages policy per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-inactive-topic-policies</em>

Get the inactive topic policies on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-inactive-topic-policies</em>

Set the inactive topic policies on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--enable-delete-while-inactive, -e` | Enable delete while inactive|false||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||
| `--max-inactive-duration, -t` | Max duration of topic inactivity in seconds, topics that are inactive for longer than this value will be deleted (eg: 1s, 10s, 1m, 5h, 3d)|null||
| `--delete-mode, -m` | Mode of delete inactive topic, Valid options are: [delete_when_no_subscriptions, delete_when_subscriptions_caught_up]|null||
| `--disable-delete-while-inactive, -d` | Disable delete while inactive|false||


## <em>remove-inactive-topic-policies</em>

Remove inactive topic policies from a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false||


## <em>get-max-subscriptions-per-topic</em>

Get max subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-max-subscriptions-per-topic</em>

Set max subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-subscriptions-per-topic, -s` | max subscriptions for a topic (default -1 will be overwrite if not passed)|0||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>remove-max-subscriptions-per-topic</em>

Remove max subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>remove-schema-compatibility-strategy</em>

Remove schema compatibility strategy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-schema-compatibility-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## <em>set-schema-compatibility-strategy</em>

Set schema compatibility strategy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-schema-compatibility-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--strategy, -s` | Schema compatibility strategy: [UNDEFINED, ALWAYS_INCOMPATIBLE, ALWAYS_COMPATIBLE, BACKWARD, FORWARD, FULL, BACKWARD_TRANSITIVE, FORWARD_TRANSITIVE, FULL_TRANSITIVE]|null||


## <em>get-schema-compatibility-strategy</em>

Get schema compatibility strategy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-schema-compatibility-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>get-entry-filters-per-topic</em>

Get entry filters for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-entry-filters-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||
| `-ap, --applied` | Get the applied policy of the topic|false||


## <em>set-entry-filters-per-topic</em>

Set entry filters for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-entry-filters-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to set this policy globally. If set to true, broker returned global topic policies|false||
| `--entry-filters-name, -efn` | The class name for the entry filter.|||


## <em>remove-entry-filters-per-topic</em>

Remove entry filters for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-entry-filters-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false||


## <em>set-auto-subscription-creation</em>

Enable autoSubscriptionCreation for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable allowAutoSubscriptionCreation on topic|false||
| `--global, -g` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||


## <em>get-auto-subscription-creation</em>

Get the autoSubscriptionCreation for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--applied, -a` | Get the applied policy of the topic|false||
| `--global, -g` | Whether to get this policy globally. If set to true, broker returned global topic policies|false||


## <em>remove-auto-subscription-creation</em>

Remove override of autoSubscriptionCreation for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--global, -g` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false||

