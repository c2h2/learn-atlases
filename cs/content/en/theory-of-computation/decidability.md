Every programmer has wished for a tool that looks at a program and says whether it can get stuck in an infinite loop. Compilers warn about unreachable code, linters flag suspicious loops, and verification tools prove termination of carefully written functions. But no tool can do it for *every* program: there is no algorithm that, given an arbitrary program and its input, correctly decides whether the program halts. This is not a limitation of current technology. It is a theorem, proved by Alan Turing in 1936, and its proof is one of the most beautiful arguments in mathematics.

Now that the Church–Turing thesis ([[theory-of-computation/turing-machines#def-church-turing]]) identifies algorithms with Turing machines, questions of the form "is there an algorithm for this problem?" become precise mathematical questions: "is this language decidable?" This chapter first shows that many natural questions about automata and grammars *are* decidable, which is why the tools of the previous chapters can be implemented. Then it shows, by a counting argument, that undecidable languages must exist, and, by **diagonalisation**, that a specific and important one — the acceptance problem for Turing machines — is undecidable. From it we get the undecidability of the halting problem and the first language that is not even recognisable.

## Problems as languages

A **decision problem** is a question with a yes-or-no answer about an input object: "does this DFA accept this string?", "is this graph connected?", "does this program halt?". Using encodings ([[theory-of-computation/turing-machines]]), each decision problem becomes the language of encodings of yes-instances. For example

$$
A_{\mathsf{DFA}} = \{\langle B, w\rangle : B \text{ is a DFA that accepts the string } w\}.
$$

A decider for this language is exactly an algorithm for the problem. A decider must reject strings that are not valid encodings at all; checking validity is always easy for reasonable encodings, so we will not mention it again.

## Decidable problems about automata and grammars

The constructions of the earlier chapters are algorithms, so the corresponding problems are decidable.

::: theorem Decidable problems for regular languages {#thm-dec-regular}
The following languages are decidable:

1. $A_{\mathsf{DFA}} = \{\langle B, w\rangle : B \text{ is a DFA accepting } w\}$;
2. $A_{\mathsf{NFA}} = \{\langle B, w\rangle : B \text{ is an NFA accepting } w\}$;
3. $A_{\mathsf{REX}} = \{\langle R, w\rangle : R \text{ is a regular expression with } w \in L(R)\}$;
4. $E_{\mathsf{DFA}} = \{\langle A\rangle : A \text{ is a DFA with } L(A) = \emptyset\}$;
5. $EQ_{\mathsf{DFA}} = \{\langle A, B\rangle : A, B \text{ are DFAs with } L(A) = L(B)\}$.
:::

::: proof
(1) Simulate $B$ on $w$: keep the current state on a work tape and, for each symbol of $w$, look up the transition in the encoded table. After $\lvert w\rvert$ steps accept iff the state is accepting. The simulation always ends.
(2) Convert $B$ to a DFA by the subset construction ([[theory-of-computation/nondeterminism#thm-subset]]) and run the decider for (1) — or simulate sets of states directly.
(3) Convert $R$ to an NFA by Thompson's construction ([[theory-of-computation/regular-expressions#thm-thompson]]) and run the decider for (2).
(4) Mark the start state; repeatedly mark every state with an arrow from a marked state, until nothing changes; accept iff no accepting state is marked ([[theory-of-computation/finite-automata#thm-emptiness]]).
(5) Build the product DFA $C$ for the symmetric difference $L(A) \mathbin{\triangle} L(B)$ ([[theory-of-computation/finite-automata#thm-union-intersection]]) and run the decider for (4) on $\langle C\rangle$; $L(A) = L(B)$ iff $L(C) = \emptyset$.
:::

Each proof uses an earlier decider as a subroutine — a pattern we will soon turn around to prove *un*decidability.

::: theorem Decidable problems for context-free languages {#thm-dec-cfg}
The following are decidable:

1. $A_{\mathsf{CFG}} = \{\langle G, w\rangle : G \text{ is a CFG generating } w\}$;
2. $E_{\mathsf{CFG}} = \{\langle G\rangle : G \text{ is a CFG with } L(G) = \emptyset\}$.

Consequently every context-free language is decidable.
:::

::: proof
(1) Convert $G$ to Chomsky normal form ([[theory-of-computation/context-free-grammars#thm-cnf]]) and run CYK ([[theory-of-computation/context-free-grammars#thm-cyk]]); alternatively, list all derivations with exactly $2\lvert w\rvert - 1$ steps (finitely many), handling $w = \varepsilon$ by checking for the rule $S \to \varepsilon$. Searching derivations of $G$ directly would not work: without a bound on their length the search might never end.

(2) Mark every terminal. Repeatedly mark every variable $A$ that has a rule $A \to X_1 \cdots X_k$ with all $X_i$ marked, until nothing changes. Accept iff the start variable is unmarked. The marked variables are exactly those that derive some terminal string (by induction on the iteration in one direction and on the height of parse trees in the other), so $L(G) \ne \emptyset$ iff $S$ is marked.

Finally, if $L$ is context-free, fix a grammar $G$ for it. The machine "on input $w$, run the decider for $A_{\mathsf{CFG}}$ on $\langle G, w\rangle$" decides $L$.
:::

::: example Running the emptiness test for grammars {#ex-ecfg}
Apply the decider for $E_{\mathsf{CFG}}$ to the grammar with rules $S \to AB \mid C$, $A \to aA$, $B \to b \mid BA$, $C \to cC \mid c$. Which variables generate terminal strings, and is $L(G)$ empty? What is $L(G)$?
::: solution
Start with the terminals $a, b, c$ marked. First pass: $B \to b$ marks $B$; $C \to c$ marks $C$. Second pass: $S \to C$ marks $S$; $A$'s only rule $A \to aA$ needs $A$ itself, and $S \to AB$ needs $A$. Third pass: nothing new. So $B$, $C$ and $S$ generate terminal strings and $A$ does not — every derivation from $A$ keeps an $A$ for ever. $S$ is marked, so $L(G) \ne \emptyset$ and the decider rejects $\langle G\rangle$. The rule $S \to AB$ is useless, and so is $B \to BA$; the language is $L(C) = \{c^n : n \ge 1\}$.
:::
:::

The pattern breaks down for one natural question. $EQ_{\mathsf{CFG}}$ — do two grammars generate the same language? — cannot be handled like $EQ_{\mathsf{DFA}}$, because the context-free languages are not closed under complement or intersection ([[theory-of-computation/pushdown-automata#thm-cf-nonclosure]]). In fact it is undecidable ([[theory-of-computation/reductions]]).

The classes we have met so far form a hierarchy:

$$
\text{regular} \subsetneq \text{context-free} \subsetneq \text{decidable} \subsetneq \text{Turing-recognisable} \subsetneq \text{all languages}.
$$

The first two inclusions are strict by $\{0^n1^n\}$ and $\{a^nb^nc^n\}$. The rest of this chapter proves that the last two are strict as well.

::: quiz
Which of the following problems are decidable by the results so far?
- [x] Given a DFA $A$, is $L(A) = \Sigma^*$?
- [x] Given a CFG $G$ and a regular expression $R$, is $L(G) \cap L(R) = \emptyset$?
- [x] Given a CFG $G$, does $G$ generate at least one string of length $10$?
- [ ] Given two CFGs $G$ and $H$, is $L(G) = L(H)$?
::: solution
$L(A) = \Sigma^*$ iff the complement DFA (swap accepting states) has empty language: decidable. $L(G) \cap L(R)$ is context-free by [[theory-of-computation/pushdown-automata#thm-cf-regular]], and the construction is effective, so test emptiness by $E_{\mathsf{CFG}}$. For the third, intersect with the regular language $\Sigma^{10}$ and test non-emptiness (or run CYK on each of the finitely many strings of length $10$). The fourth, $EQ_{\mathsf{CFG}}$, is undecidable, as we will prove in [[theory-of-computation/reductions]].
:::
:::

## There are more languages than machines

A counting argument shows that undecidable — indeed unrecognisable — languages exist, without exhibiting one. It uses the notions of countable and uncountable sets ([Maths Atlas: cardinality](/learn/maths/lesson.php?c=proofs&l=cardinality)).

::: theorem Some languages are not Turing-recognisable {#thm-counting}
For any alphabet $\Sigma$, the set of Turing machines over $\Sigma$ is countable, while the set of languages over $\Sigma$ is uncountable. Hence there are languages that no Turing machine recognises.
:::

::: proof
*Machines are countable.* Every TM has an encoding $\langle M\rangle$, a finite string over a fixed alphabet, and different machines (up to renaming states) have different encodings. The set of all finite strings over a finite alphabet is countable: list them in shortlex order. So the machines can be listed $M_1, M_2, M_3, \dots$ (repeating if necessary).

*Languages are uncountable.* List $\Sigma^*$ in shortlex order as $s_1, s_2, s_3, \dots$. A language $L$ corresponds to its **characteristic sequence** $\chi_L$, the infinite binary sequence whose $i$-th bit is $1$ iff $s_i \in L$; this is a bijection between languages and infinite binary sequences. Cantor's diagonal argument shows that the infinite binary sequences cannot be listed: given any list $x_1, x_2, \dots$ of them, the sequence $y$ with $y_i = 1 - (x_i)_i$ differs from each $x_i$ in position $i$, so it is not in the list.

Since each machine recognises one language and there are only countably many machines, only countably many languages are recognisable; the uncountably many others are not.
:::

::: widget cantor
mode: diagonal
size: 8
caption: Cantor's diagonal argument. Each row is one infinite binary sequence — think of row $i$ as the characteristic sequence of the language recognised by the $i$-th Turing machine, column $j$ as the string $s_j$. Flipping the diagonal entries produces a row that differs from row $i$ in column $i$, so it is the characteristic sequence of a language that no machine in the list recognises. The proof that $A_{\mathsf{TM}}$ is undecidable uses the same diagonal, with machines in place of sequences.
:::

## The acceptance problem is undecidable

Counting tells us that unrecognisable languages exist but not what they are. We now find a specific undecidable problem, and a natural one: does a given machine accept a given input?

$$
A_{\mathsf{TM}} = \{\langle M, w\rangle : M \text{ is a TM and } M \text{ accepts } w\}.
$$

::: proposition $A_{\mathsf{TM}}$ is Turing-recognisable {#prop-atm-recognisable}
The universal machine $U$ of [[theory-of-computation/turing-machines#thm-utm]] recognises $A_{\mathsf{TM}}$.
:::

::: proof
On input $\langle M, w\rangle$, $U$ simulates $M$ on $w$ and accepts if $M$ accepts, rejects if $M$ rejects. If $M$ accepts $w$, $U$ accepts; if not, $U$ rejects or runs for ever. So $L(U) = A_{\mathsf{TM}}$.
:::

$U$ loops exactly when $M$ loops on $w$. If we could detect that, $U$ could be turned into a decider. We cannot.

::: theorem Turing's theorem {#thm-atm}
$A_{\mathsf{TM}}$ is undecidable.
:::

::: proof
Suppose, for a contradiction, that a decider $H$ for $A_{\mathsf{TM}}$ exists:

$$
H(\langle M, w\rangle) = \begin{cases} \text{accept} & \text{if } M \text{ accepts } w, \\ \text{reject} & \text{if } M \text{ does not accept } w. \end{cases}
$$

Use $H$ as a subroutine in a new machine $D$, which takes as input the description of a machine and does the **opposite** of what that machine does on its own description:

> $D$ = "On input $\langle M\rangle$, where $M$ is a TM: run $H$ on $\langle M, \langle M\rangle\rangle$. If $H$ accepts, **reject**; if $H$ rejects, **accept**."

$D$ always halts, because $H$ does. Now run $D$ on its own description $\langle D\rangle$:

$$
D(\langle D\rangle) = \begin{cases} \text{accept} & \text{if } D \text{ does not accept } \langle D\rangle, \\ \text{reject} & \text{if } D \text{ accepts } \langle D\rangle. \end{cases}
$$

If $D$ accepts $\langle D\rangle$ then by its definition it rejects $\langle D\rangle$, and if it does not accept $\langle D\rangle$ then it accepts it. Both are impossible. So $D$ cannot exist, and therefore neither can $H$.
:::

Where is the diagonal? List all machines $M_1, M_2, \dots$ and form the infinite table whose entry in row $i$, column $j$ says whether $M_i$ accepts $\langle M_j\rangle$. $H$ could compute every entry. $D$ is built to disagree with the diagonal: on input $\langle M_i\rangle$ it does the opposite of entry $(i, i)$. So $D$ differs from every row — but $D$ is a machine, so it must be some row $M_k$, and in column $k$ it would have to differ from itself.

::: example The diagonal table {#ex-diagonal-table}
Suppose the first four machines in a list behave as follows on the descriptions of the first four machines ("acc" = accepts; "—" = rejects or loops):

| | $\langle M_1\rangle$ | $\langle M_2\rangle$ | $\langle M_3\rangle$ | $\langle M_4\rangle$ |
|---|---|---|---|---|
| $M_1$ | acc | — | acc | — |
| $M_2$ | acc | acc | acc | acc |
| $M_3$ | — | — | — | acc |
| $M_4$ | acc | — | acc | — |

What does $D$ do on these four inputs, and why is $D$ not one of $M_1, \dots, M_4$?
::: solution
$D$ reverses the diagonal $(\text{acc}, \text{acc}, \text{—}, \text{—})$: it rejects $\langle M_1\rangle$, rejects $\langle M_2\rangle$, accepts $\langle M_3\rangle$ and accepts $\langle M_4\rangle$. Its row is $(\text{—}, \text{—}, \text{acc}, \text{acc})$, which differs from row $i$ in column $i$ for each $i$. It also differs from row $1$ elsewhere, but the diagonal guarantees a difference with *every* row, however long the list. Since $D$ would be a Turing machine if $H$ existed, $D = M_k$ for some $k$, and its entry in column $k$ would have to be both the diagonal entry and its opposite.
:::
:::

### A program that defeats every halting checker

The argument is constructive in a useful sense: given any claimed halting checker, it produces a specific program on which the checker is wrong. In Python, where functions are values, the construction takes a few lines. We cannot run a real "halting decider" — none exists — but we can run the construction against a few plausible candidates and watch each one fail:

```python
import inspect, threading

def contrary(halts):
    """Build the program that does the opposite of what `halts` predicts for it."""
    def d():
        if halts(d):
            while True:                      # predicted to halt: loop for ever
                pass
        return "halted"                      # predicted to loop: halt at once
    return d

def observe(f, seconds=0.5):
    """Run f in a background thread and report what we see within a time limit."""
    t = threading.Thread(target=f, daemon=True)
    t.start(); t.join(seconds)
    return "still running" if t.is_alive() else "halted"

candidates = {
    "always yes": lambda f: True,
    "always no": lambda f: False,
    "no 'while' in source": lambda f: "while" not in inspect.getsource(f),
}
for name, h in candidates.items():
    d = contrary(h)
    print(f"{name:22} predicts {'halts' if h(d) else 'loops':6}  observed: {observe(d)}")
```

```console
$ python3 diagonal.py
always yes             predicts halts   observed: still running
always no              predicts loops   observed: halted
no 'while' in source   predicts loops   observed: halted
```

"Still running after half a second" is only an observation, of course; but here we can see from the code that `d` is in a `while True` loop that it never leaves. However clever the candidate, `contrary` produces a program on which it is wrong — provided the candidate always returns an answer. A candidate that sometimes runs for ever (for instance, one that simulates its argument) escapes the contradiction only by failing to be a decider.

## The halting problem

$A_{\mathsf{TM}}$ asks about acceptance. The question programmers ask is about halting:

$$
\mathit{HALT}_{\mathsf{TM}} = \{\langle M, w\rangle : M \text{ is a TM and } M \text{ halts on input } w\}.
$$

::: theorem Undecidability of the halting problem {#thm-halt}
$\mathit{HALT}_{\mathsf{TM}}$ is undecidable. It is Turing-recognisable.
:::

::: proof
*Recognisable:* simulate $M$ on $w$ and accept if it halts (whether by accepting or rejecting).

*Undecidable:* suppose a decider $R$ for $\mathit{HALT}_{\mathsf{TM}}$ existed. Then the following machine $S$ would decide $A_{\mathsf{TM}}$:

> $S$ = "On input $\langle M, w\rangle$: run $R$ on $\langle M, w\rangle$. If $R$ rejects, **reject** ($M$ loops on $w$, so it does not accept). If $R$ accepts, simulate $M$ on $w$ until it halts — which it must — and **accept** if $M$ accepted, **reject** if it rejected."

$S$ always halts and accepts exactly when $M$ accepts $w$. This contradicts [[#thm-atm]], so $R$ does not exist.
:::

::: example Bounded acceptance is decidable {#ex-bounded}
Show that $A_{\mathsf{TM}}^{(k)} = \{\langle M, w, 1^k\rangle : M \text{ accepts } w \text{ within } k \text{ steps}\}$ is decidable, and explain why this does not help to decide $A_{\mathsf{TM}}$.
::: solution
Decider: simulate $M$ on $w$ for at most $k$ steps with the universal machine and accept iff $M$ has accepted by then. The simulation always stops, after $k$ simulated steps at most. To decide $A_{\mathsf{TM}}$ with it we would need, for each $\langle M, w\rangle$, a bound $k$ such that if $M$ accepts $w$ at all, it does so within $k$ steps. If a computable function $f$ gave such a bound $f(\langle M, w\rangle)$, then "simulate for $f(\langle M, w\rangle)$ steps" would decide $A_{\mathsf{TM}}$, contradicting [[#thm-atm]]. So no computable function of $\langle M, w\rangle$ bounds the running time of accepting computations. The busy beaver function of the exercises in [[theory-of-computation/turing-machines]] is the most famous illustration: it grows faster than every computable function.
:::
:::

This proof did not repeat the diagonal argument. It showed that a decider for $\mathit{HALT}_{\mathsf{TM}}$ could be *used* to decide $A_{\mathsf{TM}}$, so the former problem is at least as hard as the latter. That is a **reduction**, the main tool of the next chapter.

::: warning What the halting theorem does and does not say
It says there is no *single* algorithm that answers correctly for *all* pairs $\langle M, w\rangle$. It does not say that we can never tell whether a *particular* program halts: for most programs we write, we can, and termination checkers (for example in the proof assistants Coq/Rocq, Agda and Lean, as of 2026) prove termination of large classes of functions automatically. Any such tool must, on some programs, answer "don't know" or run for ever. Nor does the theorem depend on running time: a program that has not halted after a billion steps may still halt later, and no fixed time-out is correct for all programs. And it is not a quirk of Turing machines: by the Church–Turing thesis, it applies to every programming language and every computer.
:::

## Recognisable, co-recognisable, decidable

A language is **co-Turing-recognisable** if its complement is Turing-recognisable. Decidable languages are both, and conversely:

::: theorem Decidable = recognisable and co-recognisable {#thm-co-re}
A language $L$ is decidable if and only if both $L$ and $\overline{L}$ are Turing-recognisable.
:::

::: proof
($\Rightarrow$) A decider for $L$ recognises $L$; swapping its accept and reject states gives a decider, hence a recogniser, for $\overline{L}$.

($\Leftarrow$) Let $M_1$ recognise $L$ and $M_2$ recognise $\overline{L}$. On input $w$, run $M_1$ and $M_2$ **in parallel** — alternately one step of each, using two tapes — until one of them accepts. Every $w$ is in $L$ or in $\overline{L}$, so one of the two machines eventually accepts. If $M_1$ accepts, accept; if $M_2$ accepts, reject. This machine always halts and accepts exactly $L$.
:::

::: corollary $\overline{A_{\mathsf{TM}}}$ is not Turing-recognisable {#cor-atm-complement}
The complement of $A_{\mathsf{TM}}$ — the pairs $\langle M, w\rangle$ such that $M$ does not accept $w$ (together with strings that are not valid encodings) — is not Turing-recognisable.
:::

::: proof
$A_{\mathsf{TM}}$ is recognisable ([[#prop-atm-recognisable]]). If $\overline{A_{\mathsf{TM}}}$ were recognisable too, $A_{\mathsf{TM}}$ would be decidable by [[#thm-co-re]], contradicting [[#thm-atm]].
:::

So the inclusions "decidable $\subsetneq$ recognisable $\subsetneq$ all languages" are both strict, with $A_{\mathsf{TM}}$ and $\overline{A_{\mathsf{TM}}}$ as witnesses. Intuitively: if $M$ accepts $w$, there is a finite certificate (the accepting computation) that a machine can find by simulation; if $M$ does not accept $w$ because it loops, no finite amount of simulation can confirm it.

::: example A recognisable language and its complement {#ex-co-re}
Let $E_{\mathsf{TM}}^{\ne} = \{\langle M\rangle : L(M) \ne \emptyset\}$. Show that it is Turing-recognisable, and explain why the same idea does not recognise $\{\langle M\rangle : L(M) = \emptyset\}$.
::: solution
Recogniser: on input $\langle M\rangle$, for $i = 1, 2, 3, \dots$ run $M$ for $i$ steps on each of the first $i$ strings $s_1, \dots, s_i$ in shortlex order, and accept if any of these runs accepts. This is the dovetailing of [[theory-of-computation/turing-machines#thm-enumerator]]. If $M$ accepts some $s_j$, within $t$ steps say, the recogniser accepts in round $\max(j, t)$. If $L(M) = \emptyset$ it runs for ever.

For the complement we would have to confirm that *no* string is ever accepted — infinitely many strings, each possibly needing unbounded time — and no finite stage of the search gives a certificate. Indeed $\{\langle M\rangle : L(M) = \emptyset\}$ is not recognisable (see [[theory-of-computation/reductions]]); by [[#thm-co-re]], since its complement is recognisable, it must therefore be undecidable as well.
:::
:::

::: widget cantor
mode: pairing
size: 8
caption: Dovetailing in a picture. Row $i$ is the input $s_i$, column $t$ is "run for $t$ steps". The zig-zag order visits every pair $(i, t)$ after finitely many steps, so a recogniser that follows it will find every accepting computation — even though some runs (some rows) never end. This is how $E_{\mathsf{TM}}^{\ne}$ in [[#ex-co-re]] is recognised, and how an enumerator lists a recognisable language.
:::

::: quiz
Which statements are true?
- [x] If $L$ is recognisable and not decidable, then $\overline{L}$ is not recognisable.
- [ ] If $L$ is not decidable, then $\overline{L}$ is not recognisable.
- [x] $\mathit{HALT}_{\mathsf{TM}}$ is recognisable.
- [ ] Every language is either recognisable or co-recognisable.
::: solution
The first is [[#thm-co-re]] in contrapositive form. The second fails for $L = \overline{A_{\mathsf{TM}}}$: it is undecidable, but its complement $A_{\mathsf{TM}}$ is recognisable. $\mathit{HALT}_{\mathsf{TM}}$ is recognised by simulation. The last fails: by counting, there are uncountably many languages, but only countably many are recognisable or co-recognisable; [[theory-of-computation/reductions]] gives an explicit example, $EQ_{\mathsf{TM}}$.
:::
:::

::: history
Georg Cantor introduced the diagonal argument in 1891 to show that the real numbers are uncountable. Kurt Gödel used a related self-reference in his incompleteness theorems (1931): any consistent, effectively axiomatised theory of arithmetic contains true statements it cannot prove. Alan Turing's 1936 paper "On computable numbers" adapted diagonalisation to machines, proving that no machine can decide whether an arbitrary machine ever prints a given symbol, and deduced that Hilbert's *Entscheidungsproblem* has no solution; Church reached the same conclusion with the λ-calculus. The modern formulation as the *halting* problem is due to later authors — Martin Davis's textbook *Computability and Unsolvability* (1958) popularised the term. The decision procedures for finite automata are from Rabin and Scott (1959), and those for context-free grammars from Bar-Hillel, Perles and Shamir (1961). In 1970 Yuri Matiyasevich, completing work of Martin Davis, Hilary Putnam and Julia Robinson, proved that Hilbert's tenth problem — whether a polynomial equation with integer coefficients has an integer solution — is undecidable.
:::

## Where this leads

The proof that $\mathit{HALT}_{\mathsf{TM}}$ is undecidable used a decider for one problem to build a decider for another. [[theory-of-computation/reductions]] makes this into a method — **mapping reductions** — and uses it to prove undecidability of emptiness, equivalence and regularity of Turing machines, of every non-trivial property of programs (**Rice's theorem**), and of problems that do not mention machines at all, such as the Post correspondence problem and the ambiguity and equivalence of context-free grammars. Restricting the resources a decider may use leads to [[complexity]].

::: summary
- A **decision problem** is a language of encoded yes-instances; an algorithm for it is a decider ([[theory-of-computation/turing-machines#def-recognisable]]).
- Acceptance, emptiness and equivalence for DFAs, NFAs and regular expressions are decidable ([[#thm-dec-regular]]); acceptance and emptiness for CFGs are decidable, so every CFL is decidable ([[#thm-dec-cfg]]). Equivalence of CFGs is not.
- There are countably many machines but uncountably many languages, so some languages are not recognisable ([[#thm-counting]]).
- $A_{\mathsf{TM}}$ is recognisable (by the universal machine) but **undecidable** ([[#thm-atm]]), by diagonalisation: a decider $H$ would give a machine $D$ that contradicts itself on $\langle D\rangle$.
- The **halting problem** is undecidable ([[#thm-halt]]): a decider for it would decide $A_{\mathsf{TM}}$.
- $L$ is decidable iff $L$ and $\overline{L}$ are both recognisable ([[#thm-co-re]]); hence $\overline{A_{\mathsf{TM}}}$ is not recognisable.
:::

## Exercises

::: exercise Decidable or not? {level=1}
Show that the following are decidable: (a) $\{\langle A\rangle : A \text{ is a DFA and } L(A) \text{ is infinite}\}$; (b) $\{\langle A\rangle : A \text{ is a DFA accepting some palindrome}\}$. Why does (b) need more than the DFA algorithms?
::: solution
(a) Decidable by the cycle test of [[theory-of-computation/finite-automata#thm-emptiness]]: $L(A)$ is infinite iff some cycle lies on a path from the start state to an accepting state.

(b) Decidable as well, but not by DFA methods alone, since the palindromes are not regular. The palindromes form a context-free language, so $L(A) \cap \mathrm{PAL}$ is context-free and a grammar for it can be constructed from $A$ and a grammar for $\mathrm{PAL}$ ([[theory-of-computation/pushdown-automata#thm-cf-regular]]); then test non-emptiness with $E_{\mathsf{CFG}}$ ([[#thm-dec-cfg]]).
:::
:::

::: exercise Counting machines {level=1 check="65536"}
Count the Turing machines with exactly $2$ non-halting states $q_1, q_2$, tape alphabet $\{0, 1\}$ (with $0$ as the blank) and the two halting states $q_{\text{acc}}, q_{\text{rej}}$: a machine is determined by its transition function on the $4$ pairs (state, symbol), each mapped to (new state, symbol written, direction). (Enter the number of transition functions.)
::: solution
Each of the $2 \times 2 = 4$ pairs (state, symbol) is mapped to a triple: the new state is one of $q_1, q_2, q_{\text{acc}}, q_{\text{rej}}$ ($4$ choices), the symbol written is $0$ or $1$ ($2$), and the direction is $L$ or $R$ ($2$). That is $16$ possible values per pair, and the four values are chosen independently, so there are $16^4 = 65{,}536$ transition functions. Many of them behave identically (for instance, two machines that differ only in the transitions of a state they never reach), but each is a different element of the countable list of [[#thm-counting]].
:::
:::

::: exercise A self-referential argument {level=1}
A student claims: "I can decide whether a C program halts: compile it, run it with a time-out of one hour, and say *loops* if it has not finished." Give two reasons why this is not a decider for the halting problem.
::: solution
First, a program may halt after more than an hour, and the student will wrongly say *loops*; no fixed time-out is right for all programs, since for every bound there are programs that halt just after it (for example a loop counting to a large number). Second, the diagonal construction defeats it directly: the program built by `contrary` from the student's method — "run the student's test on myself; if it says *halts*, loop; otherwise halt" — takes just over an hour to get the answer *loops* and then halts, so it is misjudged. The method is a sound *semi*-test only in one direction: if the program finishes within the hour, it certainly halts.
:::
:::

::: exercise Closure and recognisability {level=2}
Prove that if $L_1$ and $L_2$ are recognisable then $L_1 \cup L_2$ is recognisable, and that if $L$ is recognisable and $\overline{L}$ is recognisable, then $L$ is decidable — using a 2-tape machine that alternates steps.
::: solution
*Union:* on input $w$, run recognisers $M_1$ and $M_2$ in parallel, alternating single steps (two work tapes, each with a copy of $w$), and accept as soon as either accepts. If $w \in L_1 \cup L_2$ one of them accepts after finitely many of its own steps, hence after finitely many alternating steps. If not, neither accepts and the machine never accepts. (Running $M_1$ to completion first would fail when $M_1$ loops on a string in $L_2$.)

*Decidability:* this is [[#thm-co-re]]: the parallel run of a recogniser for $L$ and one for $\overline{L}$ always ends, since every string belongs to one of the two languages.
:::
:::

::: exercise Halting on the empty input {level=2}
Prove that $\mathit{HALT}_\varepsilon = \{\langle M\rangle : M \text{ halts on input } \varepsilon\}$ is undecidable, by showing how a decider for it would decide $\mathit{HALT}_{\mathsf{TM}}$.
::: solution
Given $\langle M, w\rangle$, construct the machine $M_w$ = "erase the input, write $w$ on the tape, return to the left end and run $M$". $M_w$ halts on $\varepsilon$ (indeed on every input) iff $M$ halts on $w$. The construction is a simple computable transformation of $\langle M, w\rangle$ into $\langle M_w\rangle$ (add $\lvert w\rvert + O(1)$ states that write $w$). So "on input $\langle M, w\rangle$, build $\langle M_w\rangle$ and run the decider for $\mathit{HALT}_\varepsilon$ on it" would decide $\mathit{HALT}_{\mathsf{TM}}$, contradicting [[#thm-halt]]. This is a mapping reduction, formalised in [[theory-of-computation/reductions]].
:::
:::

::: exercise A language that is neither {level=2}
Prove that $J = \{0x : x \in A_{\mathsf{TM}}\} \cup \{1x : x \notin A_{\mathsf{TM}}\}$ is neither Turing-recognisable nor co-Turing-recognisable.
::: solution
*$J$ is not recognisable.* If $M$ recognised $J$, then "on input $x$, run $M$ on $1x$" would recognise $\overline{A_{\mathsf{TM}}}$, since $1x \in J$ iff $x \notin A_{\mathsf{TM}}$. That contradicts [[#cor-atm-complement]].

*$\overline{J}$ is not recognisable.* $\overline{J} = \{0x : x \notin A_{\mathsf{TM}}\} \cup \{1x : x \in A_{\mathsf{TM}}\} \cup \{\varepsilon\}$. If $M'$ recognised it, then "on input $x$, run $M'$ on $0x$" would recognise $\overline{A_{\mathsf{TM}}}$ again. Contradiction.

So $J$ lies outside both the recognisable and the co-recognisable languages: it encodes a problem and its complement side by side, and inherits the difficulty of each.
:::
:::

::: exercise Diagonalising against deciders {level=3}
Let $M_1, M_2, \dots$ be an enumeration of all Turing machines (by their encodings in shortlex order), and let $s_1, s_2, \dots$ be the strings in shortlex order. Define $L_{\text{diag}} = \{s_i : M_i \text{ does not accept } s_i\}$. (a) Prove that $L_{\text{diag}}$ is not Turing-recognisable. (b) Is it co-recognisable? (c) Let $\mathrm{DEC} = \{\langle M\rangle : M \text{ is a decider}\}$. Prove that there is no recognisable set of deciders that includes a decider for every decidable language — that is, the deciders cannot be effectively listed. (Hint: diagonalise.)
::: solution
(a) If $M_k$ recognised $L_{\text{diag}}$, then $s_k \in L_{\text{diag}}$ iff $M_k$ accepts $s_k$ (as $M_k$ recognises it) iff $s_k \notin L_{\text{diag}}$ (by definition). Contradiction.

(b) Yes. Its complement is $\{s_i : M_i \text{ accepts } s_i\}$, which is recognised by: on input $s$, find $i$ with $s = s_i$, compute $\langle M_i\rangle$ (enumerate encodings in shortlex order and count the valid ones), and simulate $M_i$ on $s_i$ with the universal machine.

(c) Suppose an enumerator $E$ lists deciders $D_1, D_2, \dots$ among which every decidable language has a decider. Define $L = \{s_i : D_i \text{ rejects } s_i\}$. $L$ is decidable: on input $s = s_i$, run $E$ until it prints $D_i$, run $D_i$ on $s_i$ (which halts) and answer the opposite. So some $D_k$ decides $L$. But then $s_k \in L$ iff $D_k$ rejects $s_k$ iff $s_k \notin L$ — a contradiction. Hence no such enumeration exists; in particular $\mathrm{DEC}$ itself is not recognisable (a recogniser for it could be turned into such an enumerator by dovetailing).
:::
:::

::: exercise Halting for bounded-memory programs {level=3}
A **linear bounded automaton** (LBA) is a TM whose head never leaves the cells containing the input (end markers are not crossed). Prove that $A_{\mathsf{LBA}} = \{\langle M, w\rangle : M \text{ is an LBA accepting } w\}$ is decidable, by bounding the number of configurations. Why does this not contradict [[#thm-atm]]? And why does the same argument show that the halting problem for programs on a computer with a fixed amount of memory is decidable "in principle" but useless in practice?
::: solution
An LBA with $q$ states and $g$ tape symbols on an input of length $n$ has at most $q \cdot n \cdot g^n$ configurations (state, head position, tape contents). If it runs for more than that many steps, some configuration repeats, and since the machine is deterministic it will repeat for ever: it loops. So the decider simulates $M$ on $w$ for $qng^n$ steps; if $M$ has accepted, accept; otherwise (rejected or still running, hence looping) reject. This always halts.

It does not contradict [[#thm-atm]], because LBAs are a restricted class: the diagonal machine $D$ built from a decider for $A_{\mathsf{LBA}}$ would need more space than an LBA has, so $D$ is not itself an LBA and no contradiction arises.

A computer with $m$ bits of memory (including registers and disk) is a finite-state machine with $2^m$ configurations, so its halting problem is decidable by the same cycle argument. But for $m = 8 \cdot 2^{30}$ (one gibibyte) the bound $2^m$ is astronomically beyond any feasible computation, and practical tools treat real programs as if memory were unbounded — which is why the undecidability of the halting problem is the relevant theorem for programs.
:::
:::
