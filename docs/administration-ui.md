---
id: administration-ui
title: Administration UI
sidebar_label: "Administration UI"
description: Web-based UIs for managing Apache Pulsar, with Dekaf UI as the recommended option.
---

You can manage Apache Pulsar with a web-based UI. Dekaf UI is the recommended option.

:::warning Pulsar Manager is discontinued

Apache Pulsar Manager is no longer maintained by the Apache Pulsar project. It will not receive new releases, bug fixes, or updates for newer Pulsar versions, and its documentation has been removed from the current Pulsar documentation.

We do not recommend using Pulsar Manager for new deployments. If you are running it today, plan to move to an alternative solution and remove the Pulsar Manager deployment. If you deployed it with the Apache Pulsar Helm chart, disable the `pulsar_manager` component, which is already disabled by default in current chart versions.

See the replacement UIs below.

:::

## Dekaf UI

Dekaf is a recommended web-based UI for Apache Pulsar. It is licensed under the Apache License 2.0.

![Dekaf UI](/assets/administration-dekaf-ui.png)

- 🏠 [GitHub repo](https://github.com/visortelle/dekaf)
- 📚 [Quick-start](https://github.com/visortelle/dekaf?tab=readme-ov-file#quick-start)
- 📚 [Consumer session tutorial](https://github.com/visortelle/dekaf/blob/main/docs/consume/consumer-session-tutorial.md)
- 📚 [Configuration reference](https://github.com/visortelle/dekaf/blob/main/docs/configuration-reference.md)

### Features

- Browse Pulsar resources like tenants, namespaces, topics, subscriptions, consumers and producers.
- View stats for each resource.
- Create topics, edit namespace and topic policies, split bundles, etc.
- View messages in a topic or multiple topics at once. Filter messages, colorize them. Save and reuse browse sessions.

Please share your feedback as the project maintainers prioritize bugfixes and new features, based on user requests.

## Alternative

- [DataStax Pulsar Admin Console](https://github.com/datastax/pulsar-admin-console): a web-based UI for managing Apache Pulsar with OpenID Connect authentication support. It is licensed under the Apache License 2.0.
