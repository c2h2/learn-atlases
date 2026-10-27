A smartphone battery holds about $15\ \mathrm{Wh}$ in $45\ \mathrm{g}$, delivers it at $3.8\ \mathrm{V}$ for a day, and can be recharged five hundred times before it has lost a fifth of its capacity. Each of those numbers is a piece of electrochemistry. The voltage is the difference in the chemical potential of lithium between two solids, divided by the Faraday constant. The capacity is the number of lithium ions those solids can take up and release, counted in faradays. The energy is the integral of one over the other. And the five hundred cycles are a negotiated truce with side reactions that, thermodynamically, should have destroyed the cell on its first charge — the electrolyte is not stable at either electrode and survives only because it is protected by a film of its own decomposition products.

This chapter applies the thermodynamics of [[electrochemistry/cell-thermodynamics]] and the kinetics and transport of [[electrochemistry/electrode-kinetics]] and [[electrochemistry/voltammetry]] to practical cells. We define the figures of merit, derive theoretical capacities and energies, explain the voltage curves of insertion electrodes, analyse what limits power, and then look at the two chemistries that dominate the market — lead–acid and lithium-ion — and at how cells age. Hazards are described, not procedures: work with real cells, especially lithium cells, needs training, appropriate equipment and a risk assessment.

## The language of batteries

A **battery** is strictly a set of cells connected together, but the word is used for a single cell too. A **primary** cell is used once (alkaline zinc–manganese dioxide, lithium–iodine for pacemakers); a **secondary** or rechargeable cell is designed to be recharged by reversing the reaction. Because the same electrode is the anode during discharge and the cathode during charge, battery engineers speak instead of the **negative** and **positive** electrodes, named for their polarity, which does not change. (In the lithium-ion literature "anode" conventionally means the negative electrode and "cathode" the positive, named for discharge.)

