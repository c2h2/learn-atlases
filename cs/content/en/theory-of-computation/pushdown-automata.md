The bracket checker of [[data-structures/stacks-queues]] reads a string once from left to right and uses a stack: push on an opener, pop on a closer, accept if the stack is empty at the end. Its control is finite — "reading", "rejected" — and all its unbounded memory is in the stack, which it can only access at the top. A finite automaton could not do this job ([[theory-of-computation/non-regular-languages]]), but a finite automaton *plus a stack* can.

This combination is the **pushdown automaton**. It is to context-free grammars what the finite automaton is to regular expressions: the central theorem of this chapter is that a language is context-free if and only if some pushdown automaton recognises it. One direction gives a parsing method — a pushdown automaton can simulate leftmost derivations, which is the idea behind every top-down parser. The other direction shows that the stack is *exactly* the memory that grammars need. Then, as for regular languages, we find the limits: a **pumping lemma for context-free languages** proves that $\{a^nb^nc^n\}$ and $\{ww\}$ are not context-free, and the context-free languages turn out not to be closed under intersection or complement.

## Pushdown automata

A **pushdown automaton** (PDA) has a finite set of states, reads its input once from left to right, and has a stack of unbounded size over its own **stack alphabet** $\Gamma$. In one move it may read an input symbol or not, pop the top stack symbol or not, push a symbol or not, and change state. PDAs are nondeterministic by default, and — unlike for finite automata — this matters.

