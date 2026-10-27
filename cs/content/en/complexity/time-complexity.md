Suppose you must schedule 60 university exams so that no student has two at once, and you decide to try every assignment of exams to 10 time slots. There are $10^{60}$ assignments. A computer that checks a billion of them per second needs about $3 \times 10^{43}$ years, far longer than the age of the universe. Now suppose instead you must sort the 60 exam codes: any sorting algorithm finishes in microseconds. Both problems are *decidable*, so [[theory-of-computation]] has nothing to say about the difference between them, yet one is easy and the other — as far as anyone knows — is hopeless at scale.

**Computational complexity** is the study of this difference. It asks not *whether* a problem can be solved by an algorithm, but *how much* time, memory, randomness or other resource every algorithm for it needs. Its central organising idea is a **complexity class**: the set of all problems that can be solved within a given resource bound. This first chapter fixes the yardstick. We measure time on Turing machines, see how the measurement depends — and, more importantly, does *not* depend — on the details of the model, and define the class $\mathsf{P}$ of problems solvable in polynomial time, which complexity theory takes as its formal stand-in for "efficiently solvable". The rest of the course is largely about problems that seem to lie outside it.

## Measuring running time

We work with deciders, as in [[theory-of-computation/turing-machines#def-recognisable]]: a problem is a language $L \subseteq \Sigma^*$, and an algorithm for it is a Turing machine that halts on every input and accepts exactly the strings of $L$. Time is the number of moves.

::: definition Running time {#def-running-time}
Let $M$ be a deterministic Turing machine that halts on every input. The **running time** (or **time complexity**) of $M$ is the function $t\colon \N \to \N$ where $t(n)$ is the *maximum* number of moves $M$ makes on any input of length $n$. We say $M$ **runs in time** $t(n)$, and that $M$ is a $t(n)$-**time** machine.
:::

Three choices are built into this definition. First, it is **worst-case**: one bad input of length $n$ is enough to make $t(n)$ large. Average-case complexity exists, but it needs a probability distribution on inputs, and a worst-case guarantee is what lets us compose algorithms safely. Second, time is a function of the **input length** $n$, not of the "value" of the input; we return to this in [[#sec-encoding]]. Third, we usually care only about the **growth rate** of $t$, written with the asymptotic notation of [[data-structures/asymptotic-analysis#def-asymptotic]]: a machine that makes $3n^2 + 7n + 4$ moves runs in time $O(n^2)$.

::: definition Time complexity class {#def-time}
For a function $t\colon \N \to \R^+$, the **time complexity class** $\mathsf{TIME}(t(n))$ is the set of languages decided by some $O(t(n))$-time deterministic multitape Turing machine.
:::

The $O(\cdot)$ inside the definition matters: by a "linear speed-up" argument (enlarge the tape alphabet so that one cell holds several old cells) constant factors can always be removed, so it would make little sense to distinguish $\mathsf{TIME}(n^2)$ from $\mathsf{TIME}(5n^2)$. We also use **multitape** machines in the definition. As we are about to see, the number of tapes does change running times, but only polynomially.

### One problem, three running times

Consider $A = \{0^k 1^k : k \ge 0\}$. On a single-tape machine the obvious method is to match symbols in pairs.

::: algorithm Zig-zag matching {#alg-zigzag}
On input $w$:

1. Scan the tape; **reject** if a $0$ appears to the right of a $1$.
2. While both $0$s and $1$s remain uncrossed: cross off the leftmost uncrossed $0$, travel right to the leftmost uncrossed $1$, cross it off, and return to the left end.
3. **Accept** if no uncrossed symbol is left; otherwise **reject**.
:::

Stage 1 takes $O(n)$ moves. Each iteration of stage 2 crosses off two symbols and travels across the tape and back, at most $2n$ moves, and there are at most $n/2$ iterations: $O(n^2)$ in all. So $A \in \mathsf{TIME}(n^2)$. We can do better by crossing off half of the remaining symbols in each sweep.

::: algorithm Halving {#alg-halving}
On input $w$:

1. Scan the tape; **reject** if a $0$ appears to the right of a $1$.
2. While both $0$s and $1$s remain uncrossed:
   1. scan the tape; if the total number of uncrossed symbols is odd, **reject**;
   2. scan again, crossing off every other uncrossed $0$, starting with the first, and every other uncrossed $1$, starting with the first.
3. **Accept** if no uncrossed symbol remains; otherwise **reject**.
:::

::: theorem Halving decides $A$ in $O(n \log n)$ time {#thm-halving}
[[#alg-halving]] decides $A = \{0^k1^k\}$ on a single-tape Turing machine in time $O(n \log n)$.
:::

::: proof
*Time.* Each sweep in stage 2 takes $O(n)$ moves. If $z \ge 1$ zeros are uncrossed before stage 2b, then $\lfloor z/2\rfloor$ remain after it, so the number of uncrossed zeros at least halves in each iteration, and the same holds for ones. The loop stops when either count reaches $0$, so it runs at most $1 + \log_2 n$ times. The total is $O(n) + O(n)\cdot O(\log n) = O(n \log n)$.

*Correctness.* If stage 1 rejects, $w \notin A$. Otherwise $w = 0^z1^o$; write $z$ and $o$ in binary. Crossing off every other symbol starting with the first replaces a count $c$ by $\lfloor c/2\rfloor$, which deletes the lowest bit of $c$. Stage 2a tests whether $z + o$ is odd, that is, whether the current lowest bits of $z$ and $o$ differ. So the $i$-th iteration compares bit $i$ of $z$ with bit $i$ of $o$, and rejects if they differ. If $z = o$, every comparison succeeds, both counts reach $0$ in the same iteration, and stage 3 accepts. If $z \ne o$, they differ in some bit. Either the loop reaches that bit while both counts are still non-zero and rejects there, or one count becomes $0$ first — then the other is still non-zero (all lower bits agreed, so the counts differ in a higher bit), and stage 3 rejects.
:::

::: example Halving on $0^6 1^6$ and on $0^{12} 1^4$ {#ex-halving}
Trace the counts of uncrossed symbols through [[#alg-halving]] for the inputs $0^61^6$ and $0^{12}1^4$.
::: solution
For $0^61^6$: before the first iteration $(z, o) = (6, 6)$, the total $12$ is even, and crossing off every other symbol leaves $(3, 3)$; the total $6$ is even, leaving $(1, 1)$; the total $2$ is even, leaving $(0, 0)$. The loop stops and stage 3 accepts. The parities of $z$ in the three iterations were $0, 1, 1$: the binary digits of $6 = 110_2$, lowest first.

For $0^{12}1^4$: $(12, 4)$, total even, leaves $(6, 2)$; total even, leaves $(3, 1)$; total $4$ even, leaves $(1, 0)$. No $1$s remain, so the loop stops; one $0$ is uncrossed and stage 3 rejects. Here $12 = 1100_2$ and $4 = 0100_2$ agree in their three lowest bits and differ in the fourth, which is exactly where the counts parted.
:::
:::

With a **second tape** the problem becomes linear: copy the $0$s to tape 2, then match the $1$s on tape 1 against them, moving both heads in step. That is $O(n)$ moves, so $A \in \mathsf{TIME}(n)$ for two-tape machines. On a single tape one cannot do better than $O(n \log n)$: a "crossing sequence" argument (Trakhtenbrot 1964, Hennie 1965, Hartmanis 1968) shows that every language decided by a single-tape machine in time $o(n\log n)$ is regular, and $A$ is not regular ([[theory-of-computation/non-regular-languages]]).

So the *exact* running time of a problem depends on the model: $n$, $n\log n$ and $n^2$ for the same language. What does not change much is whether the running time is polynomial.

### How much the model matters

::: theorem Multitape and single-tape time {#thm-multitape-time}
Let $t(n) \ge n$. Every $t(n)$-time multitape Turing machine has an equivalent $O(t(n)^2)$-time single-tape Turing machine.
:::

::: proof
This is the time bound in [[theory-of-computation/turing-machines#thm-multitape]]: the single tape stores the $k$ tapes side by side with marked head positions; each simulated move takes two sweeps over $O(t(n))$ used cells plus at most $k$ shifts of length $O(t(n))$, and there are $t(n)$ moves.
:::

Nondeterminism is a different matter. A nondeterministic TM $N$ is a **decider** if every branch of its computation halts on every input, and its running time $t(n)$ is the maximum number of moves on *any* branch, over all inputs of length $n$.

::: theorem Deterministic simulation of nondeterministic time {#thm-ntm-time}
Let $t(n) \ge n$. Every $t(n)$-time nondeterministic single-tape decider $N$ has an equivalent deterministic single-tape decider running in time $2^{O(t(n))}$.
:::

::: proof
Let $b$ be the maximum number of choices in any transition of $N$. On an input of length $n$ every branch has length at most $t(n)$, so the computation tree has at most $b^{t(n)}$ leaves and at most $\sum_{i=0}^{t(n)} b^i \le 2b^{t(n)}$ nodes. The three-tape simulation of [[theory-of-computation/turing-machines#thm-ntm]] visits each node by replaying its path from the root, which costs $O(t(n))$ moves per node, plus $O(t(n))$ to advance the address in shortlex order. It accepts as soon as some branch accepts, and rejects after all addresses of length $t(n)$ have been tried — it can compute when to stop because the tree has depth at most $t(n)$, and all branches halt. Its total time is $O(t(n)\, b^{t(n)}) = 2^{O(t(n))}$. Converting the three tapes to one squares this: $(2^{O(t(n))})^2 = 2^{O(t(n))}$.
:::

So deterministic models differ by a polynomial, while the only general simulation of nondeterminism we know costs an exponential. Whether that exponential is unavoidable is the subject of [[complexity/np]].

## Encodings and input size {#sec-encoding}

Running time is measured against the length of the *encoding* of the input, so we must say how inputs are encoded. Graphs are written as adjacency matrices or edge lists, formulas as strings of symbols, and numbers **in binary** (or any base $\ge 2$). For a graph with $n$ vertices and $m$ edges, the adjacency matrix has $n^2$ bits and an edge list $O((n + m)\log n)$ bits. These lengths are polynomially related to each other and to $n + m$, so a polynomial-time algorithm for one encoding is polynomial-time for the other. We call any encoding **reasonable** if it is polynomially related to these standard ones, and we write $\langle x\rangle$ for the encoding of an object $x$.

Numbers are where care is needed. A $b$-bit number $N$ has value up to $2^b$. An algorithm that takes $N$ steps is therefore exponential in the length of its input.

::: example Trial division is exponential {#ex-trial-division}
Trial division tests whether $N$ is prime by trying every divisor $d$ with $2 \le d \le \sqrt{N}$. How long does it take on a $b$-bit number, and what does this mean for a 2048-bit RSA modulus?
::: solution
There are about $\sqrt{N} \approx 2^{b/2}$ candidate divisors, and each division of $b$-bit numbers costs $O(b^2)$ bit operations with schoolbook arithmetic. So the running time is $\Theta(2^{b/2})$ divisions in the worst case (when $N$ is prime), which is exponential in the input length $b$, although it looks like the "linear-ish" $\sqrt N$. For $b = 2048$, $2^{1024} \approx 1.8 \times 10^{308}$ divisions: far beyond any computer. (Primality *can* be tested in polynomial time — see [[#sec-practice]] — but not by trial division.)
:::
:::

If the same number were written in **unary**, as $1^N$, the input would have length $N$ and trial division would take polynomial time. The problem has not become easier; the input has become exponentially longer. This is why we fix binary encodings, and why an algorithm whose time is polynomial in the *numeric value* of its inputs, such as the $O(nW)$ dynamic program for knapsack ([[algorithms/dynamic-programming#thm-knapsack]]), is called **pseudo-polynomial** rather than polynomial.

## The class P

::: definition The class P {#def-p}
$$
\mathsf{P} = \bigcup_{k \ge 0} \mathsf{TIME}(n^k).
$$ {#eq-p}
$\mathsf{P}$ is the class of languages decidable in **polynomial time** by a deterministic (single-tape or multitape) Turing machine.
:::

By [[#thm-multitape-time]], it does not matter whether we use single-tape or multitape machines in this definition: a multitape machine running in time $O(n^k)$ is simulated by a single-tape machine in time $O(n^{2k})$, still a polynomial. The same is true of every reasonable deterministic model.

::: theorem Robustness of P {#thm-p-robust}
1. Polynomials are closed under addition, multiplication and composition. Hence an algorithm that makes polynomially many calls to polynomial-time subroutines, each on inputs of polynomial length, runs in polynomial time.
2. $\mathsf{P}$ is the same class whether defined using single-tape TMs, multitape TMs, or random-access machines whose registers hold $O(\log n)$-bit words (or arbitrary integers, if every instruction is charged for the number of bits it touches).
3. $\mathsf{P}$ does not depend on the choice among reasonable encodings of the input.
:::

::: proof
(1) If $p$ and $q$ are polynomials of degrees $d$ and $e$ then $p + q$, $pq$ and $p(q(n))$ are polynomials, of degrees at most $\max(d, e)$, $d + e$ and $de$. Suppose an algorithm runs for $p(n)$ steps of its own and calls subroutines at most $p(n)$ times. Every intermediate result it can write has length at most $n + p(n)$, so each call is on an input of length at most $n + p(n)$ and costs at most $q(n + p(n))$. The total, $p(n) + p(n)\,q(n + p(n))$, is a polynomial.

(2) Single-tape against multitape is [[#thm-multitape-time]]. For random-access machines we sketch both directions. A multitape TM is simulated by a RAM with constant overhead per move, keeping each tape in an array. Conversely, a multitape TM can simulate a log-cost RAM that runs for $t$ steps by keeping its memory as a list of (address, value) pairs on a tape. After $t$ steps at most $t$ registers have been written, and each address and value has polynomially many bits in $t$ and $n$. So one RAM step — find a register by scanning the list, do the arithmetic on two numbers, update the list — costs a polynomial number of TM moves, and $t$ steps cost a polynomial in $t$ and $n$.

(3) Converting between reasonable encodings takes polynomial time, and by definition the encodings have polynomially related lengths; apply (1).
:::

The proviso in (2) is essential. A RAM that may multiply arbitrarily large integers at unit cost is *not* polynomially equivalent to a Turing machine: starting from $2$ and squaring $k$ times gives $2^{2^k}$, a number with $2^k + 1$ bits, after only $k$ "steps" ([[#ex-squaring]]). Every result about $\mathsf{P}$ assumes that the cost of an operation reflects the length of its operands.

The thesis that $\mathsf{P}$ captures the problems that are "efficiently solvable in practice" is called the **Cobham–Edmonds thesis**. Like the Church–Turing thesis it is not a theorem, and it is a much weaker kind of claim. Its strengths are robustness (the class does not depend on the model), closure (polynomial-time subroutines compose) and experience: problems first shown to be in $\mathsf{P}$ usually go on to have algorithms whose degree is small, often $1$, $2$ or $3$.

::: warning Polynomial does not mean fast, and exponential does not mean slow
An $O(n^{100})$ algorithm is in $\mathsf{P}$ and useless; an algorithm whose worst case is exponential may be excellent in practice. The simplex method for linear programming takes exponential time on the Klee–Minty examples (1972) yet is fast on the problems people actually solve, and modern SAT solvers routinely handle industrial formulas with millions of variables (see [[complexity/coping-with-hardness]]). Membership in $\mathsf{P}$ is a mathematical classification, not a performance guarantee. Its value is that it is robust and that *not* being in $\mathsf{P}$ (if it can be shown) says something lasting: no future hardware or clever coding brings an exponential-time problem within polynomial reach.
:::

Another caution concerns the **strong (or extended) Church–Turing thesis**, which asserts that every physically realisable computer can be simulated by a Turing machine with only polynomial slowdown. Quantum computers are the main challenge to it: Shor's algorithm (1994) factors integers in polynomial time on a quantum computer, while no classical polynomial-time factoring algorithm is known. Whether large-scale quantum computers can be built is an engineering question, and whether factoring is classically hard is open; [[quantum-computing]] returns to the class $\mathsf{BQP}$.

::: widget plot
f: x^2; x^3; 2^x
x: 0, 16
y: 0, 5000
labels: n^2; n^3; 2^n
caption: Polynomial against exponential growth. For small $n$ the cube $n^3$ lies above $2^n$ (they cross between $n = 9$ and $n = 10$), but from then on the exponential leaves every polynomial behind: $2^{16} = 65\,536$ while $16^3 = 4\,096$. Change the $y$-range in your head: doubling the speed of a computer lets a $2^n$ algorithm handle inputs only one larger, while an $n^2$ algorithm handles inputs about $1.41$ times larger.
:::

::: example What a faster computer buys {#ex-speedup}
Three algorithms take $n^2$, $n^3$ and $2^n$ steps, and each solves inputs of size $n_0$ in an hour on today's machine. A machine $10$ times faster is bought. What input size can each handle in an hour now?
::: solution
In an hour the new machine makes $10$ times as many steps. For $n^2$: $n^2 = 10\,n_0^2$ gives $n = \sqrt{10}\,n_0 \approx 3.16\,n_0$. For $n^3$: $n = 10^{1/3} n_0 \approx 2.15\,n_0$. For $2^n$: $2^n = 10 \cdot 2^{n_0}$ gives $n = n_0 + \log_2 10 \approx n_0 + 3.3$. If $n_0 = 1000$, the quadratic algorithm now reaches about $3162$ and the cubic one about $2154$, while the exponential algorithm — which could never have reached $1000$ anyway — moves from $n_0$ to $n_0 + 3$. Polynomial algorithms scale *multiplicatively* with hardware, exponential ones only *additively*.
:::
:::

## Problems in P

To show that a problem is in $\mathsf{P}$ we describe an algorithm in stages, as in the rest of [[theory-of-computation]], and argue two things: each stage can be implemented in polynomial time on a reasonable deterministic model, and the number of stages is polynomial. By [[#thm-p-robust]] we may then reason about ordinary pseudocode.

### Reachability

$$
\mathit{PATH} = \{\langle G, s, t\rangle : G \text{ is a directed graph with a directed path from } s \text{ to } t\}.
$$

::: theorem PATH is in P {#thm-path}
$\mathit{PATH} \in \mathsf{P}$.
:::

::: proof
Run breadth-first search ([[algorithms/graph-search#alg-bfs]]) from $s$ and accept iff $t$ is marked. BFS marks exactly the vertices reachable from $s$ ([[algorithms/graph-search#thm-bfs]]). With an adjacency matrix of $n^2$ bits, each vertex is dequeued once and its row is scanned once, for $O(n^2)$ RAM steps; each step manipulates $O(\log n)$-bit vertex names. By [[#thm-p-robust]] this is polynomial time on a Turing machine.
:::

Compare the brute-force approach: a path from $s$ to $t$ without repeated vertices has at most $n - 1$ edges, so one could enumerate all sequences of distinct vertices — up to $(n-2)!$ of them. BFS avoids this because it never enumerates paths, only vertices, and remembers which ones it has seen. Avoiding exhaustive search by reusing partial information is the common theme of polynomial-time algorithms.

### Relatively prime numbers

$$
\mathit{RELPRIME} = \{\langle x, y\rangle : x, y \ge 1 \text{ and } \gcd(x, y) = 1\}.
$$

Searching for a common divisor would take time exponential in the bit length, as in [[#ex-trial-division]]. Euclid's algorithm is exponentially faster.

::: algorithm Euclid's algorithm {#alg-euclid}
On input $\langle x, y\rangle$ with $x \ge y \ge 1$: while $y \ne 0$, replace $(x, y)$ by $(y, x \bmod y)$. Output $x$. ($\mathit{RELPRIME}$: accept iff the output is $1$.)
:::

::: lemma Euclid's remainders shrink fast {#lem-euclid-halving}
If $x \ge y \ge 1$, then $x \bmod y < x/2$.
:::

::: proof
If $y \le x/2$ then $x \bmod y < y \le x/2$. If $y > x/2$ then $x \bmod y = x - y < x - x/2 = x/2$.
:::

::: theorem RELPRIME is in P {#thm-relprime}
Euclid's algorithm computes $\gcd(x, y)$ using at most $2\lceil\log_2 x\rceil + 2$ iterations; hence $\mathit{RELPRIME} \in \mathsf{P}$.
:::

::: proof
*Correctness.* $\gcd(x, y) = \gcd(y, x \bmod y)$, because $x \bmod y = x - qy$ for an integer $q$, so the common divisors of $(x, y)$ and of $(y, x \bmod y)$ are the same. The pair decreases, so the loop ends with $y = 0$, and $\gcd(x, 0) = x$.

*Time.* Look at two consecutive iterations: $(x, y) \to (y, r) \to (r, s)$ with $r = x \bmod y$. By [[#lem-euclid-halving]] $r < x/2$, so after every two iterations the first component has dropped below half its value. Starting from $x$, after $2j$ iterations it is less than $x/2^j$, and it is a positive integer while the loop runs, so the loop ends within $2\lceil\log_2 x\rceil + 2$ iterations. Each iteration divides numbers of at most $b$ bits, $O(b^2)$ bit operations, where $b$ is the input length. The total is $O(b^3)$: polynomial.
:::

::: example Euclid on Fibonacci numbers {#ex-euclid}
Trace [[#alg-euclid]] on $(89, 55)$ and on $(1071, 462)$, and compare the number of iterations with the bound of [[#thm-relprime]].
::: solution
For $(89, 55)$ the pairs are

$$
(89, 55) \to (55, 34) \to (34, 21) \to (21, 13) \to (13, 8) \to (8, 5) \to (5, 3) \to (3, 2) \to (2, 1) \to (1, 0),
$$

nine iterations (every quotient is $1$ except the last, which is $2$), and $\gcd = 1$, so $\langle 89, 55\rangle \in \mathit{RELPRIME}$. The bound is $2\lceil\log_2 89\rceil + 2 = 2 \cdot 7 + 2 = 16$. Consecutive Fibonacci numbers are in fact the worst case for Euclid's algorithm (Lamé's theorem, 1844), because each quotient is as small as possible.

For $(1071, 462)$: $1071 = 2 \cdot 462 + 147$, $462 = 3 \cdot 147 + 21$, $147 = 7 \cdot 21 + 0$. Three iterations, $\gcd = 21$, so the pair is not in $\mathit{RELPRIME}$. Large quotients make the remainders shrink much faster than the worst case.
:::
:::

### Context-free languages

::: theorem Every context-free language is in P {#thm-cfl-p}
If $L$ is context-free, then $L \in \mathsf{TIME}(n^3)$.
:::

::: proof
Fix a grammar $G$ for $L$ in Chomsky normal form ([[theory-of-computation/context-free-grammars#thm-cnf]]); it is part of the algorithm, not of the input. The CYK algorithm ([[theory-of-computation/context-free-grammars#alg-cyk]]) fills a table whose entry $(i, j)$ is the set of variables deriving the substring $w_i \cdots w_j$. There are $O(n^2)$ entries, each computed by trying $O(n)$ split points and the constant number of rules of $G$, for $O(n^3)$ steps in all ([[theory-of-computation/context-free-grammars#thm-cyk]]); $w \in L$ iff the start variable is in entry $(1, n)$. The table has $O(n^2)$ entries of constant size, so a multitape machine can perform these steps with polynomial overhead; a more careful implementation achieves $O(n^3)$ directly.
:::

Note the contrast with the naive algorithm: a CNF derivation of a string of length $n$ has $2n - 1$ steps, and trying all derivations of that length takes exponential time. CYK is dynamic programming: it shares the answers to the $O(n^2)$ subproblems "which variables derive this substring" between all the derivations that need them.

::: quiz
Which of the following problems are known to be in $\mathsf{P}$, with inputs encoded in binary?
- [x] Given a directed graph and two vertices, is there a path between them?
- [x] Given integers $x$ and $y$, is $\gcd(x, y) = 1$?
- [ ] Given $n$ items with integer weights and values, a capacity $W$ and a target $V$, is there a subset of weight at most $W$ and value at least $V$? (The $O(nW)$ dynamic program decides it.)
- [x] Given a string $w$, is $w$ in the language of the fixed grammar $S \to aSb \mid SS \mid \varepsilon$?
::: solution
Reachability (BFS), relative primality (Euclid) and membership in a fixed context-free language (CYK) are in $\mathsf{P}$. The knapsack dynamic program takes $O(nW)$ steps, but $W$ is written with about $\log_2 W$ bits, so $nW$ can be exponential in the input length: the algorithm is only pseudo-polynomial. Knapsack is in fact $\mathsf{NP}$-complete ([[complexity/np-complete-problems]]), so no polynomial-time algorithm is known.
:::
:::

## In practice {#sec-practice}

Some landmark problems took a long time to be placed in $\mathsf{P}$:

- **Linear programming** was shown to be in $\mathsf{P}$ by Leonid Khachiyan's ellipsoid method (1979), and Narendra Karmarkar's interior-point method (1984) made polynomial-time algorithms practical. The simplex method, much older, is exponential in the worst case but remains widely used.
- **Primality.** Randomised polynomial-time tests (Solovay–Strassen 1977, Miller–Rabin 1976/1980) were used for decades before Manindra Agrawal, Neeraj Kayal and Nitin Saxena proved in 2002 that $\mathit{PRIMES} \in \mathsf{P}$ (the AKS algorithm, published 2004). In practice, Miller–Rabin is still used because it is much faster; the deterministic algorithm settled a theoretical question.
- **Maximum matching** in general graphs was placed in $\mathsf{P}$ by Jack Edmonds's blossom algorithm (1965), the paper in which he argued that polynomial time is the right notion of a "good" algorithm.

As of 2026, **integer factoring**, **graph isomorphism** and **discrete logarithm** are well-known problems neither known to be in $\mathsf{P}$ nor believed to be among the hardest problems of [[complexity/np]]. László Babai's algorithm (announced 2015) solves graph isomorphism in quasi-polynomial time $2^{O((\log n)^c)}$, which is between polynomial and exponential.

::: history
Measuring the difficulty of computation by resources began in the early 1960s with work of Michael Rabin (1960) on "degree of difficulty" and of Juris Hartmanis and Richard Stearns, whose paper "On the computational complexity of algorithms" (*Transactions of the AMS*, 1965) defined time complexity classes for multitape Turing machines, proved the speed-up and hierarchy theorems, and gave the field its name. In the same year Alan Cobham ("The intrinsic computational difficulty of functions", 1965) and Jack Edmonds ("Paths, trees, and flowers", 1965) independently proposed polynomial time as the mathematical notion of feasible computation. Frederick Hennie (1965) proved the crossing-sequence lower bounds for single-tape machines. Hartmanis and Stearns received the 1993 Turing Award for founding computational complexity.
:::

## Where this leads

$\mathsf{P}$ is the reference point for the whole course. [[complexity/np]] adds nondeterminism — or equivalently, the ability to *check* a proposed solution — and asks whether that makes polynomial time more powerful; [[complexity/np-completeness]] identifies the hardest problems of that larger class. [[complexity/space-complexity]] measures memory instead of time, and [[complexity/hierarchies]] proves that more time really does allow more problems to be solved, so that, for example, $\mathsf{P}$ is strictly smaller than exponential time.

::: summary
- The running time of a decider is the worst-case number of moves as a function of the input length $n$ ([[#def-running-time]]); $\mathsf{TIME}(t(n))$ is the class of languages decidable in $O(t(n))$ time ([[#def-time]]).
- Exact running times depend on the model ($\{0^k1^k\}$ takes $\Theta(n \log n)$ on one tape, $O(n)$ on two), but deterministic models are polynomially related ([[#thm-multitape-time]]); the known simulation of nondeterminism costs an exponential ([[#thm-ntm-time]]).
- Input length is the length of a reasonable encoding; numbers are written in binary, so time polynomial in a number's value is only pseudo-polynomial.
- $\mathsf{P} = \bigcup_k \mathsf{TIME}(n^k)$ ([[#def-p]]) is robust: closed under composition and independent of reasonable models and encodings ([[#thm-p-robust]]), provided operations are charged for the length of their operands.
- $\mathit{PATH}$, $\mathit{RELPRIME}$ and every context-free language are in $\mathsf{P}$ ([[#thm-path]], [[#thm-relprime]], [[#thm-cfl-p]]); in each case an algorithm avoids exhaustive search by sharing work.
- "Polynomial" is a classification, not a speed guarantee, but polynomial algorithms scale multiplicatively with faster hardware and exponential ones only additively.
:::

## Exercises

::: exercise Bits in a number {level=1 check="20"}
How many bits does the binary representation of $N = 10^6$ have? An algorithm loops $N$ times on input $N$; is it polynomial-time? (Enter the number of bits.)
::: solution
$2^{19} = 524\,288 \le 10^6 < 2^{20} = 1\,048\,576$, so $10^6$ has $20$ bits. In general $N$ has $\lfloor\log_2 N\rfloor + 1$ bits. A loop that runs $N$ times runs about $2^{b}$ times on a $b$-bit input, which is exponential in the input length: the algorithm is not polynomial-time (it is pseudo-polynomial).
:::
:::

::: exercise Polynomial or not? {level=1}
Which of these running times are polynomial in $n$: (a) $n^3 \log n$; (b) $n^{\log n}$; (c) $2^{\sqrt{\log n}}$; (d) $(\log n)^{100}$; (e) $1.0001^n$; (f) $n^{100}$?
::: solution
A function is polynomially bounded if it is $O(n^k)$ for a constant $k$. (a) Yes: $O(n^4)$. (b) No: $n^{\log n} = 2^{(\log n)^2}$, which outgrows every $n^k = 2^{k\log n}$ — it is **quasi-polynomial**. (c) Yes: $\sqrt{\log n} \le \log n$, so $2^{\sqrt{\log n}} \le n$; it grows more slowly than any positive power of $n$ but faster than any power of $\log n$. (d) Yes: $(\log n)^{100} = O(n)$ (polylogarithmic). (e) No: exponential, although it only overtakes $n^{100}$ for huge $n$ — at $n = 10^7$ it is about $e^{1000}$. (f) Yes, by definition, however impractical.
:::
:::

::: exercise Euclid's iterations {level=1 check="9"}
How many iterations of the loop of [[#alg-euclid]] does $\gcd(89, 55)$ take — that is, how many divisions with remainder are performed before the second component becomes $0$? (Enter the number.)
::: solution
From [[#ex-euclid]]: $89 = 1\cdot 55 + 34$, $55 = 1 \cdot 34 + 21$, $34 = 1 \cdot 21 + 13$, $21 = 1 \cdot 13 + 8$, $13 = 1 \cdot 8 + 5$, $8 = 1 \cdot 5 + 3$, $5 = 1 \cdot 3 + 2$, $3 = 1 \cdot 2 + 1$, $2 = 2 \cdot 1 + 0$. That is $9$ divisions.
:::
:::

::: exercise Closure properties of P {level=2}
Prove that $\mathsf{P}$ is closed under union, intersection, complement and concatenation.
::: solution
Let $M_1$ and $M_2$ decide $L_1$ and $L_2$ in times $O(n^a)$ and $O(n^b)$. *Complement:* swap the accept and reject states of $M_1$; the running time is unchanged. *Union and intersection:* on input $w$, run $M_1$ on $w$, then $M_2$ on $w$ (on a second tape, or after restoring the input), and accept if either (both) accepted; time $O(n^a + n^b)$. *Concatenation:* on input $w = w_1 \cdots w_n$, for each split $i = 0, \dots, n$ run $M_1$ on $w_1 \cdots w_i$ and $M_2$ on $w_{i+1} \cdots w_n$, and accept if for some $i$ both accept. There are $n + 1$ splits, each costing $O(n^a + n^b)$ plus $O(n)$ for copying, so the time is $O(n^{\max(a, b) + 1})$: polynomial.
:::
:::

::: exercise Pseudo-polynomial subset sum {level=2}
$\mathit{SUBSET\text{-}SUM} = \{\langle a_1, \dots, a_k, T\rangle : \text{some subset of the } a_i \text{ sums to } T\}$ (positive integers, in binary). (a) Give an algorithm running in $O(kT)$ arithmetic steps. (b) Is it polynomial-time? (c) Show that the version in which all numbers are written in **unary** is in $\mathsf{P}$.
::: solution
(a) Keep a Boolean array $R[0..T]$ with $R[s]$ true iff some subset of the numbers processed so far sums to $s$. Initially only $R[0]$ is true. For each $a_i$, for $s$ from $T$ down to $a_i$, set $R[s] \gets R[s] \lor R[s - a_i]$ (going downwards uses each $a_i$ at most once). Accept iff $R[T]$. That is $O(kT)$ steps, each on $O(\log T)$-bit indices.
(b) No: the input has about $\sum_i \log_2 a_i + \log_2 T$ bits, and $T$ can be exponential in that, for example $T \approx 2^{n/2}$. (In fact $\mathit{SUBSET\text{-}SUM}$ is $\mathsf{NP}$-complete: [[complexity/np-complete-problems]].)
(c) In unary the input length $n$ is at least $T$ and at least $k$, so $O(kT) = O(n^2)$ steps of polynomial cost each: polynomial time. Nothing about the problem changed, only how much input we are given to pay for the work.
:::
:::

::: exercise A three-tape machine on one tape {level=2 check="4"}
A three-tape Turing machine decides $L$ in time $O(n^2)$. Using [[#thm-multitape-time]], what exponent $k$ can you guarantee for a single-tape machine deciding $L$ in time $O(n^k)$? Is $L \in \mathsf{P}$ either way? (Enter $k$.)
::: solution
The simulation squares the running time: $O((n^2)^2) = O(n^4)$, so $k = 4$. Either way $L \in \mathsf{P}$, since $\mathsf{P}$ is defined with any number of tapes and the polynomial degree only doubles.
:::
:::

::: exercise Repeated squaring and the cost model {#ex-squaring level=3 check="1025"}
A program starts with $x = 2$ and executes `x = x * x` ten times. (a) How many bits does the final value of $x$ have? (b) Explain why a machine model that charges one unit for each multiplication, regardless of the size of the operands, would make $\mathsf{P}$ larger than its Turing-machine definition (at least, it would allow computing numbers no polynomial-time TM can even write down). (c) Why does the unit-cost RAM with only addition and subtraction not have this problem? (Enter the number of bits in (a).)
::: solution
(a) After $j$ squarings $x = 2^{2^j}$. For $j = 10$, $x = 2^{1024}$, which has $1024 + 1 = 1025$ bits.
(b) With $k$ unit-cost squarings a program of $k + 1$ steps produces $2^{2^k}$, a number of $2^k + 1$ bits, so in time $n$ it computes numbers of length exponential in $n$. A Turing machine needs at least $2^k$ moves to write that many bits. Worse, arithmetic on such numbers (for example, extracting bits by division) lets unit-cost machines with multiplication solve problems believed to be outside $\mathsf{P}$ (Hartmanis and Simon, 1974, showed that unit-cost RAMs with multiplication and bitwise Boolean operations decide in polynomial time exactly the problems in $\mathsf{PSPACE}$ — see [[complexity/space-complexity]]).
(c) Adding two numbers produces a result at most one bit longer than the longer operand, so after $t$ steps every register has at most $\max(\text{input length}, \text{constants}) + t$ bits. Each step can then be simulated in time polynomial in $t$ and $n$, as in the proof of [[#thm-p-robust]].
:::
:::

::: exercise The star of a language in P {level=3}
Prove that if $L \in \mathsf{P}$ then $L^* \in \mathsf{P}$, and implement your algorithm in Python for a language given as a membership function. (Trying all ways to split $w$ into pieces takes exponential time, so use dynamic programming.)
::: solution
Let $w = w_1 \cdots w_n$. Define $S[i]$ to be true iff the prefix $w_1 \cdots w_i$ is in $L^*$. Then $S[0]$ is true (the empty string is in $L^*$), and for $i \ge 1$, $S[i]$ is true iff there is $j < i$ with $S[j]$ true and $w_{j+1} \cdots w_i \in L$: any decomposition of a non-empty prefix into pieces of $L$ has a last piece, and what precedes it is a shorter prefix in $L^*$. Accept iff $S[n]$. The table has $n + 1$ entries and each is computed by at most $n$ membership tests on substrings of length at most $n$, so with a decider for $L$ running in time $O(n^k)$ the total is $O(n^2 \cdot n^k) = O(n^{k+2})$: polynomial.

```python
def in_star(w, in_L):
    """Decide w in L* with O(len(w)^2) calls to the decider in_L."""
    n = len(w)
    S = [True] + [False] * n          # S[i]: prefix w[:i] is in L*
    for i in range(1, n + 1):
        S[i] = any(S[j] and in_L(w[j:i]) for j in range(i))
    return S[n]

is_square = lambda s: s != "" and s.isdigit() and int(s) ** 0.5 == int(int(s) ** 0.5)
print(in_star("14916", is_square), in_star("1492", is_square))
```

```console
$ python3 star.py
True False
```

The string `14916` splits as `1|4|9|16`, all perfect squares; `1492` has no such split (`1|4|9|2` fails at `2`, and `49|2`, `1|49|2`, `14|9|2` all leave `2` or `14`). The test `s != ""` is only a safeguard: the loop never asks about the empty piece, because $j < i$.
:::
:::
