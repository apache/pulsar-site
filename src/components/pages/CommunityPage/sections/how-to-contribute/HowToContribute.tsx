import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";

import { ContentCardProps } from "../../shared/ContentCard/ContentCard";
import ContentCardsLayout from "../../shared/ContentCard/ContentCardsLayout";

const HowToContribute: React.FC = () => {
  const contentCards: ContentCardProps[] = [
    {
      title: "Contributing to the Project",
      description: (
        <>
          Pulsar has many different opportunities for contributions -- you can
          write new examples/tutorials, add new user-facing libraries, write new
          Pulsar IO connectors, participate in documentation, and more."
        </>
      ),
      actions: [
        {
          id: "contributing-to-the-project",
          href: useBaseUrl("/contribute"),
          text: "Contribution guide",
          type: "primary",
        },
        {
          id: "develop-coding-conventions",
          href: useBaseUrl("/contribute/develop-coding-conventions"),
          text: "Coding conventions",
          type: "normal",
        },
      ],
    },
    {
      title: "Reporting Bugs",
      description: (
        <>
          If you encounter a problem with Pulsar, the first places to ask for
          help are the user mailing list or Stack Overflow.
          <br />
          <br />
          If, after having asked for help, you suspect that you have found a bug
          in Pulsar, you should report it to the developer mailing list or by
          opening GitHub Issue. Please provide as much detail as you can on your
          problem. Don&apos;t forget to indicate which version of Pulsar you are
          running and on which environment.
        </>
      ),
    },
    {
      title: "Reporting a Vulnerability",
      description: (
        <>
          To report a vulnerability for Pulsar, contact the{" "}
          <a href="https://www.apache.org/security/projects.html">
            Apache Security Team
          </a>
          .
          <br />
          The process for reporting a vulnerability is outlined{" "}
          <a href="https://www.apache.org/security/" target="_blank">
            here
          </a>
          . When reporting a vulnerability to{" "}
          <a href="mailto:security@apache.org">security@apache.org</a>, you can
          copy your email to{" "}
          <a href="mailto:private@pulsar.apache.org">
            private@pulsar.apache.org
          </a>{" "}
          to send your report to the Apache Pulsar Project Management Committee.
          This is a private mailing list.
        </>
      ),
    },
  ];

  return <ContentCardsLayout cards={contentCards} columns={1} />;
};

export default HowToContribute;
