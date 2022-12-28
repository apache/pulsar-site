# Broker

## Required
### clusterName
Name of the cluster to which this broker belongs to

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

## Optional
### topicFactoryClassName
Factory class-name to create topic with custom workflow

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `true`

**Category**: 

### zookeeperSessionExpiredPolicy
There are two policies to apply when broker metadata session expires: session expired happens, "shutdown" or "reconnect". 

 With "shutdown", the broker will be restarted.

 With "reconnect", the broker will keep serving the topics, while attempting to recreate a new session.

**Type**: `org.apache.pulsar.broker.MetadataSessionExpiredPolicy`

**Default**: `reconnect`

**Dynamic**: `false`

**Category**: 

### authenticationEnabled
Enable authentication

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Authentication

### authenticationProviders
Authentication provider name list, which is a list of class names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Authentication

### authenticationRefreshCheckSeconds
Interval of time for checking for expired authentication credentials

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Authentication

### brokerClientAuthenticationParameters
Authentication parameters of the authentication plugin the broker is using to connect to other brokers

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `true`

**Category**: Authentication

### brokerClientAuthenticationPlugin
Authentication settings of the broker itself. 

Used when the broker connects to other brokers, either in same or other clusters. Default uses plugin which disables authentication

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.client.impl.auth.AuthenticationDisabled`

**Dynamic**: `true`

**Category**: Authentication

### brokerClientCertificateFilePath
TLS certificate file for internal client, used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: Authentication

### brokerClientKeyFilePath
TLS private key file for internal client, used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: Authentication

### brokerClientTrustCertsFilePath
TLS trusted certificate file for internal client, used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: Authentication

### anonymousUserRole
When this parameter is not empty, unauthenticated users perform as anonymousUserRole

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Authorization

### authenticateOriginalAuthData
If this flag is set then the broker authenticates the original Auth data else it just accepts the originalPrincipal and authorizes it (if required)

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Authorization

### authorizationAllowWildcardsMatching
Allow wildcard matching in authorization

(wildcard matching only applicable if wildcard-char: * presents at first or last position eg: *.pulsar.service, pulsar.service.*)

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Authorization

### authorizationEnabled
Enforce authorization

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Authorization

### authorizationProvider
Authorization provider fully qualified class-name

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.authorization.PulsarAuthorizationProvider`

**Dynamic**: `false`

**Category**: Authorization

### proxyRoles
Role names that are treated as `proxy roles`. 

If the broker sees a request with role as proxyRoles - it will demand to see the original client role or certificate.

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Authorization

### superUserRoles
Role names that are treated as `super-user`, meaning they will be able to do all admin operations and publish/consume from all topics

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `true`

**Category**: Authorization

### additionalServletDirectory
The directory to locate broker additional servlet

**Type**: `java.lang.String`

**Default**: `./brokerAdditionalServlet`

**Dynamic**: `false`

**Category**: Broker Plugin

### additionalServlets
List of broker additional servlet to load, which is a list of broker additional servlet names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Broker Plugin

### functionsWorkerEnablePackageManagement
Flag indicates enabling or disabling function worker using unified PackageManagement service.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Functions

### functionsWorkerEnabled
Flag indicates enabling or disabling function worker on brokers

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Functions

### functionsWorkerServiceNarPackage
The nar package for the function worker service

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: Functions

### disableHttpDebugMethods
If true, the broker will reject all HTTP requests using the TRACE and TRACK verbs.
 This setting may be necessary if the broker is deployed into an environment that uses http port
 scanning and flags web servers allowing the TRACE method as insecure.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: HTTP

### httpMaxRequestSize
If \>0, it will reject all HTTP requests with bodies larged than the configured limit

**Type**: `long`

**Default**: `-1`

**Dynamic**: `false`

**Category**: HTTP

### httpRequestsFailOnUnknownPropertiesEnabled
Admin API fail on unknown request parameter in request-body. see PIP-179. Default false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: HTTP

### httpRequestsLimitEnabled
Enable the enforcement of limits on the incoming HTTP requests

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: HTTP

### httpRequestsMaxPerSecond
Max HTTP requests per seconds allowed. The excess of requests will be rejected with HTTP code 429 (Too many requests)

**Type**: `double`

**Default**: `100.0`

**Dynamic**: `false`

**Category**: HTTP

### brokerClientSslProvider
The TLS Provider used by internal client to authenticate with other Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsCiphers
Specify the tls cipher the internal client will use to negotiate during TLS Handshake (a comma-separated list of ciphers).

Examples:- [TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256].
 used by the internal client to authenticate with Pulsar brokers

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsEnabledWithKeyStore
Whether internal client use KeyStore type to authenticate with other Pulsar brokers

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsKeyStore
TLS KeyStore path for internal client,  used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsKeyStorePassword
TLS KeyStore password for internal client,  used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsKeyStoreType
TLS KeyStore type configuration for internal client: JKS, PKCS12, used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsProtocols
Specify the tls protocols the broker will use to negotiate during TLS handshake (a comma-separated list of protocol names).

Examples:- [TLSv1.3, TLSv1.2] 
 used by the internal client to authenticate with Pulsar brokers

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsTrustStore
TLS TrustStore path for internal client,  used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsTrustStorePassword
TLS TrustStore password for internal client,  used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### brokerClientTlsTrustStoreType
TLS TrustStore type configuration for internal client: JKS, PKCS12  used by the internal client to authenticate with Pulsar brokers

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsEnabledWithKeyStore
Enable TLS with KeyStore type configuration in broker

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsKeyStore
TLS KeyStore path in broker

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsKeyStorePassword
TLS KeyStore password for broker

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsKeyStoreType
TLS KeyStore type configuration in broker: JKS, PKCS12

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsProvider
Specify the TLS provider for the broker service: 
When using TLS authentication with CACert, the valid value is either OPENSSL or JDK.
When using TLS authentication with KeyStore, available values can be SunJSSE, Conscrypt and etc.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsTrustStore
TLS TrustStore path in broker

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsTrustStorePassword
TLS TrustStore password for broker, null means empty password.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### tlsTrustStoreType
TLS TrustStore type configuration in broker: JKS, PKCS12

**Type**: `java.lang.String`

**Default**: `JKS`

**Dynamic**: `false`

**Category**: KeyStoreTLS

### defaultNamespaceBundleSplitAlgorithm
Default algorithm name for namespace bundle split

**Type**: `java.lang.String`

**Default**: `range_equally_divide`

**Dynamic**: `true`

**Category**: Load Balancer

### flowOrQpsDifferenceThresholdPercentage
In FlowOrQpsEquallyDivideBundleSplitAlgorithm, if msgRate \>= loadBalancerNamespaceBundleMaxMsgRate *  (100 + flowOrQpsDifferenceThresholdPercentage)/100.0  or throughput \>=  loadBalancerNamespaceBundleMaxBandwidthMbytes *  (100 + flowOrQpsDifferenceThresholdPercentage)/100.0,  execute split bundle

**Type**: `int`

**Default**: `10`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerAutoBundleSplitEnabled
enable/disable automatic namespace bundle split

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerAutoUnloadSplitBundlesEnabled
enable/disable automatic unloading of split bundles

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerAverageResourceUsageDifferenceThresholdPercentage
Average resource usage difference threshold to determine a broker whether to be a best candidate in LeastResourceUsageWithWeight.(eg: broker1 with 10% resource usage with weight and broker2 with 30% and broker3 with 80% will have 40% average resource usage. The placement strategy can select broker1 and broker2 as best candidates.)

**Type**: `int`

**Default**: `10`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerBandwithInResourceWeight
BandwithIn Resource Usage Weight

**Type**: `double`

**Default**: `1.0`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerBandwithOutResourceWeight
BandwithOut Resource Usage Weight

**Type**: `double`

**Default**: `1.0`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerBrokerMaxTopics
Usage threshold to allocate max number of topics to broker

**Type**: `int`

**Default**: `50000`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerBrokerOverloadedThresholdPercentage
Usage threshold to determine a broker as over-loaded

**Type**: `int`

**Default**: `85`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerBrokerThresholdShedderPercentage
Usage threshold to determine a broker whether to start threshold shedder

**Type**: `int`

**Default**: `10`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerBundleUnloadMinThroughputThreshold
Bundle unload minimum throughput threshold (MB)

**Type**: `double`

**Default**: `10.0`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerCPUResourceWeight
CPU Resource Usage Weight

**Type**: `double`

**Default**: `1.0`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerDirectMemoryResourceWeight
Direct Memory Resource Usage Weight

**Type**: `double`

**Default**: `1.0`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerDistributeBundlesEvenlyEnabled
enable/disable distribute bundles evenly

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerEnabled
Enable load balancer

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Load Balancer

### loadBalancerHistoryResourcePercentage
Resource history Usage Percentage When adding new resource usage info

**Type**: `double`

**Default**: `0.9`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerHostUsageCheckIntervalMinutes
Frequency of report to collect, in minutes

**Type**: `int`

**Default**: `1`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerLoadPlacementStrategy
load balance placement strategy

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.loadbalance.impl.LeastLongTermMessageRate`

**Dynamic**: `false`

**Category**: Load Balancer

### loadBalancerLoadSheddingStrategy
load balance load shedding strategy (It requires broker restart if value is changed using dynamic config). Default is ThresholdShedder since 2.10.0

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.loadbalance.impl.ThresholdShedder`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerMemoryResourceWeight
Memory Resource Usage Weight

**Type**: `double`

**Default**: `1.0`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerMsgRateDifferenceShedderThreshold
Message-rate percentage threshold between highest and least loaded brokers for uniform load shedding. (eg: broker1 with 50K msgRate and broker2 with 30K msgRate will have 66% msgRate difference and load balancer can unload bundles from broker-1 to broker-2)

**Type**: `double`

**Default**: `50.0`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerMsgThroughputMultiplierDifferenceShedderThreshold
Message-throughput threshold between highest and least loaded brokers for uniform load shedding. (eg: broker1 with 450MB msgRate and broker2 with 100MB msgRate will have 4.5 times msgThroughout difference and load balancer can unload bundles from broker-1 to broker-2)

**Type**: `double`

**Default**: `4.0`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerNamespaceBundleMaxBandwidthMbytes
maximum bandwidth (in + out) in a bundle, otherwise bundle split will be triggered

**Type**: `int`

**Default**: `100`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerNamespaceBundleMaxMsgRate
maximum msgRate (in + out) in a bundle, otherwise bundle split will be triggered

**Type**: `int`

