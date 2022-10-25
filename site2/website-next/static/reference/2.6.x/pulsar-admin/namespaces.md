------------

# namespaces

### Usage

`$namespaces`

------------

Operations about namespaces


```shell
$ pulsar-admin namespaces subcommand
```

* `list`
* `list-cluster`
* `topics`
* `bundles`
* `destinations`
* `policies`
* `create`
* `delete`
* `permissions`
* `grant-permission`
* `revoke-permission`
* `subscription-permission`
* `grant-subscription-permission`
* `revoke-subscription-permission`
* `set-clusters`
* `get-clusters`
* `set-subscription-types-enabled`
* `get-subscription-types-enabled`
* `get-backlog-quotas`
* `set-backlog-quota`
* `remove-backlog-quota`
* `get-persistence`
* `set-persistence`
* `remove-persistence`
* `get-message-ttl`
* `set-message-ttl`
* `remove-message-ttl`
* `get-max-subscriptions-per-topic`
* `set-max-subscriptions-per-topic`
* `remove-max-subscriptions-per-topic`
* `get-subscription-expiration-time`
* `set-subscription-expiration-time`
* `remove-subscription-expiration-time`
* `get-anti-affinity-group`
* `set-anti-affinity-group`
* `get-anti-affinity-namespaces`
* `delete-anti-affinity-group`
* `set-deduplication`
* `get-deduplication`
* `remove-deduplication`
* `set-auto-topic-creation`
* `get-auto-topic-creation`
* `remove-auto-topic-creation`
* `set-auto-subscription-creation`
* `get-auto-subscription-creation`
* `remove-auto-subscription-creation`
* `get-retention`
* `set-retention`
* `remove-retention`
* `set-bookie-affinity-group`
* `get-bookie-affinity-group`
* `delete-bookie-affinity-group`
* `unload`
* `split-bundle`
* `set-dispatch-rate`
* `remove-dispatch-rate`
* `get-dispatch-rate`
* `set-subscribe-rate`
* `get-subscribe-rate`
* `remove-subscribe-rate`
* `set-subscription-dispatch-rate`
* `get-subscription-dispatch-rate`
* `remove-subscription-dispatch-rate`
* `set-publish-rate`
* `get-publish-rate`
* `remove-publish-rate`
* `set-replicator-dispatch-rate`
* `get-replicator-dispatch-rate`
* `remove-replicator-dispatch-rate`
* `clear-backlog`
* `unsubscribe`
* `set-encryption-required`
* `get-encryption-required`
* `set-subscription-auth-mode`
* `get-subscription-auth-mode`
* `set-delayed-delivery`
* `get-delayed-delivery`
* `remove-delayed-delivery`
* `get-inactive-topic-policies`
* `set-inactive-topic-policies`
* `remove-inactive-topic-policies`
* `get-max-producers-per-topic`
* `set-max-producers-per-topic`
* `remove-max-producers-per-topic`
* `get-max-consumers-per-topic`
* `set-max-consumers-per-topic`
* `remove-max-consumers-per-topic`
* `get-max-consumers-per-subscription`
* `set-max-consumers-per-subscription`
* `remove-max-consumers-per-subscription`
* `get-max-unacked-messages-per-subscription`
* `set-max-unacked-messages-per-subscription`
* `remove-max-unacked-messages-per-subscription`
* `get-max-unacked-messages-per-consumer`
* `set-max-unacked-messages-per-consumer`
* `get-compaction-threshold`
* `set-compaction-threshold`
* `remove-compaction-threshold`
* `get-offload-threshold`
* `set-offload-threshold`
* `get-offload-deletion-lag`
* `set-offload-deletion-lag`
* `clear-offload-deletion-lag`
* `get-schema-autoupdate-strategy`
* `set-schema-autoupdate-strategy`
* `get-schema-compatibility-strategy`
* `set-schema-compatibility-strategy`
* `get-is-allow-auto-update-schema`
* `set-is-allow-auto-update-schema`
* `get-schema-validation-enforce`
* `set-schema-validation-enforce`
* `set-offload-policies`
* `remove-offload-policies`
* `get-offload-policies`
* `set-deduplication-snapshot-interval`
* `get-deduplication-snapshot-interval`
* `remove-deduplication-snapshot-interval`
* `set-max-topics-per-namespace`
* `get-max-topics-per-namespace`
* `remove-max-topics-per-namespace`
* `set-property`
* `get-property`
* `remove-property`
* `set-properties`
* `get-properties`
* `clear-properties`
* `get-resource-group`
* `set-resource-group`
* `remove-resource-group`


