## Client Configurations

If you create a Java client, producer, consumer, or reader, you can use the `loadConf` configurations.

- [Client configurations](/@pulsar:version_reference@/client/client-configuration-client)
- [Producer configurations](/@pulsar:version_reference@/client/client-configuration-producer)
- [Consumer configurations](/@pulsar:version_reference@/client/client-configuration-consumer)
- [Reader configurations](/@pulsar:version_reference@/client/client-configuration-reader)

### Set client memory allocator configs using Java system properties

You can set the client memory allocator configurations through Java properties.<br />

| Property                                | Type   | <div style="width: 110pt"> Description </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Default        | Available values                                                              |
|-----------------------------------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|-------------------------------------------------------------------------------|
| `pulsar.allocator.pooled`               | String | If set to `true`, the client uses a direct memory pool. <br /> If set to `false`, the client uses a heap memory without pool.                                                                                                                                                                                                                                                                                                                                                                                                               | true           | <li> true </li> <li> false </li>                                              |
| `pulsar.allocator.exit_on_oom`          | String | Whether to exit the JVM when OOM happens.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | false          | <li> true </li> <li> false </li>                                              |
| `pulsar.allocator.leak_detection`       | String | The leak detection policy for Pulsar bytebuf allocator. <li> **Disabled**: No leak detection and no overhead. </li> <li> **Simple**: Instruments 1% of the allocated buffer to track for leaks. </li> <li> **Advanced**: Instruments 1% of the allocated buffer to track for leaks, reporting stack traces of places where the buffer is used. </li> <li> **Paranoid**: Instruments 100% of the allocated buffer to track for leaks, reporting stack traces of places where the buffer is used and introduces a significant overhead. </li> | Disabled       | <li> Disabled </li> <li> Simple </li> <li> Advanced </li> <li> Paranoid </li> |
| `pulsar.allocator.out_of_memory_policy` | String | When an OOM occurs, the client throws an exception or fallbacks to heap.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | FallbackToHeap | <li> ThrowException </li> <li> FallbackToHeap </li>                           |

**Example**

```conf
Dpulsar.allocator.pooled=true
Dpulsar.allocator.exit_on_oom=false
Dpulsar.allocator.leak_detection=Disabled
Dpulsar.allocator.out_of_memory_policy=ThrowException
```
