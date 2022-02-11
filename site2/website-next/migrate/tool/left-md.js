const fs = require("fs");
const path = require("path");

function _log(msg) {
  if (typeof require !== "undefined" && require.main === module) {
    console.log(msg);
  }
}

const left = (version, migratedList) => {
  let vReg = /id:\s*version-(\d\.?)+-(incubating-)?(.*)/;
  let nextReg = /id:\s*(.*)/;
  let list = [];

  let version_full = "version-" + version;
  let src = "../../../website/versioned_docs/" + version_full;
  if (version == "next") {
    src = "../../../docs";
  }
  src = path.join(__dirname, src);
  let docsList = fs.readdirSync(src);
  for (let filename of docsList) {
    let pathname = path.join(src, filename);
    if (fs.statSync(pathname).isDirectory()) {
      continue;
    }
    let data = fs.readFileSync(pathname, "utf8");
    let id = "";
    if (vReg.test(data)) {
      id = vReg.exec(data)[3];
    } else if (nextReg.test(data)) {
      id = nextReg.exec(data)[1];
    }
    if (migratedList.includes(id)) {
      continue;
    }
    // list.push(filename.replace(".md", ""));
    list.push(pathname);
  }
  return list;
};

module.exports = left;

//Test
if (typeof require !== "undefined" && require.main === module) {
  let list = left("2.9.1", [
    "adaptors-kafka",
    "adaptors-spark",
    "adaptors-storm",
    "admin-api-brokers",
    "admin-api-clusters",
    "admin-api-functions",
    "admin-api-namespaces",
    "admin-api-non-partitioned-topics",
    "admin-api-non-persistent-topics",
    "admin-api-overview",
    "admin-api-packages",
    "admin-api-partitioned-topics",
    "admin-api-permissions",
    "admin-api-persistent-topics",
    "admin-api-schemas",
    "admin-api-tenants",
    "admin-api-topics",
    "administration-dashboard",
    "administration-geo",
    "administration-isolation",
    "administration-load-balance",
    "administration-proxy",
    "administration-pulsar-manager",
    "administration-stats",
    "administration-upgrade",
    "administration-zk-bk",
    "client-libraries-cgo",
    "client-libraries-cpp",
    "client-libraries-dotnet",
    "client-libraries-go",
    "client-libraries-java",
    "client-libraries-node",
    "client-libraries-python",
    "client-libraries-websocket",
    "concepts-architecture-overview",
    "concepts-authentication",
    "concepts-clients",
    "concepts-messaging",
    "concepts-multi-tenancy",
    "concepts-multiple-advertised-listeners",
    "concepts-overview",
    "concepts-proxy-sni-routing",
    "concepts-replication",
    "concepts-tiered-storage",
    "concepts-topic-compaction",
    "concepts-transactions",
    "cookbooks-bookkeepermetadata",
    "cookbooks-compaction",
    "cookbooks-deduplication",
    "cookbooks-encryption",
    "cookbooks-message-queue",
    "cookbooks-non-persistent",
    "cookbooks-partitioned",
    "cookbooks-retention-expiry",
    "cookbooks-tiered-storage",
    "deploy-aws",
    "deploy-bare-metal-multi-cluster",
    "deploy-bare-metal",
    "deploy-dcos",
    "deploy-docker",
    "deploy-kubernetes",
    "deploy-monitoring",
    "developing-binary-protocol",
    "developing-load-manager",
    "developing-tools",
    "functions-cli",
    "functions-debug",
    "functions-deploy",
    "functions-develop",
    "functions-metrics",
    "functions-overview",
    "functions-package",
    "functions-runtime",
    "functions-worker",
    "getting-started-clients",
    "getting-started-concepts-and-architecture",
    "getting-started-docker",
    "getting-started-helm",
    "getting-started-pulsar",
    "getting-started-standalone",
    "helm-deploy",
    "helm-install",
    "helm-overview",
    "helm-prepare",
    "helm-tools",
    "helm-upgrade",
    "io-aerospike-sink",
    "io-canal-source",
    "io-cassandra-sink",
    "io-cdc-debezium",
    "io-cdc",
    "io-cli",
    "io-connectors",
    "io-debezium-source",
    "io-debug",
    "io-develop",
    "io-dynamodb-source",
    "io-elasticsearch-sink",
    "io-file-source",
    "io-flume-sink",
    "io-flume-source",
    "io-hbase-sink",
    "io-hdfs2-sink",
    "io-hdfs3-sink",
    "io-influxdb-sink",
    "io-jdbc-sink",
    "io-kafka-sink",
    "io-kafka-source",
    "io-kinesis-sink",
    "io-kinesis-source",
    "io-mongo-sink",
    "io-netty-source",
    "io-nsq-source",
    "io-overview",
    "io-quickstart",
    "io-rabbitmq-sink",
    "io-rabbitmq-source",
    "io-redis-sink",
    "io-solr-sink",
    "io-twitter-source",
    "io-twitter",
    "io-use",
    "performance-pulsar-perf",
    "reference-cli-tools",
    "reference-configuration",
    "reference-connector-admin",
    "reference-metrics",
    "reference-pulsar-admin",
    "reference-terminology",
    "schema-evolution-compatibility",
    "schema-get-started",
    "schema-manage",
    "schema-understand",
    "security-athenz",
    "security-authorization",
    "security-bouncy-castle",
    "security-encryption",
    "security-extending",
    "security-jwt",
    "security-kerberos",
    "security-oauth2",
    "security-overview",
    "security-tls-authentication",
    "security-tls-keystore",
    "security-tls-transport",
    "security-token-admin",
    "sql-deployment-configurations",
    "sql-getting-started",
    "sql-overview",
    "sql-rest-api",
    "tiered-storage-aliyun",
    "tiered-storage-aws",
    "tiered-storage-azure",
    "tiered-storage-filesystem",
    "tiered-storage-gcs",
    "tiered-storage-overview",
    "transaction-api",
    "transaction-guarantee",
    "txn-how",
    "txn-monitor",
    "txn-use",
    "txn-what",
    "txn-why",
    "window-functions-context",
  ]);
  // fs.writeFileSync(path.join(__dirname, "bak.json"), JSON.stringify(list, null, 2));
  console.log(list);
}
