# namespaces

Operations about namespaces


```shell
$ pulsar-admin namespaces subcommand
```



## list

Get the namespaces for a tenant

**Command:**

```shell
$ pulsar-admin namespaces list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## list-cluster

Get the namespaces for a tenant in a cluster

**Command:**

```shell
$ pulsar-admin namespaces list-cluster options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## topics

Get the list of topics for a namespace

**Command:**

```shell
$ pulsar-admin namespaces topics options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --mode` | Allowed topic domain mode (persistent, non_persistent, all).|null||
| `-ist, --include-system-topic` | Include system topic|false||


## bundles

Get the list of bundles for a namespace

**Command:**

```shell
$ pulsar-admin namespaces bundles options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## destinations

Get the list of destinations for a namespace

**Command:**

```shell
$ pulsar-admin namespaces destinations options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## policies

Get the configuration policies of a namespace

**Command:**

```shell
$ pulsar-admin namespaces policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## create

Creates a new namespace

**Command:**

```shell
$ pulsar-admin namespaces create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--clusters, -c` | List of clusters this namespace will be assigned|null||
| `--bundles, -b` | number of bundles to activate|0||


## delete

Deletes a namespace.

**Command:**

```shell
$ pulsar-admin namespaces delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-f, --force` | Delete namespace forcefully by force deleting all topics under it|false||


## permissions

Get the permissions on a namespace

**Command:**

```shell
$ pulsar-admin namespaces permissions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## grant-permission

Grant permissions on a namespace

**Command:**

```shell
$ pulsar-admin namespaces grant-permission options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--actions` | Actions to be granted (produce,consume,sources,sinks,functions,packages)|null||
| `--role` | Client role to which grant permissions|null||


## revoke-permission

Revoke permissions on a namespace

**Command:**

```shell
$ pulsar-admin namespaces revoke-permission options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--role` | Client role to which revoke permissions|null||


## subscription-permission

Get permissions to access subscription admin-api

**Command:**

```shell
$ pulsar-admin namespaces subscription-permission options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## grant-subscription-permission

Grant permissions to access subscription admin-api

**Command:**

```shell
$ pulsar-admin namespaces grant-subscription-permission options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-rs, --roles` | Client roles to which grant permissions (comma separated roles)|null||
| `-s, --subscription` | Subscription name for which permission will be granted to roles|null||


## revoke-subscription-permission

Revoke permissions to access subscription admin-api

**Command:**

```shell
$ pulsar-admin namespaces revoke-subscription-permission options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-s, --subscription` | Subscription name for which permission will be revoked to roles|null||
| `-r, --role` | Client role to which revoke permissions|null||


## set-clusters

Set replication clusters for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--clusters, -c` | Replication Cluster Ids list (comma separated values)|null||


## get-clusters

Get replication clusters for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-subscription-types-enabled

Set subscription types enabled for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--types, -t` | Subscription types enabled list (comma separated values). Possible values: (Exclusive, Shared, Failover, Key_Shared).|null||


## get-subscription-types-enabled

Get subscription types enabled for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-subscription-types-enabled

Remove subscription types enabled for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-subscription-types-enabled options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-backlog-quotas

Get the backlog quota policies for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-backlog-quotas options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-backlog-quota

Set a backlog quota policy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-lt, --limitTime` | Time limit in second (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w), non-positive number for disabling time limit.|null||
| `-l, --limit` | Size limit (eg: 10M, 16G)|null||
| `-t, --type` | Backlog quota type to set. Valid options are: destination_storage (default) and message_age. destination_storage limits backlog by size. message_age limits backlog by time, that is, message timestamp (broker or publish timestamp). You can set size or time to control the backlog, or combine them together to control the backlog. |destination_storage||
| `-p, --policy` | Retention policy to enforce when the limit is reached. Valid options are: [producer_request_hold, producer_exception, consumer_backlog_eviction]|null||


## remove-backlog-quota

