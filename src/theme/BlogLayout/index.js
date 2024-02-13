import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import s from './index.module.css';

export default function BlogLayout(props) {
  const {header, sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  return (
    <Layout {...layoutProps}>
      <div className="container margin-top--lg">
        <div className="row">
          <main
            className={clsx('col', {
              'col--7': hasSidebar,
              'col--12': !hasSidebar,
            })}
            itemScope
            itemType="http://schema.org/Blog">
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
