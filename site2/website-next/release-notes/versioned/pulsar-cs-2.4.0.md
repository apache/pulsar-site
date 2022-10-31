---
id: pulsar-cs-2.4.0
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---

### Added

- Support for [Zstd compression](https://github.com/apache/pulsar-dotpulsar/wiki/Compression) via the [ZstdSharp.Port](https://www.nuget.org/packages/ZstdSharp.Port) NuGet package

### Fixed

- The presence of [ZstdNet](https://www.nuget.org/packages/ZstdNet) on a non-Windows system will cause DotPulsar to fault consumers, producers, and readers
