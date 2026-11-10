import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRecentBlogPosts } from "@site/src/components/RecentBlogPosts";
import { renderAnnouncementBar } from "@site/src/components/ui/renderAnnouncementBar";
import announcementBarEntries from "@site/data/announcement-bar";
import styles from "./styles.module.css";

const ROTATION_INTERVAL_MS = 5000;
const MAX_BLOG_POSTS = 3;

type Entry = { html: string; link: string };

function withoutTrailingSlash(link: string): string {
  return link.replace(/\/+$/, "");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Rotates through the hand-written entries in `data/announcement-bar.js` and the latest blog posts,
// instead of showing the single `themeConfig.announcementBar.content`.
export default function AnnouncementBarContent(props: React.ComponentProps<"div">): JSX.Element {
  const recentBlogPosts = useRecentBlogPosts();
  const entries: Entry[] = [...(announcementBarEntries as Entry[])];
  for (const post of recentBlogPosts.slice(0, MAX_BLOG_POSTS)) {
    if (!entries.some((entry) => withoutTrailingSlash(entry.link) === withoutTrailingSlash(post.permalink))) {
      entries.push({ html: `Blog: ${escapeHtml(post.title)}`, link: post.permalink });
    }
  }

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (entries.length < 2 || paused) {
      return undefined;
    }
    const timer = setInterval(() => setIndex((i) => (i + 1) % entries.length), ROTATION_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [entries.length, paused]);

  if (entries.length === 0) {
    return <div {...props} className={clsx(styles.content, props.className)} />;
  }
  const entry = entries[index % entries.length];
  return (
    <div
      {...props}
      className={clsx(styles.content, props.className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-live="polite"
      // The entries are written by the site developers, and blog post titles are escaped.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderAnnouncementBar(entry.html, entry.link) }}
    />
  );
}
