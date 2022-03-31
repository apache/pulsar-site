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
      <DocsVersionWrapperMemo docsPluginId={docsPluginId} />
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
        items={['Master', 'Legacy']}
      />
    </div>
  );
}

const DocsVersionWrapperMemo = React.memo(DocsVersionWrapper);

export default React.memo(DocSidebarDesktop);
