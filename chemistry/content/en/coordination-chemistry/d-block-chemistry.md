The thirty elements of groups 3 to 12 include the metals of every age of technology: copper and gold, known since prehistory; iron, the metal of civilisation; titanium, the light, corrosion-resistant metal of aircraft and hip joints; tungsten, with the highest melting point of any metal; platinum, palladium and rhodium in every car exhaust; and cobalt and nickel in rechargeable batteries. Their compounds are pigments (titanium white, chrome yellow, Prussian blue, cobalt blue), catalysts (vanadium(V) oxide for sulfuric acid, iron for ammonia, rhodium and palladium for organic synthesis) and oxidants (permanganate, dichromate, osmium tetroxide). Learning this chemistry compound by compound is hopeless. Fortunately the elements follow a few trends: across a series, down a group, and between the first series and the two heavier ones.

This chapter sets out those trends and then applies them group by group. It uses the electron configurations and radii of [[main-group/periodic-trends]], the redox tools (Latimer and Frost diagrams) of [[main-group/inorganic-redox]], and the ligand field ideas of the earlier chapters of this course to explain why manganese(II) and iron(III) are so stable, why copper(I) disproportionates in water, why the heavier metals prefer higher oxidation states, why zirconium and hafnium are chemically almost identical, and how metals can form quadruple bonds to each other.

## What counts as a transition element

