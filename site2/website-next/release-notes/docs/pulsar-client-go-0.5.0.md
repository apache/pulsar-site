---
id: pulsar-client-go-0.5.0
title: Pulsar Client Go
sidebar_label: Pulsar Client Go
---

### Fixes

 * #465 Reverted datadog to DataDog
 * #499 Fix range channel deadlock error
 * #509 Add sentAt when put item into pendingQueue
 * #474 Fix race condition/goroutine leak in partition discovery goroutine
 * #494 Close cnxPool when closing a Client 
 * #478 Move GetPartitionedTopicMetadata to lookup service
 * #470 Fix unexpected nil pointer when reading item from keyring
 * #467 Fix reader with start latest message id inclusive 

### Improvements

 * #510 Added http lookup service support
 * #502 Support listener name for go client
 * #484 Add multiple hosts support 
 * #471 Use newError to build return error
 * #459 Improve error log for frame size too big and maxMessageSize


