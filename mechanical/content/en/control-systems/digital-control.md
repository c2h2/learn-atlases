Every control loop built since about 1985 runs on a computer, and the difference between that and the theory of the previous eight lessons is smaller than students expect and larger than engineers plan for. Smaller, because the sample-and-hold of a fast computer is very nearly the continuous actuator of the design, and the frequency methods transfer across almost unchanged. Larger, because the computer introduces three things that no continuous system has — a **delay of one sample period**, an **aliasing of everything above half the sampling rate**, and a **discretisation choice** for every integrator and derivative in the controller — and each of them is a first-order effect on a loop designed near its limits.

The discipline reduces to one mapping and three consequences. The mapping is $z = \mathrm{e}^{sT}$, which folds the left half of the $s$-plane into the unit circle and makes stability a question of modulus rather than sign. The consequences are the half-sample delay's phase lag, which costs $\omega T / 2$ radians at the crossover and is the reason a digital loop's bandwidth is capped by its sample rate; aliasing, which puts unmeasurable noise inside the loop's own bandwidth; and the discretisation, which decides whether the controller's integrator has the gain it was designed for at the frequency where it matters. A digital control design that ignores all three still works, most of the time, which is why so many are shipped — and fails on the machine whose crossover happened to be raised in the last revision.

::: warning The three ways a digital loop fails that no continuous loop has
**Aliasing is not a nuisance, it is a control input.** A $950\ \mathrm{Hz}$ vibration on a sensor sampled at $1\ \mathrm{kHz}$ appears in the data as a $50\ \mathrm{Hz}$ signal, and $50\ \mathrm{Hz}$ is inside the loop's bandwidth, so the controller responds to it exactly as it responds to real motion. Nothing in the loop's own frequency response warns of this, because the aliased component arrives already at its false frequency and with full amplitude. The anti-alias filter is not optional and its phase lag must be included in the loop's phase budget — a design that spends its margin on bandwidth and then adds a $4\ \mathrm{kHz}$ two-pole filter has silently spent another $20^{\circ}$ at the crossover.
**The computation delay is a second, unmodelled delay.** The sample is taken at $t = 0$, the control is computed and written at $t = T$, and the plant sees it at $t = T$ — a delay of one full period on top of the half-period the hold accounts for. Designers model the half and forget the whole, and a loop with $20^{\circ}$ of margin at $\omega T = 0.5$ loses $28^{\circ}$ to the delay it did not model.
**The derivative's discretisation is a design decision, not a detail.** The backward difference $\left( e_k - e_{k - 1} \right) / T$ and the Tustin form differ by a factor of two in phase at the Nyquist frequency and by enough at the crossover that a derivative-heavy loop can be made stable or unstable by changing the sampling code and nothing else. If a loop's stability changes when the integrator is changed from forward to trapezoidal, the loop was never robustly designed.
:::

## Sampling and the z-transform

