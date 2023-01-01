import React, {useEffect} from "react";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import TeamTable from "@site/src/components/TeamTable";
import PromoCallout from "@site/src/components/PromoCallout";
import PillButton from "@site/src/components/PillButton";
import GroupsIcon from "@mui/icons-material/Groups";
import WavySeparatorFive from "@site/static/img/separator-5.svg";
import WavySeparatorSix from "@site/static/img/separator-6.svg";
import {pageUrl} from "@site/src/utils";
import team from "@site/data/team"

export default function Community(): JSX.Element {
    // Images in this array are used in the carousel
    const slidesArr = [
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
    ];

    useEffect(() => {
        // used to scroll to anchor on the page
        if (location.hash) {
            let hash = location.hash;
            let id = hash.split("-")[1];
            let target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth", // smooth scroll
                    block: "start", // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.
                });
            }
        }

        // highlights the link in the navigation when that section is in the viewport
        const sections = document.querySelectorAll(".scrollable");
        const links = document.querySelectorAll(".scroll-link");
        var observer = new IntersectionObserver(
            function (entries) {
                if (entries[0].isIntersecting === true) {
                    let id = entries[0].target.id;
                    let target = "scroll-" + id;
                    links.forEach(l => {
                        l.classList.remove("active-section");
                    });
                    let finalTarget = document.getElementById(target);
                    if (finalTarget) {
                        finalTarget.classList.add("active-section");
                    }
                }
            },
            { threshold: [0.5] }
        );
        sections.forEach(s => {
            observer.observe(document.getElementById(s.id));
        });

        // This code runs the image carousel
        const slides = document.querySelectorAll(".slide-image");
        const allDots = document.getElementsByClassName("dot");
        const firstSlide = document.getElementById("slide-0");
        const firstDot = document.getElementById("dot-0");
        firstSlide.classList.add("active-slide");
        firstDot.classList.add("active-dot");
        const dots = document.querySelectorAll(".dot");
        const slideCount = slides.length;
        const intervalTime = 4000;
        let interval;
        let counter = 0;
        function cycleSlides() {
            const active = document.querySelector(".active-slide");
            const activeDot = document.querySelector(".active-dot");
            active.classList.remove("active-slide");
            activeDot.classList.remove("active-dot");
            if (counter === slideCount - 1) {
                slides[0].classList.add("active-slide");
                dots[0].classList.add("active-dot");
                counter = 0;
            } else {
                const next = counter++;
                slides[next].nextElementSibling.classList.add("active-slide");
                dots[next].nextElementSibling.classList.add("active-dot");
                counter += 1;
            }
        }
        const slideInterval = function () {
            interval = setInterval(function () {
                cycleSlides();
            }, intervalTime);
        };

        slideInterval();

        // if you click on  on a pagination dot
        const showSlide = function () {
            let id = this.getAttribute("id");
            let slideId = id.replace("dot", "slide");
            let target = document.getElementById(slideId);
            const active = document.querySelector(".active-slide");
            const activeDot = document.querySelector(".active-dot");
            active.classList.remove("active-slide");
            activeDot.classList.remove("active-dot");
            this.classList.add("active-dot");
            target.classList.add("active-slide");
            // stops the interval when someone clicks on a dot.
            clearInterval(interval);
        };
        for (let i = 0; i < allDots.length; i++) {
            allDots[i].addEventListener("click", showSlide, false);
        }

        // cleanup required or interval will continue to run, even on other pages
        return function cleanup() {
            clearInterval(interval);
        };
    });

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
                        alt={'Community Hero'}/>
                </div>
                <section
                    id="welcome"
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

                <section id="team" className="main-content relative">
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
                            <div className="image-bg-container p-8 md:w-1/2">
                                <div id="slider" className="relative">
                                    {/*
                      NOTE: add images to the slidesArr array above to include the in the image carousel.
                    */}
                                    {slidesArr.map((s, i) => {
                                        return (
                                            <img
                                                id={`slide-${i}`}
                                                key={i}
                                                className="slide-image"
                                                src={s.img}
                                                alt={s.alt}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="pagination">
                                    {slidesArr.map((d, i) => {
                                        return <div id={`dot-${i}`} key={i} className="dot"></div>;
                                    })}
                                </div>
                            </div>
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
                <WavySeparatorFive></WavySeparatorFive>
                <section id="discussions" className="scrollable">
                    <div className="inner pt-12">
                        <h2 className="text--center">Discussions</h2>
                        <div className="cf py-12 flex flex-col md:flex-row">
                            <div className="md:w-1/3 md:flex md:flex-center md:p-12">
                                <img src={useBaseUrl("/img/mailing-list.svg")} />
                            </div>
                            <div className="md:w-2/3">
                                <h3>Mailing Lists</h3>
                                <p>
                                    The primary place for discussions is on the Pulsar mailing
                                    lists.
                                </p>
                                <div className="flex flex-col md:flex-row">
                                    <div className="discussion-box md:w-1/2 md:pr-2">
                                        <h4>User List</h4>
                                        <p>General mailing list for user-related discussions.</p>

                                        <PillButton
                                            variant=""
                                            target=""
                                            href="mailto:users-subscribe@pulsar.apache.org"
                                        >
                                            Subscribe
                                        </PillButton>
                                        <PillButton
                                            variant="grey"
                                            target="_blank"
                                            href="mailto:users-unsubscribe@pulsar.apache.org"
                                        >
                                            Unsubscribe
                                        </PillButton>
                                        <p>
                                            <strong>
                                                Access the{" "}
                                                <a
                                                    className="secondary-cta"
                                                    href="https://lists.apache.org/list.html?users@pulsar.apache.org"
                                                    target="_blank"
                                                >
                                                    User List Archives
                                                </a>
                                                .
                                            </strong>
                                        </p>
                                    </div>
                                    <div className="discussion-box md:w-1/2 md:pr-2">
                                        <h4>Developer List</h4>
                                        <p>
                                            Questions and discussions related to Pulsar development.
                                        </p>

                                        <PillButton
                                            variant=""
                                            target=""
                                            href="mailto:dev-subscribe@pulsar.apache.org"
                                        >
                                            Subscribe
                                        </PillButton>
                                        <PillButton
                                            variant="grey"
                                            target="_blank"
                                            href="mailto:dev-unsubscribe@pulsar.apache.org"
                                        >
                                            Unsubscribe
                                        </PillButton>

                                        <p>
                                            <strong>
                                                Access the{" "}
                                                <a
                                                    className="secondary-cta"
                                                    href="https://lists.apache.org/list.html?dev@pulsar.apache.org"
                                                >
                                                    Developer List Archives
                                                </a>
                                                .
                                            </strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cf flex flex-col md:flex-row py-12">
                            <div className="md:w-1/3">
                                <img src={useBaseUrl("/img/Slack_Mark.svg")} />
                            </div>
                            <div className="md:w-2/3">
                                <h3>Slack</h3>
                                <div className="">
                                    <p>
                                        The Pulsar community maintains its own Slack instance
                                        (separate from ASF Slack) used for informal discussions for
                                        developers and users.{" "}
                                    </p>
                                    <p>
                                        Slack channels are great for quick questions or discussions
                                        on specialized topics. Remember that we strongly encourage
                                        communication via the mailing lists, and we prefer to
                                        discuss more complex subjects by email. Developers should be
                                        careful to move or duplicate all official or useful
                                        discussions to the issue tracking system and/or the dev
                                        mailing list.
                                    </p>
                                    <p>Not signed up? Use our Slack App to self-register </p>
                                    <PillButton
                                        variant=""
                                        target="_blank"
                                        href="https://apache-pulsar.slack.com/"
                                    >
                                        PULSAR SLACK
                                    </PillButton>
                                    <PillButton
                                        variant="grey"
                                        target="_blank"
                                        href="https://communityinviter.com/apps/apache-pulsar/apache-pulsar"
                                    >
                                        PULSAR SLACK SIGN-UP
                                    </PillButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inner pt-12">
                        <div className="text--center md:text-left md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-4">
                            <div className="discussion-box">
                                <div className="icon-wrap text--center md:text-left md:flex md:items-center">
                                    <img
                                        className="mx-auto md:m-0"
                                        src={useBaseUrl("/img/logo-stackoverflow.svg")}
                                    />
                                </div>
                                <h3>Stack Overflow</h3>
                                <p>
                                    For technical questions, we ask that you post them to{" "}
                                    <a
                                        href="https://stackoverflow.com/tags/apache-pulsar"
                                        target="_blank"
                                    >
                                        Stack Overflow
                                    </a>{" "}
                                    using the tag “apache-pulsar”.
                                </p>
                            </div>
                            <div className="discussion-box">
                                <div className="icon-wrap flex items-center">
                                    <img
                                        className="mx-auto md:m-0"
                                        src={useBaseUrl("/img/wechat-logo.svg")}
                                    />
                                </div>

                                <h3>WeChat</h3>
                                <p>
                                    Welcome to subscribe to the Apache Pulsar WeChat Official
                                    Account! The account ID is ApachePulsar.
                                </p>
                            </div>
                            <div className="discussion-box">
                                <div className="icon-wrap text-2xl flex items-center">
                                    <GroupsIcon className="icon-wrap-icon mx-auto md:m-0" />
                                </div>
                                <h3>Community Meetings</h3>
                                <p>
                                    The community meeting occurs biweekly on Tuesdays and
                                    Thursdays to discuss new proposals, open pull requests, and
                                    host open discussions. Details and how to join{" "}
                                    <a
                                        href="https://github.com/apache/pulsar/wiki/Community-Meetings"
                                        target="_blank"
                                    >
                                        here.
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <WavySeparatorSix></WavySeparatorSix>
                <section id="governance" className="py-12 scrollable">
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
                            variant=""
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
                            variant=""
                            target="_blank"
                            href="https://www.apache.org/theapacheway/index.html"
                        >
                            THE APACHE WAY
                        </PillButton>
                    </div>
                </section>
                <section id="contribute" className="py-12 scrollable">
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
                                        variant=""
                                        target=""
                                        href={useBaseUrl("contribute")}
                                    >
                                        Contribution Guide
                                    </PillButton>
                                    <PillButton
                                        variant="grey"
                                        target=""
                                        href={useBaseUrl("contribute/develop-coding-conventions")}
                                    >
                                        Coding Conventions
                                    </PillButton>
                                </div>
                            </div>
                            <div className="flex flex-col  sm:flex-row items-center  py-12">
                                <div className="sm:w-1/3 section-icon px-12">
                                    <img src={useBaseUrl("/img/report-bugs.svg")} alt={'Report bugs'} />
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
                                    <p>The process for reporting a vulnerability is outlined
                                        <a className="secondary-cta" href="https://www.apache.org/security/" target="_blank">here</a>
                                        . When reporting a vulnerability to
                                        <a className="secondary-cta" href="mailto:security@apache.org" target="_blank">security@apache.org</a>
                                        , you can copy your email to
                                        <a className="secondary-cta" href="mailto:private@pulsar.apache.org" target="_blank">private@pulsar.apache.org</a>
                                        to send your report to the Apache Pulsar Project Management Committee. This is a private mailing list.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <WavySeparatorSix></WavySeparatorSix>
                <section id="community" className="py-12 scrollable">
                    <div className="inner">
                        <h2 className="text--center">Meet the Community</h2>
                        <p>Pulsar community consists of PMC members, committers and contributors. </p>
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
                        <h3 className="text--center">PMC</h3>
                        <div className="md:grid md:grid-cols-2 md:gap-x-4">
                            <TeamTable
                                data={team.pmc.slice(0, (team.pmc.length + 1) / 2)}
                            />
                            <TeamTable
                                data={team.pmc.slice((team.pmc.length + 1) / 2)}
                            />
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
                                alt={'Contributors over time'}/>
                            <img
                                src="https://contributor-overtime-api.git-contributor.com/contributors-svg?chart=contributorMonthlyActivity&repo=apache/pulsar"
                                alt={'Active contributors monthly'}
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
}
