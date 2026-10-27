A bank stores its accounts in a database partitioned over many machines. A customer transfers £100 from account $A$, on shard 1, to account $B$, on shard 7. Shard 1 must debit $A$ and shard 7 must credit $B$, and either both must happen or neither. If shard 1 debits and then shard 7 crashes before crediting, the money has vanished; if shard 7 credits but shard 1 finds that $A$ has insufficient funds, money has been created. On one machine, the transactions of [[databases/transactions]] and the recovery log of [[databases/recovery]] guarantee atomicity. Across machines that fail independently and communicate over an unreliable network, we need a protocol by which all the machines involved in a transaction agree to **commit** it or agree to **abort** it.

This chapter studies such **atomic commitment** protocols and the concurrency control that goes with them. We define the atomic commitment problem and see how it differs from consensus. We study **two-phase commit**, prove that it is safe, and prove that it can **block**: a participant may be stuck, holding locks, until a crashed coordinator recovers — verified by enumerating every crash point in a small program. **Three-phase commit** removes blocking under crash failures but not under partitions; running the commit decision through consensus (**Paxos Commit**) removes it properly. We then extend locking and multiversion concurrency control across machines, and prove that Google Spanner's **commit wait** on TrueTime gives **external consistency**. We finish with **sagas**, the alternative when transactions span services that cannot hold locks for one another.

## Atomic commitment

