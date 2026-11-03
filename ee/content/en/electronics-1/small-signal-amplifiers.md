The voltage from a microphone is a few millivolts; the signal from a radio antenna, a few microvolts; the output of a strain gauge bridge, perhaps a millivolt per kilogram. Each must be made larger, without changing its shape, before anything useful can be done with it. In [[electronics-1/mosfet-circuits]] and [[electronics-1/bjt-circuits]] we saw that a transistor biased in its amplifying region turns a small change of input voltage into a much larger change of output voltage, with a gain equal to the slope of the transfer characteristic at the operating point. That slope is the whole story of amplification, provided the signal is small enough for the curve to look straight over the range it covers.

This chapter makes that idea systematic. We expand the nonlinear transistor equations about the bias point and keep only the linear term, which turns each transistor into a small linear circuit — its **small-signal model** — built from a controlled source and a few resistors. The result is a two-step method used throughout electronics: solve the nonlinear DC problem once to find the bias, then analyse the signal with ordinary linear circuit theory ([[circuits-1/nodal-mesh]], [[circuits-1/network-theorems]]). We also define the quantities that describe an amplifier to the outside world — gain, input resistance and output resistance — and see how they determine what happens when a source and a load are connected.

## Signals riding on a bias

Every voltage and current in an amplifier is the sum of a DC bias value and a signal. We use a notation that keeps them apart:

| symbol | meaning | example |
|---|---|---|
| $v_{GS}$, $i_C$ | total instantaneous quantity | $v_{GS}(t) = V_{GS} + v_{gs}(t)$ |
| $V_{GS}$, $I_C$ | DC (bias) component | $V_{GS} = 1.2\,\mathrm{V}$ |
| $v_{gs}$, $i_c$ | signal (incremental) component | $v_{gs}(t) = 5\sin\omega t\,\mathrm{mV}$ |
| $V_{gs}$, $I_c$ | phasor or amplitude of the signal | $V_{gs} = 5\,\mathrm{mV}$ |

Lower-case letters with lower-case subscripts are the signals we want to amplify; upper case with upper case are the bias quantities that make amplification possible.

### Linearising the BJT

