# Core Publish Readiness Registry

Tracks publish-readiness work required to bring OEI Core to the same baseline used by `config-dev` and `config-ort`.

## Scope

- Repository: `core`
- Baseline references: `config-dev`, `config-ort`
- Initial source: user-provided checklist on 2026-10-20

## Status Legend

- `Not Audited`: listed but not yet verified in-repo
- `Needs Work`: verified and currently incomplete or incorrect
- `Looks Complete`: verified and appears complete (spot-check only)
- `Blocked`: cannot verify without external context or permissions

## Workstream Tracker

| ID     | Workstream             | Requested Check                                                        | Status     | Evidence                                                                                                                                                 | Notes                                                                                   |
| ------ | ---------------------- | ---------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| CR-001 | Governance docs        | AGENTS.md completion                                                   | Needs Work | `AGENTS.md` contains only placeholder text.                                                                                                              | Replace with full repository guidance aligned to current standards.                     |
| CR-002 | Linting                | Biome configuration correctness                                        | Needs Work | `biome.json` lacks canonical excludes for build artifacts (`dist`, `coverage`, `*.tsbuildinfo`).                                                         | Align file-scoping and ignore behavior with `config-dev` baseline.                      |
| CR-003 | TypeScript             | Root tsconfig correctness and npm-based shared config usage            | Needs Work | `tsconfig.json` is fully local and does not extend `@openendurance/config-typescript/*`.                                                                 | Refactor to extend published npm preset and keep only local overrides.                  |
| CR-004 | Formatting             | Prettier and Jest shared config usage from npm packages                | Needs Work | No `.prettierrc*` or `prettier.config.*`; no `jest.config.*`; no `@openendurance/config-prettier` / `@openendurance/config-jest` usage.                  | Add shared-config consumption and package dependencies where required.                  |
| CR-005 | Lint workflow          | Split scanning between Biome and Prettier                              | Needs Work | Split exists (`lint:prettier` + Biome paths), but root lint wiring differs from `config-dev` canonical shape.                                            | Standardize root lint commands and keep markdown/yaml under Prettier checks.            |
| CR-006 | Packaging and release  | npm publishing setup, provenance, packaged `/dist`, workflows          | Needs Work | No `.github/workflows/ci.yml` or release workflow; `packages/core/package.json` is `private: true` and has no `publishConfig.provenance`.                | Add CI/release workflows, publishing metadata, and first-release bootstrap plan.        |
| CR-007 | Dependency maintenance | Renovate configuration quality spot-check                              | Needs Work | `renovate.json` is close, but includes stale package match (`@types/lodash`) not present in repo.                                                        | Prune stale rules and validate grouping/automerge intent against current deps.          |
| CR-008 | Task orchestration     | Turbo configuration spot-check at root and package levels              | Needs Work | Root `turbo.json` includes boundaries/tags not reflected in package tags; package tag is `core`.                                                         | Reconcile boundary taxonomy and task model to intended enforcement.                     |
| CR-009 | Package metadata       | package.json completeness per package and root                         | Needs Work | `packages/core-validation` has no `package.json`; `packages/core/package.json` is not publish-ready (`private`, `UNLICENSED`, missing publish settings). | Finalize publishable metadata for each package and align root/package responsibilities. |
| CR-010 | Documentation          | Root README and package README completeness                            | Needs Work | Root `README.md` includes incorrect badge/repo references (`openendurance/fkt`) and links to missing files; package READMEs are empty.                   | Correct root links/badges and add package-level install/usage documentation.            |
| CR-011 | Agent guidance         | Add `.github/copilot-instructions.md` synthesized from AGENTS guidance | Needs Work | `.github/copilot-instructions.md` is missing.                                                                                                            | Create concise instruction file derived from finalized AGENTS guidance.                 |
| CR-012 | Ownership model        | CODEOWNERS granularity using org groups                                | Needs Work | `CODEOWNERS` has only a single wildcard owner mapping.                                                                                                   | Replace with layered, path-specific ownership model similar to `config-dev`.            |

## Audit Log

| Date       | Change                                                                                       | Author  |
| ---------- | -------------------------------------------------------------------------------------------- | ------- |
| 2026-10-20 | Initialized registry from user-provided readiness list.                                      | Copilot |
| 2026-10-20 | Completed audit of listed checklist items; all items remain open and require follow-up work. | Copilot |
