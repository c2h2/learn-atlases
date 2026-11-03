A power-supply engineer checking the stability of a new design does not usually start from a transfer function. She breaks the feedback loop with a small resistor, injects a swept sine through an isolation transformer, and lets a network analyser measure the ratio of the signals on the two sides of the injection point: the **loop gain** $L(j\omega)$, frequency by frequency, including every parasitic pole, capacitor ESR and propagation delay that no model contains. From that one measurement she reads the crossover frequency, the phase margin and the gain margin, and knows whether the loop is stable, how much it will ring, and how much margin is left for component tolerances.

The methods of this chapter work with exactly such data. We review the Bode plot of a loop gain and add two elements that are awkward in the $s$-plane — integrators and pure time delays — then derive the **Nyquist criterion**, which decides closed-loop stability from the open-loop frequency response, even for unstable plants and for loops with delay where the characteristic equation is not a polynomial. From the Nyquist plot come the **gain, phase and delay margins**, which we relate to the damping of the closed loop, and the **sensitivity function**, which measures how robust the loop is to plant uncertainty. Bode plots of individual factors were drawn in [[circuits-2/frequency-response]]; the same loops were analysed with root loci in [[control-systems/root-locus]], and the electronics angle on margins is in [[electronics-2/stability-compensation]].

## The loop gain on the frequency axis

