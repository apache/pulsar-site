---
id: client-cpp-2.9.0
title: Client CPP 2.9.0 
sidebar_label: Client CPP 2.9.0 
---

- Support configuring optional scope field for OAuth2 authentication. [12305](https://github.com/apache/pulsar/pull/12305)
- Support setting priority for the consumer. [12076](https://github.com/apache/pulsar/pull/12076)
- Fixed attempting to connect to multiple IP addresses. [11958](https://github.com/apache/pulsar/pull/11958)
- Handle error when shutting down client after forks. [11954](https://github.com/apache/pulsar/pull/11954)
- Move all C symbols into C++ pulsar namespace. [11919](https://github.com/apache/pulsar/pull/11919)
- Expose getLastMessageId in the Reader API. [11723](https://github.com/apache/pulsar/pull/11723)
- Add padding characters to base64 encoded protobuf native schema. [11492](https://github.com/apache/pulsar/pull/11492)
- Fix incorrect connect timeout implementation. [11889](https://github.com/apache/pulsar/pull/11889)
- Support protobuf native schema. [11388](https://github.com/apache/pulsar/pull/11388)

