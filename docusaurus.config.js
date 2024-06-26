// @ts-check

const _ = require("lodash");
const linkifyRegex = require("./plugins/remark-linkify-regex");
const { renderAnnouncementBar } = require("./src/components/ui/renderAnnouncementBar");
const versions = require("./versions.json");
const latestVersion = versions[0];
const versionsMap = {
  ..._.keyBy(
    versions.map((item) => {
      return {
        label: item,
        path: item,
      };
    }),
    "label"
  ),
  current: {
    label: "Next",
    path: "next",
  },
};

let buildVersions = ["current"];
try {
  buildVersions = require("./.build-versions.json");
} catch (error) {
  //do nothing
}

const oldUrl = "https://pulsar.apache.org";
const url = "https://pulsar.apache.org";
const javadocUrl = url + "/api";
const restApiUrl = url + "/admin-rest-api";
const functionsApiUrl = url + "/functions-rest-api";
const sourceApiUrl = url + "/source-rest-api";
const sinkApiUrl = url + "/sink-rest-api";
const packagesApiUrl = url + "/packages-rest-api";
const transactionsApiUrl = url + "/transactions-rest-api";
const lookupApiUrl = url + "/lookup-rest-api";
const githubUrl = "https://github.com/apache/pulsar";
const githubSiteUrl = "https://github.com/apache/pulsar-site";
const baseUrl = "/";
const math = require('remark-math');
const katex = require('rehype-katex');

const injectLinkParse = ([, prefix, , name, path]) => {
  if (prefix == "javadoc") {
    return {
      link: javadocUrl + path,
      text: name,
    };
  } else if (prefix == "github") {
    return {
      link: githubUrl + "/tree/master/" + path,
      text: name,
    };
  } else if (prefix == "rest") {
    return {
      link: restApiUrl + "#" + path,
      text: name,
    };
  } else if (prefix == "functions") {
    return {
      link: functionsApiUrl + "#" + path,
      text: name,
    };
  } else if (prefix == "source") {
    return {
      link: sourceApiUrl + "#" + path,
      text: name,
    };
  } else if (prefix == "sink") {
    return {
      link: sinkApiUrl + "#" + path,
      text: name,
    };
  } else if (prefix == "packages") {
    return {
      link: packagesApiUrl + "#" + path,
      text: name,
    };
  }

  return {
    link: path,
    text: name,
  };
};

