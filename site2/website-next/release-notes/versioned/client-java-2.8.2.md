---
id: client-java-2.8.2
title: Client Java 2.8.2 
sidebar_label: Client Java 2.8.2 
---

- Remove the uncorrected `VisableTesting` annotation in pulsar-client [#11784](https://github.com/apache/pulsar/pull/11784)
- Fix packages tool parameter desc [#11809](https://github.com/apache/pulsar/pull/11809)
- Add an optional params scope for pulsar oauth2 client [#11931](https://github.com/apache/pulsar/pull/11931)
- Fix producer data race to get cnx [#13176](https://github.com/apache/pulsar/pull/13176)
- Send CloseProducer on timeout [#13161](https://github.com/apache/pulsar/pull/13161)
- Let producer reconnect for state RegisteringSchema [#12781](https://github.com/apache/pulsar/pull/12781)
- Use epoch to version producer's cnx to prevent early de… [#12779](https://github.com/apache/pulsar/pull/12779)
- Pulsar Client: restore SchemaInfo.builder() API [#12673](https://github.com/apache/pulsar/pull/12673)
- Remove invalid call to Thread.currentThread().interrupt(); [#12652](https://github.com/apache/pulsar/pull/12652)
- Add additional error handling in auto partition update task MultiTopicsConsumerImpl [#12620](https://github.com/apache/pulsar/pull/12620)
- Fix invalid firstSentAt in log message when timeout first time [#12588](https://github.com/apache/pulsar/pull/12588)
- Update producer stats when producer close [#12500](https://github.com/apache/pulsar/pull/12500)
- 'StartMessageId' and 'RollbackDuration' not working in MultiTopicsReader for non-partitioned topics [#12308](https://github.com/apache/pulsar/pull/12308)
- Use failPendingMessages to ensure proper cleanup [#12259](https://github.com/apache/pulsar/pull/12259)
- Auto-recovery after exception like out of direct memory [#12170](https://github.com/apache/pulsar/pull/12170)
- Fix endless receiveAsync loop in MultiTopicsConsumer [#12044](https://github.com/apache/pulsar/pull/12044)
- Make Audience Field Optional in OAuth2 Client Credentials [#11988](https://github.com/apache/pulsar/pull/11988)
- Forget to update memory usage on producer close [#11906](https://github.com/apache/pulsar/pull/11906)
- Fix ConcurrentModificationException in sendAsync [#11884](https://github.com/apache/pulsar/pull/11884)
- Hide option -s and substitute -ss(0) for it [#11828](https://github.com/apache/pulsar/pull/11828)
- Fix seek at batchIndex level receive duplicated messages [#11826](https://github.com/apache/pulsar/pull/11826)
- Reduce redundant FLOW requests for non-durable multi-topics consumer [#11802](https://github.com/apache/pulsar/pull/11802)
- Add close method in the class of NegativeAcksTracker [#12469](https://github.com/apache/pulsar/pull/12469)
- Fix a typo in UnAckedMessageTracker [#12467](https://github.com/apache/pulsar/pull/12467)
- Fix message being ignored when the non-persistent topic reader reconnect. [#12348](https://github.com/apache/pulsar/pull/12348)
- Fix deadLetterPolicy is not working with key shared subscription under partitioned topic [#12148](https://github.com/apache/pulsar/pull/12148)
- Forget to call SendCallback on producer close [#11939](https://github.com/apache/pulsar/pull/11939)