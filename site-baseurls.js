const siteUrl = "https://pulsar.apache.org";

const config = {
  siteUrl,
  javadocUrl: `${siteUrl}/api`,
  restApiUrl: `${siteUrl}/admin-rest-api`,
  functionsApiUrl: `${siteUrl}/functions-rest-api`,
  sourceApiUrl: `${siteUrl}/source-rest-api`,
  sinkApiUrl: `${siteUrl}/sink-rest-api`,
  packagesApiUrl: `${siteUrl}/packages-rest-api`,
  transactionsApiUrl: `${siteUrl}/transactions-rest-api`,
  lookupApiUrl: `${siteUrl}/lookup-rest-api`,
  githubUrl: "https://github.com/apache/pulsar",
  githubSiteUrl: "https://github.com/apache/pulsar-site",
  baseUrl: "/",
};

config.restApiBaseUrlMapping = {
  default: config.restApiUrl,
  functions: config.functionsApiUrl,
  source: config.sourceApiUrl,
  sink: config.sinkApiUrl,
  packages: config.packagesApiUrl,
  transactions: config.transactionsApiUrl,
  lookup: config.lookupApiUrl
};

// CommonJS export
module.exports = config;

// Also support ES modules
if (typeof exports === 'object' && typeof module !== 'undefined') {
  Object.defineProperty(exports, '__esModule', { value: true });
  exports.default = config;
} 