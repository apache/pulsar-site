---
id: client-java-4.0.3
title: Client Java 4.0.3
sidebar_label: Client Java 4.0.3
---

- [fix][sec] Upgrade to Netty 4.1.118 to address [CVE-2025-24970](https://github.com/netty/netty/security/advisories/GHSA-4g8c-wm8x-jfhw) ([#23965](https://github.com/apache/pulsar/pull/23965))
- [feat][client] Support forward proxy for the ZTS server in pulsar-client-auth-athenz ([#23947](https://github.com/apache/pulsar/pull/23947))
- [fix] Avoid NPE when closing an uninitialized SameAuthParamsLookupAutoClusterFailover ([#23911](https://github.com/apache/pulsar/pull/23911))
- [fix] Initialize UrlServiceProvider before trying to use transaction coordinator ([#23914](https://github.com/apache/pulsar/pull/23914))
- [fix][client] Fix LoadManagerReport not found ([#23886](https://github.com/apache/pulsar/pull/23886))
- [fix][client] Fix memory leak in ClientCnx.newLookup when there's TooManyRequestsException ([#23971](https://github.com/apache/pulsar/pull/23971))
- [fix][client] Fix memory leak when message size exceeds max message size and batching is enabled ([#23967](https://github.com/apache/pulsar/pull/23967))
- [fix][client] call redeliver 1 msg but did 2 msgs ([#23943](https://github.com/apache/pulsar/pull/23943))
- [fix][client] fix retry topic with exclusive mode. ([#23859](https://github.com/apache/pulsar/pull/23859))
- [improve][client] Avoid logging errors for retriable errors when creating producer ([#23935](https://github.com/apache/pulsar/pull/23935))
- [improve][client] Update TypedMessageBuilder deliverAfter and deliverAt api comment ([#23969](https://github.com/apache/pulsar/pull/23969))
- [improve][cli] Support additional msg metadata for V1 topic on peek message cmd ([#23978](https://github.com/apache/pulsar/pull/23978))