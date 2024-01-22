---
author: Apache Pulsar Community
title: "Apache Pulsar 2023 Year in Review"
date: 2024-01-12
---

2023 was an incredible year for Apache Pulsar as it witnessed strong community growth, with the project becoming more stable, scalable, and secure. The Apache Pulsar community embraced a significant milestone in 2023 as the project crossed 600 contributors to the [Pulsar main GitHub repository](https://github.com/apache/pulsar). We would like to thank everyone in the Pulsar community who contributed to this remarkable achievement!


<!--truncate-->

Since Pulsar’s graduation as a Top-Level Project (TLP) in September 2018, it has been driven by an active global community, with **12K+** commits from **639** contributors, **12.2K+** stars, **3.5K** forks, and **10K+** Slack users.

We are grateful to all of our community members and those in the broader open-source community who contributed to the Apache Pulsar project. They are the reasons behind every step Apache Pulsar has made over the past years.

Now, let’s take a look at some of the highlights in 2023.

# 2023 Highlights

## Apache Pulsar 3.0 LTS release: a Big Milestone for the Community

The Apache Pulsar community announced the release of Apache Pulsar 3.0, the first Long-Term Support (LTS) version! Starting from Pulsar 3.0, the Pulsar community plans to release LTS versions to meet the needs of different users for stability and new features, as well as to reduce the burden of maintaining historical releases.

The previous release process has short maintenance cycles of approximately 3 to 4 months, while many users are still using old versions. To keep up with new updates and features, they may be forced to perform upgrades within a short timeframe, for which they are not prepared in terms of available time and required efforts.

Therefore, the Pulsar community introduces LTS versions with feature releases between them. The project follows a variant of Semantic Versioning, replacing `major.minor.patch` with `LTS.feature.patch`. For example:
- 2.11.0 is a feature release
- 3.0.0 is the first LTS release
- 3.0.1 is a patch release of the LTS release
- 3.1.0 is a feature release
- 3.2.0 is a feature release
- 3.2.1 is a patch release
- 4.0.0 is an LTS release

This pattern provides version support for users seeking stability and those seeking new features. Users who want a more stable release can use versions 3.0.x, while those seeking new features can use versions 3.x. This new release model is a major step for the Pulsar community because it:
- Allows users to choose between different releases based on their needs for stability or new features;
- Clarifies the release cycle for both maintainers and users;
- Frees maintainers from spending too much time maintaining a long list of old releases.

With the new release model, the Pulsar community looks to release LTS versions every 18 months, with bug fixes continuing for 24 months and security vulnerability patches supported for 36 months. See the image below for details.

![](/img/pulsar-new-release-model.png)

For more information, see [PIP-175](https://github.com/apache/pulsar/issues/15966) and the [Release policy](pathname:///contribute/release-policy/).

## New Website

The Apache Pulsar website has a fresh look! Thanks to Emidio Cardeira, Asaf Mesika, Tison Chen and Kiryl Valkovich for creating an engaging design that captures the future feel of our thriving community and next-gen solution.

## Pulsar Admin Go Library

[Pulsar Admin Go Library](https://github.com/apache/pulsar-client-go/tree/master/pulsaradmin) provides a unified Go API for managing Pulsar resources such as tenants, namespaces, topics, etc.

## Enhanced OTel-based metric system

[PIP-264](https://github.com/apache/pulsar/blob/master/pip/pip-264.md) was completed, approved by the community, and started development. It will solve a big pain point for Pulsar users with a large number of topics - 50k up to 1M topics: observability. The Apache Pulsar community has taken a large undertaking to make OpenTelemetry Java SDK ready for very low latency systems such as Pulsar with two big features it currently develops: [Near-zero memory allocations](https://github.com/open-telemetry/opentelemetry-java/issues/5105) and [metric filtering upon collection](https://github.com/open-telemetry/opentelemetry-java/issues/6107), which was also added to [OpenTelemetry specifications](https://github.com/open-telemetry/opentelemetry-specification/issues/3324).

## Key events recap

In 2023, the Apache Pulsar community put together a number of meetups and events across the globe to share the latest messaging and streaming technologies. Among others, three summits received the most attention from community members.

- [Pulsar Summit Europe 2023](https://streamnative.io/blog/pulsar-virtual-summit-europe-2023-key-takeaways): This event witnessed a remarkable milestone as over 400 attendees from 20+ countries joined the virtual stage to explore the cutting-edge advancements in Apache Pulsar and the real-world success stories of Pulsar-powered companies. This record-breaking turnout at the Pulsar Summit not only demonstrates the surging adoption of Pulsar but also highlights the ever-growing enthusiasm and curiosity surrounding this game-changing technology. It featured 5 keynotes on Apache Pulsar and 12 breakout sessions on tech deep dives, use cases, and ecosystem talks. They came from companies like Lego, VMWare, DataStax, StreamNative, RisingWave, Axon, Zafin and others. [Watch the sessions](https://www.youtube.com/watch?v=XjIu9nXSSiI&list=PLqRma1oIkcWjMn9ytQueYSP9HCc28756R).

- [CommunityOverCode Asia 2023](https://pulsar.apache.org/blog/2023/08/28/pulsar-sessions-in-communityovercode-aisa-2023/) conference (previously known as ApacheCon Asia) has been held from August 18th to August 20th. The conference gathers adopters, developers, engineers, and technologists from some of the most influential open-source communities in the world. 

- [CommunityOverCode NA 2023](https://communityovercode.org/past-sessions/community-over-code-na-2023/) conference (previously known as ApacheCon NA) has been held from October 7th to October 10th. The conference gathers adopters, developers, engineers, and technologists from some of the most influential open-source communities in the world. In 2023, CommunityOverCode introduced a Streaming track featuring three talks on Pulsar. If you missed the conference, you can still check out the slide decks!

- [Pulsar Summit NA 2023](https://streamnative.io/blog/pulsar-summit-north-america-2023-a-deep-dive-into-the-on-demand-summit-videos): Hosted in person at the famous Hotel Nikko (with after parties overlooking the city!) in San Francisco, the summit featured nearly 200 attendees and showcased 20 carefully curated sessions, each a testament to the vibrancy and innovation within the Pulsar ecosystem. They came from companies like Cisco, Discord, Iterable, Attentive, VMware, Flipkart, Boomi and others.  We are so grateful for the opportunity to spend a full day sharing knowledge and witnessing the community members connecting and inspiring each other. [Watch the sessions](https://www.youtube.com/playlist?list=PLqRma1oIkcWhOZ6W-g4D_3JNxJzYnwLNX).

## Community growth

The development of the Pulsar community would not be possible without our contributors. Among them, Pulsar Committers and PMC members have taken the lead in contributing to and promoting the project. In 2023, many new faces joined the community while we also welcomed old friends taking more responsibility. Let’s take a look at the Pulsar community by numbers.

- **639** global contributors for the Pulsar main GitHub repository
- **13.4K+** GitHub stars
- **3.5K+** forks
- **8** new Committers
- **6** new PMC members
- **10k+** Pulsar Slack members
- **20M+** Docker pulls

The Pulsar community welcomes all kinds of contributions. For more information, see the [Apache Pulsar Contribution Guide](pathname:///contribute/).

## Project releases

In 2023, the Pulsar community worked hard to improve the project’s capabilities and fix existing bugs with 2 major versions and 12 minor versions.

The Apache Pulsar community released version [2.11](https://pulsar.apache.org/blog/2023/01/20/Apache-Pulsar-2-11-0/) with 61 contributors providing feature enhancements and fixes that delivered 1617 commits. 

A Big Milestone for the Apache Pulsar community was the release of [Apache Pulsar 3.0](https://pulsar.apache.org/blog/2023/05/02/announcing-apache-pulsar-3-0/), the first Long-Term Support (LTS) version! The community is getting bigger! Over 140 contributors submitted about 1500 commits to the Pulsar 3.0 release, which is the largest contribution yet for a project that is fast becoming one of the biggest open-source projects. It includes support for LTS, which delivers the predictability and stability that larger enterprise teams need to deliver a solid and reliable messaging and streaming service.

Thanks for all your contributions!

Many important Pulsar capabilities were delivered in these releases, such as [Extensible Load Balancer](https://github.com/apache/pulsar/issues/16691) and [Large-scale delayed message support](https://github.com/apache/pulsar/issues/16763). For more information, see the [Release Notes page](pathname:///release-notes/).

Updates about clients, Pulsar Manager, and Pulsar Helm Chart are listed below:

- [Pulsar C++ Client 3.4.2](https://github.com/apache/pulsar-client-cpp/releases/tag/v3.4.2)
- [Pulsar Go Client 0.11.1](https://github.com/apache/pulsar-client-go/releases/tag/v0.11.1)
- [Pulsar Node.js Client 1.9.0](https://github.com/apache/pulsar-client-node/releases/tag/v1.9.0)
- [Pulsar Python Client 3.3.0](https://github.com/apache/pulsar-client-python/releases/tag/v3.3.0)
- [Pulsar Manager 0.4.0](https://github.com/apache/pulsar-manager/releases/tag/v0.4.0)
- [Pulsar Helm Chart 3.1.0](https://github.com/apache/pulsar-helm-chart/releases/tag/pulsar-3.1.0)
- [Pulsar dotnet Client 3.1.1](https://github.com/apache/pulsar-dotpulsar/blob/master/CHANGELOG.md#311---2023-12-11)
- [Reactive Client for Apache Pulsar 0.1.0](https://github.com/apache/pulsar-client-reactive/releases/tag/v0.5.1)

For more information, see the [Clients Release Notes page](pathname:///release-notes/clients/).

## Pulsar ecosystem

In 2023, the Pulsar community worked with other open-source communities to add more integrations to the Pulsar ecosystem. Notable integrations include:

- [Quarkus Extension for Apache Pulsar](https://quarkus.io/guides/pulsar) provides support for Apache Pulsar through SmallRye Reactive Messaging framework. Based on Eclipse MicroProfile Reactive Messaging specification 3.0, it proposes a flexible programming model bridging CDI and event-driven.

- [Spring for Apache Pulsar](https://spring.io/blog/2023/11/21/spring-for-apache-pulsar-1-0-0-goes-ga/) provides a `PulsarTemplate` for publishing to a Pulsar topic and a `PulsarListener` annotation for consuming from a Pulsar topic, as well as various convenience APIs for Spring developers to ramp up their development journey into Apache Pulsar. Support is also included in Spring Boot via [auto-configuration](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#messaging.pulsar).

- [Oxia](https://github.com/streamnative/oxia): currently, the practical limit for the number of topics manageable by a single Pulsar cluster is around 1 million topics. The lack of horizontal scalability in Zookeeper is one of the reasons for this limit. [Oxia](https://github.com/streamnative/oxia), released this year, is a scalable metadata store and coordination system. Replacing Zookeeper with Oxia in a Pulsar cluster allows for exceeding this 1M topics limit, although it is not the only prerequisite. This contributes to the goal of reaching 100M topics.

For more information, see the [Ecosystem page](pathname:///ecosystem/).

# What’s next in 2024

The Pulsar community seeks to further improve the project from different aspects. 

## Enhanced OTel-based metric system

As stated above, [PIP-264](https://github.com/apache/pulsar/blob/master/pip/pip-264.md) is designed to enhance observability in scenarios where a single cluster manages a large number of topics, ranging from 50k up to 1M topics. Currently, there are two major features under development to support this functionality: 
- [Near-zero memory allocations](https://github.com/open-telemetry/opentelemetry-java/issues/5105) 
- [Metric filtering upon collection](https://github.com/open-telemetry/opentelemetry-java/issues/6107), which was also added to [OpenTelemetry specifications](https://github.com/open-telemetry/opentelemetry-specification/issues/3324).


## Pulsar Rate Limiting

An increasing number of messaging-as-a-service platform teams are adopting Apache Pulsar as their main building block for providing messaging services across their organizations. This is clear validation that the value of Apache Pulsar’s truly multi-tenant architecture is delivering results, making Apache Pulsar a cost-efficient and reliable solution for messaging-as-a-service platform teams in very demanding application environments.

In the Apache Pulsar project, we are committed to delivering further improvements to the existing multi-tenancy features. One area of improvement is the service level management and capacity management of a large Pulsar system. This is also a key concern of messaging-as-a-service platform teams.

In December 2023, [PIP-322 Pulsar Rate Limiting Refactoring](https://github.com/apache/pulsar/blob/master/pip/pip-322.md) was accepted and completed and will be release as part of Pulsar 3.2.0 release. Rate limiters act as a conduit to more extensive capacity management and Quality of Service (QoS) controls in Pulsar. They are integral to Pulsar's core multi-tenancy features. This refactoring will pave the way for future enhancements in this area.

## Pulsar SQL removal from the main repo

Pulsar SQL (Trino/Presto) will be moved from the main repository to a separate repository. This change will offer the following benefits:
- A significant reduction in the size of the TGZ and Docker image, saving approximately 400MB.
- Reduced build time.

## Security

Docker image vulnerability scans will start soon. 

## Events
We will also have more events coming for 2024, including Pulsar Summit North America and Pulsar Summit APAC. If you missed or want to relive the Pulsar Summit North America 2023, you can check out the videos of our amazing speakers [here](https://youtube.com/playlist?list=PLqRma1oIkcWhOZ6W-g4D_3JNxJzYnwLNX&si=o6G-fRcNgW9zqHGa)!

## Stay in touch!
To stay up to date with community news and discuss hot topics with other members, you can subscribe to the Pulsar mailing lists for [users](mailto:users-subscribe@pulsar.apache.org) and [developers](mailto:dev-subscribe@pulsar.apache.org), follow us on [X](https://twitter.com/apache_pulsar), and join the [Pulsar Slack workspace](https://communityinviter.com/apps/apache-pulsar/apache-pulsar) and [Pulsar community meetings](https://github.com/apache/pulsar/wiki/Community-Meetings) that happen online.
