Time is not the only resource an algorithm consumes. A program that runs for a week but needs only a megabyte can be left running; one that needs a petabyte of memory cannot be run at all. And memory behaves differently from time in one crucial way: **it can be reused**. Once a computation has finished with a block of memory it can write something else there, while a second spent is gone for ever. This chapter shows how far that difference goes. Problems that seem to need exponential time — deciding who wins a board game, evaluating a formula with many alternating "for all" and "there exists" quantifiers — can be solved in polynomial *space*, and nondeterminism, which seems to cost an exponential in time, costs only a square in space.

We define space complexity classes, relate them to time, and prove three central theorems: **Savitch's theorem** ($\mathsf{NSPACE}(f) \subseteq \mathsf{SPACE}(f^2)$, so $\mathsf{PSPACE} = \mathsf{NPSPACE}$), the **$\mathsf{PSPACE}$-completeness of quantified Boolean formulas**, and the **Immerman–Szelepcsényi theorem** that nondeterministic space is closed under complement. Along the way we meet the classes $\mathsf{L}$ and $\mathsf{NL}$ of problems solvable with logarithmic memory — just enough for a few pointers into the input — and show that graph reachability captures $\mathsf{NL}$ exactly.

## Measuring space

::: definition Space complexity {#def-space}
Let $M$ be a deterministic Turing machine that halts on every input. Its **space complexity** is the function $f\colon \N \to \N$ where $f(n)$ is the maximum number of tape cells $M$ scans on any input of length $n$. For a nondeterministic decider $N$, all of whose branches halt, $f(n)$ is the maximum over all branches. For a function $f$,
$$
\mathsf{SPACE}(f(n)) \text{ and } \mathsf{NSPACE}(f(n))
$$
are the classes of languages decided by deterministic, respectively nondeterministic, Turing machines using $O(f(n))$ space.
:::

To allow space *smaller* than the input, we use machines with two tapes: a **read-only input tape**, on which the head may move but not write, and a read–write **work tape**. Only work-tape cells count. For $f(n) \ge n$ this changes nothing, and for $f(n) < n$ it is the only sensible choice, since merely reading the input would otherwise cost $n$ cells.

::: definition Polynomial and logarithmic space {#def-pspace}
$$
\mathsf{PSPACE} = \bigcup_k \mathsf{SPACE}(n^k), \quad \mathsf{NPSPACE} = \bigcup_k \mathsf{NSPACE}(n^k), \quad \mathsf{L} = \mathsf{SPACE}(\log n), \quad \mathsf{NL} = \mathsf{NSPACE}(\log n).
$$
:::

Logarithmic space is enough to store a constant number of counters and pointers into the input, each of $O(\log n)$ bits, but not to copy the input or to mark which vertices of a graph have been visited.

::: example Satisfiability in linear space {#ex-sat-space}
Show that $\mathit{SAT} \in \mathsf{SPACE}(n)$ and $\{0^k1^k : k \ge 0\} \in \mathsf{L}$.
::: solution
For $\mathit{SAT}$: on input $\varphi$ with $m \le n$ variables, keep a binary counter of $m$ bits on the work tape and step it through all $2^m$ assignments. For each, evaluate $\varphi$ — this needs a little extra space to evaluate the formula in place (for example, a stack whose depth is at most the nesting depth, $O(n)$) — and accept if it is true. After each evaluation the same cells are reused. Total space $O(n)$, although the time is $2^{\Omega(m)}$.

For $0^k1^k$: scan the input once to check that no $0$ follows a $1$; then count the $0$s and the $1$s in two binary counters of $O(\log n)$ bits and compare them. The input is only read, so the work space is $O(\log n)$.
:::
:::

### Space and time

A machine using little space cannot run for very long without repeating itself. To make this precise we count its **configurations**: for a machine with a read-only input tape, a configuration is the state, the input-head position, the work-head position and the work-tape contents. (The input itself is fixed during a computation and is not part of the configuration.)

::: lemma Counting configurations {#lem-configs}
A machine with state set $Q$ and work alphabet $\Gamma$ that uses at most $f(n)$ work cells has at most $\lvert Q\rvert \cdot n \cdot f(n) \cdot \lvert\Gamma\rvert^{f(n)}$ configurations on an input of length $n$. If $f(n) \ge \log n$, this is $2^{O(f(n))}$.
:::

::: proof
The factors count the states, input-head positions, work-head positions and work-tape contents. If $f(n) \ge \log n$ then $n = 2^{\log n} \le 2^{f(n)}$, and $f(n) \le 2^{f(n)}$, so the product is at most $\lvert Q\rvert\, 2^{f(n)}\, 2^{f(n)}\, 2^{f(n)\log\lvert\Gamma\rvert} = 2^{O(f(n))}$.
:::

::: theorem Time and space {#thm-time-space}
For $f(n) \ge \log n$ and $t(n) \ge n$:
1. $\mathsf{TIME}(t(n)) \subseteq \mathsf{NTIME}(t(n)) \subseteq \mathsf{SPACE}(t(n))$;
2. $\mathsf{NSPACE}(f(n)) \subseteq \mathsf{TIME}(2^{O(f(n))})$.

Hence $\mathsf{L} \subseteq \mathsf{NL} \subseteq \mathsf{P}$ and $\mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE} \subseteq \mathsf{EXP}$.
:::

::: proof
(1) A machine scans at most one new cell per move, so a $t(n)$-time machine uses $O(t(n))$ space. For a nondeterministic $t(n)$-time machine, a deterministic machine can try all branches one after another, in the order of their choice sequences, reusing space: it stores the current choice sequence ($O(t(n))$ symbols) and the simulated tape ($O(t(n))$ cells), and erases the tape before the next branch.

(2) Let $N$ decide $L$ in nondeterministic space $f(n)$. Its **configuration graph** on input $w$ has the configurations as vertices and an edge $C \to C'$ when $C$ can yield $C'$ in one move. $N$ accepts $w$ iff an accepting configuration is reachable from the start configuration. By [[#lem-configs]] the graph has $2^{O(f(n))}$ vertices, and each edge is determined by looking at $N$'s transition function, so a deterministic machine can build it and run breadth-first search in time polynomial in its size, $2^{O(f(n))}$.

For the corollary: $\mathsf{NL} = \mathsf{NSPACE}(\log n) \subseteq \mathsf{TIME}(2^{O(\log n)}) = \mathsf{TIME}(n^{O(1)}) = \mathsf{P}$; and $\mathsf{NP} \subseteq \mathsf{PSPACE}$ by (1), $\mathsf{PSPACE} \subseteq \mathsf{EXP}$ by (2) with $f(n) = n^k$.
:::

The configuration graph is the single most useful idea in space complexity: a space-bounded computation is a reachability question in a graph that is exponentially large in the space bound but is described implicitly by the machine.

## Savitch's theorem

The simulation in [[#thm-time-space]] (2) uses breadth-first search, which must remember which configurations it has seen — exponentially many. Walter Savitch found a way to search the configuration graph using very little memory, at the price of more time.

Let $\mathrm{CANYIELD}(c_1, c_2, t)$ be the question "can configuration $c_1$ reach $c_2$ in at most $t$ moves?". If $t \le 1$ the answer can be read off from the transition function. Otherwise, $c_1$ reaches $c_2$ within $t$ moves iff there is a **midpoint** configuration $c_m$ such that $c_1$ reaches $c_m$ within $\lceil t/2\rceil$ moves and $c_m$ reaches $c_2$ within $\lfloor t/2\rfloor$ moves. Try every possible $c_m$ in turn — and *reuse the same space* for each try.

::: algorithm CANYIELD {#alg-canyield}
$\mathrm{CANYIELD}(c_1, c_2, t)$:

1. If $t \le 1$: return whether $c_1 = c_2$ or $c_1$ yields $c_2$ in one move.
2. For each configuration $c_m$ (of the given size, in some fixed order):
   1. if $\mathrm{CANYIELD}(c_1, c_m, \lceil t/2\rceil)$ and $\mathrm{CANYIELD}(c_m, c_2, \lfloor t/2\rfloor)$, return true.
3. Return false.
:::

::: theorem Savitch's theorem {#thm-savitch}
For every function $f(n) \ge \log n$ that is space constructible,
$$
\mathsf{NSPACE}(f(n)) \subseteq \mathsf{SPACE}(f(n)^2).
$$
:::

(A function $f$ is **space constructible** if some machine computes $f(n)$ in binary from $1^n$ using $O(f(n))$ space; all the usual functions — $\log n$, $n^k$, $2^n$ — are. [[complexity/hierarchies]] uses the same notion.)

::: proof
Let $N$ decide $L$ in space $f(n)$. Modify $N$ so that before accepting it erases its work tape and moves both heads to the left end; then there is a single accepting configuration $c_{\text{acc}}$. By [[#lem-configs]] there is a constant $d$ such that $N$ has at most $2^{d f(n)}$ configurations on inputs of length $n$; an accepting branch, if one exists, has an accepting path in the configuration graph without repeated configurations, hence of length at most $2^{d f(n)}$.

The deterministic machine $M$, on input $w$, computes $f(n)$ (possible in space $O(f(n))$ by constructibility) and returns $\mathrm{CANYIELD}(c_{\text{start}}, c_{\text{acc}}, 2^{d f(n)})$, implemented with a stack. *Correctness* of $\mathrm{CANYIELD}$ is by induction on $t$: a path of length at most $t$ from $c_1$ to $c_2$ passes, after $\lceil t/2\rceil$ moves (or at its end, if it is shorter), through a configuration $c_m$ that splits it into pieces of lengths at most $\lceil t/2\rceil$ and $\lfloor t/2\rfloor$; conversely, two such pieces form a path of length at most $t$.

*Space.* Each stack frame stores $c_1$, $c_2$, $t$ and the current $c_m$: configurations take $O(f(n))$ cells each (the input-head position needs $O(\log n) \le O(f(n))$ bits), and $t \le 2^{d f(n)}$ takes $O(f(n))$ bits. The parameter $t$ halves (roughly) at each level, so the recursion depth is $O(\log 2^{d f(n)}) = O(f(n))$. When a call returns, its frame is popped and the space reused. The total is $O(f(n)) \cdot O(f(n)) = O(f(n)^2)$.
:::

The constructibility assumption can be removed: if $f$ is not known, run the procedure for $f = 1, 2, 3, \dots$ in turn, testing at each stage whether $N$ can reach *any* configuration using more space. The time used is enormous — $\mathrm{CANYIELD}$ makes $2^{O(f(n))}$ recursive calls at each of $O(f(n))$ levels, for $2^{O(f(n)^2)}$ time — but time is not the resource being counted.

::: corollary PSPACE = NPSPACE {#cor-pspace-npspace}
$\mathsf{PSPACE} = \mathsf{NPSPACE}$, and $\mathsf{NL} \subseteq \mathsf{SPACE}(\log^2 n)$.
:::

::: proof
The square of a polynomial is a polynomial, so $\mathsf{NSPACE}(n^k) \subseteq \mathsf{SPACE}(n^{2k})$. For $\mathsf{NL}$, take $f(n) = \log n$.
:::

::: example Reachability with a logarithmic stack {#ex-canyield}
Run $\mathrm{CANYIELD}$ on the directed path $0 \to 1 \to \cdots \to 15$, with $t = 16$, and count the calls and the maximum recursion depth.
::: solution
```python
def can_yield(adj, u, v, t, stats, depth=1):
    """Is there a path of length <= t from u to v? Only O(log t) frames are live at once."""
    stats["calls"] += 1; stats["depth"] = max(stats["depth"], depth)
    if t <= 1:
        return u == v or v in adj[u]
    half = (t + 1) // 2
    for m in adj:                                     # try every midpoint, reusing the space
        if can_yield(adj, u, m, half, stats, depth + 1) and can_yield(adj, m, v, t - half, stats, depth + 1):
            return True
    return False

n = 16                                                # a directed path 0 -> 1 -> ... -> 15
adj = {i: {i + 1} if i + 1 < n else set() for i in range(n)}
for target in (15, 0):
    stats = {"calls": 0, "depth": 0}
    print(target, can_yield(adj, 0, target, n, stats), stats)
stats = {"calls": 0, "depth": 0}
print("15 -> 0:", can_yield(adj, 15, 0, n, stats), stats)
```

```console
$ python3 savitch.py
15 True {'calls': 47038, 'depth': 5}
0 True {'calls': 31, 'depth': 5}
15 -> 0: False {'calls': 88741, 'depth': 5}
```

The depth is $1 + \log_2 16 = 5$ in every case: at most five frames, each holding two vertex names, a length and a midpoint — $O(\log n)$ bits each, $O(\log^2 n)$ in all. But the number of calls is large: reaching vertex $15$ takes $47\,038$ calls, and proving that $15$ cannot reach $0$ takes $88\,741$, since every midpoint must be tried at every level. In general the time is $n^{O(\log n)}$: quasi-polynomial. Breadth-first search, by contrast, takes $O(n)$ time and $\Theta(n)$ space. Savitch's algorithm trades time for space.
:::
:::

::: warning Why Savitch's trick does not prove P = NP
Savitch's theorem shows that nondeterminism costs at most a square in *space*. The same midpoint recursion does not help with *time*: it tries all $2^{O(f)}$ midpoints at each of $O(f)$ levels, and the cost multiplies, giving $2^{O(f^2)}$ time. Space can be reused across the tries; time cannot. Whether $\mathsf{P} = \mathsf{NP}$ is unaffected, and so is the question whether $\mathsf{L} = \mathsf{NL}$, since $\log^2 n$ is more than $\log n$.
:::

## PSPACE-completeness

::: definition PSPACE-complete {#def-pspace-complete}
A language $B$ is **$\mathsf{PSPACE}$-complete** if $B \in \mathsf{PSPACE}$ and $A \le_p B$ for every $A \in \mathsf{PSPACE}$ (polynomial-time reductions, [[complexity/np-completeness#def-poly-reduction]]).
:::

Since $\mathsf{NP} \subseteq \mathsf{PSPACE}$, a $\mathsf{PSPACE}$-complete problem is $\mathsf{NP}$-hard and $\mathsf{coNP}$-hard; if it were in $\mathsf{P}$, then $\mathsf{P} = \mathsf{PSPACE}$. It is widely believed that $\mathsf{NP} \ne \mathsf{PSPACE}$ (open as of 2026), so $\mathsf{PSPACE}$-complete problems are believed to be harder than $\mathsf{NP}$-complete ones: not even a short certificate is expected to exist.

### Quantified Boolean formulas

::: definition TQBF {#def-tqbf}
A **fully quantified Boolean formula** has the form $Q_1 x_1\, Q_2 x_2 \cdots Q_k x_k\ \psi$ where each $Q_i$ is $\exists$ or $\forall$, the $x_i$ range over $\{0, 1\}$, and $\psi$ is a Boolean formula over $x_1, \dots, x_k$. It is either true or false. $\mathit{TQBF}$ is the language of true fully quantified Boolean formulas.
:::

$\mathit{SAT}$ is the special case in which every quantifier is $\exists$, and $\mathit{TAUT}$ the case in which every one is $\forall$. Alternation makes the problem look like a **game**: an $\exists$-player chooses values for the $\exists$-variables, a $\forall$-player for the $\forall$-variables, in order, and the $\exists$-player wins if $\psi$ comes out true. The formula is true iff the $\exists$-player has a winning strategy.

::: theorem TQBF is PSPACE-complete {#thm-tqbf}
$\mathit{TQBF}$ is $\mathsf{PSPACE}$-complete.
:::

::: proof
*$\mathit{TQBF} \in \mathsf{PSPACE}$.* Evaluate recursively: for $\exists x\,\Phi$, evaluate $\Phi$ with $x = 0$ and then with $x = 1$, and return the "or"; for $\forall x\,\Phi$, return the "and"; with no quantifiers left, evaluate $\psi$. The recursion depth is the number of variables $k$, and each frame stores one bit and a position; the second evaluation reuses the space of the first. Space $O(n)$.

*Hardness.* Let $A$ be decided by a deterministic machine $M$ in space $n^k$; by [[#lem-configs]] $M$ has at most $2^{d n^k}$ configurations for some constant $d$, so it halts within $T = 2^{d n^k}$ moves. Fix an input $w$ of length $n$. As in the Cook–Levin proof ([[complexity/np-completeness#thm-cook-levin]]), a configuration is a row of $O(n^k)$ cells, and we represent it by a block of $O(n^k)$ Boolean variables saying which symbol is in which cell. For blocks $c_1, c_2$ of variables and $t \ge 1$, we build a quantified formula $\varphi_{c_1, c_2, t}$, with free variables $c_1, c_2$, that is true iff $c_1$ and $c_2$ encode configurations and $c_1$ can reach $c_2$ in at most $t$ moves.

- $t = 1$: $\varphi_{c_1, c_2, 1}$ says that $c_1$ and $c_2$ are well-formed configurations and either $c_1 = c_2$ (all corresponding variables equal) or every $2 \times 3$ window of $c_1$ over $c_2$ is legal. By [[complexity/np-completeness#lem-windows]] this expresses "$c_1$ yields $c_2$", and the formula has size $O(n^k)$.
- $t > 1$: the obvious recursion $\exists m\,(\varphi_{c_1, m, \lceil t/2\rceil} \land \varphi_{m, c_2, \lceil t/2\rceil})$ is correct but doubles the size at every level — $O(T) = 2^{O(n^k)}$ in all. The trick is to use one copy of the subformula for both halves, with a universal quantifier choosing which half it checks:
$$
\varphi_{c_1, c_2, t} = \exists m\ \forall c_3\, \forall c_4\ \Bigl[\bigl((c_3 = c_1 \land c_4 = m) \lor (c_3 = m \land c_4 = c_2)\bigr) \to \varphi_{c_3, c_4, \lceil t/2\rceil}\Bigr].
$$ {#eq-tqbf-step}

Here $\exists m$ and $\forall c_3$ abbreviate quantifiers over every variable of the block, and $c_3 = c_1$ is the conjunction of $x \leftrightarrow y$ over corresponding variables. The formula says: there is a midpoint $m$ such that, for both pairs $(c_3, c_4) = (c_1, m)$ and $(m, c_2)$, $c_3$ reaches $c_4$ in $\lceil t/2\rceil$ moves — exactly the midpoint condition of [[#alg-canyield]]. (Pairs $(c_3, c_4)$ not of these two forms make the implication true.)

*Size.* Each level adds $O(n^k)$ symbols (the quantified blocks and the equalities) and has one copy of the next level. There are $\lceil\log_2 T\rceil = O(n^k)$ levels, so $\varphi_{c_1, c_2, T}$ has size $O(n^{2k})$, and it is written by a simple recursive procedure in polynomial time.

Finally, output $\varphi_w = \varphi_{c_{\text{start}}, c_{\text{acc}}, T}$ with the variables of $c_{\text{start}}$ fixed to the start configuration on $w$ and those of $c_{\text{acc}}$ to the (unique, after the modification in the proof of [[#thm-savitch]]) accepting configuration. Moving all quantifiers to the front (renaming bound variables apart) gives a fully quantified formula, true iff $M$ accepts $w$.
:::

The proof never used that $M$ is deterministic: the same formula works for a nondeterministic machine, which gives a second proof that $\mathsf{NPSPACE} \subseteq \mathsf{PSPACE}$. The universal quantifier in [[#eq-tqbf-step]] is what keeps the formula short; with only existential quantifiers we would be back at the Cook–Levin construction, which needs one row per time step.

::: example Evaluating a quantified formula {#ex-qbf}
Decide $\forall x_1\, \exists x_2\ (x_1 \lor x_2) \land (\overline{x_1} \lor \overline{x_2})$ and $\exists x_1\, \forall x_2\ (x_1 \lor x_2) \land (\overline{x_1} \lor \overline{x_2})$.
::: solution
The matrix says $x_1 \ne x_2$. In the first formula, whatever $x_1$ the $\forall$-player picks, the $\exists$-player answers $x_2 = \overline{x_1}$: true. In the second, the $\exists$-player must commit to $x_1$ first, and the $\forall$-player then picks $x_2 = x_1$: false. The order of quantifiers matters, as in $\forall x\, \exists y\, (y > x)$ versus $\exists y\, \forall x\, (y > x)$ over the integers.

```python
def qbf(prefix, matrix, assignment=()):
    """prefix: string of 'E'/'A', one per variable x1, x2, ...; matrix: CNF over them.
    Depth-first evaluation: space for one path of the game tree, time 2^n."""
    i = len(assignment)
    if i == len(prefix):
        return all(any((l > 0) == assignment[abs(l) - 1] for l in c) for c in matrix)
    branches = (qbf(prefix, matrix, assignment + (b,)) for b in (False, True))
    return any(branches) if prefix[i] == "E" else all(branches)

phi = [[1, 2], [-1, -2]]                  # (x1 v x2) & (~x1 v ~x2): "x1 differs from x2"
print(qbf("AE", phi), qbf("EA", phi))     # forall x1 exists x2 ... ; exists x1 forall x2 ...
```

```console
$ python3 qbf.py
True False
```
:::
:::

### Games

Many two-player games of perfect information, generalised to boards of size $n$, are $\mathsf{PSPACE}$-complete when the number of moves in a game is bounded by a polynomial — the game tree has polynomial depth, so it can be searched depth first in polynomial space, and $\mathit{TQBF}$ reduces to them. Examples are **generalised geography** (players alternately extend a simple path in a directed graph; whoever cannot move loses; Schaefer, 1978) and **Hex** on $n \times n$ boards (Reisch, 1981). Games in which a position can last exponentially many moves can be harder: generalised chess (Fraenkel and Lichtenstein, 1981) and Go with Japanese ko rules (Robson, 1983) are $\mathsf{EXP}$-complete, and therefore provably not in $\mathsf{P}$ ([[complexity/hierarchies]]).

::: quiz
Which of the following are known to be true?
- [x] $\mathsf{NP} \subseteq \mathsf{PSPACE}$
- [x] $\mathsf{NPSPACE} = \mathsf{PSPACE}$
- [ ] $\mathsf{PSPACE} = \mathsf{P}$
- [x] If $\mathit{TQBF} \in \mathsf{NP}$, then $\mathsf{NP} = \mathsf{PSPACE}$.
::: solution
$\mathsf{NP} \subseteq \mathsf{PSPACE}$ by [[#thm-time-space]], and $\mathsf{NPSPACE} = \mathsf{PSPACE}$ by Savitch. Whether $\mathsf{P} = \mathsf{PSPACE}$ is open (it is believed false). If the $\mathsf{PSPACE}$-complete $\mathit{TQBF}$ were in $\mathsf{NP}$, every $A \in \mathsf{PSPACE}$ would reduce to it and be in $\mathsf{NP}$ by [[complexity/np-completeness#thm-reduction-p]] (2).
:::
:::

## Logarithmic space

### Log-space reductions and NL-completeness

Every problem in $\mathsf{NL}$ is in $\mathsf{P}$, so polynomial-time reductions are useless for comparing problems inside $\mathsf{NL}$: the reduction could solve the problem itself. We need weaker reductions.

::: definition Log-space reduction {#def-logspace-reduction}
A **log-space transducer** is a Turing machine with a read-only input tape, a work tape of $O(\log n)$ cells, and a write-only output tape on which the head moves only to the right. A function computed by such a machine is **log-space computable**. $A \le_L B$ if $A$ reduces to $B$ by a log-space computable function. $B$ is **$\mathsf{NL}$-complete** if $B \in \mathsf{NL}$ and $A \le_L B$ for every $A \in \mathsf{NL}$.
:::

A log-space transducer has polynomially many configurations ([[#lem-configs]]) and halts, so it runs in polynomial time and its output has polynomial length — which may be much longer than its work tape.

::: lemma Composing log-space reductions {#lem-logspace-compose}
If $A \le_L B$ and $B \in \mathsf{L}$, then $A \in \mathsf{L}$. If $A \le_L B$ and $B \le_L C$, then $A \le_L C$.
:::

::: proof
Let $f$ be computed by a log-space transducer $T$, and let $M$ decide $B$ in log space. We cannot write $f(w)$ down: it may have polynomial length. Instead, simulate $M$ on $f(w)$ and keep only the *position* $i$ of $M$'s input head, in $O(\log n)$ bits. Whenever $M$ needs the $i$-th symbol of $f(w)$, run $T$ on $w$ from the beginning, discarding its output but counting the symbols it writes, until it writes the $i$-th one. Each recomputation uses $T$'s $O(\log n)$ work space, which is reused; $M$'s own work space is $O(\log\lvert f(w)\rvert) = O(\log n)$. The second claim is the same construction with $M$ replaced by a transducer for $B \le_L C$.
:::

::: theorem PATH is NL-complete {#thm-path-nl}
$\mathit{PATH} = \{\langle G, s, t\rangle : $ the directed graph $G$ has a path from $s$ to $t\}$ is $\mathsf{NL}$-complete.
:::

::: proof
*$\mathit{PATH} \in \mathsf{NL}$.* Keep the current vertex $v$ (initially $s$) and a step counter on the work tape. Repeat at most $n$ times: if $v = t$, accept; otherwise nondeterministically choose a vertex $u$, check in the input that $(v, u)$ is an edge (reject this branch if not), and set $v \gets u$. After $n$ steps, reject. Some branch accepts iff a path exists (a path, if any, has at most $n - 1$ edges). The work tape holds two vertex names and a counter: $O(\log n)$ bits.

*Hardness.* Let $A$ be decided by a log-space nondeterministic machine $N$, modified to have a unique accepting configuration. Map $w$ to $\langle G, c_{\text{start}}, c_{\text{acc}}\rangle$ where $G$ is the configuration graph of $N$ on $w$. Then $w \in A$ iff $c_{\text{acc}}$ is reachable from $c_{\text{start}}$. A log-space transducer can output $G$: each configuration is a string of $O(\log n)$ bits, so it can loop over all pairs $(c, c')$ of such strings, using $O(\log n)$ work space for the pair, and output the edge $(c, c')$ whenever $c$ yields $c'$ — which it checks by looking at the input symbol under $c$'s input head and at $N$'s transition table.
:::

So $\mathit{PATH} \in \mathsf{L}$ iff $\mathsf{L} = \mathsf{NL}$. As of 2026 this is open. For **undirected** graphs the answer is known: Omer Reingold proved in 2005 that undirected reachability is in $\mathsf{L}$, using expander graphs to make the graph "look small" to a deterministic walk. Other $\mathsf{NL}$-complete problems include $\mathit{2SAT}$'s complement ([[#ex-2sat-nl]]) and the emptiness problem for NFAs.

::: widget graph
nodes: s@0,1; a@1.5,2; b@1.5,0; c@3,2; d@3,0; t@4.5,1; e@4.5,2.6
edges: s>a; s>b; a>c; b>d; d>c; c>e; e>a; d>t
algorithm: bfs
start: s
caption: A configuration graph in miniature: $\mathit{PATH}$ asks whether $t$ is reachable from $s$. Breadth-first search (step through it) answers in linear time but marks every visited vertex — linear space. A nondeterministic log-space machine instead guesses the path $s, b, d, t$ one vertex at a time, remembering only the current vertex and a counter. To *refute* reachability in log space — say, of $s$ from $t$ — it must count, as in the Immerman–Szelepcsényi theorem below. Change `start` to `t`: nothing is reachable from it.
:::

### Nondeterministic space is closed under complement

For time, we do not know whether $\mathsf{NP} = \mathsf{coNP}$ and believe not. For space the answer is known, and surprising.

::: theorem Immerman–Szelepcsényi theorem {#thm-immerman}
For every space-constructible $s(n) \ge \log n$, $\mathsf{NSPACE}(s(n)) = \mathsf{coNSPACE}(s(n))$. In particular $\mathsf{NL} = \mathsf{coNL}$.
:::

It is enough to show that $\overline{\mathit{PATH}}$ — "there is **no** path from $s$ to $t$" — is in $\mathsf{NL}$: then for any $A \in \mathsf{NL}$, $\overline{A} \le_L \overline{\mathit{PATH}}$ by the reduction of [[#thm-path-nl]] (it maps $w \notin A$ to an instance without a path), and $\overline{A} \in \mathsf{NL}$ by the nondeterministic version of [[#lem-logspace-compose]]. For general $s(n)$, apply the same argument to configuration graphs with $2^{O(s(n))}$ vertices.

What must a nondeterministic machine do to *accept* when no path exists? It cannot guess a short certificate of non-reachability directly. The idea is **inductive counting**: if the machine knows the *number* $c$ of vertices reachable from $s$, it can certify non-reachability of $t$ by exhibiting $c$ vertices that are reachable — each with a guessed path — none of which is $t$. And the number $c$ can itself be computed nondeterministically, layer by layer.

Precisely: let $R_i$ be the set of vertices reachable from $s$ by a path of at most $i$ edges, and $c_i = \lvert R_i\rvert$. So $R_0 = \{s\}$, $c_0 = 1$, and $R_{n-1}$ is the set of all vertices reachable from $s$. We say that a nondeterministic machine **computes** a value if every branch either rejects or halts with the correct value, and at least one branch halts with it.

::: lemma Inductive counting {#lem-inductive-counting}
Given $\langle G, s\rangle$, $i$ and the correct value $c_i$, a nondeterministic machine can compute $c_{i+1}$ in space $O(\log n)$.
:::

::: proof
The machine keeps a counter $c$ (initially $0$) and runs through all vertices $v$, deciding for each whether $v \in R_{i+1}$; if so, it increments $c$. At the end it outputs $c$. To decide one $v$:

- Set a counter $d \gets 0$ and a flag $\mathit{in} \gets$ false. For each vertex $u$ in turn: nondeterministically guess whether $u \in R_i$. If the guess is "yes", *verify* it by guessing a path of at most $i$ edges from $s$ to $u$, one vertex at a time as in [[#thm-path-nl]]; if the guessed path fails, **reject** (this branch dies). If verified, increment $d$, and if $u = v$ or $(u, v)$ is an edge, set $\mathit{in} \gets$ true.
- After all $u$: if $d \ne c_i$, **reject**. Otherwise $v \in R_{i+1}$ iff $\mathit{in}$ is true.

*Correctness.* On a branch that does not reject, every $u$ counted in $d$ was verified to be in $R_i$, and $d = c_i = \lvert R_i\rvert$, so the branch guessed "yes" for *every* member of $R_i$. Hence $\mathit{in}$ is true iff some $u \in R_i$ equals $v$ or has an edge to $v$, i.e. iff $v \in R_{i+1}$. So every surviving branch reaches the correct decision for every $v$, and the final count is $c_{i+1}$. A branch that always guesses correctly and guesses valid paths survives, so at least one branch outputs $c_{i+1}$.

*Space.* The machine stores $i$, $c_i$, $c$, $v$, $d$, $u$, $\mathit{in}$, and the current vertex and step count of a guessed path: a constant number of $O(\log n)$-bit values, reused across iterations.
:::

::: proof of the Immerman–Szelepcsényi theorem
An $\mathsf{NL}$ machine for $\overline{\mathit{PATH}}$ on $\langle G, s, t\rangle$: start with $c_0 = 1$ and apply [[#lem-inductive-counting]] $n - 1$ times, keeping only the current count, to obtain $c = c_{n-1} = \lvert R_{n-1}\rvert$ on every surviving branch. Then run through all vertices $u$ once more, guessing for each whether it is reachable and verifying each "yes" with a guessed path of at most $n - 1$ edges (reject if a verification fails, and reject if a verified $u$ equals $t$); count the verified vertices. If the count equals $c$, **accept**; otherwise reject.

If $t$ is not reachable, the branch that guesses everything correctly verifies exactly the $c$ reachable vertices, none of which is $t$, and accepts. If $t$ is reachable, an accepting branch would have verified $c$ distinct reachable vertices none equal to $t$ — but there are only $c$ reachable vertices and $t$ is one of them, so at most $c - 1$ vertices can be verified without verifying $t$: no branch accepts. The space is $O(\log n)$ throughout.
:::

::: example Counting the reachable vertices {#ex-inductive-counting}
For the graph with vertices $1, \dots, 6$, edges $1 \to 2$, $2 \to 3$, $1 \to 4$, $4 \to 3$, $3 \to 5$, $6 \to 1$, and $s = 1$, compute the counts $c_0, \dots, c_5$ and explain how the machine certifies that $6$ is not reachable from $1$.
::: solution
$R_0 = \{1\}$, $c_0 = 1$. $R_1 = \{1, 2, 4\}$, $c_1 = 3$. $R_2 = \{1, 2, 4, 3\}$ ($3$ via $2$ or $4$), $c_2 = 4$. $R_3 = R_2 \cup \{5\}$, $c_3 = 5$. Then $c_4 = c_5 = 5$. To compute, say, $c_2$ from $c_1 = 3$, the machine tests each $v$: for $v = 3$ it must exhibit three verified members of $R_1$ (it can only do so by finding $1$, $2$ and $4$ with paths of length $\le 1$), and sees the edge $2 \to 3$, so $3 \in R_2$; for $v = 5$, after verifying the same three vertices it finds no edge into $5$, and since it has accounted for all $c_1 = 3$ members of $R_1$, it concludes $5 \notin R_2$. In the final pass it verifies five reachable vertices $1, 2, 3, 4, 5$ — none is $6$ — and, since $c_5 = 5$, accepts: $6$ is not reachable. Vertex $6$ has an edge *to* $1$, which is irrelevant; only edges out of reachable vertices matter.
:::
:::

The theorem has an elegant corollary in automata theory: the complement of a context-sensitive language (a language decided by a linear-bounded automaton, i.e. in $\mathsf{NSPACE}(n)$) is context-sensitive — the "second LBA problem", open since 1964 and settled by this theorem. The "first LBA problem", whether $\mathsf{NSPACE}(n) = \mathsf{SPACE}(n)$, is still open.

The known relationships are
$$
\mathsf{L} \subseteq \mathsf{NL} = \mathsf{coNL} \subseteq \mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE} = \mathsf{NPSPACE} \subseteq \mathsf{EXP}.
$$
By the space hierarchy theorem of [[complexity/hierarchies]], $\mathsf{NL} \subsetneq \mathsf{PSPACE}$, so at least one of the inclusions between them is strict; as of 2026 none of them individually is known to be strict.

::: history
Space complexity classes and the first space hierarchy results were introduced by Philip Lewis, Richard Stearns and Juris Hartmanis in 1965. Walter Savitch proved his theorem in "Relationships between nondeterministic and deterministic tape complexities" (*Journal of Computer and System Sciences*, 1970). Larry Stockmeyer and Albert Meyer showed that quantified Boolean formulas are $\mathsf{PSPACE}$-complete in 1973. Neil Jones introduced log-space reductions and $\mathsf{NL}$-completeness in 1975. Neil Immerman (1988) and Róbert Szelepcsényi (1987, journal version 1988) proved independently that nondeterministic space is closed under complement, answering the second LBA problem posed by S.-Y. Kuroda in 1964; they shared the Gödel Prize in 1995. Omer Reingold's proof that undirected reachability is in deterministic log space was presented in 2005 and published in 2008, and received the Gödel Prize in 2009.
:::

## Where this leads

The hierarchy theorems of [[complexity/hierarchies]] show that more space gives more power ($\mathsf{L} \ne \mathsf{PSPACE}$), and alternating quantifiers, which made $\mathit{TQBF}$ hard, return there in the polynomial hierarchy: bounding the number of quantifier alternations gives classes between $\mathsf{NP}$ and $\mathsf{PSPACE}$. Interactive proofs — a polynomial-time randomised verifier talking to an all-powerful prover — turn out to capture exactly $\mathsf{PSPACE}$ (Shamir, 1992; see [[complexity/randomised-complexity]]). In practice, model checking of concurrent programs and planning problems ([[artificial-intelligence]]) are typically $\mathsf{PSPACE}$-complete, which is why their tools search state spaces cleverly rather than exhaustively.

::: summary
- Space counts work-tape cells; with a read-only input tape, sublinear space such as $\log n$ makes sense ([[#def-space]], [[#def-pspace]]).
- A machine using space $f \ge \log n$ has $2^{O(f)}$ configurations ([[#lem-configs]]), so $\mathsf{NSPACE}(f) \subseteq \mathsf{TIME}(2^{O(f)})$, and $\mathsf{L} \subseteq \mathsf{NL} \subseteq \mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE} \subseteq \mathsf{EXP}$ ([[#thm-time-space]]).
- **Savitch**: $\mathsf{NSPACE}(f) \subseteq \mathsf{SPACE}(f^2)$ by recursive midpoint search reusing space ([[#thm-savitch]]); hence $\mathsf{PSPACE} = \mathsf{NPSPACE}$.
- **$\mathit{TQBF}$ is $\mathsf{PSPACE}$-complete** ([[#thm-tqbf]]): a universal quantifier lets one copy of the "reach in $t/2$ steps" formula serve both halves; many polynomial-length games are $\mathsf{PSPACE}$-complete.
- **$\mathit{PATH}$ is $\mathsf{NL}$-complete** under log-space reductions ([[#thm-path-nl]]); undirected reachability is in $\mathsf{L}$ (Reingold).
- **Immerman–Szelepcsényi**: $\mathsf{NL} = \mathsf{coNL}$, by nondeterministically counting the vertices reachable within $i$ steps ([[#thm-immerman]], [[#lem-inductive-counting]]). Whether $\mathsf{L} = \mathsf{NL}$, $\mathsf{P} = \mathsf{PSPACE}$ or $\mathsf{NP} = \mathsf{PSPACE}$ is open.
:::

## Exercises

::: exercise Counting configurations {level=1 check="16200"}
Using the bound of [[#lem-configs]], how many configurations can a machine with $\lvert Q\rvert = 5$ states and work alphabet of size $\lvert\Gamma\rvert = 3$ have on an input of length $n = 10$ if it uses $f(n) = 4$ work cells? (Enter the number.)
::: solution
$\lvert Q\rvert \cdot n \cdot f(n) \cdot \lvert\Gamma\rvert^{f(n)} = 5 \cdot 10 \cdot 4 \cdot 3^4 = 200 \cdot 81 = 16\,200$.
:::
:::

::: exercise Depth of the Savitch recursion {level=1 check="20"}
How many levels of recursion below the top call does $\mathrm{CANYIELD}(c_1, c_2, t)$ have for $t = 2^{20}$? (Enter the number.)
::: solution
Each level halves $t$: $2^{20} \to 2^{19} \to \cdots \to 2^0 = 1$, which is $20$ halvings, so $20$ levels below the top call (the example's depth count of $5$ for $t = 16 = 2^4$ includes the top call).
:::
:::

::: exercise True or false? {level=1}
Evaluate: (a) $\exists x\, \forall y\ (x \lor y)$; (b) $\forall y\, \exists x\ (x \land y) \lor (\overline{x} \land \overline{y})$; (c) $\exists x\, \forall y\ (x \land y) \lor (\overline{x} \land \overline{y})$.
::: solution
(a) True: take $x = 1$. (b) The matrix says $x = y$; for each $y$ take $x = y$: true. (c) $x$ must equal both $y = 0$ and $y = 1$: false.
:::
:::

::: exercise NP and coNP inside PSPACE {level=2}
Show directly, without [[#thm-time-space]], that $\mathsf{NP} \subseteq \mathsf{PSPACE}$ and $\mathsf{coNP} \subseteq \mathsf{PSPACE}$, using verifiers.
::: solution
Let $V$ verify $L \in \mathsf{NP}$ in time $p(n)$, with certificates of length at most $p(n)$. On input $w$, loop through all strings $c$ of length at most $p(n)$ in shortlex order, reusing one $p(n)$-cell buffer, and run $V$ on $\langle w, c\rangle$ (which uses at most $p(n)$ further cells, erased afterwards); accept if some run accepts. The space is $O(p(n))$. $\mathsf{PSPACE}$ is closed under complement (a deterministic decider can swap its answers), so $\mathsf{coNP} \subseteq \mathsf{PSPACE}$ too.
:::
:::

::: exercise A log-space algorithm {level=2}
Show that the language of balanced strings of brackets over $\{(, )\}$ is in $\mathsf{L}$. Is the language of balanced strings with two kinds of brackets, $\{(, ), [, ]\}$, also in $\mathsf{L}$?
::: solution
With one kind: scan left to right keeping a counter of (open − close), $O(\log n)$ bits; reject if it ever becomes negative; accept iff it is $0$ at the end. With two kinds a single counter is not enough, but log space still suffices: the string is balanced iff (i) it is balanced when both kinds are treated as one, and (ii) for every position $i$ holding a closing bracket, the opening bracket that matches it has the same kind. For (ii), from position $i$ scan leftwards with a depth counter starting at $0$: a closing bracket increments it; an opening bracket is the match if the counter is $0$, and otherwise decrements it. Compare the kind of the match with the kind at $i$. This uses a constant number of $O(\log n)$-bit counters and positions.
:::
:::

::: exercise 2SAT in NL {#ex-2sat-nl level=2}
Show that $\overline{\mathit{2SAT}}$ (unsatisfiable 2CNF formulas) is in $\mathsf{NL}$, and conclude that $\mathit{2SAT} \in \mathsf{NL}$.
::: solution
By [[complexity/coping-with-hardness#thm-2sat]], $\varphi$ is unsatisfiable iff for some variable $x$ the implication graph has paths $x \leadsto \overline{x}$ and $\overline{x} \leadsto x$. A nondeterministic log-space machine guesses $x$, then guesses the first path vertex by vertex (as in [[#thm-path-nl]]), then the second. Edges of the implication graph can be checked directly against the clauses on the input tape, so the graph is never written down. Hence $\overline{\mathit{2SAT}} \in \mathsf{NL}$, and $\mathit{2SAT} \in \mathsf{coNL} = \mathsf{NL}$ by Immerman–Szelepcsényi. ($\overline{\mathit{2SAT}}$ is in fact $\mathsf{NL}$-complete.)
:::
:::

::: exercise The naive recursion is too long {level=3}
Let $s(t)$ be the size of the formula $\varphi_{c_1, c_2, t}$ in the proof of [[#thm-tqbf]] if the recursion were $\exists m\,(\varphi_{c_1, m, t/2} \land \varphi_{m, c_2, t/2})$ instead of [[#eq-tqbf-step]], with $s(1) = a$ and an additional $b$ symbols per level, where $a$ and $b$ are $\Theta(n^k)$. Solve the recurrence for $t$ a power of $2$, and compare with the actual construction.
::: solution
The naive recurrence is $s(t) = 2s(t/2) + b$, $s(1) = a$, so $s(t) = at + b(t - 1) = \Theta(n^k t)$. With $t = T = 2^{dn^k}$ this is exponential — no better than writing out a computation history. The construction with a universal quantifier has $s(t) = s(t/2) + b'$ with $b' = \Theta(n^k)$, so $s(T) = a + b'\log_2 T = O(n^k + n^k \cdot dn^k) = O(n^{2k})$. The single copy is possible because a universally quantified formula is true only if its body holds for *both* pairs $(c_1, m)$ and $(m, c_2)$.
:::
:::

::: exercise Generalised geography is in PSPACE {level=3}
In **generalised geography** the input is a directed graph $G$ and a start vertex $b$. Player I starts at $b$; players alternately move along an edge from the current vertex to a vertex not yet visited; a player who cannot move loses. Show that deciding whether Player I has a winning strategy is in $\mathsf{PSPACE}$, and implement the decision procedure.
::: solution
A game lasts at most $n$ moves (each visits a new vertex). Define $\mathrm{WIN}(v, \mathit{visited})$, "the player to move from $v$ wins", as true iff some edge $v \to u$ with $u \notin \mathit{visited}$ has $\mathrm{WIN}(u, \mathit{visited} \cup \{u\})$ false. Evaluate depth first. The recursion depth is at most $n$, and each frame stores a vertex and an iterator, while $\mathit{visited}$ is a single shared set of $n$ bits updated on the way down and restored on the way up: $O(n \log n)$ space in all. Player I, who moves first from $b$, wins iff $\mathrm{WIN}(b, \{b\})$ is true.

```python
def wins(adj, v, visited):
    """True iff the player about to move from v wins (normal play, no revisits)."""
    for u in adj.get(v, []):
        if u not in visited:
            visited.add(u)
            opponent_wins = wins(adj, u, visited)
            visited.remove(u)                 # restore: space is reused
            if not opponent_wins:
                return True
    return False

G = {1: [2, 3], 2: [4], 3: [4], 4: [5], 5: []}
P = {1: [2], 2: [3], 3: []}
print(wins(G, 1, {1}), wins(P, 1, {1}))
```

```console
$ python3 geography.py
True False
```

In $G$, Player I moves $1 \to 2$ (or $1 \to 3$), Player II must move to $4$, Player I moves to $5$, and Player II is stuck: `wins(G, 5)` is false, so `wins(G, 4)` is true, `wins(G, 2)` and `wins(G, 3)` are false, and `wins(G, 1)` is true. On the path $1 \to 2 \to 3$, Player I moves to $2$, Player II to $3$, and Player I is stuck. $\mathsf{PSPACE}$-hardness (Schaefer, 1978) is proved by a reduction from $\mathit{TQBF}$ in which each variable becomes a diamond whose two sides represent its two values, chosen by the player who owns the quantifier.
:::
:::
