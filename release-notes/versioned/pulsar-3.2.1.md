---
id: pulsar-3.2.1
title: Apache Pulsar 3.2.1
sidebar_label: Apache Pulsar 3.2.1
---

#### 2024-03-08

### Broker
- Consistently add fine-grain authorization to REST API [#22202](https://github.com/apache/pulsar/pull/22202)
- Add fine-grain authorization to retention admin API [#22163](https://github.com/apache/pulsar/pull/22163)
- Print non log when delete partitioned topic failed [#22153](https://github.com/apache/pulsar/pull/22153)
- Fix broker not starting when both transactions and the Extensible Load Manager are enabled [#22139](https://github.com/apache/pulsar/pull/22139)
- Return getOwnerAsync without waiting on source broker upon Assigning and Releasing and handle role change during role init [#22112](https://github.com/apache/pulsar/pull/22112)
- Cache the internal writer when sent to system topic. [#22099](https://github.com/apache/pulsar/pull/22099)
- Enabling batch causes negative unackedMessages due to ack and delivery concurrency [#22090](https://github.com/apache/pulsar/pull/22090)
- Support running docker container with gid != 0 [#22081](https://github.com/apache/pulsar/pull/22081)
- Add an error log to troubleshoot the failure of starting broker registry [#22065](https://github.com/apache/pulsar/pull/22065)
- Set ServiceUnitStateChannel topic compaction threshold explicitly, improve getOwnerAsync, and fix other bugs [#22064](https://github.com/apache/pulsar/pull/22064)
- Fix hash collision when using a consumer name that ends with a number [#22053](https://github.com/apache/pulsar/pull/22053)
- Sanitize values before logging in apply-config-from-env.py script [#22044](https://github.com/apache/pulsar/pull/22044)
- Fix can not subscribe partitioned topic with a suffix-matched regexp [#22025](https://github.com/apache/pulsar/pull/22025)
- Do not retain the data in the system topic [#22022](https://github.com/apache/pulsar/pull/22022)
- Subscription stuck due to called Admin API analyzeSubscriptionBacklog [#22019](https://github.com/apache/pulsar/pull/22019)
- Do not try to open ML when the topic meta does not exist and do not expect to create a new one [#22004](https://github.com/apache/pulsar/pull/22004)
- Do not print an Error log when responding to HTTP-404 when calling Admin API and the topic does not exist [#21995](https://github.com/apache/pulsar/pull/21995)
- Do not close the socket if lookup failed due to LockBusyException [#21993](https://github.com/apache/pulsar/pull/21993)
- Support setting autoSkipNonRecoverableData dynamically in PersistentMessageExpiryMonitor [#21991](https://github.com/apache/pulsar/pull/21991)
- Add timeout for health check read [#21990](https://github.com/apache/pulsar/pull/21990)
- Fix schema deletion error when deleting a partitioned topic with many partitions and schema [#21977](https://github.com/apache/pulsar/pull/21977)
- Defer the ownership checks if the owner is inactive (ExtensibleLoadManager) [#21811](https://github.com/apache/pulsar/pull/21811)
- Fix compaction/replication data loss when expire messages [#21865](https://github.com/apache/pulsar/pull/21865)
- Skip loading the NAR packages if not configured [#21867](https://github.com/apache/pulsar/pull/21867)
- Improve NamespaceUnloadStrategy error message [#21880](https://github.com/apache/pulsar/pull/21880)
- Don't rollover empty ledgers based on inactivity [#21893](https://github.com/apache/pulsar/pull/21893)
- Expire messages according to ledger close time to avoid client clock skew [#21940](https://github.com/apache/pulsar/pull/21940)
- Fix reader stuck when read from compacted topic with read compact mode disable [#21969](https://github.com/apache/pulsar/pull/21969)


### Pulsar IO and Pulsar Functions
- [FN] Add configuration for connector & functions package url sources [#22184](https://github.com/apache/pulsar/pull/22184)
- [FN] Add missing "exception" argument to some log.error [#22140](https://github.com/apache/pulsar/pull/22140)
- [FN] Prevent putstate uses empty values [#22127](https://github.com/apache/pulsar/pull/22127)
- [FN] Optimize Function Worker startup by lazy loading and direct zip/bytecode access [#22122](https://github.com/apache/pulsar/pull/22122)
- [FN] Prevent create state table from API calls for non-exists instances [#22107](https://github.com/apache/pulsar/pull/22107)
- [FN] Use unified PackageManagement service to download packages [#21955](https://github.com/apache/pulsar/pull/21955)

### CLI
- [Admin] Expose the offload threshold in seconds to the admin [#22101](https://github.com/apache/pulsar/pull/22101)
- [CLI] Fix the bug when set-retention specified size with -T [#22150](https://github.com/apache/pulsar/pull/22150)
- [CLI] Error out when --destinationBroker is set when --bundle is empty [#21879](https://github.com/apache/pulsar/pull/21879)

### Others
- [MISC] Add a check for the input time value [#22023](https://github.com/apache/pulsar/pull/22023)
- [Proxy] Add a check for brokerServiceURL that does not support multi uri yet [#21972](https://github.com/apache/pulsar/pull/21972)
- [TX] Get previous position by managed ledger [#22024](https://github.com/apache/pulsar/pull/22024)
- [ML] Fix retry mechanism of deleting ledgers to invalidate [#21869](https://github.com/apache/pulsar/pull/21869)
- [ML] Filter out deleted entries before read entries from ledger [#21739](https://github.com/apache/pulsar/pull/21739)


### Library updates
- Upgrade Jetty to 9.4.54.v20240208 to address CVE-2024-22201 [#22144](https://github.com/apache/pulsar/pull/22144)
- pgrade commons-compress to 1.26.0 [#22086](https://github.com/apache/pulsar/pull/22086)
- Upgrade BookKeeper dependency to 4.16.4 [#21983](https://github.com/apache/pulsar/pull/21983)


> A special thanks to the following contributors who contributed to Pulsar 3.2.1:
> mattisonchao, lhotari, poorbarcode, Technoboy-, jiangpengcheng, dragosvictor, freeznet, liangyepianzhou, heesung-sn, zymap, massakam, thetumbled, BewareMyPower, chenhongSZ, Shawyeok, hangc0276, 315157973, coderzc, dao-jun.
