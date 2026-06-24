---
title: "Apache Pulsar 5.0.0-M1: A Preview of the Next Major Release"
author: Matteo Merli, Lari Hotari
date: 2026-06-23
---

The Apache Pulsar community is pleased to announce **Apache Pulsar 5.0.0-M1**, the first milestone on the road to Pulsar 5.0. It is a **preview**: an early build that puts the major new features of 5.0 in your hands so you can try them against real workloads and send feedback well ahead of the general-availability (GA) release. It is **not meant for production**.

5.0 is a major release, and two changes stand out: **Scalable Topics** — a new kind of topic that grows and shrinks on its own — and the promotion of **Oxia** to Pulsar's recommended metadata store. This post walks through what's in M1 and how to try it.

<!--truncate-->

## A preview, built for feedback

M1 is a milestone build, not a final release. We're publishing it early, for one reason: the changes in 5.0 are far-reaching, and we want real-world feedback before they're finalized for GA.

So please run it on **non-production** clusters, exercise the new APIs, and tell us what works and what doesn't — open issues on [GitHub](https://github.com/apache/pulsar/issues) or start a thread on the [dev@pulsar.apache.org](https://pulsar.apache.org/contact/) mailing list. The feedback you give now directly shapes what 5.0 becomes at GA.

## Scalable Topics: topics that size themselves

A topic should be a **logical concept** — a named stream you publish to and consume from. As an application developer, you shouldn't have to think about the infrastructure that makes that stream fast. Yet for its entire history, Pulsar has asked you to answer an infrastructure question up front that has nothing to do with your application: **how many partitions?**

That single number is a guess that's easy to get wrong and hard to undo. Choose too few and you cap your throughput; choose too many and you pay for overhead a quiet topic never needed. You can raise the count later but never lower it, and changing it breaks per-key ordering. The decision pulls infrastructure concerns into application design — and demands them before you even know how the topic will be used.

**Scalable topics** take that decision away. A scalable topic — addressed with the new `topic://` scheme — is a single logical stream that Pulsar sizes to its actual load. Internally, it's a set of **key-range segments** that the broker **splits** when part of the keyspace gets hot and **merges** when it goes cold: at runtime, with no downtime, and without ever breaking the ordering of an individual key.

The goal is for one topic type to be the right choice in every situation, **transparently and out of the box** — from a single firehose pushing tens of gigabytes per second to millions of tiny topics that each carry a trickle of traffic. You model your application around the topics that fit your domain, and the system adapts continuously to how they're actually used. No capacity planning, no re-sharding, no hard decisions forced on developers.

Scalable topics are delivered by a family of proposals in 5.0:

