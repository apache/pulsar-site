---
author: Sherlock Xu
title: "Pulsar Summit Asia 2022 Recap"
date: 2022-12-01
---

![](/img/pulsar-summit-asia-2022-recap-top.jpg)

Since its inception in 2020, Pulsar Summit Asia has received increasing attention from both Asia and beyond. For Pulsar Summit Asia 2022, more than 1400 people from companies like Amazon, Tencent, IBM, Huawei, Dell, ByteDance, and Splunk registered for this online event to discuss the latest messaging and streaming technologies powering a wide variety of industries like education, food, gaming, e-commerce, and social media.

Before we talk	about some of the Summit highlights, we would like to thank the entire Apache Pulsar community and all the friends from other open-source communities for making this event a great success! Additionally, this event would not have drawn the attention of such a broad audience without our speakers, Program Committee members, as well as community and media partners. Thank you all for your help and energy!

<!--truncate-->

And now, let’s look at some of the highlights and a round-up of this online virtual event:

* 1400+ registrations and 40,000+ views globally
* 41 speakers from companies like ByteDance, Huawei, Tencent, Nippon Telegraph and Telephone Corporation (NTT), Yum China, Netease, vivo, Nutanix, and StreamNative
* 3 keynotes on Apache Pulsar and event-driven applications
* 36 sessions on use cases, technical deep dives, and ecosystem talks
* 14 Program Committee members
* 18 community and media partners

## Keynotes and sessions at a glance

This two-day virtual event brought together engineers, architects, and data scientists from the messaging and streaming communities. They talked about Pulsar adoption for different use cases, event-driven platforms, technical details, and even Pulsar integration with other ecosystems. The following is a quick recap of some of the keynotes and sessions.

### Keynotes

* **A Cloud-Native, Unified Messaging and Streaming System for Modern Data Infrastructure (Mandarin)**: Jia Zhai, an Apache Pulsar PMC member, gave a high-level overview of Apache Pulsar and explained how it meets the requirements for messaging and streaming with its cloud-native features.
* **What You Should Know about Apache Pulsar in 2022 (Mandarin)**: Penghui Li, an Apache Pulsar PMC member, talked about some of the existing problems in Pulsar and how the Pulsar community would work to solve them going forward.
* **Event-Driven Applications Done Right (English)**: Matteo Merli, Apache Pulsar PMC Chair, provided his insights on the fundamentals of modern event-driven applications.

### Use cases

* **Awesome Pulsar in Yum China (English)**: Chauncey Yan from Yum China explained why Yum China selected Pulsar for production and shared their experience of performance tuning.
* **Pulsar + Envoy: Building an OTO Marketing Platform for Different Business Scenarios on Microservices (Mandarin)**: Jason Jiang from Tencent shared their experience of using Pulsar and Envoy to create an OTO marketing platform built on microservices for different business scenarios.
* **Pulsar in Smart Education: How NetEase Youdao Put Pulsar into Practice for Complex Business Scenarios (Mandarin)**: Jiaqi Shen from NetEase introduced NetEase Youdao’s practices of using Apache Pulsar to support complex scenarios in smart education.
* **Streaming Wars and How Apache Pulsar is Acing the Battle (English)**: Shivji Kumar Jha and Sachidananda Maharana from Nutanix talked about how they adopted Pulsar for different use cases and migrated applications from other messaging solutions to Pulsar.
* **Tens of Trillions of Messages: How Apache Pulsar Supports Big Data Business at Tencent (Mandarin)**: Dawei Zhang from Tencent discussed how they used Apache Pulsar for big data business to support scenarios requiring high availability and strong consistency.

### Technical deep dives

* **Taking Jakarta JMS to New Generation Messaging Systems - Apache Pulsar (English)**: Enrico Olivelli and Mary Grygleski from DataStax explained how Pulsar concepts map to the Jakarta Messaging Specifications and demonstrated how to connect a Jakarta EE application to Pulsar.
* **A New Way of Managing Pulsar with Infrastructure as Code (Mandarin): **Max Xu and Fushu Wang from StreamNative discussed how to leverage the Terraform Provider for Pulsar and the Pulsar Resources Operator to help better manage Pulsar.
* **A Deep Dive into Pulsar's Geo-replication for High Availability (Mandarin)**: Jialing Wang from China Mobile talked about the asynchronous and synchronous data replication mechanisms, and explained how they deployed Pulsar across multiple regions and improved its performance at China Mobile.
* **Apache Pulsar in Volcano Engine E-MapReduce: Integration and Scenarios (Mandarin)**: Xin Liang from ByteDance introduced Volcano Engine E-MapReduce, a stateless, open-source big data platform, and how Pulsar fits into the platform’s ecosystem supporting different use cases.
* **Handling 100K Consumers with One Topic: Practices and Technical Details (English): **Hongjie Zhai from NTT Software Innovation Center shared their practices and technical details of handling 100K consumers with a single Pulsar topic.