Remove a backlog quota policy from a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-backlog-quota options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --type` | Backlog quota type to remove. Valid options are: destination_storage, message_age|destination_storage||


## get-persistence

Get the persistence policies for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-persistence

Set the persistence policies for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-e, --bookkeeper-ensemble` | Number of bookies to use for a topic|2||
| `-a, --bookkeeper-ack-quorum` | Number of acks (guaranteed copies) to wait for each entry|2||
| `-w, --bookkeeper-write-quorum` | How many writes to make of each entry|2||
| `-r, --ml-mark-delete-max-rate` | Throttling rate of mark-delete operation (0 means no throttle)|0.0||


## remove-persistence

Remove the persistence policies for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-persistence options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-message-ttl

Get message TTL for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-message-ttl

Set Message TTL for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--messageTTL, -ttl` | Message TTL in seconds (or minutes, hours, days, weeks eg: 100m, 3h, 2d, 5w). When the value is set to `0`, TTL is disabled.|null||


## remove-message-ttl

Remove Message TTL for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-message-ttl options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-subscriptions-per-topic

Get max subscriptions per topic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-subscriptions-per-topic

Set max subscriptions per topic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-subscriptions-per-topic, -m` | Max subscriptions per topic|0||


## remove-max-subscriptions-per-topic

Remove max subscriptions per topic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-max-subscriptions-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-subscription-expiration-time

Get subscription expiration time for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-subscription-expiration-time options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-subscription-expiration-time

Set subscription expiration time for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-subscription-expiration-time options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-t, --time` | Subscription expiration time in minutes|0||


## remove-subscription-expiration-time

Remove subscription expiration time for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-subscription-expiration-time options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-anti-affinity-group

Get Anti-affinity group name for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-anti-affinity-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-anti-affinity-group

Set Anti-affinity group name for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-anti-affinity-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--group, -g` | Anti-affinity group name|null||


## get-anti-affinity-namespaces

Get Anti-affinity namespaces grouped with the given anti-affinity group name

**Command:**

```shell
$ pulsar-admin namespaces get-anti-affinity-namespaces options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--cluster, -c` | Cluster name|null||
| `--group, -g` | Anti-affinity group name|null||
| `--tenant, -p` | tenant is only used for authorization. Client has to be admin of any of the tenant to access this api|null||


## delete-anti-affinity-group

Remove Anti-affinity group name for a namespace

**Command:**

```shell
$ pulsar-admin namespaces delete-anti-affinity-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-deduplication

Enable or disable deduplication for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable deduplication|false||
| `--disable, -d` | Disable deduplication|false||


## get-deduplication

Get Deduplication for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-deduplication

Remove Deduplication for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-deduplication options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-auto-topic-creation

Enable or disable autoTopicCreation for a namespace, overriding broker settings

**Command:**

```shell
$ pulsar-admin namespaces set-auto-topic-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable allowAutoTopicCreation on namespace|false||
| `--num-partitions, -n` | Default number of partitions of topic to be auto-created, applicable to partitioned topics only|null||
| `--disable, -d` | Disable allowAutoTopicCreation on namespace|false||
| `--type, -t` | Type of topic to be auto-created. Possible values: (partitioned, non-partitioned). Default value: non-partitioned|non-partitioned||


## get-auto-topic-creation

Get autoTopicCreation info for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-auto-topic-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-auto-topic-creation

Remove override of autoTopicCreation for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-auto-topic-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-auto-subscription-creation

Enable autoSubscriptionCreation for a namespace, overriding broker settings

**Command:**

```shell
$ pulsar-admin namespaces set-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable allowAutoSubscriptionCreation on namespace|false||


## get-auto-subscription-creation

Get the autoSubscriptionCreation for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-auto-subscription-creation

Remove override of autoSubscriptionCreation for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-auto-subscription-creation options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-retention

Get the retention policy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-retention

Set the retention policy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--size, -s` | Retention size limit with optional size unit suffix. For example, 4096, 10M, 16G, 3T.  The size unit suffix character can be k/K, m/M, g/G, or t/T.  If the size unit suffix is not specified, the default unit is bytes. 0 or less than 1MB means no retention and -1 means infinite size retention|null||
| `--time, -t` | Retention time with optional time unit suffix. For example, 100m, 3h, 2d, 5w. If the time unit is not specified, the default unit is seconds. For example, -t 120 sets retention to 2 minutes. 0 means no retention and -1 means infinite time retention.|null||


