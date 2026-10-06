How fast is a falling stone moving at the instant $t = 2$ seconds? Over the interval from $2$ to $2+h$ its average speed is

$$
\frac{s(2+h) - s(2)}{h},
$$

the distance travelled divided by the time taken. But "at the instant $t=2$" the elapsed time is zero, and the formula becomes $0/0$, which means nothing. The way out, found in the seventeenth century and made rigorous in the nineteenth, is to ask what value the average speed *approaches* as $h$ gets closer and closer to $0$. That value is a **limit**.

Limits are the foundation of everything else in calculus: continuity, derivatives, integrals and infinite series are all defined by limits. In this chapter we start from the intuitive idea, turn it into the precise ε–δ definition, prove the rules that make limits computable, and meet one-sided limits, infinite limits and limits at infinity.

## The idea of a limit

Consider the function

$$
f(x) = \frac{x^2 - 1}{x - 1}.
$$

It is not defined at $x = 1$, where both numerator and denominator vanish. Yet nothing dramatic happens near $1$. Evaluating $f$ at nearby points:

| $x$ | $0.9$ | $0.99$ | $0.999$ | $1.001$ | $1.01$ | $1.1$ |
|---|---|---|---|---|---|---|
| $f(x)$ | $1.9$ | $1.99$ | $1.999$ | $2.001$ | $2.01$ | $2.1$ |

The values settle down to $2$. Algebra explains why: for $x \neq 1$ we can cancel the common factor,

$$
f(x) = \frac{(x-1)(x+1)}{x-1} = x + 1 \qquad (x \neq 1),
$$

so the graph of $f$ is the line $y = x+1$ with a single point missing at $(1, 2)$. We write

$$
\lim_{x \to 1} f(x) = 2
$$

and say "the limit of $f(x)$ as $x$ tends to $1$ is $2$".

Informally, $\lim_{x\to a} f(x) = L$ means that **$f(x)$ is as close to $L$ as we like, provided $x$ is close enough to $a$ but not equal to $a$**. Two features of this description deserve emphasis.

- The value of $f$ *at* $a$ plays no role. $f$ need not be defined at $a$, and if it is, $f(a)$ may differ from the limit.
- "Close enough" is a requirement on $x$ that is allowed to depend on how close we want $f(x)$ to be to $L$.

::: quiz
Define $g(x) = \dfrac{x^2-1}{x-1}$ for $x \neq 1$ and $g(1) = 5$. What is $\lim_{x\to 1} g(x)$?
- [ ] $5$, because $g(1) = 5$
- [x] $2$
- [ ] The limit does not exist, because $g$ jumps at $1$
- [ ] $0$, because $x - 1 \to 0$
::: solution
The limit only looks at $x$ *near* $1$, never at $x = 1$ itself. For every $x \neq 1$ we have $g(x) = x + 1$, which is close to $2$ when $x$ is close to $1$. Redefining $g(1)$ changes the value of the function at one point but not its limit: $\lim_{x\to1} g(x) = 2 \neq g(1)$.
:::
:::

Tables of values are suggestive but cannot prove anything — a table can hide behaviour between the sampled points, and numerical rounding can mislead. For a definition we can reason with, we need to make "as close as we like" and "close enough" precise.

## The ε–δ definition

We measure closeness with absolute values: $\abs{f(x) - L}$ is the distance from $f(x)$ to $L$, and $\abs{x - a}$ the distance from $x$ to $a$. "As close as we like" becomes "within any prescribed distance $\eps > 0$", and "close enough to $a$ but not equal to $a$" becomes "$0 < \abs{x - a} < \delta$ for a suitable $\delta > 0$".

