How would you describe, precisely, which strings are valid arithmetic expressions? A finite automaton cannot even check that the parentheses match ([[theory-of-computation/non-regular-languages]]). Yet the description in words is easy and *recursive*: an expression is a number or a variable, or two expressions joined by an operator, or an expression in parentheses. A **context-free grammar** is exactly such a recursive definition, written as a set of rewriting rules:

$$
E \to E + E \mid E \times E \mid (\,E\,) \mid a.
$$

Read it as "an $E$ may be replaced by $E + E$, or by $E \times E$, or by $(E)$, or by $a$". Starting from $E$ and rewriting until no $E$ is left produces exactly the well-formed expressions over the single operand $a$.

Grammars of this kind were introduced by the linguist Noam Chomsky to describe the structure of sentences, and within a few years they were used to define the syntax of the programming language ALGOL 60. Today the grammar in a language's reference manual is the specification that every compiler's parser implements ([[compilers]]), and grammars describe file formats, query languages, configuration languages and network protocols. In this chapter we define grammars and their languages, prove that a grammar generates what we claim, study **parse trees** and the problem of **ambiguity**, convert every grammar to the simple **Chomsky normal form**, and use that form in the **CYK algorithm**, which decides membership for any context-free language in cubic time.

## Grammars and derivations

::: definition Context-free grammar {#def-cfg}
A **context-free grammar** (CFG) is a 4-tuple $G = (V, \Sigma, R, S)$ where

1. $V$ is a finite set of **variables** (or *non-terminals*);
2. $\Sigma$ is a finite set of **terminals**, disjoint from $V$;
3. $R$ is a finite set of **rules** (or *productions*), each of the form $A \to \alpha$ with $A \in V$ and $\alpha \in (V \cup \Sigma)^*$;
4. $S \in V$ is the **start variable**.
:::

We write $A \to \alpha_1 \mid \alpha_2$ for the two rules $A \to \alpha_1$ and $A \to \alpha_2$. By convention variables are upper-case letters, terminals lower-case letters, digits and symbols, and Greek letters $\alpha, \beta, \gamma$ stand for strings of both.

::: definition Derivations and the language of a grammar {#def-derivation}
If $A \to \gamma$ is a rule, then for all strings $\alpha, \beta \in (V \cup \Sigma)^*$ we say $\alpha A \beta$ **yields** $\alpha \gamma \beta$, written $\alpha A\beta \Rightarrow \alpha\gamma\beta$. We write $\alpha \Rightarrow^* \beta$ if $\alpha = \beta$ or there is a sequence $\alpha = \alpha_0 \Rightarrow \alpha_1 \Rightarrow \cdots \Rightarrow \alpha_k = \beta$; the sequence is a **derivation** of length $k$. A string $\alpha$ with $S \Rightarrow^* \alpha$ is a **sentential form**. The **language of $G$** is

$$
L(G) = \{ w \in \Sigma^* : S \Rightarrow^* w \}.
$$

A language is **context-free** if some CFG generates it.
:::

"Context-free" refers to the form of the rules: a variable $A$ may be rewritten by $A \to \gamma$ regardless of what surrounds it. (Chomsky's *context-sensitive* grammars have rules like $\alpha A\beta \to \alpha\gamma\beta$ that apply only in a given context.)

::: example Three grammars {#ex-three-grammars}
Give grammars for (a) $\{0^n1^n : n \ge 0\}$, (b) the palindromes over $\{a, b\}$, (c) the balanced strings of parentheses, and derive a string from each.
::: solution
(a) $S \to 0S1 \mid \varepsilon$. Derivation of $000111$: $S \Rightarrow 0S1 \Rightarrow 00S11 \Rightarrow 000S111 \Rightarrow 000111$.

(b) $P \to aPa \mid bPb \mid a \mid b \mid \varepsilon$. Each rule adds the same symbol at both ends, or ends the recursion with a middle symbol or nothing. $abbba$: $P \Rightarrow aPa \Rightarrow abPba \Rightarrow abbba$.

(c) $S \to (S)S \mid \varepsilon$: a balanced string is empty, or an opening bracket, a balanced string, the matching closing bracket and another balanced string. $(())()$: $S \Rightarrow (S)S \Rightarrow ((S)S)S \Rightarrow (()S)S \Rightarrow (())S \Rightarrow (())(S)S \Rightarrow (())()S \Rightarrow (())()$.

The languages in (a) and (c) are not regular, so the context-free languages strictly include some non-regular ones.
:::
:::

### Proving that a grammar is correct

A grammar is a definition, and it is easy to write one that generates slightly too much or too little. As with automata, correctness is a theorem with two directions: everything generated has the property (**soundness**, usually by induction on derivations), and everything with the property is generated (**completeness**, usually by induction on the length of the string). Here is the proof for the bracket grammar. Write $\#_($ and $\#_)$ for the numbers of opening and closing brackets in a string.

::: definition Balanced strings of brackets {#def-balanced-cf}
A string $w \in \{(, )\}^*$ is **balanced** if $\#_(w) = \#_)(w)$ and every prefix $u$ of $w$ has $\#_((u) \ge \#_)(u)$.
:::

::: theorem The bracket grammar is correct {#thm-brackets-grammar}
The grammar $S \to (S)S \mid \varepsilon$ generates exactly the balanced strings.
:::

::: proof
*Soundness.* We show by induction on the length of a derivation that every $w \in \{(,)\}^*$ with $S \Rightarrow^* w$ is balanced. A derivation of length $1$ is $S \Rightarrow \varepsilon$, and $\varepsilon$ is balanced. A longer derivation starts $S \Rightarrow (S)S$; the two copies of $S$ then derive strings $u$ and $v$ by derivations that are each shorter (the steps of the whole derivation are split between them, as the two copies never interact), so $w = (u)v$ with $u$ and $v$ balanced by the induction hypothesis. Then $\#_( = \#_)$ for $w$, and for a prefix of $w$: the prefix $($ has a surplus of $1$; a prefix $(u'$ with $u'$ a prefix of $u$ has surplus $1 + (\text{surplus of } u') \ge 1$; the prefix $(u)$ has surplus $0$; and a prefix $(u)v'$ has the surplus of $v'$, which is $\ge 0$.

*Completeness.* By strong induction on $\lvert w\rvert$ we show every balanced $w$ is derivable. If $w = \varepsilon$, use $S \to \varepsilon$. Otherwise $w$ starts with $($, since the prefix of length $1$ must have surplus $\ge 0$. The surplus of the prefixes of $w$ starts at $1$, changes by $\pm 1$ at each symbol and ends at $0$; let $(u)$ be the shortest non-empty prefix with surplus $0$, and write $w = (u)v$. Inside $u$, every prefix of $(u$ has surplus $\ge 1$ (it is not yet zero), so every prefix of $u$ has surplus $\ge 0$, and $u$ has total surplus $0$: $u$ is balanced. And $v$ is balanced: its prefixes $v'$ have the same surplus as the prefixes $(u)v'$ of $w$, which is $\ge 0$, with total $0$. Both are shorter than $w$, so by the induction hypothesis $S \Rightarrow^* u$ and $S \Rightarrow^* v$, and $S \Rightarrow (S)S \Rightarrow^* (u)v = w$.
:::

The argument is the same one that proves the stack-based bracket checker correct in [[data-structures/stacks-queues#thm-brackets]] — not a coincidence, since stacks and context-free grammars turn out to be equivalent ([[theory-of-computation/pushdown-automata]]).

### Regular languages are context-free

::: theorem Every regular language is context-free {#thm-regular-cf}
For every DFA $M = (Q, \Sigma, \delta, q_0, F)$ there is a CFG $G$ with $L(G) = L(M)$.
:::

::: proof
Take a variable $R_q$ for each state $q$, start variable $R_{q_0}$, a rule $R_q \to a\,R_{\delta(q,a)}$ for each $q \in Q$ and $a \in \Sigma$, and a rule $R_q \to \varepsilon$ for each $q \in F$. Every sentential form has the shape $w R_p$ (or is a terminal string), because each rule replaces the single variable at the end. By induction on $\lvert w\rvert$, $R_q \Rightarrow^* wR_p$ iff $\hat\delta(q, w) = p$: each step appends one symbol and moves to the successor state. A terminal string $w$ is derived iff $R_{q_0} \Rightarrow^* wR_p \Rightarrow w$ for some $p$ with the rule $R_p \to \varepsilon$, i.e. iff $\hat\delta(q_0, w) \in F$.
:::

Grammars of this shape, in which every rule is $A \to aB$ or $A \to \varepsilon$, are called **right-linear**; they generate exactly the regular languages. With [[#ex-three-grammars]] this shows that the regular languages are a *proper* subset of the context-free ones.

## Parse trees

A derivation records the order in which variables are rewritten, but for most purposes the order is irrelevant: in $E + E \Rightarrow a + E \Rightarrow a + a$ and $E + E \Rightarrow E + a \Rightarrow a + a$ the same structure is built. A **parse tree** records the structure and forgets the order.

::: definition Parse tree {#def-parse-tree}
A **parse tree** for a grammar $G$ is an ordered rooted tree in which every internal node is labelled by a variable, every leaf by a terminal or by $\varepsilon$, and for every internal node labelled $A$ whose children are labelled $X_1, \dots, X_k$ from left to right, $A \to X_1 \cdots X_k$ is a rule of $G$ (a leaf $\varepsilon$ as the only child stands for the rule $A \to \varepsilon$). The **yield** of the tree is the string of its leaf labels read from left to right. A parse tree for $w$ is one whose root is labelled $S$ and whose yield is $w$.
:::

Every derivation $S \Rightarrow^* w$ gives a parse tree (start with a root $S$; each step expands one leaf), and every parse tree comes from at least one derivation (expand the internal nodes in any order compatible with the tree). Among the derivations for a tree, exactly one is **leftmost** — at each step it rewrites the leftmost variable. So parse trees for $w$ correspond one-to-one with leftmost derivations of $w$, and either can be used to talk about the *structure* the grammar assigns to $w$. That structure matters: a compiler turns the parse tree into an abstract syntax tree and generates code from it, so the tree determines what the program *means*.

::: widget graph
nodes: E1@3,4; E2@0,3; +@2,3; E3@4.5,3; a1@0,2; E4@3,2; ×@4.5,2; E5@6,2; a2@3,1; a3@6,1
edges: E1-E2; E1-+; E1-E3; E2-a1; E3-E4; E3-×; E3-E5; E4-a2; E5-a3
algorithm: dfs
start: E1
caption: A parse tree for $a + a \times a$ in the grammar $E \to E + E \mid E \times E \mid (E) \mid a$, with the copies of $E$ and $a$ numbered so that the vertices have different names. The root applies $E \to E + E$, and the multiplication sits *below* the addition: this tree means $a + (a \times a)$. Step through the depth-first search from $E_1$: vertices are discovered in exactly the order in which a leftmost derivation expands them, and the leaves appear in the order $a, +, a, \times, a$ of the yield.
:::

## Ambiguity

::: definition Ambiguity {#def-ambiguous}
A grammar $G$ is **ambiguous** if some string in $L(G)$ has two different parse trees (equivalently, two different leftmost derivations). A context-free language is **inherently ambiguous** if every grammar for it is ambiguous.
:::

The expression grammar of the introduction is ambiguous. The string $a + a \times a$ has the tree in the figure, rooted at $E \to E + E$, and a second tree rooted at $E \to E \times E$ whose left child derives $a + a$:

::: widget graph
nodes: E1@3,4; E2@1.5,3; ×@4,3; E3@6,3; E4@0,2; +@1.5,2; E5@3,2; a3@6,2; a1@0,1; a2@3,1
edges: E1-E2; E1-×; E1-E3; E2-E4; E2-+; E2-E5; E4-a1; E5-a2; E3-a3
algorithm: dfs
start: E1
caption: A second parse tree for the same string $a + a \times a$, rooted at $E \to E \times E$. Its yield is the same — read the leaves left to right — but it groups the string as $(a + a) \times a$. A compiler that used this tree would compute $(1 + 2) \times 3 = 9$ for $1 + 2 \times 3$ instead of $7$. Two trees for one string: the grammar is ambiguous.
:::

The standard cure for expressions is to build precedence and associativity into the grammar, with one variable per precedence level:

$$
\begin{aligned}
E &\to E + T \mid T \\
T &\to T \times F \mid F \\
F &\to (\,E\,) \mid a
\end{aligned}
$$ {#eq-expr-grammar}

An $E$ (expression) is a sum of $T$s (terms), a $T$ is a product of $F$s (factors), and an $F$ is an operand or a parenthesised expression. A $\times$ can only be introduced inside a $T$, so in $a + a \times a$ the multiplication is forced below the addition. Left recursion ($E \to E + T$) makes the operators associate to the left: $a + a + a$ parses as $(a + a) + a$. This grammar generates the same language as the ambiguous one and is unambiguous; the proof is an induction showing that the top-level $+$ in any parse tree for $w$ must be the *last* $+$ of $w$ not enclosed in parentheses, and similarly for $\times$ within a term, so each step of the parse is forced.

::: example Leftmost derivation in the layered grammar {#ex-leftmost}
Give the leftmost derivation of $a + a \times a$ in [[#eq-expr-grammar]] and explain why there is no other.
::: solution
$$
\begin{aligned}
E &\Rightarrow E + T \Rightarrow T + T \Rightarrow F + T \Rightarrow a + T \\
  &\Rightarrow a + T \times F \Rightarrow a + F \times F \Rightarrow a + a \times F \Rightarrow a + a \times a.
\end{aligned}
$$

At the first step, $E \to T$ is impossible: a $T$ can only derive strings whose unparenthesised operators are all $\times$, and our string has an unparenthesised $+$. So $E \to E + T$, and the $+$ produced must be the only $+$ in the string, leaving $a$ for $E$ and $a \times a$ for $T$. The $E$ deriving $a$ must use $E \to T \to F \to a$. The $T$ deriving $a \times a$ cannot use $T \to F$ (an $F$ is $a$ or starts with a parenthesis), so it uses $T \to T \times F$ with the last $\times$, and the rest is forced. Every step has exactly one possible choice, so the leftmost derivation is unique.
:::
:::

::: warning Ambiguity is a property of grammars, and it cannot be detected automatically
An ambiguous grammar can often be replaced by an unambiguous grammar for the same language, as above — so ambiguity is usually a property of the grammar, not of the language. But not always: the language $\{a^ib^jc^k : i = j \text{ or } j = k\}$ is inherently ambiguous, because strings $a^nb^nc^n$ can be generated "via $i = j$" or "via $j = k$", and one can prove that every grammar gives some of them two trees. Worse, there is no algorithm that decides whether a given CFG is ambiguous — a consequence of the Post correspondence problem in [[theory-of-computation/reductions]]. Parser generators therefore use restricted classes of grammars (LL, LR) that are unambiguous by construction and report "conflicts" when a grammar falls outside them. The famous **dangling else** — in `if c1 then if c2 then s1 else s2`, which `if` owns the `else`? — is an ambiguity in the natural grammar for conditionals, resolved in C, Java and Python's ancestors by the rule "an `else` belongs to the nearest unmatched `if`".
:::

::: quiz
Which of these grammars are ambiguous?
- [x] $S \to SS \mid (S) \mid \varepsilon$
- [ ] $S \to (S)S \mid \varepsilon$
- [x] $S \to aS \mid Sa \mid a$
- [ ] $S \to aSb \mid \varepsilon$
::: solution
In $S \to SS \mid (S) \mid \varepsilon$, the string $()()()$ has a tree with root $S \to SS$ whose left child derives $()()$ and right child $()$, and another whose left child derives $()$ and right child $()()$ — two trees (and $\varepsilon$ has infinitely many, via $S \Rightarrow SS \Rightarrow S \Rightarrow \varepsilon$). In $S \to aS \mid Sa \mid a$, the string $aa$ has trees $S \to aS \to aa$ and $S \to Sa \to aa$. The grammar $S \to (S)S \mid \varepsilon$ is unambiguous: in the completeness proof of [[#thm-brackets-grammar]] the split $w = (u)v$ is forced (the first return of the surplus to zero), so every step of the parse is determined. $S \to aSb \mid \varepsilon$ is unambiguous because each string $a^nb^n$ has only one derivation.
:::
:::

## Chomsky normal form

General grammars are awkward for algorithms: rules can be long, can erase variables ($A \to \varepsilon$), and can rename one variable into another ($A \to B$), so a derivation of a short string can be arbitrarily long. A normal form removes all three.

::: definition Chomsky normal form {#def-cnf}
A CFG is in **Chomsky normal form** (CNF) if every rule has one of the forms

$$
A \to BC, \qquad A \to a, \qquad S \to \varepsilon,
$$

where $A, B, C$ are variables, $B$ and $C$ are not the start variable $S$, $a$ is a terminal, and the rule $S \to \varepsilon$ is allowed only for the start variable.
:::

In a CNF grammar, every derivation of a string of length $n \ge 1$ has exactly $2n - 1$ steps: $n - 1$ applications of rules $A \to BC$ (each increases the number of symbols by one, from $1$ to $n$) and $n$ applications of rules $A \to a$ (each turns one variable into a terminal). Parse trees are binary trees above the leaves. This regularity is what makes the CYK algorithm possible.

::: theorem Conversion to Chomsky normal form {#thm-cnf}
Every context-free language is generated by a grammar in Chomsky normal form.
:::

::: proof
Let $G = (V, \Sigma, R, S)$ generate $L$. We transform $G$ in five steps, each preserving the language.

1. **New start.** Add a new start variable $S_0$ and the rule $S_0 \to S$. Now the start variable never appears on a right-hand side. The language is unchanged.

2. **Remove $\varepsilon$-rules.** Call a variable **nullable** if it derives $\varepsilon$; the nullable variables are computed by iterating "$A$ is nullable if it has a rule $A \to \alpha$ with every symbol of $\alpha$ nullable" until nothing changes. For each rule $A \to \alpha$, add every rule $A \to \alpha'$ where $\alpha'$ is obtained from $\alpha$ by deleting some of the occurrences of nullable variables, as long as $\alpha' \ne \varepsilon$. Then delete all rules $A \to \varepsilon$, and add $S_0 \to \varepsilon$ if $S_0$ was nullable. Any derivation of a non-empty string in the old grammar can be imitated by skipping the variables that eventually derive $\varepsilon$ (using the shortened rules), and every shortened rule can be imitated in the old grammar by deriving $\varepsilon$ from the deleted variables. So the non-empty strings generated are the same, and $\varepsilon$ is generated iff it was.

3. **Remove unit rules** $A \to B$. Compute, for each $A$, the set of variables $B$ with $A \Rightarrow^* B$ using only unit rules (a graph search). For every such pair and every non-unit rule $B \to \beta$ add $A \to \beta$; then delete all unit rules. A derivation in the old grammar groups into chains of unit rules followed by a non-unit rule, and each chain plus its final rule is one new rule, and conversely.

4. **Replace terminals in long rules.** For each terminal $a$ appearing in a right-hand side of length at least $2$, add a new variable $U_a$ with the rule $U_a \to a$, and replace $a$ by $U_a$ in those right-hand sides.

5. **Break long rules.** Replace each rule $A \to B_1 B_2 \cdots B_k$ with $k \ge 3$ by the rules $A \to B_1 C_1$, $C_1 \to B_2 C_2$, …, $C_{k-2} \to B_{k-1}B_k$, with new variables $C_i$ used nowhere else. The new variables can only be used in this chain, so the language is unchanged.

After step 5 every rule is $A \to BC$, $A \to a$ or $S_0 \to \varepsilon$: rules of length $\ge 2$ contain only variables (step 4), have length exactly $2$ (step 5), and never contain $S_0$ (step 1); rules of length $1$ are terminals (step 3 removed unit rules); and the only $\varepsilon$-rule is $S_0 \to \varepsilon$ (step 2). Steps 4 and 5 create no new unit or $\varepsilon$-rules.
:::

The order matters: removing $\varepsilon$-rules can create new unit rules (from $A \to BC$ with $C$ nullable comes $A \to B$), which is why step 3 comes after step 2. Step 2 can increase the grammar size exponentially if a long rule has many nullable variables; doing step 5 first (binarising) avoids this and keeps the whole conversion polynomial.

::: example Converting the bracket grammar {#ex-cnf}
Convert $S \to (S)S \mid \varepsilon$ to Chomsky normal form.
::: solution
*Step 1.* $S_0 \to S$, $S \to (S)S \mid \varepsilon$.

*Step 2.* $S$ is nullable, hence so is $S_0$. Deleting occurrences of $S$ from $(S)S$ in all ways gives $(S)S$, $()S$, $(S)$, $()$. So $S \to (S)S \mid ()S \mid (S) \mid ()$, and $S_0 \to S \mid \varepsilon$.

*Step 3.* The unit rule $S_0 \to S$ is replaced by copies of $S$'s rules: $S_0 \to (S)S \mid ()S \mid (S) \mid () \mid \varepsilon$.

*Step 4.* New variables $L \to ($ and $R \to )$: $S \to LSRS \mid LRS \mid LSR \mid LR$, and the same for $S_0$ (plus $S_0 \to \varepsilon$).

*Step 5.* $LSRS$ becomes $L X_1$ with $X_1 \to S X_2$ and $X_2 \to RS$; $LRS$ becomes $L X_2$ (reusing $X_2 \to RS$, which is harmless since $X_2$ means exactly "$RS$"); $LSR$ becomes $LX_4$ with $X_4 \to SR$. The result:

$$
\begin{aligned}
S_0 &\to LX_1 \mid LX_2 \mid LX_4 \mid LR \mid \varepsilon, &\qquad S &\to LX_1 \mid LX_2 \mid LX_4 \mid LR, \\
X_1 &\to SX_2, & X_2 &\to RS, \qquad X_4 \to SR, \\
L &\to (, & R &\to ).
\end{aligned}
$$
:::
:::

## The CYK algorithm

Given a grammar $G$ in CNF and a string $w = a_1 \cdots a_n$, is $w \in L(G)$? Trying derivations blindly may not terminate for general grammars, but in CNF every derivation of $w$ has exactly $2n - 1$ steps, so a brute-force search terminates — in exponential time. **Dynamic programming** ([[algorithms/dynamic-programming]]) does much better. The key fact: if $n \ge 2$ and $A \Rightarrow^* a_i \cdots a_j$, then the first step is some $A \to BC$, and $B$ derives a prefix $a_i \cdots a_k$ and $C$ the rest $a_{k+1} \cdots a_j$, for some split point $k$. So we compute, for *every* substring, the set of variables that derive it, shortest substrings first.

::: algorithm Cocke–Younger–Kasami (CYK) {#alg-cyk}
Input: a CNF grammar $G = (V, \Sigma, R, S)$ and $w = a_1 \cdots a_n$.

1. If $n = 0$: accept iff $S \to \varepsilon$ is a rule.
2. For $i = 1, \dots, n$: $T[i, i] \gets \{A : A \to a_i \in R\}$.
3. For $\ell = 2, \dots, n$ (substring length), for $i = 1, \dots, n - \ell + 1$, with $j = i + \ell - 1$:
   1. $T[i, j] \gets \emptyset$.
   2. For $k = i, \dots, j - 1$ and each rule $A \to BC$: if $B \in T[i, k]$ and $C \in T[k+1, j]$, add $A$ to $T[i, j]$.
4. Accept iff $S \in T[1, n]$.
:::

::: theorem Correctness and cost of CYK {#thm-cyk}
After [[#alg-cyk]] has run, $A \in T[i, j]$ if and only if $A \Rightarrow^* a_i \cdots a_j$. Hence the algorithm accepts exactly the strings in $L(G)$. It runs in $O(n^3 \cdot \lvert R\rvert)$ time and $O(n^2 \lvert V\rvert)$ space.
:::

::: proof
By induction on $\ell = j - i + 1$. For $\ell = 1$: in a CNF grammar, a variable derives a single terminal $a$ only by the rule $A \to a$ (a rule $A \to BC$ produces at least two symbols, since no variable other than the start can derive $\varepsilon$ and the start does not occur on right-hand sides). So $A \Rightarrow^* a_i$ iff $A \to a_i \in R$ iff $A \in T[i,i]$.

For $\ell \ge 2$: if $A \in T[i, j]$ then for some $k$ and rule $A \to BC$ we have $B \in T[i,k]$, $C \in T[k+1, j]$, so by the induction hypothesis (both substrings are shorter) $A \Rightarrow BC \Rightarrow^* a_i \cdots a_k\, a_{k+1} \cdots a_j$. Conversely, if $A \Rightarrow^* a_i \cdots a_j$ with $\ell \ge 2$, the first step cannot be $A \to a$, so it is some $A \to BC$; $B$ and $C$ derive non-empty strings (neither is the start variable, so neither derives $\varepsilon$) whose concatenation is $a_i \cdots a_j$, say $B \Rightarrow^* a_i \cdots a_k$ and $C \Rightarrow^* a_{k+1}\cdots a_j$ with $i \le k < j$. By the induction hypothesis $B \in T[i,k]$ and $C \in T[k+1, j]$, and step 3.2 adds $A$ to $T[i,j]$ — the shorter entries are already final because the loop runs over increasing $\ell$.

The three nested loops over $\ell, i, k$ perform $O(n^3)$ iterations, each examining every rule once.
:::

The algorithm is a recognition procedure, but storing in each entry *how* each variable was obtained (the rule and the split point $k$) lets us reconstruct a parse tree — or count the parse trees and so detect ambiguity for that string. Here is a direct implementation for the CNF bracket grammar of [[#ex-cnf]], indexing substrings by start position and length:

```python
from itertools import product

# Chomsky normal form grammar for balanced brackets (start symbol S0)
BINARY = {("L", "X1"): {"S", "S0"}, ("L", "X2"): {"S", "S0"}, ("L", "X4"): {"S", "S0"},
          ("L", "R"): {"S", "S0"}, ("S", "X2"): {"X1"}, ("R", "S"): {"X2"},
          ("S", "R"): {"X4"}}
TERMINAL = {"(": {"L"}, ")": {"R"}}
START, NULLABLE_START = "S0", True            # S0 -> epsilon is a rule

def cyk(w):
    n = len(w)
    if n == 0:
        return NULLABLE_START
    # T[i][l] = variables deriving the substring of length l starting at i
    T = [[set() for _ in range(n + 1)] for _ in range(n)]
    for i, c in enumerate(w):
        T[i][1] = set(TERMINAL.get(c, ()))
    for l in range(2, n + 1):                 # substring length
        for i in range(n - l + 1):            # start position
            for k in range(1, l):             # length of the left part
                for B, C in product(T[i][k], T[i + k][l - k]):
                    T[i][l] |= BINARY.get((B, C), set())
    for l in range(1, n + 1):                 # print the table, short rows first
        print(l, [",".join(sorted(T[i][l])) or "-" for i in range(n - l + 1)])
    return START in T[0][n]

print(cyk("(())()"))
print(cyk("())("))
```

```console
$ python3 cyk.py
1 ['L', 'L', 'R', 'R', 'L', 'R']
2 ['-', 'S,S0', '-', '-', 'S,S0']
3 ['-', 'X4', '-', 'X2']
4 ['S,S0', '-', '-']
5 ['-', 'X1']
6 ['S,S0']
True
1 ['L', 'R', 'R', 'L']
2 ['S,S0', '-', '-']
3 ['X4', '-']
4 ['-']
False
```

The dictionary `BINARY` maps a pair $(B, C)$ to the set of variables $A$ with $A \to BC$, so the inner loop costs a lookup per pair rather than a scan of all rules.

::: example Reading the CYK table {#ex-cyk-table}
Explain the entries of the table for $w = (())()$ in rows $\ell = 2$, $3$ and $5$, and show how the final $S_0$ is obtained.
::: solution
Number positions from $0$ as the program does. Row $\ell = 2$: the substring at position $1$ is $()$, derived by $S \to LR$ (and $S_0 \to LR$); the substring at position $4$ is also $()$. Other length-$2$ substrings, such as $(($ and $))$, derive nothing. Row $\ell = 3$: at position $1$, $())$ splits as $()\,\cdot\,)$ with $S \in T[1][2]$ and $R \in T[3][1]$, so $X_4 \to SR$ applies. At position $3$, $)()$ splits as $)\,\cdot\,()$ with $R$ and $S$, giving $X_2 \to RS$. Row $\ell = 5$, position $1$: $())()$ splits as $()\,\cdot\,)()$, with $S$ and $X_2$, giving $X_1 \to SX_2$. Finally, row $6$: $(())()$ splits as $(\,\cdot\,())()$ — that is, $L \in T[0][1]$ and $X_1 \in T[1][5]$ — so $S_0 \to LX_1$ applies: accept. The parse it finds is $w = (\,u\,)\,v$ with $u = ()$ and $v = ()$, exactly the split of [[#thm-brackets-grammar]].
:::
:::

Cubic time is acceptable for natural-language parsing and for some program-analysis problems, but too slow for compilers that parse millions of lines. Compilers use grammars from restricted classes — LL(1) for recursive-descent parsers, LALR(1) and LR(1) for parser generators such as Yacc and Bison — which are parsed in linear time by deterministic pushdown automata. Leslie Valiant showed in 1975 that general CFG recognition reduces to Boolean matrix multiplication and so takes $O(n^{\omega})$ time, where $\omega < 2.38$ is the exponent of matrix multiplication; no linear-time algorithm for all CFGs is known.

::: quiz
In a grammar in Chomsky normal form, how many steps does every derivation of a string of length $7$ take?
- [ ] $7$
- [ ] $12$
- [x] $13$
- [ ] It depends on the grammar.
::: solution
$2n - 1 = 13$: six applications of rules $A \to BC$ grow the sentential form from $1$ symbol to $7$, and seven applications of rules $A \to a$ turn each variable into a terminal.
:::
:::

::: history
Noam Chomsky defined phrase-structure grammars and the hierarchy of grammar types in "Three models for the description of language" (1956) and *Syntactic Structures* (1957), and introduced the normal form named after him in "On certain formal properties of grammars" (1959). John Backus used a similar notation to define the syntax of IAL (ALGOL 58) in 1959, and Peter Naur edited the *Report on the Algorithmic Language ALGOL 60* (1960) using it; Donald Knuth later suggested the name **Backus–Naur form**. Yehoshua Bar-Hillel, Micha Perles and Eli Shamir proved the basic closure and decidability results for context-free languages in 1961. The cubic membership algorithm was found independently by John Cocke (in the early 1960s, unpublished until Cocke and Schwartz's 1970 notes), Tadao Kasami (1965) and Daniel Younger (1967). Undecidability of ambiguity was proved independently by David Cantor and by Robert Floyd in 1962, and by Chomsky and Marcel-Paul Schützenberger in 1963.
:::

## Where this leads

[[theory-of-computation/pushdown-automata]] gives the machine model for context-free languages — a finite automaton with a stack — proves it equivalent to grammars, and proves a pumping lemma that shows $\{a^nb^nc^n\}$ is not context-free. [[compilers]] builds efficient parsers for restricted grammar classes, and [[programming-languages]] uses grammars to define syntax before semantics. The undecidability of ambiguity, of equivalence of CFGs and of whether a CFG generates all strings is proved in [[theory-of-computation/reductions]].

::: summary
- A **context-free grammar** $(V, \Sigma, R, S)$ rewrites one variable at a time, regardless of context; its language is the set of terminal strings derivable from $S$ ([[#def-cfg]], [[#def-derivation]]).
- Prove a grammar correct in two directions: **soundness** by induction on derivations and **completeness** by induction on string length ([[#thm-brackets-grammar]]).
- Every regular language is context-free (right-linear grammars from DFAs, [[#thm-regular-cf]]); $\{0^n1^n\}$ and balanced brackets are context-free but not regular.
- **Parse trees** correspond to leftmost derivations; a grammar is **ambiguous** if some string has two ([[#def-ambiguous]]). Layered grammars ([[#eq-expr-grammar]]) encode precedence and associativity. Some languages are inherently ambiguous, and ambiguity is undecidable.
- Every CFL has a grammar in **Chomsky normal form** ($A \to BC$, $A \to a$, $S \to \varepsilon$), obtained by new start, removing $\varepsilon$-rules and unit rules, and splitting long rules ([[#thm-cnf]]).
- The **CYK** algorithm decides membership for a CNF grammar in $O(n^3\lvert R\rvert)$ time by dynamic programming over substrings ([[#thm-cyk]]).
:::

## Exercises

::: exercise Writing grammars {level=1}
Give context-free grammars for (a) $\{a^nb^{2n} : n \ge 0\}$; (b) $\{a^ib^j : i \le j\}$; (c) $\{w \in \{a,b\}^* : w = w^R \text{ and } \lvert w\rvert \text{ is even}\}$.
::: solution
(a) $S \to aSbb \mid \varepsilon$. (b) $S \to aSb \mid Sb \mid \varepsilon$ — or, unambiguously, $S \to aSb \mid B$, $B \to bB \mid \varepsilon$. (c) $S \to aSa \mid bSb \mid \varepsilon$.
:::
:::

::: exercise Derivation length in CNF {level=1 check="11"}
How many steps does a derivation of $(())()$ take in the CNF grammar of [[#ex-cnf]]? (Enter the number.)
::: solution
The string has length $6$, so every derivation in a CNF grammar takes $2 \cdot 6 - 1 = 11$ steps: five binary rules and six terminal rules. The leftmost derivation along the parse found by CYK is

$$
\begin{aligned}
S_0 &\Rightarrow LX_1 \Rightarrow (X_1 \Rightarrow (SX_2 \Rightarrow (LRX_2 \Rightarrow ((RX_2 \Rightarrow (()X_2 \\
&\Rightarrow (()RS \Rightarrow (())S \Rightarrow (())LR \Rightarrow (())(R \Rightarrow (())(),
\end{aligned}
$$

which has $11$ steps: the binary rules $S_0 \to LX_1$, $X_1 \to SX_2$, $S \to LR$, $X_2 \to RS$, $S \to LR$, and three uses each of $L \to ($ and $R \to )$.
:::
:::

::: exercise Parse trees and derivations {level=1}
In the grammar $E \to E + E \mid E \times E \mid (E) \mid a$, give the two leftmost derivations of $a + a \times a$ that correspond to the two parse trees shown in the figures.
::: solution
Tree with $+$ at the root: $E \Rightarrow E + E \Rightarrow a + E \Rightarrow a + E \times E \Rightarrow a + a \times E \Rightarrow a + a \times a$.

Tree with $\times$ at the root: $E \Rightarrow E \times E \Rightarrow E + E \times E \Rightarrow a + E \times E \Rightarrow a + a \times E \Rightarrow a + a \times a$.

They differ at the first step, so they are different leftmost derivations of the same string.
:::
:::

::: exercise Soundness and completeness {level=2}
Prove that the grammar $S \to aSb \mid Sb \mid \varepsilon$ generates exactly $\{a^ib^j : i \le j\}$, and show that it is ambiguous.
::: solution
*Soundness:* by induction on derivations, every sentential form is $a^i S b^j$ with $i \le j$ or $a^ib^j$ with $i \le j$: the start $S$ has $i = j = 0$; $aSb$ adds one to both; $Sb$ adds one to $j$; $\varepsilon$ removes $S$.
*Completeness:* given $a^ib^j$ with $i \le j$, apply $S \to Sb$ $j - i$ times, then $S \to aSb$ $i$ times, then $S \to \varepsilon$: $S \Rightarrow^* Sb^{j-i} \Rightarrow^* a^iSb^ib^{j-i} \Rightarrow a^ib^j$.
*Ambiguity:* $abb$ has the derivations $S \Rightarrow Sb \Rightarrow aSbb \Rightarrow abb$ and $S \Rightarrow aSb \Rightarrow aSbb \Rightarrow abb$, which are different leftmost derivations (the first step differs), so there are two parse trees.
:::
:::

::: exercise Converting to CNF {level=2}
Convert $S \to aSb \mid ab$ (the language $\{a^nb^n : n \ge 1\}$) to Chomsky normal form, and run CYK by hand on $aabb$.
::: solution
New start $S_0 \to S$; no $\varepsilon$-rules; remove the unit rule: $S_0 \to aSb \mid ab$. Terminals: $A \to a$, $B \to b$, giving $S \to ASB \mid AB$, $S_0 \to ASB \mid AB$. Binarise: $S \to AY \mid AB$, $S_0 \to AY \mid AB$, $Y \to SB$.

CYK on $a\,a\,b\,b$ (positions $1$–$4$): row $1$: $A, A, B, B$. Row $2$: $T[1,2] = \emptyset$ ($AA$), $T[2,3] = \{S, S_0\}$ ($AB$), $T[3,4] = \emptyset$ ($BB$). Row $3$: $T[1,3]$: splits $A \cdot \{S,S_0\}$ (no rule $X \to AS$) and $\emptyset \cdot B$: empty. $T[2,4]$: splits $A \cdot \emptyset$ and $\{S, S_0\} \cdot B$, giving $Y \to SB$: $\{Y\}$. Row $4$: $T[1,4]$: split $A \cdot \{Y\}$ gives $S, S_0$; the other splits give nothing. $S_0 \in T[1,4]$: accept.
:::
:::

::: exercise Closure properties {level=2}
Prove that the context-free languages are closed under union, concatenation and star. (In [[theory-of-computation/pushdown-automata]] we show they are *not* closed under intersection or complement.)
::: solution
Let $G_1 = (V_1, \Sigma, R_1, S_1)$ and $G_2 = (V_2, \Sigma, R_2, S_2)$ with $V_1 \cap V_2 = \emptyset$. *Union:* new start $S$ with rules $S \to S_1 \mid S_2$ plus $R_1 \cup R_2$. Any derivation starts with one of the two rules and then uses only that grammar's rules (the variable sets are disjoint), so the language is $L(G_1) \cup L(G_2)$. *Concatenation:* $S \to S_1S_2$; the two variables derive independently (context-freeness), giving exactly $L(G_1)L(G_2)$. *Star:* $S \to SS_1 \mid \varepsilon$ plus $R_1$. The rules for $S$ can only produce $S \Rightarrow SS_1 \Rightarrow SS_1S_1 \Rightarrow \cdots \Rightarrow SS_1^k \Rightarrow S_1^k$ (interleaved with steps inside the copies of $S_1$, which do not interact), and each copy of $S_1$ derives a string of $L(G_1)$ independently. So $S$ derives exactly the concatenations of $k \ge 0$ strings of $L(G_1)$, which is $L(G_1)^*$.
:::
:::

::: exercise Counting parse trees with CYK {level=3}
Modify the CYK algorithm to count the number of parse trees of $w$ (for a CNF grammar), and use it to count the parse trees of $a + a + a + a$ in a CNF version of $E \to E + E \mid a$. What sequence do the counts for $a(+a)^{k}$ form?
::: solution
Store a count $N[i, j, A]$ instead of a Boolean: $N[i, i, A] = 1$ if $A \to a_i$ is a rule, else $0$; and $N[i, j, A] = \sum_{k} \sum_{A \to BC} N[i, k, B]\,N[k+1, j, C]$. The same induction as in [[#thm-cyk]] shows that $N[i,j,A]$ is the number of parse trees with root $A$ and yield $a_i \cdots a_j$, because a tree is determined by its root rule, its split point and its two subtrees, and different choices give different trees.

A CNF version of $E \to E + E \mid a$: $E_0 \to EX \mid a$, $E \to EX \mid a$, $X \to PE$, $P \to +$, with start variable $E_0$. A parse tree of $a(+a)^k$ in the original grammar is a full binary tree with $k$ internal nodes (each a $+$) and $k + 1$ leaves, and the CNF translation preserves the count. The number of such trees is the Catalan number $C_k = \frac{1}{k+1}\binom{2k}{k}$: $1, 1, 2, 5, 14, 42, \dots$. For $a + a + a + a$ ($k = 3$) there are $C_3 = 5$ parse trees, the five ways to parenthesise a sum of four terms.
:::
:::

::: exercise Nullable variables {level=3}
(a) Give an algorithm that computes the set of nullable variables of a grammar in time $O(\lvert G\rvert^2)$, where $\lvert G\rvert$ is the total length of the rules, and prove it correct. (b) Show that $L(G) = \emptyset$ is decidable for CFGs by a similar fixed-point computation of the **generating** variables (those deriving some terminal string).
::: solution
(a) Start with $N = \emptyset$. Repeat: for each rule $A \to X_1\cdots X_k$, if every $X_i \in N$ (vacuously true for $k = 0$), add $A$ to $N$. Stop when a pass adds nothing. Each pass costs $O(\lvert G\rvert)$ and there are at most $\lvert V\rvert + 1 \le \lvert G\rvert$ passes. *Soundness:* by induction on the pass, every variable added derives $\varepsilon$, since each $X_i$ already does. *Completeness:* by induction on the height of a parse tree with yield $\varepsilon$, its root is eventually added: the root's rule has children that are roots of shorter such trees, hence in $N$, so the root is added in the next pass.

(b) Same iteration with "every $X_i$ is a terminal or in $N$": it computes the variables that derive a terminal string (same proofs, with parse trees of terminal yield). $L(G) \ne \emptyset$ iff $S$ is generating. This is the context-free analogue of the reachability test for DFAs in [[theory-of-computation/finite-automata#thm-emptiness]].
:::
:::
