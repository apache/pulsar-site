import React from "react";
import { ContentCardProps } from "../../shared/ContentCard/ContentCard";
import ContentCardsLayout from "../../shared/ContentCard/ContentCardsLayout";

const ProjectGovernance: React.FC = () => {
  const cards: ContentCardProps[] = [
    {
      title: "Project Management Committee (PMC)",
      description: (
        <>
          Apache Pulsar is independently managed by its PMC, the governing body
          tasked with project management.
          <br />
          <br />
          <strong>Responsibilities:</strong>
          <ul>
            <li>Technical direction.</li>
            <li>Voting on new committers and PMC members.</li>
            <li>Setting policies.</li>
            <li>Formally voting on software product releases.</li>
          </ul>
        </>
      ),
      actions: [
        {
          id: "project-independence-overview",
          text: "Project independence overview",
          href: "https://community.apache.org/projectIndependence",
          type: "primary",
          isExternal: true,
        },
        {
          id: "pmcs",
          text: "PMCs",
          href: "https://www.apache.org/foundation/governance/pmcs.html",
          type: "normal",
          isExternal: true,
        },
        {
          id: "voting-process",
          text: "Voting process",
          href: "https://www.apache.org/foundation/voting.html",
          type: "normal",
          isExternal: true,
        },
        {
          id: "apache-way",
          text: "The Apache way",
          href: "https://www.apache.org/theapacheway/index.html",
          type: "normal",
          isExternal: true,
        },
      ],
    },
  ];

  return <ContentCardsLayout cards={cards} columns={1} />;
};

export default ProjectGovernance;
