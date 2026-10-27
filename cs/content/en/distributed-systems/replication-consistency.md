A user changes her profile photo, the website says "saved", and she reloads the page — to see her old photo. Nothing is lost: the write went to one copy of the database, and the reload was served from another copy that had not yet received it. A few seconds later the new photo appears everywhere. Is this a bug? For a profile photo, most people would shrug. For a bank balance, or for a lock service that tells two clients each that they hold the same lock, it would be a disaster.

Keeping several copies — **replicas** — of the same data is how distributed systems survive failures and serve users quickly, and it raises the central question of this chapter: what may a read return when there are several copies and updates take time to propagate? The answer is a **consistency model**, a contract between the storage system and its users. We first look at how replication is done — with a primary, or with **quorums** of replicas, whose intersection property we prove. We then define the main consistency models precisely: **linearisability**, **sequential consistency**, **causal consistency** and **eventual consistency**, with the session guarantees in between. We prove the **CAP theorem** in the precise form of Gilbert and Lynch, which says what no system can do during a network partition, and its everyday companion PACELC. Finally we meet **CRDTs**, data types designed so that replicas can accept updates independently and still provably converge. We rely on happened-before and vector clocks from [[distributed-systems/time-clocks]] and on the models of [[distributed-systems/system-models]].

## Replication

