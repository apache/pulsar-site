---
id: client-java-2.7.4
title: Client Java 2.7.4 
sidebar_label: Client Java 2.7.4 
---

- [Java] Refactor seek to reuse common logic. [#9670](https://github.com/apache/pulsar/pull/9120)
- [Java] Process partitioned-topic messages on different listener-threads. [#10017](https://github.com/apache/pulsar/pull/10017)
- [Java] Fix Consumer listener does not respect receiver queue size. [#11455](https://github.com/apache/pulsar/pull/11455)
- [Java] Add a optional params scope for pulsar oauth2 client. [#11931](https://github.com/apache/pulsar/pull/11931)
- [Java] Fix seek at batchIndex level receive duplicated messages. [#11826](https://github.com/apache/pulsar/pull/11826)
- [Java] Fix race condition on multi-topic consumer. [#11764](https://github.com/apache/pulsar/pull/11764)
- [Java] Remove consumer reference from PulsarClient on subscription failure. [#11758](https://github.com/apache/pulsar/pull/11758)
- [Java] Fix block forever bug in Consumer.batchReceive. [#11691](https://github.com/apache/pulsar/pull/11691)
- [Java] Send CloseProducer on timeout. [#13161](https://github.com/apache/pulsar/pull/13161)
- [Java] Remove invalid call to Thread.currentThread().interrupt(). [#12652](https://github.com/apache/pulsar/pull/12652)

