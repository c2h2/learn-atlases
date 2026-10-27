A transaction has transferred £100 from account A to account B and the application has been told "committed". A second later the power fails. When the server restarts, the transfer must be there — **durability** — even if the pages holding A and B were still in the buffer pool and had never been written to disk. Another transaction was half-way through when the power failed; it had already written some changed pages to disk to make room in the buffer pool. Its changes must be gone — **atomicity** — even though some of them are on disk. Recovery is the part of the DBMS that makes both promises true, whatever the timing of the crash.

The tool is a **log**: an append-only record of every change, written to stable storage *before* the changes it describes. This chapter develops logging from first principles — buffer policies, undo and redo information, the **write-ahead logging** rule and checkpoints — and then presents **ARIES**, the recovery algorithm of C. Mohan and colleagues at IBM (1992) that is the basis of most commercial systems. We trace ARIES on a complete example, verified by a small simulation, and prove why it is correct even if the system crashes again during recovery. Concurrency control, which this chapter assumes, is in [[databases/transactions]]; the buffer manager in [[databases/storage-indexing]].

## Failures and storage

We distinguish three kinds of failure.

- **Transaction failure**: a transaction aborts — by its own `ROLLBACK`, by violating a constraint, or because the concurrency-control manager chose it as a deadlock victim. Its effects must be undone while the system keeps running.
- **System crash**: power failure, operating-system or DBMS failure. The contents of main memory, including the buffer pool, are lost; the contents of persistent storage survive.
- **Media failure**: a disk or SSD loses data. This is handled by redundancy — replicated logs, RAID, backups plus archived logs — and is outside the scope of crash recovery proper.

Recovery assumes **stable storage**, which never loses data that has been written to it. No real device is stable, but stable storage is approximated well by writing to several independent devices (mirrored disks, replicas in other machines) and confirming each write. Writing is done in pages, and a crash can interrupt a page write half-way (a **torn page**); systems detect this with checksums and repair it from a full copy of the page in the log — PostgreSQL's "full-page writes" — or from a second copy elsewhere.

### Buffer policies

Two decisions of the buffer manager determine what recovery must do.

