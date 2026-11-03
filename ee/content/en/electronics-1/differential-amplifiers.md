An electrocardiogram electrode on your chest picks up the heart's signal, about one millivolt. It also picks up the $50$ or $60\,\mathrm{Hz}$ field of the mains wiring in the room, which couples into your body and raises it, relative to the amplifier's ground, by as much as a volt. Amplify the electrode's voltage relative to ground and the mains hum, a thousand times larger, swamps the heartbeat. But the hum is the *same* on two electrodes a few centimetres apart, while the heart signal differs between them. An amplifier that responds to the **difference** between its two inputs and ignores what they have in **common** recovers the heartbeat.

That is the **differential amplifier**, and its core, the **differential pair** — two matched transistors sharing a tail current — is probably the most important circuit in analog electronics. It is the input stage of every operational amplifier and comparator, the core of mixers and variable-gain amplifiers, the receiver of every high-speed serial link (USB, PCIe, Ethernet), and the basic gate of emitter- and current-mode logic. It also solves the drift problem of direct-coupled amplifiers met in [[electronics-1/multistage-amplifiers]]: temperature changes the $V_{BE}$ or $V_{GS}$ of both transistors equally, so their difference does not drift.

This chapter analyses the MOSFET and BJT pairs, first for large signals and then with the small-signal models of [[electronics-1/small-signal-amplifiers]], introduces the half-circuit method that makes symmetric circuits easy, and treats the two issues that limit real differential amplifiers: mismatch, which causes offset and limits common-mode rejection, and the current-mirror active load of [[electronics-1/current-mirrors]], which gives high gain with a single-ended output.

## Differential and common-mode signals

