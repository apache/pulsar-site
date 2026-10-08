---
id: client-java-5.0.0
title: Client Java 5.0.0
sidebar_label: Client Java 5.0.0
---

The 5.0.0 release of the client also includes the changes from these milestone releases:

* [Pulsar client 5.0.0-M1](client-java-5.0.0-M1.md)
* [Pulsar client 5.0.0-M2](client-java-5.0.0-M2.md)

5.0.0 release changes since 5.0.0-M2:

- [fix][client] Apply V5 connection backoff initial and max intervals ([#26799](https://github.com/apache/pulsar/pull/26799))
- [fix][client] Complete a v5 send in place while its client is closing ([#26686](https://github.com/apache/pulsar/pull/26686))
- [fix][client] Complete table view refresh after applying messages ([#26566](https://github.com/apache/pulsar/pull/26566))
- [fix][client] Don't close a shared DNS resolver group's address resolver when a client closes ([#26723](https://github.com/apache/pulsar/pull/26723))
- [fix][client] Drop a send receipt for a removed producer, not the connection ([#26618](https://github.com/apache/pulsar/pull/26618))
- [fix][client] Enable TableView compacted reads for short topic names ([#26626](https://github.com/apache/pulsar/pull/26626))
- [fix][client] Fix buffer ownership on the send failure paths ([#26455](https://github.com/apache/pulsar/pull/26455))
- [fix][client] Flush acknowledgment groups at the combined size limit ([#26594](https://github.com/apache/pulsar/pull/26594))
- [fix][client] Keep a gone segment's producer until the layout drops it ([#26617](https://github.com/apache/pulsar/pull/26617))
- [fix][client] Prevent duplicate cleanup and leaks on producer send failures ([#26641](https://github.com/apache/pulsar/pull/26641))
- [fix][client] Release connections opened after close ([#26733](https://github.com/apache/pulsar/pull/26733))
- [fix][client] Stop DAG watch reconnects on a closing client and quiet perf-tool Ctrl-C shutdown ([#26613](https://github.com/apache/pulsar/pull/26613))
- [improve][client] Coalesce message listener drain scheduling ([#26531](https://github.com/apache/pulsar/pull/26531))
- [improve][client] Log V5 segment-gone send retries at DEBUG ([#26615](https://github.com/apache/pulsar/pull/26615))
- [improve][client] Pull v5 blocking receives straight from the receive buffer ([#26614](https://github.com/apache/pulsar/pull/26614))
- [improve][client] Reduce V5 queue receive completion stages ([#26596](https://github.com/apache/pulsar/pull/26596))
- [improve][client] Skip redundant per-segment cumulative acks in the v5 stream consumer ([#26616](https://github.com/apache/pulsar/pull/26616))
- [feat][client] PIP-445: Add Builder Methods to Create Message-based TableView ([#24809](https://github.com/apache/pulsar/pull/24809))
