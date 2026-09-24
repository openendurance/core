# OEI Core

Shared foundational libraries for the [Open Endurance Initiative](https://github.com/openendurance) platform.
<br /><br />
![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)&nbsp;
![Status](https://img.shields.io/badge/status-early%20%2F%20pre--release-orange.svg)
<br /><br />
[![Release](https://github.com/openendurance/fkt/actions/workflows/release.yml/badge.svg)](https://github.com/openendurance/fkt/actions/workflows/release.yml)&nbsp;
[![Build & Test](https://github.com/openendurance/fkt/actions/workflows/build.yml/badge.svg)](https://github.com/openendurance/fkt/actions/workflows/build.yml)&nbsp;
[![CodeQL](https://github.com/openendurance/fkt/actions/workflows/codeql.yml/badge.svg)](https://github.com/openendurance/fkt/actions/workflows/codeql-analysis.yml)&nbsp;
[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B33512%2Fgithub.com%2Fopenendurance%2Ffkt.svg?type=small)](https://app.fossa.com/projects/custom%2B33512%2Fgithub.com%2Fopenendurance%2Ffkt?ref=badge_small)

## Status

Early / pre-release. APIs will change without notice until version `1.0` is shipped. Not yet recommended as a dependency outside the OEI product line.

## What's Here

OEI Core is a monorepo of independently publishable npm packages. It contains the shared substrate that OEI products build on, not product-specific logic.

<!-- TODO: fill in as packages are extracted from the GRF codebase -->

| Package | Description |
|---|---|
| [`@openendurance/core`](packages/core) |  Domain models and other common utilities. |
| [`@openendurance/core-validation`](packages/core-validation) | Validation logic. |

## Repository Layout

| Path | Purpose |
|---|---|
| [`packages/`](packages) | Independently publishable npm packages — the actual platform-layer code. |
| [`apps/`](apps) | Deployable applications built on the packages in this repo. |
| [`docs/`](docs) | Project knowledge base. |
| [`docs/adr/`](docs/adr) | Architecture decision records. |
| [`docs/arch/`](docs/arch) | Architecture and system-design documentation. |
| [`docs/ops/`](docs/ops) | Operational standards and procedures. |
| [`docs/registry/`](docs/registry) | Reference registries (schemas, service catalogs, etc.). |
| [`docs/generated/`](docs/generated) | Generated documentation artifacts — do not hand-edit. |
| [`fixtures/`](fixtures) | Shared test fixtures used across packages. |
| [`scripts/`](scripts) | Repo-level tooling and automation scripts. |
| [`.devcontainer/`](.devcontainer) | Devcontainer definition for a consistent local/cloud dev environment. |
| [`.github/`](.github) | CI/CD workflows and repository automation. |

## Why this Exists

The Open Endurance Initiative is a commercial open-source (COSS) organization building open infrastructure for endurance sports. OEI is structured as two layers:

- **Platform layer** — shared, open infrastructure (this repo, plus deployment/infra definitions) that any product — OEI's own, or a third party's — can build on.
- **Product layer** — individual applications (Group Run Finder, and others on the roadmap) built on top of the platform layer, most following an open-core model.

OEI Core is platform-layer: it exists so that both OEI's own products and independent builders in the endurance space can share a common, well-maintained foundation instead of each reinventing domain models and validation logic from scratch. Keeping this layer genuinely open — not just "open until it's inconvenient" — is a deliberate choice, not an afterthought: open, portable infrastructure is what OEI is trying to build in a space that's otherwise becoming siloed and vendor-locked.

## Using These Packages

```bash
npm install @openendurance/<package-name>
```

<!-- TODO: add real usage example once the first package is published -->

## Relationship to Other OEI Repos

- [`openendurance-infra`](https://github.com/openendurance/openendurance-infra) — Docker/Compose definitions for shared OEI infrastructure.
- [`openendurance-infra-aws`](https://github.com/openendurance/openendurance-infra-aws) — AWS provisioning for the org-global shared platform services.
- [`grouprunfinder`](https://github.com/openendurance/grouprunfinder) — the first product built on this platform; depends on packages published from this repo.

## Development

This is a [pnpm](https://pnpm.io/) + [Turborepo](https://turborepo.org/) monorepo, with [Changesets](https://github.com/changesets/changesets) for versioning and changelogs.

```bash
pnpm install
pnpm build
pnpm test
```

Requires Node.js 24 or later (see `.nvmrc`).

## Contributing

Contributions are welcome. We don't require a CLA — instead, please sign off your commits per the [Developer Certificate of Origin](https://developercertificate.org/) (`git commit -s`), which certifies you have the right to submit the contribution under this repo's license.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose changes, our branching model, and the release process. Please also read our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

Licensed under the [Apache License, Version 2.0](./LICENSE).

```
SPDX-License-Identifier: Apache-2.0
```

[![FOSSA Status](https://app.fossa.com/api/projects/custom%2B33512%2Fgithub.com%2Fopenendurance%2Ffkt.svg?type=small)](https://app.fossa.com/projects/custom%2B33512%2Fgithub.com%2Fopenendurance%2Ffkt?ref=badge_small)

---

<div align="center">
	Made with ⛰️💙 in Colorado USA
</div>
<br />
<div align="center">
	Copyright © 2026 <a href="https://algorythmic.com">Algorythmic, LLC</a>
</div>

Copyright © 2026 Algorythmic
