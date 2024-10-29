import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/BlogPostItem/Footer/ReadMoreLink';

import ReadArrow from './readArrow.svg';

function ReadMoreLabel() {
  return (
      <Translate
        id="theme.blog.post.readMore"
        description="The label used in blog post item excerpts to link to full blog posts">
        read
      </Translate>
  );
}

export default function BlogPostItemFooterReadMoreLink(
  props: Props,
): JSX.Element {
  const {blogPostTitle, ...linkProps} = props;
  return (
    <Link
      aria-label={translate(
        {
          message: 'Read more about {title}',
          id: 'theme.blog.post.readMoreLabel',
          description:
            'The ARIA label for the link to full blog posts from excerpts',
        },
        {title: blogPostTitle},
      )}
      {...linkProps}>
      <ReadMoreLabel /> <ReadArrow />
    </Link>
  );
}
