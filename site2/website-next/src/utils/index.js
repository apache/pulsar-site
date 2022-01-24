const users = require(`../../data/users.js`);
const featuredUsers = users.filter((x) => x.hasOwnProperty("featured"));
featuredUsers.sort((a, b) => (a.featured > b.featured ? 1 : -1));

const versions = require("../../versions.json");
const restApiVersions = require("../../static/swagger/restApiVersions.json");

const siteConfig = require(`../../docusaurus.config.js`);

export const latestStableVersion = versions[0];

export function imgUrl(img) {
  return siteConfig.baseUrl + "img/" + img;
}

export function docUrl(doc, language, version) {
  return (
    siteConfig.baseUrl +
    "docs/" +
    (language ? language + "/" : "") +
    (version ? version + "/" : "") +
    (doc ? doc : "")
  );
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
  if (!getCache()) {
    return latestStableVersion;
  }
  return getCache().getItem("version") || latestStableVersion;
}

export function getApiVersion(anchor) {
  let version = getVersion();
  let apiVersion = "";
  if (restApiVersions[version][0]["fileName"].indexOf(anchor) == 0) {
    apiVersion = restApiVersions[version][0]["version"];
  } else {
    apiVersion = restApiVersions[version][1]["version"];
  }
  return apiVersion;
}
