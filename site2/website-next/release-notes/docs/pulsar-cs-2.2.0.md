---
id: pulsar-cs-2.2.0
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
 

## Added

- Extension methods for IConsumerBuilder, IProducerBuilder, and IReaderBuilder for setting a StateChangedHandler without a cancellation token

## Changed

- The following internal exceptions are now public
    - ChannelNotReadyException (should be ignored when logging exceptions)
    - ConsumerNotFoundException (from the broker, but indicates an internal problem)
    - ServiceNotReadyException (the broker is not ready)
    - TooManyRequestsException (the broker is getting too many requests)