## <em>list</em>

Get the namespaces for a tenant

### Usage

------------


```shell
$ pulsar-admin namespaces list options
```



## <em>list-cluster</em>

Get the namespaces for a tenant in a cluster

### Usage

------------


```shell
$ pulsar-admin namespaces list-cluster options
```



## <em>topics</em>

Get the list of topics for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces topics options
```



## <em>bundles</em>

Get the list of bundles for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces bundles options
```



## <em>destinations</em>

Get the list of destinations for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces destinations options
```



## <em>policies</em>

Get the configuration policies of a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces policies options
```



## <em>create</em>

Creates a new namespace

### Usage

------------


```shell
$ pulsar-admin namespaces create options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--clusters, -c` | List of clusters this namespace will be assigned|null|
| `--bundles, -b` | number of bundles to activate|0|


## <em>delete</em>

Deletes a namespace.

### Usage

------------


```shell
$ pulsar-admin namespaces delete options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-f, --force` | Delete namespace forcefully by force deleting all topics under it|false|


## <em>permissions</em>

Get the permissions on a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces permissions options
```



## <em>grant-permission</em>

Grant permissions on a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces grant-permission options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--actions` | Actions to be granted (produce,consume)|null|
| `--role` | Client role to which grant permissions|null|


## <em>revoke-permission</em>

Revoke permissions on a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces revoke-permission options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--role` | Client role to which revoke permissions|null|


## <em>subscription-permission</em>

Get permissions to access subscription admin-api

### Usage

------------


```shell
$ pulsar-admin namespaces subscription-permission options
```



## <em>grant-subscription-permission</em>

Grant permissions to access subscription admin-api

### Usage

------------


```shell
$ pulsar-admin namespaces grant-subscription-permission options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--roles` | Client roles to which grant permissions (comma separated roles)|null|
| `--subscription` | Subscription name for which permission will be granted to roles|null|


## <em>revoke-subscription-permission</em>

Revoke permissions to access subscription admin-api

### Usage

------------


```shell
$ pulsar-admin namespaces revoke-subscription-permission options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--subscription` | Subscription name for which permission will be revoked to roles|null|
| `--role` | Client role to which revoke permissions|null|


## <em>set-clusters</em>

Set replication clusters for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-clusters options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--clusters, -c` | Replication Cluster Ids list (comma separated values)|null|


## <em>get-clusters</em>

Get replication clusters for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-clusters options
```



## <em>set-subscription-types-enabled</em>

Set subscription types enabled for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-subscription-types-enabled options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--types, -t` | Subscription types enabled list (comma separated values)|null|


## <em>get-subscription-types-enabled</em>

Get subscription types enabled for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-subscription-types-enabled options
```



## <em>get-backlog-quotas</em>

Get the backlog quota policies for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-backlog-quotas options
```



## <em>set-backlog-quota</em>

Set a backlog quota policy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-backlog-quota options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-l, --limit` | Size limit (eg: 10M, 16G)|null|
| `-lt, --limitTime` | Time limit in second, non-positive number for disabling time limit.|-1|
| `-p, --policy` | Retention policy to enforce when the limit is reached. Valid options are: [producer_request_hold, producer_exception, consumer_backlog_eviction]|null|
| `-t, --type` | Backlog quota type to set|destination_storage|


## <em>remove-backlog-quota</em>

Remove a backlog quota policy from a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-backlog-quota options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-t, --type` | Backlog quota type to remove|destination_storage|


## <em>get-persistence</em>

Get the persistence policies for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-persistence options
```



## <em>set-persistence</em>

Set the persistence policies for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-persistence options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-e, --bookkeeper-ensemble` | Number of bookies to use for a topic|0|
| `-a, --bookkeeper-ack-quorum` | Number of acks (guaranteed copies) to wait for each entry|0|
| `-w, --bookkeeper-write-quorum` | How many writes to make of each entry|0|
| `-r, --ml-mark-delete-max-rate` | Throttling rate of mark-delete operation (0 means no throttle)|0.0|


## <em>remove-persistence</em>

Remove the persistence policies for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-persistence options
```



## <em>get-message-ttl</em>

Get message TTL for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-message-ttl options
```



