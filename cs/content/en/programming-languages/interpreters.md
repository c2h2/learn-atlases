An **interpreter** is a program that runs other programs: it takes the abstract syntax tree of a program and computes its result directly, without translating it to machine code first. Python's reference implementation is (after a compilation step to bytecode) an interpreter; so are the JavaScript engines in browsers before their just-in-time compilers take over, the shell, a spreadsheet's formula evaluator and the query engine of a database. Writing one is also the best way to understand a language. Every question about what a construct means — when an argument is evaluated, what a variable refers to, what a function value contains — has to be answered in the code, and answered precisely.

This chapter builds an interpreter, in Python, for a small functional language we call **Fun**: numbers and booleans, arithmetic, conditionals, `let`, first-class functions and recursion. We begin with the direct translation of the substitution semantics of [[programming-languages/lambda-calculus]], see why it is wasteful, and replace substitution by **environments**. Functions then evaluate to **closures**, pairs of code and environment — the most important data structure in the implementation of programming languages. We state the environment semantics as inference rules and prove that it computes the same answers as substitution. The interpreter is about a hundred lines long; the next chapters vary it to study scope, parameter passing, types and control.

## The language Fun

We write Fun programs in the parenthesised prefix syntax of Lisp and Racket (**s-expressions**), because it makes parsing trivial and lets us concentrate on meaning. A program such as

```text
(let ((make-adder (lambda (n) (lambda (x) (+ x n)))))
  (let ((add5 (make-adder 5)))
    (add5 10)))
```

defines a function that returns a function, applies it, and evaluates to $15$. The abstract syntax is

$$
\begin{aligned}
e \;::=\;& n \mid \mathsf{true} \mid \mathsf{false} \mid x \mid (\mathsf{lambda}\ (x)\ e) \mid (e_1\ e_2) \mid (\mathit{op}\ e_1\ e_2) \mid (\mathsf{if}\ e_1\ e_2\ e_3) \\
\mid\;& (\mathsf{let}\ ((x\ e_1))\ e_2) \mid (\mathsf{letrec}\ ((f\ (\mathsf{lambda}\ (x)\ e_1)))\ e_2)
\end{aligned}
$$

