The inverter is the simplest logic gate, and the most important one to understand. Every static CMOS gate is an inverter with its single transistors replaced by networks; every buffer that drives a long wire or a clock tree is a chain of inverters; the cells of SRAM are two inverters biting each other's tails. When designers quote the speed of a process they quote the delay of an inverter driving four copies of itself, and when they compare gates they compare them with an inverter. Learn the inverter thoroughly and most of digital circuit design becomes a set of variations on it.

The CMOS inverter is a pMOS transistor from the supply to the output and an nMOS transistor from the output to ground, with their gates tied together as the input. Its static behaviour is nearly ideal: the output swings fully from rail to rail, the gain in the middle of the transition is large, and no current flows once the output has settled. Its dynamic behaviour is that of a switched resistor charging or discharging a capacitor. This chapter makes both statements precise. We derive the **voltage transfer characteristic** from the MOSFET equations of [[semiconductor-devices/mosfets]], find the **switching threshold** and **noise margins**, model the **propagation delay** with an effective switching resistance, and use the results to size transistors — first the ratio of pMOS to nMOS width, then the stages of a buffer that drives a large load. Logic levels and the gate symbols are taken from [[digital-logic/boolean-algebra]], and layout from [[digital-ic/cmos-fabrication]].

## The inverter as a pair of switches

To first order a MOSFET is a switch controlled by its gate: an nMOS transistor is on when its gate is high and off when it is low, a pMOS transistor the opposite. In the CMOS inverter, a high input turns the nMOS on and the pMOS off, so the output is connected to ground; a low input turns the pMOS on and the nMOS off, connecting the output to $V_{DD}$. In either steady state one transistor is off, so there is no path from $V_{DD}$ to ground and no static current. This is the defining property of **static CMOS**.

The switch picture already explains three of the inverter's virtues.

- **Full swing.** The output reaches exactly $V_{DD}$ or $0$, because the on transistor conducts until its drain–source voltage is zero. $V_{OH} = V_{DD}$ and $V_{OL} = 0$.
- **Ratioless operation.** The logic levels do not depend on the relative sizes of the transistors, unlike in older nMOS logic where a resistive load fought the pull-down transistor and the low level depended on their ratio. Sizes affect only speed.
- **Low output impedance and infinite input impedance.** In steady state the output is connected to a rail through a finite resistance, so it is robust against noise injected onto it, while the gate draws no DC current, so an inverter can drive many others (large **fan-out**) without any change in its static levels.

The switch model says nothing about what happens *between* the two states — at which input voltage the output switches, how sharply, and how long it takes. For that we need the transistor equations.

## The voltage transfer characteristic

The **voltage transfer characteristic** (VTC) is the steady-state output voltage $V_{out}$ as a function of the input $V_{in}$. We find it by requiring that the nMOS drain current equal the pMOS drain current for each $V_{in}$ (no current flows into the output when the inverter drives only gates). Throughout this section we use the long-channel square law, [[semiconductor-devices/mosfets]], with nMOS gain factor $k_n = \mu_nC_{ox}(W/L)_n$, pMOS gain factor $k_p = \mu_pC_{ox}(W/L)_p$, and thresholds $V_{th,n} > 0$ and $V_{th,p} < 0$. For the nMOS, $V_{GS} = V_{in}$ and $V_{DS} = V_{out}$; for the pMOS, $V_{SG} = V_{DD} - V_{in}$ and $V_{SD} = V_{DD} - V_{out}$.

As $V_{in}$ rises from $0$ to $V_{DD}$, the transistors pass through five regions of operation:

| region | $V_{in}$ | nMOS | pMOS | $V_{out}$ |
|---|---|---|---|---|
| A | $0 \le V_{in} < V_{th,n}$ | off | triode | $V_{DD}$ |
| B | just above $V_{th,n}$ | saturation | triode | slightly below $V_{DD}$ |
| C | $V_{in} = V_M$ | saturation | saturation | falls steeply |
| D | just below $V_{DD} - \lvert V_{th,p}\rvert$ | triode | saturation | slightly above $0$ |
| E | $V_{DD} - \lvert V_{th,p}\rvert < V_{in} \le V_{DD}$ | triode | off | $0$ |

In region B, equating the saturated nMOS current with the triode pMOS current gives a quadratic for $V_{DD} - V_{out}$; solving it,