**Default**: `30000`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerNamespaceBundleMaxSessions
maximum sessions (producers + consumers) in a bundle, otherwise bundle split will be triggered(disable threshold check with value -1)

**Type**: `int`

**Default**: `1000`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerNamespaceBundleMaxTopics
maximum topics in a bundle, otherwise bundle split will be triggered

**Type**: `int`

**Default**: `1000`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerNamespaceMaximumBundles
maximum number of bundles in a namespace

**Type**: `int`

**Default**: `128`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerOverrideBrokerNicSpeedGbps
Option to override the auto-detected network interfaces max speed

**Type**: `java.util.Optional`

**Default**: `Optional.empty`

**Dynamic**: `false`

**Category**: Load Balancer

### loadBalancerReportUpdateMaxIntervalMinutes
Min delay of load report to collect, in milli-seconds

**Type**: `int`

**Default**: `15`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerReportUpdateMinIntervalMillis
maximum interval to update load report

**Type**: `int`

**Default**: `5000`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerReportUpdateThresholdPercentage
Percentage of change to trigger load report update

**Type**: `int`

**Default**: `10`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerResourceQuotaUpdateIntervalMinutes
Interval to flush dynamic resource quota to ZooKeeper

**Type**: `int`

**Default**: `15`

**Dynamic**: `false`

**Category**: Load Balancer

### loadBalancerSheddingEnabled
Enable/disable automatic bundle unloading for load-shedding

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerSheddingGracePeriodMinutes
Prevent the same topics to be shed and moved to other broker more than once within this timeframe

**Type**: `long`

**Default**: `30`

**Dynamic**: `true`

**Category**: Load Balancer

### loadBalancerSheddingIntervalMinutes
Load shedding interval. 

Broker periodically checks whether some traffic should be offload from some over-loaded broker to other under-loaded brokers

**Type**: `int`

**Default**: `1`

**Dynamic**: `true`

**Category**: Load Balancer

### loadManagerClassName
Name of load manager to use

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl`

**Dynamic**: `true`

**Category**: Load Balancer

### lowerBoundarySheddingEnabled
When [current usage < average usage - threshold], the broker with the highest load will be triggered to unload

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Load Balancer

### maxUnloadBundleNumPerShedding
For each uniform balanced unload, the maximum number of bundles that can be unloaded. The default value is -1, which means no limit

**Type**: `int`

**Default**: `-1`

**Dynamic**: `true`

**Category**: Load Balancer

### maxUnloadPercentage
In the UniformLoadShedder strategy, the maximum unload ratio.

**Type**: `double`

**Default**: `0.2`

**Dynamic**: `true`

**Category**: Load Balancer

### minUnloadMessage
In the UniformLoadShedder strategy, the minimum message that triggers unload.

**Type**: `int`

**Default**: `1000`

**Dynamic**: `true`

**Category**: Load Balancer

### minUnloadMessageThroughput
In the UniformLoadShedder strategy, the minimum throughput that triggers unload.

**Type**: `int`

**Default**: `1048576`

**Dynamic**: `true`

**Category**: Load Balancer

### namespaceBundleUnloadingTimeoutMs
Time to wait for the unloading of a namespace bundle

**Type**: `long`

**Default**: `60000`

**Dynamic**: `true`

**Category**: Load Balancer

### supportedNamespaceBundleSplitAlgorithms
Supported algorithms name for namespace bundle split

**Type**: `java.util.List`

**Default**: `[range_equally_divide, topic_count_equally_divide, specified_positions_divide, flow_or_qps_equally_divide]`

**Dynamic**: `true`

**Category**: Load Balancer

### aggregatePublisherStatsByProducerName
If true, aggregate publisher stats of PartitionedTopicStats by producerName

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### authenticateMetricsEndpoint
Whether the '/metrics' endpoint requires authentication. Defaults to false.'authenticationEnabled' must also be set for this to take effect.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### exposeBundlesMetricsInPrometheus
Enable expose the broker bundles metrics.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Metrics

### exposeConsumerLevelMetricsInPrometheus
If true, export consumer level metrics otherwise namespace level

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### exposeManagedCursorMetricsInPrometheus
If true, export managed cursor metrics

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### exposeManagedLedgerMetricsInPrometheus
If true, export managed ledger metrics (aggregated by namespace)

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Metrics

### exposePreciseBacklogInPrometheus
Enable expose the precise backlog stats.
 Set false to use published counter and consumed counter to calculate,
 this would be more efficient but may be inaccurate. Default is false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### exposeProducerLevelMetricsInPrometheus
If true, export producer level metrics otherwise namespace level

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### exposePublisherStats
If true, export publisher stats when returning topics stats from the admin rest api

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Metrics

### exposeSubscriptionBacklogSizeInPrometheus
Enable expose the backlog size for each subscription when generating stats.
 Locking is used for fetching the status so default to false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### exposeTopicLevelMetricsInPrometheus
If true, export topic level metrics otherwise namespace level

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Metrics

### jvmGCMetricsLoggerClassName
Classname of Pluggable JVM GC metrics logger that can log GC specific metrics

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Metrics

### metricsBufferResponse
If true, export buffered metrics

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### metricsServletTimeoutMs
Time in milliseconds that metrics endpoint would time out. Default is 30s.
 Increase it if there are a lot of topics to expose topic-level metrics.
 Set it to 0 to disable timeout.

**Type**: `long`

**Default**: `30000`

**Dynamic**: `false`

**Category**: Metrics

### splitTopicAndPartitionLabelInPrometheus
Enable splitting topic and partition label in Prometheus.
 If enabled, a topic name will split into 2 parts, one is topic name without partition index,
 another one is partition index, e.g. (topic=xxx, partition=0).
 If the topic is a non-partitioned topic, -1 will be used for the partition index.
 If disabled, one label to represent the topic and partition, e.g. (topic=xxx-partition-0)
 Default is false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Metrics

### statsUpdateFrequencyInSecs
Stats update frequency in seconds

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Metrics

### statsUpdateInitialDelayInSecs
Stats update initial delay in seconds

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Metrics

### enablePackagesManagement
Enable the packages management service or not

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Packages Management

### packagesManagementLedgerRootPath
The bookkeeper ledger root path

**Type**: `java.lang.String`

**Default**: `/ledgers`

**Dynamic**: `false`

**Category**: Packages Management

### packagesManagementStorageProvider
The packages management service storage service provider

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.packages.management.storage.bookkeeper.BookKeeperPackagesStorageProvider`

**Dynamic**: `false`

**Category**: Packages Management

### packagesReplicas
When the packages storage provider is bookkeeper, you can use this configuration to
control the number of replicas for storing the package

**Type**: `int`

**Default**: `1`

**Dynamic**: `false`

**Category**: Packages Management

### activeConsumerFailoverDelayTimeMillis
How long to delay rewinding cursor and dispatching messages when active consumer is changed

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Policies

### backlogQuotaCheckEnabled
Enable backlog quota check. Enforces actions on topic when the quota is reached

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Policies

### backlogQuotaCheckIntervalInSeconds
How often to check for topics that have reached the quota. It only takes effects when `backlogQuotaCheckEnabled` is true

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Policies

### backlogQuotaDefaultLimitBytes
Default per-topic backlog quota limit by size, less than 0 means no limitation. default is -1. Increase it if you want to allow larger msg backlog

**Type**: `long`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Policies

### backlogQuotaDefaultLimitGB
@deprecated - Use backlogQuotaDefaultLimitByte instead.

**Type**: `double`

**Default**: `-1.0`

**Dynamic**: `false`

**Category**: Policies

### backlogQuotaDefaultLimitSecond
Default per-topic backlog quota limit by time in second, less than 0 means no limitation. default is -1. Increase it if you want to allow larger msg backlog

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Policies

### backlogQuotaDefaultRetentionPolicy
Default backlog quota retention policy. Default is producer_request_hold

'producer_request_hold' Policy which holds producer's send request until theresource becomes available (or holding times out)
'producer_exception' Policy which throws javax.jms.ResourceAllocationException to the producer
'consumer_backlog_eviction' Policy which evicts the oldest message from the slowest consumer's backlog

**Type**: `org.apache.pulsar.common.policies.data.BacklogQuota.RetentionPolicy`

**Default**: `producer_request_hold`

**Dynamic**: `false`

**Category**: Policies

### brokerDeduplicationEnabled
Set the default behavior for message deduplication in the broker.

This can be overridden per-namespace. If enabled, broker will reject messages that were already stored in the topic

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Policies

### brokerDeduplicationEntriesInterval
Number of entries after which a dedup info snapshot is taken.

A bigger interval will lead to less snapshots being taken though it would increase the topic recovery time, when the entries published after the snapshot need to be replayed

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Policies

### brokerDeduplicationMaxNumberOfProducers
Maximum number of producer information that it's going to be persisted for deduplication purposes

**Type**: `int`

**Default**: `10000`

**Dynamic**: `false`

**Category**: Policies

### brokerDeduplicationProducerInactivityTimeoutMinutes
Time of inactivity after which the broker will discard the deduplication information relative to a disconnected producer. Default is 6 hours.

**Type**: `int`

**Default**: `360`

**Dynamic**: `false`

**Category**: Policies

### brokerDeduplicationSnapshotFrequencyInSeconds
How often is the thread pool scheduled to check whether a snapshot needs to be taken.(disable with value 0)

**Type**: `int`

**Default**: `120`

**Dynamic**: `false`

**Category**: Policies

### brokerDeduplicationSnapshotIntervalSeconds
If this time interval is exceeded, a snapshot will be taken.It will run simultaneously with `brokerDeduplicationEntriesInterval`

**Type**: `java.lang.Integer`

**Default**: `120`

**Dynamic**: `false`

**Category**: Policies

### brokerDeleteInactivePartitionedTopicMetadataEnabled
Metadata of inactive partitioned topic will not be automatically cleaned up by default.
Note: If `allowAutoTopicCreation` and this option are enabled at the same time,
it may appear that a partitioned topic has just been deleted but is automatically created as a non-partitioned topic.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Policies

### brokerDeleteInactiveTopicsEnabled
Enable the deletion of inactive topics.
If only enable this option, will not clean the metadata of partitioned topic.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Policies

### brokerDeleteInactiveTopicsFrequencySeconds
How often to check for inactive topics

**Type**: `int`

**Default**: `60`

**Dynamic**: `true`

**Category**: Policies

