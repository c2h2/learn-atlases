The oscillator of [[oscillations/simple-harmonic]] repeats forever. A real mass on a spring does not. Each swing is a little smaller than the one before, and eventually the mass sits at equilibrium. Something in the mechanism is doing negative work. If that something is a force proportional to the velocity and opposed to it, the equation stays linear, and it can be solved completely. The solutions fall into three regimes: a decaying oscillation, a borderline return with no oscillation, and a slow creep with no oscillation. Which regime you are in is a comparison between two rates, one set by the drag and one set by the spring.

The ideal harmonic motion is the special case in which the drag coefficient is zero. Everything proved here has to reduce to that case when the drag is switched off, and the energy identity has to reduce to the constant $E$ of that chapter. With the drag present, $E$ falls. The question is how fast, and what "fast" means when one is comparing a ringing decay with a creep.

## Linear drag

Take the spring of [[oscillations/simple-harmonic]] and add a force $-bv$, with $b \ge 0$. The sign is part of the model: the force opposes the velocity, so the power $-bv\cdot v = -bv^{2}$ is never positive. Newton's second law along the line, for a particle of constant mass $m$, reads

$$
m\deriv{^2 x}{t^2} = -kx - b\deriv{x}{t},
$$

provided the positive sense for $x$ is the same in every term. Rearrangement gives the standard form.

