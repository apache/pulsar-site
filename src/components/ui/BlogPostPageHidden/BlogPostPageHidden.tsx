import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostPageHidden({children}) {
  const {isBlogPostPage} = useBlogPost();
  
  // Only hide on blog post pages
  if (isBlogPostPage) {
    return null;
  }
  
  return <>{children}</>;
}