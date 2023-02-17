import React from "react";
import s from "./BlogPosts.module.css";
import { BlogPostMetadata } from "@docusaurus/plugin-content-blog";

const recentPosts: {
  items: BlogPostMetadata[];
} = require("../../../../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");

export type BlogPostsProps = {
  count: number;
};

const BlogPosts: React.FC<BlogPostsProps> = (props) => {
  const posts = recentPosts.items.slice(0, props.count);

  console.log('posts', posts)
  if (posts.length === 0) {
    return <></>;
  }

  return (
    <div className={s.BlogPosts}>
      {posts.map((post, i) => (
        <div key={i}>
          <a className={s.Link} href={post.permalink}>
            {post.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
