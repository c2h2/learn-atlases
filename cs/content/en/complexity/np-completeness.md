By the early 1970s computer scientists had a long list of problems — scheduling, routing, colouring, covering, packing, satisfiability — for which nobody had found a polynomial-time algorithm, despite much effort. Each looked like its own separate failure. Then Stephen Cook (1971) and Leonid Levin (1973) proved something remarkable: there is a single problem, Boolean satisfiability, to which *every* problem in $\mathsf{NP}$ can be translated efficiently. A polynomial-time algorithm for satisfiability would give one for every problem in $\mathsf{NP}$. A year later Richard Karp showed that twenty-one of the classic hard problems had the same property. The separate failures turned out to be one failure, seen from many sides.

This chapter develops the tools behind that discovery. **Polynomial-time reductions** compare the difficulty of problems; a problem is **$\mathsf{NP}$-complete** if it is in $\mathsf{NP}$ and every problem in $\mathsf{NP}$ reduces to it. We prove the **Cook–Levin theorem**, that satisfiability is $\mathsf{NP}$-complete, in full — it is the one place where we must reason directly about the computations of an arbitrary nondeterministic machine — and then show that the restricted problem $\mathit{3SAT}$ is $\mathsf{NP}$-complete too, which makes it the starting point for the many reductions of [[complexity/np-complete-problems]].

## Polynomial-time reductions

Reductions were the main tool of [[theory-of-computation/reductions]]. There a reduction only had to be computable; now it must also be fast, otherwise it could solve the problem itself.

