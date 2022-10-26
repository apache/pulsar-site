import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import Translate from "@docusaurus/Translate";
import { docUrl, getCache } from "../utils/index";
const versions = require("../../versions.json");

export default function VersionsTable(props) {
  const latestStableVersion = versions[0];
  return (
    <Table size="small" sx={{ maxWidth: 500 }}>
      <TableBody>
        {props.data.map((row) => (
          <TableRow key={row.name}>
            <TableCell
              className="border-gray-300 font-bold"
              sx={{ border: 1, color: "inherit" }}
              align="left"
            >
              <span>{row.name}</span>
            </TableCell>
            <TableCell
              className="border-gray-300"
              sx={{ border: 1 }}
              align="center"
            >
              <Link
                className="text-primary"
                href={docUrl(
                  "",
                  "",
                  row.name == latestStableVersion ? "" : row.name
                )}
                underline="none"
                onClick={() => {
                  getCache().setItem(
                    "version",
                    row.name == "next" ? "master" : row.name
                  );
                }}
              >
                <Translate>Documentation</Translate>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