### Ecosystem

* **Pulsar + Flink + Camel: How Vertice Built its CMDB-based Real-time Data Platform (Mandarin)**: Wei Wang from Vertice offered his insights on how to build a CMDB-based Real-time Data platform with Pulsar, Flink, and Camel.
* **Simplify Pulsar Functions Development with SQL (Mandarin)**: Rui Fu from StreamNative discussed how SQL syntax, Pulsar Functions, and Function Mesh can work together to deliver a unique user development experience for real-time data jobs in the cloud environment.
* **Apache Pulsar + KubeEdge: Managing Edge Devices with Low Latency and Persistent Storage (Mandarin)**: Ryan Zhao from Huawei Cloud introduced a management solution for edge devices implemented through the Device Management Interface of KubeEdge and Apache Pulsar.
* **Make Querying from Pulsar Easier: Introduce Flink Pulsar SQL Connector (English)**: Yufei Zhang from StreamNative walked through the basic concepts and examples of using Pulsar SQL Connector and discussed PulsarCatalog’s two different modes of using Pulsar as a metadata store.
* **Migrating from RabbitMQ to Apache Pulsar: Using AMQP-on-Pulsar (AoP) in E-commerce Industry (Mandarin)**: Yifei Ming from Access Corporate Group talked about their experience of using the AMQP-on-Pulsar project to migrate RabbitMQ workloads to AoP.

## What’s new in the Pulsar community

In addition to the keynotes and sessions, we also shared some exciting news at the Summit.

Apache Pulsar has been adopted by organizations and users across the globe since it graduated as a Top Level Project in September 2018. Recently, the project witnessed its 580th contributor, almost hitting the 600 milestone!

![](/img/pulsar-github-contributor-20221114.png)

<small><center>Figure 1. Pulsar GitHub repo contributors</center></small>

So far this year, we have welcomed 16 new Apache Pulsar [Committers](https://www.apache.org/foundation/how-it-works.html#committers) to the Pulsar family. They have made continuous contributions to the Pulsar community and as Pulsar Committers, they now have write access to the Pulsar repository. They are:

* [@RobertIndie](https://github.com/RobertIndie)
* [@yuruguo](https://github.com/yuruguo)
* [@gaozhangmin](https://github.com/gaozhangmin)
* [@nodece](https://github.com/nodece)
* [@Shoothzj](https://github.com/Shoothzj)
* [@hqebupt](https://github.com/hqebupt)
* [@StevenLuMT](https://github.com/StevenLuMT)
* [@lordcheng10](https://github.com/lordcheng10)
* [@tisonkun](https://github.com/tisonkun)
* [@aloyszhang](https://github.com/aloyszhang)
* [@mattisonchao](https://github.com/mattisonchao)
* [@urfreespace](https://github.com/urfreespace)
* [@dlg99](https://github.com/dlg99)
* [@nicoloboschi](https://github.com/nicoloboschi)
* [@liudezhi2098](https://github.com/liudezhi2098)
* [@cbornet](https://github.com/cbornet)

We also have 4 new members joining the Apache Pulsar [Project Management Committee (PMC)](https://www.apache.org/foundation/how-it-works.html#pmc-members) for their merit for the evolution of the project. They are:

* [@lhotari](https://github.com/lhotari)
* [@michaeljmarshall](https://github.com/michaeljmarshall)
* [@Technoboy-](https://github.com/Technoboy-)
* [@Jason918](https://github.com/Jason918)

Congratulations to them all 🎉 ! And we are looking forward to more contributions from more friends in the broader open-source community.

## More on Pulsar Summit Asia 2022

All the sessions in Pulsar Summit Asia 2022 were pre-recorded and they will be uploaded to this [YouTube account](https://www.youtube.com/@streamnative7594) soon. You can also find the complete list of Summit sessions on this [page](https://pulsar-summit.org/event/asia-2022/schedule).

At the same time, we will be working with some of the speakers to convert their speeches into blogs and case studies, which will be published soon.

Feel free to contact us at [organizers@pulsar-summit.org](mailto:organizers@pulsar-summit.org) if you have any questions and see you in the next Summit!