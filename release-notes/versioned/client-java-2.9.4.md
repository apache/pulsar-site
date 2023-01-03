---
id: client-java-2.9.4
title: Client Java 2.9.4
sidebar_label: Client Java 2.9.4
---

## What's Changed

* [fix][client] Memory limit currentUsage leak and semaphore release duplicated in ProducerImpl [#16971](https://github.com/apache/pulsar/pull/16971)
* [fix][client] MaxQueueSize semaphore release leak in createOpSendMsg [#16958](https://github.com/apache/pulsar/pull/16958)
* [fix][client][txn] Use PulsarClient HashWheelTimer to schedule producer batch trigger task [#18058](https://github.com/apache/pulsar/pull/18058)
