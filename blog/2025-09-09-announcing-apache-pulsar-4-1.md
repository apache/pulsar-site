---
title: "What's New in Apache Pulsar 4.1"
authors: [pulsar-community]
tags: [release, 4.1]
date: 2025-01-17
---

# What's New in Apache Pulsar 4.1

The Apache Pulsar community is thrilled to announce the launch of Apache Pulsar 4.1, a significant feature release!

## What's new in Apache Pulsar 4.1 since Pulsar 4.0?

Pulsar 4.1 [includes numerous improvements and enhancements](https://github.com/apache/pulsar/releases/tag/v4.1.0) since the previous release Pulsar 4.0 in October 2024. This release introduces 19 Pulsar Improvement Proposals (PIPs) and hundreds of bug fixes, security updates, and performance improvements that strengthen the platform's capabilities across multiple areas.

Since there are many new features and improvements, this blog post will highlight the most significant updates. Apache Pulsar contributors are invited to contribute additional blog posts with more details about the new features and improvements.

## Key Pulsar Improvement Proposals (PIPs)

Pulsar 4.1 introduces 19 approved PIPs that enhance various aspects of the platform:

### Enhanced Security and Authentication
- **PIP-292**: Enforce token expiration time in the WebSocket plugin, improving security for WebSocket connections
- **PIP-432**: Add isEncrypted field to EncryptionContext for better encryption handling
- **PIP-436**: Add decryptFailListener to Consumer for improved error handling in encrypted message scenarios

### Client Experience and Configuration
- **PIP-391**: Enable batch index ACK by default, improving acknowledgment efficiency and reducing memory usage
- **PIP-409**: Support producer configuration for retry/dead letter topic producer, providing better control over retry mechanisms
- **PIP-420**: Provide ability for Pulsar clients to integrate with third-party schema registry services, expanding schema management options
- **PIP-421**: Require Java 17 as the minimum for Pulsar Java client SDK, leveraging modern Java features
- **PIP-425**: Support connecting with next available endpoint for multi-endpoint serviceUrls, improving client resilience

### Operational Excellence and Monitoring
- **PIP-416**: Add a new topic method to implement trigger offload by size threshold, enhancing storage management
- **PIP-427**: Align pulsar-admin default for mark-delete rate with broker configuration for consistency
- **PIP-431**: Add creation and last publish timestamps to topic stats, improving observability
- **PIP-435**: Add startTimestamp and endTimestamp for consuming messages in client CLI, enabling precise time-based message consumption

### Advanced Features and Performance
- **PIP-422**: Support global topic-level policy: replicated clusters and new API to delete topic-level policies
- **PIP-428**: Change TopicPoliciesService interface to fix consistency issues in topic policy management
- **PIP-429**: Optimize handling of compacted last entry by skipping payload buffer parsing, improving compaction performance
- **PIP-430**: Pulsar broker cache improvements: refactoring eviction and adding a new cache strategy based on expected read count
- **PIP-433**: Optimize the conflicts of the replication and automatic creation mechanisms, including the automatic creation of topics and schemas

### Administrative and Management Enhancements
- **PIP-373**: Add a topic's system prop that indicates whether users have published TXN messages before
- **PIP-375**: Expose the Admin client configs: readTimeout, requestTimeout, and connectionTimeout
- **PIP-382**: Add a label named reason for topic_load_failed_total metric for better monitoring

## Security Enhancements

Pulsar 4.1 places a strong emphasis on security with multiple critical updates:

### Critical Vulnerability Fixes
The release addresses several high-priority CVEs:
- **CVE-2024-53990**: Upgraded async-http-client to 2.12.4 and disabled AsyncHttpClient CookieStore
- **CVE-2025-8916**: Upgraded bouncycastle bcpkix-fips version to 1.79
- **CVE-2024-6763**: Upgraded Jetty to 9.4.57.v20241219
- **CVE-2025-30204**: Upgraded jwt/v5 to 5.2.2
- **CVE-2025-27818**: Upgraded Kafka connector and clients version to 3.9.1
- **CVE-2025-22868**: Upgraded pulsar-function-go dependencies
- **CVE-2024-47535**: Upgraded to Netty 4.1.115.Final
- **CVE-2025-55163**: Upgraded to Netty 4.1.124.Final
- **CVE-2024-51504**: Upgraded ZooKeeper to 3.9.3

### Cryptographic Improvements
- Upgraded golang.org/x/crypto from 0.21.0 to 0.31.0 in pulsar-function-go
- Replaced bcprov-jdk15on dependency with bcprov-jdk18-on for better Java compatibility
- Upgraded commons-io to 2.18.0 and json-smart to 2.5.2

## Enhanced Client Reliability and Performance

### Batch Processing Improvements
**PIP-391** enables batch index ACK by default, significantly improving acknowledgment efficiency. This change reduces memory usage and provides better performance for high-throughput scenarios where batch processing is common.

### Multi-Endpoint Resilience
**PIP-425** introduces support for connecting with the next available endpoint for multi-endpoint serviceUrls. This enhancement improves client resilience by automatically failover to alternative endpoints when the primary endpoint is unavailable.

### Memory Management and Resource Cleanup
The release includes comprehensive fixes for memory leaks and resource cleanup:
- Fixed memory leaks in ClientCnx.newLookup when encountering TooManyRequestsException
- Resolved memory leaks when message size exceeds maximum limits with batching enabled
- Improved handling of orphan producers and consumers when creation is interrupted
- Enhanced cleanup of retry and dead letter topic producers when sending fails

## Broker and Messaging Improvements

### Advanced Cache Strategy
**PIP-430** introduces significant broker cache improvements with refactored eviction algorithms and a new cache strategy based on expected read count. This enhancement optimizes memory usage and improves cache hit rates for frequently accessed data.

### Message Processing Optimizations
Several improvements enhance message processing efficiency:
- Fixed retry mechanism in MetadataCache#readModifyUpdateOrCreate
- Improved acknowledgeCumulativeAsync to prevent blocking when ackReceipt is enabled
- Enhanced cursor management with better position handling and lifecycle management
- Optimized message TTL checks and expiration processing

### Compaction Performance
**PIP-429** optimizes compacted last entry handling by skipping unnecessary payload buffer parsing, significantly improving compaction performance for topics with large payloads.

## Administrative and Operational Enhancements

### Time-Based Message Consumption
**PIP-435** adds startTimestamp and endTimestamp parameters to the client CLI for consuming messages. This feature enables precise time-based message consumption, particularly useful for:
- Debugging and troubleshooting specific time windows
- Data recovery operations with temporal boundaries
- Time-based message processing and analysis

### Topic Statistics and Monitoring
**PIP-431** enhances topic statistics by adding creation and last publish timestamps. This improvement provides better visibility into topic lifecycle and usage patterns, enabling more informed operational decisions.

### Global Topic-Level Policies
**PIP-422** introduces support for global topic-level replicated clusters policy and new APIs to delete topic-level policies. This enhancement provides more granular control over topic replication and policy management across clusters.

## Function and Connector Improvements

### Schema Registry Integration
**PIP-420** provides the ability for Pulsar clients to integrate with third-party schema registry services. This enhancement expands schema management options beyond Pulsar's built-in schema registry, enabling integration with popular schema management platforms.

### Enhanced Error Handling
The release improves error handling in various scenarios:
- Added decryptFailListener to consumers for better encryption error handling
- Improved exception handling in Pulsar Functions and IO connectors
- Enhanced retry mechanisms and circuit breaker patterns

### Connector Updates
Multiple IO connectors received improvements:
- Enhanced Kafka connector with better bootstrap server logging
- Improved Kinesis connector with better configuration support
- Updated RabbitMQ connector with proper message acknowledgment
- Enhanced monitoring and metrics for connector performance

## Infrastructure and Performance

### Load Balancing Optimizations
Enhanced the ExtensibleLoadManagerImpl with several optimizations:
- Skip unloading when bundle throughput is zero
- Improved service unit state management
- Better load distribution algorithms
- Reduced unnecessary load balancing operations

### Blue-Green Migration Support
Added comprehensive support for blue-green cluster migrations:
- Validation for migration cluster existence
- Improved migration state handling
- Better error handling during migration processes
- Enhanced monitoring and metrics for migration progress

### Metrics and Observability
Improved monitoring capabilities with:
- Fixed metric naming for delayed queues (PIP-399)
- Added dispatch throttling metrics (PIP-406)
- Enhanced topic statistics with timestamp information
- Better error categorization and monitoring

## Library Updates and Dependency Management

Pulsar 4.1 includes extensive library updates to ensure security, performance, and compatibility:

### Major Framework Updates
- **Apache BookKeeper**: Upgraded to 4.17.2 with improved performance and stability
- **Netty**: Updated to 4.1.122.Final with security fixes and performance improvements
- **Avro**: Upgraded to 1.12.0 for better schema handling
- **OpenTelemetry**: Updated to 1.45.0 for enhanced observability

### Build and Development Tools
- **Java 17 Requirement**: PIP-421 establishes Java 17 as the minimum requirement for the Java client SDK
- **Caffeine**: Upgraded from 2.9.1 to 3.2.1 for improved caching performance
- **Guava**: Updated to 33.4.8 with JSpecify annotations
- **Spring Framework**: Updated to 6.1.14 in IO connectors

## Start using Pulsar 4.1

Pulsar 4.1.0 is now available for [download](https://pulsar.apache.org/download/). The download page also includes details about the Docker image. To get started with Pulsar, you can run a Pulsar cluster [on your local machine, Docker, or Kubernetes](https://pulsar.apache.org/docs/4.1.x/getting-started-home/).

## Upgrading existing clusters to Pulsar 4.1

As a feature release within the 4.x series, Pulsar 4.1 maintains compatibility with Pulsar 4.0 deployments. Users running Pulsar 4.0.x can upgrade directly to Pulsar 4.1.0 following standard upgrade procedures.

Pulsar changes in releases are designed to allow upgrading an existing Pulsar cluster to a newer release and then rolling back to the original release version if issues arise. This is considered when changes are made in Pulsar and the default BookKeeper configuration for Pulsar. Since Apache Pulsar is an open-source project, there is no guarantee that a specific configuration can be upgraded and downgraded.

Each Pulsar user is responsible for operating their cluster, and Pulsar cluster upgrades should be tested in testing and staging environments to ensure that a specific configuration can be upgraded and downgraded. When something is supported in the Apache Project, it means that the project is committed to addressing reported issues. This also applies to release upgrade compatibility.

For users upgrading from earlier versions, please follow the standard upgrade path: first upgrade to Pulsar 4.0.x, then proceed to Pulsar 4.1.0.

## Upgrading clients to use Pulsar 4.1

Pulsar 4.1 clients are compatible with Pulsar 4.0 clusters, and Pulsar 4.0 clients are compatible with Pulsar 4.1 clusters. When upgrading clients, you can upgrade directly to the latest supported version. It is recommended to keep the clients up-to-date with the latest security patches and bug fixes.

**Important Note**: PIP-421 establishes Java 17 as the minimum requirement for the Pulsar Java client SDK starting with 4.1. Please ensure your client applications are running on Java 17 or later before upgrading.

When upgrading Java clients, it is a common problem that client module library versions are not aligned. It is recommended to use the [Pulsar BOM](https://pulsar.apache.org/docs/4.1.x/client-libraries-java-setup/#pulsar-bom) to manage the Pulsar Java client version in Maven and Gradle builds. There are also specific instructions for [selecting the Pulsar client version in Spring Boot projects](https://pulsar.apache.org/docs/4.1.x/client-libraries-java-setup/#spring-boot).

## Thank You to Apache Pulsar Contributors

Apache Pulsar 4.1 represents the continued collaborative effort of our vibrant open-source community. This release demonstrates the dedication of developers, organizations, and users worldwide who have contributed to making data streaming more reliable and accessible.

We extend our deepest gratitude to:

- The individual contributors who developed new features, reported bugs, fixed bugs, and improved documentation
- The committers and PMC members who participated in Apache Pulsar project security issue handling, PIP decision making, and voting for releases
- The organizations that have deployed Pulsar in production and shared their valuable feedback
- The users who participated in testing and provided invaluable input during the release process
- The broader Apache Software Foundation community for their continued support

The strength of Apache Pulsar lies in its community-driven development. Whether you're running Pulsar in production or evaluating it for your technology stack, we encourage you to join the conversation on the [dev@pulsar.apache.org](https://pulsar.apache.org/contact/#mailing-lists) mailing list or the [Pulsar Slack community](https://pulsar.apache.org/community/#section-discussions). Your experience and feedback help shape the future of this platform.
