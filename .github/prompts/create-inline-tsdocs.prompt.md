---
agent: edit
description: Author or normalize TSDoc for exported/public TypeScript declarations in a file, directory, or namespace scope.
model: GPT-5.4 mini (copilot)
name: oei-create-inline-tsdocs
---

# Author TSDoc

Use this prompt to invoke the `create-inline-tsdocs` skill from a slash command.

## Goal

Create or update standards-compliant TSDoc comments for exported/public
TypeScript declarations in the requested scope.

## Backing Skill

Primary workflow, scope boundaries, and authoring rules are defined by:

- `.github/skills/create-inline-tsdocs/SKILL.md`

Follow that skill exactly for exclusions, minimal-edit behavior, and output
posture.

## Accepted Inputs

Provide one of:

- a file path
- a directory path
- a namespace/module scope path

Optional:

- changed-files-only mode
- include-tests mode (default false)
- explicit include/exclude globs

If the scope is missing or ambiguous, ask for clarification before editing.

## Required Dynamic Context (read fresh each run)

1. Governance and standards:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/agents/playbooks/AGENTS.md`
- nearest impacted package `AGENTS.md`
- `docs/ops/standards-coding.md`
- `docs/ops/standards-tsdoc.md`

2. Code surface:

- target files and local exports in requested scope
- existing nearby docs patterns in impacted package

## Execution Steps

1. Build declaration scope map (`Required`, `Exempt`, `Out-of-Scope`).
2. Author or normalize TSDoc for `Required` declarations only.
3. Preserve valid existing docs unless correction is necessary.
4. Keep changes minimal and comment-focused.
5. Validate changed scope with available lint/typecheck commands.

## Guardrails

- Exclude tests, generated output, declaration files, and trivial barrel-only
  re-exports by default.
- Do not add JSDoc-style type blocks in comments.
- Do not change implementation behavior while authoring docs.
- Do not generate external report files unless explicitly requested.

## Quick Invocation Examples

- `/create-inline-tsdocs packages/core/src/user/userService.ts`
- `/create-inline-tsdocs packages/api-rest/src/types/user`
- `/create-inline-tsdocs packages/azure-lib/src/services/chapter`
