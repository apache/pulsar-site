---
id: pulsar-cs-0.11.0
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
 

## Added

- The Consumer and Reader now share the IReceive interface for receiving a single message: ValueTask\<Message\> Receive(CancellationToken cancellationToken)
- The Consumer and Reader now share the ISeek interface for seeking on message-id and publish time
- The Consumer and Reader now share the IGetLastMessageId interface for getting the last message-id on a topic
- The Consumer, Reader, and Producer now share the IState interface adding 'OnStateChangeFrom' and 'OnStateChangeTo'
- The PulsarClient, Consumer, Reader, and Producer now have the read-only property 'ServiceUrl'
- The Consumer now have the read-only property 'SubscriptionName'
- All message compression types are now supported (listed below). Please read this [compression how-to](https://github.com/apache/pulsar-dotpulsar/wiki/Compression)
    - LZ4
    - SNAPPY
    - ZLIB
    - ZSTD

## Changed

- MessageId.ToString() now returns a string matching that of other clients: "\{LedgerId\}:\{EntryId\}:\{Partition\}:\{BatchIndex\}"
- A lot of methods were made into extension methods and now require a using statement for 'DotPulsar.Extensions'
    - Producer.StateChangedTo(ProducerState state, CancellationToken cancellationToken)
    - Producer.StateChangedFrom(ProducerState state, CancellationToken cancellationToken)
    - Producer.Send(byte[] data, CancellationToken cancellationToken)
    - Producer.Send(ReadOnlyMemory&lt;byte&gt; data, CancellationToken cancellationToken)
    - Producer.Send(MessageMetadata metadata, byte[] data, CancellationToken cancellationToken)
    - Producer.Send(MessageMetadata metadata, ReadOnlyMemory&lt;byte&gt; data, CancellationToken cancellationToken)
    - Consumer.Acknowledge(Message message, CancellationToken cancellationToken)
    - Consumer.AcknowledgeCumulative(Message message, CancellationToken cancellationToken)
    - Consumer.StateChangedTo(ConsumerState state, CancellationToken cancellationToken)
    - Consumer.StateChangedFrom(ConsumerState state, CancellationToken cancellationToken)
    - Consumer.Messages(CancellationToken cancellationToken)
    - Consumer.Seek(DateTime publishTime, CancellationToken cancellationToken)
    - Consumer.Seek(DateTimeOffset publishTime, CancellationToken cancellationToken)
    - Reader.StateChangedTo(ReaderState state, CancellationToken cancellationToken)
    - Reader.StateChangedFrom(ReaderState state, CancellationToken cancellationToken)
    - Reader.Messages(CancellationToken cancellationToken)
    - Reader.Seek(DateTime publishTime, CancellationToken cancellationToken)
    - Reader.Seek(DateTimeOffset publishTime, CancellationToken cancellationToken)

## Fixed

- Before the Consumer and Reader would throw an ArgumentOutOfRangeException if they encountered a compressed message. Now they will throw a CompressionException if the compression type is not supported
- DotPulsarEventSource (performance counters) was only enabled for .NET Standard 2.1. Now it's enabled for all target frameworks except .NET Standard 2.0


