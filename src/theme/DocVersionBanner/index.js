import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import {
  useActivePlugin,
  useDocVersionSuggestions,
} from "@docusaurus/plugin-content-docs/client";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useDocsPreferredVersion,
  useDocsVersion,
} from "@docusaurus/theme-common/internal";
import BrowserOnly from "@docusaurus/BrowserOnly";
let versions = require("../../../versions.json");
const _latestVersion = versions[0];
const _ltsVersion = '3.0.x';
const _maintainedVersions = ['3.2.x', '3.0.x'];
function UnreleasedVersionLabel({ siteTitle, versionMetadata }) {
  return (
    <Translate
      id="theme.docs.versions.unreleasedVersionLabel"
      description="The label used to tell the user that he's browsing an unreleased doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}
    >
      {"This is documentation for the next unreleased version of Pulsar."}
    </Translate>
  );
}
function MaintainedVersionLabel({ siteTitle, versionMetadata }) {
  return (
    <Translate
      id="theme.docs.versions.maintainedVersionLabel"
      description="The label used to tell the user that he's browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}
    >
      {"This is documentation for Pulsar {versionLabel}."}
    </Translate>
  );
}
function UnmaintainedVersionLabel({ siteTitle, versionMetadata }) {
  return (
    <Translate
      id="theme.docs.versions.unmaintainedVersionLabel"
      description="The label used to tell the user that he's browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}
    >
      {
        "This is documentation for Pulsar {versionLabel}, which is no longer actively maintained."
      }
    </Translate>
  );
}
const BannerLabelComponents = {
  unreleased: UnreleasedVersionLabel,
  maintained: MaintainedVersionLabel,
  unmaintained: UnmaintainedVersionLabel,
};
function BannerLabel(props) {
  let BannerLabelComponent = null;
  if (props.versionMetadata.version == "current") {
    BannerLabelComponent = BannerLabelComponents.unreleased;
  } else if (_maintainedVersions.includes(props.versionMetadata.version)) {
    BannerLabelComponent = BannerLabelComponents.maintained;
  } else if (props.versionMetadata.version != _latestVersion) {
    BannerLabelComponent = BannerLabelComponents.unmaintained;
  } else {
    return <></>;
  }
  // const BannerLabelComponent =
  //   BannerLabelComponents[props.versionMetadata.banner];
  return <BannerLabelComponent {...props} />;
}
function LatestVersionSuggestionLabel({ versionLabel, to, onClick }) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        versionLabel,
        latestVersionLink: (
          <b>
            <Link to={to} onClick={onClick}>
              {/* <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label"
              > */}
              {versionLabel}
              {/* </Translate> */}
            </Link>
          </b>
        ),
      }}
    >
      {"We recommend that you use the {latestVersionLink} documentation."}
    </Translate>
  );
}
function DocVersionBannerEnabled({ className, versionMetadata }) {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { pluginId } = useActivePlugin({ failfast: true });
  const getVersionMainDoc = (version) =>
    version.docs.find((doc) => doc.id === version.mainDocId);
  const { savePreferredVersionName } = useDocsPreferredVersion(pluginId);
  const { latestDocSuggestion, latestVersionSuggestion } =
    useDocVersionSuggestions(pluginId);
  // Try to link to same doc in latest version (not always possible), falling
  // back to main doc of latest version
  const latestVersionSuggestedDoc =
    latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);

  let path = latestVersionSuggestedDoc.path;
  let reg = new RegExp("/" + versionMetadata.version + "/");
  path = path.replace(reg, "/");
  return (
    <div
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBanner,
        "alert alert--warning margin-bottom--md"
      )}
      role="alert"
    >
      <div>
        <BannerLabel siteTitle={siteTitle} versionMetadata={versionMetadata} />
      </div>
      <div className="margin-top--md">
        <LatestVersionSuggestionLabel
          versionLabel={_latestVersion}
          to={path}
          onClick={() => {
            savePreferredVersionName(latestVersionSuggestion.name);
            window.location.href = path;
          }}
        />
      </div>
    </div>
  );
}
export default function DocVersionBanner({ className }) {
  const versionMetadata = useDocsVersion();
  return (
    <BrowserOnly>
      {() => {
        return versionMetadata.version != _latestVersion &&
          versionMetadata.version != _ltsVersion &&
          location.pathname.startsWith("/docs") ? (
          <DocVersionBannerEnabled
            className={className}
            versionMetadata={versionMetadata}
          />
        ) : (
          <></>
        );
      }}
    </BrowserOnly>
  );
}
