The chapter on the real numbers began with a function that should have a root but did not: over $\Q$, $f(x) = x^2 - 2$ changes sign on $[1, 2]$ without ever vanishing. Over $\R$ the root exists, and the general principle behind that fact — a continuous function cannot get from below a line to above it without crossing it — is the intermediate value theorem. In this chapter we prove it, together with the other great theorems about continuous functions on closed bounded intervals: they are bounded, they attain their maximum and minimum, and they are *uniformly* continuous.

First we must say precisely what continuity is. "A graph you can draw without lifting the pen" is a useful picture but a poor definition: it says nothing about functions such as Thomae's function below, which is continuous at every irrational number and discontinuous at every rational one. The ε–δ definition from [[calculus-1/limits]] handles such functions with ease, and it combines beautifully with the sequence theorems of [[real-analysis/sequences]]: every proof in this chapter reduces a question about functions to a question about sequences.

## Limits of functions

In [[calculus-1/limits]] we took limits of functions defined on a whole interval around a point. Analysis needs more flexibility — functions defined on $\Q$, on $[0, 1]$, or on $\set{1/n : n \in \N}$ — so we allow an arbitrary domain $A \subseteq \R$ and approach $c$ from within $A$.

A point $c \in \R$ is a **limit point** of $A$ if every interval $(c - \delta, c + \delta)$ contains a point of $A$ other than $c$. For example, every point of $[0, 1]$ is a limit point of $(0, 1)$, and $0$ is a limit point of $\set{1/n : n \in \N}$, but $1/2$ is not. A point of $A$ that is not a limit point of $A$ is an **isolated point** of $A$.

