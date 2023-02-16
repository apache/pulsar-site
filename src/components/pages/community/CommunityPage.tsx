import React from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import TeamTable from "@site/src/components/TeamTable";
import PromoCallout from "@site/src/components/PromoCallout";
import WavySeparatorFive from "@site/static/img/separator-5.svg";
import team from "@site/data/team";
import Slider from "./shared/Slider/Slider";
import DiscussionPlatforms from "./sections/discussions/DiscussionPlatforms";
import HowToContribute from "./sections/how-to-contribute/HowToContribute";
import Section from "./shared/Section/Section";
import ProjectGovernance from "./sections/project-governance/ProjectGovernance";

const CommunityPage: React.FC = () => {
  return (
    <Layout
      title={"Community"}
      description={"Learn about the basics of using Apache Pulsar"}
    >
      <div className="page-wrap tailwind">
        <div className="hero-bg absolute z-0">
          <img
            className="relative"
            src={useBaseUrl("/img/community-hero-bg.jpg")}
            alt={"Community Hero"}
          />
        </div>
        <section
          id="section-welcome"
          className="scrollable hero hero--welcome pt-24 relative"
        >
          <div className="inner cf">
            <h1>Welcome to the Pulsar Community</h1>
            <div className="cf">
              <div className="md:w-2/3 md:float-left">
                <p className="text-lg">
                  The Apache Pulsar community includes people from around the
                  globe who are developing and using the messaging and streaming
                  platform for real-time workloads. We welcome contributions
                  from anyone with a passion for distributed systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="section-team" className="main-content relative">
          l
          <div className="inner pb-0 cf">
            <div className="cf flex flex-col md:items-center md:flex-row">
              <div className="md:w-1/2 md:pr-12">
                <h2>About the Community</h2>
                <p>
                  The Pulsar community is composed of members of the Project
                  Management Committee (PMC), committers, and contributors.
                  Committers have direct access to the source of a project and
                  actively evolve the codebase. Contributors improve the project
                  through submission of patches and suggestions to be reviewed
                  by the committers. The number of committers and contributors
                  to the project is unbounded.{" "}
                </p>
              </div>
              <Slider
                slides={[
                  {
                    img: useBaseUrl("/img/community-photo-small.jpg"),
                    alt: "community photo",
                  },
                  {
                    img: useBaseUrl("/img/community-image-2.jpg"),
                    alt: "community photo 2",
                  },
                  {
                    img: useBaseUrl("/img/community-image-3.jpg"),
                    alt: "community photo 3",
                  },
                ]}
              />
            </div>
            <div className="cf py-12 flex flex-col sm:flex-row">
              <div className="sm:w-1/3">
                <h3>
                  A successful project requires many people to play many roles.
                </h3>
              </div>
              <div className="sm:w-2/3 sm:pl-8">
                <p>
                  Some write code or documentation, while others are valuable as
                  testers, submitting patches, and suggestions. Get involved
                  today! All contributions to the project are greatly
                  appreciated.
                </p>
                <p>
                  Read the{" "}
                  <a
                    href="https://www.apache.org/foundation/policies/conduct"
                    className="secondary-cta"
                    target="_blank"
                  >
                    Apache Code of Conduct
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.apache.org/foundation/policies/conduct#reporting-guidelines"
                    className="secondary-cta"
                    target="_blank"
                  >
                    Reporting Guidelines
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <WavySeparatorFive />

        <Section title="Discussions" anchor="section-discussions">
          <DiscussionPlatforms />
        </Section>

        <Section title="Project Governance" anchor="section-governance">
          <ProjectGovernance />
        </Section>

        <Section title="How to Contribute" anchor="section-contribute">
          <HowToContribute />
        </Section>

        <Section anchor="section-community" title="Meet the Community">
          <p>
            Pulsar community consists of PMC members, committers and
            contributors.{" "}
          </p>
          <p>
            For the complete and up-to-date list, see{" "}
            <a
              className="secondary-cta"
              href="https://projects.apache.org/committee.html?pulsar"
              target="_blank"
            >
              Apache Pulsar Committee
            </a>
            .
          </p>
          <h3 className="text--center">PMC members</h3>
          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            <TeamTable data={team.pmc.slice(0, (team.pmc.length + 1) / 2)} />
            <TeamTable data={team.pmc.slice((team.pmc.length + 1) / 2)} />
          </div>
          <h3 className="text--center">Committers</h3>
          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            <TeamTable
              data={team.committers.slice(0, (team.committers.length + 1) / 2)}
            />
            <TeamTable
              data={team.committers.slice((team.committers.length + 1) / 2)}
            />
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-x-4">
            <img
              src="https://contributor-overtime-api.git-contributor.com/contributors-svg?chart=contributorOverTime&repo=apache/pulsar"
              alt={"Contributors over time"}
            />
            <img
              src="https://contributor-overtime-api.git-contributor.com/contributors-svg?chart=contributorMonthlyActivity&repo=apache/pulsar"
              alt={"Active contributors monthly"}
            />
          </div>
        </Section>

        <PromoCallout
          url="/blog"
          linkText="Read Now"
          text="Get up-to-date Pulsar insights on the blog"
        />
      </div>
    </Layout>
  );
};

export default CommunityPage;
