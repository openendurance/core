# Operations

Operational reference documentation for OEI Core.

## What Belongs Here

Documents that answer "how do we run, test, and debug this system?" — runbooks, testing strategy, and operational procedures. These are reference docs for engineers and agents performing operational work.

System structure belongs in `arch/`.

Decisions about operational approach belong in `adr/`.

## Contents

| Document                                                               | Purpose                                                                                                 |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Commit signing (DCO + cryptographic signatures)](./commit-signing.md) | Explains OEI's two independent commit checks, setup for signing, and remediation/troubleshooting steps. |

## Authorship

Human-maintained. Agents may append findings or incident notes as part of a work increment, but procedural changes require human review.

## Update Contract

Update when procedures change. An outdated runbook is an incident waiting to happen — if a procedure has drifted from the document, fix the document immediately.

If a significant operational decision was made (e.g. changing the testing approach, adopting a new deployment pattern), open an ADR before updating the affected document here.
