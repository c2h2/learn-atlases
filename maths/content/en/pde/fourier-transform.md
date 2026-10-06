Fourier series decompose a *periodic* function into the harmonics $e^{inx}$, whose frequencies $n$ form a discrete set. Many functions of interest are not periodic: a single pulse of sound, a flash of light, the initial temperature of an infinitely long rod that is hot in one place and cold elsewhere. For these we need *every* frequency $\xi\in\R$, and the sum over $n$ becomes an integral over $\xi$:

$$
f(x) = \frac{1}{2\pi}\int_{-\infty}^{\infty}\hat f(\xi)\,e^{i\xi x}\,d\xi, \qquad \hat f(\xi) = \int_{-\infty}^{\infty}f(x)\,e^{-i\xi x}\,dx.
$$

The function $\hat f$ is the **Fourier transform** of $f$: it records how much of each frequency $\xi$ is present in $f$. It turns differentiation into multiplication by $i\xi$ and convolution into multiplication, and these two facts make it the natural tool for linear differential equations with constant coefficients on the whole line.

In this chapter we motivate the transform as a limit of Fourier series, prove its main properties and the convolution theorem, compute the transforms that every user should know by heart — exponentials, rectangular pulses and Gaussians — discuss the inversion theorem and Plancherel's identity, and then solve the heat equation on an infinite rod. Its solution is a convolution with the **heat kernel**, a spreading Gaussian, and it reveals something the bounded-interval series could only hint at: heat travels at infinite speed. We finish with the uncertainty principle, which says that a function and its transform cannot both be sharply concentrated.

## From Fourier series to the Fourier transform