::: definition Replicated object {#def-replicated}
A **replicated object** is a data object (a register, a key–value map, a counter, a database) of which $N$ processes, the **replicas**, each keep a copy. **Clients** invoke operations on the object by sending requests to one or more replicas. A **replication protocol** says which replicas a client contacts, how updates propagate between replicas, and what each replica returns.
:::

Replication serves three goals: **fault tolerance** (the data survives the loss of some replicas), **availability** (some replica can answer even when others are unreachable) and **performance** (reads spread over several machines, and a nearby replica answers faster). These goals pull against **consistency**, the extent to which the replicas behave like a single copy.

### Primary–backup

The simplest protocol designates one replica as the **primary** (leader, master); the others are **backups** (followers, secondaries).

::: algorithm Primary–backup replication {#alg-primary-backup}
1. Clients send all updates to the primary.
2. The primary applies each update to its copy, assigns it the next position in its **log**, and sends the update to every backup.
3. Each backup applies updates in log order and acknowledges them.
4. In **synchronous** replication the primary replies to the client only after all backups (or a fixed set of them) have acknowledged; in **asynchronous** replication it replies immediately.
5. Reads are served by the primary, or, if stale data is acceptable, by any backup.
6. If the primary fails, a backup is **promoted** to primary (**failover**) and the others follow it.
:::

Because a single process orders all updates, every replica applies the same updates in the same order and ends in the same state — the idea of state-machine replication that [[distributed-systems/consensus]] develops. The difficulties are in steps 4 and 6. With asynchronous replication, a write acknowledged to the client may exist only on the primary; if the primary fails before forwarding it, failover loses it. With synchronous replication to every backup, one slow or failed backup blocks all writes. Many systems compromise with **semi-synchronous** replication: wait for one backup (or a majority), forward to the rest asynchronously.

Failover is harder than it looks. Deciding that the primary has failed requires a timeout, which by [[distributed-systems/system-models#thm-indistinguishable]] may be wrong: the old primary may only be slow or cut off. If it is still running when a backup is promoted, there are two primaries — **split brain** — and both accept writes, which then conflict. Safe failover requires that the replicas *agree* on which one is primary, and that a deposed primary cannot keep acting; this is consensus, and we postpone it to [[distributed-systems/consensus]].

::: example Reading from a lagging backup {#ex-lag}
A primary replicates asynchronously to two backups, with **replication lag** — the delay between the primary applying an update and a backup applying it — of $50$ ms on backup 1 and $2$ s on backup 2 (it is catching up after a restart). A user updates her photo at time $0$ and reloads at $t = 0.5$ s; her reads go to a random replica. What can she see? Then she reloads twice more, at $t = 0.6$ and $t = 0.7$ s.
::: solution
At $t = 0.5$ s, the primary and backup 1 have the new photo; backup 2 does not. With probability $1/3$ she sees her old photo: she does not read her own write. If her three reloads hit backup 1, backup 2 and the primary, she sees new, old, new — her reads go **backwards in time**. Both anomalies disappear after $2$ s, when all replicas agree. This is **eventual consistency** in action, and the two anomalies are exactly what the session guarantees *read-your-writes* and *monotonic reads* below forbid. A common fix is to route each user's reads to the primary for a short time after she writes, or to a replica that has applied at least the log position of her last write.
:::
:::

## Quorums

Instead of a single primary, a client can contact several replicas directly and wait for enough of them. Thomas (1979) and Gifford (1979) introduced this idea of **quorums**.

::: definition Read and write quorums {#def-quorum}
With $N$ replicas, a protocol uses **write quorums** of size $W$ and **read quorums** of size $R$ if every write is sent to all replicas and is considered complete once $W$ replicas have acknowledged it, and every read asks all replicas and returns once $R$ have replied. Each stored value carries a **version** (a timestamp); a read returns the value with the highest version among the replies.
:::

::: theorem Quorum intersection {#thm-quorum}
If $R + W > N$, every read quorum intersects every write quorum. Consequently, if a write of version $v$ has completed before a read begins, and versions of later writes are larger, the read returns a value of version at least $v$.
:::

::: proof
Let $Q_R$ be a read quorum and $Q_W$ a write quorum, subsets of the $N$ replicas with $\lvert Q_R\rvert = R$ and $\lvert Q_W\rvert = W$. Then $\lvert Q_R \cap Q_W\rvert = \lvert Q_R\rvert + \lvert Q_W\rvert - \lvert Q_R \cup Q_W\rvert \ge R + W - N > 0$, since the union has at most $N$ elements. For the consequence: when the write completed, every replica in its quorum $Q_W$ stored version $v$ (or a later one, since a replica keeps only the highest version it has seen). The read's quorum $Q_R$ contains some replica of $Q_W$, which replies with a version $\ge v$, and the read returns the maximum over its replies.
:::

Common choices are $N = 3$, $R = W = 2$, or $N = 5$, $R = W = 3$: majorities, which tolerate the failure of a minority for both reads and writes. Other choices shift the cost: $R = 1, W = N$ makes reads fast and writes fragile (any one failed replica blocks writes), and $R = N, W = 1$ the reverse. The condition $W > N/2$ has a separate role in protocols where a writer learns the current version from its own write quorum, as in Gifford's weighted voting: it makes any two *write* quorums intersect ($2W > N$), so that a write always sees the versions of earlier completed writes (Exercise 5).

::: example A quorum system under failure {#ex-quorum}
Replicas $r_1, r_2, r_3$ use $R = W = 2$ and all hold $(\text{version } 4, \text{value } a)$. A client writes $b$ with version $5$; the write reaches $r_1$ and $r_2$ and completes, while $r_3$ is down. Then $r_1$ crashes and $r_3$ recovers with its old copy. A client reads. What does it return? What if instead $W = 1$?
::: solution
The read needs replies from two of the live replicas, which are now $r_2$ (version $5$, $b$) and $r_3$ (version $4$, $a$). It returns the higher version, $b$ — correct, because $r_2$ is in both quorums, as [[#thm-quorum]] guarantees. The reader may also **repair** $r_3$ by sending it $(5, b)$, so that later reads need not rely on $r_2$ alone (Dynamo-style stores call this **read repair**).

With $W = 1$, $R + W = 3 = N$ and intersection fails: the write could complete on $r_1$ alone; after $r_1$ crashes, the read quorum $\set{r_2, r_3}$ contains no copy of version $5$ and returns $a$. The acknowledged write is invisible — and if $r_1$'s disk is lost, it is gone for ever.
:::
:::

::: widget plot
f: sum(choose(n, k)*x^k*(1 - x)^(n - k), k, q, n)
x: 0.5, 1
y: 0, 1
sliders: n=5:1:9:1; q=3:1:9:1
labels: \text{probability that a quorum of } q \text{ of } n \text{ is up}
points: 0.9,0.99144; 0.99,0.9999901
caption: The probability that at least $q$ of $n$ replicas are up, when each is up with probability $x$ independently — the availability of an operation that needs a quorum of size $q$. The dots are a majority of $5$ ($q = 3$) at $x = 0.9$ and $0.99$. Set $q = n$ (writes to every replica) and the curve collapses towards $x^n$; set $q = 1$ and it rises towards $1$. Notice that with majorities, adding replicas helps only when each one is reasonably reliable: at $x = 0.5$ a majority is up exactly half the time, whatever $n$.
:::

::: warning $R + W > N$ is not linearisability
Quorum intersection guarantees that a read sees a write that *completed* before it started. It says nothing about a write that is still in progress. If a write has reached one replica of a read quorum but not yet completed, a first read may return the new value and a later read, using a quorum that misses that replica, the old value — the new–old inversion of [[#ex-histories]]. Failures make it worse: a write that reaches fewer than $W$ replicas fails from the client's point of view but may still be stored on some, and be returned by later reads. And systems that use **sloppy quorums** — accepting writes on any $W$ reachable nodes, not necessarily the designated replicas, as Dynamo does ([[distributed-systems/distributed-storage]]) — give up intersection altogether during failures. Quorums are a building block; a linearisable protocol needs more, such as the write-back phase of [[#alg-abd]].
:::

## Consistency models

To compare protocols we need a precise language for what clients observe. A client sees only the operations it invokes and the responses it receives, and each operation takes time.

::: definition History {#def-history}
A **history** is a set of operations, each with the client that issued it, its kind and arguments (for a register: `write(v)` or `read`), its response (`ok` or the value read), an **invocation** time and a **response** time. Operation $a$ **precedes** $b$ in real time, written $a <_H b$, if $a$'s response time is earlier than $b$'s invocation time. Operations neither of which precedes the other **overlap**. Each client issues one operation at a time, so the operations of a client are totally ordered by $<_H$ (its **program order**).
:::

A **sequential specification** says what an object does when operations are executed one at a time: for a register, a read returns the value of the most recent write (or the initial value). The models below say which concurrent histories are acceptable by reference to sequential executions.

::: definition Linearisability {#def-linearisable}
A history $H$ is **linearisable** if there is a total order $S$ of its operations such that (i) $S$ satisfies the object's sequential specification, and (ii) $S$ respects real time: if $a <_H b$ then $a$ comes before $b$ in $S$. Equivalently, each operation appears to take effect instantaneously at some point (its **linearisation point**) between its invocation and its response.
:::

Linearisability (Herlihy and Wing, 1990) is the strongest common model: the replicated object behaves exactly like a single copy accessed atomically. Once a write has completed, every later read returns it or a newer value; and once *any* read has returned a new value, no later read returns an older one. Gilbert and Lynch call it **atomic consistency**, and it is the "C" of CAP. It is what you need for locks, leader election, uniqueness constraints ("this username is taken") and anything where two clients must agree on a single up-to-date value.

::: definition Sequential consistency {#def-sequential}
A history $H$ is **sequentially consistent** if there is a total order $S$ of its operations satisfying the sequential specification and respecting each client's program order (but not necessarily real-time order between different clients).
:::

Sequential consistency (Lamport, 1979) is the model introduced for multiprocessor memory ([[programming-languages/concurrency-models]]): all clients see the same order of operations, and that order is consistent with what each client did, but it may "move" an operation of one client before or after an operation of another client that did not overlap with it in real time. A client may read a stale value as long as everybody's view is consistent with one sequential execution.

The next model drops the single order.

::: definition Causal consistency {#def-causal}
Writes are **causally related** if one happened before the other in the sense of [[distributed-systems/time-clocks#def-hb]], where a client's read of a value written by $w$ counts as receiving a message from $w$. A history is **causally consistent** if each client sees all writes in an order that respects causality: if $w_1 \to w_2$, no client reads the value of $w_2$ and later reads the value of $w_1$ (or a value $w_2$ overwrote) from the same object. Concurrent writes may be seen in different orders by different clients.
:::

Causal consistency (Ahamad and colleagues, 1995) rules out the most confusing anomalies — seeing a reply to a comment before the comment, or a photo shared with friends after they were removed from the friend list — while allowing replicas to apply concurrent updates in different orders, which makes it implementable without waiting for remote replicas. Implementations track dependencies with vector clocks or explicit dependency lists and delay making an update visible until the updates it depends on are visible.

::: definition Eventual consistency and session guarantees {#def-eventual}
A replicated object is **eventually consistent** if, whenever updates stop, all replicas eventually converge to the same state and every read eventually returns that state. Terry and colleagues' **session guarantees** constrain what a single client (a session) sees:
- **read your writes**: a read reflects every earlier write of the same session;
- **monotonic reads**: a read never returns an older state than an earlier read of the same session;
- **monotonic writes**: the writes of a session are applied in the order issued;
- **writes follow reads**: a write is ordered after the writes whose effects the session had read before issuing it.
:::

Eventual consistency is a liveness property only: it says that replicas *eventually* agree but nothing about what reads return in the meantime, and nothing about how conflicting concurrent updates are combined. It is the weakest useful model and the easiest to make highly available. Together, the four session guarantees amount to causal consistency within each session.

::: example Classifying histories {#ex-histories}
A register initially holds $0$. Times are in milliseconds.
- $H_1$: client $A$ writes $1$ during $[0, 4]$; client $B$ reads $0$ during $[1, 2]$; client $C$ reads $1$ during $[2.5, 3]$.
- $H_2$: as $H_1$, but $B$ reads $1$ during $[1, 2]$ and $C$ reads $0$ during $[2.5, 3]$.

Which are linearisable? Which are sequentially consistent?
::: solution
In $H_1$ both reads overlap the write. Place the write's linearisation point between $2$ and $2.5$: then $B$'s read ($0$) precedes it and $C$'s read ($1$) follows. The order $B{:}\,\mathrm{read} \to 0$, $A{:}\,\mathrm{write}(1)$, $C{:}\,\mathrm{read} \to 1$ respects real time, so $H_1$ is linearisable.

In $H_2$, $B$'s read returns $1$, so the write must come before it in any valid order; $C$'s read returns $0$, so it must come before the write. Hence $C$'s read precedes $B$'s in the order; but $B$'s read finished (at $2$) before $C$'s began (at $2.5$), so real time demands the opposite. $H_2$ is **not linearisable**: once a reader has seen the new value, a later reader saw the old one — a **new–old inversion**, which is what a quorum system without write-back can produce. It is, however, **sequentially consistent**: the order $C{:}\,\mathrm{read} \to 0$, $A{:}\,\mathrm{write}(1)$, $B{:}\,\mathrm{read} \to 1$ respects each client's (single-operation) program order and the register's specification. A brute-force checker confirms the linearisability verdicts:

```python
from itertools import permutations

def linearisable(history, initial=0):
    """history: list of (name, kind, value, invoke, respond) for one read/write register.
    Brute force: try every total order that respects real time and the register's specification."""
    for order in permutations(history):
        pos = {op[0]: i for i, op in enumerate(order)}
        if any(a[4] < b[3] and pos[a[0]] > pos[b[0]] for a in history for b in history):
            continue                                   # violates real-time order
        value, ok = initial, True
        for name, kind, v, _, _ in order:
            if kind == "w":
                value = v
            elif v != value:                           # a read must return the latest write
                ok = False
                break
        if ok:
            return [op[0] for op in order]
    return None

H2 = [("A:w1", "w", 1, 0, 4), ("B:r0", "r", 0, 1, 2), ("C:r1", "r", 1, 2.5, 3)]
H3 = [("A:w1", "w", 1, 0, 4), ("B:r1", "r", 1, 1, 2), ("C:r0", "r", 0, 2.5, 3)]
print("H2:", linearisable(H2))
print("H3:", linearisable(H3))
```

```console
$ python3 lin.py
H2: ['B:r0', 'A:w1', 'C:r1']
H3: None
```

(In the program, `H2` and `H3` are the histories $H_1$ and $H_2$ of this example.) Brute force takes time proportional to $n!$ for $n$ operations; checking linearisability is NP-complete in general (Gibbons and Korach, 1997), although practical checkers handle histories of thousands of operations by searching cleverly.
:::
:::

The models form a hierarchy: every linearisable history is sequentially consistent (real-time order includes program order), every sequentially consistent history is causally consistent, and every causally consistent system that propagates updates is eventually consistent. Each inclusion is strict, as $H_2$ shows for the first. Linearisability has one more property that sequential consistency lacks: it is **local** (composable) — a history over several objects is linearisable if and only if its restriction to each object is (Herlihy and Wing, 1990) — so linearisable objects can be combined freely, whereas two sequentially consistent objects together need not be sequentially consistent (Exercise 8 gives the classic example).

::: quiz
A key–value store guarantees that after you write a key, your own later reads return your value or a newer one, but other clients may see the old value for a while. Which guarantee does it provide?
- [ ] Linearisability
- [ ] Sequential consistency
- [x] Read your writes (a session guarantee)
- [ ] None of these: it is not even eventually consistent
::: solution
Read-your-writes concerns only a session's own writes. Other clients seeing stale values after your write completed violates linearisability; sequential consistency is possible in principle but not implied. Whether the store is eventually consistent depends on whether the other clients' reads eventually catch up — the description does not say.
:::
:::

## The CAP theorem

In 2000 Eric Brewer conjectured that a distributed system cannot simultaneously provide **consistency**, **availability** and **partition tolerance**. Seth Gilbert and Nancy Lynch made the statement precise and proved it in 2002. The precise version is much narrower, and much more useful, than the slogan "pick two out of three".

::: definition Availability and partitions in the sense of Gilbert and Lynch {#def-cap}
Consider an implementation of a read/write register by a set of nodes in the asynchronous model, where messages between nodes may be lost.
- It is **available** if every request received by a non-failing node eventually results in a response (in every execution, including those in which messages are lost).
- It is **atomically consistent** if every history it produces is linearisable.
- A **partition** is an execution in which all messages from one group of nodes to the others are lost; **partition tolerance** means that the guarantees above must hold even in such executions.
:::

::: theorem CAP (Gilbert and Lynch, 2002) {#thm-cap}
In the asynchronous network model, no implementation of a read/write register is both available and atomically consistent in all executions, including those in which messages are lost.
:::

::: proof
Suppose an implementation $\mathcal{A}$ is available and atomically consistent. Divide the nodes into two non-empty disjoint sets $G_1$ and $G_2$, and let the register's initial value be $v_0$. Consider an execution $\alpha$ in which every message between $G_1$ and $G_2$, in either direction, is lost, and no node fails.

In $\alpha$, a client writes $v_1 \ne v_0$ at a node of $G_1$. By availability the write completes, say at time $t_1$ — it must, although no message reaches $G_2$. Afterwards, a client reads at a node of $G_2$; by availability the read returns, at some time $t_2 > t_1$.

Now compare $\alpha$ with the execution $\beta$ in which there is no write at all, the same messages are lost, and the same read is issued at the same node of $G_2$ at the same time. No message from $G_1$ ever reaches $G_2$ in either execution, so the nodes of $G_2$ have identical views in $\alpha$ and $\beta$, and the read returns the same value in both. In $\beta$ the only value ever written is $v_0$, so by atomic consistency the read returns $v_0$; hence it returns $v_0$ in $\alpha$ too. But in $\alpha$ the write of $v_1$ completed before the read began, so every linearisation puts the write before the read, which must then return $v_1$. This contradicts atomic consistency.
:::

The proof is almost identical to the indistinguishability arguments of [[distributed-systems/system-models]]: a node that receives no messages cannot know about a write elsewhere. Gilbert and Lynch also show that the impossibility persists in a partially synchronous model with clocks: if messages may be lost, even bounded-delay networks cannot have both properties, since the lost messages carry the only information about the write.

What does CAP mean for design? Partitions — switch failures, misconfigured firewalls, cable cuts, a data centre losing its uplink — are not optional; they happen. So the theorem is a statement about what to do *during* a partition: either some requests must wait or fail (giving up availability in the strict sense: these nodes do not respond), or some reads may return stale values (giving up linearisability). Systems that choose the first, such as replicated databases using consensus, are sometimes called **CP**; systems that choose the second, such as Dynamo-style stores and DNS, **AP**.

::: warning What CAP does not say
The slogan "consistency, availability, partition tolerance: pick two" misleads in several ways. *C is linearisability*, not "consistency" in the ACID sense or any weaker model; many useful models (causal consistency, session guarantees) are achievable with availability (Mahajan, Alvisi and Dahlin proved in 2011 that no model stronger than a real-time variant of causal consistency is). *A is total availability*: every non-failed node must answer every request. A system in which the majority side of a partition keeps working and the minority side refuses requests is "not available" by this definition, although most users would call it highly available. *P is not a choice*: a system that "gives up partition tolerance" simply has undefined behaviour when a partition happens. And *CAP says nothing when there is no partition*: then a system can have both C and A, but pays in latency — which is what PACELC adds.
:::

### PACELC

Daniel Abadi (2012) pointed out that the consistency–availability trade-off in normal operation is really a consistency–**latency** trade-off. His **PACELC** formulation: if there is a **P**artition, choose between **A**vailability and **C**onsistency; **E**lse, choose between **L**atency and **C**onsistency. A linearisable write must reach a quorum before it is acknowledged; if replicas are on different continents, that is a wide-area round trip on every write, even when nothing has failed. This is not an artefact of particular protocols: Richard Lipton and Jonathan Sandberg (1988) and Hagit Attiya and Jennifer Welch (1994) proved that in a system where message delays lie in $[d - u, d]$, even a sequentially consistent read/write register must have read and write latencies summing to at least $d$, so a linearisable one must too. Systems that acknowledge writes locally and propagate them asynchronously (EL) are fast but weakly consistent; systems that wait (EC) are consistent but slow. Many systems let each request choose.

## An algorithm for linearisable registers

Quorums plus one extra idea give linearisability in the asynchronous model, as long as a majority of replicas is correct: readers must help finish the write they observed. The algorithm is due to Attiya, Bar-Noy and Dolev (1995), usually called **ABD**; we give its multi-writer form.

::: algorithm ABD register {#alg-abd}
Each replica stores a pair $(\mathit{ts}, \mathit{val})$, where timestamps $\mathit{ts} = (k, \mathit{id})$ are compared lexicographically; a replica that receives $\langle \textsf{store}, \mathit{ts}', v'\rangle$ replaces its pair if $\mathit{ts}' > \mathit{ts}$ and acknowledges in any case. $N = 2f + 1$ replicas, at most $f$ of which crash.
- **Write $v$** by client $c$: (1) send $\textsf{query}$ to all replicas and wait for $f + 1$ replies $(\mathit{ts}_j, \cdot)$; let $k$ be the largest first component; (2) send $\langle \textsf{store}, (k + 1, c), v\rangle$ to all replicas and wait for $f + 1$ acknowledgements; return.
- **Read**: (1) send $\textsf{query}$ to all and wait for $f + 1$ replies; let $(\mathit{ts}, v)$ be the reply with the largest timestamp; (2) **write back**: send $\langle \textsf{store}, \mathit{ts}, v\rangle$ to all and wait for $f + 1$ acknowledgements; return $v$.
:::

::: theorem ABD is linearisable and wait-free {#thm-abd}
With at most $f$ of $2f + 1$ replicas crashing and reliable links in an asynchronous system, every operation of a correct client terminates, and every history of [[#alg-abd]] is linearisable.
:::

::: proof
*Termination.* Each phase waits for $f + 1$ replies out of $2f + 1$ replicas, at least $f + 1$ of which are correct and eventually reply.

*Linearisability.* Associate with each completed operation $o$ the timestamp $\mathit{ts}(o)$ it stored in its second phase (a write's new timestamp; a read's written-back timestamp). Any two sets of $f + 1$ replicas intersect, since $2(f+1) > 2f + 1$.

Key claim: if $o_1$ completes before $o_2$ begins, then $\mathit{ts}(o_2) \ge \mathit{ts}(o_1)$, and $\mathit{ts}(o_2) > \mathit{ts}(o_1)$ if $o_2$ is a write. When $o_1$ completed, $f + 1$ replicas held a timestamp $\ge \mathit{ts}(o_1)$ (replicas never decrease their timestamps). $o_2$'s query phase hears from $f + 1$ replicas, one of which is among them, so it sees a timestamp $\ge \mathit{ts}(o_1)$. A read stores the largest timestamp it saw, so $\mathit{ts}(o_2) \ge \mathit{ts}(o_1)$; a write takes a first component larger than every one it saw, so $\mathit{ts}(o_2) > \mathit{ts}(o_1)$.

Different writes have different timestamps (they differ in the client id or, for the same client, in $k$, since a client's later write sees its earlier one). Now order all operations by timestamp, putting each write before the reads with the same timestamp, and ordering reads with equal timestamps by real time (any order consistent with real time). Each read returns the value stored with its timestamp, which is the value of the write with that timestamp (or the initial value), and it is placed after that write and before every write with a larger timestamp — so the order satisfies the register specification. It respects real time by the key claim: if $o_1 <_H o_2$ then $o_2$'s timestamp is at least $o_1$'s, strictly if $o_2$ is a write, and when both are reads with equal timestamps we ordered them by real time; and a write cannot be placed after a read with the same timestamp. So the history is linearisable.
:::

The write-back phase is exactly what prevents the new–old inversion of [[#ex-histories]]: a reader that sees the new value makes sure a quorum holds it before returning, so every later reader sees it too. The cost is two round trips per read, and the algorithm needs a majority of correct replicas — which is optimal, since with $N \le 2f$ a partition into two halves of size $\le f$ gives the CAP scenario with both sides required to respond.

## Conflict-free replicated data types

At the other end of the spectrum, some applications want every replica to accept updates immediately, even during a partition, and to converge afterwards — a collaborative text editor, a shopping cart, a counter of likes. With eventual consistency alone, concurrent updates conflict: if one replica sets a register to $A$ and another to $B$, which wins? **Last-writer-wins** by timestamp is simple but silently discards one update. **Conflict-free replicated data types** (CRDTs), systematised by Marc Shapiro, Nuno Preguiça, Carlos Baquero and Marek Zawirski in 2011, are data types designed so that concurrent updates *commute*, and convergence is guaranteed by algebra.

::: definition State-based CRDT {#def-crdt}
A **join-semilattice** is a set $S$ with a partial order $\le$ in which every two elements $x, y$ have a least upper bound $x \sqcup y$ (the **join**). The join is associative, commutative and idempotent. A **state-based CRDT** (convergent replicated data type) consists of a join-semilattice $S$ of states, an initial state, **update** operations $u$ that are **inflationary** ($x \le u(x)$ for every $x$), a **merge** operation that sets a replica's state $x$ to $x \sqcup y$ when it receives another replica's state $y$, and a **query** that reads a value from the state.
:::

::: theorem State-based CRDTs converge {#thm-crdt}
In a state-based CRDT, (i) a replica's state never decreases, so no update is ever lost; (ii) the result of merging a collection of states is independent of the order, grouping and repetition of the merges; and (iii) if every replica's current state is delivered to every other replica and merged, all replicas end in the same state, the join of all their states. Hence replicas that have received the same updates, directly or through merges, are in the same state (**strong eventual consistency**).
:::

::: proof
(i) Updates are inflationary, and a merge replaces $x$ by $x \sqcup y \ge x$. In particular, once an update's effect is in some state $z$, every state obtained from $z$ by further updates and merges is $\ge z$.

(ii) A sequence of merges of states $y_1, \dots, y_k$ into $x$, in any order, possibly with repetitions and with intermediate results merged into each other, computes a join of the multiset $\set{x, y_1, \dots, y_k}$ with some bracketing and some repeated elements. By associativity and commutativity the bracketing and order do not matter, and by idempotence ($y \sqcup y = y$) neither do repetitions: the result is $x \sqcup y_1 \sqcup \dots \sqcup y_k$.

(iii) Let the replicas' states be $x_1, \dots, x_N$ and let each replica $i$ merge all the others' states (with no updates in between). Replica $i$ ends in $x_i \sqcup \bigsqcup_{j \ne i} x_j = \bigsqcup_{j} x_j$ by (ii), the same for every $i$.

For the final claim, define the state determined by a set of updates by applying them to the initial state at their originating replicas and joining; receiving the same updates means having joined the same set of such contributions, and by (ii) the result does not depend on the path by which they arrived.
:::

Merging is therefore safe over the weakest of networks: state may be sent many times, in any order, over fair-loss links, and gossiped from replica to replica — exactly the properties a partitioned, eventually connected system has. (**Operation-based** CRDTs instead broadcast the update operations themselves; they need reliable causal delivery but send less data, and the two kinds can emulate each other.)

The art is in designing semilattices that represent useful data types.

- **G-Counter** (grow-only counter) for $N$ replicas: the state is a vector $c \in \N^N$; replica $i$ increments by adding to $c[i]$; merge is the entrywise maximum; the value is $\sum_i c[i]$. Entrywise maximum is the join for the entrywise order, and an increment raises one entry, so it is inflationary.
- **PN-Counter**: two G-Counters $P$ and $N$, for increments and decrements; the value is $\sum P - \sum N$.
- **G-Set** (grow-only set): sets under union. **2P-Set**: a G-Set of added elements and a G-Set of removed ones ("tombstones"); an element is present if added and not removed — but once removed it can never be re-added.
- **OR-Set** (observed-remove set): each add of $x$ creates a fresh unique tag $(x, t)$; a remove of $x$ records as removed the tags of $x$ that the replica has *observed*. An element is present if it has a tag that has been added but not removed. A concurrent add creates a tag the remove did not see, so **add wins** over a concurrent remove.
- **LWW-Register**: a pair (timestamp, value) with the join "larger timestamp wins". It converges, but discards concurrent writes; a **multi-value register** instead keeps all concurrent values, using version vectors, and lets the application resolve them.

::: example Counters and carts that converge {#ex-crdt}
Simulate three replicas of a G-Counter, applying $200$ random steps that are either an increment at a random replica or a merge of one random replica's state into another. Then let every replica merge every other in a random order. Separately, show what an OR-Set does when one replica removes "milk" from a shopping list while another concurrently adds it again.
::: solution
```python
import random

class GCounter:
    """Grow-only counter: one entry per replica; merge = entrywise max (a join-semilattice)."""
    def __init__(self, n, me): self.v, self.me = [0] * n, me
    def increment(self, k=1): self.v[self.me] += k
    def merge(self, other): self.v = [max(a, b) for a, b in zip(self.v, other.v)]
    def value(self): return sum(self.v)

class ORSet:
    """Observed-remove set: each add creates a unique tag; remove deletes only the tags it has seen."""
    def __init__(self): self.adds, self.removes = set(), set()   # sets of (element, tag)
    def add(self, x, tag): self.adds.add((x, tag))
    def remove(self, x): self.removes |= {(e, t) for e, t in self.adds if e == x}
    def merge(self, o): self.adds |= o.adds; self.removes |= o.removes
    def value(self): return {e for e, t in self.adds - self.removes}

rng, n = random.Random(42), 3
counters = [GCounter(n, i) for i in range(n)]
total = 0
for step in range(200):                      # random increments and random pairwise merges
    i, j = rng.randrange(n), rng.randrange(n)
    if rng.random() < 0.5:
        counters[i].increment(); total += 1
    else:
        counters[i].merge(counters[j])
print("before final exchange:", [c.value() for c in counters], "true total:", total)
for i in range(n):                            # one exchange in any order: everyone merges everyone
    for j in rng.sample(range(n), n):
        counters[i].merge(counters[j])
print("after final exchange: ", [c.value() for c in counters])

a, b = ORSet(), ORSet()
a.add("milk", "a1"); b.merge(a)              # both replicas see milk
b.remove("milk")                             # b removes the milk it has seen...
a.add("milk", "a2")                          # ...while a concurrently adds milk again
a.merge(b); b.merge(a)
print("OR-set after merge:", a.value(), b.value())
```

```console
$ python3 crdt.py
before final exchange: [100, 106, 102] true total: 111
after final exchange:  [111, 111, 111]
OR-set after merge: {'milk'} {'milk'}
```

Before the final exchange the replicas disagree — each has missed some increments — but no increment is lost, and after one round of merges all three report the true total of $111$, as [[#thm-crdt]] promises. (A careful reader will notice that the final loop is not a simultaneous exchange: replica $0$ merges before replicas $1$ and $2$ have the others' states. It still works, because replica $0$'s merges include everything, and later replicas merge replica $0$'s full state.) In the OR-Set, $b$'s remove deleted only tag `a1`, which it had observed; the concurrent add's tag `a2` survives, so milk stays on both lists. A naive "last write wins" set might have dropped it, and Dynamo's original shopping cart, which merged by set union with no removes, was known to resurrect deleted items.
:::
:::

CRDTs are used in collaborative editors (sequence CRDTs such as RGA and the designs in Automerge and Yjs), in distributed databases (Riak's data types, Redis Enterprise's active–active replication) and in mobile apps that work offline. Their limits are real too: they cannot express invariants that need coordination, such as "the balance never goes below zero" — two replicas can each approve a withdrawal that is fine locally but overdraws the account together. Such invariants need agreement, which is the subject of the next chapter.

::: history
Peter Alsberg and John Day described primary–backup replication in 1976. Robert Thomas's majority consensus approach (1979) and David Gifford's weighted voting (1979) introduced quorums. Leslie Lamport defined sequential consistency in 1979 for multiprocessors, and Maurice Herlihy and Jeannette Wing defined linearisability in "Linearizability: a correctness condition for concurrent objects" (*TOPLAS*, 1990). Douglas Terry and colleagues introduced the session guarantees with the Bayou project in 1994, and Mustaque Ahamad and colleagues formalised causal memory in 1995, the year Hagit Attiya, Amotz Bar-Noy and Danny Dolev's register algorithm appeared in the *Journal of the ACM*. Eric Brewer's CAP conjecture was a keynote at PODC 2000; Seth Gilbert and Nancy Lynch's proof appeared in *SIGACT News* in 2002. Werner Vogels's "Eventually consistent" (2008–09) and Amazon's Dynamo paper (DeCandia and colleagues, 2007) popularised weak consistency in industry; Daniel Abadi proposed PACELC in *IEEE Computer* in 2012. Marc Shapiro, Nuno Preguiça, Carlos Baquero and Marek Zawirski defined CRDTs and strong eventual consistency in 2011.
:::

## Where this leads

Primary–backup replication needs agreement on who the primary is and on the order of updates, which is **consensus** ([[distributed-systems/consensus]]); with consensus, replicated logs give linearisable state machines. Quorums, sloppy quorums, version vectors and anti-entropy reappear in the design of partitioned key–value stores in [[distributed-systems/distributed-storage]]. Consistency across several objects at once — transactions — is the subject of [[distributed-systems/distributed-transactions]], where Spanner provides linearisable (externally consistent) transactions across continents. Memory consistency inside a multiprocessor, the same hierarchy at a smaller scale, is in [[parallel-computing/memory-consistency]].

::: summary
- **Primary–backup** replication orders updates at one replica; asynchronous replication can lose acknowledged writes on failover, and unsafe failover causes **split brain**.
- **Quorums** with $R + W > N$ intersect ([[#thm-quorum]]), so a read sees every write that completed before it; $2W > N$ orders writers.
- **Linearisability** (real-time order) ⊃ **sequential consistency** (program order) ⊃ **causal consistency** ⊃ **eventual consistency**; session guarantees sit in between.
- **CAP** (Gilbert–Lynch): with lost messages in an asynchronous network, a register cannot be both linearisable and available at every node ([[#thm-cap]]). C means linearisability, A means *every* non-failed node responds.
- **PACELC**: even without partitions, consistency costs latency.
- **ABD** builds a linearisable register from majorities with a read write-back ([[#thm-abd]]).
- **CRDTs** use join-semilattices so that merges commute and replicas provably converge ([[#thm-crdt]]); they cannot enforce invariants that need coordination.
:::

## Exercises

::: exercise Choosing quorums {level=1 check="5"}
With $N = 7$ replicas and read quorums of size $R = 3$, what is the smallest write quorum size $W$ for which reads are guaranteed to see completed writes? (Enter $W$.)
::: solution
We need $R + W > N$, i.e. $W > 4$, so $W = 5$. Writes then tolerate $2$ failed replicas and reads $4$.
:::
:::

::: exercise Which model? {level=1}
For each requirement, give the weakest model of this chapter that meets it: (a) after a user posts a comment and reloads, she sees her comment; (b) two clients trying to register the same username must not both succeed; (c) a reply to a comment must never be shown to anyone who cannot see the comment itself; (d) a counter of likes may be temporarily inaccurate but must become accurate once activity stops.
::: solution
(a) Read your writes. (b) Linearisability (a uniqueness check needs a single up-to-date view — in fact a linearisable compare-and-set, which with failures needs consensus). (c) Causal consistency: the reply causally depends on the comment. (d) Eventual consistency, for example with a PN-Counter CRDT.
:::
:::

::: exercise G-Counter arithmetic {level=1 check="15"}
Three replicas of a G-Counter have states $(5, 0, 2)$, $(3, 4, 2)$ and $(3, 0, 6)$. After all three merge each other's states, what value do they report? (Enter the value.)
::: solution
The join is the entrywise maximum: first entries $5, 3, 3$ give $5$; second entries $0, 4, 0$ give $4$; third entries $2, 2, 6$ give $6$. The merged state $(5, 4, 6)$ has value $5 + 4 + 6 = 15$. Notice that this is not the sum of the three replicas' values ($7 + 9 + 9$): increments counted at several replicas are counted once.
:::
:::

::: exercise Quorum availability {level=2 check="0.9^5 + 5*0.9^4*0.1 + 10*0.9^3*0.1^2"}
Five replicas are each up with probability $0.9$ independently. What is the probability that a majority quorum is available? (Enter the probability.)
::: solution
At least $3$ of $5$ up: $0.9^5 + 5 \cdot 0.9^4 \cdot 0.1 + 10 \cdot 0.9^3 \cdot 0.1^2 = 0.59049 + 0.32805 + 0.0729 = 0.99144$.
:::
:::

::: exercise Write quorums must intersect {level=2}
Prove that any two write quorums of size $W$ out of $N$ intersect if and only if $2W > N$. Then consider a protocol in which a writer reads the current version from the $W$ replicas it is about to write to and writes version "current $+1$" there. With $N = 4$, $W = 2$ and $R = 3$ (so $R + W > N$), give an execution in which two writes, the second starting after the first has completed, both carry the same version with different values.
::: solution
*If:* $\lvert Q_1 \cap Q_2\rvert \ge 2W - N > 0$. *Only if:* if $2W \le N$, take $Q_1$ to be the first $W$ replicas and $Q_2$ the next $W$, which are disjoint.

*Execution:* replicas $r_1, \dots, r_4$ all hold version $5$. Writer $A$ uses the quorum $\set{r_1, r_2}$: it reads version $5$ there and writes $(6, a)$, and completes. Then writer $B$ uses $\set{r_3, r_4}$, which $A$'s write never reached: it reads version $5$ and writes $(6, b)$. Although $B$ started after $A$ finished, the two values now carry the same version, and a later read quorum such as $\set{r_1, r_3, r_4}$ sees both and cannot tell which is newer. With $2W > N$ the two write quorums share a replica, so $B$ would have seen version $6$ and written $7$. ABD avoids the problem differently: its writers query a *read* quorum, which intersects every write quorum because $R + W > N$, and it makes timestamps unique by including the writer's identifier.
:::
:::

::: exercise A PN-Counter {level=2}
Implement a PN-Counter in Python on top of the `GCounter` class of [[#ex-crdt]], and prove that its merge is a join for a suitable order, so that [[#thm-crdt]] applies.
::: solution
```python
class PNCounter:
    def __init__(self, n, me): self.p, self.n = GCounter(n, me), GCounter(n, me)
    def increment(self, k=1): self.p.increment(k)
    def decrement(self, k=1): self.n.increment(k)
    def merge(self, other): self.p.merge(other.p); self.n.merge(other.n)
    def value(self): return self.p.value() - self.n.value()
```
The state is a pair $(P, N)$ of vectors in $\N^N$, ordered componentwise: $(P, N) \le (P', N')$ iff $P \le P'$ and $N \le N'$ entrywise. The least upper bound of two pairs is the pair of entrywise maxima, which is what `merge` computes, so this is a join-semilattice. Both updates raise one entry of one vector, so they are inflationary. Hence the theorem applies. The *value* $\sum P - \sum N$ is not monotone — it can go down — but the state is, which is all convergence needs.
:::
:::

::: exercise Linearisable implies sequentially consistent {level=3}
Prove that every linearisable history is sequentially consistent. Then give a history of two clients on one register that is sequentially consistent but not linearisable, different from $H_2$ in [[#ex-histories]], in which one client performs two operations.
::: solution
*Proof.* Let $S$ be a linearisation of $H$. It satisfies the sequential specification. If $a$ and $b$ are operations of the same client with $a$ before $b$ in program order, then, since a client issues one operation at a time, $a$'s response precedes $b$'s invocation, so $a <_H b$, and $S$ puts $a$ before $b$. So $S$ respects program order, and $H$ is sequentially consistent.

*Example.* Client $A$ writes $1$ during $[0, 1]$ and then reads $1$ during $[2, 3]$. Client $B$ reads $0$ during $[4, 5]$. Linearisability is violated: the write completed before $B$'s read began, so $B$ must read $1$. Sequential consistency holds with the order $B{:}\,\mathrm{read} \to 0$, $A{:}\,\mathrm{write}(1)$, $A{:}\,\mathrm{read} \to 1$, which respects both clients' program orders. $B$ is simply reading from a replica that is far behind, which sequential consistency permits indefinitely.
:::
:::

::: exercise Sequential consistency is not composable, and not available {level=3}
Two registers $x$ and $y$ start at $0$. Client $A$ writes $x \gets 1$ then reads $y$; client $B$ writes $y \gets 1$ then reads $x$. (a) Show that if both reads return $0$, the history is not sequentially consistent, although its restriction to each register is. (b) Deduce that no implementation of two registers that remains available during a partition separating $A$'s node from $B$'s can be sequentially consistent.
::: solution
(a) Write $w_x, r_y$ for $A$'s operations and $w_y, r_x$ for $B$'s. In a sequential order satisfying the specification, $r_y$ returns $0$, so it precedes $w_y$; $r_x$ returns $0$, so it precedes $w_x$. Program order gives $w_x$ before $r_y$ and $w_y$ before $r_x$. Together: $w_x < r_y < w_y < r_x < w_x$, a cycle — no such order exists. Restricted to $x$, the history is $w_x$ (by $A$) and $r_x \to 0$ (by $B$), each client having one operation: the order $r_x, w_x$ works. Similarly for $y$. So each object alone is sequentially consistent, but together they are not: sequential consistency is not local, unlike linearisability.

(b) During the partition, availability forces $A$'s write and read to complete without any message from $B$'s side, and likewise for $B$. Consider the execution where both clients run their two operations concurrently during the partition. $A$'s node cannot know of $w_y$ and $B$'s cannot know of $w_x$ — as in the proof of [[#thm-cap]], compare with executions where the other write never happens, in which the reads must return $0$. So both reads return $0$, which by (a) is not sequentially consistent.
:::
:::

::: exercise Cost of ABD {level=3 check="4"}
In [[#alg-abd]], how many one-way message delays does a read take in the absence of failures, counting from the client's first message to its return? Explain why a read that sees all replicas holding the same timestamp in its first phase could safely skip the write-back. (Enter the number of message delays.)
::: solution
Two phases, each a round trip: query and replies ($2$ delays), store and acknowledgements ($2$ delays): $4$ message delays. If the first phase's $f + 1$ replies all carry the same maximal timestamp, that value is already stored at a quorum of $f + 1$ replicas, which is exactly what the write-back would establish; any later operation's query will intersect this quorum and see a timestamp at least as large. So the read can return after one round trip — the common "fast read" optimisation. If the replies disagree, the reader cannot know whether the newest value has reached a quorum, and must write it back.
:::
:::
