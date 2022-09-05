---
id: client-java-2.7.5
title: Client Java 2.7.5
sidebar_label: Client Java 2.7.5
---

- [fix][java] Fix semaphore release duplicated in ProducerImpl [#16972](https://github.com/apache/pulsar/pull/16972)
- [fix][java] Fix MaxQueueSize semaphore release leak in createOpSendMsg [#16915](https://github.com/apache/pulsar/pull/16915)
- [fix][java] Fix PatternTopicsChangedListener blocked when topic removed [#16842](https://github.com/apache/pulsar/pull/16842)
- [fix][java] Fix ReconsumeLater will hang up if retryLetterProducer exception [#16655](https://github.com/apache/pulsar/pull/16655)
- [fix][java] Fix DNS server denial-of-service issue when DNS entry expires [#15403](https://github.com/apache/pulsar/pull/15403)
- [fix][java] Configure Netty DNS resolver to match JDK DNS caching setting, share DNS resolver instance in Proxy [#15219](https://github.com/apache/pulsar/pull/15219)
- [refactor][java] Switch to rely on Netty for Hostname Verification [#15824](https://github.com/apache/pulsar/pull/15824)
- [improve][java] Remove unnecessary Pulsar Client usage from Pulsar Proxy [#13836](https://github.com/apache/pulsar/pull/13836)
