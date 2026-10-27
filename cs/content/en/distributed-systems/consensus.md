The primary–backup protocol of [[distributed-systems/replication-consistency]] left a hole. When the primary stops responding, a backup must take over — but only one backup, and only if every replica agrees that it has. If two backups each decide that they are the new primary, the system has two primaries, both accepting writes: split brain. If the replicas cannot agree on the order in which updates are applied, their states diverge. Underneath both problems is a single question: how can a group of processes, some of which may crash and whose messages may be delayed, **agree on a value**?

This is the **consensus** problem, and it is the heart of fault-tolerant distributed computing. Consensus is what lets a cluster agree on a leader, on the next entry of a replicated log, on whether to commit a transaction, or on who holds a lock. With consensus we can replicate any deterministic service — a key–value store, a lock service, a database — so that it survives the crash of a minority of its machines while behaving like a single, linearisable copy.

This chapter defines consensus precisely and solves it easily in a synchronous system. It then proves the most famous result in the field, the **FLP impossibility theorem**: in a purely asynchronous system, no deterministic algorithm can guarantee consensus if even one process may crash. Practical protocols live with this by being always **safe** and **live** only when the network behaves. We study the two most important ones: Lamport's **Paxos**, with its safety proof, and Ongaro and Ousterhout's **Raft**, with its safety argument and a small simulation, run with message loss and a leader crash. We work in the models of [[distributed-systems/system-models]]: crash-stop or crash-recovery processes, fair-loss links made reliable by retransmission, and asynchrony or partial synchrony.

## The consensus problem

