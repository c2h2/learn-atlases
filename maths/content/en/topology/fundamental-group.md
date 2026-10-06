The tools so far — connectedness and compactness — cannot tell a disc from an annulus, or a sphere from a torus: all four are compact and path-connected. Yet the difference is obvious to the eye: the annulus has a hole. How can we detect a hole without being able to see it? Henri Poincaré's answer was to look at **loops**. In a disc, every loop can be shrunk continuously to a point. In an annulus, a loop running once around the hole cannot — any attempt to shrink it gets caught on the hole. A loop running twice around cannot be deformed into one running once. Counting loops "up to deformation" gives an algebraic object, the **fundamental group** $\pi_1(X)$, which is the same for homeomorphic spaces and can therefore tell spaces apart.

In this chapter we make "deformation" precise as **homotopy**, define the fundamental group and prove that it is a topological invariant, and then carry out the central calculation: the fundamental group of the circle is the group of integers $\Z$, the integer being the number of times a loop winds around. The proof — by lifting paths from the circle to the real line — is the first real piece of algebraic topology, and it pays for itself immediately: we deduce that the circle is not a retract of the disc, the **Brouwer fixed point theorem** in dimension two, and a topological proof of the **fundamental theorem of algebra**.

## Homotopy

::: definition Homotopy {#def-homotopy}
Two continuous maps $f, g\colon X\to Y$ are **homotopic**, written $f\simeq g$, if there is a continuous map $H\colon X\times[0, 1]\to Y$ with $H(x, 0) = f(x)$ and $H(x, 1) = g(x)$ for all $x$. Two paths $f, g\colon[0,1]\to Y$ from $x_0$ to $x_1$ are **path homotopic**, written $f\simeq_p g$, if there is such an $H$ with, in addition, $H(0, s) = x_0$ and $H(1, s) = x_1$ for all $s$.
:::

Think of the second variable $s$ as time: $H(\cdot, s)$ is a map (or path) that moves continuously from $f$ at time $0$ to $g$ at time $1$, and for a path homotopy the endpoints stay fixed throughout.

::: lemma Homotopy is an equivalence relation {#lem-equivalence}
Homotopy and path homotopy are equivalence relations.
:::

::: proof
*Reflexive:* $H(x, s) = f(x)$. *Symmetric:* if $H$ is a homotopy from $f$ to $g$, then $H(x, 1 - s)$ is one from $g$ to $f$. *Transitive:* if $H$ goes from $f$ to $g$ and $K$ from $g$ to $h$, let $L(x, s) = H(x, 2s)$ for $s\le\frac12$ and $L(x, s) = K(x, 2s - 1)$ for $s\ge\frac12$. Both formulas give $g(x)$ at $s = \frac12$, and they are continuous on the closed sets $X\times[0,\frac12]$ and $X\times[\frac12, 1]$, so $L$ is continuous by the pasting lemma ([[topology/continuous-maps#lem-pasting]]). If $H$ and $K$ fix the endpoints, so does $L$.
:::

::: example Straight-line homotopies {#ex-straight-line}
Let $C\subseteq\R^n$ be convex. Show that any two paths in $C$ with the same endpoints are path homotopic in $C$, and that any two maps $f, g\colon X\to C$ are homotopic.
::: solution
Put $H(x, s) = (1 - s)f(x) + sg(x)$. It is continuous, it lies in $C$ because $C$ contains the segment between $f(x)$ and $g(x)$, and $H(\cdot, 0) = f$, $H(\cdot, 1) = g$. If $f, g$ are paths with $f(0) = g(0) = x_0$ and $f(1) = g(1) = x_1$, then $H(0, s) = (1 - s)x_0 + sx_0 = x_0$ and similarly $H(1, s) = x_1$: a path homotopy. The convexity hypothesis matters: in $\R^2\setminus\set0$ the straight-line homotopy between two loops may pass through the origin, as the figure below shows.
:::
:::

::: widget parametric
fx: (1 - s)*cos(t) + s*(1.5 + 0.4*cos(t))
fy: (1 - s)*sin(t) + s*0.4*sin(t)
t: 0, 2pi
sliders: s=0:0:1:0.01
x: -1.6, 2.2
y: -1.3, 1.3
equal: true
trace: false
caption: The straight-line homotopy between the unit circle ($s = 0$) and a small circle centred at $1.5$ ($s = 1$). Drag $s$: in the plane the deformation is perfectly legal, but at $s\approx0.48$ the loop passes through the origin. In the punctured plane $\R^2\setminus\set0$ this homotopy is forbidden, and we will prove that *no* homotopy there can move a loop around the origin off it.
:::

## Paths, loops and the fundamental group

Paths can be multiplied when the first ends where the second begins.

::: definition Product of paths {#def-product}
If $f$ is a path from $x_0$ to $x_1$ and $g$ a path from $x_1$ to $x_2$, their **product** is the path from $x_0$ to $x_2$

$$
(f\cdot g)(t) = \begin{cases} f(2t), & 0\le t\le\frac12,\\ g(2t - 1), & \frac12\le t\le1,\end{cases}
$$

continuous by the pasting lemma. The **reverse** of $f$ is $\bar f(t) = f(1 - t)$, and $e_x$ denotes the constant path at $x$.
:::

On paths themselves this product is not associative — $(f\cdot g)\cdot h$ runs through $f$ in the first quarter of the time and $f\cdot(g\cdot h)$ in the first half — but it is associative up to path homotopy. The key is that reparametrising a path does not change its homotopy class.

::: lemma Reparametrisation {#lem-reparam}
Let $f$ be a path and $\varphi\colon[0,1]\to[0,1]$ continuous with $\varphi(0) = 0$ and $\varphi(1) = 1$. Then $f\circ\varphi\simeq_pf$.
:::

::: proof
$H(t, s) = f\big((1 - s)\varphi(t) + st\big)$ is continuous, takes values in the image of $f$ (the argument lies in $[0,1]$ by convexity), equals $f\circ\varphi$ at $s = 0$ and $f$ at $s = 1$, and $H(0, s) = f(0)$, $H(1, s) = f(1)$.
:::

::: theorem Groupoid properties {#thm-groupoid}
For paths $f, g, h$ for which the products are defined, and writing $[f]$ for the path-homotopy class of $f$:

1. the product is well defined on classes: $[f]\cdot[g] = [f\cdot g]$;
2. $([f]\cdot[g])\cdot[h] = [f]\cdot([g]\cdot[h])$;
3. $[e_{x_0}]\cdot[f] = [f] = [f]\cdot[e_{x_1}]$ if $f$ runs from $x_0$ to $x_1$;
4. $[f]\cdot[\bar f] = [e_{x_0}]$ and $[\bar f]\cdot[f] = [e_{x_1}]$.
:::

::: proof
(1) If $F$ is a path homotopy from $f$ to $f'$ and $G$ from $g$ to $g'$, then $H(t, s) = F(2t, s)$ for $t\le\frac12$ and $G(2t - 1, s)$ for $t\ge\frac12$ is a path homotopy from $f\cdot g$ to $f'\cdot g'$ (the two formulas agree at $t = \frac12$, where both equal $x_1$).

(2) One checks from the definitions that $(f\cdot g)\cdot h = \big(f\cdot(g\cdot h)\big)\circ\varphi$, where $\varphi$ is the piecewise linear map with $\varphi(0) = 0$, $\varphi(\frac14) = \frac12$, $\varphi(\frac12) = \frac34$ and $\varphi(1) = 1$; apply [[#lem-reparam]].

(3) $e_{x_0}\cdot f = f\circ\varphi$ with $\varphi(t) = 0$ for $t\le\frac12$ and $\varphi(t) = 2t - 1$ for $t\ge\frac12$; similarly on the other side.

(4) The map $H(t, s) = f\big(2t(1 - s)\big)$ for $t\le\frac12$ and $H(t, s) = f\big(2(1 - t)(1 - s)\big)$ for $t\ge\frac12$ is continuous (both formulas give $f(1 - s)$ at $t = \frac12$), equals $f\cdot\bar f$ at $s = 0$ and the constant path $e_{x_0}$ at $s = 1$, and keeps both ends at $f(0) = x_0$. Intuitively: go out along $f$ only as far as $f(1 - s)$ and come straight back. The second identity follows by applying the first to $\bar f$.
:::

A **loop** at $x_0$ is a path that starts and ends at $x_0$. Products of loops at $x_0$ are loops at $x_0$, so the theorem has the following immediate consequence.

::: definition Fundamental group {#def-pi1}
The **fundamental group** $\pi_1(X, x_0)$ is the set of path-homotopy classes of loops at $x_0$, with the product $[f]\cdot[g] = [f\cdot g]$. By [[#thm-groupoid]] it is a group ([[abstract-algebra/groups]]), with identity $[e_{x_0}]$ and inverses $[f]^{-1} = [\bar f]$.
:::

Does the group depend on the base point? Only up to isomorphism, as long as the space is path-connected: if $\alpha$ is a path from $x_0$ to $x_1$, the map

$$
\hat\alpha\colon\pi_1(X, x_0)\to\pi_1(X, x_1), \qquad \hat\alpha([f]) = [\bar\alpha]\cdot[f]\cdot[\alpha],
$$

is a homomorphism ($\hat\alpha([f][g]) = [\bar\alpha][f][\alpha][\bar\alpha][g][\alpha] = \hat\alpha([f])\hat\alpha([g])$ by (4)) with inverse $\widehat{\bar\alpha}$, hence an isomorphism. So for a path-connected space we often write simply $\pi_1(X)$.

A path-connected space is **simply connected** if $\pi_1(X)$ is the trivial group: every loop can be shrunk to a point. By [[#ex-straight-line]], every convex subset of $\R^n$ — a disc, a ball, $\R^n$ itself — is simply connected.

Continuous maps act on loops by composition, and this is what makes the fundamental group useful.

::: proposition Induced homomorphisms {#prop-induced}
A continuous map $h\colon X\to Y$ with $h(x_0) = y_0$ induces a homomorphism $h_*\colon\pi_1(X, x_0)\to\pi_1(Y, y_0)$, $h_*([f]) = [h\circ f]$. Moreover $(k\circ h)_* = k_*\circ h_*$ and $(\mathrm{id}_X)_* = \mathrm{id}$. Consequently a homeomorphism induces an isomorphism, and homeomorphic path-connected spaces have isomorphic fundamental groups.
:::

::: proof
If $H$ is a path homotopy from $f$ to $f'$, then $h\circ H$ is one from $h\circ f$ to $h\circ f'$, so $h_*$ is well defined; and $h\circ(f\cdot g) = (h\circ f)\cdot(h\circ g)$ directly from the definition, so $h_*$ is a homomorphism. The two identities are clear from $(k\circ h)\circ f = k\circ(h\circ f)$. If $h$ is a homeomorphism, then $(h^{-1})_*\circ h_* = (h^{-1}\circ h)_* = \mathrm{id}$ and similarly in the other order, so $h_*$ is an isomorphism.
:::

::: quiz
Which of the following spaces are simply connected? (Several may be correct.)
- [x] The closed unit disc
- [x] $\R^3$
- [ ] The circle $S^1$ (assume the result proved below)
- [x] A star-shaped region of the plane (all points visible from one centre)
- [ ] The annulus $1\le\abs z\le2$
::: solution
The disc and $\R^3$ are convex. A star-shaped set with centre $c$ is simply connected too: the homotopy $H(t, s) = (1 - s)f(t) + sc$ shrinks every loop at $c$ to the constant loop within the set. The circle and the annulus have fundamental group $\Z$, as we are about to prove (the radial homotopy used below for the punctured plane deforms the annulus onto a circle).
:::
:::

## The fundamental group of the circle

We regard $S^1$ as the unit circle in $\R^2$ and use the map

$$
p\colon\R\to S^1, \qquad p(s) = (\cos2\pi s, \sin2\pi s),
$$

which wraps the line around the circle infinitely often, like a spiral staircase seen from above. Two facts about $p$ drive everything. First, $p(s) = p(s')$ exactly when $s - s'\in\Z$. Second, $p$ is a **covering map**: if $U\subseteq S^1$ is the circle minus one point, say $U = S^1\setminus\set{p(a)}$, then

$$
p^{-1}(U) = \bigcup_{n\in\Z}(a + n,\ a + n + 1),
$$

a disjoint union of open intervals, each of which $p$ maps homeomorphically onto $U$. (On each interval $p$ is a continuous bijection onto $U$; its inverse is a continuous branch of $\frac{1}{2\pi}\arg$, continuous because on every closed subinterval $[a + n + \eps, a + n + 1 - \eps]$ the restriction of $p$ is a continuous bijection from a compact space to a Hausdorff space, [[topology/compactness#thm-compact-hausdorff]].) We call $U$ **evenly covered** and the intervals the **sheets** over $U$. The two sets $U = S^1\setminus\set{(1, 0)}$ and $V = S^1\setminus\set{(-1, 0)}$ are evenly covered and together cover $S^1$.

A **lift** of a map $f\colon Y\to S^1$ is a continuous $\tilde f\colon Y\to\R$ with $p\circ\tilde f = f$.

::: lemma Uniqueness of lifts {#lem-unique-lift}
Let $Y$ be connected and let $\tilde f_1, \tilde f_2\colon Y\to\R$ be two lifts of the same map $f\colon Y\to S^1$. If they agree at one point, they agree everywhere.
:::

::: proof
Since $p(\tilde f_1(y)) = p(\tilde f_2(y))$, the difference $\tilde f_1(y) - \tilde f_2(y)$ is an integer for every $y$. A continuous integer-valued function on a connected space is constant (its image is a connected subset of $\Z$, [[topology/connectedness#thm-image]]), and it is $0$ at the given point.
:::

::: lemma Path lifting {#lem-path-lifting}
Let $f\colon[0,1]\to S^1$ be a path and $s_0\in\R$ with $p(s_0) = f(0)$. There is a unique lift $\tilde f\colon[0,1]\to\R$ of $f$ with $\tilde f(0) = s_0$.
:::

::: proof
Uniqueness is [[#lem-unique-lift]]. For existence, the open sets $f^{-1}(U)$ and $f^{-1}(V)$ cover the compact metric space $[0, 1]$; let $\delta$ be a Lebesgue number of this cover ([[topology/compactness#lem-lebesgue]]) and choose $0 = t_0 < t_1 < \dots < t_m = 1$ with $t_{k+1} - t_k < \delta$. Then each $f([t_k, t_{k+1}])$ lies in $U$ or in $V$. Suppose $\tilde f$ has been defined on $[0, t_k]$ (initially $\tilde f(0) = s_0$). Say $f([t_k, t_{k+1}])\subseteq U$. The point $\tilde f(t_k)$ lies in $p^{-1}(U)$, hence in exactly one sheet $W$ over $U$; let $\sigma\colon U\to W$ be the inverse of $p|_W$, and set $\tilde f = \sigma\circ f$ on $[t_k, t_{k+1}]$. This is continuous, lifts $f$, and agrees with the old value at $t_k$ because $\sigma(f(t_k)) = \sigma(p(\tilde f(t_k))) = \tilde f(t_k)$. By the pasting lemma the extended $\tilde f$ is continuous on $[0, t_{k+1}]$. After $m$ steps $\tilde f$ is defined on $[0, 1]$.
:::

::: lemma Homotopy lifting {#lem-homotopy-lifting}
Let $H\colon[0,1]\times[0,1]\to S^1$ be continuous and $s_0\in\R$ with $p(s_0) = H(0, 0)$. There is a unique lift $\tilde H\colon[0,1]\times[0,1]\to\R$ with $\tilde H(0,0) = s_0$. If $H$ is a path homotopy, so is $\tilde H$.
:::

::: proof
Uniqueness is again [[#lem-unique-lift]], as the square is connected. For existence, use a Lebesgue number of the cover $\set{H^{-1}(U), H^{-1}(V)}$ of the compact square to choose $N$ so large that each small square $R_{jk} = [\frac jN, \frac{j+1}N]\times[\frac kN, \frac{k+1}N]$ is mapped by $H$ into $U$ or into $V$. Define $\tilde H$ on the small squares one at a time, in the order $R_{00}, R_{10},\dots,R_{N-1,0}, R_{01}, R_{11},\dots$ (row by row, left to right). When it is the turn of $R = R_{jk}$, $\tilde H$ is already defined on the set $E$ formed by the left and bottom edges of $R$ that it shares with earlier squares (if any), together with the lower left corner $c$ — where for the very first square we set $\tilde H(c) = s_0$ — and $E$ is connected. Say $H(R)\subseteq U$; let $W$ be the sheet over $U$ containing $\tilde H(c)$ and $\sigma$ the inverse of $p|_W$, and define $\tilde H = \sigma\circ H$ on $R$. On $E$ this new definition and the old one are two lifts of $H|_E$ that agree at $c$, so they agree on all of $E$ by [[#lem-unique-lift]]. Hence the definitions fit together, and by the pasting lemma (finitely many closed squares) $\tilde H$ is a continuous lift on the whole square.

Now suppose $H$ is a path homotopy from $f$ to $g$, so $H(0, s) = x_0$ and $H(1, s) = x_1$ for all $s$. Then $s\mapsto\tilde H(0, s)$ is a lift of a constant path, so it takes values in the discrete set $p^{-1}(x_0)$ and, being continuous on $[0,1]$, is constant; similarly for $s\mapsto\tilde H(1, s)$. So $\tilde H$ is a path homotopy between its bottom and top edges, which by uniqueness are the lifts of $f$ and $g$ starting at $s_0$.
:::

::: corollary Lifts of homotopic paths end at the same point {#cor-endpoint}
If $f\simeq_p g$ are paths in $S^1$ and $\tilde f$, $\tilde g$ are their lifts starting at the same point $s_0$, then $\tilde f(1) = \tilde g(1)$.
:::

Now we can compute. A loop $f$ at the base point $b = (1, 0) = p(0)$ has a unique lift $\tilde f$ with $\tilde f(0) = 0$, and $\tilde f(1)\in p^{-1}(b) = \Z$. This integer, the net number of times the lift climbs the staircase, is the **degree** of $f$: the number of times $f$ winds around the circle, counted with sign.

::: theorem The fundamental group of the circle {#thm-pi1-circle}
The map $\deg\colon\pi_1(S^1, b)\to\Z$, $[f]\mapsto\tilde f(1)$, is a well-defined isomorphism of groups. Hence $\pi_1(S^1)\cong\Z$, generated by the class of the loop $\omega(t) = (\cos2\pi t, \sin2\pi t)$.
:::

::: proof
*Well defined*: by [[#cor-endpoint]], path-homotopic loops have lifts from $0$ ending at the same integer.

*Homomorphism*: let $\deg[f] = m$ and $\deg[g] = n$. The path $m + \tilde g$ (that is, $t\mapsto m + \tilde g(t)$) is a lift of $g$, since $p(m + s) = p(s)$, and it starts at $m = \tilde f(1)$. So the product $\tilde f\cdot(m + \tilde g)$ is defined, starts at $0$ and lifts $f\cdot g$; by uniqueness it is the lift of $f\cdot g$ from $0$, and it ends at $m + n$. So $\deg([f][g]) = m + n$.

*Surjective*: for $n\in\Z$, the loop $\omega_n(t) = p(nt)$ has the lift $t\mapsto nt$ from $0$, ending at $n$.

*Injective*: suppose $\deg[f] = 0$, so $\tilde f$ is a loop in $\R$ at $0$. By [[#ex-straight-line]] there is a path homotopy $G$ in $\R$ from $\tilde f$ to the constant loop at $0$; then $p\circ G$ is a path homotopy in $S^1$ from $p\circ\tilde f = f$ to the constant loop at $b$. So $[f]$ is the identity.

Finally $\omega = \omega_1$ has degree $1$, so its class generates.
:::

The same lifting argument works for loops that are not based, and for homotopies that move the base point. For any loop $f\colon[0,1]\to S^1$ and any lift $\tilde f$, the integer $\tilde f(1) - \tilde f(0)$ does not depend on the lift (two lifts differ by a constant), and it is unchanged under a homotopy $H$ through loops (with $H(0,s) = H(1,s)$ for all $s$): lifting $H$, the function $s\mapsto\tilde H(1, s) - \tilde H(0, s)$ is continuous and integer-valued, hence constant. We call it the **degree** of the free loop as well. For a closed curve $\gamma$ in $\C$ avoiding a point $a$, the degree of the loop $t\mapsto\frac{\gamma(t) - a}{\abs{\gamma(t) - a}}$ is the **winding number** of $\gamma$ about $a$, which for contours equals $\frac{1}{2\pi i}\oint_\gamma\frac{dz}{z - a}$ ([[complex-analysis/contour-integrals]]).

::: widget winding
fx: cos(t) + 0.5*cos(2*t)
fy: sin(t) + 0.5*sin(2*t)
t: 0, 2pi
point: 0.3, 0.2
caption: A closed curve and a movable point. The winding number counts how many times the curve goes around the point — the degree of the direction from the point to the curve. Drag the point across the curve: the number jumps by $\pm1$, and it stays constant while the point moves within a region (a homotopy invariant). Draw your own loops and check that deforming a loop without crossing the point never changes the number.
:::

## Applications

::: definition Retraction {#def-retraction}
A subspace $A\subseteq X$ is a **retract** of $X$ if there is a continuous map $r\colon X\to A$ with $r(a) = a$ for all $a\in A$.
:::

::: theorem No retraction {#thm-no-retraction}
The circle $S^1$ is not a retract of the closed disc $D^2$.
:::

::: proof
Suppose $r\colon D^2\to S^1$ is a retraction, and let $i\colon S^1\to D^2$ be the inclusion. Then $r\circ i = \mathrm{id}_{S^1}$, so by [[#prop-induced]]

$$
r_*\circ i_* = \mathrm{id}\colon\pi_1(S^1, b)\to\pi_1(S^1, b).
$$

But $i_*$ maps into $\pi_1(D^2, b)$, which is trivial because the disc is convex. So $r_*\circ i_*$ sends everything to the identity, while $\mathrm{id}$ on $\pi_1(S^1)\cong\Z$ does not. Contradiction.
:::

::: theorem Brouwer fixed point theorem in dimension two {#thm-brouwer}
Every continuous map $f\colon D^2\to D^2$ of the closed disc to itself has a fixed point.
:::

::: proof
Suppose $f(x)\neq x$ for all $x\in D^2$. For each $x$, follow the ray that starts at $f(x)$ and passes through $x$, and let $r(x)$ be the point where it leaves the disc, i.e. meets $S^1$. Explicitly, with $u = x - f(x)\neq0$, $r(x) = x + \tau u$, where $\tau\ge0$ solves $\norm{x + \tau u}^2 = 1$:

$$
\tau = \frac{-\,x\cdot u + \sqrt{(x\cdot u)^2 + \norm u^2\big(1 - \norm x^2\big)}}{\norm u^2}.
$$

The expression under the square root is non-negative since $\norm x\le1$, and $\tau$ depends continuously on $x$, so $r\colon D^2\to S^1$ is continuous. If $\norm x = 1$, then $x\cdot u = 1 - x\cdot f(x)\ge0$ (as $\abs{x\cdot f(x)}\le\norm x\norm{f(x)}\le1$), so the formula gives $\tau = (-x\cdot u + \abs{x\cdot u})/\norm u^2 = 0$ and $r(x) = x$. Thus $r$ is a retraction of $D^2$ onto $S^1$, contradicting [[#thm-no-retraction]].
:::

The theorem says, for example, that if you take a map of a country and place it on the floor somewhere within that country — crumpled if you like, as long as it is not torn — some point of the map lies exactly above the place it represents. It holds in every dimension: the same argument works once $\pi_1$ is replaced by higher homotopy or homology groups, and there are also combinatorial proofs via Sperner's lemma. In dimension one it is the fixed point theorem for $[0,1]$ of [[topology/connectedness#ex-ivt-applications]].

::: example Fixed points on other shapes {#ex-fixed-shapes}
(a) Show that every continuous map of a closed square, or of a closed triangle, into itself has a fixed point. (b) Show that the annulus $A = \set{x\in\R^2 : 1\le\norm x\le2}$ does not have this property, and deduce again that $A$ is not homeomorphic to the disc.
::: solution
(a) The fixed point property is topological: if $h\colon Q\to D^2$ is a homeomorphism and $f\colon Q\to Q$ is continuous, then $g = h\circ f\circ h^{-1}\colon D^2\to D^2$ has a fixed point $y$ by [[#thm-brouwer]], and $x = h^{-1}(y)$ satisfies $f(x) = h^{-1}(g(y)) = h^{-1}(y) = x$. A closed square is homeomorphic to the disc ([[topology/continuous-maps#exr-square-disc]]), and so is a closed triangle (by the same radial rescaling from an interior point, since every ray from that point meets the boundary exactly once).

(b) The rotation $x\mapsto-x$ maps $A$ into itself and has no fixed point, since $x = -x$ forces $x = 0\notin A$. So $A$ lacks the fixed point property and cannot be homeomorphic to $D^2$. (The fundamental groups, $\Z$ and $0$, give a second proof.)
:::
:::

::: example Degrees of some loops {#ex-degrees}
Writing points of $S^1$ as complex numbers $e^{2\pi i\theta}$, find the degree of (a) $f(t) = e^{6\pi it}$; (b) $g(t) = e^{-4\pi it}$; (c) the loop $h(t) = \dfrac{e^{4\pi it} + \frac12e^{2\pi it}}{\abs{e^{4\pi it} + \frac12e^{2\pi it}}}$.
::: solution
(a) $f(t) = p(3t)$ with lift $3t$ from $0$ to $3$: degree $3$. (b) $g(t) = p(-2t)$: degree $-2$; the loop runs twice around clockwise. (c) Put $H(t, s) = \dfrac{e^{4\pi it} + \frac s2e^{2\pi it}}{\abs{e^{4\pi it} + \frac s2e^{2\pi it}}}$ for $s\in[0,1]$. The denominator never vanishes, since $\abs{e^{4\pi it}} = 1 > \frac s2\ge\abs{\frac s2e^{2\pi it}}$, so $H$ is a homotopy through loops from $e^{4\pi it}$ (degree $2$) to $h$. By homotopy invariance of the degree, $\deg h = 2$. This is the topological core of Rouché's theorem in [[complex-analysis/residues]]: a dominant term determines the winding.
:::
:::

The same idea gives a topological proof of the fundamental theorem of algebra.

::: theorem Fundamental theorem of algebra {#thm-fta}
Every polynomial $P(z) = z^n + a_{n-1}z^{n-1} + \dots + a_0$ with complex coefficients and $n\ge1$ has a root in $\C$.
:::

::: proof
Suppose $P$ has no root. For $r\ge0$ consider the loop $f_r(t) = \dfrac{P(re^{2\pi it})}{\abs{P(re^{2\pi it})}}$ in $S^1$. The map $(t, r)\mapsto f_r(t)$ is continuous, so all the loops $f_r$ are homotopic through loops to $f_0$, which is constant; hence $\deg f_r = 0$ for every $r$. Now fix $R > 1 + \abs{a_{n-1}} + \dots + \abs{a_0}$ and, for $s\in[0,1]$, let $P_s(z) = z^n + s(a_{n-1}z^{n-1} + \dots + a_0)$. For $\abs z = R$,

$$
\abs{a_{n-1}z^{n-1} + \dots + a_0}\le\big(\abs{a_{n-1}} + \dots + \abs{a_0}\big)R^{n-1} < R^n = \abs{z^n},
$$

so $P_s$ has no zeros on $\abs z = R$, and $s\mapsto P_s(Re^{2\pi it})/\abs{P_s(Re^{2\pi it})}$ is a homotopy through loops from $t\mapsto e^{2\pi int}$ (degree $n$) to $f_R$. So $\deg f_R = n\neq0$, contradicting $\deg f_R = 0$.
:::

::: warning Based and free homotopies
In the definition of $\pi_1$, homotopies must keep the base point fixed; in the arguments with degrees above, the homotopies were *free* (the loops could move their starting point). For the circle this makes no difference, because we showed directly that the degree is invariant under both kinds. In general the two notions differ: free homotopy classes of loops correspond to *conjugacy classes* in $\pi_1(X, x_0)$, not to elements. For abelian fundamental groups, such as those of the circle and the torus, the distinction disappears.
:::

### Other fundamental groups

The circle is the basic example; here are some others, with brief indications of proof.

- **Products**: $\pi_1(X\times Y, (x_0, y_0))\cong\pi_1(X, x_0)\times\pi_1(Y, y_0)$, via $[f]\mapsto([\pi_1\circ f], [\pi_2\circ f])$; a homotopy in a product is a pair of homotopies in the factors ([[topology/continuous-maps#thm-product]]). Hence $\pi_1(\R^n) = 0$, $\pi_1(\text{cylinder } S^1\times\R)\cong\Z$ and $\pi_1(\text{torus } S^1\times S^1)\cong\Z^2$.
- **Spheres**: $\pi_1(S^n) = 0$ for $n\ge2$. Every loop can be homotoped to avoid some point (this needs an argument: a space-filling loop exists, so one first subdivides the loop and replaces small pieces by great-circle arcs), and $S^n$ minus a point is homeomorphic to $\R^n$ by stereographic projection, which is simply connected.
- **The punctured plane**: $\pi_1(\R^2\setminus\set0)\cong\Z$. The homotopy $(x, s)\mapsto(1 - s)x + sx/\norm x$ stays in the punctured plane and fixes $S^1$ pointwise, so it deforms every loop based at $b\in S^1$, by a path homotopy, into the loop $x/\norm x$ in $S^1$; hence the inclusion $S^1\to\R^2\setminus\set0$ induces a surjection on $\pi_1$, which is injective because $x\mapsto x/\norm x$ is a retraction.
- **The projective plane**: $\pi_1(\R P^2)\cong\Z/2$. The quotient map $S^2\to\R P^2$ is a two-sheeted covering, and a loop in $\R P^2$ is trivial or not according to whether its lift from a point $x$ ends at $x$ or at $-x$.

::: example The two loops of the torus commute {#ex-torus-commute}
Let $T = S^1\times S^1$ with base point $(b, b)$, and let $\alpha(t) = (p(t), b)$ and $\beta(t) = (b, p(t))$ be the loops around the two factors. Show directly that $\alpha\cdot\beta\simeq_p\beta\cdot\alpha$.
::: solution
Let $P\colon\R^2\to T$, $P(x, y) = (p(x), p(y))$. In $\R^2$ let $\gamma_1$ be the path from $(0,0)$ to $(1, 0)$ to $(1, 1)$ along two segments (each traversed in half the time), and $\gamma_2$ the path from $(0, 0)$ to $(0, 1)$ to $(1, 1)$. Then $P\circ\gamma_1 = \alpha\cdot\beta$ and $P\circ\gamma_2 = \beta\cdot\alpha$. Since $\R^2$ is convex, $G(t, s) = (1 - s)\gamma_1(t) + s\gamma_2(t)$ is a path homotopy from $\gamma_1$ to $\gamma_2$ with endpoints fixed at $(0,0)$ and $(1,1)$. Hence $P\circ G$ is a path homotopy from $\alpha\cdot\beta$ to $\beta\cdot\alpha$ in $T$, with both ends at $P(0,0) = P(1,1) = (b, b)$. In the square model of the torus this homotopy sweeps across the square; it is the geometric meaning of the boundary word $aba^{-1}b^{-1}$, which says that $\alpha\beta\alpha^{-1}\beta^{-1}$ is trivial.
:::
:::

These calculations distinguish many spaces: the sphere ($\pi_1 = 0$) is not homeomorphic to the torus ($\Z^2$) or to the projective plane ($\Z/2$), and $\R^2$ is not homeomorphic to $\R^n$ for $n\ge3$, because removing a point leaves fundamental group $\Z$ in the first case and $0$ in the second ([[#exr-r2-r3]]).

::: quiz
What is the fundamental group of the torus $S^1\times S^1$?
- [ ] $\Z$
- [x] $\Z\times\Z$
- [ ] The trivial group, since the torus is compact and connected
- [ ] $\Z/2$
::: solution
By the product formula, $\pi_1(S^1\times S^1)\cong\pi_1(S^1)\times\pi_1(S^1)\cong\Z\times\Z$. The two generators are the loops around the "long way" and the "short way" of the doughnut (the curves $v = \text{const}$ and $u = \text{const}$ in the figure of [[topology/continuous-maps]]). Compactness and connectedness say nothing about loops.
:::
:::

::: application Equilibria in games and economics
Fixed point theorems are the standard tool for proving that equilibria exist. In 1950–1951 John Nash proved that every finite game has an equilibrium in mixed strategies by applying a fixed point theorem (Kakutani's, and in a second proof Brouwer's) to a continuous "improvement" map on the compact convex set of strategy profiles; general economic equilibrium theory, developed by Kenneth Arrow and Gérard Debreu in 1954, rests on the same idea. The proofs say nothing about how to *find* the equilibrium — a typical feature of topological existence results.
:::

::: history
Henri Poincaré introduced the fundamental group in his memoir *Analysis Situs* (1895) and its supplements, as part of his programme of distinguishing manifolds by algebraic invariants. In the fifth supplement (1904) he asked whether a closed three-dimensional manifold with trivial fundamental group must be the three-sphere — the Poincaré conjecture, finally proved by Grigori Perelman in 2002–2003. L. E. J. Brouwer published his fixed point theorem in 1912, after Jacques Hadamard had given a proof in 1910 (the case of dimension three had been treated by Piers Bohl in 1904). The theory of covering spaces, which generalises the map $\R\to S^1$ used here, was developed in the early twentieth century and clarified the relation between subgroups of $\pi_1$ and coverings.
:::

## Where this leads

The fundamental group is the first of the **homotopy groups** $\pi_n(X)$, which use maps of spheres instead of loops; together with homology groups they form the core of algebraic topology, studied in courses based on Hatcher's *Algebraic Topology*. Covering space theory generalises the lifting lemmas of this chapter. In [[topology/surfaces]] we meet a different, combinatorial invariant, the Euler characteristic, which together with orientability classifies closed surfaces; their fundamental groups are computed from the polygon presentations by the Seifert–van Kampen theorem. Winding numbers connect with the argument principle of [[complex-analysis/residues]], and loops on surfaces appear in the Gauss–Bonnet theorem of [[differential-geometry/geodesics-gauss-bonnet]].

::: summary
- A homotopy deforms one map into another; a path homotopy keeps endpoints fixed. Both are equivalence relations, and in a convex set the straight-line homotopy joins any two paths with the same endpoints.
- Path-homotopy classes of loops at $x_0$ form a group $\pi_1(X, x_0)$ under concatenation; for path-connected $X$ it is independent of $x_0$ up to isomorphism. Convex sets are simply connected.
- Continuous maps induce homomorphisms $h_*$, functorially; homeomorphic spaces have isomorphic fundamental groups.
- Paths and homotopies in $S^1$ lift uniquely to $\R$ through $p(s) = (\cos2\pi s,\sin2\pi s)$; the endpoint of the lift of a loop is its degree, and $\deg\colon\pi_1(S^1)\to\Z$ is an isomorphism.
- $S^1$ is not a retract of $D^2$; hence every continuous map $D^2\to D^2$ has a fixed point (Brouwer), and every non-constant complex polynomial has a root.
- $\pi_1(S^1\times S^1)\cong\Z^2$, $\pi_1(S^n) = 0$ for $n\ge2$, $\pi_1(\R P^2)\cong\Z/2$: the fundamental group distinguishes the sphere, torus and projective plane.
:::

## Exercises

::: exercise A threefold loop {level=1 check="3"}
Find the degree of the loop $f(t) = (\cos6\pi t, \sin6\pi t)$, $0\le t\le1$, in $S^1$.
::: solution
$f(t) = p(3t)$, and $\tilde f(t) = 3t$ is the lift starting at $0$; it ends at $3$. So $\deg f = 3$.
:::
:::

::: exercise A clockwise loop {level=1 check="-2"}
Find the degree of $g(t) = (\cos4\pi t, -\sin4\pi t)$.
::: solution
$g(t) = (\cos(-4\pi t), \sin(-4\pi t)) = p(-2t)$, with lift $-2t$ from $0$ to $-2$. So $\deg g = -2$: the loop runs twice around the circle clockwise.
:::
:::

::: exercise Star-shaped sets {level=1}
A set $S\subseteq\R^n$ is **star-shaped** about $c\in S$ if the segment from $c$ to every point of $S$ lies in $S$. Prove that a star-shaped set is simply connected.
::: solution
$S$ is path-connected: every point is joined to $c$ by a segment. For a loop $f$ at $c$, put $H(t, s) = (1 - s)f(t) + sc$. This lies in $S$ (it is on the segment from $c$ to $f(t)$), is continuous, equals $f$ at $s = 0$ and the constant loop at $s = 1$, and $H(0, s) = H(1, s) = c$. So $[f]$ is trivial and $\pi_1(S, c) = 0$.
:::
:::

::: exercise A dominated loop {level=2 check="2"}
Find the winding number about $0$ of the closed curve $\gamma(t) = e^{4\pi it} + \frac12e^{2\pi it} + \frac14$, $0\le t\le1$, in $\C$.
::: hint
Deform the curve to $e^{4\pi it}$ without passing through $0$.
:::
::: solution
For $s\in[0,1]$ let $\gamma_s(t) = e^{4\pi it} + s\big(\frac12e^{2\pi it} + \frac14\big)$. Since $\abs{\frac12e^{2\pi it} + \frac14}\le\frac34 < 1 = \abs{e^{4\pi it}}$, no $\gamma_s$ passes through $0$, so $\gamma_s/\abs{\gamma_s}$ is a homotopy through loops in $S^1$. The degree is therefore that of $e^{4\pi it}$, namely $2$.
:::
:::

::: exercise Maps of non-zero degree are onto {level=2}
Prove that a continuous loop $f\colon[0,1]\to S^1$ that misses some point of $S^1$ has degree $0$. Deduce that every loop of non-zero degree is surjective.
::: solution
Suppose $f$ misses $p(a)$. Then $f$ maps into $U = S^1\setminus\set{p(a)}$, and with $\sigma$ the inverse of $p$ on the sheet $(a, a + 1)$, the path $\sigma\circ f$ is a lift of $f$. It is a path in the interval $(a, a + 1)$ with $p(\sigma f(0)) = p(\sigma f(1))$, so $\sigma f(1) - \sigma f(0)$ is an integer of absolute value less than $1$, i.e. $0$. So $\deg f = 0$.
:::
:::

::: exercise The figure eight is not simply connected {level=2}
Let $X$ be the union of two circles in $\R^2$ meeting at one point $x_0$ (a figure eight). Prove that $X$ is not simply connected.
::: hint
Construct a retraction of $X$ onto one of the circles.
:::
::: solution
Let $A$ and $B$ be the two circles, $A\cap B = \set{x_0}$. Define $r\colon X\to A$ by $r = \mathrm{id}$ on $A$ and $r\equiv x_0$ on $B$. The two definitions agree at $x_0$, and $A$, $B$ are closed, so $r$ is continuous by the pasting lemma: a retraction. With $i\colon A\to X$ the inclusion, $r_*\circ i_* = \mathrm{id}$ on $\pi_1(A, x_0)\cong\Z$, so $i_*$ is injective and $\pi_1(X, x_0)$ contains a copy of $\Z$. (In fact $\pi_1$ of the figure eight is the free group on two generators, which is not even abelian.)
:::
:::

::: exercise Abelian groups and base points {level=2}
Let $X$ be path-connected with $\pi_1(X, x_0)$ abelian, and let $\alpha, \beta$ be two paths from $x_0$ to $x_1$. Prove that $\hat\alpha = \hat\beta$.
::: solution
For a loop $f$ at $x_0$, insert $[\alpha][\bar\alpha] = [e_{x_0}]$ on both sides of $[f]$ (using [[#thm-groupoid]]):

$$
\hat\beta([f]) = [\bar\beta][f][\beta] = \big([\bar\beta][\alpha]\big)\big([\bar\alpha][f][\alpha]\big)\big([\bar\alpha][\beta]\big) = d\,\hat\alpha([f])\,d^{-1},
$$

where $d = [\bar\beta\cdot\alpha]$ is the class of a loop at $x_1$ and $[\bar\alpha\cdot\beta] = d^{-1}$. The group $\pi_1(X, x_1)$ is isomorphic to $\pi_1(X, x_0)$, hence abelian, so conjugation by $d$ is trivial and $\hat\beta([f]) = \hat\alpha([f])$.
:::
:::

::: exercise The plane is not three-space {#exr-r2-r3 level=3}
Assuming that $\pi_1(S^2) = 0$, prove that $\R^2$ is not homeomorphic to $\R^3$.
::: solution
Suppose $h\colon\R^2\to\R^3$ is a homeomorphism. It restricts to a homeomorphism $\R^2\setminus\set0\to\R^3\setminus\set{h(0)}$, so these spaces have isomorphic fundamental groups. The first is $\Z$ (it deformation retracts onto $S^1$). For the second, translate $h(0)$ to $0$: $\R^3\setminus\set0$ deformation retracts onto $S^2$ by $(x, s)\mapsto(1 - s)x + sx/\norm x$, and a loop in $\R^3\setminus\set0$ at a point of $S^2$ is path homotopic, by this deformation (which fixes $S^2$ pointwise), to a loop in $S^2$, which is trivial since $\pi_1(S^2) = 0$. So $\pi_1(\R^3\setminus\set0) = 0\not\cong\Z$, a contradiction.
:::
:::

::: exercise Homotopy classes of maps of the circle {level=3}
Prove that two loops $f, g\colon[0,1]\to S^1$ (not necessarily based at $b$) of the same degree are homotopic through loops. Deduce that the homotopy classes of continuous maps $S^1\to S^1$ correspond bijectively to the integers, via the degree.
::: solution
Let $\tilde f$, $\tilde g$ be lifts; then $\tilde f(1) - \tilde f(0) = \tilde g(1) - \tilde g(0) = n$. Define $G(t, s) = p\big((1 - s)\tilde f(t) + s\tilde g(t)\big)$. It is continuous, $G(\cdot, 0) = f$, $G(\cdot, 1) = g$, and for each $s$,

$$
\big((1 - s)\tilde f(1) + s\tilde g(1)\big) - \big((1 - s)\tilde f(0) + s\tilde g(0)\big) = (1 - s)n + sn = n\in\Z,
$$

so $G(1, s) = G(0, s)$: every $G(\cdot, s)$ is a loop. Hence $f$ and $g$ are homotopic through loops. A map $S^1\to S^1$ is the same as a loop $f(t) = F(p(t))$ on $[0,1]$, and homotopies of maps $S^1\to S^1$ correspond to homotopies through loops. So the degree, which is invariant under such homotopies, is a bijection from homotopy classes onto $\Z$ (onto because $z\mapsto z^n$ has degree $n$).
:::
:::

::: exercise The boundary of a Möbius band {level=3}
Assume that the Möbius band $M$ deformation retracts onto its central circle $C$, so that $\pi_1(M)\cong\Z$ generated by the class of $C$, and that the boundary curve $\partial M$, a circle, is homotopic in $M$ to the loop $C$ traversed twice. Prove that $\partial M$ is not a retract of $M$.
::: solution
Suppose $r\colon M\to\partial M$ is a retraction and let $i\colon\partial M\to M$ be the inclusion; then $r_*\circ i_* = \mathrm{id}$ on $\pi_1(\partial M)\cong\Z$. Let $\beta$ generate $\pi_1(\partial M)$ (the boundary loop) and $\gamma$ generate $\pi_1(M)$ (the central loop). By hypothesis $i_*(\beta) = \gamma^2$ (up to the identification of base points along a path, which does not affect the argument because $\pi_1(M)$ is abelian). Then $\beta = r_*(i_*(\beta)) = r_*(\gamma)^2$, so $\beta$ would be twice some element in $\pi_1(\partial M)\cong\Z$, where $\beta$ corresponds to $\pm1$. But $\pm1$ is not twice an integer. Contradiction.
:::
:::
