A child on a swing soon learns that pushing at random achieves little, while small pushes timed to match the swing's own rhythm build up a large motion. A washing machine judders violently at one particular spin speed and then runs smoothly again at higher speed. A wine glass can be shattered by a sustained note at exactly the right pitch. All three are instances of **forced oscillation**, governed by the equation

$$
m\,x'' + c\,x' + k\,x = F(t),
$$ {#eq-forced}

which is the spring equation of [[ode/second-order-linear]] with an external force $F(t)$ added. The equation is now **non-homogeneous**, and its solutions depend on the forcing as well as on the initial state.

This chapter shows how to solve such equations. The structure is simple: every solution is one particular solution plus a solution of the homogeneous equation, which we already know how to find. There are two ways of finding a particular solution. **Undetermined coefficients** is fast but works only for constant coefficients and special forcing terms; we prove exactly when and why it works. **Variation of parameters** always works, and leads to a formula expressing the response as an integral of the forcing against a kernel — the germ of the Green's function. We then use these tools to understand beats, resonance and the response of damped systems to periodic forcing.

## The structure of the general solution

Throughout, $L[y] = y'' + p(t)y' + q(t)y$ with $p, q$ continuous on an interval $I$, and $y_1, y_2$ is a fundamental set of solutions of $L[y] = 0$.

::: theorem Structure of solutions {#thm-structure}
Let $g$ be continuous on $I$ and let $y_p$ be any one solution of $L[y] = g$.

1. Every solution of $L[y] = g$ on $I$ has the form $y = y_p + c_1y_1 + c_2y_2$ for some constants $c_1, c_2$, and every function of this form is a solution.
2. (Superposition of forcing.) If $L[y_{p,j}] = g_j$ for $j = 1, \dots, n$, then $L\bigl[\sum_j a_jy_{p,j}\bigr] = \sum_j a_jg_j$ for any constants $a_j$.
:::

::: proof
1. If $y$ solves $L[y] = g$, then by linearity ([[ode/second-order-linear#thm-superposition]]) $L[y - y_p] = g - g = 0$, so $y - y_p$ solves the homogeneous equation and equals $c_1y_1 + c_2y_2$ by [[ode/second-order-linear#thm-general]]. Conversely $L[y_p + c_1y_1 + c_2y_2] = g + 0 = g$.
2. This is linearity of $L$ again: $L\bigl[\sum a_jy_{p,j}\bigr] = \sum a_jL[y_{p,j}] = \sum a_jg_j$.
:::

The function $y_h = c_1y_1 + c_2y_2$ is called the **complementary** (or homogeneous) solution and $y_p$ a **particular** solution. Part 2 means that a complicated forcing term can be split into simple pieces, each handled separately. The constants $c_1, c_2$ are always fitted to initial conditions **last**, to the full solution $y_p + y_h$.

::: warning Fit the initial conditions to the whole solution
A frequent error is to fit $c_1, c_2$ to the initial conditions using $y_h$ alone and then add $y_p$. That gives the wrong answer unless $y_p(t_0) = y_p'(t_0) = 0$. Write down $y = y_p + c_1y_1 + c_2y_2$ first, then impose $y(t_0) = y_0$ and $y'(t_0) = y_1$.
:::

## Undetermined coefficients

For constant coefficients and forcing terms built from polynomials, exponentials, sines and cosines, a particular solution has the same general shape as the forcing. For example, $L[y] = y'' - 3y' - 4y$ maps $Ae^{2t}$ to $(4 - 6 - 4)Ae^{2t} = -6Ae^{2t}$, so to solve $L[y] = 3e^{2t}$ we just choose $A = -\tfrac12$. In general we guess a form with unknown coefficients and determine them by substitution. The only subtlety is what happens when the guess is itself a solution of the homogeneous equation, and the following theorem settles it once and for all.

Write the equation as $P(D)y = g$, where $D = d/dt$ and $P(r) = ar^2 + br + c$ is the characteristic polynomial.

::: theorem Method of undetermined coefficients {#thm-undetermined}
Let $P(r) = ar^2 + br + c$ with real coefficients and $a \neq 0$, let $p_m$ be a polynomial of degree $m$, and let $s \in \set{0,1,2}$ be the multiplicity of $\alpha$ as a root of $P$ ($s = 0$ if $P(\alpha) \neq 0$).

1. If $g(t) = p_m(t)\,e^{\alpha t}$ with $\alpha$ real, then $P(D)y = g$ has a particular solution
$$
y_p = t^s\,(A_mt^m + \dots + A_1t + A_0)\,e^{\alpha t}.
$$
2. If $g(t) = e^{\lambda t}\bigl(p_m(t)\cos\mu t + \tilde p_m(t)\sin\mu t\bigr)$ with real polynomials of degree at most $m$, and $\alpha = \lambda + i\mu$, then there is a particular solution
$$
y_p = t^s e^{\lambda t}\bigl(Q_m(t)\cos\mu t + \tilde Q_m(t)\sin\mu t\bigr)
$$
with real polynomials $Q_m, \tilde Q_m$ of degree at most $m$.
:::

::: proof
The key is a **shift rule**. For any differentiable $u$ and any (real or complex) $\alpha$, the product rule gives $D(e^{\alpha t}u) = e^{\alpha t}(D + \alpha)u$. Applying this twice, $D^2(e^{\alpha t}u) = e^{\alpha t}(D + \alpha)^2u$, and therefore

$$
P(D)\bigl[e^{\alpha t}u\bigr] = e^{\alpha t}\,P(D + \alpha)\,u .
$$ {#eq-shift}

Expand $P(r + \alpha) = P(\alpha) + P'(\alpha)\,r + a\,r^2$ by Taylor's formula. If $\alpha$ is a root of multiplicity $s$, the first $s$ coefficients vanish and $P(r + \alpha) = r^sQ(r)$ for a polynomial $Q$ with $Q(0) \neq 0$. By [[#eq-shift]], $y = e^{\alpha t}u$ solves $P(D)y = p_m e^{\alpha t}$ exactly when

$$
D^s\,Q(D)\,u = p_m .
$$

*Step 1: solve $Q(D)w = p_m$ with a polynomial $w$ of degree $m$.* For a polynomial $w = \sum_{j\le m}w_jt^j$, $Q(D)w = Q(0)w + (\text{terms involving derivatives of } w)$, and differentiation lowers degrees. So, in the basis $t^m, t^{m-1}, \dots, 1$, the map $w\mapsto Q(D)w$ on polynomials of degree $\le m$ is triangular with every diagonal entry equal to $Q(0)\neq 0$; it is invertible, and $w$ exists. Its leading coefficient is that of $p_m$ divided by $Q(0)$, so $\deg w = m$.

*Step 2: undo $D^s$.* Let $u$ be the $s$-fold antiderivative of $w$ with all constants of integration zero. Then $D^su = w$ and $u = t^s\,q(t)$ with $\deg q = m$. Hence $y_p = t^sq(t)e^{\alpha t}$ is a particular solution, proving part 1 (the steps work equally for complex $\alpha$ and complex coefficients).

For part 2, note that $g = \operatorname{Re}\bigl((p_m - i\tilde p_m)\,e^{\alpha t}\bigr)$. Part 1 with the complex polynomial $p_m - i\tilde p_m$ and complex $\alpha = \lambda + i\mu$ gives a complex solution $z = t^sq(t)e^{\alpha t}$. Since $P$ has real coefficients, $P(D)[\operatorname{Re}z] = \operatorname{Re}\,P(D)[z] = g$, and writing $q = Q_m + i R_m$ and $e^{\alpha t} = e^{\lambda t}(\cos\mu t + i\sin\mu t)$, the real part of $z$ has the stated form.
:::

In practice: write down the trial form, multiplied by $t^s$, substitute, and compare coefficients. The table summarises the cases for $ay'' + by' + cy = g(t)$.

| $g(t)$ | trial $y_p$ (before multiplying by $t^s$) | $s$ = multiplicity of … as a root of $P$ |
|---|---|---|
| $p_m(t)$ | $A_mt^m + \dots + A_0$ | $0$ |
| $p_m(t)e^{\alpha t}$ | $(A_mt^m + \dots + A_0)e^{\alpha t}$ | $\alpha$ |
| $p_m(t)e^{\lambda t}\cos\mu t$ or $\sin\mu t$ | $e^{\lambda t}\bigl((A_m t^m + \dots)\cos\mu t + (B_mt^m + \dots)\sin\mu t\bigr)$ | $\lambda + i\mu$ |

::: example Splitting the forcing {#ex-split}
Find the general solution of $y'' - 3y' - 4y = 3e^{2t} + 2\sin t$.
::: solution
The characteristic polynomial $P(r) = r^2 - 3r - 4 = (r-4)(r+1)$ gives $y_h = c_1e^{4t} + c_2e^{-t}$. By [[#thm-structure]] we treat the two forcing terms separately.

For $3e^{2t}$: $2$ is not a root, so $s = 0$ and we try $Ae^{2t}$. Then $P(D)[Ae^{2t}] = P(2)Ae^{2t} = -6Ae^{2t}$, so $A = -\tfrac12$.

For $2\sin t$: $\pm i$ are not roots, so try $B\cos t + C\sin t$. Substituting,

$$
(-B - 3C - 4B)\cos t + (-C + 3B - 4C)\sin t = (-5B - 3C)\cos t + (3B - 5C)\sin t = 2\sin t .
$$

So $-5B - 3C = 0$ and $3B - 5C = 2$, giving $B = \tfrac{3}{17}$, $C = -\tfrac{5}{17}$. Altogether

$$
y = c_1e^{4t} + c_2e^{-t} - \tfrac12e^{2t} + \tfrac{3}{17}\cos t - \tfrac{5}{17}\sin t .
$$

Note that the trial for a sine forcing must include the cosine too: the derivative terms mix them.
:::
:::

::: example When the forcing solves the homogeneous equation {#ex-modification}
Find a particular solution of $y'' - 2y' + y = e^{t}$.
::: solution
$P(r) = (r - 1)^2$, so $\alpha = 1$ is a root of multiplicity $s = 2$. Both $e^t$ and $te^t$ solve the homogeneous equation, and trying $Ae^t$ or $Ate^t$ gives $0 = e^t$, which is impossible. By [[#thm-undetermined]] we try $y_p = At^2e^t$. The shift rule makes the computation painless: $P(D)[e^tu] = e^tP(D+1)u = e^tD^2u$, so with $u = At^2$ we need $D^2(At^2) = 2A = 1$. Hence

$$
y_p = \tfrac12\,t^2e^{t}.
$$
:::
:::

::: quiz
What is the correct trial form for a particular solution of $y'' - y = te^{t}$?
- [ ] $Ate^{t}$
- [ ] $(At + B)e^{t}$
- [x] $t(At + B)e^{t}$
- [ ] $t^2(At + B)e^{t}$
::: solution
The forcing is $p_1(t)e^{t}$ with a degree-one polynomial, and $\alpha = 1$ is a *simple* root of $P(r) = r^2 - 1$, so $s = 1$ and the trial is $t(At + B)e^t$. (Carrying it out gives $A = \tfrac14$, $B = -\tfrac14$.) The form $(At + B)e^t$ fails because its $Be^t$ part is annihilated by $P(D)$.
:::
:::

## Variation of parameters

Undetermined coefficients cannot handle $y'' + y = \sec t$, or any equation with variable coefficients. The general method replaces the constants in $y_h = c_1y_1 + c_2y_2$ by functions — we "vary the parameters" — and looks for

$$
y = u_1(t)\,y_1(t) + u_2(t)\,y_2(t).
$$

Two unknown functions give us the freedom to impose one extra condition, and we choose it to keep second derivatives of $u_1, u_2$ out of the calculation.

::: theorem Variation of parameters {#thm-vop}
Let $y_1, y_2$ be a fundamental set for $y'' + p(t)y' + q(t)y = 0$ on $I$, with Wronskian $W = y_1y_2' - y_1'y_2$, and let $g$ be continuous on $I$. Then

$$
y_p(t) = -y_1(t)\int\frac{y_2(t)\,g(t)}{W(t)}\,dt + y_2(t)\int\frac{y_1(t)\,g(t)}{W(t)}\,dt
$$ {#eq-vop}

is a particular solution of $y'' + p(t)y' + q(t)y = g(t)$ on $I$.
:::

::: proof
Since $W$ never vanishes on $I$ ([[ode/second-order-linear#thm-abel]]), the functions $u_1' = -y_2g/W$ and $u_2' = y_1g/W$ are continuous, so $u_1$, $u_2$ (any antiderivatives) exist and $y_p = u_1y_1 + u_2y_2$ is [[#eq-vop]]. By construction $(u_1', u_2')$ solves the linear system

$$
\begin{aligned}
u_1'y_1 + u_2'y_2 &= 0, \\
u_1'y_1' + u_2'y_2' &= g,
\end{aligned}
$$

as you can check by substituting (or derive by Cramer's rule, the determinant being $W$). Now differentiate $y_p$. By the first equation,

$$
y_p' = u_1y_1' + u_2y_2' + \underbrace{u_1'y_1 + u_2'y_2}_{=\,0} = u_1y_1' + u_2y_2',
$$

and differentiating again, $y_p'' = u_1y_1'' + u_2y_2'' + u_1'y_1' + u_2'y_2'$. Therefore

$$
L[y_p] = u_1\bigl(y_1'' + py_1' + qy_1\bigr) + u_2\bigl(y_2'' + py_2' + qy_2\bigr) + u_1'y_1' + u_2'y_2' = 0 + 0 + g,
$$

using the second equation.
:::

::: warning Use the standard form
Formula [[#eq-vop]] is for the equation with leading coefficient $1$. For $t^2y'' - 2ty' + 2y = t^3$ the forcing in the formula is $g(t) = t^3/t^2 = t$, not $t^3$. Forgetting to divide is the most common error with this method.
:::

::: example A forcing term outside the table {#ex-sec}
Solve $y'' + y = \sec t$ on $\left(-\frac\pi2, \frac\pi2\right)$.
::: solution
Take $y_1 = \cos t$, $y_2 = \sin t$, with $W = \cos^2t + \sin^2t = 1$. Then

$$
u_1 = -\int\sin t\sec t\,dt = -\int\tan t\,dt = \ln(\cos t), \qquad u_2 = \int\cos t\sec t\,dt = t,
$$

where $\cos t > 0$ on the interval. Hence $y_p = \cos t\,\ln(\cos t) + t\sin t$ and the general solution is

$$
y = c_1\cos t + c_2\sin t + \cos t\,\ln(\cos t) + t\sin t .
$$

The interval matters: $\sec t$ is discontinuous at $\pm\frac\pi2$, and there the particular solution has a logarithmic singularity.
:::
:::

::: example Variable coefficients {#ex-vop-euler}
Given that $y_1 = t$ and $y_2 = t^2$ solve $t^2y'' - 2ty' + 2y = 0$, solve $t^2y'' - 2ty' + 2y = t^3$ on $t > 0$.
::: solution
In standard form the forcing is $g = t$. The Wronskian is $W = t\cdot 2t - 1\cdot t^2 = t^2$. Then

$$
u_1 = -\int\frac{t^2\cdot t}{t^2}\,dt = -\frac{t^2}{2}, \qquad u_2 = \int\frac{t\cdot t}{t^2}\,dt = t,
$$

so $y_p = -\frac{t^2}{2}\cdot t + t\cdot t^2 = \frac{t^3}{2}$. Check: $t^2(3t) - 2t\bigl(\frac32t^2\bigr) + 2\cdot\frac{t^3}{2} = 3t^3 - 3t^3 + t^3 = t^3$. The general solution is $y = c_1t + c_2t^2 + \frac{t^3}{2}$.
:::
:::

::: quiz
You want to apply [[#eq-vop]] to $t^2y'' - 2ty' + 2y = t^3\ln t$ on $t > 0$, using $y_1 = t$, $y_2 = t^2$. Which function $g$ goes into the formula?
- [ ] $g(t) = t^3\ln t$
- [x] $g(t) = t\ln t$
- [ ] $g(t) = \ln t$
- [ ] $g(t) = t^3\ln t/W(t)$
::: solution
The formula is derived for the standard form $y'' + py' + qy = g$, so divide the equation by $t^2$: $g(t) = t\ln t$. (The Wronskian $W = t^2$ then appears separately in the formula.)
:::
:::

Choosing definite integrals in [[#eq-vop]] gives an especially illuminating form of the answer.

::: corollary The response as an integral of the forcing {#cor-green}
Under the hypotheses of [[#thm-vop]], for $t_0\in I$ the solution of $L[y] = g$ with $y(t_0) = y'(t_0) = 0$ is

$$
y(t) = \int_{t_0}^{t} G(t,s)\,g(s)\,ds, \qquad G(t,s) = \frac{y_1(s)\,y_2(t) - y_1(t)\,y_2(s)}{W(s)} .
$$ {#eq-green}

For constant coefficients, $G(t,s) = h(t - s)$, where $h$ is the solution of the homogeneous equation with $h(0) = 0$, $h'(0) = 1$.
:::

::: proof
Taking the antiderivatives in [[#eq-vop]] to be $\int_{t_0}^t$ gives exactly [[#eq-green]], which is therefore a solution. Clearly $y(t_0) = 0$, and from the proof of [[#thm-vop]], $y' = u_1y_1' + u_2y_2'$ with $u_1(t_0) = u_2(t_0) = 0$, so $y'(t_0) = 0$.

For fixed $s$, $t \mapsto G(t,s)$ is a combination of $y_1, y_2$, hence solves the homogeneous equation, and $G(s,s) = 0$, $\partial_tG(s,s) = \bigl(y_1(s)y_2'(s) - y_1'(s)y_2(s)\bigr)/W(s) = 1$. With constant coefficients, $t\mapsto h(t - s)$ also solves the homogeneous equation (time-translation invariance) with the same values at $t = s$, so $G(t,s) = h(t-s)$ by uniqueness.
:::

::: intuition Adding up kicks
Formula [[#eq-green]] has a physical reading. Chop the forcing into short kicks: during $[s, s + \Delta s]$ the force delivers an impulse $g(s)\Delta s$, which sets an initially resting system moving with the velocity $g(s)\Delta s$. The response to a unit velocity kick at time $s$ is $G(t,s)$, so by superposition the total response is the sum $\sum G(t,s)g(s)\Delta s$, which becomes the integral. The kernel $G$ is the **Green's function** of the problem; for constant coefficients, $h$ is the **impulse response**. This viewpoint reappears with the Dirac delta and convolution in [[ode/laplace-transform]].
:::

## Undamped forcing: beats and resonance

Consider an undamped spring driven by a periodic force, starting from rest:

$$
x'' + \omega_0^2\,x = F_0\cos\omega t, \qquad x(0) = x'(0) = 0,
$$

where $\omega_0 = \sqrt{k/m}$ is the natural frequency and $F_0$ is the force per unit mass.

**Off resonance, $\omega \neq \omega_0$.** Since $i\omega$ is not a characteristic root, the trial $A\cos\omega t$ works: $(\omega_0^2 - \omega^2)A = F_0$. Fitting the initial conditions to $x = A\cos\omega t + c_1\cos\omega_0t + c_2\sin\omega_0t$ gives $c_2 = 0$, $c_1 = -A$, so

$$
x(t) = \frac{F_0}{\omega_0^2 - \omega^2}\bigl(\cos\omega t - \cos\omega_0t\bigr) = \frac{2F_0}{\omega_0^2 - \omega^2}\,\sin\frac{(\omega_0 - \omega)t}{2}\,\sin\frac{(\omega_0 + \omega)t}{2},
$$ {#eq-beats}

by the identity $\cos A - \cos B = 2\sin\frac{B - A}{2}\sin\frac{A + B}{2}$. When $\omega$ is close to $\omega_0$, this is a fast oscillation at the mean frequency $\frac{\omega_0 + \omega}{2}$ inside a slowly varying envelope $\pm\frac{2F_0}{\lvert\omega_0^2 - \omega^2\rvert}\bigl\lvert\sin\frac{(\omega_0-\omega)t}{2}\bigr\rvert$. The amplitude swells and fades periodically: these are **beats**, familiar to anyone who has tuned a guitar string against a reference note.

::: example Beats {#ex-beats}
Solve $x'' + 100x = 19\cos 9t$, $x(0) = x'(0) = 0$, and describe the motion.
::: solution
Here $\omega_0 = 10$, $\omega = 9$ and $\frac{F_0}{\omega_0^2 - \omega^2} = \frac{19}{19} = 1$, so by [[#eq-beats]]

$$
x(t) = \cos 9t - \cos 10t = 2\sin\frac t2\,\sin\frac{19t}{2}.
$$

The mass oscillates with angular frequency $9.5$ inside the envelope $\pm2\lvert\sin(t/2)\rvert$, which vanishes at $t = 0, 2\pi, 4\pi, \dots$ and reaches its maximum $2$ halfway between. Energy flows into the spring while the force is roughly in step with the motion and back out when it drifts out of step; the beat period is $2\pi/(\omega_0 - \omega) = 2\pi$.
:::
:::

**At resonance, $\omega = \omega_0$.** Now $\pm i\omega_0$ are simple characteristic roots, so by [[#thm-undetermined]] the trial needs the extra factor $t$: $x_p = t(A\cos\omega_0t + B\sin\omega_0t)$. Substituting gives $A = 0$, $B = \frac{F_0}{2\omega_0}$, and with the initial conditions

$$
x(t) = \frac{F_0}{2\omega_0}\,t\sin\omega_0t .
$$

The amplitude grows **linearly without bound**. This is the limit of [[#eq-beats]] as $\omega\to\omega_0$: the beat period becomes infinite, and the envelope never turns round. Of course no real spring survives this — either it breaks, or the linear model ceases to apply, or (as always in practice) damping intervenes.

::: widget plot
f: if(abs(w - 3) < 0.001, x*sin(3*x)/6, (cos(w*x) - cos(3*x))/(9 - w^2))
x: 0, 60
y: -10, 10
sliders: w=2.8:2:4:0.02
labels: x(t)
caption: The response of $x'' + 9x = \cos\omega t$ from rest (natural frequency $\omega_0 = 3$; horizontal axis $t$). Slide $\omega$ towards $3$: the beats become slower and taller, and at exactly $\omega = 3$ the envelope opens into the straight lines $\pm t/6$ of pure resonance. Move $\omega$ far from $3$ and the response is small and only mildly modulated.
:::

## Damped forcing: transients and the steady state

With damping, the story changes completely. The homogeneous solutions now die away, so in the long run the system forgets its initial state and follows the forcing.

::: proposition Transients decay {#prop-transient}
If $m, c, k > 0$ and $F$ is continuous, any two solutions $x, \tilde x$ of $mx'' + cx' + kx = F(t)$ satisfy $x(t) - \tilde x(t) \to 0$ as $t\to\infty$, exponentially fast.
:::

::: proof
The difference solves the homogeneous equation $mx'' + cx' + kx = 0$. As shown in [[ode/second-order-linear]], both characteristic roots of $mr^2 + cr + k$ have negative real part when $m, c, k > 0$, so every homogeneous solution is a combination of terms $e^{rt}$, $te^{rt}$ or $e^{\lambda t}\cos\mu t$, $e^{\lambda t}\sin\mu t$ with $\operatorname{Re}r < 0$, $\lambda < 0$, all of which tend to $0$ exponentially.
:::

So for periodic forcing $F_0\cos\omega t$ every solution approaches one special solution, the **steady state**, and the homogeneous part is the **transient**.

::: theorem Steady-state response {#thm-steady}
Let $m, c, k > 0$. The equation $mx'' + cx' + kx = F_0\cos\omega t$ has exactly one periodic solution,

$$
x_{\mathrm{ss}}(t) = A(\omega)\cos(\omega t - \delta), \qquad A(\omega) = \frac{F_0}{\sqrt{(k - m\omega^2)^2 + c^2\omega^2}}, \qquad \tan\delta = \frac{c\,\omega}{k - m\omega^2},
$$ {#eq-steady}

with phase lag $\delta \in (0, \pi)$, and every solution converges to it as $t\to\infty$.
:::

::: proof
We use complex exponentials. Since $F_0\cos\omega t = \operatorname{Re}(F_0e^{i\omega t})$ and the equation has real coefficients, it suffices to find a complex solution $z = Ze^{i\omega t}$ of $mz'' + cz' + kz = F_0e^{i\omega t}$ and take its real part. Substituting,

$$
\bigl(k - m\omega^2 + ic\omega\bigr)Z = F_0 .
$$

The factor in brackets is non-zero because its imaginary part $c\omega \ne 0$ (for $\omega \neq 0$; for $\omega = 0$ it is $k \neq 0$). So $Z = F_0/(k - m\omega^2 + ic\omega)$, with modulus $\lvert Z\rvert = A(\omega)$ and argument $-\delta$, where $\delta$ is the argument of $k - m\omega^2 + ic\omega$; this lies in $(0,\pi)$ since the imaginary part is positive. Then $\operatorname{Re}(Ze^{i\omega t}) = A(\omega)\cos(\omega t - \delta)$ is a periodic solution. Every solution converges to it by [[#prop-transient]]. If there were two periodic solutions, their difference would be a periodic solution of the homogeneous equation that tends to $0$, hence identically zero.
:::

::: remark Complexification
The proof of [[#thm-steady]] shows a technique worth adopting as a habit: to find the response to $\cos\omega t$, solve with $e^{i\omega t}$ instead and take the real part at the end. Differentiation becomes multiplication by $i\omega$, so a linear ODE with constant coefficients becomes the algebraic equation $P(i\omega)Z = F_0$. Electrical engineers write $Z$ as a **phasor** and $P(i\omega)$ as an **impedance**; the same idea underlies the Laplace and Fourier transforms of [[ode/laplace-transform]] and [[pde/fourier-transform]].
:::

The function $A(\omega)/F_0$ is the **amplitude response** (or gain) of the system. At $\omega = 0$ it equals $1/k$, the static deflection; as $\omega\to\infty$ it decays like $1/(m\omega^2)$, because the mass cannot follow a rapidly oscillating force. In between it may have a peak.

::: corollary Practical resonance {#cor-practical}
If $c^2 < 2mk$, the amplitude $A(\omega)$ is largest at the **resonant frequency**

$$
\omega_r = \sqrt{\frac{k}{m} - \frac{c^2}{2m^2}} \;<\; \omega_0, \qquad\text{with}\qquad A(\omega_r) = \frac{F_0}{c\sqrt{\dfrac km - \dfrac{c^2}{4m^2}}} .
$$

If $c^2 \ge 2mk$, $A(\omega)$ decreases for all $\omega > 0$ and there is no resonance peak.
:::

::: proof
$A$ is largest where $f(u) = (k - mu)^2 + c^2u$ is smallest, with $u = \omega^2 \ge 0$. Now $f'(u) = -2m(k - mu) + c^2$ vanishes at $u^* = \frac km - \frac{c^2}{2m^2}$, and $f'' = 2m^2 > 0$, so $f$ is decreasing for $u < u^*$ and increasing for $u > u^*$. If $u^* > 0$, i.e. $c^2 < 2mk$, the minimum over $u \ge 0$ is at $u^*$, where $k - mu^* = \frac{c^2}{2m}$ and

$$
f(u^*) = \frac{c^4}{4m^2} + c^2\left(\frac km - \frac{c^2}{2m^2}\right) = c^2\left(\frac km - \frac{c^2}{4m^2}\right),
$$

which gives the stated maximum. If $u^* \le 0$, $f$ is increasing on $u > 0$ and $A$ is decreasing.
:::

For light damping, $\omega_r \approx \omega_0$ and the peak height is about $F_0/(c\,\omega_0)$: halving the damping doubles the peak response. The phase lag $\delta$ passes through $\frac\pi2$ at $\omega = \omega_0$: at resonance the displacement lags the force by a quarter cycle, so the force is in phase with the *velocity* and does the maximum work.

::: example A steady state {#ex-steady}
Find the steady-state solution of $x'' + 2x' + 5x = 10\cos t$ and the general solution.
::: solution
The homogeneous solutions are $e^{-t}(c_1\cos2t + c_2\sin2t)$ (roots $-1\pm2i$), the transient. For the steady state try $A\cos t + B\sin t$:

$$
(-A + 2B + 5A)\cos t + (-B - 2A + 5B)\sin t = 10\cos t \quad\Longrightarrow\quad 4A + 2B = 10,\quad -2A + 4B = 0,
$$

so $A = 2$, $B = 1$, and $x_{\mathrm{ss}} = 2\cos t + \sin t = \sqrt5\cos(t - \delta)$ with $\tan\delta = \frac12$. This agrees with [[#eq-steady]]: $A(1) = 10/\sqrt{(5-1)^2 + 2^2} = 10/\sqrt{20} = \sqrt5$ and $\tan\delta = \frac{2\cdot1}{5 - 1} = \frac12$. The general solution is

$$
x = e^{-t}(c_1\cos 2t + c_2\sin 2t) + 2\cos t + \sin t,
$$

and after a few time units only the steady state is visible, whatever the initial conditions.
:::
:::

::: widget plot
f: 1/sqrt((4 - x^2)^2 + (c*x)^2)
x: 0, 4
y: 0, 5.5
sliders: c=0.5:0.1:4:0.05
labels: A(\omega)
vlines: 2
caption: The amplitude response $A(\omega)$ of $x'' + cx' + 4x = \cos\omega t$ (horizontal axis $\omega$; the dashed line is the natural frequency $\omega_0 = 2$). Decrease $c$: the peak grows like $1/c$ and moves towards $\omega_0$. Increase $c$ past $\sqrt{8}\approx 2.83$ (that is, $c^2 = 2mk$) and the peak disappears altogether.
:::

::: widget oscillator
m: 1
c: 0.3
k: 4
F: 1
omega: 1.9
x0: 0
v0: 0
caption: A damped spring driven by $F_0\cos\omega t$. Watch the transient die out and the motion settle into the steady state at the driving frequency. Move $\omega$ through the natural frequency $2$ and compare the amplitude with the resonance curve; note how the phase lag between force and displacement jumps from nearly $0$ to nearly $\pi$.
:::

::: quiz
For $x'' + 0.4x' + 4x = \cos\omega t$, which driving frequency gives the largest steady-state amplitude?
- [ ] $\omega = 0$
- [ ] Exactly $\omega = 2$, the natural frequency
- [x] Slightly less than $2$
- [ ] Slightly more than $2$
::: solution
By [[#cor-practical]], $\omega_r = \sqrt{4 - 0.4^2/2} = \sqrt{3.92}\approx 1.98$, slightly below the natural frequency $\omega_0 = 2$; damping always shifts the peak downwards. (Here $c^2 = 0.16 < 2mk = 8$, so there is a peak.)
:::
:::

::: application Resonance in the real world
Resonance is put to use in radio receivers, where tuning adjusts the natural frequency of an electrical circuit $Lq'' + Rq' + q/C = E(t)$ so that one broadcast frequency is amplified above all others; a small resistance $R$ gives a sharp peak and good selectivity. It is also a hazard. In 1831 the Broughton suspension bridge near Manchester collapsed while soldiers marched across it in step, and armies have since ordered troops to break step on bridges. When London's Millennium Bridge opened in June 2000 it swayed sideways so strongly that it was closed after two days: pedestrians unconsciously synchronised their steps with the sway, feeding energy into it. It reopened in 2002 after dampers had been fitted — exactly the remedy suggested by [[#cor-practical]].
:::

::: warning Not every collapse is resonance
The 1940 collapse of the Tacoma Narrows Bridge is often presented as a textbook case of resonance. It was not simple forced resonance: the wind was steady, not periodic. Engineers attribute the failure to **aeroelastic flutter**, a self-excited oscillation in which the bridge's own motion altered the aerodynamic forces so as to feed energy into it — effectively a negative damping coefficient. Models of that kind are nonlinear and belong to [[ode/nonlinear-systems]].
:::

::: history
The method of variation of parameters grew out of celestial mechanics, where the "parameters" were the orbital elements of a planet, slowly changed by the pull of the other planets. Euler used the idea in the late 1740s in his work on the mutual perturbations of Jupiter and Saturn, and Lagrange, who first used it in 1766, developed it into a general method in memoirs of 1778–1783 and gave it its definitive form in 1808–1810. The impulse-response formula of [[#cor-green]] is often attributed to Jean-Marie Duhamel, who used the analogous superposition principle for the heat equation in the 1830s, and the general idea of a kernel that represents the response to a point source goes back to George Green's essay of 1828.
:::

## Where this leads

The Laplace transform of [[ode/laplace-transform]] gives a third route to particular solutions that handles discontinuous and impulsive forcing gracefully, and turns [[#cor-green]] into the convolution theorem. For systems of equations, variation of parameters becomes the formula $\mathbf{x}(t) = e^{At}\mathbf{x}_0 + \int_0^te^{A(t-s)}\mathbf{f}(s)\,ds$ of [[ode/linear-systems]]. Periodic forcing that is not a pure cosine is decomposed into its harmonics by [[pde/fourier-series]], and by superposition the response is the sum of the responses to each harmonic — each amplified according to the response curve.

::: summary
- The general solution of $L[y] = g$ is $y_p + c_1y_1 + c_2y_2$; forcing terms can be split and handled separately; fit initial conditions to the full solution ([[#thm-structure]]).
- **Undetermined coefficients**: for $p_m(t)e^{\alpha t}$ (or with $\cos\mu t$, $\sin\mu t$) try the same form multiplied by $t^s$, where $s$ is the multiplicity of $\alpha$ (or $\lambda + i\mu$) as a characteristic root ([[#thm-undetermined]]).
- **Variation of parameters** works for any continuous forcing and variable coefficients: $y_p = -y_1\int y_2g/W + y_2\int y_1g/W$, with $g$ from the standard form ([[#thm-vop]]).
- The response from rest is $\int_{t_0}^tG(t,s)g(s)\,ds$; for constant coefficients $G(t,s) = h(t-s)$ with $h$ the impulse response ([[#cor-green]]).
- Undamped forcing near the natural frequency produces beats; at the natural frequency, resonance with linearly growing amplitude.
- With damping, transients decay and every solution approaches the steady state $A(\omega)\cos(\omega t - \delta)$; the amplitude peaks at $\omega_r = \sqrt{k/m - c^2/(2m^2)}$ when $c^2 < 2mk$ ([[#thm-steady]], [[#cor-practical]]).
:::

## Exercises

::: exercise An exponential forcing {level=1 check="2/3"}
Find a particular solution of $y'' + 3y' + 2y = 4e^{t}$ of the form $Ae^t$. What is $A$?
::: solution
$P(1) = 1 + 3 + 2 = 6 \ne 0$, so $s = 0$ and $P(D)[Ae^t] = 6Ae^t = 4e^t$ gives $A = \frac23$.
:::
:::

::: exercise An initial value problem {level=1 check="2*pi"}
Solve $y'' + y = 2t$, $y(0) = 0$, $y'(0) = 0$, and evaluate $y(\pi)$.
::: solution
Try $y_p = At + B$: $At + B = 2t$, so $y_p = 2t$. Then $y = 2t + c_1\cos t + c_2\sin t$, with $y(0) = c_1 = 0$ and $y'(0) = 2 + c_2 = 0$. So $y = 2t - 2\sin t$ and $y(\pi) = 2\pi$.
:::
:::

::: exercise Choosing trial forms {level=1}
Write down (without computing the coefficients) the form of a particular solution of $y'' - 4y' + 4y = te^{2t} + \cos t$.
::: solution
$P(r) = (r-2)^2$. For $te^{2t}$: $\alpha = 2$ has multiplicity $s = 2$ and the polynomial has degree $1$, so the term is $t^2(At + B)e^{2t}$. For $\cos t$: $\pm i$ are not roots, so $C\cos t + D\sin t$. Altogether

$$
y_p = t^2(At + B)e^{2t} + C\cos t + D\sin t .
$$

(Carrying out the computation gives $A = \frac16$, $B = 0$, $C = \frac{3}{25}$, $D = -\frac{4}{25}$.)
:::
:::

::: exercise Variation of parameters {level=2}
Find the general solution of $y'' + y = \tan t$ on $\left(-\frac\pi2,\frac\pi2\right)$.
::: solution
With $y_1 = \cos t$, $y_2 = \sin t$, $W = 1$:

$$
u_1 = -\int\sin t\tan t\,dt = -\int\frac{1 - \cos^2t}{\cos t}\,dt = -\ln(\sec t + \tan t) + \sin t, \qquad u_2 = \int\cos t\tan t\,dt = -\cos t .
$$

Then $y_p = \cos t\bigl(\sin t - \ln(\sec t + \tan t)\bigr) - \sin t\cos t = -\cos t\,\ln(\sec t + \tan t)$, and

$$
y = c_1\cos t + c_2\sin t - \cos t\,\ln(\sec t + \tan t).
$$
:::
:::

::: exercise Resonance from rest {level=2 check="pi/8"}
Solve $x'' + 16x = 8\cos 4t$, $x(0) = x'(0) = 0$, and evaluate $x(\pi/8)$.
::: solution
At resonance ($\omega = \omega_0 = 4$), $x = \frac{F_0}{2\omega_0}t\sin\omega_0t = \frac{8}{8}t\sin4t = t\sin 4t$. (Directly: the trial $t(A\cos4t + B\sin4t)$ gives $A = 0$, $B = 1$, and the initial conditions force $c_1 = c_2 = 0$.) Then $x(\pi/8) = \frac\pi8\sin\frac\pi2 = \frac\pi8$.
:::
:::

::: exercise The resonant frequency {level=2 check="sqrt(7/2)"}
For $x'' + x' + 4x = \cos\omega t$, find the driving frequency $\omega_r$ that maximises the steady-state amplitude, and the maximal amplitude.
::: solution
Here $m = 1$, $c = 1$, $k = 4$, and $c^2 = 1 < 8 = 2mk$. By [[#cor-practical]], $\omega_r = \sqrt{4 - \frac12} = \sqrt{7/2}\approx 1.871$, and $A(\omega_r) = \dfrac{1}{1\cdot\sqrt{4 - \frac14}} = \dfrac{2}{\sqrt{15}}\approx 0.516$.
:::
:::

::: exercise The loudest beat {level=2 check="2"}
Solve $x'' + 25x = 9\cos 4t$, $x(0) = x'(0) = 0$. What is the maximum displacement, and when is it first reached?
::: solution
By [[#eq-beats]] with $\omega_0 = 5$, $\omega = 4$, $F_0/(\omega_0^2 - \omega^2) = 9/9 = 1$: $x = \cos4t - \cos5t = 2\sin\frac t2\sin\frac{9t}{2}$. Certainly $\lvert x\rvert\le 2$, and $x = 2$ requires $\cos 4t = 1$ and $\cos5t = -1$, i.e. $4t \in 2\pi\Z$ and $5t \in \pi + 2\pi\Z$. The smallest positive such $t$ is $t = \pi$ ($4\pi$ and $5\pi$). So the maximum displacement is $2$, first reached at $t = \pi$, in the middle of the first beat.
:::
:::

::: exercise Duhamel's formula {level=3}
Let $f$ be continuous on $[0,\infty)$ and $\omega > 0$. Prove directly, by differentiating under the integral sign, that

$$
y(t) = \frac1\omega\int_0^t\sin\bigl(\omega(t - s)\bigr)f(s)\,ds
$$

solves $y'' + \omega^2y = f(t)$, $y(0) = y'(0) = 0$. Which function is the impulse response here?
::: hint
Leibniz's rule: $\frac{d}{dt}\int_0^tK(t,s)\,ds = K(t,t) + \int_0^t\partial_tK(t,s)\,ds$ when $K$ and $\partial_t K$ are continuous.
:::
::: solution
Clearly $y(0) = 0$. With $K(t,s) = \frac1\omega\sin(\omega(t-s))f(s)$ we have $K(t,t) = 0$, so

$$
y'(t) = \int_0^t\cos\bigl(\omega(t-s)\bigr)f(s)\,ds, \qquad y'(0) = 0.
$$

Differentiating again, now with $K(t,t) = \cos(0)f(t) = f(t)$:

$$
y''(t) = f(t) - \omega\int_0^t\sin\bigl(\omega(t-s)\bigr)f(s)\,ds = f(t) - \omega^2y(t).
$$

So $y'' + \omega^2y = f$. The impulse response is $h(t) = \frac{\sin\omega t}{\omega}$, the solution of $h'' + \omega^2h = 0$ with $h(0) = 0$, $h'(0) = 1$, in agreement with [[#cor-green]].
:::
:::

::: exercise Bounded input, bounded output {level=3}
Let $m, c, k > 0$ and let $F$ be continuous and bounded on $[0,\infty)$, say $\lvert F\rvert \le B$. Prove that every solution of $mx'' + cx' + kx = F(t)$ is bounded on $[0,\infty)$.
::: hint
Use [[#cor-green]] with $t_0 = 0$, and show that the impulse response satisfies $\lvert h(t)\rvert \le Ce^{-\alpha t}$ for some $C, \alpha > 0$.
:::
::: solution
Divide by $m$ to get standard form with forcing $F/m$. Every solution is $x = x_h + x_0$, where $x_h$ solves the homogeneous equation and $x_0(t) = \int_0^t h(t - s)\frac{F(s)}{m}\,ds$ is the solution with zero initial data ([[#cor-green]]). The homogeneous solutions, including $x_h$ and $h$, are combinations of $e^{r t}$, $te^{rt}$ or $e^{\lambda t}\cos\mu t$, $e^{\lambda t}\sin\mu t$ with negative real parts. Choose $\alpha > 0$ smaller than the absolute values of these real parts; since $te^{rt}e^{\alpha t}\to 0$ etc., there is $C$ with $\lvert h(\tau)\rvert\le Ce^{-\alpha\tau}$ for $\tau\ge0$, and $x_h$ is bounded. Then

$$
\lvert x_0(t)\rvert \le \frac{B}{m}\int_0^tCe^{-\alpha(t-s)}\,ds \le \frac{BC}{m\alpha},
$$

so $x = x_h + x_0$ is bounded. (Engineers call this BIBO stability. Without damping it fails: resonance is a bounded input with an unbounded output.)
:::
:::

::: exercise Resonance is unavoidable {level=3}
Prove that **every** solution of $x'' + \omega_0^2x = \cos\omega_0t$ is unbounded on $[0,\infty)$, whatever the initial conditions.
::: solution
Every solution has the form $x = c_1\cos\omega_0t + c_2\sin\omega_0t + \frac{t\sin\omega_0t}{2\omega_0}$ by [[#thm-structure]] and the resonance computation. The homogeneous part is bounded by $\lvert c_1\rvert + \lvert c_2\rvert$. At the times $t_n = \frac{(4n+1)\pi}{2\omega_0}$, $\sin\omega_0t_n = 1$, so

$$
x(t_n) \ge \frac{t_n}{2\omega_0} - \lvert c_1\rvert - \lvert c_2\rvert \longrightarrow\infty .
$$

Hence $x$ is unbounded, for every choice of $c_1, c_2$: no initial condition can cancel the growing term.
:::
:::
