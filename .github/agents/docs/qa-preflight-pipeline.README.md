# OEI QA Preflight Pipeline

Operator guide for the QA readiness preflight pipeline.

## What this does

Runs a multi-lane QA preflight against a GitHub PR (preferred) or branch fallback
and returns a concise go/no-go report for QA handoff.

This pipeline is read-only for the evaluated scope.

- outputs results in chat/console
- does not write report files
- does not modify repository files

## Scope precedence

The pipeline resolves scope in this order:

1. PR number
2. PR URL
3. branch fallback

For PR number/URL runs, the pipeline resolves GitHub PR metadata and uses:

- `source` = PR head ref
- `base` = PR target base ref

For branch fallback runs, source is resolved in this order:

1. explicit operator source branch/ref override
2. current checked-out branch
3. if source cannot be reliably determined, stop and provide explicit source branch/ref

For branch fallback runs, the change-map diff base is resolved in this order:

1. explicit operator base-branch override
2. `develop` (default integration/base branch)

If resolved `source` and `base` are identical, the pipeline fails closed:

- marks `Scope/Change-map` as `Incomplete`
- returns `No-Go`
- does not run downstream lanes

The report `## Scope` section includes the full resolved pair for reproducibility, including repository and immutable ref/SHA where applicable: `source=<owner/repo>@<ref-or-sha>, base=<owner/repo>@<ref-or-sha>`.

## Work item context

AB# context is discovered in this order:

1. PR description
2. operator prompt text
3. optional operator input

If context is missing, AC traceability is skipped and confidence is downgraded.
The pipeline still completes.

## Lanes run

- Regression/test-gap review
- Privacy review
- Documentation coverage and TSDoc validity review
- Standards/rubric compliance review
- Conditional bloated TypeScript signal (when TS files changed)
- Conditional AC traceability lane (only when WI/AC context exists)

Lanes are independent. A lane failure does not stop the full preflight.
The pipeline still returns a report, but if required QA handoff entry evidence
(section 5.1) is unavailable, the decision is No-Go. If a required lane is
incomplete, the decision is also No-Go.

Docs-check lane behavior in this pipeline version:

- lane execution is required
- lane findings are advisory-only for go/no-go
- docs-check findings are still reported in blockers/remediation output
- docs-check lane `Incomplete` status is blocking because required lanes must complete

The preflight requires a target QA environment and explicit evidence inputs
(operator-provided and/or CI links/artifacts) for each section 5.1 criterion;
the pipeline does not infer section 5.1 readiness from the code diff alone.

## Decision rule

- Any High or Critical finding from lanes other than docs-check -> No-Go
- Any required lane is Incomplete -> No-Go
- Missing required QA entry criteria evidence (section 5.1), including missing target environment or missing explicit criterion evidence -> No-Go
- Otherwise -> Go

The endpoint pattern compliance gate, when it runs, is not advisory: a `Blocker`
verdict maps to `Critical` and a `Major` verdict maps to `High`, so either forces
No-Go.

## Output shape

The report includes:

- Decision
- Confidence and downgrade reasons
- Scope
- Lane status
- Top blockers (capped)
- Remediation plan for Dev and QA
- Not-assessed areas
- Exactly one suggested next step

## Common prompts

- `Run OEI QA Preflight Pipeline for PR #123.`
- `Run OEI QA Preflight Pipeline for <PR URL>.`
- `Run OEI QA Preflight Pipeline for current branch fallback.`

If this custom agent is already selected in the Agent Selector, explicitly
mention that it is selected in your request so routing is unambiguous.

- `Use the selected custom agent OEI QA Preflight Pipeline for PR #123.`
