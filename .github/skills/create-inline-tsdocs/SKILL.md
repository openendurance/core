---
name: create-inline-tsdocs
description: Author and update TSDoc comments for exported/public TypeScript declarations in a file, directory, or namespace scope using repository documentation standards.
user-invocable: true
disable-model-invocation: false
metadata:
    author: oei
    version: "1.0"
---

## Purpose

Create or update TSDoc comments for TypeScript declarations that require
documentation under repository standards.

Use this skill to improve documentation coverage and quality for exported/public
TypeScript API surface in a focused scope.

## Trigger Conditions

Use this skill when the operator asks to:

- author TSDoc for a file, directory, or namespace
- create inline TSDoc for a file, directory, or namespace
- add missing docs for exported declarations
- normalize existing comments to TSDoc style
- improve API/SDK documentation quality for changed code

This skill should also be used during code generation when new exported
TypeScript declarations are introduced and required documentation is missing.

## Inputs

Required:

- Target scope:
    - one file path, or
    - one directory path, or
    - an explicit namespace/module path

Optional:

- changed-files-only mode
- include-tests mode (default: false)
- explicit include/exclude globs

If target scope is missing or ambiguous, stop and ask for clarification.

## Repository Context To Load

Load governance context before authoring:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/agents/playbooks/AGENTS.md`
- nearest local `AGENTS.md` for impacted package scope
- `docs/ops/standards-coding.md`
- `docs/ops/standards-tsdoc.md`

## Authoring Boundaries

Include by default:

- TypeScript source files under `apps/**/src/**` and `packages/**/src/**`
- `.ts`, `.tsx`, `.mts`, `.cts`

Exclude by default:

- test files and test paths:
    - `**/__tests__/**`, `**/tests/**`, `**/test/**`, `*.test.*`, `*.spec.*`
- generated/build/third-party output:
    - `node_modules`, `dist`, `coverage`, `.turbo`, `external`, `bin`, `obj`
- declaration output:
    - `*.d.ts`
- trivial re-export files:
    - `**/index.ts`
    - files that only contain forwarding re-exports (`export *` or `export { ... } from`) and no local exported declarations

## Authoring Rules

For each in-scope declaration that requires documentation:

- add or update one TSDoc block directly above the declaration
- ensure a one-line summary sentence exists
- add `@param` for non-trivial parameters on exported functions/methods
- add `@returns` for non-`void` functions/methods
- include `@remarks` only when behavior, constraints, or side effects are
  non-obvious
- include `@deprecated` with migration/replacement guidance when deprecated

Do not:

- add JSDoc-style type duplication (`@param {string}`)
- invent business behavior not present in code
- rewrite implementation logic to fit docs
- produce broad, boilerplate comments that restate names without intent

## Editing Strategy

1. Build a declaration scope map (`Required`, `Exempt`, `Out-of-Scope`).
2. Author only missing or non-compliant docs for `Required` declarations.
3. Preserve existing high-quality docs unless correction is needed.
4. Keep edits minimal and local to documentation comments.

If the requested scope is large, proceed in deterministic batches and report
what was completed.

## Validation

After authoring, run applicable lint/typecheck commands for the impacted scope
when available.

If linting for TSDoc is not configured yet, still ensure generated comments are
standards-compliant by structural review.

## Output

Return:

1. `Scope Processed`
2. `Documentation Changes`
3. `Skipped/Exempt Items`
4. `Assumptions And Open Questions`
5. `Validation`

## Guardrails

- Respect package ownership boundaries.
- Do not author docs for excluded tests/generated/barrel-only re-exports by
  default.
- Keep comment language concise, specific, and domain-intent oriented.
- Do not create report files unless explicitly requested.
