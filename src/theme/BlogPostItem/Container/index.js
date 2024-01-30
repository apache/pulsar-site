import React from 'react';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import s from './index.module.css';

export default function BlogPostItemContainer({children, className}) {
  const {frontMatter, assets, isBlogPostPage} = useBlogPost();
  const {withBaseUrl} = useBaseUrlUtils();
  const image = assets.image ?? frontMatter.image;
  return (
    <article
      className={className+' '+(isBlogPostPage ? s.BlogContainerPost : s.BlogContainer)}
      itemProp="blogPost"
      itemScope
      itemType="http://schema.org/BlogPosting">
      {image && (
        <meta itemProp="image" content={withBaseUrl(image, {absolute: true})} />
      )}
      {children}
    </article>
  );
}
