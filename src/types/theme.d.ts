declare module '@theme/Layout' {
  import type { ReactNode } from 'react';

  export interface Props {
    readonly children?: ReactNode;
    readonly noFooter?: boolean;
    readonly wrapperClassName?: string;
    readonly title?: string;
    readonly description?: string;
  }

  export default function Layout(props: Props): ReactNode;
}

declare module '@theme/BlogSidebar' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly sidebar?: ReactNode;
  }
  export default function BlogSidebar(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem/Header' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }
  export default function BlogPostItemHeader(props: Props): ReactNode;
}

declare module '@theme/BlogLayout' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly sidebar?: ReactNode;
    readonly toc?: ReactNode;
  }
  export default function BlogLayout(props: Props): ReactNode;
}

declare module '@theme/BlogListPaginator' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly metadata?: any;
  }
  export default function BlogListPaginator(props: Props): ReactNode;
}

declare module '@theme/SearchMetadata' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
  }
  export default function SearchMetadata(props: Props): ReactNode;
}

declare module '@theme/BlogPostItems' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly items?: any[];
  }
  export default function BlogPostItems(props: Props): ReactNode;
}

declare module '@theme/PaginatorNavLink' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly href?: string;
    readonly title?: string;
    readonly subLabel?: string;
    readonly isNext?: boolean;
  }
  export default function PaginatorNavLink(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem/Container' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }
  export default function BlogPostItemContainer(props: Props): ReactNode;
}

declare module '@theme/MDXContent' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
  }
  export default function MDXContent(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem/Content' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }
  export default function BlogPostItemContent(props: Props): ReactNode;
}

declare module '@theme/EditMetaRow' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
  }
  export default function EditMetaRow(props: Props): ReactNode;
}

declare module '@theme/EditThisPage' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly editUrl?: string;
    readonly lastUpdatedAt?: number;
    readonly lastUpdatedBy?: string;
  }
  export default function EditThisPage(props: Props): ReactNode;
}

declare module '@theme/TagsListInline' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly tags?: any[];
  }
  export default function TagsListInline(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem/Footer/ReadMoreLink' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly blogPostTitle?: string;
    readonly to?: string;
  }
  export default function BlogPostItemFooterReadMoreLink(props: Props): ReactNode;
}

declare module '@theme/Blog/Components/Author' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly author?: any;
  }
  export default function BlogAuthor(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem/Header/Title' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }
  export default function BlogPostItemHeaderTitle(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem/Header/Info' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }
  export default function BlogPostItemHeaderInfo(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem/Header/Authors' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }
  export default function BlogPostItemHeaderAuthors(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem/Footer' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly tags?: any[];
  }
  export default function BlogPostItemFooter(props: Props): ReactNode;
}

declare module '@theme/BlogPostItem' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
    readonly className?: string;
  }
  export default function BlogPostItem(props: Props): ReactNode;
}

declare module '@theme/BlogPostPaginator' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly nextItem?: any;
    readonly prevItem?: any;
  }
  export default function BlogPostPaginator(props: Props): ReactNode;
}

declare module '@theme/TOC' {
  import type { ReactNode } from 'react';
  export interface Props {
    readonly children: ReactNode;
  }
  export default function TOC(props: Props): ReactNode;
}