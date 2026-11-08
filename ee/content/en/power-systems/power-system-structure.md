At this moment several thousand generators across a continent are turning in exact synchronism, pushing energy through hundreds of thousands of kilometres of line into transformers, substations and, finally, into the sockets of homes and factories. Nothing is stored along the way in any significant quantity: every watt consumed is generated, within a fraction of a second, somewhere else. The **electric power system** that achieves this is often called the largest machine ever built, and analysing it is the subject of this course.

This first chapter describes how a power system is organised, why it is built that way, and the two tools that every later chapter relies on. The first is the **one-line diagram**, a compact drawing of a balanced three-phase network. The second is the **per-unit system**, which expresses voltages, currents, powers and impedances as fractions of chosen base values, so that a network with five voltage levels becomes one circuit whose numbers all lie near $1$. We will see why transmission voltages are so high, set up per-unit bases for a multi-voltage network, change the base of a machine's data, and build an impedance diagram from nameplate data. The three-phase circuits of [[circuits-2/three-phase-circuits]] and the transformer models of [[electric-machines/transformers]] are assumed.

## The structure of a power system

A conventional power system has four parts, joined by transformers.

**Generation.** Most energy is still produced by **synchronous generators** ([[electric-machines/synchronous-machines]]) driven by steam, gas or water turbines. Their terminal voltages are moderate, typically $11$ to $25\,\mathrm{kV}$, because the insulation of a rotating machine's winding cannot economically be made for more. A **generator step-up transformer** immediately raises the voltage to the transmission level. Wind turbines and solar plants, which connect through power-electronic converters ([[power-electronics]]), now provide a large and growing share; they behave quite differently from synchronous machines, a theme of the final chapter, [[power-systems/protection-smart-grid]].

**Transmission.** A meshed network of overhead lines and some cables at $110$ to $765\,\mathrm{kV}$ AC (common nominal values are $132$, $220$, $275$, $400\,\mathrm{kV}$ in Europe and $115$, $138$, $230$, $345$, $500$, $765\,\mathrm{kV}$ in North America) links the large plants with each other and with the main load centres. The mesh gives redundancy: losing any single line should not interrupt supply. Very long or undersea links use **high-voltage direct current** (HVDC), at up to about $\pm 1100\,\mathrm{kV}$.

**Subtransmission and distribution.** At **substations**, transformers step the voltage down to subtransmission ($33$ to $132\,\mathrm{kV}$) and then to primary distribution ($4$ to $33\,\mathrm{kV}$; $11\,\mathrm{kV}$ and $20\,\mathrm{kV}$ in Europe, $12.47\,\mathrm{kV}$ and $13.8\,\mathrm{kV}$ in the US). Distribution networks are usually operated **radially**, as trees fed from one substation, which makes protection simple. Final distribution transformers supply low voltage: $400/230\,\mathrm V$ three-phase four-wire in Europe and much of the world, $120/240\,\mathrm V$ single-phase three-wire in North America.

**Loads.** Motors, heating, lighting, electronics and electric vehicles. A large system's demand varies with the time of day, the weather and the season: the **load curve** of a typical day has a minimum at night and one or two peaks, and the ratio of average to peak demand is the **load factor**.

