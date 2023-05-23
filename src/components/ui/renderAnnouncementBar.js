const boltIcon = `
<svg viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.5 19.6001H16.1L15.3 29.2001L26.5 12.4H17.06L18.1 2.80005L6.5 19.6001Z" stroke="#F7F7F7" stroke-width="1.5" stroke-linejoin="round"/>
</svg>
`;

const arrowIcon = `
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="20" height="20" transform="translate(6 6)" fill="white" fill-opacity="0.01"/>
<path d="M17.6667 10.1667L23.5 16.0001M23.5 16.0001L17.6667 21.8334M23.5 16.0001L8.5 16.0001" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="white"/>
</svg>
`;

/**
 * @jsdoc
 * @description
 * This function renders the announcement bar.
 * @param html - The HTML to render.
 * @param href - The URL to link to.
 */
function renderAnnouncementBar(html, href) {
  return `
    <a class="announcement-bar" href="${href}" target="_blank">
      <div class="announcement-bar__content">
        <svg class="announcement-bar__icon">
          ${boltIcon}
        </svg>

        <span>
          ${html}
        </span>

        <svg class="announcement-bar__icon">
          ${arrowIcon}
        </svg>
      </div>
    </a>
  `;
}

module.exports = {
  renderAnnouncementBar
};
