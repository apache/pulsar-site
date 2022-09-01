import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import Logo from '@theme/Logo';
import CollapseButton from '@theme/DocSidebar/Desktop/CollapseButton';
import Content from '@theme/DocSidebar/Desktop/Content';
import styles from './styles.module.css';
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
    docs: {
      sidebar: { hideable },
    },
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
      {path.indexOf("/docs/") > -1 ? (
        <DocsVersionWrapperMemo docsPluginId={docsPluginId} />
      ) : (
        <></>
      )}
      <Content path={path} sidebar={sidebar} />
      {hideable && <CollapseButton onClick={onCollapse} />}
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

export default React.memo(DocSidebarDesktop);
