import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import styles from "./styles.module.css";
import DocsVersionDropdownNavbarItem from "../../DocsVersionDropdownNavbarItem";
import BrowserOnly from "@docusaurus/BrowserOnly";

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu = ({ sidebar, path, docsPluginId }) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
      <BrowserOnlyDocsVersionWrapper docsPluginId={docsPluginId} />
      <DocSidebarItems
        items={sidebar}
        activePath={path}
        onItemClick={(item) => {
          // Mobile sidebar should only be closed if the category has a link
          if (item.type === "category" && item.href) {
            mobileSidebar.toggle();
          }
          if (item.type === "link") {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
    </ul>
  );
};

function DocSidebarMobile(props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
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
        items={["Master", "Legacy"]}
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

export default React.memo(DocSidebarMobile);
