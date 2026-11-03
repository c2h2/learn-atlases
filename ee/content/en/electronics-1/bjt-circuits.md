The bipolar junction transistor (BJT) was the first transistor to be manufactured in quantity, and for thirty years it was *the* transistor: the radios, hearing aids, computers and operational amplifiers of the 1950s to the 1970s were built from it. CMOS has since taken over digital logic and most of analog design, but the BJT remains the device of choice where its strengths count: its transconductance is the highest available for a given current, its base–emitter voltage is an accurate and reproducible function of current and temperature (the basis of every bandgap voltage reference and on-chip thermometer), and its low noise and high speed make silicon–germanium heterojunction BJTs the workhorses of radio front-ends up to hundreds of gigahertz. Discrete BJTs such as the 2N3904 and BC547 are still found in nearly every hobbyist's drawer.

This chapter does for the BJT what [[electronics-1/mosfet-circuits]] did for the MOSFET. Starting from the device physics of [[semiconductor-devices/bipolar-transistors]], we write a large-signal model, learn to find the operating point and region, and design bias networks that make the operating point insensitive to the current gain $\beta$ — which, for a given transistor type, can vary by a factor of three from one device to the next. We then use the transistor as a switch and as an amplifier. The analysis method is again: assume a region, solve, check.

## The large-signal BJT model

An **npn** transistor has three terminals: emitter (E), base (B) and collector (C). It consists of two pn junctions back to back, the base–emitter junction (EBJ) and the collector–base junction (CBJ), with a very thin base between them. The four combinations of junction biases define four **modes of operation**.

