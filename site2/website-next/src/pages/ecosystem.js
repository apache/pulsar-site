import React, { useState } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import EcoCards from "../components/EcoCards";
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import ecoObj from '@site/data/ecosystem.js';


// create combine the arrays from each category.
let eObj = ecoObj;
// add type as a property to each object to use in the tile cta.
Object.keys(eObj).forEach(key =>{
  ecoObj[key].forEach((obj) => {
    obj.type = key.charAt(0).toUpperCase() + key.slice(1);;
  })
});

let allArr = [];
Object.keys(ecoObj).forEach(key => {
  allArr = [...allArr, ...ecoObj[key]];
});

export default function Home() {
  const [searchString, setSearch] = useState('');
  return (
    <Layout
      title={`Ecosystem`}
      description="Learn about the basics of using Apache Pulsar"
    >    
     <div className="page-wrap tailwind">
        <section className="hero">
          <div className="inner text--left">
            <div className="row">
              <div className="col col--8">
                <h1>Ecosystem</h1>
                <p>Our ecosystem includes a range of third-party Pulsar projects and tools that may be useful to end users. Please note that not all of these are supported by the community.</p>

              </div>
            </div>
          </div>
        </section>
        <section className="main-content waves-bg py-12 mb-24">
          
          <TabsUnstyled defaultValue={0} className="tabs tabs--resources block my-24 relative z-5">
            <TabsListUnstyled className="block text--center tabs-bar py-8 px-4">
              <TabUnstyled className="mx-2">All</TabUnstyled>
              <TabUnstyled className="mx-2">Client API</TabUnstyled>
              <TabUnstyled className="mx-2">Client Wrapper</TabUnstyled>
              <TabUnstyled className="mx-2">Database Integration</TabUnstyled>
              <TabUnstyled className="mx-2">IO</TabUnstyled>
              <TabUnstyled className="mx-2">Logging</TabUnstyled>
              <TabUnstyled className="mx-2">Observability</TabUnstyled>
              <TabUnstyled className="mx-2">Protocol Handlers</TabUnstyled>
              <TabUnstyled className="mx-2">Search and Query </TabUnstyled>
              <TabUnstyled className="mx-2">Security Plugin</TabUnstyled>
              <TabUnstyled className="mx-2">Stream Processing</TabUnstyled>
              <TabUnstyled className="mx-2">Tools</TabUnstyled>
            </TabsListUnstyled>
            <form className="search-form relative z10 text--center">
              <label className="block mb-4">Search by name or description key word: </label>
              <input type="text" className="ml-2 px-2" name="search" value={searchString} onChange={e => setSearch(e.target.value)} />
              <div className="inline-block px-4 cursor-pointer ml-4 underline underline-offset-1 text-sm font-light" onClick={e => setSearch('')} >Clear Search</div>
            </form>
            <TabPanelUnstyled value={0}><EcoCards search={searchString} resources={allArr} /></TabPanelUnstyled>
            <TabPanelUnstyled value={1}><EcoCards search={searchString} resources={ecoObj.client_api} /></TabPanelUnstyled>
            <TabPanelUnstyled value={2}><EcoCards search={searchString} resources={ecoObj.client_wrapper} /></TabPanelUnstyled>
            <TabPanelUnstyled value={3}><EcoCards search={searchString} resources={ecoObj.database_integration} /></TabPanelUnstyled>
            <TabPanelUnstyled value={4}><EcoCards search={searchString} resources={ecoObj.io} /></TabPanelUnstyled>
            <TabPanelUnstyled value={5}><EcoCards search={searchString} resources={ecoObj.logging} /></TabPanelUnstyled>
            <TabPanelUnstyled value={6}><EcoCards search={searchString} resources={ecoObj.observability} /></TabPanelUnstyled>
            <TabPanelUnstyled value={7}><EcoCards search={searchString} resources={ecoObj.protocol_handlers} /></TabPanelUnstyled>
            <TabPanelUnstyled value={8}><EcoCards search={searchString} resources={ecoObj.search_and_query} /></TabPanelUnstyled>
            <TabPanelUnstyled value={9}><EcoCards search={searchString} resources={ecoObj.security_plugins} /></TabPanelUnstyled>
            <TabPanelUnstyled value={10}><EcoCards search={searchString} resources={ecoObj.stream_processing} /></TabPanelUnstyled>
            <TabPanelUnstyled value={11}><EcoCards search={searchString} resources={ecoObj.tools} /></TabPanelUnstyled>
          </TabsUnstyled>
        </section>
      </div>
    </Layout>
  );
}
