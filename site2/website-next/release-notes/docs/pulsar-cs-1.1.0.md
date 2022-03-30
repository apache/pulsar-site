---
id: pulsar-cs-1.1.0
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
 

## Added

- The producer now supports partitioned topics
- The IMessageRouter interface with the RoundRobinPartitionRouter (default) and SinglePartitionRouter implementations
- The producer builder accepts a custom implementation of IMessageRouter

## Changed

- The producer state can now be 'PartiallyConnected'
- The KeyBytes property on MessageMetadata returned null if the key was set via a string. Now it will return string keys as UTF8 bytes

## Fixed

- Autogenerate a consumer and reader name when it's not explicitly set by the user


