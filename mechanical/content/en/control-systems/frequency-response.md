The root locus answers the question "where do the poles go?"; the Bode plot answers the question an engineer in the field can actually ask, which is "how much more gain can I take, and how much delay can this loop tolerate?" The two are the same information repacked, and the repacking is what makes frequency response the working language of control. A measured frequency-response trace contains the plant, the actuator, the sensor, the wiring capacitance and the sampling delay in one curve, and it can be obtained without writing a differential equation, which is why every commissioning engineer in every industry carries an amplitude that the theorist's state-space model cannot match.

The method rests on a single remarkable fact about **minimum-phase** systems: the magnitude curve determines the phase curve. Once the gain has been drawn, the phase is not additional information but a transform of it, and the whole design space collapses to the shape of one curve. The exceptions — an integrator, a delay, a right-half-plane zero, a resonance too narrow for the asymptotes — are exactly the things that go wrong in practice, and knowing them as **departures from the rule** is the fastest diagnostic in the field: a phase that falls faster than the slope predicts is a delay or an unmodelled resonance, and a magnitude that is flat where the phase is falling is an all-pass.

::: warning The straight-line plot is a sketch, and the sketch lies in three specific places
Asymptotic Bode construction adds decibels and degrees factor by factor, and that is exact only in the limit. Three failures are systematic and each has a size. **Peaking is invisible:** a complex pole pair with a damping ratio of $0.2$ stands $1.2$ decades above its asymptote at its own natural frequency, and a designer who adds the asymptotes of a servo's mechanical resonance to the asymptotes of its electrical lag will draw a crossover a factor of two too low and a phase margin twenty degrees too high. **The phase of a resonance is compressed:** a pole pair contributes its full $- 180^{\circ}$ within a decade either side of $\omega_n$, so a resonance at a frequency the designer "kept well above" the crossover can still deliver $- 60^{\circ}$ at the crossover itself. **And the plot is of the loop gain with the loop open**, which is exactly the condition under which a plant with an unstable mode, a saturating actuator or a conditional stability region behaves nothing like the loop-closed reality. The professional habit is to draw the asymptotes to find the crossover in thirty seconds and then compute the exact magnitude and phase at that one frequency before believing any of it.
:::

## Reading the plot

