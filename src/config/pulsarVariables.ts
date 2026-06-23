import semver from "semver";
import * as compareVersions from "compare-versions";

import versionsList from "../../versions.json";
import releasesList from "../../releases.json";
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

// Every published Pulsar release (newest first), including milestone (-M*) releases.
const releases = releasesList as string[];

// Milestone releases (e.g. 5.0.0-M1) are published ahead of an LTS release and are
// not meant for production use.
function isMilestoneRelease(version: string): boolean {
  return /-M\d+/i.test(version);
}

// Highest version in `list` by (prerelease-aware) semver order, or "" if none parse.
function latestBySemver(list: string[]): string {
  return list.filter((v) => semver.valid(v)).sort(semver.rcompare)[0] ?? "";
}

// The latest release that ships the V5 client (Pulsar 5.0.0+, i.e. the
// `org.apache.pulsar.client.api.v5` API). A stable 5.x+ release always wins over a
// milestone; a milestone (e.g. 5.0.0-M1) is used only while no stable 5.x+ release
// exists yet. Empty before any 5.x release is published.
const v5PlusReleases = releases.filter((v) => (semver.coerce(v)?.major ?? 0) >= 5);
const v5PlusStableReleases = v5PlusReleases.filter((v) => !isMilestoneRelease(v));
export const latestV5PlusRelease: string = latestBySemver(
  v5PlusStableReleases.length > 0 ? v5PlusStableReleases : v5PlusReleases
);

// The milestone release currently in effect, or "" when the newest release is not a
// milestone — i.e. a stable release has superseded the last milestone and no newer
// milestone has been published yet (5.0.0-M1 now; empty after 5.0.0 ships; 5.1.0-M1
// once the next milestone is out).
const newestRelease = latestBySemver(releases);
export const currentMilestoneRelease: string =
  newestRelease !== "" && isMilestoneRelease(newestRelease) ? newestRelease : "";

// Formatted ", milestone: <version>" annotation for version hints, empty when no
// milestone is active so surrounding text (e.g. "LTS: x, latest: y") collapses cleanly.
export const currentMilestoneSuffix: string =
  currentMilestoneRelease !== "" ? `, milestone: ${currentMilestoneRelease}` : "";

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

// The V5 client API (org.apache.pulsar.client.api.v5) ships only in Pulsar
// 5.0.0+, so its Javadoc has no pre-5.0 directory. Resolve it against the doc's
// own version when that is already 5.x+; otherwise (e.g. the current docs, whose
// latestMajorRelease is still a 4.x line) point at the newest published 5.x+
// release, falling back to 5.0.x — the first release to carry it — until a 5.x
// line is listed in versions.json.
const firstClientV5Release = "5.0.x";
const latestClientV5Release: string =
  versions.find((v) => (semver.coerce(v)?.major ?? 0) >= 5) ?? firstClientV5Release;

export function javadocClientV5Url(originVersion: string): string {
  const major = semver.coerce(originVersion)?.major ?? 0;
  const version = major >= 5 ? originVersion : latestClientV5Release;
  return javadocVersionUrl(version, "client-v5");
}

export function referenceVersion(version: string): string {
  const v = semver.coerce(version)!;
  if (v.compareMain("2.7.0") < 0) return "2.6.x";
  return `${v.major}.${v.minor}.x`;
}

// Pulsar 5.0.0+/master publish OpenAPI 3 REST API docs under /openapi/; earlier
// releases keep their Swagger 2.0 docs under /swagger/. Mirrors usesOpenApi3()
// in src/pages/RestApi/RestApi.tsx and src/server/remarkPlugins/swagger/index.ts.
export function usesOpenApi3(version: string): boolean {
  if (version === "master") return true;
  const v = semver.coerce(version);
  return v !== null && v.major >= 5;
}

export function restApiSpecDir(restApiVersion: string): string {
  const root = usesOpenApi3(restApiVersion) ? "openapi" : "swagger";
  return `/${root}/${restApiVersion}/`;
}

