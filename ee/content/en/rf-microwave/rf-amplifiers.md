A GPS receiver must detect a signal that arrives at about $-130\,\mathrm{dBm}$, a tenth of a femtowatt, some $20\,\mathrm{dB}$ *below* the thermal noise in its bandwidth. The first transistor after the antenna decides whether that is possible: its gain must be high enough that later stages add little noise, the noise it adds itself must be as small as physics allows, and it must not oscillate whatever the antenna and cable present to it. Designing that **low-noise amplifier** (LNA), and its cousins the gain blocks and driver amplifiers of every radio, is the subject of this chapter.

At microwave frequencies the transistor is described by its S-parameters, measured at a bias point, and the designer's freedom lies entirely in the two impedances it is made to see: the source reflection coefficient $\Gamma_S$ presented by the input matching network and the load reflection coefficient $\Gamma_L$ presented by the output network. We first define the three power gains of a two-port and derive the transducer gain. Then we ask which $\Gamma_S$ and $\Gamma_L$ keep the amplifier stable, which give the most gain, which give a prescribed gain, and which give the least noise — each answer a set of circles on the Smith chart. Finally we look at linearity, the property that sets the upper end of the amplifier's dynamic range. The tools are those of [[rf-microwave/scattering-parameters]] and [[rf-microwave/impedance-matching]]; the noise figure and Friis's cascade formula were introduced in [[electronics-2/electronic-noise]].

## Power gains {#sec-gains}

Consider a source with wave amplitude $b_s$ and reflection coefficient $\Gamma_S$, a two-port $\mathbf S$, and a load $\Gamma_L$, all referred to $Z_0$ (normally $50\,\Omega$). Several powers can be defined: the power available from the source $P_{\text{avs}}$, the power actually entering the two-port $P_{\text{in}}$, the power available at its output $P_{\text{avn}}$, and the power delivered to the load $P_L$.

