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
            "label": "Testing and CI",
            link: {
                type: 'generated-index',
            },
            items: [
                'testing-licenses',
                'personal-ci',
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
        },
        {
            "type": "category",
            "label": "Releases",
            link: {
                type: 'generated-index',
            },
            items: [
                'create-gpg-keys',
                'validate-release-candidate',
                'release-process',
                'release-note-guide',
                'version-policy',
            ]
        },
        {
            "type": "category",
            "label": "Committers",
            link: {
                type: 'generated-index',
            },
            items: [
                'become-core-developer',
            ]
        }
    ],
};

module.exports = sidebars;
