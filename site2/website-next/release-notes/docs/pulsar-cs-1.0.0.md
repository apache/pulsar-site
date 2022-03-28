---
id: pulsar-cs-1.0.0
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
 

## Added

- A number of resilience, correctness, and performance improvements
- The optional listener name can be set via the PulsarClientBuilder
- *Experimental*: Added an extension method for IConsumer that will 'Process' and auto-acknowledge messages while creating an Activity (useful for doing tracing)
- Schema support for the following types
    - Boolean
    - Bytes (using byte[] and ReadOnlySequence\<byte\>)
    - String (UTF-8, UTF-16, and US-ASCII)
    - INT8, INT16, INT32, and INT64
    - Float and Double
    - Time (using TimeSpan)
    - Timestamp and Date (using DateTime)

## Changed

- **Breaking**: Building a producer will now create an IProducer\<T\>\
  The non-generic IProducer interface is still there, but messages can only be sent (ISend) with IProducer\<T\>
- **Breaking**: Building a reader or consumer will now create an IConsumer\<T\> or IReader\<T\>\
  The non-generic IReader and IConsumer are still there, but messages can only be consumed/read (IReceive) with IConsumer\<T\> and IReader\<T\>
- **Breaking**: Receiving a message with now return an IMessage\<T\> instead of the Message class (which is now internal)\
  The non-generic IMessage can be used if 'Value()' (decoding the 'Data' bytes) is not used (when just handling raw messages)
- **Breaking**: The message builder is now generic
- Setting an Action and Func StateChangedHandler on the ConsumerBuilder, ReaderBuilder, and ProducerBuilder are now extension methods
- Setting an Action and Func ExceptionHandler on the PulsarClientBuilder are now extension methods

## Fixed

- When the broker sends a CommandClose[Producer/Consumer] all in-flight (and following) requests to the broker are ignored.\
  Even though we reconnect the consumer, reader, or producer the tasks for the in-flight requests will hang as long as the connection is kept alive by other producers/consumers/readers.\
  This situation is now handled and the requests will be sent again on the new connection.


