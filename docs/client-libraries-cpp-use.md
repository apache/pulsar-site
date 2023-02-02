---
id: client-libraries-cpp-use
title: Use C++ client
sidebar_label: "Use"
---

## Create a producer

To use Pulsar as a producer, you need to create a producer on the C++ client. There are two main ways of using a producer:
- [Blocking style](#simple-blocking-example) : each call to `send` waits for an ack from the broker.
- [Non-blocking asynchronous style](#non-blocking-example) : `sendAsync` is called instead of `send` and a callback is supplied for when the ack is received from the broker.

### Simple blocking example

This example sends 100 messages using the blocking style. While simple, it does not produce high throughput as it waits for each ack to come back before sending the next message.

```cpp
#include <pulsar/Client.h>
#include <thread>

using namespace pulsar;

int main() {
    Client client("pulsar://localhost:6650");

    Producer producer;

    Result result = client.createProducer("persistent://public/default/my-topic", producer);
    if (result != ResultOk) {
        std::cout << "Error creating producer: " << result << std::endl;
        return -1;
    }

    // Send 100 messages synchronously
    int ctr = 0;
    while (ctr < 100) {
        std::string content = "msg" + std::to_string(ctr);
        Message msg = MessageBuilder().setContent(content).setProperty("x", "1").build();
        Result result = producer.send(msg);
        if (result != ResultOk) {
            std::cout << "The message " << content << " could not be sent, received code: " << result << std::endl;
        } else {
            std::cout << "The message " << content << " sent successfully" << std::endl;
        }

        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        ctr++;
    }

    std::cout << "Finished producing synchronously!" << std::endl;

    client.close();
    return 0;
}
```

### Non-blocking example

This example sends 100 messages using the non-blocking style calling `sendAsync` instead of `send`. This allows the producer to have multiple messages in-flight at a time which increases throughput.

The producer configuration `blockIfQueueFull` is useful here to avoid `ResultProducerQueueIsFull` errors when the internal queue for outgoing send requests becomes full. Once the internal queue is full, `sendAsync` becomes blocking which can make your code simpler.

Without this configuration, the result code `ResultProducerQueueIsFull` is passed to the callback. You must decide how to deal with that (retry, discard etc).

```cpp
#include <pulsar/Client.h>
#include <thread>
#include <atomic>

using namespace pulsar;

std::atomic<uint32_t> acksReceived;

void callback(Result code, const MessageId& msgId, std::string msgContent) {
    // message processing logic here
    std::cout << "Received ack for msg: " << msgContent << " with code: "
        << code << " -- MsgID: " << msgId << std::endl;
    acksReceived++;
}

int main() {
    Client client("pulsar://localhost:6650");

    ProducerConfiguration producerConf;
    producerConf.setBlockIfQueueFull(true);
    Producer producer;
    Result result = client.createProducer("persistent://public/default/my-topic",
                                          producerConf, producer);
    if (result != ResultOk) {
        std::cout << "Error creating producer: " << result << std::endl;
        return -1;
    }

    // Send 100 messages asynchronously
    int ctr = 0;
    while (ctr < 100) {
        std::string content = "msg" + std::to_string(ctr);
        Message msg = MessageBuilder().setContent(content).setProperty("x", "1").build();
        producer.sendAsync(msg, std::bind(callback,
                                          std::placeholders::_1, std::placeholders::_2, content));

        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        ctr++;
    }

    // wait for 100 messages to be acked
    while (acksReceived < 100) {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    std::cout << "Finished producing asynchronously!" << std::endl;

    client.close();
    return 0;
}
```

### Partitioned topics and lazy producers

When scaling out a Pulsar topic, you may configure a topic to have hundreds of partitions. Likewise, you may have also scaled out your producers so there are hundreds or even thousands of producers. This can put some strain on the Pulsar brokers as when you create a producer on a partitioned topic, internally it creates one internal producer per partition which involves communications to the brokers for each one. So for a topic with 1000 partitions and 1000 producers, it ends up creating 1,000,000 internal producers across the producer applications, each of which has to communicate with a broker to find out which broker it should connect to and then perform the connection handshake.

You can reduce the load caused by this combination of a large number of partitions and many producers by doing the following:
- use SinglePartition partition routing mode (this ensures that all messages are only sent to a single, randomly selected partition)
- use non-keyed messages (when messages are keyed, routing is based on the hash of the key and so messages will end up being sent to multiple partitions)
- use lazy producers (this ensures that an internal producer is only created on demand when a message needs to be routed to a partition)

With our example above, that reduces the number of internal producers spread out over the 1000 producer apps from 1,000,000 to just 1000.

Note that there can be extra latency for the first message sent. If you set a low send timeout, this timeout could be reached if the initial connection handshake is slow to complete.

```cpp
ProducerConfiguration producerConf;
producerConf.setPartitionsRoutingMode(ProducerConfiguration::UseSinglePartition);
producerConf.setLazyStartPartitionedProducers(true);
```

## Create a consumer

To use Pulsar as a consumer, you need to create a consumer on the C++ client. There are two main ways of using the consumer:
- [Blocking style](#blocking-example): synchronously calling `receive(msg)`.
- [Non-blocking](#consumer-with-a-message-listener) (event-based) style: using a message listener.

### Blocking example

The benefit of this approach is that it is the simplest code. Simply keeps calling `receive(msg)` which blocks until a message is received.

This example starts a subscription at the earliest offset and consumes 100 messages.

```cpp
#include <pulsar/Client.h>

using namespace pulsar;

int main() {
    Client client("pulsar://localhost:6650");

    Consumer consumer;
    ConsumerConfiguration config;
    config.setSubscriptionInitialPosition(InitialPositionEarliest);
    Result result = client.subscribe("persistent://public/default/my-topic", "consumer-1", config, consumer);
    if (result != ResultOk) {
        std::cout << "Failed to subscribe: " << result << std::endl;
        return -1;
    }

    Message msg;
    int ctr = 0;
    // consume 100 messages
    while (ctr < 100) {
        consumer.receive(msg);
        std::cout << "Received: " << msg
            << "  with payload '" << msg.getDataAsString() << "'" << std::endl;

        consumer.acknowledge(msg);
        ctr++;
    }

    std::cout << "Finished consuming synchronously!" << std::endl;

    client.close();
    return 0;
}
```