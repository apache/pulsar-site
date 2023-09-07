---
author: tison
title: "Recap: Apache Pulsar Sessions in CommunityOverCode Asia 2023"
date: 2023-08-30
---

The [CommunityOverCode Asia 2023](https://apachecon.com/acasia2023/) conference (previously known as ApacheCon Asia) has been held from August 18th to August 20th.

The conference gathers adopters, developers, engineers, and technologists from some of the most influential open-source communities in the world. To date, there has been a total of over 100 proposals submitted by presenters from AWS, Huawei, Tencent Cloud, StreamNative, WeBank, and many more.

We are excited to have various Apache Pulsar-related sessions on this conference, including the milestone achieved by our first LTS release, integrations with applications on cloud, the Pulsar community development, and so on.

<!--truncate-->

## Featured sessions

Let's have a quick look at some of the featured sessions about Apache Pulsar.

### Apache Pulsar 3.0: First LTS release and new features

Zike Yang, Software Engineer, StreamNative

The Apache Pulsar community recently launched [Apache Pulsar 3.0](https://pulsar.apache.org/blog/2023/05/02/announcing-apache-pulsar-3-0/), the first LTS release of Pulsar. In this talk, we will delve into the importance of Pulsar's LTS version. We'll also cover the major features introduced in Pulsar 3.0, including a new load balancer, support for large-scale delayed messages, and Direct IO optimization.

### Huawei Terminal Cloud optimizes Apache Pulsar in container scenarios

Lin Lin, SDE Expert, Huawei

Apache Pulsar is a cloud-native message queue that, based on its storage separation architecture, can often shrink the compute layer to save resources during periods of low traffic. We made a lot of optimizations for Apache Pulsar in containerization scenarios. For example, at present, the Pulsar load balancing algorithm relies on the past load data of nodes, and the process of achieving balance is relatively slow. When HPA is enabled, node capacity expansion may be triggered during load balancing, and capacity expansion triggers new load balancing. How can we optimize to make Pulsar more cloud-native?

### Apache Pulsar current-limiting principle and application practice

Jialing Wang, Software development engineer, China Mobile Cloud Capability Center

Combined with the current limiting practice of mobile cloud Pulsar and Kafka, this speech analyzes the working principle of current limiting at all levels of production and consumption in Apache Pulsar and the implementation scheme of ResourceGroup, and introduces the mobile cloud Kafka based on Pulsar and KoP. How to manage traffic between multiple clusters in cloud native scenarios based on ResourceGroup and load balancer?

### The Secret to Great Developer Experience is Killer Content

Yu Liu, Apache Pulsar PMC member

In recent years, the software industry has entered the cloud-native 2.0 era. The emergence of various new technologies has brought a sweet burden to developers. On the one hand, they have more choices; on the other hand, they face greater complexities. With the rise of the "developer-first" culture and the increasing decision-making weight of developers on product selection, the world's major technology giants are changing from traditional sales ideas to developer-centric ideas (B2D) to promote products, and high-quality content is the most effective marketing strategy. To satisfy all stakeholders' needs and accelerate the flywheel effect, how to design content that makes developers fall in love at first sight? To improve the development experience, how to create the "Aha moment" of the content? To increase user stickiness, how to make developers love the product forever through content? To strengthen brand competitiveness, how to differentiate the content strategies for open-source projects and commercial products? ——This session will share the practice in the Apache Pulsar community and dive deeper into how to design killer content that developers will love.

## More resources

As we can see from topics submitted to CommunityOverCode Asia 2023, Apache Pulsar has become [one of the most active Apache projects](https://blogs.apache.org/foundation/entry/apache-in-2021-by-the) over the past few years, with a vibrant community that continues to drive innovation and improvements to the project.

1. Save your spot at the Pulsar Summit North America 2023. It will be taking place in San Francisco，October 25, 2023. [Sign up today](https://pulsar-summit.org/) to join the Pulsar community and the messaging and event streaming community.
2. Join the Apache Pulsar community. [Subscribe to the Pulsar mailing lists](https://pulsar.apache.org/community#section-welcome) for user-related or Pulsar development discussions. You can also [join the Pulsar Slack](https://communityinviter.com/apps/apache-pulsar/apache-pulsar) to ask quick questions or discuss specialized topics.