const injectLinkParseForEndpoint = ([, info]) => {
  let [method, path, suffix] = info.split("|");

  if (!suffix) {
    suffix = "";
  }

  let restPath = path.split("/");
  const restApiVersion = restPath[2];
  const restApiType = restPath[3];
  const restBaseUrl = {
    functions: functionsApiUrl,
    source: sourceApiUrl,
    sink: sinkApiUrl,
    packages: packagesApiUrl,
    transactions: transactionsApiUrl,
    lookup: lookupApiUrl
  }[restApiType] || restApiUrl;

  let restUrl;
  if (suffix.indexOf("?version=") >= 0) {
    const suffixAndVersion = suffix.split("?version=")
    restUrl = "version=" + suffixAndVersion[1] + "&apiversion=" + restApiVersion + "#" + suffixAndVersion[0];
    if (suffixAndVersion[0].startsWith("operation/")) {
      path += suffixAndVersion[0].slice("operation".length)
    }
  } else {
    restUrl = "version=master&apiversion=" + restApiVersion + "#" + suffix;
    if (suffix.startsWith("operation/")) {
      path += suffix.slice("operation".length)
    }
  }

  return {
    text: method + " " + path,
    link: restBaseUrl + "?" + restUrl,
  };
};

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "Apache Pulsar",
  tagline:
    "Apache Pulsar is a distributed, open source pub-sub messaging and streaming platform for real-time workloads, managing hundreds of billions of events per day.",
  url: "https://pulsar.apache.org",
  baseUrl: baseUrl,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "apache",
  projectName: "pulsar",
  customFields: {
    githubUrl,
    oldUrl,
  },
  trailingSlash: true,
  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  ({
    image: 'img/pulsar-social-media-card.png',
    announcementBar: {
      id: "summit",
      content: renderAnnouncementBar(
        "👋 Start your Pulsar journey by becoming a member of our community",
        "/community/#section-discussions"
      ),
      backgroundColor: "#282826",
      textColor: "#fff",
      isCloseable: false,
    },
    colorMode: {
      disableSwitch: true,
    },
    zoom: {
      selector: '.markdown img',
      background: {
        light: '#fff',
        dark: '#111'
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      }
    },
    navbar: {
      title: "",
      logo: {
        alt: "Apache Pulsar logo",
        src: "img/logo-black.svg",
        width: 127,
        height: 25
      },
      items: [
        {
          type: "dropdown",
          label: "Get Started",
          position: "left",
          items: [
               {
              to: `/docs/${latestVersion}/concepts-overview/`,
              activeBaseRegex: `docs/(${versions.join('|')})/concepts-overview/$`,
              label: "Concepts",
            },
            {
              to: `/docs/${latestVersion}/`,
              activeBaseRegex: `docs/(${versions.join('|')})/$`,
              label: "Quickstart",
            },
            {
              to: "/ecosystem/",
              label: "Ecosystem",
            }
          ],
        },
        {
          type: "doc",
          docId: "about",
          position: "left",
          label: "Docs",
        },
        {
          to: "/features/",
          position: "left",
          label: "Features",
        },
        {
          to: "/use-cases/",
          position: "left",
          label: "Use Cases",
        },
        {
          type: "dropdown",
          label: "Community",
          position: "left",
          className: "community-dropdown",
          items: [
            {
              to: "/community",
              activeBaseRegex: "^$",
              label: "Welcome",
              className: "scroll-link scroll-welcome",
              id: "scroll-welcome",
            },
            {
              to: "/community#section-discussions",
              activeBaseRegex: "^$",
              label: "Discussions",
              className: "scroll-link scroll-discussions",
              id: "scroll-discussions",
            },
            {
              to: "/community#section-governance",
              activeBaseRegex: "^$",
              label: "Governance",
              className: "scroll-link",
              id: "scroll-governance",
            },
            {
              to: "/community#section-community",
              activeBaseRegex: "^$",
              label: "Meet the Community",
              className: "scroll-link",
              id: "scroll-community",
            },
            {
              to: "/community#section-contribute",
              activeBaseRegex: "^$",
              label: "Contribute",
              className: "scroll-link",
              id: "scroll-contribute",
            },
            {
              to: "/contribute/",
              label: "Contribution Guide",
            },
            {
              to: "https://github.com/apache/pulsar/wiki",
              label: "Wiki",
            },
            {
              to: "https://github.com/apache/pulsar/issues",
              label: "Issue Tracking",
            },
          ],
        },
        {
          type: "dropdown",
          label: "Learn",
          position: "left",
          items: [
            {
              to: "/blog",
              label: "Blog",
            },
            {
              to: "/books",
              label: "Books",
            },
            {
              to: "/case-studies",
              label: "Case Studies",
            },
            {
              to: "/articles",
              label: "Articles",
            },
            {
              to: "/presentations",
              label: "Presentations",
            },
            {
              to: "/events",
              label: "Events",
            },
          ],
        },
        {
          to: "/download",
          label: "Download",
          position: "right",
          className: "navbar_download_button",
        },
      ],
    },
    footer: {
      logo: { alt: "Pulsar Logo", src: "img/pulsar-white.svg", href: "/" },
      links: [
        {
          items: [
            { label: "Foundation", href: "https://www.apache.org/" },
            {
              label: "Events",
              href: "https://www.apache.org/events/current-event.html",
            },
          ],
        },
        {
          items: [
            { label: "License", href: "https://www.apache.org/licenses/" },
            {
              label: "Thanks",
              href: "https://www.apache.org/foundation/thanks",
            },
            {
              label: "Sponsorship",
              href: "https://www.apache.org/foundation/sponsorship",
            },
          ],
        },
        {
          items: [
            { label: "Security", to: "/security" },
            {
              label: "Privacy",
              href: "https://www.apache.org/foundation/policies/privacy.html",
            },
            {
              label: "Contact",
              to: "/contact",
            },
          ],
        },
        {
          items: [
            {
              html: `
                <div class="social-icons">
                  <a
                    target="_blank"
                    href="https://communityinviter.com/apps/apache-pulsar/apache-pulsar"
                    aria-label="Join the Apache Pulsar Slack workspace"
                  >
                    <img alt="Slack logo" src="/img/slack-white.svg" width="26">
                  </a>
                  <a
                    target="_blank"
                    href="https://github.com/apache/pulsar/"
                    aria-label="View the Apache Pulsar project on GitHub"
                  >
                    <img alt="GitHub logo" src="/img/github-white.svg" width="26">
                  </a>
                </div>
              `,
              },
            ],
          },
        ],
        copyright: `
        <div>
          <img class="footer-apache-logo" src="/img/feather-logo-white.svg" alt="" width="20">
          The Apache Software Foundation
        </div>
        <p>Apache Pulsar is available under the Apache License, version 2.0. Apache Pulsar is an open-source, distributed messaging and streaming platform built for the cloud.</p>
        <p>Copyright © ${new Date().getFullYear()} The Apache Software Foundation. All Rights Reserved. Apache, Pulsar, Apache Pulsar, and the Apache feather logo are trademarks or registered trademarks of The Apache Software Foundation.</p>
      `,
    },
    prism: {
      theme: require("prism-react-renderer/themes/dracula"),
      additionalLanguages: [
        "csharp",
        "groovy",
        "http",
        "ini",
        "java",
        "powershell",
        "properties",
        "protobuf",
        "yaml",
      ],
    },
    algolia: {
      appId: "WK2YL0SALL",
      apiKey: "42d24d221fbd8eb59804a078208aaec0",
      indexName: "apache_pulsar",
    },
  }),

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: `${githubSiteUrl}/edit/main`,
          remarkPlugins: [
            linkifyRegex(
              /{\@inject\:\s?(((?!endpoint)[^}])+):([^}]+):([^}]+)}/,
              injectLinkParse
            ),
            linkifyRegex(
              /{\@inject\:\s?endpoint\|([^}]+)}/,
              injectLinkParseForEndpoint
            ),
            math,
          ],
          rehypePlugins: [katex],
          versions: versionsMap,
          onlyIncludeVersions: buildVersions || ["current"],
        },
        blog: {
          blogSidebarCount: 0,
          showReadingTime: true,
          editUrl: `${githubSiteUrl}/edit/main/`,
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/docs.css"),
            require.resolve("./src/css/base-table.css"),
            require.resolve("./src/css/typography.css"),
            require.resolve("./src/css/image-zoom.css"),
            require.resolve("./src/css/announcement-bar.css"),
            require.resolve("./src/css/navbar.css"),
            require.resolve("./src/css/footer.css"),
            require.resolve("./src/css/variables.css"),
            require.resolve("./src/css/blog.css"),
          ],
        },
        //googleAnalytics: {
        //  trackingID: "UA-102219959-1",
        //},
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/contribute/setup-mergetool',
            to: '/contribute/setup-git',
          },
        ],
      },
    ],    
    'docusaurus-plugin-image-zoom',
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "contribute",
        path: "contribute",
        routeBasePath: "contribute",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        sidebarPath: require.resolve("./sidebarsDevelopment.js"),
        editUrl: `${githubSiteUrl}/edit/main`,
      }),
    ],
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "release-notes",
        path: "release-notes",
        routeBasePath: "release-notes",
        editUrl: `${githubSiteUrl}/edit/main`,
        sidebarPath: require.resolve("./sidebarsReleaseNotes.js"),
      }),
    ],
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "security",
        path: "security",
        routeBasePath: "security",
        sidebarPath: false,
      }),
    ],
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: "client-feature-matrix",
        path: "client-feature-matrix",
        routeBasePath: "client-feature-matrix",
        sidebarPath: false,
      }),
    ]
  ],
  scripts: [
    { src: "/js/sine-waves.min.js", async: true },
    "/js/matomo-agent.js",
  ],
  clientModules: [require.resolve("./matomoClientModule.ts")],
  stylesheets: [
    {
      href: "/css/katex-0.13.24.min.css",
      type: "text/css",
      media: "print", // load CSS asynchronously to increase performance of page first load
      onload: "this.media='all'", // load CSS asynchronously to increase performance of page first load
    },
  ],
};
