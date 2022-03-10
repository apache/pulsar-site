import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Release Notes`}
      description="Learn about the basics of using Apache Pulsar"
    >    
      <div className="page-wrap tailwind">
        <aside>
          I'm an asside
        </aside>
        <main class="docMainContainer_node_modules-@docusaurus-theme-classic-lib-next-theme-DocPage-styles-module">
          <div class="container padding-top--md padding-bottom--lg">
            <div class="row">
              <div class="col docItemCol_node_modules-@docusaurus-theme-classic-lib-next-theme-DocItem-styles-module">
                main content goes here
              </div>
              <div class="col col--3">
                stuff goes here
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
