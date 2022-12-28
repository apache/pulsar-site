const replace = require("replace-in-file");

const fs = require("fs");

const CWD = process.cwd();
const siteConfig = require(`${CWD}/docusaurus.config.js`);
const nextDocsDir = `${CWD}/docs`;
const docsDir = `${CWD}/versioned_docs`;
const restApiVersions = require("../static/swagger/restApiVersions.json");
const compareVersions = require("compare-versions");

function getVersions() {
  try {
    return JSON.parse(
      require("fs").readFileSync(`${CWD}/versions.json`, "utf8")
    );
  } catch (error) {
    //console.error(error)
    console.error("no versions found defaulting to 2.1.0");
  }
  return ["2.1.0"];
}

function getRealVersion(version) {
  let versionMap = {};
  let _vsGroups = {};
  for (let [key, val] of Object.entries(restApiVersions)) {
    if (key == "master" || compareVersions.compare(key, "2.8.0", "<")) {
      versionMap[key] = key;
    } else {
      let [one, two] = key.split(".");
      let _tKey = one + "." + two + ".x";
      _vsGroups[_tKey] = [...(_vsGroups[_tKey] || []), key];
    }
  }
  for (let [key, val] of Object.entries(_vsGroups)) {
    let _tKey = val.sort((a, b) => {
      return -compareVersions.compare(b, a, "<");
    })[0];
    versionMap[key] = _tKey;
  }
  return versionMap[version] || version;
}

function downloadPageUrl() {
  return `${siteConfig.baseUrl}download`;
}

function binaryReleaseUrl(version) {
  if (version.includes("incubating")) {
    return `https://archive.apache.org/dist/incubator/pulsar/pulsar-${version}/apache-pulsar-${version}-bin.tar.gz`;
  } else {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-${version}-bin.tar.gz`;
  }
}

function connectorReleaseUrl(version) {
  var versions = version.split(".");
  var majorVersion = parseInt(versions[0]);
  var minorVersion = parseInt(versions[1]);
  if (version.includes("incubating")) {
    return `https://archive.apache.org/dist/incubator/pulsar/pulsar-${version}/apache-pulsar-io-connectors-${version}-bin.tar.gz`;
  } else if (majorVersion > 2 || (majorVersion == 2 && minorVersion >= 3)) {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/connectors`;
  } else {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-io-connectors-${version}-bin.tar.gz`;
  }
}

function offloaderReleaseUrl(version) {
  return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-offloaders-${version}-bin.tar.gz`;
}

function prestoPulsarReleaseUrl(version) {
  if (version.includes("incubating")) {
    return `https://archive.apache.org/dist/incubator/pulsar/pulsar-${version}/pulsar-presto-connector-${version}.tar.gz`;
  } else {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/pulsar-presto-connector-${version}.tar.gz`;
  }
}

function rpmReleaseUrl(version, type) {
  rpmVersion = version.replace("incubating", "1_incubating");
  if (version.includes("incubating")) {
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=incubator/pulsar/pulsar-${version}/RPMS/apache-pulsar-client${type}-${rpmVersion}.x86_64.rpm`;
  } else {
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-${version}/RPMS/apache-pulsar-client${type}-${rpmVersion}-1.x86_64.rpm`;
  }
}

function debReleaseUrl(version, type) {
  if (version.includes("incubating")) {
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=incubator/pulsar/pulsar-${version}/DEB/apache-pulsar-client${type}.deb`;
  } else {
    return `https://www.apache.org/dyn/mirrors/mirrors.cgi?action=download&filename=pulsar/pulsar-${version}/DEB/apache-pulsar-client${type}.deb`;
  }
}

