// @ts-check

const _ = require("lodash");
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

// Bare /docs/client-libraries-<slug> URLs (no version segment) redirect to the
// new /docs/client-libraries/<slug> location. In production these are also
// covered by .htaccess; these static entries cover dev mode and static hosts.
//
// Versioned legacy URLs like /docs/<version>/client-libraries-<slug> are NOT
// included here on purpose: plugin-client-redirects generates a stub HTML file
// at every `from` path, which would create build/docs/<version>/client-libraries-*/
// directories in every yarn build. The CI split-version-build.sh script (which
// builds each version separately and then mv's build-<v>/<v> into build/docs/)
// would then fail because build/docs/<v>/ is non-empty from those stubs. Those
// versioned URLs are handled exclusively by static/.htaccess in production.
function clientLibrariesLegacyRedirects() {
  const slugs = [
    "java", "java-setup", "java-initialize", "java-use", "java-tracing",
    "cpp", "cpp-setup", "cpp-initialize", "cpp-use",
    "go", "go-setup", "go-initialize", "go-use",
    "python", "python-setup", "python-initialize", "python-use",
    "node", "node-setup", "node-initialize", "node-use", "node-configs",
    "dotnet", "dotnet-setup", "dotnet-initialize", "dotnet-use",
    "websocket", "rest",
    "clients", "producers", "consumers", "readers", "tableviews", "schema",
    "cluster-level-failover",
  ];
  return slugs.map((slug) => ({
    from: `/docs/client-libraries-${slug}`,
    to: `/docs/client-libraries/${slug}`,
  }));
}

const {
  githubSiteUrl,
  baseUrl,
  restApiBaseUrlMapping,
} = require("./site-baseurls");

/** @type {import('@docusaurus/types').Config} */
module.exports = async function createConfigAsync() {
  const injectPreprocessor = (await import("./src/server/markdownPreprocessors/inject")).default;
  const pulsarVariablesPreprocessor = (await import("./src/server/markdownPreprocessors/pulsarVariables")).default;
  return {
    future: {
      faster: {
        swcJsLoader: true,
        swcJsMinimizer: true,
        swcHtmlMinimizer: true,
        lightningCssMinimizer: true,
        rspackBundler: true,
        mdxCrossCompilerCache: true,
      },
    },
    title: "Apache Pulsar",
    tagline:
      "Apache Pulsar is a distributed, open source pub-sub messaging and streaming platform for real-time workloads, managing hundreds of billions of events per day.",
    url: "https://pulsar.apache.org",
    baseUrl: baseUrl,
    onBrokenLinks: "warn",
    favicon: "img/favicon.ico",
    organizationName: "apache",
    projectName: "pulsar",
    trailingSlash: true,
    markdown: {
      mermaid: true,
      hooks: {
        onBrokenMarkdownLinks: "warn",
      },
      preprocessor: (args) => injectPreprocessor({
        ...args,
        fileContent: pulsarVariablesPreprocessor(args),
      }),
    },
    themes: ['@docusaurus/theme-mermaid'],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        image: 'img/pulsar-social-media-card.png',
        announcementBar: {
          id: "summit",
          content: renderAnnouncementBar(
            "✨ Apache Pulsar 4.2 is here! ✨",
            "/download/"
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
                },
                {
                  to: "/docs/client-libraries/",
                  label: "Client Libraries",
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
          theme: require("prism-react-renderer").themes.dracula,
          additionalLanguages: [
            "bash",
            "diff",
            "json",
            "go",
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
            beforeDefaultRemarkPlugins: [
              [(await import('./src/server/remarkPlugins/swagger')).default, {baseDir: __dirname, restApiBaseUrlMapping: restApiBaseUrlMapping}],
            ],
            remarkPlugins: [(await import('remark-math')).default],
            rehypePlugins: [(await import('rehype-katex')).default],
            versions: versionsMap,
            onlyIncludeVersions: buildVersions || ["current"],
          },
          blog: {
            blogSidebarCount: 0,
            showReadingTime: true,
            editUrl: `${githubSiteUrl}/edit/main/`,
            onInlineAuthors: 'ignore',
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
            {
              from: '/resources',
              to: '/articles',
            },
            {
              from: '/client-feature-matrix',
              to: '/docs/client-libraries/feature-matrix',
            },
            ...clientLibrariesLegacyRedirects(),
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
          numberPrefixParser: false,
          editUrl: `${githubSiteUrl}/edit/main`,
          sidebarPath: require.resolve("./sidebarsReleaseNotes.js"),
        }),
      ],
      [
        "content-docs",
        /** @type {import('@docusaurus/plugin-content-docs').Options} */
        ({
          id: "client-libraries",
          path: "client-libraries",
          routeBasePath: "docs/client-libraries",
          editUrl: `${githubSiteUrl}/edit/main`,
          sidebarPath: require.resolve("./sidebarsClientLibraries.js"),
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
      function customWebpackPlugin(context, options) {
        return {
          name: 'custom-webpack-plugin',
          configureWebpack(config, isServer, utils) {
            return {
              module: {
                rules: [
                  {
                    test: /\/src\/server\/.*$/,
                    use: 'null-loader'
                  }
                ]
              }
            };
          },
        };
      },
    ],
    scripts: [
      { src: "/js/sine-waves.min.js", async: true },
      "/js/matomo-agent.js",
      '/js/custom-script.js',
      {
        async: true,
        src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
        'data-website-id': '7da3a42b-98f7-4af5-85e9-771d51c21796',
        'data-modal-title': 'Apache Pulsar AI Assistant',
        'data-project-name': 'Apache Pulsar',
        'data-project-logo': 'https://pbs.twimg.com/profile_images/875130220474359809/wFcLUbwd_400x400.jpg',
        'data-project-color': '#FFFFFF',
        'data-modal-open-by-default': 'false',
        'data-bot-protection-mechanism': 'hcaptcha',
        'data-modal-override-open-id': 'ask-ai-input',
        'data-modal-override-open-class': 'search-input',
        'data-user-analytics-fingerprint-enabled': 'true',
        'data-button-text-color': '#136EC4',
        'data-modal-example-questions-title': 'Try asking me...',
        'data-modal-example-questions': 'How to create a topic?,How does message retention work?,What is a Pulsar broker?,How does geo-replication work?',
        'data-modal-disclaimer': 'This is a custom LLM with access to all Pulsar documentation.',
        'data-consent-required': true,
        'data-consent-screen-disclaimer': "By clicking &quot;I agree, let's chat&quot;, you consent to the use of the AI assistant in accordance with kapa.ai's Privacy Policy. This service uses reCAPTCHA, which requires your consent to Google Privacy Policy and Terms of Service.",
        'data-user-analytics-cookie-enabled': false,
      }
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
};
