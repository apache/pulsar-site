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
          <div>
            <div className={s.Option}>
              <Link href="mailto:users@pulsar.apache.org" variant="navigate">
                Ask a question
              </Link>
            </div>
            <div className={s.Option}>
              <Link href="/blog" variant="navigate">
                Checkout the blog
              </Link>
            </div>
            <div className={s.Option}>
              <Link href="/docs" variant="navigate">
                Learn Pulsar
              </Link>
            </div>
            <div className={s.Option}>
              <Link href="/community" variant="navigate">
                Join the community
              </Link>
            </div>
            <div className={s.Option}>
              <Link href="#" variant="navigate">
                Discover support providers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interested;