A distributed transaction has one **coordinator** (often the machine that received the client's request) and several **participants** (the shards — or *resource managers* — that hold the data it touches). Each participant executes its part of the transaction locally, holding locks, and can then tell whether it is able to commit: it may have to refuse because of a constraint violation, a deadlock or a local failure.

::: definition Atomic commitment {#def-atomic-commitment}
Each participant **votes** Yes or No, and each process may **decide** Commit or Abort. An **atomic commitment protocol** (ACP) guarantees:
- **agreement**: no two processes decide differently;
- **validity**: if any participant votes No, the decision is Abort; and a process decides Commit only if all participants voted Yes;
- **non-triviality**: if all participants vote Yes and no failures occur, the decision is Commit;
- **termination**: in every execution in which all failures are eventually repaired (every process eventually recovers and stays up, and messages are eventually delivered), every process eventually decides.

A protocol is **non-blocking** if termination holds more strongly: every correct (non-crashed, connected) process decides even while some others remain crashed.
:::

Atomic commitment resembles consensus ([[distributed-systems/consensus#def-consensus]]) — everyone must agree on one of two values — but differs in two ways. First, *every* participant has a veto: a single No forces Abort, so the decision depends on every participant's input, whereas consensus may decide a value without hearing from a crashed minority. Second, a participant that has voted Yes has given up its right to abort on its own; it must wait for the decision. These differences are why commitment can block where consensus need not.

## Two-phase commit

Two-phase commit (2PC) was described by Jim Gray in 1978 and by Butler Lampson and Howard Sturgis around the same time, and it is still the standard protocol, used in distributed databases and in the XA standard for transactions spanning different systems.

::: algorithm Two-phase commit {#alg-2pc}
*Phase 1 (voting).*
1. The coordinator sends $\textsf{prepare}$ to every participant.
2. A participant that can commit **force-writes** a $\textsf{prepared}$ record to its log — including everything needed to commit or abort later, such as its redo and undo information and its locks — and then replies $\textsf{yes}$. A participant that cannot commit writes an abort record, rolls back and replies $\textsf{no}$.

*Phase 2 (decision).*
3. If all votes are $\textsf{yes}$, the coordinator force-writes a $\textsf{commit}$ record to its log — the **commit point** — and sends $\textsf{commit}$ to all participants. If any vote is $\textsf{no}$, or a vote does not arrive within a timeout, it writes $\textsf{abort}$ and sends $\textsf{abort}$.
4. A participant receiving the decision writes it to its log, commits or rolls back, releases its locks and sends an acknowledgement. When all have acknowledged, the coordinator may forget the transaction.

*Recovery.* A recovering coordinator resends any decision in its log. A recovering participant that finds a $\textsf{prepared}$ record without a decision asks the coordinator. A participant that has not voted may abort unilaterally.
:::

::: theorem Safety of two-phase commit {#thm-2pc}
In the crash-recovery model with stable logs, 2PC satisfies agreement, validity and non-triviality in every execution, however messages are delayed or lost. It satisfies termination if all processes eventually recover and all messages are eventually delivered (by retransmission).
:::

::: proof
*Validity.* The coordinator decides Commit only after receiving $\textsf{yes}$ from every participant (step 3), and a participant that votes No aborts and never commits; a timeout leads to Abort, never Commit.

*Agreement.* Only the coordinator chooses the decision, once, and records it durably before sending it. A participant decides only (i) by receiving the coordinator's decision, or (ii) by aborting unilaterally *before* voting Yes. In case (ii), the coordinator never receives that participant's Yes, so it cannot decide Commit, and it decides Abort. A participant that has voted Yes never decides on its own, and a recovering coordinator resends the logged decision rather than choosing again. So all decisions equal the coordinator's.

*Non-triviality.* With all votes Yes and no failures, every vote arrives and the coordinator decides Commit.

*Termination.* If the coordinator crashes before logging a decision, after recovery it finds no decision and aborts (if it never logged one, it can never have sent Commit). Otherwise it resends the decision. Participants that have voted Yes ask the coordinator until they receive an answer; with eventual recovery and delivery, they do.
:::

2PC costs, for $n$ participants, $4n$ messages ($\textsf{prepare}$, vote, decision and acknowledgement for each) and two round trips before the client can be told the outcome (after phase 2's decision is logged — in fact it can be told as soon as the commit record is durable). It needs a forced log write at each participant (the $\textsf{prepared}$ record) and at the coordinator (the commit record), and typically one more, unforced, at each participant for the decision. Optimisations such as **presumed abort** — a coordinator with no record of a transaction answers "abort", so it need not log or acknowledge aborts — and read-only participants that vote and drop out of phase 2 reduce the cost. But the fundamental problem is not cost.

::: example The latency of a geo-distributed commit {#ex-2pc-latency}
A coordinator in London commits a transaction with two participants: one in London (round trip $1$ ms) and one in New York (round trip $70$ ms). A forced log write takes $1$ ms everywhere. How long until the client can be told "committed", and how long does the New York participant hold its locks after receiving $\textsf{prepare}$?
::: solution
Phase 1: $\textsf{prepare}$ reaches New York after $35$ ms; it force-writes its $\textsf{prepared}$ record ($1$ ms) and its vote returns after another $35$ ms: the last vote arrives at $71$ ms (London's arrived long before). The coordinator force-writes the commit record: $72$ ms. The client can be told at $72$ ms — the commit point. The decision reaches New York at $72 + 35 = 107$ ms, where the participant writes it and releases its locks at about $108$ ms. So New York held its locks for $108 - 35 = 73$ ms *after* it was asked to prepare, plus however long the transaction ran before; any transaction wanting those rows waits that long. If each "site" is itself a replicated consensus group spread over regions, as in Spanner, every forced log write becomes a quorum round trip, and the same calculation is dominated by wide-area latency several times over — the reason why such systems place the replicas of a group, and the participants of common transactions, close together.
:::
:::

### Blocking

Consider a participant that has voted Yes and then hears nothing. It is **in doubt**, or **uncertain**: it cannot abort, because the coordinator may have decided Commit and told others; it cannot commit, because the coordinator may have decided Abort, or a vote may have been No. It must wait, and while it waits it holds its locks, so every other transaction that touches the same data waits too.

::: proposition Two-phase commit blocks {#prop-2pc-blocks}
Suppose all participants have voted Yes and the coordinator then crashes. Until the coordinator recovers, a participant that has not received the decision, and cannot reach any participant that has, cannot decide without risking a violation of agreement.
:::

::: proof
Consider two executions that are identical up to the coordinator's receipt of the last Yes vote. In $E_1$ the coordinator crashes immediately, before logging any decision; on recovery it will abort. In $E_2$ it logs Commit, sends $\textsf{commit}$ to one participant $q$, which commits, and then crashes; on recovery it will resend Commit. A participant $p \ne q$ that receives nothing from the coordinator, and cannot communicate with $q$, has the same view in both executions. If it decides Commit, agreement fails in $E_1$; if it decides Abort, agreement fails in $E_2$. So it must wait for the coordinator (or $q$) to become reachable.
:::

A **cooperative termination protocol** helps in some cases: an uncertain participant asks the others, and if any of them has the decision, or has not voted (and can therefore abort and guarantee Abort), the uncertain one can decide. But if all reachable participants are uncertain, as in the proof, the blocking remains. Blocking is intrinsic: Skeen and Stonebraker (1983) showed that no commit protocol can be non-blocking if the network can partition; and in an asynchronous system, non-blocking atomic commitment is subject to the FLP impossibility ([[distributed-systems/consensus#thm-flp]]), since it would solve consensus.

::: example Every crash point of the coordinator {#ex-2pc-crashes}
Simulate 2PC with three participants, all voting Yes, crashing the coordinator after each step of its run, and apply recovery (with presumed abort). Which crash points leave participants blocked, and is atomicity preserved in all cases?
::: solution
```python
def run(votes, crash_at):
    """2PC with one coordinator and len(votes) participants. The coordinator crashes after
    `crash_at` of its steps (None: no crash). Returns participant states before and after recovery."""
    n = len(votes)
    coord_log, part = [], ["init"] * n          # participant states: init, prepared, committed, aborted
    steps = [("prepare", i) for i in range(n)] + [("log", None)] + [("decide", i) for i in range(n)]
    decision = "commit" if all(votes) else "abort"
    for k, (kind, i) in enumerate(steps):
        if k == crash_at:
            break                                # coordinator crashes here
        if kind == "prepare":                    # participant votes; a yes is forced to its log first
            part[i] = "prepared" if votes[i] else "aborted"
        elif kind == "log":
            coord_log.append(decision)           # the commit point: decision durable at the coordinator
        else:
            part[i] = decision + "ted" if decision == "commit" else "aborted"
    before = list(part)
    # Recovery (presumed abort): resend a logged decision; with no decision logged, abort.
    final = coord_log[0] if coord_log else "abort"
    part = [s if s in ("committed", "aborted") else final + ("ted" if final == "commit" else "ed")
            for s in part]
    return before, part

n = 3
print("crash after step | states before recovery              | after recovery")
for crash_at in [0, 1, 3, 4, 5, None]:
    before, after = run([True] * n, crash_at)
    assert len(set(after)) == 1                  # atomicity: everyone ends the same
    blocked = sum(s == "prepared" for s in before)
    print(f"{str(crash_at):>16} | {', '.join(before):35} | {after[0]} (blocked: {blocked})")
before, after = run([True, False, True], None)
print("one 'no' vote, no crash ->", after)
```

```console
$ python3 twopc.py
crash after step | states before recovery              | after recovery
               0 | init, init, init                    | aborted (blocked: 0)
               1 | prepared, init, init                | aborted (blocked: 1)
               3 | prepared, prepared, prepared        | aborted (blocked: 3)
               4 | prepared, prepared, prepared        | committed (blocked: 3)
               5 | committed, prepared, prepared       | committed (blocked: 2)
            None | committed, committed, committed     | committed (blocked: 0)
one 'no' vote, no crash -> ['aborted', 'aborted', 'aborted']
```

Atomicity holds at every crash point (the `assert` never fires). The lines for crash points $3$ and $4$ are the proof of [[#prop-2pc-blocks]] in miniature: the participants are in *exactly the same states* — all prepared — but the outcome differs, because the only difference, whether the commit record reached the coordinator's log, is invisible to them. All three are blocked, holding locks, until the coordinator returns. At crash point $5$, one participant has committed; the other two could learn the outcome from it with a cooperative termination protocol. Participants still in state `init` are not blocked: they have not voted and may abort on their own.
:::
:::

::: widget plot
f: max(l, 2*x)
x: 0, 20
y: 0, 40
sliders: l=10:1:100:1
labels: \text{commit latency (ms)}
points: 4,10
caption: A model of Spanner's commit latency, discussed below: the commit wait of $2\varepsilon$, where $\varepsilon$ ms is the TrueTime uncertainty, overlaps with the $l$ ms needed to replicate the commit record through Paxos, so the commit takes about $\max(l, 2\varepsilon)$. With $\varepsilon = 4$ ms (the paper's typical average) and $l = 10$ ms, the wait is hidden entirely (the dot). Raise $\varepsilon$ past $l/2$ and clock uncertainty starts to cost latency one-for-one — which is why Spanner invests in GPS receivers and atomic clocks: better clocks mean faster transactions.
:::

## Three-phase commit

Dale Skeen's **three-phase commit** (3PC, 1981–83) removes blocking under the assumptions of a synchronous system with crash failures only. Its idea follows from the proof of [[#prop-2pc-blocks]]: in 2PC, a prepared participant's state is "adjacent" both to a committed state (another participant may have committed) and to an aborted one (the coordinator may abort). 3PC inserts a **pre-commit** phase, so that no process can commit while any operational process is still uncertain.

::: algorithm Three-phase commit {#alg-3pc}
1. **CanCommit.** As in phase 1 of 2PC: the coordinator asks; participants vote, and a Yes voter becomes **uncertain**.
2. **PreCommit.** If all vote Yes, the coordinator sends $\textsf{precommit}$ to all; each participant becomes **pre-committed** and acknowledges. Otherwise the coordinator sends $\textsf{abort}$.
3. **DoCommit.** After receiving every acknowledgement of $\textsf{precommit}$, the coordinator sends $\textsf{commit}$; participants commit.

*Termination protocol*, run by the survivors when the coordinator is detected to have crashed (which in a synchronous system is exact): elect a new coordinator among the operational participants and collect their states. If any is committed or pre-committed, send $\textsf{precommit}$ to those that are not, then $\textsf{commit}$ to all. If none is (all are uncertain or aborted), send $\textsf{abort}$.
:::

::: proposition 3PC is non-blocking under crash failures in a synchronous system {#prop-3pc}
With reliable links, exact failure detection (synchronous model) and crash failures, 3PC satisfies agreement and validity, and every operational participant eventually decides, even if the coordinator and other participants have crashed.
:::

::: proof
*Key invariants.* (a) A participant is pre-committed only if every participant voted Yes, since the coordinator sends $\textsf{precommit}$ only then. (b) If any process has committed, then every participant had been pre-committed (or committed) before that, since $\textsf{commit}$ is sent only after every participant acknowledged $\textsf{precommit}$ — by the original coordinator, or by a termination coordinator that first brings every operational participant to pre-committed. (c) If any process has aborted, no process is pre-committed or committed: an abort happens only before any $\textsf{precommit}$ is sent (a No vote or a CanCommit timeout), or by a termination coordinator that found nobody pre-committed — and with exact failure detection and synchronous links, no $\textsf{precommit}$ from a crashed coordinator can still be in transit afterwards.

*Agreement.* If some process commits, by (b) every operational participant is pre-committed or committed, so a termination protocol run afterwards finds such a state and commits. If some process aborts, by (c) no participant is pre-committed, so a termination protocol run afterwards aborts. Hence no two processes decide differently. *Validity*: commit requires a pre-committed participant, and by (a) all voted Yes.

*Non-blocking.* The termination protocol uses only the states of operational participants and, thanks to exact failure detection, completes in bounded time; if the new coordinator crashes, the survivors run it again, which is safe by the same invariants.
:::

The fatal assumption is exact failure detection. If the network **partitions**, a group of participants that are all pre-committed and a group that are all uncertain may each conclude that the others have crashed, run the termination protocol, and decide Commit and Abort respectively — violating agreement (Exercise 8). Since real networks partition, 3PC is rarely used.

### Commit through consensus

The robust fix is to make the coordinator's decision fault-tolerant by replicating it. Jim Gray and Leslie Lamport's **Paxos Commit** (2006) has each participant's vote recorded by a set of $2f + 1$ acceptors via a Paxos instance; the transaction commits if every instance decides Yes. It is non-blocking as long as a majority of acceptors is available, and has the same message delay as 2PC in the common case. In practice the simplest form of the idea is to run the coordinator, and each participant, as a replicated state machine: in Spanner each shard is a Paxos group ([[distributed-systems/distributed-storage]]), the coordinator's commit record is a Paxos log entry, and a "crashed coordinator" is replaced within seconds by a new leader of the coordinator's group, which reads the decision from the replicated log. 2PC's blocking does not disappear, but it now requires the failure of a *majority* of a group rather than of one machine. FLP still applies to the consensus underneath, so a sufficiently unlucky network can still stall progress — but never break atomicity.

::: quiz
In 2PC, at which moment is a transaction irrevocably committed?
- [ ] When every participant has voted Yes
- [x] When the coordinator's commit record is durably written to its log
- [ ] When the first participant receives the commit message
- [ ] When all participants have acknowledged the commit
::: solution
Before the commit record is durable, a crash leads to Abort on recovery, even if all votes were Yes. Once it is durable, recovery resends Commit, so the outcome is fixed. This is why the coordinator force-writes that record: it is the **commit point**, exactly as the commit record is for a single-machine database in [[databases/recovery]].
:::
:::

## Distributed concurrency control

Atomic commitment makes a distributed transaction all-or-nothing. Isolation — that concurrent transactions behave as if executed one at a time — needs concurrency control across machines.

**Distributed two-phase locking.** Each participant runs strict two-phase locking on its own data ([[databases/transactions]]), holding all locks until the transaction's commit or abort is known, i.e. until phase 2 of 2PC. Strict 2PL at each site plus 2PC gives (conflict) serialisability globally: every transaction's locks at all sites are held at its commit point, and ordering transactions by commit points gives a serial order consistent with every site's conflicts. The cost is that a transaction's locks are held across network round trips — and, if the coordinator fails, for as long as 2PC blocks.

**Distributed deadlock.** With locks on many machines, the waits-for graph is spread over sites: $T_1$ waits for $T_2$ on shard 1 while $T_2$ waits for $T_1$ on shard 7, and neither site sees a cycle. Detection requires assembling the global graph (centrally, or by sending probes along waits-for edges, as in the Chandy–Misra–Haas algorithm of 1983) — and an assembled graph that is not a consistent snapshot can report **phantom deadlocks**. Many systems instead use **timeouts** (abort a transaction that has waited too long) or prevent deadlocks with timestamps — **wait-die** and **wound-wait**, which need no global information because every site compares the same globally unique timestamps.

**Multiversion concurrency control.** Snapshot isolation and serialisable MVCC also distribute ([[databases/transactions]]), provided that timestamps are consistent across machines: a transaction reads a snapshot "as of" its start timestamp on every shard, and that snapshot is meaningful only if a commit with a smaller timestamp is visible on *every* shard to a reader with a larger one. Google's **Percolator** (Peng and Dabek, 2010), which provides snapshot isolation on Bigtable for incremental web indexing, obtains timestamps from a central **timestamp oracle**; TiDB does the same. A central oracle is simple and correct but is a round trip for every transaction and, across regions, a long one. Spanner obtains consistent timestamps from clocks instead.

### Spanner and external consistency

::: definition External consistency {#def-external}
A system of transactions is **externally consistent** (strictly serialisable) if it is serialisable and the serial order respects real time: if transaction $T_1$ commits before $T_2$ starts (in absolute time), then $T_1$ precedes $T_2$ in the serial order. For timestamp-based systems: if $T_1$ commits before $T_2$ starts, then $s_1 < s_2$, where $s_i$ is $T_i$'s commit timestamp.
:::

External consistency is linearisability ([[distributed-systems/replication-consistency#def-linearisable]]) lifted to transactions. It is what users expect: if you see your transfer confirmed and then tell a colleague, who looks, the colleague sees it. Spanner achieves it with the TrueTime interface of [[distributed-systems/time-clocks]]: $\mathrm{TT.now}()$ returns an interval $[\mathit{earliest}, \mathit{latest}]$ guaranteed to contain the absolute time at which it was called.

::: algorithm Spanner commit with commit wait {#alg-commit-wait}
For a read–write transaction $T$, after its coordinator leader has acquired all locks (and, for a multi-shard transaction, all participants have prepared):
1. Choose the commit timestamp $s \ge \mathrm{TT.now}().\mathit{latest}$, evaluated after all locks are held (and larger than any timestamp previously assigned by this leader and any prepare timestamp of the participants).
2. **Commit wait**: do not make $T$'s writes visible, release its locks or report the commit to the client until $\mathrm{TT.now}().\mathit{earliest} > s$.
3. Then apply the writes with timestamp $s$, release the locks and reply.
:::

::: theorem Commit wait gives external consistency {#thm-external}
If TrueTime's intervals always contain the absolute time, then for any transactions $T_1$ and $T_2$ such that $T_1$'s commit is visible (its commit wait has ended) before $T_2$ starts, the commit timestamps satisfy $s_1 < s_2$.
:::

::: proof
Let $t_{\mathrm{abs}}(e)$ denote the absolute time of an event $e$. Let $e_1$ be the end of $T_1$'s commit wait. At $e_1$, $\mathrm{TT.now}().\mathit{earliest} > s_1$, and since the interval contains the absolute time, $t_{\mathrm{abs}}(e_1) \ge \mathit{earliest} > s_1$. $T_2$ starts at an event $e_2$ with $t_{\mathrm{abs}}(e_2) > t_{\mathrm{abs}}(e_1)$, and chooses its timestamp at a later event $e_3$ (after acquiring its locks) as $s_2 \ge \mathrm{TT.now}().\mathit{latest} \ge t_{\mathrm{abs}}(e_3)$. Chaining, $s_2 \ge t_{\mathrm{abs}}(e_3) > t_{\mathrm{abs}}(e_2) > t_{\mathrm{abs}}(e_1) > s_1$.
:::

The commit wait lasts about $2\varepsilon$, where $\varepsilon$ is the half-width of TrueTime's interval: $s$ is chosen at about $\mathit{true} + \varepsilon$, and the wait ends when $\mathit{earliest} = \mathit{true}' - \varepsilon$ exceeds it, i.e. at $\mathit{true}' \approx \mathit{true} + 2\varepsilon$. With the $1$–$7$ ms uncertainty reported in the 2012 paper, the wait is a few to fourteen milliseconds, and it overlaps with the Paxos replication of the commit record, as the figure above shows. The theorem relies entirely on TrueTime's guarantee: if a clock is wrong by more than $\varepsilon$, external consistency can fail silently, which is why Spanner's time masters cross-check GPS and atomic clocks and evict machines whose clocks misbehave. The same timestamps give **lock-free snapshot reads**: a read-only transaction at timestamp $t$ reads every shard as of $t$, waiting only until each shard is sure that no commit with a smaller timestamp is still pending.

::: example External consistency in action {#ex-commit-wait}
TrueTime has $\varepsilon = 4$ ms. Transaction $T_1$ acquires its locks when the absolute time is $100.000$ s. When does it become visible, with what timestamp, and what is the smallest timestamp a transaction $T_2$ that starts afterwards can receive?
::: solution
Suppose TrueTime's intervals are centred on the true time. At absolute time $100.000$ s, $\mathrm{TT.now}()$ returns $[99.996, 100.004]$, so $s_1 = 100.004$. Commit wait lasts until $\mathit{earliest} > 100.004$, that is, until the absolute time exceeds $100.008$: $T_1$ becomes visible at about $100.008$ s, $2\varepsilon = 8$ ms after it acquired its locks. A transaction $T_2$ that starts after that chooses $s_2 \ge \mathit{latest} \ge$ the absolute time $> 100.008 > s_1$, as [[#thm-external]] says.

Without the wait, $T_1$ would be visible at $100.000$. A transaction $T_2$ starting at $100.001$ on a machine whose (correct) interval is $[99.993, 100.001]$, with the true time at its right edge, could choose $s_2 = 100.001 < s_1$; its snapshot would then omit $T_1$, although $T_1$ was already visible to users.
:::
:::

**Deterministic databases** take yet another route. Calvin (Thomson and colleagues, 2012) first agrees, by consensus, on a global *order* of transaction requests, and then every shard executes them deterministically in that order. Since every replica and shard knows the order in advance, no commit protocol is needed at all — a transaction cannot fail at one shard and succeed at another except for deterministic reasons that every shard sees — at the price of declaring each transaction's read and write sets up front.

## Sagas: transactions without locks

Across organisations or independently deployed services — a payment provider, an airline, a hotel — 2PC is usually unacceptable: no service will let another hold its locks, and a coordinator's failure must not freeze them. Hector Garcia-Molina and Kenneth Salem's **sagas** (1987) give up isolation instead.

::: definition Saga {#def-saga}
A **saga** is a sequence of local transactions $T_1, T_2, \dots, T_k$, each committed independently by one service, together with **compensating transactions** $C_1, \dots, C_{k-1}$, where $C_i$ semantically undoes $T_i$. The saga guarantees that either $T_1, \dots, T_k$ all commit, or, if some $T_j$ fails, $T_1, \dots, T_{j-1}, C_{j-1}, \dots, C_1$ commit.
:::

Booking a trip as a saga: reserve the flight, reserve the hotel, charge the card; if the charge fails, cancel the hotel reservation and then the flight. Each step and each compensation must be retried until it succeeds, so each must be **idempotent** ([[distributed-systems/remote-communication#thm-dedup]]), and the saga's progress is recorded durably by an orchestrator or by events in a log (the **outbox** pattern writes the event in the same local transaction as the state change, so that neither can happen without the other).

::: example A saga that fails {#ex-saga}
An orchestrator runs the saga $T_1$ = reserve a seat, $T_2$ = reserve a room, $T_3$ = charge the card, with compensations $C_1$ = release the seat and $C_2$ = release the room. The card is declined, and the orchestrator crashes once, just after sending $C_2$. Trace what happens.
::: solution
The orchestrator records each step in its own durable log before and after performing it. (1) It logs "start $T_1$", calls the airline with idempotency key $(s, 1)$; the seat is reserved; it logs "$T_1$ done". (2) The same for $T_2$ with the hotel. (3) It calls the payment service with key $(s, 3)$; the card is declined, so $T_3$ fails (its local transaction aborted, nothing to compensate); it logs "$T_3$ failed, compensating". (4) It logs "start $C_2$" and calls the hotel's cancel with key $(s, \bar 2)$; the hotel releases the room; the orchestrator crashes before logging the result. (5) On restart it reads its log, sees $C_2$ started but not finished, and calls the cancel again with the same key; the hotel recognises the key and returns the stored result without doing anything. It logs "$C_2$ done". (6) It runs $C_1$ the same way and logs "saga aborted". The final state is as if nothing had been booked — but for a while, other customers saw the seat and room as taken.
:::
:::

::: warning Sagas are not isolated
Between $T_1$ and a later compensation $C_1$, other transactions can see $T_1$'s effects: a flight seat appears booked and then becomes free again; an email confirming the hotel is sent and then a cancellation. Compensation is semantic, not a rollback — a sent email cannot be unsent, and a refund is not the same as never having been charged. Sagas give atomicity in the sense of "eventually all or nothing" but none of ACID's isolation, so applications must be designed for these intermediate states, for example by marking records as pending, or by ordering steps so that the ones most likely to fail, or hardest to compensate, come last.
:::

::: history
Jim Gray described two-phase commit in "Notes on data base operating systems" (1978), and Butler Lampson and Howard Sturgis presented a version in an unpublished 1976 Xerox PARC paper on crash recovery in a distributed storage system. Dale Skeen's "Nonblocking commit protocols" (SIGMOD 1981) introduced three-phase commit and the theory of blocking; his "A formal model of crash recovery in a distributed system" with Michael Stonebraker followed in 1983. C. Mohan, Bruce Lindsay and Ron Obermarck's presumed-abort and presumed-commit optimisations (1986) were implemented in IBM's R* project. Philip Bernstein, Vassos Hadzilacos and Nathan Goodman's *Concurrency Control and Recovery in Database Systems* (1987) formalised atomic commitment. Hector Garcia-Molina and Kenneth Salem's "Sagas" appeared at SIGMOD 1987. The X/Open XA standard for distributed transactions dates from 1991. Jim Gray and Leslie Lamport's "Consensus on transaction commit" (*ACM TODS*, 2006) defined Paxos Commit. Daniel Peng and Frank Dabek described Percolator at OSDI 2010; Alexander Thomson and colleagues' Calvin and James Corbett and colleagues' Spanner both appeared in 2012.
:::

## Where this leads

Distributed transactions combine everything before them: logging and recovery from databases, quorums and replication, consensus for replicated coordinators, and clocks for timestamps. [[distributed-systems/data-processing]] takes a different approach to correctness at scale: batch and stream processors avoid fine-grained transactions altogether, making results correct by deterministic re-execution and by atomically committing *outputs* together with input positions — a narrow, efficient form of the atomic commitment studied here.

::: summary
- **Atomic commitment**: all participants commit or all abort; any No vote forces Abort. Unlike consensus, every participant has a veto.
- **Two-phase commit** — prepare/vote, then decide — is safe in every execution ([[#thm-2pc]]); the **commit point** is the coordinator's durable commit record.
- 2PC **blocks**: a prepared participant cannot decide while the coordinator is down ([[#prop-2pc-blocks]]), holding its locks; blocking is intrinsic when the network can partition.
- **Three-phase commit** is non-blocking under crash failures with exact failure detection ([[#prop-3pc]]) but unsafe under partitions; **Paxos Commit** and replicated coordinators make commitment fault-tolerant.
- Strict 2PL at each site plus 2PC gives global serialisability; distributed deadlocks need global detection, timeouts or timestamp-based prevention.
- **Spanner's commit wait** of about $2\varepsilon$ on TrueTime gives **external consistency** ([[#thm-external]]); a timestamp oracle (Percolator) or a global order (Calvin) are alternatives.
- **Sagas** replace isolation with compensation, for transactions across autonomous services; steps and compensations must be idempotent.
:::

## Exercises

::: exercise Counting 2PC messages {level=1 check="20"}
How many messages does 2PC send for a transaction with $5$ participants (and a separate coordinator), with all votes Yes and no failures, counting acknowledgements? (Enter the number.)
::: solution
$\textsf{prepare}$, vote, decision and acknowledgement for each participant: $4 \times 5 = 20$.
:::
:::

::: exercise Who may abort? {level=1}
In 2PC, which of these may abort the transaction on its own, without asking anyone: (a) a participant that has not yet received $\textsf{prepare}$; (b) a participant that has voted Yes; (c) the coordinator before it has logged a decision; (d) the coordinator after logging Commit?
::: solution
(a) Yes — it will vote No (or not vote, and the coordinator will time out). (b) No — it is uncertain and must wait. (c) Yes — no one can have been told Commit. (d) No — the decision is irrevocable. The asymmetry between (a) and (b) is the whole difficulty of the protocol.
:::
:::

::: exercise Commit wait {level=1 check="14"}
TrueTime's uncertainty is $\varepsilon = 7$ ms. Approximately how long, in milliseconds, is Spanner's commit wait? (Enter the number of milliseconds.)
::: solution
About $2\varepsilon = 14$ ms, by the argument after [[#thm-external]].
:::
:::

::: exercise Probability of commit {level=2 check="0.999^8"}
A transaction touches $8$ shards; each shard, independently, is able to vote Yes with probability $0.999$ (otherwise it votes No or is unreachable and the coordinator times out). What is the probability that the transaction commits? (Enter the probability.)
::: solution
2PC commits only if every participant votes Yes: $0.999^8 \approx 0.992$. Every additional shard multiplies the abort rate — the "needs all" curve of [[distributed-systems/system-models#ex-availability]] — which is why systems try to keep transactions within one shard by choosing partition keys well.
:::
:::

::: exercise Presumed abort {level=2}
Under presumed abort, a coordinator that crashes before logging a decision keeps no record of the transaction, and answers "abort" to any participant asking about a transaction it does not know. Explain why this is safe, and why it saves log writes and messages on aborts. Why could it *not* answer "commit" for unknown transactions without further changes?
::: solution
If the coordinator has no record, it never logged Commit, so it never sent Commit, so no participant can have committed: Abort is the only consistent answer. On abort the coordinator need not force-write an abort record (absence means abort), and participants need not acknowledge the abort, since the coordinator does not need to know when it can forget a transaction it has no record of. Answering "commit" for unknown transactions would be wrong for a transaction that was aborted (or never reached a decision) and then forgotten; *presumed commit* therefore requires the coordinator to force-write a record listing the participants *before* sending $\textsf{prepare}$, so that after a crash it knows which transactions to abort.
:::
:::

::: exercise A distributed deadlock {level=2}
$T_1$ holds a lock on $x$ at shard 1 and requests $y$ at shard 2; $T_2$ holds $y$ at shard 2 and requests $x$ at shard 1. Timestamps are $10$ for $T_1$ and $20$ for $T_2$ (smaller is older). Show that neither shard's local waits-for graph has a cycle. What happens under wound-wait?
::: solution
Shard 1's graph has the edge $T_2 \to T_1$ ($T_2$ waits for $x$, held by $T_1$); shard 2's has $T_1 \to T_2$. Each is acyclic; only the union has the cycle $T_1 \to T_2 \to T_1$. Under wound-wait, an older transaction requesting a lock held by a younger one **wounds** (aborts) it, and a younger one requesting from an older one waits. At shard 2, $T_1$ (older) requests $y$ from $T_2$ (younger): $T_2$ is aborted, releasing $y$, and $T_1$ proceeds. At shard 1, $T_2$ waited for the older $T_1$, which is allowed — and it is aborted anyway. No global information was needed, because both shards compare the same timestamps; $T_2$ restarts later with its *original* timestamp, so it eventually becomes the oldest and cannot starve.
:::
:::

::: exercise External consistency without commit wait {level=3}
Prove that if Spanner chose $s \ge \mathrm{TT.now}().\mathit{latest}$ but skipped the commit wait, external consistency could fail, by constructing two transactions on different machines whose TrueTime intervals are both correct. Then explain why a single-machine database with one clock needs no commit wait.
::: solution
Let $\varepsilon = 4$ ms. $T_1$ acquires its locks at absolute time $t = 100.000$ on machine $M_1$, whose interval is $[100.000, 100.008]$ — correct, since it contains $t$ — so $s_1 = 100.008$. Without commit wait, $T_1$ is visible at $100.000$. $T_2$ starts at $100.001$ on $M_2$, whose interval at its timestamp choice is $[99.993, 100.001]$, correct, and gets $s_2 = 100.001 < s_1 = 100.008$. $T_2$ started after $T_1$ was visible, but $s_2 < s_1$, so in timestamp order $T_2$ precedes $T_1$: a snapshot read at $s_2$ omits $T_1$. External consistency fails.

On a single machine with one monotonic clock (or a counter), a transaction that starts after $T_1$ commits reads the clock later and gets a larger timestamp, because the clock never goes backwards. Commit wait compensates for *several* clocks whose disagreement is bounded only by $2\varepsilon$.
:::
:::

::: exercise 3PC under a partition {level=3}
Give an execution of 3PC with four participants and a network partition in which two participants commit and two abort. Which assumption of [[#prop-3pc]] is violated?
::: solution
All four vote Yes. The coordinator sends $\textsf{precommit}$; it reaches participants $P_1$ and $P_2$, and then the network partitions into $\set{\text{coordinator}, P_1, P_2}$ and $\set{P_3, P_4}$, before $P_3$ and $P_4$ receive it. The coordinator, not hearing acknowledgements from $P_3$ and $P_4$, crashes (or simply is cut off). On the first side, $P_1$ and $P_2$ detect the coordinator's failure (or it is alive but treats $P_3, P_4$ as crashed), run the termination protocol, find pre-committed participants and **commit**. On the other side, $P_3$ and $P_4$ suspect everyone else, run the termination protocol, find only uncertain participants, and **abort**. Agreement fails. The violated assumption is exact failure detection: a partition makes live processes indistinguishable from crashed ones ([[distributed-systems/system-models#thm-indistinguishable]]), and the invariant (c) in the proof — that no $\textsf{precommit}$ exists when an abort is decided — fails because the deciding side cannot see the other.
:::
:::

::: exercise A saga for a trip {level=3}
Design a saga for "book flight, book hotel, charge card", with compensations. Say in what order the steps should be placed and why, what each step must store to be idempotent, and what a user may observe if the charge fails.
::: solution
Steps: $T_1$ reserve the hotel (tentatively), $T_2$ reserve the flight, $T_3$ charge the card; compensations $C_1$ cancel the hotel and $C_2$ cancel the flight. Order: put steps that are cheap to compensate first and those that are hard to undo last — the charge, whose compensation is a refund visible on a statement, goes last, so it happens only when everything else has succeeded. Reservations should be *tentative* holds that expire, so that a crashed orchestrator cannot leave permanent bookings.

Idempotence: every request carries the saga identifier and step number as an idempotency key; each service stores, in the same local transaction as its effect, "saga $s$ step $i$ done, result $r$", and returns $r$ on a repeat. Compensations are keyed the same way and must succeed even if the forward step never happened (cancelling a reservation that does not exist is a no-op), because the orchestrator may not know whether a timed-out step took effect.

If the charge fails: the user may briefly see the flight and hotel as booked (in an app, or in a confirmation email if one was sent too early), then cancelled. Other customers may have been told a seat or room was unavailable in the meantime. These are the visible consequences of the missing isolation, and the design should hide them — for instance, by showing "pending" until the saga completes and sending confirmations only at the end.
:::
:::
