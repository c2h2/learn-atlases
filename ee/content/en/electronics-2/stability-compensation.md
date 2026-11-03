Connect a fast op-amp as a voltage follower, drive a long coaxial cable with it, and there is a fair chance that the output will ring after every step — or simply sit there oscillating at several megahertz with no input at all. Nothing is broken. The feedback that made the amplifier precise in [[electronics-2/feedback]] has, at some high frequency, turned positive. Harold Black's first feedback amplifiers did the same, and the theory that tamed them, due to Nyquist and Bode, is what this chapter is about.

The problem is phase. Every pole of the open-loop amplifier adds up to $90^\circ$ of phase lag. At low frequencies the fed-back signal opposes the input, as intended; but at a frequency where the lags add up to $180^\circ$ the fed-back signal *adds* to the input, and if the loop gain there is still at least $1$, a signal can sustain itself around the loop. We first find the closed-loop poles and see how they move as the loop gain rises, then state the stability criteria in terms of the loop gain's Bode plot, relate the **phase margin** to the overshoot of the step response, and finally learn how to **compensate** an amplifier — deliberately reshape its frequency response — so that it is stable for every feedback factor it will meet. The central technique, Miller compensation of a two-stage amplifier, is used in almost every integrated op-amp.

## Poles of a feedback amplifier

