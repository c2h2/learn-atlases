Suppose we want to accept the binary strings whose *third symbol from the end* is $1$. A deterministic automaton reading from left to right does not know where the end is, so it must remember the last three symbols at every moment — eight possibilities, and, as we shall prove, eight states are really necessary. But describing the language to a person takes one sentence: "somewhere there is a $1$ followed by exactly two more symbols". If a machine could *guess* when it has reached that $1$, and then simply check that exactly two symbols follow, four states would do.

A **nondeterministic** automaton is allowed to make such guesses. At each step it may have several possible moves, or none, and it accepts if *some* sequence of choices leads to an accepting state. This sounds like cheating — real machines do not guess — but it is one of the most productive ideas in the theory of computation. Nondeterministic automata are often far smaller and easier to design than deterministic ones; they make the closure of regular languages under concatenation and star almost obvious; and they can always be simulated deterministically, by keeping track of *all* the states the machine could be in. That simulation, the **subset construction**, is the main theorem of this chapter. Its price — a possibly exponential number of states — is the first example of a question that runs through the whole subject: what does nondeterminism buy? For finite automata the answer is "succinctness but no extra power"; for polynomial-time Turing machines it is the $\mathsf{P}$ versus $\mathsf{NP}$ question of [[complexity]].

## Nondeterministic finite automata

An NFA differs from a DFA in two ways. From a state, on a symbol, it may move to *any* of a set of states (possibly empty). And it may have **$\varepsilon$-moves**: transitions it can take without reading any input. We write $\Sigma_\varepsilon = \Sigma \cup \{\varepsilon\}$ and $\mathcal{P}(Q)$ for the power set of $Q$, the set of all its subsets.

