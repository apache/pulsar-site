---
id: concepts-broker-load-balancing-migration
title: Migration
sidebar_label: "Migration"
---

Pulsar has 3 types of broker load balancers, that is, simple, modular, and extensible. You can perform the following migrations:

Migrate from simple to modular: ??
Migrate from modular to extensible: if you want to use the bundle unloading strategy of TransferShedder.
Migrate from extensible to modular: if you want to use the unloading strategy of OverloadShedder, ThresholdShedder, or UniformLoadShedder

## Considerations

Before migrating from one broker load balancer type to another, review the relationship between [broker load balancer type](./concepts-broker-load-balancing-types.md), Pulsar version, and [bundle unloading strategy](./concepts-broker-load-balancing-concepts.md#bundle-unloading-strategies). You may need to upgrade Pulsar versions or update the [bundle unloading strategy](./concepts-broker-load-balancing-concepts.md#bundle-unloading-strategies). Below are brief summaries.

This broker load balancer type | is available in this Pulsar version
|---|---
Simple|All versions
Modular|1.7 and later
Extensible|3.0 and later

This bundle unloading strategy|is available for this broker load balancer type|in available this Pulsar version
|---|---|---
OverloadShedder|Modular|1.18 and later
ThresholdShedder|Modular|2.6 and later
UniformLoadShedder|Modular|2.10 and later
TransferShedder|Extensible|3.0 and later

## Migrate from simple to modular broker load balancer

You can migrate from the simple to the modular broker load balancer, by manually changing the configuration settings in the broker.conf file or by using the pulsar-admin tool. 

### Manually change broker.conf file 

1. Access to the broker.conf file.

    ```bash
    vim apache-pulsar-@pulsar:version@/conf/broker.conf
    ``````

2. Change the broker load balancer by setting [loadManagerClassName](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1309C20-L1309C20) to ModularLoadManagerImpl in the broker.conf file.

    ```conf
    loadManagerClassName=org.apache.pulsar.broker.loadbalance.extensions.ModularLoadManagerImpl
    ```

3. Restart the Pulsar cluster. The new setting will take effect after the restart.  

### Use pulsar-admin tool

1. Access the [pulsar-admin tool](https://pulsar.apache.org/docs/next/reference-cli-tools/).

    ```bash
    cd apache-pulsar-@pulsar:version@/bin
    ```

2. Set `--config` to `loadManagerClassName` and `--value` to `org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl`.

    ```bash
    pulsar-admin update-dynamic-config \
    --config loadManagerClassName \
    --value org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl
    ```

    You do not need to restart the Pulsar cluster. The new settings will take effect after 1 to 2 minutes.

## Migrate from modular to extensible broker load balancer

You can migrate from the modular to the extensible broker load balancer, by manually changing settings in the broker.conf file.

1. [Upgrade the Pulsar cluster](./helm-upgrade.md) to 3.0.x.

2. Access to the broker.conf file.

    ```bash
    vim apache-pulsar-@pulsar:version@/conf/broker.conf
    ```

3. Change the following settings in the broker.conf file:

   - Update [broker load balancer](./concepts-broker-load-balancing-overview.md) by setting [loadManagerClassName](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1309C20-L1309C20) to `ExtensibleLoadManagerImpl`. 

   - Update [bundle unloading strategy](./concepts-broker-load-balancing-concepts.md#bundle-unloading-strategies) by setting `loadBalancerLoadSheddingStrategy` to `TransferShedder`. 

    ```conf
    loadManagerClassName=org.apache.pulsar.broker.loadbalance.extensions.ExtensibleLoadManagerImpl 

    loadBalancerLoadSheddingStrategy=org.apache.pulsar.broker.loadbalance.extensions.scheduler.TransferShedder
    ```

4. Restart the Pulsar cluster. The new settings will take effect after the restart.  

## Migrate from extensible to modular broker load balancer

You can migrate from the extensible to the modular broker load balancer, by manually changing the setting in the broker.conf file.

1. Access to the broker.conf file.

    ```bash
    vim apache-pulsar-@pulsar:version@/conf/broker.conf
    ```

2. Change the following settings in the broker.conf file:
   
   - Update broker load balancer by setting [loadManagerClassName](https://github.com/apache/pulsar/blob/69d7a2bf14555f11a716a9545c5cf391d8179a27/conf/broker.conf#L1309C20-L1309C20) to ModularLoadManagerImpl
    
   - Update [bundle unloading strategy](./concepts-broker-load-balancing-concepts.md#bundle-unloading-strategies) to OverloadShedder, ThresholdShedder, or UniformLoadShedder based on your needs.

    ```
    loadManagerClassName=org.apache.pulsar.broker.loadbalance.impl.ModularLoadManagerImpl

    loadBalancerLoadSheddingStrategy=org.apache.pulsar.broker.loadbalance.impl.ThresholdShedder
    ```

3. Restart the Pulsar cluster. The new settings will take effect after the restart.  

## Related topics

- To get a comprehensive understanding and discover the key insights, see [Broker load balancing | Overview](./concepts-broker-load-balancing-overview.md). 

- To discover different usage scenarios, see [Broker load balancing | Use cases](./concepts-broker-load-balancing-use-cases.md).
  
- To explore functionalities, see [Broker load balancing | Features](./concepts-broker-load-balancing-features.md).

- To understand advantages, see [Broker load balancing | Benefits](./concepts-broker-load-balancing-benefits.md).

- To learn essential fundamentals, see [Broker load balancing | Concepts](./concepts-broker-load-balancing-concepts.md).

- To review various versions of broker load balancers, see [Broker load balancing | Types](./concepts-broker-load-balancing-types.md).
