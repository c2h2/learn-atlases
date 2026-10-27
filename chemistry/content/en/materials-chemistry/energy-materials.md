The transition away from fossil fuels is, to a large extent, a problem in materials chemistry. A lithium-ion battery is two crystalline hosts that exchange lithium ions through an electrolyte; its energy is set by the difference in the chemical potential of lithium between the hosts, its capacity by how many ions each host can take up per gram, and its life by how well the structures survive repeated insertion. A solar cell is a semiconductor whose band gap and defect chemistry decide what fraction of sunlight becomes electrical work. A thermoelectric generator must conduct electricity like a metal and heat like a glass. A superconducting magnet in a hospital scanner relies on a material whose resistance is exactly zero. Each technology is limited by a few material properties that chemists can understand and, increasingly, design.

This chapter brings together the earlier chapters of the course. Structures from [[materials-chemistry/crystal-structures]], defect equilibria and ionic conduction from [[materials-chemistry/defects]], and bands, doping and junctions from [[materials-chemistry/electronic-structure-solids]] are applied to four classes of energy material: **battery electrodes and electrolytes**, **photovoltaic absorbers**, **thermoelectrics** and **superconductors**. The cell thermodynamics and the engineering of batteries and fuel cells are treated in [[electrochemistry/batteries]] and [[electrochemistry/fuel-cells-electrolysis]]; here the emphasis is on the solids.

## Intercalation electrodes for lithium-ion batteries

A lithium-ion cell stores energy by moving lithium between two **intercalation** (insertion) hosts. During discharge, lithium leaves the negative electrode (usually graphite, $\mathrm{LiC_6}$ when full) as $\mathrm{Li^+}$ plus an electron; the ion crosses the electrolyte and the electron the external circuit, and both enter the positive electrode, for example $\mathrm{Li_{1-x}CoO_2}$, where the electron reduces a transition-metal ion:
$$
\mathrm{Li_{1-x}CoO_2} + \mathrm{Li}_x\mathrm{C_6} \rightarrow \mathrm{LiCoO_2} + \mathrm{C_6}.
$$
Neither host's framework is destroyed; the reaction is **topotactic**, and the electrodes are mixed ionic–electronic conductors. Three structure types dominate positive electrodes. **Layered** oxides $\mathrm{LiMO_2}$ ($\mathrm{M} = \mathrm{Co}$, or Ni/Mn/Co mixtures "NMC", or Ni/Co/Al "NCA") have the ordered rock salt structure of [[materials-chemistry/crystal-structures]], with lithium in octahedral sites between $\mathrm{MO_2}$ sheets and two-dimensional diffusion paths. The **spinel** $\mathrm{LiMn_2O_4}$ has lithium in tetrahedral sites and three-dimensional channels. The **olivine** $\mathrm{LiFePO_4}$ has one-dimensional channels and strong P–O bonds that hold oxygen firmly, making it thermally safe but poorly conducting, so it is used as carbon-coated nanoparticles ([[materials-chemistry/nanomaterials]]).