## <em>set-message-ttl</em>

Set Message TTL for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-message-ttl options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--messageTTL, -ttl` | Message TTL in seconds. When the value is set to `0`, TTL is disabled.|0|


## <em>remove-message-ttl</em>

Remove Message TTL for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-message-ttl options
```



## <em>get-max-subscriptions-per-topic</em>

Get max subscriptions per topic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-max-subscriptions-per-topic options
```



## <em>set-max-subscriptions-per-topic</em>

Set max subscriptions per topic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-max-subscriptions-per-topic options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--max-subscriptions-per-topic, -m` | Max subscriptions per topic|0|


## <em>remove-max-subscriptions-per-topic</em>

Remove max subscriptions per topic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-max-subscriptions-per-topic options
```



## <em>get-subscription-expiration-time</em>

Get subscription expiration time for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-subscription-expiration-time options
```



## <em>set-subscription-expiration-time</em>

Set subscription expiration time for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-subscription-expiration-time options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-t, --time` | Subscription expiration time in minutes|0|


## <em>remove-subscription-expiration-time</em>

Remove subscription expiration time for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-subscription-expiration-time options
```



## <em>get-anti-affinity-group</em>

Get Anti-affinity group name for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-anti-affinity-group options
```



## <em>set-anti-affinity-group</em>

Set Anti-affinity group name for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-anti-affinity-group options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--group, -g` | Anti-affinity group name|null|


## <em>get-anti-affinity-namespaces</em>

Get Anti-affinity namespaces grouped with the given anti-affinity group name

### Usage

------------


```shell
$ pulsar-admin namespaces get-anti-affinity-namespaces options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--cluster, -c` | Cluster name|null|
| `--group, -g` | Anti-affinity group name|null|
| `--tenant, -p` | tenant is only used for authorization. Client has to be admin of any of the tenant to access this api|null|


## <em>delete-anti-affinity-group</em>

Remove Anti-affinity group name for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces delete-anti-affinity-group options
```



## <em>set-deduplication</em>

Enable or disable deduplication for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-deduplication options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable deduplication|false|
| `--disable, -d` | Disable deduplication|false|


## <em>get-deduplication</em>

Get Deduplication for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-deduplication options
```



## <em>remove-deduplication</em>

Remove Deduplication for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-deduplication options
```



## <em>set-auto-topic-creation</em>

Enable or disable autoTopicCreation for a namespace, overriding broker settings

### Usage

------------


```shell
$ pulsar-admin namespaces set-auto-topic-creation options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable allowAutoTopicCreation on namespace|false|
| `--num-partitions, -n` | Default number of partitions of topic to be auto-created, applicable to partitioned topics only|null|
| `--disable, -d` | Disable allowAutoTopicCreation on namespace|false|
| `--type, -t` | Type of topic to be auto-created. Possible values: (partitioned, non-partitioned). Default value: non-partitioned|non-partitioned|


## <em>get-auto-topic-creation</em>

Get autoTopicCreation info for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-auto-topic-creation options
```



## <em>remove-auto-topic-creation</em>

Remove override of autoTopicCreation for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-auto-topic-creation options
```



## <em>set-auto-subscription-creation</em>

Enable autoSubscriptionCreation for a namespace, overriding broker settings

### Usage

------------


```shell
$ pulsar-admin namespaces set-auto-subscription-creation options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--enable, -e` | Enable allowAutoSubscriptionCreation on namespace|false|


## <em>get-auto-subscription-creation</em>

Get the autoSubscriptionCreation for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-auto-subscription-creation options
```



## <em>remove-auto-subscription-creation</em>

Remove override of autoSubscriptionCreation for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-auto-subscription-creation options
```



## <em>get-retention</em>

Get the retention policy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-retention options
```



## <em>set-retention</em>

Set the retention policy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-retention options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--size, -s` | Retention size limit (eg: 10M, 16G, 3T). 0 or less than 1MB means no retention and -1 means infinite size retention|null|
| `--time, -t` | Retention time in minutes (or minutes, hours,days,weeks eg: 100m, 3h, 2d, 5w). 0 means no retention and -1 means infinite time retention|null|


## <em>remove-retention</em>

