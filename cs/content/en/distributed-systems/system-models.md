An online shop keeps its shopping carts on three servers so that a customer's cart survives the loss of any one machine. One evening a front-end server sends "add item 42 to cart 7" to server B and hears nothing back. What should it do? Perhaps B has crashed, and the front end should send the request to C instead. Perhaps B is alive but paused for a few seconds while its garbage collector runs, and the item will be added after all — so sending to C as well may add it twice. Perhaps B received the request, added the item and replied, and it is the reply that was lost. Perhaps the network between the front end and B is broken while B still talks happily to C. From where the front end sits, *all these situations look exactly the same*: silence.

This is the essence of a **distributed system**: a collection of computers that cooperate by exchanging messages over a network, and that fail independently. Leslie Lamport put it memorably in a 1987 email: "A distributed system is one in which the failure of a computer you didn't even know existed can render your own computer unusable." Everything that makes the subject hard — and interesting — comes from two facts: there is **no shared memory** and **no global clock**, so each machine knows only what messages have told it; and failures are **partial**, so some parts of the system keep running while others have stopped, and no part can be sure which.

Before we can design algorithms for such systems, or prove that some problems cannot be solved, we have to say precisely what we assume. This chapter builds the standard **system models**: processes and their failures, links and their failures, and assumptions about timing. We prove two basic facts that shape the rest of the course — in an asynchronous system a crashed process cannot be told apart from a slow one, and two parties cannot agree on anything over a link that may lose every message (the **two generals** problem) — and we end with the fallacies that engineers fall into when they forget these models.

## Why systems are distributed

Nobody distributes a computation for fun: one machine is much easier to program. There are four reasons to accept the difficulty.

- **Scale.** The data or the load is too large for one machine. A search index of the web, or a social network's message store, does not fit on one disk, and millions of requests per second do not fit on one processor.
- **Fault tolerance and availability.** Every machine eventually fails. If a service must keep running when a disk dies, a power supply burns out or a data centre loses power, it must keep its state on several machines in several places — this is **replication**, the subject of [[distributed-systems/replication-consistency]].
- **Latency.** Light in optical fibre travels about $200{,}000$ km/s, two thirds of its speed in vacuum, so a round trip from Europe to Australia takes well over $100$ ms however fast the computers are. Serving users from a nearby copy is the only way to be fast everywhere.
- **Inherent distribution.** Some systems are distributed by nature: a bank's branches, the sensors of a factory, the participants in a payment, two companies' systems that must agree on an order.

The price is the loss of two things a single computer gives us for free: a consistent view of the whole state (one memory, read by one processor) and the assumption that the computer either works or does not. A distributed system can be *partly* working, which is both its strength (the rest carries on) and its main difficulty (the rest must work out what happened).

### Independent failures, quantified

Suppose each machine is up a fraction $a$ of the time, independently of the others. If a service needs *all* of $n$ machines — say a request touches $n$ servers in turn — it is up with probability $a^n$; if it needs *any one* of them, it is up with probability $1 - (1 - a)^n$. The two expressions pull in opposite directions as $n$ grows.

