import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { ContentCardProps } from "../../shared/ContentCard/ContentCard";
import ContentCardsLayout from "../../shared/ContentCard/ContentCardsLayout";

const DiscussionPlatforms: React.FC = () => {
  const platforms: ContentCardProps[] = [
    {
      title: "User Mailing List",
      description: (
        <div>
          General mailing list for user-related discussions.
          <br />
          <a
            href="https://lists.apache.org/list.html?users@pulsar.apache.org"
            target="_blank"
          >
            Access the archives
          </a>
        </div>
      ),
      actions: [
        {
          id: "subscribe",
          text: "Subscribe",
          href: "mailto:users-subscribe@pulsar.apache.org",
          type: "primary",
        },
        {
          id: "unsubscribe",
          text: "Unsubscribe",
          href: "mailto:users-unsubscribe@pulsar.apache.org",
          type: "normal",
        },
      ],
      image: {
        src: useBaseUrl("/img/mailing-list.svg"),
      },
    },
    {
      title: "Developer Mailing List",
      description: (
        <div>
          Questions and discussions related to Pulsar development.
          <br />
          <a
            href="https://lists.apache.org/list.html?dev@pulsar.apache.org"
            target="_blank"
          >
            Access the archives
          </a>
        </div>
      ),
      actions: [
        {
          id: "subscribe",
          text: "Subscribe",
          href: "mailto:dev-subscribe@pulsar.apache.org",
          type: "primary",
        },
        {
          id: "unsubscribe",
          text: "Unsubscribe",
          href: "mailto:dev-unsubscribe@pulsar.apache.org",
          type: "normal",
        },
      ],
      image: {
        src: useBaseUrl("/img/mailing-list.svg"),
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
          href: "https://github.com/apache/pulsar/discussions/new",
          type: "primary",
          isExternal: true,
        },
        {
          id: "open",
          text: "Browse",
          href: "https://github.com/apache/pulsar/discussions",
          type: "normal",
          isExternal: true,
        },
      ],
      image: {
        src: useBaseUrl("/img/github-mark.svg"),
      },
    },
    {
      title: "Stack Overflow",
      description: (
        <span>
          For technical questions, we ask that you post them to Stack Overflow
          using the tag{" "}
          <code style={{ whiteSpace: "nowrap" }}>apache-pulsar</code>.
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
          text: "Browse",
          href: "https://stackoverflow.com/questions/tagged/apache-pulsar",
          type: "normal",
          isExternal: true,
        },
      ],
      image: {
        src: useBaseUrl("/img/stackoverflow-logo.svg"),
      },
    },
    {
      title: "Slack",
      description: (
        <>
          Use it for instant messaging and real-time discussions.
          <br />
          <br />
          Keep in mind that asking questions in Slack makes it harder to find
          the answers later, due to Slack history isn&apos;t indexable by search
          engines like Google.
        </>
      ),
      actions: [
        {
          id: "sign-up",
          text: "Sign-up",
          href: "https://communityinviter.com/apps/apache-pulsar/apache-pulsar",
          type: "primary",
          isExternal: true,
        },
        {
          id: "launch-slack",
          text: "Launch Slack",
          href: "https://apache-pulsar.slack.com/",
          type: "normal",
          isExternal: true,
        },
      ],
      image: {
        src: useBaseUrl("/img/Slack_Mark.svg"),
      },
    },
    {
      title: "WeChat",
      description: (
        <span>
          Welcome to the Apache Pulsar Official Account at WeChat! The account
          ID is <code>ApachePulsar</code>.
        </span>
      ),
      image: {
        src: useBaseUrl("/img/wechat-logo.svg"),
      },
    },
    {
      title: "Community Meetings",
      description: (
        <span>
          The community meeting occurs biweekly on Tuesdays and Thursdays to
          discuss new proposals, open pull requests, and host open discussions.
        </span>
      ),
      actions: [
        {
          id: "see-details",
          text: "See details",
          href: "https://github.com/apache/pulsar/wiki/Community-Meetings",
          type: "primary",
          isExternal: true,
        },
      ],
      image: {
        src: useBaseUrl("/img/community-meetings.svg"),
      },
    },
  ];

  return <ContentCardsLayout cards={platforms} columns={2} />;
};

export default DiscussionPlatforms;