function rpmDistUrl(version, type) {
  rpmVersion = version.replace("incubating", "1_incubating");
  if (version.includes("incubating")) {
    return `https://archive.apache.org/dist/incubator/pulsar/pulsar-${version}/RPMS/apache-pulsar-client${type}-${rpmVersion}.x86_64.rpm`;
  } else {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/RPMS/apache-pulsar-client${type}-${rpmVersion}-1.x86_64.rpm`;
  }
}

function debDistUrl(version, type) {
  if (version.includes("incubating")) {
    return `https://archive.apache.org/dist/incubator/pulsar/pulsar-${version}/DEB/apache-pulsar-client${type}.deb`;
  } else {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/DEB/apache-pulsar-client${type}.deb`;
  }
}

// Specially handle Python and C++ API documents, since they are moved out start from 2.11.0.
function multiClientVersionUrl(version, type) {
  if (type === "python" && version === "2.6.4") {
    // There's no release for Python client 2.6.4. Add this trick to avoid broken link.
    return `${siteConfig.url}/api/${type}/2.6.3`
  }
  return `${siteConfig.url}/api/${type}/${version}`
}

function javadocVersionUrl(version, type) {
  return `(${siteConfig.url}/api/${type}/${version}`
}

function doReplace(options) {
  replace(options)
    .then((changes) => {
      if (options.dry) {
        console.log("Modified files:");
        console.log(changes.join("\n"));
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

const versions = getVersions();

const latestMajorRelease = versions[0];
const latestVersion = getRealVersion(latestMajorRelease);

const from = [
  /@pulsar:version_number@/g,
  /@pulsar:version@/g,
  /pulsar:binary_release_url/g,
  /pulsar:connector_release_url/g,
  /pulsar:offloader_release_url/g,
  /pulsar:presto_pulsar_connector_release_url/g,
  /pulsar:download_page_url/g,
  /@pulsar:rpm:client@/g,
  /@pulsar:rpm:client-debuginfo@/g,
  /@pulsar:rpm:client-devel@/g,
  /@pulsar:deb:client@/g,
  /@pulsar:deb:client-devel@/g,

  /@pulsar:dist_rpm:client@/g,
  /@pulsar:dist_rpm:client-debuginfo@/g,
  /@pulsar:dist_rpm:client-devel@/g,
  /@pulsar:dist_deb:client@/g,
  /@pulsar:dist_deb:client-devel@/g,

  /@pulsar:apidoc:python@/g,
  /@pulsar:apidoc:cpp@/g,
  /\(\/api\/pulsar-functions/g,
  /\(\/api\/client/g,
  /\(\/api\/admin/g,

  /@pulsar:version_number@/g,

  /\[([^\]]*)\]\((\/tools\/pulsar[^\)]*)\)/g,
];

const options = {
  files: [`${nextDocsDir}/*.md`, `${nextDocsDir}/**/*.md`],
  from: from,
  to: [
    `${latestVersion}`,
    `${latestVersion}`,
    binaryReleaseUrl(`${latestVersion}`),
    connectorReleaseUrl(`${latestVersion}`),
    offloaderReleaseUrl(`${latestVersion}`),
    prestoPulsarReleaseUrl(`${latestVersion}`),
    downloadPageUrl(),
    rpmReleaseUrl(`${latestVersion}`, ""),
    rpmReleaseUrl(`${latestVersion}`, "-debuginfo"),
    rpmReleaseUrl(`${latestVersion}`, "-devel"),
    debReleaseUrl(`${latestVersion}`, ""),
    debReleaseUrl(`${latestVersion}`, "-dev"),

    rpmDistUrl(`${latestVersion}`, ""),
    rpmDistUrl(`${latestVersion}`, "-debuginfo"),
    rpmDistUrl(`${latestVersion}`, "-devel"),
    debDistUrl(`${latestVersion}`, ""),
    debDistUrl(`${latestVersion}`, "-dev"),

    multiClientVersionUrl(`${latestMajorRelease}`, "python"),
    multiClientVersionUrl(`${latestMajorRelease}`, "cpp"),
    javadocVersionUrl(`${latestMajorRelease}`, "pulsar-functions"),
    javadocVersionUrl(`${latestMajorRelease}`, "client"),
    javadocVersionUrl(`${latestMajorRelease}`, "admin"),

    `${latestVersion}`,

    '<a href="$2" target="_blank">$1</a>',
  ],
  dry: false,
};

doReplace(options);

// TODO activate and test when first version of docs are cut
// replaces versions
for (let _v of versions) {
  const v = getRealVersion(_v)
  const vWithoutIncubating = v.replace("-incubating", "");
  const opts = {
    files: [
      `${docsDir}/version-${_v}/*.md`,
      `${docsDir}/version-${_v}/**/*.md`,
    ],
    from: from,
    to: [
      `${vWithoutIncubating}`,
      `${v}`,
      binaryReleaseUrl(`${v}`),
      connectorReleaseUrl(`${v}`),
      offloaderReleaseUrl(`${v}`),
      prestoPulsarReleaseUrl(`${v}`),
      downloadPageUrl(),
      rpmDistUrl(`${v}`, ""),
      rpmDistUrl(`${v}`, "-debuginfo"),
      rpmDistUrl(`${v}`, "-devel"),
      debDistUrl(`${v}`, ""),
      debDistUrl(`${v}`, "-dev"),
      rpmDistUrl(`${v}`, ""),
      rpmDistUrl(`${v}`, "-debuginfo"),
      rpmDistUrl(`${v}`, "-devel"),
      debDistUrl(`${v}`, ""),
      debDistUrl(`${v}`, "-dev"),
      multiClientVersionUrl(`${_v}`, "python"),
      multiClientVersionUrl(`${_v}`, "cpp"),
      javadocVersionUrl(`${_v}`, "pulsar-functions"),
      javadocVersionUrl(`${_v}`, "client"),
      javadocVersionUrl(`${_v}`, "admin"),
      `${v}`,
      '<a href="$2" target="_blank">$1</a>',
    ],
    dry: false,
  };
  doReplace(opts);
}
