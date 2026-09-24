# How to contribute

OEI Core is under active development and is used as the base for most of the applications we're building at OEI, and hopefully for projects that others (maybe you? 🤙) are developing or running in production. To that end, we want to make it as easy and transparent as possible to contribute. If we are missing anything or can make the process easier in any way, [please let us know](mailto:team@openendurance.org).

## Code of conduct

We expect all participants to read our [code of conduct](CODE_OF_CONDUCT.md) to understand which actions are and aren't tolerated.

## Open development

All work on OEI Core happens directly on GitHub. Both team members and external contributors send pull requests which go through the same review process.

## Semantic versioning

OEI packages follow semantic versioning. We release patch versions for bug fixes, minor versions for new features, and major versions for breaking changes. When we make breaking changes, we introduce deprecation warnings in a minor version along with the upgrade path so that our users learn about the upcoming changes and migrate their code in advance.

The following sections detail what kinds of changes result in each of major, minor, and patch version bumps:

### Major

-   Removal of a class, module, component
-   Removal of a prop from a class or component
-   Removal of a prop from an API endpoint
-   Change to the type accepted for a prop
-   Change to a public method signature
-   Breaking changes to minimum version of dependencies

### Minor

-   New class, module, component
-   New prop for a class or component
-   Additional type accepted for a prop
-   Optional args added to a method signature
-   Deprecation of a class, component, prop, function, or mixin (ahead of its removal in the next major version)

### Patch

-   Changes that do not impact public APIs
-   Non-breaking changes to minimum version of dependencies

## Branch organization

We do our best to keep `main` releasable at all times, with work for major releases happening in separate branches. [Breaking changes](#major) should never be merged directly to `main`. Otherwise, if you send a pull request please do it against the `develop` branch. Continue reading for more about pull requests and breaking changes.

## Bugs

### Where to find known issues

We track all of our issues in GitHub and [bugs](https://github.com/openendurance/core/labels/bug) are labeled accordingly. If you are planning to work on an issue, avoid ones which already have an assignee or where someone has commented within the last two weeks they are working on it. We will do our best to communicate when an issue is being worked on internally.

### Reporting new issues

To reduce duplicates, look through open issues before filing one. When [opening an issue](https://github.com/openendurance/core/issues/new?template=ISSUE.md), complete as much of the template as possible. The best way to get your bug fixed is to provide a reduced test case.

## Feature requests

Before requesting a feature, search the [existing feature requests](https://github.com/openendurance/core/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22feature+request%22+sort%3Areactions-%2B1-desc). You can [👍 upvote](https://help.github.com/articles/about-conversations-on-github/) feature requests to help the OEI team set priorities. If a feature request is closed, you can still upvote! A closed feature request means it's not something we're currently working on, but we take all your input into account when planning what to work on next.

Otherwise, [request a feature](https://github.com/openendurance/core/issues/new?template=FEATURE_REQUEST.md).

## Proposing a change

If you intend to build new functionality, add a significant amount of code, change a public API, or any other non-trivial changes, [we recommend filing an issue](https://github.com/openendurance/core/issues/new?template=FEATURE_REQUEST.md). This lets us all discuss and reach an agreement on the proposal before you put in significant time and effort.

If you're only fixing a bug, it's okay to submit a pull request right away but we still recommend you file an issue detailing what you're fixing. This is helpful in case we don't accept that specific fix but want to keep track of the issue.

## Your first pull request

Working on your first pull request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get familiar with our contribution process, we have a list of [good first issues](https://github.com/openendurance/core/labels/good%20first%20issue) that contain bugs with limited scope. This is a great place to get started.

If you decide to fix an issue, please check the comment thread in case somebody is already working on a fix. If nobody is working on it, leave a comment stating that you intend to work on it.

If somebody claims an issue but doesn't follow up for more than two weeks, it's fine to take it over but still leave a comment stating that you intend to work on it.

## Sending a pull request

Someone will review your pull request and either merge it, request changes to it, or close it with an explanation. We'll do our best to provide updates and feedback throughout the process.

_Before_ submitting a pull request, please:

1. Fork the repository and create your branch from `develop`
2. Run `pnpm install` in the repository root
3. If you've fixed a bug or added code, make sure to add tests
4. Ensure the test suite passes with `pnpm test` (protip: `pnpm test:watch <test-name>` is helpful in development)
5. Format your code with `pnpm format`
6. Make sure your code lints with `pnpm lint`
7. Run the TypeScript compiler with `pnpm type-check`
8. Create a changeset by running `pnpm changeset`. [More info](#adding-a-changeset).

## Changelog

The changelog is created with [Changesets](https://github.com/changesets/changesets).

## Adding a changeset

A changeset describes changes made in a branch or commit. It holds three bits of information:

-   What packages we need to release
-   What version we are releasing packages
-   A changelog entry for the released packages

Add a changeset if you have made any changes that will require a package version bump and release:

1. Run `pnpm changeset`.
2. Select the packages you want to include using ↑ and ↓ to navigate to packages, and space to select a package. Hit enter when all desired packages are selected.
3. Select a [bump type](#semantic-versioning) for each selected package.
4. Provide a message to be written into the changelog on the next release.

### Writing a changelog message

Keep the following in mind when authoring your changelog entry (final prompt after running `pnpm changeset`):

-   Use a positive, conversational tone (for example, use "support" over "allow" and other authoritative verbs)
-   Avoid redundancy when possible (try to phrase a bug fix entry without the word "bug")
-   Use sentence case
-   Use plain language

### Out of scope for the changelog

Generally, changes related to these topics can be omitted:

-   Dev dependencies upgrades
-   Chores (infrastructure, release process tweaks, minor documentation fixes like spelling errors)

## Development workflow

See the [README.md](README.md#commands) file for documentation on the development workflow.

### Testing

We recommend running tests as well as trying your build of a package in a real project, to make sure you don't introduce any regressions as you work on your change.

-   `pnpm test` will run tests for all packages
-   `pnpm turbo run test --filter="[HEAD^1]"` will test any package that has changed in the last commit

## Code style

We use an automatic code formatter called [Prettier](https://prettier.io/). Run `pnpm format` after making any changes to the code.

Linting will catch common issues that may exist in your code. You can check the status of your code styling by running `pnpm lint`.

Our code editor of choice is [VS Code](https://code.visualstudio.com/) which has [integrations with Prettier](https://github.com/prettier/prettier-vscode) and our linting tools which make this automatic. If you choose to use VS Code, these integrations will be listed as recommended extensions (or search for @recommended) in the extensions panel.

## Breaking changes

If your pull request contains breaking changes, please target the `develop` branch for the next major release. Also, open a pull request against `main` that introduces the deprecation warnings and upgrade path.

If you are unsure if the changes are considered breaking or not, open your pull request against the `main` branch and let us know. We understand it can be uncomfortable asking for help and this is why we have a code of conduct to ensure the community is positive, encouraging, and helpful.