Remove the retention policy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-retention options
```



## <em>set-bookie-affinity-group</em>

Set the bookie-affinity group name

### Usage

------------


```shell
$ pulsar-admin namespaces set-bookie-affinity-group options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--primary-group, -pg` | Bookie-affinity primary-groups (comma separated) name where namespace messages should be written|null|
| `--secondary-group, -sg` | Bookie-affinity secondary-group (comma separated) name where namespace messages should be written. If you want to verify whether there are enough bookies in groups, use `--secondary-group` flag. Messages in this namespace are stored in secondary groups. If a group does not contain enough bookies, a topic cannot be created.|null|


## <em>get-bookie-affinity-group</em>

Get the bookie-affinity group name

### Usage

------------


```shell
$ pulsar-admin namespaces get-bookie-affinity-group options
```



## <em>delete-bookie-affinity-group</em>

Set the bookie-affinity group name

### Usage

------------


```shell
$ pulsar-admin namespaces delete-bookie-affinity-group options
```



## <em>unload</em>

Unload a namespace from the current serving broker

### Usage

------------


```shell
$ pulsar-admin namespaces unload options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--bundle, -b` | {start-boundary}_{end-boundary}|null|


## <em>split-bundle</em>

Split a namespace-bundle from the current serving broker

### Usage

------------


```shell
$ pulsar-admin namespaces split-bundle options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--unload, -u` | Unload newly split bundles after splitting old bundle|false|
| `--split-algorithm-name, -san` | Algorithm name for split namespace bundle. Valid options are: [range_equally_divide, topic_count_equally_divide]. Use broker side config if absent|null|
| `--bundle, -b` | {start-boundary}_{end-boundary} / LARGEST(bundle with highest topics)|null|


## <em>set-dispatch-rate</em>

Set message-dispatch-rate for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-dispatch-rate options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1|
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false|
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1|


## <em>remove-dispatch-rate</em>

Remove configured message-dispatch-rate for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-dispatch-rate options
```



## <em>get-dispatch-rate</em>

Get configured message-dispatch-rate for all topics of the namespace (Disabled if value < 0)

### Usage

------------


```shell
$ pulsar-admin namespaces get-dispatch-rate options
```



## <em>set-subscribe-rate</em>

Set subscribe-rate per consumer for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-subscribe-rate options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--subscribe-rate, -sr` | subscribe-rate (default -1 will be overwrite if not passed)|-1|
| `--subscribe-rate-period, -st` | subscribe-rate-period in second type (default 30 second will be overwrite if not passed)|30|


## <em>get-subscribe-rate</em>

Get configured subscribe-rate per consumer for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-subscribe-rate options
```



## <em>remove-subscribe-rate</em>

Remove configured subscribe-rate per consumer for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-subscribe-rate options
```



## <em>set-subscription-dispatch-rate</em>

Set subscription message-dispatch-rate for all subscription of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-subscription-dispatch-rate options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1|
| `--relative-to-publish-rate, -rp` | dispatch rate relative to publish-rate (if publish-relative flag is enabled then broker will apply throttling value to (publish-rate + dispatch rate))|false|
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1|


## <em>get-subscription-dispatch-rate</em>

Get subscription configured message-dispatch-rate for all topics of the namespace (Disabled if value < 0)

### Usage

------------


```shell
$ pulsar-admin namespaces get-subscription-dispatch-rate options
```



## <em>remove-subscription-dispatch-rate</em>

Remove subscription configured message-dispatch-rate for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-subscription-dispatch-rate options
```



## <em>set-publish-rate</em>

Set publish-rate for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-publish-rate options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--byte-publish-rate, -b` | byte-publish-rate (default -1 will be overwrite if not passed)|-1|
| `--msg-publish-rate, -m` | message-publish-rate (default -1 will be overwrite if not passed)|-1|


## <em>get-publish-rate</em>

Get configured message-publish-rate for all topics of the namespace (Disabled if value < 0)

### Usage

------------


```shell
$ pulsar-admin namespaces get-publish-rate options
```



## <em>remove-publish-rate</em>

Remove publish-rate for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-publish-rate options
```



## <em>set-replicator-dispatch-rate</em>

