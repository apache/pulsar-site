# clusters

Operations about clusters


```shell
$ pulsar-admin clusters subcommand
```



## get

Get the configuration data for the specified cluster

**Command:**

```shell
$ pulsar-admin clusters get options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## create

Provisions a new cluster. This operation requires Pulsar super-user privileges

**Command:**

```shell
$ pulsar-admin clusters create options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--url]` | service-url|null|
| `[--url-secure]` | service-url for secure connection|null|
| `[--broker-url]` | broker-service-url|null|
| `[--broker-url-secure]` | broker-service-url for secure connection|null|
| `[--proxy-url]` | Proxy-service url when client would like to connect to broker via proxy.|null|
| `[--auth-plugin]` | authentication plugin|null|
| `[--auth-parameters]` | authentication parameters|null|
| `[--proxy-protocol]` | protocol to decide type of proxy routing eg: SNI|null|
| `[--tls-enable]` | Enable tls connection|null|
| `[--tls-allow-insecure]` | Allow insecure tls connection|null|
| `[--tls-enable-keystore]` | Whether use KeyStore type to authenticate|null|
| `[--tls-trust-store-type]` | TLS TrustStore type configuration for internal client eg: JKS|null|
| `[--tls-trust-store]` | TLS TrustStore path for internal client|null|
| `[--tls-trust-store-pwd]` | TLS TrustStore password for internal client|null|
| `[--tls-key-store-type]` | TLS TrustStore type configuration for internal client eg: JKS|null|
| `[--tls-key-store]` | TLS KeyStore path for internal client|null|
| `[--tls-key-store-pwd]` | TLS KeyStore password for internal client|null|
| `[--tls-trust-certs-filepath]` | path for the trusted TLS certificate file|null|
| `[--tls-key-filepath]` | path for the TLS private key file|null|
| `[--tls-certs-filepath]` | path for the TLS certificate file|null|
| `[--tls-factory-class-name]` | PulsarTlsFactory class name used for outbound connections to this cluster — the two legs configured from this cluster entry, the binary-protocol replication client and the cross-cluster admin client. It does not reach the peer-cluster lookup client, which stays broker-level (as in 4.x). Leave unset to inherit the broker's brokerClientTlsFactoryClassName.|null|
| `[--tls-factory-config]` | Configuration passed to --tls-factory-class-name as its init params, either a JSON object or a key=value list. Follows --tls-factory-class-name rather than inheriting on its own: used verbatim when this cluster names a factory, ignored otherwise.|null|
| `[--listener-name]` | listenerName when client would like to connect to cluster|null|
| `[--cluster-config-file]` | The path to a YAML config file specifying the cluster's configuration|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## update

Update the configuration for a cluster

**Command:**

```shell
$ pulsar-admin clusters update options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--url]` | service-url|null|
| `[--url-secure]` | service-url for secure connection|null|
| `[--broker-url]` | broker-service-url|null|
| `[--broker-url-secure]` | broker-service-url for secure connection|null|
| `[--proxy-url]` | Proxy-service url when client would like to connect to broker via proxy.|null|
| `[--auth-plugin]` | authentication plugin|null|
| `[--auth-parameters]` | authentication parameters|null|
| `[--proxy-protocol]` | protocol to decide type of proxy routing eg: SNI|null|
| `[--tls-enable]` | Enable tls connection|null|
| `[--tls-allow-insecure]` | Allow insecure tls connection|null|
| `[--tls-enable-keystore]` | Whether use KeyStore type to authenticate|null|
| `[--tls-trust-store-type]` | TLS TrustStore type configuration for internal client eg: JKS|null|
| `[--tls-trust-store]` | TLS TrustStore path for internal client|null|
| `[--tls-trust-store-pwd]` | TLS TrustStore password for internal client|null|
| `[--tls-key-store-type]` | TLS TrustStore type configuration for internal client eg: JKS|null|
| `[--tls-key-store]` | TLS KeyStore path for internal client|null|
| `[--tls-key-store-pwd]` | TLS KeyStore password for internal client|null|
| `[--tls-trust-certs-filepath]` | path for the trusted TLS certificate file|null|
| `[--tls-key-filepath]` | path for the TLS private key file|null|
| `[--tls-certs-filepath]` | path for the TLS certificate file|null|
| `[--tls-factory-class-name]` | PulsarTlsFactory class name used for outbound connections to this cluster — the two legs configured from this cluster entry, the binary-protocol replication client and the cross-cluster admin client. It does not reach the peer-cluster lookup client, which stays broker-level (as in 4.x). Leave unset to inherit the broker's brokerClientTlsFactoryClassName.|null|
| `[--tls-factory-config]` | Configuration passed to --tls-factory-class-name as its init params, either a JSON object or a key=value list. Follows --tls-factory-class-name rather than inheriting on its own: used verbatim when this cluster names a factory, ignored otherwise.|null|
| `[--listener-name]` | listenerName when client would like to connect to cluster|null|
| `[--cluster-config-file]` | The path to a YAML config file specifying the cluster's configuration|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## delete

Deletes an existing cluster

**Command:**

```shell
$ pulsar-admin clusters delete options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-a, --all]` | Delete all data (tenants) of the cluster|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## list

List the existing clusters

**Command:**

```shell
$ pulsar-admin clusters list options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-c, --current]` | Print the current cluster with (*)|false|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## update-peer-clusters

Update peer cluster names

**Command:**

```shell
$ pulsar-admin clusters update-peer-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--peer-clusters]` | Comma separated peer-cluster names [Pass empty string "" to delete list]|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-cluster-migration

Get the cluster migration configuration data for the specified cluster

**Command:**

```shell
$ pulsar-admin clusters get-cluster-migration options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## update-cluster-migration

Update cluster migration

**Command:**

```shell
$ pulsar-admin clusters update-cluster-migration options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--migrated]` | Is cluster migrated|false|
| `[--service-url]` | New migrated cluster service url|null|
| `[--service-url-secure]` | New migrated cluster service url secure|null|
| `[--broker-url]` | New migrated cluster broker service url|null|
| `[--broker-url-secure]` | New migrated cluster broker service url secure|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-peer-clusters

Get list of peer-clusters

**Command:**

```shell
$ pulsar-admin clusters get-peer-clusters options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## get-failure-domain

Get the configuration brokers of a failure-domain

**Command:**

```shell
$ pulsar-admin clusters get-failure-domain options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--domain-name]` | domain-name|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## create-failure-domain

Create a new failure-domain for a cluster. updates it if already created.

**Command:**

```shell
$ pulsar-admin clusters create-failure-domain options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--domain-name]` | domain-name|null|
| `[--broker-list]` | Comma separated broker list|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## update-failure-domain

Update failure-domain for a cluster. Creates a new one if not exist.

**Command:**

```shell
$ pulsar-admin clusters update-failure-domain options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--domain-name]` | domain-name|null|
| `[--broker-list]` | Comma separated broker list|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## delete-failure-domain

Deletes an existing failure-domain

**Command:**

```shell
$ pulsar-admin clusters delete-failure-domain options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[--domain-name]` | domain-name|null|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|


## list-failure-domains

List the existing failure-domains for a cluster

**Command:**

```shell
$ pulsar-admin clusters list-failure-domains options
```

**Options:**

|Flag|Description|Default|
|---|---|---|
| `[-h, --help]` | Show this help message and exit.|false|
| `[-v, --version]` | Print version information and exit.|false|