### brokerDeleteInactiveTopicsMaxInactiveDurationSeconds
Max duration of topic inactivity in seconds, default is not present
If not present, 'brokerDeleteInactiveTopicsFrequencySeconds' will be used
Topics that are inactive for longer than this value will be deleted

**Type**: `java.lang.Integer`

**Default**: `null`

**Dynamic**: `true`

**Category**: Policies

### brokerDeleteInactiveTopicsMode
Set the inactive topic delete mode. Default is delete_when_no_subscriptions
'delete_when_no_subscriptions' mode only delete the topic which has no subscriptions and no active producers
'delete_when_subscriptions_caught_up' mode only delete the topic that all subscriptions has no backlogs(caught up) and no active producers/consumers

**Type**: `org.apache.pulsar.common.policies.data.InactiveTopicDeleteMode`

**Default**: `delete_when_no_subscriptions`

**Dynamic**: `true`

**Category**: Policies

### brokerMaxConnections
The maximum number of connections in the broker. If it exceeds, new connections are rejected.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Policies

### brokerMaxConnectionsPerIp
The maximum number of connections per IP. If it exceeds, new connections are rejected.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Policies

### defaultNumberOfNamespaceBundles
When a namespace is created without specifying the number of bundle, this value will be used as the default

**Type**: `int`

**Default**: `4`

**Dynamic**: `true`

**Category**: Policies

### defaultRetentionSizeInMB
Default retention size. 0 means retention is disabled. -1 means data is not removed by size quota

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Policies

### defaultRetentionTimeInMinutes
Default message retention time. 0 means retention is disabled. -1 means data is not removed by time quota

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Policies

### dispatchThrottlingOnBatchMessageEnabled
Apply dispatch rate limiting on batch message instead individual messages with in batch message. (Default is disabled)

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Policies

### dispatchThrottlingOnNonBacklogConsumerEnabled
Default dispatch-throttling is disabled for consumers which already caught-up with published messages and don't have backlog. This enables dispatch-throttling for  non-backlog consumers as well.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Policies

### dispatchThrottlingRatePerReplicatorInByte
Default number of message-bytes dispatching throttling-limit for every replicator in replication. 

Using a value of 0, is disabling replication message-byte dispatch-throttling

**Type**: `long`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### dispatchThrottlingRatePerReplicatorInMsg
Default number of message dispatching throttling-limit for every replicator in replication. 

Using a value of 0, is disabling replication message dispatch-throttling

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### dispatchThrottlingRatePerSubscriptionInByte
Default number of message-bytes dispatching throttling-limit for a subscription. 

Using a value of 0, is disabling default message-byte dispatch-throttling.

**Type**: `long`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### dispatchThrottlingRatePerSubscriptionInMsg
Default number of message dispatching throttling-limit for a subscription. 

Using a value of 0, is disabling default message dispatch-throttling.

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### dispatchThrottlingRatePerTopicInByte
Default number of message-bytes dispatching throttling-limit for every topic. 

Using a value of 0, is disabling default message-byte dispatch-throttling

**Type**: `long`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### dispatchThrottlingRatePerTopicInMsg
Default number of message dispatching throttling-limit for every topic. 

