Most of a program's control flow is invisible: an expression is evaluated, its value is handed to whatever was waiting for it, and the computation moves on. Some constructs interrupt that flow. A `return` in the middle of a loop abandons the rest of the loop; `raise` abandons every enclosing computation up to the nearest handler; a generator's `yield` suspends a function half-way through and later resumes it; `await` does the same while waiting for input. All of them manipulate the same thing — the **rest of the computation**, what the program was going to do with the value of the current expression — and the idea that makes them precise is the **continuation**.

This chapter defines continuations through the evaluation contexts of [[programming-languages/syntax-semantics]], gives a formal semantics to exceptions, rewrites the interpreter of [[programming-languages/interpreters]] in **continuation-passing style** so that it no longer depends on Python's call stack, and uses the result to add exceptions and first-class continuations (`call/cc`) with a few lines each. We then look at the CPS transformation of the λ-calculus, at generators and coroutines as restricted continuations, and at the typing of control, where `call/cc` turns out to correspond to a law of classical logic.

## Continuations as evaluation contexts

In the small-step semantics of NB, a step happens at one place inside the term, determined by the congruence rules. The rest of the term is an **evaluation context**, a term with a hole where the step happens ([[programming-languages/syntax-semantics]], exercise *Evaluation contexts*). For the call-by-value λ-calculus with numbers:

$$
E \;::=\; [\,] \mid E\ t \mid v\ E \mid E + t \mid v + E \mid \mathsf{if}\ E\ \mathsf{then}\ t\ \mathsf{else}\ t
$$

