A storage service lets one client at a time write to a file, using a lock from a lock service. Client 1 acquires the lock, which is a **lease** valid for ten seconds, and begins to write. Then its process stops for fifteen seconds — a long garbage-collection pause, or its virtual machine was suspended for migration. The lease expires; the lock service grants the lock to client 2, which writes the file. Client 1 wakes up, still believing it holds the lock (from its point of view no time has passed), and finishes its write on top of client 2's. The file is corrupted, although every component behaved "correctly".

Building systems that keep working when parts of them fail is the goal of **fault tolerance**. The previous chapters supplied the main tools: replication ([[distributed-systems/replication-consistency]]) and consensus ([[distributed-systems/consensus]]). This chapter fills in the rest. We start with the vocabulary and arithmetic of reliability — availability, mean time to failure, the probability of losing data — and then make **failure detection** precise with Chandra and Toueg's unreliable failure detectors, including the leases and **fencing tokens** that rescue the story above. We look at what **state-machine replication** demands of the replicated service. Then we leave crash failures behind and face **Byzantine** faults, where faulty processes may lie: we prove the famous bound that agreement needs more than three times as many processes as traitors, $n \ge 3f + 1$, study Lamport, Shostak and Pease's recursive algorithm, simulate it, and see how PBFT uses quorums of $2f + 1$. We end with recovery: checkpoints and rollback.

## Faults, errors and failures

The dependability literature (Avižienis, Laprie, Randell and Landwehr, 2004) distinguishes three things that everyday speech calls "failure".

