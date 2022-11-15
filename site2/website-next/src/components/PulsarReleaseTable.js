import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Translate from "@docusaurus/Translate";

export default function VersionsTable(props) {
  return (
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
        {props.data.map((row, index) => (
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
  );
}
