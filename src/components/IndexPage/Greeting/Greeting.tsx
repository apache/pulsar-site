import React from "react";
import s from "./Greeting.module.css";
import SineWavesAnimation from "./SineWaves/SineWavesAnimation";
import ActionButton from "../../ui/ActionButton/ActionButton";
import ActionButtonGroup from "../../ui/ActionButton/ActionButtonGroup";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BlogPosts from "./BlogPosts/BlogPosts";

const Greeting: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const [isAnimationReady, setIsAnimationReady] = React.useState(false);
  const isAnnouncementBarVisible = siteConfig.themeConfig?.announcementBar;

  return (
    <section className={`${s.Greeting} ${isAnnouncementBarVisible ? s.GreetingWithAnnouncementBar : ''}`}>
      <div
        className={s.Content}
        style={{
          marginTop: isAnnouncementBarVisible
            ? "calc(var(--docusaurus-announcement-bar-height) * -1)"
            : "0",
        }}
      >
        <div className={s.Text}>
          <h1 className={s.Title}>
            Cloud-Native, Distributed Messaging and Streaming
          </h1>
          <p className={s.Description}>
            Apache® Pulsar™ is an open-source, distributed messaging and
            streaming platform built for the cloud.
          </p>

          <div className={`${s.Animation} ${isAnimationReady ? s.AnimationReady : ''}`}>
            <SineWavesAnimation onReady={() => setIsAnimationReady(true)}/>
          </div>
        </div>

        <div className={s.ActionButtons}>
          <ActionButtonGroup>
            <ActionButton
              title="Learn more"
              type="primary"
              link={{
                href: `${siteConfig.baseUrl}docs/concepts-overview`,
              }}
            />
            <ActionButton
              title="Quickstart"
              link={{
                href: `${siteConfig.baseUrl}docs`,
              }}
            />
          </ActionButtonGroup>

          <div className={s.LatestPostInBlog}>
            <BlogPosts count={3} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Greeting;