$$
V_{out} = V_{in} + \lvert V_{th,p}\rvert + \sqrt{(V_{DD} - V_{in} - \lvert V_{th,p}\rvert)^2 - \frac{k_n}{k_p}(V_{in} - V_{th,n})^2}.
$$ {#eq-vtc-b}

Region D is the mirror image:

$$
V_{out} = V_{in} - V_{th,n} - \sqrt{(V_{in} - V_{th,n})^2 - \frac{k_p}{k_n}(V_{DD} - V_{in} - \lvert V_{th,p}\rvert)^2}.
$$ {#eq-vtc-d}

In region C both transistors are saturated, and in the square law with no channel-length modulation their currents depend only on $V_{in}$, not on $V_{out}$. They can be equal at only one input voltage, and there the output can take any value between $V_M - V_{th,n}$ and $V_M + \lvert V_{th,p}\rvert$ (the limits of saturation for the two devices): the VTC has a vertical segment.

::: definition Switching threshold {#def-vm}
The **switching threshold** $V_M$ of an inverter is the input voltage at which $V_{out} = V_{in}$. Graphically it is the intersection of the VTC with the line $V_{out} = V_{in}$.
:::

::: theorem Switching threshold of the CMOS inverter {#thm-vm}
In the long-channel square-law model, with $r = \sqrt{k_p/k_n}$,

$$
V_M = \frac{V_{th,n} + r\,(V_{DD} - \lvert V_{th,p}\rvert)}{1 + r}.
$$ {#eq-vm}

If $V_{th,n} = \lvert V_{th,p}\rvert$, then $V_M = V_{DD}/2$ exactly when $k_p = k_n$, that is, when $(W/L)_p/(W/L)_n = \mu_n/\mu_p$.
:::

::: proof
At $V_{in} = V_{out} = V_M$ both transistors are saturated: the nMOS because $V_{DS} = V_M > V_M - V_{th,n}$, the pMOS because $V_{SD} = V_{DD} - V_M > V_{DD} - V_M - \lvert V_{th,p}\rvert$. Equating the saturation currents,

$$
\frac{k_n}{2}(V_M - V_{th,n})^2 = \frac{k_p}{2}(V_{DD} - V_M - \lvert V_{th,p}\rvert)^2 .
$$

Both bracketed quantities are positive, so taking square roots gives $V_M - V_{th,n} = r(V_{DD} - V_M - \lvert V_{th,p}\rvert)$, and solving for $V_M$ gives [[#eq-vm]]. With equal thresholds and $r = 1$, $V_M = (V_{th} + V_{DD} - V_{th})/2 = V_{DD}/2$.
:::

Electron mobility in silicon channels is about two to three times hole mobility, so a **symmetric** inverter (one with $V_M = V_{DD}/2$) needs a pMOS two to three times wider than its nMOS. But [[#eq-vm]] depends on the *square root* of the ratio: making the pMOS the same width as the nMOS ($r = 1/\sqrt2$ when $\mu_n = 2\mu_p$) moves $V_M$ only modestly, as the next example shows.

::: example Switching threshold and sizing {#ex-vm}
A process has $V_{DD} = 1.0\,\mathrm V$, $V_{th,n} = \lvert V_{th,p}\rvert = 0.3\,\mathrm V$ and $\mu_n = 2\mu_p$. Find $V_M$ for (a) $W_p = 2W_n$, (b) $W_p = W_n$, (c) $W_p = 4W_n$ (all with equal $L$). (d) What width ratio gives $V_M = 0.45\,\mathrm V$?
::: solution
With equal $L$, $k_p/k_n = (\mu_p/\mu_n)(W_p/W_n) = \tfrac12 W_p/W_n$.

(a) $k_p = k_n$, $r = 1$: $V_M = 0.5\,\mathrm V$.

(b) $r = \sqrt{0.5} = 0.707$: $V_M = (0.3 + 0.707\times0.7)/1.707 = 0.466\,\mathrm V$.

(c) $r = \sqrt2 = 1.414$: $V_M = (0.3 + 1.414\times0.7)/2.414 = 0.534\,\mathrm V$.

(d) Solve [[#eq-vm]] for $r$: $r = (V_M - V_{th,n})/(V_{DD} - V_M - \lvert V_{th,p}\rvert) = 0.15/0.25 = 0.6$, so $k_p/k_n = 0.36$ and $W_p/W_n = 0.72$.

A factor of four in width (from (b) to (c)) moves the threshold by only $68\,\mathrm{mV}$. The switching threshold is robust against sizing and process variation — and, conversely, sizing is a weak knob for adjusting it.
:::
:::

::: widget plot
f: if(x < (t + sqrt(k)*(v - t))/(1 + sqrt(k)), x + t + sqrt(max((v - x - t)^2 - max(x - t, 0)^2/k, 0)), x - t - sqrt(max((x - t)^2 - k*max(v - x - t, 0)^2, 0))); x
x: 0, 1.5
y: 0, 1.5
sliders: k=1:0.1:4:0.01; t=0.3:0.1:0.6:0.01; v=1:0.6:1.5:0.01
labels: V_{out}; V_{out} = V_{in}
caption: The square-law VTC of the CMOS inverter, output against input in volts, for $k_p/k_n = k$, equal thresholds $V_{th,n} = \lvert V_{th,p}\rvert = t$ and supply $V_{DD} = v$. The crossing with the diagonal $V_{out} = V_{in}$ is the switching threshold $V_M$. Start from $k = 1$: the curve is symmetric about $V_{DD}/2$. Move $k$ from $0.25$ to $4$, a sixteenfold change: $V_M$ moves by only about a fifth of the supply. Lower $v$ towards $2t$: the transition stays sharp, which is why CMOS logic still works at supplies of a few times the threshold.
:::

## Noise margins and regeneration

A real logic signal is never exactly at $0$ or $V_{DD}$: it carries noise coupled from neighbouring wires, ground bounce and supply droop. The question is how much noise a gate can tolerate on its input and still deliver a valid output to the next gate.

::: definition Noise margins {#def-noise-margins}
Let $V_{IL}$ and $V_{IH}$ be the two input voltages at which the slope of the VTC is $\mathrm dV_{out}/\mathrm dV_{in} = -1$, with $V_{IL} < V_{IH}$, and let $V_{OH}$ and $V_{OL}$ be the output levels for inputs $V_{IL}$ and $V_{IH}$ (in CMOS, nominally $V_{DD}$ and $0$). Inputs below $V_{IL}$ are a valid **low**, inputs above $V_{IH}$ a valid **high**, and the region between is undefined. The **noise margins** are

$$
NM_L = V_{IL} - V_{OL}, \qquad NM_H = V_{OH} - V_{IH}.
$$ {#eq-nm}
:::

Why the unity-gain points? Outside the interval $(V_{IL}, V_{IH})$ the magnitude of the slope is less than $1$, so noise on the input is *attenuated* at the output; inside it the noise is amplified. A noise margin is the largest disturbance an output level can suffer and still arrive, at the next gate's input, in the region where it is attenuated.

::: proposition Noise margins of a symmetric inverter {#prop-nm}
For a square-law inverter with $k_n = k_p$ and $V_{th,n} = \lvert V_{th,p}\rvert = V_{th}$,

$$
V_{IL} = \frac{3V_{DD} + 2V_{th}}{8}, \qquad V_{IH} = \frac{5V_{DD} - 2V_{th}}{8}, \qquad NM_L = NM_H = \frac{3V_{DD} + 2V_{th}}{8},
$$ {#eq-vil}

taking $V_{OL} = 0$ and $V_{OH} = V_{DD}$.
:::

::: proof
Near $V_{IL}$ the nMOS is saturated and the pMOS in triode (region B). Write $k$ for the common gain factor and $u = V_{DD} - V_{out}$. Equating currents,

$$
\tfrac12(V_{in} - V_{th})^2 = (V_{DD} - V_{in} - V_{th})\,u - \tfrac12u^2 .
$$

Differentiate with respect to $V_{in}$, using $\mathrm du/\mathrm dV_{in} = -\mathrm dV_{out}/\mathrm dV_{in} = 1$ at the point we want:

$$
V_{in} - V_{th} = -u + (V_{DD} - V_{in} - V_{th}) - u ,
$$

so $u = (V_{DD} - 2V_{in})/2$, i.e. $V_{out} = V_{in} + V_{DD}/2$. Substitute back: with $a = V_{in} - V_{th}$ and $u = V_{DD}/2 - V_{in}$,

$$
\tfrac12a^2 = (V_{DD} - V_{th} - V_{in})\left(\tfrac{V_{DD}}2 - V_{in}\right) - \tfrac12\left(\tfrac{V_{DD}}2 - V_{in}\right)^2 .
$$

Expanding both sides, the terms in $V_{in}^2$ cancel ($\tfrac12 = 1 - \tfrac12$) and we are left with a linear equation, $\tfrac12V_{th}^2 - V_{th}V_{in} = \tfrac38V_{DD}^2 - V_{DD}V_{in} - \tfrac12V_{th}V_{DD} + V_{th}V_{in}$, whose solution is $V_{in} = (3V_{DD} + 2V_{th})/8$. (To check: multiply by $8$ and collect terms; the equation factors as $(V_{DD} - 2V_{th})(8V_{in} - 3V_{DD} - 2V_{th}) = 0$, and $V_{DD} > 2V_{th}$.) By the symmetry of the inverter, $V_{IH} = V_{DD} - V_{IL}$. Then $NM_L = V_{IL}$ and $NM_H = V_{DD} - V_{IH} = V_{IL}$.
:::

::: example Noise margins {#ex-nm}
For the symmetric inverter of [[#ex-vm]](a) ($V_{DD} = 1.0\,\mathrm V$, $V_{th} = 0.3\,\mathrm V$, $k_n = k_p$), find $V_{IL}$, $V_{IH}$, the output voltage at $V_{in} = V_{IL}$ and both noise margins. Then estimate them again using a piecewise-linear VTC through $V_M$ with a gain of $-20$, which is more representative of short-channel transistors.
::: solution
By [[#eq-vil]], $V_{IL} = (3.0 + 0.6)/8 = 0.45\,\mathrm V$ and $V_{IH} = (5.0 - 0.6)/8 = 0.55\,\mathrm V$. From the proof, $V_{out} = V_{IL} + V_{DD}/2 = 0.95\,\mathrm V$ at the lower unity-gain point. The noise margins are $NM_L = NM_H = 0.45\,\mathrm V$, $45\,\%$ of the supply.

In the piecewise-linear model the transition region is a straight line of slope $g = -20$ through $(V_M, V_M)$ that meets $V_{out} = V_{DD}$ and $V_{out} = 0$ at

$$
V_{IL} = V_M - \frac{V_{DD} - V_M}{\lvert g\rvert} = 0.5 - \frac{0.5}{20} = 0.475\,\mathrm V, \qquad V_{IH} = V_M + \frac{V_M}{\lvert g\rvert} = 0.525\,\mathrm V,
$$

so $NM_L = NM_H \approx 0.475\,\mathrm V$. The two estimates agree to within a few per cent. In practice margins are eroded more by variation of $V_M$ from die to die and by supply noise than by the finite gain.
:::
:::

### Gain at the switching threshold

The square law, with no channel-length modulation, gives an infinite slope at $V_M$. In reality the saturated transistors have finite output conductance, and the slope is finite but large.

::: proposition Inverter gain {#prop-gain}
At $V_{in} = V_M$, with both transistors saturated, the small-signal gain is

$$
\frac{\mathrm dV_{out}}{\mathrm dV_{in}} = -\frac{g_{mn} + g_{mp}}{g_{dsn} + g_{dsp}}.
$$ {#eq-gain}

For a symmetric square-law inverter with channel-length modulation $\lambda$ and overdrive $V_{ov} = V_M - V_{th}$, this is $-2/(\lambda V_{ov})$.
:::

::: proof
A small increase $\mathrm dV_{in}$ increases the nMOS current by $g_{mn}\,\mathrm dV_{in}$ and decreases the pMOS current by $g_{mp}\,\mathrm dV_{in}$; a change $\mathrm dV_{out}$ changes them by $g_{dsn}\,\mathrm dV_{out}$ and $-g_{dsp}\,\mathrm dV_{out}$. Keeping the two currents equal requires $(g_{mn} + g_{mp})\,\mathrm dV_{in} + (g_{dsn} + g_{dsp})\,\mathrm dV_{out} = 0$, which is [[#eq-gain]]. In the square law $g_m = kV_{ov}$ and $g_{ds} = \lambda I_D = \lambda kV_{ov}^2/2$; with identical devices the ratio is $2kV_{ov}/(\lambda kV_{ov}^2) = 2/(\lambda V_{ov})$.
:::

For $V_{ov} = 0.2\,\mathrm V$ and a short-channel $\lambda = 0.5\,\mathrm{V^{-1}}$ the gain is $-20$, the value used in [[#ex-nm]]. A gain well above $1$ in magnitude is what makes digital logic work: it is the inverter's ability to **regenerate** logic levels.

::: intuition Why a chain of gates cleans up signals
Feed a slightly degraded high level, say $0.85\,\mathrm V$ on a $1\,\mathrm V$ supply, into the inverter of [[#ex-nm]]. It is above $V_{IH}$, in the flat part of the VTC, so the output is within a few millivolts of $0$. The next inverter sees a nearly perfect low and produces a nearly perfect high. Any disturbance smaller than the noise margin is **removed** after a stage or two, rather than accumulating as it would along a chain of analogue amplifiers. Plot the VTC and its mirror image (input and output swapped) on the same axes and you get the "butterfly" of two curves crossing at three points: the outer two are stable (the logic levels) and the middle one, at $V_M$, is unstable. We will meet the same butterfly again as the cross-coupled pair of an SRAM cell in [[digital-ic/memory-arrays]].
:::

::: quiz
An inverter has $V_{IL} = 0.42\,\mathrm V$ and $V_{IH} = 0.58\,\mathrm V$ on a $1.0\,\mathrm V$ supply, with rail-to-rail outputs. A wire carrying a low level picks up $0.3\,\mathrm V$ of noise. What happens at the next gate?
- [x] the noise is attenuated, because $0.3\,\mathrm V < NM_L = 0.42\,\mathrm V$
- [ ] the noise is amplified, because the inverter has gain
- [ ] the gate's output becomes undefined, because the input is not $0$
- [ ] nothing can be said without knowing $V_M$
::: solution
$NM_L = V_{IL} - V_{OL} = 0.42\,\mathrm V$. The disturbed input, $0.3\,\mathrm V$, is still below $V_{IL}$, where the VTC's slope is smaller than $1$ in magnitude, so the next gate's output stays near $V_{DD}$ and the disturbance shrinks. The high gain is only in the transition region, which the input never entered.
:::
:::

## Propagation delay

When the input of an inverter switches, the output follows only after its load capacitance has been charged or discharged through the transistors. Modelling that process quantitatively is the basis of all timing analysis.

::: definition Propagation delays and transition times {#def-tp}
For an input that switches between $0$ and $V_{DD}$:

- the **high-to-low propagation delay** $t_{pHL}$ is the time from the input crossing $V_{DD}/2$ to the falling output crossing $V_{DD}/2$;
- the **low-to-high propagation delay** $t_{pLH}$ is the corresponding time for a rising output;
- the **propagation delay** of the gate is $t_p = (t_{pHL} + t_{pLH})/2$;
- the **fall time** $t_f$ and **rise time** $t_r$ are the times the output takes to move between $10\,\%$ and $90\,\%$ of $V_{DD}$.
:::

### The load capacitance

The output of an inverter is loaded by three kinds of capacitance, all of which must be charged to $V_{DD}$ and discharged to $0$ in each cycle:

- **Gate capacitance** of the transistors driven by the output (the fan-out): approximately $C_{ox}WL$ plus overlap capacitances, for every input connected to the node. In a given process it is conveniently quoted per micrometre of gate width, $C_g$.
- **Diffusion capacitance** of the inverter's own drains: the reverse-biased junctions between the drain regions and the body, plus the gate–drain overlap capacitance. It is proportional to the transistor width, $C_d$ per micrometre. Because the gate–drain overlap sees the input and output swing in opposite directions, it is counted twice (the **Miller effect**).
- **Wire capacitance** of the interconnect to the fan-out gates, roughly $0.2\,\mathrm{fF/\mu m}$ of length for a minimum-width wire ([[digital-ic/interconnect]]).

All these capacitances are nonlinear — the gate capacitance changes as the channel forms, the junction capacitance with voltage — and hand analysis replaces each by a constant average value for the transition.

### The effective switching resistance

Consider a falling output. At $t = 0$ the input steps from $0$ to $V_{DD}$; the pMOS turns off at once and the nMOS, with $V_{GS} = V_{DD}$, discharges $C_L$ from $V_{DD}$. The output starts above $V_{DD} - V_{th,n}$, so the nMOS begins in saturation and carries roughly its saturation current $I_{Dsat}$; as $V_{out}$ falls it enters the triode region and the current decreases. For the delay we only care about the swing from $V_{DD}$ to $V_{DD}/2$.

::: proposition Effective resistance and propagation delay {#prop-req}
Replace the discharging transistor by a resistor $R_{eq}$ equal to the average of $V_{DS}/I_D$ over the output swing from $V_{DD}$ to $V_{DD}/2$. If the transistor stays saturated with current $I_{Dsat}$ (no channel-length modulation) over that swing,

$$
R_{eq} = \frac{3}{4}\frac{V_{DD}}{I_{Dsat}},
$$ {#eq-req}

and the high-to-low propagation delay for a step input is

$$
t_{pHL} = \ln 2\; R_{eq,n}C_L \approx 0.69\,R_{eq,n}C_L ,
$$ {#eq-tphl}

with $t_{pLH} = 0.69\,R_{eq,p}C_L$ for the rising output.
:::

::: proof
The average of $V/I_{Dsat}$ for $V$ between $V_{DD}/2$ and $V_{DD}$ is

$$
R_{eq} = \frac{1}{V_{DD}/2}\int_{V_{DD}/2}^{V_{DD}}\frac{V}{I_{Dsat}}\,\mathrm dV = \frac{2}{V_{DD}I_{Dsat}}\cdot\frac{V_{DD}^2 - V_{DD}^2/4}{2} = \frac34\frac{V_{DD}}{I_{Dsat}} .
$$

A capacitor $C_L$ discharging from $V_{DD}$ through a resistor $R$ has $V_{out}(t) = V_{DD}e^{-t/RC_L}$, which crosses $V_{DD}/2$ at $t = RC_L\ln 2$.
:::

Notice the two approximations pull in opposite directions and largely cancel. A transistor that really stayed at $I_{Dsat}$ would take exactly $C_L(V_{DD}/2)/I_{Dsat} = 0.5\,V_{DD}C_L/I_{Dsat}$ to discharge half the swing, while the RC model gives $0.69\times0.75 = 0.52$ times $V_{DD}C_L/I_{Dsat}$. The practical value of [[#prop-req]] is not its accuracy, which is limited by the finite input slope and nonlinear capacitances, but its form: **delay is proportional to an effective resistance times a load capacitance**, and the resistance is inversely proportional to transistor width. In practice $R_{eq}$ is extracted from simulation of a real gate, and then used in the simple formula.

::: definition Reference process {#def-refproc}
For numerical work in this course we use a representative (not foundry-specific) process with $V_{DD} = 1.0\,\mathrm V$, $V_{th,n} = \lvert V_{th,p}\rvert = 0.3\,\mathrm V$ and the following switching parameters:

| quantity | nMOS | pMOS |
|---|---|---|
| effective resistance $\times$ width | $1\,\mathrm{k\Omega\cdot\mu m}$ | $2\,\mathrm{k\Omega\cdot\mu m}$ |
| gate capacitance per width $C_g$ | $1\,\mathrm{fF/\mu m}$ | $1\,\mathrm{fF/\mu m}$ |
| drain diffusion capacitance per width $C_d$ | $1\,\mathrm{fF/\mu m}$ | $1\,\mathrm{fF/\mu m}$ |

A **unit inverter** has $W_n = 0.1\,\mathrm{\mu m}$ and $W_p = 0.2\,\mathrm{\mu m}$, so that both its pull-down and pull-up resistances are $R = 10\,\mathrm{k\Omega}$; its input capacitance is $C_{in} = 0.3\,\mathrm{fF}$ and the diffusion capacitance at its output is also $0.3\,\mathrm{fF}$.
:::

The pMOS resistance is twice the nMOS resistance per width, reflecting the lower hole mobility; it corresponds, by [[#eq-req]], to saturation currents of $0.75$ and $0.375\,\mathrm{mA/\mu m}$.

::: example Delay of a loaded inverter {#ex-delay}
A unit inverter in the reference process drives four unit inverters (a **fan-out of four**, FO4) through a short wire of negligible capacitance. Find $t_{pHL}$, $t_{pLH}$ and $t_p$. Repeat when the wire is $10\,\mathrm{\mu m}$ long with $0.2\,\mathrm{fF/\mu m}$.
::: solution
The load is the fan-out gate capacitance plus the inverter's own diffusion capacitance:

$$
C_L = 4\times0.3 + 0.3 = 1.5\,\mathrm{fF}.
$$

Both resistances are $10\,\mathrm{k\Omega}$, so $t_{pHL} = t_{pLH} = 0.69\times10^4\times1.5\times10^{-15} = 10.4\,\mathrm{ps}$, and $t_p = 10.4\,\mathrm{ps}$.

With the wire, $C_L = 1.5 + 10\times0.2 = 3.5\,\mathrm{fF}$ and $t_p = 0.69\times10^4\times3.5\times10^{-15} = 24.2\,\mathrm{ps}$. Ten micrometres of wire — the width of a few dozen standard cells — more than doubled the delay. In real designs wire capacitance is often the largest component of $C_L$.
:::
:::

The FO4 delay is the customary yardstick of a process's speed, because it is largely independent of how transistors are sized and so can be compared between processes. For the reference process it is about $10\,\mathrm{ps}$. A processor's clock period is often expressed in FO4 delays: high-performance designs have used cycle times of roughly $15$–$25$ FO4.

### Intrinsic delay and self-loading

What happens if we make an inverter bigger? Scaling both transistors by a factor $S$ divides $R_{eq}$ by $S$ but multiplies the inverter's own diffusion capacitance by $S$. With intrinsic (self) capacitance $C_{int}$ for the unit inverter and an external load $C_{ext}$,

$$
t_p = 0.69\,\frac{R}{S}\left(SC_{int} + C_{ext}\right) = 0.69\,RC_{int}\left(1 + \frac{C_{ext}}{SC_{int}}\right) = t_{p0}\left(1 + \frac{C_{ext}}{SC_{int}}\right).
$$ {#eq-self-loading}

The **intrinsic delay** $t_{p0} = 0.69RC_{int}$ is the delay of an unloaded inverter, and it does not depend on size. Making the inverter larger reduces the delay towards $t_{p0}$, with diminishing returns once $SC_{int}$ dominates $C_{ext}$ — and a larger inverter presents a larger load to whatever drives *it*. This trade-off is at the heart of the sizing problems below.

### Choosing the pMOS-to-nMOS ratio

Should the pMOS be twice as wide as the nMOS, to equalise the rise and fall delays? Not necessarily. Widening the pMOS speeds up the rising output but increases the capacitance the inverter presents to its driver and to itself.

::: theorem Optimum pMOS/nMOS ratio {#thm-beta}
Consider a long chain of identical inverters, each with nMOS width $W$ and pMOS width $\beta W$, in which each stage's load is dominated by the gate and diffusion capacitance of identical stages, both proportional to $(1 + \beta)W$. Let $\rho = R_p/R_n$ be the ratio of pMOS to nMOS resistance at equal width (the mobility ratio, about $2$). The average propagation delay is minimised by

$$
\beta_{opt} = \sqrt{\rho} .
$$ {#eq-beta}
:::

::: proof
The load of each stage is $C_L = c(1 + \beta)W$ for some constant $c$. The nMOS resistance is $R_n/W$ and the pMOS resistance $\rho R_n/(\beta W)$, so

$$
t_p = \frac{0.69}{2}\left(\frac{R_n}{W} + \frac{\rho R_n}{\beta W}\right)c(1 + \beta)W = 0.345\,cR_n\,(1 + \beta)\left(1 + \frac{\rho}{\beta}\right).
$$

The width $W$ cancels. Differentiate $(1 + \beta)(1 + \rho/\beta) = 1 + \rho + \beta + \rho/\beta$ with respect to $\beta$: $1 - \rho/\beta^2 = 0$ at $\beta = \sqrt\rho$, and the second derivative $2\rho/\beta^3$ is positive, so this is a minimum.
:::

With $\rho = 2$, $\beta_{opt} = 1.41$. The minimum is very flat: the normalised delay $(1 + \beta)(1 + 2/\beta)/2$ is $2.91$ at $\beta = \sqrt2$ and $3.00$ at both $\beta = 1$ and $\beta = 2$. Designers therefore choose $\beta$ for other reasons — equal rise and fall times ($\beta = \rho$) for clock buffers, where asymmetric edges cause duty-cycle distortion; smaller $\beta$ to save area and power in ordinary logic. In FinFET and nanosheet processes, where widths come in whole numbers of fins or sheets and hole mobility in strained SiGe channels is close to electron mobility, $\beta = 1$ is common.

::: widget plot
f: (1 + x)*(1 + r/x)/2; 1 + x; r*(1 + x)/x
x: 0.5, 4
y: 0, 6
sliders: r=2:1:3:0.05
labels: t_p\ \text{(average)}; t_{pHL}; t_{pLH}
caption: Delay of an inverter in a long chain, in units of $0.69\,cR_n$, against the width ratio $\beta = W_p/W_n$ on the horizontal axis, for a pMOS-to-nMOS resistance ratio $\rho = r$. The falling delay grows with $\beta$ (more capacitance, same pull-down), the rising delay falls; their average has a shallow minimum at $\beta = \sqrt\rho$. Set $r = 2$ and compare $\beta = 1$, $1.41$ and $2$: the average delays differ by only $3\,\%$. Raise $r$ to $3$ to see how the optimum moves.
:::

::: warning Symmetric switching threshold is not minimum delay
It is tempting to size every inverter for $V_M = V_{DD}/2$, i.e. $\beta = \rho$. That equalises $t_{pHL}$ and $t_{pLH}$ and maximises the smaller noise margin, but it does **not** minimise the average delay of a chain, which is reached at $\beta = \sqrt\rho$ by [[#thm-beta]]. Conversely, the optimum-delay inverter has a switching threshold below $V_{DD}/2$ (about $0.48\,\mathrm V$ for the reference process, by [[#eq-vm]] with $k_p/k_n = \sqrt2/2$). Be clear which objective a sizing choice serves.
:::

## Driving large loads

Suppose a unit inverter must drive a load far larger than its own input capacitance: an off-chip pad, a long bus, a clock network, the word line of a memory. By [[#eq-self-loading]], driving it directly gives a delay proportional to the load. A single giant inverter would be fast at the output but would itself be a huge load on the unit inverter. The solution is a **tapered buffer**: a chain of inverters, each larger than the one before by a factor $f$.

Write $\tau = 0.69\,RC_{in}$ for the delay unit of the process (the delay of a unit inverter driving one copy of its own input capacitance, without self-loading) and $p = C_{int}/C_{in}$ for the ratio of an inverter's own diffusion capacitance to its input capacitance ($p \approx 1$). Then an inverter that drives $f$ times its own input capacitance has delay

$$
t = \tau\,(f + p),
$$ {#eq-stage-delay}

independent of its absolute size. In the reference process $\tau = 0.69\times10\,\mathrm{k\Omega}\times0.3\,\mathrm{fF} = 2.07\,\mathrm{ps}$ and $p = 1$, so a fan-out-of-four inverter has $t = 5\tau = 10.4\,\mathrm{ps}$, as in [[#ex-delay]].

::: theorem Optimum tapered buffer {#thm-buffer}
A chain of $N$ inverters drives a load $C_L$ from a first stage of input capacitance $C_{in}$; let $F = C_L/C_{in}$ be the overall **electrical effort**. The total delay

$$
t = \tau\sum_{i=1}^{N}(f_i + p), \qquad \prod_{i=1}^{N} f_i = F,
$$

is minimised for given $N$ by equal stage efforts $f_i = F^{1/N}$, giving $t = N\tau(F^{1/N} + p)$. Over all $N$, the minimum occurs when the stage effort $f = F^{1/N}$ satisfies

$$
f\,(\ln f - 1) = p ,
$$ {#eq-fopt}

which gives $f = e \approx 2.72$ for $p = 0$ and $f \approx 3.59$ for $p = 1$.
:::

::: proof
For fixed $N$, minimise $\sum f_i$ subject to $\prod f_i = F$. By the inequality of arithmetic and geometric means, $\frac1N\sum f_i \ge (\prod f_i)^{1/N} = F^{1/N}$, with equality when all $f_i$ are equal. So the best chain has equal efforts and $t(N) = N\tau(F^{1/N} + p)$.

Now treat $N$ as continuous. With $\ln F$ fixed, $\frac{\mathrm d}{\mathrm dN}F^{1/N} = -F^{1/N}\ln F/N^2$, so

$$
\frac{1}{\tau}\frac{\mathrm dt}{\mathrm dN} = F^{1/N} + p - \frac{F^{1/N}\ln F}{N} = f + p - f\ln f ,
$$

since $\ln F/N = \ln f$. Setting this to zero gives [[#eq-fopt]]. For $p = 0$, $\ln f = 1$ and $f = e$. For $p = 1$, solving $f(\ln f - 1) = 1$ numerically (for instance by iterating $f \leftarrow e^{1 + 1/f}$) gives $f = 3.59$.
:::

Again the optimum is flat: stage efforts between about $3$ and $6$ give delays within a few per cent of the minimum, which is why designers simply use **a fan-out of about four per stage**. Since $N$ must be an integer, round $\ln F/\ln 4$ to a nearby whole number and recompute $f = F^{1/N}$. If the logic requires a particular polarity, $N$ must be even (non-inverting) or odd, which may force one stage more or less than the optimum.

::: example Designing a pad driver {#ex-buffer}
A unit inverter in the reference process must drive an off-chip load of $1\,\mathrm{pF}$. (a) What is the delay if it drives the load directly? (b) Design an optimal tapered buffer: number of stages, stage effort, sizes and total delay. (c) If the output must be non-inverting with respect to the unit inverter's input, how many stages would you use?
::: solution
(a) Directly, $f = C_L/C_{in} = 10^{-12}/(0.3\times10^{-15}) = 3333$, and the delay is $\tau(3333 + 1) = 2.07\,\mathrm{ps}\times3334 = 6.9\,\mathrm{ns}$.

(b) With $F = 3333$ and $f_{opt} = 3.59$, the best number of stages is $\ln 3333/\ln 3.59 = 8.11/1.28 = 6.3$. Try integers near it:

| $N$ | $f = F^{1/N}$ | $t/\tau = N(f + 1)$ |
|---|---|---|
| 5 | 5.06 | 30.3 |
| 6 | 3.86 | 29.2 |
| 7 | 3.19 | 29.3 |

Six stages are best, with $f = 3.86$: the inverters are $1, 3.86, 14.9, 57.7, 223$ and $862$ times unit size (input capacitances from $0.3\,\mathrm{fF}$ to $259\,\mathrm{fF}$), and the last drives $1000/259 = 3.86$ times its input capacitance as required. The delay is $29.2\tau = 60\,\mathrm{ps}$, more than a hundred times faster than (a).

(c) The unit inverter is the first of the $N$ stages, so the output polarity is inverting when $N$ is odd and non-inverting when $N$ is even. Six stages give a non-inverting output, conveniently the optimum. Had we needed an inverting output, $N = 7$ costs only $0.1\tau$ more.

The total input capacitance of the buffer stages is $0.3\,\mathrm{fF}\times(1 + 3.86 + \dots + 858)\approx 349\,\mathrm{fF}$, about a third of the load itself: the buffer's own switching power is a significant overhead.
:::
:::

::: widget plot
f: x*(10^(q/x) + p); x*(10^(q/x))
x: 1, 12
y: 0, 80
sliders: q=3.52:1:5:0.01; p=1:0:3:0.1
labels: t/\tau\ (\text{with } p); t/\tau\ (p = 0)
caption: Delay of an $N$-stage tapered buffer in units of $\tau$, against $N$ (horizontal axis, treated as continuous), for an overall effort $F = 10^{q}$ and parasitic ratio $p$. The default $q = 3.52$ is the pad driver of [[#ex-buffer]]: the minimum is near $N = 6$ and is very flat between $5$ and $8$. Increase $p$: the optimum moves to fewer, larger steps. Reduce $q$ to $1$ (a load ten times the input): a single stage or two is best.
:::

::: quiz
A buffer must drive a load $4096$ times its input capacitance, with $p = 1$. Which design is closest to optimal?
- [ ] one stage with fan-out $4096$
- [ ] twelve stages with fan-out $2$ each
- [x] six stages with fan-out $4$ each
- [ ] three stages with fan-out $16$ each
::: solution
$4096 = 4^6 = 2^{12} = 16^3$. The delays, in units of $\tau$, are $4097$ for one stage, $12\times3 = 36$ for twelve stages, $6\times5 = 30$ for six stages and $3\times17 = 51$ for three stages. Six stages of fan-out $4$ are best, consistent with the optimum $f \approx 3.6$.
:::
:::

## Design and practice

The square-law analysis gives the right shapes but the wrong numbers for modern transistors.

- **Velocity saturation.** Short-channel transistors have a saturation current roughly linear rather than quadratic in overdrive ([[semiconductor-devices/mosfets]]). The switching threshold formula [[#eq-vm]] then changes form — $r$ becomes the ratio of the $W v_{sat}$ products rather than the square root of $k_p/k_n$ — but the qualitative conclusions survive: $V_M$ moves only weakly with sizing. The **alpha-power law** $I_{Dsat}\propto(V_{GS} - V_{th})^{\alpha}$ with $\alpha$ between $1$ and $2$, introduced by Sakurai and Newton in 1990, interpolates between the two regimes and is used in [[digital-ic/power-dissipation]] to model delay against supply voltage.
- **Input slope.** A real input is not a step. While it ramps, both transistors conduct briefly and the active transistor has less than full gate drive, so delay increases with the input transition time. Timing libraries tabulate each gate's delay as a function of input slope and output load (the **nonlinear delay model**) rather than using a single resistance.
- **Low supplies.** Below about $V_{DD} = 2V_{th}$ the two transistors are never both strongly on and the VTC remains well behaved; inverters work even in subthreshold, with $V_{DD}$ of a few hundred millivolts, at the cost of exponentially longer delay. Minimum-energy circuits exploit this ([[digital-ic/power-dissipation]]).
- **Variation.** Random dopant fluctuation and line-edge roughness make each transistor's threshold slightly different, and the spread grows as devices shrink. For logic the effect is a spread in delay; for SRAM cells, which use the smallest transistors on the chip, it is the main limit on how low the supply can go.

As of 2026, leading processes run logic at supplies of about $0.65$–$0.8\,\mathrm V$, with several threshold-voltage options per process to trade speed for leakage. The inverter principles of this chapter apply unchanged; only the constants are different.

::: application The inverter as a speed benchmark
Ring oscillators — an odd number of inverters connected in a loop — are built on every test wafer. The loop has no stable state, so it oscillates with period $2Nt_p$ for $N$ stages, and a frequency counter measures $t_p$ directly, averaged over rising and falling edges, without any probe touching the fast nodes. Foundries use ring oscillators to monitor process speed across each wafer, and chips include them as on-die sensors of local speed, temperature and ageing.
:::

::: history
Frank Wanlass and Chih-Tang Sah of Fairchild described complementary MOS logic at the International Solid-State Circuits Conference in February 1963, and Wanlass's patent on the principle was granted in 1967. RCA introduced the CD4000 family of CMOS logic in 1968; it was slow but drew almost no standby power, and found its first markets in watches, calculators and space hardware. Through the 1970s nMOS logic, with its resistive or depletion-mode loads, was faster and denser, and early microprocessors used it. As chips grew, the static power of nMOS gates became unmanageable, and CMOS took over the mainstream in the mid-1980s; Intel's 80386 of 1985 was built in a CMOS process. The fan-out-of-four delay became a common unit for comparing processes and designs in the 1990s, through the work of Mark Horowitz and his students at Stanford among others.
:::

## Where this leads

The inverter's model — a resistor inversely proportional to width charging a capacitor proportional to width — generalises directly to every static gate in [[digital-ic/static-cmos-logic]], where the tapered-buffer result of [[#thm-buffer]] becomes the method of logical effort. The dynamic gates of [[digital-ic/dynamic-logic]] give up part of the inverter's robustness for speed. Two cross-coupled inverters make the latches and flip-flops of [[digital-ic/sequential-circuits-clocking]] and the SRAM cell of [[digital-ic/memory-arrays]]. Wire capacitance, which already doubled a delay in [[#ex-delay]], is the subject of [[digital-ic/interconnect]], and the energy $C_LV_{DD}^2$ drawn from the supply each time an output rises and falls is the starting point of [[digital-ic/power-dissipation]].

::: summary
- A static CMOS inverter has rail-to-rail outputs, no static current, effectively infinite input resistance and ratioless logic levels.
- Its VTC follows from equating the nMOS and pMOS currents; with the square law, the switching threshold is $V_M = [V_{th,n} + r(V_{DD} - \lvert V_{th,p}\rvert)]/(1 + r)$ with $r = \sqrt{k_p/k_n}$, and depends only weakly on sizing.
- Noise margins are defined at the unity-gain points; a symmetric long-channel inverter has $NM_L = NM_H = (3V_{DD} + 2V_{th})/8$. Gain greater than one in magnitude in the transition region regenerates logic levels.
- Delay is $t_p \approx 0.69\,R_{eq}C_L$, with $R_{eq} \approx \tfrac34V_{DD}/I_{Dsat}$ inversely proportional to width and $C_L$ the sum of fan-out gate, self diffusion and wire capacitance.
- The FO4 inverter delay is the standard measure of process speed; in the reference process $\tau = 2.07\,\mathrm{ps}$ and FO4 $= 5\tau \approx 10\,\mathrm{ps}$.
- Minimum average delay in a chain needs $W_p/W_n = \sqrt{\rho}$, not $\rho$; the optimum is shallow.
- A large load is driven by a tapered chain of $N \approx \ln F/\ln 4$ stages with equal fan-out near four; the delay is $N\tau(F^{1/N} + p)$, logarithmic rather than linear in the load.
:::

## Exercises

::: exercise Switching threshold with unequal thresholds {level=1 check="(0.35 + sqrt(0.5)*(1.0 - 0.25))/(1 + sqrt(0.5))"}
An inverter has $V_{DD} = 1.0\,\mathrm V$, $V_{th,n} = 0.35\,\mathrm V$, $V_{th,p} = -0.25\,\mathrm V$ and $k_p/k_n = 0.5$. Find $V_M$ in volts in the square-law model.
::: solution
$r = \sqrt{0.5} = 0.707$, so $V_M = (0.35 + 0.707\times0.75)/1.707 = (0.35 + 0.530)/1.707 = 0.516\,\mathrm V$, by [[#eq-vm]].
:::
:::

::: exercise Noise margins of a 1.8 V inverter {level=1 check="(3*1.8 + 2*0.45)/8"}
A symmetric square-law inverter has $V_{DD} = 1.8\,\mathrm V$ and $V_{th} = 0.45\,\mathrm V$. Find $V_{IL}$ in volts, and $V_{IH}$ and the noise margins.
::: solution
By [[#eq-vil]], $V_{IL} = (5.4 + 0.9)/8 = 0.7875\,\mathrm V$ and $V_{IH} = (9.0 - 0.9)/8 = 1.0125\,\mathrm V$; $NM_L = NM_H = 0.7875\,\mathrm V$.
:::
:::

::: exercise FO4 with a heavier load {level=1 check="0.69*10e3*(3*0.3e-15 + 0.3e-15 + 1e-15)"}
In the reference process, a unit inverter drives three unit inverters and a wire of $1\,\mathrm{fF}$. Find its propagation delay in seconds.
::: solution
$C_L = 3\times0.3 + 0.3 + 1.0 = 2.2\,\mathrm{fF}$ and $t_p = 0.69\times10\,\mathrm{k\Omega}\times2.2\,\mathrm{fF} = 15.2\,\mathrm{ps}$.
:::
:::

::: exercise Effective resistance from the saturation current {level=2 check="0.75*1.0/(1e-3*0.5)"}
An nMOS transistor $0.5\,\mathrm{\mu m}$ wide has a saturation current of $1.0\,\mathrm{mA/\mu m}$ at $V_{DD} = 1.0\,\mathrm V$. Estimate its effective switching resistance in ohms, and the fall delay when it discharges $5\,\mathrm{fF}$. Compare with the time a constant current $I_{Dsat}$ would take to remove half the charge.
::: solution
$I_{Dsat} = 0.5\,\mathrm{mA}$, so by [[#eq-req]] $R_{eq} = 0.75\times1.0/0.5\times10^{-3} = 1.5\,\mathrm{k\Omega}$. Then $t_{pHL} = 0.69\times1500\times5\times10^{-15} = 5.2\,\mathrm{ps}$. A constant $0.5\,\mathrm{mA}$ removes $C_LV_{DD}/2 = 2.5\,\mathrm{fC}$ in $5.0\,\mathrm{ps}$. The two estimates agree to $4\,\%$.
:::
:::

::: exercise Sizing to meet a delay target {level=2 check="3"}
In the reference process an inverter of size $S$ (that is, $S$ times the unit inverter) must drive a fixed external load of $6\,\mathrm{fF}$ with $t_p \le 20\,\mathrm{ps}$. Using [[#eq-self-loading]], find the smallest integer $S$ that meets the target.
::: solution
With $R = 10\,\mathrm{k\Omega}$ and $C_{int} = 0.3\,\mathrm{fF}$ for the unit inverter, $t_{p0} = 0.69\times10^4\times0.3\times10^{-15} = 2.07\,\mathrm{ps}$, and $t_p = 2.07(1 + 6/(0.3S)) = 2.07(1 + 20/S)\,\mathrm{ps}$. We need $1 + 20/S \le 9.66$, i.e. $S \ge 2.31$; $S = 2$ gives $22.8\,\mathrm{ps}$, too slow, and $S = 3$ gives $t_p = 2.07\times7.67 = 15.9\,\mathrm{ps}$, so the smallest integer size is $S = 3$. (A designer would check whether the driver of this inverter can afford its $0.9\,\mathrm{fF}$ input capacitance.)
:::
:::

::: exercise Ratio for equal rise and fall {level=2}
For the reference process ($\rho = 2$), compare a chain of inverters with $\beta = W_p/W_n = 2$ and one with $\beta = \sqrt2$: find $t_{pHL}$, $t_{pLH}$ and $t_p$ for each in units of $0.69\,cR_n$, where each stage's load is $c(1 + \beta)W$. Which would you use in a clock buffer, and why?
::: solution
From the proof of [[#thm-beta]], $t_{pHL} = (1 + \beta)$ and $t_{pLH} = \rho(1 + \beta)/\beta$ in these units. For $\beta = 2$: $t_{pHL} = 3$, $t_{pLH} = 3$, $t_p = 3$. For $\beta = 1.414$: $t_{pHL} = 2.414$, $t_{pLH} = 3.414$, $t_p = 2.914$. The $\sqrt2$ chain is $3\,\%$ faster on average but its edges are asymmetric by $1$ unit per stage, so after several stages the clock's high and low phases have different durations. Clock buffers use $\beta = \rho$ to preserve the $50\,\%$ duty cycle.
:::
:::

::: exercise A ring oscillator {level=2 check="1/(2*31*10.4e-12)"}
A ring oscillator of $31$ inverters, each loaded with an extra three inverter inputs so that every stage sees an FO4 load, is built in the reference process. Taking the FO4 delay as $10.4\,\mathrm{ps}$, find the oscillation frequency in hertz.
::: solution
The period is $2Nt_p = 2\times31\times10.4\,\mathrm{ps} = 645\,\mathrm{ps}$, so $f = 1.55\,\mathrm{GHz}$. The factor $2$ is because a transition must travel round the ring twice — once as a rising and once as a falling edge at each node — to complete one period.
:::
:::

::: exercise Noise margins with a gain-limited VTC {level=3}
Using the piecewise-linear model of [[#ex-nm]], derive general expressions for $NM_L$ and $NM_H$ in terms of $V_M$, $V_{DD}$ and the gain magnitude $\lvert g\rvert$. Show that for fixed $\lvert g\rvert$ the smaller of the two margins is largest when $V_M = V_{DD}/2$. Then use [[#prop-gain]] to estimate the gain and margins of a symmetric inverter with $V_{DD} = 0.8\,\mathrm V$, $V_{th} = 0.3\,\mathrm V$ and $\lambda = 0.4\,\mathrm{V^{-1}}$.
::: hint
The straight line through $(V_M, V_M)$ with slope $-\lvert g\rvert$ meets $V_{out} = V_{DD}$ at $V_{IL}$ and $V_{out} = 0$ at $V_{IH}$.
:::
::: solution
On the line, $V_{out} - V_M = -\lvert g\rvert(V_{in} - V_M)$. Setting $V_{out} = V_{DD}$ gives $V_{IL} = V_M - (V_{DD} - V_M)/\lvert g\rvert$; setting $V_{out} = 0$ gives $V_{IH} = V_M + V_M/\lvert g\rvert$. With $V_{OL} = 0$ and $V_{OH} = V_{DD}$,

$$
NM_L = V_M - \frac{V_{DD} - V_M}{\lvert g\rvert}, \qquad NM_H = (V_{DD} - V_M) - \frac{V_M}{\lvert g\rvert}.
$$

$NM_L$ increases with $V_M$ and $NM_H$ decreases with it, so the minimum of the two is largest where they are equal; by symmetry that is at $V_M = V_{DD}/2$, giving $NM = \tfrac{V_{DD}}2(1 - 1/\lvert g\rvert)$.

For the numbers given, $V_M = 0.4\,\mathrm V$, $V_{ov} = 0.1\,\mathrm V$ and $\lvert g\rvert = 2/(0.4\times0.1) = 50$; $NM = 0.4(1 - 0.02) = 0.392\,\mathrm V$. The low overdrive at a reduced supply actually raises the gain, because $g_m/g_{ds} = 2/(\lambda V_{ov})$.
:::
:::

::: exercise Buffer for a clock spine {level=3}
A clock spine presents $2.4\,\mathrm{pF}$ and must be driven from a clock source that can drive only a unit inverter's input ($0.3\,\mathrm{fF}$) in the reference process. (a) Design the buffer for minimum delay, giving $N$, $f$ and the delay in picoseconds. (b) The clock must be non-inverting. Adjust the design and give the delay penalty. (c) Estimate the energy drawn from the $1\,\mathrm V$ supply per clock cycle by the buffer's own input capacitances, compared with that drawn by the load.
::: hint
For (c), every capacitance $C$ that is charged and discharged once per cycle draws $CV_{DD}^2$ from the supply.
:::
::: solution
(a) $F = 2.4\times10^{-12}/0.3\times10^{-15} = 8000$, $\ln F = 8.99$, and $N_{opt} = 8.99/1.278 = 7.03$. With $N = 7$: $f = 8000^{1/7} = 3.61$, $t = 7\times4.61\tau = 32.3\tau = 66.8\,\mathrm{ps}$.

(b) Non-inverting needs even $N$. $N = 6$: $f = 4.47$, $t = 6\times5.47 = 32.8\tau = 67.9\,\mathrm{ps}$. $N = 8$: $f = 3.07$, $t = 8\times4.07 = 32.6\tau = 67.4\,\mathrm{ps}$. Choose $N = 8$, a penalty of about $0.6\,\mathrm{ps}$ ($1\,\%$).

(c) With $N = 8$ and $f = 3.07$, the input capacitances form a geometric series $0.3\,\mathrm{fF}\times(1 + f + \dots + f^7) = 0.3\times(f^8 - 1)/(f - 1)\,\mathrm{fF} = 0.3\times7999/2.075 = 1156\,\mathrm{fF}$. (Strictly the first stage's input is driven by the clock source, but including it changes little.) The buffer's gate capacitance draws about $1.16\,\mathrm{pJ}$ per cycle, against $2.4\,\mathrm{pJ}$ for the load — nearly half as much again, before the diffusion capacitances (another $1.16\,\mathrm{pF}$ with $p = 1$) are added. Clock buffers are a major consumer of power, one reason for the clock-gating techniques of [[digital-ic/power-dissipation]].
:::
:::

::: exercise Region B of the VTC {level=3}
Derive [[#eq-vtc-b]] from the square-law equations, and verify that it gives $V_{out} = V_{DD}$ at $V_{in} = V_{th,n}$ and $V_{out} = V_M + \lvert V_{th,p}\rvert$ at $V_{in} = V_M$.
::: solution
In region B the nMOS is saturated, $I_n = \tfrac{k_n}2(V_{in} - V_{th,n})^2$, and the pMOS in triode with $V_{SG} = V_{DD} - V_{in}$ and $u = V_{SD} = V_{DD} - V_{out}$: $I_p = k_p[(V_{DD} - V_{in} - \lvert V_{th,p}\rvert)u - u^2/2]$. Write $a = V_{DD} - V_{in} - \lvert V_{th,p}\rvert$. Setting $I_n = I_p$ gives $u^2 - 2au + (k_n/k_p)(V_{in} - V_{th,n})^2 = 0$, whose smaller root (the one with $u \le a$, as the triode region requires) is $u = a - \sqrt{a^2 - (k_n/k_p)(V_{in} - V_{th,n})^2}$. Then $V_{out} = V_{DD} - u = V_{in} + \lvert V_{th,p}\rvert + \sqrt{a^2 - (k_n/k_p)(V_{in} - V_{th,n})^2}$, which is [[#eq-vtc-b]].

At $V_{in} = V_{th,n}$ the square root is $a = V_{DD} - V_{th,n} - \lvert V_{th,p}\rvert$, so $V_{out} = V_{th,n} + \lvert V_{th,p}\rvert + a = V_{DD}$. At $V_{in} = V_M$, the saturation currents are equal, so $(k_n/k_p)(V_M - V_{th,n})^2 = a^2$ and the square root vanishes: $V_{out} = V_M + \lvert V_{th,p}\rvert$, the top of the vertical segment, where the pMOS enters saturation.
:::
:::
