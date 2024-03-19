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

  function shuffleArray(array) {
    let currentIndex = array.length;
    // While there remain elements to shuffle
    while (0 !== currentIndex) {
      // Pick a remaining element
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      const temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }

  // Shuffle the team members so that the order is different each time the page is loaded
  shuffleArray(team.pmc);
  shuffleArray(team.committers);

  let TeamPMCSets = new Array(Math.ceil(team.pmc.length/5));
  let teamCtrsSets = new Array(Math.ceil(team.committers.length/5));

  let CountTheSet = 0;
  let CountTheSets = 0;
  team.pmc.forEach(element => {
    CountTheSet++;
    if((CountTheSet-1)%5 == 0){ CountTheSets++; }
    if(!Array.isArray(TeamPMCSets[CountTheSets])) TeamPMCSets[CountTheSets] = new Array();
    TeamPMCSets[CountTheSets].push(element);
  });

  CountTheSet = CountTheSets = 0;

  team.committers.forEach(element => {
    CountTheSet++;
    if((CountTheSet-1)%5 == 0){ CountTheSets++; }
    if(!Array.isArray(teamCtrsSets[CountTheSets])) teamCtrsSets[CountTheSets] = new Array();
    teamCtrsSets[CountTheSets].push(element);
  });

  function MemberCard({ member, index }) {
    const githubUsername = member.githubUsername && member.githubUsername.length > 0 ? member.githubUsername[0] : member.apacheId;
    const href = member.githubUsername && member.githubUsername.length > 0 ? ('https://github.com/' + githubUsername) : "#";
    const target = member.githubUsername && member.githubUsername.length > 0 ? "_blank" : "_self";
  
    return (
      <a href={href} target={target} key={'m'+index} className={s.CommunityMembersMember}>
        <div>
          <div className={s.CommunityMembersMemberPic}>
            { member.githubUsername && member.githubUsername.length > 0 && (
            <img src={'https://github.com/' + githubUsername + '.png'} alt={githubUsername} />
            )}
          </div>
          <div className={s.CommunityMembersMemberName}>
            <strong>{member.name}</strong><br />
            {githubUsername}
          </div>
        </div>
      </a>
    );
  }

  return (
    <Layout title={"Community"} description={"Learn about the basics of using Apache Pulsar"} wrapperClassName="LandingPage">
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

            <div className={s.AfterCommunitySlider}>
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
          <p>
            Please notice that security-related issues or concerns should not be reported in public channels.<br/>
            Please follow the instructions in the <a href={`${useBaseUrl("security")}#security-policy`}>Security Policy</a> to contact the <a href="https://www.apache.org/security/">ASF Security Team</a>.<br/>
            <br/>
          </p>
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
              <p className={s.CommunityMembersBig}>
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
                    <MemberCard member={member} index={i} />
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
                          {TeamPMCSets.map((set, i) => (
                            <div key={i} className={s.SlideTeam}>
                              {set.map((member, i) => (
                                  <MemberCard member={member} index={i} />
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
                    <MemberCard member={member} index={i} />
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
                              {set.map((member, i) => (
                                <MemberCard member={member} index={i} />
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
              <div key={'num'+i}>
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
              <div>
                <strong>Blog </strong>
                Get up-to-date Pulsar insights.
              </div>
            </div>
            <div>
              <Button title="Explore" variant="transparentBlack" href={`${useBaseUrl("blog")}`} />
            </div>
          </div>
        </div>
    </Layout>
  );
};