::: definition Balanced three-phase system and per-phase equivalent {#def-balanced}
A three-phase network is **balanced** if its sources are equal in magnitude and displaced by $120^\circ$, and every component (generator, transformer, line, load) has identical impedances in the three phases. A balanced network can be analysed by its **per-phase equivalent**: one phase of the equivalent star (wye) network, with all neutrals joined by a zero-impedance conductor. Delta-connected elements are replaced by their star equivalents ($Z_Y = Z_\Delta/3$). Phase voltages are $1/\sqrt3$ of line voltages, and three-phase power is three times the per-phase power:
$$
\mathbf S_{3\phi} = 3\mathbf V_{\text{ph}}\mathbf I_L^* = \sqrt3\,V_{LL}I_L\angle\theta,
$$ {#eq-s3}
where $\theta$ is the angle by which the phase voltage leads the line current.
:::

Most of this course, with the important exception of unbalanced faults in [[power-systems/unsymmetrical-faults]], concerns balanced operation, and the per-phase equivalent is what we draw and calculate.

### Why transmission voltages are high

The decisive reason for high voltage is the loss in the conductors.

::: theorem Transmission loss and voltage {#thm-loss-voltage}
A three-phase line of resistance $R$ per phase delivers real power $P$ at line voltage $V_{LL}$ and power factor $\cos\theta$. The total $I^2R$ loss is
$$
P_{\text{loss}} = \frac{P^2R}{V_{LL}^2\cos^2\theta},\qquad \frac{P_{\text{loss}}}{P} = \frac{PR}{V_{LL}^2\cos^2\theta}.
$$ {#eq-loss}
For given power, distance and conductor, the fractional loss falls as the **square** of the voltage, and it grows as the power factor falls.
:::

::: proof
From [[#eq-s3]], $P = \sqrt3 V_{LL}I_L\cos\theta$, so $I_L = P/(\sqrt3 V_{LL}\cos\theta)$. The loss in three conductors is $3I_L^2R = 3R\,P^2/(3V_{LL}^2\cos^2\theta)$, which is [[#eq-loss]]. Dividing by $P$ gives the fraction.
:::

Doubling the voltage cuts the loss by four, or allows the same loss with a quarter of the conductor cross-section. The limits are set by insulation (longer insulator strings, wider tower spacing), by **corona** discharge on the conductor surface at high field strength, and by the cost of substation equipment; these balance at higher voltage the more power is transmitted and the further it goes. A rough rule is that the economic line voltage in kilovolts is of the same order as the length in kilometres for bulk transfers, although surge-impedance loading, studied in [[power-systems/line-models]], is the more precise guide.

::: widget plot
f: 100*P*R/(x^2*pf^2)
x: 100, 800
y: 0, 15
sliders: P=300:50:2000:10; R=12:1:40:0.5; pf=0.95:0.7:1:0.01
labels: \text{loss } P_{\text{loss}}/P\ (\%)
hlines: 3
caption: Loss as a percentage of transmitted power against line voltage $V$ in kV, for real power $P$ in MW, resistance $R$ per phase in ohms and power factor $\mathrm{pf}$. With $P=300\,\mathrm{MW}$ and $R = 12\,\Omega$ (about $200\,\mathrm{km}$ of a typical conductor) the loss crosses the $3\,\%$ line near $365\,\mathrm{kV}$. Double $P$: the voltage needed for the same fractional loss rises by $\sqrt2$. Lower the power factor and watch the whole curve rise.
:::

::: example Choosing a transmission voltage {#ex-choose-voltage}
A plant must send $300\,\mathrm{MW}$ at power factor $0.95$ over a single-circuit line $200\,\mathrm{km}$ long. The chosen conductor has a resistance of $0.060\,\Omega/\mathrm{km}$ per phase at operating temperature. The $I^2R$ loss must not exceed $3\,\%$ of the power transmitted. Which of the standard voltages $220$, $345$, $400$ and $500\,\mathrm{kV}$ is the lowest acceptable?
::: solution
The resistance per phase is $R = 0.060\times200 = 12\,\Omega$. From [[#eq-loss]] the loss fraction is at most $0.03$ if
$$
V_{LL} \ge \sqrt{\frac{PR}{0.03\cos^2\theta}} = \sqrt{\frac{300\times10^6\times12}{0.03\times0.95^2}} = 365\,\mathrm{kV}.
$$
Checking the candidates: at $220\,\mathrm{kV}$ the loss is $300\times10^6\times12/(220\,000^2\times0.9025) = 8.2\,\%$; at $345\,\mathrm{kV}$ it is $3.35\,\%$, just too much; at $400\,\mathrm{kV}$ it is $2.49\,\%$; at $500\,\mathrm{kV}$ it is $1.60\,\%$. The lowest acceptable standard voltage is $400\,\mathrm{kV}$, with a current of $300\times10^6/(\sqrt3\times400\,000\times0.95) = 456\,\mathrm A$ per phase. In North America, where $400\,\mathrm{kV}$ is not standard, one would choose $500\,\mathrm{kV}$ or a larger conductor at $345\,\mathrm{kV}$ (the required $R$ would be $12\times3/3.35 = 10.7\,\Omega$, so a conductor of at most $0.054\,\Omega/\mathrm{km}$).
:::
:::

## One-line diagrams

Drawing three conductors and a neutral for every element of a large network would be unreadable. Because the network is balanced, one drawing of a single phase suffices, and the convention is to draw only a single line for each three-phase circuit, the **one-line** (single-line) diagram. Standard symbols are a circle for a rotating machine (with the letter G or M), two interlocking circles or coils for a transformer, a short heavy bar for a **bus** (a node at which elements are connected), a small square for a circuit breaker, and an arrow for a load. Beside each symbol go the data needed for calculation: ratings in MVA, voltages in kV, reactances in per unit on the element's own rating, winding connections (Y, Δ, grounded Y with the grounding impedance), and line impedances in ohms.

What the one-line diagram omits matters as much as what it shows. It does not show the neutral, so it says nothing about grounding unless that is written in; it does not show phase shifts of star–delta transformers ($30^\circ$ in balanced operation), which are usually ignored in balanced calculations because they shift every voltage and current on one side by the same angle; and it does not show the protection and control equipment unless drawn specifically. When these details matter, as in fault calculations, they are added to the diagram.

From the one-line diagram an engineer draws the **impedance diagram**, the per-phase equivalent circuit with each element replaced by its model: a generator by an emf behind a reactance, a transformer by its series leakage impedance (the magnetising branch is usually neglected in system studies, since the magnetising current is around $1\,\%$ of rated current), a line by a series impedance with or without shunt capacitance, and a load by an impedance or a specified power. The impedances come from different voltage levels and so must be referred through the transformers to a common level, and this is precisely what the per-unit system automates.

## The per-unit system

Per-unit quantities were introduced for a single transformer in [[electric-machines/transformers]]. In a power system the idea is applied to a whole network.

::: definition Per-unit quantities and base values {#def-pu}
A **per-unit** value is an actual value divided by a chosen **base** value of the same dimension:
$$
\text{quantity in pu} = \frac{\text{actual quantity}}{\text{base value of quantity}}.
$$
For three-phase systems one chooses a single **three-phase base power** $S_b$ (MVA) for the whole network and a **line-to-line base voltage** $V_b$ (kV) in each voltage zone. Base current and impedance in that zone are then
$$
I_b = \frac{S_b}{\sqrt3\,V_b},\qquad Z_b = \frac{(V_b/\sqrt3)^2}{S_b/3} = \frac{V_b^2}{S_b},
$$ {#eq-base}
so that, with $V_b$ in kV and $S_b$ in MVA, $Z_b = V_b^2/S_b$ in ohms and $I_b = 1000\,S_b/(\sqrt3V_b)$ in amperes. Real power, reactive power and apparent power all use the base $S_b$; resistance, reactance and impedance all use $Z_b$; admittances use $Y_b = 1/Z_b$.
:::

Two bases are free (power and voltage); the other two (current and impedance) follow from them by the circuit laws, which is why per-unit quantities obey the same equations as actual ones: $\mathbf V = Z\mathbf I$ in ohms, volts and amperes becomes $\mathbf V_{\text{pu}} = Z_{\text{pu}}\mathbf I_{\text{pu}}$. Angles are unaffected, since base values are real.

::: theorem Per-unit three-phase quantities equal per-unit per-phase quantities {#thm-pu-three-phase}
With the three-phase base $S_b$ and line-to-line base $V_b$, and the per-phase bases $S_b/3$ and $V_b/\sqrt3$, the per-unit value of a line-to-line voltage of a balanced system equals the per-unit value of the corresponding phase voltage, and the per-unit three-phase power equals the per-unit per-phase power. In per unit, therefore, $\mathbf S = \mathbf V\mathbf I^*$ with no factor $3$ or $\sqrt3$.
:::

::: proof
In a balanced system $V_{LL} = \sqrt3 V_{\text{ph}}$, so $V_{LL}/V_b = \sqrt3V_{\text{ph}}/V_b = V_{\text{ph}}/(V_b/\sqrt3)$. Similarly $S_{3\phi}/S_b = 3S_{1\phi}/S_b = S_{1\phi}/(S_b/3)$. Finally, from [[#eq-s3]] and [[#eq-base]],
$$
\frac{\mathbf S_{3\phi}}{S_b} = \frac{3\mathbf V_{\text{ph}}\mathbf I^*}{\sqrt3V_b\,I_b} = \frac{\mathbf V_{\text{ph}}}{V_b/\sqrt3}\cdot\frac{\mathbf I^*}{I_b} = \mathbf V_{\text{pu}}\mathbf I_{\text{pu}}^*.
$$
:::

This is one of the great conveniences of the method: the factors of $\sqrt3$ and $3$, the most frequent source of errors in three-phase calculations, disappear entirely and reappear only when we convert back.

::: warning Which base goes with which formula
$Z_b = V_b^2/S_b$ is correct only if $V_b$ is the **line-to-line** voltage and $S_b$ the **three-phase** power, or if $V_b$ is the phase voltage and $S_b$ the per-phase power. Mixing a line-to-line voltage with a single-phase power gives a base impedance three times too large. Likewise $I_b = S_b/(\sqrt3 V_b)$ needs the three-phase power and line voltage. A good habit is to write "MVA$_{3\phi}$" and "kV$_{LL}$" next to every base.
:::

### Changing the base

Manufacturers give machine and transformer impedances in per unit (or percent) **on their own rating**. To combine them in one network, all must be converted to the common system base.

::: theorem Change of base {#thm-change-base}
An impedance given as $Z_{\text{pu,old}}$ on base power $S_{b,\text{old}}$ and base voltage $V_{b,\text{old}}$ has, on new bases $S_{b,\text{new}}$ and $V_{b,\text{new}}$, the per-unit value
$$
Z_{\text{pu,new}} = Z_{\text{pu,old}}\left(\frac{V_{b,\text{old}}}{V_{b,\text{new}}}\right)^2\frac{S_{b,\text{new}}}{S_{b,\text{old}}}.
$$ {#eq-change-base}
:::

::: proof
The ohmic value is fixed: $Z_\Omega = Z_{\text{pu,old}}\,V_{b,\text{old}}^2/S_{b,\text{old}} = Z_{\text{pu,new}}\,V_{b,\text{new}}^2/S_{b,\text{new}}$. Solving for $Z_{\text{pu,new}}$ gives [[#eq-change-base]].
:::

The voltage factor is $1$ when the element's rated voltage equals the zone's base voltage, which is the usual choice, so most conversions simply scale by the ratio of powers: an impedance of $0.2\,\mathrm{pu}$ on a $50\,\mathrm{MVA}$ rating is $0.4\,\mathrm{pu}$ on $100\,\mathrm{MVA}$. A large machine's per-unit impedance on its own base, by contrast, hardly depends on its size, which makes per-unit data easy to sanity-check: transformer leakage reactances are $0.04$ to $0.15\,\mathrm{pu}$, generator synchronous reactances $1$ to $2\,\mathrm{pu}$, subtransient reactances $0.1$ to $0.3\,\mathrm{pu}$.

::: quiz
A $20\,\mathrm{MVA}$, $11\,\mathrm{kV}$ generator has a reactance of $0.25\,\mathrm{pu}$ on its rating. What is its reactance on a $100\,\mathrm{MVA}$, $11\,\mathrm{kV}$ base?
- [ ] $0.05\,\mathrm{pu}$
- [x] $1.25\,\mathrm{pu}$
- [ ] $0.25\,\mathrm{pu}$
- [ ] $6.05\,\Omega$
::: solution
By [[#eq-change-base]] with equal voltages, $X_{\text{new}} = 0.25\times100/20 = 1.25\,\mathrm{pu}$. A larger base power means a smaller base impedance ($11^2/100 = 1.21\,\Omega$ instead of $6.05\,\Omega$), so the same ohmic reactance, $1.5125\,\Omega$, is a larger number of per units.
:::
:::

### Base voltages across transformers

::: theorem Bases across a transformer {#thm-bases-transformer}
If the base voltages on the two sides of a transformer are in the ratio of its rated line-to-line voltages, $V_{b1}/V_{b2} = V_{\text{rated},1}/V_{\text{rated},2}$, and the same base power is used on both sides, then:
1. the transformer's per-unit series impedance is the same whether it is referred to side 1 or side 2;
2. the ideal transformer in its model has a per-unit ratio of $1:1$ and can be omitted from the per-unit circuit;
3. any impedance on one side has the same per-unit value when referred to the other side.
:::

::: proof
Let $a = V_{\text{rated},1}/V_{\text{rated},2} = V_{b1}/V_{b2}$ (for a star–delta unit $a$ is the ratio of line voltages, and the $30^\circ$ phase shift is set aside). An impedance $Z_2$ in ohms on side 2 is $a^2Z_2$ when referred to side 1. Its per-unit values are $Z_2/Z_{b2}$ and $a^2Z_2/Z_{b1}$, and since $Z_{b1} = V_{b1}^2/S_b = a^2V_{b2}^2/S_b = a^2Z_{b2}$, they are equal. This proves 1 and 3. For 2, the ideal transformer relates $\mathbf V_1 = a\mathbf V_2$ and $\mathbf I_1 = \mathbf I_2/a$; dividing by $V_{b1} = aV_{b2}$ and $I_{b1} = I_{b2}/a$ gives $\mathbf V_{1,\text{pu}} = \mathbf V_{2,\text{pu}}$ and $\mathbf I_{1,\text{pu}} = \mathbf I_{2,\text{pu}}$.
:::

Hence the procedure: choose the base in one zone, then carry it through every transformer **by its rated voltage ratio**, zone by zone. If a transformer's rated voltages do not match the zone bases (as happens when two transformers in a loop have slightly different ratios, or when a transformer is on an off-nominal tap), its impedance is converted with [[#eq-change-base]] and a residual **off-nominal ratio** remains; it is modelled as an ideal transformer of ratio close to $1$ and treated in [[power-systems/power-flow]].

::: algorithm Building a per-unit impedance diagram {#alg-impedance-diagram}
1. Choose a system base power $S_b$ (often $100\,\mathrm{MVA}$) for the whole network.
2. Choose a base voltage in one zone, usually the rated voltage of a large generator or of the main transmission system.
3. Propagate base voltages to every other zone through each transformer in the ratio of its rated line-to-line voltages.
4. Compute $Z_b = V_b^2/S_b$ and $I_b = S_b/(\sqrt3V_b)$ in each zone.
5. Convert machine and transformer impedances to the system base with [[#eq-change-base]], using the base voltage of the zone where the rated voltage applies.
6. Convert line impedances in ohms by dividing by the $Z_b$ of their zone; convert loads given as power at a voltage to per-unit power, or to per-unit impedance if they are modelled as constant impedance.
7. Draw the per-phase circuit with per-unit values, solve it, and convert results back to amperes, kilovolts and megawatts with the zone bases.
:::

::: example A three-zone impedance diagram {#ex-three-zone}
A $50\,\mathrm{MVA}$, $13.8\,\mathrm{kV}$ generator G ($X = 0.20\,\mathrm{pu}$) feeds a $60\,\mathrm{MVA}$, $13.8/138\,\mathrm{kV}$ step-up transformer T1 ($X = 0.10\,\mathrm{pu}$). A line of impedance $10 + j50\,\Omega$ per phase leads to a $40\,\mathrm{MVA}$, $132/13.2\,\mathrm{kV}$ step-down transformer T2 ($X = 0.08\,\mathrm{pu}$), which supplies a load that absorbs $30\,\mathrm{MW}$ at $0.8$ power factor lagging when its voltage is $13.2\,\mathrm{kV}$; model the load as a constant impedance. Draw the impedance diagram on a $100\,\mathrm{MVA}$ base with $13.8\,\mathrm{kV}$ in the generator zone. If the generator terminal voltage is held at $13.8\,\mathrm{kV}$, find the load voltage, the line current and the real power delivered to the load.
::: solution
*Bases.* Generator zone: $13.8\,\mathrm{kV}$. Through T1 ($13.8/138$): line zone $138\,\mathrm{kV}$, $Z_b = 138^2/100 = 190.44\,\Omega$. Through T2 ($132/13.2$): load zone $138\times13.2/132 = 13.8\,\mathrm{kV}$, $Z_b = 13.8^2/100 = 1.9044\,\Omega$.

*Elements.* Generator: $0.20\times100/50 = 0.400\,\mathrm{pu}$. T1 (rated voltages equal the bases): $0.10\times100/60 = 0.1667\,\mathrm{pu}$. Line: $(10 + j50)/190.44 = 0.0525 + j0.2625\,\mathrm{pu}$. T2's reactance is given on $132\,\mathrm{kV}$ but the base on that side is $138\,\mathrm{kV}$, so by [[#eq-change-base]] $X = 0.08\times(132/138)^2\times100/40 = 0.1830\,\mathrm{pu}$. Load: at $13.2\,\mathrm{kV}$ it absorbs $S = 30/0.8 = 37.5\,\mathrm{MVA}$ at $36.87^\circ$, so $Z = V^2/\mathbf S^* = 13.2^2/37.5\,\angle 36.87^\circ = 4.646\angle36.87^\circ\,\Omega$ per phase (star equivalent), and $Z_{\text{pu}} = 4.646/1.9044 = 2.440\angle 36.87^\circ = 1.952 + j1.464\,\mathrm{pu}$.

*Solution.* With the generator terminal at $1\angle0^\circ\,\mathrm{pu}$, the series impedance to the load is
$$
Z = j0.1667 + 0.0525 + j0.2625 + j0.1830 + 1.952 + j1.464 = 2.004 + j2.076\,\mathrm{pu},
$$
so $\mathbf I = 1/Z = 0.3465\angle -46.0^\circ\,\mathrm{pu}$ and the load voltage is $\mathbf V_L = Z_{\text{load}}\mathbf I = 0.8455\angle -9.14^\circ\,\mathrm{pu}$. In physical units: $V_L = 0.8455\times13.8 = 11.67\,\mathrm{kV}$; the line current is $0.3465\times I_b$, with $I_b = 100\times10^6/(\sqrt3\times138\times10^3) = 418.4\,\mathrm A$, so $145\,\mathrm A$ (and $1450\,\mathrm A$ on the load side, where $I_b = 4184\,\mathrm A$). The load power is $\operatorname{Re}(\mathbf V_L\mathbf I^*) = 0.2344\,\mathrm{pu} = 23.4\,\mathrm{MW}$.

*Comment.* The load voltage has fallen to $85\,\%$ and, being a constant impedance, the load draws only $23.4\,\mathrm{MW}$ instead of $30\,\mathrm{MW}$. The series reactance of $0.61\,\mathrm{pu}$ is far too much for this load; the voltage would in practice be held up by transformer taps or by reactive compensation at the load. The generator itself must supply $24.1\,\mathrm{MW}$ and $24.9\,\mathrm{Mvar}$: the line and transformers consume $0.63\,\mathrm{MW}$ but $7.4\,\mathrm{Mvar}$. Reactive "losses" in reactances are typically far larger than real losses, which is why reactive power cannot be transported far.
:::
:::

::: example Per-unit current and power {#ex-pu-current}
On a $100\,\mathrm{MVA}$ base, a $230\,\mathrm{kV}$ bus has voltage $1.02\angle -5^\circ\,\mathrm{pu}$ and a line leaving it carries $\mathbf I = 0.8\angle -25^\circ\,\mathrm{pu}$. Find the actual line-to-line voltage, line current and three-phase complex power.
::: solution
$I_b = 100\times10^6/(\sqrt3\times230\times10^3) = 251.0\,\mathrm A$. Voltage: $1.02\times230 = 234.6\,\mathrm{kV}$ (line to line). Current: $0.8\times251.0 = 200.8\,\mathrm A$. By [[#thm-pu-three-phase]], $\mathbf S = \mathbf V\mathbf I^* = 1.02\angle-5^\circ\times0.8\angle 25^\circ = 0.816\angle20^\circ = 0.7668 + j0.2791\,\mathrm{pu}$, that is $76.7\,\mathrm{MW}$ and $27.9\,\mathrm{Mvar}$. Check in physical units: $\sqrt3\times234.6\times10^3\times200.8 = 81.6\,\mathrm{MVA}$, the same as $0.816\times100$.
:::
:::

::: example Converting a delta load {#ex-delta-load}
A balanced delta-connected load of $45 + j30\,\Omega$ per phase is supplied at $11\,\mathrm{kV}$. On a $10\,\mathrm{MVA}$, $11\,\mathrm{kV}$ base, find its per-unit impedance and the complex power it absorbs at rated voltage.
::: solution
The star equivalent is $Z_Y = (45 + j30)/3 = 15 + j10\,\Omega$. With $Z_b = 11^2/10 = 12.1\,\Omega$, $Z_{\text{pu}} = 1.240 + j0.826\,\mathrm{pu} = 1.490\angle 33.7^\circ$. At $V = 1\,\mathrm{pu}$, $\mathbf S = V^2/Z^* = 1/(1.240 - j0.826) = 0.558 + j0.372\,\mathrm{pu}$, i.e. $5.58\,\mathrm{MW}$ and $3.72\,\mathrm{Mvar}$. Check: each delta branch sees $11\,\mathrm{kV}$, so $3\times11\,000^2/(45 - j30)$ conjugated gives $3\times121\times10^6\times(45 + j30)/(45^2 + 30^2) = 5.58 + j3.72\,\mathrm{MVA}$.
:::
:::

## Voltage drop on a radial feeder

The per-unit system also makes simple estimates quick. Consider a load $\mathbf S = P + jQ$ at the end of a feeder of impedance $R + jX$, fed from a bus at fixed voltage $V_s$. With the receiving-end voltage $V_r\angle 0$ as reference, the current is $\mathbf I = (P - jQ)/V_r$, and
$$
\mathbf V_s = V_r + (R + jX)\frac{P - jQ}{V_r} = V_r + \frac{PR + QX}{V_r} + j\,\frac{PX - QR}{V_r}.
$$ {#eq-feeder}
The in-phase part gives the familiar approximation of the voltage drop,
$$
\Delta V \approx \frac{PR + QX}{V},
$$ {#eq-drop}
and the quadrature part sets the angle between the ends. On transmission lines $X\gg R$, so the drop is governed by **reactive** power and the angle by **real** power: this decoupling, which we shall meet again in [[power-systems/power-flow]] and [[power-systems/economic-dispatch-control]], is the reason that voltage is controlled by reactive power and frequency by real power.

Squaring the magnitude of [[#eq-feeder]] with $V_s$ fixed gives a quadratic in $V_r^2$:
$$
V_r^4 + \bigl[2(PR + QX) - V_s^2\bigr]V_r^2 + (P^2 + Q^2)(R^2 + X^2) = 0.
$$
Its larger root is the normal operating voltage; the two roots merge at the **maximum loadability** of the feeder, beyond which no solution exists. The curve of $V_r$ against $P$ is the **nose curve** of voltage-stability analysis.

::: widget plot
f: sqrt((1 - 2*(x*R + x*tan(acos(pf))*X) + sqrt((1 - 2*(x*R + x*tan(acos(pf))*X))^2 - 4*x^2*(1 + tan(acos(pf))^2)*(R^2 + X^2)))/2); sqrt((1 - 2*(x*R + x*tan(acos(pf))*X) - sqrt((1 - 2*(x*R + x*tan(acos(pf))*X))^2 - 4*x^2*(1 + tan(acos(pf))^2)*(R^2 + X^2)))/2)
x: 0, 4
y: 0, 1.1
sliders: pf=0.9:0.6:1:0.01; R=0.02:0:0.2:0.01; X=0.2:0.05:0.5:0.01
labels: V_r\ \text{(operating)}; V_r\ \text{(low-voltage solution)}
caption: Receiving-end voltage $V_r$ (pu) of a feeder with $V_s = 1\,\mathrm{pu}$ against the real power $P$ (pu) of a load at power factor $\mathrm{pf}$ lagging. The two branches meet at the nose, the largest power the feeder can deliver. Lower the power factor: the nose moves left and down, so a lagging load both depresses the voltage and limits the transfer. Raise $X$ and see the maximum power fall roughly as $1/X$.
:::

::: quiz
On a $132\,\mathrm{kV}$ line with $X = 10R$, which load change lowers the receiving-end voltage most?
- [ ] An increase of $10\,\mathrm{MW}$ of real power
- [x] An increase of $10\,\mathrm{Mvar}$ of lagging reactive power
- [ ] Both lower it equally
- [ ] Neither changes the voltage, because the sending end is fixed
::: solution
By [[#eq-drop]], $\Delta V \approx (PR + QX)/V$. A change $\Delta P$ adds $\Delta P\,R/V$; the same change in $Q$ adds $\Delta Q\,X/V$, ten times as much. On high-voltage networks reactive power, not real power, governs the voltage magnitude.
:::
:::

## Design and practice

**Choice of base.** Any base gives the same physical answers, but a good choice saves work and catches errors. Use $100\,\mathrm{MVA}$ for transmission studies (a long-standing convention, which lets data from different studies be combined) and the rated voltages of the main zones. For a single plant or industrial network a base equal to the largest transformer rating keeps numbers near $1$.

**Sanity checks.** Bus voltages in normal operation are within about $\pm5\,\%$ of $1\,\mathrm{pu}$ (statutory limits are typically $\pm5$ to $\pm10\,\%$ in distribution). Line flows are a fraction of the line's thermal rating. A computed voltage of $0.6\,\mathrm{pu}$ or a load angle of $70^\circ$ in a normal-operation study is almost always a data or base error.

**Loads.** A load can be modelled as constant power (a regulated drive, a motor with its speed set by the mechanical load), constant current, or constant impedance (resistive heating). Real loads are mixtures, often represented by a **ZIP** model, $P = P_0\left[a_Z(V/V_0)^2 + a_I(V/V_0) + a_P\right]$ with $a_Z + a_I + a_P = 1$. [[#ex-three-zone]] shows how strongly the choice affects the answer when voltages are far from nominal.

::: application The grid in numbers
A large synchronous interconnection, such as continental Europe or the Eastern Interconnection of North America, has peak demands of several hundred gigawatts, thousands of generating units and tens of thousands of buses in its planning models. Transmission losses are typically $1$ to $3\,\%$ of energy and distribution losses another $3$ to $8\,\%$. Frequency is held within about $\pm0.05\,\mathrm{Hz}$ of nominal in normal operation; voltage profiles are kept within a few percent by tap-changing transformers, capacitor banks, reactors, static compensators and the excitation of generators.
:::

::: history
Thomas Edison's Pearl Street Station opened in Manhattan in 1882, supplying direct current at about $110\,\mathrm V$ to customers within roughly a kilometre; at that voltage the conductor losses made longer distances uneconomic. The transformer made high-voltage AC transmission practical: Lucien Gaulard and John Dixon Gibbs demonstrated a transformer system in the early 1880s, and in 1885 Károly Zipernowsky, Ottó Bláthy and Miksa Déri of Ganz in Budapest developed closed-core transformers for parallel distribution. William Stanley built an AC lighting system for George Westinghouse at Great Barrington, Massachusetts, in 1886. In 1891 power was transmitted $175\,\mathrm{km}$ from Lauffen am Neckar to the Frankfurt exhibition by three-phase AC, with equipment from AEG and Oerlikon designed by Mikhail Dolivo-Dobrovolsky and Charles Brown. The Niagara Falls plant began supplying Buffalo in 1896, and from then on AC was the standard for generation and transmission. The per-unit method grew up in the following decades with the analogue network analysers used to study large systems, and remained the standard when digital computers took over.
:::

## Where this leads

The next two chapters compute the impedances that the one-line diagram needs for transmission lines: [[power-systems/line-parameters]] derives resistance, inductance and capacitance per kilometre from the conductor geometry, and [[power-systems/line-models]] turns them into equivalent circuits valid for any length. With those models the per-unit impedance diagram becomes the network that [[power-systems/power-flow]] solves for bus voltages and flows, and that [[power-systems/symmetrical-faults]] solves for fault currents. The decoupling of real power and angle from reactive power and voltage, visible already in [[#eq-drop]], runs through the whole course.

::: summary
- A power system consists of generation ($11$–$25\,\mathrm{kV}$), meshed transmission ($110$–$765\,\mathrm{kV}$ AC, or HVDC), subtransmission, radial distribution and loads, joined by transformers.
- Line loss as a fraction of power is $PR/(V_{LL}^2\cos^2\theta)$: it falls with the square of the voltage, which is why bulk power is transmitted at high voltage.
- Balanced networks are analysed by the per-phase star equivalent and drawn as one-line diagrams.
- Per-unit values divide by bases; choose $S_b$ (three-phase MVA) once and $V_b$ (line-to-line kV) per zone; then $Z_b = V_b^2/S_b$ and $I_b = S_b/(\sqrt3V_b)$. In per unit, $\mathbf S = \mathbf V\mathbf I^*$ without factors of $3$ or $\sqrt3$.
- Change of base: $Z_{\text{new}} = Z_{\text{old}}(V_{\text{old}}/V_{\text{new}})^2(S_{\text{new}}/S_{\text{old}})$. Bases carried through transformers in their rated ratio make the ideal transformers disappear.
- On a feeder, $\Delta V\approx(PR + QX)/V$: with $X\gg R$, reactive power controls voltage and real power controls angle; a feeder has a maximum loadability at the nose of its $P$–$V$ curve.
:::

## Exercises

::: exercise Base impedance and current {level=1 check="132^2/100"}
On a $100\,\mathrm{MVA}$ base, find the base impedance in ohms of a $132\,\mathrm{kV}$ zone. What is its base current?
::: solution
$Z_b = 132^2/100 = 174.24\,\Omega$, and $I_b = 100\times10^6/(\sqrt3\times132\times10^3) = 437.4\,\mathrm A$.
:::
:::

::: exercise Change of base {level=1 check="0.12*(100/75)*(13.2/13.8)^2"}
A $75\,\mathrm{MVA}$, $13.2\,\mathrm{kV}$ generator has a subtransient reactance of $0.12\,\mathrm{pu}$. Find its reactance in per unit on a $100\,\mathrm{MVA}$, $13.8\,\mathrm{kV}$ base.
::: solution
By [[#eq-change-base]], $X = 0.12\times(13.2/13.8)^2\times100/75 = 0.12\times0.9149\times1.3333 = 0.1464\,\mathrm{pu}$.
:::
:::

::: exercise Losses at two voltages {level=1 check="(33/11)^2"}
A feeder delivers a fixed power at a fixed power factor. By what factor do its $I^2R$ losses fall if its voltage is raised from $11\,\mathrm{kV}$ to $33\,\mathrm{kV}$ with the same conductors?
::: solution
By [[#eq-loss]] the loss is proportional to $1/V^2$, so it falls by $(33/11)^2 = 9$.
:::
:::

::: exercise Line impedance in per unit {level=2 check="sqrt(8^2+40^2)/(66^2/50)"}
A $66\,\mathrm{kV}$ line has $8 + j40\,\Omega$ per phase. On a $50\,\mathrm{MVA}$ base and $66\,\mathrm{kV}$, find the per-unit magnitude of its impedance, and the per-unit voltage drop estimated by [[#eq-drop]] when it carries $20\,\mathrm{MW}$ and $10\,\mathrm{Mvar}$ at $1\,\mathrm{pu}$ voltage.
::: solution
$Z_b = 66^2/50 = 87.12\,\Omega$, so $Z = 0.0918 + j0.4591\,\mathrm{pu}$, magnitude $0.468\,\mathrm{pu}$. With $P = 0.4$, $Q = 0.2\,\mathrm{pu}$: $\Delta V \approx 0.4\times0.0918 + 0.2\times0.4591 = 0.0367 + 0.0918 = 0.129\,\mathrm{pu}$, about $13\,\%$, of which the reactive power causes more than two thirds.
:::
:::

::: exercise Propagating bases {level=2 check="230*11/220"}
A network has an $11\,\mathrm{kV}$ generator zone, an $11/230\,\mathrm{kV}$ transformer, a $230\,\mathrm{kV}$ line and a $220/11\,\mathrm{kV}$ step-down transformer. With $11\,\mathrm{kV}$ base in the generator zone, what is the base voltage, in kV, in the zone fed by the step-down transformer? Is the step-down transformer's per-unit reactance changed by the conversion?
::: solution
The line zone has base $230\,\mathrm{kV}$. Through the $220/11$ transformer the base becomes $230\times11/220 = 11.5\,\mathrm{kV}$. The transformer's reactance, given on $220\,\mathrm{kV}$ (or $11\,\mathrm{kV}$), must be multiplied by $(220/230)^2 = 0.915$ (equivalently $(11/11.5)^2$), so yes, it is reduced by $8.5\,\%$ in addition to any change of power base.
:::
:::

::: exercise A motor load in per unit {level=2 check="0.9*1000/(sqrt(3)*0.4*0.85)"}
A plant draws $0.9\,\mathrm{MW}$ at power factor $0.85$ lagging from a $400\,\mathrm V$ bus. Find the line current in amperes. On a $1\,\mathrm{MVA}$, $0.4\,\mathrm{kV}$ base, what are the per-unit current and complex power?
::: solution
$I = P/(\sqrt3V\cos\theta) = 900\,000/(\sqrt3\times400\times0.85) = 1528\,\mathrm A$. $I_b = 10^6/(\sqrt3\times400) = 1443\,\mathrm A$, so $I = 1.059\,\mathrm{pu}$. $\mathbf S = 0.9 + j0.9\tan(\arccos0.85) = 0.9 + j0.558\,\mathrm{pu}$, and indeed $\abs{\mathbf S} = 1.059 = VI$ at $V = 1\,\mathrm{pu}$.
:::
:::

::: exercise Generator emf in the three-zone system {level=2 check="1.104"}
In [[#ex-three-zone]], find the per-unit magnitude of the generator's internal emf behind its $0.4\,\mathrm{pu}$ reactance.
::: solution
$\mathbf E = 1 + j0.4\times0.3465\angle-46.0^\circ = 1 + 0.1386\angle 44.0^\circ = 1.0997 + j0.0963$, so $E = 1.104\,\mathrm{pu}$ at $5.0^\circ$ (about $15.2\,\mathrm{kV}$ line to line).
:::
:::

::: exercise Maximum power of a feeder {level=3}
Show from the quartic for $V_r$ that a lossless feeder ($R = 0$) supplying a unity-power-factor load ($Q = 0$) from $V_s = 1\,\mathrm{pu}$ can deliver at most $P_{\max} = 1/(2X)$, and find $V_r$ at that point.
::: hint
A real solution for $V_r^2$ exists only if the discriminant is non-negative.
:::
::: solution
With $R = 0$, $Q = 0$ and $V_s = 1$ the equation is $V_r^4 - V_r^2 + P^2X^2 = 0$, so $V_r^2 = \tfrac12\bigl(1\pm\sqrt{1 - 4P^2X^2}\bigr)$. Real solutions need $1 - 4P^2X^2\ge0$, i.e. $P\le1/(2X)$. At the limit the roots merge at $V_r^2 = 1/2$, $V_r = 1/\sqrt2 = 0.707\,\mathrm{pu}$. The angle across the feeder is then $45^\circ$, since $V_sV_r\sin\delta/X = P$ gives $\sin\delta = (1/(2X))X\sqrt2 = 1/\sqrt2$. A feeder of $X = 0.25\,\mathrm{pu}$ can therefore never deliver more than $2\,\mathrm{pu}$ to a resistive load, however the load is adjusted.
:::
:::

::: exercise Designing a subtransmission voltage {level=3 check="sqrt(40e6*0.12*25/(0.04*0.9^2))"}
A $40\,\mathrm{MW}$ industrial load at power factor $0.9$ is to be supplied over $25\,\mathrm{km}$ of overhead line whose conductor has $0.12\,\Omega/\mathrm{km}$ and $0.40\,\Omega/\mathrm{km}$ reactance per phase. (a) Find the minimum voltage, in volts, that keeps the $I^2R$ loss at or below $4\,\%$. (b) Choose between the standard voltages $33\,\mathrm{kV}$, $66\,\mathrm{kV}$ and $132\,\mathrm{kV}$, and estimate the voltage drop at your choice with [[#eq-drop]].
::: hint
Use [[#eq-loss]] for (a), then convert to per unit on $100\,\mathrm{MVA}$ for (b).
:::
::: solution
(a) $R = 3\,\Omega$, so $V\ge\sqrt{PR/(0.04\cos^2\theta)} = \sqrt{40\times10^6\times3/(0.04\times0.81)} = 60.9\,\mathrm{kV}$. (b) $33\,\mathrm{kV}$ fails (loss $13.6\,\%$); $66\,\mathrm{kV}$ gives $40\times10^6\times3/(66\,000^2\times0.81) = 3.40\,\%$. At $66\,\mathrm{kV}$ on $100\,\mathrm{MVA}$, $Z_b = 43.56\,\Omega$, $R = 0.0689$, $X = 10/43.56 = 0.2296\,\mathrm{pu}$; $P = 0.4$, $Q = 0.4\tan(\arccos0.9) = 0.1937\,\mathrm{pu}$; $\Delta V\approx0.4\times0.0689 + 0.1937\times0.2296 = 0.0276 + 0.0445 = 0.072\,\mathrm{pu}$. A $7\,\%$ drop is acceptable with an on-load tap changer at the plant; $66\,\mathrm{kV}$ is the economic choice, $132\,\mathrm{kV}$ being justified only if the load is expected to grow substantially.
:::
:::
