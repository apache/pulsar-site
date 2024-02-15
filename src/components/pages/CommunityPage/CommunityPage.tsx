import React, { useState } from "react";
import Layout from "@theme/Layout";
import s from "./CommunityPage.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import team from "@site/data/team";
import communityNumbers from "@site/data/community-numbers";
import DiscussionPlatforms from "./sections/discussions/DiscussionPlatforms";
import HowToContribute from "./sections/how-to-contribute/HowToContribute";
import Section from "./shared/Section/Section";
import ProjectGovernance from "./sections/project-governance/ProjectGovernance";
import Slider from '@site/src/components/ui/Slider/Slider';
import BrowserOnly from "@docusaurus/BrowserOnly";
import Button from "@site/src/components/ui/Button/Button";

export default function CommunityPage(): JSX.Element {

  const [isShowMorePMC, setIsShowMorePMC] = useState(false);
  const showMorePMCButton = (
    <Button title={isShowMorePMC ? 'Show less' : 'Show more'} variant="transparentWhite" onClick={() => setIsShowMorePMC(!isShowMorePMC)}/>
  );

  const [isShowMoreCmtrs, setIsShowMoreCmtrs] = useState(false);
  const showMoreCmtrsButton = (
    <Button title={isShowMoreCmtrs ? 'Show less' : 'Show more'} variant="transparentWhite" onClick={() => setIsShowMoreCmtrs(!isShowMoreCmtrs)}/>
  );
  
  let teamPMCSets = new Array(Math.ceil(team.pmc.length/5));
  let teamCtrsSets = new Array(Math.ceil(team.committers.length/5));

  let countTheSet = 0;
  let countTheSets = 0;
  team.pmc.forEach(element => {
    countTheSet++;
    if((countTheSet-1)%5 == 0){ countTheSets++; }
    if(!Array.isArray(teamPMCSets[countTheSets])) teamPMCSets[countTheSets] = new Array();
    teamPMCSets[countTheSets].push(element);
  });

  countTheSet = countTheSets = 0;

  team.committers.forEach(element => {
    countTheSet++;
    if((countTheSet-1)%5 == 0){ countTheSets++; }
    if(!Array.isArray(teamCtrsSets[countTheSets])) teamCtrsSets[countTheSets] = new Array();
    teamCtrsSets[countTheSets].push(element);
  });

  return (
    <Layout title={"Community"} description={"Learn about the basics of using Apache Pulsar"} >
        <section className={s.CommunityHeader}>
          <div className={s.CommunityContent}>
            <h1>Welcome to the Pulsar Community</h1>
            <p className={s.Paragraph}>
              The Apache Pulsar community includes people from around the
              globe who are developing and using the messaging and streaming
              platform for real-time workloads. We welcome contributions
              from anyone with a passion for distributed systems.
            </p>
          </div>
        </section>

        <section className={s.CommunityAbout}>
          <div className={s.CommunityContent}>
            <h2>About the Community</h2>

            <div>
              <p className={s.SmallParagraph}>
                The Pulsar community is composed of members of the Project
                Management Committee (PMC), committers, and contributors.
                Committers have direct access to the source of a project and
                actively evolve the codebase. Contributors improve the project
                through submission of patches and suggestions to be reviewed
                by the committers. The number of committers and contributors
                to the project is unbounded.
              </p>

              <div className={s.Slider}>
                <BrowserOnly>
                  {() => (
                    <Slider centerMode={window.innerWidth > 800} slidesToShow={2}>
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
                <p className={s.SmallParagraph}>
                  Some write code or documentation, while others are valuable as
                  testers, submitting patches, and suggestions.<br />
                  Get involved today!<br />
                  All contributions to the project are greatly appreciated.
                </p>
                <p className={s.SmallParagraphTop}>
                  Read the <a href="https://www.apache.org/foundation/policies/conduct" className="secondary-cta" target="_blank" >Apache Code of Conduct</a> and <a href="https://www.apache.org/foundation/policies/conduct#reporting-guidelines" className="secondary-cta" target="_blank" >Reporting Guidelines</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className={s.CommunityDiscussions}>
          <div className={s.CommunityDiscussionsBlur} />
          <div className={s.CommunityContent}>
            <Section title="Discussions" anchor="section-discussions">
              <DiscussionPlatforms />
            </Section>
          </div>
        </section>

        <div className={s.CommunityContribute}>
          <div className={s.CommunityContent}>
            <Section title="How to Contribute" anchor="section-contribute">
              <HowToContribute />
            </Section>
          </div>
        </div>

        
        <div className={s.CommunityProjectGovernance}>
          <div className={s.CommunityContent}>
            <Section title="Project Governance" anchor="section-governance">
              <ProjectGovernance />
            </Section>
          </div>
        </div>

        <div className={s.CommunityMembers}>
          <div className={s.CommunityContent}>
            <Section anchor="section-community" title="Meet the Community">
              <p>
                Pulsar community consists of PMC members, committers and contributors.
              </p>
              <p className={s.CommunityMembersSmall}>
                For the complete and up-to-date list, see <a href="https://projects.apache.org/committee.html?pulsar" target="_blank" >Apache Pulsar Committee</a>.
              </p>
              <br />
              <h4>{team.pmc.length} PMC members</h4>
              <div>
                <div className={(isShowMorePMC ? s.CommunityMembersDesktopOpen : s.CommunityMembersDesktop)}>
                  {(team.pmc || []).map((member,i) => (
                    <a href={'https://github.com/'+member.apacheId} target="_blank" key={i} className={s.CommunityMembersMember}>
                      <div>
                        <div className={s.CommunityMembersMemberPic}>
                          <img src={'https://github.com/'+member.apacheId+'.png'} alt={member.apacheId} />
                        </div>
                        <div className={s.CommunityMembersMemberName}>
                          <strong>{member.name}</strong><br />
                          {member.apacheId}
                        </div>
                      </div>
                    </a>
                  ))}
                  <div className={s.CommunityMembersShowMore}>
                    {showMorePMCButton}
                    <Button title="Go to Github" variant="cleanInvert" href="https://github.com/apache/pulsar" target="_blank" icon={useBaseUrl("/img/gotoi.svg")}/>
                  </div>
                </div>
                <div className={s.CommunityMembersMobile}>
                  <div className={s.Slider}>
                    <BrowserOnly>
                      {() => (
                        <Slider centerMode={window.innerWidth > 800} slidesToShow={1} invertMode={true}>
                          {teamPMCSets.map((set, i) => (
                            <div key={i} className={s.SlideTeam}>
                              {set.map((member) => (
                                <a href={'https://github.com/'+member.apacheId} target="_blank" key={i} className={s.CommunityMembersMember}>
                                  <div>
                                    <div className={s.CommunityMembersMemberPic}>
                                      <img src={'https://github.com/'+member.apacheId+'.png'} alt={member.apacheId} />
                                    </div>
                                    <div className={s.CommunityMembersMemberName}>
                                      <strong>{member.name}</strong><br />
                                      {member.apacheId}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          ))}
                        </Slider>
                      )}
                    </BrowserOnly>
                  </div>
                </div>
              </div>
              <h4>{team.committers.length} Committers</h4>
              <div>
                <div className={(isShowMoreCmtrs ? s.CommunityMembersDesktopOpen : s.CommunityMembersDesktop)}>
                  {(team.committers || []).map((member,i) => (
                    <a href={'https://github.com/'+member.apacheId} target="_blank" key={i} className={s.CommunityMembersMember}>
                      <div>
                        <div className={s.CommunityMembersMemberPic}>
                          <img src={'https://github.com/'+member.apacheId+'.png'} alt={member.apacheId} />
                        </div>
                        <div className={s.CommunityMembersMemberName}>
                          <strong>{member.name}</strong><br />
                          {member.apacheId}
                        </div>
                      </div>
                    </a>
                  ))}
                  <div className={s.CommunityMembersShowMore}>
                    {showMoreCmtrsButton}
                    <Button title="Go to Github" variant="cleanInvert" href="https://github.com/apache/pulsar" target="_blank" icon={useBaseUrl("/img/gotoi.svg")}/>
                  </div>
                </div>
                <div className={s.CommunityMembersMobile}>
                  <div className={s.Slider}>
                    <BrowserOnly>
                      {() => (
                        <Slider centerMode={window.innerWidth > 800} slidesToShow={1} invertMode={true}>
                          {teamCtrsSets.map((set, i) => (
                            <div key={i} className={s.SlideTeam}>
                              {set.map((member) => (
                                <a href={'https://github.com/'+member.apacheId} target="_blank" key={i} className={s.CommunityMembersMember}>
                                  <div>
                                    <div className={s.CommunityMembersMemberPic}>
                                      <img src={'https://github.com/'+member.apacheId+'.png'} alt={member.apacheId} />
                                    </div>
                                    <div className={s.CommunityMembersMemberName}>
                                      <strong>{member.name}</strong><br />
                                      {member.apacheId}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          ))}
                        </Slider>
                      )}
                    </BrowserOnly>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </div>

        <div className={s.CommunityNumbers}>
          <div className={s.CommunityNumbersBlur} />
          <div className={s.CommunityContent}>
            <div>
              <h2>Pulsar trusted community</h2>
              <p>Join us and start contributing</p>
            </div>
          </div>
          <div className={s.CommunityContent}>
            <div className={s.CommunityNumbersContainer}>
            {communityNumbers.map((number, i) => (
              <div>
                <div className={s.CommunityNumbersBig}>{number.number}{(number.icon) ? <img src={useBaseUrl(number.icon)} /> : null}</div>
                <strong>{number.title}</strong>
                {number.linkTitle ? <div className="margin-top--lg"><Button title={number.linkTitle} href={number.link} target='_blank' variant='transparentBlack' /></div> : ''}
              </div>
            ))}
            </div>
          </div>
        </div>

        <div className={s.PromoCallout}>
          <div className={s.CommunityContent}>
            <div className={s.PromoCalloutContent}>
              <strong>Blog </strong>
              Get up-to-date Pulsar insights.
            </div>
            <div>
              <Button title="Explore" variant="transparentBlack" href={`${useBaseUrl("blog")}`} />
            </div>
          </div>
        </div>
    </Layout>
  );
};
