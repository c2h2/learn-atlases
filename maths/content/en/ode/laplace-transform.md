A circuit is switched on at $t = 0$ and off again at $t = \pi$; a hammer strikes a beam at a single instant; a drug is injected as a short bolus. Forcing terms like these are discontinuous or concentrated at a point, and the methods of [[ode/nonhomogeneous]] handle them only clumsily — we would have to solve on each interval separately and match the pieces. The **Laplace transform** deals with all of them in one stroke. It converts a linear differential equation with constant coefficients into an *algebraic* equation for the transform of the solution, builds the initial conditions in automatically, and treats switches and impulses as easily as exponentials.

The idea is to replace a function $f(t)$, $t \ge 0$, by the function

$$
F(s) = \int_0^\infty e^{-st}f(t)\,dt
$$

of a new variable $s$. Differentiation in $t$ becomes multiplication by $s$; a delay becomes multiplication by an exponential; and the response of a system to an input becomes a product of transforms. In this chapter we prove these properties, learn to invert the transform, and use it to solve initial value problems, including problems with step functions, impulses and convolution integrals.

## Definition and first examples

::: definition Laplace transform {#def-laplace}
Let $f$ be defined for $t \ge 0$. Its **Laplace transform** is the function

$$
\mathcal{L}\{f\}(s) = F(s) = \int_0^{\infty}e^{-st}f(t)\,dt = \lim_{R\to\infty}\int_0^Re^{-st}f(t)\,dt,
$$ {#eq-laplace}

defined for those real $s$ for which the improper integral converges.
:::

We use lower-case letters for functions of $t$ and the matching capitals for their transforms: $\mathcal{L}\{y\} = Y$, $\mathcal{L}\{g\} = G$. The transform is **linear**, $\mathcal{L}\{af + bg\} = aF + bG$, wherever both transforms exist, because integrals are linear.

::: example The basic transforms {#ex-basic}
Compute $\mathcal{L}\{1\}$, $\mathcal{L}\{e^{at}\}$ and $\mathcal{L}\{t^n\}$.
::: solution
For $s > 0$, $\displaystyle\int_0^R e^{-st}\,dt = \frac{1 - e^{-sR}}{s} \to \frac1s$, so $\mathcal{L}\{1\} = \dfrac1s$ ($s > 0$); for $s \le 0$ the integral diverges.

For $s > a$, $\displaystyle\int_0^\infty e^{-st}e^{at}\,dt = \int_0^\infty e^{-(s-a)t}\,dt = \frac{1}{s-a}$, so $\mathcal{L}\{e^{at}\} = \dfrac{1}{s-a}$ ($s > a$).

For $t^n$ with $n \ge 1$, integrate by parts: for $s > 0$,

$$
\int_0^\infty e^{-st}t^n\,dt = \Bigl[-\frac{t^ne^{-st}}{s}\Bigr]_0^\infty + \frac ns\int_0^\infty e^{-st}t^{n-1}\,dt = \frac ns\,\mathcal{L}\{t^{n-1}\},
$$

since $t^ne^{-st}\to0$ as $t\to\infty$. By induction from $\mathcal{L}\{1\} = 1/s$,

$$
\mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}} \qquad (s > 0).
$$
:::
:::

::: widget plot
f: exp(-s*x)*x^2
x: 0, 30
y: 0, 6
sliders: s=1:0.3:3:0.01
shade: 0, 30
labels: e^{-st}\,t^2
caption: The Laplace transform as an area. The shaded region under $e^{-st}t^2$ has area $F(s) = 2/s^3$ (horizontal axis $t$). Increase $s$: the exponential factor kills the integrand sooner and the area shrinks towards $0$. Decrease $s$ towards $0$: the hump moves right and grows, and at $s = 0$ the area would be infinite.
:::

Not every function has a transform: $e^{t^2}$ grows so fast that $e^{-st}e^{t^2}\to\infty$ for every $s$. The following class of functions is large enough for all applications in this course.

::: definition Piecewise continuity and exponential order {#def-exp-order}
A function $f$ on $[0,\infty)$ is **piecewise continuous** if on every bounded interval $[0,R]$ it has at most finitely many discontinuities, each a jump (the one-sided limits exist and are finite). It is of **exponential order** $a$ if there are constants $K$ and $T$ with

$$
\lvert f(t)\rvert \le K\,e^{at} \qquad\text{for all } t \ge T.
$$
:::

Polynomials, $e^{bt}$, $\sin bt$, $\cos bt$, and products and sums of these are all of exponential order, as is every bounded piecewise continuous function (with $a = 0$).

::: theorem Existence of the transform {#thm-existence}
If $f$ is piecewise continuous on $[0,\infty)$ and of exponential order $a$, then $\mathcal{L}\{f\}(s)$ exists for every $s > a$, and $F(s)\to0$ as $s\to\infty$.
:::

::: proof
Let $K, T$ be as in [[#def-exp-order]] and $M = \sup_{[0,T]}\lvert f\rvert$, which is finite because a piecewise continuous function is bounded on a bounded interval. Split the integral at $T$. The integral over $[0,T]$ is a proper Riemann integral of a piecewise continuous function. On $[T,\infty)$, $\lvert e^{-st}f(t)\rvert \le Ke^{-(s-a)t}$, and $\int_T^\infty Ke^{-(s-a)t}\,dt$ converges for $s > a$; by the comparison test for improper integrals ([[calculus-1/improper-integrals]]), $\int_T^\infty e^{-st}f(t)\,dt$ converges absolutely. Moreover, for $s > \max(a, 0)$,

$$
\lvert F(s)\rvert \le M\int_0^Te^{-st}\,dt + K\int_T^\infty e^{-(s-a)t}\,dt \le \frac{M}{s} + \frac{K}{s - a} \longrightarrow 0 \qquad (s\to\infty).
$$
:::

A useful consequence: a function such as $F(s) = 1$ or $F(s) = \frac{s}{s+1}$, which does not tend to $0$, is not the transform of any piecewise continuous function of exponential order. (It will turn out to be the transform of something more exotic — see the Dirac delta below.)

## Transforms of derivatives

The property that makes the transform useful for differential equations is that it turns differentiation into multiplication.

::: theorem Transform of a derivative {#thm-derivative}
Let $f$ be continuous on $[0,\infty)$ and of exponential order $a$, and let $f'$ be piecewise continuous on $[0,\infty)$. Then for $s > a$

$$
\mathcal{L}\{f'\}(s) = s\,F(s) - f(0).
$$ {#eq-derivative}

If also $f'$ is continuous and of exponential order $a$ and $f''$ is piecewise continuous, then

$$
\mathcal{L}\{f''\}(s) = s^2F(s) - s\,f(0) - f'(0).
$$ {#eq-second-derivative}
:::

::: proof
Fix $R > 0$ and let $0 < t_1 < \dots < t_k < R$ be the points where $f'$ is discontinuous; put $t_0 = 0$ and $t_{k+1} = R$. On each $[t_j, t_{j+1}]$, $f$ is continuously differentiable (with one-sided derivatives at the ends), so integration by parts gives

$$
\int_{t_j}^{t_{j+1}}e^{-st}f'(t)\,dt = \Bigl[e^{-st}f(t)\Bigr]_{t_j}^{t_{j+1}} + s\int_{t_j}^{t_{j+1}}e^{-st}f(t)\,dt .
$$

Adding over $j$, the boundary terms telescope because $f$ is continuous:

$$
\int_0^Re^{-st}f'(t)\,dt = e^{-sR}f(R) - f(0) + s\int_0^Re^{-st}f(t)\,dt .
$$

For $R \ge T$ we have $\lvert e^{-sR}f(R)\rvert \le Ke^{-(s-a)R}\to0$ as $R\to\infty$ when $s > a$, and the last integral tends to $sF(s)$. This proves [[#eq-derivative]]. Applying it to $f'$ in place of $f$ gives $\mathcal{L}\{f''\} = s\,\mathcal{L}\{f'\} - f'(0) = s\bigl(sF - f(0)\bigr) - f'(0)$.
:::

By induction, $\mathcal{L}\{f^{(n)}\} = s^nF(s) - s^{n-1}f(0) - \dots - f^{(n-1)}(0)$ under the analogous hypotheses. The theorem also computes transforms. If $f = \sin bt$, then $f'' = -b^2f$, $f(0) = 0$ and $f'(0) = b$, so [[#eq-second-derivative]] gives $s^2F - b = -b^2F$, that is

$$
\mathcal{L}\{\sin bt\} = \frac{b}{s^2 + b^2}, \qquad\text{and similarly}\qquad \mathcal{L}\{\cos bt\} = \frac{s}{s^2+b^2} \qquad (s > 0).
$$

::: proposition Initial value theorem {#prop-ivt}
Let $f$ be continuous on $[0,\infty)$ with $f'$ piecewise continuous, and suppose $f$ and $f'$ are of exponential order. Then $\displaystyle\lim_{s\to\infty}s\,F(s) = f(0)$.
:::

::: proof
By [[#eq-derivative]], $sF(s) - f(0) = \mathcal{L}\{f'\}(s)$, and $\mathcal{L}\{f'\}(s)\to0$ as $s\to\infty$ by [[#thm-existence]] applied to $f'$.
:::

The initial value theorem lets you read off $f(0)$ from $F$ without inverting — a useful check on a computed transform. There is also a *final* value theorem, $\lim_{t\to\infty}f(t) = \lim_{s\to0^+}sF(s)$, but it holds only when $f(t)$ actually has a limit (for example when all poles of $sF(s)$ have negative real part); applied to $f = \sin t$ it would give the false conclusion $\lim\sin t = 0$.

::: intuition Why the transform turns calculus into algebra
The exponentials $e^{st}$ are the functions that differentiation merely rescales: $\frac{d}{dt}e^{st} = s\,e^{st}$. The Laplace transform measures "how much of each $e^{-st}$" a function contains, so on the transform side, differentiation becomes multiplication by $s$ — up to a boundary term $f(0)$ coming from the fact that we only look at $t \ge 0$. This is the same idea as trying $y = e^{rt}$ in [[ode/second-order-linear]], applied to all exponentials at once.
:::

Two more rules complete the basic toolkit.

::: theorem First shifting theorem {#thm-shift-s}
If $\mathcal{L}\{f\}(s) = F(s)$ exists for $s > a$, then for any real $c$

$$
\mathcal{L}\{e^{ct}f(t)\}(s) = F(s - c) \qquad (s > a + c).
$$
:::

::: proof
$\displaystyle\mathcal{L}\{e^{ct}f\}(s) = \int_0^\infty e^{-st}e^{ct}f(t)\,dt = \int_0^\infty e^{-(s-c)t}f(t)\,dt = F(s - c)$, which converges when $s - c > a$.
:::

::: proposition Multiplication by t {#prop-mult-t}
If $f$ is piecewise continuous and of exponential order $a$, then $F$ is differentiable for $s > a$ and

$$
\mathcal{L}\{t\,f(t)\}(s) = -F'(s).
$$
:::

::: proof
Formally, differentiate [[#eq-laplace]] under the integral sign: $\frac{d}{ds}e^{-st}f(t) = -te^{-st}f(t)$. To justify this, fix $s_0 > a$ and $a < a' < s_0$. Since $t\le Ce^{(a' - a)t}$ for a suitable constant $C$, the function $t\,f(t)$ has exponential order $a'$, so for $s \ge s_0$ the integrand $-te^{-st}f(t)$ is dominated by the integrable function $CK e^{-(s_0 - a')t}$ (for $t\ge T$). The integral of the $s$-derivative therefore converges uniformly for $s\ge s_0$, which is the standard condition for differentiating an improper integral under the integral sign ([[real-analysis/uniform-convergence]]).
:::

For example, $\mathcal{L}\{t\sin bt\} = -\frac{d}{ds}\frac{b}{s^2+b^2} = \frac{2bs}{(s^2+b^2)^2}$ — the transform behind resonance.

| $f(t)$ | $F(s)$ | | $f(t)$ | $F(s)$ |
|---|---|---|---|---|
| $1$ | $\dfrac1s$ | | $e^{at}$ | $\dfrac{1}{s-a}$ |
| $t^n$ | $\dfrac{n!}{s^{n+1}}$ | | $t^ne^{at}$ | $\dfrac{n!}{(s-a)^{n+1}}$ |
| $\sin bt$ | $\dfrac{b}{s^2+b^2}$ | | $e^{at}\sin bt$ | $\dfrac{b}{(s-a)^2+b^2}$ |
| $\cos bt$ | $\dfrac{s}{s^2+b^2}$ | | $e^{at}\cos bt$ | $\dfrac{s-a}{(s-a)^2+b^2}$ |
| $u(t-c)$ | $\dfrac{e^{-cs}}{s}$ | | $\delta(t-c)$ | $e^{-cs}$ |

::: quiz
What is $\mathcal{L}\{e^{3t}\sin 2t\}$?
- [x] $\dfrac{2}{(s-3)^2 + 4}$
- [ ] $\dfrac{2}{(s+3)^2 + 4}$
- [ ] $\dfrac{2}{s - 3}\cdot\dfrac{1}{s^2 + 4}$
- [ ] $\dfrac{s - 3}{(s-3)^2 + 4}$
::: solution
$\mathcal{L}\{\sin2t\} = \frac{2}{s^2+4}$, and by the first shifting theorem multiplying by $e^{3t}$ replaces $s$ by $s - 3$. The transform of a product is **not** the product of the transforms. The last option is the transform of $e^{3t}\cos 2t$.
:::
:::

## Inverting the transform and solving initial value problems

To use the transform we must be able to go back: given $F$, find $f$ with $\mathcal{L}\{f\} = F$. We write $f = \mathcal{L}^{-1}\{F\}$. This only makes sense if $f$ is determined by $F$.

::: theorem Uniqueness of the inverse (Lerch) {#thm-lerch}
Let $f$ and $g$ be continuous on $[0,\infty)$ and of exponential order, with $\mathcal{L}\{f\}(s) = \mathcal{L}\{g\}(s)$ for all sufficiently large $s$. Then $f = g$ on $[0,\infty)$. (For piecewise continuous functions, $f = g$ except possibly at points of discontinuity.)
:::

::: proof
Let $h = f - g$, of exponential order $a$, so $\mathcal{L}\{h\}(s) = 0$ for all $s \ge s_1$, where we may take $s_1 > a + 1$. Substitute $x = e^{-t}$, which maps $[0,\infty)$ onto $(0,1]$, with $dt = -dx/x$. For $n = 0,1,2,\dots$,

$$
0 = \mathcal{L}\{h\}(s_1 + n) = \int_0^1 x^{\,s_1 + n - 1}\,h(-\ln x)\,dx = \int_0^1x^n\varphi(x)\,dx, \qquad \varphi(x) = x^{s_1 - 1}h(-\ln x).
$$

The function $\varphi$ is continuous on $(0,1]$, and $\lvert\varphi(x)\rvert \le Kx^{s_1 - 1 - a}\to0$ as $x\to0^+$, so $\varphi$ extends to a continuous function on $[0,1]$ all of whose moments $\int_0^1x^n\varphi$ vanish. Hence $\int_0^1 p\,\varphi = 0$ for every polynomial $p$. By the Weierstrass approximation theorem there are polynomials $p_k\to\varphi$ uniformly on $[0,1]$, and so $\int_0^1\varphi^2 = \lim_k\int_0^1p_k\varphi = 0$. A continuous function with $\int\varphi^2 = 0$ vanishes identically, so $\varphi\equiv0$ and $h\equiv 0$. The piecewise continuous case follows the same lines.
:::

In practice we invert by recognising entries in the table, after rearranging $F$ by **partial fractions** ([[calculus-1/integration-techniques]]) and **completing the square**. (There is also an explicit inversion formula, a contour integral in the complex $s$-plane evaluated with [[complex-analysis/residues]], but we will not need it.)

The method for solving an IVP $ay'' + by' + cy = g(t)$, $y(0) = y_0$, $y'(0) = y_1$ has three steps:

1. **Transform** the equation using [[#eq-second-derivative]]: $a\bigl(s^2Y - sy_0 - y_1\bigr) + b\bigl(sY - y_0\bigr) + cY = G(s)$.
2. **Solve** this algebraic equation for $Y(s)$: $Y(s) = \dfrac{G(s) + (as + b)y_0 + ay_1}{as^2 + bs + c}$.
3. **Invert** to find $y(t) = \mathcal{L}^{-1}\{Y\}$.

The characteristic polynomial reappears as the denominator, and the initial conditions are included automatically: there are no arbitrary constants to determine at the end. (Strictly, step 1 assumes that $y$ and $y'$ have exponential order; this is true for solutions of such equations when $g$ has exponential order, so the method is self-consistent, and in any case the answer can be checked by substitution.)

::: example Partial fractions {#ex-ivp1}
Solve $y'' - y' - 2y = 0$, $y(0) = 1$, $y'(0) = 0$.
::: solution
Transforming, $\bigl(s^2Y - s\bigr) - \bigl(sY - 1\bigr) - 2Y = 0$, so $(s^2 - s - 2)Y = s - 1$ and

$$
Y(s) = \frac{s - 1}{(s - 2)(s + 1)} = \frac{A}{s - 2} + \frac{B}{s+1}.
$$

Multiplying out, $s - 1 = A(s+1) + B(s - 2)$; $s = 2$ gives $A = \tfrac13$ and $s = -1$ gives $B = \tfrac23$. From the table,

$$
y(t) = \tfrac13e^{2t} + \tfrac23e^{-t}.
$$

Check: $y(0) = 1$, $y'(0) = \tfrac23 - \tfrac23 = 0$.
:::
:::

::: example Complex roots and the first shifting theorem {#ex-ivp2}
Solve $y'' + 2y' + 5y = 5$, $y(0) = y'(0) = 0$.
::: solution
Transforming, $(s^2 + 2s + 5)Y = \dfrac5s$, so $Y = \dfrac{5}{s(s^2 + 2s + 5)}$. Partial fractions with an irreducible quadratic: $\dfrac{5}{s(s^2+2s+5)} = \dfrac As + \dfrac{Bs + C}{s^2 + 2s + 5}$ gives $5 = A(s^2 + 2s + 5) + (Bs + C)s$, so $A = 1$, $B = -1$, $C = -2$. Completing the square, $s^2 + 2s + 5 = (s+1)^2 + 4$, and

$$
Y = \frac1s - \frac{s + 2}{(s+1)^2 + 4} = \frac1s - \frac{s+1}{(s+1)^2 + 4} - \frac12\cdot\frac{2}{(s+1)^2+4}.
$$

By the table and the first shifting theorem,

$$
y(t) = 1 - e^{-t}\cos 2t - \tfrac12e^{-t}\sin 2t .
$$

The solution rises from rest towards the steady value $1$, overshooting slightly with decaying oscillations — the step response of an underdamped system.
:::
:::

::: example Resonance through the transform {#ex-resonance}
Solve $y'' + y = \cos t$, $y(0) = y'(0) = 0$.
::: solution
Transforming, $(s^2 + 1)Y = \dfrac{s}{s^2+1}$, so $Y = \dfrac{s}{(s^2+1)^2}$, which is not in the basic table. But

$$
\frac{s}{(s^2+1)^2} = -\frac12\,\frac{d}{ds}\left(\frac{1}{s^2+1}\right),
$$

and by [[#prop-mult-t]], $-\frac{d}{ds}\mathcal{L}\{\sin t\} = \mathcal{L}\{t\sin t\}$. Hence $y(t) = \tfrac12t\sin t$: the resonant solution of [[ode/nonhomogeneous]], found without guessing a trial form. The repeated factor $(s^2 + 1)^2$ in the denominator — a double pole at $s = \pm i$ — is the transform-side signature of resonance.
:::
:::

::: warning Initial conditions must be at t = 0
The transform builds in $y(0)$ and $y'(0)$. If the data are given at another time, say $y(2) = 1$, $y'(2) = 0$, first shift the time variable: $\tau = t - 2$ and $w(\tau) = y(\tau + 2)$ turn the problem into one for $w$ with data at $\tau = 0$ (the forcing is shifted accordingly). With constant coefficients the equation itself is unchanged by the shift.
:::

### Systems of equations

The transform handles several coupled equations just as easily: each equation becomes an algebraic equation, and we solve the resulting *linear system* for the transforms.

::: example Two coupled tanks {#ex-system}
Solve $x' = -2x + y$, $y' = x - 2y$ with $x(0) = 1$, $y(0) = 0$. (These describe two connected compartments that exchange material and also lose it to the outside.)
::: solution
Transforming both equations, $sX - 1 = -2X + Y$ and $sY = X - 2Y$, that is

$$
(s + 2)X - Y = 1, \qquad -X + (s+2)Y = 0 .
$$

By Cramer's rule, with determinant $(s+2)^2 - 1 = (s+1)(s+3)$,

$$
X = \frac{s + 2}{(s+1)(s+3)} = \frac{1/2}{s+1} + \frac{1/2}{s+3}, \qquad Y = \frac{1}{(s+1)(s+3)} = \frac{1/2}{s+1} - \frac{1/2}{s+3}.
$$

Hence $x(t) = \tfrac12\bigl(e^{-t} + e^{-3t}\bigr)$ and $y(t) = \tfrac12\bigl(e^{-t} - e^{-3t}\bigr)$. The numbers $-1$ and $-3$ in the exponents are the eigenvalues of the coefficient matrix $\begin{pmatrix}-2 & 1\\ 1 & -2\end{pmatrix}$ — the starting point of [[ode/linear-systems]].
:::
:::

## Step functions and the second shifting theorem

::: definition Heaviside step function {#def-heaviside}
The **unit step** (Heaviside) function is $u(t) = 0$ for $t < 0$ and $u(t) = 1$ for $t \ge 0$. Its translate $u(t - c)$, with $c \ge 0$, switches on at time $c$.
:::

Switches are built from steps: $u(t - a) - u(t - b)$ is $1$ on $[a, b)$ and $0$ elsewhere (a rectangular pulse), and $f(t)\bigl(1 - u(t - c)\bigr) + g(t)u(t - c)$ switches from $f$ to $g$ at time $c$. A direct calculation gives $\mathcal{L}\{u(t-c)\} = \int_c^\infty e^{-st}\,dt = e^{-cs}/s$. More generally, delaying a signal multiplies its transform by an exponential.

::: theorem Second shifting theorem {#thm-shift-t}
If $\mathcal{L}\{f\}(s) = F(s)$ exists for $s > a$ and $c \ge 0$, then

$$
\mathcal{L}\bigl\{u(t - c)\,f(t - c)\bigr\}(s) = e^{-cs}F(s) \qquad (s > a).
$$

Equivalently, $\mathcal{L}^{-1}\{e^{-cs}F(s)\} = u(t-c)\,f(t-c)$.
:::

::: proof
The integrand vanishes for $t < c$, so with the substitution $\tau = t - c$,

$$
\int_0^\infty e^{-st}u(t-c)f(t-c)\,dt = \int_c^\infty e^{-st}f(t - c)\,dt = \int_0^\infty e^{-s(\tau + c)}f(\tau)\,d\tau = e^{-cs}F(s).
$$
:::

::: warning Shift the whole function
$u(t - c)f(t - c)$ is the graph of $f$ moved $c$ units to the right — not $u(t - c)f(t)$. To transform $u(t - c)f(t)$, first write $f(t) = f\bigl((t - c) + c\bigr)$ as a function of $t - c$. For example $u(t - 1)\,t^2 = u(t-1)\bigl((t-1)^2 + 2(t-1) + 1\bigr)$, whose transform is $e^{-s}\bigl(\frac{2}{s^3} + \frac{2}{s^2} + \frac1s\bigr)$, not $e^{-s}\cdot\frac{2}{s^3}$.
:::

::: example A rectangular pulse {#ex-pulse}
An undamped oscillator at rest is pushed by a unit force from $t = 0$ to $t = \pi$: $y'' + y = 1 - u(t - \pi)$, $y(0) = y'(0) = 0$. Find the motion.
::: solution
Transforming, $(s^2 + 1)Y = \dfrac{1 - e^{-\pi s}}{s}$, so

$$
Y = \bigl(1 - e^{-\pi s}\bigr)\,\frac{1}{s(s^2+1)} = \bigl(1 - e^{-\pi s}\bigr)\left(\frac1s - \frac{s}{s^2+1}\right).
$$

Now $\mathcal{L}^{-1}\left\{\frac1s - \frac{s}{s^2+1}\right\} = 1 - \cos t$, so by the second shifting theorem

$$
y(t) = (1 - \cos t) - u(t - \pi)\bigl(1 - \cos(t - \pi)\bigr) = \begin{cases} 1 - \cos t, & 0 \le t < \pi, \\ -2\cos t, & t \ge \pi, \end{cases}
$$

using $\cos(t - \pi) = -\cos t$. During the push the mass oscillates about the new equilibrium $y = 1$; at $t = \pi$ it is at $y = 2$ with zero velocity, and after the force switches off it oscillates about $0$ with amplitude $2$. The solution and its derivative are continuous at $t = \pi$, while $y''$ jumps, as the equation demands.
:::
:::

::: widget plot
f: (1 - cos(x)) - heaviside(x - a)*(1 - cos(x - a)); if(x < a, 1, 0)
x: 0, 20
y: -2.5, 2.5
sliders: a=3.14:0.5:12.6:0.02
labels: y(t); \text{force}
caption: The response of $y'' + y = 1 - u(t-a)$ from rest (horizontal axis $t$). After the push ends, $y = \cos(t - a) - \cos t$, an oscillation of amplitude $2\lvert\sin(a/2)\rvert$. Slide $a$: a push lasting exactly one period ($a = 2\pi \approx 6.28$) leaves the oscillator perfectly still, while a push lasting half a period ($a = \pi$) leaves the largest motion.
:::

## Impulses and the Dirac delta

A hammer blow delivers a large force over a very short time. What matters is not the details of the force but its total **impulse** $\int F\,dt$. To model a unit impulse at time $c$, consider the pulses

$$
d_w(t - c) = \frac{1}{w}\bigl(u(t - c) - u(t - c - w)\bigr),
$$

of height $1/w$ on $[c, c + w)$ and total integral $1$. Their transforms are

$$
\mathcal{L}\{d_w(t-c)\} = \frac{e^{-cs}}{w}\cdot\frac{1 - e^{-ws}}{s} \longrightarrow e^{-cs} \qquad (w\to0^+),
$$

because $\frac{1 - e^{-ws}}{ws}\to1$. No function has these limiting properties — it would have to vanish for $t\neq c$ and still have integral $1$ — but it is extremely convenient to pretend that one does.

::: definition Dirac delta {#def-delta}
The **Dirac delta** $\delta(t - c)$ ($c \ge 0$) is the idealised unit impulse at time $c$, characterised by the **sifting property** $\int_0^\infty f(t)\,\delta(t - c)\,dt = f(c)$ for continuous $f$ (with $c > 0$). In particular,

$$
\mathcal{L}\{\delta(t - c)\} = e^{-cs}.
$$
:::

::: remark Making the delta honest
The delta is not a function but a **distribution**: a rule that assigns to each smooth test function $f$ the number $f(c)$. Laurent Schwartz's theory of distributions (1940s) makes every manipulation in this section rigorous. For our purposes there is a down-to-earth interpretation: the solution of $L[y] = \delta(t - c)$ is the limit, as $w\to0^+$, of the solutions of $L[y] = d_w(t-c)$, and the figure below lets you watch this limit happen. Note also that $\mathcal{L}\{\delta\} = 1$ does not tend to $0$, consistent with [[#thm-existence]]: the delta is outside the class of functions considered there.
:::

::: example A hammer blow {#ex-impulse}
A damped oscillator at rest receives a unit impulse at $t = \pi$: $y'' + 2y' + 2y = \delta(t - \pi)$, $y(0) = y'(0) = 0$. Find the motion.
::: solution
Transforming, $(s^2 + 2s + 2)Y = e^{-\pi s}$, so

$$
Y = e^{-\pi s}\,\frac{1}{(s+1)^2 + 1}.
$$

Since $\mathcal{L}^{-1}\left\{\frac{1}{(s+1)^2+1}\right\} = e^{-t}\sin t$ by the first shifting theorem, the second shifting theorem gives

$$
y(t) = u(t - \pi)\,e^{-(t-\pi)}\sin(t - \pi).
$$

Nothing happens until $t = \pi$. Then $y$ is continuous ($y(\pi) = 0$) but $y'$ jumps from $0$ to $1$: a unit impulse on a unit mass changes its velocity by one unit instantly. Afterwards the mass performs a damped oscillation.
:::
:::

::: widget plot
f: ((1 - cos(x)) - heaviside(x - w)*(1 - cos(x - w)))/w; sin(x)
x: 0, 12
y: -1.5, 1.5
sliders: w=2:0.05:3:0.01
labels: y_w(t); \sin t
caption: Responses of $y'' + y = d_w(t)$ from rest, where $d_w$ is a pulse of height $1/w$ and width $w$ (horizontal axis $t$). Shrink the width $w$: the responses converge to $\sin t$, the solution of $y'' + y = \delta(t)$, i.e. the **impulse response**. Only the total impulse matters in the limit, not the shape of the pulse.
:::

::: quiz
What is $\mathcal{L}^{-1}\left\{\dfrac{e^{-2s}}{s^2}\right\}$?
- [ ] $t^2u(t - 2)$
- [ ] $u(t - 2)\,t$
- [x] $u(t - 2)\,(t - 2)$
- [ ] $e^{-2t}\,t$
::: solution
$\mathcal{L}^{-1}\{1/s^2\} = t$, and by the second shifting theorem the factor $e^{-2s}$ delays it by $2$: $u(t-2)(t-2)$, a ramp starting at $t = 2$. The option $e^{-2t}t$ confuses the two shifting theorems: it is the inverse of $1/(s+2)^2$.
:::
:::

## Convolution

The transform of a product is not the product of transforms. But there is an operation on functions whose transform *is* the product.

::: definition Convolution {#def-convolution}
The **convolution** of two piecewise continuous functions $f, g$ on $[0,\infty)$ is

$$
(f * g)(t) = \int_0^tf(\tau)\,g(t - \tau)\,d\tau \qquad (t \ge 0).
$$
:::

Substituting $\tau\mapsto t - \tau$ shows $f * g = g * f$; convolution is also associative and distributes over addition. It is not the ordinary product: $1 * 1 = \int_0^t 1\,d\tau = t$.

::: theorem Convolution theorem {#thm-convolution}
If $f$ and $g$ are piecewise continuous and of exponential order $a$, then $f * g$ is of exponential order $a + \eps$ for every $\eps > 0$, and

$$
\mathcal{L}\{f * g\}(s) = F(s)\,G(s) \qquad (s > a).
$$
:::

::: proof
First the growth estimate: if $\lvert f(t)\rvert, \lvert g(t)\rvert \le Ke^{at}$ for all $t\ge0$ (enlarging $K$ to cover $[0,T]$), then $\lvert(f*g)(t)\rvert \le \int_0^tK^2e^{a\tau}e^{a(t-\tau)}\,d\tau = K^2te^{at}$, which is $O(e^{(a+\eps)t})$. Now for $s > a$,

$$
F(s)G(s) = \int_0^\infty e^{-s\tau}f(\tau)\,d\tau\int_0^\infty e^{-s\sigma}g(\sigma)\,d\sigma = \int_0^\infty\!\!\int_0^\infty e^{-s(\tau+\sigma)}f(\tau)g(\sigma)\,d\sigma\,d\tau .
$$

In the inner integral substitute $t = \tau + \sigma$ (for fixed $\tau$):

$$
F(s)G(s) = \int_0^\infty\int_\tau^\infty e^{-st}f(\tau)\,g(t - \tau)\,dt\,d\tau .
$$

The region of integration is $\set{(\tau, t) : 0 \le \tau \le t}$. The double integral converges absolutely — the same computation with $\lvert f\rvert, \lvert g\rvert$ in place of $f, g$ gives the finite product $\int_0^\infty e^{-s\tau}\lvert f\rvert\,d\tau\int_0^\infty e^{-s\sigma}\lvert g\rvert\,d\sigma$ — so by Fubini's theorem ([[multivariable/multiple-integrals]]) we may integrate in the other order, $\tau$ from $0$ to $t$ first:

$$
F(s)G(s) = \int_0^\infty e^{-st}\left(\int_0^tf(\tau)\,g(t-\tau)\,d\tau\right)dt = \mathcal{L}\{f*g\}(s).
$$
:::

Two consequences explain why convolution is central to the theory of linear systems.

- **Inverse transforms of products.** $\mathcal{L}^{-1}\{F\,G\} = f * g$, a new way of inverting.
- **Transfer functions.** For $ay'' + by' + cy = g(t)$ with $y(0) = y'(0) = 0$, the transformed equation is $Y = H(s)G(s)$ with $H(s) = \dfrac{1}{as^2 + bs + c}$, the **transfer function**. Its inverse $h = \mathcal{L}^{-1}\{H\}$ is the response to $g = \delta$, the **impulse response**, and

$$
y(t) = (h * g)(t) = \int_0^th(t - \tau)\,g(\tau)\,d\tau .
$$ {#eq-duhamel}

This is exactly the Green's-function formula of [[ode/nonhomogeneous#cor-green]], now derived in two lines: the response to an arbitrary input is the superposition of delayed impulse responses.

::: example Inverting with a convolution {#ex-convolution}
Find $\mathcal{L}^{-1}\left\{\dfrac{1}{s^2(s^2+1)}\right\}$.
::: solution
Write the transform as $\frac{1}{s^2}\cdot\frac{1}{s^2+1} = \mathcal{L}\{t\}\,\mathcal{L}\{\sin t\}$. By [[#thm-convolution]],

$$
\mathcal{L}^{-1}\left\{\frac{1}{s^2(s^2+1)}\right\} = \int_0^t\tau\sin(t - \tau)\,d\tau = \Bigl[\tau\cos(t - \tau)\Bigr]_0^t - \int_0^t\cos(t-\tau)\,d\tau = t - \sin t,
$$

integrating by parts. Partial fractions, $\frac{1}{s^2(s^2+1)} = \frac{1}{s^2} - \frac{1}{s^2+1}$, confirm the answer.
:::
:::

::: example An integral equation {#ex-volterra}
Solve the **Volterra integral equation** $y(t) = t + \displaystyle\int_0^t\sin(t - \tau)\,y(\tau)\,d\tau$.
::: solution
The integral is $(\sin * y)(t)$, so transforming gives $Y = \dfrac{1}{s^2} + \dfrac{1}{s^2+1}Y$. Solving,

$$
Y\cdot\frac{s^2}{s^2+1} = \frac{1}{s^2} \quad\Longrightarrow\quad Y = \frac{s^2 + 1}{s^4} = \frac{1}{s^2} + \frac{1}{s^4},
$$

and $y(t) = t + \dfrac{t^3}{6}$. Substituting back confirms that $t + \int_0^t\sin(t-\tau)\bigl(\tau + \frac{\tau^3}{6}\bigr)\,d\tau = t + \frac{t^3}{6}$. Integral equations of this kind model systems with memory, such as viscoelastic materials and population models with delays.
:::
:::

::: quiz
What is $(1 * 1)(t)$, the convolution of the constant function $1$ with itself?
- [ ] $1$
- [x] $t$
- [ ] $t^2/2$
- [ ] $0$
::: solution
$(1 * 1)(t) = \int_0^t 1\cdot1\,d\tau = t$. In transform language, $\frac1s\cdot\frac1s = \frac{1}{s^2} = \mathcal{L}\{t\}$. Convolution is not pointwise multiplication.
:::
:::

::: application Control engineering
The transfer function $H(s)$ is the language of control engineering. A system's response to any input is $H(s)G(s)$; connecting systems in series multiplies their transfer functions; and the location of the poles of $H$ (the roots of the characteristic polynomial) decides stability: the system is stable when all poles have negative real part. Feedback controllers, from thermostats to aircraft autopilots, are designed by shaping $H(s)$, and the convolution theorem translates the design back into the time domain.
:::

::: history
Integrals of the form $\int e^{-st}f(t)\,dt$ appear in the work of Euler, and Pierre-Simon Laplace used them extensively in his probability theory, notably in the *Théorie analytique des probabilités* of 1812. The method of this chapter descends instead from Oliver Heaviside, who in the 1880s and 1890s solved the differential equations of electrical circuits by treating $d/dt$ as an algebraic symbol $p$. His "operational calculus" gave correct answers by methods that mathematicians of the day found unjustified. Thomas Bromwich showed in 1916 how to justify it using contour integrals, and from the 1930s Gustav Doetsch and others recast it in terms of the Laplace transform, the form in which it entered engineering teaching.
:::

## Where this leads

The Laplace transform extends directly to systems of equations, where $\mathcal{L}\{\mathbf{x}'\} = s\mathbf{X} - \mathbf{x}(0)$ turns $\mathbf{x}' = A\mathbf{x}$ into $(sI - A)\mathbf{X} = \mathbf{x}(0)$; the resolvent $(sI - A)^{-1}$ is the transform of the matrix exponential of [[ode/linear-systems]]. Inverting transforms by contour integration is a showcase for [[complex-analysis/residues]]. Its close cousin, the Fourier transform of [[pde/fourier-transform]], uses $e^{-i\xi x}$ on the whole line instead of $e^{-st}$ on a half-line and does for partial differential equations what the Laplace transform does here. Numerical solution of the same problems is the subject of [[numerical-analysis/numerical-odes]].

::: summary
- $F(s) = \int_0^\infty e^{-st}f(t)\,dt$ exists for $s > a$ when $f$ is piecewise continuous of exponential order $a$, and then $F(s)\to0$ ([[#thm-existence]]).
- Derivatives become algebra: $\mathcal{L}\{y'\} = sY - y(0)$, $\mathcal{L}\{y''\} = s^2Y - sy(0) - y'(0)$ ([[#thm-derivative]]); a linear IVP with constant coefficients becomes $Y = (\text{data})/P(s)$.
- Shifting theorems: $e^{ct}f(t) \leftrightarrow F(s - c)$ and $u(t-c)f(t-c)\leftrightarrow e^{-cs}F(s)$; also $tf(t)\leftrightarrow -F'(s)$.
- The transform is invertible (Lerch); invert with tables, partial fractions and completing the square.
- Steps model switches; the Dirac delta models impulses, with $\mathcal{L}\{\delta(t-c)\} = e^{-cs}$; an impulse makes the velocity jump.
- Convolution: $\mathcal{L}\{f*g\} = FG$. With zero initial data the response is $h*g$, where $h$, the inverse of the transfer function $1/P(s)$, is the impulse response.
:::

## Exercises

::: exercise A transform by linearity {level=1 check="1/12"}
Let $F = \mathcal{L}\{3t^2 - 2e^{-t}\}$. Find $F(s)$ and evaluate $F(2)$.
::: solution
By linearity and the table, $F(s) = 3\cdot\frac{2}{s^3} - \frac{2}{s+1} = \frac{6}{s^3} - \frac{2}{s+1}$ for $s > 0$. Then $F(2) = \frac68 - \frac23 = \frac{1}{12}$.
:::
:::

::: exercise Completing the square {level=1 check="-2*exp(-2*pi/3)"}
Find $f = \mathcal{L}^{-1}\left\{\dfrac{2s + 3}{s^2 + 4s + 13}\right\}$ and evaluate $f(\pi/3)$.
::: solution
$s^2 + 4s + 13 = (s + 2)^2 + 9$ and $2s + 3 = 2(s + 2) - 1$, so

$$
\frac{2s+3}{(s+2)^2 + 9} = 2\,\frac{s + 2}{(s+2)^2 + 9} - \frac13\cdot\frac{3}{(s+2)^2 + 9},
$$

and $f(t) = e^{-2t}\bigl(2\cos 3t - \tfrac13\sin 3t\bigr)$. At $t = \pi/3$: $\cos\pi = -1$, $\sin\pi = 0$, so $f(\pi/3) = -2e^{-2\pi/3}$.
:::
:::

::: exercise A first-order IVP {level=1 check="14"}
Solve $y' - 2y = e^{t}$, $y(0) = 3$ with the Laplace transform, and evaluate $y(\ln 2)$.
::: solution
$sY - 3 - 2Y = \frac{1}{s-1}$, so $Y = \frac{3}{s-2} + \frac{1}{(s-1)(s-2)} = \frac{3}{s-2} + \frac{1}{s-2} - \frac{1}{s-1}$. Hence $y = 4e^{2t} - e^{t}$, and $y(\ln 2) = 16 - 2 = 14$.
:::
:::

::: exercise A switch {level=2 check="1 - exp(-1)"}
Solve $y' + y = u(t - 1)$, $y(0) = 0$, and evaluate $y(2)$.
::: solution
$(s + 1)Y = \frac{e^{-s}}{s}$, so $Y = e^{-s}\frac{1}{s(s+1)} = e^{-s}\left(\frac1s - \frac{1}{s+1}\right)$. With the second shifting theorem, $y(t) = u(t - 1)\bigl(1 - e^{-(t-1)}\bigr)$: nothing happens until $t = 1$, then $y$ relaxes towards $1$. Thus $y(2) = 1 - e^{-1}$.
:::
:::

::: exercise An impulse with initial data {level=2 check="1/2"}
Solve $y'' + 4y = \delta(t - \pi)$, $y(0) = 1$, $y'(0) = 0$, and evaluate $y(5\pi/4)$.
::: solution
$s^2Y - s + 4Y = e^{-\pi s}$, so $Y = \frac{s}{s^2+4} + e^{-\pi s}\frac{1}{s^2+4}$ and

$$
y(t) = \cos 2t + \tfrac12u(t-\pi)\sin\bigl(2(t - \pi)\bigr) = \cos 2t + \tfrac12u(t - \pi)\sin 2t .
$$

At $t = 5\pi/4$: $\cos\frac{5\pi}{2} = 0$ and $\frac12\sin\frac{5\pi}{2} = \frac12$, so $y(5\pi/4) = \frac12$.
:::
:::

::: exercise Convolution versus partial fractions {level=2 check="2"}
Find $f = \mathcal{L}^{-1}\left\{\dfrac{1}{s(s^2+1)}\right\}$ using the convolution theorem, check it with partial fractions, and evaluate $f(\pi)$.
::: solution
As a product, $\frac1s\cdot\frac{1}{s^2+1} = \mathcal{L}\{1\}\mathcal{L}\{\sin t\}$, so $f = 1 * \sin = \int_0^t\sin(t - \tau)\,d\tau = \int_0^t\sin u\,du = 1 - \cos t$. Partial fractions: $\frac{1}{s(s^2+1)} = \frac1s - \frac{s}{s^2+1}$, giving the same $1 - \cos t$. So $f(\pi) = 2$.
:::
:::

::: exercise An integral equation {level=2 check="-1"}
Solve $y(t) = 1 - \displaystyle\int_0^t(t - \tau)\,y(\tau)\,d\tau$ and evaluate $y(\pi)$.
::: solution
The integral is $(t * y)$, with transform $\frac{1}{s^2}Y$. So $Y = \frac1s - \frac{Y}{s^2}$, i.e. $Y\frac{s^2 + 1}{s^2} = \frac1s$ and $Y = \frac{s}{s^2+1}$. Hence $y = \cos t$ and $y(\pi) = -1$. (Differentiating the integral equation twice shows that it is equivalent to $y'' = -y$, $y(0) = 1$, $y'(0) = 0$.)
:::
:::

::: exercise Integrals and the transform {level=2}
(a) Show that if $f$ is piecewise continuous of exponential order $a > 0$, then $\mathcal{L}\left\{\int_0^tf(\tau)\,d\tau\right\} = \dfrac{F(s)}{s}$ for $s > a$. (b) Use this to find $\mathcal{L}^{-1}\left\{\dfrac{1}{s(s^2+4)}\right\}$.
::: solution
(a) $g(t) = \int_0^tf$ is continuous with $g(0) = 0$ and $g' = f$ except at jumps of $f$; it is of exponential order $a$ since $\lvert g(t)\rvert\le C + \int_T^tKe^{a\tau}d\tau \le C + \frac Ka e^{at}$. By [[#thm-derivative]], $F = \mathcal{L}\{g'\} = sG - g(0) = sG$, so $G = F/s$. (Equivalently, $g = 1 * f$ and [[#thm-convolution]] gives $G = \frac1s F$.)

(b) $\frac{1}{s^2+4} = \mathcal{L}\{\frac12\sin 2t\}$, so $\mathcal{L}^{-1}\left\{\frac{1}{s(s^2+4)}\right\} = \int_0^t\frac12\sin2\tau\,d\tau = \frac{1 - \cos 2t}{4}$.
:::
:::

::: exercise Periodic functions {level=3}
Let $f$ be piecewise continuous and periodic with period $p > 0$. Prove that

$$
\mathcal{L}\{f\}(s) = \frac{1}{1 - e^{-ps}}\int_0^pe^{-st}f(t)\,dt \qquad (s > 0).
$$

Deduce that the square wave equal to $1$ on $[0,1)$ and $-1$ on $[1,2)$, extended with period $2$, has transform $\dfrac1s\tanh\dfrac s2$.
::: hint
Split $[0,\infty)$ into the intervals $[np, (n+1)p)$ and use periodicity to sum a geometric series.
:::
::: solution
$f$ is bounded, so of exponential order $0$, and $F(s)$ exists for $s > 0$. Splitting the integral and substituting $t = \tau + np$ in the $n$th piece,

$$
F(s) = \sum_{n=0}^\infty\int_{np}^{(n+1)p}e^{-st}f(t)\,dt = \sum_{n=0}^\infty e^{-nps}\int_0^pe^{-s\tau}f(\tau)\,d\tau = \frac{1}{1 - e^{-ps}}\int_0^pe^{-s\tau}f(\tau)\,d\tau,
$$

summing the geometric series ($0 < e^{-ps} < 1$). For the square wave, $p = 2$ and

$$
\int_0^2e^{-st}f(t)\,dt = \frac{1 - e^{-s}}{s} - \frac{e^{-s} - e^{-2s}}{s} = \frac{(1 - e^{-s})^2}{s}.
$$

Dividing by $1 - e^{-2s} = (1 - e^{-s})(1 + e^{-s})$ gives $F(s) = \dfrac{1 - e^{-s}}{s(1 + e^{-s})} = \dfrac{1}{s}\tanh\dfrac s2$.
:::
:::

::: exercise Dividing by t {level=3 check="pi/2"}
(a) Let $f$ be piecewise continuous of exponential order, and suppose $g(t) = f(t)/t$ has a finite limit as $t\to0^+$ (so $g$ is also piecewise continuous of exponential order). Prove that $\mathcal{L}\{g\}(s) = \displaystyle\int_s^\infty F(\sigma)\,d\sigma$.
(b) Find $\mathcal{L}\left\{\dfrac{\sin t}{t}\right\}$. Assuming that $\lim_{s\to0^+}\mathcal{L}\{g\}(s) = \int_0^\infty g(t)\,dt$ whenever the improper integral converges (an "Abelian theorem"), evaluate $\displaystyle\int_0^\infty\frac{\sin t}{t}\,dt$.
::: solution
(a) Since $f = t\,g$, [[#prop-mult-t]] gives $F(s) = -G'(s)$, where $G = \mathcal{L}\{g\}$. Integrating from $s$ to $R$: $G(s) - G(R) = \int_s^RF(\sigma)\,d\sigma$. By [[#thm-existence]], $G(R)\to0$ as $R\to\infty$, so the integral $\int_s^\infty F$ converges and equals $G(s)$.

(b) With $F(\sigma) = \frac{1}{\sigma^2+1}$,

$$
\mathcal{L}\left\{\frac{\sin t}{t}\right\}(s) = \int_s^\infty\frac{d\sigma}{\sigma^2+1} = \frac\pi2 - \arctan s = \arctan\frac1s .
$$

Letting $s\to0^+$ gives $\displaystyle\int_0^\infty\frac{\sin t}{t}\,dt = \frac\pi2$, the Dirichlet integral. (The improper integral converges, although not absolutely: the contributions of successive intervals $[n\pi, (n+1)\pi]$ alternate in sign and decrease to $0$ in size.)
:::
:::
