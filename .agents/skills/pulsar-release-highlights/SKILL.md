---
name: pulsar-release-highlights
description: Compile or refresh narrative Pulsar release highlights in pulsar-site, emphasizing upgrade actions, compatibility risks, and user-visible improvements. Use for requested release highlights or upgrade-focused release notes, rather than routine commit changelog generation.
---

# Pulsar release highlights

Maintain `docs/release-highlights.md` as the current documentation's narrative release page. Its stable document ID is `release-highlights`; navigation is in `sidebars.json`. This is distinct from the generated commit changelogs under `release-notes/`. Keep operational detail in the relevant guides, especially `docs/administration-upgrade.md`, and link to it prominently.

## Establish the release boundary

Identify the target tag or pinned commit, prior release line, and any milestones. Record source SHAs in the working evidence notes. For an upcoming release, say so on the page and distinguish post-milestone changes from behavior in published milestone binaries. Never infer release availability from a branch name or a draft announcement.

Use the Apache Pulsar source, configuration defaults, CLI implementations, tests, and release tags to verify behavior. Blog drafts, PIPs, PR descriptions, and changelogs identify candidates; accepted proposals can precede implementation. In particular, check changes merged after a draft was written. Do not describe a merged design proposal as a shipped feature.

Review the full change range, not only commits labeled features. Fixes, removed configuration, new defaults, dependency/runtime baselines, and packaging changes can require upgrade actions. Track coverage with a source reference, documentation destination, and disposition (documented, needs update, no user-visible change, or unresolved). A commit title alone is insufficient to settle an ambiguous compatibility change.

## Write for the person upgrading

Lead with the release's practical value and a prominent link to the upgrade guide. Explain:

- Required actions before upgrading: runtime, images, dependencies, certificates, authentication, extension APIs, removed settings/backends, and changed defaults.
- Risks and boundaries: mixed-version operation, metadata changes, rollout order, and rollback restrictions. Separate upgrading binaries from enabling new features or migrating metadata stores.
- New capabilities and material improvements: who benefits, how to adopt them, and links to the maintained feature guides.
- Known limitations or unresolved release-specific issues supported by evidence.

Keep the page readable prose with short, actionable lists. Avoid reproducing the commit list or making unsupported performance guarantees. Distinguish compatibility of client APIs, client runtimes, wire protocols, and server runtimes. Verify defaults against the target source, not an older release's reference page.

For 5.0, pay particular attention to TLS/authentication, Java baselines, container/connector packaging, Jakarta extensions, metadata stores, scalable-topic adoption, and downgrade constraints. This is a starting checklist, not a substitute for reviewing the full release delta.

## Reuse across patch releases

A new narrative is optional for a patch release. Retain the release line's existing highlights when they remain accurate, updating the release scope, relevant fixes, upgrade advice, known issues, and changelog link as needed. Do not invent a new feature narrative to fill a page. Never reuse stale compatibility or known-issue claims without checking the patch delta.

## Integrate and verify

Edit current `docs/` and related unversioned guides by default. Do not update `versioned_docs/` or `versioned_sidebars/` unless the task explicitly includes them. Use relative `.md` links within docs so snapshots retain their version context; use the site's `pathname:///` convention for separate documentation plugins.

Check sidebar registration, internal links and anchors, and the rendered current-version page using the repository's documented build workflow. Check commands and options against the target code. Inspect upgrade claims independently when uncertainty would affect rollout or rollback. Record unresolved evidence gaps instead of asserting completion.

Before delivery, compare the target with upstream again if documenting unreleased master, and audit any new delta. Keep the page marked as upcoming until release availability is confirmed. Local authoring does not authorize publishing, pushing, or posting messages.
