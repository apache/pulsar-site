---
id: client-java-2.6.3
title: Client Java 2.6.3 
sidebar_label: Client Java 2.6.3 
---


- Fix the connection leak [#6524](https://github.com/apache/pulsar/pull/6524)
- Cancel the sendtimeout task for the producer after creation failure [#8497](https://github.com/apache/pulsar/pull/8497)
- Fix the typo in `pulsar-client-all` module's pom.xml file [#8543](https://github.com/apache/pulsar/pull/8543)
- Add more information in send timeout exception [#8931](https://github.com/apache/pulsar/pull/8931)
- Fix the unavailable hash range condition [#9041](https://github.com/apache/pulsar/pull/9041)
- Fix NPE when `MultiTopicsConsumerImpl` receives null-value messages [#9113](https://github.com/apache/pulsar/pull/9113)
- Fix the issue with the incoming message size that is introduced by issue #9113 [#9182](https://github.com/apache/pulsar/pull/9182) 

