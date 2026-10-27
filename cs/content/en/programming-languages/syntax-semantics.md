What does `x = x + 1` mean? A Python programmer reads it as "add one to the number in `x`". In C, if `x` is an `int` holding the largest representable value, the same characters cause undefined behaviour; in JavaScript, if `x` holds the string `"1"`, the result is the string `"11"`; and in mathematics the equation has no solution at all. The characters are identical; the *meanings* differ. Every programmer relies on knowing what programs mean, yet most language manuals describe meaning in English prose, which is ambiguous, incomplete and impossible to check. Two compilers written from the same manual can disagree, and a programmer cannot prove anything about a program whose meaning is only described in words.

This course studies programming languages as precisely defined mathematical objects. This first chapter introduces the two halves of a language definition. **Syntax** says which programs exist: which strings of characters are programs and what their structure is. **Semantics** says what those programs mean: what happens when they run, or which mathematical value they denote. We define a tiny language of booleans and natural numbers, give it three kinds of semantics — small-step operational, big-step operational and denotational — implement each in Python, and *prove* that the three agree. The techniques are the same ones used, at larger scale, to specify Standard ML, WebAssembly and the core of Rust, and they are the basis of every later chapter.

## Concrete and abstract syntax

A program is presented to us as text, a string of characters. The **concrete syntax** of a language is the set of strings that are programs, together with the rules for reading them: which characters form keywords and numbers, how operators group, where parentheses may go. Concrete syntax is described by a context-free grammar ([[theory-of-computation/context-free-grammars]]) and recognised by a parser ([[compilers]]).

For the meaning of a program, most of that detail is irrelevant. The strings `1+2*3`, `1 + (2*3)` and `(1+(2*3))` are different, but they are the same program: an addition whose left operand is $1$ and whose right operand is the product of $2$ and $3$. That structure is a tree.

