/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    releaseNote: [
        'pulsar',
        {
            "type": "category",
            "label": "Clients Release Notes",
            link: {type: 'doc', id: 'clients'},
            items: [
                'client-java',
                'client-ws',
                'client-cpp',
                'client-python',
                'client-go',
                'client-node',
                'client-cs',
            ],
            collapsed: false,
        },
        'pulsar-manager',
    ],
};
