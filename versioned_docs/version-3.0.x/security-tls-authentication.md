---
id: security-tls-authentication
title: Authentication using mTLS
sidebar_label: "Authentication using mTLS"
---

````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

## mTLS authentication overview

Mutual TLS (mTLS) is a mutual authentication mechanism. Not only servers have keys and certs that the client uses to verify the identity of servers, clients also have keys and certs that the server uses to verify the identity of clients.

The following figure illustrates how Pulsar processes mTLS authentication between clients and servers.

![Pulsar mTLS authentication process](/assets/mTLS-authentication.svg)

## Enable mTLS authentication on brokers

To configure brokers to authenticate clients using mTLS, add the following parameters to the `conf/broker.conf`. If you use a standalone Pulsar, you need to add these parameters to the `conf/standalone.conf` file:

```properties
# enable authentication
authenticationEnabled=true
# set mTLS authentication provider
authenticationProviders=org.apache.pulsar.broker.authentication.AuthenticationProviderTls

# configure TLS for client to connect brokers
brokerClientTlsEnabled=true
brokerClientTrustCertsFilePath=/path/to/ca.cert.pem
brokerClientAuthenticationPlugin=org.apache.pulsar.client.impl.auth.AuthenticationTls
brokerClientAuthenticationParameters={"tlsCertFile":"/path/to/admin.cert.pem","tlsKeyFile":"/path/to/admin.key-pk8.pem"}

# configure TLS ports
brokerServicePortTls=6651
webServicePortTls=8081

# configure CA certificate
tlsTrustCertsFilePath=/path/to/ca.cert.pem
# configure server certificate
tlsCertificateFilePath=/path/to/broker.cert.pem
# configure server's private key
tlsKeyFilePath=/path/to/broker.key-pk8.pem

# enable mTLS
tlsRequireTrustedClientCertOnConnect=true
tlsAllowInsecureConnection=false

# Tls cert refresh duration in seconds (set 0 to check on every new connection)
tlsCertRefreshCheckDurationSec=300
```

## Enable mTLS authentication on proxies

To configure proxies to authenticate clients using mTLS, add the following parameters to the `conf/proxy.conf` file.

```properties
# enable authentication
authenticationEnabled=true
# set mTLS authentication provider
authenticationProviders=org.apache.pulsar.broker.authentication.AuthenticationProviderTls

# configure TLS for client to connect proxies
tlsEnabledWithBroker=true
brokerClientTrustCertsFilePath=/path/to/ca.cert.pem
brokerClientAuthenticationPlugin=org.apache.pulsar.client.impl.auth.AuthenticationTls
brokerClientAuthenticationParameters={"tlsCertFile":"/path/to/admin.cert.pem","tlsKeyFile":"/path/to/admin.key-pk8.pem"}

# configure TLS ports
brokerServicePortTls=6651
webServicePortTls=8081

# configure CA certificate
tlsTrustCertsFilePath=/path/to/ca.cert.pem
# configure server certificate
tlsCertificateFilePath=/path/to/proxy.cert.pem
# configure server's private key
tlsKeyFilePath=/path/to/proxy.key-pk8.pem

# enable mTLS
tlsRequireTrustedClientCertOnConnect=true
tlsAllowInsecureConnection=false
```

## Configure mTLS authentication in Pulsar clients

When using mTLS authentication, clients connect via TLS transport. You need to configure clients to use `https://` and the `8443` port for the web service URL, use `pulsar+ssl://` and the `6651` port for the broker service URL.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"},{"label":"C++","value":"C++"},{"label":"Node.js","value":"Node.js"},{"label":"Go","value":"Go"},{"label":"C#","value":"C#"}]}>
<TabItem value="Java">

