A computer will draw the graph of almost any function in an instant, so why learn to sketch graphs by hand? Because a plotted picture shows only a window and a finite number of sample points. It can miss a narrow spike, hide what happens for large $x$, blur an asymptote into a steep line, and it never explains *why* the graph looks as it does. The derivative tells us exactly where a function rises and falls, the second derivative tells us how it bends, and limits describe its behaviour at the edges of its domain. Put together, they determine the shape of a graph completely.

The same ideas solve **optimisation** problems: the largest volume a box can have, the cheapest shape for a can, the path of least time for a ray of light. Every such problem asks for the maximum or minimum of a function, and the tools of this chapter — critical points, the first and second derivative tests and the closed interval method — find them. Everything rests on the mean value theorem and its consequences ([[calculus-1/mean-value-theorem]]).

## Critical points and the first derivative test

By Fermat's theorem ([[calculus-1/mean-value-theorem#thm-fermat]]), a local extremum at an interior point where $f$ is differentiable forces $f'(c) = 0$. Extrema can also occur where $f'$ fails to exist, as for $\abs{x}$ at $0$. This motivates a name for the candidates.

::: definition Critical point {#def-critical}
A **critical point** (or critical number) of $f$ is a point $c$ in the interior of the domain of $f$ at which either $f'(c) = 0$ or $f'(c)$ does not exist. The value $f(c)$ is then a **critical value**.
:::

So interior local extrema can occur *only* at critical points. The converse is false — $x^3$ has a critical point at $0$ but no extremum — so each critical point must be examined. The simplest way is to look at the sign of $f'$ on either side.

::: theorem First derivative test {#thm-first-derivative-test}
Let $c$ be a critical point of $f$, and suppose $f$ is continuous at $c$ and differentiable on $(c-\delta, c)$ and on $(c, c+\delta)$ for some $\delta > 0$.

1. If $f'>0$ on $(c-\delta, c)$ and $f'<0$ on $(c, c+\delta)$, then $f$ has a local maximum at $c$.
2. If $f'<0$ on $(c-\delta, c)$ and $f'>0$ on $(c, c+\delta)$, then $f$ has a local minimum at $c$.
3. If $f'$ has the same sign on both sides, then $f$ has no local extremum at $c$.
:::

::: proof
The function $f$ is continuous on $(c-\delta, c]$ (it is differentiable, hence continuous, on $(c - \delta, c)$, and continuous at $c$), and similarly on $[c, c+\delta)$. In case 1, the monotonicity test ([[calculus-1/mean-value-theorem#thm-monotonicity]]) shows that $f$ is strictly increasing on $(c-\delta, c]$ and strictly decreasing on $[c, c+\delta)$. Hence $f(x) < f(c)$ for every $x\neq c$ in $(c-\delta, c+\delta)$: a (strict) local maximum. Case 2 is the same with the inequalities reversed. In case 3, say with $f' > 0$ on both sides, $f$ is strictly increasing on $(c - \delta, c]$ and on $[c, c+\delta)$, hence on the whole interval, so $f(x) < f(c)$ for $x<c$ and $f(x)>f(c)$ for $x > c$, and $c$ is not an extremum.
:::

In practice we factorise $f'$, find its zeros and the points where it is undefined, and record its sign on the intervals between them in a **sign chart**.

::: example A critical point that is not an extremum {#ex-first-test}
Find and classify the critical points of $f(x) = x^4 - 4x^3$.
::: solution
$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)$, which exists everywhere and vanishes at $x = 0$ and $x = 3$. The factor $4x^2$ is positive except at $0$, so the sign of $f'$ is the sign of $x - 3$:

| interval | $(-\infty, 0)$ | $(0, 3)$ | $(3, \infty)$ |
|---|---|---|---|
| sign of $f'$ | $-$ | $-$ | $+$ |
| $f$ | decreasing | decreasing | increasing |

At $x = 3$ the sign changes from $-$ to $+$: a local minimum, $f(3) = 81 - 108 = -27$. Since $f$ decreases on $(-\infty, 3]$ and increases on $[3,\infty)$, this is in fact the global minimum. At $x = 0$ the sign does not change, so there is no extremum: the graph flattens out momentarily and keeps falling.
:::
:::

::: quiz
Suppose $f'(x) = (x-1)^2(x+2)$ for all $x$. Which statements are true? (Select all that apply.)
- [ ] $f$ has a local maximum at $1$.
- [ ] $f$ has a local minimum at $1$.
- [x] $f$ has a local minimum at $-2$.
- [x] $f$ has no local extremum at $1$.
::: solution
The factor $(x-1)^2$ is never negative, so the sign of $f'$ is that of $x + 2$ (except at $x=1$, where $f' = 0$). It changes from $-$ to $+$ at $-2$, giving a local minimum there. At $1$ the sign is $+$ on both sides, so by case 3 of [[#thm-first-derivative-test]] there is no extremum, even though $f'(1) = 0$.
:::
:::

## Concavity and the second derivative test

Two functions can both increase on an interval yet look very different: $x^2$ on $(0,\infty)$ bends upwards, getting steeper, while $\sqrt{x}$ bends downwards, getting flatter. The difference is **concavity**.

::: definition Concavity {#def-concave}
Let $f$ be differentiable on an open interval $I$. Then $f$ is **concave up** (or **convex**) on $I$ if its graph lies above each of its tangent lines on $I$:

$$
f(x) \ge f(a) + f'(a)(x - a) \qquad\text{for all } x, a\in I,
$$ {#eq-convex}

and **concave down** on $I$ if the reverse inequality holds for all $x, a\in I$.
:::

The tangent-line definition captures the geometric picture, and it is easy to use: for instance it says at once that a concave-up function lies above its linear approximations, as we saw for $e^x \ge 1 + x$. An equivalent definition in terms of chords, valid without differentiability, is developed in [[#exr-chords]]. The derivative detects concavity.

::: theorem Concavity and the derivative {#thm-concavity}
Let $f$ be differentiable on an open interval $I$. Then $f$ is concave up on $I$ if and only if $f'$ is increasing on $I$. Consequently, if $f$ is twice differentiable on $I$, then $f''\ge0$ on $I$ implies $f$ is concave up, and $f''\le0$ on $I$ implies $f$ is concave down.
:::

::: proof
Suppose $f'$ is increasing, and let $a, x\in I$. If $x > a$, the mean value theorem gives $c\in(a,x)$ with $f(x) - f(a) = f'(c)(x - a)$; since $f'(c)\ge f'(a)$ and $x - a>0$, this is $\ge f'(a)(x - a)$. If $x<a$, then $c\in(x,a)$, so $f'(c)\le f'(a)$, and multiplying by the negative number $x - a$ again gives $f'(c)(x-a)\ge f'(a)(x-a)$. Either way [[#eq-convex]] holds.

Conversely, suppose [[#eq-convex]] holds and let $a < b$ in $I$. Applying it at $a$ (with $x = b$) and at $b$ (with $x = a$),

$$
f(b) \ge f(a) + f'(a)(b-a), \qquad f(a) \ge f(b) + f'(b)(a - b).
$$

Adding, $0\ge (b-a)\bigl(f'(a) - f'(b)\bigr)$, and since $b - a > 0$ we get $f'(a)\le f'(b)$. So $f'$ is increasing.

Finally, if $f''\ge0$ on $I$ then $f'$ is increasing by the monotonicity test applied to $f'$, so $f$ is concave up. The concave-down statements follow by applying this to $-f$.
:::

::: definition Inflection point {#def-inflection}
A point $c$ is an **inflection point** of $f$ if $f$ is continuous at $c$ and, for some $\delta>0$, $f$ is concave up on $(c-\delta, c)$ and concave down on $(c, c+\delta)$, or vice versa.
:::

If $f''$ is continuous, then at an inflection point $f''$ changes sign, so $f''(c) = 0$. But $f''(c) = 0$ does not guarantee an inflection point: $f(x) = x^4$ has $f''(0) = 0$ but is concave up on all of $\R$.

At a critical point with $f'(c) = 0$, the concavity often decides the matter: a graph that bends upwards around a horizontal tangent sits in a valley.

::: theorem Second derivative test {#thm-second-derivative-test}
Suppose $f'(c) = 0$ and $f''(c)$ exists.

1. If $f''(c) > 0$, then $f$ has a local minimum at $c$.
2. If $f''(c) < 0$, then $f$ has a local maximum at $c$.
3. If $f''(c) = 0$, the test gives no information.
:::

::: proof
For $f''(c)$ to exist, $f'$ must exist on an open interval around $c$. Since $f'(c) = 0$,

$$
f''(c) = \lim_{h\to0}\frac{f'(c+h) - f'(c)}{h} = \lim_{h\to0}\frac{f'(c+h)}{h}.
$$

In case 1 this limit is positive, so there is $\delta > 0$ such that $f'(c+h)/h > 0$ for $0<\abs h<\delta$ (sign preservation for limits). Hence $f'(c+h) < 0$ for $-\delta<h<0$ and $f'(c+h)>0$ for $0<h<\delta$, and the first derivative test gives a local minimum. (Here $f$ is continuous at $c$ because it is differentiable there.) Case 2 follows by applying case 1 to $-f$. For case 3, the functions $x^4$, $-x^4$ and $x^3$ all have $f'(0) = f''(0) = 0$, but have a minimum, a maximum and neither at $0$.
:::

::: widget plot
f: x^3 + a*x; 3x^2 + a; 6x
sliders: a=-3:-4:4:0.1
x: -2.5, 2.5
y: -6, 6
tangent: 1
labels: f(x) = x^3 + ax; f'(x); f''(x)
caption: Start with $a = -3$: $f$ has a local maximum and minimum at $x = \pm1$, where the graph of $f'$ crosses zero. Drag the tangent and watch it lie below the graph for $x>0$ (concave up, $f''>0$) and above it for $x<0$ (concave down). Now increase $a$: the two critical points $\pm\sqrt{-a/3}$ merge at $a = 0$ into a horizontal inflection point and then disappear, leaving a strictly increasing function. The inflection point stays at $x = 0$, where $f''$ changes sign.
:::

::: quiz
At a point $c$ we know that $f'(c) = 0$ and $f''(c) = 0$. What can you conclude?
- [ ] $f$ has an inflection point at $c$.
- [ ] $f$ has a local minimum at $c$.
- [ ] $f$ has neither a maximum nor a minimum at $c$.
- [x] Nothing: any of these can happen.
::: solution
The second derivative test is inconclusive when $f''(c) = 0$. At $c = 0$, $x^4$ has a minimum, $-x^4$ a maximum, and $x^3$ an inflection point, yet all three have $f'(0) = f''(0) = 0$. Use the first derivative test instead.
:::
:::

## Asymptotes and sketching graphs

Limits describe the graph near the edges of its domain. Vertical asymptotes come from infinite one-sided limits ([[calculus-1/limits#def-infinite-limit]]) and horizontal asymptotes from limits at $\pm\infty$ ([[calculus-1/limits#def-limit-infinity]]). A graph can also approach a sloping line.

::: definition Slant asymptote {#def-slant}
The line $y = mx + b$ with $m \neq 0$ is a **slant** (or oblique) **asymptote** of $f$ as $x\to\infty$ if

$$
\lim_{x\to\infty}\bigl(f(x) - (mx + b)\bigr) = 0,
$$

and similarly as $x\to-\infty$.
:::

If such an asymptote exists, then $m = \lim_{x\to\infty} f(x)/x$ and $b = \lim_{x\to\infty}\bigl(f(x) - mx\bigr)$. For a rational function whose numerator has degree one more than its denominator, polynomial division writes $f(x) = mx + b + r(x)/q(x)$ with $\deg r < \deg q$, and the last term tends to $0$.

Here is a checklist that organises all this information. Not every step is relevant for every function, and the order can be adapted.

::: algorithm Sketching the graph of a function {#alg-sketch}
1. **Domain** — where is $f$ defined?
2. **Intercepts** — $f(0)$, and the solutions of $f(x) = 0$ if they can be found.
3. **Symmetry** — is $f$ even, odd or periodic?
4. **Asymptotes** — vertical asymptotes at the edges of the domain; horizontal or slant asymptotes as $x\to\pm\infty$.
5. **First derivative** — critical points, intervals of increase and decrease, local extrema.
6. **Second derivative** — intervals of concavity and inflection points.
7. **Sketch** — plot the key points, draw the asymptotes as dashed lines, and join the points with curves of the right monotonicity and concavity.
:::

::: example A rational function with a slant asymptote {#ex-sketch-rational}
Sketch the graph of $f(x) = \dfrac{x^2}{x-1}$.
::: solution
*Domain:* $x\neq1$. *Intercepts:* $f(0) = 0$, and $f(x) = 0$ only at $x = 0$. *Symmetry:* none.

*Asymptotes:* As $x\to1^+$ the numerator tends to $1$ and the denominator to $0^+$, so $f\to\infty$; as $x\to1^-$, $f\to-\infty$. So $x = 1$ is a vertical asymptote. Division gives

$$
f(x) = x + 1 + \frac{1}{x-1},
$$

so $f(x) - (x+1)\to0$ as $x\to\pm\infty$: the line $y = x+1$ is a slant asymptote in both directions. Since $\frac{1}{x-1}$ is positive for $x>1$ and negative for $x<1$, the graph lies above the asymptote on the right and below it on the left.

*First derivative:* $f'(x) = \dfrac{2x(x-1) - x^2}{(x-1)^2} = \dfrac{x(x-2)}{(x-1)^2}$. Critical points: $0$ and $2$. The denominator is positive, so $f'>0$ on $(-\infty,0)$, $f'<0$ on $(0,1)$ and on $(1,2)$, and $f'>0$ on $(2,\infty)$. There is a local maximum $f(0) = 0$ and a local minimum $f(2) = 4$. (The local maximum is smaller than the local minimum — they lie on different branches.)

*Second derivative:* differentiating $x + 1 + (x-1)^{-1}$ twice gives $f''(x) = \dfrac{2}{(x-1)^3}$. So $f$ is concave down on $(-\infty, 1)$ and concave up on $(1,\infty)$; there is no inflection point, since $1$ is not in the domain.

The graph has two branches: on the left an arch through the origin, rising from the slant asymptote to a peak at $(0,0)$ and falling to $-\infty$ at the vertical asymptote; on the right a cup with lowest point $(2,4)$, coming down from $+\infty$ and approaching $y = x + 1$ from above.
:::
:::

::: widget plot
f: x^2/(x - 1); x + 1
x: -6, 8
y: -10, 14
vlines: 1
points: 0, 0; 2, 4
labels: \frac{x^2}{x-1}; y = x + 1
caption: The graph of $x^2/(x-1)$ with its vertical asymptote $x = 1$ and slant asymptote $y = x + 1$. Compare it with the analysis in [[#ex-sketch-rational]]: the local maximum at $(0,0)$ on the left branch, the local minimum at $(2,4)$ on the right branch, concave down on the left and concave up on the right. Hover far to the left and right to see the gap between the curve and the asymptote shrink like $1/(x-1)$.
:::

::: example Exponential decay times a power {#ex-sketch-exp}
Sketch $f(x) = xe^{-x}$.
::: solution
*Domain:* $\R$. *Intercepts:* only $(0,0)$. *Asymptotes:* there are no vertical asymptotes. As $x\to\infty$, $f(x) = x/e^x\to0$ by L'Hôpital's rule ([[calculus-1/mean-value-theorem#ex-lhopital]]), so $y = 0$ is a horizontal asymptote on the right; as $x\to-\infty$, $x\to-\infty$ and $e^{-x}\to\infty$, so $f(x)\to-\infty$.

*First derivative:* $f'(x) = e^{-x} - xe^{-x} = (1 - x)e^{-x}$. Since $e^{-x} > 0$, $f$ increases on $(-\infty, 1]$ and decreases on $[1,\infty)$, with the global maximum $f(1) = 1/e\approx0.368$.

*Second derivative:* $f''(x) = -e^{-x} - (1-x)e^{-x} = (x - 2)e^{-x}$. So $f$ is concave down on $(-\infty, 2)$ and concave up on $(2,\infty)$, with an inflection point at $(2, 2e^{-2})\approx(2, 0.271)$.

The graph rises steeply from $-\infty$, passes through the origin, peaks at $(1, 1/e)$, changes from bending down to bending up at $x = 2$, and then decays towards the $x$-axis without reaching it. Functions of this shape describe, for example, the concentration of a drug in the bloodstream after a single dose.
:::
:::

## Optimisation

Many problems ask for the largest or smallest value of a function on an interval. On a closed bounded interval the extreme value theorem guarantees that both exist, and Fermat's theorem tells us where to look.

::: algorithm Closed interval method {#alg-closed-interval}
To find the global maximum and minimum of a continuous function $f$ on a closed bounded interval $[a,b]$:

1. Find the critical points of $f$ in $(a,b)$.
2. Evaluate $f$ at these critical points and at the endpoints $a$ and $b$.
3. The largest of these values is the global maximum and the smallest is the global minimum.
:::

This works because, by [[calculus-1/continuity#thm-evt]], the maximum is attained somewhere in $[a, b]$; if it is attained at an interior point, that point is a local maximum and hence a critical point by Fermat's theorem; otherwise it is attained at an endpoint. The same applies to the minimum. No second-derivative test is needed: we simply compare values.

::: example The closed interval method {#ex-closed-interval}
Find the global maximum and minimum of $f(x) = x^3 - 3x^2 + 1$ on $\bigl[-\frac12, 4\bigr]$.
::: solution
$f'(x) = 3x^2 - 6x = 3x(x-2)$, so the critical points in $(-\frac12, 4)$ are $0$ and $2$. The values are

$$
f\bigl(-\tfrac12\bigr) = \tfrac18, \qquad f(0) = 1, \qquad f(2) = -3, \qquad f(4) = 17.
$$

The global maximum is $17$, at the endpoint $x = 4$; the global minimum is $-3$, at $x = 2$. Note that the local maximum at $0$ is not the global maximum.
:::
:::

::: quiz
To find the global maximum of a continuous function $f$ on $[a, b]$, which points must be checked? (Select all that apply.)
- [x] The critical points of $f$ in $(a,b)$.
- [x] The endpoints $a$ and $b$.
- [ ] The inflection points of $f$.
- [ ] Only the points where $f''<0$.
::: solution
By the extreme value theorem a maximum exists; if it is at an interior point it is a critical point (Fermat), otherwise it is at an endpoint. Inflection points are not candidates as such, and restricting to $f''<0$ would miss maxima at endpoints and at points where $f'$ does not exist.
:::
:::

Applied problems need a translation step before the calculus starts:

1. Read the problem until you know what is to be maximised or minimised, and draw a diagram.
2. Name the quantities, and write the objective as a function of **one** variable, using the constraints to eliminate the others.
3. Determine the domain of that variable from the physical situation.
4. Find the global extremum: by the closed interval method if the domain is a closed bounded interval; otherwise by the first derivative test, as explained below.
5. Answer the question that was asked, with units.

::: example The largest box {#ex-box}
An open-topped box is made from a $30$ cm by $30$ cm square of card by cutting equal squares from the corners and folding up the sides. What size of square gives the largest volume?
::: solution
Let the cut squares have side $x$ cm. The box then has a square base of side $30 - 2x$ and height $x$, so its volume is

$$
V(x) = x(30 - 2x)^2, \qquad 0\le x\le 15.
$$

(At the ends of this interval the box degenerates and $V = 0$.) Differentiating with the product rule,

$$
V'(x) = (30-2x)^2 - 4x(30 - 2x) = (30 - 2x)(30 - 6x) = 12(15 - x)(5 - x).
$$

The only critical point in $(0, 15)$ is $x = 5$. Comparing $V(0) = 0$, $V(5) = 5\cdot20^2 = 2000$ and $V(15) = 0$, the maximum volume is $2000$ cm³, obtained by cutting $5$ cm squares.
:::
:::

::: widget plot
f: x*(30 - 2x)^2
x: 0, 15
y: 0, 2300
tangent: 2
points: 5, 2000
labels: V(x) = x(30-2x)^2
caption: The volume of the box as a function of the cut size $x$. Drag the point of tangency to the top of the curve, where the tangent becomes horizontal: there $x = 5$, $V'(5) = 0$ and the volume reaches $2000$ cm³. Near the maximum the graph is flat, so small errors in cutting cost very little volume.
:::

On an interval that is not closed and bounded, a global extremum need not exist, and the closed interval method does not apply. A useful substitute is the **first derivative test for global extrema**: if $f$ is continuous on an interval $I$ and $c\in I$ is such that $f'<0$ for $x<c$ and $f'>0$ for $x>c$ (in $I$), then $f(c)$ is the global minimum of $f$ on $I$, because $f$ decreases up to $c$ and increases after it. The same holds for maxima with the signs reversed.

::: example The cheapest can {#ex-can}
A cylindrical can must hold a volume $V$. What shape minimises the area of metal used (top, bottom and side)?
::: solution
With radius $r$ and height $h$, the volume is $V = \pi r^2h$ and the surface area is $A = 2\pi r^2 + 2\pi rh$. Eliminating $h = V/(\pi r^2)$,

$$
A(r) = 2\pi r^2 + \frac{2V}{r}, \qquad r > 0.
$$

Then $A'(r) = 4\pi r - \dfrac{2V}{r^2}$, which is zero when $r^3 = \dfrac{V}{2\pi}$. Call this value $r_*$. For $r<r_*$ we have $4\pi r^3 < 2V$, so $A'(r)<0$; for $r > r_*$, $A'(r)>0$. By the first derivative test for global extrema, $A$ has its global minimum on $(0,\infty)$ at $r_*$. The corresponding height is

$$
h = \frac{V}{\pi r_*^2} = \frac{2\pi r_*^3}{\pi r_*^2} = 2r_*.
$$

So the best can is as tall as it is wide: height equals diameter. For a $330$ ml drinks can this gives $r_*\approx3.74$ cm and $h\approx7.49$ cm. Real drinks cans are taller and thinner, because the top and bottom are made of thicker metal than the side, and because of how cans are held and stacked — a reminder that a model is only as good as its assumptions.
:::
:::

::: application Fermat's principle and Snell's law
Light travels at speed $v_1$ in air and $v_2$ in water. A ray goes from a point $A$ at height $a$ above the surface to a point $B$ at depth $b$ below it, at horizontal distance $d$ from $A$. If it crosses the surface at horizontal distance $x$ from $A$, the time taken is

$$
T(x) = \frac{\sqrt{a^2 + x^2}}{v_1} + \frac{\sqrt{b^2 + (d - x)^2}}{v_2}, \qquad
T'(x) = \frac{x}{v_1\sqrt{a^2+x^2}} - \frac{d - x}{v_2\sqrt{b^2 + (d-x)^2}} = \frac{\sin\theta_1}{v_1} - \frac{\sin\theta_2}{v_2},
$$

where $\theta_1$ and $\theta_2$ are the angles of the two parts of the ray with the vertical. One can check that $T''>0$, so $T$ is concave up and its only critical point is the global minimum. Fermat's principle — light takes the path of least time — therefore predicts $\dfrac{\sin\theta_1}{v_1} = \dfrac{\sin\theta_2}{v_2}$, which is Snell's law of refraction, confirmed by every lens and prism.
:::

::: warning Check the endpoints and the domain
Setting $f'(x) = 0$ is only half of an optimisation problem. A maximum can occur at an endpoint ([[#ex-closed-interval]]) or at a point where $f'$ does not exist, and a critical point can be a minimum when you wanted a maximum. On an open or unbounded interval the extremum may not exist at all: $1/x$ has no minimum on $(0,\infty)$. Always justify why your critical point gives the global extremum.
:::

::: history
Extremal problems are among the oldest in mathematics. Heron of Alexandria, in the first century AD, showed that a ray of light reflected in a mirror takes the shortest path between its endpoints. Pierre de Fermat's method of maxima and minima, circulated in manuscript around 1636, was the first systematic use of what is in effect the condition $f'(c) = 0$, and in 1662 Fermat derived the law of refraction from the principle that light takes the path of least time. Leibniz's first paper on the calculus (1684) announced in its title a *new method for maxima and minima, and for tangents*. Systematic discussions of the shapes of curves filled eighteenth-century textbooks such as Maria Gaetana Agnesi's *Instituzioni analitiche* (1748), one of the first comprehensive calculus texts.
:::

## Where this leads

Optimisation with several variables, and with constraints, is the subject of [[multivariable/extrema]], where critical points are found from the gradient and classified by a matrix of second derivatives, and Lagrange multipliers handle constraints. Convex functions — the concave-up functions of this chapter — are the backbone of modern optimisation, because every local minimum of a convex function is a global one. Root-finding by Newton's method, which follows tangent lines to a zero, is studied in [[numerical-analysis/root-finding]], and the curvature of a graph, a more refined measure of bending than the sign of $f''$, appears in [[differential-geometry/curves]].

::: summary
- Critical points are interior points where $f' = 0$ or $f'$ does not exist; interior local extrema can occur only there.
- First derivative test: a change of sign of $f'$ from $+$ to $-$ gives a local maximum, from $-$ to $+$ a local minimum, and no change means no extremum.
- A differentiable function is concave up exactly when $f'$ is increasing; $f''\ge0$ is a sufficient condition. Inflection points are where concavity changes.
- Second derivative test: $f'(c) = 0$ and $f''(c)>0$ give a local minimum, $f''(c)<0$ a local maximum; $f''(c) = 0$ is inconclusive.
- Asymptotes (vertical, horizontal, slant) describe the graph at the edges of its domain; together with the derivatives they determine its shape.
- On a closed bounded interval, global extrema are found by comparing the values at the critical points and at the endpoints.
- In applied problems, reduce to one variable, determine the domain, and justify that the critical point found is the global extremum.
:::

## Exercises

::: exercise Classifying critical points {level=1}
Find the critical points of $f(x) = x^3 - 12x + 1$ and classify each as a local maximum, local minimum or neither.
::: solution
$f'(x) = 3x^2 - 12 = 3(x-2)(x+2)$, so the critical points are $\pm2$. Since $f''(x) = 6x$, we have $f''(-2) = -12<0$ (local maximum, $f(-2) = 17$) and $f''(2) = 12>0$ (local minimum, $f(2) = -15$), by [[#thm-second-derivative-test]].
:::
:::

::: exercise A global maximum {level=1 check="18"}
Find the global maximum value of $f(x) = x^3 - 3x$ on $[0, 3]$.
::: solution
$f'(x) = 3x^2 - 3$ vanishes at $x = \pm1$, and only $x = 1$ lies in $(0,3)$. Comparing $f(0) = 0$, $f(1) = -2$ and $f(3) = 27 - 9 = 18$, the global maximum is $18$, at $x = 3$ (and the global minimum is $-2$, at $x = 1$).
:::
:::

::: exercise Concavity {level=1}
Find the intervals on which $f(x) = x^4 - 6x^2$ is concave up or concave down, and its inflection points.
::: solution
$f''(x) = 12x^2 - 12 = 12(x-1)(x+1)$. This is positive on $(-\infty,-1)$ and $(1,\infty)$, where $f$ is concave up, and negative on $(-1,1)$, where $f$ is concave down. The concavity changes at $x = \pm1$, so the inflection points are $(\pm1, -5)$.
:::
:::

::: exercise A cusp {level=2}
Sketch the graph of $f(x) = 3x^{2/3} - 2x$, identifying its critical points and local extrema.
::: solution
The domain is $\R$ (cube roots of negative numbers are fine). For $x\neq0$,

$$
f'(x) = 2x^{-1/3} - 2 = \frac{2\bigl(1 - x^{1/3}\bigr)}{x^{1/3}}.
$$

So $f'(1) = 0$, and $f'(0)$ does not exist (the difference quotient $3h^{-1/3} - 2$ is unbounded): the critical points are $0$ and $1$. For $x<0$ the numerator is positive and the denominator negative, so $f'<0$; for $0<x<1$ both are positive, so $f'>0$; for $x>1$ the numerator is negative, so $f'<0$. Hence $f$ has a local minimum $f(0) = 0$ at a cusp (the difference quotient tends to $-\infty$ from the left and to $+\infty$ from the right) and a local maximum $f(1) = 1$. For $x\neq0$, $f''(x) = -\frac23x^{-4/3}<0$, so $f$ is concave down on $(-\infty,0)$ and on $(0,\infty)$. As $x\to\infty$ the term $-2x$ dominates and $f\to-\infty$; as $x\to-\infty$, $f\to\infty$. The zeros are $x = 0$ and $x = 27/8$ (from $3x^{2/3} = 2x$, i.e. $x^{1/3} = 3/2$).
:::
:::

::: exercise The closest point on a parabola {level=2 check="sqrt(7)/2"}
Find the shortest distance from the point $(0, 2)$ to the parabola $y = x^2$.
::: hint
Minimise the square of the distance; it has the same minimiser and no square root.
:::
::: solution
The squared distance from $(x, x^2)$ to $(0,2)$ is $D(x) = x^2 + (x^2-2)^2 = x^4 - 3x^2 + 4$. Then $D'(x) = 4x^3 - 6x = 2x(2x^2 - 3)$, with zeros $0$ and $\pm\sqrt{3/2}$. The sign of $D'$ is $-,+,-,+$ on the intervals separated by $-\sqrt{3/2}, 0, \sqrt{3/2}$, so $D$ decreases to $-\sqrt{3/2}$, increases to $0$, decreases to $\sqrt{3/2}$ and then increases. Its global minimum is $D(\pm\sqrt{3/2}) = \frac94 - \frac92 + 4 = \frac74$, and the shortest distance is $\sqrt{7}/2\approx1.32$, attained at $\bigl(\pm\sqrt{3/2}, \frac32\bigr)$. (The critical point $x = 0$, the vertex, is a local *maximum* of the distance.)
:::
:::

::: exercise A field by a river {level=2 check="180000"}
A farmer has $1200$ m of fencing to enclose a rectangular field along a straight river; no fence is needed along the river. What is the largest possible area?
::: solution
Let $x$ be the length of each side perpendicular to the river; the side parallel to the river is $1200 - 2x$. The area is $A(x) = x(1200 - 2x)$ for $0\le x\le600$. Then $A'(x) = 1200 - 4x$ vanishes at $x = 300$, and $A(0) = A(600) = 0$ while $A(300) = 300\cdot600 = 180\,000$ m². So the largest area is $180\,000$ m², with the side along the river twice as long as the others.
:::
:::

::: exercise A slant asymptote {level=2}
Find the slant asymptote of $f(x) = \dfrac{2x^2 + 3x - 1}{x + 2}$, and decide on which side of it the graph lies as $x\to\infty$ and as $x\to-\infty$.
::: solution
Polynomial division gives $2x^2 + 3x - 1 = (x+2)(2x - 1) + 1$, so

$$
f(x) = 2x - 1 + \frac{1}{x+2}.
$$

Since $\frac{1}{x+2}\to0$ as $x\to\pm\infty$, the line $y = 2x - 1$ is a slant asymptote in both directions. For $x > -2$ the remainder term is positive, so the graph lies above the asymptote as $x\to\infty$; for $x<-2$ it is negative, so the graph lies below as $x\to-\infty$.
:::
:::

::: exercise Tangents and chords {#exr-chords level=3}
Let $f$ be concave up on an open interval $I$ in the sense of [[#def-concave]]. Prove that for all $x, y\in I$ and $t\in[0,1]$,

$$
f\bigl((1-t)x + ty\bigr) \le (1-t)f(x) + tf(y).
$$

(Geometrically: the graph lies below each of its chords.)
::: solution
Let $z = (1-t)x + ty$, which lies in $I$ because $I$ is an interval. Apply [[#eq-convex]] with $a = z$, once at $x$ and once at $y$:

$$
f(x)\ge f(z) + f'(z)(x - z), \qquad f(y)\ge f(z) + f'(z)(y - z).
$$

Multiply the first inequality by $1 - t\ge0$, the second by $t\ge0$, and add:

$$
(1-t)f(x) + tf(y) \ge f(z) + f'(z)\bigl((1-t)x + ty - z\bigr) = f(z),
$$

since $(1-t)x + ty - z = 0$. This is the claimed inequality. (The chord inequality makes sense without derivatives and is the usual definition of convexity in analysis and optimisation.)
:::
:::

::: exercise The arithmetic–geometric mean inequality {level=3}
Use the concavity of $\ln$ to prove that $\sqrt{ab}\le\dfrac{a+b}{2}$ for all $a, b>0$.
::: solution
On $(0,\infty)$, $\ln''(x) = -1/x^2<0$, so $\ln$ is concave down by [[#thm-concavity]], and $-\ln$ is concave up. Applying [[#exr-chords]] to $-\ln$ with $t = \frac12$ gives $-\ln\frac{a+b}{2}\le-\frac12\ln a - \frac12\ln b$, that is,

$$
\ln\frac{a+b}{2}\ge\frac{\ln a + \ln b}{2} = \ln\sqrt{ab}.
$$

Since $\exp$ is increasing, $\frac{a+b}{2}\ge\sqrt{ab}$.
:::
:::

::: exercise Strictly convex functions have at most one minimum {level=3}
Suppose $f$ is twice differentiable on $\R$ with $f''(x) > 0$ for all $x$. Prove that $f$ has at most one critical point, and that if $c$ is a critical point then $f(c)$ is the global minimum of $f$.
::: solution
Since $f''>0$, the derivative $f'$ is strictly increasing on $\R$ ([[calculus-1/mean-value-theorem#thm-monotonicity]]), so it takes the value $0$ at most once: $f$ has at most one critical point. (A critical point of $f$ must have $f'(c) = 0$, as $f$ is differentiable everywhere.) If $f'(c) = 0$, then $f'(x) < f'(c) = 0$ for $x<c$ and $f'(x) > 0$ for $x>c$. So $f$ is strictly decreasing on $(-\infty, c]$ and strictly increasing on $[c,\infty)$, and $f(x)>f(c)$ for every $x\neq c$: $f(c)$ is the global minimum. (A function such as $e^x$ shows that a critical point need not exist.)
:::
:::
