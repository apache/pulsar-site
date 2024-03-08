---
id: pulsar-3.1.3
title: Apache Pulsar 3.1.3
sidebar_label: Apache Pulsar 3.1.3
---

#### 2024-03-09

### Broker

- [improve][broker] Consistently add fine-grain authorization to REST API [#22202](https://github.com/apache/pulsar/pull/22202) (@mattisonchao)
- [improve][broker] Add fine-grain authorization to retention admin API [#22163](https://github.com/apache/pulsar/pull/22163) (@mattisonchao)
- [improve][broker] Cache the internal writer when sent to system topic. [#22099](https://github.com/apache/pulsar/pull/22099) (@Technoboy-)
- [improve][broker] Add an error log to troubleshoot the failure of starting broker registry. [#22065](https://github.com/apache/pulsar/pull/22065) (@liangyepianzhou)
- [improve][broker] Do not retain the data in the system topic [#22022](https://github.com/apache/pulsar/pull/22022) (@liangyepianzhou)
- [improve][broker] Do not try to open ML when the topic meta does not exist and do not expect to create a new one. #21995 [#22004](https://github.com/apache/pulsar/pull/22004) (@poorbarcode)
- [improve][broker] Do not print an Error log when responding to `HTTP-404` when calling `Admin API` and the topic does not exist. [#21995](https://github.com/apache/pulsar/pull/21995) (@poorbarcode)
- [improve][broker] Do not close the socket if lookup failed due to LockBusyException [#21993](https://github.com/apache/pulsar/pull/21993) (@BewareMyPower)
- [improve][broker] Don't rollover empty ledgers based on inactivity [#21893](https://github.com/apache/pulsar/pull/21893) (@lhotari)
- [improve][broker] Improve NamespaceUnloadStrategy error message [#21880](https://github.com/apache/pulsar/pull/21880) (@dragosvictor)
- [improve][broker] Skip loading the NAR packages if not configured [#21867](https://github.com/apache/pulsar/pull/21867) (@BewareMyPower)
- [improve][broker] defer the ownership checks if the owner is inactive (ExtensibleLoadManager) [#21811](https://github.com/apache/pulsar/pull/21811) (@heesung-sn)
- [improve][broker] cleanup the empty subscriptionAuthenticationMap in zk when revoke subscription permission [#21696](https://github.com/apache/pulsar/pull/21696) (@TakaHiR07)
- [improve][broker] Not close the socket if lookup failed caused by bundle unloading or metadata ex [#21211](https://github.com/apache/pulsar/pull/21211) (@poorbarcode)
- [fix][broker][branch-3.1] Fix broker not starting when both transactions and the Extensible Load Manager are enabled [#22194](https://github.com/apache/pulsar/pull/22194) (@dragosvictor)
- [fix][broker] print non log when delete partitioned topic failed [#22153](https://github.com/apache/pulsar/pull/22153) (@poorbarcode)
- [fix][broker] Return getOwnerAsync without waiting on source broker upon Assigning and Releasing and handle role change during role init [#22112](https://github.com/apache/pulsar/pull/22112) (@heesung-sn)
- [fix][broker] Enabling batch causes negative unackedMessages due to ack and delivery concurrency [#22090](https://github.com/apache/pulsar/pull/22090) (@poorbarcode)
- [fix][broker] Support running docker container with gid != 0 [#22081](https://github.com/apache/pulsar/pull/22081) (@lhotari)
- [fix][broker] Set ServiceUnitStateChannel topic compaction threshold explicitly, improve getOwnerAsync, and fix other bugs [#22064](https://github.com/apache/pulsar/pull/22064) (@heesung-sn)
- [fix][broker] Fix hash collision when using a consumer name that ends with a number [#22053](https://github.com/apache/pulsar/pull/22053) (@lhotari)
- [fix][broker] Sanitize values before logging in apply-config-from-env.py script [#22044](https://github.com/apache/pulsar/pull/22044) (@lhotari)
- [fix][broker] Fix can not subscribe partitioned topic with a suffix-matched regexp [#22025](https://github.com/apache/pulsar/pull/22025) (@poorbarcode)
- [fix][broker] Subscription stuck due to called Admin API analyzeSubscriptionBacklog [#22019](https://github.com/apache/pulsar/pull/22019) (@poorbarcode)
- [fix][broker][branch-3.1] Avoid PublishRateLimiter use an already closed RateLimiter [#22011](https://github.com/apache/pulsar/pull/22011) (@coderzc)
- [fix][broker] Support setting `autoSkipNonRecoverableData` dynamically in expiryMon… [#21991](https://github.com/apache/pulsar/pull/21991) (@chenhongSZ)
- [fix][broker] add timeout for health check read. [#21990](https://github.com/apache/pulsar/pull/21990) (@thetumbled)
- [fix][broker] Fix schema deletion error when deleting a partitioned topic with many partitions and schema [#21977](https://github.com/apache/pulsar/pull/21977) (@heesung-sn)
- [fix][broker] Fix reader stuck when read from compacted topic with read compact mode disable [#21969](https://github.com/apache/pulsar/pull/21969) (@thetumbled)
- [fix][broker] Replication stopped due to unload topic failed [#21947](https://github.com/apache/pulsar/pull/21947) (@poorbarcode)
- [fix][broker] Expire messages according to ledger close time to avoid client clock skew [#21940](https://github.com/apache/pulsar/pull/21940) (@315157973)
- [fix][broker] Restore the broker id to match the format used in existing Pulsar releases [#21937](https://github.com/apache/pulsar/pull/21937) (@lhotari)
- [fix][broker] Fix getMessageById throws 500 [#21919](https://github.com/apache/pulsar/pull/21919) (@nodece)
- [fix][broker] fix write all compacted out entry into compacted topic [#21917](https://github.com/apache/pulsar/pull/21917) (@thetumbled)
- [fix][broker] Fix deadlock while skip non-recoverable ledgers. [#21915](https://github.com/apache/pulsar/pull/21915) (@hrzzzz)
- [fix][broker] Fix leader broker cannot be determined when the advertised address and advertised listeners are configured [#21894](https://github.com/apache/pulsar/pull/21894) (@lhotari)
- [fix][broker] Fix break change: could not subscribe partitioned topic with a suffix-matched regexp due to a mistake of PIP-145 [#21885](https://github.com/apache/pulsar/pull/21885) (@poorbarcode)
- [fix][broker] Fix compaction/replication data loss when expire messages [#21865](https://github.com/apache/pulsar/pull/21865) (@coderzc)
- [fix][broker] Fix NonPersistentDispatcherMultipleConsumers ArrayIndexOutOfBoundsException [#21856](https://github.com/apache/pulsar/pull/21856) (@Technoboy-)
- [fix][broker] Fix returns wrong webServiceUrl when both webServicePort and webServicePortTls are set [#21842](https://github.com/apache/pulsar/pull/21842) (@Technoboy-)
- [fix][broker] Fix TableViewLoadDataStoreImpl NPE [#21777](https://github.com/apache/pulsar/pull/21777) (@Demogorgon314)
- [fix][broker] Fix the wrong value of BrokerSrevice.maxUnackedMsgsPerDispatcher [#21765](https://github.com/apache/pulsar/pull/21765) (@aloyszhang)
- [fix][broker] Fixed the ExtensibleLoadManagerImpl internal system getTopic failure when the leadership changes [#21764](https://github.com/apache/pulsar/pull/21764) (@heesung-sn)
- [fix][broker] Delete compacted ledger when topic is deleted [#21745](https://github.com/apache/pulsar/pull/21745) (@coderzc)
- [fix][broker] Skip topic auto-creation for ExtensibleLoadManager internal topics [#21729](https://github.com/apache/pulsar/pull/21729) (@heesung-sn)
- [fix][broker] Avoid compaction task stuck when the last message to compact is a marker [#21718](https://github.com/apache/pulsar/pull/21718) (@coderzc)
- [fix][broker] Fix the issue of topics possibly being deleted. [#21704](https://github.com/apache/pulsar/pull/21704) (@crossoverJie)
- [fix][broker] network package lost if enable haProxyProtocolEnabled [#21684](https://github.com/apache/pulsar/pull/21684) (@poorbarcode)
- [fix][broker] Fix memory leak during topic compaction [#21647](https://github.com/apache/pulsar/pull/21647) (@coderzc)
- [fix][broker] Fix lookupRequestSemaphore leak when topic not found [#21646](https://github.com/apache/pulsar/pull/21646) (@pengxiangrui127)
- [fix][broker] Fix returns wrong webServiceUrl when both webServicePort and webServicePortTls are set [#21633](https://github.com/apache/pulsar/pull/21633) (@coderzc)
- [fix][broker] Fixed getting incorrect KeyValue schema version [#21632](https://github.com/apache/pulsar/pull/21632) (@Technoboy-)
- [fix][broker] Fix issue with GetMessageIdByTimestamp can't find match messageId from compacted ledger [#21600](https://github.com/apache/pulsar/pull/21600) (@coderzc)
- [fix][broker] Fix incorrect unack count when using shared subscription on non-persistent topic [#21592](https://github.com/apache/pulsar/pull/21592) (@1Jack2)
- [fix][broker] Correct schema deletion for partitioned topic [#21574](https://github.com/apache/pulsar/pull/21574) (@poorbarcode)
- [fix][broker] Avoid consumers receiving acknowledged messages from compacted topic after reconnection [#21187](https://github.com/apache/pulsar/pull/21187) (@coderzc)
- [fix][broker] Fix PulsarService.getLookupServiceAddress returns wrong port if TLS is enabled [#21015](https://github.com/apache/pulsar/pull/21015) (@Technoboy-)
- [fix][txn] Fix TopicTransactionBuffer potential thread safety issue [#22149](https://github.com/apache/pulsar/pull/22149) (@dao-jun)
- [fix][txn] Get previous position by managed ledger. [#22024](https://github.com/apache/pulsar/pull/22024) (@thetumbled)
- [fix][txn] Fix getting last message ID when there are ongoing transactions [#21466](https://github.com/apache/pulsar/pull/21466) (@liangyepianzhou)
- [fix][offload] Fix Offload readHandle cannot close multi times. [#22162](https://github.com/apache/pulsar/pull/22162) (@dao-jun)
- [improve][ml] Filter out deleted entries before read entries from ledger. [#21739](https://github.com/apache/pulsar/pull/21739) (@dao-jun)
- [fix][ml] Fix retry mechanism of deleting ledgers to invalidate [#21869](https://github.com/apache/pulsar/pull/21869) (@poorbarcode)
- [fix][ml] Make mlOwnershipChecker asynchronous so that it doesn't block/deadlock threads [#21333](https://github.com/apache/pulsar/pull/21333) (@lhotari)

### Admin

- [improve][admin] Expose the offload threshold in seconds to the admin [#22101](https://github.com/apache/pulsar/pull/22101) (@zymap)
- [improve][admin] Add clusters check when set replication clusters [#21650](https://github.com/apache/pulsar/pull/21650) (@Technoboy-)
- [fix][admin] Fix KeyValue schema compatibility check caused OOM [#21645](https://github.com/apache/pulsar/pull/21645) (@Technoboy-)

### Pulsar IO and Pulsar Functions

- [improve][fn] Add configuration for connector & functions package url sources [#22184](https://github.com/apache/pulsar/pull/22184) (@lhotari)
- [improve][fn] Optimize Function Worker startup by lazy loading and direct zip/bytecode access [#22122](https://github.com/apache/pulsar/pull/22122) (@lhotari)
- [improve][io] Make connectors load sensitive fields from secrets [#21675](https://github.com/apache/pulsar/pull/21675) (@jiangpengcheng)
- [fix][fn] Use unified PackageManagement service to download packages [#21955](https://github.com/apache/pulsar/pull/21955) (@jiangpengcheng)
- [fix][fn] Fix Deadlock in Functions Worker LeaderService [#21711](https://github.com/apache/pulsar/pull/21711) (@Technoboy-)

### Proxy

- [improve][proxy] Add a check for brokerServiceURL that does not support multi uri yet [#21972](https://github.com/apache/pulsar/pull/21972) (@poorbarcode)
- [improve][proxy] Fix comment about enableProxyStatsEndpoints [#21757](https://github.com/apache/pulsar/pull/21757) (@lhotari)

### Misc

- [improve][bk] Upgrade BookKeeper dependency to 4.16.4 [#21983](https://github.com/apache/pulsar/pull/21983) (@hangc0276)
- [improve][ci] Upgrade pulsar-client-python to 3.4.0 to avoid CVE-2023-1428 [#21899](https://github.com/apache/pulsar/pull/21899) (@BewareMyPower)
- [improve][build] Add a default username in the image [#21695](https://github.com/apache/pulsar/pull/21695) (@zymap)
- [improve][build] Upgrade Apache ZooKeeper to 3.9.1 [#20933](https://github.com/apache/pulsar/pull/20933) (@eolivelli)
- [fix][sec] Upgrade Jetty to 9.4.54.v20240208 to address CVE-2024-22201 [#22144](https://github.com/apache/pulsar/pull/22144) (@lhotari)
- [fix][sec] Upgrade commons-compress to 1.26.0 [#22086](https://github.com/apache/pulsar/pull/22086) (@massakam)
- [fix][sec] Add a check for the input time value [#22023](https://github.com/apache/pulsar/pull/22023) (@liangyepianzhou)
- [fix][sec] Upgrade org.bouncycastle:bc-fips to 1.0.2.4 [#21730](https://github.com/apache/pulsar/pull/21730) (@massakam)
- [fix][sec] Exclude avro from hadoop-client [#21719](https://github.com/apache/pulsar/pull/21719) (@liangyepianzhou)
- [fix][test] Fix test testAsyncFunctionMaxPending [#22121](https://github.com/apache/pulsar/pull/22121) (@liangyepianzhou)
- [fix][test] fix test testSyncNormalPositionWhenTBRecover [#22120](https://github.com/apache/pulsar/pull/22120) (@liangyepianzhou)
- [fix][test] Fix test testTransactionBufferMetrics [#22117](https://github.com/apache/pulsar/pull/22117) (@liangyepianzhou)
- [fix][test] Make base test class method protected so that it passes ReportUnannotatedMethods validation [#21976](https://github.com/apache/pulsar/pull/21976) (@lhotari)
- [fix][test] Fix PerformanceProducer send count error [#21706](https://github.com/apache/pulsar/pull/21706) (@Technoboy-)
- [fix][test] ProxyWithoutServiceDiscoveryTest should enable authz [#20348](https://github.com/apache/pulsar/pull/20348) (@michaeljmarshall)
- [cleanup] Consolidate certs in broker (and some proxy) tests [#20353](https://github.com/apache/pulsar/pull/20353) (@michaeljmarshall)
- [cleanup] Consolidate certs used in tests [#20336](https://github.com/apache/pulsar/pull/20336) (@michaeljmarshall)
