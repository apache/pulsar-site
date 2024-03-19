## What's Changed
* Fix ProducerBusy or ConsumerBusy error when configuring multiple brokers per connection by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/337
* Use absolute path to find credential files in unit tests by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/340
* Fix close() returns ResultAlreadyClosed after unsubscribe or close by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/338
* Fix lazy partitioned producer might send duplicated messages by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/342
* Bumped version to 3.5.0-pre by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/344
* Fix crash when removing connection from the pool by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/347
* Log topic lookup result by @erobot in https://github.com/apache/pulsar-client-cpp/pull/351
* Fix bad_weak_ptr when close a ClientConnection during construction by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/350
* Fix the flush callback might be called repeatedly by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/353
* Fix Protobuf symbols not found in libpulsarwithdeps.a when building on macOS by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/354
* Gather the macOS binaries when releasing by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/355
* Fix HTTP lookup segfault when the redirect host cannot be resolved by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/356
* Install Version.h when installing by CMakeLists by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/361
* Add the Consumer::getConsumerName API by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/360
* Fix accessing destroyed objects in the callback of async_wait by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/362
* Fix tlsTrustCertsFilePath config is not applied for OAuth2 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/364
* [feat] [C API] Expose Get/Set Listener Name in C API by @roryschadler in https://github.com/apache/pulsar-client-cpp/pull/370
* Integrate vcpkg to manage dependencies for all platforms by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/371
* Fix the unstable wireshark workflow on macOS by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/374
* [PIP-60] [Proxy-Client] Support SNI routing for Pulsar CPP client by @rdhabalia in https://github.com/apache/pulsar-client-cpp/pull/373
* [fix] Fix issue where custom logger setting is ignored by @massakam in https://github.com/apache/pulsar-client-cpp/pull/377
* Retry on new partition producer creation failure by @erobot in https://github.com/apache/pulsar-client-cpp/pull/378
* Remove the Boost.Random dependency by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/380
* Depend on the independent Asio instead of Boost.Asio by default by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/382
* Fix Boost source code download failure by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/384
* Fix `StartMessageIdInclusive` not work when reader reads from latest msg id by @RobertIndie in https://github.com/apache/pulsar-client-cpp/pull/386
* Fix wrong TimeUtils::currentTimeMillis() implementation by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/387
* Fix the operation timeout is not honored for GetSchema requests by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/383
* [docs] Add example for how to import the library by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/379
* [feat] PIP-307 added assigned broker urls for CloseProudcer and CloseConsumer commands and handler logic by @heesung-sn in https://github.com/apache/pulsar-client-cpp/pull/389
* Pin the Pulsar version to 3.1.1 temporarily for the regression in Pulsar by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/395
* Fix multi-topics consumer could receive old messages after seek  by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/388
* Do not close the socket when the broker failed due to MetadataStoreException by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/390
* Fix an unbalanced release of the producer's pending semaphore by @erobot in https://github.com/apache/pulsar-client-cpp/pull/392
* Disable topic level policies to make tests work for latest Pulsar by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/397
* Fix broken main branch after Pulsar image was upgraded to 3.2.0 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/400
* Fix segmenatation fault if connection is closed during handshake by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/399
* Add codeql code scanning configuration by @merlimat in https://github.com/apache/pulsar-client-cpp/pull/10
* Fix creating producer or consumer is not retried for connection failure by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/396
* Disable batch send for dlq producer. by @shibd in https://github.com/apache/pulsar-client-cpp/pull/403
* [feat] PIP-188 Support blue-green migration by @heesung-sn in https://github.com/apache/pulsar-client-cpp/pull/402
* Fix blue-green migration might be stuck due to an existing reconnection by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/406
* Update dependencies to latest versions by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/404
* Fix the incompatibility with Clang and C++20 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/408
* [improve] add physicalAddress as part of connection pool key by @heesung-sn in https://github.com/apache/pulsar-client-cpp/pull/411
* [CI] Pin the clang-format version to 11 by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/412
* [fix] Change return code of MultiTopicsConsumerImpl::closeAsync after unsubscribe or close by @massakam in https://github.com/apache/pulsar-client-cpp/pull/413
* Fix hasMessageAvailable might return true after seeking to latest by @BewareMyPower in https://github.com/apache/pulsar-client-cpp/pull/409

## New Contributors
* @roryschadler made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/370
* @rdhabalia made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/373
* @heesung-sn made their first contribution in https://github.com/apache/pulsar-client-cpp/pull/389

**Full Changelog**: https://github.com/apache/pulsar-client-cpp/compare/v3.4.0...v3.5.0
