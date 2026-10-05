---
id: security-tls-transport
title: TLS Encryption
sidebar_label: "TLS Encryption"
description: Get a comprehensive understanding of TLS concepts, debugging methods and mTLS configuration methods in Pulsar.
---


````mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
````

## TLS overview

Transport Layer Security (TLS) is a form of [public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography). By default, Pulsar clients communicate with Pulsar services in plain text. This means that all data is sent in the clear. You can use TLS to encrypt this traffic to protect the traffic from the snooping of a man-in-the-middle attacker.

This section introduces how to configure TLS encryption in Pulsar. For how to configure mTLS authentication in Pulsar, refer to [mTLS authentication](security-tls-authentication.md). Alternatively, you can use another [Athenz authentication](security-athenz.md) on top of TLS transport encryption.

:::note

Enabling TLS encryption may impact the performance due to encryption overhead.

:::

### TLS certificates

TLS uses certificates containing public keys and separate private keys:

* A Certificate Authority (CA) signs server and client certificates with its **private key**. Keep that key with the CA; do not distribute it to brokers, proxies, or clients. Distribute the CA's public certificate (**trust cert**) to parties that need to verify those signatures.
* Servers hold their own private key and certificate to prove their identity to clients.
* Clients hold their own private key and certificate when using mutual TLS.

