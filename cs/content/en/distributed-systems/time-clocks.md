A user reports that money vanished from her account. The engineers collect the logs of the two servers involved and sort the entries by timestamp. Server A logged "debit £50, send transfer to B" at 12:00:00.120. Server B logged "receive transfer from A, credit £50" at 12:00:00.095 — twenty-five milliseconds *before* it was sent. Nothing is wrong with the transfer; B's clock is simply thirty milliseconds behind A's. Sorting by timestamp has produced a history that cannot have happened, and anyone reasoning from it — a person debugging, or a program deciding which of two updates is newer — will draw the wrong conclusions.

Every computer has a clock, but no two clocks agree exactly, and in an asynchronous system no amount of message exchange can make them agree exactly. This chapter asks what we *can* know about time and order in a distributed system. We first see how physical clocks drift and how protocols such as NTP synchronise them, with provable error bounds. We then give up on physical time and follow Lamport's insight that what usually matters is not *when* events happened but which events could have **influenced** which — the **happened-before** relation. We build **Lamport clocks**, which respect this relation, and **vector clocks**, which capture it exactly, and prove both facts. Finally we use these ideas to record a **consistent snapshot** of a running system with the Chandy–Lamport algorithm, and see how Google's TrueTime brings physical time back with explicit uncertainty. The model is that of [[distributed-systems/system-models]]: processes exchanging messages, no shared memory, no global clock.

## Physical clocks

A computer's clock is a counter driven by a quartz crystal oscillator, read by the operating system and converted to a time of day. Crystals are cheap and stable but not exact: their frequency depends on manufacturing tolerance and temperature, so a clock gains or loses time at a rate typically of a few to a few tens of **parts per million** (ppm). Twenty ppm is $1.7$ seconds a day.

