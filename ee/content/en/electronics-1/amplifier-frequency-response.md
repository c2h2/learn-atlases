The amplifiers of the previous chapters have gains that do not depend on frequency. Real ones do. Drive the common-emitter amplifier of [[electronics-1/small-signal-amplifiers#ex-ce-complete]] with a $10\,\mathrm{Hz}$ signal and its gain has fallen, because its coupling and bypass capacitors no longer look like short circuits; drive it at $50\,\mathrm{MHz}$ and the gain has fallen again, because the tiny capacitances inside the transistor, which we ignored, now carry significant current. Between the two lies the **midband**, where our resistive analyses hold. Its width — the amplifier's **bandwidth** — is one of the most important specifications in electronics: it decides whether an audio amplifier reproduces cymbals, whether a camera's readout keeps up with its pixels, and whether a radio receiver can amplify its carrier at all.

This chapter extends the small-signal method to include capacitances. The mathematical tools are those of [[circuits-2/frequency-response]] — transfer functions, poles and zeros, Bode plots — and the Laplace methods of [[circuits-2/laplace-circuit-analysis]]. What electronics adds is a set of physical models for the capacitances of transistors and, above all, *approximation methods* that let a designer find the bandwidth of a real circuit with many capacitors without solving it exactly: dominant poles, the Miller effect and the methods of short-circuit and open-circuit time constants. We apply them to the single- and multistage amplifiers of [[electronics-1/single-stage-amplifiers]] and [[electronics-1/multistage-amplifiers]].

## The three frequency bands

For a capacitively coupled amplifier the gain as a function of complex frequency $s$ can usually be factored as

$$
A(s) = A_M\,F_L(s)\,F_H(s),
$$ {#eq-three-bands}

where $A_M$ is the midband gain, $F_L(s)$ describes the low-frequency roll-off caused by coupling and bypass capacitors (it tends to $1$ for $s \to \infty$), and $F_H(s)$ describes the high-frequency roll-off caused by transistor and wiring capacitances (it tends to $1$ for $s \to 0$). The factorisation works because the two sets of capacitors are typically many decades apart in value — microfarads against picofarads or femtofarads — so that at low frequencies the small capacitors are open circuits and at high frequencies the large capacitors are short circuits.

::: definition Lower and upper cut-off frequencies {#def-cutoffs}
The **lower** and **upper $3\,\mathrm{dB}$ frequencies** $f_L$ and $f_H$ are the frequencies at which $\abs{A(j\omega)}$ has fallen to $A_M/\sqrt2$. The **bandwidth** is $f_H - f_L \approx f_H$ when $f_L \ll f_H$, and the **gain–bandwidth product** is $A_M f_H$. A direct-coupled amplifier has $f_L = 0$.
:::

If one pole of $F_H(s)$ lies far below all the other poles and zeros (by a factor of four or more), it is a **dominant pole** $\omega_P$, and $F_H(s) \approx 1/(1 + s/\omega_P)$ with $\omega_H \approx \omega_P$. The same holds at low frequencies for a pole far above the others. Much of amplifier design consists of arranging for, or estimating, a dominant pole.

## Low-frequency response

At low frequencies the transistors' internal capacitances are open circuits, and the small-signal circuit contains resistors, controlled sources and the large external capacitors.

### Coupling capacitors

A coupling capacitor $C_C$ between a source of Thévenin resistance $R_1$ and a load $R_2$ forms a high-pass network with transfer function $sC_C R_2/(1 + sC_C(R_1 + R_2))$ ([[circuits-2/frequency-response]]): a zero at the origin and a pole at

$$
\omega_C = \frac{1}{C_C(R_1 + R_2)}.
$$

The resistance that matters is the total resistance *seen by the capacitor* with the signal source set to zero.

### Bypass capacitors

A capacitor $C_S$ across a source resistor $R_S$ of a CS stage is the bypass capacitor. At midband it grounds the source; at low frequencies it does not, and the stage becomes degenerated. The source-node impedance is $R_S\parallel(1/sC_S)$, and by [[electronics-1/single-stage-amplifiers#thm-cs-degen]] the gain is $-g_mR_D/(1 + g_mZ_S)$. Working this out gives a zero at $\omega_Z = 1/(C_SR_S)$ and a pole at

$$
\omega_P = \frac{1 + g_mR_S}{C_SR_S} = \frac{1}{C_S\,(R_S\parallel 1/g_m)}.
$$

Again, the pole is $1/(CR)$ with $R$ the resistance the capacitor sees — here $R_S$ in parallel with the resistance $1/g_m$ looking into the source. Because $1/g_m$ is small, the bypass capacitor sees a small resistance and needs to be large. For the BJT, the resistance seen by an emitter bypass capacitor is $R_E\parallel\bigl(r_e + R_{\text{sig}}'/(\beta + 1)\bigr)$, where $R_{\text{sig}}'$ is the resistance in the base circuit: tens of ohms.

### The method of short-circuit time constants

With several capacitors the low-frequency poles interact, and the exact transfer function is tedious. A good estimate is available.

::: theorem Short-circuit time constants {#thm-sctc}
For an amplifier whose low-frequency response is determined by capacitors $C_1, \dots, C_n$ (all other capacitors absent), let $R_i^{s}$ be the resistance seen by $C_i$ when the signal source is set to zero and **all other** low-frequency capacitors are replaced by **short circuits**. Then

$$
\omega_L \approx \sum_{i=1}^{n}\frac{1}{C_iR_i^{s}}.
$$ {#eq-sctc}

The estimate is exact for the sum of the poles of $F_L(s)$ when the zeros are at the origin, and it is close to $\omega_L$ when one pole dominates; otherwise it is an overestimate, so a design based on it is conservative.
:::

::: proof {collapsed}
Write $F_L(s) = N(s)/D(s)$ with $D(s) = s^n + a_{n-1}s^{n-1} + \cdots + a_0$. For a network in which each capacitor appears only in admittances $sC_i$, a determinant argument shows that the coefficient $a_{n-1}$, which equals the sum of the pole magnitudes $\sum\omega_{p,k}$, is $\sum_i 1/(C_iR_i^{s})$: setting all capacitors but one to infinity (short circuits) and letting $s \to \infty$ isolates each capacitor's contribution. If one pole $\omega_{p1}$ is much larger than the others and the zeros are well below it, then $\omega_L \approx \omega_{p1} \approx \sum\omega_{p,k}$. A full derivation is given by Gray, Hurst, Lewis and Meyer, Chapter 7.
:::

::: example Choosing the capacitors of a CE amplifier {#ex-lf-design}
For the CE amplifier of [[electronics-1/small-signal-amplifiers#ex-ce-complete]] ($R_{\text{sig}} = 2\,\mathrm{k\Omega}$, $R_B = 28.9\,\mathrm{k\Omega}$, $r_\pi = 5.39\,\mathrm{k\Omega}$, $I_E = 0.970\,\mathrm{mA}$, $\beta = 200$, $R_E = 3.9\,\mathrm{k\Omega}$ bypassed, $R_C = 3.9\,\mathrm{k\Omega}$, $R_L = 10\,\mathrm{k\Omega}$), choose the input coupling capacitor $C_{C1}$, the emitter bypass capacitor $C_E$ and the output coupling capacitor $C_{C2}$ for $f_L \approx 50\,\mathrm{Hz}$. Neglect $r_o$.
::: solution
**Resistances seen (others shorted).**
- $C_{C1}$: $R_{\text{sig}} + R_B\parallel r_\pi = 2 + 4.54 = 6.54\,\mathrm{k\Omega}$.
- $C_E$: $r_e = 26.8\,\Omega$ and $(R_{\text{sig}}\parallel R_B)/(\beta + 1) = 1871/201 = 9.3\,\Omega$, so $R_E\parallel(26.8 + 9.3) = 3900\parallel36.1 = 35.8\,\Omega$.
- $C_{C2}$: $R_C + R_L = 13.9\,\mathrm{k\Omega}$.

**Allocation.** $C_E$ sees by far the smallest resistance and would need the largest capacitor for a given pole, so let it set the dominant pole, say $40\,\mathrm{Hz}$, and put the coupling-capacitor poles at about $5\,\mathrm{Hz}$ each:

$$
C_E = \frac{1}{2\pi\times40\times35.8} = 111\,\mathrm{\mu F}, \quad C_{C1} = \frac{1}{2\pi\times5\times6540} = 4.87\,\mathrm{\mu F}, \quad C_{C2} = \frac{1}{2\pi\times5\times13\,900} = 2.29\,\mathrm{\mu F}.
$$

With standard values $C_E = 120\,\mathrm{\mu F}$, $C_{C1} = 4.7\,\mathrm{\mu F}$, $C_{C2} = 2.2\,\mathrm{\mu F}$, the three terms of [[#eq-sctc]] are $37.1$, $5.2$ and $5.2\,\mathrm{Hz}$, so $f_L \approx 47\,\mathrm{Hz}$. Putting the dominant pole on $C_{C1}$ instead would need only $0.61\,\mathrm{\mu F}$ there, but $C_E$ would then need $890\,\mathrm{\mu F}$ to keep its own pole at $5\,\mathrm{Hz}$; letting the capacitor that sees the smallest resistance set the dominant pole minimises the total capacitance.
:::
:::

::: widget plot
f: 20*log10(abs(x/sqrt(x^2 + fE^2))*abs(x/sqrt(x^2 + fc^2))^2)
x: 1, 500
y: -40, 3
sliders: fE=37:5:100:1; fc=5.2:1:20:0.1
labels: \lvert F_L\rvert\ (\mathrm{dB})
caption: Low-frequency response (dB) against frequency (Hz) modelled as one pole at $f_E$ (the bypass capacitor) and two equal coupling poles at $f_c$, each with its zero at the origin — the design of [[#ex-lf-design]]. The $-3\,\mathrm{dB}$ point lies a little above $f_E$, because the coupling poles add to it. Move $f_c$ up towards $f_E$ and watch the cut-off rise towards the sum $f_E + 2f_c$ estimated by [[#eq-sctc]].
:::

## High-frequency transistor models

At high frequencies the charges stored in a transistor cannot follow the signal instantly, and the device is modelled by adding capacitances to the small-signal models.

::: definition High-frequency small-signal models {#def-hf-models}
- **MOSFET**: the gate–source capacitance $C_{gs}$ (in saturation about $\tfrac23WLC_{ox}$ plus overlap), the gate–drain capacitance $C_{gd}$ (overlap only, much smaller), and junction capacitances $C_{db}$ and $C_{sb}$ from drain and source to the body, added to the model of [[electronics-1/small-signal-amplifiers#def-mos-params]].
- **BJT**: the **hybrid-π model** with $C_\pi$ from base to emitter (diffusion capacitance $g_m\tau_F$ plus the emitter-junction depletion capacitance), $C_\mu$ from base to collector (the collector-junction depletion capacitance), a series base resistance $r_x$ (tens to hundreds of ohms), and the collector–substrate capacitance $C_{cs}$ in integrated transistors.
:::

A single figure of merit summarises the speed of a transistor.

::: theorem Transition frequency {#thm-ft}
The short-circuit current gain $h_{fe}(j\omega) = i_c/i_b$ of a BJT (with the collector at signal ground) is

$$
h_{fe}(s) = \frac{g_m - sC_\mu}{1/r_\pi + s(C_\pi + C_\mu)} \approx \frac{\beta}{1 + s\,r_\pi(C_\pi + C_\mu)},
$$

and its magnitude falls to $1$ at the **transition frequency**

$$
f_T = \frac{g_m}{2\pi(C_\pi + C_\mu)} \quad\text{(BJT)}, \qquad f_T = \frac{g_m}{2\pi(C_{gs} + C_{gd})} \quad\text{(MOSFET)}.
$$ {#eq-ft}
:::

::: proof
With the collector shorted to the emitter, $C_\mu$ is in parallel with $C_\pi$ as far as the base node is concerned. A base current $i_b$ develops $v_\pi = i_b/\bigl(1/r_\pi + s(C_\pi + C_\mu)\bigr)$, and the collector current is $g_mv_\pi$ minus the current $sC_\mu v_\pi$ that $C_\mu$ carries from base to collector, which gives $h_{fe}(s)$. The zero at $g_m/C_\mu$ is far above $f_T$ and can be ignored. The pole is at $\omega_\beta = 1/[r_\pi(C_\pi + C_\mu)]$, and above it $\abs{h_{fe}} \approx \beta\omega_\beta/\omega = g_m/[\omega(C_\pi + C_\mu)]$, which equals $1$ at $\omega_T = g_m/(C_\pi + C_\mu)$. For the MOSFET the same argument applies with $r_\pi \to \infty$ (the gate draws no DC current, so $\abs{h_{fe}}$ falls as $1/\omega$ at all frequencies).
:::

For a long-channel MOSFET, $g_m = \mu_nC_{ox}(W/L)V_{OV}$ and $C_{gs} \approx \tfrac23WLC_{ox}$, so $f_T \approx \frac{3\mu_nV_{OV}}{4\pi L^2}$: speed improves with the square of the shrinking channel length and in proportion to overdrive — another trade-off against $g_m/I_D$. As of 2026, the fastest silicon–germanium heterojunction bipolar transistors in production reach $f_T$ of around $400$–$500\,\mathrm{GHz}$, and nanometre CMOS transistors reach a few hundred gigahertz; a discrete small-signal BJT such as the 2N3904 has $f_T \approx 300\,\mathrm{MHz}$.

::: warning $f_T$ is not the bandwidth of your amplifier
$f_T$ is measured with the output short-circuited, so no voltage gain is developed and no load capacitance is charged. An amplifier built from a transistor with $f_T = 10\,\mathrm{GHz}$ that gives a voltage gain of $20$ into a real load will have a bandwidth that is a small fraction of $f_T/20$, often by a further factor of several because of the Miller effect and the load and wiring capacitances. Use $f_T$ to compare technologies, not to predict a circuit's bandwidth.
:::

::: quiz
A transistor's $f_T$ doubles when its overdrive is doubled at the same channel length. Why do designers not simply run every transistor at high overdrive?
- [ ] Because $f_T$ does not affect bandwidth.
- [x] Because at a fixed current, higher overdrive lowers $g_m = 2I_D/V_{OV}$, and with it the gain and the gain–bandwidth product into a fixed load capacitance.
- [ ] Because high overdrive pushes the transistor into triode.
- [ ] Because $C_{gs}$ grows with overdrive.
::: solution
$f_T \approx 3\mu_nV_{OV}/(4\pi L^2)$ rises with overdrive, but only because the transistor becomes smaller (lower $W/L$, less $C_{gs}$) for the same current. Its transconductance $2I_D/V_{OV}$ falls, so a stage whose bandwidth is set by an external load capacitance gets slower ($\mathrm{GBW} = g_m/2\pi C_L$) and has less gain. Overdrive trades intrinsic speed against transconductance efficiency; which matters more depends on whether the device's own capacitances or the load dominate.
:::
:::

## The Miller effect

In a CS or CE stage, the capacitance $C_{gd}$ (or $C_\mu$) connects the input to the inverting output. Its effect on the input is far larger than its size suggests.

::: theorem Miller's theorem {#thm-miller}
Let an impedance $Z$ connect two nodes of a circuit whose voltages are related by $V_2 = KV_1$. As far as the currents into the two nodes are concerned, $Z$ may be replaced by an impedance $Z_1 = Z/(1 - K)$ from node 1 to ground and an impedance $Z_2 = Z/(1 - 1/K)$ from node 2 to ground. For a capacitance $C$ and an inverting gain $K = -A$,

$$
C_1 = C(1 + A), \qquad C_2 = C\left(1 + \frac1A\right) \approx C.
$$ {#eq-miller}
:::

::: proof
The current through $Z$ from node 1 to node 2 is $(V_1 - V_2)/Z = V_1(1 - K)/Z$, which is the current that $Z_1 = Z/(1 - K)$ would draw from node 1 to ground. Seen from node 2, the current leaving through $Z$ is $(V_2 - V_1)/Z = V_2(1 - 1/K)/Z$, which is the current into $Z_2$. The replacement is exact *if* $K$ is known; the approximation lies in using the midband gain for $K$, ignoring the fact that $K$ itself depends on frequency and on $Z$.
:::

For a CS stage with load $R_L'$ the gate-to-drain gain at midband is $K = -g_mR_L'$, so the input sees

$$
C_{\text{in}} = C_{gs} + C_{gd}(1 + g_mR_L').
$$ {#eq-miller-cin}

A $10\,\mathrm{fF}$ overlap capacitance in a stage with a gain of $20$ looks like $210\,\mathrm{fF}$ — usually much more than $C_{gs}$ itself. The physical reason: when the input rises by $1\,\mathrm{mV}$, the output falls by $20\,\mathrm{mV}$, so the voltage across $C_{gd}$ changes by $21\,\mathrm{mV}$ and the input must supply $21$ times the charge. This **Miller multiplication** is usually the dominant bandwidth limit of high-gain inverting stages.

::: example A CS stage at high frequency {#ex-cs-hf}
A CS stage with $g_m = 2\,\mathrm{mS}$ and a total load $R_L' = 10\,\mathrm{k\Omega}$ (gain $-20$) is driven from $R_{\text{sig}} = 10\,\mathrm{k\Omega}$. The transistor has $C_{gs} = 50\,\mathrm{fF}$ and $C_{gd} = 10\,\mathrm{fF}$, and the output node has a load capacitance $C_L = 50\,\mathrm{fF}$. Estimate the input and output poles with the Miller approximation, and the transistor's $f_T$.
::: solution
**Input pole.** By [[#eq-miller-cin]], $C_{\text{in}} = 50 + 10\times21 = 260\,\mathrm{fF}$, and with $R_{\text{sig}}$: $f_{p,\text{in}} = 1/(2\pi\times10^4\times260\times10^{-15}) = 61.2\,\mathrm{MHz}$.

**Output pole.** The output node sees $C_L + C_{gd}(1 + 1/20) = 60.5\,\mathrm{fF}$ and $R_L'$: $f_{p,\text{out}} = 1/(2\pi\times10^4\times60.5\times10^{-15}) = 263\,\mathrm{MHz}$.

The input pole is dominant, so the Miller estimate is $f_H \approx 61\,\mathrm{MHz}$. The transistor's transition frequency is $f_T = 2\times10^{-3}/(2\pi\times60\times10^{-15}) = 5.3\,\mathrm{GHz}$: the amplifier's bandwidth is about $1\,\%$ of $f_T$. We shall check this estimate against the exact answer next.
:::
:::

## Exact analysis of the CS stage

For the CS stage with $C_{gs}$, $C_{gd}$ and $C_L$, nodal analysis at the gate and drain gives a second-order transfer function. It shows both the strength and the limits of the Miller approximation.

::: proposition High-frequency transfer function of the CS stage {#prop-cs-hf}
With source resistance $R_{\text{sig}}$, load $R_L'$ and capacitances $C_{gs}$, $C_{gd}$, $C_L$,

$$
\frac{V_o}{V_{\text{sig}}} = -g_mR_L'\,\frac{1 - sC_{gd}/g_m}{1 + b_1s + b_2s^2},
$$ {#eq-cs-hf}

with

$$
b_1 = R_{\text{sig}}\bigl[C_{gs} + C_{gd}(1 + g_mR_L')\bigr] + R_L'(C_{gd} + C_L), \qquad b_2 = R_{\text{sig}}R_L'(C_{gs}C_{gd} + C_{gs}C_L + C_{gd}C_L).
$$
:::

::: proof {collapsed}
KCL at the gate ($V_g$) and drain ($V_o$):

$$
\frac{V_g - V_{\text{sig}}}{R_{\text{sig}}} + sC_{gs}V_g + sC_{gd}(V_g - V_o) = 0, \qquad g_mV_g + \frac{V_o}{R_L'} + sC_LV_o + sC_{gd}(V_o - V_g) = 0.
$$

From the second, $V_g(g_m - sC_{gd}) = -V_o(1/R_L' + sC_L + sC_{gd})$. Substituting into the first and clearing fractions gives a numerator $-(g_m - sC_{gd})R_L'$ and the denominator $1 + b_1s + b_2s^2$ after multiplying out; the details are routine algebra (verify them with a computer algebra system).
:::

The **zero** at $s = +g_m/C_{gd}$ is in the right half-plane: at very high frequency the signal fed forward through $C_{gd}$ exceeds the transistor's own current and the inversion disappears. For our example it lies at $g_m/(2\pi C_{gd}) = 32\,\mathrm{GHz}$, far out of the way. If the two poles are widely separated, $b_1 \approx 1/\omega_{p1}$; and $b_1$ is exactly the Miller input time constant $R_{\text{sig}}C_{\text{in}}$ *plus* a term $R_L'(C_{gd} + C_L)$ that the input-only Miller estimate omits.

::: example Exact versus Miller {#ex-cs-exact}
For [[#ex-cs-hf]], compute $b_1$, $b_2$, the two poles and the exact $3\,\mathrm{dB}$ frequency.
::: solution
$b_1 = 10^4(50 + 210)\times10^{-15} + 10^4(10 + 50)\times10^{-15} = 2.6\,\mathrm{ns} + 0.6\,\mathrm{ns} = 3.2\,\mathrm{ns}$, and $b_2 = 10^8\times(500 + 2500 + 500)\times10^{-30} = 3.5\times10^{-19}\,\mathrm{s^2}$. The roots of $1 + b_1s + b_2s^2$ are at $f_{p1} = 51.6\,\mathrm{MHz}$ and $f_{p2} = 1.40\,\mathrm{GHz}$, and solving $\abs{A(j\omega)} = A_M/\sqrt2$ numerically gives $f_H = 51.5\,\mathrm{MHz}$.

The Miller estimate of $61\,\mathrm{MHz}$ was $19\,\%$ optimistic. The reason is the output node: near the input pole, the gain from gate to drain is already reduced by the output time constant, but the dominant-pole estimate $1/(2\pi b_1) = 49.7\,\mathrm{MHz}$, which includes it, is within $4\,\%$. The exact second pole, at $1.4\,\mathrm{GHz}$, is not the Miller "output pole" of $263\,\mathrm{MHz}$: the two poles **split**, a phenomenon exploited deliberately in the compensation of operational amplifiers ([[electronics-2/stability-compensation]]).
:::
:::

::: widget plot
f: 20*log10(20*sqrt(1 + (2*pi*10^x*Cgd*1e-15/2e-3)^2)/sqrt((1 - (2*pi*10^x)^2*Rs*1e3*1e4*(50*Cgd + 50*50 + Cgd*50)*1e-30)^2 + (2*pi*10^x*(Rs*1e3*(50 + Cgd*21) + 1e4*(Cgd + 50))*1e-15)^2))
x: 5, 10
y: -20, 30
sliders: Rs=10:1:50:0.5; Cgd=10:1:30:0.5
labels: \lvert A(j\omega)\rvert\ (\mathrm{dB})
caption: Exact frequency response of the CS stage of [[#ex-cs-hf]] ($g_m = 2\,\mathrm{mS}$, $R_L' = 10\,\mathrm{k\Omega}$, $C_{gs} = C_L = 50\,\mathrm{fF}$), in dB against $\log_{10}(f/\mathrm{Hz})$, with source resistance $R_{\text{sig}}$ (kΩ) and $C_{gd}$ (fF) adjustable. The midband gain is $26\,\mathrm{dB}$ and the $3\,\mathrm{dB}$ point is at $\log_{10}f \approx 7.7$ ($51\,\mathrm{MHz}$). Double $C_{gd}$ and the bandwidth nearly halves: the Miller term dominates. Raise $R_{\text{sig}}$ and the bandwidth falls in proportion.
:::

## The method of open-circuit time constants

For circuits with more capacitors there is no closed-form answer, but the dominant-pole estimate $\omega_H \approx 1/b_1$ generalises.

::: theorem Open-circuit time constants {#thm-octc}
For an amplifier whose high-frequency response is set by capacitors $C_1, \dots, C_n$, let $R_i^{o}$ be the resistance seen by $C_i$ with the signal source set to zero and **all other** high-frequency capacitors **open-circuited**. Then the coefficient of $s$ in the denominator of $F_H(s)$ is $b_1 = \sum_i C_iR_i^{o}$, and if there is a dominant pole and no significant low-frequency zeros,

$$
\omega_H \approx \frac{1}{\sum_{i=1}^{n} C_iR_i^{o}}.
$$ {#eq-octc}

The estimate is conservative (it underestimates $\omega_H$).
:::

::: proof {collapsed}
Writing the denominator as $\prod(1 + s/\omega_{p,k}) = 1 + s\sum 1/\omega_{p,k} + \cdots$, the coefficient $b_1 = \sum 1/\omega_{p,k}$. For a network with capacitors $C_i$ and otherwise resistive elements and controlled sources, $b_1$ can be shown (by expanding the network determinant to first order in the capacitances) to equal $\sum_i C_iR_i^{o}$ — each capacitor's contribution being computed as if it were the only one. If one pole dominates, $1/\omega_{p1} \approx b_1$. The result, due to Thornton, Searle and colleagues at MIT in the mid-1960s, is derived in Gray, Hurst, Lewis and Meyer, Chapter 7.
:::

The method has two great advantages: each $R_i^o$ is a resistive calculation, and the sum shows *which capacitor limits the bandwidth*, so the designer knows what to fix. For a capacitor between two nodes neither of which is grounded — the troublesome $C_{gd}$ — a test-current calculation gives the following useful result.

::: proposition Resistance seen by the gate–drain capacitance {#prop-rgd}
In a CS stage with resistance $R_G$ at the gate and $R_L'$ at the drain (other capacitors open), the resistance seen by $C_{gd}$ is

$$
R_{gd}^{o} = R_G + R_L' + g_mR_GR_L'.
$$ {#eq-rgd}
:::

::: proof
Drive a test current $i_x$ into the drain end of $C_{gd}$'s terminals and out of the gate end — that is, into the drain node and out of the gate node. The gate node then carries $-i_x$ into $R_G$, so $v_g = -i_xR_G$. KCL at the drain: $i_x = g_mv_g + v_d/R_L'$, so $v_d = R_L'(i_x - g_mv_g) = R_L'i_x(1 + g_mR_G)$. The voltage across the test source is $v_d - v_g = i_x\bigl[R_L'(1 + g_mR_G) + R_G\bigr]$, which gives [[#eq-rgd]].
:::

For [[#ex-cs-hf]]: $R_{gs}^o = 10\,\mathrm{k\Omega}$, $R_{gd}^o = 10 + 10 + 2\times10\times10 = 220\,\mathrm{k\Omega}$ and $R_L^o = 10\,\mathrm{k\Omega}$, so the three time constants are $0.5$, $2.2$ and $0.5\,\mathrm{ns}$. Their sum is $b_1 = 3.2\,\mathrm{ns}$ ($f_H \approx 49.7\,\mathrm{MHz}$), and $C_{gd}$ alone accounts for $69\,\%$ of it.

::: quiz
In the stage of [[#ex-cs-hf]], which single change would raise the bandwidth most?
- [ ] Halving $C_L$.
- [ ] Halving $C_{gs}$.
- [x] Halving $R_{\text{sig}}$.
- [ ] Doubling $g_m$ at constant $R_L'$.
::: solution
The time constants are $\tau_{gs} = R_{\text{sig}}C_{gs} = 0.5\,\mathrm{ns}$, $\tau_{gd} = C_{gd}(R_{\text{sig}} + R_L' + g_mR_{\text{sig}}R_L') = 2.2\,\mathrm{ns}$, $\tau_L = 0.5\,\mathrm{ns}$. Halving $R_{\text{sig}}$ reduces $\tau_{gs}$ to $0.25$ and $\tau_{gd}$ to $C_{gd}(5 + 10 + 100)\,\mathrm{k\Omega} = 1.15\,\mathrm{ns}$: total $1.9\,\mathrm{ns}$, $f_H \approx 84\,\mathrm{MHz}$. Halving $C_L$ or $C_{gs}$ saves only $0.25\,\mathrm{ns}$. Doubling $g_m$ doubles the gain and makes $\tau_{gd}$ worse ($4.2\,\mathrm{ns}$). A low source resistance at the input of a high-gain stage — for example a follower in front of it — is the classic remedy.
:::
:::

## Bandwidth of the other configurations

The Miller effect is what limits inverting high-gain stages; the other configurations avoid it.

- **Common gate / common base.** The gate is grounded, so $C_{gd}$ goes from the output to ground and is not multiplied, and $C_{gs}$ sits at the low-resistance source node ($\approx 1/g_m$). The input pole is at about $g_m/C_{gs} \approx \omega_T$, and the bandwidth is usually set by the output node, $1/[R_D(C_{gd} + C_L)]$. CG stages are wideband.
- **Source and emitter followers.** $C_{gd}$ goes from the input to a grounded drain, unmultiplied, and $C_{gs}$ is *bootstrapped*: both its ends move almost together, so Miller's theorem with $K \approx 1$ gives an input capacitance $C_{gs}(1 - K)$, much smaller than $C_{gs}$. Followers are fast, although with a capacitive load and a high source resistance their output impedance can become inductive and they can ring.
- **Cascode.** The CS transistor $M_1$ drives the source of $M_2$, a node of resistance about $1/g_{m2}$, so the gain from the gate to the drain of $M_1$ is only about $-g_{m1}/g_{m2} \approx -1$ and the Miller multiplier of $C_{gd1}$ is about $2$ instead of $1 + g_mR_L'$. The high gain is developed at the output node, where $C_{gd2}$ is grounded.

::: example A cascode in place of the CS stage {#ex-cascode-hf}
Replace the CS stage of [[#ex-cs-hf]] by a cascode with an identical cascode transistor ($g_{m2} = 2\,\mathrm{mS}$, $C_{gs2} = 50\,\mathrm{fF}$, $C_{gd2} = 10\,\mathrm{fF}$), the same $R_L' = 10\,\mathrm{k\Omega}$ and $C_L = 50\,\mathrm{fF}$; neglect $r_o$ and junction capacitances. Estimate $f_H$ by open-circuit time constants.
::: solution
The midband gain is still about $-g_{m1}R_L' = -20$. The resistance at the internal node $X$ (drain of $M_1$, source of $M_2$) is $R_X = 1/g_{m2} = 500\,\Omega$.

- $C_{gs1}$: $R_{\text{sig}} = 10\,\mathrm{k\Omega}$, $\tau = 0.5\,\mathrm{ns}$.
- $C_{gd1}$: by [[#eq-rgd]] with $R_L' \to R_X$: $10\,\mathrm{k} + 0.5\,\mathrm{k} + 2\times10^{-3}\times10^4\times500 = 20.5\,\mathrm{k\Omega}$, $\tau = 0.205\,\mathrm{ns}$.
- $C_{gs2}$ (from $X$ to the grounded gate of $M_2$): $R_X = 500\,\Omega$, $\tau = 0.025\,\mathrm{ns}$.
- $C_{gd2} + C_L$ (output to ground): $60\,\mathrm{fF}\times10\,\mathrm{k\Omega} = 0.6\,\mathrm{ns}$.

The sum is $1.33\,\mathrm{ns}$, so $f_H \approx 1/(2\pi\times1.33\,\mathrm{ns}) = 120\,\mathrm{MHz}$, $2.4$ times the CS stage's $50\,\mathrm{MHz}$ at the same gain. The $C_{gd}$ time constant has dropped from $2.2$ to $0.2\,\mathrm{ns}$; the bandwidth is now limited by the output node and the input, which is exactly where a designer wants it.
:::
:::

## Gain–bandwidth trade-offs

When the dominant pole is at the output of a stage with transconductance $g_m$, output resistance $R$ and capacitance $C$, the gain is $g_mR$ and the bandwidth $1/(2\pi RC)$, so their product

$$
\mathrm{GBW} = A_Mf_H = \frac{g_m}{2\pi C}
$$ {#eq-gbw}

is independent of $R$: increasing the load resistance raises the gain and lowers the bandwidth in exact proportion. To improve the product you must increase $g_m$ (more current, or a lower overdrive) or reduce the capacitance. The same constant gain–bandwidth product describes an operational amplifier with dominant-pole compensation, and with negative feedback it lets a designer trade one for the other ([[electronics-2/feedback]]).

Cascading identical stages narrows the bandwidth. For $n$ identical non-interacting stages, each with a single pole at $f_1$, the overall response is $1/(1 + jf/f_1)^n$, and its $3\,\mathrm{dB}$ frequency is

$$
f_{H,n} = f_1\sqrt{2^{1/n} - 1},
$$ {#eq-shrinkage}

$0.64f_1$ for two stages, $0.51f_1$ for three, and approximately $0.83f_1/\sqrt n$ for large $n$.

::: widget plot
f: sqrt(2^(1/x) - 1); 0.833/sqrt(x)
x: 1, 10
y: 0, 1.05
labels: f_{H,n}/f_1; 0.833/\sqrt{n}
caption: Bandwidth of $n$ identical cascaded single-pole stages relative to the bandwidth of one, with its large-$n$ approximation. Three stages lose half the bandwidth; ten lose three quarters. For a given total gain, it is better to use several moderate-gain stages than one very-high-gain stage, because each stage's bandwidth grows as its gain falls — but the improvement saturates, which is why practical amplifiers rarely exceed three or four stages inside one feedback loop.
:::

::: application Thinking in $f_T$: why radio receivers use cascodes
A low-noise amplifier at $5\,\mathrm{GHz}$ needs voltage gain at a frequency only a few times below the $f_T$ of a typical CMOS transistor. A plain CS stage would lose most of its gain to the Miller-multiplied $C_{gd}$ and would also feed the output back to the input, making the input match depend on the load. Practically every integrated LNA, as of 2026, is therefore an inductively degenerated cascode: the cascode removes the Miller effect and isolates input from output, and inductors resonate out the remaining capacitances at the operating frequency ([[rf-microwave]]).
:::

::: history
John Milton Miller described the multiplication of a triode's grid–plate capacitance in a 1920 paper of the US Bureau of Standards, explaining why triode amplifiers had a much lower input impedance than their small electrode capacitances suggested; the screen-grid tetrode (Walter Schottky, 1916; developed by Albert Hull, 1926) and the pentode were invented partly to remove it. Lawrence Giacoletto's hybrid-π model (1954) gave transistors a frequency-dependent small-signal model with physically meaningful elements. The method of open-circuit time constants was published by Richard Thornton, Campbell Searle and colleagues at MIT in the 1960s and popularised by Gray and Searle's 1969 textbook *Electronic Principles*; the short-circuit time-constant method is its low-frequency dual.
:::

## Where this leads

Frequency response is the bridge to feedback. With negative feedback, an amplifier's bandwidth is multiplied by the same factor by which its gain is divided, but the poles of the open-loop amplifier now decide whether the loop is stable ([[electronics-2/feedback]], [[electronics-2/stability-compensation]]). The pole splitting seen in [[#ex-cs-exact]] is the basis of Miller compensation in two-stage operational amplifiers ([[electronics-2/operational-amplifier-design]]). At radio frequencies the transistor models of this chapter are combined with transmission lines and matching networks ([[rf-microwave]]), and in digital circuits the same capacitances and resistances set gate delays ([[digital-ic]]).

::: summary
- An amplifier's gain is $A_MF_L(s)F_H(s)$: coupling and bypass capacitors set $f_L$, device and load capacitances set $f_H$; a dominant pole simplifies both.
- Short-circuit time constants: $\omega_L \approx \sum 1/(C_iR_i^s)$, others shorted. Emitter and source bypass capacitors see small resistances ($\approx 1/g_m$) and usually dominate.
- High-frequency models add $C_{gs}, C_{gd}$ (MOSFET) or $C_\pi, C_\mu, r_x$ (BJT); the transition frequency $f_T = g_m/[2\pi(C_{gs} + C_{gd})]$ measures intrinsic speed but not circuit bandwidth.
- Miller's theorem: a capacitance across an inverting gain $-A$ appears at the input as $C(1 + A)$. It usually dominates the bandwidth of CS and CE stages.
- Open-circuit time constants: $\omega_H \approx 1/\sum C_iR_i^o$, others open; $C_{gd}$ sees $R_G + R_L' + g_mR_GR_L'$. The method also shows which capacitor to fix.
- CG stages, followers and cascodes avoid Miller multiplication and are much faster than CS stages at the same gain.
- At the output of a stage, $\mathrm{GBW} = g_m/(2\pi C)$; $n$ identical cascaded stages have bandwidth $f_1\sqrt{2^{1/n} - 1}$.
:::

## Exercises

::: exercise Transition frequency {level=1 check="10e-3/(2*pi*50e-15)"}
A MOSFET has $g_m = 10\,\mathrm{mS}$ and $C_{gs} + C_{gd} = 50\,\mathrm{fF}$. Find $f_T$ in hertz.
::: solution
$f_T = g_m/[2\pi(C_{gs} + C_{gd})] = 10^{-2}/(2\pi\times5\times10^{-14}) = 31.8\,\mathrm{GHz}$.
:::
:::

::: exercise Miller capacitance {level=1 check="102e-12"}
A $2\,\mathrm{pF}$ capacitor connects the input and output of an inverting amplifier with gain $-50$. Find the equivalent input capacitance, in farads.
::: solution
$C(1 + A) = 2\times51 = 102\,\mathrm{pF}$.
:::
:::

::: exercise A coupling-capacitor pole {level=1 check="1/(2*pi*1e-6*10e3)"}
A $1\,\mathrm{\mu F}$ coupling capacitor connects a source of $1\,\mathrm{k\Omega}$ to an amplifier input of $9\,\mathrm{k\Omega}$. Find the pole frequency, in hertz.
::: solution
$f = 1/[2\pi C(R_1 + R_2)] = 1/(2\pi\times10^{-6}\times10^4) = 15.9\,\mathrm{Hz}$.
:::
:::

::: exercise BJT transition frequency {level=2 check="(1e-3/0.026)/(2*pi*11e-12)"}
A BJT biased at $I_C = 1\,\mathrm{mA}$ has $C_\pi = 10\,\mathrm{pF}$ and $C_\mu = 1\,\mathrm{pF}$. Find $f_T$ in hertz and the beta cut-off frequency $f_\beta$ for $\beta = 100$.
::: solution
$g_m = 38.5\,\mathrm{mS}$, so $f_T = 0.0385/(2\pi\times11\times10^{-12}) = 557\,\mathrm{MHz}$, and $f_\beta = f_T/\beta = 5.6\,\mathrm{MHz}$. Above $f_\beta$ the current gain falls by $20\,\mathrm{dB/decade}$.
:::
:::

::: exercise Open-circuit time constants of a CS stage {level=2 check="1/(2*pi*(100e-15*50e3+20e-15*(50e3*21+20e3)+100e-15*20e3))"}
A CS stage has $R_{\text{sig}} = 50\,\mathrm{k\Omega}$, $g_m = 1\,\mathrm{mS}$, $R_L' = 20\,\mathrm{k\Omega}$, $C_{gs} = 100\,\mathrm{fF}$, $C_{gd} = 20\,\mathrm{fF}$ and $C_L = 100\,\mathrm{fF}$. Estimate $f_H$ in hertz.
::: solution
$\tau_{gs} = 100\,\mathrm{fF}\times50\,\mathrm{k\Omega} = 5\,\mathrm{ns}$; $R_{gd}^o = 50 + 20 + 10^{-3}\times50\times20\times10^{3}\,\mathrm{k\Omega} = 1070\,\mathrm{k\Omega}$, $\tau_{gd} = 21.4\,\mathrm{ns}$; $\tau_L = 2\,\mathrm{ns}$. Total $28.4\,\mathrm{ns}$, so $f_H \approx 5.6\,\mathrm{MHz}$. The $C_{gd}$ term is three quarters of the total.
:::
:::

::: exercise Three identical stages {level=2 check="10e6*sqrt(2^(1/3)-1)"}
Three identical non-interacting stages each have a single pole at $10\,\mathrm{MHz}$. Find the bandwidth of the cascade, in hertz.
::: solution
By [[#eq-shrinkage]], $f_H = 10\,\mathrm{MHz}\times\sqrt{2^{1/3} - 1} = 10\times0.510 = 5.10\,\mathrm{MHz}$.
:::
:::

::: exercise Sizing a source bypass capacitor {level=2 check="1/(2*pi*100*(1000/6))"}
A CS stage with $g_m = 5\,\mathrm{mS}$ has a source resistor $R_S = 1\,\mathrm{k\Omega}$ bypassed by $C_S$. Find $C_S$, in farads, for a pole at $100\,\mathrm{Hz}$.
::: solution
The resistance seen by $C_S$ is $R_S\parallel(1/g_m) = 1000\parallel200 = 166.7\,\Omega$, so $C_S = 1/(2\pi\times100\times166.7) = 9.55\,\mathrm{\mu F}$. The zero is at $1/(2\pi R_SC_S) = 16.7\,\mathrm{Hz}$, below the pole, as it must be: between them the gain rises from its degenerated value $g_mR_D/(1 + g_mR_S)$ to $g_mR_D$, a factor of $1 + g_mR_S = 6$.
:::
:::

::: exercise The high-frequency transfer function {level=3}
Derive [[#eq-cs-hf]] from the two node equations given in the proof of [[#prop-cs-hf]], and show that if $b_1^2 \gg 4b_2$ the poles are approximately $\omega_{p1} = 1/b_1$ and $\omega_{p2} = b_1/b_2$.
::: hint
For the second part, write $1 + b_1s + b_2s^2 = (1 + s/\omega_{p1})(1 + s/\omega_{p2})$ and compare coefficients.
:::
::: solution
From the drain equation, $V_g = -V_o\,\frac{1/R_L' + s(C_L + C_{gd})}{g_m - sC_{gd}}$. Substitute into the gate equation multiplied by $R_{\text{sig}}$: $V_g\bigl[1 + sR_{\text{sig}}(C_{gs} + C_{gd})\bigr] - sR_{\text{sig}}C_{gd}V_o = V_{\text{sig}}$. Then

$$
-V_o\left\{\frac{\bigl[1/R_L' + s(C_L + C_{gd})\bigr]\bigl[1 + sR_{\text{sig}}(C_{gs} + C_{gd})\bigr]}{g_m - sC_{gd}} + sR_{\text{sig}}C_{gd}\right\} = V_{\text{sig}}.
$$

Multiplying through by $R_L'(g_m - sC_{gd})$, the brace becomes $[1 + sR_L'(C_L + C_{gd})][1 + sR_{\text{sig}}(C_{gs} + C_{gd})] + sR_{\text{sig}}R_L'C_{gd}(g_m - sC_{gd})$. Expanding, the coefficient of $s$ is $R_L'(C_L + C_{gd}) + R_{\text{sig}}(C_{gs} + C_{gd}) + g_mR_{\text{sig}}R_L'C_{gd} = b_1$, and the coefficient of $s^2$ is $R_L'R_{\text{sig}}[(C_L + C_{gd})(C_{gs} + C_{gd}) - C_{gd}^2] = b_2$. So $V_o/V_{\text{sig}} = -R_L'(g_m - sC_{gd})/(1 + b_1s + b_2s^2)$, which is [[#eq-cs-hf]]. Comparing coefficients, $b_1 = 1/\omega_{p1} + 1/\omega_{p2}$ and $b_2 = 1/(\omega_{p1}\omega_{p2})$. If $\omega_{p2} \gg \omega_{p1}$, then $b_1 \approx 1/\omega_{p1}$ and $\omega_{p2} = 1/(b_2\omega_{p1}) \approx b_1/b_2$. For [[#ex-cs-exact]]: $b_1/b_2 = 3.2\times10^{-9}/3.5\times10^{-19} = 9.1\times10^9\,\mathrm{rad/s}$, or $1.46\,\mathrm{GHz}$, close to the exact $1.40\,\mathrm{GHz}$.
:::
:::

::: exercise Bias for a gain–bandwidth product {level=3 check="2*pi*100e6*1e-12*0.2/2"}
A CS stage with an active load drives a $1\,\mathrm{pF}$ load capacitance that sets its dominant pole. What drain current, in amperes, gives a gain–bandwidth product of $100\,\mathrm{MHz}$ with $V_{OV} = 0.2\,\mathrm{V}$? What happens to the required current if the overdrive is raised to $0.4\,\mathrm{V}$?
::: solution
By [[#eq-gbw]], $g_m = 2\pi\times10^8\times10^{-12} = 0.628\,\mathrm{mS}$. With $g_m = 2I_D/V_{OV}$, $I_D = g_mV_{OV}/2 = 0.628\times10^{-3}\times0.1 = 62.8\,\mathrm{\mu A}$. At $V_{OV} = 0.4\,\mathrm{V}$ the same $g_m$ needs $126\,\mathrm{\mu A}$, twice the power: speed per unit power is best at low overdrive, as long as the transistor's own capacitances remain small compared with $C_L$.
:::
:::

::: exercise Miller effect in a CE stage with base resistance {level=3}
A CE stage with $g_m = 40\,\mathrm{mS}$, $r_\pi = 2.5\,\mathrm{k\Omega}$, $r_x = 100\,\Omega$, $C_\pi = 10\,\mathrm{pF}$ and $C_\mu = 1\,\mathrm{pF}$ is driven from $R_{\text{sig}} = 1\,\mathrm{k\Omega}$ and has $R_L' = 2.5\,\mathrm{k\Omega}$ (no load capacitance). Estimate $f_H$ by open-circuit time constants, and compare with the Miller input-pole estimate.
::: hint
Both capacitances see, on the base side, the resistance $R_\pi' = r_\pi\parallel(R_{\text{sig}} + r_x)$.
:::
::: solution
$R_\pi' = 2500\parallel1100 = 764\,\Omega$. For $C_\pi$: $\tau_\pi = 10\,\mathrm{pF}\times764\,\Omega = 7.64\,\mathrm{ns}$. For $C_\mu$, [[#eq-rgd]] with $R_G = R_\pi'$: $R_\mu^o = 764 + 2500 + 0.04\times764\times2500 = 79.7\,\mathrm{k\Omega}$, $\tau_\mu = 79.7\,\mathrm{ns}$. Sum $87.3\,\mathrm{ns}$, $f_H \approx 1.82\,\mathrm{MHz}$. Miller: $C_{\text{in}} = 10 + 1\times(1 + 100) = 111\,\mathrm{pF}$, $f_{p,\text{in}} = 1/(2\pi\times764\times111\times10^{-12}) = 1.88\,\mathrm{MHz}$, close because there is no load capacitance. The midband gain is $-g_mR_L'\,r_\pi/(r_\pi + r_x + R_{\text{sig}}) = -100\times0.694 = -69$, so the gain–bandwidth product is about $125\,\mathrm{MHz}$, a quarter of this transistor's $f_T = 579\,\mathrm{MHz}$.
:::
:::
