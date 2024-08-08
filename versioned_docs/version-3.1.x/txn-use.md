---
id: txn-use
title: Get started
sidebar_label: "Get started"
---

Pulsar transaction is primarily a server-side and protocol-level feature. This tutorial guides you through every step of how to use the [Pulsar transaction API](/api/admin/) to send and receive messages in a Java client.

:::note

Currently, [Pulsar transaction API](/api/admin/) is available in **Pulsar 2.8.0 or later** versions. It is only available for **Java**, **Go** and **.NET** clients.

:::
## Prerequisites

- [Start Pulsar 2.8.0 or later versions](getting-started-standalone.md)

## Steps

1. Enable transactions. You can set the following configurations in the [`broker.conf`](https://github.com/apache/pulsar/blob/master/conf/broker.conf) or [`standalone.conf`](https://github.com/apache/pulsar/blob/master/conf/standalone.conf) file.

    ```conf
    //mandatory configuration, used to enable transaction coordinator
    transactionCoordinatorEnabled=true

    //mandatory configuration, used to create systemTopic used for transaction buffer snapshot
    systemTopicEnabled=true
    ```

    :::note

    **By default**, Pulsar transactions are **disabled**.

    :::

2. Initialize transaction coordinator metadata.

    The transaction coordinator can leverage the advantages of partitioned topics (such as load balance).

    **Input**

    ```shell
    bin/pulsar initialize-transaction-coordinator-metadata -cs 127.0.0.1:2181 -c standalone
    ```

    **Output**

    ```shell
    Transaction coordinator metadata setup success
    ```

3. Create a Pulsar client and enable transactions. Since client need to know transaction coordinator from system topic, please make sure your client role has system namespace `pulsar/system` produce/consume permissions.

4. Create producers and consumers.

5. Produce and receive messages.

6. Create transactions.

7. Produce and ack messages with transactions.

    :::note

    Currently, messages can be acked individually rather than cumulatively.

    :::

8. End transactions.

    :::tip

    The code snippet below is the example for step 3 - step 8.

    :::

    **Input**

````mdx-code-block
<Tabs groupId="api-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Go","value":"Go"}]}>

<TabItem value="Java">

    ```java
    PulsarClient client = PulsarClient.builder()
                    // Step 3: create a Pulsar client and enable transactions.
                    .enableTransaction(true)
                    .serviceUrl(jct.serviceUrl)
                    .build();

            // Step 4: create three producers to produce messages to input and output topics.
            ProducerBuilder<String> producerBuilder = client.newProducer(Schema.STRING);
            Producer<String> inputProducer = producerBuilder.topic(inputTopic)
                    .sendTimeout(0, TimeUnit.SECONDS).create();
            Producer<String> outputProducerOne = producerBuilder.topic(outputTopicOne)
                    .sendTimeout(0, TimeUnit.SECONDS).create();
            Producer<String> outputProducerTwo = producerBuilder.topic(outputTopicTwo)
                    .sendTimeout(0, TimeUnit.SECONDS).create();
            // Step 4: create three consumers to consume messages from input and output topics.
            Consumer<String> inputConsumer = client.newConsumer(Schema.STRING)
                    .subscriptionName("your-subscription-name").topic(inputTopic).subscribe();
            Consumer<String> outputConsumerOne = client.newConsumer(Schema.STRING)
                    .subscriptionName("your-subscription-name").topic(outputTopicOne).subscribe();
            Consumer<String> outputConsumerTwo = client.newConsumer(Schema.STRING)
                    .subscriptionName("your-subscription-name").topic(outputTopicTwo).subscribe();

            int count = 2;
            // Step 5: produce messages to input topics.
            for (int i = 0; i < count; i++) {
                inputProducer.send("Hello Pulsar! count : " + i);
            }

            // Step 5: consume messages and produce them to output topics with transactions.
            for (int i = 0; i < count; i++) {

                // Step 5: the consumer successfully receives messages.
                Message<String> message = inputConsumer.receive();

                // Step 6: create transactions.
                // The transaction timeout is specified as 10 seconds.
                // If the transaction is not committed within 10 seconds, the transaction is automatically aborted.
                Transaction txn = null;
                try {
                    txn = client.newTransaction()
                            .withTransactionTimeout(10, TimeUnit.SECONDS).build().get();
                    // Step 6: you can process the received message with your use case and business logic.

                    // Step 7: the producers produce messages to output topics with transactions
                    outputProducerOne.newMessage(txn).value("Hello Pulsar! outputTopicOne count : " + i).send();
                    outputProducerTwo.newMessage(txn).value("Hello Pulsar! outputTopicTwo count : " + i).send();

                    // Step 7: the consumers acknowledge the input message with the transactions *individually*.
                    inputConsumer.acknowledgeAsync(message.getMessageId(), txn).get();
                    // Step 8: commit transactions.
                    txn.commit().get();
                } catch (ExecutionException e) {
                    if (!(e.getCause() instanceof PulsarClientException.TransactionConflictException)) {
                        // If TransactionConflictException is not thrown,
                        // you need to redeliver or negativeAcknowledge this message,
                        // or else this message will not be received again.
                        inputConsumer.negativeAcknowledge(message);
                    }

                    // If a new transaction is created,
                    // then the old transaction should be aborted.
                    if (txn != null) {
                        txn.abort();
                    }
                }
            }

            // Final result: consume messages from output topics and print them.
            for (int i = 0; i < count; i++) {
                Message<String> message =  outputConsumerOne.receive();
                System.out.println("Receive transaction message: " + message.getValue());
            }

            for (int i = 0; i < count; i++) {
                Message<String> message =  outputConsumerTwo.receive();
                System.out.println("Receive transaction message: " + message.getValue());
            }
        }
    }
    ```

