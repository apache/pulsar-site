import React, { useEffect } from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import TeamTable from "@site/src/components/TeamTable";
import PromoCallout from "@site/src/components/PromoCallout";
import PillButton from "@site/src/components/PillButton";
import WavySeparatorFive from "@site/static/img/separator-5.svg";
import WavySeparatorSix from "@site/static/img/separator-6.svg";
import team from "@site/data/team";
import Slider from "./Slider";
import DiscussionPlatforms from "./DiscussionPlatforms";

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

        <section id="section-discussions">
          <div className="inner pt-12">
            <h2 className="text--center">Discussions</h2>
            <DiscussionPlatforms />
          </div>
        </section>

        <WavySeparatorSix />

        <section id="section-governance" className="py-12 scrollable">
          <div className="inner">
            <h2>Project Governance</h2>
            <p>
              Apache Pulsar is independently managed by its Project Management
              Committee (PMC)—the governing body tasked with project management
              including technical direction, voting on new committers and PMC
              members, setting policies, and formally voting on software product
              releases.
            </p>
            <PillButton
              variant="primary"
              target="_blank"
              href="https://community.apache.org/projectIndependence"
            >
              ASF PROJECT INDEPENDENCE OVERVIEW
            </PillButton>
            <PillButton
              variant="grey"
              target="_blank"
              href="https://www.apache.org/foundation/governance/pmcs.html"
            >
              ASF PMC OVERVIEW
            </PillButton>
            <PillButton
              variant="primary"
              target="_blank"
              href="https://www.apache.org/theapacheway/index.html"
            >
              THE APACHE WAY
            </PillButton>
          </div>
        </section>
        <section id="section-contribute" className="py-12 scrollable">
          <div className="inner">
            <h2 className="text-center sm:text-left">How to Contribute</h2>
            <div className="">
              <div className="flex flex-col  sm:flex-row items-center py-12">
                <div className="sm:w-1/3 section-icon px-12">
                  <img src={useBaseUrl("/img/contribute.svg")} />
                </div>
                <div className="sm:w-2/3">
                  <h3>Contributing to the Project</h3>
                  <p>
                    Pulsar has many different opportunities for contributions --
                    you can write new examples/tutorials, add new user-facing
                    libraries, write new Pulsar IO connectors, participate in
                    documentation, and more.{" "}
                  </p>
                  <PillButton
                    variant="primary"
                    href={useBaseUrl("contribute")}
                  >
                    Contribution Guide
                  </PillButton>
                  <PillButton
                    variant="grey"
                    href={useBaseUrl("contribute/develop-coding-conventions")}
                  >
                    Coding Conventions
                  </PillButton>
                </div>
              </div>
              <div className="flex flex-col  sm:flex-row items-center  py-12">
                <div className="sm:w-1/3 section-icon px-12">
                  <img
                    src={useBaseUrl("/img/report-bugs.svg")}
                    alt={"Report bugs"}
                  />
                </div>
                <div className="sm:w-2/3 ">
                  <h3>Reporting Bugs</h3>
                  <p>
                    If you encounter a problem with Pulsar, the first places to
                    ask for help are the user mailing list or Stack Overflow.
                  </p>
                  <p>
                    If, after having asked for help, you suspect that you have
                    found a bug in Pulsar, you should report it to the developer
                    mailing list or by opening GitHub Issue. Please provide as
                    much detail as you can on your problem. Don’t forget to
                    indicate which version of Pulsar you are running and on
                    which environment.
                  </p>
                </div>
              </div>
              <div className="flex flex-col  sm:flex-row items-center py-12">
                <div className="sm:w-1/3 section-icon  px-12">
                  <img src={useBaseUrl("/img/report-vulnerabillity.svg")} />
                </div>
                <div className="sm:w-2/3">
                  <h3>Reporting a Vulnerability</h3>
                  <p>
                    To report a vulnerability for Pulsar, contact the{" "}
                    <a
                      className="secondary-cta"
                      href="https://www.apache.org/security/projects.html"
                      target="_blank"
                    >
                      Apache Security Team
                    </a>
                    .
                  </p>
                  <p>
                    The process for reporting a vulnerability is outlined
                    <a
                      className="secondary-cta"
                      href="https://www.apache.org/security/"
                      target="_blank"
                    >
                      here
                    </a>
                    . When reporting a vulnerability to
                    <a
                      className="secondary-cta"
                      href="mailto:security@apache.org"
                      target="_blank"
                    >
                      security@apache.org
                    </a>
                    , you can copy your email to
                    <a
                      className="secondary-cta"
                      href="mailto:private@pulsar.apache.org"
                      target="_blank"
                    >
                      private@pulsar.apache.org
                    </a>
                    to send your report to the Apache Pulsar Project Management
                    Committee. This is a private mailing list.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <WavySeparatorSix></WavySeparatorSix>
        <section id="section-community" className="py-12 scrollable">
          <div className="inner">
            <h2 className="text--center">Meet the Community</h2>
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
                data={team.committers.slice(
                  0,
                  (team.committers.length + 1) / 2
                )}
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
          </div>
        </section>
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
