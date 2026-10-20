# GitHub Copilot Instructions

## What this repo is

Shared foundational TypeScript libraries for Open Endurance Initiative (OEI)
products and platform services.

This repository is a pnpm + Turborepo monorepo with publishable npm packages
that serve as platform-layer building blocks (domain primitives, shared types,
and validation contracts). It is not a single deployable application.

**This repo has high blast radius relative to its size.** Changes to shared
packages can affect multiple OEI product repositories when dependency ranges
are updated.

## Package layout

| Package                          | Purpose                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| `@openendurance/core`            | Core domain primitives and shared types used across products. |
| `@openendurance/core-validation` | Validation package surface.                                   |

Package source lives under `packages/<name>/src`.

Package build output lives under `packages/<name>/dist` and is generated.
Do not treat `dist` as source of truth.

## Documentation

The `docs/` tree is the durable knowledge base for this repository.

- `docs/README.md` explains documentation conventions
- `docs/TOC.md` is the canonical docs index
- `docs/adr/` stores immutable architecture decisions
- `docs/arch/` stores current-state architecture documentation
- `docs/ops/` stores operational runbooks and procedures
- `docs/generated/` is for generated artifacts only
- `docs/registry/` stores continuously maintained tracking registries
- `docs/wiki/` stores living notes and working references

## Branching and commits

- GitHub Flow: feature branches -> PR into `develop` -> `develop` -> `main`.
- Breaking changes never land directly on `main`.
- Every commit requires both a DCO sign-off and a cryptographic signature.
- If generating commits on someone's behalf, check signing config first:
  `git config --get commit.gpgsign`.

## Tooling

- Package manager: `pnpm` only (`preinstall` enforces this).
- Monorepo task orchestration: `turbo`.
- Primary language: TypeScript.
- Linting and formatting are intentionally split by file type:
    - JS/TS/JSON/JSONC: Biome
    - Markdown/YAML: Prettier

Use repo scripts where possible:

- `pnpm lint`
- `pnpm build`
- `pnpm typecheck`
- `pnpm test`

CI lives in `.github/workflows/ci.yml` and should remain focused on repository
health checks (lint, build, typecheck, test), not deployment orchestration.

## Releases

- Changesets controls versioning and changelogs.
- Publishable packages should use npm provenance
  (`publishConfig.provenance: true`) at the package level.
- Treat changes to package names, exports, publish metadata, and release
  workflow behavior as sensitive.

## Editorial posture

- Prefer small, targeted edits over broad rewrites.
- Keep docs synchronized with package reality.
- If a change affects package behavior, exports, release flow, or ownership,
  update docs and registries in the same work item.

## This is a public OSS repository

Apache-2.0 licensed. Contribution process, code of conduct, and security
reporting are managed at the OEI organization level and should not be
needlessly duplicated per repository.
