import React, { useState } from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/resources';
import Page from "@site/src/components/ui/Page/Page";
import s from './ResourcesPage.module.css';
import Button from "@site/src/components/ui/Button/Button";
import Input from "@site/src/components/ui/Input/Input";

type CategoryFilterOption = 'any' | data.Category;
const categoryFilterOptions = ['any', ...data.categories] as const;

const CaseStudiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilterOption>('any');

  return (
    <Layout
      title={`Resources`}
      description="Learn about the basics of using Apache Pulsar"
    >
      <Page>
        <div className={s.TopBlock}>
          <section className={s.Header}>
            <h1>Resources</h1>
            <p>
              Find Apache Pulsar tutorials, how-tos and other technical content by searching with keywords.
            </p>
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
                      title={category === 'any' ? 'All' : data.categoryLabels[category]}
                    />
                  );
                })}
              </div>
              <div className={s.SearchQueryInput}>
                <Input placeholder="Search" value={searchQuery} onChange={setSearchQuery} clearable />
              </div>
            </div>

            <div>
              {categoryFilter === 'any' && <Cards search={searchQuery} resources={Object.values(data.resources).flat()} />}
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
