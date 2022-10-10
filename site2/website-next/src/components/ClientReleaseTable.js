import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Translate from "@docusaurus/Translate";

export default function VersionsTable(props) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {["Version", "Release Note", "Documentation"].map(header => (
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
            <TableCell sx={{ color: "inherit" }}>{row.version}</TableCell>
            <TableCell sx={{ color: "inherit" }}>
              <a href={row.releaseNotes}>{row.tagName}</a>
            </TableCell>
            <TableCell sx={{ color: "inherit" }}>
              <a href={row.doc}>{row.vtag} Documentation</a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
