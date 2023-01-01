---
id: develop-coding-conventions
title: Coding conventions
---

The guidelines help to encourage consistency and best practices among people working on Apache Pulsar code base. You should observe the guidelines unless there is compelling reason to ignore them. Pulsar uses checkstyle to enforce coding style, refer to our [checkstyle rules](https://github.com/apache/pulsar/blob/master/buildtools/src/main/resources/pulsar/checkstyle.xml) for all enforced checkstyle rules.

## Java code style

Apache Pulsar code follows the [Sun Java Coding Convention](http://www.oracle.com/technetwork/java/javase/documentation/codeconvtoc-136057.html), with the following additions.

* Indentation should be **4 spaces**. Tabs should never be used.
* Use curly braces even for single-line ifs and elses.
* No @author tags in any javadoc.
* Use try-with-resources blocks whenever is possible.
* **TODO**s should be associated to at least one issue.

## Dependencies

Apache Pulsar uses the following libraries a lot:

* [Guava](https://github.com/google/guava) as a fundamental core library
* [Netty](http://netty.io/) for network communications and memory buffer management.

Use these libraries whenever possible rather than introducing more dependencies.

Dependencies are bundled with our binary distributions, so you need to attach the relevant licenses when adding new dependencies.

## Future

`CompletableFuture` introduce in Java 8 is preferred over Guava's `ListenableFuture`. Use `CompletableFuture` whenever possible.

## Memory

Use netty `ByteBuf` over `java.nio.ByteBuffer` for internal usage. As Pulsar uses Netty Buffer for memory management.

## Logging

* Logging should be taken seriously. Please take the time to access the logs when making a change to ensure that the important things are getting logged and there is no junk there.
* Logging statements should be complete sentences with proper capitalization that are written to be read by a person not necessarily familiar with the source code.
* All logs should be done with **SLF4j**, never `System.out` or `System.err`.

### Logging levels

* **INFO** is the level you should assume the software will be run in. INFO messages are things which are not bad but which the user will definitely want to know about every time they occur.
* **TRACE** and **DEBUG** are both things you turn on when something is wrong, and you want to figure out what is going on. **DEBUG** should not be so fine-grained that it will seriously affect performance of the program. **TRACE** can be anything. You should wrap DEBUG and TRACE statements in the `if (logger.isDebugEnabled())` or `if (logger.isTraceEnabled())` check to avoid performance degradation.
* **WARN** and **ERROR** indicate something that is *BAD*. Use WARN if you aren't totally sure it is bad, and ERROR if you are.

Log the stack traces at **ERROR** level, but never at **INFO** level or below. You can log at **WARN** level if you are interested in debugging.

## Monitoring

* Any new features should come with appropriate metrics, so monitoring the feature is working correctly.
* Those metrics should be taken seriously and only export useful metrics that would be used on production on monitoring/alerting healthy of the system, or troubleshooting problems.

## Unit tests

* New changes should come with unit tests that verify the functionality being added.
* Unit tests should test the least amount of code possible. Don't start the whole server unless there is no other way to test a single class or small group of classes in isolation.
* Tests should not depend on any external resources. They need to set up and teardown their own stuff.
* It is okay to use the filesystem and network in tests since that's our business, but you need to clean up them after test.
* DO NOT use sleep or other timing assumptions in tests. It is wrong and will fail intermittently on any test server with other things going on that causes delays.
* You'd better add a timeout value to all test cases, to prevent a build from completing indefinitely. For example, `@Test(timeout=60000)`.

## Configuration

* When you use the config files, think of the names from the very beginning.
* If you run the program without tuning parameters, use the default values.
* All configuration settings should be added accordingly in the [default configuration file](https://github.com/apache/pulsar/tree/master/conf) directory and documented accordingly.

## Concurrency

Apache Pulsar is a low latency system, it is implemented as a purely asynchronous service, which is accomplished as follows:

* All public classes should be **thread-safe**.
* Prefer using [OrderedExecutor](https://github.com/apache/bookkeeper/blob/master/bookkeeper-common/src/main/java/org/apache/bookkeeper/common/util/OrderedExecutor.java) for executing any asynchronous actions. The mutations to the same instance should be submitted to the same thread to execute.
* If synchronization and locking are required, they should be in a fine granularity way.
* All threads should have proper meaningful name.
* If a class is not thread-safe, it should be annotated [@NotThreadSafe](https://github.com/misberner/jsr-305/blob/master/ri/src/main/java/javax/annotation/concurrent/NotThreadSafe.java). The instances that use this class is responsible for its synchronization.

## Backwards compatibility

* Wire protocol should support backwards compatibility to enable no-downtime upgrades. This means the servers **MUST** be able to support requests from both old and new clients simultaneously.
* Metadata formats and data formats should support backwards compatibility.
