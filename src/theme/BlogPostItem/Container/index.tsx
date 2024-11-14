import React from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import type {Props} from '@theme/BlogPostItem/Container';

import s from './index.module.css';

export default function BlogPostItemContainer({
  children,
  className,
}: Props): JSX.Element {
  const {
    frontMatter,
    assets,
    isBlogPostPage,
    metadata: {description},
  } = useBlogPost();  
  const {withBaseUrl} = useBaseUrlUtils();
  const image = assets.image ?? frontMatter.image;
  return (
    <article
      className={className+' '+(isBlogPostPage ? s.BlogContainerPost : s.BlogContainer)}
      itemProp="blogPost"
      itemScope
      itemType="https://schema.org/BlogPosting">
      {image && (
        <link itemProp="image" href={withBaseUrl(image, {absolute: true})} />
      )}
      {children}
    </article>
  );
}
