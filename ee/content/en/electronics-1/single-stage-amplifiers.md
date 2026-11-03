A transistor has three terminals, and an amplifier needs an input, an output and a common reference. Choose which terminal is common to input and output and you obtain one of three basic configurations; there are two kinds of transistor, so there are six basic single-transistor amplifiers. They are not six variations on one theme: they behave very differently. One gives high voltage gain but a mediocre output resistance; one has a very low input resistance and passes current through almost unchanged; one has a gain of slightly less than one and is used precisely because of it. Nearly every analog circuit — an operational amplifier, a radio receiver's low-noise amplifier, a voltage regulator — is a combination of these six, and recognising which is which inside a complicated schematic is the first skill of an analog designer.

In this chapter we analyse each configuration with the small-signal models and the amplifier description ($R_{\text{in}}$, $A_{vo}$, $R_{\text{out}}$) of [[electronics-1/small-signal-amplifiers]]. We treat the MOSFET and BJT versions side by side, since the BJT results reduce to the MOSFET ones when $\beta \to \infty$ (so that $r_\pi \to \infty$ and $\alpha \to 1$). We add a resistor in the source or emitter to trade gain for predictability, and we end with a comparison table and some guidance on choosing a configuration. Throughout, the bias details are suppressed: we assume the transistor has been biased as in [[electronics-1/mosfet-circuits]] or [[electronics-1/bjt-circuits]], that coupling and bypass capacitors are short circuits at the signal frequencies, and that the supply rails are signal grounds.

## The common-source and common-emitter amplifiers

In the **common-source** (CS) amplifier the signal is applied to the gate, the output is taken from the drain, and the source is at signal ground (connected directly to ground or bypassed by a capacitor). The drain load is a resistor $R_D$ to $V_{DD}$, which appears from drain to ground in the small-signal circuit.

With the small-signal model, the gate draws no current and $v_{gs} = v_i$. The controlled source $g_mv_{gs}$ flows from drain to source, and with the output open it develops the voltage $-g_mv_{gs}(R_D\parallel r_o)$ across the parallel combination of $R_D$ and $r_o$. Setting $v_i = 0$ kills the controlled source and leaves $R_D\parallel r_o$ at the output. Thus

