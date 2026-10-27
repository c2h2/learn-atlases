Type `grep -E '^[A-Z][a-z]+ [0-9]{4}$' notes.txt` and the computer prints every line consisting of a capitalised word, a space and a four-digit number. The pattern is a **regular expression**: a compact, algebraic description of a set of strings. Regular expressions are one of the few pieces of theoretical computer science that almost every programmer uses daily — in editors, in `grep` and `sed`, in input validation, in log analysis, in the lexical analysers of compilers.

So far we have described languages by *machines* that recognise them. A regular expression describes a language by *building* it from single symbols with three operations: union, concatenation and star. This chapter proves a remarkable fact, **Kleene's theorem**: the two descriptions have exactly the same power. Every regular expression can be converted into a finite automaton (we give Thompson's construction, which is what fast regex engines use), and every finite automaton can be converted into a regular expression (by eliminating states one at a time). The class of regular languages is therefore robust: it is the same whether we define it by DFAs, by NFAs or by expressions.

The last part of the chapter is practical. The "regular expressions" of programming languages have grown features — backreferences, lookaround — that take them outside the regular languages, and the most common implementation technique, backtracking, can take exponential time on innocent-looking patterns. Knowing the theory tells you which patterns are safe and why.

## Syntax and meaning

A regular expression is a string over the alphabet $\Sigma$ together with a few special symbols, defined inductively; its meaning is a language.

