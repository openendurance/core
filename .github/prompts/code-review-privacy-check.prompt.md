---
agent: edit
description: Review a PR or change set for likely hardcoded PII/PHI/credentials and risky exposure sinks, with findings-first privacy output.
model: GPT-5.4 mini (copilot)
name: oei-code-review-privacy-check
---

# Privacy Exposure Review (PR)

Use this prompt to run a deterministic privacy-focused review for a pull request or change set.

## Goal

Identify likely hardcoded sensitive data and risky exposure callsites (logs, telemetry, analytics, exception payloads, outbound payloads), then report evidence with confidence, severity, and concise remediation.

## Backing Skill

Primary workflow and scoring semantics are defined by:

- `.github/skills/code-review-privacy-check/SKILL.md`
- `.github/skills/code-review-privacy-check/assets/rubric-taxonomy.md`

Follow those files exactly for taxonomy, confidence, PHI gate, and severity mapping.

## Required Inputs

- Review scope:
    - PR number or URL, or
    - explicit changed file scope, or
    - package/folder scope

Optional:

- changed-files-only mode
- include-tests mode (default false)
- output mode (`chat` or `file`)
- output path override when in file mode

If review scope is missing, stop and ask for scope before final scoring.

## Required Dynamic Context (read fresh each run)

1. Governance and package boundaries:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/agents/playbooks/AGENTS.md`
- nearest impacted package `AGENTS.md`
- `docs/ops/standards-coding.md`
- `docs/ops/standards-testing.md`
- `docs/ops/standards-observability.md`

2. Change surface:

- PR changed files and relevant diffs
- touched tests when include-tests mode is true
- likely sink wrapper and helper files near changed callsites

3. Rubric and taxonomy:

- `.github/skills/code-review-privacy-check/assets/rubric-taxonomy.md`

## Execution Steps

1. Build candidate set for sensitive literals and exposure sinks.
2. Classify each candidate using privacy taxonomy.
3. Score confidence and assign severity.
4. De-duplicate and separate actionable findings from low-confidence noise.
5. Produce findings-first report and callsite inventory table.

## Output Shape

Return sections in this order:

1. `Findings` (High -> Medium -> Low)
2. `Privacy Callsite Inventory`
3. `Open Questions / Assumptions`
4. `Suggested Next Step` (exactly one: Proceed, Revise and re-review, Clarify scope then re-review)

## Required Inventory Table Columns

- `Callsite`
- `Location`
- `Data Type`
- `Sink Type`
- `Pattern Class`
- `Confidence`
- `Severity`
- `Evidence`
- `Recommended Remediation`

## Guardrails

- Evidence required for every claim.
- Do not label findings as PHI unless PHI gate is satisfied.
- Keep confidence and severity separate.
- Favor precise, reviewable findings over broad speculative matches.

## Quick Invocation Examples

- `Review PR #321 with code-review-privacy-check.`
- `Run privacy review against changed files in this branch.`
- `Scan packages/core and packages/azure-lib for privacy exposures and output a table.`