/**
 * Token → replacement value for a given version key.
 * `"current"` → next/current docs; any other string is an origin version
 * from versions.json (e.g. "3.0.x", "2.10.x", "2.6.4").
 *
 * Keys are the bare token names (e.g. `"version_number"`, `"javadoc:client"`);
 * the preprocessor wraps them as `@pulsar:<key>@` when matching.
 *
 * `referenceLatest`: when true (used for `client-libraries/` docs), `version_reference`
 * resolves to the latest stable release's reference (e.g. `4.2.x`) instead of `next`,
 * so links like `/reference/#/@pulsar:version_reference@/client/` target the published
 * reference rather than the in-development one.
 *
 * `rest_api_version` is the value for the `?version=` query parameter on REST API
 * pages (e.g. `/admin-rest-api/?version=@pulsar:rest_api_version@`). For the next/current
 * docs it resolves to `master` (the in-development API), since the REST API viewer keys
 * the in-development spec under `master` rather than a numbered release. Versioned docs
 * resolve it to their concrete release, matching `version_number`.
 *
 * `rest_api_spec_dir` is the static directory that holds the raw REST API spec JSON
 * files for the doc's version (e.g. `pathname://@pulsar:rest_api_spec_dir@`). Pulsar
 * 5.0.0+/master docs resolve to `/openapi/<version>/` (OpenAPI 3); earlier docs resolve
 * to `/swagger/<version>/` (Swagger 2.0).
 */
export function resolveTokens(versionKey: string, referenceLatest = false): Map<string, string> {
  const isCurrent = versionKey === "current";
  const originVersion = isCurrent ? latestMajorRelease : versionKey;
  const resolvedVersion = getRealVersion(originVersion);

  // Quirks preserved for behavioral compatibility:
  //   - current docs: version_origin = resolvedVersion (not origin)
  //   - versioned docs: version_number strips any -incubating suffix
  const versionNumber = isCurrent ? resolvedVersion : resolvedVersion.replace("-incubating", "");
  const versionOrigin = isCurrent ? resolvedVersion : originVersion;
  const versionReference = isCurrent && !referenceLatest ? "next" : referenceVersion(resolvedVersion);
  const restApiVersion = isCurrent ? "master" : versionNumber;
  const pythonArg = isCurrent ? originVersion : resolvedVersion;

  return new Map<string, string>([
    ["apidoc:cpp", clientCPPVersionUrl(pythonArg)],
    ["apidoc:python", clientPythonVersionUrl(pythonArg)],
    ["binary_release_url", binaryReleaseUrl(resolvedVersion)],
    ["connector_release_url", connectorReleaseUrl(resolvedVersion)],
    ["deb:client-devel", debDistUrl(resolvedVersion, "-dev")],
    ["deb:client", debDistUrl(resolvedVersion, "")],
    ["dist_deb:client-devel", debDistUrl(resolvedVersion, "-dev")],
    ["dist_deb:client", debDistUrl(resolvedVersion, "")],
    ["dist_rpm:client-debuginfo", rpmDistUrl(resolvedVersion, "-debuginfo")],
    ["dist_rpm:client-devel", rpmDistUrl(resolvedVersion, "-devel")],
    ["dist_rpm:client", rpmDistUrl(resolvedVersion, "")],
    ["download_page_url", downloadPageUrl()],
    ["javadoc:admin", javadocVersionUrl(originVersion, "admin")],
    ["javadoc:client", javadocVersionUrl(originVersion, "client")],
    ["javadoc:client-v5", javadocClientV5Url(originVersion)],
    ["javadoc:pulsar-functions", javadocVersionUrl(originVersion, "pulsar-functions")],
    ["offloader_release_url", offloaderReleaseUrl(resolvedVersion)],
    ["presto_pulsar_connector_release_url", prestoPulsarReleaseUrl(resolvedVersion)],
    ["rest_api_spec_dir", restApiSpecDir(restApiVersion)],
    ["rest_api_version", restApiVersion],
    ["rpm:client-debuginfo", rpmDistUrl(resolvedVersion, "-debuginfo")],
    ["rpm:client-devel", rpmDistUrl(resolvedVersion, "-devel")],
    ["rpm:client", rpmDistUrl(resolvedVersion, "")],
    ["version_number", versionNumber],
    ["version_origin", versionOrigin],
    ["version_reference", versionReference],
    ["version:adapters", pulsarAdaptersVersion],
    ["version:current-milestone", currentMilestoneRelease],
    ["version:current-milestone-suffix", currentMilestoneSuffix],
    ["version:latest", latestVersion],
    ["version:latest-v5plus", latestV5PlusRelease],
    ["version:lts", ltsVersion],
    ["version:python", clientPythonVersion(pythonArg)],
    ["version", resolvedVersion],
  ]);
}
