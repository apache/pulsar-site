import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { RecentBlogPost, RecentBlogPostsData } from "@site/src/server/plugins/recentBlogPosts";

// The blog posts of the last few months, or the latest post, published by the `recent-blog-posts` plugin.
export function useRecentBlogPosts(): RecentBlogPost[] {
  return (usePluginData("recent-blog-posts") as RecentBlogPostsData).posts;
}

// List items for the recent blog posts. Render them inside a `<ul>`.
export default function RecentBlogPosts(): JSX.Element {
  const posts = useRecentBlogPosts();
  return <>
    {posts.map((post) => (
      <li key={post.permalink}>
        <Link to={post.permalink}>Blog: {post.title}</Link> ({post.date})
      </li>
    ))}
  </>
}