For a loop with loop gain $L(s) = C(s)G(s)H(s)$, the **open-loop frequency response** is $L(j\omega)$ for $\omega \ge 0$. Its Bode plot — $20\log_{10}\abs{L}$ and $\angle L$ against $\log\omega$ — is the sum of the plots of its factors, drawn with the straight-line asymptotes of [[circuits-2/frequency-response#alg-bode]]. Two factors that appear constantly in control loops deserve a closer look.

An **integrator** $1/s$ has $\abs{1/(j\omega)} = 1/\omega$: a straight line falling at $20\,\mathrm{dB/decade}$ through $0\,\mathrm{dB}$ at $\omega = 1$, with constant phase $-90^\circ$. A type-1 loop therefore has a magnitude that rises without bound as $\omega \to 0$ — the infinite DC gain that gives zero steady-state error.

::: definition Time delay {#def-delay}
A **pure time delay** of $T$ seconds, $y(t) = u(t - T)$, has transfer function $e^{-sT}$ and frequency response

$$
\abs{e^{-j\omega T}} = 1, \qquad \angle e^{-j\omega T} = -\omega T\ \mathrm{rad} = -\frac{180^\circ}{\pi}\,\omega T .
$$ {#eq-delay}
:::

A delay leaves the magnitude untouched but adds phase lag in proportion to frequency, without limit. Delays arise from transport (a heater whose sensor is downstream in a pipe), from computation (a digital controller that samples, computes and updates its output one period later), from pulse-width modulators, and from the propagation time of a long cable. Because $e^{-sT}$ is not rational, the characteristic equation of a loop with delay has infinitely many roots, and the Routh array cannot be used. The Nyquist criterion has no such restriction.

The phase of a rational transfer function is not independent of its magnitude.

::: theorem Bode's gain–phase relation {#thm-gain-phase}
A transfer function is **minimum-phase** if it is stable and has no zeros in the right half-plane and no time delay. For a minimum-phase transfer function the phase is determined by the magnitude. In particular, if the magnitude has a constant slope of $-20n\,\mathrm{dB/decade}$ over a range of frequencies extending about a decade either side of $\omega_0$, then $\angle L(j\omega_0) \approx -90^\circ n$.
:::

::: proof
(Sketch.) For a minimum-phase $L$, the function $\ln L(s) = \ln\abs{L} + j\angle L$ is analytic in the right half-plane, so its real and imaginary parts on the imaginary axis are related by a Hilbert transform. Bode's form of the relation is

$$
\angle L(j\omega_0) = \frac{1}{\pi}\int_{-\infty}^{\infty}\frac{\dd\ln\abs{L}}{\dd u}\,\ln\coth\frac{\abs{u}}{2}\,\dd u, \qquad u = \ln(\omega/\omega_0),
$$

where the weighting function $\ln\coth(\abs{u}/2)$ has total integral $\pi^2/2$ and is concentrated within about a decade of $u = 0$. A constant slope $\dd\ln\abs{L}/\dd u = -n$ gives $\angle L = -n\pi/2$. The full derivation is in Bode's *Network Analysis and Feedback Amplifier Design* (1945).
:::

The consequence for design is immediate. A loop gain that crosses $0\,\mathrm{dB}$ with a slope of $-20\,\mathrm{dB/decade}$ has about $-90^\circ$ of phase there, a comfortable margin; one that crosses at $-40\,\mathrm{dB/decade}$ has about $-180^\circ$ and is on the edge of instability. Right-half-plane zeros and delays add phase lag *without* the corresponding fall in magnitude, which is why they limit how high the crossover frequency can be placed.

## The Nyquist stability criterion

Nyquist's criterion rests on a theorem of complex analysis, the argument principle (see [Maths Atlas: residues](/learn/maths/lesson.php?c=complex-analysis&l=residues)).

::: theorem Argument principle {#thm-argument}
Let $F(s)$ be rational, and let $\Gamma$ be a simple closed contour in the $s$-plane, traversed clockwise, that passes through no pole or zero of $F$. If $\Gamma$ encloses $Z$ zeros and $P$ poles of $F$ (counted with multiplicity), then as $s$ travels once around $\Gamma$ the image curve $F(s)$ encircles the origin $Z - P$ times clockwise.
:::

::: proof
Write $F(s) = K\prod(s - z_i)/\prod(s - p_j)$, so that $\angle F(s) = \angle K + \sum\angle(s - z_i) - \sum\angle(s - p_j)$. As $s$ travels once clockwise around $\Gamma$, the vector $s - z_i$ from an enclosed zero turns through $-360^\circ$, while the vector from a zero outside $\Gamma$ swings back and forth and returns to its starting angle with net change $0$. The same holds for poles, with the opposite sign in $\angle F$. The net change of $\angle F$ is therefore $-360^\circ(Z - P)$: $Z - P$ clockwise encirclements of the origin.
:::

To count closed-loop poles in the right half-plane we take $F(s) = 1 + L(s)$, whose zeros are the closed-loop poles and whose poles are the open-loop poles, and choose $\Gamma$ to enclose the whole right half-plane.

::: definition Nyquist contour and Nyquist plot {#def-nyquist}
The **Nyquist contour** runs up the imaginary axis from $-jR$ to $+jR$ and returns along the semicircle $\abs{s} = R$ in the right half-plane, with $R \to \infty$; it is traversed clockwise. Where $L(s)$ has poles on the imaginary axis (integrators, undamped resonances), the contour detours around them on small semicircles of radius $\epsilon \to 0$ into the right half-plane. The **Nyquist plot** is the image of this contour under $L(s)$.
:::

For a strictly proper loop gain the whole large semicircle maps to the origin, so the Nyquist plot consists of the curve $L(j\omega)$ for $0 < \omega < \infty$, its mirror image in the real axis (for $\omega < 0$, since $L(-j\omega) = \overline{L(j\omega)}$), and the images of any small detours. Encirclements of the origin by $1 + L$ are encirclements of the point $-1$ by $L$.

::: theorem Nyquist stability criterion {#thm-nyquist}
Let $P$ be the number of poles of $L(s)$ in the open right half-plane and $N$ the number of clockwise encirclements of the point $-1$ by the Nyquist plot of $L$ (counter-clockwise encirclements counting as negative). Then the number of closed-loop poles in the right half-plane is

$$
Z = N + P .
$$ {#eq-nyquist}

The closed loop is stable if and only if $Z = 0$: the plot must encircle $-1$ counter-clockwise exactly $P$ times. In particular, if the loop gain is stable ($P = 0$), the closed loop is stable if and only if the Nyquist plot does not encircle $-1$.
:::

::: proof
Apply [[#thm-argument]] to $F = 1 + L$ on the Nyquist contour. The poles of $F$ are those of $L$, so $F$ has $P$ poles inside the contour; its zeros inside are the $Z$ closed-loop poles in the right half-plane. So $F$ encircles the origin $Z - P$ times clockwise. Since $F = 1 + L$, this is the number $N$ of clockwise encirclements of $-1$ by $L$, giving $N = Z - P$. The detours exclude poles on the imaginary axis from the count, which is correct because they are poles of $L$, not closed-loop poles; and with $R \to \infty$ every right-half-plane root is enclosed.
:::

An integrator in $L$ needs care. Near $s = 0$, $L(s) \approx K_v/s$; on the small detour $s = \epsilon e^{j\phi}$ with $\phi$ running from $-90^\circ$ through $0$ to $+90^\circ$, $L \approx (K_v/\epsilon)e^{-j\phi}$, a semicircle of infinite radius traversed clockwise from $+90^\circ$ to $-90^\circ$. For a type-$N$ loop the detour maps to $N$ clockwise half-turns at infinity, which close the plot through the right of the plane.

::: example The Nyquist plot of the motor servo {#ex-nyquist-servo}
Draw the Nyquist plot of $L(s) = K/[s(s + 63)(s + 200)]$ (the servo of [[control-systems/root-locus#ex-servo-locus]]) and find the range of $K$ for stability.
::: solution
Expanding the denominator on the imaginary axis, $j\omega(j\omega + 63)(j\omega + 200) = -263\omega^2 + j\omega(12\,600 - \omega^2)$, so

$$
L(j\omega) = \frac{K\bigl[-263\omega^2 - j\omega(12\,600 - \omega^2)\bigr]}{(263\omega^2)^2 + \omega^2(12\,600 - \omega^2)^2}.
$$

As $\omega \to 0^+$ the real part tends to $-263K/12\,600^2$ and the imaginary part to $-\infty$: the plot comes in from far below, along a vertical asymptote, with phase $-90^\circ$. As $\omega$ increases the phase falls; the imaginary part vanishes when $\omega^2 = 12\,600$, at $\omega_{180} = 112\,\mathrm{rad/s}$, where

$$
L(j\omega_{180}) = \frac{-263K\times12\,600}{(263\times12\,600)^2} = -\frac{K}{3.314\times10^6}.
$$

For larger $\omega$ the imaginary part is positive and the plot approaches the origin from above with phase tending to $-270^\circ$. The mirror image and the clockwise detour round the integrator close the curve through the right half of the plane. $L$ has no right-half-plane poles ($P = 0$), so the loop is stable when $-1$ is not encircled, that is when the crossing $-K/3.314\times10^6$ lies to the right of $-1$: $K < 3.314\times10^6$, exactly the Routh limit $K_a < 13.3$ of [[control-systems/stability#ex-servo-range]]. For $K$ larger, $-1$ is encircled twice clockwise and $Z = 2$: the complex pair is in the right half-plane.
:::
:::

::: widget parametric
fx: -263*250000*a*t^2/((263*t^2)^2 + t^2*(12600 - t^2)^2)
fy: -250000*a*t*(12600 - t^2)/((263*t^2)^2 + t^2*(12600 - t^2)^2)
t: 6, 3000
x: -2.5, 0.5
y: -2.5, 1
sliders: a=1.97:0.5:16:0.01
trace: true
equal: true
caption: Nyquist plot of the servo loop gain $L(j\omega) = 250\,000\,a/[j\omega(j\omega + 63)(j\omega + 200)]$ for $\omega$ from $6$ to $3000\,\mathrm{rad/s}$ (the positive-frequency half), with the amplifier gain $a = K_a$ on the slider. Move the tracing point with its slider to see which frequency is where. The curve crosses the negative real axis at $-a/13.3$; for $a = 1.97$ the crossing is at $-0.15$, far from $-1$. Raise $a$ past $13.3$ and the crossing passes $-1$: the plot then encircles the critical point and the loop is unstable.
:::

::: example An unstable plant {#ex-nyquist-unstable}
The levitator with a PD controller has $L(s) = K(s + 50)/(s^2 - 1962)$, with one pole in the right half-plane. Use the Nyquist criterion to find the gains for which the loop is stable.
::: solution
Here $P = 1$, so stability requires one *counter-clockwise* encirclement of $-1$ ($N = -1$). On the imaginary axis,

$$
L(j\omega) = \frac{K(50 + j\omega)}{-\omega^2 - 1962} = -\frac{K(50 + j\omega)}{\omega^2 + 1962}.
$$

At $\omega = 0$, $L = -50K/1962 = -0.0255K$, on the negative real axis. For $\omega > 0$ both real and imaginary parts are negative, and as $\omega \to \infty$, $L \approx -jK/\omega \to 0$ from below. The negative frequencies give the mirror image above the axis. Following $\omega$ from $-\infty$ to $+\infty$, the plot leaves the origin into the upper half-plane, reaches $-0.0255K$, and returns through the lower half-plane: a closed loop traversed counter-clockwise, enclosing the segment of the negative real axis between $-0.0255K$ and $0$.

If $0.0255K > 1$, the point $-1$ lies inside and is encircled once counter-clockwise: $N = -1$, $Z = 0$, stable. If $0.0255K < 1$, $N = 0$ and $Z = 1$: one unstable closed-loop pole. So the loop is stable for $K > 1962/50 = 39.2$, agreeing with the root locus. For an unstable plant, "too little gain" is as dangerous as too much, and the simple rule "no encirclement means stable" would give exactly the wrong answer.
:::
:::

## Stability margins

The Nyquist plot tells us more than a yes-or-no answer: its distance from $-1$ measures how close the loop is to instability.

::: definition Gain, phase and delay margins {#def-margins}
For a loop gain with $P = 0$ whose Nyquist plot crosses the unit circle once and the negative real axis once:

- the **gain crossover frequency** $\omega_c$ is where $\abs{L(j\omega_c)} = 1$, and the **phase margin** is $\mathrm{PM} = 180^\circ + \angle L(j\omega_c)$;
- the **phase crossover frequency** $\omega_{180}$ is where $\angle L(j\omega_{180}) = -180^\circ$, and the **gain margin** is $\mathrm{GM} = 1/\abs{L(j\omega_{180})}$, or $-20\log_{10}\abs{L(j\omega_{180})}$ in decibels;
- the **delay margin** is $T_{dm} = \mathrm{PM}/\omega_c$ (with PM in radians), the smallest extra time delay that makes the loop unstable.

The loop is stable exactly when both margins are positive (GM $> 1$, PM $> 0^\circ$).
:::

The gain margin is how much the gain could rise before the Nyquist plot reaches $-1$; the phase margin is how much extra lag at crossover would do the same. The delay margin follows from [[#eq-delay]]: a delay $T$ adds lag $\omega_cT$ at crossover without changing $\omega_c$. Typical targets are $\mathrm{GM} \ge 6$–$10\,\mathrm{dB}$ and $\mathrm{PM} \ge 45$–$60^\circ$.

::: example Margins of the servo {#ex-margins}
Find the gain margin, phase margin and delay margin of the servo $L(s) = 250\,000K_a/[s(s + 63)(s + 200)]$ with $K_a = 1.97$ (the $\zeta = 0.5$ design of [[control-systems/root-locus#ex-zeta-half]]). By how much does a computational delay of $1.5\,\mathrm{ms}$ reduce the phase margin?
::: solution
*Gain margin.* From [[#ex-nyquist-servo]], $\omega_{180} = 112\,\mathrm{rad/s}$ and $\abs{L(j\omega_{180})} = K/3.314\times10^6 = 4.94\times10^5/3.314\times10^6 = 0.149$. So $\mathrm{GM} = 6.7$, or $16.5\,\mathrm{dB}$.

*Phase margin.* The crossover satisfies $\abs{L} = 4.94\times10^5/\bigl(\omega\sqrt{\omega^2 + 63^2}\sqrt{\omega^2 + 200^2}\bigr) = 1$. A numerical solution gives $\omega_c = 34.0\,\mathrm{rad/s}$ (check: $34.0\times71.6\times202.9 = 4.94\times10^5$). The phase there is

$$
\angle L = -90^\circ - \arctan\frac{34.0}{63} - \arctan\frac{34.0}{200} = -90^\circ - 28.4^\circ - 9.6^\circ = -128.0^\circ,
$$

so $\mathrm{PM} = 52.0^\circ$.

*Delay margin.* $T_{dm} = 52.0^\circ\times(\pi/180^\circ)/34.0 = 26.7\,\mathrm{ms}$. A delay of $1.5\,\mathrm{ms}$ costs $\omega_cT = 34.0\times0.0015 = 0.051\,\mathrm{rad} = 2.9^\circ$ of phase margin, leaving $49.1^\circ$: harmless at this crossover frequency, but the same delay in a current loop crossing over at $2000\,\mathrm{rad/s}$ would cost $172^\circ$.
:::
:::

::: widget plot
f: 20*log10(250000*a/(10^x*sqrt(10^(2*x) + 63^2)*sqrt(10^(2*x) + 200^2))); 90 - atan(10^x/63)*180/pi - atan(10^x/200)*180/pi
x: 0, 3
y: -60, 100
sliders: a=1.97:0.5:16:0.01
hlines: 0
labels: 20\log_{10}\lvert L\rvert\ (\mathrm{dB}); 180^\circ + \angle L\ (\text{degrees})
caption: Bode plot of the servo loop gain against $\log_{10}\omega$ ($\omega$ from $1$ to $1000\,\mathrm{rad/s}$), amplifier gain $a = K_a$ on the slider. Blue: magnitude in dB. Orange: the phase plus $180^\circ$, so that its value where the blue curve crosses $0\,\mathrm{dB}$ is the phase margin, and the gain margin is the depth of the blue curve below $0\,\mathrm{dB}$ where the orange curve reaches $0$ (at $\log_{10}112 = 2.05$). Raising $a$ lifts the magnitude curve without changing the phase: the crossover moves right and the phase margin shrinks, reaching zero at $a = 13.3$.
:::

### Phase margin and damping

For the standard type-1 loop $L(s) = \omega_n^2/[s(s + 2\zeta\omega_n)]$, whose closed loop is the standard second-order system, the phase margin can be computed exactly.

::: proposition Phase margin of the second-order loop {#prop-pm-zeta}
The loop $L(s) = \omega_n^2/[s(s + 2\zeta\omega_n)]$ has crossover frequency and phase margin

$$
\frac{\omega_c}{\omega_n} = \sqrt{\sqrt{1 + 4\zeta^4} - 2\zeta^2},\qquad \mathrm{PM} = \arctan\frac{2\zeta\omega_n}{\omega_c},
$$ {#eq-pm-zeta}

so that $\zeta = 0.3, 0.5, 0.6, 0.7$ give $\mathrm{PM} = 33^\circ, 52^\circ, 59^\circ, 65^\circ$. For $\mathrm{PM} \lesssim 65^\circ$, $\zeta \approx \mathrm{PM}/100^\circ$.
:::

::: proof
$\abs{L(j\omega_c)} = 1$ means $\omega_n^4 = \omega_c^2(\omega_c^2 + 4\zeta^2\omega_n^2)$, a quadratic in $\omega_c^2$ whose positive root is $\omega_c^2 = \omega_n^2(\sqrt{1 + 4\zeta^4} - 2\zeta^2)$. The phase is $-90^\circ - \arctan(\omega_c/2\zeta\omega_n)$, so $\mathrm{PM} = 90^\circ - \arctan(\omega_c/2\zeta\omega_n) = \arctan(2\zeta\omega_n/\omega_c)$.
:::

The servo of [[#ex-margins]] confirms the rule: its dominant poles have $\zeta = 0.5$ and its phase margin is $52^\circ$. The crossover frequency also predicts speed: the closed-loop bandwidth usually lies between $\omega_c$ and $2\omega_c$ (for the servo, $\omega_{BW} = 59.7\,\mathrm{rad/s} = 1.76\,\omega_c$), and the rise time is roughly $t_r \approx 1.5$–$2/\omega_c$. Frequency-domain design therefore turns "overshoot" into "phase margin" and "speed" into "crossover frequency".

::: example A loop with a transport delay {#ex-delay-loop}
An oven is heated electrically; its temperature responds as $G(s) = e^{-2s}/(20s + 1)$ (in kelvin per unit of heater command, time in seconds) because the sensor sits downstream of the heater. With a proportional controller $K$, find the largest stable $K$ and the period of oscillation at that limit, and the margins for $K = 5$.
::: solution
The loop gain $L = Ke^{-2s}/(20s + 1)$ has $\angle L(j\omega) = -\arctan20\omega - 2\omega$ (in radians). Its phase reaches $-\pi$ where $\arctan20\omega + 2\omega = \pi$; solving numerically, $\omega_{180} = 0.816\,\mathrm{rad/s}$. There $\abs{L} = K/\sqrt{1 + 400\times0.816^2} = K/16.35$. The Nyquist plot spirals into the origin, crossing the negative real axis first at $-K/16.35$, so the loop is stable for $K < 16.35$, oscillating with period $2\pi/0.816 = 7.7\,\mathrm{s}$ at the limit. Without the delay the loop would be stable for every $K$.

For $K = 5$: $\mathrm{GM} = 16.35/5 = 3.27$ ($10.3\,\mathrm{dB}$). Crossover where $5/\sqrt{1 + 400\omega^2} = 1$: $\omega_c = \sqrt{24}/20 = 0.245\,\mathrm{rad/s}$, with phase $-\arctan4.90 - 0.49\,\mathrm{rad} = -78.5^\circ - 28.1^\circ$, so $\mathrm{PM} = 73.5^\circ$. The Routh array could not have answered this question, because $1 + L(s) = 0$ is not a polynomial equation.
:::
:::

::: quiz
A loop has a phase margin of $40^\circ$ at a crossover frequency of $200\,\mathrm{rad/s}$. What is the largest extra time delay it can tolerate?
- [ ] $0.2\,\mathrm{s}$
- [x] $3.5\,\mathrm{ms}$
- [ ] $40\,\mathrm{ms}$
- [ ] It depends on the gain margin, so it cannot be found.
::: solution
$T_{dm} = \mathrm{PM}/\omega_c = (40\pi/180)/200 = 0.698/200 = 3.5\,\mathrm{ms}$. A delay does not change $\abs{L}$, so the crossover stays at $200\,\mathrm{rad/s}$ and the delay eats the phase margin at the rate of $\omega_c$ radians per second of delay.
:::
:::

::: warning Margins can mislead
Gain and phase margins test the distance from $-1$ along two particular directions. A Nyquist plot can have a good gain margin and a good phase margin and still pass close to $-1$ between them; loops with several crossovers (conditionally stable loops, in which *reducing* the gain causes instability) have several margins, all of which matter. And for an unstable open loop ($P > 0$) the definitions above do not apply: the levitator of [[#ex-nyquist-unstable]] has a "gain margin" less than $1$ — it goes unstable if the gain is *reduced* by more than a factor $0.0255K$. When in doubt, draw the whole Nyquist plot.
:::

## Sensitivity and robustness

The distance from $-1$ to the nearest point of the Nyquist plot is the single best measure of robustness, and it has a meaning of its own. Define, for a unity-feedback loop,

$$
S(s) = \frac{1}{1 + L(s)}, \qquad T(s) = \frac{L(s)}{1 + L(s)}, \qquad S + T = 1 .
$$ {#eq-sensitivity}

The **sensitivity function** $S$ is the transfer function from the reference to the error and from an output disturbance to the output; the **complementary sensitivity** $T$ is the closed-loop transfer function from the reference to the output, and from measurement noise to the output (with a minus sign).

::: theorem Sensitivity and robustness {#thm-sensitivity}
1. If the plant changes by a small relative amount $\dd G/G$, the closed-loop transfer function changes by $\dd T/T = S\,\dd G/G$.
2. $1/\abs{S(j\omega)} = \abs{1 + L(j\omega)}$ is the distance from $-1$ to the Nyquist plot at frequency $\omega$. The **peak sensitivity** $M_s = \max_\omega\abs{S(j\omega)}$ is therefore the reciprocal of the shortest distance from $-1$ to the plot, and it guarantees

$$
\mathrm{GM} \ge \frac{M_s}{M_s - 1}, \qquad \mathrm{PM} \ge 2\arcsin\frac{1}{2M_s}.
$$ {#eq-ms-bounds}
:::

::: proof
1. $T = CG/(1 + CG)$, so $\dd T/\dd G = C/(1 + CG)^2$ and $\dfrac{\dd T/T}{\dd G/G} = \dfrac{G}{T}\cdot\dfrac{C}{(1 + CG)^2} = \dfrac{1}{1 + CG} = S$.

2. The plot stays outside the circle of radius $1/M_s$ about $-1$. It crosses the negative real axis at $-1/\mathrm{GM}$, whose distance from $-1$ is $1 - 1/\mathrm{GM} \ge 1/M_s$, giving the first bound. It crosses the unit circle at angle $-180^\circ + \mathrm{PM}$; the chord from $-1$ to that point has length $2\sin(\mathrm{PM}/2) \ge 1/M_s$, giving the second.
:::

Where the loop gain is large, $S$ is small: tracking is accurate, disturbances are rejected and plant variations hardly matter. That is what feedback is for. But $S + T = 1$ means $S$ and $T$ cannot both be small at the same frequency, and at high frequencies, where sensor noise lives and the plant model is least reliable, we need $T$ small, i.e. $\abs{L}$ small. The crossover region in between, where $\abs{L} \approx 1$, is where $\abs{S}$ peaks. Typical designs aim for $M_s$ between $1.3$ and $2$; the servo of [[#ex-margins]] has $M_s = 1.57$, which by [[#eq-ms-bounds]] guarantees at least $8.8\,\mathrm{dB}$ of gain margin and $37^\circ$ of phase margin (its actual margins are larger).

::: remark The waterbed effect
Bode also proved that for a stable loop gain falling at least as fast as $1/\omega^2$ at high frequencies, $\int_0^\infty\ln\abs{S(j\omega)}\,\dd\omega = \pi\sum\operatorname{Re}p_k$, summed over the right-half-plane poles $p_k$ of $L$ (zero if there are none). Sensitivity reduced at some frequencies must be paid for by sensitivity increased at others — pushing the waterbed down in one place raises it elsewhere — and unstable plant poles make the bill larger. This is a fundamental limit, not a deficiency of a particular design.
:::

::: application Measuring the loop gain of a power supply
R. D. Middlebrook's injection technique (1975) measures $L(j\omega)$ of a working converter without opening the loop for DC. A small resistor (say $10$–$50\,\Omega$) is inserted in the feedback path at a point driven from a low impedance and feeding a high impedance, such as between the output and the top of the feedback divider; a transformer injects a small swept sine across it, and a network analyser measures the ratio $-v_{after}/v_{before}$ of the voltages on the two sides. Commercial instruments plot gain and phase margin directly. A typical specification for a point-of-load converter is a crossover at $1/10$ to $1/5$ of the switching frequency with $\mathrm{PM} \ge 45^\circ$ and $\mathrm{GM} \ge 10\,\mathrm{dB}$, checked at minimum and maximum load and input voltage and over temperature.
:::

::: history
Harry Nyquist, at Bell Telephone Laboratories, published "Regeneration theory" in the *Bell System Technical Journal* in 1932, prompted by the "singing" of Harold Black's negative-feedback repeater amplifiers; his criterion was the first stability test based on measurable open-loop data. Hendrik Bode, also at Bell Labs, proved the gain–phase relations and the sensitivity integral in "Relations between attenuation and phase in feedback amplifier design" (1940) and *Network Analysis and Feedback Amplifier Design* (1945), introducing the gain and phase margins. Nathaniel Nichols's closed-loop chart (1947) and the MIT Radiation Laboratory's wartime servomechanism work carried these amplifier methods into control engineering generally.
:::

## Where this leads

Frequency-response design shapes $L(j\omega)$: high gain at low frequencies for accuracy, a crossover at the required speed with a slope of about $-20\,\mathrm{dB/decade}$ for phase margin, and fast roll-off beyond for noise rejection. [[control-systems/pid-control]] and [[control-systems/compensator-design]] do exactly that with PID, lead and lag terms; the delay margin returns in [[control-systems/digital-control]], where sampling and computation add delay to every loop. The sensitivity functions are the starting point of robust control, treated in Åström and Murray's *Feedback Systems*; for loops in electronics see [[electronics-2/stability-compensation]] and [[power-electronics/converter-control]].

::: summary
- Delays add phase lag $\omega T$ without changing magnitude; minimum-phase systems have phase tied to magnitude slope ($-20n\,\mathrm{dB/dec} \leftrightarrow -90n^\circ$).
- Nyquist: $Z = N + P$. With a stable loop gain, the closed loop is stable iff $L(j\omega)$ does not encircle $-1$; an unstable loop gain needs $P$ counter-clockwise encirclements.
- Integrators are handled by detouring round them, which closes the plot with clockwise arcs at infinity.
- Phase margin $= 180^\circ + \angle L(j\omega_c)$; gain margin $= 1/\abs{L(j\omega_{180})}$; delay margin $= \mathrm{PM}/\omega_c$.
- For a second-order loop $\zeta \approx \mathrm{PM}/100^\circ$; the closed-loop bandwidth is between $\omega_c$ and $2\omega_c$.
- Loops with delay are handled directly by Nyquist; their stable gain is limited even for first-order plants.
- $S = 1/(1 + L)$ measures disturbance rejection and sensitivity to the plant; $M_s = \max\abs{S}$ is the reciprocal of the distance from $-1$ and bounds both margins; $S + T = 1$ forces trade-offs.
:::

## Exercises

::: exercise Phase of a delay {level=1 check="-0.5e-3*1000*180/pi"}
A pulse-width modulator and its sampling add an effective delay of $0.5\,\mathrm{ms}$ to a loop. What phase (in degrees) does it add at $1000\,\mathrm{rad/s}$?
::: solution
$-\omega T = -1000\times0.5\times10^{-3} = -0.5\,\mathrm{rad} = -28.6^\circ$.
:::
:::

::: exercise Gain margin from a crossing {level=1 check="20*log10(1/0.25)"}
The Nyquist plot of a stable loop gain crosses the negative real axis once, at $-0.25$. Find the gain margin in dB.
::: solution
$\mathrm{GM} = 1/0.25 = 4$, i.e. $20\log_{10}4 = 12.0\,\mathrm{dB}$: the gain could be quadrupled before the loop becomes unstable.
:::
:::

::: exercise Phase margin of a simple loop {level=1}
Find the crossover frequency and phase margin of $L(s) = 10/[s(s + 1)]$, and estimate the damping ratio of the closed loop.
::: solution
$\abs{L(j\omega)} = 10/(\omega\sqrt{\omega^2 + 1}) = 1$ gives $\omega^4 + \omega^2 - 100 = 0$, $\omega_c^2 = 9.51$, $\omega_c = 3.08\,\mathrm{rad/s}$. $\mathrm{PM} = 180^\circ - 90^\circ - \arctan3.08 = 18.0^\circ$, so $\zeta \approx 0.18$. Exactly, $\omega_n = \sqrt{10}$ and $2\zeta\omega_n = 1$ give $\zeta = 0.158$; the rule $\mathrm{PM}/100$ is slightly optimistic at low damping.
:::
:::

::: exercise Choosing a gain for a phase margin {level=2}
For the servo of [[#ex-margins]], find the amplifier gain $K_a$ that gives a phase margin of $50^\circ$, and the resulting crossover frequency and gain margin.
::: hint
First find the frequency at which $\angle L = -130^\circ$, then choose $K_a$ so that $\abs{L} = 1$ there.
:::
::: solution
We need $\arctan(\omega/63) + \arctan(\omega/200) = 40^\circ$; solving numerically, $\omega_c = 36.1\,\mathrm{rad/s}$. Then $250\,000K_a = 36.1\times\sqrt{36.1^2 + 63^2}\times\sqrt{36.1^2 + 200^2} = 36.1\times72.6\times203.2 = 5.32\times10^5$, so $K_a = 2.13\,\mathrm{V/rad}$. The gain margin is $13.3/2.13 = 6.2$, i.e. $15.9\,\mathrm{dB}$.
:::
:::

::: exercise Counting encirclements {level=2}
A loop gain has two poles in the right half-plane. Its Nyquist plot encircles $-1$ once counter-clockwise. How many closed-loop poles are in the right half-plane? What would be needed for stability?
::: solution
$P = 2$ and $N = -1$, so $Z = N + P = 1$: one closed-loop pole in the right half-plane. Stability requires $N = -2$, two counter-clockwise encirclements.
:::
:::

::: exercise Bounds from peak sensitivity {level=2}
A loop is specified to have $M_s \le 1.4$. What minimum gain and phase margins does this guarantee?
::: solution
By [[#eq-ms-bounds]]: $\mathrm{GM} \ge 1.4/0.4 = 3.5$ ($10.9\,\mathrm{dB}$) and $\mathrm{PM} \ge 2\arcsin(1/2.8) = 2\times20.9^\circ = 41.8^\circ$. A single $M_s$ specification is a compact way of demanding both margins at once, and also excludes Nyquist plots that sneak close to $-1$ between the two crossovers.
:::
:::

::: exercise The levitator's Nyquist plot {level=2}
For the levitator loop $L(s) = 80(s + 50)/(s^2 - 1962)$, find where the Nyquist plot crosses the real axis, the number of encirclements of $-1$, and decide on stability. Then find the factor by which the gain may be reduced before the loop becomes unstable.
::: solution
From [[#ex-nyquist-unstable]] the plot crosses the real axis only at $\omega = 0$, at $-0.0255\times80 = -2.04$, and at the origin. The point $-1$ lies inside the counter-clockwise loop, so $N = -1$, $P = 1$, $Z = 0$: stable. Reducing the gain by more than a factor $2.04$ (to $K < 39.2$) moves the crossing inside $-1$ and the loop becomes unstable. Here the "gain margin" is a *lower* gain margin of $6.2\,\mathrm{dB}$.
:::
:::

::: exercise Bode's slope rule {level=3}
A minimum-phase loop gain has the asymptotic Bode magnitude: slope $-20\,\mathrm{dB/dec}$ below $100\,\mathrm{rad/s}$, $-40\,\mathrm{dB/dec}$ between $100$ and $1000\,\mathrm{rad/s}$, and $-60\,\mathrm{dB/dec}$ above, with crossover at $\omega_c$. (a) Write a transfer function with these asymptotes. (b) Compute the phase margin for $\omega_c = 30$, $100$ and $300\,\mathrm{rad/s}$, and explain the result with [[#thm-gain-phase]].
::: solution
(a) $L(s) = K/[s(1 + s/100)(1 + s/1000)]$. (b) $\mathrm{PM} = 90^\circ - \arctan(\omega_c/100) - \arctan(\omega_c/1000)$: for $\omega_c = 30$: $90 - 16.7 - 1.7 = 71.6^\circ$; for $100$: $90 - 45 - 5.7 = 39.3^\circ$; for $300$: $90 - 71.6 - 16.7 = 1.7^\circ$. (The gains are $K \approx 31.3$, $142$ and $990$, found from $\abs{L(j\omega_c)} = 1$.) Crossing over in the $-20\,\mathrm{dB/dec}$ region gives phase near $-90^\circ$; crossing in the $-40\,\mathrm{dB/dec}$ region gives phase approaching $-180^\circ$, as the slope rule predicts. Good loops cross over on a $-20\,\mathrm{dB/dec}$ stretch at least a few octaves wide.
:::
:::

::: exercise The delay limit of a first-order loop {level=3}
(a) For $L(s) = Ke^{-sT}/(\tau s + 1)$, show that the maximum stable gain satisfies $K_{max} = \sqrt{1 + (\omega_{180}\tau)^2}$, where $\omega_{180}$ solves $\arctan(\omega\tau) + \omega T = \pi$. (b) For $T \ll \tau$, show that $\omega_{180} \approx \pi/(2T)$ and $K_{max} \approx \pi\tau/(2T)$. (c) Evaluate both the exact and approximate $K_{max}$ for the oven of [[#ex-delay-loop]].
::: solution
(a) $\abs{L} = K/\sqrt{1 + \omega^2\tau^2}$ and $\angle L = -\arctan\omega\tau - \omega T$. The loop is at the limit when $L(j\omega_{180}) = -1$, i.e. the phase is $-\pi$ and the magnitude is $1$, which gives the stated formula; for smaller $K$ the crossing is inside $-1$ and the loop is stable.

(b) If $T \ll \tau$, $\omega_{180}\tau$ is large, so $\arctan\omega\tau \approx \pi/2$ and $\omega T \approx \pi/2$: $\omega_{180} \approx \pi/(2T)$, and $K_{max} \approx \omega_{180}\tau = \pi\tau/(2T)$.

(c) With $\tau = 20\,\mathrm{s}$, $T = 2\,\mathrm{s}$: exact $K_{max} = 16.35$ ($\omega_{180} = 0.816$); approximate $\pi\times20/4 = 15.7$ with $\omega_{180} \approx 0.785$. The ratio $\tau/T$ is the key figure of merit for loops with delay: a process whose delay is a tenth of its time constant cannot be run with a loop gain much above $15$.
:::
:::
