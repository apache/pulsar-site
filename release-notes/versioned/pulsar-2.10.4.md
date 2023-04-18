---
id: pulsar-2.10.4
title: Apache Pulsar 2.10.4
sidebar_label: Apache Pulsar 2.10.4
---


#### 2023-1-4

### Broker
* [improve][broker] Add ref count for sticky hash to optimize the performance of Key_Shared subscription (#19167)
* [fix][broker] Pass subName for subscription operations in ServerCnx (#19184)
* [fix][broker] AbstractBatchedMetadataStore - use AlreadyClosedException instead of IllegalStateException (#19284)
* [fix][broker] Fix open cursor with null-initialPosition result with earliest position (#18416)
* [fix] [ml] Topics stats shows msgBacklog but there reality no backlog (#19275)
* [improve][broker] Added isActive in ManagedCursorImpl (#19341)
* [improve][broker] Replaced checkBackloggedCursors with checkBackloggedCursor(single subscription check) upon subscription (#19343)
* [fix][broker] fixed the build error for pattern matching variable in lower JVM versions (#19362)
* [fix][broker]optimize the shutdown sequence of broker service when it close (#16756)
* [fix][broker] Pass subscriptionName to auth service (#17123) (#19423)
* [fix][broker]fix multi invocation for ledger createComplete (#18975)
* [fix] [broker] getLastMessageId returns a wrong batch index of last message if enabled read compacted (#18877)
* [fix][broker] Support deleting partitioned topics with the keyword `-partition-` (#19230)
* [fix] [ml] Fix the incorrect total size if use ML interceptor (#19404)
* [improve][broker] Added isActive in ManagedCursorImpl (#19341)
* [improve][broker] Added isActive in ManagedCursorImpl (#19341)
* [improve][broker] Copy subscription properties during updating the topic partition number. (#19223)
* [fix][broker] Expect msgs after server initiated CloseProducer (#19446)
* [fix][broker] Fix PulsarRegistrationClient and ZkRegistrationClient not aware rack info problem. (#18672)
* [fix][ml] Fix potential NPE cause future never complete. (#19415)
* [fix] [ml] The atomicity of multiple fields of ml is broken (#19346)
* [fix][broker] Fix race condition while updating partition number (#19199)
* [Improve][broker] Support clear old bookie data for BKCluster (#16744)
* [fix][ml] Reset individualDeletedMessagesSerializedSize after acked all messages. (#19428)
* [fix][broker] Make ServerCnx#originalAuthData volatile (#19507)
* [fix][broker] ServerCnx broken after recent cherry-picks (#19521)
* [fix][broker] Fix loadbalance score caculation problem (#19420)
* [fix] [ml] messagesConsumedCounter of NonDurableCursor was initialized incorrectly (#19355)
* [fix][broker][branch-2.10] Replace sync method call in async call chain to prevent ZK event thread deadlock (#19539)
* [improve][broker] Require authRole is proxyRole to set originalPrincipal (#19455)
* [improve][broker] ServerCnx: go to Failed state when auth fails (#19312)
* [feat][broker] Cherry-pick tests from (#19409)
* [improve][broker] Add test to verify authRole cannot change (#19430)
* [feat][broker] OneStageAuth State: move authn out of constructor (#19295)
* [fix][broker] Correct MockAlwaysExpiredAuthenticationState test impl
* [cleanup][broker] Validate originalPrincipal earlier in ServerCnx (#19270)
* [fix][broker] ServerCnx broken after recent cherry-picks (#19521)
* [fix][broker] Fix loadbalance score caculation problem (#19420)
* [fix] [ml] messagesConsumedCounter of NonDurableCursor was initialized incorrectly (#19355)
* [fix][broker][branch-2.10] Replace sync method call in async call chain to prevent ZK event thread deadlock (#19539)
* [improve][broker] Require authRole is proxyRole to set originalPrincipal (#19455)
* [improve][broker] ServerCnx: go to Failed state when auth fails (#19312）
* [feat][broker] Cherry-pick tests from (#19409)
* [improve][broker] Add test to verify authRole cannot change (#19430)
* [fix][broker] Call originalAuthState.authenticate in ServerCnx
* [fix][broker] Correct MockAlwaysExpiredAuthenticationState test impl
* [fix][broker] Make authentication refresh threadsafe (#19506)
* [fix][broker] Allow proxy to pass same role for authRole and originalRole (#19557)
* [fix][broker] Copy command fields and fix potential thread-safety in ServerCnx (#19517)
* [fix][broker][branch-2.10] Fix geo-replication admin (#19608）
* [fix][broker] PulsarRegistrationClient - implement getAllBookies and follow BookieServiceInfo updates (#18133)
* [Improve][Broker]Reduce GetReplicatedSubscriptionStatus local REST call (#16946)
* [fix] [broker] Incorrect service name selection logic (#19505)
* [improve][broker] Use shrink map for trackerCache (#19534)
* [improve][broker] Add UncaughtExceptionHandler for every thread pool (#18211)
* [cleanup][broker] Simplify extract entryMetadata code in filterEntriesForConsumer (#18729)
* [improve][broker] Follow up #19230 to tighten the validation scope (#19234)
* [fix] [ml] topic load fail by ledger lost (#19444)
* [fix] [broker] Topic close failure leaves subscription in a permanent fence state (#19692)
* [cherry-pick][branch-2.10] Fix deadlock causes session notification not to work (#19754) (#19768)
* [fix][broker] Fix potential exception cause the policy service init fail. (#19746)
* [improve][broker] Authorize originalPrincipal when provided (#19830)
* [fix][broker] Only validate superuser access if authz enabled (#19989)
* [fix][broker] Ignore and remove the replicator cursor when the remote cluster is absent (#19972)
* [fix][broker] Fix index generator is not rollback after entries are failed added (#19980)
* [fix] [proxy] Used in proxyConf file when configuration is missing in the command line (#15938)
* [fix][broker] Remove timestamp from broker metrics (#17419)
* [fix] [broker] Counter of pending send messages in Replicator incorrect if schema future not complete (#19242)

### Transaction
* [fix][txn] Correct the prompt message (#17009)
* [fix][txn] Catch and log runtime exceptions in async operations (#19258)
* [fix][txn] fix txn coordinator recover handle committing and aborting txn race condition. (#19201)
* [improve][txn] Handle changeToReadyState failure correctly in TC client (#19308)
* [cherry-pick][branch-2.10] Allow superusers to abort transactions (#1…9467) (#19473)
* [feature][txn] Fix individual ack batch message with transaction abor…
* Close TransactionBuffer when MessageDeduplication#checkStatus failed (#19288)
* [improve][txn] Cleanup how superusers abort txns (#19976)
* [feature][txn] Fix individual ack batch message with transaction abort redevlier duplicate messages (#14327)

### Pulsar IO and Pulsar Functions
* [fix][io] Update Elasticsearch sink idle cnx timeout to 30s (#19377)
* [fix][fn] Fix k8s merge runtime opts bug (#19481)
* [refactor][fn] Use AuthorizationServer more in Function Worker API (#19975)

### CLI
* [fix] [cli] Fix Broker crashed by too much memory usage of pulsar tools (#20031)

## Admin
* [fix][admin] Fix validatePersistencePolicies that Namespace/Topic persistent policies cannot set to < 0 (#18999)
* [improve][admin][branch-2.10] Unset namespace policy to improve deleting namespace (#17033) (#19865)
* [fix] [admin] fix incorrect state replication.connected on API partitioned-topic stat (#19942)
* [fix] [admin] Make response code to 400 instead of 500 when delete topic fails due to enabled geo-replication (#19879)

### Security
* [fix][sec] Upgrade jettison to 1.5.3 (#19038)
* [fix][sec] Upgrade woodstox to 5.4.0 (#19041)
* [improve][sec] Suppress false positive OWASP reports (#19105)
* [fix][misc] do not require encryption on system topics (#18898)
* [fix][authorization] Fix the return value of canConsumeAsync (#19412)
* [fix][security] Fix secure problem CVE-2017-1000487 (#19479)
* [improve] Upgrade wildfly-eytron (used by debezium) to fix CVE-2022-3143 (#19333)
* [improve][misc] Upgrade Netty to 4.1.87.Final (#19417)
* [fix][broker] Ignore and remove the replicator cursor when the remote cluster is absent (#19972)
* [Authenticate] fix Invalid signature error when use Kerberos Authentication (#15121)
* [fix][sec] Fix transitive critical CVEs in file-system tiered storage (#19957)
* [fix][sec] Fix transitive critical CVEs in file-system tiered storage (#19957)

### CI & Test
* [fix][test] ProxyWithAuthorizationTest remove SAN from test certs (#19594)
* [branch-2.10][test]Run and fix tests (#19636)
* [test] Fix ServerCnxTest failing after merge of #19830

### Others
* [fix][build] Resolve OWASP Dependency Check false positives (#19120)
* Debezium sources: Support loading config from secrets (#19163)
* [fix][proxy] Only go to connecting state once (#19331)
* [fix][build] Upgrade dependency-check-maven plugin to fix broken OWASP check (#19170)
* [branch-2.10][fix][proxy] Fix using wrong client version in pulsar proxy (#19576)
* [branch-2.10][fix][proxy] Fix using wrong client version in pulsar proxy (#19576)
* [improve] Upgrade lombok to 1.8.26 (#19426)
* [improve] upgrade the bookkeeper version to 4.14.7 (#19179)
* [branch-2.10][broker] Support zookeeper read-only config. (#19156) (#19637)
* [improve] Simplify enabling Broker, WS Proxy hostname verification (#19674)
* [cherry-pick][branch-2.10] KCA: picking fixes from master (#19788)
* [Build] Make the test JVM exit if OOME occurs (#14509)
