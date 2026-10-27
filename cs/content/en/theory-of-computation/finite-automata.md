A turnstile at a station is either *locked* or *unlocked*. Insert a coin and a locked turnstile unlocks; push it and an unlocked turnstile lets you through and locks again; push a locked one and nothing happens. That is the whole machine: two states, two possible inputs, and a rule saying which state follows which. It does not remember how many people have passed or how many coins it has swallowed — only which of its two states it is in.

Machines with a fixed, finite amount of memory are everywhere in computing. The lexical analyser of a compiler reads a program character by character and decides where each identifier, number and keyword ends. A network protocol implementation moves between states such as `LISTEN`, `SYN-RECEIVED` and `ESTABLISHED` as packets arrive. A text editor's search box, a vending machine's controller, the logic that decodes a serial line, the input validation of a web form: each reads a stream of symbols and, with finite memory, decides something about it. This chapter builds the mathematical model of all of them, the **finite automaton**, and starts the central project of this course: to say *exactly* what a given model of computation can and cannot do.

We begin with strings and languages, the vocabulary of the whole course. Then we define deterministic finite automata precisely, prove that particular automata do what we claim, learn to design them by asking "what must the machine remember?", and finish with the first structural theorems: the languages recognised by finite automata are closed under complement, union and intersection, and basic questions about them can be answered by algorithms.

## Strings and languages

Everything in this course is about **strings**: inputs to machines are strings, programs are strings, and even questions like "does this program halt?" will be phrased as questions about sets of strings. We use the set notation of [Maths Atlas: sets](/learn/maths/lesson.php?c=proofs&l=sets) throughout.

