Ask an engineer how good a control loop is and the answer will usually be a step response: command a sudden change, record the output, and read off how quickly it rises, how far it overshoots, how long it takes to settle and where it finally ends up. A disk-drive head must move between tracks in a millisecond and settle to within a fraction of a track width; a laboratory power supply must recover from a load step without its output jumping by more than a few tens of millivolts; a printer carriage must stop where it was told without ringing. These requirements are written as **transient specifications** and a **steady-state error**, and this chapter connects them to the poles and zeros of the closed-loop transfer function.

We begin with first-order systems, then derive the step response of the standard second-order system and the formulas for peak time, overshoot and settling time. Real loops have more than two poles and often a zero, so we next ask when a pair of **dominant poles** describes a higher-order system and what extra poles and zeros do — including the curious "wrong-way" response caused by a right-half-plane zero, which limits the voltage loops of boost converters. Finally we use the final-value theorem to compute steady-state errors and see why integrators in the loop remove them. Models come from [[control-systems/modelling-dynamic-systems]]; the second-order system was introduced in [[signals-systems/laplace-transform]] and in circuit form in [[circuits-1/second-order-circuits]].

## Test inputs and response specifications

Control systems are tested with a few standard inputs: the **unit step** $u(t)$, transform $1/s$ (a sudden change of setpoint or load); the **ramp** $t\,u(t)$, transform $1/s^2$ (a constant-speed command to a position loop); and occasionally the **parabola** $\tfrac12t^2u(t)$, transform $1/s^3$ (constant acceleration). The response to each consists of a **transient**, which dies away in a stable system, and a **steady state**, which remains.

