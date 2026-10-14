# Client

## Required
### serviceUrl
Pulsar cluster HTTP URL to connect to a broker.

**Type**: `java.lang.String`

**Default**: `null`

## Optional
### authParamMap
Authentication map of the client.

**Type**: `java.util.Map`

**Default**: `null`

### authParams
Authentication parameter of the client.

**Type**: `java.lang.String`

**Default**: `null`

### authPluginClassName
Class name of authentication plugin of the client.

**Type**: `java.lang.String`

**Default**: `null`

### authentication
Authentication settings of the client.

**Type**: `org.apache.pulsar.client.api.Authentication`

**Default**: `null`

### autoCertRefreshSeconds
Seconds of auto refreshing certificate.

**Type**: `int`

**Default**: `300`

### concurrentLookupRequest
The number of concurrent lookup requests that can be sent on each broker connection. Setting a maximum prevents overloading a broker.

**Type**: `int`

**Default**: `5000`

### connectionMaxIdleSeconds
Release the connection if it is not used for more than [connectionMaxIdleSeconds] seconds. If  [connectionMaxIdleSeconds] < 0, disabled the feature that auto release the idle connections

**Type**: `int`

**Default**: `180`

### connectionTimeoutMs
Duration of waiting for a connection to a broker to be established.If the duration passes without a response from a broker, the connection attempt is dropped.

**Type**: `int`

**Default**: `10000`

### connectionsPerBroker
Number of connections established between the client and each Broker. A value of 0 means to disable connection pooling.

**Type**: `int`

**Default**: `1`

### dnsLookupBindAddress
The Pulsar client dns lookup bind address, default behavior is bind on 0.0.0.0

**Type**: `java.lang.String`

**Default**: `null`

### dnsLookupBindPort
The Pulsar client dns lookup bind port, takes effect when dnsLookupBindAddress is configured, default value is 0.

**Type**: `int`

**Default**: `0`

### enableBusyWait
Whether to enable BusyWait for EpollEventLoopGroup.

**Type**: `boolean`

**Default**: `false`

### enableTransaction
Whether to enable transaction.

**Type**: `boolean`

**Default**: `false`

### initialBackoffIntervalNanos
Initial backoff interval (in nanosecond).

**Type**: `long`

**Default**: `100000000`

### keepAliveIntervalSeconds
Seconds of keeping alive interval for each client broker connection.

**Type**: `int`

**Default**: `30`

### listenerName
Listener name for lookup. Clients can use listenerName to choose one of the listeners as the service URL to create a connection to the broker as long as the network is accessible."advertisedListeners" must enabled in broker side.

**Type**: `java.lang.String`

**Default**: `null`

### lookupTimeoutMs
Client lookup timeout (in milliseconds).

**Type**: `long`

**Default**: `-1`

### maxBackoffIntervalNanos
Max backoff interval (in nanosecond).

**Type**: `long`

**Default**: `60000000000`

### maxLookupRedirects
Maximum times of redirected lookup requests.

**Type**: `int`

**Default**: `20`

### maxLookupRequest
Maximum number of lookup requests allowed on each broker connection to prevent overloading a broker.

**Type**: `int`

**Default**: `50000`

### maxNumberOfRejectedRequestPerConnection
Maximum number of rejected requests of a broker in a certain time frame (60 seconds) after the current connection is closed and the client creating a new connection to connect to a different broker.

**Type**: `int`

**Default**: `50`

### memoryLimitBytes
Limit of client memory usage (in byte). The 64M default can guarantee a high producer throughput.

**Type**: `long`

**Default**: `67108864`

### numIoThreads
Number of IO threads.

**Type**: `int`

**Default**: `2`

### numListenerThreads
Number of consumer listener threads.

**Type**: `int`

**Default**: `2`

### operationTimeoutMs
Client operation timeout (in milliseconds).

**Type**: `long`

**Default**: `30000`

### proxyProtocol
Protocol of proxy service. proxyServiceUrl and proxyProtocol must be mutually inclusive.

**Type**: `org.apache.pulsar.client.api.ProxyProtocol`

**Default**: `null`

### proxyServiceUrl
URL of proxy service. proxyServiceUrl and proxyProtocol must be mutually inclusive.

**Type**: `java.lang.String`

**Default**: `null`

### readTimeoutMs
Maximum read time of a request.

**Type**: `int`

**Default**: `60000`

### requestTimeoutMs
Maximum duration for completing a request.

**Type**: `int`

**Default**: `60000`

### serviceUrlProvider
The implementation class of ServiceUrlProvider used to generate ServiceUrl.

**Type**: `org.apache.pulsar.client.api.ServiceUrlProvider`

**Default**: `null`

### socks5ProxyAddress
Address of SOCKS5 proxy.

**Type**: `java.net.InetSocketAddress`

**Default**: `null`

### socks5ProxyPassword
Password of SOCKS5 proxy.

**Type**: `java.lang.String`

**Default**: `null`

### socks5ProxyUsername
User name of SOCKS5 proxy.

**Type**: `java.lang.String`

**Default**: `null`

### sslProvider
The TLS provider used by an internal client to authenticate with other Pulsar brokers.

**Type**: `java.lang.String`

**Default**: `null`

### statsIntervalSeconds
Interval to print client stats (in seconds).

**Type**: `long`

**Default**: `60`

### tlsAllowInsecureConnection
Whether the client accepts untrusted TLS certificates from the broker.

**Type**: `boolean`

**Default**: `false`

### tlsCertificateFilePath
Path to the TLS certificate file.

**Type**: `java.lang.String`

**Default**: `null`

### tlsCiphers
Set of TLS Ciphers.

**Type**: `java.util.Set`

**Default**: `[]`

### tlsHostnameVerificationEnable
Whether the hostname is validated when the proxy creates a TLS connection with brokers.

**Type**: `boolean`

**Default**: `false`

### tlsKeyFilePath
Path to the TLS key file.

**Type**: `java.lang.String`

**Default**: `null`

### tlsKeyStorePassword
Password of TLS KeyStore.

**Type**: `java.lang.String`

**Default**: `null`

### tlsKeyStorePath
Path of TLS KeyStore.

**Type**: `java.lang.String`

**Default**: `null`

### tlsKeyStoreType
TLS KeyStore type configuration.

**Type**: `java.lang.String`

**Default**: `JKS`

### tlsProtocols
Protocols of TLS.

**Type**: `java.util.Set`

**Default**: `[]`

### tlsTrustCertsFilePath
Path to the trusted TLS certificate file.

**Type**: `java.lang.String`

**Default**: `null`

### tlsTrustStorePassword
Password of TLS TrustStore.

**Type**: `java.lang.String`

**Default**: `null`

### tlsTrustStorePath
Path of TLS TrustStore.

**Type**: `java.lang.String`

**Default**: `null`

### tlsTrustStoreType
TLS TrustStore type configuration. You need to set this configuration when client authentication is required.

**Type**: `java.lang.String`

**Default**: `JKS`

### useKeyStoreTls
Set TLS using KeyStore way.

**Type**: `boolean`

**Default**: `false`

### useTcpNoDelay
Whether to use TCP NoDelay option.

**Type**: `boolean`

**Default**: `true`

### useTls
Whether to use TLS.

**Type**: `boolean`

**Default**: `false`