::: definition Fault, error, failure {#def-fault}
A **failure** is an event in which a system's delivered service deviates from its specification. An **error** is the part of the system's state that may lead to a failure. A **fault** is the cause of an error — a defect in hardware or software, an operator mistake, a cosmic ray. A fault is **active** when it produces an error, and **dormant** otherwise.
:::

A bit flip in a memory cell is a fault; the wrong value in a variable is an error; the wrong answer returned to the user is a failure. One component's failure is a fault for the system that contains it — this is what lets us build reliable systems from unreliable parts. **Fault tolerance** means preventing faults from becoming system failures, by **masking** them (replication: the other replicas carry on), by detecting errors and **recovering** (restart from a checkpoint), or by **failing safe** (stop rather than do harm).

### Availability and reliability

::: definition Reliability and availability {#def-availability}
A system's **reliability** $R(t)$ is the probability that it operates without failure for a time $t$. Its **mean time to failure** (MTTF) is the expected time from (re)start to the next failure, and its **mean time to repair** (MTTR) the expected time from failure to restored service. Its (steady-state) **availability** is the long-run fraction of time it is up:
$$
A = \frac{\mathrm{MTTF}}{\mathrm{MTTF} + \mathrm{MTTR}}.
$$ {#eq-availability}
:::

The formula follows from the renewal–reward theorem: the system alternates up periods (mean MTTF) and down periods (mean MTTR), and in the long run the fraction of time up is the ratio of the means. Availability is usually quoted in **nines**: $99.9\%$ ("three nines") allows $8.8$ hours of downtime a year, $99.99\%$ allows $53$ minutes, and $99.999\%$ about $5$ minutes. The formula shows the two levers: make failures rarer, or make repair faster. Automatic failover is mostly a way to cut MTTR from hours (a person is paged) to seconds.

The probability of *losing data* behaves differently from availability: data is lost only if every replica fails before repair completes.

::: theorem Mean time to data loss with two replicas {#thm-mttdl}
Two replicas fail independently, each at rate $\lambda$ (exponentially distributed lifetimes, so $\mathrm{MTTF} = 1/\lambda$). When one fails, it is repaired — its data re-copied from the survivor — at rate $\mu$ ($\mathrm{MTTR} = 1/\mu$). Data is lost if the second replica fails during a repair. Starting with both replicas up, the mean time to data loss is
$$
\mathrm{MTTDL} = \frac{3\lambda + \mu}{2\lambda^2} \;\approx\; \frac{\mathrm{MTTF}^2}{2\,\mathrm{MTTR}} \quad\text{when } \mu \gg \lambda.
$$ {#eq-mttdl}
:::

::: proof
Let $T_2$ and $T_1$ be the expected times to data loss starting with two and with one replica up. With two up, the first failure comes after an exponential time with rate $2\lambda$ (mean $1/(2\lambda)$), leading to state $1$: $T_2 = \frac{1}{2\lambda} + T_1$. With one up, the next event comes after mean time $1/(\lambda + \mu)$; it is a repair (back to state $2$) with probability $\mu/(\lambda + \mu)$, and a failure (data lost) with probability $\lambda/(\lambda+\mu)$. So
$$
T_1 = \frac{1}{\lambda + \mu} + \frac{\mu}{\lambda + \mu}\, T_2 = \frac{1}{\lambda + \mu} + \frac{\mu}{\lambda + \mu}\left(\frac{1}{2\lambda} + T_1\right).
$$
Multiplying by $\lambda + \mu$ and collecting $T_1$: $\lambda T_1 = 1 + \frac{\mu}{2\lambda}$, so $T_1 = \frac{2\lambda + \mu}{2\lambda^2}$, and $T_2 = \frac{1}{2\lambda} + \frac{2\lambda+\mu}{2\lambda^2} = \frac{3\lambda + \mu}{2\lambda^2}$. When $\mu \gg \lambda$, the numerator is about $\mu$, giving $\mu/(2\lambda^2) = \mathrm{MTTF}^2 / (2\,\mathrm{MTTR})$.
:::

::: example How long until two disks lose data? {#ex-mttdl}
A disk has an MTTF of $100{,}000$ hours (about $11$ years) and re-replicating its contents takes $24$ hours. What is the MTTDL of a pair of mirrored disks? What if re-replication takes $1$ hour?
::: solution
$\lambda = 10^{-5}$ per hour and $\mu = 1/24$. By [[#eq-mttdl]], $\mathrm{MTTDL} = (3 \times 10^{-5} + 0.04167)/(2 \times 10^{-10}) \approx 2.08 \times 10^8$ hours, about $23{,}800$ years. With a one-hour repair it is $24$ times longer. The quadratic dependence on MTTF and inverse dependence on MTTR is why distributed storage systems re-replicate lost data quickly and in parallel from many sources ([[distributed-systems/distributed-storage]]).

But these numbers are wildly optimistic. They assume independent failures, whereas disks from the same batch fail together, a power fault takes out a whole rack, and a software bug or an operator command can delete every replica at once. In practice, correlated failures dominate data loss, which is why replicas are placed in different failure domains (racks, buildings, regions) and why backups — copies that a bug in the live system cannot reach — remain necessary.
:::
:::

::: widget plot
f: (3/m + 1/x)/(2/m^2)/8766
x: 1, 72
y: 0, 200000
sliders: m=100000:10000:1000000:10000
labels: \text{MTTDL (years)}
points: 24,23783
caption: Mean time to data loss of two mirrored replicas, in years, against the repair time in hours, from [[#thm-mttdl]] with an MTTF of $m$ hours per replica. The dot is [[#ex-mttdl]]. Notice the shape: halving the repair time roughly doubles the MTTDL, and doubling the MTTF quadruples it. Remember that this is the *independent-failure* model; correlated failures can make the real figure smaller by orders of magnitude.
:::

## Failure detection

By [[distributed-systems/system-models#thm-indistinguishable]], no algorithm in an asynchronous system can detect crashes both completely and accurately. Tushar Chandra and Sam Toueg (1996) turned this negative result into a positive theory: instead of asking for perfect detection, specify *how wrong* a detector may be, and ask which problems it suffices for.

::: definition Unreliable failure detectors {#def-fd}
A **failure detector** is a module at each process that outputs a set of processes it currently **suspects** of having crashed. Its properties:
- **strong completeness**: eventually every crashed process is permanently suspected by every correct process;
- **strong accuracy**: no process is suspected before it crashes;
- **weak accuracy**: some correct process is never suspected;
- **eventual strong accuracy**: there is a time after which no correct process is suspected by any correct process;
- **eventual weak accuracy**: there is a time after which some correct process is never suspected by any correct process.

A **perfect** detector $\mathcal{P}$ has strong completeness and strong accuracy; an **eventually perfect** detector $\Diamond\mathcal{P}$ has strong completeness and eventual strong accuracy; an **eventually strong** detector $\Diamond\mathcal{S}$ has strong completeness and eventual weak accuracy.
:::

Chandra and Toueg showed that consensus can be solved with $\Diamond\mathcal{S}$ whenever a majority of processes is correct, and Chandra, Hadzilacos and Toueg (1996) that $\Diamond\mathcal{S}$ — equivalently, the **eventual leader** detector $\Omega$, which eventually outputs the same correct process at every correct process — is the *weakest* failure detector for consensus. This is a precise sense in which Paxos and Raft need exactly a leader-election mechanism that is eventually right: their elections implement $\Omega$, and FLP says that nothing weaker would do. In partial synchrony, a simple heartbeat protocol implements $\Diamond\mathcal{P}$.

::: algorithm Heartbeats with adaptive timeouts {#alg-heartbeat}
Each process sends a heartbeat to every other process every $\eta$ time units. Process $p$ keeps, for each $q$, a timeout $T_q$ (initially $T_0$) and the time of the last heartbeat from $q$.
1. If no heartbeat from $q$ has arrived within $T_q$ of the last one, add $q$ to the suspected set.
2. Upon receiving a heartbeat from a suspected $q$: remove $q$ from the suspected set and set $T_q \gets 2T_q$ (the suspicion was a mistake).
:::

::: proposition Heartbeats implement an eventually perfect detector {#prop-heartbeat}
In a partially synchronous system in which, after some unknown time GST, every message is delivered within $\Delta$ and every correct process sends heartbeats on schedule, [[#alg-heartbeat]] satisfies strong completeness and eventual strong accuracy.
:::

::: proof
*Completeness.* A crashed process $q$ sends finitely many heartbeats. After the last one has been delivered (or lost), each correct $p$ waits $T_q$ and suspects $q$; since no further heartbeat arrives, $q$ is never removed.

*Eventual accuracy.* Fix correct processes $p$ and $q$. After GST, consecutive heartbeats from $q$ arrive at $p$ at most $\eta + \Delta$ apart, so every suspicion of $q$ is ended by the arrival of a heartbeat, which doubles $T_q$; timeouts never decrease. A suspicion after GST can happen only while $T_q < \eta + \Delta$, and each one doubles $T_q$, so at most $\lceil \log_2((\eta + \Delta)/T_0) \rceil$ suspicions of $q$ by $p$ happen after GST, and the last of them is eventually ended; from then on $p$ never suspects $q$. There are finitely many pairs, so after some time no correct process suspects any correct process.
:::

Production systems prefer to output a level of suspicion rather than a yes or no. The **φ accrual failure detector** (Hayashibara and colleagues, 2004), used in Cassandra and Akka, estimates the distribution of heartbeat inter-arrival times from recent history and outputs
$$
\varphi(t) = -\log_{10} \Prob(\text{the next heartbeat arrives later than } t \text{ after the last}),
$$
so that $\varphi = 1$ means a $10\%$ chance that a live process would be this late, $\varphi = 3$ a $0.1\%$ chance. Each application chooses its own threshold, trading detection speed against false suspicions.

::: example A φ value {#ex-phi}
Heartbeat inter-arrival times are modelled as exponential with mean $1$ s. It is $5$ s since the last heartbeat. What is $\varphi$? How long must we wait for $\varphi = 8$?
::: solution
$\Prob(\text{gap} > t) = e^{-t}$ for $t$ in seconds, so $\varphi(t) = -\log_{10} e^{-t} = t \log_{10} e = t / \ln 10$. At $t = 5$, $\varphi \approx 2.17$: a live process would be this late with probability $e^{-5} \approx 0.7\%$. For $\varphi = 8$ we need $t = 8 \ln 10 \approx 18.4$ s. Real implementations usually fit a normal distribution to recent gaps instead, whose thinner tail makes $\varphi$ grow much faster once the delay exceeds a few standard deviations.
:::
:::

### Leases and fencing

A failure detector's mistakes are harmless for consensus — Paxos and Raft are safe whatever the detector says — but dangerous for anything that grants **exclusive** rights. A **lease** is a lock with an expiry time: the holder may act until the lease expires, and the lock service will not grant it to anyone else before then (plus a margin for clock drift). Leases tolerate crashed holders, since the lock frees itself, but the opening story shows their weakness: the holder may not *know* that its lease has expired, because it was paused, or its clock is wrong, or a message telling the storage service what to do was delayed in the network until after expiry.

::: definition Fencing token {#def-fencing}
A lock service issues, with each grant of a lock, a **fencing token**: a number that increases with every grant (for example the Raft log index or term at which the grant was committed). The client includes the token with every request to the protected resource. The resource remembers the largest token it has seen and **rejects** any request carrying a smaller token.
:::

::: proposition Fencing makes stale holders harmless {#prop-fencing}
If the resource processes requests one at a time and applies the rule of [[#def-fencing]], then once it has accepted a request with token $t$, it never accepts a request from a holder with an earlier grant, whose token is less than $t$. Hence the accepted requests come from holders in grant order, and a holder whose lease was superseded can no longer modify the resource once its successor has made a request.
:::

::: proof
The resource's remembered maximum $\mathit{max}$ never decreases, and after accepting $t$ it is at least $t$. A request with token $t' < t$ arrives after that and has $t' < t \le \mathit{max}$, so it is rejected. Tokens increase with grants, so an earlier grant has a smaller token.
:::

In the opening story, client 1 had token $33$ and client 2 token $34$; once client 2's write has been accepted, client 1's late write with token $33$ is rejected. Fencing moves the final check to the one place that sees all requests in order — the resource itself — instead of trusting each client's belief about time. The same idea appears as Raft's term numbers, which let followers reject a deposed leader's messages.

::: warning A timeout tells you about the past, not the present
"I checked that my lease is valid, so I may write" is a check-then-act race: between the check and the write, the process may pause for an arbitrary time (garbage collection, page faults, scheduling, virtual-machine suspension), and the network may delay the write. Code that reads the clock, compares it with a lease expiry and then performs a remote action has no guarantee that the lease is still valid when the action takes effect. Only checks performed *at the resource* — fencing tokens, conditional writes with version numbers — close the window.
:::

## State-machine replication in practice

Consensus gives a replicated log; [[distributed-systems/consensus#def-smr]] turns a log into a replicated service. For the replicas to stay identical, the service must meet several requirements that Fred Schneider set out in his 1990 tutorial.

- **Determinism.** Every replica must compute the same new state and output from the same command. Reading the clock, generating random numbers, iterating over a hash table with randomised order, or running commands on several threads all break this. The leader can resolve non-determinism *before* logging — log "set $x$ to $1717171717$" rather than "set $x$ to the current time" — or replicas can execute commands strictly sequentially.
- **Exactly-once commands.** A client that times out and retries may get its command into the log twice. The deduplication table of [[distributed-systems/remote-communication#alg-dedup]] must be part of the replicated state, so that every replica — including a future leader — recognises the duplicate.
- **Bounded logs.** Logs grow forever unless replicas periodically take a **snapshot** of the state machine and discard the log prefix it covers; a lagging or new replica is then brought up to date by sending it the snapshot.
- **Reconfiguration.** Replacing machines changes the set of replicas, and hence what a majority is. Changing it in one step can create two disjoint majorities (one of the old configuration, one of the new); Raft's joint consensus and single-server changes, and Vertical Paxos, are protocols for doing this safely.
- **Linearisable reads.** As the warning in [[distributed-systems/consensus]] explained, reads must go through the log or be confirmed by a majority, unless leases with bounded clock drift are assumed.

Replication masks independent faults only. If a command triggers a bug that crashes the service, every replica applies the command and every replica crashes — the "query of death". Defences include validating commands before they enter the log, running different software versions on different replicas, and rate-limiting automatic restarts.

## Byzantine faults

So far, faulty processes have stopped or lost messages. A **Byzantine** process (from Lamport, Shostak and Pease's 1982 paper) can do anything: send wrong values, send different values to different processes (**equivocate**), or collude with other faulty processes. Byzantine models matter when processes are run by mutually distrustful parties (blockchains, multi-organisation systems), when an attacker may control some machines, and when undetected hardware faults could cause arbitrary behaviour (flight control, spacecraft).

::: definition Byzantine agreement {#def-byzantine}
Each of $n$ processes has an input value; up to $f$ of them are Byzantine. The others are **correct**. Processes communicate over reliable, authenticated point-to-point links (a receiver knows which process sent each message on a link, but messages carry no signatures that a third party can check — **oral messages**). An algorithm solves **Byzantine agreement** if
- **agreement**: all correct processes decide the same value;
- **validity**: if all correct processes have the same input $v$, they decide $v$;
- **termination**: every correct process decides.

In the **Byzantine generals** (Byzantine broadcast) variant, one process, the **commander**, sends a value; agreement is as above, and validity reads: if the commander is correct, every correct process decides the commander's value.
:::

Validity is necessarily phrased in terms of correct processes' inputs: a Byzantine process's "input" means nothing. The two variants are closely related: given broadcast, each process broadcasts its input and every correct process decides the majority of the values it obtains.

### Three processes cannot tolerate one traitor

::: theorem No Byzantine agreement with $n \le 3f$ {#thm-3f}
In the synchronous model with oral messages, no deterministic algorithm solves Byzantine agreement among $n$ processes if $3 \le n \le 3f$. (With $n \le 2$ and $f \ge 1$ the problem is trivial, since there may be only one correct process, which can decide its own input.)
:::

::: proof
*Three processes, one fault.* Suppose an algorithm solves the problem for processes $A$, $B$, $C$ with $f = 1$ (with inputs in $\set{0,1}$). Each process runs a program with a link to each of the other two. Build a ring of six processes $A_0, B_0, C_0, A_1, B_1, C_1$, connected in the cycle

$$
A_0 - B_0 - C_0 - A_1 - B_1 - C_1 - A_0,
$$

where $X_i$ runs $X$'s program with input $i$, and its link "to $Y$" is connected to its neighbour that is a copy of $Y$. (Check: $A_0$'s neighbours are $B_0$ and $C_1$, $B_0$'s are $A_0$ and $C_0$, and so on — each copy has exactly one neighbour of each other kind.) The ring is not a legal system for the algorithm, but it is a well-defined synchronous system of deterministic programs, so it has a unique execution $S$. We compare $S$ with three legal executions of the original system.

- $\alpha_1$: $A$ and $B$ are correct with input $0$; $C$ is Byzantine. On its link to $A$, $C$ sends exactly what $C_1$ sends to $A_0$ in $S$, and on its link to $B$ exactly what $C_0$ sends to $B_0$. $C$ can do this by simulating the whole ring except $A_0$ and $B_0$, feeding the simulation the messages it receives from $A$ and $B$. By induction on rounds, $A$ and $B$ receive in $\alpha_1$ exactly what $A_0$ and $B_0$ receive in $S$, so they have the same views. In $\alpha_1$ both correct processes have input $0$, so by validity and termination they decide $0$. Hence $A_0$ and $B_0$ decide $0$ in $S$.
- $\alpha_2$: $B$ and $C$ are correct with input $1$; $A$ is Byzantine and plays $A_1$ towards $B$ and $A_0$ towards $C$. In the same way, $B$ and $C$ have the views of $B_1$ and $C_1$, and decide $1$ by validity. Hence $B_1$ and $C_1$ decide $1$ in $S$.
- $\alpha_3$: $C$ is correct with input $1$, $A$ is correct with input $0$, and $B$ is Byzantine, playing $B_1$ towards $C$ and $B_0$ towards $A$. Then $C$ and $A$ have the views of $C_1$ and $A_0$ in $S$, which are adjacent in the ring. So $C$ decides $1$ and $A$ decides $0$ — two correct processes disagree, contradicting agreement.

*General $n \le 3f$.* Suppose an algorithm $\mathcal{A}$ solves the problem for $n$ processes and $f$ faults with $3 \le n \le 3f$. Partition the $n$ processes into three non-empty groups $G_A, G_B, G_C$ of at most $f$ each. Let three processes $A, B, C$ each simulate one group: $A$ runs all the programs of $G_A$, delivering messages within its group internally and sending messages between groups over its links, and so on, with all members of a group given the simulator's input. A Byzantine simulator corresponds to its whole group being Byzantine — at most $f$ processes, which $\mathcal{A}$ tolerates. If simulator $A$ decides what (say) the first member of its group decides, then agreement, validity and termination of $\mathcal{A}$ give a three-process algorithm tolerating one Byzantine process, which we have just shown impossible.
:::

The ring argument is due to Michael Fischer, Nancy Lynch and Michael Merritt (1986), who gave it as an "easy impossibility proof"; Lamport, Shostak and Pease's original argument (1982) reached the same bound with a different proof. The intuition is that with three processes, a correct process that receives conflicting reports from the other two cannot tell which of them is lying. Notice the role of oral messages: the Byzantine process could replay to $A$ what "$C_1$ said", because nothing in a message proves who originated it. With **signed messages** that cannot be forged, Byzantine broadcast becomes solvable for any number of traitors (Dolev and Strong, 1983, in $f + 1$ rounds), although the $3f + 1$ bound returns for consensus in partially synchronous systems even with signatures (Dwork, Lynch and Stockmeyer, 1988).

### The oral messages algorithm

Lamport, Shostak and Pease also gave a matching algorithm for $n \ge 3m + 1$, with $m$ traitors. Its idea is recursion: every lieutenant relays what it heard, and everybody takes majorities.

::: algorithm Oral messages OM($m$) {#alg-om}
Let $\mathrm{majority}(v_1, \dots, v_k)$ be the value held by more than half of the $v_i$, or a default value "retreat" if there is none.
- **OM(0)**: the commander sends its value to every lieutenant; each lieutenant uses the value it receives ("retreat" if it receives none).
- **OM($m$)**, $m > 0$: (1) The commander sends its value to every lieutenant. (2) For each lieutenant $j$, let $v_j$ be the value $j$ received (or "retreat"); $j$ acts as commander in OM($m - 1$), sending $v_j$ to the $n - 2$ other lieutenants. (3) Each lieutenant $i$, for each $j \ne i$, lets $v_j$ be the value it obtained for $j$ from step 2 (by OM($m-1$)), takes $v_i$ to be the value it received directly in step 1, and uses $\mathrm{majority}(v_1, \dots, v_{n-1})$.
:::

::: lemma Loyal commanders are obeyed {#lem-om-ic2}
For any $m$ and $k$, OM($m$) satisfies validity (every loyal lieutenant uses the commander's value if the commander is loyal) whenever there are more than $2k + m$ generals and at most $k$ traitors.
:::

::: proof
By induction on $m$. For $m = 0$, a loyal commander sends $v$ to everyone and loyal lieutenants use it. For $m > 0$, the loyal commander sends $v$ to all $n - 1$ lieutenants. Each loyal lieutenant $j$ then runs OM($m - 1$) as commander among $n - 1$ generals, and $n - 1 > 2k + (m - 1)$, so by the induction hypothesis every loyal lieutenant $i$ obtains $v_j = v$ for every loyal $j$. Among the $n - 1$ lieutenants at most $k$ are traitors, and $n - 1 > 2k$, so the loyal ones are a majority; hence a majority of the values $v_1, \dots, v_{n-1}$ at lieutenant $i$ equal $v$, and $i$ uses $v$.
:::

::: theorem OM($m$) solves Byzantine generals for $n > 3m$ {#thm-om}
If there are more than $3m$ generals and at most $m$ traitors, OM($m$) satisfies agreement and validity.
:::

::: proof
By induction on $m$. With $m = 0$ there are no traitors and both properties are immediate. Let $m > 0$. If the commander is loyal, [[#lem-om-ic2]] with $k = m$ (since $n > 3m = 2m + m$) gives validity, and validity implies agreement. If the commander is a traitor, at most $m - 1$ lieutenants are traitors, and there are $n - 1 > 3m - 1 \ge 3(m - 1)$ lieutenants; so by the induction hypothesis, each run of OM($m-1$) in step 2 satisfies agreement and validity. By agreement, all loyal lieutenants obtain the same value $v_j$ for every lieutenant $j \neq$ themselves; and for a loyal $j$, validity of OM($m-1$) says that the other loyal lieutenants obtain exactly the value $j$ received directly, which is the $v_j$ that $j$ uses for itself. So every loyal lieutenant holds the same vector $(v_1, \dots, v_{n-1})$ and computes the same majority.
:::

OM($m$) runs for $m + 1$ rounds — optimal, by the same $f + 1$ lower bound as for crashes — but sends $O(n^{m+1})$ messages, because every message is relayed down a tree of depth $m$. It is a proof of possibility, not a practical protocol. A simulation shows the bound at work; the traitors use a simple strategy, telling the truth to even-numbered generals and lying to odd-numbered ones:

```python
from collections import Counter

def majority(values):
    """Majority value, or the default "retreat" if there is no strict majority."""
    v, c = Counter(values).most_common(1)[0]
    return v if c > len(values) / 2 else "retreat"

def om(m, commander, lieutenants, value, traitors):
    """Oral Messages algorithm OM(m). Returns {lieutenant: value it uses for this commander}."""
    def sent(to):                                    # what the commander tells lieutenant `to`
        if commander in traitors and to % 2 == 1:    # a traitor lies to odd-numbered generals
            return "retreat" if value == "attack" else "attack"
        return value
    received = {l: sent(l) for l in lieutenants}
    if m == 0:
        return received
    result = {}
    sub = {j: om(m - 1, j, [l for l in lieutenants if l != j], received[j], traitors)
           for j in lieutenants}                     # each lieutenant j relays what it received
    for i in lieutenants:
        votes = [received[i]] + [sub[j][i] for j in lieutenants if j != i]
        result[i] = majority(votes)
    return result

def run(n, m, traitors, value="attack"):
    out = om(m, 0, list(range(1, n)), value, set(traitors))
    loyal = {i: v for i, v in out.items() if i not in traitors}
    print(f"n={n} m={m} traitors={sorted(traitors)}  loyal decisions={loyal}")

run(4, 1, {3})          # loyal commander, one traitorous lieutenant
run(4, 1, {0})          # traitorous commander
run(7, 2, {0, 6})       # n = 7 > 3m with m = 2
run(3, 1, {2})          # n = 3 = 3m: IC2 can fail
```

```console
$ python3 om.py
n=4 m=1 traitors=[3]  loyal decisions={1: 'attack', 2: 'attack'}
n=4 m=1 traitors=[0]  loyal decisions={1: 'retreat', 2: 'retreat', 3: 'retreat'}
n=7 m=2 traitors=[0, 6]  loyal decisions={1: 'retreat', 2: 'retreat', 3: 'retreat', 4: 'retreat', 5: 'retreat'}
n=3 m=1 traitors=[2]  loyal decisions={1: 'retreat'}
```

::: example Tracing OM(1) with four generals {#ex-om}
Explain the first, second and fourth lines of the output.
::: solution
*Loyal commander, traitor $3$.* The commander sends "attack" to $1, 2, 3$. In step 2, loyal $2$ relays "attack"; traitor $3$ relays "attack" to $2$ (even) and "retreat" to $1$ (odd). Lieutenant $1$ holds (attack from the commander, attack via $2$, retreat via $3$): majority attack. Lieutenant $2$ holds (attack, attack via $1$, attack via $3$): attack. Validity holds.

*Traitor commander.* It sends "attack" to $2$ and "retreat" to $1$ and $3$. All lieutenants are loyal and relay faithfully, so each holds the same multiset $\set{\text{retreat}, \text{attack}, \text{retreat}}$ — lieutenant $i$'s own value plus the relayed values of the other two, which together are the three values the commander sent. All use "retreat": agreement holds, though they do not attack. Validity does not apply, since the commander is a traitor.

*Three generals.* With $n = 3$ and traitor $2$, lieutenant $1$ holds (attack from the commander, retreat via $2$): no majority, so the default "retreat" — although the commander is loyal and said "attack". Validity fails, as [[#thm-3f]] says it must for some strategy.

The third line, where both the commander and lieutenant $6$ are traitors and the five loyal lieutenants nonetheless agree, is [[#thm-om]] with $m = 2$. They agree on "retreat" because the traitorous commander sent "retreat" to three of its six lieutenants ($1$, $3$ and $5$) and "attack" to the other three; with no majority for either, the recursive relays give every loyal lieutenant the same picture, and the default wins.
:::
:::

### Practical Byzantine fault tolerance

Miguel Castro and Barbara Liskov's **PBFT** (1999) made Byzantine fault tolerance practical for state-machine replication in a partially synchronous network: it is always safe and, like Paxos, live once the network is timely. It uses $n = 3f + 1$ replicas, signed or MAC-authenticated messages, and quorums of size $2f + 1$. In normal operation a primary assigns each request a sequence number in a **pre-prepare** message; replicas broadcast **prepare** messages, and a replica that has $2f + 1$ matching prepares (including the pre-prepare) knows that no correct replica can have prepared a different request at that sequence number; replicas then broadcast **commit** messages and execute the request after $2f + 1$ commits. A **view change** replaces a faulty primary. The whole design rests on one counting fact.

::: proposition Byzantine quorum intersection {#prop-bft-quorum}
With $n = 3f + 1$ replicas, any two quorums of size $2f + 1$ have at least $f + 1$ replicas in common, and so at least one *correct* replica in common.
:::

::: proof
$\lvert Q_1 \cap Q_2 \rvert \ge \lvert Q_1\rvert + \lvert Q_2\rvert - n = 2(2f + 1) - (3f + 1) = f + 1$. At most $f$ replicas are faulty, so at least one replica in the intersection is correct. A correct replica does not send conflicting messages (say, prepares for two different requests with the same sequence number and view), so two quorums cannot both vouch for conflicting decisions.
:::

The size $2f + 1$ is forced from the other side too: a replica can wait for only $n - f$ messages, since $f$ replicas may never answer, so quorums have size $n - f$, and two of them must share a correct replica: $2(n - f) - n \ge f + 1$, i.e. $n \ge 3f + 1$ (Exercise 8). PBFT needs $O(n^2)$ messages per request because every replica broadcasts to every other; later protocols such as HotStuff (2019) reduce this to linear communication with threshold signatures. **Nakamoto consensus**, the protocol of Bitcoin (2008), takes a different route for open, permissionless membership: proof of work makes voting power proportional to computation, and agreement on a block becomes overwhelmingly probable as more blocks are built on top of it, rather than final.

::: quiz
A system uses PBFT and must tolerate $2$ Byzantine replicas. What is the minimum number of replicas, and how many matching replies must a client wait for before trusting a result?
- [ ] $5$ replicas; $3$ replies
- [x] $7$ replicas; $3$ replies
- [ ] $7$ replicas; $5$ replies
- [ ] $6$ replicas; $4$ replies
::: solution
$n = 3f + 1 = 7$. A client accepts a result once $f + 1 = 3$ replicas give the same answer: at least one of them is correct, and a correct replica returns only the result of the agreed execution. (Inside the protocol, replicas use quorums of $2f + 1 = 5$; the client's smaller threshold suffices because it only needs one correct witness, not intersection.)
:::
:::

## Recovery

Masking failures by replication is one strategy; the other is to **recover**: restore a correct state after a failure and continue. A process **checkpoints** its state to stable storage periodically and, after a crash, restarts from the latest checkpoint. In a distributed computation this is subtle, because processes' checkpoints must fit together: if process $q$'s checkpoint records the receipt of a message that process $p$'s checkpoint does not record sending, rolling back both to these checkpoints yields an impossible state — an inconsistent cut ([[distributed-systems/time-clocks#def-cut]]).

With **uncoordinated checkpointing**, each process checkpoints independently, and recovery looks for the latest set of checkpoints forming a consistent cut. This can cascade — the **domino effect** — rolling processes back further and further, possibly to the beginning, because each rollback undoes sends that other processes' checkpoints depend on. **Coordinated checkpointing** avoids this by taking a consistent snapshot, for example with the Chandy–Lamport algorithm ([[distributed-systems/time-clocks#alg-chandy-lamport]]); this is how stream processors checkpoint ([[distributed-systems/data-processing]]). **Message logging** records the messages each process receives (or their order), so that a crashed process can be replayed deterministically from its last checkpoint to its exact pre-crash state without rolling anyone else back — the same idea as replaying a database's write-ahead log ([[databases/recovery]]).

::: example The domino effect {#ex-domino}
Processes $P$ and $Q$ checkpoint independently. In order: $P$ takes checkpoint $p_1$; $P$ sends $m_1$ to $Q$; $Q$ receives $m_1$ and takes checkpoint $q_1$; $Q$ sends $m_2$ to $P$; $P$ receives $m_2$ and takes checkpoint $p_2$; $P$ sends $m_3$ to $Q$; $Q$ receives $m_3$ and takes checkpoint $q_2$; $Q$ sends $m_4$ to $P$; then $P$ crashes before its next checkpoint. To which checkpoints must the processes roll back?
::: solution
$P$ restarts from $p_2$, its latest checkpoint. The pair $(p_2, q_2)$ is inconsistent: $q_2$ records receiving $m_3$, which $P$ sent after $p_2$. So $Q$ must roll back to $q_1$. Now $(p_2, q_1)$ is inconsistent: $p_2$ records receiving $m_2$, which $Q$ sent after $q_1$. So $P$ must roll back to $p_1$. Then $(p_1, q_1)$: $q_1$ records receiving $m_1$, sent after $p_1$ — inconsistent again, so $Q$ must roll back to its initial state. Finally (initial state of $Q$, $p_1$) is consistent, since $p_1$ records no messages. A single crash has undone almost all the work of both processes: every checkpoint was "spoiled" by a message that crossed it. Coordinated checkpointing would have taken $p_2$ and $q_2$ as one consistent snapshot, recording $m_3$ as in transit.
:::
:::

::: history
Lamport, Robert Shostak and Marshall Pease posed the Byzantine generals problem in "The Byzantine generals problem" (*ACM TOPLAS*, 1982), after the 1980 paper "Reaching agreement in the presence of faults" (Pease, Shostak and Lamport) that proved the $3f+1$ bound; the work grew out of SRI's SIFT fault-tolerant flight-control computer for NASA. Danny Dolev and Ray Strong gave the authenticated algorithm in 1983, and Michael Fischer, Nancy Lynch and Michael Merritt the ring proof in "Easy impossibility proofs for distributed consensus problems" (1986). Fred Schneider's "Implementing fault-tolerant services using the state machine approach: a tutorial" (*ACM Computing Surveys*, 1990) systematised state-machine replication. Tushar Chandra and Sam Toueg's unreliable failure detectors and, with Vassos Hadzilacos, the weakest detector for consensus appeared in the *Journal of the ACM* in 1996. Miguel Castro and Barbara Liskov presented PBFT at OSDI 1999. Algirdas Avižienis, Jean-Claude Laprie, Brian Randell and Carl Landwehr's taxonomy of dependability appeared in 2004, the same year as Naohiro Hayashibara and colleagues' φ accrual failure detector. Satoshi Nakamoto's Bitcoin paper was published in 2008.
:::

## Where this leads

Distributed storage systems ([[distributed-systems/distributed-storage]]) put this chapter's arithmetic to work: replica placement across failure domains, fast re-replication and anti-entropy. [[distributed-systems/distributed-transactions]] meets a failure that replication alone does not solve — a coordinator crashing in the middle of a commit. Byzantine faults and adversaries connect to [[security/security-principles]] and to the cryptographic signatures of [[cryptography/signatures]], which make the authenticated Byzantine model possible.

::: summary
- A **fault** causes an **error** which may cause a **failure**; fault tolerance masks faults, recovers from errors or fails safe.
- Availability is $\mathrm{MTTF}/(\mathrm{MTTF} + \mathrm{MTTR})$; two replicas lose data after about $\mathrm{MTTF}^2/(2\,\mathrm{MTTR})$ under independence ([[#thm-mttdl]]) — but correlated failures dominate.
- Failure detectors are classified by **completeness** and **accuracy**; heartbeats with growing timeouts give $\Diamond\mathcal{P}$ in partial synchrony ([[#prop-heartbeat]]), and $\Omega$ (an eventual leader) is the weakest detector for consensus.
- Leases need **fencing tokens** checked at the resource ([[#prop-fencing]]); a timeout says nothing about the present.
- State-machine replication needs **determinism**, replicated deduplication, snapshots and safe reconfiguration.
- **Byzantine agreement** with oral messages needs $n \ge 3f + 1$ ([[#thm-3f]]); **OM($m$)** achieves it ([[#thm-om]]) at exponential message cost; signatures help broadcast but not partially synchronous consensus.
- **PBFT** uses $3f + 1$ replicas and quorums of $2f + 1$, which share a correct replica ([[#prop-bft-quorum]]).
- **Recovery** uses consistent (coordinated) checkpoints or message logging to avoid the domino effect.
:::

## Exercises

::: exercise Nines {level=1 check="0.0005*525600"}
How many minutes of downtime per (365-day) year does $99.95\%$ availability allow? (Enter the number of minutes.)
::: solution
A year has $365 \times 24 \times 60 = 525{,}600$ minutes; $0.05\%$ of that is $262.8$ minutes, about $4.4$ hours.
:::
:::

::: exercise Availability from MTTF and MTTR {level=1 check="1000/1002"}
A server fails on average every $1000$ hours and takes $2$ hours to repair. What is its availability? (Enter the fraction.)
::: solution
By [[#eq-availability]], $A = 1000/(1000 + 2) \approx 0.998$. Automating repair to $2$ minutes would give $1000/(1000 + 1/30) \approx 0.99997$ without making the hardware any better.
:::
:::

::: exercise PBFT sizing {level=1 check="7"}
How many replicas does PBFT need to tolerate $2$ Byzantine faults? (Enter the number.)
::: solution
$3f + 1 = 7$. Quorums have size $2f + 1 = 5$; a crash-tolerant protocol for $2$ faults would need only $5$ replicas.
:::
:::

::: exercise OM(1) by hand {level=2}
Four generals; the commander is loyal and orders "retreat", and lieutenant $1$ is a traitor that relays "attack" to everyone. What does each loyal lieutenant decide in OM(1)? Now suppose instead that lieutenants $1$ and $2$ are both traitors and relay "attack". What can go wrong, and which assumption of [[#thm-om]] is violated?
::: solution
*One traitor.* Lieutenants $2$ and $3$ each hold: retreat (direct), attack (via $1$), retreat (via the other loyal lieutenant). Majority retreat: validity holds.

*Two traitors.* Lieutenant $3$ holds: retreat (direct), attack (via $1$), attack (via $2$). Majority attack — it disobeys a loyal commander. With $m = 1$ the algorithm assumes at most one traitor; two traitors among four generals need $n > 3 \times 2 = 6$, and OM(2).
:::
:::

::: exercise MTTDL {level=2 check="(3/10000 + 1/10)/(2/10000^2)"}
Two replicas each have an MTTF of $10{,}000$ hours, and re-replication takes $10$ hours. Using the exact formula [[#eq-mttdl]], what is the MTTDL in hours? (Enter the number of hours.)
::: solution
$\lambda = 10^{-4}$, $\mu = 0.1$: $(3 \times 10^{-4} + 0.1)/(2 \times 10^{-8}) = 0.1003 / (2 \times 10^{-8}) = 5.015 \times 10^6$ hours, about $572$ years. The approximation $\mathrm{MTTF}^2/(2\,\mathrm{MTTR}) = 10^8/20 = 5 \times 10^6$ is within $0.3\%$.
:::
:::

::: exercise φ accrual {level=2 check="6/ln(10)"}
Heartbeat gaps are modelled as exponential with mean $0.5$ s. What is $\varphi$ when $3$ s have passed since the last heartbeat? (Enter the value.)
::: solution
The rate is $2$ per second, so $\Prob(\text{gap} > 3) = e^{-6}$, and $\varphi = -\log_{10} e^{-6} = 6/\ln 10 \approx 2.61$.
:::
:::

::: exercise Heartbeats are not perfect {level=3}
(a) Show that no algorithm implements the perfect failure detector $\mathcal{P}$ in the partially synchronous model of [[#prop-heartbeat]]. (b) Show that in a synchronous system with known $\Delta$ and heartbeat period $\eta$, a fixed timeout implements $\mathcal{P}$, and give the smallest safe timeout.
::: solution
(a) Before GST the system behaves asynchronously, so the argument of [[distributed-systems/system-models#thm-indistinguishable]] applies: take an execution where $q$ crashes and $p$ eventually suspects it (completeness) at time $T$; construct another where $q$ is correct but all its messages are delayed until after $T$, and GST is later than $T$. $p$ has the same view, suspects $q$ at $T$, and strong accuracy fails.

(b) Consecutive heartbeats of a correct $q$ are sent $\eta$ apart and each takes between $0$ and $\Delta$ to arrive, so the gap between arrivals is at most $\eta + \Delta$ (the earlier one arriving at once, the later one after $\Delta$). A timeout $T = \eta + \Delta$ (plus a margin for clock drift in measuring it) never suspects a correct process — strong accuracy — and suspects a crashed process within $T$ of its last heartbeat — completeness. Any smaller timeout can be fooled by a gap of exactly $\eta + \Delta$.
:::
:::

::: exercise Why $n - f$ quorums force $3f + 1$ {level=3}
In a Byzantine system of $n$ replicas with at most $f$ faulty, a replica can wait for at most $n - f$ messages (the faulty ones may stay silent). Prove that any two sets of $n - f$ replicas share at least one correct replica if and only if $n \ge 3f + 1$. Relate this to [[#thm-3f]].
::: solution
Two sets of size $n - f$ share at least $2(n - f) - n = n - 2f$ replicas, and exactly that many in the worst case (choose them to overlap minimally, which is possible when $n - 2f \ge 0$). In the worst case all $f$ faulty replicas are in the intersection, so a correct replica is guaranteed in it iff $n - 2f \ge f + 1$, i.e. $n \ge 3f + 1$. If $n = 3f$, two quorums of $2f$ can overlap in exactly $f$ replicas, all faulty: the faulty replicas tell one quorum "$v$" and the other "$w$", and each quorum looks complete and consistent — exactly the equivocation that the ring argument of [[#thm-3f]] exploits, where the Byzantine process speaks with different voices to its two neighbours.
:::
:::

::: exercise Fencing with a storage service {level=3}
Implement, in Python, a toy storage server that enforces fencing tokens and a lock service that issues increasing tokens, and replay the story of this chapter's opening: client 1 gets the lock (token $33$), pauses, its lease expires, client 2 gets the lock (token $34$) and writes, then client 1 writes. Show that client 1's write is rejected. Then explain why fencing would *not* help if the storage server were itself replicated with a leaderless, eventually consistent protocol.
::: solution
```python
class LockService:
    def __init__(self): self.token = 32
    def acquire(self, client):
        self.token += 1                      # a new, larger token for every grant
        return self.token

class Storage:
    def __init__(self): self.max_token, self.data = 0, None
    def write(self, token, value):
        if token < self.max_token:
            return f"rejected write {value!r} with stale token {token}"
        self.max_token, self.data = token, value
        return f"accepted write {value!r} with token {token}"

locks, disk = LockService(), Storage()
t1 = locks.acquire("client 1")               # 33; then client 1 pauses and its lease expires
t2 = locks.acquire("client 2")               # 34
print(disk.write(t2, "client 2's data"))
print(disk.write(t1, "client 1's data"))     # client 1 wakes up and writes
print("final:", disk.data)
```

```console
$ python3 fencing.py
accepted write "client 2's data" with token 34
rejected write "client 1's data" with stale token 33
final: client 2's data
```

The proof of [[#prop-fencing]] needed a single point that sees all requests in order and remembers the maximum token. In a leaderless store, client 2's write may reach replicas $A$ and $B$ while client 1's late write reaches replica $C$, which has not seen token $34$ and accepts $33$. Different replicas now hold different "latest" values, and a later merge (say, last-writer-wins by wall-clock timestamp) may pick client 1's. Fencing needs the resource to apply a linearisable check — a compare-and-set on the token — which in a replicated store requires consensus or at least a linearisable register ([[distributed-systems/replication-consistency#alg-abd]]).
:::
:::
