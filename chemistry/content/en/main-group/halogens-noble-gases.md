Groups 17 and 18 end every period, and they end it in opposite ways. The halogens — fluorine, chlorine, bromine, iodine (and the radioactive astatine) — are one electron short of a noble-gas configuration and are among the most reactive elements known; fluorine reacts with almost everything, including glass, water and, as we shall see, xenon. The noble gases — helium to radon — have that configuration already and were for seventy years believed to have no chemistry at all. This chapter shows that the two groups are governed by the same handful of quantities: bond enthalpies (above all the anomalously weak $\mathrm{F{-}F}$ bond), electronegativity, the Hess cycles behind standard potentials, and the three-centre four-electron bond of [[main-group/main-group-bonding#prop-3c4e]], which holds together both the triiodide ion and xenon difluoride. Along the way we meet the chemistry of bleach, of the halogen oxoanions, and of one of the great overturned dogmas of chemistry.

## The halogens as elements

The halogens exist as diatomic molecules $\mathrm{X_2}$. Their physical properties change steadily down the group, with the single exception of the bond enthalpy:

| | $\mathrm{F_2}$ | $\mathrm{Cl_2}$ | $\mathrm{Br_2}$ | $\mathrm{I_2}$ |
|---|---|---|---|---|
| state and colour at 25 °C | pale yellow gas | yellow-green gas | red-brown liquid | lustrous black solid, violet vapour |
| melting / boiling point / °C | $-220$ / $-188$ | $-101$ / $-34$ | $-7$ / $59$ | $114$ / $184$ |
| $D(\mathrm{X{-}X})$ / $\mathrm{kJ\,mol^{-1}}$ | 159 | 243 | 193 | 151 |
| electron affinity (released) / $\mathrm{kJ\,mol^{-1}}$ | 328 | 349 | 325 | 295 |
| $\chi$ (Pauling) | 3.98 | 3.16 | 2.96 | 2.66 |
| $r(\mathrm{X^-})$ / pm | 133 | 181 | 196 | 220 |
| $E^\circ(\mathrm{X_2/X^-})$ / V | $+2.87$ | $+1.36$ | $+1.09$ | $+0.54$ |

The rising melting and boiling points follow the growth of dispersion forces with the size and polarisability of the molecule ([[bonding-structure/intermolecular-forces]]). The colours come from the excitation of an electron from the highest occupied orbital ($\pi^*$) to the lowest unoccupied one ($\sigma^*$); that gap narrows down the group, so the absorption moves from the near ultraviolet for fluorine through the violet and blue for chlorine and bromine to the yellow-green for iodine, which therefore looks violet. The bond enthalpies rise from chlorine to iodine in the normal way, as longer bonds overlap less — and fluorine falls far below the trend. The $\mathrm{F{-}F}$ bond is short ($142\ \mathrm{pm}$), so the three lone pairs on each fluorine are crowded against those on the other, and their repulsion weakens the bond. The same effect weakens $\mathrm{O{-}O}$ and $\mathrm{N{-}N}$ single bonds ([[main-group/groups-15-16]]). It has a great consequence: fluorine molecules are cheap to break, and fluorine is the most reactive element.

::: definition The standard potential as a thermochemical cycle {#def-x-cycle}
The standard potential of the couple $\mathrm{\tfrac12 X_2 / X^-(aq)}$ measures the Gibbs energy of forming the aqueous halide from the element, $E^\circ = -\Delta_\mathrm{f}G^\circ(\mathrm{X^-,aq})/F$ with conventional values ($\mathrm{H^+(aq)} = 0$). Its enthalpy part can be built from a cycle through gaseous species:
$$
\tfrac12\mathrm{X_2(std)} \xrightarrow{\ \Delta_\mathrm{at}H^\circ\ } \mathrm{X(g)} \xrightarrow{\ -E_\mathrm{ea}\ } \mathrm{X^-(g)} \xrightarrow{\ \Delta_\mathrm{hyd}H^\circ(\mathrm{X^-})\ } \mathrm{X^-(aq)},
$$
where $\Delta_\mathrm{at}H^\circ$ is half the bond enthalpy (plus, for bromine and iodine, half the enthalpy of vaporisation or sublimation from the standard state), $E_\mathrm{ea}$ is the electron affinity as energy released, and the hydration enthalpy is on the same conventional scale. Comparisons between two halogens cancel the convention.
:::

::: example Why fluorine is the strongest oxidising agent {#ex-f-oxidant}
Chlorine has the larger electron affinity, yet fluorine is by far the stronger oxidant. Using the data below (standard tables, $298\ \mathrm{K}$, $\mathrm{kJ\,mol^{-1}}$), find which step of the cycle in [[#def-x-cycle]] is responsible.

| | $\Delta_\mathrm{at}H^\circ$ | $E_\mathrm{ea}$ | $\Delta_\mathrm{f}H^\circ(\mathrm{X^-,aq})$ | $\Delta_\mathrm{f}G^\circ(\mathrm{X^-,aq})$ |
|---|---|---|---|---|
| F | 79.4 | 328.2 | $-332.6$ | $-278.8$ |
| Cl | 121.3 | 348.6 | $-167.2$ | $-131.2$ |
::: solution
**Potentials.** $E^\circ = -\Delta_\mathrm{f}G^\circ/F$: $278\,800/96\,485 = 2.89\ \mathrm{V}$ for fluorine (the tabulated $2.87$, within the precision of the data) and $131\,200/96\,485 = 1.36\ \mathrm{V}$ for chlorine.

**Cycle.** $\Delta_\mathrm{f}H^\circ(\mathrm{X^-,aq}) = \Delta_\mathrm{at}H^\circ - E_\mathrm{ea} + \Delta_\mathrm{hyd}H^\circ$. Subtracting chlorine from fluorine:
$$
\underbrace{-165.4}_{\text{total}} = \underbrace{-41.9}_{\text{atomisation}} + \underbrace{+20.4}_{\text{electron affinity}} + \Delta\Delta_\mathrm{hyd}H^\circ \quad\Rightarrow\quad \Delta\Delta_\mathrm{hyd}H^\circ = -143.9\ \mathrm{kJ\,mol^{-1}}.
$$
Fluorine loses $20\ \mathrm{kJ\,mol^{-1}}$ on electron affinity, gains $42\ \mathrm{kJ\,mol^{-1}}$ from its weak bond, and gains $144\ \mathrm{kJ\,mol^{-1}}$ — by far the largest term — from the hydration of its small anion. (Absolute hydration enthalpies, about $-504$ for $\mathrm{F^-}$ and $-361\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{Cl^-}$, give the same difference.) This is the same pattern that made lithium the strongest reductant in water ([[main-group/hydrogen-s-block#ex-li-potential]]): a small ion is strongly hydrated, and the potential is a property of the aqueous ion, not of the isolated atom. In the gas phase, or towards a metal surface where a fluoride lattice forms, the small size of $\mathrm{F^-}$ is rewarded in the same way by a large lattice energy.
:::
:::

The order of the potentials is the order of displacement: each halogen oxidises the halides below it, $\mathrm{Cl_2 + 2\,Br^- \rightarrow 2\,Cl^- + Br_2}$, $\mathrm{Br_2 + 2\,I^- \rightarrow 2\,Br^- + I_2}$. Fluorine's potential, $2.87\ \mathrm{V}$, lies far above that of the oxygen–water couple, $1.23\ \mathrm{V}$, so fluorine oxidises water itself to oxygen, and no aqueous chemistry of $\mathrm{F_2}$ is possible.

### Making the halogens

Each halogen is made by oxidising its halide, and the method is set by how hard that oxidation is.

- **Fluorine**: no chemical oxidant can make $\mathrm{F_2}$ from fluoride on a practical scale, and aqueous electrolysis would give oxygen. Fluorine is made by electrolysis of an anhydrous molten salt, $\mathrm{KF \cdot 2HF}$, at about $70$–$100\ \mathrm{^\circ C}$, with carbon anodes and steel or Monel vessels that are protected by a passivating fluoride film — the method Moissan first succeeded with in 1886.
- **Chlorine**: chlor–alkali electrolysis of brine ([[main-group/hydrogen-s-block]]). Here the anode must favour chloride oxidation ($1.36\ \mathrm{V}$) over water oxidation ($1.23\ \mathrm{V}$ at pH 0, lower in neutral brine), and does so only because oxygen evolution has the larger overpotential on the coated titanium anodes used — a kinetic choice of product, like the Ostwald process of [[main-group/groups-15-16#ex-ostwald]].
- **Bromine**: from bromide-rich brines and seawater (about $65\ \mathrm{mg\,dm^{-3}}$ of bromide), by oxidation with chlorine, $\mathrm{Cl_2 + 2\,Br^- \rightarrow 2\,Cl^- + Br_2}$, followed by stripping the volatile bromine with steam or air.
- **Iodine**: from brines associated with natural gas and oil wells, again by oxidation of iodide, and from the iodate present in Chilean nitrate deposits by reduction ($\mathrm{IO_3^-}$ to $\mathrm{I_2}$ with hydrogen sulfite).

The elements are hazardous. Fluorine and chlorine are very toxic, corrosive gases (GHS06, GHS05; chlorine also GHS03 as an oxidiser); bromine is a volatile, very corrosive liquid that causes severe burns and toxic vapour; all are handled only in a fume cupboard with appropriate protection, and work with fluorine requires specialised apparatus and training. Hydrogen fluoride and hydrofluoric acid are uniquely dangerous because fluoride penetrates the skin and binds the body's calcium; even small burns need specific first aid and medical treatment. The hydrogen halides as acids, and the reason HF is weak, were treated in [[main-group/inorganic-acids-bases#ex-hf-weak]].

## Interhalogens and polyhalides

The halogens combine with one another to give **interhalogen compounds** $\mathrm{XY}_n$, where X is the heavier (less electronegative) halogen and Y the lighter one.

::: definition Interhalogen compounds {#def-interhalogen}
The neutral interhalogens have the formulas $\mathrm{XY}$, $\mathrm{XY_3}$, $\mathrm{XY_5}$ and $\mathrm{XY_7}$ — always an **odd** number of Y atoms, so that the molecule has an even number of electrons and no unpaired spin. The known compounds are: $\mathrm{ClF}$, $\mathrm{BrF}$, $\mathrm{IF}$, $\mathrm{BrCl}$, $\mathrm{ICl}$, $\mathrm{IBr}$; $\mathrm{ClF_3}$, $\mathrm{BrF_3}$, $\mathrm{IF_3}$, $\mathrm{I_2Cl_6}$ (the dimer of $\mathrm{ICl_3}$); $\mathrm{ClF_5}$, $\mathrm{BrF_5}$, $\mathrm{IF_5}$; and $\mathrm{IF_7}$ (BrF, IF and $\mathrm{IF_3}$ decompose or disproportionate except at low temperature). The central atom is always the heavier halogen, and the highest coordination numbers are reached only with fluorine around the largest central atom. Their shapes are those predicted by VSEPR: $\mathrm{XY_3}$ T-shaped ($\mathrm{AX_3E_2}$), $\mathrm{XY_5}$ square-pyramidal ($\mathrm{AX_5E}$), $\mathrm{IF_7}$ pentagonal-bipyramidal ($\mathrm{AX_7}$).
:::

Two factors decide which compounds exist. **Size**: fitting seven ligands round a central atom needs a large centre and small ligands, so only iodine takes seven, and only fluorines; chlorine stops at five fluorines, and chlorine is never the central atom for the larger halogens. **Electronegativity**: the bonds in hypervalent molecules are three-centre four-electron bonds that place negative charge on the outer atoms ([[main-group/main-group-bonding#prop-3c4e]]), which suits the most electronegative ligand, fluorine, around the most electropositive centre, iodine. The interhalogens are generally more reactive than the halogens themselves (except $\mathrm{F_2}$), because their polar $\mathrm{X^{\delta+}{-}Y^{\delta-}}$ bonds offer an electrophilic centre to an attacking reagent, which a non-polar $\mathrm{X{-}X}$ bond does not. Chlorine trifluoride is among the most aggressive fluorinating agents known: it ignites many materials, including some normally considered non-flammable, and is handled only by specialists.

::: example The shape of chlorine trifluoride {#ex-clf3}
Predict the shape of $\mathrm{ClF_3}$ and explain why its two axial $\mathrm{Cl{-}F}$ bonds ($170\ \mathrm{pm}$) are longer than the equatorial one ($160\ \mathrm{pm}$), and why the $\mathrm{F_{ax}{-}Cl{-}F_{eq}}$ angles are $87.5^\circ$ rather than $90^\circ$.
::: solution
Chlorine brings seven valence electrons and each fluorine one to the central atom's count: $7 + 3 = 10$ electrons, five pairs, a trigonal-bipyramidal electron arrangement ([[bonding-structure/vsepr]]). Three pairs bond and two are lone pairs; lone pairs go equatorial, where they have only two $90^\circ$ neighbours instead of three. The molecule is therefore **T-shaped**: one equatorial fluorine and two axial ones. In bonding terms, the equatorial $\mathrm{Cl{-}F}$ bond is an ordinary two-centre two-electron bond, while the two axial fluorines share one chlorine $p$ orbital in a linear $\mathrm{F{-}Cl{-}F}$ three-centre four-electron bond — bond order $\tfrac12$ per link, hence longer and weaker. The axial fluorines bend slightly *away* from the equatorial lone pairs, which occupy more space than bonding pairs, closing the angle to the equatorial fluorine to $87.5^\circ$. The same analysis gives the T shape of $\mathrm{BrF_3}$ and the square pyramid of $\mathrm{BrF_5}$ (one lone pair, $\mathrm{AX_5E}$), whose basal fluorines bend slightly towards the apex, away from the lone pair.
:::
:::

### Polyhalide ions

Halide ions add halogen molecules to form **polyhalide** anions. The best known is the triiodide ion, formed when iodine dissolves in potassium iodide solution:
$$
\mathrm{I_2(aq) + I^-(aq) \rightleftharpoons I_3^-(aq)}, \qquad K \approx 7.0\times10^{2}\ \text{at}\ 25\ \mathrm{^\circ C}.
$$
$\mathrm{I_3^-}$ is linear, with a three-centre four-electron bond along the $\mathrm{I{-}I{-}I}$ axis, isoelectronic in its valence shell with $\mathrm{XeF_2}$ and $\mathrm{ICl_2^-}$. The equilibrium is why "iodine solution" in the laboratory is iodine in potassium iodide: elemental iodine dissolves in water only to about $1.3\times10^{-3}\ \mathrm{mol\,dm^{-3}}$. It is also the species that gives the blue starch–iodine colour, where polyiodide chains thread through the amylose helix, used as the end point in iodometry ([[main-group/groups-15-16#ex-iodometry]]). Polyhalide salts follow the size-matching principle of [[main-group/hydrogen-s-block#prop-size-matching]]: large anions such as $\mathrm{I_3^-}$ form stable solid salts with large cations ($\mathrm{CsI_3}$, $\mathrm{[NR_4]I_3}$), while small cations such as $\mathrm{Na^+}$ do not give stable solvent-free triiodide salts.

Some interhalogens are self-ionising solvents in the sense of [[main-group/inorganic-acids-bases#def-autoionization]]: liquid bromine trifluoride conducts electricity through $\mathrm{2\,BrF_3 \rightleftharpoons [BrF_2]^+ + [BrF_4]^-}$, so that in it a fluoride-ion donor is a base and a fluoride acceptor an acid.

::: quiz
Which interhalogen formula is **not** that of a known neutral compound?
- [ ] $\mathrm{BrF_5}$
- [ ] $\mathrm{IF_7}$
- [x] $\mathrm{ClF_4}$
- [ ] $\mathrm{ICl}$
::: solution
Neutral interhalogens have an odd number of terminal atoms, $\mathrm{XY}_n$ with $n = 1, 3, 5, 7$, so that every electron is paired; $\mathrm{ClF_4}$ would be a radical with an odd number of electrons. The ions $\mathrm{[ClF_4]^-}$ (square planar) and $\mathrm{[ClF_4]^+}$ do exist, because adding or removing one electron restores an even count. $\mathrm{BrF_5}$, $\mathrm{IF_7}$ and $\mathrm{ICl}$ are all known.
:::
:::

## The oxoacids and oxoanions of the halogens

Chlorine, bromine and iodine form oxoacids in the oxidation states $+1$, $+3$, $+5$ and $+7$ (fluorine forms only $\mathrm{HOF}$, unstable). For chlorine:

| oxidation state | acid | anion | $\mathrm{p}K_\mathrm{a}$ | shape of anion |
|---|---|---|---|---|
| $+1$ | hypochlorous acid $\mathrm{HOCl}$ | hypochlorite $\mathrm{OCl^-}$ | 7.5 | — |
| $+3$ | chlorous acid $\mathrm{HClO_2}$ | chlorite $\mathrm{ClO_2^-}$ | 2.0 | bent |
| $+5$ | chloric acid $\mathrm{HClO_3}$ | chlorate $\mathrm{ClO_3^-}$ | strong | pyramidal |
| $+7$ | perchloric acid $\mathrm{HClO_4}$ | perchlorate $\mathrm{ClO_4^-}$ | strong | tetrahedral |

Their acid strengths were derived from Pauling's rules in [[main-group/inorganic-acids-bases#ex-chlorine-oxoacids]]. Here we look at their redox chemistry, which is where the practical interest lies: chlorine bleach, chlorine dioxide and perchlorate are all products of it.

The Latimer rows for chlorine in acid (pH 0) and base (pH 14) are, in volts,
$$
\text{acid:}\quad \mathrm{ClO_4^-} \xrightarrow{\,1.20\,} \mathrm{ClO_3^-} \xrightarrow{\,1.19\,} \mathrm{HClO_2} \xrightarrow{\,1.64\,} \mathrm{HOCl} \xrightarrow{\,1.63\,} \mathrm{Cl_2} \xrightarrow{\,1.36\,} \mathrm{Cl^-}
$$
$$
\text{base:}\quad \mathrm{ClO_4^-} \xrightarrow{\,0.37\,} \mathrm{ClO_3^-} \xrightarrow{\,0.30\,} \mathrm{ClO_2^-} \xrightarrow{\,0.68\,} \mathrm{ClO^-} \xrightarrow{\,0.42\,} \mathrm{Cl_2} \xrightarrow{\,1.36\,} \mathrm{Cl^-}
$$
The $\mathrm{Cl_2/Cl^-}$ couple contains no $\mathrm{H^+}$ and is the same in both; all the others involve oxygen and therefore protons, and they fall by roughly $0.8$–$1.2\ \mathrm{V}$ between pH 0 and pH 14.

::: proposition Disproportionation of the halogens in base {#prop-x-disprop}
A halogen $\mathrm{X_2}$ is stable towards disproportionation into $\mathrm{X^-}$ and $\mathrm{HOX}$ in acid but disproportionates into $\mathrm{X^-}$ and $\mathrm{OX^-}$ in base whenever
$$
E^\circ_\mathrm{acid}(\mathrm{HOX/X_2}) > E^\circ(\mathrm{X_2/X^-}) > E^\circ_\mathrm{base}(\mathrm{OX^-/X_2}).
$$
For chlorine, $1.63 > 1.36 > 0.42\ \mathrm{V}$, so $\mathrm{Cl_2 + 2\,OH^- \rightarrow Cl^- + OCl^- + H_2O}$ goes essentially to completion while in acid the reverse reaction (comproportionation) is favoured. The same holds for bromine and iodine. These are statements about equilibria; the rates, and further disproportionation of $\mathrm{OX^-}$ to $\mathrm{XO_3^-}$, depend on temperature and on the halogen.
:::

::: proof The criterion applied twice
By the disproportionation criterion of [[main-group/inorganic-redox#prop-disproportionation]], an intermediate species disproportionates when the potential on its right in the Latimer row exceeds the potential on its left. $\mathrm{X_2}$ is the intermediate between $\mathrm{X^-}$ (right, potential $E^\circ(\mathrm{X_2/X^-})$) and the $+1$ species (left). In acid the left potential, $E^\circ(\mathrm{HOX/X_2})$, is the larger, so $\mathrm{X_2}$ is stable; in base the left potential is $E^\circ(\mathrm{OX^-/X_2})$, and if it is smaller than $E^\circ(\mathrm{X_2/X^-})$, $\mathrm{X_2}$ disproportionates. The halide couple is pH-independent while the oxo couple loses about $0.059\ \mathrm{V}$ per pH unit (more where the acid's $\mathrm{p}K_\mathrm{a}$ is crossed), so a crossover pH must exist between the two extremes.
:::

The figure shows the same information as Frost diagrams.

::: widget plot
f: -1.36 + 1.36*(x+1) + 0.27*(x+abs(x))/2 + 0.01*((x-1)+abs(x-1))/2 - 0.455*((x-3)+abs(x-3))/2 + 0.015*((x-5)+abs(x-5))/2; -1.36 + 1.36*(x+1) - 0.94*(x+abs(x))/2 + 0.26*((x-1)+abs(x-1))/2 - 0.38*((x-3)+abs(x-3))/2 + 0.07*((x-5)+abs(x-5))/2
x: -1.5, 7.5
y: -2, 10.5
points: -1,-1.36; 0,0; 1,1.63; 3,4.91; 5,7.28; 7,9.68; 1,0.42; 3,1.78; 5,2.38; 7,3.12
labels: \text{acid (pH 0)}; \text{base (pH 14)}
caption: Frost diagrams of chlorine ($x$ is the oxidation number, $y$ is $NE^\circ$ in volts) in acid (upper line: $\mathrm{Cl^-}$, $\mathrm{Cl_2}$, $\mathrm{HOCl}$, $\mathrm{HClO_2}$, $\mathrm{ClO_3^-}$, $\mathrm{ClO_4^-}$) and in base (lower line: $\mathrm{Cl^-}$, $\mathrm{Cl_2}$, $\mathrm{ClO^-}$, $\mathrm{ClO_2^-}$, $\mathrm{ClO_3^-}$, $\mathrm{ClO_4^-}$), built from the Latimer rows in the text. $\mathrm{Cl^-}$ at $(-1, -1.36)$ is the lowest point in both, so chloride is the most stable state at every pH. In acid, $\mathrm{Cl_2}$ at the origin lies below the line from $\mathrm{Cl^-}$ to $\mathrm{HOCl}$ and is stable. In base it lies above the line from $\mathrm{Cl^-}$ to $\mathrm{ClO^-}$ and disproportionates. All the oxoanions lie far higher in acid than in base: they are strong oxidants in acid and much milder ones in base. Hypochlorite, $(1, 0.42)$, also lies above the line from $\mathrm{Cl^-}$ to $\mathrm{ClO_3^-}$, so it can disproportionate further to chlorate.
:::

::: example Bleach: making it and keeping it {#ex-bleach}
Household bleach is made by passing chlorine into cold sodium hydroxide solution. (a) Write the reaction, find $E^\circ_\mathrm{cell}$ and $\log K$ at $298\ \mathrm{K}$. (b) Explain why bleach must never be mixed with acidic cleaners. (c) Explain why hot alkali gives chlorate instead of hypochlorite.
::: solution
(a) $\mathrm{Cl_2 + 2\,OH^- \rightarrow Cl^- + OCl^- + H_2O}$. The reduction half is $\mathrm{Cl_2/Cl^-}$ ($1.36\ \mathrm{V}$) and the oxidation half is the reverse of $\mathrm{OCl^-/Cl_2}$ in base ($0.42\ \mathrm{V}$), with one electron transferred per chlorine atom: $E^\circ_\mathrm{cell} = 1.36 - 0.42 = 0.94\ \mathrm{V}$, $\log K = 0.94/0.0592 = 15.9$. The reaction is complete. (b) In acid the potentials reverse their order ($1.63 > 1.36$), so hypochlorite and chloride **comproportionate** back to chlorine: $\mathrm{OCl^- + Cl^- + 2\,H^+ \rightarrow Cl_2 + H_2O}$. Chlorine gas is released — a common cause of household poisoning, analysed quantitatively in [[main-group/inorganic-redox]]. (For gaseous $\mathrm{Cl_2}$ at $1\ \mathrm{bar}$ the hydrolysis constant $K = [\mathrm{HOCl}][\mathrm{H^+}][\mathrm{Cl^-}]/p(\mathrm{Cl_2})$ is $10^{(1.36 - 1.63)/0.0592} \approx 3\times10^{-5}$; per dissolved $\mathrm{Cl_2}$ it is about $4\times10^{-4}$.) (c) Hypochlorite is itself thermodynamically unstable with respect to chloride and chlorate, $\mathrm{3\,OCl^- \rightarrow ClO_3^- + 2\,Cl^-}$ (exercise [[#exr-chlorate]]), but at room temperature the reaction is slow. Heat accelerates it, so chlorine in hot alkali gives chlorate overall, $\mathrm{3\,Cl_2 + 6\,OH^- \rightarrow ClO_3^- + 5\,Cl^- + 3\,H_2O}$ — the traditional route to chlorate salts. Commercial bleach is therefore stored cool and has a limited shelf life.
:::
:::

**Chlorine dioxide**, $\mathrm{ClO_2}$, is an odd-electron molecule (19 valence electrons) that, unlike $\mathrm{NO_2}$, does not dimerise. It is made on site from chlorate and is the main bleaching agent for wood pulp, having replaced elemental chlorine to reduce the formation of chlorinated organic by-products; it is explosive when concentrated and is always handled as a dilute gas or solution. **Perchlorate** is the paradox of the series: at the top of the acid Frost diagram it is thermodynamically one of the strongest oxidants in the table, yet dilute perchlorate solutions are inert at room temperature, so perchlorate is used as a "non-coordinating, non-reacting" anion in electrochemistry. The inertness is kinetic — the chlorine is buried inside a tetrahedron of oxygens with no lone pair or low-lying empty orbital for a reductant to attack. Hot concentrated perchloric acid and solid perchlorates in contact with organic matter or reducing agents, however, can react explosively; they are classed as oxidisers (GHS03) and require special precautions. Perchlorate is also an environmental contaminant of some drinking-water sources, where it interferes with iodide uptake by the thyroid.

Bromine and iodine form analogous series, with two differences. The bromine(VII) state, perbromate, was not made until 1968 and is a stronger oxidant than perchlorate or periodate — an example of the irregularity at the element after the $3d$ series ([[main-group/periodic-trends#ex-ga-al]]). And iodine, being larger, reaches higher coordination numbers with oxygen: the common periodic acid is not $\mathrm{HIO_4}$ but orthoperiodic acid, $\mathrm{H_5IO_6}$, with six oxygens octahedrally around iodine, just as tellurium gives $\mathrm{Te(OH)_6}$ where sulfur and selenium give tetrahedral acids. Periodate cleaves 1,2-diols in organic chemistry, and iodate is a primary standard in iodometric analysis.

## The noble gases

The noble gases were found late because they do nothing: they were discovered as an anomaly in a density, then as unexplained lines in spectra.

::: example Rayleigh's argon {#ex-rayleigh}
In 1894 Lord Rayleigh found that a globe filled with "atmospheric nitrogen" (air from which oxygen, water and carbon dioxide had been removed) held $2.3102\ \mathrm{g}$ of gas, while the same globe filled with nitrogen made chemically from ammonium nitrite or other compounds held $2.2990\ \mathrm{g}$. Assuming the excess is due to argon ($M = 39.95$ against $28.013\ \mathrm{g\,mol^{-1}}$ for $\mathrm{N_2}$), estimate the mole fraction of argon in atmospheric nitrogen and compare with the modern composition of air ($78.08\ \%$ $\mathrm{N_2}$, $0.934\ \%$ Ar by volume).
::: solution
At equal temperature, pressure and volume, the amount of gas is the same in both fillings (Avogadro's principle), so the mass ratio equals the ratio of mean molar masses: $2.3102/2.2990 = 1.004872$. If a mole fraction $f$ of argon is mixed with nitrogen, the mean molar mass relative to nitrogen is $(1 - f) + f(39.95/28.013) = 1 + 0.42612f$. Setting this equal to $1.004872$ gives $f = 0.004872/0.42612 = 0.0114$, or $1.14\ \%$. The modern figure for argon in the nitrogen–argon fraction of air is $0.934/(78.08 + 0.934) = 1.18\ \%$; Rayleigh's half-per-cent difference in mass, measured to four decimal places of a gram, was enough to locate an element. (Neon, helium, krypton and xenon are also present, but together they amount to less than $0.003\ \%$ of air.)
:::
:::

| | He | Ne | Ar | Kr | Xe | Rn |
|---|---|---|---|---|---|---|
| boiling point / K | 4.2 | 27.1 | 87.3 | 119.9 | 165.1 | 211.5 |
| $IE_1$ / $\mathrm{kJ\,mol^{-1}}$ | 2372 | 2081 | 1521 | 1351 | 1170 | 1037 |
| abundance in dry air (by volume) | 5.2 ppm | 18 ppm | 0.934 % | 1.1 ppm | 0.09 ppm | trace |

Their uses follow from inertness and from these few numbers. Helium, the lowest-boiling substance, is the cryogen of the superconducting magnets in MRI scanners and is extracted from natural gas, where it accumulates from radioactive $\alpha$ decay; it is a finite resource. Argon, cheap because it is nearly one per cent of the air (it comes from the $\beta^+$/electron-capture decay of $^{40}\mathrm{K}$ in the Earth's crust), is the inert atmosphere of welding, metallurgy and air-sensitive chemistry. Neon fills discharge signs; xenon fills high-intensity lamps and drives ion thrusters on spacecraft. Radon, the decay product of uranium in rocks, is radioactive ($^{222}\mathrm{Rn}$, half-life $3.8$ days) and accumulates in poorly ventilated buildings; it is the second leading cause of lung cancer after smoking, and many national agencies recommend measuring indoor levels.

### Noble-gas compounds

The ionisation energies fall steadily down the group, and by xenon the value, $1170\ \mathrm{kJ\,mol^{-1}}$, is no larger than that of many molecules that are routinely oxidised. That observation is the whole of Bartlett's discovery.

::: widget plot
f: 1165
x: 1.5, 6.5
y: 800, 2500
points: 2,2081; 3,1521; 4,1351; 5,1170; 6,1037
labels: IE(\mathrm{O_2}) = 1165\ \mathrm{kJ\,mol^{-1}}
caption: First ionisation energies of the noble gases from neon ($x = 2$, period 2) to radon ($x = 6$) in $\mathrm{kJ\,mol^{-1}}$ (helium, 2372, is off the scale), against the ionisation energy of the $\mathrm{O_2}$ molecule (horizontal line). In 1962 Neil Bartlett had just shown that platinum hexafluoride oxidises $\mathrm{O_2}$ to $\mathrm{O_2^+[PtF_6]^-}$. Xenon's ionisation energy, $1170$, is within $5\ \mathrm{kJ\,mol^{-1}}$ of oxygen's, so he reasoned that $\mathrm{PtF_6}$ should oxidise xenon too — and it did. Krypton, $186\ \mathrm{kJ\,mol^{-1}}$ above the line, is not oxidised by $\mathrm{PtF_6}$; argon and neon are far above it. Radon lies below xenon and is even more reactive, but its radioactivity has limited its chemistry to tracer studies.
:::

Bartlett's product, initially formulated as $\mathrm{Xe^+[PtF_6]^-}$, turned out to be a more complex mixture containing $\mathrm{[XeF]^+}$ salts, but it established that xenon has chemistry. Within months, xenon fluorides were made directly from the elements, by heating or irradiating xenon–fluorine mixtures: $\mathrm{XeF_2}$, $\mathrm{XeF_4}$ and $\mathrm{XeF_6}$, the product depending on the proportion of fluorine and the pressure.

::: example The structures of the xenon fluorides {#ex-xef}
Predict the shapes of $\mathrm{XeF_2}$, $\mathrm{XeF_4}$ and $\mathrm{XeF_6}$, and describe the bonding of $\mathrm{XeF_2}$ and $\mathrm{XeF_4}$ without using $d$ orbitals.
::: solution
**VSEPR.** Xenon has eight valence electrons. $\mathrm{XeF_2}$: $8 + 2 = 10$ electrons, five pairs, two bonding: $\mathrm{AX_2E_3}$, with the three lone pairs equatorial in a trigonal bipyramid, so the molecule is **linear**. $\mathrm{XeF_4}$: $8 + 4 = 12$ electrons, six pairs, four bonding: $\mathrm{AX_4E_2}$, with the lone pairs *trans* on an octahedron, so the molecule is **square planar**. $\mathrm{XeF_6}$: $8 + 6 = 14$ electrons, seven pairs, six bonding: $\mathrm{AX_6E}$, which VSEPR predicts to be a **distorted octahedron**; in the gas it is indeed not a regular octahedron, and the distortion is fluxional (the lone pair moves between faces), while the solid contains $\mathrm{[XeF_5]^+}$ and $\mathrm{F^-}$ units.

**Bonding.** In $\mathrm{XeF_2}$ one xenon $5p$ orbital and the two fluorine orbitals pointing at it form a linear three-centre four-electron bond ([[main-group/main-group-bonding#prop-3c4e]]): one bonding pair delocalised over $\mathrm{F{-}Xe{-}F}$, one non-bonding pair on the fluorines, a bond order of $\tfrac12$ per $\mathrm{Xe{-}F}$ link and a partial negative charge on each fluorine. $\mathrm{XeF_4}$ uses two perpendicular $5p$ orbitals in two such bonds, giving the square plane. The model explains why only the most electronegative ligands (F, and O in the oxides and oxofluorides) stabilise xenon compounds: the three-centre bond puts negative charge on the outer atoms. It is the same model that holds together $\mathrm{I_3^-}$, with which $\mathrm{XeF_2}$ is isoelectronic in its valence shell.
:::
:::

::: warning "Inert" was a measurement, not a law {#warn-inert}
For seventy years after their discovery the noble gases were called the "inert gases", and the octet rule was taught as if a filled $s^2p^6$ shell forbade bonding. Several chemists had suggested otherwise — Pauling predicted in 1933 that xenon fluorides and oxyacids should exist — but early attempts failed and the belief hardened. The lesson of 1962 is not that the octet rule is wrong but that it is a statement about energies, and energies can be compared: the ionisation energy of xenon is comparable with that of oxygen, and fluorine's weak bond and strong bonds to other atoms make fluorination exothermic. The mean $\mathrm{Xe{-}F}$ bond enthalpy is only about $130\ \mathrm{kJ\,mol^{-1}}$, but that is still more than half the $\mathrm{F{-}F}$ bond enthalpy, which is all that is needed. Argon showed the same thing in 2000, when HArF was made in a solid argon matrix at very low temperature: the boundary between "inert" and "reactive" depends on how hard one looks, and on the temperature.
:::

Xenon fluorides hydrolyse to oxygen compounds. $\mathrm{XeF_6}$ reacts with water to give xenon trioxide, $\mathrm{XeF_6 + 3\,H_2O \rightarrow XeO_3 + 6\,HF}$; $\mathrm{XeO_3}$ is strongly endothermic and detonates when dry, so it is handled only in dilute solution by specialists. In base, xenon(VI) disproportionates to xenon and perxenate, $\mathrm{[XeO_6]^{4-}}$, in which xenon is $+8$ — among the strongest oxidants known in aqueous solution. Krypton forms $\mathrm{KrF_2}$, a thermodynamically unstable but isolable compound and one of the most powerful oxidative fluorinating agents. The chemistry of the noble gases is now a small but established branch of main-group chemistry, governed by exactly the same rules as the rest.

## Where this leads

The halogens appear in nearly every other course: as leaving groups and in halogenation reactions in [[organic-1/nucleophilic-substitution]] and [[organic-1/radical-reactions]], as ligands and in the trans effect of [[coordination-chemistry/inorganic-mechanisms]], in the chlor–alkali and fluorine industries of [[green-chemistry/industrial-inorganic]], and in the chlorine and bromine catalytic cycles that destroy stratospheric ozone, treated in [[environmental-chemistry/stratospheric-ozone]]. Persistent organohalogen pollutants are the subject of [[environmental-chemistry/pollutants-fate]]. The three-centre bonding that explained interhalogens, triiodide and the xenon fluorides was developed in [[main-group/main-group-bonding]], and the potential diagrams used for the chlorine oxoanions are those of [[main-group/inorganic-redox]]. This chapter completes the survey of the main-group elements; the d block, where partially filled $d$ shells add colour, magnetism and a new kind of bonding, is the subject of [[coordination-chemistry/coordination-compounds]].

::: history
Carl Wilhelm Scheele prepared chlorine in 1774 by heating hydrochloric acid with manganese dioxide, but took it for a compound containing oxygen; Humphry Davy showed in 1810 that it is an element and named it from the Greek for pale green. Iodine was discovered by Bernard Courtois in 1811 in the ash of seaweed, and bromine by Antoine Jérôme Balard in 1826 in the residues of salt production at Montpellier (Carl Löwig isolated it independently at about the same time). Fluorine resisted isolation for most of the century, injuring several chemists who tried, until Henri Moissan obtained it in 1886 by electrolysing potassium fluoride in anhydrous hydrogen fluoride at low temperature; he received the 1906 Nobel Prize in Chemistry. Lord Rayleigh and William Ramsay announced argon in 1894 (Rayleigh received the 1904 Nobel Prize in Physics, Ramsay the Chemistry prize of the same year); Ramsay identified terrestrial helium in 1895 and, with Morris Travers, neon, krypton and xenon in 1898. Neil Bartlett, at the University of British Columbia, made the first noble-gas compound in 1962; xenon tetrafluoride was reported in the same year by Howard Claassen, Henry Selig and John Malm at Argonne National Laboratory, and xenon difluoride by Rudolf Hoppe's group in Germany. In 2000 Markku Räsänen's group in Helsinki made HArF, the first neutral compound of argon.
:::

::: summary
- Halogen properties change smoothly down the group except the bond enthalpy: $\mathrm{F{-}F}$ ($159\ \mathrm{kJ\,mol^{-1}}$) is weak because of lone-pair repulsion across a short bond.
- Fluorine is the strongest oxidant in water ($2.87\ \mathrm{V}$) despite chlorine's larger electron affinity, because its weak bond and above all the large hydration enthalpy of the small $\mathrm{F^-}$ ion win the Hess cycle; it oxidises water and must be made by electrolysis of a molten fluoride.
- Interhalogens $\mathrm{XY}_n$ have odd $n$, the heavier halogen at the centre and VSEPR shapes (T-shaped $\mathrm{XY_3}$, square-pyramidal $\mathrm{XY_5}$, pentagonal-bipyramidal $\mathrm{IF_7}$); $\mathrm{I_3^-}$ and the axial bonds of $\mathrm{ClF_3}$ are three-centre four-electron bonds.
- Halogens are stable in acid but disproportionate in base ($1.63 > 1.36 > 0.42\ \mathrm{V}$ for chlorine): that is how bleach is made, why it must not meet acid, and why hot alkali gives chlorate.
- Halogen oxoanions are strong oxidants in acid and milder in base; perchlorate is thermodynamically powerful but kinetically inert; iodine's size gives the octahedral $\mathrm{H_5IO_6}$.
- Noble-gas reactivity rises with falling ionisation energy: Bartlett's comparison of xenon ($1170$) with $\mathrm{O_2}$ ($1165\ \mathrm{kJ\,mol^{-1}}$) led to the first xenon compound; $\mathrm{XeF_2}$ (linear), $\mathrm{XeF_4}$ (square planar) and $\mathrm{XeF_6}$ (distorted octahedral) follow VSEPR and three-centre bonding.
:::

## Exercises

::: exercise Shapes of interhalogens and polyhalides {level=1}
Predict the shapes of $\mathrm{ClF_5}$, $\mathrm{BrF_3}$, $\mathrm{IF_7}$, $\mathrm{[ICl_4]^-}$ and $\mathrm{[ICl_2]^+}$.
::: solution
$\mathrm{ClF_5}$: $7 + 5 = 12$ electrons, six pairs, one lone: square pyramidal ($\mathrm{AX_5E}$). $\mathrm{BrF_3}$: ten electrons, five pairs, two lone: T-shaped ($\mathrm{AX_3E_2}$). $\mathrm{IF_7}$: fourteen electrons, seven bonding pairs: pentagonal bipyramid ($\mathrm{AX_7}$). $\mathrm{[ICl_4]^-}$: $7 + 4 + 1 = 12$ electrons, six pairs, two lone: square planar ($\mathrm{AX_4E_2}$, isoelectronic with $\mathrm{XeF_4}$). $\mathrm{[ICl_2]^+}$: $7 + 2 - 1 = 8$ electrons, four pairs, two lone: bent ($\mathrm{AX_2E_2}$, like water).
:::
:::

::: exercise The fluorine potential {level=1 check="2.89"}
Calculate $E^\circ(\mathrm{F_2/F^-})$ from $\Delta_\mathrm{f}G^\circ(\mathrm{F^-,aq}) = -278.8\ \mathrm{kJ\,mol^{-1}}$ ($F = 96\,485\ \mathrm{C\,mol^{-1}}$), and explain why fluorine cannot be prepared by electrolysis of aqueous sodium fluoride. (Enter $E^\circ$ in volts to three significant figures.)
::: solution
For $\mathrm{\tfrac12 F_2 + e^- \rightarrow F^-}$ against the hydrogen electrode, $\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{f}G^\circ(\mathrm{F^-,aq}) = -FE^\circ$, so $E^\circ = 278\,800/96\,485 = 2.89\ \mathrm{V}$ (tables give $2.87$, using slightly different data). At an anode in aqueous solution, water is oxidised to oxygen at $1.23\ \mathrm{V}$ (less in neutral solution), far below $2.87\ \mathrm{V}$; and any fluorine that did form would oxidise water. Electrolysis of aqueous fluoride gives oxygen, not fluorine.
:::
:::

::: exercise Rayleigh again {level=1 check="1.18"}
Using the modern figures — dry air contains $78.08\ \%$ $\mathrm{N_2}$ and $0.934\ \%$ Ar by volume, and the other noble gases are negligible — calculate the percentage of argon in "atmospheric nitrogen" (the gas left when $\mathrm{O_2}$, $\mathrm{CO_2}$ and water are removed). (Enter the percentage to three significant figures.)
::: solution
Of the nitrogen–argon mixture, argon is $0.934/(78.08 + 0.934) = 0.01182$, i.e. $1.18\ \%$. Rayleigh's density measurement, analysed in [[#ex-rayleigh]], gave $1.14\ \%$, within 4 % of this.
:::
:::

::: exercise Bromine against chlorine {level=2 check="30.9"}
From $\Delta_\mathrm{at}H^\circ$ ($\mathrm{Cl}$ $121.3$, $\mathrm{Br}$ $111.9\ \mathrm{kJ\,mol^{-1}}$, from the standard states $\mathrm{Cl_2(g)}$ and $\mathrm{Br_2(l)}$), electron affinities ($348.6$, $324.5\ \mathrm{kJ\,mol^{-1}}$ released) and $\Delta_\mathrm{f}H^\circ(\mathrm{X^-,aq})$ ($-167.2$, $-121.6\ \mathrm{kJ\,mol^{-1}}$), find $\Delta_\mathrm{hyd}H^\circ(\mathrm{Br^-}) - \Delta_\mathrm{hyd}H^\circ(\mathrm{Cl^-})$. Which term contributes most to making chlorine the stronger oxidant? (Enter the difference in $\mathrm{kJ\,mol^{-1}}$ to one decimal place.)
::: solution
Using $\Delta_\mathrm{f}H^\circ(\mathrm{X^-,aq}) = \Delta_\mathrm{at}H^\circ - E_\mathrm{ea} + \Delta_\mathrm{hyd}H^\circ$, bromine minus chlorine: $45.6 = -9.4 + 24.1 + \Delta\Delta_\mathrm{hyd}H^\circ$, so $\Delta\Delta_\mathrm{hyd}H^\circ = +30.9\ \mathrm{kJ\,mol^{-1}}$: bromide is hydrated $31\ \mathrm{kJ\,mol^{-1}}$ less exothermically. Of the $45.6\ \mathrm{kJ\,mol^{-1}}$ by which chlorine's cycle is more exothermic, hydration supplies $30.9$ and electron affinity $24.1$, while atomisation works the other way ($-9.4$, bromine being easier to atomise from the liquid). Hydration again dominates, though less overwhelmingly than for fluorine against chlorine.
:::
:::

::: exercise Iodine in potassium iodide {level=2 check="0.0495"}
Iodine dissolves in pure water to $1.33\times10^{-3}\ \mathrm{mol\,dm^{-3}}$. Taking $K = 7.0\times10^{2}$ for $\mathrm{I_2 + I^- \rightleftharpoons I_3^-}$, find the total concentration of dissolved iodine ($[\mathrm{I_2}] + [\mathrm{I_3^-}]$) in a saturated solution in $0.100\ \mathrm{mol\,dm^{-3}}$ KI, assuming $[\mathrm{I_2}]$ stays at its saturation value. (Enter the total in $\mathrm{mol\,dm^{-3}}$ to three significant figures.)
::: solution
Let $y = [\mathrm{I_3^-}]$; then $[\mathrm{I^-}] = 0.100 - y$ and $y = K[\mathrm{I_2}][\mathrm{I^-}] = 700 \times 1.33\times10^{-3} \times (0.100 - y) = 0.931(0.100 - y)$. So $y(1 + 0.931) = 0.0931$ and $y = 0.0482\ \mathrm{mol\,dm^{-3}}$. Total dissolved iodine $= 0.0482 + 0.00133 = 0.0495\ \mathrm{mol\,dm^{-3}}$, about 37 times the solubility in water — which is why iodine reagents are always made up in iodide solution.
:::
:::

::: exercise Estimating the enthalpy of formation of XeF₂ {level=2 check="-107"}
Taking the mean $\mathrm{Xe{-}F}$ bond enthalpy in $\mathrm{XeF_2}$ as $133\ \mathrm{kJ\,mol^{-1}}$ and $D(\mathrm{F{-}F}) = 159\ \mathrm{kJ\,mol^{-1}}$, estimate $\Delta_\mathrm{f}H^\circ(\mathrm{XeF_2,g})$. Then argue why the analogous argon compound $\mathrm{ArF_2}$ is not expected to be stable. (Enter the estimate in $\mathrm{kJ\,mol^{-1}}$ to the nearest unit.)
::: solution
$\mathrm{Xe(g) + F_2(g) \rightarrow XeF_2(g)}$ breaks one $\mathrm{F{-}F}$ bond and makes two $\mathrm{Xe{-}F}$ bonds: $\Delta_\mathrm{f}H^\circ \approx 159 - 2(133) = -107\ \mathrm{kJ\,mol^{-1}}$, in line with the experimental value of about $-108\ \mathrm{kJ\,mol^{-1}}$. The compound forms because the $\mathrm{F{-}F}$ bond is so weak: even bonds as feeble as $133\ \mathrm{kJ\,mol^{-1}}$ more than repay it. For argon, the three-centre bond needs charge transfer from argon to fluorine, and argon's ionisation energy is $351\ \mathrm{kJ\,mol^{-1}}$ higher than xenon's; the $\mathrm{Ar{-}F}$ bonds would be far weaker, certainly less than half of $159$, so $\mathrm{ArF_2}$ would be unstable with respect to the elements.
:::
:::

::: exercise Hypochlorite to chlorate {#exr-chlorate level=3 check="0.40"}
Using the basic Latimer row for chlorine, (a) find $E^\circ(\mathrm{OCl^-/Cl^-})$ and $E^\circ(\mathrm{ClO_3^-/OCl^-})$ in base; (b) find $E^\circ_\mathrm{cell}$ and $\log K$ for $\mathrm{3\,OCl^- \rightarrow ClO_3^- + 2\,Cl^-}$; (c) explain why bleach is nevertheless sold as hypochlorite. (Enter $E^\circ_\mathrm{cell}$ in volts to two decimal places.)
::: hint
Both couples span more than one step of the row. Combine the steps with electron-number weights, then apply the disproportionation criterion to $\mathrm{OCl^-}$.
:::
::: solution
(a) $\mathrm{OCl^- \rightarrow Cl_2 \rightarrow Cl^-}$: one electron per chlorine for each step, so $E^\circ(\mathrm{OCl^-/Cl^-}) = (1 \times 0.42 + 1 \times 1.36)/2 = 0.89\ \mathrm{V}$. $\mathrm{ClO_3^- \rightarrow ClO_2^- \rightarrow OCl^-}$: two electrons each, so $E^\circ(\mathrm{ClO_3^-/OCl^-}) = (2 \times 0.30 + 2 \times 0.68)/4 = 0.49\ \mathrm{V}$. (b) The reduction half is $\mathrm{OCl^-/Cl^-}$ and the oxidation half the reverse of $\mathrm{ClO_3^-/OCl^-}$; the balanced reaction transfers four electrons (one $\mathrm{OCl^-}$ goes from $+1$ to $+5$; two go from $+1$ to $-1$). $E^\circ_\mathrm{cell} = 0.89 - 0.49 = 0.40\ \mathrm{V}$ and $\log K = 4 \times 0.40/0.0592 = 27$. (c) The equilibrium lies overwhelmingly towards chlorate, but the rate at room temperature is slow (the reaction is second order in hypochlorite and has a substantial activation energy), so bleach keeps for months if cool. On the Frost diagram, hypochlorite lies above the line joining $\mathrm{Cl^-}$ and $\mathrm{ClO_3^-}$ — thermodynamics condemns it, kinetics reprieves it.
:::
:::

::: exercise Why krypton resisted Bartlett {level=3}
Bartlett's reasoning compared ionisation energies only. (a) Using the table, find how much more energy it costs to ionise krypton than xenon. (b) The other terms in forming $\mathrm{M^+[PtF_6]^-}$ — the electron affinity of $\mathrm{PtF_6}$ and the lattice energy of the salt — are nearly the same for xenon and krypton. Why? (c) Given that the reaction with xenon is only modestly exothermic, explain why krypton does not react, and suggest why $\mathrm{KrF_2}$ can nevertheless be made by other means.
::: hint
For (b), the lattice energy depends on the sizes of the ions, and $\mathrm{[PtF_6]^-}$ is much larger than either noble-gas cation.
:::
::: solution
(a) $1351 - 1170 = 181\ \mathrm{kJ\,mol^{-1}}$. (b) The electron affinity is a property of $\mathrm{PtF_6}$ alone and is identical for both. The lattice energy, by Kapustinskii, varies as $1/(r_+ + r_-)$; with the large $\mathrm{[PtF_6]^-}$ anion dominating the sum, a modest difference between the radii of $\mathrm{Kr^+}$ and $\mathrm{Xe^+}$ changes the lattice energy by only a few per cent — the same dilution of the cation-size effect that the size-matching principle of [[main-group/hydrogen-s-block#prop-size-matching]] describes. (c) If the xenon reaction is exothermic by a margin smaller than about $180\ \mathrm{kJ\,mol^{-1}}$, the extra ionisation cost makes the krypton reaction endothermic, and with little entropy gain to help, it does not occur. $\mathrm{KrF_2}$ is made differently: by passing an electric discharge through, or irradiating, krypton–fluorine mixtures at very low temperature, which generates fluorine atoms, and trapping the product before it decomposes. $\mathrm{KrF_2}$ is thermodynamically unstable with respect to the elements but kinetically persistent at low temperature — a compound made by supplying energy, not by finding a downhill path.
:::
:::
