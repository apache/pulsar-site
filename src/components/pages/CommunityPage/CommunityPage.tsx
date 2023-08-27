import React from "react";
import Layout from "@theme/Layout";
import s from "./CommunityPage.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import TeamTable from "@site/src/components/pages/CommunityPage/TeamTable";
import team from "@site/data/team";
import DiscussionPlatforms from "./sections/discussions/DiscussionPlatforms";
import HowToContribute from "./sections/how-to-contribute/HowToContribute";
import Section from "./shared/Section/Section";
import ProjectGovernance from "./sections/project-governance/ProjectGovernance";
import Slider from '@site/src/components/ui/Slider/Slider';
import Page from "@site/src/components/ui/Page/Page";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Button from "@site/src/components/ui/Button/Button";

export default function CommunityPage(): JSX.Element {
  return (
    <Layout
      title={"Community"}
      description={"Learn about the basics of using Apache Pulsar"}
    >
      <Page>
        <section id="section-welcome">
          <div>
            <h1>Welcome to the Pulsar Community</h1>

            <p className={s.Paragraph}>
              The Apache Pulsar community includes people from around the
              globe who are developing and using the messaging and streaming
              platform for real-time workloads. We welcome contributions
              from anyone with a passion for distributed systems.
            </p>
          </div>
        </section>

        <section id="section-team">
          <h2>About the Community</h2>

          <div>
            <p className={s.Paragraph}>
              The Pulsar community is composed of members of the Project
              Management Committee (PMC), committers, and contributors.
              Committers have direct access to the source of a project and
              actively evolve the codebase. Contributors improve the project
              through submission of patches and suggestions to be reviewed
              by the committers. The number of committers and contributors
              to the project is unbounded.{" "}
            </p>

            <div className={s.Slider}>
              <BrowserOnly>
                {() => (
                  <Slider centerMode={window.innerWidth > 800} slidesToShow={3}>
                    {[
                      {
                        img: useBaseUrl("/img/community-image-6.jpg"),
                        alt: "Apache Pulsar community photo",
                      },
                      {
                        img: useBaseUrl("/img/community-image-1.jpg"),
                        alt: "Apache Pulsar community photo",
                      },
                      {
                        img: useBaseUrl("/img/community-image-3.jpg"),
                        alt: "Apache Pulsar community photo",
                      },

                      {
                        img: useBaseUrl("/img/community-image-2.jpg"),
                        alt: "Apache Pulsar community photo",
                      },
                      {
                        img: useBaseUrl("/img/community-image-5.jpg"),
                        alt: "Apache Pulsar community photo",
                      },
                      {
                        img: useBaseUrl("/img/community-image-4.jpg"),
                        alt: "Apache Pulsar community photo",
                      },
                    ].map((slide, i) => (
                      <div key={i} className={s.Slide}>
                        <img className={s.SlideImage} alt={slide.alt} src={slide.img} />
                      </div>
                    ))}
                  </Slider>
                )}
              </BrowserOnly>
            </div>
          </div>

          <div>
            <div>
              <h3>
                A successful project requires many people to play many roles.
              </h3>
            </div>
            <div>
              <p className={s.Paragraph}>
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
        </section>

        <Section title="Discussions" anchor="section-discussions">
          <DiscussionPlatforms />
        </Section>

        <div className={s.SectionWithBackground}>
          <Section title="Project Governance" anchor="section-governance">
            <ProjectGovernance />
          </Section>

          <Section title="How to Contribute" anchor="section-contribute">
            <HowToContribute />
          </Section>
        </div>

        <Section anchor="section-community" title="Meet the Community">
          <p>
            Pulsar community consists of PMC members, committers and
            contributors.{" "}
            <br />
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
          <br />
          <h3>PMC members ({team.pmc.length})</h3>
          <div>
            <TeamTable data={team.pmc} />
          </div>
          <br />
          <h3>Committers ({team.committers.length})</h3>
          <div>
            <TeamTable
              data={team.committers}
            />
          </div>
          <div className={s.StatTables}>
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

        <div className={s.PromoCallout}>
          <h3>Get up-to-date Pulsar insights on the blog.</h3>
          <Button
            title="Read Now"
            variant="action"
            href={`${useBaseUrl("blog")}`}
          />
        </div>
      </Page>
    </Layout>
  );
};
