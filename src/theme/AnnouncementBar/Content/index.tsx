import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { usePluginData } from "@docusaurus/useGlobalData";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { renderAnnouncementBar } from "@site/src/components/ui/renderAnnouncementBar";
import {
  ANNOUNCEMENT_BAR_DATA_FILE,
  type AnnouncementBarData,
  type AnnouncementBarEntry,
} from "../announcementBarData";
import styles from "./styles.module.css";

const ROTATION_INTERVAL_MS = 5000;

function isEntries(value: unknown): value is AnnouncementBarEntry[] {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) => entry && typeof entry.html === "string" && typeof entry.link === "string"
    )
  );
}

// Fetched once per page load and shared by every render of the bar.
let currentEntries: Promise<AnnouncementBarEntry[] | undefined> | undefined;

function fetchCurrentEntries(url: string): Promise<AnnouncementBarEntry[] | undefined> {
  currentEntries ??= fetch(url)
    .then((response) => (response.ok ? response.json() : undefined))
    .then((data) => (isEntries(data?.entries) && data.entries.length > 0 ? data.entries : undefined))
    .catch(() => undefined);
  return currentEntries;
}

// Rotates through the entries of the `announcement-bar` plugin instead of showing the single
// `themeConfig.announcementBar.content`. The page renders the entries of its own build, and then
// switches to the current entries that the latest build published, so that pages that aren't
// rebuilt, such as the docs of older versions, show the current announcements too.
export default function AnnouncementBarContent(props: React.ComponentProps<"div">): JSX.Element {
  const buildEntries = (usePluginData("announcement-bar") as AnnouncementBarData).entries;
  const dataUrl = useBaseUrl(`/${ANNOUNCEMENT_BAR_DATA_FILE}`);
  const [entries, setEntries] = useState(buildEntries);
  useEffect(() => {
    let active = true;
    fetchCurrentEntries(dataUrl).then((current) => {
      if (active && current && JSON.stringify(current) !== JSON.stringify(buildEntries)) {
        setEntries(current);
      }
    });
    return () => {
      active = false;
    };
  }, [dataUrl, buildEntries]);

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
