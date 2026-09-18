import React, { FC } from "react";
import semver from "semver/preload";
import useBaseUrl from "@docusaurus/useBaseUrl";

import restApiVersions from "@site/static/swagger/restApiVersions.json";
import { buildSupportedVersionList, isMaintained } from "./SupportedVersionsTable";

// One entry of static/swagger/restApiVersions.json: the spec documents published for a
// Pulsar version, grouped by REST API base path version (v2 or v3).
type SpecGroup = { fileName: string[]; version: string };

// Human-readable name of a spec document, keyed by the file name without its
// "openapi" (5.0.0+) or "swagger" (pre-5.0) prefix.
const DOCUMENT_LABELS: Record<string, string> = {
  "": "Admin",
  lookup: "Lookup",
  functions: "Functions",
  source: "Sources",
  sink: "Sinks",
  packages: "Packages",
  transactions: "Transactions",
};

const DOCUMENT_ORDER = ["", "lookup", "functions", "source", "sink", "packages", "transactions"];

type SpecRow = {
  // "master" or the release line, e.g. "4.0 (LTS)" or "5.0 milestone"
  line: string;
  // the Pulsar version whose spec documents are linked, e.g. "4.0.13" or "5.0.0-M2"
  version: string;
  openApi3: boolean;
  // document key (see DOCUMENT_LABELS) -> published file name without extension
  documents: Map<string, string>;
};

// Pulsar 5.0.0+ (starting with 5.0.0-M1) and master publish OpenAPI 3 documents under
// /openapi/; earlier releases keep their Swagger 2.0 documents under /swagger/. Mirrors
// usesOpenApi3() in src/pages/RestApi/RestApi.tsx and src/config/pulsarVariables.ts.
function usesOpenApi3(version: string): boolean {
  if (version === "master") return true;
  const v = semver.coerce(version);
  return v !== null && v.major >= 5;
}

function toRow(line: string, version: string, groups: SpecGroup[]): SpecRow {
  const documents = new Map<string, string>();
  for (const group of groups) {
    for (const fileName of group.fileName) {
      documents.set(fileName.replace(/^(openapi|swagger)/, ""), fileName);
    }
  }
  return { line, version, openApi3: usesOpenApi3(version), documents };
}

// The versions with published spec documents, newest first.
function publishedSpecVersions(): string[] {
  return Object.keys(restApiVersions as Record<string, SpecGroup[]>)
    .filter((version) => semver.valid(version) !== null)
    .sort(semver.rcompare);
}

// master plus one row per maintained release line (active or security support, or the
// current milestone), each linking the newest release of the line that has published
// spec documents. Unmaintained lines are left out; their documents remain available
// under the same directory layout.
function buildRows(): SpecRow[] {
  const specs = restApiVersions as Record<string, SpecGroup[]>;
  const published = publishedSpecVersions();
  const rows: SpecRow[] = [];
  if (specs["master"]) {
    rows.push(toRow("master (development branch)", "master", specs["master"]));
  }
  for (const line of buildSupportedVersionList().filter((v) => isMaintained(v))) {
    const lineName = `${line.version.major}.${line.version.minor}`;
    const label = line.milestone
      ? `${lineName} milestone`
      : line.version.minor === 0 && line.version.major >= 3
        ? `${lineName} (LTS)`
        : lineName;
    // Prefer the exact newest release of the line; a milestone line otherwise matches
    // the newest published milestone of that major.minor.
    const version =
      published.find((v) => v === line.latestDisplay) ??
      published.find((v) => {
        const c = semver.coerce(v);
        return c !== null && c.major === line.version.major && c.minor === line.version.minor
          && (!line.milestone || /-M\d+/i.test(v));
      });
    if (version) {
      rows.push(toRow(label, version, specs[version]));
    }
  }
  return rows;
}

const RestApiSpecTable: FC = () => {
  const rows = buildRows();
  const baseUrl = useBaseUrl("/");

  return (
    <table>
      <thead>
        <tr>
          <th>Release line</th>
          <th>Newest release</th>
          <th>Format</th>
          <th>Documents</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const dir = `${baseUrl}${row.openApi3 ? "openapi" : "swagger"}/${row.version}/`;
          return (
            <tr key={row.version}>
              <td>{row.line}</td>
              <td>
                <a href={dir}>{row.version}</a>
              </td>
              <td>{row.openApi3 ? "OpenAPI 3" : "Swagger 2.0"}</td>
              <td>
                {DOCUMENT_ORDER.filter((key) => row.documents.has(key)).map((key, index) => (
                  <React.Fragment key={key}>
                    {index > 0 ? " · " : ""}
                    <a href={`${dir}${row.documents.get(key)}.json`}>{DOCUMENT_LABELS[key]}</a>
                  </React.Fragment>
                ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RestApiSpecTable;
