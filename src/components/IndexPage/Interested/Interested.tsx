import React from "react";
import H3 from "../../ui/H/H3";
import Link from "../../ui/Link/Link";
import s from "./Interested.module.css";

const Interested: React.FC = () => {
  return (
    <div className={s.Interested}>
      <div className={s.Content}>
        <div className={s.ReadableContent}>
          <H3>Interested in Pulsar?</H3>
          <div className={s.Description}>Now choose your next step:</div>
          <div>
            <div className={s.Option}>
              <Link href="/docs" variant="navigate">
                Learn
              </Link>
            </div>
            <div className={s.Option}>
              <Link href="#" variant="navigate">
                Ask question
              </Link>
            </div>
            <div className={s.Option}>
              <Link href="/community" variant="navigate">
                Join the community
              </Link>
            </div>
            <div className={s.Option}>
              <Link href="#" variant="navigate">
                Discover managed solutions and support providers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interested;
