Strip a programming language of everything that is not essential. Numbers can go: they can be represented by other things. Booleans and conditionals can go. Loops can go, since recursion replaces them; even named definitions can go. What is left, according to Alonzo Church, is a single idea — making a function from an expression by abstracting over a variable, and applying a function to an argument. The resulting language, the **λ-calculus** (lambda calculus), has three kinds of term and one computation rule, and yet it can express every computable function.

The λ-calculus matters to programmers for three reasons. It is the core of functional languages: Lisp, ML, Haskell, Scheme and the `lambda` of Python are its descendants, and their semantics are explained by translating them into it. It is the standard laboratory for language ideas: type systems ([[programming-languages/type-systems]]), type inference ([[programming-languages/type-inference]]), polymorphism and continuations are all defined first for a λ-calculus. And it makes precise the notions every programmer uses informally — free and bound variables, substitution, evaluation order — that the interpreters of [[programming-languages/interpreters]] must get right. This chapter defines the calculus, proves its key properties, shows how to encode data and recursion in it, and implements a reducer in Python.

## Terms, binding and substitution

::: definition λ-terms {#def-lambda-terms}
Given an infinite set of **variables** $x, y, z, \ldots$, the **λ-terms** are defined by

$$
t \;::=\; x \;\mid\; \lambda x.\,t \;\mid\; t\ t
$$

— a variable; an **abstraction** $\lambda x.\,t$, the function with **parameter** $x$ and **body** $t$; and an **application** $t_1\ t_2$, the function $t_1$ applied to the argument $t_2$.
:::

The notation is economical, so there are conventions for reading it. Application associates to the left: $f\ x\ y$ means $(f\ x)\ y$. The body of an abstraction extends as far to the right as possible: $\lambda x.\,x\ y$ means $\lambda x.\,(x\ y)$, not $(\lambda x.\,x)\ y$. Several abstractions are abbreviated: $\lambda x\,y.\,t$ means $\lambda x.\,\lambda y.\,t$. Functions take one argument; a function of two arguments is a function that returns a function (**currying**, as in [[program-design/higher-order-functions]]). The Python term `lambda x: lambda y: x` is $\lambda x\,y.\,x$.

There are no numbers and no built-in operations. The simplest terms are the identity $I = \lambda x.\,x$, the constant-function maker $K = \lambda x\,y.\,x$, self-application $\omega = \lambda x.\,x\ x$ and $\Omega = \omega\ \omega$.

::: definition Free and bound variables {#def-free}
An occurrence of $x$ in $\lambda x.\,t$ is **bound** by that abstraction, its **binder**. The set of **free variables** is

$$
\mathrm{FV}(x) = \set{x}, \qquad \mathrm{FV}(\lambda x.\,t) = \mathrm{FV}(t) \setminus \set{x}, \qquad \mathrm{FV}(t_1\ t_2) = \mathrm{FV}(t_1) \cup \mathrm{FV}(t_2).
$$

A term with no free variables is **closed**, or a **combinator**. An occurrence of $x$ refers to the nearest enclosing $\lambda x$; inner binders **shadow** outer ones, so in $\lambda x.\,\lambda x.\,x$ the $x$ in the body refers to the inner $\lambda x$.
:::

For instance $\mathrm{FV}(\lambda x.\,x\ (\lambda y.\,y\ z)\ y) = \set{y, z}$: the first $y$ is bound by $\lambda y$, the last one is free. A variable can occur both free and bound in one term.

The name of a bound variable does not matter: $\lambda x.\,x$ and $\lambda y.\,y$ are the same function, just as $\int_0^1 x^2\,dx = \int_0^1 y^2\,dy$ and `def f(x): return x` means the same as `def f(y): return y`.

::: definition α-equivalence {#def-alpha}
**α-conversion** renames a bound variable: $\lambda x.\,t$ becomes $\lambda y.\,t[x := y]$ when $y$ does not occur in $t$. Two terms are **α-equivalent**, $t \equiv_\alpha u$, if one can be turned into the other by α-conversions of sub-terms. From now on we identify α-equivalent terms.
:::

So $\lambda x\,y.\,x \equiv_\alpha \lambda y\,x.\,y$ (both return their first argument), but $\lambda x\,y.\,x \not\equiv_\alpha \lambda x\,y.\,y$, and $\lambda x.\,x\ z \not\equiv_\alpha \lambda z.\,z\ z$: renaming $x$ to $z$ would *capture* the free $z$. Capture is the central technical hazard of the subject.

::: definition Capture-avoiding substitution {#def-subst}
The result $t[x := s]$ of **substituting** $s$ for the free occurrences of $x$ in $t$ is defined by

$$
\begin{aligned}
x[x := s] &= s, \qquad y[x := s] = y \quad (y \ne x), \qquad (t_1\ t_2)[x := s] = t_1[x := s]\ t_2[x := s],\\
(\lambda x.\,t)[x := s] &= \lambda x.\,t,\\
(\lambda y.\,t)[x := s] &= \lambda y.\,t[x := s] \quad \text{if } y \ne x \text{ and } y \notin \mathrm{FV}(s),\\
(\lambda y.\,t)[x := s] &= \lambda z.\,t[y := z][x := s] \quad \text{if } y \ne x,\ y \in \mathrm{FV}(s), \text{ with } z \text{ fresh.}
\end{aligned}
$$

A **fresh** variable is one occurring nowhere in $s$, $t$ or $x$.
:::

The second line stops at a binder of $x$, because the occurrences of $x$ below it are not free. The last line renames the binder before substituting, so that the free variables of $s$ stay free. Without it, $(\lambda y.\,x)[x := y]$ would give $\lambda y.\,y$, turning a constant function into the identity. The rule is easy to state and easy to get wrong in code — Lisp's original implementation got it wrong, and mistakes in substitution are still a common bug in hand-written interpreters and macro expanders. In Python:

```python
from dataclasses import dataclass
import itertools

@dataclass(frozen=True)
class Var: name: str
@dataclass(frozen=True)
class Lam: param: str; body: object
@dataclass(frozen=True)
class App: fun: object; arg: object

def free_vars(t):
    match t:
        case Var(x):    return {x}
        case Lam(x, b): return free_vars(b) - {x}
        case App(f, a): return free_vars(f) | free_vars(a)

def fresh(x, avoid):
    for i in itertools.count(1):
        if f"{x}{i}" not in avoid:
            return f"{x}{i}"

def subst(t, x, s):
    """Capture-avoiding substitution t[x := s]."""
    match t:
        case Var(y):                   return s if y == x else t
        case App(f, a):                return App(subst(f, x, s), subst(a, x, s))
        case Lam(y, b) if y == x:      return t           # x is shadowed
        case Lam(y, b) if y not in free_vars(s):
                                       return Lam(y, subst(b, x, s))
        case Lam(y, b):                                   # rename y first
            z = fresh(y, free_vars(s) | free_vars(b) | {x})
            return Lam(z, subst(subst(b, y, Var(z)), x, s))
```

```console
>>> show(subst(parse("λy. x y"), "x", parse("y")))
'λy1. y y1'
```

The free `y` being substituted stays free; the bound `y` was renamed `y1`. (`parse` and `show` convert between the λ-notation above and these data classes.)

## β-reduction

::: definition β-reduction {#def-beta}
A **β-redex** is a term of the form $(\lambda x.\,t)\ s$; its **contractum** is $t[x := s]$. The **one-step β-reduction** relation $t \to_\beta t'$ holds when $t'$ is obtained from $t$ by replacing *any one* redex inside it by its contractum:

$$
\frac{}{(\lambda x.\,t)\ s \to_\beta t[x := s]}
\qquad
\frac{t \to_\beta t'}{\lambda x.\,t \to_\beta \lambda x.\,t'}
\qquad
\frac{t_1 \to_\beta t_1'}{t_1\ t_2 \to_\beta t_1'\ t_2}
\qquad
\frac{t_2 \to_\beta t_2'}{t_1\ t_2 \to_\beta t_1\ t_2'}
$$

$\to_\beta^*$ is its reflexive–transitive closure, and **β-equivalence** $=_\beta$ is the smallest equivalence relation containing $\to_\beta$. A term with no redex is in **β-normal form**.
:::

β-reduction is the λ-calculus version of "call a function": replace the parameter by the argument in the body. Unlike the semantics of [[programming-languages/syntax-semantics]], the rules allow reduction *anywhere*, including inside abstractions and in arguments not yet needed; the relation is not deterministic. There is also a second rule, **η-reduction**, $\lambda x.\,t\ x \to_\eta t$ when $x \notin \mathrm{FV}(t)$, expressing that a function is determined by its results (in Python, `lambda x: f(x)` behaves as `f`); we use only β unless we say so.

::: example Reducing terms {#ex-reduce}
Reduce to normal form, if possible: (a) $(\lambda x\,y.\,x)\ a\ b$; (b) $(\lambda x\,y.\,x)\ y$; (c) $\Omega = (\lambda x.\,x\ x)\,(\lambda x.\,x\ x)$; (d) $(\lambda x.\,z)\ \Omega$.
::: solution
(a) $(\lambda x\,y.\,x)\ a\ b = ((\lambda x.\,\lambda y.\,x)\ a)\ b \to_\beta (\lambda y.\,a)\ b \to_\beta a$. The function $K$ returns its first argument.

(b) $(\lambda x.\,\lambda y.\,x)\ y \to_\beta (\lambda y.\,x)[x := y]$. The binder $y$ is free in the argument, so it is renamed: the result is $\lambda y_1.\,y$, a constant function returning the free $y$. The naive answer $\lambda y.\,y$ is wrong.

(c) $\Omega \to_\beta (x\ x)[x := \lambda x.\,x\ x] = \Omega$. The only redex reproduces the term, so $\Omega \to_\beta \Omega \to_\beta \cdots$ for ever: $\Omega$ has no normal form. A λ-term can run for ever even without any looping construct.

(d) There are two redexes: the outer one, and the one inside $\Omega$. Contracting the outer one discards the argument: $(\lambda x.\,z)\ \Omega \to_\beta z$, a normal form. Contracting the inner one gives $(\lambda x.\,z)\ \Omega$ again. So the *choice* of redex decides whether we reach the normal form.
:::
:::

### Confluence

Part (d) raises a worry. If different choices of redex can lead to different places, could a term have two different normal forms — two different "answers"? The fundamental theorem of the λ-calculus says no.

::: theorem Church–Rosser {#thm-church-rosser}
If $t \to_\beta^* u_1$ and $t \to_\beta^* u_2$, then there is a term $w$ with $u_1 \to_\beta^* w$ and $u_2 \to_\beta^* w$. (The relation $\to_\beta$ is **confluent**.)
:::

The obvious proof attempt fails: one-step reduction does not have the "diamond property" that two single steps can be completed by single steps to a common term. In $(\lambda x.\,x\ x)\,(I\ I)$, contracting the outer redex copies the inner redex $I\ I$ twice, and both copies then need reducing. The proof below, due to William Tait and Per Martin-Löf, in the streamlined form of Masako Takahashi (1995), replaces one-step reduction by a relation that contracts many redexes at once.

::: definition Parallel reduction {#def-parallel}
The **parallel reduction** relation $t \Rightarrow t'$ is defined by

$$
\frac{}{x \Rightarrow x}
\qquad
\frac{t \Rightarrow t'}{\lambda x.\,t \Rightarrow \lambda x.\,t'}
\qquad
\frac{t_1 \Rightarrow t_1' \quad t_2 \Rightarrow t_2'}{t_1\ t_2 \Rightarrow t_1'\ t_2'}
\qquad
\frac{t \Rightarrow t' \quad s \Rightarrow s'}{(\lambda x.\,t)\ s \Rightarrow t'[x := s']}
$$

The **complete development** $t^*$ contracts every redex present in $t$: $x^* = x$, $(\lambda x.\,t)^* = \lambda x.\,t^*$, $((\lambda x.\,t)\ s)^* = t^*[x := s^*]$, and $(t_1\ t_2)^* = t_1^*\ t_2^*$ when $t_1$ is not an abstraction.
:::

::: proof Proof of [[#thm-church-rosser]]
*Step 1: $\to_\beta \subseteq {\Rightarrow} \subseteq \to_\beta^*$, hence $\Rightarrow^* = \to_\beta^*$.* By induction on terms, $t \Rightarrow t$ for every $t$. A single β-step contracts one redex and leaves everything else alone, which is a parallel step using $t \Rightarrow t$ everywhere else. Conversely a parallel step contracts finitely many redexes, which can be done one at a time (induction on the derivation of $t \Rightarrow t'$).

*Step 2: substitution.* If $t \Rightarrow t'$ and $s \Rightarrow s'$ then $t[x := s] \Rightarrow t'[x := s']$. By induction on the derivation of $t \Rightarrow t'$. The variable case is immediate ($x$ gives $s \Rightarrow s'$; another variable is unchanged); abstraction and application follow from the induction hypothesis (renaming bound variables apart first). For the last rule, $t = (\lambda y.\,u)\ v \Rightarrow u'[y := v'] = t'$, and the induction hypothesis gives $u[x := s] \Rightarrow u'[x := s']$ and $v[x := s] \Rightarrow v'[x := s']$; applying the β-rule of $\Rightarrow$,

$$
t[x := s] = (\lambda y.\,u[x := s])\ v[x := s] \Rightarrow u'[x := s'][y := v'[x := s']] = u'[y := v'][x := s'] = t'[x := s'],
$$

where the middle equation is the standard substitution lemma $u[x := a][y := b[x := a]] = u[y := b][x := a]$ for $y \ne x$, $y \notin \mathrm{FV}(a)$, proved by a routine induction on $u$.

*Step 3: the triangle.* If $t \Rightarrow t'$ then $t' \Rightarrow t^*$. By induction on the derivation of $t \Rightarrow t'$. Variable: $x \Rightarrow x = x^*$. Abstraction: from the induction hypothesis. β-rule: $t = (\lambda x.\,u)\ s$ and $t' = u'[x := s']$ with $u \Rightarrow u'$, $s \Rightarrow s'$; by induction $u' \Rightarrow u^*$ and $s' \Rightarrow s^*$, so Step 2 gives $t' \Rightarrow u^*[x := s^*] = t^*$. Application $t_1\ t_2 \Rightarrow t_1'\ t_2'$: if $t_1$ is not an abstraction, $t^* = t_1^*\ t_2^*$ and the induction hypothesis with the application rule suffices. If $t_1 = \lambda x.\,u$, then $t_1' = \lambda x.\,u'$ with $u \Rightarrow u'$ (only the abstraction rule applies to an abstraction), and by induction $u' \Rightarrow u^*$ and $t_2' \Rightarrow t_2^*$; the β-rule of $\Rightarrow$ gives $(\lambda x.\,u')\ t_2' \Rightarrow u^*[x := t_2^*] = t^*$.

*Step 4: diamond and tiling.* By Step 3, if $t \Rightarrow u_1$ and $t \Rightarrow u_2$ then both $u_1 \Rightarrow t^*$ and $u_2 \Rightarrow t^*$: the relation $\Rightarrow$ has the diamond property. A relation with the diamond property has a confluent reflexive–transitive closure — given $t \Rightarrow^m u_1$ and $t \Rightarrow^n u_2$, fill in an $m \times n$ grid of diamonds, one square at a time, by induction on $m + n$. By Step 1, $\Rightarrow^* = \to_\beta^*$, so $\to_\beta$ is confluent.
:::

::: corollary Uniqueness of normal forms {#cor-unique-nf}
A term has at most one β-normal form (up to α-equivalence). Moreover, if $t =_\beta u$ and $u$ is in normal form, then $t \to_\beta^* u$.
:::

::: proof
First, $t =_\beta u$ implies that $t$ and $u$ have a common reduct. The relation $=_\beta$ is generated by chains $t = t_0, t_1, \ldots, t_n = u$ in which each consecutive pair is related by $\to_\beta$ in one direction or the other; we induct on $n$. For $n = 0$ take $w = t$. Otherwise, by the induction hypothesis $t \to_\beta^* w'$ and $t_{n-1} \to_\beta^* w'$ for some $w'$. If $t_n \to_\beta t_{n-1}$, then $t_n \to_\beta^* w'$ and $w'$ is a common reduct of $t$ and $u$. If $t_{n-1} \to_\beta t_n$, then [[#thm-church-rosser]] applied to $t_{n-1} \to^* w'$ and $t_{n-1} \to^* t_n$ gives $w$ with $w' \to^* w$ and $t_n \to^* w$, and $t \to^* w' \to^* w$. If $u$ is a normal form, the only reduct of $u$ is $u$ itself, so $w = u$ and $t \to_\beta^* u$. If $t$ has two normal forms $u_1, u_2$, then $u_1 =_\beta u_2$, so they have a common reduct, which must equal both: $u_1 = u_2$.
:::

So the λ-calculus is a consistent theory of computation: the "answer" (normal form) of a term, if it exists, does not depend on how we compute it. It is also non-trivial: $\lambda x\,y.\,x \ne_\beta \lambda x\,y.\,y$, since they are distinct normal forms. Confluence does *not* say that every reduction order finds the normal form; [[#ex-reduce]](d) shows one that never does.

::: widget graph
nodes: A@0,2; B@1,3; C@1,1; D@2,3.5; E@2,2.5; F@3,2; G@4,2
edges: A>B; A>C; B>D; B>E; C>F; D>F; E>F; F>G
algorithm: bfs
start: A
caption: The complete β-reduction graph of $A = (\lambda x.\,x\ x)\,(I\ I)$ with $I = \lambda z.\,z$, up to α-equivalence (computed by enumerating all redexes in Python). $B = (I\ I)\,(I\ I)$, $C = (\lambda x.\,x\ x)\ I$, $D = I\,(I\ I)$, $E = (I\ I)\ I$, $F = I\ I$, $G = I$. Every path ends at $G$, as confluence demands, but the one-step diamond fails: from $B$ and $C$ the nearest common reduct is $F$, one step from $C$ and two from $B$. Run breadth-first search to see the shortest reduction (three steps, through $C$) — contracting the argument first saved copying the work.
:::

## Evaluation strategies

A **reduction strategy** chooses which redex to contract. Programming languages fix one; it is part of their semantics.

::: definition Reduction strategies {#def-strategies}
- **Normal order**: always contract the leftmost, outermost redex (the one whose $\lambda$ is leftmost in the text), including under abstractions.
- **Applicative order**: contract the leftmost, innermost redex — arguments are reduced to normal form before the function is applied.
- **Call-by-name**: normal order, but never reduce inside an abstraction; an abstraction is a final value.
- **Call-by-value**: contract $(\lambda x.\,t)\ v$ only when the argument $v$ is a **value** (here: an abstraction); evaluate the function, then the argument, left to right, and never inside an abstraction.
:::

Call-by-value is the strategy of Python, OCaml, Scheme, Java and most languages; call-by-name, refined by sharing into **call-by-need** ("lazy evaluation"), is Haskell's. The last two are *weak* strategies — they stop at an abstraction even if its body contains redexes, just as Python does not run the body of `lambda: 1/0` until it is called.

::: theorem Standardisation (Curry and Feys, 1958) {#thm-standardisation}
If a term has a β-normal form, then normal-order reduction reaches it.
:::

We omit the proof, which is a careful analysis of how redexes are created and copied (see Barendregt, *The Lambda Calculus*, §11.4). Normal order is safe because it never reduces an argument that the function discards. Applicative order and call-by-value are not: on $(\lambda x.\,z)\ \Omega$ they reduce $\Omega$ for ever. The price of normal order is duplicated work: in $(\lambda x.\,x\ x)\,(I\ I)$ it contracts the outer redex first, copying $I\ I$, and then reduces both copies (four steps instead of three). Call-by-need keeps the safety and avoids the copying by sharing the argument and evaluating it at most once.

A normal-order reducer is a direct transcription of the definition. It tries the outermost redex, then the function part, then the argument, then the body:

```python
def step_normal(t):
    """One normal-order step, or None if t is in normal form."""
    match t:
        case App(Lam(x, b), a):
            return subst(b, x, a)
        case App(f, a):
            f2 = step_normal(f)
            if f2 is not None: return App(f2, a)
            a2 = step_normal(a)
            return None if a2 is None else App(f, a2)
        case Lam(x, b):
            b2 = step_normal(b)
            return None if b2 is None else Lam(x, b2)
        case Var(_):
            return None

def normalise(t, limit=100000):
    n = 0
    while (t2 := step_normal(t)) is not None:
        t, n = t2, n + 1
        if n >= limit: raise RuntimeError("no normal form found")
    return t, n
```

The `limit` is necessary: by the undecidability results of [[theory-of-computation/decidability]], no program can decide whether a λ-term has a normal form — this was in fact the first undecidable problem, proved by Church in 1936.

::: quiz
Which strategies reach the normal form $y$ of $(\lambda x.\,y)\,((\lambda z.\,z\ z)\,(\lambda z.\,z\ z))$?
- [x] Normal order
- [x] Call-by-name
- [ ] Applicative order
- [ ] Call-by-value
::: solution
Normal order and call-by-name contract the outer redex first, which discards the argument $\Omega$ and gives $y$ in one step. Applicative order and call-by-value insist on reducing the argument first, and $\Omega$ reduces only to itself, so they never finish. By [[#thm-standardisation]], normal order succeeds whenever any strategy does.
:::
:::

## Programming in the λ-calculus

Everything else in a programming language can be *encoded* with functions alone. The idea is to represent a piece of data by what it can *do*: a boolean chooses between two alternatives, a pair hands its components to a function, a number $n$ applies a function $n$ times.

### Booleans and pairs

$$
\mathsf{true} = \lambda t\,f.\,t, \qquad \mathsf{false} = \lambda t\,f.\,f, \qquad \mathsf{if} = \lambda b\,x\,y.\,b\ x\ y,
$$

$$
\mathsf{pair} = \lambda a\,b\,s.\,s\ a\ b, \qquad \mathsf{fst} = \lambda p.\,p\ \mathsf{true}, \qquad \mathsf{snd} = \lambda p.\,p\ \mathsf{false}.
$$

Then $\mathsf{if}\ \mathsf{true}\ M\ N \to_\beta^* \mathsf{true}\ M\ N \to_\beta^* M$, and $\mathsf{fst}\,(\mathsf{pair}\ M\ N) \to_\beta^* \mathsf{pair}\ M\ N\ \mathsf{true} \to_\beta^* \mathsf{true}\ M\ N \to_\beta^* M$. Under normal order, $\mathsf{if}\ \mathsf{true}\ M\ N$ never evaluates $N$ — the conditional is lazy for free.

### Church numerals

::: definition Church numerals {#def-church-numerals}
The **Church numeral** for $n \in \N$ is $c_n = \lambda f\,x.\,f^n\,x$, where $f^0\,x = x$ and $f^{n+1}\,x = f\,(f^n\,x)$. So $c_0 = \lambda f\,x.\,x$, $c_1 = \lambda f\,x.\,f\ x$, $c_2 = \lambda f\,x.\,f\,(f\ x)$. Arithmetic is defined by

$$
\begin{aligned}
\mathsf{succ} &= \lambda n\,f\,x.\,f\,(n\ f\ x), &
\mathsf{plus} &= \lambda m\,n\,f\,x.\,m\ f\,(n\ f\ x), &
\mathsf{times} &= \lambda m\,n\,f.\,m\,(n\ f),\\
\mathsf{iszero} &= \lambda n.\,n\,(\lambda z.\,\mathsf{false})\ \mathsf{true}, &
\mathsf{pred} &= \lambda n.\,\mathsf{fst}\,(n\ \Phi\ (\mathsf{pair}\ c_0\ c_0)), &
\Phi &= \lambda p.\,\mathsf{pair}\,(\mathsf{snd}\ p)\,(\mathsf{succ}\,(\mathsf{snd}\ p)).
\end{aligned}
$$
:::

A function $F$ on numbers is **λ-definable** if there is a term $\overline{F}$ with $\overline{F}\ c_{n_1} \cdots c_{n_k} =_\beta c_{F(n_1, \ldots, n_k)}$. We prove two cases; the rest follow the same pattern.

::: lemma Iteration {#lem-iterate}
For all terms $F, X$ and all $n$: $c_n\ F\ X \to_\beta^* F^n\,X$.
:::

::: proof
$c_n\ F\ X = (\lambda f.\,\lambda x.\,f^n\,x)\ F\ X \to_\beta (\lambda x.\,F^n\,x)\ X \to_\beta F^n\,X$, choosing the bound variables fresh for $F$ and $X$ (α-conversion), so that no renaming is triggered.
:::

::: theorem Addition and multiplication are λ-definable {#thm-arith}
For all $m, n \in \N$: $\mathsf{plus}\ c_m\ c_n \to_\beta^* c_{m+n}$ and $\mathsf{times}\ c_m\ c_n \to_\beta^* c_{mn}$.
:::

::: proof
*Addition.* Two β-steps give $\mathsf{plus}\ c_m\ c_n \to_\beta^* \lambda f\,x.\,c_m\ f\,(c_n\ f\ x)$. Inside the body, [[#lem-iterate]] reduces $c_n\ f\ x$ to $f^n\,x$, and then reduces $c_m\ f\,(f^n\,x)$ to $f^m\,(f^n\,x) = f^{m+n}\,x$. So the term reduces to $\lambda f\,x.\,f^{m+n}\,x = c_{m+n}$.

*Multiplication.* Two β-steps give $\lambda f.\,c_m\,(c_n\ f)$, and one more inside, $c_m\,(c_n\ f) \to_\beta \lambda x.\,(c_n\ f)^m\,x$. We show by induction on $k$ that $(c_n\ f)^k\,x \to_\beta^* f^{nk}\,x$. For $k = 0$ both sides are $x$. For $k + 1$: $(c_n\ f)^{k+1}\,x = c_n\ f\,((c_n\ f)^k\,x) \to_\beta^* c_n\ f\,(f^{nk}\,x)$ by the induction hypothesis (reducing inside the argument), and [[#lem-iterate]] gives $f^n\,(f^{nk}\,x) = f^{n(k+1)}\,x$. With $k = m$, the term reduces to $\lambda f\,x.\,f^{mn}\,x = c_{mn}$.
:::

The predecessor is harder, because a numeral can only apply a function more times, never fewer. Kleene's trick, found (according to his own account) at the dentist's in 1932, counts pairs: $\Phi$ maps $(a, b)$ to $(b, b + 1)$, so $n$ applications to $(0, 0)$ give $(n - 1, n)$ for $n \ge 1$ (and $(0, 0)$ for $n = 0$), and $\mathsf{fst}$ extracts $n - 1$.

::: example The predecessor of two, by hand {#ex-pred-hand}
Show that $\mathsf{pred}\ c_2 =_\beta c_1$, reasoning at the level of pairs rather than writing out every term.
::: solution
First a fact about $\Phi$: for any terms $a, b$,

$$
\Phi\,(\mathsf{pair}\ a\ b) \to_\beta \mathsf{pair}\,(\mathsf{snd}\,(\mathsf{pair}\ a\ b))\,(\mathsf{succ}\,(\mathsf{snd}\,(\mathsf{pair}\ a\ b))) \to_\beta^* \mathsf{pair}\ b\ (\mathsf{succ}\ b),
$$

using $\mathsf{snd}\,(\mathsf{pair}\ a\ b) \to_\beta^* b$ twice. Now

$$
\begin{aligned}
\mathsf{pred}\ c_2 &\to_\beta \mathsf{fst}\,(c_2\ \Phi\ (\mathsf{pair}\ c_0\ c_0)) \to_\beta^* \mathsf{fst}\,(\Phi\,(\Phi\,(\mathsf{pair}\ c_0\ c_0)))\\
&\to_\beta^* \mathsf{fst}\,(\Phi\,(\mathsf{pair}\ c_0\ (\mathsf{succ}\ c_0))) \to_\beta^* \mathsf{fst}\,(\mathsf{pair}\,(\mathsf{succ}\ c_0)\,(\mathsf{succ}\,(\mathsf{succ}\ c_0)))\\
&\to_\beta^* \mathsf{succ}\ c_0 \to_\beta^* c_1.
\end{aligned}
$$

The second step uses [[#lem-iterate]]. The last step is $\mathsf{succ}\ c_0 = (\lambda n\,f\,x.\,f\,(n\ f\ x))\,(\lambda f\,x.\,x) \to \lambda f\,x.\,f\,((\lambda f\,x.\,x)\ f\ x) \to^* \lambda f\,x.\,f\ x$. We reasoned with sub-terms in an order of our choosing; [[#thm-church-rosser]] guarantees that any other order, such as the reducer's normal order, ends at the same normal form $c_1$. The reducer needs $26$ steps for this term.
:::
:::

::: example Running Church arithmetic {#ex-church-run}
Load the definitions into the normal-order reducer and compute $2 + 3$, $2 \times 3$ and the predecessor of $3$, counting the steps.
::: solution
Each definition is parsed and the earlier definitions are substituted for their names, so that $\mathsf{pred}$ becomes one large closed term. `num(k)` builds $c_k$ and `unnum` reads a numeral back.

```python
define("zero",  r"λf x. x")
define("succ",  r"λn f x. f (n f x)")
define("plus",  r"λm n f x. m f (n f x)")
define("times", r"λm n f. m (n f)")
define("true",  r"λt f. t");  define("false", r"λt f. f")
define("pair",  r"λa b s. s a b")
define("fst",   r"λp. p true");  define("snd", r"λp. p false")
define("pred",  r"λn. fst (n (λp. pair (snd p) (succ (snd p))) (pair zero zero))")
for name, args in [("plus", (2, 3)), ("times", (2, 3)), ("pred", (3,))]:
    t = defs[name]
    for a in args: t = App(t, num(a))
    nf, n = normalise(t)
    print(f"{name}{args}: {unnum(nf)} in {n} steps")
```

```console
plus(2, 3): 5 in 6 steps
times(2, 3): 6 in 7 steps
pred(3,): 2 in 36 steps
```

By [[#cor-unique-nf]], the answers do not depend on the strategy; only the step counts do. For $\mathsf{plus}$ the six steps are the two that substitute $c_2$ and $c_3$, then two for $c_2\ f\ (\ldots)$ and two for $c_3\ f\ x$ — the proof of [[#thm-arith]] step by step.
:::
:::

::: widget plot
f: 10*x + 6
x: 0, 8
y: 0, 90
labels: 10n + 6
points: 0,9; 1,16; 2,26; 3,36; 4,46; 5,56; 6,66; 7,76; 8,86
caption: Normal-order β-steps needed to compute $\mathsf{pred}\ c_n$ with Kleene's definition, measured with the reducer above (dots) for $n = 0, \ldots, 8$. From $n = 1$ the count is exactly $10n + 6$: each of the $n$ applications of $\Phi$ costs a fixed number of steps. The predecessor of a Church numeral costs time linear in $n$ — a reminder that encodings prove *expressiveness*, not efficiency, which is why real languages build in numbers.
:::

### Recursion and fixed points

To write factorial we want $\mathsf{fact} = \lambda n.\,\mathsf{if}\,(\mathsf{iszero}\ n)\ c_1\ (\mathsf{times}\ n\ (\mathsf{fact}\,(\mathsf{pred}\ n)))$, but λ-terms cannot refer to themselves by name. Abstract over the recursive call instead: $G = \lambda r\,n.\,\mathsf{if}\,(\mathsf{iszero}\ n)\ c_1\ (\mathsf{times}\ n\ (r\,(\mathsf{pred}\ n)))$. What we want is a term $\mathsf{fact}$ with $\mathsf{fact} =_\beta G\ \mathsf{fact}$ — a **fixed point** of $G$.

::: theorem Fixed point theorem {#thm-fixed-point}
Let $Y = \lambda f.\,(\lambda x.\,f\,(x\ x))\,(\lambda x.\,f\,(x\ x))$. For every term $F$, $Y\ F =_\beta F\,(Y\ F)$. Hence every λ-term has a fixed point.
:::

::: proof
Let $W = \lambda x.\,F\,(x\ x)$, choosing $x \notin \mathrm{FV}(F)$. Then $Y\ F \to_\beta W\ W \to_\beta F\,(W\ W)$. Also $F\,(Y\ F) \to_\beta F\,(W\ W)$, by reducing inside the argument. The two terms have the common reduct $F\,(W\ W)$, so $Y\ F =_\beta F\,(Y\ F)$.
:::

Note that $Y\ F$ does not *reduce* to $F\,(Y\ F)$; they only meet. (Turing's combinator $\Theta$, in the exercises, does reduce to it.) With $\mathsf{fact} = Y\ G$ we get $\mathsf{fact}\ c_n =_\beta G\ \mathsf{fact}\ c_n$, which unfolds one level of the recursion each time it is needed. Under normal order, $\mathsf{fact}\ c_3$ reaches $c_6$ in $1495$ steps.

Under call-by-value, $Y$ is useless: $Y\ G \to W\ W \to G\,(W\ W)$, and the argument $W\ W$ is not a value, so call-by-value reduces it, giving $G\,(G\,(W\ W))$, and so on for ever. The fix is to η-expand the self-application so that it becomes a value and is unfolded only when called:

$$
Z = \lambda f.\,(\lambda x.\,f\,(\lambda v.\,x\ x\ v))\,(\lambda x.\,f\,(\lambda v.\,x\ x\ v)).
$$

::: example Fixed points in Python {#ex-z-python}
Python is call-by-value and its `lambda` is the λ-calculus abstraction. Compute $10!$ with no named recursion using $Z$, and see what happens with $Y$. Also check the Church numerals.
::: solution
```python
zero  = lambda f: lambda x: x
succ  = lambda n: lambda f: lambda x: f(n(f)(x))
plus  = lambda m: lambda n: lambda f: lambda x: m(f)(n(f)(x))
times = lambda m: lambda n: lambda f: m(n(f))
to_int = lambda n: n(lambda k: k + 1)(0)      # apply "+1" n times to 0
two, three = succ(succ(zero)), succ(succ(succ(zero)))
print(to_int(plus(two)(three)), to_int(times(two)(three)), to_int(three(times(two))(succ(zero))))

Z = lambda f: (lambda x: f(lambda v: x(x)(v)))(lambda x: f(lambda v: x(x)(v)))
fact = Z(lambda r: lambda n: 1 if n == 0 else n * r(n - 1))
print(fact(10))
Y = lambda f: (lambda x: f(x(x)))(lambda x: f(x(x)))
try:
    Y(lambda r: lambda n: 1 if n == 0 else n * r(n - 1))
except RecursionError as e:
    print("RecursionError:", e)
```

```console
5 6 8
3628800
RecursionError: maximum recursion depth exceeded
```

`three(times(two))(succ(zero))` applies "multiply by $2$" three times to $1$, giving $2^3 = 8$. The definition of `fact` contains no reference to `fact`: `r` is the recursive call, supplied by `Z`. With `Y`, Python evaluates `x(x)` as soon as `Y` is applied — before `f` is ever called — and recurses until the stack overflows. In our call-by-value reducer the same happens symbolically: after $30$ steps the term $Y\ G'\ c_3$ (with $G'$ the factorial body) has grown to $3677$ nodes and keeps growing, while with $Z$ (and the branches of the conditional wrapped in $\lambda d.\,\ldots$ so that call-by-value does not evaluate both) $\mathsf{fact}\ c_3$ reaches a value in $164$ steps.
:::
:::

::: warning The λ-calculus is not "just Python's lambda"
Python's `lambda` is call-by-value, never reduces under a binder, and lives in a language with mutable variables, so its closures capture *variables*, not values (the late-binding surprise of [[program-design/higher-order-functions]]). The pure λ-calculus has no assignment at all, allows reduction anywhere, and identifies α-equivalent terms. Equations that hold in the calculus, such as $(\lambda x.\,z)\ M =_\beta z$ for every $M$, fail in Python when $M$ loops or raises an exception. When you use the calculus to reason about a real language, use the variant with that language's strategy (the call-by-value λ-calculus of Plotkin, 1975, for Python or ML).
:::

### Expressive power

Combining numerals, pairs, conditionals and $Y$, every partial recursive function is λ-definable (Kleene, 1936), and Turing (1937) showed that the λ-definable functions are exactly the Turing-computable ones. The λ-calculus and the Turing machine of [[theory-of-computation/turing-machines]] define the same class of functions: this agreement is the evidence behind the Church–Turing thesis.

::: history
Alonzo Church introduced the λ-notation around 1928–1932 as part of a foundation for logic, which his students Stephen Kleene and J. Barkley Rosser showed to be inconsistent in 1935; the pure λ-calculus survived. Church and Rosser proved confluence in "Some properties of conversion" (1936), and Church's "An unsolvable problem of elementary number theory" (1936) used the calculus to give the first undecidable problem. Church's monograph *The Calculi of Lambda-Conversion* (1941) and his simply typed calculus ("A formulation of the simple theory of types", 1940) followed. Haskell Curry developed the closely related combinatory logic, and Curry and Feys's *Combinatory Logic* (1958) proved standardisation. John McCarthy's LISP (1960) borrowed the λ-notation; Peter Landin ("The mechanical evaluation of expressions", 1964, and "A correspondence between ALGOL 60 and Church's lambda-notation", 1965) showed how to explain real programming languages by translation into it, and Dana Scott gave it a mathematical model in 1969. Henk Barendregt's *The Lambda Calculus: Its Syntax and Semantics* (1981, revised 1984) is the standard reference.
:::

## Where this leads

[[programming-languages/interpreters]] implements the call-by-value λ-calculus efficiently, replacing substitution by environments and closures. [[programming-languages/scope-binding]] returns to bound variables, shadowing and capture in real languages, and introduces de Bruijn indices, a nameless representation that makes α-equivalence syntactic equality. [[programming-languages/type-systems]] adds types; in the simply typed calculus $\Omega$ and $Y$ cannot be typed and every term has a normal form. The continuation-passing style of [[programming-languages/control]] is a λ-calculus transformation.

::: summary
- λ-terms are variables, abstractions $\lambda x.\,t$ and applications $t\ t$ ([[#def-lambda-terms]]); bound names do not matter (**α-equivalence**, [[#def-alpha]]).
- **Substitution** must avoid capturing free variables, renaming binders when necessary ([[#def-subst]]); **β-reduction** contracts $(\lambda x.\,t)\ s$ to $t[x := s]$ anywhere in a term ([[#def-beta]]).
- **Church–Rosser**: β-reduction is confluent ([[#thm-church-rosser]]), so normal forms are unique ([[#cor-unique-nf]]); not every term has one ($\Omega$).
- Strategies: **normal order** finds the normal form when one exists ([[#thm-standardisation]]); **call-by-value** (most languages) and **call-by-name/need** (Haskell) are weak strategies that stop at abstractions.
- Data can be encoded as functions: booleans choose, pairs hand over their components, **Church numerals** iterate ([[#def-church-numerals]], [[#thm-arith]]).
- Recursion comes from fixed-point combinators: $Y\ F =_\beta F\,(Y\ F)$ ([[#thm-fixed-point]]); call-by-value languages need the η-expanded $Z$.
- The λ-calculus is Turing-complete, so whether a term has a normal form is undecidable.
:::

## Exercises

::: exercise Free variables {level=1 check="3"}
Find $\mathrm{FV}(t)$ for $t = (\lambda x.\,x\ y)\,(\lambda y.\,y\ x)\ (\lambda z.\,w)$. (Enter the number of free variables.)
::: solution
$\mathrm{FV}(\lambda x.\,x\ y) = \set{y}$, $\mathrm{FV}(\lambda y.\,y\ x) = \set{x}$ and $\mathrm{FV}(\lambda z.\,w) = \set{w}$. The free variables of an application are the union: $\set{x, y, w}$, three variables. Note that $x$ and $y$ each occur both bound (in one sub-term) and free (in another).
:::
:::

::: exercise Substitution by hand {level=1}
Compute (a) $(\lambda y.\,x\ y)[x := z]$; (b) $(\lambda y.\,x\ y)[x := y]$; (c) $(\lambda x.\,x\ y)[x := z]$; (d) $(\lambda z.\,\lambda y.\,z\ x)[x := y\ z]$.
::: solution
(a) $\lambda y.\,z\ y$ — no clash. (b) The binder $y$ is free in the argument $y$, so rename: $\lambda y_1.\,y\ y_1$ (the program's answer above). (c) $x$ is bound by the abstraction, so nothing changes: $\lambda x.\,x\ y$. (d) Both binders $z$ and $y$ are free in $y\ z$, so both are renamed: $\lambda z_1.\,\lambda y_1.\,z_1\,(y\ z)$.
:::
:::

::: exercise Counting β-steps {level=1 check="6"}
Reduce $\mathsf{plus}\ c_2\ c_3$ to normal form by normal-order reduction, writing every term. (Enter the number of steps.)
::: solution
1. $(\lambda m\,n\,f\,x.\,m\ f\,(n\ f\ x))\ c_2\ c_3 \to (\lambda n\,f\,x.\,c_2\ f\,(n\ f\ x))\ c_3$
2. $\to \lambda f\,x.\,c_2\ f\,(c_3\ f\ x)$
3. The leftmost-outermost redex is now $c_2\ f$ inside the body: $\to \lambda f\,x.\,(\lambda x'.\,f\,(f\ x'))\,(c_3\ f\ x)$
4. $\to \lambda f\,x.\,f\,(f\,(c_3\ f\ x))$
5. $\to \lambda f\,x.\,f\,(f\,((\lambda x'.\,f\,(f\,(f\ x')))\ x))$
6. $\to \lambda f\,x.\,f\,(f\,(f\,(f\,(f\ x)))) = c_5$

Six steps, as the program reported.
:::
:::

::: exercise Boolean operators {level=2}
Define $\mathsf{not}$, $\mathsf{and}$ and $\mathsf{or}$ on Church booleans, and verify $\mathsf{and}\ \mathsf{true}\ \mathsf{false} \to_\beta^* \mathsf{false}$ and $\mathsf{not}\ \mathsf{false} \to_\beta^* \mathsf{true}$.
::: solution
$\mathsf{not} = \lambda b.\,b\ \mathsf{false}\ \mathsf{true}$, $\mathsf{and} = \lambda a\,b.\,a\ b\ \mathsf{false}$, $\mathsf{or} = \lambda a\,b.\,a\ \mathsf{true}\ b$ (each is "if $a$ then … else …"). Then $\mathsf{and}\ \mathsf{true}\ \mathsf{false} \to^* \mathsf{true}\ \mathsf{false}\ \mathsf{false} = (\lambda t\,f.\,t)\ \mathsf{false}\ \mathsf{false} \to^* \mathsf{false}$, and $\mathsf{not}\ \mathsf{false} \to \mathsf{false}\ \mathsf{false}\ \mathsf{true} \to^* \mathsf{true}$. Like Python's `and`, this $\mathsf{and}$ under normal order does not evaluate $b$ when $a$ is $\mathsf{false}$.
:::
:::

::: exercise Exponentiation {level=2}
Prove that $c_n\ c_m \to_\beta^* c_{m^n}$ for all $m \ge 0$ and $n \ge 1$ — applying one numeral to another computes a power. (For $n = 0$ the result is $\lambda x.\,x$; show it is η-equivalent to $c_1$.)
::: solution
Write $c_m^k\,g$ for $c_m\,(c_m\,(\cdots(c_m\ g)))$ with $k$ copies of $c_m$. We show by induction on $k \ge 1$ that $c_m^k\,g \to_\beta^* \lambda y.\,g^{m^k}\,y$ for every term $g$.

For $k = 1$, $c_m\ g \to_\beta \lambda y.\,g^m\,y$ directly. For $k + 1$: $c_m^{k+1}\,g = c_m\,(c_m^k\,g) \to_\beta^* c_m\ h$ with $h = \lambda y.\,g^{m^k}\,y$, by the induction hypothesis applied inside the argument. Then $c_m\ h \to_\beta \lambda x.\,h^m\,x$, and by an inner induction on $j$, $h^j\,x \to_\beta^* g^{m^k j}\,x$: for $j = 0$ both sides are $x$, and $h^{j+1}\,x = h\,(h^j\,x) \to^* h\,(g^{m^k j}\,x) \to_\beta g^{m^k}\,(g^{m^k j}\,x)$. With $j = m$ we get $c_m^{k+1}\,g \to^* \lambda x.\,g^{m^{k+1}}\,x$.

Now $c_n\ c_m = (\lambda f.\,\lambda x.\,f^n\,x)\ c_m \to_\beta \lambda x.\,c_m^n\,x$, and the claim with $g = x$ and $k = n$ reduces the body to $\lambda y.\,x^{m^n}\,y$, so $c_n\ c_m \to_\beta^* \lambda x\,y.\,x^{m^n}\,y = c_{m^n}$. For $n = 0$: $c_0\ c_m \to_\beta \lambda x.\,x$, while $c_1 = \lambda f.\,\lambda x.\,f\ x \to_\eta \lambda f.\,f$, which is $\lambda x.\,x$ up to α. In Python, `to_int(three(two))` prints `8` $= 2^3$ and `to_int(two(three))` prints `9` $= 3^2$: the numeral applied is the exponent.
:::
:::

::: exercise Strategies and Ω {level=2}
(a) Show that $\Omega$ has no normal form. (b) Find a term that has a normal form but also an infinite reduction sequence, and say which strategies find the normal form. (c) Find a term whose normal-order reduction takes more steps than call-by-value reduction to reach the same normal form.
::: solution
(a) $\Omega$ has exactly one redex (itself; neither $\omega$ contains a redex, since $x\ x$ is not a redex), and contracting it gives $\Omega$ again. So every reduction sequence is $\Omega \to \Omega \to \cdots$, and no term in it is a normal form. (b) $(\lambda x.\,y)\ \Omega$: contracting the outer redex gives the normal form $y$, while always contracting the inner redex loops. Normal order and call-by-name find $y$; applicative order and call-by-value loop. (c) $(\lambda x.\,x\ x)\,(I\ I)$: normal order takes four steps ($\to (I\ I)\,(I\ I) \to I\,(I\ I) \to I\ I \to I$), call-by-value takes three ($\to (\lambda x.\,x\ x)\ I \to I\ I \to I$), because normal order copies the unevaluated argument — see the reduction graph above.
:::
:::

::: exercise Turing's fixed-point combinator {level=2}
Let $A = \lambda x\,y.\,y\,(x\ x\ y)$ and $\Theta = A\ A$. Show that $\Theta\ F \to_\beta^* F\,(\Theta\ F)$ for every $F$ — a reduction, not just a β-equivalence as for $Y$.
::: solution
$\Theta\ F = (\lambda x.\,\lambda y.\,y\,(x\ x\ y))\ A\ F \to_\beta (\lambda y.\,y\,(A\ A\ y))\ F \to_\beta F\,(A\ A\ F) = F\,(\Theta\ F)$. Two steps, and the result literally contains $\Theta\ F$. With $Y$, by contrast, $Y\ F \to^* F\,(W\ W)$, and $W\ W$ is not $Y\ F$ (it is a reduct of it). Turing published $\Theta$ in 1937. The property matters for implementations that unfold recursion lazily: $\Theta\ F$ can be unfolded by reduction as often as required.
:::
:::

::: exercise Implementing α-equivalence {level=3}
Write a Python function `alpha_eq(t, u)` deciding α-equivalence of two λ-terms (using the `Var`, `Lam`, `App` classes) *without* renaming anything, and test it on $\lambda x.\,x$ vs $\lambda y.\,y$; $\lambda x\,y.\,x$ vs $\lambda y\,x.\,y$; $\lambda x\,y.\,x$ vs $\lambda x\,y.\,y$; $\lambda x.\,x\ z$ vs $\lambda z.\,z\ z$; $\lambda x.\,\lambda x.\,x$ vs $\lambda y.\,\lambda z.\,z$ and vs $\lambda y.\,\lambda z.\,y$.
::: solution
Walk the two terms together, keeping a list of pairs of binders that were introduced *at the same position*, innermost first. Two variables match if their innermost binders are paired with each other, or if both are free and have the same name.

```python
def alpha_eq(t, u, env=()):
    """env: pairs (x, y) of variables bound together, innermost first."""
    match t, u:
        case Var(x), Var(y):
            for a, b in env:
                if a == x or b == y:          # innermost binder of x or of y
                    return a == x and b == y  # ... must be the same pair
            return x == y                     # both free: same name
        case Lam(x, b1), Lam(y, b2):
            return alpha_eq(b1, b2, ((x, y),) + env)
        case App(f1, a1), App(f2, a2):
            return alpha_eq(f1, f2, env) and alpha_eq(a1, a2, env)
    return False
```

```console
λx. x        λy. y        True
λx y. x      λy x. y      True
λx y. x      λx y. y      False
λx. x z      λy. y z      True
λx. x z      λz. z z      False
λx. λx. x    λy. λz. z    True
λx. λx. x    λy. λz. y    False
```

The test `a == x or b == y` is what handles shadowing and capture: in $\lambda x.\,x\ z$ vs $\lambda z.\,z\ z$, the second $z$ on the right is bound by the pair $(x, z)$ while the $z$ on the left is free, so they differ. Correctness is by induction on $t$, with the invariant that `env` records the binders on the path from the root. The scan of `env` makes the function quadratic in the worst case; [[programming-languages/scope-binding]] shows de Bruijn indices, after which α-equivalence is plain equality.
:::
:::

::: exercise Normal forms are reached from equal terms {level=3}
Prove two consequences of confluence. (a) If $t =_\beta u$ then $t$ has a normal form if and only if $u$ does. (b) The terms $\mathsf{true}$ and $\mathsf{false}$ are not β-equivalent; deduce that adding the equation $\mathsf{true} = \mathsf{false}$ to the calculus would make all terms equal.
::: solution
(a) Suppose $u$ has normal form $n$, so $u =_\beta n$. Then $t =_\beta u =_\beta n$, and by [[#cor-unique-nf]] $t \to_\beta^* n$; so $t$ has a normal form. The converse is symmetric.

(b) $\mathsf{true} = \lambda t\,f.\,t$ and $\mathsf{false} = \lambda t\,f.\,f$ are distinct normal forms (not α-equivalent: one returns its first parameter, the other its second). If they were β-equivalent, by [[#cor-unique-nf]] (with $u$ the normal form $\mathsf{false}$) we would have $\mathsf{true} \to_\beta^* \mathsf{false}$; but a normal form reduces only to itself. If we added $\mathsf{true} = \mathsf{false}$ as an axiom (closed under the usual rules of equational reasoning), then for any terms $M, N$: $M =_\beta \mathsf{true}\ M\ N = \mathsf{false}\ M\ N =_\beta N$, so every two terms would be equal. Confluence is what shows that the λ-calculus is consistent in this sense.
:::
:::
