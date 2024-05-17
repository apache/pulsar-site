---
id: client-java-3.0.5
title: Client Java 3.0.5
sidebar_label: Client Java 3.0.5
---

- [fix][client] Fix Consumer should return configured batch receive max messages ([#22619](https://github.com/apache/pulsar/pull/22619))
- [fix][client] Fix ReaderBuilder doest not give illegalArgument on connection failure retry ([#22639](https://github.com/apache/pulsar/pull/22639))
- [fix][client] Fix client side memory leak when call MessageImpl.create and fix imprecise client-side metrics: pendingMessagesUpDownCounter, pendingBytesUpDownCounter, latencyHistogram ([#22393](https://github.com/apache/pulsar/pull/22393))