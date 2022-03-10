import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ReleaseNotesAll from '/release-notes/all.md';
import ReleaseNotesTimeline from '/release-notes/timeline.md';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import Translate, { translate } from "@docusaurus/Translate";
import TOCInline from '@theme/TOCInline';
import CodeBlock from '@theme/CodeBlock';
export default function ReleaseNotes() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Release Notes`}
      description="Learn about the basics of using Apache Pulsar"
    >    
    <div className="page-wrap tailwind">
      <section className="hero">
          <div className="inner text--center">
            <h1><Translate>Release Notes</Translate></h1>
          </div>
        </section>
        <section className="main-content py-12 mb-24">
            <TabsUnstyled defaultValue={0} className="tabs rn-tabs flex relative z-5">
                <div className="rl-aside">
                  <TabsListUnstyled className="block rn-tabs p-2">
                    <TabUnstyled className="rn-tab block"><Translate>All</Translate></TabUnstyled>
                    <TabUnstyled className="rb-tab block"><Translate>Timeline</Translate></TabUnstyled>
                  </TabsListUnstyled>
                </div>
                <main class="rl-main">
                    <div className="container padding-top--md padding-botom--lg">
                        <div class="">
                            <TabPanelUnstyled value={0} className="flex">
                                <ReleaseNotesAll />
                            </TabPanelUnstyled>
                            <TabPanelUnstyled value={1} className="flex">
                                <ReleaseNotesTimeline />
                            </TabPanelUnstyled>
                        </div>
                    </div>
                </main>
            </TabsUnstyled>
      </section>
    </div>
    </Layout>
  );
}
