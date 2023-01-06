import React from "react";
import styles from "./HomepageFeatures.module.css";
import ReactMarkdown from "react-markdown";

const FeatureList = (language) => [
  {
    title: "Automatic Load Balancing",
    Svg: require("../../static/img/automatic-load-balancing.svg").default,
    content: "Add or remove nodes and let Pulsar load balance topic bundles automatically. Hot spotted topic bundles are automatically split and evenly distributed across the brokers.",
  },
  {
    title: "Serverless functions",
    Svg: require("../../static/img/proven-in-production.svg").default,
    content:"Write and deploy functions natively using Pulsar Functions. Process messages using Java, Go, or Python without deploying fully-fledged applications. Kubernetes runtime is bundled.",
  },
  {
    title: "Rapid Horizontal Scalability",
    Svg: require("../../static/img/horizontally-scalable.svg").default,
    content: "Scales horizontally to handle the increased load. Its unique design and separate storage layer enable handling the sudden surge in traffic by scaling out in seconds.",
  },
  {
    title: "Low-latency messaging and streaming",
    Svg: require("../../static/img/low-latency.svg").default,
    content:"Acknowledge messages individually (RabbitMQ style) or cumulative per partition (i.e., offset-like). Enables use cases such as distributed work queues or order-preserving data streams at very large scales (hundreds of nodes) and low latency (<5ms).",
  },
  {
    title: "Seamless Geo-Replication",
    Svg: require("../../static/img/geo-replication.svg").default,
    content: "Protect against complete zone outages using replication across different geographic regions. Flexible and configurable replication strategies across distant Pulsar Clusters. Uniquely supports automatic client failover to healthy clusters.",
  },
  {
    title: "Multi-tenancy",
    Svg: require("../../static/img/multi-tenancy.svg").default,
    content:"Maintain one cluster for your entire organization using tenants. Access control across data and actions using tenant policies. Isolate specific brokers to a tenant when maximum noisy neighbor protection is needed.",
  },
  {
    title: "Official multi-language support",
    Svg: require("../../static/img/persistent-storage.svg").default,
    content:"Officially maintained Pulsar Clients for Java, Go, Python, C++, Node.js, and C#.",
  },
  {
    title: "Official 3rd party integrations",
    Svg: require("../../static/img/official-3rd-party-integrations.svg").default,
    content: "Pulsar has officially maintained connectors with popular 3rd parties: MySQL, Elasticsearch, Cassandra, and more. Allows streaming data in (source) or out (sink).",
  },
  {
    title: "Supports up to 1M topics",
    Svg: require("../../static/img/1-M-topics.svg").default,
    content:"REST Admin API for provisioning, administration, tools and monitoring. Can be deployed on bare metal, Kubernetes, Amazon Web Services(AWS), and DataCenter Operating System(DC/OS).",
  },
];

function Feature({ Svg, title, content }) {
  return (
    <div className="col col--4 mb-24 icon-feature">
      <div className="text--left feature-image mb-4 padding-horiz--md">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--left padding-horiz--md">
        <ReactMarkdown children={title} className="text-xl font-bold text-primary" />
        <p className="mt-6">{content}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(props) {
  return (
    <section id="home-features" className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList(props.language || "").map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