Let the base–emitter voltage of a BJT in the active mode be $v_{BE} = V_{BE} + v_{be}$. Ignoring the Early effect, [[electronics-1/bjt-circuits#eq-bjt-active]] gives

$$
i_C = I_Se^{(V_{BE} + v_{be})/V_T} = I_C\,e^{v_{be}/V_T} = I_C\left(1 + \frac{v_{be}}{V_T} + \frac12\left(\frac{v_{be}}{V_T}\right)^2 + \cdots\right),
$$ {#eq-bjt-taylor}

where $I_C = I_Se^{V_{BE}/V_T}$ is the bias current. If $\abs{v_{be}} \ll V_T$ we may keep only the first two terms. The signal component of the collector current is then proportional to $v_{be}$:

$$
i_c = \frac{I_C}{V_T}v_{be} = g_mv_{be}.
$$

### Linearising the MOSFET

For a MOSFET in saturation with $v_{GS} = V_{GS} + v_{gs}$, the square law (ignoring $\lambda$) expands exactly into three terms:

$$
i_D = \tfrac12k_n(V_{OV} + v_{gs})^2 = \underbrace{\tfrac12k_nV_{OV}^2}_{I_D} + \underbrace{k_nV_{OV}v_{gs}}_{g_mv_{gs}} + \tfrac12k_nv_{gs}^2.
$$ {#eq-mos-taylor}

The last term is negligible when $\abs{v_{gs}} \ll 2V_{OV}$.

::: theorem Small-signal approximation and harmonic distortion {#thm-small-signal}
For a sinusoidal input of amplitude $\hat v$, the ratio of the second-harmonic to the fundamental in the output current is

$$
\mathrm{HD}_2 \approx \frac{\hat v}{4V_T}\quad\text{(BJT)}, \qquad \mathrm{HD}_2 = \frac{\hat v}{4V_{OV}}\quad\text{(MOSFET, square law)}.
$$ {#eq-hd2}

The linear (small-signal) model is accurate when $\hat v \ll V_T$ for a BJT ($\hat v \lesssim 5\,\mathrm{mV}$ keeps $\mathrm{HD}_2$ below $5\,\%$) and $\hat v \ll V_{OV}$ for a MOSFET.
:::

::: proof
Put $v = \hat v\cos\omega t$ in the quadratic terms, using $\cos^2\omega t = \tfrac12(1 + \cos2\omega t)$.

*BJT.* Up to second order, $i_c = I_C\bigl[(\hat v/V_T)\cos\omega t + \tfrac14(\hat v/V_T)^2(1 + \cos2\omega t)\bigr]$. The fundamental has amplitude $I_C\hat v/V_T$ and the second harmonic $I_C\hat v^2/(4V_T^2)$; their ratio is $\hat v/(4V_T)$. (The neglected cubic and higher terms contribute to the third and higher harmonics and only slightly correct these amplitudes.)

*MOSFET.* From [[#eq-mos-taylor]], the fundamental is $k_nV_{OV}\hat v$ and the second harmonic $\tfrac14k_n\hat v^2$, with ratio $\hat v/(4V_{OV})$ exactly. The quadratic term also shifts the DC current by $\tfrac14k_n\hat v^2$, which is why large signals move the bias point.
:::

A BJT therefore tolerates a much smaller input than a MOSFET for the same distortion: with $V_{OV} = 0.2\,\mathrm{V}$, the MOSFET's linear range is about eight times wider than the BJT's $V_T = 26\,\mathrm{mV}$. That is the other side of the BJT's larger transconductance per unit current: $g_m/I = 1/V_T$ against $2/V_{OV}$. A steeper characteristic gives more gain and less linear range.

::: widget plot
f: exp(x/26); 1 + x/26; (1 + x/(1000*Vov))^2; 1 + 2x/(1000*Vov)
x: -50, 50
y: 0, 4
sliders: Vov=0.2:0.05:0.5:0.01
labels: \text{BJT } i_C/I_C; \text{BJT linear}; \text{MOSFET } i_D/I_D; \text{MOSFET linear}
caption: Normalised output current against input signal $v_{be}$ or $v_{gs}$ (millivolts) for a BJT ($V_T = 26\,\mathrm{mV}$) and a square-law MOSFET with overdrive $V_{OV}$ (volts, slider), each with its tangent at the bias point — the small-signal approximation. The BJT curve leaves its tangent after a few millivolts; the MOSFET curve stays close for tens of millivolts. Raise $V_{OV}$: the MOSFET becomes more linear but its slope, the transconductance per unit current, falls.
:::

::: example Distortion of a CE stage {#ex-hd2}
The input of a CE stage is $5\,\mathrm{mV}$ peak at the base. Estimate the second-harmonic distortion of the collector current. What input amplitude gives the same distortion in a MOSFET stage with $V_{OV} = 0.2\,\mathrm{V}$?
::: solution
By [[#eq-hd2]], $\mathrm{HD}_2 = 5/(4\times26) = 0.048$, or $4.8\,\%$ — clearly audible in an audio amplifier. For the MOSFET we need $\hat v/(4\times0.2\,\mathrm{V}) = 0.048$, i.e. $\hat v = 38\,\mathrm{mV}$. In practice both are improved by negative feedback, for example an unbypassed emitter or source resistor, which reduces the signal across the junction itself ([[electronics-1/single-stage-amplifiers]]).
:::
:::

## Small-signal models of the transistor

Once the quadratic and higher terms are dropped, the relation between signal currents and voltages is linear, and can be drawn as a circuit.

### The MOSFET

::: definition MOSFET small-signal parameters {#def-mos-params}
For a MOSFET biased in saturation at drain current $I_D$ and overdrive $V_{OV}$, the **transconductance** and **output resistance** are

$$
g_m = \left.\frac{\partial i_D}{\partial v_{GS}}\right|_Q = k_nV_{OV} = \sqrt{2k_nI_D} = \frac{2I_D}{V_{OV}}, \qquad r_o = \left(\left.\frac{\partial i_D}{\partial v_{DS}}\right|_Q\right)^{-1} \approx \frac{1}{\lambda I_D} = \frac{V_A}{I_D},
$$ {#eq-mos-params}

where $V_A = 1/\lambda$ is the MOSFET's Early voltage. The **small-signal model** is a voltage-controlled current source $g_mv_{gs}$ from drain to source in parallel with $r_o$, with an open circuit between gate and source (no gate current). If the source and body are at different signal potentials, a second source $g_{mb}v_{bs}$ in parallel models the body effect, with $g_{mb} = \chi g_m$ and $\chi$ typically $0.1$–$0.3$.
:::

The three forms of $g_m$ say different things. At fixed $W/L$, $g_m$ grows as $\sqrt{I_D}$; at fixed overdrive, it grows in proportion to $I_D$; and at fixed current, it is inversely proportional to the overdrive. Designers think mostly in terms of the last one: choosing $V_{OV}$ (or, in modern practice, the equivalent ratio $g_m/I_D = 2/V_{OV}$) sets the trade-off between transconductance efficiency, linearity, speed and area.

### The BJT: the hybrid-π model

::: definition BJT small-signal parameters {#def-bjt-params}
For a BJT biased in the active mode at collector current $I_C$,

$$
g_m = \frac{I_C}{V_T}, \qquad r_\pi = \frac{v_{be}}{i_b} = \frac{\beta}{g_m}, \qquad r_e = \frac{v_{be}}{i_e} = \frac{\alpha}{g_m} \approx \frac{V_T}{I_E}, \qquad r_o = \frac{V_A}{I_C}.
$$ {#eq-bjt-params}

In the **hybrid-π model** the base is connected to the emitter through $r_\pi$, and a current source $g_mv_\pi$ (with $v_\pi = v_{be}$) flows from collector to emitter in parallel with $r_o$. In the equivalent **T model** the emitter is connected to an internal base node through $r_e$, and a current source $\alpha i_e$ flows into the collector; the two models give identical results, and we choose whichever makes a circuit easier.
:::

::: proof
The base current is $i_B = i_C/\beta$, so its signal component is $i_b = i_c/\beta = (g_m/\beta)v_{be}$, giving $r_\pi = \beta/g_m$. Similarly $i_e = i_c/\alpha = (g_m/\alpha)v_{be}$, so $r_e = \alpha/g_m = V_T/I_E$. The output resistance comes from the Early factor: $\partial i_C/\partial v_{CE} = I_Se^{v_{BE}/V_T}/V_A \approx I_C/V_A$. Finally, the two models are equivalent: in the T model, the current into the base is $i_e - \alpha i_e = i_e/(\beta + 1)$ and $v_{be} = i_er_e$, so $v_{be}/i_b = (\beta + 1)r_e = r_\pi$, and the collector source $\alpha i_e = \alpha v_{be}/r_e = g_mv_{be}$.
:::

The relation $r_\pi = (\beta + 1)r_e$ is the small-signal form of the reflection rule of [[electronics-1/bjt-circuits]]: a resistance in the emitter looks $\beta + 1$ times larger from the base.

::: example Small-signal parameters at a bias point {#ex-params}
(a) A BJT with $\beta = 100$ and $V_A = 100\,\mathrm{V}$ is biased at $I_C = 1\,\mathrm{mA}$. (b) A MOSFET with $\lambda = 0.05\,\mathrm{V^{-1}}$ is biased at $I_D = 0.5\,\mathrm{mA}$ with $V_{OV} = 0.25\,\mathrm{V}$. Find the small-signal parameters and the **intrinsic gain** $g_mr_o$ of each.
::: solution
(a) $g_m = 1\,\mathrm{mA}/26\,\mathrm{mV} = 38.5\,\mathrm{mS}$; $r_\pi = 100/0.0385 = 2.6\,\mathrm{k\Omega}$; $r_e = 0.99/0.0385 = 25.7\,\Omega$; $r_o = 100\,\mathrm{V}/1\,\mathrm{mA} = 100\,\mathrm{k\Omega}$. Intrinsic gain $g_mr_o = V_A/V_T = 3850$.

(b) $g_m = 2\times0.5\,\mathrm{mA}/0.25\,\mathrm{V} = 4\,\mathrm{mS}$; $r_o = 1/(0.05\times0.5\times10^{-3}) = 40\,\mathrm{k\Omega}$. Intrinsic gain $g_mr_o = 2V_A/V_{OV} = 2\times20/0.25 = 160$.

The intrinsic gain is the largest voltage gain a single transistor can give (it is the gain with an ideal current-source load). It is independent of current for the BJT and depends only on the overdrive for the MOSFET. Short-channel MOSFETs have small $V_A$, and in advanced processes $g_mr_o$ is often only $10$–$30$, one reason modern analog design leans on cascodes ([[electronics-1/multistage-amplifiers]]).
:::
:::

::: warning Small-signal parameters depend on the bias
$g_m$, $r_\pi$, $r_e$ and $r_o$ are not fixed properties of the transistor: they are evaluated *at the operating point*, and they change when the bias changes. Always do the DC analysis first. A common error is to use $g_m = 40\,\mathrm{mS}$ "for a BJT" without checking the collector current; another is to put DC quantities such as $V_{BE} = 0.7\,\mathrm{V}$ into the small-signal circuit, where they have no place.
:::

## The small-signal analysis procedure

::: algorithm Small-signal analysis of a transistor amplifier {#alg-small-signal}
1. **DC analysis.** Set all signal sources to zero, open all capacitors, and find the bias point. Check that each transistor is in its amplifying region.
2. **Parameters.** Compute $g_m$, $r_o$ and (BJT) $r_\pi$ or $r_e$ at the bias point.
3. **Small-signal circuit.** Set all DC sources to zero — DC voltage sources (including $V_{DD}$, $V_{CC}$) become short circuits to ground, DC current sources become open circuits. At midband frequencies, replace coupling and bypass capacitors by short circuits.
4. **Replace each transistor** by its small-signal model, choosing hybrid-π or T for convenience.
5. **Solve** the linear circuit for gains and resistances using KCL, KVL and Thévenin equivalents.
:::

Step 3 is the source of most mistakes. The supply rail is a signal ground because its voltage does not change: a resistor from the drain to $V_{DD}$ appears in the small-signal circuit as a resistor from the drain to ground. The coupling capacitors that connect the source and the load, and the bypass capacitors placed across emitter or source resistors, are chosen large enough to have negligible impedance at the signal frequencies; their effect at low frequencies is taken up in [[electronics-1/amplifier-frequency-response]].

### Resistances seen at the terminals

Three small-signal results appear so often that they are worth deriving once and memorising. Each is the resistance seen looking into one terminal of a transistor when the other terminals are connected to fixed (signal-ground) potentials, and each follows from the models above with a test source.

1. **Looking into the base**, with the emitter at signal ground: $r_\pi$. With a resistance $R_E$ from emitter to ground (and $r_o$ neglected), the base current $i_b$ produces an emitter current $(\beta + 1)i_b$ through $R_E$, so $v_b = i_br_\pi + (\beta + 1)i_bR_E$ and the resistance is $r_\pi + (\beta + 1)R_E$. The emitter resistor is *reflected* into the base multiplied by $\beta + 1$. Looking into a MOSFET gate, the resistance is infinite whatever is in the source.
2. **Looking into the emitter or source**, with the base or gate at signal ground and $r_o$ neglected: the T model shows it directly — $r_e = \alpha/g_m \approx 1/g_m$ for a BJT, $1/g_m$ for a MOSFET. With a resistance $R_B$ in series with the base, it becomes $r_e + R_B/(\beta + 1)$: base resistance is reflected into the emitter *divided* by $\beta + 1$.
3. **A diode-connected transistor** — gate tied to drain, or base to collector — has $v_{gs} = v_{ds}$, so a test voltage $v_x$ drives a current $g_mv_x + v_x/r_o$. Its resistance is $1/g_m\parallel r_o \approx 1/g_m$ (for the BJT also in parallel with $r_\pi$). A diode-connected transistor is therefore a *small* resistance, a few hundred ohms at typical currents, and it is the input device of every current mirror ([[electronics-1/current-mirrors]]).

Looking into the collector or drain gives a large resistance, $r_o$ with the emitter or source grounded and more with degeneration; that result is derived in [[#exr-rout-degen]].

::: quiz
A BJT with $\beta = 100$ is biased at $I_C = 1\,\mathrm{mA}$ and has an unbypassed $1\,\mathrm{k\Omega}$ emitter resistor. Approximately what resistance is seen looking into its base?
- [ ] $2.6\,\mathrm{k\Omega}$
- [ ] $3.6\,\mathrm{k\Omega}$
- [x] $104\,\mathrm{k\Omega}$
- [ ] $1\,\mathrm{k\Omega}$
::: solution
$r_\pi = \beta/g_m = 100/0.0385 = 2.6\,\mathrm{k\Omega}$, and the emitter resistor is reflected with the factor $\beta + 1 = 101$: $R = 2.6 + 101\times1 = 103.6\,\mathrm{k\Omega}$. Simply adding $r_\pi$ and $R_E$ forgets that the emitter current is $\beta + 1$ times the base current.
:::
:::

## Characterising an amplifier

To the outside world an amplifier is a two-port: an input port connected to a signal source, an output port connected to a load ([[circuits-2/two-port-networks]]). If it is **unilateral** — the output does not affect the input, which is nearly true for most single-stage amplifiers at midband — it can be represented by a small number of parameters.

::: definition Voltage-amplifier model {#def-amp-model}
A unilateral **voltage amplifier** is modelled by its **input resistance** $R_{\text{in}}$ across the input terminals, and at the output by a controlled voltage source $A_{vo}v_i$ in series with the **output resistance** $R_{\text{out}}$. Here $A_{vo}$ is the **open-circuit voltage gain**, measured with the output unloaded. Connected to a source $v_{\text{sig}}$ with resistance $R_{\text{sig}}$ and to a load $R_L$, the **overall voltage gain** is

$$
G_v = \frac{v_o}{v_{\text{sig}}} = \frac{R_{\text{in}}}{R_{\text{in}} + R_{\text{sig}}}\;A_{vo}\;\frac{R_L}{R_L + R_{\text{out}}}.
$$ {#eq-overall-gain}
:::

The two fractions are voltage dividers: one at the input, where the source resistance and the input resistance share $v_{\text{sig}}$, and one at the output, where the output resistance and the load share the open-circuit output. An ideal voltage amplifier has $R_{\text{in}} = \infty$ and $R_{\text{out}} = 0$, so that neither divider loses anything.

There are three other ways to model the same two-port, according to whether the input and output are naturally voltages or currents:

| amplifier type | gain parameter | ideal $R_{\text{in}}$ | ideal $R_{\text{out}}$ |
|---|---|---|---|
| voltage | $A_{vo}$ (V/V) | $\infty$ | $0$ |
| current | $A_{is}$ (A/A, short-circuit output) | $0$ | $\infty$ |
| transconductance | $G_m$ (A/V, short-circuit output) | $\infty$ | $\infty$ |
| transresistance | $R_m$ (V/A, open-circuit output) | $0$ | $0$ |

Any one of the four models can be converted into any other by a source transformation at the output (for example $A_{vo} = G_mR_{\text{out}}$). A single transistor is most naturally a transconductance amplifier: the controlled current $g_mv_{gs}$ is its essence, and a load resistor is needed to turn the current back into a voltage.

### Finding $R_{\text{in}}$ and $R_{\text{out}}$

The input resistance is the ratio $v_i/i_i$ at the input with the load connected (for a unilateral amplifier the load does not matter). The **output resistance** is found by setting the signal source to zero (keeping $R_{\text{sig}}$), applying a test voltage $v_x$ at the output, and computing $R_{\text{out}} = v_x/i_x$. This is just the Thévenin resistance of the output port, and all the techniques of [[circuits-1/network-theorems]] — including the use of a test source when controlled sources are present — apply unchanged.

::: example A complete CE amplifier {#ex-ce-complete}
The bias network of [[electronics-1/bjt-circuits#ex-bjt-bias-design]] ($R_1 = 75\,\mathrm{k\Omega}$, $R_2 = 47\,\mathrm{k\Omega}$, $R_E = R_C = 3.9\,\mathrm{k\Omega}$, $V_{CC} = 12\,\mathrm{V}$) is turned into an amplifier: the signal source ($R_{\text{sig}} = 2\,\mathrm{k\Omega}$) is coupled to the base by a large capacitor, $R_E$ is bypassed by a large capacitor, and a $10\,\mathrm{k\Omega}$ load is coupled to the collector. With $\beta = 200$ and $V_A = 100\,\mathrm{V}$, find $R_{\text{in}}$, $A_{vo}$, $R_{\text{out}}$ and $G_v$.
::: solution
**DC.** From the earlier example, $I_C = 0.965\,\mathrm{mA}$ at $\beta = 200$, active.

**Parameters.** $g_m = 0.965/26 = 37.1\,\mathrm{mS}$; $r_\pi = 200/0.0371 = 5.39\,\mathrm{k\Omega}$; $r_o = 100/0.965\,\mathrm{mA} = 104\,\mathrm{k\Omega}$.

**Small-signal circuit.** $V_{CC}$ is grounded, so $R_1$ and $R_2$ are both from base to ground, in parallel: $R_B = 28.9\,\mathrm{k\Omega}$. The bypassed emitter is at signal ground. $R_C$ runs from collector to ground, in parallel with $r_o$.

**Input.** $R_{\text{in}} = R_B\parallel r_\pi = 28.9\parallel5.39 = 4.54\,\mathrm{k\Omega}$.

**Output.** With $v_{\text{sig}} = 0$, $v_\pi = 0$ and the controlled source is dead, so $R_{\text{out}} = R_C\parallel r_o = 3.9\parallel104 = 3.76\,\mathrm{k\Omega}$.

**Gain.** With the output open, $v_o = -g_mv_\pi(R_C\parallel r_o)$ and $v_\pi = v_i$, so $A_{vo} = -g_m(R_C\parallel r_o) = -0.0371\times3758 = -139.5\,\mathrm{V/V}$.

**Overall.** By [[#eq-overall-gain]],

$$
G_v = \frac{4.54}{4.54 + 2}\,(-139.5)\,\frac{10}{10 + 3.76} = 0.694\times(-139.5)\times0.727 = -70.4\,\mathrm{V/V}.
$$

Half the open-circuit gain is lost in the two dividers. Notice also that $R_{\text{in}}$ depends on $r_\pi$ and therefore on $\beta$: with $\beta = 100$ the same calculation gives $R_{\text{in}} = 2.55\,\mathrm{k\Omega}$ and $G_v = -54.7$. The *bias* is $\beta$-insensitive, but the *gain* of this stage is not. Leaving part of $R_E$ unbypassed fixes that, as we shall see.
:::
:::

::: quiz
In [[#ex-ce-complete]], the load is changed from $10\,\mathrm{k\Omega}$ to $1\,\mathrm{k\Omega}$. Which parameters of the amplifier model change?
- [ ] $R_{\text{in}}$, $A_{vo}$ and $R_{\text{out}}$ all fall.
- [ ] Only $A_{vo}$, which becomes $-g_m(R_C\parallel r_o\parallel R_L)$.
- [x] None of them; only the overall gain $G_v$ changes, through the output divider.
- [ ] $R_{\text{out}}$ falls to $R_C\parallel R_L$.
::: solution
$R_{\text{in}}$, $A_{vo}$ and $R_{\text{out}}$ describe the amplifier itself and do not depend on what is connected to it (for a unilateral amplifier). The load enters only through the factor $R_L/(R_L + R_{\text{out}})$, which falls from $0.727$ to $1/4.76 = 0.21$, so $G_v$ falls to about $-20$. The loaded gain $-g_m(R_C\parallel r_o\parallel R_L)$ is the product $A_{vo}\,R_L/(R_L + R_{\text{out}})$ — correct, but it is not $A_{vo}$.
:::
:::

::: widget plot
f: Avo*x/(x + Ro); Avo*20/(20 + Rs)*x/(x + Ro)
x: 0, 20
y: 0, 150
sliders: Avo=140:10:200:1; Ro=3.76:0.1:10:0.01; Rs=2:0:20:0.1
labels: \lvert A_{vo}\rvert R_L/(R_L+R_{\text{out}}); \text{with } R_{\text{in}}=20\ \mathrm{k\Omega}
caption: Magnitude of the voltage gain against load resistance $R_L$ (kΩ) for an amplifier with open-circuit gain $\lvert A_{vo}\rvert$ and output resistance $R_{\text{out}}$ (kΩ); the second curve also includes the input divider for an amplifier input resistance of $20\,\mathrm{k\Omega}$ and source resistance $R_{\text{sig}}$ (kΩ). Gain is halved when $R_L = R_{\text{out}}$. Set $R_{\text{sig}} = 0$ to see the curves merge.
:::

::: example Why a speaker needs a buffer {#ex-buffer}
A microphone preamplifier has $R_{\text{in}} = 20\,\mathrm{k\Omega}$, $A_{vo} = 50$ and $R_{\text{out}} = 1\,\mathrm{k\Omega}$. It is driven by a microphone with $R_{\text{sig}} = 2\,\mathrm{k\Omega}$. Find $G_v$ into a $10\,\mathrm{k\Omega}$ line input and into an $8\,\Omega$ loudspeaker. What output resistance would give a gain of at least $40$ into the speaker?
::: solution
Into $10\,\mathrm{k\Omega}$: $G_v = (20/22)(50)(10/11) = 41.3$. Into $8\,\Omega$: $G_v = (20/22)(50)(8/1008) = 0.36$ — the "amplifier" attenuates. For $G_v \ge 40$ we need $(20/22)(50)\,8/(8 + R_{\text{out}}) \ge 40$, i.e. $8/(8 + R_{\text{out}}) \ge 0.88$, so $R_{\text{out}} \le 1.09\,\Omega$. A stage with very low output resistance — a **buffer**, such as the emitter or source follower of [[electronics-1/single-stage-amplifiers]] or the output stages of [[electronics-2/output-stages]] — is needed between the preamplifier and the load.
:::
:::

::: remark Power gain and decibels
Gains are often quoted in decibels: $20\log_{10}\abs{G_v}$ for voltage gain and $10\log_{10}G_p$ for power gain, where the **power gain** is $G_p = (v_o^2/R_L)/(v_i^2/R_{\text{in}})$. A voltage gain of $-70.4$ is $36.9\,\mathrm{dB}$. When input and load resistances differ, the voltage gain in decibels and the power gain in decibels are not equal; see the warning on decibels in [[circuits-2/frequency-response]].
:::

::: application Thinking in $g_m/I_D$
For a long-channel MOSFET, $g_m/I_D = 2/V_{OV}$; for a BJT, $g_m/I_C = 1/V_T \approx 38.5\,\mathrm{V^{-1}}$. A MOSFET can approach the BJT's value only in weak inversion, where its current becomes exponential, with $g_m/I_D = 1/(nV_T) \approx 25$–$30\,\mathrm{V^{-1}}$. Because short-channel devices follow no simple law, analog designers characterise each process by simulation — $g_m/I_D$, intrinsic gain and transit frequency tabulated against current density — and design directly from the tables. As of 2026 this "$g_m/I_D$ methodology" is the standard teaching approach in graduate analog CMOS courses, but its logic is exactly the small-signal reasoning of this chapter.
:::

::: history
Linearising a device about an operating point is as old as the triode: by 1919 the amplification factor $\mu$, the plate resistance and the mutual conductance $g_m$ of vacuum tubes had been defined, and H. J. van der Bijl's 1920 textbook *The Thermionic Vacuum Tube* treated tubes with exactly this small-signal reasoning. Representing the tube by a controlled source $\mu v_g$ in series with its plate resistance — Thévenin's theorem applied to an active device — became standard practice in the 1920s. For transistors, the hybrid ($h$-) parameters were used from the early 1950s; the physically based hybrid-π model was introduced by Lawrence Giacoletto in 1954 and quickly became the standard.
:::

## Where this leads

The small-signal models and the amplifier model of this chapter are the tools of the rest of the course. [[electronics-1/single-stage-amplifiers]] applies them to all six one-transistor configurations; [[electronics-1/multistage-amplifiers]] combines stages using [[#eq-overall-gain]] between each pair; and [[electronics-1/amplifier-frequency-response]] adds capacitances to the same models. Negative feedback, which trades gain for linearity, bandwidth and controlled input and output resistances, is analysed with the four amplifier types of this chapter in [[electronics-2/feedback]].

::: summary
- Each quantity is bias plus signal: $v_{GS} = V_{GS} + v_{gs}$. Solve the DC problem first, then the linear small-signal problem.
- Linearising: $i_c = g_mv_{be}$ with $g_m = I_C/V_T$, valid for $\abs{v_{be}} \ll V_T$; $i_d = g_mv_{gs}$ with $g_m = 2I_D/V_{OV}$, valid for $\abs{v_{gs}} \ll V_{OV}$. The second-harmonic distortion is $\hat v/(4V_T)$ or $\hat v/(4V_{OV})$.
- MOSFET model: $g_mv_{gs}$ in parallel with $r_o = V_A/I_D$, open gate; BJT hybrid-π: $r_\pi = \beta/g_m$ from base to emitter, $g_mv_\pi$ in parallel with $r_o = V_A/I_C$; T model with $r_e = \alpha/g_m$.
- The intrinsic gain $g_mr_o$ is $V_A/V_T$ for a BJT (thousands) and $2V_A/V_{OV}$ for a MOSFET (tens to hundreds).
- In the small-signal circuit, DC voltage sources are grounds, DC current sources are open, and large capacitors are shorts at midband.
- An amplifier is described by $R_{\text{in}}$, $A_{vo}$ and $R_{\text{out}}$; with a source and a load, $G_v = \frac{R_{\text{in}}}{R_{\text{in}} + R_{\text{sig}}}A_{vo}\frac{R_L}{R_L + R_{\text{out}}}$.
:::

## Exercises

::: exercise BJT transconductance {level=1 check="0.25e-3/0.026"}
Find $g_m$, in siemens, for a BJT biased at $I_C = 0.25\,\mathrm{mA}$ ($V_T = 26\,\mathrm{mV}$), and its $r_\pi$ for $\beta = 120$.
::: solution
$g_m = 0.25\,\mathrm{mA}/26\,\mathrm{mV} = 9.62\,\mathrm{mS}$ and $r_\pi = 120/0.00962 = 12.5\,\mathrm{k\Omega}$.
:::
:::

::: exercise MOSFET transconductance {level=1 check="2*0.2e-3/0.2"}
A MOSFET carries $I_D = 0.2\,\mathrm{mA}$ at $V_{OV} = 0.2\,\mathrm{V}$. Find $g_m$ in siemens and $k_n$.
::: solution
$g_m = 2I_D/V_{OV} = 2\,\mathrm{mS}$, and $k_n = g_m/V_{OV} = 10\,\mathrm{mA/V^2}$ (check: $\sqrt{2k_nI_D} = \sqrt{2\times0.01\times0.0002} = 2\,\mathrm{mS}$).
:::
:::

::: exercise Overall gain {level=1 check="10/(10+5)*(-100)*2/(2+1)"}
An amplifier with $R_{\text{in}} = 10\,\mathrm{k\Omega}$, $A_{vo} = -100$ and $R_{\text{out}} = 1\,\mathrm{k\Omega}$ is driven from a $5\,\mathrm{k\Omega}$ source and loaded by $2\,\mathrm{k\Omega}$. Find $G_v$.
::: solution
$G_v = \frac{10}{15}(-100)\frac{2}{3} = -44.4\,\mathrm{V/V}$.
:::
:::

::: exercise Allowed input for 1 % distortion {level=2 check="0.04*0.026"}
What is the largest peak input voltage, in volts, at the base of a BJT for which the second-harmonic distortion of the collector current stays below $1\,\%$?
::: solution
$\hat v/(4V_T) \le 0.01$ gives $\hat v \le 0.04V_T = 1.04\,\mathrm{mV}$. Small-signal really means small for a bare BJT.
:::
:::

::: exercise Equivalence of the T and hybrid-π models {level=2 check="101*25"}
A BJT has $\beta = 100$ and $r_e = 25\,\Omega$. What is $r_\pi$, in ohms? Show that both models predict the same collector current for a given $v_{be}$.
::: solution
$r_\pi = (\beta + 1)r_e = 101\times25 = 2525\,\Omega$. In the T model $i_e = v_{be}/r_e$ and $i_c = \alpha i_e = \alpha v_{be}/r_e$; in the hybrid-π model $i_c = g_mv_{be}$ with $g_m = \alpha/r_e$. They are the same.
:::
:::

::: exercise A CS amplifier {level=2 check="-4e-3*(10e3*40e3/(50e3))"}
A CS amplifier has $g_m = 4\,\mathrm{mS}$, $r_o = 40\,\mathrm{k\Omega}$, a drain resistor of $10\,\mathrm{k\Omega}$ and its source grounded for signals. The gate is biased by a divider equivalent to $1\,\mathrm{M\Omega}$. Find $R_{\text{in}}$, $R_{\text{out}}$ and $A_{vo}$ (V/V, the value to enter).
::: solution
No gate current flows, so $R_{\text{in}} = 1\,\mathrm{M\Omega}$, the bias resistors alone. $R_{\text{out}} = R_D\parallel r_o = 8\,\mathrm{k\Omega}$. $A_{vo} = -g_m(R_D\parallel r_o) = -4\times10^{-3}\times8000 = -32$.
:::
:::

::: exercise Parameters scale with current {level=2}
A BJT stage biased at $I_C = 1\,\mathrm{mA}$ has $g_m = 38.5\,\mathrm{mS}$, $r_\pi = 2.6\,\mathrm{k\Omega}$ and $r_o = 100\,\mathrm{k\Omega}$. The bias is reduced to $0.1\,\mathrm{mA}$. Find the new parameters, and say what happens to the intrinsic gain and to the gain $-g_mR_C$ if $R_C$ is increased tenfold to keep the same DC drop.
::: solution
All three scale with current: $g_m = 3.85\,\mathrm{mS}$, $r_\pi = 26\,\mathrm{k\Omega}$, $r_o = 1\,\mathrm{M\Omega}$. The intrinsic gain $g_mr_o = V_A/V_T$ is unchanged. With $R_C$ ten times larger, $-g_mR_C = -V_{R_C}/V_T$ is also unchanged: the gain of a BJT stage depends on the DC drop across the load, not on the current. What changes is the speed (smaller currents charge capacitances more slowly) and the input resistance (ten times higher).
:::
:::

::: exercise Output resistance with a test source {#exr-rout-degen level=3}
A MOSFET has its source connected to ground through a resistor $R_S$ (unbypassed), its gate at signal ground, and its drain connected to a test source $v_x$. Using the small-signal model with $r_o$, show that the resistance looking into the drain is $R_{\text{out}} = R_S + r_o + g_mr_oR_S$.
::: hint
The current $i_x$ flows through $R_S$, so $v_{gs} = -i_xR_S$. Write KVL from drain to ground through $r_o$ and $R_S$.
:::
::: solution
With the gate grounded, $v_{gs} = -v_s = -i_xR_S$. The current in $r_o$ is $i_x - g_mv_{gs} = i_x(1 + g_mR_S)$, so the voltage across it is $i_x(1 + g_mR_S)r_o$. Then

$$
v_x = i_xR_S + i_x(1 + g_mR_S)r_o \quad\Longrightarrow\quad R_{\text{out}} = R_S + r_o + g_mr_oR_S \approx r_o(1 + g_mR_S).
$$

Source degeneration multiplies the output resistance by about $1 + g_mR_S$. This is the principle of the cascode and of improved current sources ([[electronics-1/multistage-amplifiers]], [[electronics-1/current-mirrors]]).
:::
:::

::: exercise Third harmonic of a BJT {level=3}
Including the cubic term of [[#eq-bjt-taylor]], show that the third-harmonic distortion of a BJT's collector current is approximately $\mathrm{HD}_3 = \tfrac{1}{24}(\hat v/V_T)^2$, and evaluate it for $\hat v = 5\,\mathrm{mV}$. Why does a square-law MOSFET have no third harmonic?
::: hint
$\cos^3\theta = \tfrac34\cos\theta + \tfrac14\cos3\theta$.
:::
::: solution
The cubic term is $\tfrac16(\hat v/V_T)^3\cos^3\omega t = \tfrac16(\hat v/V_T)^3\bigl(\tfrac34\cos\omega t + \tfrac14\cos3\omega t\bigr)$, so the third harmonic has amplitude $I_C\tfrac{1}{24}(\hat v/V_T)^3$. Dividing by the fundamental $I_C\hat v/V_T$ gives $\mathrm{HD}_3 = \tfrac1{24}(\hat v/V_T)^2$. For $\hat v = 5\,\mathrm{mV}$: $(5/26)^2/24 = 1.5\times10^{-3}$, or $0.15\,\%$, much smaller than $\mathrm{HD}_2 = 4.8\,\%$. The square law [[#eq-mos-taylor]] has no cubic term, so an ideal square-law device produces only a second harmonic; real short-channel devices do have odd-order distortion. (In a differential pair, [[electronics-1/differential-amplifiers]], the even harmonics cancel and the third becomes the dominant one.)
:::
:::

::: exercise Choosing the bias for a gain and an input resistance {level=3 check="100*0.026/(1/(1/10e3 - 1/100e3))"}
A CE stage with bypassed emitter must have $R_{\text{in}} \ge 10\,\mathrm{k\Omega}$ for a transistor with $\beta = 100$, using bias resistors with $R_B = 100\,\mathrm{k\Omega}$. What is the largest collector current, in amperes, that meets the specification? With that current, what $R_C$ gives $A_{vo} = -100$ (ignore $r_o$)?
::: hint
$R_{\text{in}} = R_B\parallel r_\pi$, so find the smallest allowed $r_\pi$.
:::
::: solution
$R_B\parallel r_\pi \ge 10\,\mathrm{k\Omega}$ with $R_B = 100\,\mathrm{k\Omega}$ requires $r_\pi \ge 1/(1/10 - 1/100)\,\mathrm{k\Omega} = 11.1\,\mathrm{k\Omega}$. Since $r_\pi = \beta V_T/I_C$, $I_C \le \beta V_T/r_\pi = 100\times0.026/11\,111 = 0.234\,\mathrm{mA}$. Then $g_m = 0.234/26 = 9.0\,\mathrm{mS}$ and $R_C = 100/g_m = 11.1\,\mathrm{k\Omega}$, a DC drop of $2.6\,\mathrm{V}$ — consistent with $A_{vo} = -V_{R_C}/V_T$.
:::
:::
