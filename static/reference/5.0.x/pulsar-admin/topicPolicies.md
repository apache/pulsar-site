# topicPolicies

Operations on persistent topics


```shell
$ pulsar-admin topicPolicies subcommand
```



## delete

Remove the all policies for a topic, it will not remove policies from the remotecluster

**Command:**

```shell
$ pulsar-admin topicPolicies delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-message-ttl

Get the message TTL for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-message-ttl

Set message TTL for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-t, --ttl]` | Message TTL for topic in seconds (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w), allowed range from 1 to Integer.MAX_VALUE|null|
| `[--global, -g]` | Whether to set this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-message-ttl

Remove message TTL for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-subscription-expiration-time

Get subscription expiration time in minutes for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-subscription-expiration-time options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-subscription-expiration-time

Set subscription expiration time in minutes for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-subscription-expiration-time options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-t, --time]` | Subscription expiration time in minutes|0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-subscription-expiration-time

Remove subscription expiration time for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-subscription-expiration-time options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-max-unacked-messages-per-consumer

Get max unacked messages policy per consumer for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-max-unacked-messages-per-consumer

Set max unacked messages policy per consumer for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-m, --maxNum]` | max unacked messages num on consumer|0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-max-unacked-messages-per-consumer

Remove max unacked messages policy per consumer for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-max-consumers-per-subscription

Get max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-max-consumers-per-subscription

Set max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--max-consumers-per-subscription, -c]` | maxConsumersPerSubscription for a namespace|0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-max-consumers-per-subscription

Remove max consumers per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-subscription-types-enabled

Set subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--types, -t]` | Subscription types enabled list (comma separated values). Possible values: (Exclusive, Shared, Failover, Key_Shared).|null|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-subscription-types-enabled

Get subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-subscription-types-enabled

Remove subscription types enabled for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-retention

Get the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, the broker returns global topic policiesIf set to false or not set, the broker returns local topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-retention

Set the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--time, -t]` | Retention time with optional time unit suffix. For example, 100m, 3h, 2d, 5w. If the time unit is not specified, the default unit is seconds. For example, -t 120 sets retention to 2 minutes. 0 means no retention and -1 means infinite time retention.|null|
| `[--size, -s]` | Retention size limit with optional size unit suffix. For example, 4096, 10M, 16G, 3T.  The size unit suffix character can be k/K, m/M, g/G, or t/T.  If the size unit suffix is not specified, the default unit is bytes. 0 or less than 1MB means no retention and -1 means infinite size retention|null|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy is replicated to other clusters asynchronously, If set to false or not set, the topic retention policy is replicated to local clusters.|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-retention

Remove the retention policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation is replicated to other clusters asynchronouslyIf set to false or not set, the topic retention policy is replicated to local clusters.|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-backlog-quota

Get the backlog quota policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-backlog-quota

Set a backlog quota policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-l, --limit]` | Size limit (eg: 10M, 16G)|null|
| `[-lt, --limitTime]` | Time limit in second (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w), non-positive number for disabling time limit.|null|
| `[-p, --policy]` | Retention policy to enforce when the limit is reached. Valid options are: [producer_request_hold, producer_exception, consumer_backlog_eviction]|null|
| `[-t, --type]` | Backlog quota type to set. Valid options are: destination_storage (default) and message_age. destination_storage limits backlog by size. message_age limits backlog by time, that is, message timestamp (broker or publish timestamp). You can set size or time to control the backlog, or combine them together to control the backlog. |destination_storage|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-backlog-quota

Remove a backlog quota policy from a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-t, --type]` | Backlog quota type to remove|destination_storage|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-max-producers

Get max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-max-producers

Set max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--max-producers, -p]` | Max producers for a topic|0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-max-producers

Remove max number of producers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-producers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-max-message-size

Get max message size for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returns global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-max-message-size

Set max message size for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--max-message-size, -m]` | Max message size for a topic|0|
| `[--global, -g]` | Whether to set this policy globally.|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-max-message-size

Remove max message size for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-message-size options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. |false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-deduplication

Enable or disable status for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--enable, -e]` | Enable deduplication|false|
| `[--disable, -d]` | Disable deduplication|false|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-deduplication

Get the deduplication status for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. |false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-deduplication

Remove the deduplication status for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-deduplication-snapshot-interval

Get deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returns global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-deduplication-snapshot-interval

Set deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-i, --interval]` | Deduplication snapshot interval for topic in second, allowed range from 0 to Integer.MAX_VALUE|0|
| `[--global, -g]` | Whether to set this policy globally.|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-deduplication-snapshot-interval

Remove deduplication snapshot interval for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. |false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-persistence

Get the persistence policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-persistence

Set the persistence policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-e, --bookkeeper-ensemble]` | Number of bookies to use for a topic|2|
| `[-w, --bookkeeper-write-quorum]` | How many writes to make of each entry|2|
| `[-a, --bookkeeper-ack-quorum]` | Number of acks (guaranteed copies) to wait for each entry|2|
| `[-r, --ml-mark-delete-max-rate]` | Throttling rate of mark-delete operation (0 means no throttle, -1 means unset which will use the configuration from namespace or broker)|-1.0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-c, --ml-storage-class]` | Managed ledger storage class name|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-persistence

Remove the persistence policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-subscription-dispatch-rate

Get subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[--subscription, -s]` | Get message-dispatch-rate of a specific subscription|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-subscription-dispatch-rate

