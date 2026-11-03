Before a microphone signal is digitised, it passes through a circuit that removes everything above about $20\,\mathrm{kHz}$, so that those frequencies cannot alias into the audio band. A guitar amplifier's tone controls boost and cut bands of frequencies. An electrocardiograph removes the $50\,\mathrm{Hz}$ hum picked up from the mains without disturbing the heartbeat. A mobile phone separates the transmitted and received signals, a few tens of megahertz apart, with filters at its antenna. Each of these is a **filter**: a circuit designed to pass some frequencies and reject others.

In [[circuits-2/frequency-response]] we learned to read the transfer function $H(j\omega)$ and its Bode plot. Here we turn the question round: given a desired $\abs{H(j\omega)}$, choose a circuit and its component values. We start from the ideal filter types and the first- and second-order **passive** filters built from $R$, $L$ and $C$, then use the operational amplifiers of [[circuits-1/operational-amplifiers]] to build **active** filters that need no inductors and do not load one another. We meet the Butterworth response and the **Sallen–Key** circuit, which together cover a large share of practical low-order designs, and finish with **magnitude and frequency scaling**, the trick that lets one normalised design serve at any impedance level and any frequency.

## Filter types and specifications

::: definition Ideal filters {#def-ideal-filters}
An **ideal filter** has $\abs{H(j\omega)} = 1$ in its **passband** and $\abs{H(j\omega)} = 0$ in its **stopband**, with an abrupt transition at the **cutoff frequency** (or frequencies). The four basic types are:

- **low-pass**: passes $0 \le \omega < \omega_c$;
- **high-pass**: passes $\omega > \omega_c$;
- **band-pass**: passes $\omega_1 < \omega < \omega_2$;
- **band-stop** (band-reject, or **notch** when narrow): rejects $\omega_1 < \omega < \omega_2$.
:::

An ideal filter cannot be built: a perfectly sharp edge would require an impulse response that starts before its input arrives (this is proved in [[signals-systems]]). Real filters approximate the ideal, and a specification states how closely. A typical low-pass specification gives a **passband edge** $\omega_p$ with a maximum loss $A_p$ (for example $3\,\mathrm{dB}$), a **stopband edge** $\omega_s$ with a minimum attenuation $A_s$ (for example $40\,\mathrm{dB}$), and a **transition band** between them. The narrower the transition band and the greater the attenuation required, the higher the **order** of the filter, that is, the degree of the denominator of $H(s)$, and the more components it needs.

Each real pole contributes a roll-off of $20\,\mathrm{dB/decade}$ by [[circuits-2/frequency-response#thm-first-order]], so an $n$-th order low-pass filter ultimately falls at $20n\,\mathrm{dB/decade}$.

## Passive filters

### First order

The $RC$ divider of [[circuits-2/frequency-response#ex-rc]] with the output across the capacitor is a first-order low-pass filter with $\omega_c = 1/(RC)$. Taking the output across the resistor instead gives

$$
H_{\mathrm{HP}}(j\omega) = \frac{R}{R + 1/(j\omega C)} = \frac{j\omega/\omega_c}{1 + j\omega/\omega_c},
$$

a first-order high-pass filter with the same $\omega_c = 1/(RC)$: $0\,\mathrm{dB}$ above the corner, rising at $+20\,\mathrm{dB/decade}$ below it. With an inductor in place of the capacitor the roles swap: the output across $R$ of a series $RL$ circuit is low-pass with $\omega_c = R/L$, and the output across $L$ is high-pass.

::: example A first-order anti-hum filter {#ex-first-order}
A sensor signal containing frequencies below about $20\,\mathrm{Hz}$ is contaminated by a $50\,\mathrm{Hz}$ hum and by radio-frequency pick-up. Design an $RC$ low-pass filter with $f_c = 1\,\mathrm{kHz}$ using $R = 10\,\mathrm{k\Omega}$, and find the attenuation it gives at $50\,\mathrm{Hz}$ and at $100\,\mathrm{kHz}$. Is it adequate for the hum?
::: solution
$C = 1/(2\pi f_cR) = 1/(2\pi\times1000\times10^4) = 15.9\,\mathrm{nF}$; the nearest standard value is $15\,\mathrm{nF}$ (giving $f_c = 1.06\,\mathrm{kHz}$) or $16\,\mathrm{nF}$ (E24). At $100\,\mathrm{kHz}$, two decades above the corner, the attenuation is $10\log_{10}(1 + 100^2) = 40.0\,\mathrm{dB}$: the radio-frequency pick-up is reduced a hundredfold. At $50\,\mathrm{Hz}$ the loss is only $10\log_{10}(1 + 0.05^2) = 0.01\,\mathrm{dB}$. The hum lies **between** the signal band and the corner, so a low-pass filter with $f_c = 1\,\mathrm{kHz}$ does nothing for it; placing the corner below $50\,\mathrm{Hz}$ would take only $6\,\mathrm{dB}$ per octave off the hum while starting to attenuate the signal. Hum needs a notch, treated below.
:::
:::

### Second order: the series RLC family

A series $RLC$ circuit driven by $\mathbf V_i$ gives four different filters depending on where the output is taken. With $s = j\omega$, $\omega_0 = 1/\sqrt{LC}$ and $\omega_0/Q = R/L$, the common denominator is $D(s) = s^2 + (\omega_0/Q)s + \omega_0^2$.

::: proposition Second-order passive filters {#prop-rlc-filters}
For a series $RLC$ circuit with input voltage $\mathbf V_i$:

$$
\begin{aligned}
\text{across } C:&\quad H_{\mathrm{LP}}(s) = \frac{\omega_0^2}{D(s)}, &\qquad \text{across } L:&\quad H_{\mathrm{HP}}(s) = \frac{s^2}{D(s)},\\
\text{across } R:&\quad H_{\mathrm{BP}}(s) = \frac{(\omega_0/Q)\,s}{D(s)}, &\qquad \text{across } L \text{ and } C:&\quad H_{\mathrm{BS}}(s) = \frac{s^2 + \omega_0^2}{D(s)}.
\end{aligned}
$$ {#eq-rlc-filters}

The band-pass response has unit gain at $\omega_0$ and bandwidth $\omega_0/Q$; the band-stop response has a zero of transmission at $\omega_0$ and the same bandwidth for its rejected band. The low-pass and high-pass responses fall at $40\,\mathrm{dB/decade}$ beyond $\omega_0$ and have the value $Q$ (in magnitude) at $\omega_0$.
:::

::: proof
The current is $\mathbf I = \mathbf V_i/(R + sL + 1/(sC)) = \mathbf V_i\,sC/(s^2LC + sRC + 1)$. Dividing numerator and denominator by $LC$: $\mathbf I = \mathbf V_i\,(s/L)/D(s)$. Multiplying by the impedance across which the output is taken: $1/(sC)$ gives $(1/LC)/D = \omega_0^2/D$; $sL$ gives $s^2/D$; $R$ gives $(R/L)s/D = (\omega_0/Q)s/D$; and $sL + 1/(sC)$ gives $(s^2 + 1/LC)/D$. At $s = j\omega_0$, $D = j\omega_0^2/Q$, so $\abs{H_{\mathrm{BP}}} = 1$, $\abs{H_{\mathrm{BS}}} = 0$ and $\abs{H_{\mathrm{LP}}} = \abs{H_{\mathrm{HP}}} = Q$. The bandwidth of the band-pass response is [[circuits-2/frequency-response#thm-bandwidth]], since $\abs{H_{\mathrm{BP}}} = R\abs{\mathbf I}/\abs{\mathbf V_i}$ is proportional to the current; and $H_{\mathrm{BS}} = 1 - H_{\mathrm{BP}}$ (the voltages across $R$ and across $L$ and $C$ add to $\mathbf V_i$) with $H_{\mathrm{BP}}$ and $H_{\mathrm{BS}}$ in quadrature, so $\abs{H_{\mathrm{BS}}}^2 = 1 - \abs{H_{\mathrm{BP}}}^2$, and $\abs{H_{\mathrm{BS}}}^2 = \tfrac12$ exactly where $\abs{H_{\mathrm{BP}}}^2 = \tfrac12$.
:::

::: widget plot
f: -10*log10((1 - 10^(2x))^2 + (10^x/q)^2); 20*x*2 - 10*log10((1 - 10^(2x))^2 + (10^x/q)^2); 20*x - 20*log10(q) - 10*log10((1 - 10^(2x))^2 + (10^x/q)^2); 20*log10(abs(1 - 10^(2x)) + 1e-9) - 10*log10((1 - 10^(2x))^2 + (10^x/q)^2)
x: -1.5, 1.5
y: -60, 20
sliders: q=0.707:0.3:10:0.01
labels: \text{low-pass } (C); \text{high-pass } (L); \text{band-pass } (R); \text{band-stop } (L{+}C)
caption: The four outputs of one series $RLC$ circuit, in dB against $x = \log_{10}(\omega/\omega_0)$, for quality factor $Q$ (slider). At $Q = 0.707$ the low-pass and high-pass curves are maximally flat (Butterworth). Raise $Q$: a peak of height $20\log_{10}Q$ grows on the low-pass and high-pass outputs at $\omega_0$, while the band-pass response becomes narrower and the band-stop notch sharper. The four curves share the same denominator, so they share the same poles.
:::

::: example A 50 Hz notch {#ex-notch}
Design a passive series $RLC$ notch filter for $50\,\mathrm{Hz}$ with a rejection bandwidth of $10\,\mathrm{Hz}$, taking the output across the series $LC$ pair, using a capacitor of $10\,\mathrm{\mu F}$. Comment on the inductor.
::: solution
With $\omega_0 = 2\pi\times50 = 314.2\,\mathrm{rad/s}$,

$$
L = \frac{1}{\omega_0^2C} = \frac{1}{(314.2)^2\times10^{-5}} = 1.01\,\mathrm{H}.
$$

The bandwidth in rad/s is $B = 2\pi\times10 = 62.8\,\mathrm{rad/s}$, and $B = R/L$, so $R = 62.8\times1.01 = 63.7\,\Omega$; the quality factor is $Q = 50/10 = 5$. The design works on paper, but a $1\,\mathrm{H}$ inductor is a large iron-cored component whose winding resistance alone may be tens of ohms, whose core is non-linear and which picks up the very hum it is supposed to remove. Low-frequency filters are therefore almost always built as active $RC$ circuits; passive $LC$ filters remain the choice at radio frequencies, where inductors are small and op-amps too slow.
:::
:::

::: warning Loading changes the response
Every formula above assumes that the filter's output drives an open circuit. A resistive load $R_L$ across the capacitor of an $RC$ low-pass filter turns it into a filter with a lower gain, $R_L/(R + R_L)$, and a higher corner, $1/[(R\parallel R_L)C]$. Cascading two identical $RC$ sections does **not** give two coinciding poles: the second section loads the first, and the result has two separate real poles and a gain of $-9.5\,\mathrm{dB}$ at the intended corner instead of $-6\,\mathrm{dB}$ (see [[#exr-cascade]]). Either make each section's impedance much higher than the one before it, or separate them with buffers, which is what active filters do.
:::

::: quiz
A series $RLC$ circuit has its output taken across the resistor. Which statement is correct?
- [ ] It is a low-pass filter with a peak of $Q$ at $\omega_0$.
- [x] It is a band-pass filter with unit gain at $\omega_0$ and bandwidth $R/L$.
- [ ] It is a band-stop filter, because the resistor dissipates the signal at $\omega_0$.
- [ ] Its gain at $\omega_0$ is $Q$.
::: solution
At $\omega_0$ the reactances of $L$ and $C$ cancel, the whole source voltage appears across $R$, and the gain is exactly $1$. Away from $\omega_0$ the net reactance grows and the current, hence the voltage across $R$, falls. By [[#prop-rlc-filters]] this is $H_{\mathrm{BP}}$, of bandwidth $\omega_0/Q = R/L$. The gain $Q$ at $\omega_0$ belongs to the outputs across $L$ or across $C$.
:::
:::

## Active filters

An op-amp circuit has a very low output impedance, so its output voltage does not depend on the load, and its input can be made a high impedance. Active filters therefore cascade without loading, provide gain, and synthesise the effect of inductors using only resistors and capacitors. Their main limitations are the op-amp's finite bandwidth, which confines them to frequencies well below the op-amp's gain–bandwidth product (in practice up to a few hundred kilohertz with ordinary op-amps), the supply rails, which limit the signal swing, and the added noise.

### First-order active filters

Replace the feedback resistor of the inverting amplifier of [[circuits-1/operational-amplifiers]] by an impedance $Z_f$ and the input resistor by $Z_i$. For an ideal op-amp the gain is $-Z_f/Z_i$.

::: proposition First-order active filters {#prop-active-first}
With an ideal op-amp in the inverting configuration:

1. **Low-pass:** $Z_i = R_i$ and $Z_f = R_f \parallel C_f$ give
   $$
   H(j\omega) = -\frac{R_f}{R_i}\,\frac{1}{1 + j\omega R_fC_f}, \qquad \omega_c = \frac{1}{R_fC_f}.
   $$
2. **High-pass:** $Z_i = R_i + 1/(j\omega C_i)$ and $Z_f = R_f$ give
   $$
   H(j\omega) = -\frac{R_f}{R_i}\,\frac{j\omega R_iC_i}{1 + j\omega R_iC_i}, \qquad \omega_c = \frac{1}{R_iC_i}.
   $$

In both cases the passband gain is $-R_f/R_i$ and the input impedance in the passband is $R_i$.
:::

::: proof
For the low-pass, $Z_f = R_f/(1 + j\omega R_fC_f)$, so $-Z_f/Z_i$ is as stated. For the high-pass, $Z_i = (1 + j\omega R_iC_i)/(j\omega C_i)$, and $-R_f/Z_i = -R_f\,j\omega C_i/(1 + j\omega R_iC_i)$, which is the stated form after multiplying and dividing by $R_i$.
:::

A **band-pass** filter for a wide band (say $100\,\mathrm{Hz}$ to $10\,\mathrm{kHz}$) is simply a high-pass section followed by a low-pass section, since the op-amp output of the first drives the second without loading. Their gains multiply and their Bode plots add.

### The Sallen–Key low-pass section

A second-order response needs a complex pole pair, which a passive $RC$ network cannot produce: its poles are always real. Positive feedback through a capacitor makes complex poles possible.

The **unity-gain Sallen–Key low-pass** section consists of: the input through $R_1$ to a node $A$; from $A$ through $R_2$ to the non-inverting input of an op-amp, node $B$; a capacitor $C_2$ from $B$ to ground; and a capacitor $C_1$ from $A$ back to the op-amp output. The op-amp is wired as a voltage follower, so its output equals $\mathbf V_B$.

::: theorem Unity-gain Sallen–Key low-pass {#thm-sallen-key}
With an ideal op-amp, the transfer function of the unity-gain Sallen–Key low-pass section is

$$
H(s) = \frac{1}{s^2R_1R_2C_1C_2 + sC_2(R_1 + R_2) + 1} = \frac{\omega_0^2}{s^2 + (\omega_0/Q)s + \omega_0^2},
$$ {#eq-sallen-key}

with

$$
\omega_0 = \frac{1}{\sqrt{R_1R_2C_1C_2}}, \qquad Q = \frac{\sqrt{R_1R_2C_1C_2}}{C_2(R_1 + R_2)}.
$$

With equal resistors $R_1 = R_2 = R$, $\omega_0 = 1/(R\sqrt{C_1C_2})$ and $Q = \tfrac12\sqrt{C_1/C_2}$.
:::

::: proof
The follower makes $\mathbf V_o = \mathbf V_B$ and draws no current at its input. KCL at $B$: the current through $R_2$ flows into $C_2$, $(\mathbf V_A - \mathbf V_o)/R_2 = sC_2\mathbf V_o$, so $\mathbf V_A = \mathbf V_o(1 + sR_2C_2)$. KCL at $A$:

$$
\frac{\mathbf V_i - \mathbf V_A}{R_1} = \frac{\mathbf V_A - \mathbf V_o}{R_2} + sC_1(\mathbf V_A - \mathbf V_o).
$$

Substituting $\mathbf V_A$ and using $\mathbf V_A - \mathbf V_o = sR_2C_2\mathbf V_o$:

$$
\frac{\mathbf V_i}{R_1} = \mathbf V_o\left[\frac{1 + sR_2C_2}{R_1} + sC_2 + s^2R_2C_1C_2\right].
$$

Multiplying by $R_1$ gives $\mathbf V_i = \mathbf V_o[1 + sC_2(R_1 + R_2) + s^2R_1R_2C_1C_2]$, which is [[#eq-sallen-key]]. Comparing with $s^2/\omega_0^2 + s/(\omega_0Q) + 1$ gives the expressions for $\omega_0$ and $Q$.
:::

At very high frequencies the gain approaches zero, but more slowly in practice than the formula predicts: the capacitor $C_1$ couples the input directly to the op-amp output, whose impedance rises with frequency. This is a known limitation of the Sallen–Key low-pass in the megahertz range.

## The Butterworth response

How should the poles of a filter of order $n$ be placed? Different criteria give different families: Chebyshev filters allow ripple in the passband for a steeper transition, Bessel filters preserve waveform shape, elliptic filters are the steepest of all. The most common default is the one that is as flat as possible in the passband.

::: definition Butterworth low-pass response {#def-butterworth}
The $n$-th order **Butterworth** low-pass response with cutoff $\omega_c$ has

$$
\abs{H(j\omega)}^2 = \frac{1}{1 + (\omega/\omega_c)^{2n}}.
$$ {#eq-butterworth}

It is **maximally flat**: the first $2n - 1$ derivatives of $\abs{H}^2$ with respect to $\omega$ vanish at $\omega = 0$. For every $n$ the gain at $\omega_c$ is $-3.01\,\mathrm{dB}$, and far above $\omega_c$ it falls at $20n\,\mathrm{dB/decade}$. Its poles lie equally spaced on a circle of radius $\omega_c$ in the left half of the $s$-plane. For $n = 2$ the pole pair has $Q = 1/\sqrt2 = 0.707$ ($\zeta = 0.707$).
:::

The flatness follows because $\abs{H}^2 = 1 - u^{2n} + u^{4n} - \cdots$ for $u = \omega/\omega_c < 1$: nothing differs from $1$ before the $u^{2n}$ term. To meet a stopband specification $\abs{H}_{\mathrm{dB}} \le -A_s$ at $\omega_s$ with a $3\,\mathrm{dB}$ edge at $\omega_c$, [[#eq-butterworth]] requires $10\log_{10}(1 + (\omega_s/\omega_c)^{2n}) \ge A_s$, that is

$$
n \ge \frac{\log_{10}\bigl(10^{A_s/10} - 1\bigr)}{2\log_{10}(\omega_s/\omega_c)},
$$ {#eq-order}

rounded up to the next integer. Higher-order Butterworth filters are built by cascading second-order sections (and one first-order section for odd $n$), each with the $Q$ of one of its pole pairs; the values are tabulated in filter handbooks.

::: widget plot
f: -10*log10(1 + 10^(2*n*x))
x: -1, 1
y: -80, 5
sliders: n=2:1:8:1
hlines: -3; -40
vlines: 0.699
caption: Butterworth low-pass magnitude in dB against $x = \log_{10}(\omega/\omega_c)$ for order $n$ (slider). All orders pass through $-3\,\mathrm{dB}$ at the cutoff ($x = 0$). The vertical line is at $\omega = 5\omega_c$ and the horizontal line at $-40\,\mathrm{dB}$: find the smallest order whose curve lies below $-40\,\mathrm{dB}$ there. Notice that the passband becomes flatter, as well as the transition steeper, as the order rises.
:::

::: example Choosing the order {#ex-order}
A low-pass filter must have its $3\,\mathrm{dB}$ edge at $1\,\mathrm{kHz}$ and at least $40\,\mathrm{dB}$ of attenuation at $5\,\mathrm{kHz}$. What Butterworth order is needed, and what attenuation does it give at $5\,\mathrm{kHz}$?
::: solution
By [[#eq-order]] with $A_s = 40\,\mathrm{dB}$ and $\omega_s/\omega_c = 5$:

$$
n \ge \frac{\log_{10}(10^4 - 1)}{2\log_{10}5} = \frac{4.000}{1.398} = 2.86,
$$

so $n = 3$. At $5\,\mathrm{kHz}$ it gives $10\log_{10}(1 + 5^6) = 10\log_{10}15\,626 = 41.9\,\mathrm{dB}$. A second-order filter would give only $10\log_{10}(1 + 5^4) = 28.0\,\mathrm{dB}$. The third-order filter is a Sallen–Key section with $Q = 1$ cascaded with a first-order $RC$ section, both at $\omega_0 = \omega_c$ (the three poles of a third-order Butterworth filter are a real pole at $-\omega_c$ and a complex pair at angles $\pm120^\circ$, whose $Q$ is $1$).
:::
:::

::: example A second-order Butterworth low-pass {#ex-sk-design}
Design a unity-gain Sallen–Key Butterworth low-pass filter with $f_c = 1\,\mathrm{kHz}$, using $R_1 = R_2 = 10\,\mathrm{k\Omega}$. Then choose standard capacitor values and find the actual $f_0$ and $Q$.
::: solution
For Butterworth, $Q = 1/\sqrt2$, so by [[#thm-sallen-key]] $\tfrac12\sqrt{C_1/C_2} = 1/\sqrt2$, giving $C_1 = 2C_2$. Then $\omega_0 = 1/(R\sqrt{2}C_2)$, so

$$
C_2 = \frac{1}{\sqrt2\,\omega_0R} = \frac{1}{1.414\times6283\times10^4} = 11.25\,\mathrm{nF}, \qquad C_1 = 22.5\,\mathrm{nF}.
$$

Checking with [[#eq-sallen-key]] at $s = j2\pi\times1000$ gives $\abs{H} = 0.707$, $-3.01\,\mathrm{dB}$, as required. With standard values $C_1 = 22\,\mathrm{nF}$ and $C_2 = 11\,\mathrm{nF}$ (E24), $Q = \tfrac12\sqrt2 = 0.707$ exactly and $f_0 = 1/(2\pi\times10^4\sqrt{22\times11}\times10^{-9}) = 1023\,\mathrm{Hz}$. With the more common $22\,\mathrm{nF}$ and $10\,\mathrm{nF}$, $f_0 = 1073\,\mathrm{Hz}$ and $Q = 0.742$, giving a passband peak of about $0.1\,\mathrm{dB}$. Since capacitors are typically $\pm5\,\%$, an error of a few percent in $f_c$ is usually acceptable; if not, trim $R_1$ and $R_2$ together, which moves $f_0$ without changing $Q$.
:::
:::

::: quiz
In the equal-resistor unity-gain Sallen–Key low-pass, $C_1$ (the feedback capacitor) is increased while $C_2$ is unchanged. What happens?
- [ ] $\omega_0$ rises and $Q$ falls
- [x] $\omega_0$ falls and $Q$ rises
- [ ] Only the passband gain changes
- [ ] $\omega_0$ and $Q$ both rise
::: solution
$\omega_0 = 1/(R\sqrt{C_1C_2})$ falls as $C_1$ grows, and $Q = \tfrac12\sqrt{C_1/C_2}$ rises. The passband gain is fixed at $1$ by the follower. A large ratio $C_1/C_2$ gives a high-$Q$ peaky response.
:::
:::

## Magnitude and frequency scaling

Filter tables and design formulas are usually given for a **normalised prototype**: impedance level $1\,\Omega$ and cutoff $1\,\mathrm{rad/s}$. Two simple changes of variables move the design to practical values.

::: theorem Magnitude and frequency scaling {#thm-scaling}
Let a circuit of resistors, inductors, capacitors and dimensionless controlled sources (voltage gains, current gains, ideal op-amps) have transfer function $H(s)$.

1. **Magnitude scaling** by $K_m$: $R \to K_mR$, $L \to K_mL$, $C \to C/K_m$. Every impedance is multiplied by $K_m$, and every voltage ratio or current ratio $H(s)$ is unchanged.
2. **Frequency scaling** by $K_f$: $R \to R$, $L \to L/K_f$, $C \to C/K_f$. The new transfer function is $H(s/K_f)$, so every feature of the response, at $\omega$ before, appears at $K_f\omega$.

Applied together: $R' = K_mR$, $L' = (K_m/K_f)L$, $C' = C/(K_mK_f)$.
:::

::: proof
Under magnitude scaling, $R \to K_mR$, $sL \to K_m\,sL$ and $1/(sC) \to K_m/(sC)$: every impedance is multiplied by the same $K_m$. In nodal or mesh analysis a voltage-to-voltage ratio is a ratio of combinations of impedances that is homogeneous of degree zero, so it is unchanged. Under frequency scaling, the new impedance of an inductor at $s$ is $s(L/K_f) = (s/K_f)L$, which is the old impedance at $s/K_f$, and similarly $1/(s\,C/K_f) = 1/((s/K_f)C)$; resistors do not depend on $s$. So the new circuit at $s$ behaves exactly as the old circuit at $s/K_f$: $H_{\text{new}}(s) = H(s/K_f)$.
:::

::: example Scaling a ladder filter {#ex-scaling}
The normalised third-order Butterworth low-pass filter for $1\,\Omega$ source and load resistances and $\omega_c = 1\,\mathrm{rad/s}$ is a T-ladder: series $1\,\mathrm{H}$, shunt $2\,\mathrm{F}$, series $1\,\mathrm{H}$. Scale it for a $50\,\Omega$ system with a cutoff of $1\,\mathrm{MHz}$.
::: solution
$K_m = 50$ and $K_f = 2\pi\times10^6 = 6.283\times10^6$. By [[#thm-scaling]]:

$$
L' = \frac{50}{6.283\times10^6}\times1\,\mathrm{H} = 7.96\,\mathrm{\mu H}, \qquad C' = \frac{2\,\mathrm F}{50\times6.283\times10^6} = 6.37\,\mathrm{nF},
$$

and the terminations become $50\,\Omega$. Solving the scaled circuit with phasors gives $\abs{\mathbf V_o/\mathbf V_s} = 0.5$ at low frequency (the divider formed by the two terminations), $0.354$ at $1\,\mathrm{MHz}$, which is $3.01\,\mathrm{dB}$ below $0.5$, and $18.1\,\mathrm{dB}$ below $0.5$ at $2\,\mathrm{MHz}$, the $18\,\mathrm{dB}$ per octave of a third-order filter. At $1\,\mathrm{MHz}$ these component values are small, cheap and accurate: the regime where passive $LC$ filters are preferred.
:::
:::

::: application Anti-aliasing before an ADC
An analogue-to-digital converter sampling at $f_s$ cannot distinguish a frequency $f$ from $f_s - f$ (see [[dsp]]). An audio converter sampling at $48\,\mathrm{kHz}$ must therefore attenuate everything above $24\,\mathrm{kHz}$ while passing $20\,\mathrm{kHz}$, a transition band of barely $0.26$ octaves; meeting $90\,\mathrm{dB}$ of attenuation there would need a Butterworth filter of order $57$, by [[#eq-order]]. Modern converters avoid this by **oversampling**: they sample at many times $f_s$, so that a gentle second- or third-order analogue filter suffices, and do the sharp filtering digitally.
:::

::: history
The electric wave filter was invented independently in 1915 by George Campbell at AT&T in the United States and Karl Willy Wagner in Germany, to separate the channels of multiplexed telephone lines; Otto Zobel of Bell Labs developed improved image-parameter sections in the early 1920s. In 1930 the British engineer Stephen Butterworth published "On the Theory of Filter Amplifiers", deriving the maximally flat response and realising it with valve stages separated by buffers. Wilhelm Cauer put network synthesis on a rigorous footing in the 1930s, including the elliptic filters that bear his name. R. P. Sallen and E. L. Key of MIT Lincoln Laboratory published their practical active $RC$ sections in 1955, and the arrival of cheap integrated op-amps such as the $\mu$A741 (1968) made active filters the standard at audio frequencies.
:::

## Where this leads

Filters appear wherever signals are processed. [[circuits-2/laplace-circuit-analysis]] explains the filter's poles in the $s$-plane and how they shape its transient as well as its frequency response, for example the overshoot of a high-$Q$ section's step response. [[signals-systems]] proves that ideal filters are non-causal and introduces the Fourier view of filtering, and [[dsp]] designs digital filters, often by transforming the analogue prototypes of this lesson. Active filter circuits with non-ideal op-amps, including higher-order and switched-capacitor designs, are treated in [[electronics-2]], and $LC$ filters and matching networks at radio frequencies in [[rf-microwave]].

::: summary
- Ideal filters (low-pass, high-pass, band-pass, band-stop) are approximated by real ones within a specification of passband loss, stopband attenuation and transition band; an $n$-th order low-pass filter rolls off at $20n\,\mathrm{dB/decade}$.
- A first-order $RC$ or $RL$ divider gives a low-pass or high-pass response with $\omega_c = 1/RC$ or $R/L$.
- One series $RLC$ circuit gives low-pass (across $C$), high-pass (across $L$), band-pass (across $R$) and band-stop (across $L$ and $C$) responses with common $\omega_0 = 1/\sqrt{LC}$ and $Q = \omega_0L/R$.
- Passive filters load one another; active filters with op-amps cascade freely, give gain and avoid inductors at low frequencies.
- The unity-gain Sallen–Key low-pass has $\omega_0 = 1/\sqrt{R_1R_2C_1C_2}$ and $Q = \sqrt{R_1R_2C_1C_2}/(C_2(R_1 + R_2))$; with equal resistors, $C_1 = 2C_2$ gives a Butterworth response.
- The Butterworth response $1/\sqrt{1 + (\omega/\omega_c)^{2n}}$ is maximally flat; choose the order from $n \ge \log(10^{A_s/10} - 1)/(2\log(\omega_s/\omega_c))$.
- Magnitude scaling ($R, L \times K_m$; $C \div K_m$) and frequency scaling ($L, C \div K_f$) move a normalised design to any impedance level and frequency.
:::

## Exercises

::: exercise A high-pass corner {level=1 check="1/(2*pi*2200*100e-9)"}
An $RC$ high-pass filter has $R = 2.2\,\mathrm{k\Omega}$ and $C = 100\,\mathrm{nF}$. Find its cutoff frequency in hertz.
::: solution
$f_c = 1/(2\pi RC) = 1/(2\pi\times2.2\times10^{-4}) = 723\,\mathrm{Hz}$.
:::
:::

::: exercise Passband gain {level=1 check="20"}
An inverting first-order active low-pass filter has $R_i = 10\,\mathrm{k\Omega}$ and $R_f = 100\,\mathrm{k\Omega}$. What is its passband gain in dB?
::: solution
The passband gain is $-R_f/R_i = -10$, whose magnitude is $20\log_{10}10 = 20\,\mathrm{dB}$. (The minus sign is a phase of $180^\circ$ and does not affect the magnitude.)
:::
:::

::: exercise Butterworth attenuation {level=1 check="10*log10(1+2^8)"}
How much attenuation, in dB, does a fourth-order Butterworth low-pass filter give at twice its cutoff frequency?
::: solution
$10\log_{10}(1 + 2^{8}) = 10\log_{10}257 = 24.1\,\mathrm{dB}$, close to the asymptotic $4\times6.02 = 24.08\,\mathrm{dB}$ for one octave.
:::
:::

::: exercise Choose a resistor {level=2 check="1/(2*pi*3000*10e-9)"}
Design a first-order passive $RC$ low-pass filter with $f_c = 3\,\mathrm{kHz}$ using $C = 10\,\mathrm{nF}$. Give $R$ in ohms and the nearest E24 value.
::: solution
$R = 1/(2\pi f_cC) = 1/(2\pi\times3000\times10^{-8}) = 5305\,\Omega$. The nearest E24 value is $5.1\,\mathrm{k\Omega}$, giving $f_c = 3.12\,\mathrm{kHz}$; E96 offers $5.36\,\mathrm{k\Omega}$ ($2.97\,\mathrm{kHz}$).
:::
:::

::: exercise A 60 Hz notch {level=2 check="1/((2*pi*60)^2*0.1)"}
A series $RLC$ notch for $60\,\mathrm{Hz}$ uses $L = 100\,\mathrm{mH}$. Find $C$ in farads, and $R$ for a rejection bandwidth of $6\,\mathrm{Hz}$.
::: solution
$C = 1/(\omega_0^2L) = 1/((377)^2\times0.1) = 70.4\,\mathrm{\mu F}$. $R = BL = (2\pi\times6)(0.1) = 3.77\,\Omega$, so $Q = 10$.
:::
:::

::: exercise Scaling a prototype {level=2 check="1/(1e4*2*pi*1e4)"}
A normalised first-order low-pass filter has $R = 1\,\Omega$, $C = 1\,\mathrm{F}$ ($\omega_c = 1\,\mathrm{rad/s}$). Scale it to $R = 10\,\mathrm{k\Omega}$ and $f_c = 10\,\mathrm{kHz}$. Give the new $C$ in farads.
::: solution
$K_m = 10^4$ and $K_f = 2\pi\times10^4$, so $C' = 1/(K_mK_f) = 1/(10^4\times6.283\times10^4) = 1.59\,\mathrm{nF}$. Check: $1/(2\pi\times10^4\times1.59\times10^{-9}) = 10\,\mathrm{kHz}$.
:::
:::

::: exercise Cascaded RC sections {#exr-cascade level=3}
Two identical $RC$ low-pass sections (each $R$ in series, $C$ in shunt) are cascaded directly. (a) Show that $H(s) = 1/(s^2R^2C^2 + 3sRC + 1)$. (b) Find the gain in dB at $\omega = 1/(RC)$ and compare with a buffered cascade. (c) What is the $Q$ of this pole pair, and can a passive $RC$ ladder ever give the Butterworth value?
::: hint
Write KCL at the middle node and at the output; the second section draws current from the first.
:::
::: solution
(a) Let $V_1$ be the middle node. At the output, $V_o(1 + sRC) = V_1$. At the middle node, $(V_i - V_1)/R = sCV_1 + (V_1 - V_o)/R$. Substituting $V_1$: $V_i = V_1(2 + sRC) - V_o = V_o[(1 + sRC)(2 + sRC) - 1] = V_o[s^2R^2C^2 + 3sRC + 1]$.

(b) At $sRC = j$: $\abs{H} = 1/\abs{-1 + 3j + 1} = 1/3$, that is $-9.54\,\mathrm{dB}$. With a buffer between the sections, $H = 1/(1 + sRC)^2$ and $\abs{H} = 1/2$, $-6.02\,\mathrm{dB}$.

(c) Comparing with $s^2/\omega_0^2 + s/(\omega_0Q) + 1$: $\omega_0 = 1/(RC)$ and $1/Q = 3$, so $Q = 1/3$. The roots of $x^2 + 3x + 1$ are real ($-0.38$ and $-2.62$ in units of $1/RC$). Passive $RC$ networks always have real, negative poles, so $Q < 1/2$; the Butterworth $Q = 0.707$ needs complex poles, which require an inductor or active feedback.
:::
:::

::: exercise Sallen–Key with gain {level=3}
In the **equal-component** Sallen–Key low-pass ($R_1 = R_2 = R$, $C_1 = C_2 = C$), the follower is replaced by a non-inverting amplifier of gain $K$. The transfer function becomes $H(s) = K/(s^2R^2C^2 + sRC(3 - K) + 1)$. (a) Find $\omega_0$ and $Q$. (b) What gain gives a Butterworth response? (c) What happens as $K \to 3$? (d) Choose $R$, $C$ and the gain-setting resistors $R_a$ (output to inverting input) and $R_b$ (inverting input to ground) for a Butterworth filter at $500\,\mathrm{Hz}$ with $C = 10\,\mathrm{nF}$.
::: solution
(a) $\omega_0 = 1/(RC)$ and $Q = 1/(3 - K)$.

(b) $Q = 1/\sqrt2$ needs $K = 3 - \sqrt2 = 1.586$.

(c) $Q \to \infty$: the poles move onto the $j\omega$ axis and the circuit oscillates; for $K > 3$ the poles are in the right half-plane and the output grows until the op-amp saturates. This sensitivity to $K$ is the price of the equal-component design.

(d) $R = 1/(2\pi\times500\times10^{-8}) = 31.8\,\mathrm{k\Omega}$ (use $31.6\,\mathrm{k\Omega}$ from E96). The non-inverting gain is $1 + R_a/R_b = 1.586$, so $R_a/R_b = 0.586$: for example $R_b = 10\,\mathrm{k\Omega}$ and $R_a = 5.86\,\mathrm{k\Omega}$ ($5.9\,\mathrm{k\Omega}$ E96). The passband gain is $1.586$, or $4.0\,\mathrm{dB}$.
:::
:::

::: exercise A Butterworth design to specification {level=3}
An instrument needs a low-pass filter with its $3\,\mathrm{dB}$ edge at $2\,\mathrm{kHz}$ and at least $50\,\mathrm{dB}$ of attenuation at $10\,\mathrm{kHz}$. (a) Find the Butterworth order. (b) The poles of an $n$-th order Butterworth filter are at angles $\pm(90^\circ + (2k - 1)90^\circ/n)$ from the positive real axis, $k = 1, \dots, n/2$. Find the $Q$ of each pole pair for your order. (c) Outline the circuit.
::: hint
A pole pair at angle $\pm\psi$ from the negative real axis on a circle of radius $\omega_c$ has $Q = 1/(2\cos\psi)$.
:::
::: solution
(a) $n \ge \log_{10}(10^5 - 1)/(2\log_{10}5) = 5.000/1.398 = 3.58$, so $n = 4$, giving $10\log_{10}(1 + 5^8) = 55.9\,\mathrm{dB}$ at $10\,\mathrm{kHz}$.

(b) For $n = 4$ the poles are at angles $\pm(90^\circ + 22.5^\circ) = \pm112.5^\circ$ and $\pm(90^\circ + 67.5^\circ) = \pm157.5^\circ$ from the positive real axis, that is $\psi = 67.5^\circ$ and $22.5^\circ$ from the negative real axis. So $Q_1 = 1/(2\cos67.5^\circ) = 1.307$ and $Q_2 = 1/(2\cos22.5^\circ) = 0.541$.

(c) Two unity-gain Sallen–Key sections in cascade, both with $\omega_0 = 2\pi\times2000\,\mathrm{rad/s}$, one with $Q = 0.541$ and one with $Q = 1.307$. With equal resistors, $C_1/C_2 = 4Q^2$: ratios $1.17$ and $6.83$. Putting the low-$Q$ section first keeps the internal signal peak smaller.
:::
:::
