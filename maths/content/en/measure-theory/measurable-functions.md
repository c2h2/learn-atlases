Riemann's integral slices the *domain* of a function into small intervals and adds up (height × width). Lebesgue's integral slices the *range*: for each small band of values $[y, y + h)$ it asks how large is the set of points where $f$ takes values in that band, and adds up (value × size of that set). Lebesgue himself compared the two methods to two ways of counting a pile of coins: adding them up in the order in which they come to hand, or first sorting them by denomination and then counting how many there are of each.

The second method only makes sense if the sets $\set{x : y \le f(x) < y + h}$ can be measured. The functions for which this is true are the **measurable functions**, the subject of this chapter. They play the same role for measure spaces that continuous functions play for metric spaces — compare "preimages of open sets are open" ([[real-analysis/metric-spaces#thm-continuity-open]]) with "preimages of Borel sets are measurable" below — with one great difference: measurability survives pointwise limits. We also meet the **simple functions**, which take finitely many values and will be the building blocks of the integral, and two theorems of Egorov and Lusin which say that measurable functions and their limits are *nearly* as good as continuous functions and uniform limits.

## Measurable functions

Throughout, $(X, \mathcal{A})$ is a measurable space ([[measure-theory/sigma-algebras#def-sigma-algebra]]). Because suprema and limits of real functions can be infinite, we allow the values $\pm\infty$ and work with the **extended real line** $[-\infty, \infty]$. We write $\set{f > a}$ for $\set{x \in X : f(x) > a}$.

::: definition Measurable function {#def-measurable-function}
A function $f\colon X \to [-\infty, \infty]$ is **measurable** (with respect to $\mathcal{A}$) if

$$
\set{f > a} \in \mathcal{A} \qquad\text{for every } a \in \R.
$$

When $X = \R$ and $\mathcal{A}$ is the Lebesgue σ-algebra $\mathcal{L}$ we say **Lebesgue measurable**; when $\mathcal{A} = \mathcal{B}(\R)$, **Borel measurable**.
:::

::: theorem Equivalent forms of measurability {#thm-measurable-equiv}
For $f\colon X \to [-\infty, \infty]$ the following are equivalent:

1. $\set{f > a} \in \mathcal{A}$ for all $a \in \R$;
2. $\set{f \ge a} \in \mathcal{A}$ for all $a \in \R$;
3. $\set{f < a} \in \mathcal{A}$ for all $a \in \R$;
4. $\set{f \le a} \in \mathcal{A}$ for all $a \in \R$.

If $f$ is real-valued, they are also equivalent to: $f^{-1}(B) \in \mathcal{A}$ for every Borel set $B \subseteq \R$.
:::

::: proof
The four conditions are linked by countable operations:

$$
\set{f \ge a} = \bigcap_{n=1}^\infty\set{f > a - \tfrac1n}, \quad \set{f < a} = \set{f\ge a}^c, \quad \set{f \le a} = \bigcap_{n=1}^\infty\set{f < a + \tfrac1n}, \quad \set{f > a} = \set{f \le a}^c.
$$

So (1) ⇒ (2) ⇒ (3) ⇒ (4) ⇒ (1), because σ-algebras are closed under complements and countable intersections.

For real-valued $f$, preimages of Borel sets include the sets $f^{-1}((a, \infty)) = \set{f > a}$, so the last condition implies (1). Conversely assume (1), and let $\mathcal{G} = \set{B \subseteq \R : f^{-1}(B) \in \mathcal{A}}$. Since $f^{-1}(B^c) = f^{-1}(B)^c$ and $f^{-1}\bigl(\bigcup B_n\bigr) = \bigcup f^{-1}(B_n)$, the family $\mathcal{G}$ is a σ-algebra; by (1) it contains every half-line $(a, \infty)$. These generate $\mathcal{B}(\R)$ ([[measure-theory/sigma-algebras#thm-borel-generators]]), so $\mathcal{B}(\R) \subseteq \mathcal{G}$.
:::

The last part is the good sets principle again, and it is the reason measurability is a robust notion: although the definition only mentions half-lines, a measurable function pulls back *every* Borel set to a measurable set. Also, $\set{f = \infty} = \bigcap_n\set{f > n}$ and $\set{f = -\infty} = \bigcap_n\set{f < -n}$ are measurable.

::: example Measurable and non-measurable functions {#ex-measurable}
(a) Show that the indicator function $\mathbf{1}_E$ is measurable if and only if $E \in \mathcal{A}$. (b) Show that every continuous $f\colon \R\to\R$ and every monotone $f\colon \R \to \R$ is Borel measurable. (c) Is Dirichlet's function $\mathbf{1}_{\Q}$ Borel measurable?
::: solution
(a) $\set{\mathbf{1}_E > a}$ is $X$ if $a < 0$, $E$ if $0 \le a < 1$, and $\varnothing$ if $a \ge 1$. So all these sets are measurable exactly when $E$ is. In particular, if $V$ is Vitali's non-measurable set ([[measure-theory/lebesgue-measure#thm-vitali]]), $\mathbf{1}_V$ is not Lebesgue measurable.

(b) For continuous $f$, $\set{f > a}$ is the preimage of the open set $(a, \infty)$, which is open ([[real-analysis/metric-spaces#thm-continuity-open]]), hence Borel. For increasing $f$, if $x \in \set{f > a}$ and $y > x$ then $f(y) \ge f(x) > a$; so $\set{f > a}$ is an interval of the form $(c, \infty)$ or $[c, \infty)$ (or $\varnothing$ or $\R$), which is Borel. Decreasing functions are handled the same way.

(c) Yes: $\Q$ is a countable union of closed singletons, so it is Borel, and by (a) $\mathbf{1}_\Q$ is Borel measurable — although it is continuous nowhere and not Riemann integrable. Measurability is a far weaker requirement than continuity.
:::
:::

Composition needs a little care. If $f\colon X \to \R$ is measurable and $g\colon \R\to\R$ is Borel measurable — for instance continuous — then $g\circ f$ is measurable, because $(g\circ f)^{-1}(B) = f^{-1}\bigl(g^{-1}(B)\bigr)$ and $g^{-1}(B)$ is Borel. So $\abs{f}$, $f^2$, $e^f$, $\sin f$ and $\abs f^p$ are measurable whenever $f$ is. But if $g$ is merely *Lebesgue* measurable, $g^{-1}(B)$ need not be Borel, and $g\circ f$ can fail to be Lebesgue measurable even when $f$ is continuous ([[#ex-cantor-function]]).

::: theorem Algebraic operations {#thm-measurable-algebra}
Let $f, g\colon X \to \R$ be measurable and $c \in \R$. Then $cf$, $f + g$, $fg$, $\max(f, g)$, $\min(f, g)$, the **positive part** $f^+ = \max(f, 0)$, the **negative part** $f^- = \max(-f, 0)$ and $\abs f$ are measurable, and so is $1/f$ if $f$ never vanishes.
:::

::: proof
$\set{cf > a}$ is $\set{f > a/c}$ for $c > 0$, $\set{f < a/c}$ for $c < 0$, and $X$ or $\varnothing$ for $c = 0$.

*Sums.* If $f(x) + g(x) > a$, then $f(x) > a - g(x)$, and by the density of $\Q$ there is a rational $q$ with $a - g(x) < q < f(x)$, so that $f(x) > q$ and $g(x) > a - q$. Conversely these two inequalities give $f(x) + g(x) > a$. Hence

$$
\set{f + g > a} = \bigcup_{q\in\Q}\bigl(\set{f > q}\cap\set{g > a - q}\bigr),
$$

a countable union of measurable sets.

*Products.* $f^2$ is measurable: $\set{f^2 > a} = X$ for $a < 0$, and $= \set{f > \sqrt a}\cup\set{f < -\sqrt a}$ for $a \ge 0$. Then $fg = \frac14\bigl((f + g)^2 - (f - g)^2\bigr)$ is measurable by the previous steps.

*Maxima and minima.* $\set{\max(f,g) > a} = \set{f > a}\cup\set{g > a}$ and $\set{\min(f, g) > a} = \set{f > a}\cap\set{g > a}$. Then $f^+ = \max(f, 0)$, $f^- = \max(-f, 0)$ and $\abs f = f^+ + f^-$ are measurable (constants are measurable).

*Reciprocals.* For $a > 0$, $\set{1/f > a} = \set{0 < f < 1/a}$; for $a = 0$ it is $\set{f > 0}$; for $a < 0$ it is $\set{f > 0}\cup\set{f < 1/a}$. All are measurable.
:::

The decomposition $f = f^+ - f^-$, $\abs{f} = f^+ + f^-$, with $f^\pm \ge 0$, will let us define the integral for non-negative functions first and then extend it.

## Limits of measurable functions

Here measurable functions outshine both continuous and Riemann integrable functions: the class is closed under every countable limiting process.

::: theorem Limits of measurable functions {#thm-measurable-limits}
Let $f_n\colon X\to[-\infty, \infty]$ be measurable for each $n \in \N$. Then the functions

$$
\sup_n f_n, \qquad \inf_n f_n, \qquad \limsup_{n\to\infty}f_n, \qquad \liminf_{n\to\infty}f_n
$$

(defined pointwise) are measurable. In particular, if $f_n(x) \to f(x)$ for every $x$, then $f$ is measurable.
:::

::: proof
For every $a$, $\sup_n f_n(x) > a$ if and only if $f_n(x) > a$ for some $n$, so

$$
\Bigl\{\sup_n f_n > a\Bigr\} = \bigcup_{n=1}^\infty\set{f_n > a} \in \mathcal{A}.
$$

Similarly $\set{\inf_n f_n < a} = \bigcup_n\set{f_n < a}$, so $\inf_n f_n$ is measurable by [[#thm-measurable-equiv]]. Then $\limsup_n f_n = \inf_{k}\bigl(\sup_{n\ge k}f_n\bigr)$ and $\liminf_n f_n = \sup_k\bigl(\inf_{n\ge k}f_n\bigr)$ are measurable by two applications of what we have just proved. If $f_n \to f$ pointwise, then $f = \limsup_n f_n$.
:::

::: example Countability matters {#ex-uncountable-sup}
For each $t \in \R$ the function $\mathbf{1}_{\set{t}}$ is Borel measurable. Show that a supremum of *uncountably* many of them can fail to be Lebesgue measurable.
::: solution
Let $V$ be Vitali's non-measurable set ([[measure-theory/lebesgue-measure#thm-vitali]]). For every $x$, $\sup_{t\in V}\mathbf{1}_{\set{t}}(x)$ is $1$ if $x \in V$ and $0$ otherwise, so the supremum is $\mathbf{1}_V$, which is not measurable. The proof of [[#thm-measurable-limits]] writes $\set{\sup_n f_n > a}$ as a union of the sets $\set{f_n > a}$; for an uncountable family that union is no longer a countable operation, and σ-algebras are only closed under countable ones.
:::
:::

Compare: a pointwise limit of continuous functions need not be continuous ($x^n$ on $[0, 1]$, [[real-analysis/uniform-convergence#ex-failures]]), and a pointwise limit of Riemann integrable functions need not be Riemann integrable (Dirichlet's function). A pointwise limit of measurable functions is always measurable. This single fact is why the Lebesgue integral copes with limits so much better than the Riemann integral.

::: quiz
Which of these functions on $\R$ are Lebesgue measurable? Select all that apply.
- [x] $\mathbf{1}_\Q$, the indicator of the rationals
- [x] $f(x) = \sup_{n\in\N}\sin(nx)$
- [ ] $\mathbf{1}_V$, where $V$ is Vitali's non-measurable set
- [x] the pointwise limit of a sequence of continuous functions
::: solution
$\Q$ is Borel, so $\mathbf{1}_\Q$ is measurable. Each $\sin(nx)$ is continuous, hence measurable, so their supremum is measurable by [[#thm-measurable-limits]], as is any pointwise limit of continuous functions. $\mathbf{1}_V$ is measurable only if $V$ is, which it is not ([[#ex-measurable]](a)).
:::
:::

## Simple functions

::: definition Simple function {#def-simple}
A **simple function** is a measurable function $\varphi\colon X\to\R$ that takes only finitely many values. If its distinct values are $c_1, \dots, c_m$ and $E_k = \set{\varphi = c_k}$, then the sets $E_k$ are measurable, pairwise disjoint, cover $X$, and

$$
\varphi = \sum_{k=1}^m c_k\,\mathbf{1}_{E_k}.
$$ {#eq-canonical}

This is the **canonical representation** of $\varphi$.
:::

::: example A canonical representation {#ex-canonical}
Write $\varphi = 2\cdot\mathbf{1}_{[0, 2]} + 3\cdot\mathbf{1}_{[1, 3]}$ in canonical form.
::: solution
Find the value of $\varphi$ on each piece of the partition generated by $[0, 2]$ and $[1, 3]$: on $[0, 1)$ only the first indicator is $1$, so $\varphi = 2$; on $[1, 2]$ both are, so $\varphi = 5$; on $(2, 3]$ only the second is, so $\varphi = 3$; elsewhere $\varphi = 0$. Hence

$$
\varphi = 2\cdot\mathbf{1}_{[0,1)} + 5\cdot\mathbf{1}_{[1, 2]} + 3\cdot\mathbf{1}_{(2, 3]} + 0\cdot\mathbf{1}_{\R\setminus[0,3]}.
$$

The sets are disjoint, each value occurs on exactly one of them, and they cover $\R$. In the next chapter the integral of $\varphi$ will be $2\cdot1 + 5\cdot1 + 3\cdot1 = 10$ — the same as $2\lambda([0,2]) + 3\lambda([1,3])$ computed from the original representation, as it must be.
:::
:::

Any finite combination $\sum_{j=1}^n a_j\mathbf{1}_{A_j}$ with $A_j \in \mathcal{A}$ is simple (it is measurable by [[#thm-measurable-algebra]] and takes at most $2^n$ values), but such a representation is far from unique — $\mathbf{1}_{[0,2]} = \mathbf{1}_{[0,1)} + \mathbf{1}_{[1,2]}$ — which is why the canonical one is useful. Step functions are simple functions whose sets $E_k$ are intervals; general simple functions may use any measurable sets, such as $\Q$ or the Cantor set. Sums, products, maxima and minima of simple functions are simple. The key fact is that every non-negative measurable function can be approximated from below by simple functions, by slicing its *range*.

::: theorem Simple approximation theorem {#thm-simple-approx}
Let $f\colon X\to[0, \infty]$ be measurable, and for $n \in \N$ define

$$
\varphi_n = \min\Bigl(n,\ \frac{\lfloor 2^n f\rfloor}{2^n}\Bigr) \qquad (\text{with } \varphi_n = n \text{ where } f = \infty).
$$ {#eq-phi-n}

Then each $\varphi_n$ is simple, $0 \le \varphi_1 \le \varphi_2 \le \cdots \le f$, and $\varphi_n(x) \to f(x)$ for every $x$. On any set where $f$ is bounded, the convergence is uniform.
:::

::: proof
*Simple.* $\varphi_n$ takes only the values $k/2^n$ with $0 \le k \le n2^n$: it equals $k/2^n$ on $\set{k2^{-n} \le f < (k+1)2^{-n}}$ for $k < n2^n$, and $n$ on $\set{f \ge n}$. These sets are measurable by [[#thm-measurable-equiv]].

*Below $f$ and increasing.* $\lfloor t\rfloor \le t$ gives $\varphi_n \le f$. For any real $y$, $\lfloor 2y\rfloor \ge 2\lfloor y\rfloor$, so $\frac{\lfloor 2^{n+1}t\rfloor}{2^{n+1}} \ge \frac{\lfloor 2^nt\rfloor}{2^n}$; and $n + 1 > n$. A minimum of two larger quantities is larger, so $\varphi_{n+1} \ge \varphi_n$.

*Convergence.* If $f(x) = \infty$, then $\varphi_n(x) = n \to \infty$. If $f(x) < \infty$, then for every $n > f(x)$ the minimum is attained by the second term, and $0 \le f(x) - \varphi_n(x) < 2^{-n}$. If $f \le M$ on a set $S$, the same bound holds for all $x \in S$ once $n > M$, which is uniform convergence on $S$.
:::

For a real-valued measurable $f$, applying the theorem to $f^+$ and $f^-$ gives simple functions $\psi_n = \varphi_n^+ - \varphi_n^-$ with $\psi_n \to f$ pointwise and $\abs{\psi_n} \le \abs{f}$.

::: widget plot
f: min(n, floor(2^n*x^2)/2^n); x^2
x: 0, 2.2
y: 0, 4.5
sliders: n=1:1:6:1
labels: \varphi_n; f(x) = x^2
caption: The simple functions $\varphi_n = \min(n, 2^{-n}\lfloor 2^nf\rfloor)$ for $f(x) = x^2$. The range is cut into horizontal bands of height $2^{-n}$, and on the set where $f$ lies in a band, $\varphi_n$ takes the bottom value of the band. Increase $n$: the bands halve, the cap $n$ rises, and the staircase climbs up to the graph from below, uniformly wherever $f$ is bounded. The steps are sets of the form $\set{a \le f < b}$ — for a wild $f$ they need not be intervals at all.
:::

::: intuition Domain versus range
For a continuous $f$ on $[a, b]$, Riemann's vertical strips and Lebesgue's horizontal bands give the same answer. The difference shows with wild functions. Dirichlet's function has only two values: Lebesgue's method sorts the points into the set $\Q$ where $f = 1$ and the set $\R\setminus\Q$ where $f = 0$, and since $\lambda(\Q\cap[0,1]) = 0$ the integral will be $1\cdot0 + 0\cdot1 = 0$. Riemann's method fails because every vertical strip, however thin, contains points of both kinds.
:::

## Almost everywhere

From now on let $(X, \mathcal{A}, \mu)$ be a measure space. Integrals will not distinguish functions that differ only on a null set, so we need the language of [[measure-theory/sigma-algebras#def-null]].

::: definition Equality and convergence almost everywhere {#def-ae}
Functions $f$ and $g$ on $X$ are **equal almost everywhere**, written $f = g$ a.e., if $\set{x : f(x) \ne g(x)}$ is contained in a null set. A sequence $f_n$ **converges almost everywhere** to $f$ if $f_n(x) \to f(x)$ for all $x$ outside a null set.
:::

For example $\mathbf{1}_\Q = 0$ a.e. with respect to Lebesgue measure, and $x^n \to 0$ a.e. on $[0, 1]$ (everywhere except at $x = 1$). If the measure is complete, as Lebesgue measure is, then a function that equals a measurable function a.e. is itself measurable: if $f = g$ outside a null set $N$, then $\set{g > a}$ differs from $\set{f > a}$ only by a subset of $N$, which is measurable. Consequently an a.e. limit of measurable functions is measurable for a complete measure. For incomplete measures this can fail, which is one reason to prefer the complete σ-algebra $\mathcal{L}$ over $\mathcal{B}(\R)$.

## Egorov's and Lusin's theorems

Pointwise convergence is much weaker than uniform convergence, and measurable functions are much more general than continuous ones. But on a set of finite measure the gap is, in a precise sense, small: we can throw away a set of arbitrarily small measure and recover uniform convergence, or continuity.

::: theorem Egorov's theorem {#thm-egorov}
Let $\mu(X) < \infty$, and let $f_n$ and $f$ be measurable real-valued functions with $f_n \to f$ almost everywhere. Then for every $\eps > 0$ there is a measurable set $E$ with $\mu(X\setminus E) < \eps$ such that $f_n \to f$ **uniformly** on $E$.
:::

::: proof
Let $N$ be a null set outside which $f_n \to f$. For $k, n \in \N$ let

$$
E^k_n = \bigcup_{m\ge n}\set{x \in X\setminus N : \abs{f_m(x) - f(x)} \ge 1/k},
$$

the set of good points where some $f_m$ with $m \ge n$ is still at distance at least $1/k$ from $f$. These sets are measurable, and for fixed $k$ they decrease as $n$ increases. Their intersection over $n$ is empty: if $x \notin N$, then $f_m(x) \to f(x)$, so $\abs{f_m(x) - f(x)} < 1/k$ for all large $m$. Since $\mu(X) < \infty$, continuity from above ([[measure-theory/sigma-algebras#thm-continuity-measure]]) gives $\mu(E^k_n) \to 0$ as $n \to \infty$. Choose $n_k$ with $\mu(E^k_{n_k}) < \eps/2^k$, and let

$$
E = X\setminus\Bigl(N \cup\bigcup_{k=1}^\infty E^k_{n_k}\Bigr).
$$

Then $\mu(X\setminus E) \le \mu(N) + \sum_k\mu(E^k_{n_k}) < 0 + \sum_k\eps/2^k = \eps$. If $x \in E$, then for every $k$ we have $x \notin E^k_{n_k}$, so $\abs{f_m(x) - f(x)} < 1/k$ for all $m \ge n_k$. As $n_k$ does not depend on $x$, the convergence is uniform on $E$.
:::

::: widget plot
f: x^n
x: 0, 1
y: -0.05, 1.1
sliders: n=1:1:60:1
vlines: 0.9
labels: x^n
caption: Egorov's theorem in its simplest instance. The functions $x^n$ converge to $0$ at every point of $[0, 1)$, but not uniformly, because of points near $1$. Remove the short interval $(0.9, 1]$ beyond the dashed line: on $[0, 0.9]$, $\sup x^n = 0.9^n \to 0$, so the convergence is uniform there. For any $\eps > 0$, removing $(1 - \eps/2, 1]$, a set of measure less than $\eps$, does the same.
:::

::: quiz
Let $f_n \to f$ almost everywhere on $[0, 1]$ (with Lebesgue measure). What does Egorov's theorem guarantee?
- [ ] $f_n \to f$ uniformly on $[0, 1]$.
- [ ] $f_n \to f$ uniformly on some set of measure $1$.
- [x] For each $\eps > 0$, $f_n \to f$ uniformly on some measurable set $E$ with $\lambda([0,1]\setminus E) < \eps$.
- [ ] $f_n \to f$ uniformly on every closed subset of $[0, 1]$.
::: solution
That is the statement of [[#thm-egorov]]. The second option is false: $x^n \to 0$ a.e. on $[0, 1]$, but any set of measure $1$ contains points arbitrarily close to $1$, where $x^n$ is close to $1$. The exceptional set must be allowed to have small *positive* measure. The last option fails for the same example with the closed set $[0, 1]$.
:::
:::

::: warning Egorov needs finite measure
On $\R$ with Lebesgue measure, $f_n = \mathbf{1}_{[n, n+1]}$ tends to $0$ at every point, yet the convergence is not uniform on any set $E$ with $\lambda(\R\setminus E) < 1$: such an $E$ meets every interval $[n, n+1]$, so $\sup_E f_n = 1$ for all $n$. The proof breaks at continuity from above, which needs a set of finite measure. ([[#exr-3-8]] asks for the details.)
:::

Lusin's theorem is the analogue for continuity: a measurable function on an interval is continuous once a set of small measure is removed.

::: theorem Lusin's theorem {#thm-lusin}
Let $f\colon [a, b]\to\R$ be Lebesgue measurable. For every $\eps > 0$ there is a closed set $F \subseteq [a, b]$ with $\lambda([a, b]\setminus F) < \eps$ such that the restriction $f|_F$ is continuous.
:::

::: proof
*Simple functions.* Let $\varphi = \sum_{k=1}^m c_k\mathbf{1}_{E_k}$ in canonical form. By regularity ([[measure-theory/lebesgue-measure#thm-regularity]]) there are closed sets $F_k \subseteq E_k$ with $\lambda(E_k\setminus F_k) < \eps/m$. Their union $F$ is closed, $\lambda([a,b]\setminus F) < \eps$, and $\varphi$ is constant on each $F_k$. The $F_k$ are disjoint and compact, so each point of $F_k$ has a neighbourhood that meets no other $F_j$ (disjoint compact sets are a positive distance apart); hence $\varphi|_F$ is continuous.

*General $f$.* By [[#thm-simple-approx]] (applied to $f^\pm$) there are simple $\psi_n \to f$ everywhere. For each $n$ choose a closed $F_n$ with $\lambda([a, b]\setminus F_n) < \eps/2^{n+1}$ and $\psi_n|_{F_n}$ continuous. By Egorov's theorem there is a measurable $E$ with $\lambda([a, b]\setminus E) < \eps/4$ on which $\psi_n \to f$ uniformly, and by regularity a closed $F_0 \subseteq E$ with $\lambda(E \setminus F_0) < \eps/4$. Let $F = \bigcap_{n\ge0}F_n$, a closed set with $\lambda([a,b]\setminus F) < \eps/2 + \eps/2 = \eps$. On $F$ every $\psi_n$ is continuous and $\psi_n \to f$ uniformly, so $f|_F$ is continuous by [[real-analysis/uniform-convergence#thm-uniform-continuous]].
:::

::: warning Continuous on F is not continuous at points of F
Lusin's theorem says that the *restriction* $f|_F$ is continuous, not that $f$ is continuous at the points of $F$. Dirichlet's function $\mathbf{1}_\Q$ is discontinuous everywhere, yet on the closed set $F = [0, 1]\setminus U$ of [[measure-theory/lebesgue-measure#ex-open-dense]], which contains no rationals and has measure at least $1 - \eps$, its restriction is the constant $0$.
:::

::: remark Littlewood's three principles
J. E. Littlewood summarised the spirit of the subject in three principles: every measurable set of finite measure is nearly a finite union of intervals (regularity); every measurable function is nearly continuous (Lusin); every convergent sequence of measurable functions is nearly uniformly convergent (Egorov). "Nearly" always means: after discarding a set of small measure. Many proofs in measure theory consist of applying one of these principles and then a classical argument on the large good set.
:::

## The Cantor function

Our final example is a continuous increasing function that climbs from $0$ to $1$ while being flat almost everywhere, and it shows that measurable functions can behave in unexpected ways under composition.

::: example The Cantor function {#ex-cantor-function}
Let $C$ be the Cantor set ([[measure-theory/lebesgue-measure#ex-cantor-set]]). For $x \in C$ with ternary digits $d_k \in \set{0, 2}$ put $\Phi(x) = \sum_{k\ge1}\frac{d_k}{2}\,2^{-k}$ (halve the digits and read them in binary). Show that $\Phi$ extends to a continuous increasing function $\Phi\colon [0, 1]\to[0, 1]$ that is constant on each interval removed in building $C$, and that $\Phi(C) = [0, 1]$. Then use $\psi(x) = x + \Phi(x)$ to show that a Lebesgue measurable function composed with a continuous one need not be Lebesgue measurable.
::: solution
*Extension.* The two end-points of a removed interval have ternary expansions $0.d_1\ldots d_{k-1}0222\ldots$ and $0.d_1\ldots d_{k-1}2000\ldots$, which $\Phi$ maps to the binary expansions $0.b_1\ldots b_{k-1}0111\ldots$ and $0.b_1\ldots b_{k-1}1000\ldots$ of the *same* number. Define $\Phi$ on the removed interval to be this common value. Comparing expansions digit by digit shows that $\Phi$ is increasing on $[0, 1]$.

*Onto and continuous.* Every $y \in [0, 1]$ has a binary expansion $0.b_1b_2\ldots$, and the point of $C$ with ternary digits $2b_k$ is mapped to $y$; so $\Phi(C) = [0, 1]$. An increasing function whose image is an interval has no jumps ([[real-analysis/continuity#thm-monotone-jumps]]: a jump would leave a gap in the image), so $\Phi$ is continuous. On each removed interval it is constant, so it is differentiable with $\Phi' = 0$ on $[0,1]\setminus C$, a set of measure $1$; yet $\Phi(0) = 0$ and $\Phi(1) = 1$. (Compare with the fundamental theorem of calculus: $\Phi$ is not the integral of its derivative.)

*A bad composition.* $\psi(x) = x + \Phi(x)$ is continuous and strictly increasing from $[0, 1]$ onto $[0, 2]$, so it has a continuous inverse $h = \psi^{-1}$ ([[real-analysis/continuity#cor-inverse]]). On each removed interval $\psi$ is a translation, so $\psi$ maps $[0, 1]\setminus C$ onto a set of measure $1$ (the images of the removed intervals are disjoint intervals of the same total length), and therefore $\lambda(\psi(C)) = 2 - 1 = 1$. By [[measure-theory/lebesgue-measure#exr-2-8]], $\psi(C)$ contains a non-measurable set $W$. Let $E = \psi^{-1}(W) \subseteq C$. Since $\lambda(C) = 0$ and $\lambda$ is complete, $E$ is Lebesgue measurable (and null), so $g = \mathbf{1}_E$ is Lebesgue measurable. But $g \circ h = \mathbf{1}_{\psi(E)} = \mathbf{1}_W$ is not, although $h$ is continuous. (In particular $E$ is not a Borel set: otherwise $W = h^{-1}(E)$ would be Borel.)
:::
:::

::: application Random variables
In probability, a **random variable** on a probability space $(\Omega, \mathcal{F}, P)$ is nothing but a measurable function $X\colon\Omega\to\R$. Measurability is exactly what makes $P(X \le a) = P(\set{X \le a})$ meaningful, and by [[#thm-measurable-equiv]] it makes $P(X \in B)$ meaningful for every Borel set $B$. The function $B \mapsto P(X \in B)$ is a probability measure on $\mathcal{B}(\R)$, the **distribution** of $X$, and by [[measure-theory/sigma-algebras#thm-uniqueness]] it is determined by the cumulative distribution function $F(a) = P(X \le a)$. Sums, products, limits and continuous functions of random variables are random variables by the theorems of this chapter ([[probability/continuous-random-variables]]).
:::

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: -1
b: 1
cdf: true
caption: The distribution of a random variable $X$ is a measure on the Borel sets, determined by its distribution function $F(a) = P(X \le a)$. Here $X$ is standard normal, and $P(-1 \le X \le 1) = F(1) - F(-1) \approx 0.683$ — the rise of $F$ marked by the bar between the dashed lines, or the shaded area under the density if you switch to PDF — is the measure of the Borel set $[-1, 1]$. Change the distribution and the interval: every probability you can compute is the measure of a set $\set{X \in B}$, which exists because $X$ is measurable.
:::

::: history
Henri Lebesgue introduced measurable functions in his thesis of 1902 as the functions for which his integral could be defined, and proved that they are closed under pointwise limits. Georg Cantor described the function now named after him in 1884, in his study of perfect sets. Dmitri Egorov published his theorem on almost uniform convergence in 1911, and his student Nikolai Lusin the theorem on near-continuity in 1912; the Moscow school of real function theory that grew around them was one of the most influential of the twentieth century. J. E. Littlewood stated his three principles in his *Lectures on the Theory of Functions* (1944).
:::

## Where this leads

Simple functions are integrated by the obvious formula $\int\sum c_k\mathbf{1}_{E_k}\,d\mu = \sum c_k\mu(E_k)$, and [[measure-theory/lebesgue-integral]] defines the integral of a non-negative measurable function as the supremum of the integrals of the simple functions below it — the approximations of [[#thm-simple-approx]] — and proves the monotone convergence theorem, which is the integral version of [[#thm-measurable-limits]]. The argument of Egorov's proof reappears in [[measure-theory/lp-spaces]], where it shows that on a finite measure space almost-everywhere convergence implies convergence in measure. In probability ([[probability/limit-theorems]]) the strong law of large numbers is a theorem about almost-everywhere convergence of measurable functions.

::: summary
- $f$ is measurable when every set $\set{f > a}$ is measurable; equivalently $\set{f \ge a}$, $\set{f < a}$ or $\set{f\le a}$; for real $f$, every Borel set has measurable preimage ([[#thm-measurable-equiv]]).
- Continuous and monotone functions are Borel measurable; indicators $\mathbf{1}_E$ are measurable exactly when $E$ is.
- Sums, products, maxima, $f^\pm$, $\abs f$ and continuous functions of measurable functions are measurable ([[#thm-measurable-algebra]]).
- Suprema, infima, $\limsup$, $\liminf$ and pointwise limits of measurable functions are measurable ([[#thm-measurable-limits]]) — unlike continuity or Riemann integrability.
- Every non-negative measurable $f$ is the increasing pointwise limit of the simple functions $\min(n, 2^{-n}\lfloor 2^nf\rfloor)$ ([[#thm-simple-approx]]).
- On finite measure spaces, a.e. convergence is uniform off a set of small measure (Egorov), and measurable functions on $[a, b]$ are continuous on closed sets of nearly full measure (Lusin).
- The Cantor function is continuous, increasing, onto $[0, 1]$ and flat a.e.; it yields a Lebesgue measurable set that is not Borel.
:::

## Exercises

::: exercise Indicators {level=1}
Let $E \subseteq X$. Prove that $\mathbf{1}_E$ is measurable if and only if $E \in \mathcal{A}$, and that $\mathbf{1}_{A\cap B} = \mathbf{1}_A\mathbf{1}_B$ and $\mathbf{1}_{A\cup B} = \max(\mathbf{1}_A, \mathbf{1}_B)$.
::: solution
The first statement is [[#ex-measurable]](a): $\set{\mathbf{1}_E > a}$ is $X$, $E$ or $\varnothing$. For the identities, both sides of each equation take only the values $0$ and $1$, and both equal $1$ exactly at the points of $A\cap B$ (respectively $A \cup B$).
:::
:::

::: exercise Monotone functions {level=1}
Let $f\colon \R\to\R$ be decreasing. Prove directly that $f$ is Borel measurable.
::: solution
If $f(x) > a$ and $y < x$, then $f(y) \ge f(x) > a$. So $\set{f > a}$ contains, with each point, every point to its left: it is $\varnothing$, $\R$, or an interval $(-\infty, c)$ or $(-\infty, c]$. All of these are Borel.
:::
:::

::: exercise A value of a simple approximation {level=1 check="3/8"}
For $f(x) = x^2$, compute $\varphi_3(0.7)$, where $\varphi_n$ is defined in [[#eq-phi-n]].
::: solution
$f(0.7) = 0.49$, and $2^3\cdot0.49 = 3.92$, whose floor is $3$. So $\varphi_3(0.7) = \min(3, 3/8) = 3/8$. The error is $0.49 - 0.375 = 0.115 < 2^{-3}$, as the proof of [[#thm-simple-approx]] guarantees.
:::
:::

::: exercise Derivatives are measurable {level=2}
Let $f\colon \R\to\R$ be differentiable. Prove that $f'$ is Borel measurable.
::: solution
$f$ is continuous, so each $g_n(x) = n\bigl(f(x + \tfrac1n) - f(x)\bigr)$ is continuous, hence Borel measurable. For every $x$, $g_n(x) \to f'(x)$ by the definition of the derivative (along $h = 1/n$). By [[#thm-measurable-limits]] the pointwise limit $f'$ is Borel measurable. (Derivatives need not be continuous — [[real-analysis/differentiation#ex-discontinuous-derivative]] — but they are always measurable.)
:::
:::

::: exercise Where a sequence converges {level=2}
Let $f_n\colon X\to\R$ be measurable. Prove that the set of points $x$ at which $(f_n(x))$ converges (to a real number) is measurable.
::: hint
Use the Cauchy criterion and write the set with countable unions and intersections.
:::
::: solution
By the Cauchy criterion, $(f_n(x))$ converges if and only if for every $k$ there is $N$ such that $\abs{f_m(x) - f_n(x)} < 1/k$ for all $m, n \ge N$. So the set is

$$
\bigcap_{k=1}^\infty\ \bigcup_{N=1}^\infty\ \bigcap_{m, n\ge N}\set{\abs{f_m - f_n} < 1/k},
$$

and each $\set{\abs{f_m - f_n} < 1/k}$ is measurable because $\abs{f_m - f_n}$ is ([[#thm-measurable-algebra]]). Countable unions and intersections of measurable sets are measurable.
:::
:::

::: exercise A value of the Cantor function {level=2 check="1/3"}
Find $\Phi(1/4)$, where $\Phi$ is the Cantor function of [[#ex-cantor-function]].
::: solution
$\tfrac14 = \sum_{k\ge1}2\cdot 9^{-k} = 0.020202\ldots_3$ (indeed $2\sum 9^{-k} = 2\cdot\frac{1/9}{1 - 1/9} = \frac14$). Its ternary digits are $0, 2, 0, 2, \dots$, so $\tfrac14 \in C$, and halving the digits gives the binary number $0.010101\ldots_2 = \sum_{k\ge1}4^{-k} = \tfrac13$. So $\Phi(1/4) = 1/3$.
:::
:::

::: exercise Lusin's theorem for Dirichlet's function {level=2}
Given $\eps > 0$, find explicitly a closed set $F \subseteq [0, 1]$ with $\lambda([0,1]\setminus F) < \eps$ on which $\mathbf{1}_\Q$ restricts to a continuous function.
::: solution
List the rationals in $[0, 1]$ as $q_1, q_2, \dots$, and let $U = \bigcup_k(q_k - \eps2^{-k-2}, q_k + \eps 2^{-k-2})$, an open set of measure at most $\eps/2$ containing every rational of $[0,1]$. Then $F = [0, 1]\setminus U$ is closed, contains no rationals, and $\lambda([0, 1]\setminus F) \le \lambda(U) \le \eps/2 < \eps$. On $F$, $\mathbf{1}_\Q$ is identically $0$, which is continuous.
:::
:::

::: exercise Egorov's theorem fails on the line {level=2}
Let $f_n = \mathbf{1}_{[n, n+1]}$ on $\R$ with Lebesgue measure. Show that $f_n \to 0$ everywhere, but that there is no measurable $E$ with $\lambda(\R\setminus E) < 1$ on which $f_n \to 0$ uniformly. Which hypothesis of [[#thm-egorov]] fails?
::: solution
For fixed $x$, $f_n(x) = 0$ as soon as $n > x$, so $f_n \to 0$ everywhere. If $\lambda(\R\setminus E) < 1$, then $E$ cannot miss any interval $[n, n+1]$ entirely (that interval alone has measure $1$), so for every $n$ there is $x \in E$ with $f_n(x) = 1$, and $\sup_E\abs{f_n} = 1 \not\to 0$. The failing hypothesis is $\mu(X) < \infty$: in the proof, the sets $E^1_n = [n, \infty)$ decrease to $\varnothing$ while all have infinite measure, so continuity from above is not available.
:::
:::

::: exercise Lebesgue functions are Borel up to null sets {level=3}
Let $f\colon\R\to\R$ be Lebesgue measurable. Prove that there is a Borel measurable $g\colon\R\to\R$ with $f = g$ almost everywhere.
::: hint
Do it first for indicators of Lebesgue measurable sets (use [[measure-theory/lebesgue-measure#thm-regularity]]), then for simple functions, then use [[#thm-simple-approx]].
:::
::: solution
*Indicators.* If $E \in \mathcal{L}$, regularity gives a Borel ($G_\delta$) set $G$ and a null set $Z$ with $E = G\setminus Z$, so $\mathbf{1}_E = \mathbf{1}_G$ outside $Z$.

*Simple functions.* If $\varphi = \sum c_k\mathbf{1}_{E_k}$, replace each $E_k$ by such a $G_k$; the resulting Borel simple function agrees with $\varphi$ outside the null set $\bigcup Z_k$.

*General $f$.* Let $\psi_n \to f$ pointwise with $\psi_n$ simple (from [[#thm-simple-approx]] applied to $f^\pm$), and let $\tilde\psi_n$ be Borel simple functions with $\tilde\psi_n = \psi_n$ outside null sets $N_n$. Outside the null set $N = \bigcup_n N_n$, $\tilde\psi_n \to f$. Let $B$ be a Borel null set containing $N$ (regularity again: $N$ is contained in a $G_\delta$ null set), and put $g = \limsup_n\bigl(\mathbf{1}_{\R\setminus B}\,\tilde\psi_n\bigr)$. Each $\mathbf{1}_{\R\setminus B}\tilde\psi_n$ is a Borel simple function, so $g$ is Borel measurable by [[#thm-measurable-limits]]. On $B$ every term is $0$, so $g = 0$ there; off $B$ the terms converge to $f$, so $g = f$ there. Hence $g$ is real-valued, Borel measurable, and $g = f$ outside the null set $B$.
:::
:::

::: exercise Continuous functions converge to f almost everywhere {level=3}
Let $f\colon[0, 1]\to\R$ be Lebesgue measurable. Prove that there are continuous functions $g_n$ on $[0, 1]$ with $g_n \to f$ almost everywhere. You may use the fact that a continuous function on a closed set $F \subseteq [0,1]$ extends to a continuous function on $[0, 1]$ (interpolate linearly across the open intervals of $[0,1]\setminus F$).
::: hint
Apply Lusin's theorem with $\eps = 2^{-n}$, and then the Borel–Cantelli lemma.
:::
::: solution
For each $n$, Lusin's theorem gives a closed $F_n$ with $\lambda([0,1]\setminus F_n) < 2^{-n}$ and $f|_{F_n}$ continuous; extend $f|_{F_n}$ to a continuous $g_n$ on $[0, 1]$, so $g_n = f$ on $F_n$. Since $\sum_n\lambda([0, 1]\setminus F_n) < \infty$, the Borel–Cantelli lemma ([[measure-theory/sigma-algebras#thm-borel-cantelli]]) shows that almost every $x$ lies in only finitely many of the sets $[0,1]\setminus F_n$, that is, $x \in F_n$ for all large $n$. For such $x$, $g_n(x) = f(x)$ for all large $n$, so $g_n(x) \to f(x)$. Thus $g_n \to f$ almost everywhere.
:::
:::
