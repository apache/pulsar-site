---
id: java-tracing
title: OpenTelemetry Tracing for Pulsar Java Client
sidebar_label: "OpenTelemetry Tracing"
---

Follow [Java client setup](java-setup.md) to configure the combined dependency. This guide uses the v4 API (`org.apache.pulsar.client.api`); see [Java client (v5)](java-v5.md) for the v5 API.

The v4 Pulsar Java client provides OpenTelemetry tracing for producer sends and consumer processing. Tracing is disabled by default. Enable it with `ClientBuilder.enableTracing(true)`; the client automatically installs its producer and consumer tracing interceptors.

## Quick start

Configure an OpenTelemetry SDK with a trace exporter, then pass it to the client with `.openTelemetry(openTelemetry)`. The client uses that instance to create spans. **Context propagation uses the propagators from `GlobalOpenTelemetry`**, so register the propagators globally even when you supply an explicit SDK to the client.

The following example registers a W3C trace-context propagator and an OTLP trace exporter. Add `io.opentelemetry:opentelemetry-sdk` and `io.opentelemetry:opentelemetry-exporter-otlp` to your application, using matching OpenTelemetry versions.

```java
import io.opentelemetry.api.trace.propagation.W3CTraceContextPropagator;
import io.opentelemetry.context.propagation.ContextPropagators;
import io.opentelemetry.exporter.otlp.trace.OtlpGrpcSpanExporter;
import io.opentelemetry.sdk.OpenTelemetrySdk;
import io.opentelemetry.sdk.trace.SdkTracerProvider;
import io.opentelemetry.sdk.trace.export.BatchSpanProcessor;
import org.apache.pulsar.client.api.PulsarClient;

OtlpGrpcSpanExporter exporter = OtlpGrpcSpanExporter.builder()
        .setEndpoint("http://localhost:4317")
        .build();
SdkTracerProvider tracerProvider = SdkTracerProvider.builder()
        .addSpanProcessor(BatchSpanProcessor.builder(exporter).build())
        .build();
OpenTelemetrySdk openTelemetry = OpenTelemetrySdk.builder()
        .setTracerProvider(tracerProvider)
        .setPropagators(ContextPropagators.create(W3CTraceContextPropagator.getInstance()))
        .buildAndRegisterGlobal();

PulsarClient client = PulsarClient.builder()
        .serviceUrl("pulsar://localhost:6650")
        .openTelemetry(openTelemetry)
        .enableTracing(true)
        .build();

// Create producers and consumers, send and process messages, then close them.
client.close();
openTelemetry.close();
```

Register the global SDK once per application. Close the client and its producers and consumers before closing the SDK. If your application already has a global SDK, including one supplied by an OpenTelemetry Java agent, you can omit `.openTelemetry(openTelemetry)` and use that global instance. Agent instrumentation is configured separately from Pulsar's built-in `enableTracing` option.

## Trace context propagation

The producer interceptor creates a send span from the current OpenTelemetry context and injects that span's context into message properties. The consumer interceptor extracts those properties to create its processing span. With the W3C propagator configured, `traceparent` carries the trace identity and `tracestate` carries optional vendor information.

When publishing from an HTTP handler or another traced operation, make its extracted context current around the send:

```java
import io.opentelemetry.context.Context;
import io.opentelemetry.context.Scope;

// requestContext is the context extracted by your HTTP instrumentation.
Context requestContext = Context.current();
try (Scope scope = requestContext.makeCurrent()) {
    producer.newMessage().value("order placed").send();
}
```

The consumer interceptor creates a span but does not make it current in your application's processing thread. To connect your application spans to the incoming trace, explicitly extract the message properties and set the parent of your application span. For example:

```java
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.StatusCode;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.Scope;
import io.opentelemetry.context.propagation.TextMapGetter;
import java.util.Map;
import org.apache.pulsar.client.api.Message;

TextMapGetter<Map<String, String>> getter = new TextMapGetter<>() {
    public Iterable<String> keys(Map<String, String> properties) {
        return properties.keySet();
    }
    public String get(Map<String, String> properties, String key) {
        return properties == null ? null : properties.get(key);
    }
};
Tracer tracer = GlobalOpenTelemetry.get().getTracer("order-service");
Message<String> message = consumer.receive();
Context parent = GlobalOpenTelemetry.get().getPropagators().getTextMapPropagator()
        .extract(Context.root(), message.getProperties(), getter);
Span span = tracer.spanBuilder("process-order").setParent(parent).startSpan();
try (Scope scope = span.makeCurrent()) {
    processOrder(message.getValue());
    consumer.acknowledge(message);
} catch (Exception error) {
    span.recordException(error);
    span.setStatus(StatusCode.ERROR);
    consumer.negativeAcknowledge(message);
} finally {
    span.end();
}
```

This application span and the built-in consumer processing span share the producer span as their parent.

## Span attributes

| Attribute | Producer span | Consumer span |
|---|---|---|
| `messaging.system` | `pulsar` | `pulsar` |
| `messaging.destination.name` | Topic returned by the sending producer | Topic from the received message, falling back to the consumer's topic |
| `messaging.operation.name` | `send` | `process` |
| `messaging.destination.subscription.name` | — | Subscription name |
| `messaging.message.id` | Added on broker acknowledgment | Received message ID |
| `messaging.pulsar.acknowledgment.type` | — | How the message's processing span ended |

Producer span names are `send {topic}`; consumer span names are `process {topic}`. A multi-topic consumer uses the actual received topic for each span, and a partitioned producer uses the sending partition's topic. This lets you distinguish partitions and topics in trace queries.

## Span lifecycle and acknowledgment behavior

A producer span ends when the send acknowledgment callback runs. A consumer span starts before message delivery and ends on acknowledgment, negative acknowledgment, acknowledgment timeout, or interceptor cleanup.

Successful consumer acknowledgment callbacks set `messaging.pulsar.acknowledgment.type` to `acknowledge` or `cumulative_acknowledge`. Cumulative acknowledgment ends tracked spans through the acknowledged position in the same topic partition. Negative acknowledgments and acknowledgment timeouts set it to `negative_acknowledge` and `ack_timeout` respectively; these end the messaging span with `OK` status. An exception passed to an acknowledgment callback ends the span with `ERROR` status. Cleanup can end outstanding spans without an acknowledgment-type attribute.

Record business-logic failures on an application span, as in the example above. The interceptor does not observe exceptions thrown by your message handler directly.

## Troubleshooting

If traces are missing, check that `enableTracing(true)` is set, the SDK has a tracer provider and exporter, and the export endpoint is reachable. Adding an OpenTelemetry instance alone does not enable the tracing interceptors.

If producer and consumer spans appear in different traces, check the global propagator configuration and the received message properties. With W3C propagation, the properties should contain `traceparent`. The built-in producer interceptor injects context automatically; no manual tracing interceptor or Pulsar implementation helper is required.
