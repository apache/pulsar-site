// Shared by the `announcement-bar` plugin, which publishes the entries, and the announcement bar
// component, which renders them.

export type AnnouncementBarEntry = {
  // Rendered as HTML.
  html: string;
  link: string;
};

export type AnnouncementBarData = {
  entries: AnnouncementBarEntry[];
};

// Where the entries are published, relative to the base URL. Pages fetch them from here, so that
// pages built earlier, such as the docs of older versions, show the current entries too.
export const ANNOUNCEMENT_BAR_DATA_FILE = "announcement-bar.json";
