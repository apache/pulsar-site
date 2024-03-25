import lodash from 'lodash'
import React, { FC } from 'react'
import semver from "semver/preload"
import {Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material"

import releases from '@site/data/release-pulsar'
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import moment from "moment";
import {styled} from "@mui/system";

type SimpleReleaseData = {
  version: semver.SemVer,
  released: moment.Moment,
  releaseNoteLink: string,
};

type SupportedVersionData = {
  version: semver.SemVer,
  released: moment.Moment,
  activeSupport: moment.Moment,
  securitySupport: moment.Moment,
  latest: semver.SemVer,
  latestReleased: moment.Moment,
  latestReleaseNoteLink: string,
};

function resolveActiveSupport(version: semver.SemVer, released: moment.Moment): moment.Moment {
  const support = moment(released)
  if (version.compareMain('3.0.0') < 0) {
    // before 3.0 - active support for 12 months
    return support.add(12, 'months')
  } else if (version.minor > 0) {
    // regular release - active support for 6 months
    return support.add(6, 'months')
  } else {
    // LTS release - active support for 24 months
    return support.add(24, 'months')
  }
}

function resolveSecuritySupport(version: semver.SemVer, released: moment.Moment): moment.Moment {
  const support = moment(released)
  if (version.compareMain('3.0.0') < 0) {
    // before 3.0 - security support for 12 months
    return support.add(12, 'months')
  } else if (version.minor > 0) {
    // regular release - security support for 6 months
    return support.add(6, 'months')
  } else {
    // LTS release - security support for 36 months
    return support.add(36, 'months')
  }
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

function renderReleasedCell(released: moment.Moment): JSX.Element {
  return <TableCell><>
    {released.fromNow()}
    <br/>
    ({released.format('DD MMM YYYY')})
  </>
  </TableCell>
}

const Dot = styled('div')({
  width: 15,
  height: 15,
  borderRadius: '50%',
});

function renderSupportCell(support: moment.Moment): JSX.Element {
  const now = moment()
  return <TableCell><>
    <Stack direction="row" spacing={2}>
      <div style={{marginTop: 10}}>
        <Dot style={{background: support.isBefore(now) ? 'crimson' : 'mediumaquamarine'}}/>
      </div>
      <div style={{color: support.isBefore(now) ? 'crimson' : 'inherit'}}>
        {support.isBefore(now) ? "Ended" : "End"} {support.fromNow()}
        <br/>
        ({support.format('DD MMM YYYY')})
      </div>
    </Stack>
  </>
  </TableCell>
}

function renderLatestVersionCell(d: SupportedVersionData): JSX.Element {
  const now = moment()
  if (d.activeSupport.isBefore(now) && d.securitySupport.isBefore(now)) {
    // no longer supported
    return <TableCell>
      <del>{d.latest.version}</del>
    </TableCell>
  }

  return <TableCell><>
    <Link href={useBaseUrl(d.latestReleaseNoteLink)}>{d.latest.version}</Link>
    <br/>
    ({d.latestReleased.format('DD MMM YYYY')})
  </>
  </TableCell>
}

type SupportedVersionsTableProps = {
  isHideUnmaintained?: boolean
};

const SupportedVersionsTable: FC<SupportedVersionsTableProps> = (props) => {
  let releaseList: SimpleReleaseData[] = releases.map(r => ({
    version: semver.coerce(r.tagName),
    released: moment(r.publishedAt),
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

  if (props.isHideUnmaintained) {
    supportedVersionList = supportedVersionList.filter(v =>
      v.activeSupport.isAfter(new Date()) ||
      v.securitySupport.isAfter(new Date())
    );
  }

  const TableHeaderCell = styled(TableCell)({fontWeight: "bold"})

  return <>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Version</TableHeaderCell>
          <TableHeaderCell>Released</TableHeaderCell>
          <TableHeaderCell>Active Support</TableHeaderCell>
          <TableHeaderCell>Security Support</TableHeaderCell>
          <TableHeaderCell>Latest</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          supportedVersionList.map((r, i) => <>
            <TableRow key={i}>
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

export default SupportedVersionsTable;
