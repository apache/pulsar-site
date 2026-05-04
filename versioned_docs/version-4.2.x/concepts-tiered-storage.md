---
id: concepts-tiered-storage
title: Tiered Storage
sidebar_label: "Tiered Storage"
---

Pulsar's segment-oriented architecture allows for topic backlogs to grow very large, effectively without limit. However, this can become expensive over time.

One way to alleviate this cost is to use Tiered Storage. With tiered storage, older messages in the backlog can be moved from BookKeeper to a cheaper storage mechanism, while still allowing clients to access the backlog as if nothing had changed.

![Tiered Storage](/assets/pulsar-tiered-storage.png)

## How Tiered Storage Works

Tiered storage leverages Pulsar's segment-based architecture where data is stored in immutable segments (ledgers) in BookKeeper. When segments are sealed and become read-only, they can be safely offloaded to external storage systems.

### Offloading Process

1. **Segment Sealing**: When a BookKeeper ledger is closed (due to size limits, time limits, or manual triggers), it becomes immutable.
2. **Eligibility Check**: The broker determines which segments are eligible for offloading based on configured policies.
3. **Data Transfer**: Eligible segments are copied to the configured long-term storage backend.
4. **Metadata Update**: BookKeeper metadata is updated to reference the external storage location.
5. **Local Deletion**: After a configurable delay (default: 4 hours), the original data is deleted from BookKeeper.

### Transparent Access

Consumers can access offloaded data transparently. When a consumer requests data that has been offloaded:
- The broker checks BookKeeper metadata to determine the storage location
- If data is in external storage, the broker retrieves it seamlessly
- The consumer receives the data as if it were still in BookKeeper

## Supported Storage Backends

Pulsar supports multiple storage backends for tiered storage:

### Cloud Storage Providers

- **Amazon S3**: Industry-standard object storage with multiple storage classes
- **Google Cloud Storage (GCS)**: Google's object storage with lifecycle management
- **Microsoft Azure Blob Storage**: Azure's object storage solution
- **Alibaba Cloud OSS**: Alibaba's object storage service

### On-Premises Solutions

- **Filesystem**: Local or network-attached storage for on-premises deployments
- **S3-Compatible Storage**: MinIO, Ceph, and other S3-compatible solutions

### Storage Classes and Cost Optimization

Different storage backends offer various storage classes:
- **Hot storage**: Immediate access, higher cost (S3 Standard, GCS Standard)
- **Cool storage**: Infrequent access, lower cost (S3 IA, GCS Nearline)
- **Cold storage**: Archive storage, lowest cost (S3 Glacier, GCS Coldline)

## Configuration and Policies

### Offloading Triggers

Tiered storage can be triggered by:

1. **Size-based policies**: Offload when topic backlog exceeds a certain size
2. **Time-based policies**: Offload data older than a specified age
3. **Manual triggers**: Administrative commands via REST API or CLI
4. **Namespace-level policies**: Automatic offloading based on namespace configuration

### Key Configuration Parameters

- **Offload threshold**: Minimum backlog size before offloading begins
- **Offload deletion lag**: Delay before deleting data from BookKeeper after offloading
- **Max block size**: Maximum size of data blocks uploaded to external storage
- **Read buffer size**: Buffer size for reading offloaded data
- **Offload driver**: Backend storage driver configuration

## Performance Considerations

### Read Performance

- **First access**: Reading offloaded data is slower than BookKeeper due to network latency
- **Caching**: Some implementations cache frequently accessed offloaded data
- **Prefetching**: Brokers may prefetch data based on access patterns

### Write Performance

- **Asynchronous offloading**: Offloading occurs in the background without affecting write performance
- **Parallel transfers**: Multiple segments can be offloaded concurrently
- **Bandwidth management**: Configurable limits to prevent offloading from overwhelming network resources

### Cost Benefits

> Data written to BookKeeper is replicated to 3 physical machines by default. However, once a segment is sealed in BookKeeper it becomes immutable and can be copied to long term storage. Long term storage can achieve cost savings by using mechanisms such as [Reed-Solomon error correction](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction) to require fewer physical copies of data.

Cost savings come from:
- **Reduced replication**: External storage typically requires fewer replicas
- **Storage class optimization**: Use cheaper storage classes for older data
- **Operational efficiency**: Reduced BookKeeper cluster storage requirements

## Use Cases and Benefits

### Long-term Data Retention

- **Compliance requirements**: Meet regulatory requirements for data retention
- **Historical analysis**: Maintain access to historical data for analytics
- **Audit trails**: Preserve message history for compliance and auditing

### Cost Optimization

- **Storage cost reduction**: Move cold data to cheaper storage tiers
- **Operational efficiency**: Reduce BookKeeper storage requirements
- **Elastic scaling**: Handle varying data volumes without over-provisioning

## Management and Operations

### Monitoring

- **Offloading metrics**: Track offloading progress and performance
- **Storage usage**: Monitor storage consumption across tiers
- **Access patterns**: Analyze data access patterns for optimization

### Automation

- **Policy-based management**: Automated offloading based on predefined policies
- **Lifecycle management**: Integration with cloud provider lifecycle policies
- **Alerting**: Notifications for offloading failures or threshold breaches

> For detailed setup instructions and configuration examples, see the [Tiered storage cookbook](cookbooks-tiered-storage.md).
