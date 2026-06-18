---
id: bookkeeper-metadata-serviceuri
title: BookKeeper Metadata Configuration (metadataServiceUri)
---

# BookKeeper Metadata Configuration (metadataServiceUri)

BookKeeper needs to know where to store ledger metadata so it can place data across different racks (rack-awareness).
There are **three main ways** this is configured, and the behavior changes depending on which one you use.

### **1\. Default Behavior — When You Don’t Configure Anything**

If you leave out **metadataServiceUri** in **bookkeeper.conf**:

1. **BookKeeper looks for these older configs**:
* zkServers → list of ZooKeeper hosts, e.g.:

  | zk1:2181,zk2:2181,zk3:2181 |
  | :---- |

* zkLedgersRootPath `→` where BookKeeper’s metadata is stored in ZooKeeper, e.g.:

  | /ledgers |
  | :---- |

2. **If found**, BookKeeper automatically **builds this old-style URI** internally:

* Often

  | zk+hierarchical:*//zk1:2181,zk2:2181,zk3:2181/ledgers* |
  | :---- |

* But if no layout type is set, it may be:

  | zk+null:*//zk1:2181,zk2:2181,zk3:2181/ledgers* |
  | :---- |

3. If layout type is missing or you explicitly use: **metadataServiceUri=zk+hierarchical://…**.
* BookKeeper may log warnings like:
  Failed to initialize DNS Resolver org.apache.pulsar.zookeeper.ZkBookieRackAffinityMapping, used default subnet resolver because METADATA\_STORE\_INSTANCE failed to init BookieId list
* This URI format works, but it can break **rack-awareness** (Pulsar issue [\#24455](https://github.com/apache/pulsar/issues/24455))
* The warning occurs only if metadataServiceUri=zk+hierarchical://… is used.

* This can happen in Pulsar 3.x or 4.x.

### **2\. Legacy Explicit ZooKeeper Config (Deprecated but Still Works)**

Older setups didn’t have **metadataServiceUri**.
Instead, they used

| zkServers\=zk1:2181,zk2:2181,zk3:2181zkLedgersRootPath\=/ledgers |
| :---- |

BookKeeper still supports this for **backward compatibility**,
but it’s basically the same as the “default” behavior above —
it ends up internally as:

| zk+null:*//zk1:2181,zk2:2181,zk3:2181/ledgers* |
| :---- |

(Sometimes zk+hierarchical://zk1:2181,zk2:2181,zk3:2181/ledgers if a layout type is specified)

* Still works in Pulsar 3.x and 4.x.
* You must set zkLedgersRootPath when using this style.
* This is the “old” way — kept only for backward compatibility.
* New features in Pulsar might not be fully tested with this mode, so plan to migrate.

### **3\. Metadata Service URI (Preferred)**

For new clusters, [Oxia is the recommended metadata store](administration-metadata-store.md). Point BookKeeper at its own Oxia namespace, separate from the Pulsar metadata store (the [Pulsar Helm chart](https://github.com/apache/pulsar-helm-chart) uses `bookkeeper`):

| metadataServiceUri\=metadata-store:oxia://oxia-1.example.com:6648/bookkeeper |
| :---- |

The `metadata-store:` prefix is required and the format differs from Pulsar's `metadataStoreUrl`. The broker's `bookkeeperMetadataServiceUri` in `conf/broker.conf` should be set to this same value.

Alternatively, with ZooKeeper as the metadata store, the **correct and working setup** (from our **OSS Pulsar 4.x tests**) is:

| metadataServiceUri\=metadata-store:zk:pulsar-mini-zookeeper:2181zkLedgersRootPath\=/ledgerszkServers\= |
| :---- |

* Works correctly with rack-awareness in Pulsar 3.x and 4.x.
* In most Pulsar 3.x and 4.x deployments, the correct metadata driver is already enabled, but if needed, set:

| Dbookkeeper.metadata.client.drivers\=org.apache.pulsar.metadata.bookkeeper.PulsarMetadataClientDriver Dbookkeeper.metadata.bookie.drivers\=org.apache.pulsar.metadata.bookkeeper.PulsarMetadataBookieDriver |
| :---- |


#### **Avoid this format**

| metadataServiceUri=zk+hierarchical:*//zk1:2181,zk2:2181,zk3:2181/ledgers* |
| :---- |

* This is because, In Pulsar 3.x and 4.x, rack-awareness may fail with this format.
* This is a known bug — see [Pulsar \#24426](https://github.com/apache/pulsar/issues/24426).
* Use **metadata-store:zk:** instead.

### **Summary :**

Always set **metadataServiceUri** in bookkeeper.conf. For new clusters, [Oxia](administration-metadata-store.md) is the recommended metadata store:

| metadataServiceUri=metadata-store:oxia://oxia-1.example.com:6648/bookkeeper |
| :---- |

With ZooKeeper:

| metadataServiceUri=metadata-store:zk:zk1:2181,zk2:2181,zk3:2181/ledgers |
| :---- |

*  → This is the modern, reliable method. Works well with rack-awareness in Pulsar 3.x and 4.x.

* If you **don’t set it**, BookKeeper will:

  1. Check for old configs zkServers \+ zkLedgersRootPath.

  2. The “warning / failure” only happens with metadataServiceUri=zk+hierarchical://…, not with legacy zkServers.
      → This may cause **rack-awareness to break** in Pulsar 3.x and 4.x.
