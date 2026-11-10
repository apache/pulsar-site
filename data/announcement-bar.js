// Hand-written entries for the announcement bar at the top of every page. The bar rotates through
// these entries and then the latest blog posts of the last 3 months (or the latest post), showing
// each for 5 seconds. A blog post with the same link as an entry here isn't shown twice.
// Pages load the entries from /announcement-bar.json, which every site build updates, so a change
// here reaches all pages, including the docs of older versions, without rebuilding them.
// `html` is rendered as HTML, so escape any `<`, `>` and `&` in plain text.
module.exports = [
  {
    html: "Spring Pulsar has a new home! 🏡",
    link: "/blog/2026/11/10/apache-pulsar-support-for-spring/",
  },
  {
    html: "✨ Apache Pulsar 5.0 is here! ✨",
    link: "/blog/2026/10/05/announcing-apache-pulsar-5-0/",
  },
];
