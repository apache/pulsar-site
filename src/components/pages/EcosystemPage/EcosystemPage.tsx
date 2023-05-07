import React, { useState } from "react";
import Layout from "@theme/Layout";
import EcoCards from "./Cards/Cards";
import ecosystemData from '@site/data/ecosystem.js';
import Input from "@site/src/components/ui/Input/Input";
import Select from "@site/src/components/ui/Select/Select";
import Page from "@site/src/components/ui/Page/Page";
import s from './EcosystemPage.module.css';

const filterOptions = [
  'all_types',
  'client_api',
  'client_wrapper',
  'database_integration',
  'io',
  'logging',
  'observability',
  'protocol_handlers',
  'search_and_query',
  'security_plugins',
  'stream_processing',
  'tools'
] as const;
type FilterOption = typeof filterOptions[number];

function filterOptionToLabel(option: FilterOption): string {
  const labels: Record<FilterOption, string> = {
    'all_types': 'All Types',
    'client_api': 'Client API',
    'client_wrapper': 'Client Wrapper',
    'database_integration': 'Database Integration',
    'io': 'IO',
    'logging': 'Logging',
    'observability': 'Observability',
    'protocol_handlers': 'Protocol Handlers',
    'search_and_query': 'Search and Query',
    'security_plugins': 'Security Plugin',
    'stream_processing': 'Stream Processing',
    'tools': 'Tools'
  } as const;

  return labels[option];
}

const EcosystemPage: React.FC = () => {
  const [searchString, setSearch] = useState('');
  const [filterType, setFilterType] = React.useState<FilterOption>('all_types');

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
              <Select<FilterOption>
                value={filterType}
                onChange={setFilterType}
                list={filterOptions.map((option) => ({
                  type: 'item',
                  value: option,
                  title: filterOptionToLabel(option)
                }))}
              />

              <Input placeholder="Search" value={searchString} onChange={setSearch} clearable />
            </div>

            <div>
              {filterType === 'all_types' && <EcoCards search={searchString} resources={Object.values(ecosystemData).flat()} />}
              {filterType === 'client_api' && <EcoCards search={searchString} resources={ecosystemData.client_api} />}
              {filterType === 'client_wrapper' && <EcoCards search={searchString} resources={ecosystemData.client_wrapper} />}
              {filterType === 'database_integration' && <EcoCards search={searchString} resources={ecosystemData.database_integration} />}
              {filterType === 'io' && <EcoCards search={searchString} resources={ecosystemData.io} />}
              {filterType === 'logging' && <EcoCards search={searchString} resources={ecosystemData.logging} />}
              {filterType === 'observability' && <EcoCards search={searchString} resources={ecosystemData.observability} />}
              {filterType === 'protocol_handlers' && <EcoCards search={searchString} resources={ecosystemData.protocol_handlers} />}
              {filterType === 'search_and_query' && <EcoCards search={searchString} resources={ecosystemData.search_and_query} />}
              {filterType === 'security_plugins' && <EcoCards search={searchString} resources={ecosystemData.security_plugins} />}
              {filterType === 'stream_processing' && <EcoCards search={searchString} resources={ecosystemData.stream_processing} />}
              {filterType === 'tools' && <EcoCards search={searchString} resources={ecosystemData.tools} />}
            </div>
          </form>
        </section>
      </Page>
    </Layout>
  );
}

export default EcosystemPage;
