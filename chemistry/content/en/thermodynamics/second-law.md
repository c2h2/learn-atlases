The first law keeps the books, but it does not say which transactions are possible. A steam engine takes heat from a furnace, converts part of it into work, and dumps the rest into a condenser; the first law only insists that the three quantities balance. It is equally satisfied by the reverse machine — one that takes heat from the ocean, converts it wholly into work, and asks nothing else — and that machine has never been built. The ocean around a ship contains more thermal energy than the ship could ever use, yet no engine has ever run on it, because the missing permission is not about energy at all. It is about *direction*: heat flows spontaneously from hot to cold, gases mix and do not unmix, and a cyclic engine needs two reservoirs, never one. The second law is the name of that permission, and entropy is the quantity whose bookkeeping expresses it.

The first course met the second law from the chemical side — $\Delta S_\mathrm{univ} > 0$ as the criterion of spontaneity, tabulated entropies, and the Gibbs energy built on top of it ([[general-chemistry-2/entropy-free-energy|entropy and free energy]]). This chapter takes the other, deeper road: the analysis of heat engines, which forces the existence of entropy, produces the thermodynamic temperature scale, yields the Clausius inequality, and ends at Boltzmann's $S = k_\mathrm{B} \ln W$ and the third law. The heat and work bookkeeping assumed throughout is [[thermodynamics/first-law|the first law]], and the sign convention is the same: $\Delta U = q + w$ with $w$ the work done **on** the system, so an engine, which does work on the world, has $w < 0$.

## Why the first law is not enough