::: definition Nondeterministic finite automaton {#def-nfa}
A **nondeterministic finite automaton** (NFA) is a 5-tuple $N = (Q, \Sigma, \delta, q_0, F)$ where $Q$, $\Sigma$, $q_0$ and $F$ are as for a DFA and the transition function is

$$
\delta\colon Q \times \Sigma_\varepsilon \to \mathcal{P}(Q).
$$

$N$ **accepts** $w \in \Sigma^*$ if $w$ can be written as $w = y_1 y_2 \cdots y_m$ with each $y_i \in \Sigma_\varepsilon$, and there are states $r_0, r_1, \dots, r_m$ such that

1. $r_0 = q_0$;
2. $r_{i} \in \delta(r_{i-1}, y_i)$ for $i = 1, \dots, m$;
3. $r_m \in F$.

The sequence $r_0, \dots, r_m$ is an **accepting run** (or accepting **computation path**). $L(N)$ is the set of strings $N$ accepts.
:::

Every DFA is an NFA in disguise: take $\delta_N(q, a) = \{\delta(q, a)\}$ and $\delta_N(q, \varepsilon) = \emptyset$. The interesting direction is the converse.

Three features of the definition deserve emphasis. First, acceptance is **existential**: $w$ is accepted if *at least one* run accepts, however many others reject or get stuck. Second, a run can **die**: if $\delta(r, a) = \emptyset$ there is no move and that run simply ends without accepting. Third, $\varepsilon$-moves let the machine change state between symbols, so a single string can have runs of different lengths $m \ge \lvert w\rvert$.

There are two good ways to picture the computation. In the **guessing** picture, the machine is a lucky guesser that always makes the right choice if one exists. In the **parallel** picture, the machine splits into copies at each choice, the copies run simultaneously, a copy with no move disappears, and the input is accepted if any copy is in an accepting state at the end. The parallel picture is the one that leads to a simulation: we only have to keep track of the *set* of states occupied by some copy.

::: example Third symbol from the end {#ex-third}
Give an NFA for $L_3 = \{w \in \{0,1\}^* : \lvert w\rvert \ge 3 \text{ and the third symbol from the end of } w \text{ is } 1\}$, and find all its runs on $0110$.
::: solution
States $0, 1, 2, 3$; start $0$; $F = \{3\}$. State $0$ loops on both symbols ("not yet"); on $1$ it may also jump to state $1$ ("this is the one"); states $1 \to 2 \to 3$ on any symbol count the two remaining symbols; state $3$ has no moves:

| state | on $0$ | on $1$ |
|---|---|---|
| $\to 0$ | $\{0\}$ | $\{0, 1\}$ |
| $1$ | $\{2\}$ | $\{2\}$ |
| $2$ | $\{3\}$ | $\{3\}$ |
| $3$ (accepting) | $\emptyset$ | $\emptyset$ |

On $0110$ every run starts $0 \xrightarrow{0} 0$. At the first $1$ (position 2) a run may stay in $0$ or jump to $1$; jumping gives $0, 0, 1, 2, 3$, which reads all four symbols and ends in $3$: **accepting**. At the second $1$ (position 3) jumping gives $0, 0, 0, 1, 2$: rejecting (ends in $2$). Never jumping gives $0,0,0,0,0$: rejecting. Any run that reaches $3$ before the end dies. One accepting run suffices, so $0110 \in L(N)$, as it should be: its third symbol from the end is the $1$ at position $2$.
:::
:::

::: widget graph
nodes: q0@0,0; q1@2,0; q2@4,0; q3@6,0
edges: q0>q0:0; q0>q0:1; q0>q1:1; q1>q2:0; q1>q2:1; q2>q3:0; q2>q3:1
algorithm: none
caption: The four-state NFA of [[#ex-third]] — $q_3$ is accepting. The two arrows out of $q_0$ labelled $1$ are the nondeterministic choice: stay, or guess that this $1$ is the third symbol from the end. Follow the input $0110$ along every possible path and confirm that exactly one of them ends in $q_3$ after the last symbol. Compare this with the eight-state DFA built from it below.
:::

### The $\varepsilon$-closure

To handle $\varepsilon$-moves systematically we need the states reachable "for free".

::: definition $\varepsilon$-closure {#def-eclosure}
For a set $S \subseteq Q$ of states of an NFA, its **$\varepsilon$-closure** $E(S)$ is the set of states reachable from some state of $S$ by following zero or more $\varepsilon$-moves. For a set $S$ and a symbol $a \in \Sigma$, let

$$
\Delta(S, a) = E\Bigl(\,\bigcup_{q \in S} \delta(q, a)\Bigr),
$$

the states reachable from $S$ by one $a$-move followed by any number of $\varepsilon$-moves.
:::

$E(S)$ is computed by a graph search from $S$ along the $\varepsilon$-arrows only, in time linear in the number of states and $\varepsilon$-arrows. Note that $S \subseteq E(S)$ (zero moves) and $E(E(S)) = E(S)$.

::: example Divisible by two or by three {#ex-two-three}
Over the one-letter alphabet $\{0\}$, the language $\{0^k : 2 \mid k \text{ or } 3 \mid k\}$ is the union of two cycles. Build an NFA with $\varepsilon$-moves for it and compute the sets of states reachable after reading $0^k$ for $k = 0, \dots, 6$.
::: solution
A new start state $s$ has $\varepsilon$-moves to $a_0$ and $b_0$; $a_0 \to a_1 \to a_0$ is a $2$-cycle and $b_0 \to b_1 \to b_2 \to b_0$ a $3$-cycle on $0$; $F = \{a_0, b_0\}$. The run sets are:

| $k$ | states after $0^k$ | accept? |
|---|---|---|
| $0$ | $E(\{s\}) = \{s, a_0, b_0\}$ | yes |
| $1$ | $\{a_1, b_1\}$ | no |
| $2$ | $\{a_0, b_2\}$ | yes |
| $3$ | $\{a_1, b_0\}$ | yes |
| $4$ | $\{a_0, b_1\}$ | yes |
| $5$ | $\{a_1, b_2\}$ | no |
| $6$ | $\{a_0, b_0\}$ | yes |

From then on the pattern repeats with period $6$. The machine guesses at the start, with its $\varepsilon$-moves, which of the two conditions it will check, and the set of states tracks both guesses at once.
:::
:::

## Simulating an NFA

The parallel picture gives an algorithm. Keep the set $S$ of states that some run could be in; start with $S = E(\{q_0\})$; on each symbol $a$ replace $S$ by $\Delta(S, a)$; at the end accept iff $S \cap F \ne \emptyset$.

```python
EPS = ""                                     # label of an epsilon-move

def closure(delta, states):
    """All states reachable from `states` by epsilon-moves alone."""
    stack, seen = list(states), set(states)
    while stack:
        q = stack.pop()
        for r in delta.get((q, EPS), ()):
            if r not in seen:
                seen.add(r)
                stack.append(r)
    return frozenset(seen)

def step(delta, states, a):
    moved = {r for q in states for r in delta.get((q, a), ())}
    return closure(delta, moved)

def accepts(delta, start, accept, w):
    current = closure(delta, {start})
    print(f"start   {sorted(current)}")
    for a in w:
        current = step(delta, current, a)
        print(f"read {a}  {sorted(current)}")
    return bool(current & accept)

# third symbol from the end is 1: guess the position, then count 2 more
N3 = {(0, "0"): {0}, (0, "1"): {0, 1},
      (1, "0"): {2}, (1, "1"): {2},
      (2, "0"): {3}, (2, "1"): {3}}
if __name__ == "__main__":
    print(accepts(N3, 0, {3}, "0110"))
```

```console
$ python3 nfa.py
start   [0]
read 0  [0]
read 1  [0, 1]
read 1  [0, 1, 2]
read 0  [0, 2, 3]
True
```

The transition function is a dictionary from (state, symbol) to a set of states; missing keys mean $\emptyset$. Each step touches every state in the current set and every arrow out of it, so an input of length $n$ is processed in $O(n \cdot (\lvert Q\rvert + m))$ time, where $m$ is the number of arrows — slower than a DFA's $\Theta(n)$, but polynomial, and without building anything in advance.

The correctness of this simulation is the heart of the next theorem. Let $R(w)$ denote the set of states $r$ such that some run of $N$ on $w$ ends in $r$ — that is, $w = y_1 \cdots y_m$ with $y_i \in \Sigma_\varepsilon$ and $q_0 = r_0, r_1, \dots, r_m = r$ with $r_i \in \delta(r_{i-1}, y_i)$. By definition, $N$ accepts $w$ iff $R(w) \cap F \ne \emptyset$.

::: lemma Reachable sets {#lem-reach}
For every NFA, $R(\varepsilon) = E(\{q_0\})$ and $R(wa) = \Delta(R(w), a)$ for all $w \in \Sigma^*$ and $a \in \Sigma$.
:::

::: proof
A run on $\varepsilon$ uses only $\varepsilon$-moves, so its possible end states are exactly $E(\{q_0\})$.

Now consider a run on $wa$, with $wa = y_1 \cdots y_m$. Let $j$ be the index of the last piece that is a symbol rather than $\varepsilon$ (there is one, since $wa \ne \varepsilon$), so $y_1 \cdots y_{j-1}$ spells $w$, $y_j = a$ and $y_{j+1}, \dots, y_m$ are all $\varepsilon$. Then $r_{j-1} \in R(w)$ (the first $j - 1$ steps are a run on $w$), $r_j \in \delta(r_{j-1}, a)$, and $r_m$ is reached from $r_j$ by $\varepsilon$-moves. So $r_m \in E\bigl(\bigcup_{q \in R(w)} \delta(q, a)\bigr) = \Delta(R(w), a)$.

Conversely, if $r \in \Delta(R(w), a)$, there are $p \in R(w)$, $p' \in \delta(p, a)$ and a chain of $\varepsilon$-moves from $p'$ to $r$. Concatenating a run on $w$ ending in $p$, the move to $p'$ and that chain gives a run on $wa$ ending in $r$. Hence $R(wa) = \Delta(R(w), a)$.
:::

## The subset construction

The simulation does not depend on the input except through the current set $S$, and there are only finitely many sets — $2^{\lvert Q\rvert}$ of them. So the simulation *is* a DFA whose states are sets of NFA states.

::: theorem Subset construction (Rabin and Scott) {#thm-subset}
For every NFA $N = (Q, \Sigma, \delta, q_0, F)$ there is a DFA $D$ with at most $2^{\lvert Q\rvert}$ states such that $L(D) = L(N)$. Consequently a language is regular if and only if some NFA recognises it.
:::

::: proof
Define $D = (\mathcal{P}(Q), \Sigma, \delta_D, s_0, F_D)$ by

$$
s_0 = E(\{q_0\}), \qquad \delta_D(S, a) = \Delta(S, a), \qquad F_D = \{ S \subseteq Q : S \cap F \ne \emptyset\}.
$$

$\delta_D$ is a total function from $\mathcal{P}(Q) \times \Sigma$ to $\mathcal{P}(Q)$, so $D$ is a DFA with $2^{\lvert Q\rvert}$ states. We show $\hat\delta_D(s_0, w) = R(w)$ for every $w$, by induction on $\lvert w\rvert$. For $w = \varepsilon$: $\hat\delta_D(s_0, \varepsilon) = s_0 = E(\{q_0\}) = R(\varepsilon)$ by [[#lem-reach]]. For $wa$: $\hat\delta_D(s_0, wa) = \delta_D(\hat\delta_D(s_0, w), a) = \Delta(R(w), a) = R(wa)$, using the induction hypothesis and [[#lem-reach]].

Therefore $D$ accepts $w$ iff $R(w) \in F_D$ iff $R(w) \cap F \ne \emptyset$ iff $N$ accepts $w$. Since every DFA is an NFA, the two models recognise the same class of languages.
:::

In practice we never build all $2^{\lvert Q\rvert}$ subsets: we start from $s_0$ and add only the subsets that are reachable, exactly as in a graph search. Many constructions, and most NFAs arising from regular expressions, produce far fewer reachable subsets than the worst case.

::: algorithm Subset construction, reachable part {#alg-subset}
1. Let $s_0 \gets E(\{q_0\})$; put $s_0$ on a work list; the table is empty.
2. While the work list is non-empty:
   1. Remove a set $S$. If $S$ already has a row in the table, continue.
   2. For each $a \in \Sigma$, compute $T \gets \Delta(S, a)$, record $\delta_D(S, a) = T$, and add $T$ to the work list.
3. The DFA's states are the rows of the table; its accepting states are those $S$ with $S \cap F \ne \emptyset$.
:::

```python
from nfa import closure, step, N3

def subset_construction(delta, start, accept, sigma):
    """Return the reachable part of the subset DFA as (table, start, finals)."""
    s0 = closure(delta, {start})
    table, todo = {}, [s0]
    while todo:
        S = todo.pop()
        if S in table:
            continue
        table[S] = {a: step(delta, S, a) for a in sigma}
        todo.extend(table[S].values())
    finals = {S for S in table if S & accept}
    return table, s0, finals

table, s0, finals = subset_construction(N3, 0, {3}, "01")
name = lambda S: "{" + ",".join(map(str, sorted(S))) + "}"
for S in sorted(table, key=lambda S: (len(S), sorted(S))):
    mark = "*" if S in finals else " "
    print(f"{mark} {name(S):10} 0 -> {name(table[S]['0']):10} 1 -> {name(table[S]['1'])}")
print(len(table), "reachable subsets of", 2 ** 4)
```

```console
$ python3 subset.py
  {0}        0 -> {0}        1 -> {0,1}
  {0,1}      0 -> {0,2}      1 -> {0,1,2}
  {0,2}      0 -> {0,3}      1 -> {0,1,3}
* {0,3}      0 -> {0}        1 -> {0,1}
  {0,1,2}    0 -> {0,2,3}    1 -> {0,1,2,3}
* {0,1,3}    0 -> {0,2}      1 -> {0,1,2}
* {0,2,3}    0 -> {0,3}      1 -> {0,1,3}
* {0,1,2,3}  0 -> {0,2,3}    1 -> {0,1,2,3}
8 reachable subsets of 16
```

::: example Reading the subset DFA {#ex-subset-read}
Interpret the eight states of the DFA just computed for $L_3$, and explain why the other eight subsets of $\{0,1,2,3\}$ are unreachable.
::: solution
State $0$ is in every set, because the NFA can always stay in $0$. Beyond that, $1 \in S$ iff the last symbol read was $1$ (the NFA jumped at that symbol), $2 \in S$ iff the second-to-last symbol was $1$, and $3 \in S$ iff the third-to-last was $1$. So the set $S$ encodes exactly the last three symbols — $\{0, 2, 3\}$ means "the last three symbols were $1, 1, 0$" — and it is accepting iff $3 \in S$, i.e. iff the third symbol from the end is $1$. The eight subsets not containing $0$ never occur, since $0$ belongs to $s_0$ and the NFA always stays in $0$. The subset construction has rediscovered the "remember the last three symbols" DFA.
:::
:::

::: widget graph
nodes: 0@0,0; 01@2,0; 02@4,1.2; 012@4,-1.2; 03@6,1.2; 013@6,-1.2; 023@8,1.2; 0123@8,-1.2
edges: 0>0:0; 0>01:1; 01>02:0; 01>012:1; 02>03:0; 02>013:1; 03>0:0; 03>01:1; 012>023:0; 012>0123:1; 013>02:0; 013>012:1; 023>03:0; 023>013:1; 0123>023:0; 0123>0123:1
algorithm: bfs
start: 0
caption: The DFA produced by the subset construction from the four-state NFA for $L_3$. Vertex $013$ stands for the set $\{0, 1, 3\}$; the accepting states are the four sets containing $3$. Step through breadth-first search from $\{0\}$: it discovers states in the same way as [[#alg-subset]], and finds all eight reachable subsets. Every state has exactly one arrow per symbol — the nondeterminism has been absorbed into the sets.
:::

### The exponential blow-up is real

Is $2^{\lvert Q\rvert}$ a weakness of the construction or a fact about the languages? For $L_3$ the answer is the latter, and the argument generalises.

::: theorem Succinctness of nondeterminism {#thm-blowup}
For $k \ge 1$ let $L_k$ be the set of strings over $\{0,1\}$ whose $k$-th symbol from the end is $1$. Then $L_k$ is recognised by an NFA with $k + 1$ states, but every DFA recognising $L_k$ has at least $2^k$ states.
:::

::: proof
The NFA is the evident generalisation of [[#ex-third]]: state $0$ loops on both symbols and also moves to state $1$ on $1$; states $i \to i+1$ on both symbols for $1 \le i < k$; $F = \{k\}$. An accepting run must jump at some $1$ and then read exactly $k - 1$ further symbols, so it accepts exactly $L_k$.

Now let $D = (Q, \{0,1\}, \delta, q_0, F)$ be any DFA for $L_k$. We show that the $2^k$ strings of length $k$ drive $D$ to $2^k$ different states. Take two different strings $x \ne y$ of length $k$, and let $i$ be a position where they differ — say $x_i = 1$ and $y_i = 0$. Let $z = 0^{i-1}$. In $xz$, which has length $k + i - 1$, the $k$-th symbol from the end is at position $i$, namely $x_i = 1$; so $xz \in L_k$. Likewise $yz \notin L_k$. If $\hat\delta(q_0, x) = \hat\delta(q_0, y)$, then by [[theory-of-computation/finite-automata#lem-compose]] $\hat\delta(q_0, xz) = \hat\delta(\hat\delta(q_0, x), z) = \hat\delta(\hat\delta(q_0, y), z) = \hat\delta(q_0, yz)$, so $D$ would accept both or reject both — a contradiction. Hence the $2^k$ strings reach distinct states and $\lvert Q\rvert \ge 2^k$.
:::

The argument — find many prefixes that must lead to different states because some continuation tells them apart — is the method of **distinguishing strings**. It is made exact in [[theory-of-computation/non-regular-languages]] (the Myhill–Nerode theorem), where it also proves that some languages need *infinitely* many states.

::: quiz
An NFA has $5$ states. Which statements are certainly true?
- [x] There is an equivalent DFA with at most $32$ states.
- [ ] There is an equivalent DFA with at most $5$ states.
- [x] Its language is regular.
- [ ] Its complement is recognised by the NFA with accepting and non-accepting states swapped.
::: solution
The subset construction gives at most $2^5 = 32$ states, and the language is regular. A DFA with $5$ states need not exist: [[#thm-blowup]] with $k = 4$ gives a $5$-state NFA whose DFAs need $16$ states. Swapping accepting states of an NFA does not complement it in general: a string with one accepting and one rejecting run is accepted by both machines. (For the NFA of [[#ex-third]], swapping makes states $0, 1, 2$ accepting, and since every string has a run that stays in $0$, the swapped machine accepts *everything*.)
:::
:::

::: warning Nondeterministic is not the same as random or parallel hardware
A nondeterministic automaton does not flip coins: acceptance is defined by the *existence* of an accepting run, not by the probability of finding one. Nor is it a parallel computer with a fixed number of processors: the number of "copies" in the parallel picture can be as large as the number of states, and in the Turing-machine setting of [[complexity]] it can grow exponentially with the input. Nondeterminism is a mathematical device for *specifying* languages succinctly; to run an NFA you must simulate it, by sets of states as above or by backtracking over choices — and backtracking can take exponential time, which is the root of slow regular-expression matching in [[theory-of-computation/regular-expressions]].
:::

## Closure under the regular operations

With NFAs, the closure properties that were awkward for DFAs become easy. We build NFAs whose $\varepsilon$-moves glue machines together. In each case let $N_1 = (Q_1, \Sigma, \delta_1, q_1, F_1)$ and $N_2 = (Q_2, \Sigma, \delta_2, q_2, F_2)$ recognise $A_1$ and $A_2$, with $Q_1 \cap Q_2 = \emptyset$ (rename states if necessary).

::: theorem Closure under union {#thm-nfa-union}
$A_1 \cup A_2$ is regular.
:::

::: proof
Add a new start state $q_0$ with $\delta(q_0, \varepsilon) = \{q_1, q_2\}$; keep all transitions of $N_1$ and $N_2$; let $F = F_1 \cup F_2$. Every run of the new machine begins with one $\varepsilon$-move to $q_1$ or to $q_2$ and continues as a run of $N_1$ or of $N_2$, because there are no arrows between $Q_1$ and $Q_2$ and none back to $q_0$. So it has an accepting run on $w$ iff $N_1$ or $N_2$ does.
:::

Compared with the product construction, this NFA has $\lvert Q_1\rvert + \lvert Q_2\rvert + 1$ states instead of $\lvert Q_1\rvert \cdot \lvert Q_2\rvert$; [[#ex-two-three]] is an instance.

::: theorem Closure under concatenation {#thm-nfa-concat}
$A_1 A_2 = \{xy : x \in A_1, y \in A_2\}$ is regular.
:::

::: proof
Keep both machines; the start state is $q_1$ and the accepting states are $F_2$; add an $\varepsilon$-move from every $f \in F_1$ to $q_2$. If $w = xy$ with $x \in A_1$ and $y \in A_2$, an accepting run of $N_1$ on $x$ ends in some $f \in F_1$; follow the new $\varepsilon$-move to $q_2$ and an accepting run of $N_2$ on $y$. Conversely, any accepting run starts in $Q_1$ and ends in $F_2 \subseteq Q_2$; the only arrows from $Q_1$ into $Q_2$ are the new $\varepsilon$-moves, and there are none back, so the run crosses exactly once, from some $f \in F_1$ to $q_2$. The part before the crossing is an accepting run of $N_1$ on some prefix $x$ of $w$, and the part after it is an accepting run of $N_2$ on the rest $y$. So $w = xy \in A_1A_2$.
:::

The NFA *guesses* where $x$ ends and $y$ begins. A DFA for $A_1 A_2$ would have to keep track of every possible split point at once — which is what the subset construction does for us automatically.

::: theorem Closure under star {#thm-nfa-star}
$A_1^*$ is regular.
:::

::: proof
Add a **new** start state $q_0$, which is accepting, with $\delta(q_0, \varepsilon) = \{q_1\}$; keep $N_1$'s transitions; add an $\varepsilon$-move from every $f \in F_1$ back to $q_1$; let $F = F_1 \cup \{q_0\}$.

If $w \in A_1^*$, then either $w = \varepsilon$, accepted in $q_0$, or $w = x_1 \cdots x_k$ with $k \ge 1$ and each $x_i \in A_1$: go from $q_0$ to $q_1$, run $N_1$ on $x_1$ to some accepting state, jump back to $q_1$, run on $x_2$, and so on, ending in $F_1$. Conversely, consider an accepting run on $w$. If it never leaves $q_0$ then $w = \varepsilon$ (no arrow enters $q_0$, and $q_0$ has only the $\varepsilon$-move out). Otherwise it moves to $q_1$ and ends in $F_1$; cut it at each use of a new $\varepsilon$-move $f \to q_1$. Each piece runs from $q_1$ to a state of $F_1$ using only $N_1$'s transitions, so it is an accepting run of $N_1$ on some $x_i \in A_1$, and $w = x_1 \cdots x_k \in A_1^*$.
:::

::: warning Why the star construction needs a new start state
A tempting shortcut is to make the old start state $q_1$ accepting instead of adding $q_0$. That accepts $\varepsilon$ — but it also accepts any string whose run *returns* to $q_1$ without passing through $F_1$, which need not be in $A_1^*$. For example, let $N_1$ have states $q_1, p$ with $q_1 \xrightarrow{a} p$, $p \xrightarrow{b} q_1$ and $F_1 = \{p\}$, so $A_1 = a(ba)^*$. Making $q_1$ accepting (and adding $p \xrightarrow{\varepsilon} q_1$) accepts $ab$, but $ab \notin A_1^*$, because every string of $A_1^*$ is empty or ends in $a$. The new start state has no incoming arrows, so accepting it adds only $\varepsilon$.
:::

::: example The star construction at work {#ex-star}
Let $A = \{1, 01\}$, recognised by the NFA with states $p_0$ (start), $p_1$, $p_2$ (accepting) and moves $p_0 \xrightarrow{1} p_2$, $p_0 \xrightarrow{0} p_1$, $p_1 \xrightarrow{1} p_2$. Build the NFA of [[#thm-nfa-star]] for $A^*$ and simulate it on $1011$ and on $100$.
::: solution
Add a new accepting start state $q_0$ with $q_0 \xrightarrow{\varepsilon} p_0$, and an $\varepsilon$-move $p_2 \xrightarrow{\varepsilon} p_0$; the accepting set is $\{q_0, p_2\}$. The sets of states are:

| input read | set of states | accept? |
|---|---|---|
| $\varepsilon$ | $E(\{q_0\}) = \{q_0, p_0\}$ | yes |
| $1$ | $E(\{p_2\}) = \{p_2, p_0\}$ | yes |
| $10$ | $\{p_1\}$ | no |
| $101$ | $\{p_2, p_0\}$ | yes |
| $1011$ | $\{p_2, p_0\}$ | yes |

So $1011 = 1 \cdot 01 \cdot 1$ is accepted. On $100$, the set after $10$ is $\{p_1\}$, and $p_1$ has no move on $0$, so the set becomes $\emptyset$ and stays empty: rejected, correctly, since in $A^*$ every $0$ is followed by a $1$. Once the set of states is empty, no continuation can be accepted — $\emptyset$ is the dead state of the subset DFA.
:::
:::

Together with closure under complement and intersection from [[theory-of-computation/finite-automata#thm-union-intersection]], we now know that the regular languages are closed under all the Boolean operations, concatenation, star and reversal (by the reversed-arrows construction of the exercises in the previous chapter). In the next chapter these three NFA constructions become an algorithm that converts any regular expression into an automaton.

::: quiz
$N$ recognises $A$. In the concatenation construction for $AA$ we need two disjoint copies of $N$. What goes wrong if we use a single copy, adding $\varepsilon$-moves from $F$ to $q_0$ and keeping $F$ as the accepting set?
- [ ] Nothing: the result recognises $AA$.
- [x] The result recognises $A^+ = AA^*$, which can be larger than $AA$.
- [ ] The result recognises only $A$.
::: solution
With one copy, a run can loop back to $q_0$ any number of times, so the machine accepts any concatenation of one or more strings of $A$ (every such string ends with a run in $F$, and the loop-backs allow more blocks). That is $A^+$. It coincides with $AA$ only for special $A$; for $A = \{a\}$ it accepts $a, aa, aaa, \dots$ instead of just $aa$.
:::
:::

## In practice

Deterministic and nondeterministic simulation are both used in real tools, and the choice is a time–space trade-off. A DFA built in advance processes input in $\Theta(n)$ time with one table lookup per symbol, but construction can take exponential time and space. Simulating the NFA set by set costs $O(n \cdot \lvert Q\rvert)$ time for an NFA with $O(\lvert Q \rvert)$ arrows (as produced from regular expressions) and needs no precomputation. **Lazy determinisation** combines the two: run the set-based simulation, but cache each DFA state and transition the first time it is computed, so that frequently visited sets cost a lookup and only the reachable sets ever get built. Regular-expression engines designed for guaranteed linear time, such as RE2 and the Rust `regex` crate (as of 2026), work this way, with a cap on cache memory and a fallback to plain NFA simulation if the cache thrashes.

Lexer generators, by contrast, run the subset construction fully at build time and then minimise the result ([[theory-of-computation/non-regular-languages]]), because the same token DFA will be run on every program the compiler ever reads.

::: history
Michael Rabin and Dana Scott introduced nondeterministic finite automata in "Finite automata and their decision problems" (1959), proving the subset construction and with it that nondeterminism adds no power to finite automata; the paper also studied two-way and multi-tape automata and decision problems, and it earned them the 1976 Turing Award. The example showing that the $2^n$ bound cannot be improved in general is folklore; its variants appear in the work of Albert Meyer and Michael Fischer on the "economy of description" by automata and grammars (1971) and of Frank Moore (1971). The $\varepsilon$-moves used here became standard through Ken Thompson's 1968 construction of NFAs from regular expressions, which he implemented in the QED and `ed` editors at Bell Labs, simulating sets of states directly.
:::

## Where this leads

[[theory-of-computation/regular-expressions]] uses the constructions of this chapter to turn regular expressions into NFAs (Thompson's construction), and conversely turns automata into regular expressions, proving Kleene's theorem. In [[theory-of-computation/pushdown-automata]] nondeterminism is essential: unlike here, nondeterministic pushdown automata are strictly more powerful than deterministic ones. For Turing machines, nondeterminism again adds no power ([[theory-of-computation/turing-machines]]), but whether it adds *speed* — whether every language decided by a nondeterministic machine in polynomial time can be decided deterministically in polynomial time — is the $\mathsf{P}$ versus $\mathsf{NP}$ problem of [[complexity]].

::: summary
- An **NFA** may have several moves or none on a symbol, and $\varepsilon$-moves that read nothing; it accepts if *some* run ends in an accepting state ([[#def-nfa]]).
- The set of states reachable after reading $w$ is updated by $\Delta(S, a) = E\bigl(\bigcup_{q\in S}\delta(q,a)\bigr)$, starting from $E(\{q_0\})$ ([[#lem-reach]]); this gives an $O(n\lvert Q\rvert)$ simulation for NFAs with $O(\lvert Q\rvert)$ arrows.
- The **subset construction** turns an $n$-state NFA into an equivalent DFA with at most $2^n$ states, so NFAs recognise exactly the regular languages ([[#thm-subset]]). Build only the reachable subsets ([[#alg-subset]]).
- The blow-up can be unavoidable: "the $k$-th symbol from the end is $1$" needs $k + 1$ NFA states but $2^k$ DFA states ([[#thm-blowup]]), proved by **distinguishing strings**.
- NFAs prove closure under union, concatenation and star with $\varepsilon$-moves ([[#thm-nfa-union]], [[#thm-nfa-concat]], [[#thm-nfa-star]]); the star construction needs a new accepting start state.
- Complementing an NFA requires determinising it first.
:::

## Exercises

::: exercise Runs of an NFA {level=1}
For the NFA of [[#ex-third]], list the set of states reached after each prefix of $10100$ and decide whether the string is accepted.
::: solution
Start $\{0\}$. Read $1$: $\{0, 1\}$. Read $0$: $\{0, 2\}$. Read $1$: $\{0, 1, 3\}$. Read $0$: $\{0, 2\}$ (state $3$ has no moves, state $1$ goes to $2$). Read $0$: $\{0, 3\}$. The final set contains $3$, so $10100$ is accepted; indeed its third symbol from the end is the $1$ at position $3$.
:::
:::

::: exercise Counting subset states {level=1 check="7"}
Apply the subset construction to the $\varepsilon$-NFA of [[#ex-two-three]] (states $s, a_0, a_1, b_0, b_1, b_2$). How many reachable DFA states are there? (Enter the number.)
::: solution
The reachable sets are $\{s, a_0, b_0\}$ (the start), then $\{a_1, b_1\}$, $\{a_0, b_2\}$, $\{a_1, b_0\}$, $\{a_0, b_1\}$, $\{a_1, b_2\}$, $\{a_0, b_0\}$, after which the next set is $\{a_1, b_1\}$ again. The start set contains $s$ and is never re-entered, so there are $1 + 6 = 7$ reachable states. (Since $\{s, a_0, b_0\}$ and $\{a_0, b_0\}$ behave identically, the minimal DFA has $6$ states: a cycle counting $k \bmod 6$.)
:::
:::

::: exercise An NFA for a pattern {level=1}
Give an NFA with $4$ states over $\{a, b\}$ for the strings that contain $aba$ as a substring, and use it to explain why NFAs make substring detection easier to design than DFAs.
::: solution
States $0, 1, 2, 3$: state $0$ loops on $a$ and $b$; $0 \xrightarrow{a} 1 \xrightarrow{b} 2 \xrightarrow{a} 3$; state $3$ loops on $a$ and $b$; $F = \{3\}$. The machine guesses where the occurrence starts and then checks it letter by letter. A DFA must work out the "failure" transitions (for example, after reading $ab$ a further $b$ must send it back to the start, whereas after $a$ a further $a$ must keep it in the state "suffix $a$", since the new $a$ may begin an occurrence), which is exactly the work the subset construction does automatically.
:::
:::

::: exercise $\varepsilon$-closure {level=2}
An NFA has states $1$–$5$, $\varepsilon$-moves $1 \to 2$, $2 \to 3$, $3 \to 1$, $4 \to 5$, and moves on $a$: $1 \xrightarrow{a} 4$, $3 \xrightarrow{a} 5$, $5 \xrightarrow{a} 2$. Start state $1$, $F = \{5\}$. Compute $E(\{1\})$, $\Delta(E(\{1\}), a)$ and the full subset DFA over $\Sigma = \{a\}$. Which strings are accepted?
::: solution
$E(\{1\}) = \{1, 2, 3\}$ (the $\varepsilon$-cycle). On $a$: $\delta(1, a) \cup \delta(2,a) \cup \delta(3,a) = \{4, 5\}$, whose closure is $\{4, 5\}$. From $\{4, 5\}$ on $a$: $\{2\}$, closure $\{1, 2, 3\}$. So the DFA has two reachable states, $\{1,2,3\} \xrightarrow{a} \{4,5\} \xrightarrow{a} \{1,2,3\}$, with $\{4,5\}$ accepting. It accepts $a^k$ for odd $k$.
:::
:::

::: exercise A run-dying NFA {level=2}
Let $N$ be an NFA whose transition function never yields more than one state, and with no $\varepsilon$-moves (but $\delta(q, a) = \emptyset$ is allowed). Show that an equivalent DFA with at most $\lvert Q\rvert + 1$ states exists, and explain why this does not contradict [[#thm-blowup]].
::: solution
Every reachable subset in the subset construction has at most one element: $\{q_0\}$ is a singleton, and $\Delta(\{q\}, a) = \delta(q, a)$ has at most one element, while $\Delta(\emptyset, a) = \emptyset$. So the reachable subsets are among the $\lvert Q\rvert$ singletons and $\emptyset$, at most $\lvert Q\rvert + 1$ states; $\emptyset$ is the dead state. Such an $N$ is just a DFA with a partial transition function. [[#thm-blowup]] concerns NFAs with genuine choices — state $0$ there has two successors on $1$ — so there is no contradiction: the blow-up comes from sets with several elements.
:::
:::

::: exercise Shuffle {level=2}
The **perfect shuffle** of two strings of equal length $x = a_1 \cdots a_n$ and $y = b_1 \cdots b_n$ is $a_1 b_1 a_2 b_2 \cdots a_n b_n$. Show that if $A$ and $B$ are regular, so is $\{\text{shuffle}(x, y) : x \in A,\ y \in B,\ \lvert x\rvert = \lvert y\rvert\}$.
::: solution
Let $M_A = (Q_A, \Sigma, \delta_A, p_0, F_A)$ and $M_B = (Q_B, \Sigma, \delta_B, r_0, F_B)$ be DFAs. Build a DFA with states $Q_A \times Q_B \times \{1, 2\}$, where the third component says whose turn it is: $\delta((p, r, 1), a) = (\delta_A(p, a), r, 2)$ and $\delta((p, r, 2), a) = (p, \delta_B(r, a), 1)$. Start $(p_0, r_0, 1)$; accepting states $F_A \times F_B \times \{1\}$. By induction, after reading $a_1 b_1 \cdots a_k b_k$ the machine is in $(\hat\delta_A(p_0, a_1\cdots a_k), \hat\delta_B(r_0, b_1 \cdots b_k), 1)$, and after an odd-length prefix it is in a state with third component $2$, which is not accepting. So it accepts exactly the shuffles of equal-length $x \in A$, $y \in B$. (This one is deterministic; nondeterminism is not needed when the interleaving is fixed.)
:::
:::

::: exercise Halving {level=3}
For a language $A$, let $\tfrac12 A = \{x : xy \in A \text{ for some } y \text{ with } \lvert y\rvert = \lvert x\rvert\}$, the first halves of the strings of $A$. Prove that if $A$ is regular then so is $\tfrac12 A$.
::: solution
Let $M = (Q, \Sigma, \delta, q_0, F)$ be a DFA for $A$. We want to accept $x$ if, after $M$ reads $x$ and reaches $p = \hat\delta(q_0, x)$, there is *some* string $y$ of length $\lvert x\rvert$ leading from $p$ to $F$. Run $M$ forwards on $x$, and simultaneously run "backwards from $F$" one step per symbol of $x$: let $B_0 = F$ and $B_{k+1} = \{q : \delta(q, a) \in B_k \text{ for some } a \in \Sigma\}$, the states from which some string of length $k+1$ reaches $F$. These sets do not depend on $x$, only on its length.

Build a DFA with states $Q \times \mathcal{P}(Q)$: start $(q_0, F)$, and $\delta'((p, B), a) = (\delta(p, a), \mathrm{pre}(B))$ where $\mathrm{pre}(B) = \{q : \exists b \in \Sigma,\ \delta(q, b) \in B\}$. After reading $x$ of length $k$ it is in $(\hat\delta(q_0, x), B_k)$. Accept iff $p \in B$. Then $x$ is accepted iff $\hat\delta(q_0, x) \in B_{\lvert x\rvert}$ iff some $y$ of length $\lvert x\rvert$ leads from $\hat\delta(q_0, x)$ to $F$ iff $x \in \tfrac12 A$. The machine is finite, so $\tfrac12 A$ is regular.
:::
:::

::: exercise A smaller lower-bound family {level=3 check="16"}
(a) Using the method of [[#thm-blowup]], prove that every DFA for $L_k$ has at least $2^k$ states, *including* the requirement that each of these states is reachable (so no DFA can save states by being clever about unreachable parts). (b) Show that $2^k$ states suffice. (c) How many states does the minimal DFA for $L_4$ have? (Enter the number.)
::: solution
(a) The proof of [[#thm-blowup]] exhibits $2^k$ strings — all strings of length $k$ — that lead to pairwise different states. Those states are reachable by definition (each is reached by its string), so any DFA for $L_k$ has at least $2^k$ reachable states.

(b) Let the states be the strings of length $k$, interpreted as "the last $k$ symbols read", with shorter inputs padded on the left by $0$s: start state $0^k$, $\delta(a_1 a_2 \cdots a_k, b) = a_2 \cdots a_k b$, accepting states those with $a_1 = 1$. A padding $0$ is never accepted, which is correct because strings shorter than $k$ are not in $L_k$. By induction the state after reading $w$ is the last $k$ symbols of $0^k w$, so the DFA accepts iff the $k$-th symbol from the end of $0^kw$ is $1$, iff $\lvert w\rvert \ge k$ and the $k$-th symbol from the end of $w$ is $1$. It has $2^k$ states.

(c) For $k = 4$: at least $2^4$ by (a), at most $2^4$ by (b), so exactly $16$.
:::
:::
