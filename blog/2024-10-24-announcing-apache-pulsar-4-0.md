---
author: Lari Hotari
title: "What's New in Apache Pulsar 4.0"
date: 2024-10-24
---

The Apache Pulsar community is thrilled to announce the launch of Apache Pulsar 4.0, a new LTS release!

<!--truncate-->

## What's new in Apache Pulsar 4.0 LTS since Pulsar 3.0 LTS?

Pulsar 4.0 [includes numerous Pulsar Improvement Proposals (PIPs)](https://pulsar.apache.org/release-notes/versioned/pulsar-4.0.0/) since the previous LTS release Pulsar 3.0 in May 2023. These improvements have enhanced the platform's capabilities across multiple areas.

Since there's a lot of new features and improvements, this blog post will only highlight a few of the recent updates. Apache Pulsar contributors are invited to contribute additional blog posts with more details about the new features and improvements.

### Enhanced Key\_Shared Subscription: Scale Without Compromising Message Order

**Key\_Shared subscription** is one of Pulsar's most valuable features, enabling organizations to scale their message processing capacity by adding multiple consumers while maintaining strict message ordering based on keys. This capability is crucial for applications requiring both high throughput and ordered processing, such as financial transactions, event processing, and real-time analytics.

In Pulsar 4.0, we've improved the Key\_Shared subscription implementation through a significant enhancement with [PIP-379 Key_Shared Draining Hashes for Improved Message Ordering](https://github.com/apache/pulsar/blob/master/pip/pip-379.md). The new design ensures messages with the same key are handled by only one consumer at a time, while eliminating unnecessary message blocking that previously impacted system performance during consumer changes and application restarts.

Operations teams can quickly identify and resolve any Key\_Shared ordered message delivery issues through comprehensive troubleshooting metrics in Pulsar topic stats.
Future improvements will introduce a REST API that will further simplify troubleshooting by providing direct access to unacknowledged message details and powerful key-based search capabilities for resolving message delivery issues where typically the root cause is in an application that doesn't acknowledge a message and due to message ordering constraints, further messages for the key are blocked. Web based user interfaces and CLI tools can build upon this REST API, allowing also automation for resolving or alerting in operations. Related Key\_shared troubleshooting metrics will also be exposed via Prometheus and OTel interfaces in future updates.

You can learn more about the Key\_Shared subscription preserving order of message delivery by key and related troubleshooting capabilities in the [Pulsar documentation](https://pulsar.apache.org/docs/4.0.x/concepts-messaging/#preserving-order-of-message-delivery-by-key).

### Enhanced Secure Docker Image Runtime Based on Alpine and Java 21

Pulsar 4.0 contains enhancements to its Docker runtime environment, combining the security benefits of Alpine Linux with the performance improvements of Java 21's runtime. **PIP-324** introduced in Pulsar 3.3.0 aligns with our commitment to providing a secure, efficient, and resource-optimized platform for messaging workloads.

The new Docker images are now based on Alpine Linux instead of Ubuntu, reducing the image size while improving the security posture.

A key security enhancement is the elimination of CVEs in the base image. While the previous Ubuntu-based images carried 12 Medium/Low CVEs with no available resolution, the new Alpine-based images start with zero CVEs, providing a more secure foundation for production deployments. This improvement is particularly valuable for organizations with strict security requirements and compliance needs.

The Docker images now include Java 21 with Generational ZGC, bringing significant improvements in garbage collection performance. Generational ZGC provides sub-millisecond pause times, better CPU utilization, and improved memory efficiency compared to previous garbage collectors. This translates to more predictable latencies and better resource utilization for Pulsar deployments.

These improvements make Pulsar 4.0's Docker runtime an even more compelling choice for organizations requiring both security and performance in their messaging infrastructure. The combination of Alpine Linux's minimal attack surface and Java 21's advanced garbage collection provides a robust foundation for running Pulsar in containerized environments.

### Enhanced Quality of Service (QoS) Controls

Multi-tenancy in messaging systems presents unique architectural challenges, particularly around resource isolation and predictable performance. Apache Pulsar's approach to this has centered on providing granular control over system resources while maintaining consistency across tenant workloads.

The core advancement in Pulsar 4.0 comes through [PIP-322 Pulsar Rate Limiting Refactoring](https://github.com/apache/pulsar/blob/master/pip/pip-322.md). At its foundation is a token bucket algorithm implementation that unifies rate limiting across broker, topic, and resource group levels. This eliminates the previous split between "default" and "precise" rate limiters—a design choice that had introduced unnecessary CPU overhead and lock contention in IO threads.

The practical impact is straightforward: more predictable performance in multi-tenant deployments, especially when multiple rate limiting conditions intersect. While Pulsar already supports producer rate limiting, the community is building on this foundation with [PIP-385](https://lists.apache.org/thread/9wddmj4o5mrdst427r40rr7phqb05y6s) to improve producer flow control — a key piece in completing Pulsar's end-to-end QoS capabilities.

#### Rate Limiting and Capacity Management in Modern Messaging Platforms

Rate limiting in Pulsar 4.0 sets the groundwork for a more comprehensive approach to capacity management. The goal is simple: enable dynamic resource allocation while maintaining strict performance guarantees, particularly in environments where workload patterns are unpredictable.

This matters because traditional auto-scaling approaches, which typically respond to CPU or memory metrics, often fall short in messaging systems. Andy Warfield's [analysis of S3 storage workloads highlighted a pattern](https://youtu.be/sc3J4McebHE?feature=shared&t=1335) that's equally relevant in messaging: workloads are inherently bursty, characterized by sharp peaks amid periods of relative quiet. Traditional auto-scaling can't effectively handle these patterns without significant overprovisioning.

The industry has been converging on solutions to this challenge. [Amazon DynamoDB's admission control system](https://www.usenix.org/conference/atc22/presentation/elhemali) and [TiDB's resource control framework](https://me.0xffff.me/dbaas3.html) demonstrate practical approaches to managing capacity in multi-tenant environments. Both systems use token bucket algorithms for base rate limiting but extend beyond this to dynamic quota management.

The solution lies in sophisticated capacity management systems that can smooth out these peaks across a platform's total capacity. This approach aligns perfectly with Marc Brooker's insights into [the economics of load-balanced systems](https://brooker.co.za/blog/2020/08/06/erlang.html), where the efficiency gains of cloud-native architectures become most apparent at scale.

Pulsar's resource group concept, introduced with [PIP 82: Tenant and namespace level rate limiting](https://github.com/apache/pulsar/wiki/PIP-82%3A-Tenant-and-namespace-level-rate-limiting) in Pulsar 2.8 in June 2021, laid initial groundwork for similar capabilities. While the documentation needs expansion, the technical foundation is solid. The token bucket implementation from PIP-322 provides the basis for evolution toward dynamic quota management and admission control, working in concert with Pulsar's load balancing to manage capacity effectively.

Looking ahead, this creates a path toward more sophisticated capacity management: dynamic limit adjustment based on real-time load, cross-tenant prioritization, and precise capacity allocation to specific tenants or namespaces. The focus is on handling demanding workloads while maintaining performance predictability—without the traditional answer of overprovisioning.

The development of these capabilities remains open and community-driven. Technical discussions and decisions happen in the open on the [Apache Pulsar dev mailing list](https://pulsar.apache.org/contact) and get documented in [Pulsar Improvement Proposals (PIPs)](https://github.com/apache/pulsar/tree/master/pip#pulsar-improvement-proposal-pip).

### Start using Pulsar 4.0

Pulsar 4.0.0 is now available for [download](https://pulsar.apache.org/download/). The download page also includes details about the Docker image. To get started with Pulsar, you can run a Pulsar cluster [on your local machine, Docker, or Kubernetes](https://pulsar.apache.org/docs/4.0.x/getting-started-home/).

### Upgrading existing clusters to Pulsar 4.0

Starting from version 3.0, users have the option to perform live upgrades or downgrades between two consecutive LTS versions or two consecutive feature versions (which also include LTS versions).

Pulsar changes in releases are designed in a way that allows upgrading an existing Pulsar cluster to a newer release and then rolling back to the original release version in case of issues. This is considered when changes are made in Pulsar and the default BookKeeper configuration for Pulsar. Since Apache Pulsar is an open-source project, there is no guarantee that a specific configuration can be upgraded and downgraded.

In many cases, the ability to downgrade won't work if the upgrade happens from an older version than the latest released version in a particular release series.
For example, upgrading to Pulsar 3.0.x works between 2.10.6 and 3.0.7, but not between 2.10.5 and 3.0.7.

Each Pulsar user is responsible for operating their cluster, and Pulsar cluster upgrades should be tested in testing and staging environments to ensure that a specific configuration can be upgraded and downgraded. When something is supported in the Apache Project, it means that the project is committed to addressing reported issues. This also applies to release upgrade compatibility.

According to this policy, users should first upgrade clusters to Pulsar 3.0.x or 3.3.x before upgrading to Pulsar 4.0.0.
If you are upgrading from Pulsar 2.x, you should first upgrade to Pulsar 2.10.6 or 2.11.3, then upgrade to Pulsar 3.0.7, and finally upgrade to Pulsar 4.0.0.

### Upgrading clients to use Pulsar 4.0

Older Pulsar clients are compatible with Pulsar 4.0.0 and Pulsar Java client 4.0.0 is compatible with older Pulsar clusters.
When upgrading clients, you can upgrade directly to the latest supported version. It is recommended to keep the clients up-to-date with latest security patches and bug fixes.

There's a critical security vulnerability [CVE-2024-47561](https://github.com/advisories/GHSA-r7pg-v2c8-mfg3) in all Pulsar Java clients before 3.0.7, 3.3.2 and 4.0.0. Please check the [Apache Pulsar Security page for more details](https://pulsar.apache.org/security/#security-advisories). All Pulsar Java client users are recommended to upgrade to 3.0.7, 3.3.2 or 4.0.0.

When upgrading Java clients, it is a common problem that client module library versions are not aligned. It is recommended to use the [Pulsar BOM](https://pulsar.apache.org/docs/4.0.x/client-libraries-java-setup/#pulsar-bom) to manage the Pulsar Java client version in Maven and Gradle builds. There's also specific instructions for [selecting the Pulsar client version in Spring Boot projects](https://pulsar.apache.org/docs/4.0.x/client-libraries-java-setup/#spring-boot).

### Thank You to Apache Pulsar Contributors

Apache Pulsar 4.0 represents the collaborative effort of a vibrant open-source community. This release showcases the dedication of developers, organizations, and users worldwide who have contributed to making data streaming more accessible and scalable.

We extend our deepest gratitude to:

* The individual contributors who developed new features, reported bugs, fixed bugs, and improved documentation
* The committers and PMC members who participated in Apache Pulsar project security issue handling, PIP decision making and voting for the releases.
* The organizations that have deployed Pulsar in production and shared their valuable feedback
* The users who participated in testing and provided invaluable input during the release process
* The broader Apache Software Foundation community for their continued support

The project faces typical open-source challenges — we're operating with a volunteer workforce and currently experiencing a backlog in pull request reviews. While this is a common scenario in successful Apache projects, we're actively working on processes to handle contributions more efficiently.

Apache Pulsar's strength lies in its community-driven development. Whether you're running Pulsar in production or evaluating it for your technology stack, we encourage you to join the conversation on the [dev@pulsar.apache.org](https://pulsar.apache.org/contact/#mailing-lists) mailing list or the [Pulsar Slack community](https://pulsar.apache.org/community/#section-discussions). Your experience and feedback help shape the future of this platform.