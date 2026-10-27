Can a finite automaton check that the brackets in an expression are balanced? Try to build one. It must accept `()`, `(())`, `((()))` and so on, and reject `(()` and `((())`. After reading a run of opening brackets it must know how many there were, because exactly that many closers must follow. With $k$ states it can tell apart at most $k$ different counts, so on the input $(^{k}\,)^{k}$ two of the prefixes $\varepsilon, (, ((, \dots, (^k$ must lead to the same state — and from then on the machine cannot tell them apart. It will either accept something unbalanced or reject something balanced.

This chapter turns that intuition into proofs. Three tools prove that a language is *not* regular: the **distinguishing-strings** argument just sketched, the **pumping lemma**, and **closure properties**. The distinguishing argument, made exact, becomes the **Myhill–Nerode theorem**, which characterises the regular languages completely and has a constructive bonus: every regular language has a unique smallest DFA, and an efficient algorithm finds it from any DFA for the language. So in one chapter we learn both what finite automata cannot do and how to make the ones that we build as small as possible.

## Distinguishing strings

The key observation of [[theory-of-computation/nondeterminism#thm-blowup]] works for any language. Fix a language $L \subseteq \Sigma^*$.

::: definition Distinguishable strings {#def-distinguishable}
Strings $x, y \in \Sigma^*$ are **distinguishable by $L$** if there is a string $z$ such that exactly one of $xz$ and $yz$ is in $L$; $z$ **distinguishes** them. Otherwise $x$ and $y$ are **indistinguishable by $L$**, written $x \equiv_L y$:

$$
x \equiv_L y \iff \text{for all } z \in \Sigma^*:\ \bigl(xz \in L \iff yz \in L\bigr).
$$
:::

So $x \equiv_L y$ means that no future input can ever reveal whether we started with $x$ or with $y$. This is exactly the information a recogniser can afford to forget.

::: lemma Distinguishable strings need different states {#lem-dist}
Let $M = (Q, \Sigma, \delta, q_0, F)$ be a DFA recognising $L$. If $x$ and $y$ are distinguishable by $L$, then $\hat\delta(q_0, x) \ne \hat\delta(q_0, y)$. Consequently, if $L$ has $k$ pairwise distinguishable strings, every DFA for $L$ has at least $k$ states; and if it has infinitely many pairwise distinguishable strings, $L$ is not regular.
:::

::: proof
Let $z$ distinguish $x$ and $y$. If $\hat\delta(q_0, x) = \hat\delta(q_0, y)$ then by [[theory-of-computation/finite-automata#lem-compose]] $\hat\delta(q_0, xz) = \hat\delta(q_0, yz)$, so $M$ accepts both $xz$ and $yz$ or neither; but $M$ recognises $L$ and exactly one of them is in $L$. Hence the states differ. Pairwise distinguishable strings therefore reach pairwise different states, so there are at least as many states as such strings; infinitely many would need infinitely many states.
:::

::: example $0^n1^n$ is not regular {#ex-0n1n-dist}
Prove that $B = \{0^n 1^n : n \ge 0\}$ is not regular.
::: solution
The strings $0^0, 0^1, 0^2, \dots$ are pairwise distinguishable: for $i \ne j$, the string $z = 1^i$ gives $0^i1^i \in B$ but $0^j1^i \notin B$. By [[#lem-dist]], no DFA recognises $B$.
:::
:::

The argument is short and, as we shall see, always works when a language is not regular. Its only difficulty is choosing the infinite family of strings. The classical alternative is the pumping lemma.

## The pumping lemma

If a DFA with $p$ states reads a string of length at least $p$, it visits $p + 1$ states (counting the start), so by the pigeonhole principle some state is visited twice. The part of the input read between the two visits takes the machine round a loop, and the loop can be traversed any number of times — including zero — without changing the outcome.

::: theorem Pumping lemma for regular languages {#thm-pumping}
If $L$ is a regular language, then there is a number $p \ge 1$ (a **pumping length**) such that every string $s \in L$ with $\lvert s\rvert \ge p$ can be written as $s = xyz$ where

1. $\lvert y\rvert \ge 1$,
2. $\lvert xy\rvert \le p$, and
3. $xy^iz \in L$ for every $i \ge 0$.
:::

::: proof
Let $M = (Q, \Sigma, \delta, q_0, F)$ be a DFA recognising $L$ and let $p = \lvert Q\rvert$. Take $s = a_1 a_2 \cdots a_n \in L$ with $n \ge p$, and let $r_j = \hat\delta(q_0, a_1 \cdots a_j)$ for $0 \le j \le n$ be its run; $r_n \in F$. Among the $p + 1$ states $r_0, r_1, \dots, r_p$ two must be equal, since there are only $p$ states: say $r_j = r_k$ with $0 \le j < k \le p$. Let

$$
x = a_1 \cdots a_j, \qquad y = a_{j+1} \cdots a_k, \qquad z = a_{k+1} \cdots a_n.
$$

Then $\lvert y\rvert = k - j \ge 1$ and $\lvert xy\rvert = k \le p$. Writing $q = r_j = r_k$, we have $\hat\delta(q_0, x) = q$, $\hat\delta(q, y) = q$ and $\hat\delta(q, z) = r_n \in F$. By [[theory-of-computation/finite-automata#lem-compose]] and induction on $i$, $\hat\delta(q, y^i) = q$ for every $i \ge 0$, so $\hat\delta(q_0, xy^iz) = \hat\delta(\hat\delta(\hat\delta(q_0, x), y^i), z) = \hat\delta(q, z) \in F$. Hence $xy^iz \in L$.
:::

The pumping lemma is a statement with alternating quantifiers, and using it correctly means respecting them. Written out:

$$
L \text{ regular} \implies \exists p \ge 1\ \forall s \in L,\ \lvert s\rvert \ge p\ \ \exists x,y,z \ \bigl(s = xyz,\ \lvert y\rvert \ge 1,\ \lvert xy\rvert \le p,\ \forall i \ge 0:\ xy^iz \in L\bigr).
$$

To prove $L$ is *not* regular we prove the negation of the right-hand side (see [Maths Atlas: quantifiers](/learn/maths/lesson.php?c=proofs&l=quantifiers)):

$$
\forall p \ge 1\ \exists s \in L,\ \lvert s\rvert \ge p\ \ \forall x,y,z \text{ with } s = xyz,\ \lvert y\rvert \ge 1,\ \lvert xy\rvert \le p\ \ \exists i \ge 0:\ xy^iz \notin L.
$$

It helps to think of a game against an adversary. The adversary picks $p$. **You** pick a string $s \in L$ of length at least $p$ — your choice, and the only one where cleverness is needed. The adversary splits $s = xyz$ obeying the two length conditions. **You** pick $i$ and show $xy^iz \notin L$. You must win against *every* $p$ and *every* legal split; you get to choose $s$ and $i$.

::: example Pumping $0^n1^n$ {#ex-pump-0n1n}
Prove with the pumping lemma that $B = \{0^n1^n : n \ge 0\}$ is not regular.
::: solution
Suppose $B$ were regular with pumping length $p$. Choose $s = 0^p1^p \in B$, of length $2p \ge p$. Consider any split $s = xyz$ with $\lvert xy\rvert \le p$ and $\lvert y \rvert \ge 1$. Since the first $p$ symbols of $s$ are $0$s, $x$ and $y$ consist only of $0$s: $y = 0^k$ with $k \ge 1$. Take $i = 2$: $xy^2z = 0^{p+k}1^p$, which has more $0$s than $1$s, so it is not in $B$. This contradicts the pumping lemma, so $B$ is not regular.

The choice of $s$ matters. With $s = 0^{\lceil p/2\rceil}1^{\lceil p/2 \rceil}$ the adversary could choose $y = 01$, and pumping $y$ would not change the counts — the result $0\cdots0(01)^i1\cdots1$ is out of $B$ for $i \ge 2$, but that requires a separate case analysis. Choosing $s$ so that the condition $\lvert xy\rvert \le p$ pins $y$ inside a single block saves the work.
:::
:::

::: example Squares and pumping up {#ex-pump-square}
Prove that $Q = \{0^{n^2} : n \ge 0\}$ (strings of $0$s whose length is a perfect square) is not regular.
::: solution
Suppose $Q$ is regular with pumping length $p$, and let $s = 0^{p^2}$. In any legal split, $y = 0^k$ with $1 \le k \le p$. Then $xy^2z = 0^{p^2 + k}$, and

$$
p^2 < p^2 + k \le p^2 + p < p^2 + 2p + 1 = (p+1)^2.
$$

So $p^2 + k$ lies strictly between two consecutive squares and is not a square: $xy^2z \notin Q$, a contradiction. (The lemma tells us more: the lengths of the strings of a unary regular language form an *eventually periodic* set, while the gaps between squares grow without bound.)
:::
:::

::: example Pumping down {#ex-pump-down}
Prove that $D = \{0^i1^j : i > j \ge 0\}$ is not regular.
::: solution
Suppose $D$ is regular with pumping length $p$, and take $s = 0^{p+1}1^p \in D$. Any legal split has $y = 0^k$ with $k \ge 1$, inside the first $p$ symbols. Pumping *up* does not help: adding $0$s keeps $i > j$. Pump *down* instead, with $i = 0$: $xz = 0^{p+1-k}1^p$ has at most $p$ zeros and exactly $p$ ones, so $p + 1 - k \le p = j$ and $xz \notin D$. Contradiction.
:::
:::

::: quiz
A student proves that $\{0^n1^n\}$ is not regular as follows: "Let $p$ be the pumping length and $s = 0^p1^p$. Split $s$ with $x = \varepsilon$, $y = 0^p$, $z = 1^p$. Then $xy^2z = 0^{2p}1^p \notin L$." What is wrong?
- [ ] The string $s$ is too short.
- [x] The student chose the split; the proof must work for every legal split.
- [ ] $i = 2$ is not allowed; only $i = 0$ is.
- [ ] Nothing is wrong.
::: solution
The adversary chooses $x, y, z$. Showing that *one* split fails proves nothing: the lemma only promises that *some* split works. The repair is [[#ex-pump-0n1n]]: argue about every split with $\lvert xy\rvert \le p$ and $\lvert y \rvert \ge 1$, all of which have $y = 0^k$.
:::
:::

::: warning The pumping lemma is necessary, not sufficient
Every regular language satisfies the pumping condition, but so do some non-regular languages: a successful "pumping" of every long string proves nothing. For example, let

$$
L = \{a^i b^j c^k : i, j, k \ge 0, \text{ and if } i = 1 \text{ then } j = k\}.
$$

With $p = 2$ every long string can be pumped: if $i = 0$ or $i \ge 3$, take $y$ to be the first symbol (pumping keeps $i \ne 1$, or produces $i = 0$, or pumps $b$s or $c$s freely when $i = 0$); if $i = 2$, take $y = aa$ (then $i$ becomes $0, 2, 4, \dots$, never $1$); if $i = 1$, take $y = a$ (then $i$ becomes $0, 1, 2, \dots$, and in the case $i = 1$ the string is the original). Yet $L$ is not regular: if it were, so would be $L \cap ab^*c^* = \{ab^jc^j : j \ge 0\}$, and the strings $ab^j$ are pairwise distinguishable. When pumping fails to give a contradiction, try distinguishing strings or closure properties.
:::

## Proofs by closure

Closure properties ([[theory-of-computation/finite-automata#thm-union-intersection]], [[theory-of-computation/nondeterminism]]) turn one non-regularity proof into many. If $L$ were regular and $R$ is regular, then $L \cap R$, $\overline{L}$, $L^R$ and any image of $L$ under the regular operations would be regular; so if one of those is known to be non-regular, so is $L$.

- $E = \{w \in \{0,1\}^* : w \text{ has equally many } 0\text{s and } 1\text{s}\}$ is not regular, since $E \cap 0^*1^* = \{0^n1^n\}$.
- The language of balanced brackets is not regular, since its intersection with $(^*)^*$ is $\{(^n)^n\}$, which is $\{0^n1^n\}$ with the symbols renamed.
- $\overline{\{0^n1^n\}}$ is not regular, since regular languages are closed under complement.

The method only works in one direction. The union or intersection of two non-regular languages *can* be regular: $\{0^n1^n\} \cup \overline{\{0^n1^n\}} = \Sigma^*$.

## The Myhill–Nerode theorem

The relation $\equiv_L$ is an **equivalence relation** on $\Sigma^*$ — reflexive, symmetric and transitive, as an "if and only if for all $z$" relation always is (see [Maths Atlas: relations](/learn/maths/lesson.php?c=proofs&l=relations)). Its equivalence classes group together the prefixes that a recogniser may treat alike. It is also **right-invariant**: if $x \equiv_L y$ then $xa \equiv_L ya$ for every symbol $a$, because any $z$ distinguishing $xa$ and $ya$ would give $az$ distinguishing $x$ and $y$. The **index** of $\equiv_L$ is its number of classes (possibly infinite).

::: theorem Myhill–Nerode theorem {#thm-myhill-nerode}
A language $L \subseteq \Sigma^*$ is regular if and only if $\equiv_L$ has finite index. In that case the number of equivalence classes equals the number of states of the smallest DFA recognising $L$.
:::

::: proof
*($\Rightarrow$)* Let $M$ be a DFA with $k$ states recognising $L$. Choosing one string from each class of $\equiv_L$ gives pairwise distinguishable strings, so by [[#lem-dist]] there are at most $k$ classes. In particular, the index is at most the number of states of *any* DFA for $L$.

*($\Leftarrow$)* Suppose $\equiv_L$ has $k$ classes, and write $[x]$ for the class of $x$. Define $M_L = (Q, \Sigma, \delta, q_0, F)$ by

$$
Q = \{[x] : x \in \Sigma^*\}, \quad \delta([x], a) = [xa], \quad q_0 = [\varepsilon], \quad F = \{[x] : x \in L\}.
$$

These definitions do not depend on the representative: if $[x] = [y]$ then $[xa] = [ya]$ by right-invariance, and $x \in L \iff y \in L$ (take $z = \varepsilon$). By induction on $\lvert w\rvert$, $\hat\delta([\varepsilon], w) = [w]$: true for $\varepsilon$, and $\hat\delta([\varepsilon], wa) = \delta([w], a) = [wa]$. So $M_L$ accepts $w$ iff $[w] \in F$ iff $w \in L$. $M_L$ is a DFA with $k$ states recognising $L$.

Combining the two halves: every DFA for $L$ has at least $k$ states, and $M_L$ has exactly $k$, so the minimum is $k$.
:::

The theorem gives a *complete* method for non-regularity — a language is non-regular exactly when there are infinitely many pairwise distinguishable strings — and it tells us what the smallest DFA looks like: its states *are* the classes of $\equiv_L$. One can show further that every DFA for $L$ with the minimum number of states is $M_L$ with its states renamed: the minimal DFA is **unique up to isomorphism**. (Sketch: in a minimal DFA $M$ every state is reachable, so each state $q$ is $\hat\delta(q_0, x)$ for some $x$; map $q \mapsto [x]$. Strings reaching the same state are indistinguishable, so the map is well defined; it is surjective by construction and therefore bijective since both sides have $k$ elements; and it respects transitions and accepting states.)

::: example Counting classes {#ex-classes}
Find the classes of $\equiv_L$ for $L = \{w \in \{0,1\}^* : w \text{ ends in } 01\}$, and hence the size of the minimal DFA.
::: solution
What matters about a prefix $x$ is how much of a final $01$ it has already supplied. Consider three classes: $C_2$, strings ending in $01$; $C_1$, strings ending in $0$; $C_0$, all others ($\varepsilon$, $1$, and strings ending in $11$). Within each class, all strings behave alike: for $x \in C_1$, $xz \in L$ iff $z = 1$ or $z$ ends in $01$; for $x \in C_2$, $xz \in L$ iff $z = \varepsilon$ or $z$ ends in $01$; for $x \in C_0$, $xz \in L$ iff $z$ ends in $01$. These conditions on $z$ depend only on the class, so strings in the same class are equivalent. Strings in different classes are distinguished: $z = \varepsilon$ separates $C_2$ from the others, and $z = 1$ separates $C_1$ from $C_0$. So there are exactly three classes and the minimal DFA has three states — the DFA in the figure of [[theory-of-computation/regular-expressions]].
:::
:::

::: quiz
How many classes does $\equiv_L$ have for $L = \{0^n1^n : n \ge 0\}$, and what are some of them?
- [ ] $2$: $L$ and its complement.
- [ ] $3$
- [x] Infinitely many, for instance $[0^k]$ for each $k$, plus one "dead" class containing $10$.
::: solution
The strings $0^k$ are pairwise distinguishable (by $1^k$), so the classes $[0^k]$ are all different. Strings such as $10$ or $0110$, which cannot be extended to a string of $L$ at all, form one more class. (There are further classes, $[0^k1^j]$ for $1 \le j \le k$, with $0^k1^j \equiv_L 0^{k-j+1}1$.) Infinite index: not regular.
:::
:::

## Minimising a DFA

The Myhill–Nerode theorem says that a minimal DFA exists; we now compute it from any given DFA $M = (Q, \Sigma, \delta, q_0, F)$. Two things can make $M$ larger than necessary. Some states may be **unreachable** from $q_0$; they can be deleted. And some reachable states may be **equivalent**: indistinguishable by any continuation.

::: definition Equivalent states {#def-state-equiv}
States $p, q$ of a DFA are **equivalent**, $p \approx q$, if for every $z \in \Sigma^*$, $\hat\delta(p, z) \in F \iff \hat\delta(q, z) \in F$. They are **$k$-equivalent**, $p \approx_k q$, if this holds for every $z$ with $\lvert z\rvert \le k$.
:::

$p \approx_0 q$ just says that $p$ and $q$ are both accepting or both non-accepting. And $p \approx_{k+1} q$ holds iff $p \approx_k q$ and $\delta(p, a) \approx_k \delta(q, a)$ for every symbol $a$ — because a string of length at most $k + 1$ is either short ($\le k$) or a symbol followed by a string of length at most $k$. This recursion is an algorithm.

::: algorithm Moore's partition refinement {#alg-moore}
1. Delete the states not reachable from $q_0$ (graph search).
2. Start with the partition $P_0 = \{F, Q \setminus F\}$ (dropping an empty block).
3. Repeat for $k = 0, 1, 2, \dots$: put $p$ and $q$ in the same block of $P_{k+1}$ iff they are in the same block of $P_k$ and, for every $a \in \Sigma$, $\delta(p, a)$ and $\delta(q, a)$ are in the same block of $P_k$. Stop when $P_{k+1}$ has the same number of blocks as $P_k$.
4. Output the **quotient** DFA: one state per block; the block of $q$ goes on $a$ to the block of $\delta(q, a)$; start state the block of $q_0$; accepting states the blocks inside $F$.
:::

::: theorem Correctness of minimisation {#thm-minimise}
[[#alg-moore]] stops after at most $\lvert Q\rvert - 1$ refinement rounds; its final partition is the partition of the reachable states into classes of $\approx$; and the quotient DFA recognises $L(M)$ and is minimal.
:::

::: proof
By induction on $k$, the blocks of $P_k$ are exactly the classes of $\approx_k$: true for $k = 0$, and step 3 implements the recursion for $\approx_{k+1}$ stated above. Each $P_{k+1}$ refines $P_k$. If a round splits no block, $P_{k+1} = P_k$, and then (since $P_{k+2}$ is computed from $P_{k+1}$ exactly as $P_{k+1}$ was from $P_k$) every later partition is the same; so $\approx_k = \approx_{k+1} = \approx_{k+2} = \cdots$, and two states equivalent for all lengths are equivalent: $P_k$ is the partition into classes of $\approx$. While the algorithm continues, every round increases the number of blocks by at least one, starting from at least $1$ and never exceeding $\lvert Q\rvert$, so there are at most $\lvert Q\rvert - 1$ splitting rounds.

The quotient is well defined: if $p \approx q$ then $\delta(p, a) \approx \delta(q, a)$ (a distinguishing $z$ for the successors gives $az$ for $p, q$), and $p, q$ are both accepting or both not. By induction its run on $w$ visits the blocks of the states of $M$'s run, so it accepts exactly $L(M)$.

Minimality: every state of the quotient is reachable (we removed unreachable states), so each block is reached by some string; two different blocks contain inequivalent states $p, q$, and if $x$ reaches $p$ and $y$ reaches $q$ then a $z$ separating $p$ and $q$ distinguishes $x$ and $y$ by $L$. So the quotient's states correspond to pairwise distinguishable strings, and by [[#lem-dist]] no DFA for $L$ has fewer states.
:::

Each round of Moore's algorithm costs $O(\lvert Q\rvert \lvert\Sigma\rvert)$ with hashing of the "signatures", so the total is $O(\lvert Q\rvert^2 \lvert\Sigma\rvert)$ in the worst case. John Hopcroft's 1971 algorithm refines more cleverly — always splitting with respect to the smaller half of a block — and runs in $O(\lvert Q\rvert\,\lvert\Sigma\rvert \log \lvert Q\rvert)$. Here is Moore's version:

```python
def minimise(states, sigma, delta, start, accept):
    """Moore's algorithm: refine {F, Q-F} until no block splits."""
    reach, todo = {start}, [start]           # 1. drop unreachable states
    while todo:
        q = todo.pop()
        for a in sigma:
            if delta[q, a] not in reach:
                reach.add(delta[q, a]); todo.append(delta[q, a])
    block = {q: (q in accept) for q in reach}            # 2. initial partition
    rounds = 0
    while True:
        rounds += 1
        # signature: own block plus the blocks of all successors
        sig = {q: (block[q],) + tuple(block[delta[q, a]] for a in sigma) for q in reach}
        ids = {s: i for i, s in enumerate(sorted(set(sig.values()), key=str))}
        new = {q: ids[sig[q]] for q in reach}
        if len(set(new.values())) == len(set(block.values())):
            break                            # no block was split: stable
        block = new
    classes = {}
    for q in sorted(reach):
        classes.setdefault(block[q], []).append(q)
    return list(classes.values()), rounds

# a 6-state DFA for "the number of 1s is divisible by 3", written wastefully
delta = {}
for q in range(6):
    delta[q, "0"] = q                        # 0 keeps the count
    delta[q, "1"] = (q + 1) % 6              # count 1s modulo 6
delta[6, "0"] = delta[6, "1"] = 0            # state 6 is unreachable
classes, rounds = minimise(range(7), "01", delta, 0, {0, 3, 6})
print(classes, "after", rounds, "rounds")
```

```console
$ python3 minimise.py
[[0, 3], [1, 4], [2, 5]] after 2 rounds
```

::: example Minimising by hand {#ex-minimise}
Trace [[#alg-moore]] on the DFA in the program: states $0$–$6$, a $1$ moving $q$ to $(q + 1) \bmod 6$ for $q \le 5$, $0$ looping, state $6$ (unreachable) moving to $0$, and $F = \{0, 3, 6\}$.
::: solution
*Step 1.* From $0$ we reach $1, 2, 3, 4, 5$; state $6$ is unreachable and deleted.

*Step 2.* $P_0 = \bigl\{\{0, 3\}, \{1, 2, 4, 5\}\bigr\}$.

*Round 1.* On $0$ every state stays put, so only the $1$-successors matter. In $\{0, 3\}$: $0 \to 1$ and $3 \to 4$, both in the non-accepting block — no split. In $\{1, 2, 4, 5\}$: $1 \to 2$ (non-accepting), $2 \to 3$ (accepting), $4 \to 5$ (non-accepting), $5 \to 0$ (accepting). So it splits into $\{1, 4\}$ and $\{2, 5\}$. $P_1 = \bigl\{\{0,3\}, \{1,4\}, \{2,5\}\bigr\}$.

*Round 2.* $\{0,3\}$: successors on $1$ are $1, 4$, same block. $\{1, 4\}$: successors $2, 5$, same block. $\{2, 5\}$: successors $3, 0$, same block. No split; stop.

The quotient has three states — "number of $1$s modulo $3$ is $0$, $1$, $2$" — and is minimal. The original machine counted modulo $6$, recording one bit of information (the parity of $\lfloor \#1/3 \rfloor$) that the language never uses.
:::
:::

::: widget graph
nodes: q0@0,1; q1@1.7,2; q2@3.4,2; q3@5.1,1; q4@3.4,0; q5@1.7,0
edges: q0>q0:0; q0>q1:1; q1>q1:0; q1>q2:1; q2>q2:0; q2>q3:1; q3>q3:0; q3>q4:1; q4>q4:0; q4>q5:1; q5>q5:0; q5>q0:1
algorithm: none
caption: The wasteful six-state DFA of [[#ex-minimise]]; $q_0$ and $q_3$ are accepting. Equivalent states sit opposite each other on the cycle: $q_0 \approx q_3$, $q_1 \approx q_4$, $q_2 \approx q_5$. Folding the hexagon in half gives the three-state minimal DFA. Run Moore's algorithm in your head on the picture: after one round the three pairs separate, and after two nothing changes.
:::

::: application Equivalence and minimal DFAs as canonical forms
Because the minimal DFA is unique up to renaming states, it is a **canonical form** for regular languages: two regular expressions or automata describe the same language iff their minimal DFAs are identical after a canonical numbering of states (for example, in breadth-first order from the start state, taking symbols in a fixed order). Tools that compare specifications, cache compiled patterns or check that a refactored lexer is unchanged use exactly this. The cost is the possible exponential blow-up of determinisation.
:::

::: history
Anil Nerode published the equivalence-class characterisation in "Linear automaton transformations" (1958); John Myhill had proved a closely related result for a two-sided congruence in a 1957 report, and the theorem carries both names. Edward Moore's "Gedanken-experiments on sequential machines" (1956) gave the partition-refinement idea for distinguishing the states of a machine by experiments on its inputs, and David Huffman (1954) minimised sequential circuits. John Hopcroft's $n \log n$ minimisation algorithm appeared in 1971. The pumping lemma for regular languages is usually credited to Yehoshua Bar-Hillel, Micha Perles and Eli Shamir (1961), whose paper on phrase-structure grammars also contains the pumping lemma for context-free languages of [[theory-of-computation/pushdown-automata]]; the underlying pigeonhole argument about repeated states appears already in Rabin and Scott (1959).
:::

## Where this leads

Languages like $\{0^n1^n\}$, balanced brackets and $\{ww^R\}$ are non-regular because they need unbounded memory — but only memory of a particular, last-in-first-out kind. [[theory-of-computation/context-free-grammars]] describes them by recursive grammars, and [[theory-of-computation/pushdown-automata]] recognises them with a stack, proving a pumping lemma for that larger class. Languages like $\{ww\}$ and $\{0^n1^n2^n\}$ escape even that class, and need the full power of [[theory-of-computation/turing-machines]].

::: summary
- Strings are **distinguishable** by $L$ if some continuation puts exactly one of them in $L$; distinguishable strings need different DFA states ([[#lem-dist]]). Infinitely many pairwise distinguishable strings prove non-regularity.
- **Pumping lemma** ([[#thm-pumping]]): in a regular language with pumping length $p$, every $s \in L$ with $\lvert s\rvert \ge p$ splits as $xyz$ with $\lvert y\rvert \ge 1$, $\lvert xy\rvert \le p$ and $xy^iz \in L$ for all $i \ge 0$. To use it, *you* choose $s$ and $i$; you must handle *every* legal split.
- The pumping lemma is necessary but not sufficient for regularity; closure under intersection with a regular language often simplifies proofs.
- **Myhill–Nerode** ([[#thm-myhill-nerode]]): $L$ is regular iff $\equiv_L$ has finitely many classes, and the number of classes is the size of the minimal DFA, which is unique up to renaming.
- **Minimisation** ([[#alg-moore]], [[#thm-minimise]]): delete unreachable states, then refine $\{F, Q \setminus F\}$ until stable and merge each block. Moore's algorithm is $O(n^2\lvert\Sigma\rvert)$; Hopcroft's is $O(n\lvert\Sigma\rvert\log n)$.
:::

## Exercises

::: exercise Pumping lengths {level=1}
What is the smallest pumping length for (a) $L = \{0\}^*$, (b) $L = \{01\}$, (c) $L = 0^*1$? Justify briefly.
::: solution
(a) $p = 1$: every non-empty string $0^n$ splits with $y = 0$ at the front, and pumping gives $0^{n - 1 + i} \in L$. ($p$ must be at least $1$ by definition.)
(b) $p = 3$: no string of $L$ has length $\ge 3$, so the condition holds vacuously; with $p = 2$ the string $01$ would have to pump, and the only legal splits are $y = 0$ or $y = 01$ (with $x = \varepsilon$) and $y = 1$ (with $x = 0$); pumping down gives $1$, $\varepsilon$ or $0$, none in $L$.
(c) $p = 2$: a string $0^n1$ with $n \ge 1$ pumps with $y = 0$. With $p = 1$ the string $1 \in L$ would have to pump with $y = 1$, giving $\varepsilon \notin L$.
:::
:::

::: exercise Classes of a language {level=1 check="6"}
How many states does the minimal DFA have for the language of strings over $\{a\}$ whose length is divisible by $2$ or by $3$? (Enter the number.)
::: solution
Membership of $a^n$ depends on $n \bmod 6$, so there are at most $6$ classes, $[a^0], \dots, [a^5]$. They are pairwise distinguishable: for $0 \le i < j \le 5$ look for $z = a^t$ with exactly one of $i + t$, $j + t$ divisible by $2$ or $3$. The residues in $L$ are $\{0, 2, 3, 4\}$ and those not in $L$ are $\{1, 5\}$; shifting by $t$, the pattern of $i$ and $j$ differs for some $t$ unless $i \equiv j \pmod 6$ (the set $\{0,2,3,4\}$ has no non-trivial period modulo $6$: shifting it by $1, \dots, 5$ gives $\{1,3,4,5\}$, $\{2,4,5,0\}$, $\{3,5,0,1\}$, $\{4,0,1,2\}$, $\{5,1,2,3\}$, all different from it). So there are $6$ classes and $6$ states — matching the remark in [[theory-of-computation/nondeterminism]].
:::
:::

::: exercise Choosing the string {level=1}
Use the pumping lemma to prove that $P = \{ww^R : w \in \{0,1\}^*\}$ (even-length palindromes) is not regular.
::: solution
Suppose $P$ is regular with pumping length $p$, and let $s = 0^p 1 1 0^p \in P$ (with $w = 0^p1$). Any split with $\lvert xy\rvert \le p$ has $y = 0^k$, $k \ge 1$, within the first block. Then $xy^2z = 0^{p+k}110^p$ is not a palindrome (the first $1$ is at position $p + k + 1$ from the left but position $p + 1$ from the right), so it is not in $P$. Contradiction.
:::
:::

::: exercise Primes {level=2}
Prove that $\{0^n : n \text{ is prime}\}$ is not regular.
::: solution
Suppose it is regular with pumping length $p$. Choose a prime $n \ge p + 2$ and $s = 0^n$. Any legal split has $y = 0^k$ with $1 \le k \le p$. Take $i = n - k$: then $\lvert xy^iz\rvert = (n - k) + ik = (n - k) + (n - k)k = (n - k)(1 + k)$. Both factors are at least $2$ ($n - k \ge n - p \ge 2$ and $1 + k \ge 2$), so the length is composite and $xy^iz \notin L$. Contradiction.
:::
:::

::: exercise Regular or not? {level=2}
Decide which languages over $\{0,1\}$ are regular, with proofs: (a) $\{0^m1^n : m \ne n\}$; (b) $\{0^m1^n : m + n \text{ is even}\}$; (c) $\{w : w \text{ has equally many occurrences of } 01 \text{ and } 10\}$.
::: solution
(a) Not regular: its complement intersected with $0^*1^*$ is $\{0^n1^n\}$; if (a) were regular so would that intersection be. (Pumping directly is awkward here — exactly the situation where closure helps.)
(b) Regular: $m + n$ is even iff $m$ and $n$ are both even or both odd, so the language is described by the expression $(00)^*(11)^* \mid 0(00)^*1(11)^*$.
(c) Regular, surprisingly: the number of $01$ occurrences and the number of $10$ occurrences differ by at most one, and they are equal iff $w$ is empty or begins and ends with the same symbol (each $01$ is a switch from a run of $0$s to a run of $1$s, each $10$ the reverse, and switches alternate). That is the language of the exercise on strings that start and end with the same symbol in [[theory-of-computation/finite-automata]] (with $0, 1$ for $a, b$), plus $\varepsilon$ — regular.
:::
:::

::: exercise Running the minimiser {level=2 check="3"}
Apply [[#alg-moore]] to the DFA over $\{0,1\}$ with states $A$–$F$, start $A$, accepting $\{C, D, E\}$, and transitions $A: 0{\to}B, 1{\to}C$; $B: 0{\to}A, 1{\to}D$; $C: 0{\to}E, 1{\to}F$; $D: 0{\to}E, 1{\to}F$; $E: 0{\to}E, 1{\to}F$; $F: 0{\to}F, 1{\to}F$. How many states does the minimal DFA have? (Enter the number.) Describe its language.
::: solution
All states are reachable. $P_0 = \{\{C,D,E\}, \{A,B,F\}\}$. Round 1: in $\{C, D, E\}$ the successors are $(E, F)$ for all three — same blocks, no split. In $\{A, B, F\}$: $A \to (B, C)$ = (non-acc, acc), $B \to (A, D)$ = (non-acc, acc), $F \to (F, F)$ = (non-acc, non-acc): split into $\{A, B\}$ and $\{F\}$. Round 2: $\{A, B\}$: $A \to (B, C)$, $B \to (A, D)$, blocks $(\{A,B\}, \{C,D,E\})$ for both; $\{C, D, E\}$: $(E, F)$ for all, blocks $(\{C,D,E\}, \{F\})$. No split. Final partition $\{A,B\}, \{C,D,E\}, \{F\}$: **3 states**. The language is $0^*10^*$: any number of $0$s, a single $1$, then any number of $0$s — exactly one $1$.
:::
:::

::: exercise Myhill–Nerode for $\{0^n1^n\}$ {level=3}
For $B = \{0^n1^n : n \ge 0\}$, describe all equivalence classes of $\equiv_B$. For each class, give its **future** $\{z : xz \in B\}$ (the same for every $x$ in the class), and show that different classes have different futures.
::: solution
Every string is of exactly one of the following kinds, and its future is as stated.

- $\varepsilon$: future $B$.
- $0^k$ with $k \ge 1$: future $\{0^i1^{k+i} : i \ge 0\}$ (we may add more $0$s, then must close all of them).
- $V_k = \{0^m1^j : j \ge 1,\ m - j = k\}$ for $k \ge 0$ (at least one $1$ read, $k$ zeros still open): future $\{1^k\}$, since no further $0$ may follow a $1$. Note $V_0 = B \setminus \{\varepsilon\}$.
- $D$, everything else (a $0$ after a $1$, or more $1$s than $0$s in a prefix $0^m1^j$): future $\emptyset$.

Strings with the same future are equivalent by definition of $\equiv_B$, so each kind lies inside one class. Different kinds have different futures, so they are different classes: the future of $\varepsilon$ is the only one containing both $\varepsilon$ and $01$; the future of $0^k$ is infinite and its shortest element is $1^k$, so different $k$ give different futures; the future of $V_k$ is the single string $1^k$, different for different $k$, finite (unlike those of $0^k$) and non-empty (unlike that of $D$). So the classes are $\{\varepsilon\}$, $\{0^k\}$ for each $k \ge 1$, $V_k$ for each $k \ge 0$, and $D$ — infinitely many, confirming that $B$ is not regular. Note that $0^k$ and $0^{k+1}1$ are *not* equivalent although both "need $k$ more $1$s": $z = 01^{k+1}$ distinguishes them.
:::
:::

::: exercise Pumping implies eventual periodicity {level=3}
Let $L \subseteq \{0\}^*$ be regular. Prove that the set of lengths $N = \{n : 0^n \in L\}$ is **eventually periodic**: there are $n_0 \ge 0$ and $t \ge 1$ such that for all $n \ge n_0$, $n \in N \iff n + t \in N$. Deduce again that $\{0^{n^2}\}$ and $\{0^{2^n}\}$ are not regular.
::: solution
Let $M$ be a DFA for $L$ with $k$ states. Over a one-letter alphabet the run from $q_0$ is a single path $q_0, q_1 = \delta(q_0, 0), q_2, \dots$, and since there are $k$ states, $q_j = q_{j+t}$ for some $0 \le j < j + t \le k$. Because the next state depends only on the current one, $q_{n} = q_{n+t}$ for all $n \ge j$. So with $n_0 = j$: for $n \ge n_0$, $0^n \in L \iff q_n \in F \iff q_{n+t} \in F \iff 0^{n+t} \in L$.

For squares: if $N = \{n^2\}$ were eventually periodic with period $t$, then for a large square $m^2 \ge n_0$ also $m^2 + t \in N$; but for $m > t/2$ the next square after $m^2$ is $m^2 + 2m + 1 > m^2 + t$, so $m^2 + t$ is not a square. Contradiction. For powers of two: in an eventually periodic infinite set, the gaps between consecutive elements are bounded (by $t$, beyond $n_0$), but the gaps $2^{n+1} - 2^n = 2^n$ are unbounded.
:::
:::
