---
title: "Apache Pulsar 5.0.0-M1: A Preview of the Next Major Release"
author: Matteo Merli, Lari Hotari
date: 2026-06-23
---

The Apache Pulsar community is voting on **Apache Pulsar 5.0.0-M1**, the first milestone of the upcoming Pulsar 5.0. This is a **preview release**: it bundles the major new features of 5.0 so the community can try them, run them against real workloads, and send feedback well before the general-availability release. It is **not intended for production**.

5.0 is a big release. Its headline is **Scalable Topics** — a new kind of topic that grows and shrinks on its own — and the elevation of **Oxia** to the recommended metadata store. This post walks through what's in M1 and how to try it.

<!--truncate-->

## A preview, built for feedback

5.0.0-M1 is a milestone build, not a final release. We're shipping it early, while the community votes on it, for one reason: the changes in 5.0 are significant enough that we want real-world feedback before they're locked in for the GA release, which is targeted for later in 2026.

Please run it on **non-production** clusters, exercise the new APIs, and tell us what works and what doesn't — file issues on [GitHub](https://github.com/apache/pulsar/issues) or discuss on the [dev@pulsar.apache.org](https://pulsar.apache.org/contact/) mailing list. Your testing now directly shapes what 5.0 becomes at GA.

## Scalable Topics: topics that size themselves

A topic should be a **logical concept** — a named stream you publish to and consume from. As an application developer, you shouldn't have to reason about the infrastructure that makes that stream fast. Yet for its entire history, Pulsar has asked you to answer an infrastructure question up front that has nothing to do with your application: **how many partitions?**

That single number is a guess that's easy to get wrong and hard to undo. Too few and you cap your throughput; too many and you carry overhead a quiet topic never needed. You can raise the count later but never lower it, and changing it breaks per-key ordering. It forces an infrastructure decision into application design — before you even know how the topic will be used.

**Scalable topics** take that decision away. A scalable topic — addressed with the new `topic://` scheme — is a single logical stream that Pulsar sizes to its actual load. Internally it is a set of **key-range segments** that the broker **splits** when part of the keyspace gets hot and **merges** when it goes cold: at runtime, with no downtime, and without ever breaking the ordering of any individual key.

The aim is for one topic type to be the right choice in every situation, **transparently and out of the box** — from a single firehose carrying tens of gigabytes per second to millions of tiny topics each with a trickle of traffic. You model your application around the topics that fit your domain, and the system continuously adapts to how they are actually used. No capacity planning, no re-sharding, no hard decisions to push onto developers.

Scalable topics are delivered by a family of proposals in 5.0:

- **[PIP-460](https://github.com/apache/pulsar/blob/master/pip/pip-460.md): Scalable Topics (Topics v5)** — the overall model: the segment DAG, range-based key routing, and design principles.
- **[PIP-468](https://github.com/apache/pulsar/blob/master/pip/pip-468.md): Scalable Topic Controller** — the broker-side controller that runs split/merge, assigns consumers, and pushes the live topology to clients.
- **[PIP-483](https://github.com/apache/pulsar/blob/master/pip/pip-483.md): Auto Split/Merge** — splits hot segments and merges cold ones automatically, tunable per broker, namespace, and topic.
- **[PIP-466](https://github.com/apache/pulsar/blob/master/pip/pip-466.md): New Java Client API (V5)** — a modern, sync-first Java client built for scalable topics.
- **[PIP-473](https://github.com/apache/pulsar/blob/master/pip/pip-473.md): Metadata-Driven Transactions** — transactions that survive segment splits and merges.
- **[PIP-475](https://github.com/apache/pulsar/blob/master/pip/pip-475.md): Regular-to-Scalable Migration** — convert an existing topic to a scalable topic in place, with no data copy.

### A new client API

The V5 client is groundbreaking work in its own right. Over more than a decade, Pulsar's client API grew one feature at a time, accumulating options, overloads, and subtle inconsistencies along the way. The **V5 client** is a clean-slate redesign that distills those years of lessons — learned from real users running Pulsar in production — into a focused API: it surfaces the capabilities that matter and sheds the noise and rough edges that accumulated along the road.

Consumption is the clearest example. The classic client offers a single `Consumer` shaped by one of four subscription types — Exclusive, Failover, Shared, Key_Shared — plus a separate `Reader`, with behavior that shifts subtly as you combine options. The V5 client replaces all of it with three **purpose-built** consumers, each exposing exactly the operations that make sense for it:

- **Stream consumer** — ordered, cumulative-ack consumption.
- **Queue consumer** — parallel, individually-acked work-queue consumption with dead-letter support.
- **Checkpoint consumer** — for stream processors (Flink, Spark) that track their own position.

The V5 client (`pulsar-client-v5`) also works against your existing partitioned and non-partitioned topics, so you can adopt the new API before migrating any topic — and a consumer can now subscribe to an entire **namespace**, filtered by topic properties. In M1 the V5 client is available for Java; the other language SDKs will follow before GA.

Start here: [Scalable topics concepts](https://pulsar.apache.org/docs/next/concepts-scalable-topics), the [V5 Java client](https://pulsar.apache.org/docs/client-libraries/java-v5), and the [migration guide](https://pulsar.apache.org/docs/client-libraries/java-migrate-to-v5).

## Oxia is now the recommended metadata store

[Oxia](https://github.com/oxia-db/oxia) is a scalable metadata store and coordination system. In 5.0 it becomes the **recommended metadata store** for new Pulsar clusters, and it is the preferred backend for scalable topics, whose lookups rely on its streaming watch sessions.

ZooKeeper remains fully supported, and 5.0 makes the transition painless:

- **[PIP-454](https://github.com/apache/pulsar/blob/master/pip/pip-454.md): Metadata Store Migration Framework** — a live, **zero-downtime** migration from ZooKeeper to Oxia. The data plane keeps publishing and consuming while metadata is copied. See [Migrate metadata store](https://pulsar.apache.org/docs/next/administration-metadata-store-migration).
- **[PIP-469](https://github.com/apache/pulsar/blob/master/pip/pip-469.md): Metadata-store topic policies** — topic policies can be stored directly in the metadata store, with legacy-aware routing for clusters still on system-topic policies.

5.0 also **removes the etcd metadata store backend** ([PIP-462](https://github.com/apache/pulsar/blob/master/pip/pip-462.md)). ZooKeeper and Oxia are the supported backends going forward; etcd users should migrate before upgrading.

## Other notable changes

- **IO connectors moved to a dedicated repository** ([PIP-465](https://github.com/apache/pulsar/blob/master/pip/pip-465.md)) — the built-in connectors now live and release independently of Pulsar core.
- **`javax.*` → `jakarta.*`** ([PIP-472](https://github.com/apache/pulsar/blob/master/pip/pip-472.md)) — Pulsar moves to the Jakarta EE namespace; a breaking change for code that touches the affected APIs.
- **Gradle build** ([PIP-463](https://github.com/apache/pulsar/blob/master/pip/pip-463.md)) — Pulsar's build moves from Maven to Gradle, speeding up builds for contributors.
- **Structured logging** ([PIP-467](https://github.com/apache/pulsar/blob/master/pip/pip-467.md)) — Pulsar adopts structured (slog-style) logging for richer, machine-parseable logs.
- **Flexible networking** — multiple advertised addresses and smarter listener selection ([PIP-61](https://github.com/apache/pulsar/blob/master/pip/pip-61.md), [PIP-95](https://github.com/apache/pulsar/blob/master/pip/pip-95.md)) for multi-network deployments.

## Try it and tell us what you think

Once the vote passes and the artifacts are published, download 5.0.0-M1 and try it on a test cluster. Because this is a preview, we especially want to hear about:

- creating and operating **scalable topics** with the V5 client;
- migrating a cluster's metadata store from **ZooKeeper to Oxia**;
- adopting the **V5 Java client** in an existing application.

Share feedback on [GitHub](https://github.com/apache/pulsar/issues) or the [dev mailing list](https://pulsar.apache.org/contact/).

5.0.0-M1 is the first of several milestone releases on the road to **Pulsar 5.0.0**, which we expect to ship this fall. Each milestone builds on the feedback from the one before it — so the more you put these previews through their paces, the stronger the final release will be. Thank you for helping shape Apache Pulsar 5.0.
