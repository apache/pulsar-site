---
id: client-java-3.0.17
title: Client Java 3.0.17
sidebar_label: Client Java 3.0.17
---

- [fix][sec] Upgrade BouncyCastle to 1.84 (CVE-2026-5588, CVE-2026-0636) ([#25569](https://github.com/apache/pulsar/pull/25569))
- [fix][sec] Upgrade to async-http-client 2.14.5 to address CVE-2026-40490 ([#25546](https://github.com/apache/pulsar/pull/25546))
- [fix][sec] Upgrade to Netty 4.1.132.Final to address CVEs ([#25399](https://github.com/apache/pulsar/pull/25399))
- [fix][sec] Upgrade aircompressor to 2.0.3 to resolve CVE-2025-67721 ([#25256](https://github.com/apache/pulsar/pull/25256))
- [fix][sec] Upgrade Jackson version to 2.18.6 ([#25264](https://github.com/apache/pulsar/pull/25264))
- [fix][client] Fail messages immediately in ProducerImpl when in terminal state ([#25317](https://github.com/apache/pulsar/pull/25317))
- [improve][common] Optimize TopicName.get() to reduce lock contention on cache lookup ([#25367](https://github.com/apache/pulsar/pull/25367))
- [improve][broker] Improve the performance of TopicName constructor ([#24463](https://github.com/apache/pulsar/pull/24463))