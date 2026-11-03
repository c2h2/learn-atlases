An engineer tuning the suspension of a car, the autopilot of a drone or the compensation network of an op-amp does not think in impulse responses or even in frequency responses first. She looks at a few crosses and circles in a complex plane, the **poles** and **zeros** of the system function, and reads off from their positions whether the system is stable, how fast it settles, whether it overshoots and roughly what its frequency response looks like. That plane is the $s$-plane of the **Laplace transform**, and this lesson explains why it carries so much information.

You have already used the Laplace transform as a tool for solving circuits with initial conditions in [[circuits-2/laplace-circuit-analysis]], and its mathematics is developed in the Maths Atlas lesson [The Laplace transform](/learn/maths/lesson.php?c=ode&l=laplace-transform). Here we take the systems view. We define the **bilateral** transform as a generalisation of the Fourier transform to complex frequencies $s = \sigma + j\omega$, which lets us handle signals and systems that grow, and we meet the concept that the circuits course could leave implicit: the **region of convergence** (ROC). The ROC is what connects an algebraic expression $H(s)$ to a definite impulse response, and it is the key to reading causality and stability from a pole–zero plot. We finish with the unilateral transform for initial conditions, the geometric interpretation of the frequency response, and second-order systems, the workhorses of filter and control design.

## The bilateral Laplace transform {#sec-definition}

The Fourier transform fails for signals such as $e^{t}u(t)$ that grow: the integral $\int x(t)e^{-j\omega t}\,\dd t$ diverges. Multiplying by a decaying exponential $e^{-\sigma t}$ first rescues it. The Fourier transform of $x(t)e^{-\sigma t}$ is $\int x(t)e^{-(\sigma + j\omega)t}\,\dd t$, a function of the single complex variable $s = \sigma + j\omega$.

