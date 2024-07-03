import React, { useState } from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/events';
import Page from "@site/src/components/ui/Page/Page";
import s from './EventsPage.module.css';
import FeaturedEvent from "./FeaturedEvent/FeaturedEvent";
import ContributeDataDrivenPage from "../../ui/ContributeDataDrivenPage/ContributeDataDrivenPage";

type CategoryFilterOption = data.Category;

const EventsPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilterOption>('events');
  let currcat = categoryFilter;

  return (
    <Layout
      title={`Events`}
      description="Apache Pulsar Events"
      wrapperClassName="LandingPage"
    >
      <Page>
        <div className={s.TopBlock}>
          <section className={s.Header}>
            <h1>Events</h1>
            <p>
              Below is a list of key industry events hosted by Pulsar contributors,
              as well as local meetups around the globe.
            </p>
            <ContributeDataDrivenPage />
          </section>

          <div className={s.FeaturedEvent}>
            <FeaturedEvent />
          </div>
        </div>
        <section>
          <form>
            <div className={s.Filters}>
              <div className={s.FiltersMobile}>
                {data.categories.map((category) => {
                  return (
                    <button type="button" key={category} data-option={category} onClick={() => setCategoryFilter(category)} className={s.CategoryFilterLink+(category === currcat ? ' '+s.active : '')}>{data.categoryLabels[category]}</button>
                  );
                })}
              </div>
            </div>

            <div>
              {data.categories.map((category) => {
                if (categoryFilter === category) {
                  return <Cards key={category} resources={data.resources[category]} />
                }
              })}
            </div>
          </form>
        </section>
      </Page>
    </Layout>
  );
}

export default EventsPage;
