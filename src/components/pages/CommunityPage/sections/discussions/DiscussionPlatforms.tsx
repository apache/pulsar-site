import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Button, { ButtonVariant } from "@site/src/components/ui/Button/Button";
import s from "./DiscussionPlatforms.module.css";
import Slider from '@site/src/components/ui/Slider/Slider';
import BrowserOnly from "@docusaurus/BrowserOnly";

type ActionButtonProps = {
  id: string;
  text: string;
  href: string;
  type: "primary" | "normal" | "link";
  isExternal?: boolean;
};

export type ContentCardProps = {
  title: string;
  description: React.ReactNode;
  image?: {
    src: string;
  };
  actions?: ActionButtonProps[];
};

const ContentCard: React.FC<ContentCardProps> = (props) => {
  return (
    <div className={s.DiscussionPlatformCard}>
      {props.image && (
        <div className={s.DiscussionPlatformCardImage}>
          <img src={props.image.src} />
        </div>
      )}
      <div className={s.DiscussionPlatformCardText}>
        <h3>{props.title}</h3>
        <div>{props.description}</div>
      </div>
      <div className={s.DiscussionPlatformCardActions}>
        {(props.actions || []).map((action) => (
          <ActionButton key={action.id} {...action} />
        ))}
      </div>
    </div>
  );
};

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  if (props.type === "link") {
  }

  let buttonVariant: ButtonVariant;
  switch (props.type) {
    case "primary":
      buttonVariant = "transparentBlack";
      break;
    case "normal":
      buttonVariant = "clean";
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

const DiscussionPlatforms: React.FC = () => {
  const platforms: ContentCardProps[] = [
    {
      title: "Slack",
      description: (
        <span>
          Use it for instant messaging and real-time discussions.
          <br />
          You can search the Slack discussions history on <a href="https://www.linen.dev/s/apache-pulsar" target="_blank">Linen</a>.
        </span>
      ),
      actions: [
        {
          id: "join-slack",
          text: "Join Slack",
          href: "https://communityinviter.com/apps/apache-pulsar/apache-pulsar",
          type: "primary",
          isExternal: true,
        },
        {
          id: "launch-slack",
          text: "Go to Slack",
          href: "https://apache-pulsar.slack.com/",
          type: "normal",
          isExternal: true,
        },
        {
          id: "history-slack",
          text: "Show History",
          href: "https://www.linen.dev/s/apache-pulsar",
          isExternal: true,
          type: "normal",
        },
      ],
      image: {
        src: useBaseUrl("/img/community_sl.svg"),
      },
    },
    {
      title: "Developer Mailing List",
      description: (
        <div>
          Questions and discussions related to Pulsar development.
        </div>
      ),
      actions: [
        {
          id: "subscribe",
          text: "Subscribe",
          href: "mailto:dev-subscribe@pulsar.apache.org?subject=subscribe&body=subscribe",
          type: "primary",
        },
        {
          id: "showarchives",
          text: "Show Archives",
          href: "https://lists.apache.org/list.html?dev@pulsar.apache.org",
          isExternal: true,
          type: "normal",
        },
      ],
      image: {
        src: useBaseUrl("/img/community_email.svg"),
      },
    },
    {
      title: "Community Meetings",
      description: (
        <span>
          The community meeting occurs biweekly on Thursdays to
          discuss new proposals, open pull requests, and host open discussions.
        </span>
      ),
      actions: [
        {
          id: "learnmore",
          text: "Learn More",
          href: "https://github.com/apache/pulsar/wiki/Community-Meetings",
          type: "primary",
          isExternal: true,
        },
      ],
      image: {
        src: useBaseUrl("/img/community_grp.svg"),
      },
    },
    {
      title: "Discussions at GitHub",
      description: (
        <div>
          A good place to ask any question, bring an idea or get support.
          Especially if you are not friends with mailing lists.
        </div>
      ),
      actions: [
        {
          id: "new-discussion",
          text: "New discussion",
          href: "https://github.com/apache/pulsar/discussions/new/choose",
          type: "primary",
          isExternal: true,
        },
        {
          id: "open",
          text: "Browse discussions",
          href: "https://github.com/apache/pulsar/discussions",
          type: "normal",
          isExternal: true,
        },
      ],
      image: {
        src: useBaseUrl("/img/community_gh.svg"),
      },
    },
    {
      title: "Stack Overflow",
      description: (
        <span>
          For technical questions, we ask that you post them to Stack Overflow
          using the tag apache-pulsar.
        </span>
      ),
      actions: [
        {
          id: "as",
          text: "Ask question",
          href: "https://stackoverflow.com/questions/ask?tags=apache-pulsar",
          type: "primary",
          isExternal: true,
        },
        {
          id: "browse",
          text: "Browse questions",
          href: "https://stackoverflow.com/questions/tagged/apache-pulsar",
          type: "normal",
          isExternal: true,
        },
      ],
      image: {
        src: useBaseUrl("/img/community_so.svg"),
      },
    },
    {
      title: "User Mailing List",
      description: (
        <div>
          General mailing list for user-related discussions.
        </div>
      ),
      actions: [
        {
          id: "subscribe",
          text: "Subscribe",
          href: "mailto:users-subscribe@pulsar.apache.org?subject=subscribe&body=subscribe",
          type: "primary",
        },
        {
          id: "showarchives",
          text: "Show Archives",
          href: "https://lists.apache.org/list.html?users@pulsar.apache.org",
          isExternal: true,
          type: "normal",
        },
      ],
      image: {
        src: useBaseUrl("/img/community_email.svg"),
      },
    },
    {
      title: "WeChat",
      description: (
        <span>
          Welcome to the Apache Pulsar Official Account at WeChat! The account
          ID is ApachePulsar.
        </span>
      ),
      actions: [{
        id: "wechat",
        text: "Go to WeChat",
        href: "https://web.wechat.com/",
        type: "primary",
        isExternal: true,
      }],
      image: {
        src: useBaseUrl("/img/community_wc.svg"),
      },
    },
  ];

  return <div>
    <div className={s.DiscussionPlatformsDesktop}>{(platforms || []).map((card) => (
        <div key={card.title} className={s.Card}>
          <ContentCard {...card} />
        </div>
      ))}</div>
    <div className={s.DiscussionPlatformsMobile}>
      <div className={s.Slider}>
        <BrowserOnly>
          {() => (
            <Slider centerMode={window.innerWidth > 800} slidesToShow={2}>
              {(platforms || []).map((card) => (
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

export default DiscussionPlatforms;

