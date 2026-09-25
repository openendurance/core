---
name: adr-create
description: >
    Creates a well-formed Architecture Decision Record. Operates in two modes:
    autonomous (when sufficient context is provided) or interactive (section by
    section when input is ambiguous or incomplete). Always uses the canonical
    template and quality bar. Use when an architect needs to record a significant
    architectural decision.
metadata:
    author: oei
    version: "1.0"
---

## Purpose

Produce a well-formed ADR in `docs/adr/` that meets the project quality
standard. Do not infer, assume, or hallucinate any part of the ADR content.
If any required section cannot be populated from the provided input with
confidence, switch to interactive mode for that section.

## Assets

- `./assets/template.md` — canonical ADR template; all output must conform
- `./assets/example.md` — reference implementation (ADR-0002); use as the
  quality bar for depth, specificity, and tone

## Inputs

The architect may provide any combination of:

- A description of the problem or situation
- The decision that was made
- Alternatives that were considered
- Consequences or trade-offs
- Implementation details, patterns, or constraints

Input may be a free-form prompt, a rough draft, notes, or a structured
description. All forms are acceptable.

## Mode Selection

Before proceeding, evaluate the input against the following sufficiency
criteria. All three must be met to proceed autonomously:

1. **Context is inferrable** — the situation or constraint that forced the
   decision is clear enough to write without introducing assumptions.
2. **Decision is explicit** — what was decided is stated, not implied.
   The skill must not select or invent a decision on the architect's behalf.
3. **At least one consequence is present** — at least one positive or
   negative consequence is evident from the input.

If all three criteria are met → **Autonomous Mode**
If any criterion is not met → **Interactive Mode**

When in doubt, default to Interactive Mode. A slow interactive session
produces a better ADR than a fast autonomous one with hallucinated content.

## Autonomous Mode

Proceed directly to output. Do not ask clarifying questions.

Populate all sections from the provided input. Where the input supports
multiple reasonable interpretations, choose the most conservative one and
note the interpretation in a `<!-- NOTE: ... -->` comment in the draft for
the architect to review.

Produce the complete ADR, then pause and ask the architect to review before
writing the file.

## Interactive Mode

Work through the ADR one section at a time. For each section:

1. State which section you are working on.
2. Show what you have from the input (if anything).
3. Ask a single, specific question to elicit what is missing.
4. Wait for the architect's response before proceeding to the next section.

Do not ask compound questions. Do not ask for information that can be
cleanly inferred from prior responses.

Section order:

1. Title — a concise, decision-focused title (not a description of the problem)
2. Context — the situation or constraint that forced the decision
3. Decision — what was decided and how it is applied
4. Consequences (Positive) — concrete benefits
5. Consequences (Negative) — trade-offs, costs, or constraints introduced
6. Implementation Notes — patterns, fallbacks, edge cases, tooling impacts

Once all sections are complete, produce the full draft and pause for
architect review before writing the file.

## Quality Bar

Before writing the file, evaluate the draft against the reference
implementation in `./assets/example.md`:

- **Context** — does it give enough background that a future engineer
  understands why this decision was necessary without access to the
  original discussion?
- **Decision** — is it specific? Does it name the pattern or rule and
  describe how it is applied in practice, not just what was decided in
  the abstract?
- **Consequences** — are they concrete? Vague consequences ("improves
  maintainability") are not acceptable. Each consequence should be
  traceable to a specific effect on the system or the team.
- **Implementation Notes** — are there actionable specifics? Code
  patterns, fallback rules, tooling impacts, or checklist updates where
  applicable.

If the draft does not meet this bar, surface the gaps to the architect
before writing the file. Do not silently lower the quality bar to
complete the task faster.

## Numbering and File Naming

Before writing the file:

1. List the existing files in `docs/adr/` to determine the next number.
2. The filename is `NNNN-{kebab-title}.md` where `NNNN` is the next
   zero-padded sequential integer.
3. Do not reuse or skip numbers.

## Output

Set `Status` to `Proposed`. The architect or a designated reviewer must
change status to `Accepted` — this skill does not accept ADRs.

Set `Date` to today's date in `YYYY-MM-DD` format.

Write the file to `docs/adr/` using the filename determined above.

After writing the file, remind the architect:

- The ADR is in `Proposed` status and requires human review before
  being set to `Accepted`.
- `TOC.md` must be updated to include the new ADR entry.
- If the decision affects any existing skill, agent pipeline, or
  `docs/arch/` document, those should be updated before the ADR
  is accepted.