Set replicator message-dispatch-rate for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-replicator-dispatch-rate options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--dispatch-rate-period, -dt` | dispatch-rate-period in second type (default 1 second will be overwrite if not passed)|1|
| `--byte-dispatch-rate, -bd` | byte-dispatch-rate (default -1 will be overwrite if not passed)|-1|
| `--msg-dispatch-rate, -md` | message-dispatch-rate (default -1 will be overwrite if not passed)|-1|


## <em>get-replicator-dispatch-rate</em>

Get replicator configured message-dispatch-rate for all topics of the namespace (Disabled if value < 0)

### Usage

------------


```shell
$ pulsar-admin namespaces get-replicator-dispatch-rate options
```



## <em>remove-replicator-dispatch-rate</em>

Remove replicator configured message-dispatch-rate for all topics of the namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-replicator-dispatch-rate options
```



## <em>clear-backlog</em>

Clear backlog for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces clear-backlog options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--sub, -s` | subscription name|null|
| `--bundle, -b` | {start-boundary}_{end-boundary}|null|
| `--force, -force` | Whether to force clear backlog without prompt|false|


## <em>unsubscribe</em>

Unsubscribe the given subscription on all topics on a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces unsubscribe options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--bundle, -b` | {start-boundary}_{end-boundary}|null|
| `--sub, -s` | subscription name|null|


## <em>set-encryption-required</em>

Enable or disable message encryption required for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-encryption-required options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable message encryption required|false|
| `--enable, -e` | Enable message encryption required|false|


## <em>get-encryption-required</em>

Get encryption required for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-encryption-required options
```



## <em>set-subscription-auth-mode</em>

Set subscription auth mode on a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-subscription-auth-mode options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-m, --subscription-auth-mode` | Subscription authorization mode for Pulsar policies. Valid options are: [None, Prefix]|null|


## <em>get-subscription-auth-mode</em>

Get subscriptionAuthMod for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-subscription-auth-mode options
```



## <em>set-delayed-delivery</em>

Set the delayed delivery policy on a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-delayed-delivery options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable delayed delivery messages|false|
| `--time, -t` | The tick time for when retrying on delayed delivery messages, affecting the accuracy of the delivery time compared to the scheduled time. (eg: 1s, 10s, 1m, 5h, 3d)|1s|
| `--enable, -e` | Enable delayed delivery messages|false|


## <em>get-delayed-delivery</em>

Get the delayed delivery policy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-delayed-delivery options
```



## <em>remove-delayed-delivery</em>

Remove delayed delivery policies from a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-delayed-delivery options
```



## <em>get-inactive-topic-policies</em>

Get the inactive topic policy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-inactive-topic-policies options
```



## <em>set-inactive-topic-policies</em>

Set the inactive topic policies on a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-inactive-topic-policies options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--max-inactive-duration, -t` | Max duration of topic inactivity in seconds,topics that are inactive for longer than this value will be deleted (eg: 1s, 10s, 1m, 5h, 3d)|null|
| `--disable-delete-while-inactive, -d` | Disable delete while inactive|false|
| `--enable-delete-while-inactive, -e` | Enable delete while inactive|false|
| `--delete-mode, -m` | Mode of delete inactive topic,Valid options are: [delete_when_no_subscriptions, delete_when_subscriptions_caught_up]|null|


## <em>remove-inactive-topic-policies</em>

Remove inactive topic policies from a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-inactive-topic-policies options
```



## <em>get-max-producers-per-topic</em>

Get maxProducersPerTopic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-max-producers-per-topic options
```



## <em>set-max-producers-per-topic</em>

Set maxProducersPerTopic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-max-producers-per-topic options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--max-producers-per-topic, -p` | maxProducersPerTopic for a namespace|0|


## <em>remove-max-producers-per-topic</em>

Remove max producers per topic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-max-producers-per-topic options
```



## <em>get-max-consumers-per-topic</em>

Get maxConsumersPerTopic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-max-consumers-per-topic options
```



## <em>set-max-consumers-per-topic</em>

Set maxConsumersPerTopic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-max-consumers-per-topic options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--max-consumers-per-topic, -c` | maxConsumersPerTopic for a namespace|0|


## <em>remove-max-consumers-per-topic</em>

Remove max consumers per topic for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-max-consumers-per-topic options
```



## <em>get-max-consumers-per-subscription</em>

Get maxConsumersPerSubscription for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-max-consumers-per-subscription options
```



## <em>set-max-consumers-per-subscription</em>

Set maxConsumersPerSubscription for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-max-consumers-per-subscription options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--max-consumers-per-subscription, -c` | maxConsumersPerSubscription for a namespace|0|


## <em>remove-max-consumers-per-subscription</em>