::: definition Transition element and d-block element {#def-transition}
The **d-block** consists of the elements of groups 3–12. IUPAC defines a **transition element** as one whose atom has an incomplete $d$ subshell, or which gives rise to cations with an incomplete $d$ subshell. On this definition the group 12 elements (Zn, Cd, Hg), which are $d^{10}$ in the atom and in all their common compounds, are $d$-block elements but not transition elements. Group 3 (Sc, Y and either La or Lu) is $d^0$ in its only common oxidation state, +3, but its atoms have one $d$ electron, so it is included.
:::

The ground-state configurations of the atoms are mostly $[\text{noble gas}]\,(n-1)d^x\,ns^2$, with exceptions where a half-filled or filled $d$ shell gains enough exchange energy to pull an $s$ electron into it: chromium and copper are $3d^54s^1$ and $3d^{10}4s^1$, and in the second series the exceptions are more numerous (Nb $4d^45s^1$, Mo $4d^55s^1$, Ru $4d^75s^1$, Rh $4d^85s^1$, Pd $4d^{10}5s^0$, Ag $4d^{10}5s^1$), because the $4d$ and $5s$ levels lie closer together. These anomalies matter far less than they appear: in compounds the $(n+1)s$ level lies above $(n)d$, all ions are $d^n$ ([[coordination-chemistry/coordination-compounds#def-dn]]), and the chemistry depends on $n$, not on the configuration of the free atom.

## Trends across and down the d block

### Sizes and the lanthanide contraction

Across each series the metallic radius falls from group 3 to about group 8 and then levels off or rises slightly towards group 11–12, as added electrons shield the extra nuclear charge less and less well and as the $e_g$-type antibonding orbitals begin to fill. Down a group, the radius increases from the first series to the second, as expected, but hardly at all from the second to the third: zirconium and hafnium have metallic radii of $160$ and $159\ \mathrm{pm}$, and the six-coordinate ionic radii of $\mathrm{Zr^{4+}}$ and $\mathrm{Hf^{4+}}$ are $72$ and $71\ \mathrm{pm}$ (Shannon). The reason is the **lanthanide contraction**: between lanthanum and hafnium come the fourteen lanthanides, whose $4f$ electrons shield poorly, so the effective nuclear charge felt by the $5d$ and $6s$ electrons rises by about fourteen units' worth of incompletely shielded charge and cancels the expected increase in size. Relativistic effects, which contract $6s$ orbitals in the heaviest elements, add to it ([[coordination-chemistry/f-block]]).

::: example Zirconium and hafnium {#ex-zr-hf}
Zirconium alloys are used to clad nuclear fuel because zirconium absorbs few neutrons (thermal neutron capture cross-section $0.18\ \mathrm{barn}$), while hafnium absorbs many ($\approx 100\ \mathrm{barn}$) and is used in control rods. Natural zirconium ores contain 1–3 % hafnium. (a) Why is hafnium hard to remove? (b) How does the separation work? (c) What is the hafnium content limit implied if the cross-section of the clad must not exceed $0.20\ \mathrm{barn}$?
::: solution
(a) The lanthanide contraction makes $\mathrm{Zr^{4+}}$ and $\mathrm{Hf^{4+}}$ almost the same size (72 and 71 pm) with the same charge and the same $d^0$ configuration, so they form the same compounds with nearly the same solubilities, volatilities and stability constants; they occur together in every zirconium mineral. Neutrons are the only common probe that sees them as very different, because neutron capture is a nuclear property. (b) Industrial separation uses repeated solvent extraction (for example, thiocyanate complexes into methyl isobutyl ketone) or extractive distillation of the tetrachlorides, which exploit tiny differences in stability constants or volatility magnified over many stages, exactly as fractional distillation does. (c) A weighted average: $0.18(1 - w) + 100w \le 0.20$ for an atom fraction $w$ of hafnium, so $w \le 0.02/99.8 = 2.0\times10^{-4}$, or about 200 parts per million by atoms. Nuclear-grade zirconium is specified to below 100 ppm hafnium, a hundredfold reduction from the ore.
:::
:::

### Cohesion and melting points

The enthalpy of atomisation, $\mathrm{M(s) \rightarrow M(g)}$, measures how strongly the atoms are bonded in the metal, and it is dominated by the number of electrons available for metal–metal bonding in the $d$ band ([[bonding-structure/metallic-bonding]]).

::: widget plot
f: 377.8 + 95.2*(x-3) - 54.0*((x-4)+abs(x-4))/2 - 158.8*((x-5)+abs(x-5))/2 + 1.7*((x-6)+abs(x-6))/2 + 251.5*((x-7)+abs(x-7))/2 - 127.2*((x-8)+abs(x-8))/2 - 3.4*((x-9)+abs(x-9))/2 - 97.3*((x-10)+abs(x-10))/2 - 114.7*((x-11)+abs(x-11))/2; 431.0 + 188.2*(x-3) - 25.4*((x-4)+abs(x-4))/2 - 95.4*((x-5)+abs(x-5))/2 - 146.9*((x-6)+abs(x-6))/2 + 100.6*((x-7)+abs(x-7))/2 - 146.8*((x-8)+abs(x-8))/2 + 25.7*((x-9)+abs(x-9))/2 - 97.1*((x-10)+abs(x-10))/2 - 109.7*((x-11)+abs(x-11))/2
x: 3, 12
y: 0, 900
points: 3,377.8; 4,473; 5,514.2; 6,396.6; 7,280.7; 8,416.3; 9,424.7; 10,429.7; 11,337.4; 12,130.4; 3,431; 4,619.2; 5,782; 6,849.4; 7,769.9; 8,791; 9,665.3; 10,565.3; 11,368.2; 12,61.4
labels: 3d\ (\mathrm{Sc \ldots Zn}); 5d\ (\mathrm{La,\ Hf \ldots Hg})
caption: Standard enthalpies of atomisation at $298\ \mathrm{K}$ (in $\mathrm{kJ\,mol^{-1}}$, CRC Handbook values, rounded) against group number $x$, for the first ($3d$) and third ($5d$) transition series; the lines join the points. In the third series the curve is a broad hump with a maximum at tungsten (group 6, $849\ \mathrm{kJ\,mol^{-1}}$), where the bonding half of the $d$ band is just filled, and falls steeply to mercury, a liquid with only $61\ \mathrm{kJ\,mol^{-1}}$ once the $d$ shell is full. The $5d$ metals are much more strongly bonded than the $3d$ metals because the larger $5d$ orbitals overlap better between neighbouring atoms. The first series has a deep dip at manganese ($281\ \mathrm{kJ\,mol^{-1}}$) and a smaller one at chromium: the half-filled $3d^5$ atom gains so much exchange energy as a free atom that atomising the metal costs less. The same pattern explains why tungsten melts at $3422\ ^\circ\mathrm{C}$ and manganese at $1246\ ^\circ\mathrm{C}$.
:::

### Oxidation states

::: proposition Trends in oxidation states (empirical) {#prop-oxidation-trends}
1. Across the first series the maximum oxidation state equals the group number up to manganese (Sc III, Ti IV, V V, Cr VI, Mn VII), after which it falls (Fe VI, rare; Co, Ni and Cu rarely above III), and the most common oxidation state becomes +2.
2. Down each group, higher oxidation states become more stable and lower ones less so: chromium(VI) is a strong oxidant but molybdenum(VI) and tungsten(VI) are not; manganese(VII) is a strong oxidant but rhenium(VII) is stable; iron stops at VI, but ruthenium and osmium reach VIII in $\mathrm{RuO_4}$ and $\mathrm{OsO_4}$. Conversely, $\mathrm{Fe^{2+}}$, $\mathrm{Co^{2+}}$ and $\mathrm{Ni^{2+}}$ are common simple aqua ions, while their heavier congeners form few simple $\mathrm{M^{2+}}$ ions.
3. The highest oxidation states occur only with the most electronegative ligands, $\mathrm{O^{2-}}$ and $\mathrm{F^-}$, usually as oxoanions or oxides; the lowest (0, negative) need π-acceptor ligands such as CO ([[coordination-chemistry/ligand-field-mo#prop-18e]]).
:::

The first trend follows the ionisation energies: removing all the valence electrons becomes progressively harder across a series as the effective nuclear charge rises, so after manganese the cost of reaching the group oxidation state outweighs the lattice or hydration energy it returns. The second follows the size and energy of the orbitals: $4d$ and $5d$ orbitals are larger and higher in energy relative to the ligand orbitals, they form stronger covalent bonds to oxygen and fluorine, and their ionisation energies (summed for high charges) increase less steeply than the bond energies gained. In aqueous solution the same trends appear in the Frost diagrams: the steep descending slope from $\mathrm{CrO_4^{2-}}$ to $\mathrm{Cr^{3+}}$ has no counterpart for molybdenum or tungsten, whose oxides and oxoanions are their thermodynamic sinks.

::: warning Do not read chemistry from the configuration of the free atom {#warn-configurations}
Chromium's $3d^54s^1$ ground state does not mean that chromium compounds have a "half-filled shell", and copper's $3d^{10}4s^1$ does not mean that copper(I) is the natural state of copper. In compounds all $d$-block ions are $d^n$, and stabilities are set by the competition between ionisation energies and bonding (lattice, hydration, ligand field) energies. Copper(II), $d^9$, is the stable oxidation state in water and in most solids; copper(I), $d^{10}$, disproportionates in water ([[#ex-cu-disproportionation]]) and is stable only with soft ligands or in insoluble compounds. Configurations of free atoms are tested by atomic spectroscopy, not by the chemistry of their compounds.
:::

### Redox potentials across the first series

The potentials of the $\mathrm{M^{3+}/M^{2+}}$ couples combine the third ionisation energy (which jumps where a stable configuration is broken) with the difference in hydration enthalpy and CFSE between the two ions.

::: widget plot
f: 0
x: 2.5, 7.5
y: -1, 2.2
points: 3,-0.26; 4,-0.41; 5,1.54; 6,0.771; 7,1.92
labels: E^\circ = 0
caption: Standard reduction potentials $E^\circ(\mathrm{M^{3+}/M^{2+}})$ (in V, at $298\ \mathrm{K}$, standard tables) against the $d$-electron count $x$ of the reduced ion $\mathrm{M^{2+}}$: vanadium ($d^3$) $-0.26$, chromium ($d^4$) $-0.41$, manganese ($d^5$) $+1.54$, iron ($d^6$) $+0.771$ and cobalt ($d^7$) $+1.92$. The trend is not smooth. Manganese(III) is a strong oxidant because reducing it to $\mathrm{Mn^{2+}}$ reaches the half-filled $d^5$ configuration, which is stabilised by exchange (its third ionisation energy is exceptionally large). Iron, one step further along, shows the reverse: oxidising $\mathrm{Fe^{2+}}$ ($d^6$) to $\mathrm{Fe^{3+}}$ *reaches* $d^5$, so the potential is lower than the trend. Chromium(II) is a strong reductant because oxidation takes it from the Jahn–Teller-distorted $d^4$ to the very stable $t_{2g}^3$ of chromium(III), with a large CFSE. Cobalt(III) in water is so strong an oxidant that it slowly oxidises water; complexation with ammonia changes this completely ([[coordination-chemistry/complex-stability#ex-co-redox]]).
:::

::: proposition Disproportionation from a Latimer diagram {#prop-disproportionation}
For three oxidation states of an element, $\mathrm{A}\ \xrightarrow{E^\circ_\mathrm{L}}\ \mathrm{B}\ \xrightarrow{E^\circ_\mathrm{R}}\ \mathrm{C}$ (from highest to lowest oxidation state, as in a Latimer diagram), the intermediate species B is unstable with respect to disproportionation into A and C when
$$
E^\circ_\mathrm{R} > E^\circ_\mathrm{L},
$$
and for one-electron steps the equilibrium constant is $\log K = (E^\circ_\mathrm{R} - E^\circ_\mathrm{L})/0.05916$ at $298\ \mathrm{K}$.
:::

::: proof
The disproportionation $2\,\mathrm{B} \rightarrow \mathrm{A} + \mathrm{C}$ (for one-electron steps) is the sum of the reduction $\mathrm{B} + e^- \rightarrow \mathrm{C}$ (potential $E^\circ_\mathrm{R}$) and the oxidation $\mathrm{B} \rightarrow \mathrm{A} + e^-$ (the reverse of the couple with potential $E^\circ_\mathrm{L}$). Its cell potential is $E^\circ_\mathrm{cell} = E^\circ_\mathrm{R} - E^\circ_\mathrm{L}$, and $\Delta_\mathrm{r}G^\circ = -FE^\circ_\mathrm{cell}$. The reaction is spontaneous under standard conditions when $E^\circ_\mathrm{cell} > 0$. From $\Delta_\mathrm{r}G^\circ = -RT\ln K$, $\log K = FE^\circ_\mathrm{cell}/(RT\ln10) = E^\circ_\mathrm{cell}/0.05916\ \mathrm{V}$. For steps involving different numbers of electrons, the potentials must first be converted to free energies ($\Delta G^\circ = -nFE^\circ$) and added, which is what a Frost diagram does graphically: B disproportionates when it lies above the line joining A and C ([[main-group/inorganic-redox]]).
:::

::: example Copper(I) in water {#ex-cu-disproportionation}
The Latimer diagram for copper in acid is $\mathrm{Cu^{2+}}\ (+0.153)\ \mathrm{Cu^+}\ (+0.52)\ \mathrm{Cu}$. (a) Show that $\mathrm{Cu^+(aq)}$ disproportionates and find $K$ for $2\,\mathrm{Cu^+} \rightleftharpoons \mathrm{Cu^{2+}} + \mathrm{Cu}$. (b) What is the equilibrium ratio $[\mathrm{Cu^+}]/[\mathrm{Cu^{2+}}]$ in a solution in contact with copper metal when $[\mathrm{Cu^{2+}}] = 0.10\ \mathrm{mol\,dm^{-3}}$? (c) How can copper(I) be stabilised?
::: solution
(a) $E^\circ_\mathrm{R} = 0.52 > E^\circ_\mathrm{L} = 0.153\ \mathrm{V}$, so by [[#prop-disproportionation]] copper(I) disproportionates: $E^\circ_\mathrm{cell} = 0.367\ \mathrm{V}$ and $\log K = 0.367/0.05916 = 6.20$, $K = 1.6\times10^6$. (b) $K = [\mathrm{Cu^{2+}}]/[\mathrm{Cu^+}]^2$, so $[\mathrm{Cu^+}] = \sqrt{0.10/1.6\times10^6} = 2.5\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, a ratio of $2.5\times10^{-3}$. (c) Copper(I) is a soft $d^{10}$ ion. Ligands that bind it more strongly than copper(II) lower the potential of the $\mathrm{Cu^+/Cu}$ couple and raise that of $\mathrm{Cu^{2+}/Cu^+}$ ([[coordination-chemistry/complex-stability#prop-redox-shift]]). Soft ligands such as $\mathrm{Cl^-}$ (in concentrated chloride, $\mathrm{[CuCl_2]^-}$), $\mathrm{CN^-}$, thiolates, phosphines and acetonitrile do this, as does precipitation of insoluble salts (CuCl, CuI, $\mathrm{Cu_2O}$). Tetrahedral or linear coordination, which carries no CFSE penalty for $d^{10}$, also favours copper(I), since copper(II) gains CFSE and Jahn–Teller stabilisation in a tetragonal environment.
:::
:::

## A tour of the first transition series

The remaining sections apply the trends group by group. The emphasis is on the compounds that recur in the rest of chemistry.

**Titanium (group 4).** The stable state is titanium(IV), $d^0$. Titanium dioxide ($\mathrm{TiO_2}$, rutile and anatase) is the dominant white pigment, with a very high refractive index, made by the chloride process ($\mathrm{TiO_2}$ ore + C + $\mathrm{Cl_2} \rightarrow \mathrm{TiCl_4}$, distillation, then burning in oxygen). $\mathrm{TiCl_4}$ is a molecular liquid that fumes in moist air (it hydrolyses to $\mathrm{TiO_2}$ and HCl, and is handled in a fume cupboard with dry apparatus); its reduction with magnesium (the Kroll process) gives titanium metal. Titanium(III), $d^1$, is violet and a moderately strong reductant; $\mathrm{TiCl_3}$ is the basis of Ziegler–Natta catalysts ([[organometallics-catalysis/metathesis-polymerisation]]).

**Vanadium (group 5).** Every state from II to V is accessible in water, with distinct colours: $\mathrm{[V(H_2O)_6]^{2+}}$ violet, $\mathrm{[V(H_2O)_6]^{3+}}$ green, the vanadyl ion $\mathrm{[VO(H_2O)_5]^{2+}}$ blue, and $\mathrm{[VO_2(H_2O)_4]^+}$ yellow. Reducing an acidified vanadate solution with zinc runs through all four colours, a classic demonstration. The vanadyl ion contains a short $\mathrm{V{\equiv}O}$ bond (about $160\ \mathrm{pm}$) with strong π donation from oxygen. Vanadium(V) oxide, $\mathrm{V_2O_5}$, catalyses the oxidation of $\mathrm{SO_2}$ to $\mathrm{SO_3}$ in the contact process by cycling between V(V) and V(IV).

**Chromium (group 6).** Chromium(III), $d^3$, is the thermodynamic sink in water, kinetically inert ([[coordination-chemistry/inorganic-mechanisms]]) and violet or green depending on its ligands. Chromium(VI) exists as yellow chromate, $\mathrm{CrO_4^{2-}}$, in base and orange dichromate, $\mathrm{Cr_2O_7^{2-}}$, in acid, related by the condensation equilibrium $2\,\mathrm{HCrO_4^-} \rightleftharpoons \mathrm{Cr_2O_7^{2-} + H_2O}$, with $\mathrm{p}K_\mathrm{a}(\mathrm{HCrO_4^-}) \approx 6.5$. Dichromate is a strong oxidant in acid ($E^\circ = +1.33\ \mathrm{V}$ to $\mathrm{Cr^{3+}}$). Chromium(VI) compounds are carcinogenic and toxic (GHS06, GHS08) because chromate enters cells through the sulfate transport system and is reduced inside to reactive chromium(V), (IV) and (III) species that damage DNA; for this reason dichromate oxidations have largely been replaced in teaching and industry. Chromium(II), $d^4$, is a powerful reductant ($-0.41\ \mathrm{V}$) and very labile, which is why Taube used it to probe inner-sphere electron transfer. The quadruple bond of chromium(II) acetate is treated below.

**Manganese (group 7).** Manganese spans oxidation states from $-3$ to $+7$. Manganese(II), $d^5$, is the most stable in acid, almost colourless (spin-forbidden bands only, [[coordination-chemistry/spectra-of-complexes#ex-mn2]]), with no CFSE and therefore labile and with no geometric preference. Manganese(III), $d^4$, disproportionates in water unless stabilised by complexation; manganese(IV) is familiar as $\mathrm{MnO_2}$, the cathode of alkaline batteries; manganese(VII) is the intensely purple permanganate, a strong oxidant whose colour is an LMCT band. Biology uses a $\mathrm{Mn_4CaO_5}$ cluster to oxidise water in photosystem II ([[coordination-chemistry/bioinorganic]]).

**Iron (group 8).** Iron(II) and iron(III) dominate. $\mathrm{Fe^{3+}(aq)}$ is a strongly acidic aqua ion ($\mathrm{p}K_\mathrm{a} \approx 2.2$), which hydrolyses and polymerises to the insoluble oxide-hydroxides unless the solution is acidic; this low solubility, $K_\mathrm{sp}$ of $\mathrm{Fe(OH)_3}$ around $10^{-39}$, is why iron is scarce in seawater and why organisms have evolved siderophores and ferritin to handle it. The oxides FeO, $\mathrm{Fe_3O_4}$ (an inverse spinel, [[coordination-chemistry/crystal-field-theory#ex-spinels]]) and $\mathrm{Fe_2O_3}$ are the ores and rusts. Prussian blue, $\mathrm{Fe^{III}_4[Fe^{II}(CN)_6]_3\cdot xH_2O}$, is an intensely blue mixed-valence compound in which low-spin iron(II) is bonded to the carbon of cyanide and high-spin iron(III) to the nitrogen; its colour is an intervalence charge-transfer band, $\mathrm{Fe^{II} \rightarrow Fe^{III}}$ through the cyanide bridge.

**Cobalt and nickel (groups 9 and 10).** Cobalt(II) is pink in water and blue in tetrahedral chloride complexes; cobalt(III) is the archetypal inert low-spin $d^6$ ion of Werner's chemistry. Lithium cobalt oxide, $\mathrm{LiCoO_2}$, in which cobalt cycles between III and IV, was the cathode of the first commercial lithium-ion batteries (1991). Nickel is almost entirely nickel(II), green in water, square planar with strong-field ligands ([[coordination-chemistry/crystal-field-theory]]). The **Mond process** (1890) refines nickel by forming volatile $\mathrm{[Ni(CO)_4]}$ from impure nickel and carbon monoxide near $50\ ^\circ\mathrm{C}$ and decomposing it on pure nickel pellets at about $200$–$250\ ^\circ\mathrm{C}$, an equilibrium shifted by temperature; nickel tetracarbonyl is among the most toxic industrial chemicals, and the process runs in closed plant.

**Copper and zinc (groups 11 and 12).** Copper(II), $d^9$, is almost always Jahn–Teller distorted, blue in water and deep blue-violet with ammonia; copper(I) is $d^{10}$ and white unless it has charge-transfer bands. Zinc is exclusively zinc(II), $d^{10}$, colourless and diamagnetic, with no CFSE; it adopts tetrahedral, five- and six-coordinate geometries with almost equal ease, a flexibility that makes it the Lewis-acid catalyst of many enzymes.

::: quiz
Which of these species would you expect to be a strong oxidising agent in acidic aqueous solution?
- [x] $\mathrm{Mn^{3+}(aq)}$
- [ ] $\mathrm{Cr^{3+}(aq)}$
- [x] $\mathrm{Co^{3+}(aq)}$
- [ ] $\mathrm{[WO_4]^{2-}}$
- [x] $\mathrm{[Cr_2O_7]^{2-}}$
::: solution
$\mathrm{Mn^{3+}}$ ($+1.54\ \mathrm{V}$) and $\mathrm{Co^{3+}}$ ($+1.92\ \mathrm{V}$) are reduced to $d^5$ and high-spin $d^7$ ions with favourable hydration; dichromate ($+1.33\ \mathrm{V}$) is chromium(VI), at the top of the first series where high oxidation states are least stable. Chromium(III) is the thermodynamic sink of chromium. Tungstate is a group-6 heavy-metal oxoanion in its most stable oxidation state and is not an oxidant ([[#prop-oxidation-trends]]).
:::
:::

## The heavier transition metals

The second and third series differ from the first in four systematic ways, all following from the larger, more diffuse $4d$ and $5d$ orbitals.

1. **Higher oxidation states** are more stable, and the common states are often higher (Mo and W(VI), Re(VII), Ru and Os(IV), (VI) and (VIII), Pt(II) and (IV)), with extensive oxide and halide chemistry. The heavier group-6 metals form **polyoxometalates**, large cage anions such as $\mathrm{[PMo_{12}O_{40}]^{3-}}$, the yellow phosphomolybdate used in the colorimetric determination of phosphate.
2. **Larger ligand field splittings**, typically 50 % larger for $4d$ and 75–100 % larger for $5d$ than for $3d$ at the same charge, so that almost all their complexes are **low spin** ([[coordination-chemistry/crystal-field-theory]]) and **substitutionally inert**.
3. **Higher coordination numbers** are common (seven, eight and nine in $\mathrm{[NbF_7]^{2-}}$, $\mathrm{[Mo(CN)_8]^{4-}}$, $\mathrm{[ReH_9]^{2-}}$), because the larger metals have room for more ligands.
4. **Metal–metal bonding** is much more important: there are many halide clusters with metal–metal bonds (for example $\mathrm{[Mo_6Cl_8]^{4+}}$ and $\mathrm{[Nb_6Cl_{12}]^{2+}}$ cores), and the strongest metal–metal multiple bonds known.

The platinum metals (Ru, Os, Rh, Ir, Pd, Pt) are noble and dense, form square-planar $d^8$ complexes as Pd(II), Pt(II), Rh(I) and Ir(I), and are the catalysts of hydrogenation, hydroformylation and cross-coupling ([[organometallics-catalysis]]). Gold is the least reactive metal, dissolving only in oxidising media that also complex it, such as aqua regia ($\mathrm{[AuCl_4]^-}$) or aerated cyanide ($\mathrm{[Au(CN)_2]^-}$).

::: example Why cyanide dissolves gold {#ex-gold}
$E^\circ(\mathrm{Au^+/Au}) = +1.69\ \mathrm{V}$ and $\log\beta_2 = 38.3$ for $\mathrm{[Au(CN)_2]^-}$. (a) Find $E^\circ$ for $\mathrm{[Au(CN)_2]^- + e^- \rightarrow Au + 2\,CN^-}$. (b) Show that oxygen can oxidise gold in cyanide solution at pH 11 ($E(\mathrm{O_2/OH^-}) \approx +0.58\ \mathrm{V}$ at pH 11 and $p(\mathrm{O_2}) = 0.21\ \mathrm{bar}$).
::: solution
(a) The cycle is as in [[coordination-chemistry/complex-stability#prop-redox-shift]], with the reduced form now the metal itself (no complex): $E^\circ = E^\circ(\mathrm{Au^+/Au}) - 0.05916\log\beta_2 = 1.69 - 0.05916 \times 38.3 = 1.69 - 2.27 = -0.58\ \mathrm{V}$. (b) In cyanide the gold couple lies at $-0.58\ \mathrm{V}$ (at unit cyanide activity; at the dilute cyanide of a leach it is less negative by about $2 \times 0.059 \times |\log[\mathrm{CN^-}]|$, still far below $+0.58$), so the cell $\mathrm{O_2 + 4\,Au + 8\,CN^- + 2\,H_2O \rightarrow 4\,[Au(CN)_2]^- + 4\,OH^-}$ has a potential of roughly $+1\ \mathrm{V}$: gold dissolves. The basic pH prevents the formation of hydrogen cyanide, which is extremely toxic and volatile ($\mathrm{p}K_\mathrm{a}(\mathrm{HCN}) = 9.2$). Complexation lowers the potential of gold by more than $2\ \mathrm{V}$: the noble metal is noble only in the absence of a ligand that binds its ion. Cyanide leaching remains the main process for extracting gold from ore, with serious environmental hazards from cyanide spills.
:::
:::

### Metal–metal multiple bonds

In 1964 F. Albert Cotton and co-workers showed that the anion $\mathrm{[Re_2Cl_8]^{2-}}$ has a Re–Re distance of only $224\ \mathrm{pm}$, much shorter than in rhenium metal ($275\ \mathrm{pm}$), and that the two $\mathrm{ReCl_4}$ units are *eclipsed*, even though a staggered arrangement would reduce Cl···Cl repulsion. Both facts are explained by a **quadruple bond**.

::: definition The metal–metal quadruple bond {#def-quadruple}
In a dimer $\mathrm{M_2L_8}$ with the M–M axis along $z$, each metal uses its $d$ orbitals for metal–metal bonding: $d_{z^2}$ overlaps end-on to form a **σ** bond, $d_{xz}$ and $d_{yz}$ overlap side-on to form two **π** bonds, and $d_{xy}$ overlaps face-to-face to form a **δ** bond, which has two nodal planes containing the M–M axis. ($d_{x^2-y^2}$ points at the ligands and is used for M–L bonding.) The bonding orbitals lie in the order $\sigma < \pi < \delta$, followed by the antibonding $\delta^* < \pi^* < \sigma^*$. The **bond order** is half the number of electrons in bonding minus antibonding metal–metal orbitals. Eight electrons ($\sigma^2\pi^4\delta^2$) give a quadruple bond.
:::

The δ bond is weak (its overlap is small) but it requires the eclipsed conformation: in a staggered dimer the two $d_{xy}$ orbitals are rotated $45^\circ$ relative to each other and their overlap vanishes by symmetry. So the eclipsed geometry, against steric preference, is the signature of the δ bond.

::: example Counting metal–metal bonds {#ex-metal-metal}
Find the metal–metal bond order in (a) $\mathrm{[Re_2Cl_8]^{2-}}$, (b) $\mathrm{[Mo_2(O_2CCH_3)_4]}$, (c) $\mathrm{[Re_2Cl_8]^{3-}}$ (hypothetical one-electron reduction product), (d) $\mathrm{[Ru_2(O_2CR)_4]^+}$, and comment on (c).
::: solution
Count the $d$ electrons per metal after assigning ligand charges. (a) Each Re is Re(III), $d^4$: eight electrons, $\sigma^2\pi^4\delta^2$, bond order **4**. (b) Each Mo is Mo(II) (four acetates, $-4$, shared between two metals), $d^4$: again $\sigma^2\pi^4\delta^2$, a quadruple bond, and the Mo–Mo distance is about $209\ \mathrm{pm}$. Chromium(II) acetate is the analogous chromium compound, a red solid first made by Eugène Péligot in 1844. (c) One more electron enters $\delta^*$: $\sigma^2\pi^4\delta^2\delta^{*1}$, bond order $(8 - 1)/2 = 3.5$. Because the δ contribution is small, the bond length would change very little; such reduced and oxidised species, and their small structural changes, were used by Cotton to show that the δ bond is real but weak. (d) Ru(II)/Ru(III), on average $\mathrm{Ru^{2.5+}}$, so $d^{5.5}$ per metal: eleven electrons, $\sigma^2\pi^4\delta^2(\pi^*\delta^*)^3$, bond order $(8 - 3)/2 = 2.5$, with three unpaired electrons in the near-degenerate $\pi^*$ and $\delta^*$ levels.
:::
:::

## Where this leads

The trends of this chapter organise the descriptive chemistry needed in the rest of the curriculum. The catalytic chemistry of the platinum metals is developed in [[organometallics-catalysis]], including the 16- and 18-electron complexes and metal–ligand multiple bonds whose stability follows the same trends. The oxides and spinels appear in [[materials-chemistry/crystal-structures]] and [[materials-chemistry/energy-materials]] (battery cathodes), and the industrial production of titanium dioxide, chromium compounds and the metals themselves in [[green-chemistry/industrial-inorganic]]. The $f$ block, where the lanthanide contraction comes from, is the subject of [[coordination-chemistry/f-block]], and the roles of manganese, iron, cobalt, nickel, copper, zinc and molybdenum in enzymes are surveyed in [[coordination-chemistry/bioinorganic]].

::: history
Several transition metals were discovered in the eighteenth century by Swedish chemists working on minerals: cobalt by Georg Brandt (about 1735), nickel by Axel Cronstedt (1751) and manganese by Johan Gottlieb Gahn (1774). Louis-Nicolas Vauquelin isolated chromium in 1797, naming it for the colours of its compounds, and Andrés Manuel del Río (1801) and Nils Sefström (1830) discovered vanadium. The platinum metals were separated at the start of the nineteenth century by William Hyde Wollaston (palladium, 1803, and rhodium, 1804) and Smithson Tennant (osmium and iridium, 1803). Ludwig Mond, Carl Langer and Friedrich Quincke discovered nickel tetracarbonyl in 1890, and Mond used it to refine nickel. Georg von Hevesy and Dirk Coster discovered hafnium in 1923 in Copenhagen by X-ray spectroscopy of zirconium ores, guided by Niels Bohr's prediction that element 72 should resemble zirconium rather than the rare earths. Victor Goldschmidt named the lanthanide contraction in the 1920s. F. Albert Cotton's 1964 description of the quadruple bond in $\mathrm{[Re_2Cl_8]^{2-}}$ opened the field of metal–metal multiple bonding.
:::

::: summary
- Transition elements have incomplete $d$ subshells in the atom or a common ion; in compounds all $d$-block ions are $d^n$, whatever the configuration of the free atom.
- Radii fall across a series; the lanthanide contraction makes the second and third series almost the same size (Zr and Hf are chemically twins).
- Cohesive energies peak near group 6 (tungsten) and are larger for $4d$ and $5d$ metals; the $3d$ series dips at manganese.
- Maximum oxidation states equal the group number up to group 7 (and 8 for Ru, Os); higher oxidation states become more stable down a group, and the highest need oxide or fluoride ligands.
- Irregular $\mathrm{M^{3+}/M^{2+}}$ potentials across the first series reflect the stability of $d^5$ and the CFSE of $d^3$ and low-spin $d^6$; an intermediate state disproportionates when $E^\circ_\mathrm{R} > E^\circ_\mathrm{L}$ (copper(I) in water, $K = 1.6\times10^6$).
- Each group has a few key compounds: $\mathrm{TiO_2}$, $\mathrm{V_2O_5}$, chromate/dichromate (carcinogenic), permanganate and $\mathrm{MnO_2}$, iron oxides and Prussian blue, $\mathrm{LiCoO_2}$, $\mathrm{[Ni(CO)_4]}$.
- Heavier metals favour higher oxidation states, low spin, higher coordination numbers and metal–metal bonds, up to the σ²π⁴δ² quadruple bond of $\mathrm{[Re_2Cl_8]^{2-}}$, whose δ component forces an eclipsed structure.
:::

## Exercises

::: exercise Oxidation states and d counts {level=1}
Give the oxidation state and $d^n$ count of the metal in $\mathrm{TiCl_4}$, $\mathrm{V_2O_5}$, $\mathrm{[VO(H_2O)_5]^{2+}}$, $\mathrm{K_2Cr_2O_7}$, $\mathrm{KMnO_4}$, $\mathrm{OsO_4}$ and $\mathrm{LiCoO_2}$.
::: solution
Ti(IV) $d^0$; V(V) $d^0$; V(IV) $d^1$ (vanadyl); Cr(VI) $d^0$; Mn(VII) $d^0$; Os(VIII) $d^0$; Co(III) $d^6$ (low spin, which is why $\mathrm{LiCoO_2}$ is diamagnetic). Note how often the highest oxidation states are $d^0$: the metal has lost all its valence electrons, and the colour of such compounds, when present, is charge transfer.
:::
:::

::: exercise Disproportionation of copper(I) {level=1 check="1.6e6"}
Using $E^\circ(\mathrm{Cu^{2+}/Cu^+}) = +0.153\ \mathrm{V}$ and $E^\circ(\mathrm{Cu^+/Cu}) = +0.52\ \mathrm{V}$, find the equilibrium constant for $2\,\mathrm{Cu^+(aq)} \rightleftharpoons \mathrm{Cu^{2+}(aq)} + \mathrm{Cu(s)}$ at $298\ \mathrm{K}$. (Enter $K$ to two significant figures.)
::: solution
$E^\circ_\mathrm{cell} = 0.52 - 0.153 = 0.367\ \mathrm{V}$, $\log K = 0.367/0.05916 = 6.20$, $K = 1.6\times10^6$.
:::
:::

::: exercise Bond order of a molybdenum dimer {level=1 check="4"}
What is the Mo–Mo bond order in $\mathrm{[Mo_2Cl_8]^{4-}}$, and should the two $\mathrm{MoCl_4}$ units be eclipsed or staggered? (Enter the bond order.)
::: solution
Each Mo is Mo(II) ($8 \times (-1)$ plus $2x = -4$ gives $x = +2$), $d^4$: eight electrons, $\sigma^2\pi^4\delta^2$, bond order **4**. The δ bond requires the eclipsed conformation.
:::
:::

::: exercise Manganese(III) in water {level=2 check="10"}
Using $E^\circ(\mathrm{Mn^{3+}/Mn^{2+}}) = +1.54\ \mathrm{V}$ and $E^\circ(\mathrm{MnO_2/Mn^{3+}}) = +0.95\ \mathrm{V}$ (for $\mathrm{MnO_2 + 4\,H^+ + e^- \rightarrow Mn^{3+} + 2\,H_2O}$), show that $\mathrm{Mn^{3+}}$ disproportionates in $1\ \mathrm{mol\,dm^{-3}}$ acid and find $\log K$ for $2\,\mathrm{Mn^{3+} + 2\,H_2O \rightleftharpoons Mn^{2+} + MnO_2 + 4\,H^+}$. (Enter $\log K$ to two significant figures.)
::: solution
The right-hand couple ($1.54\ \mathrm{V}$) exceeds the left-hand one ($0.95\ \mathrm{V}$), so manganese(III) disproportionates ([[#prop-disproportionation]]). $E^\circ_\mathrm{cell} = 1.54 - 0.95 = 0.59\ \mathrm{V}$, $\log K = 0.59/0.05916 = 9.97 \approx 10$. Manganese(III) survives in water only when complexed (by fluoride, sulfate, pyrophosphate or acetate) or at very high acidity, which pushes the equilibrium back.
:::
:::

::: exercise The acidity of iron(III) {level=2 check="2.27"}
Taking $\mathrm{p}K_\mathrm{a} = 2.2$ for $\mathrm{[Fe(H_2O)_6]^{3+}}$ and ignoring further hydrolysis and polymerisation, find the pH of a $0.010\ \mathrm{mol\,dm^{-3}}$ iron(III) nitrate solution. Why does the same treatment not work well for $0.10\ \mathrm{mol\,dm^{-3}}$ solutions left to stand? (Enter the pH to three significant figures.)
::: solution
$K_\mathrm{a} = 10^{-2.2} = 6.31\times10^{-3}$. With $x = [\mathrm{H^+}]$: $x^2/(0.010 - x) = 6.31\times10^{-3}$, so $x^2 + 6.31\times10^{-3}x - 6.31\times10^{-5} = 0$ and $x = 5.39\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ (the approximation $x \ll c$ fails badly here). pH $= 2.27$. At higher concentrations and on standing, $\mathrm{[Fe(OH)(H_2O)_5]^{2+}}$ dimerises to the oxo- or hydroxo-bridged $\mathrm{[Fe_2(\mu\text{-}OH)_2(H_2O)_8]^{4+}}$ and then polymerises towards colloidal iron(III) oxide-hydroxide, releasing more acid; a single $\mathrm{p}K_\mathrm{a}$ no longer describes the solution. This is why iron(III) stock solutions are kept acidified.
:::
:::

::: exercise Explaining group trends {level=2}
Explain (a) why $\mathrm{CrO_3}$ is a dangerously strong oxidant but $\mathrm{WO_3}$ is not; (b) why $\mathrm{OsO_4}$ exists but "$\mathrm{FeO_4}$" does not; (c) why $\mathrm{[NiCl_4]^{2-}}$ is tetrahedral but $\mathrm{[PtCl_4]^{2-}}$ is square planar.
::: solution
(a) High oxidation states become more stable down a group ([[#prop-oxidation-trends]]); chromium(VI) is readily reduced to the very stable chromium(III), while tungsten(VI) is the most stable state of tungsten. $\mathrm{CrO_3}$ ignites many organic materials on contact (GHS03 oxidiser, as well as carcinogenic). (b) Reaching iron(VIII) would require removing eight electrons from a compact $3d$ shell with a high effective nuclear charge; the cost exceeds the bond energy to four oxygens. For osmium the $5d$ orbitals are larger, form stronger bonds to oxygen, and the ionisation energies rise less steeply. $\mathrm{OsO_4}$ is volatile and highly toxic (it stains and fixes tissue, including the cornea) and is handled only in solution and in a fume cupboard. (c) Both are $d^8$. For nickel(II) with weak-field chloride, the square-planar CFSE gain is too small to pay for the extra ligand–ligand repulsion, and the complex is tetrahedral. Platinum(II), a $5d$ ion, has a much larger splitting, so the energy gained by leaving $d_{x^2-y^2}$ empty in the square-planar arrangement dominates.
:::
:::

::: exercise A leaching calculation {level=3 check="-0.58"}
(a) Using $E^\circ(\mathrm{Au^+/Au}) = +1.69\ \mathrm{V}$ and $\log\beta_2 = 38.3$ for $\mathrm{[Au(CN)_2]^-}$, find $E^\circ([\mathrm{Au(CN)_2}]^-/\mathrm{Au})$. (b) Find the actual potential in a leach solution with $[\mathrm{CN^-}] = 1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ and $[\mathrm{[Au(CN)_2]^-}] = 1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$. (c) Is oxygen at $+0.58\ \mathrm{V}$ still able to oxidise gold? (Enter $E^\circ$ for part (a) in V, to two decimal places.)
::: solution
(a) $E^\circ = 1.69 - 0.05916 \times 38.3 = 1.69 - 2.266 = -0.58\ \mathrm{V}$ (to two decimal places, $-0.576$). (b) Nernst: $E = E^\circ - 0.05916\log([\mathrm{CN^-}]^2/[\mathrm{Au(CN)_2^-}]) = -0.576 - 0.05916\log(1.0\times10^{-6}/1.0\times10^{-5}) = -0.576 - 0.05916 \times (-1) = -0.517\ \mathrm{V}$. (c) Yes: the cell potential is about $0.58 - (-0.52) = 1.1\ \mathrm{V}$, strongly positive. The rate, not the thermodynamics, limits industrial leaching, which is governed by oxygen transport to the gold surface.
:::
:::

::: exercise Mixed valence in Prussian blue {level=3}
Prussian blue is $\mathrm{Fe_4[Fe(CN)_6]_3\cdot xH_2O}$. (a) Assign oxidation states and spin states to the two kinds of iron and explain the assignment with the spectrochemical series. (b) Explain why the compound is intensely blue, although neither iron(II) in $\mathrm{[Fe(CN)_6]^{4-}}$ (pale yellow) nor $\mathrm{Fe^{3+}}$ with N-bound ligands (pale) absorbs strongly in the red. (c) Turnbull's blue, made from $\mathrm{Fe^{2+}}$ and $\mathrm{[Fe(CN)_6]^{3-}}$, was once thought to be a different compound. Explain why it is in fact the same.
::: solution
(a) Charge balance: three $\mathrm{[Fe(CN)_6]^{4-}}$ give $-12$, balanced by four $\mathrm{Fe^{3+}}$. The iron bonded to the six carbons of cyanide is iron(II), low spin ($t_{2g}^6$, cyanide at the top of the spectrochemical series, with strong back-bonding); the iron bonded to the nitrogen ends is iron(III), high spin, since N-bound cyanide and water are much weaker field. (b) The blue colour comes from an **intervalence charge-transfer** band near $700\ \mathrm{nm}$: light excites an electron from $\mathrm{Fe^{II}}$ through the $\mathrm{Fe{-}C{\equiv}N{-}Fe}$ bridge to $\mathrm{Fe^{III}}$. The transition is allowed and intense, and it exists only because both oxidation states are present and electronically coupled. (c) Mixing $\mathrm{Fe^{2+}}$ with ferricyanide gives a rapid electron transfer, $\mathrm{Fe^{2+} + [Fe(CN)_6]^{3-} \rightarrow Fe^{3+} + [Fe(CN)_6]^{4-}}$, because the cyanide-bound site strongly prefers iron(II) and the N-bound site iron(III) (the reverse arrangement is far less stable), so the product is the same $\mathrm{Fe^{III}}$/$\mathrm{Fe^{II}(CN)_6}$ framework. Mössbauer spectroscopy in the 1960s confirmed that the two blues are identical.
:::
:::
