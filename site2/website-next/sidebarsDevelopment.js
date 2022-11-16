/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    sidebarDevelopment: [
        'about',
        {
            "type": "category",
            "label": "Getting Started",
            link: {
                type: 'generated-index',
            },
            items: [
                'setup-building',
                'setup-ide',
            ]
        },
        {
            "type": "category",
            "label": "Development",
            link: {
                type: 'generated-index',
            },
            items: [
                'develop-labels',
                'develop-semantic-title'
            ]
        },
        {
            "type": "category",
            "label": "Documentation",
            link: {
                type: 'generated-index',
            },
            items: [
                'document-intro',
                'document-contribution',
                'document-syntax',
                'document-preview',
            ]
        }
    ],
};

module.exports = sidebars;
