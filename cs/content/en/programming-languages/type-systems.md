In [[programming-languages/syntax-semantics]] we generated all $59\,439$ terms of the little language NB up to depth $3$ and found that $45\,369$ of them — three in four — get **stuck**: evaluation reaches a term such as $\mathsf{succ}\ \mathsf{true}$ to which no rule applies, the formal model of a run-time type error. A real implementation would crash, raise an exception, or, in an unsafe language, compute garbage. We would like to know, *before* running a program, that this cannot happen.

A **type system** is a syntactic method for proving the absence of certain behaviours by classifying phrases according to the kinds of values they compute (the definition is Pierce's). It assigns types to terms by rules that look only at the program text, never run it, and it is designed so that a theorem can be proved: *well-typed programs do not get stuck*. This chapter develops that theorem twice, first for NB with the types $\mathsf{Bool}$ and $\mathsf{Nat}$, then for the **simply typed λ-calculus**, the core of every typed functional language. The method of proof — **progress** plus **preservation** — is the standard one for every language whose safety has been proved, from Standard ML to WebAssembly and the safe fragment of Rust. Along the way we implement both type checkers in Python, look at what type systems cannot do, and meet the surprising correspondence between types and logical propositions.

## Typing the language NB

Types classify values: NB has booleans and numbers, so it has two types.

::: definition Typing relation for NB {#def-typing-nb}
The **types** of NB are $T ::= \mathsf{Bool} \mid \mathsf{Nat}$. The **typing relation** $t : T$ ("$t$ has type $T$") is the smallest relation closed under the rules

$$
\begin{gathered}
\frac{}{\mathsf{true} : \mathsf{Bool}}\ \text{(T-True)}
\qquad
\frac{}{\mathsf{false} : \mathsf{Bool}}\ \text{(T-False)}
\qquad
\frac{t_1 : \mathsf{Bool} \quad t_2 : T \quad t_3 : T}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 : T}\ \text{(T-If)}
\\[1.2em]
\frac{}{\mathsf{0} : \mathsf{Nat}}\ \text{(T-Zero)}
\qquad
\frac{t_1 : \mathsf{Nat}}{\mathsf{succ}\ t_1 : \mathsf{Nat}}\ \text{(T-Succ)}
\qquad
\frac{t_1 : \mathsf{Nat}}{\mathsf{pred}\ t_1 : \mathsf{Nat}}\ \text{(T-Pred)}
\qquad
\frac{t_1 : \mathsf{Nat}}{\mathsf{iszero}\ t_1 : \mathsf{Bool}}\ \text{(T-IsZero)}
\end{gathered}
$$

A term is **well typed** (or **typable**) if $t : T$ for some $T$.
:::

The rule T-If is where the type system takes a position: both branches must have the *same* type, because the checker cannot know which branch will run. So $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{false}$ is rejected, although it evaluates to $\mathsf{0}$ without trouble. Every static type system rejects some harmless programs; by Rice's theorem it must, if it is decidable and rules out all stuck programs ([[program-design/types-interfaces#prop-no-perfect-checker]]).

A type checker reads the rules backwards. For each form of term exactly one rule could have been used last, so checking is a structural recursion that computes the type:

```python
class TypeError_(Exception): pass
BOOL, NAT = "Bool", "Nat"

def typeof(t):
    match t:
        case Tru() | Fls(): return BOOL
        case Zero(): return NAT
        case Succ(u) | Pred(u):
            if typeof(u) != NAT: raise TypeError_(f"argument of {type(t).__name__} is not Nat")
            return NAT
        case IsZero(u):
            if typeof(u) != NAT: raise TypeError_("argument of iszero is not Nat")
            return BOOL
        case If(c, a, b):
            if typeof(c) != BOOL: raise TypeError_("guard of if is not Bool")
            ta, tb = typeof(a), typeof(b)
            if ta != tb: raise TypeError_(f"branches have types {ta} and {tb}")
            return ta
```

That reading-backwards is justified by a lemma used in every proof below.

::: lemma Inversion of the typing relation {#lem-inversion-nb}
1. If $\mathsf{true} : R$ or $\mathsf{false} : R$, then $R = \mathsf{Bool}$.
2. If $\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 : R$, then $t_1 : \mathsf{Bool}$, $t_2 : R$ and $t_3 : R$.
3. If $\mathsf{0} : R$, then $R = \mathsf{Nat}$.
4. If $\mathsf{succ}\ t_1 : R$ or $\mathsf{pred}\ t_1 : R$, then $R = \mathsf{Nat}$ and $t_1 : \mathsf{Nat}$.
5. If $\mathsf{iszero}\ t_1 : R$, then $R = \mathsf{Bool}$ and $t_1 : \mathsf{Nat}$.
:::

::: proof
Each conclusion of a typing rule has a different syntactic form of term, so a derivation of $t : R$ must end with the unique rule for the form of $t$, and its premises are as stated. (For example, the only rule whose conclusion is an $\mathsf{if}$ is T-If.)
:::

::: theorem Uniqueness of types {#thm-unique-nb}
Every NB term has at most one type, and if it has one, its typing derivation is unique.
:::

::: proof
By structural induction on $t$, using [[#lem-inversion-nb]]: the last rule is determined by the form of $t$, and so are the premises' terms; by the induction hypothesis their types and derivations are unique, and the rule then determines the type of $t$ (for T-If, the common type of the branches).
:::

::: example A typing derivation {#ex-derivation-nb}
Derive the type of $\mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{then}\ \mathsf{succ}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0}$, and show that $\mathsf{iszero}\,(\mathsf{if}\ \mathsf{false}\ \mathsf{then}\ \mathsf{true}\ \mathsf{else}\ \mathsf{0})$ has no type.
::: solution
$$
\cfrac{\cfrac{\cfrac{\cfrac{}{\mathsf{0} : \mathsf{Nat}}}{\mathsf{pred}\ \mathsf{0} : \mathsf{Nat}}}{\mathsf{iszero}\,(\mathsf{pred}\ \mathsf{0}) : \mathsf{Bool}} \qquad \cfrac{\cfrac{}{\mathsf{0} : \mathsf{Nat}}}{\mathsf{succ}\ \mathsf{0} : \mathsf{Nat}} \qquad \cfrac{}{\mathsf{0} : \mathsf{Nat}}}{\mathsf{if}\ \mathsf{iszero}\,(\mathsf{pred}\ \mathsf{0})\ \mathsf{then}\ \mathsf{succ}\ \mathsf{0}\ \mathsf{else}\ \mathsf{0} : \mathsf{Nat}}
$$

The rules used, from the leaves: T-Zero, T-Pred, T-IsZero; T-Zero, T-Succ; T-Zero; and T-If at the root. For the second term, suppose it had a type. By inversion (part 5) the argument of $\mathsf{iszero}$ would have type $\mathsf{Nat}$; by part 2 both branches of that $\mathsf{if}$ would have type $\mathsf{Nat}$; but by part 1, $\mathsf{true}$ has only the type $\mathsf{Bool}$. Contradiction. The term is ill-typed even though it evaluates to $\mathsf{false}$: the type checker does not know that the guard is $\mathsf{false}$.
:::
:::

### Safety: progress and preservation

The safety theorem has two halves. **Progress**: a well-typed term is not stuck — either it is a value or it can take a step. **Preservation**: if a well-typed term takes a step, the result is well typed (with the same type). Together they say that a well-typed term can never reach a stuck state, however many steps it takes, because each step lands on another well-typed term, which by progress is not stuck. First we need to know what values of each type look like.

::: lemma Canonical forms for NB {#lem-canonical-nb}
If $v$ is a value and $v : \mathsf{Bool}$, then $v$ is $\mathsf{true}$ or $\mathsf{false}$. If $v$ is a value and $v : \mathsf{Nat}$, then $v$ is a numeric value $nv$.
:::

::: proof
Values are $\mathsf{true}$, $\mathsf{false}$ and the numeric values $\mathsf{0}$, $\mathsf{succ}\ nv$ ([[programming-languages/syntax-semantics#def-values]]). By inversion, $\mathsf{0}$ and $\mathsf{succ}\ nv$ have only the type $\mathsf{Nat}$, and $\mathsf{true}$ and $\mathsf{false}$ only the type $\mathsf{Bool}$.
:::

::: theorem Progress for NB {#thm-progress-nb}
If $t : T$, then either $t$ is a value or there is some $t'$ with $t \to t'$.
:::

::: proof
By induction on the derivation of $t : T$. The cases T-True, T-False and T-Zero are immediate: $t$ is a value.

*T-If:* $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$ with $t_1 : \mathsf{Bool}$. By the induction hypothesis, $t_1$ is a value or steps. If it is a value, by [[#lem-canonical-nb]] it is $\mathsf{true}$ or $\mathsf{false}$, and E-IfTrue or E-IfFalse applies to $t$. If $t_1 \to t_1'$, then E-If gives $t \to \mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$.

*T-Succ:* $t = \mathsf{succ}\ t_1$ with $t_1 : \mathsf{Nat}$. If $t_1$ is a value, it is a numeric value $nv$ by canonical forms, and then $t = \mathsf{succ}\ nv$ is itself a value. Otherwise $t_1 \to t_1'$ and E-Succ applies.

*T-Pred:* $t = \mathsf{pred}\ t_1$ with $t_1 : \mathsf{Nat}$. If $t_1$ is a value, it is $\mathsf{0}$ or $\mathsf{succ}\ nv$ by canonical forms, and E-PredZero or E-PredSucc applies. Otherwise E-Pred applies.

*T-IsZero:* the same as T-Pred, with E-IsZeroZero, E-IsZeroSucc and E-IsZero.
:::

::: theorem Preservation for NB {#thm-preservation-nb}
If $t : T$ and $t \to t'$, then $t' : T$.
:::

::: proof
By induction on the derivation of $t : T$, examining in each case the rule used for the step.

*T-True, T-False, T-Zero:* $t$ is a value and cannot step ([[programming-languages/syntax-semantics#lem-values-normal]]), so the case is vacuous.

*T-If:* $t = \mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3$, with $t_1 : \mathsf{Bool}$, $t_2 : T$, $t_3 : T$. Three evaluation rules have an $\mathsf{if}$ on the left. E-IfTrue: $t' = t_2$, which has type $T$ by assumption; E-IfFalse is symmetric. E-If: $t_1 \to t_1'$, and by the induction hypothesis applied to the sub-derivation of $t_1 : \mathsf{Bool}$, $t_1' : \mathsf{Bool}$; then T-If gives $\mathsf{if}\ t_1'\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 : T$.

*T-Succ:* $t = \mathsf{succ}\ t_1$, $T = \mathsf{Nat}$, $t_1 : \mathsf{Nat}$. The only step is E-Succ, $t_1 \to t_1'$; by the induction hypothesis $t_1' : \mathsf{Nat}$, and T-Succ gives $t' : \mathsf{Nat}$.

*T-Pred:* $t = \mathsf{pred}\ t_1$, $T = \mathsf{Nat}$. E-PredZero: $t' = \mathsf{0} : \mathsf{Nat}$. E-PredSucc: $t_1 = \mathsf{succ}\ nv_1$ and $t' = nv_1$; by inversion of $\mathsf{succ}\ nv_1 : \mathsf{Nat}$, $nv_1 : \mathsf{Nat}$. E-Pred: by the induction hypothesis and T-Pred.

*T-IsZero:* $T = \mathsf{Bool}$. E-IsZeroZero and E-IsZeroSucc give $\mathsf{true}$ or $\mathsf{false}$, of type $\mathsf{Bool}$; E-IsZero is handled by the induction hypothesis and T-IsZero.
:::

::: corollary Safety for NB {#cor-safety-nb}
If $t : T$ and $t \to^* t'$ where $t'$ is in normal form, then $t'$ is a value of type $T$. In particular, a well-typed NB term never gets stuck, and a term of type $\mathsf{Bool}$ evaluates to $\mathsf{true}$ or $\mathsf{false}$.
:::

::: proof
By induction on the number of steps, preservation gives $t' : T$. By progress, $t'$ is a value or steps; it is a normal form, so it is a value. Canonical forms give the last statement.
:::

::: example Testing the theorems {#ex-brute-typed}
Check progress and preservation on every NB term of depth at most $3$, and count the well-typed terms and the ill-typed terms that nevertheless evaluate to a value.
::: solution
```python
ts = terms(2)                                   # the 59439 terms of depth <= 3
typed = [t for t in ts if well_typed(t)]
steps = 0
for t in typed:
    T = typeof(t)
    for u in trace(t):
        assert typeof(u) == T                   # preservation
        if not is_value(u):
            step(u)                             # progress: raises NoRule if stuck
            steps += 1
print(len(ts), "terms,", len(typed), "well typed; checked", steps, "steps")
ok = [t for t in ts if not well_typed(t) and is_value(list(trace(t))[-1])]
print(len(ok), "ill-typed terms evaluate to a value anyway")
```

```console
59439 terms, 1624 well typed; checked 4193 steps
12446 ill-typed terms evaluate to a value anyway
```

No assertion fails and `step` never raises. Only $1624$ of the terms (under $3\%$) are well typed, and their evaluations take $4193$ steps in all, each checked. Of the $14\,070$ terms that evaluate to a value, $12\,446$ are rejected — for example $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{true}\ \mathsf{else}\ \mathsf{0}$. That is the price of a decidable, conservative checker. (A count of the well-typed terms by hand is an exercise.)
:::
:::

## The simply typed λ-calculus

Now add functions. The untyped λ-calculus has terms such as $\lambda x.\,x\ x$ for which no sensible type exists, and terms such as $\mathsf{succ}\,(\lambda x.\,x)$ that get stuck. The **simply typed λ-calculus** (STLC) adds a type annotation to each binder and a type constructor for functions.

::: definition Simply typed λ-calculus {#def-stlc}
Types and terms are

$$
T ::= \mathsf{Bool} \mid \mathsf{Nat} \mid T \to T
\qquad\qquad
t ::= x \mid \lambda x{:}T.\,t \mid t\ t \mid \mathsf{true} \mid \mathsf{false} \mid \mathsf{if}\ t\ \mathsf{then}\ t\ \mathsf{else}\ t \mid \mathsf{0} \mid \mathsf{succ}\ t \mid \mathsf{pred}\ t \mid \mathsf{iszero}\ t.
$$

The arrow associates to the right: $\mathsf{Nat} \to \mathsf{Nat} \to \mathsf{Nat}$ is $\mathsf{Nat} \to (\mathsf{Nat} \to \mathsf{Nat})$, the type of a curried two-argument function. Values are $v ::= \lambda x{:}T.\,t \mid \mathsf{true} \mid \mathsf{false} \mid nv$. Evaluation is call-by-value:

$$
\frac{t_1 \to t_1'}{t_1\ t_2 \to t_1'\ t_2}\ \text{(E-App1)}
\qquad
\frac{t_2 \to t_2'}{v_1\ t_2 \to v_1\ t_2'}\ \text{(E-App2)}
\qquad
\frac{}{(\lambda x{:}T.\,t)\ v \to t[x := v]}\ \text{(E-AppAbs)}
$$

together with the rules of NB. A **typing context** $\Gamma$ is a finite sequence of distinct variables with types, $x_1{:}T_1, \ldots, x_n{:}T_n$; we write $\Gamma, x{:}T$ for its extension (renaming $x$ first if needed) and $x{:}T \in \Gamma$ for membership. The **typing judgement** $\Gamma \vdash t : T$ is defined by the NB rules (with $\Gamma \vdash$ in front of every judgement) and

$$
\frac{x{:}T \in \Gamma}{\Gamma \vdash x : T}\ \text{(T-Var)}
\qquad
\frac{\Gamma, x{:}T_1 \vdash t : T_2}{\Gamma \vdash \lambda x{:}T_1.\,t : T_1 \to T_2}\ \text{(T-Abs)}
\qquad
\frac{\Gamma \vdash t_1 : T_{11} \to T_{12} \quad \Gamma \vdash t_2 : T_{11}}{\Gamma \vdash t_1\ t_2 : T_{12}}\ \text{(T-App)}
$$
:::

The context records the assumptions about free variables. T-Abs says: to show the function has type $T_1 \to T_2$, assume its parameter has type $T_1$ and show the body has type $T_2$. T-App says: a function of type $T_{11} \to T_{12}$ may be applied only to an argument of type $T_{11}$. The annotation on the binder is what makes checking a simple recursion — the checker never has to guess the type of a parameter. ([[programming-languages/type-inference]] removes the annotations and infers them.)

```python
@dataclass(frozen=True)
class TBool: pass
@dataclass(frozen=True)
class TNat: pass
@dataclass(frozen=True)
class Arrow: dom: object; cod: object

def typeof(t, ctx):
    """The type of t in context ctx (a dict from names to types)."""
    match t:
        case Var(x):                                            # T-Var
            if x not in ctx: raise TypeError_(f"unbound variable {x}")
            return ctx[x]
        case Lam(x, T1, body):                                  # T-Abs
            return Arrow(T1, typeof(body, {**ctx, x: T1}))
        case App(f, a):                                         # T-App
            Tf, Ta = typeof(f, ctx), typeof(a, ctx)
            if not isinstance(Tf, Arrow):
                raise TypeError_(f"applying a non-function of type {show_ty(Tf)}")
            if Tf.dom != Ta:
                raise TypeError_(f"argument has type {show_ty(Ta)}, expected {show_ty(Tf.dom)}")
            return Tf.cod
        # ... Const, Op and If as for NB
```

Types are compared with `!=`, structural equality of the frozen data classes, so two arrow types are equal exactly when their domains and codomains are.

::: example Checking and running a typed program {#ex-twice}
Type-check $\mathit{twice} = \lambda f{:}\mathsf{Nat} \to \mathsf{Nat}.\,\lambda x{:}\mathsf{Nat}.\,f\,(f\ x)$ and the program $\mathit{twice}\ (\lambda n{:}\mathsf{Nat}.\,\mathsf{succ}\ n)\ \mathsf{0}$; evaluate the program, checking the type after every step; and try four ill-typed terms.
::: solution
By hand: in the context $\Gamma = f{:}\mathsf{Nat}\to\mathsf{Nat},\ x{:}\mathsf{Nat}$, T-Var gives $f\ x : \mathsf{Nat}$ by T-App, and then $f\,(f\ x) : \mathsf{Nat}$; two uses of T-Abs give $\mathit{twice} : (\mathsf{Nat}\to\mathsf{Nat}) \to \mathsf{Nat} \to \mathsf{Nat}$. The program applies it to a $\mathsf{Nat}\to\mathsf{Nat}$ and a $\mathsf{Nat}$, so it has type $\mathsf{Nat}$.

```python
N = TNat()
twice = Lam("f", Arrow(N, N), Lam("x", N, App(Var("f"), App(Var("f"), Var("x")))))
succ_f = Lam("n", N, Op("succ", Var("n")))
prog = App(App(twice, succ_f), Const(0))
print(show_ty(typeof(twice, {})), "|", show_ty(typeof(prog, {})))
t, T, n = prog, typeof(prog, {}), 0
while not is_value(t):
    t = step(t); n += 1
    assert typeof(t, {}) == T                 # preservation, at every step
print(t, "after", n, "steps")
for bad in [App(Const(0), Const(True)), App(succ_f, Const(True)),
            Lam("x", N, App(Var("x"), Var("x"))), If(Const(True), Const(0), Const(False))]:
    try: typeof(bad, {})
    except TypeError_ as e: print("rejected:", e)
```

```console
(Nat -> Nat) -> Nat -> Nat | Nat
Op(op='succ', arg=Op(op='succ', arg=Const(value=0))) after 4 steps
rejected: applying a non-function of type Nat
rejected: argument has type Bool, expected Nat
rejected: applying a non-function of type Nat
rejected: branches: Nat vs Bool
```

The four steps are: substitute $\mathit{succ\_f}$ for $f$; substitute $\mathsf{0}$ for $x$, giving $\mathit{succ\_f}\,(\mathit{succ\_f}\ \mathsf{0})$; evaluate the inner call to $\mathsf{succ}\ \mathsf{0}$ (E-App2 with E-AppAbs); and the outer call, giving the value $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$. The third rejected term is self-application, $\lambda x{:}\mathsf{Nat}.\,x\ x$: with $x : \mathsf{Nat}$ it is not a function. No annotation would help, as we prove below.
:::
:::

::: widget graph
nodes: root@2,3; app1@1,2; zero@3,2; tw@0.5,1; sf@1.5,1; absx@0.5,0; succn@1.5,0; ffx@0.5,-1
edges: root>app1; root>zero; app1>tw; app1>sf; tw>absx; absx>ffx; sf>succn
algorithm: dfs
start: root
caption: The shape of the typing derivation for $\mathit{twice}\ \mathit{succ\_f}\ \mathsf{0} : \mathsf{Nat}$ — one vertex per rule instance (the leaves of $f\,(f\ x)$ and of $\mathsf{succ}\ n$ are collapsed into `ffx` and `succn`). `root` and `app1` are T-App, `zero` is T-Zero, `tw`, `absx` and `sf` are T-Abs. The tree has the same shape as the term's syntax tree, because each term form has exactly one typing rule — which is why the checker is a single structural recursion. Step through depth-first search to see the order in which `typeof` visits the sub-terms.
:::

### Safety for the simply typed λ-calculus

The structure of the proof is the same as for NB. Inversion and canonical forms extend in the obvious way: if $\Gamma \vdash \lambda x{:}T_1.\,t : R$ then $R = T_1 \to R_2$ with $\Gamma, x{:}T_1 \vdash t : R_2$; if $\Gamma \vdash t_1\ t_2 : R$ then $\Gamma \vdash t_1 : T_{11} \to R$ and $\Gamma \vdash t_2 : T_{11}$ for some $T_{11}$; if $\Gamma \vdash x : R$ then $x{:}R \in \Gamma$. And **canonical forms**: a value of type $T_1 \to T_2$ is an abstraction $\lambda x{:}T_1.\,t$ (because $\mathsf{true}$, $\mathsf{false}$ and numeric values have base types). Uniqueness of types also extends (an exercise).

::: theorem Progress for STLC {#thm-progress}
If $\varnothing \vdash t : T$ (so $t$ is closed), then either $t$ is a value or $t \to t'$ for some $t'$.
:::

::: proof
By induction on the derivation of $\varnothing \vdash t : T$. T-Var cannot occur: the context is empty. T-Abs: $t$ is a value. The NB rules are handled exactly as in [[#thm-progress-nb]]. T-App: $t = t_1\ t_2$ with $\varnothing \vdash t_1 : T_{11} \to T_{12}$ and $\varnothing \vdash t_2 : T_{11}$. By the induction hypothesis, $t_1$ is a value or steps, and likewise $t_2$. If $t_1 \to t_1'$, E-App1 applies. If $t_1$ is a value and $t_2 \to t_2'$, E-App2 applies. If both are values, canonical forms say $t_1 = \lambda x{:}T_{11}.\,t_{12}$, and E-AppAbs applies.
:::

Progress is stated for *closed* terms: an open term such as $x\ \mathsf{0}$ is a normal form but not a value, and that is fine because a running program is closed. Preservation needs two structural lemmas about contexts and one about substitution — the heart of the proof.

::: lemma Permutation and weakening {#lem-weakening}
If $\Gamma \vdash t : T$ and $\Delta$ is a permutation of $\Gamma$, then $\Delta \vdash t : T$. If $\Gamma \vdash t : T$ and $x \notin \mathrm{dom}\,\Gamma$, then $\Gamma, x{:}S \vdash t : T$, with a derivation of the same depth.
:::

::: proof
Both by induction on typing derivations. T-Var uses only membership $x{:}T \in \Gamma$, which is unaffected by reordering or by adding a different variable. T-Abs extends the context by its bound variable, which we may rename (by α-equivalence) to be distinct from $x$; the induction hypothesis applies to the premise. The other rules pass the context unchanged to their premises.
:::

::: lemma Substitution preserves types {#lem-substitution}
If $\Gamma, x{:}S \vdash t : T$ and $\Gamma \vdash s : S$, then $\Gamma \vdash t[x := s] : T$.
:::

::: proof
By induction on the derivation of $\Gamma, x{:}S \vdash t : T$, by cases on its last rule.

*T-Var, $t = z$.* If $z = x$, then $T = S$ and $t[x := s] = s$, which has type $S$ by assumption. If $z \ne x$, then $t[x := s] = z$, and $z{:}T \in \Gamma$, so T-Var gives $\Gamma \vdash z : T$.

*T-Abs, $t = \lambda y{:}T_2.\,t_1$, $T = T_2 \to T_1$, with $\Gamma, x{:}S, y{:}T_2 \vdash t_1 : T_1$.* By α-conversion we may assume $y \ne x$ and $y \notin \mathrm{FV}(s)$, so $t[x := s] = \lambda y{:}T_2.\,t_1[x := s]$. By permutation, $\Gamma, y{:}T_2, x{:}S \vdash t_1 : T_1$; by weakening, $\Gamma, y{:}T_2 \vdash s : S$. The induction hypothesis (applied with context $\Gamma, y{:}T_2$) gives $\Gamma, y{:}T_2 \vdash t_1[x := s] : T_1$, and T-Abs gives $\Gamma \vdash \lambda y{:}T_2.\,t_1[x := s] : T_2 \to T_1$.

*T-App, $t = t_1\ t_2$.* The premises are $\Gamma, x{:}S \vdash t_1 : T_{11} \to T$ and $\Gamma, x{:}S \vdash t_2 : T_{11}$. By the induction hypothesis, $\Gamma \vdash t_1[x := s] : T_{11} \to T$ and $\Gamma \vdash t_2[x := s] : T_{11}$, and T-App gives $\Gamma \vdash (t_1\ t_2)[x := s] : T$.

*NB rules.* Constants are unchanged by substitution and keep their types; for the others, apply the induction hypothesis to each premise and reapply the rule.
:::

::: theorem Preservation for STLC {#thm-preservation}
If $\Gamma \vdash t : T$ and $t \to t'$, then $\Gamma \vdash t' : T$.
:::

::: proof
By induction on the derivation of $\Gamma \vdash t : T$. T-Var and T-Abs: $t$ is a variable or a value, which does not step. The NB rules: as in [[#thm-preservation-nb]], with contexts carried along. T-App: $t = t_1\ t_2$, $\Gamma \vdash t_1 : T_{11} \to T$, $\Gamma \vdash t_2 : T_{11}$. Three rules can make the step.

- E-App1, $t_1 \to t_1'$: by the induction hypothesis $\Gamma \vdash t_1' : T_{11} \to T$, and T-App gives $\Gamma \vdash t_1'\ t_2 : T$.
- E-App2, $t_1$ a value and $t_2 \to t_2'$: symmetric.
- E-AppAbs: $t_1 = \lambda x{:}T_{11}.\,t_{12}$, $t_2 = v_2$ and $t' = t_{12}[x := v_2]$. By inversion of T-Abs, $\Gamma, x{:}T_{11} \vdash t_{12} : T$. Since $\Gamma \vdash v_2 : T_{11}$, [[#lem-substitution]] gives $\Gamma \vdash t_{12}[x := v_2] : T$.
:::

::: corollary Type safety {#cor-safety}
If $\varnothing \vdash t : T$ and $t \to^* t'$, then $t'$ is not stuck: it is a value of type $T$, or it can take a further step.
:::

::: proof
By preservation and induction on the length of the reduction, $\varnothing \vdash t' : T$; by progress, $t'$ is a value or steps; canonical forms identify the value's shape.
:::

This is Milner's slogan, "well-typed programs cannot go wrong", made precise. The precision matters: "go wrong" means *reach a stuck term*, a state for which the semantics has no rule. What counts as stuck depends on the semantics, which is why it is part of the language definition.

::: warning What "type safe" does not promise
Type safety rules out exactly the stuck states of the semantics and nothing else. A well-typed Python, Java or OCaml program can still divide by zero, take the head of an empty list, index outside an array, run out of memory or loop for ever. Languages make these *defined* behaviour — the semantics has a rule that raises an exception — so that they are not stuck, and the safety theorem then says that an exception is the only way a well-typed program can fail. Unsafe languages leave such states undefined: in C, reading past the end of an array is not an error the semantics handles but behaviour it does not define, which is why C cannot have a safety theorem in this sense. Note also that safety is a property of the *combination* of type system and semantics: change either and the theorem must be re-proved.
:::

::: quiz
Suppose we add to STLC a constant $\mathsf{head} : \mathsf{List} \to \mathsf{Nat}$ with evaluation rule $\mathsf{head}\,(\mathsf{cons}\ v\ l) \to v$ and nothing for $\mathsf{head}\ \mathsf{nil}$. Which statements are true?
- [x] Progress fails: $\mathsf{head}\ \mathsf{nil}$ is well typed and stuck.
- [ ] Preservation fails.
- [x] Adding a rule $\mathsf{head}\ \mathsf{nil} \to \mathsf{error}$, with $\mathsf{error}$ treated as a final result, restores safety in the sense of [[#cor-safety]], read as "a value, a step or $\mathsf{error}$".
- [ ] The only fix is to remove $\mathsf{head}$ from the language.
::: solution
$\mathsf{head}\ \mathsf{nil}$ has type $\mathsf{Nat}$ but no rule applies, and it is not a value: progress fails. The one rule that exists maps a well-typed $\mathsf{head}\,(\mathsf{cons}\ v\ l)$ to $v : \mathsf{Nat}$, so preservation holds. Two fixes are standard: make the failure a defined outcome (an exception, as in OCaml and Haskell's `head`), weakening the guarantee; or refine the types so that $\mathsf{head}$ accepts only non-empty lists (dependent types, or an `Option` result as in Rust's `first()`).
:::
:::

## What simple types cannot express

### No self-application, and termination

::: theorem Self-application is untypable {#thm-no-self-app}
There is no context $\Gamma$ and type $T$ such that $\Gamma \vdash x\ x : T$. Consequently $\omega = \lambda x{:}S.\,x\ x$ is untypable for every annotation $S$, and so are $\Omega$ and the fixed-point combinators $Y$ and $Z$ of [[programming-languages/lambda-calculus]].
:::

::: proof
Suppose $\Gamma \vdash x\ x : T$. By inversion of T-App, $\Gamma \vdash x : T_{11} \to T$ and $\Gamma \vdash x : T_{11}$ for some $T_{11}$. By inversion of T-Var, both types are the type $\Gamma$ assigns to $x$, so $T_{11} = T_{11} \to T$. But a type is a finite tree, and $T_{11} \to T$ has strictly more nodes than $T_{11}$; no finite type equals a type containing it as a proper part. Any term containing $x\ x$ as a sub-term, where $x$ is a variable, is untypable for the same reason, since every sub-term of a well-typed term is well typed (by inversion).
:::

So the typed calculus has lost general recursion. In fact it has lost non-termination altogether.

::: theorem Strong normalisation (Tait, 1967) {#thm-sn}
If $\Gamma \vdash t : T$ in the simply typed λ-calculus, then every β-reduction sequence starting from $t$ is finite.
:::

The proof does not go by induction on derivations directly — the induction hypothesis is too weak, because substitution can make terms larger. Tait's method defines, by induction on types, a stronger property ("reducibility": a term of type $T_1 \to T_2$ is reducible if applying it to any reducible argument gives a reducible result) and proves that every well-typed term has it; see Pierce, *TAPL*, chapter 12. A consequence is that the simply typed λ-calculus is *not* Turing-complete: a total, always-terminating language cannot express its own interpreter (by the diagonal argument of [[theory-of-computation/decidability]]).

Real languages restore recursion with a typed fixed-point construct, $\mathsf{fix}$ (ML's `let rec`), whose rule $\Gamma \vdash t : T \to T \Rightarrow \Gamma \vdash \mathsf{fix}\ t : T$ is added by hand. Safety survives (an exercise checks the new cases); termination does not, since $\mathsf{fix}\,(\lambda x{:}\mathsf{Nat}.\,x)$ has type $\mathsf{Nat}$ and loops. Total languages such as Agda and Coq keep termination by allowing only recursion that a checker can prove terminating.

### Types as propositions

Read the type $A \to B$ as the logical implication "$A$ implies $B$". T-App is then the rule *modus ponens*: from $A \to B$ and $A$, conclude $B$. T-Abs is the deduction rule: if assuming $A$ lets you prove $B$, then $A \to B$ holds. A closed term of type $T$ is a *proof* of the proposition $T$. This is the **Curry–Howard correspondence**: propositions are types, proofs are programs, and simplifying a proof (removing a detour) is β-reduction.

For example, with type variables $A, B, C$ standing for arbitrary propositions, $\lambda f{:}A\to B.\,\lambda g{:}B\to C.\,\lambda x{:}A.\,g\,(f\ x)$ — function composition — has type $(A \to B) \to (B \to C) \to (A \to C)$: it is a proof that implication is transitive. $\lambda x{:}A.\,\lambda y{:}B.\,x$ proves $A \to B \to A$.

::: example Proofs as programs {#ex-curry-howard}
Find closed terms proving (a) $(A \to B \to C) \to (B \to A \to C)$ and (b) $(A \to A \to B) \to A \to B$, and explain why no closed term has type $A \to B$.
::: solution
(a) We must turn a two-argument function into one taking its arguments in the other order: $\lambda f{:}A\to B\to C.\,\lambda y{:}B.\,\lambda x{:}A.\,f\ x\ y$. Checking: in the context $f{:}A\to B\to C,\ y{:}B,\ x{:}A$, T-App twice gives $f\ x : B \to C$ and $f\ x\ y : C$, and three uses of T-Abs give the stated type. Logically: from "$A$ and then $B$ imply $C$" infer "$B$ and then $A$ imply $C$".

(b) $\lambda f{:}A\to A\to B.\,\lambda x{:}A.\,f\ x\ x$ — the proof uses the hypothesis $A$ twice, which is allowed in this logic (it is the *contraction* rule; linear type systems, which forbid using a variable twice, correspond to a logic without it).

(c) Suppose $\varnothing \vdash t : A \to B$ with $A, B$ distinct atomic types. Since types are sound for classical truth tables, $A \to B$ would be a tautology; but the valuation $A$ true, $B$ false makes it false. So no proof exists — and indeed a program that turns an arbitrary $A$ into an arbitrary $B$ cannot be written without cheating (looping or raising an exception, which pure STLC cannot do).
:::
:::

The logic obtained this way is **intuitionistic** (constructive), not classical: every provable formula is a classical tautology (by induction on derivations, since modus ponens and the deduction rule preserve truth under every valuation), but some tautologies have no proof.

::: widget truthtable
formula: ((p -> q) -> p) -> p
compare: p | ~p
caption: Peirce's law $((p \to q) \to p) \to p$ is true in every row of its truth table, so it is a classical tautology — as is the law of excluded middle $p \lor \neg p$, which the figure shows to be equivalent to it here (both columns are all true). Yet there is no closed simply typed λ-term of type $((A \to B) \to A) \to A$ for type variables $A, B$: a program would have to produce a value of the unknown type $A$ from a function that needs an $A \to B$ to give one. Intuitionistic logic, and therefore pure typed programming, lacks this law; [[programming-languages/control]] shows that adding the control operator `call/cc` supplies exactly it. Try $(p -> q) -> ((q -> r) -> (p -> r))$: a tautology that *does* have a proof, the composition function.
:::

Curry–Howard is the foundation of proof assistants such as Coq (now Rocq), Agda and Lean, in which mathematical theorems are proved by writing programs whose types are the theorems, and the type checker verifies the proof.

## Static and dynamic typing revisited

The type checkers of this chapter are **sound** in the sense of [[#cor-safety]], and **conservative**: they reject some programs that would never get stuck. Dynamically typed languages make the opposite trade: every program runs, and the checks of [[programming-languages/interpreters]] (`prim` testing that its operands are integers) catch type errors when they happen. The two approaches can be related precisely: a dynamically typed language is a statically typed one with a single type `Dyn` of tagged values, in which every operation checks the tag. Static types then pay off in three ways beyond safety — they document interfaces, they let a compiler drop tag checks and choose efficient representations, and they guide refactoring — at the cost of rejecting some programs and of annotation effort, which type inference ([[programming-languages/type-inference]]) reduces. **Gradual typing** (Siek and Taha, 2006), on which Python's annotations, TypeScript and Typed Racket draw, mixes the two in one program, inserting run-time checks at the boundaries between typed and untyped code.

Notice, finally, that the evaluation rules of STLC never look at types: the annotation in $\lambda x{:}T.\,t$ is ignored by E-AppAbs. Types can therefore be **erased** before running: if $\mathrm{erase}(t)$ removes all annotations, then $t \to t'$ implies $\mathrm{erase}(t) \to \mathrm{erase}(t')$ in the untyped calculus, and conversely (by induction on the step, since every rule commutes with erasure). This is how ML, Haskell and Java generics are implemented ([[program-design/types-interfaces]]): types cost nothing at run time.

::: history
Bertrand Russell introduced types in 1908 to avoid the paradoxes of naive set theory, and Alonzo Church's "A formulation of the simple theory of types" (1940) gave the simply typed λ-calculus. Haskell Curry noticed the correspondence between combinator types and axioms of implicational logic in 1934 (Curry and Feys, 1958); William Howard's manuscript "The formulae-as-types notion of construction" (1969, published 1980) extended it to natural deduction. William Tait proved strong normalisation in "Intensional interpretations of functionals of finite type I" (1967). Robin Milner's "A theory of type polymorphism in programming" (1978) proved for ML that "well-typed expressions do not go wrong", using a denotational semantics. Andrew Wright and Matthias Felleisen's "A syntactic approach to type soundness" (1994) introduced the method of this chapter — subject reduction (preservation) plus progress on a small-step semantics — which made safety proofs routine; Robert Harper's *Practical Foundations for Programming Languages* (2012, 2nd ed. 2016) and Benjamin Pierce's *Types and Programming Languages* (2002) present the whole field this way.
:::

## Where this leads

Simple types force annotations on every binder and give each function one type; [[programming-languages/type-inference]] reconstructs the annotations automatically, and [[programming-languages/polymorphism]] lets one function have many types (System F, subtyping, modules). Exceptions, references and continuations each need new typing rules and new cases in the safety proof ([[programming-languages/control]]). Typed intermediate languages carry these guarantees through compilation ([[compilers]]), and type systems for security — information flow, linear and ownership types — prevent leaks and memory errors by the same progress-and-preservation method ([[security]]).

::: summary
- A **type system** assigns types to terms by syntax-directed rules ([[#def-typing-nb]], [[#def-stlc]]); a type checker is a structural recursion justified by **inversion** ([[#lem-inversion-nb]]).
- **Canonical forms** say what values of each type look like ([[#lem-canonical-nb]]); **progress**: a closed well-typed term is a value or steps ([[#thm-progress]]); **preservation**: steps preserve types ([[#thm-preservation]]), resting on the **substitution lemma** ([[#lem-substitution]]).
- Together they give **type safety**: well-typed programs never get stuck ([[#cor-safety]]) — but run-time errors defined by the semantics, such as exceptions and non-termination, remain possible.
- Type systems are **conservative**: they reject some programs that would run correctly.
- Simple types rule out self-application ([[#thm-no-self-app]]) and every typed term terminates ([[#thm-sn]]); recursion is added back with a typed $\mathsf{fix}$.
- **Curry–Howard**: types are propositions and closed terms are proofs, in intuitionistic logic (no Peirce's law).
- Types can be **erased** before execution: in STLC they never affect evaluation.
:::

## Exercises

::: exercise Typing by hand {level=1}
Give the type of each term, or explain why it has none: (a) $\lambda x{:}\mathsf{Bool}.\,\lambda y{:}\mathsf{Nat}.\,\mathsf{if}\ x\ \mathsf{then}\ y\ \mathsf{else}\ \mathsf{succ}\ y$; (b) $\lambda f{:}\mathsf{Nat}\to\mathsf{Bool}.\,f\,(f\ \mathsf{0})$; (c) $\lambda f{:}\mathsf{Bool}\to\mathsf{Bool}.\,\lambda x{:}\mathsf{Bool}.\,f\,(f\ x)$; (d) $(\lambda x{:}\mathsf{Nat}.\,x)\ \mathsf{true}$.
::: solution
(a) $\mathsf{Bool} \to \mathsf{Nat} \to \mathsf{Nat}$: the guard is $\mathsf{Bool}$ and both branches $\mathsf{Nat}$. (b) Untypable: $f\ \mathsf{0} : \mathsf{Bool}$, but $f$ needs a $\mathsf{Nat}$. (c) $(\mathsf{Bool}\to\mathsf{Bool}) \to \mathsf{Bool} \to \mathsf{Bool}$, the boolean version of $\mathit{twice}$. (d) Untypable: the argument is $\mathsf{Bool}$, the parameter $\mathsf{Nat}$.
:::
:::

::: exercise Counting steps {level=1 check="2"}
Evaluate $(\lambda x{:}\mathsf{Nat}.\,\mathsf{succ}\,(\mathsf{succ}\ x))\,(\mathsf{pred}\,(\mathsf{succ}\ \mathsf{0}))$ by call-by-value, giving the type of each intermediate term. (Enter the number of steps.)
::: solution
The argument is not a value, so E-App2 with E-PredSucc: $(\lambda x{:}\mathsf{Nat}.\,\mathsf{succ}\,(\mathsf{succ}\ x))\ \mathsf{0}$. Then E-AppAbs: $\mathsf{succ}\,(\mathsf{succ}\ \mathsf{0})$, a value. Two steps; every term has type $\mathsf{Nat}$, as preservation promises.
:::
:::

::: exercise A safe but surprising program {level=1}
Give an NB term that evaluates to a value but is rejected by the type checker, and one that is well typed and evaluates to $\mathsf{false}$ although it contains the sub-term $\mathsf{pred}\ \mathsf{0}$, which "looks like an error".
::: solution
$\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{false}$ evaluates to $\mathsf{0}$, but T-If requires both branches to have the same type. $\mathsf{iszero}\,(\mathsf{succ}\,(\mathsf{pred}\ \mathsf{0}))$ is well typed ($\mathsf{Bool}$) and evaluates to $\mathsf{false}$; $\mathsf{pred}\ \mathsf{0} \to \mathsf{0}$ is defined behaviour in NB, not a type error, so the type system has nothing to say about it.
:::
:::

::: exercise Counting well-typed terms {level=2 check="1624"}
Let $b_k$ and $n_k$ be the numbers of NB terms of depth at most $k$ with types $\mathsf{Bool}$ and $\mathsf{Nat}$. Find recurrences and compute $b_3 + n_3$, the number of well-typed terms in [[#ex-brute-typed]]. (Enter $b_3 + n_3$.)
::: solution
A $\mathsf{Bool}$ term of depth at most $k + 1$ is $\mathsf{true}$, $\mathsf{false}$, $\mathsf{iszero}$ of a $\mathsf{Nat}$ term of depth at most $k$, or an $\mathsf{if}$ with a $\mathsf{Bool}$ guard and two $\mathsf{Bool}$ branches: $b_{k+1} = 2 + n_k + b_k^3$. A $\mathsf{Nat}$ term is $\mathsf{0}$, $\mathsf{succ}$ or $\mathsf{pred}$ of a $\mathsf{Nat}$ term, or an $\mathsf{if}$ with a $\mathsf{Bool}$ guard and two $\mathsf{Nat}$ branches: $n_{k+1} = 1 + 2n_k + b_k n_k^2$. By uniqueness of types the two sets are disjoint and the counts add. With $b_1 = 2$, $n_1 = 1$: $b_2 = 2 + 1 + 8 = 11$, $n_2 = 1 + 2 + 2 = 5$; $b_3 = 2 + 5 + 1331 = 1338$, $n_3 = 1 + 10 + 11 \cdot 25 = 286$. Total $1624$, matching the program.
:::
:::

::: exercise Breaking the safety proof {level=2}
For each modification of NB, say whether progress and preservation still hold, giving a counterexample where they fail. (a) Add the typing rule $\dfrac{t_1 : \mathsf{Bool} \quad t_2 : T}{\mathsf{if}\ t_1\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 : T}$ (no condition on $t_3$). (b) Add the axiom $\mathsf{pred}\ \mathsf{true} : \mathsf{Nat}$. (c) Add the evaluation rule $\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ t_2\ \mathsf{else}\ t_3 \to t_3$.
::: solution
(a) Progress still holds — the proof never used the premise about $t_3$. Preservation fails: $\mathsf{if}\ \mathsf{false}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{true} : \mathsf{Nat}$ by the new rule, but it steps to $\mathsf{true}$, which has no type $\mathsf{Nat}$. (b) Preservation holds vacuously for the new term ($\mathsf{pred}\ \mathsf{true}$ cannot step). Progress fails: it is well typed and stuck. (c) Preservation still holds (both branches have type $T$), but evaluation is no longer deterministic, and the language computes different answers ($\mathsf{if}\ \mathsf{true}\ \mathsf{then}\ \mathsf{0}\ \mathsf{else}\ \mathsf{succ}\ \mathsf{0}$ can give $\mathsf{0}$ or $\mathsf{succ}\ \mathsf{0}$). Safety only promises not getting stuck, not computing the intended result.
:::
:::

::: exercise Uniqueness of types for STLC {level=2}
Prove that if $\Gamma \vdash t : T$ and $\Gamma \vdash t : T'$ then $T = T'$. Would this still hold if binders were not annotated (if $\lambda x.\,t$ could be given any type $T_1 \to T_2$ for which the body checks)?
::: solution
By induction on $t$. T-Var: both types are the one $\Gamma$ assigns to $x$ (variables in $\Gamma$ are distinct). T-Abs: $t = \lambda x{:}T_1.\,t_2$; by inversion $T = T_1 \to T_2$ and $T' = T_1 \to T_2'$ with $\Gamma, x{:}T_1 \vdash t_2 : T_2$ and $: T_2'$; by the induction hypothesis $T_2 = T_2'$. The annotation $T_1$ fixes the domain. T-App: $t = t_1\ t_2$ with $t_1 : T_{11} \to T$ and $t_1 : T_{11}' \to T'$; by the induction hypothesis these arrow types are equal, so $T = T'$. NB rules: as in [[#thm-unique-nb]]. Without annotations uniqueness fails: $\lambda x.\,x$ would have type $\mathsf{Nat} \to \mathsf{Nat}$ and $\mathsf{Bool} \to \mathsf{Bool}$. That is the starting point of [[programming-languages/type-inference]], which finds a single *most general* type, $\alpha \to \alpha$.
:::
:::

::: exercise Product types {level=3}
Extend STLC with pairs: types $T_1 \times T_2$, terms $(t_1, t_2)$, $t.1$, $t.2$, values $(v_1, v_2)$. Give typing and evaluation rules, state the new canonical-forms case, and give the new cases of the progress and preservation proofs.
::: solution
Typing: $\dfrac{\Gamma \vdash t_1 : T_1 \quad \Gamma \vdash t_2 : T_2}{\Gamma \vdash (t_1, t_2) : T_1 \times T_2}$, and $\dfrac{\Gamma \vdash t : T_1 \times T_2}{\Gamma \vdash t.i : T_i}$ for $i = 1, 2$. Evaluation: $(v_1, v_2).i \to v_i$; congruence $t \to t' \Rightarrow t.i \to t'.i$; $t_1 \to t_1' \Rightarrow (t_1, t_2) \to (t_1', t_2)$; $t_2 \to t_2' \Rightarrow (v_1, t_2) \to (v_1, t_2')$ (left to right). Canonical forms: a value of type $T_1 \times T_2$ is a pair $(v_1, v_2)$.

Progress. Pair: by the induction hypothesis on $t_1$ and $t_2$, either $t_1$ steps (first congruence), or $t_1$ is a value and $t_2$ steps (second), or both are values and the pair is a value. Projection $t.i$: either $t$ steps (congruence), or $t$ is a value of type $T_1 \times T_2$, hence $(v_1, v_2)$ by canonical forms, and $(v_1, v_2).i \to v_i$.

Preservation. Congruence steps: induction hypothesis and the same typing rule. The projection step $(v_1, v_2).i \to v_i$: by inversion of the pair rule, $v_i : T_i$, which is the type of $t.i$. The substitution lemma needs only the routine new cases (substitute into components).
:::
:::

::: exercise Adding fix {level=3}
Add $\mathsf{fix}\ t$ to STLC with typing rule $\dfrac{\Gamma \vdash t : T \to T}{\Gamma \vdash \mathsf{fix}\ t : T}$ and evaluation rules $\mathsf{fix}\,(\lambda x{:}T.\,t) \to t[x := \mathsf{fix}\,(\lambda x{:}T.\,t)]$ and $t \to t' \Rightarrow \mathsf{fix}\ t \to \mathsf{fix}\ t'$. Prove the new cases of progress and preservation. Then implement it in the Python checker and evaluator and compute $2 + 3$ with $\mathit{plus} = \mathsf{fix}\,(\lambda p{:}\mathsf{Nat}\to\mathsf{Nat}\to\mathsf{Nat}.\,\lambda m{:}\mathsf{Nat}.\,\lambda n{:}\mathsf{Nat}.\,\mathsf{if}\ \mathsf{iszero}\ m\ \mathsf{then}\ n\ \mathsf{else}\ \mathsf{succ}\,(p\,(\mathsf{pred}\ m)\ n))$.
::: solution
*Progress:* if $\varnothing \vdash \mathsf{fix}\ t : T$ then $\varnothing \vdash t : T \to T$; by the induction hypothesis $t$ steps (congruence applies) or is a value of arrow type, hence an abstraction by canonical forms, and the unfolding rule applies. *Preservation:* the congruence case is the induction hypothesis. For the unfolding, inversion gives $\Gamma, x{:}T \vdash t : T$, and $\Gamma \vdash \mathsf{fix}\,(\lambda x{:}T.\,t) : T$ (the original term), so the substitution lemma gives $\Gamma \vdash t[x := \mathsf{fix}\,(\lambda x{:}T.\,t)] : T$.

```python
@dataclass(frozen=True)
class Fix: fun: object
# in typeof:
        case Fix(g):
            T = typeof(g, ctx)
            if not (isinstance(T, Arrow) and T.dom == T.cod):
                raise TypeError_("fix expects a function of type T -> T")
            return T.dom
# in step:
        case Fix(Lam(f, _, b) as lam): return subst(b, f, Fix(lam))
        case Fix(g):
            g2 = step(g); return None if g2 is None else Fix(g2)
# (and a Fix case in subst)
```

```console
Nat -> Nat -> Nat | Nat
Op(op='succ', arg=Op(op='succ', arg=Op(op='succ', arg=Op(op='succ', arg=Op(op='succ', arg=Const(value=0)))))) 17
```

$\mathit{plus}$ has type $\mathsf{Nat}\to\mathsf{Nat}\to\mathsf{Nat}$, and $\mathit{plus}\ 2\ 3$ evaluates to $5$ in $17$ steps, the type being checked after each step. Strong normalisation is lost: $\mathsf{fix}\,(\lambda x{:}\mathsf{Nat}.\,x) \to \mathsf{fix}\,(\lambda x{:}\mathsf{Nat}.\,x)$ for ever — well typed, not stuck, never a value. Safety allows that.
:::
:::
