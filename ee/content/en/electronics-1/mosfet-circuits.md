A modern smartphone processor contains more than ten billion metal–oxide–semiconductor field-effect transistors. Almost all of them work as switches: a gate voltage either connects the drain to the source through a low resistance or disconnects them completely. A much smaller number, in the radio, the audio codec, the power-management unit and the camera interface, work as amplifiers: a small change in gate voltage produces a proportional change in drain current, which a resistor or another transistor turns into a large change in voltage. The same device does both jobs; what differs is the region of its characteristic in which the circuit holds it.

This chapter turns the device physics of [[semiconductor-devices/mosfets]] into a circuit model, and uses it to solve the DC problems that come before any amplifier design: in which region is the transistor operating, what are its current and voltages, and how can we choose resistors so that these values stay put when the transistor is replaced by another with a different threshold voltage? We then look at the transistor as a switch and as an amplifier, which prepares the ground for the small-signal analysis of [[electronics-1/small-signal-amplifiers]]. The method — assume a state, solve, check — is the one we used for diodes in [[electronics-1/diode-circuits]].

## The large-signal MOSFET model

An n-channel enhancement MOSFET (**NMOS**) has four terminals: gate (G), source (S), drain (D) and body or substrate (B). The gate is insulated from the channel by a thin oxide, so at DC **no gate current flows**: $i_G = 0$. A positive gate–source voltage $v_{GS}$ larger than the **threshold voltage** $V_{th}$ induces an inversion layer of electrons at the surface, a conducting channel between source and drain. We write

$$
v_{OV} = v_{GS} - V_{th}
$$

for the **overdrive voltage** (also called the effective voltage), the amount by which the gate exceeds the threshold. All of the transistor's behaviour can be described with $v_{OV}$ and $v_{DS}$.

