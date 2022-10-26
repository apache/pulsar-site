---
id: pulsar-2.7.1
title: Apache Pulsar 2.7.1 
sidebar_label: Apache Pulsar 2.7.1 
---

#### 2021-03-18

#### Broker

- Fix topic ownership is not checked when getting topic policy [#9781](https://github.com/apache/pulsar/pull/9781)
- Fix the issue of consumers cannot be created for older subscriptions if the limit of `maxSubscriptionsPerTopic` is reached [#9758](https://github.com/apache/pulsar/pull/9758)
- Fix marking individual deletes as dirty [#9732](https://github.com/apache/pulsar/pull/9732)
- Fix broker-address header added when response has already been committed [#9744](https://github.com/apache/pulsar/pull/9744)
- Fix ByteBuffer allocate error in the AirliftUtils [#9667](https://github.com/apache/pulsar/pull/9667)
- Use Atomic Field Updater to increment volatile messagesConsumedCounter [#9656](https://github.com/apache/pulsar/pull/9656)
- Schema comparison logic change [#9612](https://github.com/apache/pulsar/pull/9612)
- Add metrics for the cursor ack state [#9618](https://github.com/apache/pulsar/pull/9618)
- Fix race condition in BrokerService topic cache [#9565](https://github.com/apache/pulsar/pull/9565)
- Avoid introducing bookkeeper-common into the pulsar-common [#9551](https://github.com/apache/pulsar/pull/9551)
- Async read entries with max size bytes [#9532](https://github.com/apache/pulsar/pull/9532)
- Fix the metric data of msgDelayed for partitioned topics is not aggregated [#9529](https://github.com/apache/pulsar/pull/9529)
- Fix the batch index ack persistent issue [#9504](https://github.com/apache/pulsar/pull/9504)
- Fix logic in ManagedLedgerWriter when config threadNum >= ledgerNum [#9479](https://github.com/apache/pulsar/pull/9497)
- Do not use a static map of listeners in TopicPoliciesService [#9486](https://github.com/apache/pulsar/pull/94861)
- Makes subscription start from MessageId.latest as default [#9444](https://github.com/apache/pulsar/pull/9444)
- Fix setting backlogQuota will always succeed [#9382](https://github.com/apache/pulsar/pull/9382)
- Skip clear delayed messages while dispatch does not init [#9378](https://github.com/apache/pulsar/pull/9378)
- Expose offloaded storage size to the topic stats [#9335](https://github.com/apache/pulsar/pull/9335)
- Expose more info with unknown exception [#9323](https://github.com/apache/pulsar/pull/9323)
- Add alerts for expired/expiring soon tokens [#9321](https://github.com/apache/pulsar/pull/9321)
- Fix fake complete issue in offloading [#9306](https://github.com/apache/pulsar/pull/9306)
- Fix system topic can not auto created [#9272](https://github.com/apache/pulsar/pull/9272)
- Fix BookkeeperSchemaStorage NPE [#9264](https://github.com/apache/pulsar/pull/9264)
- Fix race condition on producer/consumer maps in ServerCnx [#9256](https://github.com/apache/pulsar/pull/9256)
- Fix interceptor disabled in ResponseHandlerFilter.java [#9252](https://github.com/apache/pulsar/pull/9252)
- Fix the interceptor that not handle boundary for multipart/form-data [#9247](https://github.com/apache/pulsar/pull/9247)
- Add authentication metrics [#9244](https://github.com/apache/pulsar/pull/9244)
- Handle web application exception to redirect request [#9228](https://github.com/apache/pulsar/pull/9228)
- Skip the interceptor for MediaType.MULTIPART_FORM_DATA [#9217](https://github.com/apache/pulsar/pull/9217)
- Keep topic-level policies commands consistent with that for namespace level [#9215](https://github.com/apache/pulsar/pull/9215)
- Fix handle topic loading failure due to broken schema ledger [#9212](https://github.com/apache/pulsar/pull/9212)
- Fix issue with topic compaction when compaction ledger is empty [#9206](https://github.com/apache/pulsar/pull/9206)
- Fix incoming message size issue that introduced in #9113 [#9182](https://github.com/apache/pulsar/pull/9182)
- Disallow parsing of token with none signature in authenticateToken [#9172](https://github.com/apache/pulsar/pull/9172)
- Fix locking for ConsumerImpl when creating deadLetterProducer [#9166](https://github.com/apache/pulsar/pull/9166)
- Fix maxProducersPerTopic cannot be disabled at the namespace level [#9157](https://github.com/apache/pulsar/pull/9157)
- Fix wrong default value [#9149](https://github.com/apache/pulsar/pull/9149)
- Fix the closed ledger did not delete after expired [#9136](https://github.com/apache/pulsar/pull/9136)
- Additional error checks in TwoPhasesCompactor [#9133](https://github.com/apache/pulsar/pull/9133)
- Fix master broker while subscribing to non-persistent partitioned topics without topic auto-creation [#9107](https://github.com/apache/pulsar/pull/9107)
- Support chained authentication with same auth method name [#9094](https://github.com/apache/pulsar/pull/9094)
- Broker expires messages one at a time after topic unload [#9083](https://github.com/apache/pulsar/pull/9083)
- Add refresh authentication command in broker [#9064](https://github.com/apache/pulsar/pull/9064)
- Add updateRates method for kop to collect publish rate [#9094](https://github.com/apache/pulsar/pull/9049)
- Fix DelayedDelivery at the broker level has a default value [#9030](https://github.com/apache/pulsar/pull/9030)
- Getting the stats of a non-persistent topic that has been cleaned causes it to re-appear [#9029](https://github.com/apache/pulsar/pull/9029)
- Add raw Prometheus metrics provider [#9021](https://github.com/apache/pulsar/pull/9021)
- Improve error handling when broker doesn't trust client certificates [#8998](https://github.com/apache/pulsar/pull/8998)
- Remove duplicated broker Prometheus metrics type [8995](https://github.com/apache/pulsar/pull/8995)
- Peeking at compressed messages throws an exception (Readonly buffers not supported by Airlift) [#8990](https://github.com/apache/pulsar/pull/8990)
- Make namespaces isolation policy updates take effect on time [#8976](https://github.com/apache/pulsar/pull/8976)
- Fix NPE in PersistentStickyKeyDispatcherMultipleConsumers [#8969](https://github.com/apache/pulsar/pull/8969)
- Fix the recovery not respect to the isolation group settings [#8961](https://github.com/apache/pulsar/pull/8961)
- Add properties default value for SchemaInfoBuilder [#8952](https://github.com/apache/pulsar/pull/8952)
- Consumer support update stats with specified stats [#8951](https://github.com/apache/pulsar/pull/8951)
- Support configure max subscriptions per topic on the topic level policy [#8948](https://github.com/apache/pulsar/pull/8948)
- Fix subscription dispatch rate does not work after the topic unload without dispatch rate limit [#8947](https://github.com/apache/pulsar/pull/8947)
- Avro custom schema not working in consumer [#8939](https://github.com/apache/pulsar/pull/8939)
- Expose non-contiguous deleted messages ranges stats [#8936](https://github.com/apache/pulsar/pull/8936)
- Intercept beforeSendMessage calls [#8932](https://github.com/apache/pulsar/pull/8932)
- Monitor if a cursor moves its mark-delete position [#8930](https://github.com/apache/pulsar/pull/8930)
- Capture stats with precise backlog [#8928](https://github.com/apache/pulsar/pull/8928)
- Support configure max subscriptions per topic on the namespace level policy [#8924](https://github.com/apache/pulsar/pull/8924)
- Export Prometheus metric for messageTTL [#8871](https://github.com/apache/pulsar/pull/8871)
- Add pulsar-perf new feature: one subscription has more than one consumer [#8837](https://github.com/apache/pulsar/pull/8837)
- Execute removing non-persistent subscription of a topic from a different thread to avoid deadlock when removing inactive subscriptions [#8820](https://github.com/apache/pulsar/pull/8820)
- Fix get partition metadata problem for a non-existed topic [#8818](https://github.com/apache/pulsar/pull/8818)
- Fix the problem that batchMessageId is converted to messageIdImpl [#8779](https://github.com/apache/pulsar/pull/8779)
- Clear delayed messages when clear backlog [#8691](https://github.com/apache/pulsar/pull/8691)
- Fixes first automatic compaction issue [#8209](https://github.com/apache/pulsar/pull/8209)

#### Proxy

- Fix Proxy Config bindAddress does not working for servicePort [#9068](https://github.com/apache/pulsar/pull/9068)
- Return correct authz and auth errors from proxy to client [#9055](https://github.com/apache/pulsar/pull/9055)
- Fix the metadata setup compatibility issue [#8959](https://github.com/apache/pulsar/pull/8959)
- Support HAProxy proxy protocol for broker and proxy [#8686](https://github.com/apache/pulsar/pull/8686)

#### Pulsar Perf

- Dump JVM information [#9769](https://github.com/apache/pulsar/pull/9769)
- pulsar-perf uses DefaultCryptoKeyReader for E2E encryption  [#9668](https://github.com/apache/pulsar/pull/9668)
- Add --batch-index-ack for the pulsar-perf [#9521](https://github.com/apache/pulsar/pull/9521)

#### Transaction

- Fix deleteTransactionMarker memory leak [#9752](https://github.com/apache/pulsar/pull/9752)
- Fix transaction messages order error and deduplication error [#9024](https://github.com/apache/pulsar/pull/9024)
- Fix transaction log replay not handle right [#8723](https://github.com/apache/pulsar/pull/8723)

#### Pulsar Admin

- Validate offload param [#9737](https://github.com/apache/pulsar/pull/9737)
- Inform user when expiring message request is not executed. [#9561](https://github.com/apache/pulsar/pull/9561)
- Fix get-message-by-id throwing NPE when message is null [#9537](https://github.com/apache/pulsar/pull/9537)
- Expire message by position [#9519](https://github.com/apache/pulsar/pull/9519)
- Add subscription backlog size info for topicstats [#9302](https://github.com/apache/pulsar/pull/9302)
- Expose schema ledger in `topic stats-internal` [#9284](https://github.com/apache/pulsar/pull/9284)
- Fix potential HTTP get hangs in the Pulsar Admin [#9203](https://github.com/apache/pulsar/pull/9203)
- Fix admin-api-brokers list failed [#9191](https://github.com/apache/pulsar/pull/9191)
- Fix force delete namespace did not delete all topics of the namespace [#8806](https://github.com/apache/pulsar/pull/8806)
- Change method `getWebServiceUrl` into async [#8746](https://github.com/apache/pulsar/pull/8746)
- Fix cannot get lastMessageId for an empty topic due to message retention [#8725](https://github.com/apache/pulsar/pull/8725)

#### Pulsar SQL

- Duplicate key `__pfn_input_topic__` in presto server [#9686](https://github.com/apache/pulsar/pull/9686)
- Pulsar sql key-value schema separated model support [#9685](https://github.com/apache/pulsar/pull/9685)
- Fix OffloadPolicies json serialization error in Pulsar SQL [#9300](https://github.com/apache/pulsar/pull/9300)

#### Function

- Add downloadDirectory support to function k8s runtime [#9619](https://github.com/apache/pulsar/pull/9619)
- Kubernetes runtime functions create rfc1123 compliant labels [#9556](https://github.com/apache/pulsar/pull/9556)
- Fix can't create functions with m-TLS [#9553](https://github.com/apache/pulsar/pull/9553)
- Fix reading metrics will always get stuck in some cases [#9538](https://github.com/apache/pulsar/pull/9538)
- Call the corresponding restart according to the componentype [#9519](https://github.com/apache/pulsar/pull/9519)
- Fix narExtractionDirectory not set [#9319](https://github.com/apache/pulsar/pull/9319)
- Fix java function logging appender not added to java function logger [#9299](https://github.com/apache/pulsar/pull/9299)
- Fix don't attempt to clean up packages when Source/Sink is builtin [#9289](https://github.com/apache/pulsar/pull/9289)
- Fix function worker get superuser role [#9259](https://github.com/apache/pulsar/pull/9259)
- Fix broker and functions-worker authentication compatibility [#9190](https://github.com/apache/pulsar/pull/9190)
- Splitting the authentication logic of function worker and client [#8824](https://github.com/apache/pulsar/pull/8824)
- [Go] Fix metrics server handler error [#9394](https://github.com/apache/pulsar/pull/9394)
- [Go] Add metrics server to go function [#9318](https://github.com/apache/pulsar/pull/9318)
- [Go] Fix publishfunc example is broken [#9124](https://github.com/apache/pulsar/pull/9124)

#### Pulsar IO

- Add option for auto.offset.reset to kafka source [#9482](https://github.com/apache/pulsar/pull/9482)
- Fix debezium-connector error log [#9063](https://github.com/apache/pulsar/pull/9063)
- Fix NSQ source META-INF file name and sourceConfigClass [#8941](https://github.com/apache/pulsar/pull/8941)
- Make Source topic Schema information available to downstream Sinks [#8854](https://github.com/apache/pulsar/pull/8854)

#### Tiered Storage

- Allow AWS credentials to be refreshed [#9387](https://github.com/apache/pulsar/pull/9387)
- Offload manager initialization once [#8739](https://github.com/apache/pulsar/pull/8739)
- Configurable data source for offloaded messages [#8717](https://github.com/apache/pulsar/pull/8717)