Remove maxConsumersPerSubscription for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-max-consumers-per-subscription options
```



## <em>get-max-unacked-messages-per-subscription</em>

Get maxUnackedMessagesPerSubscription for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-max-unacked-messages-per-subscription options
```



## <em>set-max-unacked-messages-per-subscription</em>

Set maxUnackedMessagesPerSubscription for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-max-unacked-messages-per-subscription options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--max-unacked-messages-per-subscription, -c` | maxUnackedMessagesPerSubscription for a namespace|0|


## <em>remove-max-unacked-messages-per-subscription</em>

Remove maxUnackedMessagesPerSubscription for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-max-unacked-messages-per-subscription options
```



## <em>get-max-unacked-messages-per-consumer</em>

Get maxUnackedMessagesPerConsumer for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-max-unacked-messages-per-consumer options
```



## <em>set-max-unacked-messages-per-consumer</em>

Set maxUnackedMessagesPerConsumer for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-max-unacked-messages-per-consumer options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--max-unacked-messages-per-topic, -c` | maxUnackedMessagesPerConsumer for a namespace|0|


## <em>get-compaction-threshold</em>

Get compactionThreshold for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-compaction-threshold options
```



## <em>set-compaction-threshold</em>

Set compactionThreshold for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-compaction-threshold options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--threshold, -t` | Maximum number of bytes in a topic backlog before compaction is triggered (eg: 10M, 16G, 3T). 0 disables automatic compaction|0|


## <em>remove-compaction-threshold</em>

Remove compactionThreshold for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-compaction-threshold options
```



## <em>get-offload-threshold</em>

Get offloadThreshold for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-offload-threshold options
```



## <em>set-offload-threshold</em>

Set offloadThreshold for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-offload-threshold options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--size, -s` | Maximum number of bytes stored in the pulsar cluster for a topic before data will start being automatically offloaded to longterm storage (eg: 10M, 16G, 3T, 100). -1 falls back to the cluster's namespace default. Negative values disable automatic offload. 0 triggers offloading as soon as possible.|-1|


## <em>get-offload-deletion-lag</em>

Get offloadDeletionLag, in minutes, for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-offload-deletion-lag options
```



## <em>set-offload-deletion-lag</em>

Set offloadDeletionLag for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-offload-deletion-lag options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--lag, -l` | Duration to wait after offloading a ledger segment, before deleting the copy of that segment from cluster local storage. (eg: 10m, 5h, 3d, 2w).|-1|


## <em>clear-offload-deletion-lag</em>

Clear offloadDeletionLag for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces clear-offload-deletion-lag options
```



## <em>get-schema-autoupdate-strategy</em>

Get the schema auto-update strategy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-schema-autoupdate-strategy options
```



## <em>set-schema-autoupdate-strategy</em>

Set the schema auto-update strategy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-schema-autoupdate-strategy options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--compatibility, -c` | Compatibility level required for new schemas created via a Producer. Possible values (Full, Backward, Forward).|null|
| `--disabled, -d` | Disable automatic schema updates|false|


## <em>get-schema-compatibility-strategy</em>

Get the schema compatibility strategy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-schema-compatibility-strategy options
```



## <em>set-schema-compatibility-strategy</em>

Set the schema compatibility strategy for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-schema-compatibility-strategy options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--compatibility, -c` | Compatibility level required for new schemas created via a Producer. Possible values (FULL, BACKWARD, FORWARD, UNDEFINED, BACKWARD_TRANSITIVE, FORWARD_TRANSITIVE, FULL_TRANSITIVE, ALWAYS_INCOMPATIBLE,ALWAYS_COMPATIBLE).|null|


## <em>get-is-allow-auto-update-schema</em>

Get the namespace whether allow auto update schema

### Usage

------------


```shell
$ pulsar-admin namespaces get-is-allow-auto-update-schema options
```



## <em>set-is-allow-auto-update-schema</em>

Set the namespace whether allow auto update schema

### Usage

------------


