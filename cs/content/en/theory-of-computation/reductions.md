Once one problem is known to be unsolvable, others follow quickly. To prove that the halting problem is undecidable ([[theory-of-computation/decidability#thm-halt]]) we did not diagonalise again; we showed that a decider for halting could be turned into a decider for acceptance, which cannot exist. That move — **reducing** one problem to another — is the main technique of computability theory, and of complexity theory after it ([[complexity]]), where reductions between problems define $\mathsf{NP}$-completeness.

This chapter makes reductions precise as **mapping reductions** and uses them to prove a series of undecidability results. Several are about Turing machines: whether a machine accepts anything, whether its language is regular, whether two machines are equivalent. **Rice's theorem** then settles all such questions at once: *every* non-trivial property of the language recognised by a program is undecidable. Finally we leave machines behind. The **Post correspondence problem** is a puzzle about dominoes that mentions no machine at all, yet it is undecidable — and through it, natural questions about context-free grammars, such as whether a grammar is ambiguous, are undecidable too.

## Mapping reductions

::: definition Computable function {#def-computable}
A function $f\colon \Sigma^* \to \Sigma^*$ is **computable** if some Turing machine, on every input $w$, halts with exactly $f(w)$ on its tape.
:::

All the usual transformations of encoded objects are computable: building a new machine from an old one by adding states, combining two automata into a product, converting a grammar to normal form. By the Church–Turing thesis, "computable" means "there is an algorithm that computes it and always terminates".

::: definition Mapping reduction {#def-mapping-reduction}
A language $A$ is **mapping reducible** to a language $B$, written $A \le_m B$, if there is a computable function $f$ such that for every $w$,

$$
w \in A \iff f(w) \in B.
$$ {#eq-reduction}

The function $f$ is a **reduction** from $A$ to $B$.
:::

A reduction translates every question "is $w$ in $A$?" into a question "is $f(w)$ in $B$?" with the same answer. Both directions of the "iff" matter: yes-instances must go to yes-instances *and* no-instances to no-instances. The function need not be injective or surjective, and it is computed without knowing the answer.

::: widget mapping
domain: w1; w2; w3; w4
codomain: y1; y2; y3; y4; y5
map: w1>y2; w2>y4; w3>y1; w4>y4
editable: false
caption: A reduction as an arrow diagram. Suppose $w_1, w_3 \in A$ and $w_2, w_4 \notin A$; then $f$ is a reduction from $A$ to $B$ exactly when $y_2, y_1 \in B$ and $y_4 \notin B$ — whatever $y_3$ and $y_5$ are. As the read-out shows, this $f$ is neither injective nor surjective, and that is fine: a reduction only has to preserve the answer. It must, however, be computable *without* knowing the answer.
:::

::: theorem Reductions transfer decidability {#thm-reduction}
Suppose $A \le_m B$. Then:

1. if $B$ is decidable, so is $A$; if $A$ is undecidable, so is $B$;
2. if $B$ is Turing-recognisable, so is $A$; if $A$ is not Turing-recognisable, neither is $B$;
3. $\overline{A} \le_m \overline{B}$ by the same function;
4. if also $B \le_m C$, then $A \le_m C$.
:::

::: proof
Let $f$ be the reduction. (1) and (2): if $M$ decides (recognises) $B$, the machine "on input $w$, compute $f(w)$ and run $M$ on it" decides (recognises) $A$, since $M$ accepts $f(w)$ iff $f(w) \in B$ iff $w \in A$ by [[#eq-reduction]]; it halts whenever $M$ does. The second halves are the contrapositives. (3): [[#eq-reduction]] is equivalent to $w \notin A \iff f(w) \notin B$. (4): if $g$ reduces $B$ to $C$, then $g \circ f$ is computable (run one machine after the other) and $w \in A \iff f(w) \in B \iff g(f(w)) \in C$.
:::

Note the direction. To prove that a new problem $B$ is undecidable, reduce a *known* undecidable problem $A$ **to** $B$: show that $B$ is at least as hard as $A$. Reducing $B$ to an undecidable problem proves nothing about $B$.

::: example Acceptance reduces to halting {#ex-atm-halt}
Give a mapping reduction from $A_{\mathsf{TM}}$ to $\mathit{HALT}_{\mathsf{TM}}$.
::: solution
On input $\langle M, w\rangle$, output $\langle M', w\rangle$ where

> $M'$ = "On input $x$: run $M$ on $x$. If $M$ accepts, **accept**. If $M$ rejects, **loop** for ever."

$M'$ is obtained from $M$ by redirecting every transition into $q_{\text{rej}}$ to a new state that moves right for ever — a simple, computable change to the encoding. If $M$ accepts $w$, $M'$ halts on $w$. If $M$ rejects $w$, $M'$ loops; if $M$ loops on $w$, so does $M'$. So $\langle M, w\rangle \in A_{\mathsf{TM}} \iff \langle M', w\rangle \in \mathit{HALT}_{\mathsf{TM}}$. (Strings that are not valid encodings are mapped to some fixed string not in $\mathit{HALT}_{\mathsf{TM}}$.) This gives a second proof of [[theory-of-computation/decidability#thm-halt]].
:::
:::

## Undecidable questions about machines

::: theorem Emptiness is undecidable {#thm-etm}
$E_{\mathsf{TM}} = \{\langle M\rangle : M \text{ is a TM with } L(M) = \emptyset\}$ is undecidable, and not even Turing-recognisable.
:::

::: proof
We show $A_{\mathsf{TM}} \le_m \overline{E_{\mathsf{TM}}}$. Given $\langle M, w\rangle$, output $\langle M_1\rangle$ where

> $M_1$ = "On input $x$: if $x \ne w$, **reject**. If $x = w$, run $M$ on $w$ and **accept** if $M$ accepts."

($M_1$ has $w$ built into its states, so constructing it from $\langle M, w\rangle$ is computable.) $L(M_1)$ is $\{w\}$ if $M$ accepts $w$, and $\emptyset$ otherwise. So $\langle M, w\rangle \in A_{\mathsf{TM}} \iff L(M_1) \ne \emptyset \iff \langle M_1\rangle \in \overline{E_{\mathsf{TM}}}$.

By [[#thm-reduction]] (1), $\overline{E_{\mathsf{TM}}}$ is undecidable, hence so is $E_{\mathsf{TM}}$ (decidable languages are closed under complement). By [[#thm-reduction]] (3), $\overline{A_{\mathsf{TM}}} \le_m E_{\mathsf{TM}}$; since $\overline{A_{\mathsf{TM}}}$ is not recognisable ([[theory-of-computation/decidability#cor-atm-complement]]), neither is $E_{\mathsf{TM}}$ by (2).
:::

Its complement $\overline{E_{\mathsf{TM}}}$ *is* recognisable, by dovetailing ([[theory-of-computation/decidability#ex-co-re]]).

::: theorem Regularity is undecidable {#thm-regular-tm}
$\mathit{REGULAR}_{\mathsf{TM}} = \{\langle M\rangle : L(M) \text{ is regular}\}$ is undecidable.
:::

::: proof
We reduce $A_{\mathsf{TM}}$ to it. Given $\langle M, w\rangle$, output $\langle M_2\rangle$:

> $M_2$ = "On input $x$: if $x = 0^n1^n$ for some $n$, **accept**. Otherwise run $M$ on $w$, and **accept** $x$ if $M$ accepts $w$."

If $M$ accepts $w$, $M_2$ accepts every string: $L(M_2) = \Sigma^*$, which is regular. If not, $M_2$ accepts exactly the strings $0^n1^n$: $L(M_2) = \{0^n1^n\}$, which is not regular. So $\langle M, w\rangle \in A_{\mathsf{TM}} \iff \langle M_2 \rangle \in \mathit{REGULAR}_{\mathsf{TM}}$.
:::

The construction never *runs* $M_2$: the reduction only writes its description. Whether $M_2$ loops on some inputs is irrelevant; what matters is its language, which we know in each of the two cases.

::: theorem Equivalence is neither recognisable nor co-recognisable {#thm-eqtm}
$EQ_{\mathsf{TM}} = \{\langle M_1, M_2\rangle : L(M_1) = L(M_2)\}$ is neither Turing-recognisable nor co-Turing-recognisable.
:::

::: proof
*$A_{\mathsf{TM}} \le_m \overline{EQ_{\mathsf{TM}}}$.* Given $\langle M, w\rangle$, output $\langle R, N\rangle$ where $R$ rejects every input and $N$ = "on any input, run $M$ on $w$ and accept if it accepts". Then $L(R) = \emptyset$, and $L(N) = \Sigma^*$ if $M$ accepts $w$, $\emptyset$ otherwise. So $M$ accepts $w$ iff $L(R) \ne L(N)$. By (3), $\overline{A_{\mathsf{TM}}} \le_m EQ_{\mathsf{TM}}$, so $EQ_{\mathsf{TM}}$ is not recognisable.

*$A_{\mathsf{TM}} \le_m EQ_{\mathsf{TM}}$.* Output $\langle Y, N\rangle$ where $Y$ accepts every input and $N$ is as before: $M$ accepts $w$ iff $L(Y) = L(N)$. By (3), $\overline{A_{\mathsf{TM}}} \le_m \overline{EQ_{\mathsf{TM}}}$, so $\overline{EQ_{\mathsf{TM}}}$ is not recognisable, i.e. $EQ_{\mathsf{TM}}$ is not co-recognisable.
:::

::: example Does this program ever print hello? {#ex-hello}
Show that no algorithm decides, for an arbitrary Python function `f` taking no arguments, whether calling `f()` ever prints the line `hello`.
::: solution
Reduce the halting problem for Python programs (undecidable by the Church–Turing thesis and [[theory-of-computation/decidability#thm-halt]]) to it. Given a program `p` and an input `x`, build a function that runs `p` on `x` with its output discarded and then prints `hello`:

```python
import contextlib, io

def make_f(p, x):
    """Build f such that f() prints 'hello' iff p halts on x."""
    def f():
        with contextlib.redirect_stdout(io.StringIO()):   # discard p's own output
            p(x)
        print("hello")                                    # reached iff p(x) returns
    return f

def collatz(n):                  # halts for every n anyone has tried
    while n != 1:
        print(n)
        n = 3 * n + 1 if n % 2 else n // 2

make_f(collatz, 27)()
```

```console
$ python3 hello.py
hello
```

The 111 numbers that `collatz(27)` prints are swallowed, and `hello` appears once, after it returns. If `p` runs for ever, `f()` never reaches its `print`, and nothing `p` prints is seen. So `f()` prints `hello` iff `p` halts on `x`; and building the source of `f` from the sources of `p` and `x` is a simple, computable text transformation. A decider for the "hello" question would therefore decide halting. (A watertight version must also stop `p` from undoing the redirection, which a sandbox can do; the point is that the reduction is an ordinary program transformation.) The same argument works for "ever writes to this file", "ever opens a network connection" or "ever divides by zero" — which is why such checks in practice are approximations.
:::
:::

Program equivalence is therefore beyond even the "semi-decision" of recognisers, in both directions. This is why compilers prove that an optimisation preserves behaviour by construction, for all programs at once, rather than by checking each program they compile.

::: quiz
A student wants to prove that $\mathit{FIN}_{\mathsf{TM}} = \{\langle M\rangle : L(M) \text{ is finite}\}$ is undecidable. Which approach is correct?
- [ ] Give a computable $f$ with $\langle M\rangle \in \mathit{FIN}_{\mathsf{TM}} \iff f(\langle M\rangle) \in A_{\mathsf{TM}}$.
- [x] Give a computable $f$ with $\langle M, w\rangle \in A_{\mathsf{TM}} \iff f(\langle M, w\rangle) \notin \mathit{FIN}_{\mathsf{TM}}$.
- [x] Apply Rice's theorem.
::: solution
The first reduces $\mathit{FIN}_{\mathsf{TM}}$ *to* $A_{\mathsf{TM}}$, which would only show it is no harder than an undecidable problem — no information. The second is a reduction from $A_{\mathsf{TM}}$ to $\overline{\mathit{FIN}_{\mathsf{TM}}}$ (e.g. $f(\langle M, w\rangle) = \langle N\rangle$ with $N$ accepting everything if $M$ accepts $w$, and nothing otherwise), which proves $\overline{\mathit{FIN}_{\mathsf{TM}}}$, hence $\mathit{FIN}_{\mathsf{TM}}$, undecidable. Finiteness is a non-trivial property of the language, so Rice's theorem applies directly.
:::
:::

## Rice's theorem

The reductions above share a pattern: from $\langle M, w\rangle$ build a machine whose *language* is one of two fixed languages, depending on whether $M$ accepts $w$. Henry Gordon Rice saw that this works for every property of languages.

::: definition Property of recognisable languages {#def-property}
A **property** of Turing-recognisable languages is a set $P$ of recognisable languages; a language $L$ **has** the property if $L \in P$. $P$ is **non-trivial** if some recognisable language has it and some recognisable language does not. We write $L_P = \{\langle M\rangle : M \text{ is a TM and } L(M) \in P\}$.
:::

Because $P$ is a set of *languages*, whether $\langle M\rangle \in L_P$ depends only on $L(M)$: if $L(M_1) = L(M_2)$ then $\langle M_1\rangle \in L_P \iff \langle M_2\rangle \in L_P$. Such properties are called **semantic** (about what the program does), as opposed to **syntactic** properties of the code itself.

::: theorem Rice's theorem {#thm-rice}
For every non-trivial property $P$ of Turing-recognisable languages, $L_P$ is undecidable.
:::

::: proof
First suppose $\emptyset \notin P$. Since $P$ is non-trivial, some recognisable language $L(T) \in P$; fix such a machine $T$. We show $A_{\mathsf{TM}} \le_m L_P$. Given $\langle M, w\rangle$, output $\langle M_w\rangle$:

> $M_w$ = "On input $x$: run $M$ on $w$. If $M$ accepts $w$, run $T$ on $x$ and **accept** if $T$ accepts."

If $M$ accepts $w$ then $M_w$ accepts exactly the strings $T$ accepts: $L(M_w) = L(T) \in P$. If $M$ does not accept $w$ then $M_w$ accepts nothing (it rejects, or loops in the first phase): $L(M_w) = \emptyset \notin P$. The map $\langle M, w\rangle \mapsto \langle M_w\rangle$ is computable ($T$ is fixed and built in). So $\langle M, w\rangle \in A_{\mathsf{TM}} \iff \langle M_w\rangle \in L_P$, and $L_P$ is undecidable by [[#thm-reduction]].

If $\emptyset \in P$, apply the argument to the complementary property $\overline{P}$ (the recognisable languages not in $P$), which is non-trivial and does not contain $\emptyset$: $L_{\overline{P}}$ is undecidable. Since $L_{\overline P}$ is the complement of $L_P$ among valid encodings, $L_P$ is undecidable too.
:::

Rice's theorem disposes of a huge family of questions in one stroke. Each of the following is undecidable, because it is a non-trivial property of $L(M)$:

- is $L(M)$ empty? finite? infinite? equal to $\Sigma^*$?
- is $L(M)$ regular? context-free? decidable?
- does $M$ accept the string $\texttt{hello}$? some palindrome? exactly $17$ strings?

::: warning Rice's theorem is about languages, not about machines
The theorem says nothing about properties of the *machine* that are not determined by its language. "Does $M$ have at most $5$ states?" and "does $M$ ever write the symbol $x$ within its first $100$ steps on input $\varepsilon$?" are decidable — the first by inspecting $\langle M\rangle$, the second by simulating $100$ steps. Other machine properties are undecidable but not by Rice's theorem: "does $M$ ever move its head left on input $\varepsilon$?" is in fact *decidable* (a machine that only moves right sees blanks after the input, so its behaviour repeats after $\lvert Q\rvert$ steps), while "does $M$ ever enter state $q_7$?" is undecidable by a direct reduction from the halting problem, not by Rice. And the theorem does not forbid tools that answer *some* instances: static analysers succeed by answering "yes", "no" or "don't know", or by approximating — reporting every real bug at the cost of false alarms, or no false alarms at the cost of missed bugs.
:::

::: example Applying Rice's theorem, and when it does not apply {#ex-rice}
Decide which of these languages are decidable: (a) $\{\langle M\rangle : L(M) \text{ contains at least two strings}\}$; (b) $\{\langle M\rangle : M \text{ has an even number of states}\}$; (c) $\{\langle M\rangle : L(M) = L(M)^R\}$; (d) $\{\langle M\rangle : L(M) \text{ is recognisable}\}$.
::: solution
(a) Undecidable by Rice: the property "has at least two strings" depends only on $L(M)$; $\Sigma^*$ has it and $\emptyset$ does not.
(b) Decidable: count the states in the encoding. This is a property of the machine, not of its language — two machines with the same language can have different numbers of states.
(c) Undecidable by Rice: "closed under reversal" is a property of the language; $\Sigma^*$ has it and $\{01\}$ does not.
(d) Decidable — trivially: every $L(M)$ is recognisable, so the property is trivial and the language is the set of all valid encodings, which is decidable. Rice's theorem needs non-triviality.
:::
:::

## The Post correspondence problem

So far every undecidable problem has been about machines. Emil Post found one that looks like a puzzle.

::: definition Post correspondence problem {#def-pcp}
A **PCP instance** is a finite list of **dominoes** $\left[\frac{t_1}{b_1}\right], \dots, \left[\frac{t_k}{b_k}\right]$, each with a top string $t_i$ and a bottom string $b_i$ over an alphabet $\Sigma$. A **match** is a non-empty sequence of indices $i_1, i_2, \dots, i_\ell$ (repetitions allowed) such that

$$
t_{i_1} t_{i_2} \cdots t_{i_\ell} = b_{i_1} b_{i_2} \cdots b_{i_\ell}.
$$

$\mathit{PCP} = \{\langle P\rangle : P \text{ is a PCP instance with a match}\}$.
:::

::: example Finding a match {#ex-pcp}
Find a match for the instance $\left[\frac{b}{ca}\right], \left[\frac{a}{ab}\right], \left[\frac{ca}{a}\right], \left[\frac{abc}{c}\right]$, and explain why $\left[\frac{ab}{a}\right], \left[\frac{ba}{bab}\right]$ has none.
::: solution
The sequence $2, 1, 3, 2, 4$ gives top $a \cdot b \cdot ca \cdot a \cdot abc = abcaaabc$ and bottom $ab \cdot ca \cdot a \cdot ab \cdot c = abcaaabc$: a match. It can be found by trying sequences systematically, keeping only those in which one row is a prefix of the other (otherwise no extension can match). Here is that search, breadth first:

```python
from collections import deque

def pcp(dominoes, max_len=12):
    """Shortest match found by breadth-first search, or None within max_len dominoes.

    A state records the 'overhang': the part of the longer row not yet matched,
    and which row (top or bottom) it belongs to."""
    start = ("", "top")
    queue, seen = deque([(start, [])]), {start}
    while queue:
        (over, side), seq = queue.popleft()
        if len(seq) == max_len:
            continue
        for i, (t, b) in enumerate(dominoes, 1):
            top, bot = (over + t, b) if side == "top" else (t, over + b)
            if top.startswith(bot):
                state = (top[len(bot):], "top")
            elif bot.startswith(top):
                state = (bot[len(top):], "bottom")
            else:
                continue                     # rows disagree: dead end
            if state[0] == "":
                return seq + [i]             # rows equal: a match
            if state not in seen:
                seen.add(state); queue.append((state, seq + [i]))
    return None

D = [("b", "ca"), ("a", "ab"), ("ca", "a"), ("abc", "c")]
m = pcp(D)
print(m)
print("".join(D[i - 1][0] for i in m))
print("".join(D[i - 1][1] for i in m))
print(pcp([("ab", "a"), ("ba", "bab")]))   # no match exists for this instance
```

```console
$ python3 pcp.py
[2, 1, 3, 2, 4]
abcaaabc
abcaaabc
None
```

For the second instance the search runs out of candidates — not merely out of budget. A match must start with a domino whose rows agree as far as they go: $\left[\frac{ab}{a}\right]$ leaves the top overhang $b$, and $\left[\frac{ba}{bab}\right]$ the bottom overhang $b$. From the top overhang $b$, adding either domino gives rows $bab$ vs $a$ or $bba$ vs $bab$, which disagree; from the bottom overhang $b$, the rows $ab$ vs $ba$ or $ba$ vs $bbab$ disagree. Every branch dies, so there is no match.
:::
:::

The search above is a recogniser for $\mathit{PCP}$ if we remove the length bound: if a match exists, breadth-first search finds it. But when there is none, the search usually goes on for ever, because the overhang can keep growing. That is unavoidable:

::: theorem Post's theorem {#thm-pcp}
$\mathit{PCP}$ is undecidable.
:::

::: proof
The proof encodes an accepting computation of a Turing machine as a match. We first prove the result for a variant, then remove the variant.

*Modified PCP.* $\mathit{MPCP}$ is the set of instances that have a match *starting with the first domino*. We show $A_{\mathsf{TM}} \le_m \mathit{MPCP}$. We may assume that $M$ never tries to move left from the leftmost cell (modify $M$ to mark its first cell) and that on input $\varepsilon$ the initial configuration is written $q_0\sqcup$. Given $\langle M, w\rangle$ with $w = w_1 \cdots w_n$, the instance $P'$ consists of the following dominoes, where $\#$ is a new separator:

1. the first domino $\left[\frac{\#}{\#\,q_0w_1\cdots w_n\#}\right]$;
2. for every $q \ne q_{\text{rej}}$, $a \in \Gamma$ with $\delta(q, a) = (r, b, R)$: $\left[\frac{qa}{br}\right]$;
3. for every $q \ne q_{\text{rej}}$, $a, c \in \Gamma$ with $\delta(q, a) = (r, b, L)$: $\left[\frac{cqa}{rcb}\right]$;
4. for every $a \in \Gamma$: $\left[\frac{a}{a}\right]$;
5. $\left[\frac{\#}{\#}\right]$ and $\left[\frac{\#}{\sqcup\#}\right]$;
6. for every $a \in \Gamma$: $\left[\frac{a\,q_{\text{acc}}}{q_{\text{acc}}}\right]$ and $\left[\frac{q_{\text{acc}}\,a}{q_{\text{acc}}}\right]$;
7. $\left[\frac{q_{\text{acc}}\#\#}{\#}\right]$.

Think of building a match from left to right. The bottom row starts one configuration ahead of the top. To extend the top so that it copies the configuration written on the bottom, we must use dominoes 2–5, whose bottoms then write the *next* configuration: dominoes 4 copy tape symbols unchanged, the single domino of type 2 or 3 that matches the head and its neighbours applies $M$'s transition, and domino 5 ends the configuration (the second form adds a blank when the head moves into new territory). So any partial match starting with the first domino has the form

$$
\text{top: } \#C_1\#C_2\#\cdots\#C_{j}\#, \qquad \text{bottom: } \#C_1\#C_2\#\cdots\#C_j\#C_{j+1}\#,
$$

where $C_1, C_2, \dots$ is the computation of $M$ on $w$ — the bottom is always one configuration ahead, and the top can never catch up as long as the state is not $q_{\text{acc}}$, since only dominoes 6 and 7 have a top longer than their bottom. If $M$ accepts $w$, some $C_j$ contains $q_{\text{acc}}$; then dominoes 6 let the top catch up by letting $q_{\text{acc}}$ "eat" one neighbouring symbol per configuration, and domino 7 finishes with equal rows: a match. Conversely, a match must use domino 7 (otherwise the bottom stays longer), hence $q_{\text{acc}}$ must appear, hence the sequence of configurations encoded is an accepting computation of $M$ on $w$. (No match can arise from rejecting or looping computations: there are no dominoes for $q_{\text{rej}}$, and an infinite computation never lets the top catch up.) So $\langle M, w\rangle \in A_{\mathsf{TM}} \iff P' \in \mathit{MPCP}$.

*From MPCP to PCP.* For a string $u = u_1 \cdots u_m$ write $\star u = {*}u_1{*}u_2 \cdots {*}u_m$, $u\star = u_1{*}u_2{*} \cdots u_m{*}$ and $\star u \star = {*}u_1{*} \cdots {*}u_m{*}$, with a new symbol $*$. From the MPCP instance $\left[\frac{t_1}{b_1}\right], \dots, \left[\frac{t_k}{b_k}\right]$ build the PCP instance

$$
\left[\frac{\star t_1}{\star b_1 \star}\right],\ \left[\frac{\star t_1}{b_1 \star}\right],\ \left[\frac{\star t_2}{b_2 \star}\right],\ \dots,\ \left[\frac{\star t_k}{b_k \star}\right],\ \left[\frac{{*}\diamond}{\diamond}\right]
$$

with another new symbol $\diamond$. In any match, the first domino must have top and bottom starting with the same symbol; only $\left[\frac{\star t_1}{\star b_1 \star}\right]$ qualifies (all other bottoms start with a symbol of $\Sigma$ or with $\diamond$, all tops with $*$). The extra $*$ at the start of the bottom is then compensated, symbol for symbol, by the interleaving, and the last domino must be $\left[\frac{*\diamond}{\diamond}\right]$ to absorb the final $*$ on the bottom. Removing the stars gives an MPCP match starting with domino $1$, and conversely every MPCP match starting with domino $1$ turns into a PCP match in this way. So $\mathit{MPCP} \le_m \mathit{PCP}$, and by transitivity $A_{\mathsf{TM}} \le_m \mathit{PCP}$.
:::

The proof shows that dominoes can simulate computation: matches are accepting computation histories. The same idea — **computation histories** — encoded into grammars or into other combinatorial objects gives many further undecidability results.

## Undecidable questions about grammars

In [[theory-of-computation/context-free-grammars]] we claimed that ambiguity cannot be detected by an algorithm. PCP proves it.

::: theorem Ambiguity of CFGs is undecidable {#thm-ambig}
$\mathit{AMBIG}_{\mathsf{CFG}} = \{\langle G\rangle : G \text{ is an ambiguous CFG}\}$ is undecidable. So is $\{\langle G, H\rangle : L(G) \cap L(H) \ne \emptyset\}$ for CFGs $G, H$.
:::

::: proof
We reduce $\mathit{PCP}$. Given an instance $\left[\frac{t_1}{b_1}\right], \dots, \left[\frac{t_k}{b_k}\right]$ over $\Sigma$, introduce new **index symbols** $a_1, \dots, a_k$ and the grammars

$$
G_T\colon\ T \to t_i\,T\,a_i \mid t_i\,a_i \quad (1 \le i \le k), \qquad G_B\colon\ B \to b_i\,B\,a_i \mid b_i\,a_i \quad (1 \le i \le k).
$$

$G_T$ generates exactly the strings $t_{i_1} \cdots t_{i_\ell}\, a_{i_\ell} \cdots a_{i_1}$ for non-empty index sequences, and the index suffix, read backwards, determines the derivation uniquely; so $G_T$ is unambiguous, and likewise $G_B$. A string lies in both languages iff it equals $t_{i_1}\cdots t_{i_\ell}a_{i_\ell}\cdots a_{i_1} = b_{i_1}\cdots b_{i_\ell}a_{i_\ell}\cdots a_{i_1}$ for one index sequence (the suffixes must agree), i.e. iff $i_1, \dots, i_\ell$ is a match. So $P \in \mathit{PCP} \iff L(G_T) \cap L(G_B) \ne \emptyset$, which proves the second claim.

For ambiguity, let $G$ have start variable $S$ and rules $S \to T \mid B$ together with those of $G_T$ and $G_B$. A string has two parse trees in $G$ iff it is derivable both via $T$ and via $B$ (each of $G_T$, $G_B$ alone is unambiguous), iff it is in $L(G_T) \cap L(G_B)$, iff the instance has a match. The map $P \mapsto \langle G\rangle$ is computable, so $\mathit{PCP} \le_m \mathit{AMBIG}_{\mathsf{CFG}}$.
:::

Using computation histories more directly one proves that $\mathit{ALL}_{\mathsf{CFG}} = \{\langle G\rangle : L(G) = \Sigma^*\}$ is undecidable. *Sketch:* write an accepting computation of $M$ on $w$ as $\#C_1\#C_2^R\#C_3\#C_4^R\#\cdots$, reversing every other configuration. The strings that are *not* accepting histories — wrong start, wrong end, or some pair $C_i, C_{i+1}$ that does not follow by one move — form a context-free language, because a PDA can guess the faulty position and compare $C_i$ with the reversed $C_{i+1}$ on its stack. A grammar for this language, computable from $\langle M, w\rangle$, generates all strings iff $M$ has no accepting computation on $w$. Then $EQ_{\mathsf{CFG}}$ is undecidable too: $\mathit{ALL}_{\mathsf{CFG}}$ is the special case of equivalence with a fixed grammar for $\Sigma^*$.

::: widget graph
nodes: ATM@0,2; HALT@2,3.4; ETM@2,2.6; REG@2,1.8; EQTM@2,1; MPCP@4,1; PCP@6,1; INT@8,1.8; AMBIG@8,0.2
edges: ATM>HALT; ATM>ETM; ATM>REG; ATM>EQTM; ATM>MPCP; MPCP>PCP; PCP>INT; PCP>AMBIG
algorithm: topo
start: ATM
caption: The reductions of this chapter. An arrow $A \to B$ means $A \le_m B$ (for $E_{\mathsf{TM}}$ the reduction goes to its complement), so undecidability flows along the arrows from $A_{\mathsf{TM}}$, which was proved undecidable directly by diagonalisation. INT is the intersection problem for pairs of CFGs and AMBIG the ambiguity problem. Step through the topological sort: it lists the problems in an order in which each one's undecidability follows from earlier ones.
:::

::: quiz
Which of the following are decidable?
- [ ] Given a CFG $G$, is $G$ ambiguous?
- [x] Given a CFG $G$ in Chomsky normal form and a string $w$, does $w$ have two parse trees?
- [ ] Given two CFGs, do they generate the same language?
- [x] Given a PCP instance in which every domino has $\lvert t_i\rvert = \lvert b_i\rvert$, is there a match?
::: solution
Ambiguity and equivalence of CFGs are undecidable ([[#thm-ambig]] and the sketch above). For a CNF grammar and a fixed string $w$, the counting version of CYK (an exercise in [[theory-of-computation/context-free-grammars]]) computes the number of parse trees: decidable. If every domino has equal-length rows, a match exists iff some single domino has $t_i = b_i$: in any match the rows are compared domino by domino, so the first domino must already have $t_{i_1} = b_{i_1}$.
:::
:::

::: history
Emil Post defined the notion of reducibility and posed the question of whether there are undecidable recognisable problems strictly easier than the halting problem ("Post's problem") in "Recursively enumerable sets of positive integers and their decision problems" (1944); Richard Friedberg (1957) and Albert Muchnik (1956) answered it independently. Alan Turing introduced oracle machines, the basis of Turing reducibility, in his 1939 thesis on ordinal logics. Post's correspondence problem appeared in "A variant of a recursively unsolvable problem" (*Bulletin of the AMS*, 1946). Henry Gordon Rice proved his theorem in "Classes of recursively enumerable sets and their decision problems" (*Transactions of the AMS*, 1953), from his 1951 doctoral work at Syracuse. The undecidability of ambiguity was proved in 1962 by David Cantor and by Robert Floyd, and the undecidability of intersection-emptiness and equivalence for context-free grammars by Bar-Hillel, Perles and Shamir (1961). Michael Sipser's textbook (1st edition 1997, 3rd edition 2012) popularised the computation-history proofs used here.
:::

## Where this leads

Mapping reductions reappear with resource bounds in [[complexity]]: a **polynomial-time** reduction from $A$ to $B$ shows that $B$ is at least as hard as $A$ up to polynomial factors, and Cook's and Karp's theorems use such reductions to show that $\mathit{SAT}$ and thousands of other problems are $\mathsf{NP}$-complete. The limits proved here also shape practice: static analysis and verification ([[compilers]], [[programming-languages]], [[software-engineering]]) work with decidable approximations, restricted languages, or human-supplied proofs, because exact answers to semantic questions about arbitrary programs are impossible.

::: summary
- $A \le_m B$ if a computable $f$ maps yes-instances of $A$ to yes-instances of $B$ and no-instances to no-instances ([[#def-mapping-reduction]]). Decidability and recognisability transfer from $B$ to $A$; undecidability from $A$ to $B$ ([[#thm-reduction]]).
- To prove $B$ undecidable, reduce a known undecidable problem **to** $B$.
- $E_{\mathsf{TM}}$ is undecidable and not recognisable ([[#thm-etm]]); $\mathit{REGULAR}_{\mathsf{TM}}$ is undecidable ([[#thm-regular-tm]]); $EQ_{\mathsf{TM}}$ is neither recognisable nor co-recognisable ([[#thm-eqtm]]).
- **Rice's theorem** ([[#thm-rice]]): every non-trivial property of the *language* of a TM is undecidable. Properties of the machine's code may be decidable.
- The **Post correspondence problem** is undecidable ([[#thm-pcp]]): dominoes can encode accepting computation histories.
- Via PCP and computation histories, ambiguity, intersection-emptiness, universality and equivalence of context-free grammars are undecidable ([[#thm-ambig]]).
:::

## Exercises

::: exercise Direction of a reduction {level=1}
For each statement say whether it is true for all languages $A, B$: (a) if $A \le_m B$ and $A$ is decidable then $B$ is decidable; (b) if $A \le_m B$ and $B$ is regular then $A$ is decidable; (c) $A \le_m \overline{A}$.
::: solution
(a) False: every decidable $A$ (other than $\emptyset$ and $\Sigma^*$) reduces to $A_{\mathsf{TM}}$ — map $w$ to a fixed yes-instance or a fixed no-instance after deciding $w \in A$ — and $A_{\mathsf{TM}}$ is undecidable. (b) True: a regular language is decidable, so $A$ is decidable by [[#thm-reduction]]. (Note $A$ need not be regular: the reduction can do any computation.) (c) False in general: if $A_{\mathsf{TM}} \le_m \overline{A_{\mathsf{TM}}}$, then by (3) also $\overline{A_{\mathsf{TM}}} \le_m A_{\mathsf{TM}}$, and since $A_{\mathsf{TM}}$ is recognisable, so would be $\overline{A_{\mathsf{TM}}}$ by (2) — which it is not.
:::
:::

::: exercise A shortest match {level=1 check="4"}
Find a match for the PCP instance $\left[\frac{a}{baa}\right], \left[\frac{ab}{aa}\right], \left[\frac{bba}{bb}\right]$. How many dominoes does a shortest match use? (Enter the number.)
::: solution
A match must start with a domino whose rows agree as far as they go; only $\left[\frac{bba}{bb}\right]$ (domino 3) qualifies, leaving the top overhang $a$. Continuing with domino 2 gives top $bbaab$ and bottom $bbaa$, overhang $b$; domino 3 again gives top $bbaabbba$, bottom $bbaabb$, overhang $ba$; domino 1 gives top $bbaabbbaa$ and bottom $bbaabbbaa$. So $3, 2, 3, 1$ is a match, with $4$ dominoes. The breadth-first search of [[#ex-pcp]] finds the same sequence and confirms that no shorter match exists, since it explores sequences in order of length.
:::
:::

::: exercise Rice or not? {level=1}
Which of these are undecidable by Rice's theorem, which are decidable, and which are undecidable for other reasons? (a) $\{\langle M\rangle : \varepsilon \in L(M)\}$; (b) $\{\langle M\rangle : M \text{ enters its designated state } q_\star \text{ when run on input } \varepsilon\}$ (machines are encoded with one state marked $q_\star$); (c) $\{\langle M\rangle : L(M) \text{ is context-free}\}$; (d) $\{\langle M\rangle : M \text{ halts on } \varepsilon \text{ within } \lvert\langle M\rangle\rvert \text{ steps}\}$.
::: solution
(a) Rice: depends only on $L(M)$; non-trivial. Undecidable.
(b) Not a property of $L(M)$ — two machines with the same language may differ in whether they pass through $q_\star$ — so Rice's theorem does not apply. It is undecidable by a reduction from $\mathit{HALT}_{\mathsf{TM}}$: given $\langle M, w\rangle$, build $M'$ that erases its input, writes $w$, runs $M$ on $w$, and enters a fresh state, marked $q_\star$, if and only if $M$ halts (every transition of $M$ into $q_{\text{acc}}$ or $q_{\text{rej}}$ is redirected to $q_\star$). Then $M'$ enters $q_\star$ on $\varepsilon$ iff $M$ halts on $w$.
(c) Rice: undecidable.
(d) Decidable: compute $\lvert\langle M\rangle\rvert$ and simulate that many steps.
:::
:::

::: exercise Totality {level=2}
Prove that $\mathit{TOTAL}_{\mathsf{TM}} = \{\langle M\rangle : M \text{ halts on every input}\}$ is undecidable by a mapping reduction from $\mathit{HALT}_{\mathsf{TM}}$. Is it covered by Rice's theorem?
::: solution
Given $\langle M, w\rangle$ output $\langle M'\rangle$ with $M'$ = "on any input $x$, erase it, run $M$ on $w$, and accept if $M$ halts". If $M$ halts on $w$, $M'$ halts on every input; otherwise $M'$ halts on none. So $\langle M, w\rangle \in \mathit{HALT}_{\mathsf{TM}} \iff \langle M'\rangle \in \mathit{TOTAL}_{\mathsf{TM}}$. Rice's theorem does not apply directly, because "halts on every input" is not a property of $L(M)$: a machine that rejects everything and one that loops on everything both have language $\emptyset$, but only the first is total. (It is in fact neither recognisable nor co-recognisable.)
:::
:::

::: exercise Computation histories for LBAs {level=2}
For linear bounded automata (TMs that never leave the input cells), acceptance is decidable ([[theory-of-computation/decidability]], last exercise). Explain why emptiness $E_{\mathsf{LBA}} = \{\langle M\rangle : M \text{ is an LBA with } L(M) = \emptyset\}$ is nevertheless undecidable, using computation histories.
::: solution
Reduce $A_{\mathsf{TM}}$ to $\overline{E_{\mathsf{LBA}}}$. Given $\langle M, w\rangle$, build an LBA $B$ that accepts its input $x$ iff $x$ is an **accepting computation history** of $M$ on $w$: $x = \#C_1\#C_2\#\cdots\#C_\ell\#$ with $C_1$ the start configuration of $M$ on $w$, each $C_{i+1}$ following from $C_i$ by one move, and $C_\ell$ accepting. $B$ checks this within the cells of $x$: it compares $C_1$ with $w$ (built into its states), checks $C_\ell$ for $q_{\text{acc}}$, and for each $i$ zig-zags between $C_i$ and $C_{i+1}$, marking corresponding cells, to check that they agree except near the head, where they follow $M$'s transition. No extra space is needed. Then $L(B) \ne \emptyset$ iff $M$ has an accepting computation on $w$ iff $M$ accepts $w$. So $E_{\mathsf{LBA}}$ is undecidable, although acceptance by LBAs is decidable: the history is the input, so the LBA never has to search for it.
:::
:::

::: exercise Intersection of CFGs {level=2}
Use the grammars $G_T, G_B$ from [[#thm-ambig]] on the instance of [[#ex-pcp]] to write down a string in $L(G_T) \cap L(G_B)$.
::: solution
The match $2, 1, 3, 2, 4$ gives the top string $abcaaabc$ and the bottom string $abcaaabc$; append the index symbols in reverse order of use, $a_4a_2a_3a_1a_2$. So $abcaaabc\,a_4a_2a_3a_1a_2$ is in both languages. In $G_T$: $T \Rightarrow t_2Ta_2 \Rightarrow t_2t_1Ta_1a_2 \Rightarrow t_2t_1t_3Ta_3a_1a_2 \Rightarrow t_2t_1t_3t_2Ta_2a_3a_1a_2 \Rightarrow t_2t_1t_3t_2t_4a_4a_2a_3a_1a_2$, and the same in $G_B$ with $b$s. The corresponding grammar $S \to T \mid B$ gives this string two parse trees.
:::
:::

::: exercise Unary PCP {level=3}
Prove that PCP over a one-letter alphabet $\{a\}$ is decidable.
::: solution
With one letter, a domino $\left[\frac{a^{p_i}}{a^{q_i}}\right]$ matters only through its difference $d_i = p_i - q_i$, and a sequence is a match iff the sum of the $d_i$ over the sequence is $0$ (order is irrelevant). If some $d_i = 0$, that domino alone is a match. If all $d_i > 0$ or all $d_i < 0$, no match exists. Otherwise there are $d_i > 0$ and $d_j < 0$: using domino $i$ $\lvert d_j\rvert$ times and domino $j$ $d_i$ times gives sum $d_i\lvert d_j\rvert + d_j d_i = 0$, a match. So a match exists iff some $d_i = 0$ or the $d_i$ do not all have the same sign — a simple test.
:::
:::

::: exercise Reductions between undecidable problems {level=3}
Show that $\overline{A_{\mathsf{TM}}}$ is not mapping reducible to $A_{\mathsf{TM}}$, but that a decider for $A_{\mathsf{TM}}$, used as a subroutine (an **oracle**), would decide $\overline{A_{\mathsf{TM}}}$. What does this say about the difference between mapping reductions and Turing reductions?
::: solution
If $\overline{A_{\mathsf{TM}}} \le_m A_{\mathsf{TM}}$, then since $A_{\mathsf{TM}}$ is recognisable, $\overline{A_{\mathsf{TM}}}$ would be recognisable by [[#thm-reduction]] (2) — contradicting [[theory-of-computation/decidability#cor-atm-complement]]. But with an oracle for $A_{\mathsf{TM}}$, the machine "on input $x$, ask the oracle whether $x \in A_{\mathsf{TM}}$ and give the opposite answer" decides $\overline{A_{\mathsf{TM}}}$. A **Turing reduction** ($A \le_T B$: $A$ is decidable by a machine with an oracle for $B$) may ask many questions and post-process the answers, for example negate them; a mapping reduction asks exactly one question and must pass on its answer unchanged. Turing reductions transfer decidability but not recognisability; mapping reductions transfer both, which is why they distinguish a problem from its complement and why they are the right tool for recognisability results.
:::
:::