::: definition The three template factors and the arithmetic of decibels {#def-bode}
Every Bode plot is built from three factors, added in decibels:

| Factor | Magnitude | Phase | Slope |
|---|---|---|---|
| Gain $K$ | $20 \log_{10} K$ dB, flat | $0^{\circ}$ | $0$ dB/dec |
| Integrator $1 / \left( \mathrm{j} \omega \right)$ | $- 20 \log_{10} \omega$ | $- 90^{\circ}$ flat | $- 20$ dB/dec |
| Pole $1 / \left( 1 + \mathrm{j} \omega / \omega_b \right)$ | $0$ then $- 20$ dB/dec | $0 \rightarrow - 90^{\circ}$ | $- 20$ dB/dec after $\omega_b$ |
| Zero $1 + \mathrm{j} \omega / \omega_b$ | $0$ then $+ 20$ dB/dec | $0 \rightarrow + 90^{\circ}$ | $+ 20$ dB/dec after $\omega_b$ |
| Pole pair $\omega_n^{2} / \left( s^{2} + 2 \zeta \omega_n s + \omega_n^{2} \right)$ | $0$ then $- 40$ dB/dec | $0 \rightarrow - 180^{\circ}$ | $- 40$ dB/dec, peak $1 / \left( 2 \zeta \right)$ |

The useful arithmetic: $20\ \mathrm{dB}$ is a factor of ten, $6\ \mathrm{dB}$ is a factor of two, $3\ \mathrm{dB}$ is $\sqrt{2}$, and $1\ \mathrm{dB}$ is $1.12$. A pole contributes half its total phase at its break frequency, $90^{\circ}$ per decade of slope at four and forty times the break frequency, and the phase of a pole pair collapses to $- 90^{\circ}$ exactly at $\omega_n$ regardless of damping.
:::

::: proof Slope predicts phase {#proof-slope-phase}
For a minimum-phase transfer function the phase at a frequency is a weighted average of the **logarithmic slope** of the magnitude at neighbouring frequencies. Where the slope is constant over several decades the average collapses to the local value, and
$$
\varphi \approx \frac{\pi}{2} \frac{\mathrm{d} \ln \left| G \right|}{\mathrm{d} \ln \omega} \ \text{radians}
\qquad\Longleftrightarrow\qquad
\varphi \left[ ^{\circ} \right] \approx 4.5 \times \left( \text{slope in dB per decade} \right) .
$$
**Check on the templates.** A single pole at high frequency has a slope of $- 20$ and a phase of $- 90^{\circ}$: $4.5 \times \left( - 20 \right) = - 90$ $\checkmark$. A pole pair: $- 180$ $\checkmark$. A pure integrator, slope $- 20$ and phase $- 90^{\circ}$ flat $\checkmark$. At a single pole's own break frequency the local slope is $- 10$ and the formula gives $- 45^{\circ}$, which is the exact value — the relation is not merely asymptotic there. $\checkmark$
**Derivation for a wide-band power law.** If $\left| G \right| = A \omega^{n}$ over a band, then $G \approx A \left( \mathrm{j} \omega \right)^{n}$ inside that band by analytic continuation, and $\varphi = n \pi / 2$ exactly. The general case follows because the exact relation, Bode's gain-phase integral, weights the slope at $\omega^{\prime} = \omega u$ by $\left( 2 / \pi \right) \ln \coth \left| \ln u \right| / 2$, a kernel of unit area concentrated within a factor of seven of $\omega$ — which is why the local slope works and why it fails when the magnitude changes abruptly. $\checkmark$

*Note.* The relation is the reason a Bode magnitude plot can be **read** rather than computed, and the reason the phrase "twenty degrees per decade of slope" is worth memorising. It is also the reason the three exceptions matter so much. A pure delay has a flat magnitude and a phase of $- \omega \theta$, so it appears as a phase that is far below what the slope predicts, and the deficit in degrees divided by the frequency in radians per second **is** the delay — the single most useful field measurement in this book. A right-half-plane zero has the same magnitude as a left-half-plane one and $- 2 \arctan \left( \omega / z \right)$ more phase, so it too shows as a phase deficit, but one that **saturates** at $- 180^{\circ}$ instead of growing without limit, which distinguishes it from a delay. And an integrator contributes slope without contributing any change of phase, so a plot whose slope is $- 20$ dB/dec over three decades with a phase flat at $- 90^{\circ}$ is a pure integrator and not a very slow pole.
:::

::: definition Minimum phase and the gain-phase integral {#def-minphase}
A transfer function is **minimum phase** when it has no zeros and no poles in the closed right half-plane other than poles at the origin. For such functions, with $M = \ln \left| G \left( \mathrm{j} \omega \right) \right|$,
$$
\varphi \left( \omega \right) = - \frac{2 \omega}{\pi} \int_0^{\infty} \frac{M \left( \omega^{\prime} \right) - M \left( \omega \right)}{\omega^{\prime 2} - \omega^{2}} \mathrm{d} \omega^{\prime} .
$$
Two design consequences. First, **the magnitude plot is the phase plot**: a designer who fixes the magnitude's crossover frequency and slope has fixed the phase margin, and cannot have one without the other. Second, among all transfer functions with a given magnitude, the minimum-phase one has the **smallest** phase lag — hence the name — so every non-minimum-phase element costs phase that no amount of redesign recovers.
:::

## Crossover quantities

::: definition The four numbers that describe a loop {#def-crossover}
Read off the loop-gain Bode plot:
$$
\begin{array}{ll}
\textbf{gain crossover} & \omega_{gc} : \left| L \right| = 0\ \mathrm{dB}, \quad
\textbf{phase margin} \quad \varphi_m = 180^{\circ} + \angle L \left( \mathrm{j} \omega_{gc} \right), \\[4pt]
\textbf{phase crossover} & \omega_{pc} : \angle L = - 180^{\circ}, \quad
\textbf{gain margin} \quad g_m = - \left. \left| L \right| \right|_{\omega_{pc}} \mathrm{dB}, \\[4pt]
\textbf{modulus margin} & b = \min_\omega \left| 1 + L \left( \mathrm{j} \omega \right) \right| = 1 / M_s, \quad
\textbf{delay margin} \quad \theta_m = \varphi_m / \omega_{gc} .
\end{array}
$$
The modulus margin is the distance from the critical point $\left( - 1 , 0 \right)$ to the Nyquist curve and is the **only one of the four that is invariant** under changes of representation; the phase and gain margins can be made to look good or bad by the shape of $L$ away from their own frequencies, and a loop with two crossovers has several of each. The delay margin is the one a designer must quote whenever the loop contains a computer, a network or a transport lag, because it is the number that says whether the code's sampling and the plant's transport will fit together.
:::

::: widget plot
f: asin((1-x)/(1+x))*180/pi
x: 0.02, 1
y: 0, 90
labels: phi_max / deg
caption: The maximum phase a lead network can supply, against its pole-to-zero ratio alpha. The curve is flat near alpha of one, which is why a lead is a poor way to buy a large phase boost, and rises steeply below alpha of 0.2, where the network's high-frequency gain 1 over root alpha is already above 2.5 and is amplifying the noise the designer was trying to avoid. The 47 degrees of the worked design corresponds to alpha of 0.155.
:::

::: example A velocity servo {#ex-servo}
Draw the Bode plot of $L = 7.8 / \left[ s \left( 0.1 s + 1 \right)\left( 0.02 s + 1 \right) \right]$ and read off the four crossover quantities.
::: solution
**Asymptotes.** The integrator's $- 20$ dB/dec line passes through $20 \log_{10} 7.8 = 17.8$ dB at $\omega = 1$. The pole at $10\ \mathrm{rad / s}$ bends the slope to $- 40$, and the pole at $50$ to $- 60$.
**Crossover.** The $- 40$ dB/dec line from $\omega = 10$ reaches $0$ dB at $\omega \approx 6.5$; the exact magnitude there is $7.8 / \left( 6.49 \times 1.193 \times 1.008 \right) = 1.00$.
**Phase margin.**
$$
\angle L = - 90^{\circ} - \arctan \left( 0.649 \right) - \arctan \left( 0.130 \right)
= - 90^{\circ} - 33.0^{\circ} - 7.4^{\circ} = - 130.4^{\circ},
\qquad \varphi_m = 49.6^{\circ} .
$$
**Phase crossover.** The two lags together reach $- 90^{\circ}$ when $0.1 \omega \times 0.02 \omega = 1$, that is at $\omega_{pc} = 22.4\ \mathrm{rad / s}$, where $\left| L \right| = 0.130$, so $g_m = 17.7\ \mathrm{dB}$.
**Modulus and delay margins.** $M_s = 1.60$, $b = 0.63$, and
$$
\theta_m = \frac{0.866\ \mathrm{rad}}{6.49\ \mathrm{rad / s}} = 133\ \mathrm{ms} .
$$
**Damping.** $\zeta \approx 0.01 \varphi_m = 0.50$, $M_p \approx 16\ \%$, settling time $4 / \left( 0.5 \times 7.6 \right) = 1.05\ \mathrm{s}$.

*Check.* The gain margin of $17.7\ \mathrm{dB}$ is a factor of $7.7$ while the gain could be raised only by a factor of about $2.4$ before the phase margin fell below $30^{\circ}$ — the gain margin is the **looser** of the two constraints, which is the usual situation for a loop whose phase falls steeply near the crossover. $\checkmark$

*Sanity.* The velocity constant is $K_v = 7.8\ \mathrm{s^{- 1}}$, so a $100\ \mathrm{mm / s}$ ramp command is followed with $12.8\ \mathrm{mm}$ of error, and improving tracking means raising the gain, which the $133\ \mathrm{ms}$ of delay margin pays for only if the whole loop — encoder filter, current loop, PWM update — stays inside that budget. A $1\ \mathrm{kHz}$ current loop with a $500\ \mu\mathrm{s}$ update and a $2\ \mathrm{ms}$ encoder filter uses $2.5\ \mathrm{ms}$ and is comfortable; a $100\ \mathrm{Hz}$ filter in a noisy plant uses $10\ \mathrm{ms}$ and is still comfortable; a $20\ \mathrm{Hz}$ software filter on a slow PLC uses $40\ \mathrm{ms}$ and the design is now at a quarter of its margin, which is why the filter's corner frequency is a control decision and not a signal-conditioning one.
:::
:::

::: proof The lead network's maximum phase {#proof-lead}
A lead network is $C = \left( 1 + \mathrm{j} \omega T \right) / \left( 1 + \mathrm{j} \omega \alpha T \right)$ with $\alpha < 1$. Its phase is
$$
\varphi = \arctan \left( \omega T \right) - \arctan \left( \omega \alpha T \right) .
$$
Differentiating and setting $\mathrm{d} \varphi / \mathrm{d} \omega = 0$,
$$
\frac{T}{1 + \omega^{2} T^{2}} = \frac{\alpha T}{1 + \omega^{2} \alpha^{2} T^{2}}
\quad\Longrightarrow\quad
\omega_{\max} = \frac{1}{T \sqrt{\alpha}} ,
$$
the **geometric mean** of the two break frequencies. Substituting and using the tangent difference formula,
$$
\tan \varphi_{\max} = \frac{{\left( 1 - \alpha \right) \omega T}}{1 + \alpha \omega^{2} T^{2}}
= \frac{\left( 1 - \alpha \right) / \sqrt{\alpha}}{2} \cdot \frac{2}{1 + 1} \cdot 2
= \frac{1 - \alpha}{2 \sqrt{\alpha}},
$$
and from $\tan \varphi = 2 t / \left( 1 - t^{2} \right)$ with $t = \sqrt{ \left( 1 - \alpha \right) / \left( 1 + \alpha \right) }$ this reduces to the standard form
$$
\sin \varphi_{\max} = \frac{1 - \alpha}{1 + \alpha},
\qquad
\left| C \left( \mathrm{j} \omega_{\max} \right) \right| = \frac{1}{\sqrt{\alpha}} .
$$
$\checkmark$
**The trade in one line.** The phase a lead can buy and the gain it must therefore add are tied by $\alpha$: $45^{\circ}$ costs a factor of $5.8$ of high-frequency gain, $60^{\circ}$ a factor of $13.9$. Since noise grows with that gain and the crossover moves to a higher frequency where the plant has more phase lag, a single lead beyond about $60^{\circ}$ is never used, and the design rule is to take $\varphi_{\max}$ equal to the required boost plus a ten-degree allowance for the crossover shift. $\checkmark$
:::

::: example Lead design on the plot {#ex-lead-bode}
A velocity loop has $G = 20 / \left[ s \left( s + 1 \right) \right]$, the value of $K_v = 20\ \mathrm{s^{- 1}}$ being fixed by the tracking specification. The phase margin is inadequate; restore it to $55^{\circ}$ with a lead.
::: solution
**Uncompensated.** $\omega_{gc} = 4.4\ \mathrm{rad / s}$ from $\omega \sqrt{1 + \omega^{2}} = 20$, and
$$
\varphi_m = 180^{\circ} - 90^{\circ} - \arctan \left( 4.4 \right) = 12.8^{\circ},
$$
which is a damping ratio of $0.11$ and a seventy per cent overshoot.
**Required boost.** $55 - 12.8 = 42^{\circ}$, plus a $10^{\circ}$ allowance for the crossover the lead will cause, so $\varphi_{\max} = 47^{\circ}$ and
$$
\alpha = \frac{1 - \sin 47^{\circ}}{1 + \sin 47^{\circ}} = \frac{0.269}{1.731} = 0.155,
\qquad
\frac{1}{\sqrt{\alpha}} = 2.54 .
$$
**Place $\omega_{\max}$ at the new crossover.** The new crossover is where the uncompensated magnitude equals $\sqrt{\alpha} = 0.394$:
$$
\omega \sqrt{1 + \omega^{2}} = 20 / 0.394 = 50.8
\quad\Longrightarrow\quad
\omega_{\max} = 7.07\ \mathrm{rad / s} .
$$
**Break frequencies.**
$$
T = \frac{1}{\omega_{\max} \sqrt{\alpha}} = \frac{1}{7.07 \times 0.394} = 0.359\ \mathrm{s},
\qquad
\frac{1}{T} = 2.79, \quad \frac{1}{\alpha T} = 17.97 ,
$$
so $C = \left( s + 2.79 \right) / \left( s + 17.97 \right)$.
**Verify.** At $\omega = 7.07$ the plant contributes $- 90^{\circ} - 81.9^{\circ}$, the lead $+ 68.5^{\circ} - 21.4^{\circ} = + 47.0^{\circ}$, and the loop gain is $0.396 \times 2.535 = 1.00$.
$$
\varphi_m = 180^{\circ} - 171.9^{\circ} + 47.0^{\circ} = 55.1^{\circ},
\qquad
\zeta \approx 0.55, \quad M_p \approx 13\ \%, \quad K_v = 20\ \mathrm{s^{- 1}} \text{ unchanged}.
$$
*Sanity.* The crossover has moved from $4.4$ to $7.1\ \mathrm{rad / s}$, so the loop is $60\ \%$ faster, and the noise at the crossover has risen by the lead's $8.1\ \mathrm{dB}$ of high-frequency gain while the plant's own noise floor at those frequencies is $2.5$ times higher than before. The measurement-noise sensitivity $\left| C G \right|$ — the torque noise injected per unit of sensor noise — is what usually decides whether a lead is affordable, and for this loop it is the reason a real drive would implement the same zero as **tachometer feedback** (rate feedback around the inner loop), which moves the locus and the Bode plot in the same direction without the high-frequency gain penalty, at the price of loading the summing junction and requiring a second gain to restore the low-frequency response.
:::
:::

## Delay and non-minimum phase

::: definition What a delay and a right-half-plane zero do to the plot {#def-delay-nmp}
A delay $\mathrm{e}^{- \mathrm{j} \omega \theta}$ has **unit magnitude at every frequency** and a phase of $- \omega \theta$ radians, so it is invisible on the magnitude plot and shows as a phase deficit growing linearly without bound. A right-half-plane zero at $z$ has the same magnitude as a left-half-plane zero and contributes
$$
\Delta \varphi = - 2 \arctan \left( \omega / z \right),
$$
which saturates at $- 180^{\circ}$. Both are minimum-phase violations, and both put a ceiling on the crossover frequency: for a delay the ceiling is $\varphi_{\text{need}} / \theta$, and for a non-minimum-phase zero the empirical ceiling is
$$
\omega_{gc} \lesssim z / 3 .
$$
The diagnostic that separates them is the **shape** of the deficit: measure the phase shortfall against the slope-predicted value at two widely separated frequencies. If the shortfall has doubled with the frequency it is a delay, and its magnitude in degrees divided by $57.3$ and by the frequency is the delay in seconds. If it has grown less than proportionally and is heading for $180^{\circ}$ it is a non-minimum-phase zero, and its position follows from the frequency at which the deficit reaches $90^{\circ}$, which is $\omega = z$.
:::

::: example Delay eats phase {#ex-delay}
The lead design of Example 4 is implemented on a drive whose current loop, PWM update and encoder filter together contribute $100\ \mathrm{ms}$ of delay. What is left?
::: solution
The delay contributes
$$
\Delta \varphi = \omega_{gc} \theta = 7.07 \times 0.100 = 0.707\ \mathrm{rad} = 40.5^{\circ},
$$
leaving $\varphi_m = 55.1 - 40.5 = 14.6^{\circ}$, a damping ratio of $0.13$ and a sixty-two per cent overshoot.
**What the designer can do.** The delay margin of the compensated loop is $55.1^{\circ} = 0.961\ \mathrm{rad}$ divided by $7.07$, that is $136\ \mathrm{ms}$, so the loop can tolerate $36\ \mathrm{ms}$ more delay than it has — but it cannot tolerate the $100\ \mathrm{ms}$ it was given and keep its crossover. The options are, in the order a drive engineer will try them: shorten the delay by raising the current-loop bandwidth and the PWM rate, which is free; move the encoder filter's corner up, which costs noise; or lower the crossover to $3.6\ \mathrm{rad / s}$, where the delay costs $18^{\circ}$ and the lead can be re-tuned for $55^{\circ}$ again, at the price of halving the bandwidth and doubling the settling time.

*Check.* At $\omega = 3.6$ the delay costs $3.6 \times 0.1 = 0.36\ \mathrm{rad} = 20.6^{\circ}$, and the plant's own lag is $90 + 74.5 = 164.5^{\circ}$, so the lead must supply $55 - \left( 180 - 164.5 - 20.6 \right) = 60^{\circ}$ — which needs $\alpha = 0.095$ and $1 / \sqrt{\alpha} = 3.24$, a further $10\ \mathrm{dB}$ of noise gain. $\checkmark$

*Sanity.* This is the arithmetic behind the standard advice that **the control loop period should be less than a tenth of the plant's dominant time constant**. Here the plant's lag at the crossover is $74.5^{\circ}$, corresponding to a time constant of $1 / \tan 74.5^{\circ} = 0.28\ \mathrm{s}$, and the delay of $0.1\ \mathrm{s}$ is a third of it — three times too much. The alternative that avoids the whole trade is to remove the delay's **cause**: an analogue tachogenerator or a resolver-to-digital converter with a short aperture replaces the encoder's filter entirely, and a field-oriented current loop at $20\ \mathrm{kHz}$ contributes a third of a sampling period rather than a filter's ten milliseconds. Where the delay cannot be removed — a conveyor, a web line, a remote manipulator — the honest answer is a Smith predictor or a model-based controller, and not a lead.
:::
:::

::: example Two systems, one magnitude plot {#ex-allpass}
Compare $G_1 = \left( 1 - \mathrm{j} \omega \right) / \left( 1 + \mathrm{j} \omega \right)^{2}$ and $G_2 = 1 / \left( 1 + \mathrm{j} \omega \right)$, and explain why only one of them can be looped fast.
::: solution
The magnitudes are
$$
\left| G_1 \right| = \frac{\sqrt{1 + \omega^{2}}}{1 + \omega^{2}} = \frac{1}{\sqrt{1 + \omega^{2}}} = \left| G_2 \right| ,
$$
identical at every frequency: the same $- 20$ dB/dec plot, the same $0\ \mathrm{dB}$ at $\omega = 0$, the same $- 3\ \mathrm{dB}$ at $\omega = 1$. The phases are
$$
\angle G_1 = - \arctan \omega - 2 \arctan \omega = - 3 \arctan \omega,
\qquad
\angle G_2 = - \arctan \omega,
$$
so $G_1$ carries three times the lag, and the extra $- 2 \arctan \omega$ is exactly the right-half-plane zero's signature.
**Crossover with unity gain.** $G_2$ crosses at $\omega = 1$ with $\varphi_m = 180 - 45 = 135^{\circ}$; $G_1$ crosses at $\omega = 1$ with $\varphi_m = 180 - 135 = 45^{\circ}$.
**With gain $K$.** $G_2$ stays stable for every $K$; $G_1$ reaches $\varphi_m = 0$ when $3 \arctan \omega = 180^{\circ}$, that is at $\omega = \tan 60^{\circ} = 1.73$, where $\left| G_1 \right| = 0.46$, so it destabilises at $K = 2.00$.

*Sanity.* A magnitude plot alone would have called these two plants the same machine, and the difference between a loop that can be pushed to any bandwidth and one that oscillates above a gain of two is entirely in the phase. The physical origin of a right-half-plane zero is always a **path that arrives late and with the wrong sign** — in a buck converter the output capacitor's equivalent series resistance feeds the switching ripple straight to the output while the inductor's lag delays the control path; in a distillation column pushing the reflux increases the light fraction at the top **before** it increases it at the bottom; in an aircraft the fuselage bending mode couples an accelerometer ahead of the node against the control surface behind it. In every case the response initially goes the wrong way, and the designer's job is to accept a crossover below a third of the zero's frequency and stop pretending otherwise.
:::
:::

::: example Measuring margins on the running plant {#ex-plant-test}
A loop is running and cannot be stopped. Estimate its phase margin from a disturbance test.
::: solution
Inject a small step or a swept sine into the setpoint and record the closed-loop response. Three readings are available:
**1. The closed-loop peak.** The sensitivity of the loop to reference noise is $\left| T \right| = \left| L / \left( 1 + L \right) \right|$. If the closed-loop magnitude peaks at $M_r$ and the peak is sharp, treat the loop as second order, read the damping ratio from
$$
M_r = \frac{1}{2 \zeta \sqrt{1 - \zeta^{2}}} ,
$$
and convert with $\varphi_m \approx 100 \zeta$. A peak of $M_r = 1.4$ gives $\zeta = 0.39$ and $\varphi_m \approx 39^{\circ}$; a peak of $1.2$ gives $\zeta = 0.60$ and $60^{\circ}$.
**2. The ringing frequency.** The damped oscillation after a step rings at $\omega_d \approx \omega_{gc}$, so counting the period of the ringing gives the crossover frequency, and the **decay** of the ringing gives the phase margin through the damping ratio: two successive peaks in the ratio $r$ give $\zeta = - \ln r / \sqrt{4 \pi^{2} + \ln^{2} r}$ and $\varphi_m \approx 100 \zeta$ degrees.
**3. The gain-swap test.** Where the loop is allowed to be opened, break it, inject a swept sine and record $L$ directly — the only method that gives the true margins rather than their closed-loop shadows.

*Check.* A loop whose step response rings at a $1.2\ \mathrm{s}$ period with successive peaks in the ratio $0.4$ gives $\ln 0.4 = - 0.916$ and
$$
\zeta = \frac{0.916}{\sqrt{4 \pi^{2} + 0.916^{2}}} = \frac{0.916}{6.35} = 0.145,
\qquad \varphi_m \approx 14.5^{\circ} .
$$
$\checkmark$

*Sanity.* The two-peak method is crude — it reads the damping of the **dominant** pair and is blind to a second pair that is closer to the axis but weakly excited, and to a non-minimum-phase zero that adds overshoot without adding ringing. It is nonetheless the only method available on a running plant, and the ratio of two peaks is far more robust to noise than the ratio of a peak to the final value, because the noise averages out of a ratio taken a period apart. The professional habit is to record the ratio over three or four cycles and take the slope of the logarithmic envelope rather than a single ratio, which is the same trick the free-vibration lesson uses for logarithmic decrement and for the same reason.
:::
:::

::: example Design {#ex-design-oven}
A reflow oven zone has been identified from a step test as $G = 0.8 \, \mathrm{e}^{- 12 s} / \left( 45 s + 1 \right)$ with the earlier FOPDT parameters. The specification is no more than five per cent overshoot to a setpoint change, a disturbance rejection that recovers within four minutes, and tolerance of a further $20\ \mathrm{s}$ of transport delay from a change in conveyor speed. Design the controller.
::: solution
**Structure.** A first-order plant with delay cannot be improved by derivative action — the delay already dominates the phase — so a PI is the right structure, with the integral time on the plant's own lag.
**Choose the crossover from the phase budget.** The phase is
$$
\angle L = - \arctan \frac{1}{\omega T_i} - \arctan \left( 45 \omega \right) - 12 \omega \times 57.3^{\circ} .
$$
Solving for a $70^{\circ}$ margin with $T_i = 45\ \mathrm{s}$ gives $\omega_{gc} = 0.030\ \mathrm{rad / s}$, at which the three contributions are $- 5.3^{\circ}$, $- 53.1^{\circ}$ and $- 20.6^{\circ}$.
**Gain from the magnitude.**
$$
\left| G \right|_{0.030} = \frac{0.8}{\sqrt{1 + 1.35^{2}}} = 0.476,
\qquad
\left| C \right| = K_c \sqrt{1 + \left( \frac{1}{\omega T_i} \right)^{2}} = 1.244 K_c ,
$$
so $K_c = 1 / \left( 0.476 \times 1.244 \right) = 1.69$.
**Verify.**
$$
\varphi_m = 69.4^{\circ}, \quad M_s = 1.38, \quad
\theta_m = \frac{1.211}{0.030} = 40.4\ \mathrm{s}, \quad
K_v = \frac{K_c K}{T_i} = 0.030\ \mathrm{s^{- 1}} .
$$
**Check the specification.** Five per cent overshoot needs $\varphi_m \ge 55^{\circ}$ — met with $69^{\circ}$. The settling time is $4 / \left( 0.030 \right) \approx 130\ \mathrm{s}$ and the disturbance recovery, set by the integral action's zero at $0.022\ \mathrm{rad / s}$, is about $180\ \mathrm{s}$ — inside four minutes. The delay margin of $40\ \mathrm{s}$ against the plant's own $12\ \mathrm{s}$ leaves $28\ \mathrm{s}$ of spare transport delay against the $20\ \mathrm{s}$ required. The ramp error at a $1\ {}^{\circ}\mathrm{C} / \mathrm{min}$ profile is $\left( 1 / 60 \right) / 0.030 = 0.56\ {}^{\circ}\mathrm{C}$.

*Design comment.* The whole design is a negotiation with twelve seconds of delay, and the numbers say what the arguments hide. The crossover of $0.030\ \mathrm{rad / s}$ corresponds to a period of $210\ \mathrm{s}$, which is four and a half times the plant's time constant: the loop is **slower than the process it controls**, and no amount of cleverness changes that while the delay stays. If the profile's ramp error of $0.56\ {}^{\circ}\mathrm{C}$ is too much, the fix is not more gain — the delay margin is the binding constraint — but **feedforward** of the setpoint ramp, which costs nothing in stability because it is outside the loop, and which is the standard answer for a profiled thermal process. The second thing the arithmetic does not show is that $K$ and $\tau$ of an oven vary with load: a zone carrying a full board of product has perhaps twice the gain and three times the time constant, which moves the crossover but barely touches the phase margin, because the plant's phase is dominated by the delay, and a delay is the one plant parameter that does not depend on what is being heated. That is why thermal loops with a dominant delay are among the most robust loops in process industry, and among the slowest.
:::
:::

::: history
The frequency response of networks was the native language of the **Bell System**, and the Bode plot is a document of that institution rather than of mathematics: **Hendrik Bode**'s 1940 paper *"Relation between phase and amplitude of minimum-phase transfer functions"* proved the integral relation of the second definition in a form an engineer could integrate graphically, and his 1945 book collected the design rules — the slope-phase relation, the four-decade rule, the sensitivity integral — into the handbook that trained a generation of control engineers who never learned to solve a differential equation. **Nyquist**'s 1932 paper had supplied the plot that bears his name, and **Harry Black**'s negative-feedback amplifier of 1927 supplied the reason the whole subject existed: an amplifier whose gain was set by passive feedback pairs was stable only if nobody had thought about phase, and the first feedback amplifiers oscillated. **Bode**'s own account of the period is a study in the difference between a mathematical result and an engineering one — the phase-magnitude relation had been proved by **Biezbetkowitsch** in 1926 and by **Ladislaus Bortkiewicz**'s cousin nobody, and it was Bode's graphical evaluation of the integral that made it a design tool. The **lead-lag** nomenclature is American practice of the same years; the **modulus margin** and its invariance are due to **Zames**'s 1966 paper on stability margins, which first made the question "which margin is the right one?" precise, and the sensitivity-peak design target to the robust-control work of **Doyle** and **Stein** in 1981.
:::

::: quiz
Two loops have identical magnitude Bode plots. Loop A is minimum phase and loop B contains a pure delay. Which has the larger phase margin?
- [x] Loop A, always, and the deficit at any frequency is exactly $\omega \theta$
- [ ] Loop B, because the delay leaves the magnitude untouched
- [ ] Both are equal, since the magnitude fixes the margin
- [ ] Neither can be compared without the closed-loop response
::: solution
The magnitude plot fixes the phase only for minimum-phase systems, and a delay is the canonical violation: it adds no magnitude anywhere and $- \omega \theta$ of phase everywhere. Loop A therefore has the larger phase margin at every crossover frequency, and the difference is $\omega_{gc} \theta$ in radians — which is why the delay margin $\theta_m = \varphi_m / \omega_{gc}$ is the number to quote when a computer or a transport lag is about to be inserted into an existing loop.
:::
:::

## Where this leads

The crossover quantities read here are the same quantities defined abstractly in [[control-systems/feedback-stability]], the delay margin decides the sampling period of [[control-systems/digital-control]], the proportional-integral settings of Example 7 are derived structurally in [[control-systems/pid-control]], and the non-minimum-phase zero of the buck converter and the distillation column is the subject of the last lesson's design rules.

::: summary
- A Bode plot is built from four template factors added in decibels, and the local slope predicts the phase at 4.5 degrees per decibel per decade.
- For minimum-phase systems the magnitude determines the phase, so crossover frequency and slope fix the phase margin; delays and right-half-plane zeros break the rule and cost phase that cannot be recovered.
- The four crossover numbers are the gain and phase crossovers, the two margins they define, and the modulus margin, of which only the last is representation-independent.
- A lead buys at most the phase whose sine is the ratio $(1-\alpha)/(1+\alpha)$, and pays for it in high-frequency gain at the same frequency; a lag buys low-frequency gain and pays in a slow tail.
- A delay is invisible on the magnitude plot and costs $\omega \theta$ of phase, which converts directly into a delay margin $\varphi_m / \omega_{gc}$ — the number that decides whether a computer can close the loop.
- On a running plant the phase margin can be read from the decay of the ringing after a step, at the price of assuming that the ringing is the dominant mode.
:::

## Exercises

::: exercise Slopes {level=1 check="-135"}
A minimum-phase plant has a magnitude slope of $- 30\ \mathrm{dB}$ per decade at a frequency. What phase does the slope relation predict there, in degrees?
::: solution
$4.5 \times \left( - 30 \right) = - 135^{\circ}$.
:::
:::

::: exercise Decibels {level=1 check="20"}
A loop gain of $0.1$ expressed in decibels is $- 20\ \mathrm{dB}$. What is the magnitude at $- 6\ \mathrm{dB}$?
::: solution
$10^{- 6 / 20} = 0.501$, so about one half.
:::
:::

::: exercise Delay phase {level=1 check="57.3"}
How many degrees of phase does a $1\ \mathrm{ms}$ delay contribute at $100\ \mathrm{rad / s}$?
::: solution
$\omega \theta = 0.1\ \mathrm{rad} = 57.3^{\circ}$.
:::
:::

::: exercise Integrator {level=1 check="-90"}
What phase does a pure integrator contribute at any frequency?
::: solution
$- 90^{\circ}$, flat.
:::
:::

::: exercise Asymptotes {level=2}
Sketch the magnitude asymptotes of $200 \left( s + 2 \right) / \left[ s^{2} \left( s + 20 \right) \right]$ and find the crossover frequency.
::: solution
A double integrator at $- 40$ dB/dec, a zero at $2$ bringing it to $- 20$, a pole at $20$ bringing it back to $- 40$. At $\omega = 1$ the double integrator gives $20 \log 200 / 1 = 46$ dB; at $\omega = 2$ it is $46 - 40 \log 2 = 34$ dB; the $- 20$ line from there reaches $0$ dB after $34 / 20 = 1.7$ decades... which exceeds the pole at $20$, so the crossover lies on the final $- 40$ line. Evaluating exactly, $\left| L \right| = 200 \sqrt{1 + \omega^{2} / 4} / \left[ \omega^{2} \sqrt{1 + \omega^{2} / 400} \right] = 1$ at $\omega = 19.4\ \mathrm{rad / s}$.
*Sanity.* The asymptote estimate of "one and a half decades past two" is $63\ \mathrm{rad / s}$ against an exact $19.4$, a factor of three out — the usual error when the crossover falls **at** a break frequency rather than well past it, and the reason the exact magnitude must be evaluated at the answer.
:::
:::

::: exercise Phase margin {level=2}
For $L = 4 / \left[ s \left( s + 1 \right) \right]$, find the crossover frequency and phase margin.
::: solution
$\omega \sqrt{1 + \omega^{2}} = 4$ gives $\omega = 1.88$; then $\varphi_m = 180 - 90 - \arctan 1.88 = 28.0^{\circ}$.
*Sanity.* A phase margin under $30^{\circ}$ means a damping ratio near $0.25$ and a forty-five per cent overshoot, which is the classic signature of a loop tuned for speed alone. The velocity constant is $K_v = 4$, and the only ways to improve the transient without losing it are a lead, rate feedback or a cascade current loop — all three of which add phase at the crossover rather than merely removing gain.
:::
:::

::: exercise Lead {level=2}
What high-frequency gain factor does a lead network pay for $60^{\circ}$ of phase, and what is $\alpha$?
::: solution
$\sin 60^{\circ} = 0.866 = \left( 1 - \alpha \right) / \left( 1 + \alpha \right)$ gives $\alpha = 0.0718$ and $1 / \sqrt{\alpha} = 3.73$, that is $11.4\ \mathrm{dB}$.
*Sanity.* Eleven decibels of noise gain at the frequencies where the noise lives, combined with a crossover pushed to a higher frequency where the plant has more lag, is why $60^{\circ}$ is the practical ceiling for one lead and why two leads in cascade — which is a lead-lag in disguise — are used above that.
:::
:::

::: exercise Delay margin {level=2}
A loop has a phase margin of $50^{\circ}$ at a crossover of $5\ \mathrm{rad / s}$. How much extra delay can it absorb, and what sampling period is tolerable if the delay is one and a half sampling periods?
::: solution
$\theta_m = \left( 50 \pi / 180 \right) / 5 = 0.175\ \mathrm{s}$. With a delay of $1.5 T_s$, that gives $T_s \le 0.117\ \mathrm{s}$, so a $100\ \mathrm{ms}$ sample — and a designer who wants a factor of five in margin needs $23\ \mathrm{ms}$.
*Sanity.* The factor-of-five rule is the industry habit, and it exists because the delay is never only the sampling: an anti-alias filter, a communication stack and an actuator's own response each add their share, and a loop that is right at the arithmetic limit fails on the day a firmware update lengthens one of them.
:::
:::

::: exercise Derivation {level=3}
For a lead network with $\alpha = 0.1$, evaluate the phase at each of the two break frequencies and at the geometric mean, and confirm the symmetry the maximum-phase proof requires.
::: solution
At $\omega = 1 / T$ the phase is $45^{\circ} - \arctan \alpha = 45^{\circ} - 5.7^{\circ} = 39.3^{\circ}$, and at $\omega = 1 / \left( \alpha T \right)$ it is $\arctan \left( 1 / \alpha \right) - 45^{\circ} = 84.3^{\circ} - 45^{\circ} = 39.3^{\circ}$ — equal, as the symmetry about the geometric mean requires, since the two breaks are at $\omega_{\max} \sqrt{\alpha}$ and $\omega_{\max} / \sqrt{\alpha}$ and the phase is an odd function of $\ln \left( \omega / \omega_{\max} \right)$. The maximum is
$$
\arcsin \frac{1 - 0.1}{1 + 0.1} = 54.9^{\circ}
\quad \text{at} \quad
\omega = \frac{1}{T \sqrt{0.1}} = \frac{3.16}{T} .
$$
*Sanity.* The maximum exceeds the value at either break frequency by fifteen and a half degrees, so a designer who places the zero at the crossover and the pole "somewhere above" gets two thirds of the phase the network can supply — and, worse, places the crossover at the **smaller** of the two break frequencies, where the network's gain is only $1 / \sqrt{1 + \alpha^{2}} \ldots $ of the way to its final value. The whole of lead design is the placement, and the placement rule is one line: put the **geometric mean** of the two breaks at the crossover.
:::
:::

::: exercise Design {level=3}
A level loop has $G = 2 / \left[ \left( 120 s + 1 \right)\left( 20 s + 1 \right) \right]$ and a valve with $0.5\ \mathrm{m^{3} / s}$ per unit of controller output. The specification is a phase margin of $65^{\circ}$ and a steady offset to a $0.2\ \mathrm{m^{3} / s}$ load change of under $2\ \%$ of the range, whose span is $5\ \mathrm{m}$. Design a PI and check the delay margin.
::: solution
**Crossover from the phase budget.** With $T_i = 120\ \mathrm{s}$,
$$
- \arctan \frac{1}{\omega T_i} - \arctan \left( 120 \omega \right) - \arctan \left( 20 \omega \right) = - 115^{\circ}
$$
gives $\omega_{gc} = 0.0233\ \mathrm{rad / s}$, whose contributions are $- 19.7^{\circ}$, $- 70.2^{\circ}$ and $- 25.1^{\circ}$.
**Gain.** $\left| G \right| = 2 / \left( 2.95 \times 1.10 \right) = 0.610$, and $\left| C \right| = K_c \sqrt{1 + 0.362^{2}} = 1.064 K_c$, so
$$
K_c = \frac{1}{0.610 \times 1.064} = 1.54 .
$$
**Offset.** $K_p = K_c K = 3.1$; a proportional-only loop would leave $0.2 \times 2 / \left( 1 + 3.1 \right) = 0.098\ \mathrm{m}$, which is $1.96\ \%$ of the $5\ \mathrm{m}$ span — just inside the specification even before the integral acts. The integral removes the offset entirely, with the transient peaking at $0.44\ \mathrm{m}$ after $81\ \mathrm{s}$ and returning within two per cent after $550\ \mathrm{s}$.
**Delay margin.** $\theta_m = \left( 65 \pi / 180 \right) / 0.0233 = 49\ \mathrm{s}$, and $M_s = 1.28$.

*Sanity.* A forty-nine-second delay margin is comfortable, and it is the reason level loops are among the easiest to tune — but the margin is spent on things the specification does not mention: a pump's transport delay along a long header, a valve positioner's dead time, or the digital controller's own scan. A level loop closed on a PLC with a $2\ \mathrm{s}$ scan and a $5\ \mathrm{s}$ positioner has used under fifteen per cent of its budget, while the same loop on a distillation column with a forty-metre downcomer has used most of it, which is why column control is a slow art and tank control is not. The peak of $0.44\ \mathrm{m}$ is the number to quote back to the process engineer, because it is the peak that decides whether the tank overflows, and it is four times the steady offset that the specification was written against.
:::
:::
