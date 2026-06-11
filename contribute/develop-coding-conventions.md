---
id: develop-coding-conventions
title: Coding conventions
---

The guidelines help to encourage consistency and best practices among people working on Apache Pulsar code base. You should observe the guidelines unless there is compelling reason to ignore them.

The **canonical coding reference** for the Pulsar `master` branch is [`CODING.md`](https://github.com/apache/pulsar/blob/master/CODING.md) in the apache/pulsar repository. It is the always-up-to-date version of these conventions and covers each topic in more depth, with code examples. This page summarizes the key points.

:::note

Some conventions below — most notably [slog](https://github.com/merlimat/slog) logging — apply to the `master` branch only. When contributing to a maintenance branch, follow the conventions of the surrounding code in that branch.

:::

## Java code style

Apache Pulsar code follows the [Sun Java Coding Convention](http://www.oracle.com/technetwork/java/javase/documentation/codeconvtoc-136057.html), with the following additions.

* Indentation should be **4 spaces**. Tabs should never be used.
* Use curly braces even for single-line ifs and elses.
* No @author tags in any javadoc.
* Prefer imports over fully qualified class names in code. Use a fully qualified class name only when needed to disambiguate a name collision that imports cannot resolve.
* Every **TODO** must reference a GitHub issue, e.g. `// TODO: https://github.com/apache/pulsar/issues/XXXX`.

Pulsar uses checkstyle to enforce coding style, refer to the [checkstyle rules](https://github.com/apache/pulsar/blob/master/buildtools/src/main/resources/pulsar/checkstyle.xml) for all enforced checkstyle rules. Lombok is enabled in the codebase.

## Logging

See [`CODING.md` → Logging](https://github.com/apache/pulsar/blob/master/CODING.md#logging) for the details.

* On `master`, prefer **[slog](https://github.com/merlimat/slog)** (`io.github.merlimat.slog`) via Lombok's **`@CustomLog`**. **SLF4J is deprecated** for new code; never use `System.out` or `System.err`.
* **Default new logs to `TRACE`/`DEBUG`, not `INFO`** — Pulsar overuses `INFO` and floods production logs. Reserve `INFO` for low-frequency lifecycle and state-change events. Use `DEBUG` in a way where it could be enabled in production without causing too many log entries; use `TRACE` for more detailed information.
* Attach data as **structured attributes** — `log.info().attr("topic", topic).log("Published")` — not interpolated into the message string.
* For expensive `DEBUG`/`TRACE` values, don't guard with `isDebugEnabled()`/`isTraceEnabled()`; use slog's lazy form — `log.debug().attr("dump", () -> expensiveDump()).log("...")`.
* Avoid logging on hot paths, and stack traces at `INFO` or lower.

## Asynchronous programming

See [`CODING.md` → Asynchronous programming](https://github.com/apache/pulsar/blob/master/CODING.md#asynchronous-programming) for the details and code examples.

* `CompletableFuture` is preferred over Guava's `ListenableFuture` for new code.
* **A method returning `CompletableFuture` must not throw synchronously.** Propagate failures — including argument-validation failures — through the returned future with `CompletableFuture.failedFuture(e)`.
* **Never block on event-loop / async-execution threads** — no `Thread.sleep`, `Future.get()`, `CompletableFuture.join()`, or blocking IO.
* Avoid nested futures (`CompletableFuture<CompletableFuture<T>>`); flatten with `thenCompose`. Prefer `OrderedExecutor` for ordered asynchronous work.
* Limit concurrency and handle backpressure when firing many async operations.

## Dependencies

Prefer existing dependencies over new libraries. Pulsar commonly uses Apache Commons / [Guava](https://github.com/google/guava) (utilities), FastUtil (type-specific collections), JCTools (concurrent structures), RoaringBitmap (compressed bitsets), Caffeine (caching), Jackson (JSON), Prometheus / OpenTelemetry (metrics), and [Netty](http://netty.io/) (networking and buffers).

A new dependency must be justified (why existing ones are insufficient), and dependencies are bundled with the binary distributions, so the bundled-dependency `LICENSE`/`NOTICE` files must be updated — verify with `./gradlew checkBinaryLicense`. See [License header](testing-licenses.md).

## Resource and memory management

* Always close resources (streams, connections, executors, buffers) — prefer try-with-resources.
* On internal networking/messaging paths, prefer Netty `ByteBuf` over `java.nio.ByteBuffer` unless an external API requires it; release ref-counted buffers you allocate.
* Don't hand-optimize allocation away — Pulsar runs on ZGC, where short-lived allocations are cheap. Don't add new Netty `Recycler` usage; see [`CODING.md` → Resource and memory management](https://github.com/apache/pulsar/blob/master/CODING.md#resource-and-memory-management).

## Monitoring

* Any new features should come with appropriate metrics, so monitoring the feature is working correctly.
* Those metrics should be taken seriously and only export useful metrics that would be used on production on monitoring/alerting healthy of the system, or troubleshooting problems.

## Testing conventions

See [`CODING.md` → Testing conventions](https://github.com/apache/pulsar/blob/master/CODING.md#testing-conventions) for the details.

* Tests use **TestNG + Mockito**. Prefer **AssertJ** assertions (with descriptions) over TestNG asserts; use **Awaitility** for async conditions instead of `sleep` timing, with timeouts to prevent hangs.
* Every feature or bug fix needs **deterministic** tests for edge and failure cases. A bug-fix test must fail on the unpatched code for the real reason.
* **No reflection into private state** (`WhiteboxImpl`, `setAccessible(true)`). Expose a package-private `@VisibleForTesting` accessor and put the test in the same package.
* New integration-style tests should extend `SharedPulsarBaseTest`, use `getNamespace()` and `newTopicName()`, and never hardcode namespace/topic names.
* Close and release what the test allocates; a `ByteBuf` leak detected by the pooled allocator is a real bug.
* Validate performance optimizations with a JMH benchmark under `microbench/`.

For how to *run* tests (scoping with `--tests`, test groups, integration tests), see [Setup and building](setup-building.md) and [`CONTRIBUTING.md` → Running tests](https://github.com/apache/pulsar/blob/master/CONTRIBUTING.md#running-tests).

## Configuration

* When adding configuration options, use clear, descriptive names and provide sensible defaults.
* If you run the program without tuning parameters, use the default values.
* All configuration settings should be added accordingly in the [default configuration file](https://github.com/apache/pulsar/tree/master/conf) directory and documented accordingly.

## Concurrency

See [`CODING.md` → Concurrency](https://github.com/apache/pulsar/blob/master/CODING.md#concurrency) for the details, including the Java-Memory-Model guidance.

Apache Pulsar is a low latency system, it is implemented as a purely asynchronous service, which is accomplished as follows:

* All public classes should be **thread-safe**. If a class is not thread-safe, it should be annotated [@NotThreadSafe](https://github.com/misberner/jsr-305/blob/master/ri/src/main/java/javax/annotation/concurrent/NotThreadSafe.java).
* Protect shared mutable state; prefer fine-grained synchronization. Prefer the **single-writer principle** (a given piece of state mutated by only one thread) to avoid concurrent mutation entirely.
* **Minimize work while holding a lock** — never call out to listener/callback code while holding a lock.
* Prefer using [OrderedExecutor](https://github.com/apache/bookkeeper/blob/master/bookkeeper-common/src/main/java/org/apache/bookkeeper/common/util/OrderedExecutor.java) for executing any asynchronous actions. The mutations to the same instance should be submitted to the same thread to execute.
* All threads should have proper meaningful name. When creating thread pools, prefer Netty's `io.netty.util.concurrent.DefaultThreadFactory`.
* **Prefer immutable objects**, and conform to the Java Memory Model — a field accessed by more than one thread needs explicit visibility (`volatile`, or the same lock guarding every read *and* write).

## Backwards compatibility

See [`CODING.md` → Backward compatibility](https://github.com/apache/pulsar/blob/master/CODING.md#backward-compatibility) for the details.

* Changes must not break public APIs, client compatibility, wire-protocol compatibility, or serialized/metadata formats. The servers **MUST** be able to support requests from both old and new clients simultaneously to enable no-downtime upgrades.
* **Plugin / SPI extension points are public API** — interfaces selected by a `*ClassName` configuration setting (e.g. `AuthorizationProvider`, `EntryFilter`, `BrokerInterceptor`) have third-party implementations. Changing such an interface generally needs a PIP and must not land in maintenance-branch backports.
* Introduce new or changed behaviour behind a backward-compatible default — opt-in via configuration rather than silently changing existing deployments.