::: definition Limit of a function {#def-limit}
Let $f$ be defined on an open interval containing $a$, except possibly at $a$ itself. We say that $f(x)$ **tends to** $L$ as $x$ tends to $a$, and write $\lim_{x\to a} f(x) = L$ or $f(x) \to L$ as $x \to a$, if

$$
\text{for every } \eps > 0 \text{ there is a } \delta > 0 \text{ such that } \quad 0 < \abs{x-a} < \delta \implies \abs{f(x) - L} < \eps.
$$ {#eq-eps-delta}
:::

Geometrically: whatever horizontal band $L - \eps < y < L + \eps$ you draw around the line $y = L$, there is a vertical band $a - \delta < x < a + \delta$ around $x = a$ such that the graph, over that vertical band (with $x = a$ itself removed), stays inside the horizontal band.

::: widget limit
f: (x^2 - 1)/(x - 1)
a: 1
L: 2
hole: true
epsilon: 0.5
caption: Shrink $\eps$ with the slider. The figure finds the largest $\delta$ that works and shades both bands: the graph above the blue interval $0<\lvert x-1\rvert<\delta$ stays inside the orange band $\lvert y-2\rvert<\eps$. For this function the best $\delta$ is exactly $\eps$.
:::

::: intuition The ε–δ game
Think of the definition as a game. A sceptic chooses a tolerance $\eps > 0$, as small as they like. You must reply with a $\delta > 0$ such that every $x$ with $0 < \abs{x-a} < \delta$ gives $\abs{f(x)-L} < \eps$. The statement $\lim_{x\to a} f(x) = L$ means you have a winning strategy: a rule that produces a suitable $\delta$ for *every* $\eps$ the sceptic can choose. A proof of a limit is exactly such a rule, together with the reason it works.
:::

The order of the quantifiers in [[#eq-eps-delta]] matters (see [[proofs/quantifiers]]): $\eps$ comes first and $\delta$ is allowed to depend on it. Usually a smaller $\eps$ forces a smaller $\delta$.

::: example A linear function {#ex-linear}
Prove from the definition that $\lim_{x\to 3} (2x + 1) = 7$.
::: solution
*Scratch work.* We need $\abs{(2x+1) - 7} < \eps$, that is $\abs{2x - 6} = 2\abs{x - 3} < \eps$, which holds as soon as $\abs{x - 3} < \eps/2$. This suggests $\delta = \eps/2$.

*Proof.* Let $\eps > 0$ and put $\delta = \eps/2 > 0$. If $0 < \abs{x - 3} < \delta$, then

$$
\abs{(2x + 1) - 7} = 2\abs{x - 3} < 2\delta = \eps.
$$

So the condition in [[#def-limit]] holds and $\lim_{x\to3}(2x+1) = 7$.
:::
:::

Notice the two stages: scratch work that *finds* $\delta$ by working backwards from the inequality we want, and then a clean proof that runs forwards. Only the second stage is the proof.

::: example A quadratic {#ex-quadratic}
Prove that $\lim_{x\to 2} x^2 = 4$.
::: solution
*Scratch work.* We want $\abs{x^2 - 4} = \abs{x - 2}\,\abs{x + 2} < \eps$. The factor $\abs{x-2}$ is the one we control; the factor $\abs{x + 2}$ varies with $x$, so we first bound it. If we insist that $\abs{x - 2} < 1$, then $1 < x < 3$, so $3 < x + 2 < 5$ and $\abs{x + 2} < 5$. Then $\abs{x^2 - 4} < 5\abs{x - 2}$, which is less than $\eps$ when $\abs{x - 2} < \eps/5$. Both restrictions hold if $\delta = \min(1, \eps/5)$.

*Proof.* Let $\eps > 0$ and set $\delta = \min(1, \eps/5)$. Suppose $0 < \abs{x - 2} < \delta$. Since $\delta \le 1$ we have $1 < x < 3$, hence $\abs{x + 2} < 5$; since $\delta \le \eps/5$,

$$
\abs{x^2 - 4} = \abs{x-2}\,\abs{x+2} < \frac{\eps}{5}\cdot 5 = \eps. \qquad \blacksquare
$$
:::
:::

The trick of first restricting $\delta \le 1$ to tame the "uncontrolled" factor is used constantly; remember it.

The same trick handles quotients, where the danger is a denominator close to zero.

::: example A reciprocal {#ex-reciprocal}
Prove that $\lim_{x\to 2} \dfrac1x = \dfrac12$.
::: solution
*Scratch work.* For $x \neq 0$,

$$
\abs{\frac1x - \frac12} = \frac{\abs{2 - x}}{2\abs{x}}.
$$

The factor $\abs{x - 2}$ is under control; we must keep $\abs{x}$ away from $0$ so that $\dfrac{1}{2\abs{x}}$ stays bounded. If $\abs{x - 2} < 1$ then $1 < x < 3$, so $\abs{x} > 1$ and $\dfrac{1}{2\abs{x}} < \dfrac12$. Then $\abs{\frac1x - \frac12} < \frac12\abs{x - 2}$, which is less than $\eps$ when $\abs{x-2} < 2\eps$.

*Proof.* Let $\eps > 0$ and put $\delta = \min(1, 2\eps)$. If $0 < \abs{x-2} < \delta$, then $1 < x < 3$, so $x \neq 0$ and

$$
\abs{\frac1x - \frac12} = \frac{\abs{x-2}}{2\abs{x}} < \frac{\abs{x-2}}{2} < \frac{2\eps}{2} = \eps. \qquad\blacksquare
$$
:::
:::

Notice what the restriction $\delta \le 1$ bought us: not only a bound on the troublesome factor, but the guarantee that $1/x$ is defined at every point we consider.

::: warning δ must not depend on x
A common error in the scratch work above is to choose $\delta = \eps/\abs{x + 2}$. This is not allowed: $\delta$ has to be fixed *before* $x$ is chosen, so it may depend on $\eps$ and $a$ but never on $x$. Bounding the troublesome factor by a constant, as we did with $\abs{x+2} < 5$, is the way around it.
:::

::: quiz
Which statement about the ε–δ definition is correct?
- [ ] $\delta$ is chosen first, and then we check whether a suitable $\eps$ exists.
- [x] $\delta$ may depend on $\eps$ (and on $a$), but not on $x$.
- [ ] We always need $\delta < \eps$.
- [ ] The inequality $\abs{f(x) - L} < \eps$ must also hold at $x = a$.
::: solution
The definition reads "for every $\eps$ there is a $\delta$", so $\delta$ is chosen after $\eps$ and may depend on it. It is chosen before $x$, so it cannot depend on $x$. Nothing forces $\delta < \eps$ (for $f(x) = x/10$ at $a=0$, $\delta = 10\eps$ works), and the condition $0 < \abs{x-a}$ explicitly excludes $x = a$.
:::
:::

### When a limit does not exist

Negating the definition (as in [[proofs/quantifiers]]) tells us what it means for $L$ **not** to be the limit: there is some $\eps > 0$ such that for every $\delta > 0$ there is an $x$ with $0 < \abs{x-a} < \delta$ but $\abs{f(x) - L} \ge \eps$. The limit does not exist if this happens for every real number $L$.

::: example The sign function at 0 {#ex-sign}
Let $\sgn(x) = 1$ for $x > 0$, $\sgn(x) = -1$ for $x < 0$ and $\sgn(0) = 0$. Show that $\lim_{x\to0}\sgn(x)$ does not exist.
::: solution
Suppose, for a contradiction, that $\lim_{x\to 0}\sgn(x) = L$. Take $\eps = \tfrac12$. Then there is a $\delta > 0$ such that $\abs{\sgn(x) - L} < \tfrac12$ whenever $0 < \abs{x} < \delta$. Both $x = \delta/2$ and $x = -\delta/2$ qualify, so

$$
\abs{1 - L} < \tfrac12 \quad\text{and}\quad \abs{-1 - L} < \tfrac12.
$$

By the triangle inequality, $2 = \abs{1 - (-1)} \le \abs{1 - L} + \abs{L - (-1)} < \tfrac12 + \tfrac12 = 1$, which is false. So no such $L$ exists.
:::
:::

If a limit exists it is unambiguous — a function cannot approach two different numbers at once.

::: theorem Uniqueness of limits {#thm-unique}
If $\lim_{x\to a} f(x) = L$ and $\lim_{x\to a} f(x) = M$, then $L = M$.
:::

::: proof
Suppose $L \neq M$ and let $\eps = \abs{L - M}/2 > 0$. By the definition there are $\delta_1, \delta_2 > 0$ with $\abs{f(x) - L} < \eps$ when $0<\abs{x-a}<\delta_1$ and $\abs{f(x) - M} < \eps$ when $0<\abs{x-a}<\delta_2$. Choose any $x$ with $0 < \abs{x - a} < \min(\delta_1, \delta_2)$; such $x$ exist because $f$ is defined on an interval around $a$. Then

$$
\abs{L - M} \le \abs{L - f(x)} + \abs{f(x) - M} < 2\eps = \abs{L - M},
$$

a contradiction. Hence $L = M$.
:::

## Limit laws

Proving every limit from the definition would be exhausting. Fortunately limits behave well with respect to arithmetic, so a few basic limits plus the following rules handle most expressions.

::: theorem Limit laws {#thm-laws}
Suppose $\lim_{x\to a} f(x) = L$ and $\lim_{x\to a} g(x) = M$, and let $c$ be a constant. Then

1. $\lim_{x\to a} \bigl(f(x) + g(x)\bigr) = L + M$;
2. $\lim_{x\to a} c\,f(x) = cL$;
3. $\lim_{x\to a} f(x)\,g(x) = LM$;
4. if $M \neq 0$, then $\lim_{x\to a} \dfrac{f(x)}{g(x)} = \dfrac{L}{M}$.
:::

::: proof
**Sum.** Let $\eps > 0$. Choose $\delta_1$ so that $\abs{f(x) - L} < \eps/2$ when $0 < \abs{x-a} < \delta_1$, and $\delta_2$ so that $\abs{g(x) - M} < \eps/2$ when $0<\abs{x-a}<\delta_2$. For $0 < \abs{x - a} < \delta = \min(\delta_1, \delta_2)$,

$$
\abs{(f(x)+g(x)) - (L+M)} \le \abs{f(x) - L} + \abs{g(x) - M} < \frac{\eps}{2} + \frac{\eps}{2} = \eps.
$$

**Constant multiple.** This is the product rule with $g(x) = c$ (a constant function tends to $c$: any $\delta$ works).

**Product.** Add and subtract $L\,g(x)$:

$$
\abs{f(x)g(x) - LM} = \abs{\bigl(f(x) - L\bigr)g(x) + L\bigl(g(x) - M\bigr)} \le \abs{g(x)}\,\abs{f(x) - L} + \abs{L}\,\abs{g(x) - M}.
$$

First tame $\abs{g(x)}$: there is $\delta_1$ with $\abs{g(x) - M} < 1$, hence $\abs{g(x)} < \abs{M} + 1$, when $0<\abs{x-a}<\delta_1$. Next choose $\delta_2$ with $\abs{f(x) - L} < \dfrac{\eps}{2(\abs{M}+1)}$ and $\delta_3$ with $\abs{g(x) - M} < \dfrac{\eps}{2(\abs{L}+1)}$. For $0 < \abs{x-a} < \min(\delta_1,\delta_2,\delta_3)$,

$$
\abs{f(x)g(x) - LM} < (\abs{M}+1)\frac{\eps}{2(\abs{M}+1)} + \abs{L}\,\frac{\eps}{2(\abs{L}+1)} < \frac{\eps}{2} + \frac{\eps}{2} = \eps.
$$

**Quotient.** Since $f/g = f\cdot(1/g)$, by the product rule it suffices to show $1/g(x) \to 1/M$. Choose $\delta_1$ with $\abs{g(x) - M} < \abs{M}/2$ for $0<\abs{x-a}<\delta_1$; then $\abs{g(x)} > \abs{M}/2 > 0$, so in particular $g(x) \neq 0$ and $1/g(x)$ is defined there. For such $x$,

$$
\abs{\frac{1}{g(x)} - \frac{1}{M}} = \frac{\abs{M - g(x)}}{\abs{g(x)}\,\abs{M}} \le \frac{2}{\abs{M}^2}\,\abs{g(x) - M}.
$$

Choose $\delta_2$ with $\abs{g(x) - M} < \eps\abs{M}^2/2$; for $0<\abs{x-a}<\min(\delta_1,\delta_2)$ the right-hand side is less than $\eps$.
:::

Two limits are immediate from the definition: a constant function satisfies $\lim_{x\to a} c = c$ (any $\delta$ works), and $\lim_{x\to a} x = a$ (take $\delta = \eps$). Repeated use of the sum and product rules then gives the most useful consequence of all.

::: corollary Direct substitution {#cor-substitution}
If $p$ and $q$ are polynomials and $q(a) \neq 0$, then

$$
\lim_{x\to a} p(x) = p(a) \qquad\text{and}\qquad \lim_{x\to a}\frac{p(x)}{q(x)} = \frac{p(a)}{q(a)}.
$$
:::

::: proof
Write $p(x) = c_n x^n + \dots + c_1 x + c_0$. By the product rule applied $k-1$ times, $x^k \to a^k$; by the constant-multiple and sum rules, $p(x) \to c_n a^n + \dots + c_0 = p(a)$. The statement for $p/q$ follows from the quotient rule because $q(x) \to q(a) \neq 0$.
:::

Limits also respect inequalities, a fact we shall use repeatedly (it is behind the squeeze theorem below).

::: theorem Limits preserve weak inequalities {#thm-order}
If $f(x) \le g(x)$ for all $x \neq a$ in an open interval around $a$, and $\lim_{x\to a} f(x) = L$ and $\lim_{x\to a} g(x) = M$, then $L \le M$.
:::

::: proof
Suppose instead that $L > M$, and let $\eps = (L - M)/2 > 0$. For $x \neq a$ close enough to $a$ we have both $\abs{f(x) - L} < \eps$ and $\abs{g(x) - M} < \eps$, and also $f(x) \le g(x)$. Then

$$
f(x) > L - \eps = \frac{L+M}{2} = M + \eps > g(x),
$$

contradicting $f(x) \le g(x)$. Hence $L \le M$.
:::

::: warning Strict inequalities are not preserved
If $f(x) < g(x)$ for all $x \neq a$, we can only conclude $L \le M$, not $L < M$. For example $0 < x^2$ for every $x \neq 0$, yet $\lim_{x\to0}0 = \lim_{x\to0}x^2 = 0$.
:::

When direct substitution produces $0/0$, the expression must first be rewritten. The two standard tools are factorising and multiplying by a conjugate.

::: example Cancelling a common factor {#ex-factor}
Find $\displaystyle\lim_{x\to 1}\frac{x^3 - 1}{x - 1}$.
::: solution
Substituting $x=1$ gives $0/0$, so we factorise: $x^3 - 1 = (x-1)(x^2+x+1)$. For $x \neq 1$,

$$
\frac{x^3-1}{x-1} = x^2 + x + 1,
$$

and the limit only involves $x \neq 1$. By [[#cor-substitution]],

$$
\lim_{x\to1}\frac{x^3-1}{x-1} = \lim_{x\to1}(x^2+x+1) = 3.
$$
:::
:::

::: example Multiplying by the conjugate {#ex-conjugate}
Find $\displaystyle\lim_{x\to 0}\frac{\sqrt{x+4} - 2}{x}$.
::: solution
Again direct substitution gives $0/0$. Multiply numerator and denominator by the conjugate $\sqrt{x+4}+2$:

$$
\frac{\sqrt{x+4}-2}{x}\cdot\frac{\sqrt{x+4}+2}{\sqrt{x+4}+2} = \frac{(x+4) - 4}{x\bigl(\sqrt{x+4}+2\bigr)} = \frac{1}{\sqrt{x+4}+2} \qquad (x\neq 0).
$$

As $x \to 0$, $\sqrt{x+4} \to 2$ (the square root is continuous, see [[calculus-1/continuity]]), so the limit is $\dfrac{1}{2+2} = \dfrac14$.
:::
:::

::: warning 0/0 is not a number
When substitution gives $0/0$, this says nothing about the limit — it only says that the substitution shortcut has failed. The limits $\lim_{x\to0} x/x = 1$, $\lim_{x\to0} x^2/x = 0$ and $\lim_{x\to0} x/x^3$ (which does not exist) all have the "form" $0/0$. Such forms are called **indeterminate**; the expression must be simplified, or a tool such as L'Hôpital's rule ([[calculus-1/mean-value-theorem]]) used.
:::

## The squeeze theorem

Some functions resist algebraic simplification but can be trapped between two simpler functions with the same limit.

::: theorem Squeeze theorem {#thm-squeeze}
Suppose $g(x) \le f(x) \le h(x)$ for all $x$ in an open interval around $a$ (except possibly at $a$), and

$$
\lim_{x\to a} g(x) = \lim_{x\to a} h(x) = L.
$$

Then $\lim_{x\to a} f(x) = L$.
:::

::: proof
Let $\eps > 0$. Choose $\delta_1$ such that $L - \eps < g(x) < L + \eps$ when $0<\abs{x-a}<\delta_1$, and $\delta_2$ such that $L - \eps < h(x) < L + \eps$ when $0<\abs{x-a}<\delta_2$; let $\delta_3$ be such that the inequalities $g \le f \le h$ hold for $0 < \abs{x-a} < \delta_3$. For $0 < \abs{x - a} < \min(\delta_1,\delta_2,\delta_3)$,

$$
L - \eps < g(x) \le f(x) \le h(x) < L + \eps,
$$

so $\abs{f(x) - L} < \eps$.
:::

::: example A wildly oscillating function {#ex-squeeze}
Show that $\displaystyle\lim_{x\to0} x^2\sin\frac1x = 0$.
::: solution
The limit laws do not apply, because $\sin(1/x)$ has no limit as $x\to0$ (it oscillates between $-1$ and $1$ infinitely often; see [[#exr-sin-reciprocal]]). But $\abs{\sin(1/x)} \le 1$, so for $x \neq 0$

$$
-x^2 \le x^2 \sin\frac1x \le x^2 .
$$

Both $-x^2$ and $x^2$ tend to $0$, so the squeeze theorem gives $\lim_{x\to0} x^2\sin(1/x) = 0$.
:::
:::

::: widget plot
f: x^2*sin(1/x); x^2; -x^2
x: -0.4, 0.4
y: -0.12, 0.12
labels: x^2\sin(1/x); x^2; -x^2
caption: The oscillating graph of $x^2\sin(1/x)$ is trapped between $y = x^2$ and $y = -x^2$. However wildly it oscillates, it is forced towards $0$ as $x \to 0$. Hover to read off values.
:::

The most important application of the squeeze theorem in calculus is the following limit, on which the derivatives of all trigonometric functions depend. As always in calculus, angles are measured in radians.

::: theorem The fundamental trigonometric limit {#thm-sinx}
$$
\lim_{x\to 0}\frac{\sin x}{x} = 1.
$$
:::

::: proof
First let $0 < x < \pi/2$. On the unit circle centred at $O$, let $A = (1, 0)$, let $P = (\cos x, \sin x)$ be the point at angle $x$, and let $T = (1, \tan x)$ be where the line $OP$ meets the tangent line to the circle at $A$. The triangle $OAP$ lies inside the circular sector $OAP$, which lies inside the triangle $OAT$. Comparing areas,

$$
\frac12\sin x \;<\; \frac12 x \;<\; \frac12\tan x .
$$

Since $\sin x > 0$, dividing by $\tfrac12 \sin x$ gives $1 < \dfrac{x}{\sin x} < \dfrac{1}{\cos x}$, and taking reciprocals,

$$
\cos x < \frac{\sin x}{x} < 1 \qquad \left(0 < x < \tfrac{\pi}{2}\right).
$$

Both $\cos x$ and $\dfrac{\sin x}{x}$ are even functions, so the same inequalities hold for $-\pi/2 < x < 0$. Finally $\cos x \to 1$: from $\abs{\sin t} \le \abs{t}$ (which the area comparison also shows) we get $0 \le 1 - \cos x = 2\sin^2(x/2) \le x^2/2 \to 0$. The squeeze theorem gives $\dfrac{\sin x}{x}\to 1$.
:::

::: corollary {#cor-cos}
$$
\lim_{x\to0}\frac{1-\cos x}{x} = 0.
$$
:::

::: proof
For $0 < \abs{x} < \pi/2$ we have $\cos x \neq -1$, so

$$
\frac{1-\cos x}{x} = \frac{1-\cos^2 x}{x(1+\cos x)} = \frac{\sin x}{x}\cdot\frac{\sin x}{1+\cos x} \;\longrightarrow\; 1 \cdot \frac{0}{2} = 0
$$

by [[#thm-sinx]] and the limit laws.
:::

::: example Rescaling the angle {#ex-sin3x}
Find $\displaystyle\lim_{x\to 0}\frac{\sin 3x}{x}$.
::: solution
The theorem needs the *same* quantity inside the sine and in the denominator. Write

$$
\frac{\sin 3x}{x} = 3\cdot\frac{\sin 3x}{3x}.
$$

As $x \to 0$, $u = 3x \to 0$, and $\dfrac{\sin u}{u} \to 1$, so the limit is $3$. (Formally we are using that if $u(x) \to 0$ with $u(x) \neq 0$ for $x \neq 0$, then $\frac{\sin u(x)}{u(x)} \to 1$; this is a special case of the composition rule for limits proved in [[calculus-1/continuity]].)
:::
:::

## One-sided limits

Sometimes a function behaves differently on the two sides of a point. The floor function $\lfloor x\rfloor$ (the greatest integer $\le x$) is $0$ just to the left of $1$ and $1$ just to the right. We can still describe each side separately.

::: definition One-sided limits {#def-one-sided}
We write $\displaystyle\lim_{x\to a^+} f(x) = L$ (the **right-hand limit**) if for every $\eps > 0$ there is a $\delta > 0$ such that

$$
a < x < a + \delta \implies \abs{f(x) - L} < \eps,
$$

and $\displaystyle\lim_{x\to a^-} f(x) = L$ (the **left-hand limit**) if the same holds with $a - \delta < x < a$.
:::

::: theorem Two-sided limits from one-sided limits {#thm-two-sided}
$\lim_{x\to a} f(x) = L$ if and only if both $\lim_{x\to a^-} f(x)$ and $\lim_{x\to a^+} f(x)$ exist and equal $L$.
:::

::: proof
If $\lim_{x\to a}f(x) = L$, then any $\delta$ that works for the two-sided limit works for each one-sided limit, because the one-sided conditions only ask for part of what $0<\abs{x-a}<\delta$ provides. Conversely, given $\eps > 0$, let $\delta_-$ and $\delta_+$ work for the left- and right-hand limits. With $\delta = \min(\delta_-, \delta_+)$, every $x$ with $0 < \abs{x - a} < \delta$ lies in $(a - \delta_-, a)$ or $(a, a + \delta_+)$, so $\abs{f(x) - L} < \eps$.
:::

For example, $\lim_{x\to1^-}\lfloor x\rfloor = 0$ and $\lim_{x\to1^+}\lfloor x\rfloor = 1$, so by [[#thm-two-sided]] the two-sided limit at $1$ does not exist. The same reasoning applied to $\sgn$ gives a second proof of [[#ex-sign]].

## Infinite limits and limits at infinity

The symbol $\infty$ is not a real number, but it is convenient shorthand for two further kinds of behaviour: values that grow without bound, and inputs that grow without bound.

::: definition Infinite limit {#def-infinite-limit}
We write $\lim_{x\to a} f(x) = \infty$ if for every $M > 0$ there is a $\delta > 0$ such that $0 < \abs{x - a} < \delta \implies f(x) > M$. Similarly $\lim_{x\to a} f(x) = -\infty$ means $f(x) < -M$, and one-sided versions are defined in the obvious way. In each case the line $x = a$ is a **vertical asymptote** of the graph.
:::

For instance $\lim_{x\to0} \dfrac{1}{x^2} = \infty$: given $M > 0$, take $\delta = 1/\sqrt{M}$; then $0 < \abs{x} < \delta$ gives $x^2 < 1/M$, so $1/x^2 > M$. On the other hand $1/x$ has $\lim_{x\to0^+} 1/x = \infty$ but $\lim_{x\to0^-}1/x = -\infty$, so not even an infinite two-sided limit exists.

::: definition Limit at infinity {#def-limit-infinity}
We write $\lim_{x\to\infty} f(x) = L$ if for every $\eps > 0$ there is a number $N$ such that $x > N \implies \abs{f(x) - L} < \eps$; similarly for $x \to -\infty$ with $x < N$. The line $y = L$ is then a **horizontal asymptote**.
:::

The basic example is $\lim_{x\to\infty} 1/x = 0$: given $\eps>0$, any $x > N = 1/\eps$ gives $0 < 1/x < \eps$. The limit laws hold for limits at infinity with the same proofs (replace "$0<\abs{x-a}<\delta$" by "$x > N$").

::: example A rational function at infinity {#ex-rational-infinity}
Find $\displaystyle\lim_{x\to\infty}\frac{3x^2 + 1}{2x^2 - x}$.
::: solution
Divide numerator and denominator by the highest power of $x$ in the denominator, $x^2$:

$$
\frac{3x^2+1}{2x^2-x} = \frac{3 + 1/x^2}{2 - 1/x}.
$$

As $x\to\infty$, $1/x \to 0$ and $1/x^2 = (1/x)^2 \to 0$, so by the limit laws the expression tends to $\dfrac{3+0}{2-0} = \dfrac32$. The graph has the horizontal asymptote $y = 3/2$.
:::
:::

::: example A difference of large quantities {#ex-conjugate-infinity}
Find $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2 + x} - x\right)$.
::: solution
Both terms grow without bound, so this has the indeterminate form $\infty - \infty$ (see the warning below). Multiply and divide by the conjugate:

$$
\sqrt{x^2+x} - x = \frac{(x^2 + x) - x^2}{\sqrt{x^2+x} + x} = \frac{x}{\sqrt{x^2+x}+x} = \frac{1}{\sqrt{1 + 1/x} + 1} \qquad (x > 0),
$$

where in the last step we divided numerator and denominator by $x = \sqrt{x^2}$. As $x\to\infty$, $1/x \to 0$ and $\sqrt{1 + 1/x} \to 1$, so the limit is $\dfrac{1}{1+1} = \dfrac12$. A quick numerical check: at $x = 10^6$ the expression equals $0.49999987\ldots$
:::
:::

::: widget plot
f: 1/x; (3x^2 + 1)/(2x^2 - x)
x: -6, 6
y: -6, 6
labels: 1/x; \frac{3x^2+1}{2x^2-x}
hlines: 1.5
vlines: 0; 0.5
caption: Two kinds of asymptote. Near $x=0$ and $x=\tfrac12$ the values blow up (vertical asymptotes: one-sided limits are $\pm\infty$); as $x\to\pm\infty$ the rational function settles on the horizontal asymptote $y = \tfrac32$ while $1/x$ settles on $y=0$.
:::

::: quiz
What is $\displaystyle\lim_{x\to 0^+}\frac{1}{x}$?
- [ ] $0$
- [x] $\infty$ — that is, the values increase without bound, so there is no real limit
- [ ] $-\infty$
- [ ] It is not defined, because $1/0$ is undefined
::: solution
For small positive $x$, $1/x$ is large and positive: given any $M>0$, all $x \in (0, 1/M)$ satisfy $1/x > M$. We write $\lim_{x\to0^+}1/x = \infty$. This is a precise statement about *how* the limit fails to exist as a real number. (The fact that $1/0$ is undefined is irrelevant: limits never look at the value at the point itself.)
:::
:::

::: warning ∞ is not a number
"$\lim_{x\to a} f(x) = \infty$" does **not** say that a limit exists; it says the limit fails to exist in a particular way. In particular, the limit laws do not extend to "$\infty - \infty$" or "$0\cdot\infty$": $\lim_{x\to0}\bigl(\tfrac{1}{x^2} - \tfrac{1}{x^2}\bigr) = 0$ while $\lim_{x\to0}\bigl(\tfrac{1}{x^2} - \tfrac{1}{x^4}\bigr) = -\infty$, although both have the form $\infty - \infty$.
:::

::: remark Limits through sequences
The limit of a function can be tested along sequences: $\lim_{x\to a} f(x) = L$ if and only if $f(x_n) \to L$ for **every** sequence $x_n \to a$ with $x_n \neq a$. This is often the easiest way to show that a limit does *not* exist — find two sequences approaching $a$ along which $f$ has different limits. Sequences are studied in [[calculus-2/sequences]], and the equivalence is proved in [[real-analysis/continuity]].
:::

::: application Why computers do not take limits
A computer cannot let $h$ "tend to $0$". To estimate the speed in the opening example numerically, it evaluates the difference quotient for a small but definite $h$. Making $h$ too large gives a poor approximation, but making it too small is also harmful: $s(2+h)$ and $s(2)$ agree in almost all their digits, and subtracting them destroys significant figures. In double-precision arithmetic the best accuracy for this quotient is reached around $h \approx 10^{-8}$. Balancing the two kinds of error is a central theme of [[numerical-analysis/floating-point]].
:::

::: history
Newton and Leibniz developed calculus in the 1660s–1680s using "infinitely small" quantities, which were added like ordinary numbers and then discarded as if they were zero. In *The Analyst* (1734) the philosopher George Berkeley mocked these as "ghosts of departed quantities". The idea of a limit was formulated in words by d'Alembert in the eighteenth century and used systematically by Augustin-Louis Cauchy in his *Cours d'analyse* (1821). Bernard Bolzano had already given a precise definition of continuity in 1817. The fully quantified ε–δ formulation used today was established by Karl Weierstrass in his Berlin lectures from the late 1850s onwards, completing the move of analysis onto rigorous foundations.
:::

## Where this leads

Limits are the language for everything that follows. A function is **continuous** at $a$ exactly when $\lim_{x\to a} f(x) = f(a)$ ([[calculus-1/continuity]]); the **derivative** is the limit of difference quotients from the opening example ([[calculus-1/derivatives]]); the **integral** is a limit of sums ([[calculus-1/integrals]]); and infinite series are limits of partial sums ([[calculus-2/series]]). In [[real-analysis/continuity]] the ε–δ definition becomes the basis for proving the deep theorems that calculus takes on trust.

::: summary
- $\lim_{x\to a} f(x) = L$ means $f(x)$ is within any $\eps>0$ of $L$ for all $x \neq a$ within some $\delta>0$ of $a$ ([[#def-limit]]). The value $f(a)$ is irrelevant.
- To prove a limit, find $\delta$ in terms of $\eps$ by scratch work, then write the forward proof; $\delta$ may depend on $\eps$ and $a$, never on $x$.
- Limits are unique, obey the sum, product and quotient laws ([[#thm-laws]]) and preserve weak inequalities ([[#thm-order]]); polynomials and rational functions can be evaluated by direct substitution where the denominator is non-zero.
- The form $0/0$ is indeterminate: simplify by factorising or multiplying by a conjugate.
- The squeeze theorem handles oscillating functions and gives $\lim_{x\to0}\frac{\sin x}{x} = 1$ ([[#thm-sinx]]).
- A two-sided limit exists exactly when both one-sided limits exist and agree.
- $\lim f = \pm\infty$ (vertical asymptotes) and $\lim_{x\to\pm\infty} f$ (horizontal asymptotes) extend the language; $\infty$ is not a number.
:::

## Exercises

::: exercise Factorise first {level=1 check="8"}
Find $\displaystyle\lim_{x\to 4}\frac{x^2-16}{x-4}$.
::: solution
For $x \neq 4$, $\dfrac{x^2-16}{x-4} = \dfrac{(x-4)(x+4)}{x-4} = x+4$, so the limit is $4 + 4 = 8$.
:::
:::

::: exercise A conjugate {level=1 check="1/2"}
Find $\displaystyle\lim_{x\to 0}\frac{\sqrt{1+x}-1}{x}$.
::: solution
Multiplying by the conjugate, for $x \neq 0$ (and $x > -1$),

$$
\frac{\sqrt{1+x}-1}{x} = \frac{(1+x)-1}{x(\sqrt{1+x}+1)} = \frac{1}{\sqrt{1+x}+1} \to \frac{1}{2}.
$$
:::
:::

::: exercise A limit at infinity {level=1 check="5/2"}
Find $\displaystyle\lim_{x\to\infty}\frac{5x^3 - x}{2x^3 + 7}$.
::: solution
Dividing by $x^3$: $\dfrac{5 - 1/x^2}{2 + 7/x^3} \to \dfrac{5}{2}$ as $x\to\infty$.
:::
:::

::: exercise An ε–δ proof {level=2}
Use the definition to prove that $\lim_{x\to -1}(4 - 3x) = 7$.
::: hint
Write $\abs{(4-3x) - 7}$ in terms of $\abs{x - (-1)}$.
:::
::: solution
We have $\abs{(4-3x)-7} = \abs{-3x-3} = 3\abs{x+1}$. Let $\eps > 0$ and set $\delta = \eps/3$. If $0<\abs{x+1}<\delta$ then $\abs{(4-3x)-7} = 3\abs{x+1} < 3\delta = \eps$.
:::
:::

::: exercise Two sines {level=2 check="5/2"}
Find $\displaystyle\lim_{x\to0}\frac{\sin 5x}{\sin 2x}$.
::: hint
Write the quotient as $\dfrac{\sin 5x}{5x}\cdot\dfrac{2x}{\sin 2x}\cdot\dfrac{5}{2}$.
:::
::: solution
For small $x \neq 0$,

$$
\frac{\sin 5x}{\sin 2x} = \frac{\sin 5x}{5x}\cdot\frac{2x}{\sin 2x}\cdot\frac{5x}{2x} = \frac{\sin 5x}{5x}\cdot\left(\frac{\sin 2x}{2x}\right)^{-1}\cdot\frac{5}{2}.
$$

By [[#thm-sinx]] both fractions tend to $1$, so the limit is $\tfrac52$.
:::
:::

::: exercise Squeezing {level=2}
Prove that $\lim_{x\to0} x\cos(1/x) = 0$.
::: solution
For $x \neq 0$, $\abs{\cos(1/x)} \le 1$, so $-\abs{x} \le x\cos(1/x) \le \abs{x}$. Since $\lim_{x\to0}\abs{x} = 0$ (take $\delta = \eps$), the squeeze theorem ([[#thm-squeeze]]) gives the result.
:::
:::

::: exercise One-sided limits {level=2}
Let $f(x) = \dfrac{\abs{x - 2}}{x - 2}$. Find $\lim_{x\to2^-}f(x)$ and $\lim_{x\to2^+}f(x)$. Does $\lim_{x\to2}f(x)$ exist?
::: solution
For $x > 2$, $\abs{x-2} = x-2$ and $f(x) = 1$; for $x < 2$, $\abs{x-2} = -(x-2)$ and $f(x) = -1$. Hence $\lim_{x\to2^+}f(x) = 1$ and $\lim_{x\to2^-}f(x) = -1$. These differ, so by [[#thm-two-sided]] the two-sided limit does not exist.
:::
:::

::: exercise A square root {level=3}
Prove from the definition that $\lim_{x\to 9}\sqrt{x} = 3$.
::: hint
Multiply $\sqrt{x} - 3$ by its conjugate to bring out the factor $x - 9$, then bound the other factor.
:::
::: solution
For $x \ge 0$,

$$
\abs{\sqrt{x} - 3} = \frac{\abs{x - 9}}{\sqrt{x}+3} \le \frac{\abs{x-9}}{3}.
$$

Let $\eps > 0$ and $\delta = \min(9, 3\eps)$. If $0 < \abs{x - 9} < \delta$ then $x > 0$ (since $\delta \le 9$), so $\sqrt{x}$ is defined and $\abs{\sqrt x - 3} \le \abs{x-9}/3 < \delta/3 \le \eps$.
:::
:::

::: exercise A limit that does not exist {#exr-sin-reciprocal level=3}
Prove that $\lim_{x\to0}\sin(1/x)$ does not exist.
::: hint
Look at the points $x_n = \dfrac{1}{n\pi}$ and $y_n = \dfrac{1}{\pi/2 + 2n\pi}$.
:::
::: solution
Suppose the limit is $L$. Take $\eps = \tfrac12$ and let $\delta > 0$ be as in the definition. For $n$ large enough, both $x_n = \frac{1}{n\pi}$ and $y_n = \frac{1}{\pi/2+2n\pi}$ lie in $(0, \delta)$, and $\sin(1/x_n) = \sin(n\pi) = 0$ while $\sin(1/y_n) = \sin(\pi/2 + 2n\pi) = 1$. Hence $\abs{0 - L} < \tfrac12$ and $\abs{1 - L} < \tfrac12$, giving $1 \le \abs{0 - L} + \abs{L - 1} < 1$, a contradiction. So no limit exists.
:::
:::

::: exercise Sign preservation {level=3}
Suppose $\lim_{x\to a} f(x) = L > 0$. Prove that there is a $\delta > 0$ such that $f(x) > L/2$ whenever $0 < \abs{x-a} < \delta$. (In particular $f$ is positive near $a$.)
::: solution
Apply the definition with $\eps = L/2 > 0$: there is $\delta>0$ such that $0<\abs{x-a}<\delta$ implies $\abs{f(x) - L} < L/2$, so $f(x) > L - L/2 = L/2$.
:::
:::

::: exercise Another conjugate at infinity {level=2 check="3/2"}
Find $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+3x} - x\right)$.
::: hint
Follow [[#ex-conjugate-infinity]].
:::
::: solution
For $x > 0$,

$$
\sqrt{x^2+3x} - x = \frac{3x}{\sqrt{x^2+3x}+x} = \frac{3}{\sqrt{1+3/x}+1} \to \frac{3}{2}.
$$
:::
:::

::: exercise A reciprocal from the definition {level=2}
Prove from the definition that $\lim_{x\to 1}\dfrac{1}{x+1} = \dfrac12$.
::: hint
Write $\abs{\frac{1}{x+1} - \frac12} = \frac{\abs{x-1}}{2\abs{x+1}}$ and first insist that $\abs{x-1} < 1$.
:::
::: solution
For $x \neq -1$, $\abs{\frac{1}{x+1} - \frac12} = \frac{\abs{1 - x}}{2\abs{x+1}}$. If $\abs{x-1} < 1$ then $0 < x < 2$, so $x + 1 > 1$ and the expression is less than $\frac12\abs{x-1}$. Given $\eps > 0$, let $\delta = \min(1, 2\eps)$. Then $0<\abs{x-1}<\delta$ gives $\abs{\frac{1}{x+1}-\frac12} < \frac12\cdot 2\eps = \eps$.
:::
:::

::: exercise Another trigonometric limit {level=2 check="1/2"}
Find $\displaystyle\lim_{x\to 0}\frac{1-\cos x}{x^2}$.
::: hint
Multiply by $1 + \cos x$ and use [[#thm-sinx]].
:::
::: solution
For $0 < \abs{x} < \pi$,

$$
\frac{1-\cos x}{x^2} = \frac{1-\cos^2 x}{x^2(1+\cos x)} = \left(\frac{\sin x}{x}\right)^2\frac{1}{1+\cos x} \to 1^2\cdot\frac12 = \frac12.
$$
:::
:::
