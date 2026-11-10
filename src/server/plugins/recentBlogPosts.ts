import type { LoadContext, Plugin } from "@docusaurus/types";
import type { BlogContent } from "@docusaurus/plugin-content-blog";

export type RecentBlogPost = {
  title: string;
  permalink: string;
  // UTC date in YYYY-MM-DD format, formatted at build time so the server and client render the same text.
  date: string;
};

export type RecentBlogPostsData = {
  posts: RecentBlogPost[];
};

type Options = {
  // How many months back, from the build time, to include blog posts.
  months?: number;
};

// The listed blog posts of the last `months` months, newest first, or the latest post if there are
// none. Docusaurus' <Link> applies the `trailingSlash` setting, but the announcement bar renders plain
// links, so the permalinks are canonical URLs.
export function selectRecentBlogPosts(
  blog: BlogContent | undefined,
  months: number,
  trailingSlash: boolean | undefined
): RecentBlogPost[] {
  const canonicalPermalink = (permalink: string) =>
    trailingSlash === true && !permalink.endsWith("/")
      ? `${permalink}/`
      : trailingSlash === false && permalink.length > 1 && permalink.endsWith("/")
        ? permalink.slice(0, -1)
        : permalink;
  const cutoff = new Date();
  cutoff.setUTCMonth(cutoff.getUTCMonth() - months);
  const listed = (blog?.blogPosts ?? [])
    .map((post) => post.metadata)
    .filter((metadata) => !metadata.unlisted)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recent = listed.filter((metadata) => new Date(metadata.date) >= cutoff);
  // Fall back to the latest post when there are no posts in the period.
  return (recent.length > 0 ? recent : listed.slice(0, 1)).map((metadata) => ({
    title: metadata.title,
    permalink: canonicalPermalink(metadata.permalink),
    date: new Date(metadata.date).toISOString().slice(0, 10),
  }));
}

export function getBlogContent(allContent: Record<string, Record<string, unknown> | undefined>):
  | BlogContent
  | undefined {
  return allContent["docusaurus-plugin-content-blog"]?.["default"] as BlogContent | undefined;
}

// Publishes the blog posts of the last few months, or the latest post if there are none, as global
// data for pages outside of the blog such as the download page. Use the `useRecentBlogPosts` hook
// in `src/components/RecentBlogPosts`.
export default function recentBlogPostsPlugin(
  context: LoadContext,
  options: Options
): Plugin {
  const months = options.months ?? 3;
  return {
    name: "recent-blog-posts",
    async allContentLoaded({ allContent, actions }) {
      const posts = selectRecentBlogPosts(
        getBlogContent(allContent),
        months,
        context.siteConfig.trailingSlash
      );
      actions.setGlobalData({ posts } satisfies RecentBlogPostsData);
    },
  };
}
