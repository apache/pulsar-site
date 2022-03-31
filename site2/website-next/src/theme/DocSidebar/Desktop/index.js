/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
import Logo from "@theme/Logo";
import CollapseButton from "@theme/DocSidebar/Desktop/CollapseButton";
import Content from "@theme/DocSidebar/Desktop/Content";
import styles from "./styles.module.css";
import DocsVersionDropdownNavbarItem from "../../DocsVersionDropdownNavbarItem";
import BrowserOnly from "@docusaurus/BrowserOnly";

function DocSidebarDesktop({
  path,
  sidebar,
  onCollapse,
  isHidden,
  docsPluginId,
}) {
  const {
    navbar: { hideOnScroll },
    hideableSidebar,
  } = useThemeConfig();
  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden
      )}
    >
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}
      <BrowserOnlyDocsVersionWrapper docsPluginId={docsPluginId} />
      <Content path={path} sidebar={sidebar} />
      {hideableSidebar && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

function DocsVersionWrapper(props) {
  return (
    <div className={styles.sidebarVersionSwitch}>
      Version:
      <DocsVersionDropdownNavbarItem
        docsPluginId={props.docsPluginId}
        dropdownItemsBefore={[]}
        dropdownItemsAfter={[]}
        items={[]}
      />
    </div>
  );
}

const DocsVersionWrapperMemo = React.memo(DocsVersionWrapper);

const BrowserOnlyDocsVersionWrapper = (props) => {
  return (
    <BrowserOnly>
      {() => {
        return location.pathname.indexOf("/docs/") > -1 ? (
          <DocsVersionWrapperMemo docsPluginId={props.docsPluginId} />
        ) : (
          <></>
        );
      }}
    </BrowserOnly>
  );
};

export default React.memo(DocSidebarDesktop);
