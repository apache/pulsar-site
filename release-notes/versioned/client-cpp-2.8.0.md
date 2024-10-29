---
id: client-cpp-2.8.0
title: Client CPP 2.8.0 
sidebar_label: Client CPP 2.8.0 
---

- Fix dangling reference bug in getRandomName [#8596](https://github.com/apache/pulsar/pull/8596)
- Optimize batch message buffer allocation [#8749](https://github.com/apache/pulsar/pull/8749)
- Make pool connections configurable in perf tools [#8913](https://github.com/apache/pulsar/pull/8913)
- Support setting listener name [#9119](https://github.com/apache/pulsar/pull/9119)
- Fix batch message handling of the UnAckedMessageTracker [#9170](https://github.com/apache/pulsar/pull/9170)
- Fix ServerError is not converted to string in log [#9277](https://github.com/apache/pulsar/pull/9277)
- Remove Boost::System runtime dependency [#9498](https://github.com/apache/pulsar/pull/9498)
- Removed usages of boost::regex [#9533](https://github.com/apache/pulsar/pull/9533)
- Account for different variables names on different CMake versions [#9559](https://github.com/apache/pulsar/pull/9559)
- Allow to disable static or dynamic lib at build time [#9570](https://github.com/apache/pulsar/pull/9570)
- Avoid multiple compilations of same source files [#9675](https://github.com/apache/pulsar/pull/9675)
- Support configure debug level logs simply [#10031](https://github.com/apache/pulsar/pull/10031)
- Add /opt/homebrew/ as a possible path for OpenSSL on Mac [#10141](https://github.com/apache/pulsar/pull/10141)
- Fix race condition in MemoryLimitController [#10142](https://github.com/apache/pulsar/pull/10142)
- Fix releasing semaphore and memory quota after send timeout [#10144](https://github.com/apache/pulsar/pull/10144)
- Allow configuring memory limit from C API [#10145](https://github.com/apache/pulsar/pull/10145)
- Fix use-after-free undefined behavior due to object lifetime problem [#10220](https://github.com/apache/pulsar/pull/10220)
- Support enable replicate subscription [#10243](https://github.com/apache/pulsar/pull/10243)
- Fix C++ client cannot be built with Boost &;lt;=1.53 [#10307](https://github.com/apache/pulsar/pull/10307)
- Support check connect state [#10349](https://github.com/apache/pulsar/pull/10349)
- Avoid sending flow requests with zero permits [#10506](https://github.com/apache/pulsar/pull/10506)
- Add single file logger factory [#10712](https://github.com/apache/pulsar/pull/10712)
- Reduce redeliverMessages when message listener is enabled [#10726](https://github.com/apache/pulsar/pull/10726)