::: definition Steal and force {#def-steal-force}
A buffer manager uses a **steal** policy if it may write a page modified by an *uncommitted* transaction to persistent storage (to free a frame), and **no-steal** otherwise. It uses a **force** policy if all pages modified by a transaction are written to persistent storage before the transaction is reported as committed, and **no-force** otherwise.
:::

::: proposition What recovery must be able to do {#prop-policies}
With steal, recovery must be able to **undo** changes of uncommitted transactions that reached persistent storage. With no-force, it must be able to **redo** changes of committed transactions that had not reached persistent storage. No-steal with force needs neither undo nor redo for a crash.
:::

::: proof
After a crash, the persistent database contains exactly the pages written before the crash. Under steal, such a page may contain a change by a transaction that never committed; atomicity requires removing it, so its old value must be recoverable — undo. Under no-force, a committed transaction's change may exist only in a lost buffer frame; durability requires reinstating it, so its new value must be recoverable — redo. Under no-steal, no uncommitted change is ever on disk, and under force every committed change is; with both, the disk after a crash contains exactly the committed changes, provided the writes of a committing transaction are themselves atomic (which in practice needs a log or shadow pages after all).
:::

No-steal limits the size of transactions to the buffer pool, and force makes every commit wait for random writes of all its pages. High-performance systems therefore use **steal and no-force** — the most flexible buffer policy and the most demanding for recovery: both undo and redo are needed.

::: example What a crash leaves behind {#ex-crash-state}
Under steal and no-force, $T_1$ changed $X$ from $1$ to $2$ and committed; $T_2$ changed $Y$ from $5$ to $6$ and is still running. The buffer manager wrote $Y$'s page to disk (to free a frame) but not $X$'s. The system crashes. What is on disk, and what must recovery do?
::: solution
On disk: $X = 1$ (the committed change was never written) and $Y = 6$ (an uncommitted change was stolen to disk). The correct state is $X = 2$, $Y = 5$. Recovery must **redo** $T_1$'s change, using its after-image $2$, and **undo** $T_2$'s, using its before-image $5$. Under force, $X$'s page would have been written at $T_1$'s commit, so no redo would be needed; under no-steal, $Y$'s page could not have been written, so no undo would be needed. Both images must therefore be in the log, which is where [[#def-log]] puts them.
:::
:::

## The log

::: definition Log and log records {#def-log}
The **log** is a sequence of records, each identified by a **log sequence number** (LSN) that increases with the position in the log. An **update record** for a change by transaction $T$ to item $X$ on page $P$ contains $T$, $P$, the **before-image** (old value, for undo) and the **after-image** (new value, for redo), and the LSN of $T$'s previous log record (**prevLSN**). Other records mark **commit**, **abort** and **end** of a transaction, and **checkpoints**. Each data page stores in its header the **pageLSN**: the LSN of the latest log record whose change it contains.
:::

The log is written sequentially into a **log buffer** in memory and **flushed** (forced) to stable storage at certain moments; appending is cheap and sequential, which is why logging beats forcing data pages. The **flushedLSN** is the largest LSN known to be on stable storage. Two rules link the log to the data.

::: definition Write-ahead logging (WAL) {#def-wal}
1. **Undo rule**: before a data page is written to persistent storage, all log records describing changes to it — in particular the one with LSN equal to its pageLSN — must have been written to stable storage: $\text{pageLSN} \le \text{flushedLSN}$.
2. **Redo rule**: before a transaction is reported as committed, all its log records, including the commit record, must be on stable storage.
:::

::: theorem Write-ahead logging makes recovery possible {#thm-wal}
Under steal and no-force, if the WAL rules are followed then after any crash the log on stable storage contains (a) the before-image of every change by an uncommitted transaction that is present in the persistent database, and (b) the after-image of every change by a committed transaction.
:::

::: proof
(a) Let a change by uncommitted $T$, with log record of LSN $\ell$, be present in a page on disk. The page was written while it contained the change, so its pageLSN at that time was at least $\ell$; by the undo rule the log was flushed at least up to that pageLSN, hence up to $\ell$, before the write. So the record with the before-image is on stable storage. (b) If $T$ committed, it was reported committed only after all its log records, including every update record with its after-image, were flushed (redo rule). Records on stable storage survive the crash.
:::

::: example Breaking the undo rule {#ex-wal-violation}
$T$ changes $X$ from $5$ to $6$ (log record $\ell = 70$, still in the log buffer). The buffer manager writes $X$'s page to disk *before* flushing the log, and the system crashes before $T$ commits. What happens at restart? What if instead the log had been flushed but $T$'s commit acknowledged before its commit record was?
::: solution
At restart the page holds $X = 6$, a change of a transaction that never committed, and must be undone. But record $70$, the only place where the before-image $5$ was kept, was lost with the log buffer: recovery cannot even tell that $X$ was changed, let alone restore it. The database silently contains a non-atomic transaction. The undo rule ($\text{pageLSN} = 70 \le \text{flushedLSN}$ before writing the page) prevents exactly this.

In the second case $T$'s update record is on stable storage but its commit record is not; recovery treats $T$ as a loser and undoes it, although the user was told it committed — a durability violation. The redo rule forbids acknowledging the commit until the commit record is flushed.
:::
:::

So the commit point of a transaction is the moment its commit record reaches stable storage: a crash before that point leaves a transaction that must be undone, a crash after it one that must be redone. Commit costs one sequential log flush instead of many random page writes. **Group commit** makes even that cheaper: a single flush makes the commit records of many concurrent transactions durable at once. If a flush takes $2$ ms, committing one transaction per flush allows at most $500$ commits per second, while flushing a group of $32$ commit records together allows up to $16\,000$ ([[#ex-group-commit]]).

### Redo and idempotence

Recovery may be interrupted by another crash and restarted, so every action it takes must be safe to repeat. Physical redo — "set item $X$ on page $P$ to the after-image" — is **idempotent**: doing it twice has the same effect as doing it once. But many systems log *logical* or *physiological* operations ("insert this record into page $P$", "add $10$ to $X$"), which are not idempotent: adding $10$ twice adds $20$. The pageLSN solves this.

::: lemma Redo with the pageLSN test is idempotent {#lem-pagelsn}
Suppose a page's pageLSN is set to $\ell$ whenever the change of the log record with LSN $\ell$ is applied to it, and that changes to a page are applied in LSN order. If redo applies the record with LSN $\ell$ to page $P$ only when $\text{pageLSN}(P) < \ell$, then every logged change is applied to its page exactly once, however many times redo is repeated.
:::

::: proof
Changes to a page are applied in increasing LSN order, and each application sets the pageLSN to that LSN, so at any moment the page contains exactly the changes with LSN at most its pageLSN — those were applied — and none of the later ones. When redo considers record $\ell$: if $\text{pageLSN}(P) \ge \ell$, the change is already in the page and is skipped; otherwise it is not, it is applied, and the pageLSN becomes $\ell$. A repeated pass finds $\text{pageLSN}(P) \ge \ell$ and skips it. By induction over the records in LSN order, each change is applied exactly once.
:::

### Checkpoints

Without help, recovery would have to read the log from the very beginning. A **checkpoint** records enough of the system's state that recovery can start near the end. A **quiescent** checkpoint stops new transactions, waits for active ones to finish and flushes all dirty pages — simple, but it halts the system. ARIES uses **fuzzy checkpoints**: write a `begin_checkpoint` record, then an `end_checkpoint` record containing the current **transaction table** and **dirty page table** (defined below), force the log, and store the LSN of the `begin_checkpoint` in a known place on stable storage, the **master record**. Nothing waits and no page needs to be flushed; the dirty page table tells recovery where redo must start. To keep that point recent, the buffer manager writes dirty pages to disk steadily in the background.

::: widget plot
f: c/x + k*x/2
sliders: c=1:1:60; k=0.1:0.1:5
x: 0.5, 60
y: 0, 60
labels: \text{expected cost per hour} = c/x + kx/2
caption: A simple model of the checkpoint interval. Checkpoints every $x$ minutes cost $c/x$ (the work of writing checkpoints and flushing pages, $c$ per checkpoint), while the expected recovery work after a crash grows with the amount of log since the last checkpoint, about $kx/2$ ($k$ combines the crash rate and the redo cost per minute of log). The total is smallest at $x^* = \sqrt{2c/k}$, where both terms are equal. Drag $c$ and $k$: frequent crashes or expensive redo favour frequent checkpoints, expensive checkpoints favour rare ones, and the optimum moves only with the square root.
:::

## ARIES

ARIES (Algorithm for Recovery and Isolation Exploiting Semantics) works with steal and no-force, fine-grained (record-level) locking, and logical undo, and rests on three principles:

1. **Write-ahead logging**, as in [[#def-wal]].
2. **Repeating history during redo**: after a crash, first redo *all* logged changes — including those of transactions that will be rolled back — to bring the database to exactly the state it was in at the crash.
3. **Logging changes during undo**: every undo action is itself logged, in a **compensation log record** (CLR), so that an undo is never undone and recovery makes progress across repeated crashes.

::: definition ARIES data structures {#def-aries}
- Every log record has an LSN and a prevLSN (the previous record of the same transaction).
- A **compensation log record** (CLR) describes the undo of one update record $u$: it contains the redo information for the undo (the before-image of $u$ as its new value) and an **undoNextLSN**, the prevLSN of $u$ — the next record of the transaction still to be undone. CLRs are redone but never undone.
- The **transaction table** (TT) has one entry per active transaction: its status (running/aborting, or committed) and **lastLSN**, the LSN of its most recent log record.
- The **dirty page table** (DPT) has one entry per page that is dirty in the buffer pool, with **recLSN**: the LSN of the first log record that made the page dirty since it was last written to disk.
:::

During normal operation, every update appends a record, sets the page's pageLSN, and updates the transaction's lastLSN; when a page first becomes dirty it enters the DPT with its recLSN, and it leaves when it is written. A transaction that aborts writes an abort record and is rolled back exactly as in the undo phase below, writing CLRs, and finally an end record. A committing transaction writes a commit record, forces the log (redo rule), releases its locks, and later writes an end record.

::: example A normal abort {#ex-abort}
Transaction $T$ writes update records $200$ ($X$: $1 \to 2$), $210$ ($Y$: $3 \to 4$) and $220$ ($Z$: $5 \to 6$), each with prevLSN pointing to the previous one, and then the application calls `ROLLBACK`. Which log records does ARIES write, and what do they contain?
::: solution
First an abort record, LSN $230$ (prevLSN $220$). Then $T$'s records are undone in reverse order, each undo logged by a CLR:

| LSN | record | change | undoNextLSN |
|---|---|---|---|
| 240 | CLR for 220 | $Z \gets 5$ | 210 |
| 250 | CLR for 210 | $Y \gets 3$ | 200 |
| 260 | CLR for 200 | $X \gets 1$ | — |
| 270 | end | | |

Each CLR's undoNextLSN is the prevLSN of the record it compensates. If the system crashed after $250$ reached stable storage, restart would redo the CLRs $240$ and $250$, find $T$ as a loser with lastLSN $250$, follow the undoNextLSN to $200$, and write only one more CLR — the work of $240$ and $250$ is not repeated. Locks are released only after the end record, so no other transaction sees the half-undone state.
:::
:::

::: algorithm ARIES restart {#alg-aries}
1. **Analysis.** Read the master record and start at the last `begin_checkpoint`; initialise TT and DPT from the `end_checkpoint`. Scan the log forward to its end. For each record of transaction $T$: if it is an end record, remove $T$ from TT; otherwise add $T$ if absent, set its lastLSN to this LSN, and set its status to committed if the record is a commit record. For an update record or CLR on page $P$, if $P$ is not in the DPT, add it with recLSN equal to this LSN. At the end, the transactions in TT that have not committed are the **losers**.
2. **Redo.** Scan forward from $\mathit{redoLSN}$, the smallest recLSN in the DPT. For each update record or CLR with LSN $\ell$ on page $P$, *skip* it if $P$ is not in the DPT, or $\text{recLSN}(P) > \ell$, or (after reading $P$) $\text{pageLSN}(P) \ge \ell$; otherwise reapply the change and set $\text{pageLSN}(P) \gets \ell$. Then write end records for the committed transactions in TT and remove them.
3. **Undo.** Let ToUndo be the set of lastLSNs of the losers. Repeatedly remove the largest LSN $\ell$ from ToUndo:
   - if record $\ell$ is a CLR, add its undoNextLSN to ToUndo (if it is null, write an end record for its transaction);
   - if it is an update record, undo the change, write a CLR whose undoNextLSN is the record's prevLSN, and add that prevLSN to ToUndo (if it is null, write an end record);
   - if it is an abort record, add its prevLSN.
:::

The redo phase repeats *all* history, losers included, because it makes the undo phase simple: after redo the database is exactly as at the crash, so undo can roll the losers back as if they were aborting normally, using logical undo where needed (for instance in an index, where a key may have moved to another page since). The skip conditions avoid reading pages unnecessarily: a page not in the DPT, or with a recLSN after $\ell$, was written to disk after the change of record $\ell$, so the change is already there.

::: example A complete ARIES restart {#ex-aries}
The log after the last checkpoint (whose TT and DPT were empty) is as follows; items $A, E$ are on page $P_1$, $B$ on $P_2$, $C$ on $P_3$, $D$ on $P_4$.

| LSN | transaction | record | prevLSN |
|---|---|---|---|
| 30 | $T_1$ | update $P_1$: $A$ $10 \to 20$ | — |
| 40 | $T_2$ | update $P_2$: $B$ $5 \to 7$ | — |
| 50 | $T_1$ | update $P_3$: $C$ $1 \to 2$ | 30 |
| 60 | $T_2$ | commit | 40 |
| 70 | $T_3$ | update $P_4$: $D$ $8 \to 9$ | — |
| 80 | $T_2$ | end | 60 |
| 90 | $T_1$ | update $P_2$: $B$ $7 \to 70$ | 50 |
| 100 | $T_3$ | update $P_1$: $E$ $3 \to 4$ | 70 |
| 110 | $T_3$ | abort | 100 |
| 120 | $T_3$ | CLR: undo of 100, $E \gets 3$, undoNextLSN $70$ | 110 |

Then the system crashes. On disk, $P_1$ was last written with pageLSN $100$ (it holds $A = 20$, $E = 4$), $P_2$ with pageLSN $40$ ($B = 7$), and $P_3$, $P_4$ were never written ($C = 1$, $D = 8$). Carry out the restart.
::: solution
**Analysis.** Scanning from LSN $30$: $T_1$ enters TT, $P_1$ enters the DPT with recLSN $30$; $T_2$ and $P_2$ (recLSN $40$); $P_3$ (recLSN $50$); $T_2$ becomes committed at $60$; $T_3$ and $P_4$ (recLSN $70$); $T_2$ leaves TT at $80$; then lastLSNs advance. At the end: TT $= \set{T_1\colon \text{lastLSN } 90,\ T_3\colon \text{lastLSN } 120}$, both losers; DPT $= \set{P_1\colon 30, P_2\colon 40, P_3\colon 50, P_4\colon 70}$.

**Redo** from $\mathit{redoLSN} = 30$:

| LSN | page | pageLSN on disk | action |
|---|---|---|---|
| 30 | $P_1$ | 100 | skip ($100 \ge 30$) |
| 40 | $P_2$ | 40 | skip ($40 \ge 40$) |
| 50 | $P_3$ | 0 | redo $C = 2$, pageLSN $50$ |
| 70 | $P_4$ | 0 | redo $D = 9$, pageLSN $70$ |
| 90 | $P_2$ | 40 | redo $B = 70$, pageLSN $90$ |
| 100 | $P_1$ | 100 | skip |
| 120 | $P_1$ | 100 | redo CLR: $E = 3$, pageLSN $120$ |

The database is now as at the crash: $A = 20$, $E = 3$, $B = 70$, $C = 2$, $D = 9$.

**Undo** with ToUndo $= \set{90, 120}$ (new records get LSNs $130, 140, \ldots$):

| take | record | action | ToUndo after |
|---|---|---|---|
| 120 | CLR of $T_3$ | nothing to undo; follow undoNextLSN | $\set{90, 70}$ |
| 90 | $T_1$ update $B$ | $B \gets 7$; write CLR 130 (undoNext 50) | $\set{70, 50}$ |
| 70 | $T_3$ update $D$ | $D \gets 8$; write CLR 140 (undoNext —); end of $T_3$ at 150 | $\set{50}$ |
| 50 | $T_1$ update $C$ | $C \gets 1$; write CLR 160 (undoNext 30) | $\set{30}$ |
| 30 | $T_1$ update $A$ | $A \gets 10$; write CLR 170 (undoNext —); end of $T_1$ at 180 | $\emptyset$ |

Final state: $A = 10$, $E = 3$, $B = 7$, $C = 1$, $D = 8$. The committed $T_2$'s change $B = 7$ survives (it was overwritten by loser $T_1$ and restored by undoing $T_1$), and every change of the losers $T_1$ and $T_3$ is gone. Note that the CLR $120$ made the undo skip records $110$ and $100$ of $T_3$: their undo had already been done and logged before the crash. A simulation of [[#alg-aries]] in Python ([[#ex-implement]]) prints exactly these steps.
:::
:::

The undo phase follows backward chains in the log: prevLSN pointers within a transaction and, from a CLR, the undoNextLSN, which jumps over the records that have already been compensated.

::: widget graph
nodes: L30@0,0; L50@1,0; L90@2,0; L70@0,1.2; L100@1,1.6; L110@2,1.6; L120@3,1.2
edges: L90>L50; L50>L30; L120>L70; L110>L100; L100>L70
algorithm: bfs
start: L120
caption: The backward chains the undo phase of [[#ex-aries]] follows: $T_1$'s prevLSN chain $90 \to 50 \to 30$ along the bottom, and $T_3$'s records along the top, where the CLR $120$ points by its undoNextLSN straight to $70$. Breadth-first search from L120 reaches only L70: records $110$ and $100$ are never visited, because their undo was completed and logged before the crash. Start the search at L110 to see the chain an undo would follow without the CLR — it would undo $100$ a second time.
:::

### Correctness

::: theorem Correctness of ARIES restart {#thm-aries}
Assume WAL, strict two-phase locking, and that the log on stable storage at the crash is a prefix of the log written. Then after [[#alg-aries]] completes, the database contains every change of every transaction whose commit record is in the log, and no change of any other transaction. The same holds if the system crashes any number of times during restart and restart is begun again.
:::

::: proof
*After redo, the database equals the state at the crash, as far as logged changes go.* Consider any update record or CLR $\ell$ in the stable log, on page $P$. If $\ell$ is before $\mathit{redoLSN}$, or $P$ is not in the DPT, or $\text{recLSN}(P) > \ell$, then by construction of the DPT (from the checkpoint and the analysis scan) $P$ was written to disk after the change $\ell$ had been applied, so the change is on disk. Otherwise redo applies it if and only if $\text{pageLSN}(P) < \ell$, and by [[#lem-pagelsn]] every change is then present exactly once. Changes not in the stable log are, by the undo rule of WAL, on no page on disk. So after redo every page reflects exactly the changes of the stable log.

*Undo removes exactly the losers' changes.* Winners have commit records, so their changes stay. For a loser, the undo phase follows its chain of records backwards from lastLSN, by prevLSN and by the undoNextLSN of CLRs. A CLR with undoNextLSN $u$ records that every update of the transaction after $u$ has already been undone (each by a CLR that is itself in the log, and was redone), so continuing at $u$ undoes each remaining update exactly once, in reverse order. Strict 2PL guarantees that no other transaction has overwritten or read an item changed by the loser since, so restoring the before-images (or applying the logical inverse) yields the values the items had before the loser touched them. Processing the losers in globally decreasing LSN order interleaves them correctly.

*Repeated crashes.* Redo is idempotent by [[#lem-pagelsn]], and analysis only reads the log. Each undo step is logged as a CLR before (by WAL) it can reach disk, and a CLR is never undone; on a later restart, the CLRs are redone and the undoNextLSN of the last one tells undo where to continue. So no update is ever undone twice, and each restart makes progress.
:::

::: proposition Bounded logging during undo {#prop-clr-bound}
However many times the system crashes during recovery, the undo of a transaction that performed $n$ updates writes at most $n$ CLRs.
:::

::: proof
Each CLR compensates one specific update record $u$ and directs the next undo step to $u$'s prevLSN. Undo never processes a CLR as something to undo; it only follows its undoNextLSN. After a crash, undo resumes from the transaction's lastLSN, which is the most recent CLR or update, and follows the chain past everything already compensated. Hence each update record of the transaction is compensated at most once, giving at most $n$ CLRs. (Without CLRs, or with "undo the undo" schemes, repeated crashes could make the log grow without bound.)
:::

::: quiz
In the redo phase of ARIES, a record with LSN $250$ updates page $P$, whose DPT entry has recLSN $200$. The page is read and its pageLSN is $260$. What does redo do?
- [ ] Reapplies the change, because $250 \ge 200$.
- [x] Skips it, because the page already contains the change.
- [ ] Undoes the change, because the page is newer than the log record.
- [ ] Reports corruption, because pageLSN cannot exceed the record's LSN.
::: solution
$\text{pageLSN} = 260 \ge 250$, so the page already reflects the change of record $250$ (and of a later one, $260$); redo skips it. The recLSN only says from where the page *might* be missing changes; the pageLSN decides. A pageLSN greater than the LSN being considered is normal: the page was written to disk after a later change.
:::
:::

::: warning The log is not optional, even for "small" transactions
A tempting optimisation is to write data pages directly and skip logging for small or "unimportant" updates, or to acknowledge commits before the log is flushed. Both break the guarantees: a page written without its log record cannot be undone after a crash if its transaction does not commit (violating the undo rule), and an acknowledged commit whose record is still in the log buffer is lost by a crash (violating the redo rule). Some systems do offer relaxed durability as an explicit option — for example PostgreSQL's `synchronous_commit = off` or SQLite's `PRAGMA synchronous = NORMAL` in WAL mode — which can lose the most recently acknowledged transactions after a power failure, but never corrupts the database. Use such settings only where losing the last fraction of a second of work is acceptable, and never assume a storage device honours flushes unless it is designed to.
:::

## In practice

ARIES or close variants underlie IBM's DB2 and Microsoft SQL Server, among others. Systems built on MVCC can avoid the undo phase for aborted transactions: **PostgreSQL** keeps old row versions in the table, and an aborted transaction's new versions are simply invisible, because its status in the commit log says "aborted"; its WAL is therefore redo-only, and crash recovery replays the log from the last checkpoint, using full-page images after each checkpoint to repair torn pages (as of version 17).

**SQLite** shows both classic designs in one system. In its default rollback-journal mode, before changing a page of the database file it copies the *original* page into a separate journal file and syncs it; at commit it syncs the database file and then deletes (or invalidates) the journal. This is undo logging with force: after a crash, a surviving journal means an incomplete transaction, and its original pages are copied back. In **WAL mode** it does the opposite: changed pages are appended to a write-ahead log file, a commit is a marked frame in that log, and the database file is updated later by a **checkpoint** that copies pages back — redo logging with no-force, which also lets readers keep reading a consistent snapshot of the database file plus the committed part of the log while a writer appends ([[databases/transactions]]).

::: history
Logging for recovery evolved with the first transaction systems in the 1970s; Jim Gray's "Notes on data base operating systems" (1978) and the System R recovery manager (Gray, McJones, Blasgen, Lindsay, Lorie, Price, Putzolu and Traiger, "The recovery manager of the System R database manager", *ACM Computing Surveys*, 1981) set out write-ahead logging, checkpoints and the alternative of shadow paging, which System R also used and which was later abandoned for its cost. Theo Härder and Andreas Reuter's survey "Principles of transaction-oriented database recovery" (*ACM Computing Surveys*, 1983) introduced the steal/force classification and the acronym ACID. C. Mohan, Don Haderle, Bruce Lindsay, Hamid Pirahesh and Peter Schwarz published "ARIES: a transaction recovery method supporting fine-granularity locking and partial rollbacks using write-ahead logging" in *ACM Transactions on Database Systems* in 1992, after IBM research reports from 1989; with its index-management companion ARIES/IM, it became the standard design. Gray and Reuter's *Transaction Processing: Concepts and Techniques* (1992) treats logging and recovery in depth.
:::

## Where this leads

Recovery completes the ACID guarantees begun in [[databases/transactions]]. In a distributed database, a transaction spanning several machines must commit everywhere or nowhere, which needs an atomic commitment protocol — two-phase commit, whose participants rely on exactly the logging of this chapter — and replicated logs kept consistent by consensus protocols such as Paxos and Raft ([[distributed-systems]]). The idea of an append-only log as the source of truth extends far beyond databases: file systems use journaling ([[operating-systems]]), and log-based messaging systems and event sourcing, discussed in Kleppmann's book, build whole architectures on it.

::: summary
- Crash recovery provides **atomicity** and **durability** after system crashes, assuming **stable storage** for the log.
- **Steal** requires undo, **no-force** requires redo ([[#prop-policies]]); fast systems use steal/no-force and log both before- and after-images.
- **Write-ahead logging**: flush a page's log records before the page, and a transaction's records (with commit) before reporting commit ([[#thm-wal]]); a commit costs one sequential log flush, shared by **group commit**.
- The **pageLSN** test makes redo idempotent ([[#lem-pagelsn]]); **fuzzy checkpoints** record the transaction table and dirty page table so recovery starts near the end of the log.
- **ARIES** restarts in three passes: **analysis** (rebuild TT and DPT, find losers), **redo** (repeat all history from the smallest recLSN), **undo** (roll back losers in reverse LSN order, writing **CLRs**).
- CLRs are redone but never undone; their undoNextLSN makes recovery correct under repeated crashes and bounds the log ([[#thm-aries]], [[#prop-clr-bound]]).
- MVCC systems such as PostgreSQL need only redo; SQLite's rollback journal is undo logging with force and its WAL mode is redo logging with checkpoints.
:::

## Exercises

::: exercise Policies and logging {level=1}
For each combination of buffer policies — steal/force, steal/no-force, no-steal/force, no-steal/no-force — say whether undo information, redo information, both or neither must be logged for crash recovery.
::: solution
By [[#prop-policies]]: steal/force needs undo only; steal/no-force needs both; no-steal/force needs neither (given atomic installation of a transaction's pages); no-steal/no-force needs redo only. Undo information is also needed for *transaction* aborts in any policy where uncommitted changes are applied in place in the buffer pool — but under no-steal they never reach disk, so the in-memory pages can simply be discarded.
:::
:::

::: exercise Applying the WAL rule {level=1 check="2"}
The flushedLSN is $500$. Four dirty pages have pageLSNs $420$, $510$, $499$ and $650$. How many of them may the buffer manager write to disk right now? (Enter the number.)
::: solution
By the undo rule a page may be written only if $\text{pageLSN} \le \text{flushedLSN} = 500$: the pages with pageLSN $420$ and $499$, so $2$. Before writing the others, the log must be flushed up to at least $510$ or $650$.
:::
:::

::: exercise Counting CLRs {level=1 check="4"}
How many CLRs does the undo phase of [[#ex-aries]] write? (Enter the number.)
::: solution
Four: $130$ (undo of $90$), $140$ (undo of $70$), $160$ (undo of $50$) and $170$ (undo of $30$). The CLR $120$ was written before the crash and is not undone. In total, $T_1$'s three updates got three CLRs and $T_3$'s two updates got two ($120$ and $140$), consistent with [[#prop-clr-bound]].
:::
:::

::: exercise Analysis from a checkpoint {level=2 check="15"}
The `end_checkpoint` record lists TT $= \set{T_4\colon \text{lastLSN } 12}$ and DPT $= \set{P_5\colon 15,\ P_6\colon 40}$. After it the log contains: $45$ $T_4$ update $P_7$; $50$ $T_5$ update $P_6$; $55$ $T_4$ commit; $60$ $T_5$ update $P_8$. Give TT and DPT at the end of analysis, the losers, and the LSN at which redo starts. (Enter that LSN.)
::: solution
$45$: $T_4$'s lastLSN becomes $45$; $P_7$ enters the DPT with recLSN $45$. $50$: $T_5$ enters TT (lastLSN $50$); $P_6$ is already in the DPT, recLSN stays $40$. $55$: $T_4$ is committed (lastLSN $55$). $60$: $T_5$'s lastLSN $60$; $P_8$ enters with recLSN $60$. Result: TT $= \set{T_4\colon 55\ \text{committed},\ T_5\colon 60}$, DPT $= \set{P_5\colon 15, P_6\colon 40, P_7\colon 45, P_8\colon 60}$. The only loser is $T_5$; $T_4$ gets an end record after redo. Redo starts at the smallest recLSN, $15$ — *before* the checkpoint, because $P_5$ was dirty since LSN $15$ and may never have been written.
:::
:::

::: exercise Which records are redone? {level=2 check="1"}
In the redo phase, the DPT is $\set{P_1\colon 20, P_2\colon 50}$, and the log has updates $20$ ($P_1$), $30$ ($P_2$), $40$ ($P_1$), $50$ ($P_2$), $60$ ($P_3$). On disk, $P_1$ has pageLSN $40$ and $P_2$ pageLSN $30$. How many records are actually reapplied, and for which records must the page be read? (Enter the number reapplied.)
::: solution
- $20$ ($P_1$): $P_1$ must be read; pageLSN $40 \ge 20$, skip.
- $30$ ($P_2$): recLSN $50 > 30$, skip without reading the page — $P_2$ was written to disk after this change.
- $40$ ($P_1$): pageLSN $40 \ge 40$, skip.
- $50$ ($P_2$): recLSN $50 \le 50$; read $P_2$; pageLSN $30 < 50$: **redo**, pageLSN becomes $50$.
- $60$ ($P_3$): $P_3$ is not in the DPT, so it was written after the change; skip.

Exactly $1$ record is reapplied, and only $P_1$ and $P_2$ are read. The recLSN of $P_2$ is consistent with its pageLSN: the page was written to disk after change $30$ and dirtied again by change $50$.
:::
:::

::: exercise A crash during recovery {level=2}
In [[#ex-aries]], suppose the system crashes again during the undo phase, just after CLR $140$ has been written to stable storage but before the end record $150$. Describe the second restart.
::: solution
Analysis scans to the end of the log (now ending at $140$): TT $= \set{T_1\colon 130,\ T_3\colon 140}$, both losers. Redo repeats history, including the CLRs $130$ ($B = 7$) and $140$ ($D = 8$), skipping by pageLSN whatever reached disk. Undo starts with ToUndo $= \set{130, 140}$. $140$ is a CLR with undoNextLSN null: write an end record for $T_3$. $130$ is a CLR with undoNextLSN $50$: add $50$. Then $50$ and $30$ are undone as before, with new CLRs and an end record for $T_1$. The updates $90$ and $70$ are not undone again: the CLRs direct undo past them, as [[#prop-clr-bound]] promises. The final state is the same.
:::
:::

::: exercise Logical redo {level=2}
A system logs the operation "add $10$ to $X$" (instead of before- and after-images) for an update with LSN $70$ to page $P$, where $X = 100$ before. The page was written to disk after the change, with pageLSN $70$, and the system crashed. Show what goes wrong if redo ignores pageLSNs, and how [[#lem-pagelsn]] fixes it. Why is undo of such an operation safe without a test?
::: solution
On disk $X = 110$. Redo without the test would apply "add $10$" again, giving $120$ — wrong, because the operation is not idempotent. With the test, $\text{pageLSN} = 70 \ge 70$, so the record is skipped and $X$ stays $110$. If the page had *not* been written (pageLSN $< 70$, $X = 100$ on disk), the test would apply it, giving $110$, as at the crash. Undo needs no test because ARIES undoes only after redo has brought every page to the state at the crash, where each change is present exactly once; undo then applies "subtract $10$" once and logs a CLR, so it is never repeated.
:::
:::

::: exercise Group commit {#ex-group-commit level=2 check="16000"}
A log flush takes $2$ ms. What is the maximum commit rate if each commit forces its own flush, and if commits are flushed in groups of $32$? (Enter the second rate in commits per second.)
::: solution
One flush per commit: at most $1/0.002 = 500$ commits per second. With $32$ commit records per flush: $32 \cdot 500 = 16\,000$ per second. The cost is latency: a transaction may wait for its group to fill (or a short timer to expire) before its flush. The bandwidth needed is modest — even at $16\,000$ commits per second with $1$ KiB of log each, about $16$ MB/s of sequential writes.
:::
:::

::: exercise Implementing ARIES restart {#ex-implement level=3}
Write a Python simulation of [[#alg-aries]] for physical updates (before- and after-images) and run it on [[#ex-aries]].
::: solution
The log is a list of tuples `(lsn, txn, kind, page, item, before, after, prev, undo_next)` exactly as in the table of [[#ex-aries]], and `disk` holds each page's items and pageLSN as on disk at the crash. The restart is then:

```python
by_lsn = {r[0]: r for r in log}
tt, dpt = {}, {}                                          # analysis
for lsn, t, kind, page, *_ in log:
    if kind == "end":
        tt.pop(t); continue
    tt[t] = {"last": lsn, "status": "C" if kind == "commit" else "U"}
    if kind in ("update", "CLR") and page not in dpt:
        dpt[page] = lsn                                   # recLSN
for lsn, t, kind, page, item, before, after, *_ in log:   # redo: repeat history
    if kind not in ("update", "CLR") or lsn < min(dpt.values()):
        continue
    if page not in dpt or dpt[page] > lsn or disk[page]["lsn"] >= lsn:
        print("redo skip", lsn); continue
    disk[page][item], disk[page]["lsn"] = after, lsn
    print("redo", lsn, item, "=", after)
next_lsn = 130                                            # undo the losers
todo = {tt[t]["last"] for t in tt if tt[t]["status"] == "U"}
while todo:
    lsn = max(todo); todo.remove(lsn)
    _, t, kind, page, item, before, after, prev, undo_next = by_lsn[lsn]
    nxt = undo_next if kind == "CLR" else prev
    if kind == "update":
        disk[page][item], disk[page]["lsn"] = before, next_lsn
        by_lsn[next_lsn] = (next_lsn, t, "CLR", page, item, None, before, None, prev)
        print("CLR", next_lsn, "undoes", lsn, item, "=", before, "undoNext", prev)
        next_lsn += 10
    if nxt is None:
        print("end", next_lsn, t); next_lsn += 10
    else:
        todo.add(nxt)
print({k: v for p in disk.values() for k, v in p.items() if k != "lsn"})
```

```console
$ python3 aries.py
redo skip 30
redo skip 40
redo 50 C = 2
redo 70 D = 9
redo 90 B = 70
redo skip 100
redo 120 E = 3
CLR 130 undoes 90 B = 7 undoNext 50
CLR 140 undoes 70 D = 8 undoNext None
end 150 T3
CLR 160 undoes 50 C = 1 undoNext 30
CLR 170 undoes 30 A = 10 undoNext None
end 180 T1
{'A': 10, 'E': 3, 'B': 7, 'C': 1, 'D': 8}
```

The output reproduces the tables of the example. For brevity the simulation does not append the new records to `log`, does not flush pages, and starts from an empty checkpoint; extending it to crash in the middle of undo and restart (as in the exercise above) is a good test of [[#thm-aries]].
:::
:::