## remove-retention

Remove the retention policy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-retention options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-bookie-affinity-group

Set the bookie-affinity group name

**Command:**

```shell
$ pulsar-admin namespaces set-bookie-affinity-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--primary-group, -pg` | Bookie-affinity primary-groups (comma separated) name where namespace messages should be written|null||
| `--secondary-group, -sg` | Bookie-affinity secondary-group (comma separated) name where namespace messages should be written. If you want to verify whether there are enough bookies in groups, use `--secondary-group` flag. Messages in this namespace are stored in secondary groups. If a group does not contain enough bookies, a topic cannot be created.|null||


## get-bookie-affinity-group

Get the bookie-affinity group name

**Command:**

```shell
$ pulsar-admin namespaces get-bookie-affinity-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## delete-bookie-affinity-group

Set the bookie-affinity group name

**Command:**

```shell
$ pulsar-admin namespaces delete-bookie-affinity-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## unload

Unload a namespace from the current serving broker

**Command:**

```shell
$ pulsar-admin namespaces unload options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--bundle, -b` | {start-boundary}_{end-boundary}|null||
| `--destinationBroker, -d` | Target brokerWebServiceAddress to which the bundle has to be allocated to|null||


## split-bundle

Split a namespace-bundle from the current serving broker

**Command:**

```shell
$ pulsar-admin namespaces split-bundle options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--unload, -u` | Unload newly split bundles after splitting old bundle|false||
| `--split-algorithm-name, -san` | Algorithm name for split namespace bundle. Valid options are: [range_equally_divide, topic_count_equally_divide, specified_positions_divide, flow_or_qps_equally_divide]. Use broker side config if absent|null||
| `--bundle-type, -bt` | bundle type (mutually exclusive with --bundle)|null||
| `--split-boundaries, -sb` | Specified split boundary for bundle split, will split one bundle to multi bundles only works with specified_positions_divide algorithm|null||
| `--bundle, -b` | {start-boundary}_{end-boundary} (mutually exclusive with --bundle-type)|null||


## get-topic-positions

Get the positions for one or more topic(s) in a namespace bundle

**Command:**

```shell
$ pulsar-admin namespaces get-topic-positions options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--topic-list, -tl` | The list of topics(both non-partitioned topic and partitioned topic) to get positions in this bundle, if none topic provided, will get the positions of all topics in this bundle|null||
| `--bundle, -b` | {start-boundary}_{end-boundary} format namespace bundle|null||


## set-dispatch-rate

Set message-dispatch-rate for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces set-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false||
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||


## remove-dispatch-rate

Remove configured message-dispatch-rate for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-dispatch-rate

Get configured message-dispatch-rate for all topics of the namespace (Disabled if value < 0)

**Command:**

```shell
$ pulsar-admin namespaces get-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-subscribe-rate

Set subscribe-rate per consumer for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces set-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--subscribe-rate, -sr` | subscribe-rate (default -1 will be overwrite if not passed)|-1||
| `--subscribe-rate-period, -st` | subscribe-rate-period in second type (default 30 second will be overwrite if not passed)|30||


## get-subscribe-rate

Get configured subscribe-rate per consumer for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces get-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-subscribe-rate

Remove configured subscribe-rate per consumer for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-subscribe-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-subscription-dispatch-rate

Set subscription message-dispatch-rate for all subscription of the namespace

**Command:**

```shell
$ pulsar-admin namespaces set-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||


## get-subscription-dispatch-rate

Get subscription configured message-dispatch-rate for all topics of the namespace (Disabled if value < 0)

**Command:**

```shell
$ pulsar-admin namespaces get-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-subscription-dispatch-rate

Remove subscription configured message-dispatch-rate for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-subscription-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-publish-rate

