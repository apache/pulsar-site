---
id: client-java-4.2.1
title: Client Java 4.2.1
sidebar_label: Client Java 4.2.1
---

- [fix][sec] Upgrade BouncyCastle to 1.84 (CVE-2026-5588, CVE-2026-0636) ([#25569](https://github.com/apache/pulsar/pull/25569))
- [fix][sec] Upgrade to Netty 4.1.132.Final to address CVEs ([#25399](https://github.com/apache/pulsar/pull/25399))
- [fix][sec] Upgrade log4j to 2.25.4 to address CVE-2026-34477, CVE-2026-34478, CVE-2026-34480, CVE-2026-34481
- [fix][client] Fix thread-safety and refactor MessageCryptoBc key management ([#25400](https://github.com/apache/pulsar/pull/25400))
- [improve][common] Optimize TopicName.get() to reduce lock contention on cache lookup ([#25367](https://github.com/apache/pulsar/pull/25367))
- [improve][broker] Improve the performance of TopicName constructor ([#24463](https://github.com/apache/pulsar/pull/24463))
