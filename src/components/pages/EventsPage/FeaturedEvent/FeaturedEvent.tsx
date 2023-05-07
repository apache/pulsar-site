import React from 'react';
import s from './FeaturedEvent.module.css'

// Change this to true to show the featured event.
const isShow = false;

const FeaturedEvent: React.FC = () => {
  if (isShow) {
    return null;
  }

  return (
    <div className={s.FeaturedEvent}>
      <div>Featured event</div>
      <h2>Pulsar Virtual Summit Europe 2023</h2>
      <p>Pulsar Virtual Summit Europe 2023 will take place on Tuesday, May 23rd, 2023! Don't miss this free one-day event!</p>
      <a
        href="https://events.zoom.us/ev/Ap6rsDg9LeVfmdajJ_eB13HH026J1d_o8OoTKkQnl_jzVl-srhwB~AggLXsr32QYFjq8BlYLZ5I06Dg"
        target='_blank'
      >Register</a>
    </div>
  );
}

export default FeaturedEvent;