::: proposition Cell voltage from lithium chemical potentials {#prop-cell-voltage}
The open-circuit voltage of a cell that transfers lithium between a negative electrode (anode on discharge) and a positive electrode (cathode) is
$$
E = -\frac{\mu_\mathrm{Li}^\mathrm{cathode} - \mu_\mathrm{Li}^\mathrm{anode}}{F},
$$ {#eq-voltage}
where $\mu_\mathrm{Li}$ is the chemical potential of lithium (as $\mathrm{Li^+} + e^-$) in each electrode. If an electrode reacts by a **two-phase** mechanism (two phases of fixed composition coexist, as $\mathrm{FePO_4}$ and $\mathrm{LiFePO_4}$), $\mu_\mathrm{Li}$ is constant and the voltage is flat; if it forms a **solid solution** ($\mathrm{Li}_x\mathrm{CoO_2}$ over $0.5 < x < 1$), $\mu_\mathrm{Li}$ varies with $x$ and the voltage slopes. The result assumes equilibrium (no current, no overpotential).
:::

::: proof
Discharging the cell by transferring $dn$ moles of lithium from anode to cathode changes the Gibbs energy by $dG = (\mu_\mathrm{Li}^\mathrm{cathode} - \mu_\mathrm{Li}^\mathrm{anode})\,dn$. The maximum electrical work at constant $T$ and $p$ is $-dG$, and the charge passed is $F\,dn$, so $E\,F\,dn = -dG$, giving [[#eq-voltage]] ([[electrochemistry/cell-thermodynamics]]). For a two-phase electrode at constant $T$ and $p$, the Gibbs phase rule for a two-component system (Li and the host) with two phases leaves $F' = C - P + 2 - 2 = 0$ degrees of freedom at fixed $T$ and $p$: the composition of each phase, and hence $\mu_\mathrm{Li}$, is fixed while the proportions of the phases change. For a single solid-solution phase there is one degree of freedom, the composition $x$, and $\mu_\mathrm{Li}(x)$ varies; with ideal mixing of Li and vacancies on the sites, $\mu_\mathrm{Li} = \mu^\circ + RT\ln[x/(1 - x)]$, a sigmoidal voltage curve.
:::

The voltage reflects the energy of the redox couple in the host relative to lithium metal. In oxides, $\mathrm{Co^{4+}/Co^{3+}}$ lies about $4\ \mathrm{V}$ below Li; in phosphates, the **inductive effect** of the $\mathrm{PO_4^{3-}}$ group (strong P–O covalency weakens Fe–O covalency and lowers the energy of the $\mathrm{Fe^{3+}/Fe^{2+}}$ level) raises the $\mathrm{Fe^{3+}/Fe^{2+}}$ voltage from about $2.5\ \mathrm{V}$ in iron oxides to $3.45\ \mathrm{V}$ in $\mathrm{LiFePO_4}$. Graphite operates at $0.1$–$0.2\ \mathrm{V}$ above Li metal, close enough to give a high cell voltage but far enough to reduce the risk of lithium plating.

::: definition Theoretical specific capacity {#def-capacity}
The **theoretical specific capacity** of an electrode material that reversibly exchanges $n$ moles of electrons (and lithium ions) per mole of formula units of molar mass $M$ is
$$
Q = \frac{nF}{3.6\,M}\ \mathrm{mA\,h\,g^{-1}} \qquad (M\ \text{in}\ \mathrm{g\,mol^{-1}}),
$$ {#eq-capacity}
since $1\ \mathrm{mA\,h} = 3.6\ \mathrm{C}$. The **specific energy** of a cell is the integral of voltage over charge, approximately $\bar E\,Q_\mathrm{cell}$, where for two electrodes of capacities $Q_+$ and $Q_-$ (per gram of each) the capacity per gram of both together is $Q_\mathrm{cell} = (1/Q_+ + 1/Q_-)^{-1}$. Practical capacities are lower when only part of the lithium can be removed without destroying the structure.
:::

::: example Capacities and energy of common electrodes {#ex-capacity}
(a) Calculate the theoretical capacities of $\mathrm{LiCoO_2}$, $\mathrm{LiFePO_4}$ and graphite ($\mathrm{C_6} \rightarrow \mathrm{LiC_6}$). (b) Only about half the lithium in $\mathrm{LiCoO_2}$ is normally cycled. What is its practical capacity? (c) Estimate the theoretical specific energy of a $\mathrm{LiFePO_4}$/graphite cell, per mass of active electrode materials, with mean voltage $3.3\ \mathrm{V}$.
::: solution
(a) $nF/3.6 = 26\,801\ \mathrm{mA\,h\,mol^{-1}}$ for $n = 1$. $\mathrm{LiCoO_2}$: $M = 6.941 + 58.933 + 2(15.999) = 97.87$, $Q = 26\,801/97.87 = 274\ \mathrm{mA\,h\,g^{-1}}$. $\mathrm{LiFePO_4}$: $M = 157.76$, $Q = 170\ \mathrm{mA\,h\,g^{-1}}$. Graphite: per $\mathrm{C_6}$, $M = 72.07$, $Q = 372\ \mathrm{mA\,h\,g^{-1}}$. (b) $137\ \mathrm{mA\,h\,g^{-1}}$. Removing more than about half the lithium from $\mathrm{Li_{1-x}CoO_2}$ makes the layered structure unstable, oxidises oxide ions and releases oxygen; modern doped and coated cathodes reach about $0.6$–$0.7$ of the theoretical value. (c) $Q_\mathrm{cell} = (1/170 + 1/372)^{-1} = 117\ \mathrm{mA\,h\,g^{-1}}$, and $3.3\ \mathrm{V} \times 117\ \mathrm{mA\,h\,g^{-1}} = 385\ \mathrm{mW\,h\,g^{-1}} = 385\ \mathrm{W\,h\,kg^{-1}}$. A finished cell, with electrolyte, separator, current collectors and casing, achieves roughly $160$–$200\ \mathrm{W\,h\,kg^{-1}}$ for this chemistry, about half the active-material value.
:::
:::

### Negative electrodes, electrolytes and safety

Lithium metal has by far the highest capacity ($3861\ \mathrm{mA\,h\,g^{-1}}$), but on recharging it tends to deposit as dendrites that can pierce the separator and short-circuit the cell; graphite, which takes up lithium between its layers, was the solution that made rechargeable lithium-ion cells practical. Silicon alloys with lithium up to $\mathrm{Li_{15}Si_4}$ ($3579\ \mathrm{mA\,h\,g^{-1}}$ of Si) but expands by nearly 300 % in volume, pulverising itself; it is now added to graphite in small proportions, often as nanoparticles that tolerate the strain. Lithium titanate spinel, $\mathrm{Li_4Ti_5O_{12}}$, has a lower capacity but almost no volume change ("zero strain") and fast, safe kinetics.

The liquid electrolyte, typically $1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{LiPF_6}$ in a mixture of ethylene carbonate and linear carbonates, is thermodynamically unstable at the potential of graphite. It works because on the first charge it is reduced to form a thin, ion-conducting but electronically insulating film, the **solid–electrolyte interphase** (SEI), which then passivates the anode. The SEI consumes some lithium irreversibly and its slow growth is a main cause of capacity fade. The flammability of the carbonate solvents, combined with oxygen release from charged oxide cathodes, makes **thermal runaway** possible if a cell is overheated, overcharged or penetrated: lithium-ion cells are classed as dangerous goods for transport, and damaged cells must be handled as a fire hazard. Solid electrolytes, such as the garnet $\mathrm{Li_7La_3Zr_2O_{12}}$ or sulfides like $\mathrm{Li_{10}GeP_2S_{12}}$ and the argyrodites $\mathrm{Li_6PS_5Cl}$, are fast-ion conductors of the kind described in [[materials-chemistry/defects]], and are developed for "solid-state" cells that would be non-flammable and might allow lithium-metal anodes. **Sodium-ion** cells, using hard carbon anodes and layered oxide or Prussian-blue-analogue cathodes, avoid lithium and cobalt and are being commercialised for stationary storage and low-cost vehicles.

::: warning Capacity is not energy, and the material is not the cell {#warn-capacity}
A cathode material with a higher specific capacity does not necessarily give a better battery. The energy depends on capacity *times voltage*, so $\mathrm{LiFePO_4}$ ($170\ \mathrm{mA\,h\,g^{-1}}$, $3.45\ \mathrm{V}$) stores less energy per gram than a nickel-rich layered oxide ($200\ \mathrm{mA\,h\,g^{-1}}$, about $3.8\ \mathrm{V}$), but more than a hypothetical material of $250\ \mathrm{mA\,h\,g^{-1}}$ at $2\ \mathrm{V}$. The capacity of a cell is limited by the electrode with less total capacity, and inactive components typically double the mass. And cycle life, rate capability, safety, cost and the supply of the elements (cobalt, nickel, lithium) often matter more than the last ten per cent of energy density. Claims of "ten-times better batteries" based on a single material's capacity should be read with all these in mind.
:::

## Photovoltaic materials

A solar cell absorbs a photon, creating an electron–hole pair ([[materials-chemistry/electronic-structure-solids]]), and separates the pair before it recombines, usually with the built-in field of a p–n junction. Photons with energy below the band gap $E_\mathrm{g}$ are not absorbed; photons above it are absorbed but the excess energy is lost as heat as the carriers relax to the band edges. A gap that is too small wastes the energy of blue photons; a gap that is too large fails to absorb red ones.

::: definition Solar cell parameters {#def-pv}
The current density–voltage curve of an illuminated cell is characterised by the **short-circuit current density** $J_\mathrm{sc}$ (at $V = 0$), the **open-circuit voltage** $V_\mathrm{oc}$ (at $J = 0$), and the **fill factor** $\mathrm{FF} = J_\mathrm{mp}V_\mathrm{mp}/(J_\mathrm{sc}V_\mathrm{oc})$, where $(V_\mathrm{mp}, J_\mathrm{mp})$ is the maximum-power point. The **power conversion efficiency** is
$$
\eta = \frac{J_\mathrm{sc}V_\mathrm{oc}\mathrm{FF}}{P_\mathrm{in}},
$$
with $P_\mathrm{in} = 100\ \mathrm{mW\,cm^{-2}}$ for the standard AM1.5G spectrum at $25\,^\circ\mathrm{C}$.
:::

::: proposition The ideal diode and the open-circuit voltage {#prop-diode}
For an ideal p–n junction cell under illumination,
$$
J(V) = J_\mathrm{sc} - J_0\left[\exp\!\left(\frac{qV}{k_\mathrm{B}T}\right) - 1\right], \qquad V_\mathrm{oc} = \frac{k_\mathrm{B}T}{q}\ln\!\left(\frac{J_\mathrm{sc}}{J_0} + 1\right),
$$ {#eq-diode}
where the **dark saturation current** $J_0$ measures recombination and scales as $J_0 \propto n_\mathrm{i}^2 \propto \exp(-E_\mathrm{g}/k_\mathrm{B}T)$. The model assumes superposition of the photocurrent and the dark diode current, no series or shunt resistance, and recombination only in the neutral regions (ideality factor 1).
:::

::: proof
In the dark, a forward bias $V$ lowers the junction barrier by $qV$, so the number of majority carriers able to cross and recombine as minority carriers on the other side grows by the Boltzmann factor $e^{qV/k_\mathrm{B}T}$. The reverse flow of thermally generated minority carriers is independent of $V$, so the net current is $J_0(e^{qV/k_\mathrm{B}T} - 1)$; at equilibrium both flows are proportional to the minority-carrier concentrations, $n_\mathrm{i}^2/N_\mathrm{A}$ and $n_\mathrm{i}^2/N_\mathrm{D}$ by [[materials-chemistry/electronic-structure-solids#eq-np]], so $J_0 \propto n_\mathrm{i}^2 = N_\mathrm{c}N_\mathrm{v}e^{-E_\mathrm{g}/k_\mathrm{B}T}$. Illumination adds a photocurrent $J_\mathrm{sc}$ of carriers swept across the junction in the reverse direction. Superposing gives $J(V)$; setting $J = 0$ and solving gives $V_\mathrm{oc}$. Because $J_0$ falls exponentially with $E_\mathrm{g}$, $V_\mathrm{oc}$ rises roughly linearly with the gap, while $J_\mathrm{sc}$ falls because fewer photons are absorbed.
:::

The competition between $V_\mathrm{oc}$ and $J_\mathrm{sc}$ gives a maximum efficiency at an optimum gap. William Shockley and Hans-Joachim Queisser calculated in 1961, assuming that the only unavoidable loss is radiative recombination (the cell must emit light as a body at its own temperature), that a single-junction cell under the standard solar spectrum has a limiting efficiency of about 33 %, reached for $E_\mathrm{g} \approx 1.3$–$1.4\ \mathrm{eV}$. Silicon ($1.12\ \mathrm{eV}$, indirect) has a limit of about 29–30 % once Auger recombination is included; GaAs ($1.42\ \mathrm{eV}$, direct) and the lead halide perovskites ($1.5$–$1.6\ \mathrm{eV}$) are close to the optimum. **Tandem** cells, with a wide-gap cell above a narrow-gap one, exceed the single-junction limit by using each photon in the cell whose gap best matches it.

::: widget plot
f: j - 10^(-p)*(exp(x/0.025852) - 1); x*(j - 10^(-p)*(exp(x/0.025852) - 1))
x: 0, 0.8
y: 0, 45
sliders: j=40:10:45:0.5; p=10:7:13:0.1
labels: J\ /\ \mathrm{mA\,cm^{-2}}; P = JV\ /\ \mathrm{mW\,cm^{-2}}
caption: The ideal diode equation [[#eq-diode]] for a cell at $300\ \mathrm{K}$: current density $J$ and power density $P$ against voltage $x$ (V), for photocurrent $j$ (mA cm⁻²) and dark saturation current $J_0 = 10^{-p}\ \mathrm{mA\,cm^{-2}}$ (sliders). The default $J_0 = 10^{-10}\ \mathrm{mA\,cm^{-2}}$ ($10^{-13}\ \mathrm{A\,cm^{-2}}$) gives $V_\mathrm{oc} = 0.69\ \mathrm{V}$, maximum power $23\ \mathrm{mW\,cm^{-2}}$ (23 % efficiency at one sun) and fill factor $0.84$. Each factor of 10 reduction in $J_0$, from less recombination at defects or a larger gap, raises $V_\mathrm{oc}$ by $k_\mathrm{B}T\ln10/q = 60\ \mathrm{mV}$. Real cells have lower fill factors because of series and shunt resistances.
:::

::: example Efficiency of a silicon cell {#ex-pv}
A crystalline silicon cell under AM1.5G illumination has $J_\mathrm{sc} = 40.0\ \mathrm{mA\,cm^{-2}}$, $V_\mathrm{oc} = 0.700\ \mathrm{V}$ and $\mathrm{FF} = 0.820$. (a) Calculate its efficiency. (b) If its dark saturation current density is $1.0\times10^{-13}\ \mathrm{A\,cm^{-2}}$, what $V_\mathrm{oc}$ does the ideal diode equation predict at $300\ \mathrm{K}$? (c) By how much would $V_\mathrm{oc}$ rise if a better surface passivation reduced $J_0$ tenfold?
::: solution
(a) $\eta = 40.0 \times 0.700 \times 0.820/100 = 0.230$, i.e. 23.0 %. (b) $V_\mathrm{oc} = 0.025\,85 \times \ln(0.0400/1.0\times10^{-13}) = 0.025\,85 \times 26.71 = 0.691\ \mathrm{V}$, consistent with (a). (c) $k_\mathrm{B}T\ln10/q = 0.0595\ \mathrm{V}$, about $60\ \mathrm{mV}$, raising the efficiency by a relative 8–9 % at the same current and fill factor. Much of the progress in silicon photovoltaics since 2010 (passivated-emitter cells, heterojunctions with amorphous silicon, tunnel-oxide contacts) has come from reducing $J_0$ at surfaces and contacts, that is, from defect chemistry.
:::
:::

**Absorber materials.** Crystalline silicon dominates the market: more than 2 terawatts of photovoltaic capacity had been installed worldwide by the end of 2024 (IEA Photovoltaic Power Systems Programme), the large majority of it silicon. Because silicon's gap is indirect, a wafer must be about $100$–$180\ \mathrm{\mu m}$ thick, and light-trapping textures are used. Thin-film absorbers with direct gaps need only a micrometre or two: cadmium telluride (CdTe, $1.45\ \mathrm{eV}$), copper indium gallium selenide (CIGS, $1.0$–$1.7\ \mathrm{eV}$ depending on Ga content). **Metal halide perovskites** such as $\mathrm{CH_3NH_3PbI_3}$ (MAPbI₃) and formamidinium-caesium mixtures have the $\mathrm{ABX_3}$ structure of [[materials-chemistry/crystal-structures#prop-tolerance]] with $\mathrm{Pb^{2+}}$ on the B site and iodide on X; they combine strong absorption, long carrier diffusion lengths and an unusual tolerance of defects, because their band edges are formed from antibonding Pb $6s$–I $5p$ (valence band) and Pb $6p$ (conduction band) states, so that common vacancies produce shallow rather than deep levels. First used in solar cells by Akihiro Kojima, Tsutomu Miyasaka and co-workers in 2009 at 3.8 % efficiency, certified single-junction perovskite cells reached about 27 % by 2025, comparable to the best silicon cells, and perovskite–silicon tandems about 34–35 % (NREL Best Research-Cell Efficiency chart; small-area laboratory cells). Their weaknesses are instability towards moisture, heat and light, and the toxicity of lead, and stability is the main subject of research as of 2026.

## Thermoelectric materials

A temperature difference across a conductor drives charge carriers from the hot end to the cold, producing a voltage (the **Seebeck effect**); conversely, a current carries heat (the **Peltier effect**). Thermoelectric modules made of alternating n- and p-type legs generate power from waste heat without moving parts, or pump heat for solid-state cooling; radioisotope thermoelectric generators have powered spacecraft such as Voyager since the 1970s.

::: definition The thermoelectric figure of merit {#def-zt}
A thermoelectric material with Seebeck coefficient $S$ (V K⁻¹), electrical conductivity $\sigma$ and thermal conductivity $\kappa = \kappa_\mathrm{e} + \kappa_\mathrm{L}$ (electronic plus lattice) has the dimensionless **figure of merit**
$$
ZT = \frac{S^2\sigma T}{\kappa}.
$$
The **power factor** $S^2\sigma$ measures electrical output; $\kappa$ measures the heat that leaks through. The maximum efficiency of a generator working between $T_\mathrm{h}$ and $T_\mathrm{c}$, with $ZT$ evaluated at the mean temperature, is
$$
\eta_\mathrm{max} = \frac{T_\mathrm{h} - T_\mathrm{c}}{T_\mathrm{h}}\cdot\frac{\sqrt{1 + ZT} - 1}{\sqrt{1 + ZT} + T_\mathrm{c}/T_\mathrm{h}},
$$ {#eq-te-eff}
which approaches the Carnot efficiency only as $ZT \to \infty$.
:::

The difficulty is that the three properties are linked through the carrier concentration. Metals have high $\sigma$ but tiny $S$ (a few $\mathrm{\mu V\,K^{-1}}$), insulators high $S$ but negligible $\sigma$; the optimum is a heavily doped semiconductor with about $10^{19}$–$10^{20}$ carriers per cubic centimetre. And the electronic part of the thermal conductivity rises with $\sigma$ according to the **Wiedemann–Franz law**, $\kappa_\mathrm{e} = L\sigma T$ with the Lorenz number $L \approx 2.44\times10^{-8}\ \mathrm{W\,\Omega\,K^{-2}}$ (an approximately universal value for degenerate electron gases). So the chemist's main lever is the lattice thermal conductivity $\kappa_\mathrm{L}$: heavy atoms (low phonon velocities), complex unit cells, weak and anharmonic bonding, "rattling" guest atoms in cages (skutterudites, clathrates), alloy disorder and nanostructures that scatter phonons more than electrons, the "phonon-glass, electron-crystal" ideal proposed by Glen Slack. Bismuth telluride alloys, $\mathrm{(Bi,Sb)_2(Te,Se)_3}$, with $ZT \approx 1$ near room temperature, dominate cooling; PbTe and the skutterudites serve at higher temperatures; SnSe single crystals reached $ZT \approx 2.6$ at $923\ \mathrm{K}$ in 2014.

::: example The figure of merit of bismuth telluride {#ex-zt}
A p-type $\mathrm{Bi_{0.5}Sb_{1.5}Te_3}$ sample at $300\ \mathrm{K}$ has $S = 200\ \mathrm{\mu V\,K^{-1}}$, $\sigma = 1.0\times10^5\ \mathrm{S\,m^{-1}}$ and $\kappa = 1.5\ \mathrm{W\,m^{-1}\,K^{-1}}$. (a) Calculate $ZT$. (b) Use the Wiedemann–Franz law to split $\kappa$ into electronic and lattice parts. (c) What would $ZT$ be if nanostructuring halved $\kappa_\mathrm{L}$ without changing the electrical properties?
::: solution
(a) $S^2\sigma = (2.00\times10^{-4})^2 \times 1.0\times10^5 = 4.0\times10^{-3}\ \mathrm{W\,m^{-1}\,K^{-2}}$, so $ZT = 4.0\times10^{-3} \times 300/1.5 = 0.80$. (b) $\kappa_\mathrm{e} = 2.44\times10^{-8} \times 1.0\times10^5 \times 300 = 0.73\ \mathrm{W\,m^{-1}\,K^{-1}}$, so $\kappa_\mathrm{L} = 1.5 - 0.73 = 0.77\ \mathrm{W\,m^{-1}\,K^{-1}}$. (c) $\kappa = 0.73 + 0.385 = 1.12$, $ZT = 1.20/1.12 = 1.07$. Halving the lattice part gains about a third in $ZT$; but once $\kappa_\mathrm{L}$ is small, $\kappa_\mathrm{e}$ sets a ceiling, and further progress requires raising the power factor, for example through band convergence (several valence-band maxima at the same energy, as engineered in PbTe-based alloys).
:::
:::

::: widget plot
f: (1 - c/h)*(sqrt(1 + x) - 1)/(sqrt(1 + x) + c/h); 1 - c/h
x: 0, 6
y: 0, 0.5
sliders: h=500:350:900:5; c=300:250:400:5
labels: \eta_\mathrm{max}; \text{Carnot}
caption: Maximum thermoelectric efficiency [[#eq-te-eff]] against $ZT$ ($x$) for hot- and cold-side temperatures $h$ and $c$ in K (sliders), compared with the Carnot limit $1 - T_\mathrm{c}/T_\mathrm{h}$. Between $500$ and $300\ \mathrm{K}$, $ZT = 1$ gives $8.2\ \%$, about a fifth of the Carnot value of $40\ \%$; even $ZT = 3$ gives only about $15\ \%$. Thermoelectrics are therefore competitive where reliability, silence or small size matter more than efficiency: spacecraft, remote sensors, car seat coolers and the recovery of a few per cent of the heat in exhaust gases.
:::

## Superconductors

In 1911 Heike Kamerlingh Onnes found that the resistance of mercury vanished abruptly below $4.2\ \mathrm{K}$. A superconductor has exactly zero DC resistance below its critical temperature $T_\mathrm{c}$, and it expels magnetic flux from its interior (the **Meissner effect**, 1933), which distinguishes it from a merely perfect conductor and allows magnetic levitation. Superconductivity is destroyed by fields above a critical field; **type II** superconductors admit flux in quantised vortices between a lower and an upper critical field, and if the vortices are pinned by defects they can carry large currents in fields of many tesla. That is why the wires of MRI magnets (Nb–Ti, $T_\mathrm{c} \approx 9.5\ \mathrm{K}$) and of particle-accelerator and fusion magnets ($\mathrm{Nb_3Sn}$, $18\ \mathrm{K}$; and increasingly $\mathrm{REBa_2Cu_3O_7}$ tapes) are deliberately defect-rich.

The theory of John Bardeen, Leon Cooper and Robert Schrieffer (BCS, 1957) explained conventional superconductors: an attraction between electrons mediated by lattice vibrations binds them into **Cooper pairs** of opposite momentum and spin, which condense into a single coherent quantum state separated from excited states by an energy gap. BCS theory predicts that the zero-temperature gap is $2\Delta(0) \approx 3.53\,k_\mathrm{B}T_\mathrm{c}$ in the weak-coupling limit, and that $T_\mathrm{c}$ is proportional to a phonon frequency and so to $M^{-1/2}$ for isotopes of the same element (the **isotope effect**, observed in mercury in 1950 before the theory was complete). Light atoms and stiff bonds favour high $T_\mathrm{c}$: $\mathrm{MgB_2}$ (2001) superconducts at $39\ \mathrm{K}$, and hydrogen-rich compounds compressed in diamond anvil cells, $\mathrm{H_3S}$ at about $200\ \mathrm{K}$ and $150\ \mathrm{GPa}$ (2015) and $\mathrm{LaH_{10}}$ at about $250\ \mathrm{K}$ and $170\ \mathrm{GPa}$ (2019), are thought to be conventional BCS superconductors at the extreme of phonon frequency.

The **cuprates**, discovered by Georg Bednorz and Alex Müller in $\mathrm{La_{2-x}Ba_xCuO_4}$ (1986, $T_\mathrm{c} \approx 35\ \mathrm{K}$), are not explained by conventional BCS theory. Their structures contain $\mathrm{CuO_2}$ planes; the undoped parent compounds are antiferromagnetic Mott (charge-transfer) insulators ([[materials-chemistry/electronic-structure-solids]]), and superconductivity appears when the planes are doped with holes or electrons, here by replacing $\mathrm{La^{3+}}$ with $\mathrm{Ba^{2+}}$, or in $\mathrm{YBa_2Cu_3O_{7-\delta}}$ by the oxygen content of the chains (its $T_\mathrm{c}$ of $92\ \mathrm{K}$, found by Maw-Kuen Wu, Paul Chu and co-workers in 1987, was the first above the boiling point of nitrogen, $77\ \mathrm{K}$). Defect chemistry and doping in the language of [[materials-chemistry/defects]] thus control the most interesting electronic property of these solids. The highest $T_\mathrm{c}$ at ambient pressure, about $133$–$135\ \mathrm{K}$, belongs to $\mathrm{HgBa_2Ca_2Cu_3O_{8+\delta}}$ (1993). The iron pnictides and chalcogenides (Hideo Hosono's group, 2008; up to about $55\ \mathrm{K}$) and nickelates (2019) are further unconventional families.

::: quiz
Which statements about superconductors are correct?
- [x] A superconductor expels magnetic flux below $T_\mathrm{c}$, which a hypothetical perfect conductor would not do.
- [ ] The cuprate superconductors are metals whose $T_\mathrm{c}$ is explained by the BCS isotope effect.
- [x] In BCS theory, $2\Delta(0) \approx 3.5\,k_\mathrm{B}T_\mathrm{c}$ and $T_\mathrm{c}$ falls for heavier isotopes.
- [x] Pinning of flux vortices by defects is essential for superconducting magnet wires.
- [ ] Zero resistance means that a superconductor can carry any current in any field.
::: solution
The Meissner effect is the defining difference from a perfect conductor, which would trap whatever flux was present when it became perfect. Cuprates are doped Mott insulators with unconventional pairing; their isotope effect is weak and not the BCS one. BCS predicts the gap ratio and the isotope effect. Vortices must be pinned or they move under the Lorentz force and dissipate energy. Above the critical current density or critical field superconductivity is destroyed.
:::
:::

Extraordinary claims about superconductivity deserve extraordinary evidence: both zero resistance and a Meissner signal, reproduced independently. Several widely publicised reports have not survived scrutiny, among them claims of room-temperature superconductivity in hydride samples published in 2020 and 2023 and later retracted, and the 2023 claim for the copper-doped lead apatite "LK-99", whose resistance drop was traced by other groups to a $\mathrm{Cu_2S}$ impurity phase. Careful phase identification by diffraction ([[materials-chemistry/diffraction]]) is often what settles such cases.

::: example The BCS gap and the isotope effect {#ex-bcs}
(a) Niobium has $T_\mathrm{c} = 9.25\ \mathrm{K}$. Estimate the BCS energy gap $2\Delta(0)$ in meV and the wavelength of radiation that would break Cooper pairs. (b) Mercury of mean isotopic mass $199.5$ has $T_\mathrm{c} = 4.185\ \mathrm{K}$. Predict $T_\mathrm{c}$ for a sample enriched to mean mass $203.4$.
::: solution
(a) $2\Delta = 3.53 \times 8.617\times10^{-5}\ \mathrm{eV\,K^{-1}} \times 9.25\ \mathrm{K} = 2.81\times10^{-3}\ \mathrm{eV} = 2.81\ \mathrm{meV}$ (measured about $3.0\ \mathrm{meV}$; niobium is a moderately strong-coupling superconductor). Photons of this energy have $\lambda = 1240\ \mathrm{nm\,eV}/0.00281\ \mathrm{eV} = 4.4\times10^5\ \mathrm{nm} = 0.44\ \mathrm{mm}$, in the far infrared (about $680\ \mathrm{GHz}$): superconducting detectors exploit exactly this. (b) $T_\mathrm{c} \propto M^{-1/2}$: $T_\mathrm{c} = 4.185 \times \sqrt{199.5/203.4} = 4.145\ \mathrm{K}$, close to the $4.146\ \mathrm{K}$ measured by Emanuel Maxwell and, independently, by Reynolds and co-workers in 1950, the observation that pointed to the lattice's role.
:::
:::

## Where this leads

Energy materials are where the threads of this course meet engineering. The electrochemistry of complete batteries and fuel cells continues in [[electrochemistry/batteries]] and [[electrochemistry/fuel-cells-electrolysis]]; the thermodynamics of hydrogen production and storage, and life-cycle questions about the critical elements used here, in [[green-chemistry/carbon-hydrogen]] and [[green-chemistry/circular-economy]]; polymer electrolytes, separators and organic photovoltaics in [[polymer-chemistry/functional-polymers]]; and computational screening of new electrode and absorber compositions, which as of 2026 increasingly guides synthesis, in [[computational-chemistry/density-functional-theory]].

::: history
Alessandro Volta described the first battery, the voltaic pile, in 1800. Thomas Seebeck discovered thermoelectricity in 1821 and Jean Peltier its converse in 1834; Edmond Becquerel observed the photovoltaic effect in 1839, and Daryl Chapin, Calvin Fuller and Gerald Pearson made the first practical silicon solar cell at Bell Laboratories in 1954. Heike Kamerlingh Onnes discovered superconductivity in 1911, Walther Meissner and Robert Ochsenfeld flux expulsion in 1933, and Bardeen, Cooper and Schrieffer published their theory in 1957 (Nobel Prize in Physics 1972); Bednorz and Müller's cuprates (1986) received the 1987 prize. M. Stanley Whittingham demonstrated a rechargeable lithium cell with a $\mathrm{TiS_2}$ cathode in the 1970s; John Goodenough's group introduced $\mathrm{Li}_x\mathrm{CoO_2}$ in 1980, Michael Thackeray and Goodenough the spinel $\mathrm{LiMn_2O_4}$ in 1983, and Akshaya Padhi, Goodenough and co-workers $\mathrm{LiFePO_4}$ in 1997; Akira Yoshino built the first graphite-based (initially petroleum-coke) lithium-ion cell in 1985, Sony commercialised it in 1991, and Goodenough, Whittingham and Yoshino shared the 2019 Nobel Prize in Chemistry. Kojima and Miyasaka's perovskite solar cell appeared in 2009.
:::

::: summary
- Lithium-ion electrodes are intercalation hosts (layered $\mathrm{LiMO_2}$, spinel $\mathrm{LiMn_2O_4}$, olivine $\mathrm{LiFePO_4}$, graphite); the cell voltage is $-\Delta\mu_\mathrm{Li}/F$, flat for two-phase and sloping for solid-solution electrodes.
- Theoretical capacity $Q = nF/3.6M\ \mathrm{mA\,h\,g^{-1}}$ (274 for $\mathrm{LiCoO_2}$, 170 for $\mathrm{LiFePO_4}$, 372 for graphite); energy is capacity times voltage, and cells reach about half the active-material value.
- The SEI makes carbonate electrolytes usable at graphite; flammable electrolytes and oxygen release make thermal runaway possible; solid electrolytes and sodium-ion cells are developing alternatives.
- Solar cells follow $J = J_\mathrm{sc} - J_0(e^{qV/k_\mathrm{B}T} - 1)$; $V_\mathrm{oc} = (k_\mathrm{B}T/q)\ln(J_\mathrm{sc}/J_0)$ rises as recombination falls; the single-junction limit is about 33 % at $E_\mathrm{g} \approx 1.3$–$1.4\ \mathrm{eV}$; silicon dominates, perovskites and tandems are rising.
- Thermoelectrics need high $ZT = S^2\sigma T/\kappa$; the Wiedemann–Franz law ties $\kappa_\mathrm{e}$ to $\sigma$, so low lattice thermal conductivity (heavy atoms, disorder, rattlers, nanostructure) is the key; $ZT \approx 1$ gives a fifth of Carnot.
- Superconductors have zero resistance and the Meissner effect; BCS theory (phonon-mediated pairs, $2\Delta \approx 3.53k_\mathrm{B}T_\mathrm{c}$, $T_\mathrm{c} \propto M^{-1/2}$) explains conventional ones including $\mathrm{MgB_2}$ and compressed hydrides; cuprates are doped Mott insulators with $T_\mathrm{c}$ up to about $135\ \mathrm{K}$.
:::

## Exercises

::: exercise Capacity of a spinel cathode {level=1 check="148"}
Calculate the theoretical capacity of $\mathrm{LiMn_2O_4}$ for the reaction $\mathrm{LiMn_2O_4} \rightleftharpoons \mathrm{Mn_2O_4} + \mathrm{Li^+} + e^-$. (Enter $Q$ in $\mathrm{mA\,h\,g^{-1}}$, to three significant figures.)
::: solution
$M = 6.941 + 2(54.938) + 4(15.999) = 180.81\ \mathrm{g\,mol^{-1}}$; $Q = 26\,801/180.81 = 148\ \mathrm{mA\,h\,g^{-1}}$. In practice about $120\ \mathrm{mA\,h\,g^{-1}}$ is obtained at about $4.0\ \mathrm{V}$.
:::
:::

::: exercise Lithium metal {level=1 check="3861"}
Calculate the theoretical specific capacity of lithium metal. (Enter $Q$ in $\mathrm{mA\,h\,g^{-1}}$, to four significant figures.)
::: solution
$Q = 26\,801/6.941 = 3861\ \mathrm{mA\,h\,g^{-1}}$, more than ten times graphite's $372$. The difficulty is not capacity but dendrite growth and reactivity with the electrolyte.
:::
:::

::: exercise Gibbs energy of lithiation {level=1 check="-333"}
$\mathrm{LiFePO_4}$ operates at $3.45\ \mathrm{V}$ against lithium metal. Calculate $\Delta_\mathrm{r}G$ for $\mathrm{Li(s)} + \mathrm{FePO_4(s)} \rightarrow \mathrm{LiFePO_4(s)}$. (Enter $\Delta_\mathrm{r}G$ in $\mathrm{kJ\,mol^{-1}}$, to three significant figures.)
::: solution
$\Delta_\mathrm{r}G = -nFE = -1 \times 96\,485 \times 3.45 = -3.33\times10^5\ \mathrm{J\,mol^{-1}} = -333\ \mathrm{kJ\,mol^{-1}}$. Because the reaction is two-phase, this single value applies across the whole plateau.
:::
:::

::: exercise Solar cell efficiency {level=2 check="21.6"}
A perovskite cell has $J_\mathrm{sc} = 24.5\ \mathrm{mA\,cm^{-2}}$, $V_\mathrm{oc} = 1.12\ \mathrm{V}$ and $\mathrm{FF} = 0.787$ under one sun ($100\ \mathrm{mW\,cm^{-2}}$). Calculate its efficiency, and explain why its current is lower and its voltage higher than those of the silicon cell in [[#ex-pv]]. (Enter $\eta$ in per cent, to three significant figures.)
::: solution
$\eta = 24.5 \times 1.12 \times 0.787/100 = 0.216$, i.e. 21.6 %. Its gap ($\approx 1.55\ \mathrm{eV}$) is larger than silicon's ($1.12\ \mathrm{eV}$): fewer solar photons have enough energy to be absorbed (lower $J_\mathrm{sc}$), but the larger gap lowers $J_0$ exponentially and raises $V_\mathrm{oc}$.
:::
:::

::: exercise The open-circuit voltage {level=2 check="0.631"}
A cell has $J_\mathrm{sc} = 40.0\ \mathrm{mA\,cm^{-2}}$ and $J_0 = 1.0\times10^{-12}\ \mathrm{A\,cm^{-2}}$ at $300\ \mathrm{K}$. Calculate $V_\mathrm{oc}$ from the ideal diode equation. (Enter $V_\mathrm{oc}$ in V, to three significant figures.)
::: solution
$V_\mathrm{oc} = 0.025\,85 \times \ln(0.0400/1.0\times10^{-12} + 1) = 0.025\,85 \times 24.41 = 0.631\ \mathrm{V}$, $60\ \mathrm{mV}$ lower than with $J_0 = 10^{-13}\ \mathrm{A\,cm^{-2}}$, as expected.
:::
:::

::: exercise Electronic thermal conductivity {level=2 check="0.73"}
Use the Wiedemann–Franz law to calculate the electronic thermal conductivity of a thermoelectric with $\sigma = 1.0\times10^5\ \mathrm{S\,m^{-1}}$ at $300\ \mathrm{K}$. If its total thermal conductivity is $1.0\ \mathrm{W\,m^{-1}\,K^{-1}}$ and $S = 220\ \mathrm{\mu V\,K^{-1}}$, find $ZT$. (Enter $\kappa_\mathrm{e}$ in $\mathrm{W\,m^{-1}\,K^{-1}}$, two significant figures.)
::: solution
$\kappa_\mathrm{e} = 2.44\times10^{-8} \times 1.0\times10^5 \times 300 = 0.73\ \mathrm{W\,m^{-1}\,K^{-1}}$, so $\kappa_\mathrm{L} = 0.27$. $ZT = (2.2\times10^{-4})^2 \times 1.0\times10^5 \times 300/1.0 = 1.45$. A material with such a low lattice conductivity would be among the best room-temperature thermoelectrics.
:::
:::

::: exercise Silicon anodes {level=3 check="3579"}
(a) Calculate the capacity of silicon, per gram of Si, for full lithiation to $\mathrm{Li_{15}Si_4}$. (b) Silicon's molar volume is $12.1\ \mathrm{cm^3\,mol^{-1}}$ and that of $\mathrm{Li_{15}Si_4}$ is about $180\ \mathrm{cm^3}$ per mole of formula units. Estimate the volume expansion. (c) Explain why nanostructured or composite silicon is used. (Enter the capacity in $\mathrm{mA\,h\,g^{-1}}$, to four significant figures.)
::: solution
(a) $3.75$ Li per Si: $Q = 3.75 \times 26\,801/28.085 = 3579\ \mathrm{mA\,h\,g^{-1}}$. (b) Four moles of Si ($48.4\ \mathrm{cm^3}$) become one mole of $\mathrm{Li_{15}Si_4}$ ($\approx 180\ \mathrm{cm^3}$): a factor of $3.7$, an expansion of about $270\ \%$. (c) Such strains crack micrometre particles, break electrical contact and continually expose fresh surface on which the SEI re-forms, consuming lithium. Particles below about $150\ \mathrm{nm}$, porous or hollow structures, and composites in which a few per cent of silicon is dispersed in graphite tolerate the expansion; the nanoscale argument is that of [[materials-chemistry/nanomaterials]] applied to fracture.
:::
:::

::: exercise The isotope effect {level=3 check="4.14"}
(a) Explain why, in BCS theory, $T_\mathrm{c} \propto M^{-1/2}$ for isotopes of one element. (b) A mercury sample of mean mass $199.5$ has $T_\mathrm{c} = 4.185\ \mathrm{K}$. Predict $T_\mathrm{c}$ for mean mass $203.4$. (c) The isotope exponent in $\mathrm{YBa_2Cu_3O_7}$ ($^{16}$O vs $^{18}$O) is close to zero. What does this suggest? (Enter $T_\mathrm{c}$ in (b), in K, to three significant figures.)
::: solution
(a) In BCS theory $k_\mathrm{B}T_\mathrm{c} \approx 1.13\,\hbar\omega_\mathrm{D}\exp[-1/N(E_\mathrm{F})V]$, with $\omega_\mathrm{D}$ a typical phonon frequency. For a harmonic lattice $\omega \propto (k/M)^{1/2}$, and isotopic substitution changes $M$ but not the force constants or the electronic parameters, so $T_\mathrm{c} \propto M^{-1/2}$. (b) $4.185 \times (199.5/203.4)^{1/2} = 4.14\ \mathrm{K}$ (more precisely $4.145\ \mathrm{K}$). (c) A small isotope effect suggests that phonons are not the main pairing mechanism, one of the earliest pieces of evidence that the cuprates are unconventional superconductors (though the exponent varies with doping).
:::
:::

::: exercise Thermoelectric generator efficiency {level=2 check="8.2"}
Using [[#eq-te-eff]], calculate the maximum efficiency of a generator with $ZT = 1.0$ operating between $500\ \mathrm{K}$ and $300\ \mathrm{K}$, and express it as a fraction of the Carnot efficiency. (Enter the efficiency in per cent, two significant figures.)
::: solution
Carnot: $1 - 300/500 = 0.40$. $\sqrt{2} = 1.4142$; $\eta = 0.40 \times 0.4142/(1.4142 + 0.6) = 0.40 \times 0.2057 = 0.0823$, i.e. 8.2 %, about 21 % of Carnot. With $ZT = 2$ it would be $0.40 \times 0.732/2.332 = 12.6\ \%$.
:::
:::