With frequency-dependent gain $A(s)$ and feedback factor $\beta(s)$, the feedback equation of [[electronics-2/feedback#thm-feedback-equation]] becomes

$$
A_f(s) = \frac{A(s)}{1 + A(s)\beta(s)} = \frac{A(s)}{1 + T(s)},
$$ {#eq-closed-loop}

where $T(s) = A(s)\beta(s)$ is the loop gain. If $A(s) = N(s)/D(s)$ is a ratio of polynomials and $\beta$ is a constant, then $A_f(s) = N(s)/[D(s) + \beta N(s)]$: the closed-loop zeros are those of $A$, but the closed-loop poles are new.

::: definition Stability {#def-stability}
A linear amplifier is **stable** if its response to every bounded input is bounded. For a rational transfer function this holds exactly when every pole lies in the open left half of the $s$-plane. A feedback amplifier is therefore stable if and only if all roots of the **characteristic equation**

$$
1 + T(s) = 0
$$ {#eq-characteristic}

have negative real parts.
:::

A pole in the right half-plane gives a transient that grows exponentially, until the amplifier saturates; complex poles on the $j\omega$ axis give a sustained oscillation. Real amplifiers then settle into a large-signal oscillation whose amplitude is limited by the supply rails.

### One, two and three poles

For a single-pole amplifier, [[electronics-2/feedback#thm-bandwidth]] showed that the closed-loop pole is at $-\omega_H(1 + A_0\beta)$: it moves left along the real axis and the amplifier is stable for every $\beta > 0$.

For two poles, $A(s) = A_0/[(1 + s/\omega_1)(1 + s/\omega_2)]$, the characteristic equation is

$$
s^2 + (\omega_1 + \omega_2)s + (1 + A_0\beta)\omega_1\omega_2 = 0.
$$

As $A_0\beta$ grows, the two real poles move towards each other, meet, and then split into a complex pair with the fixed real part $-(\omega_1 + \omega_2)/2$ and an imaginary part that grows without limit. The **pole quality factor** is

$$
Q = \frac{\sqrt{(1 + A_0\beta)\,\omega_1\omega_2}}{\omega_1 + \omega_2}.
$$ {#eq-two-pole-q}

The poles never cross into the right half-plane, so a two-pole loop is never unstable — but $Q$ can become large, giving peaking in the frequency response and ringing in the step response that are unacceptable in practice.

With three or more poles the complex pair can cross the $j\omega$ axis.

::: example Three identical poles {#ex-three-poles}
An amplifier has $A(s) = A_0/(1 + s/\omega_p)^3$ with $A_0 = 1000$ and $\omega_p = 2\pi\times1\,\mathrm{MHz}$. For which $\beta$ is the feedback amplifier stable, and what is the smallest closed-loop gain it can provide?
::: solution
Each pole contributes $-\arctan(\omega/\omega_p)$ of phase, so the phase of $T(j\omega)$ reaches $-180^\circ$ when $\arctan(\omega/\omega_p) = 60^\circ$, that is at $\omega_{180} = \sqrt3\,\omega_p$. There

$$
\abs{T(j\omega_{180})} = \frac{A_0\beta}{\bigl(1 + 3\bigr)^{3/2}} = \frac{A_0\beta}{8}.
$$

The loop is on the edge of oscillation when this equals $1$, so stability requires $A_0\beta < 8$, that is $\beta < 0.008$. (Substituting $s = j\sqrt3\omega_p$ into $(1 + s/\omega_p)^3 + A_0\beta = 0$ confirms it: $(1 + j\sqrt3)^3 = -8$.) The closed-loop gain must then be at least $A_0/(1 + 8) = 111$; any attempt to use this amplifier with a gain of, say, $10$ ($\beta = 0.1$, $A_0\beta = 100$) produces an oscillator at about $\sqrt3\times1\,\mathrm{MHz} = 1.73\,\mathrm{MHz}$.
:::
:::

## Stability from the loop gain

Finding the roots of $1 + T(s)$ requires a model of every pole. Nyquist's great contribution was a test that uses only the loop gain on the $j\omega$ axis — something that can be measured on a real amplifier.

::: theorem Nyquist stability criterion {#thm-nyquist}
Let the loop gain $T(s)$ have no poles in the right half-plane. Then the feedback amplifier is stable if and only if the **Nyquist plot** — the curve $T(j\omega)$ in the complex plane for $-\infty < \omega < \infty$ — does not encircle the point $-1$. More generally, the number of closed-loop poles in the right half-plane equals the number of clockwise encirclements of $-1$ plus the number of right-half-plane poles of $T$.
:::

::: proof
(Sketch.) The closed-loop poles are the zeros of $F(s) = 1 + T(s)$. By the argument principle (see [Maths Atlas: residues](/learn/maths/lesson.php?c=complex-analysis&l=residues)), as $s$ travels once clockwise around a contour enclosing the right half-plane, the curve $F(s)$ encircles the origin clockwise $Z - P$ times, where $Z$ and $P$ count the zeros and poles of $F$ inside the contour. The poles of $F$ are those of $T$. On the large semicircle $T(s) \to 0$ for a physical amplifier, so the whole contour maps to the curve $T(j\omega)$, and encirclements of the origin by $1 + T$ are encirclements of $-1$ by $T$. With $P = 0$, stability ($Z = 0$) means no encirclements. The full argument is in [[control-systems/frequency-response-methods]].
:::

Amplifier loop gains almost always have no right-half-plane poles and a magnitude that falls with frequency, crossing $1$ once. Then the Nyquist test reduces to a statement about two frequencies on the Bode plot.

::: definition Gain and phase margins {#def-margins}
Let $\omega_c$ be the **gain crossover frequency**, where $\abs{T(j\omega_c)} = 1$ (the **unity-loop-gain frequency**), and $\omega_{180}$ the **phase crossover frequency**, where $\angle T(j\omega_{180}) = -180^\circ$. Then

$$
\mathrm{PM} = 180^\circ + \angle T(j\omega_c), \qquad \mathrm{GM} = -20\log_{10}\abs{T(j\omega_{180})}\ \mathrm{dB}.
$$ {#eq-margins}

For a loop gain whose magnitude falls through $1$ once and whose phase falls through $-180^\circ$ once, the amplifier is stable exactly when $\mathrm{PM} > 0$, equivalently $\mathrm{GM} > 0\,\mathrm{dB}$, equivalently $\omega_c < \omega_{180}$.
:::

The **phase margin** is how much extra lag the loop could tolerate at crossover before oscillating; the **gain margin** is how much the loop gain could rise before oscillating. Common design targets are $\mathrm{PM} \ge 45^\circ$ — and more often $60^\circ$ — and $\mathrm{GM} \ge 10\,\mathrm{dB}$.

::: widget parametric
fx: K*cos(3*atan(t))/(1 + t^2)^1.5
fy: -K*sin(3*atan(t))/(1 + t^2)^1.5
t: -40, 40
x: -3, 12
y: -8, 8
sliders: K=4:1:12:0.1
trace: false
caption: Nyquist plot of the loop gain $T(j\omega) = K/(1 + j\omega/\omega_p)^3$ of [[#ex-three-poles]], with $t = \omega/\omega_p$ and $K = A_0\beta$ on the slider. The curve crosses the negative real axis at $-K/8$. For $K < 8$ the crossing lies between $-1$ and $0$ and the point $-1$ is not encircled; drag $K$ past $8$ and the curve swallows $-1$: the amplifier oscillates.
:::

::: example Margins of a two-pole op-amp {#ex-two-pole-margins}
An op-amp has a dominant pole that gives a unity-gain frequency $f_t = 10\,\mathrm{MHz}$, and a second pole at $f_2 = 20\,\mathrm{MHz}$, so that well above the dominant pole $A(jf) \approx f_t/\bigl(jf(1 + jf/f_2)\bigr)$. Find the phase margin when it is used (a) as a follower, $\beta = 1$; (b) with $\beta = 0.1$.
::: solution
(a) The crossover satisfies $\abs{T} = (f_t/f_c)/\sqrt{1 + (f_c/f_2)^2} = 1$. Solving numerically (or by squaring, which gives a quadratic in $f_c^2$) gives $f_c = 9.10\,\mathrm{MHz}$. The phase there is $-90^\circ - \arctan(9.10/20) = -114.5^\circ$, so $\mathrm{PM} = 65.5^\circ$.

(b) With $\beta = 0.1$ the loop gain is ten times smaller, crossover moves down to $f_c = 0.999\,\mathrm{MHz}$, where the second pole contributes only $\arctan(0.999/20) = 2.9^\circ$: $\mathrm{PM} = 87.1^\circ$.

The follower is the hardest case: **the larger $\beta$, the higher the crossover frequency and the smaller the phase margin.** An op-amp that is stable as a follower is called **unity-gain stable** and is stable for every resistive $\beta \le 1$.
:::
:::

::: warning Use the loop gain, not the closed-loop gain
Stability margins are properties of $T = A\beta$, not of $A$ alone and not of $A_f$. A common error is to read the phase margin from the op-amp's open-loop Bode plot at its unity-gain frequency, which is correct only for $\beta = 1$. For other $\beta$, shift the magnitude curve down by $20\log_{10}(1/\beta)\,\mathrm{dB}$ (equivalently, find where $\abs{A}$ meets the line $1/\beta$) and read the phase there. And remember that a capacitor in the feedback network makes $\beta$ itself frequency-dependent.
:::

## Phase margin and the closed-loop response

Why $45^\circ$ or $60^\circ$? The answer comes from the closed-loop response near crossover, which is dominated by the two poles of the loop gain nearest to $\omega_c$. Model the loop gain of a dominant-pole amplifier by an integrator and one further pole:

$$
T(s) = \frac{\omega_u}{s\,(1 + s/\omega_2)},
$$

where $\omega_u = \beta A_0\omega_1$ is the unity-gain frequency the loop would have without the second pole. Then

$$
\frac{T}{1 + T} = \frac{\omega_u\omega_2}{s^2 + \omega_2 s + \omega_u\omega_2},
$$

a second-order low-pass response with $\omega_0 = \sqrt{\omega_u\omega_2}$ and $Q = \sqrt{\omega_u/\omega_2}$.

::: proposition Phase margin and pole Q {#prop-pm-q}
For the loop gain $T(s) = \omega_u/[s(1 + s/\omega_2)]$, the closed-loop pole quality factor and the phase margin are related by

$$
Q^2 = \frac{\cos\mathrm{PM}}{\sin^2\mathrm{PM}}.
$$ {#eq-pm-q}

In particular $\mathrm{PM} = 45^\circ$ gives $Q = 1.19$ (step overshoot $23\,\%$), $\mathrm{PM} = 60^\circ$ gives $Q = 0.82$ (overshoot $8.8\,\%$), and $\mathrm{PM} = 76.3^\circ$ gives $Q = 0.5$, two coincident real poles and no overshoot.
:::

::: proof
At crossover, $\abs{T(j\omega_c)} = 1$ and $\angle T(j\omega_c) = -90^\circ - \arctan(\omega_c/\omega_2)$, so $\mathrm{PM} = 90^\circ - \arctan(\omega_c/\omega_2)$ and $x = \omega_c/\omega_2 = \cot\mathrm{PM}$. The magnitude condition is $\omega_u = \omega_c\sqrt{1 + x^2}$, so

$$
Q^2 = \frac{\omega_u}{\omega_2} = x\sqrt{1 + x^2} = \cot\mathrm{PM}\cdot\frac{1}{\sin\mathrm{PM}} = \frac{\cos\mathrm{PM}}{\sin^2\mathrm{PM}}.
$$

The overshoot of a second-order step response with damping ratio $\zeta = 1/(2Q) < 1$ is $\exp\bigl(-\pi\zeta/\sqrt{1 - \zeta^2}\bigr)$ ([[circuits-1/second-order-circuits]]); substituting the values of $Q$ gives the figures quoted.
:::

| phase margin | $Q$ | $\zeta$ | step overshoot | peaking of $\lvert A_f\rvert$ |
|---|---|---|---|---|
| $30^\circ$ | $1.86$ | $0.27$ | $42\,\%$ | $5.7\,\mathrm{dB}$ |
| $45^\circ$ | $1.19$ | $0.42$ | $23\,\%$ | $2.4\,\mathrm{dB}$ |
| $60^\circ$ | $0.82$ | $0.61$ | $8.8\,\%$ | $0.3\,\mathrm{dB}$ |
| $70^\circ$ | $0.62$ | $0.80$ | $1.4\,\%$ | none |

A phase margin of about $60^\circ$ is the usual compromise: little overshoot, almost no frequency-response peaking, and a reasonably fast settling time. Larger margins buy no overshoot at the cost of a slower response, because $\omega_c$ must be placed further below $\omega_2$.

::: widget plot
f: 1 - exp(-x/2)*(cos(sqrt(cos(m*pi/180)/sin(m*pi/180)^2 - 0.25)*x) + 0.5/sqrt(cos(m*pi/180)/sin(m*pi/180)^2 - 0.25)*sin(sqrt(cos(m*pi/180)/sin(m*pi/180)^2 - 0.25)*x))
x: 0, 25
y: 0, 1.5
sliders: m=60:30:76:1
hlines: 1
labels: \text{step response } v_o/(v_s/\beta)
caption: Closed-loop step response of a feedback amplifier whose loop gain is an integrator with one extra pole, plotted against $\omega_2t$, for phase margin $m$ (degrees) on the slider. At $30^\circ$ the response rings hard with $42\,\%$ overshoot; at $45^\circ$ the overshoot is $23\,\%$; near $60^\circ$ it falls below $9\,\%$; and at $76^\circ$ the response is almost critically damped.
:::

::: quiz
A feedback amplifier has a phase margin of $10^\circ$. Which behaviour do you expect?
- [ ] It oscillates continuously.
- [x] It is stable but its step response rings strongly and its frequency response has a tall peak near the crossover frequency.
- [ ] It has a slow, overdamped step response.
- [ ] Its closed-loop gain is $10\,\%$ below $1/\beta$.
::: solution
A positive phase margin means the amplifier is stable. But by [[#eq-pm-q]], $\mathrm{PM} = 10^\circ$ gives $Q^2 = \cos10^\circ/\sin^210^\circ = 32.7$, $Q = 5.7$: a peak of about $15\,\mathrm{dB}$ in $\abs{A_f}$ and an overshoot of about $76\,\%$. Such an amplifier is useless in practice and would oscillate with a little extra capacitive load.
:::
:::

## Frequency compensation

An uncompensated amplifier — two or three gain stages, each with a pole somewhere between $1$ and $100\,\mathrm{MHz}$ — has far too little phase margin for large $\beta$. **Frequency compensation** modifies $A(s)$ so that the loop gain crosses unity, at the largest $\beta$ of interest, with an adequate phase margin. The strategies all aim at the same shape: a single pole dominating the loop gain from low frequencies up to crossover, so that $\abs{T}$ falls at $20\,\mathrm{dB/decade}$ and the phase sits near $-90^\circ$ until well past $\omega_c$.

### Dominant-pole compensation

The simplest method adds a new pole at a very low frequency $f_D$, for example with a large capacitor to ground at a high-impedance node, leaving the existing poles where they are. The loop gain then falls at $20\,\mathrm{dB/decade}$ from $f_D$, and we choose $f_D$ so that $\abs{T}$ reaches $1$ before the next pole adds much phase.

::: theorem Dominant-pole placement {#thm-dominant}
If a dominant pole $f_D$ is added to an amplifier of mid-band gain $A_0$ whose own poles are $f_1 < f_2 < \cdots$, and $f_D \ll f_c$, then $\abs{T(jf)} \approx A_0\beta f_D/f$ until $f_1$. Placing the crossover at the first original pole,

$$
f_D = \frac{f_1}{A_0\beta},
$$ {#eq-dominant}

gives a phase margin of about $45^\circ$ (less the lag of the higher poles); placing it lower gives more.
:::

::: proof
For $f_D \ll f \ll f_1$, $\abs{1 + jf/f_D} \approx f/f_D$ and the other poles contribute little, so $\abs{T} \approx A_0\beta f_D/f$, which is $1$ at $f = A_0\beta f_D$. Setting this equal to $f_1$ gives [[#eq-dominant]]. At $f_1$ the dominant pole contributes almost $-90^\circ$ and the pole at $f_1$ contributes $-45^\circ$, leaving a margin of $45^\circ$ minus the lag $\sum_{k\ge2}\arctan(f_1/f_k)$ of the higher poles.
:::

::: example Compensating a three-pole amplifier {#ex-dominant}
An amplifier has $A_0 = 10^4$ ($80\,\mathrm{dB}$) and poles at $1$, $10$ and $100\,\mathrm{MHz}$. It must be stable as a follower ($\beta = 1$). (a) Show that it is unstable without compensation. (b) Add a dominant pole by [[#eq-dominant]] and find the phase margin. (c) Where should the dominant pole be for $\mathrm{PM} = 60^\circ$?
::: solution
(a) The phase reaches $-180^\circ$ where $\arctan(f/1) + \arctan(f/10) + \arctan(f/100) = 180^\circ$ ($f$ in MHz), at $f_{180} = 33.3\,\mathrm{MHz}$. There $\abs{T} = 10^4/(33.3\times3.47\times1.05)$, which is $+38\,\mathrm{dB}$: the gain margin is $-38\,\mathrm{dB}$ and the follower oscillates.

(b) $f_D = 1\,\mathrm{MHz}/10^4 = 100\,\mathrm{Hz}$. Solving $\abs{T} = 1$ numerically gives $f_c = 0.78\,\mathrm{MHz}$ (slightly below $1\,\mathrm{MHz}$ because the $1\,\mathrm{MHz}$ pole has already reduced the gain by $\sqrt{1 + 0.78^2}$). The phase margin is $180^\circ - 90^\circ - \arctan(0.78) - \arctan(0.078) - \arctan(0.0078) = 47^\circ$.

(c) For $60^\circ$ we need $\arctan(f_c/1) + \arctan(f_c/10) + \arctan(f_c/100) = 30^\circ$, which gives $f_c = 0.51\,\mathrm{MHz}$. The magnitude condition $A_0f_D/f_c \times 0.89 = 1$ (the factor $0.89$ being the attenuation of the three original poles there) gives $f_D = 57\,\mathrm{Hz}$.

The cost is plain: the compensated amplifier has an open-loop bandwidth of $57\,\mathrm{Hz}$ and a unity-gain frequency of about $0.5\,\mathrm{MHz}$, although its first stage alone was good to $1\,\mathrm{MHz}$. Dominant-pole compensation is simple but wasteful, and the capacitor needed to put a pole at $57\,\mathrm{Hz}$ on a node of, say, $100\,\mathrm{k\Omega}$ is $28\,\mathrm{nF}$ — far too big for a chip.
:::
:::

### Miller compensation and pole splitting

The elegant alternative uses the **Miller effect** of [[electronics-1/amplifier-frequency-response]]. Consider the two-stage amplifier at the heart of most op-amps ([[electronics-2/operational-amplifier-design]]): a first stage of transconductance $g_{m1}$ driving a node of resistance $R_1$ and capacitance $C_1$, followed by an inverting second stage of transconductance $g_{m2}$ driving the output node, $R_2$ and $C_2$ (which includes the load). Without compensation it has two poles, $1/(R_1C_1)$ and $1/(R_2C_2)$, often close together. Now connect a **compensation capacitor** $C_c$ from the output back to the second stage's input.

::: theorem Pole splitting {#thm-pole-splitting}
With Miller compensation, the transfer function of the two-stage amplifier is

$$
\frac{V_o(s)}{V_i(s)} = \frac{g_{m1}R_1g_{m2}R_2\,(1 - sC_c/g_{m2})}{1 + s\bigl[R_1(C_1 + C_c) + R_2(C_2 + C_c) + g_{m2}R_1R_2C_c\bigr] + s^2R_1R_2\bigl[C_1C_2 + C_c(C_1 + C_2)\bigr]}.
$$ {#eq-miller-tf}

When the poles are widely separated and $g_{m2}R_2 \gg 1$, they are approximately

$$
\omega_{p1} \approx \frac{1}{g_{m2}R_2R_1C_c}, \qquad \omega_{p2} \approx \frac{g_{m2}C_c}{C_1C_2 + C_c(C_1 + C_2)} \approx \frac{g_{m2}}{C_2}\ \ (C_c \gg C_1),
$$ {#eq-split-poles}

and there is a right-half-plane zero at $\omega_z = g_{m2}/C_c$. The unity-gain frequency of $A$ is

$$
\omega_t = A_0\,\omega_{p1} \approx \frac{g_{m1}}{C_c}.
$$ {#eq-miller-wt}
:::

::: proof
Nodal analysis with node voltages $V_1$ (first-stage output) and $V_o$. At node 1 the first stage injects $-g_{m1}V_i$:

$$
V_1\Bigl(\frac{1}{R_1} + sC_1 + sC_c\Bigr) - sC_cV_o = -g_{m1}V_i.
$$

At the output the second stage sinks $g_{m2}V_1$:

$$
(g_{m2} - sC_c)V_1 + V_o\Bigl(\frac{1}{R_2} + sC_2 + sC_c\Bigr) = 0.
$$

From the second equation $V_1 = -V_o(1/R_2 + sC_2 + sC_c)/(g_{m2} - sC_c)$. Substituting into the first and multiplying through by $R_1R_2(g_{m2} - sC_c)$ gives, after collecting powers of $s$, [[#eq-miller-tf]]. The zero is where $g_{m2} - sC_c = 0$: the current through $C_c$ cancels the current of the second stage, and it lies at positive $s$.

If the denominator is $1 + a_1s + a_2s^2$ with widely separated real roots, the low root is $\approx 1/a_1$ and the high root $\approx a_1/a_2$. With $g_{m2}R_2 \gg 1$ the term $g_{m2}R_1R_2C_c$ dominates $a_1$, giving $\omega_{p1}$; and $a_1/a_2 \approx g_{m2}C_c/[C_1C_2 + C_c(C_1 + C_2)]$, giving $\omega_{p2}$. Finally $A_0\omega_{p1} = g_{m1}R_1g_{m2}R_2/(g_{m2}R_2R_1C_c) = g_{m1}/C_c$.
:::

The name **pole splitting** describes what happens as $C_c$ grows: $\omega_{p1}$ falls (the Miller-multiplied capacitance $g_{m2}R_2C_c$ loads node 1) while $\omega_{p2}$ rises towards $g_{m2}/C_2$ (at high frequencies $C_c$ shorts the second stage's output to its input, turning it into a diode-connected device of resistance $1/g_{m2}$). A capacitor of a few picofarads does the work of the nanofarads needed for plain dominant-pole compensation, because the second stage multiplies it by its gain. And the unity-gain frequency $g_{m1}/C_c$ depends only on two well-controlled quantities.

The right-half-plane zero is the price. It raises $\abs{A}$ like a left-half-plane zero but adds phase *lag*, $-\arctan(\omega/\omega_z)$, eating into the phase margin. Two standard remedies are a **nulling resistor** $R_z$ in series with $C_c$, which moves the zero to $\omega_z = 1/\bigl[C_c(1/g_{m2} - R_z)\bigr]$ (to infinity when $R_z = 1/g_{m2}$, and into the left half-plane, where it adds lead, when $R_z > 1/g_{m2}$), and a buffer that stops the feedforward current through $C_c$.

::: algorithm Two-stage Miller compensation {#alg-miller}
For a two-stage amplifier to be unity-gain stable with phase margin of about $60^\circ$:

1. Place the RHP zero well above crossover: $\omega_z = g_{m2}/C_c \ge 10\,\omega_t = 10\,g_{m1}/C_c$, that is $g_{m2} \ge 10\,g_{m1}$.
2. Place the non-dominant pole at $\omega_{p2} \approx g_{m2}/C_2 \ge 2.2\,\omega_t$. Together with step 1 this gives $C_c \ge 0.22\,C_2$.
3. Choose $C_c$, then $g_{m1} = \omega_tC_c$ for the required unity-gain frequency.
4. Verify the phase margin with the full transfer function [[#eq-miller-tf]] or a simulation, then optionally add $R_z \approx 1/g_{m2}$ or slightly more.
:::

The numbers in step 2 come from the phase budget: with $\omega_{p2} = 2.2\,\omega_t$ and $\omega_z = 10\,\omega_t$ the lags at crossover are $\arctan(1/2.2) + \arctan(0.1) = 24.4^\circ + 5.7^\circ = 30^\circ$, leaving $60^\circ$.

::: example Designing Miller compensation {#ex-miller}
A two-stage CMOS amplifier has $g_{m1} = 1\,\mathrm{mS}$, $R_1 = 200\,\mathrm{k\Omega}$, $C_1 = 0.2\,\mathrm{pF}$, $g_{m2} = 10\,\mathrm{mS}$, $R_2 = 20\,\mathrm{k\Omega}$, and a load (with the output node's own capacitance) of $C_2 = 5\,\mathrm{pF}$. (a) Find the DC gain and the uncompensated poles, and the phase margin as a follower. (b) Choose $C_c$ by [[#alg-miller]] and estimate the poles, zero and unity-gain frequency. (c) Compare with the exact result.
::: solution
(a) $A_0 = g_{m1}R_1g_{m2}R_2 = 200\times200 = 4\times10^4$ ($92\,\mathrm{dB}$). The poles are $1/(2\pi R_1C_1) = 3.98\,\mathrm{MHz}$ and $1/(2\pi R_2C_2) = 1.59\,\mathrm{MHz}$. As a follower the loop gain crosses unity at about $500\,\mathrm{MHz}$, where both poles contribute nearly $90^\circ$: the phase margin is about $0.6^\circ$. The amplifier would ring almost indefinitely.

(b) Step 1 holds: $g_{m2} = 10\,g_{m1}$. Step 2: $C_c \ge 0.22\times5\,\mathrm{pF} = 1.1\,\mathrm{pF}$; take $C_c = 1.1\,\mathrm{pF}$. Then

$$
\begin{aligned}
\omega_t &\approx \frac{g_{m1}}{C_c} = \frac{10^{-3}}{1.1\times10^{-12}} = 9.09\times10^8\,\mathrm{rad/s} \quad (145\,\mathrm{MHz}),\\
\omega_{p1} &\approx \frac{1}{g_{m2}R_2R_1C_c} = \frac{1}{0.01\times2\times10^4\times2\times10^5\times1.1\times10^{-12}} = 2.27\times10^4\,\mathrm{rad/s} \quad (3.6\,\mathrm{kHz}),\\
\omega_{p2} &\approx \frac{g_{m2}C_c}{C_1C_2 + C_c(C_1 + C_2)} = \frac{0.01\times1.1}{1.0 + 5.72}\times10^{12} = 1.64\times10^9\,\mathrm{rad/s} \quad (261\,\mathrm{MHz}),\\
\omega_z &= \frac{g_{m2}}{C_c} = 9.09\times10^9\,\mathrm{rad/s} \quad (1.45\,\mathrm{GHz}).
\end{aligned}
$$

The cruder $g_{m2}/C_2 = 2\times10^9\,\mathrm{rad/s}$ overestimates $\omega_{p2}$ because $C_1$ is not negligible beside $C_c$.

(c) Evaluating [[#eq-miller-tf]] exactly, the poles are at $2.25\times10^4$ and $1.65\times10^9\,\mathrm{rad/s}$, the loop gain of the follower crosses unity at $129\,\mathrm{MHz}$ (below the estimate, because $\omega_{p2}$ already reduces $\abs{A}$ there), and the phase margin is $59^\circ$. Adding a nulling resistor $R_z = 1/g_{m2} = 100\,\Omega$ removes the zero and raises the margin to about $64^\circ$; $R_z = 300\,\Omega$ moves the zero into the left half-plane and gives $73^\circ$.
:::
:::

::: quiz
In a Miller-compensated two-stage amplifier, the compensation capacitor $C_c$ is doubled. What happens to the unity-gain frequency $\omega_t$ and to the phase margin as a follower?
- [ ] $\omega_t$ doubles and the phase margin falls.
- [x] $\omega_t$ halves and the phase margin rises.
- [ ] Both are unchanged, because the DC gain is unchanged.
- [ ] $\omega_t$ halves and the phase margin falls, because the RHP zero moves down.
::: solution
By [[#eq-miller-wt]], $\omega_t \approx g_{m1}/C_c$ halves. The non-dominant pole $\approx g_{m2}/C_2$ hardly moves (it rises slightly), so crossover is now further below it, and although the zero $g_{m2}/C_c$ also halves, its ratio to $\omega_t$ is unchanged. The net effect is a larger phase margin — about $69^\circ$ for [[#ex-miller]] with $C_c = 2\,\mathrm{pF}$ — paid for with bandwidth.
:::
:::

### Other compensation methods

Several further techniques are used when Miller compensation is not enough or not possible.

- **Lead compensation in the feedback network.** A small capacitor across the feedback resistor $R_2$ of a non-inverting or inverting amplifier adds a zero to $\beta(s)$, and hence phase lead to $T$ near crossover. It is the standard fix for the input capacitance of a transimpedance amplifier.
- **Decompensated op-amps.** An op-amp intended only for closed-loop gains above, say, $5$ needs less compensation and so offers a higher gain–bandwidth product. Its data sheet states the minimum stable gain.
- **Isolation of capacitive loads.** A small resistor in series with the output, outside the loop, separates the load capacitance from the op-amp's output resistance (see [[#exr-capacitive-load]]).
- **Cascode (Ahuja) compensation** feeds the capacitor current back through a cascode device, removing the RHP zero without a nulling resistor, and **multi-stage nested Miller** schemes extend the idea to three or more gain stages; both are treated in Razavi's book.

::: application Capacitive loads and cables
A data sheet's phase margin assumes a resistive load. The op-amp's open-loop output resistance $r_o$ (typically $20$–$100\,\Omega$) and a load capacitance $C_L$ form an extra pole at $1/(2\pi r_oC_L)$ inside the loop. With $r_o = 50\,\Omega$ and $10\,\mathrm{nF}$ — a few tens of metres of cable — this pole is at $318\,\mathrm{kHz}$, well below a $10\,\mathrm{MHz}$ op-amp's crossover, and the follower's phase margin collapses to about $10^\circ$. Data sheets of op-amps for driving cables, piezo actuators and ADC reference inputs therefore quote a maximum stable load capacitance, or "unlimited capacitive load drive".
:::

::: history
Harry Nyquist (1889–1976), a Swedish-born engineer at Bell Laboratories, published "Regeneration theory" in the *Bell System Technical Journal* in 1932, showing that the stability of a feedback amplifier can be read from a plot of its loop gain's frequency response. His colleague Hendrik Wade Bode (1905–1982) turned this into design practice: his 1940 paper on the relation between attenuation and phase in feedback amplifiers and his 1945 book *Network Analysis and Feedback Amplifier Design* introduced gain and phase margins and the straight-line approximations now called Bode plots. Early integrated op-amps, such as Robert Widlar's μA709 (Fairchild, 1965), needed external compensation components; the μA741 (1968), designed by David Fullagar, integrated a $30\,\mathrm{pF}$ Miller capacitor and became the unity-gain-stable standard. James Solomon's 1974 tutorial on monolithic op-amps explained the link between Miller compensation and slew rate.
:::

## Where this leads

Miller compensation is designed into the two-stage op-amp of [[electronics-2/operational-amplifier-design]], where the compensation capacitor also sets the **slew rate**. The same margins govern every loop in electronics: voltage regulators, the current loops of [[power-electronics/converter-control]] and phase-locked loops. In [[control-systems/frequency-response-methods]] and [[control-systems/compensator-design]] the Nyquist criterion and lead–lag compensation are developed as general tools. And when the phase margin is deliberately made zero, an amplifier becomes an oscillator ([[electronics-2/oscillators]]).

::: summary
- The closed-loop poles are the roots of $1 + T(s) = 0$; the amplifier is stable when they all lie in the left half-plane.
- One-pole loops are always stable; two-pole loops are stable but can be badly underdamped; with three or more poles the loop oscillates once $T$ is large enough (for three equal poles, $A_0\beta \ge 8$).
- The Nyquist criterion reads stability from $T(j\omega)$: no encirclement of $-1$. For ordinary amplifiers this means a positive phase margin at the frequency where $\abs{T} = 1$.
- For a dominant-pole loop with one extra pole, $Q^2 = \cos\mathrm{PM}/\sin^2\mathrm{PM}$: $45^\circ$ gives $23\,\%$ overshoot, $60^\circ$ gives $9\,\%$.
- The follower ($\beta = 1$) is the worst case; an op-amp stable there is unity-gain stable.
- Dominant-pole compensation works but wastes bandwidth and needs large capacitors.
- Miller compensation splits the poles: $\omega_{p1} \approx 1/(g_{m2}R_2R_1C_c)$, $\omega_{p2} \approx g_{m2}/C_2$, $\omega_t \approx g_{m1}/C_c$, with an RHP zero at $g_{m2}/C_c$ that a nulling resistor can remove. For about $60^\circ$ take $g_{m2} \ge 10\,g_{m1}$ and $C_c \ge 0.22\,C_2$.
:::

## Exercises

::: exercise Phase margin from a Bode plot {level=1 check="180-90-atan(0.5)*180/pi"}
A loop gain has its dominant pole far below crossover and a second pole at twice the crossover frequency. What is the phase margin in degrees?
::: solution
The dominant pole contributes $-90^\circ$ and the second pole $-\arctan(0.5) = -26.6^\circ$. $\mathrm{PM} = 180^\circ - 90^\circ - 26.6^\circ = 63.4^\circ$.
:::
:::

::: exercise Gain margin {level=1 check="20*log10(8/5)"}
An amplifier with three identical poles is used with $A_0\beta = 5$. What is its gain margin in dB?
::: solution
At $\omega_{180} = \sqrt3\,\omega_p$, $\abs{T} = 5/8$, so $\mathrm{GM} = -20\log_{10}(5/8) = 4.08\,\mathrm{dB}$ (see [[#ex-three-poles]]). The loop is stable, but only just: a gain margin of $10\,\mathrm{dB}$ would need $A_0\beta \le 2.5$.
:::
:::

::: exercise Miller unity-gain frequency {level=1 check="0.5e-3/(2*pi*2e-12)"}
A Miller-compensated op-amp has $g_{m1} = 0.5\,\mathrm{mS}$ and $C_c = 2\,\mathrm{pF}$. Estimate its unity-gain frequency in hertz.
::: solution
$f_t \approx g_{m1}/(2\pi C_c) = 5\times10^{-4}/(2\pi\times2\times10^{-12}) = 39.8\,\mathrm{MHz}$.
:::
:::

::: exercise Overshoot from phase margin {level=2}
A unity-gain buffer has a phase margin of $50^\circ$. Using [[#prop-pm-q]], find the closed-loop $Q$, the damping ratio and the percentage overshoot of its step response.
::: solution
$Q^2 = \cos50^\circ/\sin^250^\circ = 0.6428/0.5868 = 1.095$, so $Q = 1.047$ and $\zeta = 1/(2Q) = 0.478$. The overshoot is $\exp(-\pi\times0.478/\sqrt{1 - 0.478^2}) = \exp(-1.709) = 18.1\,\%$.
:::
:::

::: exercise Minimum stable gain {level=2 check="200"}
The amplifier of [[#ex-three-poles]] ($A_0 = 1000$, three poles at $1\,\mathrm{MHz}$) must have a gain margin of at least $6\,\mathrm{dB}$. What is the smallest closed-loop gain it can then be used for?
::: solution
$\mathrm{GM} = -20\log_{10}(A_0\beta/8) \ge 6\,\mathrm{dB}$ requires $A_0\beta/8 \le 0.5$, so $A_0\beta \le 4$ and $\beta \le 0.004$. The closed-loop gain is then $A_0/(1 + A_0\beta) \ge 1000/5 = 200$. Without the margin requirement the limit would be $1000/9 = 111$, as in the example.
:::
:::

::: exercise Dominant-pole capacitor {level=2 check="1/(2*pi*500e3*100)"}
In a three-stage amplifier, a dominant pole at $100\,\mathrm{Hz}$ is to be created by a capacitor from a node of resistance $500\,\mathrm{k\Omega}$ to ground. Find the capacitance in farads. Then find the Miller capacitance that would do the same if it were connected around a following inverting stage of gain $-500$.
::: solution
$C = 1/(2\pi\times5\times10^5\times100) = 3.18\,\mathrm{nF}$, far too large for an integrated circuit. Across a gain of $-500$ the Miller capacitance seen at the node is $C_c(1 + 500)$, so $C_c = 3.18\,\mathrm{nF}/501 = 6.35\,\mathrm{pF}$, which fits easily on a chip.
:::
:::

::: exercise A capacitive load {#exr-capacitive-load level=2}
An op-amp with $f_t = 10\,\mathrm{MHz}$ (single dominant pole) and open-loop output resistance $r_o = 50\,\Omega$ drives $C_L = 10\,\mathrm{nF}$ as a follower. (a) Find the frequency of the extra pole. (b) Estimate the phase margin. (c) A resistor $R_{iso}$ is placed in series with the output, outside the loop (the feedback is taken from the op-amp's own output pin). What does this change, and what does it cost?
::: solution
(a) $f_L = 1/(2\pi r_oC_L) = 1/(2\pi\times50\times10^{-8}) = 318\,\mathrm{kHz}$.

(b) The loop gain is $T \approx (f_t/jf)/(1 + jf/f_L)$. Solving $\abs{T} = 1$ gives $f_c = 1.77\,\mathrm{MHz}$, where the extra pole contributes $\arctan(1.77/0.318) = 79.8^\circ$: $\mathrm{PM} \approx 10^\circ$.

(c) With the feedback taken before $R_{iso}$, the load capacitor is outside the loop: the op-amp sees $r_o$ plus a load that looks resistive ($R_{iso}$) at high frequencies, the extra pole disappears from $T$, and the phase margin returns to about $90^\circ$. The cost is that $R_{iso}$ and $C_L$ now form an open-loop low-pass filter at $1/(2\pi R_{iso}C_L)$ after the amplifier, and the DC accuracy at the load depends on the load current through $R_{iso}$. A common refinement takes the DC feedback from the load side and the high-frequency feedback from the op-amp side through a small capacitor.
:::
:::

::: exercise Nulling resistor {level=3}
For the Miller-compensated amplifier of [[#ex-miller]], (a) show that with $R_z$ in series with $C_c$ the zero moves to $\omega_z = 1/\bigl[C_c(1/g_{m2} - R_z)\bigr]$; (b) choose $R_z$ so that the zero lands on the non-dominant pole $\omega_{p2} = 1.65\times10^9\,\mathrm{rad/s}$ and cancels it. (c) Why is exact cancellation hard to maintain in production?
::: hint
The zero is the frequency at which the current through the $R_z$–$C_c$ branch equals the second stage's current $g_{m2}V_1$, so that the output voltage is zero.
:::
::: solution
(a) With $V_o = 0$, the branch current is $V_1/(R_z + 1/(sC_c))$ and the second stage sinks $g_{m2}V_1$; for zero output these must be equal, $g_{m2}(R_z + 1/(sC_c)) = 1$, so $s = 1/[C_c(1/g_{m2} - R_z)]$. For $R_z < 1/g_{m2}$ this is positive (RHP); for $R_z > 1/g_{m2}$ it is negative (LHP).

(b) A LHP zero at $-1.65\times10^9\,\mathrm{rad/s}$ needs $C_c(R_z - 1/g_{m2}) = 1/(1.65\times10^9)$, that is $R_z - 100\,\Omega = 1/(1.65\times10^9\times1.1\times10^{-12}) = 551\,\Omega$, so $R_z = 651\,\Omega$. The amplifier then behaves as a single-pole amplifier up to a third pole near $1/(R_zC_1) = 7.7\times10^9\,\mathrm{rad/s}$ introduced by the resistor.

(c) $\omega_{p2}$ depends on the load capacitance and on $g_{m2}$, which vary with load, temperature and process, while $R_z$ (a resistor or a MOSFET in triode) varies differently. A pole–zero doublet that does not cancel exactly leaves a slow settling "tail" in the step response; designers therefore usually aim for a zero somewhat above $\omega_t$ rather than exact cancellation, often making $R_z$ a MOSFET whose resistance tracks $1/g_{m2}$.
:::
:::

::: exercise A compensation design {level=3}
A two-stage op-amp must be unity-gain stable with $\mathrm{PM} \approx 60^\circ$ and a unity-gain frequency of $20\,\mathrm{MHz}$ when driving $C_2 = 10\,\mathrm{pF}$. Using [[#alg-miller]], find $C_c$, $g_{m1}$ and the minimum $g_{m2}$. If the second stage is a MOSFET with $g_m/I_D = 10\,\mathrm{V^{-1}}$, what bias current does it need?
::: solution
Step 2 gives $C_c \ge 0.22\times10\,\mathrm{pF} = 2.2\,\mathrm{pF}$. Then $g_{m1} = \omega_tC_c = 2\pi\times2\times10^7\times2.2\times10^{-12} = 0.276\,\mathrm{mS}$. Step 1 requires $g_{m2} \ge 10\,g_{m1} = 2.76\,\mathrm{mS}$; check step 2: $g_{m2}/C_2 = 2.76\times10^{-3}/10^{-11} = 2.76\times10^8\,\mathrm{rad/s}$, which equals $2.2\,\omega_t = 2.2\times1.26\times10^8 = 2.76\times10^8\,\mathrm{rad/s}$, as intended. The second stage needs $I_D = g_{m2}/10 = 276\,\mu\mathrm{A}$. The load capacitance sets the power: halving $C_2$ would halve the second-stage current.
:::
:::