Set publish-rate for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces set-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--byte-publish-rate, -b` | byte-publish-rate (default -1 will be overwrite if not passed)|-1||
| `--msg-publish-rate, -m` | message-publish-rate (default -1 will be overwrite if not passed)|-1||


## get-publish-rate

Get configured message-publish-rate for all topics of the namespace (Disabled if value < 0)

**Command:**

```shell
$ pulsar-admin namespaces get-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-publish-rate

Remove publish-rate for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-publish-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-replicator-dispatch-rate

Set replicator message-dispatch-rate for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces set-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1||
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1||
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1||


## get-replicator-dispatch-rate

Get replicator configured message-dispatch-rate for all topics of the namespace (Disabled if value < 0)

**Command:**

```shell
$ pulsar-admin namespaces get-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-replicator-dispatch-rate

Remove replicator configured message-dispatch-rate for all topics of the namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-replicator-dispatch-rate options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## clear-backlog

Clear backlog for a namespace

**Command:**

```shell
$ pulsar-admin namespaces clear-backlog options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--sub, -s` | subscription name|null||
| `--bundle, -b` | {start-boundary}_{end-boundary}|null||
| `--force, -force` | Whether to force clear backlog without prompt|false||


## unsubscribe

Unsubscribe the given subscription on all topics on a namespace

**Command:**

```shell
$ pulsar-admin namespaces unsubscribe options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--bundle, -b` | {start-boundary}_{end-boundary}|null||
| `--sub, -s` | subscription name|null||


## set-encryption-required

Enable or disable message encryption required for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-encryption-required options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable message encryption required|false||
| `--enable, -e` | Enable message encryption required|false||


## get-encryption-required

Get encryption required for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-encryption-required options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-subscription-auth-mode

Set subscription auth mode on a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-subscription-auth-mode options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-m, --subscription-auth-mode` | Subscription authorization mode for Pulsar policies. Valid options are: [None, Prefix]|null||


## get-subscription-auth-mode

Get subscriptionAuthMod for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-subscription-auth-mode options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-delayed-delivery

Set the delayed delivery policy on a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable delayed delivery messages|false||
| `--time, -t` | The tick time for when retrying on delayed delivery messages, affecting the accuracy of the delivery time compared to the scheduled time. (eg: 1s, 10s, 1m, 5h, 3d)|1s||
| `--enable, -e` | Enable delayed delivery messages|false||


## get-delayed-delivery

Get the delayed delivery policy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-delayed-delivery

Remove delayed delivery policies from a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-delayed-delivery options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-inactive-topic-policies

Get the inactive topic policy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-inactive-topic-policies

Set the inactive topic policies on a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-inactive-duration, -t` | Max duration of topic inactivity in seconds, topics that are inactive for longer than this value will be deleted (eg: 1s, 10s, 1m, 5h, 3d)|null||
| `--disable-delete-while-inactive, -d` | Disable delete while inactive|false||
| `--enable-delete-while-inactive, -e` | Enable delete while inactive|false||
| `--delete-mode, -m` | Mode of delete inactive topic, Valid options are: [delete_when_no_subscriptions, delete_when_subscriptions_caught_up]|null||


## remove-inactive-topic-policies

Remove inactive topic policies from a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-inactive-topic-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-producers-per-topic

Get maxProducersPerTopic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-max-producers-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-producers-per-topic

Set maxProducersPerTopic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-max-producers-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-producers-per-topic, -p` | maxProducersPerTopic for a namespace|0||


## remove-max-producers-per-topic

Remove max producers per topic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-max-producers-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-consumers-per-topic

Get maxConsumersPerTopic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-max-consumers-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-consumers-per-topic

Set maxConsumersPerTopic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-max-consumers-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-consumers-per-topic, -c` | maxConsumersPerTopic for a namespace|0||


## remove-max-consumers-per-topic

Remove max consumers per topic for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-max-consumers-per-topic options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-consumers-per-subscription

Get maxConsumersPerSubscription for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-consumers-per-subscription

Set maxConsumersPerSubscription for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-consumers-per-subscription, -c` | maxConsumersPerSubscription for a namespace|0||


## remove-max-consumers-per-subscription

Remove maxConsumersPerSubscription for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-max-consumers-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-unacked-messages-per-subscription

