import semver from "semver";
import * as compareVersions from "compare-versions";

import versionsList from "../../versions.json";
import restApiVersions from "../../static/swagger/restApiVersions.json";

// CommonJS modules without type declarations — typed inline below.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const urlConfig: {
  siteUrl: string;
  baseUrl: string;
} = require("../../site-baseurls");

type ClientRelease = {tagName: string; vtag: string};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const releaseCpp: ClientRelease[] = require("../../data/release-cpp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const releasePython: ClientRelease[] = require("../../data/release-python");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const releasePulsarAdapters: string[] = require("../../data/release-pulsar-adapters");

export const pulsarAdaptersVersion: string = releasePulsarAdapters[0];

const versions = versionsList as string[];

export const latestMajorRelease: string = versions[0];

// LTS major version. Kept in sync with `_ltsVersion` in src/theme/DocVersionBanner/index.js.
export const ltsMajorRelease: string = "4.0.x";

export function getRealVersion(version: string): string {
  const versionMap: Record<string, string> = {};
  const vsGroups: Record<string, string[]> = {};
  for (const key of Object.keys(restApiVersions as Record<string, unknown>)) {
    if (key === "master" || compareVersions.compare(key, "2.8.0", "<")) {
      versionMap[key] = key;
    } else {
      const [major, minor] = key.split(".");
      const groupKey = `${major}.${minor}.x`;
      vsGroups[groupKey] = [...(vsGroups[groupKey] || []), key];
    }
  }
  for (const [groupKey, members] of Object.entries(vsGroups)) {
    const latest = members.sort((a, b) => -compareVersions.compare(b, a, "<"))[0];
    versionMap[groupKey] = latest;
  }
  return versionMap[version] || version;
}

export const latestVersion: string = getRealVersion(latestMajorRelease);

export const ltsVersion: string = getRealVersion(ltsMajorRelease);

export function downloadPageUrl(): string {
  return `${urlConfig.baseUrl}download`;
}

export function binaryReleaseUrl(version: string): string {
  return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-${version}-bin.tar.gz`;
}

export function connectorReleaseUrl(version: string): string {
  const v = semver.coerce(version)!;
  if (v.compareMain("2.3.0") >= 0) {
    return `https://archive.apache.org/dist/pulsar/pulsar-${version}/connectors`;
  }
  return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-io-connectors-${version}-bin.tar.gz`;
}

export function offloaderReleaseUrl(version: string): string {
  return `https://archive.apache.org/dist/pulsar/pulsar-${version}/apache-pulsar-offloaders-${version}-bin.tar.gz`;
}

export function prestoPulsarReleaseUrl(version: string): string {
  return `https://archive.apache.org/dist/pulsar/pulsar-${version}/pulsar-presto-connector-${version}.tar.gz`;
}

// For Pulsar 2.8–2.10 the client binaries are republished under a fixed
// patch version; newer majors use the pulsar-client-cpp release line instead.
function legacyDistVersion(version: string): string | null {
  const v = semver.coerce(version)!;
  if (v.compareMain("2.11.0") >= 0) return null;
  if (v.minor === 8) return "2.8.4";
  if (v.minor === 9) return "2.9.4";
  if (v.minor === 10) return "2.10.2";
  return version;
}

export function rpmDistUrl(version: string, type: string): string {
  const legacy = legacyDistVersion(version);
  if (legacy !== null) {
    return `https://archive.apache.org/dist/pulsar/pulsar-${legacy}/RPMS/apache-pulsar-client${type}-${legacy}-1.x86_64.rpm`;
  }
  const ver = releaseCpp[0].tagName.substring(1);
  return `https://archive.apache.org/dist/pulsar/pulsar-client-cpp-${ver}/rpm-x86_64/x86_64/apache-pulsar-client${type}-${ver}-1.x86_64.rpm`;
}

export function debDistUrl(version: string, type: string): string {
  const legacy = legacyDistVersion(version);
  if (legacy !== null) {
    return `https://archive.apache.org/dist/pulsar/pulsar-${legacy}/DEB/apache-pulsar-client${type}.deb`;
  }
  const ver = releaseCpp[0].tagName.substring(1);
  return `https://archive.apache.org/dist/pulsar/pulsar-client-cpp-${ver}/deb-x86_64/apache-pulsar-client${type}.deb`;
}

export function clientPythonVersion(version: string): string {
  if (version === "2.6.4") return "2.6.3";
  const v = semver.coerce(version)!;
  if (v.compareMain("2.8.0") < 0) return version;
  if (v.compareMain("2.11.0") < 0) {
    if (v.minor === 8) return "2.8.4";
    if (v.minor === 9) return "2.9.4";
    if (v.minor === 10) return "2.10.2";
  }
  return releasePython[0].tagName.substring(1);
}

