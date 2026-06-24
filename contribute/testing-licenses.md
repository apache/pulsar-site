---
id: testing-licenses
title: License header
---

All code contributed to Pulsar will be licensed under [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). You need to ensure every new files you are adding have the right license header. On the `master` branch, license headers are enforced by Spotless and the Apache Rat check. You can add license headers to your files by running the following command:

```bash
./gradlew spotlessApply
```

Verify license headers (and formatting / checkstyle) before pushing:

```bash
./gradlew rat spotlessCheck checkstyleMain checkstyleTest
```

When you add or change a runtime dependency, the bundled-dependency `LICENSE`/`NOTICE` files of the binary distributions must be updated as well. Verify the coverage with:

```bash
./gradlew checkBinaryLicense
```