Get maxUnackedMessagesPerSubscription for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-unacked-messages-per-subscription

Set maxUnackedMessagesPerSubscription for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-unacked-messages-per-subscription, -c` | maxUnackedMessagesPerSubscription for a namespace|0||


## remove-max-unacked-messages-per-subscription

Remove maxUnackedMessagesPerSubscription for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-max-unacked-messages-per-subscription options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-max-unacked-messages-per-consumer

Get maxUnackedMessagesPerConsumer for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-unacked-messages-per-consumer

Set maxUnackedMessagesPerConsumer for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-unacked-messages-per-topic, -c` | maxUnackedMessagesPerConsumer for a namespace|0||


## remove-max-unacked-messages-per-consumer

Remove maxUnackedMessagesPerConsumer for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-max-unacked-messages-per-consumer options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-compaction-threshold

Get compactionThreshold for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-compaction-threshold

Set compactionThreshold for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--threshold, -t` | Maximum number of bytes in a topic backlog before compaction is triggered (eg: 10M, 16G, 3T). 0 disables automatic compaction|0||


## remove-compaction-threshold

Remove compactionThreshold for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-compaction-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-offload-threshold

Get offloadThreshold for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-offload-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-offload-threshold

Set offloadThreshold for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-offload-threshold options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--size, -s` | Maximum number of bytes stored in the pulsar cluster for a topic before data will start being automatically offloaded to longterm storage (eg: 10M, 16G, 3T, 100). -1 falls back to the cluster's namespace default. Negative values disable automatic offload. 0 triggers offloading as soon as possible.|-1||


## get-offload-deletion-lag

Get offloadDeletionLag, in minutes, for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-offload-deletion-lag options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-offload-deletion-lag

Set offloadDeletionLag for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-offload-deletion-lag options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--lag, -l` | Duration to wait after offloading a ledger segment, before deleting the copy of that segment from cluster local storage. (eg: 10m, 5h, 3d, 2w).|-1||


## clear-offload-deletion-lag

Clear offloadDeletionLag for a namespace

**Command:**

```shell
$ pulsar-admin namespaces clear-offload-deletion-lag options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-schema-autoupdate-strategy

Get the schema auto-update strategy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-schema-autoupdate-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-schema-autoupdate-strategy

Set the schema auto-update strategy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-schema-autoupdate-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--compatibility, -c` | Compatibility level required for new schemas created via a Producer. Possible values (Full, Backward, Forward).|null||
| `--disabled, -d` | Disable automatic schema updates|false||


## get-schema-compatibility-strategy

Get the schema compatibility strategy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-schema-compatibility-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-schema-compatibility-strategy

Set the schema compatibility strategy for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-schema-compatibility-strategy options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--compatibility, -c` | Compatibility level required for new schemas created via a Producer. Possible values (FULL, BACKWARD, FORWARD, UNDEFINED, BACKWARD_TRANSITIVE, FORWARD_TRANSITIVE, FULL_TRANSITIVE, ALWAYS_INCOMPATIBLE,ALWAYS_COMPATIBLE).|null||


## get-is-allow-auto-update-schema

Get the namespace whether allow auto update schema

**Command:**

```shell
$ pulsar-admin namespaces get-is-allow-auto-update-schema options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-is-allow-auto-update-schema

Set the namespace whether allow auto update schema

**Command:**

```shell
$ pulsar-admin namespaces set-is-allow-auto-update-schema options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable schema validation enforced|false||
| `--enable, -e` | Enable schema validation enforced|false||


## get-schema-validation-enforce

Get the schema validation enforced

**Command:**

```shell
$ pulsar-admin namespaces get-schema-validation-enforce options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the namespace|false||


## set-schema-validation-enforce

Set the schema whether open schema validation enforced

**Command:**

```shell
$ pulsar-admin namespaces set-schema-validation-enforce options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable schema validation enforced|false||
| `--enable, -e` | Enable schema validation enforced|false||


## set-offload-policies