::: definition Modes of operation of a BJT {#def-bjt-modes}
| mode | EBJ | CBJ | behaviour |
|---|---|---|---|
| **cut-off** | reverse | reverse | all currents essentially zero: an open switch |
| **active** | forward | reverse | $i_C = \beta i_B$: a current-controlled current source, the amplifying mode |
| **saturation** | forward | forward | $v_{CE} \approx 0.1$–$0.3\,\mathrm{V}$: a closed switch |
| **reverse active** | reverse | forward | emitter and collector roles exchanged; low gain, rarely used |
:::

In the active mode the forward-biased EBJ injects electrons into the base. Because the base is thin and lightly doped compared with the emitter, almost all of them diffuse across it and are swept into the collector by the field of the reverse-biased CBJ. The small fraction that recombine in the base, together with the holes injected from the base into the emitter, make up the base current. The ratio of the two currents is fixed by the geometry and doping of the device, not by the circuit.

::: theorem Active-mode BJT equations {#thm-bjt-active}
In the active mode, the terminal currents of an npn transistor are

$$
i_C = I_S\,e^{v_{BE}/V_T}\left(1 + \frac{v_{CE}}{V_A}\right), \qquad i_B = \frac{i_C}{\beta}, \qquad i_E = i_C + i_B = \frac{i_C}{\alpha},
$$ {#eq-bjt-active}

where $I_S$ is the saturation current (proportional to the emitter area), $V_T = kT/q$, $V_A$ is the **Early voltage**, $\beta$ is the **common-emitter current gain**, and the **common-base current gain** is

$$
\alpha = \frac{\beta}{\beta + 1}, \qquad \beta = \frac{\alpha}{1 - \alpha}.
$$ {#eq-alpha-beta}
:::

::: proof {collapsed}
The full derivation, from minority-carrier diffusion in the base, is in [[semiconductor-devices/bipolar-transistors]]. In outline: with the EBJ forward biased by $v_{BE}$, the electron concentration at the emitter edge of the base is $n_{p0}e^{v_{BE}/V_T}$, and the reverse-biased CBJ holds it at nearly zero at the collector edge. For a base much thinner than the diffusion length the profile is linear, and the diffusion current across the base, which becomes the collector current, is $i_C = qAD_n n_{p0}e^{v_{BE}/V_T}/W_B = I_Se^{v_{BE}/V_T}$ with $I_S = qAD_nn_i^2/(N_AW_B)$. The base current, made of holes injected into the emitter and of recombination in the base, is also proportional to $e^{v_{BE}/V_T}$, so the ratio $\beta = i_C/i_B$ is independent of bias. Increasing $v_{CE}$ widens the collector depletion region and narrows the effective base width $W_B$, which raises $i_C$ slightly: this **Early effect** is described, to first order, by the factor $1 + v_{CE}/V_A$.
:::

Typical values for a small-signal transistor are $I_S \approx 10^{-15}$ to $10^{-14}\,\mathrm{A}$, $\beta \approx 100$–$400$ and $V_A \approx 50$–$100\,\mathrm{V}$. The value of $\beta$ is the weak point: data sheets for the 2N3904 give a minimum $h_{FE}$ (the data-sheet name for the DC $\beta$) of $100$ at $10\,\mathrm{mA}$ and a maximum of $300$; it also rises with temperature and falls at very low and very high currents. Because $\alpha$ is within $1\,\%$ of $1$ for $\beta \ge 100$, we often take $i_C \approx i_E$.

### The model for DC calculations

Since $v_{BE}$ depends only logarithmically on current — $60\,\mathrm{mV}$ per decade, as for the diode in [[electronics-1/diode-circuits]] — the constant-voltage-drop model works equally well here:

- **active:** $V_{BE} = 0.7\,\mathrm{V}$, $I_C = \beta I_B$, valid while $V_{CE} \ge V_{CE,\text{sat}}$ (that is, the CBJ is not forward biased by more than about $0.4$–$0.5\,\mathrm{V}$);
- **saturation:** $V_{BE} = 0.7$–$0.8\,\mathrm{V}$, $V_{CE} = V_{CE,\text{sat}} \approx 0.2\,\mathrm{V}$, and $I_C < \beta I_B$;
- **cut-off:** $V_{BE} < 0.5\,\mathrm{V}$, all currents zero.

The **pnp** transistor is the complement: emitter at the top, currents flowing out of the base and the collector, and the same equations with $v_{EB}$ and $v_{EC}$ in place of $v_{BE}$ and $v_{CE}$. It is in the active mode when $V_{EB} \approx 0.7\,\mathrm{V}$ and $V_{EC} \ge 0.2\,\mathrm{V}$.

::: warning Two meanings of "saturation"
A *saturated* BJT has both junctions forward biased and behaves like a closed switch. A *saturated* MOSFET has a pinched-off channel and behaves like a current source — the BJT's *active* mode. When you say "saturation", say which device you mean. The table: BJT active ↔ MOSFET saturation (amplifier); BJT saturation ↔ MOSFET triode (switch).
:::

## DC analysis of BJT circuits

::: algorithm DC analysis of a BJT circuit {#alg-bjt-dc}
1. Replace the base network by its Thévenin equivalent $V_{BB}$, $R_B$ ([[circuits-1/network-theorems]]).
2. Assume the **active** mode: $V_{BE} = 0.7\,\mathrm{V}$, $I_C = \beta I_B$, $I_E = (\beta + 1)I_B$. Write KVL around the base–emitter loop and solve for $I_B$ (or $I_E$).
3. Find $V_{CE}$ from the collector–emitter loop and **check** $V_{CE} \ge 0.2\,\mathrm{V}$ (more precisely $V_{CB} > -0.4\,\mathrm{V}$).
4. If the check fails, assume **saturation**: $V_{CE} = 0.2\,\mathrm{V}$, solve for $I_C$ and $I_B$ separately, and check $I_C < \beta I_B$.
5. If $V_{BB}$ is too low to forward bias the EBJ, the transistor is cut off.
:::

The base–emitter loop with an emitter resistor $R_E$ is worth solving once in general. KVL gives $V_{BB} = I_BR_B + V_{BE} + I_ER_E$, and with $I_B = I_E/(\beta + 1)$,

$$
I_E = \frac{V_{BB} - V_{BE}}{R_E + R_B/(\beta + 1)}.
$$ {#eq-ie-bias}

The base resistance appears in the emitter circuit divided by $\beta + 1$: seen from the emitter, everything in the base is scaled down by the current gain. The converse also holds — a resistor in the emitter looks $(\beta + 1)$ times larger from the base. This **reflection rule** is one of the most useful facts about the BJT.

::: example The trouble with a base resistor {#ex-fixed-bias}
A transistor with $V_{CC} = 12\,\mathrm{V}$, $R_C = 2.2\,\mathrm{k\Omega}$, emitter grounded, is biased by $R_B = 470\,\mathrm{k\Omega}$ from $V_{CC}$ to the base. Find $I_C$ and $V_{CE}$ for $\beta = 100$ and $\beta = 300$.
::: solution
Assume active: $I_B = (12 - 0.7)/470\,\mathrm{k\Omega} = 24.0\,\mathrm{\mu A}$, independent of $\beta$.

For $\beta = 100$: $I_C = 2.40\,\mathrm{mA}$ and $V_{CE} = 12 - 2.40\times2.2 = 6.71\,\mathrm{V}$, comfortably active.

For $\beta = 300$: $I_C$ would be $7.21\,\mathrm{mA}$ and $V_{CE} = 12 - 15.9 = -3.9\,\mathrm{V}$, which is impossible. The transistor is saturated, with $V_{CE} = 0.2\,\mathrm{V}$ and $I_C = (12 - 0.2)/2.2 = 5.36\,\mathrm{mA}$, and $I_C/I_B = 223 < 300$ confirms it.

The same circuit works as an amplifier with one transistor and not at all with another from the same reel. The current is set by $\beta$, which is precisely the parameter we cannot control.
:::
:::

### Bias stability

The cure, as for the MOSFET, is an emitter resistor and a stiff base voltage. Reading [[#eq-ie-bias]]:

- if $R_E \gg R_B/(\beta + 1)$, the current $I_E \approx (V_{BB} - V_{BE})/R_E$ no longer depends on $\beta$;
- if $V_{BB} - V_{BE} \gg \Delta V_{BE}$, the current is insensitive to the $-2\,\mathrm{mV/K}$ drift and the sample-to-sample spread of $V_{BE}$.

::: proposition Sensitivities of the emitter-resistor bias {#prop-bjt-sens}
For the bias [[#eq-ie-bias]], with $R_{\text{tot}} = R_E + R_B/(\beta + 1)$,

$$
\frac{\partial I_E}{\partial V_{BE}} = -\frac{1}{R_{\text{tot}}}, \qquad \frac{\beta}{I_E}\frac{\partial I_E}{\partial\beta} = \frac{\beta}{(\beta+1)^2}\,\frac{R_B}{R_{\text{tot}}} \approx \frac{1}{\beta}\,\frac{R_B}{R_{\text{tot}}}.
$$ {#eq-bjt-sens}

The fractional sensitivity to $\beta$ is small when $R_B \ll \beta R_E$.
:::

::: proof
The first follows at once from [[#eq-ie-bias]]. For the second, $\partial R_{\text{tot}}/\partial\beta = -R_B/(\beta+1)^2$, so

$$
\frac{\partial I_E}{\partial\beta} = \frac{V_{BB} - V_{BE}}{R_{\text{tot}}^2}\,\frac{R_B}{(\beta + 1)^2} = I_E\,\frac{R_B}{(\beta+1)^2R_{\text{tot}}},
$$

and multiplying by $\beta/I_E$ gives the result.
:::

The usual design rules follow: choose $V_E = I_ER_E$ of one to a few volts (much more than the uncertainty in $V_{BE}$), and make the divider "stiff", with a current about a tenth of $I_E$, so that $R_B$ is about $10R_E$ and $R_B/(\beta + 1) \lesssim 0.1R_E$. A stiffer divider improves stability but lowers the input resistance of the amplifier, since the bias resistors appear in parallel with its input.

::: widget plot
f: (VBB - 0.7)/(RE + RB/(x + 1))*x/(x + 1); (VBB - 0.7)/RE
x: 50, 500
y: 0, 1.2
sliders: RE=3.9:0.5:10:0.1; RB=28.9:1:200:0.1; VBB=4.62:2:8:0.01
labels: I_C\ (\mathrm{mA}); (V_{BB}-0.7)/R_E
caption: Collector current (mA) against $\beta$ for the voltage-divider bias, with $R_E$ and $R_B$ in kΩ and $V_{BB}$ in volts; the defaults are those of [[#ex-bjt-bias-design]]. Increase $R_B$ (a less stiff divider) and watch the curve droop at low $\beta$: the current becomes $\beta$-dependent. Make $R_B$ small and the curve flattens onto the limit $(V_{BB} - 0.7)/R_E$.
:::

::: example Designing a voltage-divider bias {#ex-bjt-bias-design}
Design a bias network for $I_C \approx 1\,\mathrm{mA}$ from $V_{CC} = 12\,\mathrm{V}$ for a transistor with $\beta$ between $100$ and $300$, using standard resistor values, and find the range of $I_C$ and $V_{CE}$.
::: solution
**Choices.** Following the rule of thirds, aim for $V_E \approx 4\,\mathrm{V}$, $V_{CE} \approx 4\,\mathrm{V}$ and $4\,\mathrm{V}$ across $R_C$: $R_E = R_C = 4\,\mathrm{k\Omega}$; take $3.9\,\mathrm{k\Omega}$ each. The base must sit at $V_E + 0.7 \approx 4.6\,\mathrm{V}$. For a divider current of $0.1\,\mathrm{mA}$, $R_1 + R_2 = 120\,\mathrm{k\Omega}$ with $R_2 \approx 4.6/0.1 = 46\,\mathrm{k\Omega}$: take $R_2 = 47\,\mathrm{k\Omega}$ (base to ground) and $R_1 = 75\,\mathrm{k\Omega}$ ($V_{CC}$ to base).

**Thévenin equivalent.** $V_{BB} = 12\times47/122 = 4.62\,\mathrm{V}$ and $R_B = 75\parallel47 = 28.9\,\mathrm{k\Omega}$.

**Currents.** By [[#eq-ie-bias]], with $I_C = \alpha I_E$:

| $\beta$ | $R_B/(\beta+1)$ | $I_E$ | $I_C$ | $V_{CE} = 12 - I_CR_C - I_ER_E$ |
|---|---|---|---|---|
| $100$ | $286\,\Omega$ | $0.937\,\mathrm{mA}$ | $0.928\,\mathrm{mA}$ | $4.73\,\mathrm{V}$ |
| $200$ | $144\,\Omega$ | $0.970\,\mathrm{mA}$ | $0.965\,\mathrm{mA}$ | $4.45\,\mathrm{V}$ |
| $300$ | $96\,\Omega$ | $0.982\,\mathrm{mA}$ | $0.978\,\mathrm{mA}$ | $4.36\,\mathrm{V}$ |

A threefold spread in $\beta$ moves the collector current by only $\pm2.6\,\%$, and the transistor stays well inside the active region. The current is a little below $1\,\mathrm{mA}$ because of the standard values; with $R_2 = 51\,\mathrm{k\Omega}$ or $R_E = 3.6\,\mathrm{k\Omega}$ it would be a little above. The sensitivity to $V_{BE}$ is $1/R_{\text{tot}} \approx 0.24\,\mathrm{mA/V}$: a $50\,\mathrm{K}$ temperature rise ($\Delta V_{BE} = -0.1\,\mathrm{V}$) raises $I_C$ by about $24\,\mathrm{\mu A}$, or $2.5\,\%$.
:::
:::

::: quiz
In [[#ex-bjt-bias-design]] someone replaces $R_1$ and $R_2$ by $750\,\mathrm{k\Omega}$ and $470\,\mathrm{k\Omega}$ to raise the amplifier's input resistance. What happens to the bias?
- [ ] Nothing, since $V_{BB}$ is unchanged.
- [x] $R_B$ rises to $289\,\mathrm{k\Omega}$, comparable with $\beta R_E$, so $I_C$ becomes noticeably $\beta$-dependent (about $0.57\,\mathrm{mA}$ at $\beta = 100$ against $0.80\,\mathrm{mA}$ at $\beta = 300$).
- [ ] The transistor saturates.
- [ ] The current rises, because the divider draws less current.
::: solution
$V_{BB}$ is still $4.62\,\mathrm{V}$, but $R_B/(\beta+1)$ is now $2.86\,\mathrm{k\Omega}$ at $\beta = 100$ — not small compared with $R_E = 3.9\,\mathrm{k\Omega}$. By [[#eq-ie-bias]], $I_E = 3.923\,\mathrm{V}/6.760\,\mathrm{k\Omega} = 0.580\,\mathrm{mA}$ at $\beta = 100$ and $3.923/4.860 = 0.807\,\mathrm{mA}$ at $\beta = 300$, so $I_C$ ranges from $0.57$ to $0.80\,\mathrm{mA}$. The divider is no longer stiff, and the base current flowing through $R_B$ drops the base voltage by an amount that depends on $\beta$.
:::
:::

::: example A pnp stage {#ex-pnp}
A pnp transistor ($\beta = 100$) has its emitter connected through $R_E = 2\,\mathrm{k\Omega}$ to $V_{CC} = 5\,\mathrm{V}$, its base held at $2.5\,\mathrm{V}$ by a stiff divider, and its collector connected through $R_C = 2.7\,\mathrm{k\Omega}$ to ground. Find $I_C$ and $V_{EC}$.
::: solution
With the base at $2.5\,\mathrm{V}$ and $V_{EB} = 0.7\,\mathrm{V}$, the emitter is at $3.2\,\mathrm{V}$, so $I_E = (5 - 3.2)/2\,\mathrm{k\Omega} = 0.90\,\mathrm{mA}$ flowing *into* the emitter. Then $I_C = \alpha I_E = 0.891\,\mathrm{mA}$, flowing *out of* the collector into $R_C$, and $V_C = 0.891\times2.7 = 2.41\,\mathrm{V}$. Thus $V_{EC} = 3.2 - 2.41 = 0.79\,\mathrm{V} > 0.2\,\mathrm{V}$: active, but only just — the collector is within $0.1\,\mathrm{V}$ of the base, so a small signal swing would push it into saturation. A smaller $R_C$ would give more headroom.
:::
:::

### Output characteristics and the load line

The graphical view of a BJT stage is often clarifying. Plot the **output characteristics**, $i_C$ against $v_{CE}$ for a family of base currents: each curve rises steeply from the origin through the saturation region (below about $0.2$–$0.3\,\mathrm{V}$), then flattens into the active region, where it is nearly horizontal at $\beta i_B$ with a small upward slope $1/r_o$. Extended backwards, the active-region lines all meet the $v_{CE}$ axis near $v_{CE} = -V_A$, which is how the Early voltage is measured.

The collector circuit adds a constraint. For a collector resistor $R_C$ and emitter resistor $R_E$, KVL gives

$$
i_C \approx \frac{V_{CC} - v_{CE}}{R_C + R_E},
$$

the **DC load line**, from $(V_{CC}, 0)$ on the voltage axis to $(0, V_{CC}/(R_C + R_E))$ on the current axis (we took $i_E \approx i_C$). The base circuit selects one curve of the family; the operating point lies where it crosses the load line. As the base current varies, the operating point slides along the load line, from cut-off at its lower end to saturation at its upper end. For the largest *symmetric* undistorted swing at the collector, place the Q-point near the middle of the active part of the load line — not at $V_{CE} = V_{CC}/2$ in general, but midway between $V_{CE,\text{sat}}$ and the cut-off end, taking into account that the signal load line (with bypass capacitors and the external load) is steeper than the DC one, as we shall see in [[electronics-1/single-stage-amplifiers]].

::: quiz
On the output characteristics, a transistor's operating point moves upward along its load line until $v_{CE}$ reaches $0.2\,\mathrm{V}$. What happens if the base current is increased further?
- [ ] The collector current keeps rising as $\beta i_B$.
- [x] The collector current stays near $(V_{CC} - 0.2)/(R_C + R_E)$; the extra base current only drives the transistor deeper into saturation.
- [ ] The transistor enters the reverse-active mode.
- [ ] The collector current falls, because $\beta$ falls in saturation.
::: solution
The load line, fixed by the external circuit, limits the collector current to at most $(V_{CC} - V_{CE,\text{sat}})/(R_C + R_E)$. Once the operating point reaches the saturation region, more base current lowers $v_{CE}$ by a few tens of millivolts and stores more charge in the base, but $i_C$ hardly changes. The ratio $i_C/i_B$ — the forced $\beta$ — therefore falls below $\beta$, which is the signature of saturation used in [[#alg-bjt-dc]].
:::
:::

## The BJT as a switch

In a switching circuit the transistor alternates between cut-off and saturation. To guarantee saturation for every transistor of a given type, the base current must exceed $I_C/\beta_{\min}$ by a margin. The ratio $\beta_{\text{forced}} = I_C/I_B$ in saturation is called the **forced beta**, and the ratio $\beta_{\min}/\beta_{\text{forced}}$ is the **overdrive factor**, typically $2$ to $10$.

::: example Driving a relay from a microcontroller {#ex-relay}
A $12\,\mathrm{V}$ relay with a $400\,\Omega$ coil is to be switched by a $3.3\,\mathrm{V}$ microcontroller output through an npn transistor with $\beta_{\min} = 100$. Choose the base resistor for an overdrive factor of about $5$, and say what else the circuit needs.
::: solution
In saturation the coil current is $(12 - 0.2)/400 = 29.5\,\mathrm{mA}$. The minimum base current for saturation is $29.5/100 = 0.295\,\mathrm{mA}$; with an overdrive of $5$ we want $I_B \approx 1.5\,\mathrm{mA}$, so $R_B = (3.3 - 0.7)/1.5\,\mathrm{mA} = 1.73\,\mathrm{k\Omega}$. The standard value $1.5\,\mathrm{k\Omega}$ gives $I_B = 1.73\,\mathrm{mA}$ (forced $\beta = 17$, overdrive about $5.9$), well within the few milliamperes a microcontroller pin can source.

The coil is an inductor, and when the transistor turns off, its current cannot stop instantly: $v = L\,\mathrm{d}i/\mathrm{d}t$ would drive the collector to hundreds of volts and destroy the transistor. A **flyback diode** across the coil (cathode to $+12\,\mathrm{V}$) gives the current a path and clamps the collector at about $12.7\,\mathrm{V}$.
:::
:::

Saturation makes the switch slow to turn off: the forward-biased CBJ floods the base with excess stored charge, which must be removed before the collector current can fall. Logic families based on BJTs used Schottky diodes across the CBJ (Schottky TTL) or kept the transistors out of saturation altogether (emitter-coupled logic) to avoid this storage delay.

## The BJT as an amplifier

With the emitter grounded, a collector resistor $R_C$ to $V_{CC}$, and an input $v_I = v_{BE}$, the output of the **common-emitter** (CE) stage in the active mode is

$$
v_O = V_{CC} - R_CI_Se^{v_I/V_T}.
$$

Its transfer characteristic is flat at $V_{CC}$ for $v_I$ below about $0.5\,\mathrm{V}$, falls steeply over a range of only a hundred millivolts or so, and flattens again at $V_{CE,\text{sat}}$ when the transistor saturates. Biased at a collector current $I_C$, the slope there is the small-signal gain:

$$
A_v = \left.\frac{\mathrm{d}v_O}{\mathrm{d}v_I}\right|_Q = -\frac{I_C}{V_T}R_C = -g_mR_C = -\frac{V_{CC} - V_{CE}}{V_T}, \qquad g_m = \frac{I_C}{V_T}.
$$ {#eq-ce-gain}

Compare with the MOSFET result $-2(V_{DD} - V_{DS})/V_{OV}$ from [[electronics-1/mosfet-circuits#eq-cs-gain]]: for the same DC drop across the load resistor, the BJT's gain is larger by the factor $V_{OV}/(2V_T)$, which is about $4$ for a $0.2\,\mathrm{V}$ overdrive. The BJT's exponential law gives it the largest transconductance per unit current, $g_m/I_C = 1/V_T \approx 38.5\,\mathrm{V^{-1}}$, of any transistor.

::: widget plot
f: max(0.2, 5 - R*1.39e-11*exp(x/0.026))
x: 0.5, 0.8
y: 0, 5.2
sliders: R=2.5:0.5:10:0.1
labels: v_O\ (\mathrm{V})
caption: Transfer characteristic of a common-emitter stage with $V_{CC} = 5\,\mathrm{V}$, $I_S = 1.39\times10^{-14}\,\mathrm{A}$ (so $I_C = 1\,\mathrm{mA}$ at $v_{BE} = 0.65\,\mathrm{V}$) and collector resistor $R_C$ (kΩ); saturation is approximated by a floor at $0.2\,\mathrm{V}$. The whole active region is traversed by a change in $v_{BE}$ of well under $0.1\,\mathrm{V}$. Hover near the middle of the slope: with $R_C = 2.5\,\mathrm{k\Omega}$ the slope at $v_O = 2.5\,\mathrm{V}$ is about $-96$.
:::

::: example Gain of a CE stage {#ex-ce-gain}
A CE stage with $V_{CC} = 5\,\mathrm{V}$ and $R_C = 2.5\,\mathrm{k\Omega}$ is biased at $I_C = 1\,\mathrm{mA}$. Find the small-signal gain, and the input amplitude that produces a $1\,\mathrm{V}$ peak output. How large would the gain of a MOSFET stage with $V_{OV} = 0.2\,\mathrm{V}$ and the same $R_C$ drop be?
::: solution
$V_{CE} = 5 - 2.5 = 2.5\,\mathrm{V}$, active. $g_m = 1\,\mathrm{mA}/26\,\mathrm{mV} = 38.5\,\mathrm{mS}$ and $A_v = -38.5\times10^{-3}\times2500 = -96.2\,\mathrm{V/V}$. A $1\,\mathrm{V}$ output peak needs only $1/96.2 = 10.4\,\mathrm{mV}$ at the base — already uncomfortably close to $V_T$, so the output will be visibly distorted (the exponential stretches the negative half-cycle of $v_o$, the half where $I_C$ rises). For the MOSFET, [[electronics-1/mosfet-circuits#eq-cs-gain]] gives $-2\times2.5/0.2 = -25\,\mathrm{V/V}$.
:::
:::

In practice the input of a CE amplifier is coupled through a capacitor, so that the signal source does not disturb the bias set by the divider, and the emitter resistor of the bias network is bypassed by a capacitor so that it does not reduce the signal gain. These details, and the input and output resistances of the stage, are the subject of [[electronics-1/small-signal-amplifiers]] and [[electronics-1/single-stage-amplifiers]].

::: application The bandgap voltage reference
The base–emitter voltage of a BJT falls by about $2\,\mathrm{mV/K}$, while the difference of the $V_{BE}$ values of two transistors run at different current densities, $V_T\ln N$ by [[#eq-bjt-active]], *rises* in proportion to absolute temperature. Adding the two in the right proportion cancels the temperature dependence and gives a voltage close to the silicon band-gap, about $1.2\,\mathrm{V}$. This **bandgap reference**, developed by Bob Widlar (1971) and refined by Paul Brokaw (1974), sets the output of nearly every voltage regulator, ADC and DAC; as of 2026 good integrated references achieve temperature coefficients of a few parts per million per kelvin.
:::

::: history
John Bardeen and Walter Brattain demonstrated the germanium point-contact transistor at Bell Labs in December 1947. William Shockley conceived the junction transistor in January 1948 and published its theory in 1949, and the first grown-junction transistors were made at Bell Labs in 1951. Jewell James Ebers and John Moll published their large-signal model in 1954, the year Gordon Teal's group at Texas Instruments produced the first commercial silicon transistors; James Early explained the effect of collector voltage on base width in 1952. Bardeen, Brattain and Shockley shared the 1956 Nobel Prize in Physics. The planar process of Jean Hoerni (Fairchild, 1959) made reliable silicon BJTs and, soon after, integrated circuits possible.
:::

## Where this leads

The small-signal model of the BJT — $g_m = I_C/V_T$, $r_\pi = \beta/g_m$, $r_o = V_A/I_C$ — comes from linearising [[#eq-bjt-active]] and is derived in [[electronics-1/small-signal-amplifiers]]. The reflection rule behind [[#eq-ie-bias]] reappears in the emitter follower and the Darlington pair ([[electronics-1/single-stage-amplifiers]], [[electronics-1/multistage-amplifiers]]), and matched BJTs make the precise current mirrors and differential pairs of [[electronics-1/current-mirrors]] and [[electronics-1/differential-amplifiers]]. Output stages that deliver amperes to a loudspeaker are in [[electronics-2/output-stages]].

::: summary
- In the active mode $i_C = I_Se^{v_{BE}/V_T}(1 + v_{CE}/V_A)$, $i_B = i_C/\beta$, $i_E = i_C/\alpha$, with $\alpha = \beta/(\beta + 1)$; for DC work take $V_{BE} = 0.7\,\mathrm{V}$ and $V_{CE,\text{sat}} = 0.2\,\mathrm{V}$.
- Assume active, solve, check $V_{CE} \ge 0.2\,\mathrm{V}$; if not, assume saturation and check $I_C < \beta I_B$.
- $\beta$ varies by a factor of three between devices, so a bias set by a base resistor alone is unusable.
- With a divider and emitter resistor, $I_E = (V_{BB} - V_{BE})/(R_E + R_B/(\beta + 1))$: stable if $R_B \ll \beta R_E$ and $V_E$ is a volt or more. Resistances in the base appear divided by $\beta + 1$ from the emitter, and vice versa.
- As a switch, a BJT is driven into saturation with an overdrive factor of several times $I_C/\beta_{\min}$; inductive loads need a flyback diode.
- The CE gain is $-g_mR_C = -V_{R_C}/V_T$, larger than a MOSFET's at the same drop because $g_m/I_C = 1/V_T$ is the largest possible.
:::

## Exercises

::: exercise From alpha to beta {level=1 check="99"}
A transistor has $\alpha = 0.99$. Find $\beta$.
::: solution
$\beta = \alpha/(1 - \alpha) = 0.99/0.01 = 99$.
:::
:::

::: exercise Terminal currents {level=1 check="0.00151"}
A transistor with $\beta = 150$ in the active mode has $I_B = 10\,\mathrm{\mu A}$. Find $I_C$ and $I_E$; give $I_E$ in amperes.
::: solution
$I_C = 150\times10\,\mathrm{\mu A} = 1.5\,\mathrm{mA}$; $I_E = I_C + I_B = 1.51\,\mathrm{mA}$.
:::
:::

::: exercise Output resistance from the Early effect {level=1 check="1e5"}
A transistor with $V_A = 100\,\mathrm{V}$ carries $I_C = 1\,\mathrm{mA}$. Find the small-signal output resistance $r_o = (\partial i_C/\partial v_{CE})^{-1} \approx V_A/I_C$, in ohms.
::: solution
$r_o = 100\,\mathrm{V}/1\,\mathrm{mA} = 100\,\mathrm{k\Omega}$. (Strictly, $\partial i_C/\partial v_{CE} = I_Se^{v_{BE}/V_T}/V_A = I_C/(V_A + V_{CE})$, slightly smaller; the difference is ignored by convention.)
:::
:::

::: exercise Saturated or active? {level=2 check="4.8/0.43"}
A transistor with $\beta = 100$ has a $10\,\mathrm{k\Omega}$ base resistor and a $1\,\mathrm{k\Omega}$ collector resistor, both connected to $5\,\mathrm{V}$, and its emitter grounded. Find its mode of operation and the forced $\beta$.
::: solution
$I_B = (5 - 0.7)/10\,\mathrm{k\Omega} = 0.43\,\mathrm{mA}$. In the active mode $I_C$ would be $43\,\mathrm{mA}$, giving $V_{CE} = 5 - 43 < 0$: impossible. So the transistor is saturated with $I_C = (5 - 0.2)/1\,\mathrm{k\Omega} = 4.8\,\mathrm{mA}$ and $\beta_{\text{forced}} = 4.8/0.43 = 11.2 < 100$, consistent.
:::
:::

::: exercise Analysing a divider bias {level=2 check="0.001342*100/101"}
A transistor with $\beta = 100$ has $V_{CC} = 12\,\mathrm{V}$, $R_1 = 68\,\mathrm{k\Omega}$ (top), $R_2 = 22\,\mathrm{k\Omega}$, $R_E = 1.5\,\mathrm{k\Omega}$ and $R_C = 3.3\,\mathrm{k\Omega}$. Find $I_C$ in amperes and $V_{CE}$.
::: solution
$V_{BB} = 12\times22/90 = 2.933\,\mathrm{V}$, $R_B = 68\parallel22 = 16.62\,\mathrm{k\Omega}$. By [[#eq-ie-bias]], $I_E = (2.933 - 0.7)/(1500 + 16\,620/101) = 2.233/1664.6 = 1.342\,\mathrm{mA}$ and $I_C = 1.328\,\mathrm{mA}$. Then $V_{CE} = 12 - 1.328\times3.3 - 1.342\times1.5 = 12 - 4.38 - 2.01 = 5.60\,\mathrm{V}$: active.
:::
:::

::: exercise A pnp current source {level=2 check="0.0009"}
A pnp transistor has its base held at $2.5\,\mathrm{V}$ by a stiff divider and its emitter connected to $5\,\mathrm{V}$ through $2\,\mathrm{k\Omega}$. Find the emitter current, in amperes, and explain why the collector current hardly depends on the collector load, as long as the transistor stays active.
::: solution
$V_E = 2.5 + 0.7 = 3.2\,\mathrm{V}$, $I_E = (5 - 3.2)/2000 = 0.9\,\mathrm{mA}$. This current is fixed by the base voltage and $R_E$ alone; the collector delivers $\alpha I_E$ into any load that leaves $V_{EC} \ge 0.2\,\mathrm{V}$, so the transistor acts as a current source of about $0.89\,\mathrm{mA}$ — a simple version of the sources in [[electronics-1/current-mirrors]].
:::
:::

::: exercise A high-gain CE stage {level=2 check="-0.5e-3/0.026*1e4"}
A CE stage is biased at $I_C = 0.5\,\mathrm{mA}$ with $R_C = 10\,\mathrm{k\Omega}$ and $V_{CC} = 9\,\mathrm{V}$. Find the small-signal gain $A_v$ (V/V, with sign).
::: solution
$g_m = 0.5/26 = 19.2\,\mathrm{mS}$ and $A_v = -g_mR_C = -192$. Check with [[#eq-ce-gain]]: the drop across $R_C$ is $5\,\mathrm{V}$, and $-5/0.026 = -192$. $V_{CE} = 4\,\mathrm{V}$, so the transistor is active.
:::
:::

::: exercise Collector-to-base feedback bias {level=3 check="0.0016344*100/101"}
A transistor has $R_C = 4.7\,\mathrm{k\Omega}$ from $V_{CC} = 10\,\mathrm{V}$ to the collector, a resistor $R_B = 100\,\mathrm{k\Omega}$ from collector to base, and its emitter grounded. Show that $I_E = (V_{CC} - V_{BE})/(R_C + R_B/(\beta + 1))$, find $I_C$ in amperes for $\beta = 100$, and compare with $\beta = 200$. Can the transistor saturate?
::: hint
The current in $R_C$ is $I_C + I_B = I_E$.
:::
::: solution
KVL from $V_{CC}$ through $R_C$, $R_B$ and the EBJ: $V_{CC} = I_ER_C + I_BR_B + V_{BE}$, and with $I_B = I_E/(\beta+1)$ the formula follows. For $\beta = 100$: $I_E = 9.3/(4700 + 990) = 1.634\,\mathrm{mA}$, $I_C = 1.618\,\mathrm{mA}$, $V_{CE} = 10 - 4.7\times1.634 = 2.32\,\mathrm{V}$. For $\beta = 200$: $I_E = 9.3/(4700 + 498) = 1.789\,\mathrm{mA}$, $V_{CE} = 1.59\,\mathrm{V}$. Doubling $\beta$ raises the current by under $10\,\%$. The transistor cannot saturate: $V_{CB} = I_BR_B > 0$, so the collector is always above the base and the CBJ is reverse biased.
:::
:::

::: exercise Designing an LED driver {level=3 check="140"}
An LED needing $20\,\mathrm{mA}$ at a forward drop of $2.0\,\mathrm{V}$ is switched from a $5\,\mathrm{V}$ supply by an npn transistor (collector to LED and series resistor $R_C$, emitter grounded), driven from a $5\,\mathrm{V}$ logic output through $R_B$. With $\beta_{\min} = 50$ and an overdrive factor of $3$, find $R_C$ in ohms, choose $R_B$, and find the transistor's dissipation when on.
::: solution
In saturation $R_C = (5 - 2.0 - 0.2)/0.020 = 140\,\Omega$ (use $150\,\Omega$, giving $18.7\,\mathrm{mA}$). The base current needed is $3\times20/50 = 1.2\,\mathrm{mA}$, so $R_B = (5 - 0.7)/1.2\,\mathrm{mA} = 3.58\,\mathrm{k\Omega}$; choose $3.3\,\mathrm{k\Omega}$ ($1.30\,\mathrm{mA}$). The transistor dissipates about $V_{CE,\text{sat}}I_C + V_{BE}I_B = 0.2\times0.020 + 0.7\times0.0013 = 4.9\,\mathrm{mW}$ — tiny, which is the point of using it as a saturated switch.
:::
:::

::: exercise Stability factor {level=3}
For the bias of [[#eq-ie-bias]], show that the collector current changes by less than a fraction $\varepsilon$ when $\beta$ ranges from $\beta_1$ to $\beta_2 \gg \beta_1$ provided approximately $R_B \le \varepsilon(\beta_1 + 1)R_E$. Check the design of [[#ex-bjt-bias-design]] against this rule with $\varepsilon = 0.05$.
::: solution
Since $I_C = \alpha I_E$ and $\alpha$ changes by less than $1\,\%$ for $\beta \ge 100$, the variation is dominated by $I_E$. Its largest value, for $\beta \to \infty$, is $(V_{BB} - V_{BE})/R_E$, and at $\beta_1$ it is smaller by the factor $R_E/(R_E + R_B/(\beta_1+1))$. The fractional change is therefore at most

$$
1 - \frac{R_E}{R_E + R_B/(\beta_1 + 1)} = \frac{R_B/(\beta_1 + 1)}{R_E + R_B/(\beta_1 + 1)} \le \frac{R_B}{(\beta_1+1)R_E},
$$

which is below $\varepsilon$ if $R_B \le \varepsilon(\beta_1 + 1)R_E$. In [[#ex-bjt-bias-design]], $\varepsilon(\beta_1 + 1)R_E = 0.05\times101\times3.9\,\mathrm{k\Omega} = 19.7\,\mathrm{k\Omega}$, while $R_B = 28.9\,\mathrm{k\Omega}$; the bound allows a change of $I_E$ of up to $28.9/(101\times3.9) = 7.3\,\%$ between $\beta = 100$ and $\beta \to \infty$, and indeed $I_E = 0.937$ and $1.006\,\mathrm{mA}$ differ by $6.8\,\%$ (the change of $\alpha$ from $0.990$ to $1$ adds another $1\,\%$ to $I_C$). Between $\beta = 100$ and $300$ the change in $I_C$ is only $5.2\,\%$, that is $\pm2.6\,\%$. For $\varepsilon = 0.05$ over the whole range one would choose $R_1 \approx 51\,\mathrm{k\Omega}$ and $R_2 \approx 33\,\mathrm{k\Omega}$ ($R_B = 20\,\mathrm{k\Omega}$).
:::
:::
