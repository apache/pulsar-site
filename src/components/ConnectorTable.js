import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import Translate from "@docusaurus/Translate";

export default function VersionsTable(props) {
  return (
    <Table size="small">
      <TableBody>
        <TableRow key="header">
          {["IO connector", "Archive", "Checksum & Signature"].map((header) => (
            <TableCell
              className="border-gray-300 font-bold"
              sx={{ border: 1, color: "inherit" }}
              align="left"
              key={header}
            >
              <Translate>{header}</Translate>
            </TableCell>
          ))}
        </TableRow>
        {props.data.map((row, index) => (
          <TableRow key={index}>
            <TableCell
              className="border-gray-300"
              sx={{ border: 1, color: "inherit" }}
              align="left"
            >
              <Link
                className="text-primary"
                href={row.connector}
                underline="none"
                target="_blank"
              >
                {row.connectorText}
              </Link>
            </TableCell>
            <TableCell
              className="border-gray-300"
              sx={{ border: 1 }}
              align="left"
              target="_blank"
            >
              <Link
                className="text-primary"
                href={row.archive}
                underline="none"
              >
                {row.archiveText}
              </Link>
            </TableCell>
            <TableCell
              className="border-gray-300"
              sx={{ border: 1 }}
              align="left"
            >
              <Link className="text-primary" href={row.asc} underline="none">
                asc
              </Link>
              ,
              <Link className="text-primary" href={row.sha512} underline="none">
                sha512
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
