---
id: client-libraries-cpp
title: Pulsar C++ client
sidebar_label: "C++ client"
---

You can use a Pulsar C++ client to create producers, consumers, and readers. All the methods in producer, consumer, and reader of Pulsar C++ clients are thread-safe.

## Changes for version 3.0.0 or later

The new version of the Pulsar C++ client starts from 3.0.0 and has been no longer consistent with Pulsar since 2.10.x. For the latest releases, see the [Download](/download/) page.

Take the [3.0.0 release](https://archive.apache.org/dist/pulsar/pulsar-client-cpp-3.0.0/) for example, there are following subdirectories:
- apk-arm64: the Alpine Linux packages for ARM64 architectures
- apk-x86_64: the Alpine Linux packages for x64 architectures
- deb-arm64: the Debian-based Linux packages for ARM64 architectures
- deb-x86_64: the Debian-based Linux packages for x64 architectures
- rpm-arm64: the RedHat-based Linux packages for ARM64 architectures
- rpm-x86_64: the RedHat-based Linux packages for x64 architectures

These Linux packages above all contain the C++ headers installed under `/usr/include` and the following libraries installed under `/usr/lib`:
- libpulsar.so: the shared library that links 3rd party dependencies statically
- libpulsar.a: the static library
- libpulsarwithdeps.a: the fat static library that includes all 3rd party dependencies

Here is an example to link these libraries for a C++ source file named `main.cc`:

```bash
# Link to libpulsar.so
g++ -std=c++11 main.cc -lpulsar
# Link to libpulsarwithdeps.a
g++ -std=c++11 main.cc /usr/lib/libpulsarwithdeps.a -lpthread -ldl
# Link to libpulsar.a
g++ -std=c++11 main.cc /usr/lib/libpulsar.a \
  -lprotobuf -lcurl -lssl -lcrypto -lz -lzstd -lsnappy -lpthread -ldl
```

:::caution

Linking to `libpulsar.a` can be difficult for beginners because the 3rd party dependencies must be compatible. For example, the protobuf version must be 3.20.0 or higher for Pulsar C++ client 3.0.0. It's better to link to `libpulsarwithdeps.a` instead.

:::

:::danger

Before 3.0.0, there was a `libpulsarnossl.so`, which is removed now.

:::

## What's next?

1. [Set up C++ client library](client-libraries-cpp-install.md)
2. [Create a C++ client](client-libraries-cpp-create-client.md)
3. Work on advanced tasks:
   - [Configure Producers](client-libraries-producers.md)
   - [Configure Consumers](client-libraries-consumers.md)
   - [Configure Readers](client-libraries-readers.md)

**More reference**

- [API docs](@pulsar:apidoc:cpp@)
- [Release notes](/release-notes/client-cpp)
- [Client feature matrix](https://docs.google.com/spreadsheets/d/1YHYTkIXR8-Ql103u-IMI18TXLlGStK8uJjDsOOA0T20/edit#gid=1784579914)
- [C++ client examples](https://github.com/apache/pulsar-client-cpp/tree/main/examples)
- [Get started with Schema](schema-get-started.md) - for specific schema types that C++ clients support, see [code](https://github.com/apache/pulsar-client-cpp/blob/main/include/pulsar/Schema.h).
