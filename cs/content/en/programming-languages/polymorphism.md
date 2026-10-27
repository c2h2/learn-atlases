A sorting function should work on lists of integers, of strings and of dates; a function that draws a shape should accept circles, squares and anything else that has an outline; a dictionary module should let its clients store keys and values without knowing whether it uses a hash table or a balanced tree. Each is a kind of **polymorphism** — one piece of code used at many types — and each needs its own type-system machinery. The simply typed λ-calculus of [[programming-languages/type-systems]] has none of it: every function there has exactly one type.

Christopher Strachey (1967) distinguished **parametric** polymorphism, in which code works *uniformly* for all types, from **ad hoc** polymorphism (overloading), in which a name stands for different code at different types, like `+` on integers and on strings. Luca Cardelli and Peter Wegner (1985) added **subtype** (inclusion) polymorphism, in which a value of one type may be used where a value of a more general type is expected. This chapter gives the precise type theory of all three. **System F** makes parametric polymorphism first-class and explains Hindley–Milner's type schemes ([[programming-languages/type-inference]]) as a fragment of a larger system; **parametricity** shows how much a polymorphic type says about its programs. **Subtyping** gets inference rules, and we prove why function types are contravariant in their arguments and mutable references invariant. Finally **existential types** explain abstract data types and module systems. Practical uses in Python — generics, protocols and variance annotations — were met in [[program-design/types-interfaces]]; here we look at the theory behind them.

## Parametric polymorphism: System F

In Hindley–Milner, polymorphism lives only at the outside of a type: `id : ∀a. a -> a`, and a function cannot take a polymorphic argument — in [[programming-languages/type-inference]], $\lambda \mathit{id}.\,(\mathit{id}\ 1, \mathit{id}\ \mathsf{true})$ was rejected. **System F**, discovered independently by the logician Jean-Yves Girard (1972) and the computer scientist John Reynolds (1974), allows $\forall$ anywhere in a type, and makes the abstraction over types and the instantiation explicit in terms.

