/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    sidebarDevelopment: [
        'about',
        {
            type: "category",
            label: "Getting started",
            items: [
                'setup-building',
                'setup-ide',
                'setup-debugging'
            ]
        },
        {
            type: "category",
            label: "Development",
            items: [
                'develop-coding-conventions',
                'develop-triage',
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
            label: "Website",
            items: [
                'site-intro',
                'document-preview',
                'document-syntax',
            ]
        },
        {
            type: "category",
            label: "Documentation",
            items: [
                'document-intro',
                'document-contribution',
            ]
        },
        {
            type: "category",
            label: "Releases",
            items: [
                'release-policy',
                {
                    type: "category",
                    label: 'Release process',
                    link: {type: 'doc', id: 'release-process'},
                    items: [
                        'create-gpg-keys',
                        'release-note-guide',
                        'setup-mergetool'
                    ]
                },
                'validate-release-candidate',
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
