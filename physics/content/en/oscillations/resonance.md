A child keeps a swing moving by pushing once per cycle. A loudspeaker cone follows the voltage from an amplifier. An unbalanced wheel shakes the machine it is bolted to, at the frequency of the shaft. In each case something outside the oscillator keeps supplying a periodic force after the free motion would have died. The free motion is the subject of [[oscillations/damping]]: with linear drag the displacement decays, and the energy with it. A drive that does not switch off replaces that lost energy. The motion that remains, once the decay is over, is the steady state studied here.

The questions are quantitative. How large is the steady displacement, and how does it depend on the driving frequency? Does the mass move with the force, or behind it? At what frequency is the displacement greatest, and is that the frequency at which the driver works hardest? Throughout, the mass is constant, the spring is linear, and the drag is linear in the velocity. Those modelling choices make the equation solvable in closed form.

Take the conventions of [[oscillations/simple-harmonic]] and [[oscillations/damping]]. The natural angular frequency of the undamped oscillator is $\omega_0 = \sqrt{k/m}$, and the damping constant is $\gamma = b/(2m)$. The quality factor is $Q = \omega_0 m/b = \omega_0/(2\gamma)$. We restate the names so that the formulae below are readable on their own; the free decay that justifies them is proved in the damping chapter.

## The driven equation

Newton's second law, as in [[mechanics/newton-laws]], equates the mass times the acceleration to the sum of the forces. The spring contributes $-kx$, the linear damper contributes $-b\,\deriv{x}{t}$, and the driver contributes a force we take to be a pure cosine.