Using a value of 0, is disabling default message dispatch-throttling

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### dispatchThrottlingRateRelativeToPublishRate
Dispatch rate-limiting relative to publish rate. (Enabling flag will make broker to dynamically update dispatch-rate relatively to publish-rate: throttle-dispatch-rate = (publish-rate + configured dispatch-rate) 

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Policies

### enableBrokerSideSubscriptionPatternEvaluation
Enables evaluating subscription pattern on broker side.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Policies

### forceDeleteNamespaceAllowed
Allow forced deletion of namespaces. Default is false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Policies

### forceDeleteTenantAllowed
Allow forced deletion of tenants. Default is false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Policies

### isAllowAutoUpdateSchemaEnabled
Allow schema to be auto updated at broker level. User can override this by 'is_allow_auto_update_schema' of namespace policy. This is enabled by default.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Policies

### maxConsumerMetadataSize
Maximum size of Consumer metadata

**Type**: `int`

**Default**: `1024`

**Dynamic**: `false`

**Category**: Policies

### maxNamespacesPerTenant
The maximum number of namespaces that each tenant can create.This configuration is not precise control, in a concurrent scenario, the threshold will be exceeded

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### maxPendingPublishRequestsPerConnection
Max pending publish requests per connection to avoid keeping large number of pending requests in memory. Default: 1000

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Policies

### maxTopicsPerNamespace
Max number of topics allowed to be created in the namespace. When the topics reach the max topics of the namespace, the broker should reject the new topic request(include topic auto-created by the producer or consumer) until the number of connected consumers decrease.  Using a value of 0, is disabling maxTopicsPerNamespace-limit check.

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### maxUnackedMessagesPerBroker
Max number of unacknowledged messages allowed per broker. 

 Once this limit reaches, broker will stop dispatching messages to all shared subscription  which has higher number of unack messages until subscriptions start acknowledging messages  back and unack count reaches to `limit/2`. Using a value of 0, is disabling unackedMessage-limit check and broker doesn't block dispatchers

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Policies

### maxUnackedMessagesPerConsumer
Max number of unacknowledged messages allowed to receive messages by a consumer on a shared subscription.

 Broker will stop sending messages to consumer once, this limit reaches until consumer starts acknowledging messages back and unack count reaches to `maxUnackedMessagesPerConsumer/2`. Using a value of 0, it is disabling  unackedMessage-limit check and consumer can receive messages without any restriction

**Type**: `int`

**Default**: `50000`

**Dynamic**: `false`

**Category**: Policies

### maxUnackedMessagesPerSubscription
Max number of unacknowledged messages allowed per shared subscription. 

 Broker will stop dispatching messages to all consumers of the subscription once this  limit reaches until consumer starts acknowledging messages back and unack count reaches to `limit/2`. Using a value of 0, is disabling unackedMessage-limit check and dispatcher can dispatch messages without any restriction

**Type**: `int`

**Default**: `200000`

**Dynamic**: `false`

**Category**: Policies

### maxUnackedMessagesPerSubscriptionOnBrokerBlocked
Once broker reaches maxUnackedMessagesPerBroker limit, it blocks subscriptions which has higher  unacked messages than this percentage limit and subscription will not receive any new messages  until that subscription acks back `limit/2` messages

**Type**: `double`

**Default**: `0.16`

**Dynamic**: `false`

**Category**: Policies

### messageExpiryCheckIntervalInMinutes
How frequently to proactively check and purge expired messages

**Type**: `int`

**Default**: `5`

**Dynamic**: `false`

**Category**: Policies

### preciseTimeBasedBacklogQuotaCheck
Whether to enable precise time based backlog quota check. Enabling precise time based backlog quota check will cause broker to read first entry in backlog of the slowest cursor on a ledger which will mostly result in reading entry from BookKeeper's disk which can have negative impact on overall performance. Disabling precise time based backlog quota check will just use the timestamp indicating when a ledger was closed, which is of coarser granularity.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Policies

### resourceUsageTransportClassName
Default policy for publishing usage reports to system topic is disabled.This enables publishing of usage reports

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: Policies

### resourceUsageTransportPublishIntervalInSecs
Default interval to publish usage reports if resourceUsagePublishToTopic is enabled.

**Type**: `int`

**Default**: `60`

**Dynamic**: `true`

**Category**: Policies

### subscribeRatePeriodPerConsumerInSecond
Rate period for {subscribeThrottlingRatePerConsumer}. Default is 30s.

**Type**: `int`

**Default**: `30`

**Dynamic**: `true`

**Category**: Policies

### subscribeThrottlingRatePerConsumer
Too many subscribe requests from a consumer can cause broker rewinding consumer cursors  and loading data from bookies, hence causing high network bandwidth usage When the positive value is set, broker will throttle the subscribe requests for one consumer. Otherwise, the throttling will be disabled. The default value of this setting is 0 - throttling is disabled.

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Policies

### subscriptionBacklogScanMaxEntries
Maximum number of entries to process while scanning a subscription to calculate the accurate backlog

**Type**: `long`

**Default**: `10000`

**Dynamic**: `false`

**Category**: Policies

### subscriptionBacklogScanMaxTimeMs
Maximum time to spend while scanning a subscription to calculate the accurate backlog

**Type**: `long`

**Default**: `120000`

**Dynamic**: `false`

**Category**: Policies

### subscriptionExpirationTimeMinutes
How long to delete inactive subscriptions from last consuming. When it is 0, inactive subscriptions are not deleted automatically

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Policies

### subscriptionExpiryCheckIntervalInMinutes
How frequently to proactively check and purge expired subscription

**Type**: `int`

**Default**: `5`

**Dynamic**: `false`

**Category**: Policies

### subscriptionKeySharedConsistentHashingReplicaPoints
On KeyShared subscriptions, number of points in the consistent-hashing ring. The higher the number, the more equal the assignment of keys to consumers

**Type**: `int`

**Default**: `100`

**Dynamic**: `false`

**Category**: Policies

### subscriptionKeySharedEnable
Enable Key_Shared subscription (default is enabled).
@deprecated - use subscriptionTypesEnabled instead.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Policies

### subscriptionKeySharedUseConsistentHashing
On KeyShared subscriptions, with default AUTO_SPLIT mode, use splitting ranges or consistent hashing to reassign keys to new consumers (default is consistent hashing)

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Policies

### subscriptionPatternMaxLength
Max length of subscription pattern

**Type**: `int`

**Default**: `50`

**Dynamic**: `false`

**Category**: Policies

### subscriptionRedeliveryTrackerEnabled
Enable subscription message redelivery tracker to send redelivery count to consumer (default is enabled)

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Policies

### subscriptionTypesEnabled
Enable subscription types (default is all type enabled)

**Type**: `java.util.Set`

**Default**: `[Failover, Shared, Key_Shared, Exclusive]`

**Dynamic**: `true`

**Category**: Policies

### topicPublisherThrottlingTickTimeMillis
Tick time to schedule task that checks topic publish rate limiting across all topics  Reducing to lower value can give more accuracy while throttling publish but it uses more CPU to perform frequent check. (Disable publish throttling with value 0)

**Type**: `int`

**Default**: `10`

**Dynamic**: `true`

**Category**: Policies

### ttlDurationDefaultInSeconds
Default ttl for namespaces if ttl is not already configured at namespace policies. (disable default-ttl with value 0)

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Policies

### unblockStuckSubscriptionEnabled
Broker periodically checks if subscription is stuck and unblock if flag is enabled. (Default is disabled)

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Policies

### messagingProtocols
List of messaging protocols to load, which is a list of protocol names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Protocols

### protocolHandlerDirectory
The directory to locate messaging protocol handlers

**Type**: `java.lang.String`

**Default**: `./protocols`

**Dynamic**: `false`

**Category**: Protocols

### useSeparateThreadPoolForProtocolHandlers
Use a separate ThreadPool for each Protocol Handler

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Protocols

### brokerClientTlsEnabled
Enable TLS when talking with other brokers in the same cluster (admin operation) or different clusters (replication)

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Replication

### replicationConnectionsPerBroker
Max number of connections to open for each broker in a remote cluster.

More connections host-to-host lead to better throughput over high-latency links

**Type**: `int`

**Default**: `16`

**Dynamic**: `false`

**Category**: Replication

### replicationMetricsEnabled
Enable replication metrics

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Replication

### replicationPolicyCheckDurationSeconds
Duration to check replication policy to avoid replicator inconsistency due to missing ZooKeeper watch (disable with value 0)

**Type**: `int`

**Default**: `600`

**Dynamic**: `false`

**Category**: Replication

### replicationProducerQueueSize
Replicator producer queue size. When dynamically modified, it only takes effect for the newly added replicators

**Type**: `int`

**Default**: `1000`

**Dynamic**: `true`

**Category**: Replication

### replicatorPrefix
replicator prefix used for replicator producer name and cursor name

**Type**: `java.lang.String`

**Default**: `pulsar.repl`

**Dynamic**: `false`

**Category**: Replication

### kinitCommand
kerberos kinit command.

**Type**: `java.lang.String`

**Default**: `/usr/bin/kinit`

**Dynamic**: `false`

**Category**: SASL Authentication Provider

### saslJaasClientAllowedIds
This is a regexp, which limits the range of possible ids which can connect to the Broker using SASL.
 Default value is: ".*pulsar.*", so only clients whose id contains 'pulsar' are allowed to connect.

**Type**: `java.lang.String`

**Default**: `.*pulsar.*`

**Dynamic**: `false`

**Category**: SASL Authentication Provider

### saslJaasServerRoleTokenSignerSecretPath
Path to file containing the secret to be used to SaslRoleTokenSigner
The secret can be specified like:
saslJaasServerRoleTokenSignerSecretPath=file:///my/saslRoleTokenSignerSecret.key.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: SASL Authentication Provider

### saslJaasServerSectionName
Service Principal, for login context name. Default value is "PulsarBroker".

**Type**: `java.lang.String`

**Default**: `PulsarBroker`

**Dynamic**: `false`

**Category**: SASL Authentication Provider

### isSchemaValidationEnforced
Enforce schema validation on following cases:

 - if a producer without a schema attempts to produce to a topic with schema, the producer will be
   failed to connect. PLEASE be carefully on using this, since non-java clients don't support schema.
   if you enable this setting, it will cause non-java clients failed to produce.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Schema

### schemaCompatibilityStrategy
The schema compatibility strategy in broker level

**Type**: `org.apache.pulsar.common.policies.data.SchemaCompatibilityStrategy`

**Default**: `FULL`

**Dynamic**: `false`

**Category**: Schema

### schemaRegistryCompatibilityCheckers
The list compatibility checkers to be used in schema registry

**Type**: `java.util.Set`

**Default**: `[org.apache.pulsar.broker.service.schema.ProtobufNativeSchemaCompatibilityCheck, org.apache.pulsar.broker.service.schema.JsonSchemaCompatibilityCheck, org.apache.pulsar.broker.service.schema.AvroSchemaCompatibilityCheck]`

**Dynamic**: `false`

**Category**: Schema

### schemaRegistryStorageClassName
The schema storage implementation used by this broker

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.service.schema.BookkeeperSchemaStorageFactory`

**Dynamic**: `false`

**Category**: Schema

### systemTopicSchemaCompatibilityStrategy
The schema compatibility strategy to use for system topics

**Type**: `org.apache.pulsar.common.policies.data.SchemaCompatibilityStrategy`

**Default**: `ALWAYS_COMPATIBLE`

**Dynamic**: `false`

**Category**: Schema

### acknowledgmentAtBatchIndexLevelEnabled
Whether to enable the acknowledge of batch local index

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### advertisedAddress
Hostname or IP address the service advertises to the outside world. If not set, the value of `InetAddress.getLocalHost().getCanonicalHostName()` is used.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### advertisedListeners
Used to specify multiple advertised listeners for the broker. The value must format as <listener_name\>:pulsar://<host\>:<port\>,multiple listeners should separate with commas.Do not use this configuration with advertisedAddress and brokerServicePort.The Default value is absent means use advertisedAddress and brokerServicePort.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### allowOverrideEntryFilters
Whether allow topic level entry filters policies overrides broker configuration.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Server

### autoShrinkForConsumerPendingAcksMap
Whether to enable the automatic shrink of pendingAcks map, the default is false, which means it is not enabled. When there are a large number of share or key share consumers in the cluster, it can be enabled to reduce the memory consumption caused by pendingAcks.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### bindAddress
Hostname or IP address the service binds on

**Type**: `java.lang.String`

**Default**: `0.0.0.0`

**Dynamic**: `false`

**Category**: Server

### bindAddresses
Used to specify additional bind addresses for the broker. The value must format as <listener_name\>:<scheme\>://<host\>:<port\>, multiple bind addresses should be separated with commas. Associates each bind address with an advertised listener and protocol handler. Note that the brokerServicePort, brokerServicePortTls, webServicePort, and webServicePortTls properties define additional bindings.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### bootstrapNamespaces
A comma-separated list of namespaces to bootstrap

**Type**: `java.util.List`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Server

### brokerEntryMetadataInterceptors
List of interceptors for entry metadata.

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Server

### brokerEntryPayloadProcessors
List of interceptors for payload processing.

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Server

### brokerInterceptors
List of broker interceptor to load, which is a list of broker interceptor names

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: Server

### brokerInterceptorsDirectory
The directory to locate broker interceptors

**Type**: `java.lang.String`

**Default**: `./interceptors`

**Dynamic**: `false`

**Category**: Server

### brokerPublisherThrottlingMaxByteRate
Max Rate(in 1 seconds) of Byte allowed to publish for a broker when broker publish rate limiting enabled. (Disable byte rate limit with value 0)

**Type**: `long`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### brokerPublisherThrottlingMaxMessageRate
Max Rate(in 1 seconds) of Message allowed to publish for a broker when broker publish rate limiting enabled. (Disable message rate limit with value 0)

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### brokerPublisherThrottlingTickTimeMillis
Tick time to schedule task that checks broker publish rate limiting across all topics  Reducing to lower value can give more accuracy while throttling publish but it uses more CPU to perform frequent check. (Disable publish throttling with value 0)

**Type**: `int`

**Default**: `50`

**Dynamic**: `true`

**Category**: Server

### brokerServiceCompactionMonitorIntervalInSeconds
Interval between checks to see if topics with compaction policies need to be compacted

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Server

### brokerServiceCompactionPhaseOneLoopTimeInSeconds
Timeout for the compaction phase one loop, If the execution time of the compaction phase one loop exceeds this time, the compaction will not proceed.

**Type**: `long`

**Default**: `30`

**Dynamic**: `false`

**Category**: Server

### brokerServiceCompactionThresholdInBytes
The estimated backlog size is greater than this threshold, compression will be triggered.
Using a value of 0, is disabling compression check.

**Type**: `long`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### brokerServicePort
The port for serving binary protobuf requests. If set, defines a server binding for bindAddress:brokerServicePort. The Default value is 6650.

**Type**: `java.util.Optional`

**Default**: `Optional[6650]`

**Dynamic**: `false`

**Category**: Server

### brokerServicePortTls
The port for serving TLS-secured binary protobuf requests. If set, defines a server binding for bindAddress:brokerServicePortTls.

**Type**: `java.util.Optional`

**Default**: `Optional.empty`

**Dynamic**: `false`

**Category**: Server

### brokerShutdownTimeoutMs
Time to wait for broker graceful shutdown. After this time elapses, the process will be killed

**Type**: `long`

**Default**: `60000`

**Dynamic**: `true`

**Category**: Server

### clientLibraryVersionCheckEnabled
Enable check for minimum allowed client library version

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Server

### clusterMigrationCheckDurationSeconds
Interval between checks to see if cluster is migrated and marks topic migrated  if cluster is marked migrated. Disable with value 0. (Default disabled).

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### configurationMetadataStoreUrl
The metadata store URL for the configuration data. If empty, we fall back to use metadataStoreUrl

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### configurationMetadataSyncEventTopic
Event topic to sync configuration-metadata between separate pulsar clusters on different cloud platforms.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `true`

**Category**: Server

### delayedDeliveryEnabled
Whether to enable the delayed delivery for messages.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### delayedDeliveryFixedDelayDetectionLookahead
Size of the lookahead window to use when detecting if all the messages in the topic have a fixed delay. Default is 50,000. Setting the lookahead window to 0 will disable the logic to handle fixed delays in messages in a different way.

**Type**: `long`

**Default**: `50000`

**Dynamic**: `false`

**Category**: Server

### delayedDeliveryMaxNumBuckets
The max number of delayed message index bucket, after reaching the max buckets limitation, the adjacent buckets will be merged.

**Type**: `int`

**Default**: `50`

**Dynamic**: `false`

**Category**: Server

### delayedDeliveryMaxTimeStepPerBucketSnapshotSegmentSeconds
The delayed message index bucket time step(in seconds) in per bucket snapshot segment, after reaching the max time step limitation, the snapshot segment will be cut off.

**Type**: `long`

**Default**: `300`

**Dynamic**: `false`

**Category**: Server

### delayedDeliveryMinIndexCountPerBucket
The delayed message index bucket min index count. When the index count of the current bucket is more than this value and all message indexes of current ledger have already been added to the tracker we will seal the bucket.

**Type**: `long`

**Default**: `50000`

**Dynamic**: `false`

**Category**: Server

### delayedDeliverySharedIndexEnabled
Enable share the delayed message index across subscriptions

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### delayedDeliveryTickTimeMillis
Control the tick time for when retrying on delayed delivery, affecting the accuracy of the delivery time compared to the scheduled time. Default is 1 second. Note that this time is used to configure the HashedWheelTimer's tick time for the InMemoryDelayedDeliveryTrackerFactory.

**Type**: `long`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Server

### delayedDeliveryTrackerFactoryClassName
Class name of the factory that implements the delayed deliver tracker.
If value is "org.apache.pulsar.broker.delayed.BucketDelayedDeliveryTrackerFactory", will create bucket based delayed message index tracker.


**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.delayed.InMemoryDelayedDeliveryTrackerFactory`

**Dynamic**: `false`

**Category**: Server

### disableBrokerInterceptors
Enable or disable the broker interceptor, which is only used for testing for now

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### dispatchThrottlingForFilteredEntriesEnabled
Whether the broker should count filtered entries in dispatch rate limit calculations. When disabled, only messages sent to a consumer count towards a dispatch rate limit at the broker, topic, and subscription level. When enabled, messages filtered out due to entry filter logic are counted towards each relevant rate limit.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### dispatchThrottlingRateInByte
Default bytes per second dispatch throttling-limit for whole broker. Using a value of 0, is disabling default message-byte dispatch-throttling

**Type**: `long`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### dispatchThrottlingRateInMsg
Default messages per second dispatch throttling-limit for whole broker. Using a value of 0, is disabling default message-byte dispatch-throttling

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### dispatcherDispatchMessagesInSubscriptionThread
Dispatch messages and execute broker side filters in a per-subscription thread

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Server

### dispatcherEntryFilterRescheduledMessageDelay
Time in milliseconds to delay the new delivery of a message when an EntryFilter returns RESCHEDULE.

**Type**: `int`

**Default**: `1000`

**Dynamic**: `true`

**Category**: Server

### dispatcherMaxReadBatchSize
Max number of entries to read from bookkeeper. By default it is 100 entries.

**Type**: `int`

**Default**: `100`

**Dynamic**: `true`

**Category**: Server

### dispatcherMaxReadSizeBytes
Max size in bytes of entries to read from bookkeeper. By default it is 5MB.

**Type**: `int`

**Default**: `5242880`

**Dynamic**: `true`

**Category**: Server

### dispatcherMaxRoundRobinBatchSize
Max number of entries to dispatch for a shared subscription. By default it is 20 entries.

**Type**: `int`

**Default**: `20`

**Dynamic**: `true`

**Category**: Server

### dispatcherMinReadBatchSize
Min number of entries to read from bookkeeper. By default it is 1 entries.When there is an error occurred on reading entries from bookkeeper, the broker will backoff the batch size to this minimum number.

**Type**: `int`

**Default**: `1`

**Dynamic**: `true`

**Category**: Server

### dispatcherReadFailureBackoffInitialTimeInMs
The read failure backoff initial time in milliseconds. By default it is 15s.

**Type**: `int`

**Default**: `15000`

**Dynamic**: `true`

**Category**: Server

### dispatcherReadFailureBackoffMandatoryStopTimeInMs
The read failure backoff mandatory stop time in milliseconds. By default it is 0s.

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### dispatcherReadFailureBackoffMaxTimeInMs
The read failure backoff max time in milliseconds. By default it is 60s.

**Type**: `int`

**Default**: `60000`

**Dynamic**: `true`

**Category**: Server

### enableBusyWait
Option to enable busy-wait settings. Default is false. WARNING: This option will enable spin-waiting on executors and IO threads in order to reduce latency during context switches. The spinning will consume 100% CPU even when the broker is not doing any work. It is recommended to reduce the number of IO threads and BK client threads to only have few CPU cores busy.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### enableNamespaceIsolationUpdateOnTime
Enable namespaceIsolation policy update take effect ontime or not, if set to ture, then the related namespaces will be unloaded after reset policy to make it take effect.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### enableNonPersistentTopics
Enable broker to load non-persistent topics

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### enablePersistentTopics
Enable broker to load persistent topics

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### enableReplicatedSubscriptions
Enable tracking of replicated subscriptions state across clusters.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### enableRunBookieAutoRecoveryTogether
Enable to run bookie autorecovery along with broker

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### enableRunBookieTogether
Enable to run bookie along with broker

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### encryptionRequireOnProducer
Enforce producer to publish encrypted messages.(default disable).

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### entryFilterNames
 Class name of pluggable entry filter that decides whether the entry needs to be filtered.You can use this class to decide which entries can be sent to consumers.Multiple names need to be separated by commas.

**Type**: `java.util.List`

**Default**: `[]`

**Dynamic**: `true`

**Category**: Server

### entryFiltersDirectory
 The directory for all the entry filter implementations.

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `true`

**Category**: Server

### exposingBrokerEntryMetadataToClientEnabled
Enable or disable exposing broker entry metadata to client.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### failureDomainsEnabled
Enable cluster's failure-domain which can distribute brokers into logical region

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Server

### haProxyProtocolEnabled
Enable or disable the proxy protocol.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### httpServerAcceptQueueSize
Capacity for accept queue in the HTTP server Default is set to 8192.

**Type**: `int`

**Default**: `8192`

**Dynamic**: `false`

**Category**: Server

### httpServerThreadPoolQueueSize
Capacity for thread pool queue in the HTTP server Default is set to 8192.

**Type**: `int`

**Default**: `8192`

**Dynamic**: `false`

**Category**: Server

### internalListenerName
Used to specify the internal listener name for the broker.The listener name must contain in the advertisedListeners.The Default value is absent, the broker uses the first listener as the internal listener.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### isDelayedDeliveryDeliverAtTimeStrict
When using the InMemoryDelayedDeliveryTrackerFactory (the default DelayedDeliverTrackerFactory), whether the deliverAt time is strictly followed. When false (default), messages may be sent to consumers before the deliverAt time by as much as the tickTimeMillis. This can reduce the overhead on the broker of maintaining the delayed index for a potentially very short time period. When true, messages will not be sent to consumer until the deliverAt time has passed, and they may be as late as the deliverAt time plus the tickTimeMillis for the topic plus the delayedDeliveryTickTimeMillis.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### keepAliveIntervalSeconds
How often to check pulsar connection is still alive

**Type**: `int`

**Default**: `30`

**Dynamic**: `false`

**Category**: Server

### lazyCursorRecovery
Whether to recover cursors lazily when trying to recover a managed ledger backing a persistent topic. It can improve write availability of topics.
The caveat is now when recovered ledger is ready to write we're not sure if all old consumers last mark delete position can be recovered or not.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### maxConcurrentHttpRequests
Max concurrent web requests

**Type**: `int`

**Default**: `1024`

**Dynamic**: `false`

**Category**: Server

### maxConcurrentLookupRequest
Max number of concurrent lookup request broker allows to throttle heavy incoming lookup traffic

**Type**: `int`

**Default**: `50000`

**Dynamic**: `true`

**Category**: Server

### maxConcurrentNonPersistentMessagePerConnection
Max concurrent non-persistent message can be processed per connection

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Server

### maxConcurrentTopicLoadRequest
Max number of concurrent topic loading request broker allows to control number of zk-operations

**Type**: `int`

**Default**: `5000`

**Dynamic**: `true`

**Category**: Server

### maxConsumersPerSubscription
Max number of consumers allowed to connect to subscription. 

Once this limit reaches, Broker will reject new consumers until the number of connected consumers decrease. Using a value of 0, is disabling maxConsumersPerSubscription-limit check.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### maxConsumersPerTopic
Max number of consumers allowed to connect to topic. 

Once this limit reaches, Broker will reject new consumers until the number of connected consumers decrease. Using a value of 0, is disabling maxConsumersPerTopic-limit check.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### maxHttpServerConnections
Maximum number of inbound http connections. (0 to disable limiting)

**Type**: `int`

**Default**: `2048`

**Dynamic**: `false`

**Category**: Server

### maxMessagePublishBufferSizeInMB
Max memory size for broker handling messages sending from producers.

 If the processing message size exceed this value, broker will stop read data from the connection. The processing messages means messages are sends to broker but broker have not send response to client, usually waiting to write to bookies.

 It's shared across all the topics running in the same broker.

 Use -1 to disable the memory limitation. Default is 1/2 of direct memory.



**Type**: `int`

**Default**: `868`

**Dynamic**: `true`

**Category**: Server

### maxMessageSize
Max size of messages.

**Type**: `int`

**Default**: `5242880`

**Dynamic**: `false`

**Category**: Server

### maxNumPartitionsPerPartitionedTopic
The number of partitions per partitioned topic.
If try to create or update partitioned topics by exceeded number of partitions, then fail.

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### maxProducersPerTopic
Max number of producers allowed to connect to topic. 

Once this limit reaches, Broker will reject new producers until the number of connected producers decrease. Using a value of 0, is disabling maxProducersPerTopic-limit check.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### maxPublishRatePerTopicInBytes
Max Rate(in 1 seconds) of Byte allowed to publish for a topic when topic publish rate limiting enabled. (Disable byte rate limit with value 0)

**Type**: `long`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### maxPublishRatePerTopicInMessages
Max Rate(in 1 seconds) of Message allowed to publish for a topic when topic publish rate limiting enabled. (Disable byte rate limit with value 0)

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### maxSameAddressConsumersPerTopic
Max number of consumers with the same IP address allowed to connect to topic. 

Once this limit reaches, Broker will reject new consumers until the number of connected consumers with the same IP address decrease. Using a value of 0, is disabling maxSameAddressConsumersPerTopic-limit check.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### maxSameAddressProducersPerTopic
Max number of producers with the same IP address allowed to connect to topic. 

Once this limit reaches, Broker will reject new producers until the number of connected producers with the same IP address decrease. Using a value of 0, is disabling maxSameAddressProducersPerTopic-limit check.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### maxSubscriptionsPerTopic
Max number of subscriptions allowed to subscribe to topic. 

Once this limit reaches,  broker will reject new subscription until the number of subscribed subscriptions decrease.
 Using a value of 0, is disabling maxSubscriptionsPerTopic limit check.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### maxTenants
The maximum number of tenants that each pulsar cluster can create.This configuration is not precise control, in a concurrent scenario, the threshold will be exceeded.

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Server

### messagePublishBufferCheckIntervalInMillis
Interval between checks to see if message publish buffer size is exceed the max message publish buffer size

**Type**: `int`

**Default**: `100`

**Dynamic**: `false`

**Category**: Server

### metadataStoreBatchingEnabled
Whether we should enable metadata operations batching

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### metadataStoreBatchingMaxDelayMillis
Maximum delay to impose on batching grouping

**Type**: `int`

**Default**: `5`

**Dynamic**: `false`

**Category**: Server

### metadataStoreBatchingMaxOperations
Maximum number of operations to include in a singular batch

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Server

### metadataStoreBatchingMaxSizeKb
Maximum size of a batch

**Type**: `int`

**Default**: `128`

**Dynamic**: `false`

**Category**: Server

### metadataStoreCacheExpirySeconds
Metadata store cache expiry time in seconds.

**Type**: `int`

**Default**: `300`

**Dynamic**: `false`

**Category**: Server

### metadataStoreConfigPath
Configuration file path for local metadata store. It's supported by RocksdbMetadataStore for now.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### metadataStoreOperationTimeoutSeconds
Metadata store operation timeout in seconds.

**Type**: `int`

**Default**: `30`

**Dynamic**: `false`

**Category**: Server

### metadataStoreSessionTimeoutMillis
Metadata store session timeout in milliseconds.

**Type**: `long`

**Default**: `30000`

**Dynamic**: `false`

**Category**: Server

### metadataStoreUrl
The metadata store URL. 
 Examples: 
  * zk:my-zk-1:2181,my-zk-2:2181,my-zk-3:2181
  * my-zk-1:2181,my-zk-2:2181,my-zk-3:2181 (will default to ZooKeeper when the schema is not specified)
  * zk:my-zk-1:2181,my-zk-2:2181,my-zk-3:2181/my-chroot-path (to add a ZK chroot path)


**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### metadataSyncEventTopic
Event topic to sync metadata between separate pulsar clusters on different cloud platforms.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `true`

**Category**: Server

### numAcceptorThreads
Number of threads to use for Netty Acceptor. Default is set to `1`

**Type**: `int`

**Default**: `1`

**Dynamic**: `false`

**Category**: Server

### numCacheExecutorThreadPoolSize
Number of thread pool size to use for pulsar zookeeper callback service.The cache executor thread pool is used for restarting global zookeeper session. Default is 10

**Type**: `int`

**Default**: `10`

**Dynamic**: `false`

**Category**: Server

### numExecutorThreadPoolSize
Number of threads to use for pulsar broker service. The executor in thread pool will do basic broker operation like load/unload bundle, update managedLedgerConfig, update topic/subscription/replicator message dispatch rate, do leader election etc. Default is set to 20 

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Server

### numHttpServerThreads
Number of threads to use for HTTP requests processing Default is set to `2 * Runtime.getRuntime().availableProcessors()`

**Type**: `int`

**Default**: `8`

**Dynamic**: `false`

**Category**: Server

### numIOThreads
Number of threads to use for Netty IO. Default is set to `2 * Runtime.getRuntime().availableProcessors()`

**Type**: `int`

**Default**: `4`

**Dynamic**: `false`

**Category**: Server

### numOrderedExecutorThreads
Number of threads to use for orderedExecutor. The ordered executor is used to operate with zookeeper, such as init zookeeper client, get namespace policies from zookeeper etc. It also used to split bundle. Default is 8

**Type**: `int`

**Default**: `8`

**Dynamic**: `false`

**Category**: Server

### numWorkerThreadsForNonPersistentTopic
Number of worker threads to serve non-persistent topic

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Server

### preciseDispatcherFlowControl
Precise dispatcher flow control according to history message number of each entry

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Server

### preciseTopicPublishRateLimiterEnable
Enable precise rate limit for topic publish

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### preferLaterVersions
If true, (and ModularLoadManagerImpl is being used), the load manager will attempt to use only brokers running the latest software version (to minimize impact to bundles)

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Server

### replicatedSubscriptionsSnapshotFrequencyMillis
Frequency of snapshots for replicated subscriptions tracking.

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Server

### replicatedSubscriptionsSnapshotMaxCachedPerSubscription
Max number of snapshot to be cached per subscription.

**Type**: `int`

**Default**: `10`

**Dynamic**: `false`

**Category**: Server

### replicatedSubscriptionsSnapshotTimeoutSeconds
Timeout for building a consistent snapshot for tracking replicated subscriptions state. 

**Type**: `int`

**Default**: `30`

**Dynamic**: `false`

**Category**: Server

### retentionCheckIntervalInSeconds
Check between intervals to see if consumed ledgers need to be trimmed

**Type**: `int`

**Default**: `120`

**Dynamic**: `false`

**Category**: Server

### skipBrokerShutdownOnOOM
Flag to skip broker shutdown when broker handles Out of memory error

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Server

### statusFilePath
Path for the file used to determine the rotation status for the broker when responding to service discovery health checks

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### streamingDispatch
Whether to use streaming read dispatcher. Currently is in preview and can be changed in subsequent release.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### strictBookieAffinityEnabled
Enable or disable strict bookie affinity.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Server

### systemTopicEnabled
Enable or disable system topic.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### topicFencingTimeoutSeconds
If a topic remains fenced for this number of seconds, it will be closed forcefully.
 If it is set to 0 or a negative number, the fenced topic will not be closed.

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Server

### topicLevelPoliciesEnabled
Enable or disable topic level policies, topic level policies depends on the system topic, please enable the system topic first.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Server

### topicLoadTimeoutSeconds
Amount of seconds to timeout when loading a topic. In situations with many geo-replicated clusters, this may need raised.

**Type**: `long`

**Default**: `60`

**Dynamic**: `false`

**Category**: Server

### transactionLogBatchedWriteEnabled
Provide a mechanism allowing the Transaction Log Store to aggregate multiple records into a batched record and persist into a single BK entry. This will make Pulsar transactions work more efficiently, aka batched log. see: https://github.com/apache/pulsar/issues/15370. Default false

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Server

### transactionLogBatchedWriteMaxDelayInMillis
If enabled the feature that transaction log batch, this attribute means maximum wait time(in millis) for the first record in a batch, default 1 millisecond.

**Type**: `int`

**Default**: `1`

**Dynamic**: `false`

**Category**: Server

### transactionLogBatchedWriteMaxRecords
If enabled the feature that transaction log batch, this attribute means maximum log records count in a batch, default 512.

**Type**: `int`

**Default**: `512`

**Dynamic**: `false`

**Category**: Server

### transactionLogBatchedWriteMaxSize
If enabled the feature that transaction log batch, this attribute means bytes size in a batch, default 4m.

**Type**: `int`

**Default**: `4194304`

**Dynamic**: `false`

**Category**: Server

### transactionPendingAckBatchedWriteEnabled
Provide a mechanism allowing the transaction pending ack Log Store to aggregate multiple records into a batched record and persist into a single BK entry. This will make Pulsar transactions work more efficiently, aka batched log. see: https://github.com/apache/pulsar/issues/15370. Default false.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Server

### transactionPendingAckBatchedWriteMaxDelayInMillis
If enabled the feature that transaction pending ack log batch, this attribute means maximum wait time(in millis) for the first record in a batch, default 1 millisecond.

**Type**: `int`

**Default**: `1`

**Dynamic**: `false`

**Category**: Server

### transactionPendingAckBatchedWriteMaxRecords
If enabled the feature that transaction log batch, this attribute means maximum log records count in a batch, default 512.

**Type**: `int`

**Default**: `512`

**Dynamic**: `false`

**Category**: Server

### transactionPendingAckBatchedWriteMaxSize
If enabled the feature that transaction pending ack log batch, this attribute means bytes size in a batch, default 4m.

**Type**: `int`

**Default**: `4194304`

**Dynamic**: `false`

**Category**: Server

### webServicePort
The port for serving http requests

**Type**: `java.util.Optional`

**Default**: `Optional[8080]`

**Dynamic**: `false`

**Category**: Server

### webServicePortTls
The port for serving https requests

**Type**: `java.util.Optional`

**Default**: `Optional.empty`

**Dynamic**: `false`

**Category**: Server

### webServiceTlsProvider
Specify the TLS provider for the web service: SunJSSE, Conscrypt and etc.

**Type**: `java.lang.String`

**Default**: `Conscrypt`

**Dynamic**: `false`

**Category**: Server

### bookkeeperClientAuthenticationParameters
Parameters for bookkeeper auth plugin

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientAuthenticationParametersName
BookKeeper auth plugin implementation specifics parameters name and values

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientAuthenticationPlugin
Authentication plugin to use when connecting to bookies

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientEnforceMinNumRacksPerWriteQuorum
Enforces rack-aware bookie selection policy to pick bookies from 'bookkeeperClientMinNumRacksPerWriteQuorum' racks for  a writeQuorum. 

If BK can't find bookie then it would throw BKNotEnoughBookiesException instead of picking random one.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientExposeStatsToPrometheus
whether expose managed ledger client stats to prometheus

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientGetBookieInfoIntervalSeconds
Set the interval to periodically check bookie info

**Type**: `int`

**Default**: `86400`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientGetBookieInfoRetryIntervalSeconds
Set the interval to retry a failed bookie info lookup

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientHealthCheckEnabled
Enable bookies health check. 

 Bookies that have more than the configured number of failure within the interval will be quarantined for some time. During this period, new ledgers won't be created on these bookies

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientHealthCheckErrorThresholdPerInterval
Bookies health check error threshold per check interval

**Type**: `long`

**Default**: `5`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientHealthCheckIntervalSeconds
Bookies health check interval in seconds

**Type**: `long`

**Default**: `60`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientHealthCheckQuarantineTimeInSeconds
Bookie health check quarantined time in seconds

**Type**: `long`

**Default**: `1800`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientIsolationGroups
Enable bookie isolation by specifying a list of bookie groups to choose from. 

Any bookie outside the specified groups will not be used by the broker

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientLimitStatsLogging
whether limit per_channel_bookie_client metrics of bookkeeper client stats

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientMinNumRacksPerWriteQuorum
Minimum number of racks per write quorum. 

BK rack-aware bookie selection policy will try to get bookies from at least 'bookkeeperClientMinNumRacksPerWriteQuorum' racks for a write quorum.

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientNumIoThreads
Number of BookKeeper client IO threads. Default is Runtime.getRuntime().availableProcessors() * 2

**Type**: `int`

**Default**: `4`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientNumWorkerThreads
Number of BookKeeper client worker threads. Default is Runtime.getRuntime().availableProcessors()

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientQuarantineRatio
bookie quarantine ratio to avoid all clients quarantine the high pressure bookie servers at the same time

**Type**: `double`

**Default**: `1.0`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientRackawarePolicyEnabled
Enable rack-aware bookie selection policy. 

BK will chose bookies from different racks when forming a new bookie ensemble

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientRegionawarePolicyEnabled
Enable region-aware bookie selection policy. 

BK will chose bookies from different regions and racks when forming a new bookie ensemble

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientReorderReadSequenceEnabled
Enable/disable reordering read sequence on reading entries

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientSecondaryIsolationGroups
Enable bookie secondary-isolation group if bookkeeperClientIsolationGroups doesn't have enough bookie available.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientSeparatedIoThreadsEnabled
Use separated IO threads for BookKeeper client. Default is false, which will use Pulsar IO threads

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientSpeculativeReadTimeoutInMillis
Speculative reads are initiated if a read request doesn't complete within a certain time Using a value of 0, is disabling the speculative reads

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientThrottleValue
Throttle value for bookkeeper client

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperClientTimeoutInSeconds
Timeout for BK add / read operations

**Type**: `long`

**Default**: `30`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperDiskWeightBasedPlacementEnabled
Enable/disable disk weight based placement. Default is false

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperEnableStickyReads
Enable/disable having read operations for a ledger to be sticky to a single bookie.
If this flag is enabled, the client will use one single bookie (by preference) to read all entries for a ledger.

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperExplicitLacIntervalInMills
Set the interval to check the need for sending an explicit LAC

**Type**: `int`

**Default**: `0`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperMetadataServiceUri
Metadata service uri that bookkeeper is used for loading corresponding metadata driver and resolving its metadata service location

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperNumberOfChannelsPerBookie
Number of channels per bookie

**Type**: `int`

**Default**: `16`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSCertificateFilePath
Path for the TLS certificate file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSClientAuthentication
Enable tls authentication with bookie

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSKeyFilePath
Path for the TLS private key file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSKeyFileType
Supported type: PEM, JKS, PKCS12. Default value: PEM

**Type**: `java.lang.String`

**Default**: `PEM`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSKeyStorePasswordPath
Path to file containing keystore password, if the client keystore is password protected.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSProviderFactoryClass
Set the client security provider factory class name. Default: org.apache.bookkeeper.tls.TLSContextFactory

**Type**: `java.lang.String`

**Default**: `org.apache.bookkeeper.tls.TLSContextFactory`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSTrustCertTypes
Supported type: PEM, JKS, PKCS12. Default value: PEM

**Type**: `java.lang.String`

**Default**: `PEM`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSTrustCertsFilePath
Path for the trusted TLS certificate file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTLSTrustStorePasswordPath
Path to file containing truststore password, if the client truststore is password protected.

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperTlsCertFilesRefreshDurationSeconds
Tls cert refresh duration at bookKeeper-client in seconds (0 to disable check)

**Type**: `int`

**Default**: `300`

**Dynamic**: `false`

**Category**: Storage (BookKeeper)

### bookkeeperUseV2WireProtocol
Use older Bookkeeper wire protocol with bookie

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Storage (BookKeeper)

### managedLedgerOffloadAutoTriggerSizeThresholdBytes
The number of bytes before triggering automatic offload to long term storage

**Type**: `long`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### managedLedgerOffloadDeletionLagMs
Delay between a ledger being successfully offloaded to long term storage, and the ledger being deleted from bookkeeper

**Type**: `long`

**Default**: `14400000`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### managedLedgerOffloadDriver
Driver to use to offload old data to long term storage

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### managedLedgerOffloadMaxThreads
Maximum number of thread pool threads for ledger offloading

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### managedLedgerOffloadPrefetchRounds
Maximum prefetch rounds for ledger reading for offloading

**Type**: `int`

**Default**: `1`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### managedLedgerOffloadThresholdInSeconds
The threshold to triggering automatic offload to long term storage

**Type**: `long`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### managedLedgerUnackedRangesOpenCacheSetEnabled
Use Open Range-Set to cache unacked messages (it is memory efficient but it can take more cpu)

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### narExtractionDirectory
The directory where nar Extraction of offloaders happens

**Type**: `java.lang.String`

**Default**: `/tmp`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### offloadersDirectory
The directory to locate offloaders

**Type**: `java.lang.String`

**Default**: `./offloaders`

**Dynamic**: `false`

**Category**: Storage (Ledger Offloading)

### allowAutoSubscriptionCreation
Allow automated creation of subscriptions if set to true (default value).

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### allowAutoTopicCreation
Allow automated creation of topics if set to true (default value).

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### allowAutoTopicCreationType
The type of topic that is allowed to be automatically created.(partitioned/non-partitioned)

**Type**: `org.apache.pulsar.common.policies.data.TopicType`

**Default**: `non-partitioned`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### autoSkipNonRecoverableData
Skip reading non-recoverable/unreadable data-ledger under managed-ledger's list.

 It helps when data-ledgers gets corrupted at bookkeeper and managed-cursor is stuck at that ledger.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### cacheEvictionByMarkDeletedPosition
Evicting cache data by the slowest markDeletedPosition or readPosition. The default is to evict through readPosition.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### defaultNumPartitions
The number of partitioned topics that is allowed to be automatically createdif allowAutoTopicCreationType is partitioned.

**Type**: `int`

**Default**: `1`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### managedCursorInfoCompressionType
ManagedCursorInfo compression type, option values (NONE, LZ4, ZLIB, ZSTD, SNAPPY). 
If value is NONE, then save the ManagedCursorInfo bytes data directly.

**Type**: `java.lang.String`

**Default**: `NONE`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerAddEntryTimeoutSeconds
Add entry timeout when broker tries to publish message to bookkeeper.(0 to disable it)

**Type**: `long`

**Default**: `0`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerCacheCopyEntries
Whether we should make a copy of the entry payloads when inserting in cache

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerCacheEvictionFrequency
Configure the cache eviction frequency for the managed ledger cache.

**Type**: `double`

**Default**: `0.0`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerCacheEvictionIntervalMs
Configure the cache eviction interval in milliseconds for the managed ledger cache, default is 10ms

**Type**: `long`

**Default**: `10`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerCacheEvictionTimeThresholdMillis
All entries that have stayed in cache for more than the configured time, will be evicted

**Type**: `long`

**Default**: `1000`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### managedLedgerCacheEvictionWatermark
Threshold to which bring down the cache level when eviction is triggered

**Type**: `double`

**Default**: `0.9`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### managedLedgerCacheSizeMB
Amount of memory to use for caching data payload in managed ledger. 

This memory is allocated from JVM direct memory and it's shared across all the topics running in the same broker. By default, uses 1/5th of available direct memory

**Type**: `int`

**Default**: `347`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### managedLedgerCursorBackloggedThreshold
Configure the threshold (in number of entries) from where a cursor should be considered 'backlogged' and thus should be set as inactive.

**Type**: `long`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerCursorMaxEntriesPerLedger
Max number of entries to append to a cursor ledger

**Type**: `int`

**Default**: `50000`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerCursorPositionFlushSeconds
How frequently to flush the cursor positions that were accumulated due to rate limiting. (seconds). Default is 60 seconds

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerCursorRolloverTimeInSeconds
Max time before triggering a rollover on a cursor ledger

**Type**: `int`

**Default**: `14400`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerDataReadPriority
Read priority when ledgers exists in both bookkeeper and the second layer storage.

**Type**: `java.lang.String`

**Default**: `tiered-storage-first`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerDefaultAckQuorum
Ack quorum (Qa) size, Number of guaranteed copies (acks to wait for before a write is considered completed)

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerDefaultEnsembleSize
Ensemble (E) size, Number of bookies to use for storing entries in a ledger.
Please notice that sticky reads enabled by bookkeeperEnableStickyReads=true aren’t used  unless ensemble size (E) equals write quorum (Qw) size.

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerDefaultMarkDeleteRateLimit
Rate limit the amount of writes per second generated by consumer acking the messages

**Type**: `double`

**Default**: `1.0`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerDefaultWriteQuorum
Write quorum (Qw) size, Replication factor for storing entries (messages) in a ledger.

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerDigestType
Default type of checksum to use when writing to BookKeeper. 

Default is `CRC32C`. Other possible options are `CRC32`, `MAC` or `DUMMY` (no checksum).

**Type**: `org.apache.bookkeeper.client.api.DigestType`

**Default**: `CRC32C`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerInactiveLedgerRolloverTimeSeconds
Time to rollover ledger for inactive topic (duration without any publish on that topic). Disable rollover with value 0 (Default value 0)

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### managedLedgerInfoCompressionType
ManagedLedgerInfo compression type, option values (NONE, LZ4, ZLIB, ZSTD, SNAPPY). 
If value is invalid or NONE, then save the ManagedLedgerInfo bytes data directly.

**Type**: `java.lang.String`

**Default**: `NONE`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxAckQuorum
Max number of guaranteed copies (acks to wait before write is complete)

**Type**: `int`

**Default**: `5`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxBacklogBetweenCursorsForCaching
Maximum backlog entry difference to prevent caching entries that can't be reused

**Type**: `int`

**Default**: `1000`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxEnsembleSize
Max number of bookies to use when creating a ledger

**Type**: `int`

**Default**: `5`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxEntriesPerLedger
Max number of entries to append to a ledger before triggering a rollover.

A ledger rollover is triggered after the min rollover time has passed and one of the following conditions is true: the max rollover time has been reached, the max entries have been written to the ledger, or the max ledger size has been written to the ledger

**Type**: `int`

**Default**: `50000`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxLedgerRolloverTimeMinutes
Maximum time before forcing a ledger rollover for a topic

**Type**: `int`

**Default**: `240`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxReadsInFlightSizeInMB
Maximum buffer size for bytes read from storage. This is the memory retained by data read from storage (or cache) until it has been delivered to the Consumer Netty channel. Use O to disable

**Type**: `long`

**Default**: `0`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxSizePerLedgerMbytes
Maximum ledger size before triggering a rollover for a topic (MB)

**Type**: `int`

**Default**: `2048`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxUnackedRangesToPersist
Max number of `acknowledgment holes` that are going to be persistently stored.

When acknowledging out of order, a consumer will leave holes that are supposed to be quickly filled by acking all the messages. The information of which messages are acknowledged is persisted by compressing in `ranges` of messages that were acknowledged. After the max number of ranges is reached, the information will only be tracked in memory and messages will be redelivered in case of crashes.

**Type**: `int`

**Default**: `10000`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxUnackedRangesToPersistInMetadataStore
Max number of `acknowledgment holes` that can be stored in MetadataStore.

If number of unack message range is higher than this limit then broker will persist unacked ranges into bookkeeper to avoid additional data overhead into MetadataStore.

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMaxWriteQuorum
Max number of copies to store for each message

**Type**: `int`

**Default**: `5`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMetadataOperationsTimeoutSeconds
operation timeout while updating managed-ledger metadata.

**Type**: `long`

**Default**: `60`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMinLedgerRolloverTimeMinutes
Minimum time between ledger rollover for a topic

**Type**: `int`

**Default**: `10`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerMinimumBacklogCursorsForCaching
Minimum cursors that must be in backlog state to cache and reuse the read entries.(Default =0 to disable backlog reach cache)

**Type**: `int`

**Default**: `0`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### managedLedgerMinimumBacklogEntriesForCaching
Minimum backlog entries for any cursor before start caching reads

**Type**: `int`

**Default**: `1000`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### managedLedgerNewEntriesCheckDelayInMillis
New entries check delay for the cursor under the managed ledger. 
If no new messages in the topic, the cursor will try to check again after the delay time. 
For consumption latency sensitive scenario, can set to a smaller value or set to 0.
Of course, this may degrade consumption throughput. Default is 10ms.

**Type**: `int`

**Default**: `10`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerNumSchedulerThreads
Number of threads to be used for managed ledger scheduled tasks

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerPassword
Default  password to use when writing to BookKeeper. 

Default is ``.

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerPrometheusStatsLatencyRolloverSeconds
Managed ledger prometheus stats latency rollover seconds

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerReadEntryTimeoutSeconds
Read entries timeout when broker tries to read messages from bookkeeper (0 to disable it)

**Type**: `long`

**Default**: `0`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerStatsPeriodSeconds
How frequently to refresh the stats. (seconds). Default is 60 seconds

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerStorageClassName
The class of the managed ledger storage

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.ManagedLedgerClientFactory`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### managedLedgerTraceTaskExecution
Whether trace managed ledger task execution time

**Type**: `boolean`

**Default**: `true`

**Dynamic**: `true`

**Category**: Storage (Managed Ledger)

### persistentUnackedRangesWithMultipleEntriesEnabled
If enabled, the maximum "acknowledgment holes" will not be limited and "acknowledgment holes" are stored in multiple entries.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)

### tlsAllowInsecureConnection
Accept untrusted TLS certificate from client

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: TLS

### tlsCertRefreshCheckDurationSec
Tls cert refresh duration in seconds (set 0 to check on every new connection)

**Type**: `long`

**Default**: `300`

**Dynamic**: `false`

**Category**: TLS

### tlsCertificateFilePath
Path for the TLS certificate file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: TLS

### tlsCiphers
Specify the tls cipher the broker will use to negotiate during TLS Handshake.

Example:- [TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: TLS

### tlsEnabled
Enable TLS

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: TLS

### tlsKeyFilePath
Path for the TLS private key file

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: TLS

### tlsProtocols
Specify the tls protocols the broker will use to negotiate during TLS Handshake.

Example:- [TLSv1.3, TLSv1.2]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: TLS

### tlsRequireTrustedClientCertOnConnect
Specify whether Client certificates are required for TLS Reject.
the Connection if the Client Certificate is not trusted

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: TLS

### tlsTrustCertsFilePath
Path for the trusted TLS certificate file

**Type**: `java.lang.String`

**Default**: ``

**Dynamic**: `false`

**Category**: TLS

### webServiceTlsCiphers
Specify the tls cipher the proxy's web service will use to negotiate during TLS Handshake.

Example:- [TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: TLS

### webServiceTlsProtocols
Specify the tls protocols the proxy's web service will use to negotiate during TLS Handshake.

Example:- [TLSv1.3, TLSv1.2]

**Type**: `java.util.Set`

**Default**: `[]`

**Dynamic**: `false`

**Category**: TLS

### maxActiveTransactionsPerCoordinator
The max active transactions per transaction coordinator, default value 0 indicates no limit.

**Type**: `long`

**Default**: `0`

**Dynamic**: `false`

**Category**: Transaction

### numTransactionReplayThreadPoolSize
Number of threads to use for pulsar transaction replay PendingAckStore or TransactionBuffer.Default is 5

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: Transaction

### transactionBufferClientMaxConcurrentRequests
The max concurrent requests for transaction buffer client.

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Transaction

### transactionBufferClientOperationTimeoutInMills
The transaction buffer client's operation timeout in milliseconds.

**Type**: `long`

**Default**: `3000`

**Dynamic**: `false`

**Category**: Transaction

### transactionBufferProviderClassName
Class name for transaction buffer provider

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.transaction.buffer.impl.TopicTransactionBufferProvider`

**Dynamic**: `false`

**Category**: Transaction

### transactionBufferSegmentedSnapshotEnabled
Whether to enable segmented transaction buffer snapshot to handle a large number of aborted transactions.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Transaction

### transactionBufferSnapshotMaxTransactionCount
Transaction buffer take snapshot transaction countIf transaction buffer enables snapshot segment, transaction buffer updates snapshot metadataafter the number of transaction operations reaches this value.

**Type**: `int`

**Default**: `1000`

**Dynamic**: `false`

**Category**: Transaction

### transactionBufferSnapshotMinTimeInMillis
The interval time for transaction buffer to take snapshots.If transaction buffer enables snapshot segment, it is the interval time for transaction buffer to update snapshot metadata.

**Type**: `int`

**Default**: `5000`

**Dynamic**: `false`

**Category**: Transaction

### transactionBufferSnapshotSegmentSize
Transaction buffer stores the transaction ID of aborted transactions and takes snapshots.This configuration determines the size of the snapshot segment. The default value is 256 KB (262144 bytes).

**Type**: `int`

**Default**: `262144`

**Dynamic**: `false`

**Category**: Transaction

### transactionCoordinatorEnabled
Enable transaction coordinator in broker

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Transaction

### transactionMetadataStoreProviderClassName
Class name for transaction metadata store provider

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.transaction.coordinator.impl.MLTransactionMetadataStoreProvider`

**Dynamic**: `false`

**Category**: Transaction

### transactionPendingAckLogIndexMinLag
MLPendingAckStore maintain a ConcurrentSkipListMap pendingAckLogIndex`,it store the position in pendingAckStore as value and save a position used to determinewhether the previous data can be cleaned up as a key.transactionPendingAckLogIndexMinLag is used to configure the minimum lag between indexes

**Type**: `long`

**Default**: `500`

**Dynamic**: `false`

**Category**: Transaction

### transactionPendingAckStoreProviderClassName
Class name for transaction pending ack store provider

**Type**: `java.lang.String`

**Default**: `org.apache.pulsar.broker.transaction.pendingack.impl.MLPendingAckStoreProvider`

**Dynamic**: `false`

**Category**: Transaction

### isRunningStandalone
Flag indicates whether to run broker in standalone mode

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: WebSocket

### webSocketConnectionsPerBroker
Number of connections per Broker in Pulsar Client used in WebSocket proxy

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: WebSocket

### webSocketMaxTextFrameSize
The maximum size of a text message during parsing in WebSocket proxy.

**Type**: `int`

**Default**: `1048576`

**Dynamic**: `false`

**Category**: WebSocket

### webSocketNumIoThreads
Number of IO threads in Pulsar Client used in WebSocket proxy

**Type**: `int`

**Default**: `2`

**Dynamic**: `false`

**Category**: WebSocket

### webSocketNumServiceThreads
Number of threads used by Websocket service

**Type**: `int`

**Default**: `20`

**Dynamic**: `false`

**Category**: WebSocket

### webSocketServiceEnabled
Enable the WebSocket API service in broker

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: WebSocket

### webSocketSessionIdleTimeoutMillis
Time in milliseconds that idle WebSocket session times out

**Type**: `int`

**Default**: `300000`

**Dynamic**: `false`

**Category**: WebSocket

## Deprecated
### loadBalancerBrokerComfortLoadLevelPercentage
Usage threshold to determine a broker is having just right level of load (only used by SimpleLoadManagerImpl)

**Type**: `int`

**Default**: `65`

**Dynamic**: `false`

**Category**: Load Balancer

### loadBalancerBrokerUnderloadedThresholdPercentage
Usage threshold to determine a broker as under-loaded (only used by SimpleLoadManagerImpl)

**Type**: `int`

**Default**: `50`

**Dynamic**: `false`

**Category**: Load Balancer

### loadBalancerPlacementStrategy
load placement strategy[weightedRandomSelection/leastLoadedServer] (only used by SimpleLoadManagerImpl)

**Type**: `java.lang.String`

**Default**: `leastLoadedServer`

**Dynamic**: `false`

**Category**: Load Balancer

### brokerServicePurgeInactiveFrequencyInSeconds
How often broker checks for inactive topics to be deleted (topics with no subscriptions and no one connected) Deprecated in favor of using `brokerDeleteInactiveTopicsFrequencySeconds`
@deprecated - unused.

**Type**: `int`

**Default**: `60`

**Dynamic**: `false`

**Category**: Policies

### replicationTlsEnabled
@deprecated - Use brokerClientTlsEnabled instead.

**Type**: `boolean`

**Default**: `false`

**Dynamic**: `false`

**Category**: Replication

### configurationStoreServers
Configuration store connection string (as a comma-separated list). Deprecated in favor of `configurationMetadataStoreUrl`

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### globalZookeeperServers
Global Zookeeper quorum connection string (as a comma-separated list). Deprecated in favor of using `configurationStoreServers`

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### zooKeeperCacheExpirySeconds
ZooKeeper cache expiry time in seconds. @deprecated - Use metadataStoreCacheExpirySeconds instead.

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Server

### zooKeeperOperationTimeoutSeconds
ZooKeeper operation timeout in seconds. @deprecated - Use metadataStoreOperationTimeoutSeconds instead.

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Server

### zooKeeperSessionTimeoutMillis
ZooKeeper session timeout in milliseconds. @deprecated - Use metadataStoreSessionTimeoutMillis instead.

**Type**: `long`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Server

### zookeeperServers
The Zookeeper quorum connection string (as a comma-separated list). Deprecated in favour of metadataStoreUrl

**Type**: `java.lang.String`

**Default**: `null`

**Dynamic**: `false`

**Category**: Server

### managedLedgerMaxUnackedRangesToPersistInZooKeeper
Max number of `acknowledgment holes` that can be stored in Zookeeper.

If number of unack message range is higher than this limit then broker will persist unacked ranges into bookkeeper to avoid additional data overhead into zookeeper.
@deprecated - use managedLedgerMaxUnackedRangesToPersistInMetadataStore.

**Type**: `int`

**Default**: `-1`

**Dynamic**: `false`

**Category**: Storage (Managed Ledger)