::: definition Transducer, operating and available power gain {#def-gains}
- The **transducer power gain** $G_T = P_L/P_{\text{avs}}$ compares the power delivered to the load with the power the source could deliver to a conjugate match. It depends on both $\Gamma_S$ and $\Gamma_L$.
- The **operating power gain** $G_P = P_L/P_{\text{in}}$ depends only on $\Gamma_L$.
- The **available power gain** $G_A = P_{\text{avn}}/P_{\text{avs}}$ depends only on $\Gamma_S$.

With the input and output reflection coefficients $\Gamma_{\text{in}} = S_{11} + S_{12}S_{21}\Gamma_L/(1 - S_{22}\Gamma_L)$ and $\Gamma_{\text{out}} = S_{22} + S_{12}S_{21}\Gamma_S/(1 - S_{11}\Gamma_S)$ of [[rf-microwave/scattering-parameters#thm-gamma-in]], $G_T = G_P$ when the input is conjugately matched ($\Gamma_S = \Gamma_{\text{in}}^*$) and $G_T = G_A$ when the output is ($\Gamma_L = \Gamma_{\text{out}}^*$).
:::

$G_T$ is the number that matters for a system, because it is what a power meter at the load would show relative to the generator's available power.

::: theorem Transducer power gain {#thm-gt}
$$
G_T = \frac{\abs{S_{21}}^2\bigl(1 - \abs{\Gamma_S}^2\bigr)\bigl(1 - \abs{\Gamma_L}^2\bigr)}{\abs{1 - \Gamma_S\Gamma_{\text{in}}}^2\,\abs{1 - S_{22}\Gamma_L}^2} .
$$ {#eq-gt}

For a **unilateral** device ($S_{12} = 0$, so $\Gamma_{\text{in}} = S_{11}$) it factorises as

$$
G_{TU} = G_S\,G_0\,G_L = \frac{1 - \abs{\Gamma_S}^2}{\abs{1 - S_{11}\Gamma_S}^2}\cdot\abs{S_{21}}^2\cdot\frac{1 - \abs{\Gamma_L}^2}{\abs{1 - S_{22}\Gamma_L}^2} .
$$ {#eq-gtu}
:::

::: proof
By the last exercise of [[rf-microwave/scattering-parameters]] (Mason's rule), the wave reaching the load is $b_2 = S_{21}b_s/\Delta$ with $\Delta = (1 - \Gamma_SS_{11})(1 - S_{22}\Gamma_L) - \Gamma_S\Gamma_LS_{12}S_{21}$. Factoring out $(1 - S_{22}\Gamma_L)$ gives $\Delta = (1 - S_{22}\Gamma_L)\bigl[1 - \Gamma_S\bigl(S_{11} + S_{12}S_{21}\Gamma_L/(1 - S_{22}\Gamma_L)\bigr)\bigr] = (1 - S_{22}\Gamma_L)(1 - \Gamma_S\Gamma_{\text{in}})$. The load absorbs $P_L = \tfrac12\abs{b_2}^2(1 - \abs{\Gamma_L}^2)$. The source's available power is what it delivers to a load $\Gamma_S^*$: with such a load the incident wave is $b_s/(1 - \abs{\Gamma_S}^2)$ and the absorbed power $\tfrac12\abs{b_s}^2(1 - \abs{\Gamma_S}^2)/(1 - \abs{\Gamma_S}^2)^2 = \tfrac12\abs{b_s}^2/(1 - \abs{\Gamma_S}^2)$. Dividing $P_L$ by $P_{\text{avs}}$ gives [[#eq-gt]]. With $S_{12} = 0$ the denominator becomes $\abs{1 - \Gamma_SS_{11}}^2\abs{1 - S_{22}\Gamma_L}^2$ and the expression factorises.
:::

The unilateral form is illuminating: $G_0 = \abs{S_{21}}^2$ is the gain of the transistor between $50\,\Omega$ terminations, and $G_S$, $G_L$ are the extra gains (or losses) produced by the input and output networks. They are not amplification by the networks, which are passive; they measure how much *mismatch loss* the networks remove. $G_S$ is largest, $1/(1 - \abs{S_{11}}^2)$, when $\Gamma_S = S_{11}^*$, and similarly for $G_L$.

## Stability {#sec-stability}

A two-port is unstable if some passive termination makes it oscillate. In terms of waves, oscillation is possible when a port reflects more than it receives: $\abs{\Gamma_{\text{in}}} > 1$ or $\abs{\Gamma_{\text{out}}} > 1$, equivalent to a negative real part of the input or output impedance.

::: definition Unconditional and conditional stability {#def-stability}
A two-port is **unconditionally stable** at a frequency if $\abs{\Gamma_{\text{in}}} < 1$ and $\abs{\Gamma_{\text{out}}} < 1$ for *every* passive source and load ($\abs{\Gamma_S} < 1$, $\abs{\Gamma_L} < 1$). It is **conditionally** (or potentially) **unstable** if some passive terminations give $\abs{\Gamma_{\text{in}}} > 1$ or $\abs{\Gamma_{\text{out}}} > 1$.
:::

::: theorem Stability circles {#thm-stability-circles}
The values of $\Gamma_L$ for which $\abs{\Gamma_{\text{in}}} = 1$ lie on the **output stability circle**

$$
C_L = \frac{\bigl(S_{22} - \Delta S_{11}^*\bigr)^*}{\abs{S_{22}}^2 - \abs\Delta^2}, \qquad R_L = \left\lvert\frac{S_{12}S_{21}}{\abs{S_{22}}^2 - \abs\Delta^2}\right\rvert ,
$$ {#eq-stab-circle}

where $\Delta = S_{11}S_{22} - S_{12}S_{21}$. The **input stability circle** (values of $\Gamma_S$ with $\abs{\Gamma_{\text{out}}} = 1$) has the same form with subscripts 1 and 2 exchanged. If $\abs{S_{11}} < 1$, the point $\Gamma_L = 0$ is stable, and the stable region is the side of the circle that contains the origin.
:::

::: proof
Combining the terms of $\Gamma_{\text{in}}$ over the common denominator, $\Gamma_{\text{in}} = (S_{11} - \Delta\Gamma_L)/(1 - S_{22}\Gamma_L)$. Setting $\abs{\Gamma_{\text{in}}} = 1$ gives $\abs{S_{11} - \Delta\Gamma_L}^2 = \abs{1 - S_{22}\Gamma_L}^2$. Expanding both sides,

$$
\bigl(\abs{S_{22}}^2 - \abs\Delta^2\bigr)\abs{\Gamma_L}^2 - 2\,\mathrm{Re}\bigl[(S_{22} - \Delta S_{11}^*)\Gamma_L\bigr] = \abs{S_{11}}^2 - 1 .
$$

Dividing by $\abs{S_{22}}^2 - \abs\Delta^2$ and completing the square gives $\abs{\Gamma_L - C_L}^2 = R_L^2$ with $C_L$ as stated and $R_L^2 = \abs{C_L}^2 + (\abs{S_{11}}^2 - 1)/(\abs{S_{22}}^2 - \abs\Delta^2)$, which simplifies, using the identity $\abs{S_{22} - \Delta S_{11}^*}^2 - (\abs{S_{22}}^2 - \abs\Delta^2)(1 - \abs{S_{11}}^2) = \abs{S_{12}S_{21}}^2$, to [[#eq-stab-circle]]. At $\Gamma_L = 0$, $\Gamma_{\text{in}} = S_{11}$, so if $\abs{S_{11}} < 1$ the origin is on the stable side.
:::

Checking circles at every frequency is laborious; a pair of numbers does it.

::: theorem Rollett's stability test {#thm-rollett}
A two-port is unconditionally stable if and only if

$$
K = \frac{1 - \abs{S_{11}}^2 - \abs{S_{22}}^2 + \abs\Delta^2}{2\abs{S_{12}S_{21}}} > 1 \quad\text{and}\quad \abs\Delta < 1 .
$$ {#eq-rollett}

Equivalently (Edwards and Sinsky), the single parameter $\mu = (1 - \abs{S_{11}}^2)/(\abs{S_{22} - \Delta S_{11}^*} + \abs{S_{12}S_{21}}) > 1$ is necessary and sufficient, and larger $\mu$ means a larger margin.
:::

::: proof
A sketch. Unconditional stability at the output requires the output stability circle to lie entirely outside the unit disc (when the origin is stable and outside the circle), i.e. $\abs{C_L} - R_L > 1$, or to enclose it entirely. Substituting [[#eq-stab-circle]], squaring and using the identity proved in the exercises at the end of this chapter, the condition $\abs{C_L} - R_L > 1$ becomes $K > 1$; the remaining case analysis (circle enclosing the disc, and the corresponding input condition) adds the requirement $\abs\Delta < 1$. The full argument is in Gonzalez, section 3.3. Rollett published the test in 1962; $\mu$ measures the distance from the centre of the Smith chart to the nearest unstable $\Gamma_L$, which is why it alone suffices (Edwards and Sinsky, 1992).
:::

::: example Is this transistor stable? {#ex-stability}
The GaAs FET of [[rf-microwave/scattering-parameters#ex-transistor]] has, at $2\,\mathrm{GHz}$, $S_{11} = 0.65\angle{-140^\circ}$, $S_{21} = 4.0\angle80^\circ$, $S_{12} = 0.06\angle35^\circ$, $S_{22} = 0.50\angle{-60^\circ}$. Test its stability, find the output stability circle, and decide whether the loads $\Gamma_L = 0.5\angle60^\circ$ and $\Gamma_L = 0.9\angle75^\circ$ are safe.
::: solution
$S_{11}S_{22} = 0.325\angle{-200^\circ}$ and $S_{12}S_{21} = 0.24\angle115^\circ$, so $\Delta = 0.230\angle{-152.5^\circ}$ and

$$
K = \frac{1 - 0.4225 - 0.25 + 0.0529}{2\times0.24} = \frac{0.3804}{0.48} = 0.79 < 1 .
$$

Although $\abs\Delta < 1$, $K < 1$: the device is **potentially unstable** ($\mu = 0.88$ agrees). The output stability circle has $\abs{S_{22}}^2 - \abs\Delta^2 = 0.197$, centre $C_L = 2.10\angle75.5^\circ$ and radius $R_L = 0.24/0.197 = 1.22$. Its nearest point to the origin is $2.10 - 1.22 = 0.88$ from the centre of the chart, so it cuts into the unit disc in the upper right. Since $\abs{S_{11}} < 1$, the origin is stable, so the stable region is *outside* the circle.

$\Gamma_L = 0.5\angle60^\circ$ is $1.62$ from $C_L$, outside the circle: stable, and indeed $\abs{\Gamma_{\text{in}}} = 0.77$. $\Gamma_L = 0.9\angle75^\circ$ is $1.20$ from $C_L$, inside: $\abs{\Gamma_{\text{in}}} = 1.01$, and with a source whose reflection is near $1/\Gamma_{\text{in}}$ the amplifier would oscillate. A designer either keeps both terminations well away from the circles at *all* frequencies where the device has gain, or stabilises the device with a small series resistor at the input or a shunt resistor at the output, trading a little gain and noise for $K > 1$.
:::
:::

::: warning Check stability over the whole band where the transistor has gain
An amplifier designed at $2\,\mathrm{GHz}$ can oscillate at $500\,\mathrm{MHz}$ or $8\,\mathrm{GHz}$, where its matching networks present quite different impedances and the device may have more gain and less isolation. Transistors are usually least stable at low frequencies, where $\abs{S_{21}}$ is large. Always compute $K$ and $\abs\Delta$ (or $\mu$) from the lowest frequency at which the device has gain to the highest, with the actual matching and bias networks in place.
:::

::: quiz
A transistor has $\abs{S_{11}} < 1$, and its output stability circle has centre $1.6\angle40^\circ$ and radius $0.4$. Which loads are safe?
- [ ] Only loads inside the circle
- [x] Every passive load, because the circle lies entirely outside the unit disc
- [ ] None, because the device has a stability circle
- [ ] Only $\Gamma_L = 0$
::: solution
The circle's nearest point to the origin is $1.6 - 0.4 = 1.2$ from the centre, outside $\abs{\Gamma_L} = 1$. The origin is stable (since $\abs{S_{11}} < 1$) and outside the circle, so the stable region is the outside of the circle, which contains the whole unit disc. Every device has stability circles; what matters is whether they intersect the region of passive terminations.
:::
:::

## Design for maximum gain {#sec-max-gain}

If the device is unconditionally stable, the input and output can both be conjugately matched at once: $\Gamma_S = \Gamma_{\text{in}}^*$ and $\Gamma_L = \Gamma_{\text{out}}^*$. Because $\Gamma_{\text{in}}$ depends on $\Gamma_L$ and $\Gamma_{\text{out}}$ on $\Gamma_S$, these are two coupled equations.

::: theorem Simultaneous conjugate match {#thm-conjugate-match}
For an unconditionally stable two-port, the simultaneous conjugate match is

$$
\Gamma_{S} = \frac{B_1 - \sqrt{B_1^2 - 4\abs{C_1}^2}}{2C_1}, \qquad \Gamma_{L} = \frac{B_2 - \sqrt{B_2^2 - 4\abs{C_2}^2}}{2C_2},
$$ {#eq-gms}

with $B_1 = 1 + \abs{S_{11}}^2 - \abs{S_{22}}^2 - \abs\Delta^2$, $C_1 = S_{11} - \Delta S_{22}^*$ and $B_2$, $C_2$ obtained by exchanging subscripts 1 and 2. The resulting **maximum available gain** is

$$
G_{T,\max} = \frac{\abs{S_{21}}}{\abs{S_{12}}}\bigl(K - \sqrt{K^2 - 1}\bigr) ,
$$ {#eq-gmax}

which tends to the **maximum stable gain** $\mathrm{MSG} = \abs{S_{21}}/\abs{S_{12}}$ as $K\to1$.
:::

::: proof
A sketch. Substitute $\Gamma_L = \Gamma_{\text{out}}^* = [S_{22} + S_{12}S_{21}\Gamma_S/(1 - S_{11}\Gamma_S)]^*$ into $\Gamma_S^* = \Gamma_{\text{in}}$. After clearing denominators the result is the quadratic $C_1\Gamma_S^2 - B_1\Gamma_S + C_1^* = 0$, whose root inside the unit circle is [[#eq-gms]] (the minus sign when $B_1 > 0$). The output equation is the same with subscripts exchanged. Substituting both into [[#eq-gt]] and simplifying with the definition of $K$ gives [[#eq-gmax]]; the algebra is in Gonzalez's *Microwave Transistor Amplifiers*, section 3.6.
:::

::: example A maximum-gain amplifier at 4 GHz {#ex-max-gain}
A transistor at $4\,\mathrm{GHz}$ has $S_{11} = 0.60\angle{-150^\circ}$, $S_{21} = 3.0\angle70^\circ$, $S_{12} = 0.04\angle50^\circ$, $S_{22} = 0.55\angle{-50^\circ}$. Check stability, find the simultaneous conjugate match and $G_{T,\max}$, and design lumped L-section matching networks.
::: solution
$\Delta = S_{11}S_{22} - S_{12}S_{21} = 0.330\angle{-200^\circ} - 0.12\angle120^\circ = 0.250\angle178.0^\circ$, and

$$
K = \frac{1 - 0.36 - 0.3025 + 0.0627}{2\times0.12} = 1.67 > 1, \qquad \abs\Delta = 0.25 < 1 :
$$

unconditionally stable. Then $B_1 = 1 + 0.36 - 0.3025 - 0.0627 = 0.995$, $C_1 = S_{11} - \Delta S_{22}^* = 0.471\angle{-155.2^\circ}$, and [[#eq-gms]] gives $\Gamma_S = 0.716\angle155.2^\circ$; similarly $B_2 = 0.880$, $C_2 = 0.410\angle{-56.5^\circ}$ and $\Gamma_L = 0.683\angle56.5^\circ$. As a check, $\Gamma_{\text{in}}$ with this load is $0.716\angle{-155.2^\circ} = \Gamma_S^*$. The gain is

$$
G_{T,\max} = \frac{3.0}{0.04}\bigl(1.667 - \sqrt{1.667^2 - 1}\bigr) = 75\times0.333 = 25.0 = 14.0\,\mathrm{dB},
$$

against $\abs{S_{21}}^2 = 9.5\,\mathrm{dB}$ between $50\,\Omega$ terminations and $\mathrm{MSG} = 18.8\,\mathrm{dB}$.

**Matching networks.** The transistor must see $Z_S = 50(1 + \Gamma_S)/(1 - \Gamma_S) = 8.65 + j10.69\,\Omega$ looking back into the input network, and $Z_L = 37.5 + j79.9\,\Omega$ into the output network. For the input, take an L-section from the $50\,\Omega$ source: a shunt capacitor at the source side brings $50\,\Omega$ to the conductance circle of $8.65\,\Omega$, and a series inductor then adds the reactance. With [[rf-microwave/impedance-matching#thm-l-section]] (case 1, applied to the conjugate), $B = \sqrt{41.35/8.65}/50 = 43.7\,\mathrm{mS}$ ($C = 1.74\,\mathrm{pF}$ at $4\,\mathrm{GHz}$) and series $X = 29.6\,\Omega$ ($L = 1.18\,\mathrm{nH}$). Check: $50\,\Omega$ in parallel with $j43.7\,\mathrm{mS}$ is $8.65 - j18.9\,\Omega$; adding $j29.6$ gives $8.65 + j10.7\,\Omega$. For the output, a shunt capacitor of $11.6\,\mathrm{mS}$ ($0.46\,\mathrm{pF}$) at the load side and a series inductor of $101.6\,\Omega$ ($4.04\,\mathrm{nH}$) next to the transistor present $Z_L$. Values this small would in practice be realised with microstrip stubs and lines.
:::
:::

### Constant-gain circles

Maximum gain is rarely the goal: a flat gain over a band, or a compromise with noise, is more common. For a unilateral device, $G_S$ in [[#eq-gtu]] depends only on $\Gamma_S$, and its contours are circles.

::: proposition Unilateral constant-gain circles {#prop-gain-circles}
With $g_s = G_S(1 - \abs{S_{11}}^2)$ the gain normalised to its maximum ($0\le g_s\le1$), the values of $\Gamma_S$ giving a constant $G_S$ lie on the circle

$$
C_s = \frac{g_sS_{11}^*}{1 - (1 - g_s)\abs{S_{11}}^2}, \qquad R_s = \frac{\sqrt{1 - g_s}\,(1 - \abs{S_{11}}^2)}{1 - (1 - g_s)\abs{S_{11}}^2} ,
$$ {#eq-gain-circle}

and similarly for $G_L$ with $S_{22}$. The centres lie on the line from the origin to $S_{11}^*$; $g_s = 1$ shrinks the circle to the point $S_{11}^*$.
:::

::: proof
Set $(1 - \abs{\Gamma_S}^2)/\abs{1 - S_{11}\Gamma_S}^2 = G_S$, i.e. $1 - \abs{\Gamma_S}^2 = G_S\bigl(1 - 2\mathrm{Re}(S_{11}\Gamma_S) + \abs{S_{11}}^2\abs{\Gamma_S}^2\bigr)$. Collecting terms, $\abs{\Gamma_S}^2(1 + G_S\abs{S_{11}}^2) - 2G_S\mathrm{Re}(S_{11}\Gamma_S) = 1 - G_S$, and completing the square gives a circle with centre $G_SS_{11}^*/(1 + G_S\abs{S_{11}}^2)$; substituting $G_S = g_s/(1 - \abs{S_{11}}^2)$ and simplifying gives [[#eq-gain-circle]].
:::

The error of the unilateral assumption is bounded by the **unilateral figure of merit** $U = \abs{S_{12}S_{21}S_{11}S_{22}}/[(1 - \abs{S_{11}}^2)(1 - \abs{S_{22}}^2)]$: $1/(1 + U)^2 < G_T/G_{TU} < 1/(1 - U)^2$. For the $4\,\mathrm{GHz}$ transistor of [[#ex-max-gain]], $U = 0.0396/0.446 = 0.089$, so for any given terminations the bilateral gain is within $-0.74$ and $+0.81\,\mathrm{dB}$ of the unilateral estimate. The bilateral optimum, $14.0\,\mathrm{dB}$, exceeds the unilateral optimum $G_{TU,\max} = 13.0\,\mathrm{dB}$ by slightly more than that, because the two optima use different $\Gamma_S$ and $\Gamma_L$.

## Low-noise design {#sec-noise}

The noise figure of a two-port depends on the source impedance it sees, but not on the load. [[electronics-2/electronic-noise]] showed that for an amplifier modelled by input-referred noise voltage and current sources there is an optimum source impedance; in terms of admittances, $F = F_{\min} + (R_N/G_S)\abs{Y_S - Y_{\text{opt}}}^2$, where $R_N$ is the **noise resistance** and $Y_S = G_S + jB_S$ the source admittance. Translating to reflection coefficients gives the form used in microwave design.

::: theorem Noise figure in terms of the source reflection coefficient {#thm-noise-figure}
A two-port with noise parameters $F_{\min}$, $\Gamma_{\text{opt}}$ and $R_N$ has, for source reflection coefficient $\Gamma_S$,

$$
F = F_{\min} + \frac{4R_N}{Z_0}\,\frac{\abs{\Gamma_S - \Gamma_{\text{opt}}}^2}{\bigl(1 - \abs{\Gamma_S}^2\bigr)\abs{1 + \Gamma_{\text{opt}}}^2} .
$$ {#eq-noise-figure}

The values of $\Gamma_S$ with noise figure $F_i$ lie on the **noise circle** with

$$
N = \frac{F_i - F_{\min}}{4R_N/Z_0}\abs{1 + \Gamma_{\text{opt}}}^2, \qquad C_F = \frac{\Gamma_{\text{opt}}}{N + 1}, \qquad R_F = \frac{\sqrt{N\bigl(N + 1 - \abs{\Gamma_{\text{opt}}}^2\bigr)}}{N + 1} .
$$ {#eq-noise-circle}
:::

::: proof
Substitute $Y_S = Y_0(1 - \Gamma_S)/(1 + \Gamma_S)$ and $Y_{\text{opt}} = Y_0(1 - \Gamma_{\text{opt}})/(1 + \Gamma_{\text{opt}})$ in $F = F_{\min} + (R_N/G_S)\abs{Y_S - Y_{\text{opt}}}^2$. Then $Y_S - Y_{\text{opt}} = 2Y_0(\Gamma_{\text{opt}} - \Gamma_S)/[(1 + \Gamma_S)(1 + \Gamma_{\text{opt}})]$ and $G_S = \mathrm{Re}\,Y_S = Y_0(1 - \abs{\Gamma_S}^2)/\abs{1 + \Gamma_S}^2$; the factors $\abs{1 + \Gamma_S}^2$ cancel and [[#eq-noise-figure]] follows with $Y_0 = 1/Z_0$. For the circle, set $F = F_i$: $\abs{\Gamma_S - \Gamma_{\text{opt}}}^2 = N(1 - \abs{\Gamma_S}^2)$. Expanding, $(N + 1)\abs{\Gamma_S}^2 - 2\mathrm{Re}(\Gamma_S\Gamma_{\text{opt}}^*) + \abs{\Gamma_{\text{opt}}}^2 = N$; dividing by $N + 1$ and completing the square gives the centre $\Gamma_{\text{opt}}/(N + 1)$ and radius [[#eq-noise-circle]].
:::

The circles are nested about $\Gamma_{\text{opt}}$ and their centres move towards the origin as $F_i$ grows. $R_N$ measures how sensitive the noise figure is to mismatch: a device with small $R_N$ tolerates a wide range of $\Gamma_S$. Crucially, $\Gamma_{\text{opt}}$ is generally *not* $S_{11}^*$ or the conjugate-match $\Gamma_S$: the minimum-noise source mismatches the input, and the LNA designer must trade gain against noise.

::: widget parametric
fx: 0.3536/(1 + (10^(F/10) - 1.2589)*1.9571/0.8) + sqrt((10^(F/10) - 1.2589)*1.9571/0.8*((10^(F/10) - 1.2589)*1.9571/0.8 + 0.75))/(1 + (10^(F/10) - 1.2589)*1.9571/0.8)*cos(t)
fy: 0.3536/(1 + (10^(F/10) - 1.2589)*1.9571/0.8) + sqrt((10^(F/10) - 1.2589)*1.9571/0.8*((10^(F/10) - 1.2589)*1.9571/0.8 + 0.75))/(1 + (10^(F/10) - 1.2589)*1.9571/0.8)*sin(t)
t: 0, 2*pi
x: -1.05, 1.05
y: -1.05, 1.05
trace: false
sliders: F=1.2:1.01:4:0.01
caption: A noise circle in the $\Gamma_S$-plane (the Smith chart's unit disc spans $\pm1$) for a device with $F_{\min} = 1.0\,\mathrm{dB}$, $\Gamma_{\text{opt}} = 0.5\angle45^\circ$ and $R_N/Z_0 = 0.2$. The slider $F$ is the noise figure in decibels. Just above $F_{\min}$ the circle is a small ring round $\Gamma_{\text{opt}} = 0.354 + j0.354$; as $F$ rises it grows and its centre slides towards the centre of the chart. Every source reflection coefficient on the circle gives the same noise figure, so the designer picks the point on an acceptable noise circle that gives the most gain.
:::

::: example Designing a low-noise amplifier {#ex-lna}
The $4\,\mathrm{GHz}$ transistor of [[#ex-max-gain]] has noise parameters $F_{\min} = 0.8\,\mathrm{dB}$, $\Gamma_{\text{opt}} = 0.45\angle110^\circ$, $R_N = 10\,\Omega$. Compare (a) the maximum-gain design, (b) a minimum-noise design and (c) a design on the $1.2\,\mathrm{dB}$ noise circle that maximises gain. In each case the output is conjugately matched for the chosen $\Gamma_S$.
::: solution
(a) With $\Gamma_S = 0.716\angle155.2^\circ$ from [[#ex-max-gain]], [[#eq-noise-figure]] gives $F = 2.26\,\mathrm{dB}$, with $G_T = 14.0\,\mathrm{dB}$.

(b) With $\Gamma_S = \Gamma_{\text{opt}}$ ($Z_S = 26.4 + j28.0\,\Omega$), $F = F_{\min} = 0.80\,\mathrm{dB}$. Then $\Gamma_{\text{out}} = S_{22} + S_{12}S_{21}\Gamma_{\text{opt}}/(1 - S_{11}\Gamma_{\text{opt}}) = 0.551\angle{-56.9^\circ}$, and $\Gamma_L = \Gamma_{\text{out}}^*$ gives $G_T = 11.9\,\mathrm{dB}$: $2\,\mathrm{dB}$ of gain bought $1.5\,\mathrm{dB}$ of noise figure.

(c) For $F_i = 1.2\,\mathrm{dB}$: $4R_N/Z_0 = 0.8$, $\abs{1 + \Gamma_{\text{opt}}}^2 = \abs{0.846 + j0.423}^2 = 0.895$, so $N = (1.318 - 1.202)\times0.895/0.8 = 0.130$, $C_F = 0.398\angle110^\circ$ and $R_F = 0.307$. Searching round this circle for the largest $G_T$ (with $\Gamma_L = \Gamma_{\text{out}}^*$ at each point) gives $G_T = 13.5\,\mathrm{dB}$ at $\Gamma_S = 0.540\angle144.2^\circ$, on the side of the circle towards the maximum-gain point.

Design (c) gives up only $0.5\,\mathrm{dB}$ of gain relative to (a) and only $0.4\,\mathrm{dB}$ of noise figure relative to (b). Which is best depends on what follows: if the next stage is noisy, the extra gain of (c) can make the *system* noise figure lower than with (b) — see the next example.
:::
:::

::: example System noise figure of a receiver front end {#ex-cascade}
The LNA of [[#ex-lna]] is followed by a filter with $2\,\mathrm{dB}$ loss and a mixer with a $10\,\mathrm{dB}$ noise figure. Compute the cascade noise figure with LNA design (b) ($F = 0.8\,\mathrm{dB}$, $G = 11.9\,\mathrm{dB}$) and design (c) ($F = 1.2\,\mathrm{dB}$, $G = 13.5\,\mathrm{dB}$). What if the filter came first?
::: solution
Friis's formula ([[electronics-2/electronic-noise]]) is $F = F_1 + (F_2 - 1)/G_1 + (F_3 - 1)/(G_1G_2)$ with linear quantities; a passive filter of loss $L$ at room temperature has $F_2 = L$ and $G_2 = 1/L$. For (b): $F_1 = 1.202$, $G_1 = 15.6$, $F_2 = 1.585$, $G_2 = 0.631$, $F_3 = 10$:

$$
F = 1.202 + \frac{0.585}{15.6} + \frac{9}{15.6\times0.631} = 1.202 + 0.037 + 0.913 = 2.15 = 3.3\,\mathrm{dB} .
$$

For (c): $F = 1.318 + 0.585/22.4 + 9/(22.4\times0.631) = 1.318 + 0.026 + 0.637 = 1.98 = 3.0\,\mathrm{dB}$. The noisier but higher-gain LNA gives the better receiver. (The quantity that should be minimised for a stage is its **noise measure** $M = (F - 1)/(1 - 1/G)$, not $F$ alone.) With the filter first, its $2\,\mathrm{dB}$ loss adds directly: $F = 1.585 + 0.202/0.631 + 9/(0.631\times15.6) = 2.82$, or $4.5\,\mathrm{dB}$, which is why the LNA sits as close to the antenna as possible — unless a strong interferer forces a filter in front of it.
:::
:::

::: quiz
For an LNA, which choice of source reflection coefficient minimises the amplifier's own noise figure?
- [ ] $\Gamma_S = S_{11}^*$, the conjugate of the input reflection
- [ ] $\Gamma_S = 0$, a $50\,\Omega$ source
- [x] $\Gamma_S = \Gamma_{\text{opt}}$, a property of the device and its bias
- [ ] Whichever $\Gamma_S$ maximises the gain
::: solution
The noise figure depends only on $\Gamma_S$, through [[#eq-noise-figure]], and is minimised at $\Gamma_{\text{opt}}$, which is determined by the device's internal noise sources and their correlation. It generally differs from the conjugate match, so minimum noise and maximum gain cannot both be had; the input of an LNA designed for minimum noise is mismatched, which is one reason LNAs are often built as balanced pairs between hybrids.
:::
:::

## Linearity and dynamic range {#sec-linearity}

An amplifier is linear only for small signals. As the input grows the gain **compresses**, and two signals at nearby frequencies $f_1$, $f_2$ generate **intermodulation products**, of which the third-order products at $2f_1 - f_2$ and $2f_2 - f_1$ fall right next to the wanted signals and cannot be filtered out.

::: definition 1 dB compression point and third-order intercept {#def-ip3}
The **output 1 dB compression point** $P_{1\mathrm{dB}}$ is the output power at which the gain has fallen $1\,\mathrm{dB}$ below its small-signal value. For a two-tone test with equal tones, the fundamental output rises $1\,\mathrm{dB}$ per decibel of input and each third-order product $3\,\mathrm{dB}$ per decibel; the extrapolated lines meet at the **third-order intercept point**, with input coordinate $\mathrm{IIP3}$ and output coordinate $\mathrm{OIP3} = \mathrm{IIP3} + G$ (in dBm and dB). For a tone power $P_{\text{in}}$ the third-order product has output power

$$
P_{\mathrm{IM3}} = 3P_{\text{in}} - 2\,\mathrm{IIP3} + G\quad(\mathrm{dBm}) .
$$ {#eq-im3}
:::

For a memoryless cubic nonlinearity $y = a_1x + a_3x^3$, the input 1 dB compression point lies $9.6\,\mathrm{dB}$ below IIP3; real amplifiers are near that rule. The usable range lies between the noise floor and the level where intermodulation rises to the noise floor: the **spurious-free dynamic range** is $\mathrm{SFDR} = \tfrac23(\mathrm{IIP3} - N_{\text{in}})$ in decibels, where $N_{\text{in}}$ is the input-referred noise power in the bandwidth.

::: widget plot
f: x + G - 10*log10(1 + 10^((x - I + 3.73)/10)); 3*x - 2*I + G; x + G
x: -40, 15
y: -80, 40
sliders: G=15:0:30:0.5; I=0:-20:20:0.5
labels: P_{\text{out}}\ \text{(fundamental)}; P_{\mathrm{IM3}}; \text{small-signal line}
caption: Output power of the fundamental and of one third-order intermodulation product against input power per tone (all in dBm), for an amplifier of gain $G$ (dB) and input intercept $\mathrm{IIP3} = I$ (dBm). The IM3 line has slope $3$ and meets the extrapolated small-signal line at the intercept $(I, I + G)$, a point the real output never reaches because the amplifier compresses first (the fundamental curve here is an illustrative compression model with $P_{1\mathrm{dB}}$ about $9.6\,\mathrm{dB}$ below the intercept). Every $1\,\mathrm{dB}$ reduction of input power lowers the IM3 products by $3\,\mathrm{dB}$: backing off a little buys a lot of linearity.
:::

::: application Balanced amplifiers and power amplifiers
A **balanced amplifier** places two identical amplifiers between two quadrature hybrids ([[rf-microwave/passive-microwave-components]]). Reflections from the two amplifier inputs return to the input hybrid in antiphase at the input port and in phase at the isolated port, where they are absorbed: the combination is well matched even when each amplifier is designed for minimum noise or maximum power rather than match, it has $3\,\mathrm{dB}$ more output power and IP3, and it keeps working at reduced gain if one half fails. **Power amplifiers** are designed differently from small-signal ones: the output network presents a load-line impedance chosen from load-pull measurements for output power and efficiency, not a conjugate match, and modes such as class AB, F and Doherty combine efficiency with linearity.
:::

::: history
The S-parameter design methods of this chapter grew up with the microwave transistor. J. M. Rollett published his stability factor in 1962. Hewlett-Packard's application notes of the late 1960s, written as its network analysers made S-parameter measurement routine, popularised gain circles and the simultaneous conjugate match among designers. The noise-parameter description of two-ports — $F_{\min}$, an optimum source admittance and a noise resistance — was standardised by an IRE committee chaired by Herman Haus in 1960. GaAs MESFETs from the early 1970s and high-electron-mobility transistors from the 1980s brought LNA noise figures at $4$–$12\,\mathrm{GHz}$ below $1\,\mathrm{dB}$, making cheap satellite-television receivers possible, and the single-parameter $\mu$ test was published by Marion Lee Edwards and Jeffrey Sinsky in 1992.
:::

## Where this leads {#sec-next}

The noise figure and gain computed here enter the system noise temperature and link budget of [[rf-microwave/wireless-links-radar]]. Oscillators are amplifiers deliberately operated inside their stability circles ([[electronics-2/oscillators]]). Mixers, power amplifiers and full radio front ends are the next step in an RF integrated-circuit course, where the same S-parameter and noise-circle tools are applied to on-chip inductors and CMOS transistors.

::: summary
- $G_T = \abs{S_{21}}^2(1 - \abs{\Gamma_S}^2)(1 - \abs{\Gamma_L}^2)/(\abs{1 - \Gamma_S\Gamma_{\text{in}}}^2\abs{1 - S_{22}\Gamma_L}^2)$; for a unilateral device $G_{TU} = G_SG_0G_L$.
- Stability circles mark the $\Gamma_L$ (or $\Gamma_S$) for which $\abs{\Gamma_{\text{in}}} = 1$ (or $\abs{\Gamma_{\text{out}}} = 1$); unconditional stability $\Leftrightarrow K > 1$ and $\abs\Delta < 1$, or $\mu > 1$. Check over the whole band.
- A stable device can be simultaneously conjugately matched, giving $G_{T,\max} = (\abs{S_{21}}/\abs{S_{12}})(K - \sqrt{K^2 - 1})$; the matching networks present $\Gamma_S$ and $\Gamma_L$.
- Constant-gain circles (unilateral) allow a specified gain; their centres lie towards $S_{11}^*$ and $S_{22}^*$.
- The noise figure depends only on $\Gamma_S$: $F = F_{\min} + (4R_N/Z_0)\abs{\Gamma_S - \Gamma_{\text{opt}}}^2/[(1 - \abs{\Gamma_S}^2)\abs{1 + \Gamma_{\text{opt}}}^2]$; noise circles show the trade with gain, and system noise figure, not stage noise figure, is what to minimise.
- Linearity is specified by $P_{1\mathrm{dB}}$ and IP3; third-order products grow $3\,\mathrm{dB}$ per decibel of input.
:::

## Exercises

::: exercise Unilateral gain {level=1 check="10*log10(9/((1 - 0.36)*(1 - 0.3025)))"}
A unilateral transistor has $\abs{S_{11}} = 0.6$, $\abs{S_{21}} = 3$, $\abs{S_{22}} = 0.55$. What is the maximum unilateral transducer gain, in decibels?
::: solution
$G_{TU,\max} = \abs{S_{21}}^2/[(1 - \abs{S_{11}}^2)(1 - \abs{S_{22}}^2)] = 9/(0.64\times0.6975) = 20.2$, i.e. $13.0\,\mathrm{dB}$: $9.5\,\mathrm{dB}$ from the device plus $1.9\,\mathrm{dB}$ from the input match and $1.6\,\mathrm{dB}$ from the output match.
:::
:::

::: exercise Maximum stable gain {level=1 check="10*log10(5/0.05)"}
A transistor has $\abs{S_{21}} = 5$ and $\abs{S_{12}} = 0.05$ at some frequency, where $K < 1$. What is its maximum stable gain in decibels?
::: solution
$\mathrm{MSG} = \abs{S_{21}}/\abs{S_{12}} = 100$, i.e. $20\,\mathrm{dB}$. (It is a power ratio of $100$, so $10\log_{10}$ applies.) Achieving it requires stabilising the device so that $K = 1$.
:::
:::

::: exercise Third-order products {level=1 check="3*(-20) - 2*10 + 15"}
An amplifier with $G = 15\,\mathrm{dB}$ and $\mathrm{IIP3} = +10\,\mathrm{dBm}$ is driven by two tones of $-20\,\mathrm{dBm}$ each. Find the output power of each third-order product, in dBm.
::: solution
By [[#eq-im3]], $P_{\mathrm{IM3}} = 3(-20) - 2(10) + 15 = -65\,\mathrm{dBm}$, while each fundamental is at $-5\,\mathrm{dBm}$: the products are $60\,\mathrm{dB}$ below, i.e. $2(\mathrm{IIP3} - P_{\text{in}})$.
:::
:::

::: exercise Rollett factor {level=2 check="(1 - 0.25 - 0.16 + 0.1^2)/(2*0.1*2)"}
A transistor has $\abs{S_{11}} = 0.5$, $\abs{S_{22}} = 0.4$, $\abs{S_{12}S_{21}} = 0.2$ (with $\abs{S_{21}} = 2$, $\abs{S_{12}} = 0.1$) and $\abs\Delta = 0.1$. Find $K$. Is it unconditionally stable?
::: solution
$K = (1 - 0.25 - 0.16 + 0.01)/(2\times0.2) = 0.60/0.4 = 1.5 > 1$, and $\abs\Delta = 0.1 < 1$: unconditionally stable.
:::
:::

::: exercise A noise circle {level=2 check="0.5/(1 + 0.5)"}
A device has $F_{\min} = 1.0$ (linear $1.259$), $\Gamma_{\text{opt}} = 0.5$ (real), and $R_N/Z_0 = 0.25$. For the noise figure $F_i$ with $N = 0.5$, find the magnitude of the noise circle's centre and its radius. What $F_i$ is that, in decibels?
::: solution
$C_F = 0.5/1.5 = 0.333$ and $R_F = \sqrt{0.5(1.5 - 0.25)}/1.5 = \sqrt{0.625}/1.5 = 0.527$. From $N = (F_i - F_{\min})\abs{1 + \Gamma_{\text{opt}}}^2/(4R_N/Z_0) = (F_i - 1.259)(2.25)/1$, $F_i = 1.259 + 0.222 = 1.481$, i.e. $1.71\,\mathrm{dB}$.
:::
:::

::: exercise Gain circle {level=2}
For the unilateral approximation of the transistor in [[#ex-max-gain]] ($\abs{S_{11}} = 0.60$, $\angle S_{11} = -150^\circ$), find the centre and radius of the input constant-gain circle for $G_S$ one decibel below its maximum.
::: solution
$G_{S,\max} = 1/(1 - 0.36) = 1.5625$ ($1.94\,\mathrm{dB}$), so $G_S = 0.94\,\mathrm{dB} = 1.241$ and $g_s = 1.241\times0.64 = 0.794$. Then $1 - (1 - g_s)\abs{S_{11}}^2 = 1 - 0.206\times0.36 = 0.926$, $C_s = 0.794\times0.60\angle150^\circ/0.926 = 0.515\angle150^\circ$ and $R_s = \sqrt{0.206}\times0.64/0.926 = 0.313$. Any $\Gamma_S$ on this circle gives $0.94\,\mathrm{dB}$ of input mismatch gain; a designer seeking low noise would pick the point closest to $\Gamma_{\text{opt}}$.
:::
:::

::: exercise Noise measure {level=3}
Show that for two amplifiers A and B in cascade, the order AB gives a lower total noise figure than BA if and only if $M_A < M_B$, where $M = (F - 1)/(1 - 1/G)$ is the noise measure. Use it to decide the order of an amplifier with $F = 2\,\mathrm{dB}$, $G = 10\,\mathrm{dB}$ and one with $F = 1.5\,\mathrm{dB}$, $G = 6\,\mathrm{dB}$.
::: solution
$F_{AB} = F_A + (F_B - 1)/G_A$ and $F_{BA} = F_B + (F_A - 1)/G_B$. $F_{AB} < F_{BA}$ means $(F_A - 1) - (F_A - 1)/G_B < (F_B - 1) - (F_B - 1)/G_A$, i.e. $(F_A - 1)(1 - 1/G_B) < (F_B - 1)(1 - 1/G_A)$. Dividing both sides by $(1 - 1/G_A)(1 - 1/G_B) > 0$ gives $M_A < M_B$. For the numbers: A: $F = 1.585$, $G = 10$, $M_A = 0.585/0.9 = 0.650$; B: $F = 1.413$, $G = 3.98$, $M_B = 0.413/0.749 = 0.551$. So B (the quieter, lower-gain stage) should come first: $F_{BA} = 1.413 + 0.585/3.98 = 1.560$ ($1.93\,\mathrm{dB}$) against $F_{AB} = 1.585 + 0.413/10 = 1.626$ ($2.11\,\mathrm{dB}$).
:::
:::

::: exercise Stability circle of a resistively loaded device {level=3}
Derive [[#eq-stab-circle]] in full, including the identity $\abs{S_{22} - \Delta S_{11}^*}^2 - (\abs{S_{22}}^2 - \abs\Delta^2)(1 - \abs{S_{11}}^2) = \abs{S_{12}S_{21}}^2$. Then show that a unilateral device ($S_{12} = 0$) with $\abs{S_{11}} < 1$ and $\abs{S_{22}} < 1$ is always unconditionally stable.
::: hint
Expand $\abs{S_{22} - \Delta S_{11}^*}^2$ with $\Delta = S_{11}S_{22} - S_{12}S_{21}$ and collect terms in $\abs{S_{11}}^2\abs{S_{22}}^2$.
:::
::: solution
The circle follows as in the proof of [[#thm-stability-circles]]. For the identity, write $\abs{S_{22} - \Delta S_{11}^*}^2 = \abs{S_{22}}^2 - 2\mathrm{Re}(S_{22}^*\Delta S_{11}^*) + \abs\Delta^2\abs{S_{11}}^2$ and $(\abs{S_{22}}^2 - \abs\Delta^2)(1 - \abs{S_{11}}^2) = \abs{S_{22}}^2 - \abs{S_{22}}^2\abs{S_{11}}^2 - \abs\Delta^2 + \abs\Delta^2\abs{S_{11}}^2$. The difference is $\abs\Delta^2 + \abs{S_{11}S_{22}}^2 - 2\mathrm{Re}(\Delta S_{11}^*S_{22}^*) = \abs{\Delta - S_{11}S_{22}}^2 = \abs{S_{12}S_{21}}^2$. For a unilateral device $R_L = 0$, so the "circle" is a point; more directly, $\Gamma_{\text{in}} = S_{11}$ for every load, with $\abs{S_{11}} < 1$, and $\Gamma_{\text{out}} = S_{22}$ for every source. No termination can produce a reflection gain, so the device is unconditionally stable ($K\to\infty$ as $S_{12}\to0$).
:::
:::

::: exercise Designing for a specified gain {level=3}
Using the unilateral approximation for the transistor of [[#ex-max-gain]], design an amplifier with $G_T = 12\,\mathrm{dB}$ by conjugately matching the output and choosing $\Gamma_S$ on a gain circle. Which point on the circle would you pick, and why? Estimate the error of the unilateral approximation.
::: solution
$G_0 = 9.54\,\mathrm{dB}$ and, with the output conjugately matched to $S_{22}$, $G_L = 1/(1 - 0.3025) = 1.56\,\mathrm{dB}$. So $G_S = 12 - 9.54 - 1.56 = 0.90\,\mathrm{dB}$, almost the circle of the previous exercise: $g_s = 10^{0.09}\times0.64 = 0.787$, $C_s = 0.511\angle150^\circ$, $R_s = 0.319$. Any point on it gives $12\,\mathrm{dB}$; the natural choices are the point nearest the chart centre (smallest $\abs{\Gamma_S}$, hence lowest network $Q$ and widest bandwidth, at $\abs{C_s} - R_s = 0.19$ along the $150^\circ$ direction) or the point nearest $\Gamma_{\text{opt}}$ for low noise. With $U = 0.089$, the true gain lies between $1/(1.089)^2$ and $1/(0.911)^2$ times the unilateral value, i.e. within about $-0.74$ to $+0.81\,\mathrm{dB}$, so the design would be checked and tuned with the full bilateral formula [[#eq-gt]].
:::
:::
