import React from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, PageMetadata, ThemeClassNames,} from '@docusaurus/theme-common';
import {
  DocsSidebarProvider,
  DocsVersionProvider,
  docVersionSearchTag,
  useDocRouteMetadata,
} from '@docusaurus/theme-common/internal';
import DocPageLayout from '@theme/DocPage/Layout';
import NotFound from '@theme/NotFound';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/DocPage';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

function createCanonicalHref(pathname: string): string {
  const {siteConfig} = useDocusaurusContext();
  return siteConfig.url + useBaseUrl(pathname);
}
function DocPageMetadata(props: Props): JSX.Element {
  const {versionMetadata} = props;
  return (
    <>
      <SearchMetadata
        version={versionMetadata.version}
        tag={docVersionSearchTag(
          versionMetadata.pluginId,
          versionMetadata.version,
        )}
      />
      <PageMetadata>
        {versionMetadata.noIndex && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <link rel="canonical" href={createCanonicalHref(location.pathname)}/>
      </PageMetadata>
    </>
  );
}

export default function DocPage(props: Props): JSX.Element {
  const {versionMetadata} = props;
  const currentDocRouteMetadata = useDocRouteMetadata(props);
  if (!currentDocRouteMetadata) {
    return <NotFound />;
  }
  const {docElement, sidebarName, sidebarItems} = currentDocRouteMetadata;
  return (
    <>
      <DocPageMetadata {...props} />
      <HtmlClassNameProvider
        className={clsx(
          // TODO: it should be removed from here
          ThemeClassNames.wrapper.docsPages,
          ThemeClassNames.page.docsDocPage,
          props.versionMetadata.className,
        )}>
        <DocsVersionProvider version={versionMetadata}>
          <DocsSidebarProvider name={sidebarName} items={sidebarItems}>
            <DocPageLayout>{docElement}</DocPageLayout>
          </DocsSidebarProvider>
        </DocsVersionProvider>
      </HtmlClassNameProvider>
    </>
  );
}