::: definition Alphabets, strings and languages {#def-strings}
An **alphabet** is a finite non-empty set $\Sigma$, whose elements are called **symbols**. A **string** (or **word**) over $\Sigma$ is a finite sequence $w = a_1 a_2 \cdots a_n$ of symbols $a_i \in \Sigma$; its **length** is $\lvert w\rvert = n$. The unique string of length $0$ is the **empty string** $\varepsilon$. The set of all strings over $\Sigma$ is $\Sigma^*$, and $\Sigma^n$ is the set of strings of length exactly $n$. A **language** over $\Sigma$ is any subset $L \subseteq \Sigma^*$.
:::

So $\{0, 1\}$ is an alphabet, $0110$ is a string over it of length $4$, and $\{0,1\}^* = \{\varepsilon, 0, 1, 00, 01, 10, 11, 000, \dots\}$ is infinite although every one of its elements is finite. Languages can be finite ($\{\varepsilon, 01\}$), empty ($\emptyset$, which is *not* the same as $\{\varepsilon\}$), or infinite ("all binary strings with an even number of $1$s", "all syntactically valid Python programs").

The basic operation on strings is **concatenation**: if $x = a_1\cdots a_m$ and $y = b_1 \cdots b_n$ then $xy = a_1 \cdots a_m b_1 \cdots b_n$, of length $m + n$. Concatenation is associative, $(xy)z = x(yz)$, and $\varepsilon$ is its identity, $\varepsilon w = w\varepsilon = w$; it is not commutative ($01 \ne 10$). We write $w^k$ for $w$ concatenated with itself $k$ times ($w^0 = \varepsilon$) and $w^R$ for the **reverse** of $w$. If $w = xyz$ then $x$ is a **prefix**, $z$ a **suffix** and $y$ a **substring** of $w$.

Because languages are sets, they can be combined with $\cup$, $\cap$ and complement $\overline{L} = \Sigma^* \setminus L$. Three further operations are built from concatenation:

::: definition Operations on languages {#def-lang-ops}
For languages $A, B \subseteq \Sigma^*$:

- the **concatenation** $AB = \{xy : x \in A,\ y \in B\}$;
- the **powers** $A^0 = \{\varepsilon\}$ and $A^{k+1} = A^k A$;
- the **Kleene star** $A^* = \bigcup_{k \ge 0} A^k$, the set of all concatenations of zero or more strings from $A$.
:::

For example, if $A = \{0, 11\}$ then $A^2 = \{00, 011, 110, 1111\}$, and $A^*$ consists of all strings that can be cut into blocks $0$ and $11$ — exactly the binary strings in which every maximal run of $1$s has even length. Note that $\varepsilon \in A^*$ for every $A$, even $A = \emptyset$: $\emptyset^* = \{\varepsilon\}$. The notation $\Sigma^*$ is the special case $A = \Sigma$.

One further convention: we order strings in **shortlex** (or *length-lexicographic*) order — shorter strings first, strings of the same length in dictionary order — so $\varepsilon, 0, 1, 00, 01, 10, 11, 000, \dots$. Unlike plain dictionary order, every string has only finitely many predecessors, so this order lists $\Sigma^*$ as a sequence. We will need this when we enumerate languages in [[theory-of-computation/decidability]].

::: quiz
Let $A = \{\varepsilon, 1\}$ and $B = \{0\}$. Which of the following strings are in $AB^*A$?
- [x] $\varepsilon$
- [x] $1001$
- [ ] $0110$
- [x] $000$
::: solution
$AB^*A$ consists of an optional $1$, then any number of $0$s, then an optional $1$: the strings $0^k$, $10^k$, $0^k1$ and $10^k1$ for $k \ge 0$. So $\varepsilon$ ($k = 0$, both optional parts empty), $1001$ and $000$ belong to it, but $0110$ does not: it starts with $0$, so the first factor is $\varepsilon$, and then the $0$s must be followed by at most one $1$.
:::
:::

## Deterministic finite automata

A finite automaton reads its input once, left to right, one symbol at a time. At each moment it is in one of finitely many **states**; reading a symbol moves it to a new state determined entirely by the old state and the symbol. When the input is exhausted it **accepts** if its current state is one of the designated **accepting** states, and **rejects** otherwise. There is no other memory, no way to go back, and no output except accept or reject.

::: definition Deterministic finite automaton {#def-dfa}
A **deterministic finite automaton** (DFA) is a 5-tuple $M = (Q, \Sigma, \delta, q_0, F)$ where

1. $Q$ is a finite set of **states**;
2. $\Sigma$ is an alphabet;
3. $\delta\colon Q \times \Sigma \to Q$ is the **transition function**;
4. $q_0 \in Q$ is the **start state**;
5. $F \subseteq Q$ is the set of **accepting** (or **final**) states.
:::

Note that $\delta$ is a *total* function: for every state and every symbol there is exactly one next state. That is what *deterministic* means here, and it matters for some of the constructions below.

We draw a DFA as a **state diagram**: a directed graph with a vertex for each state, an arrow labelled $a$ from $q$ to $\delta(q, a)$, an unlabelled arrow into the start state, and a double circle around each accepting state. Equivalently, we can write $\delta$ as a table with a row per state and a column per symbol — exactly the representation a program uses.

To say what a DFA does with a whole string we extend $\delta$ from symbols to strings.

::: definition Extended transition function and language of a DFA {#def-dfa-language}
For a DFA $M = (Q, \Sigma, \delta, q_0, F)$, the **extended transition function** $\hat\delta\colon Q \times \Sigma^* \to Q$ is defined by recursion on the length of the string:

$$
\hat\delta(q, \varepsilon) = q, \qquad \hat\delta(q, wa) = \delta\bigl(\hat\delta(q, w),\, a\bigr) \quad (w \in \Sigma^*,\ a \in \Sigma).
$$ {#eq-delta-hat}

$M$ **accepts** $w$ if $\hat\delta(q_0, w) \in F$ and **rejects** it otherwise. The **language of $M$** (the language $M$ **recognises**) is $L(M) = \{ w \in \Sigma^* : \hat\delta(q_0, w) \in F\}$. A language is **regular** if some DFA recognises it.
:::

Equivalently, $M$ accepts $w = a_1 \cdots a_n$ if there is a sequence of states $r_0, r_1, \dots, r_n$ with $r_0 = q_0$, $r_{i} = \delta(r_{i-1}, a_i)$ for $1 \le i \le n$, and $r_n \in F$; this sequence is the **run** of $M$ on $w$, and it is unique. A DFA recognises exactly one language — the set of *all* strings it accepts. "$M$ recognises $L$" means $M$ accepts every string in $L$ *and* rejects every string outside it; accepting the strings of $L$ alone is not enough.

The recursion [[#eq-delta-hat]] peels symbols off the right-hand end. It is often convenient to split a string anywhere:

::: lemma Runs compose {#lem-compose}
For every state $q$ and all strings $x, y \in \Sigma^*$, $\hat\delta(q, xy) = \hat\delta\bigl(\hat\delta(q, x), y\bigr)$.
:::

::: proof
By induction on $\lvert y\rvert$ (see [Maths Atlas: induction](/learn/maths/lesson.php?c=proofs&l=induction)). If $y = \varepsilon$ both sides equal $\hat\delta(q, x)$. Otherwise $y = za$ with $a \in \Sigma$, and by the definition, then the induction hypothesis for $z$, then the definition again,

$$
\hat\delta(q, xza) = \delta\bigl(\hat\delta(q, xz), a\bigr) = \delta\bigl(\hat\delta(\hat\delta(q, x), z), a\bigr) = \hat\delta\bigl(\hat\delta(q, x), za\bigr).
$$
:::

[[#lem-compose]] is what "the machine has no other memory" means formally: once you know the state reached after reading $x$, the rest of the computation depends only on that state, not on $x$ itself.

### A first example: divisibility by three

Let $L_3$ be the set of binary strings whose value as a binary numeral is divisible by $3$ (leading zeros allowed, and $\varepsilon$ counts as $0$). So $\varepsilon, 0, 11, 110, 1001 \in L_3$ but $1, 10, 1011 \notin L_3$.

How can a machine with finite memory decide this for numbers of any size? Reading a binary numeral from the left, if the prefix read so far has value $v$ and the next bit is $b$, the new prefix has value $2v + b$. And the remainder of $2v + b$ modulo $3$ depends only on $v \bmod 3$ and $b$. So the machine need only remember the remainder of the prefix: three states.

::: example A DFA for divisibility by three {#ex-mod3}
Give a DFA for $L_3$, draw its transition table and trace it on $1001$ and $1011$.
::: solution
Let $Q = \{r_0, r_1, r_2\}$, $\Sigma = \{0,1\}$, start state $r_0$, $F = \{r_0\}$, and $\delta(r_i, b) = r_{(2i + b) \bmod 3}$:

| state | on $0$ | on $1$ |
|---|---|---|
| $\to r_0$ (accepting) | $r_0$ | $r_1$ |
| $r_1$ | $r_2$ | $r_0$ |
| $r_2$ | $r_1$ | $r_2$ |

On $1001$ (value $9$) the run is $r_0 \xrightarrow{1} r_1 \xrightarrow{0} r_2 \xrightarrow{0} r_1 \xrightarrow{1} r_0$: accept. On $1011$ (value $11$) it is $r_0 \xrightarrow{1} r_1 \xrightarrow{0} r_2 \xrightarrow{1} r_2 \xrightarrow{1} r_2$: reject, and indeed $11 = 3\cdot 3 + 2$ — the final state is the remainder.
:::
:::

::: widget graph
nodes: r0@0,0; r1@2,0; r2@4,0
edges: r0>r0:0; r0>r1:1; r1>r0:1; r1>r2:0; r2>r1:0; r2>r2:1
algorithm: bfs
start: r0
caption: The divisibility-by-three DFA of [[#ex-mod3]]. Edge labels are the input symbols $0$ and $1$; $r_0$ is both the start state and the only accepting state. Follow the arrows for a few numerals of your own (try $110$ and $1111$) and check that you always end in the state $r_v$ with $v$ the remainder. Stepping through breadth-first search from $r_0$ shows that every state is reachable — the same search decides whether a DFA accepts anything at all ([[#thm-emptiness]]).
:::

The table and the trace convince us, but a DFA is a mathematical object and we can *prove* that it recognises $L_3$. The trick, which recurs throughout the course, is to prove a stronger statement about every state, not just about acceptance.

::: theorem Correctness of the mod-3 automaton {#thm-mod3}
For the DFA of [[#ex-mod3]] and every $w \in \{0,1\}^*$, $\hat\delta(r_0, w) = r_{v(w) \bmod 3}$, where $v(w)$ is the value of $w$ as a binary numeral. Consequently the DFA recognises $L_3$.
:::

::: proof
By induction on $\lvert w \rvert$. For $w = \varepsilon$, $\hat\delta(r_0, \varepsilon) = r_0$ and $v(\varepsilon) = 0$. For $w = ub$ with $b \in \{0,1\}$, the value is $v(ub) = 2v(u) + b$. By the induction hypothesis $\hat\delta(r_0, u) = r_i$ with $i = v(u) \bmod 3$, so

$$
\hat\delta(r_0, ub) = \delta(r_i, b) = r_{(2i + b) \bmod 3} = r_{(2v(u) + b) \bmod 3} = r_{v(ub) \bmod 3},
$$

using that $2i + b \equiv 2v(u) + b \pmod 3$. Finally $w$ is accepted iff $\hat\delta(r_0, w) = r_0$ iff $v(w) \equiv 0 \pmod 3$.
:::

### Simulating a DFA

A DFA is also a program, and a very fast one: one table lookup per input symbol, $\Theta(n)$ time for an input of length $n$, and constant memory beyond the table. Here is a direct implementation, storing $\delta$ as a dictionary keyed by (state, symbol) pairs ([[programming-1/dictionaries-sets]]):

```python
class DFA:
    def __init__(self, states, alphabet, delta, start, accept):
        self.states, self.alphabet = set(states), set(alphabet)
        self.delta, self.start, self.accept = delta, start, set(accept)
        for q in self.states:                    # insist on a complete DFA
            for a in self.alphabet:
                assert (q, a) in delta, f"missing transition from {q} on {a}"

    def run(self, w):
        q = self.start
        trace = [q]
        for a in w:
            q = self.delta[(q, a)]               # one table lookup per symbol
            trace.append(q)
        return q in self.accept, trace

# binary numbers whose value is divisible by 3: state r = value mod 3
mod3 = DFA({0, 1, 2}, "01",
           {(r, a): (2 * r + int(a)) % 3 for r in range(3) for a in "01"},
           start=0, accept={0})

for w in ["", "0", "11", "110", "1001", "1011", "10010"]:
    ok, trace = mod3.run(w)
    print(f"{w!r:9} value {int(w or '0', 2):2}  states {trace}  accept={ok}")
```

```console
$ python3 dfa.py
''        value  0  states [0]  accept=True
'0'       value  0  states [0, 0]  accept=True
'11'      value  3  states [0, 1, 0]  accept=True
'110'     value  6  states [0, 1, 0, 0]  accept=True
'1001'    value  9  states [0, 1, 2, 1, 0]  accept=True
'1011'    value 11  states [0, 1, 2, 2, 2]  accept=False
'10010'   value 18  states [0, 1, 2, 1, 0, 0]  accept=True
```

Production lexers do the same with a two-dimensional array indexed by state number and byte value, often generated automatically from a description of the tokens; we will see how in [[theory-of-computation/regular-expressions]].

## Designing finite automata

The divisibility example shows the method that works for almost every DFA design: **decide what the machine must remember about the prefix read so far**, make one state for each possible value of that information, and check that the information can be updated from one symbol to the next. If you can find finitely many "summaries" of prefixes such that (i) the summary of $wa$ is determined by the summary of $w$ and $a$, and (ii) whether $w \in L$ is determined by the summary of $w$, you have a DFA. [[theory-of-computation/non-regular-languages]] turns this idea into an exact characterisation of the regular languages, the Myhill–Nerode theorem.

::: example Even number of zeros, ending in one {#ex-design-parity}
Design DFAs over $\{0,1\}$ for (a) $E = $ strings with an even number of $0$s, and (b) $D = $ strings that end in $1$.
::: solution
(a) The machine needs only the parity of the number of $0$s read so far: states $e$ (even, start, accepting) and $o$ (odd). A $0$ swaps them and a $1$ leaves the state unchanged: $\delta(e,0) = o$, $\delta(o,0) = e$, $\delta(e,1) = e$, $\delta(o,1) = o$.

(b) The machine needs only the last symbol read (or that there is none): states $n$ (last symbol is not $1$ — including the empty prefix; start) and $y$ (last symbol is $1$; accepting). From either state, $1$ leads to $y$ and $0$ to $n$.

In both cases the proof of correctness is an induction like [[#thm-mod3]] with the invariant "the state records the parity" or "the state records whether the last symbol is $1$".
:::
:::

A more demanding design is a **substring detector**: accept strings that contain a given pattern. Here the information to remember is *how much of the pattern we have matched so far* — more precisely, the longest suffix of the input read so far that is a prefix of the pattern.

::: example Strings containing 101 {#ex-101}
Build a DFA for $C = \{w \in \{0,1\}^* : w \text{ contains } 101 \text{ as a substring}\}$ and trace it on $1001011$.
::: solution
Let state $s_k$ mean "the longest suffix of the input that is a prefix of $101$ has length $k$", for $k = 0, 1, 2$, and let $s_3$ mean "$101$ has been seen" (accepting, and absorbing: once seen, always seen). The transitions follow from the meaning:

| state | meaning | on $0$ | on $1$ |
|---|---|---|---|
| $\to s_0$ | no progress | $s_0$ | $s_1$ |
| $s_1$ | suffix $1$ | $s_2$ | $s_1$ |
| $s_2$ | suffix $10$ | $s_0$ | $s_3$ |
| $s_3$ (accepting) | seen $101$ | $s_3$ | $s_3$ |

The tricky entries are the "failures". From $s_1$ (suffix $1$), reading $1$ gives suffix $11$, whose longest suffix that is a prefix of $101$ is $1$: stay in $s_1$, not back to $s_0$. From $s_2$ (suffix $10$), reading $0$ gives $100$, and no non-empty suffix of $100$ starts $101$: go to $s_0$.

On $1001011$: $s_0 \xrightarrow{1} s_1 \xrightarrow{0} s_2 \xrightarrow{0} s_0 \xrightarrow{1} s_1 \xrightarrow{0} s_2 \xrightarrow{1} s_3 \xrightarrow{1} s_3$. Accept: the occurrence of $101$ is at positions $4$–$6$.
:::
:::

The construction generalises to any pattern $p$ of length $m$: states $s_0, \dots, s_m$, with the failure transitions computed from the pattern. This is the automaton behind the Knuth–Morris–Pratt string-matching algorithm, which finds all occurrences of $p$ in a text of length $n$ in $O(n + m)$ time after building the automaton.

::: widget graph
nodes: s0@0,0; s1@2,0; s2@4,0; s3@6,0
edges: s0>s0:0; s0>s1:1; s1>s1:1; s1>s2:0; s2>s0:0; s2>s3:1; s3>s3:0; s3>s3:1
algorithm: none
caption: The substring detector for $101$ ([[#ex-101]]); $s_3$ is accepting. Trace $1001011$ along the arrows, then try $1100$ and $0110$, which do not contain $101$, and see which state each ends in.
:::

Not every condition can be checked with finite memory. To accept strings with equally many $0$s and $1$s, a machine would need to remember the difference between the counts, which can be any integer; we will prove in [[theory-of-computation/non-regular-languages]] that no DFA recognises this language. Even regular languages can need many states: accepting the strings whose $k$-th symbol *from the end* is $1$ requires remembering the last $k$ symbols, and we will see that every DFA for it needs at least $2^k$ states — a fact that motivates the nondeterministic automata of [[theory-of-computation/nondeterminism]].

::: quiz
How many states does the smallest DFA have that accepts the binary strings of length exactly $2$ (over $\Sigma = \{0,1\}$)?
- [ ] $2$
- [ ] $3$
- [x] $4$
- [ ] $5$
::: solution
The machine must count the symbols read: $0$, $1$, $2$ (accepting) or "more than $2$". The last is a **dead state** (a non-accepting state that loops to itself on every symbol), and it is needed because $\delta$ is total: after reading a third symbol the machine must go *somewhere*, and it must never accept again. Fewer states cannot work: the prefixes $\varepsilon$, $0$, $00$ and $000$ must lead to four different states, because for each pair some continuation distinguishes them (for example $\varepsilon$ and $0$ are distinguished by appending $00$, which gives $00 \in L$ and $000 \notin L$).
:::
:::

## Closure properties

We now ask how the regular languages behave as a *class*. If $A$ and $B$ are regular, are $\overline{A}$, $A \cup B$, $A \cap B$ regular? The answers are yes, and the proofs are constructions: from DFAs for $A$ and $B$ we build a DFA for the new language. Such **closure properties** are useful in two directions: they build complicated automata from simple ones, and (in [[theory-of-computation/non-regular-languages]]) they help prove that languages are *not* regular.

::: theorem Closure under complement {#thm-complement}
If $A \subseteq \Sigma^*$ is regular then so is $\overline{A} = \Sigma^* \setminus A$.
:::

::: proof
Let $M = (Q, \Sigma, \delta, q_0, F)$ recognise $A$ and let $M' = (Q, \Sigma, \delta, q_0, Q \setminus F)$, which swaps accepting and non-accepting states. Both machines have the same unique run on each $w$, ending in $\hat\delta(q_0, w)$. So $w \in L(M')$ iff $\hat\delta(q_0, w) \notin F$ iff $w \notin A$.
:::

::: warning Complementing requires a complete deterministic automaton
The proof uses two facts: every string has a run (because $\delta$ is total), and exactly one run (because $M$ is deterministic). Drawings of DFAs often omit the dead state and its arrows to reduce clutter; if you swap accepting states in such a partial diagram, the strings that "fall off" the diagram are rejected by both the original and the swapped machine, and the result is wrong. Add the dead state first. And for the nondeterministic automata of the next chapter, swapping accepting states does not complement the language at all — a string may have both accepting and rejecting runs. You must first convert to a DFA.
:::

For two languages we run both machines at once. A pair of states remembers the state of each machine; this is the **product construction**.

::: definition Product automaton {#def-product}
Let $M_1 = (Q_1, \Sigma, \delta_1, q_1, F_1)$ and $M_2 = (Q_2, \Sigma, \delta_2, q_2, F_2)$ be DFAs over the same alphabet. Their **product** with accepting set $F \subseteq Q_1 \times Q_2$ is

$$
M = \bigl(Q_1 \times Q_2,\ \Sigma,\ \delta,\ (q_1, q_2),\ F\bigr), \qquad \delta\bigl((p, r), a\bigr) = \bigl(\delta_1(p, a), \delta_2(r, a)\bigr).
$$
:::

::: lemma Product runs {#lem-product}
In the product automaton, $\hat\delta\bigl((p, r), w\bigr) = \bigl(\hat\delta_1(p, w), \hat\delta_2(r, w)\bigr)$ for all states $p \in Q_1$, $r \in Q_2$ and strings $w$.
:::

::: proof
By induction on $\lvert w\rvert$. For $w = \varepsilon$ both sides are $(p, r)$. For $w = ua$,
$\hat\delta((p,r), ua) = \delta\bigl(\hat\delta((p,r),u), a\bigr) = \delta\bigl((\hat\delta_1(p,u), \hat\delta_2(r,u)), a\bigr) = \bigl(\delta_1(\hat\delta_1(p,u),a), \delta_2(\hat\delta_2(r,u),a)\bigr) = \bigl(\hat\delta_1(p,ua), \hat\delta_2(r,ua)\bigr)$, using the induction hypothesis in the second step.
:::

::: theorem Closure under union and intersection {#thm-union-intersection}
If $A = L(M_1)$ and $B = L(M_2)$ are regular, then $A \cap B$ is recognised by the product with $F = F_1 \times F_2$, and $A \cup B$ by the product with $F = (F_1 \times Q_2) \cup (Q_1 \times F_2)$. Both have $\lvert Q_1\rvert \cdot \lvert Q_2\rvert$ states.
:::

::: proof
By [[#lem-product]] the product reaches $(\hat\delta_1(q_1, w), \hat\delta_2(q_2, w))$ on $w$. This pair is in $F_1 \times F_2$ iff both components are accepting, i.e. iff $w \in A$ and $w \in B$. It is in $(F_1 \times Q_2) \cup (Q_1 \times F_2)$ iff at least one component is accepting, i.e. iff $w \in A \cup B$.
:::

The same product with $F = F_1 \times (Q_2 \setminus F_2)$ recognises the difference $A \setminus B$, and with $F = \{(p, r) : p \in F_1 \text{ xor } r \in F_2\}$ the symmetric difference $A \mathbin{\triangle} B$. Any Boolean combination of finitely many regular languages is regular. (Union could also be derived from complement and intersection by De Morgan's law, $A \cup B = \overline{\overline{A} \cap \overline{B}}$.) Closure under concatenation and star is also true but is much harder to prove with DFAs; nondeterminism makes it easy, in [[theory-of-computation/nondeterminism]].

::: example A product automaton {#ex-product}
Using the DFAs of [[#ex-design-parity]], build the product DFA for $E \cap D$: strings with an even number of $0$s that end in $1$. Trace it on $0101$ and $0011$.
::: solution
States are pairs $(x, y)$ with $x \in \{e, o\}$ (parity of $0$s) and $y \in \{n, y\}$ (does the input end in $1$?). Start $(e, n)$; accepting $\{(e, y)\}$. A $0$ flips the first component and sets the second to $n$; a $1$ keeps the first and sets the second to $y$:

| state | on $0$ | on $1$ |
|---|---|---|
| $\to (e,n)$ | $(o,n)$ | $(e,y)$ |
| $(e,y)$ (accepting) | $(o,n)$ | $(e,y)$ |
| $(o,n)$ | $(e,n)$ | $(o,y)$ |
| $(o,y)$ | $(e,n)$ | $(o,y)$ |

On $0101$: $(e,n) \xrightarrow{0} (o,n) \xrightarrow{1} (o,y) \xrightarrow{0} (e,n) \xrightarrow{1} (e,y)$: accept (two $0$s, ends in $1$). On $0011$: $(e,n) \to (o,n) \to (e,n) \to (e,y) \to (e,y)$: accept as well. For the union $E \cup D$, keep the table and make $(e, n)$, $(e, y)$, $(o, y)$ accepting.
:::
:::

::: widget graph
nodes: en@0,2; ey@3,2; on@0,0; oy@3,0
edges: en>on:0; en>ey:1; ey>on:0; ey>ey:1; on>en:0; on>oy:1; oy>en:0; oy>oy:1
algorithm: none
caption: The product automaton of [[#ex-product]], with state $xy$ standing for the pair $(x, y)$: the first letter is the parity of $0$s, the second whether the last symbol was $1$. Only $ey$ accepts for $E \cap D$. Notice how every $0$ arrow changes the first letter and every $1$ arrow leaves it alone — the product machine is two independent machines running side by side.
:::

## Questions we can answer by algorithm

Because a DFA is a finite object, many questions about its *infinite* language can be settled by finite computations. This is the first appearance of a theme that dominates the end of the course, where we meet questions about programs that no algorithm can answer.

::: theorem Emptiness, finiteness and equivalence are decidable for DFAs {#thm-emptiness}
Given DFAs $M$, $M_1$, $M_2$ over $\Sigma$:

1. whether $L(M) = \emptyset$ can be decided in $O(\lvert Q\rvert \cdot \lvert\Sigma\rvert)$ time;
2. whether $L(M)$ is finite can be decided in the same time bound;
3. whether $L(M_1) = L(M_2)$ can be decided in $O(\lvert Q_1\rvert \lvert Q_2\rvert \lvert\Sigma\rvert)$ time.
:::

::: proof
(1) $L(M) \ne \emptyset$ iff some accepting state is reachable from $q_0$ in the state diagram: if $\hat\delta(q_0, w) \in F$ the run on $w$ is a path to an accepting state, and conversely the labels along any path from $q_0$ spell a string that drives $M$ along it. Reachability is decided by breadth-first or depth-first search on the diagram, which has $\lvert Q\rvert$ vertices and $\lvert Q\rvert\lvert\Sigma\rvert$ edges, in time linear in their sum ([[data-structures/graph-representations]], [[algorithms/graph-search]]).

(2) Call a state **useful** if it is reachable from $q_0$ and some accepting state is reachable from it; both sets are found by one search forwards from $q_0$ and one search backwards from $F$. We claim $L(M)$ is infinite iff the diagram restricted to useful states contains a cycle. If there is such a cycle through a useful state $q$, let $x$ lead from $q_0$ to $q$, let $y \ne \varepsilon$ label the cycle and let $z$ lead from $q$ to $F$; then $xy^kz \in L(M)$ for every $k \ge 0$, infinitely many strings. If there is no such cycle, every accepting run visits only useful states (each state on it is reachable from $q_0$ and reaches $F$), never repeats a state, and so has length less than $\lvert Q\rvert$; there are finitely many such strings. Cycle detection is depth-first search, again linear.

(3) $L(M_1) = L(M_2)$ iff the symmetric difference $L(M_1) \mathbin{\triangle} L(M_2)$ is empty. Build the product with the xor accepting set (it has $\lvert Q_1\rvert\lvert Q_2\rvert$ states) and apply (1). Only the part reachable from the start pair needs to be built.
:::

Part (3) is a genuinely useful algorithm. It is how a tool can check that a hand-optimised lexer still accepts the same tokens as its specification, and the search in part (1) automatically produces a **counterexample** — a shortest string on which the two machines disagree — when they differ.

## Where finite automata are used

The DFA model is idealised but not academic. Lexical analysers generated by tools such as `lex` and its successors are DFAs compiled into tables ([[compilers]]). Hardware designers specify controllers as **finite-state machines** that are synthesised into flip-flops and gates; the Mealy and Moore variants add an *output* to each transition or state ([Electrical Engineering Atlas](/learn/ee/)). Protocol specifications, including the TCP connection state machine in RFC 9293, are given as state diagrams ([[networks]]). Model checkers verify that a system, abstracted as a large finite automaton, never reaches a bad state. And every regular-expression search in your editor runs, in some form, an automaton of the kind we build in the next two chapters.

The limitation is the same in every case: the memory is fixed in advance, independent of the input length. A DFA with $k$ states can remember at most $\log_2 k$ bits about an input of any length. Counting, matching brackets and comparing two halves of a string are beyond it; the pushdown automata and Turing machines of later chapters add memory that grows with the input.

::: history
Finite automata have several independent origins. Warren McCulloch and Walter Pitts modelled networks of idealised neurons as threshold logic in 1943. Stephen Kleene, studying which events such nerve nets could represent, introduced regular events (our regular expressions) and proved their equivalence with finite automata in a 1951 RAND memorandum, published in 1956 in the volume *Automata Studies* edited by Claude Shannon and John McCarthy. Engineers reached the same notion through switching circuits: David Huffman's 1954 paper on the synthesis of sequential circuits, George Mealy's 1955 paper and Edward Moore's "Gedanken-experiments on sequential machines" (1956), which gave the two kinds of machine with output. The modern formulation — the 5-tuple, nondeterminism, the subset construction and closure properties — is due to Michael Rabin and Dana Scott, "Finite automata and their decision problems" (*IBM Journal of Research and Development*, 1959), for which they received the 1976 Turing Award.
:::

## Where this leads

The next chapter, [[theory-of-computation/nondeterminism]], lets an automaton guess, and shows that guessing adds convenience but no power. Then [[theory-of-computation/regular-expressions]] proves that regular expressions describe exactly the regular languages, and [[theory-of-computation/non-regular-languages]] proves the limits of finite memory and finds the smallest DFA for any regular language. The same pattern — a precise model, constructions that combine machines, and theorems about what the model cannot do — repeats for context-free languages and for Turing machines.

::: summary
- An **alphabet** is a finite set; a **language** is a set of finite strings over it. $\varepsilon$ is the empty string and $\emptyset \ne \{\varepsilon\}$. Concatenation, powers and the Kleene star build new languages ([[#def-lang-ops]]).
- A **DFA** $(Q, \Sigma, \delta, q_0, F)$ has a *total* transition function; it accepts $w$ if $\hat\delta(q_0, w) \in F$ ([[#def-dfa-language]]). The languages recognised by DFAs are the **regular languages**.
- To design a DFA, decide what finite summary of the prefix read so far is needed and can be updated symbol by symbol; prove correctness by induction with an invariant describing *every* state ([[#thm-mod3]]).
- A DFA runs in $\Theta(n)$ time with one table lookup per symbol.
- Regular languages are closed under complement (swap accepting states of a *complete* DFA) and, by the **product construction**, under union, intersection and difference ([[#thm-union-intersection]]).
- Emptiness, finiteness and equivalence of DFAs are decidable by graph search on the state diagram or on a product ([[#thm-emptiness]]).
:::

## Exercises

::: exercise Counting strings {level=1 check="6"}
How many strings of length exactly $4$ over $\{0,1\}$ does the DFA of [[#ex-mod3]] accept? (Enter the number.)
::: solution
By [[#thm-mod3]] it accepts exactly the strings whose value is divisible by $3$. Strings of length $4$ (leading zeros allowed) have the values $0, 1, \dots, 15$, of which $0, 3, 6, 9, 12, 15$ are multiples of $3$: the strings $0000, 0011, 0110, 1001, 1100, 1111$. The answer is $6$.
:::
:::

::: exercise Language operations {level=1}
Let $A = \{0, 01\}$ and $B = \{\varepsilon, 1\}$. List the elements of $AB$, $BA$ and $A^2$, and decide whether $0101 \in A^*$ and $0110 \in A^*$.
::: solution
$AB = \{0, 01, 011\}$ (note $0 \cdot 1 = 01 \cdot \varepsilon$, so only three distinct strings). $BA = \{0, 01, 10, 101\}$. $A^2 = \{00, 001, 010, 0101\}$. $0101 = 01 \cdot 01 \in A^2 \subseteq A^*$. $0110 \notin A^*$: every string in $A^*$ is a concatenation of blocks $0$ and $01$, so every $1$ is immediately preceded by a $0$; in $0110$ the second $1$ is preceded by $1$.
:::
:::

::: exercise A DFA from a description {level=1}
Give a DFA (table or diagram) over $\{a, b\}$ for the strings that start and end with the same symbol (including the strings $a$ and $b$, but not $\varepsilon$).
::: solution
Remember the first symbol and the last symbol read. States: $s$ (start, nothing read), $a_1$ (first symbol $a$, last symbol $a$; accepting), $a_2$ (first $a$, last $b$), $b_1$ (first $b$, last $b$; accepting), $b_2$ (first $b$, last $a$). Transitions: $s \xrightarrow{a} a_1$, $s \xrightarrow{b} b_1$; $a_1 \xrightarrow{a} a_1$, $a_1 \xrightarrow{b} a_2$, $a_2 \xrightarrow{a} a_1$, $a_2 \xrightarrow{b} a_2$; symmetrically $b_1 \xrightarrow{b} b_1$, $b_1 \xrightarrow{a} b_2$, $b_2 \xrightarrow{b} b_1$, $b_2 \xrightarrow{a} b_2$. $F = \{a_1, b_1\}$; $s$ is not accepting, so $\varepsilon$ is rejected. Five states.
:::
:::

::: exercise Product size {level=2 check="15"}
$M_1$ recognises binary numerals divisible by $3$ (three states, [[#ex-mod3]]) and $M_2$ recognises binary numerals divisible by $5$ (five states, $r_i \xrightarrow{b} r_{(2i+b) \bmod 5}$). How many states does the product automaton for $L(M_1) \cap L(M_2)$ have, and how many of them are reachable from the start state? Is there a DFA for the same language with fewer states? (Enter the number of reachable states.)
::: solution
The product has $3 \cdot 5 = 15$ states. From $(i, j)$, reading $b$ leads to $((2i + b) \bmod 3, (2j + b) \bmod 5)$. By the Chinese remainder theorem the pair $(v \bmod 3, v \bmod 5)$ determines $v \bmod 15$ and every pair arises from some $v \in \{0, \dots, 14\}$; the binary numeral of that $v$ drives the product to $(v \bmod 3, v \bmod 5)$. So all $15$ states are reachable. The language is "divisible by $15$", recognised by the $15$-state DFA $r_i \xrightarrow{b} r_{(2i + b) \bmod 15}$, which is the same machine with states renamed. No smaller DFA exists: the prefixes with values $0, \dots, 14$ are pairwise distinguishable (for $v \ne v'$, append enough bits that the result is divisible by $15$ for one but not the other), a technique made precise in [[theory-of-computation/non-regular-languages]].
:::
:::

::: exercise Correctness of the substring detector {level=2}
State an invariant for the DFA of [[#ex-101]] and prove by induction that it recognises $C$.
::: solution
Invariant: for every $w$, $\hat\delta(s_0, w) = s_3$ if $w$ contains $101$; otherwise $\hat\delta(s_0, w) = s_k$ where $k \in \{0,1,2\}$ is the length of the longest suffix of $w$ that is a prefix of $101$ (that is, $k = 2$ if $w$ ends in $10$, $k = 1$ if $w$ ends in $1$, $k = 0$ otherwise — note that "ends in $10$" and "ends in $1$" are exclusive).

Base: $\varepsilon$ contains no $101$, its longest such suffix is $\varepsilon$, and $\hat\delta(s_0, \varepsilon) = s_0$. Step: suppose the invariant holds for $w$ and consider $wa$. If $w$ contains $101$, so does $wa$, and $s_3$ loops on both symbols. Otherwise check each case. If $w$ is in $s_0$ ($w$ ends in neither $1$ nor $10$): $w0$ ends in $0$ but not in $10$ (as $w$ does not end in $1$), giving $s_0$; $w1$ ends in $1$, giving $s_1$; neither contains $101$, since that would require $w$ to end in $10$. If $w$ is in $s_1$ ($w$ ends in $1$): $w0$ ends in $10$, giving $s_2$; $w1$ ends in $11$, so in $1$ but not $10$, giving $s_1$; neither contains $101$, because $w$ does not end in $10$. If $w$ is in $s_2$ ($w$ ends in $10$): $w1$ ends in $101$, giving $s_3$, correctly; $w0$ ends in $00$, so in neither $1$ nor $10$, giving $s_0$. This matches the table. Since $F = \{s_3\}$, the DFA accepts exactly $C$.
:::
:::

::: exercise Complement of a partial diagram {level=2}
A student draws a DFA over $\{0,1\}$ for $\{01\}$ with states $p \xrightarrow{0} q \xrightarrow{1} r$, start $p$, accepting $\{r\}$, and no other arrows. To get a DFA for $\overline{\{01\}}$ they make $p$ and $q$ accepting and $r$ not. Which strings does the student's machine wrongly reject? Fix the construction.
::: solution
Read with the convention that a missing arrow rejects, the student's machine accepts only $\varepsilon$ and $0$ — the strings whose run ends in $p$ or $q$. Every string other than $\varepsilon$, $0$ and $01$ lies in $\overline{\{01\}}$ but falls off the diagram (it starts with $1$, or continues after $0$ with $0$, or continues after $01$), so it is wrongly rejected: for example $1$, $00$ and $010$. Fix: first complete the DFA by adding a dead state $d$ with $p \xrightarrow{1} d$, $q \xrightarrow{0} d$, $r \xrightarrow{0,1} d$, $d \xrightarrow{0,1} d$; then swap, making $p$, $q$ and $d$ accepting and $r$ not.
:::
:::

::: exercise Closure under reversal {level=3}
Prove that if $L$ is regular then so is $L^R = \{w^R : w \in L\}$. You may use the following fact from [[theory-of-computation/nondeterminism]]: a language is regular if it is recognised by a DFA that is allowed several start states, accepting $w$ if some start state leads to an accepting state on $w$ (and each such machine can be converted into an ordinary DFA). Then show that the minimal number of states can change a lot: the language of strings whose third symbol from the start is $1$ has a $5$-state DFA, while its reversal needs more.
::: solution
Let $M = (Q, \Sigma, \delta, q_0, F)$ recognise $L$. Build the reversed machine $M^R$: same states, an arrow $q \xrightarrow{a} p$ for every arrow $p \xrightarrow{a} q$ of $M$, start states $F$, accepting state $q_0$. A path $q_0 = r_0 \xrightarrow{a_1} r_1 \cdots \xrightarrow{a_n} r_n \in F$ in $M$ is exactly a path $r_n \xrightarrow{a_n} \cdots \xrightarrow{a_1} r_0$ in $M^R$ from a start state to the accepting state, labelled $a_n \cdots a_1 = w^R$. So $M^R$ accepts exactly $L^R$. $M^R$ may be nondeterministic (a state can have several incoming $a$-arrows in $M$, hence several outgoing ones in $M^R$, or none), which is why we need the fact quoted.

Third symbol from the start is $1$: states $t_0, t_1, t_2$ count the first two symbols, then $t_2 \xrightarrow{1} y$ (accepting, loops on both symbols) and $t_2 \xrightarrow{0} n$ (dead): $5$ states. The reversal is "the third symbol from the end is $1$", for which the DFA must remember the last three symbols; we show in [[theory-of-computation/nondeterminism]] that any DFA for it needs $2^3 = 8$ states.
:::
:::

::: exercise Shortest counterexample {level=3}
Two DFAs over $\{0,1\}$ are given: $M_1$ accepts strings with an even number of $1$s (states $E, O$), and $M_2$ accepts strings in which the number of $1$s is divisible by $4$ (states $c_0, c_1, c_2, c_3$, a $1$ moving $c_i$ to $c_{(i+1) \bmod 4}$ and $0$ looping). Run the equivalence test of [[#thm-emptiness]]: build the reachable part of the product with the xor accepting set and find a shortest string on which they differ. Also implement the test in Python for DFAs given as dictionaries, and run it on this pair.
::: solution
Start $(E, c_0)$. A $1$ advances both, a $0$ loops: the reachable pairs are $(E, c_0) \to (O, c_1) \to (E, c_2) \to (O, c_3) \to (E, c_0)$, four states. The xor set contains those where exactly one machine accepts: $(E, c_2)$ ($M_1$ accepts, $M_2$ does not). It is reached by $11$, the shortest string on which the machines differ.

```python
from collections import deque

def counterexample(d1, s1, f1, d2, s2, f2, sigma):
    """Shortest string accepted by exactly one DFA, or None if equivalent."""
    start = (s1, s2)
    parent = {start: None}                   # BFS tree: state -> (prev, symbol)
    queue = deque([start])
    while queue:
        p, r = queue.popleft()
        if (p in f1) != (r in f2):           # xor accepting set reached
            word, s = [], (p, r)
            while parent[s] is not None:
                s, a = parent[s]
                word.append(a)
            return "".join(reversed(word))
        for a in sigma:
            nxt = (d1[(p, a)], d2[(r, a)])
            if nxt not in parent:
                parent[nxt] = ((p, r), a)
                queue.append(nxt)
    return None

d1 = {("E", "0"): "E", ("E", "1"): "O", ("O", "0"): "O", ("O", "1"): "E"}
d2 = {(i, b): (i + int(b)) % 4 for i in range(4) for b in "01"}
print(counterexample(d1, "E", {"E"}, d2, 0, {0}, "01"))
print(counterexample(d1, "E", {"E"}, d1, "E", {"E"}, "01"))
```

```console
$ python3 equiv.py
11
None
```

Breadth-first search visits the product states in order of distance, so the first xor state found gives a shortest counterexample, and the parent pointers spell it. The running time is linear in the size of the reachable product.
:::
:::
