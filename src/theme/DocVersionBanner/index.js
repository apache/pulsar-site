import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {
  useActiveDocContext,
  useActivePlugin,
  useVersions,
} from '@docusaurus/plugin-content-docs/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  useDocsPreferredVersion,
  useDocsVersion,
} from '@docusaurus/plugin-content-docs/client';
import BrowserOnly from "@docusaurus/BrowserOnly";
import { getSupportedVersions } from '../../utils/supportedVersions';
let versions = require("../../../versions.json");
const _latestVersion = versions[0];
const _ltsVersion = '4.0.x';
const _maintainedVersions = getSupportedVersions();
function UnreleasedVersionLabel({siteTitle, versionMetadata}) {
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
        "This is documentation for Pulsar {versionLabel}, which is no longer supported. This documentation is no longer updated and may be outdated or inaccurate."
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
function VersionLink({ version, to, onClick }) {
  return (
    <b>
      <Link to={to} onClick={onClick}>
        {version}
      </Link>
    </b>
  );
}
// Joins links as "A", "A or B", or "A, B, or C".
function joinWithOr(items) {
  return items.map((item, i) => (
    <React.Fragment key={i}>
      {i > 0 && (i === items.length - 1 ? (items.length > 2 ? ", or " : " or ") : ", ")}
      {item}
    </React.Fragment>
  ));
}
function LatestVersionSuggestionLabel({ versionLink }) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{ latestVersionLink: versionLink }}
    >
      {"We recommend that you use the {latestVersionLink} documentation."}
    </Translate>
  );
}
function SupportedVersionsSuggestionLabel({ versionLinks }) {
  return (
    <Translate
      id="theme.docs.versions.supportedVersionsSuggestionLabel"
      description="The label used to point the user to the documentation of supported versions"
      values={{ supportedVersionLinks: <>{joinWithOr(versionLinks)}</> }}
    >
      {"For maintained documentation, see the {supportedVersionLinks} documentation."}
    </Translate>
  );
}
function DocVersionBannerEnabled({ className, versionMetadata }) {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { pluginId } = useActivePlugin({ failfast: true });
  const { savePreferredVersionName } = useDocsPreferredVersion(pluginId);
  const { alternateDocVersions } = useActiveDocContext(pluginId);
  const availableVersions = useVersions(pluginId);
  // Link to the same doc in the target version when it exists, falling back to
  // the main doc of that version
  const versionLink = (version) => {
    const versionData = availableVersions.find((v) => v.name === version);
    const doc =
      alternateDocVersions[version] ??
      versionData?.docs.find((d) => d.id === versionData.mainDocId);
    const to = doc?.path ?? `/docs/${version}/`;
    return (
      <VersionLink
        key={version}
        version={version}
        to={to}
        onClick={() => {
          savePreferredVersionName(version);
          window.location.href = to;
        }}
      />
    );
  };
  const isUnmaintained =
    versionMetadata.version !== "current" &&
    !_maintainedVersions.includes(versionMetadata.version);
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
        {isUnmaintained ? (
          <SupportedVersionsSuggestionLabel
            versionLinks={_maintainedVersions.map(versionLink)}
          />
        ) : (
          <LatestVersionSuggestionLabel versionLink={versionLink(_latestVersion)} />
        )}
      </div>
    </div>
  );
}
export default function DocVersionBanner({className}) {
  const versionMetadata = useDocsVersion();
  return (
    <BrowserOnly>
      {() => {
        return versionMetadata.version !== _latestVersion &&
          versionMetadata.version !== _ltsVersion &&
          location.pathname.startsWith("/docs") &&
          !location.pathname.startsWith("/docs/client-libraries") ? (
          <DocVersionBannerEnabled
            className={className}
            versionMetadata={versionMetadata}
          />
        ) : null;
      }}
    </BrowserOnly>
  );
}
