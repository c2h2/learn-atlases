The lexer has turned the text `a + b * c` into the tokens `ID PLUS ID TIMES ID`. Now the compiler must discover their structure: that `b * c` is a unit, that its value is added to `a`, and not the other way round. This is **parsing**: given a context-free grammar ([[theory-of-computation/context-free-grammars]]) and a string of tokens, find a parse tree for the string, or report that there is none.

General algorithms such as CYK ([[theory-of-computation/context-free-grammars#alg-cyk]]) can parse with any grammar, but they take cubic time, which is far too slow for a compiler processing millions of tokens. Compilers instead use grammars from restricted classes that can be parsed in **linear time, in one left-to-right pass, without backtracking**. There are two families. **Top-down** parsers, the subject of this chapter, build the tree from the root down, predicting at each step which rule to use from the next token. **Bottom-up** parsers ([[compilers/bottom-up-parsing]]) build it from the leaves up. The tiny compiler of [[compilers/compiler-structure]] already contains a top-down parser, written by hand as one function per grammar rule; here we find out exactly when such a parser works, how to compute the information it needs (the FIRST and FOLLOW sets), how to turn it into a table, and what to do with grammars that do not fit.

## Recursive descent

Take the grammar of arithmetic expressions with the standard layering for precedence ([[theory-of-computation/context-free-grammars#eq-expr-grammar]]):

$$
\begin{aligned}
E &\to E + T \mid T \\
T &\to T * F \mid F \\
F &\to (\,E\,) \mid \mathrm{id}
\end{aligned}
$$ {#eq-lr-grammar}

A **recursive-descent** parser has one procedure for each nonterminal; the procedure for $A$ consumes a prefix of the input derivable from $A$. For $F$ this is easy: if the next token is `(`, consume it, call $E$, and expect `)`; if it is `id`, consume it; otherwise report an error. The next token decides the production. For $E$ it fails completely: the procedure for $E$ would begin with "to parse $E + T$, first parse an $E$", calling itself without consuming anything, forever.

::: definition Left recursion {#def-left-rec}
A nonterminal $A$ is **left-recursive** if $A \Rightarrow^+ A\alpha$ for some string $\alpha$: some derivation of one or more steps from $A$ produces a sentential form beginning with $A$. It is **immediately** left-recursive if there is a production $A \to A\alpha$.
:::

Left recursion is not a defect of a grammar — left-recursive rules are the natural way to express left-associative operators — but it is fatal to top-down parsing. The fix is to rewrite the grammar.

::: algorithm Removing immediate left recursion {#alg-left-rec}
Let the productions for $A$ be $A \to A\alpha_1 \mid \dots \mid A\alpha_m \mid \beta_1 \mid \dots \mid \beta_n$, where no $\beta_j$ begins with $A$ and no $\alpha_i$ is empty. Replace them with
1. $A \to \beta_1 A' \mid \dots \mid \beta_n A'$,
2. $A' \to \alpha_1 A' \mid \dots \mid \alpha_m A' \mid \varepsilon$,

where $A'$ is a new nonterminal.
:::

Both versions generate the same strings: in the original, $A$ derives $\beta_j$ followed by any sequence of $\alpha$'s, $A \Rightarrow A\alpha_{i_k} \Rightarrow \dots \Rightarrow \beta_j \alpha_{i_1} \cdots \alpha_{i_k}$, and in the new grammar $A$ derives $\beta_j A'$ and $A'$ derives exactly the sequences $\alpha_{i_1}\cdots\alpha_{i_k}$. (Indirect left recursion, $A \Rightarrow B\alpha \Rightarrow A\beta\alpha$, is removed by first substituting productions to make it immediate; Aho, Lam, Sethi and Ullman give the general algorithm.) Applied to [[#eq-lr-grammar]]:

$$
\begin{aligned}
E &\to T\,E' & E' &\to +\,T\,E' \mid \varepsilon \\
T &\to F\,T' & T' &\to *\,F\,T' \mid \varepsilon \\
F &\to (\,E\,) \mid \mathrm{id}
\end{aligned}
$$ {#eq-ll-grammar}

This grammar can be parsed top-down, but notice the price: the parse tree of `a - b - c` in the new grammar leans to the *right* ($E'$ contains the rest of the expression), although subtraction associates to the left. Parsers for the transformed grammar therefore do not build the parse tree literally; they build the intended syntax tree directly. The usual trick is the one in the tiny compiler: implement $E \to T\,E'$ with $E' \to +\,T\,E' \mid \varepsilon$ as a *loop*, "parse a $T$; while the next token is `+`, consume it, parse another $T$ and combine it with what you have so far". The loop builds left-leaning trees. Extended BNF, which writes $E \to T\,(+\,T)^*$, says exactly this.

The second obstacle is two productions for the same nonterminal that begin alike:

$$
S \to \mathrm{id} = E\ ; \;\mid\; \mathrm{id}\ (\ E\ )\ ;
$$

An assignment and a call both begin with an identifier, so a parser that must choose on seeing `id` cannot. **Left factoring** moves the choice to the point where the alternatives differ: $S \to \mathrm{id}\ R$, $R \to {=}\ E\ ; \mid (\ E\ )\ ;$ — after `id`, the next token (`=` or `(`) decides.

## Predicting with FIRST and FOLLOW

To know when one token of look-ahead suffices, we need to know which tokens can begin the strings derived from each production. If the token after $A$ is in the set of tokens that can begin $\alpha$, and in no such set for $A$'s other productions, the parser should use $A \to \alpha$. Productions that can derive the empty string need a second set: the tokens that can come *after* $A$.

::: definition Nullable, FIRST and FOLLOW {#def-first-follow}
Let $G = (V, \Sigma, R, S)$ be a context-free grammar, and add an end marker $\$ \notin \Sigma$. For a string $\alpha$ of grammar symbols:
- $\alpha$ is **nullable** if $\alpha \Rightarrow^* \varepsilon$;
- $\mathrm{FIRST}(\alpha) = \set{a \in \Sigma : \alpha \Rightarrow^* a\beta \text{ for some } \beta}$, the terminals that can begin a string derived from $\alpha$.

For a nonterminal $A$,
- $\mathrm{FOLLOW}(A) = \set{a \in \Sigma \cup \set{\$} : S\$ \Rightarrow^* \beta A a \gamma \text{ for some } \beta, \gamma}$, the terminals that can come immediately after $A$ in some sentential form (with $\$$ in $\mathrm{FOLLOW}(S)$).
:::

These sets are defined by derivations, which are infinite in number, but they satisfy simple equations:

1. A terminal is not nullable and $\mathrm{FIRST}(a) = \set{a}$; $\varepsilon$ is nullable, with $\mathrm{FIRST}(\varepsilon) = \emptyset$.
2. $X_1 \cdots X_k$ is nullable iff every $X_i$ is; $\mathrm{FIRST}(X_1 \cdots X_k) = \mathrm{FIRST}(X_1) \cup \dots \cup \mathrm{FIRST}(X_j)$ where $X_j$ is the first non-nullable symbol (or $j = k$ if all are nullable).
3. A nonterminal $A$ is nullable iff some production $A \to \alpha$ has $\alpha$ nullable, and $\mathrm{FIRST}(A) = \bigcup_{A \to \alpha} \mathrm{FIRST}(\alpha)$.
4. $\$ \in \mathrm{FOLLOW}(S)$; and for every production $A \to \alpha B \beta$: $\mathrm{FIRST}(\beta) \subseteq \mathrm{FOLLOW}(B)$, and if $\beta$ is nullable, $\mathrm{FOLLOW}(A) \subseteq \mathrm{FOLLOW}(B)$.

The equations are recursive ($\mathrm{FIRST}(E)$ is defined in terms of $\mathrm{FIRST}(T)$, which may mention $\mathrm{FIRST}(E)$ again), so we solve them by iteration: start with everything empty and apply the rules until nothing changes.

```python
def grammar(text):
    """'A -> x B | ε' lines -> list of (A, [symbols]); first lhs is the start."""
    prods = []
    for line in text.strip().split("\n"):
        lhs, rhs = line.split("->")
        for alt in rhs.split("|"):
            prods.append((lhs.strip(), [s for s in alt.split() if s != "ε"]))
    return prods

def first_follow(prods):
    nts = {a for a, _ in prods}
    nullable, first = set(), {a: set() for a in nts}
    follow = {a: set() for a in nts}
    follow[prods[0][0]].add("$")
    def first_seq(seq):                 # FIRST of a string of symbols, and is it nullable?
        out = set()
        for x in seq:
            if x not in nts: out.add(x); return out, False
            out |= first[x]
            if x not in nullable: return out, False
        return out, True
    changed = True
    while changed:                      # iterate to the least fixed point
        changed = False
        for a, rhs in prods:
            f, nul = first_seq(rhs)
            if nul and a not in nullable: nullable.add(a); changed = True
            if not f <= first[a]: first[a] |= f; changed = True
            for i, x in enumerate(rhs):
                if x in nts:
                    f, nul = first_seq(rhs[i + 1:])
                    new = f | (follow[a] if nul else set())
                    if not new <= follow[x]: follow[x] |= new; changed = True
    return nullable, first, follow, first_seq
```

::: theorem The iteration computes nullable, FIRST and FOLLOW {#thm-ff-fixpoint}
`first_follow` terminates after at most $1 + \lvert V\rvert(1 + \lvert\Sigma\rvert + \lvert \Sigma\rvert + 1)$ rounds of the `while` loop, and on termination its sets are exactly those of [[#def-first-follow]].
:::

::: proof
*Termination.* The sets only grow, and each round that does not stop adds at least one element to one of them. There are $\lvert V\rvert$ possible nullable nonterminals, at most $\lvert V\rvert \lvert \Sigma \rvert$ elements of the FIRST sets and $\lvert V\rvert(\lvert\Sigma\rvert + 1)$ of the FOLLOW sets; one more round detects that nothing changes.

*Soundness: everything added is correct.* By induction on the order in which elements are added: each addition is justified by a production and by elements already present, which by the induction hypothesis are correct, and the rules 1–4 above are valid consequences of the definitions. For example, if $A \to \alpha B \beta$, $\beta$ is nullable and $a \in \mathrm{FOLLOW}(A)$, then $S\$ \Rightarrow^* \gamma A a \delta \Rightarrow \gamma \alpha B \beta a \delta \Rightarrow^* \gamma\alpha B a \delta$, so $a \in \mathrm{FOLLOW}(B)$.

*Completeness: everything correct is added.* We show, for instance, that if $A \Rightarrow^n a\beta$ then $a$ ends up in `first[A]`, by induction on the length $n$ of a leftmost derivation. Its first step uses some $A \to X_1 \cdots X_k$, and $a$ comes from some $X_j$ with $X_1, \dots, X_{j-1}$ deriving $\varepsilon$ and $X_j \Rightarrow^{<n} a\beta'$ (or $X_j = a$). By the induction hypotheses (for nullable, proved the same way, and for FIRST) the final sets record that $X_1, \dots, X_{j-1}$ are nullable and $a \in$ `first[X_j]`; so in the last round, which changes nothing, `first_seq` returns a set containing $a$ for this production, and $a$ must already be in `first[A]`. Nullable and FOLLOW are handled the same way, by induction on derivations: at termination the sets satisfy every equation, and the sets defined by derivations are the *least* sets that do.
:::

The iteration is our first example of a pattern that runs through the whole course: a set of recursive equations over finite sets, solved by starting from the smallest possible values and applying the equations until a **fixed point** is reached. [[compilers/dataflow-optimisation]] develops the general theory — lattices, monotone functions and the guarantee of termination — for program analysis.

::: example FIRST and FOLLOW for the expression grammar {#ex-ff}
Compute nullable, FIRST and FOLLOW for [[#eq-ll-grammar]].
::: solution
*Nullable:* $E'$ and $T'$ (each has an $\varepsilon$-production); $E$, $T$, $F$ are not, since each production for them starts with a non-nullable symbol.

*FIRST:* $\mathrm{FIRST}(F) = \set{(, \mathrm{id}}$. $T \to F T'$ and $F$ is not nullable, so $\mathrm{FIRST}(T) = \mathrm{FIRST}(F)$; likewise $\mathrm{FIRST}(E) = \mathrm{FIRST}(T) = \set{(, \mathrm{id}}$. $\mathrm{FIRST}(E') = \set{+}$, $\mathrm{FIRST}(T') = \set{*}$.

*FOLLOW:* $\$ \in \mathrm{FOLLOW}(E)$, and $F \to (E)$ puts $)$ in it: $\mathrm{FOLLOW}(E) = \set{), \$}$. $E \to T E'$ with $E'$ at the end: $\mathrm{FOLLOW}(E') \supseteq \mathrm{FOLLOW}(E)$, and $E' \to +TE'$ adds nothing new, so $\mathrm{FOLLOW}(E') = \set{), \$}$. $T$ is followed by $E'$: $\mathrm{FIRST}(E') = \set{+}$, and since $E'$ is nullable also $\mathrm{FOLLOW}(E)$ and $\mathrm{FOLLOW}(E')$: $\mathrm{FOLLOW}(T) = \set{+, ), \$}$, and $\mathrm{FOLLOW}(T') = \mathrm{FOLLOW}(T)$. $F$ is followed by $T'$: $\mathrm{FOLLOW}(F) = \set{*} \cup \mathrm{FOLLOW}(T) = \set{*, +, ), \$}$. The program agrees:

```text
E   nullable=False FIRST=['(', 'id'] FOLLOW=['$', ')']
E'  nullable=True  FIRST=['+'] FOLLOW=['$', ')']
T   nullable=False FIRST=['(', 'id'] FOLLOW=['$', ')', '+']
T'  nullable=True  FIRST=['*'] FOLLOW=['$', ')', '+']
F   nullable=False FIRST=['(', 'id'] FOLLOW=['$', ')', '*', '+']
```
:::
:::

## LL(1) grammars and the parsing table

::: definition LL(1) parsing table and LL(1) grammar {#def-ll1}
The **LL(1) table** $M$ of a grammar has a row for each nonterminal and a column for each terminal and $\$$. For each production $A \to \alpha$, put it in $M[A, a]$ for every $a \in \mathrm{FIRST}(\alpha)$, and, if $\alpha$ is nullable, also for every $a \in \mathrm{FOLLOW}(A)$. The grammar is **LL(1)** if no entry receives two productions. ("LL(1)": the input is read **L**eft to right, a **L**eftmost derivation is produced, with **1** token of look-ahead.)
:::

Equivalently, $G$ is LL(1) if and only if for any two distinct productions $A \to \alpha$ and $A \to \beta$: (i) $\mathrm{FIRST}(\alpha) \cap \mathrm{FIRST}(\beta) = \emptyset$; (ii) at most one of $\alpha$, $\beta$ is nullable; and (iii) if $\beta$ is nullable, $\mathrm{FIRST}(\alpha) \cap \mathrm{FOLLOW}(A) = \emptyset$. Each condition rules out one way of filling an entry twice.

```python
def ll1_table(prods):
    nullable, first, follow, first_seq = first_follow(prods)
    table, conflicts = {}, []
    for i, (a, rhs) in enumerate(prods):
        f, nul = first_seq(rhs)
        for t in f | (follow[a] if nul else set()):
            if (a, t) in table:
                conflicts.append((a, t, table[a, t], i))
            table.setdefault((a, t), i)
    return table, conflicts
```

For [[#eq-ll-grammar]], numbering the productions $0{:}\ E \to TE'$, $1{:}\ E' \to +TE'$, $2{:}\ E' \to \varepsilon$, $3{:}\ T \to FT'$, $4{:}\ T' \to *FT'$, $5{:}\ T' \to \varepsilon$, $6{:}\ F \to (E)$, $7{:}\ F \to \mathrm{id}$, the program reports no conflicts and the table (– for an error entry):

| | `id` | `+` | `*` | `(` | `)` | `$` |
|---|---|---|---|---|---|---|
| $E$ | 0 | – | – | 0 | – | – |
| $E'$ | – | 1 | – | – | 2 | 2 |
| $T$ | 3 | – | – | 3 | – | – |
| $T'$ | – | 5 | 4 | – | 5 | 5 |
| $F$ | 7 | – | – | 6 | – | – |

The ε-productions are placed by FOLLOW: $T' \to \varepsilon$ is chosen when the next token is `+`, `)` or `$` — tokens that can follow a term — which is how the parser knows that a product has ended.

A table can drive a parser without any recursion: keep the predicted but not yet matched part of the sentential form on an explicit stack. This is a deterministic pushdown automaton, in fact the one of [[theory-of-computation/pushdown-automata#thm-cfg-to-pda]] with its guesses replaced by table look-ups.

::: algorithm Table-driven LL(1) parsing {#alg-ll1}
Stack $\gets [\$, S]$ (top at the right); append $\$$ to the input. Repeat, with $X$ the top of the stack and $a$ the current token:
1. If $X$ is a terminal or $\$$: if $X = a$, pop and advance (if $X = \$$, accept); otherwise report an error.
2. If $X$ is a nonterminal: if $M[X, a]$ holds $X \to Y_1 \cdots Y_k$, pop $X$, push $Y_k, \dots, Y_1$ (so $Y_1$ is on top) and output the production; otherwise report an error.
:::

```python
def ll1_parse(prods, tokens, trace=False):
    table, _ = ll1_table(prods)
    nts = {a for a, _ in prods}
    stack, toks, pos, out = ["$", prods[0][0]], tokens + ["$"], 0, []
    while stack:
        top, look = stack[-1], toks[pos]
        if trace: print(f"{' '.join(stack):<22}{' '.join(toks[pos:]):<22}", end="")
        if top not in nts:              # terminal or $: must match the input
            if top != look: raise SyntaxError(f"expected {top}, found {look}")
            stack.pop(); pos += 1
            if trace: print("match", look if look != "$" else "(accept)")
        elif (top, look) in table:      # expand by the predicted production
            i = table[top, look]; a, rhs = prods[i]
            stack.pop(); stack.extend(reversed(rhs)); out.append(i)
            if trace: print(a, "->", " ".join(rhs) or "ε")
        else:
            raise SyntaxError(f"unexpected {look} while expanding {top}")
    return out                          # the leftmost derivation, as production numbers
```

::: example Tracing the LL(1) parser {#ex-ll1-trace}
Parse `id + id * id` with the table above, showing the stack, the remaining input and the action at every step.
::: solution
```text
$ E                   id + id * id $        E -> T E'
$ E' T                id + id * id $        T -> F T'
$ E' T' F             id + id * id $        F -> id
$ E' T' id            id + id * id $        match id
$ E' T'               + id * id $           T' -> ε
$ E'                  + id * id $           E' -> + T E'
$ E' T +              + id * id $           match +
$ E' T                id * id $             T -> F T'
$ E' T' F             id * id $             F -> id
$ E' T' id            id * id $             match id
$ E' T'               * id $                T' -> * F T'
$ E' T' F *           * id $                match *
$ E' T' F             id $                  F -> id
$ E' T' id            id $                  match id
$ E' T'               $                     T' -> ε
$ E'                  $                     E' -> ε
$                     $                     match (accept)
```

Read the expansions from top to bottom and you have the leftmost derivation $E \Rightarrow TE' \Rightarrow FT'E' \Rightarrow \mathrm{id}\,T'E' \Rightarrow \mathrm{id}\,E' \Rightarrow \mathrm{id} + TE' \Rightarrow \cdots$. Two moments show the look-ahead at work: in row 5, $T'$ faces `+`, which is in $\mathrm{FOLLOW}(T')$, so the first term ends; in row 11, $T'$ faces `*`, so the second term continues. The parser makes 17 moves for 5 tokens. On `id + * id` it stops with `SyntaxError: unexpected * while expanding T` — the earliest point at which the input cannot be the beginning of any expression.
:::
:::

::: widget graph
nodes: E@3,0; T1@1,1; Ep1@5,1; F1@0,2; Tp1@2,2; plus@4,2; T2@5,2; Ep2@6,2; id1@0,3; F2@4,3; Tp2@6,3; id2@4,4; times@5,4; F3@6,4; Tp3@7,4; id3@6,5
edges: E>T1; E>Ep1; T1>F1; T1>Tp1; F1>id1; Ep1>plus; Ep1>T2; Ep1>Ep2; T2>F2; T2>Tp2; F2>id2; Tp2>times; Tp2>F3; Tp2>Tp3; F3>id3
algorithm: dfs
start: E
caption: The parse tree built by the trace of [[#ex-ll1-trace]] (`Ep` is $E'$, `Tp` is $T'$; leaves `Tp1`, `Ep2` and `Tp3` derive $\varepsilon$). Step through the depth-first search: the order in which it *discovers* the interior vertices is the order in which the LL(1) parser expanded them — a top-down parser builds the tree in pre-order, deciding about each vertex before seeing any of the input below it. Notice how the tree leans right: the second operand of `+` hangs from $E'$, the reason why practical parsers build syntax trees directly rather than these parse trees.
:::

::: theorem Correctness of LL(1) parsing {#thm-ll1-correct}
Let $G$ be an LL(1) grammar. On every input $w$, [[#alg-ll1]] terminates; it accepts if and only if $w \in L(G)$, and in that case the sequence of productions it outputs is the leftmost derivation of $w$.
:::

::: proof
*Invariant.* At each step, let $u$ be the input matched so far and $\gamma$ the stack read from top to bottom without $\$$. Then $S \Rightarrow^*_{\mathrm{lm}} u\gamma$ by the productions output so far, in order. Initially $u = \varepsilon$ and $\gamma = S$. A match step moves a terminal from the front of $\gamma$ to the end of $u$; an expansion replaces the leftmost symbol of $\gamma$ — which is the leftmost nonterminal of $u\gamma$, since $u$ consists of terminals — by a right-hand side, which is one leftmost derivation step. So the invariant holds, and if the parser accepts, $u = w$, $\gamma = \varepsilon$ and $S \Rightarrow^*_{\mathrm{lm}} w$.

*Completeness.* Suppose $w \in L(G)$ with leftmost derivation $S = \alpha_0 \Rightarrow \alpha_1 \Rightarrow \dots \Rightarrow \alpha_n = w$. We show that the parser follows it. Suppose the parser is in a state with $u\gamma = \alpha_i$, where $u$ is a prefix of $w$ (initially true). If $\gamma$ begins with a terminal, it is the next symbol of $w$ (as $\alpha_i \Rightarrow^* w$ only rewrites nonterminals), so the parser matches. If $\gamma = A\gamma'$, the derivation's next step uses some $A \to \beta$, and $w = u x$ with $\beta\gamma' \Rightarrow^* x$. Let $a$ be the first symbol of $x\$$. Either $a \in \mathrm{FIRST}(\beta)$, or $\beta \Rightarrow^* \varepsilon$ and $a$ comes from $\gamma'$ or is $\$$, so $a \in \mathrm{FOLLOW}(A)$. Either way $A \to \beta$ is in $M[A, a]$ — and because $G$ is LL(1), it is the *only* production there. So the parser makes exactly the derivation's step. By induction it reproduces the whole derivation and accepts.

*Termination.* Each match consumes a token, so it suffices to show that the parser cannot make infinitely many expansions in a row. Suppose it did, after some last match. The expansions build parse-tree nodes below the finitely many symbols on the stack at that moment, so below one of them infinitely many nodes are built; each node has at most $r$ children ($r$ the longest right-hand side), so by König's lemma there is an infinite path $X_0, X_1, X_2, \dots$ of nonterminals, each a child of the previous one. Since no terminal is matched, every sibling to the left of $X_{i+1}$ has been expanded completely into $\varepsilon$: $X_i \to \alpha X_{i+1}\beta$ with $\alpha$ nullable. Some nonterminal $A$ repeats on the path, giving $A \Rightarrow^+ \alpha' A \beta' \Rightarrow^* A\beta'$, so $A$ is left-recursive — impossible in an LL(1) grammar by [[#thm-ll1-unamb]] (whose proof does not use termination).
:::

::: theorem LL(1) grammars are unambiguous and not left-recursive {#thm-ll1-unamb}
An LL(1) grammar in which every nonterminal is reachable from $S$ and derives at least one terminal string is unambiguous and has no left-recursive nonterminal.
:::

::: proof
*Unambiguous.* The completeness argument above shows that for every $w \in L(G)$, *each* leftmost derivation of $w$ is the one the deterministic parser follows. So $w$ has only one leftmost derivation, that is, one parse tree.

*Not left-recursive.* Suppose $A \Rightarrow^+ A\alpha$. All symbols are useful, so there are terminal strings with $S \Rightarrow^* uA\beta$, $\beta \Rightarrow^* v$, $A \Rightarrow^* x$ and $\alpha \Rightarrow^* y$. Then for every $k \ge 0$,
$$
S \Rightarrow^* uA\beta \Rightarrow^+ uA\alpha^k\beta \Rightarrow^* u\,x\,y^k\,v ,
$$
and in this leftmost derivation the occurrence of $A$ after $u$ is rewritten at least $k$ times, staying at the front, before the first terminal after $u$ is produced. If $x = y = \varepsilon$, the string $uv$ has two different parse trees (with $k = 0$ and $k = 1$), contradicting unambiguity. Otherwise the first terminal after $u$ is the same symbol $a$ for all $k \ge 1$ (the first symbol of $x$, or of $y$ if $x = \varepsilon$). By uniqueness, the derivation above *is* the one the parser follows on $u x y^k v$, so after matching $u$ the parser, with $A\beta$ on the stack and look-ahead $a$, makes at least $k$ expansions before its next match. But the parser is deterministic: its moves from that configuration until the next match depend only on the stack and on $a$, not on $k$, and there are finitely many of them (it does reach a match, since it accepts). Choosing $k$ larger than that number gives a contradiction.
:::

The ambiguous grammar $E \to E + E \mid E * E \mid \mathrm{id}$ is therefore not LL(1), and neither is the left-recursive [[#eq-lr-grammar]]: our program reports four conflicts for it, $(E, \mathrm{id})$, $(E, ()$, $(T, \mathrm{id})$ and $(T, ()$, each between the left-recursive production and the other one.

::: quiz
For the grammar $S \to \mathrm{id} = E\,; \mid \mathrm{id}\,(\,E\,)\,;$ with $E \to \mathrm{id} \mid \mathrm{num}$, how many entries of the LL(1) table are multiply defined, and what fixes it?
- [ ] none; the grammar is LL(1)
- [x] one, $M[S, \mathrm{id}]$; left factoring $S \to \mathrm{id}\,R$
- [ ] two, $M[S, \mathrm{id}]$ and $M[E, \mathrm{id}]$; removing left recursion
- [ ] the grammar is ambiguous, so no transformation can make it LL(1)
::: solution
Both $S$-productions have $\mathrm{FIRST} = \set{\mathrm{id}}$, so they collide in $M[S, \mathrm{id}]$; $E$'s productions begin with different tokens. The grammar is unambiguous and not left-recursive; it just needs two tokens of look-ahead. Left factoring into $S \to \mathrm{id}\ R$, $R \to {=}\ E\,; \mid (\ E\ )\,;$ gives an LL(1) grammar — the program reports `[('S', 'id', 0, 1)]` before and `[]` after.
:::
:::

### The dangling else

Some conflicts cannot be removed by transformation, because the language itself is ambiguous as described. The classic example is the optional `else`:

$$
S \to \mathbf{if}\ E\ \mathbf{then}\ S\ S' \mid \mathrm{other} \qquad S' \to \mathbf{else}\ S \mid \varepsilon \qquad E \to b
$$

In `if b then if b then other else other`, the `else` may belong to either `if`. The table shows it: $\mathbf{else} \in \mathrm{FIRST}(\mathbf{else}\ S)$ and $\mathbf{else} \in \mathrm{FOLLOW}(S')$ (because an $S'$ can end an inner statement that is followed by the outer `else`), so $M[S', \mathbf{else}]$ holds both productions. Our program reports exactly one conflict, `("S'", 'else', 2, 3)`. Every language with this construct resolves it the same way: an `else` belongs to the nearest unmatched `if`. In the parser that means: in the conflicting entry, choose $S' \to \mathbf{else}\ S$. The resulting parser is deterministic and implements the rule. (A grammar that encodes the rule without any conflict exists — separate "matched" and "unmatched" statements — but it is clumsy, and it is not LL(1) either. Languages such as Go, Rust and Swift avoid the issue by requiring braces.)

::: example The dangling else resolved {#ex-dangling}
Build the LL(1) parser for the `if` grammar above, resolving the conflict in favour of $S' \to \mathbf{else}\ S$, and trace it on `if b then if b then other else other`. To which `if` does the `else` attach?
::: solution
`ll1_table` keeps the first production entered into a conflicting entry, which is $S' \to \mathbf{else}\ S$ (it comes first in the grammar), so `ll1_parse` implements the resolution as it stands:

```text
$ S                   if b then if b then other else other $  S -> if E then S S'
$ S' S then E if      if b then if b then other else other $  match if
$ S' S then E         b then if b then other else other $     E -> b
$ S' S then b         b then if b then other else other $     match b
$ S' S then           then if b then other else other $       match then
$ S' S                if b then other else other $            S -> if E then S S'
$ S' S' S then E if   if b then other else other $            match if
$ S' S' S then E      b then other else other $               E -> b
$ S' S' S then b      b then other else other $               match b
$ S' S' S then        then other else other $                 match then
$ S' S' S             other else other $                      S -> other
$ S' S' other         other else other $                      match other
$ S' S'               else other $                            S' -> else S
$ S' S else           else other $                            match else
$ S' S                other $                                 S -> other
$ S' other            other $                                 match other
$ S'                  $                                       S' -> ε
$                     $                                       match (accept)
```

The decisive row is the one where $S'$ faces `else` with *two* $S'$ symbols on the stack: the upper one belongs to the inner `if` (pushed second), and the parser expands it with $S' \to \mathbf{else}\ S$. So the `else` attaches to the inner `if`, as the nearest-`if` rule requires; the outer `if`'s $S'$ later meets `$` and derives $\varepsilon$. Had we preferred $S' \to \varepsilon$, the inner $S'$ would vanish, and the outer one would take the `else` — the other reading.
:::
:::

## Recursive descent in practice

Production compilers rarely use LL(1) tables. GCC's C and C++ front ends and Clang's are **hand-written recursive-descent parsers**, as are those of Go, Rust, Swift, TypeScript and most JavaScript engines. (GCC replaced its Bison-generated C++ parser with a hand-written one in version 3.4 in 2004, and its C parser in version 4.1 in 2006.) The FIRST and FOLLOW sets are still there, as the `if` and `switch` statements that choose what to parse next, but hand-written code has three advantages: it can use more look-ahead or semantic information where a construct needs it, it can produce excellent error messages and recover from errors gracefully, and it is ordinary code that anyone can debug.

Expressions are parsed with a technique that handles all binary operators with one function and a precedence table, instead of one grammar layer per precedence level. Mini has thirteen binary operators at six levels of precedence; with layering it would need six mutually recursive functions.

::: algorithm Precedence climbing {#alg-precedence}
`expr(p)` parses the longest expression whose top-level binary operators all have precedence at least $p$:
1. $\mathit{left} \gets$ `unary()` (an operand, possibly with prefix operators).
2. While the next token is a binary operator $\mathit{op}$ with $\mathrm{prec}(\mathit{op}) \ge p$:
    1. consume $\mathit{op}$;
    2. $\mathit{right} \gets$ `expr(prec(op) + 1)` for a left-associative $\mathit{op}$ (or `expr(prec(op))` for a right-associative one);
    3. $\mathit{left} \gets (\mathit{op}, \mathit{left}, \mathit{right})$.
3. Return $\mathit{left}$. The whole expression is `expr(1)`.
:::

The recursive call with $\mathrm{prec}(\mathit{op}) + 1$ stops at the next operator of equal or lower precedence, which is then picked up by the loop one level out — that is what makes `8 - 3 - 2` group as `(8 - 3) - 2`. For Mini (whose lexer is that of [[compilers/lexical-analysis#ex-scan-mini]]):

```python
BINARY = {"||": 1, "&&": 2, "==": 3, "!=": 3, "<": 4, "<=": 4, ">": 4, ">=": 4,
          "+": 5, "-": 5, "*": 6, "/": 6, "%": 6}     # all left-associative

class Parser:
    def __init__(self, text):
        self.toks = list(scan(DFA, text))
        self.toks.append(("EOF", "end of input", self.toks[-1][2] if self.toks else 1))
        self.pos = 0
    def peek(self): return self.toks[self.pos][1] if self.toks[self.pos][0] == "OP" else None
    def next(self): self.pos += 1; return self.toks[self.pos - 1]
    def expect(self, lexeme):
        kind, lex, line = self.next()
        if lex != lexeme: raise SyntaxError(f"line {line}: expected {lexeme!r}, found {lex!r}")

    def expr(self, min_prec=1):        # precedence climbing
        left = self.unary()
        while (op := self.peek()) in BINARY and BINARY[op] >= min_prec:
            self.next()
            right = self.expr(BINARY[op] + 1)   # +1: left associativity
            left = (op, left, right)
        return left
```

Operands are numbers, `true` and `false`, variables, calls `f(a, b)` and parenthesised expressions, possibly preceded by unary `-` or `!`. The choice between a variable and a call is made by looking at the token *after* the identifier — one token of extra look-ahead, which a hand-written parser takes without fuss.

```python
    def unary(self):
        if self.peek() in ("-", "!"):
            op = self.next()[1]; return (op, self.unary())
        return self.primary()
    def primary(self):
        kind, lex, line = self.next()
        if kind == "NUM": return int(lex)
        if kind in ("TRUE", "FALSE"): return kind == "TRUE"
        if kind == "ID":
            if self.peek() != "(": return lex
            self.next(); args = []
            while self.peek() != ")":
                args.append(self.expr())
                if self.peek() != ")": self.expect(",")
            self.next(); return ("call", lex, args)
        if lex == "(":
            e = self.expr(); self.expect(")"); return e
        raise SyntaxError(f"line {line}: unexpected {lex!r}")
```

::: example Precedence climbing at work {#ex-climb}
Parse `a + b * c - d`, `x < y + 1 && !done || f(a, b - 1) == 0`, `8 - 3 - 2`, `-(a + b) * c` and the faulty `(a + b * c`.
::: solution
```text
('-', ('+', 'a', ('*', 'b', 'c')), 'd')
('||', ('&&', ('<', 'x', ('+', 'y', 1)), ('!', 'done')), ('==', ('call', 'f', ['a', ('-', 'b', 1)]), 0))
('-', ('-', 8, 3), 2)
('*', ('-', ('+', 'a', 'b')), 'c')
SyntaxError: line 1: expected ')', found 'end of input'
```

Follow the first one. `expr(1)` reads `a`, sees `+` (precedence 5), and calls `expr(6)` for the right operand. That call reads `b`, sees `*` (precedence $6 \ge 6$), calls `expr(7)` which returns `c`, builds `b * c`, then sees `-` with precedence $5 < 6$ and returns. Back at the outer level, the tree is `a + (b * c)`; the loop sees `-` (precedence $5 \ge 1$), parses `d` with `expr(6)` and builds `(a + b*c) - d`. In the second expression the comparison binds tighter than `&&`, which binds tighter than `||`, as in C. The error is reported at the first token where the parser knew something was wrong.
:::
:::

::: warning Precedence is not the same as evaluation order
A frequent misreading is that precedence says what is computed first. It does not: it says how the expression is *grouped* into a tree. In `f() + g() * h()`, the grouping is `f() + (g() * h())`, but C does not say whether `f` is called before or after `g` and `h` — the compiler may choose — whereas Java and Python require left to right. Associativity is also about grouping, not timing. Evaluation order is a separate rule of the language's semantics, implemented later by the code generator ([[compilers/compiler-structure#thm-gen-correct]] chose right-to-left for operands).
:::

### Error recovery

A compiler that stops at the first syntax error is annoying; one that reports a hundred spurious errors after the first is worse. The simplest robust strategy is **panic-mode recovery**: when the procedure for a construct detects an error, it reports it and then skips tokens until it finds one in a **synchronising set** — typically tokens in FOLLOW of the construct and tokens that start a new statement or close a block (`;`, `}`) — and then carries on as if the construct had been parsed. For statements in C-like languages, skipping to the next `;` or `}` works well: the parser resynchronises at the next statement and the following errors it reports are usually real. Hand-written parsers add specific repairs for common mistakes ("expected `;` after expression" — insert it and continue), which is one reason compiler writers prefer them.

::: widget graph
nodes: E@0,0; T@2,0; F@4,0; A@0,2; B@2,2
edges: E>E; E>T; T>T; T>F; A>B; B>A
algorithm: topo
caption: The **left-corner graph** of two grammars: an edge $X \to Y$ means some production $X \to \alpha Y \beta$ has $\alpha$ nullable, so $Y$ can appear at the left end of what $X$ derives. Top: the left-recursive grammar [[#eq-lr-grammar]], where $E \to E+T \mid T$ and $T \to T*F \mid F$ give loops at $E$ and $T$. Bottom: $A \to B\,a \mid c$, $B \to A\,b \mid d$, whose left recursion is indirect. A nonterminal is left-recursive exactly when it lies on a cycle of this graph. Run the topological sort: it gets stuck, because every remaining vertex lies on a cycle or depends on one. For the transformed grammar [[#eq-ll-grammar]] the graph has only the edges $E \to T \to F$, and the sort succeeds — which is also the order in which FIRST sets can be computed in a single sweep.
:::

::: history
Recursive descent is as old as compiling with grammars: Peter Lucas described a recursive-descent parser for ALGOL 60 in 1961, and Edgar Irons's syntax-directed ALGOL compiler (1961) and Melvin Conway's design of a separable transition-diagram compiler (1963) explored related ideas. Philip Lewis and Richard Stearns defined LL($k$) grammars in "Syntax-directed transduction" (*Journal of the ACM*, 1968), and Donald Knuth's "Top-down syntax analysis" (1971) developed their theory. Niklaus Wirth's Pascal compilers (from 1970) made hand-written recursive descent the standard for languages designed to be easy to parse. Vaughan Pratt's "Top down operator precedence" (POPL 1973) introduced the operator-driven parsing that, in the form of precedence climbing (described by Keith Clarke in 1986), handles expressions in most hand-written parsers today. Terence Parr's ANTLR generator (from 1989) brought generated LL parsers back into wide use; its LL(*) (2011) and ALL(*) (2014, with Sam Harwell and Kathleen Fisher) strategies decide between productions with arbitrarily long look-ahead.
:::

## Where this leads

LL(1) parsing decides which production to use at the *start* of a construct, from one token. [[compilers/bottom-up-parsing]] postpones the decision to the *end*, when the whole right-hand side has been seen; this handles left-recursive grammars directly and a strictly larger class of grammars, at the cost of parsers that are generated rather than written by hand. [[compilers/semantic-analysis]] completes the recursive-descent parser for Mini with statements and functions and builds abstract syntax trees from it.

::: summary
- Top-down parsers build the parse tree from the root, choosing each production from the next token. Recursive descent has one procedure per nonterminal.
- **Left recursion** makes top-down parsing loop; it is removed by rewriting $A \to A\alpha \mid \beta$ as $A \to \beta A'$, $A' \to \alpha A' \mid \varepsilon$ ([[#alg-left-rec]]), or implemented as a loop. **Left factoring** delays a choice until the alternatives differ.
- **Nullable**, **FIRST** and **FOLLOW** ([[#def-first-follow]]) are the least solution of recursive set equations, computed by iterating to a fixed point ([[#thm-ff-fixpoint]]).
- A grammar is **LL(1)** if its table, filled from FIRST and (for nullable productions) FOLLOW, has no conflicts ([[#def-ll1]]); the table drives a linear-time parser that outputs the leftmost derivation ([[#alg-ll1]], [[#thm-ll1-correct]]).
- LL(1) grammars are unambiguous and not left-recursive ([[#thm-ll1-unamb]]); the dangling-else conflict is resolved by preferring the `else` production.
- Real compilers use hand-written recursive descent, with **precedence climbing** for expressions ([[#alg-precedence]]) and panic-mode recovery at synchronising tokens. Precedence determines grouping, not evaluation order.
:::

## Exercises

::: exercise FIRST and FOLLOW by hand {level=1}
For the grammar $S \to A\,B\,c$, $A \to a\,A \mid \varepsilon$, $B \to b \mid \varepsilon$, compute nullable, FIRST and FOLLOW for every nonterminal, and the LL(1) table. Is the grammar LL(1)?
::: solution
Nullable: $A$, $B$ (not $S$, because of $c$). $\mathrm{FIRST}(A) = \set{a}$, $\mathrm{FIRST}(B) = \set{b}$, $\mathrm{FIRST}(S) = \set{a, b, c}$ (both $A$ and $B$ may vanish). $\mathrm{FOLLOW}(S) = \set{\$}$, $\mathrm{FOLLOW}(A) = \mathrm{FIRST}(Bc) = \set{b, c}$, $\mathrm{FOLLOW}(B) = \set{c}$. Table: $M[S, a] = M[S, b] = M[S, c] = S \to ABc$; $M[A, a] = A \to aA$; $M[A, b] = M[A, c] = A \to \varepsilon$; $M[B, b] = B \to b$; $M[B, c] = B \to \varepsilon$. No entry is doubly defined, so the grammar is LL(1). `first_follow` gives the same sets.
:::
:::

::: exercise Counting table entries {level=1 check="13"}
How many entries of the LL(1) table for [[#eq-ll-grammar]] contain a production (are not error entries)? (Enter the number.)
::: solution
From the table: $E$ has 2, $E'$ has 3, $T$ has 2, $T'$ has 4 and $F$ has 2, a total of $13$ of the $5 \times 6 = 30$ entries. The other 17 are errors, which is why tables are stored compressed.
:::
:::

::: exercise Removing left recursion {level=1}
Remove the left recursion from $A \to A\,a \mid A\,b \mid c \mid d$ using [[#alg-left-rec]], and check that both grammars generate $(c \mid d)(a \mid b)^*$. Then write the corresponding recursive-descent procedure as a loop that builds a left-leaning tree.
::: solution
$A \to c\,A' \mid d\,A'$, $A' \to a\,A' \mid b\,A' \mid \varepsilon$. In the original, every derivation applies the left-recursive productions some number of times and finishes with $c$ or $d$, producing $(c \mid d)$ followed by a sequence of $a$'s and $b$'s; in the new grammar $A'$ derives exactly $(a \mid b)^*$. Procedure:

```python
def A():
    tok = advance()
    if tok not in ("c", "d"): raise SyntaxError(tok)
    tree = tok
    while peek() in ("a", "b"):
        tree = (tree, advance())      # left-leaning: ((c, a), b)
    return tree
```
:::
:::

::: exercise Is it LL(1)? {level=2}
Decide whether each grammar is LL(1); for each conflict give the table entry and the two productions, and transform the grammar into an LL(1) grammar for the same language if you can. (a) $S \to a\,S\,b \mid a\,b$. (b) $S \to A\,a \mid b$, $A \to b\,A \mid \varepsilon$. (c) $L \to L\,,\,\mathrm{id} \mid \mathrm{id}$.
::: solution
(a) Both productions start with $a$: conflict at $M[S, a]$. Left factor: $S \to a\,R$, $R \to S\,b \mid b$. Now $\mathrm{FIRST}(Sb) = \set{a}$ and $\mathrm{FIRST}(b) = \set{b}$: LL(1).

(b) $\mathrm{FIRST}(Aa) = \set{a, b}$ (since $A$ is nullable) and $\mathrm{FIRST}(b) = \set{b}$: conflict at $M[S, b]$. ($A$ itself is fine: $\mathrm{FOLLOW}(A) = \set{a}$ is disjoint from $\mathrm{FIRST}(bA)$.) The language is $\set{b^k a : k \ge 0} \cup \set{b}$. An LL(1) grammar for it: $S \to a \mid b\,R$, $R \to \varepsilon \mid a \mid b\,P$, $P \to b\,P \mid a$ — after the first $b$, either stop, or read $a$, or read more $b$'s that must end in $a$. Since $\mathrm{FOLLOW}(R) = \set{\$}$, the three $R$-productions are chosen by $\$$, $a$ and $b$; `ll1_table` reports one conflict, `[('S', 'b', 0, 1)]`, for the original grammar and none for this one.

(c) Left-recursive: conflict at $M[L, \mathrm{id}]$. Remove it: $L \to \mathrm{id}\,L'$, $L' \to ,\,\mathrm{id}\,L' \mid \varepsilon$, with $\mathrm{FOLLOW}(L') = \mathrm{FOLLOW}(L)$, which (for $L$ the start symbol) is $\set{\$}$, disjoint from $\set{,}$: LL(1).
:::
:::

::: exercise A right-associative operator {level=2}
Add an exponentiation operator `^` to the precedence-climbing parser, binding tighter than `*` and associating to the right, so that `2 ^ 3 ^ 2` means `2 ^ (3 ^ 2)`. Also decide, with a reason, how `-2 ^ 2` should parse, and make your parser do that.
::: solution
Give `^` precedence 7 and mark it right-associative; in the loop, recurse with `BINARY[op]` instead of `BINARY[op] + 1` for it:

```python
RIGHT = {"^"}
...
            right = self.expr(BINARY[op] + (0 if op in RIGHT else 1))
```

(and add `^` to the lexer's operator pattern). With precedence $7$ and a recursive call `expr(7)`, the inner call accepts another `^`, so `2 ^ 3 ^ 2` gives `('^', 2, ('^', 3, 2))`. In mathematics $-2^2 = -4$: exponentiation binds tighter than unary minus. In our parser, `unary` parses `-` and then calls `unary()` again, so it would give `(-2) ^ 2`. To follow the mathematical convention, let `unary` parse its operand with `self.expr(7)` (an expression containing only `^`): `-2 ^ 2` then becomes `('-', ('^', 2, 2))`. Python makes the same choice: `-2 ** 2 == -4`.
:::
:::

::: exercise Panic-mode recovery {level=2}
A statement parser for Mini handles `let x = e;`, `x = e;` and `return e;`. Write a `statements()` procedure that, when a `SyntaxError` is raised inside a statement, records the message, skips tokens up to and including the next `;` (or up to a `}` or the end of input), and continues. On the input `let x = 1 +; y = (2; return x;` how many errors are reported? Check that the recovery does not skip valid statements.
::: solution
```python
def statements(self):
    stmts, errors = [], []
    while self.toks[self.pos][0] != "EOF" and self.peek() != "}":
        try:
            stmts.append(self.statement())
        except SyntaxError as e:
            errors.append(str(e))
            while self.toks[self.pos][0] != "EOF" and self.peek() not in (";", "}"):
                self.pos += 1                 # skip to a synchronising token
            if self.peek() == ";": self.pos += 1
    return stmts, errors
```

There is a trap. With the parser exactly as in the text, the output is

```text
([('return', 'x')], ["line 1: unexpected ';'"])
```

— one error, and the statement `y = (2;` has silently disappeared. The reason: `primary` *consumed* the offending `;` (by calling `next`) before raising, so the recovery loop skipped forward to the *next* `;`, swallowing a whole statement. `expect` has the same flaw. Error-detecting code must leave the offending token in the input:

```python
def expect(self, lexeme):
    kind, lex, line = self.toks[self.pos]
    if lex != lexeme: raise SyntaxError(f"line {line}: expected {lexeme!r}, found {lex!r}")
    self.pos += 1
```

and in `primary` the final line becomes `self.pos -= 1; raise SyntaxError(…)`. Now the parser reports two errors, each at the right place, and still parses the third statement:

```text
([('return', 'x')], ["line 1: unexpected ';'", "line 1: expected ')', found ';'"])
```

The synchronising tokens are chosen from FOLLOW(statement) and the statement terminator.
:::
:::

::: exercise Termination of the FIRST/FOLLOW iteration {level=3}
(a) Show that in the worst case the `while` loop of `first_follow` needs a number of rounds that grows with the grammar, by constructing, for each $n$, a grammar on which it needs at least $n$ rounds when the productions are processed in the order given. (b) Explain how to compute FIRST in a single pass over the nonterminals when the left-corner graph (see the figure) is acyclic, and in linear time in general by computing strongly connected components.
::: solution
(a) Take $A_1 \to A_2$, $A_2 \to A_3$, …, $A_{n-1} \to A_n$, $A_n \to a$, listed in this order. In round 1, only $A_n$ receives $a$ (when its production is processed, the earlier ones have already been processed with empty sets). In round 2, $A_{n-1}$ receives it, and so on: $A_1$ gets $a$ in round $n$, and round $n + 1$ detects that nothing changed. (Processing the productions in reverse order would need only two rounds — the order matters, a point we return to with worklists in [[compilers/dataflow-optimisation]].)

(b) $\mathrm{FIRST}(X)$ is the union of the terminals at the left corners of $X$'s productions and of $\mathrm{FIRST}(Y)$ for each left-corner edge $X \to Y$. If the graph is acyclic, process the nonterminals in reverse topological order (sinks first): when $X$ is processed, all $\mathrm{FIRST}(Y)$ it needs are final, so one pass suffices. In general, all nonterminals in one strongly connected component have the same FIRST set (each is a left corner of each other's derivations), so compute the components (Tarjan's or Kosaraju's algorithm), give each component the union of the terminals directly at left corners of its members, and propagate along the acyclic graph of components in reverse topological order. With the sets stored as bit vectors the total time is $O((\lvert V\rvert + \lvert R\rvert)\,\lvert \Sigma \rvert / w)$ for word size $w$. The same method computes FOLLOW, using the graph of rule 4 ($A \to B$ when $\mathrm{FOLLOW}(A) \subseteq \mathrm{FOLLOW}(B)$).
:::
:::

::: exercise Correctness of precedence climbing {level=3}
Consider expressions over operands $x$ and left-associative binary operators with precedences in $\set{1, \dots, m}$. Define the layered grammar $E_p \to E_p \mathbin{\mathit{op}} E_{p+1} \mid E_{p+1}$ for each operator $\mathit{op}$ of precedence $p$ ($1 \le p \le m$), and $E_{m+1} \to x$. Prove that, for every input that is a valid expression and every $p$, the call `expr(p)` starting at a position where an $E_p$ begins consumes exactly the longest prefix that is derivable from $E_p$, and returns the syntax tree given by the (unique) parse tree of that prefix.
::: solution
By induction on $m + 1 - p$, and within that on the length of the consumed prefix.

*Case $p = m + 1$.* `expr(m+1)` reads an operand and stops, since no operator has precedence $\ge m+1$. The longest prefix derivable from $E_{m+1}$ is the single operand. Correct.

*Case $p \le m$.* A string derivable from $E_p$ is a sequence $u_0\ \mathit{op}_1\ u_1 \cdots \mathit{op}_k\ u_k$ where each $u_i$ is derivable from $E_{p+1}$ and each $\mathit{op}_i$ has precedence exactly $p$; its tree (from the left-recursive rule) is $((u_0\ \mathit{op}_1\ u_1)\ \mathit{op}_2\ u_2)\cdots$. Now look at `expr(p)`. It reads an operand $x_0$ and then, in its loop, consumes any operator $\mathit{op}$ of precedence $q \ge p$ followed by `expr(q+1)`. We claim that after the loop has run as long as it sees operators of precedence $> p$, the tree built is that of the longest prefix derivable from $E_{p+1}$: indeed the same loop running with threshold $p$ behaves, as long as the operators it sees have precedence $\ge p+1$, exactly as `expr(p+1)` would (the code is the same and the recursive calls `expr(q+1)` do not depend on the threshold) — so by the induction hypothesis for $p + 1$ it has consumed the longest $E_{p+1}$-prefix $u_0$ and built its tree. The next token is then either not an operator, or an operator of precedence $\le p$. If its precedence is $< p$ or it is not an operator, `expr(p)` returns $u_0$, which is then the longest $E_p$-prefix ($k = 0$). If it is an operator $\mathit{op}_1$ of precedence exactly $p$, the loop consumes it and calls `expr(p+1)`, which by the hypothesis consumes the longest $E_{p+1}$-prefix $u_1$ and returns its tree; the loop forms $(u_0\ \mathit{op}_1\ u_1)$ and continues, now with this tree as `left` — and from here the same argument applies again, since `left` plays the role of $u_0$ and the next operator has precedence $\le p$ (otherwise `expr(p+1)` would have consumed it). The process ends when the next token is not an operator of precedence $\ge p$, after building exactly the left-leaning tree of $u_0\ \mathit{op}_1 \cdots \mathit{op}_k\ u_k$, the longest $E_p$-prefix. Termination follows since every iteration consumes tokens.
:::
:::
