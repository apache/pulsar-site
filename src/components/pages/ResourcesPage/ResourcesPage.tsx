import React, { useState } from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/resources';
import Page from "@site/src/components/ui/Page/Page";
import s from './ResourcesPage.module.css';
import Button from "@site/src/components/ui/Button/Button";
import Input from "@site/src/components/ui/Input/Input";
import ContributeDataDrivenPage from "../../ui/ContributeDataDrivenPage/ContributeDataDrivenPage";

const categoryFilterOptions = [...data.categories] as const;

const CaseStudiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<data.Category>(data.categories[0]);

  return (
    <Layout
      title={`Resources`}
      description="Learn about the basics of using Apache Pulsar"
      wrapperClassName="LandingPage"
    >
      <Page>
        <div className={s.TopBlock}>
          <section className={s.Header}>
            <h1>Resources</h1>
            <p>
              Find Apache Pulsar tutorials, how-tos and other technical content by searching with keywords.
            </p>
            <ContributeDataDrivenPage />
          </section>
        </div>

        <section>
          <form>
            <div className={s.Filters}>
              <div className={s.CategorySwitcher}>
                {categoryFilterOptions.map((category) => {
                  return (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? 'action' : 'regular'}
                      onClick={() => setCategoryFilter(category)}
                      title={data.categoryLabels[category]}
                    />
                  );
                })}
              </div>
              <div className={s.SearchQueryInput}>
                <Input placeholder="Search" value={searchQuery} onChange={setSearchQuery} clearable />
              </div>
            </div>

            <div>
              {data.categories.map((category) => {
                if (categoryFilter === category) {
                  return <Cards key={category} search={searchQuery} resources={data.resources[category]} />
                }
              })}
            </div>
          </form>
        </section>
      </Page>
    </Layout>
  );
}

export default CaseStudiesPage;
