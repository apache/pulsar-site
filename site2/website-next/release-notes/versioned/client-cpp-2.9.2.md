---
id: client-cpp-2.9.2
title: Client CPP 2.9.2 
sidebar_label: Client CPP 2.9.2 
---

- [C++] Fix wrong unit of Access Token Response's `expires_in` field [#14554](https://github.com/apache/pulsar/pull/14554)
- [C++] Fix thread safety issue for multi topic consumer  [#14380](https://github.com/apache/pulsar/pull/14380)
- [C++] Fix pulsar client cpp build fail in gcc-4.8.5 [#14053](https://github.com/apache/pulsar/pull/14053)
- [C++] Fix hasMessageAvailable returns wrong value for last message [#13883](https://github.com/apache/pulsar/pull/13883)
- [C++] Fix in macOS CMake might find error boost-python libs path [#13193](https://github.com/apache/pulsar/pull/13193)
- [C++] Fix libcurl miss auth header when broker return 307 [#13112](https://github.com/apache/pulsar/pull/13112)
- [C++] Define and expose PULSAR_VERSION macro [#12769](https://github.com/apache/pulsar/pull/12769)
- [C++] Fix request timeout for GetLastMessageId doesn't work [#12586](https://github.com/apache/pulsar/pull/12586)
- [C++] Support setting priority for consumers [#12526](https://github.com/apache/pulsar/pull/12526)
- [C++] Fix connection read error logging [#12492](https://github.com/apache/pulsar/pull/12492)
- [C++] Use weak ref to ClientConnection for timeout task [#12409](https://github.com/apache/pulsar/pull/12409)
- [C++] Fix Version.h not found when CMake binary directory is customized [#13324](https://github.com/apache/pulsar/pull/13324)
- [C++] Fix GCC compilation failure caused by warning macro [#14402](https://github.com/apache/pulsar/pull/14402)
- [C++] Fix frequent segmentation fault of Python tests by refactoring ExecutorService [#12427](https://github.com/apache/pulsar/pull/12427)

