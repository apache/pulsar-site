const releases = require('../../data/release-pulsar.js');
const moment = require('moment');
const semver = require('semver/preload');

function resolveActiveSupport(ver, released) {
  const support = moment(released);
  
  if (ver.compareMain('3.0.0') < 0) {
    return support.add(12, 'months');
  } else if (ver.minor > 0) {
    return support.add(6, 'months');
  } else {
    // 36 months for security updates
    return support.add(36, 'months');
  }
}

function getSupportedVersionBranches(releases) {
  const releaseList = releases
    // skip pre-releases such as v5.0.0-M1, which semver.coerce would turn into 5.0.0
    .filter(r => !semver.prerelease(r.tagName))
    .map(r => ({
      version: semver.coerce(r.tagName),
      released: moment(r.publishedAt)
    }));

  const now = moment();
  const supportedVersions = releaseList
    .filter(release => {
        if (release.version.patch === 0) {
            const supportEnd = resolveActiveSupport(release.version, release.released);
            return supportEnd.isAfter(now);
        } else {
            return false;
        }
    })
    .sort((a, b) => semver.rcompare(b.version, a.version))
    .map(release => `${release.version.major}.${release.version.minor}.x`);

  const latestBranch = `${releaseList[0].version.major}.${releaseList[0].version.minor}.x`;
  return supportedVersions.includes(latestBranch)
    ? supportedVersions
    : [...supportedVersions, latestBranch];
}

// Supported release lines (e.g. ["4.0.x", "5.0.x"]), oldest first.
function getSupportedVersions() {
  return getSupportedVersionBranches(releases);
}

module.exports = { getSupportedVersions };