- **[PIP-460](https://github.com/apache/pulsar/blob/master/pip/pip-460.md): Scalable Topics (Topics v5)** — the overall model: the segment DAG, range-based key routing, and design principles.
- **[PIP-468](https://github.com/apache/pulsar/blob/master/pip/pip-468.md): Scalable Topic Controller** — the broker-side controller that runs split/merge, assigns consumers, and pushes the live topology to clients.
- **[PIP-483](https://github.com/apache/pulsar/blob/master/pip/pip-483.md): Auto Split/Merge** — splits hot segments and merges cold ones automatically, tunable per broker, namespace, and topic.
- **[PIP-466](https://github.com/apache/pulsar/blob/master/pip/pip-466.md): New Java Client API (V5)** — a modern, sync-first Java client built for scalable topics.
- **[PIP-473](https://github.com/apache/pulsar/blob/master/pip/pip-473.md): Metadata-Driven Transactions** — transactions that survive segment splits and merges.
- **[PIP-475](https://github.com/apache/pulsar/blob/master/pip/pip-475.md): Regular-to-Scalable Migration** — convert an existing topic to a scalable topic in place, with no data copy.

### A new client API

The V5 client is groundbreaking work in its own right. Over more than a decade, Pulsar's client API grew one feature at a time, accumulating options, overloads, and subtle inconsistencies along the way. The V5 client is a clean-slate redesign that distills those years of lessons — learned from users running Pulsar in production — into a focused API: it keeps the capabilities that matter and sheds the noise and rough edges that built up over time.

Consumption is the clearest example. The classic client offers a single `Consumer` shaped by one of four subscription types — Exclusive, Failover, Shared, Key_Shared — plus a separate `Reader`, with behavior that shifts subtly as you combine options. The V5 client replaces all of that with three **purpose-built** consumers, each exposing exactly the operations that make sense for it:

- **Stream consumer** — ordered consumption with cumulative acknowledgment.
- **Queue consumer** — parallel, individually-acknowledged work-queue consumption with dead-letter support.
- **Checkpoint consumer** — for stream processors such as Flink and Spark that track their own position.

For now, the classic client API remains fully supported, and existing applications keep working unchanged; scalable topics, however, are available only through the V5 API. Longer term, scalable topics are designed to cover **all** of Pulsar's use cases, and the V5 API is the direction Pulsar is heading. As that vision is realized, the classic topics and client API will be deprecated and, eventually, removed — so new applications are encouraged to build on scalable topics and the V5 client today.

The V5 client (`pulsar-client-v5`) also works against your existing partitioned and non-partitioned topics, so you can adopt the new API before migrating a single topic — and a consumer can now subscribe to an entire **namespace**, filtered by topic properties. In M1 the V5 client ships for Java; the other language SDKs will follow before GA.

Start here: [Scalable topics concepts](/docs/5.0.x/concepts-scalable-topics), the [V5 Java client](/docs/client-libraries/java-v5), and the [migration guide](/docs/client-libraries/java-migrate-to-v5).

## Oxia is now the recommended metadata store

[Oxia](https://github.com/oxia-db/oxia) is a scalable metadata store and coordination system. In 5.0 it becomes the **recommended metadata store** for new Pulsar clusters, and it is the backend of choice for scalable topics, whose lookups build on its streaming watch sessions.

ZooKeeper remains fully supported, and 5.0 makes moving to Oxia straightforward:

- **[PIP-454](https://github.com/apache/pulsar/blob/master/pip/pip-454.md): Metadata Store Migration Framework** — a live, **zero-downtime** migration from ZooKeeper to Oxia. The data plane keeps publishing and consuming while metadata is copied. See [Migrate metadata store](/docs/5.0.x/administration-metadata-store-migration).
- **[PIP-469](https://github.com/apache/pulsar/blob/master/pip/pip-469.md): Metadata-store topic policies** — topic policies can be stored directly in the metadata store, with legacy-aware routing for clusters still using system-topic policies.

5.0 also **removes the etcd metadata store backend** ([PIP-462](https://github.com/apache/pulsar/blob/master/pip/pip-462.md)). ZooKeeper and Oxia are the supported backends going forward, so etcd users should migrate before upgrading.

## Other notable changes

- **Structured logging** ([PIP-467](https://github.com/apache/pulsar/blob/master/pip/pip-467.md)) — Pulsar moves to structured (slog-style) logging. Log attributes are emitted as discrete JSON fields rather than crammed into a line of free text, so exporting logs to JSON and filtering on a specific property — a single topic, a subscription — becomes straightforward. Those attributes also propagate down the stack: BookKeeper operations are tagged with the originating Pulsar topic, letting you follow one topic's activity end to end.
- **IO connectors moved to a dedicated repository** ([PIP-465](https://github.com/apache/pulsar/blob/master/pip/pip-465.md)) — the built-in connectors now live and release independently of Pulsar core.
- **`javax.*` → `jakarta.*`** ([PIP-472](https://github.com/apache/pulsar/blob/master/pip/pip-472.md)) — Pulsar adopts the Jakarta EE namespace, a breaking change for code that touches the affected APIs.
- **Gradle build** ([PIP-463](https://github.com/apache/pulsar/blob/master/pip/pip-463.md)) — the build moves from Maven to Gradle, speeding up the development cycle for contributors.
- **Flexible networking** — 5.0 improves multiple advertised addresses ([PIP-61](https://github.com/apache/pulsar/blob/master/pip/pip-61.md), since 2.6) and smart listener selection ([PIP-95](https://github.com/apache/pulsar/blob/master/pip/pip-95.md), since 2.9) for multi-network deployments.

## Try it and tell us what you think

Deploy Pulsar 5.0 to a test cluster, or try it locally with [Docker Compose](/docs/5.0.x/getting-started-docker-compose) — which runs Pulsar on Oxia out of the box — or [Pulsar Standalone](/docs/5.0.x/getting-started-standalone). Because this is a preview, we're especially keen to hear about:

- creating and operating **scalable topics** with the V5 client;
- migrating a cluster's metadata store from **ZooKeeper to Oxia**;
- adopting the **V5 Java client** in an existing application.

Share your experience on [GitHub](https://github.com/apache/pulsar/issues) or the [dev mailing list](https://pulsar.apache.org/contact/).

5.0.0-M1 is the first of several milestones on the road to **Pulsar 5.0.0**, which we expect to ship this fall. Each milestone builds on the feedback from the one before it, so the more you put these previews through their paces, the stronger the final release will be. Thank you for helping shape Apache Pulsar 5.0.
