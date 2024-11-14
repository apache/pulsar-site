import React from "react";
import { ContentCardProps } from "../../shared/ContentCard/ContentCard";
import ContentCardsLayout from "../../shared/ContentCard/ContentCardsLayout";

const ProjectGovernance: React.FC = () => {
  const cards: ContentCardProps[] = [
    {
      description: (
        <div>
          <p>
            Project Management Committee (PMC).<br />
            Apache Pulsar is independently managed by its PMC, the governing body tasked with project management. 
          </p>
          <p>
            Members are resposible for Technical direction, Voting on new committers and PMC members, Setting policies and Formally voting on software product releases.
          </p>
          <p>
            Learn more about <a href="https://community.apache.org/projectIndependence" title="Project independence overview" target="_blank">Project independence overview</a>, <a href="https://www.apache.org/foundation/governance/pmcs.html" title="PMCs" target="_blank">PMCs</a>, <a href="https://www.apache.org/foundation/voting.html" title="Voting process" target="_blank">Voting process</a> and <a href="https://www.apache.org/theapacheway/index.html" title="The Apache way guidelines" target="_blank">The Apache way guidelines</a>
          </p>
        </div>
      ),
    },
  ];

  return <ContentCardsLayout cards={cards} columns={1} />;
};

export default ProjectGovernance;
