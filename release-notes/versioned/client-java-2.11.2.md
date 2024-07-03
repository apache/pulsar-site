---
id: client-java-2.11.2
title: Client Java 2.11.2
sidebar_label: Client Java 2.11.2
---

- [improve][Java] Cache empty schema version in ProducerImpl schemaCache [#19929](https://github.com/apache/pulsar/pull/19929)
- [improve][Java] Make the whole grabCnx() progress atomic [#20595](https://github.com/apache/pulsar/pull/20595)
- [fix][Java] Use scheduled executor in BinaryProtoLookupService [#20043](https://github.com/apache/pulsar/pull/20043)
- [fix][Java] Release the orphan producers after the primary consumer is closed [#19858](https://github.com/apache/pulsar/pull/19858)
- [fix][Java] Fix NPE when acknowledging multiple messages [#19874](https://github.com/apache/pulsar/pull/19874)
- [fix][Java] Fix where the function getMsgNumInReceiverQueue always returns 0 when using message listener [#20245](https://github.com/apache/pulsar/pull/20245)
- [fix][Java] Fix deadlock issue of consumer while using multiple IO threads [#20669](https://github.com/apache/pulsar/pull/20669)
- [fix][Java] Messages lost when consumer reconnect [#20695](https://github.com/apache/pulsar/pull/20695)