Set the offload policies for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--offloadAfterThreshold, -oat` | Offload after threshold size (eg: 1M, 5M)|null||
| `--s3-role-session-name, -rsn` | S3 role session name used for STSAssumeRoleSessionCredentialsProvider|null||
| `--bucket, -b` | Bucket to place offloaded ledger into|null||
| `--aws-secret, -s` | AWS Credential Secret to use when using driver S3 or aws-s3|null||
| `--offloadAfterElapsed, -oae` | Offload after elapsed in minutes (or minutes, hours,days,weeks eg: 100m, 3h, 2d, 5w).|null||
| `--region, -r` | The long term storage region, default is s3ManagedLedgerOffloadRegion or gcsManagedLedgerOffloadRegion in broker.conf|null||
| `--s3-role, -ro` | S3 Role used for STSAssumeRoleSessionCredentialsProvider|null||
| `--maxBlockSize, -mbs` | Max block size (eg: 32M, 64M), default is 64MB|null||
| `--readBufferSize, -rbs` | Read buffer size (eg: 1M, 5M), default is 1MB|null||
| `--driver, -d` | Driver to use to offload old data to long term storage, (Possible values: S3, aws-s3, google-cloud-storage, filesystem, azureblob)|null||
| `--endpoint, -e` | Alternative endpoint to connect to, s3 default is s3ManagedLedgerOffloadServiceEndpoint in broker.conf|null||
| `--aws-id, -i` | AWS Credential Id to use when using driver S3 or aws-s3|null||
| `--offloadAfterThresholdInSeconds, -oats` | Offload after threshold seconds (eg: 1,5,10)|null||
| `--offloadedReadPriority, -orp` | Read priority for offloaded messages. By default, once messages are offloaded to long-term storage, brokers read messages from long-term storage, but messages can still exist in BookKeeper for a period depends on your configuration. For messages that exist in both long-term storage and BookKeeper, you can set where to read messages from with the option `tiered-storage-first` or `bookkeeper-first`.|null||


## remove-offload-policies

Remove the offload policies for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-offload-policies

Get the offload policies for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-offload-policies options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-deduplication-snapshot-interval

Set deduplicationSnapshotInterval for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--interval, -i` | deduplicationSnapshotInterval for a namespace|0||


## get-deduplication-snapshot-interval

Get deduplicationSnapshotInterval for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-deduplication-snapshot-interval

Remove deduplicationSnapshotInterval for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-deduplication-snapshot-interval options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-max-topics-per-namespace

Set max topics per namespace

**Command:**

```shell
$ pulsar-admin namespaces set-max-topics-per-namespace options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--max-topics-per-namespace, -t` | max topics per namespace|0||


## get-max-topics-per-namespace

Get max topics per namespace

**Command:**

```shell
$ pulsar-admin namespaces get-max-topics-per-namespace options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## remove-max-topics-per-namespace

Remove max topics per namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-max-topics-per-namespace options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-property

Set property for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-property options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--key, -k` | Key of the property|null||
| `--value, -v` | Value of the property|null||


## get-property

Get property for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-property options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--key, -k` | Key of the property|null||


## remove-property

Remove property for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-property options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--key, -k` | Key of the property|null||


## set-properties

Set properties of a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--properties, -p` | key value pair properties(a=a,b=b,c=c)|null||


## get-properties

Get properties of a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## clear-properties

Clear all properties for a namespace

**Command:**

```shell
$ pulsar-admin namespaces clear-properties options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-resource-group

Get ResourceGroup for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-resource-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-resource-group

Set ResourceGroup for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-resource-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--resource-group-name, -rgn` | ResourceGroup name|null||


## remove-resource-group

Remove ResourceGroup from a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-resource-group options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## get-entry-filters

Get entry filters for a namespace

**Command:**

```shell
$ pulsar-admin namespaces get-entry-filters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|


## set-entry-filters

Set entry filters for a namespace

**Command:**

```shell
$ pulsar-admin namespaces set-entry-filters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `--entry-filters-name, -efn` | The class name for the entry filter.|||


## remove-entry-filters

Remove entry filters for a namespace

**Command:**

```shell
$ pulsar-admin namespaces remove-entry-filters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|

