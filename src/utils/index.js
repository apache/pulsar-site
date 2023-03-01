const users = require(`../../data/users.js`);
const featuredUsers = users.filter((x) => x.hasOwnProperty("featured"));
featuredUsers.sort((a, b) => (a.featured > b.featured ? 1 : -1));

const versions = require("../../versions.json");
const restApiVersions = require("../../static/swagger/restApiVersions.json");

const siteConfig = require(`../../docusaurus.config.js`);
const compareVersions = require("compare-versions");

export const latestStableVersion = versions[0];

export function imgUrl(img) {
  return siteConfig.baseUrl + "img/" + img;
}

export function docUrl(doc, language, version) {
  // if (version == "" || version == "next") {
  return (
    siteConfig.baseUrl +
    (language ? language + "/" : "") +
    "docs/" +
    (version ? version + "/" : "") +
    (doc ? doc : "")
  );
  // }
  // return (
  //   siteConfig.customFields.oldUrl +
  //   "/docs/" +
  //   (language ? language + "/" : "en/") +
  //   (version ? version + "/" : "") +
  //   (doc ? doc : "standalone/")
  // );
}

export function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}

export function githubUrl() {
  return siteConfig.customFields.githubUrl;
}

export function getCache() {
  const windowGlobal = typeof window !== "undefined" && window;
  if (!windowGlobal) {
    return null;
  }
  return windowGlobal.localStorage;
}

export function setVersion(version) {
  getCache().setItem("version", version == "next" ? "master" : version);
}

export function getVersion() {
  try {
    if (/version=(\d+\.?\x?)+/.test(location.href)) {
      return location.href.match(/version=((\d+\.?\x?)+)/)[1];
    }
  } catch (error) {
    console.error(error)
    return "master";
  }
}

export function getApiVersion(anchor) {
  let version = getVersion();
  let apiVersion = "";
  let _restApiVs = {};
  let _vsGroups = {};
  for (let [key, val] of Object.entries(restApiVersions)) {
    if (key == "master" || compareVersions.compare(key, "2.8.0", "<")) {
      _restApiVs[key] = val;
    } else {
      _restApiVs[key] = val;
      let [one, two] = key.split(".");
      let _tKey = one + "." + two + ".x";
      _vsGroups[_tKey] = [...(_vsGroups[_tKey] || []), key];
    }
  }
  for (let [key, val] of Object.entries(_vsGroups)) {
    let _tKey = val.sort((a, b) => {
      return -compareVersions.compare(b, a, "<");
    })[0];
    _restApiVs[key] = restApiVersions[_tKey];
  }

  if (_restApiVs[version][0]["fileName"].indexOf(anchor) == 0) {
    apiVersion = _restApiVs[version][0]["version"];
  } else {
    apiVersion = _restApiVs[version][1]["version"];
  }

  return apiVersion;
}
