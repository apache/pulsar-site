import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function VersionsTable(props) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {["Name", "Apache Id"].map(header => (
            <TableCell sx={{ border: 0, color: "inherit" }} key={header}>
              <strong>{header}</strong>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map((row, index) => (
          <TableRow key={index}>
            <TableCell sx={{ border: 0 , color: "inherit" }}>{row.name}</TableCell>
            <TableCell sx={{ border: 0 , color: "inherit" }}>{row.apacheId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