::: example Series and parallel availability {#ex-availability}
Each server is available $99\%$ of the time, independently. Compare a service that needs all three of three servers with one that needs any one of three, and with one that needs any $3$ of $5$ (a majority, as the consensus protocols of [[distributed-systems/consensus]] do).
::: solution
All three: $0.99^3 = 0.970299$, about $97\%$ — the service is down about $11$ days a year, three times as often as one server. Any one of three: $1 - 0.01^3 = 0.999999$, down about $32$ seconds a year. A majority of five: the service is up when at least $3$ servers are up,

$$
\sum_{k=3}^{5} \binom{5}{k} 0.99^k\, 0.01^{5-k} = 0.99^5 + 5 \cdot 0.99^4 \cdot 0.01 + 10 \cdot 0.99^3 \cdot 0.01^2 \approx 0.99999015,
$$

so it is down about $5$ minutes a year. Distribution can multiply failures (the first design) or mask them (the other two); which one you get depends entirely on whether the design needs every part or only some. The independence assumption is optimistic: machines in the same rack share a switch and a power supply, and software bugs strike all replicas at once.
:::
:::

::: widget plot
f: a^x; 1 - (1 - a)^x
x: 1, 10
y: 0, 1
sliders: a=0.9:0.5:0.999:0.001
labels: \text{needs all } n;\ \text{needs any one of } n
points: 3,0.729; 3,0.999
caption: Availability of a service built from $n$ machines, each up a fraction $a$ of the time independently. The falling curve is a design that needs every machine (a chain of services, or data split with no copies); the rising curve is one that needs any single machine (full replication). The dots are $n = 3$ with $a = 0.9$. Move $a$ towards $0.999$ and notice that the "needs all" curve still falls: at $n = 100$ even $99.9\%$ machines give only about $90\%$ availability. Big systems built from many parts *must* be designed to tolerate failures, because some part is almost always broken.
:::

## Processes, messages and executions

We model a distributed system as a fixed set of **processes** $\Pi = \set{p_1, \dots, p_n}$, each a deterministic state machine, connected by **links** (channels) over which they send messages. A process cannot read another's state; it learns about the rest of the system only from the messages it receives. Algorithms are written as **event handlers**: "upon receiving message $m$ from $q$, do …", "upon a timer expiring, do …".

::: definition Events, executions and local views {#def-execution}
A process takes **steps**. In one step it receives at most one message (or none), performs local computation, changes its state and sends zero or more messages. The **events** of a process are its steps: **send**, **receive** and **internal** events. An **execution** (or **run**) is a sequence of steps of all the processes, together with the messages sent and delivered, such that every delivered message was sent earlier. The **local view** of process $p$ in an execution is the sequence of its own steps: its initial state, the messages it received, in order, and its outputs.
:::

The local view is the crucial notion. Because a process is deterministic, its behaviour up to any point depends *only* on its initial state and the sequence of messages it has received so far. Two executions in which $p$ has the same local view up to some step are **indistinguishable to $p$**: $p$ must behave identically in both. Almost every impossibility proof in distributed computing — the ones in this chapter, the FLP theorem of [[distributed-systems/consensus]] and the $3f+1$ bound of [[distributed-systems/fault-tolerance]] — works by constructing two executions that some process cannot tell apart, and arguing that it must therefore make the same decision in both, although the decision is right in only one of them.

A model is the set of executions we consider possible. It has three parts: what can go wrong with **links**, what can go wrong with **processes**, and what we may assume about **timing**.

## Links

Real networks lose, duplicate, delay and reorder packets ([[networks/network-principles]]). The weakest useful model of a link captures this but forbids the network from making up messages or losing them *systematically*.

::: definition Fair-loss, stubborn and perfect links {#def-links}
Let $p$ and $q$ be processes that do not crash. A **fair-loss link** from $p$ to $q$ satisfies
- **fair loss**: if $p$ sends a message $m$ to $q$ infinitely often, then $q$ delivers $m$ infinitely often;
- **finite duplication**: if $p$ sends $m$ a finite number of times, then $q$ delivers $m$ a finite number of times;
- **no creation**: if $q$ delivers $m$ from $p$, then $p$ sent $m$ earlier.

A **perfect link** (reliable link) satisfies
- **reliable delivery**: if $p$ sends $m$ to $q$, then $q$ eventually delivers $m$;
- **no duplication**: no message is delivered more than once;
- **no creation**, as above.

A perfect link does **not** promise to deliver messages in the order they were sent; a **FIFO perfect link** adds that promise.
:::

These are the abstractions of Cachin, Guerraoui and Rodrigues's textbook. "Deliver" means "hand to the algorithm above", which is different from a packet merely arriving: a duplicate packet arrives but is not delivered again. The definitions say nothing about *when* messages arrive — that is the timing model's business.

Fair-loss links are what a network gives us; perfect links are what we want to program against. The standard construction uses retransmission and duplicate suppression, the same ideas as the reliable transport protocols of [[networks/reliable-transport]].

::: algorithm Perfect link from a fair-loss link {#alg-perfect-link}
Sender $p$:
1. To send $m$: choose a fresh sequence number $s$, add $(s, m)$ to the set $U$ of unacknowledged messages, and send $\langle \text{DATA}, s, m \rangle$.
2. Every $T$ time units: for every $(s, m) \in U$, send $\langle \text{DATA}, s, m \rangle$ again.
3. Upon receiving $\langle \text{ACK}, s \rangle$: remove $(s, \cdot)$ from $U$.

Receiver $q$, keeping the set $D$ of sequence numbers already delivered:
1. Upon receiving $\langle \text{DATA}, s, m \rangle$ from $p$: send $\langle \text{ACK}, s \rangle$ to $p$; if $s \notin D$, add $s$ to $D$ and deliver $m$.
:::

::: theorem Correctness of the perfect-link construction {#thm-perfect-link}
If $p$ and $q$ do not crash and the links between them in both directions are fair-loss links, [[#alg-perfect-link]] implements a perfect link from $p$ to $q$.
:::

::: proof
*No creation.* $q$ delivers $m$ only on receiving $\langle \text{DATA}, s, m\rangle$, which by the no-creation property of the fair-loss link was sent by $p$, and $p$ sends such packets only for messages it was asked to send.

*No duplication.* Sequence numbers are fresh, so each message has its own $s$. $q$ delivers the message with number $s$ only if $s \notin D$, and adds $s$ to $D$ in the same step, so it delivers it at most once.

*Reliable delivery.* Suppose $p$ sends $m$ with number $s$. Suppose, for a contradiction, that $q$ never delivers $m$. Then $q$ never receives $\langle \text{DATA}, s, m\rangle$ (it would deliver $m$ on first receipt), so it never sends $\langle \text{ACK}, s \rangle$, so $p$ never removes $(s, m)$ from $U$, and so $p$ sends $\langle \text{DATA}, s, m\rangle$ infinitely often. By fair loss, $q$ receives it infinitely often — a contradiction. So $q$ delivers $m$.
:::

The proof shows what the acknowledgements are for: not for correctness of delivery, which retransmission alone guarantees, but to let the sender *stop* retransmitting. Without them, $p$ would resend every message forever — correct, but useless. Notice also two costs hidden in the construction. The receiver's set $D$ grows without bound; real protocols bound it by using FIFO sequence numbers and remembering only the highest number delivered in order, as TCP does. And the construction relies on $q$ *remembering* $D$: if $q$ can crash and restart with an empty memory, it will deliver duplicates (Exercise 8).

::: example How many transmissions? {#ex-transmissions}
Each packet, in either direction, is lost independently with probability $\ell$. On average, how many times does [[#alg-perfect-link]] send each data packet, counting retransmissions, if each retransmission round resends every unacknowledged message once?
::: solution
In each round, a given unacknowledged message is removed from $U$ only if its data packet arrives *and* the acknowledgement comes back, which happens with probability $(1 - \ell)^2$. The number of rounds until this happens is geometric with success probability $(1 - \ell)^2$, so its mean is $1/(1 - \ell)^2$. For $\ell = 0.1$ that is $1.235$ transmissions per message; for $\ell = 0.5$ it is $4$. A simulation with a fixed seed agrees:

```python
import random

def perfect_link(messages, loss, seed):
    """Retransmit-until-acknowledged over a link that drops each packet with probability `loss`."""
    rng = random.Random(seed)
    unacked = dict(enumerate(messages))      # sender: seq -> message not yet acknowledged
    delivered, seen = [], set()               # receiver: delivered messages, sequence numbers seen
    sends = rounds = 0
    while unacked:
        rounds += 1
        for seq, m in list(unacked.items()):  # every timeout, resend everything unacknowledged
            sends += 1
            if rng.random() < loss:           # data packet lost
                continue
            if seq not in seen:               # duplicate suppression
                seen.add(seq)
                delivered.append(m)
            if rng.random() >= loss:          # acknowledgement survives
                del unacked[seq]
    return delivered, sends, rounds

for loss in (0.0, 0.1, 0.3, 0.5):
    d, s, r = perfect_link([f"m{i}" for i in range(1000)], loss, seed=1)
    print(f"loss={loss:.1f}  delivered={len(d)}  in order={d == sorted(d, key=lambda x: int(x[1:]))}"
          f"  sends/message={s/1000:.3f}  predicted={1/(1-loss)**2:.3f}  rounds={r}")
```

```console
$ python3 plink.py
loss=0.0  delivered=1000  in order=True  sends/message=1.000  predicted=1.000  rounds=1
loss=0.1  delivered=1000  in order=False  sends/message=1.228  predicted=1.235  rounds=5
loss=0.3  delivered=1000  in order=False  sends/message=2.038  predicted=2.041  rounds=12
loss=0.5  delivered=1000  in order=False  sends/message=3.953  predicted=4.000  rounds=24
```

All $1000$ messages are delivered exactly once at every loss rate, as [[#thm-perfect-link]] promises. But with any loss at all they are *not* delivered in order: a message whose first copy was lost is delivered a round later than its successors. That is allowed by the definition of a perfect link, and it is a reminder that ordering is a separate guarantee that has to be paid for separately.
:::
:::

## Process failures

A process is **correct** in an execution if it follows its algorithm forever; otherwise it is **faulty**. The failure model says *how* a faulty process may deviate. We usually bound the number of faulty processes by a parameter $f$ and ask how large $n$ must be compared with $f$.

::: definition Failure models {#def-failures}
- **Crash-stop** (crash): a faulty process follows its algorithm correctly up to some step, and then takes no further steps. It never recovers.
- **Crash-recovery**: a process may crash and later restart, losing its volatile state but keeping whatever it wrote to **stable storage** (disk). A process is correct if it eventually stays up forever (or crashes only finitely often).
- **Omission**: a faulty process may, in addition, fail to send some messages it should send (**send omission**) or fail to receive messages sent to it (**receive omission**), while otherwise following its algorithm.
- **Byzantine** (arbitrary): a faulty process may behave in any way at all — send wrong or contradictory messages, pretend to have received messages it did not, or collude with other faulty processes. It cannot, however, forge messages on authenticated links: if $q$ receives $m$ on the link from $p$, then $p$ sent it. In the **authenticated Byzantine** model, processes also sign their messages, and a faulty process cannot forge a correct process's signature.
:::

The models are nested: a crash is a particular omission failure (omit everything after some point), and an omission is a particular Byzantine behaviour. So an algorithm that tolerates $f$ Byzantine processes also tolerates $f$ omission or crash failures, and an impossibility result for crashes holds for every weaker model. Each step down the list makes algorithms harder and more expensive: we will see that consensus needs $n \ge 2f + 1$ processes under crash failures with partial synchrony, but $n \ge 3f + 1$ under Byzantine failures ([[distributed-systems/fault-tolerance]]).

Real failures do not come labelled. A kernel panic or a power cut is a crash. A disk that silently drops writes, a full queue that discards incoming messages or a firewall rule that blocks one direction of traffic is an omission. A bit flip in memory that corrupts a reply, a software bug that makes one replica compute a different answer, or a compromised machine controlled by an attacker is Byzantine. In data centres the crash-recovery model is usually assumed, with checksums turning most corruption into detectable (and so crash-like) failures; Byzantine models are used where machines are run by mutually distrustful parties, as in blockchains, or where safety demands tolerating arbitrary hardware faults, as in aircraft control.

::: warning Crash-recovery is not crash-stop with restarts
It is tempting to treat a process that crashes and restarts as a new, correct process. It is not: it has **forgotten** what it said before the crash, and other processes may be relying on it. If a voter in an election votes for candidate A, crashes, restarts and then votes for B, it has voted twice, and two candidates may both believe they have a majority. Algorithms for the crash-recovery model must write to stable storage everything that other processes may rely on — Raft, for example, writes its current term and its vote to disk *before* replying to a vote request ([[distributed-systems/consensus]]). And writing to stable storage is slow (a disk flush costs from tens of microseconds to milliseconds), which is why these writes are carefully minimised.
:::

## Timing

The third part of a model concerns time: how long messages may take, how fast processes run relative to each other, and how well local clocks track real time.

::: definition Synchronous, asynchronous and partially synchronous systems {#def-timing}
- A system is **synchronous** if there are *known* bounds $\Delta$ on message delay (every message sent on a link between correct processes is delivered within $\Delta$) and $\Phi$ on relative process speed (no correct process takes more than $\Phi$ steps while another takes one), and every process has a local clock whose drift from real time is bounded by a known rate $\rho$.
- A system is **asynchronous** if there are no bounds at all: messages between correct processes are eventually delivered, and correct processes eventually take their next step, but either may take arbitrarily long. Processes have no clocks (or clocks that carry no guarantee).
- A system is **partially synchronous** (Dwork, Lynch and Stockmeyer, 1988) if bounds $\Delta$ and $\Phi$ exist but are *not known* to the processes, or, in the other common version, if the bounds are known but hold only after some unknown time called the **global stabilisation time** (GST); before GST the system behaves asynchronously.
:::

The synchronous model makes algorithms easy — a missing message is evidence of failure — but its assumptions are false on real networks, where a congested switch, a retransmission or a garbage-collection pause can stretch a delay far beyond its usual value. The asynchronous model makes no timing assumptions, so its algorithms are correct whatever the network does; but, as we shall prove, some very basic problems become impossible in it. Partial synchrony is the compromise on which most practical protocols rest: they are designed to be **safe** (never do anything wrong) at all times, even when the network is asynchronous, and **live** (eventually make progress) once it behaves synchronously for long enough.

### A crash looks like a delay

The first consequence of asynchrony is that silence is uninformative.

::: theorem A crashed process is indistinguishable from a slow one {#thm-indistinguishable}
In the asynchronous model with crash failures, let $p$ and $q$ be processes, and suppose that in some execution $E$, $q$ crashes at time $t$, after which $p$ at some time $T > t$ concludes (for example, outputs) "$q$ has crashed". Then there is an execution $E'$ in which $q$ is correct and $p$ also concludes "$q$ has crashed" at time $T$. Consequently, no algorithm in this model can detect crashes both **completely** (every crashed process is eventually suspected) and **accurately** (no correct process is ever suspected).
:::

::: proof
Construct $E'$ as follows. Up to time $t$, every process takes the same steps and every message is delivered at the same times as in $E$. After $t$, $q$, instead of crashing, continues to take steps, but every message it sends after $t$ is delayed until after time $T$, to whichever process it is addressed. Every other process behaves as in $E$ up to time $T$; after $T$ all messages are eventually delivered. The asynchronous model allows any finite delay, so this is a legal execution, and $q$ takes infinitely many steps and receives all its messages, so $q$ is correct in $E'$.

Up to time $T$, every message $p$ receives in $E'$ was also received by $p$, at the same time, in $E$: messages from processes other than $q$ are the same, messages $q$ sent before $t$ are the same, and none of $q$'s later messages arrives before $T$. The same holds for every other process $r \ne q$: up to $T$ it receives exactly what it received in $E$, so by induction on time all processes other than $q$ take the same steps and send the same messages before $T$ in both executions. So $p$ has the same local view up to $T$ in $E$ and $E'$, and being deterministic it takes the same steps, concluding "$q$ has crashed" at $T$ in $E'$, where $q$ is correct.

For the final claim: completeness forces $p$ to suspect $q$ at some finite time $T$ in $E$; the construction then gives a run with $q$ correct in which $p$ suspects $q$, violating accuracy.
:::

The proof is short, but the result is fundamental: failure detection in an asynchronous system is necessarily a matter of **suspicion**, and every timeout is a guess. [[distributed-systems/fault-tolerance]] turns this into the theory of **unreliable failure detectors**, which describes how good a guess an algorithm needs.

In a synchronous system, by contrast, a timeout is proof.

::: proposition Exact crash detection in synchronous systems {#prop-sync-detect}
In a synchronous system with message-delay bound $\Delta$, suppose each process answers a "ping" message immediately (within local processing time $\delta$). If $p$ sends a ping to $q$ and receives no answer within $2\Delta + \delta$, measured on its own clock and corrected for drift, then $q$ has crashed.
:::

::: proof
If $q$ were correct, the ping would reach it within $\Delta$, it would answer within a further $\delta$, and the answer would reach $p$ within a further $\Delta$, so $p$ would receive the answer within $2\Delta + \delta$ of real time. If $p$'s clock runs at a rate within $[1 - \rho, 1 + \rho]$ of real time, $p$ waits $(2\Delta + \delta)(1 + \rho)$ on its clock to be sure that at least $2\Delta + \delta$ of real time has passed. No answer by then means $q$ is not correct.
:::

The catch is that $\Delta$ must be a true bound, not a typical value. Network delays have a long tail: most messages arrive in a fraction of a millisecond within a data centre, but occasionally one takes hundreds of milliseconds, and a timeout short enough to detect crashes quickly will sometimes fire on a live process.

::: widget distribution
dist: lognormal
params: mu=0, sigma=0.5
a: 3
b: 10
caption: A model of round-trip time, log-normal with median $1$ (think of the unit as $10$ ms) and shape $\sigma = 0.5$. The shaded area beyond a timeout of $3$ units is the probability that a perfectly healthy server is suspected on any one request — here about $1.4\%$. Increase $\sigma$ (a burstier network) and watch the tail fatten: at $\sigma = 1$ the same timeout gives about $14\%$ false suspicions. No finite timeout makes the shaded area zero, which is [[#thm-indistinguishable]] in numbers.
:::

::: example Timeouts in a partially synchronous system {#ex-doubling}
A protocol does not know the delay bound $\Delta$. It starts with a timeout of $T_0 = 10$ ms and doubles the timeout whenever it suspects a process that later turns out to be alive. If the true (unknown) bound is $\Delta = 1$ s, how many false suspicions can occur before the timeout is large enough?
::: solution
After $k$ doublings the timeout is $10 \cdot 2^k$ ms, which is at least $1000$ ms once $2^k \ge 100$, that is $k \ge \log_2 100 \approx 6.64$, so after $k = 7$ doublings (timeout $1.28$ s). Each false suspicion causes at most one doubling, so at most $7$ false suspicions occur, after which (in the first version of partial synchrony, where the bound always holds) none ever occurs again. This is the standard trick that makes protocols live in partial synchrony: grow timeouts until they exceed the unknown bound. In the GST version of the model the same argument applies to suspicions after GST. In practice timeouts are also allowed to shrink again slowly, so that one bad episode does not make failure detection slow for ever.
:::
:::

::: quiz
A server's garbage collector occasionally pauses it for $5$ seconds, during which it neither sends nor processes messages. In which model is this behaviour a *failure*?
- [x] The synchronous model, with bounds smaller than $5$ s
- [ ] The asynchronous model
- [ ] The partially synchronous model (first version), whatever the bounds
- [ ] The crash-stop model, since the process stops
::: solution
In the synchronous model the process violates the known speed bound, which is a **timing (performance) failure**. In the asynchronous model any finite pause is allowed, so the process is simply slow and still correct. In partial synchrony with unknown bounds, the bound may be larger than $5$ s, so a pause of $5$ s is consistent with a correct process. And it is not a crash: the process resumes, possibly acting on stale information — a classic source of bugs, for instance a former leader that wakes up and keeps acting as leader. [[distributed-systems/fault-tolerance]] discusses the fencing tokens that defend against this.
:::
:::

## The two generals

How strong can agreement be over an unreliable link? The answer is a classic impossibility result, usually told as a story. Two generals, $A$ and $B$, camp on two hills on either side of a valley held by the enemy. Together they can win, but a lone attack is a disaster. They communicate only by messengers who cross the valley and may be captured. Can they agree to attack?

$A$ sends "attack at dawn". If the messenger is captured, $B$ never hears and does not attack, so $A$ must not attack unless it knows the message arrived. $B$ sends an acknowledgement; but now $B$ does not know whether the acknowledgement arrived, and $A$, if it did not, will not attack — so $B$ must not attack unless it knows. $A$ acknowledges the acknowledgement, and the argument repeats. Every message leaves its sender in doubt. The theorem makes this precise.

::: definition Coordinated attack {#def-coordinated-attack}
Two processes $A$ and $B$ each have an input in $\set{0, 1}$ (1 meaning "I want to attack") and each must output a decision in $\set{0,1}$. They communicate over a link in each direction that may lose any message. A protocol solves **coordinated attack** if, in every execution:
- **agreement**: $A$ and $B$ do not decide differently;
- **validity**: if both inputs are $0$, both decide $0$; if both inputs are $1$ and no message is lost, both decide $1$;
- **termination**: both processes decide, in a finite number of steps.
:::

Validity is deliberately weak: it only rules out the useless protocols "always decide $0$" (which fails when both want to attack and the network is perfect) and "always decide $1$" (which fails when neither wants to). Processes do not crash, and the protocol may be as clever as we like.

::: theorem Impossibility of coordinated attack (two generals) {#thm-two-generals}
No deterministic protocol solves coordinated attack over links that may lose messages.
:::

::: proof
Suppose a protocol solves it. Let $R$ be the execution in which both inputs are $1$ and no message is lost; by validity both decide $1$. By termination both decide after finitely many steps, so only finitely many messages, say $k$, are delivered in $R$ before the later of the two decisions. Number them $m_1, \dots, m_k$ in the order of delivery. For $j = k, k-1, \dots, 0$, let $R_j$ be the execution with both inputs $1$ in which $m_1, \dots, m_j$ are delivered as in $R$ and every later message is lost.

*Both decide $1$ in $R_k$.* Up to the moment both have decided in $R$, each process receives exactly the same messages in $R_k$ as in $R$, so both have the same views and decide $1$.

*If both decide $1$ in $R_j$ with $j \ge 1$, both decide $1$ in $R_{j-1}$.* $R_j$ and $R_{j-1}$ differ only in whether $m_j$ is delivered. Let $X$ be the process that sent $m_j$ and $Y$ its receiver. In both executions, $X$ receives exactly the messages among $m_1, \dots, m_{j-1}$ addressed to it and nothing else, because all later messages are lost in both. So $X$ has the same view in $R_j$ and $R_{j-1}$ and decides $1$ in both. By agreement, $Y$ decides $1$ in $R_{j-1}$.

By induction, both decide $1$ in $R_0$, where both inputs are $1$ and every message is lost. Now let $R_0'$ be the execution in which $A$'s input is $1$, $B$'s input is $0$, and every message is lost. $A$ receives nothing and has input $1$ in both $R_0$ and $R_0'$, so its view is the same and it decides $1$ in $R_0'$; by agreement $B$ decides $1$ in $R_0'$. Finally let $R_0''$ have both inputs $0$ and every message lost. $B$ has input $0$ and receives nothing in both $R_0'$ and $R_0''$, so it decides $1$ in $R_0''$ — contradicting validity, which demands $0$ when both inputs are $0$.
:::

The proof shows that no *finite* amount of acknowledging helps: each round of messages can be peeled off without the sender noticing. Its structure — a chain of executions, each indistinguishable from the next to some process — is the template for the FLP proof in [[distributed-systems/consensus]].

What do real systems do? They give up one of the requirements. TCP's connection teardown ([[networks/reliable-transport]]) gives up certainty: the side that sends the last acknowledgement waits a while (the TIME-WAIT state) and then assumes it arrived. Payment systems give up simultaneity: they settle for *eventual* agreement, retrying until both sides have recorded the outcome, which over a fair-loss link with live parties always succeeds eventually. And randomised protocols give up perfection: they make disagreement improbable rather than impossible.

::: example Making disagreement unlikely {#ex-messengers}
$A$ decides to attack and sends $k$ messengers, each captured independently with probability $p$. $B$ attacks if at least one arrives; $A$ attacks regardless. How likely is disagreement, and how many messengers make it less than one in a million when $p = 0.5$?
::: solution
The generals disagree only if every messenger is captured, with probability $p^k$. We need $0.5^k < 10^{-6}$, i.e. $k > 6 \log_2 10 \approx 19.93$, so $k = 20$ messengers give $2^{-20} \approx 9.5 \times 10^{-7}$. The protocol violates the theorem's requirements only with tiny probability — but it does violate them, for example when the valley is completely blocked (a network partition), where $p = 1$ and disagreement is certain. Probabilistic arguments are only as good as the independence assumption behind them.
:::
:::

## The fallacies of distributed computing

Engineers rarely state their system model explicitly, and the implicit model is usually the synchronous, failure-free one of a single computer. In 1994 Peter Deutsch, then at Sun Microsystems, listed seven false assumptions that programmers new to distributed systems make; James Gosling later added an eighth. They are known as the **fallacies of distributed computing**:

1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology does not change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous.

Each fallacy corresponds to a part of the models above or of the networking course. *Reliability*: links are fair-loss, not perfect, and a partition can separate a data centre from the rest of the world. *Latency*: messages take time, bounded below by physics, which caps how many sequential round trips a request can afford. *Security*: the network may carry an adversary, which is why links must be authenticated and encrypted ([[security/network-security]]). *Topology and administration*: machines are added, removed and moved by people who do not coordinate with you, so membership must be dynamic. *Homogeneity*: different machines run different versions of your software during every upgrade, so messages must be readable by both old and new code ([[distributed-systems/remote-communication]]).

::: example A lower bound on latency {#ex-light}
A request from London must be confirmed by servers in London, New York (about $5{,}570$ km away) and Frankfurt (about $640$ km away), one after the other, each confirmation needing a round trip from London. Bound the latency from below, using $200{,}000$ km/s for light in fibre.
::: solution
A round trip over distance $d$ takes at least $2d / (200{,}000\ \text{km/s})$: $55.7$ ms to New York and $6.4$ ms to Frankfurt; the London round trip is negligible. So the request takes at least $62$ ms, and real fibre routes are longer than great circles and add switching delays, so $70$–$80$ ms is more realistic for the New York round trip alone. A protocol needing $5$ sequential transatlantic round trips cannot respond in under $280$ ms, whatever the hardware. This is why geo-replicated systems try hard to commit in one wide-area round trip, and why the consistency models of [[distributed-systems/replication-consistency]] that avoid waiting for remote replicas are attractive.
:::
:::

::: history
The two generals problem first appeared in a 1975 paper on network protocols by E. A. Akkoyunlu, K. Ekanadham and R. V. Huber; Jim Gray told it as the generals' paradox in his 1978 notes on database operating systems, and it became the standard example of an impossibility result. The systematic study of models began in the late 1970s: Leslie Lamport's "Time, clocks, and the ordering of events in a distributed system" (1978) set out the message-passing model with no global clock, and Lamport, Robert Shostak and Marshall Pease's "The Byzantine generals problem" (1982) introduced arbitrary failures. Richard Schlichting and Fred Schneider defined fail-stop processors in 1983. Fischer, Lynch and Paterson's impossibility result (1985) showed what asynchrony costs, and Cynthia Dwork, Nancy Lynch and Larry Stockmeyer's "Consensus in the presence of partial synchrony" (1988) introduced the middle ground on which practical protocols stand. Flaviu Cristian's survey "Understanding fault-tolerant distributed systems" (1991) classified failures into crash, omission, timing and arbitrary. Nancy Lynch's *Distributed Algorithms* (1996) and Cachin, Guerraoui and Rodrigues's *Introduction to Reliable and Secure Distributed Programming* (2nd ed., 2011) give the models in full; the link abstractions of this chapter follow the latter.
:::

## Where this leads

Every later chapter works in one of these models. [[distributed-systems/remote-communication]] builds request–response communication on unreliable links and confronts the question of what a lost reply means. [[distributed-systems/time-clocks]] asks what can be known about the order of events without a global clock. [[distributed-systems/replication-consistency]] and [[distributed-systems/consensus]] keep copies of data consistent despite crashes and asynchrony — and prove that, in the purely asynchronous model, consensus is impossible. [[distributed-systems/fault-tolerance]] turns timeouts into failure detectors and deals with Byzantine processes.

::: summary
- A distributed system is a set of processes with **no shared memory and no global clock** that communicate by messages and **fail independently**; failures are partial.
- A **model** fixes link failures (fair-loss, perfect), process failures (crash-stop, crash-recovery, omission, Byzantine — each including the previous) and timing (synchronous, asynchronous, partially synchronous).
- **Retransmission plus duplicate suppression** turns fair-loss links into perfect links ([[#thm-perfect-link]]); ordering is a separate guarantee.
- Processes act only on their **local view**; indistinguishable executions force identical behaviour, the basis of impossibility proofs.
- In an asynchronous system a crashed process **cannot be distinguished** from a slow one ([[#thm-indistinguishable]]): timeouts are guesses. In a synchronous system they are proofs.
- **Coordinated attack** over lossy links is impossible ([[#thm-two-generals]]); practical systems settle for eventual or probable agreement.
- Designs that need *all* machines multiply failure probabilities; designs that need *some* mask failures.
- The **fallacies of distributed computing** are the synchronous, failure-free model assumed by accident.
:::

## Exercises

::: exercise Majority availability {level=1 check="1 - 0.95^3 - 3*0.95^2*0.05"}
Three servers are each up with probability $0.95$, independently. A service needs at least $2$ of them. What is the probability that it is *down*? (Enter the probability.)
::: solution
The service is up when $2$ or $3$ servers are up: $0.95^3 + 3 \cdot 0.95^2 \cdot 0.05 = 0.857375 + 0.135375 = 0.99275$. So it is down with probability $1 - 0.95^3 - 3 \cdot 0.95^2 \cdot 0.05 = 0.00725$, about $0.7\%$ — compared with $5\%$ for one server.
:::
:::

::: exercise Classifying failures {level=1}
Classify each as crash, omission, timing or Byzantine failure (in the synchronous model where timing matters): (a) a server loses power; (b) a router's queue overflows and it drops a reply; (c) a replica with a memory error returns a balance of $£1{,}000{,}000$ instead of $£100$; (d) a virtual machine is paused by its host for $2$ s; (e) an attacker who controls one replica sends different answers to different clients.
::: solution
(a) Crash. (b) Omission (a send omission of the link or a receive omission of the receiver; in the link model of [[#def-links]] it is a fair-loss link doing what it may). (c) Byzantine: a wrong value, not a missing one. (d) A timing (performance) failure in the synchronous model; in the asynchronous model just slowness. (e) Byzantine, and a malicious one — the hardest case, which is why Byzantine-tolerant protocols must cope with *equivocation*, saying different things to different processes.
:::
:::

::: exercise Retransmissions {level=1 check="1.5625"}
In [[#ex-transmissions]], what is the mean number of transmissions per message if each packet is lost with probability $0.2$? (Enter the number.)
::: solution
$1/(1 - 0.2)^2 = 1/0.64 = 1.5625$.
:::
:::

::: exercise Speed of light {level=2 check="170"}
Sydney and London are about $17{,}000$ km apart along the fibre route. What is the minimum round-trip time in milliseconds at $200{,}000$ km/s? (Enter the number of milliseconds.)
::: solution
$2 \times 17{,}000 / 200{,}000$ s $= 0.17$ s $= 170$ ms. A synchronous protocol that needs three such round trips cannot finish in under half a second.
:::
:::

::: exercise Timeout doubling {level=2 check="7"}
In [[#ex-doubling]], suppose the initial timeout is $50$ ms and the true delay bound is $5$ s. How many false suspicions can occur at most? (Enter the number.)
::: solution
We need $50 \cdot 2^k \ge 5000$, i.e. $2^k \ge 100$, so $k = 7$ ($50 \cdot 128 = 6400$ ms). At most $7$ false suspicions, each causing one doubling.
:::
:::

::: exercise Acknowledging the acknowledgement {level=2}
A student proposes this protocol for the two generals: $A$ sends "attack"; $B$ acknowledges; $A$ acknowledges the acknowledgement; and each general attacks once it has received one message from the other. Give an execution in which the generals disagree, and explain which step of the proof of [[#thm-two-generals]] it illustrates.
::: solution
Both inputs are $1$. $A$'s message reaches $B$; $B$ has received a message, so it will attack, and sends the acknowledgement; the acknowledgement is lost. $A$ has received nothing from $B$ and does not attack. The generals disagree. Whatever the rule for attacking, the last message delivered before a decision can be lost without its sender noticing, so the sender decides the same as before while the receiver's view changes: this is the induction step from $R_j$ to $R_{j-1}$. Changing the rule to "attack after two messages" only moves the problem to the next message.
:::
:::

::: exercise Byzantine tolerance implies crash tolerance {level=2}
Prove that if an algorithm solves a problem $P$ (a property of the outputs of correct processes) in a model with up to $f$ Byzantine processes, it solves $P$ with up to $f$ crash-stop processes in the same timing model.
::: solution
Let $E$ be an execution with crash failures of a set $F$, $\lvert F\rvert \le f$. A crashed process $p \in F$ behaves according to the algorithm up to its crash and then does nothing. "Follow the algorithm until step $s$, then stop" is one of the behaviours a Byzantine process may choose, since a Byzantine process may do anything at all. So $E$ is also an execution with up to $f$ Byzantine processes (the same set $F$), with exactly the same steps of correct processes. The algorithm solves $P$ in every such execution, so the outputs of the correct processes in $E$ satisfy $P$. The converse is false: crash-tolerant algorithms such as Raft are easily fooled by a single process that lies.
:::
:::

::: exercise Amnesia breaks perfect links {level=3}
In the crash-recovery model, suppose the receiver $q$ of [[#alg-perfect-link]] keeps its set $D$ only in memory, so that a restart empties it. Show that no-duplication can fail. Then explain how to repair the algorithm, and why it is enough for the sender to keep its sequence-number counter on stable storage only in batches (for example, by reserving blocks of $1000$ numbers at a time).
::: solution
*Failure.* $p$ sends $m$ with number $s$; $q$ receives it, delivers $m$, adds $s$ to $D$ and sends the acknowledgement, which is lost. $q$ crashes and restarts with $D = \emptyset$. $p$ retransmits $\langle \text{DATA}, s, m\rangle$; $q$ finds $s \notin D$ and delivers $m$ a second time.

*Repair.* $q$ must make the delivery and the insertion of $s$ into $D$ durable together: write $s$ (and, if delivery means handing $m$ to an application that also persists it, the message) to stable storage before delivering, atomically, for instance by appending to a log and flushing it. On restart, $q$ reloads $D$. If $q$ crashes after the write but before acknowledging, $p$ retransmits and $q$ acknowledges without redelivering.

*Sender's counter.* Sequence numbers must be fresh, even across sender restarts — if $p$ restarted its counter at $0$, a new message with an old number would be wrongly discarded as a duplicate. Persisting every increment costs one disk write per message. Instead $p$ records on disk "numbers below $B + 1000$ may be in use", and uses $B, B+1, \dots$ from memory; after a crash it resumes at $B + 1000$. Some numbers are skipped, which is harmless, because only freshness matters, not contiguity. (The receiver's set $D$ can then no longer be compressed to "the highest number delivered so far" without care, which is one reason real protocols tie sequence numbers to a connection or session with a fresh identifier.)
:::
:::

::: exercise Many messengers {level=3 check="1/1024"}
In [[#ex-messengers]], each messenger is captured with probability $0.5$ and $A$ sends $10$. What is the probability that the generals disagree? Then show that no *deterministic* protocol can bring the disagreement probability to $0$ when each message is lost independently with probability $p$ with $0 < p < 1$, given that termination must hold in every execution. (Enter the probability for the first part.)
::: solution
All $10$ captured: $0.5^{10} = 1/1024$.

For the second part: with $0 < p < 1$, every finite pattern of losses has positive probability. Take a deterministic protocol that satisfies validity and termination in every execution. By [[#thm-two-generals]], it violates agreement in some execution $E$. Agreement is decided after finitely many steps, during which finitely many messages, say $r$, are sent; the pattern of which of these are delivered and which lost determines the execution up to both decisions (the protocol is deterministic and the inputs are fixed). That pattern has probability at least $\min(p, 1-p)^r > 0$. So the probability of disagreement is positive. Randomisation and probabilistic losses can make disagreement rare, but never impossible.
:::
:::
