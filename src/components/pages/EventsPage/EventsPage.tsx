import React, { useState } from "react";
import Layout from "@theme/Layout";
import Cards from "./Cards/Cards";
import * as data from '@site/data/events';
import Page from "@site/src/components/ui/Page/Page";
import s from './EventsPage.module.css';
import Button from "@site/src/components/ui/Button/Button";
import FeaturedEvent from "./FeaturedEvent/FeaturedEvent";

type CategoryFilterOption = data.Category;

const CaseStudiesPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = React.useState<CategoryFilterOption>('events');

  return (
    <Layout
      title={`Events`}
      description="Apache Pulsar Events"
    >
      <Page>
        <div className={s.TopBlock}>
          <section className={s.Header}>
            <h1>Events</h1>
            <p>
              Below is a list of key industry events hosted by Pulsar contributors,
              as well as local meetups around the globe.
              If you have one to add, learn more about submitting a pull request <a target="_blank" href="https://github.com/apache/pulsar/pulls">here</a>.
            </p>
          </section>

          <div className={s.FeaturedEvent}>
            <FeaturedEvent />
          </div>
        </div>
        <section>
          <form>
            <div className={s.Filters}>
              <div className={s.CategorySwitcher}>
                <Button
                  appearance={categoryFilter === 'events' ? 'action' : 'regular'}
                  onClick={() => setCategoryFilter('events')}
                  title="Events"
                />
                <Button
                  appearance={categoryFilter === 'meetups' ? 'action' : 'regular'}
                  onClick={() => setCategoryFilter('meetups')}
                  title="Meetups"
                />
                <Button
                  appearance={categoryFilter === 'playlists' ? 'action' : 'regular'}
                  onClick={() => setCategoryFilter('playlists')}
                  title="Playlists"
                />
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

export default CaseStudiesPage;
