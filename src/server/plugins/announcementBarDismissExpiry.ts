import type { LoadContext, Plugin } from "@docusaurus/types";
import { DISMISSED_AT_STORAGE_KEY } from "../../theme/AnnouncementBar/dismissExpiry";

type Options = {
  // How long a closed announcement bar stays hidden.
  dismissForMs?: number;
};

// Docusaurus remembers a closed announcement bar forever. This plugin adds an inline script that
// runs before Docusaurus' own announcement bar script and clears the dismissal when it has expired,
// so the bar is shown again on the next page load. `src/theme/AnnouncementBar/CloseButton` records
// when the bar was closed.
export default function announcementBarDismissExpiryPlugin(
  context: LoadContext,
  options: Options
): Plugin {
  const dismissForMs = options.dismissForMs ?? 60 * 60 * 1000;
  const { type, namespace } = context.siteStorage;
  // Keep in sync with the storage key in @docusaurus/theme-common.
  const dismissKey = JSON.stringify(`docusaurus.announcement.dismiss${namespace}`);
  const dismissedAtKey = JSON.stringify(`${DISMISSED_AT_STORAGE_KEY}${namespace}`);
  return {
    name: "announcement-bar-dismiss-expiry",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `(function() {
  try {
    var storage = window[${JSON.stringify(type)}];
    if (storage.getItem(${dismissKey}) !== 'true') return;
    var dismissedAt = Number(storage.getItem(${dismissedAtKey}));
    if (!dismissedAt || Date.now() - dismissedAt >= ${dismissForMs}) {
      storage.setItem(${dismissKey}, 'false');
      storage.removeItem(${dismissedAtKey});
    }
  } catch (e) {}
})();`,
          },
        ],
      };
    },
  };
}
