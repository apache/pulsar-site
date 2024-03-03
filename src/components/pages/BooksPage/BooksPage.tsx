import React from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/books';
import Page from "@site/src/components/ui/Page/Page";
import s from './BooksPage.module.css';

const CaseStudiesPage: React.FC = () => {
  return (
    <Layout
      title={`Books`}
      description="Learn about the basics of using Apache Pulsar"
      wrapperClassName="LandingPage"
    >
      <Page>
        <section className={s.Header}>
          <h1>Books</h1>
          <p>The next collection of books offers a guided learning experience into Apache Pulsar and related subjects.</p>
        </section>

        <div className={s.Categories}>
          {data.categories.map(category => {
            return (
              <div>
                <h2>{data.categoryLabels[category]}</h2>
                <Cards resources={data.resources[category]} />
              </div>
            );
          })}
        </div>

      </Page>
    </Layout>
  );
}

export default CaseStudiesPage;
