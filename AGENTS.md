# AGENTS.md

## What this repo is

Shared foundational TypeScript libraries for Open Endurance Initiative (OEI)
products and platform services.

This repository is a pnpm + Turborepo monorepo that contains publishable npm
packages used as platform-layer building blocks (domain primitives, shared
types, and validation contracts). It is not a single deployable application.

This repo has high blast radius relative to its size. Changes to shared
packages can propagate into multiple OEI product repositories the next time
they update dependency ranges.

## Package layout

| Package                          | Purpose                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| `@openendurance/core`            | Core domain primitives and shared types used across products. |
| `@openendurance/core-validation` | Validation package surface.                                   |

Package source lives under `packages/<name>/src`.

Package build output lives under `packages/<name>/dist` and is generated.
Do not treat `dist` as source of truth.

## Documentation

The `docs/` tree is the durable project knowledge base.

- `docs/README.md` explains documentation conventions
- `docs/TOC.md` is the canonical documentation index
- `docs/adr/` stores immutable architecture decisions
- `docs/arch/` stores current-state architecture documentation
- `docs/ops/` stores operational runbooks and procedures
- `docs/generated/` is reserved for generated artifacts only
- `docs/registry/` stores continuously updated tracking registries
- `docs/wiki/` stores living notes and working references

## Branching and commits

- GitHub Flow: feature branches -> PR into `develop` -> `develop` -> `main`.
- Breaking changes do not land directly on `main`.
- Every commit requires both a DCO sign-off and a cryptographic signature.
- If generating commits on someone's behalf, verify signing config first:
  `git config --get commit.gpgsign`.

## Tooling

- Package manager: `pnpm` only (`preinstall` enforces this).
- Monorepo orchestration: `turbo`.
- Primary language: TypeScript.
- Formatting/linting is intentionally split by file type:
    - JS/TS/JSON/JSONC: Biome
    - Markdown/YAML: Prettier
- Typical repo health commands:
    - `pnpm lint`
    - `pnpm build`
    - `pnpm typecheck`
    - `pnpm test`

CI is defined in `.github/workflows/ci.yml` and is scoped to repository health
checks (lint, build, typecheck, test). Keep CI focused and avoid coupling it
to deployment steps.

## Releases

- Changesets controls versioning and changelogs.
- Package publishing should use npm provenance (`publishConfig.provenance: true`)
  at the package level for publishable packages.
- Changes to publishing metadata, release workflows, package names, exported
  entrypoints, or packaged file lists should be treated as sensitive.

## This is a public OSS repository

Apache-2.0 licensed. Contribution process, code of conduct, and security
reporting are owned at the OEI organization level rather than duplicated in
each repository.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
