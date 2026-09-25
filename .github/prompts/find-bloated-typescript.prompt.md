---
agent: agent
description: Identify oversized TypeScript files and propose pragmatic split plans aligned to repo standards.
model: GPT-5.4 mini (copilot)
name: find-bloated-typescript
---

# Find Bloated TypeScript Files

Use this prompt to detect TypeScript files that exceed project size standards and produce a practical cleanup plan.

## Goal

Find TypeScript files that are above line-count thresholds, rank them by severity, and suggest actionable refactor seams.

## Required Dynamic Context (read fresh each run)

1. Standards and boundaries:

- docs/ops/standards-coding.md
- AGENTS.md
- nearest package AGENTS.md for discovered hotspots

2. Repository structure and package context:

- docs/TOC.md
- package-level folders under packages/

3. Current scope input from the operator (if provided):

- package filter (for example: core, azure-lib, api-rest)
- file globs to include or exclude
- changed-files-only mode

## Threshold Rules

Use thresholds from docs/ops/standards-coding.md if present.

If they are missing or ambiguous, use these defaults:

- warning threshold: more than 250 lines (excluding blank lines and comment-only lines)
- violation threshold: more than 350 lines (excluding blank lines and comment-only lines)

## Scan Rules

- Scan TypeScript source files only: .ts, .tsx, .mts, .cts.
- Exclude generated output and vendor folders: dist, coverage, node_modules, external.
- Exclude tests by default: **tests**, _.test._, _.spec._.
- Report effective line count using the same counting rules as thresholds.

## Modes

### Scan Mode (default)

Use when the operator asks to find bloated files.

Return:

1. Summary counts

- total scanned files
- warning-level files
- violation-level files

2. Top offenders table (highest line count first)

- file path
- package
- effective line count
- severity (warning or violation)
- quick rationale (what makes this file likely to be hard to maintain)

3. Backlog-ready suggestions

- 3 to 10 candidate cleanup tasks
- each task should target one file or a small cohesive cluster

### Plan Mode

Use when the operator asks for how to split or refactor.

Return:

1. Refactor seam analysis for top files

- likely extraction boundaries
- safest first extraction step
- expected risk level

2. Minimal sequence

- step-by-step split plan with small, reversible increments

3. Validation plan

- exact commands to run after each increment

## Output Shape

Provide output in this order:

1. Scope used for scan
2. Summary metrics
3. Top offenders
4. Suggested cleanup backlog
5. Optional focused refactor plan (if requested)

## Guardrails

- Prefer semantic split recommendations over arbitrary file chopping.
- Respect package boundaries and ownership rules.
- Do not propose behavior-changing refactors unless explicitly requested.
- Keep recommendations practical for small PRs.

## Optional Follow-Up Mode

If the operator asks to apply the plan:

- pick one offender
- propose a minimal patch plan
- list validation commands
- identify likely regression risks and required tests
