---
id: client-libraries-cpp
title: Pulsar C++ client
sidebar_label: "C++ client"
---

You can use a Pulsar C++ client to create Pulsar [producers](concepts-clients.md#producer), [consumers](concepts-clients.md#consumer), and [readers](concepts-clients.md#reader) in C++. All the methods in Pulsar C++ clients are thread-safe.

## Get started

1. [Set up C++ client library](client-libraries-cpp-setup.md)
2. [Initialize a C++ client](client-libraries-cpp-initialize.md)
3. [Use a C++ client](client-libraries-cpp-use.md)

## What's next?

- [Work with clients](client-libraries-clients.md)
- [Work with producers](client-libraries-producers.md)
- [Work with consumers](client-libraries-consumers.md)
- [Work with readers](client-libraries-readers.md)

## Reference doc

- [C++ client API docs](@pulsar:apidoc:cpp@)
  - [Client configurations](@pulsar:apidoc:cpp@/classpulsar_1_1_client_configuration.html)
  - [Producer configurations](@pulsar:apidoc:cpp@/classpulsar_1_1_producer_configuration.html)
  - [Consumer configurations](@pulsar:apidoc:cpp@/classpulsar_1_1_consumer_configuration.html)
  - [Reader configurations](@pulsar:apidoc:cpp@/classpulsar_1_1_reader_configuration.html)
- [Release notes](/release-notes/client-cpp)
- [Code examples](https://github.com/apache/pulsar-client-cpp/tree/main/examples)
- [Supported schema types](https://github.com/apache/pulsar-client-cpp/blob/main/include/pulsar/Schema.h)
- [Client feature matrix](/client-feature-matrix/)

## Changes for 3.0.0 and later versions

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