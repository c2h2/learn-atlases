The root locus answers the question "where do the poles go?"; the Bode plot answers the question an engineer in the field can actually ask, which is "how much more gain can I take, and how much delay can this loop tolerate?" The two are the same information repacked, and the repacking is what makes frequency response the working language of control. A measured frequency-response trace contains the plant, the actuator, the sensor, the wiring capacitance and the sampling delay in one curve, and it can be obtained without writing a differential equation, which is why a frequency-response analyser is standard commissioning equipment wherever servo and process loops are tuned.

The method rests on a single remarkable fact about **minimum-phase** systems: the magnitude curve determines the phase curve. Once the gain has been drawn, the phase is not additional information but a transform of it, and the whole design space collapses to the shape of one curve. The exceptions — an integrator, a delay, a right-half-plane zero, a resonance too narrow for the asymptotes — are exactly the things that go wrong in practice, and knowing them as **departures from the rule** is the fastest diagnostic in the field: a phase that falls faster than the slope predicts is a delay or an unmodelled resonance, and a magnitude that is flat where the phase is falling is an all-pass.

::: warning The straight-line plot is a sketch, and the sketch lies in three specific places
Asymptotic Bode construction adds decibels and degrees factor by factor, and that is exact only in the limit. Three failures are systematic and each has a size. **Peaking is invisible:** a complex pole pair with a damping ratio of $0.2$ stands a factor of $1 / \left( 2 \zeta \right) = 2.5$, or $8\ \mathrm{dB}$, above its asymptote at its own natural frequency, so a mechanical resonance whose asymptote sits a few decibels below $0\ \mathrm{dB}$ can in fact poke through it and create a second crossover that the sketch does not show. **The phase of a resonance is compressed:** a lightly damped pair swings through almost its whole $- 180^{\circ}$ in a narrow band — with $\zeta = 0.2$ the lag is $- 15^{\circ}$ at $\omega_n / 2$ and $- 165^{\circ}$ at $2 \omega_n$ — so the straight-line phase, which spreads the change over two decades, is wrong by tens of degrees anywhere within a factor of three of $\omega_n$. **And the plot is of the loop gain with the loop open**, which is exactly the condition under which a plant with an unstable mode, a saturating actuator or a conditional stability region behaves nothing like the loop-closed reality. The professional habit is to draw the asymptotes to find the crossover in thirty seconds and then compute the exact magnitude and phase at that one frequency before believing any of it.
:::

## Reading the plot

