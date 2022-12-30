/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    sidebarDevelopment: [
        'about',
        {
            type: "category",
            label: "Getting Started",
            items: [
                'setup-building',
                'setup-ide',
            ]
        },
        {
            type: "category",
            label: "Development",
            items: [
                'develop-labels',
                'develop-semantic-title'
            ]
        },
        {
            type: "category",
            label: "Testing and CI",
            items: [
                'testing-licenses',
                'personal-ci',
            ]
        },
        {
            type: "category",
            label: "Documentation",
            items: [
                'document-intro',
                'document-contribution',
                'document-syntax',
                'document-preview',
            ]
        },
        {
            type: "category",
            label: "Releases",
            items: [
                'create-gpg-keys',
                'validate-release-candidate',
                'release-process',
                'release-note-guide',
                'version-policy',
            ]
        },
        {
            type: "category",
            label: "Committers",
            items: [
                'become-core-developer',
            ]
        }
    ],
};

module.exports = sidebars;
