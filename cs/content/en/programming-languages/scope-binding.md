Run this small shell script:

```console
$ cat dyn.sh
x=global
show() { echo "show sees x=$x"; }
caller() { local x=caller; show; }
show
caller
$ bash dyn.sh
show sees x=global
show sees x=caller
```

The function `show` refers to a variable `x`. Called from the top level, it sees the global `x`; called from `caller`, it sees `caller`'s local `x` — although `show` was written outside `caller` and knows nothing about it. In Python, Scheme, C or Java, the equivalent program would print `global` twice. The shell resolves names by looking at *who called whom*; most languages resolve them by looking at *where the code was written*. Both are rules for connecting a use of a name with a declaration of it, and choosing between them is one of the basic decisions in the design of a language.

This chapter is about names: what a name can be bound to and when, the rules of scope that decide which binding a use of a name refers to, how scope interacts with first-class functions (the "funarg problem"), how assignment forces us to separate names from storage, the mechanisms for passing arguments to procedures, and how long storage lives. We change the interpreter of [[programming-languages/interpreters]] to try out each alternative.

## Bindings and binding times

::: definition Binding, scope, extent {#def-binding}
A **binding** is an association between a name and an entity — a value, a storage location, a function, a type, a module. A **declaration** creates a binding. The **scope** of a binding is the region of the program text in which uses of the name refer to it. The **lifetime** (or **extent**) of an entity is the period of execution during which it exists.
:::

Scope is a property of program text; lifetime is a property of executions. They often coincide for local variables, but not always: a variable captured by a closure lives on after its scope has been left, and a `static` local variable in C has block scope but lives for the whole run.

The **binding time** of a property is the moment it is fixed: at *language design* time (the meaning of `+` on integers in Python), *implementation* time (the width of `int` in a C compiler), *compile* time (the type of a Java local variable, the offset of a field in a structure), *link* time (the address of a library function, [[computer-systems/linking-loading]]), *load* time (the address of a global variable under address-space randomisation) or *run* time (the value of a variable; in Python, which method `x.area()` calls). Early binding enables checking and efficient code; late binding enables flexibility. Much of the difference between "static" and "dynamic" languages is a difference in binding times.

## Static and dynamic scope

Scopes nest: a function body, a `let` body or a block introduces bindings visible inside it, and an inner declaration of a name **shadows** an outer one. The question is what "inside" means when functions are called from elsewhere.

::: definition Lexical and dynamic scope {#def-scope-rules}
Under **lexical** (or **static**) **scope**, a use of a name refers to the binding in the innermost *textually enclosing* construct that declares it. Under **dynamic scope**, a use of a name refers to the most recent binding *still active in the execution* — the one made by the most recently called function that has not yet returned.
:::

In the environment semantics of [[programming-languages/interpreters#def-env-semantics]] the two rules differ in one place, the environment used for the body of a function:

$$
\text{lexical: } \frac{\rho \vdash e_1 \Downarrow \langle \lambda x.\,e, \rho'\rangle \quad \rho \vdash e_2 \Downarrow v_2 \quad \rho'[x \mapsto v_2] \vdash e \Downarrow v}{\rho \vdash (e_1\ e_2) \Downarrow v}
\qquad
\text{dynamic: } \frac{\rho \vdash e_1 \Downarrow \lambda x.\,e \quad \rho \vdash e_2 \Downarrow v_2 \quad \rho[x \mapsto v_2] \vdash e \Downarrow v}{\rho \vdash (e_1\ e_2) \Downarrow v}
$$

Under dynamic scope a function value needs no environment at all, only its code; the body is evaluated in the *caller's* environment. The interpreter change is two lines:

```python
def ev_dyn(e, env):
    match e:
        case Lam(x, body): return Closure(x, body, None)      # no environment captured
        case App(fn, arg):
            f = ev_dyn(fn, env); v = ev_dyn(arg, env)
            return ev_dyn(f.body, Env({f.param: v}, env))     # the caller's environment
        # ... all other cases as in ev, calling ev_dyn
```

::: example The same programs, two scope rules {#ex-two-scopes}
Run the two programs below under lexical and dynamic scope:

```text
p1 = (let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((x 100)) (f 10))))
p2 = (let ((make-adder (lambda (n) (lambda (x) (+ x n)))))
       (let ((add5 (make-adder 5))) (add5 10)))
```
::: solution
```console
lexical  p1: 11     dynamic  p1: 110
lexical  p2: 15     dynamic  p2: error: unbound variable n
```

In `p1`, the body `(+ x y)` of `f` runs while the binding $x = 100$ is the most recent, so dynamic scope gives $110$; lexical scope uses the $x = 1$ visible where `f` was written. In `p2` the difference is worse than a different answer. `make-adder` returns `(lambda (x) (+ x n))`, and under dynamic scope the binding of `n` disappears when `make-adder` returns. When `add5` is later called, no `n` is active, and the program fails. Under dynamic scope, functions cannot usefully return functions that refer to their parameters — the **upward funarg problem**.
:::
:::

::: widget graph
nodes: G@3,2; Fx1@2,2; Ff@1,2; Fx100@0,2; Fy@1,0.8
edges: Fx1>G; Ff>Fx1; Fx100>Ff; Fy>Fx1; Fy>Fx100
algorithm: bfs
start: Fy
caption: The frames of `p1` at the moment `(+ x y)` is evaluated. Along the top, each `let` frame points to its parent: $F_{x1} = \set{x \mapsto 1}$, $F_f = \set{f \mapsto \ldots}$, $F_{x100} = \set{x \mapsto 100}$. The call frame $F_y = \set{y \mapsto 10}$ has two candidate parents: the **static link** to $F_{x1}$, where the function was defined, and the **dynamic link** to $F_{x100}$, the caller's frame. Lexical scope follows the static link and finds $x = 1$ one step away; dynamic scope follows the dynamic link and finds $x = 100$ first. Step through the search from $F_y$ and note which $x$ each route reaches first.
:::

Dynamic scope has a serious defect beyond the funarg problem: it makes the names of local variables visible to every function called. Renaming a local variable — a change that should never matter — can change the behaviour of unrelated code.

::: proposition Dynamic scope does not respect α-equivalence {#prop-dyn-alpha}
Under lexical scope, renaming a bound variable (consistently, without capture) never changes the result of a program. Under dynamic scope it can.
:::

::: proof
For lexical scope, by [[programming-languages/interpreters#thm-env-correct]] and its converse, a closed program has the same result under the environment semantics as under the substitution semantics, and substitution semantics is defined on α-equivalence classes ([[programming-languages/lambda-calculus#def-alpha]]): the β-rule and substitution treat α-equivalent terms identically. So α-equivalent programs have the same results.

For dynamic scope, a counterexample suffices. In `p1`, rename the variable bound by the innermost `let` from `x` to `z`, giving `(let ((x 1)) (let ((f (lambda (y) (+ x y)))) (let ((z 100)) (f 10))))`. The renaming is consistent (`z` occurs nowhere else) and the two programs are α-equivalent. Under dynamic scope the original gives $110$, the renamed one $11$.
:::

That is why almost every language designed since the late 1970s uses lexical scope. Dynamic scope survives in a few places, where it is sometimes the point: Unix shells, Emacs Lisp (whose files default to dynamic scope unless they enable `lexical-binding`, the default for new code since Emacs 27 in 2020), Perl's `local`, TeX macros, and *dynamically scoped parameters* in Racket, Common Lisp ("special variables") and Scala's implicits, used for settings such as the current output port that many functions consult without passing them explicitly. Environment variables of processes are dynamically scoped too: a child process inherits them from its parent, whoever wrote it.

### Python's scope rules

Python is lexically scoped, with two twists. First, scopes are functions (and classes and modules), not blocks: a variable assigned in a `for` loop is visible after it. Second, whether a name is local to a function is decided *statically*, for the whole body: a name is local if it is assigned anywhere in the function (unless declared `global` or `nonlocal`). Looking a name up then follows the **LEGB** order — local, enclosing functions, global (module), built-in.

```python
x = 10
def f():
    print(x)        # x is local to f (assigned below), so this read fails
    x = 20
try:
    f()
except UnboundLocalError as e:
    print("UnboundLocalError:", e)

def counter():
    n = 0
    def inc():
        nonlocal n      # n refers to counter's variable, which inc may assign
        n += 1
        return n
    return inc
c = counter(); c(); c()
print(c(), c.__code__.co_freevars, c.__closure__[0].cell_contents)
```

```console
UnboundLocalError: cannot access local variable 'x' where it is not associated with a value
3 ('n',) 3
```

The first function fails although a global `x` exists, because the compiler decided at compile time that `x` in `f` is local — the binding is static, even though the error is reported at run time. In `counter`, the closure `inc` refers to the *variable* `n` of the enclosing call, not to its value at creation time; Python stores such variables in **cells** (`__closure__`) shared by the enclosing function and every closure that captures them. This is why lambdas created in a loop all see the loop variable's final value ([[program-design/higher-order-functions]]).

::: quiz
Which programs print `1`?
- [x] Python: `x = 1` / `def f(): return x` / `def g(): x = 2; return f()` / `print(g())`
- [ ] bash: `x=1; f() { echo $x; }; g() { local x=2; f; }; g`
- [x] Python: `def h(): x = 1; return lambda: x` / `x = 2` / `print(h()())`
- [x] Python: `fs = [lambda: i for i in range(2)]` / `print(fs[0]())`
::: solution
In the first program `f`'s `x` is the global, whatever `g` binds locally (lexical scope). The bash version prints `2`: the shell's `local` is dynamically scoped. The third returns a closure over `h`'s local `x`, which is $1$; the global `x = 2` is irrelevant. The fourth prints `1`, not `0`: both lambdas share the comprehension's variable `i`, whose final value is $1$ — lexical scope, but over a *variable*, not a value.
:::
:::

## Lexical addressing and de Bruijn indices

Lexical scope has a practical advantage besides predictability: the binding a name refers to is known before the program runs, so the compiler can replace each variable by its *position*. Count how many binders stand between a use and its binder:

::: definition De Bruijn indices {#def-debruijn}
In the **de Bruijn representation** of a λ-term, binders carry no names, and each bound occurrence of a variable is replaced by its **index**: the number of λs between the occurrence and its binder. (Free variables keep their names.) The term $\lambda f.\,\lambda x.\,f\,(f\ x)$ becomes $\lambda.\,\lambda.\,1\,(1\ 0)$; $\lambda x.\,\lambda y.\,x$ becomes $\lambda.\,\lambda.\,1$.
:::

The translation is a structural recursion that carries the list of enclosing binders, innermost first; the index of $x$ is its position in that list.

::: algorithm Conversion to de Bruijn form {#alg-debruijn}
$\mathrm{db}(t, \Gamma)$, where $\Gamma$ is a list of variable names (innermost first):

1. $\mathrm{db}(x, \Gamma) = k$, if the first occurrence of $x$ in $\Gamma$ is at position $k$ (counting from $0$); $= x$ if $x$ does not occur in $\Gamma$.
2. $\mathrm{db}(\lambda x.\,t, \Gamma) = \lambda.\,\mathrm{db}(t, x :: \Gamma)$.
3. $\mathrm{db}(t_1\ t_2, \Gamma) = \mathrm{db}(t_1, \Gamma)\ \mathrm{db}(t_2, \Gamma)$.

A term $t$ is converted as $\mathrm{db}(t, [\,])$.
:::

Taking the *first* occurrence of $x$ in $\Gamma$ implements shadowing: in $\lambda x.\,\lambda x.\,x$ the context at the body is $[x, x]$, and the index is $0$, the inner binder.

```python
@dataclass(frozen=True)
class Idx: k: int
@dataclass(frozen=True)
class DLam: body: object
@dataclass(frozen=True)
class DApp: fun: object; arg: object

def to_db(t, ctx=()):
    """ctx lists the enclosing binders, innermost first; free variables stay named."""
    match t:
        case Var(x): return Idx(ctx.index(x)) if x in ctx else t
        case Lam(x, b): return DLam(to_db(b, (x,) + ctx))
        case App(f, a): return DApp(to_db(f, ctx), to_db(a, ctx))
```

```console
λx. x                          λ. 0
λx y. x                        λ. λ. 1
λy x. y                        λ. λ. 1
λf x. f (f x)                  λ. λ. 1 (1 0)
λx. λx. x                      λ. λ. 0
λx. x z                        λ. 0 z
λz. (λy. y (λx. x)) (λx. z x)  λ. (λ. 0 (λ. 0)) (λ. 1 0)
```

The last line shows that the same variable gets different indices in different places ($z$ is $1$ inside $\lambda x$), and the same index can denote different variables. Names have been replaced by addresses.

::: theorem α-equivalence is equality of de Bruijn forms {#thm-debruijn}
For λ-terms $t$ and $u$: $t \equiv_\alpha u$ if and only if $\mathrm{db}(t, [\,]) = \mathrm{db}(u, [\,])$.
:::

::: proof
We prove the more general statement: for lists $\Gamma, \Delta$ of the same length, $\mathrm{db}(t, \Gamma) = \mathrm{db}(u, \Delta)$ if and only if $t$ and $u$ are α-equivalent "relative to the pairing of $\Gamma$ with $\Delta$" — meaning they have the same shape, and at each variable position either both variables are bound at the same position $k$ (the first occurrence of the variable of $t$ in $\Gamma$ and of the variable of $u$ in $\Delta$ are both at $k$), or both are free in their context and have the same name. With $\Gamma = \Delta = [\,]$ this relation is α-equivalence, since α-equivalent terms differ exactly in the names of bound variables, consistently with their binders.

By structural induction on $t$. If $t = x$: $\mathrm{db}(t, \Gamma)$ is an index $k$ or the name $x$, and the same holds for $u$; the outputs are equal exactly when $u$ is a variable that is also bound at position $k$, or also free with the same name — the definition of the relation. If $t = \lambda x.\,t'$: $\mathrm{db}(t, \Gamma) = \lambda.\,\mathrm{db}(t', x :: \Gamma)$, which equals $\mathrm{db}(u, \Delta)$ only if $u = \lambda y.\,u'$ with $\mathrm{db}(t', x :: \Gamma) = \mathrm{db}(u', y :: \Delta)$, which by the induction hypothesis holds exactly when $t'$ and $u'$ are related under the pairing extended by $(x, y)$ — exactly the condition for the abstractions to be related. Applications follow directly from the induction hypothesis for both sides.
:::

So in de Bruijn form, α-equivalence is syntactic equality, and substitution never needs renaming (it shifts indices instead). Proof assistants and many compilers represent bound variables this way internally. For an interpreter, the payoff is speed: the environment becomes an array and a variable lookup an array index instead of a dictionary search. With nested functions, a variable is located by a **lexical address** $(d, i)$: go up $d$ levels of static links, then take slot $i$ of that frame. CPython does exactly this: local variables are compiled to slot numbers (`LOAD_FAST 0`), and captured ones to cell slots (`LOAD_DEREF`).

## Where frames live: stacks, heaps and the funarg problem

In C, a function's local variables live in a **stack frame**, pushed on call and popped on return ([[computer-systems/machine-code]]). That works because the lifetime of a C local ends when its function returns. With first-class functions this can fail.

The **funarg problem** has two halves. A **downward funarg** is a function passed as an argument to a call that will finish before the function's defining frame does — `sorted(xs, key=lambda x: x - offset)`. Its free variables live in frames that are still on the stack while it runs, so stack allocation is fine; the closure needs only a pointer (a **static link**) to its defining frame. Pascal and Algol allow exactly this: procedures can be passed down but not returned. An **upward funarg** is a function that outlives the frame where it was created — returned, as by `make-adder`, or stored in a data structure. Its environment must outlive the call, so that frame cannot be popped.

::: proposition When frames can live on a stack {#prop-stack}
In the environment semantics, suppose no closure ever escapes the call that created it — no closure is returned from a function, stored in a data structure, or bound to a name outside the creating call. Then the frames created by any call are unreachable when it returns, so frames can be allocated and freed in last-in, first-out order.
:::

::: proof
Consider a call that creates frame $F$. During the call, references to $F$ are created only by evaluating a `lambda` in $F$ or in a frame whose static chain reaches $F$ (a closure points to its creation frame), and by creating child frames of such closures. By hypothesis none of these closures is part of the call's result or stored outside, so after the call returns the only references to $F$ and its descendants come from other such frames and closures — none from the caller's frames, the result, or anything reachable from them. Hence at the return, $F$ and every frame created during the call are unreachable, and since calls are nested, the frames of inner calls become unreachable before those of outer ones: freeing them in reverse order of creation is safe.
:::

When the hypothesis fails, there are two classical solutions. The **heap** solution allocates frames (or at least the captured variables) on the heap and lets a garbage collector reclaim them when no closure refers to them — Scheme, ML, Haskell, JavaScript and Python all do this. **Closure conversion** in a compiler is a refinement: it copies the free variables a closure actually uses into a heap-allocated record, so only those survive the call ([[compilers]]). The second solution is to *forbid* escaping references, or to make the programmer state them; that is Rust's.

::: example Rust's answer to the upward funarg problem {#ex-rust-funarg}
Write `make_adder` in Rust and compile it with and without the `move` keyword.
::: solution
```rust
fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n          // `move`: the closure takes its own copy of n
}
fn main() {
    let add5 = make_adder(5);
    println!("{}", add5(10));
}
```

```console
$ rustc adder.rs && ./adder
15
```

Without `move`, the closure *borrows* `n`, which lives in `make_adder`'s stack frame, and the compiler (rustc 1.95, as of 2026) refuses:

```console
error[E0373]: closure may outlive the current function, but it borrows `n`, which is owned by the current function
 --> adder2.rs:2:5
  |
2 |     |x| x + n
  |     ^^^     - `n` is borrowed here
  |     |
  |     may outlive borrowed value `n`
```

Rust keeps stack allocation and detects the upward funarg at compile time. With `move`, the value of `n` is copied into the closure object, which is returned by value: the closure owns its environment, so no heap frame and no garbage collector is needed.
:::
:::

## Assignment: names, locations and values

So far an environment mapped names directly to values. Once a language has assignment, two uses of a name must share a mutable *box*, not a value. In `counter` above, `inc` and `counter` both refer to the same `n`, and `n += 1` in one must be visible in the other. The standard model separates two maps.

::: definition Environment and store {#def-store}
A **location** $\ell$ is an address of a mutable cell. An **environment** $\rho$ maps names to locations; a **store** $\sigma$ maps locations to values. The meaning of a variable $x$ is $\sigma(\rho(x))$. Evaluation threads the store through the computation: $\rho, \sigma \vdash e \Downarrow v, \sigma'$. Assignment changes the store, not the environment:

$$
\frac{\rho, \sigma \vdash e \Downarrow v, \sigma'}{\rho, \sigma \vdash (\mathsf{set!}\ x\ e) \Downarrow 0, \sigma'[\rho(x) \mapsto v]}
\qquad
\frac{\ell \notin \mathrm{dom}\,\sigma_2 \quad \rho, \sigma \vdash e_1 \Downarrow \langle \lambda x.\,e, \rho'\rangle, \sigma_1 \quad \rho, \sigma_1 \vdash e_2 \Downarrow v_2, \sigma_2 \quad \rho'[x \mapsto \ell], \sigma_2[\ell \mapsto v_2] \vdash e \Downarrow v, \sigma_3}{\rho, \sigma \vdash (e_1\ e_2) \Downarrow v, \sigma_3}
$$
:::

The application rule allocates a fresh location for the parameter. Note how the store produced by evaluating $e_1$ is the input to evaluating $e_2$: the rule now *fixes* left-to-right evaluation, which matters as soon as expressions have side effects. The distinction between a name's location and its value is the old distinction between **l-values** and **r-values** (Strachey, 1967): in `x = x + 1`, the `x` on the left denotes a location and the one on the right a value.

Two names bound to the same location are **aliases**. Aliasing is what makes imperative programs hard to reason about: an assignment through one name changes what the other reads.

## Parameter-passing mechanisms

With the store in place we can say precisely what happens to an argument.

::: definition Parameter-passing mechanisms {#def-passing}
For a call $f(a)$ with formal parameter $x$:

- **Call-by-value**: evaluate $a$ to $v$, allocate a new location for $x$ holding $v$. Assignments to $x$ are invisible to the caller.
- **Call-by-reference**: $a$ must be an l-value (a variable, array element, field); bind $x$ to *its location*. $x$ is an alias of $a$.
- **Call-by-value-result** (copy-in/copy-out): like call-by-value, and on return copy the final value of $x$ back to $a$'s location.
- **Call-by-name**: bind $x$ to a **thunk**, the unevaluated expression $a$ paired with the caller's environment; every use of $x$ evaluates the thunk afresh, and an assignment to $x$ assigns to the l-value of $a$.
- **Call-by-need**: like call-by-name, but the thunk's value is saved the first time it is evaluated and reused afterwards (**lazy evaluation**).
:::

C, Python, Java, OCaml and Scheme are call-by-value. C++ (with `&` parameters), Pascal (`var`), Fortran (traditionally) and C# (`ref`) offer call-by-reference; Ada's `in out` parameters may be implemented by either reference or value-result. Algol 60's default was call-by-name, and Haskell is call-by-need. Python, Java and JavaScript pass *object references* by value — sometimes called **call-by-sharing**: the callee can mutate the object the caller passed, but assigning to the parameter only rebinds the callee's name.

We implement all of them by giving the interpreter a store of `Cell` objects and choosing what to bind the parameter to:

```python
class Cell:                                  # a location in the store
    def __init__(self, v): self.v = v
class Thunk:                                 # an unevaluated argument
    def __init__(self, e, env, memo): self.e, self.env, self.memo, self.done = e, env, memo, False

def force(cell):                             # the value stored in a cell
    v = cell.v
    if isinstance(v, Thunk):
        if v.done: return v.val
        val = ev(v.e, v.env)
        if v.memo: v.done, v.val = True, val
        return val
    return v

        case App(fn, arg):                   # in ev: env maps names to Cells
            f = ev(fn, env)
            match MODE:
                case "value": cell = Cell(ev(arg, env))
                case "reference":
                    cell = env[arg.name] if isinstance(arg, Var) else Cell(ev(arg, env))
                case "name": cell = Cell(Thunk(arg, env, memo=False))
                case "need": cell = Cell(Thunk(arg, env, memo=True))
            return ev(f.body, {**f.env, f.param: cell})
```

Variables are evaluated with `force(env[x])`, and `(set! x e)` assigns to the cell of `x` (for a by-name parameter whose argument was a variable, to that variable's cell).

::: example Swap {#ex-swap}
Run this program under call-by-value and call-by-reference:

```text
(let ((a 1)) (let ((b 2))
  (let ((swap (lambda (x y) (let ((t x)) (begin (set! x y) (set! y t))))))
    (begin (swap a b) (+ (* 10 a) b)))))
```
::: solution
```console
value 12
reference 21
```

Under call-by-value, `swap` exchanges its private copies and the caller's `a` and `b` are unchanged: $10 \cdot 1 + 2 = 12$. Under call-by-reference, `x` and `y` are aliases of `a` and `b`, so the assignments reach the caller: $10 \cdot 2 + 1 = 21$. This is why a `swap` function can be written in C++ (`void swap(int& x, int& y)`) but not in Python or Java, where the caller must write `a, b = b, a`. Aliasing has a cost too: called as `(swap a a)`, both parameters are the same location, which is harmless for this `swap` but breaks the classic "swap without a temporary" (`x = x + y; y = x - y; x = x - y` sets `a` to $0$).
:::
:::

::: widget mapping
domain: a; b; x; y
codomain: ℓ1; ℓ2; ℓ3; ℓ4
map: a>ℓ1; b>ℓ2; x>ℓ1; y>ℓ2
caption: The environment during the call `(swap a b)` under call-by-reference, as a map from names to locations: `x` and `y` share the locations of `a` and `b`, so the map is not injective — that is aliasing. Change the map to `x>ℓ3; y>ℓ4` for call-by-value: each parameter gets a fresh location holding a copy, the map becomes injective, and assignments to `x` and `y` can no longer reach `a` and `b`.
:::

Call-by-name looks harmless — "substitute the argument expression for the parameter", like the β-rule — but with assignment it lets a parameter denote a different value at every use.

::: example Jensen's device {#ex-jensen}
Algol 60 programmers used call-by-name to write a general summation procedure. In Fun with assignment:

```text
(sum i 1 10 (* i i))       where sum sets k := lo, total := 0, and while k <= hi:
                           total := total + term; k := k + 1; and returns total
```

`sum` receives the variable `i` as `k` and the expression `(* i i)` as `term`. Evaluate it under call-by-value and call-by-name.
::: solution
```console
jensen value 0
jensen name 385
```

Under call-by-name, `(set! k lo)` assigns to `i` itself, and every evaluation of `term` re-evaluates `(* i i)` with the current `i`, so the loop adds $1^2 + 2^2 + \cdots + 10^2 = 385$. Under call-by-value, `term` is the number $0$ (since `i` was $0$ at the call) and `k` is a private copy, so the sum is ten zeros. Jensen's device, named after Jørn Jensen of the Danish Regnecentralen, shows the expressive power of call-by-name and also why it was abandoned: the meaning of a procedure depends on its callers' expressions in ways its author cannot see. Modern languages get the same effect explicitly, by passing a function: `sum(1, 10, lambda i: i * i)`.
:::
:::

::: example Name versus need {#ex-need}
Count how many times the argument is evaluated in `(let ((sq (lambda (x) (+ x (+ x x))))) (sq (* 6 7)))` under call-by-value, by-name and by-need. Then evaluate `(const (f 1))` where `const` ignores its argument and `f` loops for ever.
::: solution
```console
lazy value 126 0
lazy name 126 3
lazy need 126 1
loop name 5
loop need 5
```

The last number counts how many times a thunk was evaluated (call-by-value evaluates the argument once, eagerly, without a thunk). All three agree on the value $126$. Call-by-name evaluates `(* 6 7)` at each of the three uses of `x`; call-by-need evaluates it once and caches it, which is how Haskell runs. On the second program, call-by-value would loop for ever evaluating `(f 1)`, while call-by-name and call-by-need never evaluate it, because `const` does not use its argument — the normal-order behaviour of [[programming-languages/lambda-calculus#thm-standardisation]].
:::
:::

::: theorem Call-by-need agrees with call-by-name on pure programs {#thm-need}
For programs without assignment, call-by-name and call-by-need produce the same result (and one terminates if and only if the other does).
:::

::: proof
The two interpreters differ only in `force`: when a thunk $\langle e, \rho\rangle$ is forced for the second or later time, call-by-need returns the saved value $v$, while call-by-name evaluates $e$ in $\rho$ again. In a program without assignment, cells are never updated, so the meaning of every variable in $\rho$ is the same at every moment: each cell holds either a fixed value or a fixed thunk, which (by induction on the number of forcings performed) yields a fixed value whenever it is forced. Evaluation without assignment is a function of the expression and the environment (the determinism argument of [[programming-languages/interpreters]], exercise *Big-step determinism*, extended to thunks), so re-evaluating $e$ in $\rho$ yields $v$ again — or diverges again, which cannot happen since its first evaluation terminated. Hence replacing each re-evaluation by the saved value changes neither the values computed nor termination, and the two runs proceed in lock-step except that call-by-need skips the repeated evaluations.
:::

With assignment the theorem fails: if the argument expression reads a variable that is assigned between two uses of the parameter, call-by-name sees the new value and call-by-need the old one. Lazy evaluation is therefore practical only in pure languages, which is one reason Haskell is pure.

::: warning "Python is call-by-reference for objects"
It is common to hear that Python passes mutable objects by reference, because a function can append to a list it was given. It cannot, however, rebind the caller's variable: after `def f(xs): xs = [0]`, the call `f(a)` leaves `a` unchanged, which call-by-reference would not. Python always passes the value of the argument — and that value is a reference to an object. The callee can mutate the object (`xs.append(0)` is visible to the caller), but assignment to the parameter only changes the callee's binding. The same holds for Java (for objects), JavaScript and Ruby. Call-by-sharing has the aliasing of call-by-reference for *object contents* and the isolation of call-by-value for *variables*; reasoning about it requires keeping both in mind.
:::

## The lifetime of storage

Every entity created by a program has a lifetime, and the language must arrange storage for it.

- **Static** storage lasts for the whole execution: global variables, C's `static` locals, string literals, code. Its address can be fixed at link or load time.
- **Stack** storage lasts for one activation of a function: local variables and parameters, when no closure or reference outlives the call ([[#prop-stack]]). Allocation and freeing cost a pointer adjustment.
- **Heap** storage has a lifetime not tied to the program's block structure: objects created by `malloc`, `new`, a constructor call, a `cons`, or a closure that escapes.

For heap storage, someone must decide when an object is dead. In C and C++ the programmer does, with `free` and `delete` — and errors (use after free, double free, leaks) are among the most common sources of security vulnerabilities ([[computer-systems/dynamic-memory]]). Most high-level languages use **garbage collection**: an object may be reclaimed when it is no longer *reachable* from the roots (variables, stack, registers). Python combines reference counting with a cycle detector; Java, JavaScript, OCaml and Go use tracing collectors.

**Ownership** is a third approach, made mainstream by Rust. Each heap value has exactly one **owner** variable; when the owner goes out of scope the value is freed (deterministically, with no collector). Ownership can be **moved** to another variable, after which the old name is unusable, or **borrowed**: a reference `&v` grants temporary access, and the compiler's borrow checker verifies that no reference outlives the value it refers to and that a value is never mutated while shared references to it exist.

```rust
fn total(v: &Vec<i32>) -> i32 { v.iter().sum() }   // borrows v
fn consume(v: Vec<i32>) -> usize { v.len() }        // takes ownership; v freed on return
fn main() {
    let a = vec![1, 2, 3];
    let s = total(&a);               // shared borrow, ends after the call
    let b = a;                       // ownership moves from a to b
    println!("sum {} len {}", s, consume(b));
}
```

```console
sum 6 len 3
```

Using `a` after the move, or keeping a reference to a variable after its block ends, is rejected at compile time:

```console
error[E0382]: borrow of moved value: `a`
3 |     let b = a;                       // ownership moves to b
  |             - value moved here
4 |     println!("{}", a.len());         // a is no longer valid
  |                    ^ value borrowed here after move
error[E0597]: `x` does not live long enough
8 |         r = &x;                      // borrow of x ...
  |             ^^ borrowed value does not live long enough
9 |     }                                // ... but x dies here
  |     - `x` dropped here while still borrowed
```

These are the lifetime and aliasing questions of this chapter turned into static checks: ownership makes every heap object's lifetime follow the scope of its owner, and the borrowing rules prevent aliasing of mutable data. The price is that some correct programs — doubly linked lists, graphs with cycles — must be written with explicit reference counting (`Rc`) or `unsafe` code.

::: history
Algol 60 (Naur et al., 1960) introduced block structure and lexical scope, and its call-by-name parameters inspired both Jensen's device and, much later, the theory of lazy evaluation. McCarthy's LISP 1.5 (1962) was dynamically scoped, more by accident of implementation than by design; Joel Moses's MIT memo "The function of FUNCTION in LISP" (1970) explained the funarg problem. Christopher Strachey's lecture notes *Fundamental Concepts in Programming Languages* (1967, published 2000) introduced l-values and r-values, the environment–store distinction and the terms *ad hoc* and *parametric polymorphism*. Steele and Sussman's Scheme (1975) brought lexical scope to Lisp, and Common Lisp (1984) followed. Nicolaas Govert de Bruijn introduced nameless indices for his Automath proof checker ("Lambda calculus notation with nameless dummies", 1972). Christopher Wadsworth's 1971 thesis described call-by-need as graph reduction, and Henderson and Morris (1976) and Friedman and Wise (1976) made lazy evaluation practical. Ownership types were studied by Clarke, Potter and Noble (1998); Rust (version 1.0 in 2015) combined them with region-based lifetimes in a mainstream language.
:::

## Where this leads

The store-passing rules are the starting point for type systems of references ([[programming-languages/type-systems]], where `ref` types must be invariant — [[programming-languages/polymorphism]]). Call-by-name and call-by-need are evaluation strategies of the λ-calculus ([[programming-languages/lambda-calculus]]), and thunks reappear as the suspended computations of generators and futures ([[programming-languages/control]], [[programming-languages/concurrency-models]]). Lexical addressing, closure conversion and frame layout are the first jobs of a compiler's back end ([[compilers]]); garbage collection algorithms are treated in [[computer-systems/dynamic-memory]].

::: summary
- A **binding** associates a name with an entity; **scope** is where in the text it is visible, **lifetime** when the entity exists ([[#def-binding]]). Binding times range from language design to run time.
- **Lexical scope** resolves a name by the program text, **dynamic scope** by the chain of active calls ([[#def-scope-rules]]); the interpreter difference is which environment a function body runs in.
- Dynamic scope breaks α-renaming ([[#prop-dyn-alpha]]) and cannot return functions that use their parameters (the upward funarg problem); lexical scope with closures solves it.
- Lexical scope allows names to be compiled to positions: **de Bruijn indices** make α-equivalence syntactic equality ([[#thm-debruijn]]), and lexical addresses make lookups array accesses.
- Frames can be stack-allocated only when no closure escapes ([[#prop-stack]]); otherwise they go on the heap (garbage collection) or the escape is checked statically (Rust).
- Assignment separates the **environment** (names to locations) from the **store** (locations to values) ([[#def-store]]); aliases are two names for one location.
- Parameters may be passed by **value**, **reference**, **value-result**, **name** or **need** ([[#def-passing]]); by-name and by-need agree on pure programs ([[#thm-need]]). Python passes object references by value.
:::

## Exercises

::: exercise Lexical or dynamic? {level=1 check="110"}
Evaluate `(let ((x 10)) (let ((f (lambda (y) (* x y)))) (let ((x 11)) (f x))))` under lexical scope and under dynamic scope. (Enter the value under lexical scope.)
::: solution
In both cases the argument of `(f x)` is evaluated in the innermost frame, so `y` is $11$. Under lexical scope, the `x` in the body of `f` is the one visible where `f` was written, $10$: the result is $10 \times 11 = 110$. Under dynamic scope, the call frame binds only `y`, and the most recent active binding of `x` is the caller's, $11$: the result is $11 \times 11 = 121$.
:::
:::

::: exercise De Bruijn by hand {level=1}
Convert to de Bruijn form: (a) $\lambda x\,y\,z.\,x\ z\,(y\ z)$; (b) $\lambda x.\,(\lambda y.\,y\ x)\,(\lambda z.\,x\ z)$; (c) $\lambda x.\,\lambda y.\,\lambda x.\,y\ x\ w$. Then convert $\lambda.\,\lambda.\,0\ 1$ back to a named term.
::: solution
(a) Context at the body is $[z, y, x]$: $\lambda.\,\lambda.\,\lambda.\,2\ 0\,(1\ 0)$. (b) $\lambda.\,(\lambda.\,0\ 1)\,(\lambda.\,1\ 0)$: inside $\lambda y$ the variable $x$ is one binder further out, index $1$; likewise inside $\lambda z$. (c) The context is $[x, y, x]$; $y$ is at position $1$ and $x$ at $0$ (the inner $x$), and $w$ is free: $\lambda.\,\lambda.\,\lambda.\,1\ 0\ w$. Finally, $\lambda.\,\lambda.\,0\ 1$ is $\lambda a.\,\lambda b.\,b\ a$ (any two distinct names).
:::
:::

::: exercise Parameter passing by hand {level=1 check="3"}
Consider (in a C-like notation) `int g = 1; void p(int x) { x = x + 1; g = g + 10; x = x + 1; }` and the call `p(g)`. What is `g` afterwards under call-by-value, call-by-reference and call-by-value-result? (Enter the value under call-by-value-result.)
::: solution
*By value:* `x` is a copy ($1$, then $2$, then $3$); `g` becomes $11$. *By reference:* `x` is `g`: $1 \to 2 \to 12 \to 13$; `g` is $13$. *By value-result:* `x` starts as a copy $1$, becomes $2$; meanwhile `g` becomes $11$; `x` becomes $3$; on return $3$ is copied back to `g`, overwriting the $11$. So `g` is $3$. The three mechanisms give $11$, $13$ and $3$ — they differ exactly when the parameter is aliased with a variable the procedure also accesses directly.
:::
:::

::: exercise A call-by-name surprise {level=2}
Under call-by-name, what does `(let ((n 0)) (let ((twice (lambda (x) (+ x x)))) (twice (begin (set! n (+ n 1)) n))))` return? What do call-by-value and call-by-need return? Which part of [[#thm-need]] fails here?
::: solution
Call-by-name evaluates the argument expression at each use of `x`: the first use sets $n = 1$ and yields $1$, the second sets $n = 2$ and yields $2$; the result is $3$. Call-by-value evaluates it once before the call ($n = 1$, value $1$) and returns $2$; call-by-need evaluates it once at the first use and reuses $1$, also returning $2$. The theorem assumes a program without assignment; here the argument itself performs an assignment, so re-evaluating it does not reproduce the same value.
:::
:::

::: exercise Static links {level=2}
In a language with nested procedures and stack-allocated frames (Pascal, say), procedure `A` declares local `x` and nested procedure `B`; `B` declares nested procedure `C`, which reads `x`. `A` calls `B`, `B` calls `C`, and `C` calls itself recursively twice (three activations of `C`). How many static links must be followed to read `x` from the deepest activation of `C`? How many dynamic links lie between that activation and `A`'s frame?
::: solution
The static link of each `C` frame points to the frame of `B` (where `C` was declared), whatever the activation; `B`'s static link points to `A`. So the lexical address of `x` in `C` is $(2, i)$: two static links, always, independent of recursion depth — the compiler knows the number. The dynamic chain from the deepest `C` goes through the two other `C` frames and then `B` before reaching `A`: four dynamic links. Lexical addressing replaces a run-time search along the dynamic chain by a compile-time constant.
:::
:::

::: exercise Implementing value-result {level=2}
Add a `"value-result"` mode to the interpreter: copy the argument into a new cell, and after the body returns, copy the cell's final value back into the argument's cell when the argument is a variable. Run the swap program and the program `(let ((a 1)) (let ((f (lambda (x) (begin (set! x 5) a)))) (+ (* 10 (f a)) a)))` under value, reference and value-result.
::: solution
```python
                case "value-result":
                    cell = Cell(ev(arg, env))
                    result = ev(f.body, {**f.env, f.param: cell})
                    if isinstance(arg, Var): env[arg.name].v = cell.v   # copy out
                    return result
```

Swap gives `11` under value-result, not `21` — and the reason is instructive. Fun functions are curried, so `(swap a b)` is `((swap a) b)`: the first call copies `a` in, immediately returns the inner closure, and *copies `x` back at that moment*, before any assignment has happened. The assignment `(set! x y)` later updates a cell that nobody copies back, while `y`'s copy-out does set `b` to $1$; hence $10 \cdot 1 + 1 = 11$. In a language with genuine two-parameter procedures (Ada, Fortran), both copy-outs happen when the procedure returns and swap gives $21$. Copy-in/copy-out is defined in terms of a procedure's activation, and currying splits one activation into two. The second program reads `a` *inside* the call after assigning to `x`. By value: `(f a)` returns $1$ and `a` stays $1$: $10 + 1 = 11$. By reference: `x` is `a`, so `(f a)` returns $5$ and `a` is $5$: $55$. By value-result: inside the call `a` is still $1$ (only the copy changed), so `(f a)` returns $1$, and then $5$ is copied back, so the final `a` is $5$: $10 + 5 = 15$. The mechanisms agree unless the procedure observes the aliasing.
:::
:::

::: exercise Escaping closures and the stack {level=3}
Give a Fun program that uses only *downward* funargs and one that needs an upward funarg, and for each decide, using [[#prop-stack]], whether its frames could be stack-allocated. Then explain why Python must heap-allocate the cell of `n` in `counter`, but CPython can still keep ordinary locals of `counter` in its stack frame.
::: solution
A purely downward example: `(let ((apply-to-3 (lambda (g) (g 3)))) (let ((k 10)) (apply-to-3 (lambda (y) (+ y k)))))`. The closure for `(lambda (y) …)` is passed into `apply-to-3` and used before the `let` binding `k` ends; no closure is returned or stored, so by the proposition all frames can be popped on return. Upward: `make-adder`, which returns a closure referring to its frame $\set{n \mapsto 5}$; that frame is still reachable after the call returns, so it cannot live on the stack.

In `counter`, the closure `inc` escapes (it is returned) and refers to `n`, so `n`'s storage must outlive `counter`'s activation: CPython puts it in a heap-allocated cell object, which `inc.__closure__` references. Variables of `counter` that no inner function captures are not reachable from any escaping closure; the compiler knows this statically (lexical scope!), so it keeps them in the frame's fast-locals array. Closure conversion in compilers applies the same idea: only captured variables are moved to the heap.
:::
:::

::: exercise Shifting indices {level=3}
In de Bruijn form, β-reduction $(\lambda.\,t)\ s \to t[0 := s]$ must adjust indices. Define $\uparrow^d_c(t)$, which adds $d$ to every index $\ge c$ in $t$ (the free ones relative to $c$ enclosing binders), and the substitution $t[j := s]$. Use them to reduce $(\lambda.\,\lambda.\,1\ 0)\,(\lambda.\,0)$ and $\lambda.\,(\lambda.\,\lambda.\,1)\ 0$.
::: solution
Shifting: $\uparrow^d_c(k) = k + d$ if $k \ge c$, else $k$; $\uparrow^d_c(\lambda.\,t) = \lambda.\,\uparrow^d_{c+1}(t)$; $\uparrow^d_c(t_1\ t_2) = \uparrow^d_c(t_1)\ \uparrow^d_c(t_2)$. Substitution: $k[j := s] = s$ if $k = j$, else $k$; $(\lambda.\,t)[j := s] = \lambda.\,t[j+1 := \uparrow^1_0(s)]$; applications componentwise. β-reduction: $(\lambda.\,t)\ s \to \uparrow^{-1}_0\big(t[0 := \uparrow^1_0(s)]\big)$. The argument $s$ is shifted up by one so that its free indices remain correct when it is placed under the binder of $t$; after substituting, the binder is removed, so the free indices of the result are shifted down by one.

First term: $t = \lambda.\,1\ 0$, $s = \lambda.\,0$ (closed, so shifting does nothing). $t[0 := s] = \lambda.\,(1\ 0)[1 := s] = \lambda.\,s\ 0 = \lambda.\,(\lambda.\,0)\ 0$; shifting down changes nothing (no free indices). Result $\lambda.\,(\lambda.\,0)\ 0$, which is $\lambda x.\,(\lambda y.\,y)\ x$ — correct.

Second: inside the outer $\lambda$, reduce $(\lambda.\,\lambda.\,1)\ 0$ where $0$ refers to the outer binder. $\uparrow^1_0(0) = 1$; $(\lambda.\,1)[0 := 1] = \lambda.\,1[1 := \uparrow^1_0(1)] = \lambda.\,2$; shifting down: $\lambda.\,1$. Whole term: $\lambda.\,\lambda.\,1$, which is $\lambda x.\,\lambda y.\,x$ — the free variable was not captured by the inner binder, which in named form would have required renaming. This is what Pierce's *TAPL*, chapter 6, uses to implement evaluation without names.
:::
:::