::: definition Regular expression {#def-regex}
The **regular expressions** over an alphabet $\Sigma$ and the languages $L(R)$ they describe are defined inductively:

1. $\emptyset$ is a regular expression, with $L(\emptyset) = \emptyset$;
2. $\varepsilon$ is a regular expression, with $L(\varepsilon) = \{\varepsilon\}$;
3. each $a \in \Sigma$ is a regular expression, with $L(a) = \{a\}$;
4. if $R_1$ and $R_2$ are regular expressions then so are
   - $(R_1 \mid R_2)$, with $L(R_1 \mid R_2) = L(R_1) \cup L(R_2)$ (**union**, also written $R_1 \cup R_2$ or $R_1 + R_2$),
   - $(R_1 R_2)$, with $L(R_1R_2) = L(R_1)\,L(R_2)$ (**concatenation**),
   - $(R_1^*)$, with $L(R_1^*) = L(R_1)^*$ (**star**).

Nothing else is a regular expression.
:::

The operations are those of [[theory-of-computation/finite-automata#def-lang-ops]]. To save parentheses, star binds tightest, then concatenation, then union: $01^* \mid 1$ means $\bigl(0(1^*)\bigr) \mid 1$. We also use the abbreviations $R^+ = RR^*$ (one or more), $R? = R \mid \varepsilon$ (optional), $R^k$ for $k$ copies, and $\Sigma$ for the union of all symbols.

::: example Reading regular expressions {#ex-read-regex}
Describe in words the languages of (a) $(0 \mid 1)^*01$, (b) $1^*(01^+)^*$, (c) $(0 \mid 1)(0 \mid 1)\bigl((0 \mid 1)(0\mid1)\bigr)^*$, (d) $0^*\emptyset$, (e) $\emptyset^*$.
::: solution
(a) All binary strings ending in $01$: anything, followed by $01$.

(b) Strings in which every $0$ is immediately followed by at least one $1$ — that is, strings with no two consecutive $0$s that do not end in $0$. The prefix $1^*$ allows leading $1$s; each block $01^+$ contributes a $0$ followed by one or more $1$s.

(c) Strings of even, non-zero length: two symbols, then pairs of symbols.

(d) $\emptyset$: concatenating with the empty language gives the empty language, because $AB$ needs a string from each factor.

(e) $\{\varepsilon\}$: the star of any language contains $\varepsilon$ (zero factors), and with no strings available there is nothing else.
:::
:::

Different expressions can describe the same language: $(0 \mid 1)^*$, $(0^*1^*)^*$ and $\bigl(\varepsilon \mid 0 \mid 1\bigr)^*$ all describe $\{0,1\}^*$. Two expressions are **equivalent**, $R \equiv S$, if $L(R) = L(S)$. A few equivalences are used constantly:

| law | statement |
|---|---|
| union | $R \mid S \equiv S \mid R$, $\ (R\mid S)\mid T \equiv R \mid (S \mid T)$, $\ R \mid R \equiv R$, $\ R \mid \emptyset \equiv R$ |
| concatenation | $(RS)T \equiv R(ST)$, $\ \varepsilon R \equiv R\varepsilon \equiv R$, $\ \emptyset R \equiv R \emptyset \equiv \emptyset$ |
| distributivity | $R(S \mid T) \equiv RS \mid RT$, $\ (S \mid T)R \equiv SR \mid TR$ |
| star | $(R^*)^* \equiv R^*$, $\ \varepsilon \mid RR^* \equiv R^*$, $\ (R \mid S)^* \equiv (R^*S^*)^*$, $\ \emptyset^* \equiv \varepsilon$ |

Each is proved by showing that both sides describe the same set; for instance $R(S \mid T) \equiv RS \mid RT$ because a string $xy$ with $x \in L(R)$ and $y \in L(S) \cup L(T)$ is in $L(R)L(S)$ or $L(R)L(T)$. Concatenation does *not* commute ($01 \not\equiv 10$), and star does not distribute over concatenation or union: $(01)^* \not\equiv 0^*1^*$ and $(0 \mid 1)^* \not\equiv 0^* \mid 1^*$. We will see that equivalence of regular expressions is decidable — convert both to DFAs and compare ([[theory-of-computation/finite-automata#thm-emptiness]]) — although no finite list of laws like those above suffices to prove every equivalence by algebra alone.

::: quiz
Which expressions describe the set of binary strings that contain at least one $1$?
- [x] $(0\mid1)^*1(0\mid1)^*$
- [x] $0^*1(0\mid1)^*$
- [ ] $0^*1^*(0\mid1)^*$
- [x] $(0\mid1)^*10^*$
::: solution
The first says "some $1$, with anything around it". The second picks out the *first* $1$, and the fourth the *last* $1$; both describe the same set. The third accepts $\varepsilon$ and $000$, since $1^*$ may be empty: it describes all strings.
:::
:::

## From regular expressions to automata

The inductive definition of regular expressions suggests an inductive construction of automata: an automaton for each base case, and a way to combine automata for $R_1$ and $R_2$ into one for $R_1 \mid R_2$, $R_1R_2$ and $R_1^*$. The NFA constructions of [[theory-of-computation/nondeterminism]] are exactly what we need. Ken Thompson's version keeps every intermediate machine in a convenient shape: exactly one start state with no incoming arrows and exactly one accepting state with no outgoing arrows.

::: theorem Thompson's construction {#thm-thompson}
For every regular expression $R$ there is an NFA $N_R$ with $L(N_R) = L(R)$. Moreover $N_R$ can be chosen with one start state that has no incoming arrows, one accepting state that has no outgoing arrows, at most $2\lvert R\rvert$ states and at most $4\lvert R\rvert$ arrows, where $\lvert R\rvert$ is the number of symbols and operators in $R$. Every state has at most two outgoing arrows.
:::

::: proof
By structural induction on $R$, building $N_R$ with start state $s$ and accepting state $f$.

*Base cases.* For $\emptyset$: two states $s, f$ and no arrows. For $\varepsilon$: an arrow $s \xrightarrow{\varepsilon} f$. For $a \in \Sigma$: an arrow $s \xrightarrow{a} f$. Each has $2$ states and at most one arrow, and clearly recognises the right language.

*Union.* Given $N_1$ (states $s_1 \to f_1$) and $N_2$ ($s_2 \to f_2$), with disjoint states, add new $s, f$ and arrows $s \xrightarrow{\varepsilon} s_1$, $s \xrightarrow{\varepsilon} s_2$, $f_1 \xrightarrow{\varepsilon} f$, $f_2 \xrightarrow{\varepsilon} f$. A run from $s$ to $f$ goes through exactly one of the two machines: it enters $N_1$ or $N_2$ by the first move, cannot cross between them (no arrows do), and can leave only through $f_1$ or $f_2$. So $L = L(N_1) \cup L(N_2)$.

*Concatenation.* Add an arrow $f_1 \xrightarrow{\varepsilon} s_2$, with start $s_1$ and accepting state $f_2$. As in [[theory-of-computation/nondeterminism#thm-nfa-concat]], every accepting run crosses from $N_1$ to $N_2$ exactly once, at the new arrow, after an accepting run of $N_1$; so $L = L(N_1)L(N_2)$. (Because $f_1$ had no outgoing arrows and $s_2$ no incoming ones, the shape is preserved.)

*Star.* Add new $s, f$ and arrows $s \xrightarrow{\varepsilon} s_1$, $s \xrightarrow{\varepsilon} f$, $f_1 \xrightarrow{\varepsilon} s_1$, $f_1 \xrightarrow{\varepsilon} f$. A run from $s$ to $f$ either takes $s \to f$ directly (reading $\varepsilon$), or enters $N_1$, passes from $s_1$ to $f_1$ some $k \ge 1$ times, returning to $s_1$ in between, and leaves through $f$. Each passage reads a string of $L(N_1)$, since inside the passage only $N_1$'s arrows are used and $s_1$ has no incoming arrows of $N_1$. So $L = L(N_1)^*$. Unlike the construction in [[theory-of-computation/nondeterminism#thm-nfa-star]] the new start state is not accepting; the arrow $s \to f$ plays that role, and because $s$ has no incoming arrows the problem described in the warning there cannot arise.

*Counting.* Each base case and each operator adds at most $2$ states and at most $4$ arrows, so the totals are at most $2\lvert R\rvert$ and $4\lvert R\rvert$. Every state has at most two outgoing arrows: one on a symbol, or up to two $\varepsilon$-arrows.
:::

The construction is linear in the size of $R$, and the resulting NFA can be simulated with sets of states ([[theory-of-computation/nondeterminism#lem-reach]]). Matching an input of length $n$ against $R$ therefore takes $O(n \cdot \lvert R\rvert)$ time in the worst case — a guarantee that holds for every pattern.

::: example Thompson's construction for $(0 \mid 1)^*01$ {#ex-thompson}
Build the Thompson NFA for $(0 \mid 1)^*01$, count its states, and say which states the simulation occupies after reading $1$.
::: solution
Number the pieces. The atoms $0$ and $1$ inside the star give $1 \xrightarrow{0} 2$ and $3 \xrightarrow{1} 4$. The union adds $5, 6$ with $5 \xrightarrow{\varepsilon} 1$, $5 \xrightarrow{\varepsilon} 3$, $2 \xrightarrow{\varepsilon} 6$, $4 \xrightarrow{\varepsilon} 6$. The star adds $7, 8$ with $7 \xrightarrow{\varepsilon} 5$, $7 \xrightarrow{\varepsilon} 8$, $6 \xrightarrow{\varepsilon} 5$, $6 \xrightarrow{\varepsilon} 8$. The final atoms are $9 \xrightarrow{0} 10$ and $11 \xrightarrow{1} 12$, joined by $8 \xrightarrow{\varepsilon} 9$ and $10 \xrightarrow{\varepsilon} 11$. Start $7$, accepting $12$: **12 states**, $\lvert R\rvert = 8$ (the symbols $0, 1, 0, 1$ and the operators $\mid$, $^*$ and two concatenations).

Initially the set is $E(\{7\}) = \{7, 5, 1, 3, 8, 9\}$: the machine is ready to read either symbol inside the loop, or to start the final $01$. Reading $1$: only $3 \xrightarrow{1} 4$ applies, giving $\{4\}$, whose closure is $\{4, 6, 5, 1, 3, 8, 9\}$. The accepting state $12$ is not in it. After a further $0$ the set contains $10$ and $11$ (the $0$ could begin the final $01$), and after $01$ it contains $12$.
:::
:::

Here is the construction as a program: a recursive-descent parser for expressions over single characters with `|`, `*` and parentheses, emitting Thompson fragments as it goes, followed by the set-of-states simulation. An empty alternative, as in `a(|b)c`, stands for $\varepsilon$.

```python
import itertools

def thompson(rx):
    """Build an NFA for rx (symbols, |, *, parentheses); return (edges, start, end)."""
    edges, pos = [], 0                       # edges: (from, label, to); label "" = epsilon
    new = itertools.count().__next__         # new() returns a fresh state number
    def frag(label):                         # two new states joined by one edge
        s, e = new(), new(); edges.append((s, label, e)); return s, e
    def eps(p, q): edges.append((p, "", q))
    def alt():
        nonlocal pos
        s1, e1 = cat()
        while pos < len(rx) and rx[pos] == "|":
            pos += 1
            (s2, e2), s, e = cat(), new(), new()
            eps(s, s1); eps(s, s2); eps(e1, e); eps(e2, e); s1, e1 = s, e
        return s1, e1
    def cat():
        s, e = frag("")                      # empty concatenation = epsilon
        while pos < len(rx) and rx[pos] not in "|)":
            s2, e2 = star(); eps(e, s2); e = e2
        return s, e
    def star():
        nonlocal pos
        if rx[pos] == "(":
            pos += 1; s1, e1 = alt(); pos += 1           # skip ')'
        else:
            s1, e1 = frag(rx[pos]); pos += 1
        while pos < len(rx) and rx[pos] == "*":
            pos += 1; s, e = new(), new()
            eps(s, s1); eps(s, e); eps(e1, s1); eps(e1, e); s1, e1 = s, e
        return s1, e1
    s, e = alt()
    return edges, s, e
```

The parser's three functions mirror the precedence levels: `alt` handles `|`, `cat` concatenation, and `star` an atom followed by any number of `*`s. (For simplicity `cat` starts every concatenation with an $\varepsilon$-arrow, which costs a few extra states but changes nothing else.) The matcher keeps a set of states, exactly as in [[theory-of-computation/nondeterminism]]:

```python
def matches(rx, w):
    edges, start, end = thompson(rx)
    def close(S):                            # epsilon-closure by graph search
        todo = list(S)
        while todo:
            q = todo.pop()
            for p, a, r in edges:
                if p == q and a == "" and r not in S:
                    S.add(r); todo.append(r)
        return S
    S = close({start})
    for c in w:                              # one set-of-states step per symbol
        S = close({r for p, a, r in edges if p in S and a == c})
    return end in S

for rx, w in [("(0|1)*01", "11001"), ("(0|1)*01", "0110"), ("(ab|a)*", "abaab"),
              ("(ab|a)*", "abba"), ("a(|b)c", "ac"), ("a(|b)c", "abc"), ("a(|b)c", "abbc")]:
    print(f"{rx:10} {w:6} {matches(rx, w)}")
```

```console
$ python3 thompson.py
(0|1)*01   11001  True
(0|1)*01   0110   False
(ab|a)*    abaab  True
(ab|a)*    abba   False
a(|b)c     ac     True
a(|b)c     abc    True
a(|b)c     abbc   False
```

The closure here scans the whole edge list for each state, which is quadratic; a real implementation stores the arrows out of each state in an adjacency list ([[data-structures/graph-representations]]) to get the $O(n \cdot \lvert R\rvert)$ bound.

::: widget graph
nodes: A@0,0; B@3,0; C@6,0
edges: A>A:1; A>B:0; B>B:0; B>C:1; C>B:0; C>A:1
algorithm: none
caption: The minimal DFA for $(0 \mid 1)^*01$, which you obtain by applying the subset construction to the Thompson NFA of [[#ex-thompson]] and then merging equivalent states. $A$ is the start state ("no progress"), $B$ means "the input ends in $0$", and $C$ (accepting) means "the input ends in $01$". The twelve-state NFA has become three states. Trace $11001$ and $0110$ along the arrows and compare with the program's output.
:::

## From automata to regular expressions

For the converse we take an automaton apart. The idea is to allow arrows labelled by regular expressions rather than single symbols, and to remove states one at a time, relabelling the remaining arrows so that the language does not change. When only a start state and an accepting state remain, joined by a single arrow, its label is the answer.

::: definition Generalised NFA {#def-gnfa}
A **generalised NFA** (GNFA) is a finite automaton whose arrows are labelled by regular expressions, satisfying:

1. there is a start state $s$ with arrows to every other state and no arrows into it;
2. there is a single accepting state $f \ne s$ with arrows from every other state and no arrows out of it;
3. for every pair of states $p, r$ with $p \ne f$ and $r \ne s$ (including $p = r$) there is exactly one arrow $p \to r$, with label $R(p, r)$.

The GNFA accepts $w$ if $w = w_1 w_2 \cdots w_k$ and there is a sequence of states $s = r_0, r_1, \dots, r_k = f$ with $w_i \in L(R(r_{i-1}, r_i))$ for each $i$.
:::

Any NFA $N$ (in particular any DFA) converts into a GNFA with the same language: add a new start state $s$ with an arrow $s \xrightarrow{\varepsilon} q_0$, a new accepting state $f$ with arrows $q \xrightarrow{\varepsilon} f$ from every old accepting state $q$, combine several arrows between the same pair into one labelled by their union ($p \xrightarrow{a \mid b} r$), and add arrows labelled $\emptyset$ wherever condition 3 requires an arrow that is missing. An arrow labelled $\emptyset$ can never be used, so the language is unchanged.

::: lemma State elimination {#lem-eliminate}
Let $G$ be a GNFA with at least three states and let $q$ be a state other than $s$ and $f$. Let $G'$ be obtained by deleting $q$ and relabelling, for every pair $p, r$ of remaining states with $p \ne f$ and $r \ne s$,

$$
R'(p, r) = R(p, r) \;\bigm|\; R(p, q)\,R(q, q)^*\,R(q, r).
$$ {#eq-eliminate}

Then $G'$ is a GNFA and $L(G') = L(G)$.
:::

::: proof
$G'$ satisfies the three conditions because $G$ did and only $q$ was removed.

$L(G) \subseteq L(G')$: take an accepting sequence $s = r_0, \dots, r_k = f$ for $w = w_1 \cdots w_k$ in $G$. Every maximal block of consecutive occurrences of $q$ in the sequence looks like $p, q, q, \dots, q, r$ with $p, r \ne q$ (neither $s$ nor $f$ is $q$, so the block is surrounded). The part of $w$ read along this block is a string in $L(R(p,q))\,L(R(q,q))^*\,L(R(q,r))$, hence in $L(R'(p, r))$. Replacing each block by the single step $p \to r$ gives an accepting sequence of $G'$ for $w$. Steps $p \to r$ with neither end equal to $q$ remain valid because $L(R(p,r)) \subseteq L(R'(p,r))$.

$L(G') \subseteq L(G)$: take an accepting sequence of $G'$. Each step $p \to r$ reads a string in $L(R'(p, r))$, which by [[#eq-eliminate]] is either in $L(R(p, r))$ — a step of $G$ — or of the form $x y_1 \cdots y_j z$ with $x \in L(R(p,q))$, each $y_i \in L(R(q,q))$ and $z \in L(R(q, r))$, which $G$ reads along $p, q, \dots, q, r$. Replacing each step accordingly gives an accepting sequence of $G$.
:::

::: theorem Kleene's theorem {#thm-kleene}
A language is regular if and only if it is described by some regular expression.
:::

::: proof
If $L = L(R)$, Thompson's construction ([[#thm-thompson]]) gives an NFA for $L$, and the subset construction ([[theory-of-computation/nondeterminism#thm-subset]]) a DFA; so $L$ is regular.

Conversely let $L$ be recognised by a DFA $M$. Convert $M$ to a GNFA $G$ with the same language, as described above. While $G$ has more than two states, eliminate a state other than $s$ and $f$ by [[#lem-eliminate]]; each step preserves the language and reduces the number of states by one. When only $s$ and $f$ remain, condition 3 leaves a single arrow $s \to f$, and $G$ accepts $w$ iff $w \in L(R(s, f))$. So $L = L(R(s, f))$.
:::

::: algorithm State elimination {#alg-eliminate}
1. Add a new start state $s$ with $s \xrightarrow{\varepsilon} q_0$, and a new accepting state $f$ with $q \xrightarrow{\varepsilon} f$ for each $q \in F$. Merge parallel arrows into unions; treat missing arrows as $\emptyset$.
2. For each original state $q$, in any order:
   1. For every pair $p, r$ of other states with arrows $p \to q$ and $q \to r$, replace $R(p, r)$ by $R(p, r) \mid R(p, q)R(q,q)^*R(q, r)$.
   2. Delete $q$.
3. Return the label of $s \to f$, simplified with $R \mid \emptyset \equiv R$, $\emptyset R \equiv \emptyset$, $\emptyset^* \equiv \varepsilon$ and $\varepsilon R \equiv R$.
:::

Different elimination orders give different, equivalent expressions, and the size of the result can depend heavily on the order: in the worst case the expression is exponentially longer than the automaton, because each elimination can roughly quadruple the labels. Unlike the other direction, this one does not give a compact description in general — another sign that automata and expressions, although equal in power, are not equal in succinctness.

::: example Eliminating states of the mod-3 automaton {#ex-eliminate}
Convert the divisibility-by-three DFA of [[theory-of-computation/finite-automata#ex-mod3]] into a regular expression.
::: solution
The DFA has $r_0 \xrightarrow{0} r_0$, $r_0 \xrightarrow{1} r_1$, $r_1 \xrightarrow{0} r_2$, $r_1 \xrightarrow{1} r_0$, $r_2 \xrightarrow{0} r_1$, $r_2 \xrightarrow{1} r_2$, with $r_0$ both start and accepting. Add $s \xrightarrow{\varepsilon} r_0$ and $r_0 \xrightarrow{\varepsilon} f$.

*Eliminate $r_2$.* The only arrows into $r_2$ come from $r_1$ (label $0$) and the only arrow out goes to $r_1$ (label $0$); the self-loop is $1$. So the new self-loop of $r_1$ is $\emptyset \mid 0\,1^*\,0 = 01^*0$; no other label changes.

*Eliminate $r_1$.* Arrows in: $r_0 \xrightarrow{1} r_1$; out: $r_1 \xrightarrow{1} r_0$; self-loop $01^*0$. The self-loop of $r_0$ becomes $0 \mid 1(01^*0)^*1$.

*Eliminate $r_0$.* In: $s \xrightarrow{\varepsilon} r_0$; out: $r_0 \xrightarrow{\varepsilon} f$; self-loop $0 \mid 1(01^*0)^*1$. So $R(s, f) = \emptyset \mid \varepsilon\,\bigl(0 \mid 1(01^*0)^*1\bigr)^*\,\varepsilon$, which simplifies to

$$
\bigl(0 \mid 1(01^*0)^*1\bigr)^*.
$$

Read it as a description of the DFA's loops: from remainder $0$, either read a $0$ and stay, or read a $1$ (go to $r_1$), wander between $r_1$ and $r_2$ with $01^*0$ any number of times, and return with a $1$. A brute-force check with Python's `re.fullmatch` over all strings of length at most $10$ agrees with the DFA on every one of them.
:::
:::

::: quiz
Eliminating the state $o$ from the two-state DFA for "an even number of $0$s" (states $e$, $o$; $e$ start and accepting; $0$ swaps the states, $1$ loops) gives which self-loop on $e$?
- [ ] $1 \mid 0$
- [x] $1 \mid 01^*0$
- [ ] $(01^*0)^*$
- [ ] $1^*01^*0$
::: solution
The old self-loop of $e$ is $1$. Through $o$: in with $0$, loop $1^*$ at $o$, out with $0$, giving $01^*0$. The new label is the union $1 \mid 01^*0$, and the final expression after eliminating $e$ is $(1 \mid 01^*0)^*$.
:::
:::

## Regular expressions in practice

The regular expressions of `grep`, Python's `re`, JavaScript, Java and Perl extend the mathematical ones with conveniences: character classes (`[a-z]`, `\d`), counted repetition (`a{2,5}`), anchors (`^`, `$`), and the shorthands `+` and `?`. These are abbreviations — `[a-c]` is $a \mid b \mid c$, `a{2,3}` is $aa(a \mid \varepsilon)$ — and do not leave the regular languages. Two other features do.

**Backreferences.** The pattern `(a*)b\1` matches $a^n b a^n$: `\1` means "the same text the first group matched". The language $\{a^nba^n : n \ge 0\}$ is not regular ([[theory-of-computation/non-regular-languages]]), and in general matching with backreferences is $\mathsf{NP}$-complete. **Lookaround** (`(?=…)`, `(?<=…)`) can be translated away in theory, but engines that support it, like those with backreferences, are implemented by backtracking.

**Backtracking.** Most engines in programming languages do not simulate sets of states. They explore the choices of the NFA one at a time, depth first, and back up when a choice fails — which is simple, supports backreferences, and reports *which* way the pattern matched (needed for capture groups). On most inputs it is fast. But when a pattern can match the same text in many ways and the overall match fails, the engine tries every way before giving up.

::: example Exponential backtracking {#ex-backtrack}
How many ways can the pattern $(a \mid aa)^*$ match the string $a^n$, and what does that mean for a backtracking engine asked whether $(a \mid aa)^*b$ matches $a^n$?
::: solution
A match of $(a \mid aa)^*$ against $a^n$ is a way of writing $n$ as an ordered sum of $1$s and $2$s. Let $c_n$ be their number. The first part is $1$ (then $n-1$ remains) or $2$ (then $n - 2$ remains), so $c_n = c_{n-1} + c_{n-2}$ with $c_0 = c_1 = 1$: the Fibonacci numbers, $c_n = F_{n+1} \approx \varphi^{n+1}/\sqrt5$ with $\varphi = (1 + \sqrt5)/2 \approx 1.618$. Since $a^n$ contains no $b$, every one of these ways — and every shorter prefix match — fails at the end, and a backtracking engine tries them all before reporting "no match". An observation with Python 3.14's `re` module on one machine:

```python
import re, time
pat = re.compile(r"(a|aa)*b")
for n in range(20, 31, 2):
    t = time.perf_counter()
    pat.fullmatch("a" * n)                   # no 'b': every split is tried
    print(n, f"{time.perf_counter() - t:.3f} s")
```

```console
$ python3 redos.py
20 0.002 s
22 0.004 s
24 0.010 s
26 0.026 s
28 0.065 s
30 0.172 s
```

Each increase of $n$ by $2$ multiplies the time by about $2.6 \approx \varphi^2$, as predicted; at $n = 50$ it would take hours. The Thompson simulation above answers the same question in time proportional to $n$, because its set of states never has more than a dozen elements.
:::
:::

::: widget plot
f: ((1+sqrt(5))/2)^(x+1)/sqrt(5); 12*x
x: 0, 30
y: 0, 2000
labels: \text{backtracking: } F_{n+1}; \text{set simulation: } 12n
caption: The number of ways a backtracking engine may try to match $(a \mid aa)^*$ against $a^n$ grows like the Fibonacci numbers, while set-of-states simulation does a bounded amount of work per symbol (here about $12$ steps, one per NFA state). The curves cross between $n = 10$ and $n = 11$; by $n = 30$ the exponential curve has left the picture.
:::

::: warning "Regex" is not always a regular expression, and it is not always fast
Two misconceptions cause real bugs. First, a pattern with backreferences is not a regular expression in the sense of this chapter, and nothing in this chapter applies to it. Second, even a genuinely regular pattern can take exponential time in a backtracking engine, as [[#ex-backtrack]] shows. Patterns with nested or overlapping quantifiers — $(a^+)^+$, $(a \mid a)^*$, $(\backslash w^+\backslash s?)^*$ — applied to attacker-controlled input have caused outages of web services (a **regular-expression denial of service**, or ReDoS). Defences: use an engine with a linear-time guarantee (RE2, Go's `regexp`, Rust's `regex`, as of 2026) for untrusted input; rewrite patterns so that each string can be matched in only one way; and set match time-outs where the engine supports them.
:::

## In practice: lexers and search tools

The constructions of this chapter and the previous one form a pipeline used by every lexer generator: regular expressions for the tokens ($\texttt{[a-zA-Z\_][a-zA-Z0-9\_]*}$ for identifiers, and so on) are combined by union, each with a tag saying which token it is; Thompson's construction gives an NFA; the subset construction gives a DFA; minimisation ([[theory-of-computation/non-regular-languages]]) shrinks it; and the DFA is emitted as a table. At run time the lexer reads characters, follows the table, and uses the **longest-match** rule — keep going while some longer token is still possible, then back up to the last accepting state — with ties broken by the order of the rules, so that `if` is a keyword rather than an identifier. [[compilers]] develops this in full.

Search tools such as `grep` face a different trade-off: the pattern changes with every search, so building a full DFA in advance may cost more than it saves. GNU `grep` and RE2 build DFA states lazily, as described at the end of [[theory-of-computation/nondeterminism]].

::: history
Stephen Kleene introduced regular expressions — he called them *regular events* — in a 1951 RAND Corporation memorandum on the events representable by McCulloch–Pitts nerve nets, published in 1956 as "Representation of events in nerve nets and finite automata" in *Automata Studies*; the equivalence with finite automata, our [[#thm-kleene]], is his. Robert McNaughton and Hisao Yamada gave the conversions in both directions in their 1960 paper "Regular expressions and state graphs for automata", and Janusz Brzozowski introduced derivatives of regular expressions in 1964. Ken Thompson's "Regular expression search algorithm" (*Communications of the ACM*, 1968) described the NFA construction and set simulation of [[#thm-thompson]], compiled into IBM 7094 machine code for the QED editor; the same ideas went into `ed` and `grep` at Bell Labs in the early 1970s. Backtracking implementations with backreferences spread through Henry Spencer's widely copied library (1986) and Perl. Russ Cox's 2007 articles revived interest in Thompson's linear-time method and led to RE2.
:::

## Where this leads

[[theory-of-computation/non-regular-languages]] proves the limits of everything in the last three chapters: languages such as $\{0^n1^n\}$ and balanced brackets cannot be described by any regular expression. To describe them we need recursion in the description itself — the context-free grammars of [[theory-of-computation/context-free-grammars]], which also describe the syntax of programming languages beyond the token level.

::: summary
- **Regular expressions** ([[#def-regex]]) build languages from $\emptyset$, $\varepsilon$ and single symbols by union, concatenation and star; star binds tightest, then concatenation, then union.
- **Thompson's construction** ([[#thm-thompson]]) turns an expression of size $m$ into an NFA with at most $2m$ states, giving $O(nm)$ matching by set simulation.
- **State elimination** ([[#lem-eliminate]], [[#alg-eliminate]]) turns any automaton into an expression by replacing paths through a removed state $q$ with $R(p,q)R(q,q)^*R(q,r)$.
- **Kleene's theorem** ([[#thm-kleene]]): regular expressions, NFAs and DFAs describe exactly the same languages, the regular languages.
- Expressions can be exponentially larger than automata; equivalence of expressions is decidable via DFAs.
- Practical "regex" adds backreferences (non-regular, $\mathsf{NP}$-complete to match) and is usually implemented by **backtracking**, which can take exponential time even on regular patterns. Use linear-time engines for untrusted input.
:::

## Exercises

::: exercise Writing expressions {level=1}
Write regular expressions over $\{0, 1\}$ for (a) strings with exactly two $1$s; (b) strings that do not contain $11$; (c) strings whose length is a multiple of $3$; (d) strings that begin and end with the same symbol.
::: solution
(a) $0^*10^*10^*$. (b) $(0 \mid 10)^*(\varepsilon \mid 1)$: every $1$ except possibly a final one is followed by a $0$. (c) $\bigl((0\mid1)(0\mid1)(0\mid1)\bigr)^*$. (d) $0 \mid 1 \mid 0(0 \mid 1)^*0 \mid 1(0\mid 1)^*1$ (the single-symbol strings begin and end with the same symbol; $\varepsilon$ is excluded).
:::
:::

::: exercise Counting matches {level=1 check="4"}
How many strings of length exactly $4$ are in $L\bigl((0 \mid 1)^*01\bigr)$? (Enter the number.)
::: solution
A string of length $4$ is in the language iff its last two symbols are $01$; the first two symbols are arbitrary, so there are $2^2 = 4$ such strings: $0001, 0101, 1001, 1101$.
:::
:::

::: exercise Sizes in Thompson's construction {level=1 check="12"}
Using the construction in the proof of [[#thm-thompson]] (each symbol gives $2$ states, union and star add $2$ states each, concatenation adds none), how many states does the NFA for $(0 \mid 1)^*01$ have? (Enter the number.)
::: solution
Four symbols give $4 \times 2 = 8$ states; the union adds $2$ and the star adds $2$; the two concatenations add none. Total $12$, as in [[#ex-thompson]].
:::
:::

::: exercise Laws and non-laws {level=2}
Prove or disprove: (a) $(R \mid S)^* \equiv (R^*S^*)^*$; (b) $(RS)^* \equiv R^*S^*$; (c) $R^*R^* \equiv R^*$; (d) $(R \mid S)^* \equiv R^* \mid S^*$.
::: solution
(a) True. $\supseteq$: every string of $L(R^*S^*)$ is a concatenation of strings from $L(R) \cup L(S)$, so it is in $L((R\mid S)^*)$, and so is any concatenation of such strings. $\subseteq$: a concatenation $x_1 \cdots x_k$ with each $x_i \in L(R) \cup L(S)$ is a concatenation of $k$ strings of $L(R^*S^*)$, each $x_i$ being in $L(R^*)L(S^*)$ (take $x_i\varepsilon$ or $\varepsilon x_i$).
(b) False: $R = 0$, $S = 1$ gives $(01)^* \ni 0101$, but $0101 \notin L(0^*1^*)$.
(c) True: $\supseteq$ by taking the second factor to be $\varepsilon$; $\subseteq$ because concatenating $j$ blocks with $k$ blocks gives $j + k$ blocks.
(d) False: $R = 0$, $S = 1$: $01 \in L((0 \mid 1)^*)$ but $01 \notin L(0^*) \cup L(1^*)$.
:::
:::

::: exercise State elimination {level=2}
Use [[#alg-eliminate]] to find a regular expression for the DFA over $\{a, b\}$ with states $1$ (start), $2$ (accepting) and transitions $1 \xrightarrow{a} 1$, $1 \xrightarrow{b} 2$, $2 \xrightarrow{a} 2$, $2 \xrightarrow{b} 1$, eliminating state $1$ first and then state $2$. What language is it?
::: solution
Add $s \xrightarrow{\varepsilon} 1$ and $2 \xrightarrow{\varepsilon} f$. Eliminate $1$ (self-loop $a$): arrows in from $s$ ($\varepsilon$) and from $2$ ($b$); out to $2$ ($b$). New labels: $R(s, 2) = \emptyset \mid \varepsilon a^* b = a^*b$, and the self-loop of $2$ becomes $a \mid b a^* b$. Eliminate $2$: $R(s, f) = a^*b\,(a \mid ba^*b)^*$. The language is the strings with an odd number of $b$s: the DFA tracks the parity of $b$s, with state $2$ meaning odd.
:::
:::

::: exercise Adding `?` and `+` {level=2}
Extend the `thompson` function so that it accepts the postfix operators `?` (optional) and `+` (one or more) in addition to `*`. Test it on `ab?c` against `ac`, `abc`, `abbc` and on `(ab)+` against `""`, `ab`, `abab`, `aba`.
::: solution
In `star`, accept any of `*+?` in the loop and add the appropriate $\varepsilon$-arrows: for `?` keep $s \to s_1$, $s \to e$ and $e_1 \to e$ but omit the loop $e_1 \to s_1$; for `+` keep $s \to s_1$, the loop $e_1 \to s_1$ and $e_1 \to e$ but omit the bypass $s \to e$.

```python
        while pos < len(rx) and rx[pos] in "*+?":
            op = rx[pos]; pos += 1; s, e = new(), new()
            eps(s, s1); eps(e1, e)
            if op != "+": eps(s, e)          # may skip the operand
            if op != "?": eps(e1, s1)        # may repeat the operand
            s1, e1 = s, e
```

Nothing else changes. With `matches` as before:

```console
$ python3 thompson2.py
ab?c       ac     True
ab?c       abc    True
ab?c       abbc   False
(ab)+             False
(ab)+      ab     True
(ab)+      abab   True
(ab)+      aba    False
```
:::
:::

::: exercise Arden's lemma {level=3}
Let $A, B$ be languages with $\varepsilon \notin A$. Prove that $X = A^*B$ is the *unique* language satisfying $X = AX \cup B$. Use it to solve the equations $X_e = 1X_e \cup 0X_o \cup \{\varepsilon\}$, $X_o = 1X_o \cup 0X_e$, where $X_q$ is the set of strings accepted from state $q$ of the even-$0$s DFA, and compare with the quiz above.
::: solution
*$A^*B$ is a solution:* $A(A^*B) \cup B = (AA^* \cup \{\varepsilon\})B = A^*B$.

*Uniqueness:* let $X$ be any solution. Unfolding the equation $k$ times gives $X = A^{k+1}X \cup A^kB \cup \dots \cup AB \cup B$ for every $k$; so $A^*B \subseteq X$. Conversely, take $w \in X$ with $\lvert w\rvert = n$ and unfold $n$ times: $w \in A^{n+1}X$ or $w \in A^iB$ for some $i \le n$. Every string of $A^{n+1}X$ has length at least $n+1$, because each string of $A$ is non-empty. So $w \in A^iB \subseteq A^*B$.

*The equations:* from the second, with $A = 1$ and $B = 0X_e$, $X_o = 1^*0X_e$. Substituting, $X_e = 1X_e \cup 01^*0X_e \cup \{\varepsilon\} = (1 \mid 01^*0)X_e \cup \{\varepsilon\}$, and Arden's lemma gives $X_e = (1 \mid 01^*0)^*$, the same expression that state elimination produced. (The hypothesis $\varepsilon \notin A$ matters: with $A = \{\varepsilon\}$, every $X \supseteq B$ is a solution.)
:::
:::

::: exercise Counting backtracking paths {level=3 check="89"}
In how many ways can $(a \mid aa)^*$ match $a^{10}$ — that is, how many sequences of choices of $a$ or $aa$ spell exactly $a^{10}$? Prove your recurrence, and explain why the Thompson simulation of the same pattern needs only $O(n)$ steps on $a^n$ even though the number of matching paths is exponential. (Enter the number of ways.)
::: solution
Let $c_n$ be the number of ways. The first block is $a$ or $aa$, leaving $a^{n-1}$ or $a^{n-2}$, and different first blocks give different sequences, so $c_n = c_{n-1} + c_{n-2}$ for $n \ge 2$, with $c_0 = 1$ (the empty sequence) and $c_1 = 1$. Hence $c_2 = 2$, $c_3 = 3$, $c_4 = 5$, $c_5 = 8$, $c_6 = 13$, $c_7 = 21$, $c_8 = 34$, $c_9 = 55$, $c_{10} = 89$.

The set simulation does not follow paths individually. After each symbol it records only *which states* some path could be in, and the Thompson NFA for this pattern has a constant number of states (about a dozen), so each step costs $O(1)$ however many paths lead to each state. Different paths that reach the same state at the same position are merged — exactly the information a backtracking engine throws away and recomputes.
:::
:::