Every term that is not a value decomposes uniquely as $E[r]$, a context around a **redex** $r$ (a term to which a computation rule applies), and one step is $E[r] \to E[r']$. In $1 + ((\lambda x.\,x \cdot 2)\ 5)$ the redex is the application and the context is $E = 1 + [\,]$.

::: definition Continuation {#def-continuation}
The **continuation** of a sub-expression is the evaluation context surrounding it, viewed as a function from the sub-expression's value to the final result of the program: for $E[r]$, the continuation of $r$ is $\lambda v.\,E[v]$ (run to completion).
:::

In $1 + ((\lambda x.\,x \cdot 2)\ 5)$, the continuation of the application is "add one to it and stop". Every expression has a continuation, whether or not the language lets you see it; in an implementation it is represented by the **control stack** (the return addresses and saved intermediate values) — the continuation of a function call is everything above its frame. A **tail call** is a call whose continuation is the same as that of the calling function: in `def f(n): return g(n - 1)`, `g` returns directly to `f`'s caller, so `f`'s frame is not needed while `g` runs.

## Exceptions

An exception discards part of the continuation: `raise` jumps to the nearest enclosing handler, and everything between is abandoned.

::: definition Semantics of exceptions {#def-exceptions}
Add terms $\mathsf{raise}\ t$ and $\mathsf{try}\ t_1\ \mathsf{with}\ x \Rightarrow t_2$, with $\mathsf{raise}\ E$ as a new context form, and the rules

$$
\begin{gathered}
\frac{E \ne [\,] \text{ contains no } \mathsf{try}}{E[\mathsf{raise}\ v] \to \mathsf{raise}\ v}\ \text{(E-Raise)}
\qquad
\frac{}{\mathsf{try}\ v\ \mathsf{with}\ x \Rightarrow t_2 \to v}\ \text{(E-TryV)}
\\[1.2em]
\frac{}{\mathsf{try}\ (\mathsf{raise}\ v)\ \mathsf{with}\ x \Rightarrow t_2 \to t_2[x := v]}\ \text{(E-TryRaise)}
\qquad
\frac{t_1 \to t_1'}{\mathsf{try}\ t_1\ \mathsf{with}\ x \Rightarrow t_2 \to \mathsf{try}\ t_1'\ \mathsf{with}\ x \Rightarrow t_2}\ \text{(E-Try)}
\end{gathered}
$$

The evaluation contexts $E$ do not extend into the body of a $\mathsf{try}$ (E-Try handles that), so E-Raise discards exactly the context up to the nearest enclosing $\mathsf{try}$. A program whose final result is $\mathsf{raise}\ v$ has terminated with an **uncaught exception**.
:::

::: example Tracing exceptions {#ex-exn-trace}
Evaluate $1 + (10 + \mathsf{raise}\ 5)$ and $1 + \mathsf{try}\ (10 + \mathsf{raise}\ 5)\ \mathsf{with}\ e \Rightarrow e \cdot 100$, naming the rules.
::: solution
In the first term the redex $\mathsf{raise}\ 5$ (its argument is already a value) sits in the context $E = 1 + (10 + [\,])$, which contains no $\mathsf{try}$. E-Raise discards it in one step: $1 + (10 + \mathsf{raise}\ 5) \to \mathsf{raise}\ 5$, an uncaught exception. The pending additions are never performed.

In the second term the context of the raise *inside* the $\mathsf{try}$ is $10 + [\,]$, so E-Try with E-Raise inside gives $1 + \mathsf{try}\ (\mathsf{raise}\ 5)\ \mathsf{with}\ e \Rightarrow e \cdot 100$. Now E-TryRaise substitutes $5$ for $e$: $1 + 5 \cdot 100 \to 1 + 500 \to 501$. The handler's result goes to the continuation of the whole $\mathsf{try}$, "add $1$"; the discarded part was only "add $10$". The CPS interpreter below gives the same answer, $501$.
:::
:::

For typing, $\mathsf{raise}\ t$ has *every* type, because it never returns: $\Gamma \vdash t : T_{\mathrm{exn}}$ implies $\Gamma \vdash \mathsf{raise}\ t : T$ for any $T$, where $T_{\mathrm{exn}}$ is the type of exception values (ML's extensible type `exn`, a class hierarchy in Python and Java). A handler must have the same type as the body it protects. Type safety then has to be restated:

::: theorem Safety with exceptions {#thm-safety-exn}
In the simply typed λ-calculus with exceptions, if $\varnothing \vdash t : T$ then $t$ is a value, or $t = \mathsf{raise}\ v$ for a value $v$, or $t \to t'$ with $\varnothing \vdash t' : T$.
:::

::: proof
Preservation is proved as in [[programming-languages/type-systems#thm-preservation]], with new cases: for E-Raise, $\mathsf{raise}\ v$ can be given any type, in particular $T$; for E-TryV, the body $v$ has type $T$ by inversion; for E-TryRaise, the handler is typed under $x{:}T_{\mathrm{exn}}$ with type $T$, and $v : T_{\mathrm{exn}}$ by inversion, so the substitution lemma applies. For progress, extend the induction of [[programming-languages/type-systems#thm-progress]]: in every case where a sub-term in evaluation position is $\mathsf{raise}\ v$ — say $t = t_1\ t_2$ with $t_1 = \mathsf{raise}\ v$ — the whole term is $E[\mathsf{raise}\ v]$ with a non-empty, $\mathsf{try}$-free context, and E-Raise applies; for $t = \mathsf{try}\ t_1\ \mathsf{with}\ \ldots$, by induction $t_1$ is a value (E-TryV), a raise (E-TryRaise), or steps (E-Try).
:::

The theorem says what "a well-typed program cannot go wrong" means in a language with exceptions: it may terminate with an uncaught exception, which is a *defined* outcome, never a stuck state. Some languages also track exceptions in types — Java's checked exceptions (`throws IOException`) and the effect systems of Koka and OCaml 5 — so that the type says *which* exceptions may escape.

::: warning Exceptions are not cheap gotos — and not free
It is tempting to use exceptions for ordinary control flow ("raise `Found` from deep inside a search"). In Python this is idiomatic and reasonably fast (`StopIteration` ends every `for` loop), but in C++ and Java an exception that is actually thrown costs microseconds — it must search tables to unwind every frame between `throw` and `catch`, running destructors or `finally` blocks on the way — even though the *non-throwing* path is nearly free ("zero-cost" exceptions). Exceptions also interact badly with code that holds resources: every frame they skip must release what it acquired, which is why `try`/`finally`, `with` and destructors exist. Use exceptions for exceptional outcomes, and a return value (`None`, `Option`, `Result`) when "not found" is an ordinary answer.
:::

## Continuation-passing style

The interpreters of [[programming-languages/interpreters]] borrow Python's control stack: `ev(App(f, a))` calls `ev(f)`, waits for its result, then calls `ev(a)`. The continuation of each sub-evaluation lives implicitly in Python's frames. That has two costs. We cannot express control operators that capture or discard the continuation, except by borrowing Python's exceptions; and a Fun program recursing $100\,000$ deep needs some $300\,000$ Python frames, far beyond Python's default limit of $1000$.

The remedy is to make the continuation an explicit argument.

::: definition Continuation-passing style {#def-cps}
A function is in **continuation-passing style** (CPS) if it takes an extra argument $k$, its continuation, and instead of returning a value $v$ it calls $k(v)$. In a program written entirely in CPS, every call is a tail call: no function does anything after a call returns.
:::

Compare direct style and CPS for factorial:

```python
def fact(n):                       # direct style: the multiplication waits on the stack
    return 1 if n == 0 else n * fact(n - 1)

def fact_k(n, k):                  # CPS: the pending multiplications are in the closure k
    if n == 0: return k(1)
    return fact_k(n - 1, lambda v: k(n * v))

print(fact(10), fact_k(10, lambda v: v))      # 3628800 3628800
```

In `fact`, the pending work "multiply by $n$" is stored in a stack frame; in `fact_k` it is stored in a closure, and the continuation for $n = 3$ is `lambda v: k3(3 * v)` where `k3` is the one for $n = 4$, and so on. The control stack has become a linked list of closures — a data structure we can copy, store, discard or invoke at will.

### A CPS interpreter

Here is the Fun interpreter rewritten in CPS. Each case receives the continuation `k` and a second continuation `h` for exceptions (the **handler**); `raise` passes its value to `h` instead of `k`, and `try` installs a new `h` for its body. Two new constructs capture continuations: `(callcc f)` calls `f` with the current continuation, packaged as a first-class value `Cont(k)`, and applying a `Cont` to a value *abandons* the current continuation and passes the value to the captured one.

```python
def ev(e, env, k, h):
    """Evaluate e in env; pass its value to k, or a raised value to h. Returns a thunk."""
    match e:
        case Num(n): return lambda: k(n)
        case Var(x): return lambda: k(env.lookup(x))
        case Lam(x, body): return lambda: k(Closure(x, body, env))
        case Prim(op, l, r):
            return lambda: ev(l, env, lambda a: ev(r, env, lambda b: lambda: k(prim(op, a, b)), h), h)
        case If(c, a, b):
            return lambda: ev(c, env, lambda v: ev(a if v else b, env, k, h), h)
        case App(fn, arg):
            return lambda: ev(fn, env, lambda f: ev(arg, env, lambda v: apply(f, v, k, h), h), h)
        case CallCC(fe):
            return lambda: ev(fe, env, lambda f: apply(f, Cont(k), k, h), h)
        case Raise(re):
            return lambda: ev(re, env, h, h)                 # the value goes to the handler
        case Try(body, x, handler):
            return lambda: ev(body, env, k, lambda v: ev(handler, Env({x: v}, env), k, h))
        # ... Bool, Let and LetRec as before, in the same style

def apply(f, v, k, h):
    match f:
        case Closure(x, body, cenv): return lambda: ev(body, Env({x: v}, cenv), k, h)
        case Cont(k2): return lambda: k2(v)                  # discard k: jump to k2

def run(src):
    result = {}
    def final(v): result["v"] = v; raise Done
    def uncaught(v): result["v"] = f"uncaught exception: {v}"; raise Done
    step = ev(parse3(read(src)), Env({}), final, uncaught)
    try:
        while True: step = step()                            # the trampoline
    except Done:
        return result["v"]
```

The other change is the **trampoline**. Even in CPS, Python would grow its stack, because it does not eliminate tail calls ([[program-design/functional-style]]). So every function returns a **thunk** — a zero-argument `lambda` describing the next call — instead of making it, and `run` calls the thunks one after another in a loop. The stack depth stays constant however deep the Fun recursion goes; the pending work lives in the chain of continuation closures on the heap.

::: example Control operators in the CPS interpreter {#ex-cps-run}
Run deep recursion, `call/cc`, exceptions and an early exit in the CPS interpreter.
::: solution
```python
print(run("(letrec ((fact (lambda (n) (if (= n 0) 1 (* n (fact (- n 1))))))) (fact 20))"))
print(run("(letrec ((count (lambda (n) (if (= n 0) 0 (+ 1 (count (- n 1))))))) (count 100000))"))
print(run("(+ 1 (callcc (lambda (k) (+ 10 (k 2)))))"))
print(run("(+ 1 (try (+ 10 (raise 5)) (catch e (* e 100))))"))
print(run("(+ 1 (raise 7))"))
print(run("""(callcc (lambda (exit)
  (letrec ((p (lambda (n) (if (= n 0) 1 (if (= n 3) (exit 0) (* n (p (- n 1))))))))
    (p 10))))"""))
```

```console
2432902008176640000
100000
3
501
uncaught exception: 7
0
```

The direct-style interpreter fails on the second program with `RecursionError: maximum recursion depth exceeded`; the trampolined one completes. In the third, `k` is the continuation "add $1$ and finish"; calling `(k 2)` inside `(+ 10 …)` abandons the pending addition of $10$ and delivers $2$ to `k`, giving $3$. In the fourth, `raise` sends $5$ to the handler installed by `try`, whose result $500$ goes to the `try`'s own continuation, "add $1$": $501$. In the fifth no handler is installed, so the initial handler `uncaught` receives the value. The last program computes $10 \cdot 9 \cdots$ but finds the factor $3$ — standing in for a zero — and escapes with `(exit 0)` without performing the pending multiplications: an early exit from deep recursion, the classic use of `call/cc`.
:::
:::

::: widget plot
f: 3*x + 8; 5
x: 0, 800
y: 0, 2500
labels: \text{direct-style interpreter}; \text{CPS interpreter with trampoline}
points: 0,8; 100,308; 200,608; 400,1208; 800,2408; 0,5; 100,5; 200,5; 400,5; 800,5
caption: Maximum depth of the Python call stack while evaluating `(count n)` (dots: measured by walking the frame chain inside the arithmetic primitive). The direct-style interpreter uses exactly $3n + 8$ frames — three Python calls per level of Fun recursion — and with Python's default limit of $1000$ frames it fails for $n$ above about $330$. The CPS interpreter with a trampoline uses $5$ frames for every $n$; the pending additions are stored in continuation closures on the heap instead. The total work is the same; only where it is remembered has changed.
:::

### First-class continuations

`call/cc` (call-with-current-continuation, from Scheme) is the most general control operator: it reifies the continuation as a value that can be invoked any number of times, from anywhere, even after the `call/cc` expression has returned.

::: definition call/cc {#def-callcc}
With evaluation contexts, the rules are

$$
E[\mathsf{callcc}\ v] \to E[v\ (\mathsf{cont}\ E)]
\qquad\qquad
E[(\mathsf{cont}\ E')\ v] \to E'[v]
$$

The first passes the current context, packaged as a value $\mathsf{cont}\ E$, to $v$; the second, when a continuation is applied, *replaces* the entire current context by the captured one.
:::

With `call/cc` one can implement exceptions, early exit, generators, coroutines and backtracking, all in the language itself. Its generality has costs. Capturing the whole continuation requires copying or sharing the control stack, so implementations allocate frames on the heap or use segmented stacks. And a continuation that can be re-entered after its frames have returned interacts awkwardly with resources and with `finally` blocks (Scheme provides `dynamic-wind` for this). Modern designs therefore prefer **delimited continuations** — operators such as `shift` and `reset` (Danvy and Filinski, 1990) that capture only the context up to a delimiter, returning a composable function — and their structured form, **effect handlers** (Plotkin and Pretnar, 2009), available in OCaml 5 since 2022.

::: quiz
What do these programs evaluate to in the CPS interpreter?
- [x] `(* 2 (callcc (lambda (k) 5)))` evaluates to $10$
- [ ] `(* 2 (callcc (lambda (k) (+ 100 (k 5)))))` evaluates to $210$
- [x] `(+ 1 (try (* 2 3) (catch e 0)))` evaluates to $7$
- [x] `(try (+ 1 (raise 2)) (catch e (+ e 40)))` evaluates to $42$
::: solution
In the first, `k` is never called and the function returns $5$ normally: $2 \times 5 = 10$. In the second, `(k 5)` abandons `(+ 100 …)` and delivers $5$ to "multiply by $2$": the result is $10$, not $210$. In the third, the body raises nothing, so the handler is ignored: $1 + 6 = 7$. In the fourth, the raise discards `(+ 1 …)` and the handler returns $2 + 40 = 42$.
:::
:::

## The CPS transformation

The interpreter above is written in CPS by hand. The translation can also be applied to programs, mechanically. For the call-by-value λ-calculus, Plotkin's translation $[\![\cdot]\!]$ maps a term to a function expecting its continuation:

$$
[\![x]\!] = \lambda k.\,k\ x,
\qquad
[\![\lambda x.\,M]\!] = \lambda k.\,k\ (\lambda x.\,[\![M]\!]),
\qquad
[\![M\ N]\!] = \lambda k.\,[\![M]\!]\ (\lambda m.\,[\![N]\!]\ (\lambda n.\,m\ n\ k)),
$$

with $k, m, n$ fresh. A value is passed directly to the continuation; an application evaluates the function, then the argument, then calls the function with the argument and the continuation. Transformed functions take two arguments, their parameter and their continuation.

```python
def cps(t):
    """Plotkin's call-by-value CPS transformation of λ-terms."""
    k = fresh("k")
    match t:
        case Var(x):
            return Lam(k, App(Var(k), t))
        case Lam(x, body):
            return Lam(k, App(Var(k), Lam(x, cps(body))))
        case App(f, a):
            m, n = fresh("m"), fresh("n")
            return Lam(k, App(cps(f), Lam(m, App(cps(a), Lam(n, App(App(Var(m), Var(n)), Var(k)))))))
```

```console
>>> show(cps(parse("f x")))
'λk97. (λk100. k100 f) (λm98. (λk101. k101 x) (λn99. m98 n99 k97))'
```

::: theorem CPS terms are in tail form {#thm-tail-form}
For every λ-term $M$, every application in $[\![M]\!]$ has a value — a variable or an abstraction — as its argument. Consequently, when $[\![M]\!]$ is applied to a value continuation and evaluated by call-by-value, no evaluation step takes place inside an argument: the evaluation context of every redex consists only of applications to values, and evaluation needs no control stack of pending argument evaluations.
:::

::: proof
By structural induction on $M$, inspecting the three clauses. In $[\![x]\!] = \lambda k.\,k\ x$ the only application has argument $x$, a variable. In $[\![\lambda x.\,M]\!] = \lambda k.\,k\ (\lambda x.\,[\![M]\!])$, the new application has an abstraction as argument, and the applications inside $[\![M]\!]$ have value arguments by the induction hypothesis. In $[\![M\ N]\!]$, the new applications are $[\![M]\!]\ (\lambda m.\ldots)$, $[\![N]\!]\ (\lambda n.\ldots)$, $m\ n$ and $(m\ n)\ k$, whose arguments are two abstractions and the variables $n$ and $k$; the applications inside $[\![M]\!]$ and $[\![N]\!]$ are covered by the induction hypothesis.

For the consequence: substituting values for variables preserves the property (a value substituted for a variable argument is a value, and substitution creates no new applications), so every term reached by β-reduction from $[\![M]\!]\ K$ with $K$ a value still has it. Call-by-value evaluates an argument only when it is not a value; since all arguments are values, the only congruence used is evaluation of the function part, and each redex is found by descending the left spine of applications.
:::

Because arguments are always values, the call-by-value restriction on β never bites: call-by-name and call-by-value evaluation of $[\![M]\!]\ K$ perform the same steps. Plotkin's "Call-by-name, call-by-value and the λ-calculus" (1975) proved that $[\![M]\!]\ (\lambda v.\,v)$ evaluates to the CPS image of the value $V$ that $M$ evaluates to under call-by-value — the CPS program is a faithful, evaluation-order-independent version of the original.

::: example Running a CPS-transformed program {#ex-cps-church}
Transform $\mathsf{plus}\ c_2\ c_3$ and $\mathsf{times}\ c_2\ c_3$ (the Church encodings of [[programming-languages/lambda-calculus]]), evaluate them by call-by-value with the identity continuation, and decode the results.
::: solution
The result of the transformed program is a CPS-converted numeral, which takes a CPS function and a continuation. To read it, pass it the CPS successor $\lambda x\,k.\,k\,(s\ x)$ (with $s$ a free variable) and a continuation that applies the result to $z$ and the identity, then count the $s$'s in the normal form.

```console
plus (2, 3) direct CBV: 2 steps; CPS CBV: 14 steps; value 5 ; tail form: True
times (2, 3) direct CBV: 2 steps; CPS CBV: 14 steps; value 6 ; tail form: True
```

Both give the right numbers. Call-by-value reduction stops at the first abstraction, so the direct programs take only two steps (substituting the arguments, without reducing under λ); the CPS versions take $14$ — CPS makes every intermediate value pass through an explicit continuation, adding administrative redexes. Practical CPS conversions in compilers (Steele's Rabbit compiler for Scheme, 1978; Appel's *Compiling with Continuations*, 1992) use a smarter "one-pass" translation that avoids creating most administrative redexes. The `tail form` column confirms [[#thm-tail-form]] on these terms.
:::
:::

CPS is a compiler's best friend: in CPS every intermediate value has a name, evaluation order is explicit, and every call is a jump with arguments — exactly the structure of machine code. It is closely related to the SSA form used in LLVM and GCC ([[compilers]]).

## Generators and coroutines

A Python generator ([[program-design/iterators-generators#def-generator]]) is a function that can suspend itself at a `yield` and be resumed later by `next`. In terms of this chapter, `yield v` captures the generator's continuation (the rest of its body), stores it in the generator object, and returns $v$ to the consumer; `next` invokes the stored continuation. The continuation is **one-shot** (it can be resumed only once) and **delimited** (it extends only to the end of the generator's body, not into the consumer), which is why generators are much cheaper to implement than `call/cc`: CPython keeps a single suspended frame.

::: example A generator built from continuations {#ex-cps-generator}
Implement a generator object from a producer written in CPS, and use it to traverse a binary tree in order; compare with a Python generator.
::: solution
```python
class CPSGenerator:
    def __init__(self, producer):
        self.resume = lambda: producer(self._yield, self._done)
    def _yield(self, value, rest):        # suspend: remember the rest of the producer
        self.resume = rest
        return value
    def _done(self):
        self.resume = None
        raise StopIteration
    def __iter__(self): return self
    def __next__(self):
        if self.resume is None: raise StopIteration
        return self.resume()

def walk(tree, yield_, k):
    """In-order traversal of (left, value, right) tuples, in CPS."""
    if tree is None: return k()
    left, v, right = tree
    return walk(left, yield_, lambda: yield_(v, lambda: walk(right, yield_, k)))

def walk_gen(tree):                       # the same with Python's generators
    if tree is not None:
        left, v, right = tree
        yield from walk_gen(left); yield v; yield from walk_gen(right)

t = (((None, 1, None), 2, None), 3, ((None, 4, None), 5, (None, 6, None)))
print(list(CPSGenerator(lambda y, d: walk(t, y, d))), list(walk_gen(t)))
```

```console
[1, 2, 3, 4, 5, 6] [1, 2, 3, 4, 5, 6]
```

`walk` visits the left subtree with a continuation that yields the root and then visits the right subtree. When it reaches `yield_(v, rest)`, the generator stores `rest` — the remainder of the traversal — and returns `v` to the caller of `next`. The next `next` calls `rest()`, which continues exactly where the traversal left off. The continuation closures play the role of the suspended frames of `walk_gen`.
:::
:::

Generators are **asymmetric coroutines**: control passes from consumer to generator and back, always returning to the resumer. **Symmetric coroutines** can transfer control to any other coroutine. Ana Lúcia de Moura and Roberto Ierusalimschy ("Revisiting coroutines", 2009) showed that asymmetric coroutines with full stacks ("stackful", able to yield from nested calls, as in Lua) are as expressive as one-shot continuations. Python's generators are *stackless* — `yield` is allowed only directly in the generator's body, and nested generators must be connected with `yield from` — and so are its `async` functions, which are generators that yield to an event loop while they wait ([[programming-languages/concurrency-models]]).

::: widget graph
nodes: consumer@0,1; gen@2,1; walk_left@3,2; walk_right@3,0
edges: consumer>gen:1; gen>walk_left:2; walk_left>consumer:3; consumer>walk_right:4; walk_right>consumer:5
algorithm: none
caption: Control transfers between a consumer and a tree-walking generator, numbered in order: (1) `next` starts the generator; (2) it descends into the left subtree; (3) `yield` captures the rest of the walk and returns a value straight to the consumer — the walk's pending frames are not popped, only suspended; (4) the next `next` resumes the captured continuation, which continues into the right subtree; (5) the next `yield` returns to the consumer again. Edge labels give the order. With a normal function call, control could only return along the edge it came in on; with continuations it can jump to wherever the captured context says.
:::

## Typing control

What is the type of `call/cc`? It takes a function $f$ that receives the continuation and returns an $A$; the continuation, if invoked with an $A$, never returns to its caller, so it can be given the type $A \to B$ for any $B$; and the whole expression has type $A$:

$$
\mathsf{callcc} : ((A \to B) \to A) \to A.
$$

That is **Peirce's law**, the classical tautology from [[programming-languages/type-systems]] that has no proof in intuitionistic logic and no inhabitant in the pure simply typed λ-calculus. Timothy Griffin's "A formulae-as-types notion of control" (1990) made the observation: adding control operators to a typed language extends the Curry–Howard correspondence from intuitionistic to **classical** logic, and the CPS transformation corresponds to the double-negation translation of classical into intuitionistic logic, with the answer type of the program playing the role of falsity. Under the CPS translation, a term of type $A$ becomes a term of type $(A \to R) \to R$ for the answer type $R$ — "if you tell me what to do with an $A$, I will produce the final answer" — which is $\neg\neg A$ when $R$ is read as "false".

::: history
Continuations were discovered several times. Adriaan van Wijngaarden described the transformation of programs into continuation-passing form in 1964; Peter Landin's J operator (1965) captured "the program point" in ISWIM; and Christopher Strachey and Christopher Wadsworth introduced the term **continuation** in denotational semantics ("Continuations: a mathematical semantics for handling full jumps", 1974), showing how to give meaning to `goto`. John Reynolds's "The discoveries of continuations" (1993) tells the story. Gordon Plotkin's 1975 paper on call-by-name and call-by-value introduced the CPS transformation in its modern form; Guy Steele and Gerald Sussman's Scheme (1975) had `catch`, which became `call-with-current-continuation` in the Revised Report (1986). Exceptions in their modern form came from PL/I's ON-conditions (1960s), John Goodenough's "Exception handling: issues and a proposed notation" (1975), CLU (1977) and ML (1978–1990). Matthias Felleisen's evaluation-context semantics of control (1987–1992), Olivier Danvy and Andrzej Filinski's `shift`/`reset` (1990), and Gordon Plotkin and Matija Pretnar's effect handlers (2009) are the modern theory; generators go back to Alphard and CLU's iterators (1977), Icon (1977), and Python's PEP 255 (2001).
:::

## Where this leads

[[programming-languages/concurrency-models]] uses continuations to explain threads (a scheduler is a queue of continuations), `async`/`await` (a coroutine that yields to an event loop) and futures. Compilers use CPS or SSA intermediate languages and implement exceptions with unwind tables ([[compilers]]). Operating systems save and restore the "continuation" of a process — its registers and stack — on every context switch ([[operating-systems]]).

::: summary
- The **continuation** of an expression is the rest of the computation, formally its evaluation context ([[#def-continuation]]); implementations represent it by the control stack.
- **Exceptions** discard the continuation up to the nearest handler ([[#def-exceptions]]); with them, type safety allows an uncaught exception as a defined outcome ([[#thm-safety-exn]]).
- **Continuation-passing style** makes the continuation an explicit function argument ([[#def-cps]]); every call becomes a tail call, and with a **trampoline** an interpreter needs constant stack depth.
- A CPS interpreter implements `raise`/`try` with a second (handler) continuation and **call/cc** by packaging `k` as a value ([[#def-callcc]]).
- Plotkin's **CPS transformation** produces terms in tail form ([[#thm-tail-form]]), whose meaning does not depend on evaluation order; compilers use CPS and its relative SSA.
- **Generators** and **coroutines** are one-shot, delimited continuations; **delimited continuations** and **effect handlers** are the structured modern form of control.
- `call/cc` has the type of **Peirce's law**: control operators correspond to classical logic.
:::

## Exercises

::: exercise Contexts and continuations {level=1}
For each term, find the redex and the evaluation context, and describe the continuation of the redex in words: (a) $(\lambda x.\,x + 1)\,((\lambda y.\,y \cdot 2)\ 3)$; (b) $\mathsf{if}\ (1 < 2)\ \mathsf{then}\ 5\ \mathsf{else}\ 6$; (c) $(2 + 3) + (4 + 5)$.
::: solution
(a) The function part is a value, so the redex is the argument $(\lambda y.\,y \cdot 2)\ 3$, in context $(\lambda x.\,x + 1)\,[\,]$: "pass the value to the function that adds one". (b) Redex $1 < 2$, context $\mathsf{if}\ [\,]\ \mathsf{then}\ 5\ \mathsf{else}\ 6$: "choose a branch according to the value". (c) Left to right: redex $2 + 3$, context $[\,] + (4 + 5)$: "evaluate $4 + 5$ and add it to the value".
:::
:::

::: exercise Exceptions by hand {level=1 check="31"}
Evaluate $\mathsf{try}\ (1 + \mathsf{try}\ (10 + \mathsf{raise}\ 3)\ \mathsf{with}\ e \Rightarrow \mathsf{raise}\ (e \cdot 10))\ \mathsf{with}\ e \Rightarrow e + 1$ with the rules of [[#def-exceptions]]. (Enter the final value.)
::: solution
The inner raise discards $10 + [\,]$ (E-Raise), and the inner handler receives $3$ (E-TryRaise), giving $1 + \mathsf{try}\ \ldots$ replaced by $1 + \mathsf{raise}\ (3 \cdot 10) \to 1 + \mathsf{raise}\ 30$. That raise discards $1 + [\,]$; the outer handler receives $30$ and returns $31$.
:::
:::

::: exercise call/cc by hand {level=1 check="21"}
What does `(+ 1 (callcc (lambda (k) (* 10 (+ 2 (k 20))))))` evaluate to? (Enter the value.)
::: solution
`k` is the continuation "add $1$ and finish". Evaluating the body, `(k 20)` abandons the pending `(+ 2 …)` and `(* 10 …)` and delivers $20$ to `k`: the result is $21$.
:::
:::

::: exercise CPS by hand {level=2}
Convert to CPS by hand (using Python): (a) `def sum_list(xs): return 0 if not xs else xs[0] + sum_list(xs[1:])`; (b) a function `find(tree, p, k_found, k_missing)` that searches a binary tree for a value satisfying `p`, calling `k_found(v)` on the first one found in pre-order and `k_missing()` if none, without exceptions.
::: solution
```python
def sum_list_k(xs, k):
    if not xs: return k(0)
    return sum_list_k(xs[1:], lambda s: k(xs[0] + s))

def find(tree, p, k_found, k_missing):
    if tree is None: return k_missing()
    left, v, right = tree
    if p(v): return k_found(v)
    return find(left, p, k_found,
                lambda: find(right, p, k_found, k_missing))

t = (((None, 1, None), 2, None), 3, ((None, 4, None), 5, (None, 6, None)))
print(sum_list_k([1, 2, 3], lambda s: s))                       # 6
print(find(t, lambda v: v % 2 == 0, lambda v: v, lambda: None)) # 2 (pre-order: 3, 2, ...)
```

Two continuations — success and failure — are the CPS form of a search with backtracking: the failure continuation of the left subtree says "now try the right subtree". Finding the answer calls `k_found` directly, abandoning the pending failure continuations: an early exit with no exceptions. (Pre-order visits $3$, then $2$, which is even.)
:::
:::

::: exercise Typing exceptions {level=2}
In the simply typed λ-calculus with exceptions of type $\mathsf{Nat}$, give the type of (a) $\lambda x{:}\mathsf{Nat}.\,\mathsf{if}\ \mathsf{iszero}\ x\ \mathsf{then}\ \mathsf{raise}\ 0\ \mathsf{else}\ \mathsf{true}$; (b) $\mathsf{try}\ (\mathsf{raise}\ 3)\ \mathsf{with}\ e \Rightarrow \mathsf{iszero}\ e$; (c) explain why "$\mathsf{raise}\ t$ has every type" does not break uniqueness-of-types-based checking, and how a checker handles it.
::: solution
(a) $\mathsf{Nat} \to \mathsf{Bool}$: the then-branch $\mathsf{raise}\ 0$ can be given type $\mathsf{Bool}$ to match the else-branch. (b) $\mathsf{Bool}$: the body can be given the handler's type, and the handler has type $\mathsf{Bool}$ with $e : \mathsf{Nat}$. (c) Uniqueness of types fails — $\mathsf{raise}\ 0$ has every type — so a checker cannot simply compute "the" type. Algorithmically, $\mathsf{raise}$ is given a special bottom type $\bot$ (or a fresh type variable, in an ML-style inferencer) that is compatible with everything: at an $\mathsf{if}$, the type of the other branch is taken; at the top level a fresh variable remains unconstrained. Languages with subtyping make $\bot$ (Scala's `Nothing`, TypeScript's `never`, Rust's `!`) a subtype of every type.
:::
:::

::: exercise Generators from call/cc {level=2}
Explain how `yield` could be implemented in a language with `call/cc` (such as Scheme): which continuations must be captured, and where are they stored? Why can a Python generator not yield from inside a nested ordinary function call, while a generator implemented with `call/cc` can?
::: solution
A generator needs two saved continuations: the **consumer's** (where `next` was called, to which a yielded value must be returned) and the **producer's** (the rest of the generator, to resume on the next `next`). `next` captures its own continuation with `call/cc`, stores it in the generator object, and invokes the saved producer continuation (initially: start the body). `yield v` captures the producer's continuation with `call/cc`, stores it, and invokes the saved consumer continuation with $v$. Because `call/cc` captures the *whole* context, including any nested function calls inside the generator body, `yield` may occur at any depth. Python generators are implemented by suspending a single frame, the generator function's own; a nested call's frame is not part of the generator object, so `yield` there would have nothing to suspend — hence `yield from`, which makes each level a generator of its own and chains them.
:::
:::

::: exercise Trampolining a mutual recursion {level=3}
`even(n)` and `odd(n)` defined by mutual recursion (`even(0) = True`, `even(n) = odd(n-1)`, `odd(0) = False`, `odd(n) = even(n-1)`) overflow Python's stack for `n = 100000`. Write a trampolined version and explain why it needs constant stack space. Then explain the relation to the CPS interpreter's `run` loop.
::: solution
```python
def even(n): return True if n == 0 else (lambda: odd(n - 1))
def odd(n):  return False if n == 0 else (lambda: even(n - 1))

def trampoline(r):
    while callable(r):
        r = r()            # perform the pending tail call
    return r

print(trampoline(even(100000)), trampoline(odd(7)))   # True True
```

Each function, instead of making its tail call, returns a thunk describing it, so it returns immediately and its frame is popped; the loop makes the next call from a constant stack depth of two frames. This works because every call here is a tail call — there is nothing to do after it returns. The CPS interpreter first turns *every* call into a tail call (by CPS), and then trampolines them all; the work that direct-style code would do after a return is in the continuation closures. (Booleans are not callable, so `callable(r)` distinguishes the final answer; a general trampoline wraps answers in a marker class.)
:::
:::

::: exercise Re-entering a continuation {level=3}
In the CPS interpreter, a continuation captured by `call/cc` can be invoked after the `call/cc` expression has returned. Consider `(let ((k0 (callcc (lambda (k) k)))) …)`: describe what `k0` is and what invoking it later with a value $v$ does. Write a Fun program that uses this to run a loop three times, using a counter held in an outer `letrec`-free style of your choice, or explain precisely why our interpreter's environments (which have no assignment) make the loop impossible without mutable state, and what Scheme programs use instead.
::: solution
`(callcc (lambda (k) k))` returns the continuation itself: `k0` is bound to "the continuation of the `callcc`", which is "bind the value to `k0` and evaluate the body of the `let`". Invoking `(k0 v)` later restarts the body of the `let` from the beginning, with `k0` now bound to $v$. So the body runs again — a loop. But each re-entry rebinds `k0` and recomputes everything else from the same environment: Fun has no assignment, so nothing distinguishes the second pass from the first except the new value of `k0`. To count iterations, the value passed must carry the state: invoke `(k0 (pair k0 (+ n 1)))`, binding the pair, and destructure it at the top of the body; with the `pair` extension of [[programming-languages/interpreters]] this gives a loop that runs a chosen number of times. Scheme programs typically combine `call/cc` with `set!`, storing the continuation in a mutable variable — which is exactly how generators, backtracking (`amb`) and coroutine libraries are written in Scheme. The example shows why first-class, re-entrant continuations are powerful and why they make reasoning hard: a `let` body may run more than once.
:::
:::
