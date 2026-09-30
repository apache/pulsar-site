---
id: java-initialize
title: Initialize a Java client
sidebar_label: "Initialize"
description: Learn how to initialize Java client in Pulsar.
---

Follow [Java client setup](java-setup.md) to configure the combined dependency. This guide uses the v4 API (`org.apache.pulsar.client.api`); see [Java client (v5)](java-v5.md) for the v5 API.


You can instantiate a [PulsarClient](@pulsar:javadoc:client@/org/apache/pulsar/client/api/PulsarClient) object using just a URL for the target Pulsar [cluster](pathname:///docs/reference-terminology#cluster) like this:

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .build();
```

If you have multiple brokers, you can initiate a PulsarClient like this:

```java
PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650,localhost:6651,localhost:6652")
        .build();
```

:::note

If you run a cluster in [standalone mode](pathname:///docs/getting-started-standalone), the broker is available at the `pulsar://localhost:6650` URL by default.

:::

For detailed client configurations, see the [reference doc](/reference/#/@pulsar:version_reference@/client/).

## Share resources across client instances

When separate v4 `PulsarClient` instances are needed, for example for different authentication configurations, `PulsarClientSharedResources` can share their memory budget, executors, timers, event loops, and DNS resolver/cache. The clients keep their own producers, consumers, and connections.

To share a memory budget across otherwise isolated clients, select only configured resources with `shareConfigured()`:

```java
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.OpenTelemetry;
import org.apache.pulsar.client.api.PulsarClient;
import org.apache.pulsar.client.api.PulsarClientSharedResources;
import org.apache.pulsar.client.api.SizeUnit;

OpenTelemetry telemetry = GlobalOpenTelemetry.get();
try (PulsarClientSharedResources shared = PulsarClientSharedResources.builder()
        .shareConfigured()
        .configureMemoryLimitController(config -> config.memoryLimit(256, SizeUnit.MEGA_BYTES))
        .configureOpenTelemetry(config -> config.openTelemetry(telemetry))
        .build();
     PulsarClient first = PulsarClient.builder()
        .serviceUrl("pulsar://cluster-a.example.com:6650")
        .sharedResources(shared)
        .openTelemetry(telemetry)
        .build();
     PulsarClient second = PulsarClient.builder()
        .serviceUrl("pulsar://cluster-b.example.com:6650")
        .sharedResources(shared)
        .openTelemetry(telemetry)
        .build()) {
    // Create producers and consumers on either client.
}
```

The shared memory controller's limit replaces the individual clients' memory limits, so pending messages compete for one budget. A zero shared limit disables the cap; configure it explicitly when using shared memory resources. Sharing the controller also shares the pressure signal used to shrink consumer receive queues.

`configureOpenTelemetry` configures the aggregate shared-memory buffer metrics. Set `openTelemetry` on each client as well to configure its other metrics. The application retains responsibility for the telemetry instance's lifecycle.

Without `shareConfigured()` or an explicit `resourceTypes(...)` selection, the builder shares all resource types. Use its event-loop, thread-pool, timer, and DNS configuration methods when you want to share those resources too. Close every client and admin instance using a resource set before closing the shared set; the try-with-resources example closes clients first.

## Use a SOCKS5 proxy

The v4 Java client supports a SOCKS5 proxy for binary broker connections, HTTP/HTTPS lookup, and HTTP failover traffic. Set the proxy address and choose the scope:

```java
import java.net.InetSocketAddress;
import org.apache.pulsar.client.api.Socks5ProxyScope;

PulsarClient client = PulsarClient.builder()
        .serviceUrl("http://broker.example.com:8080")
        .socks5ProxyAddress(InetSocketAddress.createUnresolved("proxy.example.com", 1080))
        .socks5ProxyScope(Socks5ProxyScope.BOTH)
        .build();
```

| Scope | Traffic routed through SOCKS5 |
|---|---|
| `BINARY_ONLY` (default) | Binary broker connections; HTTP lookup and failover traffic connects directly |
| `HTTP_ONLY` | HTTP/HTTPS lookup and failover traffic; binary broker connections connect directly |
| `BOTH` | Binary broker connections and HTTP/HTTPS lookup and failover traffic |

For administrative REST requests, configure the proxy on `PulsarAdmin`:

```java
PulsarAdmin admin = PulsarAdmin.builder()
        .serviceHttpUrl("http://broker.example.com:8080")
        .socks5ProxyAddress(InetSocketAddress.createUnresolved("proxy.example.com", 1080))
        .build();
```

The admin builder applies the proxy to its HTTP traffic automatically; it has no scope selector. If the proxy requires authentication, add `socks5ProxyUsername(...)` and `socks5ProxyPassword(...)` to either builder using your application's credentials. A missing or blank username selects unauthenticated proxy access. These credentials authenticate to the SOCKS5 proxy; configure Pulsar authentication separately when required.
