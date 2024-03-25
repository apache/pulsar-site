import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';

import type {Props} from '@theme/BlogLayout';

import s from './index.module.css';

export default function BlogLayout(props: Props): JSX.Element {
  const {header, sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className="container margin-top--lg">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx('col', {
              'col--7': hasSidebar,
              'col--12': !hasSidebar,
            })}
            itemScope
            itemType="https://schema.org/Blog">
            {header && 
              <section className={s.BlogHeader}>
                <h1>Blog</h1>
                <p>Read about the latest releases, explore new features, discover upcoming events, and gain insights through articles on the Apache Pulsar Blog.</p>
              </section>
            }
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}