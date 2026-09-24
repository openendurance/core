# Privacy Review Rubric And Taxonomy

This document defines deterministic taxonomy, confidence scoring, and severity mapping for `code-review-privacy-check`.

## Purpose

Produce a repeatable, evidence-based inventory of likely privacy exposures in code changes or repository scans.

The review is triage-first:

- prioritize high-confidence and high-impact risks
- avoid policy overreach by clearly marking uncertainty
- provide minimal actionable remediation guidance per finding

## Scope Units

Every finding is evaluated across three units:

1. Data Signal: what potentially sensitive data is present
2. Exposure Sink: where data may be emitted or persisted unsafely
3. Linkage: whether the data appears to be associated with an identifiable subject

## Taxonomy

### Data Type Classification

Use one primary classification per row:

- `PII-Direct`
- `PII-Indirect`
- `PHI-Possible`
- `PHI-Likely`
- `Secret-Or-Credential`
- `Unknown-Sensitive`

#### `PII-Direct`

Data that can directly identify a person, such as:

- email address
- phone number
- physical address
- government identifier (for example SSN)
- payment identifier
- full name paired with another direct identifier

#### `PII-Indirect`

Data that may identify a person when combined with other attributes, such as:

- member or account IDs
- stable internal user identifiers
- device identifiers tied to user profile context

#### `PHI-Possible`

Healthcare-related terms without strong identity linkage.

Examples:

- diagnosis, treatment, procedure, medication, lab terms
- claim metadata without clear patient linkage

#### `PHI-Likely`

Healthcare-related data with identity linkage, or healthcare payload sent to risky sinks.

Examples:

- patient identifier with diagnosis/procedure details
- visit/treatment notes tied to member identity
- medical condition fields emitted in logs or telemetry with stable person ID

#### `Secret-Or-Credential`

Sensitive credentials or auth materials.

Examples:

- API keys, access tokens, passwords, signing keys

#### `Unknown-Sensitive`

Suspicious payload or literal where type is uncertain but exposure risk exists.

### Exposure Sink Classification

Use one sink type per row:

- `Log`
- `Telemetry-Trace`
- `Telemetry-Metric`
- `Analytics`
- `Exception-Or-Error-Payload`
- `Persistence-Or-Cache`
- `Outbound-HTTP`
- `Other-Sink`

### Pattern Class

Track detection origin to calibrate false positives:

- `Hardcoded-Literal`
- `Sensitive-Key-Name`
- `Payload-Shape`
- `Source-To-Sink-Flow`
- `Wrapper-Call`
- `Contextual-Keyword`
- `Sensitive-File-Presence`

## Evidence Rules

A finding must include:

- callsite or literal snippet
- location (file and line)
- sink type (or `none` for literal-only findings)
- short confidence rationale

Exception for binary artifacts:

- For binary or non-text-readable secret-bearing files (for example `.pfx`), file-level evidence is acceptable when accompanied by path/name indicators and nearby runtime/reference context.

Do not create findings from a keyword hit alone when no executable callsite context exists.

## Confidence Rubric

Confidence is determined by additive evidence points.

### Evidence Points

- +3 known sink API with explicit payload argument
- +3 direct identifier literal or canonical pattern (for example RFC-like email)
- +2 sensitive key name in payload (`email`, `phone`, `patientId`, `diagnosis`, `token`)
- +2 healthcare semantic term cluster in same payload/callsite
- +2 identity linkage in same scope (`userId`, `memberId`, `patientId`)
- +1 wrapper name strongly implying telemetry/analytics/logging
- +2 secret-bearing file indicator (`.env`, `.env.*`, `.pem`, `.key`, `.pfx`, `.crt`, `.cer`)
- +3 private key marker in readable text (for example `BEGIN PRIVATE KEY`, `BEGIN RSA PRIVATE KEY`)
- -2 guarded or sanitized path clearly present (`redact`, `mask`, explicit projection)
- -1 ambiguous context (test fixture-like structure outside excluded tests, generic term only)

### Confidence Levels

- `High`: score >= 6 and includes either sink evidence or direct sensitive literal pattern
- `Medium`: score 3 to 5 with at least two distinct evidence dimensions
- `Low`: score <= 2 or single weak heuristic

## PHI Gate

PHI classification requires healthcare semantics plus one of:

- direct/indirect identity linkage in same callsite or payload
- data routed to a sink with patient/member context

If the PHI gate fails, downgrade to `PII-Indirect` or `Unknown-Sensitive` with explicit rationale.

## Severity Mapping

Severity is independent from confidence.

### High Severity

- High-confidence `PII-Direct`, `PHI-Likely`, or `Secret-Or-Credential` exposure in sink
- clear hardcoded credentials
- private key or certificate-with-private-key material committed in repository scope
- unredacted sensitive payload in logs/telemetry/analytics

### Medium Severity

- Medium-confidence exposure to sink
- high-confidence literal in code without current sink evidence
- weak/no redaction in error payload path

### Low Severity

- low-confidence indicators
- contextual smells needing follow-up but not immediately risky

## Remediation Catalog (Short Form)

Use one concise action per finding:

- `Remove literal and source from secure config`
- `Redact sensitive fields before emit`
- `Hash or tokenize identifier`
- `Emit only low-cardinality non-sensitive metadata`
- `Restrict payload shape to safe allowlist`
- `Move sensitive diagnostics behind controlled non-prod guard`
- `Add regression test for redaction behavior`

## Required Output Columns

- `Callsite`
- `Location`
- `Data Type`
- `Sink Type`
- `Pattern Class`
- `Confidence`
- `Severity`
- `Evidence`
- `Recommended Remediation`

Optional but recommended:

- `Confidence Score`
- `Redaction Guard Present`
- `Reviewer Note`

## Triage Guidance

- Sort findings by Severity then Confidence.
- Collapse duplicates using normalized fingerprint: `<sink>|<method>|<primaryKey>|<location>`.
- Keep uncertain findings but clearly label as `Low` confidence.
- If no findings, explicitly state `No actionable privacy findings in scanned scope`.