Set subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--msg-dispatch-rate, -md]` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `[--byte-dispatch-rate, -bd]` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `[--dispatch-rate-period, -dt]` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1|
| `[--relative-to-publish-rate, -rp]` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[--subscription, -s]` | Set message-dispatch-rate for a specific subscription|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-subscription-dispatch-rate

Remove subscription message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[--subscription, -s]` | Remove message-dispatch-rate for a specific subscription|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-replicator-dispatch-rate

Get replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-replicator-dispatch-rate

Set replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--msg-dispatch-rate, -md]` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `[--byte-dispatch-rate, -bd]` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `[--dispatch-rate-period, -dt]` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1|
| `[--relative-to-publish-rate, -rp]` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-replicator-dispatch-rate

Remove replicator message-dispatch-rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-publish-rate

Get publish rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returns global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-publish-rate

Set publish rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--msg-publish-rate, -m]` | message-publish-rate (default -1 will be overwrite if not passed)|-1|
| `[--byte-publish-rate, -b]` | byte-publish-rate (default -1 will be overwrite if not passed)|-1|
| `[--global, -g]` | Whether to set this policy globally.|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-publish-rate

Remove publish rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. |false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-compaction-threshold

Get compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-compaction-threshold

Set compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--threshold, -t]` | Maximum number of bytes in a topic backlog before compaction is triggered (eg: 10M, 16G, 3T). 0 disables automatic compaction|0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-compaction-threshold

Remove compaction threshold for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-subscribe-rate

Get consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returns global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-subscribe-rate

Set consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--subscribe-rate, -sr]` | subscribe-rate (default -1 will be overwrite if not passed)|-1|
| `[--subscribe-rate-period, -st]` | subscribe-rate-period in second type (default 30 second will be overwrite if not passed)|30|
| `[--global, -g]` | Whether to set this policy globally.|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-subscribe-rate

Remove consumer subscribe rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. |false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-max-consumers

Get max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-max-consumers

Set max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--max-consumers, -c]` | Max consumers for a topic|0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-max-consumers

Remove max number of consumers for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-consumers options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-delayed-delivery

Get the delayed delivery policy for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-delayed-delivery

Set the delayed delivery policy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--enable, -e]` | Enable delayed delivery messages|false|
| `[--disable, -d]` | Disable delayed delivery messages|false|
| `[--time, -t]` | The tick time for when retrying on delayed delivery messages, affecting the accuracy of the delivery time compared to the scheduled time. (eg: 1s, 10s, 1m, 5h, 3d)|1000|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[--maxDelay, -md]` | The max allowed delay for delayed delivery. (eg: 1s, 10s, 1m, 5h, 3d)|0|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-delayed-delivery

Remove the delayed delivery policy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-dispatch-rate

Get message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-dispatch-rate

Set message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--msg-dispatch-rate, -md]` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `[--byte-dispatch-rate, -bd]` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `[--dispatch-rate-period, -dt]` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1|
| `[--relative-to-publish-rate, -rp]` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-dispatch-rate

Remove message dispatch rate for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-offload-policies

Get the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-offload-policies

Set the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-d, --driver]` | ManagedLedger offload driver|null|
| `[-r, --region]` | ManagedLedger offload region, s3 and google-cloud-storage requires this parameter|null|
| `[-b, --bucket]` | ManagedLedger offload bucket, s3 and google-cloud-storage requires this parameter|null|
| `[-e, --endpoint]` | ManagedLedger offload service endpoint, only s3 requires this parameter|null|
| `[-i, --aws-id]` | AWS Credential Id to use when using driver S3 or aws-s3|null|
| `[-s, --aws-secret]` | AWS Credential Secret to use when using driver S3 or aws-s3|null|
| `[--ro, --s3-role]` | S3 Role used for STSAssumeRoleSessionCredentialsProvider|null|
| `[--s3-role-session-name, -rsn]` | S3 role session name used for STSAssumeRoleSessionCredentialsProvider|null|
| `[-m, --maxBlockSizeInBytes]` | ManagedLedger offload max block Size in bytes,s3 and google-cloud-storage requires this parameter|67108864|
| `[-rb, --readBufferSizeInBytes]` | ManagedLedger offload read buffer size in bytes,s3 and google-cloud-storage requires this parameter|1048576|
| `[-t, --offloadThresholdInBytes]` | ManagedLedger offload threshold in bytes|null|
| `[-ts, --offloadThresholdInSeconds]` | ManagedLedger offload threshold in seconds|null|
| `[-dl, --offloadDeletionLagInMillis]` | ManagedLedger offload deletion lag in bytes|null|
| `[--offloadedReadPriority, -orp]` | Read priority for offloaded messages. By default, once messages are offloaded to long-term storage, brokers read messages from long-term storage, but messages can still exist in BookKeeper for a period depends on your configuration. For messages that exist in both long-term storage and BookKeeper, you can set where to read messages from with the option `tiered-storage-first` or `bookkeeper-first`.|null|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-offload-policies

