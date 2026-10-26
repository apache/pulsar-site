import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Translate from "@docusaurus/Translate";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { PageMetadata } from "@docusaurus/theme-common";

// Only "<major>.<minor>" with an optional "v" prefix and ".x" suffix is accepted, so the
// value is safe to use in titles and links. Returns e.g. { series: "5.0", major: 5, minor: 0 }.
function parseMajor(value) {
  const match = /^v?(\d{1,3})\.(\d{1,3})(?:\.x)?$/.exec(value?.trim() ?? "");
  if (!match) {
    return null;
  }
  const major = Number(match[1]);
  const minor = Number(match[2]);
  return { series: `${major}.${minor}`, major, minor };
}

// Reads the "major" query parameter, for example /release-notes?major=5.0.x.
// The query string isn't available during SSR, so it's read only after hydration
// to avoid a hydration mismatch.
export function useMajorParam() {
  const { search } = useLocation();
  const isBrowser = useIsBrowser();
  return isBrowser ? parseMajor(new URLSearchParams(search).get("major")) : null;
}

export function PulsarReleaseNotesTitle() {
  const major = useMajorParam();
  if (!major) {
    return <h1>Pulsar Release Notes</h1>;
  }
  const title = `Pulsar Release Notes for ${major.series}.x`;
  return (
    <>
      <PageMetadata title={title} />
      <h1>{title}</h1>
      {major.major >= 5 && (
        <p>
          <Link to={`/docs/${major.series}.x/release-highlights/`}>
            Pulsar {major.series}.x release highlights and upgrading
          </Link>
        </p>
      )}
    </>
  );
}

export default function VersionsTable(props) {
  const { pathname } = useLocation();
  const major = useMajorParam();
  const rows = major
    ? props.data.filter(row => row.tagName.replace(/^v/, "").startsWith(`${major.series}.`))
    : props.data;

  return (
    <>
      {major && (
        <p>
          Showing {rows.length} release{rows.length === 1 ? "" : "s"} of Pulsar {major.series}.x.{" "}
          <Link to={pathname}>Show all releases</Link>
        </p>
      )}
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            {[
              "Version",
              "Release Note",
              "Release Blog",
              "Documentation",
              "Release Date",
              "Release Manager",
            ].map(header => (
              <TableCell
                className="font-bold"
                sx={{ color: "inherit" }}
                key={header}
              >
                <Translate>{header}</Translate>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ color: "inherit" }}>
              <TableCell sx={{ color: "inherit" }}>
                {row.version}
              </TableCell>
              <TableCell sx={{ color: "inherit" }}>
                <a href={row.releaseNotes}>{row.tagName}</a>
              </TableCell>
              <TableCell sx={{ color: "inherit" }}>
                {row.releaseBlog ? (
                    <a href={row.releaseBlog}>
                        What's New in Apache Pulsar {row.tagName}
                    </a>
                ) : (
                    <></>
                )}
              </TableCell>
              <TableCell sx={{ color: "inherit" }}>
                <a href={row.doc}>{row.vtag} Documentation</a>
              </TableCell>
              <TableCell sx={{ color: "inherit" }}>
                {new Date(row.publishedAt).toDateString().substring(4)}
              </TableCell>
              <TableCell sx={{ color: "inherit" }}>
                <a href={`https://github.com/${row.author}`}>{row.author}</a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