::: definition Abstract syntax tree {#def-ast}
The **abstract syntax** of a language describes programs as trees. Each node is labelled by a *constructor* (such as `if`, `succ` or `+`) and has a fixed number of children, its sub-terms; leaves are constants or names. An **abstract syntax tree** (AST) is one such tree. Parsing turns concrete syntax into an AST; parentheses, spacing and operator precedence are used by the parser and then forgotten.
:::

A grammar for concrete syntax may be **ambiguous**: the grammar $E \to E - E \mid n$ allows the string `1-2-3` to be parsed as $(1-2)-3 = -4$ or as $1-(2-3) = 2$. Concrete grammars are rewritten (with precedence and associativity rules) so that each string has exactly one parse tree. Abstract syntax is never ambiguous, because it *is* the tree. When we write abstract syntax as text we use parentheses freely to show the tree's structure, and from now on we will reason about trees only.

### The language NB

Our running example is the language of booleans and natural numbers from Pierce's *Types and Programming Languages*. We call it **NB**. Its abstract syntax is given by a grammar in Backus–Naur form, which here should be read as a definition of trees rather than of strings:

$$
\begin{aligned}
t \;::=\;& \mathsf{true} \mid \mathsf{false} \mid \mathsf{if}\ t\ \mathsf{then}\ t\ \mathsf{else}\ t \\
\mid\;& \mathsf{0} \mid \mathsf{succ}\ t \mid \mathsf{pred}\ t \mid \mathsf{iszero}\ t
\end{aligned}
$$ {#eq-nb-syntax}

The symbol $t$ is a **metavariable**: it stands for any term, and in the rules below we write $t_1, t_2, t'$ for other terms. Numbers are written in unary, so $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$ is the number two. The constructor $\mathsf{pred}$ is the predecessor, with $\mathsf{pred}\ \mathsf{0} = \mathsf{0}$ by convention, and $\mathsf{iszero}$ tests for zero. NB has no variables, functions or loops, yet it already shows every phenomenon of this chapter, including programs that "go wrong", such as $\mathsf{succ}\ \mathsf{true}$.

::: definition Terms, inductively {#def-terms}
The set $\mathcal{T}$ of **terms** is the smallest set such that

1. $\mathsf{true}, \mathsf{false}, \mathsf{0} \in \mathcal{T}$;
2. if $t_1 \in \mathcal{T}$, then $\mathsf{succ}\ t_1$, $\mathsf{pred}\ t_1$ and $\mathsf{iszero}\ t_1$ are in $\mathcal{T}$;
3. if $t_1, t_2, t_3 \in \mathcal{T}$, then $\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \in \mathcal{T}$.
:::

"Smallest" is what makes the definition useful: nothing is a term unless the rules force it to be, so every term is built from constants by finitely many applications of rules 2 and 3. That gives the proof principle used throughout the course.

::: theorem Structural induction on terms {#thm-structural-induction}
Let $P$ be a property of terms. If $P(\mathsf{true})$, $P(\mathsf{false})$ and $P(\mathsf{0})$ hold; if $P(t_1)$ implies $P(\mathsf{succ}\ t_1)$, $P(\mathsf{pred}\ t_1)$ and $P(\mathsf{iszero}\ t_1)$; and if $P(t_1)$, $P(t_2)$ and $P(t_3)$ together imply $P(\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3)$, then $P(t)$ holds for every term $t$.
:::

::: proof
Let $S = \set{t \in \mathcal{T} : P(t)}$. The hypotheses say exactly that $S$ contains the three constants and is closed under the three kinds of construction in [[#def-terms]]. Since $\mathcal{T}$ is the *smallest* set with these closure properties and $S$ is one such set, $\mathcal{T} \subseteq S$, that is, $P(t)$ holds for every term.
:::

This is the same principle as the structural induction over Python data definitions in [[program-design/functional-style]]; here it is stated for a language rather than a data type. Functions on terms are defined by **structural recursion**, one clause per constructor. Two we will need are the size and the depth:

$$
\begin{aligned}
\operatorname{size}(c) &= 1 \quad (c \in \set{\mathsf{true}, \mathsf{false}, \mathsf{0}}), &
\operatorname{size}(\mathsf{succ}\ t_1) &= \operatorname{size}(t_1) + 1 \ \ (\text{likewise } \mathsf{pred}, \mathsf{iszero}),\\
\operatorname{size}(\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3) &= \operatorname{size}(t_1) + \operatorname{size}(t_2) + \operatorname{size}(t_3) + 1, &
\operatorname{depth}(c) &= 1, \ \ \operatorname{depth}(\mathsf{if}\ \ldots) = \max_i \operatorname{depth}(t_i) + 1.
\end{aligned}
$$

The size is the number of nodes of the tree. By structural induction, $\operatorname{depth}(t) \le \operatorname{size}(t)$ for every $t$: it holds for constants, and for an $\mathsf{if}$ the deepest child has depth at most its size, which is at most the sum of the three sizes.

In Python, an AST is naturally a family of frozen data classes, one per constructor, and a parser is a recursive function with one case per keyword. The listing below is the evaluator's data definition together with the parts we need later; the parser (`parse`) and printer (`show`) are routine recursive descent and structural recursion and are omitted.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Tru: pass
@dataclass(frozen=True)
class Fls: pass
@dataclass(frozen=True)
class Zero: pass
@dataclass(frozen=True)
class Succ: t: object
@dataclass(frozen=True)
class Pred: t: object
@dataclass(frozen=True)
class IsZero: t: object
@dataclass(frozen=True)
class If: c: object; th: object; el: object
```

```console
>>> parse("if iszero (pred (succ 0)) then succ (pred 0) else 0")
If(c=IsZero(t=Pred(t=Succ(t=Zero()))), th=Succ(t=Pred(t=Zero())), el=Zero())
```

::: widget graph
nodes: if@2,3; iszero@0.5,2; pred@0.5,1; succ@0.5,0; 0a@0.5,-1; succ2@2,2; pred2@2,1; 0b@2,0; 0c@3.5,2
edges: if>iszero; if>succ2; if>0c; iszero>pred; pred>succ; succ>0a; succ2>pred2; pred2>0b
algorithm: dfs
start: if
caption: The abstract syntax tree of `if iszero (pred (succ 0)) then succ (pred 0) else 0` (the three `0` leaves are named `0a`, `0b`, `0c`, and the second `succ` and `pred` carry a 2, only because vertex names must be distinct). Step through depth-first search from the root: it visits the guard's subtree completely before the branches, which is the order in which the evaluation rules below look for work to do. Count the vertices: the size of the term is $9$ and its depth is $5$.
:::

## Small-step operational semantics

An **operational semantics** describes the meaning of a program by describing how it runs, as a sequence of states of an abstract machine. For a language of expressions, the simplest machine has the terms themselves as states: running a program means rewriting it, step by step, until it is a final answer. This is how you evaluate $(1 + 2) \times 4$ by hand — first $3 \times 4$, then $12$.

::: definition Values {#def-values}
The **values** of NB are the terms that are final results:

$$
v \;::=\; \mathsf{true} \mid \mathsf{false} \mid nv, \qquad nv \;::=\; \mathsf{0} \mid \mathsf{succ}\ nv.
$$

The **numeric values** $nv$ are $\mathsf{0}$, $\mathsf{succ}\ \mathsf{0}$, $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$, …, the representations of $0, 1, 2, \ldots$
:::

The rules are written as **inference rules**: if the premises above the line hold, so does the conclusion below it; a rule without premises is an axiom.

::: definition One-step evaluation {#def-step}
The **one-step evaluation** relation $t \to t'$ is the smallest relation on terms closed under the following rules.

$$
\begin{gathered}
\frac{}{\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to t_2}\ \text{(E-IfTrue)}
\qquad
\frac{}{\mathsf{if}\ \mathsf{false}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to t_3}\ \text{(E-IfFalse)}
\\[1.2em]
\frac{t_1 \to t_1'}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to \mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3}\ \text{(E-If)}
\qquad
\frac{t_1 \to t_1'}{\mathsf{succ}\ t_1 \to \mathsf{succ}\ t_1'}\ \text{(E-Succ)}
\\[1.2em]
\frac{}{\mathsf{pred}\ \mathsf{0} \to \mathsf{0}}\ \text{(E-PredZero)}
\qquad
\frac{}{\mathsf{pred}\,(\mathsf{succ}\ nv) \to nv}\ \text{(E-PredSucc)}
\qquad
\frac{t_1 \to t_1'}{\mathsf{pred}\ t_1 \to \mathsf{pred}\ t_1'}\ \text{(E-Pred)}
\\[1.2em]
\frac{}{\mathsf{iszero}\ \mathsf{0} \to \mathsf{true}}\ \text{(E-IsZeroZero)}
\qquad
\frac{}{\mathsf{iszero}\,(\mathsf{succ}\ nv) \to \mathsf{false}}\ \text{(E-IsZeroSucc)}
\qquad
\frac{t_1 \to t_1'}{\mathsf{iszero}\ t_1 \to \mathsf{iszero}\ t_1'}\ \text{(E-IsZero)}
\end{gathered}
$$

The **multi-step** relation $\to^*$ is the reflexive–transitive closure of $\to$: $t \to^* t'$ if $t = t_0 \to t_1 \to \cdots \to t_n = t'$ for some $n \ge 0$.
:::

There are two kinds of rule. **Computation rules** (E-IfTrue, E-PredSucc, …) do the real work when the relevant sub-term is already a value. **Congruence rules** (E-If, E-Succ, E-Pred, E-IsZero) say *where* evaluation may happen next: inside the guard of an $\mathsf{if}$, but not inside its branches; inside the argument of $\mathsf{succ}$. Leaving out a congruence rule for the branches is a design decision — it makes $\mathsf{if}$ lazy in its branches, as in every programming language — and the side condition $nv$ in E-PredSucc forces the argument to be fully evaluated first.

A **derivation** of $t \to t'$ is a tree of rule instances with $t \to t'$ at the root. For example, $\mathsf{if}\ (\mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})))\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ steps by E-If, whose premise steps by E-IsZero, whose premise is an instance of E-PredSucc with $nv = \mathsf{0}$:

$$
\cfrac{\cfrac{\cfrac{}{\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}) \to \mathsf{0}}\ \text{E-PredSucc}}{\mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})) \to \mathsf{iszero}\ \mathsf{0}}\ \text{E-IsZero}}{\mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to \mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3}\ \text{E-If}
$$

The rules translate line by line into a Python function. Each `case` is one rule; a congruence rule calls `step` recursively, exactly as its premise asks for a derivation of a smaller step. Python's `match` tries the cases in order, so E-If is reached only when the guard is neither `true` nor `false`.

```python
def is_nv(t):
    return isinstance(t, Zero) or (isinstance(t, Succ) and is_nv(t.t))
def is_value(t):
    return isinstance(t, (Tru, Fls)) or is_nv(t)

class NoRule(Exception): pass

def step(t):
    """One step t -> t'; raises NoRule when t is a normal form."""
    match t:
        case If(Tru(), th, _):              return th                   # E-IfTrue
        case If(Fls(), _, el):              return el                   # E-IfFalse
        case If(c, th, el):                 return If(step(c), th, el)  # E-If
        case Succ(t1):                      return Succ(step(t1))       # E-Succ
        case Pred(Zero()):                  return Zero()               # E-PredZero
        case Pred(Succ(nv)) if is_nv(nv):   return nv                   # E-PredSucc
        case Pred(t1):                      return Pred(step(t1))       # E-Pred
        case IsZero(Zero()):                return Tru()                # E-IsZeroZero
        case IsZero(Succ(nv)) if is_nv(nv): return Fls()                # E-IsZeroSucc
        case IsZero(t1):                    return IsZero(step(t1))     # E-IsZero
    raise NoRule(t)

def trace(t):
    while True:
        yield t
        try:
            t = step(t)
        except NoRule:
            return
```

::: example Evaluating step by step {#ex-trace}
Evaluate $\mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0}$, naming the rule used at each step, and check the trace by running `trace`.
::: solution
1. The term is an $\mathsf{if}$ whose guard is not a boolean value, so only E-If can apply. Inside the guard, $\mathsf{iszero}\,(\ldots)$ has an argument that is not a numeric value, so E-IsZero applies; inside that, $\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})$ is an instance of E-PredSucc. Result: $\mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ \ldots$ (the derivation is the one displayed above).
2. E-If with E-IsZeroZero in the guard: $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0}$.
3. E-IfTrue: $\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})$. The else-branch is discarded without being evaluated.
4. E-Succ with E-PredZero inside: $\mathsf{succ}\ \mathsf{0}$, a value. No rule applies to a value, and evaluation stops.

```python
src = "if iszero (pred (succ 0)) then succ (pred 0) else 0"
for i, u in enumerate(trace(parse(src))):
    print(i, show(u))
```

```console
0 if iszero (pred (succ 0)) then succ (pred 0) else 0
1 if iszero 0 then succ (pred 0) else 0
2 if true then succ (pred 0) else 0
3 succ (pred 0)
4 succ 0
```

Four steps, ending in the numeric value for $1$.
:::
:::

### Determinacy, normal forms and stuck terms

At every step of the example exactly one rule applied. That is not a coincidence, and it is the first theorem one proves about a new semantics.

::: lemma Values are normal forms {#lem-values-normal}
A term $t$ is in **normal form** if there is no $t'$ with $t \to t'$. Every value is in normal form.
:::

::: proof
By structural induction on numeric values, plus the boolean cases. No rule has $\mathsf{true}$, $\mathsf{false}$ or $\mathsf{0}$ as the left side of its conclusion. The only rule whose conclusion has the form $\mathsf{succ}\ t_1 \to \ldots$ is E-Succ, whose premise would need $nv \to t_1'$ for the numeric value $nv$ inside; by the induction hypothesis there is no such step.
:::

::: theorem Determinacy of one-step evaluation {#thm-determinacy}
If $t \to t'$ and $t \to t''$, then $t' = t''$.
:::

::: proof
By induction on the derivation of $t \to t'$, considering the last rule used.

*E-IfTrue.* Then $t = \mathsf{if}\ \mathsf{true}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ and $t' = t_2$. Which rule could derive $t \to t''$? Not E-IfFalse, whose guard is $\mathsf{false}$; not E-If, whose premise would need $\mathsf{true} \to t_1'$, impossible by [[#lem-values-normal]]. So it is E-IfTrue and $t'' = t_2 = t'$. E-IfFalse is symmetric.

*E-If.* Then $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ with $t_1 \to t_1'$, and $t' = \mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$. Since $t_1$ steps, it is not a value by [[#lem-values-normal]], so neither E-IfTrue nor E-IfFalse can derive $t \to t''$; the derivation must end with E-If, from some $t_1 \to t_1''$, and $t'' = \mathsf{if}\ t_1''\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$. The induction hypothesis for the sub-derivation of $t_1 \to t_1'$ gives $t_1' = t_1''$, so $t' = t''$.

*E-PredSucc.* Then $t = \mathsf{pred}\,(\mathsf{succ}\ nv)$ and $t' = nv$. E-PredZero needs the argument $\mathsf{0}$; E-Pred needs $\mathsf{succ}\ nv \to \ldots$, impossible since $\mathsf{succ}\ nv$ is a value. So $t'' = nv$.

*E-Pred.* Then $t = \mathsf{pred}\ t_1$ with $t_1 \to t_1'$. So $t_1$ is not a value, which excludes E-PredZero (argument $\mathsf{0}$) and E-PredSucc (argument $\mathsf{succ}\ nv$); the other derivation also ends in E-Pred and the induction hypothesis gives the result.

The cases E-PredZero, E-Succ, E-IsZeroZero, E-IsZeroSucc and E-IsZero are identical in form to the ones above: a computation rule fires only when the relevant sub-term is a value, a congruence rule only when it is not, and two congruence steps agree by the induction hypothesis.
:::

So $\to$ is a partial function, and the evaluation of a term is a single path — an implementation like `step` is not making arbitrary choices. Determinacy is a property of this particular rule set: the exercises show that dropping the side condition $nv$ from E-PredSucc destroys it.

Values are normal forms, but the converse fails. The term $\mathsf{succ}\ \mathsf{true}$ is in normal form — E-Succ needs $\mathsf{true}$ to step — and yet it is not a value. Such a term is **stuck**.

::: definition Stuck term {#def-stuck}
A term is **stuck** if it is in normal form but is not a value. Evaluation of a term **goes wrong** if it reaches a stuck term.
:::

Stuck terms model run-time type errors: $\mathsf{succ}\ \mathsf{true}$, $\mathsf{if}\ \mathsf{0}\ \mathsf{then}\ \mathsf{true}\ \mathsf{else}\ \mathsf{false}$, $\mathsf{iszero}\ \mathsf{false}$. A real implementation would raise an exception or, in an unsafe language, do something arbitrary with the bits. The central aim of a **type system** ([[programming-languages/type-systems]]) is to reject, before running, every program that could reach a stuck term.

::: theorem Termination {#thm-termination}
If $t \to t'$ then $\operatorname{size}(t') < \operatorname{size}(t)$. Consequently every evaluation sequence starting at $t$ reaches a normal form after at most $\operatorname{size}(t) - 1$ steps.
:::

::: proof
By induction on the derivation of $t \to t'$. For the computation rules: E-IfTrue gives $\operatorname{size}(t_2) < 1 + 1 + \operatorname{size}(t_2) + \operatorname{size}(t_3)$, and E-IfFalse likewise; E-PredZero and E-IsZeroZero go from size $2$ to size $1$; E-PredSucc goes from $\operatorname{size}(nv) + 2$ to $\operatorname{size}(nv)$; E-IsZeroSucc goes from $\operatorname{size}(nv) + 2 \ge 3$ to $1$. For a congruence rule, say E-If, the induction hypothesis gives $\operatorname{size}(t_1') < \operatorname{size}(t_1)$ and the other children are unchanged, so the size of the whole term decreases by the same amount; E-Succ, E-Pred and E-IsZero are the same. Since sizes are positive integers that decrease by at least $1$ per step, a sequence from $t$ has at most $\operatorname{size}(t) - 1$ steps.
:::

Combining the two theorems: every NB term $t$ has exactly one evaluation sequence, it is finite, and it ends either in a value or in a stuck term. We write $t \to^* v$ for the first outcome. Termination is special to NB; once a language has recursion, as in the next chapters, some programs run for ever, and no semantics can avoid that ([[theory-of-computation/decidability]]).

::: widget relation
set: t0; t1; t2; t3; t4
pairs: t0,t1; t1,t2; t2,t3; t3,t4
view: properties
name: →
caption: The one-step relation restricted to the five terms of the trace in [[#ex-trace]] ($t_0$ is the original term, $t_4 = \mathsf{succ}\ \mathsf{0}$). Each row of the matrix has at most one $1$ — that is determinacy — and the row of $t_4$ is empty because a value is in normal form. Look at the transitive closure the figure computes: it is $\to^+$, and adding the diagonal gives $\to^*$. Toggle on a second pair in row $t_0$ to see what a non-deterministic semantics would look like.
:::

::: quiz
Which of these NB terms are stuck?
- [x] $\mathsf{pred}\ \mathsf{false}$
- [ ] $\mathsf{pred}\ \mathsf{0}$
- [x] $\mathsf{if}\ \mathsf{succ}\ \mathsf{0}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0}$
- [ ] $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{succ}\ \mathsf{true}$
- [ ] $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$
::: solution
$\mathsf{pred}\ \mathsf{false}$ matches no rule (E-Pred needs the argument to step, and $\mathsf{false}$ is a value), so it is stuck; so is the $\mathsf{if}$ whose guard is a number. $\mathsf{pred}\ \mathsf{0}$ steps to $\mathsf{0}$. The $\mathsf{if}\ \mathsf{true}$ term steps to $\mathsf{0}$ by E-IfTrue: the bad else-branch is never evaluated, so the term does not go wrong (a type checker would still reject it). $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$ is a value.
:::
:::

## Big-step operational semantics

Small-step semantics shows every intermediate state, which is exactly what we need to talk about non-termination, interleaving of threads or the moment an error occurs. Often we only care about the final answer. A **big-step semantics** (also called **natural semantics**) relates a term directly to its value.

::: definition Big-step evaluation {#def-bigstep}
The relation $t \Downarrow v$ ("$t$ evaluates to $v$") is the smallest relation closed under these rules:

$$
\begin{gathered}
\frac{}{v \Downarrow v}\ \text{(B-Value)}
\qquad
\frac{t_1 \Downarrow \mathsf{true} \quad t_2 \Downarrow v}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \Downarrow v}\ \text{(B-IfTrue)}
\qquad
\frac{t_1 \Downarrow \mathsf{false} \quad t_3 \Downarrow v}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \Downarrow v}\ \text{(B-IfFalse)}
\\[1.2em]
\frac{t_1 \Downarrow nv}{\mathsf{succ}\ t_1 \Downarrow \mathsf{succ}\ nv}\ \text{(B-Succ)}
\qquad
\frac{t_1 \Downarrow \mathsf{0}}{\mathsf{pred}\ t_1 \Downarrow \mathsf{0}}\ \text{(B-PredZero)}
\qquad
\frac{t_1 \Downarrow \mathsf{succ}\ nv}{\mathsf{pred}\ t_1 \Downarrow nv}\ \text{(B-PredSucc)}
\\[1.2em]
\frac{t_1 \Downarrow \mathsf{0}}{\mathsf{iszero}\ t_1 \Downarrow \mathsf{true}}\ \text{(B-IsZeroZero)}
\qquad
\frac{t_1 \Downarrow \mathsf{succ}\ nv}{\mathsf{iszero}\ t_1 \Downarrow \mathsf{false}}\ \text{(B-IsZeroSucc)}
\end{gathered}
$$
:::

Each rule reads as a recursive procedure: to evaluate an $\mathsf{if}$, evaluate the guard; if it gives $\mathsf{true}$, evaluate the then-branch and return its value. That is precisely an interpreter, and it is the style used for the interpreters of [[programming-languages/interpreters]]:

```python
class Stuck(Exception): pass

def evaluate(t):
    """Big-step evaluation t ⇓ v; raises Stuck if no derivation exists."""
    match t:
        case _ if is_value(t): return t                     # B-Value
        case If(c, th, el):
            match evaluate(c):
                case Tru(): return evaluate(th)              # B-IfTrue
                case Fls(): return evaluate(el)              # B-IfFalse
        case Succ(t1):
            v = evaluate(t1)
            if is_nv(v): return Succ(v)                      # B-Succ
        case Pred(t1):
            match evaluate(t1):
                case Zero(): return Zero()                   # B-PredZero
                case Succ(nv): return nv                     # B-PredSucc
        case IsZero(t1):
            match evaluate(t1):
                case Zero(): return Tru()                    # B-IsZeroZero
                case Succ(_): return Fls()                   # B-IsZeroSucc
    raise Stuck(t)
```

If no rule applies — the guard evaluated to a number, say — the function falls through every case and raises `Stuck`: there is no derivation. A big-step semantics cannot distinguish a stuck program from one that runs for ever; in both cases there is simply no $v$ with $t \Downarrow v$. That is one reason type-safety proofs ([[programming-languages/type-systems]]) are usually done with small steps.

::: example A big-step derivation {#ex-bigstep}
Give the derivation of $\mathsf{pred}\,(\mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0}) \Downarrow \mathsf{succ}\ \mathsf{0}$.
::: solution
Work from the root up, choosing the rule by the shape of the term and the value we need.

- The term is $\mathsf{pred}\ t_1$ and the result should be $\mathsf{succ}\ \mathsf{0} = nv$, so the last rule is B-PredSucc and we need $t_1 \Downarrow \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$.
- $t_1$ is an $\mathsf{if}$; use B-IfTrue, which needs $\mathsf{iszero}\ \mathsf{0} \Downarrow \mathsf{true}$ and $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0}) \Downarrow \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$.
- The first is B-IsZeroZero from $\mathsf{0} \Downarrow \mathsf{0}$ (B-Value); the second is B-Value.

$$
\cfrac{\cfrac{\cfrac{\cfrac{}{\mathsf{0} \Downarrow \mathsf{0}}}{\mathsf{iszero}\ \mathsf{0} \Downarrow \mathsf{true}} \qquad \cfrac{}{\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0}) \Downarrow \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})}}{\mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0} \Downarrow \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})}}{\mathsf{pred}\,(\mathsf{if}\ \ldots) \Downarrow \mathsf{succ}\ \mathsf{0}}
$$

The shape of the derivation mirrors the recursion tree of `evaluate`; the else-branch $\mathsf{0}$ appears nowhere in it. The small-step trace of the same term takes three steps: E-Pred(E-If(E-IsZeroZero)), E-Pred(E-IfTrue), E-PredSucc.
:::
:::

The two operational semantics were defined independently. They had better agree.

::: lemma Congruence of multi-step evaluation {#lem-congruence}
If $t_1 \to^* t_1'$, then $\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to^* \mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$, $\mathsf{succ}\ t_1 \to^* \mathsf{succ}\ t_1'$, $\mathsf{pred}\ t_1 \to^* \mathsf{pred}\ t_1'$ and $\mathsf{iszero}\ t_1 \to^* \mathsf{iszero}\ t_1'$.
:::

::: proof
By induction on the length $n$ of $t_1 \to^* t_1'$. If $n = 0$ the two sides are equal. Otherwise $t_1 \to s \to^* t_1'$ with $n - 1$ steps after the first; the congruence rule (E-If, E-Succ, E-Pred or E-IsZero) turns $t_1 \to s$ into one step of the larger term, and the induction hypothesis supplies the rest.
:::

::: lemma Expansion {#lem-expansion}
If $t \to t'$ and $t' \Downarrow v$, then $t \Downarrow v$. Moreover, if $u$ is a value and $u \Downarrow w$, then $w = u$.
:::

::: proof
The second claim first, by induction on the value $u$: for $\mathsf{true}$, $\mathsf{false}$ and $\mathsf{0}$ only B-Value applies; for $\mathsf{succ}\ nv$, either B-Value gives $w = u$, or B-Succ gives $w = \mathsf{succ}\ nv'$ with $nv \Downarrow nv'$, and the induction hypothesis says $nv' = nv$.

The first claim is by induction on the derivation of $t \to t'$.

*E-IfTrue:* $t = \mathsf{if}\ \mathsf{true}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$, $t' = t_2 \Downarrow v$; with $\mathsf{true} \Downarrow \mathsf{true}$ (B-Value), B-IfTrue gives $t \Downarrow v$. E-IfFalse is the same.

*E-If:* $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$, $t_1 \to t_1'$. The term $t'$ is an $\mathsf{if}$, not a value, so its derivation ends in B-IfTrue or B-IfFalse; say B-IfTrue, with $t_1' \Downarrow \mathsf{true}$ and $t_2 \Downarrow v$. The induction hypothesis turns $t_1' \Downarrow \mathsf{true}$ into $t_1 \Downarrow \mathsf{true}$, and B-IfTrue gives $t \Downarrow v$.

*E-Succ:* $t = \mathsf{succ}\ t_1$, $t' = \mathsf{succ}\ t_1'$. If the derivation of $t' \Downarrow v$ is B-Succ from $t_1' \Downarrow nv$, the induction hypothesis gives $t_1 \Downarrow nv$ and B-Succ gives $t \Downarrow \mathsf{succ}\ nv = v$. If it is B-Value, then $t'$ is a value, so $t_1' = nv$ is a numeric value and $v = t'$; from $t_1 \to nv$ and $nv \Downarrow nv$ the induction hypothesis gives $t_1 \Downarrow nv$, and B-Succ gives $t \Downarrow \mathsf{succ}\ nv = v$.

*E-PredSucc:* $t = \mathsf{pred}\,(\mathsf{succ}\ nv)$ and $t' = nv \Downarrow v$; by the second claim $v = nv$. B-Value gives $\mathsf{succ}\ nv \Downarrow \mathsf{succ}\ nv$, and B-PredSucc gives $t \Downarrow nv$.

The cases E-PredZero, E-IsZeroZero and E-IsZeroSucc are like E-PredSucc, and E-Pred and E-IsZero are like E-If (the term $t'$ is not a value, so its derivation ends in the big-step rule for the same constructor, and the induction hypothesis is applied to its premise).
:::

::: theorem Big-step and small-step semantics agree {#thm-big-small}
For every term $t$ and value $v$: $t \Downarrow v$ if and only if $t \to^* v$.
:::

::: proof
($\Rightarrow$) By induction on the derivation of $t \Downarrow v$. B-Value: $t = v$ and $v \to^* v$ in zero steps. B-IfTrue: by the induction hypotheses $t_1 \to^* \mathsf{true}$ and $t_2 \to^* v$; then [[#lem-congruence]] and E-IfTrue give $\mathsf{if}\ t_1\ \ldots \to^* \mathsf{if}\ \mathsf{true}\ \ldots \to t_2 \to^* v$. B-IfFalse is symmetric. B-Succ: $t_1 \to^* nv$, so $\mathsf{succ}\ t_1 \to^* \mathsf{succ}\ nv$ by congruence. B-PredSucc: $t_1 \to^* \mathsf{succ}\ nv$, so $\mathsf{pred}\ t_1 \to^* \mathsf{pred}\,(\mathsf{succ}\ nv) \to nv$ by congruence and E-PredSucc. The rules B-PredZero, B-IsZeroZero and B-IsZeroSucc are the same with the matching computation rule.

($\Leftarrow$) By induction on the number $n$ of steps in $t \to^* v$. If $n = 0$, $t = v$ and B-Value applies. If $n > 0$, then $t \to t' \to^* v$ with $n - 1$ steps from $t'$; by the induction hypothesis $t' \Downarrow v$, and [[#lem-expansion]] gives $t \Downarrow v$.
:::

## Denotational semantics

Operational semantics explains meaning by *running*. A **denotational semantics** explains it by *translation into mathematics*: each term is mapped to a mathematical object, its **denotation**, by a function defined by structural recursion on the syntax. The defining property is **compositionality**: the meaning of a compound term depends only on the meanings of its parts, not on their syntax.

::: definition Denotational semantics of NB {#def-denotation}
Let $D = \set{\mathrm{tt}, \mathrm{ff}} \cup \N \cup \set{\mathrm{wrong}}$. The **semantic function** $[\![\cdot]\!] \colon \mathcal{T} \to D$ is

$$
\begin{aligned}
[\![\mathsf{true}]\!] &= \mathrm{tt}, \qquad [\![\mathsf{false}]\!] = \mathrm{ff}, \qquad [\![\mathsf{0}]\!] = 0,\\
[\![\mathsf{succ}\ t]\!] &= \begin{cases} n + 1 & \text{if } [\![t]\!] = n \in \N \\ \mathrm{wrong} & \text{otherwise} \end{cases}
\qquad
[\![\mathsf{pred}\ t]\!] = \begin{cases} \max(n - 1, 0) & \text{if } [\![t]\!] = n \in \N \\ \mathrm{wrong} & \text{otherwise} \end{cases}\\
[\![\mathsf{iszero}\ t]\!] &= \begin{cases} \mathrm{tt} & \text{if } [\![t]\!] = 0 \\ \mathrm{ff} & \text{if } [\![t]\!] \in \N,\ [\![t]\!] > 0 \\ \mathrm{wrong} & \text{otherwise} \end{cases}
\qquad
[\![\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3]\!] = \begin{cases} [\![t_2]\!] & \text{if } [\![t_1]\!] = \mathrm{tt} \\ [\![t_3]\!] & \text{if } [\![t_1]\!] = \mathrm{ff} \\ \mathrm{wrong} & \text{otherwise.} \end{cases}
\end{aligned}
$$
:::

The double brackets ("Strachey brackets") separate the syntax inside from the mathematics outside: $\mathsf{succ}$ is a symbol, while $n + 1$ is addition of natural numbers. Note how $\mathsf{if}$ is mapped to a *case analysis*, not to evaluating all three parts and then choosing — $[\![\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{succ}\ \mathsf{true}]\!] = 0$, not $\mathrm{wrong}$. In Python the semantic function is another structural recursion, returning Python's booleans and integers:

```python
WRONG = "wrong"
def denote(t):
    match t:
        case Tru(): return True
        case Fls(): return False
        case Zero(): return 0
        case Succ(u):
            n = denote(u)
            return n + 1 if type(n) is int else WRONG
        case Pred(u):
            n = denote(u)
            return max(n - 1, 0) if type(n) is int else WRONG
        case IsZero(u):
            n = denote(u)
            return n == 0 if type(n) is int else WRONG
        case If(c, a, b):
            v = denote(c)
            return denote(a) if v is True else denote(b) if v is False else WRONG
```

The test is `type(n) is int` rather than `isinstance(n, int)` because in Python `bool` is a subclass of `int` and `isinstance(True, int)` is true — exactly the kind of confusion between the defining language and the language being defined that a careful semantics avoids.

::: example Computing denotations compositionally {#ex-denote}
Compute $[\![t]\!]$ for $t = \mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0}$ and for $u = \mathsf{iszero}\,(\mathsf{if}\ \mathsf{0}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0})$, and compare with evaluation.
::: solution
Work from the leaves up; each line uses only the meanings already computed for the sub-terms.

- $[\![\mathsf{0}]\!] = 0$, so $[\![\mathsf{succ}\ \mathsf{0}]\!] = 1$, $[\![\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})]\!] = \max(0, 0) = 0$ and $[\![\mathsf{iszero}\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))]\!] = \mathrm{tt}$.
- $[\![\mathsf{pred}\ \mathsf{0}]\!] = \max(-1, 0) = 0$ and $[\![\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})]\!] = 1$.
- The guard means $\mathrm{tt}$, so $[\![t]\!] = [\![\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})]\!] = 1$.

This agrees with [[#ex-trace]], where $t \to^* \mathsf{succ}\ \mathsf{0}$, whose reading is $1$. Notice that the denotation never mentions *steps*: the computation of $[\![t]\!]$ treated the guard and the then-branch in any order we liked, and the two sub-computations were independent.

For $u$: $[\![\mathsf{0}]\!] = 0$ is not $\mathrm{tt}$ or $\mathrm{ff}$, so $[\![\mathsf{if}\ \mathsf{0}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0}]\!] = \mathrm{wrong}$, and then $[\![u]\!] = \mathrm{wrong}$ because $\mathrm{wrong} \notin \N$. Operationally $u$ is stuck at once: E-IsZero needs the $\mathsf{if}$ to step, and no rule applies to an $\mathsf{if}$ whose guard is $\mathsf{0}$. Compositionality also tells us something without computing: any two terms with the same denotation can be exchanged inside any larger term without changing its denotation — $\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})$ can replace $\mathsf{0}$ anywhere.
:::
:::

To compare the denotation with evaluation we read each value as an element of $D$: $\overline{\mathsf{true}} = \mathrm{tt}$, $\overline{\mathsf{false}} = \mathrm{ff}$, and $\overline{nv} = n$ for the numeric value with $n$ occurrences of $\mathsf{succ}$. Different values have different readings.

::: theorem Adequacy {#thm-adequacy}
For every term $t$ and value $v$: $t \Downarrow v$ if and only if $[\![t]\!] = \overline{v}$. In particular $[\![t]\!] = \mathrm{wrong}$ exactly when $t$ evaluates to a stuck term.
:::

::: proof
($\Rightarrow$) By induction on the derivation of $t \Downarrow v$. B-Value: by induction on $v$, $[\![v]\!] = \overline{v}$ (for $\mathsf{succ}\ nv$: $[\![\mathsf{succ}\ nv]\!] = \overline{nv} + 1$). B-IfTrue: by the induction hypotheses $[\![t_1]\!] = \mathrm{tt}$ and $[\![t_2]\!] = \overline{v}$, so $[\![t]\!] = [\![t_2]\!] = \overline{v}$. B-Succ: $[\![t_1]\!] = \overline{nv} = n$ and $[\![\mathsf{succ}\ t_1]\!] = n + 1 = \overline{\mathsf{succ}\ nv}$. B-PredSucc: $[\![t_1]\!] = \overline{\mathsf{succ}\ nv} = n + 1$, so $[\![\mathsf{pred}\ t_1]\!] = n = \overline{nv}$. The other rules are the same calculation.

($\Leftarrow$) We prove, by structural induction on $t$, the statement: if $[\![t]\!] \ne \mathrm{wrong}$ then $t \Downarrow v$ for some value $v$ with $\overline{v} = [\![t]\!]$. Since readings of values are distinct, this $v$ is the one in the theorem. Constants: B-Value. $t = \mathsf{succ}\ t_1$: $[\![t]\!] \ne \mathrm{wrong}$ means $[\![t_1]\!] = n \in \N$; by the induction hypothesis $t_1 \Downarrow v_1$ with $\overline{v_1} = n$, so $v_1$ is a numeric value and B-Succ gives $t \Downarrow \mathsf{succ}\ v_1$, whose reading is $n + 1$. $t = \mathsf{pred}\ t_1$: $[\![t_1]\!] = n$; if $n = 0$ then $t_1 \Downarrow \mathsf{0}$ and B-PredZero gives $t \Downarrow \mathsf{0}$; if $n > 0$ then $t_1 \Downarrow \mathsf{succ}\ nv$ with $\overline{nv} = n - 1$ and B-PredSucc gives $t \Downarrow nv$. $\mathsf{iszero}$ is similar. $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$: $[\![t]\!] \ne \mathrm{wrong}$ forces $[\![t_1]\!] \in \set{\mathrm{tt}, \mathrm{ff}}$; if it is $\mathrm{tt}$, the induction hypothesis gives $t_1 \Downarrow \mathsf{true}$ and $t_2 \Downarrow v$ with $\overline{v} = [\![t_2]\!] = [\![t]\!]$, and B-IfTrue applies; $\mathrm{ff}$ is symmetric.

For the last sentence: by [[#thm-termination]] and [[#thm-determinacy]] the evaluation of $t$ ends in a unique normal form; by [[#thm-big-small]] and the equivalence just proved, that normal form is a value exactly when $[\![t]\!] \ne \mathrm{wrong}$.
:::

::: example Checking the theorems by brute force {#ex-brute}
The proofs are the real argument, but a machine check catches mistakes in the rules and in the code. Generate every NB term of depth at most $3$ and compare the three semantics.
::: solution
```python
from itertools import product
def terms(d):                       # all terms of depth <= d+1
    if d == 0: return [Tru(), Fls(), Zero()]
    smaller = terms(d - 1)
    out = list(smaller)
    for u in smaller: out += [Succ(u), Pred(u), IsZero(u)]
    for c, a, b in product(smaller, repeat=3): out.append(If(c, a, b))
    return list(dict.fromkeys(out))  # remove duplicates, keep order

ts = terms(2)
stuck = agree = 0
for t in ts:
    nf = list(trace(t))[-1]                       # small-step normal form
    try: big = evaluate(t)
    except Stuck: big = None
    d = denote(t)
    if is_value(nf):
        assert big == nf and as_py(nf) == d and type(as_py(nf)) is type(d)
        agree += 1
    else:
        assert big is None and d == WRONG
        stuck += 1
print(len(ts), "terms;", agree, "evaluate to values,", stuck, "get stuck")
```

```console
59439 terms; 14070 evaluate to values, 45369 get stuck
```

(`as_py` reads a value as a Python boolean or integer, the $\overline{v}$ of the theorem.) No assertion fails. The number of terms is $59439$ because there are $3 + 3 \cdot 3 + 3^3 = 39$ terms of depth at most $2$, and then $3 + 3 \cdot 39 + 39^3 = 59439$ when one more layer of constructors is put on top. Three quarters of all terms go wrong — a hint of why we want a type system.
:::
:::

::: warning "The semantics is whatever the implementation does"
It is tempting to treat a language's reference implementation as its definition. But an implementation fixes accidental details — the order in which C evaluates function arguments, what happens on integer overflow, how a particular compiler treats a race — that a definition deliberately leaves open, and it cannot tell you which behaviours are guaranteed. A formal semantics says what *every* correct implementation must do and where implementations may differ (C's "unspecified" and "undefined" behaviour are explicit gaps in its semantics). Conversely, a semantics is only useful if it matches reality: Standard ML (1990, revised 1997) was defined formally from the start, while for C, JavaScript and Python formal semantics (CompCert's C, KJS, λπ) were written decades later and found inconsistencies in implementations and in the prose standards.
:::

## Other ways to give meaning

The three styles answer different questions.

| style | meaning of a program | good for |
|---|---|---|
| small-step operational | a sequence of machine states | type safety, concurrency, non-termination, abstract machines |
| big-step operational | a relation between program and result | interpreters, compiler correctness for terminating code |
| denotational | a mathematical object, compositionally | equational reasoning, proving two programs equal, program analysis |
| axiomatic | the assertions a program makes true | program verification |

**Axiomatic semantics** defines a language by proof rules about what is true before and after a statement — the Hoare triples $\set{P}\,S\,\set{Q}$ of [[program-design/abstraction-specifications]]. It says nothing about how programs run, only what can be proved about them. For a language with loops and recursion, denotational semantics needs a theory of partial and infinite computations: the meaning of a recursive definition is the least fixed point of a continuous function on a **domain** (a partially ordered set with a least element $\bot$, "no information yet"), the theory created by Dana Scott. We meet fixed points concretely in [[programming-languages/lambda-calculus]].

The choice of style matters less than one might think, because results like [[#thm-big-small]] and [[#thm-adequacy]] connect them. A mature language definition often uses two: an operational semantics as the official definition, and a denotational or axiomatic one for reasoning.

::: history
John Backus's notation for the syntax of IAL (1959), refined by Peter Naur in the *Report on the Algorithmic Language ALGOL 60* (1960, revised 1963), made context-free grammars the standard way to define concrete syntax — the notation is called Backus–Naur form. Semantics took longer. John McCarthy's "Towards a mathematical science of computation" (1962) proposed abstract syntax and defining a language by an interpreter; Peter Landin's SECD machine (1964) gave an abstract machine for evaluating expressions; Robert Floyd (1967) and Tony Hoare (1969) founded axiomatic semantics. Christopher Strachey and Dana Scott developed denotational semantics in Oxford around 1969–1971 (Scott and Strachey, "Toward a mathematical semantics for computer languages", 1971), with Scott's domain theory supplying the mathematics. Gordon Plotkin's Aarhus lecture notes *A Structural Approach to Operational Semantics* (1981) introduced the rule-based small-step style used in this chapter, and Gilles Kahn's "Natural semantics" (1987) the big-step style. *The Definition of Standard ML* (Milner, Tofte and Harper, 1990) showed that a full, practical language could be defined this way.
:::

## Where this leads

The language NB has no names and no functions. [[programming-languages/lambda-calculus]] introduces a language that has nothing *but* functions and studies its reduction semantics; [[programming-languages/interpreters]] turns big-step rules into evaluators with environments; and [[programming-languages/type-systems]] adds a type system to NB and to the λ-calculus and proves that well-typed terms never become stuck, using the small-step semantics and the inversion and induction arguments of this chapter. Parsing concrete syntax into ASTs is the first phase of a compiler ([[compilers]]).

::: summary
- **Concrete syntax** is text, described by a grammar; **abstract syntax** is trees, and semantics is defined on trees ([[#def-ast]]). Terms are defined inductively, which gives **structural induction** and **structural recursion** ([[#thm-structural-induction]]).
- A **small-step operational semantics** is a set of inference rules defining $t \to t'$: computation rules do work, congruence rules fix where evaluation happens ([[#def-step]]).
- For NB, evaluation is **deterministic** ([[#thm-determinacy]]) and **terminating** ([[#thm-termination]]); every term ends in a value or a **stuck** term, the formal model of a run-time type error ([[#def-stuck]]).
- A **big-step semantics** relates a term directly to its value and reads as a recursive interpreter; it agrees with the small-step one: $t \Downarrow v \iff t \to^* v$ ([[#thm-big-small]]).
- A **denotational semantics** maps terms compositionally to mathematical objects; **adequacy** connects it to evaluation ([[#thm-adequacy]]).
- Proofs about semantics go by induction on terms or on derivations, case by case on the last rule — the method of every later chapter.
:::

## Exercises

::: exercise Counting steps {level=1 check="3"}
Evaluate $\mathsf{pred}\,(\mathsf{if}\ \mathsf{iszero}\ \mathsf{0}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0})$ with the small-step rules, naming the rules used in each step. (Enter the number of steps.)
::: solution
1. E-Pred(E-If(E-IsZeroZero)): $\mathsf{pred}\,(\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})\ \mathsf{else}\ \mathsf{0})$.
2. E-Pred(E-IfTrue): $\mathsf{pred}\,(\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0}))$.
3. E-PredSucc with $nv = \mathsf{succ}\ \mathsf{0}$: $\mathsf{succ}\ \mathsf{0}$, a value.

Three steps, consistent with the big-step derivation of [[#ex-bigstep]] and with [[#thm-termination]] (the term has size $8$, so at most $7$ steps were possible).
:::
:::

::: exercise Parse trees {level=1 check="5"}
With the ambiguous grammar $E \to E - E \mid n$, how many different abstract syntax trees does the string `1 - 2 - 3 - 4` have? How many different values do they give? (Enter the number of trees.)
::: solution
A tree for four operands is a binary tree with three internal nodes; the number of such trees is the Catalan number $C_3 = 5$. They are $((1-2)-3)-4 = -8$, $(1-(2-3))-4 = -2$, $(1-2)-(3-4) = 0$, $1-((2-3)-4) = 6$ and $1-(2-(3-4)) = -2$, giving four different values. A real grammar makes `-` left-associative so that only the first tree is produced.
:::
:::

::: exercise Values, normal forms and stuck terms {level=1}
Classify each term as a value, a non-value that steps (give the step), or stuck: (a) $\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0})$; (b) $\mathsf{iszero}\,(\mathsf{succ}\ \mathsf{true})$; (c) $\mathsf{if}\ \mathsf{false}\ \mathsf{then}\ \mathsf{true}\ \mathsf{else}\ \mathsf{succ}\ \mathsf{0}$; (d) $\mathsf{pred}\,(\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0}))$; (e) $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{false})$.
::: solution
(a) Steps by E-Succ(E-PredZero) to $\mathsf{succ}\ \mathsf{0}$. (b) Stuck: E-IsZeroSucc needs $\mathsf{succ}\ nv$ with $nv$ numeric, and E-IsZero needs $\mathsf{succ}\ \mathsf{true}$ to step, which needs $\mathsf{true}$ to step. (c) Steps by E-IfFalse to $\mathsf{succ}\ \mathsf{0}$. (d) Steps by E-PredSucc to $\mathsf{succ}\ \mathsf{0}$. (e) Stuck, for the same reason as (b); it is not a value because $\mathsf{false}$ is not a numeric value.
:::
:::

::: exercise How many terms? {level=2 check="59439"}
Let $s_k$ be the number of terms of depth at most $k$ (constants have depth $1$). Find a recurrence for $s_k$ and compute $s_3$, the number of terms checked in [[#ex-brute]]. (Enter $s_3$.)
::: solution
A term of depth at most $k + 1$ is a constant (3 choices), or $\mathsf{succ}$, $\mathsf{pred}$ or $\mathsf{iszero}$ applied to a term of depth at most $k$ ($3 s_k$ choices), or an $\mathsf{if}$ with three such sub-terms ($s_k^3$ choices). These are all different trees, so $s_{k+1} = 3 + 3 s_k + s_k^3$ with $s_1 = 3$. Hence $s_2 = 3 + 9 + 27 = 39$ and $s_3 = 3 + 117 + 59319 = 59439$, matching the program's output.
:::
:::

::: exercise A missing side condition {level=2}
Suppose E-PredSucc is replaced by the rule $\mathsf{pred}\,(\mathsf{succ}\ t_1) \to t_1$ for *any* term $t_1$. Show that [[#thm-determinacy]] fails. Does the final result of evaluation change for this term?
::: solution
Take $t = \mathsf{pred}\,(\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0}))$. The new rule gives $t \to \mathsf{pred}\ \mathsf{0}$. E-Pred, whose premise $\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0}) \to \mathsf{succ}\ \mathsf{0}$ holds by E-Succ(E-PredZero), gives $t \to \mathsf{pred}\,(\mathsf{succ}\ \mathsf{0})$. These differ, so one-step evaluation is no longer deterministic. Both continue to $\mathsf{0}$ — the result happens to be the same here — but with the modified rule $\mathsf{pred}\,(\mathsf{succ}\ \mathsf{true}) \to \mathsf{true}$, so a term that used to be stuck now evaluates to a boolean: the language has changed, and the side condition is what enforces call-by-value evaluation of the argument.
:::
:::

::: exercise Two derivations {level=2}
Show that $\mathsf{succ}\ \mathsf{0} \Downarrow \mathsf{succ}\ \mathsf{0}$ has two different derivations. Does this contradict the claim that big-step evaluation is deterministic, that is, $t \Downarrow v$ and $t \Downarrow w$ imply $v = w$? Prove that claim.
::: solution
One derivation is B-Value directly; the other is B-Succ applied to $\mathsf{0} \Downarrow \mathsf{0}$ (B-Value). The rules overlap on values of the form $\mathsf{succ}\ nv$, so derivations are not unique — but determinism is about *results*, not derivations. Proof: if $t \Downarrow v$ and $t \Downarrow w$, then by [[#thm-big-small]] $t \to^* v$ and $t \to^* w$. By [[#thm-determinacy]] there is only one evaluation sequence from $t$, and values are normal forms ([[#lem-values-normal]]), so both $v$ and $w$ are its last term: $v = w$. (A direct proof by induction on the derivation of $t \Downarrow v$ works too, using the second part of [[#lem-expansion]] in the overlapping case.)
:::
:::

::: exercise Adding addition {level=2}
Extend NB with a term $t_1 + t_2$. Give (a) small-step rules that evaluate the left operand first, then the right, then add; (b) a big-step rule; (c) the clause of the denotational semantics. Then extend `step` in Python and evaluate $(\mathsf{succ}\ \mathsf{0}) + (\mathsf{pred}\,(\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})))$.
::: solution
(a) Two congruence rules and two computation rules (adding in unary by moving `succ`s):

$$
\frac{t_1 \to t_1'}{t_1 + t_2 \to t_1' + t_2}
\qquad
\frac{t_2 \to t_2'}{nv_1 + t_2 \to nv_1 + t_2'}
\qquad
\frac{}{\mathsf{0} + nv_2 \to nv_2}
\qquad
\frac{}{\mathsf{succ}\ nv_1 + nv_2 \to \mathsf{succ}\,(nv_1 + nv_2)}
$$

The second rule fires only when the left operand is a numeric value, which fixes left-to-right order and keeps evaluation deterministic. (b) $\dfrac{t_1 \Downarrow nv_1 \quad t_2 \Downarrow nv_2}{t_1 + t_2 \Downarrow nv}$ where $nv$ is the numeric value with $\overline{nv} = \overline{nv_1} + \overline{nv_2}$. (c) $[\![t_1 + t_2]\!] = m + n$ if $[\![t_1]\!] = m \in \N$ and $[\![t_2]\!] = n \in \N$, and $\mathrm{wrong}$ otherwise.

```python
@dataclass(frozen=True)
class Add: l: object; r: object
# new cases in step, placed before the final raise:
        case Add(Zero(), r) if is_nv(r):          return r
        case Add(Succ(l), r) if is_nv(l) and is_nv(r): return Succ(Add(l, r))
        case Add(l, r) if is_nv(l):               return Add(l, step(r))
        case Add(l, r):                           return Add(step(l), r)
```

The example: $\mathsf{succ}\ \mathsf{0} + \mathsf{pred}\,(\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})) \to \mathsf{succ}\ \mathsf{0} + \mathsf{succ}\ \mathsf{0} \to \mathsf{succ}\,(\mathsf{0} + \mathsf{succ}\ \mathsf{0}) \to \mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$, the value $2$. Note that the third computation step uses E-Succ around the $\mathsf{0} + nv_2$ rule. [[#thm-termination]] no longer holds with the same size function (the $\mathsf{succ}$ rule does not shrink the term); a measure that counts each $+$ node with weight $1 + \operatorname{size}$ of its left operand repairs it.
:::
:::

::: exercise The termination bound is tight {level=3}
Show that for every $n \ge 1$ there is a term of size $n$ whose evaluation takes exactly $n - 1$ steps, so [[#thm-termination]] cannot be improved. Then show that for every $n \ge 3$ there is also a term of size $n$ that is stuck immediately (takes $0$ steps) and is not a value.
::: solution
Let $p_n = \mathsf{pred}^{\,n-1}\,\mathsf{0}$, that is, $n - 1$ applications of $\mathsf{pred}$ to $\mathsf{0}$; its size is $n$. By induction on $n$ it takes exactly $n - 1$ steps to reach $\mathsf{0}$: $p_1 = \mathsf{0}$ takes $0$ steps; for $n \ge 2$, $p_n = \mathsf{pred}\ p_{n-1}$, and while $p_{n-1}$ is not yet $\mathsf{0}$ every step of $p_n$ is E-Pred wrapped around a step of $p_{n-1}$ (by determinacy these are the only steps), which takes $n - 2$ steps to give $\mathsf{pred}\ \mathsf{0}$; one more step (E-PredZero) gives $\mathsf{0}$. Total $n - 1$.

For stuck terms: $\mathsf{succ}^{\,n-2}\,(\mathsf{succ}\ \mathsf{true})$ has size $n$, is not a value (it contains $\mathsf{true}$ under $\mathsf{succ}$) and is in normal form: by induction, each $\mathsf{succ}$ could step only if its argument could, and the innermost $\mathsf{succ}\ \mathsf{true}$ cannot.
:::
:::

::: exercise Evaluation contexts {level=3}
An alternative presentation of small-step semantics uses **evaluation contexts**, terms with one hole $[\,]$:

$$
E \;::=\; [\,] \mid \mathsf{if}\ E\ \mathsf{then}\ t\ \mathsf{else}\ t \mid \mathsf{succ}\ E \mid \mathsf{pred}\ E \mid \mathsf{iszero}\ E,
$$

with $E[t]$ the term obtained by putting $t$ in the hole, and a single congruence rule: if $r \to_c r'$ by one of the six computation rules, then $E[r] \to E[r']$. Prove that this defines the same relation $\to$ as [[#def-step]].
::: solution
($\subseteq$) Suppose $E[r] \to E[r']$ with $r \to_c r'$. By induction on $E$: if $E = [\,]$, the step is the computation rule itself. If $E = \mathsf{if}\ E_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$, the induction hypothesis gives $E_1[r] \to E_1[r']$ in the original system, and E-If lifts it to $E[r] \to E[r']$; the other context forms use E-Succ, E-Pred and E-IsZero.

($\supseteq$) By induction on the derivation of $t \to t'$ in the original system. A computation rule is the case $E = [\,]$. If the last rule is E-If, then $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ with $t_1 \to t_1'$; by the induction hypothesis $t_1 = E_1[r]$ and $t_1' = E_1[r']$ for some context $E_1$ and computation step $r \to_c r'$, so $t = E[r]$ and $t' = E[r']$ for $E = \mathsf{if}\ E_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$. The other congruence rules are the same.

The context grammar is a compact statement of the evaluation order: holes may appear in guards and arguments, never in branches. Felleisen and Hieb (1992) used this presentation to give simple semantics to control operators — the theme of [[programming-languages/control]] — because an evaluation context is exactly "the rest of the computation".
:::
:::
