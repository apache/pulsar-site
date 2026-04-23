/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
    clientLibraries: [
        'overview',
        'feature-matrix',
        {
            type: "category",
            label: "Get started",
            items: [
                {
                    type: "category",
                    label: "Java client",
                    link: {type: "doc", id: "java"},
                    items: [
                        "java-setup",
                        "java-initialize",
                        "java-use",
                        "java-tracing",
                    ],
                },
                {
                    type: "category",
                    label: "C++ client",
                    link: {type: "doc", id: "cpp"},
                    items: [
                        "cpp-setup",
                        "cpp-initialize",
                        "cpp-use",
                    ],
                },
                {
                    type: "category",
                    label: "Go client",
                    link: {type: "doc", id: "go"},
                    items: [
                        "go-setup",
                        "go-initialize",
                        "go-use",
                    ],
                },
                {
                    type: "category",
                    label: "Python client",
                    link: {type: "doc", id: "python"},
                    items: [
                        "python-setup",
                        "python-initialize",
                        "python-use",
                    ],
                },
                {
                    type: "category",
                    label: "Node.js client",
                    link: {type: "doc", id: "node"},
                    items: [
                        "node-setup",
                        "node-initialize",
                        "node-use",
                        "node-configs",
                    ],
                },
                {
                    type: "category",
                    label: "C# client",
                    link: {type: "doc", id: "dotnet"},
                    items: [
                        "dotnet-setup",
                        "dotnet-initialize",
                        "dotnet-use",
                    ],
                },
                "websocket",
                "rest",
            ],
        },
        {
            type: "category",
            label: "Advanced use",
            items: [
                "clients",
                "producers",
                "consumers",
                "readers",
                "tableviews",
                "schema",
                "cluster-level-failover",
            ],
        },
    ],
};
