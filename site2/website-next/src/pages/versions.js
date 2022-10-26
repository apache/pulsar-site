import * as React from "react";
import Layout from "@theme/Layout";
import VersionsTable from "../components/VersionsTable";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate, { translate } from "@docusaurus/Translate";
const versions = require("../../versions.json");

export default function DenseTable() {
  const { siteConfig } = useDocusaurusContext();
  const latestStableVersion = versions[0];
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`;
  return (
    <Layout>
      <div className="tailwind">
        <div className="my-12 container">
          <h1 className="mb-6">{siteConfig.title} Versions</h1>
          <h3 className="mb-4" id="latest">
            <Translate>Latest Stable Version</Translate>
          </h3>
          <p className="mb-2">Latest stable release of Apache Pulsar.</p>
          <VersionsTable
            data={[{ name: latestStableVersion }]}
            type="stable"
          ></VersionsTable>
          <p className="mt-8 mb-4">
            For release notes of all versions, go to the <a href="/release-notes"> Release Notes</a> page.
          </p>
          <h3 className="mt-8 mb-4" id="latest">
            <Translate> Latest Version</Translate>
          </h3>
          <p className="mb-2">
            <Translate>
              Here you can find the latest documentation and unreleased code.
            </Translate>
          </p>
          <VersionsTable
            data={[{ name: "next" }]}
            type="stable"
          ></VersionsTable>
          <h3 className="mt-8 mb-4" id="latest">
            <Translate>Past Version</Translate>
          </h3>
          <p className="mb-2">
            <Translate>
              Here you can find documentation for previous versions of Apache
              Pulsar.
            </Translate>
          </p>
          <VersionsTable
            data={versions
              .filter((item) => item != latestStableVersion)
              .map((item) => ({
                name: item,
              }))}
            type="stable"
          ></VersionsTable>
        </div>
      </div>
    </Layout>
  );
}
