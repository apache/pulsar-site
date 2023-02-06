import * as React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import EventCards from "../components/EventCards";
import FeaturedEvent from "../components/FeaturedEvent";
const resObj = require("../../data/events.js");
export default function Events() {
  const { siteConfig } = useDocusaurusContext();
  const now = Date.now();
  const events = resObj.events;
  const futureEvents = events.filter((e) =>{
    if(e.startDate){
      var unix = new Date(e.startDate).getTime();
      return unix > now;
    } else {
      return true;
    }
  });
  const pastEvents = events.filter((e) =>{
    if(e.startDate){
      var unix = new Date(e.startDate).getTime();
      return unix < now;
    }
  });
  return (
    <Layout title={`Events`} description="Apache Pulsar Events">
      <div className="page-wrap tailwind">
        <section className="hero">
          <div className="inner text--left">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <h1>Events</h1>
                <p>
                  Below is a list of key industry events hosted by Pulsar
                  contributors, as well as local meetups around the globe. If
                  you have one to add, learn more about submitting a pull
                  request
                  <a
                    href="https://github.com/apache/pulsar/pulls"
                    target="_blank"
                  >
                    {" "}
                    here.
                  </a>
                </p>
              </div>
              <div className="mt-12 md:mt-0 md:w-1/2">
                <FeaturedEvent
                  hidden="false" // use true to hide and false to show the featured event card
                  title="Pulsar Virtual Summit Europe 2023"
                  description="Pulsar Virtual Summit Europe 2023 will take place on Tuesday, May 23rd, 2023! The CFP is now open!"
                  date=""
                  link="https://sessionize.com/pulsar-virtual-summit-europe-2023/"
                  linkText="Submit your session"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="main-content waves-bg pt-12 pb-48 mb-24">
          <TabsUnstyled
            defaultValue={0}
            className="tabs tabs--resources block my-24 relative z-5"
          >
            <TabsListUnstyled className="block text--center tabs-bar py-8 px-4">
              <TabUnstyled className="mx-2">Meetups</TabUnstyled>
              <TabUnstyled className="mx-2">Playlists</TabUnstyled>
              {futureEvents.length && (
                <TabUnstyled className="mx-2">Upcoming Events</TabUnstyled>
              )}

              <TabUnstyled className="mx-2">Past Events</TabUnstyled>
            </TabsListUnstyled>
            <TabPanelUnstyled value={0}>
              <EventCards type="meetups" events={resObj.meetups} />
            </TabPanelUnstyled>
            <TabPanelUnstyled value={1}>
              <EventCards type="playlists" events={resObj.playlists} />
            </TabPanelUnstyled>
            {futureEvents.length ? (
              <>
                <TabPanelUnstyled value={2}>
                  {" "}
                  <EventCards type="upcoming events" events={futureEvents} />
                </TabPanelUnstyled>
                <TabPanelUnstyled value={3}>
                  <EventCards type="past events" events={pastEvents} />
                </TabPanelUnstyled>
              </>
            ) : (
              <TabPanelUnstyled value={2}>
                <EventCards type="past events" events={pastEvents} />
              </TabPanelUnstyled>
            )}
          </TabsUnstyled>
        </section>
      </div>
    </Layout>
  );
}