::: theorem Square-law MOSFET equations {#thm-square-law}
For a long-channel NMOS with $v_{DS} \ge 0$, process transconductance parameter $k_n' = \mu_n C_{ox}$ and aspect ratio $W/L$, write $k_n = k_n'(W/L)$. Then

$$
i_D = \begin{cases}
0, & v_{OV} \le 0 \quad\text{(cut-off)},\\[4pt]
k_n\left(v_{OV}\,v_{DS} - \tfrac12 v_{DS}^2\right), & 0 \le v_{DS} \le v_{OV} \quad\text{(triode)},\\[4pt]
\tfrac12 k_n\,v_{OV}^2\,(1 + \lambda v_{DS}), & v_{DS} \ge v_{OV} \quad\text{(saturation)}.
\end{cases}
$$ {#eq-square-law}

Here $\lambda$ is the **channel-length modulation** parameter, roughly inversely proportional to the channel length $L$.
:::

::: proof {collapsed}
The derivation, from the charge in the inversion layer and the drift current along the channel, is in [[semiconductor-devices/mosfets]]; here is its outline. In the **gradual-channel approximation** the electron charge per unit area at a point $y$ along the channel, where the channel potential is $V(y)$, is $-C_{ox}(v_{GS} - V(y) - V_{th})$. The drift current is the same at every $y$:

$$
i_D = W\mu_nC_{ox}\bigl(v_{GS} - V(y) - V_{th}\bigr)\frac{\mathrm{d}V}{\mathrm{d}y}.
$$

Integrating from $y = 0$ ($V = 0$) to $y = L$ ($V = v_{DS}$) gives $i_D L = W\mu_nC_{ox}\bigl[(v_{GS} - V_{th})v_{DS} - v_{DS}^2/2\bigr]$, the triode equation. This expression reaches its maximum at $v_{DS} = v_{OV}$, where the channel charge at the drain end falls to zero: the channel is **pinched off**. For larger $v_{DS}$ the extra voltage drops across a short depleted region next to the drain, the channel voltage at the pinch-off point stays at $v_{OV}$, and the current stays at its peak value $\tfrac12k_nv_{OV}^2$. The pinch-off point moves slightly towards the source as $v_{DS}$ grows, shortening the effective channel; that gives the small increase modelled by $(1 + \lambda v_{DS})$.
:::

The name "saturation" for the region where the current is nearly *independent* of $v_{DS}$ is a historical accident that clashes with the bipolar transistor, whose saturation region is the opposite (see [[electronics-1/bjt-circuits]]). In MOSFET language, saturation is the **amplifying region** and triode is the **resistive region**.

The boundary between the two, $v_{DS} = v_{OV}$, is equivalent to $v_{GD} = V_{th}$: the transistor is in saturation as long as the gate is not more than one threshold above the drain. Equivalently,

$$
\text{saturation} \iff v_D \ge v_G - V_{th}.
$$ {#eq-sat-condition}

This form is the easiest to check on a schematic: look at the gate and drain voltages, not at $v_{DS}$.

::: quiz
An NMOS with $V_{th} = 0.5\,\mathrm{V}$ has $V_G = 1.2\,\mathrm{V}$, $V_S = 0.2\,\mathrm{V}$ and $V_D = 0.6\,\mathrm{V}$. In which region is it?
- [ ] Cut-off, because $V_D < V_G$.
- [ ] Saturation, because $V_{GS} > V_{th}$ and $V_{DS} > 0$.
- [x] Triode, because $V_D = 0.6\,\mathrm{V}$ is below $V_G - V_{th} = 0.7\,\mathrm{V}$.
- [ ] Saturation, because $V_{DS} = 0.4\,\mathrm{V}$ is less than $V_{GS} = 1.0\,\mathrm{V}$.
::: solution
$V_{GS} = 1.0\,\mathrm{V} > V_{th}$, so a channel exists. The overdrive is $V_{OV} = 0.5\,\mathrm{V}$ and $V_{DS} = 0.4\,\mathrm{V} < V_{OV}$, so the channel is not pinched off: triode. The test [[#eq-sat-condition]] gives the same answer without computing $V_{DS}$: the drain must be no lower than $V_G - V_{th} = 0.7\,\mathrm{V}$, and it is at $0.6\,\mathrm{V}$. Comparing $V_{DS}$ with $V_{GS}$ instead of with $V_{OV}$ is a common slip.
:::
:::

::: widget plot
f: if(x < 0.5, k*(0.5x - x^2/2), k/2*0.25)*(1 + lam*x); if(x < 1, k*(x - x^2/2), k/2)*(1 + lam*x); if(x < 1.5, k*(1.5x - x^2/2), k/2*2.25)*(1 + lam*x); if(x < 2, k*(2x - x^2/2), k/2*4)*(1 + lam*x); x^2*k/2
x: 0, 5
y: 0, 9
sliders: k=2:1:4:0.1; lam=0.05:0:0.2:0.01
labels: v_{OV}=0.5\ \mathrm{V}; v_{OV}=1\ \mathrm{V}; v_{OV}=1.5\ \mathrm{V}; v_{OV}=2\ \mathrm{V}; v_{DS}=v_{OV}
caption: Output characteristics $i_D$ (mA) against $v_{DS}$ (V) for four overdrive voltages, with $k_n$ in mA/V² and $\lambda$ in V⁻¹ (applied in both regions here, so the curves are continuous). The parabola $i_D = \tfrac12 k_n v_{DS}^2$ separates triode (left) from saturation (right). Notice the square law: doubling $v_{OV}$ from $1$ to $2\,\mathrm{V}$ quadruples the saturation current. Increase $\lambda$ to tilt the flat parts upward.
:::

### The p-channel transistor

A **PMOS** transistor has a channel of holes, induced by a gate voltage *below* the source. Its equations are those of the NMOS with every voltage reversed: with $V_{tp} < 0$ the threshold, write $v_{SG}$, $v_{SD}$ and $\abs{V_{tp}}$, so that $v_{OV} = v_{SG} - \abs{V_{tp}}$ and

$$
i_D = \tfrac12 k_p v_{OV}^2(1 + \lambda\abs{v_{DS}}) \quad\text{for } v_{SD} \ge v_{OV}, \qquad k_p = \mu_pC_{ox}\frac{W}{L},
$$

with the drain current flowing *out of* the drain. The saturation condition becomes $v_D \le v_G + \abs{V_{tp}}$. Because the hole mobility is about a third to a half of the electron mobility, a PMOS needs a wider channel to carry the same current as an NMOS.

### Body effect and the limits of the model

If the source is not at the same potential as the body, the depletion charge under the channel grows and the threshold rises:

$$
V_{th} = V_{th0} + \gamma\left(\sqrt{2\phi_F + V_{SB}} - \sqrt{2\phi_F}\right),
$$ {#eq-body}

where $\gamma$ is the **body-effect coefficient** (typically $0.3$–$0.6\,\mathrm{V^{1/2}}$) and $2\phi_F \approx 0.6$–$0.8\,\mathrm{V}$. For instance, with $V_{th0} = 0.5\,\mathrm{V}$, $\gamma = 0.4\,\mathrm{V^{1/2}}$ and $2\phi_F = 0.7\,\mathrm{V}$, a source $1\,\mathrm{V}$ above the body raises the threshold to $0.5 + 0.4(\sqrt{1.7} - \sqrt{0.7}) = 0.69\,\mathrm{V}$. Discrete MOSFETs have the body tied to the source inside the package, so the body effect does not arise; in integrated circuits all NMOS bodies share the substrate, normally the most negative supply, and the body effect matters whenever a source is not at ground.

The square law is a *hand-calculation* model. It ignores the weak current that flows below threshold (**subthreshold conduction**, exponential in $v_{GS}$ like a BJT), and in short-channel transistors the carriers reach their saturation velocity, so that the current grows more nearly linearly than quadratically with $v_{OV}$. As of 2026, leading-edge logic processes use gate-all-around nanosheet transistors with gate lengths of a dozen or so nanometres, which no simple equation describes well; designers use simulator models such as BSIM with hundreds of parameters, or measured look-up tables. The square law nevertheless predicts the right *trends* — what happens when you change $W/L$, $I_D$ or $V_{OV}$ — and that is what a designer needs for a first pass. Older and larger devices, and the discrete parts of power electronics, follow it reasonably well.

::: warning Threshold voltages vary
The threshold voltage of a discrete power MOSFET is specified as a range: the popular 2N7000 small-signal NMOS, for example, has $V_{th}$ between $0.8$ and $3\,\mathrm{V}$ on its data sheet. Even on one chip, two nominally identical transistors differ by millivolts, and the threshold falls by about $1$–$3\,\mathrm{mV}$ per kelvin. A circuit whose current depends on the exact value of $V_{th}$ is badly designed; the bias networks below are built to avoid that.
:::

## DC analysis of MOSFET circuits

The equations [[#eq-square-law]] are nonlinear and change form at the region boundaries, so we use the same strategy as for diodes.

::: algorithm DC analysis of a MOSFET circuit {#alg-mos-dc}
1. Use $i_G = 0$ to find the gate voltage (usually from a resistive divider).
2. **Assume saturation** (the usual intended region for an amplifier) and write $I_D = \tfrac12k_n(V_{GS} - V_{th})^2$, with $V_{GS}$ expressed through the circuit (for example $V_{GS} = V_G - I_DR_S$). Neglect $\lambda$ in DC analysis unless told otherwise.
3. Solve for $I_D$ or $V_{OV}$. A quadratic has two roots: discard any with $V_{OV} < 0$, which would mean the transistor is off.
4. Find the drain voltage and **check** saturation, $V_D \ge V_G - V_{th}$. If the check fails, redo the analysis with the triode equation.
5. If $V_{GS} < V_{th}$, the transistor is cut off and $I_D = 0$.
:::

::: example A four-resistor bias network {#ex-mos-bias}
An NMOS with $V_{th} = 1\,\mathrm{V}$ and $k_n = 2\,\mathrm{mA/V^2}$ ($\lambda = 0$) has its gate fed by two $1\,\mathrm{M\Omega}$ resistors from $V_{DD} = 5\,\mathrm{V}$ to ground, a $2\,\mathrm{k\Omega}$ drain resistor to $V_{DD}$ and a $1\,\mathrm{k\Omega}$ source resistor to ground. Find $I_D$, $V_S$, $V_D$ and the operating region.
::: solution
No current flows into the gate, so $V_G = 5 \times 1/(1+1) = 2.5\,\mathrm{V}$. Assume saturation. With $V_S = I_DR_S$,

$$
V_{OV} = V_G - V_{th} - I_DR_S = 1.5 - 1000\,I_D, \qquad I_D = \tfrac12(2\times10^{-3})V_{OV}^2 = 10^{-3}V_{OV}^2.
$$

Eliminating $I_D$: $1.5 - V_{OV} = V_{OV}^2$, that is $V_{OV}^2 + V_{OV} - 1.5 = 0$, with roots $V_{OV} = (-1 \pm\sqrt7)/2$. The negative root, $-1.82\,\mathrm{V}$, would mean $V_{GS} < V_{th}$; the transistor would be off and the square law would not apply, so we discard it. Thus $V_{OV} = 0.823\,\mathrm{V}$, $I_D = 10^{-3}\times0.823^2 = 0.677\,\mathrm{mA}$, $V_S = 0.677\,\mathrm{V}$ and $V_D = 5 - 2\times0.677 = 3.65\,\mathrm{V}$.

**Check.** $V_G - V_{th} = 1.5\,\mathrm{V} \le V_D = 3.65\,\mathrm{V}$, so the transistor is in saturation. Equivalently $V_{DS} = 2.97\,\mathrm{V} \ge V_{OV} = 0.82\,\mathrm{V}$.
:::
:::

::: example A transistor driven into triode {#ex-mos-triode}
The same transistor has its gate connected directly to $V_{DD} = 5\,\mathrm{V}$, its source grounded and a $10\,\mathrm{k\Omega}$ drain resistor. Find $I_D$ and $V_D$.
::: solution
$V_{GS} = 5\,\mathrm{V}$, $V_{OV} = 4\,\mathrm{V}$. Assume saturation: $I_D = \tfrac12(2\,\mathrm{mA/V^2})(16\,\mathrm{V^2}) = 16\,\mathrm{mA}$, and then $V_D = 5 - 16\times10 = -155\,\mathrm{V}$. This is impossible — there is no negative supply — so the assumption is wrong.

In triode, with $V_D = V_{DS}$,

$$
\frac{5 - V_{DS}}{10^4} = 2\times10^{-3}\left(4V_{DS} - \tfrac12V_{DS}^2\right) \;\Longrightarrow\; 10V_{DS}^2 - 81V_{DS} + 5 = 0.
$$

The roots are $V_{DS} = 0.0622\,\mathrm{V}$ and $8.04\,\mathrm{V}$; the second is above $V_{DD}$ and outside the triode region, so $V_D = 62\,\mathrm{mV}$ and $I_D = (5 - 0.062)/10^4 = 0.494\,\mathrm{mA}$. The check $V_{DS} \le V_{OV}$ holds. The transistor is acting as a closed switch: nearly all of $V_{DD}$ appears across the resistor.
:::
:::

For small $v_{DS}$ the triode equation is approximately linear, $i_D \approx k_n v_{OV}v_{DS}$, so the channel behaves as a resistor

$$
r_{DS} = \frac{1}{k_n(v_{GS} - V_{th})},
$$ {#eq-rds}

controlled by the gate voltage. In [[#ex-mos-triode]], $r_{DS} = 1/(2\times10^{-3}\times4) = 125\,\Omega$, and indeed $V_{DS}/I_D = 0.062/0.494\times10^{3} \approx 126\,\Omega$.

::: example A PMOS stage {#ex-pmos}
A PMOS with $V_{tp} = -0.6\,\mathrm{V}$ and $k_p = 1\,\mathrm{mA/V^2}$ has its source at $V_{DD} = 3.3\,\mathrm{V}$, its gate at $1.3\,\mathrm{V}$ and a $1.5\,\mathrm{k\Omega}$ resistor from drain to ground. Find $I_D$ and $V_D$, and the largest drain resistor for which the transistor stays in saturation.
::: solution
$V_{SG} = 3.3 - 1.3 = 2.0\,\mathrm{V}$, so $V_{OV} = 2.0 - 0.6 = 1.4\,\mathrm{V}$. Assuming saturation, $I_D = \tfrac12\times10^{-3}\times1.4^2 = 0.98\,\mathrm{mA}$, flowing out of the drain into the resistor, so $V_D = 0.98\times1.5 = 1.47\,\mathrm{V}$. The PMOS saturation condition is $V_D \le V_G + \abs{V_{tp}} = 1.9\,\mathrm{V}$: satisfied. The drain may rise to $1.9\,\mathrm{V}$, so $R_D \le 1.9/0.98\,\mathrm{mA} = 1.94\,\mathrm{k\Omega}$.
:::
:::

## Biasing: making the operating point predictable

An amplifier must hold its **operating point** — the DC values of $I_D$ and $V_{DS}$ — within a narrow band, or its gain and output swing will change and the output may clip. The obvious way to set $I_D$ is to apply the right fixed $V_{GS}$. That fails in practice, because $I_D$ depends on $(V_{GS} - V_{th})^2$ and $V_{th}$ is poorly known. The cure is negative feedback: let the drain current itself reduce the gate–source voltage.

::: proposition Sensitivity of a source-degenerated bias {#prop-bias-sensitivity}
For a transistor in saturation with fixed gate voltage $V_G$ and source resistor $R_S$, so that $I_D = \tfrac12k_n(V_G - I_DR_S - V_{th})^2$, a small change in threshold changes the current by

$$
\frac{\partial I_D}{\partial V_{th}} = -\frac{g_m}{1 + g_mR_S}, \qquad g_m = k_nV_{OV} = \frac{2I_D}{V_{OV}}.
$$ {#eq-bias-sens}

For $g_mR_S \gg 1$ this tends to $-1/R_S$: a change $\Delta V_{th}$ in threshold changes the source voltage, and hence the current, by about $\Delta V_{th}/R_S$.
:::

::: proof
Differentiate both sides of $I_D = \tfrac12k_nV_{OV}^2$ with $V_{OV} = V_G - I_DR_S - V_{th}$ with respect to $V_{th}$:

$$
\frac{\partial I_D}{\partial V_{th}} = k_nV_{OV}\left(-R_S\frac{\partial I_D}{\partial V_{th}} - 1\right) = -g_mR_S\frac{\partial I_D}{\partial V_{th}} - g_m.
$$

Solving gives [[#eq-bias-sens]]. With $R_S = 0$ the sensitivity is $-g_m$; the resistor divides it by the factor $1 + g_mR_S$, which we shall recognise in [[electronics-2/feedback]] as one plus the loop gain.
:::

The quantity $g_m = \partial i_D/\partial v_{GS}$, the **transconductance**, appeared here for the first time; it will be the central parameter of every small-signal model. Note the two equivalent forms in [[#eq-bias-sens]]: at a given overdrive, $g_m$ is proportional to the current.

A common rule of thumb for discrete designs is the **rule of thirds**: divide $V_{DD}$ roughly equally between $R_D$, the transistor's $V_{DS}$ and $R_S$. The drop across $R_S$ then dwarfs the uncertainty in $V_{GS}$; the drop across $R_D$ sets the gain; and $V_{DS}$ leaves room for the output to swing without entering triode.

::: example Designing a bias network {#ex-bias-design}
Design a four-resistor bias for $I_D = 0.5\,\mathrm{mA}$ from $V_{DD} = 12\,\mathrm{V}$, for an NMOS with $k_n = 4\,\mathrm{mA/V^2}$ and $V_{th} = 1.5\,\mathrm{V}$ nominal. Then find $I_D$ when $V_{th}$ is $1.0\,\mathrm{V}$ or $2.0\,\mathrm{V}$, and compare with a fixed-$V_{GS}$ bias.
::: solution
**Overdrive.** $V_{OV} = \sqrt{2I_D/k_n} = \sqrt{2\times0.5/4} = 0.5\,\mathrm{V}$, so $V_{GS} = 2.0\,\mathrm{V}$.

**Rule of thirds.** Put $V_S = 4\,\mathrm{V}$, $V_{DS} = 4\,\mathrm{V}$, $V_{R_D} = 4\,\mathrm{V}$: $R_S = R_D = 4/0.5\,\mathrm{mA} = 8\,\mathrm{k\Omega}$; take the standard $8.2\,\mathrm{k\Omega}$. Then $V_G = V_S + V_{GS} = 6\,\mathrm{V}$, obtained with two equal gate resistors; their value is set by the input resistance we want, say $R_{G1} = R_{G2} = 1\,\mathrm{M\Omega}$ (input resistance $500\,\mathrm{k\Omega}$).

**Variation.** Solve $I_D = 2\times10^{-3}(6 - 8200I_D - V_{th})^2$ for each threshold (the positive-overdrive root):

| $V_{th}$ | $V_{OV}$ | $I_D$ | $V_{DS}$ |
|---|---|---|---|
| $1.0\,\mathrm{V}$ | $0.523\,\mathrm{V}$ | $0.546\,\mathrm{mA}$ | $3.05\,\mathrm{V}$ |
| $1.5\,\mathrm{V}$ | $0.494\,\mathrm{V}$ | $0.489\,\mathrm{mA}$ | $3.99\,\mathrm{V}$ |
| $2.0\,\mathrm{V}$ | $0.464\,\mathrm{V}$ | $0.431\,\mathrm{mA}$ | $4.93\,\mathrm{V}$ |

The current stays within $\pm12\,\%$ although the threshold varies by $\pm0.5\,\mathrm{V}$, and the transistor stays in saturation throughout. [[#eq-bias-sens]] predicts this: $g_m = 2\,\mathrm{mS}$, $1 + g_mR_S = 17.4$, so $\Delta I_D \approx -(2\,\mathrm{mS}/17.4)(\pm0.5\,\mathrm{V}) = \mp57\,\mathrm{\mu A}$.

**Fixed bias.** With $V_{GS}$ fixed at $2.0\,\mathrm{V}$ and no $R_S$, the current would be $\tfrac12k_n(2.0 - 1.0)^2 = 2\,\mathrm{mA}$ for the low threshold and zero for the high one. The design would not work at all.
:::
:::

Other bias arrangements follow the same principle. In **drain-to-gate feedback** a large resistor connects the drain to the gate; since no gate current flows, $V_G = V_D$ and the transistor is always in saturation (it is a "diode-connected" transistor at DC), and an increase in $I_D$ lowers $V_D$ and hence $V_{GS}$. In integrated circuits, resistors are expensive in area and poorly controlled, so transistors are biased instead by **current sources** built from other transistors: a reference current forced through a diode-connected transistor sets a $V_{GS}$ that is copied to many others. This is the **current mirror** of [[electronics-1/current-mirrors]], and it makes the bias independent of $V_{th}$ in a different way — by matching rather than by feedback.

::: quiz
In [[#ex-bias-design]] you replace $R_S = 8.2\,\mathrm{k\Omega}$ by $16\,\mathrm{k\Omega}$, adjusting $V_G$ to keep the nominal $I_D = 0.5\,\mathrm{mA}$. What happens?
- [x] The current becomes about twice as insensitive to $V_{th}$, but the voltage left for $R_D$ and $V_{DS}$ shrinks from about $8\,\mathrm{V}$ to $4\,\mathrm{V}$.
- [ ] The current becomes completely independent of $V_{th}$.
- [ ] The transistor enters triode, because $R_S$ is now larger than $R_D$.
- [ ] Nothing changes, because $I_D$ is unchanged.
::: solution
By [[#eq-bias-sens]] the sensitivity is $g_m/(1 + g_mR_S)$, which falls from $2/17.4$ to $2/33\,\mathrm{mS}$, roughly halving it. But $V_S$ rises to $8\,\mathrm{V}$, leaving only $4\,\mathrm{V}$ for $R_D$ and the transistor. Bias stability is bought with supply voltage — one reason low-voltage integrated circuits use current sources instead.
:::
:::

## The MOSFET as a switch

In a switch the transistor alternates between cut-off ($v_{GS} < V_{th}$, open) and deep triode ($v_{GS}$ well above threshold, $v_{DS}$ small, resistance $r_{DS}$ from [[#eq-rds]]). A power MOSFET's data sheet gives its **on-resistance** $R_{DS(on)}$ at a stated $V_{GS}$, from several ohms for small-signal parts to below a milliohm for large power devices. The conduction loss of a switch carrying current $I$ is $I^2R_{DS(on)}$, and because the gate draws no DC current, the drive power is only what is needed to charge and discharge the gate capacitance at each switching event.

The **CMOS inverter** is the most important switching circuit of all. An NMOS from the output to ground and a PMOS from the output to $V_{DD}$ share their gates as the input. With the input low, the NMOS is off and the PMOS on, pulling the output to $V_{DD}$; with the input high, the reverse. In either steady state one transistor is off, so no static current flows from the supply. In between, both conduct, and the output falls steeply as the input crosses the **switching threshold** $V_M$, where both transistors are in saturation and carry the same current:

$$
\tfrac12k_n(V_M - V_{tn})^2 = \tfrac12k_p(V_{DD} - V_M - \abs{V_{tp}})^2 \;\Longrightarrow\; V_M = \frac{V_{tn} + r(V_{DD} - \abs{V_{tp}})}{1 + r}, \qquad r = \sqrt{k_p/k_n}.
$$ {#eq-vm}

Sizing the PMOS so that $k_p = k_n$ and with $V_{tn} = \abs{V_{tp}}$ puts $V_M$ at $V_{DD}/2$, which gives equal noise margins for high and low inputs. The inverter, logic gates built from it and their speed and power are treated in [[digital-ic]].

## The MOSFET as an amplifier

Now connect a resistor $R_D$ from the drain to $V_{DD}$, ground the source, and drive the gate with $v_I$; the output is $v_O = v_{DS}$. This is the **common-source** (CS) amplifier, and its **voltage transfer characteristic** (VTC) $v_O(v_I)$ has three segments.

- For $v_I < V_{th}$ the transistor is off and $v_O = V_{DD}$.
- Just above threshold the transistor is in saturation and $v_O = V_{DD} - \tfrac12k_nR_D(v_I - V_{th})^2$, a downward parabola.
- When $v_O$ falls to $v_I - V_{th}$ the transistor enters triode, and $v_O$ approaches zero slowly as $v_I$ increases further.

The steep middle segment is where the circuit amplifies. Bias it at a point $Q$ in the middle of that segment with a DC input $V_{GS}$, add a small signal $v_{gs}$, and the output changes by $A_v\,v_{gs}$, where the **small-signal voltage gain** is the slope at $Q$:

$$
A_v = \left.\frac{\mathrm{d}v_O}{\mathrm{d}v_I}\right|_Q = -k_nR_D(V_{GS} - V_{th}) = -g_mR_D = -\frac{2(V_{DD} - V_{DS})}{V_{OV}}.
$$ {#eq-cs-gain}

The last form says that the gain is twice the DC drop across the drain resistor divided by the overdrive. It explains why amplifiers are biased at small overdrive (a few hundred millivolts) and with a large drop across the load — and why that large drop competes with the room needed for the output to swing.

::: widget plot
f: if(x < 1, 5, if(5 - R*k/2*(x - 1)^2 >= x - 1, 5 - R*k/2*(x - 1)^2, ((R*k*(x - 1) + 1) - sqrt((R*k*(x - 1) + 1)^2 - 10*R*k))/(R*k))); x - 1
x: 0, 5
y: 0, 5.2
sliders: R=10:1:20:0.5; k=1:0.2:4:0.1
labels: v_O; v_I - V_{th}
caption: Transfer characteristic of a common-source stage with $V_{DD} = 5\,\mathrm{V}$, $V_{th} = 1\,\mathrm{V}$, drain resistor $R_D$ (kΩ) and $k_n$ (mA/V²). The transistor leaves saturation where the curve meets the line $v_O = v_I - V_{th}$. Increase $R_D$ or $k_n$: the middle segment becomes steeper (more gain) but also narrower in $v_I$, so a smaller input range is amplified linearly.
:::

::: example Gain and swing of a CS stage {#ex-cs-vtc}
A CS stage has $V_{DD} = 5\,\mathrm{V}$, $R_D = 10\,\mathrm{k\Omega}$ and a transistor with $V_{th} = 1\,\mathrm{V}$, $k_n = 1\,\mathrm{mA/V^2}$. Find the input and output voltages at the edge of saturation, the bias $V_{GS}$ that puts $V_O$ at $2.5\,\mathrm{V}$, and the small-signal gain there.
::: solution
In saturation $v_O = 5 - \tfrac12(1\,\mathrm{mA/V^2})(10\,\mathrm{k\Omega})v_{OV}^2 = 5 - 5v_{OV}^2$ (volts). The edge of saturation is where $v_O = v_{OV}$: $5v_{OV}^2 + v_{OV} - 5 = 0$, so $v_{OV} = (-1 + \sqrt{101})/10 = 0.905\,\mathrm{V}$. There $v_I = 1.905\,\mathrm{V}$ and $v_O = 0.905\,\mathrm{V}$.

For $V_O = 2.5\,\mathrm{V}$: $5V_{OV}^2 = 2.5$, $V_{OV} = 0.707\,\mathrm{V}$, $V_{GS} = 1.707\,\mathrm{V}$ and $I_D = 0.25\,\mathrm{mA}$. The gain from [[#eq-cs-gain]] is

$$
A_v = -k_nV_{OV}R_D = -(10^{-3})(0.707)(10^4) = -7.07\,\mathrm{V/V},
$$

and the last form agrees: $-2(5 - 2.5)/0.707 = -7.07$. The output can swing up to $V_{DD} = 5\,\mathrm{V}$ (the transistor cuts off) and down to $0.9\,\mathrm{V}$ (triode), so a symmetric output swing of about $\pm1.6\,\mathrm{V}$ around $2.5\,\mathrm{V}$ is available — though well before that the parabola's curvature distorts the signal, a point taken up in [[electronics-1/small-signal-amplifiers]].
:::
:::

::: application Power MOSFETs and load switches
A $30\,\mathrm{V}$ NMOS power transistor in a $3\times3\,\mathrm{mm}$ package can have $R_{DS(on)}$ of a few milliohms at $V_{GS} = 10\,\mathrm{V}$. Switching $10\,\mathrm{A}$, it dissipates $I^2R_{DS(on)} \approx 0.3\,\mathrm{W}$ — one reason MOSFETs replaced bipolar transistors in switching converters ([[power-electronics]]). The specification "logic-level" means $R_{DS(on)}$ is guaranteed at $V_{GS} = 4.5\,\mathrm{V}$ or less, so that a microcontroller pin can drive the gate directly; with an ordinary part driven at $3.3\,\mathrm{V}$ the transistor may sit in partial conduction and overheat.
:::

::: history
Julius Edgar Lilienfeld filed patents on a field-effect device in 1925–1926, and Oskar Heil patented a similar idea in 1934, but neither could be made to work with the materials of the time: surface states trapped the induced charge. The problem was solved by growing a clean thermal oxide on silicon. In 1959 Mohamed Atalla and Dawon Kahng at Bell Labs built the first working MOSFET, reported in 1960. Frank Wanlass and Chih-Tang Sah at Fairchild described complementary MOS logic in 1963, and Robert Dennard and colleagues at IBM set out the rules for scaling MOSFET dimensions in 1974. Intel's 22 nm FinFET process (2011) lifted the channel into a vertical fin to restore gate control, and gate-all-around nanosheet transistors entered volume production in the mid-2020s.
:::

## Where this leads

The model and the methods of this chapter are used in every remaining chapter of the course. Linearising [[#eq-square-law]] about the operating point gives the small-signal model with $g_m$ and $r_o$ in [[electronics-1/small-signal-amplifiers]]; the CS stage, with its gain [[#eq-cs-gain]], and its relatives are analysed in [[electronics-1/single-stage-amplifiers]]; and the bias currents in integrated circuits are set by the mirrors of [[electronics-1/current-mirrors]]. The bipolar transistor, treated in the same way in [[electronics-1/bjt-circuits]], completes the pair.

::: summary
- A MOSFET is off for $v_{GS} < V_{th}$, a voltage-controlled resistor $r_{DS} = 1/(k_nv_{OV})$ in triode, and a voltage-controlled current source $i_D = \tfrac12k_nv_{OV}^2(1 + \lambda v_{DS})$ in saturation; no DC gate current flows.
- The NMOS is in saturation when $v_D \ge v_G - V_{th}$; the PMOS when $v_D \le v_G + \abs{V_{tp}}$. Always check the region after solving.
- DC analysis: find $V_G$, assume saturation, solve the quadratic, discard the root with negative overdrive, check.
- Thresholds vary widely, so fixed-$V_{GS}$ bias is useless; a source resistor reduces the sensitivity of $I_D$ to $V_{th}$ by the factor $1 + g_mR_S$.
- The transconductance $g_m = k_nV_{OV} = 2I_D/V_{OV}$ links bias and gain; the CS stage has small-signal gain $-g_mR_D = -2V_{R_D}/V_{OV}$.
- The square law is a hand-calculation model: short-channel, subthreshold and body effects modify it, and modern design uses simulator models.
:::

## Exercises

::: exercise Saturation current {level=1 check="0.001"}
An NMOS with $V_{th} = 0.5\,\mathrm{V}$ and $k_n = 2\,\mathrm{mA/V^2}$ has $V_{GS} = 1.5\,\mathrm{V}$ and $V_{DS} = 2\,\mathrm{V}$. Find $I_D$ in amperes ($\lambda = 0$).
::: solution
$V_{OV} = 1\,\mathrm{V} \le V_{DS}$, so the transistor is saturated and $I_D = \tfrac12(2\times10^{-3})(1)^2 = 1\,\mathrm{mA}$.
:::
:::

::: exercise Which region? {level=1 check="0.000375"}
An NMOS with $V_{th} = 1\,\mathrm{V}$ and $k_n = 1\,\mathrm{mA/V^2}$ has $V_{GS} = 2\,\mathrm{V}$ and $V_{DS} = 0.5\,\mathrm{V}$. Determine the region and find $I_D$ in amperes.
::: solution
$V_{OV} = 1\,\mathrm{V} > V_{DS} = 0.5\,\mathrm{V}$: triode. $I_D = 10^{-3}(1\times0.5 - 0.5^2/2) = 0.375\,\mathrm{mA}$.
:::
:::

::: exercise On-resistance {level=1 check="40"}
A switch transistor has $k_n = 10\,\mathrm{mA/V^2}$ and $V_{th} = 0.8\,\mathrm{V}$ and is driven with $V_{GS} = 3.3\,\mathrm{V}$. Estimate its on-resistance for small $V_{DS}$, in ohms.
::: solution
By [[#eq-rds]], $r_{DS} = 1/(k_nV_{OV}) = 1/(0.01\times2.5) = 40\,\Omega$.
:::
:::

::: exercise A degenerated bias point {level=2 check="0.0005"}
An NMOS with $V_{th} = 1\,\mathrm{V}$, $k_n = 1\,\mathrm{mA/V^2}$ has $V_G = 3\,\mathrm{V}$ and $R_S = 2\,\mathrm{k\Omega}$ to ground. Find $I_D$ in amperes, assuming saturation.
::: solution
$V_{OV} = 3 - 1 - 2000I_D$ and $I_D = 0.5\times10^{-3}V_{OV}^2$, so $2 - V_{OV} = V_{OV}^2$, i.e. $V_{OV}^2 + V_{OV} - 2 = 0$, $V_{OV} = 1\,\mathrm{V}$ (the root $-2$ is rejected). Then $I_D = 0.5\,\mathrm{mA}$ and $V_S = 1\,\mathrm{V}$.
:::
:::

::: exercise Largest PMOS drain resistor {level=2 check="16000"}
A PMOS with $V_{tp} = -1\,\mathrm{V}$, $k_p = 0.5\,\mathrm{mA/V^2}$ has its source at $5\,\mathrm{V}$, gate at $3\,\mathrm{V}$ and a resistor $R_D$ from drain to ground. Find the largest $R_D$, in ohms, for which it stays in saturation.
::: solution
$V_{SG} = 2\,\mathrm{V}$, $V_{OV} = 1\,\mathrm{V}$, $I_D = 0.25\,\mathrm{mA}$. Saturation requires $V_D \le V_G + \abs{V_{tp}} = 4\,\mathrm{V}$, so $I_DR_D \le 4\,\mathrm{V}$ and $R_D \le 16\,\mathrm{k\Omega}$.
:::
:::

::: exercise Output resistance from channel-length modulation {level=2 check="20000"}
A transistor in saturation carries $I_D = 0.5\,\mathrm{mA}$ with $\lambda = 0.1\,\mathrm{V^{-1}}$. Show that a change $\Delta v_{DS}$ changes the current by approximately $\lambda I_D\Delta v_{DS}$, and find the corresponding resistance $\Delta v_{DS}/\Delta i_D$ in ohms.
::: solution
$\partial i_D/\partial v_{DS} = \tfrac12k_nV_{OV}^2\lambda = \lambda I_D/(1 + \lambda V_{DS}) \approx \lambda I_D$. The resistance is $1/(\lambda I_D) = 1/(0.1\times5\times10^{-4}) = 20\,\mathrm{k\Omega}$. This is the output resistance $r_o$ of the small-signal model.
:::
:::

::: exercise Switching threshold of an inverter {level=2 check="(0.5+0.5*1.3)/1.5"}
A CMOS inverter has $V_{DD} = 1.8\,\mathrm{V}$, $V_{tn} = \abs{V_{tp}} = 0.5\,\mathrm{V}$ and an NMOS four times as strong as the PMOS ($k_n = 4k_p$). Find the switching threshold $V_M$, in volts.
::: solution
$r = \sqrt{k_p/k_n} = 0.5$, and by [[#eq-vm]] $V_M = (0.5 + 0.5\times1.3)/1.5 = 0.767\,\mathrm{V}$: the stronger NMOS pulls the threshold below $V_{DD}/2$.
:::
:::

::: exercise Drain-to-gate feedback bias {level=3 check="3000"}
An NMOS with $V_{th} = 1\,\mathrm{V}$ and $k_n = 2\,\mathrm{mA/V^2}$ has its source grounded, a resistor $R_D$ from drain to $V_{DD} = 5\,\mathrm{V}$, and a $10\,\mathrm{M\Omega}$ resistor from drain to gate. Explain why the transistor is in saturation, and find $R_D$, in ohms, for $I_D = 1\,\mathrm{mA}$. By how much does $I_D$ change if $V_{th}$ rises by $0.1\,\mathrm{V}$?
::: hint
No current flows in the $10\,\mathrm{M\Omega}$ resistor, so $V_G = V_D$.
:::
::: solution
With $V_G = V_D$, the condition $V_D \ge V_G - V_{th}$ is always met. For $I_D = 1\,\mathrm{mA}$, $V_{OV} = \sqrt{2\times1/2} = 1\,\mathrm{V}$, so $V_{GS} = V_D = 2\,\mathrm{V}$ and $R_D = (5 - 2)/1\,\mathrm{mA} = 3\,\mathrm{k\Omega}$. Here $V_{GS} = V_{DD} - I_DR_D$ plays the role of $V_G - I_DR_S$, so [[#eq-bias-sens]] applies with $R_S$ replaced by $R_D$: $g_m = 2\,\mathrm{mS}$, $\Delta I_D \approx -\frac{2\times10^{-3}}{1 + 6}(0.1) = -29\,\mathrm{\mu A}$. Solving exactly: $V_{OV} = 5 - 3000I_D - 1.1$ with $I_D = 10^{-3}V_{OV}^2$ gives $3V_{OV}^2 + V_{OV} - 3.9 = 0$, so $V_{OV} = 0.9856\,\mathrm{V}$ and $I_D = 0.971\,\mathrm{mA}$, a change of $-29\,\mathrm{\mu A}$ as predicted.
:::
:::

::: exercise Sizing a transistor {level=3 check="2*100e-6/(300e-6*0.2^2)"}
In a process with $k_n' = \mu_nC_{ox} = 300\,\mathrm{\mu A/V^2}$, what aspect ratio $W/L$ gives $I_D = 100\,\mathrm{\mu A}$ at an overdrive of $0.2\,\mathrm{V}$? What is $g_m$, and how do $W/L$ and $g_m$ change if the overdrive is halved at the same current?
::: solution
$W/L = 2I_D/(k_n'V_{OV}^2) = 2\times10^{-4}/(3\times10^{-4}\times0.04) = 16.7$. Then $g_m = 2I_D/V_{OV} = 1\,\mathrm{mS}$. Halving the overdrive to $0.1\,\mathrm{V}$ needs four times the aspect ratio, $W/L = 66.7$, and doubles $g_m$ to $2\,\mathrm{mS}$: transconductance per unit current, $g_m/I_D = 2/V_{OV}$, improves at low overdrive, paid for in area and capacitance (and limited, in reality, by the onset of subthreshold behaviour near $g_m/I_D \approx 1/(nV_T)$).
:::
:::

::: exercise Sensitivity to the process parameter {level=3}
For the source-degenerated bias of [[#prop-bias-sensitivity]], show that a fractional change in $k_n$ produces the fractional change in current

$$
\frac{\Delta I_D}{I_D} \approx \frac{1}{1 + g_mR_S}\,\frac{\Delta k_n}{k_n}.
$$

Evaluate it for [[#ex-bias-design]] with a $20\,\%$ increase in $k_n$.
::: solution
Differentiate $I_D = \tfrac12k_nV_{OV}^2$, $V_{OV} = V_G - I_DR_S - V_{th}$, with respect to $k_n$:

$$
\frac{\partial I_D}{\partial k_n} = \tfrac12V_{OV}^2 + k_nV_{OV}\left(-R_S\frac{\partial I_D}{\partial k_n}\right) = \frac{I_D}{k_n} - g_mR_S\frac{\partial I_D}{\partial k_n},
$$

so $\partial I_D/\partial k_n = (I_D/k_n)/(1 + g_mR_S)$, which is the result. In [[#ex-bias-design]], $1 + g_mR_S = 17.4$, so a $20\,\%$ rise in $k_n$ raises $I_D$ by only about $1.1\,\%$. Without $R_S$ the current would rise by the full $20\,\%$.
:::
:::
