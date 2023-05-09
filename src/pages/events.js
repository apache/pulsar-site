import * as React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Tabs from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tab from '@mui/base/Tab';
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
                  description="Pulsar Virtual Summit Europe 2023 will take place on Tuesday, May 23rd, 2023! Don't miss this free one-day event!"
                  date=""
                  link="https://events.zoom.us/ev/Ap6rsDg9LeVfmdajJ_eB13HH026J1d_o8OoTKkQnl_jzVl-srhwB~AggLXsr32QYFjq8BlYLZ5I06Dg"
                  linkText="Register"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="main-content waves-bg pt-12 pb-48 mb-24">
          <Tabs
            defaultValue={0}
            className="tabs tabs--resources block my-24 relative z-5"
          >
            <TabsList className="block text--center tabs-bar py-8 px-4">
              <Tab className="mx-2">Meetups</Tab>
              <Tab className="mx-2">Playlists</Tab>
              {futureEvents.length && (
                <Tab className="mx-2">Upcoming Events</Tab>
              )}

              <Tab className="mx-2">Past Events</Tab>
            </TabsList>
            <TabPanel value={0}>
              <EventCards type="meetups" events={resObj.meetups} />
            </TabPanel>
            <TabPanel value={1}>
              <EventCards type="playlists" events={resObj.playlists} />
            </TabPanel>
            {futureEvents.length ? (
              <>
                <TabPanel value={2}>
                  {" "}
                  <EventCards type="upcoming events" events={futureEvents} />
                </TabPanel>
                <TabPanel value={3}>
                  <EventCards type="past events" events={pastEvents} />
                </TabPanel>
              </>
            ) : (
              <TabPanel value={2}>
                <EventCards type="past events" events={pastEvents} />
              </TabPanel>
            )}
          </Tabs>
        </section>
      </div>
    </Layout>
  );
}
