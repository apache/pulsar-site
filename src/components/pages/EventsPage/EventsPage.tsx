import React, { useState } from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/events';
import Input from "@site/src/components/ui/Input/Input";
import Select from "@site/src/components/ui/Select/Select";
import Page from "@site/src/components/ui/Page/Page";
import s from './EventsPage.module.css';

type CategoryFilterOption = data.Category;
const categoryFilterOptions = ['any', ...data.categories] as const;

const CaseStudiesPage: React.FC = () => {
  const [searchString, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilterOption>('events');

  return (
    <Layout
      title={`Events`}
      description="Apache Pulsar Events"
    >
      <Page>
        <section className={s.Header}>
          <h1>Events</h1>
          <p>
            Below is a list of key industry events hosted by Pulsar contributors,
            as well as local meetups around the globe.
            If you have one to add, learn more about submitting a pull request <a target="__blank" href="https://github.com/apache/pulsar/pulls">here</a>.
          </p>
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
                  title: option === 'any' ? 'All events' : data.categoryLabels[option]
                }))}
              />

              <Input placeholder="Search" value={searchString} onChange={setSearch} clearable />
            </div>

            <div>
              {categoryFilter === 'any' && <Cards search={searchString} resources={Object.values(data.resources).flat()} />}
              {data.categories.map((category) => {
                if (categoryFilter === category) {
                  return <Cards key={category} search={searchString} resources={data.resources[category]} />
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
