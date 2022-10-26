---
id: client-cpp-2.8.2
title: Client CPP 2.8.2 
sidebar_label: Client CPP 2.8.2 
---

- Fix libcurl miss auth header when broker return 307 [#13112](https://github.com/apache/pulsar/pull/13112)
- Define and expose PULSAR_VERSION macro [#12769](https://github.com/apache/pulsar/pull/12769)
- Fix request timeout for GetLastMessageId doesn't work [#12586](https://github.com/apache/pulsar/pull/12586)
- Fix connection read error logging [#12492](https://github.com/apache/pulsar/pull/12492)
- Delay ClientCredentialFlow::initialize to the first authenticate call [#12372](https://github.com/apache/pulsar/pull/12372)
- Use URL encoded content type for OAuth 2.0 authentication [#12341](https://github.com/apache/pulsar/pull/12341)
- Handle OAuth 2.0 exceptional cases gracefully [#12335](https://github.com/apache/pulsar/pull/12335)
- Support configuring optional scope field for OAuth2 authentication [#12305](https://github.com/apache/pulsar/pull/12305)
- Fix the issue of attempting to connect to multiple IP addresses [#11958](https://github.com/apache/pulsar/pull/11958)
- Handle error when shutting down client after forks [#11954](https://github.com/apache/pulsar/pull/11954)
- Move all C symbols into C++ pulsar namespace [#11919](https://github.com/apache/pulsar/pull/11919)
- Make some cleanup methods thread safe [#11762](https://github.com/apache/pulsar/pull/11762)
- Turn on more compiler warnings and enforce warnings as errors [#11668](https://github.com/apache/pulsar/pull/11668)
- Fix use-after-free and constructor bugs in UnAckedMessageTrackerEnabled [#11630](https://github.com/apache/pulsar/pull/11630)
- Allow partitioned producers to start lazily [#11570](https://github.com/apache/pulsar/pull/11570)
