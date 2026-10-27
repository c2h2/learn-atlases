Two clerks at a bank's branches transfer money at the same moment. Clerk 1 moves £100 from account A to account B; clerk 2 adds a month's interest to A. Each program reads A, computes, and writes A back. If the database interleaves them unluckily — both read A as £1000, clerk 1 writes £900, clerk 2 writes £1010 — the £100 withdrawal has vanished. And if the server crashes after £100 has left A but before it reaches B, the money vanishes in a different way. Every database used by more than one program at a time, or that can crash, faces these two problems: **concurrency** and **failure**.

The answer is the **transaction**: a sequence of reads and writes that the system executes as if it were a single, indivisible step, isolated from all other transactions. This chapter makes "as if" precise. We define schedules and **serialisability**, prove the precedence-graph test for conflict serialisability, and prove that **two-phase locking** guarantees it. We then meet the practical compromises: deadlocks, phantoms, the SQL **isolation levels**, and **multiversion concurrency control** with **snapshot isolation**, whose famous anomaly, **write skew**, we demonstrate. Failures and recovery are the subject of [[databases/recovery]].

## Transactions and ACID

::: definition Transaction and the ACID properties {#def-acid}
A **transaction** is a sequence of database operations issued by one program, ending either in **commit** (its effects are to be kept) or **abort** (its effects are to be undone). A DBMS guarantees:
- **Atomicity**: either all of a transaction's effects take place or none do;
- **Consistency**: a transaction that is run alone on a consistent database (one satisfying all integrity constraints) leaves it consistent;
- **Isolation**: concurrent transactions do not see each other's intermediate states — each runs as if alone (made precise as serialisability);
- **Durability**: once a transaction has committed, its effects survive any subsequent crash.
:::

Consistency is partly the programmer's job — a transfer that subtracts £100 and adds £90 is consistent with the constraints but wrong — while the DBMS enforces declared constraints and provides the other three properties. Atomicity and durability are the job of the recovery manager ([[databases/recovery]]); isolation is the job of the **concurrency-control** manager, the subject of this chapter. In SQL a transaction starts with `BEGIN` (or implicitly with the first statement) and ends with `COMMIT` or `ROLLBACK`.

## Schedules and serialisability

For reasoning about concurrency we abstract a transaction $T_i$ to its reads $r_i(X)$ and writes $w_i(X)$ of database **items** $X$ (rows, pages or tables), followed by $c_i$ (commit) or $a_i$ (abort). Computation inside the program is invisible to the database and may depend arbitrarily on the values read.

::: definition Schedule {#def-schedule}
A **schedule** of transactions $T_1, \dots, T_n$ is a sequence containing all their operations, in which the operations of each $T_i$ appear in the order of $T_i$. A schedule is **serial** if the operations of each transaction are consecutive. It is **serialisable** if, for every initial database state and every computation the transactions perform, its effect is the same as that of some serial schedule of the same transactions.
:::

Serial schedules are correct by assumption (each transaction preserves consistency when alone), so serialisable schedules are correct too. But serialisability in this general sense is hard to test, since it quantifies over all computations. The practical notion looks only at the order of conflicting operations.

::: definition Conflict and conflict serialisability {#def-conflict}
Two operations **conflict** if they belong to different transactions, access the same item, and at least one is a write. Two schedules are **conflict-equivalent** if one can be turned into the other by repeatedly swapping adjacent non-conflicting operations of different transactions. A schedule is **conflict-serialisable** if it is conflict-equivalent to a serial schedule.
:::

The three kinds of conflict are read–write, write–read and write–write; two reads never conflict. Swapping adjacent non-conflicting operations cannot change any value read or the final state: if they touch different items they are independent, and if both are reads nothing changes. So conflict-serialisable schedules are serialisable. The test is a graph.

::: definition Precedence graph {#def-precedence}
The **precedence graph** (serialisation graph) of a schedule $S$ has a vertex for each committed transaction and an edge $T_i \to T_j$ whenever an operation of $T_i$ conflicts with a *later* operation of $T_j$ in $S$.
:::

::: theorem Conflict-serialisability test {#thm-precedence}
A schedule is conflict-serialisable if and only if its precedence graph is acyclic. In that case, every topological order of the graph is the order of a conflict-equivalent serial schedule.
:::

::: proof
*Only if.* Swapping adjacent non-conflicting operations never changes the relative order of two conflicting operations, so conflict-equivalent schedules have the same precedence graph. The graph of a serial schedule $T_{\pi(1)}, \dots, T_{\pi(n)}$ has edges only from earlier to later transactions in this order, so it is acyclic. Hence a conflict-serialisable schedule has an acyclic graph.

*If.* Suppose the graph is acyclic, and let $T_{\pi(1)}, \dots, T_{\pi(n)}$ be a topological order ([[algorithms/graph-search]]). We show by induction on $n$ that $S$ is conflict-equivalent to the serial schedule in this order. $T_1' = T_{\pi(1)}$ has no incoming edge. Take its operations one by one, from first to last, and move each to the front past the operations of other transactions that precede it. Each such operation $p$ of another transaction precedes an operation $q$ of $T_1'$; if they conflicted, there would be an edge into $T_1'$. So every swap is of non-conflicting operations, and we obtain a conflict-equivalent schedule $T_1'$ followed by a schedule $S'$ of the others. The precedence graph of $S'$ is that of $S$ without $T_1'$, still acyclic with topological order $T_{\pi(2)}, \dots$, and by induction $S'$ is conflict-equivalent to the serial schedule in that order.
:::

::: example Testing a schedule {#ex-precedence}
Is $S = r_2(A)\; r_1(B)\; w_2(A)\; r_3(A)\; w_1(B)\; w_3(A)\; r_2(B)\; w_2(B)$ conflict-serialisable? And $r_1(X)\; r_2(X)\; w_1(X)\; w_2(X)$?
::: solution
List the conflicting pairs of $S$ in order:
- on $A$: $w_2(A)$ before $r_3(A)$ and $w_3(A)$, and $r_2(A)$ before $w_3(A)$: edge $T_2 \to T_3$;
- on $B$: $r_1(B)$ before $w_2(B)$, and $w_1(B)$ before $r_2(B)$ and $w_2(B)$: edge $T_1 \to T_2$.

The graph $T_1 \to T_2 \to T_3$ is acyclic, so $S$ is conflict-serialisable, equivalent to the serial order $T_1, T_2, T_3$. Check: in $S$, $T_2$ reads $B$ after $T_1$ wrote it, and $T_3$ reads $A$ after $T_2$ wrote it — exactly as in the serial order.

The second schedule has $r_1(X)$ before $w_2(X)$ ($T_1 \to T_2$) and $r_2(X)$ before $w_1(X)$ ($T_2 \to T_1$): a cycle, so it is not conflict-serialisable. It is the lost update of the introduction: both read $X$, and the second write overwrites the first. A short program finds both answers:

```python
from itertools import combinations

def parse(s):
    """'r1(X) w2(X) ...' -> list of (op, txn, item)"""
    return [(t[0], int(t[1:t.index("(")]), t[t.index("(") + 1:-1]) for t in s.split()]

def precedence_graph(schedule):
    edges = set()
    for (i, a), (j, b) in combinations(enumerate(schedule), 2):   # a comes before b
        if a[1] != b[1] and a[2] == b[2] and "w" in (a[0], b[0]):
            edges.add((a[1], b[1]))                                # conflict: Ta -> Tb
    return edges

for s in ["r2(A) r1(B) w2(A) r3(A) w1(B) w3(A) r2(B) w2(B)", "r1(X) r2(X) w1(X) w2(X)"]:
    print(sorted(precedence_graph(parse(s))))
```

```console
$ python3 prec.py
[(1, 2), (2, 3)]
[(1, 2), (2, 1)]
```
:::
:::

::: widget graph
nodes: T1@0,1; T2@1,0; T3@2,1
edges: T1>T2; T2>T3; T3>T2
algorithm: topo
caption: The precedence graph of $r_1(X)\,w_1(X)\,r_2(X)\,r_3(Y)\,w_2(Y)\,w_3(Y)$: $T_1 \to T_2$ on $X$, and on $Y$ both $T_2 \to T_3$ ($w_2(Y)$ before $w_3(Y)$) and $T_3 \to T_2$ ($r_3(Y)$ before $w_2(Y)$). Step through the topological sort: it outputs $T_1$ and then gets stuck on the cycle $T_2 \to T_3 \to T_2$, so the schedule is not conflict-serialisable. Delete the edge T3>T2 from the edge list — as if $T_3$ had read $Y$ after $T_2$ wrote it — and the sort succeeds with $T_1, T_2, T_3$.
:::

Conflict serialisability is sufficient but not necessary for serialisability. The schedule $r_1(X)\; w_2(X)\; w_1(X)\; w_3(X)$ has a cycle between $T_1$ and $T_2$, yet it has the same effect as $T_1, T_2, T_3$: $T_1$ reads the initial $X$ in both, and the final value is $T_3$'s in both, because $T_3$'s **blind write** (a write without a prior read) overwrites whatever came before. Such schedules are **view-serialisable**. Testing view serialisability is NP-complete (Papadimitriou, 1979), which is one reason systems use conflict serialisability.

### Recoverability

Serialisability considers only committed transactions. Aborts raise another problem: if $T_2$ reads a value written by $T_1$ and $T_1$ later aborts, $T_2$ has seen data that never existed.

::: definition Recoverable, cascadeless and strict schedules {#def-recoverable}
$T_j$ **reads from** $T_i$ if $T_j$ reads an item last written by $T_i$, and $T_i$ has not aborted by then. A schedule is
- **recoverable** if whenever $T_j$ reads from $T_i$, $T_i$ commits before $T_j$ commits;
- **cascadeless** (avoids cascading aborts) if transactions read only values written by already committed transactions;
- **strict** if no transaction reads or overwrites an item $X$ until the last transaction that wrote $X$ has committed or aborted.
:::

Every strict schedule is cascadeless, and every cascadeless schedule is recoverable. In $w_1(X)\; r_2(X)\; c_2\; a_1$, $T_2$ has committed a result based on a value that is now being undone, and durability forbids undoing $T_2$: the schedule is not recoverable. In $w_1(X)\; r_2(X)\; a_1\; a_2$, it is recoverable, but $T_1$'s abort forces $T_2$'s — a **cascading abort**, which in long chains is expensive. Strict schedules make undo simple: to abort $T_1$, restore the before-images of the items it wrote, since nobody has read or overwritten them since ([[databases/recovery]]).

## Lock-based concurrency control

A **lock manager** grants each transaction locks on items. A **shared** (S) lock allows reading; an **exclusive** (X) lock allows reading and writing. Several transactions may hold S locks on the same item, but an X lock excludes every other lock:

| held \ requested | S | X |
|---|---|---|
| S | granted | wait |
| X | wait | wait |

Locking alone is not enough: a transaction that locks $A$, writes it, unlocks it, and later locks $B$ lets another transaction see $A$ changed and $B$ not yet changed — the interleaving we wanted to prevent. The fix is a discipline on *when* locks may be released.

::: definition Two-phase locking {#def-2pl}
A transaction follows **two-phase locking** (2PL) if it acquires all its locks before it releases any: its life has a **growing phase** (acquiring locks, no releases) and a **shrinking phase** (releasing locks, no acquisitions). The **lock point** of the transaction is the moment it acquires its last lock. Under **strict 2PL**, in addition, every exclusive lock is held until the transaction commits or aborts.
:::

::: theorem Two-phase locking ensures conflict serialisability {#thm-2pl}
If every transaction follows 2PL, every schedule the lock manager allows is conflict-serialisable, and the order of the lock points is an equivalent serial order. If every transaction follows strict 2PL, the schedules are also strict.
:::

::: proof
Suppose $T_i \to T_j$ is an edge of the precedence graph: an operation $p$ of $T_i$ on item $X$ precedes a conflicting operation $q$ of $T_j$ on $X$. Since they conflict, the locks they need are incompatible, so $T_i$ must release its lock on $X$ before $T_j$ acquires its lock on $X$. By 2PL, $T_i$ releases nothing before its lock point, and $T_j$ acquires nothing after its lock point. So

$$
\mathrm{LP}(T_i) \;<\; \text{release}_i(X) \;<\; \text{acquire}_j(X) \;\le\; \mathrm{LP}(T_j).
$$

Every edge therefore goes from an earlier to a later lock point. A cycle $T_1 \to \dots \to T_k \to T_1$ would give $\mathrm{LP}(T_1) < \mathrm{LP}(T_1)$, impossible; so the graph is acyclic, and ordering the transactions by lock point is a topological order. By [[#thm-precedence]], the schedule is conflict-serialisable in that order.

Under strict 2PL, a transaction that wrote $X$ holds its X lock until it commits or aborts, so no other transaction can read or write $X$ before then: the schedule is strict.
:::

Strict 2PL is what most lock-based systems implement, usually holding shared locks to the end too (**rigorous 2PL**), which makes the serial order the commit order. Locks are acquired automatically: the system takes an S lock when a statement reads a row and an X lock when it writes, and releases everything at commit.

::: example Strict 2PL at work {#ex-2pl}
$T_1$ transfers £100 from A to B: $r_1(A)\, w_1(A)\, r_1(B)\, w_1(B)$. $T_2$ computes the total $A + B$: $r_2(A)\, r_2(B)$. Show how strict 2PL serialises them if $T_2$ starts just after $T_1$'s write of A.
::: solution
| step | $T_1$ | $T_2$ | locks held |
|---|---|---|---|
| 1 | X-lock A, $r_1(A)$, $w_1(A)$ | | $T_1$: X(A) |
| 2 | | requests S-lock A: **waits** | $T_1$: X(A) |
| 3 | X-lock B, $r_1(B)$, $w_1(B)$ | (waiting) | $T_1$: X(A), X(B) |
| 4 | commit, release all | | — |
| 5 | | S-lock A, $r_2(A)$; S-lock B, $r_2(B)$; commit | $T_2$: S(A), S(B) |

$T_2$ sees the state after the transfer, and the total is correct. Without locks it might have read A after the debit and B before the credit, reporting £100 too little. With 2PL that is not strict, $T_1$ could release A after acquiring B's lock (its lock point), and $T_2$ could then read A early — still serialisable, but $T_2$ would have read uncommitted data, and an abort of $T_1$ would cascade to it.
:::
:::

### Deadlocks

Locking introduces **deadlocks**: $T_1$ holds X(A) and requests X(B) while $T_2$ holds X(B) and requests X(A); each waits for the other for ever. The **waits-for graph** has an edge $T_i \to T_j$ when $T_i$ waits for a lock held by $T_j$, and a deadlock is exactly a cycle in it. Systems either **detect** deadlocks — periodically searching the waits-for graph for cycles and aborting a victim, or simply timing out long waits — or **prevent** them with timestamps. Each transaction receives a timestamp when it starts and keeps it if restarted; older means smaller timestamp. When $T_i$ requests a lock held by $T_j$:

- **wait-die**: if $T_i$ is older, it waits; otherwise $T_i$ aborts ("dies");
- **wound-wait**: if $T_i$ is older, $T_j$ aborts ("is wounded"); otherwise $T_i$ waits.

::: example A three-way deadlock {#ex-deadlock}
Under strict 2PL, $T_1$ holds X(A) and requests X(B); $T_2$ holds X(B) and requests S(C); $T_3$ holds X(C) and requests S(A). Draw the waits-for graph, and say what detection, wait-die and wound-wait do, if the timestamps are $T_1 = 1$, $T_2 = 2$, $T_3 = 3$.
::: solution
$T_1$ waits for $T_2$ (B), $T_2$ for $T_3$ (C), $T_3$ for $T_1$ (A): the cycle $T_1 \to T_2 \to T_3 \to T_1$, a deadlock. **Detection** finds the cycle and aborts a victim — typically the one that has done the least work or holds the fewest locks — say $T_3$, releasing C so $T_2$ proceeds, then $T_1$.

With prevention the cycle never forms; consider the requests in the order given. **Wait-die**: $T_1$ (older) requesting from $T_2$ waits; $T_2$ (older) requesting from $T_3$ waits; $T_3$ (younger) requesting from $T_1$ dies and restarts later with timestamp $3$. **Wound-wait**: $T_1$ requesting from younger $T_2$ wounds it — $T_2$ aborts and releases B; $T_3$ requesting from older $T_1$ waits. Each scheme aborts one transaction here, but wait-die aborts the youngest requester, wound-wait the younger holder.
:::
:::

::: widget graph
nodes: T1@0,0; T2@2,0; T3@1,1.5
edges: T1>T2; T2>T3; T3>T1
algorithm: topo
caption: The waits-for graph of [[#ex-deadlock]]. Step through the topological sort: no transaction has zero in-degree, so the sort is stuck at once and reports the cycle — the deadlock. A detector runs exactly this kind of cycle search. Remove the edge T3>T1, as if $T_3$ no longer waited for A: the sort succeeds with $T_1, T_2, T_3$, the graph is acyclic, and the waits resolve in the reverse order — $T_3$ finishes and releases C, then $T_2$ finishes and releases B, then $T_1$ proceeds.
:::

::: proposition Wait-die and wound-wait prevent deadlock {#prop-wait-die}
Under wait-die, and under wound-wait, the waits-for graph never contains a cycle, and every transaction eventually commits.
:::

::: proof
Under wait-die a transaction waits only for a younger one, so every edge of the waits-for graph goes from an older to a younger transaction; following edges strictly increases the timestamp, so there is no cycle. Under wound-wait a transaction waits only for an older one, and the same argument applies with the order reversed. For progress: a restarted transaction keeps its timestamp, so it eventually becomes the oldest active transaction. Under wait-die the oldest transaction is never aborted (it only ever waits); under wound-wait it is never made to wait and never wounded. Either way it runs to completion, so no transaction starves.
:::

### Phantoms

Locking the rows a transaction reads is not quite enough. $T_1$ runs `SELECT COUNT(*) FROM Enrolled WHERE code = 'CS202'` twice; between the two, $T_2$ inserts a new CS202 enrolment and commits. $T_1$ locked every row it read, but the new row did not exist then, so there was nothing to lock: the second count differs. The new row is a **phantom**. Preventing phantoms requires locking the *condition* rather than the rows: **predicate locks** in principle, and in practice **index-range locks** (or next-key locks) on the B+-tree range `code = 'CS202'`, which block inserts into that range ([[databases/storage-indexing]]). Without a suitable index, the whole table must be locked.

## Isolation levels

Full serialisability costs concurrency: transactions wait for locks, and long reports block updates. SQL therefore lets each transaction choose a weaker **isolation level**, defined in the SQL standard (since SQL-92) by the **phenomena** it rules out.

::: definition Isolation phenomena {#def-phenomena}
For transactions $T_1$ and $T_2$:
- **dirty read** (P1): $T_2$ reads an item written by $T_1$ before $T_1$ commits or aborts;
- **non-repeatable (fuzzy) read** (P2): $T_1$ reads an item, $T_2$ then modifies or deletes it and commits, and $T_1$ reading it again would see a different value or none;
- **phantom** (P3): $T_1$ reads the set of rows satisfying a condition, $T_2$ then inserts, deletes or updates rows so that the set changes, and $T_1$ repeating the read would see a different set.
:::

| isolation level | dirty read | non-repeatable read | phantom |
|---|---|---|---|
| READ UNCOMMITTED | possible | possible | possible |
| READ COMMITTED | not possible | possible | possible |
| REPEATABLE READ | not possible | not possible | possible |
| SERIALIZABLE | not possible | not possible | not possible |

The standard also requires SERIALIZABLE to guarantee serialisable execution, which is more than excluding three phenomena. Hal Berenson, Phil Bernstein, Jim Gray, Jim Melton and Elizabeth and Patrick O'Neil showed in "A critique of ANSI SQL isolation levels" (1995) that the phenomena are ambiguous as worded and do not characterise the levels: in a broad reading, one must also forbid **dirty writes** (P0: overwriting another transaction's uncommitted write), and several anomalies escape the table altogether — notably **lost update** (P4), **read skew** (reading related items from different moments) and **write skew**, which we meet next. Locking implementations of the levels correspond roughly to: READ COMMITTED = short-duration read locks, REPEATABLE READ = long read locks on rows, SERIALIZABLE = long read locks plus predicate (range) locks, always with long write locks.

::: quiz
$T_1$ reads the balance of account A, then $T_2$ changes A's balance and commits, then $T_1$ reads A again and sees the new value. Which is the weakest SQL isolation level for $T_1$ that rules this out?
- [ ] READ UNCOMMITTED
- [ ] READ COMMITTED
- [x] REPEATABLE READ
- [ ] SERIALIZABLE
::: solution
This is a non-repeatable read (P2): $T_2$'s write was committed, so it is not a dirty read, and READ COMMITTED allows it. REPEATABLE READ forbids it. SERIALIZABLE forbids it too, but is not the weakest level that does.
:::
:::

## Multiversion concurrency control and snapshot isolation

Locking makes readers and writers wait for each other. **Multiversion concurrency control** (MVCC) keeps several versions of each item, each stamped with the transaction that wrote it, so that a reader can be given an older, committed version instead of waiting for a writer. Most systems today use it, including PostgreSQL, Oracle, MySQL's InnoDB and SQL Server (optionally).

::: definition Snapshot isolation {#def-si}
Under **snapshot isolation** (SI), each transaction $T$ reads from a **snapshot**: the committed state of the database as of $T$'s start (plus $T$'s own writes). $T$ may commit only if no other transaction that committed after $T$ started has written an item that $T$ also wrote (**first committer wins**); otherwise $T$ aborts.
:::

SI never shows uncommitted data (no dirty reads), repeated reads see the same snapshot (no non-repeatable reads, and no phantoms in the sense of P3), and lost updates are impossible: of two concurrent transactions that both write $X$, the second to commit aborts. Readers never wait for writers or vice versa. It seems to give everything — but it is not serialisable.

::: example Write skew {#ex-write-skew}
A hospital requires that at least one of two doctors, Alice and Bob, is on call. Both are on call, and both feel unwell. Each runs a transaction: "if at least two doctors are on call, take myself off call". Show that under snapshot isolation both can commit, leaving nobody on call.
::: solution
Both transactions start from the same snapshot, in which two doctors are on call. $T_1$ reads both rows, sees $2 \ge 2$, and sets Alice's row to $0$. $T_2$ reads both rows *in its snapshot* — still $2$ — and sets Bob's row to $0$. They wrote *different* items, so first-committer-wins sees no conflict, and both commit. The final state has nobody on call, violating the rule that each transaction checked.

No serial order produces this: run serially, the second transaction would see one doctor on call and do nothing. In the schedule $r_1(A)\, r_1(B)\, r_2(A)\, r_2(B)\, w_1(A)\, w_2(B)\, c_1\, c_2$ the precedence graph has $T_2 \to T_1$ ($r_2(A)$ before $w_1(A)$) and $T_1 \to T_2$ ($r_1(B)$ before $w_2(B)$): a cycle of two **read–write anti-dependencies**. A small multiversion store with snapshot reads and first-committer-wins shows it, and shows that the lost update is prevented:

```python
class Store:
    """Multiversion store with snapshot isolation and first-committer-wins."""
    def __init__(self, data):
        self.versions = {k: [(0, v)] for k, v in data.items()}   # item -> [(commit_ts, value)]
        self.clock = 0
    def begin(self):
        return {"start": self.clock, "writes": {}}
    def read(self, tx, key):
        if key in tx["writes"]:
            return tx["writes"][key]                 # read your own writes
        return max((ts, v) for ts, v in self.versions[key] if ts <= tx["start"])[1]
    def write(self, tx, key, value):
        tx["writes"][key] = value                    # buffered until commit
    def commit(self, tx):
        for key in tx["writes"]:                     # first committer wins
            if self.versions[key][-1][0] > tx["start"]:
                return f"abort: {key} was changed by a concurrent transaction"
        self.clock += 1
        for key, value in tx["writes"].items():
            self.versions[key].append((self.clock, value))
        return "commit"

db = Store({"alice": 1, "bob": 1})                   # 1 = on call
t1, t2 = db.begin(), db.begin()
if db.read(t1, "alice") + db.read(t1, "bob") >= 2:   # "someone else is still on call"
    db.write(t1, "alice", 0)
if db.read(t2, "alice") + db.read(t2, "bob") >= 2:
    db.write(t2, "bob", 0)
print(db.commit(t1), "|", db.commit(t2))
now = db.begin()
print("on call:", db.read(now, "alice") + db.read(now, "bob"))

acct = Store({"x": 100})                             # lost update is prevented
u1, u2 = acct.begin(), acct.begin()
acct.write(u1, "x", acct.read(u1, "x") + 10)
acct.write(u2, "x", acct.read(u2, "x") + 20)
print(acct.commit(u1), "|", acct.commit(u2))
```

```console
$ python3 si.py
commit | commit
on call: 0
commit | abort: x was changed by a concurrent transaction
```
:::
:::

Write skew needs two transactions that each read what the other writes, and write disjoint items. Alan Fekete, Elizabeth O'Neil, Patrick O'Neil and others showed in 2005 that every non-serialisable SI execution contains such a structure: a cycle in the dependency graph with two consecutive read–write anti-dependency edges. **Serializable snapshot isolation** (SSI; Michael Cahill, Uwe Röhm and Alan Fekete, 2008) keeps the benefits of SI and tracks anti-dependencies at run time, aborting a transaction when two consecutive ones appear. It may abort some transactions unnecessarily, but it never allows a non-serialisable execution. Applications can also avoid write skew under plain SI by **materialising the conflict**: make both transactions write a common row (for example a per-shift counter), or lock the rows they read with `SELECT … FOR UPDATE`.

### What real systems do

The standard names four levels; systems map them onto their own mechanisms, so the *same name* can mean different guarantees. As documented for current versions (as of 2026; PostgreSQL was not available on the machine used for this course, so its behaviour is stated from its documentation, not demonstrated):

- **PostgreSQL** uses MVCC. Its default is READ COMMITTED, where *each statement* sees a fresh snapshot. READ UNCOMMITTED is accepted but behaves as READ COMMITTED: PostgreSQL never shows dirty data. REPEATABLE READ is snapshot isolation: the whole transaction sees one snapshot, phantoms in the P3 sense cannot occur (stronger than the standard requires), but write skew can; a transaction that tries to update a row changed by a concurrent committed transaction fails with a serialisation error and must be retried. SERIALIZABLE (since version 9.1, 2011) is SSI and is truly serialisable; applications must be prepared to retry transactions aborted with serialisation failures.
- **SQLite** gives serialisable transactions by allowing only one writer at a time for the whole database. In its write-ahead-log (WAL) mode, readers see a snapshot and never block the writer. A read transaction that later tries to write, after another transaction has committed a newer version, is refused — so the write skew of [[#ex-write-skew]] cannot happen:

```python
import sqlite3

def connect():
    con = sqlite3.connect("oncall.db", timeout=0, isolation_level=None)   # we issue BEGIN ourselves
    con.execute("PRAGMA journal_mode = WAL")    # readers see a snapshot; one writer at a time
    return con

setup = connect()
setup.executescript("""DROP TABLE IF EXISTS Doctor;
CREATE TABLE Doctor (name TEXT PRIMARY KEY, on_call INTEGER);
INSERT INTO Doctor VALUES ('Alice', 1), ('Bob', 1);""")

a, b = connect(), connect()
for con in (a, b):
    con.execute("BEGIN")                         # deferred: becomes a read transaction
    n = con.execute("SELECT COUNT(*) FROM Doctor WHERE on_call = 1").fetchone()[0]
    print("sees", n, "doctors on call")
a.execute("UPDATE Doctor SET on_call = 0 WHERE name = 'Alice'")
a.execute("COMMIT")
try:
    b.execute("UPDATE Doctor SET on_call = 0 WHERE name = 'Bob'")
    b.execute("COMMIT")
except sqlite3.OperationalError as e:
    print("second writer:", e, e.sqlite_errorname)
    b.execute("ROLLBACK")
print(setup.execute("SELECT * FROM Doctor").fetchall())
```

```console
$ python3 sqlite_skew.py
sees 2 doctors on call
sees 2 doctors on call
second writer: database is locked SQLITE_BUSY_SNAPSHOT
[('Alice', 0), ('Bob', 1)]
```

The second transaction's snapshot is out of date, so SQLite refuses its write with `SQLITE_BUSY_SNAPSHOT`; the application must roll back and retry, and on retry it sees only one doctor on call. The price of this simplicity is that writers never run concurrently.

::: warning "Repeatable read" and "serializable" do not mean the same thing everywhere
It is tempting to assume that a transaction at REPEATABLE READ, or even one labelled SERIALIZABLE in some system, behaves like a serial execution. Neither is safe to assume. The standard's REPEATABLE READ permits phantoms; PostgreSQL's REPEATABLE READ forbids phantoms but permits write skew, so it is neither stronger nor weaker than the locking version (Berenson et al. showed SI and locking REPEATABLE READ to be incomparable). Some systems have historically offered snapshot isolation under the name SERIALIZABLE (Oracle's SERIALIZABLE level is snapshot isolation). Before relying on an isolation level to protect an invariant that spans several rows — "at least one doctor on call", "total booked ≤ capacity" — read the system's documentation for that level, and test the concurrent case.
:::

::: history
The transaction concept was developed at IBM in the System R project. Kapali Eswaran, Jim Gray, Raymond Lorie and Irving Traiger's "The notions of consistency and predicate locks in a database system" (*Communications of the ACM*, 1976) defined serialisability, proved that two-phase locking guarantees it, and identified the phantom problem; Gray, Lorie, Putzolu and Traiger's "Granularity of locks and degrees of consistency" (1976) introduced hierarchical locks and the degrees of consistency that became the SQL isolation levels. Christos Papadimitriou's "The serializability of concurrent database updates" (*JACM*, 1979) gave the theory of conflict and view serialisability. Rosenkrantz, Stearns and Lewis proposed wait-die and wound-wait in 1978; David Reed (1978) and Philip Bernstein and Nathan Goodman (1983) developed multiversion concurrency control. Theo Härder and Andreas Reuter coined the acronym ACID in 1983. Berenson and colleagues' critique of the ANSI levels, which defined snapshot isolation and write skew, appeared at SIGMOD 1995; Cahill, Röhm and Fekete's serializable snapshot isolation (SIGMOD 2008) was implemented in PostgreSQL 9.1 by Dan Ports and Kevin Grittner (described in their VLDB 2012 paper). Jim Gray and Andreas Reuter's *Transaction Processing: Concepts and Techniques* (1992) is the classic treatise.
:::

## Where this leads

Isolation is half of ACID; the recovery manager ([[databases/recovery]]) supplies atomicity and durability with logging, and its interaction with locking — strict schedules make undo safe — is why strict 2PL is the norm. Distributed databases need transactions across machines, with two-phase commit and consensus protocols ([[distributed-systems]]), and weaker consistency models for replicated data, a spectrum Kleppmann's book maps out. Concurrency in operating systems — mutexes, deadlock, starvation — is the same problem at a lower level ([[operating-systems]]), and cycle detection in waits-for and precedence graphs is graph search ([[algorithms/graph-search]]).

::: summary
- A **transaction** is executed with the **ACID** guarantees; concurrency control provides isolation, recovery provides atomicity and durability.
- A schedule is **conflict-serialisable** iff its **precedence graph** is acyclic ([[#thm-precedence]]); a topological order gives an equivalent serial schedule.
- **Recoverable**, **cascadeless** and **strict** schedules control the damage of aborts; strict schedules make undo simple.
- **Two-phase locking** guarantees conflict serialisability, in lock-point order ([[#thm-2pl]]); **strict 2PL** also guarantees strictness. Locks cause **deadlocks**, handled by detection or by wait-die / wound-wait; **phantoms** need predicate or index-range locks.
- The SQL **isolation levels** are defined by dirty reads, non-repeatable reads and phantoms, a definition shown by Berenson et al. (1995) to be incomplete.
- **MVCC** with **snapshot isolation** lets readers and writers proceed without waiting and prevents lost updates, but allows **write skew**; **SSI** makes it serialisable.
- Systems map level names to different mechanisms: PostgreSQL's REPEATABLE READ is SI, its SERIALIZABLE is SSI; SQLite serialises writers.
:::

## Exercises

::: exercise Counting schedules {level=1 check="10"}
$T_1$ has $2$ operations and $T_2$ has $3$. How many schedules of $T_1$ and $T_2$ are there? How many are serial? (Enter the number of schedules.)
::: solution
A schedule is determined by which $2$ of the $5$ positions hold $T_1$'s operations (each transaction's own order is fixed): $\binom{5}{2} = 10$ schedules. Two of them are serial ($T_1 T_2$ and $T_2 T_1$).
:::
:::

::: exercise Counting conflicts {level=1 check="3"}
How many pairs of conflicting operations does $r_1(A)\; r_2(A)\; w_1(B)\; w_2(A)\; r_1(A)\; r_2(B)$ contain? (Enter the number.)
::: solution
Pairs from different transactions on the same item with at least one write: on $A$, $(r_1(A), w_2(A))$ and $(w_2(A), r_1(A))$ — the second read of $T_1$ comes after $w_2(A)$; $(r_2(A), \cdot)$ pairs only with reads of $T_1$, which do not conflict. On $B$, $(w_1(B), r_2(B))$. Total $3$. The precedence graph has $T_1 \to T_2$ (from the first and third) and $T_2 \to T_1$ (from the second): a cycle, so the schedule is not conflict-serialisable — $T_1$ reads $A$ both before and after $T_2$ writes it.
:::
:::

::: exercise Naming the phenomenon {level=1}
Name the phenomenon of [[#def-phenomena]] (or the anomaly of Berenson et al.) in each: (a) $w_1(X)\; r_2(X)\; a_1$; (b) $T_1$ counts the rows with `code = 'CS202'`, $T_2$ inserts one and commits, $T_1$ counts again; (c) $r_1(X)\; r_2(X)\; w_1(X)\; w_2(X)\; c_1\; c_2$.
::: solution
(a) Dirty read: $T_2$ read a value that was never committed. (b) Phantom: the set of rows satisfying the condition changed. (c) Lost update: $T_1$'s write is overwritten by $T_2$, which had read $X$ before $T_1$ wrote it; neither a dirty read nor, strictly, a non-repeatable read, since neither transaction reads $X$ twice — one of the gaps in the standard's table.
:::
:::

::: exercise Lost updates {level=2 check="2"}
$T_1 = r_1(X)\, w_1(X)$ and $T_2 = r_2(X)\, w_2(X)$. How many of their $6$ schedules are conflict-serialisable? (Enter the number.)
::: solution
The non-serial schedules each start with one transaction's read and then interleave: $r_1 r_2 w_1 w_2$, $r_1 r_2 w_2 w_1$, $r_2 r_1 w_1 w_2$, $r_2 r_1 w_2 w_1$. In every one, both reads precede both writes, so $r_1(X)$ precedes $w_2(X)$ ($T_1 \to T_2$) and $r_2(X)$ precedes $w_1(X)$ ($T_2 \to T_1$): a cycle. So only the $2$ serial schedules are conflict-serialisable, and every interleaving loses an update.
:::
:::

::: exercise Is it 2PL? {level=2}
Can the schedule $r_1(A)\; w_2(B)\; r_1(B)\; w_1(C)\; r_2(C)$ (with commits at the end) be produced by 2PL? By strict 2PL? Give lock and unlock steps or explain why not.
::: solution
The precedence graph has $T_2 \to T_1$ ($w_2(B)$ before $r_1(B)$) and $T_1 \to T_2$ ($w_1(C)$ before $r_2(C)$): a cycle. By [[#thm-2pl]] no 2PL execution produces a non-conflict-serialisable schedule, so the answer is no for both. Concretely: $T_1$ needs S(B) after $T_2$'s X(B) is released, so $T_2$ must be in its shrinking phase before $r_1(B)$; but $T_2$ later needs S(C), after $T_1$ releases X(C) — a lock acquisition in the shrinking phase, which 2PL forbids.
:::
:::

::: exercise Recoverability {level=2}
Classify each schedule as not recoverable, recoverable but not cascadeless, cascadeless but not strict, or strict: (a) $w_1(X)\; r_2(X)\; c_2\; c_1$; (b) $w_1(X)\; r_2(X)\; c_1\; c_2$; (c) $w_1(X)\; w_2(X)\; c_1\; c_2$; (d) $w_1(X)\; c_1\; r_2(X)\; w_2(X)\; c_2$.
::: solution
(a) $T_2$ reads from $T_1$ and commits first: **not recoverable**. (b) $T_2$ reads uncommitted data but commits after $T_1$: **recoverable, not cascadeless**. (c) No transaction reads, so it is cascadeless; but $T_2$ overwrites $X$ before $T_1$ commits, so it is **cascadeless but not strict** — if $T_1$ aborted, restoring its before-image would wipe out $T_2$'s write. (d) $T_2$ touches $X$ only after $T_1$ commits: **strict**.
:::
:::

::: exercise Wait-die and wound-wait {level=2}
Transactions $T_1, T_2, T_3$ have timestamps $10, 20, 30$ (smaller is older). $T_2$ holds a lock that $T_1$ requests, and $T_3$ holds a lock that $T_2$ requests. What happens under wait-die and under wound-wait?
::: solution
Wait-die (older waits, younger dies): $T_1$ is older than $T_2$, so $T_1$ waits; $T_2$ is older than $T_3$, so $T_2$ waits. Both wait; no deadlock, since waits go from older to younger. Wound-wait (older wounds, younger waits): both requests come from a transaction older than the holder, so both holders are wounded. $T_1$'s request aborts $T_2$, and $T_1$ gets the lock; if $T_2$'s request to $T_3$ was made first, it aborts $T_3$ too (otherwise $T_2$, restarted later with timestamp $20$, will wound $T_3$ when it asks again, unless $T_3$ has finished). Nobody waits at all. Wound-wait aborts more eagerly but never makes an old transaction wait.
:::
:::

::: exercise View but not conflict serialisable {level=3}
Prove that $S = r_1(X)\; w_2(X)\; w_1(X)\; w_3(X)$ (all committing) is serialisable — it has the same effect as $T_1, T_2, T_3$ for every initial state and every computation — but not conflict-serialisable.
::: solution
*Not conflict-serialisable*: $r_1(X)$ before $w_2(X)$ gives $T_1 \to T_2$; $w_2(X)$ before $w_1(X)$ gives $T_2 \to T_1$. The cycle rules it out by [[#thm-precedence]].

*Serialisable*: compare $S$ with the serial schedule $T_1 T_2 T_3 = r_1(X)\, w_1(X)\, w_2(X)\, w_3(X)$. In both, the only read, $r_1(X)$, reads the initial value of $X$, so $T_1$ computes the same values; $T_2$ and $T_3$ read nothing, so the values they write are fixed functions of nothing that differs. The final value of $X$ is the one written by $T_3$ in both, because $w_3(X)$ is the last write in both. So every read sees the same value and the final state is the same, for all initial states and computations. ($S$ is **view-serialisable**: same reads-from relation and same final writes as a serial schedule.)
:::
:::

::: exercise Starvation-freedom of wound-wait {level=3}
Prove carefully that under wound-wait every transaction eventually commits, assuming that every transaction that is never aborted finishes in finite time and that a finite number of transactions is started in any finite period. What goes wrong if a restarted transaction is given a new timestamp?
::: solution
Consider a transaction $T$ with timestamp $t$, kept across restarts. Only finitely many transactions have timestamps smaller than $t$ (they started earlier, finitely many in any finite period), and each of them, by induction on timestamp order, eventually commits — the oldest active transaction is never wounded (only older transactions wound) and never waits for anyone older (there is none), so it finishes in finite time; then the next oldest becomes oldest, and so on. After all transactions older than $T$ have finished, $T$ is the oldest active transaction, cannot be wounded, and is never made to wait except by a younger transaction — which it wounds. So $T$ finishes. If a restarted transaction received a fresh, larger timestamp, it could be wounded again and again by older transactions started meanwhile, and starve.
:::
:::

::: exercise Materialising the conflict {level=3}
Extend the on-call example of [[#ex-write-skew]] so that write skew is impossible under snapshot isolation: add an item that both transactions must write, and show with the `Store` class that one of the two transactions now aborts. Why does this work, and what does it cost?
::: solution
Add an item `shift` (a version counter for the rota) that every transaction changing the on-call status must increment:

```python
db = Store({"alice": 1, "bob": 1, "shift": 0})
t1, t2 = db.begin(), db.begin()
for t, me in ((t1, "alice"), (t2, "bob")):
    if db.read(t, "alice") + db.read(t, "bob") >= 2:
        db.write(t, me, 0)
        db.write(t, "shift", db.read(t, "shift") + 1)   # both now write a common item
print(db.commit(t1), "|", db.commit(t2))
```

```console
$ python3 si_fix.py
commit | abort: shift was changed by a concurrent transaction
```

Both transactions write `shift`, so first-committer-wins aborts the second; retried, it sees one doctor on call and does nothing. The read–write anti-dependencies that made write skew possible have been turned into a write–write conflict, which SI detects. The cost is that *all* rota changes now conflict with each other, even unrelated ones (with many doctors, two doctors going off call when ten are on duty would also clash), reducing concurrency; SSI achieves the same safety automatically, with fewer unnecessary aborts.
:::
:::
