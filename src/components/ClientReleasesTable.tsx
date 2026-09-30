import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Translate from "@docusaurus/Translate";

export type ClientReleaseRow = {
  release: string;
  tarPath: string;
  tarText: string;
  tarAsc: string;
  tarSha: string;
  directory: string;
  releaseNote: string;
  binariesHint?: string;
};

const ROW_BG = "rgba(0, 0, 0, 0.03)";

function Row({ row, index }: { row: ClientReleaseRow; index: number }) {
  const [open, setOpen] = React.useState(false);
  const zebra = index % 2 === 1 ? ROW_BG : "inherit";
  return (
    <React.Fragment>
      <TableRow sx={{ backgroundColor: zebra }}>
        <TableCell
          className="border-gray-300 font-bold"
          sx={{ border: 1, color: "inherit", paddingY: 0.5 }}
          align="left"
        >
          <IconButton
            aria-label={open ? "collapse row" : "expand row"}
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ marginRight: 0.5, padding: 0.25 }}
          >
            {open ? <KeyboardArrowUpIcon fontSize="inherit" /> : <KeyboardArrowDownIcon fontSize="inherit" />}
          </IconButton>
          <Translate>{row.release}</Translate>
        </TableCell>
        <TableCell
          className="border-gray-300"
          sx={{ border: 1, paddingY: 0.5 }}
          align="left"
        >
          <Link className="text-primary" href={row.tarPath} underline="none">
            {row.tarText + " "}
          </Link>
          (
          <Link className="text-primary" href={row.tarAsc} underline="none">
            asc
          </Link>
          ,
          <Link className="text-primary" href={row.tarSha} underline="none">
            sha512
          </Link>
          )
        </TableCell>
        <TableCell
          className="border-gray-300"
          sx={{ border: 1, paddingY: 0.5 }}
          align="left"
        >
          <Link className="text-primary" href={row.releaseNote} underline="none">
            <Translate>Release Notes</Translate>
          </Link>
        </TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: zebra }}>
        <TableCell
          className="border-gray-300"
          sx={{ border: open ? 1 : 0, paddingY: 0, paddingX: open ? 2 : 0 }}
          colSpan={3}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginY: 1 }}>
              <p style={{ marginBottom: 4 }}>
                <Translate>
                  All files for this release (including any pre-built binaries):
                </Translate>{" "}
                <Link
                  className="text-primary"
                  href={row.directory}
                  underline="none"
                  target="_blank"
                  rel="noopener"
                >
                  {row.directory}
                </Link>
              </p>
              {row.binariesHint ? (
                <p style={{ marginBottom: 0, color: "inherit", opacity: 0.8 }}>
                  {row.binariesHint}
                </p>
              ) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ClientReleasesTable(props: {
  data: ClientReleaseRow[];
}) {
  return (
    <Table size="small">
      <TableBody>
        <TableRow key="header">
          {["Release", "Source", "Release notes"].map((header) => (
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
          <Row key={row.release} row={row} index={index} />
        ))}
      </TableBody>
    </Table>
  );
}