::: definition System F {#def-system-f}
Types and terms are

$$
T ::= \alpha \mid T \to T \mid \forall \alpha.\,T
\qquad\qquad
t ::= x \mid \lambda x{:}T.\,t \mid t\ t \mid \Lambda \alpha.\,t \mid t\,[T]
$$

with values $v ::= \lambda x{:}T.\,t \mid \Lambda \alpha.\,t$. A **type abstraction** $\Lambda \alpha.\,t$ is a term parameterised by a type; a **type application** $t\,[T]$ instantiates it. Contexts contain both term variables with types and type variables: $\Gamma ::= \varnothing \mid \Gamma, x{:}T \mid \Gamma, \alpha$. The typing rules are those of the simply typed λ-calculus plus

$$
\frac{\Gamma, \alpha \vdash t : T}{\Gamma \vdash \Lambda \alpha.\,t : \forall \alpha.\,T}\ \text{(T-TAbs)}
\qquad
\frac{\Gamma \vdash t : \forall \alpha.\,T_{12}}{\Gamma \vdash t\,[T_2] : T_{12}[\alpha := T_2]}\ \text{(T-TApp)}
$$

(with $\alpha$ not already in $\Gamma$, renaming if necessary), and the evaluation rules (call-by-value) are those of the λ-calculus plus

$$
\frac{t_1 \to t_1'}{t_1\,[T_2] \to t_1'\,[T_2]}\ \text{(E-TApp)}
\qquad
\frac{}{(\Lambda \alpha.\,t_{12})\,[T_2] \to t_{12}[\alpha := T_2]}\ \text{(E-TAppTAbs)}
$$
:::

Type substitution $T[\alpha := S]$ must avoid capture exactly like term substitution ([[programming-languages/lambda-calculus#def-subst]]): $(\forall \beta.\,\alpha \to \beta)[\alpha := \beta]$ is $\forall \beta'.\,\beta \to \beta'$, not $\forall \beta.\,\beta \to \beta$.

The polymorphic identity is $\mathit{id} = \Lambda \alpha.\,\lambda x{:}\alpha.\,x : \forall \alpha.\,\alpha \to \alpha$, and $\mathit{id}\,[\mathsf{Nat}]\ 3 \to (\lambda x{:}\mathsf{Nat}.\,x)\ 3 \to 3$. More interesting is what Hindley–Milner cannot type: a function that *receives* the identity and uses it at two types, $\lambda f{:}(\forall \alpha.\,\alpha \to \alpha).\,(f\,[\mathsf{Nat}]\ 1,\ f\,[\mathsf{Bool}]\ \mathsf{true})$, or polymorphic self-application:

$$
\mathit{selfApp} = \lambda x{:}(\forall \alpha.\,\alpha \to \alpha).\,x\,[\forall \alpha.\,\alpha \to \alpha]\ x \;:\; (\forall \alpha.\,\alpha \to \alpha) \to (\forall \alpha.\,\alpha \to \alpha).
$$

Here a type variable is instantiated with a polymorphic type — even the very type being defined. This is **impredicativity**, the source of both System F's power and its difficulty.

A checker for System F is a short extension of the one for simple types. The two new cases are type abstraction and type application; types are compared up to renaming of bound type variables:

```python
def typeof(t, ctx=None):
    ctx = ctx or {}
    match t:
        case Var(x): return ctx[x]
        case Lam(x, T, b): return Fn(T, typeof(b, {**ctx, x: T}))
        case App(f, a):
            F, A = typeof(f, ctx), typeof(a, ctx)
            if not isinstance(F, Fn): raise TypeError_("not a function")
            if not alpha_eq(F.dom, A): raise TypeError_(f"argument mismatch")
            return F.cod
        case TLam(a, b): return All(a, typeof(b, ctx))              # T-TAbs
        case TApp(f, T):                                            # T-TApp
            F = typeof(f, ctx)
            if not isinstance(F, All): raise TypeError_("not polymorphic")
            return tsubst(F.body, F.var, T)                         # capture-avoiding
```

::: example Church numerals in System F {#ex-church-f}
Type the identity, polymorphic self-application, the Church numeral $2$, successor and addition in System F, and check them with the Python checker.
::: solution
In the untyped λ-calculus a Church numeral iterates a function ([[programming-languages/lambda-calculus#def-church-numerals]]). In System F the type of iteration is "for every type $X$, given a function $X \to X$ and a starting $X$, return an $X$":

$$
\mathsf{CNat} = \forall X.\,(X \to X) \to X \to X,
\qquad
c_2 = \Lambda X.\,\lambda f{:}X\to X.\,\lambda x{:}X.\,f\,(f\ x).
$$

The successor instantiates its argument at the same $X$: $\mathsf{succ} = \lambda n{:}\mathsf{CNat}.\,\Lambda X.\,\lambda f{:}X\to X.\,\lambda x{:}X.\,f\,(n\,[X]\ f\ x)$. Addition iterates $\mathsf{succ}$ — which requires instantiating $m$ at the type $\mathsf{CNat}$ itself, an impredicative step: $\mathsf{plus} = \lambda m{:}\mathsf{CNat}.\,\lambda n{:}\mathsf{CNat}.\,m\,[\mathsf{CNat}]\ \mathsf{succ}\ n$.

```console
id      : ∀a. a -> a
id [Nat]: Nat -> Nat
selfapp : (∀a. a -> a) -> ∀a. a -> a
selfapp id: ∀a. a -> a
two     : ∀X. (X -> X) -> X -> X
succ    : (∀X. (X -> X) -> X -> X) -> ∀X. (X -> X) -> X -> X
plus    : (∀X. (X -> X) -> X -> X) -> (∀X. (X -> X) -> X -> X) -> ∀X. (X -> X) -> X -> X
subst   : ∀b0. b -> b0
rejected: not a function
```

The `subst` line checks capture-avoiding type substitution: $(\forall b.\,a \to b)[a := b]$ renames the bound $b$. The last line applies $\mathit{id}$ without instantiating it first: a polymorphic value must be given a type before it can be applied. Languages with System F-style types (Haskell with `RankNTypes`, Scala, OCaml's polymorphic record fields) insert these type applications automatically wherever they can be inferred.
:::
:::

### Safety and its limits

::: lemma Type substitution {#lem-type-subst}
If $\Gamma, \alpha, \Delta \vdash t : T$ and $S$ is a type whose free variables are in $\Gamma$, then $\Gamma, \Delta[\alpha := S] \vdash t[\alpha := S] : T[\alpha := S]$.
:::

::: proof
By induction on the typing derivation. In T-Var the type of $x$ is read from the context, and the substituted context gives it type $T[\alpha := S]$. T-Abs, T-App and T-TAbs follow from the induction hypothesis (renaming bound type variables away from $\alpha$ and $\mathrm{FV}(S)$). For T-TApp, $t = t_1\,[T_2]$ with $t_1 : \forall \beta.\,T_{12}$ and $T = T_{12}[\beta := T_2]$; the induction hypothesis gives $t_1[\alpha := S] : \forall \beta.\,T_{12}[\alpha := S]$, and T-TApp gives the type $T_{12}[\alpha := S][\beta := T_2[\alpha := S]]$, which equals $T_{12}[\beta := T_2][\alpha := S]$ by the substitution lemma for types ($\beta \ne \alpha$, $\beta \notin \mathrm{FV}(S)$).
:::

::: theorem Type safety for System F {#thm-safety-f}
If $\varnothing \vdash t : T$, then $t$ is a value or $t \to t'$ for some $t'$ (progress), and if $t \to t'$ then $\varnothing \vdash t' : T$ (preservation).
:::

::: proof
The proofs of [[programming-languages/type-systems#thm-progress]] and [[programming-languages/type-systems#thm-preservation]] carry over, with new cases for T-TAbs and T-TApp. *Progress*: $\Lambda \alpha.\,t$ is a value; for $t_1\,[T_2]$, either $t_1$ steps (E-TApp), or $t_1$ is a value of type $\forall \alpha.\,T_{12}$, which by the new canonical-forms case is a type abstraction $\Lambda \alpha.\,t_{12}$ (a λ-abstraction has an arrow type), and E-TAppTAbs applies. *Preservation*: for E-TApp use the induction hypothesis; for E-TAppTAbs, inversion gives $\alpha \vdash t_{12} : T_{12}$ and [[#lem-type-subst]] gives $\varnothing \vdash t_{12}[\alpha := T_2] : T_{12}[\alpha := T_2]$, the type of $t$.
:::

Girard proved much more: every well-typed System F term is **strongly normalising** (1972), by a generalisation of Tait's method in which the "reducibility candidates" for a type variable range over *all* suitable sets of terms. So System F, despite its power, is not Turing-complete — every function definable in it is total, and it defines exactly the functions that second-order arithmetic can prove total. Two negative results limit its use as a programming language. Typability of unannotated terms is **undecidable** (J. B. Wells, 1994, journal version 1999), so full inference is impossible, and annotations are needed at polymorphic arguments; that is why Hindley–Milner restricts $\forall$ to the outside of let-bound types (**rank-1** or **prenex** polymorphism) — exactly the fragment where inference works.

### Parametricity

A parametrically polymorphic function cannot inspect its type argument: the body of $\Lambda \alpha.\,t$ has no operation that tests what $\alpha$ is. That constraint is strong enough to determine the behaviour of some functions from their types alone.

::: proposition The only identity {#prop-only-id}
Every closed normal-form term of type $\forall \alpha.\,\alpha \to \alpha$ in System F is $\Lambda \alpha.\,\lambda x{:}\alpha.\,x$, up to α-equivalence. Consequently every closed term of that type behaves as the identity at every type.
:::

::: proof
Call a term **neutral** if it is a variable applied to zero or more arguments (terms or types): $x\ a_1 \cdots a_k$. Every β-normal form is either an abstraction ($\lambda$ or $\Lambda$) whose body is a normal form, or neutral with normal-form arguments (otherwise it would contain a redex). A closed term has no free variables, so a closed normal form is not neutral.

Let $t$ be a closed normal form of type $\forall \alpha.\,\alpha \to \alpha$. It is an abstraction; by inversion it is a type abstraction $\Lambda \alpha.\,t_1$ with $\alpha \vdash t_1 : \alpha \to \alpha$. The context $\alpha$ contains no term variables, so $t_1$ is not neutral; it has an arrow type, so it is $\lambda x{:}\alpha.\,t_2$ with $\alpha, x{:}\alpha \vdash t_2 : \alpha$. Now $t_2$ is a normal form of type $\alpha$, a type variable; it is not an abstraction (abstractions have arrow or $\forall$ types), so it is neutral, with head a variable of the context — necessarily $x$, the only term variable. If $x$ were applied to arguments, its type $\alpha$ would have to be an arrow or $\forall$ type, which it is not; so $t_2 = x$. Hence $t = \Lambda \alpha.\,\lambda x{:}\alpha.\,x$. Finally, by strong normalisation and preservation, every closed term of the type reduces to a normal form of the same type, which is the identity, so applying it to any $[T]$ and $v$ yields $v$.
:::

Reynolds's **abstraction theorem** (1983) generalises this: every polymorphic term preserves every relation between the types at which it is instantiated. Philip Wadler's "Theorems for free!" (1989) turned it into a tool: from the type alone one derives laws such as "for every $f : \forall \alpha.\,\mathrm{List}\ \alpha \to \mathrm{List}\ \alpha$ and every function $g$, $\mathrm{map}\ g \circ f = f \circ \mathrm{map}\ g$" — a function that only rearranges, drops or duplicates elements commutes with mapping. Such laws justify compiler optimisations like fusion ([[program-design/higher-order-functions#thm-map-fusion]]).

::: warning Parametricity is easily broken
The free theorems hold only in a language where polymorphic code really cannot inspect types. Each of the following breaks them: run-time type tests (`isinstance(x, int)` in Python, `instanceof` in Java), so that a "generic" `f[T](x: T) -> T` can return `x + 1` when `x` is an integer; exceptions and non-termination, so that $\forall \alpha.\,\alpha \to \alpha$ is also inhabited by a function that always raises; reflection; and `seq` in Haskell, which can distinguish a function from an undefined value. With side effects or general recursion the theorems hold only in weakened forms. Treat "the type says it all" as a strong hint in such languages, not a guarantee.
:::

### Implementation: erasure or specialisation

There are two ways to compile parametric polymorphism. **Erasure** compiles one copy of the code, with all values of type $\alpha$ represented uniformly (a pointer or a tagged word) — OCaml, Haskell, Java generics and Python's type-hinted generics do this, which is why their run time does not know type arguments ([[program-design/types-interfaces]]). **Monomorphisation** generates a specialised copy of the code for each type at which it is used — C++ templates and Rust generics, giving faster code at the cost of code size and compile time. A Rust example with a **bounded** type parameter — `T` must support comparison and copying:

```rust
use std::fmt::Display;

fn largest<T: PartialOrd + Copy>(xs: &[T]) -> T {     // bounded parametric polymorphism
    let mut m = xs[0];
    for &x in xs { if x > m { m = x; } }
    m
}
fn describe(items: &[Box<dyn Display>]) -> String {   // trait objects: dynamic dispatch
    items.iter().map(|d| d.to_string()).collect::<Vec<_>>().join(", ")
}
fn main() {
    println!("{} {} {}", largest(&[3, 7, 2]), largest(&[1.5, 0.5]), largest(&['q', 'z', 'a']));
    let items: Vec<Box<dyn Display>> = vec![Box::new(42), Box::new("text"), Box::new(2.5)];
    println!("{}", describe(&items));
}
```

```console
$ rustc -C opt-level=0 generic.rs && ./generic
7 1.5 z
42, text, 2.5
$ nm -C generic | grep largest
000000000001af10 t generic::largest
000000000001afb0 t generic::largest
000000000001b050 t generic::largest
```

The symbol table of the unoptimised binary (rustc 1.95, as of 2026) contains three copies of `largest`, one each for `i32`, `f64` and `char`. `describe`, by contrast, takes a list of values of *different* types that all implement `Display`, and calls their `to_string` through a table of function pointers at run time — the subtype-polymorphic style of the next section.

## Subtyping

Parametric polymorphism makes one function work at every type. Subtyping makes one value usable at several types: a point with three coordinates can be used where a point with two is expected.

::: definition Subtyping and subsumption {#def-subtyping}
A **subtype relation** $S <: T$ ("$S$ is a subtype of $T$") is a preorder on types that is connected to typing by the **subsumption** rule

$$
\frac{\Gamma \vdash t : S \quad S <: T}{\Gamma \vdash t : T}\ \text{(T-Sub)}
$$

so a term of a subtype may be used wherever the supertype is expected — Liskov's **substitution principle** made a typing rule. For records and functions, the declarative rules are

$$
\begin{gathered}
\frac{}{S <: S}\ \text{(S-Refl)}
\qquad
\frac{S <: U \quad U <: T}{S <: T}\ \text{(S-Trans)}
\qquad
\frac{}{S <: \mathsf{Top}}\ \text{(S-Top)}
\\[1.2em]
\frac{}{\{l_i{:}T_i\}_{i \le n+k} <: \{l_i{:}T_i\}_{i \le n}}\ \text{(S-RcdWidth)}
\qquad
\frac{S_i <: T_i \text{ for each } i}{\{l_i{:}S_i\}_i <: \{l_i{:}T_i\}_i}\ \text{(S-RcdDepth)}
\qquad
\frac{\{k_j{:}S_j\} \text{ a permutation of } \{l_i{:}T_i\}}{\{k_j{:}S_j\} <: \{l_i{:}T_i\}}\ \text{(S-RcdPerm)}
\\[1.2em]
\frac{T_1 <: S_1 \quad S_2 <: T_2}{S_1 \to S_2 <: T_1 \to T_2}\ \text{(S-Arrow)}
\end{gathered}
$$

and base types may have their own subtyping, such as $\mathsf{Nat} <: \mathsf{Int}$.
:::

Width subtyping says a record with *more* fields is a subtype: it can do everything the smaller record can. Depth subtyping says fields may be refined. This is **structural** subtyping; nominal systems (Java classes) declare the relation instead ([[program-design/types-interfaces#def-subtyping]]).

::: example Typing with subsumption {#ex-subsumption}
Let $\mathit{norm} = \lambda p{:}\{x{:}\mathsf{Int}, y{:}\mathsf{Int}\}.\,p.x \cdot p.x + p.y \cdot p.y$. Show that $\mathit{norm}\ \{x = 3, y = 4, c = \mathsf{true}\}$ is well typed, and say what the subsumption step means at run time.
::: solution
$\mathit{norm} : \{x{:}\mathsf{Int}, y{:}\mathsf{Int}\} \to \mathsf{Int}$ by T-Abs, with the field accesses typed by the record projection rule. The argument has type $\{x{:}\mathsf{Int}, y{:}\mathsf{Int}, c{:}\mathsf{Bool}\}$. By S-RcdWidth this is a subtype of $\{x{:}\mathsf{Int}, y{:}\mathsf{Int}\}$, so T-Sub gives the argument the parameter's type and T-App types the application as $\mathsf{Int}$. Evaluation substitutes the three-field record and computes $9 + 16 = 25$; the extra field is simply never read. Nothing happens at run time for the subsumption step — but the implementation must make field access work for records of different shapes, by looking fields up by name, or by a coercion that copies the record into the smaller layout, or by keeping fields in a fixed order so that a prefix layout works (the trick behind single-inheritance object layouts in C++ and Java).
:::
:::

The arrow rule is the subtle one. It is **contravariant** in the argument (the order flips: $T_1 <: S_1$) and **covariant** in the result. A function can stand in for one that takes *narrower* arguments and returns *broader* results: a function that accepts any shape can be used where a function on circles is expected, never the reverse.

::: proposition Function subtyping must be contravariant {#prop-contra}
If S-Arrow were replaced by the covariant rule "$S_1 <: T_1$ and $S_2 <: T_2$ imply $S_1 \to S_2 <: T_1 \to T_2$", the type system would not be safe.
:::

::: proof
Let $P_1 = \{x{:}\mathsf{Int}\}$ and $P_2 = \{x{:}\mathsf{Int},\ y{:}\mathsf{Int}\}$, so $P_2 <: P_1$ by width. The function $g = \lambda p{:}P_2.\,p.y$ has type $P_2 \to \mathsf{Int}$. Under the covariant rule, $P_2 \to \mathsf{Int} <: P_1 \to \mathsf{Int}$, so by subsumption $g : P_1 \to \mathsf{Int}$, and the application $g\ \{x = 1\}$ is well typed with type $\mathsf{Int}$. It evaluates to $\{x = 1\}.y$, which is stuck: the record has no field $y$. Progress fails. With the contravariant rule, $P_2 \to \mathsf{Int} <: P_1 \to \mathsf{Int}$ would need $P_1 <: P_2$, which is false.
:::

### Variance

The same question arises for every type constructor $F$: given $S <: T$, how are $F(S)$ and $F(T)$ related? $F$ is **covariant** if $F(S) <: F(T)$, **contravariant** if $F(T) <: F(S)$, and **invariant** if neither holds in general. Arrows are contravariant in the domain, covariant in the codomain; immutable records, pairs and lists are covariant. Mutable references are invariant:

::: proposition References must be invariant {#prop-ref-invariant}
If $\mathrm{Ref}$ were covariant ($S <: T$ implies $\mathrm{Ref}\ S <: \mathrm{Ref}\ T$), or contravariant, the type system with assignment would not be safe.
:::

::: proof
*Covariant.* Take $\mathsf{Nat} <: \mathsf{Int}$ and let $r : \mathrm{Ref}\ \mathsf{Nat}$. By the covariant rule and subsumption, $r : \mathrm{Ref}\ \mathsf{Int}$, so `r := -1` type-checks; afterwards `!r` has type $\mathsf{Nat}$ but returns $-1$, and an operation relying on $\mathsf{Nat}$ — say indexing an array of size $n$ after checking $!r < n$ — goes wrong. *Contravariant.* Let $r : \mathrm{Ref}\ \mathsf{Int}$ hold $-1$; then $r : \mathrm{Ref}\ \mathsf{Nat}$ by contravariance, and `!r` has type $\mathsf{Nat}$ but yields $-1$. A reference supports both reading (which needs covariance) and writing (which needs contravariance), so only $S = T$ is safe.
:::

::: example Java's covariant arrays {#ex-java-arrays}
Java treats arrays as covariant: `String[]` is a subtype of `Object[]`. The following illustrative fragment compiles:

```text
Object[] objs = new String[1];   // allowed: String[] <: Object[]
objs[0] = Integer.valueOf(3);    // type checks: Integer <: Object
```

What happens when it runs, and how does the language remain safe?
::: solution
The second line throws `java.lang.ArrayStoreException` at run time. By [[#prop-ref-invariant]], covariant mutable arrays are unsound statically, so Java compensates dynamically: every array object records its element type, and every store into an array checks the stored value's class against it. Safety is preserved in the sense of [[programming-languages/type-systems#cor-safety]] — the failure is a defined exception, not a stuck state — at the cost of a check on every array store and of errors found late. Java's later generics (2004) are invariant: `List<String>` is not a subtype of `List<Object>`, and variance is requested at use sites with wildcards, `List<? extends Object>` (read-only, covariant) and `List<? super String>` (write-only, contravariant). Scala, Kotlin, C# and Python's `TypeVar(covariant=True)` let a definition declare its variance instead.
:::
:::

### Algorithmic subtyping

The declarative rules are not an algorithm: to check $S <: T$, S-Trans asks us to guess an intermediate type $U$, and T-Sub can be applied anywhere in a typing derivation. The standard solution is to find an equivalent set of rules that is **syntax-directed**: exactly one rule for each pair of type shapes, no transitivity rule, with width, depth and permutation merged into one record rule. A Python implementation:

```python
def subtype(S, T):
    """Algorithmic subtyping S <: T (no transitivity rule needed)."""
    match S, T:
        case _, Top(): return True                                  # S-Top
        case Base(a), Base(b): return a == b or (a, b) in BASE_SUB  # e.g. Nat <: Int
        case Rec(fs), Rec(gs):                                      # width + depth + permutation
            d = dict(fs)
            return all(l in d and subtype(d[l], U) for l, U in gs)
        case Fun(S1, S2), Fun(T1, T2):                              # contra- and covariant
            return subtype(T1, S1) and subtype(S2, T2)
        case Ref(S1), Ref(T1):                                      # invariant
            return subtype(S1, T1) and subtype(T1, S1)
    return False
```

```console
{x: Int, y: Int}                           <: {x: Int}                     True
{x: Int}                                   <: {x: Int, y: Int}             False
{x: Int, y: Int, colour: Bool}             <: {x: Int, y: Int}             True
{y: Int, x: Int}                           <: {x: Int, y: Int}             True
{x: Nat, y: Int}                           <: {x: Int, y: Int}             True
({x: Int} -> Int)                          <: ({x: Int, y: Int} -> Int)    True
({x: Int, y: Int} -> Int)                  <: ({x: Int} -> Int)            False
(Int -> Nat)                               <: (Nat -> Int)                 True
Ref Nat                                    <: Ref Int                      False
{x: Int, y: Int, colour: Bool}             <: Top                          True
```

::: theorem Algorithmic subtyping is sound and complete {#thm-algorithmic}
For the types $\mathsf{Top}$, base types (with a reflexive and transitive base relation), records and arrows: $\mathrm{subtype}(S, T)$ returns true if and only if $S <: T$ is derivable with the declarative rules of [[#def-subtyping]].
:::

::: proof
*Soundness* (if the algorithm says yes, a derivation exists): by induction on the run of the algorithm. Each case corresponds to declarative rules: the record case combines S-RcdPerm, S-RcdWidth and S-RcdDepth (permute so that the fields of $T$ come first, drop the extra fields by width, and refine by depth, using the induction hypothesis for each field), joined by S-Trans; the arrow case is S-Arrow; S-Top and the base case are immediate.

*Completeness* (if a derivation exists, the algorithm says yes): first show that the algorithmic relation is reflexive (induction on the type) and transitive, then induct on the declarative derivation. Reflexivity and the other rules map directly onto algorithmic cases. For transitivity, prove by induction on the size of $U$ that $\mathrm{subtype}(S, U)$ and $\mathrm{subtype}(U, T)$ imply $\mathrm{subtype}(S, T)$. If $T = \mathsf{Top}$, done. Otherwise $T$ is not $\mathsf{Top}$, so $U$ is not $\mathsf{Top}$ (nothing but $\mathsf{Top}$ is above $\mathsf{Top}$), and since the algorithm relates only types of the same shape, $S$, $U$, $T$ are all base types (use transitivity of the base relation), all records, or all arrows. Records: every field $l{:}T_l$ of $T$ is in $U$ with $U_l <: T_l$, and that field is in $S$ with $S_l <: U_l$; by the induction hypothesis on the smaller type $U_l$, $S_l <: T_l$. Arrows: $T_1 <: U_1 <: S_1$ and $S_2 <: U_2 <: T_2$, and the induction hypothesis on $U_1$ and $U_2$ gives $T_1 <: S_1$ and $S_2 <: T_2$.
:::

A similar argument shows that uses of T-Sub can be pushed to the arguments of applications: an algorithmic typing system checks $t_1\ t_2$ by computing the types $T_{11} \to T_{12}$ and $T_2$ and testing $T_2 <: T_{11}$, and every term then gets a **minimal type**.

::: widget graph
nodes: Top@1.5,3; {x}@0.5,2; {y}@2.5,2; {x,y}@1.5,1; {x,y,z}@0.5,0; {x,y,c}@2.5,0
edges: {x}>Top; {y}>Top; {x,y}>{x}; {x,y}>{y}; {x,y,z}>{x,y}; {x,y,c}>{x,y}
algorithm: topo
caption: Record types with integer fields ($c$ a colour), ordered by width subtyping; an arrow points from a subtype to an immediate supertype, and $\mathsf{Top}$ is above everything. This is the **Hasse diagram** of a partial order — subtyping is reflexive and transitive, and S-Trans gives the arrows left out (from $\{x,y,z\}$ to $\{x\}$, say). Run the topological sort: every type is listed before all its supertypes. The least common supertype (**join**) of $\{x,y,z\}$ and $\{x,y,c\}$ is $\{x,y\}$: a conditional whose branches have these two types is given the join as its type, so joins matter for typing.
:::

::: quiz
With $\mathsf{Nat} <: \mathsf{Int}$, which judgements hold?
- [x] $\mathsf{Int} \to \mathsf{Nat} <: \mathsf{Nat} \to \mathsf{Int}$
- [ ] $\mathsf{Nat} \to \mathsf{Nat} <: \mathsf{Int} \to \mathsf{Int}$
- [x] $(\mathsf{Nat} \to \mathsf{Int}) \to \mathsf{Nat} <: (\mathsf{Int} \to \mathsf{Nat}) \to \mathsf{Int}$
- [ ] $(\mathsf{Int} \to \mathsf{Nat}) \to \mathsf{Nat} <: (\mathsf{Nat} \to \mathsf{Int}) \to \mathsf{Int}$
- [ ] $\mathrm{Ref}\ \{x{:}\mathsf{Nat}\} <: \mathrm{Ref}\ \{x{:}\mathsf{Int}\}$
::: solution
The first holds: the domain flips ($\mathsf{Nat} <: \mathsf{Int}$) and the codomain is covariant ($\mathsf{Nat} <: \mathsf{Int}$). The second needs $\mathsf{Int} <: \mathsf{Nat}$ for the domain: false. In the third and fourth, the argument position is itself an arrow: $A \to \mathsf{Nat} <: B \to \mathsf{Int}$ needs $B <: A$. In the third, $B = \mathsf{Int}\to\mathsf{Nat}$ and $A = \mathsf{Nat}\to\mathsf{Int}$, and $B <: A$ is the first judgement, true. In the fourth the roles are swapped and $\mathsf{Nat}\to\mathsf{Int} <: \mathsf{Int}\to\mathsf{Nat}$ is false. The order flips at each domain, so a position nested in an even number of domains is covariant (the checker above agrees on both). The fourth fails because references are invariant.
:::
:::

## Objects, bounded quantification and modules

**Objects** can be understood with these tools. An object is a record of closures sharing hidden state — methods are fields of function type, and the state is captured in their environment ([[programming-languages/interpreters]]). Width subtyping then gives the "an object with more methods can be used in place of one with fewer" principle of object-oriented languages, and depth subtyping with S-Arrow gives the rule that an overriding method may accept more general arguments and return more specific results. (Java and C++ allow covariant return types but not contravariant parameter types; Eiffel's covariant parameters were unsound and needed a run-time fix.) The remaining difficulty is **self**: a method that returns "an object of the same type as the receiver" needs recursive types and, for inheritance, a careful separation of subclassing from subtyping (Cook, Hill and Canning, "Inheritance is not subtyping", 1990).

Combining subtyping with parametric polymorphism gives **bounded quantification**, $\forall \alpha <: T.\,U$ (Cardelli and Wegner, 1985; System $F_{<:}$): a function polymorphic over all subtypes of $T$, which can use $T$'s operations and still return the caller's more specific type. Java's `<T extends Comparable<T>>` and Rust's `T: PartialOrd` are bounded quantifiers. Full $F_{<:}$ subtyping is undecidable (Pierce, 1992), so languages restrict it.

### Modules and existential types

An **abstract data type** hides its representation behind an interface ([[program-design/abstract-data-types]]). In type theory, the interface is an **existential type**: a counter module has the type

$$
\exists \rho.\,\{\mathit{new} : \rho,\ \mathit{inc} : \rho \to \rho,\ \mathit{get} : \rho \to \mathsf{Int}\}
$$

— "there is some representation type $\rho$ with these operations". Mitchell and Plotkin's "Abstract types have existential type" (1988) made this precise.

::: definition Existential types {#def-existential}
Add types $\exists \alpha.\,T$ and terms $\mathsf{pack}\ \langle S, t\rangle\ \mathsf{as}\ \exists \alpha.\,T$ and $\mathsf{unpack}\ \langle \alpha, x\rangle = t_1\ \mathsf{in}\ t_2$, with rules

$$
\frac{\Gamma \vdash t : T[\alpha := S]}{\Gamma \vdash \mathsf{pack}\ \langle S, t\rangle\ \mathsf{as}\ \exists\alpha.\,T : \exists \alpha.\,T}
\qquad
\frac{\Gamma \vdash t_1 : \exists \alpha.\,T \quad \Gamma, \alpha, x{:}T \vdash t_2 : U \quad \alpha \notin \mathrm{FV}(U)}{\Gamma \vdash \mathsf{unpack}\ \langle \alpha, x\rangle = t_1\ \mathsf{in}\ t_2 : U}
$$

and the evaluation rule $\mathsf{unpack}\ \langle \alpha, x\rangle = (\mathsf{pack}\ \langle S, v\rangle\ \mathsf{as}\ T')\ \mathsf{in}\ t_2 \to t_2[\alpha := S][x := v]$.
:::

::: example A counter as an existential package {#ex-counter-pack}
Package a counter implemented with $\mathsf{Int}$ as a value of type $\mathit{Counter} = \exists \rho.\,\{\mathit{new}{:}\rho,\ \mathit{inc}{:}\rho\to\rho,\ \mathit{get}{:}\rho\to\mathsf{Int}\}$, use it, and show a client that the type system rejects.
::: solution
The package is $c = \mathsf{pack}\ \langle \mathsf{Int}, \{\mathit{new} = 0,\ \mathit{inc} = \lambda n{:}\mathsf{Int}.\,n + 1,\ \mathit{get} = \lambda n{:}\mathsf{Int}.\,n\}\rangle\ \mathsf{as}\ \mathit{Counter}$, well typed because the record has the body type with $\rho := \mathsf{Int}$. A client: $\mathsf{unpack}\ \langle \rho, m\rangle = c\ \mathsf{in}\ m.\mathit{get}\,(m.\mathit{inc}\,(m.\mathit{inc}\ m.\mathit{new}))$ has type $\mathsf{Int}$ (no $\rho$ in the result) and evaluates to $2$. The client $\mathsf{unpack}\ \langle \rho, m\rangle = c\ \mathsf{in}\ m.\mathit{inc}\ 5$ is rejected: inside the body $5 : \mathsf{Int}$ but $m.\mathit{inc}$ expects $\rho$, and $\rho$ is a fresh variable, not $\mathsf{Int}$. Also rejected is $\mathsf{unpack}\ \langle \rho, m\rangle = c\ \mathsf{in}\ m.\mathit{new}$, whose type $\rho$ would escape its scope. A second implementation, counting with negative numbers ($\mathit{new} = 0$, $\mathit{inc} = \lambda n.\,n - 1$, $\mathit{get} = \lambda n.\,-n$), is indistinguishable to every client.
:::
:::

`pack` hides the representation type $S$ (an implementation: counters as integers, say, with $\mathit{inc} = \lambda n.\,n + 1$); `unpack` lets a client use the operations under a fresh name $\alpha$ for the hidden type. The side condition $\alpha \notin \mathrm{FV}(U)$ prevents the abstract type from escaping its scope, and because the client is type-checked with $\alpha$ abstract, it cannot depend on the representation: **representation independence**, provable by parametricity — two implementations related by a suitable relation are indistinguishable to every client. Existentials can even be encoded in System F: $\exists \alpha.\,T$ is $\forall \beta.\,(\forall \alpha.\,T \to \beta) \to \beta$.

ML's module system builds on this idea with **signatures** (interfaces, including abstract type components), **structures** (implementations) and **functors** (functions from structures to structures, such as a balanced-tree dictionary parameterised by an ordered key type). An illustrative OCaml signature and structure:

```text
module type COUNTER = sig
  type t                        (* abstract: clients cannot see it is int *)
  val zero : t
  val inc : t -> t
  val get : t -> int
end
module Counter : COUNTER = struct
  type t = int
  let zero = 0
  let inc n = n + 1
  let get n = n
end
```

Outside, `Counter.inc 5` is a type error: `5 : int`, not `Counter.t`. Modules with type components go beyond simple existentials — the type `Counter.t` can be referred to by name across a program, which led to the theory of *translucent sums* and *manifest types* (Harper and Lillibridge, 1994; Leroy, 1994). Java's packages and access modifiers, Rust's modules with private fields and Python's leading-underscore convention achieve information hiding with weaker or no static guarantees.

::: history
Strachey's lecture notes *Fundamental Concepts in Programming Languages* (1967) named parametric and ad hoc polymorphism. Girard's thesis (1972) introduced System F to prove properties of second-order arithmetic; Reynolds, unaware of it, defined the polymorphic λ-calculus in "Towards a theory of type structure" (1974) and proved the abstraction theorem in "Types, abstraction and parametric polymorphism" (1983). CLU (Liskov et al., 1977) and Ada (1983) brought generic modules to practice. Cardelli's "A semantics of multiple inheritance" (1984, journal 1988) introduced record subtyping with the contravariant arrow rule, and Cardelli and Wegner's "On understanding types, data abstraction, and polymorphism" (1985) introduced bounded quantification. Barbara Liskov and Jeannette Wing formalised the substitution principle (1994). Mitchell and Plotkin (1988) identified abstract types with existentials; David MacQueen designed Standard ML's modules (1984). Wadler's "Theorems for free!" (1989) and Wells's undecidability proof (1994) completed the picture. Java added generics in 2004 (J2SE 5.0), C# in 2005, Go in 2022 (Go 1.18).
:::

## Where this leads

The ideas meet in real type checkers: Scala and OCaml combine parametric polymorphism, subtyping and modules; Haskell's type classes are ad hoc polymorphism made principled (Wadler and Blott, 1989); Rust's traits combine bounded polymorphism with existentials (`impl Trait`, `dyn Trait`). Dependent types (Coq, Agda, Lean) generalise $\forall$ to quantify over values as well as types. [[programming-languages/control]] adds exceptions and continuations to typed languages, and [[compilers]] shows how dictionaries of methods, type erasure and monomorphisation are implemented.

::: summary
- Polymorphism is **parametric** (uniform for all types), **ad hoc** (overloading) or **subtype** (inclusion).
- **System F** ([[#def-system-f]]) has $\forall$ anywhere and explicit type abstraction and application; it is safe ([[#thm-safety-f]]) and strongly normalising, but type inference for it is undecidable. Hindley–Milner is its rank-1 fragment.
- **Parametricity**: polymorphic code cannot inspect types, so types constrain behaviour — the only closed term of type $\forall \alpha.\,\alpha \to \alpha$ is the identity ([[#prop-only-id]]); run-time type tests and effects break this.
- **Subtyping** is connected to typing by **subsumption** ([[#def-subtyping]]); records have width, depth and permutation subtyping.
- Function types are **contravariant** in arguments and covariant in results ([[#prop-contra]]); mutable references are **invariant** ([[#prop-ref-invariant]]), which Java's covariant arrays patch with run-time checks.
- A syntax-directed **algorithmic** subtyping relation, without transitivity, is equivalent to the declarative one ([[#thm-algorithmic]]).
- **Existential types** model abstract data types and modules ([[#def-existential]]): clients are checked against an abstract type and cannot depend on the representation.
:::

## Exercises

::: exercise Type applications {level=1}
Compute the types: (a) $\mathit{id}\,[\mathsf{Nat} \to \mathsf{Nat}]$; (b) $(\Lambda \alpha.\,\Lambda \beta.\,\lambda x{:}\alpha.\,\lambda y{:}\beta.\,x)\,[\mathsf{Nat}]$; (c) $c_2\,[\mathsf{Bool}]$; and reduce $\mathit{id}\,[\mathsf{Nat}]\ 3$.
::: solution
(a) $(\mathsf{Nat}\to\mathsf{Nat}) \to (\mathsf{Nat}\to\mathsf{Nat})$. (b) $\forall \beta.\,\mathsf{Nat} \to \beta \to \mathsf{Nat}$ — only the outer quantifier is instantiated. (c) $(\mathsf{Bool}\to\mathsf{Bool})\to\mathsf{Bool}\to\mathsf{Bool}$. $\mathit{id}\,[\mathsf{Nat}]\ 3 \to (\lambda x{:}\mathsf{Nat}.\,x)\ 3 \to 3$ by E-TApp (with E-TAppTAbs) and then E-AppAbs.
:::
:::

::: exercise Subtyping by hand {level=1 check="3"}
With $\mathsf{Nat} <: \mathsf{Int}$, how many of these hold? (a) $\{a{:}\mathsf{Nat}, b{:}\mathsf{Bool}\} <: \{a{:}\mathsf{Int}\}$; (b) $\{a{:}\mathsf{Int}\} \to \mathsf{Nat} <: \{a{:}\mathsf{Int}, b{:}\mathsf{Bool}\} \to \mathsf{Int}$; (c) $\mathsf{Int} \to \mathsf{Int} <: \mathsf{Nat} \to \mathsf{Nat}$; (d) $\{f{:}\mathsf{Int}\to\mathsf{Nat}\} <: \{f{:}\mathsf{Nat}\to\mathsf{Int}\}$; (e) $\mathrm{Ref}\ \mathsf{Nat} <: \mathrm{Ref}\ \mathsf{Int}$. (Enter the number that hold.)
::: solution
(a) Yes: width drops $b$, depth $\mathsf{Nat} <: \mathsf{Int}$. (b) Yes: the domain needs $\{a, b\} <: \{a\}$ (width), the codomain $\mathsf{Nat} <: \mathsf{Int}$. (c) No: the codomain would need $\mathsf{Int} <: \mathsf{Nat}$. (d) Yes: depth subtyping with $\mathsf{Int}\to\mathsf{Nat} <: \mathsf{Nat}\to\mathsf{Int}$. (e) No: references are invariant. Three hold.
:::
:::

::: exercise Polymorphic booleans {level=1}
In System F, let $\mathsf{CBool} = \forall \alpha.\,\alpha \to \alpha \to \alpha$. Write $\mathsf{tru}$, $\mathsf{fls}$ and $\mathsf{not} : \mathsf{CBool} \to \mathsf{CBool}$, and use parametricity informally to argue that $\mathsf{CBool}$ has exactly two closed normal inhabitants.
::: solution
$\mathsf{tru} = \Lambda \alpha.\,\lambda t{:}\alpha.\,\lambda f{:}\alpha.\,t$, $\mathsf{fls} = \Lambda \alpha.\,\lambda t{:}\alpha.\,\lambda f{:}\alpha.\,f$, $\mathsf{not} = \lambda b{:}\mathsf{CBool}.\,\Lambda \alpha.\,\lambda t{:}\alpha.\,\lambda f{:}\alpha.\,b\,[\alpha]\ f\ t$. By the argument of [[#prop-only-id]], a closed normal form of type $\mathsf{CBool}$ is $\Lambda \alpha.\,\lambda t{:}\alpha.\,\lambda f{:}\alpha.\,u$ with $u : \alpha$ a neutral term over the variables $t, f : \alpha$, neither of which can be applied; so $u$ is $t$ or $f$. Exactly two inhabitants: the type *is* the booleans.
:::
:::

::: exercise A free theorem by hand {level=2}
Let $r : \forall \alpha.\,\mathrm{List}\ \alpha \to \mathrm{List}\ \alpha$ be implemented without run-time type tests or effects (examples: reverse, tail, take the first three). Argue that $\mathrm{map}\ g\,(r\ xs) = r\,(\mathrm{map}\ g\ xs)$ for all $g$ and $xs$, and give a Python function with this annotation for which the law fails.
::: solution
Since $r$ cannot inspect elements of the unknown type $\alpha$, its output can only consist of elements of its input, chosen and arranged according to the *shape* of the input (its length). $\mathrm{map}\ g$ changes the elements but not the shape, so choosing positions before or after applying $g$ yields the same list: both sides are $[g(x_{i_1}), \ldots, g(x_{i_k})]$ for the same index sequence determined by the length. Reynolds's abstraction theorem makes this precise using the relation "graph of $g$". A Python counterexample: `def r[T](xs: list[T]) -> list[T]: return [x for x in xs if not (isinstance(x, int) and x < 0)]`. With `g = lambda x: -x` and `xs = [1]`: `map(g, r([1])) = [-1]` but `r(map(g, [1])) = r([-1]) = []`. The run-time type test lets the "generic" function look at the elements.
:::
:::

::: exercise Covariant results, contravariant arguments {level=2}
A class `Animal` has a method `adopt(self, other: Animal) -> Animal`. A subclass `Dog` wants to override it. Which of these signatures keep `Dog` a behavioural subtype of `Animal` in the sense of [[#def-subtyping]]? (a) `adopt(self, other: Animal) -> Dog`; (b) `adopt(self, other: Dog) -> Animal`; (c) `adopt(self, other: object) -> Dog`; (d) `adopt(self, other: Dog) -> Dog`.
::: solution
The method type must be a subtype of $\mathit{Animal} \to \mathit{Animal}$: the parameter may be more general (contravariant) and the result more specific (covariant). (a) Yes — result $\mathit{Dog} <: \mathit{Animal}$. (b) No — parameter narrowed: code holding an `Animal` reference may pass a `Cat`. (c) Yes — both changes go in the safe direction. (d) No, for the same reason as (b). mypy reports (b) and (d) as incompatible overrides ("violates the Liskov substitution principle"); Java and C++ allow (a) but treat (b), (c) and (d) as overloads, not overrides.
:::
:::

::: exercise Transitivity, concretely {level=2}
Show a declarative derivation that $\{x{:}\mathsf{Nat}, y{:}\mathsf{Int}, z{:}\mathsf{Bool}\} <: \{y{:}\mathsf{Int}, x{:}\mathsf{Int}\}$ uses S-Trans, and show that the algorithm decides it in one record step.
::: solution
Declaratively: S-RcdWidth gives $\{x{:}\mathsf{Nat}, y{:}\mathsf{Int}, z{:}\mathsf{Bool}\} <: \{x{:}\mathsf{Nat}, y{:}\mathsf{Int}\}$; S-RcdDepth with $\mathsf{Nat} <: \mathsf{Int}$ and S-Refl gives $\{x{:}\mathsf{Nat}, y{:}\mathsf{Int}\} <: \{x{:}\mathsf{Int}, y{:}\mathsf{Int}\}$; S-RcdPerm gives $\{x{:}\mathsf{Int}, y{:}\mathsf{Int}\} <: \{y{:}\mathsf{Int}, x{:}\mathsf{Int}\}$; two uses of S-Trans chain them. Algorithmically: for each field of the target, $y$ and $x$, look it up in the source ($\mathsf{Int}$ and $\mathsf{Nat}$) and check $\mathsf{Int} <: \mathsf{Int}$ and $\mathsf{Nat} <: \mathsf{Int}$ — one case of the algorithm, no intermediate types guessed.
:::
:::

::: exercise Subtyping functions and records in Python {level=3}
Extend the subtype checker with **variant** (tagged union) types $\langle l_1{:}T_1, \ldots, l_n{:}T_n\rangle$, whose values carry one of the labels. Derive the subtyping rule from the substitution principle, implement it, and test that $\langle \mathit{circle}{:}\mathsf{Int}\rangle <: \langle \mathit{circle}{:}\mathsf{Int}, \mathit{square}{:}\mathsf{Int}\rangle$ but not conversely.
::: solution
A value of a variant type is one labelled alternative, and a consumer must handle every label of the type it expects. A variant with *fewer* alternatives can be used where one with more is expected, since the consumer handles a superset of the labels that can occur: width subtyping goes the opposite way from records. Depth is covariant (a $\mathsf{Nat}$ payload can be read as an $\mathsf{Int}$). Rule: $\langle k_j{:}S_j\rangle_j <: \langle l_i{:}T_i\rangle_i$ if every $k_j$ is some $l_i$ with $S_j <: T_i$.

```python
@dataclass(frozen=True)
class Variant: alts: tuple                     # ((label, type), ...)
# a new case in subtype:
        case Variant(ss), Variant(ts):
            d = dict(ts)
            return all(l in d and subtype(S, d[l]) for l, S in ss)
```

With `C = Variant((("circle", Int),))` and `CS = Variant((("circle", Int), ("square", Int)))`, `subtype(C, CS)` is `True` and `subtype(CS, C)` is `False`. Records and variants are dual: records are products (a consumer may use any field, so a producer must supply at least those), variants are sums (a producer chooses a label, so the consumer must handle at least those).
:::
:::

::: exercise Encoding existentials {level=3}
Show that $\exists \alpha.\,T$ can be encoded in System F as $\forall \beta.\,(\forall \alpha.\,T \to \beta) \to \beta$: give the encodings of $\mathsf{pack}$ and $\mathsf{unpack}$ and check that the encoded $\mathsf{unpack}$ of an encoded $\mathsf{pack}$ reduces as the evaluation rule of [[#def-existential]] requires.
::: solution
Encode $\mathsf{pack}\ \langle S, t\rangle\ \mathsf{as}\ \exists\alpha.\,T$ as $\Lambda \beta.\,\lambda k{:}(\forall \alpha.\,T \to \beta).\,k\,[S]\ t$. It has type $\forall \beta.\,(\forall \alpha.\,T \to \beta) \to \beta$: $k\,[S] : T[\alpha := S] \to \beta$ and $t : T[\alpha := S]$. Encode $\mathsf{unpack}\ \langle \alpha, x\rangle = t_1\ \mathsf{in}\ t_2$ (of type $U$) as $t_1\,[U]\ (\Lambda \alpha.\,\lambda x{:}T.\,t_2)$; the continuation has type $\forall \alpha.\,T \to U$, which is well formed because $\alpha \notin \mathrm{FV}(U)$ — the side condition of the unpack rule appears naturally. Reduction: $(\Lambda \beta.\,\lambda k.\,k\,[S]\ v)\,[U]\ (\Lambda \alpha.\,\lambda x{:}T.\,t_2) \to (\lambda k.\,k\,[S]\ v)\,(\Lambda\alpha.\,\lambda x.\,t_2) \to (\Lambda\alpha.\,\lambda x{:}T.\,t_2)\,[S]\ v \to (\lambda x{:}T[\alpha:=S].\,t_2[\alpha := S])\ v \to t_2[\alpha := S][x := v]$, as required. The client $t_2$ is checked once, with $\alpha$ abstract, and then run with the hidden $S$: abstraction is parametric polymorphism seen from the other side.
:::
:::