::: definition Capacity, energy and power {#def-capacity}
The **capacity** $Q$ of a cell is the charge it delivers on complete discharge, usually in ampere-hours ($1\ \mathrm{Ah} = 3600\ \mathrm{C}$). The **specific capacity** of an electrode material is its capacity per unit mass, in $\mathrm{mAh\,g^{-1}}$. The **energy** delivered is
$$
W = \int_0^{Q} V\,\mathrm{d}q \approx \bar{V}Q ,
$$
with $V$ the terminal voltage and $\bar V$ its mean; the **specific energy** is $W/m$ (in $\mathrm{Wh\,kg^{-1}}$) and the **energy density** $W/V_\mathrm{cell}$ (in $\mathrm{Wh\,dm^{-3}}$). The **power** is $P = VI$. A discharge current of **$n$C** empties the rated capacity in $1/n$ hours (a $3.0\ \mathrm{Ah}$ cell at 2C delivers $6.0\ \mathrm{A}$ for $30\ \mathrm{min}$). The **coulombic efficiency** of a cycle is the charge delivered on discharge divided by the charge put in on charge; the **energy efficiency** is the corresponding ratio of energies, lower because the discharge voltage is below the charge voltage.
:::

::: proposition Theoretical specific capacity and specific energy {#prop-theoretical}
An electrode material of molar mass $M$ (in $\mathrm{g\,mol^{-1}}$) that exchanges $n$ electrons per formula unit has theoretical specific capacity
$$
q_\mathrm{th} = \frac{nF}{3.6\,M}\ \mathrm{mAh\,g^{-1}} ,
$$ {#eq-capacity}
and a cell whose reaction transfers $\nu$ electrons per mole of reaction, with reactants of total mass $m_\mathrm{r}$ (in $\mathrm{kg}$) per mole of reaction and mean voltage $\bar E$, has theoretical specific energy
$$
w_\mathrm{th} = \frac{\nu F\bar E}{3600\,m_\mathrm{r}}\ \mathrm{Wh\,kg^{-1}} .
$$ {#eq-specific-energy}
:::

::: proof
One mole of formula units exchanges $n$ moles of electrons, a charge $nF$ coulombs, and has mass $M$ grams. Since $1\ \mathrm{mAh} = 3.6\ \mathrm{C}$, the charge per gram is $nF/M$ coulombs $= nF/(3.6M)$ mAh. For the energy, the reversible electrical work per mole of reaction is $-\Delta_\mathrm{r}G = \nu F\bar E$ joules ([[electrochemistry/cell-thermodynamics#prop-dg]], with $\bar E$ the mean of the open-circuit potential over the reaction), and $1\ \mathrm{Wh} = 3600\ \mathrm{J}$; dividing by the mass of reactants gives the result. It is an upper bound: it counts only the active materials, at the thermodynamic voltage, used completely.
:::

For orientation, $F/3.6 = 26\,801\ \mathrm{mAh\,mol^{-1}}$, so a material of molar mass $100\ \mathrm{g\,mol^{-1}}$ exchanging one electron offers $268\ \mathrm{mAh\,g^{-1}}$.

::: example Theoretical capacities of lithium-ion electrodes {#ex-capacities}
Find the theoretical specific capacities of (a) graphite, which forms $\mathrm{LiC_6}$ when fully lithiated, (b) $\mathrm{LiCoO_2}$, and (c) lithium metal. In practice $\mathrm{Li_{1-x}CoO_2}$ is cycled only between $x = 0$ and $x \approx 0.5$; what capacity does that give?
::: solution
(a) Per formula unit $\mathrm{C_6}$ ($M = 72.06\ \mathrm{g\,mol^{-1}}$), one electron: $q = 26\,801/72.06 = 372\ \mathrm{mAh\,g^{-1}}$ (per gram of carbon). (b) $\mathrm{LiCoO_2}$, $M = 97.87\ \mathrm{g\,mol^{-1}}$: $q = 26\,801/97.87 = 274\ \mathrm{mAh\,g^{-1}}$. (c) Li, $M = 6.94\ \mathrm{g\,mol^{-1}}$: $q = 3862\ \mathrm{mAh\,g^{-1}}$ — ten times graphite, which is why lithium-metal negative electrodes are the long-standing goal. Cycling $\mathrm{LiCoO_2}$ over $\Delta x = 0.5$ gives $137\ \mathrm{mAh\,g^{-1}}$; extracting more lithium destabilises the layered structure and oxidises the electrolyte, so practical layered oxides trade voltage limits against capacity. Nickel-rich variants such as $\mathrm{LiNi_{0.8}Mn_{0.1}Co_{0.1}O_2}$ reach about $200\ \mathrm{mAh\,g^{-1}}$.
:::
:::

## Voltage of an insertion electrode

In a lithium-ion cell, lithium ions shuttle through the electrolyte between two host solids while electrons travel through the external circuit, and the cell reaction is the transfer of lithium from one host to the other, e.g. $\mathrm{LiC_6 + 2\,Li_{0.5}CoO_2 \rightarrow C_6 + 2\,LiCoO_2}$ per mole of lithium transferred. The open-circuit voltage then depends only on how strongly each host holds lithium.

::: proposition Open-circuit voltage of an insertion cell {#prop-ocv}
For a cell in which lithium is transferred from a negative host (where its chemical potential is $\mu_\mathrm{Li}^{-}$) to a positive host ($\mu_\mathrm{Li}^{+}$), the open-circuit voltage is
$$
E_\mathrm{ocv} = -\frac{\mu_\mathrm{Li}^{+} - \mu_\mathrm{Li}^{-}}{F} .
$$ {#eq-ocv}
If the host is a lattice of equivalent sites with occupancy $x$ and no interactions between inserted ions, the electrode potential against Li metal is
$$
E(x) = E^\circ - \frac{RT}{F}\ln\frac{x}{1-x} ,
$$ {#eq-lattice}
and with a mean-field interaction energy $\Omega$ (a regular-solution term) an extra $-(\Omega/F)(1 - 2x)$ is added. For $\Omega > 2RT$ the model predicts separation into two phases, and the voltage is then constant across the two-phase region.
:::

::: proof
The cell reaction is $\mathrm{Li}(\text{in negative host}) \rightarrow \mathrm{Li}(\text{in positive host})$, with $\nu = 1$, so $\Delta_\mathrm{r}G = \mu_\mathrm{Li}^{+} - \mu_\mathrm{Li}^{-}$ and $E = -\Delta_\mathrm{r}G/F$. (Equivalently, at each electrode the equilibrium $\mathrm{Li^+(electrolyte) + e^-(electrode) \rightleftharpoons Li(host)}$ holds, and the electrolyte term cancels between the two.)

For the host, count configurations: $N$ sites, $xN$ occupied. The configurational entropy is $S = -Nk_\mathrm{B}[x\ln x + (1-x)\ln(1-x)]$, and if each inserted Li has energy $\varepsilon_0$ (no interactions), $G = xN\varepsilon_0 - TS$ up to terms independent of $x$. The chemical potential per mole is $\mu_\mathrm{Li} = N_\mathrm{A}\,\partial G/\partial(xN) = \mu^\circ + RT\ln[x/(1-x)]$. Against lithium metal ($\mu_\mathrm{Li}^{-} = \mu^\circ_\mathrm{Li(s)}$), [[#eq-ocv]] gives [[#eq-lattice]] with $E^\circ = -(\mu^\circ - \mu^\circ_\mathrm{Li(s)})/F$. A mean-field interaction between inserted ions adds a regular-solution excess Gibbs energy $\Omega x(1 - x)$ per mole of sites, whose derivative $\Omega(1 - 2x)$ adds to $\mu_\mathrm{Li}$ and gives the extra voltage term. When $\Omega > 2RT$, $\mu_\mathrm{Li}(x)$ is no longer monotonic: there is a range of compositions in which $\partial\mu/\partial x < 0$, the solid solution is unstable, and the system splits into a lithium-poor and a lithium-rich phase, exactly as a regular liquid mixture separates in [[thermodynamics/phase-equilibria]]. In the two-phase region the phase compositions are fixed, so $\mu_\mathrm{Li}$ — and the voltage — are constant (the Gibbs phase rule with two components and three phases, two solids plus the reference, at fixed $T$ and $p$).
:::

::: widget plot
f: E0 - 0.025693*ln(x/(1-x)) - (W/96.485)*(1 - 2*x); E0 + 0*x
x: 0.01, 0.99
y: 2.9, 4.3
sliders: E0=3.6:3:4:0.01; W=0:-10:12:0.1
labels: E(x); E^\circ
caption: Open-circuit potential of an insertion electrode against Li metal as a function of its lithium occupancy $x$, from the lattice-gas model [[#eq-lattice]] with a regular-solution interaction $\Omega$ ($W$, in $\mathrm{kJ\,mol^{-1}}$). With $W = 0$ the curve is the S-shape of an ideal solid solution, falling steeply near $x = 0$ and $x = 1$ — the voltage profile of materials like $\mathrm{LiNi_{0.8}Mn_{0.1}Co_{0.1}O_2}$. Negative $W$ (repulsion between inserted ions) makes the slope steeper. Positive $W$ beyond $2RT = 4.96\ \mathrm{kJ\,mol^{-1}}$ produces a loop: the real system avoids it by separating into two phases and shows a flat plateau at $E^\circ$ (equal areas cut from the loop), as $\mathrm{LiFePO_4}$ does at $3.43\ \mathrm{V}$.
:::

A sloping voltage curve is convenient for estimating the state of charge from the voltage; a flat one is convenient for electronics but makes the state of charge hard to read. Graphite itself shows a series of plateaus near $0.1$–$0.2\ \mathrm{V}$ against lithium as lithium orders into successive "stages" between the graphene layers. Because graphite works so close to the lithium potential, a lithium-ion cell's voltage is close to the positive electrode's potential against lithium: about $3.4\ \mathrm{V}$ for $\mathrm{LiFePO_4}$ cells and $3.6$–$3.8\ \mathrm{V}$ for layered oxides.

::: example Specific energy of a lithium-ion couple {#ex-li-ion-energy}
For the cell $\mathrm{C_6}$ (graphite) | electrolyte | $\mathrm{Li_{1-x}CoO_2}$ cycled over $\Delta x = 0.5$ with mean voltage $3.7\ \mathrm{V}$, find the theoretical specific energy based on the masses of the two active electrode materials.
::: solution
Per mole of Li transferred: the negative electrode needs one mole of $\mathrm{C_6}$ ($72.06\ \mathrm{g}$), and the positive electrode, which exchanges only $0.5$ Li per formula unit, needs two moles of $\mathrm{LiCoO_2}$ ($195.7\ \mathrm{g}$, which already contains the lithium). Total $m_\mathrm{r} = 267.8\ \mathrm{g}$. From [[#eq-specific-energy]] with $\nu = 1$:
$$
w_\mathrm{th} = \frac{96\,485\times3.7}{3600\times0.2678}\ \mathrm{Wh\,kg^{-1}} = 370\ \mathrm{Wh\,kg^{-1}} .
$$
Commercial cells of this chemistry reached about $200\ \mathrm{Wh\,kg^{-1}}$; the rest of the mass is electrolyte, separator, copper and aluminium current collectors, binder, conductive carbon and casing. Raising the specific energy therefore means both better active materials and less inactive mass — thicker electrodes, thinner foils — which in turn worsens transport and power.
:::
:::

## Why a working cell delivers less

At zero current the terminal voltage is $E_\mathrm{ocv}$. When current flows, each process from the last three chapters takes its toll.

::: proposition Terminal voltage and maximum power {#prop-power}
During discharge at current $I$, the terminal voltage is
$$
V = E_\mathrm{ocv} - IR_\Omega - |\eta_\mathrm{act,+}| - |\eta_\mathrm{act,-}| - |\eta_\mathrm{conc}| ,
$$ {#eq-terminal}
the sum of ohmic ($IR_\Omega$: electrolyte, separator, contacts), activation (Butler–Volmer at each electrode) and concentration (mass-transport) losses. On charge the signs reverse and $V > E_\mathrm{ocv}$. If the losses are approximately linear in current, $V = E_\mathrm{ocv} - IR_\mathrm{int}$, the power delivered $P = IV$ has its maximum
$$
P_\mathrm{max} = \frac{E_\mathrm{ocv}^2}{4R_\mathrm{int}} \quad\text{at}\quad I = \frac{E_\mathrm{ocv}}{2R_\mathrm{int}}, \quad V = \frac{E_\mathrm{ocv}}{2},
$$ {#eq-pmax}
where the energy efficiency of delivery is only $50\,\%$.
:::

::: proof
[[#eq-terminal]] is Kirchhoff's voltage law around the circuit: the thermodynamic driving force minus the potential needed to drive current through each resistance-like process. For the linear model, $P = I(E_\mathrm{ocv} - IR_\mathrm{int})$; setting $\mathrm{d}P/\mathrm{d}I = E_\mathrm{ocv} - 2IR_\mathrm{int} = 0$ gives $I = E_\mathrm{ocv}/2R_\mathrm{int}$ and $P_\mathrm{max} = E_\mathrm{ocv}^2/4R_\mathrm{int}$. The fraction of the reaction's Gibbs energy delivered to the load is $V/E_\mathrm{ocv} = \tfrac{1}{2}$ there; the other half is dissipated as heat inside the cell. (Activation losses are logarithmic, not linear, at high current, so the linear model overestimates power from cells with sluggish electrodes.)
:::

::: widget plot
f: x*(E - R*x); 10*(E - R*x)
x: 0, 80
y: 0, 80
sliders: E=3.7:3:4.2:0.01; R=0.05:0.01:0.2:0.005
labels: P\ (\mathrm{W}); 10\times V\ (\mathrm{V})
caption: Power $P = I(E_\mathrm{ocv} - IR_\mathrm{int})$ and ten times the terminal voltage against current $I$ in amperes for a cell with open-circuit voltage $E$ and internal resistance $R$ (in ohms). The power is a parabola with its maximum $E^2/4R$ at half the short-circuit current, where the voltage has fallen to $E/2$. Batteries are therefore operated well to the left of the maximum, where most of the energy reaches the load: at a tenth of the maximum-power current the efficiency is $95\,\%$. Halve $R$ and the peak power doubles — which is why power cells use thin electrodes and large areas.
:::

::: example Power from a cell {#ex-power}
A lithium-ion cell has $E_\mathrm{ocv} = 3.70\ \mathrm{V}$ and $R_\mathrm{int} = 50\ \mathrm{m\Omega}$. Find the terminal voltage at $10\ \mathrm{A}$, and the maximum power.
::: solution
$V = 3.70 - 10\times0.050 = 3.20\ \mathrm{V}$; the cell delivers $32\ \mathrm{W}$ and dissipates $I^2R = 5.0\ \mathrm{W}$ internally, an efficiency of $3.20/3.70 = 86\,\%$. The maximum power is $E^2/4R = 3.70^2/0.20 = 68\ \mathrm{W}$ at $37\ \mathrm{A}$, with $34\ \mathrm{W}$ of heat inside the cell. That heat, in a sealed cell of a few tens of grams, is why high-rate operation needs thermal management. The internal resistance itself rises as the cell is cooled (lower conductivity, slower kinetics) and as it ages.
:::
:::

At high rate the usable capacity also falls, because concentration gradients in the electrolyte and inside the electrode particles bring the voltage to its cut-off before the active material is fully used. For lead–acid cells, Wilhelm Peukert (1897) expressed this empirically as $I^{k}t = \text{constant}$ for the discharge time $t$ at current $I$, with $k \approx 1.1$–$1.3$ (an empirical law, not a theorem). A plot of specific energy against specific power on logarithmic axes — a **Ragone plot** — summarises the trade-off for each technology: supercapacitors ([[electrochemistry/double-layer]]) occupy the high-power, low-energy corner, fuel cells ([[electrochemistry/fuel-cells-electrolysis]]) the high-energy, modest-power corner, and batteries the middle.

## The lead–acid cell

Gaston Planté's cell of 1859, still the commonest rechargeable battery by mass produced, uses lead and lead dioxide plates in sulfuric acid. On discharge, both plates turn into lead sulfate:
$$
\begin{aligned}
\text{negative:}\quad &\mathrm{Pb(s) + HSO_4^-(aq) \rightarrow PbSO_4(s) + H^+(aq) + 2e^-}\\
\text{positive:}\quad &\mathrm{PbO_2(s) + HSO_4^-(aq) + 3H^+(aq) + 2e^- \rightarrow PbSO_4(s) + 2H_2O(l)}\\
\text{overall:}\quad &\mathrm{Pb(s) + PbO_2(s) + 2H_2SO_4(aq) \rightarrow 2PbSO_4(s) + 2H_2O(l)}
\end{aligned}
$$
The acid is a reactant, consumed on discharge, so the specific gravity of the electrolyte (from about $1.28$ charged to about $1.12$ discharged) is a direct gauge of the state of charge.

::: example Lead–acid thermodynamics {#ex-lead-acid}
With $E^\circ(\mathrm{PbO_2/PbSO_4}) = +1.6913\ \mathrm{V}$ and $E^\circ(\mathrm{PbSO_4/Pb}) = -0.3588\ \mathrm{V}$ (CRC, for the sulfate-ion forms), find $E^\circ_\mathrm{cell}$, $\Delta_\mathrm{r}G^\circ$, and the theoretical specific energy based on the reactants $\mathrm{Pb + PbO_2 + 2H_2SO_4}$.
::: solution
$E^\circ = 1.6913 - (-0.3588) = 2.050\ \mathrm{V}$, and with $\nu = 2$, $\Delta_\mathrm{r}G^\circ = -2\times96\,485\times2.050\ \mathrm{J\,mol^{-1}} = -395.6\ \mathrm{kJ\,mol^{-1}}$. The reactant mass per mole of reaction is $207.2 + 239.2 + 2\times98.08 = 642.6\ \mathrm{g}$. From [[#eq-specific-energy]],
$$
w_\mathrm{th} = \frac{2\times96\,485\times2.050}{3600\times0.6426}\ \mathrm{Wh\,kg^{-1}} = 171\ \mathrm{Wh\,kg^{-1}} .
$$
Real batteries deliver $30$–$40\ \mathrm{Wh\,kg^{-1}}$: the grids, the water of the electrolyte and the incomplete use of the plates (sulfate is an insulator and blocks the pores) all cost mass. The cell works at all only because of kinetics. At $2.05\ \mathrm{V}$ the electrolyte should decompose — the negative plate is $0.36\ \mathrm{V}$ below the hydrogen potential and the positive $0.46\ \mathrm{V}$ above the oxygen potential — but the hydrogen overpotential on lead and the oxygen overpotential on lead dioxide are so large ([[electrochemistry/electrode-kinetics]]) that gassing is slow except at the end of charge.
:::
:::

The cell's failure modes follow from its chemistry: **sulfation**, the growth of large, poorly reversible $\mathrm{PbSO_4}$ crystals in cells left discharged; corrosion of the positive grid; and loss of water by gassing on overcharge, which sealed valve-regulated designs minimise by recombining oxygen at the negative plate. Lead and its compounds are toxic (reproductive toxicity and organ damage on repeated exposure are among their GHS hazard classes) and the electrolyte is corrosive, but the closed-loop recycling of lead–acid batteries is among the most complete of any consumer product.

## Lithium-ion cells

::: definition The lithium-ion ("rocking-chair") cell {#def-li-ion}
A **lithium-ion cell** has a negative electrode that stores lithium at low potential (graphite, often with some silicon; or lithium titanate $\mathrm{Li_4Ti_5O_{12}}$ at $1.55\ \mathrm{V}$ for long life) and a positive electrode that stores it at high potential (a layered oxide $\mathrm{LiMO_2}$ with $\mathrm{M} = \mathrm{Ni, Mn, Co, Al}$; the spinel $\mathrm{LiMn_2O_4}$; or the olivine $\mathrm{LiFePO_4}$), separated by a porous polymer film soaked in a non-aqueous electrolyte (typically $1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{LiPF_6}$ in a mixture of ethylene carbonate and linear carbonates). On discharge, $\mathrm{Li^+}$ leaves the negative host, crosses the electrolyte and enters the positive host, while electrons flow through the external circuit; charge reverses both. No lithium metal is present in normal operation.
:::

A non-aqueous electrolyte is unavoidable: graphite operates at about $0.1\ \mathrm{V}$ against $\mathrm{Li^+/Li}$, which is $-2.9\ \mathrm{V}$ against the standard hydrogen electrode, far below the potential at which water would be reduced. In fact the carbonate electrolyte is not stable either: it is reduced at graphite below about $0.8\ \mathrm{V}$ against lithium. On the first charge, the reduction products — lithium carbonate, lithium alkyl carbonates, lithium fluoride and polymers — form a nanometres-thick **solid–electrolyte interphase** (SEI) that conducts lithium ions but not electrons, and so stops further reduction. Ethylene carbonate is essential because its reduction products form a good SEI on graphite; propylene carbonate, chemically almost identical, does not, and co-intercalates and exfoliates the graphite. The SEI consumes lithium irreversibly — typically $5$–$10\,\%$ of the cell's capacity on the first cycle — and its slow continued growth is the main cause of ageing.

::: quiz
A lithium-ion cell is charged at $25\,^\circ\mathrm{C}$. Which statement about its electrodes is correct?
- [ ] The graphite electrode is the anode during charge, because it is the negative electrode
- [x] During charge, lithium is oxidised out of the positive host and inserted into graphite, which is then the cathode
- [ ] The positive electrode is always the cathode, so it is reduced during charge
- [ ] During charge the electrolyte's lithium-ion concentration rises steadily
::: solution
During charge the external supply drives electrons into the graphite, which is reduced (lithium inserted): it is the cathode at that moment, though it remains the negative electrode. The positive electrode is oxidised (lithium extracted), so it is the anode during charge. The electrolyte concentration stays constant overall, because lithium ions leave one electrode as fast as they enter the other; only transient gradients form during current flow.
:::
:::

::: warning Electrolyte stability and the voltage window {#warn-window}
A cell's voltage cannot exceed the electrochemical stability window of its electrolyte, unless a passivating interphase protects it — as the SEI does at the negative electrode and a thinner cathode–electrolyte interphase does at the positive. It is a common mistake to choose a high-voltage cathode from a table of insertion potentials and expect a correspondingly high cell voltage: above about $4.3$–$4.5\ \mathrm{V}$ against lithium, carbonate electrolytes oxidise and transition metals dissolve, and the cell fades quickly. Equally, "thermodynamically stable" is the wrong frame for the SEI: it is a kinetic barrier, and anything that cracks it (the expansion of silicon, by up to $300\,\%$ on lithiation; low-temperature fast charging) exposes fresh electrode and restarts the side reaction.
:::

### Safety

The hazards of lithium-ion cells arise because they combine a flammable electrolyte with stored chemical energy. If a cell is overheated, overcharged, crushed or internally short-circuited (for instance by dendrites of lithium metal plated on graphite during fast charging at low temperature), exothermic reactions — breakdown of the SEI, reaction of lithiated graphite with electrolyte, and above about $150$–$250\,^\circ\mathrm{C}$ (depending on chemistry) oxygen release from layered oxides — can accelerate one another in **thermal runaway**, with venting of flammable and toxic gases (including hydrogen fluoride from $\mathrm{LiPF_6}$) and fire. $\mathrm{LiFePO_4}$, whose strongly bound phosphate oxygen is not released, is markedly more tolerant than nickel-rich oxides. Practical protection lies in battery-management electronics that limit voltage, current and temperature, in separators that close their pores when hot, and in safe storage, transport and disposal; damaged cells are handled only by trained people with appropriate equipment.

## Ageing

Cells lose capacity and gain resistance both in storage (**calendar ageing**) and with use (**cycle ageing**). The main mechanisms are: loss of cyclable lithium to SEI growth; loss of active material through particle cracking and dissolution of transition metals (which migrate to the negative electrode and catalyse further SEI growth); lithium plating on graphite at high charge rates or low temperature; and degradation of binder and conductive network. Each is accelerated by high temperature and high state of charge, which is why cells last longest stored half-charged and cool, and why electric-vehicle batteries often hold back the top and bottom of their capacity.

::: proposition Parabolic growth of a passivating film {#prop-sei}
If the SEI grows by a reaction whose rate is limited by diffusion of a reactant (solvent molecules or electrons) through the existing film, so that the growth rate is inversely proportional to the thickness $L$, then
$$
L(t) = \sqrt{L_0^2 + 2kt}\ \approx \sqrt{2kt}\quad (L \gg L_0),
$$
and the capacity lost to the film is proportional to $\sqrt{t}$.
:::

::: proof
Diffusion through a film of thickness $L$ with fixed concentrations at its faces gives a flux proportional to $1/L$ (Fick's first law). If the film grows by an amount proportional to the flux, $\mathrm{d}L/\mathrm{d}t = k/L$. Separating variables, $L\,\mathrm{d}L = k\,\mathrm{d}t$, and integrating from $L_0$ at $t = 0$ gives $L^2 - L_0^2 = 2kt$. Each unit of film consumes a fixed amount of lithium per unit area, so the lithium (capacity) lost is proportional to $L - L_0 \approx \sqrt{2kt}$ once $L \gg L_0$. The same "parabolic law" governs the growth of protective oxide films on metals ([[electrochemistry/corrosion]]).
:::

::: example Predicting calendar fade {#ex-fade}
A cell stored at $45\,^\circ\mathrm{C}$ loses $4.0\,\%$ of its capacity in $100$ days, by SEI growth following [[#prop-sei]]. When will it have lost $10\,\%$? If the growth constant $k$ has an activation energy of $50\ \mathrm{kJ\,mol^{-1}}$, how long would a $10\,\%$ loss take at $25\,^\circ\mathrm{C}$?
::: solution
Loss $\propto\sqrt{t}$: $10/4 = \sqrt{t/100\ \mathrm{d}}$, so $t = 100\times2.5^2 = 625$ days at $45\,^\circ\mathrm{C}$. At $25\,^\circ\mathrm{C}$, $k$ is smaller by $\exp[-(50\,000/8.314)(1/298.15 - 1/318.15)] = \exp(-1.268) = 0.281$, and at fixed loss $t \propto 1/k$, so $t = 625/0.281 = 2220$ days, about six years. This reasoning underlies accelerated-ageing tests, with the important caveat that different mechanisms have different activation energies, so an accelerated test can be dominated by a mechanism that is unimportant at room temperature.
:::
:::

::: history Two centuries of rechargeable cells {#hist-batteries}
Gaston Planté demonstrated the rechargeable lead–acid cell to the French Academy of Sciences in 1859, and Camille Faure's pasted plates (1881) made it practical. Georges Leclanché's zinc–manganese dioxide cell of 1866 is the ancestor of today's alkaline primary cells. Waldemar Jungner patented the nickel–cadmium cell in 1899 and Thomas Edison the nickel–iron cell in 1901. The lithium-ion era began with M. Stanley Whittingham's rechargeable lithium–titanium disulfide cell (*Science*, 1976), which showed that lithium can be inserted reversibly into a layered host. In 1980 Koichi Mizushima, John Goodenough and co-workers reported $\mathrm{Li_{x}CoO_2}$ as a positive electrode near $4\ \mathrm{V}$, and in 1985 Akira Yoshino built a cell combining it with a carbon negative electrode, avoiding lithium metal; Sony commercialised the lithium-ion cell in 1991. Emanuel Peled described the solid–electrolyte interphase in 1979, and Akshaya Padhi and Goodenough introduced $\mathrm{LiFePO_4}$ in 1997. Goodenough, Whittingham and Yoshino shared the 2019 Nobel Prize in Chemistry.
:::

## Beyond lithium-ion

Several chemistries compete for future markets, and their status changes quickly; the following is a snapshot as of 2026. **Sodium-ion** cells, with hard-carbon negative electrodes and layered-oxide or Prussian-blue-analogue positives, avoid lithium, nickel and cobalt, and have entered commercial production for stationary storage and small vehicles at specific energies of roughly $100$–$160\ \mathrm{Wh\,kg^{-1}}$. **Solid-state** cells replace the liquid electrolyte with a ceramic or polymer lithium conductor ([[electrochemistry/conductivity]]) in the hope of enabling lithium-metal negative electrodes safely; manufacturing interfaces that stay in contact through cycling remains the central challenge. **Lithium–sulfur** cells promise very high theoretical specific energy but suffer from dissolution of intermediate polysulfides. Large-scale stationary storage also uses **redox-flow batteries**, in which the energy is stored in tanks of electrolyte (vanadium in several oxidation states, for example) pumped through a cell, so that energy and power can be sized independently. Meanwhile the price of lithium-ion packs fell by about $90\,\%$ between 2010 and the mid-2020s (BloombergNEF annual surveys), the main reason electric vehicles and grid batteries spread so quickly.

## Where this leads

Batteries store energy that has to come from somewhere; [[electrochemistry/fuel-cells-electrolysis]] treats the devices that convert chemical fuels directly and the electrolysers that make hydrogen from electricity, with the same loss analysis as [[#eq-terminal]]. The insertion materials themselves — layered oxides, spinels, olivines, their defects and phase transitions — are part of [[materials-chemistry]], and the corrosion of current collectors and casings belongs with [[electrochemistry/corrosion]]. Life-cycle questions — mining, recycling, the carbon footprint of manufacture — are taken up in the environmental and industrial courses.

::: summary
- Capacity, specific energy ($\bar V Q/m$), power, C-rate and coulombic and energy efficiencies are the figures of merit; theoretical capacity is $nF/3.6M$ mAh g⁻¹ and theoretical specific energy $\nu F\bar E/3600m_\mathrm{r}$ Wh kg⁻¹, upper bounds that real cells reach only in part.
- The open-circuit voltage of an insertion cell is the difference in lithium chemical potential between the hosts divided by $F$; a lattice-gas host gives $E = E^\circ - (RT/F)\ln[x/(1-x)]$, and strong attractive interactions give two phases and a flat plateau ($\mathrm{LiFePO_4}$).
- Terminal voltage is $E_\mathrm{ocv}$ minus ohmic, activation and concentration losses; maximum power $E^2/4R_\mathrm{int}$ comes at only $50\,\%$ efficiency.
- The lead–acid cell ($E^\circ = 2.05\ \mathrm{V}$, theoretical $171\ \mathrm{Wh\,kg^{-1}}$, practical $30$–$40$) consumes its acid and survives because of high gassing overpotentials on lead and lead dioxide.
- Lithium-ion cells shuttle $\mathrm{Li^+}$ between graphite and oxide or phosphate hosts in a carbonate electrolyte that is protected by the solid–electrolyte interphase; thermal runaway is their principal hazard.
- Ageing is dominated by SEI growth (capacity loss roughly $\propto\sqrt{t}$), particle cracking, metal dissolution and lithium plating, all accelerated by heat and high state of charge.
:::

## Exercises

::: exercise Capacity of lithium iron phosphate {level=1 check="170"}
Find the theoretical specific capacity of $\mathrm{LiFePO_4}$ ($M = 157.76\ \mathrm{g\,mol^{-1}}$), which exchanges one lithium per formula unit. (Enter it in $\mathrm{mAh\,g^{-1}}$.)
::: solution
$q = 26\,801/157.76 = 170\ \mathrm{mAh\,g^{-1}}$. Practical electrodes, made of nanosized, carbon-coated particles to overcome the material's poor electronic and ionic conductivity, deliver about $160\ \mathrm{mAh\,g^{-1}}$ — close to theoretical, because the two-phase reaction leaves no part of the composition range unused.
:::
:::

::: exercise A C-rate {level=1 check="6.0"}
What current corresponds to a 2C discharge of a $3.0\ \mathrm{Ah}$ cell, and how long does the discharge last (ignoring rate-dependent capacity loss)? (Enter the current in A.)
::: solution
$I = 2\times3.0\ \mathrm{A} = 6.0\ \mathrm{A}$, lasting $3.0\ \mathrm{Ah}/6.0\ \mathrm{A} = 0.50\ \mathrm{h} = 30\ \mathrm{min}$. In practice the delivered capacity at 2C is a few per cent lower than at C/5, so the discharge ends a little sooner.
:::
:::

::: exercise Specific energy of a cylindrical cell {level=1 check="235"}
A cylindrical cell of mass $46\ \mathrm{g}$ delivers $3.0\ \mathrm{Ah}$ at a mean voltage of $3.6\ \mathrm{V}$. Find its specific energy. (Enter it in $\mathrm{Wh\,kg^{-1}}$.)
::: solution
$W = 3.0\ \mathrm{Ah}\times3.6\ \mathrm{V} = 10.8\ \mathrm{Wh}$; $W/m = 10.8/0.046 = 235\ \mathrm{Wh\,kg^{-1}}$. A pack built from such cells has a lower figure, typically by $20$–$30\,\%$, because of the casing, cooling and electronics.
:::
:::

::: exercise Lead–acid cell potential {level=2 check="2.050"}
Using $E^\circ(\mathrm{PbO_2/PbSO_4}) = 1.6913\ \mathrm{V}$ and $E^\circ(\mathrm{PbSO_4/Pb}) = -0.3588\ \mathrm{V}$, find $E^\circ$ for the lead–acid cell, and explain qualitatively why a fully charged cell (sulfuric acid at about $5\ \mathrm{mol\,kg^{-1}}$) has an open-circuit voltage above this value. (Enter $E^\circ$ in V.)
::: solution
$E^\circ = 1.6913 + 0.3588 = 2.050\ \mathrm{V}$. The cell reaction consumes two moles of $\mathrm{H_2SO_4}$ and produces two of water, so the Nernst equation is $E = E^\circ + (RT/2F)\ln[a(\mathrm{H_2SO_4})^2/a(\mathrm{H_2O})^2]$. Concentrated acid has a mean activity well above unity and lowers the water activity, so both terms raise $E$, to about $2.1\ \mathrm{V}$ for a charged cell; as the acid is consumed the voltage falls, which is why the open-circuit voltage indicates the state of charge.
:::
:::

::: exercise Maximum power {level=2 check="68.5"}
Find the maximum power of a cell with $E_\mathrm{ocv} = 3.70\ \mathrm{V}$ and $R_\mathrm{int} = 0.050\ \Omega$, and the current at which it occurs. (Enter $P_\mathrm{max}$ in W.)
::: solution
$P_\mathrm{max} = E^2/4R = 13.69/0.20 = 68.5\ \mathrm{W}$ at $I = E/2R = 37\ \mathrm{A}$ and $V = 1.85\ \mathrm{V}$. Half the energy is dissipated in the cell at that point.
:::
:::

::: exercise State of charge from voltage {level=2 check="0.875"}
For an ideal lattice-gas positive electrode ([[#eq-lattice]]) at $25\,^\circ\mathrm{C}$, at what lithium occupancy $x$ is the potential $50\ \mathrm{mV}$ below $E^\circ$? (Enter $x$.)
::: solution
$E^\circ - E = (RT/F)\ln[x/(1-x)] = 0.050\ \mathrm{V}$, so $\ln[x/(1-x)] = 0.050/0.025693 = 1.946$ and $x/(1-x) = 7.00$, giving $x = 7/8 = 0.875$. The ideal curve changes by only $\pm28\ \mathrm{mV}$ between $x = 0.25$ and $x = 0.75$; real sloping electrodes change more, because of interactions and site-energy distributions, which helps state-of-charge estimation.
:::
:::

::: exercise Theoretical energy of lithium–sulfur {level=3 check="2508"}
For the cell reaction $2\mathrm{Li + S \rightarrow Li_2S}$ with a mean voltage of $2.15\ \mathrm{V}$, find the theoretical specific capacity of sulfur and the theoretical specific energy per mass of reactants. Comment on why practical cells reach only a small fraction of it. (Enter the specific energy in $\mathrm{Wh\,kg^{-1}}$.)
::: solution
Sulfur exchanges two electrons per atom: $q = 2\times26\,801/32.06 = 1672\ \mathrm{mAh\,g^{-1}}$. With $\nu = 2$ and $m_\mathrm{r} = 2(6.94) + 32.06 = 45.94\ \mathrm{g}$, $w_\mathrm{th} = 2\times96\,485\times2.15/(3600\times0.04594)\ \mathrm{Wh\,kg^{-1}} = 2508\ \mathrm{Wh\,kg^{-1}}$ (using $M(\mathrm{Li_2S}) = 45.95$ gives the same to four figures). Practical cells need excess lithium, a large volume of electrolyte to dissolve and shuttle polysulfide intermediates, and conductive carbon (sulfur and $\mathrm{Li_2S}$ are insulators); together these cut the realised specific energy to a few hundred $\mathrm{Wh\,kg^{-1}}$, and polysulfide shuttling between the electrodes lowers the coulombic efficiency.
:::
:::

::: exercise Square-root fade {level=3 check="625"}
Derive the parabolic law $L = \sqrt{2kt}$ for a film whose growth is limited by diffusion through itself. A cell loses $4.0\,\%$ of its capacity in its first $100$ days by this mechanism. After how many days will it have lost $10\,\%$? (Enter the number of days.)
::: solution
With $\mathrm{d}L/\mathrm{d}t = k/L$ and $L(0) \approx 0$, $L^2 = 2kt$. Capacity loss is proportional to $L$, hence to $\sqrt{t}$: $t_{10} = 100\ \mathrm{d}\times(10/4.0)^2 = 625\ \mathrm{d}$. Real fade curves are often $\sqrt{t}$ at first and then become linear or accelerate ("knee") when lithium plating or loss of active material takes over — so extrapolations from early data are optimistic.
:::
:::

::: exercise Heat generation in a cell {level=3 check="0.539"}
A cell with $R_\mathrm{int} = 0.050\ \Omega$ and $(\partial E_\mathrm{ocv}/\partial T)_p = -0.10\ \mathrm{mV\,K^{-1}}$ is discharged at $3.0\ \mathrm{A}$ at $25\,^\circ\mathrm{C}$. Using the energy balance $\dot q = I(E_\mathrm{ocv} - V) - IT(\partial E_\mathrm{ocv}/\partial T)_p$ for the heat generated, find the rate of heat generation, and identify the reversible part. (Enter $\dot q$ in W.)
::: hint
The second term is $T\Delta_\mathrm{r}S$ per unit charge, from [[electrochemistry/cell-thermodynamics#prop-temp]].
:::
::: solution
Irreversible (Joule and overpotential) heat: $I(E - V) = I^2R = 9.0\times0.050 = 0.450\ \mathrm{W}$. Reversible (entropic) heat: $-IT(\partial E/\partial T)_p = -3.0\times298.15\times(-1.0\times10^{-4}) = 0.089\ \mathrm{W}$. Total $0.539\ \mathrm{W}$. The reversible term changes sign on charge (it becomes $-0.089\ \mathrm{W}$, cooling), and its sign during discharge depends on the reaction entropy, which varies with state of charge; at low currents it can dominate, which is why calorimetry of cells is a sensitive probe of their thermodynamics.
:::
:::
