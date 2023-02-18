import React from "react";
import s from "./BlogPosts.module.css";
import { BlogPostMetadata } from "@docusaurus/plugin-content-blog";
import Link from "../../../ui/Link/Link";

const recentPosts: {
  items: BlogPostMetadata[];
} = require("../../../../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");

export type BlogPostsProps = {
  count: number;
};

const BlogPosts: React.FC<BlogPostsProps> = (props) => {
  const posts = recentPosts.items.slice(0, props.count);

  if (posts.length === 0) {
    return <></>;
  }

  return (
    <div className={s.BlogPosts}>
      <strong>Latest news:</strong>
      <ul className={s.List}>
        {posts.map((post, i) => (
          <li key={i} className={s.ListItem}>
            <Link href={post.permalink} variant="navigate">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
