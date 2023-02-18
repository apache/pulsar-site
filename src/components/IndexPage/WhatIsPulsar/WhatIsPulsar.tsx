import React from "react";
import s from "./WhatIsPulsar.module.css";
import H2 from "../../ui/H/H2";
import H3 from "../../ui/H/H3";
import Link from "../../ui/Link/Link";

import SplunkLogo from "./logos/splunk.svg";
import TencentLogo from "./logos/tencent.svg";
import YahooLogo from "./logos/yahoo.svg";
import IntuitLogo from "./logos/intuit.svg";
import HuaweiLogo from "./logos/huawei.svg";
import MicroFocusLogo from "./logos/micro-focus.svg";
import VivoLogo from "./logos/vivo.svg";
import ChinaMobileLogo from "./logos/china-mobile.svg";
import NttLogo from "./logos/ntt.svg";
import WavesBackground from "./waves.svg";

const WhatIsPulsar: React.FC = () => {
  return (
    <section className={s.WhatIsPulsar}>
      <div className={s.Content}>
        <div className={s.ReadableContent}>
          <H2>What is Apache Pulsar?</H2>

          <p className={s.Description}>
            Apache Pulsar is a powerful all-in-one distributed messaging and
            streaming platform that delivers high performance, scalability, and
            reliability for real-time data processing.
          </p>

          <div className={s.Section}>
            <H3>Trusted by</H3>

            <div className={s.CompanyLogos}>
              <YahooLogo className={s.CompanyLogo} />
              <TencentLogo
                className={s.CompanyLogo}
                style={{ transform: `scale(0.8)` }}
              />
              <IntuitLogo className={s.CompanyLogo} />
              <NttLogo
                className={s.CompanyLogo}
                style={{ transform: "scale(1.3)", margin: "0 1rem" }}
              />
              <SplunkLogo
                className={s.CompanyLogo}
                style={{ transform: "translate(0, 0.25rem)" }}
              />
              <MicroFocusLogo className={s.CompanyLogo} />
              <HuaweiLogo
                className={s.CompanyLogo}
                style={{ transform: "scale(1.3)", padding: "0 2rem" }}
              />
              <VivoLogo
                className={s.CompanyLogo}
                style={{ transform: "translate(0, -0.25rem)" }}
              />
              <ChinaMobileLogo className={s.CompanyLogo} />
            </div>

            <p className={s.Paragraph}>
              Apache Pulsar is used by many companies of all sizes, from
              startups to large&nbsp;enterprises.
            </p>

            <Link href="/case-studies" variant="navigate">
              See case studies
            </Link>
          </div>

          <div className={s.Section}>
            <H3>Why Apache Pulsar?</H3>
            <p className={s.Paragraph}>
              Pulsar is able to handle both messaging and streaming workloads
              seamlessly.
              <br />
              <br />
              You can process data in real-time as it
              arrives, allowing you to make decisions faster and respond more
              quickly to changing conditions.
              <br />
              <br />
              Plus, Pulsar offers flexible
              messaging models and messaging patterns, enabling you to build
              event-driven architectures and handle complex workflows with ease.
            </p>

            <Link href="#features" variant="navigate">
              More about features
            </Link>
          </div>

          <div className={s.Section}>
            <H3>Community</H3>
            <p className={s.Paragraph}>
              Pulsar is a Top 10 Apache Software Foundation project and has a
              vibrant and passionate community of its users.
            </p>
            <p className={s.Paragraph}>
              From online forums and documentation to meetups and conferences,
              there are endless opportunities to connect with like-minded
              individuals who are passionate about building the next generation
              of data-driven applications.
            </p>
            <ul>
              <li>Over 12 000 stars on GitHub.</li>
              <li>More than 9500 users in Slack workspace.</li>
              <li>Pulsar Summit conference and local meetups.</li>
            </ul>

            <Link href="/community" variant="navigate">
              Join the community
            </Link>
          </div>
        </div>
      </div>
      <WavesBackground className={s.WavesBackground} />
    </section>
  );
};

export default WhatIsPulsar;