::: definition Pushdown automaton {#def-pda}
A **pushdown automaton** is a 6-tuple $P = (Q, \Sigma, \Gamma, \delta, q_0, F)$ where $Q$, $\Sigma$, $q_0$ and $F$ are as for an NFA, $\Gamma$ is the finite **stack alphabet**, and the transition function is

$$
\delta\colon Q \times \Sigma_\varepsilon \times \Gamma_\varepsilon \to \mathcal{P}(Q \times \Gamma_\varepsilon).
$$

A pair $(r, c) \in \delta(q, a, b)$ means: in state $q$, reading $a$ (or nothing if $a = \varepsilon$) with $b$ on top of the stack (or regardless of the stack if $b = \varepsilon$), the machine may pop $b$, push $c$ (nothing if $c = \varepsilon$) and go to state $r$. We draw it as an arrow $q \to r$ labelled $a, b \to c$.

$P$ **accepts** $w$ if $w = y_1 \cdots y_m$ with each $y_i \in \Sigma_\varepsilon$, and there are states $r_0, \dots, r_m$ and stack contents $s_0, \dots, s_m \in \Gamma^*$ with $r_0 = q_0$, $s_0 = \varepsilon$, $r_m \in F$, and for each $i$ some $(r_{i}, c) \in \delta(r_{i-1}, y_i, b)$ with $s_{i-1} = bt$ and $s_{i} = ct$ for some $t \in \Gamma^*$ (the top of the stack written first). $L(P)$ is the set of strings $P$ accepts.
:::

A **configuration** of $P$ is a triple (state, remaining input, stack). A computation is a sequence of configurations, each obtained from the previous by one transition. Note that acceptance is by **final state**: the stack need not be empty at the end (but the whole input must have been read). The machine cannot test directly whether the stack is empty; the usual trick is to push a special **bottom marker** $\$$ first, so that seeing $\$$ on top means "the stack is otherwise empty".

::: example A PDA for $0^n1^n$ {#ex-pda-0n1n}
Give a PDA for $\{0^n1^n : n \ge 0\}$ and show its computation on $0011$ and on $001$.
::: solution
States $q_1$ (start, accepting), $q_2$, $q_3$, $q_4$ (accepting); stack alphabet $\{0, \$\}$. Transitions:

- $q_1 \to q_2$: $\varepsilon, \varepsilon \to \$$ (push the bottom marker);
- $q_2 \to q_2$: $0, \varepsilon \to 0$ (push each $0$);
- $q_2 \to q_3$: $1, 0 \to \varepsilon$ (the first $1$ pops a $0$);
- $q_3 \to q_3$: $1, 0 \to \varepsilon$ (each further $1$ pops a $0$);
- $q_3 \to q_4$: $\varepsilon, \$ \to \varepsilon$ (all $0$s matched).

Computation on $0011$, writing configurations as (state, remaining input, stack with top on the left):

$$
(q_1, 0011, \varepsilon) \vdash (q_2, 0011, \$) \vdash (q_2, 011, 0\$) \vdash (q_2, 11, 00\$) \vdash (q_3, 1, 0\$) \vdash (q_3, \varepsilon, \$) \vdash (q_4, \varepsilon, \varepsilon).
$$

All input read and $q_4 \in F$: accept. On $001$ the machine reaches $(q_3, \varepsilon, 0\$)$; the move to $q_4$ needs $\$$ on top, so no move applies and the only branches end in $q_2$ or $q_3$, which are not accepting: reject. A $0$ after a $1$ has no transition from $q_3$, so strings such as $0101$ are rejected too. $q_1$ is accepting so that $\varepsilon$ is accepted.
:::
:::

::: widget graph
nodes: q1@0,0; q2@2.5,0; q3@5,0; q4@7.5,0
edges: q1>q2; q2>q2; q2>q3; q3>q3; q3>q4
algorithm: bfs
start: q1
caption: The state diagram of the PDA of [[#ex-pda-0n1n]], without its labels (the figure cannot draw them): $q_1 \to q_2$ is $\varepsilon, \varepsilon \to \$$, the loop on $q_2$ is $0, \varepsilon \to 0$, $q_2 \to q_3$ and the loop on $q_3$ are $1, 0 \to \varepsilon$, and $q_3 \to q_4$ is $\varepsilon, \$ \to \varepsilon$; $q_1$ and $q_4$ accept. The control is a four-state finite automaton for $0^*1^*$ — all the counting happens on the stack, which the picture does not show.
:::

Nondeterminism lets a PDA guess. The even palindromes $\{ww^R : w \in \{a, b\}^*\}$ need it: the machine must push the first half and pop while matching the second half, but nothing in the input marks the middle.

::: example Guessing the middle {#ex-pda-wwr}
Give a PDA for $\{ww^R : w \in \{a,b\}^*\}$ and run it on $abba$.
::: solution
$q_1 \xrightarrow{\varepsilon, \varepsilon \to \$} q_2$; in $q_2$ push every symbol read ($a, \varepsilon \to a$ and $b, \varepsilon \to b$); $q_2 \xrightarrow{\varepsilon, \varepsilon \to \varepsilon} q_3$ guesses that the middle has been reached; in $q_3$ pop a matching symbol for each symbol read ($a, a \to \varepsilon$ and $b, b \to \varepsilon$); $q_3 \xrightarrow{\varepsilon, \$ \to \varepsilon} q_4$, accepting.

On $abba$ the branch that guesses after two symbols succeeds: $(q_2, abba, \$) \vdash (q_2, bba, a\$) \vdash (q_2, ba, ba\$) \vdash (q_3, ba, ba\$) \vdash (q_3, a, a\$) \vdash (q_3, \varepsilon, \$) \vdash (q_4, \varepsilon, \varepsilon)$. Branches that guess at another position fail: guessing after one symbol, the next input $b$ does not match the top $a$.
:::
:::

A PDA can be simulated by searching the graph of its configurations. The program below does a breadth-first search; it terminates for this machine because every push except the first reads an input symbol, so the stack never exceeds $\lvert w\rvert + 1$ symbols and there are finitely many configurations. (A general PDA can push forever on $\varepsilon$-moves; a general simulator first converts it to a grammar in Chomsky normal form and runs CYK, [[theory-of-computation/context-free-grammars#alg-cyk]].)

```python
from collections import deque

# transitions: (state, input symbol or "", pop symbol or "", new state, push or "")
WWR = [("q1", "", "", "q2", "$"),                       # mark the bottom
       *[("q2", c, "", "q2", c) for c in "ab"],        # first half: push
       ("q2", "", "", "q3", ""),                       # guess the middle
       *[("q3", c, c, "q3", "") for c in "ab"],        # second half: match and pop
       ("q3", "", "$", "q4", "")]                      # bottom reached: accept

def accepts(delta, start, accept, w):
    """Breadth-first search over configurations (state, position, stack)."""
    first = (start, 0, "")                   # the stack is a string, top at the end
    seen, queue = {first}, deque([first])
    while queue:
        q, i, stack = queue.popleft()
        if i == len(w) and q in accept:
            return True
        for (p, a, pop, r, push) in delta:
            if p != q or (a and (i == len(w) or w[i] != a)):
                continue                     # wrong state, or input does not match
            if pop and not stack.endswith(pop):
                continue                     # cannot pop that symbol
            new = (r, i + len(a), stack[:len(stack) - len(pop)] + push)
            if new not in seen:
                seen.add(new); queue.append(new)
    return False

for w in ["", "abba", "abab", "aabbaa", "aab"]:
    print(f"{w!r:9} {accepts(WWR, 'q1', {'q4'}, w)}")
```

```console
$ python3 pda.py
''        True
'abba'    True
'abab'    False
'aabbaa'  True
'aab'     False
```

## Grammars and pushdown automata are equivalent

We prove that PDAs recognise exactly the context-free languages. It is convenient to let a PDA push a whole string $\gamma = c_1 \cdots c_k$ in one transition, written $a, b \to \gamma$ (with $c_1$ ending on top). This is only an abbreviation: a chain of $k$ new states, each pushing one symbol on an $\varepsilon$-move, does the same.

::: theorem From grammars to pushdown automata {#thm-cfg-to-pda}
For every CFG $G$ there is a PDA $P$ with $L(P) = L(G)$.
:::

::: proof
Let $G = (V, \Sigma, R, S)$. The PDA has three main states $q_{\text{start}}$, $q_{\text{loop}}$, $q_{\text{acc}}$ (accepting), stack alphabet $V \cup \Sigma \cup \{\$\}$, and transitions:

1. $q_{\text{start}} \to q_{\text{loop}}$: $\varepsilon, \varepsilon \to S\$$ (push $\$$ and then $S$, so $S$ is on top);
2. for each rule $A \to \gamma$: $q_{\text{loop}} \to q_{\text{loop}}$: $\varepsilon, A \to \gamma$ (**expand**: replace the variable on top by a right-hand side, its first symbol on top);
3. for each $a \in \Sigma$: $q_{\text{loop}} \to q_{\text{loop}}$: $a, a \to \varepsilon$ (**match**: a terminal on top must equal the next input symbol);
4. $q_{\text{loop}} \to q_{\text{acc}}$: $\varepsilon, \$ \to \varepsilon$.

The PDA carries out a leftmost derivation, keeping on its stack the part of the current sentential form that has not yet been matched against the input. We prove the two inclusions separately.

*($\Leftarrow$, $L(G) \subseteq L(P)$.)* Let $S = \beta_0 \Rightarrow \beta_1 \Rightarrow \cdots \Rightarrow \beta_k = w$ be a leftmost derivation. Each $\beta_j$ has the form $x_j A_j \gamma_j$ with $x_j \in \Sigma^*$ and $A_j$ its leftmost variable (for $j < k$). By induction on $j$, the PDA can reach the configuration with $x_j$ read and $A_j\gamma_j\$$ on the stack: from there, expanding $A_j$ by the rule used in step $j+1$ puts the right-hand side on top, and matching the terminals that now precede the next leftmost variable reads exactly the input $x_{j+1}$ minus $x_j$. At the end the whole of $w$ has been read, the stack holds $\$$, and rule 4 accepts.

*($\Rightarrow$, $L(P) \subseteq L(G)$.)* By induction on the number of moves, in every reachable configuration in $q_{\text{loop}}$ with $x$ read and $\alpha\$$ on the stack, $S \Rightarrow^* x\alpha$: initially $x = \varepsilon$ and $\alpha = S$; an expand move replaces $\alpha = A\alpha''$ by $\gamma\alpha''$, which is one more derivation step $xA\alpha'' \Rightarrow x\gamma\alpha''$; a match move changes $(x, a\alpha'')$ into $(xa, \alpha'')$, leaving $x\alpha$ unchanged. The PDA accepts only after reading all of $w$ with $\$$ on top, i.e. with $\alpha = \varepsilon$, so $S \Rightarrow^* w$.
:::

The PDA built here is a **nondeterministic top-down parser**: it guesses which rule to apply to each variable. Recursive-descent and LL parsers in compilers make the same moves deterministically, choosing the rule by looking ahead at the next input token, which works for grammars designed for it.

For the converse we first put the PDA in a convenient shape. Every PDA can be modified, without changing its language, so that

1. it has a single accepting state $q_{\text{acc}}$;
2. it empties its stack before accepting;
3. every transition either pushes one symbol or pops one symbol, but not both and not neither.

(For 1 and 2: add $\varepsilon$-moves from the old accepting states to a new state that pops everything — with a bottom marker pushed at the start to know when to stop — and then moves to $q_{\text{acc}}$. For 3: replace a transition that pops and pushes by two transitions through a new state, and one that does neither by a push of a dummy symbol followed by its pop.)

::: theorem From pushdown automata to grammars {#thm-pda-to-cfg}
For every PDA $P$ there is a CFG $G$ with $L(G) = L(P)$. Consequently a language is context-free if and only if some PDA recognises it.
:::

::: proof
Assume $P = (Q, \Sigma, \Gamma, \delta, q_0, \{q_{\text{acc}}\})$ has the three properties above. For each pair of states $p, q$ we introduce a variable $A_{pq}$, intended to generate exactly the strings $x$ that can take $P$ **from $p$ with an empty stack to $q$ with an empty stack**; such a computation, started on top of any stack $t$, also takes $P$ from $p$ to $q$ leaving $t$ untouched and never popping into it. The rules are:

1. for all $p, q, r, s \in Q$, $u \in \Gamma$ and $a, b \in \Sigma_\varepsilon$: if $(r, u) \in \delta(p, a, \varepsilon)$ and $(q, \varepsilon) \in \delta(s, b, u)$, add $A_{pq} \to aA_{rs}b$;
2. for all $p, q, r \in Q$: $A_{pq} \to A_{pr}A_{rq}$;
3. for all $p \in Q$: $A_{pp} \to \varepsilon$.

The start variable is $A_{q_0 q_{\text{acc}}}$. Since $P$ starts with an empty stack and empties it before accepting, $L(P)$ is the set of strings taking $P$ from $q_0$ with empty stack to $q_{\text{acc}}$ with empty stack. It remains to prove that $A_{pq} \Rightarrow^* x$ iff $x$ takes $P$ from $p$ with empty stack to $q$ with empty stack.

*If $A_{pq} \Rightarrow^* x$ then $x$ can do this* — by induction on the number of derivation steps. One step: the rule must be $A_{pp} \to \varepsilon$, and the empty input takes $p$ to $p$. More steps: if the first rule is $A_{pq} \to aA_{rs}b$ with $x = ayb$ and $A_{rs} \Rightarrow^* y$, then $P$ can read $a$ and push $u$ going to $r$; by the induction hypothesis read $y$ going from $r$ to $s$ leaving $u$ untouched; and read $b$ popping $u$, going to $q$ with the stack empty. If the first rule is $A_{pq} \to A_{pr}A_{rq}$ with $x = yz$, the induction hypothesis gives computations $p \to r$ on $y$ and $r \to q$ on $z$, each starting and ending with an empty stack; run them one after the other.

*If $x$ can do this then $A_{pq} \Rightarrow^* x$* — by induction on the number of moves of the computation. Zero moves: then $p = q$, $x = \varepsilon$ and $A_{pp} \to \varepsilon$. Otherwise the first move cannot be a pop (the stack is empty), so by property 3 it pushes some $u$; and the last move cannot be a push (the stack ends empty), so it pops some symbol. Two cases:

- The stack is empty only at the start and the end. Then the symbol $u$ pushed first stays at the bottom until the last move, which therefore pops it. Say the first move reads $a$ and goes to $r$, and the last move reads $b$ from state $s$. The input $x = ayb$, and $y$ takes $P$ from $r$ to $s$ with $u$ at the bottom never touched — that is, from $r$ to $s$ "with an empty stack" in the relative sense, in two fewer moves. By the induction hypothesis $A_{rs} \Rightarrow^* y$, and rule 1 gives $A_{pq} \Rightarrow aA_{rs}b \Rightarrow^* ayb$.
- The stack becomes empty at some intermediate point, in state $r$. Then $x = yz$ where $y$ takes $p$ to $r$ and $z$ takes $r$ to $q$, both from empty stack to empty stack and both in fewer moves. By the induction hypothesis $A_{pr} \Rightarrow^* y$ and $A_{rq} \Rightarrow^* z$, and rule 2 gives $A_{pq} \Rightarrow A_{pr}A_{rq} \Rightarrow^* yz$.

Combining with [[#thm-cfg-to-pda]], PDAs and CFGs describe the same languages.
:::

::: quiz
In the construction of [[#thm-pda-to-cfg]] for a PDA with $5$ states, how many variables does the grammar have?
- [ ] $5$
- [ ] $10$
- [x] $25$
- [ ] $125$
::: solution
One variable $A_{pq}$ for every ordered pair of states, so $5^2 = 25$. The number of *rules* is larger: rule 2 alone contributes one rule for each triple $(p, q, r)$, so $125$ rules of that kind.
:::
:::

### Deterministic pushdown automata

A PDA is **deterministic** if from every configuration at most one move is possible (in particular, a state with an $\varepsilon$-move on some stack top has no move reading a symbol with that stack top). The languages recognised by deterministic PDAs, the **deterministic context-free languages** (DCFLs), are a proper subset of the context-free languages. $\{0^n1^n\}$ is deterministic (the machine of [[#ex-pda-0n1n]] never has a choice); the even palindromes $\{ww^R\}$ are context-free but provably not deterministic, because a machine that must commit as it reads cannot know where the middle is. Unlike the context-free languages, DCFLs are closed under complement, and every DCFL has an unambiguous grammar. Their importance is practical: Knuth's LR(k) grammars (1965) generate exactly the DCFLs (already for $k = 1$), and the LR parsers produced by Yacc and Bison are deterministic PDAs that parse in linear time ([[compilers]]).

::: warning Nondeterminism matters for pushdown automata
For finite automata, nondeterminism adds succinctness but no power ([[theory-of-computation/nondeterminism#thm-subset]]). For pushdown automata it adds power: there is no subset construction, because a set of configurations cannot be represented with a single stack — the different branches need different stacks. So "context-free" does not mean "parsable deterministically in linear time". General CFG parsing uses CYK, Earley's algorithm or GLR, in up to cubic time; linear-time parsing needs a deterministic grammar class.
:::

## The pumping lemma for context-free languages

In a parse tree for a long string, some path from the root to a leaf must be long, and a long path must repeat a variable. The part of the tree between the two occurrences can be cut out or repeated, and since one occurrence of a variable can derive whatever the other derives, the result is still a parse tree. Unlike the regular case, the repetition pumps *two* substrings at once, one on each side of the repeated variable.

::: theorem Pumping lemma for context-free languages {#thm-cf-pumping}
If $L$ is a context-free language, then there is a number $p \ge 1$ (a pumping length) such that every $s \in L$ with $\lvert s\rvert \ge p$ can be written as $s = uvxyz$ where

1. $\lvert vy\rvert \ge 1$,
2. $\lvert vxy\rvert \le p$, and
3. $uv^ixy^iz \in L$ for every $i \ge 0$.
:::

::: proof
Let $G$ be a grammar for $L$ in Chomsky normal form ([[theory-of-computation/context-free-grammars#thm-cnf]]), with variable set $V$, and let $p = 2^{\lvert V\rvert}$. Define the **height** of a parse tree as the number of edges on its longest path from the root to a leaf.

*Short trees have short yields.* A parse tree of height $h \ge 1$ for a non-empty string has yield of length at most $2^{h-1}$: by induction on $h$, a tree of height $1$ is a single rule $A \to a$ with yield of length $1$, and a taller tree has a root rule $A \to BC$ whose two subtrees have height at most $h - 1$, so the yield has length at most $2 \cdot 2^{h-2} = 2^{h-1}$.

Now let $s \in L$ with $\lvert s\rvert \ge p$, and choose any parse tree $\tau$ for $s$. Since $\lvert s\rvert \ge 2^{\lvert V\rvert} > 2^{\lvert V\rvert - 1}$, the height of $\tau$ is at least $\lvert V\rvert + 1$. Take a longest root-to-leaf path. It has at least $\lvert V\rvert + 1$ edges, so at least $\lvert V\rvert + 2$ nodes, of which only the last (a leaf) is a terminal: at least $\lvert V\rvert + 1$ variable nodes. Among the **lowest** $\lvert V\rvert + 1$ variable nodes on the path, by the pigeonhole principle some variable $R$ occurs twice. Let the upper occurrence be the root of a subtree $\tau_1$ and the lower one the root of $\tau_2 \subseteq \tau_1$. Let $x$ be the yield of $\tau_2$, and $vxy$ the yield of $\tau_1$; then $s = uvxyz$ for suitable $u, z$.

*Pumping.* Replacing $\tau_2$ by a copy of $\tau_1$ gives a valid parse tree (both roots are labelled $R$) with yield $uv^2xy^2z$; repeating gives $uv^ixy^iz$ for every $i \ge 2$. Replacing $\tau_1$ by $\tau_2$ gives yield $uxz$, the case $i = 0$.

*$\lvert vxy\rvert \le p$.* The path from the upper $R$ down to the leaf has at most $\lvert V\rvert + 1$ edges, since the upper $R$ is among the lowest $\lvert V\rvert + 1$ variable nodes. Because we chose a *longest* path in $\tau$, no path in $\tau_1$ is longer than this one (otherwise the path through it would be longer in $\tau$). So $\tau_1$ has height at most $\lvert V\rvert + 1$ and yield of length at most $2^{\lvert V\rvert} = p$.

*$\lvert vy\rvert \ge 1$.* The upper $R$ has a descendant variable, so its rule is some $R \to BC$, and $\tau_2$ lies inside the subtree of $B$ or of $C$. The other child derives a non-empty string (in CNF only the start variable can derive $\varepsilon$, and it does not occur on right-hand sides), and that string is part of $v$ or of $y$.
:::

The quantifier structure is the same as for [[theory-of-computation/non-regular-languages#thm-pumping]]: to prove $L$ is not context-free, for every $p$ choose $s \in L$ with $\lvert s\rvert \ge p$, and show that *every* split $s = uvxyz$ with $\lvert vy\rvert \ge 1$ and $\lvert vxy\rvert \le p$ has some $i$ with $uv^ixy^iz \notin L$. The new difficulty is that $v$ and $y$ can sit in different parts of $s$, so proofs usually split into cases according to where the window $vxy$ of width at most $p$ falls.

::: widget graph
nodes: S@3,4; u@0,0; Rup@3,3; z@6,0; v@1.5,0; Rlow@3,2; y@4.5,0; x@3,0
edges: S-u; S-Rup; S-z; Rup-v; Rup-Rlow; Rup-y; Rlow-x
algorithm: dfs
start: S
caption: The shape of the argument in [[#thm-cf-pumping]], drawn schematically: the leaves stand for the substrings $u, v, x, y, z$, and the two vertices $R_{\text{up}}$ and $R_{\text{low}}$ are two occurrences of the same variable $R$ on one root-to-leaf path. The upper $R$ derives $vxy$ and the lower $R$ derives $x$. Grafting the upper subtree in place of the lower one gives $uv^2xy^2z$; grafting the lower in place of the upper gives $uxz$. The depth-first order of the leaves is the order $u, v, x, y, z$ of the string.
:::

::: example $a^nb^nc^n$ is not context-free {#ex-anbncn}
Prove that $T = \{a^nb^nc^n : n \ge 0\}$ is not context-free.
::: solution
Suppose $T$ is context-free with pumping length $p$, and let $s = a^pb^pc^p$. Take any split $s = uvxyz$ with $\lvert vy\rvert \ge 1$ and $\lvert vxy\rvert \le p$. Because the window $vxy$ has length at most $p$, it cannot contain both an $a$ and a $c$ (between the last $a$ and the first $c$ there are $p$ $b$s). Two cases:

- $v$ or $y$ contains two different symbols. Then $uv^2xy^2z$ has symbols out of order (for example a $b$ before an $a$), so it is not in $T$.
- $v$ and $y$ each consist of a single repeated symbol. Then together they involve at most two of the three symbols, and $\lvert vy\rvert \ge 1$, so $uv^2xy^2z$ has more of one or two symbols than of the third — not in $T$.

Either way pumping with $i = 2$ leaves $T$: contradiction.
:::
:::

::: example $\{ww\}$ is not context-free {#ex-ww}
Prove that $W = \{ww : w \in \{0,1\}^*\}$ is not context-free. (Contrast with $\{ww^R\}$, which is.)
::: solution
Suppose $W$ is context-free with pumping length $p$; take $s = 0^p1^p0^p1^p \in W$, and any legal split $s = uvxyz$. Pump down: $s' = uxz$, of length $4p - \lvert vy\rvert$. If $\lvert vy\rvert$ is odd, $s'$ has odd length and is not in $W$. Otherwise write $\lvert vy\rvert = 2m$ with $1 \le m \le p/2$; if $s' = ww$ then $\lvert w\rvert = 2p - m$. Since $\lvert vxy\rvert \le p$, there are three cases.

- *$vxy$ lies in the first half* $0^p1^p$. Then the second half of $s'$ — its last $2p - m$ symbols — is a suffix of the untouched $0^p1^p$, ending in $1$; the first half ends with the first $m$ symbols of the third block, which are $0$s. So the two halves differ in their last symbol.
- *$vxy$ lies in the second half.* Symmetrically, the first half of $s'$ is $0^p1^{p - m}$ and starts with $0$, while the second half starts with the last $m$ symbols of the second block, which are $1$s.
- *$vxy$ straddles the midpoint.* Then it lies inside the middle $1^p0^p$, and $s' = 0^p1^{j}0^{k}1^p$ with $j + k = 2p - 2m$. If $s' = ww$, then $w$ begins with $0^p$ (the first half starts with $s'$'s first $2p - m \ge p$ symbols) and ends with $1^p$; so $\lvert w\rvert \ge 2p$, but $\lvert w\rvert = 2p - m < 2p$.

In every case $uxz \notin W$, contradicting the pumping lemma.
:::
:::

## Closure properties

The grammar constructions of [[theory-of-computation/context-free-grammars]] show that the context-free languages are closed under union, concatenation and star. Two closure properties of the regular languages fail.

::: theorem Non-closure under intersection and complement {#thm-cf-nonclosure}
The context-free languages are not closed under intersection, and not closed under complement.
:::

::: proof
$A = \{a^nb^nc^m : n, m \ge 0\}$ and $B = \{a^mb^nc^n : n, m \ge 0\}$ are context-free: $A$ is generated by $S \to XC$, $X \to aXb \mid \varepsilon$, $C \to cC \mid \varepsilon$, and $B$ similarly. But $A \cap B = \{a^nb^nc^n\}$, which is not context-free by [[#ex-anbncn]]. If the class were closed under complement, then since it is closed under union it would be closed under intersection by De Morgan's law, $A \cap B = \overline{\overline{A} \cup \overline{B}}$ — a contradiction.
:::

::: theorem Intersection with a regular language {#thm-cf-regular}
If $L$ is context-free and $R$ is regular, then $L \cap R$ is context-free.
:::

::: proof
Let $P = (Q_P, \Sigma, \Gamma, \delta_P, p_0, F_P)$ be a PDA for $L$ and $M = (Q_M, \Sigma, \delta_M, m_0, F_M)$ a DFA for $R$. Build a PDA with states $Q_P \times Q_M$, the same stack, start $(p_0, m_0)$ and accepting states $F_P \times F_M$. For each transition $(p', c) \in \delta_P(p, a, b)$ it has the transition $\bigl((p', m'), c\bigr) \in \delta\bigl((p, m), a, b\bigr)$ where $m' = \delta_M(m, a)$ if $a \in \Sigma$ and $m' = m$ if $a = \varepsilon$. The DFA component tracks the input read so far while the PDA component and the stack run unchanged, exactly as in the product construction ([[theory-of-computation/finite-automata#def-product]]); a single stack suffices because only one of the machines uses it. By induction on the length of a computation, the product reaches $((p, m), \text{stack } t)$ after reading $x$ iff $P$ can reach $(p, t)$ on $x$ and $m = \hat\delta_M(m_0, x)$. So it accepts exactly $L \cap R$.
:::

This is a useful tool for proving non-context-freeness: $\{w \in \{a,b,c\}^* : \#_a(w) = \#_b(w) = \#_c(w)\}$ is not context-free, because its intersection with the regular language $a^*b^*c^*$ is $\{a^nb^nc^n\}$.

::: quiz
Which languages are context-free?
- [x] $\{a^ib^jc^k : i = j \text{ or } j = k\}$
- [ ] $\{a^nb^nc^n : n \ge 0\}$
- [x] $\{a^nb^mc^md^n : m, n \ge 0\}$
- [ ] $\{a^nb^mc^nd^m : m, n \ge 0\}$
::: solution
The first is the union of $\{a^nb^nc^k\}$ and $\{a^ib^nc^n\}$, both context-free. The third is nested — $S \to aSd \mid X$, $X \to bXc \mid \varepsilon$ — which a stack handles. The fourth is *crossed*: the $a$s must match the $c$s and the $b$s the $d$s, and a stack, which matches the most recent first, cannot interleave the two matchings; a pumping argument with $s = a^pb^pc^pd^p$ proves it is not context-free (any window of width $p$ meets at most two adjacent blocks, so pumping unbalances a matched pair).
:::
:::

::: history
The pushdown store was introduced in automata theory by Anthony Oettinger (1961), who studied it for syntactic analysis in machine translation, and by Marcel-Paul Schützenberger; the equivalence of pushdown automata and context-free grammars was established by Noam Chomsky in "Context-free grammars and pushdown storage" (1962), by Robert Evey (1963) and by Schützenberger (1963). Yehoshua Bar-Hillel, Micha Perles and Eli Shamir proved the pumping lemma for context-free languages and the non-closure results in "On formal properties of simple phrase structure grammars" (1961). Seymour Ginsburg and Sheila Greibach developed the theory of deterministic context-free languages, including closure under complement, in 1966, and Donald Knuth's "On the translation of languages from left to right" (1965) introduced LR(k) parsing. William Ogden strengthened the pumping lemma in 1968 (Ogden's lemma), which proves, for example, that some languages are inherently ambiguous.
:::

## Where this leads

The two pumping lemmas and their failures point to the next model. $\{a^nb^nc^n\}$ and $\{ww\}$ are easy for a program with ordinary memory: count, or compare two halves. A machine with *two* stacks, or one tape it can read and write in both directions, can do this — and, as [[theory-of-computation/turing-machines]] shows, can then do everything any computer can. The equivalence of grammars and stack machines is also the foundation of parsing in [[compilers]]; the undecidability of questions such as "does this CFG generate every string?" is proved in [[theory-of-computation/reductions]].

::: summary
- A **pushdown automaton** is an NFA with a stack; a move reads an input symbol or $\varepsilon$, pops and pushes at most one symbol each ([[#def-pda]]). A bottom marker $\$$ lets it detect the empty stack.
- **CFG → PDA** ([[#thm-cfg-to-pda]]): a nondeterministic top-down parser that expands the variable on top of the stack and matches terminals against the input.
- **PDA → CFG** ([[#thm-pda-to-cfg]]): variables $A_{pq}$ generate the inputs that take the PDA from $p$ to $q$ with empty stack at both ends. So PDAs recognise exactly the context-free languages.
- Unlike finite automata, **deterministic** PDAs are weaker than nondeterministic ones; DCFLs (LR grammars) are the languages parsed in linear time by compilers.
- **Pumping lemma for CFLs** ([[#thm-cf-pumping]]): every long $s \in L$ splits as $uvxyz$ with $\lvert vy\rvert \ge 1$, $\lvert vxy\rvert \le p$ and $uv^ixy^iz \in L$ for all $i \ge 0$; it shows $\{a^nb^nc^n\}$ and $\{ww\}$ are not context-free.
- CFLs are closed under union, concatenation, star and **intersection with regular languages** ([[#thm-cf-regular]]), but not under intersection or complement ([[#thm-cf-nonclosure]]).
:::

## Exercises

::: exercise Tracing a PDA {level=1}
List every configuration of an accepting computation of the PDA of [[#ex-pda-wwr]] on $aabbaa$, and explain why the branch that guesses the middle after one symbol dies.
::: solution
$(q_1, aabbaa, \varepsilon) \vdash (q_2, aabbaa, \$) \vdash (q_2, abbaa, a\$) \vdash (q_2, bbaa, aa\$) \vdash (q_2, baa, baa\$) \vdash (q_3, baa, baa\$) \vdash (q_3, aa, aa\$) \vdash (q_3, a, a\$) \vdash (q_3, \varepsilon, \$) \vdash (q_4, \varepsilon, \varepsilon)$. Guessing after one symbol gives $(q_3, abbaa, a\$)$; the next input $a$ matches and pops, giving $(q_3, bbaa, \$)$; now the input $b$ does not match the top $\$$, and the move to $q_4$ leaves input unread, so the branch cannot accept.
:::
:::

::: exercise Grammar size from a PDA {level=1 check="64"}
A PDA in the normal form of [[#thm-pda-to-cfg]] has $4$ states. How many rules of type 2 ($A_{pq} \to A_{pr}A_{rq}$) does the construction produce? (Enter the number.)
::: solution
One rule for each ordered triple $(p, q, r)$ of states: $4^3 = 64$.
:::
:::

::: exercise Designing PDAs {level=1}
Describe PDAs for (a) $\{a^ib^j : i \le j \le 2i\}$ and (b) $\{w \in \{a,b\}^* : \#_a(w) = \#_b(w)\}$.
::: solution
(a) Push a $\$$, then for each $a$ nondeterministically push one or two markers $X$; then for each $b$ pop one $X$; accept on $\$$ after the input. If $i$ $a$s pushed $k$ markers then $i \le k \le 2i$, and the $b$s must number exactly $k$.

(b) The stack holds the surplus: after the bottom marker, a run of $A$s (more $a$s than $b$s so far) or of $B$s. On $a$: if the top is $B$, pop it; otherwise push $A$. On $b$: symmetrically. Accept when the top is $\$$ at the end. This is deterministic except for the test of the top symbol, which the transition function does directly.
:::
:::

::: exercise A pumping proof {level=2}
Prove that $\{a^{n^2} : n \ge 0\}$ is not context-free, and that $\{a^ib^jc^k : i < j < k\}$ is not context-free.
::: solution
*Squares.* With pumping length $p$, take $s = a^{p^2}$. Any split has $1 \le \lvert vy\rvert \le \lvert vxy\rvert \le p$, and $uv^2xy^2z = a^{p^2 + \lvert vy\rvert}$ with $p^2 < p^2 + \lvert vy\rvert \le p^2 + p < (p+1)^2$, not a square.

*$i < j < k$.* Take $s = a^pb^{p+1}c^{p+2}$. If $v$ or $y$ contains two kinds of symbols, pumping up breaks the order. Otherwise $v$ and $y$ each lie in one block, and since the window $vxy$ has width at most $p$ while the $b$-block has $p + 1$ symbols, $vy$ cannot contain both an $a$ and a $c$. Classify by the symbols in $vy$:

- $b$s, and possibly $a$s, but no $c$s: pump up; the number of $b$s becomes at least $p + 2 = k$, so $j < k$ fails;
- $b$s and $c$s: pump down; the number of $b$s becomes at most $p = i$, so $i < j$ fails;
- only $a$s: pump up; the number of $a$s becomes at least $p + 1 = j$, so $i < j$ fails;
- only $c$s: pump down; the number of $c$s becomes at most $p + 1 = j$, so $j < k$ fails.

Every case leaves the language.
:::
:::

::: exercise Product with a DFA {level=2}
Use [[#thm-cf-regular]] to prove that $\{w \in \{a,b\}^* : \#_a(w) = 2\,\#_b(w) \text{ and } w \text{ contains no } ba\}$ is context-free, and that $\{w \in \{a,b,c\}^* : \#_a(w) = \#_b(w) = \#_c(w)\}$ is not.
::: solution
The first language is $\{w : \#_a = 2\#_b\} \cap a^*b^* = \{a^{2n}b^n\}$; the first factor is context-free (a PDA keeping a signed surplus on its stack, as in the exercise on designing PDAs, with each $b$ worth two $a$s), and $a^*b^*$ is regular, so the intersection is context-free by the theorem. It is also generated directly by $S \to aaSb \mid \varepsilon$.

For the second: if it were context-free, its intersection with the regular language $a^*b^*c^*$ would be too; that intersection is $\{a^nb^nc^n\}$, which is not context-free by [[#ex-anbncn]].
:::
:::

::: exercise PDA for a grammar {level=2}
Apply [[#thm-cfg-to-pda]] to the grammar $S \to aSb \mid \varepsilon$ and list the configurations of an accepting computation on $aabb$.
::: solution
Transitions: push $S\$$; expand $S \to aSb$ or $S \to \varepsilon$; match $a$ and $b$; pop $\$$ to accept. Configurations (stack top on the left): $(q_{\text{loop}}, aabb, S\$) \vdash (q_{\text{loop}}, aabb, aSb\$) \vdash (q_{\text{loop}}, abb, Sb\$) \vdash (q_{\text{loop}}, abb, aSbb\$) \vdash (q_{\text{loop}}, bb, Sbb\$) \vdash (q_{\text{loop}}, bb, bb\$) \vdash (q_{\text{loop}}, b, b\$) \vdash (q_{\text{loop}}, \varepsilon, \$) \vdash (q_{\text{acc}}, \varepsilon, \varepsilon)$. The expansions follow the leftmost derivation $S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aabb$.
:::
:::

::: exercise Unary context-free languages {level=3}
Prove that every context-free language over a one-letter alphabet $\{a\}$ is regular. (Hint: use the pumping lemma to show that the set of lengths is eventually periodic, or show that the set of lengths is a finite union of arithmetic progressions.)
::: solution
Let $L \subseteq a^*$ be context-free with pumping length $p$, and let $N = \{n : a^n \in L\}$. For every $n \in N$ with $n \ge p$ there is $d \in \{1, \dots, p\}$ (namely $d = \lvert vy\rvert$) such that $n + kd \in N$ for all $k \ge 0$ (pumping up). Let $t = p!$, which is a multiple of every such $d$; then for every $n \in N$ with $n \ge p$, all of $n + t, n + 2t, \dots$ are in $N$ (as multiples of $d$ steps).

For each residue $r$ modulo $t$, consider the elements of $N$ that are $\ge p$ and $\equiv r \pmod t$. If there are none, nothing is needed. Otherwise let $m_r$ be the smallest; by the previous paragraph every $n \ge m_r$ with $n \equiv r$ is in $N$. So $N \cap [p, \infty)$ is a union of at most $t$ sets $\{m_r + kt : k \ge 0\}$, and $N \cap [0, p)$ is finite. Each set $\{a^{m + kt} : k \ge 0\} = a^m(a^t)^*$ is regular, a finite union of regular languages is regular, so $L$ is regular. (The same conclusion follows from Parikh's theorem.)
:::
:::

::: exercise Crossed dependencies {level=3}
Prove carefully that $X = \{a^nb^mc^nd^m : m, n \ge 0\}$ is not context-free. Then explain why the "crossed" pattern in $X$ corresponds to checking, in a programming language, that each function call has the same number of arguments as the function's declaration — and what this means for whether that check belongs in the parser.
::: solution
Suppose $X$ is context-free with pumping length $p$, and take $s = a^pb^pc^pd^p$. Consider any split with $\lvert vy\rvert \ge 1$ and $\lvert vxy\rvert \le p$. If $v$ or $y$ contains two different symbols, $uv^2xy^2z$ is out of order. Otherwise $v$ and $y$ are each within one block, and since the window has width at most $p$, $vxy$ lies within two *adjacent* blocks: $ab$, $bc$ or $cd$ (or within one block). Pumping with $i = 2$ increases the number of symbols in one or two adjacent blocks. But the matched pairs are $(a, c)$ and $(b, d)$, which are never adjacent; so at least one block of a matched pair grows while its partner does not, and $uv^2xy^2z \notin X$.

In a program, a declaration `f(x1, ..., xn)` followed later by a call `f(e1, ..., en)` has the same crossing shape when several functions are declared and then called in an interleaved order: the counts must match pairwise across intervening material. By the same kind of argument such constraints are not context-free in general, which is why compilers do not try to enforce them in the grammar. The parser checks the context-free syntax, and **semantic analysis** — a symbol table and type checking ([[compilers]]) — checks arity, declarations before use and types afterwards.
:::
:::
