---
id: pulsar-2.10.1
title: Apache Pulsar 2.10.1
sidebar_label: Apache Pulsar 2.10.1
---

#### 2022-07-05

### Important notice

- [fix][broker] Fix broker LoadBalance uneffective [15314](https://github.com/apache/pulsar/pull/15314)
- [fix][admin] Fix producer/consume permission can’t get schema [15956](https://github.com/apache/pulsar/pull/15956)

### Broker

- [fix][broker] Fix race condition in getManagedLedgerInternalStats when includeLedgerMetadata=true [15918](https://github.com/apache/pulsar/pull/15918)
- [improve][broker] Avoid contended synchronized block on topic load [15883](https://github.com/apache/pulsar/pull/15883)
- [fix][broker] Fix NPE in MessageDeduplication [15820](https://github.com/apache/pulsar/pull/15820)
- [improve][broker] Add timeout to closing CoordinationServiceImpl [15777](https://github.com/apache/pulsar/pull/15777)
- [improve][broker] Store Subscription properties [15757](https://github.com/apache/pulsar/pull/15757)
- [improve][broker] Support for updating the Subscription properties [15751](https://github.com/apache/pulsar/pull/15751)
- [improve][broker] Disable memory limit controller for broker client and replication clients [15723](https://github.com/apache/pulsar/pull/15723)
- [fix][broker] Fix NPE when put value to `RangeCache`. [15707](https://github.com/apache/pulsar/pull/15707)
- [fix][broker] Fast return if ack cumulative illegal [15695](https://github.com/apache/pulsar/pull/15695)
- [fix][broker] Fix creating producer failure when set backlog quota. [15663](https://github.com/apache/pulsar/pull/15663)
- [fix][broker] Expose configurationMetadataStore and localMetadataStore [15661](https://github.com/apache/pulsar/pull/15661)
- [fix][broker] Fix NPE when set `AutoTopicCreationOverride` [15653](https://github.com/apache/pulsar/pull/15653)
- [fix][broker] Fix MetadataStoreException$NotFoundException while doing topic lookup [15633](https://github.com/apache/pulsar/pull/15633)
- [fix][broker] Fix calculation in getNumberOfEntriesInStorage [15627](https://github.com/apache/pulsar/pull/15627)
- [fix][broker] Use dispatchRateLimiterLock to update dispatchRateLimiter [15601](https://github.com/apache/pulsar/pull/15601)
- [fix][broker] Sync topicPublishRateLimiter update [15599](https://github.com/apache/pulsar/pull/15599)
- [fix][broker] Fix deadlock in broker after race condition in topic creation failure [15570](https://github.com/apache/pulsar/pull/15570)
- [cleanup][broker] Override close method to avoid caching exception. [15529](https://github.com/apache/pulsar/pull/15529)
- [fix][broker] Close publishLimiter when disable it [15520](https://github.com/apache/pulsar/pull/15520)
- [fix][broker] Fix to avoid TopicStatsImpl NPE even if producerName is null [15502](https://github.com/apache/pulsar/pull/15502)
- [fix][broker] Fix key-shared delivery of messages with interleaved delays [15409](https://github.com/apache/pulsar/pull/15409)
- [fix][Broker] Fix bug in contructor of RocksdbMetadataStore [15405](https://github.com/apache/pulsar/pull/15405)
- [feature][broker] EntryFilter (PIP-105) - support per-Consumer filtering [15391](https://github.com/apache/pulsar/pull/15391)
- [fix][broker/client] Close connection if a ping or pong message cannot be sent [15382](https://github.com/apache/pulsar/pull/15382)
- [improve][broker] Support shrink for ConcurrentSortedLongPairSet  [15354](https://github.com/apache/pulsar/pull/15354)
- [improve][broker] Support properties on NonDurable subscriptions (PIP-105) [15345](https://github.com/apache/pulsar/pull/15345)
- [improve][broker] Use shrink map for message redelivery. [15342](https://github.com/apache/pulsar/pull/15342)
- [fix][Broker] Fix error on recycled SubscriptionPropertiesList [15335](https://github.com/apache/pulsar/pull/15335)
- [fix][broker] Fix problem at RateLimiter#tryAcquire [15306](https://github.com/apache/pulsar/pull/15306)
- [fix][broker] Fix totalEntries calculation problem in AbstractBaseDispatcher#filterEntriesForConsumere [15298](https://github.com/apache/pulsar/pull/15298)
- [fix][broker] Fix resource group does not report usage [15292](https://github.com/apache/pulsar/pull/15292)
- [fix][Broker] Fix race condition between timeout and completion  in `OpAddEntry`  [15233](https://github.com/apache/pulsar/pull/15233)
- [fix][broker] Fix MessageDeduplication#inactiveProducers may not be persistence correctly [15206](https://github.com/apache/pulsar/pull/15206)
- [fix][broker] Cancel `fencedTopicMonitoringTask` when topic closed normally [15202](https://github.com/apache/pulsar/pull/15202)
- [fix][broker] Fix parameter saslJaasBrokerSectionName in broker.conf [15110](https://github.com/apache/pulsar/pull/15110)
- [cleanup][broker] Remove useless code to avoid confusion in OpReadEntry#checkReadCompletion [15104](https://github.com/apache/pulsar/pull/15104)
- [fix][broker] Ensure NamespaceEphemeralData has equals() operator [15092](https://github.com/apache/pulsar/pull/15092)
- [fix][broker] Fix potential to add duplicated consumer [15051](https://github.com/apache/pulsar/pull/15051)
- [fix][broker] Fix rewind failed when ``redeliverUnacknowledgedMessages`` [15046](https://github.com/apache/pulsar/pull/15046)
- [fix][broker]Fix race condition in updating lastMarkDeleteEntry field [15031](https://github.com/apache/pulsar/pull/15031)
- [improve][broker] Avoid using blocking calls for the async method ``checkTopicOwnership`` [15023](https://github.com/apache/pulsar/pull/15023)
- [fix][broker] Avoid heartbeat topic to offload. [15008](https://github.com/apache/pulsar/pull/15008)
- [fix][broker] Return if reset in progress [14978](https://github.com/apache/pulsar/pull/14978)
- [fix][broker] Fix topic policy reader close bug [14897](https://github.com/apache/pulsar/pull/14897)
- [fix][broker] Fix getPendingAckInternalStats redirect issue [14876](https://github.com/apache/pulsar/pull/14876)
- [fix][broker] Fix wrong state for non-durable cursor [14869](https://github.com/apache/pulsar/pull/14869)
- [improve][broker] Add log when update namespace policies with error [14850](https://github.com/apache/pulsar/pull/14850)
- [feature][broker] Support advertised listeners for HTTP and HTTPS services [14839](https://github.com/apache/pulsar/pull/14839)
- [fix][broker] Filter the virtual NIC with relative path [14829](https://github.com/apache/pulsar/pull/14829)
- [fix][broker] Fixed duplicated delayed messages when all consumers disconnect [14740](https://github.com/apache/pulsar/pull/14740)
- [fix][broker] Fix cannot delete namespace with system topic [14730](https://github.com/apache/pulsar/pull/14730)
- [fix][broker] Fixed 404 error msg not being returned correctly using http lookup [14677](https://github.com/apache/pulsar/pull/14677)
- [fix][broker] Fix normal topic named ends with `healthcheck`  becomes system topic issue [14671](https://github.com/apache/pulsar/pull/14671)
- [improve][broker] Support shrink for map or set [14663](https://github.com/apache/pulsar/pull/14663)
- [improve][broker] Changing the topic creation flow and optimize heartbeat topic not trigger compaction [14643](https://github.com/apache/pulsar/pull/14643)
- [fix][broker] Fix wrong prompt exception when getting the non-persistent topic list without GET_BUDNLE permission [14638](https://github.com/apache/pulsar/pull/14638)
- [fix][broker] Fix inconsistent prompt message when schema version is empty using AVRO. [14626](https://github.com/apache/pulsar/pull/14626)
- [fix][broker] Fix update replication cluster but not update replicator [14570](https://github.com/apache/pulsar/pull/14570)
- [improve][broker] Reduce unnecessary expansions for ConcurrentLong map and set [14562](https://github.com/apache/pulsar/pull/14562)
- [improve][broker] Support ManagedCursorInfo compression [14542](https://github.com/apache/pulsar/pull/14542)
- [improve][broker] Optimize memory usage: support to  shrink for pendingAcks map [14515](https://github.com/apache/pulsar/pull/14515)
- [improve][broker] Support shrink in ConcurrentLongHashMap [14497](https://github.com/apache/pulsar/pull/14497)
- [improve][broker] Optimize RawReader#create when using Compactor [14447](https://github.com/apache/pulsar/pull/14447)
- [fix][broker] Fix NPE when subscription is already removed [14363](https://github.com/apache/pulsar/pull/14363)
- [improve][broker] Optimize load manager find nics process [14340](https://github.com/apache/pulsar/pull/14340)
- [improve][broker] Make revokePermissionsOnTopic method async [14149](https://github.com/apache/pulsar/pull/14149)
- [fix][broker] Fix when nextValidLedger is null caused NPE [13975](https://github.com/apache/pulsar/pull/13975)

### Transaction

- [fix][txn] Fix transasction ack batch message [15875](https://github.com/apache/pulsar/pull/15875)
- [fix][txn] Fix NPE of TransactionMetaStoreHandler [15840](https://github.com/apache/pulsar/pull/15840)
- [improve][txn] Optimize transaction lowWaterMark to clean useless data faster [15592](https://github.com/apache/pulsar/pull/15592)
- [fix][txn] Fix transaction PendingAck lowWaterMark [15530](https://github.com/apache/pulsar/pull/15530)
- [fix][txn] Make transaction stats consistent at end txn [15472](https://github.com/apache/pulsar/pull/15472)
- [improve][txn] Add lowWaterMark check before appending entry to TB [15424](https://github.com/apache/pulsar/pull/15424)
- [fix][txn] Fix transaction component recover fillQueue [15418](https://github.com/apache/pulsar/pull/15418)
- [fix][txn] Topic transaction buffer recover don't close reader when throw RuntimeException [15361](https://github.com/apache/pulsar/pull/15361)
- [fix][txn] Fix potentially unfinishable future [15208](https://github.com/apache/pulsar/pull/15208)
- [improve][txn] Optimize metadataPositions in MLPendingAckStore [15137](https://github.com/apache/pulsar/pull/15137)
- [fix][txn] TransactionMetadataService don't connect again if store exist [15114](https://github.com/apache/pulsar/pull/15114)
- [improve][txn] Avoid creating the multiple future and exception handler [15089](https://github.com/apache/pulsar/pull/15089)
- [fix][txn] Fix transaction REST API redirect issue. [15017](https://github.com/apache/pulsar/pull/15017)
- [improve][txn] support configurable `transactionBufferClientOperationTimeoutInMills` [15011](https://github.com/apache/pulsar/pull/15011)
- [improve][txn] Optimize topic lookup when TC end tx [14991](https://github.com/apache/pulsar/pull/14991)
- [fix][txn] Fix potential NPE in TransactionBufferDisable [14979](https://github.com/apache/pulsar/pull/14979)
- [fix][txn] Fix transaction pendingAckStore asyncMarkDelete [14974](https://github.com/apache/pulsar/pull/14974)
- [fix][txn] Fix potentially unfinished CompletableFuture [14973](https://github.com/apache/pulsar/pull/14973)
- [fix][txn] Fix transaction admin redirect get 500 due to getCause [14965](https://github.com/apache/pulsar/pull/14965)
- [fix][txn] Properly close transaction-buffer-sub non durable cursor [14900](https://github.com/apache/pulsar/pull/14900)
- [fix][txn] Close the transaction buffer when deleting topics [14895](https://github.com/apache/pulsar/pull/14895)
- [fix][txn] Avoid too many ServiceUnitNotReadyException for transaction buffer handler [14894](https://github.com/apache/pulsar/pull/14894)
- [fix][txn] Fix transaction buffer no snapshot close recover reader [14830](https://github.com/apache/pulsar/pull/14830)
- [fix][txn] Fix transaction log recover throw cursor already close [14810](https://github.com/apache/pulsar/pull/14810)
- [fix][txn] Fix cannot enable transaction when is allow auto update schema enabled=fasle [14809](https://github.com/apache/pulsar/pull/14809)
- [fix][txn] Fix some exception handle in transaction buffer [14808](https://github.com/apache/pulsar/pull/14808)
- [fix][txn] Fix transaction buffer recover throw cursor already close [14807](https://github.com/apache/pulsar/pull/14807)
- [fix][txn] Fix transaction buffer recover reader and writer fail [14801](https://github.com/apache/pulsar/pull/14801)
- [fix][txn] Fix pending ack is recovering throw CursorAlreadyClosedxception [14781](https://github.com/apache/pulsar/pull/14781)
- [fix][txn] Fix cursor readPosition is bigger than maxPosition in OpReadEntry [14667](https://github.com/apache/pulsar/pull/14667)

### Pulsar IO and Pulsar Functions

- [fix][connector] KCA sinks: fix offset mapping when sanitizeTopicName=true [15950](https://github.com/apache/pulsar/pull/15950)
- [improve][function] provide default error handler for function log appender [15728](https://github.com/apache/pulsar/pull/15728)
- [fix][connector] KCA Sink: org.apache.kafka.connect.errors.DataException: Invalid Java object for schema with type .. [15598](https://github.com/apache/pulsar/pull/15598)
- [improve][function] Refine file io connector [15250](https://github.com/apache/pulsar/pull/15250)
- [fix][function] Check executor null when close the FileSource [15247](https://github.com/apache/pulsar/pull/15247)
- [fix][function] Handle NPE when `getLeader` returns null [15058](https://github.com/apache/pulsar/pull/15058)
- [fix][function] Allow a Function&lt;GenericObject,?&gt; to access the original Schema of the Message and use it [14847](https://github.com/apache/pulsar/pull/14847)
- [fix][function] Fix pulsar-managed runtimes failed start function with package URL from package management service  [14814](https://github.com/apache/pulsar/pull/14814)
- [improve][connector] Handle Kafka sinks that return immutable maps as configs [14780](https://github.com/apache/pulsar/pull/14780)
- [improve][connector] Support event-time-based index name in ES Sink [14383](https://github.com/apache/pulsar/pull/14383)

### Tiered Storage

- [feature][tiered-storage] Add pure S3 provider for the offloader [15710](https://github.com/apache/pulsar/pull/15710
- [improve][tiered-storage] Upgrade JClouds to 2.5.0 [15649](https://github.com/apache/pulsar/pull/15649)
- [improve][tiered-storage] Reduce CPU usage when offloading the ledger [15063](https://github.com/apache/pulsar/pull/15063)
- [fix][tiered-storage] Fix potential NPE in MockManagedLedger [15006](https://github.com/apache/pulsar/pull/15006)
- [improve][tiered-storage] Add debug information [14907](https://github.com/apache/pulsar/pull/14907)

### Pulsar SQL

- [fix][sql] Fix the decimal type error convert in json schema [15687](https://github.com/apache/pulsar/pull/15687)
- [fix][sql] Add Java version trim agent for presto 332 [15236](https://github.com/apache/pulsar/pull/15236)
- [improve][sql] Pulsar SQL support for Decimal data type [15153](https://github.com/apache/pulsar/pull/15153)

### Pulsar Proxy

- [cleanup][proxy] Remove unnecessary blocking DNS lookup in LookupProxyHandler [15415](https://github.com/apache/pulsar/pull/15415)
- [fix][proxy] Fix DNS server denial-of-service issue when DNS entry expires [15403](https://github.com/apache/pulsar/pull/15403)
- [fix][proxy/client] Configure Netty DNS resolver to match JDK DNS caching setting, share DNS resolver instance in Proxy [15219](https://github.com/apache/pulsar/pull/15219)
- [refactor][proxy] Refactor Proxy code and fix connection stalling by switching to auto read mode [14713](https://github.com/apache/pulsar/pull/14713)
- [improve][proxy] Log warning when opening connection to broker fails [14710](https://github.com/apache/pulsar/pull/14710)
- [improve][proxy] Add support of PrometheusRawMetricsProvider for the Pulsar-Proxy [14681](https://github.com/apache/pulsar/pull/14681)

### Observability

- [improve][metrics] Add message ack rate metric for consumer [15674](https://github.com/apache/pulsar/pull/15674)
- [improve][metrics] Add metrics for pulsar web service thread pool [14742](https://github.com/apache/pulsar/pull/14742)
- [improve][metrics] Add non-persistent topic subscription metrics [13827](https://github.com/apache/pulsar/pull/13827)

### CLI

- [improve][admin] Support to get topic properties [15944](https://github.com/apache/pulsar/pull/15944)
- [improve][admin] Pulsar Admin: create subscripion with Properties (PIP-105) [15503](https://github.com/apache/pulsar/pull/15503)
- [improve][admin] Put `validateTopicOwnershipAsync` before `validateTopicOperationAsync` [15265](https://github.com/apache/pulsar/pull/15265)
- [fix][admin] Fix inconsistent parameter of TopicPolicies.getSubscriptionDispatchRate [15293](https://github.com/apache/pulsar/pull/15293)
- [fix]admin] Fix pulsar-admin not prompting message when there is a 500 error [14856](https://github.com/apache/pulsar/pull/14856)
- [fix][admin] Fix NPE in PulsarAdminBuilder when the service is not set [14769](https://github.com/apache/pulsar/pull/14769)
- [fix][admin] Remove the trust certs check [14764](https://github.com/apache/pulsar/pull/14764)
- [fix][admin] Provide an accurate error message when set `autoTopicCreation` [14684](https://github.com/apache/pulsar/pull/14684)

### Security

- [fix][authn] Generate correct well-known OpenID configuration URL [15928](https://github.com/apache/pulsar/pull/15928)
- [fix][authn] Switch to rely on Netty for Hostname Verification [15824](https://github.com/apache/pulsar/pull/15824)
- [fix][authz] Add timeout of sync methods and avoid call sync method for AuthoriationService [15694](https://github.com/apache/pulsar/pull/15694)
- [fix][authz] Fix grant all permissions but can't list topic. [15501](https://github.com/apache/pulsar/pull/15501)
- [fix][authz] Fix MultiRolesTokenAuthorizationProvider `authorize` issue. [15454](https://github.com/apache/pulsar/pull/15454)
- [fix][authn] Fix typo checkPermissionsAsync method typo [15273](https://github.com/apache/pulsar/pull/15273)
- [improve][authn] Improve skipping of DNS resolution when creating AuthenticationDataHttp instance [15228](https://github.com/apache/pulsar/pull/15228)
- [improve][authn] Skip unnecessary DNS resolution when creating AuthenticationDataHttp instance [15221](https://github.com/apache/pulsar/pull/15221)
- [fix][security] Remove log4j for CVE-2022-23307 [15109](https://github.com/apache/pulsar/pull/15109)
- [improve][authn] Use tlsCertRefreshCheckDurationSec instead of 0 for refresh value [15075](https://github.com/apache/pulsar/pull/15075)
- [fix][security] Upgrade Spring Context in Pulsar IO batch-data-generator [14975](https://github.com/apache/pulsar/pull/14975)
- [fix][auth] Athenz: do not use uber-jar and bump to 1.10.50 to remove jackson-databind shaded dependency [14884](https://github.com/apache/pulsar/pull/14884)
- [fix][authz] Fix handling single role and non-jwt-token in MultiRolesTokenAuthorizationProvider [14857](https://github.com/apache/pulsar/pull/14857)
- [improve][authn] Full-support SSL provider, ciphers and protocols for broker service and proxy service [14569](https://github.com/apache/pulsar/pull/14569)
- [fix][authz] Role with namespace produce authz can also get topics [13773](https://github.com/apache/pulsar/pull/13773)
- [improve][authn] Full-support set SSL provider, ciphers and protocols for broker-web&websocket/proxy/function-worker [13740](https://github.com/apache/pulsar/pull/13740)

### Others

- [improve] Enable TCP/IP keepalive for all ZK client connections in all components starting with bin/pulsar [15908](https://github.com/apache/pulsar/pull/15908)
- [improve] Allow pulsar_tool_env.sh PULSAR_MEM to be Overridden [15868](https://github.com/apache/pulsar/pull/15868)
- [improve] Configure DLog Bookie, Pulsar, and Admin clients via pass-through config [15818](https://github.com/apache/pulsar/pull/15818)
- [fix][docker] Add write permissions to /pulsar subdirectories to enable running as non-root user [15769](https://github.com/apache/pulsar/pull/15769)
- [improve] Disable memory limit controller in internal Pulsar clients [15752](https://github.com/apache/pulsar/pull/15752)
- [improve] Disable Pulsar client memory limit by default [15748](https://github.com/apache/pulsar/pull/15748)
- [fix][owasp] Fix false positive google-http-client-gson-1.41.0.jar [15651](https://github.com/apache/pulsar/pull/15651)
- [fix][package-management] Fix the new path `/data` introduced regression [15367](https://github.com/apache/pulsar/pull/15367)
- [improve][common] Use `Collection` instead of `List` for FutureUtil. [15329](https://github.com/apache/pulsar/pull/15329)
- [fix][tools] Only apply maxPendingMessagesAcrossPartitions if it presents [15283](https://github.com/apache/pulsar/pull/15283)
- [fix][owasp] Suppress MariaDB false positives [15243](https://github.com/apache/pulsar/pull/15243)
- [fix][scripts] Ignore case when obfuscating passwords in configuration scripts [15077](https://github.com/apache/pulsar/pull/15077)
- [improve][tool] Improve transaction perf logs [14816](https://github.com/apache/pulsar/pull/14816)
- [fix][deploy] Fix the pid occupied check when using pulsar-daemon start or stop process [14701](https://github.com/apache/pulsar/pull/14701)

### Library updates

- Bump PyYAML from 5.3.1 to 5.4.1 to solve CVE-2020-14343 [15989](https://github.com/apache/pulsar/pull/15989)
- Upgrade Netty to 4.1.76.Final, Netty Tcnative, grpc and protobuf [15212](https://github.com/apache/pulsar/pull/15212)
- Update spring library to fix CVE-2022-22965 [15065](https://github.com/apache/pulsar/pull/15065)
- Upgrade MySQL client to 8.0.28 to get rid of CVE-2021-3711 [14998](https://github.com/apache/pulsar/pull/14998)
- Upgrade jackson and jackson-databind (2.13.2.1) to get rid of CVE-2020-36518 [14871](https://github.com/apache/pulsar/pull/14871)
- Upgrade Guice to 5.1.0 [14300](https://github.com/apache/pulsar/pull/14300)