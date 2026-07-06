---
id: client-java-4.2.3
title: Client Java 4.2.3
sidebar_label: Client Java 4.2.3
---

- [fix][client] Run the failover health probe off the Netty event-loop thread ([#26064](https://github.com/apache/pulsar/pull/26064))
- [fix][client] Prevent client shutdown from leaking event loop threads when DNS resolver close fails ([#26045](https://github.com/apache/pulsar/pull/26045))