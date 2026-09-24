# ADR Review Rubric

## Section: Title

- Is the title decision-focused rather than problem-focused?
  Good: "Parameterized List Queries via Table-Valued Parameters"
  Poor: "SQL Injection Risk in Provider Methods"
- Is it specific enough to be distinguishable from other ADRs without
  reading the body?

## Section: Status

- Is the status one of: Proposed | Accepted | Deprecated | Superseded by ADR-NNNN?
- If Superseded, does the reference ADR number exist?

## Section: Date

- Is a date present in YYYY-MM-DD format?

## Section: Context

- Does it explain the situation or constraint that forced the decision —
  not just the symptom, but the underlying driver?
- Could a future engineer understand why this decision was necessary
  without access to the original discussion or the people involved?
- Is it free of solution language? Context describes the problem space;
  the decision section describes the solution.
- Are concrete examples present where the problem is technical?
  A code example, a failure mode, or a measurable impact is stronger
  than an abstract description.

## Section: Decision

- Is the decision explicit — stated, not implied?
- Does it name the specific pattern, rule, or approach adopted?
- Does it describe how the decision is applied in practice, not just
  what was decided in the abstract?
- If alternatives were considered, are they acknowledged — either inline
  or by reference? An ADR with no mention of alternatives raises the
  question of whether the decision was evaluated.

## Section: Consequences

- Are both positive and negative consequences present?
  An ADR with only positives is a red flag — every decision has trade-offs.
- Are consequences concrete and traceable to specific effects on the
  system or the team?
  Acceptable: "Requires UDT deployment to all target databases before
  affected methods can be migrated."
  Not acceptable: "Improves code quality."
- Do the negative consequences accurately represent the real costs —
  not minimized, not catastrophized?

## Section: Implementation Notes

- Are actionable specifics present?
- Where the decision involves a pattern, is a usage example included?
- Where there is a fallback, is it constrained — does it specify when
  it is permitted, when it is not, and how it is marked for follow-up?
- Are downstream impacts identified — skills, agent pipelines, checklists,
  or other documents that need updating as a result of this decision?

## Overall

- Is the ADR scoped to a single decision? An ADR that records multiple
  decisions should be split.
- Is it free of implementation detail that belongs in `arch/` or `ops/`
  rather than in a decision record?
- Does it meet the quality bar set by `./assets/example.md`?
