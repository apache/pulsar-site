import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

import ContentCard, { ContentCardProps } from "../../shared/ContentCard/ContentCard";
import ContentCardsLayout from "../../shared/ContentCard/ContentCardsLayout";

import Slider from '@site/src/components/ui/Slider/Slider';
import BrowserOnly from "@docusaurus/BrowserOnly";

import Button, { ButtonVariant } from "@site/src/components/ui/Button/Button";

import s from "./HowToContribute.module.css";

type ActionButtonProps = {
  id: string;
  text: string;
  href: string;
  type: "primary" | "normal" | "link" | "transparentWhite" | "transparentBlack";
  isExternal?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  if (props.type === "link") {
  }

  let buttonVariant: ButtonVariant;
  switch (props.type) {
    case "primary":
      buttonVariant = "action";
      break;
    case "normal":
      buttonVariant = "regular";
      break;
    case "transparentBlack":
      buttonVariant = "transparentBlack";
      break;
    case "transparentWhite":
      buttonVariant = "transparentWhite";
      break;
  }

  return (
    <div className={s.ActionButton}>
      <Button
        variant={buttonVariant}
        target={props.isExternal ? "_blank" : undefined}
        href={props.href}
        title={props.text}
      />
    </div>

  );
};

const HowToContribute: React.FC = () => {
  const actions: ActionButtonProps[] = [
    {
      id: "contributing-to-the-project",
      href: useBaseUrl("/contribute"),
      text: "Contribution guide",
      type: "transparentBlack",
    },
    {
      id: "develop-coding-conventions",
      href: useBaseUrl("/contribute/develop-coding-conventions"),
      text: "Coding conventions",
      type: "transparentBlack",
    },
  ];
  const contentCards: ContentCardProps[] = [
    {
      format: "column",
      title: "Contributing to the Project",
      image: {
        src: useBaseUrl("/img/community_blt.svg"),
      },
      description: (
        <div>
          Pulsar has many different opportunities for contributions — you can write new examples/tutorials, add new user-facing libraries, write new Pulsar IO connectors, participate in documentation, and more.
        </div>
      ),
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
            <Slider slidesToShow={1}>
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
    <div className={s.Actions}>
      {(actions || []).map((action) => (
        <ActionButton key={action.id} {...action} />
      ))}
    </div>
  </div>;
};

export default HowToContribute;
