The simply typed λ-calculus of [[programming-languages/type-systems]] demands a type annotation on every parameter. For small examples that is a minor nuisance, but annotations multiply: the function composition $\lambda f.\,\lambda g.\,\lambda x.\,f\,(g\ x)$ must be written separately for every combination of types, each time with three annotations. Yet in OCaml or Haskell you write

```text
let compose f g x = f (g x)
```

with no types at all (an illustrative OCaml line), and the compiler reports `val compose : ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b` — one type that covers every way the function can be used, found automatically. This chapter explains how. **Type inference** (or **type reconstruction**) computes the types a program could have from the way its variables are used. The algorithm reduces typing to solving equations between types by **unification**, and the result is remarkable: for every typable program there is a **principal type**, a most general type of which every other type of the program is an instance. Adding `let`-bound **polymorphism** gives the Hindley–Milner type system of ML and Haskell, inferred by Milner's **Algorithm W**, which we implement in Python.

## Type variables and substitutions

To infer types we let types contain unknowns.

::: definition Type variables, substitutions and instances {#def-subst-types}
Types are extended with **type variables** $\alpha, \beta, \ldots$: $T ::= \alpha \mid \mathsf{Int} \mid \mathsf{Bool} \mid T \to T$. A **type substitution** $\sigma$ is a finite map from type variables to types, applied to a type by replacing each variable in its domain simultaneously: if $\sigma = [\alpha \mapsto \mathsf{Int},\ \beta \mapsto \alpha \to \alpha]$ then $\sigma(\alpha \to \beta) = \mathsf{Int} \to (\alpha \to \alpha)$. The composition $\sigma \circ \tau$ applies $\tau$ first, then $\sigma$. A type $T'$ is an **instance** of $T$ if $T' = \sigma T$ for some $\sigma$; we then say $T$ is **more general** than $T'$.
:::

The identity function $\lambda x.\,x$ can be given the types $\mathsf{Int} \to \mathsf{Int}$, $\mathsf{Bool} \to \mathsf{Bool}$ and $(\mathsf{Int} \to \mathsf{Bool}) \to (\mathsf{Int} \to \mathsf{Bool})$, and all of them are instances of $\alpha \to \alpha$. That type is the "best" one: it says everything that is true of every use.

::: widget relation
set: a→a; Int→Int; Bool→Bool; (b→b)→(b→b); a→b
pairs: a→a,a→a; Int→Int,Int→Int; Bool→Bool,Bool→Bool; (b→b)→(b→b),(b→b)→(b→b); a→b,a→b; a→a,Int→Int; a→a,Bool→Bool; a→a,(b→b)→(b→b); a→b,a→a; a→b,Int→Int; a→b,Bool→Bool; a→b,(b→b)→(b→b)
view: properties
name: ≥
caption: The relation "$S \ge T$: $T$ is an instance of $S$" on five types ($a$, $b$ are type variables). It is reflexive and transitive — a preorder — and on these representatives also antisymmetric (two types are instances of each other only when they differ by renaming variables). $a \to b$ is the most general type of a function; $a \to a$ is the principal type of the identity, above all its monomorphic types. Notice that $\mathsf{Int}\to\mathsf{Int}$ and $(b\to b)\to(b\to b)$ are incomparable: neither is an instance of the other.
:::

## Inference as constraint solving

Remove the annotations from the simply typed λ-calculus, so that terms are $t ::= x \mid \lambda x.\,t \mid t\ t \mid \ldots$ The idea of inference is to give each unknown type a fresh variable, walk the term once to collect equations that the typing rules impose, and solve them.

::: definition Constraint generation {#def-constraint-typing}
The judgement $\Gamma \vdash t : T \mid C$ ("under $\Gamma$, $t$ has type $T$ provided the equations $C$ hold") is defined by

$$
\frac{x{:}T \in \Gamma}{\Gamma \vdash x : T \mid \varnothing}
\qquad
\frac{\Gamma, x{:}\alpha \vdash t : T \mid C \quad \alpha \text{ fresh}}{\Gamma \vdash \lambda x.\,t : \alpha \to T \mid C}
\qquad
\frac{\Gamma \vdash t_1 : T_1 \mid C_1 \quad \Gamma \vdash t_2 : T_2 \mid C_2 \quad \beta \text{ fresh}}{\Gamma \vdash t_1\ t_2 : \beta \mid C_1 \cup C_2 \cup \set{T_1 = T_2 \to \beta}}
$$

with constants given their types and no constraints ($\mathsf{0} : \mathsf{Int}$, $\mathsf{true} : \mathsf{Bool}$). "Fresh" means not occurring anywhere else in the derivation. A **solution** of $(C, T)$ is a substitution $\sigma$ with $\sigma S = \sigma S'$ for every equation $S = S'$ in $C$; then $\sigma T$ is a type of $t$.
:::

The rule for abstraction does not know the parameter's type, so it invents one; the rule for application records that the function's type must be an arrow from the argument's type to the result.

::: example Generating constraints for twice {#ex-constraints}
Generate the constraints for $\lambda f.\,\lambda x.\,f\,(f\ x)$ and solve them by hand.
::: solution
Give $f$ the fresh type $\alpha$ and $x$ the fresh type $\beta$. The inner application $f\ x$ gets a fresh result type $\gamma$ and the equation $\alpha = \beta \to \gamma$. The outer application $f\,(f\ x)$ gets the result type $\delta$ and the equation $\alpha = \gamma \to \delta$. The term's type is $\alpha \to \beta \to \delta$ subject to

$$
C = \set{\alpha = \beta \to \gamma,\ \ \alpha = \gamma \to \delta}.
$$

Solve: the first equation determines $\alpha$; substituting it into the second gives $\beta \to \gamma = \gamma \to \delta$, which (arrows equal means components equal) requires $\beta = \gamma$ and $\gamma = \delta$. The solution is $\sigma = [\alpha \mapsto \beta \to \beta,\ \gamma \mapsto \beta,\ \delta \mapsto \beta]$, and the type is $\sigma(\alpha \to \beta \to \delta) = (\beta \to \beta) \to \beta \to \beta$. Every other solution, such as $\beta \mapsto \mathsf{Int}$ in addition, gives an instance of this type. Two equations, one per application.
:::
:::

## Unification

Solving equations between type expressions is an instance of a general problem: **first-order unification**.

::: definition Unifier {#def-unifier}
A substitution $\sigma$ **unifies** a set $C$ of equations if $\sigma S = \sigma T$ for every $(S = T) \in C$. A unifier $\sigma$ is **most general** (an **mgu**) if every unifier $\sigma'$ of $C$ factors through it: $\sigma' = \tau \circ \sigma$ for some $\tau$.
:::

::: algorithm Unification (Robinson, 1965) {#alg-unify}
$\mathrm{unify}(C)$, for a finite set or list of equations $C$:

1. If $C = \varnothing$, return the empty substitution.
2. Otherwise remove one equation $S = T$ from $C$, leaving $C'$, and:
   1. if $S$ and $T$ are identical, return $\mathrm{unify}(C')$;
   2. if $S$ is a variable $\alpha$ not occurring in $T$, return $\mathrm{unify}([\alpha \mapsto T]\,C') \circ [\alpha \mapsto T]$;
   3. if $T$ is a variable $\alpha$ not occurring in $S$, the same with $S$;
   4. if $S = S_1 \to S_2$ and $T = T_1 \to T_2$, return $\mathrm{unify}(C' \cup \set{S_1 = T_1,\ S_2 = T_2})$ (similarly for other type constructors with equal names and arity);
   5. otherwise **fail**.
:::

The test "$\alpha$ not occurring in $T$" is the **occurs check**. Without it, $\alpha = \alpha \to \beta$ would be "solved" by $[\alpha \mapsto \alpha \to \beta]$, which is not a solution at all: substituting gives $(\alpha \to \beta) \to \beta$ on the left and $(\alpha \to \beta) \to \beta$ only after another substitution, and so on for ever — the only solution would be an infinite type.

::: theorem Correctness of unification {#thm-unify}
For every finite set of equations $C$, $\mathrm{unify}(C)$ terminates. If it returns $\sigma$, then $\sigma$ is a most general unifier of $C$; if it fails, $C$ has no unifier.
:::

::: proof
*Termination.* Measure $C$ by the pair (number of distinct type variables in $C$, total number of symbols in $C$), ordered lexicographically. Case 2.1 removes an equation: the first component does not increase and the second decreases. Cases 2.2 and 2.3 eliminate $\alpha$: after the substitution $\alpha$ no longer occurs in $[\alpha \mapsto T]\,C'$ (it does not occur in $T$), and no variable is added, so the first component decreases. Case 2.4 keeps the same variables and removes the two arrow symbols, decreasing the second component. A lexicographic order on pairs of natural numbers is well founded, so the recursion stops.

*Correctness*, by induction on the same measure. Case 1: the empty substitution unifies $\varnothing$ and every substitution factors through it. Case 2.1: the unifiers of $C$ and $C'$ coincide, since every substitution unifies $S = S$. Case 2.4: an arrow type equals another exactly when the components are equal, so $C$ and $C' \cup \set{S_1 = T_1, S_2 = T_2}$ have the same unifiers; the induction hypothesis applies.

Case 2.2 ($S = \alpha$, $\alpha \notin \mathrm{FV}(T)$). Write $\theta = [\alpha \mapsto T]$. First, if $\rho$ unifies $\theta C'$ then $\rho \circ \theta$ unifies $C$: it maps $\alpha$ and $T$ both to $\rho T$ (since $\theta T = T$), and $\rho\theta$ unifies $C'$ by assumption. Conversely, let $\sigma'$ be any unifier of $C$. Then $\sigma'\alpha = \sigma' T$, so $\sigma' = \sigma' \circ \theta$ (they agree on $\alpha$, as $\sigma'\theta\alpha = \sigma' T = \sigma'\alpha$, and on every other variable); hence $\sigma'$ unifies $\theta C'$, because $\sigma'(\theta S') = \sigma' S' = \sigma' T' = \sigma'(\theta T')$ for each $(S' = T') \in C'$. By the induction hypothesis, $\mathrm{unify}(\theta C')$ returns an mgu $\rho$ of $\theta C'$ (it cannot fail, as $\sigma'$ is a unifier), so $\sigma' = \tau \circ \rho$ for some $\tau$, and $\sigma' = \sigma' \circ \theta = \tau \circ (\rho \circ \theta)$. Thus $\rho \circ \theta$ is a unifier through which every unifier factors: an mgu. If $\mathrm{unify}(\theta C')$ fails, then by the induction hypothesis $\theta C'$ has no unifier, and by the argument just given neither has $C$. Case 2.3 is symmetric.

Case 2.5, failure. Either $S$ and $T$ have different head constructors (say $\mathsf{Int}$ and $T_1 \to T_2$), and no substitution can make them equal since substitution does not change the head of a non-variable type; or one is a variable $\alpha$ occurring in the other, $T \ne \alpha$. Then for any $\sigma$, $\sigma\alpha$ is a proper sub-term of $\sigma T$, so has fewer symbols, and $\sigma\alpha \ne \sigma T$. In both cases $C$ has no unifier.
:::

A Python implementation represents types as data classes and substitutions as dictionaries:

```python
@dataclass(frozen=True)
class TVar: name: str
@dataclass(frozen=True)
class TCon: name: str; args: tuple = ()      # Int, Bool, "->" with 2 args, "*" for pairs
def fn(a, b): return TCon("->", (a, b))

def apply(s, t):
    match t:
        case TVar(a): return s.get(a, t)
        case TCon(c, args): return TCon(c, tuple(apply(s, x) for x in args))
def compose(s2, s1):                         # first s1, then s2
    return {**{k: apply(s2, v) for k, v in s1.items()}, **s2}

def unify(t1, t2):
    match t1, t2:
        case TVar(a), TVar(b) if a == b: return {}
        case TVar(a), _: return bind(a, t2)
        case _, TVar(b): return bind(b, t1)
        case TCon(c1, args1), TCon(c2, args2) if c1 == c2 and len(args1) == len(args2):
            s = {}
            for x, y in zip(args1, args2):   # unify components left to right
                s = compose(unify(apply(s, x), apply(s, y)), s)
            return s
    raise InferError(f"cannot unify {show(t1)} with {show(t2)}")

def bind(a, t):
    if a in ftv(t):                          # the occurs check
        raise InferError(f"occurs check: {a} occurs in {show(t)}")
    return {a: t}
```

Processing a list of constraints is then a fold: start from the empty substitution, apply the current one to each equation, unify, compose. Generating constraints and solving them reproduces [[#ex-constraints]] and handles self-application:

```console
\f x. f (f x)          2 equations  ('a -> 'a) -> 'a -> 'a
\x y z. x z (y z)      3 equations  ('a -> 'b -> 'c) -> ('a -> 'b) -> 'a -> 'c
\f g x. f (g x)        2 equations  ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b
\x. x x                1 equations  error: occurs check: t15 occurs in t15 -> t16
```

(The printer renames the remaining type variables to `'a`, `'b`, … in order of appearance, as OCaml does.) Self-application fails exactly as [[programming-languages/type-systems#thm-no-self-app]] predicted: the single equation $\alpha = \alpha \to \beta$ fails the occurs check.

::: theorem Principal types (Hindley, 1969) {#thm-principal}
If an unannotated λ-term $t$ (with constants) has some simple type, then it has a **principal type** $T_0$: a type of $t$ such that every type of $t$ is an instance of $T_0$. It is computed by generating $\varnothing \vdash t : T \mid C$ and returning $\sigma T$ for $\sigma = \mathrm{unify}(C)$.
:::

::: proof
Two facts about constraint generation are proved by induction on $t$ (Pierce, *TAPL*, §22.3): (soundness) if $\sigma$ solves $C$ then $\sigma T$ is a type of $t$, in the sense that annotating each binder with the $\sigma$-image of its fresh variable gives a simply typed term of type $\sigma T$; (completeness) if $t$ has type $T'$ by some annotation, then some solution $\sigma'$ of $C$ has $\sigma' T = T'$ — define $\sigma'$ on each fresh variable as the type actually used at that position. Now suppose $t$ has some type $T'$. By completeness $C$ has a solution $\sigma'$ with $\sigma' T = T'$, so by [[#thm-unify]] $\mathrm{unify}(C)$ succeeds with an mgu $\sigma$ and $\sigma' = \tau \circ \sigma$. By soundness $\sigma T$ is a type of $t$, and $T' = \sigma' T = \tau(\sigma T)$ is an instance of it. If unification fails, $C$ has no solution and by completeness $t$ has no type.
:::

## Let-polymorphism

Principal types are general, but each *use* of a variable must agree with its single type. Consider

$$
(\lambda \mathit{id}.\,(\mathit{id}\ 1,\ \mathit{id}\ \mathsf{true}))\ (\lambda x.\,x).
$$

The constraints say that the type $\alpha$ of $\mathit{id}$ equals $\mathsf{Int} \to \beta$ and also $\mathsf{Bool} \to \gamma$, so unification fails on $\mathsf{Int} = \mathsf{Bool}$. Yet the program is perfectly safe. The problem is that the parameter $\mathit{id}$ could be bound to *any* function of the right type, including one that works only on integers; inside the body we cannot assume more. With `let`, the situation is different: in $\mathsf{let}\ \mathit{id} = \lambda x.\,x\ \mathsf{in}\ (\mathit{id}\ 1,\ \mathit{id}\ \mathsf{true})$ we *know* what $\mathit{id}$ is, and its principal type $\alpha \to \alpha$ holds for every $\alpha$. Milner's idea was to give let-bound variables **type schemes**.

::: definition Type schemes; generalisation and instantiation {#def-scheme}
A **type scheme** is $\sigma ::= \forall \alpha_1 \ldots \alpha_n.\,T$ ($n \ge 0$), binding the type variables $\alpha_i$ in $T$. Contexts now map variables to schemes. A type $T'$ is an **instance** of $\forall \vec\alpha.\,T$ if $T' = [\vec\alpha \mapsto \vec S]\,T$ for some types $\vec S$. **Generalising** $T$ in $\Gamma$ quantifies the variables free in $T$ but not free in $\Gamma$: $\mathrm{gen}(\Gamma, T) = \forall \vec\alpha.\,T$ with $\vec\alpha = \mathrm{FV}(T) \setminus \mathrm{FV}(\Gamma)$.
:::

::: definition The Hindley–Milner type system {#def-hm}
Terms are $t ::= x \mid \lambda x.\,t \mid t\ t \mid \mathsf{let}\ x = t\ \mathsf{in}\ t$ plus constants. The rules are

$$
\frac{x{:}\sigma \in \Gamma \quad T \text{ an instance of } \sigma}{\Gamma \vdash x : T}
\qquad
\frac{\Gamma, x{:}T_1 \vdash t : T_2}{\Gamma \vdash \lambda x.\,t : T_1 \to T_2}
\qquad
\frac{\Gamma \vdash t_1 : T_1 \to T_2 \quad \Gamma \vdash t_2 : T_1}{\Gamma \vdash t_1\ t_2 : T_2}
\qquad
\frac{\Gamma \vdash t_1 : T_1 \quad \Gamma, x{:}\mathrm{gen}(\Gamma, T_1) \vdash t_2 : T_2}{\Gamma \vdash \mathsf{let}\ x = t_1\ \mathsf{in}\ t_2 : T_2}
$$

In the abstraction rule the parameter gets a plain type (a scheme with no quantifiers): only `let` introduces polymorphism.
:::

Why must generalisation exclude variables free in $\Gamma$? In $\lambda y.\,\mathsf{let}\ z = y\ \mathsf{in}\ z$, the type of $z$ is the type $\beta$ of $y$, which is fixed by the context; quantifying it would claim $z$ has every type, and the function would get the unsound type $\beta \to \gamma$. Variables that occur in $\Gamma$ stand for one particular, not yet known, type.

### Algorithm W

Milner's Algorithm W interleaves constraint generation with unification, returning a substitution and a type.

::: algorithm Algorithm W (Milner, 1978) {#alg-w}
$W(\Gamma, t)$ returns a pair $(S, T)$ of a substitution and a type, or fails.

1. $t = x$ with $x{:}\forall \alpha_1 \ldots \alpha_n.\,T \in \Gamma$: return $(\mathrm{id}, [\alpha_i \mapsto \beta_i]\,T)$ with $\beta_i$ fresh (instantiation).
2. $t = \lambda x.\,t_1$: let $\beta$ be fresh and $(S_1, T_1) = W((\Gamma, x{:}\beta), t_1)$; return $(S_1, S_1\beta \to T_1)$.
3. $t = t_1\ t_2$: let $(S_1, T_1) = W(\Gamma, t_1)$, $(S_2, T_2) = W(S_1\Gamma, t_2)$, $\beta$ fresh, $S_3 = \mathrm{unify}(S_2 T_1 = T_2 \to \beta)$; return $(S_3 S_2 S_1, S_3 \beta)$.
4. $t = \mathsf{let}\ x = t_1\ \mathsf{in}\ t_2$: let $(S_1, T_1) = W(\Gamma, t_1)$ and $(S_2, T_2) = W((S_1\Gamma, x{:}\mathrm{gen}(S_1\Gamma, T_1)), t_2)$; return $(S_2 S_1, T_2)$.
:::

```python
def instantiate(sc):
    s = {a: fresh() for a in sc.vars}
    return apply(s, sc.ty)

def generalise(env, t):
    return Scheme(tuple(sorted(ftv(t) - ftv_env(env))), t)

def W(env, e):
    match e:
        case Lit(v): return {}, BOOL if isinstance(v, bool) else INT
        case Var(x):
            if x not in env: raise InferError(f"unbound variable {x}")
            return {}, instantiate(env[x])
        case Lam(x, body):
            a = fresh()
            s1, t1 = W({**env, x: Scheme((), a)}, body)
            return s1, fn(apply(s1, a), t1)
        case App(f, arg):
            s1, t1 = W(env, f)
            s2, t2 = W({k: apply_scheme(s1, v) for k, v in env.items()}, arg)
            b = fresh()
            s3 = unify(apply(s2, t1), fn(t2, b))
            return compose(s3, compose(s2, s1)), apply(s3, b)
        case Let(x, rhs, body):
            s1, t1 = W(env, rhs)
            env1 = {k: apply_scheme(s1, v) for k, v in env.items()}
            s2, t2 = W({**env1, x: generalise(env1, t1)}, body)
            return compose(s2, s1), t2
```

The initial environment gives the primitives their schemes: `+ : Int -> Int -> Int`, `= : Int -> Int -> Bool`, `if : ∀a. Bool -> a -> a -> a`, `pair : ∀a b. a -> b -> a * b`, `fst : ∀a b. a * b -> a`, and `fix : ∀a. (a -> a) -> a` for recursion ([[programming-languages/type-systems]]).

::: example Inferring types with W {#ex-w-run}
Run the inferencer on a range of programs, typed and untyped.
::: solution
```console
\x. x                                              : 'a -> 'a
\f g x. f (g x)                                    : ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b
\x y. x                                            : 'a -> 'b -> 'a
\f. \x. + (f x) 1                                  : ('a -> Int) -> 'a -> Int
let id = \x. x in pair (id 1) (id true)            : (Int * Bool)
(\id. pair (id 1) (id true)) (\x. x)               : error: cannot unify Int with Bool
\x. x x                                            : error: occurs check: t32 occurs in t32 -> t33
+ 1 true                                           : error: cannot unify Int with Bool
fix (\fact n. if (= n 0) 1 (* n (fact (- n 1))))   : Int -> Int
let twice = \f x. f (f x) in twice twice           : ('a -> 'a) -> 'a -> 'a
\p. pair (fst p) (fst p)                           : ('a * 'b) -> ('a * 'a)
```

The `let` version of the identity example succeeds because `id` is generalised to $\forall a.\,a \to a$ and instantiated separately at $\mathsf{Int}$ and at $\mathsf{Bool}$; the λ version fails. In `twice twice` the two occurrences of `twice` are instantiated with different type variables, $(\alpha\to\alpha)\to\alpha\to\alpha$ and $(\beta\to\beta)\to\beta\to\beta$; unifying the first's argument type $\alpha \to \alpha$ with the second's whole type forces $\alpha = \beta \to \beta$, and the result is $\alpha \to \alpha$, that is $(\beta\to\beta)\to\beta\to\beta$: applying a function four times. The factorial needs no annotations: `= n 0` forces `n : Int`, and the result type comes from `1`.
:::
:::

::: example Tracing W {#ex-w-trace}
Trace $W(\varnothing, \lambda f.\,\lambda x.\,f\,(f\ x))$, writing the substitutions.
::: solution
1. Abstraction over $f$: fresh $\alpha$; compute $W(f{:}\alpha, \lambda x.\,f\,(f\ x))$.
2. Abstraction over $x$: fresh $\beta$; compute $W(f{:}\alpha, x{:}\beta;\ f\,(f\ x))$.
3. Application $f\,(f\ x)$. First $W(\ldots, f) = (\mathrm{id}, \alpha)$. Then the argument $f\ x$: $W$ of $f$ gives $\alpha$, of $x$ gives $\beta$; fresh $\gamma$; unify $\alpha = \beta \to \gamma$, giving $S = [\alpha \mapsto \beta \to \gamma]$ and type $\gamma$. So $S_2 = [\alpha \mapsto \beta\to\gamma]$, $T_2 = \gamma$.
4. Back in the outer application: $S_2 T_1 = S_2\alpha = \beta \to \gamma$; fresh $\delta$; unify $\beta \to \gamma = \gamma \to \delta$, giving $S_3 = [\beta \mapsto \delta,\ \gamma \mapsto \delta]$ (unify $\beta$ with $\gamma$ first, giving $[\beta \mapsto \gamma]$, then $\gamma$ with $\delta$). Return $S_3 S_2 = [\alpha \mapsto \delta \to \delta,\ \beta \mapsto \delta,\ \gamma \mapsto \delta]$ and type $S_3\delta = \delta$.
5. The abstraction over $x$ returns type $S\beta \to \delta = \delta \to \delta$; the one over $f$ returns $S\alpha \to (\delta \to \delta) = (\delta \to \delta) \to \delta \to \delta$.

The same answer as the constraint method of [[#ex-constraints]], up to the names of variables: W solves each equation as soon as it is generated.
:::
:::

::: theorem Soundness and completeness of W (Damas and Milner, 1982) {#thm-w}
(Soundness) If $W(\Gamma, t) = (S, T)$ then $S\Gamma \vdash t : T$ in the Hindley–Milner system. (Completeness) If $S'\Gamma \vdash t : T'$ for some substitution $S'$ and type $T'$, then $W(\Gamma, t)$ succeeds with some $(S, T)$, and there is $R$ with $S'\Gamma = R S \Gamma$ and $T'$ an instance of $\mathrm{gen}(S\Gamma, T)$ under $R$. In particular, a closed term has a principal type scheme, $\mathrm{gen}(\varnothing, T)$.
:::

The proofs are inductions on $t$ in the style of [[#thm-principal]], using [[#thm-unify]] in the application case and a lemma that typing is preserved by substitution; they appeared in Luis Damas's thesis (Edinburgh, 1985). We do not reproduce them.

::: quiz
Which programs does Hindley–Milner inference accept?
- [x] `let k = \x y. x in pair (k 1 true) (k true 1)`
- [ ] `\k. pair (k 1 true) (k true 1)`
- [x] `let f = \x. x in let g = f f in g 3`
- [ ] `\y. let z = y in pair (z 1) (z true)`
::: solution
In the first, `k` is let-bound and generalised to $\forall a\,b.\,a \to b \to a$, so the two uses can be instantiated differently. The second is λ-bound, so `k` has one monomorphic type and `k 1 true` and `k true 1` conflict. In the third, `f` is generalised, `f f` instantiates it twice and gives `g : ∀a. a -> a`, so `g 3 : Int`. In the fourth, `z` gets the type of `y`, a variable free in the context, which is *not* generalised; so `z` cannot be used at both $\mathsf{Int} \to \ldots$ and $\mathsf{Bool} \to \ldots$.
:::
:::

## The cost of inference

Unification is fast — with a union–find representation of type variables and sharing of sub-terms, it runs in almost linear time (Martelli and Montanari, 1982; Paterson and Wegman, 1978, gave a linear algorithm). For programs without `let`, inference is therefore nearly linear. With `let`, the inferred *types* can be huge.

::: example Doubly exponential types {#ex-blowup}
Infer the type of $\mathsf{let}\ f_0 = \lambda x.\,(x, x)\ \mathsf{in}\ \mathsf{let}\ f_1 = \lambda y.\,f_0\,(f_0\ y)\ \mathsf{in}\ \cdots\ \mathsf{in}\ f_n$ for small $n$, and measure the size of the type (the number of nodes in its syntax tree).
::: solution
```python
def blowup(n):
    src = r"let f0 = \x. pair x x in "
    for i in range(1, n + 1):
        src += f"let f{i} = \\y. f{i-1} (f{i-1} y) in "
    return src + f"f{n}"
for n in range(0, 4):
    s, t = W(PRIMS, parse(blowup(n)))
    print(n, len(blowup(n)), size(apply(s, t)))
print(infer(parse(blowup(1))))
```

```console
0 27 5
1 53 9
2 79 33
3 105 513
'a -> (('a * 'a) * ('a * 'a))
```

$f_0$ doubles its argument into a pair, and $f_{i}$ applies $f_{i-1}$ twice, so $f_n$ wraps its argument in $2^n$ levels of pairs: its type is $\alpha \to P$ with $P$ a complete binary tree of depth $2^n$, with $2^{2^n}$ leaves. Its size is $2 + (2 \cdot 2^{2^n} - 1) = 2^{2^n + 1} + 1$: $5, 9, 33, 513$, while the program grows by $26$ characters per level. For $n = 4$ the type has $131\,073$ nodes, and for $n = 5$ more than $8.5 \times 10^9$. (Represented as a graph with shared sub-trees, the type has only $O(2^n)$ nodes — still exponential.)
:::
:::

::: widget plot
f: 2^x + 1
x: 0, 4
y: 0, 18
labels: \log_2(\text{size} - 1) = 2^n + 1
points: 0,2; 1,3; 2,5; 3,9
caption: The logarithm of the size of the principal type of $f_n$ in [[#ex-blowup]], measured with the Python inferencer (dots) and given by the formula $\log_2(\mathrm{size} - 1) = 2^n + 1$. Even on a logarithmic scale the curve is exponential: the type size is *doubly* exponential in $n$, though the program's length is linear. This is the phenomenon behind the theorem below — and also why it almost never matters: real programs do not nest polymorphic lets this way.
:::

::: theorem Complexity of ML typing (Mairson; Kfoury, Tiuryn and Urzyczyn, 1990) {#thm-dexptime}
Deciding whether a term is typable in the Hindley–Milner system is complete for deterministic exponential time ($\mathsf{DEXPTIME}$).
:::

We state it without proof. The lower bound encodes the run of an exponential-time Turing machine in nested lets like those of the example; the upper bound follows from analysing Algorithm W with shared type representations. In practice ML and Haskell compilers infer types in time roughly linear in program size, because the nesting depth of polymorphic `let`s in real code is small.

::: warning Polymorphism and mutable state: the value restriction
Generalising every `let` is unsound once the language has mutable references. With `ref : ∀a. a -> Ref a`, `get : ∀a. Ref a -> a` and `set : ∀a. Ref a -> a -> Unit` added to the inferencer, the program

```text
let r = ref (\x. x) in let u = set r (\n. + n 1) in get r true
```

is accepted with type `Bool` — the cell `r` gets the scheme $\forall a.\,\mathrm{Ref}\,(a \to a)$, one use stores an integer function, another reads it back as a boolean function, and running the program would compute `true + 1`. Our inferencer, which generalises every `let`, prints `Bool`. ML's fix, the **value restriction** (Wright, 1995), generalises the type of `let x = e` only when `e` is a *syntactic value* (a variable, constant or λ-abstraction), whose evaluation cannot allocate a reference. OCaml then gives `r` a "weak" type `('_weak1 -> '_weak1) ref` that is fixed by its first use, and rejects the program. The restriction occasionally rejects harmless code, such as `let f = compose id id`, which is repaired by η-expanding it to `let f x = compose id id x`.
:::

## Type inference in practice

Hindley–Milner inference is the core of Standard ML, OCaml, F# and Haskell. Haskell extends it with **type classes** (Wadler and Blott, 1989), which add constraints such as `Num a =>` to schemes and are resolved by a form of logic programming during inference. Full inference does not extend much further: for System F, the polymorphic λ-calculus of [[programming-languages/polymorphism]], typability is undecidable (Wells, 1999), and subtyping makes principal types complicated. Modern languages therefore use **local** or **bidirectional** type inference (Pierce and Turner, 2000): types are propagated from annotations on function signatures into bodies, and inferred for local variables and lambda parameters from context. Rust, Scala, Swift, C#, Kotlin, TypeScript and the C++ `auto` keyword work this way; Python checkers such as mypy infer the types of local variables from their initialisers ([[program-design/types-interfaces]]). In all of them, the engine underneath is unification of type expressions with type variables.

::: history
Haskell Curry and Robert Feys (1958) described the principal type of a combinator. J. Roger Hindley's "The principal type-scheme of an object in combinatory logic" (1969) proved the existence of principal types and computed them with J. A. Robinson's unification algorithm ("A machine-oriented logic based on the resolution principle", 1965), designed for automated theorem proving. Robin Milner, independently, invented let-polymorphism and Algorithm W for the metalanguage ML of the LCF theorem prover: "A theory of type polymorphism in programming" (1978) proved that well-typed ML programs do not go wrong. Luis Damas and Milner's "Principal type-schemes for functional programs" (POPL 1982) proved W complete. Harry Mairson's "Deciding ML typability is complete for deterministic exponential time" (POPL 1990) and Kfoury, Tiuryn and Urzyczyn's paper at CAAP 1990 settled the complexity; Mads Tofte's thesis (1988) and Andrew Wright's "Simple imperative polymorphism" (1995) addressed references.
:::

## Where this leads

[[programming-languages/polymorphism]] makes the quantifiers of type schemes first-class: System F allows $\forall$ anywhere in a type, at the price of decidable inference, and adds subtyping and modules. Unification reappears in logic programming (Prolog's execution is unification plus backtracking), in automated theorem proving, and in pattern matching in compilers ([[compilers]]). Constraint-based inference generalises to type systems with subtyping, effects and ownership, where the constraints are no longer just equations.

::: summary
- **Type inference** assigns fresh type variables to unknowns, generates equations from the typing rules ([[#def-constraint-typing]]) and solves them.
- **Unification** solves equations between type expressions; Robinson's algorithm ([[#alg-unify]]) with the **occurs check** terminates and returns a **most general unifier** whenever any unifier exists ([[#thm-unify]]).
- Every typable term of the simply typed calculus has a **principal type** of which all its types are instances ([[#thm-principal]]).
- **Let-polymorphism** generalises the type of a `let`-bound variable to a **type scheme** $\forall \vec\alpha.\,T$, quantifying only variables not free in the context, and instantiates it afresh at each use ([[#def-scheme]], [[#def-hm]]); λ-bound variables stay monomorphic.
- **Algorithm W** ([[#alg-w]]) is sound and complete for Hindley–Milner and computes principal type schemes ([[#thm-w]]).
- Typability is $\mathsf{DEXPTIME}$-complete because types can be doubly exponential ([[#ex-blowup]], [[#thm-dexptime]]), but inference is fast on real programs. With mutable references, generalisation must be restricted to values.
:::

## Exercises

::: exercise Principal types by hand {level=1}
Find the principal types of (a) $\lambda x\,y\,z.\,x\ z\,(y\ z)$; (b) $\lambda f.\,\lambda x.\,f\ x\ x$; (c) $\lambda x.\,\lambda y.\,y\ (x\ y)$; and check (a) with the inferencer.
::: solution
(a) Let $x : \alpha$, $y : \beta$, $z : \gamma$. Then $x\ z$ forces $\alpha = \gamma \to \delta$; $y\ z$ forces $\beta = \gamma \to \varepsilon$; $(x\ z)(y\ z)$ forces $\delta = \varepsilon \to \zeta$. Result: $(\gamma \to \varepsilon \to \zeta) \to (\gamma \to \varepsilon) \to \gamma \to \zeta$, printed `('a -> 'b -> 'c) -> ('a -> 'b) -> 'a -> 'c` — the $S$ combinator, and by Curry–Howard the axiom $(A \to B \to C) \to (A \to B) \to A \to C$. (b) $(\alpha \to \alpha \to \beta) \to \alpha \to \beta$. (c) $y$ is applied to $x\ y$, and $x$ to $y$: $y : \beta$, $x : \beta \to \gamma$, and $\beta = \gamma \to \delta$; so $((\gamma\to\delta)\to\gamma) \to (\gamma\to\delta) \to \delta$.
:::
:::

::: exercise Unify by hand {level=1}
Find a most general unifier, or explain why none exists: (a) $\alpha \to \mathsf{Int} = (\mathsf{Bool} \to \beta) \to \beta$; (b) $\alpha \to \alpha = \mathsf{Int} \to \mathsf{Bool}$; (c) $\alpha \to \beta = \beta \to (\alpha \to \mathsf{Int})$; (d) $(\alpha \to \beta) \to \gamma = \gamma \to (\beta \to \alpha)$.
::: solution
(a) Components: $\alpha = \mathsf{Bool} \to \beta$ and $\mathsf{Int} = \beta$; mgu $[\alpha \mapsto \mathsf{Bool} \to \mathsf{Int},\ \beta \mapsto \mathsf{Int}]$. (b) $\alpha = \mathsf{Int}$, then $\mathsf{Int} = \mathsf{Bool}$: fails (clash). (c) $\alpha = \beta$, then $\beta = \beta \to \mathsf{Int}$: fails the occurs check. (d) $\gamma = \alpha \to \beta$ from the first components; then the second becomes $\alpha \to \beta = \beta \to \alpha$, so $\alpha = \beta$; mgu $[\gamma \mapsto \beta \to \beta,\ \alpha \mapsto \beta]$ (or the symmetric one with $\beta \mapsto \alpha$, which differs by a renaming).
:::
:::

::: exercise Counting constraints {level=1 check="3"}
How many equations does constraint generation ([[#def-constraint-typing]]) produce for $\lambda x\,y\,z.\,x\ z\,(y\ z)$? (Enter the number.)
::: solution
One per application node. The body $x\ z\,(y\ z)$ parses as $(x\ z)\,(y\ z)$, which has three applications: $x\ z$, $y\ z$ and the outer one. So three equations, as the program printed; abstractions and variables generate none.
:::
:::

::: exercise The size of the blow-up {level=2 check="33"}
Prove by induction that the principal type of $f_n$ in [[#ex-blowup]] has size $2^{2^n + 1} + 1$, and compute it for $n = 2$. (Enter the size for $n = 2$.)
::: solution
Claim: $f_n : \forall\alpha.\,\alpha \to P_n(\alpha)$, where $P_n(\alpha)$ is the complete binary tree of pair types of depth $2^n$ with all leaves $\alpha$. For $n = 0$, $f_0 = \lambda x.\,(x, x) : \alpha \to \alpha \times \alpha$, depth $1 = 2^0$. For $n + 1$: $f_{n+1} = \lambda y.\,f_n\,(f_n\ y)$; instantiate $f_n$ twice; the inner use gives $y : \alpha$ and $f_n\ y : P_n(\alpha)$; the outer use at $\beta := P_n(\alpha)$ gives $P_n(P_n(\alpha))$, a complete tree of depth $2^n + 2^n = 2^{n+1}$. A complete binary tree of depth $d$ has $2^d$ leaves and $2^d - 1$ internal nodes; the arrow type adds the arrow node and the leaf $\alpha$ on the left: size $1 + 1 + (2^{d+1} - 1) = 2^{d+1} + 1$ with $d = 2^n$. For $n = 2$: $2^5 + 1 = 33$, matching the measurement.
:::
:::

::: exercise Where polymorphism is needed {level=2}
For each program, say whether Hindley–Milner accepts it, and give the type or the failing equation: (a) `let f = \x. x in f f`; (b) `(\f. f f) (\x. x)`; (c) `let g = \x. pair x x in g (g 1)`; (d) `\x. let y = x 1 in x true`.
::: solution
(a) Accepted: `f` is generalised; the two occurrences are instantiated at $\beta\to\beta$ and $(\beta\to\beta)\to(\beta\to\beta)$; result $\beta \to \beta$. (b) Rejected: `f` is λ-bound and `f f` gives the equation $\alpha = \alpha \to \gamma$, which fails the occurs check — though the program would run fine. (c) Accepted: `g : ∀a. a -> a * a`, and the result is $(\mathsf{Int}\times\mathsf{Int})\times(\mathsf{Int}\times\mathsf{Int})$. (d) Rejected: `x` is λ-bound with one type; `x 1` forces $\alpha = \mathsf{Int} \to \beta$ and `x true` then requires $\mathsf{Int} = \mathsf{Bool}$.
:::
:::

::: exercise The value restriction {level=2}
Under ML's value restriction, which of these `let`s are generalised? (a) `let id = \x. x`; (b) `let id2 = (\x. x) (\y. y)`; (c) `let id3 = \z. (\x. x) (\y. y) z`; (d) `let r = ref []`. Why is it safe to generalise (c) but not (d)?
::: solution
(a) Yes, a λ-abstraction is a value: $\forall a.\,a \to a$. (b) No: an application is not a syntactic value, so its type gets a weak variable, fixed at the first use (it is safe, but the restriction is syntactic and conservative). (c) Yes: η-expansion turns it into a λ, a value, with $\forall a.\,a \to a$. (d) No, and this is the case the restriction exists for: evaluating `ref []` allocates *one* cell, which every use would share; generalising it to $\forall a.\,\mathrm{Ref}\ (\mathrm{List}\ a)$ would let one use store integers and another read strings. In (c), each *call* of `id3` evaluates the body afresh, so no state is shared between instantiations.
:::
:::

::: exercise Constraint-based inference in Python {level=3}
Implement inference for the λ-calculus without `let` by first generating the list of equations of [[#def-constraint-typing]] and then solving it with `unify`. Check that it agrees with W on $\lambda f\,x.\,f\,(f\ x)$, $\lambda x\,y\,z.\,x\ z\,(y\ z)$ and composition, and fails on $\lambda x.\,x\ x$.
::: solution
```python
def constraints(env, e, out):
    """Return a type for e, appending equations (pairs of types) to out."""
    match e:
        case Lit(v): return BOOL if isinstance(v, bool) else INT
        case Var(x): return instantiate(env[x])
        case Lam(x, body):
            a = fresh()
            return fn(a, constraints({**env, x: Scheme((), a)}, body, out))
        case App(f, arg):
            t1 = constraints(env, f, out); t2 = constraints(env, arg, out)
            b = fresh(); out.append((t1, fn(t2, b))); return b

def solve(eqs):
    s = {}
    for l, r in eqs:
        s = compose(unify(apply(s, l), apply(s, r)), s)
    return s
```

```console
\f x. f (f x)          2 equations  ('a -> 'a) -> 'a -> 'a
\x y z. x z (y z)      3 equations  ('a -> 'b -> 'c) -> ('a -> 'b) -> 'a -> 'c
\f g x. f (g x)        2 equations  ('a -> 'b) -> ('c -> 'a) -> 'c -> 'b
\x. x x                1 equations  error: occurs check: t15 occurs in t15 -> t16
```

The results agree with W. `solve` processes the equations one at a time, applying the substitution found so far before unifying; by [[#thm-unify]] (applied to $C$ split as the first equation and the rest), the composed result is an mgu of the whole list. Separating generation from solving is the basis of modern inference engines: the constraints can be reordered, simplified, or reported in error messages that point at the *pair* of uses that conflict rather than wherever W happened to detect the clash.
:::
:::

::: exercise Without the occurs check {level=3}
Suppose the occurs check is removed from `bind`. (a) What "type" does the inferencer then produce for $\lambda x.\,x\ x$, and why is it not a solution of the constraint $\alpha = \alpha \to \beta$? (b) Show that if we allow infinite (regular) types, the equation has a solution, and describe it with a recursive type $\mu \alpha.\,\alpha \to \beta$. (c) Explain why ML rejects such types by default although they are consistent, using the fact that $\lambda x.\,x\ x$ then has a type.
::: solution
(a) The substitution $[\alpha \mapsto \alpha \to \beta]$ is returned and the type is printed as $(\alpha \to \beta) \to \beta$. It is not a unifier: applying it to the two sides gives $\alpha \to \beta$ and $(\alpha \to \beta) \to \beta$, which differ; the variable $\alpha$ remains on both sides. Every finite substitution fails for the size reason in the proof of [[#thm-unify]]. (b) The infinite tree $T = ((\ldots \to \beta) \to \beta) \to \beta$ satisfies $T = T \to \beta$; it is regular (finitely many distinct sub-trees) and is written $\mu \alpha.\,\alpha \to \beta$, "the type $\alpha$ such that $\alpha = \alpha \to \beta$". Unification over regular trees is decidable: drop the occurs check and represent types as graphs, as Huet showed in 1976. (c) With such **equi-recursive** types, $\lambda x.\,x\ x$ gets type $(\mu\alpha.\,\alpha\to\beta) \to \beta$, so $\Omega$ and the $Y$ combinator are typable and the typed language admits general recursion without `fix`. That is consistent (safety still holds), but it makes many *mistakes* typable — forgetting an argument often produces a recursive type instead of an error — so OCaml offers it only with the `-rectypes` flag. Languages normally introduce recursive types only through named data type declarations, whose constructors mark where the recursion is unfolded (*iso-recursive* types).
:::
:::