::: definition Sampling, the hold and the half-sample delay {#def-sampling}
An ideal sampler multiplies the continuous signal by an impulse train; a real one takes a value every $T$ seconds and holds it with a **zero-order hold** until the next. The hold's transfer function is
$$
H (s ) = \frac{1 - \mathrm{e}^{- sT}}{s},
$$
whose frequency response has magnitude $T \operatorname{sinc} \left( \omega T / \left( 2 \pi \right) \right)$ and phase
$$
\angle H = - \frac{\omega T}{2},
$$
exactly a **half-sample delay**. The Nyquist frequency is $\omega_N = \pi / T$, and any component of the sampled signal above $\omega_N$ appears, after sampling, at its alias $\left| \omega - 2 \pi k / T \right|$ inside $\left[ 0 , \omega_N \right]$ with its amplitude unchanged and its phase conjugated.
:::

::: definition The z-transform and the hold-equivalent discrete plant {#def-z}
The $z$-transform of the sampled sequence is $\mathcal{Z} \left\{ x_k \right\} = X (z ) = \sum_{k = 0}^{\infty} x_k z^{- k}$, and the map $z = \mathrm{e}^{sT}$ carries the imaginary axis onto the unit circle, the left half-plane into its interior, and the strip $\left| \operatorname{Im} s \right| < \pi / T$ one-to-one. Stability is $\left| z \right| < 1$.
The **hold-equivalent** discrete transfer function of a continuous plant $G (s )$ is
$$
G (z ) = \left( 1 - z^{- 1} \right) \mathcal{Z} \left\{ \frac{G (s )}{s} \right\},
$$
which for a first-order plant gives the closed form
$$
G (s ) = \frac{1}{\tau s + 1}
\quad\Longrightarrow\quad
G (z ) = \frac{1 - \mathrm{e}^{- T / \tau}}{z - \mathrm{e}^{- T / \tau}} .
$$
The three standard discretisations of an integrator $1 / s$ are the **forward** $T / \left( 2 z^{- 1} \right)$-family choice $T z / \left( z - 1 \right)$, the **backward** $T / \left( 1 - z^{- 1} \right)$ and the **trapezoidal or Tustin** $\left( T / 2 \right) \left( 1 + z^{- 1} \right) / \left( 1 - z^{- 1} \right)$, corresponding to the substitutions $s \rightarrow \left( z - 1 \right) / T$, $s \rightarrow \left( 1 - z^{- 1} \right) / T$ and $s \rightarrow \left( 2 / T \right) \left( z - 1 \right) / \left( z + 1 \right)$.
:::

::: widget plot
f: x/(2*sin(x/2)); x/(2*tan(x/2))
x: 0.02, 3.10
y: 0, 1.6
labels: backward difference; Tustin
caption: The gain of a discrete integrator relative to the ideal $1 / \left( \mathrm{j} \omega \right)$, against $\omega T$. Both tend to unity at low frequency. The backward difference reads high and diverges as $\omega T$ approaches $\pi$; the Tustin form reads low and falls to **zero** at the Nyquist frequency, where its numerator $1 + z^{- 1}$ vanishes. A derivative implemented by the inverse of the Tustin integrator therefore has a zero at the Nyquist frequency, which is a real and often unwelcome feature of the controller that was designed in continuous time and never noticed.
:::

::: example The hold-equivalent of a first-order plant {#ex-zoh}
A temperature loop has $G = 0.8 / \left( 45 s + 1 \right)$ and is sampled every $T = 1\ \mathrm{s}$. Find the discrete plant and the phase error the discretisation introduces at a crossover of $0.03\ \mathrm{rad / s}$.
::: solution
**Discrete plant.** With $\mathrm{e}^{- T / \tau} = \mathrm{e}^{- 1 / 45} = 0.9782$,
$$
G (z ) = 0.8 \times \frac{1 - 0.9782}{z - 0.9782} = \frac{0.01744}{z - 0.9782} .
$$
**DC gain.** $G (1 ) = 0.01744 / 0.0218 = 0.800$ $\checkmark$ — the hold-equivalent preserves the DC gain exactly, which is the property that makes the design transfer.
**Pole location.** The continuous pole at $- 1 / 45 = - 0.0222\ \mathrm{s^{- 1}}$ maps to $\mathrm{e}^{- 0.0222} = 0.9782$, a distance of $0.0218$ from the unit circle against the continuous distance of $0.0222$ — a $2\ \%$ error, small because $T \ll \tau$.
**Phase error.** The hold's lag at $0.03\ \mathrm{rad / s}$ is
$$
\frac{\omega T}{2} = \frac{0.03 \times 1}{2} = 0.015\ \mathrm{rad} = 0.86^{\circ},
$$
negligible against the loop's $69^{\circ}$ of phase margin.

*Check.* The exact discrete phase of $G \left( \mathrm{e}^{\mathrm{j} \omega T} \right)$ at $\omega = 0.03$ is $- 54.33^{\circ}$ against the continuous plant's $- 53.47^{\circ}$ — a difference of $0.86^{\circ}$, matching the half-sample estimate to a hundredth of a degree, which is the arithmetic proof that the hold's phase really is exactly $\omega T / 2$ and not an approximation. $\checkmark$

*Sanity.* The rule that falls out of this arithmetic is the one every drive manufacturer prints: **sample at least twenty times faster than the loop crossover**, and at that ratio the hold's cost is $\omega_{gc} T / 2 = 0.025\ \mathrm{rad} = 1.4^{\circ}$, which is a rounding error. The rule is not about the plant's pole, which discretises benignly at any reasonable rate; it is about the hold's phase, which grows linearly with the crossover and does not care how slow the plant is.
:::
:::

::: example Aliasing, worked {#ex-alias}
A position sensor is sampled at $1\ \mathrm{kHz}$. The machine transmits a $1.499\ \mathrm{kHz}$ structural vibration into the sensor at $2\ \mathrm{mm}$ amplitude, and the control loop has a sensitivity peak of $1.5$ at $10\ \mathrm{Hz}$. What does the loop see and do?
::: solution
**The benign case.** Sampling at $f_s = 1000\ \mathrm{Hz}$, a component at $f = 1499\ \mathrm{Hz}$ appears at $\left| 1499 - 1000 \right| = 499\ \mathrm{Hz}$ — inside the first Nyquist zone but far above the loop's $10\ \mathrm{Hz}$ bandwidth, where the sensitivity is $0.02$, so the loop rejects it and nothing happens.
**The dangerous case.** Change the vibration to $1049\ \mathrm{Hz}$ and the alias is $\left| 1049 - 1000 \right| = 49\ \mathrm{Hz}$: the loop sees a genuine $49\ \mathrm{Hz}$ signal of $2\ \mathrm{mm}$ amplitude.
**The response.** At $49\ \mathrm{Hz}$ the sensitivity is close to its peak, $\left| S \right| \approx 1.4$, so the loop **follows** the false signal rather than rejecting it, the command moves by $2.8\ \mathrm{mm}$ equivalent, and the operator sees the axis oscillating at a frequency at which no part of the machine is vibrating.
**The tell.** An aliased disturbance does not change when the loop is retuned, does not change when the machine is slowed, and **reverses its apparent frequency** when the sample rate is changed — the last being the diagnostic. Raising $f_s$ from $1\ \mathrm{kHz}$ to $1.2\ \mathrm{kHz}$ moves a $1049\ \mathrm{Hz}$ component's alias from $49\ \mathrm{Hz}$ to $151\ \mathrm{Hz}$, and an oscillation that jumps in frequency when the sample rate is changed is aliased.

*Check.* The general alias formula for a real signal sampled at $f_s$ is $f_{\text{alias}} = \left|\, \operatorname{round} \left( f / f_s \right) f_s - f \,\right|$, which for $f = 1049$, $f_s = 1000$ gives $\left| 1000 - 1049 \right| = 49$ $\checkmark$

*Sanity.* The reason this is a control problem and not a signal-processing problem is that the controller **acts** on the alias. A data-acquisition engineer who aliases a measurement gets a bad plot; a control engineer gets a limit cycle, and the loop's own gain is applied to the false signal. The fix is an analogue anti-alias filter before the converter — a two-pole Butterworth at a fifth of the Nyquist frequency, costing $2 \arctan \left( 2 \times 50 / 500 \right) \approx 23^{\circ}$ at a $50\ \mathrm{Hz}$ crossover, which must be in the phase budget from the start.
:::
:::

## Discrete design

::: definition Stability tests and the discrete root locus {#def-zstab}
A discrete loop is stable when all the closed-loop poles lie inside the unit circle. The **Jury test** plays the role of Routh for a polynomial $P (z ) = a_n z^n + \cdots + a_0$, requiring $P (1 ) > 0$, $\left( - 1 \right)^n P \left( - 1 \right) > 0$ and a table of determinant conditions; the **bilinear or Mőbius transform** $z = \left( 1 + w \right) / \left( 1 - w \right)$ maps the unit disk to the left half of the $w$-plane and lets the Routh array be used unchanged.
The **discrete root locus** is drawn on the $z$-plane for $1 + K G (z ) = 0$, and the region of acceptable second-order behaviour is the interior of a small circle near $z = 1$: lines of constant damping $\zeta$ are **spirals** $\left| z \right| = \mathrm{e}^{- \zeta \omega_n T / \sqrt{1 - \zeta^{2}}}$ and lines of constant natural frequency are logarithmic spirals, so the familiar $s$-plane design wedge becomes a curved region that shrinks as $T$ grows.
:::

::: proof The half-sample delay and the bandwidth ceiling {#proof-halfsample}
**The hold's phase.** From $H (s ) = \left( 1 - \mathrm{e}^{- sT} \right) / s$, write
$$
1 - \mathrm{e}^{- \mathrm{j} \omega T} = \mathrm{e}^{- \mathrm{j} \omega T / 2} \left( \mathrm{e}^{\mathrm{j} \omega T / 2} - \mathrm{e}^{- \mathrm{j} \omega T / 2} \right)
= 2 \mathrm{j} \sin \frac{\omega T}{2} \ \mathrm{e}^{- \mathrm{j} \omega T / 2},
$$
so $\angle H = 90^{\circ} - 90^{\circ} - \omega T / 2 = - \omega T / 2$ exactly, and $\left| H \right| = T \sin \left( \omega T / 2 \right) / \left( \omega T / 2 \right)$. The hold is therefore a pure half-sample delay multiplied by a real sinc — the delay is exact and the amplitude droop is the only deviation from an ideal delay. $\checkmark$
**The ceiling.** A loop with crossover $\omega_{gc}$ and a computation delay of one period plus the hold's half has a delay-induced phase loss of
$$
\Delta \varphi = \frac{3}{2} \omega_{gc} T .
$$
Requiring $\Delta \varphi$ not to exceed a third of a typical $60^{\circ}$ margin — twenty degrees, $0.35\ \mathrm{rad}$ — gives
$$
\omega_{gc} T \le \frac{2 \times 0.35}{3} = 0.23
\qquad\Longleftrightarrow\qquad
f_s \ge \frac{2 \pi}{0.23} f_{gc} \approx 27 f_{gc} .
$$
This is the origin of the "twenty to thirty times" rule quoted by every motion-controller vendor: it is not a theorem about sampling, it is an arithmetic statement about how much of the phase budget the designer is willing to spend on the computer. $\checkmark$
**What the rule does not cover.** A plant with an **existing** transport delay $\theta$ has a total delay of $\theta + 1.5 T$, and the ceiling becomes
$$
\omega_{gc} \le \frac{0.35}{\theta + 1.5 T},
$$
so a plant whose $\rho = \theta / \tau$ is already $0.3$ is far more constrained by its own physics than by the sample rate, and halving $T$ buys almost nothing. Conversely a rigid mechanical axis with $\theta = 0$ is limited almost entirely by $T$, and doubling the sample rate buys a proportionate increase in achievable bandwidth — which is why the servo-drive industry's sample rates rose with the bandwidths of the machines they drove and stopped rising when the mechanics became the limit.
:::

::: example Deadbeat control of a double integrator {#ex-deadbeat}
A point mass with $\ddot{x} = u$, driven through a zero-order hold of period $T$, is to be moved from rest to rest at a distance $x_0$ in the shortest possible time. Find the control sequence.
::: solution
**Discrete model.** With the state $\left[ x , v \right]^{T}$,
$$
\begin{bmatrix} x \\ v \end{bmatrix}_{k + 1}
= \begin{bmatrix} 1 & T \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} x \\ v \end{bmatrix}_k
+ \begin{bmatrix} T^{2} / 2 \\ T \end{bmatrix} u_k .
$$
**Two steps is the minimum**, because one step has one degree of freedom and two conditions to satisfy. Requiring $x_2 = v_2 = 0$ from $\left[ x_0 , 0 \right]$ gives
$$
\begin{bmatrix} 1.5 T^{2} & 0.5 T^{2} \\ T & T \end{bmatrix}
\begin{bmatrix} u_0 \\ u_1 \end{bmatrix}
= - \begin{bmatrix} x_0 \\ 0 \end{bmatrix}
\quad\Longrightarrow\quad
u_0 = - \frac{x_0}{T^{2}}, \qquad u_1 = + \frac{x_0}{T^{2}} .
$$
**The trajectory.** $x \left( T \right) = x_0 + \tfrac{1}{2} T^{2} u_0 = 0.5 x_0$ and $v \left( T \right) = - x_0 / T$; the mass arrives at the origin at $t = 2 T$ with zero velocity and **never overshoots**.
**The cost.** The required acceleration is $x_0 / T^{2}$: halving the sample period **quadruples** it. For a $0.1\ \mathrm{m}$ move on a stage with $T = 1\ \mathrm{ms}$, $u_0 = 10^{5}\ \mathrm{m / s^{2}}$, which no actuator of mass or force exists to deliver.

*Check.* Substituting: $x_1 = x_0 - 0.5 x_0 = 0.5 x_0$, $v_1 = - x_0 / T$, $x_2 = 0.5 x_0 - x_0 + 0.5 x_0 = 0$, $v_2 = - x_0 / T + x_0 / T = 0$ $\checkmark$

*Sanity.* Deadbeat is the pole-placement design with all poles at the origin — the fastest possible discrete response and the most aggressive controller the framework produces, and the reason it is almost never used raw. Its two standard defects are the enormous control effort shown here and **zero robustness**: a ten per cent error in the assumed mass leaves a residual oscillation that never dies, because deadbeat has no feedback action after the two steps. The practical form is a deadbeat-like pole placement with the poles moved inward to $\left| z \right| \approx 0.7$, which is the discrete equivalent of the dominant-pole approximation, plus the actuator limits of [[control-systems/pid-control]].
:::
:::

::: example A discrete PID from an analog design {#ex-dpid}
Convert the oven PI of Example 1 — $K_c = 3.68$, $T_i = 36.4\ \mathrm{s}$ — to a digital controller at $T = 1\ \mathrm{s}$, and give the difference equation.
::: solution
**Tustin integral.** $1 / s \rightarrow \left( T / 2 \right) \left( 1 + z^{- 1} \right) / \left( 1 - z^{- 1} \right)$, so with $u = K_c e + K_c \int e / T_i$,
$$
u_k = K_c e_k + u_{i, k},
\qquad
u_{i, k} = u_{i, k - 1} + \frac{K_c T}{2 T_i} \left( e_k + e_{k - 1} \right),
$$
and with the numbers $K_c T / \left( 2 T_i \right) = 3.68 / 72.8 = 0.0506$:
$$
\boxed{ u_k = 3.68\, e_k + u_{i, k - 1} + 0.0506 \left( e_k + e_{k - 1} \right) }
$$
**Anti-windup.** The integrator is clamped by back-calculation, $u_{i,k} \leftarrow u_{i,k} + \left( u_{\text{sat}} - u_k \right)$ with the tracking time constant set to $T_i$ as in the continuous design.
**Integral action at the crossover.** At $\omega_{gc} = 0.104\ \mathrm{rad / s}$ the Tustin integrator's gain error is $0.09\ \%$, because $\omega T / 2 = 0.052$ — the discretisation is essentially exact where the loop actually works.
**Where it is not exact.** At the Nyquist frequency $\omega_N = \pi = 3.14\ \mathrm{rad / s}$ the Tustin integrator's gain is **zero** (widget), so the controller's high-frequency gain is $K_c$ alone and the loop gain at Nyquist is $3.68 \times 0.8 / \sqrt{1 + \left( 45 \times 3.14 \right)^{2}} = 0.021$ — thirty-four decibels below unity, so the discretisation cannot destabilise this loop.

*Check.* The discrete loop's characteristic polynomial from $1 + C (z ) G (z ) = 0$ with the hold-equivalent plant of Example 1 has roots $z = 0.9675$ and $z = 0.9486$, both real, mapping back through $s = \ln z / T$ to $- 0.0330$ and $- 0.0528\ \mathrm{s^{- 1}}$. The continuous design's poles are $- 0.0327$ and $- 0.0549\ \mathrm{s^{- 1}}$, so the discretisation moves them by one and four per cent — and note that the continuous loop is itself two real poles here, not the ringing pair a $Z_i = 36.4\ \mathrm{s}$ integral time was meant to avoid. $\checkmark$

*Sanity.* The example is deliberately benign: a slow thermal loop at $T = 1\ \mathrm{s}$ has $\omega_{gc} T = 0.10$ and the discretisation is invisible. Repeat the same conversion on the $40\ \mathrm{rad / s}$ position servo at $T = 1\ \mathrm{ms}$ and $\omega_{gc} T = 0.04$, also benign. The trouble appears when a designer reuses a $1\ \mathrm{ms}$ current-loop code for a $200\ \mathrm{Hz}$ tension loop, where $\omega_{gc} T = 1.26$ and the Tustin integrator's gain error is $36\ \%$ — the loop then has a third less integral action than designed and a steady-state error three times the specification, with no instability to point at.
:::
:::

::: example Design {#ex-design-servo}
Design the digital position loop of the two-mass servo of Example 7 for a crossover of $32\ \mathrm{rad / s}$, given a PWM carrier of $8\ \mathrm{kHz}$.
::: solution
**Sample period.** Current-controlled drives update at the carrier's half-period when the modulation is centre-aligned, giving $T = 62.5\ \mu\mathrm{s}$; with one computation period of additional delay the total is $1.5 T = 94\ \mu\mathrm{s}$.
**Delay cost.** At the crossover,
$$
\Delta \varphi = 1.5 \omega_{gc} T = 1.5 \times 32 \times 62.5 \times 10^{- 6} = 0.003\ \mathrm{rad} = 0.17^{\circ},
$$
utterly negligible. The ratio $f_s / f_{gc} = 16{,}000 / 5.1 = 3100$, three orders of magnitude above the twenty-times rule.
**The real limit.** The coupling's antiresonance at $200\ \mathrm{rad / s}$ and resonance at $283\ \mathrm{rad / s}$, which the sample rate has nothing to do with.
**Where the sample rate does bite.** The current loop inside the drive, whose crossover is typically a fifth of the modulation frequency, $1.6\ \mathrm{kHz}$ or $10{,}000\ \mathrm{rad / s}$, has $\omega_{gc} T = 0.63$ and a delay loss of $1.5 \times 0.63 = 0.95\ \mathrm{rad} = 54^{\circ}$ — most of its phase budget, spent on the computer. This is why current loops are the hardest digital control problem in a drive, and why high-performance drives use one-sample-deadbeat current control with model-based prediction of the current one step ahead.
**Prediction.** Predicting the next current from the present one, $\hat{i}_{k + 1} = \Phi i_k + \Gamma u_k$, and applying the control computed from $\hat{i}_{k + 1}$ rather than $i_k$ recovers the whole-sample delay and costs one multiply-accumulate; it is the single most valuable trick in digital motor control and the reason a $16\ \mathrm{kHz}$ drive can hold a $6\ \mathrm{kHz}$ current-loop bandwidth.

*Design comment.* The arithmetic of this example is the honest answer to the question "what sample rate do I need?", which is: **the sample rate is never the limit on a position loop and almost always the limit on a current loop.** The position loop at $32\ \mathrm{rad / s}$ would tolerate $T = 1\ \mathrm{ms}$; the current loop at $10{,}000\ \mathrm{rad / s}$ cannot tolerate $T$ above about $100\ \mu\mathrm{s}$ without prediction. Designing the two with one sample-rate rule wastes the position loop's margin and starves the current loop, and the standard architecture — a fast current loop at the carrier rate, a slower velocity loop at twice that and a position loop at four times — is the practical resolution of the trade. The second conclusion is that the sample-rate question is answered not by the loop's bandwidth but by the **delay-to-time-constant ratio** of the loop's own plant, exactly as in the continuous case: a current loop's plant is an $L / R$ with a millisecond time constant, so a $62.5\ \mu\mathrm{s}$ sample is a tenth of it, and a position loop's plant is a rigid body with no time constant at all, so the sample rate is free.
:::
:::

::: history
Sampled-data control begins with the wartime fire-control and torpedo-guidance mechanisms that ran on discrete shafts and pneumatic logic, and with **C. A. Desoer and J. B. Tou**'s 1955 paper *"The discrete (z) transform and its application to sampled-data control systems"*, which put the subject on a mathematical footing. The transform's name is **Lotfi A. Zadeh**'s, from his 1952 paper, and **John R. Ragazzini**'s Columbia group — **Wood, Resnick, Skurnik, De Sole and Netburg** — published the first textbook treatment in 1958; **Benjamin Kuo**'s *Sampled-Data Control Systems* of 1958 and **Franklin and Davenport**'s of 1959 standardised the notation for a generation. **Kalman and Bertram**'s 1960 paper carried Lyapunov's method into the discrete domain.
The **bilinear transform** is **Arnold Tustin**'s 1947 electrical-engineering approximation of a differential equation by a difference equation, made by equating the trapezoidal rule to the exact integral; the prewarping refinement that makes it exact at one frequency became standard in the 1960s. **Time-optimal** or deadbeat control is **A. A. Feldbaum**'s theory of 1953-1956, published in Russian in the *Doklady Akademii Nauk* and translated only in 1965, which anticipated by a decade the switching results that Western texts rediscovered through Pontryagin's maximum principle of 1956.
**Karl Johan Åström**'s 1965 paper *"A new design method for digital control systems"* and his 1970 *Introduction to Stochastic Control Theory* brought the discrete treatment and the minimum-variance regulator into the mainstream; **Åström and Wittenmark**'s *Computer-Controlled Systems* of 1984, in its third edition of 2011, remains the standard text and the book that taught most practising engineers their sampling. The **anti-aliasing** and quantisation literature comes from **Harry Nyquist**'s 1928 paper on telegraph transmission, **Ralph V. L. Hartley**'s 1928 result on information rates, **Warren Oliver, John Pierce and Claude Shannon**'s 1928 pulse-code modulation patent and **W. R. Bennett**'s 1925 and 1933 analyses of quantisation noise — all of it Bell Labs work of the same decade, and none of it written for control engineers, which is why the control literature still treats aliasing as an afterthought.
:::

## Where this leads

The half-sample delay is the transport delay of [[control-systems/feedback-stability]] reappearing with a value set by the designer's clock; the discrete root locus is the root locus of [[control-systems/root-locus]] drawn on a surface where the design wedge curves; the anti-windup of Example 5 is implemented in software exactly as there; and the current loop of Example 6 is the electrical model of [[control-systems/modelling-dynamic-systems]] at the sample rate where the model's own time constant stops being negligible.

::: summary
- Sampling maps $z = \mathrm{e}^{sT}$, folds the left half-plane into the unit circle, and makes stability a question of modulus.
- The zero-order hold is exactly a half-sample delay plus a sinc droop; with one computation period the total is $1.5 T$, costing $1.5 \omega_{gc} T$ radians at the crossover.
- The "twenty times the bandwidth" rule is that phase-budget statement, not a theorem; a plant with its own transport delay is limited by the sum.
- Aliasing puts unmeasurable high-frequency noise inside the loop's bandwidth with full amplitude and the loop's full gain applied to it; the anti-alias filter's phase belongs in the budget.
- Discretisation choices — forward, backward, Tustin — differ by tens of per cent at the crossover when $\omega_{gc} T$ exceeds about $0.3$, and the Tustin integrator has a zero at the Nyquist frequency.
- Deadbeat is the discrete pole placement with all poles at the origin: fastest, most aggressive, and robust to nothing; the practical design moves the poles inward and predicts one step ahead.
:::

::: quiz
A digital loop's crossover is raised and its sample period is halved at the same time. What happens to the phase lost to the sample-and-hold and computation delay?
- [x] It is unchanged, because the loss is $1.5 \omega_{gc} T$ and the product is fixed
- [ ] It is halved
- [ ] It is doubled
- [ ] It is unchanged only if the plant has no transport delay
::: solution
The delay loss is $1.5 \omega_{gc} T$ radians, and doubling the crossover while halving the period leaves the product exactly where it was. Bandwidth and sample rate must be traded against each other rather than both raised together, and the useful move is to raise the sample rate far faster than the crossover so the term leaves the phase budget altogether.
:::
:::

## Exercises

::: exercise Nyquist {level=1 check="500"}
A signal is sampled at $1\ \mathrm{kHz}$. What is the highest frequency that can be represented without aliasing, in hertz?
::: solution
$500\ \mathrm{Hz}$, the Nyquist frequency $f_s / 2$.
:::
:::

::: exercise Hold {level=1 check="0.5"}
How many samples of delay does a zero-order hold contribute, in sample periods?
::: solution
Half a sample, $T / 2$.
:::
:::

::: exercise Mapping {level=1 check="1"}
A continuous-time pole on the imaginary axis maps to what value of $\left| z \right|$?
::: solution
One — the imaginary axis is the unit circle, so a marginally stable continuous system is marginally stable in the discrete sense too.
:::
:::

::: exercise Tustin {level=1 check="2"}
The bilinear substitution is $s \rightarrow (c) \left( z - 1 \right) / \left( z + 1 \right)$. What is $c$ in terms of the sample period $T$?
::: solution
$c = 2 / T$.
:::
:::

::: exercise Aliasing {level=2}
A $1049\ \mathrm{Hz}$ component is sampled at $1\ \mathrm{kHz}$ and then at $1.2\ \mathrm{kHz}$. Give both aliases.
::: solution
$\left| 1000 - 1049 \right| = 49\ \mathrm{Hz}$ and $\left| 1200 - 1049 \right| = 151\ \mathrm{Hz}$.
*Sanity.* The apparent frequency moving when the sample rate changes is the diagnostic that distinguishes an aliased component from a real one, and it is free: change the sample rate for one minute and watch the spectrum analyser.
:::
:::

::: exercise Hold-equivalent {level=2}
Find the hold-equivalent discrete transfer function of $G = 2 / \left( 2 s + 1 \right)$ at $T = 0.5\ \mathrm{s}$ and check its DC gain.
::: solution
With $\mathrm{e}^{- T / \tau} = \mathrm{e}^{- 0.25} = 0.7788$,
$$
G (z ) = \frac{2 \times 0.2212}{z - 0.7788} = \frac{0.4424}{z - 0.7788},
\qquad G (1 ) = \frac{0.4424}{0.2212} = 2.000 .
$$
*Sanity.* The DC gain is preserved exactly by construction, and the pole's distance from the unit circle, $\left| 1 - z \right| = 0.2212$, compares with the dimensionless continuous pole $\left| s \right| T = 0.5 \times 0.5 = 0.25$ — a $12\ \%$ error, benign because $T$ is a quarter of the time constant, which is the boundary below which a first-order plant may be discretised by any of the standard methods without the design noticing.
:::
:::

::: exercise Delay budget {level=2}
A loop has a crossover of $20\ \mathrm{Hz}$ and a sample period of $2\ \mathrm{ms}$. Give the phase lost to the hold and to one computation period, in degrees.
::: solution
$\omega_{gc} = 157\ \mathrm{rad / s}$, so the hold costs $\omega_{gc} T / 2 = 0.079\ \mathrm{rad} = 4.5^{\circ}$ and the computation period another $8.9^{\circ}$, for $13.4^{\circ}$ in total.
*Sanity.* Thirteen degrees is a quarter of a normal phase margin, and the sample rate here is only twenty times the crossover — the vendor's rule at its lower limit. Halving $T$ recovers seven degrees, which is often the cheapest stability improvement available on a digital loop and the one that requires no mechanical change.
:::
:::

::: exercise Deadbeat {level=2}
For the double integrator of Example 4 with $T = 2\ \mathrm{ms}$ and a $2\ \mathrm{mm}$ move, give the two control values and the peak acceleration in $g$.
::: solution
$u_0 = - x_0 / T^{2} = - 2 \times 10^{- 3} / 4 \times 10^{- 6} = - 500\ \mathrm{m / s^{2}}$ and $u_1 = + 500\ \mathrm{m / s^{2}}$, a peak of $51\ g$.
*Sanity.* Fifty $g$ is available on a small voice-coil stage and not on a belt-driven axis, and the scaling $u_0 \propto x_0 / T^{2}$ says that the only ways to reduce it are a longer move, a slower sample-independent profile, or a two-step-to-three-step relaxation of the deadbeat constraint — which is why industrial motion profiles are trapezoidal or S-curve and deadbeat is confined to disk heads and bonders.
:::
:::

::: exercise Derivation {level=3}
Derive the hold-equivalent discrete transfer function $G (z ) = \left( 1 - z^{- 1} \right) \mathcal{Z} \left\{ G (s ) / s \right\}$ from the definition of the zero-order hold.
::: solution
The hold's output is a sequence of steps: $u (t ) = \sum_k u_k \left[ 1 \left( t - kT \right) - 1 \left( t - \left( k + 1 \right) T \right) \right]$, so its Laplace transform is $U (s ) = \left( 1 - \mathrm{e}^{- sT} \right) \sum_k u_k \mathrm{e}^{- k s T} / s = \left( 1 - \mathrm{e}^{- sT} \right) U (z ) / s$. The plant's sampled output is therefore
$$
Y (z ) = \mathcal{Z} \left\{ G (s ) \frac{1 - \mathrm{e}^{- sT}}{s} U (z ) \right\}
= \left( 1 - z^{- 1} \right) \mathcal{Z} \left\{ \frac{G (s )}{s} \right\} U (z ),
$$
because $\mathrm{e}^{- sT}$ is a one-sample delay in the sampled domain and factors out of the $z$-transform. $\checkmark$
*Sanity.* The construction explains the two properties that matter: the factor $\left( 1 - z^{- 1} \right)$ cancels the extra pole at $z = 1$ that the $1 / s$ introduces, so a strictly proper continuous plant of relative degree one gives a discrete transfer function with **one more pole than zero** and a one-sample delay, and the DC gain is preserved because $\left( 1 - z^{- 1} \right) \rightarrow 0$ and $\mathcal{Z} \left\{ G / s \right\} \rightarrow \infty$ in exactly the compensating way. The one-sample delay in every hold-equivalent is the same half-sample of Proof 3 seen from the other side, and a designer who counts it twice — once in the hold-equivalent and once as a delay — has modelled a one-and-a-half-sample lag where there is one.
:::
:::

::: exercise Design {level=3}
A tension loop has a crossover of $25\ \mathrm{Hz}$, a phase margin of $55^{\circ}$ at a sample period of $1\ \mathrm{ms}$, and an anti-alias filter of two poles at $250\ \mathrm{Hz}$. The sample period is reduced to $0.5\ \mathrm{ms}$ and the crossover raised to $50\ \mathrm{Hz}$. Estimate the new phase margin.
::: solution
**Gains and losses at the new crossover.**
- Sampling: the delay cost goes from $1.5 \times 157 \times 0.001 = 0.236\ \mathrm{rad} = 13.5^{\circ}$ to $1.5 \times 314 \times 0.0005 = 0.236\ \mathrm{rad} = 13.5^{\circ}$ — **no change**, because the sample rate and the crossover were doubled together.
- Anti-alias filter: $2 \arctan \left( 50 / 250 \right) = 22.6^{\circ}$ against $2 \arctan \left( 25 / 250 \right) = 11.4^{\circ}$, a further loss of $11.2^{\circ}$.
- Plant: the loop's own phase falls by whatever the plant contributes between $25$ and $50\ \mathrm{Hz}$; for a plant whose gain slope is $- 40\ \mathrm{dB / decade}$ there, the phase is already near $- 180^{\circ}$ and the additional loss is typically $10$ to $15^{\circ}$.
**Result.** $55 - 11 - 12 \approx 32^{\circ}$, and the design is marginal.
**The fix.** Move the anti-alias filter to $800\ \mathrm{Hz}$ and reduce the sample period further, or accept $35\ \mathrm{Hz}$.

*Sanity.* The instructive part is the first bullet: **doubling the sample rate while doubling the crossover buys nothing**, because the delay cost is $1.5 \omega_{gc} T$ and the product is unchanged. Sample rate and bandwidth must be traded against each other, and the useful design move is to raise the sample rate far more than the bandwidth — a factor of fifty in the rate for a factor of two in bandwidth — so that the delay term stops appearing in the budget at all.
:::
:::
