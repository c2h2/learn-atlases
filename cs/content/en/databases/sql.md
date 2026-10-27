The relational algebra of [[databases/relational-model]] is a precise language for queries, but nobody wants to write $\pi_{\text{name}}(\sigma_{\text{dept}=\text{'MA'}}(\ldots))$ every day. **SQL** (Structured Query Language) is the language that real systems speak. It is **declarative**: a query describes the result, and the database system chooses the algorithm. It is also much more than a query language — it defines schemas and constraints, inserts and updates data, controls transactions and access rights — and over fifty years it has grown far beyond the algebra, with duplicates, null values, aggregation, recursion and window functions.

This chapter teaches the core of SQL as a student should know it: what each construct means *exactly*, how it relates to the algebra, and where its semantics surprise people. The surprises are real. SQL keeps duplicate rows, has a third truth value besides true and false, and lets a query that looks correct silently return the wrong rows when a column contains a null. We will run every query. **All listings in this chapter were run in SQLite 3.46.1** (the `sqlite3` shell with `.mode box` and `.nullvalue NULL`; the Python examples use Python's built-in `sqlite3` module). Where SQLite differs from the SQL standard or from other systems such as PostgreSQL, we say so.

## Defining data

A schema is created with `CREATE TABLE`, which names the columns, their types and the constraints of [[databases/relational-model#def-key]] and [[databases/relational-model#def-foreign-key]]:

```sql
PRAGMA foreign_keys = ON;          -- SQLite only: enforce foreign keys on this connection
CREATE TABLE Student (
  sid   INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  year  INTEGER CHECK (year BETWEEN 1 AND 4)
);
CREATE TABLE Course (
  code    TEXT PRIMARY KEY,
  title   TEXT NOT NULL,
  dept    TEXT NOT NULL,
  credits INTEGER NOT NULL
);
CREATE TABLE Enrolled (
  sid   INTEGER REFERENCES Student(sid),
  code  TEXT    REFERENCES Course(code),
  grade TEXT,                                -- may be NULL: not graded yet
  PRIMARY KEY (sid, code)
);
INSERT INTO Student VALUES (1,'Ada',2), (2,'Bao',1), (3,'Chen',3), (4,'Dara',2), (5,'Eli',1);
```

The Course and Enrolled rows are those of the running example, plus one: Dara has just enrolled on MA210 and has no grade yet, so the eleventh row of Enrolled is `(4, 'MA210', NULL)`.

`INSERT`, `UPDATE` and `DELETE` change the instance; the DBMS checks every constraint and rejects a statement that would violate one. Two SQLite peculiarities are worth knowing (as of version 3.46): foreign keys are enforced only after `PRAGMA foreign_keys = ON`, for compatibility with old databases, and column types are *affinities* rather than strict types unless the table is declared `STRICT`. PostgreSQL, like the SQL standard, enforces both always.

## The basic query block

The heart of SQL is the `SELECT`–`FROM`–`WHERE` block:

```sql
SELECT s.name, c.title, e.grade
FROM   Student s, Enrolled e, Course c
WHERE  e.sid = s.sid AND c.code = e.code AND c.dept = 'MA'
ORDER  BY s.name, c.title;
```

```text
┌──────┬────────────┬───────┐
│ name │   title    │ grade │
├──────┼────────────┼───────┤
│ Ada  │ Calculus   │ A     │
│ Bao  │ Statistics │ B     │
│ Chen │ Calculus   │ B     │
│ Chen │ Statistics │ A     │
│ Dara │ Statistics │ NULL  │
└──────┴────────────┴───────┘
```

The `FROM` clause lists tables, each with an optional **alias** (`s`, `e`, `c`) used to qualify column names. The meaning is easiest to state as a naive evaluation procedure — not how a DBMS actually runs it, but what any correct evaluation must return.

::: definition Semantics of a query block {#def-sfw}
The block `SELECT` $L$ `FROM` $R_1, \dots, R_n$ `WHERE` $C$ is evaluated as follows: for every combination of one row from each of $R_1, \dots, R_n$ (the Cartesian product), evaluate the condition $C$; for each combination where $C$ is *true*, output the values of the expressions in $L$. The result is a **bag** (multiset): a row is output once per qualifying combination. `SELECT DISTINCT` removes duplicate rows from the result, and `ORDER BY` sorts it; without `ORDER BY` the order of rows is unspecified.
:::

In the algebra this is $\pi_L(\sigma_C(R_1 \times \dots \times R_n))$, with the difference that SQL's $\pi$ does not remove duplicates. To make this precise we need bags.

::: definition Bag relational algebra {#def-bag}
A **bag** over a schema assigns to each tuple a multiplicity in $\set{0, 1, 2, \dots}$, with only finitely many non-zero. For bags $r, s$ and a tuple $t$ with multiplicities $r(t), s(t)$:
- $\sigma_\theta(r)(t) = r(t)$ if $\theta(t)$ holds, and $0$ otherwise;
- $\pi_X(r)(x) = \sum_{t : t[X] = x} r(t)$ — projection *adds* multiplicities instead of merging;
- $(r \times s)(t, u) = r(t)\,s(u)$;
- $(r \uplus s)(t) = r(t) + s(t)$ (bag union, SQL's `UNION ALL`);
- $\delta(r)(t) = \min(r(t), 1)$ (duplicate elimination, SQL's `DISTINCT`).
:::

::: theorem Translation of the query block {#thm-sfw}
With bag semantics, the query block of [[#def-sfw]] equals $\pi_L(\sigma_C(R_1 \times \dots \times R_n))$, and the same block with `SELECT DISTINCT` equals $\delta(\pi_L(\sigma_C(R_1 \times \dots \times R_n)))$. If every $R_i$ is a set (has a key), then $\delta(\pi_L(\sigma_C(\cdots)))$ coincides with the set-algebra expression of [[databases/relational-model#def-algebra]].
:::

::: proof
By [[#def-bag]], a combination $(t_1, \dots, t_n)$ has multiplicity $R_1(t_1)\cdots R_n(t_n)$ in the product, which is exactly the number of ways of choosing one row from each table with those values. Selection keeps those multiplicities for combinations satisfying $C$, and projection adds up the multiplicities of combinations with the same output values — once per qualifying combination, as in [[#def-sfw]]. Applying $\delta$ caps every multiplicity at $1$. If the inputs are sets, all multiplicities are $0$ or $1$, and the bag operations $\sigma$ and $\times$ agree with the set ones; after $\delta$, the bag projection has the same support (the set of tuples with non-zero multiplicity) as the set projection.
:::

Why does SQL use bags at all? Partly for speed — removing duplicates needs a sort or a hash table ([[databases/query-processing]]) — and partly because duplicates carry information that aggregation needs: the average of the credits column must count the three 15-credit courses three times.

### Joins

Writing join conditions in `WHERE` works, but SQL-92 introduced explicit join syntax that separates *how tables are connected* from *which rows are wanted*: `Student s JOIN Enrolled e ON e.sid = s.sid`. `NATURAL JOIN` joins on all columns with equal names, as in the algebra — convenient, but fragile, because adding a column with a coincidental name (say `year` to Course) silently changes every natural join. Prefer `JOIN … ON` or `JOIN … USING (sid)`.

An inner join loses rows with no partner. Eli has no enrolments, so he never appears in Student `JOIN` Enrolled. An **outer join** keeps them, padding the missing columns with nulls:

```sql
SELECT s.name, e.code
FROM   Student s LEFT JOIN Enrolled e ON e.sid = s.sid
WHERE  s.year = 1;
```

```text
┌──────┬───────┐
│ name │ code  │
├──────┼───────┤
│ Bao  │ CS101 │
│ Bao  │ MA210 │
│ Eli  │ NULL  │
└──────┴───────┘
```

`LEFT JOIN` keeps every row of the left table, `RIGHT JOIN` every row of the right, and `FULL JOIN` both (SQLite has supported the latter two since version 3.39, 2022). A left join followed by `WHERE e.sid IS NULL` returns exactly the unmatched rows — the students with no enrolment — an idiom equivalent to a difference in the algebra. Note that the condition `s.year = 1` sits in `WHERE`: it filters after the join. Placing a condition on the *right* table in `ON` instead of `WHERE` changes the meaning of an outer join, a classic source of bugs ([[#ex-on-where]]).

::: example A self-join: pairs of classmates {#ex-self-join}
List the pairs of distinct students who share at least one course, each pair once.
::: solution
Use two copies of Enrolled, joined on the course:

```sql
SELECT DISTINCT a.sid AS s1, b.sid AS s2
FROM   Enrolled a JOIN Enrolled b ON a.code = b.code
WHERE  a.sid < b.sid
ORDER  BY s1, s2;
```

```text
┌────┬────┐
│ s1 │ s2 │
├────┼────┤
│ 1  │ 2  │
│ 1  │ 3  │
│ 1  │ 4  │
│ 2  │ 3  │
│ 2  │ 4  │
│ 3  │ 4  │
└────┴────┘
```

The condition `a.sid < b.sid` removes the pairing of a row with itself and keeps one of $(x, y)$ and $(y, x)$. `DISTINCT` is needed because some pairs share several courses: Ada and Dara share CS101 and CS202, and without `DISTINCT` the pair $(1, 4)$ would appear twice. Every pair of the four enrolled students shares something — Bao and Dara, for instance, share both CS101 and MA210.
:::
:::

## Aggregation and grouping

**Aggregate functions** — `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` — reduce a bag of values to one value. `GROUP BY` partitions the rows into groups with equal values of the grouping columns and computes the aggregates once per group; `HAVING` then filters the groups.

```sql
SELECT code, COUNT(*) AS n, COUNT(grade) AS graded
FROM   Enrolled
GROUP  BY code
ORDER  BY code;
```

```text
┌───────┬───┬────────┐
│ code  │ n │ graded │
├───────┼───┼────────┤
│ CS101 │ 3 │ 3      │
│ CS202 │ 3 │ 3      │
│ MA101 │ 2 │ 2      │
│ MA210 │ 3 │ 2      │
└───────┴───┴────────┘
```

`COUNT(*)` counts rows; `COUNT(grade)` counts non-null grades — Dara's ungraded MA210 enrolment is a row but not a grade. Every aggregate except `COUNT(*)` ignores nulls, and `SUM`, `AVG`, `MIN`, `MAX` of an empty bag are `NULL`, not $0$.

::: definition Logical order of evaluation {#def-order}
A query with all clauses is evaluated, logically, in the order `FROM` (form the product or joins), `WHERE` (filter rows), `GROUP BY` (form groups), `HAVING` (filter groups), `SELECT` (compute output expressions, including aggregates), `DISTINCT`, `ORDER BY`, and finally `LIMIT`/`OFFSET`. In a grouped query, every expression in `SELECT` and `HAVING` must be a grouping column, an aggregate, or a function of these.
:::

The order explains common errors. `WHERE COUNT(*) > 2` is illegal, because `WHERE` runs before groups exist — that is what `HAVING` is for. An alias defined in `SELECT` cannot be used in `WHERE` for the same reason (though `ORDER BY` may use it, since it runs later). And selecting a column that is neither grouped nor aggregated is meaningless: which of the group's values should it show? The standard rejects such queries (unless the column is functionally determined by the grouping columns, a refinement of SQL:1999); SQLite accepts them and picks a value from an arbitrary row of the group — a convenience that hides bugs.

::: example Students with at least 40 credits {#ex-credits}
List the students whose enrolments total at least 40 credits, largest total first.
::: solution
Join to get each enrolment's credits, group by student, filter the groups:

```sql
SELECT s.name, SUM(c.credits) AS credits
FROM   Student s JOIN Enrolled e ON e.sid = s.sid
                 JOIN Course c   ON c.code = e.code
GROUP  BY s.sid, s.name
HAVING SUM(c.credits) >= 40
ORDER  BY credits DESC;
```

```text
┌──────┬─────────┐
│ name │ credits │
├──────┼─────────┤
│ Ada  │ 45      │
│ Chen │ 40      │
│ Dara │ 40      │
└──────┴─────────┘
```

Step by step: the joins give $11$ rows, one per enrolment. Grouping by student makes four groups (Eli has no enrolment, so no group). The sums are Ada $15+15+15 = 45$, Bao $15 + 10 = 25$, Chen $15 + 15 + 10 = 40$, Dara $15 + 15 + 10 = 40$. `HAVING` removes Bao. We group by `s.sid` and not only `s.name` because two students may share a name; `s.name` is added so that it may appear in `SELECT`. Chen and Dara tie at $40$, and their relative order is unspecified — add `, s.name` to the `ORDER BY` to fix it.
:::
:::

::: warning COUNT(*) after an outer join counts the padding row
To count each student's courses, *including* the students with none, you need a left join — but then `COUNT(*)` is wrong:

```sql
SELECT s.name, COUNT(*) AS wrong, COUNT(e.code) AS right_count
FROM   Student s LEFT JOIN Enrolled e ON e.sid = s.sid
GROUP  BY s.sid, s.name;
```

For Eli this gives `wrong = 1` and `right_count = 0`: the left join produced one row for Eli, with `e.code` null. `COUNT(*)` counts that row; `COUNT(e.code)` ignores the null. Count a column of the *right* table — preferably its key — whenever you aggregate over an outer join.
:::

## Nested queries

A **subquery** is a query inside another. In `WHERE`, it can be tested with `IN`, `EXISTS`, or a comparison with `ANY`/`ALL`; in `FROM`, it acts as a table; and a **scalar subquery** returning one value can appear wherever a value can:

```sql
SELECT code, title FROM Course
WHERE  credits > (SELECT AVG(credits) FROM Course);     -- the average is 13.75
```

```text
┌───────┬─────────────┐
│ code  │    title    │
├───────┼─────────────┤
│ CS101 │ Programming │
│ CS202 │ Databases   │
│ MA101 │ Calculus    │
└───────┴─────────────┘
```

A subquery is **correlated** if it refers to a column of the outer query; logically, it is re-evaluated for every outer row. `EXISTS (subquery)` is true when the subquery returns at least one row, and with `NOT EXISTS` SQL can say "for all" exactly as the relational calculus does. The division of [[databases/relational-model#ex-division]] — students taking *every* CS course — becomes a double negation: there is no CS course that the student does not take.

```sql
SELECT s.name FROM Student s
WHERE NOT EXISTS (SELECT * FROM Course c
                  WHERE c.dept = 'CS'
                    AND NOT EXISTS (SELECT * FROM Enrolled e
                                    WHERE e.sid = s.sid AND e.code = c.code));
```

```text
┌──────┐
│ name │
├──────┤
│ Ada  │
│ Dara │
└──────┘
```

Read it from the inside: for student `s` and course `c`, the innermost subquery is non-empty if `s` takes `c`; the middle one collects the CS courses that `s` does *not* take; the outer condition keeps `s` if there are none. A DBMS usually rewrites such subqueries into (anti-)joins rather than executing them literally ([[databases/query-optimisation]]).

The set operations `UNION`, `INTERSECT` and `EXCEPT` combine two union-compatible query results. By default they remove duplicates — they are set operations — while `UNION ALL` keeps them (the bag union $\uplus$). For the students on CS101 ($\set{1, 2, 4}$) and on MA101 ($\set{1, 3}$), `UNION` gives $1, 2, 3, 4$, `UNION ALL` gives the five rows $1, 2, 4, 1, 3$, `INTERSECT` gives $1$ and `EXCEPT` gives $2, 4$.

::: widget venn
sets: 2
labels: CS101; MA101
expr: CS101 - MA101
caption: The students on CS101 and the students on MA101 as two sets. The shaded region is `EXCEPT`: students on CS101 but not MA101 (Bao and Dara). Type `CS101 | MA101` for `UNION` and `CS101 & MA101` for `INTERSECT` (only Ada). The diagram shows sets; `UNION ALL` has no picture here, because it counts Ada twice.
:::

## Null values and three-valued logic

A **null** marks a missing value: unknown (Dara's grade is not known yet), inapplicable (a middle name for someone who has none), or withheld. SQL has a single `NULL` for all of these, and it is not a value like $0$ or the empty string: it is a marker meaning "no value here". What should `grade = 'A'` be when the grade is null? Neither true nor false. SQL therefore uses a **three-valued logic**.

::: definition Three-valued logic {#def-3vl}
SQL conditions take one of three truth values, TRUE, FALSE and UNKNOWN. Any comparison ($=, \ne, <, \le, >, \ge$) with a null operand is UNKNOWN. The connectives are defined by ordering FALSE $<$ UNKNOWN $<$ TRUE and taking $p$ `AND` $q = \min(p, q)$, $p$ `OR` $q = \max(p, q)$, `NOT` TRUE = FALSE, `NOT` FALSE = TRUE, `NOT` UNKNOWN = UNKNOWN. `WHERE`, `HAVING` and `ON` keep a row only if their condition is TRUE. The predicates `x IS NULL` and `x IS NOT NULL` are always TRUE or FALSE.
:::

| $p$ | $q$ | $p$ AND $q$ | $p$ OR $q$ | NOT $p$ |
|---|---|---|---|---|
| TRUE | UNKNOWN | UNKNOWN | TRUE | FALSE |
| FALSE | UNKNOWN | FALSE | UNKNOWN | TRUE |
| UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |

(The rows with no UNKNOWN are as in ordinary logic.) SQLite shows TRUE, FALSE and UNKNOWN as `1`, `0` and `NULL`:

```sql
SELECT NULL = NULL, NULL IS NULL, 1 < NULL, NULL AND 0, NULL OR 1, NOT NULL;
```

```text
┌─────────────┬──────────────┬──────────┬────────────┬───────────┬──────────┐
│ NULL = NULL │ NULL IS NULL │ 1 < NULL │ NULL AND 0 │ NULL OR 1 │ NOT NULL │
├─────────────┼──────────────┼──────────┼────────────┼───────────┼──────────┤
│ NULL        │ 1            │ NULL     │ 0          │ 1         │ NULL     │
└─────────────┴──────────────┴──────────┴────────────┴───────────┴──────────┘
```

Even `NULL = NULL` is UNKNOWN: two unknown grades are not known to be equal. So `WHERE grade = NULL` returns no rows, ever; write `WHERE grade IS NULL`. And a condition that is a tautology in two-valued logic need not be one in SQL: `grade = 'A' OR grade <> 'A'` is TRUE for ten rows of Enrolled but UNKNOWN for Dara's ungraded row, so it selects $10$ of the $11$ rows. Some laws survive — De Morgan's laws, commutativity, associativity and distributivity still hold in this logic — but the law of the excluded middle, $p \vee \neg p$, does not.

::: proposition NOT IN with a null {#prop-not-in}
Let $S$ be the bag of values returned by a subquery, and $x$ a value. The condition $x$ `NOT IN` $(S)$, which SQL defines as `NOT` ($x = s_1$ `OR` $\dots$ `OR` $x = s_k$), is TRUE if and only if $S$ is empty, or $x$ is not null, no element of $S$ is null and $x \ne s$ for every $s \in S$. In particular, if $S$ contains a null and $x$ does not occur in $S$, the condition is UNKNOWN, and a `WHERE x NOT IN (S)` filter rejects the row.
:::

::: proof
If $S$ is empty the disjunction is empty, which is FALSE, and its negation TRUE. Otherwise the negation is TRUE exactly when the disjunction is FALSE, that is, when every disjunct $x = s_i$ is FALSE (by the max rule, one TRUE disjunct makes it TRUE and one UNKNOWN disjunct with none TRUE makes it UNKNOWN). A comparison $x = s_i$ is FALSE exactly when both operands are non-null and different. So the condition is TRUE iff $x$ is non-null, every $s_i$ is non-null, and $x$ differs from all of them. If some $s_i$ is null and no $s_j$ equals $x$, all disjuncts are FALSE or UNKNOWN with at least one UNKNOWN, so the disjunction and its negation are UNKNOWN.
:::

::: example The student who vanishes {#ex-not-in}
Find the students who never received a C. Compare `NOT IN` with `NOT EXISTS`.
::: solution
The natural-looking query uses `NOT IN` with a correlated subquery:

```sql
SELECT name FROM Student s
WHERE 'C' NOT IN (SELECT grade FROM Enrolled e WHERE e.sid = s.sid);
```

```text
┌──────┐
│ name │
├──────┤
│ Ada  │
│ Chen │
│ Eli  │
└──────┘
```

Dara is missing, although she has never had a C: her grades are B, B and NULL, and by [[#prop-not-in]] `'C' NOT IN ('B', 'B', NULL)` is UNKNOWN. Bao is correctly excluded (he has a C), and Eli correctly included (his subquery is empty). The `NOT EXISTS` form asks the intended question — is there an enrolment of this student with grade C? — and a null grade simply fails `e.grade = 'C'`:

```sql
SELECT name FROM Student s
WHERE NOT EXISTS (SELECT * FROM Enrolled e WHERE e.sid = s.sid AND e.grade = 'C');
```

```text
┌──────┐
│ name │
├──────┤
│ Ada  │
│ Chen │
│ Dara │
│ Eli  │
└──────┘
```

The lesson: prefer `NOT EXISTS` to `NOT IN` unless the subquery's column is declared `NOT NULL`.
:::
:::

::: quiz
Enrolled has $11$ rows, one of which has a null grade. How many rows does `SELECT * FROM Enrolled WHERE NOT (grade = 'A' OR grade <> 'A')` return?
- [x] $0$
- [ ] $1$
- [ ] $10$
- [ ] $11$
::: solution
For the ten graded rows, `grade = 'A' OR grade <> 'A'` is TRUE, so its negation is FALSE. For the ungraded row it is UNKNOWN, and `NOT UNKNOWN` is UNKNOWN. `WHERE` keeps only TRUE rows, so none. SQLite returns a count of $0$. In two-valued logic you might expect the null row to be returned "because it is neither A nor not A" — but negation never turns UNKNOWN into TRUE.
:::
:::

## Views, common table expressions and recursion

A **view** is a named query, used like a table:

```sql
CREATE VIEW Transcript AS
  SELECT s.sid, s.name, c.code, c.dept, c.credits, e.grade
  FROM Student s JOIN Enrolled e ON e.sid = s.sid JOIN Course c ON c.code = e.code;

SELECT dept, COUNT(DISTINCT sid) AS students FROM Transcript GROUP BY dept;
```

```text
┌──────┬──────────┐
│ dept │ students │
├──────┼──────────┤
│ CS   │ 4        │
│ MA   │ 4        │
└──────┴──────────┘
```

Views provide logical data independence (applications query the view while the base tables change underneath) and security (grant access to a view that hides some columns). An ordinary view stores no data: queries on it are expanded into queries on the base tables. A **materialised view** stores its result and must be refreshed when the base tables change. Updating *through* a view is possible only when each view row corresponds to one base row, as for a view that selects and projects a single table.

A **common table expression** (CTE), `WITH name AS (query)`, is a view local to one statement, which makes long queries readable. With `WITH RECURSIVE`, a CTE may refer to itself, and SQL escapes the limitation of the algebra noted in [[databases/relational-model]]: it can compute transitive closures. Consider a table Prereq(course, needs) of direct prerequisites:

| course | needs |
|---|---|
| CS202 | CS101 |
| CS301 | CS202 |
| CS301 | MA210 |
| CS350 | CS301 |
| CS350 | MA101 |
| MA210 | MA101 |

::: widget graph
nodes: CS350@3,1; CS301@2,1.6; MA101@1,0.2; CS202@1,2.2; MA210@1,1; CS101@0,2.2
edges: CS350>CS301; CS350>MA101; CS301>CS202; CS301>MA210; MA210>MA101; CS202>CS101
algorithm: bfs
start: CS350
caption: The prerequisite relation as a directed graph, an arrow pointing from a course to a course it needs. Step through breadth-first search from CS350: the vertices reached are exactly the rows the recursive query below returns, level by level — the base case finds the direct prerequisites (distance $1$), and each round of the recursive step adds the next level. MA101 is reached at distance $1$ and again through MA210, but is added once. Start the search at CS202 or MA101 to see shorter closures.
:::

```sql
WITH RECURSIVE Needs(code) AS (
  SELECT needs FROM Prereq WHERE course = 'CS350'          -- base case
  UNION
  SELECT p.needs FROM Needs n JOIN Prereq p ON p.course = n.code   -- one more step
)
SELECT code FROM Needs ORDER BY code;
```

```text
┌───────┐
│ code  │
├───────┤
│ CS101 │
│ CS202 │
│ CS301 │
│ MA101 │
│ MA210 │
└───────┘
```

::: definition Linear recursive query {#def-recursive}
A linear recursive CTE `WITH RECURSIVE` $T$ `AS (` $B$ `UNION` $S$ `)`, where the base query $B$ does not mention $T$ and the step query $S$ mentions $T$ once, is evaluated by **iteration to a fixpoint**: $T_0 = B$, $\Delta_0 = T_0$, and for $i \ge 0$, $\Delta_{i+1} = S(\Delta_i) - T_i$ and $T_{i+1} = T_i \cup \Delta_{i+1}$; evaluation stops when $\Delta_{i+1}$ is empty, and the result is the last $T_i$.
:::

Each round applies the step only to the rows that are new (the **semi-naive** strategy), which is correct for linear recursion because a join with a union distributes over the union. If the step query uses only joins, selections and projections (it is monotone, [[databases/relational-model#thm-monotone]]) and `UNION` removes duplicates, the iteration terminates: every row of every $T_i$ is built from the finitely many values in the database, so $T_0 \subseteq T_1 \subseteq \cdots$ cannot grow for ever ([[#ex-fixpoint]]). With `UNION ALL`, or with a step that creates new values (`depth + 1`), a cyclic graph makes the recursion run for ever; real queries then need a depth limit.

::: example Tracing the fixpoint {#ex-trace-recursion}
Trace [[#def-recursive]] for the query above.
::: solution
- $T_0 = \Delta_0 = \set{\text{CS301}, \text{MA101}}$ (the direct prerequisites of CS350).
- Step on $\Delta_0$: Prereq rows with course CS301 give CS202 and MA210; MA101 has no prerequisites. $\Delta_1 = \set{\text{CS202}, \text{MA210}}$, $T_1 = \set{\text{CS301}, \text{MA101}, \text{CS202}, \text{MA210}}$.
- Step on $\Delta_1$: CS202 needs CS101; MA210 needs MA101, which is already in $T_1$ and is removed. $\Delta_2 = \set{\text{CS101}}$.
- Step on $\Delta_2$: CS101 needs nothing, $\Delta_3 = \emptyset$. Stop.

The result has five courses, matching the output and the breadth-first search of the figure: $\Delta_i$ is the set of courses at distance $i + 1$ that were not found earlier. Without `UNION`'s duplicate removal, MA101 would be found twice (directly and through MA210) and, on a cyclic prerequisite table, for ever.
:::
:::

**Window functions** (SQL:2003) compute an aggregate over a "window" of related rows *without* collapsing them into one row: `RANK() OVER (PARTITION BY code ORDER BY grade)` ranks each student within each course while keeping one row per enrolment. They are the standard tool for running totals, rankings and moving averages.

## Embedding SQL safely

Programs send SQL to the database through a library: a **cursor** executes a statement and returns rows. The tempting way to put a value from the user into a query is to paste it into the SQL text. This is a serious bug, and it is easy to see why with a perfectly innocent name:

```python
import sqlite3
con = sqlite3.connect("u2.db")
name = "O'Brien"
sql = "SELECT sid FROM Student WHERE name = '" + name + "'"   # WRONG: builds code from data
print(sql)
try:
    con.execute(sql)
except sqlite3.Error as e:
    print(type(e).__name__, e)
```

```console
$ python3 bad.py
SELECT sid FROM Student WHERE name = 'O'Brien'
OperationalError near "Brien": syntax error
```

The apostrophe in the *data* ended the string literal and turned the rest of the name into SQL *code*. Here the result is a syntax error; with other input, the text of the query — and therefore what the database does — is chosen by whoever supplied the input. This class of vulnerability is called **SQL injection**, and it has been among the most damaging web-application flaws for decades. The cause is a single design error: mixing code and data in one string.

The defence is to never build SQL from data. Use **parameterised queries** (prepared statements): the SQL text is a fixed string with placeholders, and the values are passed separately, so the database parses the statement once and then treats each parameter strictly as a value.

```python
import sqlite3

con = sqlite3.connect("u2.db")
def courses_of(name):
    # The SQL text is fixed; the value travels separately as a parameter.
    sql = """SELECT c.title FROM Student s
             JOIN Enrolled e ON e.sid = s.sid JOIN Course c ON c.code = e.code
             WHERE s.name = ? ORDER BY c.title"""
    return [row[0] for row in con.execute(sql, (name,))]

print(courses_of("Ada"))
print(courses_of("O'Brien"))        # a quote in the data is just data
```

```console
$ python3 param.py
['Calculus', 'Databases', 'Programming']
[]
```

Every database library supports placeholders (`?` in SQLite, `%s` or `$1` in PostgreSQL drivers, named parameters in many). Identifiers such as table or column names cannot be parameters; if a program must choose among them, it should pick from a fixed list in the program, never from raw input. Least privilege adds a second layer: the application's database account should have only the rights it needs ([[security]]).

::: history
SQL began as SEQUEL ("Structured English Query Language"), designed by Donald Chamberlin and Raymond Boyce at IBM San Jose and published as "SEQUEL: A structured English query language" in 1974, for the System R prototype; it was renamed SQL for trademark reasons. System R's papers of 1976–1981, including Eswaran, Gray, Lorie and Traiger on consistency and locking (1976) and Selinger's query optimiser (1979), set the template for relational engines. Oracle (1979) and IBM's SQL/DS (1981) and DB2 (1983) were the first commercial SQL systems. ANSI standardised SQL in 1986 (ISO in 1987); SQL-92 added explicit joins and much else; SQL:1999 added recursive queries, triggers and user-defined types; SQL:2003 added window functions; later editions added JSON (2016) and property-graph queries (SQL:2023). Codd himself criticised SQL's duplicates and single null, and the debate about nulls, sharpened by C. J. Date, has never quite ended.
:::

## Where this leads

The meaning of SQL rests on the algebra, and so does its implementation: every query is parsed into an operator tree, rewritten using algebraic equivalences, and executed by algorithms for joins, sorting and aggregation ([[databases/query-processing]], [[databases/query-optimisation]]). Indexes make selective queries fast without changing their meaning ([[databases/storage-indexing]]). Transactions — `BEGIN`, `COMMIT`, `ROLLBACK` — and their isolation levels decide what a query sees when others are writing at the same time ([[databases/transactions]]). Which tables to create in the first place is the subject of [[databases/conceptual-design]] and [[databases/normalisation]].

::: summary
- A query block means $\pi_L(\sigma_C(R_1 \times \dots \times R_n))$ in the **bag** algebra: SQL keeps duplicates unless you write `DISTINCT`, and rows have no order unless you write `ORDER BY`.
- Clauses are evaluated logically as `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `SELECT`, `DISTINCT`, `ORDER BY`; `HAVING` filters groups, `WHERE` filters rows.
- Inner joins drop rows without partners; **outer joins** keep them with nulls. After an outer join, count a column of the right table, not `*`.
- `NOT EXISTS` expresses "for all" and "none"; correlated subqueries are logically re-evaluated per outer row.
- Nulls bring **three-valued logic**: comparisons with null are UNKNOWN, and `WHERE` keeps only TRUE rows. Use `IS NULL`; beware `NOT IN` when the subquery can return a null.
- Aggregates other than `COUNT(*)` ignore nulls; `SUM` of no rows is null.
- `WITH RECURSIVE` computes fixpoints such as transitive closure, which the algebra cannot.
- Never build SQL text from data: use **parameterised queries**, the defence against SQL injection.
:::

## Exercises

::: exercise The size of a product {level=1 check="20"}
How many rows does `SELECT * FROM Student, Course` return on the running example? (Enter the number.)
::: solution
With no `WHERE` clause every combination qualifies: $5 \cdot 4 = 20$ rows ([[#def-sfw]]). Forgetting a join condition produces such a product, usually with misleading duplicates in the result.
:::
:::

::: exercise Counting distinct values {level=1 check="4"}
What do `SELECT COUNT(*), COUNT(grade), COUNT(DISTINCT grade) FROM Enrolled` and `SELECT COUNT(DISTINCT code) FROM Enrolled` return on the eleven-row Enrolled table? (Enter the value of `COUNT(DISTINCT code)`.)
::: solution
`COUNT(*)` $= 11$ rows; `COUNT(grade)` $= 10$ non-null grades; `COUNT(DISTINCT grade)` $= 3$ (A, B, C — nulls are ignored, not counted as a fourth value). `COUNT(DISTINCT code)` $= 4$: every course has at least one enrolment. SQLite confirms `11 | 10 | 3` and `4`.
:::
:::

::: exercise A filtered join {level=1}
Write a query for the names of students in years 1 or 2 enrolled on CS101, in alphabetical order, and give its result.
::: solution
```sql
SELECT s.name
FROM   Student s JOIN Enrolled e ON e.sid = s.sid
WHERE  e.code = 'CS101' AND s.year IN (1, 2)
ORDER  BY s.name;
```

The CS101 students are $1, 2, 4$ (Ada, Bao, Dara), in years $2, 1, 2$, so all three qualify: Ada, Bao, Dara. `DISTINCT` is not needed, because (sid, code) is the key of Enrolled and the condition fixes the code, so each student appears at most once.
:::
:::

::: exercise ON versus WHERE in an outer join {#ex-on-where level=2}
Compare `SELECT s.name, e.code FROM Student s LEFT JOIN Enrolled e ON e.sid = s.sid AND e.grade = 'A'` with the same query in which `AND e.grade = 'A'` is moved to a `WHERE` clause. How many rows does each return, and why do they differ?
::: solution
With the condition in `ON`, the join pairs each student with their A-grade enrolments and keeps students with none, padded with nulls. A-grades: Ada CS101, Ada MA101, Chen CS202, Chen MA210. So the result has Ada twice, Chen twice, and Bao, Dara, Eli once each with a null code: $7$ rows. With the condition in `WHERE`, the left join first produces all $12$ rows ($11$ enrolments plus Eli's padding row), and then `WHERE e.grade = 'A'` keeps only the four A-rows — the padding rows have a null grade, which makes the condition UNKNOWN. The outer join has effectively become an inner join: $4$ rows. Conditions on the right table of a left join belong in `ON` if unmatched rows should survive.
:::
:::

::: exercise Above-average credit loads {level=2}
Write a query for the students whose total enrolled credits exceed the average total over all students with at least one enrolment. Give the result.
::: solution
Compute the totals once in a CTE and compare with their average:

```sql
WITH Total AS (
  SELECT e.sid, SUM(c.credits) AS t
  FROM Enrolled e JOIN Course c ON c.code = e.code
  GROUP BY e.sid)
SELECT s.name, t.t FROM Total t JOIN Student s ON s.sid = t.sid
WHERE t.t > (SELECT AVG(t) FROM Total)
ORDER BY s.name;
```

The totals are $45, 25, 40, 40$, with average $37.5$, so the result is Ada ($45$), Chen ($40$), Dara ($40$), as SQLite confirms. Eli, with no enrolments, is not in Total and so does not lower the average; if the question meant all students, a left join with `COALESCE(SUM(...), 0)` would include his $0$ and give average $30$ — the same three students here.
:::
:::

::: exercise A tautology that is not {level=2 check="0"}
How many rows of the eleven-row Enrolled table satisfy `NOT (grade = 'A' OR grade <> 'A')`? How many satisfy `grade = 'A' OR grade <> 'A' OR grade IS NULL`? (Enter the first number.)
::: solution
As in the quick check, $0$: for graded rows the inner disjunction is TRUE, for the null row it is UNKNOWN, and `NOT` maps these to FALSE and UNKNOWN. Adding `OR grade IS NULL` makes the condition TRUE for the null row too (`IS NULL` is never UNKNOWN, and UNKNOWN `OR` TRUE is TRUE), so all $11$ rows satisfy the second condition.
:::
:::

::: exercise Translating into the algebra {level=2}
Translate the query of [[#ex-self-join]] into bag relational algebra using [[#thm-sfw]], and explain what the result would be without `DISTINCT`.
::: solution
With $a = \rho_a(\text{Enrolled})$ and $b = \rho_b(\text{Enrolled})$, the query is

$$
\delta\Bigl(\pi_{a.\text{sid}, b.\text{sid}}\bigl(\sigma_{a.\text{code} = b.\text{code} \wedge a.\text{sid} < b.\text{sid}}(a \times b)\bigr)\Bigr).
$$

Without $\delta$, each pair $(x, y)$ has multiplicity equal to the number of courses they share. The shared courses are: $(1,2)$ CS101; $(1,3)$ CS202, MA101; $(1,4)$ CS101, CS202; $(2,3)$ MA210; $(2,4)$ CS101, MA210; $(3,4)$ CS202, MA210. So the bag has $1 + 2 + 2 + 1 + 2 + 2 = 10$ rows, and $\delta$ reduces it to the six pairs.
:::
:::

::: exercise NOT IN versus NOT EXISTS {level=3}
Let `T(a)` and `U(b)` be tables. Prove that if `T.a` and `U.b` are both declared `NOT NULL`, then `SELECT a FROM T WHERE a NOT IN (SELECT b FROM U)` and `SELECT a FROM T WHERE NOT EXISTS (SELECT * FROM U WHERE U.b = T.a)` return the same bag. Give a small instance with nulls on which they differ, and say which one computes $T - U$ in the sense of the algebra.
::: solution
Fix a row of $T$ with value $x \ne$ null. `NOT EXISTS` is TRUE iff no row of $U$ satisfies `U.b = x` with value TRUE, i.e. iff $x \ne s$ for every $s \in U$ (no $s$ is null, so each comparison is TRUE or FALSE). By [[#prop-not-in]], with $x$ and all $s$ non-null, `x NOT IN (U)` is TRUE iff $U$ is empty or $x \ne s$ for every $s$ — the same condition. Both queries keep each row of $T$ whose condition holds, with its multiplicity, so the bags agree.

With nulls: $T = \set{1}$, $U = \set{\text{null}}$. Then `1 NOT IN (NULL)` is UNKNOWN and the first query returns nothing; `NOT EXISTS` finds no row with `U.b = 1` TRUE and returns $1$. The `NOT EXISTS` query computes the anti-join, which on null-free data is the algebra's $T - U$ (up to duplicates); `NOT IN` behaves as "the value is known to differ from everything", which fails as soon as $U$ has an unknown value. Also, a null $x$ in $T$ is kept by `NOT EXISTS` (no row equals it) but never by `NOT IN` (when $U$ is non-empty).
:::
:::

::: exercise Termination of recursive queries {#ex-fixpoint level=3}
Prove that the iteration of [[#def-recursive]] terminates when the step query $S$ is built from joins, selections and projections of $T$ and stored tables (no arithmetic creating new values), and that the result is the least relation $T$ containing $B$ with $S(T) \subseteq T$. Then give a recursive query that computes, for every course in Prereq, the number of courses it needs directly or indirectly, and its result.
::: solution
*Termination.* Let $D$ be the finite set of values in the database and in the query, and $k$ the arity of $T$. Every row produced by $B$ or by $S$ consists of values copied from its inputs, so all rows of all $T_i$ lie in $D^k$, a finite set. The $T_i$ increase, and $T_{i+1} \ne T_i$ unless $\Delta_{i+1} = \emptyset$, so the iteration stops after at most $\lvert D\rvert^k$ rounds.

*Least fixpoint.* Write $F(X) = B \cup S(X)$; $S$ is monotone ([[databases/relational-model#thm-monotone]]). Let $T^* = \bigcup_i T_i$ be the result. By induction, $T_i \subseteq X$ for every $X$ with $B \subseteq X$ and $S(X) \subseteq X$: $T_0 = B \subseteq X$, and $\Delta_{i+1} \subseteq S(\Delta_i) \subseteq S(T_i) \subseteq S(X) \subseteq X$. So $T^*$ is contained in every such $X$. It is itself one: $B \subseteq T^*$, and at termination $S(\Delta_i) \subseteq T_i$ — with $S$ distributing over union (each row of $S(T_i)$ uses one row of $T$, which entered in some round $j$ and was then in $\Delta_j$), all of $S(T^*)$ was produced in some round, so $S(T^*) \subseteq T^*$.

*The query.*

```sql
WITH RECURSIVE Reach(course, needs) AS (
  SELECT course, needs FROM Prereq
  UNION
  SELECT r.course, p.needs FROM Reach r JOIN Prereq p ON p.course = r.needs
)
SELECT course, COUNT(*) AS n FROM Reach GROUP BY course ORDER BY course;
```

The result (SQLite) is CS202 $1$, CS301 $4$ (CS202, MA210, CS101, MA101), CS350 $5$, MA210 $1$. `UNION` matters again: CS350 reaches MA101 by two paths, and `COUNT(*)` would count it twice with `UNION ALL`.
:::
:::

::: exercise Safe enrolment in Python {level=3}
Write a Python function `enrol(sid, code)` that inserts an enrolment with a null grade using a parameterised query, runs it as a transaction, and returns `"ok"` or the reason for rejection. Show what happens when Eli enrols on CS101 twice and when a non-existent student 9 enrols.
::: solution
```python
import sqlite3

con = sqlite3.connect("u2.db")
con.execute("PRAGMA foreign_keys = ON")      # SQLite enforces foreign keys only when asked

def enrol(sid, code):
    try:
        with con:                            # one transaction: commit, or roll back on error
            con.execute("INSERT INTO Enrolled (sid, code) VALUES (?, ?)", (sid, code))
        return "ok"
    except sqlite3.IntegrityError as e:
        return f"rejected: {e}"

print(enrol(5, "CS101"))   # Eli joins Programming
print(enrol(5, "CS101"))   # again: primary key (sid, code) violated
print(enrol(9, "CS101"))   # no student 9: foreign key violated
print(con.execute("SELECT COUNT(*) FROM Enrolled WHERE sid = 5").fetchone()[0])
```

```console
$ python3 enrol.py
ok
rejected: UNIQUE constraint failed: Enrolled.sid, Enrolled.code
rejected: FOREIGN KEY constraint failed
1
```

The constraints do the checking: the program does not query first and insert afterwards (which could race with another program doing the same, [[databases/transactions]]). Without the `PRAGMA`, SQLite would accept student 9 silently. The values travel as parameters, so any `code` string, quotes included, is stored as data.
:::
:::
