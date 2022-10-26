---
id: pulsar-2.9.3
title: Apache Pulsar 2.9.3
sidebar_label: Apache Pulsar 2.9.3
---

#### 2022-07-19

### Important notice

- [PIP-146] ManagedCursorInfo compression [#14542](https://github.com/apache/pulsar/pull/14542)
- [PIP-153] Optimize metadataPositions in MLPendingAckStore [#15137](https://github.com/apache/pulsar/pull/15137)
- [PIP-163] Add lowWaterMark check before appending entry to TB [#15424](https://github.com/apache/pulsar/pull/15424)

#### Broker

- [cleanup][broker] Cleanup already deleted namespace topics [#12597](https://github.com/apache/pulsar/pull/12597)
- [cleanup][broker] Override close method to avoid caching exception [#15529](https://github.com/apache/pulsar/pull/15529)
- [cleanup][broker] Remove useless code to avoid confusion in OpReadEntry#checkReadCompletion [#15104](https://github.com/apache/pulsar/pull/15104)
- [fix][broker] Avoid heartbeat topic to offload [#15008](https://github.com/apache/pulsar/pull/15008)
- [fix][broker] Cancel `fencedTopicMonitoringTask` when topic closed normally [#15202](https://github.com/apache/pulsar/pull/15202)
- [fix][broker] Check for blank advertised listener name [#14306](https://github.com/apache/pulsar/pull/14306)
- [fix][broker] Close publishLimiter when disable it [#15520](https://github.com/apache/pulsar/pull/15520)
- [fix][broker] Fast return if ack cumulative illegal [#15695](https://github.com/apache/pulsar/pull/15695)
- [fix][broker] Fix MessageDeduplication#inactiveProducers may not be persistence correctly [#15206](https://github.com/apache/pulsar/pull/15206)
- [fix][broker] Fix MultiRolesTokenAuthorizationProvider `authorize` issue [#15454](https://github.com/apache/pulsar/pull/15454)
- [fix][broker] Fix NPE in MessageDeduplication [#15820](https://github.com/apache/pulsar/pull/15820)
- [fix][broker] Fix NPE when ledger id not found in `OpReadEntry` [#15837](https://github.com/apache/pulsar/pull/15837)
- [fix][broker] Fix NPE when put value to `RangeCache` [#15707](https://github.com/apache/pulsar/pull/15707)
- [fix][broker] Fix NPE when set `AutoTopicCreationOverride` [#15653](https://github.com/apache/pulsar/pull/15653)
- [fix][broker] Fix NPE when subscription is already removed [#14363](https://github.com/apache/pulsar/pull/14363)
- [fix][broker] Fix REST produce msg redirect issue [#15551](https://github.com/apache/pulsar/pull/15551)
- [fix][broker] Fix call sync method in onPoliciesUpdate method [#13885](https://github.com/apache/pulsar/pull/13885)
- [fix][broker] Fix call sync method in onPoliciesUpdate method [#15227](https://github.com/apache/pulsar/pull/15227)
- [fix][broker] Fix cannot delete namespace with system topic [#14730](https://github.com/apache/pulsar/pull/14730)
- [fix][broker] Fix creating producer failure when set backlog quota [#15663](https://github.com/apache/pulsar/pull/15663)
- [fix][broker] Fix creating system namespace topic failure [#14949](https://github.com/apache/pulsar/pull/14949)
- [fix][broker] Fix deadlock in broker after race condition in topic creation failure [#15570](https://github.com/apache/pulsar/pull/15570)
- [fix][broker] Fix getPendingAckInternalStats redirect issue [#14876](https://github.com/apache/pulsar/pull/14876)
- [fix][broker] Fix inconsistent prompt message when schema version is empty using AVRO [#14626](https://github.com/apache/pulsar/pull/14626)
- [fix][broker] Fix incorrect entryId in warning logs when reading an entry from tiered storage [#14685](https://github.com/apache/pulsar/pull/14685)
- [fix][broker] Fix metadata store deadlock when checking BacklogQuota [#14634](https://github.com/apache/pulsar/pull/14634)
- [fix][broker] Fix no value present [#14891](https://github.com/apache/pulsar/pull/14891)
- [fix][broker] Fix normal topic named ends with `healthcheck`  becomes system topic issue [#14671](https://github.com/apache/pulsar/pull/14671)
- [fix][broker] Fix parameter saslJaasBrokerSectionName in broker.conf [#15110](https://github.com/apache/pulsar/pull/15110)
- [fix][broker] Fix potential to add duplicated consumer [#15051](https://github.com/apache/pulsar/pull/15051)
- [fix][broker] Fix precision issue and initial value for Consumer#avgMessagesPerEntry [#14666](https://github.com/apache/pulsar/pull/14666)
- [fix][broker] Fix problem at RateLimiter#tryAcquire [#15306](https://github.com/apache/pulsar/pull/15306)
- [fix][broker] Fix producerFuture not completed in ServerCnx#handleProducer [#14467](https://github.com/apache/pulsar/pull/14467)
- [fix][broker] Fix race condition between timeout and completion  in `OpAddEntry` [#15233](https://github.com/apache/pulsar/pull/15233)
- [fix][broker] Fix race condition in updating lastMarkDeleteEntry field [#15031](https://github.com/apache/pulsar/pull/15031)
- [fix][broker] Fix rewind failed when ``redeliverUnacknowledgedMessages`` [#15046](https://github.com/apache/pulsar/pull/15046)
- [fix][broker] Fix topic policy reader close bug [#14897](https://github.com/apache/pulsar/pull/14897)
- [fix][broker] Fix typo in enum name and handle closing of the channel properly since writeAndFlush is asynchronous [#15384](https://github.com/apache/pulsar/pull/15384)
- [fix][broker] Fix when nextValidLedger is null caused NPE [#13975](https://github.com/apache/pulsar/pull/13975)
- [fix][broker] Fix wrong prompt exception when getting the non-persistent topic list without GET_BUDNLE permission [#14638](https://github.com/apache/pulsar/pull/14638)
- [fix][broker] Fix wrong state for non-durable cursor [#14869](https://github.com/apache/pulsar/pull/14869)
- [fix][broker] Fix wrong unit of NIC speed on Linux [#15770](https://github.com/apache/pulsar/pull/15770)
- [fix][broker] Fix 404 error msg not being returned correctly using http lookup [#14677](https://github.com/apache/pulsar/pull/14677)
- [fix][broker] Follow up on race condition fixes in ManagedCursorImpl [#15067](https://github.com/apache/pulsar/pull/15067)
- [fix][broker] Remove the loadbalance/bundle-data node [#13164](https://github.com/apache/pulsar/pull/13164)
- [fix][broker] Return if reset in progress [#14978](https://github.com/apache/pulsar/pull/14978)
- [fix][broker] Use dispatchRateLimiterLock to update dispatchRateLimiter [#15601](https://github.com/apache/pulsar/pull/15601)
- [fix][broker] When skipping updating mark delete position, execute callback with executor to prevent deadlock [#15971](https://github.com/apache/pulsar/pull/15971)
- [fix][broker] Expose configurationMetadataStore and localMetadataStore [#15661](https://github.com/apache/pulsar/pull/15661)
- [fix][broker] Filter the virtual NIC with relative path [#14829](https://github.com/apache/pulsar/pull/14829)
- [fix][broker] Fix MetadataStoreException$NotFoundException while doing topic lookup [#15633](https://github.com/apache/pulsar/pull/15633)
- [fix][broker] Fix calculation in getNumberOfEntriesInStorage [#15627](https://github.com/apache/pulsar/pull/15627)
- [fix][broker] Fix error log miss stack trace when create tenant fail [#14366](https://github.com/apache/pulsar/pull/14366)
- [fix][broker] Fix resource group does not report usage [#15292](https://github.com/apache/pulsar/pull/15292)
- [fix][broker] Fix duplicated delayed messages when all consumers disconnect [#14740](https://github.com/apache/pulsar/pull/14740)
- [fix][broker] Fix the pid occupied check when using pulsar-daemon start or stop process [#14701](https://github.com/apache/pulsar/pull/14701)
- [fix][broker] Fix potential NPE in Replicator [#15003](https://github.com/apache/pulsar/pull/15003)
- [improve][broker] Add log when updating namespace policies with error [#14850](https://github.com/apache/pulsar/pull/14850)
- [improve][broker] Add publishRateLimitedTimes to topic metrics [#15739](https://github.com/apache/pulsar/pull/15739)
- [improve][broker] Avoid using blocking calls for the async method ``checkTopicOwnership`` [#15023](https://github.com/apache/pulsar/pull/15023)
- [improve][broker] Cancel offload tasks when managed ledger closed [#14545](https://github.com/apache/pulsar/pull/14545)
- [improve][broker] Close connection if a ping or pong message cannot be sent [#15382](https://github.com/apache/pulsar/pull/15382)
- [improve][broker] Configure DLog Bookie, Pulsar, and Admin clients via pass-through config [#15818](https://github.com/apache/pulsar/pull/15818)
- [improve][broker] Full-support SSL provider, ciphers, and protocols for broker service and proxy service [#14569](https://github.com/apache/pulsar/pull/14569)
- [improve][broker] Ignore the print the log that the topic does not exist [#13535](https://github.com/apache/pulsar/pull/13535)
- [improve][broker] Optimize RawReader#create when using Compactor [#14447](https://github.com/apache/pulsar/pull/14447)
- [improve][broker] Optimize find nics process [#14340](https://github.com/apache/pulsar/pull/14340)
- [improve][broker] Optimize memory usage: support to  shrink for pendingAcks map [#14515](https://github.com/apache/pulsar/pull/14515)
- [improve][broker] Provide an accurate error message when set ``autoTopicCreation `` [#14684](https://github.com/apache/pulsar/pull/14684)
- [improve][broker] Reduce unnecessary expansions for ConcurrentLong map and set [#14562](https://github.com/apache/pulsar/pull/14562)
- [improve][broker] Set splitNamespaceBundle with `readonly=false` [#14680](https://github.com/apache/pulsar/pull/14680)
- [improve][broker] Skip unnecessary DNS resolution when creating AuthenticationDataHttp instance [#15221](https://github.com/apache/pulsar/pull/15221)
- [improve][broker] Support advertised listeners for HTTP and HTTPS services [#14839](https://github.com/apache/pulsar/pull/14839)
- [improve][broker] Support shrink for ConcurrentSortedLongPairSet [#15354](https://github.com/apache/pulsar/pull/15354)
- [improve][broker] Support shrink for map or set [#14663](https://github.com/apache/pulsar/pull/14663)
- [improve][broker] Support shrink in ConcurrentLongHashMap [#14497](https://github.com/apache/pulsar/pull/14497)
- [improve][broker] Switch to rely on Netty for Hostname Verification [#15824](https://github.com/apache/pulsar/pull/15824)
- [improve][broker] Use shrink map for message redelivery [#15342](https://github.com/apache/pulsar/pull/15342)
- [improve][broker] Use tlsCertRefreshCheckDurationSec instead of 0 for refresh value [#15075](https://github.com/apache/pulsar/pull/15075)
- [improve][broker] Add metrics for pulsar web service thread pool [#15741](https://github.com/apache/pulsar/pull/15741)
- [improve][broker] Allow pulsar_tool_env.sh PULSAR_MEM to be Overridden [#15868](https://github.com/apache/pulsar/pull/15868)
- [improve][broker] Ignore case when obfuscating passwords in configuration scripts [#15077](https://github.com/apache/pulsar/pull/15077)

#### Transaction

- [fix][txn] Close the transaction buffer when deleting topics [#14895](https://github.com/apache/pulsar/pull/14895)
- [fix][txn] Fix potentially unfinishable future. [#15208](https://github.com/apache/pulsar/pull/15208)
- [fix][txn] Fix potentially unfinished CompletableFuture [#14973](https://github.com/apache/pulsar/pull/14973)
- [fix][txn] Fix transaction PendingAck lowWaterMark [#15530](https://github.com/apache/pulsar/pull/15530)
- [fix][txn] Fix transaction REST API redirect issue [#15017](https://github.com/apache/pulsar/pull/15017)
- [fix][txn] Fix transaction admin redirect get 500 due to getCause [#14965](https://github.com/apache/pulsar/pull/14965)
- [fix][txn] Fix transaction pendingAckStore asyncMarkDelete [#14974](https://github.com/apache/pulsar/pull/14974)
- [fix][txn] Make transaction stats consistent at end txn [#15472](https://github.com/apache/pulsar/pull/15472)
- [fix][txn] Properly close transaction-buffer-sub non durable cursor [#14900](https://github.com/apache/pulsar/pull/14900)
- [fix][txn] Topic transaction buffer recover don't close reader when throw RuntimeException [#15361](https://github.com/apache/pulsar/pull/15361)
- [fix][txn] TransactionMetadataService don't connect again if store exist [#15114](https://github.com/apache/pulsar/pull/15114)
- [fix][txn] Avoid too many ServiceUnitNotReadyException for transaction buffer handler [#14894](https://github.com/apache/pulsar/pull/14894)
- [fix][txn] Fix NPE of TransactionMetaStoreHandler [#15840](https://github.com/apache/pulsar/pull/15840)
- [fix][txn] Fix cannot enable transaction when is allow auto update schema enabled=fasle [#14809](https://github.com/apache/pulsar/pull/14809)
- [fix][txn] Fix pending ack is recovering throw CursorAlreadyClosedxception [#14781](https://github.com/apache/pulsar/pull/14781)
- [fix][txn] Fix some exception handle in transaction buffer [#14808](https://github.com/apache/pulsar/pull/14808)
- [fix][txn] Fix transaction buffer no snapshot close recover reader [#14830](https://github.com/apache/pulsar/pull/14830)
- [fix][txn] Fix transaction buffer recover BrokerMetadataException close topic [#14709](https://github.com/apache/pulsar/pull/14709)
- [fix][txn] Fix transaction buffer recover reader and writer fail [#14801](https://github.com/apache/pulsar/pull/14801)
- [fix][txn] Fix transaction buffer recover throw cursor already close [#14807](https://github.com/apache/pulsar/pull/14807)
- [fix][txn] Fix transaction log recover throw cursor already close [#14810](https://github.com/apache/pulsar/pull/14810)
- [fix][txn] Fix transaction pending ack store managed ledger WriteFail state [#14738](https://github.com/apache/pulsar/pull/14738)
- [fix][txn] Fix transaction producer stuck problem [#15061](https://github.com/apache/pulsar/pull/15061)
- [fix][txn] Fix transaction component recover fillQueue [#15418](https://github.com/apache/pulsar/pull/15418)
- [fix][txn] Fix transasction ack batch message [#15875](https://github.com/apache/pulsar/pull/15875)
- [improve][txn] Avoid creating multiple future and exception handlers [#15089](https://github.com/apache/pulsar/pull/15089)
- [improve][txn] Improve transaction perf logs [#14816](https://github.com/apache/pulsar/pull/14816)
- [improve][txn] Optimize topic lookup when TC end tx [#14991](https://github.com/apache/pulsar/pull/14991)
- [improve][txn] Optimize transaction lowWaterMark to clean useless data faster [#15592](https://github.com/apache/pulsar/pull/15592)
- [improve][txn] Support configurable ``transactionBufferClientOperationTimeoutInMills`` [#15011](https://github.com/apache/pulsar/pull/15011)


#### Security

- [fix][auth] Add timeout of sync methods and  avoid call sync method for AuthoriationService [#15694](https://github.com/apache/pulsar/pull/15694)
- [fix][auth] Fix debug log authenticate role error [#14784](https://github.com/apache/pulsar/pull/14784)
- [fix][auth] Fix grant all permissions but can't list topic [#15501](https://github.com/apache/pulsar/pull/15501)
- [fix][auth] Fix handling single role and non-jwt-token in MultiRolesTokenAuthorizationProvider [#14857](https://github.com/apache/pulsar/pull/14857)
- [fix][auth] Generate correct well-known OpenID configuration URL [#15928](https://github.com/apache/pulsar/pull/15928)
- [fix][auth] Role with namespace produce authz can also get topics [#15740](https://github.com/apache/pulsar/pull/15740)
- [improve][auth] Add KeyStore support in WebSocket, Function Worker HTTPS Servers  [#15084](https://github.com/apache/pulsar/pull/15084)
- [improve][auth] Allow to config web server's cipher and protocols [#13354](https://github.com/apache/pulsar/pull/13354)
- [improve][auth] Full-support set SSL provider, ciphers, and protocols [#13740](https://github.com/apache/pulsar/pull/13740)
- [improve][auth] Improve skipping of DNS resolution when creating AuthenticationDataHttp instance [#15228](https://github.com/apache/pulsar/pull/15228)
- [improve][auth] Optimize the logic of allowing namespace operation [#15731](https://github.com/apache/pulsar/pull/15731)
- [improve][auth] Remove sensitive msg from consumer/producer stats log [#15483](https://github.com/apache/pulsar/pull/15483)

#### Admin

- [fix][admin] Fix NPE in PulsarAdminBuilder when the service is not set [#14769](https://github.com/apache/pulsar/pull/14769)
- [fix][admin] Fix pulsar-admin not prompting message when there is a 500 error [#14856](https://github.com/apache/pulsar/pull/14856)
- [fix][admin] Fix reach max tenants error if the tenant already exists [#15932](https://github.com/apache/pulsar/pull/15932)
- [fix][admin] Fix typo in validation message [#16021](https://github.com/apache/pulsar/pull/16021)
- [fix][admin] Remove the trust certs check [#14764](https://github.com/apache/pulsar/pull/14764)

#### Proxy

- [fix][proxy] Fix proxy connection leak when inbound connection closes while connecting is in progress [#15366](https://github.com/apache/pulsar/pull/15366)
- [fix][proxy] Log warning when opening connection to broker fails [#14710](https://github.com/apache/pulsar/pull/14710)
- [fix][proxy] Remove unnecessary blocking DNS lookup in LookupProxyHandler [#15415](https://github.com/apache/pulsar/pull/15415)
- [fix][proxy] Fix DNS server denial-of-service issue when DNS entry expires [#15403](https://github.com/apache/pulsar/pull/15403)
- [improve][proxy] Configure Netty DNS resolver to match JDK DNS caching setting, share DNS resolver instance in Proxy [#15219](https://github.com/apache/pulsar/pull/15219)
- [improve][proxy] Refactor Proxy code and fix connection stalling by switching to auto read mode [#14713](https://github.com/apache/pulsar/pull/14713)


#### Pulsar SQL

- [fix][sql] Fix the decimal type error convert in json schema [#15687](https://github.com/apache/pulsar/pull/15687)
- [improve][sql] Add Java version trim agent for presto 332 [#15236](https://github.com/apache/pulsar/pull/15236)
- [improve][sql] Pulsar SQL support for Decimal data type [#15153](https://github.com/apache/pulsar/pull/15153)

#### Function

- [fix][function] Pass configured metricsPort to k8s runtime [#14502](https://github.com/apache/pulsar/pull/14502)
- [fix][function] Check executor null when close the FileSource [#15247](https://github.com/apache/pulsar/pull/15247)
- [fix][function] Fix pulsar-managed runtimes failed start function with package URL from package management service [#14814](https://github.com/apache/pulsar/pull/14814)
- [fix][function] Fix some IOExceptions when create functions from package URL [#14553](https://github.com/apache/pulsar/pull/14553)
- [fix][function] Handle NPE when `getLeader` returns null [#15058](https://github.com/apache/pulsar/pull/15058)
- [fix][function] Provide default error handler for function log appender [#15728](https://github.com/apache/pulsar/pull/15728)
- [fix][function] Refine file io connector [#15250](https://github.com/apache/pulsar/pull/15250)

#### Connector

- [fix][connector] Pass client builder if no service URL is provided to Debezium connector [#12145](https://github.com/apache/pulsar/pull/12145)
- [fix][connector] Throw exceptions when Kafka offset backing store failed to start  [#14491](https://github.com/apache/pulsar/pull/14491)

#### Tiered Storage

- [fix][tiered-storage] Fix NoClassDefFoundError: com/google/inject/AbstractModule in pulsar-io/batch-data-generator and Jcloud offloader [#14150](https://github.com/apache/pulsar/pull/14150)
- [improve][tiered-storage] Add debug information  [#14907](https://github.com/apache/pulsar/pull/14907)
- [improve][tiered-storage] Add pure S3 provider for the offloader [#15710](https://github.com/apache/pulsar/pull/15710)
- [improve][tiered-storage] Reduce CPU usage when offloading the ledger [#15063](https://github.com/apache/pulsar/pull/15063)
- [improve][tiered-storage] Upgrade JClouds to 2.5.0 [#15649](https://github.com/apache/pulsar/pull/15649)

#### Dependencies

- Add suppression for Kotlin stdlib CVE-2022-24329 - part 2  [#14715](https://github.com/apache/pulsar/pull/14715)
- Add suppression for Kotlin stdlib CVE-2022-24329 [#14629](https://github.com/apache/pulsar/pull/14629)
- Bump pyyaml from 5.3.1 to 5.4.1 to solve CVE-2020-14343 [#15989](https://github.com/apache/pulsar/pull/15989)
- Fix false positive google-http-client-gson-1.41.0.jar [#15651](https://github.com/apache/pulsar/pull/15651)
- Java version trim agent presto332 branch2.9 [#15326](https://github.com/apache/pulsar/pull/15326)
- Remove --illegal-access errors resulting from Google Guice (upgrade to 5.0.1 and JClouds to 2.4.0) [#13810](https://github.com/apache/pulsar/pull/13810)
- Remove --illegal-access errors resulting from Google Guice - Pulsar IO, Offloaders and Pulsar SQL - Bump Guice to 5.1.0  [#14300](https://github.com/apache/pulsar/pull/14300)
- Upgrade BookKeeper to 4.14.5 (2.8, 2.9, 2.10 branches) [#15581](https://github.com/apache/pulsar/pull/15581)
- Upgrade Hadoop to 3.3.3 to get rid of CVE-2022-26612 [#15660](https://github.com/apache/pulsar/pull/15660)
- Upgrade Netty Reactive Streams to 2.0.6 [#15990](https://github.com/apache/pulsar/pull/15990)
- Upgrade Netty to 4.1.76.Final, Netty Tcnative, grpc and protobuf [#15212](https://github.com/apache/pulsar/pull/15212)
- Upgrade Netty to 4.1.77.Final and netty-tcnative to 2.0.52.Final [#15646](https://github.com/apache/pulsar/pull/15646)
- Upgrade jackson and jackson-databind (2.13.2.1) to get rid of CVE-2020-36518 [#14871](https://github.com/apache/pulsar/pull/14871)
- Use grpc-bom to align grpc library versions [#15234](https://github.com/apache/pulsar/pull/15234)
- Remove log4j for CVE-2022-23307 [#15109](https://github.com/apache/pulsar/pull/15109)