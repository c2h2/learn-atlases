"The integral is the area under the graph" is a fine intuition and a poor definition. Area is itself something that needs defining, and for wild functions — Dirichlet's function, which is $1$ on the rationals and $0$ elsewhere — it is not at all clear what the area under the graph should be. Calculus sidesteps the problem by computing integrals with antiderivatives, but that raises two questions of its own. Which functions *have* an integral? And why does differentiation undo integration?

This chapter answers both questions for the integral of Riemann, in the form given to it by Darboux. The idea is to trap the area between two step functions, one above the graph and one below: **upper and lower sums**. A function is integrable when the two can be squeezed together. We prove that continuous functions and monotone functions are integrable, that Dirichlet's function is not, and that Thomae's function — discontinuous at every rational number — is; and we prove both halves of the fundamental theorem of calculus, with hypotheses that are as weak as possible.

## Partitions and Darboux sums

Throughout, $f\colon[a, b] \to \R$ is a **bounded** function on a closed bounded interval with $a < b$. Boundedness is essential: Riemann's integral is designed for bounded functions on bounded intervals, and unbounded functions or intervals are handled afterwards by limits (the improper integrals of [[calculus-1/improper-integrals]]).

::: definition Partition {#def-partition}
A **partition** of $[a, b]$ is a finite set $P = \set{x_0, x_1, \dots, x_n}$ with

$$
a = x_0 < x_1 < x_2 < \cdots < x_n = b.
$$

Its subintervals are $[x_{k-1}, x_k]$, of lengths $\Delta x_k = x_k - x_{k-1}$. A partition $Q$ is a **refinement** of $P$ if $P \subseteq Q$, that is, $Q$ contains all the points of $P$ and possibly more.
:::

Any two partitions $P_1$, $P_2$ have a **common refinement** $P_1 \cup P_2$. The **uniform partition** into $n$ pieces has $x_k = a + k(b - a)/n$.

::: definition Upper and lower sums {#def-darboux}
For a partition $P$ of $[a, b]$ let

$$
M_k = \sup\set{f(x) : x \in [x_{k-1}, x_k]}, \qquad m_k = \inf\set{f(x) : x \in [x_{k-1}, x_k]},
$$

which exist because $f$ is bounded. The **upper** and **lower Darboux sums** of $f$ for $P$ are

$$
U(f, P) = \sum_{k=1}^n M_k\,\Delta x_k, \qquad L(f, P) = \sum_{k=1}^n m_k\,\Delta x_k.
$$
:::

Geometrically, $U(f, P)$ is the area under a step function lying above the graph, and $L(f, P)$ the area under one lying below. Clearly $L(f, P) \le U(f, P)$, since $m_k \le M_k$. Refining a partition can only improve both approximations.

::: lemma Refinement {#lem-refinement}
If $Q$ is a refinement of $P$, then

$$
L(f, P) \le L(f, Q) \le U(f, Q) \le U(f, P).
$$

Consequently $L(f, P_1) \le U(f, P_2)$ for **any** two partitions $P_1$, $P_2$.
:::

::: proof
It suffices to add one point, since $Q$ is obtained from $P$ by adding finitely many points one at a time. Suppose $Q = P \cup \set{y}$ with $x_{k-1} < y < x_k$. All terms of $U(f, P)$ and $U(f, Q)$ agree except that the term $M_k(x_k - x_{k-1})$ is replaced by $M'(y - x_{k-1}) + M''(x_k - y)$, where $M'$ and $M''$ are the suprema of $f$ over $[x_{k-1}, y]$ and $[y, x_k]$. A supremum over a smaller set is smaller, so $M', M'' \le M_k$ and

$$
M'(y - x_{k-1}) + M''(x_k - y) \le M_k(y - x_{k-1}) + M_k(x_k - y) = M_k(x_k - x_{k-1}).
$$

Hence $U(f, Q) \le U(f, P)$. The same argument with infima gives $L(f, P) \le L(f, Q)$, and $L(f, Q) \le U(f, Q)$ always.

For any $P_1$, $P_2$, apply this to the common refinement $Q = P_1 \cup P_2$: $L(f, P_1) \le L(f, Q) \le U(f, Q) \le U(f, P_2)$.
:::

So every lower sum lies below every upper sum. The set of lower sums is therefore bounded above (by any upper sum), and the set of upper sums bounded below — and completeness ([[real-analysis/real-numbers#ax-completeness]]) delivers the best possible bounds.

::: definition Riemann integrable function {#def-integrable}
The **upper integral** and **lower integral** of $f$ are

$$
U(f) = \inf_P U(f, P), \qquad L(f) = \sup_P L(f, P),
$$

taken over all partitions $P$ of $[a, b]$. By [[#lem-refinement]], $L(f) \le U(f)$. The function $f$ is **(Riemann) integrable** on $[a, b]$ if $L(f) = U(f)$, and then the common value is its **integral**, written $\int_a^b f$ or $\int_a^b f(x)\,dx$.
:::

::: example Integrating x² from the definition {#ex-square}
Show that $f(x) = x^2$ is integrable on $[0, 1]$ and that $\int_0^1 x^2\,dx = \frac13$.
::: solution
Let $P_n$ be the uniform partition with $x_k = k/n$. Since $f$ increases on $[0, 1]$, its supremum on $[x_{k-1}, x_k]$ is $f(x_k) = k^2/n^2$ and its infimum is $f(x_{k-1})$. Using $\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}$,

$$
U(f, P_n) = \sum_{k=1}^n\frac{k^2}{n^2}\cdot\frac1n = \frac{(n+1)(2n+1)}{6n^2}, \qquad L(f, P_n) = \sum_{k=1}^n\frac{(k-1)^2}{n^3} = \frac{(n-1)(2n-1)}{6n^2}.
$$

Both tend to $\frac13$. Since $L(f, P_n) \le L(f) \le U(f) \le U(f, P_n)$ for every $n$, letting $n \to \infty$ gives $\frac13 \le L(f) \le U(f) \le \frac13$. So $f$ is integrable and $\int_0^1 x^2\,dx = \frac13$. Note that $U(f, P_n) - L(f, P_n) = \frac1n$ exactly.
:::
:::

::: widget riemann
f: x^2
a: 0
b: 1
n: 6
method: upper
caption: Upper Darboux sum for $x^2$ on $[0, 1]$. Each rectangle reaches the highest point of the graph over its base, so the total overestimates the area. Increase $n$: the excess shrinks, and for this increasing function the gap between the upper and lower sums is exactly $U - L = 1/n$ — the sum of the little steps between the upper and lower rectangles. Switch the method to *lower* to see the matching underestimate.
:::

::: example Dirichlet's function is not integrable {#ex-dirichlet-integral}
Let $D(x) = 1$ for rational $x$ and $D(x) = 0$ for irrational $x$. Show that $D$ is not integrable on $[0, 1]$.
::: solution
Every subinterval $[x_{k-1}, x_k]$ of positive length contains both rational and irrational numbers ([[real-analysis/real-numbers#thm-q-dense]]), so $M_k = 1$ and $m_k = 0$ for every $k$ and every partition. Hence $U(D, P) = \sum\Delta x_k = 1$ and $L(D, P) = 0$ for every $P$, so $U(D) = 1 \ne 0 = L(D)$. The upper and lower step functions can never be brought together. (In [[measure-theory/lebesgue-integral]] this function becomes integrable, with integral $0$.)
:::
:::

## Criteria for integrability

Computing $\sup$ and $\inf$ over all partitions is impractical. Riemann's criterion reduces integrability to finding, for each $\eps$, *one* good partition.

::: theorem Riemann's criterion {#thm-riemann-criterion}
A bounded function $f$ on $[a, b]$ is integrable if and only if for every $\eps > 0$ there is a partition $P$ with

$$
U(f, P) - L(f, P) < \eps.
$$
:::

::: proof
Suppose the condition holds. For any $\eps > 0$ and the corresponding $P$,

$$
L(f, P) \le L(f) \le U(f) \le U(f, P), \qquad\text{so}\qquad 0 \le U(f) - L(f) \le U(f, P) - L(f, P) < \eps.
$$

As this holds for every $\eps > 0$, $U(f) = L(f)$ by the ε-principle ([[real-analysis/real-numbers#lem-eps-principle]]).

Conversely, suppose $f$ is integrable with integral $I$, and let $\eps > 0$. By the approximation property of infima and suprema there are partitions $P_1$, $P_2$ with $U(f, P_1) < I + \eps/2$ and $L(f, P_2) > I - \eps/2$. For the common refinement $P = P_1 \cup P_2$, [[#lem-refinement]] gives

$$
U(f, P) - L(f, P) \le U(f, P_1) - L(f, P_2) < (I + \tfrac\eps2) - (I - \tfrac\eps2) = \eps.
$$
:::

In practice we often exhibit partitions $P_n$ with $U(f, P_n) - L(f, P_n) \to 0$; then $f$ is integrable, and both $U(f, P_n)$ and $L(f, P_n)$ converge to $\int_a^b f$, exactly as in [[#ex-square]]. The quantity $M_k - m_k$, the **oscillation** of $f$ on the $k$-th subinterval, is what must be controlled: $U - L = \sum(M_k - m_k)\Delta x_k$ is small when $f$ oscillates little on most of the interval, and when the subintervals on which it oscillates a lot are short.

::: theorem Continuous functions are integrable {#thm-continuous-integrable}
Every continuous function $f\colon [a, b] \to \R$ is integrable.
:::

::: proof
A continuous function on $[a, b]$ is bounded ([[real-analysis/continuity#thm-bounded]]) and, by the Heine–Cantor theorem ([[real-analysis/continuity#thm-heine-cantor]]), uniformly continuous. Let $\eps > 0$ and choose $\delta > 0$ such that $\abs{x - y} < \delta$ implies $\abs{f(x) - f(y)} < \eps/(b - a)$. Let $P$ be any partition with all $\Delta x_k < \delta$. On each subinterval $f$ attains its maximum $M_k$ and minimum $m_k$ ([[real-analysis/continuity#thm-evt]]), at points less than $\delta$ apart, so $M_k - m_k < \eps/(b - a)$. Hence

$$
U(f, P) - L(f, P) = \sum_{k=1}^n (M_k - m_k)\Delta x_k < \frac{\eps}{b - a}\sum_{k=1}^n\Delta x_k = \eps,
$$

and [[#thm-riemann-criterion]] applies.
:::

Uniform continuity is exactly what is needed: one $\delta$ makes *every* rectangle accurate at once. Monotone functions may have infinitely many jumps, but they are integrable too, for a different reason.

::: theorem Monotone functions are integrable {#thm-monotone-integrable}
Every monotone function $f\colon [a, b] \to \R$ is integrable.
:::

::: proof
Suppose $f$ is increasing (otherwise consider $-f$); it is bounded by $f(a)$ and $f(b)$. For the uniform partition $P_n$ into $n$ pieces, $M_k = f(x_k)$ and $m_k = f(x_{k-1})$, so the differences telescope:

$$
U(f, P_n) - L(f, P_n) = \sum_{k=1}^n\bigl(f(x_k) - f(x_{k-1})\bigr)\frac{b - a}{n} = \frac{\bigl(f(b) - f(a)\bigr)(b - a)}{n}.
$$

This tends to $0$, so $f$ is integrable by [[#thm-riemann-criterion]].
:::

::: widget riemann
f: floor(4x)/4 + x/4
a: 0
b: 1
n: 6
method: upper
caption: An increasing step-like function with jumps at $\tfrac14, \tfrac12, \tfrac34$ and at the end-point $1$. Its upper sums still converge to the integral: by the telescoping argument in [[#thm-monotone-integrable]], $U - L = (f(1) - f(0))/n$ whatever the jumps. Increase $n$ and watch the rectangles that straddle a jump — they are the only ones with a large overshoot, and their width tends to $0$.
:::

::: example Thomae's function is integrable {#ex-thomae-integral}
Let $T$ be Thomae's function ([[real-analysis/continuity#ex-thomae]]): $T(p/q) = 1/q$ for rationals in lowest terms and $T(x) = 0$ for irrational $x$. Show that $T$ is integrable on $[0, 1]$ and $\int_0^1 T = 0$.
::: solution
*Lower sums.* Every subinterval contains an irrational point, where $T = 0$, and $T \ge 0$; so $m_k = 0$ and $L(T, P) = 0$ for every partition $P$.

*Upper sums.* Let $\eps > 0$. Only finitely many points $x \in [0, 1]$ have $T(x) \ge \eps/2$: they are rationals $p/q$ with $q \le 2/\eps$ and $0 \le p \le q$. Call their number $N$. Take the uniform partition $P$ into $n$ subintervals. Each of the $N$ points lies in at most two subintervals, so at most $2N$ subintervals contain such a point; on them $M_k \le 1$, and their total length is at most $2N/n$. On every other subinterval $M_k \le \eps/2$. Hence

$$
U(T, P) \le \frac{2N}{n}\cdot1 + \frac{\eps}{2}\cdot 1 < \eps \qquad\text{if } n > \frac{4N}{\eps}.
$$

So $U(T, P) - L(T, P) < \eps$, $T$ is integrable by [[#thm-riemann-criterion]], and since all lower sums are $0$, $\int_0^1 T = L(T) = 0$.
:::
:::

Thomae's function is discontinuous at infinitely many points — every rational — yet integrable, while Dirichlet's function, discontinuous everywhere, is not. The exact dividing line was found by Lebesgue. A set $Z \subseteq \R$ has **measure zero** if for every $\eps > 0$ it can be covered by countably many open intervals of total length less than $\eps$. Every countable set has measure zero: cover its $n$-th point by an interval of length $\eps/2^{n+1}$.

::: theorem Lebesgue's criterion {#thm-lebesgue-criterion}
A bounded function $f\colon [a, b] \to \R$ is Riemann integrable if and only if the set of points at which $f$ is discontinuous has measure zero.
:::

::: proof {collapsed}
*Sketch.* For $\alpha > 0$ let $D_\alpha$ be the set of points where the oscillation of $f$ is at least $\alpha$ (the oscillation at $x$ is the limit, as $\delta \to 0$, of $\sup f - \inf f$ over $(x - \delta, x + \delta)\cap[a,b]$). The set of discontinuities is $D = \bigcup_{m} D_{1/m}$. Each $D_\alpha$ is closed and bounded, hence compact. If $D$ has measure zero, cover $D_\alpha$ by finitely many open intervals of small total length (compactness reduces countably many to finitely many, see [[real-analysis/metric-spaces#thm-heine-borel]]); on these intervals the contribution to $U - L$ is at most $2\sup\abs{f}$ times their length, and on the rest of $[a,b]$ the oscillation is below $\alpha$, which by a uniform-continuity-type argument contributes at most about $\alpha(b - a)$. Conversely, if some $D_{1/m}$ does not have measure zero, then every partition has subintervals containing points of $D_{1/m}$ in their interiors whose total length is bounded below, and $U - L$ cannot be made small. A complete proof is in Abbott, *Understanding Analysis*, section 7.6; a measure-theoretic proof is in [[measure-theory/lebesgue-integral]].
:::

With Lebesgue's criterion: Thomae's function is discontinuous exactly on $\Q$, which is countable, so it is integrable; Dirichlet's function is discontinuous everywhere, and $[0, 1]$ does not have measure zero, so it is not.

::: quiz
Which of these functions are Riemann integrable on $[0, 1]$? Select all that apply.
- [x] $f(x) = 0$ for $x < \tfrac12$, $f(x) = 1$ for $x \ge \tfrac12$
- [x] Thomae's function
- [ ] Dirichlet's function
- [ ] $g(x) = 1/x$ for $x > 0$, $g(0) = 0$
::: solution
The step function is monotone, hence integrable by [[#thm-monotone-integrable]] (or: it has one discontinuity). Thomae's function is integrable by [[#ex-thomae-integral]], and Dirichlet's is not ([[#ex-dirichlet-integral]]). The function $g$ is continuous on $(0, 1]$ but unbounded, so its upper sums are all infinite: it is not Riemann integrable at all — the improper integral $\int_0^1 dx/x$ diverges as well.
:::
:::

## Properties of the integral

::: theorem Properties of the integral {#thm-integral-properties}
Let $f$ and $g$ be integrable on $[a, b]$ and $\lambda \in \R$.

1. (**Linearity.**) $f + g$ and $\lambda f$ are integrable, with $\int_a^b(f + g) = \int_a^b f + \int_a^b g$ and $\int_a^b\lambda f = \lambda\int_a^b f$.
2. (**Monotonicity.**) If $f \le g$ on $[a, b]$, then $\int_a^b f \le \int_a^b g$.
3. (**Additivity.**) If $a < c < b$, then $f$ is integrable on $[a, c]$ and on $[c, b]$, and $\int_a^b f = \int_a^c f + \int_c^b f$. Conversely, a function integrable on $[a, c]$ and $[c, b]$ is integrable on $[a, b]$.
4. (**Absolute value.**) $\abs{f}$ is integrable and $\bigl\lvert\int_a^b f\bigr\rvert \le \int_a^b\abs{f}$.
:::

::: proof
(1) On any subinterval, $\sup(f + g) \le \sup f + \sup g$ and $\inf(f + g) \ge \inf f + \inf g$, so

$$
L(f, P) + L(g, P) \le L(f + g, P) \le U(f + g, P) \le U(f, P) + U(g, P).
$$

Given $\eps > 0$, choose partitions with $U - L < \eps/2$ for $f$ and for $g$, and let $P$ be their common refinement (which only improves both, by [[#lem-refinement]]). Then $U(f + g, P) - L(f + g, P) < \eps$, so $f + g$ is integrable. Both $\int(f + g)$ and $\int f + \int g$ lie in the interval $[L(f,P) + L(g,P),\ U(f,P) + U(g,P)]$, of length less than $\eps$; as $\eps$ is arbitrary, they are equal. For $\lambda \ge 0$, $U(\lambda f, P) = \lambda U(f, P)$ and $L(\lambda f, P) = \lambda L(f, P)$; for $\lambda < 0$ suprema and infima swap, $U(\lambda f, P) = \lambda L(f, P)$ and $L(\lambda f, P) = \lambda U(f, P)$. Either way $\lambda f$ is integrable with integral $\lambda\int f$.

(2) $h = g - f \ge 0$ is integrable by (1), and every lower sum of $h$ is $\ge 0$, so $\int h = L(h) \ge 0$. By (1), $\int g - \int f = \int h \ge 0$.

(3) Partitions of $[a, b]$ containing $c$ are exactly unions of a partition $P'$ of $[a, c]$ and a partition $P''$ of $[c, b]$, and then $U(f, P) = U(f, P') + U(f, P'')$, and similarly for $L$. Since adding $c$ to a partition only decreases $U - L$, Riemann's criterion on $[a, b]$ can be checked with partitions containing $c$; and $U - L$ on $[a, b]$ is the sum of the (non-negative) differences on $[a, c]$ and $[c, b]$, so it is small if and only if both are. The equation follows because $\int_a^c f + \int_c^b f$ and $\int_a^b f$ both lie between $L(f, P') + L(f, P'')$ and $U(f, P') + U(f, P'')$.

(4) For $x, y$ in a subinterval, $\abs{f(x)} - \abs{f(y)} \le \abs{f(x) - f(y)} \le M_k - m_k$. Taking the supremum over $x$ and the infimum over $y$ shows that the oscillation of $\abs{f}$ on each subinterval is at most that of $f$, so $U(\abs f, P) - L(\abs f, P) \le U(f, P) - L(f, P)$ and $\abs f$ is integrable by Riemann's criterion. Finally $-\abs{f} \le f \le \abs{f}$, and (2) gives $-\int\abs f \le \int f \le \int\abs f$.
:::

We also use the conventions $\int_a^a f = 0$ and $\int_b^a f = -\int_a^b f$, which make $\int_a^b f = \int_a^c f + \int_c^b f$ true for any order of $a, b, c$. Products of integrable functions are integrable too ([[#exr-6-8]]).

::: remark Riemann sums
Riemann's original definition used **Riemann sums** $\sum f(t_k)\Delta x_k$ with arbitrary sample points $t_k \in [x_{k-1}, x_k]$. Every Riemann sum lies between $L(f, P)$ and $U(f, P)$, and one can show that $f$ is integrable in our sense if and only if its Riemann sums converge to a limit as the mesh $\max_k\Delta x_k$ tends to $0$, the limit being $\int_a^b f$. So the two definitions agree; see Bartle and Sherbert, *Introduction to Real Analysis*, chapter 7. The midpoint and trapezoidal rules of [[numerical-analysis/numerical-integration]] are Riemann sums (or averages of them) chosen for accuracy.
:::

## The fundamental theorem of calculus

Calculus rests on the fact that integration and differentiation are inverse processes. There are two halves to this statement, and they need different hypotheses. The first evaluates integrals with antiderivatives.

::: theorem Fundamental theorem of calculus, evaluation form {#thm-ftc2}
Let $f$ be integrable on $[a, b]$, and let $F$ be continuous on $[a, b]$ and differentiable on $(a, b)$ with $F'(x) = f(x)$ for all $x \in (a, b)$. Then

$$
\int_a^b f(x)\,dx = F(b) - F(a).
$$ {#eq-ftc}
:::

::: proof
Let $P = \set{x_0, \dots, x_n}$ be any partition of $[a, b]$. By the mean value theorem ([[real-analysis/differentiation#thm-mvt]]) on each $[x_{k-1}, x_k]$ there is $t_k \in (x_{k-1}, x_k)$ with $F(x_k) - F(x_{k-1}) = F'(t_k)\Delta x_k = f(t_k)\Delta x_k$. Summing, the left-hand sides telescope:

$$
F(b) - F(a) = \sum_{k=1}^n\bigl(F(x_k) - F(x_{k-1})\bigr) = \sum_{k=1}^n f(t_k)\,\Delta x_k.
$$

Since $m_k \le f(t_k) \le M_k$, this gives $L(f, P) \le F(b) - F(a) \le U(f, P)$ for every partition. Hence $L(f) \le F(b) - F(a) \le U(f)$, and as $f$ is integrable both bounds equal $\int_a^b f$.
:::

Notice what is *not* assumed: $f$ need not be continuous. But it must be integrable, and that is not automatic. In 1881 Volterra constructed a differentiable function $F$ whose derivative is bounded but not Riemann integrable; for such $F$ the left side of [[#eq-ftc]] does not exist. (The Lebesgue integral of [[measure-theory/lebesgue-integral]] repairs this case.)

The second half goes the other way: integrate, then differentiate.

::: theorem Fundamental theorem of calculus, differentiation form {#thm-ftc1}
Let $f$ be integrable on $[a, b]$ and define $F(x) = \int_a^x f(t)\,dt$ for $x \in [a, b]$. Then:

1. $F$ is Lipschitz, and hence (uniformly) continuous: if $\abs{f} \le M$ then $\abs{F(x) - F(y)} \le M\abs{x - y}$;
2. if $f$ is continuous at $c \in [a, b]$, then $F$ is differentiable at $c$ and $F'(c) = f(c)$.
:::

::: proof
(1) For $a \le y < x \le b$, additivity gives $F(x) - F(y) = \int_y^x f$, and by monotonicity and the absolute value property, $\abs{F(x) - F(y)} \le \int_y^x\abs{f} \le M(x - y)$.

(2) For $x \ne c$ in $[a, b]$, since $\int_c^x f(c)\,dt = f(c)(x - c)$,

$$
\frac{F(x) - F(c)}{x - c} - f(c) = \frac{1}{x - c}\int_c^x\bigl(f(t) - f(c)\bigr)\,dt.
$$

Let $\eps > 0$ and choose $\delta > 0$ with $\abs{f(t) - f(c)} < \eps$ whenever $t \in [a,b]$ and $\abs{t - c} < \delta$. If $0 < \abs{x - c} < \delta$, every $t$ between $c$ and $x$ satisfies $\abs{t - c} < \delta$, so the integral has absolute value at most $\eps\abs{x - c}$, and the right-hand side is at most $\eps$ in absolute value. Hence $\frac{F(x) - F(c)}{x - c} \to f(c)$.
:::

In particular **every continuous function has an antiderivative**, namely $x \mapsto \int_a^x f$, even when no formula for it exists (as for $e^{-x^2}$). Combined with [[#thm-ftc2]], this gives the familiar procedure: to integrate a continuous function, find any antiderivative and subtract its values at the end-points.

::: example Where the antiderivative breaks {#ex-sign-integral}
Let $f = \sgn$ on $[-1, 1]$ (so $f = -1$ on $[-1, 0)$, $f(0) = 0$, $f = 1$ on $(0, 1]$), and $F(x) = \int_{-1}^x f$. Find $F$, and check the conclusions of [[#thm-ftc1]].
::: solution
$f$ is monotone, hence integrable. For $x \le 0$, $f = -1$ on $[-1, x)$, and the single point $x$ does not affect the integral ([[#exr-6-3]]), so $F(x) = -(x + 1)$. For $x > 0$, additivity gives $F(x) = F(0) + \int_0^x f = -1 + x$. So $F(x) = \abs{x} - 1$. This is Lipschitz with constant $1 = \sup\abs f$, as part 1 predicts. It is differentiable with $F' = f$ at every $x \ne 0$, where $f$ is continuous, and not differentiable at $0$, where $f$ jumps. The jump in $f$ becomes a corner in $F$: integration smooths functions by one degree.
:::
:::

::: widget plot
f: sign(x); abs(x) - 1
x: -1, 1
y: -1.3, 1.3
labels: f = \operatorname{sgn}; F(x) = \int_{-1}^x f = \lvert x\rvert - 1
caption: The sign function and its integral function $F(x) = \int_{-1}^x \operatorname{sgn}$. $F$ is continuous everywhere — integrals of bounded functions always are — and its slope is $f(x)$ wherever $f$ is continuous. At $x = 0$, where $f$ jumps, $F$ has a corner and no derivative: the second part of [[#thm-ftc1]] really needs continuity at the point.
:::

The same example with Thomae's function is even more striking: $F(x) = \int_0^x T = 0$ for every $x$, so $F' = 0$ everywhere, which agrees with $T$ exactly at the irrationals — the points where $T$ is continuous.

::: quiz
Let $G(x) = \displaystyle\int_0^{x^2}\cos t\,dt$. What is $G'(x)$?
- [ ] $\cos(x^2)$
- [x] $2x\cos(x^2)$
- [ ] $\cos(x^2) - 1$
- [ ] $\sin(x^2)$
::: solution
$G = F\circ q$ with $F(u) = \int_0^u\cos t\,dt$ and $q(x) = x^2$. By [[#thm-ftc1]], $F'(u) = \cos u$ (cosine is continuous), and by the chain rule $G'(x) = F'(x^2)\cdot 2x = 2x\cos(x^2)$. (Here $G(x) = \sin(x^2)$, whose derivative confirms the answer.)
:::
:::

The two standard techniques of integration are the fundamental theorem combined with the product and chain rules.

::: corollary Integration by parts and substitution {#cor-parts}
1. If $u$ and $v$ have continuous derivatives on $[a, b]$, then $\displaystyle\int_a^b u\,v' = u(b)v(b) - u(a)v(a) - \int_a^b u'\,v$.
2. If $\varphi$ has a continuous derivative on $[a, b]$ and $f$ is continuous on an interval containing $\varphi([a, b])$, then $\displaystyle\int_a^b f\bigl(\varphi(t)\bigr)\varphi'(t)\,dt = \int_{\varphi(a)}^{\varphi(b)} f(x)\,dx$.
:::

::: proof
(1) $uv$ has the continuous derivative $u'v + uv'$, so by [[#thm-ftc2]] $\int_a^b(u'v + uv') = u(b)v(b) - u(a)v(a)$; split the integral by linearity. (2) Let $F$ be an antiderivative of $f$ (it exists by [[#thm-ftc1]]). By the chain rule $(F\circ\varphi)' = f(\varphi)\varphi'$, which is continuous, so [[#thm-ftc2]] gives $\int_a^b f(\varphi(t))\varphi'(t)\,dt = F(\varphi(b)) - F(\varphi(a)) = \int_{\varphi(a)}^{\varphi(b)}f$.
:::

::: warning Antiderivatives must exist on the whole interval
[[#thm-ftc2]] needs $F' = f$ at every point of $(a, b)$. The "computation" $\int_{-1}^1\frac{dx}{x^2} = \bigl[-\tfrac1x\bigr]_{-1}^1 = -2$ is nonsense: the integrand is positive, and $-1/x$ is not an antiderivative across $x = 0$, where $1/x^2$ is not even bounded. Always check that the antiderivative is differentiable on the whole open interval and that the integrand is integrable.
:::

::: history
Augustin-Louis Cauchy defined the integral of a continuous function as a limit of sums in 1823 and proved the fundamental theorem for continuous integrands. Bernhard Riemann, in his Habilitation thesis of 1854 on trigonometric series (published in 1867), freed the definition from continuity, allowed arbitrary sample points, and asked which functions are integrable, giving a criterion in terms of oscillations. Gaston Darboux recast the theory in 1875 with the upper and lower sums used here. In 1881 Vito Volterra, then a student, constructed a function with a bounded derivative that is not Riemann integrable, exposing a gap in the fundamental theorem. Henri Lebesgue's thesis of 1902 characterised the Riemann integrable functions through sets of measure zero and introduced the more powerful integral that bears his name.
:::

## Where this leads

The Riemann integral is enough for continuous functions, but it behaves badly under limits: the pointwise limit of integrable functions need not be integrable (enumerate the rationals and switch them on one at a time to approach Dirichlet's function), and even when it is, the limit of the integrals may be wrong. [[real-analysis/uniform-convergence]] shows that *uniform* convergence cures both problems, and [[measure-theory/sigma-algebras]] begins the construction of Lebesgue's integral, which handles pointwise limits through the monotone and dominated convergence theorems of [[measure-theory/lebesgue-integral]]. Multiple integrals ([[multivariable/multiple-integrals]]) are built from rectangles in exactly the way we built single integrals from intervals, and numerical integration ([[numerical-analysis/numerical-integration]]) turns Riemann sums into accurate algorithms.

::: summary
- For bounded $f$ on $[a, b]$, upper and lower Darboux sums trap the area; refining a partition lowers $U$ and raises $L$, and every lower sum is at most every upper sum ([[#lem-refinement]]).
- $f$ is integrable when $\sup_P L(f, P) = \inf_P U(f, P)$; equivalently, for every $\eps$ some partition has $U - L < \eps$ (Riemann's criterion, [[#thm-riemann-criterion]]).
- Continuous functions (via uniform continuity) and monotone functions (via telescoping) are integrable; Dirichlet's function is not; Thomae's function is, with integral $0$.
- Lebesgue's criterion: a bounded function is integrable exactly when its discontinuities form a set of measure zero.
- The integral is linear, monotone, additive over intervals, and $\abs{\int f} \le \int\abs f$.
- FTC: if $F' = f$ on $(a,b)$ and $f$ is integrable, then $\int_a^b f = F(b) - F(a)$ ([[#thm-ftc2]]); and $F(x) = \int_a^x f$ is Lipschitz with $F'(c) = f(c)$ wherever $f$ is continuous ([[#thm-ftc1]]).
:::

## Exercises

::: exercise A linear function {level=1 check="2"}
Compute $U(f, P_n)$ and $L(f, P_n)$ for $f(x) = x$ on $[0, 2]$ with the uniform partition into $n$ pieces, and deduce the value of $\int_0^2 x\,dx$.
::: solution
Here $x_k = 2k/n$ and $\Delta x_k = 2/n$; $f$ increases, so $M_k = 2k/n$ and $m_k = 2(k-1)/n$. Then

$$
U(f, P_n) = \sum_{k=1}^n\frac{2k}{n}\cdot\frac2n = \frac{4}{n^2}\cdot\frac{n(n+1)}{2} = 2 + \frac2n, \qquad L(f, P_n) = 2 - \frac2n.
$$

$U - L = 4/n \to 0$, so $f$ is integrable and the integral, squeezed between $2 - \frac2n$ and $2 + \frac2n$ for every $n$, equals $2$.
:::
:::

::: exercise Using the fundamental theorem {level=1 check="1/4"}
Evaluate $\int_0^1 x^3\,dx$, stating which theorem justifies each step.
::: solution
$f(x) = x^3$ is continuous, hence integrable ([[#thm-continuous-integrable]]). $F(x) = x^4/4$ is differentiable with $F' = f$, so by [[#thm-ftc2]] the integral is $F(1) - F(0) = \frac14$.
:::
:::

::: exercise One point does not matter {level=1}
Let $c \in [a, b]$ and let $h(x) = 0$ for $x \ne c$, $h(c) = 1$. Prove that $h$ is integrable with $\int_a^b h = 0$. Deduce that changing an integrable function at one point (and hence at finitely many points) changes neither its integrability nor its integral.
::: solution
All lower sums are $0$, since every subinterval contains points other than $c$. Given $\eps > 0$, take a uniform partition with mesh $(b-a)/n < \eps/2$. The point $c$ lies in at most two subintervals, on which $M_k = 1$; elsewhere $M_k = 0$. So $U(h, P) \le 2(b-a)/n < \eps$, and Riemann's criterion gives integrability with $\int h = L(h) = 0$. If $g$ differs from an integrable $f$ only at $c$, then $g = f + \lambda h$ with $\lambda = g(c) - f(c)$, which is integrable with the same integral by linearity. Repeat for finitely many points.
:::
:::

::: exercise A vanishing integral {level=2}
Let $f$ be continuous on $[a, b]$ with $f \ge 0$ and $\int_a^b f = 0$. Prove that $f(x) = 0$ for every $x$. Show by an example that continuity cannot be omitted.
::: solution
Suppose $f(c) > 0$ for some $c$. By continuity there is an interval $[\alpha, \beta] \subseteq [a, b]$ of positive length containing $c$ on which $f \ge f(c)/2$ (sign preservation with $\eps = f(c)/2$). Then by additivity and monotonicity,

$$
\int_a^b f \ \ge\ \int_\alpha^\beta f \ \ge\ \frac{f(c)}{2}(\beta - \alpha) > 0,
$$

using $f \ge 0$ on the rest of $[a, b]$. This contradicts $\int f = 0$. Without continuity, the function $h$ of [[#exr-6-3]] is $\ge 0$, not identically $0$, and has integral $0$.
:::
:::

::: exercise Variable limits {level=2 check="e"}
Let $G(x) = \displaystyle\int_x^{x^2}e^{t^2}\,dt$. Find $G'(1)$.
::: solution
Write $G(x) = F(x^2) - F(x)$ with $F(u) = \int_0^u e^{t^2}dt$. Since $e^{t^2}$ is continuous, $F'(u) = e^{u^2}$ by [[#thm-ftc1]], and by the chain rule $G'(x) = 2x\,e^{x^4} - e^{x^2}$. Hence $G'(1) = 2e - e = e$.
:::
:::

::: exercise Mean value theorem for integrals {level=2}
Let $f$ be continuous on $[a, b]$. Prove that there is $c \in [a, b]$ with $\int_a^b f = f(c)(b - a)$.
::: solution
By the extreme value theorem $f$ has a minimum $m$ and a maximum $M$ on $[a, b]$. By monotonicity of the integral, $m(b-a) \le \int_a^b f \le M(b - a)$, so the average value $\mu = \frac{1}{b-a}\int_a^b f$ lies between $m$ and $M$. Since $f$ takes the values $m$ and $M$, the intermediate value theorem gives $c$ (between the points where they are attained) with $f(c) = \mu$.
:::
:::

::: exercise Step functions approximate {level=2}
Let $f$ be integrable on $[a, b]$ and $\eps > 0$. Prove that there is a step function $s$ (constant on the open subintervals of some partition) with $s \le f$ and $\int_a^b(f - s) < \eps$.
::: solution
By [[#thm-riemann-criterion]] (or directly from $L(f) = \int f$) there is a partition $P$ with $L(f, P) > \int_a^b f - \eps$. Define $s(x) = m_k$ for $x \in (x_{k-1}, x_k)$ and $s(x_k) = f(x_k)$ at the partition points. Then $s \le f$, $s$ is integrable (a step function: by [[#exr-6-3]] its values at finitely many points do not matter, and on each open subinterval it is constant), and $\int s = L(f, P)$. Hence $\int(f - s) = \int f - L(f, P) < \eps$.
:::
:::

::: exercise Products are integrable {level=3}
Let $f$ and $g$ be integrable on $[a, b]$. Prove that $f^2$ is integrable, and deduce that $fg$ is integrable.
::: hint
If $\abs f \le K$, then $\abs{f(x)^2 - f(y)^2} \le 2K\abs{f(x) - f(y)}$. For the product use $fg = \frac14\bigl((f+g)^2 - (f - g)^2\bigr)$.
:::
::: solution
Let $\abs{f} \le K$. For $x, y$ in a subinterval, $f(x)^2 - f(y)^2 = (f(x) + f(y))(f(x) - f(y))$ has absolute value at most $2K(M_k - m_k)$. Taking the supremum over $x, y$, the oscillation of $f^2$ on the subinterval is at most $2K$ times that of $f$, so $U(f^2, P) - L(f^2, P) \le 2K\bigl(U(f, P) - L(f, P)\bigr)$. Choosing $P$ with $U(f,P) - L(f,P) < \eps/(2K + 1)$ shows $f^2$ is integrable by Riemann's criterion. Now $f + g$ and $f - g$ are integrable by linearity, so their squares are, and $fg = \frac14\bigl((f + g)^2 - (f - g)^2\bigr)$ is integrable by linearity again.
:::
:::

::: exercise Taylor's theorem with integral remainder {level=3}
Let $f$ have continuous derivatives up to order $n + 1$ on an interval containing $a$ and $x$. Prove that

$$
f(x) = \sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x - a)^k + \frac{1}{n!}\int_a^x (x - t)^n f^{(n+1)}(t)\,dt.
$$
::: hint
Induction on $n$. For $n = 0$ this is [[#thm-ftc2]]; for the inductive step integrate the remainder by parts with $u = f^{(n+1)}(t)$ and $v = -\frac{(x - t)^{n+1}}{n+1}$.
:::
::: solution
For $n = 0$ the formula reads $f(x) = f(a) + \int_a^x f'(t)\,dt$, which is [[#thm-ftc2]]. Suppose it holds for $n - 1$, so the remainder is $R_{n-1} = \frac{1}{(n-1)!}\int_a^x(x - t)^{n-1}f^{(n)}(t)\,dt$. Integrate by parts ([[#cor-parts]]) with $u(t) = f^{(n)}(t)$ and $v(t) = -\frac{(x-t)^n}{n}$, so that $v'(t) = (x - t)^{n-1}$:

$$
\int_a^x(x - t)^{n-1}f^{(n)}(t)\,dt = \Bigl[-\frac{(x - t)^n}{n}f^{(n)}(t)\Bigr]_{t=a}^{t=x} + \frac1n\int_a^x(x - t)^nf^{(n+1)}(t)\,dt = \frac{(x-a)^n}{n}f^{(n)}(a) + \frac1n\int_a^x(x-t)^nf^{(n+1)}(t)\,dt.
$$

Dividing by $(n - 1)!$ gives $R_{n-1} = \frac{f^{(n)}(a)}{n!}(x - a)^n + \frac{1}{n!}\int_a^x(x - t)^nf^{(n+1)}(t)\,dt$, which is the formula for $n$. (When $x < a$ the same computation applies with the conventions for reversed limits.) Applying a weighted mean value theorem for integrals to this remainder (the weight $(x - t)^n$ does not change sign) recovers the Lagrange form of [[real-analysis/differentiation#thm-taylor]] under these stronger hypotheses.
:::
:::