```java
import org.apache.pulsar.client.api.PulsarClient;

PulsarClient client = PulsarClient.builder()
    .serviceUrl("pulsar+ssl://broker.example.com:6651/")
    .tlsTrustCertsFilePath("/path/to/ca.cert.pem")
    .authentication("org.apache.pulsar.client.impl.auth.AuthenticationTls",
                    "tlsCertFile:/path/to/my-role.cert.pem,tlsKeyFile:/path/to/my-role.key-pk8.pem")
    .build();
```

</TabItem>
<TabItem value="Python">

```python
from pulsar import Client, AuthenticationTLS

auth = AuthenticationTLS("/path/to/my-role.cert.pem", "/path/to/my-role.key-pk8.pem")
client = Client("pulsar+ssl://broker.example.com:6651/",
                tls_trust_certs_file_path="/path/to/ca.cert.pem",
                tls_allow_insecure_connection=False,
				authentication=auth)
```

</TabItem>
<TabItem value="C++">

```cpp
#include <pulsar/Client.h>

pulsar::ClientConfiguration config;
config.setUseTls(true);
config.setTlsTrustCertsFilePath("/path/to/ca.cert.pem");
config.setTlsAllowInsecureConnection(false);

pulsar::AuthenticationPtr auth = pulsar::AuthTls::create("/path/to/my-role.cert.pem",
                                                         "/path/to/my-role.key-pk8.pem")
config.setAuth(auth);

pulsar::Client client("pulsar+ssl://broker.example.com:6651/", config);
```

</TabItem>
<TabItem value="Node.js">

```javascript
const Pulsar = require('pulsar-client');

(async () => {
  const auth = new Pulsar.AuthenticationTls({
    certificatePath: '/path/to/my-role.cert.pem',
    privateKeyPath: '/path/to/my-role.key-pk8.pem',
  });

  const client = new Pulsar.Client({
    serviceUrl: 'pulsar+ssl://broker.example.com:6651/',
    authentication: auth,
    tlsTrustCertsFilePath: '/path/to/ca.cert.pem',
  });
})();
```

</TabItem>
<TabItem value="Go">

```go
client, err := pulsar.NewClient(ClientOptions{
		URL:                   "pulsar+ssl://broker.example.com:6651/",
		TLSTrustCertsFilePath: "/path/to/ca.cert.pem",
		Authentication:        pulsar.NewAuthenticationTLS("/path/to/my-role.cert.pem", "/path/to/my-role.key-pk8.pem"),
	})
```

</TabItem>
<TabItem value="C#">

```csharp
var clientCertificate = new X509Certificate2("admin.pfx");
var client = PulsarClient.Builder()
                         .AuthenticateUsingClientCertificate(clientCertificate)
                         .Build();
```

</TabItem>
</Tabs>
````

## Configure mTLS authentication in CLI tools

