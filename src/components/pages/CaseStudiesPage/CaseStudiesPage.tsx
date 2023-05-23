import React, { useState } from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/case-studies';
import Input from "@site/src/components/ui/Input/Input";
import Select from "@site/src/components/ui/Select/Select";
import Page from "@site/src/components/ui/Page/Page";
import s from './CaseStudiesPage.module.css';

type CategoryFilterOption = data.Category | 'any';
const categoryFilterOptions = ['any', ...data.categories] as const;

const CaseStudiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilterOption>('any');

  return (
    <Layout
      title={`Ecosystem`}
      description="Learn about the basics of using Apache Pulsar"
    >
      <Page>
        <section className={s.Header}>
          <h1>Case Studies</h1>
          <p>Organizations around the globe rely on Apache Pulsar to manage their most demanding real-time requirements.</p>
        </section>

        <section>
          <form>
            <div className={s.Filters}>
              <Select<CategoryFilterOption>
                value={categoryFilter}
                onChange={setCategoryFilter}
                list={categoryFilterOptions.map((option) => ({
                  type: 'item',
                  value: option,
                  title: option === 'any' ? 'All Industries' : data.categoryLabels[option]
                }))}
              />

              <Input placeholder="Search" value={searchQuery} onChange={setSearchQuery} clearable />
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