::: definition Damped harmonic oscillator {#def-damping}
The **damped harmonic oscillator** with mass $m > 0$, damping coefficient $b \ge 0$ and stiffness $k > 0$ is the equation

$$
m\deriv{^2 x}{t^2} + b\deriv{x}{t} + kx = 0.
$$ {#eq-damped}

The **natural angular frequency** and the **damping constant** are

$$
\omega_{0} = \sqrt{\frac{k}{m}}, \qquad \gamma = \frac{b}{2m}.
$$ {#eq-rates}

Both have the dimension of inverse time. Dividing [[#eq-damped]] by $m$ puts the equation in the equivalent form

$$
\deriv{^2 x}{t^2} + 2\gamma\deriv{x}{t} + \omega_{0}^{2} x = 0.
$$ {#eq-standard}
:::

The factor of two in the definition of $\gamma$ is a convenience, not a second physical constant. It makes the characteristic roots $-\gamma \pm \cdots$ rather than $-b/(2m) \pm \cdots$, and it will make the amplitude decay as $e^{-\gamma t}$. Some authors call $b$ the damping coefficient and reserve $\gamma$ for $b/(2m)$; that is the convention used here. In the interactive figure later, the symbol on the damping slider is $c$, and it is this $b$, not $\gamma$.

The coefficient $b$ is not a universal property of matter in the way $m$ and $k$ are. It is the linear term in a model of resistance. At very low speed a sphere in a viscous fluid really does feel a drag proportional to speed; that is a nineteenth-century theorem, recorded in the historical note below, and it is limited to low Reynolds number. A large, fast bob is closer to a quadratic drag, and [[#eq-damped]] is then the wrong equation. Within the linear model, though, the mathematics is complete, and the three regimes below are regimes of this equation. They are not three experimental species discovered separately.

::: remark What $b = 0$ returns
If $b = 0$, then $\gamma = 0$ and [[#eq-standard]] is $x'' + \omega_{0}^{2} x = 0$. That is simple harmonic motion with angular frequency $\omega_{0} = \sqrt{k/m}$, the spring result of [[oscillations/simple-harmonic]]. Every formula below must be checked against that limit before it is trusted.
:::

## The three regimes

Substitute the trial function $x = e^{rt}$ into [[#eq-standard]]. Every term acquires a factor $e^{rt}$, and what remains is the quadratic

$$
r^{2} + 2\gamma r + \omega_{0}^{2} = 0.
$$ {#eq-char}

The discriminant is $4\gamma^{2} - 4\omega_{0}^{2}$, so the sign of $\gamma^{2} - \omega_{0}^{2}$ decides whether the roots are complex, repeated, or real and distinct. That comparison is the whole classification.

::: theorem Three regimes {#thm-regimes}
Let $\omega_{0} > 0$ and $\gamma \ge 0$. Every solution of [[#eq-standard]] has one of the following forms.

If $\gamma < \omega_{0}$ (**underdamped**), set $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$. Then

$$
x(t) = e^{-\gamma t}\bigl(P\cos(\omega_{1} t) + Q\sin(\omega_{1} t)\bigr) = A e^{-\gamma t}\cos(\omega_{1} t - \varphi),
$$ {#eq-under}

with $A = \sqrt{P^{2} + Q^{2}}$, and with $\cos\varphi = P/A$, $\sin\varphi = Q/A$ whenever $A > 0$. The motion oscillates, and the oscillations decay.

If $\gamma = \omega_{0}$ (**critically damped**), then

$$
x(t) = (A + Bt)\, e^{-\omega_{0} t}.
$$ {#eq-critical}

If $\gamma > \omega_{0}$ (**overdamped**), the two roots

$$
r_{\pm} = -\gamma \pm \sqrt{\gamma^{2} - \omega_{0}^{2}}
$$ {#eq-roots}

are real and negative, and

$$
x(t) = C_{+} e^{r_{+} t} + C_{-} e^{r_{-} t}.
$$ {#eq-over}

In every regime the two free constants are fixed by $x(0)$ and $\deriv{x}{t}(0)$, and no other solution exists.
:::

::: proof
The trial $x = e^{rt}$ produces [[#eq-char]], whose roots are $r = -\gamma \pm \sqrt{\gamma^{2} - \omega_{0}^{2}}$.

Underdamped, $\gamma < \omega_{0}$. The roots are $-\gamma \pm i\omega_{1}$ with $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$. The real and imaginary parts of $e^{(-\gamma + i\omega_{1})t}$ are $e^{-\gamma t}\cos(\omega_{1} t)$ and $e^{-\gamma t}\sin(\omega_{1} t)$. Each satisfies the linear equation [[#eq-standard]], so the combination with coefficients $P$ and $Q$ does too. The cosine subtraction formula,

$$
A\cos(\omega_{1} t - \varphi) = A\cos\varphi\,\cos(\omega_{1} t) + A\sin\varphi\,\sin(\omega_{1} t),
$$

shows that the phase form is the same family, with $P = A\cos\varphi$ and $Q = A\sin\varphi$.

Critically damped, $\gamma = \omega_{0}$. There is a repeated root $r = -\omega_{0}$. The function $e^{-\omega_{0} t}$ is a solution. For the second solution set $x = (A + Bt)e^{-\omega_{0} t}$ and substitute into $x'' + 2\omega_{0} x' + \omega_{0}^{2} x = 0$. With $u = A + Bt$,

$$
x' = (B - \omega_{0} u)\, e^{-\omega_{0} t}, \qquad x'' = \bigl(\omega_{0}^{2} u - 2\omega_{0} B\bigr) e^{-\omega_{0} t}.
$$

The combination $x'' + 2\omega_{0} x' + \omega_{0}^{2} x$ has bracket

$$
\omega_{0}^{2} u - 2\omega_{0} B + 2\omega_{0}(B - \omega_{0} u) + \omega_{0}^{2} u = 0.
$$

So [[#eq-critical]] solves the equation. It contains two arbitrary constants.

Overdamped, $\gamma > \omega_{0}$. The roots [[#eq-roots]] are real. They are negative because $\sqrt{\gamma^{2} - \omega_{0}^{2}} < \gamma$, so both $r_{+}$ and $r_{-}$ lie on the negative axis, and $r_{-} < r_{+} < 0$. Each exponential $e^{r_{\pm} t}$ solves [[#eq-standard]], and so does [[#eq-over]].

It remains to match initial data and to exclude any further solution. Write $v = \deriv{x}{t}$.

In the underdamped form, $x(0) = P$ and $v(0) = -\gamma P + \omega_{1} Q$, so $P = x(0)$ and $Q = \bigl(v(0) + \gamma x(0)\bigr)/\omega_{1}$. In the critical form, $x(0) = A$ and $v(0) = B - \omega_{0} A$, so $A = x(0)$ and $B = v(0) + \omega_{0} x(0)$. In the overdamped form, $C_{+} + C_{-} = x(0)$ and $r_{+} C_{+} + r_{-} C_{-} = v(0)$. The determinant of that system is $r_{-} - r_{+} \ne 0$, so there is a unique pair $(C_{+}, C_{-})$.

Thus every set of initial data is attained by exactly one function in the family of its regime. Suppose $y$ were some other solution with the same initial data. The difference $z = y - x$ would solve [[#eq-standard]] with $z(0) = z'(0) = 0$. The mechanical energy

$$
E = \tfrac12 m \bigl(\deriv{z}{t}\bigr)^{2} + \tfrac12 k z^{2}
$$

then satisfies $\deriv{E}{t} = -b \bigl(\deriv{z}{t}\bigr)^{2} \le 0$, by the calculation in [[#prop-balance]] below, which uses only the differential equation. So $E$ is non-increasing. But $E(0) = 0$ and $E \ge 0$, hence $E(t) = 0$ for $t \ge 0$, hence $z = 0$. The family already written is the general solution.
:::

The underdamped formula is not a decoration of the overdamped one. If $\gamma > \omega_{0}$, the quantity $\omega_{0}^{2} - \gamma^{2}$ is negative, and $\cos$ of an imaginary argument is a hyperbolic cosine in disguise: feeding it into [[#eq-under]] without changing the formula produces the wrong algebraic object, or a complex expression that still has to be rearranged into [[#eq-over]]. Use [[#eq-under]] only when $\gamma < \omega_{0}$, [[#eq-critical]] only on the boundary, and [[#eq-over]] only when $\gamma > \omega_{0}$.

The critical case is the boundary $\gamma = \omega_{0}$, which is $b = 2m\omega_{0} = 2\sqrt{km}$. It is one curve in the space of coefficients, not a region. Any laboratory system described as critically damped is a system that has been adjusted close to that curve. The mathematical boundary itself is sharp.

A direct reading of the initial-value formulae is worth keeping:

$$
\begin{aligned}
P &= x(0), & Q &= \frac{v(0) + \gamma x(0)}{\omega_{1}}, \\
A &= x(0), & B &= v(0) + \omega_{0} x(0),
\end{aligned}
$$

in the underdamped and critical regimes respectively. Release from rest is $v(0) = 0$, so $Q = \gamma x(0)/\omega_{1}$ and $B = \omega_{0} x(0)$. The underdamped release is therefore not a pure cosine of $\omega_{1} t$ unless $\gamma = 0$. The exponential contributes to the velocity, and a sine term is required to cancel that contribution at $t = 0$. For light damping $\gamma \ll \omega_{1}$ the coefficient $Q$ is small and the pure cosine is a fair start. It is not exact.

::: example Moderate damping {#ex-moderate}
Take $m = 0.250\,\mathrm{kg}$, $k = 40\,\mathrm{N/m}$ and $b = 1.00\,\mathrm{N\,s/m}$, the spring of the undamped example with a damper attached. Classify the motion, compute $\gamma$, $\omega_{0}$, $\omega_{1}$ and the quality factor defined below, and write the solution for release from rest at $x(0) = 0.080\,\mathrm{m}$.
::: solution
[[#eq-rates]] gives

$$
\omega_{0} = \sqrt{\frac{40}{0.250}} = \sqrt{160} = 12.649\,\mathrm{rad/s}, \qquad \gamma = \frac{1.00}{2\times 0.250} = 2.00\,\mathrm{s^{-1}}.
$$

Since $\gamma < \omega_{0}$, the motion is underdamped, and

$$
\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}} = \sqrt{160 - 4} = \sqrt{156} = 12.490\,\mathrm{rad/s}.
$$

The values to quote are $\omega_{0} = 12.65\,\mathrm{rad/s}$ and $\omega_{1} = 12.49\,\mathrm{rad/s}$. The quality factor of [[#def-q]] is

$$
Q = \frac{\omega_{0} m}{b} = \frac{\sqrt{160}\times 0.250}{1.00} = 3.162,
$$

or $3.16$. This is not very light: $Q$ is a few units, not a large number, and $\omega_{1}$ is already visibly below $\omega_{0}$.

Release from rest uses $P = 0.080\,\mathrm{m}$ and $Q = \gamma P/\omega_{1} = 2.00\times 0.080/12.490 = 0.01281\,\mathrm{m}$. In the phase form, $A = \sqrt{P^{2} + Q^{2}} = 0.08102\,\mathrm{m}$ and

$$
\varphi = \arctan\!\left(\frac{Q}{P}\right) = \arctan(0.1601) = 0.1588\,\mathrm{rad} = 9.10^{\circ}.
$$

So

$$
x(t) = 0.08102\, e^{-2.00\, t}\cos(12.490\, t - 0.1588),
$$

in metres with $t$ in seconds. The phase is not zero. Setting $\varphi = 0$ and $A = 0.080\,\mathrm{m}$ would give $v(0) = -\gamma A \ne 0$, which is a different experiment, one that starts with a small negative velocity. The period of the oscillation, meaning the repeat time of the cosine, is

$$
T = \frac{2\pi}{\omega_{1}} = 0.503\,\mathrm{s},
$$

a little longer than the undamped period $0.497\,\mathrm{s}$. Successive turning points of the same sign stand in the ratio $e^{-\gamma T} = e^{-1.006} = 0.366$. After one cycle the displacement peaks are about a third of what they were; the energy, being quadratic, is down by the square of that factor. The approximation "fractional energy loss $\approx 2\pi/Q$" is useless here: $2\pi/Q = 1.99$, which cannot be a fraction of anything. Light-damping bookkeeping begins later, at a smaller $b$.
:::
:::

::: widget oscillator
m: 0.25
c: 1
k: 40
F: 0
x0: 0.08
v0: 0
caption: The slider c is the damping coefficient b of the text, not gamma. With c = 1, m = 0.25 and k = 40 the mass is underdamped: it still crosses the origin, and the peaks fall. Raise c through about 6.3 and the crossings stop. Raise it further and the return becomes slower, not quicker.
:::

The critical value on that slider is $b = 2m\omega_{0} = 2\sqrt{10} = 6.32\,\mathrm{N\,s/m}$, computed in the next example. The figure is the same integrator as in the undamped chapter. Only $c$ has changed.

::: example The critical damper {#ex-critical}
For the same mass and spring, $m = 0.250\,\mathrm{kg}$ and $k = 40\,\mathrm{N/m}$, find the damping coefficient that puts the system on the critical boundary. Write the motion for release from rest at $x(0) = 0.080\,\mathrm{m}$, and evaluate $x$ at $t = 0.200\,\mathrm{s}$.
::: solution
Critical damping is $\gamma = \omega_{0}$, so

$$
b_{c} = 2m\omega_{0} = 2\times 0.250\times\sqrt{160} = 2\sqrt{10} = 6.325\,\mathrm{N\,s/m},
$$

recorded as $6.32\,\mathrm{N\,s/m}$. [[#eq-critical]] with $v(0) = 0$ has $A = 0.080\,\mathrm{m}$ and $B = \omega_{0} A$, hence

$$
x(t) = 0.080\,(1 + \omega_{0} t)\,e^{-\omega_{0} t}, \qquad \omega_{0} = \sqrt{160}.
$$

At $t = 0.200\,\mathrm{s}$, $\omega_{0} t = 2.530$ and $e^{-\omega_{0} t} = 0.07967$, so

$$
x(0.200) = 0.080\times(1 + 2.530)\times 0.07967 = 0.0225\,\mathrm{m}.
$$

The factor $(1 + \omega_{0} t)$ grows, but only linearly, and the exponential wins: $x(t) \to 0$ as $t \to \infty$. For this particular release, $1 + \omega_{0} t > 0$ for all $t \ge 0$, so $x(t)$ never changes sign. The mass returns toward the origin without crossing it. That conclusion uses these initial data together with $\gamma = \omega_{0}$. It is not a claim that every critically damped motion refuses to cross the origin. A hard enough shove toward the origin, starting from a positive $x(0)$, does cross, and [[#eq-critical]] says so through the sign of $B$.
:::
:::

Heavier damping than this does not hurry the mass home. It leaves a slower root.

::: proposition The slow overdamped root {#prop-slow}
If $\gamma > \omega_{0}$, the decay constants $\lambda_{\pm} = -r_{\pm}$ are positive, and the slower one satisfies

$$
0 < \lambda_{+} = \gamma - \sqrt{\gamma^{2} - \omega_{0}^{2}} < \omega_{0}.
$$ {#eq-slow}

Equivalently, $\lambda_{+} = \omega_{0}^{2}\big/\bigl(\gamma + \sqrt{\gamma^{2} - \omega_{0}^{2}}\bigr)$.
:::

::: proof
The roots [[#eq-roots]] give $\lambda_{\pm} = \gamma \mp \sqrt{\gamma^{2} - \omega_{0}^{2}}$. The square root is positive and strictly smaller than $\gamma$, so both $\lambda_{\pm}$ are positive and $\lambda_{+} < \lambda_{-}$. Rationalise the slower one by multiplying numerator and denominator by the conjugate:

$$
\lambda_{+} = \frac{\bigl(\gamma - \sqrt{\gamma^{2} - \omega_{0}^{2}}\bigr)\bigl(\gamma + \sqrt{\gamma^{2} - \omega_{0}^{2}}\bigr)}{\gamma + \sqrt{\gamma^{2} - \omega_{0}^{2}}} = \frac{\omega_{0}^{2}}{\gamma + \sqrt{\gamma^{2} - \omega_{0}^{2}}}.
$$

The denominator is greater than $\gamma$, and $\gamma > \omega_{0}$, so the denominator is greater than $\omega_{0}$. Therefore $\lambda_{+} < \omega_{0}^{2}/\omega_{0} = \omega_{0}$. The numerator $\omega_{0}^{2}$ is positive, so $\lambda_{+} > 0$.
:::

A critically damped tail carries the factor $t e^{-\omega_{0} t}$, up to constants fixed by the initial data. Compare that with an overdamped tail $e^{-\lambda_{+} t}$. Their ratio is a constant times $t e^{-(\omega_{0} - \lambda_{+})t}$. The exponent is a negative constant, because $\omega_{0} > \lambda_{+}$, so the ratio tends to zero as $t \to \infty$. Eventually the critical tail is smaller than the overdamped tail. In that precise sense, and only in that sense, the boundary $\gamma = \omega_{0}$ returns faster than every overdamped choice: among motions that do not oscillate, heavier damping makes the late return slower, because $\lambda_{+}$ falls toward zero as $\gamma$ grows. The underdamped motion is a different comparison. It does oscillate, and for a release from rest it changes sign. If the design requirement is "do not oscillate", the candidates are $\gamma \ge \omega_{0}$, and the boundary wins the late-time race.

::: example Overdamped release {#ex-over}
Keep $m = 0.250\,\mathrm{kg}$ and $k = 40\,\mathrm{N/m}$, and take $b = 10.0\,\mathrm{N\,s/m}$. Find the two roots, the motion for release from rest at $x(0) = 0.080\,\mathrm{m}$, and compare $x(0.200\,\mathrm{s})$ and $x(0.500\,\mathrm{s})$ with the critical release of [[#ex-critical]].
::: solution
Here $\gamma = b/(2m) = 10.0/(0.500) = 20.0\,\mathrm{s^{-1}}$, which is greater than $\omega_{0} = 12.649\,\mathrm{rad/s}$. [[#eq-roots]] gives

$$
\sqrt{\gamma^{2} - \omega_{0}^{2}} = \sqrt{400 - 160} = \sqrt{240} = 15.492,
$$

so $r_{+} = -20.0 + 15.492 = -4.508\,\mathrm{s^{-1}}$ and $r_{-} = -20.0 - 15.492 = -35.49\,\mathrm{s^{-1}}$. The slow decay constant is $\lambda_{+} = 4.508\,\mathrm{s^{-1}}$, safely below $\omega_{0}$, as [[#prop-slow]] requires. The fast piece $e^{-35.5 t}$ is already negligible after a few hundredths of a second.

Release from rest imposes $C_{+} + C_{-} = 0.080$ and $r_{+} C_{+} + r_{-} C_{-} = 0$. Solving,

$$
C_{+} = 0.080\cdot\frac{-r_{-}}{r_{+} - r_{-}} = 0.080\cdot\frac{35.49}{30.98} = 0.0916\,\mathrm{m},
$$

and $C_{-} = 0.080 - 0.0916 = -0.0116\,\mathrm{m}$. Thus

$$
x(t) = 0.0916\, e^{-4.508 t} - 0.0116\, e^{-35.49 t},
$$

in metres. At $t = 0.200\,\mathrm{s}$ the fast term is tiny and $x = 0.0372\,\mathrm{m}$. The critical release at the same instant, from [[#ex-critical]], was already down at $0.0225\,\mathrm{m}$. At $t = 0.500\,\mathrm{s}$ the overdamped coordinate is $0.00962\,\mathrm{m}$, while the critical coordinate is $0.00105\,\mathrm{m}$. The heavier damper is still farther from the origin. Both motions stay positive. The underdamped release of [[#ex-moderate]] has already changed sign by $t = 0.200\,\mathrm{s}$.
:::
:::

::: quiz
A damped oscillator has $\gamma > \omega_{0}$. Which statement is correct?
- [ ] The motion is $A e^{-\gamma t}\cos(\omega_{1} t - \varphi)$ with $\omega_{1} = \sqrt{\gamma^{2} - \omega_{0}^{2}}$.
- [x] Both characteristic roots are real and negative, and the general motion is a sum of two decaying exponentials.
- [ ] Critical damping means $\gamma = 0$, the case with no resistance at all.
- [ ] The mechanical energy $\tfrac12 m v^{2} + \tfrac12 k x^{2}$ stays constant, because the spring is conservative.
::: solution
[[#thm-regimes]] puts $\gamma > \omega_{0}$ in the overdamped family [[#eq-over]], with both roots real and negative. The cosine formula is the underdamped solution, and it requires $\gamma < \omega_{0}$; the square root written in the first option is the overdamped one, pasted onto the wrong formula. Critical damping is the boundary $\gamma = \omega_{0}$, not $\gamma = 0$. The damper does negative work whenever the mass is moving, so the mechanical energy falls. That balance is [[#prop-balance]].
:::
:::

## Energy and the quality factor

The spring still stores $\tfrac12 kx^{2}$, and the mass still carries $\tfrac12 mv^{2}$. Their sum is the mechanical energy one would have conserved in [[oscillations/simple-harmonic]]. The damper has no potential. It only removes energy.

::: proposition Energy balance {#prop-balance}
Along any solution of [[#eq-damped]], the mechanical energy $E = \tfrac12 m v^{2} + \tfrac12 k x^{2}$, with $v = \deriv{x}{t}$, satisfies

$$
\deriv{E}{t} = -b v^{2}.
$$ {#eq-balance}

In particular $E$ is non-increasing. It is constant for all $t$ if and only if $b = 0$ or the mass is at rest for all $t$ in the interval.
:::

::: proof
Differentiate $E$ and substitute $v' = \deriv{^2 x}{t^2}$ from [[#eq-damped]], in the form $m v' = -bv - kx$:

$$
\deriv{E}{t} = m v v' + k x v = v(m v' + kx) = v(-bv) = -b v^{2}.
$$

The right-hand side is $\le 0$ because $b \ge 0$. If $b = 0$, the derivative vanishes and $E$ is the constant of the undamped theory. If $v$ is identically zero, then $x$ is constant, and [[#eq-damped]] forces $kx = 0$, so $x = 0$ and $E = 0$, which is constant. Conversely, if $E$ is constant on an interval where the mass is not always at rest, then $-bv^{2} = 0$ with $v$ not always zero, so $b = 0$.
:::

This is why a damped oscillator cannot be assigned a fixed amplitude in the undamped sense. The quantity $\tfrac12 k C^{2}$ belonged to a closed energy budget. Here the budget has a leak proportional to the square of the speed. The leak is shut only at the turning points, where $v = 0$ and, for that instant, $\deriv{E}{t} = 0$. Between turning points the energy steps downward.

Underdamped motion still has a period, the period $T = 2\pi/\omega_{1}$ of the sinusoidal factor. Over that interval the leak has a remarkably rigid effect: the whole phase-space vector shrinks by exactly the same factor, and the energy, being quadratic, shrinks by the square.

::: theorem Energy one cycle later {#thm-cycle}
Suppose $\gamma < \omega_{0}$, and write $T = 2\pi/\omega_{1}$ with $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$. For every solution of [[#eq-standard]] and every $t$,

$$
x(t + T) = e^{-\gamma T} x(t), \qquad v(t + T) = e^{-\gamma T} v(t),
$$

and therefore

$$
E(t + T) = e^{-2\gamma T} E(t).
$$ {#eq-cycle}

The fraction of the mechanical energy remaining after one period is exactly $e^{-2\gamma T}$. The fraction lost is $1 - e^{-2\gamma T}$.
:::

::: proof
Set $x(t) = e^{-\gamma t} u(t)$. Differentiate:

$$
v = e^{-\gamma t}(u' - \gamma u), \qquad x'' = e^{-\gamma t}\bigl(u'' - 2\gamma u' + \gamma^{2} u\bigr).
$$

Substitute into [[#eq-standard]]:

$$
x'' + 2\gamma v + \omega_{0}^{2} x = e^{-\gamma t}\bigl(u'' + (\omega_{0}^{2} - \gamma^{2})u\bigr).
$$

The equation holds for all $t$ precisely when $u'' + \omega_{1}^{2} u = 0$. Every solution $u$ of that undamped equation is $2\pi/\omega_{1}$-periodic, by [[oscillations/simple-harmonic]], so $u(t + T) = u(t)$ and $u'(t + T) = u'(t)$. Therefore

$$
x(t + T) = e^{-\gamma(t + T)} u(t + T) = e^{-\gamma T} e^{-\gamma t} u(t) = e^{-\gamma T} x(t),
$$

and the same factor multiplies $v$, because $v$ is $e^{-\gamma t}$ times a combination of $u$ and $u'$. The kinetic energy and the spring potential are homogeneous of degree two in $(x, v)$, so each is multiplied by $e^{-2\gamma T}$, and so is their sum $E$.
:::

The identity is exact. It is not a small-damping approximation, and it is not a statement that $E(t) = E(0)\, e^{-2\gamma t}$ at every instant. Between samples one period apart, kinetic and potential energy still trade, and $E(t)$ wiggles while its samples on the lattice $t_{0} + nT$ fall geometrically. The wiggles are the harmonic exchange. The geometric factor is the damper.

Turning points are included. Because $v(t + T) = e^{-\gamma T} v(t)$ and the exponential never vanishes, $v(t) = 0$ if and only if $v(t + T) = 0$. Successive turning points of the same kind are one period apart, and the displacements there stand in the ratio $e^{-\gamma T}$. The **logarithmic decrement** is that ratio's logarithm,

$$
\delta = \ln\left|\frac{x(t_{n})}{x(t_{n} + T)}\right| = \gamma T = \frac{2\pi\gamma}{\omega_{1}}.
$$ {#eq-logdec}

It is exact for the underdamped linear oscillator, for the same reason [[#eq-cycle]] is exact.

::: definition Quality factor {#def-q}
For $b > 0$ the **quality factor** of [[#eq-damped]] is

$$
Q = \frac{\omega_{0} m}{b} = \frac{\omega_{0}}{2\gamma}.
$$ {#eq-q}

Large $Q$ means light damping: many radians of oscillation per unit of decay of the amplitude.
:::

Two further approximations turn [[#eq-cycle]] into the rule of thumb quoted for light damping. First, if $Q$ is large then $\gamma \ll \omega_{0}$, so $\omega_{1} = \omega_{0}\sqrt{1 - \gamma^{2}/\omega_{0}^{2}}$ is close to $\omega_{0}$ and $T$ is close to the undamped period $2\pi/\omega_{0}$. Second, if $2\gamma T$ itself is small, then $1 - e^{-2\gamma T} \approx 2\gamma T$. Chaining them,

$$
1 - e^{-2\gamma T} \approx 2\gamma\cdot\frac{2\pi}{\omega_{0}} = \frac{4\pi\gamma}{\omega_{0}} = \frac{2\pi}{Q} = \frac{2\pi b}{m\omega_{0}}.
$$

The fractional loss per cycle is approximately $2\pi b/(m\omega_{0})$, which equals $2\pi/Q$, when $Q$ is large. The same limit gives $\delta \approx \pi/Q$. Both replacements fail when $2\pi/Q$ is not small. A value larger than $1$ cannot be a fractional loss, and it is the signal that one should return to the exponential $e^{-2\gamma T}$ rather than to its linearisation. The energy "decays as $e^{-2\gamma t}$" in the exact sampled sense of [[#eq-cycle]]. The phrase $2\pi/Q$ is the first-order description of that decay, and only then.

::: example Lighter damping {#ex-light}
Repeat the spring $m = 0.250\,\mathrm{kg}$, $k = 40\,\mathrm{N/m}$ with the smaller coefficient $b = 0.20\,\mathrm{N\,s/m}$. Find $\gamma$, $Q$, $\omega_{1}$ and the fraction of mechanical energy left after one period.
::: solution
[[#eq-rates]] and [[#eq-q]] give

$$
\gamma = \frac{0.20}{2\times 0.250} = 0.400\,\mathrm{s^{-1}}, \qquad Q = \frac{\sqrt{160}\times 0.250}{0.20} = 15.81,
$$

so $Q = 15.8$ to three figures. This is light enough that the oscillation is obvious and not light enough that every approximation is free. The shifted frequency is

$$
\omega_{1} = \sqrt{160 - 0.160} = \sqrt{159.84} = 12.643\,\mathrm{rad/s},
$$

only a little below $\omega_{0} = 12.649\,\mathrm{rad/s}$. The period is $T = 2\pi/\omega_{1} = 0.49698\,\mathrm{s}$, against the undamped $0.49673\,\mathrm{s}$. [[#eq-cycle]] then needs no further approximation:

$$
2\gamma T = 2\times 0.400\times 0.49698 = 0.3976, \qquad e^{-2\gamma T} = e^{-0.3976} = 0.672.
$$

After one period, $67.2\%$ of the mechanical energy remains, and the fraction lost is $0.328$. The amplitude of corresponding peaks falls by $e^{-\gamma T} = e^{-0.1988} = 0.820$, and the logarithmic decrement is $\delta = 0.199$.

The large-$Q$ loss formula gives $2\pi/Q = 0.397$, which matches $2\gamma T$ closely, because $\omega_{1}$ and $\omega_{0}$ almost agree. It does not match the true fractional loss $0.328$. The gap is the linearisation $1 - e^{-x} \approx x$ at $x = 0.40$, where the next term in the exponential series, $x^{2}/2 = 0.079$, is still visible. At this $Q$ one should quote $e^{-2\gamma T}$, not $2\pi/Q$, as the fraction remaining. The rule $2\pi/Q$ becomes accurate only when that number is itself small.

For the same release from rest as [[#ex-moderate]], $x(0) = 0.080\,\mathrm{m}$ and $v(0) = 0$, the phase in [[#eq-under]] is $\varphi = \arctan(\gamma/\omega_{1}) = 1.81^{\circ}$ and the phase amplitude is $A = x(0)\,\omega_{0}/\omega_{1} = 0.08004\,\mathrm{m}$. At this damping the pure cosine times $e^{-\gamma t}$ is already a faithful picture. At $b = 1.00\,\mathrm{N\,s/m}$ it was not.
:::
:::

::: warning The boundary, and the wrong formula
Critical damping is the boundary $\gamma = \omega_{0}$, equivalently $b = 2m\omega_{0}$. It is not a synonym for "the fastest return" unless one says what is being compared. The comparison that makes the slogan true is the late-time tail among motions that do not oscillate: [[#prop-slow]] shows that every overdamped choice has a decay constant slower than $\omega_{0}$, and the factor $t$ in [[#eq-critical]] does not overturn that exponential gap. A design that is allowed to ring is a different problem, and the underdamped tail is not part of that comparison.

Separately, do not insert $\gamma > \omega_{0}$ into [[#eq-under]]. The square root $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$ is then not real, and the cosine form is the wrong real solution. The overdamped motion is [[#eq-over]].
:::

::: intuition What the discriminant is looking at
The damper tries to stop the motion. The spring tries to reverse it. If the spring wins, the mass overshoots and one sees a decaying ring, the complex roots of [[#eq-char]]. If the damper wins, the mass never builds the speed that would carry it past the origin, and both roots are real. The boundary is the repeated root, where the two real roots have just met. Increasing $b$ past that meeting does not add a new qualitative talent. It splits the repeated root into a fast piece, which dies at once, and a slow piece, which lingers. That is the whole content of [[#prop-slow]].
:::

::: history Stokes' drag, not the three regimes
George Gabriel Stokes, in a paper read in 1850 and published in 1851, calculated the resistance of a viscous fluid to a sphere moving slowly through it. The paper is *On the effect of the internal friction of fluids on the motion of pendulums*, in the *Transactions of the Cambridge Philosophical Society*. The force he found is $F = 6\pi\eta r v$, with $\eta$ the viscosity and $r$ the radius, directed against the velocity. A pendulum bob small enough, or slow enough, really does feel a linear resistance, which is why [[#eq-damped]] is the right linearisation for that experiment. The derivation assumes the Reynolds number is low. At higher speed the resistance is not linear, the equation is not [[#eq-damped]], and the explicit catalogue of solutions stops applying.

The three regimes themselves are older and more elementary than that paper. They are the three ways a quadratic equation can cut the real axis, applied to [[#eq-char]]. Attributing underdamping, critical damping and overdamping to a single experimental memoir confuses a mathematical trichotomy with the hydrodynamics that sometimes justifies the linear term. Stokes supplied one honest origin for the coefficient $b$. He did not classify the roots.
:::

## Where this leads

The free motion solved here is what a driven oscillator does while it is forgetting its initial data. Add a force $F_{0}\cos(\omega t)$ on the right-hand side of [[#eq-damped]] and the general solution is one particular driven solution plus the homogeneous solution of [[#thm-regimes]]. If $b > 0$, that homogeneous piece decays, whether it rings or creeps, and a steady oscillation at the driving frequency remains. If $b = 0$ and the drive sits at $\omega_{0}$, there is nothing to kill the homogeneous piece, and the amplitude grows without a steady ceiling. Those statements are proved in [[oscillations/resonance]], which inherits $\gamma$, $\omega_{0}$ and $Q$ exactly as they were defined here.

The same linear drag appears as a model, not as a law, wherever a small velocity produces a small opposing force: a torsional damper, a dashpot on a door, the electromagnetic damping of a coil swinging in a magnetic field. In each case the first question is the comparison of $\gamma$ with $\omega_{0}$, and the second is whether $Q$ is large enough for the fractional-loss rule, or whether one must keep the exponential of [[#eq-cycle]].

::: summary
- The linear model is $m x'' + b x' + k x = 0$, with $\omega_{0} = \sqrt{k/m}$ and $\gamma = b/(2m)$. The slider $c$ in the figure is this $b$.
- Underdamped, $\gamma < \omega_{0}$: $x = A e^{-\gamma t}\cos(\omega_{1} t - \varphi)$ with $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$. Critical, $\gamma = \omega_{0}$: $x = (A + Bt)e^{-\omega_{0} t}$. Overdamped, $\gamma > \omega_{0}$: a sum of two decaying real exponentials.
- Do not use the underdamped formula when $\gamma > \omega_{0}$. Release from rest is not a pure cosine unless $\gamma = 0$, because the decaying exponential itself contributes to the velocity.
- Mechanical energy obeys $\deriv{E}{t} = -b v^{2}$. It is not conserved when the mass is moving and $b > 0$.
- For underdamped motion, $E(t + T) = e^{-2\gamma T} E(t)$ exactly, with $T = 2\pi/\omega_{1}$. The energy samples decay as $e^{-2\gamma t}$. The pointwise formula $E(t) = E(0)e^{-2\gamma t}$ is a further, unnecessary claim.
- The quality factor is $Q = \omega_{0} m/b = \omega_{0}/(2\gamma)$. When $Q$ is large the fractional loss per cycle is approximately $2\pi/Q = 2\pi b/(m\omega_{0})$. At $Q = 3.16$ that approximation is meaningless; at $Q = 15.8$ the exact fraction remaining is $e^{-2\gamma T} = 0.672$.
- Critical damping is the boundary $\gamma = \omega_{0}$. Among non-oscillatory returns it has the fastest late tail, because every overdamped slow root is strictly slower than $\omega_{0}$. Heavier damping is slower, not quicker.
:::

## Exercises

::: exercise Damping constant {#exr-gamma level=1 check="1/(2*0.25)"}
A mass $m = 0.250\,\mathrm{kg}$ is attached to a damper with coefficient $b = 1.00\,\mathrm{N\,s/m}$. Find $\gamma = b/(2m)$ in $\mathrm{s^{-1}}$.
::: solution
[[#eq-rates]] is a definition, not an equation to be solved:

$$
\gamma = \frac{b}{2m} = \frac{1.00}{2\times 0.250} = \frac{1.00}{0.500} = 2.00\,\mathrm{s^{-1}}.
$$

The stiffness is not involved. Whether the motion rings depends on comparing this $\gamma$ with $\omega_{0} = \sqrt{k/m}$, which this exercise does not ask for.
:::
:::

::: exercise The ringing frequency {#exr-omega1 level=1 check="sqrt(156)"}
The mass and damper of the previous exercise are attached to a spring with $k = 40\,\mathrm{N/m}$. Find the underdamped angular frequency $\omega_{1}$.
::: solution
First $\omega_{0}^{2} = k/m = 40/0.250 = 160\,\mathrm{s^{-2}}$ and $\gamma = 2.00\,\mathrm{s^{-1}}$, from the previous exercise or from [[#ex-moderate]]. Since $\gamma < \omega_{0}$, [[#thm-regimes]] applies and

$$
\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}} = \sqrt{160 - 4} = \sqrt{156} = 12.49\,\mathrm{rad/s}.
$$

The undamped value $\sqrt{160} = 12.65\,\mathrm{rad/s}$ is $\omega_{0}$, not $\omega_{1}$. Using it as the frequency of the cosine would be the $b = 0$ theory.
:::
:::

::: exercise Quality factor of the lighter damper {#exr-q-light level=1 check="sqrt(160)*0.25/0.2"}
For $m = 0.250\,\mathrm{kg}$, $k = 40\,\mathrm{N/m}$ and $b = 0.20\,\mathrm{N\,s/m}$, compute $Q$.
::: solution
[[#eq-q]] gives

$$
Q = \frac{\omega_{0} m}{b} = \frac{\sqrt{160}\times 0.250}{0.20} = \frac{3.1623}{0.20} = 15.81,
$$

which is $15.8$ to three significant figures. Equivalently $\gamma = 0.40\,\mathrm{s^{-1}}$ and $Q = \omega_{0}/(2\gamma) = \sqrt{160}/0.80 = 15.81$. This is the damper of [[#ex-light]]. The fractional-loss rule $2\pi/Q$ is only a first approximation at this value of $Q$.
:::
:::

::: exercise The critical coefficient {#exr-bcrit level=2 check="2*sqrt(10)"}
Find the value of $b$ that critically damps $m = 0.250\,\mathrm{kg}$ on a spring of stiffness $k = 40\,\mathrm{N/m}$.
::: solution
Critical damping is $\gamma = \omega_{0}$, so $b_{c} = 2m\omega_{0}$. With $\omega_{0} = \sqrt{160}$,

$$
b_{c} = 2\times 0.250\times\sqrt{160} = \tfrac12\sqrt{160} = \sqrt{40} = 2\sqrt{10} = 6.32\,\mathrm{N\,s/m}.
$$

Any smaller positive $b$ is underdamped; any larger $b$ is overdamped. The boundary is this single number, not an interval. [[#ex-critical]] uses the same value and writes the motion on it.
:::
:::

::: exercise Energy left after one period {#exr-fraction level=2 check="exp(-2*0.4*2*pi/sqrt(160-0.16))"}
For $m = 0.250\,\mathrm{kg}$, $k = 40\,\mathrm{N/m}$ and $b = 0.20\,\mathrm{N\,s/m}$, the motion is underdamped. Find the fraction of the mechanical energy remaining after one period $T = 2\pi/\omega_{1}$.
::: solution
From [[#ex-light]], $\gamma = 0.400\,\mathrm{s^{-1}}$ and $\omega_{1} = \sqrt{160 - 0.16} = \sqrt{159.84}$. [[#thm-cycle]] gives the fraction remaining as a pure exponential, with no further approximation:

$$
e^{-2\gamma T} = \exp\!\left(-2\times 0.400\times\frac{2\pi}{\omega_{1}}\right) = \exp\!\left(-\frac{1.6\pi}{\sqrt{159.84}}\right) = 0.672.
$$

The fraction lost is $1 - 0.672 = 0.328$. The number $2\pi/Q = 0.397$ is the first-order stand-in for the loss, not for the fraction remaining, and at this $Q$ it is visibly larger than $0.328$. The exercise asks for the exact fraction remaining.
:::
:::

::: exercise The slow decay constant {#exr-slow level=2 check="20-sqrt(240)"}
An overdamped oscillator has $m = 0.250\,\mathrm{kg}$, $k = 40\,\mathrm{N/m}$ and $b = 10.0\,\mathrm{N\,s/m}$. Find the slower decay constant $\lambda_{+}$, the positive number such that the slow term is $e^{-\lambda_{+} t}$.
::: solution
[[#eq-rates]] gives $\gamma = 10.0/(2\times 0.250) = 20.0\,\mathrm{s^{-1}}$ and $\omega_{0}^{2} = 160\,\mathrm{s^{-2}}$. [[#eq-slow]] gives

$$
\lambda_{+} = \gamma - \sqrt{\gamma^{2} - \omega_{0}^{2}} = 20 - \sqrt{400 - 160} = 20 - \sqrt{240} = 4.508\,\mathrm{s^{-1}}.
$$

The fast constant is $20 + \sqrt{240} = 35.49\,\mathrm{s^{-1}}$. [[#prop-slow]] guarantees $\lambda_{+} < \omega_{0} = 12.65\,\mathrm{s^{-1}}$, and $4.508 < 12.65$ agrees. Quoting $\omega_{1} = \sqrt{\omega_{0}^{2} - \gamma^{2}}$ here would be the underdamped formula on the wrong side of the boundary: the radicand is negative.
:::
:::

::: exercise Where the energy goes {#exr-power level=3}
Starting from [[#eq-damped]], prove that $\deriv{E}{t} = -bv^{2}$ for $E = \tfrac12 mv^{2} + \tfrac12 kx^{2}$. Deduce that if $b > 0$ and the mass is not permanently at rest, then $E$ is not a constant of the motion.
::: hint
Multiply the equation of motion by $v = \deriv{x}{t}$, and recognise the derivatives of $\tfrac12 mv^{2}$ and $\tfrac12 kx^{2}$.
:::
::: solution
Write [[#eq-damped]] as $m\deriv{v}{t} + bv + kx = 0$. Multiply through by $v$:

$$
m v\deriv{v}{t} + b v^{2} + kx v = 0.
$$

The first term is $\deriv{}{t}\bigl(\tfrac12 m v^{2}\bigr)$ and the third is $\deriv{}{t}\bigl(\tfrac12 k x^{2}\bigr)$, so

$$
\deriv{E}{t} + b v^{2} = 0,
$$

which is [[#eq-balance]]. Suppose $b > 0$ and $E$ were constant. Then $v^{2} = 0$ at every instant, so $v \equiv 0$, so $x$ is constant. The equation of motion then requires $kx = 0$, hence $x = 0$. The mass is permanently at rest, at the equilibrium position, and $E = 0$. Any other motion, with $b > 0$, has $\deriv{E}{t}$ strictly negative on a set of times, and $E$ changes. This is the sense in which damping destroys the conservation law of [[oscillations/simple-harmonic]]. The spring force is still conservative. The damper is not.
:::
:::

::: exercise No crossing on a release from rest {#exr-nocross level=3}
Consider [[#eq-standard]] with $x(0) = x_{0} > 0$ and $v(0) = 0$.

(a) If $\gamma = \omega_{0}$, derive $x(t) = x_{0}(1 + \omega_{0} t)e^{-\omega_{0} t}$ and prove that $x(t) > 0$ for every $t \ge 0$.

(b) If $\gamma > \omega_{0}$, prove that $x(t)$ does not vanish for any $t > 0$.
::: hint
In (a), read $A$ and $B$ from the initial data in [[#thm-regimes]]. In (b), solve for the ratio $C_{+}/C_{-}$ from $v(0) = 0$, and compare it with $e^{(r_{-} - r_{+})t}$, which is at most $1$.
:::
::: solution
(a) [[#thm-regimes]] gives $x(t) = (A + Bt)e^{-\omega_{0} t}$ on the critical boundary, with $A = x(0) = x_{0}$ and $B = v(0) + \omega_{0} x(0) = \omega_{0} x_{0}$. Therefore

$$
x(t) = x_{0}(1 + \omega_{0} t)\, e^{-\omega_{0} t}.
$$

For $t \ge 0$ the factor $1 + \omega_{0} t$ is at least $1$, and the exponential is positive, so $x(t) \ge x_{0} e^{-\omega_{0} t} > 0$.

(b) Write $x = C_{+} e^{r_{+} t} + C_{-} e^{r_{-} t}$ with $r_{-} < r_{+} < 0$. The initial conditions are $C_{+} + C_{-} = x_{0}$ and $r_{+} C_{+} + r_{-} C_{-} = 0$. The second gives $C_{+}/C_{-} = -r_{-}/r_{+}$. Both roots are negative and $\abs{r_{-}} > \abs{r_{+}}$, so $-r_{-}/r_{+} = \abs{r_{-}}/\abs{r_{+}} > 1$. In particular $C_{+}$ and $C_{-}$ have opposite signs. From $C_{+} + C_{-} = x_{0} > 0$ and $\abs{C_{+}/C_{-}} > 1$ it follows that $C_{+} > 0$ and $C_{-} < 0$.

Suppose $x(t_{1}) = 0$ for some $t_{1} > 0$. Then $C_{+} = -C_{-} e^{(r_{-} - r_{+})t_{1}}$, so

$$
-\frac{C_{+}}{C_{-}} = e^{(r_{-} - r_{+})t_{1}}.
$$

The left side equals $r_{-}/r_{+} > 1$. The right side is strictly less than $1$, because $r_{-} - r_{+} < 0$ and $t_{1} > 0$. A number greater than $1$ cannot equal a number less than $1$. There is no such $t_{1}$. Combined with (a), a release from rest does not cross the origin when $\gamma \ge \omega_{0}$. The underdamped release does cross: that is the content of $\omega_{1}$ being real, and [[#ex-moderate]] shows a concrete sign change.
:::
:::
