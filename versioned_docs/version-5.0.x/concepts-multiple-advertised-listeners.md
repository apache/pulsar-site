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
2. Configure your network gateway or firewall to handle proxying or NAT for each broker instance so that the external IP and port are proxied to the internal IP and external listener port.
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

// External client with SSL
PulsarClient externalClient = PulsarClient.builder()
    .serviceUrl("pulsar+ssl://external-brokers.example.com:6651")
    .build();
```

> **Note**: While older Pulsar documentation suggested using the `listenerName` parameter in the client configuration, this approach is no longer necessary in cases when the `bindAddresses` is properly configured. The Pulsar lookup mechanism will return the appropriate advertised address based on the binding port.

## Kubernetes deployment suggestions

While Pulsar Proxy is generally recommended for Kubernetes deployments, multiple advertised listeners can be used when direct broker access is required.
The Apache Pulsar Helm chart doesn't currently support this type of deployment. These instructions are provided as general guidance for using the `advertisedListeners` feature in Kubernetes deployments.
There are multiple ways to handle this in Kubernetes deployments. Advertised listeners are also required in some service mesh configurations.

> **Security notice**: Pulsar's design assumes the cluster sits behind network perimeter security; broker client and admin APIs are not safe to publish on the public internet. Use internal load balancers on private networks whenever possible. If external exposure is unavoidable, restrict access to authorized IP ranges with the Service's [`loadBalancerSourceRanges`](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/#preserving-the-client-source-ip) field (or equivalent firewall rules), and ensure TLS and authentication are fully configured. Pulsar's design assumes that deployments will be protected by network perimeter security measures.

A complete deployment requires two kinds of services:

1. **A cluster-wide service URL.** A LoadBalancer service (for example, `external-brokers.example.com`) that fronts all healthy broker pods. The service's external port can be the standard Pulsar TLS port `6651`, which the LoadBalancer maps to the brokers' external listener bind port (for example, `16651`). Clients use this address as their `serviceUrl` for topic lookups; the lookup response then redirects each client to the specific broker that owns the topic, which is accessed via the per-broker-pod service described below.

2. **A per-broker-pod service.** One service per broker pod that targets only that pod and exposes its external listener bind port. The external FQDN/IP and port of this per-pod service must exactly match the address the broker advertises for its `external` listener in `advertisedListeners`; otherwise the lookup response will return an address that clients cannot reach. Two options are described below — pick one based on your TLS and cost requirements.

### Option 1: NodePort service per broker pod

Create one NodePort service for each broker pod, mapping to the external listener binding ports for that pod. Clients reach brokers via `<node-ip-or-hostname>:<node-port>`.

- Cost: no extra cloud infrastructure is required — traffic enters through ports on existing cluster nodes.
- Network reachability: this option is suitable when clients reach broker nodes over a private network (for example, a VPC, on-prem network, or VPN). Because public internet exposure is not a supported configuration for Pulsar, firewall rules require special attention with NodePort: the chosen ports are opened on every node, so node-level firewalls, cloud security groups, and network policies must be reviewed to ensure those ports are reachable only from authorized client networks.
- TLS challenges: the certificate presented by the broker must match the hostname or IP that clients actually connect to. Node IPs are often unstable in self-managed clusters, and hostname verification fails unless you provision stable DNS pointing to the nodes (or include IP SANs in the certificate). Reusing a single wildcard certificate across brokers requires every client-facing entry point to resolve under that wildcard domain, which is awkward when clients connect directly to node IPs.

### Option 2: LoadBalancer service per broker pod

Create one LoadBalancer service for each broker pod, mapping to the external listener binding ports for that pod.

- Cost: each LoadBalancer is a separate cloud resource with a recurring cost. For N brokers you pay for N load balancers.
- TLS is easier: you control a stable DNS name per LoadBalancer (for example, `pulsar-broker-0.example.com`) and issue certificates against those names. Clients connect by hostname, so standard hostname verification works without special configuration.

### Targeting a specific broker pod (applies to both options)

Regardless of which service type you choose, each per-pod service must select exactly one broker pod by including the `statefulset.kubernetes.io/pod-name` label in its selector (for example, `statefulset.kubernetes.io/pod-name: pulsar-broker-0`). This label is automatically applied by the StatefulSet controller to every pod and ensures traffic for a given broker's external listener port reaches the broker pod whose `advertisedListeners` configuration matches the service's external address and port. On Kubernetes 1.32 or later, the stable `apps.kubernetes.io/pod-index` label (for example, `apps.kubernetes.io/pod-index: "0"`) can be used in the selector instead.

### Example broker configuration for the LoadBalancer per broker pod case

```properties
# Advertised listeners — "internal" uses the StatefulSet headless service DNS name,
# "external" uses the stable DNS of this broker's LoadBalancer
advertisedListeners=internal:pulsar://pulsar-broker-0.pulsar-broker-headless.pulsar.svc.cluster.local:6650,internal:pulsar+ssl://pulsar-broker-0.pulsar-broker-headless.pulsar.svc.cluster.local:6651,external:pulsar://pulsar-broker-0.example.com:6650,external:pulsar+ssl://pulsar-broker-0.example.com:6651

# Bind addresses — "external" binds use a different local port range than "internal"
bindAddresses=internal:pulsar://0.0.0.0:6650,internal:pulsar+ssl://0.0.0.0:6651,external:pulsar://0.0.0.0:16650,external:pulsar+ssl://0.0.0.0:16651

# Specify the internal listener name
internalListenerName=internal
```

In the above example:

- `pulsar-broker-0.pulsar-broker-headless.pulsar.svc.cluster.local` is the per-pod FQDN provided by the StatefulSet's headless service (format: `<pod-name>.<headless-service-name>.<namespace>.svc.cluster.local`). It is stable across pod restarts and re-resolves to the current pod IP, so it should be used for the `internal` listener instead of the pod IP. The pod's own FQDN is set dynamically per pod (typically via `metadata.labels['statefulset.kubernetes.io/pod-name']` and a known headless service and namespace).
- `pulsar-broker-0.example.com` is the stable DNS name assigned to the LoadBalancer service that targets this broker pod (using a `statefulset.kubernetes.io/pod-name: pulsar-broker-0` selector). Each broker pod has its own DNS name, set dynamically per pod.
- The per-broker LoadBalancer maps external ports `6650` and `6651` to the broker's external listener bind ports `16650` and `16651`. Using the standard Pulsar ports externally lets the same DNS name and certificate work for both the cluster-wide service URL and the per-pod LoadBalancer.