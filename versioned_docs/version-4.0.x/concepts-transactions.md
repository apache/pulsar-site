---
id: transactions
title: Transactions
sidebar_label: "Overview"
---

Transactional semantics enable event streaming applications to consume, process, and produce messages in one atomic operation. In Pulsar, a producer or consumer can work with messages across multiple topics and partitions and ensure those messages are processed as a single unit.

The following concepts help you understand Pulsar transactions.

## Transaction coordinator and transaction log
The transaction coordinator maintains the topics and subscriptions that interact in a transaction. When a transaction is committed, the transaction coordinator interacts with the topic owner broker to complete the transaction.

The transaction coordinator maintains the entire life cycle of transactions and prevents a transaction from incorrect status.

The transaction coordinator handles transaction timeout and ensures that the transaction is aborted after a transaction timeout.

All the transaction metadata is persisted in the transaction log. The transaction log is backed by a Pulsar topic. After the transaction coordinator crashes, it can restore the transaction metadata from the transaction log.

## Transaction ID
The transaction ID (TxnID) identifies a unique transaction in Pulsar. The transaction ID is 128-bit. The highest 16 bits are reserved for the ID of the transaction coordinator, and the remaining bits are used for monotonically increasing numbers in each transaction coordinator. It is easy to locate the transaction crash with the TxnID.

## Transaction buffer
Messages produced within a transaction are stored in the transaction buffer. The messages in transaction buffer are not materialized (visible) to consumers until the transactions are committed. The messages in the transaction buffer are discarded when the transactions are aborted.

## Pending acknowledge state
Message acknowledges within a transaction are maintained by the pending acknowledge state before the transaction completes. If a message is in the pending acknowledge state, the message cannot be acknowledged by other transactions until the message is removed from the pending acknowledge state.

The pending acknowledge state is persisted in the pending acknowledge log. The pending acknowledge log is backed by a Pulsar topic. A new broker can restore the state from the pending acknowledge log to ensure the acknowledgment is not lost.

## Performance Optimizations

### Transaction Log Batching

Pulsar supports batched writing to transaction logs to improve performance and reduce the overhead of maintaining transaction state. When enabled, multiple transaction log entries are batched together before writing to storage, reducing I/O operations and improving throughput.

**Key configuration parameters:**
- `transactionLogBatchedWriteEnabled`: Enable batched writing for transaction logs
- `transactionLogBatchedWriteMaxRecords`: Maximum number of records in a batch
- `transactionLogBatchedWriteMaxSize`: Maximum size of a batch in bytes
- `transactionLogBatchedWriteMaxDelayInMillis`: Maximum delay before flushing a batch

### Pending Acknowledgment Batching

To improve performance when handling large numbers of pending acknowledgments, Pulsar supports batching of pending acknowledgment operations. This reduces the overhead of maintaining pending ack state for high-throughput transactional workloads.

### Segmented Transaction Buffer Snapshots

For handling large numbers of aborted transactions efficiently, Pulsar implements segmented snapshot functionality. This feature helps manage transaction buffer snapshots more effectively when dealing with scenarios involving many aborted transactions.

**Benefits:**
- Improved memory management for transaction buffers
- Better handling of abort scenarios with large transaction volumes
- Reduced snapshot overhead for transaction recovery

### Transaction Buffer Performance Tuning

Recent improvements include enhanced transaction buffer configurations for performance tuning:

- **Buffer size optimization**: Configurable buffer sizes for different workload patterns
- **Batch processing**: Improved batching within transaction buffers
- **Memory management**: Better memory allocation strategies for transaction data

## Transaction Isolation and Consistency

### Read Committed Isolation

Pulsar transactions provide **read committed** isolation level, ensuring that:
- Consumers only see messages from committed transactions
- Uncommitted messages remain invisible until transaction commit
- Aborted transactions have their messages discarded automatically

### Cross-Partition Consistency

Transactions in Pulsar can span multiple topics and partitions while maintaining consistency:
- **Atomic commits**: All operations within a transaction succeed or fail together
- **Coordinator-managed state**: Transaction coordinator ensures consistent state across partitions
- **Failure recovery**: System can recover to consistent state after coordinator failures

## Transaction Timeouts and Recovery

### Timeout Management

The transaction coordinator handles transaction timeouts to prevent indefinitely hanging transactions:
- **Configurable timeouts**: Set appropriate timeout values for different use cases
- **Automatic abort**: Transactions are automatically aborted when they exceed timeout
- **Resource cleanup**: Timed-out transactions have their resources cleaned up automatically

### Coordinator Recovery

When a transaction coordinator fails, recovery mechanisms ensure transaction consistency:
- **State restoration**: Transaction state is restored from transaction logs
- **Pending transaction handling**: In-progress transactions are properly handled during recovery
- **Metadata consistency**: Transaction metadata remains consistent across coordinator restarts

## Configuration and Best Practices

### Key Configuration Parameters

#### Core Transaction Settings
- `transactionCoordinatorEnabled`: Enable transaction coordinator in broker (default: `false`)
- `transactionMetadataStoreProviderClassName`: Transaction metadata store provider class (default: `org.apache.pulsar.transaction.coordinator.impl.MLTransactionMetadataStoreProvider`)
- `transactionBufferProviderClassName`: Transaction buffer provider class (default: `org.apache.pulsar.broker.transaction.buffer.impl.TopicTransactionBufferProvider`)
- `transactionPendingAckStoreProviderClassName`: Transaction pending ack store provider class (default: `org.apache.pulsar.broker.transaction.pendingack.impl.MLPendingAckStoreProvider`)

#### Batched Write Settings
- `transactionLogBatchedWriteEnabled`: Enable batched transaction log writes for better efficiency (default: `false`)
- `transactionLogBatchedWriteMaxRecords`: Maximum log records count in a batch (default: `512`)
- `transactionLogBatchedWriteMaxSize`: Maximum bytes size in a batch (default: `4194304` - 4 MB)
- `transactionLogBatchedWriteMaxDelayInMillis`: Maximum wait time for first record in batch (default: `1`)
- `transactionPendingAckBatchedWriteEnabled`: Enable batched writes for pending ack store (default: `false`)

#### Buffer and Snapshot Settings
- `transactionBufferSegmentedSnapshotEnabled`: Enable segmented buffer snapshots for handling large numbers of aborted transactions (default: `false`)
- `transactionBufferSnapshotMaxTransactionCount`: Take snapshot after this many transaction operations (default: `1000`)
- `transactionBufferSnapshotMinTimeInMillis`: Interval for taking snapshots in milliseconds (default: `5000`)
- `transactionBufferSnapshotSegmentSize`: Size of snapshot segment in bytes (default: `262144` - 256 KB)

#### Performance and Limits
- `maxActiveTransactionsPerCoordinator`: Maximum active transactions per coordinator (default: `0` - no limit)
- `numTransactionReplayThreadPoolSize`: Thread pool size for transaction replay (default: number of CPU cores)
- `transactionBufferClientMaxConcurrentRequests`: Maximum concurrent requests for buffer client (default: `1000`)
- `transactionBufferClientOperationTimeoutInMills`: Buffer client operation timeout in milliseconds (default: `3000`)

### Performance Considerations

- **Batch size tuning**: Optimize batch sizes for your workload characteristics
- **Coordinator placement**: Distribute transaction coordinators appropriately
- **Resource allocation**: Ensure adequate resources for transaction processing
- **Monitoring**: Monitor transaction metrics for performance optimization

For detailed configuration and usage examples, see [Pulsar transactions](txn-what.md).
