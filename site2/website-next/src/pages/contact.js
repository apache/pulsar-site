import * as React from "react";
import Layout from "@theme/Layout";
import MailTable from "../components/MailTable";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate, { translate } from "@docusaurus/Translate";

export default function page(props) {
  const mailingLists = [
    {
      email: "users@pulsar.apache.org",
      desc: "User-related discussions",
      subscribe: "mailto:users-subscribe@pulsar.apache.org",
      unsubscribe: "mailto:users-unsubscribe@pulsar.apache.org",
      archives: "http://mail-archives.apache.org/mod_mbox/pulsar-users/",
    },
    {
      email: "dev@pulsar.apache.org",
      desc: "Development-related discussions",
      subscribe: "mailto:dev-subscribe@pulsar.apache.org",
      unsubscribe: "mailto:dev-unsubscribe@pulsar.apache.org",
      archives: "http://mail-archives.apache.org/mod_mbox/pulsar-dev/",
    },
    {
      email: "commits@pulsar.apache.org",
      desc: "All commits to the Pulsar repository",
      subscribe: "mailto:commits-subscribe@pulsar.apache.org",
      unsubscribe: "mailto:commits-unsubscribe@pulsar.apache.org",
      archives: "http://mail-archives.apache.org/mod_mbox/pulsar-commits/",
    },
  ];
  return (
    <Layout>
      <div className="tailwind">
        <div className="my-12 container">
          <header className="postHeader">
            <h1>
              <Translate>Contact</Translate>
            </h1>
            <hr />
          </header>
          <p>
            <Translate>
              There are many ways to get help from the Apache Pulsar community.
              The mailing lists are the primary place where all Pulsar
              committers are present. Bugs and feature requests can either be
              discussed on the dev mailing list or by opening an issue on
            </Translate>{" "}
            <a href="https://github.com/apache/pulsar/" target="_blank">
              Github
            </a>
            .
          </p>

          <h2>
            <Translate>Mailing Lists</Translate>
          </h2>
          <MailTable data={mailingLists}></MailTable>
          <h2>
            <translate>
              Reporting a Vulnerability
            </translate>
          </h2>
          <p>
            To report a vulnerability for Pulsar, contact the <a href="https://www.apache.org/security/projects.html" target="_blank">Apache Security Team</a>.
          </p>
          <p>
            <translate>The process for reporting a vulnerability is outlined </translate>
            <a href="https://www.apache.org/security/" target="_blank">here</a>
            <translate>. When reporting a vulnerability to </translate>
            <a href="mailto:security@apache.org" target="_blank">security@apache.org</a>
            <translate>, you can copy your email to </translate>
            <a href="mailto:private@pulsar.apache.org" target="_blank">private@pulsar.apache.org</a>
            <translate> to send your report to the Apache Pulsar Project Management Committee. This is a private mailing list.</translate>
          </p>
          <h2>
            <Translate>Stack Overflow</Translate>
          </h2>
          <p>
            <Translate>
              For technical questions, we ask that you post them to
            </Translate>
            <a
              href="https://stackoverflow.com/tags/apache-pulsar"
              target="_blank"
            >
              {" "}
              Stack Overflow{" "}
            </a>{" "}
            <Translate>using the tag “apache-pulsar”.</Translate>
          </p>

          <h2>
            <Translate>Slack</Translate>
          </h2>
          <p>
            <Translate>
              There is a Pulsar slack channel that is used for informal
              discussions for devs and users.
            </Translate>
          </p>

          <p>
            <Translate>The Slack instance is at </Translate>{" "}
            <a href="https://apache-pulsar.slack.com/" target="_blank">
              https://apache-pulsar.slack.com/
            </a>
          </p>

          <p>
            <Translate>You can self-register at </Translate>{" "}
            <a href="https://apache-pulsar.herokuapp.com/" target="_blank">
              https://apache-pulsar.herokuapp.com/
            </a>
          </p>

          <h2>
            <Translate>WeChat</Translate>
          </h2>
          <p>
            <Translate>
              There are several WeChat groups that are used for informal
              discussions for devs and users.
            </Translate>
          </p>

          <p>
            <Translate>
              To join these WeChat tech groups, you can add Bot with the WeChat
              ID: StreamNative_BJ
            </Translate>
          </p>
        </div>
      </div>
    </Layout>
  );
}
