---
agent: edit
description: Review a PR or change set for missing required TSDoc coverage and TSDoc validity on exported TypeScript declarations.
model: GPT-5.4 mini (copilot)
name: oei-code-review-docs-check
---

# Documentation Coverage and TSDoc Validity Review (PR)

Use this prompt to run a deterministic, read-only documentation quality review
for a pull request or change set.

## Goal

Identify:

- missing required TSDoc coverage for externally consumable exports
- invalid or non-compliant TSDoc patterns on documented exports

## Backing Skill

Primary workflow and scoring semantics are defined by:

- `.github/skills/code-review-docs-check/SKILL.md`

Follow that skill exactly for exclusions, severity mapping, and output shape.

## Required Inputs

- Review scope:
    - PR number or URL, or
    - explicit changed file scope, or
    - package/folder scope

Optional:

- changed-files-only mode
- include-tests mode (default false; usually keep disabled)
- explicit include/exclude globs

If review scope is missing, stop and ask for scope before final scoring.

## Required Dynamic Context (read fresh each run)

1. Governance and package boundaries:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/agents/playbooks/AGENTS.md`
- nearest impacted package `AGENTS.md`
- `docs/ops/standards-coding.md`
- `docs/ops/standards-tsdoc.md`

2. Change surface:

- PR changed files and relevant diffs
- affected exported declarations in included source files

## Execution Steps

1. Build declaration scope map (Required/Exempt/Out-of-Scope).
2. Check required documentation coverage for in-scope exports.
3. Validate TSDoc structure and baseline tag requirements.
4. Assign severity and compile findings with evidence.
5. Produce findings-first report with documentation coverage matrix.

## Output Shape

Return sections in this order:

1. `Findings` (High -> Medium -> Low)
2. `Documentation Coverage Matrix`
3. `Open Questions / Assumptions`
4. `Suggested Next Step` (exactly one: Proceed, Revise and re-review, Clarify scope then re-review)

## Guardrails

- Read-only check only; do not remediate.
- Do not generate files as output.
- Console/chat output only.
- Exclude tests, generated output, and trivial barrel-only re-exports per standards.
- Every non-exempt finding must include file+line evidence.

## Quick Invocation Examples

- `Review PR #123 with code-review-docs-check.`
- `Run docs check on changed files in this branch.`
- `Run code-review-docs-check on packages/core/src.`
