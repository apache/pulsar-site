/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import DropdownNavbarItem from "@theme/NavbarItem/DropdownNavbarItem";
import { useActiveDocContext, useLatestVersion, } from "@docusaurus/plugin-content-docs/client";
import { useDocsPreferredVersion } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";

const versions = [
  {
    name: "current",
    label: "Next",
    path: "/docs/next"
  },
  {
    label: '3.2.x',
    name: '3.2.x',
    path: `/docs/3.2.x`,
  },
  {
    label: '3.0.x LTS',
    name: '3.0.x',
    path: `/docs/3.0.x`,
  },
  {
    name: "others",
    label: "Others",
    path: "/versions",
  }
];

const getVersionMainDoc = (version) =>
  version.docs.find((doc) => doc.id === version.mainDocId);

export default function DocsVersionDropdownNavbarItem({
  mobile,
  docsPluginId,
  dropdownActiveClassDisabled,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}) {
  const activeDocContext = useActiveDocContext(docsPluginId);
  const latestVersion = useLatestVersion(docsPluginId);
  const { preferredVersion, savePreferredVersionName } =
    useDocsPreferredVersion(docsPluginId);
  function getItems() {
    const versionLinks = versions.map((version) => {
      // We try to link to the same doc, in another version
      // When not possible, fallback to the "main doc" of the version
      const _version = version.name === "current" ? "/next" : "/" + version.name;
      const _docId = activeDocContext.activeDoc.id === "about" ? "/" : "/" + activeDocContext.activeDoc.id;
      const versionDoc = {
        path: "/docs" + _version + _docId,
      };
      return {
        isNavLink: true,
        label: version.label,
        to: "",
        isActive: () => version.name === activeDocContext.activeVersion.name,
        onClick: () => {
          savePreferredVersionName(version.name);
          window.location.href = version.name === "others" ? "/versions" : versionDoc.path;
        },
      };
    });
    return [...dropdownItemsBefore, ...versionLinks, ...dropdownItemsAfter];
  }

  const items = getItems();
  const dropdownVersion =
    activeDocContext.activeVersion ?? preferredVersion ?? latestVersion; // Mobile dropdown is handled a bit differently

  const dropdownLabel =
    mobile && items.length > 1
      ? translate({
        id: "theme.navbar.mobileVersionsDropdown.label",
        message: "Versions",
        description:
          "The label for the navbar versions dropdown on mobile view",
      })
      : dropdownVersion.label;
  const dropdownTo =
    mobile && items.length > 1
      ? undefined
      : getVersionMainDoc(dropdownVersion).path; // We don't want to render a version dropdown with 0 or 1 item. If we build
  // the site with a single docs version (onlyIncludeVersions: ['1.0.0']),
  // We'd rather render a button instead of a dropdown

  if (items.length <= 1) {
    return (
      <DefaultNavbarItem
        {...props}
        mobile={mobile}
        label={dropdownLabel}
        to={dropdownTo}
        isActive={dropdownActiveClassDisabled ? () => false : undefined}
      />
    );
  }

  return (
    <DropdownNavbarItem
      {...props}
      mobile={mobile}
      label={dropdownLabel}
      to={dropdownTo}
      items={items}
      isActive={dropdownActiveClassDisabled ? () => false : undefined}
    />
  );
}
