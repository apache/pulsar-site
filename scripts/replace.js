const replace = require("replace-in-file");

const semver = require("semver");
const CWD = process.cwd();
const siteConfig = {url: "https://pulsar.apache.org", baseUrl: "/"};
const nextDocsDir = `${CWD}/docs`;
const docsDir = `${CWD}/versioned_docs`;
const restApiVersions = require("../static/swagger/restApiVersions.json");
const compareVersions = require("compare-versions");

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
  return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-${version}-bin.tar.gz`;
}

function connectorReleaseUrl(version) {
  let v = semver.coerce(version);
  if (v.compareMain("2.3.0") >= 0) {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/connectors`;
  } else {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-io-connectors-${version}-bin.tar.gz`;
  }
}

function offloaderReleaseUrl(version) {
  return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-offloaders-${version}-bin.tar.gz`;
}

function prestoPulsarReleaseUrl(version) {
  return `https://archive.apache.org/dist/pulsar/pulsar-${version}/pulsar-presto-connector-${version}.tar.gz`;
}

function rpmDistUrl(version, type) {
  let v = semver.coerce(version);
  if (v.compareMain("2.11.0") < 0) {
    let resolvedVersion = version;
    if (v.minor === 8) {
      resolvedVersion = "2.8.4";
    } else if (v.minor === 9) {
      resolvedVersion = "2.9.4";
    } else if (v.minor === 10) {
      resolvedVersion = "2.10.2"
    }
    return `https://archive.apache.org/dist/pulsar/pulsar-${resolvedVersion}/RPMS/apache-pulsar-client${type}-${resolvedVersion}-1.x86_64.rpm`;
  } else {
    const versions = require(`${CWD}/data/release-cpp`);
    const ver = versions[0].tagName.substring(1);
    return `https://archive.apache.org/dist/pulsar/pulsar-client-cpp-${ver}/rpm-x86_64/x86_64/apache-pulsar-client${type}-${ver}-1.x86_64.rpm`
  }
}

function debDistUrl(version, type) {
  let v = semver.coerce(version);
  if (v.compareMain("2.11.0") < 0) {
    let resolvedVersion = version;
    if (v.minor === 8) {
      resolvedVersion = "2.8.4";
    } else if (v.minor === 9) {
      resolvedVersion = "2.9.4";
    } else if (v.minor === 10) {
      resolvedVersion = "2.10.2"
    }
    return `https://archive.apache.org/dist/pulsar/pulsar-${resolvedVersion}/DEB/apache-pulsar-client${type}.deb`;
  } else {
    const versions = require(`${CWD}/data/release-cpp`);
    const ver = versions[0].tagName.substring(1);
    return `https://archive.apache.org/dist/pulsar/pulsar-client-cpp-${ver}/deb-x86_64/apache-pulsar-client${type}.deb`
  }
}

function clientPythonVersion(version) {
  if (version === "2.6.4") {
    return "2.6.3";
  }
  let v = semver.coerce(version);
  if (v.compareMain("2.8.0") < 0) {
    return version;
  }
  if (v.compareMain("2.11.0") < 0) {
    if (v.minor === 8) {
      return "2.8.4";
    } else if (v.minor === 9) {
      return "2.9.4";
    } else if (v.minor === 10) {
      return "2.10.2"
    }
  }
  let versions = require(`${CWD}/data/release-python`);
  return `${versions[0].tagName.substring(1)}`;
}

function clientPythonVersionUrl(version) {
  if (version === "2.6.4") {
    return `${siteConfig.url}/api/python/2.6.3`;
  }
  let v = semver.coerce(version);
  if (v.compareMain("2.8.0") < 0) {
    return `${siteConfig.url}/api/python/${version}`;
  }
  if (v.compareMain("2.11.0") < 0) {
    return `${siteConfig.url}/api/python/${v.major}.${v.minor}.x`;
  }
  let versions = require(`${CWD}/data/release-python`);
  return `${siteConfig.url}/api/python/${versions[0].vtag}`;
}

function clientCPPVersionUrl(version) {
  let v = semver.coerce(version);
  if (v.compareMain("2.8.0") < 0) {
    return `${siteConfig.url}/api/cpp/${version}`;
  }
  if (v.compareMain("2.11.0") < 0) {
    return `${siteConfig.url}/api/cpp/${v.major}.${v.minor}.x`;
  }
  let versions = require(`${CWD}/data/release-cpp`);
  return `${siteConfig.url}/api/cpp/${versions[0].vtag}`;
}

function javadocVersionUrl(version, type) {
  return `(${siteConfig.url}/api/${type}/${version}`
}

function referenceVersion(version) {
  let v = semver.coerce(version);
  if (v.compareMain("2.7.0") < 0) {
    return "2.6.x";
  }
  return `${v.major}.${v.minor}.x`;
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

const versions = JSON.parse(require("fs").readFileSync(`${CWD}/versions.json`, "utf8"));
const latestMajorRelease = versions[0];
const latestVersion = getRealVersion(latestMajorRelease);

const from = [
  /@pulsar:version_number@/g,
  /@pulsar:version@/g,
  /@pulsar:version_origin@/g,
  /@pulsar:version_reference@/g,
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

  /@pulsar:version:python@/g,

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
    `${latestVersion}`,
    `next`,
    binaryReleaseUrl(`${latestVersion}`),
    connectorReleaseUrl(`${latestVersion}`),
    offloaderReleaseUrl(`${latestVersion}`),
    prestoPulsarReleaseUrl(`${latestVersion}`),
    downloadPageUrl(),
    rpmDistUrl(`${latestVersion}`, ""),
    rpmDistUrl(`${latestVersion}`, "-debuginfo"),
    rpmDistUrl(`${latestVersion}`, "-devel"),
    debDistUrl(`${latestVersion}`, ""),
    debDistUrl(`${latestVersion}`, "-dev"),

    rpmDistUrl(`${latestVersion}`, ""),
    rpmDistUrl(`${latestVersion}`, "-debuginfo"),
    rpmDistUrl(`${latestVersion}`, "-devel"),
    debDistUrl(`${latestVersion}`, ""),
    debDistUrl(`${latestVersion}`, "-dev"),

    clientPythonVersion(`${latestMajorRelease}`),

    clientPythonVersionUrl(`${latestMajorRelease}`),
    clientCPPVersionUrl(`${latestMajorRelease}`),
    javadocVersionUrl(`${latestMajorRelease}`, "pulsar-functions"),
    javadocVersionUrl(`${latestMajorRelease}`, "client"),
    javadocVersionUrl(`${latestMajorRelease}`, "admin"),

    `${latestVersion}`,

    '<a href="$2" target="_blank">$1</a>',
  ],
  dry: false,
};

doReplace(options);

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
      `${_v}`,
      referenceVersion(v),
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
      clientPythonVersion(`${v}`),
      clientPythonVersionUrl(`${v}`),
      clientCPPVersionUrl(`${v}`),
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
