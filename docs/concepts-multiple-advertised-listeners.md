---
id: concepts-multiple-advertised-listeners
title: Multiple advertised listeners
sidebar_label: "Multiple advertised listeners"
description: Get a comprehensive understanding of advertised listeners in Pulsar.
---

In production environments, Pulsar clusters often need to serve clients from different networks. The traditional approach for handling external connections is to deploy a [Pulsar Proxy](administration-proxy.md), but in some cases, you might want direct client-to-broker connectivity without using the [Pulsar Proxy](administration-proxy.md). Multiple advertised listeners enable this by allowing brokers to advertise different addresses to different clients.

## Lookup mechanism

When a client performs a lookup for a topic:

1. The client connects to a broker using the service URL.
2. The broker processes the lookup request and determines which broker owns the topic.
3. The broker returns the appropriate advertised address based on which listener the client connected through.
4. The client connects directly to the topic owner using the returned address.

With proper configuration of `bindAddresses`, the broker automatically determines which advertised address to return based on which port the client connected to.

For the service URL, there should be a load balancer that connects to any available broker.

## Use case: Direct client-to-broker connection without Pulsar Proxy

When clients need to connect directly to brokers (bypassing the Pulsar Proxy), multiple advertised listeners are essential. This approach is particularly useful for:

- Reducing network hops by eliminating the proxy layer
- Simplifying deployment architecture in some scenarios
- Potential performance improvements for certain workloads
- Environments where direct broker connectivity is preferred

## Network architecture considerations

> **Note**: Pulsar deployments expect network perimeter security. This type of deployment should be used only in trusted networks with trusted clients while ensuring network security is handled properly.

In typical deployments with multiple networks:

1. **Internal network**: Within the private network, brokers are accessible via private addresses (like 10.x.x.x, 172.16.x.x, or 192.168.x.x) on standard ports.

2. **External network**: For clients outside the private network, network address translation (NAT) maps external addresses/ports to internal broker addresses/ports.

Without proper configuration, external clients would receive internal broker addresses during topic lookups, making successful connections impossible.

## Advertised listeners configuration

Pulsar introduces three key configuration options to solve this problem:

- **advertisedListeners**: Specifies multiple addresses that the broker advertises to clients.
- **bindAddresses**: Maps each advertised listener to a specific local binding address and port.
- **internalListenerName**: Specifies which listener the broker uses for internal communication.

### Configuration details

- **advertisedListeners**: Formatted as `<listener_name>:<protocol>://<host>:<port>,...`. Example:
  `advertisedListeners=internal:pulsar://192.168.1.11:6650,internal:pulsar+ssl://192.168.1.11:6651,external:pulsar://external-broker-1.example.com:6650,external:pulsar+ssl://external-broker-1.example.com:6651`

- **bindAddresses**: Maps each listener name to a local binding address and port. Example:
  `bindAddresses=internal:pulsar://0.0.0.0:6650,internal:pulsar+ssl://0.0.0.0:6651,external:pulsar://0.0.0.0:16650,external:pulsar+ssl://0.0.0.0:16651`

- **internalListenerName**: Specifies which listener is used for internal communication. Example:
  `internalListenerName=internal`

## Configuration example

Here's a complete example showing how to configure brokers with multiple advertised listeners:

```properties
# Define advertised listeners for internal and external clients
advertisedListeners=internal:pulsar://192.168.1.11:6650,internal:pulsar+ssl://192.168.1.11:6651,external:pulsar://external-broker-1.example.com:6650,external:pulsar+ssl://external-broker-1.example.com:6651

# Define bind addresses for each listener
bindAddresses=internal:pulsar://0.0.0.0:6650,internal:pulsar+ssl://0.0.0.0:6651,external:pulsar://0.0.0.0:16650,external:pulsar+ssl://0.0.0.0:16651

# Specify the internal listener name
internalListenerName=internal
```

### Network configuration

To make this work:

1. If you are using DNS names, register a unique name for each broker instance (for example, `external-broker-1.example.com`, `external-broker-2.example.com`, etc.).
2. Configure your network gateway or firewall to handle proxying or NAT for each broker instance so that the external IP and port are proxied to the internal IP and external listener port. The port client connected must equal to external listener port.
3. Add a load balancer that proxies to any healthy available broker on the external listener port.

## Client configuration

With a properly configured broker, clients can connect without specifying a listener name:

In this example, "private-brokers.internal" is the internal load balancer for available brokers, and "external-brokers.example.com" is the external load balancer for available brokers, connecting to the bind address port of the external listener on each broker.

```java
// Internal client using standard protocol
PulsarClient internalClient = PulsarClient.builder()
    .serviceUrl("pulsar://private-brokers.internal:6650")
    .build();

// Internal client using SSL
PulsarClient internalSecureClient = PulsarClient.builder()
    .serviceUrl("pulsar+ssl://private-brokers.internal:6651")
    .build();

// External client with SSL.
// Client -> external-brokers.example.com:6651 -> private-brokers.internal:16651
PulsarClient externalClient = PulsarClient.builder()
    .serviceUrl("pulsar+ssl://external-brokers.example.com:6651")
    .build();
```

> **Note**: While older Pulsar documentation suggested using the `listenerName` parameter in the client configuration, this approach is no longer necessary in cases when the `bindAddresses` is properly configured. The Pulsar lookup mechanism will return the appropriate advertised address based on the binding port.

## Kubernetes deployment suggestions

While Pulsar Proxy is generally recommended for Kubernetes deployments, multiple advertised listeners can be used when direct broker access is required.
The Apache Pulsar Helm chart doesn't currently support this type of deployment. These instructions are provided as general guidance for using the `advertisedListeners` feature in Kubernetes deployments.
There are multiple ways to handle this in Kubernetes deployments. Advertised listeners are also required in some service mesh configurations.

NodePort deployment suggestions:

- Create individual NodePort (or LoadBalancer) services for each broker pod in a broker stateful set, mapping to the external listener binding ports.
- Create a single NodePort (or LoadBalancer) service for the cluster to be used as the serviceUrl for clients, mapping to the external listener binding ports.

```properties
# Advertised listeners for internal and external access
advertisedListeners=internal:pulsar://192.168.1.11:6650,internal:pulsar+ssl://192.168.1.11:6651,external:pulsar://198.51.100.17:30650,external:pulsar+ssl://198.51.100.17:31650

# Bind addresses with different ports for internal and external access
bindAddresses=internal:pulsar://0.0.0.0:6650,internal:pulsar+ssl://0.0.0.0:6651,external:pulsar+ssl://0.0.0.0:16651

# Specify the internal listener name
internalListenerName=internal
```

In the above example:

- `192.168.1.11` is the pod IP for the particular broker pod. The IP or hostname should be dynamically set in this configuration at broker startup.
- `198.51.100.17` is the external IP of the k8s node. In some cases this can be dynamically set based on the `status.hostIP` Kubernetes information.
- `30650` and `31650` are the specific NodePorts allocated for this broker pod. This can be dynamically calculated from a base port number by adding the StatefulSet pod index (`metadata.labels['statefulset.kubernetes.io/pod-index']`) to it.

