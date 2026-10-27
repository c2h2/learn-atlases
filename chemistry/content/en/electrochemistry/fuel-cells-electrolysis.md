Burn hydrogen in oxygen and you get water and heat: $285.8\ \mathrm{kJ}$ per mole, which a heat engine can turn into work only with Carnot's efficiency. Let the same two gases react on either side of a proton-conducting membrane and you get water and electricity, with no flame and no Carnot limit — the electrons are made to do work on their way from hydrogen to oxygen. Run the process backwards, pushing current through water, and you make hydrogen and oxygen from electricity. These two devices, the fuel cell and the electrolyser, are mirror images; together with industrial electrolysis, which produces all the world's aluminium and chlorine and most of its sodium hydroxide, they are where electrochemistry meets energy and industry on the largest scale.

What decides how well they work is almost entirely the subject of [[electrochemistry/electrode-kinetics]]: the reactions involving oxygen are slow, and the catalysts that accelerate them are the expensive part. This chapter starts from the thermodynamics — reversible voltage, thermoneutral voltage and efficiency limits — then analyses the polarisation curve of a fuel cell, the energy cost of electrolytic hydrogen and chlorine, and the principles of electrocatalysis, from Sabatier's principle and volcano plots to the scaling relations that limit oxygen catalysts. Hazards are noted as they arise: hydrogen is extremely flammable and forms explosive mixtures with air over a wide range, chlorine is acutely toxic by inhalation, and concentrated alkali is corrosive; industrial cells are operated under strict process-safety regimes, and laboratory electrolysis needs ventilation, supervision and a risk assessment.

## Thermodynamic limits

