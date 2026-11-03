The phasor method has carried us a long way, but it answers only one kind of question: what does a circuit do long after a sinusoid has been switched on? It says nothing about the moment of switching, about the current surge when a transformer is energised, about the ringing of a filter hit by a step, or about a circuit whose stored energy is non-zero at the start. In [[circuits-1/first-order-circuits]] and [[circuits-1/second-order-circuits]] those questions were answered by writing and solving differential equations, case by case, and finding constants from initial conditions. That works, but becomes laborious beyond second order.

The **Laplace transform** turns the whole problem, transient and steady state, inputs of any shape and initial conditions included, into algebra. Each element gets an **$s$-domain** model in which its initial energy appears as an extra source; the circuit is then solved by exactly the nodal and mesh methods of [[circuits-2/ac-analysis]], with $s$ in place of $j\omega$; and the answer is brought back to the time domain by partial fractions. The same calculation exposes the **poles** and **zeros** of the circuit, which decide whether its natural response decays, how fast, and whether it oscillates. And it shows that the phasor is simply the Laplace transform evaluated on the imaginary axis, $s = j\omega$, which is the bridge to [[signals-systems]] and [[control-systems]].

## The Laplace transform

::: definition Laplace transform {#def-laplace}
The (one-sided) **Laplace transform** of a function $f(t)$ defined for $t \ge 0$ is

$$
F(s) = \mathcal L\{f(t)\} = \int_{0^-}^{\infty} f(t)\,e^{-st}\,\mathrm dt,
$$ {#eq-laplace}

where $s = \sigma + j\omega$ is the **complex frequency**. The integral converges for $\mathrm{Re}(s)$ larger than some $\sigma_0$ for every signal met in circuit analysis (those growing no faster than an exponential). The lower limit $0^-$, just before $t = 0$, includes any impulse at the origin and makes the initial conditions those that hold just **before** switching.
:::

Because circuit signals are zero before $t = 0$ or irrelevant there, $f(t)$ is understood as $f(t)u(t)$, with $u(t)$ the unit step. A function and its transform are a **transform pair**, and in practice we work from a short table rather than evaluating integrals. Each entry follows from [[#eq-laplace]] in a line or two; for instance $\mathcal L\{e^{-at}\} = \int_0^\infty e^{-(s+a)t}\,\mathrm dt = 1/(s + a)$ for $\mathrm{Re}(s) > -a$.

| $f(t)$, $t \ge 0$ | $F(s)$ |
|---|---|
| $\delta(t)$ | $1$ |
| $u(t)$ | $1/s$ |
| $t$ | $1/s^2$ |
| $e^{-at}$ | $1/(s + a)$ |
| $t\,e^{-at}$ | $1/(s + a)^2$ |
| $\cos\omega t$ | $s/(s^2 + \omega^2)$ |
| $\sin\omega t$ | $\omega/(s^2 + \omega^2)$ |
| $e^{-at}\cos\omega t$ | $(s + a)/((s + a)^2 + \omega^2)$ |
| $e^{-at}\sin\omega t$ | $\omega/((s + a)^2 + \omega^2)$ |

The properties that matter most for circuits are **linearity** ($\mathcal L\{af + bg\} = aF + bG$), the **differentiation** rule

$$
\mathcal L\left\{\frac{\mathrm df}{\mathrm dt}\right\} = sF(s) - f(0^-),
$$ {#eq-diff}

obtained by integrating [[#eq-laplace]] by parts, and the **integration** rule $\mathcal L\{\int_{0^-}^t f(\tau)\,\mathrm d\tau\} = F(s)/s$. Differentiation becomes multiplication by $s$, and the initial value comes along automatically: this is how the transform builds initial conditions into the algebra. For the mathematics behind the transform, including the inversion integral and convergence, see [[signals-systems]].

## Circuit elements in the s-domain

Transform each element law with [[#eq-diff]].

::: theorem s-domain models of R, L and C {#thm-s-models}
With $V(s)$ and $I(s)$ the transforms of the element voltage and current (passive sign convention):

- **Resistor:** $V(s) = R\,I(s)$.
- **Inductor** with initial current $i_L(0^-) = I_0$:
  $$
  V(s) = sL\,I(s) - L I_0 \qquad\text{or}\qquad I(s) = \frac{V(s)}{sL} + \frac{I_0}{s},
  $$
  an impedance $sL$ in series with a voltage source $LI_0$ (with its $+$ terminal where the reference current leaves the inductor), or $sL$ in parallel with a current source $I_0/s$ (in the direction of $I_0$).
- **Capacitor** with initial voltage $v_C(0^-) = V_0$:
  $$
  V(s) = \frac{I(s)}{sC} + \frac{V_0}{s} \qquad\text{or}\qquad I(s) = sC\,V(s) - CV_0,
  $$
  an impedance $1/(sC)$ in series with a voltage source $V_0/s$ (same polarity as $V_0$), or $1/(sC)$ in parallel with a current source $CV_0$ (directed against the reference current, that is, so that it discharges the capacitor through the external circuit).

Kirchhoff's laws hold for the transformed voltages and currents, and the **impedance** $Z(s) = V(s)/I(s)$ of each element, with zero initial conditions, is $R$, $sL$ or $1/(sC)$.
:::

::: proof
Transforming $v = Ri$ gives $V = RI$ by linearity. For the inductor, $v = L\,\mathrm di/\mathrm dt$ transforms by [[#eq-diff]] to $V = L(sI - I_0)$, the first form; dividing by $sL$ and rearranging gives the second. For the capacitor, $i = C\,\mathrm dv/\mathrm dt$ transforms to $I = C(sV - V_0)$, the second form; dividing by $sC$ gives the first. Kirchhoff's laws are sums of time functions equal to zero, and the transform is linear, so the transformed sums are zero too.
:::

The two forms of each model are source transformations of each other ([[circuits-1/network-theorems]]): $LI_0$ in series with $sL$ is equivalent to $LI_0/(sL) = I_0/s$ in parallel with $sL$. Use the series form with mesh analysis and the parallel form with nodal analysis.

::: warning Initial-condition sources have directions
The initial-condition sources are where most sign errors in Laplace analysis come from. For the inductor in series form, the source $LI_0$ is placed so that it would **drive current in the direction of $I_0$** around a closed external loop; for the capacitor, the source $V_0/s$ has the same polarity as $V_0$. Draw the $s$-domain circuit with every source and every reference direction shown before writing equations, and check the result at $t = 0^+$: an inductor current and a capacitor voltage must not jump unless an impulse is applied.
:::

::: example An RC circuit with an initial charge {#ex-rc}
A capacitor $C = 100\,\mathrm{\mu F}$ charged to $V_0 = 2\,\mathrm{V}$ is connected at $t = 0$ through $R = 1\,\mathrm{k\Omega}$ to a $10\,\mathrm{V}$ DC source. Find $v_C(t)$ for $t \ge 0$.
::: solution
In the $s$-domain the source is $10/s$, the resistor $R$, and the capacitor $1/(sC)$ in series with $V_0/s = 2/s$. The mesh current is

$$
I(s) = \frac{10/s - 2/s}{R + 1/(sC)} = \frac{8}{s}\cdot\frac{sC}{sRC + 1} = \frac{8/R}{s + 1/RC}.
$$

With $RC = 0.1\,\mathrm s$, $I(s) = 8\times10^{-3}/(s + 10)$ and $i(t) = 8e^{-10t}\,\mathrm{mA}$. The capacitor voltage is

$$
V_C(s) = \frac{I(s)}{sC} + \frac{2}{s} = \frac{80}{s(s + 10)} + \frac{2}{s} = \frac{8}{s} - \frac{8}{s + 10} + \frac{2}{s},
$$

so $v_C(t) = 10 - 8e^{-10t}\,\mathrm{V}$. It starts at $2\,\mathrm{V}$, ends at $10\,\mathrm{V}$, with time constant $0.1\,\mathrm s$: the result of [[circuits-1/first-order-circuits]], obtained without solving a differential equation or fitting a constant.
:::
:::

## Inverting by partial fractions

Every $s$-domain response of an $RLC$ circuit is a **rational function** $F(s) = N(s)/D(s)$. If the degree of $N$ is less than that of $D$ (otherwise divide first; the quotient gives impulses), factor $D$ and expand.

::: algorithm Partial-fraction inversion {#alg-pfe}
1. Find the roots $p_k$ of $D(s)$: the **poles** of $F$.
2. **Simple poles.** For each simple pole, the coefficient (the **residue**) is $K_k = \bigl[(s - p_k)F(s)\bigr]_{s = p_k}$, and the term $K_k/(s - p_k)$ inverts to $K_ke^{p_kt}$.
3. **Complex pair** $p = -\alpha \pm j\beta$. Compute the residue $K = \abs{K}\angle\theta$ at $-\alpha + j\beta$; the residue at the conjugate pole is $K^*$, and the pair inverts to $2\abs{K}e^{-\alpha t}\cos(\beta t + \theta)$.
4. **Repeated pole** of order $r$ at $p$: terms $K_1/(s - p) + \cdots + K_r/(s - p)^r$, with $K_r = [(s - p)^rF]_{s=p}$ and the others from derivatives of $(s - p)^rF$ (or by matching coefficients); $1/(s - p)^m$ inverts to $t^{m-1}e^{pt}/(m-1)!$.
5. Add the terms and multiply by $u(t)$.
:::

::: example Overdamped discharge {#ex-overdamped}
A capacitor of $2\,\mathrm{\mu F}$ charged to $5\,\mathrm{V}$ is discharged at $t = 0$ through a series inductor of $0.1\,\mathrm H$ (initially carrying no current) and a resistor of $600\,\Omega$. Find the current.
::: solution
Let $I(s)$ be the current flowing out of the positive plate of the capacitor through the inductor and resistor. In the series form of [[#thm-s-models]], the capacitor is $1/(sC)$ in series with $5/s$; going round the loop, this source drives the current, so

$$
I(s) = \frac{5/s}{R + sL + 1/(sC)} = \frac{5/L}{s^2 + (R/L)s + 1/(LC)} = \frac{50}{s^2 + 6000s + 5\times10^6} = \frac{50}{(s + 1000)(s + 5000)}.
$$

By [[#alg-pfe]], $K_1 = 50/(-1000 + 5000) = 0.0125$ and $K_2 = 50/(-5000 + 1000) = -0.0125$, so

$$
i(t) = 12.5\bigl(e^{-1000t} - e^{-5000t}\bigr)\,\mathrm{mA}.
$$

The current starts at zero (the inductor forbids a jump), rises, and decays with the slower time constant of $1\,\mathrm{ms}$. The damping ratio is $\zeta = 3000/\sqrt{5\times10^6} = 1.34$: overdamped, two real poles.
:::
:::

::: example An underdamped step response {#ex-underdamped}
The series $RLC$ circuit of [[circuits-1/second-order-circuits]] has $R = 20\,\Omega$, $L = 10\,\mathrm{mH}$, $C = 10\,\mathrm{\mu F}$, zero initial conditions, and a $10\,\mathrm V$ step input. Find $v_C(t)$ by the Laplace method.
::: solution
The capacitor voltage is the low-pass output of [[circuits-2/filters#prop-rlc-filters]] with input $10/s$:

$$
V_C(s) = \frac{10}{s}\cdot\frac{1/(LC)}{s^2 + (R/L)s + 1/(LC)} = \frac{10^8}{s\,(s^2 + 2000s + 10^7)}.
$$

The poles are $s = 0$ and $s = -1000 \pm j3000$. The residue at $0$ is $10^8/10^7 = 10$. At $p = -1000 + j3000$, $K = 10^8/[p\,(p - p^*)] = 10^8/[(-1000 + j3000)(j6000)]$. Here $(-1000 + j3000)(j6000) = -1.8\times10^7 - j6\times10^6$, so $K = 10^8/(1.897\times10^7\angle -161.57^\circ) = 5.270\angle 161.57^\circ$. By step 3 of [[#alg-pfe]],

$$
v_C(t) = 10 + 10.54\,e^{-1000t}\cos(3000t + 161.57^\circ)\,\mathrm{V}.
$$

Expanding the cosine, $10.54\cos(3000t + 161.57^\circ) = -10\cos3000t - 3.333\sin3000t$, so $v_C = 10[1 - e^{-1000t}(\cos3000t + \tfrac13\sin3000t)]$, exactly the result of the time-domain lesson, with its $35\,\%$ overshoot at $t = \pi/3000$.
:::
:::

## Transfer functions, poles and stability

With all initial conditions zero, the ratio of the transform of an output to the transform of an input is the **transfer function** $H(s) = Y(s)/X(s)$. It is the same ratio of polynomials we wrote in [[circuits-2/frequency-response]], now with $s$ free to take any complex value.

::: definition Poles, zeros and impulse response {#def-poles}
The **zeros** of $H(s)$ are the roots of its numerator and the **poles** the roots of its denominator. The **impulse response** $h(t) = \mathcal L^{-1}\{H(s)\}$ is the output when the input is $\delta(t)$ (since $\mathcal L\{\delta\} = 1$). A circuit is **(bounded-input, bounded-output) stable** if every bounded input gives a bounded output; for a rational $H(s)$ this holds exactly when every pole has a negative real part.
:::

The partial-fraction expansion shows why the poles control everything. Each pole $p$ contributes a term $Ke^{pt}$ to $h(t)$, and to the response to any input. A pole $p = -\alpha + j\beta$ in the left half-plane gives an oscillation at $\beta$ decaying at rate $\alpha$; a real pole gives a pure exponential; a pole on the imaginary axis gives an undamped oscillation (or a constant, at $s = 0$); and a pole in the right half-plane gives a growing response. Passive $RLC$ circuits with resistance in every loop have all their poles in the left half-plane. Active circuits with positive feedback can place poles anywhere, which is how oscillators are made, and how amplifiers become unstable.

::: widget plot
f: exp(a*x)*cos(b*x); exp(a*x); -exp(a*x)
x: 0, 10
y: -3, 3
sliders: a=-0.3:-2:0.3:0.01; b=3:0:10:0.1
labels: e^{\sigma t}\cos\beta t; \text{envelope}; \text{envelope}
caption: The natural-response term of a pole pair at $s = \sigma \pm j\beta$, with $\sigma$ set by the slider $a$ and $\beta$ by $b$. Move $a$ towards $0$: the decay slows, and at $a = 0$ (poles on the imaginary axis) the oscillation never dies. Make $a$ positive and the response grows without bound: right-half-plane poles mean instability. Set $b = 0$ for a real pole, a pure exponential.
:::

::: quiz
A circuit has transfer function $H(s) = \dfrac{10(s + 3)}{(s + 2)(s^2 + 2s + 26)}$. Which describes its natural response?
- [ ] A growing oscillation at $5\,\mathrm{rad/s}$
- [x] A decaying exponential $e^{-2t}$ plus a decaying oscillation $e^{-t}\cos(5t + \theta)$
- [ ] A decaying exponential $e^{-3t}$ plus an oscillation at $26\,\mathrm{rad/s}$
- [ ] An undamped oscillation at $\sqrt{26}\,\mathrm{rad/s}$
::: solution
The poles are $-2$ and the roots of $s^2 + 2s + 26$, namely $-1 \pm j5$. All are in the left half-plane, so the circuit is stable. The real pole gives $e^{-2t}$, the complex pair $e^{-t}\cos(5t + \theta)$. The zero at $-3$ affects the amplitudes of the terms, not their form.
:::
:::

### The phasor as a special case

::: theorem Sinusoidal steady state from the transfer function {#thm-ss}
If a circuit with transfer function $H(s)$ is stable and its input is $x(t) = X_m\cos(\omega t + \phi)$ applied at $t = 0$, then its output is

$$
y(t) = y_{\text{tr}}(t) + \abs{H(j\omega)}\,X_m\cos\bigl(\omega t + \phi + \angle H(j\omega)\bigr),
$$

where the **transient** $y_{\text{tr}}(t)$ consists of terms in the poles of $H$ and decays to zero. The steady-state part is exactly the phasor result [[circuits-2/frequency-response#eq-ss-response]], with $H(j\omega)$ the transfer function evaluated on the imaginary axis.
:::

::: proof
Write the input as $\mathrm{Re}[\mathbf X e^{j\omega t}]$ with $\mathbf X = X_m e^{j\phi}$, and transform the complex input $\mathbf Xe^{j\omega t}$: $Y_c(s) = H(s)\,\mathbf X/(s - j\omega)$. In its partial-fraction expansion the pole at $j\omega$ has residue $H(j\omega)\mathbf X$, giving the term $H(j\omega)\mathbf Xe^{j\omega t}$; the remaining terms come from the poles of $H$ and contain $e^{p_kt}$ with $\mathrm{Re}(p_k) < 0$, which decay. Since the circuit has real coefficients, the response to the real input is the real part of the response to the complex input, $\mathrm{Re}[H(j\omega)\mathbf Xe^{j\omega t}] = \abs{H(j\omega)}X_m\cos(\omega t + \phi + \angle H(j\omega))$, plus the real part of the decaying terms.
:::

::: example Switching on a sinusoid {#ex-complete}
At $t = 0$ the voltage $10\cos(1000t)\,\mathrm{V}$ is applied to an $RC$ low-pass circuit with $RC = 1\,\mathrm{ms}$ and an uncharged capacitor. Find the complete output and identify the transient and steady-state parts.
::: solution
$H(s) = 1/(1 + sRC) = 1000/(s + 1000)$ and $X(s) = 10s/(s^2 + 10^6)$, so

$$
V_o(s) = \frac{10^4\,s}{(s + 1000)(s^2 + 10^6)}.
$$

The residue at $s = -1000$ is $10^4(-1000)/(10^6 + 10^6) = -5$, giving the transient $-5e^{-1000t}\,\mathrm V$. By [[#thm-ss]] the steady state is $\abs{H(j1000)}\times10\cos(1000t + \angle H(j1000))$, with $H(j1000) = 1/(1 + j) = 0.7071\angle -45^\circ$:

$$
v_o(t) = -5e^{-1000t} + 7.071\cos(1000t - 45^\circ)\,\mathrm V.
$$

At $t = 0$: $-5 + 7.071\cos45^\circ = -5 + 5 = 0$, as required for an uncharged capacitor. The transient is exactly what is needed to join the initial state to the steady-state sinusoid, and has died out ($< 1\,\%$) after five time constants, $5\,\mathrm{ms}$.
:::
:::

::: widget plot
f: -5*exp(-x) + 7.071*cos(x - pi/4); 7.071*cos(x - pi/4); -5*exp(-x)
x: 0, 12
y: -8, 8
labels: v_o(t); \text{steady state}; \text{transient}
caption: The complete response of the example (time in milliseconds, so $\omega = 1\,\mathrm{rad/ms}$). The output starts at $0$, follows neither the steady-state sinusoid nor the transient alone at first, and merges with the steady state after a few milliseconds as the transient term decays. Hover near $t = 0$ to see the two parts cancel.
:::

## Initial and final values, and the complete response

Two theorems give the behaviour at $t = 0^+$ and as $t \to \infty$ directly from $F(s)$, without inverting.

::: theorem Initial-value and final-value theorems {#thm-ivt-fvt}
If $f$ and its derivative have Laplace transforms, then

$$
f(0^+) = \lim_{s\to\infty} sF(s).
$$

If, in addition, all poles of $sF(s)$ lie in the open left half-plane, then

$$
\lim_{t\to\infty} f(t) = \lim_{s\to0} sF(s).
$$
:::

::: proof
By [[#eq-diff]], $\int_{0^-}^\infty f'(t)e^{-st}\,\mathrm dt = sF(s) - f(0^-)$. As $s \to \infty$ along the real axis, the integrand vanishes except for any jump of $f$ at the origin, where $f'$ contains $[f(0^+) - f(0^-)]\delta(t)$; so the left side tends to $f(0^+) - f(0^-)$ and $sF(s) \to f(0^+)$. As $s \to 0$, the left side tends to $\int_{0^-}^\infty f'\,\mathrm dt = f(\infty) - f(0^-)$, provided the limit $f(\infty)$ exists, which the pole condition guarantees; hence $sF(s) \to f(\infty)$.
:::

Applied to [[#ex-rc]], $sV_C(s) = 80/(s + 10) + 2 + \cdots$: as $s \to \infty$ it tends to $2$ (the initial voltage), and as $s \to 0$ to $8 + 2 = 10$ (the final voltage). The pole condition is essential: for $F(s) = 1/(s^2 + 1)$ the formula would give $0$, but $\sin t$ has no limit.

Every response computed in this lesson has two decompositions. By **cause**, it is the **zero-input response** (due to the initial conditions alone, with sources off) plus the **zero-state response** (due to the sources alone, with zero initial conditions); the $s$-domain models of [[#thm-s-models]] keep the two visibly separate, as the initial-condition sources and the independent sources. By **form**, it is the **natural response** (terms at the poles of the circuit) plus the **forced response** (terms at the poles of the input). In [[#ex-complete]] the natural response is $-5e^{-1000t}$ and the forced response the sinusoid.

::: example Choosing a damping for a clean step {#ex-design}
A second-order low-pass filter $H(s) = \omega_0^2/(s^2 + 2\zeta\omega_0s + \omega_0^2)$ is to follow step changes in a sensor signal with an overshoot of no more than $5\,\%$. What is the smallest permissible $\zeta$? Is the Butterworth filter of [[circuits-2/filters#ex-sk-design]] acceptable, and what is its overshoot?
::: solution
The step response is $\mathcal L^{-1}\{H(s)/s\}$. For $\zeta < 1$ its poles are $-\zeta\omega_0 \pm j\omega_0\sqrt{1 - \zeta^2}$ and, as in [[#ex-underdamped]], the response is $1 - e^{-\zeta\omega_0t}[\cos\omega_dt + (\zeta/\sqrt{1 - \zeta^2})\sin\omega_dt]$ with $\omega_d = \omega_0\sqrt{1 - \zeta^2}$. Its first peak is at $t_p = \pi/\omega_d$, with overshoot $M_p = e^{-\pi\zeta/\sqrt{1 - \zeta^2}}$. Setting $M_p = 0.05$: $\pi\zeta/\sqrt{1 - \zeta^2} = \ln20 = 2.996$, so $\zeta^2(\pi^2 + 2.996^2) = 2.996^2$ and $\zeta = 2.996/\sqrt{9.870 + 8.974} = 0.690$.

The Butterworth filter has $\zeta = 1/\sqrt2 = 0.707 > 0.690$, so it is acceptable; its overshoot is $e^{-\pi} = 4.3\,\%$. For a $1\,\mathrm{kHz}$ cutoff the first peak occurs at $t_p = \pi/(\omega_0/\sqrt2) = \sqrt2/(2\times1000) = 0.71\,\mathrm{ms}$. A design that must have no overshoot at all would use $\zeta \ge 1$ (or a Bessel response), at the cost of a softer cutoff in the frequency domain: the time and frequency domains pull in opposite directions.
:::
:::

::: application Switching transients in power systems
When a circuit breaker closes onto an inductive line, the current is the sum of a steady-state sinusoid and a decaying exponential (exercise [[#exr-dc-offset]]). If the switching instant is unfavourable, the exponential **DC offset** nearly doubles the first current peak. Circuit breakers, protective relays and the mechanical bracing of busbars must be designed for this **asymmetrical** fault current, and its decay time constant $L/R$ is a key parameter in breaker standards. Laplace analysis of the switching problem is the first step in every such design.
:::

::: history
Pierre-Simon Laplace used integrals of the form [[#eq-laplace]] in his work on probability in the 1780s. The engineering method came from the other direction: in the 1880s and 1890s Oliver Heaviside solved telegraph and circuit equations by treating the differentiation operator $p = \mathrm d/\mathrm dt$ as an algebraic quantity, with spectacular results but without proofs, and was widely criticised by mathematicians. Thomas Bromwich (1916), John Carson (1920s) and others showed that Heaviside's rules could be justified by an integral transform, and Gustav Doetsch's systematic treatise on the Laplace transform (1937) and the textbook *Transients in Linear Systems* by Murray Gardner and John Barnes (1942) made the Laplace transform the standard tool of electrical engineers.
:::

## Where this leads

The Laplace transform is the common language of the transform-domain courses. In [[signals-systems]] it is joined by the Fourier transform (its restriction to $s = j\omega$ for stable signals) and convolution, $y = h * x \leftrightarrow Y = HX$, which explains why the impulse response determines the response to any input. In [[control-systems]] the poles of a closed loop are moved by feedback, and stability is judged by the root locus and the Nyquist criterion, both built on $H(s)$. The two-port parameters of [[circuits-2/two-port-networks]] may be written as functions of $s$, and the transient analysis of transmission lines in [[electromagnetics]] uses the same transform. Numerical circuit simulators such as SPICE ([[circuits-1/circuit-simulation]]) solve the same equations by time stepping instead.

::: summary
- The Laplace transform $F(s) = \int_{0^-}^\infty f(t)e^{-st}\,\mathrm dt$ turns differentiation into multiplication by $s$, with the initial value built in: $\mathcal L\{f'\} = sF - f(0^-)$.
- In the $s$-domain, $R \to R$, $L \to sL$ with a source $LI_0$ (series) or $I_0/s$ (parallel), $C \to 1/(sC)$ with $V_0/s$ (series) or $CV_0$ (parallel); KCL, KVL, nodal and mesh analysis apply unchanged.
- Responses are rational functions inverted by partial fractions; a complex pole pair $-\alpha \pm j\beta$ gives $2\abs{K}e^{-\alpha t}\cos(\beta t + \angle K)$.
- The poles of $H(s)$ fix the form of the natural response; the circuit is stable if and only if all poles have negative real parts.
- For a stable circuit, the sinusoidal steady state is $\abs{H(j\omega)}$ and $\angle H(j\omega)$: the phasor method is the Laplace method on the $j\omega$ axis.
- Initial and final values follow from $sF(s)$ as $s \to \infty$ and $s \to 0$ (the latter only if the poles of $sF$ are in the left half-plane).
- A second-order step response overshoots by $e^{-\pi\zeta/\sqrt{1 - \zeta^2}}$, $4.3\,\%$ for a Butterworth filter.
:::

## Exercises

::: exercise Natural frequency from the poles {level=1 check="sqrt(13)"}
A circuit has $H(s) = 10/(s^2 + 4s + 13)$. Find its poles and its undamped natural frequency $\omega_0$ in rad/s.
::: solution
$s = -2 \pm \sqrt{4 - 13} = -2 \pm j3$. Comparing with $s^2 + 2\zeta\omega_0s + \omega_0^2$: $\omega_0 = \sqrt{13} = 3.61\,\mathrm{rad/s}$, $\zeta = 2/\sqrt{13} = 0.555$, and the damped frequency is $3\,\mathrm{rad/s}$.
:::
:::

::: exercise A final value {level=1 check="5"}
Find $\lim_{t\to\infty}v(t)$ for $V(s) = 20/[s(s + 4)]$, after checking that the final-value theorem applies.
::: solution
$sV(s) = 20/(s + 4)$ has its only pole at $-4$, in the left half-plane, so the theorem applies: $v(\infty) = 20/4 = 5$. Indeed $v(t) = 5(1 - e^{-4t})$.
:::
:::

::: exercise An initial value {level=1 check="3"}
Find $i(0^+)$ for $I(s) = (3s + 2)/(s^2 + 2s + 5)$.
::: solution
$sI(s) = (3s^2 + 2s)/(s^2 + 2s + 5) \to 3$ as $s \to \infty$, so $i(0^+) = 3$.
:::
:::

::: exercise Two real poles {level=2 check="3*(exp(-1)-exp(-3))"}
Find $f(t)$ for $F(s) = 6/[(s + 1)(s + 3)]$ and give $f(1)$.
::: solution
Residues: at $-1$, $6/2 = 3$; at $-3$, $6/(-2) = -3$. So $f(t) = 3e^{-t} - 3e^{-3t}$ and $f(1) = 3(e^{-1} - e^{-3}) = 0.954$.
:::
:::

::: exercise An RL circuit with initial current {level=2 check="2-exp(-1)"}
An inductor $L = 0.2\,\mathrm H$ carrying $1\,\mathrm A$ is connected at $t = 0$ in series with $R = 10\,\Omega$ across a $20\,\mathrm V$ source that drives current in the same direction. Find $i(t)$ and give $i(20\,\mathrm{ms})$ in amperes.
::: hint
Use the series model: $sL$ with a source $LI_0 = 0.2$ aiding the current.
:::
::: solution
$I(s) = (20/s + 0.2)/(10 + 0.2s) = (100/s + 1)/(s + 50) = 100/[s(s + 50)] + 1/(s + 50) = 2/s - 2/(s + 50) + 1/(s + 50)$. So $i(t) = 2 - e^{-50t}\,\mathrm A$: from $1\,\mathrm A$ to the final $20/10 = 2\,\mathrm A$ with $\tau = L/R = 20\,\mathrm{ms}$. At $t = 20\,\mathrm{ms}$, $i = 2 - e^{-1} = 1.632\,\mathrm A$.
:::
:::

::: exercise Overshoot from the transfer function {level=2 check="100*exp(-pi*0.5/sqrt(0.75))"}
Find the percentage overshoot of the step response of $H(s) = 100/(s^2 + 10s + 100)$.
::: solution
$\omega_0 = 10$ and $2\zeta\omega_0 = 10$, so $\zeta = 0.5$. The overshoot is $100e^{-\pi\times0.5/\sqrt{0.75}} = 100e^{-1.814} = 16.3\,\%$, at $t_p = \pi/(10\sqrt{0.75}) = 0.363\,\mathrm s$.
:::
:::

::: exercise A circuit driven at resonance {level=3}
An $LC$ circuit with $H(s) = \omega_0^2/(s^2 + \omega_0^2)$ (a lossless low-pass section) is driven from rest by $x(t) = \sin\omega_0t$. Find the output and explain why the phasor method fails here.
::: hint
$\mathcal L^{-1}\{2\omega^3/(s^2 + \omega^2)^2\} = \sin\omega t - \omega t\cos\omega t$.
:::
::: solution
$Y(s) = \omega_0^2\cdot\omega_0/(s^2 + \omega_0^2)^2 = \tfrac12\cdot2\omega_0^3/(s^2 + \omega_0^2)^2$, so $y(t) = \tfrac12(\sin\omega_0t - \omega_0t\cos\omega_0t)$. The amplitude grows linearly in time without limit. The poles of $H$ lie on the imaginary axis at $\pm j\omega_0$, exactly at the input frequency, so the circuit is not stable and [[#thm-ss]] does not apply: $\abs{H(j\omega_0)}$ is infinite and there is no steady state. In a real circuit the resistance of the coil limits the growth, and the amplitude settles at $Q$ times the drive, as in [[circuits-2/frequency-response]].
:::
:::

::: exercise The DC offset of a switched inductive circuit {#exr-dc-offset level=3}
At $t = 0$ the voltage $v(t) = V_m\cos(\omega t + \alpha)$ is switched onto a series $RL$ circuit with zero initial current. (a) Show that

$$
i(t) = \frac{V_m}{\abs{Z}}\bigl[\cos(\omega t + \alpha - \theta) - \cos(\alpha - \theta)\,e^{-Rt/L}\bigr],
$$

where $\abs{Z} = \sqrt{R^2 + \omega^2L^2}$ and $\theta = \arctan(\omega L/R)$. (b) For which switching angles is there no transient, and for which is it largest? (c) For a $50\,\mathrm{Hz}$ circuit with $\omega L/R = 10$, estimate the first current peak, relative to the steady-state peak, in the worst case.
::: solution
(a) The steady-state current is $(V_m/\abs{Z})\cos(\omega t + \alpha - \theta)$ by the phasor method (the circuit is stable, so [[#thm-ss]] applies). The natural response is $Ae^{-Rt/L}$ (one pole at $-R/L$). The inductor current must be zero at $t = 0^+$, so $A = -(V_m/\abs{Z})\cos(\alpha - \theta)$.

(b) No transient when $\cos(\alpha - \theta) = 0$, that is $\alpha = \theta \pm 90^\circ$: switching when the steady-state current would be passing through zero. The offset is largest when $\alpha = \theta$ (or $\theta + 180^\circ$): switching at the instant the steady-state current would be at its peak.

(c) In the worst case $i(t) = (V_m/\abs{Z})[\cos\omega t - e^{-Rt/L}]$, whose first negative peak is near $\omega t = \pi$, that is $t = 10\,\mathrm{ms}$. The time constant is $L/R = 10/\omega = 31.8\,\mathrm{ms}$, so $e^{-0.010/0.0318} = 0.73$ and the peak is about $-(1 + 0.73) = -1.73$ times the steady-state peak. With purely inductive circuits it approaches $2$. This is the asymmetrical fault current of the application box above.
:::
:::

::: exercise Two equivalent capacitor models {level=3}
(a) Show by a source transformation that the two $s$-domain models of a charged capacitor in [[#thm-s-models]] are equivalent. (b) Solve [[#ex-rc]] again with the parallel model and nodal analysis, and confirm the result.
::: solution
(a) The series model is $1/(sC)$ in series with a voltage source $V_0/s$. A source transformation replaces it by a current source $(V_0/s)/(1/(sC)) = CV_0$ in parallel with $1/(sC)$. Inside the model the source points from the negative terminal towards the positive one: with the terminals open, all of its current $CV_0$ flows down through $1/(sC)$ and produces $CV_0/(sC) = V_0/s$, the same open-circuit voltage as the series model; with the terminals shorted, the current $CV_0$ flows out of the positive terminal, the same short-circuit current as the series model. Equivalently, $I(s) = sCV(s) - CV_0$: the reference current into the capacitor is reduced by $CV_0$.

(b) Take the capacitor's top node, voltage $V_C(s)$, with the source $10/s$ connected to it through $R$. KCL, current out of the node: $(V_C - 10/s)/R + sCV_C - CV_0 = 0$. So $V_C(1/R + sC) = 10/(sR) + CV_0$, and with $R = 1000$, $C = 10^{-4}$, $V_0 = 2$:

$$
V_C(s) = \frac{10/(sR) + CV_0}{1/R + sC} = \frac{100/s + 2}{s + 10} = \frac{100}{s(s + 10)} + \frac{2}{s + 10} = \frac{10}{s} - \frac{10}{s + 10} + \frac{2}{s + 10},
$$

so $v_C(t) = 10 - 8e^{-10t}\,\mathrm V$, the same as before.
:::
:::
