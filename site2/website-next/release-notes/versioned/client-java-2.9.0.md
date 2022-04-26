---
id: client-java-2.9.0
title: Client Java 2.9.0 
sidebar_label: Client Java 2.9.0 
---

- Add partition-change API for producer or consumer interceptors. [12287](https://github.com/apache/pulsar/pull/12287)
- Fix deadLetterPolicy is not working with key shared subscription under partitioned topic. [12148](https://github.com/apache/pulsar/pull/12148)
- Fix endless receiveAsync loop in MultiTopicsConsumer. [12044](https://github.com/apache/pulsar/pull/12044)
- Reduce redundant FLOW requests for non-durable multi-topics consumer. [11802](https://github.com/apache/pulsar/pull/11802)
- Set and return topic names on message API. [11743](https://github.com/apache/pulsar/pull/11743)
- Separate lookup timeout from operation timeout (PIP-91). [11627](https://github.com/apache/pulsar/pull/11627)
- Switch from pretty print to compact print for configs. [11609](https://github.com/apache/pulsar/pull/11609)
- Java Client: remove usage of reflection while using Pulsar Implementation classes. [11636](https://github.com/apache/pulsar/pull/11636)
- Add a optional params scope for pulsar oauth2 client. [11931](https://github.com/apache/pulsar/pull/11931)
- Schema.NATIVE_AVRO: add a version of AUTO_PRODUCE_BYTES that doesn't validate the message in `encode`. [11238](https://github.com/apache/pulsar/pull/11238)