::: definition Differential and common-mode components {#def-dm-cm}
Any two input voltages $v_1$ and $v_2$ can be written as

$$
v_1 = v_{icm} + \tfrac12v_{id}, \qquad v_2 = v_{icm} - \tfrac12v_{id},
$$

with the **differential-mode** input $v_{id} = v_1 - v_2$ and the **common-mode** input $v_{icm} = \tfrac12(v_1 + v_2)$. For a linear amplifier with output $v_o$,

$$
v_o = A_d\,v_{id} + A_{cm}\,v_{icm},
$$ {#eq-ad-acm}

which defines the **differential gain** $A_d$ and the **common-mode gain** $A_{cm}$. The **common-mode rejection ratio** is

$$
\mathrm{CMRR} = \frac{\abs{A_d}}{\abs{A_{cm}}}, \qquad \mathrm{CMRR}_{\mathrm{dB}} = 20\log_{10}\frac{\abs{A_d}}{\abs{A_{cm}}}.
$$
:::

An ideal differential amplifier has $A_{cm} = 0$ and infinite CMRR. Real ones have CMRRs of $60$–$120\,\mathrm{dB}$. In the ECG example, a CMRR of $100\,\mathrm{dB}$ reduces a $1\,\mathrm{V}$ common-mode hum to the equivalent of $10\,\mathrm{\mu V}$ of differential input, a hundredth of the signal.

## The MOSFET differential pair

Two matched NMOS transistors $M_1$ and $M_2$ have their sources joined at a node $S$, which is fed by a **tail current source** $I$ to the negative supply (or ground). Their gates are the inputs $v_{G1}$, $v_{G2}$, and their drains are connected through equal resistors $R_D$ to $V_{DD}$. The outputs are the two drain voltages, or their difference.

The tail source forces $i_{D1} + i_{D2} = I$ whatever the inputs. If both gates move together, the source node simply follows them (one $V_{GS}$ below) and nothing else changes: the currents stay at $I/2$ each, and the drain voltages do not move. If the gates move apart, current is **steered** from one side to the other. This is the essential behaviour: a differential pair responds to the difference of its inputs and, ideally, not at all to their common level.

::: theorem Large-signal transfer of the MOSFET pair {#thm-mos-pair}
For matched transistors in saturation (square law, $\lambda = 0$) with tail current $I$, let $V_{OV} = \sqrt{I/k_n}$ be the overdrive of each transistor at balance ($i_{D1} = i_{D2} = I/2$). Then for $\abs{v_{id}} \le \sqrt2\,V_{OV}$,

$$
i_{D1,2} = \frac I2 \pm \frac{I}{V_{OV}}\,\frac{v_{id}}{2}\sqrt{1 - \left(\frac{v_{id}/2}{V_{OV}}\right)^2},
$$ {#eq-mos-pair}

and for $\abs{v_{id}} \ge \sqrt2\,V_{OV}$ all of $I$ flows in one transistor and the other is cut off.
:::

::: proof
In saturation $\sqrt{i_{D1}} = \sqrt{k_n/2}\,(v_{GS1} - V_{th})$ and similarly for $M_2$. Subtracting, and using $v_{GS1} - v_{GS2} = v_{G1} - v_{G2} = v_{id}$ (the sources are common),

$$
\sqrt{i_{D1}} - \sqrt{i_{D2}} = \sqrt{k_n/2}\;v_{id}.
$$

Square this and use $i_{D1} + i_{D2} = I$: $I - 2\sqrt{i_{D1}i_{D2}} = \tfrac12k_nv_{id}^2$, so $\sqrt{i_{D1}i_{D2}} = \tfrac12(I - \tfrac12k_nv_{id}^2)$. Then $i_{D1}$ and $i_{D2}$ are the roots of $x^2 - Ix + \tfrac14(I - \tfrac12k_nv_{id}^2)^2 = 0$, namely

$$
i_{D1,2} = \frac I2 \pm \frac12\sqrt{I^2 - \bigl(I - \tfrac12k_nv_{id}^2\bigr)^2} = \frac I2 \pm \frac12\sqrt{k_nIv_{id}^2 - \tfrac14k_n^2v_{id}^4}.
$$

With $k_n = I/V_{OV}^2$ the square root becomes $(I/V_{OV})\,\abs{v_{id}}\sqrt{1 - v_{id}^2/(4V_{OV}^2)}$, which gives [[#eq-mos-pair]]. The expression reaches $i_{D1} = I$ when $v_{id}^2 = 2V_{OV}^2$; beyond that, $M_2$ is cut off.
:::

For small $v_{id}$ the square root is close to $1$ and $i_{D1} - I/2 \approx (I/V_{OV})(v_{id}/2) = g_m(v_{id}/2)$, with $g_m = 2(I/2)/V_{OV} = I/V_{OV}$, the transconductance of each transistor at its bias current $I/2$. The pair is linear for $\abs{v_{id}}$ up to a fraction of $V_{OV}$ and switches completely at $\sqrt2V_{OV}$: a larger overdrive gives a wider linear range but less $g_m$ for the same current — the same trade-off as for a single transistor.

### The BJT differential pair

For two matched BJTs with joined emitters and tail current $I$, the exponential law makes the result particularly elegant.

::: proposition Large-signal transfer of the BJT pair {#prop-bjt-pair}
$$
i_{C1} = \frac{\alpha I}{1 + e^{-v_{id}/V_T}}, \qquad i_{C2} = \frac{\alpha I}{1 + e^{v_{id}/V_T}}, \qquad i_{C1} - i_{C2} = \alpha I\tanh\frac{v_{id}}{2V_T}.
$$ {#eq-bjt-pair}
:::

::: proof
$i_{E1}/i_{E2} = e^{(v_{BE1} - v_{BE2})/V_T} = e^{v_{id}/V_T}$ and $i_{E1} + i_{E2} = I$, so $i_{E1} = I/(1 + e^{-v_{id}/V_T})$; multiply by $\alpha$. For the difference, $\frac{1}{1 + e^{-x}} - \frac{1}{1 + e^{x}} = \frac{e^{x} - 1}{e^{x} + 1} = \tanh(x/2)$ with $x = v_{id}/V_T$ (see [[#exr-tanh]]).
:::

The BJT pair is linear only for $\abs{v_{id}}$ well below $2V_T \approx 50\,\mathrm{mV}$ and has switched by $90\,\%$ ($\tanh = 0.9$) at $v_{id} = 2V_T\,\mathrm{artanh}(0.9) = 3.7V_T \approx 95\,\mathrm{mV}$. Its small-signal transconductance per side is $g_m = (I/2)/V_T$. The sharp switching is exploited in **emitter-coupled logic** (ECL) and current-mode logic, where a pair steers a fixed current one way or the other with a swing of only a few hundred millivolts, never saturating — the fastest logic family of the bipolar era.

::: widget plot
f: 0.5 + (x/(2000*Vov))*sqrt(max(0, 1 - (x/(2000*Vov))^2))*if(abs(x) < 1414*Vov, 1, 0) + if(x >= 1414*Vov, 0.5, 0) - if(x <= -1414*Vov, 0.5, 0); 1/(1 + exp(-x/26))
x: -400, 400
y: 0, 1
sliders: Vov=0.2:0.05:0.5:0.01
labels: \text{MOSFET } i_{D1}/I; \text{BJT } i_{C1}/(\alpha I)
caption: Fraction of the tail current in transistor 1 against the differential input $v_{id}$ (millivolts) for a MOSFET pair with balance overdrive $V_{OV}$ (volts, slider) and a BJT pair ($V_T = 26\,\mathrm{mV}$). The BJT pair switches over about $\pm100\,\mathrm{mV}$; the MOSFET pair over $\pm\sqrt2\,V_{OV}$. Raise $V_{OV}$: the MOSFET curve becomes more linear and less steep at the centre — less gain, more range.
:::

::: example Current steering in a MOSFET pair {#ex-steering}
A MOSFET pair has tail current $I = 0.4\,\mathrm{mA}$ and balance overdrive $V_{OV} = 0.2\,\mathrm{V}$. Find $k_n$, the differential input that switches the pair completely, and $i_{D1}$ for $v_{id} = 50\,\mathrm{mV}$. Compare with the small-signal prediction.
::: solution
$k_n = I/V_{OV}^2 = 0.4\,\mathrm{mA}/0.04\,\mathrm{V^2} = 10\,\mathrm{mA/V^2}$ (check: $\tfrac12k_nV_{OV}^2 = 0.2\,\mathrm{mA} = I/2$). Full switching occurs at $\abs{v_{id}} = \sqrt2\times0.2 = 0.283\,\mathrm{V}$. For $v_{id} = 50\,\mathrm{mV}$, by [[#eq-mos-pair]],

$$
i_{D1} = 0.2 + \frac{0.4}{0.2}(0.025)\sqrt{1 - (0.025/0.2)^2} = 0.2 + 0.05\times0.9922 = 0.2496\,\mathrm{mA}.
$$

The small-signal estimate is $I/2 + g_mv_{id}/2$ with $g_m = I/V_{OV} = 2\,\mathrm{mS}$: $0.2 + 0.002\times0.025\,\mathrm{A} = 0.2500\,\mathrm{mA}$. The error is $0.8\,\%$ of the signal current — the pair is quite linear at $v_{id} = V_{OV}/4$. A BJT pair at the same $50\,\mathrm{mV}$ would already have $i_{C1}/\alpha I = 1/(1 + e^{-50/26}) = 0.87$, far from linear.
:::
:::

### Common-mode input range

The pair works only if all its transistors, including the tail source, stay in saturation. For an NMOS pair with resistive loads and a tail source needing $V_{CS}$ across it (its compliance, a few hundred millivolts), the common-mode input must satisfy

$$
V_{CS} + V_{GS} \le v_{icm} \le V_{DD} - \tfrac12IR_D + V_{th},
$$

where $V_{GS}$ is evaluated at $I/2$: the lower limit keeps the tail source working, the upper keeps $M_1$ and $M_2$ out of triode (gate no more than $V_{th}$ above the drain). On a $1.8\,\mathrm{V}$ supply this window can be under a volt, which is why "rail-to-rail input" op-amps combine NMOS and PMOS pairs in parallel.

## Small-signal analysis and the half-circuit

With the transistors linearised, the circuit is linear and symmetric, and symmetry makes it easy.

::: theorem Half-circuit analysis {#thm-half-circuit}
Let a linear circuit be symmetric about a vertical axis: each element on the left has an identical mirror image on the right, and an element from a node on the axis to ground, such as the tail resistance $R_{SS}$, is regarded as two elements of twice the resistance ($2R_{SS}$) in parallel, one belonging to each half. Then

- for a **purely differential** excitation ($v_1 = +v_{id}/2$, $v_2 = -v_{id}/2$), every node on the symmetry axis is at signal ground, and each half can be analysed alone with its axis nodes grounded;
- for a **purely common-mode** excitation ($v_1 = v_2 = v_{icm}$), no current crosses the axis, and each half can be analysed alone with its connections to the axis opened (keeping the split element $2R_{SS}$).

By superposition, the response to any $v_1, v_2$ is the sum of the two.
:::

::: proof
For differential excitation, the circuit's linearity and symmetry imply that the response at a node on the left is the negative of that at its mirror node on the right. A node *on* the axis is its own mirror image, so its voltage equals its own negative and must be zero. For common-mode excitation the response is symmetric: mirror nodes have equal voltages, so a branch that crosses the axis between mirror nodes carries no current. The element from the axis node to ground carries the sum of two equal currents, one from each half; splitting it into two parallel elements of twice the resistance, one per half, preserves every node voltage.
:::

### Differential gain

Let the tail source have output resistance $R_{SS}$. For a differential input, the source node $S$ is on the axis and is therefore a signal ground: $R_{SS}$ carries no signal current. Each half is a plain CS stage driven by $\pm v_{id}/2$, and

$$
v_{o1} = -g_m(R_D\parallel r_o)\frac{v_{id}}{2}, \qquad v_{o2} = +g_m(R_D\parallel r_o)\frac{v_{id}}{2}.
$$

The **differential output** $v_{od} = v_{o2} - v_{o1}$ and the single-ended outputs have gains

$$
A_d = \frac{v_{od}}{v_{id}} = g_m(R_D\parallel r_o), \qquad A_{d,\text{se}} = \frac{v_{o2}}{v_{id}} = \tfrac12g_m(R_D\parallel r_o).
$$ {#eq-ad}

Using two transistors and the current of two, the pair gives the gain of one CS stage at the same $g_m$ — the price of symmetry. For the BJT pair, the half-circuit is a CE stage, $A_d = g_m(R_C\parallel r_o)$, and the **differential input resistance** is $2r_\pi$ (each base sees $r_\pi$ to the grounded emitter node, and the two are in series between the inputs).

### Common-mode gain and CMRR

For a common-mode input, the half circuit is a CS stage with source degeneration $2R_{SS}$. From [[electronics-1/single-stage-amplifiers#thm-cs-degen]], neglecting $r_o$,

$$
A_{cm,\text{se}} = \frac{v_{o1}}{v_{icm}} = \frac{v_{o2}}{v_{icm}} = -\frac{R_D}{2R_{SS} + 1/g_m} \approx -\frac{R_D}{2R_{SS}}.
$$ {#eq-acm}

The two single-ended outputs move identically, so in a *perfectly matched* circuit the differential output has zero common-mode gain and infinite CMRR. With a single-ended output,

$$
\mathrm{CMRR}_{\text{se}} = \frac{\tfrac12g_mR_D}{R_D/(2R_{SS} + 1/g_m)} = \tfrac12(1 + 2g_mR_{SS}) \approx g_mR_{SS}.
$$

A high CMRR therefore needs a tail current source with a high output resistance: a cascode tail is common.

::: example A resistively loaded pair {#ex-pair-gain}
A MOSFET pair with $I = 0.4\,\mathrm{mA}$ and $V_{OV} = 0.2\,\mathrm{V}$ has $R_D = 10\,\mathrm{k\Omega}$ and a tail source with $R_{SS} = 50\,\mathrm{k\Omega}$; neglect $r_o$. Find $A_d$ (differential and single-ended outputs), $A_{cm}$ and the CMRR for a single-ended output. Then suppose the drain resistors are mismatched by $1\,\%$ and find the CMRR with a differential output.
::: solution
Each transistor carries $0.2\,\mathrm{mA}$, so $g_m = 2\times0.2/0.2 = 2\,\mathrm{mS}$. By [[#eq-ad]], $A_d = 2\times10^{-3}\times10^4 = 20$ (differential output) and $10$ (single-ended). By [[#eq-acm]], $A_{cm,\text{se}} = -10^4/(10^5 + 500) = -0.0995$, so $\mathrm{CMRR}_{\text{se}} = 10/0.0995 = 100.5$, or $40\,\mathrm{dB}$ — poor.

With $R_{D1} = R_D$ and $R_{D2} = R_D + \Delta R_D$, $\Delta R_D = 100\,\Omega$, a common-mode input produces the same drain current change $i = v_{icm}/(2R_{SS} + 1/g_m)$ in each transistor, so $v_{od} = -i\,\Delta R_D$ and

$$
A_{cm\to d} = \frac{\Delta R_D}{2R_{SS} + 1/g_m} = \frac{100}{100\,500} = 9.95\times10^{-4}.
$$

Then $\mathrm{CMRR} = 20/(9.95\times10^{-4}) = 20\,100$, or $86\,\mathrm{dB}$. The differential output is far better, but mismatch now limits it: $\mathrm{CMRR} \approx (2g_mR_{SS})/(\Delta R_D/R_D)$.
:::
:::

::: quiz
A differential amplifier with $A_d = 1000$ and CMRR $= 80\,\mathrm{dB}$ receives $v_1 = 2.001\,\mathrm{V}$ and $v_2 = 1.999\,\mathrm{V}$. What is the output?
- [ ] $2.000\,\mathrm{V}$
- [x] About $2.2\,\mathrm{V}$: $2\,\mathrm{V}$ from the differential input and $0.2\,\mathrm{V}$ from the common mode.
- [ ] $4\,\mathrm{V}$
- [ ] $2\,\mathrm{V}$ exactly, because the common mode is rejected.
::: solution
$v_{id} = 2\,\mathrm{mV}$ and $v_{icm} = 2\,\mathrm{V}$. A CMRR of $80\,\mathrm{dB}$ means $\abs{A_{cm}} = 1000/10^4 = 0.1$. So $v_o = 1000\times0.002 + 0.1\times2 = 2 + 0.2 = 2.2\,\mathrm{V}$ (or $1.8\,\mathrm{V}$, depending on the sign of $A_{cm}$). A $10\,\%$ error from the common mode, despite an $80\,\mathrm{dB}$ CMRR, because the common-mode input is a thousand times the differential one.
:::
:::

::: widget plot
f: 20*log10(0.5*(1 + 2*gm*x)); 20*log10(gm*(2*x + 1/gm)/d)
x: 10, 1000
y: 20, 120
sliders: gm=2:0.5:10:0.1; d=0.01:0.001:0.05:0.001
labels: \text{single-ended}; \text{differential output, mismatch } \delta
caption: CMRR in dB against the tail resistance $R_{SS}$ (kΩ) for a resistively loaded pair with transconductance $g_m$ (mS): single-ended output, and differential output with a fractional load mismatch $\delta = \Delta R_D/R_D$ (slider). Each tenfold increase of $R_{SS}$ buys $20\,\mathrm{dB}$; halving the mismatch buys $6\,\mathrm{dB}$ on the differential output. This is why precision amplifiers use cascode tails and trimmed or laser-matched loads.
:::

## Mismatch and input offset

With both inputs at the same voltage, a perfect pair has zero differential output. A real one does not: its transistors and load resistors are not quite equal. The **input offset voltage** $V_{OS}$ is the differential input that must be applied to bring the output to zero. It is the most important DC specification of a differential amplifier and of the op-amp built around it.

::: proposition Input offset of the differential pair {#prop-offset}
For small mismatches, the input offset voltage of a resistively loaded pair is

$$
V_{OS} = \Delta V_{th} + \frac{V_{OV}}{2}\left(\frac{\Delta R_D}{R_D} + \frac{\Delta k}{k}\right)\ \ \text{(MOSFET)}, \qquad V_{OS} = V_T\left(\frac{\Delta R_C}{R_C} + \frac{\Delta I_S}{I_S}\right)\ \ \text{(BJT)},
$$ {#eq-vos}

where each term may have either sign; the worst case adds the magnitudes, and for independent random mismatches the RMS values add in quadrature.
:::

::: proof
*BJT.* The output is zero when $I_{C1}R_{C1} = I_{C2}R_{C2}$. With $R_{C2} = R_C(1 + \delta_R)$, this requires $I_{C1}/I_{C2} = 1 + \delta_R$. With $I_{S2} = I_S(1 + \delta_S)$, the ratio of collector currents is $(I_{S1}/I_{S2})e^{V_{OS}/V_T}$, so $e^{V_{OS}/V_T} = (1 + \delta_R)(1 + \delta_S)$ and, to first order, $V_{OS} = V_T(\delta_R + \delta_S)$.

*MOSFET.* Similarly, zero output requires $I_{D1}/I_{D2} = 1 + \delta_R$. A current ratio of $1 + \epsilon$ at fixed tail current corresponds to a differential gate voltage of $\epsilon\,(I/2)/g_m = \epsilon V_{OV}/2$, because $g_m = 2(I/2)/V_{OV}$. A mismatch $\delta_k$ in $k$ is equivalent to a current ratio $1 + \delta_k$ at equal overdrives and must be cancelled likewise, and a threshold difference must be cancelled directly by an equal gate-voltage difference. Adding the three contributions gives [[#eq-vos]].
:::

The formulas contain the same lesson as the mirror mismatch of [[electronics-1/current-mirrors#eq-mismatch]], but in reverse: here a *small* overdrive reduces the offset caused by the load and $k$ mismatches, because each fractional current error is converted into an input voltage by dividing by $g_m/I$, which is largest at small overdrive. The threshold mismatch, however, appears in full and does not depend on bias. BJT pairs, with $V_{BE}$ mismatches typically below $1\,\mathrm{mV}$ and no threshold term, have the smallest offsets; MOSFET pairs need large input transistors, careful common-centroid layout, and often trimming or chopper and auto-zero techniques to get below a millivolt.

::: example Offset of BJT and MOSFET pairs {#ex-offset}
(a) A BJT pair has a $2\,\%$ mismatch in collector resistors and a $5\,\%$ mismatch in $I_S$. Find the worst-case offset. (b) A MOSFET pair with $V_{OV} = 0.2\,\mathrm{V}$ has $\Delta V_{th} = 3\,\mathrm{mV}$, $\Delta R_D/R_D = 2\,\%$ and $\Delta k/k = 2\,\%$. Find the worst-case offset. (c) What output error does each produce in a stage with differential gain $100$?
::: solution
(a) $V_{OS} = 26\,\mathrm{mV}\times(0.02 + 0.05) = 1.82\,\mathrm{mV}$.

(b) $V_{OS} = 3 + \tfrac12(200)(0.02 + 0.02)\,\mathrm{mV} = 3 + 4 = 7\,\mathrm{mV}$.

(c) The output offsets are $100V_{OS}$: $0.18\,\mathrm{V}$ and $0.7\,\mathrm{V}$. In an op-amp with a gain of $10^5$, either would saturate the output, which is why op-amps are always used with negative feedback that sets the gain to a modest value ([[electronics-2/feedback]]); the offset then appears at the output multiplied only by the closed-loop gain.
:::
:::

::: quiz
To reduce the offset of a MOSFET pair whose offset is dominated by threshold mismatch, which change helps most?
- [ ] Reducing the overdrive, since that reduces the $\tfrac12V_{OV}$ terms.
- [x] Making the input transistors larger in gate area, since $\Delta V_{th}$ falls as $1/\sqrt{WL}$.
- [ ] Increasing the tail current.
- [ ] Increasing the load resistors.
::: solution
The threshold term $\Delta V_{th}$ appears in $V_{OS}$ directly, independent of bias, so changing $V_{OV}$, $I$ or $R_D$ does not touch it. By Pelgrom's law its standard deviation is inversely proportional to the square root of the gate area: four times the area halves it. Reducing $V_{OV}$ helps only the load and $k$ terms. Larger devices add capacitance, so precision and speed pull in opposite directions.
:::
:::

## The actively loaded differential pair

Replace the two drain resistors by a PMOS current mirror: $M_3$, diode-connected, is the load of $M_1$, and $M_4$, which mirrors $M_3$'s current, is the load of $M_2$. The output is taken single-ended at the drain of $M_2$ and $M_4$. This is the five-transistor operational transconductance amplifier (OTA), the simplest op-amp and the input stage of many more.

Its operation is easiest to see in terms of currents. A differential input steers $+g_mv_{id}/2$ into $M_1$ and $-g_mv_{id}/2$ into $M_2$. The mirror copies $M_1$'s increase to $M_4$, which therefore pushes $+g_mv_{id}/2$ into the output node, while $M_2$ pulls $-g_mv_{id}/2$ out of it — that is, $M_2$'s current *decreases*, so the output node receives the difference: a total of $g_mv_{id}$. The mirror has converted the differential signal into a single-ended one **without losing half the signal**, as a single-ended output of the resistive pair does.

::: theorem Gain of the actively loaded pair {#thm-active-pair}
For the five-transistor pair with input transconductance $g_m$ (each of $M_1$, $M_2$), output resistances $r_{o2}$, $r_{o4}$, and a tail source of resistance $R_{SS}$, the short-circuit transconductance is $G_m \approx g_m$ and

$$
A_d = g_m(r_{o2}\parallel r_{o4}), \qquad A_{cm} \approx -\frac{1}{2g_{m3}R_{SS}}, \qquad \mathrm{CMRR} \approx 2g_mg_{m3}(r_{o2}\parallel r_{o4})R_{SS}.
$$ {#eq-active-pair}
:::

::: proof {collapsed}
*Differential gain.* Short the output to signal ground and compute the output current. With the output shorted, the circuit is nearly symmetric, the tail node is at signal ground, and $M_1$ and $M_2$ carry $\pm g_mv_{id}/2$. $M_1$'s current flows through the low resistance $1/g_{m3}$ of the diode-connected $M_3$ and is mirrored by $M_4$; the output current is $g_mv_{id}/2 + g_mv_{id}/2 = g_mv_{id}$, so $G_m = g_m$. The output resistance is $r_{o2}\parallel r_{o4}$ (looking into $M_4$'s drain gives $r_{o4}$; looking into $M_2$'s drain, with the tail node and $M_1$'s source providing only a moderate degeneration that is largely cancelled by the mirror's action, gives approximately $r_{o2}$). So $A_d = G_mR_{\text{out}} = g_m(r_{o2}\parallel r_{o4})$.

*Common-mode gain.* For a common-mode input each input transistor carries $i = v_{icm}/(2R_{SS})$ (approximately, for $g_mR_{SS} \gg 1$). $M_3$ receives $i$ and $M_4$ copies it into the output node, while $M_2$ draws the same $i$ out of it, so to first order the currents cancel and only the imperfection of the mirror is left. The diode-connected $M_3$ presents $1/g_{m3}$ in parallel with $r_{o1}$ and $r_{o3}$; the mirror's current gain differs from $1$ by a fraction of order $1/(g_{m3}r_o)$, and the net output current, flowing into $r_{o2}\parallel r_{o4}$, gives $A_{cm} \approx -1/(2g_{m3}R_{SS})$. A careful nodal analysis is in Gray, Hurst, Lewis and Meyer (Chapter 4) or Razavi (Chapter 5).
:::

::: example An OTA {#ex-ota}
A five-transistor OTA has $g_m = 2\,\mathrm{mS}$ for the input pair, $g_{m3} = 2\,\mathrm{mS}$ for the mirror, $r_{o2} = r_{o4} = 100\,\mathrm{k\Omega}$ and a tail resistance $R_{SS} = 50\,\mathrm{k\Omega}$. Find $A_d$, $A_{cm}$ and the CMRR. Compare with the resistively loaded pair of [[#ex-pair-gain]].
::: solution
By [[#eq-active-pair]], $A_d = 2\times10^{-3}\times50\,\mathrm{k\Omega} = 100$, five times the differential-output gain of [[#ex-pair-gain]] and ten times its single-ended gain, with no large DC drop. $A_{cm} \approx -1/(2\times2\times10^{-3}\times5\times10^4) = -0.005$, so $\mathrm{CMRR} = 100/0.005 = 20\,000$, or $86\,\mathrm{dB}$ — single-ended and before mismatch, which in practice reduces it to $60$–$80\,\mathrm{dB}$.
:::
:::

::: warning The single-ended output still has a common-mode limit
Do not conclude from [[#ex-ota]] that an actively loaded pair is immune to common-mode signals. Its CMRR is set by the tail resistance and by mismatch between the two halves of the mirror and the input pair; at high frequencies the capacitance at the tail node shunts $R_{SS}$ and the CMRR falls steeply. Specifications such as "CMRR $90\,\mathrm{dB}$" on an op-amp data sheet are DC values; at $10\,\mathrm{kHz}$ the same amplifier may have $60\,\mathrm{dB}$.
:::

::: application Differential signalling
High-speed data links send each bit as a voltage difference on a pair of wires — LVDS with about $350\,\mathrm{mV}$ of swing, USB, PCIe, HDMI and Ethernet among them. Interference couples almost equally into both wires and appears as a common-mode signal, which the receiver's differential pair rejects; the two wires' equal and opposite currents also radiate little. As of 2026, PCIe 6.0 and 7.0 links signal at $64$ and $128\,\mathrm{GT/s}$ per lane using PAM4 modulation, with CMOS differential receivers whose input pairs are, at heart, the circuit of this chapter.
:::

::: history
The differential, or long-tailed, pair goes back to vacuum tubes. Balanced valve amplifiers were used for physiological recordings in the 1930s, and Alan Blumlein filed the British patent that describes the long-tailed pair — two valves with a shared cathode resistor — in 1936. Otto Schmitt's 1937 trigger circuit and many early electrophysiology amplifiers were based on the same idea. The transistor pair became the input stage of the first monolithic op-amps, Bob Widlar's μA702 (1964) and μA709 (1965), and the 741 (1968); Hannon Yourke's current-switch logic (IBM, 1956), sold from 1962 as Motorola's emitter-coupled MECL family, turned the pair into the fastest logic family of its time. The five-transistor OTA is the starting point of nearly all CMOS op-amp design since the 1970s.
:::

## Where this leads

The differential pair, with a mirror load and a tail current source, is the first stage of the two-stage and folded-cascode op-amps of [[electronics-2/operational-amplifier-design]]; its offset and CMRR become the op-amp's, and the feedback analysis of [[electronics-2/feedback]] depends on the high differential gain it provides. Its frequency response — and in particular why its CMRR falls at high frequency — follows from the methods of [[electronics-1/amplifier-frequency-response]]. Differential signalling and the pair's noise appear in [[communication-systems]] and [[electronics-2/electronic-noise]].

::: summary
- Inputs decompose into $v_{id} = v_1 - v_2$ and $v_{icm} = (v_1 + v_2)/2$; $v_o = A_dv_{id} + A_{cm}v_{icm}$ and $\mathrm{CMRR} = \abs{A_d/A_{cm}}$.
- A pair with a tail current steers current with the input difference: the MOSFET pair switches fully at $\abs{v_{id}} = \sqrt2V_{OV}$; the BJT pair follows $\alpha I\tanh(v_{id}/2V_T)$ and switches within about $\pm100\,\mathrm{mV}$.
- Half-circuits: for differential inputs the tail node is a signal ground, giving $A_d = g_m(R_D\parallel r_o)$ (differential output); for common-mode inputs each half has $2R_{SS}$ in its source, giving $A_{cm,\text{se}} \approx -R_D/(2R_{SS})$.
- A high CMRR needs a high-resistance tail and good matching; with a differential output, mismatch sets CMRR $\approx 2g_mR_{SS}/(\Delta R_D/R_D)$.
- Input offset: $V_{OS} = V_T(\Delta R_C/R_C + \Delta I_S/I_S)$ (BJT) or $\Delta V_{th} + \tfrac12V_{OV}(\Delta R_D/R_D + \Delta k/k)$ (MOSFET).
- A current-mirror load converts the differential signal to single-ended without loss: $A_d = g_m(r_{o2}\parallel r_{o4})$, the five-transistor OTA.
:::

## Exercises

::: exercise Decomposing inputs {level=1 check="0.02"}
The inputs of a differential amplifier are $v_1 = 1.01\,\mathrm{V}$ and $v_2 = 0.99\,\mathrm{V}$. Find $v_{id}$ (in volts, the answer to enter) and $v_{icm}$.
::: solution
$v_{id} = 0.02\,\mathrm{V}$ and $v_{icm} = 1.00\,\mathrm{V}$.
:::
:::

::: exercise CMRR in decibels {level=1 check="80"}
An amplifier has $A_d = 100$ and $A_{cm} = 0.01$. Find its CMRR in decibels.
::: solution
$20\log_{10}(100/0.01) = 20\log_{10}10^4 = 80\,\mathrm{dB}$.
:::
:::

::: exercise Current steering in a BJT pair {level=1 check="1/(1+exp(-2))"}
A BJT pair has $v_{id} = 2V_T$. What fraction of the tail current (divided by $\alpha$) flows in $Q_1$?
::: solution
$1/(1 + e^{-2}) = 0.881$.
:::
:::

::: exercise Full switching of a MOSFET pair {level=2 check="sqrt(2)*0.15"}
A MOSFET pair is biased with balance overdrive $0.15\,\mathrm{V}$. What differential input, in volts, steers the whole tail current into one transistor?
::: solution
$\sqrt2V_{OV} = 0.212\,\mathrm{V}$.
:::
:::

::: exercise Gain of a BJT pair {level=2 check="0.5e-3/0.026*5e3"}
A BJT pair has a $1\,\mathrm{mA}$ tail current and $5\,\mathrm{k\Omega}$ collector resistors. Neglecting $r_o$, find the differential gain with a differential output.
::: solution
Each transistor carries $0.5\,\mathrm{mA}$: $g_m = 19.2\,\mathrm{mS}$ and $A_d = g_mR_C = 96.2$. The differential input resistance is $2r_\pi = 2\beta/g_m$, for example $10.4\,\mathrm{k\Omega}$ at $\beta = 100$.
:::
:::

::: exercise Common-mode gain {level=2 check="-10e3/(2*100e3+1e3)"}
A MOSFET pair has $g_m = 1\,\mathrm{mS}$, $R_D = 10\,\mathrm{k\Omega}$ and $R_{SS} = 100\,\mathrm{k\Omega}$. Find the single-ended common-mode gain.
::: solution
$A_{cm,\text{se}} = -R_D/(2R_{SS} + 1/g_m) = -10\,000/201\,000 = -0.0498$.
:::
:::

::: exercise Offset from load mismatch {level=2 check="0.026*0.01"}
A BJT pair is perfectly matched except that its collector resistors differ by $1\,\%$. Find the input offset voltage, in volts.
::: solution
$V_{OS} = V_T\,\Delta R_C/R_C = 26\,\mathrm{mV}\times0.01 = 0.26\,\mathrm{mV}$.
:::
:::

::: exercise The tanh law {#exr-tanh level=3}
Derive $i_{C1} - i_{C2} = \alpha I\tanh(v_{id}/2V_T)$ for the BJT pair, and use it to show that the small-signal transconductance at balance is $\alpha I/(2V_T)$ per side. Find the input $v_{id}$ at which the transfer deviates from its tangent by $1\,\%$.
::: hint
For small $x$, $\tanh x \approx x - x^3/3$.
:::
::: solution
From [[#prop-bjt-pair]], with $x = v_{id}/V_T$, $i_{C1} - i_{C2} = \alpha I\left(\frac{1}{1 + e^{-x}} - \frac{1}{1 + e^{x}}\right)$. Over the common denominator $(1 + e^{-x})(1 + e^{x}) = 2 + e^{x} + e^{-x}$, the numerator is $e^{x} - e^{-x}$, and dividing numerator and denominator by $e^{x/2} + e^{-x/2}$ squared gives $\tanh(x/2)$. The slope at $v_{id} = 0$ is $\alpha I/(2V_T)$; since $i_{C1} = \frac{\alpha I}{2} + \frac12(i_{C1} - i_{C2})$, the change in each collector current is $\frac{\alpha I}{4V_T}v_{id} = g_m\frac{v_{id}}{2}$ with $g_m = \alpha(I/2)/V_T$, consistent with the half-circuit. The relative deviation from the tangent is $(u - \tanh u)/u \approx u^2/3$ with $u = v_{id}/(2V_T)$; setting $u^2/3 = 0.01$ gives $u = 0.173$ and $v_{id} = 0.35V_T = 9\,\mathrm{mV}$.
:::
:::

::: exercise CMRR with mismatched loads {level=3}
Using half-circuits, show that a resistively loaded MOSFET pair with drain resistors $R_D$ and $R_D + \Delta R_D$ has, for a differential output, $A_{cm\to d} = \Delta R_D/(2R_{SS} + 1/g_m)$ and $\mathrm{CMRR} \approx 2g_mR_{SS}\,R_D/\Delta R_D$. Repeat for a mismatch $\Delta g_m$ between the transistors with equal loads.
::: solution
For a common-mode input, both halves have the same degenerated transconductance $G = g_m/(1 + 2g_mR_{SS}) = 1/(2R_{SS} + 1/g_m)$, so both drain currents change by $Gv_{icm}$. The drain voltages change by $-GR_Dv_{icm}$ and $-G(R_D + \Delta R_D)v_{icm}$, and their difference is $G\,\Delta R_D\,v_{icm}$ in magnitude. With $A_d = g_mR_D$, $\mathrm{CMRR} = g_mR_D(2R_{SS} + 1/g_m)/\Delta R_D \approx 2g_mR_{SS}R_D/\Delta R_D$. For a transconductance mismatch, $g_{m1} = g_m + \Delta g_m/2$ and $g_{m2} = g_m - \Delta g_m/2$, keep the tail voltage $v_s$ as an unknown: $i_1 = g_{m1}(v_{icm} - v_s)$, $i_2 = g_{m2}(v_{icm} - v_s)$ and $v_s = (i_1 + i_2)R_{SS}$. Adding the first two, $v_{icm} - v_s = v_{icm}/(1 + 2g_mR_{SS})$, so $i_1 - i_2 = \Delta g_m\,v_{icm}/(1 + 2g_mR_{SS})$ and $A_{cm\to d} = R_D\,\Delta g_m/(1 + 2g_mR_{SS})$. Hence $\mathrm{CMRR} \approx 2g_mR_{SS}\,g_m/\Delta g_m$: the same form, with $\Delta g_m/g_m$ in place of $\Delta R_D/R_D$.
:::
:::

::: exercise Designing an OTA for a given gain {level=3 check="1/(0.05*200)"}
In a five-transistor OTA, every transistor has $\lambda = 0.05\,\mathrm{V^{-1}}$ and the input pair runs at overdrive $V_{OV}$. Show that $A_d = 1/(\lambda V_{OV})$ independently of the tail current, and find the overdrive, in volts, for $A_d = 200$. What does the tail current then determine?
::: solution
Each input transistor carries $I/2$, so $g_m = I/V_{OV}$ and $r_{o2} = r_{o4} = 1/(\lambda I/2)$, giving $r_{o2}\parallel r_{o4} = 1/(\lambda I)$. Then $A_d = (I/V_{OV})/(\lambda I) = 1/(\lambda V_{OV})$. For $A_d = 200$: $V_{OV} = 1/(0.05\times200) = 0.1\,\mathrm{V}$. The tail current does not change the gain; it sets $g_m$, and therefore the bandwidth with a given load capacitance ($g_m/C_L$, see [[electronics-1/amplifier-frequency-response]]), the noise, and the power consumption. Halving $\lambda$ by doubling the channel length would double the gain at the same overdrive, at the cost of capacitance.
:::
:::
