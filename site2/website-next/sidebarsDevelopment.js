/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    sidebarDevelopment: [
        'about',
        {
            "type": "category",
            "label": "Get Started",
            link: {
                type: 'generated-index',
            },
            items: [
                'setup-building',
                'setup-ide',
            ]
        }
    ],
};

module.exports = sidebars;
