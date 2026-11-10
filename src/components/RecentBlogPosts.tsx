import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { RecentBlogPostsData } from "@site/src/server/plugins/recentBlogPosts";

// List items for the blog posts of the last few months, published by the `recent-blog-posts`
// plugin. Render them inside a `<ul>`.
export default function RecentBlogPosts(): JSX.Element {
  const { posts } = usePluginData("recent-blog-posts") as RecentBlogPostsData;
  return <>
    {posts.map((post) => (
      <li key={post.permalink}>
        <Link to={post.permalink}>Blog: {post.title}</Link> ({post.date})
      </li>
    ))}
  </>
}
