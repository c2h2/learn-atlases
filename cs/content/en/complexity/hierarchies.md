After six chapters of complexity theory we have many classes and very few separations. We do not know whether $\mathsf{P} \ne \mathsf{NP}$, whether $\mathsf{NP} \ne \mathsf{PSPACE}$, or even whether $\mathsf{L} \ne \mathsf{P}$. Is anything *provably* hard? Is there any problem that can be solved in time $n^3$ but not in time $n^2$?

Yes. The **hierarchy theorems** show that more time, or more space, always lets a machine decide more languages — provided the bounds are "reasonable" functions. Their proofs use diagonalisation, the method that proved the halting problem undecidable in [[theory-of-computation/decidability#thm-atm]], now with a clock. They give our first unconditional separations: $\mathsf{P} \ne \mathsf{EXP}$ and $\mathsf{NL} \ne \mathsf{PSPACE}$. The second part of the chapter explains why the same technique cannot settle $\mathsf{P}$ versus $\mathsf{NP}$: diagonalisation **relativises**, and there are "oracle worlds" in which $\mathsf{P} = \mathsf{NP}$ and others in which $\mathsf{P} \ne \mathsf{NP}$. The third part organises the problems just above $\mathsf{NP}$ — those defined by a bounded number of alternating quantifiers — into the **polynomial hierarchy**.

## Constructible functions

A machine that is to run "for $t(n)$ steps" must be able to work out how long that is.

::: definition Time- and space-constructible functions {#def-constructible}
A function $t\colon \N \to \N$ with $t(n) \ge n$ is **time constructible** if some Turing machine computes the binary representation of $t(n)$ from the input $1^n$ in time $O(t(n))$. A function $f(n) \ge \log n$ is **space constructible** if some Turing machine computes the binary representation of $f(n)$ from $1^n$ in space $O(f(n))$.
:::

All the functions we normally meet are constructible: $n \log n$, $n^k$, $2^n$, $n^{\log n}$ (time); $\log n$, $\log^2 n$, $n^k$ (space). Constructibility excludes pathological bounds, and is genuinely necessary ([[#warn-gap]]).

## The space hierarchy theorem

::: theorem Space hierarchy theorem {#thm-space-hierarchy}
For every space-constructible $f$, there is a language $A$ that is decidable in space $O(f(n))$ but not in space $o(f(n))$.
:::

The idea: build a machine $D$ that, given the description of a machine $M$ as input, runs $M$ on that same input within space $f(n)$ and does the opposite. If $M$ uses less space than $D$ allows, $D$ disagrees with $M$, so $M$ does not decide $L(D)$. Two technical points need care: $M$'s description may be long compared with the space we hope to beat, which we fix by **padding** the input; and $M$ might loop, which we fix with a step counter.

::: proof
$D$ = "On input $w$ of length $n$:

1. Compute $f(n)$ (space constructibility) and mark off $f(n)$ work cells. If any later stage tries to use more cells, **reject**.
2. If $w$ is not of the form $\langle M\rangle 1 0^k$ for a Turing machine $M$ (with read-only input tape) and some $k \ge 0$, **reject**.
3. Simulate $M$ on $w$ within the marked cells, encoding each of $M$'s work-tape symbols in a block of cells, and count the simulated steps in a binary counter of $2f(n)$ bits. If the counter overflows (more than $2^{2f(n)}$ steps), **reject**.
4. If $M$ accepts, **reject**. If $M$ rejects, **accept**."

*$D$ uses space $O(f(n))$:* stage 1 by constructibility, and stages 3–4 are confined to the marked cells and the counter. $D$ always halts. Let $A = L(D)$.

*No machine decides $A$ in space $o(f(n))$.* Suppose $M$ did, in space $g(n) = o(f(n))$. Encoding $M$'s symbols costs a constant factor $c_M$ (the block size, depending only on $M$), and $M$, being a decider that never repeats a configuration, halts within $\lvert Q\rvert\,n\,g(n)\,\lvert\Gamma\rvert^{g(n)} = 2^{\log n + O(g(n))}$ steps ([[complexity/space-complexity#lem-configs]]). Since $g = o(f)$ and $f(n) \ge \log n$, for all large enough $n$ we have $c_M g(n) \le f(n)$ and $\log n + O(g(n)) \le 2f(n)$. Choose $k$ so large that $w = \langle M\rangle 1 0^k$ has such a length $n$. On $w$, $D$'s simulation of $M$ fits in the marked space and finishes before the counter overflows, so $D$ accepts $w$ iff $M$ rejects $w$. Hence $L(M) \ne A$, a contradiction.
:::

The padding $1 0^k$ plays the role of the diagonal: every machine $M$ appears on infinitely many inputs, $\langle M\rangle 1 0^k$ for all $k$, and on the long ones $D$ has enough space to beat it. The suffix starts with $1$ so that $\langle M\rangle$ can be recovered uniquely.

::: corollary Consequences of the space hierarchy theorem {#cor-space-hierarchy}
1. $\mathsf{SPACE}(n^a) \subsetneq \mathsf{SPACE}(n^b)$ for all rational $0 \le a < b$ (with $n^0$ read as $\log n$).
2. $\mathsf{NL} \subsetneq \mathsf{PSPACE}$ and $\mathsf{L} \subsetneq \mathsf{PSPACE}$.
3. $\mathsf{PSPACE} \subsetneq \mathsf{EXPSPACE} = \bigcup_k \mathsf{SPACE}(2^{n^k})$.
:::

::: proof
(1) $n^b$ is space constructible and $n^a = o(n^b)$. (2) By Savitch ([[complexity/space-complexity#thm-savitch]]), $\mathsf{NL} \subseteq \mathsf{SPACE}(\log^2 n)$, and $\log^2 n = o(n)$, so the theorem with $f(n) = n$ gives a language in $\mathsf{SPACE}(n) \subseteq \mathsf{PSPACE}$ that is not in $\mathsf{SPACE}(\log^2 n) \supseteq \mathsf{NL} \supseteq \mathsf{L}$. (3) Every language in $\mathsf{PSPACE}$ is in $\mathsf{SPACE}(n^k)$ for some $k$, and $n^k = o(2^n)$. The theorem with $f(n) = 2^n$ gives a language in $\mathsf{SPACE}(2^n) \subseteq \mathsf{EXPSPACE}$ that is not in $\mathsf{SPACE}(g)$ for any $g = o(2^n)$, so not in $\mathsf{PSPACE}$.
:::

Part (2) has a striking consequence for the chain $\mathsf{NL} \subseteq \mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE}$: at least one of the three inclusions is strict, but as of 2026 nobody knows which.

## The time hierarchy theorem

For time the argument is the same, but the simulation costs more. A machine with a fixed number of tapes must simulate machines with *any* number of tapes, and the best general simulation has a logarithmic overhead.

::: lemma Efficient universal simulation {#lem-hennie-stearns}
There is a two-tape Turing machine $U$ which, given $\langle M\rangle$ and $w$, simulates $t$ steps of the multitape machine $M$ on $w$ in $C_M\, t \log t$ steps, where $C_M$ depends only on $M$ (Hennie and Stearns, 1966).
:::

We use this without proof. (A simpler simulation, keeping all of $M$'s tapes on one tape as in [[theory-of-computation/turing-machines#thm-multitape]], costs $t^2$ and would give a weaker theorem.)

::: theorem Time hierarchy theorem {#thm-time-hierarchy}
For every time-constructible $t$, there is a language $A$ that is decidable in time $O(t(n))$ but not in time $o(t(n)/\log t(n))$.
:::

::: proof
$D$ = "On input $w$ of length $n$:

1. Compute $t(n)$ and write it on a separate clock tape (time $O(t(n))$, by constructibility). Each subsequent step of $D$ decrements the clock; when it reaches $0$, **reject**. (Decrementing a binary counter costs $O(1)$ amortised moves per step.)
2. If $w$ is not of the form $\langle M\rangle 1 0^k$, **reject**.
3. Use $U$ of [[#lem-hennie-stearns]] to simulate $M$ on $w$. If the simulation finishes before the clock runs out: if $M$ accepts, **reject**; if $M$ rejects, **accept**."

$D$ runs in time $O(t(n))$ because of the clock. Let $A = L(D)$. Suppose some machine $M$ decided $A$ in time $g(n) = o(t(n)/\log t(n))$. Simulating $M$ on an input of length $n$ costs $D$ at most $C_M\, g(n) \log g(n) \le C_M\, g(n) \log t(n)$ steps (we may assume $g \le t$), which is $o(t(n))$; so for all large $n$ the simulation finishes within the clock's $t(n)$ steps, minus the $O(n)$ steps of stage 2. Taking $w = \langle M\rangle 1 0^k$ with $k$ large, $D$ accepts $w$ iff $M$ rejects $w$ — a contradiction.
:::

::: corollary Consequences of the time hierarchy theorem {#cor-time-hierarchy}
1. $\mathsf{TIME}(n^a) \subsetneq \mathsf{TIME}(n^b)$ for all rational $1 \le a < b$.
2. $\mathsf{P} \subsetneq \mathsf{EXP}$.
3. Every $\mathsf{EXP}$-complete problem (under polynomial-time reductions) is outside $\mathsf{P}$.
:::

::: proof
(1) $n^a = o(n^b/\log n^b)$. (2) $\mathsf{P} \subseteq \mathsf{TIME}(2^n)$, and the theorem with $t(n) = 2^{2n}$ gives a language in $\mathsf{TIME}(2^{2n}) \subseteq \mathsf{EXP}$ not in $\mathsf{TIME}(o(2^{2n}/2n)) \supseteq \mathsf{TIME}(2^n)$. (3) If an $\mathsf{EXP}$-complete $B$ were in $\mathsf{P}$, every language in $\mathsf{EXP}$ would reduce to it and be in $\mathsf{P}$, contradicting (2).
:::

So the generalised chess and Go positions of [[complexity/space-complexity]], which are $\mathsf{EXP}$-complete, are **provably** not solvable in polynomial time — one of the rare unconditional lower bounds for natural problems. The theorem also holds for nondeterministic time, with a subtler proof because a nondeterministic machine cannot simply "do the opposite" of another (that would require complementing an $\mathsf{NTIME}$ computation): $\mathsf{NTIME}(n^a) \subsetneq \mathsf{NTIME}(n^b)$ for $1 \le a < b$ (Cook 1972; Seiferas, Fischer and Meyer 1978; Žák 1983). Hence $\mathsf{NP} \subsetneq \mathsf{NEXP}$.

::: widget cantor
mode: diagonal
size: 8
caption: The diagonal argument behind both hierarchy theorems. Read row $i$ as the behaviour of machine $M_i$ on the inputs $w_1, w_2, \dots$ (accept $= 1$). The machine $D$ is built to differ from $M_i$ on $w_i$ — the flipped diagonal — so it is not in the list. In the hierarchy theorems the list contains only machines that use *less* time or space than $D$, and $D$ can afford to compute the diagonal entries because it is allowed a little more; the padding ensures that each machine has infinitely many "diagonal" inputs, some long enough for $D$ to simulate it.
:::

::: example Which separations follow? {#ex-hierarchy}
Which of these follow from [[#thm-time-hierarchy]] or [[#thm-space-hierarchy]]? (a) $\mathsf{TIME}(n^2) \subsetneq \mathsf{TIME}(n^2 \log^2 n)$; (b) $\mathsf{TIME}(n \log n) \subsetneq \mathsf{TIME}(n \log^2 n)$; (c) $\mathsf{SPACE}(\log n) \subsetneq \mathsf{SPACE}(\log n \cdot \log\log n)$; (d) $\mathsf{P} \subsetneq \mathsf{PSPACE}$.
::: solution
(a) Yes: with $t(n) = n^2\log^2 n$, $t/\log t = n^2\log^2 n/(2\log n + 2\log\log n) = \Theta(n^2 \log n)$, and $n^2 = o(n^2 \log n)$. (b) No, not from this theorem: with $t(n) = n\log^2 n$, $t/\log t = \Theta(n\log n)$, and $n\log n$ is not $o(n\log n)$. (The log factor in the time hierarchy theorem is exactly what is missing; for some machine models finer results are known, but this case is not settled by the theorem as stated.) (c) Yes: $\log n = o(\log n\log\log n)$, and the space theorem has no log loss. (d) No: the hierarchy theorems compare a resource with *itself*. $\mathsf{P}$ versus $\mathsf{PSPACE}$ compares time with space, and is open.
:::
:::

::: warning Hierarchies need constructible bounds {#warn-gap}
It is tempting to read the hierarchy theorems as "any larger bound gives more power". That is false for arbitrary bounds. Borodin's **gap theorem** (1972) says that for every computable function $g$ with $g(x) \ge x$ there is a computable bound $t$ such that $\mathsf{TIME}(t(n)) = \mathsf{TIME}(g(t(n)))$ — for example $\mathsf{TIME}(t) = \mathsf{TIME}(2^{t})$ for a suitable (wildly growing, non-constructible) $t$. The constructed $t$ is chosen so that no machine halts in the gap between $t(n)$ and $2^{t(n)}$ steps on any input of length $n$. Constructibility rules this out because a machine can then "aim" at the bound.
:::

## Oracles and relativisation

Diagonalisation proved $\mathsf{P} \ne \mathsf{EXP}$. Could a cleverer diagonalisation prove $\mathsf{P} \ne \mathsf{NP}$? A theorem of Baker, Gill and Solovay says no — at least, not a proof that works the way the hierarchy proofs do.

::: definition Oracle machines {#def-oracle}
An **oracle Turing machine** $M^B$ has an extra **query tape** and three special states $q_?$, $q_{\text{yes}}$, $q_{\text{no}}$. When $M$ enters $q_?$ with a string $x$ on the query tape, it moves in one step to $q_{\text{yes}}$ if $x \in B$ and to $q_{\text{no}}$ otherwise. $\mathsf{P}^B$ and $\mathsf{NP}^B$ are the classes of languages decided by polynomial-time deterministic, respectively nondeterministic, oracle machines with oracle $B$. For a class $\mathcal{C}$, $\mathsf{P}^{\mathcal{C}} = \bigcup_{B \in \mathcal{C}} \mathsf{P}^B$, and similarly $\mathsf{NP}^{\mathcal{C}}$.
:::

An oracle is a free subroutine for $B$. For example $\mathsf{P}^{\mathit{SAT}}$ contains $\mathsf{NP}$ and $\mathsf{coNP}$ (ask the oracle once, and negate the answer if necessary). The hierarchy proofs **relativise**: they work unchanged if every machine — $D$, $M$ and the simulator — is given the same oracle, because simulating an oracle machine just passes its queries on. So for every oracle $B$, $\mathsf{P}^B \ne \mathsf{EXP}^B$.

::: theorem Baker–Gill–Solovay theorem {#thm-bgs}
There is an oracle $A$ with $\mathsf{P}^A = \mathsf{NP}^A$, and an oracle $B$ with $\mathsf{P}^B \ne \mathsf{NP}^B$.
:::

::: proof
*The oracle $A = \mathit{TQBF}$.* We have
$$
\mathsf{NP}^{\mathit{TQBF}} \subseteq \mathsf{NPSPACE} = \mathsf{PSPACE} \subseteq \mathsf{P}^{\mathit{TQBF}} \subseteq \mathsf{NP}^{\mathit{TQBF}}.
$$
The first inclusion holds because a polynomial-time nondeterministic machine makes queries of polynomial length, and a polynomial-space machine can answer each one itself by evaluating the formula ([[complexity/space-complexity#thm-tqbf]]); the equality is Savitch's theorem; the third holds because every $\mathsf{PSPACE}$ language reduces to $\mathit{TQBF}$ in polynomial time, so a polynomial-time machine can compute the reduction and ask one query. Hence all four classes are equal.

*Constructing $B$.* For any oracle $B$ let
$$
L_B = \{1^n : B \text{ contains some string of length } n\}.
$$
$L_B \in \mathsf{NP}^B$: on input $1^n$, guess a string $x$ of length $n$ and query it. We build $B \subseteq \{0, 1\}^*$ so that $L_B \notin \mathsf{P}^B$. Let $M_1, M_2, \dots$ list all deterministic oracle machines, each $M_i$ equipped with a clock that stops it after $n^i$ steps; every polynomial-time oracle machine is equivalent to some $M_i$ for every oracle (choose $i$ with its running time at most $n^i$ for $n \ge 2$). We decide membership in $B$ length by length, in stages; at stage $i$ we make sure that $M_i^B$ does not decide $L_B$.

*Stage $i$.* So far, membership in $B$ has been decided for all strings of length less than some $\ell$, and no longer string has been put in $B$. Choose $n \ge \ell$ with $2^n > n^i$. Run $M_i$ on $1^n$, answering each query $x$ by the decision already made if $\lvert x\rvert < \ell$, and with "no" otherwise — and declare all those queried strings of length $\ge \ell$ to be outside $B$. $M_i$ halts within $n^i$ steps.

- If $M_i$ accepts $1^n$, put no string of length $n$ into $B$. Then $1^n \notin L_B$, but $M_i$ accepts it.
- If $M_i$ rejects $1^n$, it has queried at most $n^i < 2^n$ strings, so some string $y$ of length $n$ was not queried; put $y$ into $B$. Then $1^n \in L_B$, but $M_i$ rejects it.

In both cases, declare every other undecided string of length less than $\max(n + 1, m)$ — where $m$ exceeds the length of every string $M_i$ queried — to be outside $B$, and continue with $\ell = \max(n + 1, m)$. Later stages never change membership of strings shorter than $\ell$, and the only string added at this stage, $y$, was not queried; so the run of $M_i$ on $1^n$ with the final oracle $B$ is exactly the run we simulated. Hence $M_i^B$ errs on $1^n$, for every $i$, and $L_B \notin \mathsf{P}^B$.
:::

::: example One stage of the construction {#ex-bgs-stage}
Suppose $M_3$ is the oracle machine "on input $1^n$, query $0^n$ and $1^n$; accept iff at least one answer is yes" (it runs well within $n^3$ steps), and that stage $3$ begins with $\ell = 5$. Carry out the stage.
::: solution
We need $n \ge 5$ with $2^n > n^3$. $n = 5$ fails ($32 < 125$), and so does $n = 9$ ($512 < 729$); the smallest choice is $n = 10$ ($1024 > 1000$). Run $M_3$ on $1^{10}$: it queries $0^{10}$ and $1^{10}$, both of length $\ge \ell$ and undecided, so both are answered "no" and declared outside $B$; $M_3$ rejects. Since it rejected, put into $B$ some length-$10$ string it did not query, say $0^9 1$. Now $B$ contains a string of length $10$, so $1^{10} \in L_B$, but $M_3^B$ — whose two queries still get "no" from the final $B$ — rejects $1^{10}$. Declare every other string of length $5$ to $10$ outside $B$ and continue with $\ell = 11$. A machine that queried *every* string of length $n$ could not be fooled this way; that is why $n$ is chosen with $2^n > n^i$, more strings than a polynomial-time machine can ask about.
:::
:::

The moral is the **relativisation barrier**: any proof technique that works equally well relative to every oracle cannot resolve $\mathsf{P}$ versus $\mathsf{NP}$, because the answer differs between oracles. Pure diagonalisation and simulation arguments relativise, so separating $\mathsf{P}$ from $\mathsf{NP}$ requires looking inside computations in a way that oracles do not allow. Two later barriers rule out further families of techniques: **natural proofs** (Razborov and Rudich, 1997), which limits the combinatorial lower-bound methods used for circuits, assuming strong pseudorandom functions exist; and **algebrisation** (Aaronson and Wigderson, 2009), which covers the algebraic methods behind results such as $\mathsf{IP} = \mathsf{PSPACE}$. Any proof that $\mathsf{P} \ne \mathsf{NP}$ must evade all three.

::: quiz
Which statements are true?
- [x] $\mathsf{P}^B \ne \mathsf{EXP}^B$ for every oracle $B$.
- [ ] Since there is an oracle with $\mathsf{P}^A = \mathsf{NP}^A$, it follows that $\mathsf{P} = \mathsf{NP}$ is consistent with all known facts, so $\mathsf{P} = \mathsf{NP}$ is likely.
- [x] A proof of $\mathsf{P} \ne \mathsf{NP}$ cannot consist only of a simulation-and-diagonalisation argument that relativises.
- [x] $\mathsf{NP} \subseteq \mathsf{P}^{\mathit{SAT}}$.
::: solution
The time hierarchy proof relativises, giving the first statement. Oracle results say nothing about which way the real question goes — there are oracles for both answers — so the second is a non sequitur. The third is the relativisation barrier. The fourth: a polynomial-time machine can ask the $\mathit{SAT}$ oracle about the Cook–Levin formula of its input.
:::
:::

## The polynomial hierarchy

Some natural problems seem to lie just above $\mathsf{NP}$ and $\mathsf{coNP}$. Is a Boolean formula $\varphi$ **minimal** — is there no shorter formula equivalent to it? Membership says: *for every* shorter formula $\psi$ *there exists* an assignment on which $\psi$ and $\varphi$ differ. That is a $\forall\exists$ statement, and neither an $\mathsf{NP}$ certificate nor a $\mathsf{coNP}$ certificate seems to capture it.

::: definition The polynomial hierarchy {#def-ph}
For $k \ge 1$, a language $L$ is in $\mathbf{\Sigma}_k^{\mathsf{p}}$ if there are a polynomial $p$ and a polynomial-time algorithm $V$ such that
$$
w \in L \iff \exists y_1\, \forall y_2\, \exists y_3 \cdots Q_k y_k\ \ V \text{ accepts } \langle w, y_1, \dots, y_k\rangle,
$$ {#eq-sigma-k}
where every $y_i$ ranges over strings of length at most $p(\lvert w\rvert)$ and the $k$ quantifiers alternate, starting with $\exists$ ($Q_k$ is $\exists$ if $k$ is odd and $\forall$ if even). $\mathbf{\Pi}_k^{\mathsf{p}}$ is defined in the same way with the quantifiers starting with $\forall$; equivalently $\Pi_k^{\mathsf{p}} = \{L : \overline{L} \in \Sigma_k^{\mathsf{p}}\}$. Set $\Sigma_0^{\mathsf{p}} = \Pi_0^{\mathsf{p}} = \mathsf{P}$. The **polynomial hierarchy** is $\mathsf{PH} = \bigcup_k \Sigma_k^{\mathsf{p}}$.
:::

So $\Sigma_1^{\mathsf{p}} = \mathsf{NP}$ and $\Pi_1^{\mathsf{p}} = \mathsf{coNP}$ ([[complexity/np#def-conp]]). $\mathit{MIN\text{-}FORMULA}$ is in $\Pi_2^{\mathsf{p}}$; the problem "given a DNF formula $\varphi$ and $k$, is there an equivalent DNF formula of size at most $k$?" is $\Sigma_2^{\mathsf{p}}$-complete (Umans, 2001). The canonical complete problems are quantified formulas with a bounded number of alternations: $\Sigma_k\mathit{SAT}$, the true formulas $\exists \vec x_1\, \forall \vec x_2 \cdots Q_k \vec x_k\ \psi$, is $\Sigma_k^{\mathsf{p}}$-complete for each $k$ (Stockmeyer and Wrathall, 1976) — a bounded-alternation version of [[complexity/space-complexity#thm-tqbf]].

::: theorem Structure of the polynomial hierarchy {#thm-ph}
1. $\Sigma_k^{\mathsf{p}} \cup \Pi_k^{\mathsf{p}} \subseteq \Sigma_{k+1}^{\mathsf{p}} \cap \Pi_{k+1}^{\mathsf{p}}$.
2. $\mathsf{PH} \subseteq \mathsf{PSPACE}$.
3. $\Sigma_2^{\mathsf{p}} = \mathsf{NP}^{\mathsf{NP}}$, and in general $\Sigma_{k+1}^{\mathsf{p}} = \mathsf{NP}^{\Sigma_k^{\mathsf{p}}}$.
:::

::: proof
(1) Add a dummy quantified variable that $V$ ignores, at the front or at the end of the quantifier block.

(2) Given [[#eq-sigma-k]], a polynomial-space machine evaluates the quantifiers recursively: for $\exists y_1$ it loops over all strings $y_1$ of length at most $p(n)$, reusing the same space for each, and so on, as in the evaluation of $\mathit{TQBF}$. The depth is $k$, a constant, and each level stores one string of length $p(n)$.

(3) We prove $\Sigma_2^{\mathsf{p}} = \mathsf{NP}^{\mathsf{NP}}$; the general case is the same argument one level up. *($\subseteq$)* Let $w \in L \iff \exists y\, \forall z\ V(w, y, z)$. The language $C = \{\langle w, y\rangle : \exists z\ \lnot V(w, y, z)\}$ is in $\mathsf{NP}$. An oracle machine with oracle $C$ guesses $y$, asks whether $\langle w, y\rangle \in C$, and accepts iff the answer is "no". *($\supseteq$)* Let $N$ be a polynomial-time nondeterministic machine with an oracle $C \in \mathsf{NP}$, verified by $V_C$. Then $w \in L(N^C)$ iff there exist a choice sequence $r$ for $N$, answers $a_1, \dots, a_q$ to its queries, and certificates $c_i$ for the queries answered "yes", such that: the run of $N$ on $w$ with choices $r$ and answers $a$ accepts and asks queries $x_1, \dots, x_q$; $V_C$ accepts $\langle x_i, c_i\rangle$ whenever $a_i = $ yes; and **for all** strings $c'_j$, $V_C$ rejects $\langle x_j, c'_j\rangle$ whenever $a_j = $ no. That is an $\exists\forall$ statement with polynomial-length strings and a polynomial-time check: $L \in \Sigma_2^{\mathsf{p}}$.
:::

::: example An NP machine with an NP oracle {#ex-min-formula}
Show that the complement of $\mathit{MIN\text{-}FORMULA}$ — the formulas $\varphi$ that have a strictly shorter equivalent formula — is in $\mathsf{NP}^{\mathit{SAT}}$, and write the corresponding $\Sigma_2^{\mathsf{p}}$ definition.
::: solution
The oracle machine on input $\varphi$: nondeterministically guess a formula $\psi$ with $\lvert\psi\rvert < \lvert\varphi\rvert$ over the same variables; build the formula $\psi \oplus \varphi$ (true exactly where they differ, of size $O(\lvert\varphi\rvert)$); ask the $\mathit{SAT}$ oracle whether it is satisfiable; accept iff the answer is **no**, i.e. iff $\psi$ and $\varphi$ agree everywhere. The guess is the $\exists$, and the oracle answers the $\forall$ question "do they agree on every assignment?" in one step. As a quantifier formula: $\varphi \notin \mathit{MIN\text{-}FORMULA} \iff \exists \psi\ (\lvert\psi\rvert < \lvert\varphi\rvert)\ \forall a\ \psi(a) = \varphi(a)$, a $\Sigma_2^{\mathsf{p}}$ statement. Without the oracle, checking a guessed $\psi$ is a $\mathsf{coNP}$ problem, and no polynomial-time verifier for it is known.
:::
:::

::: theorem Collapse of the hierarchy {#thm-ph-collapse}
If $\Sigma_k^{\mathsf{p}} = \Pi_k^{\mathsf{p}}$ for some $k \ge 1$, then $\mathsf{PH} = \Sigma_k^{\mathsf{p}}$. In particular, if $\mathsf{P} = \mathsf{NP}$ then $\mathsf{PH} = \mathsf{P}$, and if $\mathsf{NP} = \mathsf{coNP}$ then $\mathsf{PH} = \mathsf{NP}$.
:::

::: proof
We show $\Sigma_{k+1}^{\mathsf{p}} \subseteq \Sigma_k^{\mathsf{p}}$; then $\Pi_{k+1}^{\mathsf{p}}$, the class of complements, is contained in $\Pi_k^{\mathsf{p}} = \Sigma_k^{\mathsf{p}}$, so level $k + 1$ equals level $k$, and by induction every higher level does too. Let $L \in \Sigma_{k+1}^{\mathsf{p}}$: $w \in L \iff \exists y_1\ [\langle w, y_1\rangle \in L']$, where $L'$ is defined by the remaining $k$ quantifiers $\forall y_2 \cdots$, so $L' \in \Pi_k^{\mathsf{p}}$. By assumption $L' \in \Sigma_k^{\mathsf{p}}$: $\langle w, y_1\rangle \in L' \iff \exists z_1\, \forall z_2 \cdots\ V'(\dots)$. Then
$$
w \in L \iff \exists (y_1, z_1)\ \forall z_2 \cdots\ V'(\langle w, y_1\rangle, z_1, z_2, \dots),
$$
merging the two adjacent existential quantifiers into one over pairs. This has $k$ alternating quantifiers starting with $\exists$, so $L \in \Sigma_k^{\mathsf{p}}$. For the special cases: $\mathsf{P} = \mathsf{NP}$ gives $\Sigma_1^{\mathsf{p}} = \mathsf{NP} = \mathsf{P}$, closed under complement, so $\Sigma_1^{\mathsf{p}} = \Pi_1^{\mathsf{p}}$ and $\mathsf{PH} = \mathsf{NP} = \mathsf{P}$; $\mathsf{NP} = \mathsf{coNP}$ is the case $k = 1$.
:::

It is widely believed that the hierarchy is **infinite** — that all its levels are distinct — and "otherwise the polynomial hierarchy would collapse" has become a standard form of evidence. For example, the Karp–Lipton theorem (1980) says that if $\mathit{SAT}$ has polynomial-size circuits then $\mathsf{PH} = \Sigma_2^{\mathsf{p}}$, which is taken as evidence that $\mathsf{NP}$-complete problems do not have small circuits ([[complexity/randomised-complexity]]). As of 2026 it is not known whether $\mathsf{PH}$ is infinite, nor even whether $\mathsf{P} \ne \mathsf{PH}$ — which is equivalent to $\mathsf{P} \ne \mathsf{NP}$. Whether $\mathsf{PH} = \mathsf{PSPACE}$ is open too; if it were, the hierarchy would collapse, since $\mathsf{PSPACE}$ has a complete problem, which would lie in some fixed level $\Sigma_k^{\mathsf{p}}$.

::: example Placing problems in the hierarchy {#ex-ph}
Place each problem at the lowest level of $\mathsf{PH}$ you can justify. (a) Given a graph $G$ and $k$, is the largest clique of $G$ of size **exactly** $k$? (b) Given a formula $\varphi(x, y)$ in two groups of variables, is there an $x$ such that $\varphi(x, y)$ holds for all $y$? (c) Given a formula $\varphi$ and $k$, is there a formula of size at most $k$ equivalent to $\varphi$?
::: solution
(a) "There is a $k$-clique" is in $\mathsf{NP}$ and "there is no $(k+1)$-clique" is in $\mathsf{coNP}$; their conjunction is in the class $\mathsf{DP} = \{L_1 \cap L_2 : L_1 \in \mathsf{NP}, L_2 \in \mathsf{coNP}\}$, which lies inside $\Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ (and inside $\mathsf{P}^{\mathsf{NP}}$: two oracle queries). Written with quantifiers: $\exists S\, \forall T$ ($S$ is a $k$-clique and $T$ is not a $(k+1)$-clique) — $\Sigma_2^{\mathsf{p}}$.
(b) $\exists x\, \forall y\ \varphi(x, y)$: this is $\Sigma_2\mathit{SAT}$ itself, $\Sigma_2^{\mathsf{p}}$-complete.
(c) $\exists \psi\ (\lvert\psi\rvert \le k)\ \forall a\ \psi(a) = \varphi(a)$: in $\Sigma_2^{\mathsf{p}}$. (The question in the text, "is $\varphi$ minimal", is $\forall\exists$, the complementary form, in $\Pi_2^{\mathsf{p}}$.)
:::
:::

::: history
Juris Hartmanis and Richard Stearns proved the time hierarchy theorem in "On the computational complexity of algorithms" (1965), and Richard Stearns, Juris Hartmanis and Philip Lewis the space hierarchy theorem the same year; Frederick Hennie and Stearns's two-tape simulation (1966) sharpened the time version to the form given here. Stephen Cook proved a nondeterministic time hierarchy in 1972, later refined by Joel Seiferas, Michael Fischer and Albert Meyer (1978) and Stanislav Žák (1983). Allan Borodin's gap theorem appeared in 1972. Theodore Baker, John Gill and Robert Solovay published "Relativizations of the P =? NP question" in 1975. Albert Meyer and Larry Stockmeyer defined the polynomial hierarchy in 1972, and Stockmeyer and Celia Wrathall developed it in 1976. Alexander Razborov and Steven Rudich's natural-proofs barrier was presented in 1994 and published in 1997 (Gödel Prize 2007); Scott Aaronson and Avi Wigderson's algebrisation barrier was presented in 2008 and published in 2009.
:::

## Where this leads

Randomised computation, in [[complexity/randomised-complexity]], fits inside the polynomial hierarchy: $\mathsf{BPP} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$, proved with a quantifier argument like the ones above. The hierarchy theorems are also the starting point for **fine-grained complexity**, which asks for exact exponents within $\mathsf{P}$ (is edit distance solvable in time $n^{2 - \varepsilon}$?) under conjectures such as the Strong Exponential Time Hypothesis of [[complexity/coping-with-hardness]].

::: summary
- **Constructible** bounds can be computed within the bound itself ([[#def-constructible]]); all usual functions are constructible, and without constructibility gap theorems hold ([[#warn-gap]]).
- **Space hierarchy**: for space-constructible $f$, $\mathsf{SPACE}(o(f)) \subsetneq \mathsf{SPACE}(f)$ ([[#thm-space-hierarchy]]); with Savitch, $\mathsf{NL} \subsetneq \mathsf{PSPACE}$.
- **Time hierarchy**: for time-constructible $t$, $\mathsf{TIME}(o(t/\log t)) \subsetneq \mathsf{TIME}(t)$ ([[#thm-time-hierarchy]]); hence $\mathsf{P} \subsetneq \mathsf{EXP}$, and $\mathsf{EXP}$-complete problems are provably not in $\mathsf{P}$.
- Both proofs are clocked diagonalisations with padded inputs; they relativise. **Baker–Gill–Solovay**: $\mathsf{P}^A = \mathsf{NP}^A$ for $A = \mathit{TQBF}$, but $\mathsf{P}^B \ne \mathsf{NP}^B$ for a constructed $B$ ([[#thm-bgs]]), so relativising techniques cannot settle $\mathsf{P}$ versus $\mathsf{NP}$.
- The **polynomial hierarchy**: $\Sigma_k^{\mathsf{p}}$ is defined by $k$ alternating polynomially bounded quantifiers ([[#def-ph]]); $\Sigma_1^{\mathsf{p}} = \mathsf{NP}$, $\Sigma_2^{\mathsf{p}} = \mathsf{NP}^{\mathsf{NP}}$, and $\mathsf{PH} \subseteq \mathsf{PSPACE}$ ([[#thm-ph]]).
- If $\Sigma_k^{\mathsf{p}} = \Pi_k^{\mathsf{p}}$ the hierarchy collapses to level $k$ ([[#thm-ph-collapse]]); it is believed infinite, and this is open as of 2026.
:::

## Exercises

::: exercise Counting separations {level=1 check="2"}
For how many of these pairs does [[#thm-time-hierarchy]] prove $\mathsf{TIME}(f) \subsetneq \mathsf{TIME}(g)$: (i) $f = n$, $g = n^{1.5}$; (ii) $f = n^2$, $g = n^2 \log n$; (iii) $f = 2^n$, $g = 2^{2n}$; (iv) $f = n \log n$, $g = n \log^2 n$? (Enter the number.)
::: solution
The theorem needs $f = o(g/\log g)$. (i) $g/\log g = n^{1.5}/(1.5\log n)$, and $n = o(n^{1.5}/\log n)$: yes. (ii) $g/\log g = n^2\log n/(2\log n + \log\log n) = \Theta(n^2)$: $n^2$ is not $o(n^2)$, no. (iii) $g/\log g = 2^{2n}/(2n)$, and $2^n = o(2^{2n}/n)$: yes. (iv) $g/\log g = \Theta(n\log n)$: no. Two pairs.
:::
:::

::: exercise Where is the strict inclusion? {level=1}
Explain why at least one of $\mathsf{L} \subseteq \mathsf{NL} \subseteq \mathsf{P} \subseteq \mathsf{NP} \subseteq \mathsf{PSPACE}$ is strict, and why the argument does not tell us which.
::: solution
$\mathsf{L} \subsetneq \mathsf{PSPACE}$ by [[#cor-space-hierarchy]]. If all four inclusions were equalities, $\mathsf{L}$ would equal $\mathsf{PSPACE}$. The argument is a counting argument on the chain: it proves the endpoints differ, but separating any particular pair (such as $\mathsf{P}$ from $\mathsf{PSPACE}$) requires comparing time with space or determinism with nondeterminism, which the hierarchy theorems do not do.
:::
:::

::: exercise Levels of the hierarchy {level=1}
Give the lowest level of $\mathsf{PH}$ known to contain each problem: (a) $\mathit{TAUT}$; (b) "is the formula $\exists x\, \forall y\, \exists z\ \psi$ true?" for a given $\psi$; (c) $\mathit{TQBF}$; (d) $\mathit{PATH}$.
::: solution
(a) $\Pi_1^{\mathsf{p}} = \mathsf{coNP}$. (b) $\Sigma_3^{\mathsf{p}}$ (three alternating blocks starting with $\exists$). (c) $\mathit{TQBF}$ has unboundedly many alternations; it is $\mathsf{PSPACE}$-complete and is in $\mathsf{PH}$ only if $\mathsf{PH} = \mathsf{PSPACE}$, which would collapse the hierarchy. (d) $\Sigma_0^{\mathsf{p}} = \mathsf{P}$ (in fact in $\mathsf{NL}$).
:::
:::

::: exercise If P = NP {level=2}
Prove directly, by induction on $k$, that if $\mathsf{P} = \mathsf{NP}$ then $\Sigma_k^{\mathsf{p}} = \mathsf{P}$ for every $k$.
::: solution
$k = 0$ holds by definition. Suppose $\Sigma_k^{\mathsf{p}} = \mathsf{P}$, so also $\Pi_k^{\mathsf{p}} = \mathsf{P}$ ($\mathsf{P}$ is closed under complement). For $L \in \Sigma_{k+1}^{\mathsf{p}}$, $w \in L \iff \exists y\, [\langle w, y\rangle \in L']$ with $L' \in \Pi_k^{\mathsf{p}} = \mathsf{P}$ and $\lvert y\rvert \le p(\lvert w\rvert)$. Then $L$ has the polynomial-time verifier "decide $\langle w, y\rangle \in L'$", so $L \in \mathsf{NP} = \mathsf{P}$. Hence $\Sigma_{k+1}^{\mathsf{p}} = \mathsf{P}$.
:::
:::

::: exercise P with an NP oracle {level=2}
Show that $\mathsf{P}^{\mathsf{NP}}$ is closed under complement and contains $\mathsf{NP} \cup \mathsf{coNP}$, and that $\mathsf{P}^{\mathsf{NP}} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$.
::: solution
Swapping the accept and reject states of a deterministic oracle machine decides the complement with the same oracle. For $L \in \mathsf{NP}$, $L \le_p \mathit{SAT}$, so a machine computes the reduction and asks one query; for $\mathsf{coNP}$, negate the answer. $\mathsf{P}^{\mathsf{NP}} \subseteq \mathsf{NP}^{\mathsf{NP}} = \Sigma_2^{\mathsf{p}}$ (a deterministic machine is a special nondeterministic one); by closure under complement, $\mathsf{P}^{\mathsf{NP}} \subseteq \mathrm{co}\Sigma_2^{\mathsf{p}} = \Pi_2^{\mathsf{p}}$ as well.
:::
:::

::: exercise A bounded halting problem {level=2}
Let $\mathit{BH}_{\exp} = \{\langle M, w, t\rangle : M$ accepts $w$ within $t$ steps$\}$ with $t$ written in **binary**. Show that it is $\mathsf{EXP}$-complete, and conclude that it is not in $\mathsf{P}$.
::: solution
*In $\mathsf{EXP}$:* simulate $M$ on $w$ for $t \le 2^{\lvert t\rvert}$ steps; with the efficient simulation this takes time polynomial in $t$ and $\lvert\langle M\rangle\rvert$, i.e. $2^{O(n)}$ in the input length $n$. *Hard:* if $A \in \mathsf{EXP}$ is decided by $M_A$ in time $2^{n^k}$, map $w$ to $\langle M_A, w, 2^{\lvert w\rvert^k}\rangle$; the number $2^{\lvert w\rvert^k}$ has $\lvert w\rvert^k + 1$ bits, so the map is computable in polynomial time. By [[#cor-time-hierarchy]] (3), $\mathit{BH}_{\exp} \notin \mathsf{P}$. (Compare the unary version in [[complexity/np-completeness]], which is $\mathsf{NP}$-complete for nondeterministic machines and $\mathsf{P}$-complete for deterministic ones.)
:::
:::

::: exercise Space hierarchy below log {level=3}
Why does [[#thm-space-hierarchy]] require $f(n) \ge \log n$? Show that $\mathsf{SPACE}(1)$ is exactly the class of regular languages, and explain whether $\mathsf{SPACE}(1) \subsetneq \mathsf{SPACE}(\log n)$.
::: solution
The proof counts configurations as $2^{O(f(n))}$, which requires the input-head position ($\log n$ bits) to be absorbed into $O(f(n))$; with $f(n) < \log n$ the machine cannot even store a position in its input, and the step counter of stage 3 would need about $\log n$ bits. In fact $\mathsf{SPACE}(o(\log\log n))$ equals $\mathsf{SPACE}(1)$ (Stearns, Hartmanis and Lewis, 1965), so there is a genuine gap below $\log\log n$. $\mathsf{SPACE}(1)$: a machine with a constant number of work cells has a constant number of work configurations, which can be folded into the state; a two-way finite automaton results, and two-way DFAs recognise exactly the regular languages (Rabin–Scott, Shepherdson, 1959). Since $\{0^k1^k\} \in \mathsf{L}$ ([[complexity/space-complexity#ex-sat-space]]) is not regular, $\mathsf{SPACE}(1) \subsetneq \mathsf{SPACE}(\log n)$, even though the hierarchy theorem itself does not apply at this level.
:::
:::

::: exercise An oracle making P = NP = PSPACE {level=3}
Let $A = \mathit{TQBF}$. Show that $\mathsf{PSPACE}^A = \mathsf{P}^A$ as well, and explain why this means that a relativising proof cannot show $\mathsf{P} \ne \mathsf{PSPACE}$ either. Does the space hierarchy theorem relativise, and is that consistent?
::: solution
A polynomial-space machine with oracle $\mathit{TQBF}$ asks queries of polynomial length, each of which it could answer itself in polynomial space; so $\mathsf{PSPACE}^A = \mathsf{PSPACE} = \mathsf{P}^A$ by the proof of [[#thm-bgs]]. Hence any relativising proof of $\mathsf{P} \ne \mathsf{PSPACE}$ would also prove $\mathsf{P}^A \ne \mathsf{PSPACE}^A$, which is false. The space hierarchy theorem relativises if oracle machines' query tapes count towards space (a standard convention), giving $\mathsf{L}^A \subsetneq \mathsf{PSPACE}^A$. This is consistent: with $A = \mathit{TQBF}$, $\mathsf{L}^A$ is a small class (a log-space machine can only write short queries), while $\mathsf{P}^A = \mathsf{PSPACE}^A$; the hierarchy separates space from space, never time from space.
:::
:::