Generate each server or client's key pair and a certificate signing request, then have the CA sign the request. During the handshake, the peer verifies the certificate chain against its trusted CA and verifies possession of the corresponding private key. The Common Name (CN) of a client certificate is used as the client's role token for [mTLS authentication](security-tls-authentication.md), while server certificates should use Subject Alternative Names (SANs) for [Hostname verification](#hostname-verification).

:::note

The certificate-generation examples below use a validity of 365 days and SHA-256 signatures. Choose validity and rotation policies suitable for your deployment.

:::

### Certificate formats

You can use either one of the following certificate formats to configure TLS encryption:
* Recommended: Privacy Enhanced Mail (PEM).
  See [Configure TLS encryption with PEM](#configure-mtls-encryption-with-pem) for detailed instructions.
* Optional: Java [KeyStore](https://en.wikipedia.org/wiki/Java_KeyStore) (JKS).
  See [Configure TLS encryption with KeyStore](#configure-mtls-encryption-with-keystore) for detailed instructions.

### Hostname verification

Hostname verification is a TLS security feature whereby a client refuses to connect to a server if the server certificate's Subject Alternative Name (SAN) does not match the hostname the client is connecting to. It defends against man-in-the-middle attacks even when the attacker holds a certificate signed by the trusted CA.

Hostname verification is **enabled by default** for Java clients and outbound TLS connections from brokers, proxies, WebSocket services, and Functions workers, including geo-replication. Give each server certificate SANs that match the addresses clients use in service URLs and the individual addresses advertised by brokers. A wildcard DNS SAN such as `*.broker.example.com` can cover a group of hosts; connections to an IP address require a matching IP SAN. Other language clients have independent releases and defaults; enable hostname verification explicitly in their configuration.

Pulsar delegates matching to the provider's standard endpoint-identification algorithm. The default JDK/native engines can still fall back to the server certificate's CN when connecting by hostname if there is no DNS SAN. A client explicitly using Conscrypt rejects CN-only certificates because Pulsar's former CN-tolerant verifier has been removed. Reissue CN-only certificates with SANs rather than relying on fallback; current [RFC 9525](https://datatracker.ietf.org/doc/html/rfc9525) uses SAN identities. The CN of a *client* certificate remains the role token for mTLS authentication.

Hostname verification settings differ by component:

| Component | Setting | Default |
| --- | --- | --- |
| Existing Java client/admin builder | `enableTlsHostnameVerification(true)` | Enabled |
| Java client configuration / `client.conf` | `tlsHostnameVerificationEnable=true` | Enabled |
| Broker, proxy, WebSocket service | `tlsHostnameVerificationEnabled=true` | Enabled |
| Functions worker | `tlsEnableHostnameVerification: true` | Enabled |

Disabling verification allows a trusted certificate for a different server name to be accepted. Configure matching certificates; see the [upgrade checklist](administration-upgrade-to-5.0.x-applications.md#check-authentication-tls-and-extensions) when updating an existing deployment.

Certificate trust and hostname verification are separate checks. Keep `allowTlsInsecureConnection(false)` on Java client/admin builders and `tlsAllowInsecureConnection=false` in server configuration to reject untrusted certificates, as well as keeping hostname verification enabled.

## Configure mTLS encryption with PEM

By default, Pulsar uses [netty-tcnative](https://github.com/netty/netty-tcnative). It includes two implementations, `OpenSSL` (default) and `JDK`. When `OpenSSL` is unavailable, `JDK` is used.

To configure mTLS encryption with PEM, complete the following steps.

The shared Java PEM reader in Pulsar accepts unencrypted PKCS#8 private keys (`BEGIN PRIVATE KEY`), PKCS#1 RSA keys (`BEGIN RSA PRIVATE KEY`), and SEC1 EC keys (`BEGIN EC PRIVATE KEY`). SEC1 parsing requires Bouncy Castle `bcpkix` and its matching dependencies on the classpath; otherwise, convert the EC key to PKCS#8. Parsing SEC1 does not register or select a Bouncy Castle cryptographic provider: the configured JCA provider still creates the private-key object. See [Bouncy Castle providers](security-bouncy-castle.md).

The examples below use unencrypted PKCS#8 keys. Keep these keys readable only by the component that needs them. Independently released language clients can have different format support; verify their requirements before reusing a key file.

### Step 1: Create TLS certificates

Creating TLS certificates involves creating a [certificate authority](#create-a-certificate-authority), a [server certificate](#create-a-server-certificate), and a [client certificate](#create-a-client-certificate).

#### Create a certificate authority

You can use a certificate authority (CA) to sign both server and client certificates. This ensures that each party trusts the others. Store CA in a very secure location (ideally completely disconnected from networks, air-gapped, and fully encrypted).

Use the following command to create a CA.

```bash
openssl genrsa -out ca.key.pem 2048
openssl req -x509 -new -nodes -key ca.key.pem -subj "/CN=CARoot" -days 365 -out ca.cert.pem
```

:::note

The default `openssl` on macOS doesn't work for the commands above. You need to upgrade `openssl` via Homebrew:

```bash
brew install openssl
export PATH="/usr/local/Cellar/openssl@3/3.0.1/bin:$PATH"
```

Use the actual path from the output of the `brew install` command. Note that version number `3.0.1` might change.

:::

#### Create a server certificate

Once you have created a CA, you can create certificate requests and sign them with the CA.

1. Generate the server's private key.

   ```bash
   openssl genrsa -out server.key.pem 2048
   ```

   Convert the key to PKCS#8 for this example.

   ```bash
   openssl pkcs8 -topk8 -inform PEM -outform PEM -in server.key.pem -out server.key-pk8.pem -nocrypt
   ```

2. Create a `server.conf` file with the following content:

   ```properties
   [ req ]
   default_bits = 2048
   prompt = no
   default_md = sha256
   distinguished_name = dn

   [ v3_ext ]
   authorityKeyIdentifier=keyid,issuer:always
   basicConstraints=CA:FALSE
   keyUsage=critical, digitalSignature, keyEncipherment
   extendedKeyUsage=serverAuth
   subjectAltName=@alt_names

   [ dn ]
   CN = server

   [ alt_names ]
   DNS.1 = pulsar
   DNS.2 = pulsar.default
   IP.1 = 127.0.0.1
   IP.2 = 192.168.1.2
   ```

   :::tip

   To configure [hostname verification](#hostname-verification), you need to enter the hostname of the server in `alt_names` as the Subject Alternative Name (SAN). To ensure that multiple machines can reuse the same certificate, you can also use a wildcard to match a group of server hostnames, for example, `*.server.usw.example.com`.

   :::

3. Generate the certificate request.

   ```bash
   openssl req -new -config server.conf -key server.key.pem -out server.csr.pem -sha256
   ```

4. Sign the certificate with the CA.

   ```bash
   openssl x509 -req -in server.csr.pem -CA ca.cert.pem -CAkey ca.key.pem -CAcreateserial -out server.cert.pem -days 365 -extensions v3_ext -extfile server.conf -sha256
   ```

At this point, you have a cert, `server.cert.pem`, and a key, `server.key-pk8.pem`, which you can use along with `ca.cert.pem` to configure TLS encryption for your brokers and proxies.

#### Create a broker client certificate

1. Generate the broker_client's private key.

   ```bash
   openssl genrsa -out broker_client.key.pem 2048
   ```

   Convert the key to PKCS#8 for this example.

   ```bash
   openssl pkcs8 -topk8 -inform PEM -outform PEM -in broker_client.key.pem -out broker_client.key-pk8.pem -nocrypt
   ```

2. Generate the certificate request. Note that the value of `CN` is used as the broker client's role token.

   ```bash
   openssl req -new -subj "/CN=broker_client" -key broker_client.key.pem -out broker_client.csr.pem -sha256
   ```

3. Sign the certificate with the CA.

   ```bash
   openssl x509 -req -in broker_client.csr.pem -CA ca.cert.pem -CAkey ca.key.pem -CAcreateserial -out broker_client.cert.pem -days 365 -sha256
   ```

At this point, you have a cert `broker_client.cert.pem` and a key `broker_client.key-pk8.pem`, which you can use along with `ca.cert.pem` to configure TLS encryption for your broker client.

#### Create a admin certificate

1. Generate the admin's private key.

   ```bash
   openssl genrsa -out admin.key.pem 2048
   ```

   Convert the key to PKCS#8 for this example.

   ```bash
   openssl pkcs8 -topk8 -inform PEM -outform PEM -in admin.key.pem -out admin.key-pk8.pem -nocrypt
   ```

2. Generate the certificate request. Note that the value of `CN` is used as the admin's role token.

   ```bash
   openssl req -new -subj "/CN=admin" -key admin.key.pem -out admin.csr.pem -sha256
   ```

3. Sign the certificate with the CA.

   ```bash
   openssl x509 -req -in admin.csr.pem -CA ca.cert.pem -CAkey ca.key.pem -CAcreateserial -out admin.cert.pem -days 365 -sha256
   ```

At this point, you have a cert `admin.cert.pem` and a key `admin.key-pk8.pem`, which you can use along with `ca.cert.pem` to configure TLS encryption for your pulsar admin.

#### Create a client certificate

1. Generate the client's private key.

   ```bash
   openssl genrsa -out client.key.pem 2048
   ```

   Convert the key to PKCS#8 for this example.

   ```bash
   openssl pkcs8 -topk8 -inform PEM -outform PEM -in client.key.pem -out client.key-pk8.pem -nocrypt
   ```

2. Generate the certificate request. Note that the value of `CN` is used as the client's role token.

   ```bash
   openssl req -new -subj "/CN=client" -key client.key.pem -out client.csr.pem -sha256
   ```

3. Sign the certificate with the CA.

   ```bash
   openssl x509 -req -in client.csr.pem -CA ca.cert.pem -CAkey ca.key.pem -CAcreateserial -out client.cert.pem -days 365 -sha256
   ```

At this point, you have a cert `client.cert.pem` and a key `client.key-pk8.pem`, which you can use along with `ca.cert.pem` to configure TLS encryption for your client.

#### Create a proxy certificate (Optional)

1. Generate the proxy's private key.

   ```bash
   openssl genrsa -out proxy.key.pem 2048
   ```

   Convert the key to PKCS#8 for this example.

   ```bash
   openssl pkcs8 -topk8 -inform PEM -outform PEM -in proxy.key.pem -out proxy.key-pk8.pem -nocrypt
   ```

2. Generate the certificate request. Note that the value of `CN` is used as the proxy's role token.

   ```bash
   openssl req -new -subj "/CN=proxy" -key proxy.key.pem -out proxy.csr.pem -sha256
   ```

3. Sign the certificate with the CA.

   ```bash
   openssl x509 -req -in proxy.csr.pem -CA ca.cert.pem -CAkey ca.key.pem -CAcreateserial -out proxy.cert.pem -days 365 -sha256
   ```

At this point, you have a cert `proxy.cert.pem` and a key `proxy.key-pk8.pem`, which you can use along with `ca.cert.pem` to configure TLS encryption for your proxy.


### Step 2: Configure brokers

To configure a Pulsar [broker](reference-terminology.md#broker) to use TLS encryption, you need to add these values to `broker.conf` in the `conf` directory of your Pulsar installation. Substitute the appropriate certificate paths where necessary.

```properties
# configure TLS ports
brokerServicePortTls=6651
webServicePortTls=8081

# configure CA certificate
tlsTrustCertsFilePath=/path/to/ca.cert.pem
# configure server certificate
tlsCertificateFilePath=/path/to/server.cert.pem
# configure server's private key
tlsKeyFilePath=/path/to/server.key-pk8.pem

# enable mTLS
tlsRequireTrustedClientCertOnConnect=true

# configure mTLS for the internal client
brokerClientTlsEnabled=true
brokerClientTrustCertsFilePath=/path/to/ca.cert.pem
brokerClientCertificateFilePath=/path/to/broker_client.cert.pem
brokerClientKeyFilePath=/path/to/broker_client.key-pk8.pem
```

#### Configure TLS Protocol Version and Cipher

To configure the broker (and proxy) to require specific TLS protocol versions and ciphers for TLS negotiation, you can use the TLS protocol versions and ciphers to stop clients from requesting downgraded TLS protocol versions or ciphers that may have weaknesses.

The built-in factory enables **TLS 1.3 and TLS 1.2** when protocols are unset. Binary connections use Netty's native OpenSSL engine when available and fall back to the JDK engine. Explicit JSSE provider selection uses the JDK engine with that provider. HTTPS listeners prefer Conscrypt when available and usable, falling back to the JVM default provider. See [TLS providers and custom factories](#tls-providers-and-custom-factories) for explicit selection.

Both the TLS protocol versions and cipher properties can take multiple values, separated by commas. The possible values for protocol versions and ciphers depend on the TLS provider that you are using.

```properties
tlsProtocols=TLSv1.3,TLSv1.2
tlsCiphers=TLS_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
```

* `tlsProtocols` specifies the enabled protocol versions. An unset value enables TLS 1.3 and TLS 1.2 with the built-in factory.
* `tlsCiphers` specifies cipher suites. When unset, the provider's defaults apply. The example includes a TLS 1.3 suite and a TLS 1.2 suite for RSA server certificates; check support in your chosen provider.

For JDK provider behavior and supported algorithms, see the [JSSE reference guide](https://docs.oracle.com/en/java/javase/21/security/java-secure-socket-extension-jsse-reference-guide.html).

### Step 3: Configure proxies

Configuring mTLS on proxies includes two directions of connections, from clients to proxies, and from proxies to brokers.

```properties
# configure TLS ports
servicePortTls=6651
webServicePortTls=8081

# configure certificates for clients to connect proxy
tlsCertificateFilePath=/path/to/server.cert.pem
tlsKeyFilePath=/path/to/server.key-pk8.pem
tlsTrustCertsFilePath=/path/to/ca.cert.pem

# enable mTLS
tlsRequireTrustedClientCertOnConnect=true

# configure TLS for proxy to connect brokers
tlsEnabledWithBroker=true
brokerClientTrustCertsFilePath=/path/to/ca.cert.pem
brokerClientCertificateFilePath=/path/to/proxy.cert.pem
brokerClientKeyFilePath=/path/to/proxy.key-pk8.pem
```

### Step 4: Configure clients

To enable TLS encryption, you need to configure the clients to use `https://` with port 8443 for the web service URL, and `pulsar+ssl://` with port 6651 for the broker service URL.

As the server certificate that you generated above does not belong to any of the default trust chains, you also need to either specify the path of the **trust cert** (recommended) or enable the clients to allow untrusted server certs.

The following examples show how to configure TLS encryption for Java/Python/C++/Node.js/C#/WebSocket clients.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java"
  values={[{"label":"Java","value":"Java"},{"label":"Python","value":"Python"},{"label":"C++","value":"C++"},{"label":"Node.js","value":"Node.js"},{"label":"C#","value":"C#"},{"label":"WebSocket API","value":"WebSocket API"}]}>
<TabItem value="Java">

```java
import org.apache.pulsar.client.api.PulsarClient;

PulsarClient client = PulsarClient.builder()
    .serviceUrl("pulsar+ssl://broker.example.com:6651/")
    .tlsKeyFilePath("/path/to/client.key-pk8.pem")
    .tlsCertificateFilePath("/path/to/client.cert.pem")
    .tlsTrustCertsFilePath("/path/to/ca.cert.pem")
    .enableTlsHostnameVerification(true) // enabled by default
    .allowTlsInsecureConnection(false) // false by default, in any case
    .build();
```

</TabItem>
<TabItem value="Python">

```python
from pulsar import Client

client = Client("pulsar+ssl://broker.example.com:6651/",
                tls_hostname_verification=True,
                tls_trust_certs_file_path="/path/to/ca.cert.pem",
                tls_allow_insecure_connection=False)
```

</TabItem>
<TabItem value="C++">

```cpp
#include <pulsar/Client.h>

ClientConfiguration config = ClientConfiguration();
config.setUseTls(true);  // shouldn't be needed soon
config.setTlsTrustCertsFilePath(caPath);
config.setTlsAllowInsecureConnection(false);
config.setAuth(pulsar::AuthTls::create(clientPublicKeyPath, clientPrivateKeyPath));
config.setValidateHostName(true);
```

</TabItem>
<TabItem value="Node.js">

```javascript
const Pulsar = require('pulsar-client');

(async () => {
  const client = new Pulsar.Client({
    serviceUrl: 'pulsar+ssl://broker.example.com:6651/',
    tlsTrustCertsFilePath: '/path/to/ca.cert.pem',
    useTls: true,
    tlsValidateHostname: true,
    tlsAllowInsecureConnection: false,
  });
})();
```

</TabItem>
<TabItem value="C#">

```csharp
var certificate = new X509Certificate2("ca.cert.pem");
var client = PulsarClient.Builder()
                         .TrustedCertificateAuthority(certificate) //If the CA is not trusted on the host, you can add it explicitly.
                         .VerifyCertificateAuthority(true) //Default is 'true'
                         .VerifyCertificateName(true)
                         .Build();
```

:::note

`VerifyCertificateName` refers to the configuration of hostname verification in the C# client.

:::

</TabItem>
<TabItem value="WebSocket API">

```python
import websockets
import asyncio
import base64
import json
import ssl
import pathlib

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
client_cert_pem = pathlib.Path(__file__).with_name("client.cert.pem")
client_key_pem = pathlib.Path(__file__).with_name("client.key.pem")
ca_cert_pem = pathlib.Path(__file__).with_name("ca.cert.pem")
ssl_context.load_cert_chain(certfile=client_cert_pem, keyfile=client_key_pem)
ssl_context.load_verify_locations(ca_cert_pem)
# websocket producer uri wss, not ws
uri = "wss://localhost:8080/ws/v2/producer/persistent/public/default/testtopic"
client_pem = pathlib.Path(__file__).with_name("pulsar_client.pem")
ssl_context.load_verify_locations(client_pem)
# websocket producer uri wss, not ws
uri = "wss://localhost:8080/ws/v2/producer/persistent/public/default/testtopic"
# encode message
s = "Hello World"
firstEncoded = s.encode("UTF-8")
binaryEncoded = base64.b64encode(firstEncoded)
payloadString = binaryEncoded.decode('UTF-8')
async def producer_handler(websocket):
    await websocket.send(json.dumps({
            'payload' : payloadString,
            'properties': {
                'key1' : 'value1',
                'key2' : 'value2'
            },
            'context' : 5
        }))
async def test():
    async with websockets.connect(uri) as websocket:
        await producer_handler(websocket)
        message = await websocket.recv()
        print(f"< {message}")
asyncio.run(test())
```

:::note

In addition to the required configurations in the `conf/client.conf` file, you need to configure more parameters in the `conf/broker.conf` file to enable TLS encryption on WebSocket service. For more details, see [security settings for WebSocket](/docs/client-libraries/websocket#security-settings).

:::

</TabItem>
</Tabs>
````

### Step 5: Configure CLI tools

[Command-line tools](reference-cli-tools.md) like [`pulsar-admin`](/reference/#/@pulsar:version_reference@/pulsar-admin/), [`pulsar-perf`](/reference/#/@pulsar:version_reference@/pulsar-perf/), and [`pulsar-client`](/reference/#/@pulsar:version_reference@/pulsar-client/) use the `conf/client.conf` config file in a Pulsar installation.

To use mTLS encryption with Pulsar CLI tools, you need to add the following parameters to the `conf/client.conf` file.

```properties
webServiceUrl=https://localhost:8081/
brokerServiceUrl=pulsar+ssl://localhost:6651/
authPlugin=org.apache.pulsar.client.impl.auth.AuthenticationTls
authParams=tlsCertFile:/path/to/admin.cert.pem,tlsKeyFile:/path/to/admin.key-pk8.pem
```

## Configure mTLS encryption with KeyStore

PEM and KeyStore configurations use the same [provider-selection rules](#tls-providers-and-custom-factories). Choosing KeyStore format does not make Conscrypt the default for binary broker connections.

To configure mTLS encryption with KeyStore, complete the following steps:

### Step 1: Generate JKS certificate

You can use Java's `keytool` utility to generate the key and certificate for each machine in the cluster.

```bash
DAYS=365
CLIENT_COMMON_PARAMS="-storetype JKS -storepass clientpw -keypass clientpw -noprompt"
BROKER_COMMON_PARAMS="-storetype JKS -storepass brokerpw -keypass brokerpw -noprompt"

# create keystore
keytool -genkeypair -keystore broker.keystore.jks ${BROKER_COMMON_PARAMS} -keyalg RSA -keysize 2048 -alias broker -validity $DAYS \
-ext SAN=DNS:broker.example.com \
-dname 'CN=broker,OU=Unknown,O=Unknown,L=Unknown,ST=Unknown,C=Unknown'
keytool -genkeypair -keystore client.keystore.jks ${CLIENT_COMMON_PARAMS} -keyalg RSA -keysize 2048 -alias client -validity $DAYS \
-dname 'CN=client,OU=Unknown,O=Unknown,L=Unknown,ST=Unknown,C=Unknown'

# export certificate
keytool -exportcert -keystore broker.keystore.jks ${BROKER_COMMON_PARAMS} -file broker.cer -alias broker
keytool -exportcert -keystore client.keystore.jks ${CLIENT_COMMON_PARAMS} -file client.cer -alias client

# generate truststore
keytool -importcert -keystore client.truststore.jks ${CLIENT_COMMON_PARAMS} -file broker.cer -alias truststore
keytool -importcert -keystore broker.truststore.jks ${BROKER_COMMON_PARAMS} -file client.cer -alias truststore
```

:::note

Replace the example SAN with the DNS names and IP addresses used to reach your broker, for example `-ext SAN=IP:127.0.0.1,IP:192.168.20.2,DNS:broker.example.com`. Supply `-ext` when generating the key pair; it is not an option for all the export/import commands that reuse `BROKER_COMMON_PARAMS`.

:::


### Step 2: Configure brokers

Configure the following parameters in the `conf/broker.conf` file and restrict access to the store files via filesystem permissions.

```properties
brokerServicePortTls=6651
webServicePortTls=8081

# Trusted client certificates are required to connect TLS
# Reject the Connection if the Client Certificate is not trusted.
# In effect, this requires that all connecting clients perform TLS client
# authentication.
tlsRequireTrustedClientCertOnConnect=true
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
brokerClientTlsKeyStoreType=JKS
brokerClientTlsKeyStore=/var/private/tls/client.keystore.jks
brokerClientTlsKeyStorePassword=clientpw
```

To disable non-TLS ports, you need to set the values of `brokerServicePort` and `webServicePort` to empty.

:::note

The default value of `tlsRequireTrustedClientCertOnConnect` is `false`, which represents one-way TLS. When it's set to `true` (mutual TLS is enabled), brokers/proxies require trusted client certificates; otherwise, brokers/proxies reject connection requests from clients.

:::

### Step 3: Configure proxies

Configuring mTLS on proxies includes two directions of connections, from clients to proxies, and from proxies to brokers.

```properties
servicePortTls=6651
webServicePortTls=8081

tlsRequireTrustedClientCertOnConnect=true

# keystore
tlsKeyStoreType=JKS
tlsKeyStore=/var/private/tls/proxy.keystore.jks
tlsKeyStorePassword=brokerpw

# truststore
tlsTrustStoreType=JKS
tlsTrustStore=/var/private/tls/proxy.truststore.jks
tlsTrustStorePassword=brokerpw

# internal client/admin-client config
tlsEnabledWithKeyStore=true
tlsEnabledWithBroker=true
brokerClientTlsEnabledWithKeyStore=true
brokerClientTlsTrustStoreType=JKS
brokerClientTlsTrustStore=/var/private/tls/client.truststore.jks
brokerClientTlsTrustStorePassword=clientpw
brokerClientTlsKeyStoreType=JKS
brokerClientTlsKeyStore=/var/private/tls/client.keystore.jks
brokerClientTlsKeyStorePassword=clientpw
```

### Step 4: Configure clients

Similar to [Configure mTLS encryption with PEM](#configure-clients), you need to provide the TrustStore information for a minimal configuration.

The following is an example.

````mdx-code-block
<Tabs groupId="lang-choice"
  defaultValue="Java client"
  values={[{"label":"Java client","value":"Java client"},{"label":"Java admin client","value":"Java admin client"}]}>
<TabItem value="Java client">

```java
    import org.apache.pulsar.client.api.PulsarClient;

    PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar+ssl://broker.example.com:6651/")
        .useKeyStoreTls(true)
        .tlsTrustStoreType("JKS")
        .tlsTrustStorePath("/var/private/tls/client.truststore.jks")
        .tlsTrustStorePassword("clientpw")
        .tlsKeyStoreType("JKS")
        .tlsKeyStorePath("/var/private/tls/client.keystore.jks")
        .tlsKeyStorePassword("clientpw")
        .enableTlsHostnameVerification(true) // enabled by default
        .allowTlsInsecureConnection(false) // false by default, in any case
        .build();
```

:::note

If you set `useKeyStoreTls` to `true`, be sure to configure `tlsTrustStorePath`.

:::

</TabItem>
<TabItem value="Java admin client">

```java
    PulsarAdmin amdin = PulsarAdmin.builder().serviceHttpUrl("https://broker.example.com:8443")
        .tlsTrustStoreType("JKS")
        .tlsTrustStorePath("/var/private/tls/client.truststore.jks")
        .tlsTrustStorePassword("clientpw")
        .tlsKeyStoreType("JKS")
        .tlsKeyStorePath("/var/private/tls/client.keystore.jks")
        .tlsKeyStorePassword("clientpw")
        .enableTlsHostnameVerification(true) // enabled by default
        .allowTlsInsecureConnection(false) // false by default, in any case
        .build();
```

</TabItem>
</Tabs>
````

### Step 5: Configure CLI tools

For [Command-line tools](reference-cli-tools.md) like [`pulsar-admin`](/reference/#/@pulsar:version_reference@/pulsar-admin/), [`pulsar-perf`](/reference/#/@pulsar:version_reference@/pulsar-perf/), and [`pulsar-client`](/reference/#/@pulsar:version_reference@/pulsar-client/), use the `conf/client.conf` config file in a Pulsar installation.

```properties
authPlugin=org.apache.pulsar.client.impl.auth.AuthenticationKeyStoreTls
authParams={"keyStoreType":"JKS","keyStorePath":"/var/private/tls/client.keystore.jks","keyStorePassword":"clientpw"}
```

## TLS providers and custom factories

Pulsar separates TLS engine selection, JSSE context creation, and JCA material loading:

| Setting in broker/proxy configuration | Purpose |
| --- | --- |
| `tlsProvider` | Binary engine: `JDK`, `OPENSSL`, or `OPENSSL_REFCNT`. Unset selects the native engine when available, otherwise JDK. |
| `jsseProvider` | Named Java security provider for `SSLContext`, such as `SunJSSE`, `Conscrypt`, or `BCJSSE`. When set, uses that provider through the JDK engine. |
| `jcaProvider` | Named provider for loading keys, certificates, and stores. Unset preserves the JVM provider search order. |
| `brokerClientTlsProvider`, `brokerClientJsseProvider`, `brokerClientJcaProvider` | The corresponding selections for the component's outbound client connections. |
| `webServiceTlsProvider`, `webServiceTlsProtocols`, `webServiceTlsCiphers` | HTTPS-listener overrides; unset values inherit their general TLS counterparts. |

Named providers must be available on the classpath and resolvable; an unavailable explicitly selected provider fails initialization. Format and provider are independent: for example, a deployment pinning `jcaProvider=BCFIPS` needs a store type that provider supports, rather than assuming `JKS` works. See [Bouncy Castle providers](security-bouncy-castle.md).

For keys held in an HSM, external credential stores, or a different rotation mechanism, implement `org.apache.pulsar.tls.PulsarTlsFactory` from `org.apache.pulsar:pulsar-tls-factory-api`. Select it with `tlsFactoryClassName` and pass parameters through `tlsFactoryConfig`; select a separate outbound factory with `brokerClientTlsFactoryClassName` and `brokerClientTlsFactoryConfig`. The configuration accepts a JSON object or comma-separated `key=value` parameters. The v4 Java client and admin builders expose `tlsFactoryClassName(...)` and `tlsFactoryConfig(...)`; the v5 builder also accepts a factory instance. See [Custom TLS factories](security-extending.md#custom-tls-factories).

For migration from `PulsarSslFactory` and its configuration keys, follow the [upgrade checklist](administration-upgrade-to-5.0.x-applications.md#check-authentication-tls-and-extensions).


### Certificate rotation

With the built-in file-based factory, `tlsCertRefreshCheckDurationSec` controls periodic certificate refresh in seconds. The default is 300. **Setting it to 0 disables background rotation**; it does not request a certificate refresh on every new listener connection. Restart listeners to load replaced certificates when background rotation is disabled. A failed rebuild retains the last good TLS instance and retries on a later material change. Verify new connections after rotating certificates; existing TLS connections do not renegotiate merely because a file changed. Custom factories implement their own loading and reload behavior.

## Enable TLS Logging

You can enable TLS debug logging at the JVM level by starting the brokers and/or clients with `javax.net.debug` system property. For example:

```shell
-Djavax.net.debug=all
```

For more details, see [Oracle documentation](http://docs.oracle.com/javase/8/docs/technotes/guides/security/jsse/ReadDebug.html).