```shell
$ pulsar-admin namespaces set-is-allow-auto-update-schema options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable schema validation enforced|false|
| `--enable, -e` | Enable schema validation enforced|false|


## <em>get-schema-validation-enforce</em>

Get the schema validation enforced

### Usage

------------


```shell
$ pulsar-admin namespaces get-schema-validation-enforce options
```

Options


|Flag|Description|Default|
|---|---|---|
| `-ap, --applied` | Get the applied policy of the namespace|false|


## <em>set-schema-validation-enforce</em>

Set the schema whether open schema validation enforced

### Usage

------------


```shell
$ pulsar-admin namespaces set-schema-validation-enforce options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--disable, -d` | Disable schema validation enforced|false|
| `--enable, -e` | Enable schema validation enforced|false|


## <em>set-offload-policies</em>

Set the offload policies for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-offload-policies options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--offloadAfterThreshold, -oat` | Offload after threshold size (eg: 1M, 5M)|null|
| `--s3-role-session-name, -rsn` | S3 role session name used for STSAssumeRoleSessionCredentialsProvider|null|
| `--bucket, -b` | Bucket to place offloaded ledger into|null|
| `--aws-secret, -s` | AWS Credential Secret to use when using driver S3 or aws-s3|null|
| `--offloadAfterElapsed, -oae` | Offload after elapsed in minutes (or minutes, hours,days,weeks eg: 100m, 3h, 2d, 5w).|null|
| `--region, -r` | The long term storage region, default is s3ManagedLedgerOffloadRegion or gcsManagedLedgerOffloadRegion in broker.conf|null|
| `--s3-role, -ro` | S3 Role used for STSAssumeRoleSessionCredentialsProvider|null|
| `--maxBlockSize, -mbs` | Max block size (eg: 32M, 64M), default is 64MB|null|
| `--readBufferSize, -rbs` | Read buffer size (eg: 1M, 5M), default is 1MB|null|
| `--driver, -d` | Driver to use to offload old data to long term storage, (Possible values: S3, aws-s3, google-cloud-storage, filesystem, azureblob)|null|
| `--endpoint, -e` | Alternative endpoint to connect to, s3 default is s3ManagedLedgerOffloadServiceEndpoint in broker.conf|null|
| `--aws-id, -i` | AWS Credential Id to use when using driver S3 or aws-s3|null|
| `--offloadedReadPriority, -orp` | Read priority for offloaded messages. By default, once messages are offloaded to long-term storage, brokers read messages from long-term storage, but messages can still exist in BookKeeper for a period depends on your configuration. For messages that exist in both long-term storage and BookKeeper, you can set where to read messages from with the option `tiered-storage-first` or `bookkeeper-first`.|null|


## <em>remove-offload-policies</em>

Remove the offload policies for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-offload-policies options
```



## <em>get-offload-policies</em>

Get the offload policies for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-offload-policies options
```



## <em>set-deduplication-snapshot-interval</em>

Set deduplicationSnapshotInterval for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-deduplication-snapshot-interval options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--interval, -i` | deduplicationSnapshotInterval for a namespace|0|


## <em>get-deduplication-snapshot-interval</em>

Get deduplicationSnapshotInterval for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-deduplication-snapshot-interval options
```



## <em>remove-deduplication-snapshot-interval</em>

Remove deduplicationSnapshotInterval for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-deduplication-snapshot-interval options
```



## <em>set-max-topics-per-namespace</em>

Set max topics per namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-max-topics-per-namespace options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--max-topics-per-namespace, -t` | max topics per namespace|0|


## <em>get-max-topics-per-namespace</em>

Get max topics per namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-max-topics-per-namespace options
```



## <em>remove-max-topics-per-namespace</em>

Remove max topics per namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-max-topics-per-namespace options
```



## <em>set-property</em>

Set property for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-property options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--key, -k` | Key of the property|null|
| `--value, -v` | Value of the property|null|


## <em>get-property</em>

Get property for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-property options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--key, -k` | Key of the property|null|


## <em>remove-property</em>

Remove property for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-property options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--key, -k` | Key of the property|null|


## <em>set-properties</em>

Set properties of a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-properties options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--properties, -p` | key value pair properties(a=a,b=b,c=c)|null|


## <em>get-properties</em>

Get properties of a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-properties options
```



## <em>clear-properties</em>

Clear all properties for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces clear-properties options
```



## <em>get-resource-group</em>

Get ResourceGroup for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces get-resource-group options
```



## <em>set-resource-group</em>

Set ResourceGroup for a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces set-resource-group options
```

Options


|Flag|Description|Default|
|---|---|---|
| `--resource-group-name, -rgn` | ResourceGroup name|null|


## <em>remove-resource-group</em>

Remove ResourceGroup from a namespace

### Usage

------------


```shell
$ pulsar-admin namespaces remove-resource-group options
```


