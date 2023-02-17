import React from "react";
import s from "./Greeting.module.css";
import SineWavesAnimation from "./SineWaves/SineWavesAnimation";

const Greeting: React.FC = () => {
  return (
    <section className={s.Greeting}>
      <div className={s.Content}>
        <div className={s.Text}>
          <h1 className={s.Title}>
            Cloud-Native, Distributed Messaging and Streaming
          </h1>
          <p className={s.Description}>
            Apache® Pulsar™ is an open-source, distributed messaging and
            streaming platform built for the cloud.
          </p>

          <div className={s.Animation}>
            <SineWavesAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Greeting;
