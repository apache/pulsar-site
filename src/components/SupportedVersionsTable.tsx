import lodash from 'lodash'
import React from 'react'
import semver from "semver/preload"
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material"

import releases from '@site/data/release-pulsar'
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import moment from "moment";

type SimpleReleaseData = {
  version: semver.SemVer,
  released: Date,
  releaseNoteLink: string,
};

type SupportedVersionData = {
  version: semver.SemVer,
  released: Date,
  activeSupport: Date,
  securitySupport: Date,
  latest: semver.SemVer,
  latestReleased: Date,
  latestReleaseNoteLink: string,
};

function resolveActiveSupport(version: semver.SemVer, released: Date): Date {
  let result = new Date(released)
  if (version.compareMain('3.0.0') < 0) {
    // before 3.0 - active support for 12 months
    result.setMonth(released.getMonth() + 12)
  } else if (version.minor > 0) {
    // regular release - active support for 6 months
    result.setMonth(released.getMonth() + 6)
  } else {
    // LTS release - active support for 24 months
    result.setMonth(released.getMonth() + 24)
  }
  return result
}

function resolveSecuritySupport(version: semver.SemVer, released: Date): Date {
  let result = new Date(released)
  if (version.compareMain('3.0.0') < 0) {
    // before 3.0 - security support for 12 months
    result.setMonth(released.getMonth() + 12)
  } else if (version.minor > 0) {
    // regular release - security support for 6 months
    result.setMonth(released.getMonth() + 6)
  } else {
    // LTS release - security support for 36 months
    result.setMonth(released.getMonth() + 36)
  }
  return result
}

function isSameFeatureRelease(v1: semver.SemVer, v2: semver.SemVer): boolean {
  return v1.major == v2.major && v1.minor == v2.minor
}

function renderVersionCell(version: semver.SemVer): JSX.Element {
  if (version.compareMain('3.0.0') < 0) {
    return <TableCell>{version.major}.{version.minor}</TableCell>
  } else if (version.minor != 0) {
    return <TableCell>{version.major}.{version.minor}</TableCell>
  } else {
    return <TableCell>{version.major}.{version.minor} (LTS)</TableCell>
  }
}

function renderReleasedCell(released: Date): JSX.Element {
  return <TableCell><>
    ({released.toDateString()})
  </>
  </TableCell>
}

function renderSupportCell(support: Date): JSX.Element {
  return <TableCell><>
    ({support.toDateString()})
  </>
  </TableCell>
}

function renderLatestVersionCell(d: SupportedVersionData): JSX.Element {
  return <TableCell>
    <>
      <Link href={useBaseUrl(d.latestReleaseNoteLink)}>
        {d.latest.version}
      </Link>
      <br/>
      ({d.latestReleased.toDateString()})
    </>
  </TableCell>
}

export default function SupportedVersionsTable(): JSX.Element {
  let releaseList: SimpleReleaseData[] = releases.map(r => ({
    version: semver.coerce(r.tagName),
    released: new Date(r.publishedAt),
    releaseNoteLink: r.releaseNotes,
  }))
  releaseList.sort((o1, o2) => semver.rcompare(o1.version, o2.version))

  let supportedVersionList: SupportedVersionData[] = []
  for (const release of releaseList) {
    const version = release.version
    const released = release.released
    const last = lodash.last(supportedVersionList)
    if (last && isSameFeatureRelease(last.version, release.version)) {
      // early patch release - the support period is counted from the first patch release
      last.released = release.released
      last.activeSupport = resolveActiveSupport(last.version, last.released)
      last.securitySupport = resolveSecuritySupport(last.version, last.released)
      continue
    }
    supportedVersionList.push({
      version: version,
      released: released,
      activeSupport: resolveActiveSupport(version, released),
      securitySupport: resolveSecuritySupport(version, released),
      latest: version,
      latestReleased: released,
      latestReleaseNoteLink: release.releaseNoteLink,
    })
  }

  return <>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Version</TableCell>
          <TableCell>Released</TableCell>
          <TableCell>Active Support</TableCell>
          <TableCell>Security Support</TableCell>
          <TableCell>Latest</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          supportedVersionList.map(r => <>
            <TableRow>
              {renderVersionCell(r.version)}
              {renderReleasedCell(r.released)}
              {renderSupportCell(r.activeSupport)}
              {renderSupportCell(r.securitySupport)}
              {renderLatestVersionCell(r)}
            </TableRow>
          </>)
        }
      </TableBody>
    </Table>
  </>
}