::: definition Consensus {#def-consensus}
Each of $n$ processes $p_1, \dots, p_n$ **proposes** a value from a set $V$ and may **decide** a value. An algorithm solves **consensus** if, in every execution with at most $f$ crashed processes:
- **termination**: every correct process eventually decides;
- **agreement**: no two processes decide differently;
- **validity**: a decided value was proposed by some process;
- **integrity**: a process decides at most once.
:::

Agreement as stated is **uniform**: it binds processes that decide and then crash as well as correct ones. That is what replication needs — a replica that applied a command and then crashed must not have applied a different one from the others. Validity rules out the trivial algorithm "always decide $0$". Agreement, validity and integrity are **safety** properties: if one is violated, it is violated at some finite point. Termination is a **liveness** property: it can only be violated by an infinite execution.

Consensus is the building block for **total-order broadcast** (also called atomic broadcast): a broadcast in which all correct processes deliver the same messages in the same order. Given consensus, run one instance per position of a sequence: instance $k$ decides which message is delivered $k$-th. Conversely, given total-order broadcast, solve consensus by broadcasting your proposal and deciding the first value delivered. The two problems are equivalent (Exercise 9), and total-order broadcast is exactly what replication needs.

::: definition State-machine replication {#def-smr}
A **state machine** is a deterministic service: a set of states, an initial state, and commands that map a state to a new state and an output. **State-machine replication** runs a copy of the state machine on each of $n$ replicas and uses total-order broadcast (or a sequence of consensus instances, a **replicated log**) to make every replica apply the same commands in the same order. Since the machine is deterministic, all replicas pass through the same states and produce the same outputs.
:::

State-machine replication was formulated by Lamport in 1978 and surveyed by Fred Schneider in 1990; [[distributed-systems/fault-tolerance]] returns to its requirements, such as determinism. With it, replication reduces to agreeing on a log — the job of the protocols in this chapter.

### Consensus in a synchronous system

If message delays and processing speeds are bounded, processes can run in **rounds**: in each round every process sends messages, then receives every message sent to it in that round by processes that have not crashed. A process that crashes in the middle of a round may have sent its message to some processes but not others.

::: algorithm FloodSet {#alg-floodset}
Each process $p_i$ keeps a set $W_i$, initially $\set{v_i}$, its own proposal.
1. For rounds $1, 2, \dots, f + 1$: send $W_i$ to every other process; set $W_i \gets W_i \cup \bigcup_j W_j$ over all sets received this round.
2. After round $f + 1$, decide $\min W_i$.
:::

::: theorem FloodSet solves consensus with $f$ crashes {#thm-floodset}
In the synchronous round model with at most $f$ crash failures, [[#alg-floodset]] satisfies termination, agreement, validity and integrity.
:::

::: proof
Termination and integrity are immediate: every correct process decides once, after round $f + 1$. Validity: every set $W_i$ contains only proposals, since it starts with one and grows only by unions with other such sets.

For agreement, note that at most $f$ processes crash, so among the $f + 1$ rounds there is at least one, say round $r$, in which no process crashes. In round $r$, every process that is alive at the start of the round sends its set to every other, and all of them receive all these sets. So at the end of round $r$, every process alive has the same set $W = \bigcup_i W_i$ (the union over the processes alive at the start of round $r$). In every later round, every set sent is equal to $W$ (only processes alive at the end of round $r$ send, and they all hold $W$), so unions leave the sets unchanged. Hence every process that reaches the end of round $f + 1$ holds $W$ and decides $\min W$.
:::

The bound is tight: when $n \ge f + 2$, every consensus algorithm for this model needs at least $f + 1$ rounds in some execution, a classic result first proved by Fischer and Lynch (1982) and Dolev and Strong (1983) for Byzantine failures and later for crashes (see Lynch's *Distributed Algorithms*, 1996). The proof of [[#thm-floodset]] shows why: a crashing process can hide its value from all but one process in each round, and the value can trickle through a chain of crashing processes for up to $f$ rounds.

::: example FloodSet with a hidden value {#ex-floodset}
Three processes with proposals $p_1 = 0$, $p_2 = 5$, $p_3 = 7$ run FloodSet for $f = 1$ (two rounds). In round 1, $p_1$ sends its set to $p_2$ and then crashes before sending to $p_3$. What does each process decide? What would go wrong with a single round?
::: solution
After round 1: $W_2 = \set{0, 5, 7}$ (it received from $p_1$ and $p_3$), $W_3 = \set{5, 7}$ (it missed $p_1$). Round 2 has no crash (only one crash is allowed): $p_2$ sends $\set{0,5,7}$ to $p_3$, which now has $\set{0, 5, 7}$. Both decide $\min = 0$. With one round, $p_2$ would decide $0$ and $p_3$ would decide $5$ — disagreement. The second round exists to propagate a value that a crashing process revealed to only some processes. Note that $p_1$'s value $0$ is decided although $p_1$ crashed; validity allows that.
:::
:::

The difficulty in real systems is that rounds rely on known bounds: a process that does not hear from another within the round's duration concludes that it crashed. If a slow message arrives after the round ends, the algorithm may break agreement. What if we make no timing assumptions at all?

## The FLP impossibility theorem

In 1985 Michael Fischer, Nancy Lynch and Michael Paterson proved that in the asynchronous model, consensus is impossible for deterministic algorithms if a single process may crash — even with reliable links, even if the crash is a clean stop, and even if only the values $0$ and $1$ may be proposed. The proof is a masterpiece of the indistinguishability technique of [[distributed-systems/system-models]], and we give it with its main steps proved.

::: definition Configurations, events and valence {#def-valence}
A **configuration** consists of the local state of every process and the set of messages in transit (the **message buffer**). An **event** $e = (p, m)$ is a step of process $p$ in which it receives message $m$ from the buffer (or $m = \varnothing$, receiving nothing), changes state deterministically and puts new messages in the buffer. Event $e$ is **applicable** to configuration $C$ if $m$ is in $C$'s buffer (or $m = \varnothing$); $e(C)$ is the resulting configuration. A **schedule** is a finite or infinite sequence of events, and a configuration is **reachable** from $C$ if some schedule leads to it.

Each process has a write-once output, initially empty. A configuration $C$ is **$v$-valent** if every configuration reachable from $C$ in which some process has decided has decided $v$, and some such configuration exists; $C$ is **univalent** if it is $0$-valent or $1$-valent, and **bivalent** if both $0$ and $1$ are still possible decisions in configurations reachable from it.
:::

In the asynchronous model every finite schedule of applicable events is possible, messages can be delayed arbitrarily but every message is eventually received by a correct process, and the empty receive $\varnothing$ is always applicable, so a process can always take a step. An execution is **admissible** if at most one process takes only finitely many steps (it has crashed) and every message sent to a process that takes infinitely many steps is eventually received.

Suppose, for a contradiction, that a deterministic algorithm solves binary consensus in this model, tolerating one crash. Then in every admissible execution every correct process decides.

::: lemma Disjoint schedules commute {#lem-commute}
If schedules $\sigma_1$ and $\sigma_2$ are both applicable to $C$ and the sets of processes taking steps in them are disjoint, then $\sigma_2$ is applicable to $\sigma_1(C)$, $\sigma_1$ is applicable to $\sigma_2(C)$, and $\sigma_1(\sigma_2(C)) = \sigma_2(\sigma_1(C))$.
:::

::: proof
A step of process $p$ depends only on $p$'s state and the message it receives, and affects only $p$'s state and the buffer (by removing the received message and adding new ones). Steps of $\sigma_1$ neither change the states of processes in $\sigma_2$ nor remove messages addressed to them, so $\sigma_2$ is still applicable after $\sigma_1$, with the same effect; and symmetrically. The final states of all processes and the final buffer are the same in either order.
:::

::: lemma There is a bivalent initial configuration {#lem-initial}
Some initial configuration is bivalent.
:::

::: proof
An initial configuration is determined by the vector of proposals. Consider the $n + 1$ initial configurations $C_0, C_1, \dots, C_n$, where $C_k$ has proposals $1$ for $p_1, \dots, p_k$ and $0$ for the rest; adjacent configurations differ in the proposal of one process. By validity, $C_0$ (all zeros) can only decide $0$ and $C_n$ (all ones) only $1$, and by termination each has a decision reachable, so $C_0$ is $0$-valent and $C_n$ is $1$-valent. If no $C_k$ is bivalent, there is an adjacent pair $C_{k-1}$ ($0$-valent) and $C_k$ ($1$-valent) differing only in the proposal of $p_k$. Consider an admissible execution from $C_{k-1}$ in which $p_k$ crashes at the start and takes no steps; the others decide, say on value $v$, after a finite schedule $\sigma$ not involving $p_k$. The same $\sigma$ is applicable to $C_k$ — the other processes have the same states, and $p_k$ never acts — and leads to the same decision $v$. So $v = 0$ (as $C_{k-1}$ is $0$-valent) and $v = 1$ (as $C_k$ is $1$-valent), a contradiction.
:::

::: lemma A bivalent configuration can be kept bivalent {#lem-bivalent}
Let $C$ be bivalent and let $e = (p, m)$ be an event applicable to $C$. Let $\mathcal{C}$ be the set of configurations reachable from $C$ without applying $e$, and $\mathcal{D} = \set{e(E) : E \in \mathcal{C}}$. Then $\mathcal{D}$ contains a bivalent configuration.
:::

::: proof
Note first that $e$ is applicable to every $E \in \mathcal{C}$, since $m$ stays in the buffer until $e$ is applied (or $m = \varnothing$). Suppose $\mathcal{D}$ contains no bivalent configuration.

*$\mathcal{D}$ contains both a $0$-valent and a $1$-valent configuration.* As $C$ is bivalent, for each $i \in \set{0,1}$ there is an $i$-valent configuration $E_i$ reachable from $C$. If $E_i \in \mathcal{C}$, then $e(E_i) \in \mathcal{D}$ is reachable from $E_i$, so it is not $(1-i)$-valent, and being univalent it is $i$-valent. If $E_i \notin \mathcal{C}$, then $e$ was applied on the way from $C$ to $E_i$, so some $F \in \mathcal{D}$ lies on that path; $E_i$ is reachable from $F$, so $F$, being univalent, is $i$-valent.

*Neighbours.* Call two configurations of $\mathcal{C}$ **neighbours** if one results from the other by a single event. Because $e(C)$ is univalent, say $0$-valent without loss of generality, and some $E \in \mathcal{C}$ has $e(E)$ $1$-valent, walking along the schedule from $C$ to $E$ (all of whose configurations are in $\mathcal{C}$) we find neighbours $C_0, C_1 \in \mathcal{C}$ with $C_1 = e'(C_0)$ for some event $e' = (p', m')$, $e(C_0)$ $0$-valent and $e(C_1)$ $1$-valent.

*Case $p' \neq p$.* By [[#lem-commute]], $e(C_1) = e(e'(C_0)) = e'(e(C_0))$. So the $1$-valent configuration $e(C_1)$ is reachable from the $0$-valent $e(C_0)$ — impossible.

*Case $p' = p$.* Consider an admissible execution from $C_0$ in which $p$ crashes immediately, and let $\sigma$ be a finite schedule, with no step of $p$, after which some process has decided; let $A = \sigma(C_0)$. Then $A$ is univalent. By [[#lem-commute]] (as $\sigma$ contains no steps of $p$, and $e$ and $e'$ are steps of $p$), $e(A) = \sigma(e(C_0))$, which is reachable from the $0$-valent $e(C_0)$, so it is $0$-valent; and $e(e'(A)) = \sigma(e(e'(C_0))) = \sigma(e(C_1))$, reachable from the $1$-valent $e(C_1)$, so it is $1$-valent. Both are reachable from $A$, so $A$ is bivalent — contradicting that a decision has been made in $A$.

Both cases are impossible, so $\mathcal{D}$ contains a bivalent configuration.
:::

::: theorem FLP impossibility (Fischer, Lynch and Paterson, 1985) {#thm-flp}
In the asynchronous model with reliable links, no deterministic algorithm solves consensus among $n \ge 2$ processes if one process may crash.
:::

::: proof
Using the lemmas, we build an admissible execution in which no process ever decides, contradicting termination. Start from a bivalent initial configuration ([[#lem-initial]]). Keep the processes in a queue, and repeat in stages: take the process $p$ at the head of the queue; let $m$ be the oldest message for $p$ in the buffer, or $\varnothing$ if there is none; apply [[#lem-bivalent]] with $e = (p, m)$ to reach a bivalent configuration by a finite schedule ending with $e$; move $p$ to the back of the queue.

Each stage is finite and ends in a bivalent configuration, so no decision is ever made (a configuration in which a process has decided is not bivalent). Every process takes a step in every $n$ stages, so all take infinitely many steps — no process crashes at all — and every message is eventually the oldest for its receiver and is received. The execution is admissible, and no process decides.
:::

Three points deserve emphasis. First, the bad execution has **no crash**: the mere *possibility* of a crash is what forces the algorithm, at each step, to be prepared to proceed without some process, which is what [[#lem-bivalent]] exploits. Second, the theorem is about **termination**: safety is easy to guarantee in the asynchronous model (never decide!), and Paxos and Raft never violate agreement however the network behaves. Third, the bad execution is fragile: it requires an adversarial scheduler that delays exactly the right messages forever. Real networks are not that malicious, which is why practical protocols work.

There are three standard ways around FLP, each weakening one assumption.
- **Partial synchrony.** Dwork, Lynch and Stockmeyer (1988) showed that consensus is solvable if the system is eventually synchronous, with $n \ge 2f + 1$ for crash failures: algorithms are always safe and terminate once delays are bounded. Paxos and Raft take this route, using timeouts for leader election.
- **Failure detectors.** Chandra and Toueg (1996) showed that consensus is solvable with an unreliable failure detector that eventually stops suspecting some correct process ([[distributed-systems/fault-tolerance]]).
- **Randomisation.** Ben-Or (1983) gave a randomised algorithm that terminates with probability $1$; FLP applies only to deterministic algorithms.

::: theorem A majority must be correct {#thm-majority}
In the partially synchronous model (or the asynchronous model with any failure detector that may make mistakes for a finite time), no algorithm solves consensus with $f$ crash failures if $n \le 2f$.
:::

::: proof
Suppose $n \le 2f$, and split the processes into groups $G_1$ and $G_2$ of sizes at most $f$ each. In execution $\alpha$, all processes of $G_2$ crash at the start and all of $G_1$ propose $0$; at most $f$ crash, so by termination the processes of $G_1$ decide, and by validity they decide $0$, by some time $t_1$. In execution $\beta$, symmetrically, $G_1$ crashes at the start, $G_2$ proposes $1$, and $G_2$ decides $1$ by time $t_2$. In execution $\gamma$, nobody crashes, $G_1$ proposes $0$, $G_2$ proposes $1$, and every message between the groups is delayed until after $\max(t_1, t_2)$ — allowed in partial synchrony, since the global stabilisation time may come later. Up to $t_1$, the processes of $G_1$ cannot distinguish $\gamma$ from $\alpha$, so they decide $0$; up to $t_2$, $G_2$ cannot distinguish $\gamma$ from $\beta$, so it decides $1$. Agreement is violated.
:::

So crash-tolerant consensus needs $n \ge 2f + 1$: three replicas tolerate one crash, five tolerate two. Majorities appear in every protocol below for exactly the reason of [[distributed-systems/replication-consistency#thm-quorum]]: any two majorities intersect, so a decision made by one majority is visible to every later majority.

::: quiz
FLP says that consensus is impossible in the asynchronous model. Which statement about Raft, used in a real data centre, is correct?
- [ ] Raft violates agreement in some executions, as FLP predicts.
- [x] Raft never violates agreement, but in some executions it never makes progress.
- [ ] Raft is not affected because it uses TCP, which is reliable.
- [ ] Raft is not affected because it is randomised.
::: solution
Raft is always safe; FLP shows that there exist executions in which it does not terminate — for example, repeated split votes caused by unlucky timing. Reliable links do not help: FLP assumes them. Raft's randomised timeouts make the bad executions improbable, but its safety does not depend on randomness, and an adversarial scheduler can still prevent progress; termination is guaranteed only under partial synchrony.
:::
:::

## Paxos

Leslie Lamport's Paxos (written in 1989, published in 1998 as "The part-time parliament", and retold plainly in "Paxos made simple", 2001) was the first practical consensus protocol for the asynchronous model with crash failures, and it underlies many production systems. Processes play three roles, and a process may play several: **proposers** propose values, **acceptors** vote, and **learners** learn the decision. There are $n = 2f + 1$ acceptors.

Proposals are tagged with **ballot numbers**, totally ordered and unique to each proposer (for example pairs (counter, proposer id)). The protocol has two phases per ballot.

::: algorithm Single-decree Paxos {#alg-paxos}
Each acceptor stores, durably: $\mathit{promised}$, the highest ballot it has promised (initially $0$), and $\mathit{accepted}$, the pair $(b, v)$ of the highest-numbered ballot in which it accepted a value, and that value (initially none).

*Phase 1.* (a) A proposer chooses a new ballot $b$ and sends $\textsf{prepare}(b)$ to all acceptors. (b) An acceptor receiving $\textsf{prepare}(b)$ with $b > \mathit{promised}$ sets $\mathit{promised} \gets b$ and replies $\textsf{promise}(b, \mathit{accepted})$; otherwise it ignores the request (or replies with a rejection).

*Phase 2.* (a) When the proposer has promises for $b$ from a majority, it picks a value: the value $v$ of the highest-ballot pair among the $\mathit{accepted}$ pairs reported in those promises, or, if none of them reports an accepted value, any value (its own proposal). It sends $\textsf{accept}(b, v)$ to all acceptors. (b) An acceptor receiving $\textsf{accept}(b, v)$ with $b \ge \mathit{promised}$ sets $\mathit{promised} \gets b$ and $\mathit{accepted} \gets (b, v)$ and notifies the learners; otherwise it ignores it.

*Decision.* A value $v$ is **chosen** when a majority of acceptors have accepted $(b, v)$ for the same ballot $b$. Learners decide $v$ when they learn this.
:::

The key rule is phase 2(a): a proposer is free to propose its own value only if no acceptor in its majority has accepted anything; otherwise it must adopt the most recent accepted value it hears of. That rule is what makes Paxos safe.

::: theorem Safety of Paxos {#thm-paxos}
If a value $v$ is chosen in ballot $b$, then every $\textsf{accept}(b', v')$ message with $b' \ge b$ has $v' = v$. Consequently, at most one value is ever chosen, and agreement, validity and integrity hold in every execution, however messages are delayed or lost and however many processes crash.
:::

::: proof
Let $v$ be chosen in ballot $b$, by a majority $Q$ of acceptors that accepted $(b, v)$. We prove by strong induction on $b' \ge b$ that any $\textsf{accept}(b', v')$ has $v' = v$. For $b' = b$: a ballot belongs to one proposer, which sends one value per ballot, so $v' = v$.

Let $b' > b$, and assume the claim for all ballots in $[b, b')$. The proposer of $b'$ sent $\textsf{accept}(b', v')$ after receiving promises for $b'$ from a majority $Q'$. Since $Q$ and $Q'$ are majorities, some acceptor $a$ belongs to both. Acceptor $a$ accepted $(b, v)$, and promised $b'$. It must have accepted $(b, v)$ *before* promising $b'$: after promising $b' > b$ it would ignore $\textsf{accept}(b, v)$. So $a$'s promise reported an accepted pair with ballot at least $b$. Hence the highest ballot $c$ among the pairs reported in the promises from $Q'$ satisfies $b \le c < b'$ (it is less than $b'$ because an acceptor reports only ballots it accepted before promising $b'$, which are below $b'$). The proposer of $b'$ chose $v'$ as the value of that pair, which was sent in $\textsf{accept}(c, v')$ with $b \le c < b'$. By the induction hypothesis, $v' = v$.

For the consequence: if $v$ is chosen in ballot $b$ and $w$ in ballot $c \ge b$, then $w$ was sent in an accept message for ballot $c$, so $w = v$. Validity: every value in an accept message is either some proposer's proposal or a value from an earlier accept message, so by induction it was proposed. Integrity holds because learners decide only once.
:::

The proof uses only quorum intersection and the acceptors' promises; it does not use time at all. Paxos is therefore safe in the fully asynchronous model, and FLP bites only on liveness: two proposers can **duel**, each preparing a higher ballot before the other's accept phase completes, for ever. The cure is to elect a **distinguished proposer** (leader), using timeouts, and to let others propose only if the leader seems to have failed; under partial synchrony a single leader is eventually stable and its proposal succeeds.

::: example Paxos recovers a chosen value {#ex-paxos}
Acceptors $A_1, A_2, A_3$. Proposer $P$ runs ballot $1$ with value $x$: its prepares reach all three, which promise; its $\textsf{accept}(1, x)$ reaches $A_1$ and $A_2$, which accept, and then $P$ crashes. Proposer $Q$ starts ballot $2$ with value $y$ and hears promises from $A_2$ and $A_3$. What does $Q$ propose? What if $\textsf{accept}(1, x)$ had reached only $A_1$?
::: solution
$x$ was chosen in ballot $1$: a majority ($A_1, A_2$) accepted it. $Q$'s promises are $A_2$: accepted $(1, x)$, and $A_3$: none. The highest accepted pair is $(1, x)$, so $Q$ must send $\textsf{accept}(2, x)$, not $y$ — exactly the intersection argument of [[#thm-paxos]], with $A_2$ as the common acceptor. The decision survives the crash of the proposer that made it.

If only $A_1$ had accepted, $x$ would not have been chosen. $Q$'s majority $\set{A_2, A_3}$ reports nothing accepted, so $Q$ may propose $y$, and if $A_2$ and $A_3$ accept, $y$ is chosen. $A_1$ still holds $(1, x)$, but a stale acceptance by a minority is harmless: any later proposer that hears from $A_1$ will also hear from $A_2$ or $A_3$, which report the higher ballot $2$ with $y$. Notice that $Q$ cannot tell these two situations apart from the outside — in both it saw a majority — and in both it acts safely.
:::
:::

### Multi-Paxos

A replicated log needs one consensus instance per log position. Running both phases for every entry costs two round trips. **Multi-Paxos** observes that phase 1 does not depend on the value: a leader can run phase 1 *once* for all future log positions with a ballot $b$ (acceptors reply with their accepted pairs for every position), and then, while it remains leader, commit each new entry with a single round of phase 2 — one round trip to a majority, plus a durable write at each acceptor. A new leader runs phase 1 with a higher ballot, learns every possibly-chosen value in the positions it does not know, re-proposes them, and fills gaps with no-ops. Lamport's papers leave many of these details unspecified, and implementing Multi-Paxos correctly is notoriously difficult; the Chubby team at Google described their experience in "Paxos made live" (Chandra, Griesemer and Redstone, 2007). Raft was designed to fill exactly that gap.

## Raft

Diego Ongaro and John Ousterhout's Raft ("In search of an understandable consensus algorithm", 2014) solves the same problem as Multi-Paxos, with the same fault tolerance and performance, but is organised around a **strong leader** and a small number of rules that can be checked one by one. It is used in etcd, Consul, CockroachDB, TiKV and many other systems (as of 2026).

### Terms, roles and elections

Time is divided into **terms**, numbered consecutively; each term begins with an election, and at most one leader is elected per term. Each server is a **follower**, a **candidate** or a **leader**. Each server stores durably its **current term**, the candidate it **voted for** in that term (if any), and its **log**, a sequence of entries each containing a command and the term in which a leader created it.

::: algorithm Raft leader election {#alg-raft-election}
1. Every message carries the sender's term. A server that sees a higher term than its own adopts it, clears its vote, and becomes a follower. Messages with a lower term are rejected.
2. A follower that hears nothing from a leader for an **election timeout** — chosen at random, for example from $[150, 300]$ ms — becomes a candidate: it increments its term, votes for itself, and sends $\textsf{RequestVote}(\mathit{term}, \mathit{lastLogTerm}, \mathit{lastLogIndex})$ to all servers.
3. A server grants its vote if it has not voted for anyone else in this term and the candidate's log is **at least as up to date** as its own: the candidate's last log term is larger, or equal with a last index at least as large (the **election restriction**). It writes its vote to stable storage before replying.
4. A candidate that receives votes from a majority becomes leader and immediately sends heartbeats (empty $\textsf{AppendEntries}$). A candidate that receives an $\textsf{AppendEntries}$ from a leader of its term becomes a follower. If the election times out (a split vote), it starts a new term.
:::

The randomised timeout is what makes elections usually succeed at the first attempt: the server whose timer expires first will normally have requested and received the votes before any other server's timer expires.

::: widget plot
f: 1 - (1 - d/x)^n
x: 10, 500
y: 0, 1
sliders: d=10:1:50:1; n=4:2:9:1
labels: \text{P(a second candidate starts before hearing the first)}
points: 150,0.2412
caption: The chance that an election is **contested**: after the leader fails, the $n$ remaining servers' timeouts are spread uniformly over a window of width $x$ ms, and a second server becomes a candidate if its timer expires less than $d$ ms (one message delay) after the first. For uniform timeouts this probability is exactly $1 - (1 - d/x)^n$. The dot is Raft's suggested window of $150$ ms with $4$ survivors and $10$ ms delays: about $24\%$. A contested election is not necessarily lost — with $5$ servers the first candidate can still collect a majority — but split votes become likely. Widen the window and contests become rare, at the price of slower failover; this is the latency–availability trade-off inside every consensus protocol.
:::

::: proposition Election safety {#prop-election-safety}
At most one leader is elected in each term.
:::

::: proof
A leader of term $T$ received votes from a majority of servers in term $T$. Each server votes at most once per term — its vote is on stable storage, so this holds across crashes. Two majorities share a server, which would have voted for both candidates in term $T$. So two leaders in one term are impossible.
:::

### Log replication

::: algorithm Raft log replication {#alg-raft-log}
1. A client sends a command to the leader, which appends it to its log as a new entry with the current term.
2. The leader sends each follower $\textsf{AppendEntries}(\mathit{term}, \mathit{prevLogIndex}, \mathit{prevLogTerm}, \mathit{entries}, \mathit{leaderCommit})$, where the entries are those following position $\mathit{prevLogIndex}$ in its log.
3. **Consistency check.** A follower accepts only if its log contains an entry at $\mathit{prevLogIndex}$ with term $\mathit{prevLogTerm}$. If so, it deletes any existing entries that conflict with the new ones (same index, different term) and everything after them, appends the new entries it does not have, and replies with success. Otherwise it replies with failure, and the leader retries with an earlier $\mathit{prevLogIndex}$, until the logs match.
4. **Commit rule.** The leader considers an entry **committed** once it is stored on a majority of servers *and* it was created in the leader's current term; committing an entry commits every entry before it. Followers learn the commit index from $\mathit{leaderCommit}$.
5. Every server applies committed entries to its state machine in log order.
:::

::: example Repairing a follower's log {#ex-log-repair}
A new leader in term $4$ has log terms $[1, 1, 2, 4]$ (indices $1$–$4$). A follower that received extra entries from the old leader of term $2$ has $[1, 1, 2, 2, 2]$. The leader starts with $\mathit{nextIndex} = 5$ for this follower (one past its own last entry). Trace the $\textsf{AppendEntries}$ exchanges until the logs match.
::: solution
1. $\mathit{prevLogIndex} = 4$, $\mathit{prevLogTerm} = 4$, no entries. The follower's entry at index $4$ has term $2 \ne 4$: failure. The leader sets $\mathit{nextIndex} = 4$.
2. $\mathit{prevLogIndex} = 3$, $\mathit{prevLogTerm} = 2$, entries $[(4, \cdot)]$ for index $4$. The follower's entry at $3$ has term $2$: the check succeeds. Its entry at index $4$ (term $2$) conflicts with the new one (term $4$), so it deletes indices $4$ and $5$ and appends the leader's entry. Its log is now $[1, 1, 2, 4]$, identical to the leader's, and it replies with success and match index $4$.

The follower's two term-$2$ entries at indices $4$ and $5$ were discarded. That is safe only because they were *not committed*: an entry stored on so few servers that the new leader lacks it cannot have been committed, by [[#thm-leader-completeness]] below. Real implementations speed up step 1 by having the follower report the term of the conflicting entry and the first index of that term, so the leader can skip a whole term per round trip instead of one entry.
:::
:::

The consistency check gives Raft an invariant that makes its logs easy to reason about.

::: lemma Log matching {#lem-log-matching}
If two logs contain an entry with the same index and the same term, then the entries are identical (same command), and the logs are identical in all entries up to that index.
:::

::: proof
*First part.* By election safety, a term has at most one leader, and a leader creates at most one entry at a given index in its term, never changing it. Entries move between servers only by being copied, so an entry with term $T$ at index $i$ anywhere is a copy of that unique entry.

*Second part,* by induction on the number of successful $\textsf{AppendEntries}$ steps. Initially all logs are empty. Suppose the property holds and a follower accepts entries following index $k = \mathit{prevLogIndex}$ from a leader. The check guarantees that the follower's entry at $k$ has the leader's term at $k$, so by the induction hypothesis the follower's log and the leader's agree up to $k$; after the step, the follower's log up to the last new entry is a copy of the leader's. Any other log that matches the follower's at some index and term within the new part matches the leader's there (by the first part, the entry is the same), hence, by the induction hypothesis applied to that log and the leader's, agrees with the leader's, and so with the follower's, up to that index. Deleting a conflicting suffix only shortens a log and does not create new pairs.
:::

::: theorem Leader completeness {#thm-leader-completeness}
If an entry is committed in term $T$, it is present in the logs of the leaders of all terms greater than $T$.
:::

::: proof
Suppose not. Let $e$ be committed by the leader $L_T$ of term $T$, and let $U > T$ be the smallest term whose leader $L_U$ lacks $e$. By the commit rule, $L_T$ stored on a majority of servers an entry of term $T$ at an index at least that of $e$, and by [[#lem-log-matching]] every server holding that entry also holds $e$; so $e$ is on a majority.

$L_T$ replicated $e$ to a majority, and $L_U$ received votes from a majority, so some server $V$ did both. $V$ accepted $e$ before voting for $L_U$: otherwise it would have seen term $U > T$ first and rejected $L_T$'s $\textsf{AppendEntries}$. $V$ still had $e$ when it voted, since entries are removed only when they conflict with a leader's log, and every leader between $T$ and $U$ contains $e$ by the minimality of $U$, so none of them caused $e$'s removal.

$V$ voted for $L_U$, so $L_U$'s log was at least as up to date as $V$'s. There are two cases.
- *Same last term $S$.* Then $L_U$'s log is at least as long as $V$'s. Both last entries were created by the unique leader of term $S$, so by [[#lem-log-matching]] each log is identical to that leader's log up to its own last index. $L_U$'s log is the longer of the two prefixes, so it contains all of $V$'s log, including $e$ — a contradiction.
- *$L_U$'s last term is larger than $V$'s.* $V$'s last term is at least $T$, as $V$ holds $e$ of term $T$, so $L_U$'s last entry has some term $S$ with $T < S < U$. The leader of term $S$, which created that entry, contains $e$ by minimality of $U$; by log matching, $L_U$'s log, which agrees with that leader's up to the entry of term $S$, contains $e$ — a contradiction.
:::

::: corollary State-machine safety {#cor-smr-safety}
If a server has applied the entry at index $i$ to its state machine, no other server ever applies a different entry at index $i$.
:::

::: proof
A server applies only committed entries. If two servers applied different entries at index $i$, both committed, let the earlier commit be in term $T$ and the other in term $T' \ge T$. By [[#thm-leader-completeness]], the leader of term $T'$ holds the first entry at index $i$ in its log; it commits only entries of its own log, and by [[#lem-log-matching]] it holds a single entry at index $i$. So the entries are the same.
:::

The commit rule's restriction to entries of the *current* term is subtle and essential. Without it, the following scenario from the Raft paper loses a committed entry.

::: example Why only current-term entries are committed by counting {#ex-figure8}
Five servers $S_1, \dots, S_5$. (a) $S_1$ is leader in term $2$ and replicates an entry at index $2$ (term $2$) to $S_2$ only, then crashes. (b) $S_5$ is elected for term $3$ with votes from $S_3, S_4, S_5$, appends a different entry at index $2$ with term $3$, and crashes before replicating it. (c) $S_1$ restarts, is elected for term $4$, and replicates its term-$2$ entry to $S_3$: it is now on $S_1, S_2, S_3$, a majority. Suppose $S_1$ treated it as committed and then crashed. What could happen?
::: solution
(d) $S_5$ can be elected for term $5$: its last log term is $3$, larger than the last term $2$ of $S_2$, $S_3$ and $S_4$'s (empty) logs, so all of them consider its log at least as up to date, and it gets votes from $S_2, S_3, S_4$. As leader it overwrites index $2$ on every follower with its term-$3$ entry. An entry stored on a majority — and, under the naive rule, already applied by $S_1$ — has been replaced: state-machine safety fails.

Raft's rule forbids the step that went wrong: in term $4$, $S_1$ may not commit the term-$2$ entry by counting replicas. It commits it only indirectly, once an entry of term $4$ that follows it reaches a majority. At that point a majority has last term $4$, so $S_5$ (last term $3$) can no longer win an election, and the proof of [[#thm-leader-completeness]] goes through. The proof used the rule in its first paragraph: committed entries are prefixes of a current-term entry stored on a majority.
:::
:::

### A simulation

The program below simulates five Raft servers in one process, in steps of one millisecond. Every message is delayed by $5$–$20$ ms and lost with probability $0.2$. The leader receives a new command every $40$ ms and sends $\textsf{AppendEntries}$ every $25$ ms. At $t = 1000$ ms the leader crashes; at $t = 1800$ ms it restarts with only its persistent state (term, vote, log). After every step, the driver checks state-machine safety: every committed entry at every index, on every server, must equal the first entry ever committed at that index. The message handlers follow [[#alg-raft-election]] and [[#alg-raft-log]] (simplified: no log compaction, no membership changes, and the leader retries one entry back at a time):

```python
import random
N, MAJ = 5, 3
rng = random.Random(1)
leaders, elections = [], [0]                                   # for the report

class Server:
    def __init__(self, i):
        self.id, self.term, self.voted, self.log = i, 0, None, []   # persistent state
        self.reset(0)
    def reset(self, now):                                           # volatile state
        self.role, self.commit, self.votes, self.up = "follower", 0, set(), True
        self.deadline = now + rng.randint(150, 300)                 # randomised election timeout
    def last(self): return (self.log[-1][0] if self.log else 0, len(self.log))

def handle(s, m, now, send):
    if m["term"] > s.term:                                          # newer term: step down
        s.term, s.voted, s.role = m["term"], None, "follower"
    t = m["type"]
    if t == "vote_req":
        ok = (m["term"] == s.term and s.voted in (None, m["src"])
              and (m["last_term"], m["last_idx"]) >= s.last())      # election restriction
        if ok: s.voted, s.deadline = m["src"], now + rng.randint(150, 300)
        send(s.id, m["src"], type="vote", term=s.term, granted=ok)
    elif t == "vote" and s.role == "candidate" and m["term"] == s.term and m["granted"]:
        s.votes.add(m["src"])
        if len(s.votes) >= MAJ:
            s.role, s.next, s.match = "leader", [len(s.log)] * N, [0] * N
            s.match[s.id] = len(s.log); leaders.append((s.term, s.id, now))
    elif t == "append":
        if m["term"] < s.term:
            return send(s.id, m["src"], type="ack", term=s.term, ok=False, idx=0)
        s.role, s.deadline = "follower", now + rng.randint(150, 300)
        p = m["prev_idx"]
        if p > len(s.log) or (p > 0 and s.log[p - 1][0] != m["prev_term"]):
            return send(s.id, m["src"], type="ack", term=s.term, ok=False, idx=p)   # consistency check fails
        for j, e in enumerate(m["entries"]):
            if p + j < len(s.log) and s.log[p + j][0] != e[0]:
                del s.log[p + j:]                                   # delete a conflicting suffix
            if p + j >= len(s.log): s.log.append(e)
        done = p + len(m["entries"])                                # log now matches the leader up to here
        s.commit = max(s.commit, min(m["commit"], done))
        send(s.id, m["src"], type="ack", term=s.term, ok=True, idx=done)
    elif t == "ack" and s.role == "leader" and m["term"] == s.term:
        if m["ok"]:
            s.match[m["src"]] = max(s.match[m["src"]], m["idx"])
            s.next[m["src"]] = max(s.next[m["src"]], m["idx"])
            for k in range(len(s.log), s.commit, -1):               # commit rule: majority AND current term
                if sum(x >= k for x in s.match) >= MAJ and s.log[k - 1][0] == s.term:
                    s.commit = k; break
        else:
            s.next[m["src"]] = max(0, s.next[m["src"]] - 1)         # back up and retry
```

The driver delivers messages, fires timeouts, and has the leader accept commands and send heartbeats:

```python
servers, net, applied, violations = [Server(i) for i in range(N)], [], {}, 0
def send(src, dst, **m):
    if rng.random() >= 0.2:                                         # 20% of messages are lost
        net.append((now + rng.randint(5, 20), dst, dict(m, src=src)))
for now in range(3000):
    if now == 1000: crashed = next(s for s in servers if s.role == "leader"); crashed.up = False
    if now == 1800: crashed.reset(now)                              # restarts with its persistent state only
    for item in [x for x in net if x[0] == now]:
        net.remove(item)
        if servers[item[1]].up: handle(servers[item[1]], item[2], now, send)
    for s in (s for s in servers if s.up):
        if s.role != "leader" and now >= s.deadline:                # timeout: start an election
            s.term, s.voted, s.role, s.votes = s.term + 1, s.id, "candidate", {s.id}
            elections[0] += 1
            s.deadline = now + rng.randint(150, 300)
            lt, li = s.last()
            for d in range(N):
                if d != s.id: send(s.id, d, type="vote_req", term=s.term, last_term=lt, last_idx=li)
        if s.role == "leader":
            if now % 40 == 0: s.log.append((s.term, f"cmd{now}")); s.match[s.id] = len(s.log)
            if now % 25 == 0:                                       # heartbeat / replication
                for d in range(N):
                    if d == s.id: continue
                    p = s.next[d]
                    send(s.id, d, type="append", term=s.term, prev_idx=p,
                         prev_term=s.log[p - 1][0] if p else 0, entries=s.log[p:], commit=s.commit)
    for s in servers:                                               # state machine safety, checked every tick
        for k in range(s.commit):
            violations += applied.setdefault(k, s.log[k]) != s.log[k]
for term, sid, t in leaders: print(f"t={t:4} ms  server {sid} becomes leader of term {term}")
terms = [t for t, _, _ in leaders]
print("elections started:", elections[0], " terms with two leaders:", [t for t in set(terms) if terms.count(t) > 1])
print("commit index per server:", [s.commit for s in servers])
print("entries committed:", len(applied), " safety violations:", violations,
      " last:", applied[len(applied) - 1])
```

```console
$ python3 raft.py
t= 378 ms  server 3 becomes leader of term 2
t=1411 ms  server 4 becomes leader of term 5
elections started: 8  terms with two leaders: []
commit index per server: [53, 53, 53, 53, 54]
entries committed: 54  safety violations: 0  last: (5, 'cmd2960')
```

Read the output against the theory. The first leader is elected for term $2$ — term $1$'s election failed because of lost votes — after $378$ ms. When it crashes at $1000$ ms, the cluster is **unavailable** for $411$ ms: followers must time out, and with $20\%$ message loss two more elections (terms $3$ and $4$) fail before server $4$ wins term $5$. No term ever had two leaders ([[#prop-election-safety]]). The restarted server $3$ rejoined as a follower, received the entries it had missed through the consistency check, and is up to date; and across all $3000$ steps no committed entry was ever changed ([[#cor-smr-safety]]). The leader's commit index is one ahead of the followers', which learn it with the next heartbeat. Running with other seeds changes the timings and the number of elections but never the safety result — which is what the proofs promise, since safety did not depend on timing. (The simulation is a teaching model; a real implementation must also persist state before replying, bound message sizes, compact the log into snapshots and change membership safely.)

::: warning A leader is not necessarily the leader
A server that believes it is the leader may have been deposed without knowing it: it may be partitioned from the majority, which has elected a new leader in a higher term. If it answers reads from its local state, it may return stale data, violating linearisability. Raft's write path is safe, because the old leader cannot commit anything without a majority. For reads, a leader must either confirm that it is still leader by exchanging heartbeats with a majority before answering (the **ReadIndex** technique), or rely on a time-based **lease** — which is safe only if clock drift is bounded, an assumption outside the asynchronous model ([[distributed-systems/time-clocks]]).
:::

::: quiz
A Raft follower's log has entries with terms $[1, 1, 2, 2, 2]$; a candidate's log has terms $[1, 1, 3]$. The follower has not voted in the candidate's term. Does it grant its vote?
- [x] Yes, because the candidate's last term ($3$) is higher
- [ ] No, because the candidate's log is shorter
- [ ] No, because the logs differ at index $3$
- [ ] Only if the candidate's term is at least $4$
::: solution
"At least as up to date" compares last terms first and lengths only when the last terms are equal. The candidate's last entry is from term $3$, newer than the follower's term $2$; an entry of term $3$ could only exist if the leader of term $3$ was elected with knowledge of every committed entry up to then. The follower's term-$2$ entries at indices $3$–$5$ cannot have been committed after term $3$ began without the candidate knowing — so it is safe to vote yes, and the follower's conflicting entries will be overwritten if the candidate wins.
:::
:::

## In practice

Consensus is expensive compared with an unreplicated write: each committed entry needs a round trip from the leader to a majority and a durable write (an `fsync`, from tens of microseconds on modern solid-state drives to milliseconds) on each of them. Systems therefore **batch** many commands into one entry and **pipeline** entries without waiting for earlier ones to commit. Within a data centre, a few thousand to hundreds of thousands of commits per second are typical figures for such systems; across continents, every commit costs a wide-area round trip, the PACELC price of [[distributed-systems/replication-consistency]].

Consensus groups are therefore kept small — usually three or five servers — and are used for *metadata* and *coordination* rather than bulk data: the configuration of a cluster, who leads each partition, who holds a lock. Google's Chubby lock service (Burrows, 2006) and Apache ZooKeeper (Hunt and colleagues, 2010; its protocol is Zab) provide this as a service, and etcd does so for Kubernetes. Large databases run one consensus group per data partition, so that throughput grows with the number of partitions ([[distributed-systems/distributed-storage]]).

::: history
Lamport, Shostak and Pease's "Reaching agreement in the presence of faults" (1980) and "The Byzantine generals problem" (1982) posed agreement problems with arbitrary faults. Michael Fischer, Nancy Lynch and Michael Paterson's "Impossibility of distributed consensus with one faulty process" (*Journal of the ACM*, 1985) received the Dijkstra Prize in 2001. Michael Ben-Or's randomised protocol appeared in 1983, Cynthia Dwork, Nancy Lynch and Larry Stockmeyer's partial-synchrony results in 1988 and Tushar Chandra and Sam Toueg's failure detectors in 1996. Brian Oki and Barbara Liskov's Viewstamped Replication (1988) was an early leader-based replication protocol closely related to Paxos. Lamport submitted "The part-time parliament", which told Paxos as the story of a Greek island's parliament, in 1989; it was published in *ACM Transactions on Computer Systems* in 1998, and "Paxos made simple" followed in 2001. Diego Ongaro and John Ousterhout presented Raft at the USENIX Annual Technical Conference in 2014, where it won a best paper award.
:::

## Where this leads

[[distributed-systems/fault-tolerance]] builds state-machine replication on top of consensus, makes failure detection precise, and asks what happens when processes are not merely crashed but **Byzantine** — the answer requires $n \ge 3f + 1$. [[distributed-systems/distributed-storage]] uses consensus groups per partition. [[distributed-systems/distributed-transactions]] shows that atomic commitment is a different problem from consensus, why two-phase commit blocks, and how running its coordinator on Paxos removes the block. Formal methods such as TLA+, used to specify and model-check Paxos and Raft, are introduced in [[software-engineering/verification]].

::: summary
- **Consensus**: every correct process decides (termination) the same (agreement) proposed (validity) value; it is equivalent to **total-order broadcast** and underlies **state-machine replication**.
- With synchronous rounds, **FloodSet** solves consensus in $f + 1$ rounds ([[#thm-floodset]]).
- **FLP**: in the asynchronous model, no deterministic algorithm solves consensus if one process may crash ([[#thm-flp]]) — bivalent configurations can be prolonged for ever.
- With partial synchrony, consensus is solvable if and only if a **majority is correct**, $n \ge 2f + 1$ ([[#thm-majority]]).
- **Paxos** is safe in every execution: a proposer must adopt the highest-ballot accepted value reported by a majority ([[#thm-paxos]]); Multi-Paxos commits each entry in one round trip under a stable leader.
- **Raft** uses terms, randomised elections, the **election restriction**, the **consistency check** and the **current-term commit rule** to guarantee election safety, log matching, leader completeness and state-machine safety.
- Practical protocols are **always safe** and live only when timing is good; FLP is about liveness.
:::

## Exercises

::: exercise How many failures? {level=1 check="3"}
A consensus group of $7$ servers uses majorities. How many crashed servers can it tolerate while still making progress? (Enter the number.)
::: solution
A majority of $7$ is $4$, so up to $3$ servers can crash. By [[#thm-majority]], tolerating $f$ crashes needs $n \ge 2f + 1$; $7 = 2 \cdot 3 + 1$. Note that $6$ servers also tolerate only $2$ crashes (a majority of $6$ is $4$), which is why groups have an odd number of members.
:::
:::

::: exercise FloodSet messages {level=1 check="60"}
How many messages does FloodSet send with $n = 5$ processes and $f = 2$, if no process crashes? (Enter the number.)
::: solution
There are $f + 1 = 3$ rounds, in each of which every process sends to the $n - 1 = 4$ others: $3 \times 5 \times 4 = 60$ messages.
:::
:::

::: exercise Who can win? {level=1}
Three Raft servers have logs with terms $A = [1, 2, 2]$, $B = [1, 2]$, $C = [1, 3]$. For each server, say which of the other two would grant it a vote (assuming they have not voted in the candidate's term).
::: solution
Compare (last term, length): $A = (2, 3)$, $B = (2, 2)$, $C = (3, 2)$. $A$ as candidate: $B$ votes yes ($A$'s last term equal and longer); $C$ votes no ($3 > 2$). $B$ as candidate: $A$ votes no (same last term, shorter); $C$ votes no. $C$ as candidate: both vote yes, since its last term $3$ is the highest. So $A$ and $C$ can win (each needs one other vote); $B$ cannot.
:::
:::

::: exercise What must the proposer propose? {level=2}
Five acceptors. A proposer running ballot $9$ receives promises from three of them reporting accepted pairs: $(5, x)$, none, and $(7, y)$. What value must it propose? Can it be sure that $y$ was chosen?
::: solution
It must propose $y$, the value of the highest-ballot accepted pair ($7$). It cannot be sure $y$ was chosen: perhaps only this one acceptor accepted it in ballot $7$. But $y$ *might* have been chosen (by a majority that includes acceptors not in this quorum), and $x$ cannot have been chosen in ballot $5$ unless $y = x$: if $x$ had been chosen in ballot $5$, then by [[#thm-paxos]] every accept in ballot $7$ would carry $x$. So proposing $y$ is the only safe choice.
:::
:::

::: exercise Commit index {level=2 check="4"}
A Raft leader in term $5$ has log terms $[1, 3, 3, 5, 5, 5]$ (indices $1$–$6$). Its match indices for the four followers are $6, 4, 3, 1$ (and its own log has length $6$). What is the highest index it may consider committed? (Enter the index.)
::: solution
With five servers a majority is $3$. Indices stored on at least $3$ servers (leader $6$, followers $6, 4, 3, 1$): index $4$ is on the leader and the followers with $6$ and $4$ — three servers; index $5$ is on only two. So index $4$ is replicated on a majority, and its term is $5$, the current term, so by the commit rule index $4$ (and everything before it) is committed. Had the entry at index $4$ been from an earlier term, the leader would have had to wait.
:::
:::

::: exercise Expected time to the first timeout {level=2 check="180"}
After a Raft leader crashes, each of the $4$ remaining servers times out at a time uniform in $[150, 300]$ ms after the last heartbeat it received (assume all received it at the same moment). What is the expected time until the first server becomes a candidate? (Enter the number of milliseconds.)
::: solution
The minimum of $k$ independent uniform variables on $[0, w]$ has mean $w/(k+1)$. With $w = 150$ and $k = 4$, the first timeout comes on average $150 + 150/5 = 180$ ms after the heartbeat. With a successful election one round trip later, failover takes about $200$ ms in this model — the shortest unavailability one can expect, before counting split votes.
:::
:::

::: exercise Quorums that do not intersect {level=3}
A designer runs Paxos with $4$ acceptors and quorums of size $2$, arguing that this tolerates $2$ crashes. Give an execution in which two different values are chosen. Then show that Paxos is safe with $4$ acceptors if all quorums have size $3$, and say how many crashes that tolerates.
::: solution
Acceptors $A_1, \dots, A_4$. Proposer $P$ runs ballot $1$: promises from $A_1, A_2$, then $\textsf{accept}(1, x)$ accepted by $A_1, A_2$ — $x$ is chosen (a "quorum" of $2$). Proposer $Q$ runs ballot $2$: promises from $A_3, A_4$, which have accepted nothing, so $Q$ may propose $y$; $A_3, A_4$ accept — $y$ is chosen. Two values chosen: agreement fails, because the quorums $\set{A_1, A_2}$ and $\set{A_3, A_4}$ are disjoint, and the proof of [[#thm-paxos]] needed a common acceptor.

With quorums of size $3$, any two quorums of $4$ acceptors share at least $3 + 3 - 4 = 2$ acceptors, so the proof applies unchanged: safety holds. Progress needs $3$ live acceptors, so only $1$ crash is tolerated — the same as with $3$ acceptors, which is why even numbers are not used.
:::
:::

::: exercise Acceptors must remember {level=3}
Show that if an acceptor in Paxos can crash and recover *without* stable storage (forgetting $\mathit{promised}$ and $\mathit{accepted}$), two different values can be chosen. Which Raft state plays the same role, and what goes wrong if it is not persisted?
::: solution
Three acceptors. Ballot $1$: $A_1, A_2$ accept $x$ — chosen. $A_2$ crashes and recovers with empty state. Ballot $2$: promises from $A_2$ (reports nothing) and $A_3$ (nothing), so the proposer may propose $y$; $A_2$ and $A_3$ accept — $y$ chosen. The intersection acceptor $A_2$ forgot its acceptance, so the induction step of [[#thm-paxos]] fails. (Even forgetting only $\mathit{promised}$ breaks it: an acceptor could promise ballot $3$, forget, then accept an old ballot-$2$ value after the ballot-$3$ proposer has relied on its promise.)

In Raft, $\mathit{currentTerm}$, $\mathit{votedFor}$ and the log are persistent. If $\mathit{votedFor}$ were lost, a server could vote for two candidates in the same term — once before a crash and once after — breaking [[#prop-election-safety]]: two leaders could be elected in one term and could create different entries with the same index and term, breaking log matching. If log entries a follower acknowledged were lost, an entry counted towards a majority might vanish, breaking leader completeness.
:::
:::

::: exercise Consensus and total-order broadcast {level=3}
(a) Given a consensus algorithm (usable for many independent instances), implement total-order broadcast. (b) Given total-order broadcast, solve consensus. Argue the correctness of each construction for crash failures.
::: solution
(a) Each process reliably broadcasts each message it wants to total-order-broadcast, and keeps the set of messages it has received but not yet delivered, together with a counter $k$ starting at $1$. Repeatedly: propose the current pending set to consensus instance $k$ (proposing the empty set if necessary); when instance $k$ decides a set $S$, deliver the messages of $S$ not yet delivered, in a fixed deterministic order (say, sorted by sender and sequence number), and move on to instance $k + 1$.

*Same order*: every process delivers the decided sets of instances $1, 2, \dots$ in turn, sorted the same way, and by agreement all processes see the same decided sets, so their delivery sequences are identical. *No creation*: by validity a decided set was proposed, so it contains only broadcast messages. *Every message of a correct process is delivered*: by reliable broadcast it eventually enters the pending set of every correct process and stays there until delivered. Each faulty process proposes in only finitely many instances before it crashes; in every instance beyond those, the decided set was proposed by a correct process (validity), and once all correct processes hold the message pending, each such proposal contains it. So it is delivered.

(b) Each process total-order-broadcasts its proposal and decides the value of the first message it delivers. *Agreement*: all processes deliver the same first message. *Validity*: it is someone's proposal. *Termination*: every correct process broadcasts, so at least one message is delivered by every correct process. *Integrity*: decide once. So the two problems are equivalent, and FLP applies equally to total-order broadcast.
:::
:::
