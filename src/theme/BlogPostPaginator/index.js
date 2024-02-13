import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import PaginatorNavLink from '@theme/PaginatorNavLink';
export default function BlogPostPaginator(props) {
  const {nextItem, prevItem} = props;
  return (
    <nav
      className="pagination-nav blog-post-pagination-nav docusaurus-mt-lg"
      aria-label={translate({
        id: 'theme.blog.post.paginator.navAriaLabel',
        message: 'Blog post page navigation',
        description: 'The ARIA label for the blog posts pagination',
      })}>
        <div>
        {prevItem && (
          <PaginatorNavLink
            {...prevItem}
            subLabel={
              <Translate
                id="theme.blog.post.paginator.newerPost"
                description="The blog post button label to navigate to the newer/previous post">
                Newer Post
              </Translate>
            }
          />
        )}
        {nextItem && (
          <PaginatorNavLink
            {...nextItem}
            subLabel={
              <Translate
                id="theme.blog.post.paginator.olderPost"
                description="The blog post button label to navigate to the older/next post">
                Older Post
              </Translate>
            }
            isNext
          />
        )}
        <div className="blog-post-pagination-nav-more">
          <a href={`/blog`}>Show All</a>
        </div>
        </div>
    </nav>
  );
}
