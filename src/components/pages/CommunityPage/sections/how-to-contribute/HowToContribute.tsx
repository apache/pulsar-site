import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

import ContentCard, { ContentCardProps } from "../../shared/ContentCard/ContentCard";
import ContentCardsLayout from "../../shared/ContentCard/ContentCardsLayout";

import Slider from '@site/src/components/ui/Slider/Slider';
import BrowserOnly from "@docusaurus/BrowserOnly";

import s from "./HowToContribute.module.css";

const HowToContribute: React.FC = () => {
  const contentCards: ContentCardProps[] = [
    {
      format: "column",
      title: "Contributing to the Project",
      image: {
        src: useBaseUrl("/img/community_blt.svg"),
      },
      description: (
        <div>
          Pulsar has many different opportunities for contributions -- you can write new examples/tutorials, add new user-facing libraries, write new Pulsar IO connectors, participate in documentation, and more.
        </div>
      ),
      actions: [
        {
          id: "contributing-to-the-project",
          href: useBaseUrl("/contribute"),
          text: "Contribution guide",
          type: "transparentblack",
        },
        {
          id: "develop-coding-conventions",
          href: useBaseUrl("/contribute/develop-coding-conventions"),
          text: "Coding conventions",
          type: "transparentblack",
        },
      ],
    },
    {
      format: "column",
      title: "Reporting Bugs",
      image: {
        src: useBaseUrl("/img/community_bug.svg"),
      },
      description: (
        <div>
          If you encounter a problem with Pulsar, the first places to ask for help are the user mailing list or Stack Overflow.
          <br />
          If, after having asked for help, you suspect that you have found a bug in Pulsar, you should report it to the developer mailing list or by opening GitHub Issue. Please provide as much detail as you can on your problem. Don&apos;t forget to indicate which version of Pulsar you are running and on which environment.
        </div>
      ),
    },
    {
      format: "column",
      title: "Reporting a Vulnerability",
      image: {
        src: useBaseUrl("/img/community_shld.svg"),
      },
      description: (
        <div>
          To report a vulnerability for Pulsar, contact the <a href="https://www.apache.org/security/projects.html">Apache Security Team</a>.
          <br />
          The process for reporting a vulnerability is outlined <a href="https://www.apache.org/security/" target="_blank">here</a>. When reporting a vulnerability to <a href="mailto:security@apache.org">security@apache.org</a>, you can copy your email to <a href="mailto:private@pulsar.apache.org">private@pulsar.apache.org</a> to send your report to the Apache Pulsar Project Management Committee. This is a private mailing list.
        </div>
      ),
    },
  ];

  return <div>
    <div className={s.HowToContributeDesktop}>
      <ContentCardsLayout cards={contentCards} columns={3} />
    </div>
    <div className={s.HowToContributeMobile}>
      <div className={s.Slider}>
        <BrowserOnly>
          {() => (
            <Slider centerMode={window.innerWidth > 800} slidesToShow={2}>
              {(contentCards || []).map((card) => (
                <div key={card.title} className={s.Card}>
                  <ContentCard {...card} />
                </div>
              ))}
            </Slider>
          )}
        </BrowserOnly>
      </div>
    </div>
  </div>;
};

export default HowToContribute;
