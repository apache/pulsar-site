---
id: pulsar-cs-0.10.0
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
 

## Added

- Added performance improvements when receiving data
- Added the IHandleStateChanged\<TStateChanged\> interface for easier state monitoring
- Added StateChangedHandler methods on ConsumerBuilder, ReaderBuilder, and ProducerBuilder for easier state monitoring
- Added StateChangedHandler property on ConsumerOptions, ReaderOptions, and ProducerOptions for easier state monitoring
- Added four new DotPulsarExceptions: InvalidTransactionStatusException, NotAllowedException, TransactionConflictException and TransactionCoordinatorNotFoundException
- Added properties on Message to read EventTime and PublishTime as DateTime
- Added methods on the IMessageBuilder to set EventTime and DeliverAt using DateTime
- Added properties on MessageMetadata to set EventTime and DeliverAtTime using DateTime
- Added seeking by MessageId on the Reader
- Added seeking by message publish time on the Consumer and Reader
- Added GetLastMessageId on the Reader

## Changed

- The protobuf-net dependency is upgraded from 2.4.6 to 3.0.73 to get support for ReadOnlySequence\<byte\>

## Fixed

- Reconnection issues when seeking