::: definition Limit of a function {#def-function-limit}
Let $f\colon A \to \R$ and let $c$ be a limit point of $A$. We write $\lim_{x\to c} f(x) = L$ if for every $\eps > 0$ there is $\delta > 0$ such that

$$
x \in A \ \text{ and }\ 0 < \abs{x - c} < \delta \quad\implies\quad \abs{f(x) - L} < \eps.
$$
:::

Requiring $c$ to be a limit point guarantees that there are points $x$ to test, and makes the limit unique (the proof is that of the uniqueness theorem in [[calculus-1/limits]]). The bridge between limits of functions and limits of sequences is the following theorem, whose proof was promised in [[calculus-1/limits]].

::: theorem Sequential criterion for limits {#thm-sequential-limit}
Let $f\colon A \to \R$ and let $c$ be a limit point of $A$. Then $\lim_{x \to c} f(x) = L$ if and only if $f(x_n) \to L$ for **every** sequence $(x_n)$ in $A$ with $x_n \ne c$ for all $n$ and $x_n \to c$.
:::

::: proof
*Limit implies the sequence condition.* Let $(x_n)$ be such a sequence and $\eps > 0$. Choose $\delta$ as in [[#def-function-limit]], and then $N$ with $\abs{x_n - c} < \delta$ for all $n \ge N$. For $n \ge N$ we have $x_n \in A$ and $0 < \abs{x_n - c} < \delta$, so $\abs{f(x_n) - L} < \eps$. Thus $f(x_n) \to L$.

*The sequence condition implies the limit.* We prove the contrapositive. Suppose $\lim_{x\to c} f(x) = L$ is false. Negating the definition, there is $\eps_0 > 0$ such that for every $\delta > 0$ some $x \in A$ has $0 < \abs{x - c} < \delta$ but $\abs{f(x) - L} \ge \eps_0$. Applying this with $\delta = 1/n$ for each $n \in \N$ gives points $x_n \in A$ with $0 < \abs{x_n - c} < 1/n$ and $\abs{f(x_n) - L} \ge \eps_0$. Then $x_n \ne c$, $x_n \to c$ (by the squeeze theorem), but $f(x_n) \not\to L$. So the sequence condition fails.
:::

Two consequences follow at once. First, the limit laws for functions (sums, products, quotients, inequalities, squeeze) follow from the corresponding laws for sequences ([[real-analysis/sequences#thm-algebra-limits]]), without any new ε–δ work. Second, we get a practical test for *non*-existence: find two sequences $x_n \to c$ and $y_n \to c$ (with terms $\ne c$) along which $f$ has different limits.

::: example A limit that does not exist {#ex-sin-recip}
Show that $\lim_{x\to0}\sin(1/x)$ does not exist, but $\lim_{x\to 0} x\sin(1/x) = 0$.
::: solution
Let $x_n = \dfrac{1}{n\pi}$ and $y_n = \dfrac{1}{2n\pi + \pi/2}$. Both sequences consist of non-zero numbers tending to $0$, but $\sin(1/x_n) = \sin(n\pi) = 0 \to 0$ while $\sin(1/y_n) = \sin(2n\pi + \pi/2) = 1 \to 1$. By [[#thm-sequential-limit]] no number $L$ can be the limit, since both sequences would have to give $L$.

For the second function, $\abs{x\sin(1/x) - 0} \le \abs{x}$ for $x \ne 0$. Given $\eps > 0$, take $\delta = \eps$: if $0 < \abs{x} < \delta$ then $\abs{x\sin(1/x)} \le \abs{x} < \eps$.
:::
:::

::: widget plot
f: sin(1/x); x*sin(1/x)
x: -0.5, 0.5
y: -1.2, 1.2
labels: \sin(1/x); x\sin(1/x)
caption: Near $0$, $\sin(1/x)$ oscillates between $-1$ and $1$ infinitely often, so no single value can be its limit. Multiplying by $x$ squeezes the oscillation into the wedge $\lvert y\rvert \le \lvert x\rvert$, and the limit is $0$. Zoom in mentally: however small the window around $0$, the first graph still sweeps the full height.
:::

## Continuity

::: definition Continuity {#def-continuous}
Let $f\colon A \to \R$ and $c \in A$. The function $f$ is **continuous at** $c$ if for every $\eps > 0$ there is $\delta > 0$ such that

$$
x \in A \ \text{ and }\ \abs{x - c} < \delta \quad\implies\quad \abs{f(x) - f(c)} < \eps.
$$

$f$ is **continuous on** $A$ (or simply continuous) if it is continuous at every point of $A$.
:::

If $c$ is a limit point of $A$, continuity at $c$ says exactly that $\lim_{x\to c} f(x)$ exists and equals $f(c)$. At an isolated point of $A$ every function is continuous (take $\delta$ so small that $c$ is the only point of $A$ within $\delta$). Notice that continuity is a property of a function *together with its domain*: $f(x) = 1/x$ is continuous on its domain $\R\setminus\set{0}$, and it makes no sense to ask whether it is continuous at $0$.

::: theorem Sequential characterisation of continuity {#thm-sequential-continuity}
$f\colon A \to \R$ is continuous at $c \in A$ if and only if $f(x_n) \to f(c)$ for every sequence $(x_n)$ in $A$ with $x_n \to c$.
:::

::: proof
The proof is that of [[#thm-sequential-limit]] with $L = f(c)$ and the condition $x_n \ne c$ dropped. If $f$ is continuous at $c$ and $x_n \to c$, the $\delta$ for a given $\eps$ is eventually larger than $\abs{x_n - c}$, giving $\abs{f(x_n) - f(c)} < \eps$. If $f$ is not continuous at $c$, there is $\eps_0 > 0$ and, for each $n$, a point $x_n \in A$ with $\abs{x_n - c} < 1/n$ and $\abs{f(x_n) - f(c)} \ge \eps_0$; then $x_n \to c$ but $f(x_n) \not\to f(c)$.
:::

::: theorem Combining continuous functions {#thm-composition}
Let $f, g\colon A \to \R$ be continuous at $c \in A$. Then $f + g$, $fg$ and $\lambda f$ ($\lambda \in \R$) are continuous at $c$, and so is $f/g$ if $g(x) \ne 0$ on $A$. If $f\colon A \to B$ is continuous at $c$ and $h\colon B \to \R$ is continuous at $f(c)$, then the composition $h \circ f$ is continuous at $c$.
:::

::: proof
Let $x_n \to c$ in $A$. By [[#thm-sequential-continuity]], $f(x_n) \to f(c)$ and $g(x_n) \to g(c)$, so by the algebra of limits $f(x_n) + g(x_n) \to f(c) + g(c)$, and similarly for the product, multiple and quotient; [[#thm-sequential-continuity]] now gives continuity of the combinations. For the composition: $f(x_n)$ is a sequence in $B$ tending to $f(c)$, and $h$ is continuous at $f(c)$, so $h(f(x_n)) \to h(f(c))$.
:::

Since constants and $x \mapsto x$ are continuous, every polynomial is continuous on $\R$, and every rational function on its domain. Two of the most important examples, however, are built from the rationals and irrationals, and show how wild a function can be.

::: example Dirichlet's function {#ex-dirichlet}
Let $D(x) = 1$ if $x \in \Q$ and $D(x) = 0$ if $x \notin \Q$. Show that $D$ is discontinuous at every point.
::: solution
Let $c \in \R$. By the density of the rationals and of the irrationals ([[real-analysis/real-numbers#thm-q-dense]] and [[real-analysis/real-numbers#exr-1-7]]), each interval $(c - \frac1n, c + \frac1n)$ contains a rational $q_n$ and an irrational $r_n$. Both sequences tend to $c$, but $D(q_n) = 1$ and $D(r_n) = 0$ for all $n$. They cannot both tend to $D(c)$, so by [[#thm-sequential-continuity]] $D$ is not continuous at $c$. (By contrast, $x\,D(x)$ is continuous at $0$, and nowhere else: [[#exr-4-7]].)
:::
:::

::: example Thomae's function {#ex-thomae}
Define $T(x) = 1/q$ if $x$ is rational and written in lowest terms as $x = p/q$ with $q \ge 1$ (so $T(0) = 1$), and $T(x) = 0$ if $x$ is irrational. Show that $T$ is discontinuous at every rational number and continuous at every irrational number.
::: solution
*Rational points.* If $c = p/q$ then $T(c) = 1/q > 0$, but the irrationals $r_n \in (c - \frac1n, c + \frac1n)$ satisfy $r_n \to c$ and $T(r_n) = 0 \not\to T(c)$.

*Irrational points.* Let $c$ be irrational, so $T(c) = 0$, and let $\eps > 0$. Consider the set $F$ of rationals $p/q$ in lowest terms with $\abs{p/q - c} < 1$ and $q \le 1/\eps$. For each of the finitely many admissible denominators $q$, the condition $q(c - 1) < p < q(c+1)$ allows at most $2q + 1$ numerators, so $F$ is finite; and $c \notin F$ because $c$ is irrational. Let $\delta$ be the smallest of $1$ and the distances from $c$ to the points of $F$ (so $\delta = 1$ if $F = \varnothing$); then $\delta > 0$. If $\abs{x - c} < \delta$, then $x \notin F$, so either $x$ is irrational and $T(x) = 0$, or $x = p/q$ in lowest terms with $q > 1/\eps$, and $T(x) = 1/q < \eps$. Either way $\abs{T(x) - T(c)} < \eps$.
:::
:::

The point of the second half of the argument: near an irrational number, all rationals with small denominators stay a positive distance away, and the remaining rationals have small values of $T$. Thomae's function returns in [[real-analysis/riemann-integral]] as an integrable function with infinitely many discontinuities.

::: quiz
Which of these functions (each defined on all of $\R$) is continuous at $0$? Select all that apply.
- [x] $f(x) = x\,D(x)$, with $D$ Dirichlet's function
- [ ] $D(x)$ itself
- [ ] $g(x) = \sin(1/x)$ for $x \ne 0$, $g(0) = 0$
- [x] $h(x) = x\sin(1/x)$ for $x \ne 0$, $h(0) = 0$
::: solution
$\abs{x\,D(x) - 0} \le \abs{x}$ and $\abs{h(x) - 0} \le \abs{x}$, so $\delta = \eps$ works for both. $D$ is discontinuous everywhere ([[#ex-dirichlet]]), and $g$ has no limit at $0$ ([[#ex-sin-recip]]), so no choice of $g(0)$ makes it continuous there.
:::
:::

## Continuous functions on closed bounded intervals

The next three theorems are the reason continuity matters. All three fail if the function is not continuous; the first two also fail if the interval is not closed or not bounded, whereas the third needs only that the domain be an interval (over $\Q$ it fails, as we saw). Each is proved by combining continuity with completeness, in the form of the Bolzano–Weierstrass theorem ([[real-analysis/sequences#thm-bw]]) or the supremum.

::: theorem Boundedness theorem {#thm-bounded}
A continuous function $f\colon [a, b] \to \R$ is bounded.
:::

::: proof
Suppose not. Then for each $n \in \N$ there is $x_n \in [a, b]$ with $\abs{f(x_n)} > n$. The sequence $(x_n)$ is bounded, so by Bolzano–Weierstrass it has a subsequence $x_{n_k} \to c$. Since $a \le x_{n_k} \le b$ for all $k$, also $a \le c \le b$ ([[real-analysis/sequences#thm-order-limits]]) — this is where we use that the interval is *closed*. By continuity at $c$, $f(x_{n_k}) \to f(c)$, so the sequence $(f(x_{n_k}))$ is convergent and hence bounded. But $\abs{f(x_{n_k})} > n_k \ge k$ for every $k$, a contradiction.
:::

::: theorem Extreme value theorem {#thm-evt}
A continuous function $f\colon [a, b] \to \R$ attains a maximum and a minimum: there are $c, d \in [a, b]$ with $f(d) \le f(x) \le f(c)$ for all $x \in [a, b]$.
:::

::: proof
By [[#thm-bounded]] the set $f([a,b]) = \set{f(x) : x \in [a, b]}$ is bounded, so $M = \sup f([a, b])$ exists by completeness. For each $n$, the approximation property gives $x_n \in [a, b]$ with $M - \frac1n < f(x_n) \le M$. By Bolzano–Weierstrass some subsequence $x_{n_k}$ converges to a point $c$, and $c \in [a, b]$ as before. On the one hand $f(x_{n_k}) \to f(c)$ by continuity; on the other, $M - \frac{1}{n_k} < f(x_{n_k}) \le M$ gives $f(x_{n_k}) \to M$ by the squeeze theorem. By uniqueness of limits $f(c) = M$, so the supremum is attained. Applying this to $-f$ gives the minimum.
:::

::: warning Every hypothesis is needed
On $(0, 1]$, $f(x) = 1/x$ is continuous but unbounded; on $[0, \infty)$, $f(x) = x$ is unbounded; on $(0, 1)$, $f(x) = x$ is bounded but has neither maximum nor minimum. On the closed interval $[0, 1]$ the *discontinuous* function with $f(x) = x$ for $x < 1$ and $f(1) = 0$ has supremum $1$ but no maximum. In each proof, find the step that fails.
:::

::: theorem Intermediate value theorem {#thm-ivt}
Let $f\colon [a, b] \to \R$ be continuous and let $y$ be any number between $f(a)$ and $f(b)$. Then there is $c \in [a, b]$ with $f(c) = y$.
:::

::: proof
If $y$ equals $f(a)$ or $f(b)$ there is nothing to prove. Suppose $f(a) < y < f(b)$; the case $f(a) > y > f(b)$ follows by applying this one to $-f$ and $-y$. Let

$$
S = \set{x \in [a, b] : f(x) < y}.
$$

$S$ contains $a$ and is bounded above by $b$, so $c = \sup S$ exists, and $a \le c \le b$. We rule out $f(c) < y$ and $f(c) > y$.

*If $f(c) < y$:* then $c \ne b$, since $f(b) > y$. Continuity at $c$ with $\eps = y - f(c)$ gives $\delta > 0$ such that $f(x) < f(c) + \eps = y$ for all $x \in [a, b]$ with $\abs{x - c} < \delta$. Then any $x \in (c, b]$ with $x < c + \delta$ lies in $S$ and exceeds $c$ — contradicting that $c$ is an upper bound of $S$.

*If $f(c) > y$:* then $c \ne a$, since $f(a) < y$. Continuity with $\eps = f(c) - y$ gives $\delta > 0$ such that $f(x) > y$ for all $x \in [a, b]$ with $\abs{x - c} < \delta$. So no point of $S$ lies in $(c - \delta, c]$, and since every point of $S$ is at most $c$, the number $\max(a, c - \delta) < c$ is an upper bound of $S$ — contradicting that $c$ is the least upper bound.

Hence $f(c) = y$.
:::

Applied to $f(x) = x^2 - 2$ on $[1, 2]$, the theorem produces $\sqrt2$ once again — this time as a special case of a general principle. More generally it gives $n$-th roots ($x^n - a$ on $[0, 1 + a]$), shows that every polynomial of odd degree has a real root ([[#exr-4-3]] treats a cubic), and, combined with [[#thm-evt]], shows that **a continuous function maps a closed bounded interval onto a closed bounded interval**: $f([a, b]) = [m, M]$ with $m$ and $M$ the minimum and maximum. The bisection method of [[numerical-analysis/root-finding]] is the constructive version of the proof.

::: example Locating a root {#ex-root}
Show that the equation $\cos x = x$ has a solution in $[0, \pi/2]$, and that $x^3 - x - 1 = 0$ has a solution in $[1, 2]$.
::: solution
Let $g(x) = \cos x - x$, continuous on $[0, \pi/2]$ as a difference of continuous functions. Then $g(0) = 1 > 0$ and $g(\pi/2) = -\pi/2 < 0$, so $0$ lies between $g(0)$ and $g(\pi/2)$, and [[#thm-ivt]] gives $c$ with $g(c) = 0$, that is $\cos c = c$. (Numerically $c \approx 0.739$; this point reappears in [[real-analysis/metric-spaces]] as a fixed point of a contraction.) Similarly $p(x) = x^3 - x - 1$ has $p(1) = -1 < 0 < 5 = p(2)$, so it has a root in $(1, 2)$.
:::
:::

::: widget plot
f: x^3 - x - 1; k
x: 0.5, 2.2
y: -2, 6
sliders: k=2:-1:5:0.1
labels: x^3 - x - 1; y = k
caption: The intermediate value theorem for $p(x) = x^3 - x - 1$ on $[1, 2]$, where $p(1) = -1$ and $p(2) = 5$. Slide the level $k$ anywhere between $-1$ and $5$: the horizontal line always meets the graph above $[1, 2]$, as [[#thm-ivt]] guarantees. The proof locates a crossing as the supremum of the points where the graph is still below the line.
:::

## Uniform continuity

In the definition of continuity on a set, $\delta$ may depend on both $\eps$ and the point $c$. Often it must. For $f(x) = 1/x$ on $(0, 1]$, the largest $\delta$ that works at $c$ for a given $\eps$ is $\dfrac{\eps c^2}{1 + \eps c}$, which shrinks to $0$ as $c \to 0$: near $0$ the graph is so steep that tiny changes in $x$ produce large changes in $f(x)$.

::: widget plot
f: 1/x; 1/c + e; 1/c - e
x: 0.05, 2.2
y: 0, 12
sliders: c=1:0.1:2:0.01; e=0.5:0.1:1:0.05
labels: 1/x; 1/c+\varepsilon; 1/c-\varepsilon
caption: The band of half-width $\eps$ (the slider $e$) around the height $1/c$. The graph of $1/x$ lies inside the band only for $x$ in a short interval around $c$, of length roughly $2\eps c^2$. Keep $\eps$ fixed and slide $c$ towards $0$: the admissible interval shrinks to nothing, so no single $\delta$ serves every point. This is the failure of uniform continuity.
:::

::: definition Uniform continuity {#def-uniform-continuity}
A function $f\colon A \to \R$ is **uniformly continuous** on $A$ if for every $\eps > 0$ there is $\delta > 0$ such that

$$
x, y \in A \ \text{ and }\ \abs{x - y} < \delta \quad\implies\quad \abs{f(x) - f(y)} < \eps.
$$
:::

The difference from continuity is only in the order of quantifiers — "for every $\eps$ there is $\delta$ such that for all $x, y$", instead of "for every $c$ and every $\eps$ there is $\delta$" — but it is a real difference: one $\delta$ must serve the whole domain at once. Negating the definition with $\delta = 1/n$, exactly as in the proof of [[#thm-sequential-limit]], gives a practical test.

::: lemma Sequential test for non-uniform continuity {#lem-not-uc}
$f\colon A \to \R$ fails to be uniformly continuous if and only if there are $\eps_0 > 0$ and sequences $(x_n)$, $(y_n)$ in $A$ with $\abs{x_n - y_n} \to 0$ but $\abs{f(x_n) - f(y_n)} \ge \eps_0$ for all $n$.
:::

::: proof
If $f$ is not uniformly continuous, some $\eps_0 > 0$ has no suitable $\delta$; in particular $\delta = 1/n$ fails, which provides $x_n, y_n \in A$ with $\abs{x_n - y_n} < 1/n$ and $\abs{f(x_n) - f(y_n)} \ge \eps_0$. Conversely, given such sequences, any proposed $\delta > 0$ is defeated by the pair $x_n, y_n$ for $n$ so large that $\abs{x_n - y_n} < \delta$.
:::

::: example Which functions are uniformly continuous? {#ex-uc}
Decide whether each function is uniformly continuous: (a) $\sin x$ on $\R$; (b) $\sqrt x$ on $[0, \infty)$; (c) $x^2$ on $\R$; (d) $1/x$ on $(0, 1]$.
::: solution
(a) Yes. From $\sin x - \sin y = 2\cos\frac{x+y}{2}\sin\frac{x-y}{2}$ and $\abs{\sin t} \le \abs t$, we get $\abs{\sin x - \sin y} \le \abs{x - y}$, so $\delta = \eps$ works. In general a **Lipschitz** function — one with $\abs{f(x) - f(y)} \le K\abs{x - y}$ for a constant $K$ — is uniformly continuous, with $\delta = \eps/K$.

(b) Yes, although $\sqrt x$ is not Lipschitz near $0$. For $0 \le y \le x$ we have $\sqrt x - \sqrt y \le \sqrt{x - y}$ (square both sides: $x - 2\sqrt{xy} + y \le x - y$ because $y \le \sqrt{xy}$). So $\abs{\sqrt x - \sqrt y} \le \sqrt{\abs{x - y}}$, and $\delta = \eps^2$ works.

(c) No. Take $x_n = n + \frac1n$ and $y_n = n$: then $\abs{x_n - y_n} = \frac1n \to 0$ but $x_n^2 - y_n^2 = 2 + \frac1{n^2} \ge 2$. By [[#lem-not-uc]] with $\eps_0 = 2$, the function is not uniformly continuous. The graph gets steeper and steeper.

(d) No. Take $x_n = \frac1n$ and $y_n = \frac{1}{n+1}$: then $\abs{x_n - y_n} = \frac{1}{n(n+1)} \to 0$ but $\abs{f(x_n) - f(y_n)} = 1$.
:::
:::

In (c) the trouble is at infinity and in (d) at a missing end-point. On a closed bounded interval neither can happen.

::: theorem Heine–Cantor theorem {#thm-heine-cantor}
A continuous function $f\colon [a, b] \to \R$ is uniformly continuous.
:::

::: proof
Suppose not. By [[#lem-not-uc]] there are $\eps_0 > 0$ and points $x_n, y_n \in [a, b]$ with $\abs{x_n - y_n} < 1/n$ and $\abs{f(x_n) - f(y_n)} \ge \eps_0$. By Bolzano–Weierstrass, a subsequence $x_{n_k}$ converges to some $c$, and $c \in [a, b]$ because the interval is closed. Then also $y_{n_k} \to c$, since $\abs{y_{n_k} - c} \le \abs{y_{n_k} - x_{n_k}} + \abs{x_{n_k} - c} < \frac{1}{n_k} + \abs{x_{n_k} - c} \to 0$. By continuity at $c$, both $f(x_{n_k})$ and $f(y_{n_k})$ tend to $f(c)$, so their difference tends to $0$ — contradicting $\abs{f(x_{n_k}) - f(y_{n_k})} \ge \eps_0$.
:::

Uniform continuity is exactly what makes continuous functions integrable: in [[real-analysis/riemann-integral]], a single $\delta$ for the whole interval lets us make every rectangle in a Riemann sum accurate at once.

::: quiz
Which of these functions are uniformly continuous on the open interval $(0, 1)$? Select all that apply.
- [x] $x^2$
- [ ] $1/x$
- [ ] $\sin(1/x)$
- [x] $x\sin(1/x)$
::: solution
$x^2$ and $x\sin(1/x)$ extend to continuous functions on $[0, 1]$ (give the second the value $0$ at $0$), which are uniformly continuous there by [[#thm-heine-cantor]] and hence on the smaller set $(0, 1)$. $1/x$ fails by [[#ex-uc]](d), and $\sin(1/x)$ fails because the points $x_n = \frac{1}{2n\pi}$ and $y_n = \frac{1}{2n\pi + \pi/2}$ get arbitrarily close while $\abs{\sin(1/x_n) - \sin(1/y_n)} = 1$. In general, a continuous function on $(a, b)$ is uniformly continuous exactly when it extends continuously to $[a, b]$.
:::
:::

## Monotone functions

Monotone functions are much better behaved than general ones: they can only jump, and only countably often.

::: theorem Discontinuities of monotone functions {#thm-monotone-jumps}
Let $f\colon (a, b) \to \R$ be increasing. Then at every $c \in (a, b)$ the one-sided limits exist and

$$
f(c^-) = \lim_{x\to c^-} f(x) = \sup_{x < c} f(x) \ \le\ f(c)\ \le\ \inf_{x > c} f(x) = \lim_{x \to c^+}f(x) = f(c^+).
$$

$f$ is continuous at $c$ if and only if $f(c^-) = f(c^+)$, and the set of points at which $f$ is discontinuous is countable.
:::

::: proof
The set $\set{f(x) : a < x < c}$ is non-empty and bounded above by $f(c)$; let $s$ be its supremum, so $s \le f(c)$. Given $\eps > 0$, the approximation property gives $x_0 \in (a, c)$ with $f(x_0) > s - \eps$, and for $x_0 < x < c$ monotonicity gives $s - \eps < f(x_0) \le f(x) \le s$. So $\lim_{x\to c^-}f(x) = s$ (with $\delta = c - x_0$). The right-hand limit is handled in the same way with infima.

By the characterisation of two-sided limits through one-sided ones ([[calculus-1/limits]]), $f$ is continuous at $c$ exactly when both one-sided limits equal $f(c)$, which, given $f(c^-) \le f(c) \le f(c^+)$, happens exactly when $f(c^-) = f(c^+)$.

For each point $c$ of discontinuity, the open interval $J_c = (f(c^-), f(c^+))$ is non-empty; choose a rational number $r(c) \in J_c$. If $c < d$ are two such points, then for any $x \in (c, d)$ we have $f(c^+) \le f(x) \le f(d^-)$, so $J_c$ lies entirely below $J_d$ and the two intervals are disjoint. Hence $r(c) \ne r(d)$: the map $c \mapsto r(c)$ is an injection of the set of discontinuities into $\Q$, which is countable ([[proofs/cardinality]]).
:::

::: corollary Continuous inverse functions {#cor-inverse}
Let $I$ be an interval and $f\colon I \to \R$ continuous and strictly increasing. Then $J = f(I)$ is an interval, and the inverse function $f^{-1}\colon J \to I$ is continuous and strictly increasing.
:::

::: proof
If $y_1 < y < y_2$ with $y_1 = f(x_1)$ and $y_2 = f(x_2)$, the intermediate value theorem on $[x_1, x_2]$ gives $x$ with $f(x) = y$; so $J$ is an interval. The inverse $g = f^{-1}$ is strictly increasing (if $y < y'$ but $g(y) \ge g(y')$, applying $f$ would give $y \ge y'$). Suppose $g$ were discontinuous at an interior point $y_0$ of $J$. By [[#thm-monotone-jumps]], $g(y_0^-) < g(y_0^+)$, so at least one of the intervals $\bigl(g(y_0^-), g(y_0)\bigr)$ and $\bigl(g(y_0), g(y_0^+)\bigr)$ is non-empty; say the first. It lies inside the interval $I$, between $g(y)$ for some $y < y_0$ and $g(y_0)$. But no value of $g$ falls in it: $g(y) \le g(y_0^-)$ for $y < y_0$ and $g(y) \ge g(y_0)$ for $y \ge y_0$. This contradicts $g(J) = I$. At an end-point of $J$ the same argument applies with one-sided limits.
:::

This one corollary gives the continuity of $\sqrt[n]{x}$ on $[0, \infty)$, of $\ln$ on $(0, \infty)$ (the inverse of $\exp$), and of $\arcsin$, $\arccos$, $\arctan$ on their domains — without a single new ε–δ estimate.

::: remark Where can a function be discontinuous?
Thomae's function is discontinuous exactly on $\Q$. Could some function be discontinuous exactly on the *irrationals*, that is, continuous exactly at the rationals? The answer is no: the set of continuity points of any function $\R \to \R$ is a countable intersection of open sets, and the Baire category theorem shows that $\Q$ is not of this form. See Abbott, *Understanding Analysis*, section 4.6, for the full story.
:::

::: history
Bernard Bolzano's 1817 pamphlet gave the first proof of the intermediate value theorem from a definition of continuity, rather than from geometric intuition; Augustin-Louis Cauchy defined continuity in his *Cours d'analyse* (1821) by saying that an infinitely small increment of the variable produces an infinitely small increment of the function. Peter Gustav Lejeune Dirichlet introduced his everywhere-discontinuous function in 1829, in work on Fourier series, as an example of a function that cannot be integrated. Karl Weierstrass proved the extreme value theorem in his Berlin lectures of the 1860s. Eduard Heine published the theorem that a continuous function on a closed bounded interval is uniformly continuous in 1872 (Dirichlet had used the idea in lectures in 1854), and Carl Johannes Thomae described the function named after him in 1875.
:::

## Where this leads

The theorems of this chapter are the foundation of the next two. The mean value theorem of [[real-analysis/differentiation]] is proved from the extreme value theorem, and the integrability of continuous functions in [[real-analysis/riemann-integral]] rests on the Heine–Cantor theorem. In [[real-analysis/uniform-convergence]] we ask when a limit of continuous functions is continuous, and in [[real-analysis/metric-spaces]] the proofs above are seen in their natural generality: continuous images of compact sets are compact, which contains both the boundedness and the extreme value theorems, and continuity can be expressed without ε or δ at all, using open sets ([[topology/continuous-maps]]).

::: summary
- $\lim_{x\to c}f(x) = L$ if and only if $f(x_n) \to L$ for every sequence $x_n \to c$ with $x_n \ne c$ ([[#thm-sequential-limit]]); two sequences with different limits prove that a limit does not exist.
- $f$ is continuous at $c$ when $f(x_n) \to f(c)$ for all $x_n \to c$; sums, products, quotients and compositions of continuous functions are continuous.
- Dirichlet's function is continuous nowhere; Thomae's function is continuous exactly at the irrationals.
- On a closed bounded interval a continuous function is bounded, attains its maximum and minimum ([[#thm-evt]]), takes every intermediate value ([[#thm-ivt]]), and is uniformly continuous ([[#thm-heine-cantor]]). All but the intermediate value property can fail on open or unbounded intervals.
- Uniform continuity: one $\delta$ for the whole domain. To disprove it, find $x_n, y_n$ with $\abs{x_n - y_n} \to 0$ but $\abs{f(x_n) - f(y_n)} \ge \eps_0$.
- Monotone functions have one-sided limits everywhere and at most countably many jumps; continuous strictly monotone functions have continuous inverses.
:::

## Exercises

::: exercise A linear function {level=1}
Prove from [[#def-continuous]] that $f(x) = 3x - 2$ is continuous at every $c \in \R$. Is it uniformly continuous?
::: solution
$\abs{f(x) - f(c)} = 3\abs{x - c}$. Given $\eps > 0$, take $\delta = \eps/3$: if $\abs{x - c} < \delta$ then $\abs{f(x) - f(c)} < \eps$. Since $\delta$ does not depend on $c$, the same computation shows $f$ is uniformly continuous (it is Lipschitz with constant $3$).
:::
:::

::: exercise Removing a discontinuity {level=1 check="3"}
Let $f(x) = \dfrac{\sin 3x}{x}$ for $x \ne 0$ and $f(0) = k$. For which value of $k$ is $f$ continuous at $0$?
::: solution
$f$ is continuous at $0$ exactly when $k = \lim_{x\to0}\frac{\sin 3x}{x} = \lim_{x\to 0}3\cdot\frac{\sin 3x}{3x} = 3$, using the fundamental trigonometric limit of [[calculus-1/limits]]. So $k = 3$.
:::
:::

::: exercise A root of a cubic {level=1}
Prove that $x^3 + x - 1 = 0$ has exactly one real solution, and that it lies in $(0, 1)$.
::: solution
$p(x) = x^3 + x - 1$ is continuous with $p(0) = -1 < 0 < 1 = p(1)$, so by [[#thm-ivt]] it has a root in $(0, 1)$. It has only one root, because $p$ is strictly increasing: if $x < y$ then $x^3 < y^3$ and so $p(x) < p(y)$.
:::
:::

::: exercise A fixed point theorem {level=2}
Let $f\colon [0, 1] \to [0, 1]$ be continuous. Prove that $f$ has a **fixed point**: some $c \in [0,1]$ with $f(c) = c$.
::: hint
Apply the intermediate value theorem to $g(x) = f(x) - x$.
:::
::: solution
$g(x) = f(x) - x$ is continuous on $[0,1]$, with $g(0) = f(0) \ge 0$ and $g(1) = f(1) - 1 \le 0$, because $f$ takes values in $[0, 1]$. So $0$ lies between $g(0)$ and $g(1)$, and [[#thm-ivt]] gives $c$ with $g(c) = 0$, that is $f(c) = c$. (Geometrically, the graph of $f$ must cross the diagonal of the unit square.)
:::
:::

::: exercise Functions that agree on the rationals {level=2}
Let $f, g\colon \R \to \R$ be continuous with $f(q) = g(q)$ for every $q \in \Q$. Prove that $f = g$.
::: solution
Let $x \in \R$. By density of $\Q$ choose rationals $q_n$ with $\abs{q_n - x} < 1/n$, so $q_n \to x$. By [[#thm-sequential-continuity]], $f(q_n) \to f(x)$ and $g(q_n) \to g(x)$. But $f(q_n) = g(q_n)$ for every $n$, so the two limits coincide by uniqueness of limits: $f(x) = g(x)$. (So a continuous function is determined by its values on a dense set.)
:::
:::

::: exercise A bounded Lipschitz function {level=2}
Prove that $f(x) = \dfrac{1}{1 + x^2}$ is uniformly continuous on $\R$.
::: hint
Show that $\abs{f(x) - f(y)} \le \abs{x - y}$, using $\dfrac{\abs{t}}{1 + t^2} \le \dfrac12$.
:::
::: solution
For all $x, y$,

$$
\abs{f(x) - f(y)} = \frac{\abs{y^2 - x^2}}{(1+x^2)(1+y^2)} \le \abs{x - y}\left(\frac{\abs{x}}{(1+x^2)(1+y^2)} + \frac{\abs{y}}{(1+x^2)(1+y^2)}\right) \le \abs{x - y}\left(\frac12 + \frac12\right),
$$

using $\abs{x + y} \le \abs x + \abs y$, then dropping one factor $\ge 1$ from each denominator and applying $\frac{\abs t}{1+t^2} \le \frac12$ (equivalent to $(\abs t - 1)^2 \ge 0$). So $f$ is Lipschitz with constant $1$, and $\delta = \eps$ works.
:::
:::

::: exercise Continuous at exactly one point {level=2}
Let $D$ be Dirichlet's function. Prove that $f(x) = x\,D(x)$ is continuous at $0$ and discontinuous at every $c \ne 0$.
::: solution
At $0$: $\abs{f(x) - f(0)} = \abs{x}D(x) \le \abs{x}$, so $\delta = \eps$ works. At $c \ne 0$: choose rationals $q_n \to c$ and irrationals $r_n \to c$. Then $f(q_n) = q_n \to c$ and $f(r_n) = 0 \to 0$. Since $c \ne 0$, these limits differ, so they cannot both equal $f(c)$, and [[#thm-sequential-continuity]] shows $f$ is not continuous at $c$.
:::
:::

::: exercise Uniform continuity and boundedness {level=3}
Prove that a uniformly continuous function $f\colon (0, 1) \to \R$ is bounded. Deduce again that $1/x$ is not uniformly continuous on $(0,1)$.
::: hint
Take $\delta$ for $\eps = 1$, and cover $(0, 1)$ by finitely many intervals of length less than $\delta$.
:::
::: solution
Choose $\delta > 0$ such that $\abs{x - y} < \delta$ implies $\abs{f(x) - f(y)} < 1$. Choose $m \in \N$ with $1/m < \delta$, and consider the points $p_k = k/(m+1)$ for $k = 1, \dots, m$, which lie in $(0, 1)$. Every $x \in (0, 1)$ is within $\frac{1}{m+1} < \delta$ of some $p_k$ (the nearest grid point $k/(m+1)$ with $1 \le k \le m$). Hence $\abs{f(x)} \le \abs{f(p_k)} + 1 \le \max_{1\le k\le m}\abs{f(p_k)} + 1$ for every $x \in (0,1)$, a bound independent of $x$. Since $1/x$ is unbounded on $(0, 1)$, it cannot be uniformly continuous there.
:::
:::

::: exercise Vanishing at infinity {level=3}
Let $f\colon \R \to \R$ be continuous with $\lim_{x\to\infty}f(x) = \lim_{x\to-\infty}f(x) = 0$. Prove that $f$ is uniformly continuous.
::: hint
Outside a large interval $[-R, R]$ the function is within $\eps/2$ of $0$; inside a slightly larger interval use [[#thm-heine-cantor]].
:::
::: solution
Let $\eps > 0$. Choose $R > 0$ with $\abs{f(x)} < \eps/2$ whenever $\abs x \ge R$. By [[#thm-heine-cantor]], $f$ is uniformly continuous on $[-R-1, R+1]$: there is $\delta_1 > 0$ such that $x, y \in [-R-1, R+1]$ and $\abs{x - y} < \delta_1$ imply $\abs{f(x) - f(y)} < \eps$. Let $\delta = \min(\delta_1, 1)$ and suppose $\abs{x - y} < \delta$. If both $x$ and $y$ lie in $[-R-1, R+1]$, then $\abs{f(x) - f(y)} < \eps$. Otherwise one of them, say $x$, has $\abs{x} > R + 1$; then $\abs{y} > R$ because $\abs{x - y} < 1$, and $\abs{f(x) - f(y)} \le \abs{f(x)} + \abs{f(y)} < \eps/2 + \eps/2 = \eps$.
:::
:::

::: exercise Swapping rationals and irrationals {level=3}
Prove that there is no continuous function $f\colon \R \to \R$ that maps every rational number to an irrational number and every irrational number to a rational number.
::: hint
The image $f(\R)$ is an interval (by the intermediate value theorem); show that it is countable.
:::
::: solution
Suppose such an $f$ exists. By [[#thm-ivt]] the image $f(\R)$ is an interval: if $f(x_1) < y < f(x_2)$, some point between $x_1$ and $x_2$ is mapped to $y$. On the other hand $f(\R) = f(\Q) \cup f(\R\setminus\Q)$, where $f(\Q)$ is countable (the image of a countable set) and $f(\R\setminus\Q) \subseteq \Q$ is countable. So $f(\R)$ is a countable interval. An interval containing two points $u < v$ contains all of $[u, v]$, which is uncountable ([[real-analysis/real-numbers#thm-r-uncountable]]); so $f(\R)$ is a single point and $f$ is constant, say $f \equiv k$. But then $k = f(0)$ is irrational (as $0 \in \Q$) and $k = f(\sqrt2)$ is rational, which is impossible.
:::
:::
