import React from "react";
import IconEvent from '@site/static/img/events.svg';
import IconGroups from '@site/static/img/groups.svg';
import IconPlaylists from '@site/static/img/playlists.svg';
import IconReplays from '@site/static/img/replays.svg';
export default function EventCards(props) {
  let eventsList = props.events;
  const type = props.type;
  // sort by start date
  eventsList.sort((a, b) => {
      return b.startDate - a.startDate;
  });
  function EventCard({title , link, displayDate, startDate, description }) {
    return (
      <div className={`mb-4 sm:mb-0 resource-card bg-white p-6 shadow-lg relative flex flex-col type-${props.type}`}>
        <div className="resource-card__icon mb-4 text--center relative z-5">
          {type === 'upcoming events' && <IconEvent></IconEvent>}
          {type === 'playlists' && <IconPlaylists></IconPlaylists>}
          {type === 'meetups' && <IconGroups></IconGroups>}
          {type === 'past events' && <IconReplays></IconReplays>}
        </div>
        <h3 className="mb-2 relative z-5"><a target="_blank" href={link}>{ title }</a></h3>
        {displayDate && <h5 className="mb-4 relative z-5">{ displayDate }</h5>}
        {description && <p>{ description} </p>}
        <a href={link} className="mt-6 secondary-cta secondary-cta--small" target="_blank">Learn More</a>
      </div>
    );
  }
  if(eventsList.length){
    return (
      <section className="resource-cards py-12 mx-auto">
        <div className="inner sm:grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
          {eventsList.map((props, idx) => (
            <EventCard key={idx} {...props} />
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section className="resource-cards py-12 mx-auto text--center">
       <h3>Sorry, there are currently no {props.type.toLowerCase()}.</h3>
      </section>
    )
  }
}
