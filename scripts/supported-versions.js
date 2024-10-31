const releases = require('../data/release-pulsar.js');
const moment = require('moment');
const semver = require('semver/preload');

function resolveActiveSupport(ver, released) {
  const support = moment(released);
  
  if (ver.compareMain('3.0.0') < 0) {
    return support.add(12, 'months');
  } else if (ver.minor > 0) {
    return support.add(6, 'months');
  } else {
    return support.add(24, 'months');
  }
}

function getSupportedVersionBranches(releases) {
  const releaseList = releases
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

  return supportedVersions;
}

const supported = getSupportedVersionBranches(releases);
console.log(supported.join(' '));