Remove the offload policies for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-max-unacked-messages-per-subscription

Get max unacked messages policy per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-max-unacked-messages-per-subscription

Set max unacked messages policy on subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-m, --maxNum]` | max unacked messages num on subscription|0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-max-unacked-messages-per-subscription

Remove max unacked messages policy per subscription for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-inactive-topic-policies

Get the inactive topic policies on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-inactive-topic-policies

Set the inactive topic policies on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--enable-delete-while-inactive, -e]` | Enable delete while inactive|false|
| `[--disable-delete-while-inactive, -d]` | Disable delete while inactive|false|
| `[--max-inactive-duration, -t]` | Max duration of topic inactivity in seconds, topics that are inactive for longer than this value will be deleted (eg: 1s, 10s, 1m, 5h, 3d)|null|
| `[--delete-mode, -m]` | Mode of delete inactive topic, Valid options are: [delete_when_no_subscriptions, delete_when_subscriptions_caught_up]|null|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-inactive-topic-policies

Remove inactive topic policies from a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the removing operation will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-max-subscriptions-per-topic

Get max subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-max-subscriptions-per-topic

Set max subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--max-subscriptions-per-topic, -s]` | max subscriptions for a topic (default -1 will be overwrite if not passed)|0|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-max-subscriptions-per-topic

Remove max subscriptions for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-schema-compatibility-strategy

Remove schema compatibility strategy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-schema-compatibility-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-schema-compatibility-strategy

Set schema compatibility strategy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-schema-compatibility-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--strategy, -s]` | Schema compatibility strategy: [UNDEFINED, ALWAYS_INCOMPATIBLE, ALWAYS_COMPATIBLE, BACKWARD, FORWARD, FULL, BACKWARD_TRANSITIVE, FORWARD_TRANSITIVE, FULL_TRANSITIVE]|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-schema-compatibility-strategy

Get schema compatibility strategy on a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-schema-compatibility-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-entry-filters-per-topic

Get entry filters for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-entry-filters-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-ap, --applied]` | Get the applied policy of the topic|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-entry-filters-per-topic

Set entry filters for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-entry-filters-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--entry-filters-name, -efn]` | The class name for the entry filter.||
| `[--global, -g]` | Whether to set this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-entry-filters-per-topic

Remove entry filters for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-entry-filters-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-auto-subscription-creation

Enable autoSubscriptionCreation for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--enable, -e]` | Enable allowAutoSubscriptionCreation on topic|false|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-auto-subscription-creation

Get the autoSubscriptionCreation for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--applied, -a]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-auto-subscription-creation

Remove override of autoSubscriptionCreation for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-dispatcher-pause-on-ack-state-persistent

Enable dispatcherPauseOnAckStatePersistent for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies set-dispatcher-pause-on-ack-state-persistent options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-dispatcher-pause-on-ack-state-persistent

Get the dispatcherPauseOnAckStatePersistent for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-dispatcher-pause-on-ack-state-persistent options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--applied, -a]` | Get the applied policy of the topic|false|
| `[--global, -g]` | Whether to get this policy globally. If set to true, broker returned global topic policies|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-dispatcher-pause-on-ack-state-persistent

Remove dispatcherPauseOnAckStatePersistent for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies remove-dispatcher-pause-on-ack-state-persistent options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to remove this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-replication-clusters

Get the replication clusters for a topic

**Command:**

```shell
$ pulsar-admin topicPolicies get-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-ap, --applied]` | Get the applied policy of the topic. If set to true, the param "--global" will be ignored. |false|
| `[--global, -g]` | Whether to get this policy globally. If set "--applied" to true, the current param will be ignored. |false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## set-replication-clusters

Set the replication clusters for a topic, global policy will be copied to the remote cluster if you enabled namespace level replication. When removing a cluster: with shared configuration store, topic data will be deleted from the removed cluster; with separate configuration store, only replication stops but topic data is preserved.

**Command:**

```shell
$ pulsar-admin topicPolicies set-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--clusters, -c]` | Replication Cluster Ids list (comma separated values)|null|
| `[--global, -g]` | Whether to set this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## remove-replication-clusters

Remove the replication clusters for a topic, it will not remove the policy from the remotecluster

**Command:**

```shell
$ pulsar-admin topicPolicies remove-replication-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--global, -g]` | Whether to get this policy globally. If set to true, the policy will be replicate to other clusters asynchronously|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