export function clientPythonVersionUrl(version: string): string {
  if (version === "2.6.4") return `${urlConfig.siteUrl}/api/python/2.6.3`;
  const v = semver.coerce(version)!;
  if (v.compareMain("2.8.0") < 0) return `${urlConfig.siteUrl}/api/python/${version}`;
  if (v.compareMain("2.11.0") < 0) return `${urlConfig.siteUrl}/api/python/${v.major}.${v.minor}.x`;
  return `${urlConfig.siteUrl}/api/python/${releasePython[0].vtag}`;
}

export function clientCPPVersionUrl(version: string): string {
  const v = semver.coerce(version)!;
  if (v.compareMain("2.8.0") < 0) return `${urlConfig.siteUrl}/api/cpp/${version}`;
  if (v.compareMain("2.11.0") < 0) return `${urlConfig.siteUrl}/api/cpp/${v.major}.${v.minor}.x`;
  return `${urlConfig.siteUrl}/api/cpp/${releaseCpp[0].vtag}`;
}

export function javadocVersionUrl(version: string, type: string): string {
  return `${urlConfig.siteUrl}/api/${type}/${version}`;
}

export function referenceVersion(version: string): string {
  const v = semver.coerce(version)!;
  if (v.compareMain("2.7.0") < 0) return "2.6.x";
  return `${v.major}.${v.minor}.x`;
}

/**
 * Token → replacement value for a given version key.
 * `"current"` → next/current docs; any other string is an origin version
 * from versions.json (e.g. "3.0.x", "2.10.x", "2.6.4").
 *
 * Keys are the bare token names (e.g. `"version_number"`, `"javadoc:client"`);
 * the preprocessor wraps them as `@pulsar:<key>@` when matching.
 */
export function resolveTokens(versionKey: string): Map<string, string> {
  const isCurrent = versionKey === "current";
  const originVersion = isCurrent ? latestMajorRelease : versionKey;
  const resolvedVersion = getRealVersion(originVersion);

  // Quirks preserved for behavioral compatibility:
  //   - current docs: version_origin = resolvedVersion (not origin)
  //   - versioned docs: version_number strips any -incubating suffix
  const versionNumber = isCurrent ? resolvedVersion : resolvedVersion.replace("-incubating", "");
  const versionOrigin = isCurrent ? resolvedVersion : originVersion;
  const versionReference = isCurrent ? "next" : referenceVersion(resolvedVersion);
  const pythonArg = isCurrent ? originVersion : resolvedVersion;

  return new Map<string, string>([
    ["version_number", versionNumber],
    ["version", resolvedVersion],
    ["version:latest", latestVersion],
    ["version:lts", ltsVersion],
    ["version_origin", versionOrigin],
    ["version_reference", versionReference],
    ["binary_release_url", binaryReleaseUrl(resolvedVersion)],
    ["connector_release_url", connectorReleaseUrl(resolvedVersion)],
    ["offloader_release_url", offloaderReleaseUrl(resolvedVersion)],
    ["presto_pulsar_connector_release_url", prestoPulsarReleaseUrl(resolvedVersion)],
    ["download_page_url", downloadPageUrl()],
    ["rpm:client", rpmDistUrl(resolvedVersion, "")],
    ["rpm:client-debuginfo", rpmDistUrl(resolvedVersion, "-debuginfo")],
    ["rpm:client-devel", rpmDistUrl(resolvedVersion, "-devel")],
    ["deb:client", debDistUrl(resolvedVersion, "")],
    ["deb:client-devel", debDistUrl(resolvedVersion, "-dev")],
    ["dist_rpm:client", rpmDistUrl(resolvedVersion, "")],
    ["dist_rpm:client-debuginfo", rpmDistUrl(resolvedVersion, "-debuginfo")],
    ["dist_rpm:client-devel", rpmDistUrl(resolvedVersion, "-devel")],
    ["dist_deb:client", debDistUrl(resolvedVersion, "")],
    ["dist_deb:client-devel", debDistUrl(resolvedVersion, "-dev")],
    ["version:python", clientPythonVersion(pythonArg)],
    ["apidoc:python", clientPythonVersionUrl(pythonArg)],
    ["apidoc:cpp", clientCPPVersionUrl(pythonArg)],
    ["javadoc:pulsar-functions", javadocVersionUrl(originVersion, "pulsar-functions")],
    ["javadoc:client", javadocVersionUrl(originVersion, "client")],
    ["javadoc:admin", javadocVersionUrl(originVersion, "admin")],
    ["version:adapters", pulsarAdaptersVersion],
  ]);
}
