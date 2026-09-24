---
name: adr-review
description: >
    Evaluates a proposed ADR against the project quality standard and produces
    structured feedback for the human reviewer. Does not approve or reject —
    surfaces gaps and confirms strengths so the reviewer can make an informed
    acceptance decision. Use before setting an ADR status to Accepted.
metadata:
    author: oei
    version: "1.0"
---

## Purpose

Evaluate a proposed ADR against the project quality standard and produce
structured review feedback. This skill informs the human reviewer — it does
not accept or reject ADRs. Status changes require human action.

## Assets

- `./assets/rubric.md` — evaluation criteria applied section by section
- `./assets/example.md` — reference implementation (ADR-0002); quality bar
  for depth, specificity, and tone

## Inputs

- The ADR file to review (required)
- The existing ADR log in `docs/adr/` (for cross-reference checks)

If no ADR file is specified, list the ADRs in `docs/adr/` with status
`Proposed` and ask the architect which one to review.

## Evaluation Process

Read the ADR in full before producing any output. Do not evaluate section
by section in isolation — some findings only become visible when the full
document is considered (e.g. a decision that is actually multiple decisions,
or consequences that contradict the context).

Apply the rubric in `./assets/rubric.md` to each section. For each finding:

- State the section it applies to
- State the finding clearly and specifically — do not use vague language
  like "could be improved"
- Where applicable, provide a concrete suggestion or example of what
  adequate would look like

Do not manufacture findings to appear thorough. If a section is adequate,
say so.

## Output Format

Produce a review report with the following structure:

---

# ADR Review: {ADR number and title}

## Summary

One short paragraph. State whether the ADR is ready for acceptance as-is,
ready with minor revisions, or requires substantive revision before
acceptance. Name the most significant finding if one exists.

## Section Findings

One subsection per ADR section. For each:

### {Section Name}

**Status:** Pass | Pass with notes | Needs revision

{Finding or confirmation. If Pass, one sentence confirming adequacy is
sufficient. If Needs revision, be specific about what is missing or weak
and what adequate looks like.}

## Blocking Issues

List any findings that should prevent acceptance until resolved. A blocking
issue is one where accepting the ADR as-is would result in:

- An incomplete historical record
- A decision that cannot be applied consistently by engineers or agents
- A consequence that is materially misrepresented

If there are no blocking issues, state that explicitly.

## Non-Blocking Notes

List findings that are worth addressing but do not block acceptance —
phrasing improvements, optional additions, or suggestions for follow-up
ADRs.

If there are no non-blocking notes, state that explicitly.

## Recommended Next Step

One of:

- **Accept** — no blocking issues; ready for status change to Accepted
- **Revise and re-review** — blocking issues present; specify which sections
  need revision
- **Accept with follow-up** — no blocking issues, but non-blocking notes
  warrant a follow-up ADR or doc update

---

## After Review

After producing the report, remind the architect:

- This skill evaluates; it does not accept. Status must be changed manually.
- If the recommendation is Accept, remind them to update `TOC.md` and
  change the ADR status field to `Accepted`.
- If the recommendation is Revise, offer to re-run the review after
  revisions are made.
- If downstream impacts were identified (skills, pipelines, arch docs),
  confirm those are tracked before the ADR is accepted.
