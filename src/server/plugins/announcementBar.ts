import fs from "fs/promises";
import path from "path";
import type { LoadContext, Plugin } from "@docusaurus/types";
import { getBlogContent, selectRecentBlogPosts } from "./recentBlogPosts";
import {
  ANNOUNCEMENT_BAR_DATA_FILE,
  type AnnouncementBarData,
  type AnnouncementBarEntry,
} from "../../theme/AnnouncementBar/announcementBarData";

type Options = {
  // The hand-written entries, shown first.
  entries: AnnouncementBarEntry[];
  // How many of the latest blog posts to add after the hand-written entries.
  maxBlogPosts?: number;
  // How many months back, from the build time, to include blog posts.
  months?: number;
};

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

// Computes the announcement bar entries: the hand-written entries, then the latest blog posts of the
// last few months (or the latest post) that no hand-written entry links to. The entries are
// published as global data, which the pages of this build render, and as a JSON file, which
// `src/theme/AnnouncementBar/Content` fetches so that the bar shows the current entries on every
// page, including pages that aren't rebuilt.
export default function announcementBarPlugin(context: LoadContext, options: Options): Plugin {
  const maxBlogPosts = options.maxBlogPosts ?? 3;
  const months = options.months ?? 3;
  let data: AnnouncementBarData = { entries: [...options.entries] };
  return {
    name: "announcement-bar",
    async allContentLoaded({ allContent, actions }) {
      const entries = [...options.entries];
      const posts = selectRecentBlogPosts(
        getBlogContent(allContent),
        months,
        context.siteConfig.trailingSlash
      ).slice(0, maxBlogPosts);
      for (const post of posts) {
        const link = withoutTrailingSlash(post.permalink);
        if (!entries.some((entry) => withoutTrailingSlash(entry.link) === link)) {
          entries.push({ html: `Blog: ${escapeHtml(post.title)}`, link: post.permalink });
        }
      }
      data = { entries };
      actions.setGlobalData(data);
    },
    async postBuild({ outDir }) {
      await fs.writeFile(path.join(outDir, ANNOUNCEMENT_BAR_DATA_FILE), JSON.stringify(data) + "\n");
    },
  };
}
