---
id: client-java-3.1.0
title: Client Java 3.1.0
sidebar_label: Client Java 3.1.0
---

- Disable polling pattern topics when TopicListWatcher is enabled. [#20779](https://github.com/apache/pulsar/pull/20779)
- Fix negative message re-delivery twice issue [#20750](https://github.com/apache/pulsar/pull/20750)
- Fix subscribing pattern topics through Proxy not working [#20739](https://github.com/apache/pulsar/pull/20739)
- Messages lost when consumers reconnect [#20695](https://github.com/apache/pulsar/pull/20695)
- Fix the deadlock issue of consumers while using multiple IO threads [#20669](https://github.com/apache/pulsar/pull/20669)
- Make the whole grabCnx() progress atomic [#20595](https://github.com/apache/pulsar/pull/20595)
- Swallow Conscrypt ClassNotFoundException [#20371](https://github.com/apache/pulsar/pull/20371)
- Improve for thread-safe `seek` [#20321](https://github.com/apache/pulsar/pull/20321)
- Document Java Client's Seek logic thread-safety improved in 20242 [#20284](https://github.com/apache/pulsar/pull/20284)
- Fix where the function getMsgNumInReceiverQueue always returns 0 when using message listener [#20245](https://github.com/apache/pulsar/pull/20245)
- Java Client's Seek Logic Not Threadsafe 1 [#20242](https://github.com/apache/pulsar/pull/20242)
- SchemaDefinition handle JSR310_CONVERSION_ENABLED property [#20201](https://github.com/apache/pulsar/pull/20201)
- Enable custom Encrypt/Decrypt Methods for ReaderImplementation. [#12599](https://github.com/apache/pulsar/pull/12599)