</TabItem>
<TabItem value="Go">

  ```go
	// Step 3: create a Pulsar client and enable transactions.
	client, err := pulsar.NewClient(pulsar.ClientOptions{
		URL:               "<serviceUrl>",
		EnableTransaction: true,
	})
	if err != nil {
		log.Fatalf("create client fail, err = %v", err)
	}
	defer client.Close()
	// Step 4: create three producers to produce messages to input and output topics.
	inputTopic := "inputTopic"
	outputTopicOne := "outputTopicOne"
	outputTopicTwo := "outputTopicTwo"
	subscriptionName := "your-subscription-name"
	inputProducer, _ := client.CreateProducer(pulsar.ProducerOptions{
		Topic:       inputTopic,
		SendTimeout: 0,
	})
	defer inputProducer.Close()
	outputProducerOne, _ := client.CreateProducer(pulsar.ProducerOptions{
		Topic:       outputTopicOne,
		SendTimeout: 0,
	})
	defer outputProducerOne.Close()
	outputProducerTwo, _ := client.CreateProducer(pulsar.ProducerOptions{
		Topic:       outputTopicTwo,
		SendTimeout: 0,
	})
	defer outputProducerTwo.Close()

	// Step 4: create three consumers to consume messages from input and output topics.
	inputConsumer, _ := client.Subscribe(pulsar.ConsumerOptions{
		Topic:            inputTopic,
		SubscriptionName: subscriptionName,
	})
	defer inputConsumer.Close()
	outputConsumerOne, _ := client.Subscribe(pulsar.ConsumerOptions{
		Topic:            outputTopicOne,
		SubscriptionName: subscriptionName,
	})
	defer outputConsumerOne.Close()
	outputConsumerTwo, _ := client.Subscribe(pulsar.ConsumerOptions{
		Topic:            outputTopicTwo,
		SubscriptionName: subscriptionName,
	})
	defer outputConsumerTwo.Close()

	// Step 5: produce messages to input topics.
	ctx := context.Background()
	count := 2
	for i := 0; i < count; i++ {
		inputProducer.Send(ctx, &pulsar.ProducerMessage{
			Payload: []byte(fmt.Sprintf("Hello Pulsar! count : %d", i)),
		})
	}
	// Step 5: consume messages and produce them to output topics with transactions.
	for i := 0; i < count; i++ {
		// Step 5: the consumer successfully receives messages.
		message, err := inputConsumer.Receive(ctx)
		if err != nil {
			log.Printf("receive message from %s fail, err = %v", inputTopic, err)
			continue
		}
		// Step 6: create transactions.
		// The transaction timeout is specified as 10 seconds.
		// If the transaction is not committed within 10 seconds, the transaction is automatically aborted.
		txn, err := client.NewTransaction(10 * time.Second)
		if err != nil {
			log.Printf("create txn fail, err = %v", err)
			continue
		}
		// Step 6: you can process the received message with your use case and business logic.
		// processMessage(message)
		// Step 7: the producers produce messages to output topics with transactions
		_, err = outputProducerOne.Send(context.Background(), &pulsar.ProducerMessage{
			Transaction: txn,
			Payload:     []byte(fmt.Sprintf("Hello Pulsar! outputTopicOne count : %d", i)),
		})
		if err != nil {
			log.Printf("send to producerOne fail %v", err)
			txn.Abort(ctx)
		}
		_, err = outputProducerTwo.Send(context.Background(), &pulsar.ProducerMessage{
			Transaction: txn,
			Payload:     []byte(fmt.Sprintf("Hello Pulsar! outputTopicTwo count : %d", i)),
		})
		if err != nil {
			log.Printf("send to producerTwo fail %v", err)
			txn.Abort(ctx)
		}
		// Step 7: the consumers acknowledge the input message with the transactions *individually*.
		err = inputConsumer.AckWithTxn(message, txn)
		if err != nil {
			log.Printf("ack message fail %v", err)
			txn.Abort(ctx)
		}
		// Step 8: commit transactions.
		err = txn.Commit(ctx)
		if err != nil {
			log.Printf("commit txn fail %v", err)
		}
	}

	// Final result: consume messages from output topics and print them.
	for i := 0; i < count; i++ {
		message, _ := outputConsumerOne.Receive(ctx)
		log.Printf("Receive transaction message: %s", string(message.Payload()))
	}
	for i := 0; i < count; i++ {
		message, _ := outputConsumerTwo.Receive(ctx)
		log.Printf("Receive transaction message: %s", string(message.Payload()))
	}
  ```

</TabItem>
</Tabs>
````

    **Output**

    ```java
    Receive transaction message: Hello Pulsar! count : 1
    Receive transaction message: Hello Pulsar! count : 2
    Receive transaction message: Hello Pulsar! count : 1
    Receive transaction message: Hello Pulsar! count : 2
    ```

## Related topics

- To learn more features that can be used with transactions, see [Pulsar transactions - Advanced features](txn-advanced-features.md).