with $\mathit{op} \in \set{+, -, *, =, <}$. Functions take one argument, as in the λ-calculus; the parser turns `(lambda (x y) e)` into `(lambda (x) (lambda (y) e))` and `(f a b)` into `((f a) b)`. Such a translation of a convenient surface form into a smaller core language is called **desugaring**, and the convenient forms are **syntactic sugar**. Desugaring keeps the interpreter small; it is also how real languages are specified (much of Python's `with` and `for` is defined by translation into simpler statements).

The AST is a set of frozen data classes, and the reader and parser fit in thirty lines:

```python
@dataclass(frozen=True)
class Num: n: int
@dataclass(frozen=True)
class Bool: b: bool
@dataclass(frozen=True)
class Var: name: str
@dataclass(frozen=True)
class Lam: param: str; body: object
@dataclass(frozen=True)
class App: fun: object; arg: object
@dataclass(frozen=True)
class If: c: object; th: object; el: object
@dataclass(frozen=True)
class Prim: op: str; l: object; r: object
@dataclass(frozen=True)
class Let: name: str; rhs: object; body: object
@dataclass(frozen=True)
class LetRec: name: str; param: str; fbody: object; body: object
```

```python
def read(src):
    """Text -> nested Python lists of strings (an s-expression)."""
    toks = src.replace("(", " ( ").replace(")", " ) ").split()
    def sexp(i):
        if toks[i] == "(":
            items, i = [], i + 1
            while toks[i] != ")":
                x, i = sexp(i); items.append(x)
            return items, i + 1
        return toks[i], i + 1
    x, i = sexp(0)
    if i != len(toks): raise SyntaxError("extra input")
    return x

OPS = {"+", "-", "*", "=", "<"}
def parse(x):
    """s-expression -> AST, desugaring multi-argument lambdas and calls."""
    match x:
        case str() if x.lstrip("-").isdigit(): return Num(int(x))
        case "true" | "false": return Bool(x == "true")
        case str(): return Var(x)
        case ["lambda", params, body]:
            e = parse(body)
            for p in reversed(params): e = Lam(p, e)
            return e
        case ["if", c, a, b]: return If(parse(c), parse(a), parse(b))
        case ["let", [[name, rhs]], body]: return Let(name, parse(rhs), parse(body))
        case ["letrec", [[name, ["lambda", [p], fb]]], body]:
            return LetRec(name, p, parse(fb), parse(body))
        case [op, l, r] if op in OPS: return Prim(op, parse(l), parse(r))
        case [f, *args] if args:
            e = parse(f)
            for a in args: e = App(e, parse(a))
            return e
    raise SyntaxError(f"bad expression: {x}")
```

```console
>>> parse(read("(let ((add (lambda (x y) (+ x y)))) (add 3 4))"))
Let(name='add', rhs=Lam(param='x', body=Lam(param='y', body=Prim(op='+', l=Var(name='x'),
    r=Var(name='y')))), body=App(fun=App(fun=Var(name='add'), arg=Num(n=3)), arg=Num(n=4)))
```

## Interpretation by substitution

The semantics of [[programming-languages/lambda-calculus]] tells us what to do with an application: evaluate the function to an abstraction $\lambda x.\,e$, evaluate the argument to a value $v$ (Fun is call-by-value, like Python), and continue with $e[x := v]$. Here are the big-step rules, in the style of [[programming-languages/syntax-semantics#def-bigstep]], with values $v ::= n \mid \mathsf{true} \mid \mathsf{false} \mid \lambda x.\,e$:

$$
\frac{}{v \Downarrow v}
\qquad
\frac{e_1 \Downarrow \lambda x.\,e \quad e_2 \Downarrow v_2 \quad e[x := v_2] \Downarrow v}{(e_1\ e_2) \Downarrow v}
\qquad
\frac{e_1 \Downarrow v_1 \quad e_2[x := v_1] \Downarrow v}{(\mathsf{let}\ ((x\ e_1))\ e_2) \Downarrow v}
\qquad
\frac{e_1 \Downarrow n_1 \quad e_2 \Downarrow n_2}{(+\ e_1\ e_2) \Downarrow n_1 + n_2}
$$

and similarly for the other primitives and $\mathsf{if}$. A `letrec` is unfolded: $f$ is replaced by $\lambda x.\,(\mathsf{letrec}\ ((f\ (\mathsf{lambda}\ (x)\ e_1)))\ e_1)$, a function that re-creates the recursive definition each time its body runs.

In a closed program evaluated call-by-value, substitution is much simpler than in [[programming-languages/lambda-calculus#def-subst]]:

::: lemma Closed values need no renaming {#lem-closed-subst}
If a program is closed (has no free variables), then every value substituted during its evaluation by the rules above is closed. Consequently substitution $e[x := v]$ never captures a variable, and the renaming clause of capture-avoiding substitution is never used.
:::

::: proof
We show, by induction on the derivation of $e \Downarrow v$, that if $e$ is closed then so is $v$, and every substitution performed in the derivation substitutes a closed value into a term whose free variables are at most the substituted variable. For a value, $v = e$ is closed. For an application $(e_1\ e_2)$ with $e$ closed, $e_1$ and $e_2$ are closed, so by induction $\lambda x.\,e'$ and $v_2$ are closed; hence $\mathrm{FV}(e') \subseteq \set{x}$, the substitution $e'[x := v_2]$ inserts a closed term, and the result is closed, so the induction hypothesis applies to the third premise. The `let` rule is the same, and the `letrec` unfolding substitutes a closed abstraction. Since $v$ is closed, it has no free variable that a binder in $e'$ could capture.
:::

The interpreter is a transcription of the rules (the `letrec` and error cases are in the same style):

```python
def evs(e):
    """Big-step call-by-value evaluation by substitution."""
    match e:
        case Num() | Bool() | Lam(): return e
        case Var(x): raise InterpError(f"unbound variable {x}")
        case Let(x, rhs, body): return evs(subst(body, x, evs(rhs)))
        case App(fn, arg):
            f, v = evs(fn), evs(arg)
            if not isinstance(f, Lam): raise InterpError("cannot apply a non-function")
            return evs(subst(f.body, f.param, v))
        # ... If, Prim and LetRec as described above
```

::: example Evaluating by substitution {#ex-subst}
Evaluate `(let ((f (lambda (x) (lambda (y) (+ x y))))) ((f 1) 2))` with the substitution rules, writing the term after each substitution.
::: solution
1. The right-hand side of the `let` is a lambda, already a value. Substitute it for `f` in the body: `(((lambda (x) (lambda (y) (+ x y))) 1) 2)`.
2. The application `((lambda (x) …) 1)`: the function and the argument are values, so substitute $1$ for `x` in the body, giving the value `(lambda (y) (+ 1 y))`. The whole term is now `((lambda (y) (+ 1 y)) 2)`.
3. Substitute $2$ for `y`: `(+ 1 2)`, which evaluates to $3$.

Three substitutions, each of which rebuilt the term it acted on. Step 2 is the essence of a closure: the function returned by `f` "remembers" that $x = 1$ because the $1$ has been copied into its code. The environment interpreter below achieves the same effect without copying, by pairing the unchanged code `(lambda (y) (+ x y))` with a record that $x$ is $1$.
:::
:::

Notice that a variable is an *error* here: in a closed program every variable has been replaced by its value before it is reached. This interpreter is correct, but it does a lot of copying. Every call rebuilds the whole body of the function with the argument substituted, even the parts that will never be evaluated (the untaken branch of an `if`), and every call of a recursive function rebuilds the body once more for the unfolding. The cost of a call is proportional to the size of the body rather than to the work actually done.

## Environments and closures

The remedy is to delay substitution: instead of replacing $x$ by $v$ throughout the body, record the pair $x \mapsto v$ and look it up when, and only if, $x$ is evaluated.

::: definition Environment {#def-environment}
An **environment** $\rho$ is a finite map from variables to values. We write $\rho(x)$ for the value of $x$, $\rho[x \mapsto v]$ for the environment that maps $x$ to $v$ and agrees with $\rho$ elsewhere, and $\varnothing$ for the empty environment.
:::

An environment is a *pending substitution*. The difficulty comes with functions. Evaluating $(\mathsf{lambda}\ (x)\ e)$ in an environment $\rho$ cannot simply return the code $\lambda x.\,e$, because $e$ may mention other variables of $\rho$ whose substitution has been postponed. In `make-adder`, the inner function `(lambda (x) (+ x n))` mentions `n`; by the time `add5` is called, the call of `make-adder` that bound `n` to $5$ has returned. The value of the inner lambda must therefore carry its environment with it.

::: definition Closure {#def-closure}
A **closure** $\langle \lambda x.\,e, \rho \rangle$ is a pair of a function's code and the environment in which the function was created. The values of the environment semantics are $v ::= n \mid \mathsf{true} \mid \mathsf{false} \mid \langle \lambda x.\,e, \rho \rangle$.
:::

This is the same notion as the Python closures of [[program-design/higher-order-functions#def-closure]], now seen from the implementer's side: a Python function object stores its code and a reference to the cells of the enclosing scopes (`f.__code__` and `f.__closure__`). The term goes back to Peter Landin's SECD machine (1964).

::: definition Environment semantics {#def-env-semantics}
The relation $\rho \vdash e \Downarrow v$ ("in environment $\rho$, $e$ evaluates to $v$") is defined by

$$
\begin{gathered}
\frac{}{\rho \vdash n \Downarrow n}
\qquad
\frac{\rho(x) = v}{\rho \vdash x \Downarrow v}
\qquad
\frac{}{\rho \vdash (\mathsf{lambda}\ (x)\ e) \Downarrow \langle \lambda x.\,e, \rho \rangle}
\\[1.2em]
\frac{\rho \vdash e_1 \Downarrow \langle \lambda x.\,e, \rho' \rangle \quad \rho \vdash e_2 \Downarrow v_2 \quad \rho'[x \mapsto v_2] \vdash e \Downarrow v}{\rho \vdash (e_1\ e_2) \Downarrow v}
\qquad
\frac{\rho \vdash e_1 \Downarrow v_1 \quad \rho[x \mapsto v_1] \vdash e_2 \Downarrow v}{\rho \vdash (\mathsf{let}\ ((x\ e_1))\ e_2) \Downarrow v}
\\[1.2em]
\frac{\rho \vdash e_1 \Downarrow \mathsf{true} \quad \rho \vdash e_2 \Downarrow v}{\rho \vdash (\mathsf{if}\ e_1\ e_2\ e_3) \Downarrow v}
\qquad
\frac{\rho \vdash e_1 \Downarrow \mathsf{false} \quad \rho \vdash e_3 \Downarrow v}{\rho \vdash (\mathsf{if}\ e_1\ e_2\ e_3) \Downarrow v}
\qquad
\frac{\rho \vdash e_1 \Downarrow n_1 \quad \rho \vdash e_2 \Downarrow n_2}{\rho \vdash (+\ e_1\ e_2) \Downarrow n_1 + n_2}
\end{gathered}
$$

plus the rules for $\mathsf{true}$, $\mathsf{false}$ and the other primitives, and for `letrec` below. A closed program $e$ evaluates to $v$ if $\varnothing \vdash e \Downarrow v$.
:::

The crucial rule is application. The body of the function is evaluated in the closure's environment $\rho'$, extended with the parameter — *not* in the caller's environment $\rho$. That is what makes variables refer to the binding that was visible where the function was *written*, **lexical** (or static) **scope**. Using $\rho[x \mapsto v_2]$ instead gives **dynamic scope**, a different language, examined in [[programming-languages/scope-binding]].

### The interpreter

Environments are implemented as chains of **frames**: each frame is a dictionary of bindings plus a pointer to the enclosing frame. Extending an environment creates a new frame and never changes the old one, so a closure's environment stays as it was when the closure was created.

```python
class InterpError(Exception): pass

@dataclass
class Env:
    vars: dict
    parent: "Env | None" = None
    def lookup(self, x):
        env = self
        while env is not None:
            if x in env.vars: return env.vars[x]
            env = env.parent
        raise InterpError(f"unbound variable {x}")

@dataclass
class Closure:
    param: str; body: object; env: Env

def prim(op, a, b):
    if type(a) is not int or type(b) is not int:
        raise InterpError(f"{op} expects numbers, got {a!r} and {b!r}")
    return {"+": a + b, "-": a - b, "*": a * b, "=": a == b, "<": a < b}[op]

def ev(e, env):
    match e:
        case Num(n): return n
        case Bool(b): return b
        case Var(x): return env.lookup(x)
        case Lam(x, body): return Closure(x, body, env)
        case Prim(op, l, r): return prim(op, ev(l, env), ev(r, env))
        case If(c, a, b):
            v = ev(c, env)
            if type(v) is not bool: raise InterpError(f"if expects a boolean, got {v!r}")
            return ev(a, env) if v else ev(b, env)
        case Let(x, rhs, body): return ev(body, Env({x: ev(rhs, env)}, env))
        case LetRec(f, x, fb, body):
            frame = Env({}, env)                      # the closure will live here
            frame.vars[f] = Closure(x, fb, frame)     # ... and point back to it
            return ev(body, frame)
        case App(fn, arg):
            f = ev(fn, env); v = ev(arg, env)
            if not isinstance(f, Closure): raise InterpError(f"cannot apply {f!r}")
            return ev(f.body, Env({f.param: v}, f.env))

def run(src): return ev(parse(read(src)), Env({}))
```

Fun's values are represented by Python values: integers, booleans and `Closure` objects. The `if` case checks that the guard is a boolean and `prim` that operands are integers (with `type(...) is int`, since `True` is an `int` in Python): the interpreter defines *Fun's* error behaviour rather than inheriting Python's.

```python
print(run("(+ 1 (* 2 3))"))
print(run("(let ((add (lambda (x y) (+ x y)))) (add 3 4))"))
print(run("(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 20))"))
print(run("(lambda (x) x)"))
for bad in ["(+ 1 true)", "(5 3)", "(+ y 1)", "(if 1 2 3)"]:
    try: run(bad)
    except InterpError as e: print("error:", e)
```

```console
7
7
2432902008176640000
<closure λx>
error: + expects numbers, got 1 and True
error: cannot apply 5
error: unbound variable y
error: if expects a boolean, got 1
```

The fourth program's value is a closure, printed opaquely (its `__repr__` shows only the parameter): a function value has no printable normal form in a call-by-value language. Arithmetic on large numbers works because Fun integers are Python integers, an example of a feature the defined language **inherits** from the defining language.

::: example An environment diagram {#ex-env-diagram}
Trace `run` on the `make-adder` program from the start of the chapter, listing every frame and closure created and the lookups made.
::: solution
Write $G$ for the initial empty frame.

1. The outer `let` evaluates its right-hand side `(lambda (n) …)` in $G$: closure $C_1 = \langle \lambda n.\,(\mathsf{lambda}\ (x)\ (+\ x\ n)), G\rangle$. It creates frame $F_1 = \set{\textit{make-adder} \mapsto C_1}$ with parent $G$.
2. The inner `let` evaluates `(make-adder 5)` in $F_1$. Looking up `make-adder` finds $C_1$ in $F_1$; the argument is $5$. The body of $C_1$ is evaluated in a new frame $F_3 = \set{n \mapsto 5}$ whose parent is **$G$**, the closure's environment — not $F_1$. The body is a lambda, so the result is $C_2 = \langle \lambda x.\,(+\ x\ n), F_3\rangle$.
3. Frame $F_2 = \set{\textit{add5} \mapsto C_2}$, parent $F_1$, is created for the body of the inner `let`.
4. `(add5 10)` in $F_2$: `add5` is found in $F_2$; the body of $C_2$ is evaluated in $F_4 = \set{x \mapsto 10}$ with parent $F_3$.
5. `(+ x n)` in $F_4$: `x` is found in $F_4$ ($10$); `n` is not in $F_4$, so the lookup follows the parent pointer to $F_3$ and finds $5$. Result $15$.

At the moment of the last lookup, the call of `make-adder` that created $F_3$ finished long ago, but $F_3$ is still alive because $C_2$ points to it. Frames therefore cannot in general be allocated on a stack that is popped on return; they live on the heap and are reclaimed by garbage collection when no closure refers to them ([[programming-languages/scope-binding]]).
:::
:::

::: widget graph
nodes: F4@0,0; F3@1,0.5; G@2,1; F1@1,2; F2@0,2; C1@2,2.5; C2@1,-0.5
edges: F4>F3; F3>G; F1>G; F2>F1; F1>C1; C1>G; F2>C2; C2>F3
algorithm: dfs
start: F4
caption: The frames and closures of [[#ex-env-diagram]]. Arrows from a frame to a frame are parent pointers; an arrow from a frame to a closure is a binding ($F_1$ binds `make-adder` to $C_1$, $F_2$ binds `add5` to $C_2$); an arrow from a closure to a frame is its environment. Step through depth-first search from $F_4$, the frame in which `(+ x n)` is evaluated: the reachable frames $F_4, F_3, G$ are exactly those a variable lookup can search, and $F_1$ and $F_2$, the frames of the *caller*, are not among them. That is lexical scope. Note too that $C_2$ keeps $F_3$ reachable after `make-adder` has returned.
:::

### Recursion and cyclic environments

A recursive function's closure must contain an environment in which the function's own name is bound to that very closure. No finite *tree* of frames can do that: the structure is necessarily cyclic. The `LetRec` case creates the frame first, then the closure pointing to the frame, and finally stores the closure in the frame, tying the knot by one mutation.

$$
\frac{\rho' = \rho[f \mapsto \langle \lambda x.\,e_1, \rho' \rangle] \qquad \rho' \vdash e_2 \Downarrow v}{\rho \vdash (\mathsf{letrec}\ ((f\ (\mathsf{lambda}\ (x)\ e_1)))\ e_2) \Downarrow v}
$$

::: example Recursion through a cyclic frame {#ex-letrec}
Trace `(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 2))` in the environment interpreter, listing the frames.
::: solution
1. `LetRec` creates frame $R$ (parent $G$), then the closure $C = \langle \lambda n.\,\ldots, R\rangle$, then stores $\textit{fact} \mapsto C$ in $R$. Now $R$ contains $C$ and $C$ points to $R$: a cycle.
2. `(fact 2)` is evaluated in $R$: `fact` is $C$; the body runs in $F_2 = \set{n \mapsto 2}$ with parent $R$ (the closure's environment). The guard is false, so `(* n (fact (- n 1)))` is evaluated in $F_2$; looking up `fact` goes $F_2 \to R$ and finds $C$ again.
3. `(fact 1)` runs in $F_1 = \set{n \mapsto 1}$, parent $R$; then `(fact 0)` in $F_0 = \set{n \mapsto 0}$, parent $R$, which returns $1$.
4. Returning: $F_1$ computes $1 \times 1 = 1$ and $F_2$ computes $2 \times 1 = 2$.

All three call frames have parent $R$, not each other: the body of `fact` refers to `fact` and `n`, never to the caller's `n`. The *call* stack (Python's, here) is what records that $F_1$ must return to $F_2$; the *environment* chain records only where names were defined. Confusing the two is the root of dynamic scope.
:::
:::

The rule's first premise is a recursive equation; it has a unique solution as a cyclic (or infinite, unfolded) structure, and the interpreter builds the cyclic one. An alternative, which needs no mutation, is to desugar `letrec` using the $Z$ combinator of [[programming-languages/lambda-calculus#thm-fixed-point]]; an exercise asks you to check that it works.

::: quiz
In `(let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((x 100)) (f 10))))`, what does the environment interpreter return?
- [ ] $110$
- [x] $11$
- [ ] an unbound-variable error
- [ ] $101$
::: solution
The closure for `f` is created in the frame where $x = 1$. The call `(f 10)` evaluates `(+ x y)` in the closure's frame extended with $y = 10$, so `x` is $1$, and the result is $11$. The later binding $x = 100$ is in the caller's environment, which the body never sees. An interpreter that evaluated the body in the caller's environment (dynamic scope) would give $110$.
:::
:::

## Correctness of the environment interpreter

We now have two semantics of Fun: substitution ([[#lem-closed-subst]]) and environments ([[#def-env-semantics]]). They should give the same answers. To compare them we need to say which substitution value a closure stands for: the closure $\langle \lambda x.\,e, \rho\rangle$ means "the function $\lambda x.\,e$ with the pending substitution $\rho$ carried out".

::: definition Reading back values {#def-readback}
For an environment value $v$ define the closed term $v^\sharp$, and for an environment $\rho$ the simultaneous substitution $\rho^\sharp$, by

$$
n^\sharp = n, \qquad b^\sharp = b, \qquad \langle \lambda x.\,e, \rho\rangle^\sharp = \lambda x.\,\big(e\,[\rho^\sharp \setminus x]\big), \qquad \rho^\sharp = [\,y := \rho(y)^\sharp \ \text{for all } y \in \mathrm{dom}\,\rho\,],
$$

where $\rho^\sharp \setminus x$ omits the binding of $x$ (which the λ shadows). We consider only **well-formed** closures, in which $\mathrm{FV}(\lambda x.\,e) \subseteq \mathrm{dom}\,\rho$; the definition is by recursion on the depth of nesting of closures, which is finite for the closures built by non-recursive programs. (For `letrec` the cyclic closure reads back to the unfolded term of the substitution interpreter; we leave that case aside.)
:::

Because the substituted terms $\rho(y)^\sharp$ are closed, simultaneous substitution behaves well: $e[\rho^\sharp \setminus x][x := v^\sharp] = e[(\rho[x \mapsto v])^\sharp]$, since substituting closed terms for distinct variables can be done in any order.

::: theorem The environment semantics agrees with substitution {#thm-env-correct}
Let $e$ be a term of Fun without `letrec`, and $\rho$ an environment with $\mathrm{FV}(e) \subseteq \mathrm{dom}\,\rho$ whose values are well-formed. If $\rho \vdash e \Downarrow v$, then $e[\rho^\sharp] \Downarrow v^\sharp$ in the substitution semantics. In particular, for a closed program, $\varnothing \vdash e \Downarrow v$ implies $e \Downarrow v^\sharp$.
:::

::: proof
By induction on the derivation of $\rho \vdash e \Downarrow v$, by cases on the last rule.

*Constants.* $n[\rho^\sharp] = n = n^\sharp$, a value, and $n \Downarrow n$.

*Variable.* $\rho \vdash x \Downarrow \rho(x)$. Then $x[\rho^\sharp] = \rho(x)^\sharp$, which is a value (a constant or an abstraction), so it evaluates to itself.

*Abstraction.* $\rho \vdash (\mathsf{lambda}\ (x)\ e) \Downarrow \langle \lambda x.\,e, \rho\rangle$. Substitution stops at the binder of $x$, so $(\lambda x.\,e)[\rho^\sharp] = \lambda x.\,(e[\rho^\sharp \setminus x]) = \langle \lambda x.\,e, \rho\rangle^\sharp$, a value.

*Application.* The premises are $\rho \vdash e_1 \Downarrow \langle \lambda x.\,e, \rho'\rangle$, $\rho \vdash e_2 \Downarrow v_2$ and $\rho'[x \mapsto v_2] \vdash e \Downarrow v$. By the induction hypothesis for the first two, $e_1[\rho^\sharp] \Downarrow \lambda x.\,(e[\rho'^\sharp \setminus x])$ and $e_2[\rho^\sharp] \Downarrow v_2^\sharp$. The substitution rule for application then needs

$$
e[\rho'^\sharp \setminus x][x := v_2^\sharp] = e[(\rho'[x \mapsto v_2])^\sharp] \Downarrow v^\sharp,
$$

and the equation is the remark before the theorem, while the evaluation is the induction hypothesis for the third premise (whose environment satisfies the hypotheses: $\mathrm{FV}(e) \subseteq \mathrm{dom}\,\rho' \cup \set{x}$ because the closure is well-formed). Since $(e_1\ e_2)[\rho^\sharp] = (e_1[\rho^\sharp]\ e_2[\rho^\sharp])$, the substitution rule concludes $(e_1\ e_2)[\rho^\sharp] \Downarrow v^\sharp$.

*Let.* $\rho \vdash e_1 \Downarrow v_1$ and $\rho[x \mapsto v_1] \vdash e_2 \Downarrow v$. By induction $e_1[\rho^\sharp] \Downarrow v_1^\sharp$ and $e_2[(\rho[x \mapsto v_1])^\sharp] \Downarrow v^\sharp$, and the latter term is $e_2[\rho^\sharp \setminus x][x := v_1^\sharp]$; the substitution rule for `let` applies.

*If and primitives.* The premises evaluate sub-terms in the same $\rho$; the induction hypothesis gives the corresponding evaluations of $e_i[\rho^\sharp]$, with the same booleans and numbers (whose read-back is themselves), and the substitution rule with the same name applies.

Every closure created in a derivation from well-formed values is well-formed (a lambda is evaluated in an environment covering its free variables), so the hypotheses are maintained. For a closed program, $\varnothing^\sharp$ is the empty substitution and $e[\varnothing^\sharp] = e$.
:::

The converse also holds — if $e \Downarrow w$ by substitution, then $\varnothing \vdash e \Downarrow v$ for some $v$ with $v^\sharp = w$ — by a similar induction, generalised to environments. So the two interpreters agree on every closed program, including on which programs fail to terminate. We can also test the claim:

```python
progs = ["(let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((x 100)) (f 10))))",
         "(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 20))",
         "(letrec ((fib (lambda (n) (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2))))))) (fib 15))",
         "((lambda (f) (f (f 3))) (lambda (x) (* x x)))"]
for p in progs:
    e = parse(read(p))
    print(ev(e, Env({})), evs(e))
```

```console
11 Num(n=11)
2432902008176640000 Num(n=2432902008176640000)
610 Num(n=610)
81 Num(n=81)
```

::: example How much does substitution cost? {#ex-cost}
Time both interpreters on `(fib 20)` and compare with Python's own `fib`.
::: solution
```python
e = parse(read("(letrec ((fib (lambda (n) (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2))))))) (fib 20))"))
for f, args in [(ev, (e, Env({}))), (evs, (e,))]:
    t = time.perf_counter(); r = f(*args)
    print(f.__name__, r, round(time.perf_counter() - t, 2))
```

```console
ev 6765 0.15
evs Num(n=6765) 0.72
python 0.0012
```

These are observations on one machine (Python 3.14, as of 2026), not theorems, but the ratios are typical. Both interpreters make the same $21\,891$ calls of `fib`. The substitution interpreter is about five times slower, because each call copies the function body — both branches of the `if`, and the unfolded `letrec` — while the environment interpreter allocates one small frame. Both are around a hundred times slower than Python running the same function directly, the price of an extra layer of interpretation: every Fun operation costs a `match` dispatch, a few method calls and a dictionary lookup. Compilers ([[compilers]]) remove that layer, and lexical addressing ([[programming-languages/scope-binding]]) removes the dictionary lookups.
:::
:::

::: warning The interpreter silently borrows the host's semantics
A definitional interpreter is only as precise as its weakest line. In `prim(op, ev(l, env), ev(r, env))`, Fun's primitives evaluate their left operand first *because Python evaluates function arguments left to right* — change the host language and the defined language changes too. Likewise Fun is call-by-value because `ev(arg, env)` is called before the body is evaluated, Fun integers are unbounded because Python's are, and a deeply recursive Fun program fails with Python's `RecursionError` because each Fun call uses several Python stack frames. John Reynolds made this point in "Definitional interpreters for higher-order programming languages" (1972): to define evaluation order rather than inherit it, write the interpreter so that it does not depend on the host's order, for instance in continuation-passing style ([[programming-languages/control]]).
:::

## Representing functions

There is more than one way to represent a closure. The data structure `Closure(param, body, env)` is a **first-order** representation: a record that the interpreter inspects. Alternatively a Fun function can be represented by a *Python* function, a **higher-order** representation:

```python
def ev2(e, env):                       # env: a Python dict
    match e:
        case Lam(x, body): return lambda v: ev2(body, {**env, x: v})
        case App(fn, arg): return ev2(fn, env)(ev2(arg, env))
        case Var(x): return env[x]
        # ... the other cases as before
```

Now Python's closures do the work of Fun's: the Python `lambda` captures `body` and `env`. The two representations are related by a program transformation called **defunctionalisation** (also due to Reynolds): replace each `lambda` in a program by a record of its free variables, and each call by a dispatch on the record. Defunctionalising `ev2` gives back `ev`. The higher-order version is shorter; the first-order version can be printed, inspected, serialised and translated to a language without first-class functions, which is why compilers represent closures as records ([[compilers]]).

::: application Interpreters everywhere
Many programs contain an interpreter without calling it one. A spreadsheet evaluates the formula language of its cells; a regular-expression engine interprets a compiled pattern; a database evaluates a query plan, a tree of operators, over tables ([[databases]]); configuration languages, template engines and build systems interpret small languages of their own. When such a language grows functions and variables, it faces exactly the questions of this chapter, and mistakes in scope or evaluation order are a classic source of bugs (early versions of many template and macro languages had dynamic scope by accident). Writing the semantics down as rules first, as here, is cheap insurance.
:::

::: history
John McCarthy's paper "Recursive functions of symbolic expressions and their computation by machine, Part I" (1960) defined LISP by giving `eval` and `apply` in LISP itself — the first **metacircular** interpreter, in which a language is defined in terms of itself. The original LISP used dynamic scope; the "funarg problem" of passing functions as arguments led to closures, first described for the SECD machine by Peter Landin ("The mechanical evaluation of expressions", 1964). Guy Steele and Gerald Sussman's Scheme (1975) made lexical scope and closures standard in the Lisp family, and *Structure and Interpretation of Computer Programs* (Abelson and Sussman, 1985) taught a generation to write interpreters. John Reynolds's "Definitional interpreters for higher-order programming languages" (1972) analysed what an interpreter inherits from its host and introduced defunctionalisation and the use of continuations to fix evaluation order. Friedman, Wand and Haynes's *Essentials of Programming Languages* (1992; 3rd edition by Friedman and Wand, 2008) and Krishnamurthi's *Programming Languages: Application and Interpretation* (2007) teach the whole subject through interpreters, as this course does.
:::

## Where this leads

[[programming-languages/scope-binding]] modifies the interpreter to give dynamic scope, mutable variables and other parameter-passing mechanisms, and discusses where frames live. [[programming-languages/type-systems]] writes a second structural recursion over the same ASTs — a type checker — that predicts, without running the program, that `InterpError` cannot occur. [[programming-languages/control]] rewrites the interpreter in continuation-passing style to add exceptions and first-class continuations. A compiler ([[compilers]]) does ahead of time what the interpreter does at each step: resolving names to addresses, laying out closures as records, and generating code instead of dispatching on syntax.

::: summary
- An **interpreter** evaluates an AST directly; writing one forces every semantic question to be answered. **Desugaring** reduces a rich surface syntax to a small core.
- Substitution-based evaluation is correct but copies function bodies at every call; for closed call-by-value programs no variable capture can occur ([[#lem-closed-subst]]).
- An **environment** maps variables to values and acts as a delayed substitution ([[#def-environment]]); a function value is a **closure**, code plus the environment of its creation ([[#def-closure]]).
- The environment semantics evaluates a function body in the *closure's* environment extended with the parameter; that rule is **lexical scope** ([[#def-env-semantics]]).
- Frames form chains (and, for recursion, cycles); because closures can outlive the calls that created their frames, frames live on the heap.
- The environment interpreter computes the same results as substitution ([[#thm-env-correct]]), much more cheaply.
- A **definitional interpreter** inherits evaluation order, number representation and stack limits from its host unless written to avoid it.
:::

## Exercises

::: exercise Evaluating by hand {level=1 check="20"}
What does `(let ((x 2)) (let ((f (lambda (y) (* x y)))) (let ((x 10)) (f x))))` evaluate to? Explain which binding of `x` each occurrence refers to. (Enter the value.)
::: solution
The argument `x` in `(f x)` is evaluated in the innermost frame, so it is $10$. Inside `f`, `x` refers to the binding visible where the lambda was written, $x = 2$. So the result is $2 \times 10 = 20$, which `run` confirms. Under dynamic scope it would be $10 \times 10 = 100$.
:::
:::

::: exercise Counting frames {level=1 check="3"}
How many closures and how many environment frames (not counting the initial empty frame) does `ev` create when running `((lambda (f) (f (f 3))) (lambda (x) (* x x)))`? (Enter the number of frames.)
::: solution
Two closures, one for each `lambda` evaluated (`(lambda (f) …)` and `(lambda (x) …)`). Frames are created by applications (and by `let`/`letrec`, of which there are none): the outer call binds `f` (one frame), and inside it `f` — the squaring closure — is called twice, each call creating a frame binding `x`, first to $3$ and then to $9$. So $3$ frames; the result is $81$.
:::
:::

::: exercise let is sugar {level=1}
Show, using the rules of [[#def-env-semantics]], that `(let ((x e1)) e2)` and `((lambda (x) e2) e1)` evaluate to the same value in every environment. Why might a language still keep `let` as a separate construct?
::: solution
For the application: the function evaluates to $\langle \lambda x.\,e_2, \rho\rangle$; the argument gives $\rho \vdash e_1 \Downarrow v_1$; and the body is evaluated in $\rho[x \mapsto v_1]$. That is exactly the premises of the `let` rule, so $\rho \vdash (\mathsf{let}\ \ldots) \Downarrow v$ if and only if $\rho \vdash ((\mathsf{lambda}\ (x)\ e_2)\ e_1) \Downarrow v$. Languages keep `let` because it reads better (the name is next to its value) and, more importantly, because a type system can treat it more generously: in ML, `let`-bound variables can be polymorphic while λ-bound ones cannot ([[programming-languages/type-inference]]). The interpreter also saves the creation of one closure.
:::
:::

::: exercise Short-circuit operators {level=2}
Add `and` and `or` to Fun. Explain why they cannot be ordinary primitives evaluated by `prim`, and implement them by desugaring in `parse`.
::: solution
Like Python's, `(and a b)` should not evaluate `b` when `a` is false — `(and (= n 0) (< (/ 1 n) 1))` relies on it. A primitive evaluates both operands before `prim` is called, because Fun is call-by-value. Desugar instead:

```python
        case ["and", a, b]: return If(parse(a), parse(b), Bool(False))
        case ["or", a, b]:  return If(parse(a), Bool(True), parse(b))
```

(placed before the general `[op, l, r]` case). `if` evaluates only the chosen branch, so the operators short-circuit. These versions require booleans; Python's `and` and `or` instead return one of their operands.
:::
:::

::: exercise Recursion without letrec {level=2}
Using the $Z$ combinator, compute $10!$ in Fun without `letrec`. Explain why the $Y$ combinator would not work in this interpreter.
::: solution
```python
Z = "(lambda (f) ((lambda (x) (f (lambda (v) ((x x) v)))) (lambda (x) (f (lambda (v) ((x x) v))))))"
print(run(f"(let ((Z {Z})) (let ((fact (Z (lambda (fact) (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))))) (fact 10)))"))
```

```console
3628800
```

$Z\ F$ evaluates $F$ applied to the closure for `(lambda (v) ((x x) v))`, a value, so the self-application `(x x)` is postponed until the recursive call is made. With $Y$, the argument `(x x)` is evaluated eagerly because Fun is call-by-value ([[programming-languages/lambda-calculus#thm-fixed-point]]): it calls itself before $F$ is ever applied, and the interpreter recurses until Python raises `RecursionError`.
:::
:::

::: exercise Pairs {level=2}
Add pairs to Fun: `(pair e1 e2)`, `(fst e)`, `(snd e)`. Give the environment-semantics rules and the interpreter cases, deciding what should happen on `(fst 3)`.
::: solution
Rules: if $\rho \vdash e_1 \Downarrow v_1$ and $\rho \vdash e_2 \Downarrow v_2$ then $\rho \vdash (\mathsf{pair}\ e_1\ e_2) \Downarrow (v_1, v_2)$; if $\rho \vdash e \Downarrow (v_1, v_2)$ then $\rho \vdash (\mathsf{fst}\ e) \Downarrow v_1$, and similarly for $\mathsf{snd}$. Pairs become a new kind of value. Code:

```python
@dataclass(frozen=True)
class Pair: l: object; r: object
@dataclass(frozen=True)
class Proj: which: int; e: object
# parse:
        case ["pair", a, b]: return Pair(parse(a), parse(b))
        case ["fst", a]: return Proj(0, parse(a))
        case ["snd", a]: return Proj(1, parse(a))
# ev:
        case Pair(a, b): return (ev(a, env), ev(b, env))
        case Proj(i, a):
            v = ev(a, env)
            if type(v) is not tuple: raise InterpError(f"projection of a non-pair {v!r}")
            return v[i]
```

`(fst 3)` has no rule, so it is a run-time error, reported as `InterpError`. Representing Fun pairs as Python tuples is safe only because closures are `Closure` objects, not tuples; if closures were also tuples, `(fst (lambda (x) x))` would silently return the parameter name — the host's representation would leak into the defined language.
:::
:::

::: exercise Closures as Python functions {level=3}
Complete the higher-order interpreter `ev2` sketched above (environments as Python `dict`s, Fun functions as Python functions), including `letrec`. Test it on `(fact 20)` and on the scoping program of the quiz. Why must `letrec` mutate the dictionary rather than build a new one?
::: solution
```python
def ev2(e, env):
    match e:
        case Num(n): return n
        case Bool(b): return b
        case Var(x): return env[x]
        case Lam(x, body): return lambda v: ev2(body, {**env, x: v})
        case Prim(op, l, r): return prim(op, ev2(l, env), ev2(r, env))
        case If(c, a, b): return ev2(a, env) if ev2(c, env) else ev2(b, env)
        case Let(x, rhs, body): return ev2(body, {**env, x: ev2(rhs, env)})
        case LetRec(f, x, fb, body):
            env2 = dict(env)
            env2[f] = lambda v: ev2(fb, {**env2, x: v})
            return ev2(body, env2)
        case App(fn, arg): return ev2(fn, env)(ev2(arg, env))
```

```console
>>> ev2(parse(read("(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 20))")), {})
2432902008176640000
>>> ev2(parse(read("(let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((x 100)) (f 10))))")), {})
11
```

`{**env, x: v}` copies the dictionary, so extension never disturbs an environment captured earlier — the same persistence the `Env` frames achieved by sharing. In `letrec`, the Python lambda must see a dictionary in which `f` is already bound to the lambda itself; building `{**env2, f: …}` after creating the lambda would give the lambda an environment without `f`. Assigning `env2[f]` after the lambda captures `env2` (by reference) ties the knot, exactly as `frame.vars[f] = …` did. (This sketch omits the type checks on `if` guards, so it inherits Python's truthiness: `(if 1 2 3)` gives $2$ — another example of the warning above.)
:::
:::

::: exercise Big-step determinism {level=3}
Prove that the environment semantics is deterministic: if $\rho \vdash e \Downarrow v$ and $\rho \vdash e \Downarrow v'$ then $v = v'$. Which feature would you add to Fun to break this property, and how would the rules change?
::: solution
By induction on the derivation of $\rho \vdash e \Downarrow v$, examining the other derivation. For each syntactic form of $e$ there is exactly one rule, except `if`, which has two rules distinguished by the value of the guard. Constants, variables and lambdas: the result is determined by $e$ and $\rho$ ($\rho(x)$ is a function of $x$; the closure is $\langle \lambda x.\,e, \rho\rangle$). Application: both derivations evaluate $e_1$ and $e_2$ in $\rho$; by the induction hypothesis they get the same closure $\langle \lambda x.\,e, \rho'\rangle$ and the same $v_2$, so the third premises evaluate the same $e$ in the same environment $\rho'[x \mapsto v_2]$, and the induction hypothesis gives $v = v'$. `if`: by induction the guard has a unique value, so both derivations use the same rule, and the chosen branch has a unique value. `let` and the primitives are similar, and `letrec` builds the same cyclic environment. A non-deterministic choice operator `(amb e1 e2)`, with rules $\rho \vdash e_1 \Downarrow v \Rightarrow \rho \vdash (\mathsf{amb}\ e_1\ e_2) \Downarrow v$ and the same for $e_2$, breaks determinism. So would a primitive that reads input, or concurrency ([[programming-languages/concurrency-models]]); the rules then need an extra component (the input stream, a scheduler) or must be read as a relation rather than a function.
:::
:::