::: definition Step-response specifications {#def-specs}
For a stable system whose unit-step response $y(t)$ settles to the final value $y_\infty$:

- the **rise time** $t_r$ is the time taken to rise from $10\,\%$ to $90\,\%$ of $y_\infty$;
- the **peak time** $t_p$ is the time of the first (and largest) maximum;
- the **percentage overshoot** is $\mathrm{OS} = 100\,(y_{max} - y_\infty)/y_\infty$;
- the **settling time** $t_s$ is the time after which $\abs{y(t) - y_\infty}$ stays within a stated band, usually $2\,\%$ of $y_\infty$;
- the **steady-state error** is $e_\infty = \lim_{t\to\infty}\bigl(r(t) - y(t)\bigr)$ for a stated reference $r$.
:::

::: warning Fractions, percentages and bands
Overshoot is quoted both as a fraction ($M_p = 0.1$) and as a percentage ($10\,\%$); the formulas below give the fraction. Settling bands of $2\,\%$ and $5\,\%$ are both common, and rise times of $0$–$100\,\%$ are used for underdamped systems in some texts. State which convention you use, and be sure the specification you are given uses the same one.
:::

## First-order systems

A first-order system with DC gain $K$ and time constant $\tau$,

$$
G(s) = \frac{K}{\tau s + 1},
$$ {#eq-first-order}

has a single pole at $s = -1/\tau$. The armature current of a motor driven by a voltage, the temperature of a heated block and the output of an RC filter all behave this way, and so does a proportional speed loop on a motor whose inductance is negligible.

::: proposition First-order step response {#prop-first-order}
The unit-step response of [[#eq-first-order]] is $y(t) = K\bigl(1 - e^{-t/\tau}\bigr)$ for $t \ge 0$. It reaches $63.2\,\%$ of its final value at $t = \tau$, has rise time $t_r = \tau\ln9 = 2.20\tau$, settles to within $2\,\%$ at $t_s = \tau\ln50 = 3.91\tau \approx 4\tau$, and never overshoots.
:::

::: proof
Partial fractions give $Y(s) = K/[s(\tau s + 1)] = K/s - K\tau/(\tau s + 1)$, which inverts to $K(1 - e^{-t/\tau})$. The response reaches a fraction $f$ of $K$ when $e^{-t/\tau} = 1 - f$, at $t = -\tau\ln(1 - f)$. So $t_{10} = 0.105\tau$, $t_{90} = 2.303\tau$ and $t_r = \tau\ln(0.9/0.1) = \tau\ln9$; the $2\,\%$ band is entered when $e^{-t/\tau} = 0.02$, at $t = \tau\ln50$. The response is monotonic because its derivative $(K/\tau)e^{-t/\tau}$ never changes sign.
:::

The pole position is the whole story: moving the pole twice as far into the left half-plane halves every time in the response. That is what feedback did to the motor in [[control-systems/modelling-dynamic-systems#ex-speed-loop]]: the loop multiplied the pole's distance from the origin by $1 + L(0)$.

## Second-order systems

A position servo — a motor whose angle, rather than speed, is fed back — is the classic second-order loop. With the first-order motor model $\Omega/V = K_m/(\tau s + 1)$, the angle is $\Theta = \Omega/s$, and a proportional amplifier $K_a$ in a unity-feedback loop gives

$$
\frac{\Theta(s)}{R(s)} = \frac{K_aK_m/\tau}{s^2 + s/\tau + K_aK_m/\tau}.
$$ {#eq-servo}

This is the **standard second-order system** $\omega_n^2/(s^2 + 2\zeta\omega_ns + \omega_n^2)$ with natural frequency $\omega_n$ and damping ratio $\zeta$; for the servo $\omega_n^2 = K_aK_m/\tau$ and $2\zeta\omega_n = 1/\tau$. Raising the amplifier gain raises $\omega_n$ but, because $2\zeta\omega_n$ is fixed, lowers $\zeta$ in proportion to $1/\sqrt{K_a}$. Speed and damping cannot both be had by turning one knob, which is the first sign of the trade-offs that run through this course.

::: theorem Underdamped step response {#thm-step-second}
For $0 < \zeta < 1$ the poles of the standard second-order system are $s = -\sigma \pm j\omega_d$ with $\sigma = \zeta\omega_n$ and **damped natural frequency** $\omega_d = \omega_n\sqrt{1 - \zeta^2}$, and its unit-step response is

$$
y(t) = 1 - \frac{e^{-\zeta\omega_nt}}{\sqrt{1 - \zeta^2}}\sin\bigl(\omega_dt + \phi\bigr),\qquad \phi = \arccos\zeta,\quad t \ge 0.
$$ {#eq-step-second}
:::

::: proof
$Y(s) = \omega_n^2/[s(s^2 + 2\zeta\omega_ns + \omega_n^2)]$. Partial fractions with the quadratic kept whole:

$$
Y(s) = \frac1s - \frac{s + 2\zeta\omega_n}{(s + \sigma)^2 + \omega_d^2} = \frac1s - \frac{s + \sigma}{(s + \sigma)^2 + \omega_d^2} - \frac{\sigma}{\omega_d}\,\frac{\omega_d}{(s + \sigma)^2 + \omega_d^2},
$$

since $(s + \sigma)^2 + \omega_d^2 = s^2 + 2\zeta\omega_ns + \omega_n^2$. Using the shifted transforms of cosine and sine,

$$
y(t) = 1 - e^{-\sigma t}\Bigl(\cos\omega_dt + \frac{\zeta}{\sqrt{1 - \zeta^2}}\sin\omega_dt\Bigr).
$$

The bracket equals $\dfrac{1}{\sqrt{1 - \zeta^2}}\bigl(\sqrt{1 - \zeta^2}\cos\omega_dt + \zeta\sin\omega_dt\bigr) = \dfrac{\sin(\omega_dt + \phi)}{\sqrt{1 - \zeta^2}}$ with $\sin\phi = \sqrt{1 - \zeta^2}$ and $\cos\phi = \zeta$.
:::

::: proposition Transient specifications of the second-order system {#prop-specs}
For $0 < \zeta < 1$ the step response [[#eq-step-second]] has

$$
t_p = \frac{\pi}{\omega_d},\qquad M_p = e^{-\pi\zeta/\sqrt{1 - \zeta^2}},\qquad t_s \approx \frac{4}{\zeta\omega_n}\ \ (2\,\%),
$$ {#eq-specs}

and conversely the damping ratio that gives overshoot $M_p$ is

$$
\zeta = \frac{-\ln M_p}{\sqrt{\pi^2 + \ln^2M_p}} .
$$ {#eq-zeta-from-os}

The rise time has no closed form; the curve fit $\omega_nt_r \approx 1 + 1.039\zeta - 0.417\zeta^2 + 1.768\zeta^3$ is accurate to a few per cent for $0 < \zeta < 0.9$.
:::

::: proof
The impulse response is the derivative of the step response, and the inverse transform of $\omega_n^2/[(s + \sigma)^2 + \omega_d^2]$ gives $\dot y(t) = (\omega_n/\sqrt{1 - \zeta^2})\,e^{-\sigma t}\sin\omega_dt$. It first vanishes for $t > 0$ at $\omega_dt = \pi$, which is $t_p$. There $\sin(\pi + \phi) = -\sin\phi = -\sqrt{1 - \zeta^2}$, so $y(t_p) = 1 + e^{-\sigma\pi/\omega_d}$, and $\sigma/\omega_d = \zeta/\sqrt{1 - \zeta^2}$ gives $M_p$. Taking logarithms, $\ln M_p\sqrt{1 - \zeta^2} = -\pi\zeta$; squaring and solving for $\zeta$ gives [[#eq-zeta-from-os]]. For the settling time, the deviation from $1$ is bounded by the **envelope** $e^{-\sigma t}/\sqrt{1 - \zeta^2}$; ignoring the factor $1/\sqrt{1 - \zeta^2}$, it falls below $0.02$ when $\sigma t = \ln50 = 3.9 \approx 4$.
:::

The estimate $t_s \approx 4/(\zeta\omega_n)$ is a bound based on the envelope; the actual settling time jumps in steps as successive peaks fall inside the band, and is often somewhat shorter. For $\zeta = 0.5$ the exact $2\,\%$ settling time is $8.08/\omega_n$ against the estimate $8.0/\omega_n$; for $\zeta = 0.7$ it is $5.98/\omega_n$ against $5.7/\omega_n$.

::: widget plot
f: 1 - exp(-c*w*x)/sqrt(1 - c^2)*sin(w*sqrt(1 - c^2)*x + acos(c)); 1 + exp(-c*w*x)/sqrt(1 - c^2); 1 - exp(-c*w*x)/sqrt(1 - c^2)
x: 0, 12
y: 0, 2
sliders: c=0.5:0.05:0.95:0.01; w=1:0.5:3:0.1
hlines: 1.02; 0.98
labels: y(t); \text{envelope}; \text{envelope}
caption: Step response of the standard second-order system with damping ratio $c = \zeta$ and natural frequency $w = \omega_n$ (rad/s), with the decaying envelope $1 \pm e^{-\zeta\omega_nt}/\sqrt{1 - \zeta^2}$ and the $2\,\%$ band. Change $w$ with $c$ fixed: the whole response is compressed in time but the overshoot is unchanged — overshoot depends on $\zeta$ alone. Change $c$: the peak falls, and the response leaves the band for the last time roughly where the envelope enters it.
:::

### Specifications as regions of the s-plane

The formulas [[#eq-specs]] each depend on one coordinate of the pole position. Overshoot depends only on $\zeta = \cos\theta$, where $\theta$ is the angle between the pole and the negative real axis: poles on a ray from the origin all have the same overshoot. Settling time depends on the real part $\sigma = \zeta\omega_n$: poles on a vertical line settle equally fast. Peak time depends on the imaginary part $\omega_d$. A specification "overshoot below $10\,\%$ and settling time below $0.1\,\mathrm{s}$" therefore becomes a region of the $s$-plane: inside a wedge of half-angle $\arccos0.59 = 54^\circ$ about the negative real axis, and to the left of the line $\sigma = 4/0.1 = 40\,\mathrm{s^{-1}}$. The root-locus method of [[control-systems/root-locus]] designs controllers by steering the closed-loop poles into such a region.

::: example Designing a position servo for 10 % overshoot {#ex-servo}
The motor of [[control-systems/modelling-dynamic-systems#ex-motor]], with first-order model $K_m = 19.84\,\mathrm{rad\,s^{-1}/V}$ and $\tau = 15.87\,\mathrm{ms}$, is used in a unity-feedback position loop [[#eq-servo]] with a proportional amplifier. Choose the amplifier gain $K_a$ (in V/rad) for $10\,\%$ overshoot and find $\omega_n$, $t_p$, $t_r$ and $t_s$.
::: solution
By [[#eq-zeta-from-os]], $M_p = 0.1$ requires

$$
\zeta = \frac{-\ln0.1}{\sqrt{\pi^2 + \ln^20.1}} = \frac{2.303}{3.895} = 0.591 .
$$

From $2\zeta\omega_n = 1/\tau$, $\omega_n = 1/(2\times0.591\times0.01587) = 53.3\,\mathrm{rad/s}$, and from $\omega_n^2 = K_aK_m/\tau$,

$$
K_a = \frac{\omega_n^2\tau}{K_m} = \frac{53.3^2\times0.01587}{19.84} = 2.27\,\mathrm{V/rad}.
$$

Then $\omega_d = 53.3\sqrt{1 - 0.349} = 43.0\,\mathrm{rad/s}$, $t_p = \pi/43.0 = 73\,\mathrm{ms}$, the curve fit gives $t_r \approx 1.83/53.3 = 34\,\mathrm{ms}$, and the estimate $t_s \approx 4/(\zeta\omega_n) = 4/31.5 = 127\,\mathrm{ms}$. Simulating the loop gives exactly $10.0\,\%$ overshoot at $73\,\mathrm{ms}$, $t_r = 34\,\mathrm{ms}$ and $t_s = 111\,\mathrm{ms}$ — the envelope estimate is conservative. Settling faster at the same overshoot requires moving $\sigma = 1/(2\tau) = 31.5\,\mathrm{s^{-1}}$, which proportional control cannot change: we shall need a compensator ([[control-systems/compensator-design]]).
:::
:::

::: quiz
Two closed loops have dominant poles at $-2 \pm 6j$ and at $-6 \pm 6j$. Which statement is true?
- [ ] They have the same overshoot because their imaginary parts are equal.
- [x] They have the same peak time, but the second settles faster and overshoots less.
- [ ] They have the same settling time.
- [ ] The first settles faster because its poles are closer to the origin.
::: solution
The peak time $\pi/\omega_d$ depends only on the imaginary part, $6\,\mathrm{rad/s}$ for both, so $t_p = 0.52\,\mathrm{s}$ in each case. The settling time $\approx 4/\sigma$ is $2\,\mathrm{s}$ for the first and $0.67\,\mathrm{s}$ for the second. The damping ratios are $\cos\theta = 2/\sqrt{40} = 0.32$ (overshoot $35\,\%$) and $6/\sqrt{72} = 0.71$ (overshoot $4.3\,\%$).
:::
:::

## Additional poles and zeros

A real loop has more than two poles — the motor's electrical pole, a sensor filter, an amplifier's bandwidth — and often zeros, from a compensator or from the plant itself. The second-order formulas remain useful if one pair of poles dominates.

::: definition Dominant poles {#def-dominant}
A pole (or complex pair) of a stable system is **dominant** if every other pole lies much further to the left — a common rule of thumb is at least five times further from the imaginary axis — and no zero lies close to it. The response is then approximately that of the dominant poles alone, with the DC gain of the whole system.
:::

The reason is that the residue of each pole sets the amplitude of its term and the real part sets how quickly it decays; a pole far to the left contributes a term that is both small and gone in a fraction of the dominant settling time. The rule is a rule of thumb, as the next example shows.

::: example How far is far enough? {#ex-extra-pole}
The system $G(s) = \dfrac{p}{(s^2 + s + 1)(s + p)}$ has the dominant pair $\zeta = 0.5$, $\omega_n = 1$ (alone: overshoot $16.3\,\%$, $t_p = 3.63\,\mathrm{s}$) and a real pole at $-p$. How do the overshoot and peak time change for $p = 10, 5, 2, 1, 0.5$?
::: solution
Simulating the step responses (the DC gain is $1$ in every case):

| $p$ | $10$ | $5$ | $2$ | $1$ | $0.5$ |
|---|---|---|---|---|---|
| overshoot | $16.2\,\%$ | $15.9\,\%$ | $13.9\,\%$ | $8.1\,\%$ | none |
| $t_p$ (s) | $3.73$ | $3.85$ | $4.23$ | $4.92$ | — |

With the real pole ten times further left than the pair ($\sigma = 0.5$), the response is indistinguishable from the second-order one; at five times it is within a few per cent. When the extra pole approaches the pair it slows the response and reduces the overshoot, and at $p = 0.5$ it is itself dominant: the response becomes a sluggish, monotonic, essentially first-order rise. An extra pole always adds lag; it never speeds a system up.
:::
:::

Zeros act differently. Write a system with a zero at $s = -z$ as $G(s) = (1 + s/z)G_0(s)$, where $G_0$ has the same poles and DC gain.

::: proposition Effect of a zero on the step response {#prop-zero}
If $y_0(t)$ is the step response of $G_0(s)$, then the step response of $G(s) = (1 + s/z)G_0(s)$ is

$$
y(t) = y_0(t) + \frac{1}{z}\,\dot y_0(t).
$$ {#eq-zero}

A left-half-plane zero ($z > 0$) adds a multiple of the derivative of $y_0$, which speeds up the rise and increases the overshoot, the more so the closer the zero is to the origin. A right-half-plane zero ($z < 0$) subtracts the derivative, so the response first moves in the wrong direction (**undershoot**).
:::

::: proof
$Y(s) = G_0(s)/s + (1/z)\,sG_0(s)/s$. The first term is the transform of $y_0$, and multiplying a transform by $s$ corresponds to differentiation (with $y_0(0) = 0$ for a strictly proper $G_0$). At $t = 0^+$, $\dot y_0 > 0$ while $y_0 \approx 0$, so for $z < 0$ the sum is negative at first.
:::

For the pair $\zeta = 0.5$, $\omega_n = 1$, a zero at $-5$ raises the overshoot from $16.3\,\%$ to $16.7\,\%$, at $-2$ to $19.1\,\%$, at $-1$ to $29.8\,\%$ and at $-0.5$ to $70\,\%$. A right-half-plane zero at $+1$ gives an initial dip to $-0.28$ before the response rises — and the overshoot rises too, to $20.9\,\%$.

::: widget plot
f: 1 - exp(-c*x)/sqrt(1 - c^2)*sin(sqrt(1 - c^2)*x + acos(c)) + k*exp(-c*x)/sqrt(1 - c^2)*sin(sqrt(1 - c^2)*x); 1 - exp(-c*x)/sqrt(1 - c^2)*sin(sqrt(1 - c^2)*x + acos(c))
x: 0, 14
y: -0.8, 2
sliders: k=0.5:-1.5:1.5:0.05; c=0.5:0.2:0.9:0.05
hlines: 1
labels: \text{with zero}; \text{without zero}
caption: Step responses of $(1 + s/z)/(s^2 + 2\zeta s + 1)$ (blue) and of the same system without the zero (orange), time in units of $1/\omega_n$, with $k = 1/z$ on the slider and $c = \zeta$. Positive $k$ is a left-half-plane zero at $s = -1/k$: the response rises faster and overshoots more. Drag $k$ below zero: the zero moves into the right half-plane and the response starts by going the wrong way.
:::

::: application The right-half-plane zero of a boost converter
The averaged boost converter has a control-to-output transfer function with a right-half-plane zero at $\omega_z = (1 - D)^2R/L$, where $D$ is the duty cycle and $R$ the load. When the controller raises the duty cycle to increase the output, the inductor is connected to the output for a smaller fraction of each period, so the output first *falls* while the inductor current builds up, and only then rises. For $V_{in} = 5\,\mathrm{V}$, $V_o = 12\,\mathrm{V}$ ($D = 0.583$), $R = 12\,\Omega$ and $L = 10\,\mathrm{\mu H}$, the zero is at $2.08\times10^5\,\mathrm{s^{-1}}$ ($33\,\mathrm{kHz}$). No controller can remove a right-half-plane zero of the plant — cancelling it would need an unstable pole — so the voltage loop of a boost converter is designed with a crossover well below it, typically a fifth or less ([[power-electronics/converter-control]]).
:::

## Steady-state error

The transient tells us how the output gets there; the steady-state error tells us where it ends up. For a unity-feedback loop with loop gain $L(s)$ the error is

$$
E(s) = R(s) - Y(s) = \frac{1}{1 + L(s)}\,R(s).
$$ {#eq-error}

The function $S(s) = 1/(1 + L(s))$ is the **sensitivity function**; it reappears in [[control-systems/frequency-response-methods]] as a measure of robustness. If the closed loop is stable, the final-value theorem ([[circuits-2/laplace-circuit-analysis#thm-ivt-fvt]]) gives $e_\infty = \lim_{s\to0}sE(s)$.

::: definition System type and error constants {#def-type}
Write the loop gain as $L(s) = \dfrac{K\,N(s)}{s^N D(s)}$ with $N(0) = D(0) = 1$. The integer $N$, the number of integrators (poles at the origin) in the loop, is the **type** of the system. The **position**, **velocity** and **acceleration error constants** are

$$
K_p = \lim_{s\to0}L(s),\qquad K_v = \lim_{s\to0}sL(s),\qquad K_a = \lim_{s\to0}s^2L(s).
$$ {#eq-error-constants}
:::

::: theorem Steady-state errors of a unity-feedback loop {#thm-ss-error}
If the closed loop is stable, the steady-state errors are

| loop type | step $r = u(t)$ | ramp $r = t\,u(t)$ | parabola $r = \tfrac12t^2u(t)$ |
|---|---|---|---|
| $0$ | $\dfrac{1}{1 + K_p}$ | $\infty$ | $\infty$ |
| $1$ | $0$ | $\dfrac{1}{K_v}$ | $\infty$ |
| $2$ | $0$ | $0$ | $\dfrac{1}{K_a}$ |
:::

::: proof
For a step, $e_\infty = \lim_{s\to0}s\cdot\frac{1}{s}\cdot\frac{1}{1 + L(s)} = \frac{1}{1 + K_p}$; $K_p$ is finite for type $0$ and infinite for type $1$ or more. For a ramp, $e_\infty = \lim_{s\to0}\frac{1}{s + sL(s)} = \frac{1}{\lim sL(s)} = \frac{1}{K_v}$, where $K_v = 0$ for type $0$, finite for type $1$ and infinite for type $2$ or more. For the parabola the same argument with $1/s^3$ gives $1/K_a$.
:::

The theorem has a simple physical reading. In a type-1 loop an integrator sits between the error and the output; its output can only be constant if its input is zero, so a constant output requires zero error. To follow a ramp, the integrator's output must grow steadily, which needs a constant input: a constant error proportional to the ramp rate.

::: example Following a ramp {#ex-ramp}
The servo of [[#ex-servo]] is commanded to track an angle that increases at $2\,\mathrm{rad/s}$. Find the steady-state tracking error. Then show that for this loop $K_v = \omega_n/(2\zeta)$, and comment.
::: solution
The loop gain is $L(s) = K_aK_m/[s(\tau s + 1)]$, type $1$, with $K_v = K_aK_m = 2.27\times19.84 = 45.1\,\mathrm{s^{-1}}$. A ramp of slope $2\,\mathrm{rad/s}$ gives $e_\infty = 2/45.1 = 0.044\,\mathrm{rad}$ ($2.5^\circ$). From $\omega_n^2 = K_aK_m/\tau$ and $2\zeta\omega_n = 1/\tau$,

$$
K_v = K_aK_m = \omega_n^2\tau = \frac{\omega_n^2}{2\zeta\omega_n} = \frac{\omega_n}{2\zeta}.
$$

With proportional control, a smaller tracking error (larger $K_v$) can only be bought with less damping. A lag compensator ([[control-systems/compensator-design]]) breaks this link by raising the low-frequency gain alone.
:::
:::

### Disturbances and where the integrator sits

The error constants describe tracking. For disturbances what matters is where the integrator sits relative to the point where the disturbance enters.

::: example A load torque on a position servo {#ex-disturbance}
The servo of [[#ex-servo]] carries a constant load torque $\tau_L = 10\,\mathrm{mN\,m}$. Using the disturbance gain $K_d = 794\,\mathrm{rad\,s^{-1}/(N\,m)}$ of the motor ([[control-systems/modelling-dynamic-systems#ex-motor]]), find the steady-state angle error with $r = 0$.
::: solution
The angle is $\Theta = \frac{1}{s}\bigl[G_v(s)K_a(R - \Theta) - G_d(s)T_L\bigr]$ with $G_v = K_m/(\tau s + 1)$ and $G_d = K_d/(\tau s + 1)$. Multiplying by $s(\tau s + 1)$ and setting $R = 0$,

$$
\Theta(s) = \frac{-K_d}{\tau s^2 + s + K_aK_m}\,T_L(s).
$$

For a constant torque the final-value theorem gives $\theta_\infty = -K_d\tau_L/(K_aK_m) = -794\times0.01/45.1 = -0.176\,\mathrm{rad}$, about $10^\circ$. The loop is type $1$ and follows steps of $r$ perfectly, yet a step of load torque leaves an error, because the integrator (the motor's angle being the integral of speed) lies *after* the point where the torque enters. To hold a load torque with zero angle error, the controller must deliver a steady voltage with zero error at its input — which only an integrator in the controller can do. This is the main reason for the integral term in PID control ([[control-systems/pid-control]]).
:::
:::

::: quiz
A unity-feedback loop has $L(s) = \dfrac{20(s + 2)}{s(s + 1)(s + 10)}$ and is stable. What is the steady-state error for a unit ramp?
- [ ] $0$
- [x] $0.25$
- [ ] $1/21$
- [ ] infinite
::: solution
The loop is type $1$ with $K_v = \lim_{s\to0}sL(s) = 20\times2/(1\times10) = 4$, so $e_\infty = 1/K_v = 0.25$. The step error is zero; the parabola error would be infinite. (The loop is stable: the characteristic polynomial $s^3 + 11s^2 + 30s + 40$ has positive coefficients and $11\times30 > 40$, as [[control-systems/stability]] will show is required.)
:::
:::

::: warning The final-value theorem needs a stable closed loop
$\lim_{s\to0}sE(s)$ always returns a number, but that number is the steady-state error only if $sE(s)$ has all its poles in the left half-plane. Apply it to an unstable loop and it will report a small, finite error for a response that in fact grows without bound. Check stability first ([[control-systems/stability]]).
:::

::: history
The specifications used here grew out of the servomechanism work of the 1930s. Harold Hazen at MIT published "Theory of servo-mechanisms" in 1934, coining the word and analysing the transient response and steady-state errors of position-control systems, including their response to ramps. During the Second World War the gun-director and radar-tracking projects at the MIT Radiation Laboratory and Bell Laboratories made step-response specifications, error constants and system type standard practice; the wartime results were collected in *Theory of Servomechanisms* (1947) by James, Nichols and Phillips, the first textbook of feedback control.
:::

## Where this leads

The pole positions that determine the transient are the closed-loop poles, the roots of $1 + L(s) = 0$. Whether they are in the left half-plane at all is the subject of [[control-systems/stability]]; how they move as a gain changes is the [[control-systems/root-locus]]. The dominant-pair formulas [[#eq-specs]] are the design targets of [[control-systems/compensator-design]], the error constants are what integral action and lag compensation improve, and the frequency-domain counterparts of overshoot and settling time — phase margin and crossover frequency — appear in [[control-systems/frequency-response-methods]].

::: summary
- A first-order system $K/(\tau s + 1)$ rises with $t_r = 2.2\tau$, settles with $t_s \approx 4\tau$ and never overshoots.
- The standard second-order system has $t_p = \pi/\omega_d$, overshoot $e^{-\pi\zeta/\sqrt{1 - \zeta^2}}$ and $t_s \approx 4/(\zeta\omega_n)$; overshoot depends only on $\zeta$, settling only on the real part of the poles.
- Specifications define a region of the $s$-plane: a wedge for overshoot and a half-plane for settling time.
- A pair of poles dominates when other poles are at least about five times further left; extra poles slow the response and reduce overshoot.
- A zero adds $(1/z)\dot y_0$ to the response: left-half-plane zeros increase overshoot, right-half-plane zeros cause undershoot and cannot be cancelled.
- With unity feedback the error is $R/(1 + L)$; a type-$N$ loop follows inputs up to $t^{N-1}$ with zero error and $t^N$ with error $1/K_p$, $1/K_v$ or $1/K_a$.
- To reject a constant disturbance the integrator must lie between the error and the point where the disturbance enters.
:::

## Exercises

::: exercise First-order settling {level=1 check="-2e-3*ln(0.05)"}
A current loop behaves as a first-order system with $\tau = 2\,\mathrm{ms}$. How long (in seconds) does its step response take to reach $95\,\%$ of its final value?
::: solution
$1 - e^{-t/\tau} = 0.95$ gives $t = \tau\ln20 = 2\,\mathrm{ms}\times3.00 = 5.99\,\mathrm{ms}$ — the familiar "three time constants to $95\,\%$".
:::
:::

::: exercise Overshoot from damping {level=1 check="100*exp(-pi*0.4/sqrt(1 - 0.16))"}
A second-order system has $\zeta = 0.4$. Find its percentage overshoot.
::: solution
$M_p = e^{-\pi\times0.4/\sqrt{0.84}} = e^{-1.371} = 0.254$, an overshoot of $25.4\,\%$.
:::
:::

::: exercise Reading pole positions {level=1 check="pi/4"}
A system has poles at $s = -3 \pm 4j$ and no zeros. Find $\zeta$, $\omega_n$, the estimated $2\,\%$ settling time and the peak time (give the peak time in seconds).
::: solution
$\omega_n = \abs{-3 + 4j} = 5\,\mathrm{rad/s}$, $\zeta = 3/5 = 0.6$, $t_s \approx 4/3 = 1.33\,\mathrm{s}$, $t_p = \pi/4 = 0.785\,\mathrm{s}$. The overshoot is $e^{-\pi\times0.6/0.8} = 9.5\,\%$.
:::
:::

::: exercise Identifying a system from its step response {level=2}
A step test on a closed loop shows $25\,\%$ overshoot with the peak at $10\,\mathrm{ms}$ and a final value equal to the command. Assuming a standard second-order response, find $\zeta$ and $\omega_n$, and predict the $2\,\%$ settling time.
::: solution
By [[#eq-zeta-from-os]], $\zeta = 1.386/\sqrt{9.870 + 1.922} = 0.404$. From $t_p = \pi/\omega_d$, $\omega_d = 314.2\,\mathrm{rad/s}$, so $\omega_n = 314.2/\sqrt{1 - 0.163} = 343\,\mathrm{rad/s}$. Then $t_s \approx 4/(0.404\times343) = 28.9\,\mathrm{ms}$.
:::
:::

::: exercise Is the pair dominant? {level=2}
Compare the step response of $G(s) = 160/[(s^2 + 4s + 8)(s + 20)]$ with that of its dominant-pole approximation. Give the approximation (with the correct DC gain) and the overshoot and peak time of both.
::: solution
The pair $s^2 + 4s + 8$ has $\omega_n = 2.83\,\mathrm{rad/s}$, $\zeta = 0.707$, real part $-2$; the third pole at $-20$ is ten times further left. The approximation keeping the DC gain $160/(8\times20) = 1$ is $8/(s^2 + 4s + 8)$, with overshoot $4.3\,\%$ and $t_p = \pi/2 = 1.57\,\mathrm{s}$. Simulating the full system gives $4.3\,\%$ at $1.63\,\mathrm{s}$: the extra pole adds a small delay of about $1/20\,\mathrm{s}$ and otherwise changes nothing visible.
:::
:::

::: exercise Velocity error constant {level=2 check="0.1"}
A unity-feedback loop has $L(s) = 50/(s(s + 5))$. Find the steady-state error (in the units of the input) for the ramp $r(t) = t$.
::: solution
$K_v = \lim_{s\to0}sL(s) = 50/5 = 10\,\mathrm{s^{-1}}$, so $e_\infty = 1/K_v = 0.1$. The loop is stable ($s^2 + 5s + 50$ has positive coefficients), so the result is valid. Its damping ratio is $5/(2\sqrt{50}) = 0.35$: a good ramp error, but $30\,\%$ overshoot.
:::
:::

::: exercise A boost converter's zero {level=2 check="(1 - 0.5)^2*6/22e-6"}
A boost converter steps $12\,\mathrm{V}$ up to $24\,\mathrm{V}$ ($D = 0.5$) into $R = 6\,\Omega$ with $L = 22\,\mathrm{\mu H}$. Find the right-half-plane zero of its control-to-output transfer function in $\mathrm{s^{-1}}$ (rad/s), and suggest a maximum crossover frequency for its voltage loop.
::: solution
$\omega_z = (1 - D)^2R/L = 0.25\times6/(22\times10^{-6}) = 6.82\times10^4\,\mathrm{s^{-1}}$, i.e. $10.9\,\mathrm{kHz}$. Following the rule of a crossover at most a fifth of the zero frequency, the voltage loop should cross over below about $2\,\mathrm{kHz}$. The zero moves down at heavy load (small $R$), so this is the worst case only if $6\,\Omega$ is the heaviest load.
:::
:::

::: exercise Design with velocity feedback {level=3}
The servo of [[#ex-servo]] ($K_m = 19.84\,\mathrm{rad\,s^{-1}/V}$, $\tau = 15.87\,\mathrm{ms}$) is given an inner tachometer loop, so that its closed-loop transfer function is $\Theta/R = K_aK_m/[\tau s^2 + (1 + K_mK_t)s + K_aK_m]$ (see [[control-systems/modelling-dynamic-systems]], exercise "A loop with an inner loop"). Choose $K_a$ and $K_t$ for $\zeta = 0.7$ and $\omega_n = 100\,\mathrm{rad/s}$. Find the resulting overshoot, settling time and velocity error constant, and compare with [[#ex-servo]].
::: solution
Dividing by $\tau$: $\omega_n^2 = K_aK_m/\tau$ and $2\zeta\omega_n = (1 + K_mK_t)/\tau$. Hence $K_a = \omega_n^2\tau/K_m = 10^4\times0.01587/19.84 = 8.00\,\mathrm{V/rad}$, and $1 + K_mK_t = 2\times0.7\times100\times0.01587 = 2.222$, so $K_t = 1.222/19.84 = 0.0616\,\mathrm{V\,s/rad}$. The overshoot is $4.6\,\%$ and $t_s \approx 4/70 = 57\,\mathrm{ms}$, against $10\,\%$ and $111\,\mathrm{ms}$ without the tachometer. The price is the ramp error: with the tachometer inside the loop, the type-1 loop gain is $L = K_aK_m/[s(\tau s + 1 + K_mK_t)]$, so $K_v = K_aK_m/2.222 = 71.4\,\mathrm{s^{-1}}$ — still better than $45\,\mathrm{s^{-1}}$, because $K_a$ is larger, but less than the $159\,\mathrm{s^{-1}}$ that $K_a = 8$ alone would give.
:::
:::

::: exercise Peak time and overshoot with a zero {level=3}
(a) Using [[#eq-zero]], show that for $G(s) = (1 + s/z)\omega_n^2/(s^2 + 2\zeta\omega_ns + \omega_n^2)$ the response has a peak where $\tan(\omega_dt) = \sqrt{1 - \zeta^2}/(\zeta - \omega_n/z)$, provided the right-hand side is defined. (b) Evaluate the peak time for $\zeta = 0.5$, $\omega_n = 1$, $z = 1$ and check it against the overshoot of $29.8\,\%$ quoted in the text.
::: hint
Differentiate $y = y_0 + \dot y_0/z$ and use the expression for $\dot y_0$ from the proof of [[#prop-specs]].
:::
::: solution
(a) With $\dot y_0 = (\omega_n/\sqrt{1 - \zeta^2})\,e^{-\sigma t}\sin\omega_dt$,

$$
\dot y = \dot y_0 + \frac{\ddot y_0}{z} = \frac{\omega_ne^{-\sigma t}}{\sqrt{1 - \zeta^2}}\Bigl[\sin\omega_dt + \frac{1}{z}\bigl(\omega_d\cos\omega_dt - \sigma\sin\omega_dt\bigr)\Bigr].
$$

Setting the bracket to zero: $\sin\omega_dt\,(1 - \sigma/z) = -(\omega_d/z)\cos\omega_dt$, i.e. $\tan\omega_dt = -\omega_d/(z - \sigma)$. Dividing numerator and denominator by $\omega_n$ and using $\sigma = \zeta\omega_n$, $\tan\omega_dt = \sqrt{1 - \zeta^2}/(\zeta - \omega_n/z)$.

(b) $\tan(0.866t) = 0.866/(0.5 - 1) = -1.732$; the first positive solution is $0.866t = 2\pi/3$, $t = 2.418\,\mathrm{s}$. There $y = 1 - \frac{e^{-1.209}}{0.866}\sin(2.094 + 1.047) + \frac{e^{-1.209}}{0.866}\sin2.094 = 1 + 0 + 0.3447\times0.866 = 1.298$: an overshoot of $29.8\,\%$, as quoted. The zero has brought the peak forward from $3.63\,\mathrm{s}$ to $2.42\,\mathrm{s}$.
:::
:::