::: proposition Reversible and thermoneutral voltages {#prop-voltages}
For the hydrogen–oxygen cell $\mathrm{H_2(g) + \tfrac{1}{2}O_2(g) \rightarrow H_2O}$, with $\nu = 2$, the **reversible voltage** and the **thermoneutral voltage** are
$$
E_\mathrm{rev} = -\frac{\Delta_\mathrm{r}G}{2F}, \qquad E_\mathrm{tn} = -\frac{\Delta_\mathrm{r}H}{2F} .
$$ {#eq-voltages}
At $298.15\ \mathrm{K}$ and standard pressure with liquid water as product, $E^\circ_\mathrm{rev} = 1.229\ \mathrm{V}$ and $E^\circ_\mathrm{tn} = 1.481\ \mathrm{V}$. The maximum (thermodynamic) efficiency of a fuel cell is $\varepsilon_\mathrm{max} = \Delta_\mathrm{r}G/\Delta_\mathrm{r}H = 83.0\,\%$; an electrolyser operating at $E_\mathrm{tn}$ neither absorbs nor rejects heat. With pressures, $E_\mathrm{rev} = E^\circ_\mathrm{rev} + (RT/2F)\ln[(p_{\mathrm{H_2}}/p^\circ)(p_{\mathrm{O_2}}/p^\circ)^{1/2}]$, and $(\partial E_\mathrm{rev}/\partial T)_p = \Delta_\mathrm{r}S/2F = -0.846\ \mathrm{mV\,K^{-1}}$.
:::

::: proof
$E_\mathrm{rev}$ is [[electrochemistry/cell-thermodynamics#prop-dg]] and the pressure dependence is the Nernst equation with $a = p/p^\circ$ for the gases and $a = 1$ for liquid water; the temperature coefficient is [[electrochemistry/cell-thermodynamics#prop-temp]]. With NBS data ($\Delta_\mathrm{f}H^\circ(\mathrm{H_2O,l}) = -285.83\ \mathrm{kJ\,mol^{-1}}$; $S^\circ$ of $\mathrm{H_2O(l)}$, $\mathrm{H_2}$ and $\mathrm{O_2}$: $69.91$, $130.68$, $205.14\ \mathrm{J\,K^{-1}\,mol^{-1}}$), $\Delta_\mathrm{r}S^\circ = 69.91 - 130.68 - 102.57 = -163.34\ \mathrm{J\,K^{-1}\,mol^{-1}}$ and $\Delta_\mathrm{r}G^\circ = -285.83 + 298.15\times0.16334 = -237.13\ \mathrm{kJ\,mol^{-1}}$, giving $1.229\ \mathrm{V}$, $1.481\ \mathrm{V}$ and $237.13/285.83 = 0.830$.

For the thermoneutral statement: an electrolyser at voltage $V$ receives electrical work $2FV$ per mole of water split, and the reaction needs enthalpy $-\Delta_\mathrm{r}H = 2FE_\mathrm{tn}$ (the reverse reaction). By the first law the heat absorbed from the surroundings is $q = -\Delta_\mathrm{r}H - 2FV = 2F(E_\mathrm{tn} - V)$: positive (the cell cools) between $E_\mathrm{rev}$ and $E_\mathrm{tn}$, zero at $E_\mathrm{tn}$, negative (heat is rejected) above it. For the fuel cell running reversibly, the electrical work is $-\Delta_\mathrm{r}G$ and the heat rejected $-T\Delta_\mathrm{r}S$, so the fraction of the enthalpy turned into work is $\Delta_\mathrm{r}G/\Delta_\mathrm{r}H$.
:::

The Carnot comparison is instructive. A heat engine between $1000\ \mathrm{K}$ and $300\ \mathrm{K}$ has a limit of $70\,\%$, below the fuel cell's $83\,\%$ at room temperature; but $\varepsilon_\mathrm{max}$ for the fuel cell *falls* with temperature (because $\Delta_\mathrm{r}S < 0$), while the Carnot limit rises, and above about $1000\,^\circ\mathrm{C}$ (on the LHV basis, with the cold reservoir at $300\ \mathrm{K}$) the Carnot limit is the higher. The real advantage of fuel cells is not a higher ceiling but that their losses are kinetic rather than intrinsic, and decrease at part load.

::: definition Efficiencies of electrochemical energy conversion {#def-efficiency}
For a fuel cell at operating voltage $V$: the **voltage efficiency** is $V/E_\mathrm{rev}$; the **faradaic (current) efficiency** $\varepsilon_\mathrm{F}$ is the fraction of the fuel consumed that produces current (the rest crosses the membrane or is purged); and the **efficiency relative to the heating value** is
$$
\varepsilon = \varepsilon_\mathrm{F}\,\frac{2FV}{-\Delta_\mathrm{r}H} = \varepsilon_\mathrm{F}\,\frac{V}{E_\mathrm{tn}} ,
$$
using the higher heating value (HHV, liquid water, $E_\mathrm{tn} = 1.481\ \mathrm{V}$) or the lower heating value (LHV, water vapour, $\Delta_\mathrm{r}H = -241.82\ \mathrm{kJ\,mol^{-1}}$, $1.253\ \mathrm{V}$). For an electrolyser the ratios are inverted: $\varepsilon = \varepsilon_\mathrm{F}E_\mathrm{tn}/V$ on the HHV basis.
:::

::: example A fuel cell at work {#ex-fuel-cell}
A proton-exchange-membrane fuel cell runs at $80\,^\circ\mathrm{C}$ with pure $\mathrm{H_2}$ and $\mathrm{O_2}$ at $1\ \mathrm{bar}$, producing liquid water. (a) Estimate $E_\mathrm{rev}$ at $80\,^\circ\mathrm{C}$. (b) At $0.70\ \mathrm{V}$ per cell, find the voltage efficiency and the HHV efficiency (faradaic efficiency $1$). (c) How much hydrogen does a stack delivering $1.0\ \mathrm{kW}$ consume per hour?
::: solution
(a) With $\Delta_\mathrm{r}S$ taken as constant, $E_\mathrm{rev}(353\ \mathrm{K}) = 1.229 - 0.846\times10^{-3}\times55\ \mathrm{V} = 1.182\ \mathrm{V}$. (b) $0.70/1.182 = 59\,\%$ of the reversible voltage, and $0.70/1.481 = 47\,\%$ of the HHV. (c) Each cell passes the same current, and the stack power is $P = NVI$ for $N$ cells; hydrogen is consumed at $NI/2F$ mol per second, i.e. $P/(2FV)$ independent of $N$:
$$
\dot n_{\mathrm{H_2}} = \frac{1000\ \mathrm{W}}{2\times96\,485\ \mathrm{C\,mol^{-1}}\times0.70\ \mathrm{V}} = 7.40\times10^{-3}\ \mathrm{mol\,s^{-1}} = 53.7\ \mathrm{g\,h^{-1}} .
$$
The other $53\,\%$ of the hydrogen's heating value — about $1.1\ \mathrm{kW}$ — appears as heat, which must be removed by the cooling circuit. That is the price of operating at a practical current density rather than near $E_\mathrm{rev}$.
:::
:::

## Kinds of fuel cell

All fuel cells combine a fuel electrode (anode), an oxidant electrode (cathode) and an electrolyte that carries ions but not electrons. They differ mainly in the electrolyte, which fixes the operating temperature, the ion that crosses it and the catalysts needed.

| type | electrolyte (ion carried) | temperature | catalyst / notes |
|---|---|---|---|
| proton-exchange membrane (PEMFC) | perfluorosulfonic acid membrane ($\mathrm{H^+}$) | $60$–$90\,^\circ\mathrm{C}$ | Pt on carbon; vehicles, back-up power |
| alkaline (AFC) | KOH solution or anion-exchange membrane ($\mathrm{OH^-}$) | $60$–$200\,^\circ\mathrm{C}$ | Ni, Ag, Pt; Apollo and Space Shuttle; $\mathrm{CO_2}$ forms carbonate |
| phosphoric acid (PAFC) | $\mathrm{H_3PO_4}$ in a matrix ($\mathrm{H^+}$) | about $200\,^\circ\mathrm{C}$ | Pt; stationary combined heat and power |
| molten carbonate (MCFC) | molten $\mathrm{Li_2CO_3/K_2CO_3}$ ($\mathrm{CO_3^{2-}}$) | about $650\,^\circ\mathrm{C}$ | Ni; internal reforming of natural gas |
| solid oxide (SOFC) | yttria-stabilised zirconia ($\mathrm{O^{2-}}$) | $600$–$1000\,^\circ\mathrm{C}$ | Ni–YSZ anode, perovskite cathode; fuel-flexible |

High temperature has two effects: it lowers $E_\mathrm{rev}$ and $\varepsilon_\mathrm{max}$ (thermodynamics), but speeds up the electrode reactions enormously and removes the need for precious metals (kinetics), and the heat rejected is hot enough to be useful. Low-temperature cells start quickly and suit vehicles, but need platinum and pure hydrogen, because carbon monoxide at a few parts per million adsorbs strongly on platinum and poisons it.

In a PEMFC, hydrogen is oxidised at the anode, $\mathrm{H_2 \rightarrow 2H^+ + 2e^-}$, a fast reaction on platinum ($j_0$ about $10^{-3}\ \mathrm{A\,cm^{-2}}$ of real surface); protons cross the hydrated membrane by the Grotthuss and vehicle mechanisms ([[electrochemistry/conductivity]]); and oxygen is reduced at the cathode, $\mathrm{O_2 + 4H^+ + 4e^- \rightarrow 2H_2O}$, a slow reaction even on platinum ($j_0$ of order $10^{-9}\ \mathrm{A\,cm^{-2}}$). The cathode, with its four proton-coupled electron transfers and an O=O bond to break, accounts for most of the voltage loss.

## The polarisation curve

::: proposition The fuel-cell polarisation curve {#prop-polarisation}
The voltage of a fuel cell at current density $j$ is, to a good approximation,
$$
V(j) = E_\mathrm{rev} - b\log_{10}\frac{j}{j_0} - jR_\mathrm{A} + c\ln\left(1 - \frac{j}{j_\mathrm{l}}\right) ,
$$ {#eq-polarisation}
the reversible voltage less a Tafel activation loss (dominated by the cathode, Tafel slope $b$, exchange current density $j_0$), an ohmic loss (area-specific resistance $R_\mathrm{A}$ of membrane and contacts) and a mass-transport loss that diverges as $j$ approaches the limiting current density $j_\mathrm{l}$ (the empirical coefficient $c$ is of order $RT/nF$ times a factor that accounts for the geometry of the gas-diffusion layers). The power density is $P = jV$.
:::

::: proof
Apply [[electrochemistry/batteries#prop-power]]'s loss accounting to each process. The activation term is the cathodic Tafel equation ([[electrochemistry/electrode-kinetics#prop-limits]]) for the oxygen electrode, valid because $j \gg j_0$ at all practical currents; the anode's loss is small because its $j_0$ is six orders of magnitude larger. The ohmic term is Ohm's law for the membrane. For the transport term, if the cathode is Nernstian with respect to the surface concentration of $\mathrm{O_2}$ and that concentration falls linearly with current, $c(0)/c^* = 1 - j/j_\mathrm{l}$ ([[electrochemistry/voltammetry]]), the Nernst equation gives a potential change $(RT/nF)\ln(1 - j/j_\mathrm{l})$; the Tafel kinetics, first order in $\mathrm{O_2}$, add a similar term with $RT/\alpha nF$. Both are collected in the coefficient $c$. The model is empirical in its details — real porous electrodes have distributed reaction zones and water flooding — but captures the three regimes.
:::

::: widget plot
f: E - b*log10(x/10^lj) - RA*x + 0.05*ln(1 - x/jl); x*(E - b*log10(x/10^lj) - RA*x + 0.05*ln(1 - x/jl))
x: 0.001, 1.99
y: 0, 1.25
sliders: E=1.18:1:1.23:0.001; b=0.06:0.03:0.12:0.005; lj=-6:-9:-3:0.1; RA=0.1:0:0.4:0.01; jl=1.6:0.8:2:0.05
labels: V\ (\mathrm{V}); P\ (\mathrm{W\,cm^{-2}})
caption: Polarisation curve [[#eq-polarisation]] and power density of a hydrogen fuel cell against current density $j$ in $\mathrm{A\,cm^{-2}}$ ($x$). Sliders: reversible voltage $E$, Tafel slope $b$ (V per decade), $\log_{10}$ of the effective exchange current density $j_0$ (in $\mathrm{A\,cm^{-2}}$), area-specific resistance $R_\mathrm{A}$ ($\Omega\,\mathrm{cm^2}$) and limiting current density $j_\mathrm{l}$. Three regions are visible: a steep initial drop (activation, a few hundred millivolts even at tiny currents), a long straight middle (ohmic), and a final plunge (mass transport). Raise $j_0$ by a decade — a better catalyst — and the whole curve rises by one Tafel slope; halve $R_\mathrm{A}$ and the peak power rises markedly. Operating points are chosen to the left of the power maximum for efficiency.
:::

::: warning Open-circuit voltage is not the reversible voltage {#warn-ocv}
A real PEM fuel cell at open circuit typically reads $0.95$–$1.0\ \mathrm{V}$, not the $1.18\ \mathrm{V}$ thermodynamics predicts at $80\,^\circ\mathrm{C}$. The cell is not at equilibrium even with no external current: a little hydrogen diffuses through the membrane and is oxidised directly at the cathode, and platinum oxide formation and impurities create mixed potentials ([[electrochemistry/corrosion]] uses the same idea). Because the oxygen electrode's exchange current is so small, even a crossover current of a few $\mathrm{mA\,cm^{-2}}$ costs over $0.2\ \mathrm{V}$ on the Tafel line. A low open-circuit voltage is therefore no evidence of an error in the thermodynamic calculation, and a voltage efficiency should always be computed against $E_\mathrm{rev}$, not against the measured open-circuit value.
:::

## Electrolysis of water

An electrolyser reverses the fuel cell: $\mathrm{H_2O \rightarrow H_2 + \tfrac{1}{2}O_2}$. Three technologies are in use. **Alkaline** electrolysers use $25$–$30\,\%$ KOH with nickel-based electrodes and a porous separator, and are the mature, low-cost option. **PEM** electrolysers use a proton-exchange membrane with iridium oxide anodes and platinum cathodes; they reach high current densities and respond quickly to fluctuating renewable power, but use scarce iridium. **Solid-oxide** electrolysers run at $700$–$850\,^\circ\mathrm{C}$, where part of the energy can be supplied as heat ($E_\mathrm{rev}$ falls with temperature while $E_\mathrm{tn}$ for steam stays near $1.29\ \mathrm{V}$), giving the highest electrical efficiency. In all of them the main kinetic loss is at the oxygen-evolving anode.

::: example The electricity cost of hydrogen {#ex-electrolyser}
An electrolyser operates at $1.80\ \mathrm{V}$ per cell with $100\,\%$ faradaic efficiency. Find the electrical energy consumed per kilogram of hydrogen, the HHV efficiency, and the minimum energy at the thermoneutral voltage.
::: solution
One kilogram of $\mathrm{H_2}$ is $1000/2.016 = 496.0\ \mathrm{mol}$, each needing $2F$ of charge. At $1.80\ \mathrm{V}$:
$$
W = 496.0\times2\times96\,485\times1.80\ \mathrm{J} = 1.723\times10^{8}\ \mathrm{J} = 47.9\ \mathrm{kWh\ per\ kg} .
$$
The HHV efficiency is $1.481/1.80 = 82\,\%$. At $E_\mathrm{tn} = 1.481\ \mathrm{V}$ the electrical energy is $39.4\ \mathrm{kWh\,kg^{-1}}$ (the higher heating value of hydrogen), and in principle electrolysis at $1.229\ \mathrm{V}$ needs only $32.7\ \mathrm{kWh}$ of electricity per kilogram, the rest being supplied as heat from the surroundings — but at a vanishingly small rate. Commercial systems, including compression and balance of plant, consume about $50$–$55\ \mathrm{kWh\,kg^{-1}}$ (as of 2026). For context, world hydrogen production is close to $100$ million tonnes a year, made overwhelmingly from natural gas and coal, with less than $1\,\%$ from low-emission routes such as electrolysis using renewable or nuclear electricity (IEA *Global Hydrogen Review*, as of 2026).
:::
:::

## Chlorine and caustic soda

The **chlor-alkali process** electrolyses brine:
$$
2\mathrm{NaCl(aq)} + 2\mathrm{H_2O(l)} \rightarrow \mathrm{Cl_2(g)} + \mathrm{H_2(g)} + 2\mathrm{NaOH(aq)} .
$$
Chlorine is evolved at the anode and hydrogen at the cathode, and the sodium hydroxide formed in the cathode compartment must be kept from the chlorine, with which it would react to give hypochlorite. Three generations of cell solve this differently: the mercury cell (Castner and Kellner, 1890s), in which sodium amalgam forms at a flowing mercury cathode and is decomposed separately; the diaphragm cell, with an asbestos (later polymer) diaphragm; and the **membrane cell** (from the 1970s), in which a cation-exchange membrane passes $\mathrm{Na^+}$ but blocks $\mathrm{OH^-}$ and $\mathrm{Cl^-}$, giving pure, concentrated NaOH. Mercury cells have been phased out in Europe and are being eliminated under the Minamata Convention on Mercury because of mercury emissions.

::: example Voltage and energy of the chlor-alkali cell {#ex-chlor-alkali}
Find the reversible voltage of the membrane cell, taking the anode reaction $\mathrm{Cl_2 + 2e^- \rightleftharpoons 2Cl^-}$ ($E^\circ = 1.358\ \mathrm{V}$) and the cathode reaction $2\mathrm{H_2O + 2e^- \rightleftharpoons H_2 + 2OH^-}$ ($E^\circ = -0.828\ \mathrm{V}$), with all activities unity. A cell operates at $3.0\ \mathrm{V}$ with $100\,\%$ current efficiency; find the electrical energy per tonne of chlorine.
::: solution
$E_\mathrm{rev} = 1.358 - (-0.828) = 2.186\ \mathrm{V}$ (real brine and caustic concentrations change this by a few tens of millivolts). Per tonne of $\mathrm{Cl_2}$, $10^{6}/70.90 = 1.410\times10^{4}\ \mathrm{mol}$, each needing $2F$:
$$
W = 1.410\times10^{4}\times2\times96\,485\times3.0\ \mathrm{J} = 8.17\times10^{9}\ \mathrm{J} = 2.27\times10^{3}\ \mathrm{kWh} .
$$
About $0.8\ \mathrm{V}$ of the operating voltage is overpotential and ohmic loss in electrolyte and membrane. Multiplied by tens of millions of tonnes a year, the chlor-alkali industry is one of the largest consumers of electricity in the chemical sector, so each $0.1\ \mathrm{V}$ saved by better electrodes or membranes is worth an industrial effort.
:::
:::

A puzzle hides in the anode. Oxygen evolution from water, $E^\circ = 1.229\ \mathrm{V}$, is thermodynamically easier than chlorine evolution, $1.358\ \mathrm{V}$; why does the anode give chlorine? Because the oxygen reaction, requiring four electrons and the formation of an O=O bond, has a far smaller exchange current density than the two-electron chlorine reaction on the anodes used — ruthenium and titanium oxides on titanium, the **dimensionally stable anodes** invented by Henri Beer in the 1960s. At the operating current density, chlorine evolution needs the smaller total potential. The selectivity is kinetic, and it is a design objective: a few per cent of oxygen in the chlorine is both an efficiency loss and a safety concern.

## Aluminium: electrolysis in molten salt

The largest single electrochemical industry by energy is the **Hall–Héroult process**, which makes all primary aluminium. Alumina is dissolved at about $5\,\%$ by mass in molten cryolite ($\mathrm{Na_3AlF_6}$) at about $960\,^\circ\mathrm{C}$, and electrolysed between a carbon anode and the pool of molten aluminium that forms the cathode. The anode is consumed: oxide ions are discharged on carbon to give mainly carbon dioxide,
$$
2\mathrm{Al_2O_3} + 3\mathrm{C} \rightarrow 4\mathrm{Al(l)} + 3\mathrm{CO_2(g)} ,
$$
so the carbon acts as a chemical reductant and lowers the reversible decomposition voltage from about $2.2\ \mathrm{V}$ (for $\mathrm{Al_2O_3} \rightarrow 2\mathrm{Al} + \tfrac{3}{2}\mathrm{O_2}$) to about $1.2\ \mathrm{V}$ at the operating temperature. Real cells run at about $4.0$–$4.5\ \mathrm{V}$ and $90$–$95\,\%$ current efficiency. The largest part of the excess voltage is the ohmic drop across the few centimetres of molten electrolyte between the electrodes, and that resistive heating is not wasted: it keeps the bath molten. The rest is anode overpotential and the voltage drops in the conductors.

Per kilogram of aluminium, $3F$ of charge per $26.98\ \mathrm{g}$ at $4.2\ \mathrm{V}$ and $95\,\%$ current efficiency is
$$
\frac{1000}{26.98}\times\frac{3\times96\,485\times4.2}{0.95}\ \mathrm{J} = 4.74\times10^{7}\ \mathrm{J} \approx 13\ \mathrm{kWh} ,
$$
in line with modern smelters (about $13$–$15\ \mathrm{kWh\,kg^{-1}}$ as of 2026). This is why aluminium smelters are built beside cheap hydroelectric or other large power supplies, and why recycling aluminium, which needs only about $5\,\%$ of that energy, is so valuable. Fluoride emissions and the carbon dioxide from the anodes ($1.22\ \mathrm{kg}$ per kilogram of aluminium from the anode reaction stoichiometry, somewhat more in practice) are the process's main environmental burdens; inert anodes that would evolve oxygen instead are under development. The same molten-salt principle is used for sodium, lithium and magnesium, metals too reactive to be deposited from water.

## Electrocatalysis

An **electrocatalyst** is an electrode material that increases the rate of an electrode reaction at a given potential without being consumed — equivalently, that lowers the overpotential needed for a given current. The reactions that matter most — hydrogen evolution and oxidation, oxygen reduction and evolution, chlorine evolution, $\mathrm{CO_2}$ and $\mathrm{N_2}$ reduction — all proceed through adsorbed intermediates, so the catalyst's job is to bind those intermediates neither too strongly nor too weakly: Sabatier's principle ([[kinetics/surface-kinetics]]).

### Volcano plots and the computational hydrogen electrode

For hydrogen evolution the single intermediate is adsorbed H, and a convenient descriptor is its Gibbs energy of adsorption, $\Delta G_{\mathrm{H}^*}$, relative to $\tfrac{1}{2}\mathrm{H_2}$. Trasatti (1972) plotted measured $\log j_0$ against metal–hydrogen bond energies and found a volcano; Nørskov and co-workers (2005) reproduced it with $\Delta G_{\mathrm{H}^*}$ from density-functional calculations. A simple kinetic model in which the rate is proportional to the fraction of sites that are neither empty nor blocked gives $j_0 \propto 1/[1 + \exp(|\Delta G_{\mathrm{H}^*}|/k_\mathrm{B}T)]$, maximal at $\Delta G_{\mathrm{H}^*} = 0$.

::: widget plot
f: lk - log10(1 + exp(abs(x)/0.0257))
x: -0.8, 0.8
y: -16, 0
sliders: lk=-2:-4:0:0.1
labels: \log_{10}j_0\ (\text{model})
vlines: 0
caption: A model volcano for hydrogen evolution: $\log_{10}$ of the exchange current density against the adsorption Gibbs energy of hydrogen $\Delta G_{\mathrm{H}^*}$ in eV ($x$), with $\mathrm{lk}$ the $\log_{10}$ of the rate prefactor. On the left (strong binding: Ni, Co, W, Mo) the surface is covered with H atoms that are hard to remove; on the right (weak binding: Au, Ag, Cu, and further out Pb, Hg) H is hard to adsorb in the first place. Platinum sits close to the top, with $\Delta G_{\mathrm{H}^*}$ within about $0.1\ \mathrm{eV}$ of zero. Each $0.06\ \mathrm{eV}$ of misplacement costs a decade in $j_0$ at room temperature, so a $0.7\ \mathrm{eV}$ misplacement (lead) costs about twelve decades — consistent with the measured spread of [[electrochemistry/electrode-kinetics]].
:::

::: proposition Limiting potential of a multistep electrode reaction {#prop-limiting-potential}
Suppose an electrode reaction proceeds through $N$ consecutive proton–electron transfer steps, step $i$ having Gibbs energy change $\Delta G_i$ at electrode potential $U = 0$ on the reversible hydrogen electrode (RHE) scale. If each step transfers one electron *from* the electrode (an oxidation), then at potential $U$ its Gibbs energy change is $\Delta G_i(U) = \Delta G_i - eU$, and all steps are downhill once
$$
U \geq U_\mathrm{L} = \frac{\max_i\Delta G_i}{e} ;
$$
for a reduction, $\Delta G_i(U) = \Delta G_i + eU$ and all steps are downhill for $U \leq U_\mathrm{L} = -\max_i\Delta G_i/e$. The **thermodynamic overpotential** is the difference between $U_\mathrm{L}$ and the equilibrium potential of the overall reaction. For an ideal catalyst all steps have the same $\Delta G_i$, equal to $eE_\mathrm{eq}$ for an oxidation.
:::

::: proof
In each step a proton and an electron are released, $\mathrm{A^* \rightarrow B^* + H^+ + e^-}$. On the RHE scale, $\mathrm{H^+ + e^-}$ at potential $U$ has the same Gibbs energy as $\tfrac{1}{2}\mathrm{H_2}$ less $eU$ — this is the definition of the hydrogen electrode, shifted by the electrical energy of the electron (the "computational hydrogen electrode" of Nørskov and co-workers). So $\Delta G_i(U) = \Delta G_i(0) - eU$ for an oxidation step. The reaction can proceed without any uphill step only when every $\Delta G_i(U) \leq 0$, which requires $eU \geq \max_i\Delta G_i$. For a reduction, the electron is consumed, the sign of $eU$ reverses, and every step must satisfy $\Delta G_i + eU \leq 0$. The sum of the $\Delta G_i$ is fixed by the overall reaction (for $\mathrm{2H_2O \rightarrow O_2 + 4H^+ + 4e^-}$ it is $4\times1.23 = 4.92\ \mathrm{eV}$), so the largest step cannot be smaller than the average; the minimum $U_\mathrm{L}$ equals $E_\mathrm{eq}$ only if all steps are equal. This is a thermodynamic criterion; activation barriers come on top.
:::

::: example Why oxygen evolution needs an overpotential {#ex-oer}
Oxygen evolution on an oxide surface is modelled by four steps through adsorbed $\mathrm{OH^*}$, $\mathrm{O^*}$ and $\mathrm{OOH^*}$. For many oxides, density-functional calculations find that the adsorption energies of $\mathrm{OH^*}$ and $\mathrm{OOH^*}$, which both bind through one oxygen atom, are linked by a **scaling relation**: $\Delta G_{\mathrm{OOH}^*} - \Delta G_{\mathrm{OH}^*} \approx 3.2\ \mathrm{eV}$, whatever the material. Show that this implies a minimum thermodynamic overpotential of about $0.37\ \mathrm{V}$.
::: solution
The two middle steps, $\mathrm{OH^* \rightarrow O^* + H^+ + e^-}$ and $\mathrm{O^* + H_2O \rightarrow OOH^* + H^+ + e^-}$, together take the surface from $\mathrm{OH^*}$ to $\mathrm{OOH^*}$, so their Gibbs energies add to $\Delta G_{\mathrm{OOH}^*} - \Delta G_{\mathrm{OH}^*} = 3.2\ \mathrm{eV}$. The best a material can do is split this equally, $1.6\ \mathrm{eV}$ each, so $\max\Delta G_i \geq 1.6\ \mathrm{eV}$ and, by [[#prop-limiting-potential]], $U_\mathrm{L} \geq 1.6\ \mathrm{V}$. The ideal catalyst would have every step at $1.23\ \mathrm{eV}$ (since $2\times1.23 = 2.46 < 3.2$, the scaling relation forbids it), and the minimum thermodynamic overpotential is $1.6 - 1.23 = 0.37\ \mathrm{V}$. The best real catalysts — iridium and ruthenium oxides in acid, nickel–iron oxyhydroxides in alkali — operate at about $0.3$–$0.4\ \mathrm{V}$ overpotential at $10\ \mathrm{mA\,cm^{-2}}$, close to this bound. Breaking the scaling relation, by stabilising $\mathrm{OOH^*}$ selectively or by mechanisms that do not pass through it (lattice-oxygen participation, dual sites), is an active research goal.
:::
:::

::: quiz
A new hydrogen-evolution catalyst has $\Delta G_{\mathrm{H}^*} = -0.30\ \mathrm{eV}$. Which change is most likely to increase its activity?
- [ ] Strengthening the metal–hydrogen bond further, so that more H is adsorbed
- [x] Weakening the metal–hydrogen bond towards $\Delta G_{\mathrm{H}^*} \approx 0$, for instance by alloying or strain
- [ ] Raising the overpotential, which moves the catalyst up the volcano
- [ ] Nothing: activity depends only on surface area
::: solution
On the strong-binding side of the volcano the surface is saturated with H, and the rate is limited by removing it; weakening the bond moves the catalyst towards the peak. Overpotential increases the current on any catalyst but does not change its intrinsic activity ($j_0$, or current per unit real area at fixed $\eta$). Surface area multiplies the current but cannot compensate for orders of magnitude in intrinsic activity, and comparisons between catalysts should be normalised to it.
:::
:::

Platinum's scarcity drives most of the practical work: fuel-cell cathodes use platinum (or platinum–nickel and platinum–cobalt alloys, whose compressed surface lattice weakens oxygen binding slightly, moving them nearer the top of the oxygen-reduction volcano) as nanoparticles a few nanometres across on carbon supports, at loadings of a few tenths of a milligram per square centimetre, and research targets platinum-free catalysts such as iron–nitrogen-doped carbons. Activity must be reported carefully: as **mass activity** (current per milligram of precious metal at a stated potential, typically $0.9\ \mathrm{V}$ on the RHE scale for oxygen reduction) and **specific activity** (per unit real surface area), measured by rotating-disc methods that remove mass-transport effects ([[electrochemistry/voltammetry#prop-levich]]). **Stability** is the other half: platinum dissolves and coarsens under the potential cycling of a vehicle, and carbon supports corrode above about $1\ \mathrm{V}$ during start-up and shut-down.

::: history From Grove's gas battery to computational catalysts {#hist-fuel-cells}
William Nicholson and Anthony Carlisle electrolysed water with a voltaic pile within weeks of Volta's 1800 announcement. Christian Friedrich Schönbein (1838) observed the current from hydrogen and oxygen on platinum, and William Grove built his "gas voltaic battery" from the same principle in 1839–1842. Ludwig Mond and Carl Langer coined the term *fuel cell* in 1889. Hamilton Castner and Karl Kellner developed the mercury chlor-alkali cell in the 1890s, and Charles Martin Hall and Paul Héroult independently invented the molten-salt electrolysis of alumina in 1886. Francis Thomas Bacon demonstrated a $5\ \mathrm{kW}$ alkaline fuel cell in 1959, the design adapted for the Apollo spacecraft; Willard Grubb and Leonard Niedrach at General Electric developed the proton-exchange membrane fuel cell, flown on Gemini in the 1960s. Henri Beer's dimensionally stable anodes (1960s) and the membrane chlor-alkali cell (commercialised in the 1970s) transformed industrial electrolysis. Sergio Trasatti's volcano plot (1972) and the density-functional descriptors of Jens Nørskov and co-workers (2004–2005) gave electrocatalysis its modern design principles.
:::

## Where this leads

Fuel cells and electrolysers complete the energy-conversion picture begun with [[electrochemistry/batteries]]: a battery stores energy in its electrodes, a fuel cell converts an external fuel, an electrolyser stores electrical energy as a fuel. Their materials — membranes, oxide electrolytes, nanostructured catalysts — belong to [[materials-chemistry]]. The kinetic analysis of mixed reactions on a single electrode, which explains the low open-circuit voltage of a PEM fuel cell, is the heart of [[electrochemistry/corrosion]], where the "fuel" is the metal itself. The catalytic principles connect to heterogeneous catalysis in [[kinetics/surface-kinetics]] and to industrial chemistry, where the Haber–Bosch, contact and chlor-alkali processes sit side by side.

::: summary
- For $\mathrm{H_2 + \tfrac{1}{2}O_2 \rightarrow H_2O(l)}$, $E^\circ_\mathrm{rev} = 1.229\ \mathrm{V}$ and the thermoneutral voltage is $1.481\ \mathrm{V}$; the maximum fuel-cell efficiency $\Delta_\mathrm{r}G/\Delta_\mathrm{r}H$ is $83\,\%$ at $25\,^\circ\mathrm{C}$ and falls with temperature.
- Practical efficiencies are voltage efficiency times faradaic efficiency, quoted against $E_\mathrm{rev}$ or the heating value (HHV or LHV); a fuel cell at $0.7\ \mathrm{V}$ converts under half the HHV into work.
- Fuel cells are classified by electrolyte (PEM, alkaline, phosphoric acid, molten carbonate, solid oxide); temperature trades thermodynamic voltage against kinetics and catalyst cost.
- The polarisation curve shows activation (Tafel, dominated by oxygen reduction), ohmic and mass-transport losses; power peaks before the transport limit.
- Electrolysers need $\ge 1.48\ \mathrm{V}$ for heat-neutral operation; at $1.8\ \mathrm{V}$ hydrogen costs $48\ \mathrm{kWh\,kg^{-1}}$. Chlor-alkali cells run near $3\ \mathrm{V}$ against $2.19\ \mathrm{V}$ reversible, with chlorine selectivity over oxygen achieved kinetically.
- Electrocatalysis follows Sabatier's principle: volcano plots against adsorption energies, limiting potentials from the largest step, and scaling relations that impose about $0.37\ \mathrm{V}$ minimum overpotential on oxygen evolution.
:::

## Exercises

::: exercise Hydrogen for one ampere-hour {level=1 check="37.6"}
What mass of hydrogen is consumed by a fuel cell delivering $1.00\ \mathrm{A}$ for $1.00\ \mathrm{h}$ with $100\,\%$ faradaic efficiency? (Enter the mass in mg.)
::: solution
$Q = 3600\ \mathrm{C}$; $n(\mathrm{H_2}) = Q/2F = 3600/192\,970 = 0.01866\ \mathrm{mol}$; mass $= 0.01866\times2.016\ \mathrm{g} = 37.6\ \mathrm{mg}$. The answer is independent of the cell voltage: charge counts molecules, voltage counts energy.
:::
:::

::: exercise Thermoneutral voltage {level=1 check="1.481"}
From $\Delta_\mathrm{f}H^\circ(\mathrm{H_2O,l}) = -285.83\ \mathrm{kJ\,mol^{-1}}$, compute the thermoneutral voltage for water electrolysis at $25\,^\circ\mathrm{C}$. (Enter it in V.)
::: solution
$E_\mathrm{tn} = -\Delta_\mathrm{r}H/2F = 285\,830/(2\times96\,485)\ \mathrm{V} = 1.481\ \mathrm{V}$. Below this voltage (but above $1.229\ \mathrm{V}$) an electrolyser absorbs heat; above it, it rejects heat.
:::
:::

::: exercise Voltage efficiency {level=1 check="52.9"}
A fuel cell operates at $0.65\ \mathrm{V}$ at $25\,^\circ\mathrm{C}$. What is its voltage efficiency relative to $E^\circ_\mathrm{rev}$? (Enter it in per cent.)
::: solution
$0.65/1.229 = 0.529$, i.e. $52.9\,\%$. Relative to the HHV it is $0.65/1.481 = 43.9\,\%$.
:::
:::

::: exercise Pressurised air {level=2 check="1.240"}
Find the reversible voltage at $25\,^\circ\mathrm{C}$ of a hydrogen–air cell with $\mathrm{H_2}$ at $3.0\ \mathrm{bar}$ and air at $3.0\ \mathrm{bar}$ (oxygen mole fraction $0.21$), producing liquid water. (Enter $E_\mathrm{rev}$ in V.)
::: solution
$p_{\mathrm{O_2}} = 0.63\ \mathrm{bar}$. $E = 1.229 + \dfrac{0.025693}{2}\ln\left(3.0\times0.63^{1/2}\right) = 1.229 + 0.012847\times\ln2.381 = 1.229 + 0.0111 = 1.240\ \mathrm{V}$. Pressurisation gains only $11\ \mathrm{mV}$ thermodynamically; its main benefit is kinetic and transport-related (higher oxygen concentration at the catalyst), offset by the energy needed to drive the compressor.
:::
:::

::: exercise Output of an electrolyser stack {level=2 check="7.37"}
A PEM electrolyser stack has $100$ cells of active area $1000\ \mathrm{cm^2}$, run at $2.0\ \mathrm{A\,cm^{-2}}$ with $98\,\%$ faradaic efficiency. Find the hydrogen production rate. (Enter it in $\mathrm{kg\,h^{-1}}$.)
::: solution
Each cell carries $I = 2.0\times1000 = 2000\ \mathrm{A}$; the cells are in series, so each produces hydrogen at $\varepsilon_\mathrm{F}I/2F$. Total: $100\times0.98\times2000/(2\times96\,485) = 1.016\ \mathrm{mol\,s^{-1}}$, i.e. $1.016\times2.016\times3600/1000 = 7.37\ \mathrm{kg\,h^{-1}}$. At $1.9\ \mathrm{V}$ per cell the stack would draw $380\ \mathrm{kW}$.
:::
:::

::: exercise Energy for chlorine {level=2 check="2467"}
A membrane chlor-alkali cell operates at $3.10\ \mathrm{V}$ with $95\,\%$ current efficiency for chlorine. Find the electrical energy per tonne of $\mathrm{Cl_2}$. (Enter it in kWh.)
::: solution
Charge needed per tonne at $100\,\%$: $(10^{6}/70.90)\times2F = 2.722\times10^{9}\ \mathrm{C}$; at $95\,\%$ current efficiency, $2.865\times10^{9}\ \mathrm{C}$. Energy $= 2.865\times10^{9}\times3.10\ \mathrm{J} = 8.88\times10^{9}\ \mathrm{J} = 2467\ \mathrm{kWh}$. The lost $5\,\%$ of charge goes mostly to oxygen evolution and to back-migration of hydroxide through the membrane.
:::
:::

::: exercise A better catalyst {level=2 check="0.12"}
A fuel-cell cathode follows a Tafel line with $b = 0.060\ \mathrm{V}$ per decade. A new catalyst raises the effective exchange current density by a factor of $100$ at the same loading. By how much does the cell voltage rise at a fixed current density, all else unchanged? (Enter the gain in V.)
::: solution
The activation loss is $b\log_{10}(j/j_0)$; multiplying $j_0$ by $100$ lowers it by $b\log_{10}100 = 0.060\times2 = 0.12\ \mathrm{V}$ at every current density in the Tafel region. On a cell at $0.70\ \mathrm{V}$ this is a $17\,\%$ efficiency gain — the reason a hundredfold activity improvement is the headline target of catalyst research.
:::
:::

::: exercise Limiting potential for oxygen reduction {level=3 check="0.38"}
A computational study gives the Gibbs energy changes, at $U = 0$ on the RHE scale, for the four steps of oxygen reduction on a metal surface: $\mathrm{O_2 + H^+ + e^- \rightarrow OOH^*}$, $-0.85\ \mathrm{eV}$; $\mathrm{OOH^* + H^+ + e^- \rightarrow O^* + H_2O}$, $-1.75\ \mathrm{eV}$; $\mathrm{O^* + H^+ + e^- \rightarrow OH^*}$, $-1.30\ \mathrm{eV}$; $\mathrm{OH^* + H^+ + e^- \rightarrow H_2O}$, $-1.02\ \mathrm{eV}$. Check that they sum correctly, find the limiting potential, and the thermodynamic overpotential. (Enter the overpotential in V.)
::: hint
For a reduction, each step's Gibbs energy at potential $U$ is $\Delta G_i + eU$.
:::
::: solution
Sum: $-0.85 - 1.75 - 1.30 - 1.02 = -4.92\ \mathrm{eV} = -4\times1.23\ \mathrm{eV}$, as required for $\mathrm{O_2 + 4H^+ + 4e^- \rightarrow 2H_2O}$. At potential $U$ every step must satisfy $\Delta G_i + eU \le 0$; the least exergonic step, the first ($-0.85\ \mathrm{eV}$), fixes $U_\mathrm{L} = 0.85\ \mathrm{V}$. The overpotential is $1.23 - 0.85 = 0.38\ \mathrm{V}$. To improve this surface one would strengthen $\mathrm{OOH^*}$ binding (making step 1 more exergonic) — but by the scaling relation this also strengthens $\mathrm{OH^*}$, making the last step less exergonic. Platinum sits near the optimum compromise, with a computed limiting potential of about $0.8\ \mathrm{V}$.
:::
:::

::: exercise A solid-oxide cell {level=3 check="1.006"}
Estimate the reversible voltage of a solid-oxide fuel cell at $800\,^\circ\mathrm{C}$ producing water vapour from $\mathrm{H_2}$ and $\mathrm{O_2}$ at $1\ \mathrm{bar}$, using $\Delta_\mathrm{f}H^\circ(\mathrm{H_2O,g}) = -241.82\ \mathrm{kJ\,mol^{-1}}$ and $S^\circ(\mathrm{H_2O,g}) = 188.83\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (other data as in [[#prop-voltages]]), assuming $\Delta_\mathrm{r}H$ and $\Delta_\mathrm{r}S$ independent of temperature. Compare $\varepsilon_\mathrm{max}$ (LHV basis) with the value at $25\,^\circ\mathrm{C}$. (Enter $E_\mathrm{rev}$ in V.)
::: solution
$\Delta_\mathrm{r}S^\circ = 188.83 - 130.68 - \tfrac{1}{2}(205.14) = -44.42\ \mathrm{J\,K^{-1}\,mol^{-1}}$. At $T = 1073.15\ \mathrm{K}$, $\Delta_\mathrm{r}G \approx -241.82 + 1073.15\times0.04442 = -194.15\ \mathrm{kJ\,mol^{-1}}$, so $E_\mathrm{rev} = 194\,150/(2\times96\,485) = 1.006\ \mathrm{V}$ (tabulated $\Delta_\mathrm{r}G$ at $1073\ \mathrm{K}$, including heat-capacity effects, gives about $0.98\ \mathrm{V}$). $\varepsilon_\mathrm{max} = 194.15/241.82 = 80\,\%$ (LHV), against $228.6/241.82 = 95\,\%$ for vapour at $25\,^\circ\mathrm{C}$. The thermodynamic ceiling falls, but at $800\,^\circ\mathrm{C}$ the electrode kinetics are so fast that a solid-oxide cell can operate within $0.2$–$0.3\ \mathrm{V}$ of $E_\mathrm{rev}$ without precious metals, and its hot exhaust can drive a turbine — combined systems exceed $60\,\%$ electrical efficiency.
:::
:::
