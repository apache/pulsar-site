import React from "react";
import H2 from "../../ui/H/H2";
import H3 from "../../ui/H/H3";
import s from "./WhyPulsar.module.css";

const WhyPulsar: React.FC = () => {
  return (
    <div className={s.WhyPulsar}>
      <div className={s.Content} id="why-pulsar">
        <div className={s.ReadableContent}>
          <div className={s.Title}>
            <H2>Why Apache Pulsar?</H2>
          </div>

          <div className={s.Sections}>
            <div className={s.Section}>
              <H3>Ideal for mission critical workload</H3>
              <ul>
                <li>Zero messages loss guarantee.</li>
                <li>Highly available and fault-tolerant architecture.</li>
                <li>
                  At-most-once, at-least-once, and exactly-once delivery
                  guarantees.
                </li>
                <li>
                  Built-in multi-cluster geo-replication for disaster recovery.
                </li>
                <li>
                  End-to-end encryption (E2EE) is supported out of the box. For
                  many businesses, it's required to satisfy industry-specific
                  compliances and regulations.
                </li>
              </ul>
            </div>
            <div className={s.Section}>
              <H3>Scalable and performant</H3>
              <ul>
                <li>
                  Scale up to millions of messages per second across millions of
                  topics.
                </li>
                <li>
                  Horizontal scaling is fast and easy.
                  <br />
                  Unique design and separate storage layer enable handling the
                  sudden surge in traffic by scaling out in seconds.
                </li>
                <li>Consistent low latency under 5ms.</li>
                <li>Dynamically add producers or consumers.</li>
              </ul>
            </div>
            <div className={s.Section}>
              <H3>Rich administration capabilities</H3>
              <ul>
                <li>Built-in authentication and authorization.</li>
                <li>
                  Multi-tenant logical structure simplifies Pulsar adoption in organization.
                  <br />
                  Pulsar Instance 🡪 Clusters 🡪 Tenants 🡪 Namespaces 🡪 Topics.
                  <br />
                  No need to manage multiple clusters for different teams and
                  projects.
                </li>
                <li>
                  Namespace-level and topic-level policies enable fine-grained
                  control over the behavior of topics.
                </li>
              </ul>
            </div>
            <div className={s.Section}>
              <H3>Great set of built-in features</H3>
              <ul>
                <li>
                  Serverless computing on top of Pulsar with Pulsar Functions.
                  <br />
                  Kubernetes runtime is bundled.
                </li>

                <li>
                  Tiered storage allows to offload data to long-term storage
                  like S3.
                </li>

                <li>
                  Schema registry allows to enforce data consistency and prevent
                  incompatible message format changes.
                  <br />
                  In addition to primitive types, AVRO, Protobuf, JSON, and
                  custom serializers are supported.
                </li>
                <li>
                  Write to and read from external data sources like Spark,
                  Cassandra, MySQL, and others using Pulsar IO.
                  <br />
                  More than 20 official connectors are available.
                </li>
                <li>
                  Query structured data stored in Pulsar with Pulsar SQL using
                  standard SQL.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyPulsar;
