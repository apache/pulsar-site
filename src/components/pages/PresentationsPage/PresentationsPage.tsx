import React, { useState } from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/resources';
import Page from "@site/src/components/ui/Page/Page";
import s from './PresentationsPage.module.css';

const categoryFilterOptions = [...data.categories] as const;

const PresentationsPage: React.FC = () => {

  return (
    <Layout
      title={`Presentations`}
      description="Learn about the basics of using Apache Pulsar"
    >
      <Page>
        <div className={s.TopBlock}>
          <section className={s.Header}>
            <h1>Presentations</h1>
            <p>
              Find Apache Pulsar tutorials, how-tos and other technical content.
            </p>
          </section>
        </div>

        <section>
          
            <div>
              <Cards key={'presentations'} resources={data.resources['presentations']} />
            </div>

        </section>
      </Page>
    </Layout>
  );
}

export default PresentationsPage;