::: definition Driven damped oscillator {#def-driven}
A **driven damped oscillator** is a particle of constant mass $m > 0$ whose displacement $x(t)$ from equilibrium satisfies

$$
m\deriv{^2 x}{t^2} + b\deriv{x}{t} + kx = F_0\cos(\omega t),
$$ {#eq-driven}

with $k > 0$, $b \ge 0$, $F_0$ a constant, and $\omega \ge 0$ the driving angular frequency. Equivalently, with $\omega_0 = \sqrt{k/m}$ and $\gamma = b/(2m)$,

$$
\deriv{^2 x}{t^2} + 2\gamma\deriv{x}{t} + \omega_0^2 x = \frac{F_0}{m}\cos(\omega t).
$$ {#eq-driven-reduced}

The equation is linear and has constant coefficients. The term $F_0\cos(\omega t)$ is the driving force. We do not put a phase into the cosine: any constant phase in the driver can be absorbed by moving the origin of $t$.
:::

The derivative notation $\deriv{^2 x}{t^2}$ is the ordinary second derivative $\mathrm{d}^2 x/\mathrm{d}t^2$. In the prime notation of the earlier chapters the same statement is $m x'' + b x' + k x = F_0\cos(\omega t)$.

Linearity is what makes the chapter work. If $x_h$ solves the equation with the right-hand side set to zero, and $x_p$ solves [[#eq-driven]], then $x_h + x_p$ solves [[#eq-driven]]. The homogeneous piece $x_h$ is exactly the free damped motion. For $b > 0$ every such solution tends to zero as $t\to\infty$, whether the free motion is underdamped, critically damped or overdamped. What is left at late times is $x_p$, provided we can find one particular solution that does not itself grow. That particular solution is the steady state.

The division into transient and steady state is a statement about the future, not about the first few cycles. Immediately after the drive is switched on, both pieces are present, and the constants in $x_h$ are fixed by the initial displacement and velocity. We construct $x_p$ first, because it does not depend on those initial values, and return to the matching afterwards.

::: intuition Which force balances the driver
In the steady state three forces act with the drive: the spring, the damper and the inertia, the last of these being the $ma$ term moved to the left of Newton's law. They do not share the load equally at every frequency. At a very low driving frequency the displacement is almost in step with the force, and the spring balances the driver, just as it would under a static load $F_0$. At a very high frequency the mass barely moves; its acceleration is out of phase with the displacement, and inertia balances the driver. Between those limits the damper takes the load. The frequency at which it does so completely is the natural frequency, and it is not quite the frequency of greatest displacement. The rest of the chapter turns this picture into formulae.
:::

## The steady state

We look for a solution that oscillates at the driving frequency, with a constant amplitude and a constant lag behind the force.

::: definition Steady state {#def-steady}
A **steady state** of [[#eq-driven]] is a solution of the form

$$
x(t) = D\cos(\omega t - \delta),
$$ {#eq-steady}

with amplitude $D \ge 0$ and phase lag $\delta$ both constant. The lag $\delta$ is measured from the driving force $F_0\cos(\omega t)$ to the displacement. A positive $\delta$ means the displacement reaches its maxima later than the force.
:::

The form is a guess only in appearance. The right-hand side of [[#eq-driven]] is a sinusoid of frequency $\omega$. For a linear equation with constant coefficients, and for $b > 0$ or for $\omega \ne \omega_0$, a sinusoid of that same frequency is a particular solution. The two constants $D$ and $\delta$ are fixed by substituting [[#eq-steady]] into [[#eq-driven]]. There is no further freedom.

::: theorem Steady-state amplitude and phase {#thm-steady}
Assume $m > 0$, $k > 0$ and $\omega > 0$. If $b > 0$, or if $b = 0$ and $\omega \ne \omega_0$, [[#eq-driven]] has a steady state [[#eq-steady]] with

$$
D = \frac{F_0/m}{\sqrt{(\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2}}
$$ {#eq-amplitude}

and

$$
\tan\delta = \frac{2\gamma\omega}{\omega_0^2 - \omega^2}, \qquad \delta\in (0,\pi).
$$ {#eq-phase}

The positive square root is taken. The value of $\delta$ in $(0,\pi)$ is the unique angle whose sine and cosine satisfy

$$
\sin\delta = \frac{b\omega D}{F_0}, \qquad \cos\delta = \frac{(k - m\omega^2)D}{F_0}
$$

when $F_0 > 0$. In particular $\delta = \pi/2$ when $\omega = \omega_0$, $\delta\in (0,\pi/2)$ when $\omega < \omega_0$, and $\delta\in (\pi/2,\pi)$ when $\omega > \omega_0$. If $F_0 < 0$, replace $F_0$ by $\abs{F_0}$ and add $\pi$ to the phase of the force; we take $F_0 > 0$ from here on.
:::

::: proof
Write $\phi = \omega t - \delta$, so the trial solution is $x = D\cos\phi$. Differentiating with respect to $t$ gives

$$
\deriv{x}{t} = -D\omega\sin\phi, \qquad \deriv{^2 x}{t^2} = -D\omega^2\cos\phi.
$$

Substitute into [[#eq-driven]]:

$$
D(k - m\omega^2)\cos\phi - Db\omega\sin\phi = F_0\cos(\omega t).
$$

The driving cosine has to be written in the same basis. The angle-addition formula gives $\cos(\omega t) = \cos(\phi + \delta) = \cos\phi\cos\delta - \sin\phi\sin\delta$, and therefore

$$
F_0\cos(\omega t) = F_0\cos\delta\cos\phi - F_0\sin\delta\sin\phi.
$$

The functions $\cos\phi$ and $\sin\phi$ are linearly independent, so their coefficients match separately:

$$
D(k - m\omega^2) = F_0\cos\delta, \qquad Db\omega = F_0\sin\delta.
$$

Square and add. The identity $\cos^2\delta + \sin^2\delta = 1$ produces

$$
D^2\left[(k - m\omega^2)^2 + (b\omega)^2\right] = F_0^2.
$$

The amplitude $D$ was required to be non-negative, so

$$
D = \frac{F_0}{\sqrt{(k - m\omega^2)^2 + (b\omega)^2}},
$$

provided the denominator is not zero. Dividing the numerator and the denominator by $m$, and using $k/m = \omega_0^2$ together with $b/m = 2\gamma$, converts this expression into [[#eq-amplitude]]. Dividing the two coefficient identities gives [[#eq-phase]] whenever $\cos\delta \ne 0$.

The denominator under the square root vanishes only if $b = 0$ and $k - m\omega^2 = 0$ simultaneously, that is only if $b = 0$ and $\omega = \omega_0$. That case is excluded from the statement and treated in [[#prop-secular]]. Everywhere else $D$ is finite.

It remains to place $\delta$ in the right half of the circle. From $Db\omega = F_0\sin\delta$ and the sign assumptions $D \ge 0$, $b \ge 0$, $\omega > 0$, $F_0 > 0$, one has $\sin\delta \ge 0$, so $\delta$ lies in $[0,\pi]$ rather than in a lower quadrant. If $b > 0$ then $\sin\delta > 0$, so $\delta$ is not $0$ or $\pi$ and the open interval $(0,\pi)$ is correct. The cosine identity then says that $\cos\delta$ has the sign of $k - m\omega^2 = m(\omega_0^2 - \omega^2)$. Hence $\delta$ is acute when the drive is slower than $\omega_0$, obtuse when the drive is faster, and exactly $\pi/2$ when $\omega = \omega_0$. On that last line $\cos\delta = 0$ and $\sin\delta = 1$, which is consistent with $\tan\delta$ being undefined through a positive infinity.
:::

Two limits are worth reading off [[#eq-amplitude]] before any special frequency is singled out. As $\omega\to 0$, the amplitude tends to $(F_0/m)/\omega_0^2 = F_0/k$, which is the compression of the spring under a constant force $F_0$, and $\delta\to 0$: the mass follows the force. As $\omega\to\infty$, $D\sim (F_0/m)/\omega^2$ and $\delta\to\pi$: the displacement is small and opposite to the force. Inertia has taken over, as the opening picture suggested.

A calculator's inverse tangent returns a value in $(-\pi/2,\pi/2)$. That value equals $\delta$ only when $\omega < \omega_0$. When $\omega > \omega_0$ the denominator of [[#eq-phase]] is negative, $\tan\delta$ is negative, and the angle we want is the calculator's output plus $\pi$.

The same algebra can be done with complex exponentials, which is the bookkeeping promised for this course. Replace the drive $F_0\cos(\omega t)$ by the real part of $F_0 e^{i\omega t}$, and look for a displacement that is the real part of $Z e^{i\omega t}$ with $Z$ a complex constant. Substitution into [[#eq-driven]] gives

$$
Z = \frac{F_0}{k - m\omega^2 + ib\omega}.
$$

The modulus of $Z$ is $D$ from [[#eq-amplitude]]. Writing $Z = D e^{-i\delta}$ puts the minus sign on $\delta$ because [[#eq-steady]] lags the drive, and the argument of the denominator is $\delta$.

::: corollary Response at the natural frequency {#cor-natural}
If $b > 0$ and the drive sits at $\omega = \omega_0$, then $\delta = \pi/2$ and

$$
D(\omega_0) = \frac{F_0}{b\omega_0} = Q\frac{F_0}{k}.
$$ {#eq-d-natural}

The static displacement is $F_0/k$, so $Q$ is the factor by which resonance at $\omega_0$ amplifies that static displacement.
:::

::: proof
Set $\omega = \omega_0$ in [[#eq-amplitude]]. The term $\omega_0^2 - \omega^2$ drops out and the square root is $2\gamma\omega_0$, so

$$
D(\omega_0) = \frac{F_0/m}{2\gamma\omega_0} = \frac{F_0}{b\omega_0},
$$

where the second step is $2\gamma m = b$. Since $Q = \omega_0 m/b$ and $k = m\omega_0^2$,

$$
\frac{F_0}{b\omega_0} = \frac{F_0}{k}\cdot\frac{m\omega_0^2}{b\omega_0} = Q\frac{F_0}{k}.
$$

The phase claim is the case $\omega = \omega_0$ of [[#thm-steady]].
:::

::: example A standard driven oscillator {#ex-standard}
Take $m = 1.00\,\mathrm{kg}$, $b = 0.400\,\mathrm{kg/s}$, $k = 4.00\,\mathrm{N/m}$ and $F_0 = 1.00\,\mathrm{N}$. Find $\omega_0$, $\gamma$, $Q$, the static displacement, the steady amplitude and phase at $\omega = \omega_0$, and the driving frequency at which $D$ will turn out to be greatest. Compare that greatest amplitude with $D(\omega_0)$.
::: solution
The natural frequency and the damping constant are

$$
\omega_0 = \sqrt{\frac{k}{m}} = \sqrt{4.00} = 2.00\,\mathrm{rad/s}, \qquad \gamma = \frac{b}{2m} = \frac{0.400}{2.00} = 0.200\,\mathrm{s^{-1}}.
$$

The quality factor is $Q = \omega_0 m/b = 2.00/0.400 = 5.00$. The static displacement is $F_0/k = 1.00/4.00 = 0.250\,\mathrm{m}$. [[#cor-natural]] then gives

$$
D(\omega_0) = \frac{F_0}{b\omega_0} = \frac{1.00}{0.400\times 2.00} = 1.25\,\mathrm{m},
$$

which is $Q$ times $0.250\,\mathrm{m}$, and $\delta = \pi/2$. The amplitude-resonance frequency derived in [[#thm-amp]] below is real here because $\gamma = 0.200$ is well below $\omega_0/\sqrt{2} = 1.414\,\mathrm{s^{-1}}$:

$$
\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2} = \sqrt{4.00 - 2\times 0.0400} = \sqrt{3.92} = 1.980\,\mathrm{rad/s}.
$$

The peak amplitude from [[#eq-dmax]] is

$$
D_{\max} = \frac{F_0/m}{2\gamma\sqrt{\omega_0^2 - \gamma^2}} = \frac{1}{0.400\times\sqrt{3.96}} = 1.256\,\mathrm{m}.
$$

The frequency of greatest displacement lies $1.01$ percent below $\omega_0$, and $D_{\max}$ exceeds $D(\omega_0)$ by $0.504$ percent. The steady state at $\omega_0$ is $x = 1.25\sin(2.00\, t)$, in metres when $t$ is in seconds. The square roots are $\sqrt{3.92} = 1.97990$ and $\sqrt{3.96} = 1.98997$ before rounding.
:::
:::

## Amplitude resonance

[[#eq-amplitude]] depends on $\omega$ through the denominator only. Making $D$ large is the same problem as making

$$
S(\omega) = (\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2
$$

small. The static limit and the high-frequency tail both make $S$ large when $\gamma$ is small: $S(0) = \omega_0^4$, while $S(\omega)\sim\omega^4$ as $\omega\to\infty$. If there is a dip in between, that dip is the resonance peak of the amplitude.

::: theorem Amplitude resonance {#thm-amp}
Let $F_0 > 0$ and $\omega \ge 0$, and let $D(\omega)$ be [[#eq-amplitude]].

If $0 \le \gamma < \omega_0/\sqrt{2}$, then $D(\omega)$ attains a maximum at the single positive frequency

$$
\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2},
$$ {#eq-amp-res}

and the maximum value is

$$
D_{\max} = \frac{F_0/m}{2\gamma\sqrt{\omega_0^2 - \gamma^2}}.
$$ {#eq-dmax}

If $\gamma \ge \omega_0/\sqrt{2}$, then $D(\omega)$ is strictly decreasing for $\omega \ge 0$, and its greatest value on that half-line is the static value $D(0) = F_0/k$.

In terms of the quality factor the condition for a peak at nonzero frequency is $Q > 1/\sqrt{2}$. Light damping, the usual laboratory case, has $Q$ of several units or more, and then $\omega_{\mathrm{amp}}$ lies close to $\omega_0$.
:::

::: proof
Set $u = \omega^2 \ge 0$ and write $S$ as a function of $u$:

$$
S(u) = (\omega_0^2 - u)^2 + 4\gamma^2 u.
$$

Differentiating with respect to $u$ gives

$$
S'(u) = -2(\omega_0^2 - u) + 4\gamma^2 = 2\left(u - \omega_0^2 + 2\gamma^2\right),
$$

and $S''(u) = 2 > 0$. Thus $S'$ vanishes at the single point $u_* = \omega_0^2 - 2\gamma^2$, and that critical point is a minimum of $S$ wherever it lies in the domain.

If $\gamma < \omega_0/\sqrt{2}$, then $u_* > 0$. The minimum of $S$ on $u \ge 0$ is attained at $u_*$, so the maximum of $D$ is attained at $\omega_{\mathrm{amp}} = \sqrt{u_*}$, which is [[#eq-amp-res]]. The minimum value is

$$
\begin{aligned}
S(u_*)
&= (2\gamma^2)^2 + 4\gamma^2(\omega_0^2 - 2\gamma^2)
= 4\gamma^4 + 4\gamma^2\omega_0^2 - 8\gamma^4
= 4\gamma^2(\omega_0^2 - \gamma^2).
\end{aligned}
$$

Hence $\sqrt{S(u_*)} = 2\gamma\sqrt{\omega_0^2 - \gamma^2}$, and [[#eq-dmax]] follows from $D = (F_0/m)/\sqrt{S}$. The square root is real because $\gamma < \omega_0/\sqrt{2} < \omega_0$.

If $\gamma > \omega_0/\sqrt{2}$, then $u_* < 0$. On the physical half-line $u \ge 0$ one has $S'(u) > 0$, so $S$ is strictly increasing and $D$ is strictly decreasing. The greatest amplitude is $D(0) = (F_0/m)/\omega_0^2 = F_0/k$. If $\gamma = \omega_0/\sqrt{2}$, then $u_* = 0$ and $S'(u) \ge 0$, with equality only at the origin, and the same conclusion holds.

The quality-factor form of the threshold is the rearrangement $\gamma = \omega_0/(2Q)$. The inequality $\gamma < \omega_0/\sqrt{2}$ becomes $1/(2Q) < 1/\sqrt{2}$, or $Q > 1/\sqrt{2}$.
:::

The peak of $D$ is pulled below $\omega_0$ because the factor $(2\gamma\omega)^2$ in $S$ grows with $\omega$. Moving a little below $\omega_0$ costs something in the first term of $S$ and saves something in the second. The stationary balance is [[#eq-amp-res]]. As $\gamma\to 0$ with $\omega_0$ fixed, that frequency rises to $\omega_0$ and, separately, $D_{\max}$ grows without bound. A vanishing damper cannot hold a finite steady amplitude against a drive at $\omega_0$. That is the secular case of the warning at the end of the chapter, not a limiting case of [[#eq-dmax]] that one may still quote.

At $\omega_{\mathrm{amp}}$ the phase is not $\pi/2$. From [[#eq-phase]] and $\omega_0^2 - \omega_{\mathrm{amp}}^2 = 2\gamma^2$,

$$
\tan\delta = \frac{2\gamma\omega_{\mathrm{amp}}}{2\gamma^2} = \frac{\omega_{\mathrm{amp}}}{\gamma},
$$

with $\delta$ still in $(0,\pi/2)$ because the drive is below $\omega_0$. For the numbers of [[#ex-standard]], $\tan\delta = 1.980/0.200 = 9.90$, so $\delta = 84.2^\circ$. The displacement peak is already close to quadrature, which is why it sits so close to the power peak derived next.

::: example Phase and power near the peak {#ex-phase}
For the oscillator of [[#ex-standard]], compute $D$, $\delta$ and the average power at $\omega = 1.90\,\mathrm{rad/s}$ and at $\omega = 3.00\,\mathrm{rad/s}$. The average power is [[#eq-power]] below; use it as a formula here, or recompute it from $\tfrac12 b\omega^2 D^2$.
::: solution
At $\omega = 1.90\,\mathrm{rad/s}$,

$$
\begin{aligned}
\omega_0^2 - \omega^2 &= 4.00 - 3.61 = 0.390,\\
2\gamma\omega &= 0.400\times 1.90 = 0.760,\\
D &= \frac{1}{\sqrt{0.390^2 + 0.760^2}} = \frac{1}{\sqrt{0.7297}} = 1.171\,\mathrm{m}.
\end{aligned}
$$

The phase has a positive tangent $0.760/0.390 = 1.949$, and the denominator $\omega_0^2 - \omega^2$ is positive, so $\delta$ is acute: $\delta = \arctan(1.949) = 1.097\,\mathrm{rad} = 62.8^\circ$. The average power is

$$
\langle P\rangle = \tfrac12 b\omega^2 D^2 = \tfrac12\times 0.400\times 1.90^2\times 1.171^2 = 0.989\,\mathrm{W}.
$$

At $\omega = 3.00\,\mathrm{rad/s}$,

$$
D = \frac{1}{\sqrt{(4.00 - 9.00)^2 + (0.400\times 3.00)^2}} = \frac{1}{\sqrt{25.00 + 1.44}} = \frac{1}{\sqrt{26.44}} = 0.1945\,\mathrm{m}.
$$

Now $\tan\delta = 1.20/(4.00 - 9.00) = -0.240$. The denominator is negative, so $\delta$ lies in $(\pi/2,\pi)$: $\delta = \pi + \arctan(-0.240) = 2.906\,\mathrm{rad} = 166.5^\circ$. The average power is $\tfrac12\times 0.400\times 9.00\times 0.1945^2 = 0.0681\,\mathrm{W}$.

Both frequencies are away from the maximum of $D$, which is $1.256\,\mathrm{m}$ at $1.980\,\mathrm{rad/s}$. At $1.90\,\mathrm{rad/s}$ the amplitude is already $1.171\,\mathrm{m}$ and the power is $0.989\,\mathrm{W}$, against $1.25\,\mathrm{W}$ at $\omega_0$. At three radians per second the drive is past resonance: the lag is obtuse, and both the amplitude and the power have collapsed.
:::
:::

The figure uses these parameters and starts the mass from rest at the origin, so the early motion still contains the transient.

::: widget oscillator
m: 1
c: 0.4
k: 4
F: 1
omega: 1.9
x0: 0
v0: 0
caption: The widget's c is the damping coefficient b of the chapter. With these values the natural frequency is 2. Leave the motion running from rest and watch the transient die into a steady oscillation near omega = 1.9. Move omega through 2 and compare the steady amplitude with the resonance curve; the amplitude peak sits just below 2, while the power prefers 2 itself. Then set c to 0 and omega to 2: the steady formula no longer applies, and the amplitude grows without settling.
:::

::: example Damping too heavy for a peak {#ex-heavy}
Keep $m = 1.00\,\mathrm{kg}$, $k = 4.00\,\mathrm{N/m}$ and $F_0 = 1.00\,\mathrm{N}$, but take $b = 4.00\,\mathrm{kg/s}$. Show that $D(\omega)$ has no maximum at a positive frequency, and compute $D$ at $\omega = 0$, at $\omega = 1.00\,\mathrm{rad/s}$ and at $\omega = \omega_0$.
::: solution
Here $\gamma = b/(2m) = 2.00\,\mathrm{s^{-1}}$ and $\omega_0/\sqrt{2} = \sqrt{2} = 1.414\,\mathrm{s^{-1}}$. Since $\gamma > \omega_0/\sqrt{2}$, [[#thm-amp]] says that $D$ is strictly decreasing on $\omega \ge 0$. Equivalently $Q = \omega_0 m/b = 2.00/4.00 = 0.500$, and $1/\sqrt{2} \approx 0.707$, so $Q$ is below the threshold. The formula $\sqrt{\omega_0^2 - 2\gamma^2}$ is not available: $2\gamma^2 = 8.00 > 4.00$.

The static amplitude is $D(0) = F_0/k = 0.250\,\mathrm{m}$. At $\omega = 1.00\,\mathrm{rad/s}$,

$$
D = \frac{1}{\sqrt{(4.00 - 1.00)^2 + (4.00\times 1.00)^2}} = \frac{1}{\sqrt{9.00 + 16.00}} = \frac{1}{5.00} = 0.200\,\mathrm{m}.
$$

At $\omega = \omega_0 = 2.00\,\mathrm{rad/s}$ the first term under the square root vanishes and $2\gamma\omega = 8.00$, so $D = 1/8.00 = 0.125\,\mathrm{m}$. The amplitude has fallen at every step. Calling $\omega_0$ "the resonance" of this oscillator would invent a peak that the formula does not have. There is still a steady state, and [[#cor-natural]] still gives $D(\omega_0) = F_0/(b\omega_0) = 1/(4.00\times 2.00) = 0.125\,\mathrm{m}$. What has disappeared is the rise of $D$ as $\omega$ approaches $\omega_0$ from below.
:::
:::

## Power, and the phase of the velocity

Amplitude is what a ruler measures. Power is what the driver expends. The instantaneous power delivered by the driving force is the product in [[mechanics/work-energy]]: force times velocity, $P = F_0\cos(\omega t)\,\deriv{x}{t}$. Over one cycle this product changes sign whenever the force and the velocity point opposite ways. The quantity that decides whether the driver is, on average, feeding energy in is the average over a period $T = 2\pi/\omega$.

::: proposition Average power {#prop-power}
Let $b > 0$ and $\omega > 0$, and let $x = D\cos(\omega t - \delta)$ be the steady state of [[#thm-steady]]. The average power delivered by the driving force over one period is

$$
\langle P\rangle = \tfrac12 b\omega^2 D^2 = \frac{F_0^2\gamma}{m}\cdot\frac{\omega^2}{(\omega_0^2 - \omega^2)^2 + (2\gamma\omega)^2}.
$$ {#eq-power}

This average is greatest at $\omega = \omega_0$, for any $\gamma > 0$, and the greatest value is

$$
\langle P\rangle_{\max} = \frac{F_0^2}{2b}.
$$ {#eq-power-max}

The frequencies at which $\langle P\rangle$ has fallen to half of $\langle P\rangle_{\max}$ are

$$
\omega_{\pm} = \pm\gamma + \sqrt{\gamma^2 + \omega_0^2},
$$

with the upper sign for $\omega_+$ and the lower sign for $\omega_-$. Their separation is exactly

$$
\omega_+ - \omega_- = 2\gamma = \frac{\omega_0}{Q},
$$

with no approximation on the size of $\gamma$.
:::

::: proof
The steady velocity is $\deriv{x}{t} = -D\omega\sin(\omega t - \delta)$. Expand the sine:

$$
\sin(\omega t - \delta) = \sin(\omega t)\cos\delta - \cos(\omega t)\sin\delta.
$$

The instantaneous power becomes

$$
P = -F_0 D\omega\left[\cos(\omega t)\sin(\omega t)\cos\delta - \cos^2(\omega t)\sin\delta\right].
$$

The average of $\cos(\omega t)\sin(\omega t) = \tfrac12\sin(2\omega t)$ over a period is zero. The average of $\cos^2(\omega t)$ is $\tfrac12$. Therefore

$$
\langle P\rangle = \tfrac12 F_0 D\omega\sin\delta.
$$

From the coefficient matching in the proof of [[#thm-steady]], $\sin\delta = b\omega D/F_0$. Substitution produces the first form in [[#eq-power]]:

$$
\langle P\rangle = \tfrac12 F_0 D\omega\cdot\frac{b\omega D}{F_0} = \tfrac12 b\omega^2 D^2.
$$

The same result is the average rate at which the damper removes energy. The damper force on the mass is $-b\,\deriv{x}{t}$, so the power it delivers to the mass is $-b(\deriv{x}{t})^2$, and the power it removes is $b(\deriv{x}{t})^2$. Averaging $(\deriv{x}{t})^2 = D^2\omega^2\sin^2(\omega t - \delta)$ gives $\tfrac12 D^2\omega^2$, and the average removed power is $\tfrac12 b\omega^2 D^2$. In the steady state the kinetic energy and the spring energy return to their starting values after one period, so they store nothing on average. The driver must replace exactly what the damper removes. That is why the two calculations agree. While the transient is still alive the storage terms are not periodic and this balance is not the whole energy budget.

To locate the maximum, insert [[#eq-amplitude]] and $b = 2m\gamma$:

$$
\langle P\rangle = \frac{\gamma F_0^2}{m}\cdot\frac{u}{(\omega_0^2 - u)^2 + 4\gamma^2 u}, \qquad u = \omega^2.
$$

Maximising $\langle P\rangle$ for $u > 0$ is the same as minimising

$$
\frac{(\omega_0^2 - u)^2}{u} + 4\gamma^2 = \frac{\omega_0^4}{u} - 2\omega_0^2 + u + 4\gamma^2.
$$

The derivative with respect to $u$ is $-\omega_0^4/u^2 + 1$, which vanishes at $u = \omega_0^2$ and nowhere else on $u > 0$. The second derivative $2\omega_0^4/u^3$ is positive, so the critical point is a minimum of that expression and a maximum of $\langle P\rangle$. Thus the average power is greatest at $\omega = \omega_0$, independently of $\gamma$. At that frequency $D = F_0/(b\omega_0)$, and

$$
\langle P\rangle_{\max} = \tfrac12 b\omega_0^2\left(\frac{F_0}{b\omega_0}\right)^2 = \frac{F_0^2}{2b}.
$$

For the half-power frequencies set $\langle P\rangle = \tfrac12\langle P\rangle_{\max}$. Using $\langle P\rangle_{\max} = F_0^2/(4m\gamma)$ and the expression above, the ratio is

$$
\frac{\langle P\rangle}{\langle P\rangle_{\max}} = \frac{4\gamma^2\omega^2}{(\omega_0^2 - \omega^2)^2 + 4\gamma^2\omega^2}.
$$

Setting the ratio equal to $\tfrac12$ and clearing the denominator yields $(\omega_0^2 - \omega^2)^2 = 4\gamma^2\omega^2$, so $\omega_0^2 - \omega^2 = \pm 2\gamma\omega$. The two quadratics are $\omega^2 + 2\gamma\omega - \omega_0^2 = 0$ and $\omega^2 - 2\gamma\omega - \omega_0^2 = 0$. The positive roots are $\omega_- = -\gamma + \sqrt{\gamma^2 + \omega_0^2}$ and $\omega_+ = \gamma + \sqrt{\gamma^2 + \omega_0^2}$. Subtracting them leaves $2\gamma$. Since $Q = \omega_0/(2\gamma)$, the width $2\gamma$ is $\omega_0/Q$.
:::

For the oscillator of [[#ex-standard]] the greatest average power is $F_0^2/(2b) = 1/(0.800) = 1.25\,\mathrm{W}$, and the half-power width is $2\gamma = 0.400\,\mathrm{rad/s}$. The endpoints are

$$
\omega_- = -0.200 + \sqrt{4.04} = 1.810\,\mathrm{rad/s}, \qquad \omega_+ = 0.200 + \sqrt{4.04} = 2.210\,\mathrm{rad/s}.
$$

A light-damping sketch would have placed them at $\omega_0\pm\gamma$, that is at $1.80$ and $2.20$. The exact ends differ from that sketch by a hundredth of a radian per second. The width is exact either way: it is $2\gamma$, not an approximation to $2\gamma$.

Half power is not half amplitude. Because $\langle P\rangle = \tfrac12 b\omega^2 D^2$, a change in $\omega$ changes the relation between power and amplitude. Quoting $D_{\max}/\sqrt{2}$ at $\omega_{\pm}$ answers a different question from the one [[#prop-power]] solved.

::: proposition Velocity in phase with the force {#prop-velocity}
In the steady state of [[#thm-steady]], with $\omega > 0$ and $b > 0$, the velocity is in phase with the driving force if and only if $\omega = \omega_0$. At that frequency the velocity amplitude is $F_0/b$, and $\langle P\rangle = \tfrac12 F_0$ times that velocity amplitude.
:::

::: proof
Differentiating [[#eq-steady]] gives

$$
\deriv{x}{t} = D\omega\cos(\omega t - \delta + \pi/2).
$$

The velocity is a cosine with lag $\delta - \pi/2$ behind $F_0\cos(\omega t)$. That lag vanishes if and only if $\delta = \pi/2$. By [[#thm-steady]], for $\omega > 0$ and $b > 0$, the lag $\delta$ equals $\pi/2$ if and only if $\omega = \omega_0$. The velocity amplitude is then $D(\omega_0)\,\omega_0 = F_0/b$. The average of $\cos^2(\omega t)$ is $\tfrac12$, so the average of force times an in-phase velocity of amplitude $F_0/b$ is $\tfrac12 F_0\cdot(F_0/b) = F_0^2/(2b)$, in agreement with [[#eq-power-max]].
:::

This is why the power peaks at $\omega_0$ even though $D$ peaks slightly lower. Below $\omega_0$ the velocity leads the force by less than a right angle only after $\delta$ has been subtracted from $\pi/2$; the component of velocity in step with the force is $D\omega\sin\delta$, not the whole of $D\omega$. Above $\omega_0$ the velocity acquires a component opposed to the force. The in-phase component, which is the only one that does net work, is largest at quadrature of the displacement, that is at $\omega_0$.

::: quiz
For a driven damped oscillator with $b > 0$, where is the average power delivered by the driver greatest?
- [ ] At the amplitude-resonance frequency $\sqrt{\omega_0^2 - 2\gamma^2}$, because that is where the mass moves farthest
- [x] At the natural frequency $\omega_0$, where the velocity is in phase with the force
- [ ] At $\omega = 0$, where the displacement is in phase with the force and the static deflection is $F_0/k$
- [ ] At a frequency that tends to infinity as the damping is removed
::: solution
[[#prop-power]] puts the maximum of $\langle P\rangle$ at $\omega = \omega_0$ for every $\gamma > 0$. The amplitude peak of [[#thm-amp]] is a different frequency, lower than $\omega_0$ by a fractional amount of order $\gamma^2/\omega_0^2$. At $\omega = 0$ the velocity is zero, so the average power is zero even though the displacement follows the force. Removing the damping raises the peak power without moving it off $\omega_0$; the peak becomes taller, not further to the right.
:::
:::

## Transients, and exact resonance without damping

The steady state is the particular solution. The general solution is that particular solution plus the general free motion. While $b > 0$ the free motion is a linear combination of decaying exponentials, possibly multiplied by $t$ in the critical case, or by a cosine of $\omega_1 t$ in the underdamped case, with

$$
\omega_1 = \sqrt{\omega_0^2 - \gamma^2}
$$

when $\gamma < \omega_0$. The two free constants are fixed by $x(0)$ and $\deriv{x}{t}(0)$. They are not fixed by the drive. After a time of several $1/\gamma$ the exponential factor $e^{-\gamma t}$ has crushed the free piece, and the motion is indistinguishable from [[#eq-steady]]. Quoting $D$ for the amplitude at early times is a different, and usually wrong, description.

::: example Starting from rest at resonance {#ex-transient}
The oscillator of [[#ex-standard]] is driven at $\omega = \omega_0 = 2.00\,\mathrm{rad/s}$ and released from rest at $x = 0$. Find the motion, and estimate when the transient has fallen to one percent of its initial size.
::: solution
The steady piece at $\omega_0$ is $x_p = 1.25\sin(2.00\, t)$, from [[#ex-standard]], and its velocity is $2.50\cos(2.00\, t)$. The free motion is underdamped: $\gamma = 0.200 < \omega_0$, and

$$
\omega_1 = \sqrt{4.00 - 0.0400} = \sqrt{3.96} = 1.990\,\mathrm{rad/s}.
$$

Write $x_h = e^{-0.200 t}(A\cos\omega_1 t + B\sin\omega_1 t)$. The initial displacement $x_p(0) + x_h(0) = 0$ gives $A = 0$, because $x_p(0) = 0$. Then $x_h = B e^{-0.200 t}\sin(\omega_1 t)$, and

$$
\deriv{x_h}{t}(0) = B\omega_1.
$$

The initial velocity is zero, so $2.50 + B\omega_1 = 0$ and $B = -2.50/\omega_1 = -1.256\,\mathrm{m}$. The motion is

$$
x(t) = 1.25\sin(2.00\, t) - 1.256\, e^{-0.200 t}\sin(1.990\, t),
$$

in metres. The coefficient $1.256$ happens to equal $D_{\max}$ for this oscillator, because $D(\omega_0)\,\omega_0/\omega_1 = F_0/(b\omega_1)$ and [[#eq-dmax]] is the same quantity. That coincidence is special to release from rest at the origin; a different initial state produces a different $B$.

The free amplitude decays as $e^{-0.200 t}$. It is one percent of its value at $t = 0$ when $0.200\, t = \ln 100$, so $t = \ln(100)/0.200 = 23.0\,\mathrm{s}$. The corresponding free period is $2\pi/\omega_1 = 3.16\,\mathrm{s}$, and $23.0/3.16 \approx 7.3$ free cycles. A steady-state description of this release is a description of the motion after a few tens of seconds, not of the first cycle. The initial velocity of the steady piece alone is $2.50\,\mathrm{m/s}$; the transient cancels it.
:::
:::

If the damper is removed, the homogeneous solution no longer dies. Two sub-cases arise. Off resonance a bounded particular solution of the form [[#eq-steady]] still exists, and the general solution is a sum of two persistent sinusoids. Exactly on resonance that particular solution does not exist, and the amplitude grows in proportion to $t$.

::: proposition Secular resonance of the undamped oscillator {#prop-secular}
Suppose $b = 0$ and $\omega = \omega_0$, with $F_0 \ne 0$. Then [[#eq-driven]] has no solution of the form [[#eq-steady]] with $D$ constant. A particular solution is

$$
x_p(t) = \frac{F_0}{2m\omega_0}\, t\sin(\omega_0 t).
$$ {#eq-secular}

The general solution is $x_p$ plus an arbitrary free oscillation $A\cos(\omega_0 t) + B\sin(\omega_0 t)$. The term in $t\sin(\omega_0 t)$ is unbounded.
:::

::: proof
[[#eq-amplitude]] has a zero denominator when $b = 0$ and $\omega = \omega_0$, so the derivation of [[#thm-steady]] stops there. For the particular solution that is claimed, set $A_s = F_0/(2m\omega_0)$ and $x_p = A_s t\sin(\omega_0 t)$. Two differentiations give

$$
\begin{aligned}
\deriv{x_p}{t} &= A_s\sin(\omega_0 t) + A_s\omega_0 t\cos(\omega_0 t),\\
\deriv{^2 x_p}{t^2} &= 2A_s\omega_0\cos(\omega_0 t) - A_s\omega_0^2 t\sin(\omega_0 t).
\end{aligned}
$$

Hence, using $b = 0$ and $k = m\omega_0^2$,

$$
m\deriv{^2 x_p}{t^2} + kx_p = m\left[2A_s\omega_0\cos(\omega_0 t)\right] = F_0\cos(\omega_0 t),
$$

because $2m A_s\omega_0 = F_0$ by the choice of $A_s$. So $x_p$ is a particular solution. The associated homogeneous equation is the undamped oscillator equation, whose general solution is $A\cos(\omega_0 t) + B\sin(\omega_0 t)$. The factor $t$ in $x_p$ is not cancelled by any choice of $A$ and $B$. The motion is unbounded.
:::

The factor $t\sin(\omega_0 t)$ is the secular term. Its envelope $(F_0/(2m\omega_0))\, t$ grows without a ceiling, so there is no steady $D$ to quote. A drive at $\omega_0$ with no dissipation adds a shove along the velocity on every cycle. Any positive $b$, however small, eventually balances that shove at the finite amplitude $F_0/(b\omega_0)$. The idealisation $b = 0$ is the statement that the balance never arrives.

Off resonance and still undamped, the steady formula survives and the two frequencies beat against each other.

::: example An undamped drive off resonance {#ex-beats}
Take $m = 1.00\,\mathrm{kg}$, $k = 4.00\,\mathrm{N/m}$, $b = 0$ and $F_0 = 1.00\,\mathrm{N}$, driven at $\omega = 1.80\,\mathrm{rad/s}$ and released from rest at $x = 0$. Find the motion and the greatest displacement it reaches.
::: solution
Here $\omega \ne \omega_0$, so [[#thm-steady]] still applies. With $\gamma = 0$ and $\omega < \omega_0$ one has $\delta = 0$ and

$$
D = \frac{F_0/m}{\omega_0^2 - \omega^2} = \frac{1}{4.00 - 3.24} = \frac{1}{0.760} = \frac{25}{19} = 1.316\,\mathrm{m}.
$$

The general solution is $x = D\cos(\omega t) + A\cos(\omega_0 t) + B\sin(\omega_0 t)$. The condition $x(0) = 0$ gives $D + A = 0$. The velocity is $-D\omega\sin(\omega t) - A\omega_0\sin(\omega_0 t) + B\omega_0\cos(\omega_0 t)$, so $\deriv{x}{t}(0) = B\omega_0 = 0$ and $B = 0$. Therefore

$$
x(t) = D\left[\cos(1.80\, t) - \cos(2.00\, t)\right].
$$

The difference of cosines is $2\sin(1.90\, t)\sin(0.100\, t)$, and

$$
x(t) = \frac{50}{19}\sin(1.90\, t)\sin(0.100\, t).
$$

The factor $\sin(0.100\, t)$ is a slow envelope. Its absolute value never exceeds $1$, so the displacement never exceeds $50/19 = 2.632\,\mathrm{m}$, which is twice the particular-solution amplitude. The envelope returns to zero when $0.100\, t = n\pi$, and the time from one zero to the next is $10\pi = 31.42\,\mathrm{s}$. The motion is large and throbbing, but it is bounded. The unbounded case is $\omega = 2.00\,\mathrm{rad/s}$ with the same $b = 0$, and there [[#eq-secular]] replaces this formula. The throb itself, two close frequencies heard as a single tone that swells and fades, is taken up again for sound in [[oscillations/superposition]].
:::
:::

A soft mount uses the high-frequency tail on purpose. Drive the standard oscillator at $\omega = 8.00\,\mathrm{rad/s}$, four times $\omega_0$, with $F_0 = 1.00\,\mathrm{N}$:

$$
D = \frac{1}{\sqrt{(4.00 - 64.00)^2 + (0.400\times 8.00)^2}} = \frac{1}{\sqrt{3610.24}} = 0.01664\,\mathrm{m}.
$$

Relative to the static displacement $0.250\,\mathrm{m}$ the factor is $0.0666$, close to $(\omega_0/\omega)^2 = 0.0625$. The force reaching the support has amplitude $D\sqrt{k^2 + (b\omega)^2} = 0.0853\,\mathrm{N}$. The spring's share is $kD = 0.0666\,\mathrm{N}$ and the damper's share is $b\omega D = 0.0533\,\mathrm{N}$. At high frequency the damper transmits about as much as the spring, so isolation wants $\omega_0$ well below the operating frequency and does not want a large $b$. The weight $mg$ is a static shift of equilibrium and is not part of $F_0$.

## Where this leads

A string is a line of coupled oscillators: a drive at one point launches a wave, which is [[oscillations/travelling-waves]], rather than a single $D$. Two close driving frequencies give the throb of [[#ex-beats]], developed for waves in [[oscillations/superposition]]. The same equation, with charge in place of $x$, is the series LCR circuit, and the amplitude, phase and power peak transfer once the coefficients are identified. What does not transfer is every large sway of a structure. Wind on a flexible deck can feed energy through a force that depends on the deck's own velocity. That is negative damping, not the curve of [[#thm-amp]]. The curve here answers a prescribed $F_0\cos(\omega t)$ with $b > 0$, after the transient has died.

::: warning No steady amplitude without damping, and a quadrant to watch
The transient dies only if $b > 0$. A drive at $\omega = \omega_0$ with $b = 0$ produces the secular term [[#eq-secular]], whose envelope grows in proportion to $t$. Do not quote a steady $D$ in that case: [[#eq-amplitude]] has a zero denominator, and the expression is not a number. A very small but positive $b$ is different. The steady amplitude $F_0/(b\omega_0)$ is then large and finite, and it is reached only after a time of order $1/\gamma$, which may be long.

Two further substitutions are wrong often enough to name. The frequency of greatest $D$ is $\omega_{\mathrm{amp}}$, not $\omega_0$, unless you have already checked that $\gamma$ is small enough for the difference to be invisible. The frequency of greatest average power is $\omega_0$, not $\omega_{\mathrm{amp}}$. And a calculator value of $\arctan(2\gamma\omega/(\omega_0^2 - \omega^2))$ lies in $(-\pi/2,\pi/2)$. When $\omega > \omega_0$ the phase lag used in [[#eq-steady]] is that output plus $\pi$, an angle in $(\pi/2,\pi)$, not a negative angle.
:::

::: history Resonance in the Theory of Sound
John William Strutt, Lord Rayleigh, published *The Theory of Sound* in 1877. The first volume treats a system with one degree of freedom, a periodic driving force, and the friction that keeps a resonant peak finite, then turns to strings, bars, membranes and columns of air. The amplitude and phase of [[#thm-steady]] are the mechanical skeleton of that acoustic account. Hermann von Helmholtz had already made tuned cavities familiar in *On the Sensations of Tone* (1863). Rayleigh organised the mathematics of the forced, damped steady state around them.
:::

::: summary
- The driven equation is $m x'' + b x' + k x = F_0\cos(\omega t)$. Its general solution is the free damped motion plus one steady state. The free piece dies if and only if $b > 0$.
- For $b > 0$ the steady state is $x = D\cos(\omega t - \delta)$, with $D$ and $\tan\delta$ given by [[#eq-amplitude]] and [[#eq-phase]]. The lag $\delta$ lies in $(0,\pi)$: acute below $\omega_0$, a right angle at $\omega_0$, obtuse above $\omega_0$.
- The displacement amplitude is greatest at $\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2}$ when $\gamma < \omega_0/\sqrt{2}$, and at $\omega = 0$ otherwise. At $\omega_0$ one has $D = F_0/(b\omega_0) = Q F_0/k$.
- The average power is $\tfrac12 b\omega^2 D^2$. It is greatest at $\omega = \omega_0$, where the velocity is in phase with the force, and the greatest value is $F_0^2/(2b)$. The half-power width is exactly $2\gamma = \omega_0/Q$.
- Light damping puts $\omega_{\mathrm{amp}}$ only a fractional amount of order $\gamma^2/\omega_0^2$ below $\omega_0$. Heavy damping, $Q \le 1/\sqrt{2}$, produces no peak at nonzero frequency.
- If $b = 0$ and $\omega = \omega_0$, the amplitude grows as $(F_0/(2m\omega_0))\, t$. There is no steady $D$. Off resonance, with $b = 0$, the motion stays bounded and is a sum of two persistent sinusoids.
- Inverse tangent on a calculator does not place $\delta$ in the correct quadrant when $\omega > \omega_0$. Add $\pi$.
:::

## Exercises

::: exercise Natural frequency of a stiffer spring {#exr-omega level=1 check="8"}
A mass $m = 0.500\,\mathrm{kg}$ is attached to a spring of constant $k = 32.0\,\mathrm{N/m}$. There is no need for the damping or the drive in this question. Find the natural angular frequency $\omega_0$ in $\mathrm{rad/s}$.
::: solution
By the definition used in [[#def-driven]],

$$
\omega_0 = \sqrt{\frac{k}{m}} = \sqrt{\frac{32.0}{0.500}} = \sqrt{64.0} = 8.00\,\mathrm{rad/s}.
$$

The angular frequency is $8.00\,\mathrm{rad/s}$. The corresponding period of free undamped motion would be $2\pi/8.00$, which was not asked for.
:::
:::

::: exercise The damping constant {#exr-gamma level=1 check="0.2"}
A mass $m = 2.00\,\mathrm{kg}$ is damped by a linear drag coefficient $b = 0.800\,\mathrm{kg/s}$. Find $\gamma = b/(2m)$ in $\mathrm{s^{-1}}$.
::: solution
The damping constant in [[#eq-driven-reduced]] is

$$
\gamma = \frac{b}{2m} = \frac{0.800}{2\times 2.00} = \frac{0.800}{4.00} = 0.200\,\mathrm{s^{-1}}.
$$

The value is $0.200\,\mathrm{s^{-1}}$. It is not $b/m$, which would be twice as large and is the coefficient $2\gamma$ in front of the first derivative.
:::
:::

::: exercise Quality factor of the standard oscillator {#exr-q level=1 check="5"}
For $m = 1.00\,\mathrm{kg}$, $b = 0.400\,\mathrm{kg/s}$ and $k = 4.00\,\mathrm{N/m}$, find the quality factor $Q = \omega_0 m/b$. The answer is a pure number.
::: solution
First $\omega_0 = \sqrt{k/m} = \sqrt{4.00} = 2.00\,\mathrm{rad/s}$. Then

$$
Q = \frac{\omega_0 m}{b} = \frac{2.00\times 1.00}{0.400} = 5.00.
$$

By [[#cor-natural]] this is also the factor $D(\omega_0)/(F_0/k)$ for any drive amplitude. The quality factor is $5.00$.
:::
:::

::: exercise Where the amplitude peaks {#exr-wamp level=2 check="sqrt(3.92)"}
For the oscillator $m = 1.00\,\mathrm{kg}$, $b = 0.400\,\mathrm{kg/s}$, $k = 4.00\,\mathrm{N/m}$, find the angular frequency of amplitude resonance, in $\mathrm{rad/s}$.
::: hint
Check first that $\gamma < \omega_0/\sqrt{2}$, and then use [[#eq-amp-res]].
:::
::: solution
As in [[#ex-standard]], $\omega_0 = 2.00\,\mathrm{rad/s}$ and $\gamma = 0.200\,\mathrm{s^{-1}}$. The threshold is $\omega_0/\sqrt{2} = 1.414\,\mathrm{s^{-1}}$, and $0.200$ lies below it, so a nonzero peak exists. [[#thm-amp]] gives

$$
\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2} = \sqrt{4.00 - 2\times 0.0400} = \sqrt{3.92}\,\mathrm{rad/s}.
$$

Numerically $\sqrt{3.92} = 1.980\,\mathrm{rad/s}$, just below $\omega_0$. The answer $\sqrt{3.92}$ is exact for these inputs.
:::
:::

::: exercise Greatest average power {#exr-pmax level=2 check="5/4"}
A driving force of amplitude $F_0 = 1.00\,\mathrm{N}$ acts on a damped oscillator with $b = 0.400\,\mathrm{kg/s}$. Find the greatest average power the driver can deliver in the steady state, in watts, by choice of the driving frequency.
::: solution
[[#prop-power]] says the maximum is at $\omega = \omega_0$ and equals $F_0^2/(2b)$, for any $m$ and $k$ as long as $b > 0$ and a natural frequency exists. Therefore

$$
\langle P\rangle_{\max} = \frac{1.00^2}{2\times 0.400} = \frac{1}{0.800} = 1.25 = \frac{5}{4}\,\mathrm{W}.
$$

The mass and the spring constant do not appear. They move $\omega_0$, but the height of the power peak is set by how hard the damper can dissipate when the velocity amplitude is $F_0/b$. The greatest average power is $5/4\,\mathrm{W}$.
:::
:::

::: exercise Phase tangent below resonance {#exr-tan level=2 check="2/15"}
For $m = 1.00\,\mathrm{kg}$, $b = 0.400\,\mathrm{kg/s}$, $k = 4.00\,\mathrm{N/m}$ and driving frequency $\omega = 1.00\,\mathrm{rad/s}$, find $\tan\delta$ for the steady-state lag. The answer is a pure number.
::: solution
Here $\omega_0^2 = 4.00$ and $2\gamma = b/m = 0.400\,\mathrm{s^{-1}}$. [[#eq-phase]] gives

$$
\tan\delta = \frac{2\gamma\omega}{\omega_0^2 - \omega^2} = \frac{0.400\times 1.00}{4.00 - 1.00} = \frac{0.400}{3.00} = \frac{2}{15}.
$$

The denominator is positive, so $\delta = \arctan(2/15)$ itself, about $7.59^\circ$, without adding $\pi$. The value asked for is the tangent, $2/15$.
:::
:::

::: exercise The upper half-power frequency {#exr-half level=3 check="0.2+sqrt(4.04)"}
For $m = 1.00\,\mathrm{kg}$, $b = 0.400\,\mathrm{kg/s}$ and $k = 4.00\,\mathrm{N/m}$, the average power in the steady state is greatest at $\omega_0$. Find the higher of the two driving angular frequencies at which that average power has fallen to half of its maximum. Give the answer in $\mathrm{rad/s}$.
::: hint
Set $(\omega_0^2 - \omega^2)^2 = (2\gamma\omega)^2$ and keep the root that lies above $\omega_0$. With $\gamma = 0.200\,\mathrm{s^{-1}}$ the higher root is $\gamma + \sqrt{\gamma^2 + \omega_0^2}$.
:::
::: solution
From [[#ex-standard]], $\omega_0 = 2.00\,\mathrm{rad/s}$ and $\gamma = 0.200\,\mathrm{s^{-1}}$. [[#prop-power]] places the half-power points where $\omega_0^2 - \omega^2 = \pm 2\gamma\omega$. The choice of the minus sign on the right-hand side rearranges to

$$
\omega^2 - 2\gamma\omega - \omega_0^2 = 0.
$$

The positive root of that quadratic is

$$
\omega_+ = \gamma + \sqrt{\gamma^2 + \omega_0^2} = 0.200 + \sqrt{0.0400 + 4.00} = 0.200 + \sqrt{4.04}.
$$

Numerically $\sqrt{4.04} = 2.00998$, so $\omega_+ = 2.210\,\mathrm{rad/s}$. The lower partner is $-0.200 + \sqrt{4.04} = 1.810\,\mathrm{rad/s}$, and the separation is $0.400\,\mathrm{rad/s} = 2\gamma$. The frequency asked for is $0.200 + \sqrt{4.04}\,\mathrm{rad/s}$.
:::
:::

::: exercise Quadrature of the velocity {#exr-velocity level=3}
Prove that in the steady state of [[#eq-driven]], with $b > 0$, $\omega > 0$ and $F_0 > 0$, the velocity is in phase with $F_0\cos(\omega t)$ if and only if $\omega = \omega_0$. Deduce that the velocity amplitude at that frequency is $F_0/b$, and that a drive at the amplitude-resonance frequency $\omega_{\mathrm{amp}}$ does not put the velocity in phase with the force unless $\gamma = 0$.
::: hint
Write the velocity as a cosine and read its lag off $\delta$. Then use the quadrant statement in [[#thm-steady]].
:::
::: solution
The steady displacement is $x = D\cos(\omega t - \delta)$ with $D > 0$ and $\delta\in (0,\pi)$. Differentiation gives

$$
\deriv{x}{t} = -D\omega\sin(\omega t - \delta) = D\omega\cos(\omega t - \delta + \pi/2).
$$

This is a cosine of amplitude $D\omega$ whose lag behind $F_0\cos(\omega t)$ is $\delta - \pi/2$. The lag is zero if and only if $\delta = \pi/2$. By [[#thm-steady]], $\delta = \pi/2$ if and only if $\omega = \omega_0$, because that is the unique positive frequency at which $\cos\delta = 0$ and $\sin\delta > 0$. At that frequency [[#cor-natural]] gives $D = F_0/(b\omega_0)$, so the velocity amplitude is

$$
D\omega_0 = \frac{F_0}{b}.
$$

Now suppose $0 < \gamma < \omega_0/\sqrt{2}$, so that $\omega_{\mathrm{amp}} = \sqrt{\omega_0^2 - 2\gamma^2}$ is real and positive. Then $\omega_{\mathrm{amp}} < \omega_0$, and [[#thm-steady]] places $\delta$ in $(0,\pi/2)$ rather than at $\pi/2$. The velocity lag $\delta - \pi/2$ is therefore negative: the velocity leads the force. Equality $\omega_{\mathrm{amp}} = \omega_0$ would require $\gamma = 0$, which is outside the hypothesis $b > 0$ of the steady damped state. For any positive damping, amplitude resonance and velocity resonance are different frequencies.
:::
:::
