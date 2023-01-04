---
id: pulsar-2.10.3
title: Apache Pulsar 2.10.3
sidebar_label: Apache Pulsar 2.10.3
---

#### 2023-1-4

### Broker

* [improve][broker] Omit making a copy of CommandAck when there are no broker interceptors [#18997](https://github.com/apache/pulsar/pull/18997)
* [fix][broker] Copy proto command fields into final variables in ServerCnx [#18987](https://github.com/apache/pulsar/pull/18987)
* [improve][broker]Add a cache eviction policy：Evicting cache data by the slowest markDeletedPosition #14985
* [fix][broker] Fix broker cache eviction of entries read by active cursors #17273
* [enh][broker] Add metrics for entry cache insertion, eviction #17248
* [cleanup][broker] Extracted interface for EntryCacheManager #15933
* [improve][broker] Support dynamic update cache config #13679
* [improve][broker] refactor ManagedLedger cacheEvictionTask implement #14488
* [improve][broker] Add logs for why namespace bundle been split (#19003)
* [fix][broker] Fix deadlock in PendingAckHandleImpl (#18989)
* [fix][broker] Branch-2.10 Avoid endless blocking call. (#18914)
* [fix][broker][functions-worker] Ensure prometheus metrics are grouped by type (#8407, #13865) #15558
* [fix][broker]Update interceptor handler exception (#18940)
* [fix][broker] Fix incorrect bundle split count metric (#17970)
* [fix][broker] Avoid OOM not trigger PulsarByteBufAllocator outOfMemoryListener when use ByteBufAllocator.DEFAULT.heapBuffer in PrometheusMetricsGeneratorUtils (#18747)
* [improve][broker] Make Consumer#equals more effective (#18662)
* [fix][broker] In the trimDeletedEntries method, release the removed entry (#18305)
* [improve][broker] Remove locallyAcquiredLock when removeOwnership (#18197)
* [improve][broker] Avoid unnecessary creation of BitSetRecyclable objects #17998
* [fix][broker] add return for PersistentMessageExpiryMonitor#findEntryFailed #17816
* [fix][ml] Persist correct markDeletePosition to prevent message loss (#18237)
* [improve][broker] Support setting forceDeleteTenantAllowed dynamically (#18192)
* Make BookieId work with PulsarRegistrationDriver (second take) #17922
* [fix][broker] Extract additional servlets to the default directory by… (#17477)
* [improve][broker]Improve PersistentMessageExpiryMonitor expire speed when ledger not existed (#17842)
* [fix][broker]Fix mutex never released when trimming (#17911)
* [fix][broker] Fix if dynamicConfig item in ZK do not exist in broker cause NPE. #17705
* [fix][broker] Fix system service namespace create internal event topic. (#17867)
* [bugfix] Prevent Automatic Topic Creation during namespace deletion #17609
* [fix][broker]Cache invalidation due to concurrent access (#18076)
* [fix][broker]add test case for deleting namespace fail when has partitioned system topic (#17338)
* Skip creating a subscription replication snapshot if no messages have been published after the topic gets activated on a broker #16618
* [fix][broker] Fix uncompleted future when get the topic policies of  a deleted topic (#18824)
* [fix][broker] Fix delete system topic clean topic policy (#18823)
* [improve][broker][PIP-149]Make getList async #16221
* [fix][flaky-test]ManagedCursorMetricsTest.testManagedCursorMetrics #16878
* [improve][broker] System topic writer/reader connection not counted (#18603)
* [improve][broker] System topic writer/reader connection not counted. (#18369)
* [fix][broker]unify time unit at dropping the backlog on a topic #17957[fix][broker]unify time unit at dropping the backlog on a topic #17957
* [improve][broker] Support setting ForceDeleteNamespaceAllowed dynamically #18181
* [fix][broker] Fix `getPositionAfterN` infinite loop. (#17971)
* [fix][broker] Update the log print content of createSubscriptions (#18024)
* [Broker] Make PersistentTopicsBase#internalGetPartitionedMetadata async #14153
* [fix][broker] Fix duplicated schemas creation #18701
* [improve][broker] Using `handle` instead of `handleAsync` to avoid using common pool thread (#17403)
* [fix][broker] Fix dispatch duplicated messages with `Exclusive` mode. (#17237)
* [fix][broker] Fix the order of resource close in the InMemoryDelayedDeliveryTracker (#18000)
* [improve][broker] reduce code duplication to avoid endless wait ``CompletableFuture``  (#14853)
* [improve][ML] Print log when delete empty ledger. (#17859)
* [improve] clean the empty topicAuthenticationMap in zk when revoke permission (#16815)
* [fix][broker] fix can not revoke permission after update topic partition (#17393)
* [fix][broker] Fix Npe thrown by splitBundle (#17370)
* [fix][broker] Fix executeWithRetry result is null (#17694)
* [fix][broker] Fix SystemTopicBasedTopicPoliciesService NPE issue (#17602)
* [fix][broker] Fix broker cache eviction of entries read by active cursors #17273
* [fix][broker] Fix namespace can not be deleted by force (#18686)
* [fix][broker] Create replicated subscriptions for new partitions when needed (#18659)
* [fix][broker] DnsResolverUtil.TTL should be greater than zero (#18565)
* [fix][broker] Correctly set byte and message out totals per subscription (#18451)
* [fix][broker] fix delete_when_subscriptions_caught_up doesn't work while have active consumers (#18320)
* [improve][broker]consumer backlog eviction policy should not reset read position for consumer (#18037)
* [fix][broker] Fix NPE when ResourceGroupService execute scheduled task. #17840
* [fix][storage] Autorecovery default reppDnsResolverClass to ZkBookieRackAffinityMapping (#15640)
* [broker] Fixed delayed delivery after read operation error (#18098)
* [fix][broker] Fix issue where leader broker information isn't available after 10 minutes (#17401)
* [fix][broker] Make full async call in PulsarAuthorizationProvider (#18050)

### Transaction

* [fix][txn] Transaction buffer recover blocked by readNext #18833
* [fix][txn] transaction pending ack store future not completely problem (#18943)
* [fix][txn] Fix PendingAckHandleImpl when `pendingAckStoreProvider.checkInitializedBefore` failed (#18859)
* [improve][txn] Add getState in transaction for client API (#17423)
* [improve][txn] Implementation of Delayed Transaction Messages (#17548)

### Pulsar IO and Pulsar Functions

* [fix][io] Only bundle kafka schema registry client (#18931)
* [fix][fn] Typo in method name (#18844)
* [fix][function] Fix invalid metric type `gauge ` (#18129)
* [fix][fn] fix function failed to start if no `typeClassName` provided in `FunctionDetails` (#18111)

### Tiered Storage

* [fix][offload] Fix numerical overflow bug while reading data from tiered storage (#18595)
* [fix][offload] Fix memory leak while Offloading ledgers (#18500)

### Pulsar SQL

* [fix][sql] Fix message without schema issue. (#18745)

### CLI

* [fix][cli] Fix CLI client produce don't able to use multiple -m send multiple messages (#18238)
* [fix][cli] Check numMessages after incrementing counter #17826

## Admin

* [improve][admin] Fix NPE in admin-CLI topic stats command (#18326)
* [improve][admin] add topic name and sub name for NotFound error message (#15606)
* PIP-105: new API to get subscription properties #16095
* [fix][admin] returns 4xx error when pulsar-worker-service is disabled and trying to access it (#17901)
* Pulsar Admin: grab contextual stacktrace for sync methods (#14620)
* [fix][admin] Fix NPE when get OffloadThreshold on namespace (#18061)

### Security

* [fix][sec] Upgrade scala-library to get rid of CVE-2022-36944 (#18021)
* [Improve][Auth]Update authentication failed metrics report (#17787)
* [fix][sec] Upgrade jackson-databind to 2.13.4.2 to get rid of CVE-2022-42003 (#18394)
* [fix][sec] Upgrade protobuf to 3.19.6 to get rid of CVE-2022-3171 (#18086)
* [fix][sec] File tiered storage: upgrade jettison to get rid of CVE-2022-40149 (#18022)
* [fix][sec] Upgrade JacksonXML to 2.13.4 (#18020)

### Dependency & Library updates

* Bump jackson version from 2.13.2 to 2.13.3 #16508
* Remove invalid Netty system property which never was valid for Netty 4.1.x (#13563)
* [improve][misc] Upgrade Netty to 4.1.86.Final and Netty Tcnative to 2.0.54.Final (#18599)
* [improve][build] Remove versions that are handled by netty-bom (#18629)

### CI & Test

* [improve][test] force initialize field to avoid polluted by mocks (#17022)
* [fix][flaky-test]ManagedCursorMetricsTest.testManagedCursorMetrics (#16878)
* [improve][test] remove WhiteBox on MockZooKeeper #17579
* [improve][test] try remove whitebox on MockZooKeeper (#17579)
* [improve][test] Add test case for system topic schema not compatible bug. (#17992)
* [fix][flaky-test]BatchMessageWithBatchIndexLevelTest.testBatchMessageAck (#17436)
* [fix][test]The pulsarMessageOverhead in 2.10 is different (#18704)
* [improve][test] Add subscribing regex topic test for `delete_when_subscriptions_caught_up`. (#18368)

### Others

* [fix][metrics]wrong metrics text generated when label_cluster specified #17704
* [fix][meta] fix getChildren in MemoryMetadataStore and EtcdMetadataStore (#18172)
* [improve][schema] Change update schema auth from tenant to produce (#18074)
* [fix][schema]ledger handle leak when update schema (#17283)
* [fix][metrics] fixed ProxyStats to use common.stats.JvmMetrics (#15692)
* [refactor][java] Improve docs and code quality about KeyValueSchema usages (#17256)
* Allow to configure and disable the size of lookahead for detecting fixed delays in messages #17907
* [refactor][java] Unify the acknowledge process for batch and non-batch message IDs #17833
* [fix][common] Fix parsing partitionedKey with Base64 encode issue. (#17687)
* [fix][schema] Fix cherry-pick issue from #18283 (#18555)
* [fix][monitor] fix metrics string encoding (#18138)