Let $f$ be defined on $\R$ and consider its restriction to $[-L, L]$. The complex Fourier series with period $2L$ (see [[pde/fourier-series#eq-complex-coeffs]] and [[pde/fourier-series#eq-period-2L]]) is

$$
f(x) = \sum_{n=-\infty}^{\infty}c_ne^{in\pi x/L}, \qquad c_n = \frac{1}{2L}\int_{-L}^{L}f(y)e^{-in\pi y/L}\,dy.
$$

Write $\xi_n = n\pi/L$, so that consecutive frequencies are spaced $\Delta\xi = \pi/L$ apart, and put $F_L(\xi) = \int_{-L}^{L}f(y)e^{-i\xi y}\,dy$. Then $c_n = \frac{1}{2L}F_L(\xi_n) = \frac{\Delta\xi}{2\pi}F_L(\xi_n)$ and

$$
f(x) = \frac{1}{2\pi}\sum_{n=-\infty}^{\infty}F_L(\xi_n)\,e^{i\xi_nx}\,\Delta\xi.
$$

As $L\to\infty$ the frequencies fill the whole line, $F_L$ tends to $\hat f$, and the sum looks like a Riemann sum for $\frac1{2\pi}\int\hat f(\xi)e^{i\xi x}\,d\xi$. This is a heuristic, not a proof — two limits are being interchanged — but it explains the formulas, including the factor $\frac1{2\pi}$, and we will see that the conclusion is correct.

::: definition Fourier transform {#def-fourier-transform}
A function $f\colon\R\to\C$ is **integrable** if it is piecewise continuous on every bounded interval and $\int_{-\infty}^{\infty}\abs{f(x)}\,dx < \infty$. Its **Fourier transform** is

$$
\hat f(\xi) = \int_{-\infty}^{\infty}f(x)\,e^{-i\xi x}\,dx \qquad (\xi\in\R).
$$ {#eq-ft}

The integral converges absolutely because $\abs{f(x)e^{-i\xi x}} = \abs{f(x)}$. We also write $\mathcal F f = \hat f$.
:::

::: warning Conventions differ
Books disagree about where the $2\pi$ goes. Besides our $\hat f(\xi) = \int f(x)e^{-i\xi x}\,dx$ (with $\frac{1}{2\pi}$ in the inverse), you will meet the symmetric version with $\frac{1}{\sqrt{2\pi}}$ in both directions, and the version $\int f(x)e^{-2\pi i\xi x}\,dx$ with no constant in either direction. All the theorems are the same, but the constants in formulas such as Plancherel's identity and the uncertainty principle change. When you use a table of transforms, first check its convention.
:::

Because $\abs{\hat f(\xi)} \le \int\abs f$, the transform is bounded. It is also continuous, and it decays at infinity.

::: proposition Continuity and the Riemann–Lebesgue lemma {#prop-rl}
If $f$ is integrable, then $\hat f$ is bounded by $\int\abs{f}$, uniformly continuous on $\R$, and $\hat f(\xi)\to0$ as $\abs\xi\to\infty$.
:::

::: proof
*Continuity.* Let $\eps > 0$ and choose $R$ with $\int_{\abs x > R}\abs f < \eps$. Since $\abs{e^{-i\eta x} - 1} \le \abs{\eta x}$ and $\abs{e^{-i\eta x} - 1}\le 2$,

$$
\abs{\hat f(\xi + \eta) - \hat f(\xi)} \le \int\abs{f(x)}\,\abs{e^{-i\eta x} - 1}\,dx \le \abs\eta R\int_{\abs x\le R}\abs f + 2\eps,
$$

which is less than $3\eps$ once $\abs\eta$ is small enough, independently of $\xi$.

*Decay.* For the indicator function of an interval $[c, d]$, $\hat f(\xi) = \frac{e^{-ic\xi} - e^{-id\xi}}{i\xi}$, which is at most $\frac{2}{\abs\xi}$ in absolute value; so the claim holds for step functions (finite combinations of such indicators). A piecewise continuous integrable $f$ can be approximated by a step function $s$ with $\int\abs{f - s} < \eps$ (cut off the tails, then approximate the piecewise continuous function on a bounded interval by Riemann-sum step functions). Then $\abs{\hat f(\xi)} \le \abs{\hat s(\xi)} + \int\abs{f - s} < 2\eps$ for large $\abs\xi$.
:::

## Three fundamental transforms

::: example Two-sided exponential {#ex-exp-abs}
Find the Fourier transform of $f(x) = e^{-a\abs x}$, where $a > 0$.
::: solution
Split the integral at $0$:

$$
\hat f(\xi) = \int_{-\infty}^0e^{(a - i\xi)x}\,dx + \int_0^\infty e^{-(a + i\xi)x}\,dx = \frac{1}{a - i\xi} + \frac{1}{a + i\xi} = \frac{2a}{a^2 + \xi^2}.
$$

The corner of $e^{-a\abs x}$ at $0$ shows up as the slow decay $\sim 2a/\xi^2$ of the transform. (The transform is real because $f$ is even: the imaginary part $-\int f(x)\sin\xi x\,dx$ vanishes.)
:::
:::

::: example The rectangular pulse {#ex-rect}
Let $f = \chi_{[-a,a]}$, the function equal to $1$ on $[-a, a]$ and $0$ elsewhere. Find $\hat f$.
::: solution
$$
\hat f(\xi) = \int_{-a}^ae^{-i\xi x}\,dx = \frac{e^{-ia\xi} - e^{ia\xi}}{-i\xi} = \frac{2\sin a\xi}{\xi} \quad (\xi\ne0), \qquad \hat f(0) = 2a.
$$

The transform oscillates and decays only like $1/\abs\xi$ — the signature of the jumps — and is **not** integrable. Notice the reciprocal scaling: a wide pulse (large $a$) has a tall, narrow transform, whose first zeros are at $\xi = \pm\pi/a$, and a narrow pulse has a broad transform.
:::
:::

::: widget plot
f: if(abs(x) < a, 1, 0); 2*sin(a*x)/x
x: -10, 10
y: -1.5, 6.5
sliders: a=1:0.2:3:0.05
labels: f(x) = \chi_{[-a,a]}(x); \hat f(\xi) = 2\sin(a\xi)/\xi
caption: A rectangular pulse and its Fourier transform drawn on the same axis (read the horizontal axis as $x$ for the pulse and as $\xi$ for the transform). Widen the pulse with the slider: the transform grows taller ($\hat f(0) = 2a$ is the area of the pulse) and its central lobe, between $\pm\pi/a$, gets narrower. Spreading in $x$ means concentrating in $\xi$, and vice versa.
:::

The Gaussian is the most important function in Fourier analysis, because its transform is again a Gaussian.

::: proposition The Gaussian {#prop-gaussian}
For $a > 0$,

$$
\int_{-\infty}^{\infty}e^{-ax^2}e^{-i\xi x}\,dx = \sqrt{\frac\pi a}\,e^{-\xi^2/(4a)}.
$$
:::

::: proof
Let $g(\xi)$ be the left-hand side. Differentiating under the integral sign — justified because the derivative of the integrand with respect to $\xi$ is bounded by the integrable function $\abs x e^{-ax^2}$ (for instance by the dominated convergence theorem, [[measure-theory/lebesgue-integral]]) — and then integrating by parts,

$$
g'(\xi) = \int_{-\infty}^\infty(-ix)e^{-ax^2}e^{-i\xi x}\,dx = \frac{i}{2a}\int_{-\infty}^\infty\Bigl(\frac{d}{dx}e^{-ax^2}\Bigr)e^{-i\xi x}\,dx = \frac{i}{2a}\cdot i\xi\int_{-\infty}^\infty e^{-ax^2}e^{-i\xi x}\,dx = -\frac{\xi}{2a}g(\xi).
$$

(The boundary terms $\bigl[e^{-ax^2}e^{-i\xi x}\bigr]_{-R}^{R}$ tend to $0$.) This linear ODE has solution $g(\xi) = g(0)e^{-\xi^2/(4a)}$, and $g(0) = \int e^{-ax^2}\,dx = \sqrt{\pi/a}$ is the Gaussian integral ([[multivariable/multiple-integrals]]).
:::

In particular $e^{-x^2/2}$ has transform $\sqrt{2\pi}\,e^{-\xi^2/2}$: up to a constant, it is its own Fourier transform. A narrow Gaussian ($a$ large) has a wide transform and vice versa; the product of the widths is fixed. This is the first instance of the uncertainty principle.

## Properties of the transform

::: theorem Operational rules {#thm-rules}
Let $f$ be integrable, with $\hat f = \mathcal Ff$, and let $a\in\R$, $b \neq 0$.

1. **Translation:** $f(x - a)$ has transform $e^{-ia\xi}\hat f(\xi)$.
2. **Modulation:** $e^{iax}f(x)$ has transform $\hat f(\xi - a)$.
3. **Scaling:** $f(bx)$ has transform $\frac{1}{\abs b}\hat f\bigl(\frac\xi b\bigr)$.
4. **Derivative:** if $f$ is continuous and piecewise smooth, and $f'$ is integrable, then $\widehat{f'}(\xi) = i\xi\,\hat f(\xi)$.
5. **Multiplication by $x$:** if $xf(x)$ is integrable, then $\hat f$ is differentiable and $\widehat{xf}(\xi) = i\,\hat f\,'(\xi)$.
:::

::: proof
1–3 are changes of variable: $\int f(x - a)e^{-i\xi x}\,dx = \int f(y)e^{-i\xi(y + a)}\,dy = e^{-ia\xi}\hat f(\xi)$; $\int e^{iax}f(x)e^{-i\xi x}\,dx = \int f(x)e^{-i(\xi - a)x}\,dx$; and with $y = bx$, $\int f(bx)e^{-i\xi x}\,dx = \frac{1}{\abs b}\int f(y)e^{-i(\xi/b)y}\,dy$ (the absolute value appears because the limits are swapped when $b < 0$).

4. First, $f(x)\to0$ as $x\to\pm\infty$: since $f(x) = f(0) + \int_0^xf'$ and $f'$ is integrable, the limits $\lim_{x\to\pm\infty}f(x)$ exist, and they must be $0$ because $f$ is integrable. Integrating by parts on $[-R, R]$ (piece by piece; the interior boundary terms cancel because $f$ is continuous),

$$
\int_{-R}^Rf'(x)e^{-i\xi x}\,dx = \Bigl[f(x)e^{-i\xi x}\Bigr]_{-R}^R + i\xi\int_{-R}^Rf(x)e^{-i\xi x}\,dx,
$$

and letting $R\to\infty$ gives $\widehat{f'} = i\xi\hat f$.

5. The difference quotient $\frac{\hat f(\xi + h) - \hat f(\xi)}{h} = \int f(x)e^{-i\xi x}\frac{e^{-ihx} - 1}{h}\,dx$ has integrand converging to $-ixf(x)e^{-i\xi x}$ as $h\to0$ and bounded by $\abs{xf(x)}$, since $\abs{e^{-ihx} - 1} \le \abs{hx}$. By dominated convergence, $\hat f\,'(\xi) = \int(-ix)f(x)e^{-i\xi x}\,dx = -i\,\widehat{xf}(\xi)$, which is the claim.
:::

Rule 4 is the reason the transform is useful for differential equations: $\frac{d}{dx}$ becomes multiplication by $i\xi$, so a linear ODE with constant coefficients becomes an algebraic equation, and a PDE in $(x, t)$ becomes an ODE in $t$ for each fixed $\xi$. Rules 4 and 5 together express a duality: **smoothness of $f$ corresponds to decay of $\hat f$, and decay of $f$ to smoothness of $\hat f$.** If $f$ has $k$ integrable derivatives, then $\abs{\xi}^k\abs{\hat f(\xi)} = \abs{\widehat{f^{(k)}}(\xi)}$ is bounded, so $\hat f$ decays at least like $\abs\xi^{-k}$.

::: quiz
Suppose $\hat f = F$. Which is the Fourier transform of $g(x) = f(2x - 3)$?
- [ ] $\frac12e^{-3i\xi}F(\xi/2)$
- [x] $\frac12e^{-3i\xi/2}F(\xi/2)$
- [ ] $2e^{-3i\xi}F(2\xi)$
- [ ] $\frac12e^{3i\xi/2}F(\xi/2)$
::: solution
Write $g(x) = h\bigl(x - \frac32\bigr)$ with $h(x) = f(2x)$. By scaling, $\hat h(\xi) = \frac12F(\xi/2)$; by translation by $\frac32$, $\hat g(\xi) = e^{-3i\xi/2}\cdot\frac12F(\xi/2)$. The common error is to translate by $3$ instead of $\frac32$: $f(2x - 3)$ is $f(2x)$ shifted by $\frac32$, not by $3$.
:::
:::

## Convolution

::: definition Convolution {#def-convolution}
The **convolution** of integrable functions $f$ and $g$, at least one of them bounded, is

$$
(f*g)(x) = \int_{-\infty}^{\infty}f(x - y)\,g(y)\,dy.
$$
:::

Convolution is a moving weighted average: $(f*g)(x)$ averages the values of $f$ near $x$ with weights given by $g$ (if $g\ge0$ and $\int g = 1$). It is commutative ($f*g = g*f$, by the substitution $y\mapsto x - y$) and it smooths: the convolution of a function with a smooth bump is smooth. In probability, the density of the sum of two independent random variables is the convolution of their densities ([[probability/joint-distributions]]).

::: theorem Convolution theorem {#thm-convolution}
If $f$ and $g$ are integrable and one of them is bounded, then $f*g$ is integrable and

$$
\widehat{f*g}(\xi) = \hat f(\xi)\,\hat g(\xi).
$$
:::

::: proof
By Tonelli's theorem (interchanging the order of integration of a non-negative function),

$$
\int\!\!\int\abs{f(x - y)}\,\abs{g(y)}\,dy\,dx = \int\abs{g(y)}\left(\int\abs{f(x - y)}\,dx\right)dy = \int\abs f\cdot\int\abs g < \infty.
$$

So $f*g$ is integrable, and Fubini's theorem allows us to interchange the order of integration in

$$
\widehat{f*g}(\xi) = \int\!\!\int f(x - y)g(y)\,e^{-i\xi x}\,dy\,dx = \int g(y)e^{-i\xi y}\left(\int f(x - y)e^{-i\xi(x - y)}\,dx\right)dy = \hat f(\xi)\int g(y)e^{-i\xi y}\,dy,
$$

where we wrote $e^{-i\xi x} = e^{-i\xi y}e^{-i\xi(x-y)}$ and substituted $z = x - y$ in the inner integral. (For the piecewise continuous functions of this chapter the double integrals can be understood as improper Riemann integrals; in general, Tonelli's and Fubini's theorems belong to the Lebesgue theory of integration, which begins in [[measure-theory/lebesgue-integral]].)
:::

::: example A convolution computed two ways {#ex-conv}
Let $f(x) = e^{-\abs x}$. Compute $f*f$ directly, and check the convolution theorem.
::: solution
For $x \ge 0$ split the integral $\int e^{-\abs{x - y}}e^{-\abs y}\,dy$ at $y = 0$ and $y = x$:

$$
\int_{-\infty}^0e^{-(x - y)}e^{y}\,dy + \int_0^xe^{-(x-y)}e^{-y}\,dy + \int_x^\infty e^{-(y - x)}e^{-y}\,dy = \frac{e^{-x}}{2} + xe^{-x} + \frac{e^{-x}}{2} = (1 + x)e^{-x}.
$$

By symmetry, $(f*f)(x) = (1 + \abs x)e^{-\abs x}$. By [[#ex-exp-abs]] and the convolution theorem its transform should be $\bigl(\frac{2}{1 + \xi^2}\bigr)^2 = \frac{4}{(1+\xi^2)^2}$. Indeed, $\abs xe^{-\abs x}$ is even with transform $2\int_0^\infty xe^{-x}\cos\xi x\,dx = \frac{2(1 - \xi^2)}{(1+\xi^2)^2}$, and adding $\frac{2}{1 + \xi^2} = \frac{2(1 + \xi^2)}{(1 + \xi^2)^2}$ gives $\frac{4}{(1 + \xi^2)^2}$.
:::
:::

## Inversion and Plancherel's theorem

Can $f$ be recovered from $\hat f$? The heuristic of the first section suggests the inversion formula; here is the precise statement, the analogue of Dirichlet's theorem for Fourier series.

::: theorem Fourier inversion {#thm-inversion}
Let $f$ be integrable and piecewise smooth on every bounded interval. Then for every $x\in\R$,

$$
\lim_{R\to\infty}\frac{1}{2\pi}\int_{-R}^{R}\hat f(\xi)\,e^{i\xi x}\,d\xi = \frac{f(x^+) + f(x^-)}{2}.
$$

If moreover $f$ is continuous and $\hat f$ is integrable, then $f(x) = \dfrac{1}{2\pi}\displaystyle\int_{-\infty}^{\infty}\hat f(\xi)e^{i\xi x}\,d\xi$ for every $x$.
:::

::: proof {collapsed}
*Sketch.* Insert the definition of $\hat f$ and interchange the integrals (legitimate, since $\xi$ ranges over the bounded interval $[-R, R]$ and $f$ is integrable):

$$
\frac{1}{2\pi}\int_{-R}^R\hat f(\xi)e^{i\xi x}\,d\xi = \frac1{2\pi}\int_{-\infty}^\infty f(y)\left(\int_{-R}^Re^{i\xi(x - y)}\,d\xi\right)dy = \frac1\pi\int_{-\infty}^\infty f(x + t)\,\frac{\sin Rt}{t}\,dt.
$$

The kernel $\frac{\sin Rt}{\pi t}$ plays the role of the Dirichlet kernel in [[pde/fourier-series#lem-dirichlet]], and $\int_0^\infty\frac{\sin Rt}{t}\,dt = \frac\pi2$ for every $R > 0$ (the Dirichlet integral, evaluated in [[ode/laplace-transform]] and in [[complex-analysis/residues]]). Subtracting $\frac12f(x^+) + \frac12f(x^-)$ and arguing exactly as in the proof of [[pde/fourier-series#thm-dirichlet]] — the quotient $\frac{f(x+t) - f(x^\pm)}{t}$ is bounded near $t = 0$ by piecewise smoothness, and a Riemann–Lebesgue argument disposes of the rest, including the tails, which are controlled by the integrability of $f$ — gives the first statement. If $\hat f$ is integrable, the limit is the absolutely convergent integral, and at points of continuity the right-hand side is $f(x)$. Full details are in Stein and Shakarchi, *Fourier Analysis*, chapter 5, or Folland, *Fourier Analysis and Its Applications*, chapter 7.
:::

Inversion makes the transform injective: an integrable piecewise smooth function is determined (at its points of continuity) by its transform. It also produces new transforms for free. Since $\frac{2a}{a^2+\xi^2}$ is integrable, inverting [[#ex-exp-abs]] gives $e^{-a\abs x} = \frac1{2\pi}\int\frac{2a}{a^2 + \xi^2}e^{i\xi x}\,d\xi$; renaming the variables and replacing $x$ by $-x$,

$$
\mathcal F\left[\frac{1}{a^2 + x^2}\right](\xi) = \frac{\pi}{a}e^{-a\abs\xi}.
$$ {#eq-lorentzian}

(This can also be computed with residues, [[complex-analysis/residues]].) And inverting the rectangular pulse at $x = 0$ — a point of continuity — gives $1 = \frac{1}{2\pi}\lim_{R\to\infty}\int_{-R}^R\frac{2\sin a\xi}{\xi}\,d\xi$, the famous **Dirichlet integral** $\int_{-\infty}^\infty\frac{\sin a\xi}{\xi}\,d\xi = \pi$ for $a > 0$. (This is a consistency check rather than a new proof, since the proof of [[#thm-inversion]] uses this integral.)

::: theorem Plancherel's identity {#thm-plancherel}
If $f$ is integrable and $\int\abs f^2 < \infty$, then $\hat f$ is square-integrable and

$$
\int_{-\infty}^{\infty}\abs{f(x)}^2\,dx = \frac{1}{2\pi}\int_{-\infty}^{\infty}\abs{\hat f(\xi)}^2\,d\xi.
$$
:::

::: proof {collapsed}
*Sketch.* Let $\tilde f(x) = \overline{f(-x)}$, whose transform is $\overline{\hat f(\xi)}$. The function $g = f*\tilde f$ is continuous, with $g(0) = \int\abs{f(y)}^2\,dy$, and by [[#thm-convolution]] $\hat g = \hat f\,\overline{\hat f} = \abs{\hat f}^2 \ge 0$. Inverting at $x = 0$ gives $g(0) = \frac{1}{2\pi}\int\abs{\hat f}^2$. To avoid assuming in advance that $\hat g$ is integrable, one inserts a convergence factor $e^{-\eps\xi^2}$, uses [[#prop-gaussian]] to write $\frac1{2\pi}\int\hat g(\xi)e^{-\eps\xi^2}\,d\xi$ as the average of $g$ against a narrow Gaussian, and lets $\eps\to0$, using monotone convergence on the left and continuity of $g$ on the right. See Stein and Shakarchi, chapter 5.
:::

Plancherel's identity is the continuous version of Parseval's identity ([[pde/fourier-series#thm-parseval]]): the energy of a signal equals the total energy of its frequency components. It can be used to evaluate integrals. With $f = \chi_{[-1,1]}$, $\int\abs f^2 = 2$ and $\hat f = \frac{2\sin\xi}{\xi}$, so $2 = \frac1{2\pi}\int\frac{4\sin^2\xi}{\xi^2}\,d\xi$, that is $\int_{-\infty}^\infty\frac{\sin^2\xi}{\xi^2}\,d\xi = \pi$.

## The heat equation on the whole line

Consider an infinitely long rod with initial temperature $f$:

$$
u_t = k\,u_{xx}\quad(x\in\R,\ t > 0), \qquad u(x, 0) = f(x).
$$ {#eq-heat-line}

There are no boundary conditions, so there is no discrete set of modes; instead, every frequency $\xi$ is a mode. Take the Fourier transform in $x$, writing $\hat u(\xi, t) = \int u(x,t)e^{-i\xi x}\,dx$. By rule 4 of [[#thm-rules]] (applied twice), $\widehat{u_{xx}} = (i\xi)^2\hat u = -\xi^2\hat u$, and assuming we may differentiate under the integral sign in $t$,

$$
\frac{\partial\hat u}{\partial t}(\xi, t) = -k\xi^2\,\hat u(\xi, t), \qquad \hat u(\xi, 0) = \hat f(\xi).
$$

For each fixed $\xi$ this is a first-order linear ODE in $t$, with solution

$$
\hat u(\xi, t) = \hat f(\xi)\,e^{-k\xi^2t}.
$$

Each frequency decays at the rate $k\xi^2$, exactly as the $n$th mode $e^{-k(n\pi/L)^2t}$ did on a finite rod. To return to $u$, recognise $e^{-k\xi^2t}$ as a transform: by [[#prop-gaussian]] with $a = \frac{1}{4kt}$,

$$
G_t(x) = \frac{1}{\sqrt{4\pi kt}}\,e^{-x^2/(4kt)} \qquad\text{has}\qquad \widehat{G_t}(\xi) = e^{-k\xi^2t}.
$$ {#eq-heat-kernel}

So $\hat u = \hat f\,\widehat{G_t}$, and by the convolution theorem $u(\cdot, t) = G_t*f$. This formal derivation suggests the following theorem, which we then prove directly.

::: theorem Solution by the heat kernel {#thm-heat-kernel}
Let $f$ be bounded and continuous on $\R$, with $\abs f \le M$. Then

$$
u(x,t) = \frac{1}{\sqrt{4\pi kt}}\int_{-\infty}^{\infty}e^{-(x - y)^2/(4kt)}\,f(y)\,dy
$$ {#eq-heat-solution}

is infinitely differentiable on $\R\times(0,\infty)$, satisfies $u_t = k\,u_{xx}$ there, satisfies $\abs{u} \le M$, and $u(x,t)\to f(x_0)$ as $(x,t)\to(x_0, 0^+)$ for every $x_0\in\R$.
:::

::: proof
The **heat kernel** $G_t$ has three properties: it is positive; $\int G_t(x)\,dx = 1$ for every $t > 0$ (the Gaussian integral, or $\widehat{G_t}(0) = 1$); and it solves the heat equation, since

$$
\partial_tG_t = G_t\left(-\frac{1}{2t} + \frac{x^2}{4kt^2}\right), \qquad \partial_xG_t = -\frac{x}{2kt}G_t, \qquad k\,\partial_x^2G_t = G_t\left(\frac{x^2}{4kt^2} - \frac{1}{2t}\right).
$$

*Smoothness and the PDE.* Every partial derivative of $G_t(x - y)$ with respect to $x$ and $t$ is a polynomial in $x - y$ and $t^{-1/2}$ times $e^{-(x-y)^2/(4kt)}$. For $(x, t)$ in a compact subset of $\R\times(0,\infty)$ these are bounded by an integrable function of $y$ (a polynomial times a Gaussian), so we may differentiate [[#eq-heat-solution]] under the integral sign as often as we like. In particular $u_t - k\,u_{xx} = \int(\partial_t - k\,\partial_x^2)G_t(x - y)\,f(y)\,dy = 0$.

*Bound.* $\abs{u(x,t)} \le \int G_t(x - y)\abs{f(y)}\,dy \le M\int G_t = M$.

*Initial values.* Fix $x_0$ and $\eps > 0$, and choose $\delta > 0$ with $\abs{f(y) - f(x_0)} < \eps$ for $\abs{y - x_0} < 2\delta$. Since $\int G_t = 1$, for $\abs{x - x_0} < \delta$,

$$
\abs{u(x,t) - f(x_0)} \le \int_{\abs{y - x}<\delta}G_t(x - y)\abs{f(y) - f(x_0)}\,dy + \int_{\abs{y - x}\ge\delta}G_t(x - y)\,2M\,dy < \eps + 2M\int_{\abs z\ge\delta}G_t(z)\,dz,
$$

because $\abs{y - x} < \delta$ implies $\abs{y - x_0} < 2\delta$. Substituting $z = \sqrt{4kt}\,s$ shows that the last integral equals $\frac{1}{\sqrt\pi}\int_{\abs s\ge\delta/\sqrt{4kt}}e^{-s^2}\,ds$, which tends to $0$ as $t\to0^+$. So $\abs{u(x,t) - f(x_0)} < 2\eps$ for $\abs{x - x_0} < \delta$ and $t$ small enough.
:::

The heat kernel $G_t$ itself is the temperature produced by a unit quantity of heat released at the origin at time $0$ — a "point source". It is a Gaussian with standard deviation $\sqrt{2kt}$: the heat spreads over a distance proportional to $\sqrt t$, the hallmark of diffusion. Formula [[#eq-heat-solution]] says that the temperature at time $t$ is the superposition of the spreading point sources released by the initial heat at every point $y$.

::: widget plot
f: exp(-x^2/(4*t))/sqrt(4*pi*t); 0.5*(erf((x + 1)/sqrt(4*t)) - erf((x - 1)/sqrt(4*t)))
x: -6, 6
y: 0, 1.3
sliders: t=0.25:0.02:4:0.01
labels: G_t(x); u(x,t)\ \text{for } f = \chi_{[-1,1]}
caption: The heat kernel $G_t$ with $k = 1$ and the temperature of an infinite rod that starts at $1$ on $[-1,1]$ and $0$ elsewhere. Drag $t$ towards $0$: the kernel becomes a tall, narrow spike of area $1$ and the box regains its sharp edges. Drag it up: the kernel spreads like $\sqrt t$ and its peak falls like $1/\sqrt t$ (for larger $t$ the box does the same), while the area under each curve stays fixed — the total heat is conserved.
:::

::: example A hot segment {#ex-box}
An infinite rod has initial temperature $1$ on $[-a, a]$ and $0$ elsewhere. Find $u(x,t)$ and the temperature at the centre.
::: solution
Formula [[#eq-heat-solution]] holds also for bounded piecewise continuous $f$ (the proof is unchanged at points of continuity of $f$). With the **error function** $\erf(z) = \frac{2}{\sqrt\pi}\int_0^ze^{-s^2}\,ds$ and the substitution $s = \frac{y - x}{\sqrt{4kt}}$,

$$
u(x,t) = \frac{1}{\sqrt{4\pi kt}}\int_{-a}^ae^{-(x-y)^2/(4kt)}\,dy = \frac{1}{\sqrt\pi}\int_{(-a - x)/\sqrt{4kt}}^{(a - x)/\sqrt{4kt}}e^{-s^2}\,ds = \frac12\left[\erf\frac{x + a}{\sqrt{4kt}} - \erf\frac{x - a}{\sqrt{4kt}}\right].
$$

At the centre, $u(0, t) = \erf\frac{a}{\sqrt{4kt}}$. For large $t$, $\erf z \approx \frac{2z}{\sqrt\pi}$ gives $u(0,t)\approx\frac{a}{\sqrt{\pi kt}}$: on an infinite rod the temperature decays only like $t^{-1/2}$, not exponentially as on a finite rod with cold ends, because the heat is never removed — it merely spreads out.
:::
:::

::: example A Gaussian temperature profile {#ex-gauss-heat}
Solve [[#eq-heat-line]] with $f(x) = e^{-x^2}$ using transforms.
::: solution
By [[#prop-gaussian]] with $a = 1$, $\hat f(\xi) = \sqrt\pi\,e^{-\xi^2/4}$, so

$$
\hat u(\xi,t) = \sqrt\pi\,e^{-\xi^2/4}e^{-k\xi^2t} = \sqrt\pi\,e^{-\xi^2(1 + 4kt)/4}.
$$

This is again the transform of a Gaussian: [[#prop-gaussian]] with $a = \frac{1}{1 + 4kt}$ gives $\mathcal F\bigl[e^{-x^2/(1+4kt)}\bigr] = \sqrt{\pi(1 + 4kt)}\,e^{-\xi^2(1 + 4kt)/4}$. Dividing,

$$
u(x,t) = \frac{1}{\sqrt{1 + 4kt}}\,e^{-x^2/(1 + 4kt)}.
$$

One checks directly that $u_t = k\,u_{xx}$ and $u(x,0) = e^{-x^2}$. The profile stays Gaussian; its "variance" $\frac{1 + 4kt}{2}$ grows linearly in time — variances add under convolution, just as for sums of independent normal random variables — and its height falls so that the area $\sqrt\pi$ is conserved.
:::
:::

::: warning Infinite speed, and uniqueness needs a growth condition
Two features of [[#thm-heat-kernel]] are surprising. First, if $f \ge 0$ is non-zero only on $[-a,a]$, then $u(x,t) > 0$ for **every** $x$ as soon as $t > 0$, because $G_t > 0$ everywhere: heat propagates at infinite speed (though with Gaussian-small amplitude far away). The heat equation is a model that ignores the finite speed of molecules; it is extremely accurate where the amplitude matters, but it should not be pushed to statements about tiny effects at great distances. Second, the problem [[#eq-heat-line]] is unique only within a class of reasonable functions: Tychonoff constructed in 1935 a non-zero solution with zero initial data that grows extremely fast as $\abs x\to\infty$. Among solutions satisfying $\abs{u(x,t)} \le Ce^{bx^2}$ for some constants, [[#eq-heat-solution]] is the only one.
:::

::: quiz
An infinite rod ($k = 1$) has initial temperature $f \ge 0$ that is positive on $(0,1)$ and zero elsewhere. What is $u(100, 0.001)$?
- [ ] Exactly $0$, because heat cannot travel that far in such a short time.
- [x] Positive, but extraordinarily small.
- [ ] Negative, by the maximum principle.
- [ ] Undefined, because $f$ is discontinuous.
::: solution
By [[#eq-heat-solution]], $u(100, 0.001) = \int_0^1G_{0.001}(100 - y)f(y)\,dy$, and the kernel is positive everywhere, so the value is positive. But $G_{0.001}(99) = \frac{1}{\sqrt{0.004\pi}}e^{-99^2/0.004}$, an absurdly small number (about $10^{-1\,064\,000}$). Mathematically heat travels infinitely fast; physically the effect is utterly negligible.
:::
:::

## The uncertainty principle

The rectangular pulse and the Gaussian both showed a trade-off: concentrating $f$ spreads $\hat f$. The trade-off can be measured with second moments.

::: theorem Heisenberg's inequality {#thm-heisenberg}
Let $f$ be continuously differentiable, with $f$ and $f'$ integrable, $f$, $xf$ and $f'$ square-integrable, and $x\abs{f(x)}^2\to0$ as $\abs x\to\infty$ (for example, any polynomial times a Gaussian). Then

$$
\left(\int_{-\infty}^{\infty}x^2\abs{f(x)}^2\,dx\right)\left(\int_{-\infty}^{\infty}\xi^2\abs{\hat f(\xi)}^2\,d\xi\right) \ge \frac\pi2\left(\int_{-\infty}^{\infty}\abs{f(x)}^2\,dx\right)^2,
$$

with equality when $f$ is a Gaussian $e^{-ax^2}$.
:::

::: proof
Integrate by parts, using $(\abs f^2)' = 2\operatorname{Re}(\bar ff')$ and the decay of $x\abs f^2$:

$$
\int_{-\infty}^\infty\abs f^2\,dx = \Bigl[x\abs f^2\Bigr]_{-\infty}^\infty - \int_{-\infty}^\infty x\,\bigl(\abs f^2\bigr)'\,dx = -2\operatorname{Re}\int_{-\infty}^\infty x\bar f f'\,dx.
$$

By the Cauchy–Schwarz inequality, $\bigl(\int\abs f^2\bigr)^2 \le 4\int x^2\abs f^2\cdot\int\abs{f'}^2$. By Plancherel's identity ([[#thm-plancherel]]) and rule 4 of [[#thm-rules]], $\int\abs{f'}^2 = \frac{1}{2\pi}\int\abs{i\xi\hat f(\xi)}^2\,d\xi = \frac1{2\pi}\int\xi^2\abs{\hat f}^2$. Substituting gives the inequality. For $f = e^{-x^2/2}$ one computes $\int x^2e^{-x^2}\,dx = \frac{\sqrt\pi}2$, $\hat f = \sqrt{2\pi}e^{-\xi^2/2}$, $\int\xi^2\cdot2\pi e^{-\xi^2}\,d\xi = \pi^{3/2}$, and $\int e^{-x^2}\,dx = \sqrt\pi$: both sides equal $\frac{\pi^2}{2}$. (Equality in Cauchy–Schwarz requires $f' = cxf$, which forces a Gaussian.)
:::

::: widget plot
f: exp(-a*x^2); sqrt(pi/a)*exp(-x^2/(4*a))
x: -8, 8
y: 0, 4
sliders: a=1:0.05:5:0.05
labels: e^{-ax^2}; \sqrt{\pi/a}\,e^{-\xi^2/(4a)}
caption: A Gaussian (first curve, variable $x$) and its Fourier transform (second curve, variable $\xi$). Increase $a$ to squeeze the Gaussian: its transform becomes lower and wider. Decrease $a$: the Gaussian spreads and its transform sharpens into a spike. The product of their widths never changes — Gaussians are exactly the functions for which Heisenberg's inequality is an equality.
:::

::: application Signals, optics and quantum mechanics
In signal processing a signal $f(t)$ lasting about $T$ seconds occupies a band of frequencies of width at least of order $1/T$: short pulses need wide bandwidth, which is why fast data transmission needs high-bandwidth channels. In optics, the far-field diffraction pattern of light passing through an aperture is (up to scaling) the Fourier transform of the aperture, so a narrow slit produces a wide pattern of the $\frac{\sin^2}{\xi^2}$ shape computed above. In quantum mechanics, the momentum wave function is the Fourier transform of the position wave function, and [[#thm-heisenberg]] becomes the uncertainty relation $\Delta x\,\Delta p \ge \hbar/2$. In computation, the discrete Fourier transform of $N$ samples is evaluated in $O(N\log N)$ operations by the fast Fourier transform, one of the most widely used algorithms in science and engineering.
:::

::: history
Fourier introduced the integral representation of non-periodic functions in his work on heat in an infinite body, submitted in 1811 and published in the *Théorie analytique de la chaleur* of 1822; Cauchy and Poisson studied similar integrals in the 1810s, partly in connection with water waves. Rigorous inversion theorems came with the development of the Lebesgue integral: Michel Plancherel proved his theorem on square-integrable functions in 1910, and Norbert Wiener, Salomon Bochner and others built the modern theory in the 1920s and 1930s. Werner Heisenberg formulated the uncertainty principle in 1927, and the precise inequality was proved that year by Earle Kennard and soon afterwards by Hermann Weyl. On the computational side, James Cooley and John Tukey published the fast Fourier transform in 1965; it was later discovered that Carl Friedrich Gauss had used essentially the same idea around 1805 to interpolate asteroid orbits, in work published only after his death.
:::

## Where this leads

The Fourier transform solves other constant-coefficient problems on the whole line in the same way: the wave equation, where each frequency oscillates as $\cos c\xi t$ and inversion recovers d'Alembert's formula ([[pde/wave-equation]]); Laplace's equation in a half-plane, where the kernel is the Poisson kernel $\frac{y}{\pi(x^2 + y^2)}$, a relative of [[#eq-lorentzian]]; and ordinary differential equations on $\R$. The **Laplace transform** of [[ode/laplace-transform]] is the one-sided cousin of the Fourier transform, adapted to initial value problems; formally, writing $s = \sigma + i\tau$, $\mathcal L f(s)$ is the Fourier transform of $f(t)e^{-\sigma t}$ restricted to $t \ge 0$, evaluated at $\xi = \tau = \operatorname{Im}s$. Extending the transform to all square-integrable functions, and to generalised functions such as the Dirac delta, leads to distribution theory and modern harmonic analysis, building on [[measure-theory/lp-spaces]]. In probability, the characteristic function $\E e^{i\xi X}$ of a random variable $X$ with density $p$ is $\hat p(-\xi)$, the transform with the opposite sign convention; it is the main tool for proving the central limit theorem ([[probability/limit-theorems]]).

::: summary
- The Fourier transform $\hat f(\xi) = \int f(x)e^{-i\xi x}\,dx$ is the limit of Fourier series as the period tends to infinity; it is bounded, continuous and tends to $0$ at infinity (Riemann–Lebesgue).
- Key transforms: $e^{-a\abs x}\mapsto\frac{2a}{a^2+\xi^2}$; $\chi_{[-a,a]}\mapsto\frac{2\sin a\xi}{\xi}$; $e^{-ax^2}\mapsto\sqrt{\pi/a}\,e^{-\xi^2/(4a)}$; $\frac{1}{a^2+x^2}\mapsto\frac\pi ae^{-a\abs\xi}$.
- Translation becomes a phase factor, scaling inverts widths, $\frac{d}{dx}$ becomes multiplication by $i\xi$, and multiplication by $x$ becomes $i\frac{d}{d\xi}$; smoothness of $f$ corresponds to decay of $\hat f$.
- The convolution theorem $\widehat{f*g} = \hat f\,\hat g$ is proved by Fubini's theorem.
- Inversion $f = \frac{1}{2\pi}\int\hat fe^{i\xi x}\,d\xi$ (with midpoints at jumps) and Plancherel's identity $\int\abs f^2 = \frac1{2\pi}\int\abs{\hat f}^2$ mirror Dirichlet's theorem and Parseval's identity.
- The heat equation on $\R$ is solved by $u = G_t*f$ with the heat kernel $G_t(x) = (4\pi kt)^{-1/2}e^{-x^2/(4kt)}$; heat spreads like $\sqrt t$ and, mathematically, at infinite speed.
- Heisenberg's inequality: $f$ and $\hat f$ cannot both be concentrated; Gaussians are the extreme case.
:::

## Exercises

::: exercise An exponential {level=1 check="6/25"}
Find the Fourier transform of $f(x) = e^{-3\abs x}$ and evaluate $\hat f(4)$.
::: solution
By [[#ex-exp-abs]] with $a = 3$, $\hat f(\xi) = \frac{6}{9 + \xi^2}$, so $\hat f(4) = \frac{6}{25}$.
:::
:::

::: exercise A wider pulse {level=1 check="8/pi"}
Let $f = \chi_{[-2,2]}$. Find $\hat f(0)$ and $\hat f(\pi/4)$. (Enter $\hat f(\pi/4)$.)
::: solution
By [[#ex-rect]] with $a = 2$, $\hat f(\xi) = \frac{2\sin2\xi}{\xi}$ and $\hat f(0) = 4$, the area under $f$. At $\xi = \pi/4$, $\hat f = \frac{2\sin(\pi/2)}{\pi/4} = \frac{8}{\pi}$.
:::
:::

::: exercise Using the derivative rule {level=1 check="sqrt(pi)/e"}
Find the Fourier transform of $g(x) = xe^{-x^2}$ in two ways — using rule 4 and using rule 5 of [[#thm-rules]] — and evaluate $i\,\hat g(2)$.
::: solution
With $f = e^{-x^2}$, $\hat f = \sqrt\pi e^{-\xi^2/4}$. Rule 4: $g = -\frac12f'$, so $\hat g = -\frac12i\xi\hat f = -\frac{i\sqrt\pi}{2}\xi e^{-\xi^2/4}$. Rule 5: $\hat g = \widehat{xf} = i\hat f\,' = i\sqrt\pi\cdot\bigl(-\frac\xi2\bigr)e^{-\xi^2/4}$, the same. Then $i\hat g(2) = i\cdot\bigl(-\frac{i\sqrt\pi}{2}\cdot2e^{-1}\bigr) = \frac{\sqrt\pi}{e}$.
:::
:::

::: exercise An integral from Plancherel {level=2 check="pi/2"}
Use Plancherel's identity with $f(x) = e^{-\abs x}$ to evaluate $\displaystyle\int_{-\infty}^\infty\frac{d\xi}{(1 + \xi^2)^2}$.
::: solution
$\int\abs f^2 = \int e^{-2\abs x}\,dx = 1$ and $\hat f = \frac{2}{1 + \xi^2}$. By [[#thm-plancherel]], $1 = \frac1{2\pi}\int\frac{4}{(1+\xi^2)^2}\,d\xi$, so the integral is $\frac{2\pi}{4} = \frac\pi2$.
:::
:::

::: exercise Spreading of a Gaussian {level=2 check="1/3"}
With $k = 1$ and initial temperature $e^{-x^2}$ on an infinite rod, find the temperature at $x = 0$ at time $t = 2$, and the time at which the central temperature has fallen to half its initial value. (Enter $u(0,2)$.)
::: solution
By [[#ex-gauss-heat]], $u(0,t) = (1 + 4t)^{-1/2}$, so $u(0,2) = \frac{1}{\sqrt9} = \frac13$. Half the initial value requires $1 + 4t = 4$, i.e. $t = \frac34$.
:::
:::

::: exercise A self-convolution {level=2 check="2/e"}
For $f = e^{-\abs x}$, evaluate $(f*f)(1)$ directly from the definition, and confirm that $\int(f*f)\,dx = \bigl(\int f\bigr)^2$.
::: solution
From [[#ex-conv]], $(f*f)(x) = (1 + \abs x)e^{-\abs x}$, so $(f*f)(1) = 2e^{-1} = \frac2e$. Then $\int(1 + \abs x)e^{-\abs x}\,dx = 2\int_0^\infty(1 + x)e^{-x}\,dx = 2(1 + 1) = 4 = 2^2 = \bigl(\int e^{-\abs x}\,dx\bigr)^2$. This is the convolution theorem at $\xi = 0$: $\widehat{f*f}(0) = \hat f(0)^2$.
:::
:::

::: exercise Infinite speed of propagation {level=2}
Let $f$ be bounded, continuous, $f \ge 0$ and not identically zero. Prove that the solution [[#eq-heat-solution]] satisfies $u(x,t) > 0$ for all $x\in\R$ and $t > 0$.
::: solution
Since $f$ is continuous, non-negative and not identically zero, there are $y_0$ and $\delta, c > 0$ with $f \ge c$ on $[y_0 - \delta, y_0 + \delta]$. The kernel is strictly positive, so

$$
u(x,t) = \int G_t(x - y)f(y)\,dy \ge c\int_{y_0-\delta}^{y_0+\delta}G_t(x - y)\,dy > 0,
$$

the last integral being the integral of a continuous positive function over an interval of positive length.
:::
:::

::: exercise The semigroup property {level=3}
Show that $G_s*G_t = G_{s+t}$ for $s, t > 0$, and interpret this in terms of the heat equation. Deduce that if $u$ is given by [[#eq-heat-solution]], then $u(\cdot, s + t) = G_t*u(\cdot, s)$.
::: hint
Compare Fourier transforms, and use the inversion theorem.
:::
::: solution
By [[#thm-convolution]] and [[#eq-heat-kernel]], $\widehat{G_s*G_t}(\xi) = e^{-k\xi^2s}e^{-k\xi^2t} = e^{-k\xi^2(s+t)} = \widehat{G_{s+t}}(\xi)$. Both $G_s*G_t$ and $G_{s+t}$ are continuous, integrable and piecewise smooth (the convolution of two Gaussians is smooth by differentiation under the integral sign), and their common transform is integrable, so by [[#thm-inversion]] they are equal. (Alternatively, complete the square in the exponent and compute the Gaussian integral directly.) Interpretation: letting heat diffuse for time $s$ and then for time $t$ is the same as letting it diffuse for time $s + t$. For the second statement, by associativity of convolution (another application of Fubini's theorem), $G_t*u(\cdot, s) = G_t*(G_s*f) = (G_t*G_s)*f = G_{s+t}*f = u(\cdot, s+t)$.
:::
:::

::: exercise Decay on the infinite rod {level=3}
Let $f$ be bounded, continuous and integrable, and let $u$ be given by [[#eq-heat-solution]]. Prove that $\int u(x,t)\,dx = \int f(x)\,dx$ for all $t > 0$ (conservation of heat), and that

$$
\abs{u(x,t)} \le \frac{1}{\sqrt{4\pi kt}}\int_{-\infty}^\infty\abs{f(y)}\,dy,
$$

so that $u\to0$ uniformly as $t\to\infty$.
::: solution
For the first claim, use Fubini's theorem (justified because $\int\!\!\int G_t(x - y)\abs{f(y)}\,dy\,dx = \int\abs f < \infty$):

$$
\int u(x,t)\,dx = \int f(y)\left(\int G_t(x - y)\,dx\right)dy = \int f(y)\,dy,
$$

since each $G_t(\cdot - y)$ has integral $1$. For the bound, $G_t(z) \le G_t(0) = \frac{1}{\sqrt{4\pi kt}}$ for all $z$, so $\abs{u(x,t)} \le \int G_t(x - y)\abs{f(y)}\,dy \le \frac{1}{\sqrt{4\pi kt}}\int\abs f$, which tends to $0$ uniformly in $x$. The total heat stays the same while its maximum density falls like $t^{-1/2}$: the heat spreads over a region of width proportional to $\sqrt{kt}$. (Compare [[#ex-box]], where $u(0,t)\approx\frac{a}{\sqrt{\pi kt}}$ and $\int f = 2a$.)
:::
:::
