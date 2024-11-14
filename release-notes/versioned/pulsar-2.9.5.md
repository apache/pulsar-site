---
id: pulsar-2.9.5
title: Apache Pulsar2.9.5
sidebar_label: Apache Pulsar 2.9.5
---

#### 2023-4-23

### Broker

* [improve][broker] Omit making a copy of CommandAck when there are no broker interceptors [#18997](https://github.com/apache/pulsar/pull/18997)
* [fix][broker] Copy proto command fields into final variables in ServerCnx [#18987](https://github.com/apache/pulsar/pull/18987)
* [improve][broker] Add logs for why namespace bundle been split (#19003)
* [fix][broker] Fix deadlock in PendingAckHandleImpl (#18989)
* [fix][broker]Update interceptor handler exception (#18940)
* [improve][broker] Make Consumer#equals more effective (#18662)
* [fix][broker]Add test case for deleting namespace fail when has partitioned system topic (#17338)
* [fix][broker] Fix open cursor with null-initialPosition result with earliest position (#18416)
* [improve][broker] Add ref count for sticky hash to optimize the performance of Key_Shared subscription (#19167)
* [fix][broker] Support deleting partitioned topics with the keyword -partition- (#19230)
* [improve][broker] Follow up #19230 to tighten the validation scope (#19234)
* [branch-2.9] Fix compile error caused by cherry-pick #19167. (#19241)
* [improve][websocket][branch-2.9] Add ping support (#19245)
* [fix][ml] Topics stats shows msgBacklog but there reality no backlog (#19275)
* [fix][websocket][branch-2.9] Fix webSocketPingDurationSeconds config (#19293)
* [fix] [ml] Fix the incorrect total size if using ML interceptor (#19404)
* [fix][broker] Expect msgs after server initiated CloseProducer (#19446)
* [cleanup][broker] Validate originalPrincipal earlier in ServerCnx (#19270)
* [fix][Branch-2.9] Fix bookie JVM param BOOKIE_MEM, BOOKIE_GC miss problem. #19441
* [improve][broker] ServerCnx: go to Failed state when auth fails (#19312)
* [fix][broker][branch-2.9] Fix geo-replication admin (#19614)
* [fix] [ml] MessagesConsumedCounter of NonDurableCursor was initialized incorrectly (#19355)
* [fix][ml] Fix potential NPE cause future never complete. (#19415)
* [fix] [ml] Topic load fail by ledger lost (#19444)
* [fix] [broker] The getLastMessageId returns a wrong batch index of last message if enabled read compacted (#18877)
* [fix][broker] Remove timestamp from broker metrics (#17419)
* [fix][broker]Fix multi invocation for ledger createComplete (#18975)
* [improve][broker] Use shrink map for trackerCache (#19534)
* [fix] [broker] Incorrect service name selection logic (#19505)
* [fix] [broker] Make the service name resolver cache of PulsarWebResource expire after access (#19532)
* [fix][branch-2.9] Support zookeeper read-only config (#19693)
* [fix][branch-2.9] Fix validatePersistencePolicies that Namespace/Topic persistent policies cannot be set to < 0 #19687
* [fix][branch-2.9] fix txn coordinator recover handle committing and aborting txn race condition. #19699
* [fix][branch-2.9] Fix race condition while updating partition number (#19691)
* [improve] Upgrade the bookkeeper version to 4.14.7 (#19178)
* [improve] Upgrade lombok to 1.8.26 (#19426)
* [fix][cli][branch-2.9] Fix release tool (#19712)
* [fix] [broker] Topic close failure leaves subscription in a permanent fence state (#19692)
* [fix][meta] Fix deadlock causes session notification not to work (#19754)
* [improve][misc] Upgrade Netty to 4.1.87.Final (#19417)
* [fix][broker] Fix potential exception causing the policy service init to fail. (#19746)
* [improve][broker] Authorize originalPrincipal when provided (#19830)
* [fix] [broker] Counter of pending send messages in Replicator incorrect if schema future not complete #19242
* [branch-2.9][fix][broker] Fix index generator is not rollback after entries are failed added #19978
* [fix][broker] Only validate superuser access if authz enabled #19989


### Proxy
* [fix][proxy] Only go to connecting state once (#19331)

### Transaction

* [fix][txn] Transaction buffer recover blocked by readNext #18970
* [fix][txn] transaction pending ack store future not completely problem (#18943)
* [fix][txn] Fix PendingAckHandleImpl when `pendingAckStoreProvider.checkInitializedBefore` failed (#18859)
* [fix][broker] Close transactionBuffer after MessageDeduplication#checkStatus failed (#19157)
* [fix][txn] Correct the prompt message (#17009)
* [improve][txn] Handle changeToReadyState failure correctly in TC client (#19308)

### Pulsar IO and Pulsar Functions

* [fix][io] Only bundle kafka schema registry client (#18931)
* [fix][fn] Typo in method name (#18844)
* [fix][io] Update Elasticsearch sink idle cnx timeout to 30s (#19377)
* [fix][fn] Fix k8s merge runtime opts bug (#19481)

### Tiered Storage

* [fix][offload] Fix numerical overflow bug while reading data from tiered storage (#18595)
* [fix][offload] Fix memory leak while Offloading ledgers (#18500)

### Pulsar SQL

* [fix][sql] Fix message without schema issue. (#18745)

### CLI

* [fix][cli] Fix CLI client produce don't able to use multiple -m send multiple messages (#18238)
* [fix][cli] Check numMessages after incrementing counter #17826

## Admin

* [improve][admin] Unset namespace policy to improve deleting namespace. (#17033)
* [fix] [admin] Make response code 400 instead of 500 when deleting topic fails due to enabled geo-replication #19879

### Security

* [fix][sec] Upgrade scala-library to get rid of CVE-2022-36944 (#18021)
* [fix][sec] Upgrade jettison to 1.5.3 (#19038)
* [fix][sec] Upgrade woodstox to 5.4.0 (#19041)
* [feat][broker] OneStageAuth State: move authn out of constructor #19295
* [improve][broker] Require authRole is proxyRole to set originalPrincipal (#19455)
* [fix][broker] Make authentication refresh threadsafe (#19506)
* [fix][broker] Allow proxy to pass same role for authRole and originalRole (#19557)
* [improve][sec] Suppress false positive OWASP reports (#19105)
* [improve] Upgrade wildfly-elytron (used by debezium) to fix CVE-2022-3143 (#19333)
* [improve] Simplify enabling Broker, WS Proxy hostname verification (#19674)

### Dependency & Library updates

* [fix][build] Resolve OWASP Dependency Check false positives (#19120)
* [fix][build] Upgrade dependency-check-maven plugin to fix broken OWASP check #19170

### CI & Test

* [improve][broker] Add test to verify authRole cannot change (#19430)
* [fix][test] ProxyWithAuthorizationTest remove SAN from test certs (#19594)
* [test][admin]Add test case: delete namespace when has partitioned system topic #17338
* [improve][broker] Authorize originalPrincipal when provided (#19830)

### Others

* [fix][metrics] Fixed ProxyStats to use common.stats.JvmMetrics (#15692)