[Command-line tools](reference-cli-tools.md) like [`pulsar-admin`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/), [`pulsar-perf`](pathname:///reference/#/@pulsar:version_reference@/pulsar-perf/), and [`pulsar-client`](pathname:///reference/#/@pulsar:version_reference@/pulsar-client/) use the `conf/client.conf` config file in a Pulsar installation.

To use mTLS authentication with the CLI tools of Pulsar, you need to add the following parameters to the `conf/client.conf` file, alongside [the configurations to enable mTLS encryption](security-tls-transport.md#configure-mtls-encryption-in-cli-tools):

```properties
authPlugin=org.apache.pulsar.client.impl.auth.AuthenticationTls
authParams=tlsCertFile:/path/to/my-role.cert.pem,tlsKeyFile:/path/to/my-role.key-pk8.pem
```

## Configure mTLS authentication with KeyStore

Apache Pulsar supports [TLS encryption](security-tls-transport.md) and [mTLS authentication](security-tls-authentication.md) between clients and Apache Pulsar service. By default, it uses PEM format file configuration. This section describes how to use the [KeyStore](https://en.wikipedia.org/wiki/Java_KeyStore) type to configure mTLS authentication.

### Configure brokers

Configure the `broker.conf` file as follows.

```properties
# Configuration to enable authentication
authenticationEnabled=true
authenticationProviders=org.apache.pulsar.broker.authentication.AuthenticationProviderTls

# Enable KeyStore type
tlsEnabledWithKeyStore=true

# key store
tlsKeyStoreType=JKS
tlsKeyStore=/var/private/tls/broker.keystore.jks
tlsKeyStorePassword=brokerpw

# trust store
tlsTrustStoreType=JKS
tlsTrustStore=/var/private/tls/broker.truststore.jks
tlsTrustStorePassword=brokerpw

# internal client/admin-client config
brokerClientTlsEnabled=true
brokerClientTlsEnabledWithKeyStore=true
brokerClientTlsTrustStoreType=JKS
brokerClientTlsTrustStore=/var/private/tls/client.truststore.jks
brokerClientTlsTrustStorePassword=clientpw
# internal auth config
brokerClientAuthenticationPlugin=org.apache.pulsar.client.impl.auth.AuthenticationKeyStoreTls
brokerClientAuthenticationParameters={"keyStoreType":"JKS","keyStorePath":"/var/private/tls/client.keystore.jks","keyStorePassword":"clientpw"}

tlsRequireTrustedClientCertOnConnect=true
tlsAllowInsecureConnection=false
```

### Configure clients

Besides configuring [TLS encryption](security-tls-transport.md), you need to configure the KeyStore, which contains a valid CN as client role, for clients.

For example:

1. for [Command-line tools](reference-cli-tools.md) like [`pulsar-admin`](pathname:///reference/#/@pulsar:version_reference@/pulsar-admin/), [`pulsar-perf`](pathname:///reference/#/@pulsar:version_reference@/pulsar-perf/), and [`pulsar-client`](pathname:///reference/#/@pulsar:version_reference@/pulsar-client/), set the `conf/client.conf` file in a Pulsar installation.

   ```properties
   webServiceUrl=https://broker.example.com:8443/
   brokerServiceUrl=pulsar+ssl://broker.example.com:6651/
   useKeyStoreTls=true
   tlsTrustStoreType=JKS
   tlsTrustStorePath=/var/private/tls/client.truststore.jks
   tlsTrustStorePassword=clientpw
   authPlugin=org.apache.pulsar.client.impl.auth.AuthenticationKeyStoreTls
   authParams={"keyStoreType":"JKS","keyStorePath":"/var/private/tls/client.keystore.jks","keyStorePassword":"clientpw"}
   ```

1. for Java client

   ```java
   import org.apache.pulsar.client.api.PulsarClient;

   PulsarClient client = PulsarClient.builder()
       .serviceUrl("pulsar+ssl://broker.example.com:6651/")
       .useKeyStoreTls(true)
       .tlsTrustStorePath("/var/private/tls/client.truststore.jks")
       .tlsTrustStorePassword("clientpw")
       .allowTlsInsecureConnection(false)
       .enableTlsHostnameVerification(false)
       .authentication(
               "org.apache.pulsar.client.impl.auth.AuthenticationKeyStoreTls",
               "keyStoreType:JKS,keyStorePath:/var/private/tls/client.keystore.jks,keyStorePassword:clientpw")
       .build();
   ```

1. for Java admin client

   ```java
       PulsarAdmin amdin = PulsarAdmin.builder().serviceHttpUrl("https://broker.example.com:8443")
           .useKeyStoreTls(true)
           .tlsTrustStorePath("/var/private/tls/client.truststore.jks")
           .tlsTrustStorePassword("clientpw")
           .allowTlsInsecureConnection(false)
           .enableTlsHostnameVerification(false)
           .authentication(
                  "org.apache.pulsar.client.impl.auth.AuthenticationKeyStoreTls",
                  "keyStoreType:JKS,keyStorePath:/var/private/tls/client.keystore.jks,keyStorePassword:clientpw")
           .build();
   ```

:::note

Configure `tlsTrustStorePath` when you set `useKeyStoreTls` to `true`.

:::