::: definition Polynomial-time computable function {#def-poly-computable}
A function $f\colon \Sigma^* \to \Sigma^*$ is **polynomial-time computable** if some deterministic Turing machine, on every input $w$, halts within $p(\lvert w\rvert)$ moves, for a polynomial $p$, with exactly $f(w)$ on its tape.
:::

In particular $\lvert f(w)\rvert \le p(\lvert w\rvert)$: a machine cannot write more symbols than it makes moves.

::: definition Polynomial-time reduction {#def-poly-reduction}
A language $A$ is **polynomial-time (mapping) reducible** to $B$, written $A \le_p B$, if there is a polynomial-time computable $f$ such that for every $w$,

$$
w \in A \iff f(w) \in B.
$$ {#eq-poly-reduction}
:::

This is the mapping reduction of [[theory-of-computation/reductions#def-mapping-reduction]] with a time bound. It is often called a **Karp reduction**; reductions that may call a subroutine for $B$ many times and post-process the answers are **Cook reductions** (polynomial-time Turing reductions). We use Karp reductions throughout, because they keep $\mathsf{NP}$ and $\mathsf{coNP}$ apart ([[#ex-conp-reduction]]).

::: theorem Properties of polynomial-time reductions {#thm-reduction-p}
Let $A \le_p B$.

1. If $B \in \mathsf{P}$ then $A \in \mathsf{P}$.
2. If $B \in \mathsf{NP}$ then $A \in \mathsf{NP}$.
3. If $B \le_p C$ then $A \le_p C$ (transitivity).
4. $\overline{A} \le_p \overline{B}$ by the same function.
:::

::: proof
Let $f$ be computed in time $p(n)$. (1) If $M$ decides $B$ in time $q(n)$, then "on input $w$, compute $f(w)$ and run $M$ on it" decides $A$, by [[#eq-poly-reduction]]. Since $\lvert f(w)\rvert \le p(n)$, it runs in time $p(n) + q(p(n))$, a polynomial. (2) If $V$ verifies $B$, then "on input $\langle w, c\rangle$, run $V$ on $\langle f(w), c\rangle$" verifies $A$: $w \in A$ iff $f(w)$ has a certificate iff $w$ does. Its running time is polynomial in $\lvert w\rvert$ for the same reason. (3) If $g$ reduces $B$ to $C$ in time $q(n)$, then $g \circ f$ reduces $A$ to $C$ in time $p(n) + q(p(n))$. (4) [[#eq-poly-reduction]] is equivalent to $w \notin A \iff f(w) \notin B$.
:::

So $A \le_p B$ means "$B$ is at least as hard as $A$, up to polynomial factors". The direction is everything: to show that a new problem $B$ is hard, reduce a known hard problem *to* $B$.

::: example Cliques and independent sets {#ex-clique-is}
An **independent set** in a graph is a set of vertices no two of which are adjacent; $\mathit{IS} = \{\langle G, k\rangle : G$ has an independent set of size $k\}$. Show that $\mathit{CLIQUE} \le_p \mathit{IS}$ and $\mathit{IS} \le_p \mathit{CLIQUE}$.
::: solution
The **complement** $\overline{G}$ of $G = (V, E)$ has the same vertices and an edge between $u \ne v$ exactly when $\{u, v\} \notin E$. A set $S$ is a clique in $G$ iff every pair in $S$ is an edge of $G$ iff no pair in $S$ is an edge of $\overline{G}$ iff $S$ is independent in $\overline{G}$. So $f(\langle G, k\rangle) = \langle\overline{G}, k\rangle$ satisfies $\langle G, k\rangle \in \mathit{CLIQUE} \iff f(\langle G, k\rangle) \in \mathit{IS}$, and computing $\overline{G}$ from an adjacency matrix means flipping $n^2 - n$ bits: polynomial time. Since $\overline{\overline{G}} = G$, the same map reduces $\mathit{IS}$ to $\mathit{CLIQUE}$. For instance, in the graph of [[complexity/np#ex-verifiers]] the triangle $\{2, 3, 4\}$ is an independent set of the complement.
:::
:::

## NP-completeness

::: definition NP-hard and NP-complete {#def-npc}
A language $B$ is **$\mathsf{NP}$-hard** if $A \le_p B$ for every $A \in \mathsf{NP}$. It is **$\mathsf{NP}$-complete** if, in addition, $B \in \mathsf{NP}$.
:::

::: theorem NP-complete problems and P versus NP {#thm-npc}
1. If some $\mathsf{NP}$-complete language is in $\mathsf{P}$, then $\mathsf{P} = \mathsf{NP}$.
2. If $\mathsf{P} \ne \mathsf{NP}$, then no $\mathsf{NP}$-complete language is in $\mathsf{P}$.
3. If $B$ is $\mathsf{NP}$-complete, $B \le_p C$ and $C \in \mathsf{NP}$, then $C$ is $\mathsf{NP}$-complete.
:::

::: proof
(1) Let $B \in \mathsf{P}$ be $\mathsf{NP}$-complete and $A \in \mathsf{NP}$. Then $A \le_p B$, so $A \in \mathsf{P}$ by [[#thm-reduction-p]] (1). Hence $\mathsf{NP} \subseteq \mathsf{P}$, and $\mathsf{P} \subseteq \mathsf{NP}$ always holds. (2) is the contrapositive. (3) For $A \in \mathsf{NP}$, $A \le_p B$ and $B \le_p C$, so $A \le_p C$ by transitivity; and $C \in \mathsf{NP}$ is assumed.
:::

Part (3) is the engine of the theory: once one $\mathsf{NP}$-complete problem is known, each new one needs only a single reduction from a known one, not a reduction from every problem in $\mathsf{NP}$. The first one, however, must be proved from scratch.

::: warning Three common confusions about NP-hardness
1. **Direction.** "I reduced my problem $X$ to $\mathit{SAT}$, so $X$ is $\mathsf{NP}$-hard" is wrong: $X \le_p \mathit{SAT}$ shows that $X$ is *at most* as hard as $\mathit{SAT}$, i.e. $X \in \mathsf{NP}$. Hardness needs $\mathit{SAT} \le_p X$.
2. **$\mathsf{NP}$-hard is not $\mathsf{NP}$-complete.** An $\mathsf{NP}$-hard problem need not be in $\mathsf{NP}$, or even decidable: $\mathit{HALT}_{\mathsf{TM}}$ is $\mathsf{NP}$-hard ([[#ex-halt-np-hard]]).
3. **Hard instances, not all instances.** $\mathsf{NP}$-completeness is a worst-case statement. It says nothing about the instances you actually have, many of which may be easy — which is why SAT solvers work so well in practice ([[complexity/coping-with-hardness]]).
:::

If $\mathsf{P} \ne \mathsf{NP}$, is every problem in $\mathsf{NP}$ either in $\mathsf{P}$ or $\mathsf{NP}$-complete? No: **Ladner's theorem** (1975) says that if $\mathsf{P} \ne \mathsf{NP}$ then there are problems in $\mathsf{NP} \setminus \mathsf{P}$ that are not $\mathsf{NP}$-complete ("$\mathsf{NP}$-intermediate"). The problems constructed in the proof are artificial; natural candidates are factoring and graph isomorphism, but no natural problem has been proved $\mathsf{NP}$-intermediate under the assumption $\mathsf{P} \ne \mathsf{NP}$ alone.

## Satisfiability

::: definition Boolean formulas and CNF {#def-cnf-formula}
A **Boolean formula** is built from **variables** $x_1, x_2, \dots$ (taking values $\mathsf{true}$/$\mathsf{false}$, or $1$/$0$) with $\land$, $\lor$ and $\lnot$. A **literal** is a variable $x$ or its negation $\overline{x}$; a **clause** is a disjunction of literals, such as $(x_1 \lor \overline{x_2} \lor x_4)$; a formula is in **conjunctive normal form** (CNF) if it is a conjunction of clauses, and in **3CNF** if every clause has exactly three literals. A formula is **satisfiable** if some assignment of values to its variables makes it true. We define
$$
\mathit{SAT} = \{\langle\varphi\rangle : \varphi \text{ is a satisfiable Boolean formula}\}, \qquad \mathit{3SAT} = \{\langle\varphi\rangle : \varphi \text{ is a satisfiable 3CNF formula}\}.
$$
:::

A CNF formula is true iff *every* clause contains *at least one* true literal. Both problems are in $\mathsf{NP}$: the certificate is a satisfying assignment, which is checked by evaluating the formula in linear time. Truth tables ([Maths Atlas: propositional logic](/learn/maths/lesson.php?c=discrete&l=logic)) decide satisfiability in time $2^n$ times the formula length.

::: widget truthtable
formula: (a | b | c) & ~(a & b) & ~(a & c) & ~(b & c)
caption: "Exactly one of $a, b, c$ is true", written in CNF: one clause says *at least one*, and three clauses $\lnot(a \land b) \equiv (\overline{a} \lor \overline{b})$ etc. say *at most one*. The formula is true in exactly three rows. The Cook–Levin construction below uses one such formula per tableau cell, with one variable for each symbol the cell might hold; with $\ell$ symbols it has $1 + \binom{\ell}{2}$ clauses.
:::

## The Cook–Levin theorem

::: theorem Cook–Levin theorem {#thm-cook-levin}
$\mathit{SAT}$ is $\mathsf{NP}$-complete.
:::

We already know $\mathit{SAT} \in \mathsf{NP}$. For hardness, let $A \in \mathsf{NP}$ be arbitrary. By [[complexity/np#thm-np-ntm]] some nondeterministic single-tape Turing machine $N$ decides $A$ in polynomial time; we must give a polynomial-time reduction that turns each input $w$ into a formula $\varphi_w$ that is satisfiable iff $N$ accepts $w$. The idea: a satisfying assignment of $\varphi_w$ *is* an accepting computation of $N$ on $w$, laid out as a table, and the clauses of $\varphi_w$ check that the table is correct — exactly what a verifier does with a certificate, but now the checking is done by a formula.

### The tableau

Fix $N = (Q, \Sigma, \Gamma, \delta, q_0, q_{\text{acc}}, q_{\text{rej}})$ and $k$ such that, for inputs of length $n \ge 2$, every branch of $N$ halts within $T = n^k$ moves. (Small inputs can be handled by a lookup table inside the reduction.) We use the configuration notation $u\,q\,v$ of [[theory-of-computation/turing-machines#def-tm-config]], and we make one harmless convention: a halting configuration **yields itself**. Then every branch can be extended to exactly $T$ moves, and $N$ accepts $w$ iff some sequence $C_0, C_1, \dots, C_T$ of configurations, each yielding the next, starts with $q_0 w$ and contains $q_{\text{acc}}$.

In $T$ moves the head visits only tape cells $1, \dots, T + 1$, so every configuration fits in a row of $W = T + 4$ symbols: a $\#$, then the contents of cells $1, \dots, T+1$ with the state symbol inserted just before the scanned cell ($T + 2$ symbols), then a $\#$.

::: definition Tableau {#def-tableau}
A **tableau** for $N$ on $w$ is a $(T + 1) \times W$ table over the alphabet $C = Q \cup \Gamma \cup \{\#\}$ whose rows are configurations written as above. It is **accepting** if its first row is the start configuration $\#\,q_0\,w_1 \cdots w_n \sqcup \cdots \sqcup\,\#$, each row yields the next, and some row contains $q_{\text{acc}}$.
:::

So $N$ accepts $w$ iff an accepting tableau exists. Now we describe a tableau by Boolean variables: for every row $i \in \{0, \dots, T\}$, column $j \in \{1, \dots, W\}$ and symbol $s \in C$, a variable

$$
x_{i, j, s} \quad \text{meaning "cell } (i, j) \text{ contains } s\text{"}.
$$

There are $(T + 1)\,W\,\lvert C\rvert = O(n^{2k})$ of them, since $\lvert C\rvert$ is a constant depending only on $N$. The formula is

$$
\varphi_w = \varphi_{\text{cell}} \land \varphi_{\text{start}} \land \varphi_{\text{accept}} \land \varphi_{\text{move}}.
$$ {#eq-cook-levin}

**Each cell holds exactly one symbol.**
$$
\varphi_{\text{cell}} = \bigwedge_{i, j}\Bigl[\Bigl(\bigvee_{s \in C} x_{i, j, s}\Bigr) \land \bigwedge_{s \ne t \in C}\bigl(\overline{x_{i, j, s}} \lor \overline{x_{i, j, t}}\bigr)\Bigr].
$$
An assignment satisfying $\varphi_{\text{cell}}$ therefore describes a table: each cell has exactly one symbol, as in the truth table above.

**The first row is the start configuration.**
$$
\varphi_{\text{start}} = x_{0,1,\#} \land x_{0,2,q_0} \land x_{0,3,w_1} \land \cdots \land x_{0,n+2,w_n} \land x_{0,n+3,\sqcup} \land \cdots \land x_{0,W-1,\sqcup} \land x_{0,W,\#}.
$$

**Some cell holds the accept state.**
$$
\varphi_{\text{accept}} = \bigvee_{i, j} x_{i, j, q_{\text{acc}}}.
$$

**Each row yields the next.** This is the heart of the proof. We cannot write "row $i + 1$ follows from row $i$" directly, but it turns out to be enough to check small pieces. A **window** is a $2 \times 3$ block of cells, rows $i, i+1$ and columns $j - 1, j, j + 1$ for $1 \le i + 1 \le T$, $2 \le j \le W - 1$.

::: definition Legal window {#def-legal-window}
A $2 \times 3$ array of symbols of $C$ is a **legal window** if it occurs, at some position, in some pair of rows $(R, R')$ of width $W$ in which $R$ is a configuration and $R$ yields $R'$.
:::

When $R$ yields $R'$, the two rows differ at most in the three cells around the state symbol: a move to the right turns $u\,a\,q\,b\,v$ into $u\,a\,c\,q'\,v$, a move to the left turns it into $u\,q'\,a\,c\,v$, and at the left end $\#\,q\,b\,v$ becomes $\#\,q'\,c\,v$. So whether a given array is a legal window depends only on its six symbols and on $\delta$ (one checks the constantly many positions the state symbol could have relative to the window), and the set of legal windows is a finite set that the reduction can compute once and for all from $N$. Now set

$$
\varphi_{\text{move}} = \bigwedge_{i = 0}^{T - 1}\ \bigwedge_{j = 2}^{W - 1}\ \bigvee_{\substack{\text{legal windows}\\ (a_1, a_2, a_3;\ b_1, b_2, b_3)}} \bigl(x_{i, j-1, a_1} \land x_{i, j, a_2} \land x_{i, j+1, a_3} \land x_{i+1, j-1, b_1} \land x_{i+1, j, b_2} \land x_{i+1, j+1, b_3}\bigr).
$$

It says: every window of the table is legal.

::: example Which windows are legal? {#ex-windows}
Let $N$ have $\Gamma = \{0, 1, \sqcup\}$ and the transitions $\delta(q, 0) = \{(r, 1, R)\}$ and $\delta(q, 1) = \{(q, 0, L), (r, 1, R)\}$. Which of these windows (top row over bottom row) are legal?

$$
\text{(a) } \begin{smallmatrix} 0 & q & 1\\ q & 0 & 0\end{smallmatrix} \quad
\text{(b) } \begin{smallmatrix} 0 & q & 1\\ 0 & 0 & r\end{smallmatrix} \quad
\text{(c) } \begin{smallmatrix} 1 & 0 & 0\\ 1 & 0 & 1\end{smallmatrix} \quad
\text{(d) } \begin{smallmatrix} 0 & 0 & 0\\ 0 & 0 & q\end{smallmatrix} \quad
\text{(e) } \begin{smallmatrix} 0 & 0 & 0\\ 0 & 0 & r\end{smallmatrix} \quad
\text{(f) } \begin{smallmatrix} 1 & 0 & 0\\ r & 0 & 0\end{smallmatrix}
$$
::: solution
(a) Legal: in state $q$ reading $1$, the move $(q, 0, L)$ turns $0\,q\,1$ into $q\,0\,0$. (b) Illegal: the only right move from $(q, 1)$ writes $1$, giving $0\,1\,r$, not $0\,0\,r$. (c) Illegal: no state symbol is in the top row, so the state is at least one column outside the window; a change in the right-hand cell $0 \to 1$ would need the state to be immediately to its right, and the cell immediately to the left of the state changes only into a state symbol (on a left move) or not at all. (d) Legal: a state $q$ just to the right of the window, reading $1$, moving left via $(q, 0, L)$, puts the new state $q$ into the bottom-right cell. (e) Illegal: no left move enters $r$. (f) Legal: the state was just to the left of the window, reading the $1$; the right move $(r, 1, R)$ turns that $1$ into $r$. A brute-force program that builds all pairs of rows of width $8$ for this machine and collects their windows agrees with all six answers. Note how (d) and (f) show windows whose top row has no state at all but whose bottom row does: the window sees only part of a move.
:::
:::

### Why local checks suffice

::: lemma Legal windows force legal moves {#lem-windows}
Let $R$ be a configuration row of width $W$ and $R'$ any row of width $W$. If every window formed by $R$ above $R'$ is legal, then $R$ yields $R'$.
:::

::: proof
Let the state symbol of $R$ be in column $j$, so the scanned symbol is in column $j + 1$.

*Columns away from the state are copied.* Take a column $p$ with $\lvert p - j\rvert \ge 2$ and $2 \le p \le W - 1$. The window centred at $p$ is legal, so it occurs in some pair $(S, S')$ with $S$ yielding $S'$; its top row contains no state symbol, so the state of $S$ is at distance at least $2$ from the window's middle column, and the middle cell is not among the three cells that change. Hence $R'[p] = R[p]$. The end columns $1$ and $W$ hold $\#$ in $R$; in any pair $(S, S')$ with $S$ yielding $S'$ the $\#$ cells are unchanged, so the legal windows centred at $2$ and $W - 1$ force $R'[1] = R'[W] = \#$.

*The cells around the state follow one transition.* The window centred at $j$ has top row $R[j-1]\,R[j]\,R[j+1] = a\,q\,b$ and is legal, so it occurs in a pair $(S, S')$ where $S$ has state $q$ scanning $b$ with $a$ (a tape symbol or $\#$) to its left, and the bottom row of the window is what one particular move $\tau \in \delta(q, b)$ — or, if $q$ is halting, no move — makes of $a\,q\,b$: $a\,c\,q'$ for a right move, $q'\,a\,c$ for a left move with $a \ne \#$, $\#\,q'\,c$ at the left end, $a\,q\,b$ for a halting state. In each case those three cells are all the move changes. Applying the same $\tau$ to $R$ (which has the same $q$, $b$ and $a$) changes exactly columns $j - 1, j, j + 1$ in the same way and leaves every other column alone. By the previous paragraph $R'$ agrees with $R$ outside those columns, and by the window it agrees with the result of $\tau$ inside them. So $R'$ is the configuration that $R$ yields by $\tau$.
:::

::: proof of the Cook–Levin theorem
*Correctness.* Suppose $N$ accepts $w$. Take an accepting branch, extend it to $T$ moves by repeating the halting configuration, and write the configurations as a tableau. Set $x_{i, j, s}$ true iff cell $(i, j)$ holds $s$. Then $\varphi_{\text{cell}}$, $\varphi_{\text{start}}$ and $\varphi_{\text{accept}}$ hold by construction, and every window is legal because each row yields the next. So $\varphi_w$ is satisfied.

Conversely, suppose an assignment satisfies $\varphi_w$. By $\varphi_{\text{cell}}$ it describes a table with one symbol per cell; by $\varphi_{\text{start}}$ row $0$ is the start configuration; by $\varphi_{\text{move}}$ every window is legal. By [[#lem-windows]] and induction on $i$, every row $i$ is a configuration that the previous row yields: row $0$ is a configuration, and if row $i$ is one, then row $i+1$ is the configuration it yields. So the rows form a branch of $N$'s computation on $w$, and by $\varphi_{\text{accept}}$ this branch reaches $q_{\text{acc}}$. Hence $N$ accepts $w$, i.e. $w \in A$.

*Size and time.* $\varphi_{\text{cell}}$ has $O(1)$ literals per cell, $O(n^{2k})$ in all; $\varphi_{\text{start}}$ has $W = O(n^k)$ literals; $\varphi_{\text{accept}}$ has $O(n^{2k})$; $\varphi_{\text{move}}$ has a constant-size subformula (at most $\lvert C\rvert^6$ windows of $6$ literals) per window position, $O(n^{2k})$ in all. Each variable name $x_{i,j,s}$ is written with $O(\log n)$ bits, so $\lvert\varphi_w\rvert = O(n^{2k}\log n)$. The reduction writes these pieces with simple nested loops over $i$, $j$ and the fixed tables of $N$, in time polynomial in $n$. So $w \mapsto \varphi_w$ is a polynomial-time reduction from $A$ to $\mathit{SAT}$. Since $A \in \mathsf{NP}$ was arbitrary, $\mathit{SAT}$ is $\mathsf{NP}$-hard.
:::

::: example How big is the Cook–Levin formula? {#ex-tableau-size}
A nondeterministic machine with $\lvert C\rvert = 12$ symbols runs in time $T = n^2$. For an input of length $n = 10$, how many variables does $\varphi_w$ have, and roughly how many clauses does $\varphi_{\text{cell}}$ contribute?
::: solution
$T = 100$, so the tableau has $T + 1 = 101$ rows and $W = T + 4 = 104$ columns: $101 \cdot 104 = 10\,504$ cells and $10\,504 \cdot 12 = 126\,048$ variables. Each cell contributes $1 + \binom{12}{2} = 67$ clauses to $\varphi_{\text{cell}}$, about $704\,000$ in all. Large, but polynomial: doubling $n$ multiplies these numbers by about $16 = 2^{2k}$ with $k = 2$. A direct deterministic simulation, by contrast, might explore $b^{100}$ branches.
:::
:::

The proof shows a little more than stated. The formula $\varphi_w$ is almost in CNF: $\varphi_{\text{cell}}$, $\varphi_{\text{start}}$ and $\varphi_{\text{accept}}$ are conjunctions of clauses, and each window constraint in $\varphi_{\text{move}}$ is a fixed formula on $6\lvert C\rvert$ variables, which can be rewritten as an equivalent CNF formula with a constant number of clauses (for example from its truth table: one clause excluding each falsifying assignment of the variables it mentions). So $\mathit{CNF\text{-}SAT}$, satisfiability restricted to CNF formulas, is $\mathsf{NP}$-complete too. Also, the satisfying assignment can be read off as an accepting computation, so the reduction carries certificates to certificates in both directions; reductions with this property are called **Levin reductions**.

::: quiz
Suppose a reduction from an arbitrary $A \in \mathsf{NP}$ to $\mathit{SAT}$ used a tableau with $T$ rows and $T$ columns where $T = 2^n$. What would go wrong?
- [ ] The formula would no longer be satisfiable when $w \in A$.
- [x] The reduction would not run in polynomial time.
- [ ] The proof of [[#lem-windows]] would fail.
- [ ] Nothing: any computable reduction proves $\mathsf{NP}$-hardness.
::: solution
The construction is still correct, but writing $\Theta(T^2) = \Theta(4^n)$ clauses takes exponential time, so it is not a polynomial-time reduction and proves nothing about $\mathsf{NP}$-hardness. (A computable but slow reduction could decide $A$ itself and output a fixed satisfiable or unsatisfiable formula.) The polynomial running time of $N$ is what keeps the tableau polynomial.
:::
:::

## 3SAT is NP-complete

Reductions from $\mathit{SAT}$ are easier to design when the formula has a rigid shape. The standard shape is 3CNF.

::: lemma Splitting a clause {#lem-clause-split}
Let $c = (\ell_1 \lor \ell_2 \lor \cdots \lor \ell_k)$ be a clause with $k \ge 4$ literals and let $z_1, \dots, z_{k-3}$ be new variables. Then
$$
c' = (\ell_1 \lor \ell_2 \lor z_1) \land (\overline{z_1} \lor \ell_3 \lor z_2) \land (\overline{z_2} \lor \ell_4 \lor z_3) \land \cdots \land (\overline{z_{k-3}} \lor \ell_{k-1} \lor \ell_k)
$$
has $k - 2$ clauses of three literals, and an assignment to the original variables satisfies $c$ iff it can be extended to the $z_i$ so as to satisfy $c'$.
:::

::: proof
Suppose the assignment makes some $\ell_m$ true. Set $z_i$ true for $i \le m - 2$ and false for $i \ge m - 1$. The clause containing $\ell_m$ is satisfied by $\ell_m$; every clause to its left contains a positive $z_i$ with $i \le m - 2$, which is true; every clause to its right contains a negative $\overline{z_i}$ with $i \ge m - 1$, which is true. (For $m \le 2$ all $z_i$ are false; for $m \ge k - 1$ all are true.) Conversely, suppose every $\ell_m$ is false but some extension satisfies $c'$. The first clause forces $z_1$ true; the second, now $(\overline{z_1} \lor \ell_3 \lor z_2)$ with $\overline{z_1}$ and $\ell_3$ false, forces $z_2$; and so on, until $z_{k-3}$ is true. Then the last clause $(\overline{z_{k-3}} \lor \ell_{k-1} \lor \ell_k)$ is false — a contradiction.
:::

::: theorem 3SAT is NP-complete {#thm-3sat}
$\mathit{3SAT}$ is $\mathsf{NP}$-complete.
:::

::: proof
$\mathit{3SAT} \in \mathsf{NP}$ as a special case of $\mathit{SAT}$. We reduce $\mathit{CNF\text{-}SAT}$, which is $\mathsf{NP}$-complete by the remark after the Cook–Levin proof, to $\mathit{3SAT}$. Given a CNF formula, replace each clause of $k \ge 4$ literals by the $k - 2$ clauses of [[#lem-clause-split]], each time with fresh variables; pad each clause of one or two literals to three by repeating a literal ($(\ell) \equiv (\ell \lor \ell \lor \ell)$, $(\ell_1 \lor \ell_2) \equiv (\ell_1 \lor \ell_2 \lor \ell_2)$). If the original formula is satisfied by some assignment, extend it clause by clause as in the lemma; the fresh variables of different clauses are disjoint, so the extensions do not conflict. If the new formula is satisfied, the lemma shows that the restriction to the original variables satisfies every original clause. The output has at most three times as many literals as the input, and is computed in linear time.
:::

::: example Splitting a five-literal clause {#ex-split}
Convert $(x_1 \lor \overline{x_2} \lor x_3 \lor x_4 \lor \overline{x_5})$ to 3CNF and check the result by brute force.
::: solution
With $k = 5$ we need $k - 3 = 2$ new variables $z_1 = x_6$, $z_2 = x_7$ and get $k - 2 = 3$ clauses:
$$
(x_1 \lor \overline{x_2} \lor z_1) \land (\overline{z_1} \lor x_3 \lor z_2) \land (\overline{z_2} \lor x_4 \lor \overline{x_5}).
$$
If, say, only $x_3$ is true among the literals (so $x_1 = 0$, $x_2 = 1$, $x_4 = 0$, $x_5 = 1$), the proof sets $z_1 = 1$, $z_2 = 0$, and all three clauses hold. The following program implements the reduction of [[#thm-3sat]] and compares satisfiability before and after on 2000 random CNF formulas with up to five variables and clauses of up to six literals.

```python
from itertools import product
import random

def to_3cnf(clauses, n):
    """Split long clauses; pad short ones. Returns (new clauses, new n)."""
    out = []
    for c in clauses:
        c = list(c)
        if len(c) <= 3:
            out.append((c + [c[0]] * 3)[:3])          # repeat a literal to get length 3
            continue
        z = n + 1; n += 1
        out.append([c[0], c[1], z])                   # (l1 v l2 v z1)
        for lit in c[2:-2]:
            out.append([-z, lit, z + 1]); z += 1; n += 1   # (~z_i v l_{i+2} v z_{i+1})
        out.append([-z, c[-2], c[-1]])                # (~z_last v l_{k-1} v l_k)
    return out, n

def sat(clauses, n):
    return any(all(any((l > 0) == a[abs(l) - 1] for l in c) for c in clauses)
               for a in product([False, True], repeat=n))

random.seed(1)
trials = mism = 0
for _ in range(2000):
    n = random.randint(1, 5)
    cls = [[random.choice([1, -1]) * random.randint(1, n) for _ in range(random.randint(1, 6))]
           for _ in range(random.randint(1, 5))]
    new, m = to_3cnf(cls, n)
    trials += 1; mism += sat(cls, n) != sat(new, m)
print(trials, "formulas,", mism, "mismatches")
print(to_3cnf([[1, -2, 3, 4, -5]], 5))
```

```console
$ python3 split.py
2000 formulas, 0 mismatches
([[1, -2, 6], [-6, 3, 7], [-7, 4, -5]], 7)
```

A test on random instances is not a proof — [[#lem-clause-split]] is — but it is a cheap way to catch an off-by-one error in an implementation of a reduction, and we use the same method for every reduction in [[complexity/np-complete-problems]].
:::
:::

What about clauses of two literals? $\mathit{2SAT}$ is in $\mathsf{P}$ (it reduces to strongly connected components of an "implication graph": [[complexity/coping-with-hardness]]), so the jump from two to three literals per clause is exactly where satisfiability becomes hard. No splitting trick can turn 3-clauses into 2-clauses while preserving satisfiability — unless $\mathsf{P} = \mathsf{NP}$, since such a polynomial-time reduction would put $\mathit{3SAT}$ in $\mathsf{P}$.

::: history
Stephen Cook proved that satisfiability (of formulas in what we call CNF) is complete for nondeterministic polynomial time in "The complexity of theorem-proving procedures", presented at the third ACM Symposium on Theory of Computing in May 1971. He used polynomial-time Turing reductions and also showed the completeness of 3-satisfiability and of subgraph isomorphism. Leonid Levin, working independently in Moscow, described six "universal search problems", including tiling and satisfiability, in "Universal sequential search problems" (*Problemy Peredachi Informatsii*, 1973); he had obtained the results around 1971–72 but delayed publication. Richard Karp's "Reducibility among combinatorial problems" (1972) introduced polynomial-time many-one reductions in their modern form and proved twenty-one problems $\mathsf{NP}$-complete, turning Cook's theorem into a method. Richard Ladner proved the existence of $\mathsf{NP}$-intermediate problems (assuming $\mathsf{P} \ne \mathsf{NP}$) in 1975. Cook received the Turing Award in 1982 and Karp in 1985; Levin received the Knuth Prize in 2012.
:::

## Where this leads

With $\mathit{3SAT}$ in hand, [[complexity/np-complete-problems]] proves the $\mathsf{NP}$-completeness of independent set, clique, vertex cover, Hamiltonian path and cycle, subset sum and 3-colouring by explicit gadget reductions. The tableau method itself is reused several times: with space instead of time it shows that $\mathit{TQBF}$ is $\mathsf{PSPACE}$-complete ([[complexity/space-complexity]]), and a probabilistic strengthening of the idea that "local checks suffice" lies at the heart of the PCP theorem ([[complexity/approximation-pcp]]).

::: summary
- $A \le_p B$ if a polynomial-time computable $f$ maps yes-instances to yes-instances and no-instances to no-instances ([[#def-poly-reduction]]); membership in $\mathsf{P}$ and in $\mathsf{NP}$ transfers from $B$ to $A$, and $\le_p$ is transitive ([[#thm-reduction-p]]).
- $B$ is $\mathsf{NP}$-hard if every $\mathsf{NP}$ language reduces to it, and $\mathsf{NP}$-complete if moreover $B \in \mathsf{NP}$ ([[#def-npc]]); one $\mathsf{NP}$-complete problem in $\mathsf{P}$ would give $\mathsf{P} = \mathsf{NP}$ ([[#thm-npc]]).
- To prove a new problem $\mathsf{NP}$-hard, reduce a known $\mathsf{NP}$-complete problem **to** it.
- **Cook–Levin** ([[#thm-cook-levin]]): an accepting computation of a polynomial-time NTM is a polynomial-size tableau, and a CNF-like formula checks it cell by cell and window by window; legal $2 \times 3$ windows force legal moves ([[#lem-windows]]).
- **$\mathit{3SAT}$ is $\mathsf{NP}$-complete** ([[#thm-3sat]]): long clauses split into chains of 3-clauses linked by new variables ([[#lem-clause-split]]), preserving satisfiability (not equivalence).
- If $\mathsf{P} \ne \mathsf{NP}$, there are problems in $\mathsf{NP}$ that are neither in $\mathsf{P}$ nor $\mathsf{NP}$-complete (Ladner).
:::

## Exercises

::: exercise What follows? {level=1}
Assume $\mathsf{P} \ne \mathsf{NP}$. For problems $X$ and $Y$, which conclusions are valid? (a) $X \le_p \mathit{SAT}$, so $X$ is $\mathsf{NP}$-complete. (b) $\mathit{SAT} \le_p X$ and $X \in \mathsf{NP}$, so $X \notin \mathsf{P}$. (c) $X \le_p Y$ and $Y \in \mathsf{P}$, so $X \in \mathsf{P}$. (d) $X \le_p Y$ and $X \notin \mathsf{P}$, so $Y$ is $\mathsf{NP}$-hard.
::: solution
(a) Invalid: this only shows $X \in \mathsf{NP}$; e.g. $\mathit{PATH} \le_p \mathit{SAT}$. (b) Valid: $X$ is $\mathsf{NP}$-complete, and by [[#thm-npc]] (2) not in $\mathsf{P}$. (c) Valid by [[#thm-reduction-p]] (1) (and needs no assumption). (d) Invalid: it shows $Y \notin \mathsf{P}$ but not that every $\mathsf{NP}$ problem reduces to $Y$; $X$ could be an $\mathsf{NP}$-intermediate problem.
:::
:::

::: exercise Counting tableau variables {level=1 check="7500"}
In a simplified version of the tableau with $n^k$ rows and $n^k$ columns, how many variables $x_{i,j,s}$ are there for $n = 5$, $k = 2$ and $\lvert C\rvert = 12$? (Enter the number.)
::: solution
$n^k = 25$, so there are $25 \cdot 25 = 625$ cells and $625 \cdot 12 = 7500$ variables.
:::
:::

::: exercise Splitting a long clause {level=1 check="4"}
How many 3-literal clauses does [[#lem-clause-split]] produce from a clause of $6$ literals, and how many new variables does it introduce? (Enter the number of clauses.)
::: solution
$k - 2 = 4$ clauses and $k - 3 = 3$ new variables: $(\ell_1 \lor \ell_2 \lor z_1)(\overline{z_1} \lor \ell_3 \lor z_2)(\overline{z_2} \lor \ell_4 \lor z_3)(\overline{z_3} \lor \ell_5 \lor \ell_6)$.
:::
:::

::: exercise The halting problem is NP-hard {#ex-halt-np-hard level=2}
Show that $\mathit{HALT}_{\mathsf{TM}} = \{\langle M, x\rangle : M$ halts on $x\}$ is $\mathsf{NP}$-hard. Is it $\mathsf{NP}$-complete?
::: solution
It suffices to show $\mathit{SAT} \le_p \mathit{HALT}_{\mathsf{TM}}$ (then use transitivity with Cook–Levin). Map $\varphi$ to $\langle M, \varphi\rangle$ where $M$ is the fixed machine "on input $\psi$, try all assignments; if one satisfies $\psi$, halt; otherwise loop for ever". The map just appends a constant string to $\varphi$, which takes linear time. $\varphi$ is satisfiable iff $M$ halts on $\varphi$. $\mathit{HALT}_{\mathsf{TM}}$ is not $\mathsf{NP}$-complete, because it is undecidable and every language in $\mathsf{NP}$ is decidable ([[complexity/np#thm-p-np-exp]]).
:::
:::

::: exercise If P = NP {level=2}
Prove that if $\mathsf{P} = \mathsf{NP}$, then every language $B \in \mathsf{P}$ other than $\emptyset$ and $\Sigma^*$ is $\mathsf{NP}$-complete. Why are $\emptyset$ and $\Sigma^*$ excluded?
::: solution
Fix $y_1 \in B$ and $y_0 \notin B$ (they exist because $B \ne \emptyset, \Sigma^*$). Let $A \in \mathsf{NP} = \mathsf{P}$, decided in polynomial time by $M$. Define $f(w) = y_1$ if $M$ accepts $w$ and $f(w) = y_0$ otherwise: computable in polynomial time, and $w \in A \iff f(w) \in B$. So $A \le_p B$; and $B \in \mathsf{P} \subseteq \mathsf{NP}$. For $B = \emptyset$ there is no yes-instance to map to, so only $A = \emptyset$ reduces to it; similarly only $\Sigma^*$ reduces to $\Sigma^*$. These two are never $\mathsf{NP}$-complete (as $\mathsf{NP}$ contains other languages).
:::
:::

::: exercise Karp reductions and coNP {#ex-conp-reduction level=2}
(a) Show that $\overline{\mathit{SAT}}$ (unsatisfiable formulas, together with non-formulas) is $\mathsf{coNP}$-complete under $\le_p$: it is in $\mathsf{coNP}$ and every language in $\mathsf{coNP}$ reduces to it. (b) Show that $\overline{\mathit{SAT}}$ *is* reducible to $\mathit{SAT}$ by a Cook reduction. (c) Show that if $\overline{\mathit{SAT}} \le_p \mathit{SAT}$ then $\mathsf{NP} = \mathsf{coNP}$.
::: solution
(a) $\overline{\mathit{SAT}} \in \mathsf{coNP}$ because its complement $\mathit{SAT}$ is in $\mathsf{NP}$. If $L \in \mathsf{coNP}$ then $\overline{L} \in \mathsf{NP}$, so $\overline{L} \le_p \mathit{SAT}$ by Cook–Levin, and by [[#thm-reduction-p]] (4) $L \le_p \overline{\mathit{SAT}}$.
(b) Ask the $\mathit{SAT}$ subroutine once and negate the answer — a Cook reduction may post-process.
(c) If $\overline{\mathit{SAT}} \le_p \mathit{SAT}$, then $\overline{\mathit{SAT}} \in \mathsf{NP}$ by [[#thm-reduction-p]] (2). For any $L \in \mathsf{coNP}$, $L \le_p \overline{\mathit{SAT}}$ by (a), so $L \in \mathsf{NP}$. Hence $\mathsf{coNP} \subseteq \mathsf{NP}$, and taking complements $\mathsf{NP} \subseteq \mathsf{coNP}$. So Karp reductions separate $\mathsf{NP}$ from $\mathsf{coNP}$ (if they differ), while Cook reductions cannot.
:::
:::

::: exercise A generic NP-complete problem {level=3}
Let $U = \{\langle N, x, 1^t\rangle : N$ is a nondeterministic TM that accepts $x$ on some branch within $t$ moves$\}$. Prove directly, without the Cook–Levin theorem, that $U$ is $\mathsf{NP}$-complete. Why is the time bound written in unary?
::: solution
*$U \in \mathsf{NP}$:* a certificate is the sequence of at most $t$ choices; the verifier simulates $N$ on $x$ for at most $t$ moves following the choices, which takes time polynomial in $t$ and $\lvert\langle N\rangle\rvert$ (each simulated move looks up $N$'s transition table) — polynomial in the input length, because $t$ is written in unary and so is at most the input length.
*$U$ is $\mathsf{NP}$-hard:* let $A \in \mathsf{NP}$ be decided by an NTM $N_A$ in time $n^k$. Map $x$ to $\langle N_A, x, 1^{\lvert x\rvert^k}\rangle$; this takes time $O(\lvert x\rvert^k)$, and $x \in A$ iff $N_A$ accepts $x$ within $\lvert x\rvert^k$ moves.
*Unary:* with $t$ in binary the verifier's simulation would take time exponential in the input length, so membership in $\mathsf{NP}$ fails (the binary version is $\mathsf{NEXP}$-complete). $U$ shows that $\mathsf{NP}$-complete problems exist for a trivial reason; the content of Cook–Levin is that a *natural* problem, $\mathit{SAT}$, is one of them.
:::
:::

::: exercise Circuits and the Tseitin transformation {level=3}
(a) Show that converting a formula to CNF by distributing $\lor$ over $\land$ can blow up exponentially: the CNF of $(x_1 \land y_1) \lor (x_2 \land y_2) \lor \cdots \lor (x_n \land y_n)$ obtained this way has $2^n$ clauses. (b) The **Tseitin transformation** instead introduces a new variable $g$ for each gate and clauses saying that $g$ equals its gate's value: for $g = a \land b$, the clauses $(\overline{g} \lor a)(\overline{g} \lor b)(g \lor \overline{a} \lor \overline{b})$; for $g = a \lor b$, $(g \lor \overline{a})(g \lor \overline{b})(\overline{g} \lor a \lor b)$; for $g = \lnot a$, $(\overline{g} \lor \overline{a})(g \lor a)$; plus the unit clause $(o)$ for the output gate. Prove that the result is satisfiable iff the circuit is, and implement it.
::: solution
(a) Distributing gives one clause for each way of choosing one variable from each pair $\{x_i, y_i\}$: $(z_1 \lor \cdots \lor z_n)$ with $z_i \in \{x_i, y_i\}$, i.e. $2^n$ clauses, none redundant. (In fact every CNF equivalent to this formula has at least $2^n$ clauses.)
(b) Given a satisfying input assignment of the circuit, give each gate variable the value its gate computes: every gate's clauses hold (they say exactly "$g$ equals its gate's function of its inputs"), and $(o)$ holds since the output is true. Conversely, a satisfying assignment of the clauses forces, gate by gate in topological order, each $g$ to equal its gate's value on the input variables; so the output gate's value is the value of $o$, which is true. The CNF has $O(\text{number of gates})$ clauses, so this is a linear-time reduction $\mathit{CIRCUIT\text{-}SAT} \le_p \mathit{CNF\text{-}SAT}$, with no exponential blow-up.

```python
from itertools import product

def tseitin(gates, inputs, output):
    """gates: {name: (op, args)} with op in 'and', 'or', 'not'. Variables are the
    input and gate names, numbered 1, 2, ...; returns CNF clauses as signed ints."""
    num = {v: i + 1 for i, v in enumerate(inputs + list(gates))}
    cnf = []
    for g, (op, args) in gates.items():
        x, ys = num[g], [num[a] for a in args]
        if op == "not":
            cnf += [[-x, -ys[0]], [x, ys[0]]]
        elif op == "and":                     # x <-> y1 & y2 & ...
            cnf += [[-x, y] for y in ys] + [[x] + [-y for y in ys]]
        elif op == "or":                      # x <-> y1 | y2 | ...
            cnf += [[x, -y] for y in ys] + [[-x] + ys]
    return cnf + [[num[output]]], len(num)

def sat(cnf, n):
    return any(all(any((l > 0) == a[abs(l) - 1] for l in c) for c in cnf)
               for a in product([False, True], repeat=n))

# (a & b) | (~a & ~b): "a equals b", satisfiable; and a & ~a, unsatisfiable
g1 = {"na": ("not", ["a"]), "nb": ("not", ["b"]), "p": ("and", ["a", "b"]),
      "q": ("and", ["na", "nb"]), "out": ("or", ["p", "q"])}
g2 = {"na": ("not", ["a"]), "out": ("and", ["a", "na"])}
for g in (g1, g2):
    cnf, n = tseitin(g, ["a", "b"], "out")
    print(len(cnf), "clauses,", n, "variables, satisfiable:", sat(cnf, n))
```

```console
$ python3 tseitin.py
14 clauses, 7 variables, satisfiable: True
6 clauses, 4 variables, satisfiable: False
```

Every Boolean formula is a circuit (one gate per operator), so the Tseitin transformation also reduces $\mathit{SAT}$ for arbitrary formulas to $\mathit{CNF\text{-}SAT}$ in linear time — which is how SAT solvers accept arbitrary constraints.
:::
:::
