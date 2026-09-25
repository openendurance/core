---
name: code-review-docs-check
description: >
    Reviews a pull request or change set for missing required TSDoc coverage on exported/public TypeScript declarations and validates existing docs for TSDoc compliance. Read-only check only; no remediation.
user-invocable: true
disable-model-invocation: false
metadata:
    author: oei
    version: "1.0"
---

## Purpose

Run a deterministic, evidence-based documentation quality review for TypeScript
exports by combining:

- required coverage checks for externally consumable exports
- TSDoc validity checks for existing comments
- repository policy enforcement from coding and TSDoc standards

This skill informs human reviewers. It does not remediate code.

## Trigger Conditions

Use this skill when the operator asks to:

- review missing docs for exported code
- validate TSDoc quality in a PR or branch
- run a documentation-readiness check before enabling stricter lint/CI gates
- assess API/SDK documentation posture for changed code

## Inputs

Required:

- Review scope:
    - active PR, changed files, package/folder scope, or explicit file paths

Optional:

- changed-files-only mode (recommended for PR reviews)
- include-tests mode (default: false)
- explicit include/exclude globs

If review scope is missing, request scope before scoring.

## Repository Context To Load

Load governance and standards context before analysis:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/agents/playbooks/AGENTS.md`
- nearest local `AGENTS.md` for impacted packages
- `docs/ops/standards-coding.md`
- `docs/ops/standards-tsdoc.md`

## Scan Boundaries

Include by default:

- TypeScript source files under `apps/**/src/**` and `packages/**/src/**`
- `.ts`, `.tsx`, `.mts`, `.cts`

Exclude by default:

- test paths and files:
    - `**/__tests__/**`, `**/tests/**`, `**/test/**`, `*.test.*`, `*.spec.*`
- generated/build/third-party output:
    - `node_modules`, `dist`, `coverage`, `.turbo`, `external`, `bin`, `obj`
- declaration output:
    - `*.d.ts`
- barrel-only files:
    - `**/index.ts`
    - any file where all exports are pure forwarding re-exports (`export *` or `export { ... } from`) and no local exported declaration exists

## Review Method

### 1) Build Documentation Scope Map

Identify exported declarations in included TypeScript source and classify as:

- in-scope (externally consumable exported declarations that require TSDoc)
- exempt (trivial re-exports and barrel-only forwarding files)
- out-of-scope (excluded/test/generated)

### 2) Coverage Check

For each in-scope exported declaration, verify presence of a nearby TSDoc block.

Record missing-coverage findings when required documentation is absent.

### 3) TSDoc Validity Check

For each found TSDoc block on in-scope declarations, verify:

- comment parses as valid TSDoc (or closest deterministic equivalent available)
- no JSDoc-style type duplication (for example `@param {string}`)
- required baseline fields from standards when applicable:
    - summary sentence
    - `@param` for non-trivial parameters
    - `@returns` for non-`void` functions/methods
    - `@deprecated` replacement guidance when deprecated

### 4) Severity Mapping

- High:
    - missing required docs on externally consumable exported declarations
    - structurally invalid TSDoc that prevents reliable interpretation
- Medium:
    - partial required-tag coverage on documented in-scope exports
- Low:
    - quality improvements (clarity/examples/remarks) when baseline is met

### 5) Produce Read-Only Findings

Provide findings with evidence and minimal remediation guidance.

Do not modify files. Do not generate remediation patches.

## Output Format

Return sections in this order:

1. `Findings` (High -> Medium -> Low)
2. `Documentation Coverage Matrix`
3. `Open Questions / Assumptions`
4. `Suggested Next Step` (exactly one: Proceed, Revise and re-review, Clarify scope then re-review)

### Findings

Include actionable findings first. For each finding include:

- Finding ID
- Severity
- Rule violated
- Why this matters
- Evidence links (file + line)
- Recommended minimal remediation

If no actionable findings exist, state that explicitly.

### Documentation Coverage Matrix

Provide a markdown table with columns:

- `Declaration`
- `Location`
- `Scope` (`Required`, `Exempt`, `Out-of-Scope`)
- `TSDoc Present`
- `TSDoc Valid`
- `Required Tags Status`
- `Severity`
- `Evidence`

## Guardrails

- Read-only analysis only.
- Do not produce code edits, patches, or output files.
- Evidence is required for every non-exempt finding.
- Respect barrel and trivial re-export exclusions from standards.
- Do not treat excluded tests/generated files as findings.

## Output Mode

- Output MUST be chat/console only.
- File output mode is not supported in v1.

## Quick Invocation Examples

- `Run code-review-docs-check on PR #123.`
- `Check changed files in this branch for missing required TSDoc.`
- `Run docs check on packages/core/src and packages/api-rest/src.`