$$
R_{\text{in}} = \infty, \qquad A_{vo} = -g_m(R_D\parallel r_o), \qquad R_{\text{out}} = R_D\parallel r_o.
$$ {#eq-cs}

In practice $R_{\text{in}}$ is set by the gate bias network, for example $R_{G1}\parallel R_{G2}$, which can be megohms.

The **common-emitter** (CE) amplifier is the same circuit with a BJT, and it differs in one respect: the base draws current, so the input resistance is $r_\pi$ (in parallel with the bias resistors $R_B$):

$$
R_{\text{in}} = R_B\parallel r_\pi, \qquad A_{vo} = -g_m(R_C\parallel r_o), \qquad R_{\text{out}} = R_C\parallel r_o.
$$ {#eq-ce}

The CS and CE stages are **inverting** amplifiers with high voltage gain. Their gain is limited by the intrinsic gain $g_mr_o$ (reached as $R_D \to \infty$) and their output resistance is of the order of the load resistor, kilohms to tens of kilohms. We met a complete numerical example in [[electronics-1/small-signal-amplifiers#ex-ce-complete]]. Two problems were visible there: the gain depends on $g_m$, which depends on the bias current and (for the MOSFET) on the process; and the input resistance of the CE stage depends on $\beta$. Both are cured by degeneration.

## Source and emitter degeneration

Leave a resistor $R_S$ in the source unbypassed. The signal current $i_d$ now flows through $R_S$ and raises the source voltage, which subtracts from the gate drive. This is **negative feedback**: the output current itself reduces the controlling voltage.

::: theorem The degenerated common-source stage {#thm-cs-degen}
For a CS stage with drain resistor $R_D$ and an unbypassed source resistor $R_S$, neglecting $r_o$ and the body effect,

$$
A_{vo} = -\frac{g_mR_D}{1 + g_mR_S} = -\frac{R_D}{R_S + 1/g_m}, \qquad G_m = \frac{i_d}{v_i} = \frac{g_m}{1 + g_mR_S}, \qquad R_{\text{out}} \approx R_D.
$$ {#eq-cs-degen}

If $g_mR_S \gg 1$, the gain approaches $-R_D/R_S$, a ratio of resistors independent of the transistor.
:::

::: proof
The drain current flows through $R_S$, so $v_s = i_dR_S$ and $v_{gs} = v_i - i_dR_S$. With $i_d = g_mv_{gs}$,

$$
i_d = g_m(v_i - i_dR_S) \quad\Longrightarrow\quad i_d = \frac{g_m}{1 + g_mR_S}\,v_i.
$$

The output voltage is $v_o = -i_dR_D$, which gives $A_{vo}$. With $r_o$ included, the resistance looking into the drain is $r_o(1 + g_mR_S) + R_S$ ([[electronics-1/small-signal-amplifiers#exr-rout-degen]]), so $R_{\text{out}} = R_D\parallel[r_o(1 + g_mR_S) + R_S] \approx R_D$; the gain is reduced slightly by $r_o$, by a factor close to $1$ when $r_o \gg R_D, R_S$.
:::

The second form of [[#eq-cs-degen]] is the one to remember, because it can be read off the circuit: **the gain is the resistance in the drain divided by the total resistance in the source path**, where the transistor itself contributes $1/g_m$ — the resistance looking into its source. The same rule gives the gain of the plain CS stage ($R_S = 0$: $-R_D/(1/g_m) = -g_mR_D$).

::: quiz
A CS stage has $g_m = 4\,\mathrm{mS}$, $R_D = 10\,\mathrm{k\Omega}$ and an unbypassed $R_S = 500\,\Omega$. What is its gain, and what would it be if $g_m$ were $25\,\%$ lower?
- [ ] $-40$, falling to $-30$
- [x] $-13.3$, falling to $-12.0$
- [ ] $-20$, unchanged
- [ ] $-13.3$, falling to $-10.0$
::: solution
$A_{vo} = -R_D/(R_S + 1/g_m) = -10\,000/(500 + 250) = -13.3$. With $g_m = 3\,\mathrm{mS}$, $1/g_m = 333\,\Omega$ and $A_{vo} = -10\,000/833 = -12.0$: a $25\,\%$ drop in $g_m$ costs only $10\,\%$ of the gain, because $1 + g_mR_S = 3$ divides the sensitivity. Without $R_S$, the gain would be $-40$ and fall by the full $25\,\%$.
:::
:::

Degeneration buys four things at the price of gain:

- **Predictable gain.** The sensitivity of $A_{vo}$ to $g_m$ is divided by $1 + g_mR_S$.
- **Linearity.** Only a fraction $1/(1 + g_mR_S)$ of the input appears as $v_{gs}$, so the input amplitude for a given distortion grows by that factor ([[electronics-1/small-signal-amplifiers#thm-small-signal]]).
- **Higher output resistance** of the transistor itself, $r_o(1 + g_mR_S)$, which matters when the load is a current source rather than a resistor.
- For the BJT, a **higher input resistance**.

::: proposition The degenerated common-emitter stage {#prop-ce-degen}
For a CE stage with an unbypassed emitter resistor $R_e$, neglecting $r_o$,

$$
R_{\text{in}} = R_B\parallel(\beta + 1)(r_e + R_e), \qquad A_{vo} = -\frac{\alpha R_C}{r_e + R_e} = -\frac{g_mR_C}{1 + g_mR_e(1 + 1/\beta)}, \qquad R_{\text{out}} \approx R_C.
$$ {#eq-ce-degen}
:::

::: proof
Use the T model. The emitter current is $i_e = v_i/(r_e + R_e)$, since the internal base node is at $v_i$ (no base resistance in the model) and $r_e$ and $R_e$ are in series to ground. The collector current is $\alpha i_e$, so $v_o = -\alpha i_eR_C$, giving $A_{vo}$. The base current is $i_e/(\beta + 1)$, so the resistance looking into the base is $v_i/i_b = (\beta + 1)(r_e + R_e)$, the reflection rule. The second form of $A_{vo}$ follows from $r_e = \alpha/g_m$.
:::

::: widget plot
f: x*RD/(1 + x*RS); x*RD
x: 1, 10
y: 0, 50
sliders: RD=6.2:1:20:0.1; RS=1:0:3:0.05
labels: \lvert A_{vo}\rvert\ \text{degenerated}; g_mR_D
caption: Magnitude of the gain against the transconductance $g_m$ (mS) for a drain resistor $R_D$ and source resistor $R_S$ (both kΩ). With $R_S = 0$ the gain is proportional to $g_m$. Raise $R_S$: the curve flattens towards $R_D/R_S$, so a large change in $g_m$ (from bias, temperature or process) barely changes the gain. The price is the factor $1 + g_mR_S$ of lost gain.
:::

::: example Designing a gain that does not depend on the transistor {#ex-cs-design}
A CS stage biased at $I_D = 1\,\mathrm{mA}$ with $V_{OV} = 0.4\,\mathrm{V}$ has $g_m = 5\,\mathrm{mS}$, but process variation makes $g_m$ anywhere from $3.5$ to $6.5\,\mathrm{mS}$. Design $R_D$ and $R_S$ for a gain of $-5 \pm 10\,\%$ (between $-4.5$ and $-5.5$) using E24 resistors. Compare with an undegenerated stage. Ignore $r_o$.
::: solution
By [[#eq-cs-degen]], $\abs{A_{vo}} = R_D/(R_S + 1/g_m)$, with $1/g_m$ between $154\,\Omega$ and $286\,\Omega$. We need

$$
\frac{R_D}{R_S + 286} \ge 4.5 \quad\text{and}\quad \frac{R_D}{R_S + 154} \le 5.5.
$$

Combining, $4.5(R_S + 286) \le R_D \le 5.5(R_S + 154)$, which is possible only if $R_S \ge 440\,\Omega$. A comfortable choice is $R_S = 1\,\mathrm{k\Omega}$, which allows $5.79\,\mathrm{k\Omega} \le R_D \le 6.35\,\mathrm{k\Omega}$; take $R_D = 6.2\,\mathrm{k\Omega}$. The gains are then

| $g_m$ | $3.5\,\mathrm{mS}$ | $5\,\mathrm{mS}$ | $6.5\,\mathrm{mS}$ |
|---|---|---|---|
| $\abs{A_{vo}} = 6200/(1000 + 1/g_m)$ | $4.82$ | $5.17$ | $5.37$ |
| $g_mR_D$ (no degeneration) | $21.7$ | $31.0$ | $40.3$ |

The degenerated stage meets the specification. Without $R_S$, the same $R_D$ gives a gain six times larger but varying by $\pm30\,\%$. The DC drops are $1\,\mathrm{V}$ across $R_S$ and $6.2\,\mathrm{V}$ across $R_D$, so with $V_{DD} = 12\,\mathrm{V}$ the transistor has $V_{DS} = 4.8\,\mathrm{V}$, well in saturation.
:::
:::

::: example Partially bypassing the emitter {#ex-ce-partial}
In the CE amplifier of [[electronics-1/small-signal-amplifiers#ex-ce-complete]], the $3.9\,\mathrm{k\Omega}$ emitter resistor is replaced by $220\,\Omega$ (unbypassed) in series with $3.6\,\mathrm{k\Omega}$ (bypassed). With $R_{\text{sig}} = 2\,\mathrm{k\Omega}$, $R_C = 3.9\,\mathrm{k\Omega}$ and $R_L = 10\,\mathrm{k\Omega}$, find $R_{\text{in}}$ and $G_v$ for $\beta = 100$ and $\beta = 300$. Neglect $r_o$.
::: solution
**Bias.** The total DC emitter resistance is $3.82\,\mathrm{k\Omega}$, so by [[electronics-1/bjt-circuits#eq-ie-bias]] $I_E = 3.92/(3820 + 28\,900/101) = 0.955\,\mathrm{mA}$ for $\beta = 100$ and $1.002\,\mathrm{mA}$ for $\beta = 300$; $r_e = V_T/I_E = 27.2\,\Omega$ and $26.0\,\Omega$.

**$\beta = 100$.** $R_{\text{in}} = 28.9\,\mathrm{k\Omega}\parallel101(27.2 + 220)\,\Omega = 28.9\parallel24.97 = 13.4\,\mathrm{k\Omega}$. $A_{vo} = -0.990\times3900/247.2 = -15.6$. Then $G_v = \frac{13.4}{15.4}(-15.6)\frac{10}{13.9} = -9.78$.

**$\beta = 300$.** $R_{\text{in}} = 28.9\parallel301\times246.0\,\Omega = 28.9\parallel74.0 = 20.8\,\mathrm{k\Omega}$, $A_{vo} = -15.8$, $G_v = -10.4$.

Compared with the fully bypassed stage ($G_v = -54.7$ to $-70.4$ for $\beta = 100$ to $200$), the gain is about six times smaller but varies by only $6\,\%$ over a threefold range of $\beta$, and the input resistance is three to four times larger. The input signal that the junction can handle linearly is about $(r_e + R_e)/r_e \approx 9$ times larger.
:::
:::

## The common-gate and common-base amplifiers

In the **common-gate** (CG) amplifier the gate is at signal ground, the signal is applied to the source, and the output is taken from the drain. The **common-base** (CB) amplifier is its BJT counterpart.

Neglect $r_o$ first. The source is driven by $v_i$ and the gate is grounded, so $v_{gs} = -v_i$, and the current $g_mv_{gs} = -g_mv_i$ flows from drain to source — that is, a current $g_mv_i$ flows *out* of the source terminal into the source that drives it, and the same current flows into the drain from $R_D$. Hence

$$
R_{\text{in}} = \frac{1}{g_m}, \qquad A_{vo} = +g_mR_D, \qquad R_{\text{out}} = R_D \qquad \text{(CG)},
$$ {#eq-cg}

and for the CB stage, with $r_e$ in place of $1/g_m$ and $\alpha$ in the gain, $R_{\text{in}} = r_e$, $A_{vo} = \alpha R_C/r_e = g_mR_C$.

The open-circuit gain is the same as the CS stage's, but **non-inverting**, and the input resistance is very low: $1/g_m$ is a few hundred ohms for a MOSFET and about $26\,\Omega$ for a BJT at $1\,\mathrm{mA}$. With a source of resistance $R_{\text{sig}}$, the input divider is severe:

$$
G_v = \frac{1/g_m}{R_{\text{sig}} + 1/g_m}\,g_mR_D = \frac{R_D}{R_{\text{sig}} + 1/g_m}.
$$ {#eq-cg-overall}

Again "resistance in the drain over resistance in the source path". If $R_{\text{sig}} \gg 1/g_m$, the voltage gain is just $R_D/R_{\text{sig}}$. The CG stage is best understood as a **current buffer**: it accepts a current at a low input resistance and delivers almost the same current ($\alpha = 1$ for the MOSFET, slightly less for the BJT) at its drain, which has a high output resistance when $r_o$ is included.

::: proposition Common gate with r_o {#prop-cg-ro}
Including $r_o$, and with a load $R_D$ at the drain and source resistance $R_{\text{sig}}$, the CG stage has (body effect neglected)

$$
R_{\text{in}} = \frac{r_o + R_D}{1 + g_mr_o}, \qquad R_{\text{out}} = R_D\parallel\bigl[r_o + R_{\text{sig}}(1 + g_mr_o)\bigr].
$$ {#eq-cg-ro}
:::

::: proof
**Input.** Apply a test voltage $v_x$ at the source with the gate grounded, so $v_{gs} = -v_x$, and let $i_x$ be the current flowing from the test source into the source terminal. This current flows up through the transistor and out of the drain through $R_D$ to signal ground, so $v_d = i_xR_D$. The current flowing *down* through the transistor, from drain to source, is the controlled source plus the current in $r_o$, and it equals $-i_x$:

$$
g_mv_{gs} + \frac{v_d - v_x}{r_o} = -i_x \quad\Longrightarrow\quad -g_mv_x + \frac{i_xR_D - v_x}{r_o} = -i_x.
$$

Multiplying by $r_o$ and collecting terms gives $i_x(r_o + R_D) = v_x(1 + g_mr_o)$, which is the stated $R_{\text{in}}$.

**Output.** Set the input source to zero, leaving $R_{\text{sig}}$ from source to ground. The transistor with a source resistance $R_{\text{sig}}$ and grounded gate is the degenerated device of [[electronics-1/small-signal-amplifiers#exr-rout-degen]], whose drain resistance is $R_{\text{sig}} + r_o + g_mr_oR_{\text{sig}}$. In parallel with $R_D$ this gives $R_{\text{out}}$.
:::

When $R_D \ll r_o$, $R_{\text{in}} \approx 1/g_m$ as before. But if the drain load is itself a high resistance (an ideal current source, $R_D \to \infty$), the input resistance becomes very large: the transistor can only pass the current the load allows. This surprising behaviour matters in cascodes with current-source loads ([[electronics-1/multistage-amplifiers]]).

::: example A 50 Ω input stage {#ex-cg-50}
A radio receiver's first stage must present $50\,\Omega$ to the antenna cable. Using a CG stage with a MOSFET at overdrive $0.2\,\mathrm{V}$, what bias current is needed? With $R_D = 500\,\Omega$, what is the voltage gain from the open-circuit voltage of a matched $50\,\Omega$ source?
::: solution
We need $1/g_m = 50\,\Omega$, so $g_m = 20\,\mathrm{mS}$ and $I_D = g_mV_{OV}/2 = 0.02\times0.2/2 = 2\,\mathrm{mA}$. With $R_{\text{sig}} = 50\,\Omega$ and $R_{\text{in}} = 50\,\Omega$, by [[#eq-cg-overall]] $G_v = 500/(50 + 50) = 5$ (half of $g_mR_D = 10$ is lost in the matched divider). The CG input match is broadband — it does not depend on resonating any capacitance — which is why CG and CB stages are popular as wideband low-noise amplifiers.
:::
:::

::: quiz
A CB stage biased at $I_E = 1\,\mathrm{mA}$ with $R_C = 5\,\mathrm{k\Omega}$ is driven by a source with $R_{\text{sig}} = 5\,\mathrm{k\Omega}$. Approximately what is the overall voltage gain?
- [ ] $192$, that is $g_mR_C$
- [x] about $1$
- [ ] $-192$
- [ ] about $0.005$
::: solution
By [[#eq-cg-overall]], $G_v = \alpha R_C/(R_{\text{sig}} + r_e) = 0.99\times5000/(5000 + 26) \approx 0.98$. The input resistance $r_e = 26\,\Omega$ is tiny compared with $R_{\text{sig}}$, so the source delivers essentially a current $v_{\text{sig}}/R_{\text{sig}}$, which the stage passes to $R_C$: the voltage gain is $R_C/R_{\text{sig}}$. A CB stage is not a voltage amplifier for high-resistance sources.
:::
:::

## The source and emitter followers

In the **common-drain** (CD) amplifier, or **source follower**, the drain is at signal ground (connected to $V_{DD}$), the signal goes to the gate, and the output is taken from the source, across a load $R_L$ (which may include a bias resistor or current source). Its BJT counterpart is the **common-collector** (CC) amplifier or **emitter follower**.

::: theorem The source follower {#thm-sf}
For a source follower with total resistance $R_L'$ from source to signal ground (load, bias resistor and $r_o$ in parallel), and neglecting the body effect,

$$
A_v = \frac{v_o}{v_i} = \frac{g_mR_L'}{1 + g_mR_L'} = \frac{R_L'}{R_L' + 1/g_m}, \qquad R_{\text{in}} = \infty, \qquad R_{\text{out}} = \frac{1}{g_m}\parallel r_o.
$$ {#eq-sf}

With the body effect (source not tied to body), $g_m$ in the denominator is replaced by $g_m + g_{mb}$: $A_v = g_mR_L'/(1 + (g_m + g_{mb})R_L')$, which tends to $g_m/(g_m + g_{mb}) = 1/(1 + \chi)$ as $R_L' \to \infty$, and $R_{\text{out}} = 1/(g_m + g_{mb})\parallel r_o$.
:::

::: proof
The drain is grounded, so the controlled current $g_mv_{gs}$ flows from ground into the source node and through $R_L'$: $v_o = g_mv_{gs}R_L'$ with $v_{gs} = v_i - v_o$. Then $v_o(1 + g_mR_L') = g_mR_L'v_i$. For the output resistance, ground the gate and apply $v_x$ at the source: $v_{gs} = -v_x$, so the transistor draws $i_x = -g_mv_{gs} = g_mv_x$ from the test source (plus $v_x/r_o$ through $r_o$), giving $1/g_m\parallel r_o$. With the body at ground and the source at $v_o$, $v_{bs} = -v_o$ and the extra source $g_{mb}v_{bs} = -g_{mb}v_o$ acts like a resistor $1/g_{mb}$ from source to ground; including it in parallel with $R_L'$ and simplifying gives the stated results.
:::

The output follows the input with a gain slightly less than one and **no inversion**, hence the name. The point of the circuit is the resistance transformation: an infinite input resistance and an output resistance of $1/g_m$, a few hundred ohms or less. A follower is a **voltage buffer**: it lets a source of high resistance drive a low-resistance load without losing signal.

::: proposition The emitter follower {#prop-ef}
For an emitter follower with signal-source resistance $R_{\text{sig}}$ (including the bias resistors as seen by the base), total emitter load $R_L'$, and $r_o$ neglected,

$$
R_{\text{in}} = (\beta + 1)(r_e + R_L'), \qquad A_v = \frac{v_o}{v_b} = \frac{R_L'}{R_L' + r_e}, \qquad R_{\text{out}} = r_e + \frac{R_{\text{sig}}}{\beta + 1}.
$$ {#eq-ef}

The overall gain from the source is $G_v = \dfrac{R_L'}{R_L' + r_e + R_{\text{sig}}/(\beta + 1)}$.
:::

::: proof
In the T model, the emitter current is $i_e = v_b/(r_e + R_L')$ and the base current is $i_e/(\beta + 1)$, which gives $R_{\text{in}}$ by the reflection rule and $A_v$ by the divider $r_e$, $R_L'$. For the output resistance, set the source to zero and apply $v_x$ at the emitter: the path from the emitter goes through $r_e$ to the internal base node and then through $R_{\text{sig}}$, which carries only the base current $i_e/(\beta + 1)$; seen from the emitter, $R_{\text{sig}}$ is divided by $\beta + 1$. The overall gain is the Thévenin equivalent at the emitter, $v_{\text{sig}}$ in series with $R_{\text{out}}$ (the base divider $R_{\text{in}}/(R_{\text{in}} + R_{\text{sig}})$ and the output divider combine exactly into this form), driving $R_L'$.
:::

The emitter follower transforms resistances in both directions by $\beta + 1$: the load looks $\beta + 1$ times larger from the base, and the source looks $\beta + 1$ times smaller from the emitter.

::: example An emitter follower as a buffer {#ex-ef}
A source with $R_{\text{sig}} = 10\,\mathrm{k\Omega}$ must drive a $1\,\mathrm{k\Omega}$ load. Connected directly, the gain would be $1/11 = 0.091$. An emitter follower ($\beta = 100$) biased at $I_E = 5\,\mathrm{mA}$ with a $1\,\mathrm{k\Omega}$ emitter resistor is inserted, with the load capacitively coupled to the emitter. Find $R_{\text{in}}$, $R_{\text{out}}$ and the overall gain (ignore the base bias resistors).
::: solution
$r_e = 26\,\mathrm{mV}/5\,\mathrm{mA} = 5.2\,\Omega$. The emitter sees $R_L' = 1\,\mathrm{k\Omega}\parallel1\,\mathrm{k\Omega} = 500\,\Omega$. Then

$$
R_{\text{in}} = 101\times(5.2 + 500) = 51.0\,\mathrm{k\Omega}, \qquad R_{\text{out}} = 5.2 + \frac{10\,000}{101} = 104\,\Omega,
$$

and $G_v = 500/(500 + 104) = 0.83$. The buffer raises the gain from $0.09$ to $0.83$, nine times. The output resistance is dominated by the reflected source resistance, not by $r_e$; a larger $\beta$ (or a Darlington pair, [[electronics-1/multistage-amplifiers]]) would help more than a larger bias current.
:::
:::

::: warning Followers have limited swing
The small-signal analysis assumes the transistor stays on. In an emitter follower biased at $I_E$ with a resistor $R_E$ to ground and a capacitively coupled load $R_L$, the transistor cuts off on negative half-cycles when the load demands more current than the bias provides: the most negative output is $-I_E(R_E\parallel R_L)$. Driving $100\,\Omega$ through a follower biased at $1\,\mathrm{mA}$ gives at most $0.1\,\mathrm{V}$ of negative swing, however small $R_{\text{out}}$ is. Push–pull output stages ([[electronics-2/output-stages]]) remove this limit.
:::

::: widget plot
f: x/(x + 1/gm); x/((1 + chi)*x + 1/gm)
x: 0, 5
y: 0, 1.05
sliders: gm=4:1:20:0.5; chi=0.2:0:0.4:0.01
labels: A_v\ (\text{no body effect}); A_v\ \text{with } g_{mb}=\chi g_m
caption: Source-follower gain against the load $R_L'$ (kΩ) for transconductance $g_m$ (mS). The gain approaches $1$ once $R_L' \gg 1/g_m$. With the body effect ($g_{mb} = \chi g_m$, slider $\chi$) the gain $g_mR_L'/(1+(g_m+g_{mb})R_L')$ levels off instead at $1/(1+\chi)$: an NMOS follower in a shared substrate never quite reaches unity gain.
:::

## Comparing the six configurations

| configuration | $R_{\text{in}}$ | $A_{vo}$ | $R_{\text{out}}$ | role |
|---|---|---|---|---|
| CS | $\infty$ | $-g_m(R_D\parallel r_o)$ | $R_D\parallel r_o$ | voltage gain |
| CE | $r_\pi$ | $-g_m(R_C\parallel r_o)$ | $R_C\parallel r_o$ | voltage gain |
| CS with $R_S$ | $\infty$ | $-R_D/(R_S + 1/g_m)$ | $\approx R_D$ | predictable gain |
| CE with $R_e$ | $(\beta+1)(r_e + R_e)$ | $-\alpha R_C/(r_e + R_e)$ | $\approx R_C$ | predictable gain |
| CG | $\approx 1/g_m$ | $+g_mR_D$ | $R_D$ ($\parallel$ high) | current buffer |
| CB | $\approx r_e$ | $+g_mR_C$ | $R_C$ ($\parallel$ high) | current buffer |
| CD (source follower) | $\infty$ | $\approx 1$ | $1/g_m$ | voltage buffer |
| CC (emitter follower) | $(\beta+1)(r_e + R_L')$ | $\approx 1$ | $r_e + R_{\text{sig}}/(\beta+1)$ | voltage buffer |

The table summarises a set of intuitive rules that let you analyse most stages by inspection:

1. The resistance looking into a **gate** is infinite; into a **base**, $r_\pi + (\beta + 1)\times$(resistance in the emitter).
2. The resistance looking into a **source or emitter** is about $1/g_m$ (plus base resistance divided by $\beta + 1$).
3. The resistance looking into a **drain or collector** is $r_o$, raised to about $r_o(1 + g_mR_S)$ by degeneration.
4. The gain from gate (or base) to drain (or collector) is $-$(resistance seen at the drain) / (resistance in the source path, including $1/g_m$).

::: application Choosing a configuration
A designer chooses by asking what the source and load look like. A capacitive sensor or a pH electrode (gigohms of source resistance) needs a CS or source-follower input, never a CG. A $50\,\Omega$ antenna cable suits a CG or CB input stage. A loudspeaker or a cable needs a follower at the output. A high-gain amplifier is a CS or CE stage loaded by a high resistance — ideally a current source — and to get both high gain and high output resistance, a CS stage is followed by a CG stage: the **cascode**, the most important two-transistor combination, studied in [[electronics-1/multistage-amplifiers]].
:::

::: history
The three basic configurations were known for vacuum tubes long before transistors — the grounded-cathode, grounded-grid and cathode-follower stages — and the cathode follower was in wide use by the 1930s. After the transistor arrived, early analyses described the common-base connection first, because Bardeen and Brattain's point-contact device was measured that way and its current gain $\alpha$ was the natural figure of merit; the common-emitter connection, with its current gain $\beta$, became dominant once junction transistors with $\alpha$ close to $1$ were available in the early 1950s. Today the same six stages are the vocabulary of CMOS analog design, described in textbooks such as Razavi's and Sedra and Smith's in exactly the parallel MOSFET–BJT form used here.
:::

## Where this leads

Single stages are rarely used alone. [[electronics-1/multistage-amplifiers]] cascades them — a CS or CE gain stage followed by a follower, the cascode CS–CG combination, the Darlington pair of two followers — and shows how each stage loads the previous one. Replacing the drain resistor by a transistor current source, the **active load** of [[electronics-1/current-mirrors]], raises the gain to the intrinsic value $g_mr_o$. The differential pair of [[electronics-1/differential-amplifiers]] is two CS stages sharing a source node. At high frequencies the CS stage suffers from the Miller effect, while the CG stage and the follower do not, which is analysed in [[electronics-1/amplifier-frequency-response]].

::: summary
- CS/CE stages give high inverting gain $-g_m(R_D\parallel r_o)$, with $R_{\text{in}} = \infty$ (MOSFET) or $r_\pi$ (BJT) and output resistance about $R_D$.
- Degeneration by $R_S$ or $R_e$ reduces the gain to $-R_D/(R_S + 1/g_m)$, making it insensitive to the transistor, more linear, and (for the BJT) raising $R_{\text{in}}$ to $(\beta+1)(r_e + R_e)$.
- CG/CB stages have $R_{\text{in}} \approx 1/g_m$, non-inverting gain $g_mR_D$ and high output resistance: they are current buffers, useful for matching low-resistance sources.
- Followers have gain just below one, high input resistance and output resistance $1/g_m$ (MOSFET) or $r_e + R_{\text{sig}}/(\beta + 1)$ (BJT): they are voltage buffers. The body effect limits an NMOS follower's gain to $1/(1 + \chi)$.
- Gain by inspection: resistance at the drain over resistance in the source path; resistances are multiplied by $\beta + 1$ from emitter to base and divided by it from base to emitter.
- Check large-signal limits too: a follower's negative swing is limited by its bias current.
:::

## Exercises

::: exercise CS gain {level=1 check="-2e-3*(5e3*50e3/55e3)"}
A CS stage has $g_m = 2\,\mathrm{mS}$, $r_o = 50\,\mathrm{k\Omega}$ and $R_D = 5\,\mathrm{k\Omega}$. Find $A_{vo}$.
::: solution
$A_{vo} = -g_m(R_D\parallel r_o) = -2\times10^{-3}\times4545 = -9.09$.
:::
:::

::: exercise CG input resistance {level=1 check="100"}
A CG stage has $g_m = 10\,\mathrm{mS}$ and $R_D \ll r_o$. Find its input resistance, in ohms.
::: solution
$R_{\text{in}} \approx 1/g_m = 100\,\Omega$.
:::
:::

::: exercise Source-follower gain {level=1 check="5/6"}
A source follower with $g_m = 5\,\mathrm{mS}$ drives $R_L' = 1\,\mathrm{k\Omega}$. Find its gain, ignoring the body effect and $r_o$.
::: solution
$A_v = g_mR_L'/(1 + g_mR_L') = 5/6 = 0.833$.
:::
:::

::: exercise CE with degeneration {level=2 check="-(100/101)*4700/226"}
A CE stage with $\beta = 100$ is biased at $I_E = 1\,\mathrm{mA}$ ($r_e = 26\,\Omega$), with $R_C = 4.7\,\mathrm{k\Omega}$ and an unbypassed $200\,\Omega$ emitter resistor. Find $A_{vo}$ and the resistance looking into the base.
::: solution
$A_{vo} = -\alpha R_C/(r_e + R_e) = -0.990\times4700/226 = -20.6$. $R_{\text{in,base}} = 101\times226 = 22.8\,\mathrm{k\Omega}$.
:::
:::

::: exercise Emitter-follower output resistance {level=2 check="0.026/0.002+5000/101"}
An emitter follower with $\beta = 100$, $I_E = 2\,\mathrm{mA}$ is driven from a source of resistance $5\,\mathrm{k\Omega}$. Find its output resistance, in ohms.
::: solution
$r_e = 26/2 = 13\,\Omega$ and $R_{\text{out}} = 13 + 5000/101 = 13 + 49.5 = 62.5\,\Omega$.
:::
:::

::: exercise A common-base stage from a 50 Ω source {level=2 check="2000/(50+26)"}
A CB stage is biased at $I_E = 1\,\mathrm{mA}$ and has $R_C = 2\,\mathrm{k\Omega}$. It is driven by a $50\,\Omega$ source. Taking $\alpha \approx 1$ and $r_e = 26\,\Omega$, find the overall voltage gain.
::: solution
$G_v = R_C/(R_{\text{sig}} + r_e) = 2000/76 = 26.3$, non-inverting.
:::
:::

::: exercise A follower with body effect {level=2 check="1/4.8e-3"}
An NMOS source follower with $g_m = 4\,\mathrm{mS}$ and $g_{mb} = 0.8\,\mathrm{mS}$ is loaded by an ideal current source and has $r_o \to \infty$. Find its gain and its output resistance, in ohms.
::: solution
With $R_L' \to \infty$, $A_v = g_m/(g_m + g_{mb}) = 4/4.8 = 0.833$, and $R_{\text{out}} = 1/(g_m + g_{mb}) = 1/4.8\,\mathrm{mS} = 208\,\Omega$. The body effect costs $17\,\%$ of the gain even with an ideal load; placing the transistor in its own well (a PMOS follower in an n-well, or a triple-well NMOS) with the body tied to the source removes the problem.
:::
:::

::: exercise Setting a gain with an emitter resistor {level=3 check="(100/101)*470 - (100/101)*26"}
A CE stage with $\beta = 100$, $I_C = 1\,\mathrm{mA}$ and $R_C = 4.7\,\mathrm{k\Omega}$ must have $A_{vo} = -10$. Find the unbypassed emitter resistance $R_e$, in ohms. By how much does the gain change if the temperature rises from $300$ to $350\,\mathrm{K}$ at constant current?
::: hint
$r_e = \alpha V_T/I_C$ and $V_T$ is proportional to absolute temperature.
:::
::: solution
From [[#eq-ce-degen]], $r_e + R_e = \alpha R_C/10 = 0.990\times470 = 465.3\,\Omega$, and $r_e = \alpha\times26\,\Omega = 25.7\,\Omega$, so $R_e = 439.6\,\Omega$ (use $442\,\Omega$ from the E96 series). At $350\,\mathrm{K}$, $V_T = 30.3\,\mathrm{mV}$ and $r_e = 30.0\,\Omega$, so $\abs{A_{vo}} = 4653/(439.6 + 30.0) = 9.91$: a change of only $-0.9\,\%$. Without degeneration the gain $g_mR_C = I_CR_C/V_T$ would fall by $14\,\%$.
:::
:::

::: exercise Input resistance of a common gate with a current-source load {level=3}
Using [[#eq-cg-ro]], find the input resistance of a CG stage with $g_m = 2\,\mathrm{mS}$ and $r_o = 50\,\mathrm{k\Omega}$ when the drain load is (a) $R_D = 5\,\mathrm{k\Omega}$, (b) $R_D = 50\,\mathrm{k\Omega}$, (c) an ideal current source. Interpret the result.
::: solution
$1 + g_mr_o = 101$. (a) $R_{\text{in}} = 55/101\,\mathrm{k\Omega} = 545\,\Omega$, close to $1/g_m = 500\,\Omega$. (b) $100/101\,\mathrm{k\Omega} = 990\,\Omega$, about twice $1/g_m$. (c) $R_D \to \infty$ gives $R_{\text{in}} \to \infty$. With an ideal current source in the drain, no change of current is possible, so the input voltage can change without any change of input current. The CG stage is a low-resistance input only if its drain load is much smaller than $g_mr_o\times r_o$, i.e. only if the current has somewhere to go.
:::
:::

::: exercise Swing of an emitter follower {level=3 check="1/(470*100/570)"}
An emitter follower is biased by a $470\,\Omega$ emitter resistor to ground and drives a capacitively coupled $100\,\Omega$ load. What is the minimum bias current $I_E$, in amperes, for a $1\,\mathrm{V}$ peak sinusoidal output without cut-off? What is then the power dissipated in $R_E$, if the emitter sits at $6\,\mathrm{V}$?
::: hint
At the negative peak, the load and $R_E$ together must be able to pull the emitter down by $1\,\mathrm{V}$ while the transistor current falls to zero.
:::
::: solution
With the transistor just cut off, the bias current flowing in $R_E$ must account for the whole negative excursion across $R_E\parallel R_L = 82.5\,\Omega$, so $I_E \ge 1\,\mathrm{V}/82.5\,\Omega = 12.1\,\mathrm{mA}$. With the emitter at $6\,\mathrm{V}$ the current is $6/470 = 12.8\,\mathrm{mA}$ — just enough — and $R_E$ dissipates $6^2/470 = 77\,\mathrm{mW}$ to deliver a load power of only $(1/\sqrt2)^2/100 = 5\,\mathrm{mW}$. Such class-A followers are wasteful, which motivates the push–pull stages of [[electronics-2/output-stages]].
:::
:::
