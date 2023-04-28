---
id: client-java-2.11.1
title: Client Java 2.11.1
sidebar_label: Client Java 2.11.1
---

- [feature][Java] Support MAX_ACK_GROUP_SIZE configurable [#18107](https://github.com/apache/pulsar/pull/18107)
- [feature][Java] Support LocalDateTime Conversion [#18334](https://github.com/apache/pulsar/pull/18334)
- [improve][Java] Set fields earlier for correct ClientCnx initialization [#19327](https://github.com/apache/pulsar/pull/19327)
- [improve][Java] Improve docs and code quality about KeyValueSchema usages [#17256](https://github.com/apache/pulsar/pull/17256)
- [improve][Java] Add init capacity for messages in BatchMessageContainerImpl [#17822](https://github.com/apache/pulsar/pull/17822)
- [improve][Java] Unify the acknowledge process for batch and non-batch message IDs [#17833](https://github.com/apache/pulsar/pull/17833)
- [improve][Java] Set authentication when using loadConf in client and admin client [#18358](https://github.com/apache/pulsar/pull/18358)
- [improve][Java] Change the get lastMessageId to debug level [#18421](https://github.com/apache/pulsar/pull/18421)
- [improve][Java] Avoid redelivering duplicated messages when batching is enabled [#18486](https://github.com/apache/pulsar/pull/18486)
- [improve][Java] Broker address resolution wrong if connect through a multi-dns names proxy [#19597](https://github.com/apache/pulsar/pull/19597)
- [improve][Java] Moving get sequenceId into the sync code segment [#19837](https://github.com/apache/pulsar/pull/19837)
- [fix][Java] For exclusive subscriptions, if two consumers are created repeatedly, the second consumer will block [#18633](https://github.com/apache/pulsar/pull/18633)
- [fix][Java] Prevent DNS reverse lookup when physical address is an IP address [#19028](https://github.com/apache/pulsar/pull/19028)
- [fix][Java] Fix reader listener can't auto ack with pooled message [#19354](https://github.com/apache/pulsar/pull/19354)
- [fix][Java] Fix exception when calling loadConf on a ConsumerBuilder that has a KeySharedPolicy [#18345](https://github.com/apache/pulsar/pull/18345)
- [fix][Java] Fix pendingLookupRequestSemaphore leak [#18219](https://github.com/apache/pulsar/pull/18219)
- [fix][Java] Fixes batch_size not checked in MessageId#fromByteArrayWithTopic [#18405](https://github.com/apache/pulsar/pull/18405)
- [fix][Java] Fix possible npe [#18406](https://github.com/apache/pulsar/pull/18406)
- [fix][Java] Fix failover/exclusive consumer with batch cumulate ack issue [#18454](https://github.com/apache/pulsar/pull/18454)
- [fix][Java] Fix the Windows absolute path not recognized in auth param string [#18403](https://github.com/apache/pulsar/pull/18403)
- [fix][Java] Fix memory leak if enabled pooled messages [#19585](https://github.com/apache/pulsar/pull/19585)
- [fix][Java] Fix authentication not update after changing the serviceUrl [#19510](https://github.com/apache/pulsar/pull/19510)
- [fix][Java] Fix async completion in ConsumerImpl#processPossibleToDLQ [#19392](https://github.com/apache/pulsar/pull/19392)
- [fix][Java] Fix DeadLetterProducer creation callback blocking client io thread [#19930](https://github.com/apache/pulsar/pull/19930)