::: definition Clock, offset and drift {#def-clock}
Let $t$ denote real time. The **clock** of process $p$ is a function $C_p(t)$, the reading of $p$'s clock at real time $t$. The **offset** of $p$'s clock is $C_p(t) - t$, and the **skew** between two clocks is $\abs{C_p(t) - C_q(t)}$. A clock has **drift bound** $\rho$ if, for all $t < t'$,
$$
(1 - \rho)(t' - t) \;\le\; C_p(t') - C_p(t) \;\le\; (1 + \rho)(t' - t).
$$ {#eq-drift}
:::

Two free-running clocks drift apart, so they must be **resynchronised** periodically. How often?

::: proposition Skew between resynchronisations {#prop-resync}
Suppose two clocks have drift bound $\rho$, and every $R$ seconds of real time both are set so that they differ by at most $\varepsilon$. Then their skew never exceeds $\varepsilon + 2\rho R$.
:::

::: proof
Consider a resynchronisation at real time $t_0$, after which $\abs{C_p(t_0) - C_q(t_0)} \le \varepsilon$, and a time $t \in [t_0, t_0 + R]$. By [[#eq-drift]], each clock advances by an amount in $[(1-\rho)(t - t_0), (1+\rho)(t - t_0)]$, so the difference of their advances is at most $2\rho(t - t_0) \le 2\rho R$. Hence
$$
\abs{C_p(t) - C_q(t)} \le \abs{C_p(t_0) - C_q(t_0)} + 2\rho (t - t_0) \le \varepsilon + 2\rho R.
$$
:::

::: widget plot
f: e + 2*r*mod(x, R)/1000
x: 0, 300
y: 0, 10
sliders: r=20:1:100:1; R=60:5:300:5; e=0.5:0:5:0.1
labels: \text{worst-case skew (ms)}
caption: Worst-case skew in milliseconds between two clocks over five minutes, from [[#prop-resync]]: drift bound $r$ ppm, resynchronisation every $R$ seconds to within $e$ ms. The sawtooth climbs at $2r$ microseconds per second and drops at each resynchronisation. With $20$ ppm and a resync every $60$ s the skew stays below $2.9$ ms. Double the interval and the peaks double; halve the drift (a temperature-compensated oscillator) and they halve. Notice that $e$ — how precisely one can synchronise over the network — sets a floor no resync rate can remove.
:::

### Synchronising over a network

The obvious way to set a clock is to ask a server with a better one (ultimately a GPS receiver or an atomic clock). The difficulty is that the answer takes time to arrive, and the client does not know how long.

::: theorem Cristian's bound {#thm-cristian}
A client sends a request at time $T_0$ on its clock and receives a reply carrying the server's clock reading $S$ at time $T_1$ on its clock. Assume the client's clock does not drift during the exchange, the server read its clock at some moment between receiving the request and sending the reply, and message delays are non-negative. Then, at the moment the reply arrives, the server's clock reads a value in $[S, S + (T_1 - T_0)]$; setting the client's clock to $S + (T_1 - T_0)/2$ makes its error at most $(T_1 - T_0)/2$.
:::

::: proof
Let $D = T_1 - T_0$ be the round-trip time measured by the client. The server read $S$ after the request was sent and before the reply arrived, so the real time that elapsed between the server's reading and the reply's arrival lies between $0$ and $D$. Since the server's clock advances at (essentially) real-time rate over this short interval, at the reply's arrival it reads between $S$ and $S + D$. The midpoint $S + D/2$ of this interval is at most $D/2$ from any point in it.
:::

If a lower bound $\mathit{min}$ on one-way delay is known, the interval shrinks to $[S + \mathit{min}, S + D - \mathit{min}]$ and the error bound to $D/2 - \mathit{min}$. Either way, the error is governed by the round-trip time, which is why clients make several measurements and trust the one with the smallest round trip. Flaviu Cristian proposed this probabilistic synchronisation in 1989.

The **Network Time Protocol** (NTP, by David Mills, from 1985; version 4 is RFC 5905, 2010) refines the idea with four timestamps, which also cancel the server's processing time.

::: theorem NTP offset and delay {#thm-ntp}
A client sends a request at $t_1$ (client clock); the server receives it at $t_2$ and replies at $t_3$ (server clock); the client receives the reply at $t_4$ (client clock). Define
$$
\theta = \frac{(t_2 - t_1) + (t_3 - t_4)}{2}, \qquad \delta = (t_4 - t_1) - (t_3 - t_2).
$$ {#eq-ntp}
Assume neither clock drifts during the exchange, and let $\theta^*$ be the true offset of the server's clock relative to the client's (server reading $=$ client reading $+ \theta^*$ at every instant). Then $\delta \ge 0$ is the total network delay, and $\theta - \delta/2 \le \theta^* \le \theta + \delta/2$. If the two one-way delays are equal, $\theta = \theta^*$.
:::

::: proof
Let $d_1, d_2 \ge 0$ be the real one-way delays of the request and the reply. Converting the server's timestamps to the client's clock by subtracting $\theta^*$,
$$
t_2 - \theta^* = t_1 + d_1, \qquad t_4 = t_3 - \theta^* + d_2 .
$$
Hence $\theta^* = (t_2 - t_1) - d_1$ and $\theta^* = (t_3 - t_4) + d_2$. Adding the two equations and halving gives $\theta^* = \theta + (d_2 - d_1)/2$. Subtracting the first expression for $t_4 - t_1$: $t_4 - t_1 = d_1 + (t_3 - t_2) + d_2$, so $\delta = d_1 + d_2 \ge 0$. Since $d_1, d_2 \ge 0$ with $d_1 + d_2 = \delta$, the difference $d_2 - d_1$ lies in $[-\delta, \delta]$, which gives the bounds; and $d_1 = d_2$ gives $\theta^* = \theta$.
:::

::: example An NTP exchange {#ex-ntp}
A client sends a request at $t_1 = 10{:}00{:}00.000$ by its clock. The server receives it at $t_2 = 10{:}00{:}00.130$ and replies at $t_3 = 10{:}00{:}00.131$ by its clock. The reply arrives at $t_4 = 10{:}00{:}00.042$ by the client's clock. Estimate the offset and bound the error.
::: solution
In milliseconds after 10:00:00, $t_2 - t_1 = 130$ and $t_3 - t_4 = 131 - 42 = 89$, so $\theta = (130 + 89)/2 = 109.5$ ms. The delay is $\delta = (42 - 0) - (131 - 130) = 41$ ms. By [[#thm-ntp]] the server's clock is between $109.5 - 20.5 = 89$ and $109.5 + 20.5 = 130$ ms ahead of the client's. The client adjusts its clock by about $109.5$ ms; if the delays were in fact equal ($20.5$ ms each way), this is exact. Notice that the client's clock reads $42$ ms at the reply's arrival while the server sent it at $131$: the raw timestamps say the reply arrived before it was sent, the paradox of this chapter's opening, resolved by the offset.
:::
:::

Real NTP keeps the round trips with the smallest delay among recent samples, combines several servers with a clock-selection algorithm that discards outliers, and **slews** the clock (runs it slightly fast or slow) rather than jumping it, except for large errors. Servers form a hierarchy of **strata**: stratum 0 is a reference clock (GPS, atomic), stratum 1 servers are attached to one, stratum 2 servers synchronise with stratum 1, and so on. Over the internet NTP typically achieves accuracy of a few to tens of milliseconds; within a data centre, around a millisecond or better; and the **Precision Time Protocol** (PTP, IEEE 1588) with hardware timestamping in network cards and switches reaches microseconds or below. The **Berkeley algorithm** (Gusella and Zatti, 1989) solves a different problem: with no authoritative source, a master polls the machines, averages their clocks (discarding outliers) and tells each how to adjust, so that they agree with each other rather than with true time.

::: warning Time-of-day clocks can jump — never measure durations with them
The time-of-day clock (`time.time()` in Python, `CLOCK_REALTIME` in POSIX) can be stepped backwards or forwards by NTP or an administrator, and around a leap second it may repeat or smear a second. A duration computed as the difference of two readings can therefore be negative or wildly wrong, and a lease or timeout based on it can expire early or never. Use a **monotonic clock** (`time.monotonic()`, `CLOCK_MONOTONIC`) for durations and timeouts: it never goes backwards, although it has no meaning across machines or reboots. And never assume that timestamps from two machines can be compared to better than their (unknown, unbounded) skew — "last writer wins" by wall-clock timestamp silently discards writes whose clock was behind.
:::

## The happened-before relation

Clock synchronisation narrows the uncertainty but cannot remove it, and in an asynchronous system there is no bound at all. Lamport's 1978 paper "Time, clocks, and the ordering of events in a distributed system" changed the question. Instead of asking when an event occurred, ask which events *could have affected* it. An event can affect another only if information flows from one to the other — along a process's own sequence of steps, or through a message.

::: definition Happened-before {#def-hb}
The **happened-before** relation $\to$ on the events of an execution is the smallest relation such that
1. if $a$ and $b$ are events of the same process and $a$ occurs before $b$, then $a \to b$;
2. if $a$ is the sending of a message and $b$ is its receipt, then $a \to b$;
3. if $a \to b$ and $b \to c$, then $a \to c$ (transitivity).

Events $a$ and $b$ are **concurrent**, written $a \parallel b$, if neither $a \to b$ nor $b \to a$.
:::

Happened-before is a strict partial order: it is transitive by definition, and irreflexive because every step of a chain $a \to \dots \to b$ moves strictly forward in real time (a process's later step happens later, a message is received after it is sent), so no chain returns to its start. It is *potential* causality: $a \to b$ means that $a$ could have influenced $b$, not that it did. And $a \parallel b$ means that the two events are causally unrelated — no execution of the algorithm could have let one know about the other — even if, by the wall clock, one happened an hour before the other.

We draw executions as **space–time diagrams**: one horizontal line per process, time running to the right, events as dots, messages as arrows between dots. Then $a \to b$ exactly when there is a path from $a$ to $b$ moving rightwards along process lines and along message arrows.

::: example A three-process execution {#ex-execution}
Processes $P_1, P_2, P_3$ perform these events, in order on each process:
- $P_1$: $a$ (internal), $b$ (send $m_1$ to $P_2$), $c$ (receive $m_3$);
- $P_2$: $d$ (receive $m_1$), $e$ (send $m_2$ to $P_3$), $f$ (internal);
- $P_3$: $g$ (internal), $h$ (receive $m_2$), $i$ (send $m_3$ to $P_1$).

Which pairs among $(a, h)$, $(g, b)$, $(f, c)$, $(g, c)$ are related by $\to$?
::: solution
$a \to h$: $a \to b$ (same process), $b \to d$ ($m_1$), $d \to e$, $e \to h$ ($m_2$). $g$ and $b$ are concurrent: nothing leaves $P_3$ before $i$, and $b$ has no path to $g$, which is $P_3$'s first event. $f \parallel c$: the only message into $P_1$ after $b$ is $m_3$, sent by $i$; $f$ has no outgoing message, and nothing from $c$ reaches $f$. $g \to c$: $g \to h \to i \to c$. So $\to$ links events on different processes only through chains of messages.
:::
:::

::: widget graph
nodes: a@0,2; b@1,2; c@4,2; d@1.5,1; e@2.5,1; f@3.5,1; g@0.5,0; h@3,0; i@3.5,0.3
edges: a>b; b>c; b>d; d>e; e>f; g>h; e>h; h>i; i>c
algorithm: topo
caption: The execution of [[#ex-execution]] as a directed graph: process order and messages are the edges, and $x \to y$ holds exactly when there is a path from $x$ to $y$. Step through the topological sort: it produces one **linearisation** — a total order of all events consistent with happened-before, a possible order in which an observer could have seen them. Run it again after dragging vertices and notice that many orders are possible, because concurrent events such as $g$ and $b$ may appear either way round. Lamport timestamps pick out one such order.
:::

## Lamport clocks

We want to attach a number to every event so that numbers respect causality. Lamport's logical clocks do this with a counter per process and one rule for messages.

::: algorithm Lamport clock {#alg-lamport}
Each process $p$ keeps an integer $L_p$, initially $0$.
1. Before each event at $p$ (internal, send or receive), set $L_p \gets L_p + 1$; the event's timestamp is the new value.
2. When sending a message, attach the timestamp of the send event.
3. Upon receiving a message with timestamp $t$: set $L_p \gets \max(L_p, t)$, then apply rule 1, so the receive event has timestamp $\max(L_p, t) + 1$.
:::

::: theorem Clock condition {#thm-clock-condition}
For all events $a$ and $b$, if $a \to b$ then $L(a) < L(b)$.
:::

::: proof
It suffices to prove the claim for the two generating cases of [[#def-hb]], since $<$ is transitive and every pair $a \to b$ is connected by a finite chain of such steps. If $a$ precedes $b$ on the same process, the counter never decreases and is incremented before $b$, so $L(b) \ge L(a) + 1$. If $a$ sends a message received at event $b$, the message carries $t = L(a)$ and $L(b) = \max(L_p, t) + 1 \ge L(a) + 1$.
:::

The converse fails: $L(a) < L(b)$ does not imply $a \to b$. In [[#ex-execution]] the Lamport timestamps are $a = 1, b = 2, c = 7$ on $P_1$; $d = 3, e = 4, f = 5$ on $P_2$; and $g = 1, h = 5, i = 6$ on $P_3$. Then $L(g) = 1 < L(b) = 2$ although $g \parallel b$, and $L(f) = 5 < L(c) = 7$ although $f \parallel c$. What the clock condition does give, by contraposition, is: if $L(a) \ge L(b)$ then $a \not\to b$ — an event cannot have been influenced by an event with an equal or larger timestamp.

### A total order

Timestamps can tie ($L(f) = L(h) = 5$ above). Breaking ties by process identifier gives a total order: $(L(a), p_a) < (L(b), p_b)$ if $L(a) < L(b)$, or $L(a) = L(b)$ and $p_a < p_b$. By [[#thm-clock-condition]] this total order **extends** happened-before — it never contradicts causality — and every process can compute it locally from the timestamps alone. Lamport used it to solve **mutual exclusion** without a central coordinator: a process wanting the resource broadcasts a timestamped request; every process keeps requests in a queue ordered by $(L, p)$ and acknowledges them; a process enters the critical section when its request is at the head of its queue and it has received a message with a larger timestamp from every other process (so no earlier request can still be in transit, assuming FIFO channels); on leaving, it broadcasts a release. Each entry costs $3(n-1)$ messages. More importantly, the same idea — every process applies the same commands in the same total order — is **state-machine replication**, the subject of [[distributed-systems/consensus]] and [[distributed-systems/fault-tolerance]]. (Lamport's algorithm assumes no failures; tolerating them is what consensus adds.)

::: quiz
Events $x$ and $y$ have Lamport timestamps $L(x) = 3$ and $L(y) = 8$. What can you conclude?
- [ ] $x \to y$
- [x] $y \not\to x$ (it is not the case that $y$ happened before $x$)
- [ ] $x \parallel y$
- [ ] $x$ occurred earlier in real time than $y$
::: solution
By the clock condition, $y \to x$ would force $L(y) < L(x)$, which is false; so $y \not\to x$. Either $x \to y$ or $x \parallel y$ is possible — the timestamps cannot tell which. Nor do they say anything about real time: concurrent events may have occurred in either order.
:::
:::

## Vector clocks

To decide whether two events are causally related or concurrent — which is exactly what a replicated database needs in order to tell whether one update supersedes another or they conflict ([[distributed-systems/replication-consistency]]) — we need a timestamp that characterises $\to$ exactly. A single integer cannot do it (Exercise 8). A vector of $n$ integers can.

::: algorithm Vector clock {#alg-vector}
Each process $p_i$ keeps a vector $V_i \in \N^n$, initially all zeros.
1. Before each event at $p_i$, set $V_i[i] \gets V_i[i] + 1$; the event's timestamp $V(e)$ is the new vector.
2. When sending a message, attach the timestamp of the send event.
3. Upon receiving a message with timestamp $W$: set $V_i[j] \gets \max(V_i[j], W[j])$ for every $j$, then apply rule 1.

Vectors are compared componentwise: $V \le W$ if $V[j] \le W[j]$ for all $j$, and $V < W$ if $V \le W$ and $V \ne W$.
:::

The meaning of the entries is the key to everything. For an event $e$, let its **causal past** be $\mathord{\downarrow} e = \set{x : x \to e \text{ or } x = e}$.

::: lemma Vector entries count the causal past {#lem-vector-entries}
For every event $e$ and process $p_j$, $V(e)[j]$ equals the number of events of $p_j$ in $\mathord{\downarrow} e$. Moreover, these events are the first $V(e)[j]$ events of $p_j$.
:::

::: proof
First, the events of $p_j$ in $\mathord{\downarrow} e$ form a prefix of $p_j$'s sequence of events: if $x$ is an event of $p_j$ in $\mathord{\downarrow} e$ and $x'$ precedes $x$ on $p_j$, then $x' \to x$, so $x' \in \mathord{\downarrow} e$. So it is enough to show that $V(e)[j]$ is the length of this prefix, i.e. the position (counting from $1$) of the last event of $p_j$ in $\mathord{\downarrow} e$, or $0$ if there is none.

We use induction over the events in the order in which they occur. Let $e$ be the $k$-th event of $p_i$, and let $e^-$ be the previous event of $p_i$ (if any).

*If $e$ is not a receive*, then $\mathord{\downarrow} e = \mathord{\downarrow} e^- \cup \set{e}$, since the only generating edge into $e$ is from $e^-$. The algorithm sets $V(e) = V(e^-)$ except $V(e)[i] = V(e^-)[i] + 1 = (k - 1) + 1 = k$, using the induction hypothesis for $e^-$ (whose own position is $k - 1$; if $e$ is the first event, all entries were $0$). For $j \ne i$ the prefix of $p_j$ in $\mathord{\downarrow} e$ is that in $\mathord{\downarrow} e^-$, matching $V(e^-)[j]$; for $j = i$ the last event of $p_i$ in $\mathord{\downarrow} e$ is $e$ itself, at position $k$.

*If $e$ receives a message sent at event $s$*, then $\mathord{\downarrow} e = \mathord{\downarrow} e^- \cup \mathord{\downarrow} s \cup \set{e}$. For each $j \ne i$, the events of $p_j$ in this union form the longer of the two prefixes, of length $\max(V(e^-)[j], V(s)[j])$ by the induction hypothesis for $e^-$ and $s$ (both occurred before $e$), which is what the algorithm computes. For $j = i$: no event of $p_i$ after $e^-$ can be in $\mathord{\downarrow} s$, because $s$ occurred before $e$ and such an event would be $e$ or later; so the prefix of $p_i$ in the union has length $k$ (including $e$), and the algorithm gives $\max(k - 1, V(s)[i]) + 1 = k$, since $V(s)[i] \le k - 1$.
:::

::: theorem Vector clocks characterise happened-before {#thm-vector}
For all events $a$ and $b$: $a \to b$ if and only if $V(a) < V(b)$. Consequently $a \parallel b$ if and only if $V(a)$ and $V(b)$ are incomparable.
:::

::: proof
*If $a \to b$ then $V(a) < V(b)$.* By transitivity, $\mathord{\downarrow} a \subseteq \mathord{\downarrow} b$, so for each $j$ the events of $p_j$ in $\mathord{\downarrow} a$ are among those in $\mathord{\downarrow} b$, and by [[#lem-vector-entries]] $V(a) \le V(b)$. Let $p_j$ be the process of $b$. Then $b \in \mathord{\downarrow} b$; but $b \notin \mathord{\downarrow} a$, because $b \to a$ together with $a \to b$ would give $a \to a$, and $b = a$ would give $a \to a$ too, both contradicting irreflexivity. The events of $p_j$ in $\mathord{\downarrow} a$ form a prefix not containing $b$, so they all precede $b$, and $V(a)[j] < (\text{position of } b) \le V(b)[j]$. So $V(a) \ne V(b)$ and $V(a) < V(b)$.

*If $V(a) < V(b)$ then $a \to b$.* Let $a$ be the $k$-th event of process $p_i$. By the lemma, $V(a)[i] = k$, because $a$ itself is the last event of $p_i$ in $\mathord{\downarrow} a$. Since $V(b)[i] \ge V(a)[i] = k$, the lemma says that $\mathord{\downarrow} b$ contains the first $k$ events of $p_i$, among them $a$. So $a \to b$ or $a = b$; and $a = b$ is impossible since $V(a) \ne V(b)$.

*Concurrency.* Distinct events never have equal vectors: if $V(a) = V(b)$ with $a$ the $k$-th event of $p_i$, then $V(b)[i] = k$, so by the lemma $a \in \mathord{\downarrow} b$, hence $a \to b$, and the first part gives $V(a) < V(b)$, a contradiction. So for distinct $a, b$, "neither $a \to b$ nor $b \to a$" is equivalent to "neither $V(a) < V(b)$ nor $V(b) < V(a)$", which, since the vectors differ, means they are incomparable.
:::

The proof also yields a cheaper test: if $a$ is an event of $p_i$, then $a \to b$ if and only if $V(a)[i] \le V(b)[i]$ and $a \neq b$. One component suffices once you know where $a$ happened.

::: example Vector timestamps {#ex-vectors}
Compute the vector timestamps of the events of [[#ex-execution]] and use them to decide $f$ versus $c$ and $f$ versus $h$.
::: solution
$P_1$: $a = (1,0,0)$, $b = (2,0,0)$. $P_2$: $d = \max((0,0,0), (2,0,0))$ then tick: $(2,1,0)$; $e = (2,2,0)$; $f = (2,3,0)$. $P_3$: $g = (0,0,1)$; $h = \max((0,0,1),(2,2,0))$ then tick: $(2,2,2)$; $i = (2,2,3)$. Back on $P_1$: $c = \max((2,0,0),(2,2,3))$ then tick: $(3,2,3)$.

$f = (2,3,0)$ and $c = (3,2,3)$: $f$ is larger in the second component, $c$ in the first and third — incomparable, so $f \parallel c$, although the Lamport timestamps were $5 < 7$. $f = (2,3,0)$ and $h = (2,2,2)$: incomparable, $f \parallel h$. By contrast $e = (2,2,0) < c = (3,2,3)$, so $e \to c$ (via $m_2$ and $m_3$). The single-component test agrees: $e$ is on $P_2$, $V(e)[2] = 2 \le V(c)[2] = 2$.
:::
:::

We can test [[#thm-vector]] and the clock condition on random executions, comparing the timestamps with the transitive closure of the happened-before edges:

```python
import random
from itertools import product

def run(n, steps, seed):
    """Random execution of n processes; returns events as (pid, lamport, vector) and the send->receive pairs."""
    rng = random.Random(seed)
    L, V = [0] * n, [[0] * n for _ in range(n)]
    events, msgs, in_flight = [], [], []
    for _ in range(steps):
        p = rng.randrange(n)
        L[p] += 1; V[p][p] += 1                       # every event ticks the local clock
        if in_flight and rng.random() < 0.8:          # receive a random message addressed to p
            mine = [m for m in in_flight if m[1] == p]
            if mine:
                src_event, _, lt, vt = m = rng.choice(mine)
                in_flight.remove(m)
                L[p] = max(L[p], lt + 1)
                V[p] = [max(a, b) for a, b in zip(V[p], vt)]
                msgs.append((src_event, len(events)))
        events.append((p, L[p], tuple(V[p])))
        if rng.random() < 0.4:                        # this event also sends a message
            in_flight.append((len(events) - 1, rng.randrange(n), L[p], tuple(V[p])))
    return events, msgs
```

The function `happened_before` (not shown; it adds process-order and message edges and takes the transitive closure in Floyd–Warshall style, as in [[algorithms/shortest-paths]]) gives the true relation, and the check compares:

```console
$ python3 vc.py
events: 60  messages: 19
vector clocks characterise ->: True
Lamport clock condition holds: True
concurrent pairs: 791  of which Lamport orders: 727
```

Of the $791$ concurrent pairs, Lamport timestamps assign different values to $727$, making them *look* ordered; vector clocks identify every one as concurrent. (In the code, the receive tick is folded into the `max` as $\max(L_p + 1, t + 1)$, which equals $\max(L_p, t) + 1$.)

Vector clocks cost $n$ integers per message and per stored timestamp, and Bernadette Charron-Bost proved in 1991 that no characterisation of happened-before by vectors of fewer than $n$ real numbers is possible in general. In practice, replicated stores use **version vectors**, with one entry per *replica* rather than per client, attached to each stored value, and prune entries of replicas that have left; Amazon's Dynamo is the classic example ([[distributed-systems/distributed-storage]]).

## Consistent snapshots

Some questions are about the *global* state of a system: is the computation deadlocked? Has it terminated? How much money is in the bank? Where should we restart after a failure? With no global clock we cannot ask every process to record its state "at noon". Chandy and Lamport's insight was that we do not need a simultaneous state, only one that *could* have occurred.

::: definition Cut and consistent cut {#def-cut}
A **cut** $C$ of an execution is a set of events containing, for each process, a prefix of its events (the events "before the cut line"). A cut is **consistent** if, whenever it contains the receipt of a message, it also contains the sending of that message. The **global state** of a cut consists of each process's state after its last event in the cut, and, for each channel, the messages sent within the cut but not received within it.
:::

::: proposition Consistent cuts are causally closed {#prop-cut-closed}
A cut $C$ is consistent if and only if for every $e \in C$ and every event $e'$ with $e' \to e$, $e' \in C$.
:::

::: proof
*If.* A receive event $b \in C$ has its send event $a \to b$, so $a \in C$.
*Only if.* Suppose $C$ is consistent and $e \in C$, $e' \to e$. Take a chain $e' = x_0, x_1, \dots, x_k = e$ in which each step is a process-order step or a message. We show by induction from $x_k$ backwards that every $x_i \in C$. If $x_{i+1} \in C$ and $x_i$ precedes it on the same process, $x_i \in C$ because $C$ contains a prefix of each process. If $x_i$ is the send of a message received at $x_{i+1} \in C$, $x_i \in C$ by consistency.
:::

So an inconsistent cut is one that records an effect without its cause — a message received but never sent — which is exactly the impossible history of this chapter's opening. A consistent cut's global state is one the system could have passed through: if we run the events of $C$ in any linearisation of $\to$, they form a valid prefix of an execution.

::: algorithm Chandy–Lamport snapshot {#alg-chandy-lamport}
Assume FIFO, reliable channels and a strongly connected network. Any process may initiate.
1. **Initiator**: record its own state; then send a special **marker** message on every outgoing channel, before any other message; start recording every incoming channel.
2. **Upon receiving a marker on channel $c$**:
   - if the process has not yet recorded its state: record its state; record the state of $c$ as empty; send a marker on every outgoing channel before any other message; start recording every other incoming channel;
   - otherwise: stop recording $c$; the state of $c$ is the sequence of messages received on $c$ since recording started.
3. A process has finished when it has received a marker on every incoming channel. The snapshot is the set of recorded process states and channel states.
:::

::: theorem The Chandy–Lamport snapshot is consistent {#thm-chandy-lamport}
Let $C$ be the set of events of each process that occur before it records its state. Then $C$ is a consistent cut, and the recorded state of each channel is exactly the set of messages sent before the sender's cut and received after the receiver's cut — the channel state of [[#def-cut]].
:::

::: proof
*Termination.* The initiator sends markers on all outgoing channels; every process that receives a marker records its state and sends markers on all its outgoing channels. Since the network is strongly connected and channels are reliable, every process receives a marker, records its state, and eventually receives a marker on each incoming channel.

*Consistency.* Suppose a message $m$ is sent from $p$ to $q$ on channel $c$ and its receipt is in $C$, i.e. $q$ receives $m$ before recording its state. Suppose, for a contradiction, that the send of $m$ is not in $C$: $p$ had already recorded its state when it sent $m$. Then $p$ had sent a marker on $c$ *before* $m$ (it sends markers on all outgoing channels immediately on recording). By FIFO, $q$ receives the marker before $m$, and receiving a marker makes $q$ record its state if it has not already — so $q$ recorded its state before receiving $m$, contradicting the assumption that the receipt of $m$ is in $C$.

*Channel states.* $q$ records the messages arriving on $c$ between recording its own state and receiving the marker on $c$ (or none, if the marker on $c$ is what made it record). By FIFO, the messages on $c$ arriving before the marker are exactly those $p$ sent before its marker, that is, before $p$ recorded its state — sends in $C$. Those arriving after $q$ recorded its state are receipts not in $C$. So $q$ records exactly the messages sent inside the cut and received outside it.
:::

::: example A bank snapshot {#ex-bank-snapshot}
Two branches $P$ (balance $£100$) and $Q$ (balance $£50$) transfer money to each other. Trace the algorithm when $P$ initiates after sending $£10$ to $Q$, while $Q$ sends $£20$ to $P$ concurrently, and check that the snapshot conserves money.
::: solution
1. $P$ sends $£10$ to $Q$; $P = 90$.
2. $P$ initiates: records $P = 90$, sends a marker to $Q$, starts recording channel $Q \to P$.
3. $Q$ sends $£20$ to $P$; $Q = 30$.
4. $Q$ receives the $£10$ (it was ahead of the marker on the FIFO channel $P \to Q$); $Q = 40$.
5. $Q$ receives the marker: records $Q = 40$, channel $P \to Q$ empty, sends a marker to $P$.
6. $P$ receives the $£20$, sent before $Q$'s marker; $P = 110$. $P$ is recording $Q \to P$, so it notes $£20$.
7. $P$ receives $Q$'s marker: channel $Q \to P$ is recorded as $\set{£20}$.

Snapshot: $P = 90$, $Q = 40$, $P \to Q$ empty, $Q \to P$ holds $£20$. Total $90 + 40 + 20 = 150$, as it must be. At no real moment were the balances $90$ and $40$ with $£20$ in flight *and* the $£10$ already received — in real time, the $£20$ was sent before the $£10$ arrived — but this state is consistent: it could have occurred in another execution with the same causal order. Without the channel states, the snapshot would have shown $£130$ and lost money; without FIFO, the $£10$ could have overtaken the marker and been counted twice or not at all (Exercise 9).
:::
:::

A snapshot is a good basis for detecting **stable properties** — properties that, once true, stay true, such as "the computation has terminated", "these processes are deadlocked" or "this object is garbage". Chandy and Lamport proved that the recorded state is reachable from the state at the start of the snapshot and can reach the state at its end, so if a stable property holds in the snapshot it holds when the snapshot finishes. The same algorithm, applied to dataflow graphs, is how stream processors such as Apache Flink take consistent checkpoints ([[distributed-systems/data-processing]]).

## Physical time returns: hybrid clocks and TrueTime

Logical clocks capture causality but lose real time: a Lamport timestamp says nothing about when an event happened, and causality through channels the system cannot see — a user who reads a confirmation on one website and then acts on another — is invisible to them. Two modern designs combine the two kinds of time.

**Hybrid logical clocks** (Kulkarni, Demirbas and colleagues, 2014) keep, at each process, a timestamp that is the maximum of the physical clock and the largest timestamp seen, with a small logical counter to break ties. They satisfy the clock condition of [[#thm-clock-condition]] and stay within the clock-synchronisation error of physical time, so they can be used both for causal ordering and for queries "as of" a wall-clock time.

**TrueTime**, described in Corbett and colleagues' 2012 paper on Google's Spanner database, makes clock uncertainty explicit. `TT.now()` returns an interval $[\mathit{earliest}, \mathit{latest}]$ that is guaranteed (by GPS receivers and atomic clocks in every data centre, and by conservative assumptions about drift) to contain the true time. The paper reports a half-width $\varepsilon$ that varies in a sawtooth between about $1$ and $7$ ms, the shape of [[#prop-resync]]. If transaction $T_1$ is assigned the timestamp $s_1 = \mathit{latest}$ and waits until `TT.now().earliest` $> s_1$ before making its effects visible — the **commit wait**, about $2\varepsilon$ — then any transaction $T_2$ that starts after $T_1$ is visible gets a larger timestamp. Real-time order and timestamp order then agree, a property called **external consistency**, proved in [[distributed-systems/distributed-transactions]]. Uncertainty is not eliminated; it is bounded and then waited out.

::: history
Leslie Lamport's "Time, clocks, and the ordering of events in a distributed system" (*Communications of the ACM*, 1978) defined happened-before, logical clocks, the total order and the mutual-exclusion algorithm, and noted the connection with special relativity, where the causal future of an event is its light cone. David Mills's Network Time Protocol was first specified in RFC 958 (1985); NTPv4 is RFC 5905 (2010). Flaviu Cristian published probabilistic clock synchronisation in 1989, and Riccardo Gusella and Stefano Zatti the Berkeley TEMPO algorithm the same year. Vector clocks were introduced independently by Colin Fidge (1988) and Friedemann Mattern (1989); version vectors for replicated files had appeared earlier, in D. Stott Parker and colleagues' 1983 paper on detecting mutual inconsistency. K. Mani Chandy and Lamport's "Distributed snapshots: determining global states of distributed systems" appeared in *ACM Transactions on Computer Systems* in 1985. The IEEE 1588 Precision Time Protocol was first standardised in 2002, Spanner's TrueTime was published by James Corbett and colleagues at OSDI 2012, and Sandeep Kulkarni and colleagues proposed hybrid logical clocks in 2014.
:::

## Where this leads

Happened-before is the yardstick for consistency models: **causal consistency** in [[distributed-systems/replication-consistency]] requires that every process sees causally related writes in causal order, and version vectors detect conflicting concurrent writes in Dynamo-style stores ([[distributed-systems/distributed-storage]]). The total order of Lamport timestamps is the first step towards replicated state machines, which need *fault-tolerant* agreement on the order — consensus ([[distributed-systems/consensus]]). Consistent snapshots underlie checkpointing in stream processors ([[distributed-systems/data-processing]]), and TrueTime's commit wait gives Spanner its globally consistent transactions ([[distributed-systems/distributed-transactions]]). Memory consistency in multiprocessors, the same questions inside one machine, is in [[parallel-computing/memory-consistency]].

::: summary
- Physical clocks **drift** (ppm) and must be resynchronised; skew stays below $\varepsilon + 2\rho R$ ([[#prop-resync]]).
- Cristian's method and **NTP** estimate offset from round trips; NTP's error is at most half the round-trip delay ([[#thm-ntp]]). Use **monotonic** clocks for durations.
- **Happened-before** ($\to$) is potential causality: process order plus messages, closed under transitivity; events not related are **concurrent**.
- **Lamport clocks** satisfy $a \to b \Rightarrow L(a) < L(b)$ ([[#thm-clock-condition]]) and give a total order extending $\to$, but cannot detect concurrency.
- **Vector clocks** characterise causality exactly: $a \to b \iff V(a) < V(b)$ ([[#thm-vector]]), at a cost of $n$ entries.
- A **consistent cut** is closed under $\to$; the **Chandy–Lamport** algorithm records one, with channel states, using markers over FIFO channels ([[#thm-chandy-lamport]]).
- **TrueTime** exposes clock uncertainty as an interval and waits it out; hybrid logical clocks combine physical and logical time.
:::

## Exercises

::: exercise Drift per day {level=1 check="4.32"}
A clock has a drift rate of $50$ ppm. How many seconds can it gain or lose in one day? (Enter the number of seconds.)
::: solution
$50 \times 10^{-6} \times 86{,}400 = 4.32$ s.
:::
:::

::: exercise Lamport timestamps {level=1 check="6"}
Process $P$ performs: send $m$ to $Q$, internal event, receive $n$ from $Q$. Process $Q$ performs: internal event, internal event, internal event, receive $m$, send $n$ to $P$. All clocks start at $0$. What is the Lamport timestamp of $P$'s receive of $n$? (Enter the timestamp.)
::: solution
$P$: send $m$ has $L = 1$; internal $L = 2$. $Q$: three internal events $1, 2, 3$; receive $m$: $\max(3, 1) + 1 = 4$; send $n$: $5$. $P$ receives $n$ with timestamp $5$: $\max(2, 5) + 1 = 6$.
:::
:::

::: exercise Comparing vectors {level=1}
Classify each pair as $a \to b$, $b \to a$ or concurrent: (a) $V(a) = (2,1,0)$, $V(b) = (3,1,2)$; (b) $V(a) = (1,4,0)$, $V(b) = (2,3,1)$; (c) $V(a) = (0,2,5)$, $V(b) = (0,1,5)$.
::: solution
By [[#thm-vector]]: (a) $(2,1,0) < (3,1,2)$, so $a \to b$. (b) incomparable ($4 > 3$ but $1 < 2$): concurrent. (c) $(0,1,5) < (0,2,5)$, so $b \to a$.
:::
:::

::: exercise An NTP calculation {level=2 check="50"}
With $t_1 = 100$, $t_2 = 160$, $t_3 = 161$ and $t_4 = 121$ (milliseconds, $t_1, t_4$ on the client's clock and $t_2, t_3$ on the server's), compute the NTP offset estimate $\theta$ and delay $\delta$, and the interval that must contain the true offset. (Enter $\theta$ in milliseconds.)
::: solution
$\theta = ((160 - 100) + (161 - 121))/2 = (60 + 40)/2 = 50$ ms. $\delta = (121 - 100) - (161 - 160) = 21 - 1 = 20$ ms. By [[#thm-ntp]] the true offset lies in $[40, 60]$ ms.
:::
:::

::: exercise Resynchronisation interval {level=2 check="75"}
Clocks with drift bound $10$ ppm can be synchronised to within $0.5$ ms of each other. How often, in seconds, must they be resynchronised to keep their skew below $2$ ms? (Enter the largest interval $R$ in seconds.)
::: solution
By [[#prop-resync]] we need $0.5 + 2 \times 10 \times 10^{-6} \times R \times 1000 \le 2$ ms, i.e. $0.02 R \le 1.5$, so $R \le 75$ s.
:::
:::

::: exercise Which cuts are consistent? {level=2}
In [[#ex-execution]], which of these cuts are consistent? (a) $\set{a, b, d, g}$; (b) $\set{a, d, e, g}$; (c) $\set{a, b, c, d, e, g, h}$; (d) $\set{a, b, d, e, g, h, i}$.
::: solution
Check every receive in the cut. (a) $d$ receives $m_1$, sent at $b \in$ cut: consistent. (b) $d$ is in the cut but $b$ is not: inconsistent — each process contributes a prefix ($P_1$ contributes $\set{a}$), but the receipt of $m_1$ is recorded without its sending. (c) $c$ receives $m_3$, sent at $i$, which is not in the cut: inconsistent. (d) $d$ (sent at $b$ ✓) and $h$ (sent at $e$ ✓) are the receives: consistent; $m_3$ is in transit, so the channel $P_3 \to P_1$ holds $m_3$ in this global state.
:::
:::

::: exercise Mutual exclusion messages {level=2 check="12"}
How many messages does one entry to the critical section cost in Lamport's mutual-exclusion algorithm with $5$ processes? (Enter the number.)
::: solution
A request to the other $n - 1$ processes, $n - 1$ acknowledgements and $n - 1$ releases: $3(n-1) = 12$ for $n = 5$.
:::
:::

::: exercise No scalar clock characterises causality {level=3}
Prove that there is no function $L$ from events to a totally ordered set such that, for every execution of two processes, $a \to b \iff L(a) < L(b)$. (This is why vectors are needed.)
::: solution
Consider the execution in which $P_1$ performs one internal event $a$, and $P_2$ performs two internal events $b$ then $c$, with no messages. Then $b \to c$, $a \parallel b$ and $a \parallel c$. Suppose $L$ characterised $\to$. From $a \parallel b$: neither $L(a) < L(b)$ nor $L(b) < L(a)$; in a total order this forces $L(a) = L(b)$. Similarly $a \parallel c$ forces $L(a) = L(c)$. So $L(b) = L(c)$, but $b \to c$ requires $L(b) < L(c)$ — a contradiction. The same argument shows that concurrency is not transitive ($b \parallel a \parallel c$ but $b \to c$), while equality in any total order is: no total order can encode a relation whose "incomparable" part is not an equivalence.
:::
:::

::: exercise Snapshots need FIFO {level=3}
Give an execution with non-FIFO channels in which the Chandy–Lamport algorithm records an inconsistent cut. Then explain how the algorithm could be adapted when channels are not FIFO.
::: solution
Take two processes $P$ and $Q$ and the bank of [[#ex-bank-snapshot]]. $P$ records its state ($£100$), sends a marker to $Q$, then sends $£10$ to $Q$ (so $P$'s send is *after* its cut). On a non-FIFO channel, the $£10$ overtakes the marker: $Q$ receives $£10$ (balance $60$), then the marker, and records $£60$. The cut contains $Q$'s receipt but not $P$'s send — inconsistent — and the snapshot shows $£100 + £60 = £160$: money has been created.

Adaptation (Lai and Yang, 1987): instead of markers *ordering* the channel, piggyback on every message a flag saying whether the sender has already recorded its state (a "colour": white before, red after). A process must record its state *before* processing the first red message it receives, so no post-cut send can be received inside the cut. Channel states are computed from the white messages received after recording, which requires each process to know how many white messages were sent to it on each channel (for example by having senders report their counts) in order to know when the channel state is complete.
:::
:::