::: definition The three template factors and the arithmetic of decibels {#def-bode}
Every Bode plot is built from a handful of template factors, added in decibels:

| Factor | Magnitude | Phase | Slope |
|---|---|---|---|
| Gain $K$ | $20 \log_{10} K$ dB, flat | $0^{\circ}$ | $0$ dB/dec |
| Integrator $1 / \left( \mathrm{j} \omega \right)$ | $- 20 \log_{10} \omega$ | $- 90^{\circ}$ flat | $- 20$ dB/dec |
| Pole $1 / \left( 1 + \mathrm{j} \omega / \omega_b \right)$ | $0$ then $- 20$ dB/dec | $0 \rightarrow - 90^{\circ}$ | $- 20$ dB/dec after $\omega_b$ |
| Zero $1 + \mathrm{j} \omega / \omega_b$ | $0$ then $+ 20$ dB/dec | $0 \rightarrow + 90^{\circ}$ | $+ 20$ dB/dec after $\omega_b$ |
| Pole pair $\omega_n^{2} / \left( s^{2} + 2 \zeta \omega_n s + \omega_n^{2} \right)$ | $0$ then $- 40$ dB/dec | $0 \rightarrow - 180^{\circ}$ | $- 40$ dB/dec, peak $1 / \left( 2 \zeta \right)$ |

The useful arithmetic: $20\ \mathrm{dB}$ is a factor of ten, $6\ \mathrm{dB}$ is a factor of two, $3\ \mathrm{dB}$ is $\sqrt{2}$, and $1\ \mathrm{dB}$ is $1.12$. A pole contributes half its total phase, $- 45^{\circ}$, at its break frequency, and its phase changes at about $- 45^{\circ}$ per decade between a tenth of and ten times the break frequency; the phase of a pole pair passes through $- 90^{\circ}$ exactly at $\omega_n$ regardless of damping.
:::

::: proof Slope predicts phase {#proof-slope-phase}
For a minimum-phase transfer function the phase at a frequency is a weighted average of the **logarithmic slope** of the magnitude at neighbouring frequencies. Where the slope is constant over several decades the average collapses to the local value, and
$$
\varphi \approx \frac{\pi}{2} \frac{\mathrm{d} \ln \left| G \right|}{\mathrm{d} \ln \omega} \ \text{radians}
\qquad\Longleftrightarrow\qquad
\varphi \left[ ^{\circ} \right] \approx 4.5 \times \left( \text{slope in dB per decade} \right) .
$$
**Check on the templates.** A single pole at high frequency has a slope of $- 20$ and a phase of $- 90^{\circ}$: $4.5 \times \left( - 20 \right) = - 90$ $\checkmark$. A pole pair: $- 180$ $\checkmark$. A pure integrator, slope $- 20$ and phase $- 90^{\circ}$ flat $\checkmark$. At a single pole's own break frequency the local slope is $- 10$ and the formula gives $- 45^{\circ}$, which is the exact value — the relation is not merely asymptotic there. $\checkmark$
**Derivation for a wide-band power law.** If $\left| G \right| = A \omega^{n}$ over a band, then $G \approx A \left( \mathrm{j} \omega \right)^{n}$ inside that band by analytic continuation, and $\varphi = n \pi / 2$ exactly. The general case follows because the exact relation, Bode's gain-phase integral, weights the slope at $\omega^{\prime} = \omega u$ by $\left( 2 / \pi^{2} \right) \ln \coth \left( \left| \ln u \right| / 2 \right)$ per unit of $\ln u$, a kernel of unit area with $88\ \%$ of its weight within a factor of seven of $\omega$ — which is why the local slope works and why it fails when the magnitude changes abruptly. $\checkmark$

*Note.* The relation is the reason a Bode magnitude plot can be **read** rather than computed, and the reason the phrase "twenty degrees per decade of slope" is worth memorising. It is also the reason the three exceptions matter so much. A pure delay has a flat magnitude and a phase of $- \omega \theta$, so it appears as a phase that is far below what the slope predicts, and the deficit in radians divided by the frequency in radians per second **is** the delay — one of the most useful field measurements in control. A right-half-plane zero has the same magnitude as a left-half-plane one and $- 2 \arctan \left( \omega / z \right)$ more phase, so it too shows as a phase deficit, but one that **saturates** at $- 180^{\circ}$ instead of growing without limit, which distinguishes it from a delay. And an integrator contributes slope without contributing any change of phase, so a plot whose slope is $- 20$ dB/dec over three decades with a phase flat at $- 90^{\circ}$ is a pure integrator and not a very slow pole.
:::

::: definition Minimum phase and the gain-phase integral {#def-minphase}
A transfer function is **minimum phase** when it has no zeros and no poles in the closed right half-plane other than poles at the origin. For such functions, with $M = \ln \left| G \left( \mathrm{j} \omega \right) \right|$,
$$
\varphi \left( \omega \right) = - \frac{2 \omega}{\pi} \int_0^{\infty} \frac{M \left( \omega^{\prime} \right) - M \left( \omega \right)}{\omega^{\prime 2} - \omega^{2}} \mathrm{d} \omega^{\prime} .
$$
Two design consequences. First, **the magnitude plot is the phase plot**: a designer who fixes the magnitude's crossover frequency and slope has fixed the phase margin, and cannot have one without the other. Second, among all transfer functions with a given magnitude, the minimum-phase one has the **smallest** phase lag — hence the name — so every non-minimum-phase element costs phase that no amount of redesign recovers.
:::

## Crossover quantities

::: definition The crossover frequencies and the margins {#def-crossover}
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
The modulus margin is the shortest distance from the critical point $\left( - 1 , 0 \right)$ to the Nyquist curve, taken over **all** frequencies; the phase and gain margins each look at one frequency only, so a Nyquist curve can pass close to the critical point between them while both look comfortable, and a loop with two crossovers has several of each. The delay margin is the one a designer must quote whenever the loop contains a computer, a network or a transport lag, because it is the number that says whether the code's sampling and the plant's transport will fit together.
:::

::: widget plot
f: asin((1-x)/(1+x))*180/pi
x: 0.02, 1
y: 0, 90
labels: phi_max / deg
caption: The maximum phase a lead network can supply, against its pole-to-zero ratio alpha. The curve is flat near alpha of one, which is why a lead is a poor way to buy a large phase boost, and rises only slowly below alpha of 0.2, where the network's gain at its peak-phase frequency, 1 over root alpha, is already above 2.2 and its high-frequency gain 1 over alpha above 5, amplifying sensor noise. The 47 degrees of the worked design corresponds to alpha of 0.155.
:::

::: example A velocity servo {#ex-servo}
Draw the Bode plot of $L = 7.8 / \left[ s \left( 0.1 s + 1 \right)\left( 0.02 s + 1 \right) \right]$ and read off the four crossover quantities.
::: solution
**Asymptotes.** The integrator's $- 20$ dB/dec line passes through $20 \log_{10} 7.8 = 17.8$ dB at $\omega = 1$. The pole at $10\ \mathrm{rad / s}$ bends the slope to $- 40$, and the pole at $50$ to $- 60$.
**Crossover.** The integrator's $- 20$ dB/dec asymptote reaches $0$ dB at $\omega = 7.8$, just below the first break, where the true magnitude is already about $1.5\ \mathrm{dB}$ below the asymptote; solving exactly gives $\omega_{gc} = 6.49\ \mathrm{rad / s}$, where $7.8 / \left( 6.49 \times 1.193 \times 1.008 \right) = 1.00$.
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
**Damping.** The rule of thumb $\zeta \approx 0.01 \varphi_m$ gives $0.50$ and $M_p \approx 16\ \%$. The exact closed-loop poles are $- 4.10 \pm 7.65\ \mathrm{j}$ (and $- 51.8$), so $\zeta = 0.47$, $\omega_n = 8.68\ \mathrm{rad / s}$, an overshoot of $18\ \%$ and a $2\ \%$ settling time of about $4 / 4.10 = 0.98\ \mathrm{s}$.

*Check.* The gain margin of $17.7\ \mathrm{dB}$ is a factor of $7.7$ while the gain could be raised only by a factor of about $2.1$ before the phase margin fell below $30^{\circ}$ — the gain margin is the **looser** of the two constraints, which is the usual situation for a loop whose phase falls steeply near the crossover. $\checkmark$

*Sanity.* The velocity constant is $K_v = 7.8\ \mathrm{s^{- 1}}$, so a $100\ \mathrm{mm / s}$ ramp command is followed with $12.8\ \mathrm{mm}$ of error, and improving tracking means raising the gain, which the $133\ \mathrm{ms}$ of delay margin pays for only if every lag in the loop — encoder filter, current loop, PWM update, scan time — stays inside that budget. A first-order filter with corner $f_c$ behaves at low frequency like a delay of $1 / \left( 2 \pi f_c \right)$: a $100\ \mathrm{Hz}$ filter costs about $1.6\ \mathrm{ms}$ and is negligible, while a $2\ \mathrm{Hz}$ software filter on a slow PLC costs about $80\ \mathrm{ms}$, more than half the margin — which is why a filter's corner frequency is a control decision and not only a signal-conditioning one.
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
\tan \varphi_{\max} = \frac{\left( 1 - \alpha \right) \omega T}{1 + \alpha \omega^{2} T^{2}}
= \frac{\left( 1 - \alpha \right) / \sqrt{\alpha}}{1 + 1}
= \frac{1 - \alpha}{2 \sqrt{\alpha}},
$$
since $\omega T = 1 / \sqrt{\alpha}$ and $\alpha \omega^{2} T^{2} = 1$. The hypotenuse of the triangle with sides $1 - \alpha$ and $2 \sqrt{\alpha}$ is $\sqrt{\left( 1 - \alpha \right)^{2} + 4 \alpha} = 1 + \alpha$, which gives the standard form
$$
\sin \varphi_{\max} = \frac{1 - \alpha}{1 + \alpha},
\qquad
\left| C \left( \mathrm{j} \omega_{\max} \right) \right| = \frac{1}{\sqrt{\alpha}} .
$$
$\checkmark$
**The trade in one line.** The phase a lead can buy and the gain it must therefore add are tied by $\alpha$: $45^{\circ}$ costs a factor of $1 / \alpha = 5.8$ of high-frequency gain, $60^{\circ}$ a factor of $13.9$. Since noise grows with that gain and the crossover moves to a higher frequency where the plant has more phase lag, a single lead beyond about $60^{\circ}$ is never used, and the design rule is to take $\varphi_{\max}$ equal to the required boost plus an allowance of five to ten degrees for the extra plant lag at the shifted crossover. $\checkmark$
:::

::: example Lead design on the plot {#ex-lead-bode}
A velocity loop has $G = 20 / \left[ s \left( s + 1 \right) \right]$, the value of $K_v = 20\ \mathrm{s^{- 1}}$ being fixed by the tracking specification. The phase margin is inadequate; restore it to $55^{\circ}$ with a lead.
::: solution
**Uncompensated.** $\omega_{gc} = 4.4\ \mathrm{rad / s}$ from $\omega \sqrt{1 + \omega^{2}} = 20$, and
$$
\varphi_m = 180^{\circ} - 90^{\circ} - \arctan \left( 4.4 \right) = 12.8^{\circ},
$$
which is a damping ratio of $0.11$ and a seventy per cent overshoot.
**Required boost.** $55 - 12.8 = 42^{\circ}$, plus a $5^{\circ}$ allowance for the extra plant lag at the higher crossover the lead will cause, so $\varphi_{\max} = 47^{\circ}$ and
$$
\alpha = \frac{1 - \sin 47^{\circ}}{1 + \sin 47^{\circ}} = \frac{0.269}{1.731} = 0.155,
\qquad
\frac{1}{\sqrt{\alpha}} = 2.54 .
$$
**Place $\omega_{\max}$ at the new crossover.** The new crossover is where the uncompensated magnitude equals $\sqrt{\alpha} = 0.394$:
$$
\omega \sqrt{1 + \omega^{2}} = 20 / 0.394 = 50.8
\quad\Longrightarrow\quad
\omega_{\max} = 7.09\ \mathrm{rad / s} .
$$
**Break frequencies.**
$$
T = \frac{1}{\omega_{\max} \sqrt{\alpha}} = \frac{1}{7.09 \times 0.394} = 0.358\ \mathrm{s},
\qquad
\frac{1}{T} = 2.79, \quad \frac{1}{\alpha T} = 18.0 ,
$$
so $C = \left( 1 + 0.358 s \right) / \left( 1 + 0.0556 s \right) = 6.45 \left( s + 2.79 \right) / \left( s + 18.0 \right)$, which has unit gain at DC.
**Verify.** At $\omega = 7.09$ the plant contributes $- 90^{\circ} - 82.0^{\circ}$, the lead $+ 68.5^{\circ} - 21.5^{\circ} = + 47.0^{\circ}$, and the loop gain is $0.394 \times 2.54 = 1.00$.
$$
\varphi_m = 180^{\circ} - 172.0^{\circ} + 47.0^{\circ} = 55.0^{\circ},
\qquad
\zeta \approx 0.55, \quad K_v = 20\ \mathrm{s^{- 1}} \text{ unchanged}.
$$
*Sanity.* The crossover has moved from $4.4$ to $7.1\ \mathrm{rad / s}$, so the loop is $60\ \%$ faster. A simulated step response overshoots by about $19\ \%$, more than the $\zeta \approx 0.55$ rule suggests, because the lead's zero at $2.79\ \mathrm{rad / s}$ adds overshoot of its own. The price is noise: the lead's gain is $2.54$ ($8.1\ \mathrm{dB}$) at the crossover and rises to $1 / \alpha = 6.45$ ($16.2\ \mathrm{dB}$) at high frequency, and that is the factor by which sensor noise reaching the actuator grows. It is the reason a real drive often implements the same phase lead as **tachometer (rate) feedback** around the plant, which adds damping without differentiating the noisy position signal.
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
The diagnostic that separates them is the **shape** of the deficit: measure the phase shortfall against the slope-predicted value at two widely separated frequencies. If doubling the frequency has doubled the shortfall it is a delay, and its magnitude in degrees divided by $57.3$ and by the frequency is the delay in seconds. If it has grown less than proportionally and is heading for $180^{\circ}$ it is a non-minimum-phase zero, and its position follows from the frequency at which the deficit reaches $90^{\circ}$, which is $\omega = z$.
:::

::: example Delay eats phase {#ex-delay}
The lead design of [[#ex-lead-bode]] is implemented on a drive whose current loop, PWM update and encoder filter together contribute $100\ \mathrm{ms}$ of delay. What is left?
::: solution
The delay contributes
$$
\Delta \varphi = \omega_{gc} \theta = 7.09 \times 0.100 = 0.709\ \mathrm{rad} = 40.6^{\circ},
$$
leaving $\varphi_m = 55.0 - 40.6 = 14.4^{\circ}$, a damping ratio of roughly $0.15$ and an overshoot near sixty per cent.
**What the designer can do.** The delay margin of the compensated loop is $55.0^{\circ} = 0.960\ \mathrm{rad}$ divided by $7.09$, that is $135\ \mathrm{ms}$, so the loop is still stable with the $100\ \mathrm{ms}$ it was given — but that delay has used three quarters of the margin, and the loop cannot keep both its crossover and an acceptable damping. The options are, in the order a drive engineer will try them: shorten the delay by raising the current-loop bandwidth and the PWM rate, which is free; move the encoder filter's corner up, which costs noise; or lower the crossover to $3.6\ \mathrm{rad / s}$, where the delay costs $21^{\circ}$ and the lead can be re-tuned for $55^{\circ}$ again, at the price of halving the bandwidth and doubling the settling time.

*Check.* At $\omega = 3.6$ the delay costs $3.6 \times 0.1 = 0.36\ \mathrm{rad} = 20.6^{\circ}$, and the plant's own lag is $90 + 74.5 = 164.5^{\circ}$, so the lead must supply $55 - \left( 180 - 164.5 - 20.6 \right) = 60^{\circ}$ — which needs $\alpha = 0.072$ and $1 / \sqrt{\alpha} = 3.73$ ($11.4\ \mathrm{dB}$ at the crossover, against $8.1\ \mathrm{dB}$ before), the practical ceiling for a single lead. $\checkmark$

*Sanity.* The useful way to see the size of the problem is the product $\omega_{gc} \theta$, the delay's phase cost in radians: at $0.71\ \mathrm{rad}$ it is most of a normal phase margin, and a loop designed without counting its delays should keep this product below about $0.2\ \mathrm{rad}$ ($11^{\circ}$). Here that means a total delay under about $30\ \mathrm{ms}$ at a crossover of $7\ \mathrm{rad / s}$. The alternative that avoids the whole trade is to remove the delay's **cause**: a faster encoder interface or a resolver-to-digital converter replaces a slow software filter, and a current loop updated at tens of kilohertz contributes well under a millisecond. Where the delay cannot be removed — a conveyor, a web line, a remote manipulator — the honest answer is a Smith predictor or a model-based controller, and not a lead.
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
**Crossover with gain $K = 1.5$.** Both loops cross where $1.5 / \sqrt{1 + \omega^{2}} = 1$, at $\omega = 1.12$. $G_2$ has $\varphi_m = 180 - 48.2 = 131.8^{\circ}$; $G_1$ has $\varphi_m = 180 - 144.6 = 35.4^{\circ}$.
**With gain $K$ in general.** $G_2$ stays stable for every $K$; $G_1$ reaches $- 180^{\circ}$ when $3 \arctan \omega = 180^{\circ}$, that is at $\omega = \tan 60^{\circ} = 1.73$, where $\left| G_1 \right| = 1 / \sqrt{4} = 0.50$, so it destabilises at $K = 2.00$.

*Sanity.* A magnitude plot alone would have called these two plants the same machine, and the difference between a loop that can be pushed to any bandwidth and one that oscillates above a gain of two is entirely in the phase. The physical origin of a right-half-plane zero is typically **two paths of opposite sign with different speeds** — in a boost converter raising the duty cycle first cuts the current delivered to the output, before the larger inductor current raises it; in a steam-drum boiler more feedwater first collapses steam bubbles and lowers the level ("shrink") before it raises it; in an aircraft the elevator's tail force first pushes the aircraft down before the pitch-up raises it. In every case the response initially goes the wrong way, and the designer's job is to accept a crossover below a third of the zero's frequency and stop pretending otherwise.
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
and convert with $\varphi_m \approx 100 \zeta$. A peak of $M_r = 1.4$ gives $\zeta = 0.39$ and $\varphi_m \approx 39^{\circ}$; a peak of $1.2$ gives $\zeta = 0.47$ and $\varphi_m \approx 47^{\circ}$.
**2. The ringing frequency.** The damped oscillation after a step rings at $\omega_d \approx \omega_{gc}$, so counting the period of the ringing gives the crossover frequency, and the **decay** of the ringing gives the phase margin through the damping ratio: two successive peaks in the ratio $r$ give $\zeta = - \ln r / \sqrt{4 \pi^{2} + \ln^{2} r}$ and $\varphi_m \approx 100 \zeta$ degrees.
**3. The open-loop test.** Where the loop is allowed to be opened, break it, inject a swept sine and record $L$ directly — the only method that gives the true margins rather than their closed-loop shadows.

*Check.* A loop whose step response rings at a $1.2\ \mathrm{s}$ period with successive peaks in the ratio $0.4$ gives $\ln 0.4 = - 0.916$ and
$$
\zeta = \frac{0.916}{\sqrt{4 \pi^{2} + 0.916^{2}}} = \frac{0.916}{6.35} = 0.145,
\qquad \varphi_m \approx 14^{\circ} ,
$$
and the period gives $\omega_d = 2 \pi / 1.2 = 5.2\ \mathrm{rad / s}$ as an estimate of the crossover. $\checkmark$

*Sanity.* The two-peak method is crude — it reads the damping of the **dominant** pair and is blind to a second pair that is closer to the axis but weakly excited, and to a non-minimum-phase zero that adds overshoot without adding ringing. It is nonetheless the only method available on a running plant, and the ratio of two peaks is far more robust to noise than the ratio of a peak to the final value, because the noise averages out of a ratio taken a period apart. The professional habit is to record the ratio over three or four cycles and take the slope of the logarithmic envelope rather than a single ratio, which is the same trick the free-vibration lesson uses for logarithmic decrement and for the same reason.
:::
:::

::: example Design {#ex-design-oven}
A reflow oven zone has been identified from a step test as $G = 0.8 \, \mathrm{e}^{- 12 s} / \left( 45 s + 1 \right)$ (gain in ${}^{\circ}\mathrm{C}$ per per cent of heater power, times in seconds). The specification is no more than five per cent overshoot to a setpoint change, a disturbance rejection that recovers within four minutes, and tolerance of a further $20\ \mathrm{s}$ of transport delay from a change in conveyor speed. Design the controller.
::: solution
**Structure.** A first-order plant with delay gains little from derivative action — the delay already dominates the phase — so a PI is the right structure, with the integral time on the plant's own lag, $T_i = 45\ \mathrm{s}$. The controller's zero then cancels the plant's pole and the loop gain is simply
$$
L = \frac{0.8 K_c}{45 s} \mathrm{e}^{- 12 s} .
$$
**Choose the crossover from the phase budget.** The phase is
$$
\angle L = - \arctan \frac{1}{\omega T_i} - \arctan \left( 45 \omega \right) - 12 \omega \times 57.3^{\circ} = - 90^{\circ} - 12 \omega \times 57.3^{\circ},
$$
because the first two terms add to exactly $90^{\circ}$ when $T_i = 45\ \mathrm{s}$. A $70^{\circ}$ margin leaves $20^{\circ} = 0.349\ \mathrm{rad}$ for the delay, so $\omega_{gc} = 0.349 / 12 = 0.0291\ \mathrm{rad / s}$.
**Gain from the magnitude.**
$$
\left| L \right| = \frac{0.8 K_c}{45 \times 0.0291} = 1
\quad\Longrightarrow\quad
K_c = \frac{45 \times 0.0291}{0.8} = 1.64 .
$$
**Verify.**
$$
\varphi_m = 70.0^{\circ}, \quad g_m = 13.1\ \mathrm{dB}, \quad M_s = 1.37, \quad
\theta_m = \frac{1.222}{0.0291} = 42\ \mathrm{s}, \quad
K_v = \frac{K_c K}{T_i} = 0.0291\ \mathrm{s^{- 1}} .
$$
**Check the specification.** With the pole cancelled the setpoint response is that of an integrator with delay, and a simulation shows no overshoot at all and a $2\ \%$ settling time of about $87\ \mathrm{s}$. A step load disturbance at the heater produces its peak deviation after about $46\ \mathrm{s}$ and is back within five per cent of that peak after about $200\ \mathrm{s}$ — inside four minutes, though slower than the setpoint response because the cancelled $45\ \mathrm{s}$ plant pole still governs the load path. The delay margin $\theta_m$ is the **additional** delay the loop can absorb on top of the plant's own $12\ \mathrm{s}$, so $42\ \mathrm{s}$ comfortably covers the $20\ \mathrm{s}$ required. The ramp error at a $1\ {}^{\circ}\mathrm{C} / \mathrm{min}$ profile is $\left( 1 / 60 \right) / 0.0291 = 0.57\ {}^{\circ}\mathrm{C}$.

*Design comment.* The whole design is a negotiation with twelve seconds of delay, and the numbers say what the arguments hide. The crossover of $0.0291\ \mathrm{rad / s}$ corresponds to a period of $216\ \mathrm{s}$, nearly five times the plant's time constant: the loop is **slower than the process it controls**, and no amount of cleverness changes that while the delay stays. If the profile's ramp error of $0.57\ {}^{\circ}\mathrm{C}$ is too much, the fix is not more gain — the delay margin is the binding constraint — but **feedforward** of the setpoint ramp, which costs nothing in stability because it is outside the loop, and which is the standard answer for a profiled thermal process. The second thing the arithmetic does not show is that $K$ and $\tau$ of an oven vary with load. Doubling the gain alone lowers the phase margin to $50^{\circ}$; tripling the time constant alone gives the same; both together give $48^{\circ}$. That is the reason to design for $70^{\circ}$ in the first place: the generous nominal margin is what is spent when the zone is fully loaded.
:::
:::

::: history
The frequency response of networks was the native language of the **Bell System**, and the Bode plot is a document of that institution. **Harold S. Black**'s negative-feedback amplifier, conceived in 1927 and published in 1934 as *"Stabilized feedback amplifiers"*, supplied the reason the subject existed: feedback made long-distance telephone repeaters precise and linear, but a feedback amplifier with too much loop gain could "sing" — oscillate — and nobody yet had a rule for when. **Harry Nyquist**'s 1932 paper *"Regeneration theory"* supplied the rule, the encirclement criterion and the plot that bears his name. **Hendrik Bode**'s 1940 paper *"Relation between attenuation and phase in feedback amplifier design"* in the *Bell System Technical Journal* gave the gain-phase relation of the second definition in a form an engineer could use graphically, introduced the gain and phase margins, and his 1945 book *Network Analysis and Feedback Amplifier Design* collected the design rules — the asymptotic plot, the slope-phase relation, the sensitivity integral — into the handbook from which classical loop shaping is still taught. The emphasis on the sensitivity peak $M_s$ rather than the two classical margins came with the robust-control work of the 1980s, of which **John Doyle** and **Gunter Stein**'s 1981 paper *"Multivariable feedback design: concepts for a classical/modern synthesis"* is the best-known statement.
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

The crossover quantities read here are the same quantities defined abstractly in [[control-systems/feedback-stability]], the delay margin decides the sampling period of [[control-systems/digital-control]], and the proportional-integral settings of [[#ex-design-oven]] reappear as one of the tunings compared in [[control-systems/pid-control]].

::: summary
- A Bode plot is built from a few template factors added in decibels, and for a minimum-phase system the local slope predicts the phase at 4.5 degrees per dB/decade of slope.
- For minimum-phase systems the magnitude determines the phase, so crossover frequency and slope fix the phase margin; delays and right-half-plane zeros break the rule and cost phase that cannot be recovered.
- The gain and phase crossovers define the gain and phase margins; the modulus margin $1/M_s$ measures the closest approach to the critical point at any frequency, and the delay margin $\varphi_m/\omega_{gc}$ is the extra delay the loop can absorb.
- A lead buys at most the phase whose sine is $(1-\alpha)/(1+\alpha)$, at a gain of $1/\sqrt{\alpha}$ at that frequency and $1/\alpha$ at high frequency, which is the noise it costs.
- A delay is invisible on the magnitude plot and costs $\omega \theta$ of phase, which converts directly into a delay margin $\varphi_m / \omega_{gc}$ — the number that decides whether a computer can close the loop.
- On a running plant the phase margin can be read from the decay of the ringing after a step, at the price of assuming that the ringing is the dominant mode.
:::

## Exercises

::: exercise Slopes {level=1 check="-135"}
A minimum-phase plant has a magnitude slope of $- 30\ \mathrm{dB}$ per decade over a wide band around a frequency. What phase does the slope relation predict there, in degrees?
::: solution
$4.5 \times \left( - 30 \right) = - 135^{\circ}$.
:::
:::

::: exercise Decibels {level=1 check="0.5"}
A loop gain of $0.1$ expressed in decibels is $- 20\ \mathrm{dB}$. What magnitude ratio corresponds to $- 6\ \mathrm{dB}$? (Enter the ratio to two significant figures.)
::: solution
$10^{- 6 / 20} = 0.501$, so about one half.
:::
:::

::: exercise Delay phase {level=1 check="57.3"}
How many degrees of phase lag does a $10\ \mathrm{ms}$ delay contribute at $100\ \mathrm{rad / s}$? (Enter the lag in degrees.)
::: solution
$\omega \theta = 100 \times 0.01 = 1\ \mathrm{rad} = 57.3^{\circ}$.
:::
:::

::: exercise Integrator {level=1 check="-90"}
What phase does a pure integrator contribute at any frequency? (Enter the phase in degrees.)
::: solution
$- 90^{\circ}$, flat.
:::
:::

::: exercise Asymptotes {level=2 check="9.28"}
Sketch the magnitude asymptotes of $200 \left( s + 2 \right) / \left[ s^{2} \left( s + 20 \right) \right]$ and find the crossover frequency. (Enter the exact crossover in rad/s.)
::: solution
A double integrator at $- 40$ dB/dec, a zero at $2$ bringing it to $- 20$, a pole at $20$ bringing it back to $- 40$. At low frequency $L \approx 200 \times 2 / \left( 20 s^{2} \right) = 20 / s^{2}$, which is $20 \log_{10} 20 = 26$ dB at $\omega = 1$ and $26 - 40 \log_{10} 2 = 14$ dB at $\omega = 2$. From there the $- 20$ dB/dec asymptote $10 / \omega$ reaches $0$ dB at $\omega = 10$, before the pole at $20$, so the asymptotic crossover is $10\ \mathrm{rad / s}$. Evaluating exactly, $\left| L \right| = 20 \sqrt{1 + \omega^{2} / 4} / \left[ \omega^{2} \sqrt{1 + \omega^{2} / 400} \right] = 1$ at $\omega = 9.28\ \mathrm{rad / s}$, with a phase margin of $52.9^{\circ}$.
*Sanity.* The asymptotic estimate of $10\ \mathrm{rad / s}$ is within $8\ \%$ of the exact $9.28$: the true magnitude at $\omega = 10$ is $0.91$, below the asymptote by $0.8\ \mathrm{dB}$ because the pole at $20$ already pulls it down by $1\ \mathrm{dB}$ while the zero at $2$ lifts it by only $0.2\ \mathrm{dB}$. Evaluating the exact magnitude near the asymptotic answer is always the second step.
:::
:::

::: exercise Phase margin {level=2 check="28"}
For $L = 4 / \left[ s \left( s + 1 \right) \right]$, find the crossover frequency and phase margin. (Enter the phase margin in degrees.)
::: solution
$\omega \sqrt{1 + \omega^{2}} = 4$ gives $\omega = 1.88$; then $\varphi_m = 180 - 90 - \arctan 1.88 = 28.0^{\circ}$.
*Sanity.* The closed loop is $s^{2} + s + 4$, with $\zeta = 0.25$ and a forty-four per cent overshoot, which is the classic signature of a loop tuned for speed alone. The velocity constant is $K_v = 4$, and the only ways to improve the transient without losing it are a lead, rate feedback or a cascade current loop — all three of which add phase at the crossover rather than merely removing gain.
:::
:::

::: exercise Lead {level=2 check="13.9"}
A lead network $\left( 1 + \mathrm{j} \omega T \right) / \left( 1 + \mathrm{j} \omega \alpha T \right)$ is to supply $60^{\circ}$ of maximum phase. Find $\alpha$, the gain at the frequency of maximum phase, and the high-frequency gain factor. (Enter the high-frequency gain factor $1 / \alpha$.)
::: solution
$\sin 60^{\circ} = 0.866 = \left( 1 - \alpha \right) / \left( 1 + \alpha \right)$ gives $\alpha = 0.0718$. The gain at the maximum-phase frequency is $1 / \sqrt{\alpha} = 3.73$ ($11.4\ \mathrm{dB}$) and the high-frequency gain is $1 / \alpha = 13.9$ ($22.9\ \mathrm{dB}$).
*Sanity.* Twenty-three decibels of noise gain at the frequencies where the noise lives, combined with a crossover pushed to a higher frequency where the plant has more lag, is why $60^{\circ}$ is the practical ceiling for one lead and why two leads in cascade — which is a lead-lag in disguise — are used above that.
:::
:::

::: exercise Delay margin {level=2 check="0.175"}
A loop has a phase margin of $50^{\circ}$ at a crossover of $5\ \mathrm{rad / s}$. How much extra delay can it absorb, and what sampling period is tolerable if the delay is one and a half sampling periods? (Enter the delay margin in seconds.)
::: solution
$\theta_m = \left( 50 \pi / 180 \right) / 5 = 0.175\ \mathrm{s}$. With a delay of $1.5 T_s$, that gives $T_s \le 0.116\ \mathrm{s}$, so a $100\ \mathrm{ms}$ sample — and a designer who wants a factor of five in margin needs $23\ \mathrm{ms}$.
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
*Sanity.* The maximum exceeds the value at either break frequency by fifteen and a half degrees, so a designer who places the zero at the crossover and the pole "somewhere above" gets two thirds of the phase the network can supply — and its gain there is $\sqrt{2} / \sqrt{1 + \alpha^{2}} = 1.41$ rather than the $1 / \sqrt{\alpha} = 3.16$ assumed when the crossover was planned, so the crossover also lands somewhere other than intended. The whole of lead design is the placement, and the placement rule is one line: put the **geometric mean** of the two breaks at the crossover.
:::
:::

::: exercise Design {level=3 check="49"}
A level loop has $G = 2 / \left[ \left( 120 s + 1 \right)\left( 20 s + 1 \right) \right]$, in metres of level per unit of controller output, and a valve that passes $0.5\ \mathrm{m^{3} / s}$ per unit of controller output. The specification is a phase margin of $65^{\circ}$ and a steady offset to a $0.2\ \mathrm{m^{3} / s}$ load change of under $2\ \%$ of the level range, whose span is $5\ \mathrm{m}$. Show that proportional control cannot meet the offset specification at this margin, design a PI with $T_i$ equal to the slow time constant, and find the delay margin. (Enter the delay margin in seconds.)
::: solution
**Crossover from the phase budget.** With $T_i = 120\ \mathrm{s}$ the controller's zero cancels the slow lag, and
$$
- \arctan \frac{1}{\omega T_i} - \arctan \left( 120 \omega \right) - \arctan \left( 20 \omega \right)
$$
reduces to $- 90^{\circ} - \arctan \left( 20 \omega \right) = - 115^{\circ}$, so $\omega_{gc} = \tan 25^{\circ} / 20 = 0.0233\ \mathrm{rad / s}$; the three contributions are $- 19.7^{\circ}$, $- 70.3^{\circ}$ and $- 25.0^{\circ}$.
**Gain.** $\left| G \right| = 2 / \left( 2.97 \times 1.10 \right) = 0.610$, and $\left| C \right| = K_c \sqrt{1 + 0.358^{2}} = 1.062 K_c$, so
$$
K_c = \frac{1}{0.610 \times 1.062} = 1.54 .
$$
**Offset.** The load change is equivalent to $0.2 / 0.5 = 0.4$ units of controller output at the plant input. With $K_c K = 1.54 \times 2 = 3.09$, a proportional-only loop would leave $0.4 \times 2 / \left( 1 + 3.09 \right) = 0.196\ \mathrm{m}$, which is $3.9\ \%$ of the $5\ \mathrm{m}$ span — outside the $2\ \%$ ($0.1\ \mathrm{m}$) specification, and raising the gain to fix it would spend the phase margin. The integral removes the offset entirely: a simulation of the PI loop shows the level deviation peaking at $0.18\ \mathrm{m}$ after $81\ \mathrm{s}$ and back inside $0.1\ \mathrm{m}$ after about $160\ \mathrm{s}$.
**Delay margin.** $\theta_m = \left( 65 \pi / 180 \right) / 0.0233 = 49\ \mathrm{s}$, and $M_s = 1.28$.

*Sanity.* A forty-nine-second delay margin is comfortable, and it is the reason level loops are among the easier ones to tune — but the margin is spent on things the specification does not mention: transport delay along a long header, a valve positioner's dead time, or the digital controller's own scan. A level loop closed on a PLC with a $2\ \mathrm{s}$ scan and a $5\ \mathrm{s}$ positioner has used under fifteen per cent of its budget. The transient peak of $0.18\ \mathrm{m}$ is the number to quote back to the process engineer: it is nearly twice the $0.1\ \mathrm{m}$ band the steady-offset specification was written against, and it is the peak, not the offset, that decides whether the tank overflows.
:::
:::