::: definition Bilateral Laplace transform and region of convergence {#def-laplace}
The **(bilateral) Laplace transform** of $x(t)$ is

$$
X(s) = \int_{-\infty}^{\infty}x(t)\,e^{-st}\,\dd t,\qquad s = \sigma + j\omega,
$$ {#eq-laplace}

defined for those $s$ for which the integral converges absolutely. That set is the **region of convergence (ROC)**. A Laplace transform consists of the expression $X(s)$ *together with* its ROC. If the ROC contains the imaginary axis, the Fourier transform exists and $X(j\omega) = X(s)\big|_{s=j\omega}$.
:::

Convergence depends only on $\sigma = \operatorname{Re}s$, because $\lvert x(t)e^{-st}\rvert = \lvert x(t)\rvert e^{-\sigma t}$. So the ROC is always a set of vertical lines in the $s$-plane: a vertical strip, a half-plane or the whole plane.

::: example Same formula, different signals {#ex-same-formula}
Find the Laplace transforms of $x_1(t) = e^{-at}u(t)$ and $x_2(t) = -e^{-at}u(-t)$, with $a$ real.
::: solution
For $x_1$:

$$
X_1(s) = \int_0^\infty e^{-(s + a)t}\,\dd t = \frac{1}{s + a},\qquad \text{ROC: } \operatorname{Re}s > -a,
$$

since $e^{-(s+a)t} \to 0$ as $t \to \infty$ exactly when $\operatorname{Re}(s + a) > 0$. For $x_2$:

$$
X_2(s) = -\int_{-\infty}^{0}e^{-(s + a)t}\,\dd t = -\left[\frac{e^{-(s+a)t}}{-(s + a)}\right]_{-\infty}^{0} = \frac{1}{s + a},\qquad \text{ROC: } \operatorname{Re}s < -a,
$$

since now we need $e^{-(s+a)t} \to 0$ as $t \to -\infty$, i.e. $\operatorname{Re}(s + a) < 0$. The two signals, one right-sided and one left-sided, have *the same algebraic transform*; only the ROC tells them apart. In both cases the boundary of the ROC passes through the **pole** $s = -a$, where $X(s)$ is infinite.
:::
:::

For rational transforms $X(s) = N(s)/D(s)$, the roots of $N$ are the **zeros** and the roots of $D$ the **poles**; we draw zeros as $\circ$ and poles as $\times$ in the $s$-plane. A rational $X(s)$ is determined, up to a constant gain, by its poles and zeros; together with the ROC, that determines $x(t)$.

::: theorem Properties of the region of convergence {#thm-roc}
1. The ROC consists of vertical strips: whether $s$ belongs to it depends only on $\operatorname{Re}s$.
2. For a rational transform, the ROC contains no poles, and it is bounded by poles or extends to infinity.
3. If $x$ has finite duration and is absolutely integrable, the ROC is the entire $s$-plane.
4. If $x$ is **right-sided** ($x(t) = 0$ for $t < T_1$) and $\operatorname{Re}s = \sigma_0$ is in the ROC, then every $s$ with $\operatorname{Re}s > \sigma_0$ is in the ROC. For a rational transform the ROC is the half-plane to the right of the rightmost pole.
5. If $x$ is **left-sided** ($x(t) = 0$ for $t > T_2$), the ROC is a left half-plane; for a rational transform, the half-plane to the left of the leftmost pole.
6. If $x$ is **two-sided**, the ROC is a vertical strip (possibly empty) between two poles.
:::

::: proof
(1) was shown above. (2) At a pole $X(s)$ is infinite, so the integral cannot converge there. (3) Over a finite interval, $e^{-\sigma t}$ is bounded for every $\sigma$. (4) For a right-sided $x$ and $\sigma > \sigma_0$, $\lvert x(t)\rvert e^{-\sigma t} = \lvert x(t)\rvert e^{-\sigma_0t}e^{-(\sigma - \sigma_0)t}$, and for $t \ge T_1$ the last factor is at most $e^{-(\sigma - \sigma_0)T_1}$, a constant; so $\int\lvert x\rvert e^{-\sigma t}$ is finite whenever $\int\lvert x\rvert e^{-\sigma_0t}$ is. (5) is the mirror image. (6) Split $x$ into a right-sided and a left-sided part; the ROC is the intersection of a right half-plane and a left half-plane.
:::

::: example A two-sided signal {#ex-two-sided}
Find the Laplace transform and ROC of $x(t) = e^{-2t}u(t) + e^{-t}u(-t)$.
::: solution
The first term gives $\frac{1}{s + 2}$ with ROC $\operatorname{Re}s > -2$. The second, by [[#ex-same-formula]] with $a = 1$ and a sign change, gives $-\frac{1}{s + 1}$ with ROC $\operatorname{Re}s < -1$. The sum converges where both do:

$$
X(s) = \frac{1}{s + 2} - \frac{1}{s + 1} = \frac{-1}{(s + 1)(s + 2)},\qquad -2 < \operatorname{Re}s < -1 .
$$

The ROC is the strip between the poles. It does not contain the imaginary axis, so $x$ has no Fourier transform: indeed $e^{-t}u(-t)$ grows without bound as $t \to -\infty$. Had the second term been $e^{t}u(-t)$, the strip would be $-2 < \operatorname{Re}s < 1$, which contains the $j\omega$ axis, and the Fourier transform would exist.
:::
:::

## Properties and inversion {#sec-properties}

The Laplace transform inherits the properties of the Fourier transform, with $j\omega$ replaced by $s$; the new element is what happens to the ROC.

| property | signal | transform | ROC |
|---|---|---|---|
| linearity | $ax_1 + bx_2$ | $aX_1 + bX_2$ | at least $R_1\cap R_2$ |
| time shift | $x(t - t_0)$ | $e^{-st_0}X(s)$ | $R$ |
| shift in $s$ | $e^{s_0t}x(t)$ | $X(s - s_0)$ | $R$ shifted by $\operatorname{Re}s_0$ |
| time scaling | $x(at)$ | $\frac{1}{\lvert a\rvert}X(s/a)$ | $aR$ |
| differentiation | $\dd x/\dd t$ | $sX(s)$ | at least $R$ |
| integration | $\int_{-\infty}^tx(\tau)\,\dd\tau$ | $X(s)/s$ | at least $R\cap\{\operatorname{Re}s > 0\}$ |
| multiplication by $t$ | $t\,x(t)$ | $-\dd X/\dd s$ | $R$ |
| convolution | $x_1 * x_2$ | $X_1(s)X_2(s)$ | at least $R_1\cap R_2$ |

The ROC can be larger than the intersection when a pole is cancelled by a zero. Among the transforms that follow from these and [[#ex-same-formula]]: $\delta(t) \leftrightarrow 1$ (all $s$), $u(t) \leftrightarrow 1/s$ ($\operatorname{Re}s > 0$), $t^ne^{-at}u(t) \leftrightarrow n!/(s + a)^{n+1}$ ($\operatorname{Re}s > -a$), and $e^{-at}\cos(\omega_0t)u(t) \leftrightarrow (s + a)/((s + a)^2 + \omega_0^2)$ ($\operatorname{Re}s > -a$).

The inverse transform is formally a contour integral along a vertical line inside the ROC, $x(t) = \frac{1}{2\pi j}\int_{\sigma - j\infty}^{\sigma + j\infty}X(s)e^{st}\,\dd s$ (the inverse Fourier transform of $x(t)e^{-\sigma t}$). In practice rational transforms are inverted by **partial fractions**, and the ROC decides, term by term, whether each pole gives a right-sided or a left-sided exponential: a pole to the *left* of the ROC gives a right-sided term $e^{-at}u(t)$; a pole to the *right* of the ROC gives a left-sided term $-e^{-at}u(-t)$.

::: example One expression, three signals {#ex-three-roc}
Find all signals with Laplace transform $X(s) = \dfrac{1}{(s + 1)(s + 2)}$, and say which has a Fourier transform.
::: solution
Partial fractions: $X(s) = \dfrac{1}{s + 1} - \dfrac{1}{s + 2}$ (coefficients by cover-up: at $s = -1$, $1/(-1 + 2) = 1$; at $s = -2$, $1/(-2 + 1) = -1$). The poles at $-1$ and $-2$ divide the plane into three possible ROCs.

**$\operatorname{Re}s > -1$** (both poles to the left): $x(t) = (e^{-t} - e^{-2t})u(t)$. Right-sided; the ROC contains the $j\omega$ axis, so the Fourier transform exists.

**$-2 < \operatorname{Re}s < -1$** (pole $-2$ left, pole $-1$ right): $x(t) = -e^{-t}u(-t) - e^{-2t}u(t)$. Two-sided, no Fourier transform.

**$\operatorname{Re}s < -2$** (both poles to the right): $x(t) = (-e^{-t} + e^{-2t})u(-t)$. Left-sided, growing as $t \to -\infty$, no Fourier transform.
:::
:::

## System functions, causality and stability {#sec-system-function}

For an LTI system with impulse response $h(t)$, the Laplace transform $H(s)$ is the **system function** or **transfer function**, the eigenvalue of [[signals-systems/convolution#thm-eigen]] for the input $e^{st}$. By the convolution property, $Y(s) = H(s)X(s)$. The properties of the system can be read from $H(s)$ and its ROC.

::: theorem Causality and stability from the system function {#thm-causal-stable}
For an LTI system with system function $H(s)$:

1. If the system is **causal**, the ROC of $H(s)$ is a right half-plane. For rational $H(s)$, the system is causal if and only if the ROC is the half-plane to the right of the rightmost pole.
2. The system is **BIBO stable** if and only if the ROC of $H(s)$ contains the imaginary axis $\operatorname{Re}s = 0$.
3. Consequently, a causal system with rational $H(s)$ is stable if and only if **all its poles lie in the open left half-plane**, $\operatorname{Re}s < 0$.
:::

::: proof
(1) A causal $h$ is right-sided, so by [[#thm-roc]] its ROC is a right half-plane; for rational $H$ it lies to the right of the rightmost pole. Conversely, if the ROC of a rational $H$ is a right half-plane, partial fractions with every pole to the left of the ROC give only right-sided terms $t^ke^{-p t}u(t)$, so $h$ is causal (for proper $H$; impulses from improper parts are at $t = 0$, also causal).

(2) Stability means $\int\lvert h(t)\rvert\,\dd t < \infty$ ([[signals-systems/convolution#thm-lti-props]]). That is exactly absolute convergence of [[#eq-laplace]] at $\sigma = 0$, i.e. the imaginary axis lies in the ROC.

(3) Combine (1) and (2): the right half-plane to the right of the rightmost pole contains the imaginary axis exactly when the rightmost pole has negative real part.
:::

Part 3 is the rule used every day in circuit and control design. Note the hypotheses. A system with a pole in the right half-plane is not necessarily useless: with a different ROC it can be stable but non-causal, which is acceptable for offline processing of recorded data. And a causal system with poles *on* the imaginary axis, such as the integrator $1/s$ or an ideal LC resonator $1/(s^2 + \omega_0^2)$, is not BIBO stable: a bounded input at the resonant frequency produces a response that grows linearly in time.

::: example A system from its differential equation {#ex-lccde}
A causal LTI system satisfies $y'' + 3y' + 2y = x' + 3x$. Find its system function, poles and zeros, impulse response, step response and DC gain, and decide whether it is stable.
::: solution
Transforming with the differentiation property, $(s^2 + 3s + 2)Y = (s + 3)X$, so

$$
H(s) = \frac{s + 3}{s^2 + 3s + 2} = \frac{s + 3}{(s + 1)(s + 2)} .
$$

Zero at $s = -3$; poles at $s = -1$ and $s = -2$. Causal, so the ROC is $\operatorname{Re}s > -1$; it contains the $j\omega$ axis, so the system is stable (both poles in the left half-plane). Partial fractions: at $s = -1$ the coefficient is $(-1 + 3)/(-1 + 2) = 2$; at $s = -2$ it is $(-2 + 3)/(-2 + 1) = -1$. Hence

$$
h(t) = \big(2e^{-t} - e^{-2t}\big)u(t).
$$

The DC gain is $H(0) = 3/2$. The step response has transform $H(s)/s$; partial fractions give $\frac{3/2}{s} - \frac{2}{s + 1} + \frac{1/2}{s + 2}$, so $s(t) = \big(\tfrac32 - 2e^{-t} + \tfrac12e^{-2t}\big)u(t)$. Checks: $s(0) = \frac32 - 2 + \frac12 = 0$ and $s(\infty) = \frac32 = H(0)$, as the final-value theorem requires.
:::
:::

::: quiz
A causal system has poles at $s = -2$, $s = -1 \pm 3j$ and $s = 0.5$, and zeros at $s = 1$ and $s = -4$. Is it stable?
- [ ] Yes, because the zeros at $1$ and $-4$ cancel out
- [ ] Yes, because most of the poles are in the left half-plane
- [x] No, because of the pole at $s = 0.5$
- [ ] No, because of the zero at $s = 1$
::: solution
For a causal system the ROC lies to the right of the rightmost pole, $\operatorname{Re}s > 0.5$, which does not contain the imaginary axis. The pole at $0.5$ contributes a term $e^{0.5t}u(t)$ to $h(t)$. Zeros have no bearing on stability; a right-half-plane zero only makes the system **non-minimum-phase** (its step response initially moves the wrong way).
:::
:::

## Poles, zeros and the frequency response {#sec-geometry}

For a stable system the frequency response is $H(j\omega)$, the system function on the imaginary axis. Writing a rational $H$ in factored form,

$$
H(s) = K\,\frac{(s - z_1)(s - z_2)\cdots(s - z_M)}{(s - p_1)(s - p_2)\cdots(s - p_N)},
$$ {#eq-factored}

each factor $(j\omega - z_i)$ is a vector from the zero $z_i$ to the point $j\omega$ on the imaginary axis, and similarly for the poles. Hence

$$
\lvert H(j\omega)\rvert = \lvert K\rvert\,\frac{\prod_i\lvert j\omega - z_i\rvert}{\prod_k\lvert j\omega - p_k\rvert},\qquad \angle H(j\omega) = \angle K + \sum_i\angle(j\omega - z_i) - \sum_k\angle(j\omega - p_k).
$$ {#eq-geometric}

As the point $j\omega$ moves up the imaginary axis, the gain rises when it passes close to a pole (a short vector in the denominator) and dips when it passes close to a zero. A pole near the axis produces a sharp resonance; a zero on the axis produces a perfect null (a notch). This geometric picture is what makes a pole–zero plot readable at a glance.

::: widget complexmap
f: 1/(z^2 + 2*c*z + 1)
mode: domain
x: -2, 2
y: -2, 2
sliders: c=0.3:0.05:1.5:0.05
caption: Domain colouring of $H(s) = 1/(s^2 + 2\zeta s + 1)$ over the $s$-plane (horizontal axis $\sigma$, vertical axis $\omega$; slider $c = \zeta$). The two poles are the points where all colours meet and the brightness peaks. Reduce $\zeta$: the poles move towards the imaginary axis along the unit circle, and the values of $\lvert H\rvert$ on that axis, the frequency response, develop a sharp peak near $\omega = \pm1$. For $\zeta \ge 1$ the poles meet on the real axis and split along it.
:::

## Second-order systems {#sec-second-order}

Most dynamic behaviour of engineering interest, a resonant circuit, a mass on a spring, a servo motor, a closed control loop, is dominated by a pair of poles. That makes the second-order system the most important model in the subject.

::: definition Standard second-order system {#def-second-order}
The **standard second-order low-pass system** is

$$
H(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_ns + \omega_n^2},
$$ {#eq-second-order}

with **natural frequency** $\omega_n > 0$ and **damping ratio** $\zeta \ge 0$. Its poles are $s = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}$. It is **underdamped** for $0 < \zeta < 1$ (complex poles $-\zeta\omega_n \pm j\omega_d$ with $\omega_d = \omega_n\sqrt{1 - \zeta^2}$), **critically damped** for $\zeta = 1$ (a double real pole) and **overdamped** for $\zeta > 1$ (two real poles). The quality factor is $Q = 1/(2\zeta)$.
:::

In the underdamped case the poles lie on a circle of radius $\omega_n$, at angle $\theta = \arccos\zeta$ from the negative real axis. Their real part $-\zeta\omega_n$ sets the decay rate, their imaginary part $\omega_d$ the frequency of oscillation. Inverting $H(s)/s$ gives the step response

$$
s(t) = \left[1 - \frac{e^{-\zeta\omega_nt}}{\sqrt{1 - \zeta^2}}\sin\big(\omega_dt + \arccos\zeta\big)\right]u(t),\qquad 0 < \zeta < 1,
$$ {#eq-step-second}

whose first peak is at $t_p = \pi/\omega_d$, with fractional **overshoot** $M_p = e^{-\pi\zeta/\sqrt{1 - \zeta^2}}$, and which settles to within $2\%$ after roughly $t_s \approx 4/(\zeta\omega_n)$, four time constants of the envelope.

::: widget plot
f: 1 - exp(-c*x)/sqrt(1 - c^2)*sin(sqrt(1 - c^2)*x + acos(c)); 1/sqrt((1 - (x/4)^2)^2 + (2*c*x/4)^2)
x: 0, 16
y: 0, 2.2
sliders: c=0.3:0.05:0.95:0.01
hlines: 1
labels: s(t)\ (t\ \text{in } 1/\omega_n); \lvert H(j\omega)\rvert\ (\omega\ \text{in } \omega_n/4)
caption: Step response (blue, time in units of $1/\omega_n$) and magnitude response (orange, frequency in units of $\omega_n/4$, so the resonance sits at $4$ on the axis) of the standard second-order system for damping ratio $\zeta$ (slider $c$). Lower damping means more overshoot and ringing in time and a taller, narrower resonant peak in frequency: the same pole positions seen two ways. Near $\zeta = 0.7$ the step overshoots by about $5\%$ and the frequency response is maximally flat.
:::

::: example Designing an RLC low-pass filter for limited overshoot {#ex-rlc-design}
A series RLC circuit driven by $v_{\text{in}}$, with the output taken across the capacitor, has $H(s) = 1/(LCs^2 + RCs + 1)$. With $L = 10\,\mathrm{mH}$ and $C = 100\,\mathrm{nF}$, choose $R$ from the E24 series so that the step response overshoots by at most $5\%$, and find $\omega_n$, $\zeta$, the overshoot, the time of the peak and the $2\%$ settling time.
::: solution
Comparing with [[#eq-second-order]]: $\omega_n^2 = 1/(LC)$ and $2\zeta\omega_n = R/L$, so

$$
\omega_n = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{10^{-2}\times10^{-7}}} = 31\,623\,\mathrm{rad/s}\ (5.03\,\mathrm{kHz}),\qquad \zeta = \frac{R}{2}\sqrt{\frac{C}{L}} .
$$

An overshoot of $5\%$ means $e^{-\pi\zeta/\sqrt{1 - \zeta^2}} = 0.05$; solving, $\zeta = \dfrac{-\ln0.05}{\sqrt{\pi^2 + \ln^20.05}} = 0.690$. Since overshoot falls as $\zeta$ rises, we need $\zeta \ge 0.690$, i.e. $R \ge 2\zeta\sqrt{L/C} = 2\times0.690\times316.2\,\Omega = 436\,\Omega$. The next E24 value is $470\,\Omega$.

With $R = 470\,\Omega$: $\zeta = 235\times\sqrt{10^{-5}} = 0.743$, overshoot $e^{-\pi\cdot0.743/0.669} = 3.1\%$. The damped frequency is $\omega_d = \omega_n\sqrt{1 - 0.552} = 21\,170\,\mathrm{rad/s}$, so the peak occurs at $t_p = \pi/\omega_d = 0.148\,\mathrm{ms}$, and the $2\%$ settling time is about $4/(\zeta\omega_n) = 0.170\,\mathrm{ms}$. (The choice $430\,\Omega$ would give $\zeta = 0.680$ and $5.4\%$ overshoot, just outside the specification.) Remember that the source resistance adds to $R$.
:::
:::

::: quiz
Two stable systems have dominant pole pairs at $s = -1 \pm 10j$ and $s = -5 \pm 5j$. Which statement is correct?
- [ ] The first settles faster because its poles have larger magnitude
- [x] The second settles faster and overshoots less
- [ ] Both settle equally fast because they have the same $\omega_n$
- [ ] The first overshoots less because its poles are closer to the real axis
::: solution
Settling is set by the real part: the envelope decays as $e^{-1\cdot t}$ for the first and $e^{-5t}$ for the second, so the second settles about five times faster. Overshoot is set by the angle: the first pair has $\zeta = 1/\sqrt{101} \approx 0.10$ (overshoot about $73\%$), the second $\zeta = 0.707$ (about $4\%$). Their natural frequencies, $10.05$ and $7.07$, are different too.
:::
:::

::: warning Poles describe the system, not the circuit's initial state
Poles come from the system's own dynamics; they are the same for every input. The *amplitudes* of the exponential terms in a response depend on the input and the initial conditions, and a pole can even be "invisible" in a particular response if its residue is zero. Conversely, a pole cancelled by a zero in $H(s)$ does not disappear from the physical system: an unstable pole cancelled by a zero still makes internal signals grow and the hardware saturate. Never "fix" an unstable plant by cancelling its pole with a zero.
:::

### Feedback

For LTI blocks, the static feedback formula of [[signals-systems/systems]] generalises at once: with forward system $G(s)$ and feedback $F(s)$, $Y = G(X - FY)$, so the closed-loop system function is

$$
H(s) = \frac{G(s)}{1 + G(s)F(s)} .
$$ {#eq-closed-loop}

The closed-loop poles are the roots of $1 + G(s)F(s) = 0$; feedback moves poles, which is how it can stabilise an unstable plant or destabilise a stable one.

::: example Choosing a loop gain {#ex-feedback}
A motor with transfer function $G_0(s) = 1/(s(s + 1))$ (in normalised units) is placed in a unity feedback loop with a proportional controller of gain $K$, so $G = KG_0$ and $F = 1$. Find the closed-loop system function, the range of $K$ for stability, and the $K$ that gives $\zeta = 0.5$.
::: solution
By [[#eq-closed-loop]], $H(s) = \dfrac{K/(s(s+1))}{1 + K/(s(s+1))} = \dfrac{K}{s^2 + s + K}$. This is [[#eq-second-order]] with $\omega_n = \sqrt K$ and $2\zeta\omega_n = 1$, so $\zeta = 1/(2\sqrt K)$. A second-order polynomial with positive coefficients has both roots in the left half-plane, so the loop is stable for every $K > 0$. For $\zeta = 0.5$ we need $\sqrt K = 1$, $K = 1$, giving $\omega_n = 1$ and overshoot $e^{-\pi\cdot0.5/0.866} = 16.3\%$. Larger $K$ speeds the response ($\omega_n$ grows) but reduces damping: the basic trade-off of [[control-systems]].
:::
:::

## The unilateral Laplace transform {#sec-unilateral}

Systems are usually switched on at $t = 0$ with some stored energy, and we want the response for $t > 0$. The bilateral transform with initial rest cannot represent initial conditions; the **unilateral Laplace transform**

$$
\mathcal X(s) = \int_{0^-}^{\infty}x(t)\,e^{-st}\,\dd t
$$ {#eq-unilateral}

can. It ignores $t < 0$ (so its ROC is always a right half-plane and need not be stated), includes any impulse at $t = 0$, and has the differentiation property

$$
\frac{\dd x}{\dd t} \;\leftrightarrow\; s\mathcal X(s) - x(0^-),\qquad \frac{\dd^2x}{\dd t^2} \;\leftrightarrow\; s^2\mathcal X(s) - sx(0^-) - x'(0^-),
$$ {#eq-unilateral-diff}

obtained by integrating by parts. Transforming a differential equation then gives the **zero-state response** (input only, through $H(s)$) plus the **zero-input response** (initial conditions only), which is exactly the method of [[circuits-2/laplace-circuit-analysis]], where initial capacitor voltages and inductor currents become sources in the $s$-domain circuit. For signals that are zero for $t < 0$ the two transforms coincide.

::: application Stability margins in practice
Data sheets for op-amps specify a "phase margin", typically $45^\circ$ to $70^\circ$, for the feedback loop formed when the amplifier is used at unity gain. It measures how far the closed-loop poles are from the imaginary axis: a dominant pole pair with phase margin around $60^\circ$ corresponds roughly to $\zeta \approx 0.6$, a well-damped step response. Capacitive loads add a pole to the loop, reduce the margin, move the closed-loop poles towards the imaginary axis and show up as overshoot and ringing in the step response, or as outright oscillation if the poles cross into the right half-plane. Every one of these statements is a statement about pole positions in the $s$-plane.
:::

## Where this leads

The Laplace transform is the native language of [[control-systems]], where root-locus, Bode and Nyquist methods all study how feedback moves the poles of [[#eq-closed-loop]], and of analog filter design in [[circuits-2/filters]] and [[electronics-2]]. Its discrete-time counterpart is [[signals-systems/z-transform]], where the imaginary axis becomes the unit circle and the stability condition becomes "all poles inside the unit circle"; the bilinear transform of [[dsp]] maps one plane to the other to turn analog filter designs into digital ones.

::: history
Pierre-Simon Laplace used integrals of the form $\int e^{-st}f(t)\,\dd t$ as generating functions in his *Théorie analytique des probabilités* (1812), and Euler had used similar integrals earlier. Oliver Heaviside's operational calculus of the 1880s and 1890s solved circuit equations by treating $p = \dd/\dd t$ as an algebraic quantity, with spectacular success and little justification. Around 1916–1926 Thomas Bromwich and John Carson showed that Heaviside's methods could be grounded in contour integrals of Laplace type, and Gustav Doetsch's textbooks (from 1937) established the Laplace transform as the standard tool of engineering mathematics. The pole–zero, $s$-plane view of system design took shape at Bell Laboratories and the MIT Radiation Laboratory in the 1930s and 1940s.
:::

::: summary
- $X(s) = \int x(t)e^{-st}\,\dd t$ is defined together with its ROC, a vertical strip or half-plane; different signals can share the same $X(s)$ with different ROCs.
- Right-sided signals have ROCs to the right of all poles, left-sided to the left, two-sided in a strip between poles; finite-duration signals converge everywhere.
- In partial-fraction inversion, poles left of the ROC give right-sided terms and poles right of the ROC give left-sided terms.
- An LTI system is stable iff the ROC of $H(s)$ contains the $j\omega$ axis; a causal rational system is stable iff all poles have $\operatorname{Re}s < 0$.
- The frequency response is $H(s)$ on the imaginary axis; its magnitude is a ratio of distances to zeros and poles, so poles near the axis produce peaks and zeros on it produce nulls.
- Second-order systems: $\omega_n$ sets speed, $\zeta$ sets overshoot $e^{-\pi\zeta/\sqrt{1-\zeta^2}}$ and resonance; $\zeta \approx 0.7$ is a common design target.
- Feedback gives $G/(1 + GF)$ and moves poles; the unilateral transform adds initial conditions through $sX - x(0^-)$.
:::

## Exercises

::: exercise A transform and its ROC {level=1}
Find the Laplace transform and ROC of $x(t) = e^{3t}u(t)$ and of $x(t) = e^{-3\lvert t\rvert}$. Which has a Fourier transform?
::: solution
$e^{3t}u(t) \leftrightarrow 1/(s - 3)$, $\operatorname{Re}s > 3$: no Fourier transform. $e^{-3\lvert t\rvert} = e^{-3t}u(t) + e^{3t}u(-t) \leftrightarrow \frac{1}{s + 3} - \frac{1}{s - 3} = \frac{-6}{s^2 - 9}$, ROC $-3 < \operatorname{Re}s < 3$, which contains the $j\omega$ axis; its Fourier transform is $6/(9 + \omega^2)$.
:::
:::

::: exercise Stable or not {level=1}
A causal LTI system has $H(s) = \dfrac{s - 2}{s^2 + 4s + 13}$. Find its poles and zeros and decide whether it is stable.
::: solution
Poles: $s = -2 \pm 3j$ (from $(s + 2)^2 + 9$); zero: $s = 2$. Causal with both poles in the left half-plane: stable. The right-half-plane zero makes it non-minimum-phase but does not affect stability.
:::
:::

::: exercise DC gain and final value {level=1 check="0.75"}
A stable system has $H(s) = \dfrac{3(s + 1)}{(s + 2)^2}$. What is the final value of its unit step response?
::: solution
By the final-value theorem the step response tends to $H(0) = 3/4 = 0.75$.
:::
:::

::: exercise Inverse transform with a strip ROC {level=2}
Find $x(t)$ if $X(s) = \dfrac{s + 4}{(s + 1)(s - 2)}$ with ROC $-1 < \operatorname{Re}s < 2$. Is the corresponding system stable? Causal?
::: solution
Partial fractions: at $s = -1$, $(3)/(-3) = -1$; at $s = 2$, $6/3 = 2$. So $X = \frac{-1}{s + 1} + \frac{2}{s - 2}$. The pole at $-1$ is left of the ROC: $-e^{-t}u(t)$. The pole at $2$ is right of the ROC: $-2e^{2t}u(-t)$. So $x(t) = -e^{-t}u(t) - 2e^{2t}u(-t)$. As an impulse response: stable (the ROC contains the $j\omega$ axis, and both terms decay away from $t = 0$), not causal.
:::
:::

::: exercise Overshoot from pole positions {level=2 check="exp(-pi*0.6/0.8)"}
A system has a dominant pole pair at $s = -3 \pm 4j$. Find $\omega_n$, $\zeta$ and the fractional overshoot of its step response.
::: solution
$\omega_n = \lvert-3 + 4j\rvert = 5$, $\zeta = 3/5 = 0.6$, $\sqrt{1 - \zeta^2} = 0.8$. Overshoot $e^{-\pi\cdot0.6/0.8} = e^{-2.356} = 0.0948$, about $9.5\%$. The peak occurs at $t_p = \pi/4 = 0.785$ time units.
:::
:::

::: exercise A notch from a zero pair {level=2}
Sketch the pole–zero plot of $H(s) = \dfrac{s^2 + 1}{s^2 + 0.2s + 1}$ and use [[#eq-geometric]] to describe $\lvert H(j\omega)\rvert$. What is $\lvert H\rvert$ at $\omega = 0$, $\omega = 1$ and $\omega \to \infty$?
::: solution
Zeros at $\pm j$ (on the axis); poles at $-0.1 \pm j\sqrt{0.99} \approx -0.1 \pm 0.995j$, just to their left. Far from $\pm j$ the pole and zero vectors have almost equal lengths, so $\lvert H\rvert \approx 1$: $\lvert H(0)\rvert = 1$ and $\lvert H\rvert \to 1$ as $\omega \to \infty$. At $\omega = 1$ the zero vector has length $0$: $\lvert H(j1)\rvert = 0$. It is a notch filter; the closer the poles are to the zeros, the narrower the notch (its $3\,\mathrm{dB}$ width is $0.2\,\mathrm{rad/s}$, twice the pole's distance from the axis).
:::
:::

::: exercise Initial conditions with the unilateral transform {level=2}
Solve $y' + 2y = 4u(t)$ with $y(0^-) = 1$ using the unilateral transform, and identify the zero-input and zero-state parts.
::: solution
$s\mathcal Y - 1 + 2\mathcal Y = 4/s$, so $\mathcal Y = \frac{1}{s + 2} + \frac{4}{s(s + 2)} = \frac{1}{s + 2} + \frac{2}{s} - \frac{2}{s + 2}$. Hence $y(t) = e^{-2t} + 2(1 - e^{-2t}) = 2 - e^{-2t}$ for $t \ge 0$. Zero-input part $e^{-2t}$ (from $y(0^-) = 1$); zero-state part $2(1 - e^{-2t})$ (from the input with $y(0^-) = 0$). Check: $y(0) = 1$, $y(\infty) = 2$.
:::
:::

::: exercise Stabilising an unstable plant {level=3}
A magnetic levitation system is modelled by $G_0(s) = \dfrac{1}{s^2 - 4}$ (poles at $\pm2$). (a) Show that proportional feedback $F = 1$, $G = KG_0$, cannot stabilise it for any real $K$. (b) Show that a proportional-derivative controller $G = (K + K_ds)G_0$ with unity feedback can, and choose $K$ and $K_d$ to put the closed-loop poles at $s = -4 \pm 4j$.
::: hint
Write the closed-loop denominator $1 + GF = 0$ as a polynomial and compare with $(s + 4)^2 + 16$.
:::
::: solution
(a) The closed-loop denominator is $s^2 - 4 + K$. Its roots are $\pm\sqrt{4 - K}$: for $K < 4$ one root is positive; for $K > 4$ both are on the imaginary axis ($\pm j\sqrt{K - 4}$), marginally stable at best (undamped oscillation). There is no first-order term to provide damping, so no $K$ gives both roots in the open left half-plane.

(b) The denominator becomes $s^2 + K_ds + (K - 4)$. The desired one is $(s + 4)^2 + 16 = s^2 + 8s + 32$. Matching coefficients: $K_d = 8$ and $K - 4 = 32$, so $K = 36$. The derivative term supplies the damping that the plant lacks; the resulting closed loop has $\omega_n = \sqrt{32} = 5.66$ and $\zeta = 8/(2\times5.66) = 0.707$. (The controller zero at $s = -K/K_d = -4.5$ also affects the response, adding some overshoot beyond the $4.3\%$ of the pole pair alone.)
:::
:::

::: exercise Resonant peak of a second-order system {level=3}
Show that for $0 < \zeta < 1/\sqrt2$ the magnitude $\lvert H(j\omega)\rvert$ of [[#eq-second-order]] has a maximum at $\omega_r = \omega_n\sqrt{1 - 2\zeta^2}$ with value $\dfrac{1}{2\zeta\sqrt{1 - \zeta^2}}$, and evaluate it for $\zeta = 0.2$. Why is there no peak for $\zeta \ge 1/\sqrt2$?
::: hint
Minimise $D(u) = (1 - u)^2 + 4\zeta^2u$ with $u = (\omega/\omega_n)^2$.
:::
::: solution
$\lvert H\rvert^{-2} = (1 - u)^2 + 4\zeta^2u$ with $u = \omega^2/\omega_n^2$. Its derivative $-2(1 - u) + 4\zeta^2$ vanishes at $u = 1 - 2\zeta^2$, which is positive only for $\zeta < 1/\sqrt2$. There $D = 4\zeta^4 + 4\zeta^2(1 - 2\zeta^2) = 4\zeta^2(1 - \zeta^2)$, so the peak is $1/(2\zeta\sqrt{1 - \zeta^2})$. For $\zeta = 0.2$: $1/(0.4\times0.9798) = 2.55$, i.e. $+8.1\,\mathrm{dB}$, at $\omega_r = 0.959\,\omega_n$. For $\zeta \ge 1/\sqrt2$ the minimum of $D$ over $u \ge 0$ is at $u = 0$, so $\lvert H\rvert$ decreases monotonically; $\zeta = 1/\sqrt2$ is the maximally flat (second-order Butterworth) case.
:::
:::
