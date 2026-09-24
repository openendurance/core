---
name: code-review-privacy-check
description: >
    Scans a pull request, change set, or repository scope for likely hardcoded sensitive data (PII/PHI/credentials) and potential exposure sinks such as logging, telemetry, analytics, exception payloads, and outbound integrations. Produces a deterministic findings-first report and tabular callsite inventory with confidence, severity, and short remediation guidance.
user-invocable: true
disable-model-invocation: false
metadata:
    author: oei
    version: "1.0"
---

## Purpose

Detect likely privacy and data-handling risks in source code by combining:

- sensitive data signal detection
- sink exposure detection
- confidence and severity scoring

This skill informs human reviewers. It does not auto-remediate code.

## Trigger Conditions

Use this skill when the operator asks to:

- review for PII or PHI leakage
- inventory risky logging or telemetry payloads
- check for hardcoded sensitive values
- perform a privacy-focused pre-merge scan

## Inputs

Required:

- Review scope:
    - active PR, changed files, package path, or explicit file globs

Optional:

- changed-files-only mode (base default: repository default branch, currently `main`)
- include-tests mode (default: false)
- output mode (`chat` or `file`)
- output path override for file mode

If review scope is missing, request scope before scoring.

## Repository Context To Load

Load governance and standards context before analysis:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.github/agents/playbooks/AGENTS.md`
- nearest local `AGENTS.md` for impacted packages
- `docs/ops/standards-coding.md`
- `docs/ops/standards-testing.md`
- `docs/ops/standards-observability.md`

Load taxonomy and rubric rules from:

- `.github/skills/code-review-privacy-check/assets/rubric-taxonomy.md`

## Scan Boundaries

Include by default:

- `.ts`, `.tsx`, `.mts`, `.cts`, `.js`, `.jsx`, `.mjs`, `.cjs`, `.cs`, `.json`, `.jsonc`, `.yaml`, `.yml`
- `.env`, `.env.*`, `.pem`, `.key`, `.pfx`, `.crt`, `.cer`

Exclude by default:

- `node_modules`, `dist`, `coverage`, `.turbo`, `external`, `bin`, `obj`
- generated files
- tests:
    - `**/tests/**`, `**/test/**`, `*.test.*`, `*.spec.*`, `*.Tests.cs`, `*.Test.cs`

Secret-bearing file handling:

- Treat `.env` and `.env.*` as first-class scan targets for hardcoded credentials and sensitive literals.
- Treat `.pem`, `.key`, `.crt`, and `.cer` as text-like targets when readable and parseable as text.
- Treat `.pfx` as potentially binary: when content is not text-readable, create a file-level finding from path/name/context and nearby code references instead of attempting content parsing.
- If the file appears intentionally sample-only or placeholder-only, downgrade confidence unless sink or runtime usage evidence exists.

## Detection Method

### 1) Build Candidate Set

Identify candidate callsites and literals using:

- sensitive key patterns (`email`, `phone`, `address`, `ssn`, `patientId`, `diagnosis`, `token`, etc.)
- hardcoded literal patterns (email/phone-like strings, obvious secrets)
- secret-bearing file indicators (for example key/cert file names, private key markers, env var assignments containing likely secrets)
- sink APIs and wrappers for:
    - logs
    - traces/metrics
    - analytics/event tracking
    - exception and error payload emission
    - outbound request payloads

### 2) Classify And Score

For each candidate, assign:

- `Data Type` using taxonomy categories
- `Sink Type`
- `Pattern Class`
- confidence score and level from rubric
- severity from severity mapping

### 3) Reduce Noise

- merge duplicates by fingerprint
- downgrade weak keyword-only hits
- keep low-confidence uncertain findings in final table, but separate from actionable findings

### 4) Map Short Remediation

Attach one short remediation action from rubric catalog.

## Output Format

Return sections in this order:

1. `Findings` (High -> Medium -> Low severity)
2. `Privacy Callsite Inventory`
3. `Open Questions / Assumptions`
4. `Suggested Next Step` (exactly one: Proceed, Revise and re-review, Clarify scope then re-review)

### Findings

Include actionable findings first. For each finding include:

- Finding ID
- Severity
- Data type and sink
- Why this matters
- Evidence links (file + line)
- Recommended minimal remediation

If no actionable findings exist, state that explicitly.

### Privacy Callsite Inventory

Provide a markdown table with columns:

- `Callsite`
- `Location`
- `Data Type`
- `Sink Type`
- `Pattern Class`
- `Confidence`
- `Severity`
- `Evidence`
- `Recommended Remediation`

Optional columns when useful:

- `Confidence Score`
- `Redaction Guard Present`

## Guardrails

- Evidence is required for every finding.
- Do not claim PHI unless PHI gate criteria are satisfied in rubric.
- Distinguish confidence from severity.
- Do not fail on style-only issues.
- Prefer precision over recall if evidence is ambiguous.

## Optional File Output Mode

If operator requests output mode `file`:

- write table and summary to:
    - `docs/generated/privacy-review/code-review-privacy-check-<YYYYMMDD-HHMMSS>.md`
    - or operator-provided output path override
- also post a brief summary in chat with output file path

## Quick Invocation Examples

- `Run code-review-privacy-check on PR #123.`
- `Scan changed files in this branch for PII/PHI and exposure sinks.`
- `Run privacy check on packages/azure-lib and output to file mode.`
