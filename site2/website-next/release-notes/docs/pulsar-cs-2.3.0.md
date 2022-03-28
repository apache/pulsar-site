---
id: pulsar-cs-2.3.0
title: Pulsar DotPulsar
sidebar_label: Pulsar DotPulsar
---
 

## Added

- Metrics (the meter name is 'DotPulsar')
    - dotpulsar.client.count - number of active clients (gauge)
    - dotpulsar.connection.count - number of active connections (gauge)
    - dotpulsar.reader.count - number of active readers (gauge with 'topic' tag)
    - dotpulsar.consumer.count - number of active consumers (gauge with 'topic' tag)
    - dotpulsar.producer.count - number of active producers (gauge with 'topic' tag)
    - dotpulsar.producer.send.duration - Measures the duration for sending a message (histogram with 'topic' tag)
    - dotpulsar.consumer.process.duration - Measures the duration for processing a message (histogram with 'topic' and 'subscription' tags)

## Changed

- Adding a property to MessageMetadata with a key or value of null will throw an ArgumentNullException


