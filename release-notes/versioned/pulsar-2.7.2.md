---
id: pulsar-2.7.2
title: Apache Pulsar 2.7.2 
sidebar_label: Apache Pulsar 2.7.2 
---

#### 2021-05-11

#### Broker
- Fix the useless retry when the maximum number of subscriptions is reached [#9991](https://github.com/apache/pulsar/pull/9991)
- wrong timeunit in updating lastLedgerCreationInitiationTimestamp [#10049](https://github.com/apache/pulsar/pull/10049)
- Avoid spammy logs in case of BK problems [#10088](https://github.com/apache/pulsar/pull/10088)
- Fix NonDurableCursorImpl initialPosition by startCursorPosition greater than lastConfirmedEntry problem. [#10095](https://github.com/apache/pulsar/pull/10095)
- fix 8115 Some partitions get stuck after adding additional consumers to the KEY_SHARED subscriptions [#10096](https://github.com/apache/pulsar/pull/10096)
- Add underReplicate state in the topic internal stats [#10013](https://github.com/apache/pulsar/pull/10013)
- Continue graceful shutdown even if web service closing fails [#9835](https://github.com/apache/pulsar/pull/9835)
- Issue 9804: Allow to enable or disable the cursor metrics [#9814](https://github.com/apache/pulsar/pull/9814)
- Allow to configure BookKeeper all BK client features using bookkeeper_ prefix [#9232](https://github.com/apache/pulsar/pull/9232)
- Fix NPEs and thread safety issue in PersistentReplicator [#9763](https://github.com/apache/pulsar/pull/9763)
- Non Persistent Topics: Auto-create partitions even when the auto-creation is disabled [#9786](https://github.com/apache/pulsar/pull/9786)
- Issue 9602: Add schema type validation [#9797](https://github.com/apache/pulsar/pull/9797)
- Fix message not dispatch for key_shared sub type in non-persistent subscription [#9826](https://github.com/apache/pulsar/pull/9826)
- zkBookieRackAffinityMapping bug to support for bookkeeper dnsResolver [#9894](https://github.com/apache/pulsar/pull/9894)
- Messaging Fix delay message block [#10078](https://github.com/apache/pulsar/pull/10078)
- Make PersistentDispatcherMultipleConsumers.readMoreEntries synchronized [#10435](https://github.com/apache/pulsar/pull/10435)
- Fix issue in reusing EntryBatchIndexesAcks instances [#10400](https://github.com/apache/pulsar/pull/10400)
- Fix schema not added when subscribing an empty topic without schema [#9853](https://github.com/apache/pulsar/pull/9853)
- Support advertisedListeners for standalone [#10297](https://github.com/apache/pulsar/pull/10297)
- Fix schema ledger deletion when deleting topic with delete schema. [#10383](https://github.com/apache/pulsar/pull/10383)
- Fix primitive schema upload for ALWAYS_COMPATIBLE strategy. [#10386](https://github.com/apache/pulsar/pull/10386)
- Fix schema type check issue when use always compatible strategy [#10367](https://github.com/apache/pulsar/pull/10367)
- Fix CPU 100% when deleting namespace [#10337](https://github.com/apache/pulsar/pull/10337)
- add return statement to exit asyncMarkDelete early on failure [#10272](https://github.com/apache/pulsar/pull/10272)
- Adding more permits debug statements to better diagnose permit issues [#10217](https://github.com/apache/pulsar/pull/10217)

#### Bookie
- Fallback to PULSAR_GC if BOOKIE_GC is not defined [#9621](https://github.com/apache/pulsar/pull/9621)
- Fallback to PULSAR_EXTRA_OPTS if BOOKIE_EXTRA_OPTS isn't defined [#10397](https://github.com/apache/pulsar/pull/10397)

#### Dependency upgrade
- Upgrade Bouncy Castle to 1.68 [#9199](https://github.com/apache/pulsar/pull/9199)
- Upgrade athenz version and remove yahoo.bintray.com repository [#10471](https://github.com/apache/pulsar/pull/10471)
- Upgrade Netty version to 4.1.60.final [#10073](https://github.com/apache/pulsar/pull/10073)
- Upgrade commons-io to address CVE-2021-29425 [#10287](https://github.com/apache/pulsar/pull/10287)
- Upgrade Jetty libraries to 9.4.39.v20210325 [#10177](https://github.com/apache/pulsar/pull/10177)

#### Proxy
- Issue 10221: Fix authorization error while using proxy and `Prefix` subscription authentication mode [#10226](https://github.com/apache/pulsar/pull/10226)

#### Pulsar Admin
- Add get version command for pulsar rest api, pulsar-admin, pulsar-client [#9975](https://github.com/apache/pulsar/pull/9975)

#### Pulsar SQL
- Using pulsar SQL query messages will appear NoSuchLedger… [#9910](https://github.com/apache/pulsar/pull/9910)

#### Docker
- Allow DockerImage to be built from source tarball [#9846](https://github.com/apache/pulsar/pull/9846)
- Fix docker standalone image error [#10359](https://github.com/apache/pulsar/pull/10359)
- Suppress printing of "skip Processing" lines in startup scripts [#10275](https://github.com/apache/pulsar/pull/10275)
- Issue 10058:apply-config-from-env.py to commented default values [#10060](https://github.com/apache/pulsar/pull/10060)

#### Client





#### Functions and Pulsar IO
- Allow customizable function logging [#10389](https://github.com/apache/pulsar/pull/10389)
- Pass through record properties from Pulsar Sources [#9943](https://github.com/apache/pulsar/pull/9943)
- ISSUE 10153: Pulsar Functions Go fix time unit ns -> ms [#10160](https://github.com/apache/pulsar/pull/10160)
- Kinesis Connector: Fix kinesis sink can not retry to send messages [#10420](https://github.com/apache/pulsar/pull/10420)
- Kinesis Connector: Fix null error messages in onFailure exception in KinesisSink. [#10416](https://github.com/apache/pulsar/pull/10416)

#### Tiered Storage
- Prevent Class Loader Leak; Restore Offloader Directory Override [#9878](https://github.com/apache/pulsar/pull/9878)
- Add logs for cleanup offloaded data operation [#9852](https://github.com/apache/pulsar/pull/9852)