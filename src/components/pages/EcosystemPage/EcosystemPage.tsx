import React, { useState } from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/ecosystem';
import Input from "@site/src/components/ui/Input/Input";
import Select from "@site/src/components/ui/Select/Select";
import Page from "@site/src/components/ui/Page/Page";
import s from './EcosystemPage.module.css';

type CategoryFilterOption = data.Category | 'any';
const categoryFilterOptions = ['any', ...data.categories] as const;

const EcosystemPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilterOption>('any');

  return (
    <Layout
      title={`Ecosystem`}
      description="Learn about the basics of using Apache Pulsar"
    >
      <Page>
        <section className={s.Header}>
          <h1>Ecosystem</h1>
          <p>To build better streaming data pipelines and event-driven applications, you can use the powerful extensions to Pulsar, including <a href="/docs/next/io-overview">connectors</a>, protocol handlers, tools, and more. Additionally, you can develop applications using <a href="/docs/next/client-libraries">client libraries</a>.</p>
          <p>This page lists both built-in and third-party tools. Note that some of the third-party tools were not tested throughly by the community, and may not work as expected. Only open source components with an <a href="https://opensource.org/licenses">OSI&nbsp;approved licenses</a> are allowed. </p>
        </section>

        <section>
          <form>
            <div className={s.Filters}>
              <Select<data.Category | 'any'>
                value={categoryFilter}
                onChange={setCategoryFilter}
                list={categoryFilterOptions.map((option) => ({
                  type: 'item',
                  value: option,
                  title: option === 'any' ? 'All Categories' : data.categoryLabels[option]
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

export default EcosystemPage;
