---
id: pulsar-2.7.4
title: Apache Pulsar 2.7.4 
sidebar_label: Apache Pulsar 2.7.4 
---

#### 2021-12-14

#### Security

- Upgrade log4j to 2.17.0 - [CVE-2021-45105](https://pulsar.apache.org/blog/2021/12/11/Log4j-CVE/). [#13392](https://github.com/apache/pulsar/pull/13392)
- Upgrade commons-compress to 1.21 - CVE-2021-35515, CVE-2021-35516, CVE-2021-35517 and CVE-2021-36090. [#11345](https://github.com/apache/pulsar/pull/11345)

#### Broker

- Fix DispatchRateLimiter does not take effect. [#8611](https://github.com/apache/pulsar/pull/8611)
- Fix set-publish-rate when using preciseTopicPublishRateLimiterEnable=true. [#10384](https://github.com/apache/pulsar/pull/10384)
- Fix retention policy in topic policy not work. [#11021](https://github.com/apache/pulsar/pull/11021)
- Fix GetTopicsOfNamespace with binary lookup service not check auth. [#11172](https://github.com/apache/pulsar/pull/11172)
- Fix retention of keys in compaction. [#11287](https://github.com/apache/pulsar/pull/11287)
- Fix using partitioned topic name to get Policy. [#11294](https://github.com/apache/pulsar/pull/11294)
- Fix NPE when unloading persistent partitioned topic. [#11310](https://github.com/apache/pulsar/pull/11310)
- Remove RateLimiter constructors and replace with builder usage. [#11599](https://github.com/apache/pulsar/pull/11599)
- Add backoff for setting for getting topic policies. [#11574](https://github.com/apache/pulsar/pull/11574)
- Fix decode compression managedLedgerInfo data. [#11569](https://github.com/apache/pulsar/pull/11569)
- Fix some topic policy operation without backoff. [#11560](https://github.com/apache/pulsar/pull/11560)
- Fix data lost when using earliest position to subscribe to a topic. [#11547](https://github.com/apache/pulsar/pull/11547)
- Fix the schema deletion when delete topic with delete schema. [#11501](https://github.com/apache/pulsar/pull/11501)
- Do not create system topic for heartbeat namespace. [#11499](https://github.com/apache/pulsar/pull/11499)
- Compress managed ledger info. [#11490](https://github.com/apache/pulsar/pull/11490)
- Add backoff for setting for getting topic policies. [#11487](https://github.com/apache/pulsar/pull/11487)
- Solving precise rate limiting does not take effect. [#11446](https://github.com/apache/pulsar/pull/11446)
- Fix replicated subscriptions direct memory leak. [#11396](https://github.com/apache/pulsar/pull/11396)
- Close the replicator and replication client when deleting cluster. [#11390](https://github.com/apache/pulsar/pull/11390)
- Invalidate the read handle after all cursors are consumed. [#11389](https://github.com/apache/pulsar/pull/11389)
- Fix NPE when unloading persistent partitioned topic. [#11386](https://github.com/apache/pulsar/pull/11386)
- Fix retention of keys in compaction. [#11384](https://github.com/apache/pulsar/pull/11384)
- Disable replicate system topic across clusters. [#11376](https://github.com/apache/pulsar/pull/11376)
- Parallel Precise Publish Rate Limiting Fix. [#11372](https://github.com/apache/pulsar/pull/11372)
- Pulsar Admin List Subscription lists only subscriptions created for Partition-0 when partition specific subscriptions are created. [#11355](https://github.com/apache/pulsar/pull/11355)
- Fix inconsistent behavior for Namespace bundles cache. [#11346](https://github.com/apache/pulsar/pull/11346)
- Fix update ledger list to znode version mismatch failed, ledger not delete. [#12015](https://github.com/apache/pulsar/pull/12015)
- Print position info when can't find next valid position. [#11969](https://github.com/apache/pulsar/pull/11969)
- Forbid to read other topic's data in managedLedger layer. [#11913](https://github.com/apache/pulsar/pull/11913)
- Fix using partitioned topic name to get topic policies. [#11897](https://github.com/apache/pulsar/pull/11897)
- Refine topic level backlog quota policies warning log. [#11863](https://github.com/apache/pulsar/pull/11863)
- Producer getting producer busy is removing existing producer from list. [#11804](https://github.com/apache/pulsar/pull/11804)
- Handle NPE and memory leak when full key range isn't covered with active consumers. [#11749](https://github.com/apache/pulsar/pull/11749)
- Call .release() when discarding entry to prevent direct memory leak. [#11748](https://github.com/apache/pulsar/pull/11748)
- Fix the topic in fenced state and can not recover. [#11737](https://github.com/apache/pulsar/pull/11737)
- Support disabling non-TLS service ports. [#11724](https://github.com/apache/pulsar/pull/11724)
- Fix the bug, can not update topic when the update topicName is contained by an existed topic as a part. [#11686](https://github.com/apache/pulsar/pull/11686)
- Fix Pulsar didn't respond error messages when throw InterceptException. [#11650](https://github.com/apache/pulsar/pull/11650)
- Avoid redundant calls for getting the offload policies from the offloader. [#11629](https://github.com/apache/pulsar/pull/11629)
- Optimize ManagedLedger Ledger Ownership Check. [#13222](https://github.com/apache/pulsar/pull/13222)
- Do not reuse the Failed OpAddEntry object which lead bundle unloading timeout. [#12993](https://github.com/apache/pulsar/pull/12993)
- Fix producer getting incorrectly removed from topic's producers map. [#12846](https://github.com/apache/pulsar/pull/12846)
- Allow to configure schema compatibility policy for system topics. [#12598](https://github.com/apache/pulsar/pull/12598)
- Cleanup already deleted namespace topics. [#12583](https://github.com/apache/pulsar/pull/12583)
- Add OpAddEntry to pendingAddEntries after the state check. [#12570](https://github.com/apache/pulsar/pull/12570)
- Cancel scheduled tasks when deleting ManagedLedgerImpl. [#12565](https://github.com/apache/pulsar/pull/12565)
- NPE on OpAddEntry while ManagedLedger is closing. [#12364](https://github.com/apache/pulsar/pull/12364)
- Avoid potentially blocking calls to metadata on critical threads. [#12340](https://github.com/apache/pulsar/pull/12340)
- Fix used after recycle issue in OpAddEntry. [#12103](https://github.com/apache/pulsar/pull/12103)
- Optimize the memory usage of Cache Eviction. [#12045](https://github.com/apache/pulsar/pull/12045)
- Fix wrong key-hash selector used for new consumers after all the previous consumers disconnected. [#12035](https://github.com/apache/pulsar/pull/12035)
- Only auth_errors should log at error level. [#9325](https://github.com/apache/pulsar/pull/9325)

#### Dependency upgrade
- Remove Boost::System runtime dependency. [#9498](https://github.com/apache/pulsar/pull/9498)
- Upgrade Jetty to 9.4.43.v20210629. [#11660](https://github.com/apache/pulsar/pull/11660)
- Add maven.restlet.org repository. [#13248](https://github.com/apache/pulsar/pull/13248)
- Upgrade ZooKeeper version to 3.5.9. [#12981](https://github.com/apache/pulsar/pull/12981)
- Remove pulsar-dashboard from the publish process of images. [#12534](https://github.com/apache/pulsar/pull/12534)
- Roll back to using Java 8 for docker images. [#12357](https://github.com/apache/pulsar/pull/12357)
- Upgrade TestContainers to 1.15.1. [#9120](https://github.com/apache/pulsar/pull/9120)

#### Client

- [Pulsar perf] Fix log level config for pulsar-admin, pulsar-client and pulsar-perf. [#12915](https://github.com/apache/pulsar/pull/12915)

#### Functions and Pulsar IO

- Fix source stats exposing empty exceptions list. [#11478](https://github.com/apache/pulsar/pull/11478)
- Fix function API can not use authdata to check superuser. [#11418](https://github.com/apache/pulsar/pull/11418)
- Support setting KEY_BASED batch builder for Pulsar Sinks. [#11710](https://github.com/apache/pulsar/pull/11710)
- Detect .nar files and prevent spammy logs on functions boot. [#12665](https://github.com/apache/pulsar/pull/12665)
- Remove the deprecated api usage in hdfs. [#12080](https://github.com/apache/pulsar/pull/12080)

#### Tiered Storage

- Fix the potential race condition in the BlobStore readhandler. [#12123](https://github.com/apache/pulsar/pull/12123)

#### Build

- Force CMake to find Python2. [#9690](https://github.com/apache/pulsar/pull/9690)
- Use ubuntu 20.04 as docker image base. [#12017](https://github.com/apache/pulsar/pull/12017)
- Fix docker image install python3.7-dev problem. [#11942](https://github.com/apache/pulsar/pull/11942)