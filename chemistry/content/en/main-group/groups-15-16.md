The first two members of groups 15 and 16 are the gases that make up 99 % of the air, nitrogen and oxygen; the next two are solids that burn in it, phosphorus and sulfur. Few pairs of neighbours in the periodic table differ more, and the difference is the double-bond rule of [[main-group/main-group-bonding#prop-double-bond-rule]] in its most dramatic form. Nitrogen and oxygen make short, strong $\pi$ bonds, so the elements are small multiply bonded molecules, $\mathrm{N{\equiv}N}$ and $\mathrm{O{=}O}$. Phosphorus and sulfur make poor $\pi$ bonds and good single bonds, so they catenate into $\mathrm{P_4}$ tetrahedra and $\mathrm{S_8}$ rings. Between them, these four elements supply the two largest-tonnage inorganic chemicals (sulfuric acid and ammonia), the fertilisers that feed about half of humanity, and the phosphate and sulfur chemistry of every living cell. This chapter reads their chemistry through the toolkit: bond enthalpies for structure, Frost diagrams for redox ([[main-group/inorganic-redox]]), Pauling's rules for the oxoacids ([[main-group/inorganic-acids-bases]]), and equilibrium thermodynamics for the industrial processes.

## Nitrogen: the strongest bond in the air

The $\mathrm{N_2}$ molecule has a bond enthalpy of $945\ \mathrm{kJ\,mol^{-1}}$, a bond order of three, a large gap between its highest occupied and lowest unoccupied orbitals, no dipole moment and an ionisation energy ($1503\ \mathrm{kJ\,mol^{-1}}$) almost as high as that of argon ($1521$). It is neither a good acid, nor a good base, nor a good oxidant, nor a good reductant; it is, chemically, nearly inert. Yet thermodynamically it is not especially stable towards many reagents: $\mathrm{N_2 + 3\,H_2 \rightarrow 2\,NH_3}$ is exergonic at room temperature, and so is the oxidation of nitrogen to nitrate by air in water. The inertness of nitrogen is **kinetic**: every reaction must begin by weakening the triple bond, and the first step of breaking it costs far more than the later steps. That is the problem nature solves with the nitrogenase enzyme ([[coordination-chemistry/bioinorganic]]) and industry solves with the Haber–Bosch process.

::: definition Nitrogen fixation {#def-fixation}
**Nitrogen fixation** is any process that converts atmospheric $\mathrm{N_2}$ into a compound that organisms or chemists can use — ammonia, nitrate or an organic nitrogen compound. It occurs biologically (nitrogenase in symbiotic and free-living bacteria, at room temperature and pressure, at the cost of about 16 ATP per $\mathrm{N_2}$), in lightning (which forms NO from $\mathrm{N_2}$ and $\mathrm{O_2}$ at very high temperature), and industrially in the Haber–Bosch process, which today supplies roughly as much fixed nitrogen to the biosphere as all natural processes on land.
:::

### The Haber–Bosch process

Ammonia synthesis is the archetype of an industrial compromise between thermodynamics and kinetics:
$$
\mathrm{N_2(g) + 3\,H_2(g) \rightleftharpoons 2\,NH_3(g)}, \qquad \Delta_\mathrm{r}H^\circ = -91.8\ \mathrm{kJ\,mol^{-1}},\qquad \Delta_\mathrm{r}S^\circ = -198.1\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
The reaction is exothermic and reduces four moles of gas to two, so equilibrium favours ammonia at **low temperature** and **high pressure**. But at low temperature it does not go at all, even on the best catalyst. The plant therefore runs at about $400$–$500\ \mathrm{^\circ C}$, where a promoted iron catalyst (magnetite reduced to iron, with potassium oxide and alumina as promoters) is fast enough, and at $100$–$300\ \mathrm{bar}$ to recover some of the equilibrium yield lost to the high temperature; ammonia is condensed out of the gas leaving the converter and the unreacted gas is recycled. The hydrogen comes from steam reforming of natural gas ([[main-group/hydrogen-s-block]]), which is why ammonia production is responsible for about one to two per cent of global $\mathrm{CO_2}$ emissions.

::: proposition Pressure and the composition of a gas equilibrium {#prop-kx}
For a reaction between ideal gases with stoichiometric coefficients $\nu_i$ (positive for products), let $\Delta\nu = \sum_i \nu_i$ be the change in the number of moles of gas. At total pressure $p$, with mole fractions $x_i$,
$$
K = \prod_i \left(\frac{p_i}{p^\circ}\right)^{\nu_i} = K_x \left(\frac{p}{p^\circ}\right)^{\Delta\nu}, \qquad K_x = \prod_i x_i^{\nu_i}.
$$
$K$ depends only on temperature, so when $\Delta\nu < 0$ the composition quotient $K_x = K(p/p^\circ)^{-\Delta\nu}$ increases with pressure: raising the pressure shifts the equilibrium towards the side with fewer gas molecules. When $\Delta\nu = 0$ pressure has no effect on the composition. Real gases at hundreds of bar deviate from this, and an exact treatment replaces pressures by fugacities.
:::

::: proof Dalton's law in the equilibrium constant
For ideal gases $p_i = x_i p$ (Dalton's law of partial pressures, [[general-chemistry-1/gases]]). Substituting into the thermodynamic equilibrium constant, $\prod_i (x_i p/p^\circ)^{\nu_i} = \prod_i x_i^{\nu_i} \cdot (p/p^\circ)^{\sum_i \nu_i}$, which is the result. Because $K = \exp(-\Delta_\mathrm{r}G^\circ/RT)$ is fixed at a given temperature, the factor $(p/p^\circ)^{\Delta\nu}$ must be compensated by a change in $K_x$. For ammonia synthesis $\Delta\nu = 2 - 4 = -2$, so $K_x = K(p/p^\circ)^2$: doubling the pressure multiplies the composition quotient by four.
:::

::: example The equilibrium yield of ammonia {#ex-haber}
Treating $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$ as constant and the gases as ideal, (a) find the temperature above which $\Delta_\mathrm{r}G^\circ > 0$; (b) find $K$ at $723\ \mathrm{K}$ ($450\ \mathrm{^\circ C}$); (c) find the equilibrium mole fraction of ammonia at $723\ \mathrm{K}$ and $200\ \mathrm{bar}$ from a stoichiometric $1 : 3$ feed.
::: solution
(a) $\Delta_\mathrm{r}G^\circ = 0$ at $T = 91\,800/198.1 = 463\ \mathrm{K}$ ($190\ \mathrm{^\circ C}$). Above it the standard Gibbs energy is positive and $K < 1$.

(b) $\Delta_\mathrm{r}G^\circ(723\ \mathrm{K}) = -91.8 + 723 \times 0.1981 = +51.4\ \mathrm{kJ\,mol^{-1}}$, so
$$
K = \exp\!\left(\frac{-51\,430}{8.314 \times 723}\right) = 1.93\times10^{-4}.
$$
(c) By [[#prop-kx]], start with $1\ \mathrm{mol}$ $\mathrm{N_2}$ and $3\ \mathrm{mol}$ $\mathrm{H_2}$ and let the extent of reaction be $\xi$: the amounts are $1 - \xi$, $3(1 - \xi)$ and $2\xi$, in a total of $4 - 2\xi$. With partial pressures $p_i = x_i p$,
$$
K = \frac{x_{\mathrm{NH_3}}^2}{x_{\mathrm{N_2}}x_{\mathrm{H_2}}^3}\left(\frac{p}{p^\circ}\right)^{-2}
\quad\Rightarrow\quad
\frac{4\xi^2(4 - 2\xi)^2}{27(1 - \xi)^4} = K\left(\frac{p}{p^\circ}\right)^2 = 1.93\times10^{-4} \times 200^2 = 7.70 .
$$
This quartic has to be solved numerically (the figure below does it by Newton's method): $\xi = 0.534$, so $x_{\mathrm{NH_3}} = 2(0.534)/(4 - 1.068) = 0.364$. About $36\ \%$ ammonia at equilibrium, close to the measured value under these conditions, despite $K$ being only $2\times10^{-4}$; pressure enters squared, and $200^2 = 4\times10^{4}$ is what rescues the yield. A real converter does not reach equilibrium in one pass and typically delivers 15–25 % ammonia, which is why recycling is essential.
:::
:::

::: widget newton
f: 4*x^2*(4-2*x)^2 - 208.0*(1-x)^4
method: newton
x0: 0.5
x: 0, 1
caption: Newton's method for the ammonia equilibrium of [[#ex-haber]], written as $f(\xi) = 4\xi^2(4 - 2\xi)^2 - 27K(p/p^\circ)^2(1 - \xi)^4$ with $27 \times 7.70 = 208.0$ ($723\ \mathrm{K}$, $200\ \mathrm{bar}$). From $\xi_0 = 0.5$ the iteration converges in a few steps to $\xi = 0.534$, giving $36.4\ \%$ ammonia. The root must lie between 0 and 1 (no more nitrogen can react than was fed); the factor $(1 - \xi)^4$ makes $f$ steep near $\xi = 1$, so a starting guess too close to 1 is a poor choice.
:::

::: warning Le Chatelier is not a rate law {#warn-le-chatelier}
"The reaction is exothermic, so run it cold" is right about the equilibrium and wrong about the plant. Le Chatelier's principle predicts the direction in which an equilibrium shifts; it says nothing about how fast equilibrium is reached. Below about $650\ \mathrm{K}$ even the iron catalyst cannot dissociate $\mathrm{N_2}$ at a useful rate (the dissociative adsorption of $\mathrm{N_2}$ on the iron surface is the rate-determining step), so a converter run at the temperature of best equilibrium yield would make almost nothing. The operating temperature is chosen by kinetics; pressure, recycling and condensation of the product are then used to win back yield. The same logic recurs in the contact process below and in most of industrial chemistry.
:::

### Hydrides, oxides and oxoacids of nitrogen

Ammonia is a weak base ($\mathrm{p}K_\mathrm{a}$ of $\mathrm{NH_4^+}$ $9.25$), an excellent ligand, and as a liquid a solvent for the alkali metals ([[main-group/hydrogen-s-block]]). Hydrazine, $\mathrm{N_2H_4}$, has a weak $\mathrm{N{-}N}$ single bond ($163\ \mathrm{kJ\,mol^{-1}}$) and is a strong reductant whose oxidation to $\mathrm{N_2}$ releases the triple-bond energy; it is toxic and classed as a carcinogen, and its use as a rocket fuel exploits precisely that release.

Nitrogen forms oxides in every oxidation state from $+1$ to $+5$: $\mathrm{N_2O}$ (linear, isoelectronic with $\mathrm{CO_2}$; an anaesthetic and a potent greenhouse gas), $\mathrm{NO}$ (an odd-electron radical, the biological signalling molecule and the first product of combustion in air at high temperature), $\mathrm{N_2O_3}$, $\mathrm{NO_2}$ (a brown radical that dimerises to colourless $\mathrm{N_2O_4}$, $\Delta_\mathrm{r}H^\circ = -57.2\ \mathrm{kJ\,mol^{-1}}$) and $\mathrm{N_2O_5}$ (the anhydride of nitric acid; in the solid it is ionic, $\mathrm{[NO_2]^+[NO_3]^-}$). Nitrous acid, $\mathrm{HNO_2}$, is weak ($\mathrm{p}K_\mathrm{a}$ $3.3$); nitric acid, $\mathrm{HNO_3}$, is strong — the oxoacid rules of [[main-group/inorganic-acids-bases#prop-pauling-rules]] predict both.

::: example The Ostwald process: catalysis chooses the product {#ex-ostwald}
Nitric acid is made by oxidising ammonia with air over a platinum–rhodium gauze at about $900\ \mathrm{^\circ C}$, with a contact time of around a millisecond. Two reactions compete:
$$
\text{(1)}\ \ \mathrm{4\,NH_3 + 5\,O_2 \rightarrow 4\,NO + 6\,H_2O}, \qquad \text{(2)}\ \ \mathrm{4\,NH_3 + 3\,O_2 \rightarrow 2\,N_2 + 6\,H_2O}.
$$
Using $\Delta_\mathrm{f}G^\circ$ ($298\ \mathrm{K}$, $\mathrm{kJ\,mol^{-1}}$): $\mathrm{NH_3(g)}$ $-16.4$, $\mathrm{NO(g)}$ $+87.6$, $\mathrm{H_2O(g)}$ $-228.6$, compare the two reactions and explain why the plant nevertheless makes NO in over 90 % selectivity.
::: solution
$$
\Delta_\mathrm{r}G^\circ_1 = 4(87.6) + 6(-228.6) - 4(-16.4) = 350.4 - 1371.6 + 65.6 = -955.6\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta_\mathrm{r}G^\circ_2 = 6(-228.6) - 4(-16.4) = -1306.0\ \mathrm{kJ\,mol^{-1}}.
$$
Both are hugely favourable, and the route to $\mathrm{N_2}$ is more favourable by $350\ \mathrm{kJ}$; at equilibrium essentially no NO would survive, since NO itself is unstable with respect to $\mathrm{N_2}$ and $\mathrm{O_2}$ ($\Delta_\mathrm{f}G^\circ > 0$). The process works because it never approaches equilibrium. On the platinum surface the oxidation of adsorbed ammonia fragments to NO is fast, while the recombination of two nitrogen atoms to $\mathrm{N_2}$ is comparatively slow; the gas is swept off the gauze within a millisecond and cooled, freezing the kinetic product before it can decompose. The NO is then oxidised by air to $\mathrm{NO_2}$ ($\mathrm{2\,NO + O_2 \rightarrow 2\,NO_2}$) and absorbed in water ($\mathrm{3\,NO_2 + H_2O \rightarrow 2\,HNO_3 + NO}$, the NO being recycled). The example is a reminder that a catalyst can do more than speed a reaction to equilibrium: by accelerating one pathway selectively, it decides *which* equilibrium the system heads for.
:::
:::

The redox chemistry of nitrogen is best read from its Frost diagram, built from the Latimer row in acid (pH 0, potentials in volts):
$$
\mathrm{NO_3^-} \xrightarrow{\,0.80\,} \mathrm{N_2O_4} \xrightarrow{\,1.07\,} \mathrm{HNO_2} \xrightarrow{\,1.00\,} \mathrm{NO} \xrightarrow{\,1.59\,} \mathrm{N_2O} \xrightarrow{\,1.77\,} \mathrm{N_2} \xrightarrow{\,-1.87\,} \mathrm{NH_3OH^+} \xrightarrow{\,1.41\,} \mathrm{N_2H_5^+} \xrightarrow{\,1.28\,} \mathrm{NH_4^+}
$$

::: widget plot
f: -0.815 + 1.275*(x+3) + 0.135*((x+2)+abs(x+2))/2 - 3.28*((x+1)+abs(x+1))/2 + 3.64*(x+abs(x))/2 - 0.18*((x-1)+abs(x-1))/2 - 0.594*((x-2)+abs(x-2))/2 + 0.074*((x-3)+abs(x-3))/2 - 0.267*((x-4)+abs(x-4))/2
x: -3.5, 5.5
y: -1.5, 7
points: -3,-0.815; -2,0.46; -1,1.87; 0,0; 1,1.77; 2,3.36; 3,4.356; 4,5.426; 5,6.229
labels: \text{Frost diagram, N, pH 0}
caption: Frost diagram of nitrogen in acid ($x$ is the oxidation number, $y$ is $NE^\circ$ in volts for the couple with $\mathrm{N_2}$), from the Latimer row above (unrounded potentials $0.803$, $1.07$, $0.996$, $1.59$, $1.77$, $-1.87$, $1.41$, $1.275\ \mathrm{V}$). The points are $\mathrm{NH_4^+}\ (-3, -0.82)$, $\mathrm{N_2H_5^+}\ (-2, 0.46)$, $\mathrm{NH_3OH^+}\ (-1, 1.87)$, $\mathrm{N_2}\ (0, 0)$, $\mathrm{N_2O}\ (1, 1.77)$, $\mathrm{NO}\ (2, 3.36)$, $\mathrm{HNO_2}\ (3, 4.36)$, $\mathrm{N_2O_4}\ (4, 5.43)$ and $\mathrm{NO_3^-}\ (5, 6.23)$. The slope of each segment is the Latimer potential of that step. $\mathrm{NH_4^+}$ is the lowest point (the most stable state in acid), with $\mathrm{N_2}$ close behind; everything on the right is high, so nitrate, nitrous acid and the oxides are strong oxidants in acid. Hydroxylamine and hydrazine sit on a peak and are thermodynamically unstable towards disproportionation into $\mathrm{N_2}$ and $\mathrm{NH_4^+}$.
:::

::: example Nitrous acid disproportionates {#ex-hno2}
Use the Latimer row to decide whether $\mathrm{HNO_2}$ is stable in acid with respect to $\mathrm{NO_3^-}$ and $\mathrm{NO}$, write the reaction and find $E^\circ_\mathrm{cell}$.
::: solution
The potential to the right of $\mathrm{HNO_2}$ is $E^\circ(\mathrm{HNO_2/NO}) = 0.996\ \mathrm{V}$. The potential to the left, for the two-electron couple $\mathrm{NO_3^-/HNO_2}$, is the electron-weighted average $(1 \times 0.803 + 1 \times 1.07)/2 = 0.94\ \mathrm{V}$ ([[main-group/inorganic-redox#prop-weighted-average]]). Since $0.996 > 0.94$, the disproportionation criterion is satisfied:
$$
\mathrm{3\,HNO_2 \rightarrow NO_3^- + 2\,NO + H^+ + H_2O}, \qquad E^\circ_\mathrm{cell} = 0.996 - 0.94 = 0.06\ \mathrm{V}\ (n = 2).
$$
The driving force is small — $\log K = 2 \times 0.06/0.0592 \approx 2$ — but NO escapes from solution as a gas, which pulls the reaction along. Nitrous acid is therefore made and used in cold, dilute solution as needed (for example to make diazonium salts in [[organic-2/amines]]), never stored. On the Frost diagram, $\mathrm{HNO_2}$ lies very slightly above the line joining NO and $\mathrm{NO_3^-}$.
:::
:::

Nitrate sits high on the right, so it is thermodynamically a strong oxidant in acid ($E^\circ(\mathrm{NO_3^-/NO}) = 0.96\ \mathrm{V}$), and concentrated nitric acid dissolves copper and silver, which hydrogen ions alone cannot oxidise. In neutral solution, however, nitrate is kinetically sluggish: its reduction needs several electron and oxygen-atom transfers, and nitrate fertiliser persists in soils and water until microorganisms reduce it. The anthropogenic flux of this reactive nitrogen into rivers and coastal waters is the subject of [[environmental-chemistry/natural-waters]].

## Phosphorus and the heavier members of group 15

White phosphorus consists of $\mathrm{P_4}$ tetrahedra with $\mathrm{P{-}P}$ bonds of $221\ \mathrm{pm}$ and bond angles of $60^\circ$, far from the $90$–$100^\circ$ that phosphorus's nearly pure $p$ bonding orbitals prefer. The strain makes it reactive: white phosphorus ignites spontaneously in air above about $30\ \mathrm{^\circ C}$, glows in the dark as it oxidises slowly (chemiluminescence — the origin of the word "phosphorescence", though the mechanism is different), and is highly toxic. It is stored under water and handled only with appropriate controls; it is classed as pyrophoric (GHS02), acutely toxic (GHS06) and corrosive. Heating it in the absence of air at about $300\ \mathrm{^\circ C}$ opens the tetrahedra into the polymeric, far less reactive red phosphorus; under pressure it becomes black phosphorus, the thermodynamically stable form, which has puckered layers like a corrugated graphite and is a semiconductor.

Why is phosphorus $\mathrm{P_4}$ and not $\mathrm{P_2}$? Six $\mathrm{P{-}P}$ single bonds ($6 \times 201 = 1206\ \mathrm{kJ\,mol^{-1}}$ per $\mathrm{P_4}$) beat two $\mathrm{P{\equiv}P}$ triple bonds ($2 \times 490 = 980\ \mathrm{kJ\,mol^{-1}}$ for $2\,\mathrm{P_2}$) by over $200\ \mathrm{kJ\,mol^{-1}}$; for nitrogen the same comparison runs the other way ($2 \times 945 = 1890$ against $6 \times 163 = 978$) by over $900$. $\mathrm{P_2}$ molecules exist only in the vapour above about $800\ \mathrm{^\circ C}$.

Phosphorus is mined as phosphate rock (fluorapatite, $\mathrm{Ca_5(PO_4)_3F}$). Most of it never becomes the element: it is treated with sulfuric acid to make phosphoric acid and fertiliser (the "wet process"),
$$
\mathrm{Ca_5(PO_4)_3F + 5\,H_2SO_4 + 10\,H_2O \rightarrow 3\,H_3PO_4 + 5\,CaSO_4{\cdot}2H_2O + HF},
$$
producing large stacks of by-product gypsum. Elemental phosphorus, for high-purity phosphoric acid and phosphorus chemicals, is made in an electric furnace at about $1500\ \mathrm{^\circ C}$, where silica takes the calcium as slag and carbon reduces the phosphate:
$$
\mathrm{2\,Ca_3(PO_4)_2 + 6\,SiO_2 + 10\,C \rightarrow P_4 + 6\,CaSiO_3 + 10\,CO}.
$$

### Oxides, oxoacids and halides of phosphorus

Phosphorus burns to $\mathrm{P_4O_6}$ in limited oxygen and $\mathrm{P_4O_{10}}$ in excess. Both are cages built on the $\mathrm{P_4}$ tetrahedron, with an oxygen inserted into each of the six edges, and in $\mathrm{P_4O_{10}}$ a terminal oxygen on each phosphorus; compare the small molecular $\mathrm{N_2O_5}$ — the double-bond rule again. $\mathrm{P_4O_{10}}$ reacts so exothermically with water, $\mathrm{P_4O_{10} + 6\,H_2O \rightarrow 4\,H_3PO_4}$, that it is one of the most effective drying agents known. Phosphoric acid and its relatives (phosphonic acid $\mathrm{H_3PO_3}$, with one $\mathrm{P{-}H}$ bond and only two acidic protons; phosphinic acid $\mathrm{H_3PO_2}$, with one) were analysed in [[main-group/inorganic-acids-bases#ex-phosphorus-oxoacids]]. Phosphates condense with loss of water to diphosphates and polyphosphates containing $\mathrm{P{-}O{-}P}$ links; the hydrolysis of those links is thermodynamically favourable but slow without a catalyst, which is precisely what makes ATP a good energy currency in [[biochemistry/bioenergetics]].

The halides show hypervalence of the kind discussed in [[main-group/main-group-bonding]]. $\mathrm{PCl_3}$ is pyramidal; $\mathrm{PCl_5}$ is a trigonal bipyramid in the gas, but the solid is ionic, $\mathrm{[PCl_4]^+[PCl_6]^-}$ — a tetrahedral cation and an octahedral anion pack better than trigonal bipyramids. Both chlorides are hydrolysed violently by water, giving $\mathrm{HCl}$ and an oxoacid ($\mathrm{PCl_3 + 3\,H_2O \rightarrow H_3PO_3 + 3\,HCl}$), and are classed as corrosive and toxic by inhalation.

::: example Why the heavier hydrides have 90° angles {#ex-hydride-angles}
The $\mathrm{H{-}E{-}H}$ angles in the group-15 hydrides are $\mathrm{NH_3}$ $106.7^\circ$, $\mathrm{PH_3}$ $93.5^\circ$, $\mathrm{AsH_3}$ $92.1^\circ$, $\mathrm{SbH_3}$ $91.7^\circ$, and in group 16 $\mathrm{H_2O}$ $104.5^\circ$, $\mathrm{H_2S}$ $92.1^\circ$, $\mathrm{H_2Se}$ $90.6^\circ$. Explain why only the second-period hydrides have angles near tetrahedral.
::: solution
An angle near $90^\circ$ means the central atom bonds with almost pure $p$ orbitals and keeps its lone pair in an almost pure $s$ orbital; an angle near $109.5^\circ$ means the $s$ and $p$ orbitals are thoroughly mixed (hybridised). Two factors decide which. First, **the cost of mixing**: hybridisation promotes $s$ character into the bonds, and the $s$–$p$ energy separation, together with the poorer overlap of the large, diffuse $s$ orbital of a heavy atom with hydrogen, makes this progressively less worthwhile down the group. Second, **steric pressure**: around a small second-period atom the bonding pairs are close together and repel each other strongly, which opens the angle (the VSEPR argument, [[bonding-structure/vsepr]]); around a large atom with long $\mathrm{E{-}H}$ bonds ($142\ \mathrm{pm}$ for $\mathrm{P{-}H}$ against $101\ \mathrm{pm}$ for $\mathrm{N{-}H}$) the pairs are far apart and the repulsion is weak. Both factors point the same way, so the heavier hydrides use nearly pure $p$ orbitals. One consequence: the lone pair on phosphorus is mostly $3s$, compact and less directional, so $\mathrm{PH_3}$ is a far weaker base than $\mathrm{NH_3}$ ($\mathrm{p}K_\mathrm{a}$ of $\mathrm{PH_4^+}$ is about $-14$ against $9.25$ for $\mathrm{NH_4^+}$), although phosphines are excellent ligands towards soft metals.
:::
:::

Below phosphorus the group becomes metallic. **Arsenic** and **antimony** are metalloids whose oxides are amphoteric; arsenic compounds are acutely toxic and carcinogenic (arsenic in groundwater is a major public-health problem in parts of South and East Asia), and they are classed accordingly. **Bismuth** is a metal whose chemistry is that of $\mathrm{Bi(III)}$; by the inert-pair effect, bismuth(V), as in sodium bismuthate, is a powerful oxidant able to convert $\mathrm{Mn^{2+}}$ to permanganate. Bismuth is also unusual for a heavy element in being of low toxicity, which allows bismuth salts to be used in medicine.

## Oxygen

Dioxygen is a **triplet**: its two highest electrons occupy the two degenerate $\pi^*$ orbitals with parallel spins (the molecular-orbital result of [[bonding-structure/molecular-orbitals]]), which makes liquid oxygen visibly attracted to a magnet. The triplet ground state explains a paradox: oxygen is a strong oxidant thermodynamically ($E^\circ(\mathrm{O_2/H_2O}) = 1.23\ \mathrm{V}$), yet organic matter does not burst into flame in air, because most organic molecules are singlets and a direct reaction between a triplet and a singlet to give singlet products is spin-forbidden and slow. Once radicals are present (in a flame, or catalysed by metal ions) the restriction is lifted. **Singlet oxygen**, in which the two $\pi^*$ electrons are paired in one orbital, lies $94\ \mathrm{kJ\,mol^{-1}}$ above the ground state; it is formed photochemically and is a reactive oxidant ([[kinetics/photochemistry]]).

**Ozone**, $\mathrm{O_3}$, is a bent molecule (bond angle $116.8^\circ$, both $\mathrm{O{-}O}$ bonds $127.8\ \mathrm{pm}$, intermediate between single and double), formed from $\mathrm{O_2}$ by ultraviolet light or electric discharge. It is a stronger oxidant than $\mathrm{O_2}$ ($E^\circ(\mathrm{O_3/O_2}) = 2.08\ \mathrm{V}$), used to disinfect water, a respiratory irritant in polluted air at ground level, and the stratosphere's shield against ultraviolet radiation ([[environmental-chemistry/stratospheric-ozone]]). The oxides of the other elements were classified as acidic, basic or amphoteric in [[main-group/inorganic-acids-bases#def-oxides]]; peroxides and superoxides were met with the alkali metals in [[main-group/hydrogen-s-block]]; and hydrogen peroxide's thermodynamic instability towards disproportionation was worked through in [[main-group/inorganic-redox]].

## Sulfur

Sulfur catenates where oxygen does not: the $\mathrm{S{-}S}$ bond ($266\ \mathrm{kJ\,mol^{-1}}$) is much stronger than $\mathrm{O{-}O}$ ($146\ \mathrm{kJ\,mol^{-1}}$), because the lone pairs on adjacent oxygen atoms, held close by the short bond, repel each other strongly. Two sulfur single bonds also beat one $\mathrm{S{=}S}$ double bond, so elemental sulfur is a ring, not a diatomic molecule.

::: definition The allotropes of sulfur {#def-sulfur}
The stable form of sulfur at room temperature is **rhombic** ($\alpha$) sulfur, built from crown-shaped $\mathrm{S_8}$ rings. Above $95.3\ \mathrm{^\circ C}$ the same rings pack differently as **monoclinic** ($\beta$) sulfur, which melts at about $119\ \mathrm{^\circ C}$ to a pale yellow, mobile liquid of $\mathrm{S_8}$ rings. Above $159\ \mathrm{^\circ C}$ the rings open into diradical chains that join into polymers up to hundreds of thousands of atoms long, and the viscosity of the liquid rises by a factor of about ten thousand; at higher temperatures still the chains break and the viscosity falls again. Poured into cold water, the polymeric liquid gives rubbery **plastic sulfur**, which slowly reverts to rhombic $\mathrm{S_8}$. Many other rings ($\mathrm{S_6}$, $\mathrm{S_7}$, $\mathrm{S_{12}}$ and larger) have been made and characterised.
:::

Hydrogen sulfide, $\mathrm{H_2S}$, is a weak acid ($\mathrm{p}K_\mathrm{a1} = 7.0$) and a soft ligand, which is why metal sulfides of soft cations are so insoluble — the basis of classical qualitative analysis and of the sulfide ores of copper, zinc and lead. It is also a highly toxic gas (GHS06, acute toxicity by inhalation, comparable in mechanism to cyanide: it blocks cytochrome c oxidase), and particularly treacherous because the smell of rotten eggs disappears at dangerous concentrations as the sense of smell is paralysed.

### Sulfur dioxide, sulfur trioxide and the contact process

Sulfur burns to sulfur dioxide, $\mathrm{SO_2}$, a bent molecule and a moderately strong reducing agent (it is used as an antioxidant preservative in wine and dried fruit), and the source of acid rain where sulfur-containing fuels are burned ([[environmental-chemistry/particulates-acid-deposition]]). Sulfuric acid, made from it, is the largest-volume inorganic chemical, at well over two hundred million tonnes a year, most of it used to make phosphate fertiliser. The **contact process** has three steps: burn sulfur (largely recovered from the desulfurisation of natural gas and oil) to $\mathrm{SO_2}$; oxidise $\mathrm{SO_2}$ to $\mathrm{SO_3}$ over a vanadium(V) oxide catalyst,
$$
\mathrm{2\,SO_2(g) + O_2(g) \rightleftharpoons 2\,SO_3(g)}, \qquad \Delta_\mathrm{r}H^\circ = -197.8\ \mathrm{kJ\,mol^{-1}},\qquad \Delta_\mathrm{r}S^\circ = -188.0\ \mathrm{J\,K^{-1}\,mol^{-1}};
$$
and absorb the $\mathrm{SO_3}$ not in water but in concentrated sulfuric acid, giving oleum ($\mathrm{H_2S_2O_7}$), which is then diluted. Direct reaction of $\mathrm{SO_3}$ with water would release so much heat that it would make a mist of acid droplets impossible to capture.

::: example Running the converter {#ex-contact}
(a) Using the data above and assuming constant $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$, find $K$ for the oxidation of $\mathrm{SO_2}$ at $700\ \mathrm{K}$. (b) Converters are built as three or four catalyst beds in series with cooling between the beds, and the $\mathrm{SO_3}$ is often absorbed before the last bed ("double absorption"). Explain both features.
::: solution
(a) $\Delta_\mathrm{r}G^\circ(700\ \mathrm{K}) = -197.8 + 700 \times 0.1880 = -66.2\ \mathrm{kJ\,mol^{-1}}$, and
$$
K = \exp\!\left(\frac{66\,200}{8.314 \times 700}\right) = 8.7\times10^{4}.
$$
With $K$ this large, conversion at equilibrium is high even at about $1\ \mathrm{bar}$, which is why the process does not need high pressure (unlike ammonia synthesis). (b) The vanadium catalyst needs about $700\ \mathrm{K}$ to work, and the reaction is strongly exothermic. In an insulated bed the gas heats itself as it reacts, and as the temperature climbs $K$ falls (at $1052\ \mathrm{K}$, where $\Delta_\mathrm{r}G^\circ = 0$, it would be 1); a single bed would stop at a modest conversion. Cooling the gas between beds lets each bed run further towards equilibrium at a lower temperature. Absorbing the $\mathrm{SO_3}$ formed before the last bed removes a product — Le Chatelier now used deliberately — so that the remaining $\mathrm{SO_2}$ is converted almost completely, typically above 99.7 %, which both raises the yield and keeps $\mathrm{SO_2}$ emissions low.
:::
:::

Concentrated sulfuric acid is a strong acid in its first dissociation and moderately strong in its second ($\mathrm{p}K_\mathrm{a2} = 1.99$), a powerful dehydrating agent (it chars sugar by removing the elements of water), and an oxidant when hot and concentrated. Its dilution releases a great deal of heat; the rule "add acid to water, never water to acid" exists so that the dense acid sinks into, and is cooled by, the larger volume of water rather than boiling a small amount of water on its surface and spattering. It is classed as corrosive (GHS05) and causes severe burns.

### The sulfur oxoanions

Sulfur has more oxoanions than any other element, because it combines a range of oxidation states with its tendency to catenate. The most important are listed with sulfur's average oxidation state:

| anion | formula | average oxidation state of S | structure and chemistry |
|---|---|---|---|
| sulfate | $\mathrm{SO_4^{2-}}$ | $+6$ | tetrahedral; very weakly basic and redox-inert at room temperature |
| sulfite | $\mathrm{SO_3^{2-}}$ | $+4$ | pyramidal; a reductant; ambidentate ligand (see [[main-group/inorganic-acids-bases#ex-sulfite]]) |
| thiosulfate | $\mathrm{S_2O_3^{2-}}$ | $+2$ | a sulfate with one oxygen replaced by S; a reductant and soft ligand |
| tetrathionate | $\mathrm{S_4O_6^{2-}}$ | $+2.5$ | $\mathrm{^-O_3S{-}S{-}S{-}SO_3^-}$; the oxidation product of thiosulfate |
| dithionite | $\mathrm{S_2O_4^{2-}}$ | $+3$ | weak $\mathrm{S{-}S}$ bond; a strong reductant used in bleaching textiles |
| peroxodisulfate | $\mathrm{S_2O_8^{2-}}$ | $+7$ formally (really $+6$ with a peroxide bridge) | $\mathrm{^-O_3S{-}O{-}O{-}SO_3^-}$; one of the strongest common oxidants, $E^\circ = 2.01\ \mathrm{V}$ |

Average oxidation states that are fractions, or that exceed the group maximum, are a sign that the atoms in the ion are not equivalent: in thiosulfate the central sulfur is better described as $+4$ or $+6$ and the terminal one as $0$ or $-2$, depending on how the $\mathrm{S{-}S}$ bond is assigned; in peroxodisulfate the sulfurs are $+6$ and two of the oxygens are peroxide ($-1$). Oxidation states are bookkeeping ([[main-group/periodic-trends#def-oxstate]]).

::: example Iodometric titration {#ex-iodometry}
In iodometry, an oxidant is added to excess iodide, and the iodine liberated is titrated with standard sodium thiosulfate using starch as indicator:
$$
\mathrm{I_2 + 2\,S_2O_3^{2-} \rightarrow 2\,I^- + S_4O_6^{2-}}.
$$
(a) Show that this is a redox reaction and find the electrons transferred per thiosulfate. (b) A $25.0\ \mathrm{cm^3}$ sample of a solution of household bleach, diluted, is treated with excess KI in acid ($\mathrm{OCl^- + 2\,I^- + 2\,H^+ \rightarrow Cl^- + I_2 + H_2O}$) and requires $18.40\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ thiosulfate. Find the concentration of hypochlorite in the diluted sample.
::: solution
(a) Iodine goes from $0$ to $-1$: two electrons gained per $\mathrm{I_2}$. The average oxidation state of sulfur rises from $+2$ in $\mathrm{S_2O_3^{2-}}$ to $+2.5$ in $\mathrm{S_4O_6^{2-}}$: for two thiosulfates (four sulfurs) the rise is $4 \times 0.5 = 2$, so one electron is lost per thiosulfate. The two thiosulfates are joined by a new $\mathrm{S{-}S}$ bond, an oxidative coupling. (b) Thiosulfate used $= 18.40\times10^{-3}\ \mathrm{dm^3} \times 0.1000\ \mathrm{mol\,dm^{-3}} = 1.840\times10^{-3}\ \mathrm{mol}$. Iodine $= 9.200\times10^{-4}\ \mathrm{mol}$ (two thiosulfates per $\mathrm{I_2}$), which equals the hypochlorite (one $\mathrm{I_2}$ per $\mathrm{OCl^-}$). Concentration $= 9.200\times10^{-4}\ \mathrm{mol}/0.0250\ \mathrm{dm^3} = 0.0368\ \mathrm{mol\,dm^{-3}}$. The method is general: any oxidant that converts iodide quantitatively to iodine can be determined this way, because the thiosulfate–iodine reaction is fast, stoichiometric and has an unmistakable end point (the blue starch–iodine complex disappears). The classical procedure is in [[analytical-chemistry/classical-analysis]].
:::
:::

### Sulfur halides and the heavier chalcogens

Sulfur hexafluoride, $\mathrm{SF_6}$, the octahedral molecule whose twelve electrons were placed in three-centre bonds in [[main-group/main-group-bonding#ex-sf6]], is thermodynamically unstable towards hydrolysis, yet it survives boiling with water or molten alkali: six fluorines shield the small sulfur atom from attack, and there is no low-energy pathway for a nucleophile. That inertness makes it an ideal insulating gas in high-voltage switchgear, and its very long atmospheric lifetime makes it one of the most potent greenhouse gases known, now regulated for that reason. $\mathrm{SF_4}$, with a lone pair (a see-saw shape, $\mathrm{AX_4E}$), is by contrast reactive and is used as a fluorinating agent.

Selenium is an essential trace element (in the amino acid selenocysteine of several enzymes) and toxic in excess; its grey allotrope is a photoconductor, once the heart of photocopiers. Tellurium is a metalloid, used in cadmium telluride solar cells. Polonium, discovered by Marie and Pierre Curie in 1898, is intensely radioactive; all its isotopes are radioactive and its chemistry is studied only in specialised facilities.

::: quiz
Which statement about groups 15 and 16 is correct?
- [ ] Nitrogen is unreactive because $\mathrm{N_2}$ is thermodynamically the most stable form of nitrogen under all conditions.
- [ ] Sulfur forms $\mathrm{S_8}$ rings because $\mathrm{S{=}S}$ double bonds are stronger than two $\mathrm{S{-}S}$ single bonds.
- [x] The contact process does not need high pressure, because $K$ for $\mathrm{SO_2}$ oxidation is large at the operating temperature.
- [ ] $\mathrm{PH_3}$ is a stronger base than $\mathrm{NH_3}$ because phosphorus is larger and its lone pair is more polarisable.
::: solution
At $700\ \mathrm{K}$, $K \approx 9\times10^{4}$ for $\mathrm{2\,SO_2 + O_2 \rightleftharpoons 2\,SO_3}$, so conversion is high at about $1\ \mathrm{bar}$; ammonia synthesis, with $K \approx 2\times10^{-4}$ at its operating temperature, needs high pressure. Nitrogen's unreactivity is kinetic ($\mathrm{NH_4^+}$ lies below $\mathrm{N_2}$ on the Frost diagram, and ammonia synthesis is exergonic at room temperature). Sulfur rings form because two single bonds beat one double bond — the double-bond rule. $\mathrm{PH_3}$ is a much *weaker* Brønsted base than $\mathrm{NH_3}$, because its lone pair is in a diffuse, mostly $s$ orbital.
:::
:::

## Where this leads

The halogens in [[main-group/halogens-noble-gases]] complete the p block, carrying the oxoacid and Frost-diagram methods of this chapter to chlorine, bromine and iodine. Nitrogen fixation, nitrogenase and the sulfur–iron clusters of enzymes are developed in [[coordination-chemistry/bioinorganic]]; the nitrogen and sulfur cycles, acid rain and stratospheric ozone in [[environmental-chemistry/tropospheric-chemistry]], [[environmental-chemistry/particulates-acid-deposition]] and [[environmental-chemistry/stratospheric-ozone]]; and the industrial processes — Haber–Bosch, Ostwald and contact — in [[green-chemistry/industrial-inorganic]]. The surface kinetics that make iron, platinum and vanadium oxide catalysts work is the subject of [[kinetics/surface-kinetics]] and [[organometallics-catalysis/heterogeneous-catalysis]]. Phosphorus ligands — the phosphines — are central to [[organometallics-catalysis/ligands-complexes]], and phosphate esters are the backbone of [[biochemistry/nucleic-acids]].

::: history
Phosphorus was the first element whose discovery can be dated and attributed: Hennig Brand obtained it in Hamburg in 1669 by distilling the residue of evaporated urine, and named it for its glow. Nitrogen was recognised in 1772 by Daniel Rutherford in Edinburgh as the air that remains when combustion and respiration have removed oxygen and "fixed air"; oxygen was prepared by Carl Wilhelm Scheele (about 1771–1772, published 1777) and by Joseph Priestley (1774), and interpreted by Antoine Lavoisier as the agent of combustion. The contact process was patented by Peregrine Phillips in 1831, though it became industrial only around 1900, with platinum and later vanadium catalysts. Wilhelm Ostwald patented the catalytic oxidation of ammonia to nitric acid in 1902. Fritz Haber demonstrated a laboratory ammonia synthesis in 1909, and Carl Bosch and his BASF team, with Alwin Mittasch's systematic search for catalysts, brought it to the first plant at Oppau in 1913; Haber received the Nobel Prize in Chemistry for 1918 and Bosch shared the 1931 prize. Marie and Pierre Curie announced polonium in 1898. Gerhard Ertl's surface-science studies of the iron catalyst, which identified the dissociation of adsorbed $\mathrm{N_2}$ as the rate-determining step, were recognised by the Nobel Prize in Chemistry of 2007.
:::

::: summary
- The double-bond rule divides each group: $\mathrm{N_2}$ and $\mathrm{O_2}$ are multiply bonded diatomics, $\mathrm{P_4}$ and $\mathrm{S_8}$ are singly bonded molecules, because second-period $\pi$ bonds are strong and heavier ones weak.
- Nitrogen's inertness is kinetic. Haber–Bosch balances an exothermic, gas-reducing equilibrium ($K \approx 2\times10^{-4}$ at $723\ \mathrm{K}$) against the rate on an iron catalyst; high pressure restores the yield (about $36\ \%$ at $200\ \mathrm{bar}$).
- Catalysts can choose products: the Ostwald process makes NO although $\mathrm{N_2}$ is the thermodynamic product.
- The nitrogen Frost diagram makes $\mathrm{NH_4^+}$ the most stable state in acid, nitrate and the oxides strong oxidants, and $\mathrm{HNO_2}$, hydroxylamine and hydrazine prone to disproportionation.
- Heavier hydrides have angles near $90^\circ$ and weakly basic lone pairs; $\mathrm{PCl_5}$ is ionic in the solid; $\mathrm{P_4O_{10}}$ is a cage and a powerful dehydrating agent.
- Oxygen is a triplet, so its reactions with singlet molecules are slow; ozone is a stronger oxidant.
- Sulfur catenates ($\mathrm{S{-}S}$ $266$ against $\mathrm{O{-}O}$ $146\ \mathrm{kJ\,mol^{-1}}$), has a rich set of allotropes and oxoanions, and is converted to sulfuric acid by the contact process, which needs a catalyst and interbed cooling but not high pressure.
:::

## Exercises

::: exercise Oxidation states of nitrogen {level=1}
Give the oxidation state of nitrogen in $\mathrm{NH_4^+}$, $\mathrm{N_2H_4}$, $\mathrm{NH_2OH}$, $\mathrm{N_2O}$, $\mathrm{NO}$, $\mathrm{HNO_2}$, $\mathrm{NO_2}$ and $\mathrm{HNO_3}$, and say which are odd-electron molecules.
::: solution
$-3$, $-2$, $-1$, $+1$, $+2$, $+3$, $+4$, $+5$: nitrogen spans all nine states from $-3$ to $+5$ (with $\mathrm{N_2}$ at $0$). NO (11 valence electrons) and $\mathrm{NO_2}$ (17) are odd-electron radicals; both dimerise to some extent, $\mathrm{NO_2}$ readily to $\mathrm{N_2O_4}$, NO only in the solid and liquid.
:::
:::

::: exercise The ammonia crossover {level=1 check="463"}
Using $\Delta_\mathrm{r}H^\circ = -91.8\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = -198.1\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for $\mathrm{N_2 + 3\,H_2 \rightleftharpoons 2\,NH_3}$, find the temperature at which $\Delta_\mathrm{r}G^\circ = 0$, assuming both are independent of temperature. (Enter the temperature in K to the nearest kelvin.)
::: solution
$T = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ = 91\,800/198.1 = 463\ \mathrm{K}$. Below it $K > 1$, above it $K < 1$; the industrial process runs well above it because the catalyst needs the heat, as discussed in [[#warn-le-chatelier]].
:::
:::

::: exercise Shapes from VSEPR {level=1}
Predict the shapes of $\mathrm{NO_2^+}$, $\mathrm{NO_2^-}$, $\mathrm{SO_3}$, $\mathrm{SO_3^{2-}}$, $\mathrm{SF_4}$ and $\mathrm{[PCl_6]^-}$.
::: solution
$\mathrm{NO_2^+}$: two bonding domains, no lone pairs on N, linear (isoelectronic with $\mathrm{CO_2}$). $\mathrm{NO_2^-}$: two bonding domains plus one lone pair, bent (about $115^\circ$). $\mathrm{SO_3}$: three domains, trigonal planar. $\mathrm{SO_3^{2-}}$: three bonds and a lone pair, trigonal pyramidal. $\mathrm{SF_4}$: four bonds and a lone pair, $\mathrm{AX_4E}$, see-saw, with the lone pair equatorial. $\mathrm{[PCl_6]^-}$: six bonds, octahedral.
:::
:::

::: exercise The SO₂ converter at its limit {level=2 check="1052"}
For $\mathrm{2\,SO_2 + O_2 \rightleftharpoons 2\,SO_3}$, $\Delta_\mathrm{r}H^\circ = -197.8\ \mathrm{kJ\,mol^{-1}}$. Calculate $\Delta_\mathrm{r}S^\circ$ from $S^\circ$ ($\mathrm{J\,K^{-1}\,mol^{-1}}$): $\mathrm{SO_3}$ $256.8$, $\mathrm{SO_2}$ $248.2$, $\mathrm{O_2}$ $205.2$, and find the temperature at which $K = 1$. (Enter the temperature in K to the nearest kelvin.)
::: solution
$\Delta_\mathrm{r}S^\circ = 2(256.8) - 2(248.2) - 205.2 = -188.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (dominated by the loss of one mole of gas). $K = 1$ when $\Delta_\mathrm{r}G^\circ = 0$: $T = 197\,800/188.0 = 1052\ \mathrm{K}$. An insulated catalyst bed whose temperature approached this would make little further $\mathrm{SO_3}$, which is why the gas is cooled between beds.
:::
:::

::: exercise Iodometry of a copper salt {level=2 check="0.0920"}
Copper(II) oxidises iodide: $\mathrm{2\,Cu^{2+} + 4\,I^- \rightarrow 2\,CuI(s) + I_2}$. A $25.00\ \mathrm{cm^3}$ sample of copper(II) sulfate solution, treated with excess KI, liberates iodine that requires $23.00\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ sodium thiosulfate. Find the concentration of $\mathrm{Cu^{2+}}$, and explain why the reaction goes although $E^\circ(\mathrm{Cu^{2+}/Cu^+}) = 0.15\ \mathrm{V}$ is less than $E^\circ(\mathrm{I_2/I^-}) = 0.54\ \mathrm{V}$. (Enter the concentration in $\mathrm{mol\,dm^{-3}}$ to three significant figures.)
::: solution
Thiosulfate $= 2.300\times10^{-3}\ \mathrm{mol}$; $\mathrm{I_2} = 1.150\times10^{-3}\ \mathrm{mol}$; $\mathrm{Cu^{2+}} = 2 \times 1.150\times10^{-3} = 2.300\times10^{-3}\ \mathrm{mol}$ (two $\mathrm{Cu^{2+}}$ per $\mathrm{I_2}$, so one $\mathrm{Cu^{2+}}$ per thiosulfate). Concentration $= 2.300\times10^{-3}/0.02500 = 0.0920\ \mathrm{mol\,dm^{-3}}$. The standard potentials refer to aqueous $\mathrm{Cu^+}$; here copper(I) precipitates as CuI ($K_\mathrm{sp} \approx 10^{-12}$), which lowers $[\mathrm{Cu^+}]$ enormously and raises the effective potential of the $\mathrm{Cu^{2+}/CuI}$ couple to about $0.86\ \mathrm{V}$ — above that of iodine. Precipitation, like complexation, moves potentials, as in the gold–cyanide example of [[main-group/inorganic-redox]].
:::
:::

::: exercise The NO₂ dimerisation {level=2 check="6.74"}
For $\mathrm{2\,NO_2(g) \rightleftharpoons N_2O_4(g)}$, $\Delta_\mathrm{f}G^\circ$ at $298.15\ \mathrm{K}$ is $51.31\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{NO_2}$ and $97.89\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{N_2O_4}$. Calculate $K$, and predict qualitatively how the colour of a sealed tube of the equilibrium mixture changes when it is (a) warmed and (b) compressed. ($\Delta_\mathrm{r}H^\circ = -57.2\ \mathrm{kJ\,mol^{-1}}$.) (Enter $K$ to three significant figures.)
::: solution
$\Delta_\mathrm{r}G^\circ = 97.89 - 2(51.31) = -4.73\ \mathrm{kJ\,mol^{-1}}$; $K = \exp(4730/(8.314 \times 298.15)) = 6.74$. (a) The dimerisation is exothermic, so warming shifts the equilibrium towards brown $\mathrm{NO_2}$ and the gas darkens. (b) Compression initially darkens the gas (the same molecules in a smaller volume), then the colour fades somewhat as the equilibrium shifts towards the side with fewer molecules, colourless $\mathrm{N_2O_4}$. Both effects are standard demonstrations; $\mathrm{NO_2}$ is toxic by inhalation, so the tubes are sealed.
:::
:::

::: exercise The Frost diagram of nitrogen {level=2}
From the points in the figure, (a) find the potential of the eight-electron couple $\mathrm{NO_3^-/NH_4^+}$; (b) show that hydroxylamine is unstable towards disproportionation into $\mathrm{N_2}$ and $\mathrm{NH_4^+}$; (c) explain why $\mathrm{N_2}$, although not the lowest point, is the usual end product when nitrogen compounds are oxidised or reduced in nature.
::: solution
(a) The slope between $\mathrm{NH_4^+}\ (-3, -0.815)$ and $\mathrm{NO_3^-}\ (5, 6.229)$ is $(6.229 + 0.815)/8 = 0.88\ \mathrm{V}$. (b) The chord from $\mathrm{NH_4^+}\ (-3, -0.815)$ to $\mathrm{N_2}\ (0, 0)$ passes $(-1)$ at $-0.815 \times 1/3 = -0.27$; hydroxylamine at $(-1, 1.87)$ lies far above it, so $\mathrm{3\,NH_3OH^+ \rightarrow N_2 + NH_4^+ + 2\,H^+ + 3\,H_2O}$ is strongly favourable. (c) $\mathrm{N_2}$ is near the bottom, only $0.82\ \mathrm{V}$ (per three electrons) above $\mathrm{NH_4^+}$, and it is kinetically almost inert: once formed it is not reduced or oxidised further at ordinary temperatures without a catalyst. Reactions that pass through $\mathrm{N_2}$ therefore stop there, which is why denitrification in soils returns nitrogen to the atmosphere as $\mathrm{N_2}$ (and some $\mathrm{N_2O}$), not as ammonium.
:::
:::

::: exercise The pressure in ammonia synthesis {level=3}
Using $K = 1.93\times10^{-4}$ at $723\ \mathrm{K}$ and the method of [[#ex-haber]], (a) show that at low conversion the mole fraction of ammonia is approximately proportional to the pressure; (b) estimate $x_{\mathrm{NH_3}}$ at $100\ \mathrm{bar}$ from this approximation, and compare it with the exact solution, $\xi = 0.403$; (c) explain why industry did not simply go to $1000\ \mathrm{bar}$.
::: hint
When $\xi \ll 1$, replace $(4 - 2\xi)$ by $4$ and $(1 - \xi)$ by $1$, then solve for $\xi$.
:::
::: solution
(a) For small $\xi$: $4\xi^2 \times 16/27 \approx K(p/p^\circ)^2$, so $\xi \approx \sqrt{27K/64}\,(p/p^\circ)$ and $x_{\mathrm{NH_3}} \approx 2\xi/4 = \xi/2$, both proportional to $p$. (b) $\sqrt{27 \times 1.93\times10^{-4}/64} = 9.02\times10^{-3}$, so at $100\ \mathrm{bar}$, $\xi \approx 0.902$ and $x \approx 0.45$ — the approximation has failed badly, because the conversion is not small. The exact $\xi = 0.403$ gives $x = 0.806/3.194 = 0.252$. The linear estimate is valid only at a few bar; at industrial pressures the $(1 - \xi)^4$ term matters and the yield rises much more slowly than $p$ (from $25\ \%$ at $100\ \mathrm{bar}$ to $36\ \%$ at $200$). (c) The diminishing return in yield, the steeply rising cost of compression energy and of thick-walled vessels, and the embrittlement of steel by hydrogen at high pressure and temperature all limit the pressure. Early plants did run at up to about $1000\ \mathrm{bar}$ (the Claude process), but modern plants use better catalysts and recycling at lower pressures; the optimum is economic, not thermodynamic.
:::
:::

::: exercise Thiosulfate and the oxidation-state puzzle {level=3}
Thiosulfate is made by boiling sulfite solution with sulfur: $\mathrm{SO_3^{2-} + S \rightarrow S_2O_3^{2-}}$. (a) Use this synthesis to argue for a structure and assign oxidation states to the two sulfur atoms. (b) In acid, thiosulfate decomposes: $\mathrm{S_2O_3^{2-} + 2\,H^+ \rightarrow S + SO_2 + H_2O}$. Classify this reaction. (c) A $^{35}\mathrm{S}$ label introduced as elemental sulfur in the synthesis appears entirely in the elemental sulfur after acid decomposition. What does that show?
::: hint
Sulfite has a lone pair on sulfur. Think of the elemental sulfur atom as a Lewis acid that attaches to it.
:::
::: solution
(a) The lone pair of sulfite's sulfur attacks the sulfur ring, adding one sulfur atom: thiosulfate is $\mathrm{[S{-}SO_3]^{2-}}$, a tetrahedron with one oxygen of sulfate replaced by sulfur. If the new sulfur keeps its $0$ (it came from the element) the central sulfur keeps sulfite's $+4$ — the average, $+2$, hides two very different atoms. (Assigning the $\mathrm{S{-}S}$ bond ionically to the terminal sulfur instead gives $+6$ and $-2$; both descriptions are bookkeeping.) (b) It is formally the reverse of the synthesis: the terminal sulfur leaves as elemental sulfur ($0$) and the central one as $\mathrm{SO_2}$ ($+4$); in terms of the average oxidation state ($+2 \rightarrow 0$ and $+4$) it is a disproportionation. (c) The two sulfur atoms do not exchange: the atom added as the element is the one that returns to the element. This confirms the non-equivalent structure of (a) and shows that the average oxidation state misrepresents the chemistry. Isotope labelling experiments of this kind were among the first evidence for the structure of thiosulfate.
:::
:::
