---
id: pulsar-2.7.4
title: Apache Pulsar 2.7.4 
sidebar_label: Apache Pulsar 2.7.4 
---

## security
Bump log4j to 2.15.0 [#13226](https://github.com/apache/pulsar/pull/13226)  
[security] Upgrade netty to 4.1.68.Final [#12218](https://github.com/apache/pulsar/pull/12218)  
[Branch-2.7]Forbid to read other topic's data in managedLedger layer [#11913](https://github.com/apache/pulsar/pull/11913)  
Forbid to read other topic's data in managedLedger layer [#11912](https://github.com/apache/pulsar/pull/11912)  
[Broker] Support disabling non-TLS service ports [#11681](https://github.com/apache/pulsar/pull/11681)  
[Security] Upgrade Jetty to 9.4.43.v20210629 [#11660](https://github.com/apache/pulsar/pull/11660)  
[Security] Upgrade commons-compress to 1.21 [#11345](https://github.com/apache/pulsar/pull/11345)  
[broker] fix `GetTopicsOfNamespace` with binary lookup service not check auth [#11172](https://github.com/apache/pulsar/pull/11172)  

## broker
[Broker] Optimize ManagedLedger Ledger Ownership Check [#13222](https://github.com/apache/pulsar/pull/13222)  
Do not reuse the Failed OpAddEntry object which lead bundle unloading timeout. [#12993](https://github.com/apache/pulsar/pull/12993)  
Allow to configure schema compatibility policy for system topics [#12598](https://github.com/apache/pulsar/pull/12598)  
[ML] Add OpAddEntry to pendingAddEntries after the state check [#12570](https://github.com/apache/pulsar/pull/12570)  
[broker] Cancel scheduled tasks when deleting ManagedLedgerImpl [#12565](https://github.com/apache/pulsar/pull/12565)  
[managedledger] NPE on OpAddEntry while ManagedLedger is closing [#12364](https://github.com/apache/pulsar/pull/12364)  
Optimize the memory usage of Cache Eviction [#12045](https://github.com/apache/pulsar/pull/12045)  
Fix update ledger list to znode version mismatch failed, ledger not delete [#12015](https://github.com/apache/pulsar/pull/12015)  
[Broker] Refine topic level backlog quota policies warning log [#11863](https://github.com/apache/pulsar/pull/11863)  
[Broker] Remove RateLimiter constructors and replace with builder usage [#11599](https://github.com/apache/pulsar/pull/11599)  
[issue #13351] Solving precise rate limiting does not takes effect [#11446](https://github.com/apache/pulsar/pull/11446)  
[Broker] Fix replicated subscriptions direct memory leak [#11396](https://github.com/apache/pulsar/pull/11396)  
[Broker] Fix set-publish-rate when using preciseTopicPublishRateLimiterEnable=true [#10384](https://github.com/apache/pulsar/pull/10384)  
[Issue 8599] Fix DispatchRateLimiter does not take effect [#8611](https://github.com/apache/pulsar/pull/8611)  

## function
Issue 12645: Pulsar Functions: detect .nar files and prevent spammy logs on functions boot [branch-2.7] [#12665](https://github.com/apache/pulsar/pull/12665)  
[pulsar-io] fix source stats exposing empty exceptions list [#11478](https://github.com/apache/pulsar/pull/11478)  
[Branch-2.7] Fixes function api can not use authdata to check superuser [#11418](https://github.com/apache/pulsar/pull/11418)  

## dashboard
[Branch-2.7]Remove pulsar-dashboard from the publish process of images [#12534](https://github.com/apache/pulsar/pull/12534)  

## build
[Branch-2-7] Roll back to using Java 8 for docker images [#12357](https://github.com/apache/pulsar/pull/12357)  
[Branch-2.7][Build] Fix docker image install python3.7-dev problem [#11943](https://github.com/apache/pulsar/pull/11943)  
Fix expired tls certs for cpp tests [#9607](https://github.com/apache/pulsar/pull/9607)  

## tieredstorage
Fix the potential race condition in the BlobStore readhandler [#12123](https://github.com/apache/pulsar/pull/12123)  

## connect
Remove the deprecated api usage in hdfs [#12080](https://github.com/apache/pulsar/pull/12080)  

## topic-policy
[Branch-2.7][Broker] Fix using partitioned topic name to get topic policies [#11897](https://github.com/apache/pulsar/pull/11897)  
Avoid redundant calls for getting the offload policies from the offloader [#11629](https://github.com/apache/pulsar/pull/11629)  
[Cherry-pick] Add backoff for setting for getting topic policies to branch-2.7 [#11574](https://github.com/apache/pulsar/pull/11574)  
Fix some topic policy operation without backoff [#11560](https://github.com/apache/pulsar/pull/11560)  
Add backoff for setting for getting topic policies. [#11487](https://github.com/apache/pulsar/pull/11487)  
Disable replicate system topic across clusters. [#11376](https://github.com/apache/pulsar/pull/11376)  
Fix using partitioned topic name to get Policy [#11294](https://github.com/apache/pulsar/pull/11294)  
fix retention policy in topic policy not work [#11021](https://github.com/apache/pulsar/pull/11021)  

## storage
[ManagedLedger] Compress managed ledger info [#11490](https://github.com/apache/pulsar/pull/11490)  

## admin
[Issue 11339] Pulsar Admin List Subscription lists only subscriptions created for Partition-0 when partition specific subscriptions are created [#11355](https://github.com/apache/pulsar/pull/11355)  

## compaction
Fixed retention of keys in compaction [#11287](https://github.com/apache/pulsar/pull/11287)  

## test
fix flaky test in AdminApiOffloadTest [#11028](https://github.com/apache/pulsar/pull/11028)  
[Test] Upgrade Testcontainers version to 1.15.3 and use bom [#10321](https://github.com/apache/pulsar/pull/10321)  
Upgrade TestContainers to 1.15.1 [#9120](https://github.com/apache/pulsar/pull/9120)  

