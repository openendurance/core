# ADR-0002: Parameterized List Queries via Table-Valued Parameters

## Status

Accepted

## Date

2026-06-11

## Context

Several `SqlProvider` implementations construct SQL IN-list queries by
concatenating C# collections directly into SQL string literals using
`string.Join` or string interpolation. Example:

```csharp
var sql = "SELECT * FROM Campaigns WHERE Id IN (" + string.Join(",", ids) + ")";
```

This pattern was identified during the sql-provider-audit pass as a `CRITICAL`
finding on affected methods. It creates two distinct problems:

1. Injection surface — even when the input is typed (e.g. `IEnumerable<int>`),
   the pattern normalizes dynamic SQL construction as acceptable, making it
   harder to enforce parameterization consistently across the codebase.

2. Query plan instability — SQL Server generates a separate execution plan
   for each unique IN-list shape. A caller passing 3 IDs produces a different
   plan from one passing 300. At scale this causes plan cache bloat and
   unpredictable query performance.

The codebase targets SQL Server via ADO.NET through the `ISqlExecutor`
abstraction. The `SqlProvider` base class uses `IDbCommand`, which supports
`SqlParameter` with structured types when the underlying connection is
`SqlConnection`.

## Decision

All multi-value list parameters passed to SQL IN clauses must use
Table-Valued Parameters (TVPs) with a shared user-defined table type.

### Shared UDT

A single user-defined table type will be defined in the target database:

```sql
CREATE TYPE dbo.IntIdList AS TABLE (Id INT NOT NULL);
```

For string-keyed lists:

```sql
  CREATE TYPE dbo.StringCodeList AS TABLE (Code NVARCHAR(100) NOT NULL);
```

Additional UDTs may be defined as needed, following the same naming pattern:
`{Type}{Semantic}List`.

### C# usage pattern

Provider methods receiving a list parameter must bind it as a TVP:

```csharp
  var tvp = new DataTable();
  tvp.Columns.Add("Id", typeof(int));
  foreach (var id in ids) tvp.Rows.Add(id);

  var param = new SqlParameter("@Ids", SqlDbType.Structured)
  {
      TypeName = "dbo.IntIdList",
      Value = tvp
  };
  cmd.Parameters.Add(param);
```

The SQL query uses a standard JOIN or EXISTS against the TVP:

```sql
  SELECT c.*
  FROM Campaigns c
  INNER JOIN @Ids i ON c.Id = i.Id
```

### ISqlExecutor compatibility

The TVP pattern requires that the underlying `IDbCommand` is a `SqlCommand`
and the connection is `SqlConnection`. The `ISqlExecutor` implementation must
be verified to support `SqlParameter` with `SqlDbType.Structured` before
provider methods are migrated. If the executor wraps the connection in a
way that prevents `SqlParameter` usage, the executor interface must be
extended to support structured parameters explicitly.

### Fallback — validated integer list (integer types only)

If TVP support cannot be confirmed for a given execution path before
migration is required, integer-typed lists may use a validated fallback:

```csharp
  // All values must be confirmed int before building literal
  var safeIds = ids.Select(id => id.ToString("D")).ToList();
  var sql = $"SELECT ... WHERE Id IN ({string.Join(",", safeIds)})";
```

This fallback is permitted only for int and long types where format "D"
guarantees no injection surface. It is not permitted for string, Guid,
or any other type. The fallback must be marked with a `// TVP-PENDING`
comment and tracked for migration.

String and Guid lists have no safe fallback — they must use TVP.

## Consequences

### Positive

- Eliminates the injection surface class entirely for list parameters.
- Produces a stable single-cardinality query plan regardless of list size.
- Consistent pattern across all providers makes the corpus easier to audit.

### Negative

- Requires UDT deployment to all target databases before affected methods
  can be migrated — migration cannot proceed until DDL is applied.
- TVP parameters require `SqlParameter` specifically, not the `IDbParameter`
  abstraction used by `AddParameter` in the base class; affected methods
  will bind TVP parameters directly rather than via `AddParameter`.
- `DataTable` construction is more verbose than `string.Join`; consider a
  shared extension method to reduce boilerplate.

## Implementation Notes

- Audit findings tagged `CRITICAL` for IN-list concatenation remain
  `MANUAL_REVIEW` until the UDT is deployed and `ISqlExecutor` compatibility
  is confirmed.
- A `// TVP-PENDING` comment must be added to any method using the integer
  fallback so the sql-provider-audit skill can flag it in future passes.
- The sql-provider-audit skill checklist should be updated to recognize
  TVP-bound parameters as compliant and integer-fallback with `// TVP-PENDING`
  as `MEDIUM` rather than `CRITICAL`.