::: definition Heat engines, refrigerators and efficiency {#def-engine}
A **heat engine** is a device that operates in a cycle — returning repeatedly to its initial state — and delivers net work while exchanging heat with two or more reservoirs at different temperatures. For a cyclic working substance $\Delta U = 0$ over the cycle, so with our sign convention $q_\mathrm{h} + q_\mathrm{c} + w = 0$, where $q_\mathrm{h} > 0$ is the heat absorbed from the hot reservoir at temperature $T_\mathrm{h}$ and $q_\mathrm{c} < 0$ the heat rejected to the cold reservoir at $T_\mathrm{c}$. The **efficiency** is the fraction of the absorbed heat delivered as work,
$$
\eta \equiv \frac{-w}{q_\mathrm{h}} = \frac{q_\mathrm{h} + q_\mathrm{c}}{q_\mathrm{h}} = 1 + \frac{q_\mathrm{c}}{q_\mathrm{h}} .
$$
A **refrigerator** (or heat pump) is a device driven by work $w > 0$ that moves heat from cold to hot; its performance is measured by the **coefficient of performance** $\varepsilon = -q_\mathrm{c}/w$, the heat removed per unit of work spent.
:::

Two blunt impossibility statements capture everything the second law says about such machines.

::: proposition The Kelvin–Planck and Clausius statements {#prop-equivalence}
**Kelvin–Planck:** no cyclic device can absorb heat from a single reservoir and convert it entirely into work; every engine must reject some heat to a colder body, so $\eta < 1$ always.
**Clausius:** no cyclic device can transfer heat from a colder to a hotter body without compensation by work; a refrigerator with $\varepsilon = \infty$ does not exist.
The two statements are equivalent: any violation of one allows the construction of a machine that violates the other.
:::

::: proof
Suppose a *perfect* engine $P$ existed: it takes $q$ from the hot reservoir, delivers work $q$ to the surroundings, and rejects nothing (violation of Kelvin–Planck). Drive any ordinary refrigerator $R$ with that work: $R$ takes $|q_\mathrm{c}|$ from the cold reservoir and dumps $|q_\mathrm{c}| + q$ into the hot one. Couple $P$ to $R$: the work cancels; the hot reservoir gives $q$ to $P$ and receives $|q_\mathrm{c}| + q$ from $R$, so it gains $|q_\mathrm{c}|$; the cold reservoir loses $|q_\mathrm{c}|$; and no external work remains. Heat has moved from cold to hot with no other effect — a violation of Clausius.
Conversely, suppose a perfect refrigerator $D$ existed, moving $|q_\mathrm{c}|$ from cold to hot with no work (violation of Clausius). Couple it to any ordinary engine $E$ sized to reject exactly $|q_\mathrm{c}|$ to the cold reservoir: $E$ takes $q_\mathrm{h}$ from the hot reservoir and delivers work $q_\mathrm{h} - |q_\mathrm{c}| > 0$, while $D$ returns $|q_\mathrm{c}|$ to the hot reservoir. The composite device takes $q_\mathrm{h} - |q_\mathrm{c}|$ from a *single* reservoir — the hot one — and converts it wholly into work, violating Kelvin–Planck. Each impossibility implies the other, so the two statements stand or fall together.
:::

::: warning A single process can convert heat wholly into work {#warn-cycle}
The Kelvin–Planck statement forbids a *cycle* that turns heat from one reservoir entirely into work — it does not forbid a single process that does so. The reversible isothermal expansion of an ideal gas absorbs heat and converts every joule of it into work, $\Delta U = 0$ and $-w = q$; the trick is that the gas never comes back, and resetting the piston costs the work back with interest. Conversely, converting work wholly into heat is *not* forbidden in any direction: friction, Joule's paddle wheel, and a resistor in a bath all do it spontaneously. The second law is asymmetric in a way that "you cannot turn heat into work" badly misstates; what is forbidden is complete conversion *by a cyclic device exchanging heat with a single reservoir*.
:::

::: quiz
Which of the following is a correct statement of the second law?
- [x] No cyclic engine can convert heat from a single reservoir entirely into work.
- [ ] No process can convert heat entirely into work.
- [ ] The entropy of any system always increases.
- [ ] Heat can never flow from cold to hot.
::: solution
Only the first is correct as stated. A single isothermal expansion does convert heat wholly into work; the entropy of a system may decrease freely as long as the surroundings gain more (freezing water); and refrigerators move heat from cold to hot every day — at the price of work. What the second law forbids is the *uncompensated cyclic* version of each.
:::
:::

## The Carnot cycle

An engine cannot be perfect, but how imperfect must it be? In 1824 Sadi Carnot answered this with a single idealised cycle that remains the benchmark for every engine, real or imagined.

::: definition The Carnot cycle {#def-carnot}
The **Carnot cycle** of a substance is a reversible cycle made of four steps: (A→B) reversible isothermal expansion at temperature $T_\mathrm{h}$; (B→C) reversible *adiabatic* expansion, during which the temperature falls to $T_\mathrm{c}$; (C→D) reversible isothermal compression at $T_\mathrm{c}$; (D→A) reversible adiabatic compression back to $T_\mathrm{h}$. Run backwards, it is the **Carnot refrigerator**. Because every step is reversible, the cycle can be traversed in either direction and leaves no entropy anywhere.
:::

::: proposition Efficiency of the Carnot engine {#prop-carnot-eff}
For a Carnot cycle, whatever the working substance,
$$
\eta_\text{Carnot} = 1 - \frac{T_\mathrm{c}}{T_\mathrm{h}},
$$
and for one mole of an ideal gas with molar heat capacities $C_{V,\mathrm{m}}$ and $C_{p,\mathrm{m}}$, $C_{p,\mathrm{m}} - C_{V,\mathrm{m}} = R$, the four steps carry
$$
q_{AB} = RT_\mathrm{h}\ln\frac{V_\mathrm{B}}{V_\mathrm{A}}, \qquad
w_{AB} = -RT_\mathrm{h}\ln\frac{V_\mathrm{B}}{V_\mathrm{A}}, \qquad
q_{BC} = 0, \qquad
w_{BC} = C_{V,\mathrm{m}}(T_\mathrm{c} - T_\mathrm{h}),
$$
$$
q_{CD} = RT_\mathrm{c}\ln\frac{V_\mathrm{D}}{V_\mathrm{C}} = -RT_\mathrm{c}\ln\frac{V_\mathrm{B}}{V_\mathrm{A}}, \qquad
q_{DA} = 0, \qquad
w_{DA} = C_{V,\mathrm{m}}(T_\mathrm{h} - T_\mathrm{c}),
$$
with the adiabatic volume ratios fixed by $T V^{\gamma-1} = \text{constant}$, $\gamma = C_{p,\mathrm{m}}/C_{V,\mathrm{m}}$.
:::

::: proof
Take one mole of ideal gas. On the isotherm A→B the energy is unchanged (Joule's law), so $\Delta U = 0$ and $q_{AB} = -w_{AB} = RT_\mathrm{h}\ln(V_\mathrm{B}/V_\mathrm{A}) > 0$. On the adiabat B→C, $q = 0$ and $w_{BC} = \Delta U = C_{V,\mathrm{m}}(T_\mathrm{c} - T_\mathrm{h}) < 0$: the gas cools by spending its own energy on work. On the isotherm C→D, $q_{CD} = RT_\mathrm{c}\ln(V_\mathrm{D}/V_\mathrm{C})$, negative because $V_\mathrm{D} < V_\mathrm{C}$. On the adiabat D→A, $w_{DA} = C_{V,\mathrm{m}}(T_\mathrm{h} - T_\mathrm{c})$, which cancels $w_{BC}$ exactly. It remains to link the volumes. For a reversible adiabat of an ideal gas, $\mathrm{d}U = -p\,\mathrm{d}V$ gives $C_{V,\mathrm{m}}\,\mathrm{d}T = -(RT/V)\,\mathrm{d}V$, i.e. $\mathrm{d}\ln T = -(R/C_{V,\mathrm{m}})\,\mathrm{d}\ln V = -(1-\gamma)\,\mathrm{d}\ln V$, so $T V^{\gamma-1}$ is constant along each adiabat:
$$
T_\mathrm{h} V_\mathrm{B}^{\gamma-1} = T_\mathrm{c} V_\mathrm{C}^{\gamma-1}, \qquad
T_\mathrm{h} V_\mathrm{A}^{\gamma-1} = T_\mathrm{c} V_\mathrm{D}^{\gamma-1}.
$$
Dividing, $(V_\mathrm{C}/V_\mathrm{B})^{\gamma-1} = (V_\mathrm{D}/V_\mathrm{A})^{\gamma-1}$, hence $V_\mathrm{C}/V_\mathrm{B} = V_\mathrm{D}/V_\mathrm{A}$ and therefore $V_\mathrm{D}/V_\mathrm{C} = V_\mathrm{A}/V_\mathrm{B}$. The net heat absorbed is then
$$
q_\text{net} = R T_\mathrm{h}\ln\frac{V_\mathrm{B}}{V_\mathrm{A}} + R T_\mathrm{c}\ln\frac{V_\mathrm{A}}{V_\mathrm{B}} = R\left(T_\mathrm{h} - T_\mathrm{c}\right)\ln\frac{V_\mathrm{B}}{V_\mathrm{A}},
$$
and since $q_{AB} = RT_\mathrm{h}\ln(V_\mathrm{B}/V_\mathrm{A})$,
$$
\eta = \frac{q_\text{net}}{q_{AB}} = \frac{T_\mathrm{h} - T_\mathrm{c}}{T_\mathrm{h}} = 1 - \frac{T_\mathrm{c}}{T_\mathrm{h}} . \qquad \blacksquare
$$
The heat rejected obeys the elegant ratio $q_{CD}/q_{AB} = -T_\mathrm{c}/T_\mathrm{h}$: the two isotherms trade heat in proportion to their temperatures, with no reference to the gas at all — as the next result will prove.
:::

::: example A Carnot engine in numbers {#ex-carnot-numbers}
One mole of a monatomic ideal gas ($C_{V,\mathrm{m}} = \tfrac{3}{2}R = 12.47\ \mathrm{J\,K^{-1}\,mol^{-1}}$, $\gamma = 5/3$) runs a Carnot cycle between $T_\mathrm{h} = 600\ \mathrm{K}$ and $T_\mathrm{c} = 300\ \mathrm{K}$, starting at $V_\mathrm{A} = 10.0\ \mathrm{L}$ and expanding isothermally to $V_\mathrm{B} = 20.0\ \mathrm{L}$. Find the heat and work of each step and the net work per cycle.
::: solution
**A→B**, isothermal at $600\ \mathrm{K}$: $q_{AB} = 8.314 \times 600 \times \ln 2 = +3.46\ \mathrm{kJ}$, $w_{AB} = -3.46\ \mathrm{kJ}$, $\Delta U = 0$.
**B→C**, adiabatic expansion to $300\ \mathrm{K}$: $q_{BC} = 0$, $w_{BC} = 12.47 \times (300 - 600) = -3.74\ \mathrm{kJ}$. The volume ratio is $T_\mathrm{h}^{3/2}/T_\mathrm{c}^{3/2} = 2^{3/2} = 2.83$, so $V_\mathrm{C} = 20.0 \times 2.83 = 56.6\ \mathrm{L}$.
**C→D**, isothermal compression at $300\ \mathrm{K}$: $V_\mathrm{D} = V_\mathrm{A} \times 2.83 = 28.3\ \mathrm{L}$, so $V_\mathrm{D}/V_\mathrm{C} = 1/2$ and $q_{CD} = 8.314 \times 300 \times \ln\tfrac{1}{2} = -1.73\ \mathrm{kJ}$, $w_{CD} = +1.73\ \mathrm{kJ}$.
**D→A**, adiabatic compression: $q_{DA} = 0$, $w_{DA} = +3.74\ \mathrm{kJ}$.
Net work $w = -3.46 - 3.74 + 1.73 + 3.74 = -1.73\ \mathrm{kJ}$ per mole of cycle, and $\eta = 1.73/3.46 = 0.500 = 1 - 300/600$, exactly as the proposition requires. The two adiabats contribute work of equal magnitude and opposite sign — they only transfer energy between the isotherms — and the *net* work equals the area of the loop on the $p$–$V$ diagram.
:::
:::

::: example A Carnot refrigerator {#ex-carnot-fridge}
A Carnot refrigerator keeps the inside at $T_\mathrm{c} = 270\ \mathrm{K}$ while dumping heat into a kitchen at $T_\mathrm{h} = 295\ \mathrm{K}$. How much work must be supplied to remove $500\ \mathrm{J}$ of heat from the inside, and what is its coefficient of performance?
::: solution
For a reversible refrigerator the same heat–temperature ratio holds, $|q_\mathrm{c}|/|q_\mathrm{h}| = T_\mathrm{c}/T_\mathrm{h}$, so
$$
\varepsilon = \frac{|q_\mathrm{c}|}{w} = \frac{T_\mathrm{c}}{T_\mathrm{h} - T_\mathrm{c}} = \frac{270}{25} = 10.8,
\qquad
w = \frac{500\ \mathrm{J}}{10.8} = 46.3\ \mathrm{J}.
$$
The kitchen receives $546\ \mathrm{J}$. Note that $\varepsilon \gg 1$: a refrigerator is *not* limited to "less heat moved than work spent", because the work is not the source of the heat, only its pump. The same formula with $T_\mathrm{h} - T_\mathrm{c}$ in the denominator explains why a heat pump struggles in a hard winter and an air conditioner struggles in a hot attic: the performance collapses as the temperature difference grows.
:::
:::

::: widget plot
f: 1 - tc/x
x: 300, 1000
y: 0, 0.8
sliders: tc=300:240:900:10
labels: \eta
caption: The Carnot efficiency $\eta = 1 - T_\mathrm{c}/T_\mathrm{h}$ against the hot temperature $T_\mathrm{h}$ for a cold reservoir set by the slider $T_\mathrm{c}$. Every real engine — a steam turbine at $T_\mathrm{h} \approx 900\ \mathrm{K}$, a car engine near $800\ \mathrm{K}$, a nuclear plant near $600\ \mathrm{K}$ — sits *below* its own curve, and the gap is engineering, not thermodynamics. The curve explains two universal habits of power stations: build the hottest possible boiler (climb the curve), and build the coldest possible condenser (lower the slider). It also says that a power station in a cold climate is intrinsically more efficient than the same station in the tropics.
:::

## Carnot's theorem and the thermodynamic temperature scale

The formula $\eta = 1 - T_\mathrm{c}/T_\mathrm{h}$ was derived for an ideal gas, but it contains no gas constant, no heat capacity, no volume ratio. That is not an accident of the algebra.

::: theorem Carnot's theorem {#thm-carnot}
No engine operating between reservoirs at $T_\mathrm{h}$ and $T_\mathrm{c}$ can be more efficient than a reversible engine operating between the same two reservoirs. All reversible engines between the same two reservoirs have the same efficiency, whatever their working substance and construction.
:::

::: proof
Let $R$ be reversible and $I$ any engine between the same reservoirs, and suppose $\eta_I > \eta_R$. Scale the two machines (run one of them a suitable number of times per cycle of the other) so that each delivers the same work $-w$ per cycle. Then $I$ absorbs $q_\mathrm{h}^{I} = -w/\eta_I$ from the hot reservoir and rejects $q_\mathrm{c}^{I} = q_\mathrm{h}^{I} + w$, while $R$ absorbs $q_\mathrm{h}^{R} = -w/\eta_R > q_\mathrm{h}^{I}$ and rejects $q_\mathrm{c}^{R} = q_\mathrm{h}^{R} + w > q_\mathrm{c}^{I}$. Now run $R$ *backwards* as a refrigerator, driven by the work of $I$. The composite device exchanges no net work; the hot reservoir receives $q_\mathrm{h}^{R} - q_\mathrm{h}^{I} > 0$ and the cold reservoir loses $q_\mathrm{c}^{R} - q_\mathrm{c}^{I} > 0$: heat has flowed from cold to hot with no compensation, violating the Clausius statement. Hence $\eta_I \le \eta_R$. If a second reversible engine $R'$ had $\eta_{R'} \ne \eta_R$, applying the argument in both directions ($R$ driving $R'$ reversed, then $R'$ driving $R$ reversed) gives $\eta_{R'} \le \eta_R \le \eta_{R'}$, so the efficiencies are equal.
:::

::: proposition The thermodynamic temperature scale {#prop-kelvin-scale}
By Carnot's theorem the heat ratio of any reversible engine, $-q_\mathrm{c}/q_\mathrm{h}$, is a universal function $f(T_\mathrm{h}, T_\mathrm{c})$ of the two reservoir temperatures alone. Considering three reservoirs and a chain of reversible engines shows $f$ must factor, $f(T_1, T_2) = g(T_1)/g(T_2)$, for a single universal function $g$. Choosing $g(T) = T$ defines the **thermodynamic (Kelvin) temperature scale**, on which every reversible engine satisfies
$$
\frac{q_\mathrm{c}}{q_\mathrm{h}} = -\frac{T_\mathrm{c}}{T_\mathrm{h}}
\qquad\text{and hence}\qquad
\eta = 1 - \frac{T_\mathrm{c}}{T_\mathrm{h}} .
$$
One fixed point — the triple point of water at $273.16\ \mathrm{K}$ historically, the fixed kelvin since 2019 — sets the unit. On this scale the ideal-gas temperature scale of [[general-chemistry-1/gases|the gas thermometer]] agrees exactly, because the ideal-gas Carnot engine computed above already has the required form.
:::

::: proof
Take reservoirs $T_1 > T_2 > T_3$ and reversible engines $E_{12}$, $E_{23}$ arranged so that $E_{12}$ rejects to $T_2$ exactly what $E_{23}$ takes from $T_2$. The composite is a reversible engine between $T_1$ and $T_3$, so
$$
\frac{g(T_2)}{g(T_1)}\cdot\frac{g(T_3)}{g(T_2)} = \frac{q_{2}}{q_{1}}\cdot\frac{q_{3}}{q_{2}} = \frac{q_{3}}{q_{1}} = \frac{g(T_3)}{g(T_1)},
$$
which is consistent for every choice of the intermediate $T_2$ only if the ratio depends on each temperature through a single function $g$. Any monotonic redefinition of temperature rescales $g$ but cancels out of measurable efficiencies, so only the *choice* of $g$ fixes the scale; $g(T) = T$ is the choice that reproduces the ideal-gas scale and gives the cleanest formulas.
:::

This is the deepest point of the whole subject: temperature, defined without any thermometer, is *defined by the behaviour of ideal engines*. Lord Kelvin used exactly this construction in 1848 to build a scale "independent of the properties of any kind of matter", and with it the absolute zero appears as the unattainable limit $T_\mathrm{c} \rightarrow 0$ where a hypothetical engine would reject no heat at all.

::: history From Carnot to Boltzmann {#hist-second-law}
Sadi Carnot (Carnot), twenty-eight years old, published *Réflexions sur la puissance motrice du feu* in 1824, still inside the caloric theory, and established that the motive power of heat is independent of the working substance; the book sold almost nothing and was rescued from oblivion by Thomson in 1850. Rudolf Clausius (Clausius) re-read it in 1850, reconciled it with Joule's equivalence of heat and work by allowing caloric to be *created and destroyed* in transfer, and stated the second law in words. William Thomson (Lord Kelvin) built the absolute thermodynamic temperature scale in 1848 and, with James Prescott Joule, measured the cooling of gases in throttling (the Joule–Thomson effect, 1852). Clausius named the new quantity *entropy* in 1865, from the Greek word for transformation, and restated the two laws of thermodynamics as the conservation of energy and the tendency of entropy to a maximum. Ludwig Boltzmann (Boltzmann) interpreted entropy statistically in 1877, and Max Planck (Planck) fixed the constant in $S = k \ln W$ around 1900. Walther Nernst (Nernst) announced his heat theorem in 1906 from measurements of low-temperature reactions; Planck restated it as the third law, and Nernst received the 1920 Nobel Prize in Chemistry for the work.
:::

## The Clausius inequality and entropy as a state function

::: theorem The Clausius inequality {#thm-clausius}
For any cyclic process of any system exchanging heat with reservoirs at temperatures $T$,
$$
\oint \frac{\delta q}{T} \le 0,
$$
with equality if and only if the cycle is reversible. Here $T$ is the temperature of the *reservoir* at the point of contact; for a reversible cycle it is also the system temperature and the distinction vanishes.
:::

::: proof
First take a cycle that exchanges heat only with two reservoirs: it is an engine (or refrigerator, or neither) between $T_\mathrm{h}$ and $T_\mathrm{c}$, so $\eta = 1 + q_\mathrm{c}/q_\mathrm{h} \le 1 - T_\mathrm{c}/T_\mathrm{h}$ by Carnot's theorem. Rearranging (with $q_\mathrm{h} > 0$) gives $q_\mathrm{h}/T_\mathrm{h} + q_\mathrm{c}/T_\mathrm{c} \le 0$, which *is* the inequality for such a cycle. For the general case, replace each contact with a reservoir at $T_i$ by a reversible Carnot *coupler* that delivers to the system exactly the same portion $\delta q_i$ at $T_i$ but draws its energy from a single reference reservoir at $T_0$. A coupler operating in a cycle and reversibly satisfies $(-\delta q_i)/T_i + \delta q_0^{(i)}/T_0 = 0$, so it draws $\delta q_0^{(i)} = \delta q_i\, T_0/T_i$ from the reference reservoir. The composite device — system plus all couplers — now exchanges heat only with the reservoir at $T_0$, absorbing $q_0 = T_0\oint \delta q/T$ in total, and its cycle leaves it with work $w = -q_0$ done on it. A cyclic device exchanging heat with a single reservoir cannot deliver net work to the surroundings (Kelvin–Planck), so $w \ge 0$, hence $q_0 \le 0$ and $\oint \delta q/T \le 0$. If the cycle is reversible, the reversed cycle must satisfy the inequality too; the two bounds squeeze the integral to zero.
:::

::: definition Entropy as a state function {#def-entropy-state}
Because $\oint \delta q_\mathrm{rev}/T = 0$ for every reversible cycle, the integral $\int_A^B \delta q_\mathrm{rev}/T$ is the same along every reversible path: it defines a **state function**, the **entropy** $S$, with
$$
\mathrm{d}S = \frac{\delta q_\mathrm{rev}}{T}, \qquad
\Delta S = S_\mathrm{B} - S_\mathrm{A} = \int_A^B \frac{\delta q_\mathrm{rev}}{T}.
$$
For an *irreversible* process the Clausius inequality applied to the cycle "irreversible A→B, reversible B→A" gives
$$
\Delta S \ge \int_A^B \frac{\delta q}{T},
$$
with equality only for a reversible path. Entropy has the units $\mathrm{J\,K^{-1}}$ and is extensive; unlike energy, it is not conserved — its monotonic growth is what decides direction.
:::

::: proposition The principle of entropy increase {#prop-increase}
For any process, the entropy change of system plus surroundings (the universe) satisfies
$$
\Delta S_\mathrm{univ} = \Delta S + \Delta S_\mathrm{surr} \ge 0,
$$
zero for a reversible process, positive for a spontaneous one. A process with $\Delta S_\mathrm{univ} < 0$ cannot occur.
:::

::: proof
Take the system plus surroundings as an isolated composite. Any real process of the composite is adiabatic for the composite as a whole, $\delta q = 0$ across its boundary, so $\Delta S_\mathrm{univ} \ge \int \delta q/T = 0$ by the inequality of the definition. Reversibility is the case where the composite passes through equilibrium states and nothing is dissipated; then equality holds, because running the composite backwards would otherwise produce a negative total.
:::

::: warning dS = δq/T only along a reversible path {#warn-reversible-only}
The most common technical error in this chapter is writing $\Delta S = \int \delta q_\text{actual}/T$ for an irreversible process. The formula defines $S$ through *reversible* heat; for the actual, irreversible path the integral $\int \delta q/T$ is strictly *less* than $\Delta S$. To compute $\Delta S$ you must ignore the actual path and invent any reversible one between the same end states — heat reversibly, expand reversibly, carry out the phase change reversibly at a slightly different temperature if necessary — and integrate $\delta q_\mathrm{rev}/T$ along it. Entropy is a state function precisely so that this fiction is legitimate: the answer does not depend on which reversible path you invent. Free expansion makes the point in miniature: $q_\text{actual} = 0$ yet $\Delta S = nR\ln(V_\mathrm{f}/V_\mathrm{i}) > 0$, because the reversible path that connects the same states (isothermal expansion) absorbs $nRT\ln(V_\mathrm{f}/V_\mathrm{i})$.
:::

::: quiz
A system undergoes an irreversible cycle (it returns to its initial state after some spontaneous, uncontrolled steps). Which must be true?
- [x] $\displaystyle\oint \frac{\delta q}{T_\mathrm{res}} < 0$, where $T_\mathrm{res}$ is the temperature of the reservoir at each contact.
- [ ] $\displaystyle\oint \frac{\delta q}{T_\mathrm{res}} = 0$, because the system returns to its initial state.
- [ ] $\displaystyle\oint \frac{\delta q}{T_\mathrm{res}} > 0$, because entropy is produced.
- [ ] The sign depends on the working substance.
::: solution
The Clausius inequality is a statement about cycles, and it is strict for irreversible ones: $\oint \delta q/T_\mathrm{res} < 0$. The system's own entropy change over a cycle is indeed zero — it is a state function — but the *surroundings* are left worse off, and that is exactly what the strict inequality records. The equality $\oint \delta q_\mathrm{rev}/T = 0$ holds only for reversible cycles.
:::
:::

## Computing entropy changes

Everything practical in this chapter runs on one method: replace the real process by a reversible one and integrate. Three building blocks do almost all the work, and they refine the heating and transition formulas of [[general-chemistry-2/entropy-free-energy|the first course]] into a single exact statement.

::: proposition Entropy changes of ideal gases, heating and phase transitions {#prop-ds-calc}
For $n$ moles of a substance heated from $T_1$ to $T_2$ at constant pressure, $\delta q_\mathrm{rev} = n C_{p,\mathrm{m}}\,\mathrm{d}T$, so
$$
\Delta S = n\int_{T_1}^{T_2} \frac{C_{p,\mathrm{m}}}{T}\,\mathrm{d}T .
$$
For an ideal gas, combining heating with expansion along the reversible path "heat at constant volume, then expand isothermally" gives the master formula
$$
\Delta S_\mathrm{m} = C_{V,\mathrm{m}} \ln\frac{T_2}{T_1} + R\ln\frac{V_2}{V_1}
= C_{p,\mathrm{m}} \ln\frac{T_2}{T_1} - R\ln\frac{p_2}{p_1},
$$
and for a reversible phase transition at $T_\mathrm{tr}$, $\Delta_\mathrm{tr}S = \Delta_\mathrm{tr}H/T_\mathrm{tr}$. For a *reversible adiabatic* change of an ideal gas the formula gives $\Delta S = 0$: adiabats are isentropics, and $T V^{\gamma-1} = \text{constant}$ is exactly the condition $\mathrm{d}S = 0$.
:::

::: example A mixed path {#ex-mixed-path}
One mole of argon, treated as monatomic with $C_{V,\mathrm{m}} = \tfrac{3}{2}R$, goes from $300\ \mathrm{K}$, $10.0\ \mathrm{L}$ to $400\ \mathrm{K}$, $20.0\ \mathrm{L}$ by some violent, irreversible route. Find $\Delta S_\mathrm{m}$.
::: solution
The route is irrelevant; integrate along "heat at constant volume to $400\ \mathrm{K}$, then expand isothermally to $20.0\ \mathrm{L}$":
$$
\Delta S_\mathrm{m} = 12.47 \times \ln\frac{400}{300} + 8.314 \times \ln\frac{20.0}{10.0}
= 12.47 \times 0.2877 + 8.314 \times 0.6931 = 3.59 + 5.76 = 9.35\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
The expansion at constant temperature contributes more than the heating, a general rule: volume terms are logarithms multiplied by $R \approx 8.3$, while modest temperature ratios give small logarithms multiplied by $C_{V,\mathrm{m}}$.
:::
:::

::: proposition Entropy of mixing of ideal gases {#prop-mixing}
When $n_1$ moles of ideal gas 1 and $n_2$ of ideal gas 2, each at the same $T$ and $p$, are mixed isothermally and isobarically to a total $n = n_1 + n_2$ with mole fractions $x_i = n_i/n$, the entropy of the system increases by
$$
\Delta_\mathrm{mix}S = -nR\sum_i x_i \ln x_i > 0,
$$
even though there is no heat, no work and no energy change. Each gas expands isothermally from the full volume $V$ down to its share $x_i V$ — it cannot tell the difference between "the other gas is there" and "the wall has moved" — so its entropy rises by $n_i R\ln(V/n_i \cdot n/V) = -n_i R\ln x_i$.
:::

::: example Mixing two ideal gases {#ex-mixing}
$1.00\ \mathrm{mol}$ of $\mathrm{N_2}$ and $2.00\ \mathrm{mol}$ of $\mathrm{O_2}$, both at $298\ \mathrm{K}$ and $1\ \mathrm{bar}$, are mixed at constant temperature and total pressure. Find $\Delta_\mathrm{mix}S$, and the value for the same experiment with two samples of *the same* gas.
::: solution
With $x(\mathrm{N_2}) = 1/3$ and $x(\mathrm{O_2}) = 2/3$,
$$
\Delta_\mathrm{mix}S = -3 \times 8.314 \left(\tfrac{1}{3}\ln\tfrac{1}{3} + \tfrac{2}{3}\ln\tfrac{2}{3}\right)
= -24.94 \times (-0.6365) = +15.9\ \mathrm{J\,K^{-1}}.
$$
For two samples of the same gas, removing the partition changes nothing measurable: there is no expansion into a *new* volume for each species, $\Delta_\mathrm{mix}S = 0$. The jump from $0$ to $15.9\ \mathrm{J\,K^{-1}}$ as soon as the gases are merely *different* is the Gibbs paradox in one number, and its resolution is that entropy counts microstates of *indistinguishable* particles — see the statistical section below and [[statistical-thermodynamics/partition-function|the partition function]].
:::
:::

::: example Freezing supercooled water {#ex-supercooled}
Water freezes spontaneously at $263.15\ \mathrm{K}$ ($-10\,^\circ\mathrm{C}$), a strongly irreversible process. Compute $\Delta S_\mathrm{sys}$, $\Delta S_\mathrm{surr}$ and $\Delta S_\mathrm{univ}$ per mole, using $\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$ at $273.15\ \mathrm{K}$, $C_{p,\mathrm{m}}(\mathrm{l}) = 75.3$ and $C_{p,\mathrm{m}}(\mathrm{s}) = 37.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (data as in Atkins; heat capacities taken temperature-independent).
::: solution
**System.** Invent a reversible route: warm the liquid to $273.15\ \mathrm{K}$, freeze it reversibly there, cool the ice back to $263.15\ \mathrm{K}$:
$$
\Delta S_\mathrm{sys} = 75.3\ln\frac{273.15}{263.15} - \frac{6010}{273.15} + 37.7\ln\frac{263.15}{273.15}
= 2.81 - 22.00 - 1.41 = -20.6\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
**Surroundings.** They receive the *actual* heat of freezing at $263.15\ \mathrm{K}$, which is the enthalpy change of the same constructed route: $\Delta H = 75.3(10) - 6010 + 37.7(-10) = -5634\ \mathrm{J\,mol^{-1}}$, so $\Delta S_\mathrm{surr} = +5634/263.15 = +21.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
**Universe.** $\Delta S_\mathrm{univ} = -20.6 + 21.4 = +0.8\ \mathrm{J\,K^{-1}\,mol^{-1}} > 0$: freezing is spontaneous, but only barely — the driving force at $-10\,^\circ\mathrm{C}$ is small, which is why supercooled water can persist until a seed crystal arrives. The system *loses* entropy; the second law is saved, as always, by the surroundings.
:::
:::

::: widget plot
f: q*(1/300 - 1/x)
x: 300, 1200
y: 0, 0.35
sliders: q=100:10:500:10
labels: \Delta S_\text{univ} \text{ / } \mathrm{J\,K^{-1}}
caption: The entropy produced when heat $q$ (slider, in J) flows by pure conduction from a reservoir at $T_\mathrm{h} = x$ down to one at $300\ \mathrm{K}$: $\Delta S_\mathrm{univ} = q(1/T_\mathrm{c} - 1/T_\mathrm{h})$. The production vanishes only as $T_\mathrm{h} \to T_\mathrm{c}$ — which is why heat exchange between bodies at appreciably different temperatures is irretrievably wasteful, and why a reversible heat engine must be fed by a reservoir at *exactly* the working temperature at every point. Every watt conducted down a finite temperature difference is entropy manufactured and paid for in lost work.
:::

## The statistical definition of entropy

::: proposition The Boltzmann entropy {#prop-boltzmann}
The entropy of a macrostate is
$$
S = k_\mathrm{B} \ln W,
$$
where $W$ is the number of microstates — distinct arrangements of the positions, momenta and internal states of all the particles — compatible with the macroscopic constraints, and $k_\mathrm{B} = 1.381\times 10^{-23}\ \mathrm{J\,K^{-1}}$. The logarithm is forced: entropies add while numbers of microstates multiply, $W_{AB} = W_A W_B$ for independent systems, and $\ln$ is the only function turning one into the other.
:::

The bridge to the macroscopic definition is quantitative: for the canonical ensemble, $S = k_\mathrm{B}\ln W$ reproduces $\mathrm{d}S = \delta q_\mathrm{rev}/T$ exactly, with heat identified as energy spread over more microstates and temperature as the reluctance of $W$ to grow ($1/T = \partial S/\partial U$). The full construction is the subject of [[statistical-thermodynamics/boltzmann-distribution|the Boltzmann distribution]] and [[statistical-thermodynamics/canonical-ensemble|the canonical ensemble]]; here we use it to *count*.

::: example Counting microstates {#ex-counting}
(a) Four molecules are distributed between the two halves of a box. How many microstates are there in total, how many correspond to "all four in the left half", and what is the probability of that macrostate? (b) Use the same logic to find the entropy increase when one mole of molecules, initially confined to one half of a box, is allowed into the whole box, and compare with the thermodynamic result. (c) A crystal of CO molecules may have each molecule pointing either way with (almost) no energy cost. Find the residual entropy per mole.
::: solution
(a) Each molecule has $2$ choices, so $W_\text{total} = 2^4 = 16$; the all-left macrostate has $W = 1$, probability $1/16$.
(b) For $N$ molecules the all-one-side macrostate has $W = 1$ out of $2^N$, a fraction $2^{-N}$ — for Avogadro's number, $10^{-10^{22}}$, which is not "unlikely" but physically unobservable. The entropy gain of freeing the whole box is
$$
\Delta S = k_\mathrm{B}\ln 2^N = N k_\mathrm{B}\ln 2 = R\ln 2 = 5.76\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
identical to the thermodynamic $\Delta S = nR\ln(V_\mathrm{f}/V_\mathrm{i})$ for $V_\mathrm{f}/V_\mathrm{i} = 2$: the two definitions of entropy are not merely compatible, they are the same number.
(c) $W = 2^N$ orientations survive down to $0\ \mathrm{K}$, so the crystal keeps a **residual entropy** $S_0 = N k_\mathrm{B}\ln 2 = R\ln 2 = 5.76\ \mathrm{J\,K^{-1}\,mol^{-1}}$ even in its ground state. Spectroscopic (third-law) entropies of CO exceed calorimetric ones by almost exactly this amount.
:::
:::

::: widget plot
f: log(x)
x: 1, 1000000
y: 0, 14
labels: S / k_\mathrm{B}
caption: The Boltzmann entropy $S/k_\mathrm{B} = \ln W$ against the number of microstates $W$ (horizontal axis, linear). The curve is so flat that multiplying the number of arrangements by a *million* adds only $\ln 10^6 = 13.8$ to $S/k_\mathrm{B}$ — per particle, a few $10^{-23}\ \mathrm{J\,K^{-1}}$. Macroscopic entropy is enormous ($R\ln 2$ per mole is $5.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$) only because $N \sim 10^{23}$ multiplies these vanishing contributions; the logarithm is why thermodynamics is insensitive to the details of $W$ and why "disorder" metaphors fail whenever $W$ is not obviously huge.
:::

Ice gives the most famous count. Linus Pauling argued in 1935 that in ice each oxygen binds four hydrogens at two short and two long distances, but each hydrogen-bonded pair of oxygens shares its hydrogen in either of two ways: $3/2$ choices per bond on average, $W = (3/2)^N$ per mole, residual entropy $R\ln(3/2) = 3.37\ \mathrm{J\,K^{-1}\,mol^{-1}}$ — within experimental error of the calorimetric gap. A crystal that looks perfectly ordered at $0\ \mathrm{K}$ carries entropy because *order in the positions does not mean order in the arrangements*.

## The third law and absolute entropy

::: proposition The third law {#prop-third-law}
**Nernst heat theorem:** the entropy change of any isothermal process between condensed phases tends to zero as $T \rightarrow 0$.
**Planck formulation:** the entropy of a *perfect crystalline substance* is zero at $T = 0\ \mathrm{K}$, $S(0) = 0$, because the crystal has a unique ground state, $W = 1$.
Consequences: every substance has an absolute entropy $S_\mathrm{m}^\circ(T) = \int_0^T C_{p,\mathrm{m}}(T')/T'\,\mathrm{d}T' + \sum \Delta_\mathrm{tr}H/T_\mathrm{tr}$, tabulated at $p^\circ = 1\ \mathrm{bar}$; the integral converges at the lower limit because $C_{p,\mathrm{m}} \propto T^3$ (Debye) as $T \rightarrow 0$; and absolute zero cannot be reached by any finite procedure (**unattainability formulation**).
:::

The third law is what made the entropy tables of [[general-chemistry-2/entropy-free-energy|the first course]] absolute rather than conventional, and it is also what makes residual entropy a *measurable* violation of its Planck formulation: substances such as CO, $\mathrm{N_2O}$ and ice freeze into orientationally disordered ground states, $W > 1$, and carry $S_0 > 0$ down to the lowest temperatures. The law speaks of perfect crystals; where perfection is impossible, the residual entropy tells you so.

::: example The third-law entropy of liquid water {#ex-third-law-water}
Build up $S_\mathrm{m}^\circ(298.15\ \mathrm{K})$ for liquid water from the third law, given that the integral $\int_0^{273.15} C_{p,\mathrm{m}}(\text{ice})/T\,\mathrm{d}T$ (with Debye $T^3$ extrapolation below $10\ \mathrm{K}$) contributes $41.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$, $\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$ at $273.15\ \mathrm{K}$, and $C_{p,\mathrm{m}}(\mathrm{l}) = 75.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$ over $273.15$–$298.15\ \mathrm{K}$.
::: solution
$$
S_\mathrm{m}^\circ = 41.3 + \frac{6010}{273.15} + 75.3\ln\frac{298.15}{273.15}
= 41.3 + 22.0 + 6.6 = 69.9\ \mathrm{J\,K^{-1}\,mol^{-1}},
$$
matching the NIST-JANAF tabulated value $S_\mathrm{m}^\circ(\mathrm{H_2O,\,l}) = 69.95\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Every standard entropy in every table is built this way — heat the crystal from $0\ \mathrm{K}$, melt, heat the liquid, vaporise, heat the gas — which is why $\Delta_\mathrm{r}S^\circ$ values computed from tables are *absolute* statements about microstates, not conventions like $\Delta_\mathrm{f}H^\circ$.
:::
:::

## Where this leads

Entropy is the hinge of the whole course. With $S$ in hand, the Gibbs and Helmholtz energies of [[general-chemistry-2/entropy-free-energy|the first course]] become computable from first principles, and their full thermodynamic machinery — chemical potential, the Maxwell relations, the criterion $\mathrm{d}G \le 0$ — is [[thermodynamics/free-energy|the next chapter]]. The heat capacities needed to integrate $C_{p,\mathrm{m}}/T$ and the adiabats used in the Carnot cycle are treated in [[thermodynamics/heat-capacity-adiabatic|heat capacity and adiabatic change]]; phase transitions and their $\Delta H/T_\mathrm{tr}$ terms return in [[thermodynamics/phase-equilibria|phase equilibria]], and reaction entropies in [[thermodynamics/reaction-equilibrium|the thermodynamics of chemical equilibrium]]. The statistical side — $S = k_\mathrm{B}\ln W$ proved from the partition function, evaluated for real molecules, and used in the canonical ensemble — is the programme of [[statistical-thermodynamics/partition-function|partition functions]] and [[statistical-thermodynamics/thermodynamic-functions|thermodynamic functions]]. Two cautions to carry forward: entropy decides *whether*, never *how fast* — that is [[kinetics/rate-laws|kinetics]] — and the electrical work of [[electrochemistry/cell-thermodynamics|electrochemical cells]] is the same entropy bookkeeping done at constant temperature and pressure. The hydrogen-bond counting of ice recurs in [[general-chemistry-2/liquids-solutions|liquids and solutions]], and the calorimetric method in [[general-chemistry-1/thermochemistry|thermochemistry]].

::: summary
- The first law balances energy but permits impossible processes; the second law supplies direction: no cyclic engine converts heat from a single reservoir wholly into work (Kelvin–Planck), and heat does not move cold-to-hot without work (Clausius).
- The Carnot cycle — two reversible isotherms and two reversible adiabats — has efficiency $\eta = 1 - T_\mathrm{c}/T_\mathrm{h}$, and Carnot's theorem makes it the *maximum* efficiency between two temperatures, for every working substance.
- Requiring that efficiency to define temperature yields the thermodynamic (Kelvin) scale, independent of any material property; on it, every reversible engine satisfies $q_\mathrm{c}/q_\mathrm{h} = -T_\mathrm{c}/T_\mathrm{h}$.
- The Clausius inequality $\oint \delta q/T \le 0$ makes $\mathrm{d}S = \delta q_\mathrm{rev}/T$ an exact differential: entropy is a state function, and $\Delta S_\mathrm{univ} \ge 0$ is the criterion of spontaneity.
- Compute $\Delta S$ along any reversible path: $\int C_{p,\mathrm{m}}\,\mathrm{d}T/T$, $\Delta_\mathrm{tr}H/T_\mathrm{tr}$, $C_{V,\mathrm{m}}\ln(T_2/T_1) + R\ln(V_2/V_1)$, $\Delta_\mathrm{mix}S = -nR\sum x_i\ln x_i$; for irreversible processes $\Delta S_\mathrm{univ} > 0$ even when $\Delta S_\mathrm{sys} < 0$.
- Statistically $S = k_\mathrm{B}\ln W$; the logarithm converts multiplying microstates into adding entropies, and residual entropies ($R\ln 2$ for CO, $R\ln\tfrac{3}{2}$ for ice) measure frozen-in disorder.
- The third law sets $S = 0$ for a perfect crystal at $0\ \mathrm{K}$, making tabulated absolute entropies possible and absolute zero unattainable.
:::

## Exercises

::: exercise Carnot efficiency {level=1 check="0.400"}
A Carnot engine operates between $T_\mathrm{h} = 500\ \mathrm{K}$ and $T_\mathrm{c} = 300\ \mathrm{K}$. Enter the efficiency as a decimal.
::: solution
$\eta = 1 - T_\mathrm{c}/T_\mathrm{h} = 1 - 300/500 = 0.400$, forty per cent — the ceiling for *any* engine between these reservoirs, and the reason real engines are rated against it rather than against $100\,\%$.
:::
:::

::: exercise Entropy of heating {level=1 check="14.0"}
Two moles of copper, $C_{p,\mathrm{m}} = 24.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$, are heated from $300\ \mathrm{K}$ to $400\ \mathrm{K}$. Enter $\Delta S$ in $\mathrm{J\,K^{-1}}$.
::: solution
$\Delta S = nC_{p,\mathrm{m}}\ln(T_2/T_1) = 2 \times 24.4 \times \ln(400/300) = 48.8 \times 0.2877 = 14.0\ \mathrm{J\,K^{-1}}$.
:::
:::

::: exercise Free expansion {level=1 check="11.5"}
Two moles of an ideal gas expand isothermally into a vacuum, doubling their volume. Enter $\Delta S$ in $\mathrm{J\,K^{-1}}$.
::: solution
No heat, no work, $\Delta U = 0$ — but entropy is a state function, so use the reversible isothermal path: $\Delta S = nR\ln 2 = 2 \times 8.314 \times 0.6931 = 11.5\ \mathrm{J\,K^{-1}}$. All of it is $\Delta S_\mathrm{univ}$, since the surroundings change not at all: free expansion is pure entropy production.
:::
:::

::: exercise Work of a Carnot engine {level=2 check="1.50"}
A Carnot engine between $T_\mathrm{h} = 750\ \mathrm{K}$ and $T_\mathrm{c} = 300\ \mathrm{K}$ absorbs $2.50\ \mathrm{kJ}$ from the hot reservoir per cycle. Enter the work delivered per cycle in $\mathrm{kJ}$.
::: solution
$\eta = 1 - 300/750 = 0.600$, so $-w = \eta q_\mathrm{h} = 0.600 \times 2.50 = 1.50\ \mathrm{kJ}$, and $q_\mathrm{c} = -(2.50 - 1.50) = -1.00\ \mathrm{kJ}$ is rejected. The heat ratio checks the temperatures: $|q_\mathrm{c}|/q_\mathrm{h} = 0.400 = 300/750$.
:::
:::

::: exercise Entropy on a mixed path {level=2 check="24.3"}
Two moles of argon ($C_{V,\mathrm{m}} = \tfrac{3}{2}R$) go from $300\ \mathrm{K}$, $20.0\ \mathrm{L}$ to $500\ \mathrm{K}$, $40.0\ \mathrm{L}$. Enter $\Delta S$ in $\mathrm{J\,K^{-1}}$.
::: solution
$\Delta S = nC_{V,\mathrm{m}}\ln(T_2/T_1) + nR\ln(V_2/V_1) = 2 \times 12.47 \times \ln(5/3) + 2 \times 8.314 \times \ln 2 = 24.94 \times 0.5108 + 11.53 = 12.74 + 11.53 = 24.3\ \mathrm{J\,K^{-1}}$.
:::
:::

::: exercise Entropy of mixing {level=2 check="18.7"}
One mole of helium is mixed with three moles of neon, both initially at $298\ \mathrm{K}$ and $1\ \mathrm{bar}$, at constant temperature and pressure. Enter $\Delta_\mathrm{mix}S$ in $\mathrm{J\,K^{-1}}$.
::: solution
$x(\mathrm{He}) = 0.250$, $x(\mathrm{Ne}) = 0.750$:
$$
\Delta_\mathrm{mix}S = -4 \times 8.314\,(0.250\ln 0.250 + 0.750\ln 0.750)
= -33.26 \times (-0.5623) = 18.7\ \mathrm{J\,K^{-1}}.
$$
The maximum of $-\sum x\ln x$ is at equal amounts, so a $1:1$ mixture of the same four moles would give $4R\ln 2 = 23.1\ \mathrm{J\,K^{-1}}$ — mixing is most profitable when the mole fractions are balanced.
:::
:::

::: exercise From Carnot to Clausius {level=3}
Using only Carnot's theorem ($\eta \le 1 - T_\mathrm{c}/T_\mathrm{h}$ for any engine between two reservoirs) and the heat–temperature ratio $q_\mathrm{c}/q_\mathrm{h} = -T_\mathrm{c}/T_\mathrm{h}$ of a reversible engine, prove the Clausius inequality $\oint \delta q/T \le 0$ for a cycle operating between two reservoirs, and state which step of the argument fails if the cycle is reversible.
::: solution
For any engine between $T_\mathrm{h}$ and $T_\mathrm{c}$, $\eta = 1 + q_\mathrm{c}/q_\mathrm{h} \le 1 - T_\mathrm{c}/T_\mathrm{h}$. Rearranging, $q_\mathrm{c}/q_\mathrm{h} \le -T_\mathrm{c}/T_\mathrm{h}$; since $q_\mathrm{h} > 0$ and $T_\mathrm{h} > 0$, dividing by $T_\mathrm{c} > 0$ after cross-multiplying gives $q_\mathrm{c}/T_\mathrm{c} \le -q_\mathrm{h}/T_\mathrm{h}$, i.e. $q_\mathrm{h}/T_\mathrm{h} + q_\mathrm{c}/T_\mathrm{c} \le 0$ — the inequality for the two-reservoir cycle. For a reversible engine the chain of inequalities starts from Carnot's theorem with equality (a reversible engine between the same reservoirs attains $1 - T_\mathrm{c}/T_\mathrm{h}$ by definition of the scale), so the integral vanishes. The step that fails for a reversible cycle is the *strict* inequality: if $\oint \delta q/T < 0$ for a supposedly reversible cycle, running the cycle backwards would give $\oint \delta q/T > 0$ for another reversible cycle, an engine of efficiency above Carnot's — so reversibility forces equality, and equality is what makes $\mathrm{d}S$ exact.
:::
:::

::: exercise Two blocks: conduction versus engine {level=3 check="1.44"}
Two identical blocks, each with heat capacity $C = 200\ \mathrm{J\,K^{-1}}$, start at $300\ \mathrm{K}$ and $400\ \mathrm{K}$. (a) They are placed in thermal contact in an insulated box: find the final temperature and $\Delta S_\mathrm{univ}$. (b) Instead, a reversible engine runs between them until they reach a common temperature: find that temperature and the work delivered. Enter the work in $\mathrm{kJ}$.
::: solution
(a) Energy conservation gives $T_\mathrm{f} = (300 + 400)/2 = 350\ \mathrm{K}$, and
$$
\Delta S_\mathrm{univ} = C\ln\frac{350}{300} + C\ln\frac{350}{400}
= 200\ln\frac{49}{48} = 4.12\ \mathrm{J\,K^{-1}} > 0 .
$$
(b) For a reversible engine $\Delta S_\mathrm{univ} = 0$: $C\ln(T_\mathrm{f}/300) + C\ln(T_\mathrm{f}/400) = 0$, so $T_\mathrm{f}^2 = 300 \times 400$ and $T_\mathrm{f} = 346.4\ \mathrm{K}$ — the geometric mean, lower than the arithmetic mean of conduction. The energy not converted to work is what remains in the blocks, so
$$
W = C(300 + 400 - 2 \times 346.4) = 200 \times 7.18 = 1.44\ \mathrm{kJ}.
$$
That is the price of conduction: $1.44\ \mathrm{kJ}$ of work destroyed, and $4.12\ \mathrm{J\,K^{-1}}$ of entropy manufactured, by letting $100\ \mathrm{K}$ of temperature difference run down without an engine.
:::
:::
