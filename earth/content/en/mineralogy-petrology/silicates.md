Ninety per cent of the continental crust, and very nearly all of the mantle beneath it, is built from one structural unit: a silicon atom surrounded by four oxygens. That single arrangement, and the handful of ways in which its corners can be shared, accounts for olivine peridotite in a ophiolite, the micas that make a schist split, the feldspar in your bathroom tile, the clay that holds your garden's water, the quartz in a beach and the garnet in an eclogite. Everything else in the crust — the carbonates, oxides, sulfides and evaporites — is either a minor phase or a chemical sediment.

The reason is a coincidence of chemistry. Silicon is small and four-valent, so it prefers four neighbours; oxygen is the most abundant anion in the planet's outer layers; and the $\mathrm{SiO_4}$ group is so stable that it survives essentially intact from the mantle to the sea floor. What varies is not the tetrahedron but the *connections*: whether each oxygen belongs to one tetrahedron or is shared between two, and what other cations are left over to balance the resulting charge. Follow that one idea and the whole of silicate mineralogy becomes a single continuous argument rather than a list.

## The tetrahedron and why it polymerises

::: definition The silica tetrahedron {#def-tetrahedron}
The **silica tetrahedron** is the complex $\mathrm{SiO_4}^{4-}$: a $\mathrm{Si}^{4+}$ cation at the centre of a regular tetrahedron of four $\mathrm{O}^{2-}$ anions. Its Si–O bond length is $0.162\ \mathrm{nm}$, its O–Si–O angle is close to the ideal $109.5^\circ$, and its bond is about $45\%$ covalent and $55\%$ ionic. Each oxygen carries a residual charge of $-1$ after taking one of silicon's four positive charges, so an isolated tetrahedron has a net charge of $4 - 4\times 2 = 0$ on the silicon plus $-4$ spread over the four oxygens: $\mathrm{SiO_4}^{4-}$.
:::

Two numbers explain everything that follows. The radius ratio $r_{\mathrm{Si}^{4+}}/r_{\mathrm{O}^{2-}} = 0.026/0.138 = 0.19$ sits just *below* the four-fold limit of $0.225$ derived in [[mineralogy-petrology/crystal-chemistry]]: on a purely electrostatic argument silicon should be three-fold coordinated, and it is not. The bond is $45\%$ covalent, and covalency is directional and prefers four equivalent $sp^3$ orbitals — which is why silicon is four-fold coordinated at crustal and upper-mantle pressures, and only above about $8\ \mathrm{GPa}$, when density wins, does it go six-fold. And the Si–O bond energy, some $640\ \mathrm{kJ\,mol^{-1}}$, is far larger than the bond energy of most competing cation–oxygen pairs. Silicon therefore does not compete for oxygen so much as *hold on* to what it already has.

But an isolated $\mathrm{SiO_4}^{4-}$ group is electrostatically uncomfortable: four unshared ("non-bridging") oxygens each carry a full $-1$ charge, and Pauling's second rule says that such a large residual bond strength on an anion makes the structure unstable and reactive. The remedy is to share the oxygens with another silicon. When two tetrahedra share a corner, each of the two silicones contributes $+1$ of bond strength to that oxygen, so the residual charge falls from $-1$ to $0$ and the structure becomes far more stable. This is **polymerisation**, and it is the organising principle of the whole class.

::: definition Bridging and non-bridging oxygens {#def-nbo}
An oxygen shared by two tetrahedral cations is a **bridging oxygen** (bo); one bonded to only one is a **non-bridging oxygen** (nbo). The **degree of polymerisation** of a silicate melt or mineral is commonly expressed by the ratio
$$
\mathrm{NBO/T} = \frac{\text{number of non-bridging oxygens}}{\text{number of tetrahedral cations (T = Si, Al}^{3+}, \mathrm{Fe}^{3+})},
$$
which runs from $4$ for isolated tetrahedra to $0$ for a fully polymerised framework.
:::

::: proposition The oxygen-to-silicon ratio and the structural class {#prop-os-ratio}
If every tetrahedron shares $s$ of its four corners, then the number of oxygens per silicon is
$$
\frac{\mathrm{O}}{\mathrm{Si}} = 4 - \frac{s}{2},
$$
and the anionic charge per silicon is $2(\mathrm{O/Si}) - 4 = 4 - s$ negative charges. The seven structural classes therefore follow directly from $s$:
| $s$ | O/Si | charge per Si | class | example |
|---|---|---|---|---|
| 0 | 4.00 | $-4$ | nesosilicate (isolated) | olivine $\mathrm{Mg_2SiO_4}$ |
| 1 | 3.50 | $-3$ | sorosilicate (pair) | epidote group |
| 2, ring | 3.00 | $-2$ | cyclosilicate (ring) | beryl $\mathrm{Be_3Al_2Si_6O_{18}}$ |
| 2, chain | 3.00 | $-2$ | single-chain inosilicate | pyroxene $\mathrm{MgSiO_3}$ |
| 4, 2 shared | 2.75 | $-1.5$ | double-chain inosilicate | amphibole $\mathrm{Mg_7Si_8O_{22}(OH)_2}$ |
| 3 | 2.50 | $-1$ | phyllosilicate (sheet) | talc $\mathrm{Mg_3Si_4O_{10}(OH)_2}$ |
| 4 | 2.00 | 0 | tectosilicate (framework) | quartz $\mathrm{SiO_2}$ |
:::

::: proof
Each tetrahedron contributes four oxygens, and each shared corner is counted by two tetrahedra, so $s$ shared corners contribute $s/2$ oxygens per tetrahedron and $4 - s/2$ oxygens in total belong to it. The charge follows from the sum of the ionic charges: $4(+1)$ from silicon's four bonds is not the right bookkeeping — count instead the anion charge $-2$ per oxygen and the cation charge $+4$ per silicon, giving $-2(4 - s/2) + 4 = s - 4$, i.e. $4 - s$ negative charges per silicon. For a chain, $s = 2$ and the ratio is $\mathrm{O/Si} = 3$ with a charge of $-2$ per silicon, which is why pyroxenes have the anionic group $[\mathrm{SiO_3}]^{2-}_\infty$ and need two monovalent or one divalent extra-framework cation per silicon. For a sheet, $s = 3$, $\mathrm{O/Si} = 2.5$ and the group is $[\mathrm{Si_2O_5}]^{2-}$, which is why micas and clays carry a permanent negative charge and exchange cations. For the framework, $s = 4$, $\mathrm{O/Si} = 2$ and the charge is zero — pure $\mathrm{SiO_2}$, with no need for any other cation at all.
:::

::: example From tetrahedra to a formula: pyroxene and amphibole {#ex-chain-formula}
Derive the ideal formula of a clinopyroxene and of a tremolitic amphibole from their tetrahedral arrangements.
::: solution
In a **pyroxene** each tetrahedron shares two of its four corners with the same two neighbours, forming a single chain along $c$. With $s = 2$, $\mathrm{O/Si} = 3$ and the charge per silicon is $-2$, so the chain anion is $[\mathrm{SiO_3}]^{2-}$ and one $\mathrm{Mg}^{2+}$ per silicon balances it: $\mathrm{MgSiO_3}$, enstatite.

In an **amphibole** the chains are doubled: within a ribbon some tetrahedra share two corners and some share three, in the ratio 4:4 per repeat of eight silicones. The average is $s = (4\times2 + 4\times3)/8 = 2.5$, so $\mathrm{O/Si} = 4 - 1.25 = 2.75$ and the charge per silicon is $-1.5$. Eight silicones therefore carry $-12$ charges. They are balanced by five $\mathrm{Mg}^{2+}$ in three octahedral sites ($+10$), two $\mathrm{Ca}^{2+}$ in the larger A sites ($+4$) and two hydroxyls ($-2$): $\mathrm{Ca_2Mg_5Si_8O_{22}(OH)_2}$, tremolite. Check the charge directly: $2(2) + 5(2) + 8(4) = 46$ positive against $22\times2 + 2 = 46$ negative. Check the oxygen count: $8\times2.75 = 22$, exactly as in the formula.
:::
:::

::: quiz
A silicate mineral is found to have $\mathrm{O/Si} = 2.5$ and to carry a permanent negative layer charge. Its structural class is
- [ ] nesosilicate
- [ ] inosilicate
- [x] phyllosilicate
- [ ] tectosilicate
::: solution
$s = 4 - 2 \times (4 - 2.5) = 3$ shared corners per tetrahedron, which is the sheet structure. Only a sheet leaves one unshared oxygen per tetrahedron and therefore a permanent charge — the reason clays and micas are the exchange-competent, hydrous, slippery end of the class. Nesosilicates have $\mathrm{O/Si} = 4$, inosilicates $3.0$ or $2.75$, and frameworks exactly $2.0$ with no charge at all.
:::
:::

## The isolated groups: nesosilicates

The olivine group, $\mathrm{M_2SiO_4}$, is the archetype: isolated tetrahedra held together by $\mathrm{Mg}^{2+}$ and $\mathrm{Fe}^{2+}$ in two distorted octahedral sites, M1 and M2. Because the tetrahedra do not have to share corners with each other, there is no requirement for the structure to accommodate any particular size or charge of the extra-framework cation beyond electroneutrality, and olivine consequently forms a complete $\mathrm{Mg_2SiO_4}$–$\mathrm{Fe_2SiO_4}$ solid solution (forsterite–fayalite) and a limited one with $\mathrm{Mn_2SiO_4}$ (tephroite) and $\mathrm{Ca_2SiO_4}$ (melilite component).

The consequences are visible in the hand specimen. Corner-sharing isolated tetrahedra give no preferred direction of strength, so olivine has no cleavage and fractures conchoidally; the structure is dense ($\rho = 3.2$–$3.4\ \mathrm{g\,cm^{-3}}$ for forsterite) and hard (6.5–7); and the empty octahedra make it the principal reservoir of magnesium and half the compatible elements in the mantle. Olivine is also the mantle's main store of water when it contains the hydroxyl defect $[\mathrm{H_4O_4}]^{4-}$ on the silicon site, at up to about $1\ \mathrm{wt}\%$ — several oceans' worth in the transition zone.

The other nesosilicates are the aluminosilicate polymorphs and the garnets. $\mathrm{Al_2SiO_5}$ occurs as andalusite, kyanite and sillimanite, all with one $\mathrm{Si}^{4+}$ in four-fold coordination but with the aluminium differently packaged — five- and six-fold in andalusite, six-fold only in the dense kyanite, and half of it forced into four-fold coordination in sillimanite; their stability fields are the classic pressure–temperature indicator of metamorphic grade. Garnet, $\mathrm{X_3Y_2(SiO_4)_3}$, has isolated tetrahedra plus eight-fold-coordinated dodecahedral X sites (Ca, Mg, Fe, Mn) and octahedral Y sites (Al, Cr, Fe), and its complete solid-solution series — pyrope, almandine, grossular, andradite, uvarovite, knorringite — makes it the single most informative mineral in metamorphic petrology.

::: example Garnet endmembers and the charge balance {#ex-garnet}
Write the six common garnet endmembers and show that each is electrically neutral. Then compute the molar proportions of a garnet with the cation formula $\mathrm{Ca_{1.20}Mg_{0.55}Fe^{2+}_{0.78}Al_{1.92}Fe^{3+}_{0.10}Si_{2.96}O_{12}}$.
::: solution
The general formula is $\mathrm{X_3Y_2Z_3O_{12}}$ with X eight-fold, Y six-fold and Z four-fold. Pyrope $\mathrm{Mg_3Al_2Si_3O_{12}}$: $3(2) + 2(3) + 3(4) = 6 + 6 + 12 = 24 = 12\times2$. Almandine $\mathrm{Fe_3Al_2Si_3O_{12}}$ and grossular $\mathrm{Ca_3Al_2Si_3O_{12}}$ balance identically, since $\mathrm{Ca}$ and $\mathrm{Fe}^{2+}$ are both divalent in the dodecahedral site and $\mathrm{Al}$ is trivalent in Y. Andradite $\mathrm{Ca_3Fe^{3+}_2Si_3O_{12}}$ moves the iron to Y and needs the calcium to keep the charge: $3(2) + 2(3) + 3(4) = 24$. Uvarovite $\mathrm{Ca_3Cr_2Si_3O_{12}}$ and knorringite $\mathrm{Mg_3Cr_2Si_3O_{12}}$ follow the same rule, and the titanium- and iron-rich kimberlitic garnets add $\mathrm{Ti^{4+}}$ with the coupled substitution $\mathrm{Ca^{2+} + Si^{4+} \longrightarrow Na^{+} + Al^{3+}}$-type schemes that keep the total at 24.

For the analysis, normalise to the twelve oxygens (already done) and to three X and two Y cations. X totals $1.20 + 0.55 + 0.78 = 2.53$ and Y totals $1.92 + 0.10 = 2.02$, so the site occupancies are close to full. The molar proportions are therefore pyrope $0.55/3 = 18\%$, almandine $0.78/3 = 26\%$, grossular $1.20/3 = 40\%$ and, taking the ferric iron on Y with the calcium, andradite $0.10/2 = 5\%$; the remaining $11\%$ is the charge-balance slack that a real analysis always carries, here mostly a small Mg–Fe misallocation between the sites.
:::
:::

## Rings, chains and ribbons: the inosilicates and cyclosilicates

Sharing two corners per tetrahedron produces a one-dimensional object, and the structure then has a strong internal direction: cleavage parallel to the chains, high relief along $c$, and anisotropy. Two arrangements are possible and both are common.

**Single chains**, $[\mathrm{SiO_3}]^{2-}_\infty$, are the pyroxenes. The chain sits between two ribbons of octahedral cations, and the two kinds of octahedral site (M1 and M2) allow a wide chemistry: $\mathrm{Mg}$, $\mathrm{Fe}^{2+}$, $\mathrm{Ca}$, $\mathrm{Na}$, $\mathrm{Al}$ (the latter both in the octahedral site and, in jadeite $\mathrm{NaAlSi_2O_6}$, in the tetrahedral site). The pyroxene quadrilateral enstatite–diopside–hedenbergite–ferrosilite organises the common ones; augite, the calcium–aluminium clinopyroxene of basalts, is a four- or five-component solid solution. Pyroxenes cleave at very nearly $93^\circ$ and $87^\circ$, which in thin section is the diagnostic feature that separates them from amphiboles.

**Double chains**, $[\mathrm{Si_4O_{11}}]^{6-}_\infty$, are the amphiboles, and the extra ribbon of octahedral sites in the middle of the double chain can hold $\mathrm{OH}^{-}$, so amphiboles are hydrous. Tremolite–actinolite $\mathrm{Ca_2(Mg,Fe)_5Si_8O_{22}(OH)_2}$ and the hornblendes are the common ones; hornblende's substitution of $\mathrm{Al^{IV}}$ for Si and of $\mathrm{Ti}$, $\mathrm{Na}$ and $\mathrm{K}$ makes it a sensitive recorder of the water content and temperature of the magma it crystallised from. Amphibole cleavage intersects at $56^\circ$ and $124^\circ$.

**Rings**, $[\mathrm{Si_6O_{18}}]^{12-}$, are the cyclosilicates: beryl $\mathrm{Be_3Al_2Si_6O_{18}}$, the tourmalines (chemically the most complex minerals in the crust, with up to 25 elements reported), and cordierite $\mathrm{Mg_2Al_4Si_5Al_{(1)}O_{18}}$, whose rings host the guest molecules that make it anisotropic. The six-membered ring is the reason beryl forms hexagonal prisms and that emerald's chromium colour is possible at all.

::: example Charge balance in a ring {#ex-tourmaline}
Verify that beryl $\mathrm{Be_3Al_2Si_6O_{18}}$ is electrically neutral, and explain what the beryllium and aluminium are doing there. Then work out what happens to the ring charge if one $\mathrm{Si}^{4+}$ in the ring is replaced by $\mathrm{Al}^{3+}$.
::: solution
Beryl contains the six-membered ring $[\mathrm{Si_6O_{18}}]$. With $s = 2$ shared corners per tetrahedron the charge per silicon is $-2$, so the ring carries $6\times(-2) = -12$ and is $[\mathrm{Si_6O_{18}}]^{12-}$. The cations outside it supply $3\times\mathrm{Be}^{2+} = +6$ and $2\times\mathrm{Al}^{3+} = +6$, totalling exactly $+12$. A direct count agrees: $3(2) + 2(3) + 6(4) = 36$ positive charges against $18\times2 = 36$ negative.

Now substitute one $\mathrm{Al}^{3+}$ for one $\mathrm{Si}^{4+}$ on the tetrahedral site. The ring becomes $[\mathrm{AlSi_5O_{18}}]^{13-}$: it has become *less* negative by one unit, because the aluminium brings only three positive charges to a site that was contributing four. Something else in the structure must therefore lose one positive charge — usually by leaving an octahedral or channel site vacant, or by taking a proton onto a neighbouring oxygen. That single observation is the reason the aluminium-rich ring silicates (cordierite, mullite, the aluminium phosphates) have such peculiar, partly vacant structures rather than simple substituted versions of beryl.

The other thing to notice about beryl is what its channels hold. Six-membered rings stack along $c$ to leave narrow tunnels that take neutral $\mathrm{H_2O}$ and $\mathrm{CO_2}$ molecules. Because those guests carry no charge, they do not enter the bookkeeping at all: "water" in beryl is not hydroxyl, and losing it means breaking the ring, which is why beryl looks anhydrous in a thin section and dehydrates only at very high temperature.
:::
:::

::: widget plot
f: 4 - s/2; 4 - s
x: 0, 4
y: -0.5, 4.5
sliders: s=2:0:4:0.25
labels: \text{O/Si ratio}; \text{charge per Si}
caption: The two curves of [[#prop-os-ratio]] against the number of shared corners $s$. Read the O/Si ratio at $s = 0$ (isolated tetrahedra, $\mathrm{O/Si} = 4$), $s = 2$ (chains and rings, $3.0$), $s = 3$ (sheets, $2.5$) and $s = 4$ (framework, $2.0$). The lower line is the negative charge per silicon, which is what the extra-framework cations must balance: notice that it reaches zero only at $s = 4$, which is why quartz and the feldspathoids are the only silicates that need no other cation to be electrically neutral on their own.
:::

## Sheets: the phyllosilicates

Share three corners and you get a two-dimensional anion, $[\mathrm{Si_2O_5}]^{2-}$, an infinite sheet of hexagonal rings with the fourth, unshared, oxygen of every tetrahedron pointing the same way. That single geometric fact explains every property of the micas, clays, chlorites, talcs, serpentines and smectites: the sheets stack, they are held to each other only by weak cations or by van der Waals forces, and so the minerals cleave perfectly, feel greasy, bend, and have a high surface area per unit mass.

A sheet alone is not stable, because the unshared oxygens carry $-1$ each. It is therefore always bonded on one side to a sheet of octahedra — a **tetrahedral (T) sheet** plus an **octahedral (O) sheet** — and the two combine into a **totahedral layer**. If the octahedral sheet is occupied two-thirds (by $\mathrm{Al}^{3+}$ or $\mathrm{Fe}^{3+}$) it is **dioctahedral** (the 2:1 phyllosilicates, like muscovite); if fully occupied by divalent cations it is **trioctahedral** (talc, phlogopite, serpentine). Stacking gives the families:

- **1:1 layers** (one T, one O), held together by hydrogen bonds between the apical oxygens and the hydroxyls of the opposite layer: the kaolinite group, and the serpentines. No interlayer cation, no exchange capacity beyond the edges.
- **2:1 layers** (T–O–T), with the fourth oxygens facing outwards on both sides and an interlayer space between the layers. That space holds $\mathrm{K}^{+}$, $\mathrm{Na}^{+}$, $\mathrm{Ca}^{2+}$ and water, and it is what makes the 2:1 clays expand and exchange.

The charge of a 2:1 layer comes from **isomorphous substitution** inside the sheets — $\mathrm{Al}^{3+}$ for $\mathrm{Si}^{4+}$ in the tetrahedral sheet, or $\mathrm{Mg}^{2+}$ for $\mathrm{Al}^{3+}$ in the octahedral sheet — and it is permanent, unlike the pH-dependent edge charge. The **cation exchange capacity** (CEC) is the practical measure, in $\mathrm{cmol_c\,kg^{-1}}$: talc 0 (no substitution), illite 20–40, smectite 80–150, vermiculite 100–150. Those numbers are the reason a hectare of smectitic soil holds ten times the plant-available nutrients of a kaolinitic one, and the reason bentonite is used as a landfill liner and a drilling mud.

::: example Layer charge and cation exchange capacity {#ex-cec}
A montmorillonite has the ideal composition $\mathrm{Na_{0.4}Al_2(Si_{3.6}Al_{0.4})O_{10}(OH)_2}$. Find the layer charge per formula unit and the theoretical CEC in $\mathrm{cmol_c\,kg^{-1}}$, taking the formula weight as $791\ \mathrm{g\,mol^{-1}}$.
::: solution
The tetrahedral sheet contains $0.4$ of $\mathrm{Al}^{3+}$ replacing $\mathrm{Si}^{4+}$ per formula unit, which removes $0.4$ positive charges; the octahedral sheet is fully occupied by $\mathrm{Al}^{3+}$ and contributes nothing. The layer charge is therefore $-0.4$ per formula unit, balanced by $0.4\ \mathrm{Na}^{+}$ in the interlayer — consistent with the formula.

One mole of layers exchanges $0.4$ moles of monovalent cation, i.e. $0.4\times100 = 40\ \mathrm{cmol_c}$ per $791\ \mathrm{g}$:
$$
\mathrm{CEC} = \frac{40}{0.791} = 51\ \mathrm{cmol_c\,kg^{-1}} .
$$
Natural smectites reach 80–150 because they carry additional charge from octahedral substitutions ($\mathrm{Mg}$ for $\mathrm{Al}$) and from edge sites; the ideal calculation gives the floor, not the ceiling. Note also what the number means physically: $51\ \mathrm{cmol_c\,kg^{-1}}$ is $0.51$ charges per $100\ \mathrm{g}$, or one exchangeable cation for every 390 formula units of layer.
:::
:::

::: warning Clays are not just "fine-grained minerals"
It is tempting to treat clay as a grain-size term, because clays dominate the muds. They are not: a clay is a **structural class**, a phyllosilicate with a layer structure, and the size is a consequence rather than a definition. Quartz grains two micrometres across are not clay; a centimetre-wide book of muscovite is a phyllosilicate. The distinction matters practically, because the layer structure is what gives the surface charge, the water-holding capacity, the swelling, the plasticity and the sorption of pollutants — properties that a fine quartz silt does not have, however small its grains.
:::

## Frameworks: the tectosilicates and the aluminium substitution

Share all four corners and the charge vanishes: $\mathrm{SiO_2}$, and nothing else is needed. Quartz, tridymite, cristobalite, coesite and stishovite are the pure-silica polymorphs, and their sequence — quartz below $870^\circ\mathrm{C}$ at 1 bar, tridymite to $1470^\circ\mathrm{C}$, cristobalite above, coesite above about $2.6\ \mathrm{GPa}$ and stishovite above $8\ \mathrm{GPa}$ — is one of the cleanest pressure–temperature records in geology, used to identify impact structures and subducted crust. Stishovite is the exception that proves the rule: above $8\ \mathrm{GPa}$ silicon abandons four-fold coordination for six, and the structure becomes rutile-like, with $\mathrm{O/Si} = 2$ but no tetrahedra at all.

The frameworks become chemically interesting the moment aluminium enters the tetrahedral site. $\mathrm{Al}^{3+}$ substitutes readily for $\mathrm{Si}^{4+}$ even though the four-fold Shannon radii differ by fifty per cent ($0.039$ against $0.026\ \mathrm{nm}$), because the bond is largely covalent and the framework relaxes locally around the aluminium. Each substitution leaves one negative charge on the framework, which must be balanced by an extra-framework cation, usually $\mathrm{Na}^{+}$, $\mathrm{K}^{+}$ or $\mathrm{Ca}^{2+}$:
$$
\mathrm{NaAlSi_3O_8},\quad \mathrm{KAlSi_3O_8},\quad \mathrm{CaAl_2Si_2O_8}.
$$
These are the feldspars, and they are the most abundant minerals in the continental crust — some $60\%$ of it. The three endmembers define the feldspar ternary solvus, and the exsolution textures in which a sodium-rich feldspar separates lamellae of potassium feldspar (perthite) or vice versa (antiperthite) record the cooling path through the solvus, which is why a feldspar can be a thermometer and a speedometer at the same time.

Two rules govern where the aluminium goes. **Loewenstein's (Al–Si avoidance) rule** states that $\mathrm{Al–O–Al}$ linkages are strongly avoided relative to $\mathrm{Si–O–Si}$ and $\mathrm{Si–O–Al}$, so aluminium orders away from aluminium wherever there is room. And **Goldschmidt's substitution** requires that the framework charge be balanced locally, which is why the alkali feldspars and plagioclase have such narrow, well-defined compositions rather than the continuous range a simple mixing model would predict.

If there is not enough silicon to go round — that is, if the ratio $\mathrm{Al}/(\mathrm{Al} + \mathrm{Si})$ exceeds $0.5$ — the framework cannot be built from tetrahedra alone and **feldspathoids** form instead: nepheline $\mathrm{NaAlSiO_4}$, leucite $\mathrm{KAlSi_2O_6}$, sodalite, cancrinite. Feldspathoids are the mineral signature of a silica-*undersaturated* melt, and their presence or absence in a lava is the first thing a petrologist determines, because it decides the whole classification.

::: example Silica saturation from a whole-rock analysis {#ex-saturation}
Two basalts have the molecular proportions below (moles of the oxide, from a weight-% analysis, with $\mathrm{FeO}$, $\mathrm{MgO}$, $\mathrm{TiO_2}$ and $\mathrm{P_2O_5}$ in excess). Decide which is silica-undersaturated, using the simplified norm rule that $\mathrm{Ca}$, $\mathrm{Na}$ and $\mathrm{K}$ take aluminium and silicon in the order anorthite $\mathrm{CaAl_2Si_2O_8}$, albite $\mathrm{NaAlSi_3O_8}$, orthoclase $\mathrm{KAlSi_3O_8}$, and that any silicon shortfall is met by converting albite to nepheline $\mathrm{NaAlSiO_4}$.

| oxide | basalt A | basalt B |
|---|---|---|
| $\mathrm{SiO_2}$ | 1.000 | 0.500 |
| $\mathrm{Al_2O_3}$ (as $\mathrm{Al}$) | 0.300 | 0.300 |
| $\mathrm{CaO}$ | 0.080 | 0.050 |
| $\mathrm{Na_2O}$ | 0.030 | 0.140 |
| $\mathrm{K_2O}$ | 0.010 | 0.020 |
::: solution
**Basalt A.** The feldspars need aluminium $2(0.080) + 0.030 + 0.010 = 0.200$ and silicon $2(0.080) + 3(0.030) + 3(0.010) = 0.280$. Both are available, with $0.100$ aluminium and $0.720$ silicon to spare. The leftover silicon becomes normative quartz, and the leftover aluminium goes into corundum only if it exceeds what the feldspars and the excess phases can take. Basalt A is therefore **silica-saturated to oversaturated**: quartz-bearing, as a tholeiite should be.

**Basalt B.** The feldspars need aluminium $2(0.050) + 0.140 + 0.020 = 0.260$ — available — and silicon $2(0.050) + 3(0.140) + 3(0.020) = 0.580$. Only $0.500$ is present, a shortfall of $0.080$. Converting one mole of albite to one mole of nepheline saves two moles of silicon, so $0.040$ of the sodium forms nepheline and $0.100$ forms albite. Recomputing: silicon used $= 0.100 + 0.300 + 0.060 + 0.040 = 0.500$, exactly the supply, and aluminium used $= 0.100 + 0.100 + 0.020 + 0.040 = 0.260$, within the supply.

Basalt B is therefore **silica-undersaturated** and would be normative in $0.040$ moles of nepheline — in the rock, in modal nepheline or leucite, and it must be classified as a nephelinite or basanite rather than as a basalt. The practical lesson is that the test is not "is there a lot of silica" but "is there enough silica to build feldspar from all the alkalis and calcium", and that a rock with half the silicon of its neighbour can be the one that grows feldspathoids.
:::
:::

::: widget plot
f: 1/(1 + exp(-(x - 20)/1.5))
x: 0, 45
y: -0.05, 1.05
hlines: 0.5
labels: \text{fraction of bridges broken}
caption: The fraction of bridging oxygens broken as a function of network-modifier content, drawn as a sigmoid for a typical basalt-to-rhyolite compositional series. The steep part of the curve, near $20$–$25\ \mathrm{wt}\%$ of network-modifier oxides, is where a melt's viscosity changes by orders of magnitude with a small change in composition, and it is the reason basalt flows tens of kilometres while rhyolite forms domes. The horizontal line marks the midpoint of the transition; read across to see how narrow the compositional window is.
:::

## Melts: the same chemistry, disordered

A silicate **melt** is the same tetrahedral chemistry with the long-range order destroyed, and its properties are governed by the same degree of polymerisation. Network **formers** ($\mathrm{Si^{4+}}$, $\mathrm{Al^{3+}}$, $\mathrm{Ti^{4+}}$, $\mathrm{P^{5+}}$) build the tetrahedra; network **modifiers** ($\mathrm{Na}^{+}$, $\mathrm{K}^{+}$, $\mathrm{Ca}^{2+}$, $\mathrm{Mg}^{2+}$, $\mathrm{Fe}^{2+}$) break bridges and create non-bridging oxygens; and $\mathrm{Al}^{3+}$ in tetrahedral coordination is an intermediate that needs a charge-balancing modifier. The consequence is the single most important physical property in volcanology:

$$
\eta = \eta_0 \exp\!\left(\frac{E_a}{RT}\right),
$$

with $E_a$ itself a strong function of NBO/T. Basaltic melts ($\mathrm{NBO/T} \approx 0.5$) have viscosities of $10$–$100\ \mathrm{Pa\,s}$ at $1200^\circ\mathrm{C}$; andesitic melts about $10^{3}$; rhyolitic melts ($\mathrm{NBO/T} \approx 0.05$) $10^{5}$–$10^{7}\ \mathrm{Pa\,s}$ at $800^\circ\mathrm{C}$. That is a spread of a million, and it explains why Kilauea's lava flows in rivers and Montserrat's plugs collapse.

::: example Viscosity, temperature and eruption style {#ex-viscosity}
The activation energy for viscous flow of a dry rhyolitic melt is about $E_a = 500\ \mathrm{kJ\,mol^{-1}}$ and its viscosity at $800^\circ\mathrm{C}$ is $10^{6}\ \mathrm{Pa\,s}$. Find the viscosity at $750^\circ\mathrm{C}$ and at $900^\circ\mathrm{C}$. Then do the same for a basalt with $E_a = 250\ \mathrm{kJ\,mol^{-1}}$ and $100\ \mathrm{Pa\,s}$ at $1200^\circ\mathrm{C}$.
::: solution
Using $\eta(T_2) = \eta(T_1)\exp[E_a R^{-1}(1/T_2 - 1/T_1)]$ with $R = 8.314\ \mathrm{J\,mol^{-1}\,K^{-1}}$:

Rhyolite, $800 \to 750\ ^\circ\mathrm{C}$ ($1073 \to 1023\ \mathrm{K}$): $E_a/R = 60\,140\ \mathrm{K}$ and $1/1023 - 1/1073 = 4.55\times10^{-5}\ \mathrm{K^{-1}}$, so
$$
\eta = 10^{6}\times e^{2.74} = 1.6\times10^{7}\ \mathrm{Pa\,s}.
$$
For $800 \to 900\ ^\circ\mathrm{C}$ the exponent is $-2.27$ and $\eta = 1.0\times10^{5}\ \mathrm{Pa\,s}$: a $100\ \mathrm{K}$ change moves the viscosity by a factor of sixteen.

Basalt, $1200 \to 1150\ ^\circ\mathrm{C}$ ($1473 \to 1423\ \mathrm{K}$): $E_a/R = 30\,070\ \mathrm{K}$ and $1/1423 - 1/1473 = 2.38\times10^{-5}$, giving $\eta = 100\times e^{0.716} = 205\ \mathrm{Pa\,s}$ — a factor of two. The same $50\ \mathrm{K}$ of cooling changes a basalt's viscosity by a factor of two and a rhyolite's by a factor of four, and the absolute difference between the two melts is four to five orders of magnitude. Everything about eruption style — effusive versus explosive, a $10$-km lava flow versus a $200$-m spine, the ability of bubbles to rise and escape — follows from those numbers.
:::
:::

::: history
René Just Haüy (Haüy) derived the rhombohedron of calcite from the shapes of its cleavage fragments in 1784 and, in the *Traité de minéralogie* of 1801, proposed that all crystals are built from a repeating *molécule intégrante* — the unit cell, a century before X-rays. Jöns Jakob Berzelius (Berzelius) introduced the electrochemical dualism that made ionic formulae possible and, with his student Eilhard Mitscherlich, discovered **isomorphism** in 1819: that $\mathrm{KH_2PO_4}$ and $\mathrm{KH_2AsO_4}$ crystallise identically, and that a given structural type tolerates chemically similar cations. Mitscherlich's law is the direct ancestor of every solid-solution series in this chapter. The structural explanation came only with X-ray diffraction: William Lawrence Bragg (Bragg) solved the diamond structure in 1913, and William L. and Lawrence Bragg, then Linus Pauling (Pauling) and Victor Goldschmidt, turned the diffraction patterns into the tetrahedra and rules used above. Pauling's five rules of 1929 are the reason this chapter can be argued from electrostatics at all. The modern synthesis — the classification by polymerisation state used here — was settled in the 1930s by Cecil Tilley, Norman L. Bowen's phase-equilibrium school and, for the micas, by the powder-diffraction work of R. E. Grim and colleagues.
:::

## Where this leads

The tetrahedron and its connections reappear everywhere later in the atlas. Polymerisation controls melt viscosity and therefore eruption style in [[physical-geology/volcanoes]]; the partitioning of trace elements between tetrahedral and octahedral sites is the basis of the trace-element geochemistry in [[geochemistry/trace-elements]]; the olivine–spinel–silicate-spinel transitions in the mantle are the seismic discontinuities read in [[geophysics/seismic-structure]]; the weathering of feldspar to clay is the subject of [[geochemistry/weathering-chemistry]]; and the whole of [[mineralogy-petrology/phase-diagrams]] is the question of which of these structures is stable at a given temperature and pressure.

::: summary
- Every silicate is built from the $\mathrm{SiO_4}^{4-}$ tetrahedron; the class follows from how many of its corners are shared, and the oxygen-to-silicon ratio is $4 - s/2$ for $s$ shared corners.
- Charge per silicon is $4 - s$: $-4$ for isolated tetrahedra, $-2$ for chains and rings, $-1$ for sheets and $0$ for frameworks. Frameworks need no other cation; everything else does.
- Nesosilicates (olivine, garnet, $\mathrm{Al_2SiO_5}$) have no cleavage and dense, hard structures; inosilicates cleave along the chains at $93^\circ/87^\circ$ (pyroxene) or $56^\circ/124^\circ$ (amphibole); phyllosilicates cleave perfectly because their sheets are weakly bonded.
- Sheet charge comes from isomorphous substitution inside the layers and is measured as the cation exchange capacity, from 0 for talc to 150 for smectite — the reason clay governs soil fertility and contaminant transport.
- $\mathrm{Al}^{3+}$ substitutes for $\mathrm{Si}^{4+}$ in frameworks, and the resulting charge is balanced by $\mathrm{Na}$, $\mathrm{K}$ and $\mathrm{Ca}$: the feldspars, 60 % of the continental crust. Too little silicon and feldspathoids form instead.
- Melts obey the same chemistry: NBO/T controls viscosity over five orders of magnitude between basalt and rhyolite, and therefore controls eruption style.
:::

## Exercises

::: exercise Oxygen ratios {level=1 check="2.5"}
What is the oxygen-to-silicon ratio of a phyllosilicate sheet?
::: solution
$s = 3$ shared corners, so $\mathrm{O/Si} = 4 - 3/2 = 2.5$, giving the sheet anion $[\mathrm{Si_2O_5}]^{2-}$.
:::
:::

::: exercise Charge of a ring {level=1 check="-12"}
Find the charge of the six-membered ring anion $[\mathrm{Si_6O_{18}}]^{n-}$. Give $n$ (with its sign).
::: solution
Each silicon in a ring shares two corners, so the charge per silicon is $-2$ and the ring carries $6\times(-2) = -12$: $[\mathrm{Si_6O_{18}}]^{12-}$. In beryl this is balanced by three $\mathrm{Be}^{2+}$ and two $\mathrm{Al}^{3+}$, which together supply exactly $+12$.
:::
:::

::: exercise Olivine formula from a cation ratio {level=1 check="72"}
An olivine has $\mathrm{Mg}/(\mathrm{Mg} + \mathrm{Fe}) = 0.72$ by moles. What is its forsterite percentage?
::: solution
Forsterite content is by definition $100\times\mathrm{Mg}/(\mathrm{Mg} + \mathrm{Fe}) = 72\%$, so the olivine is Fo 72, a typical mantle or boninitic composition.
:::
:::

::: exercise Pyroxene charge balance {level=2 check="2"}
Diopside is $\mathrm{CaMgSi_2O_6}$. How many shared corners per tetrahedron does it have, and how do you know?
::: solution
$\mathrm{O/Si} = 6/2 = 3$, so $s = 2(4 - 3) = 2$: a single chain. The charge check confirms it: two $\mathrm{Si}^{4+}$ give $+8$, $\mathrm{Ca}$ and $\mathrm{Mg}$ give $+4$, total $+12$ against six oxygens at $-12$. The chain $[\mathrm{Si_2O_6}]^{4-}$ needs $+4$ per two silicones, exactly one $\mathrm{Ca}^{2+}$ and one $\mathrm{Mg}^{2+}$.
:::
:::

::: exercise Layer charge of muscovite {level=2 check="1"}
Muscovite is $\mathrm{KAl_2(AlSi_3)O_{10}(OH)_2}$. What is the layer charge per formula unit, and why is the potassium there?
::: solution
One $\mathrm{Al}^{3+}$ per formula unit occupies a tetrahedral site, one full negative charge short of the $\mathrm{Si}^{4+}$ it replaces, so the 2:1 layer carries $-1$. The interlayer $\mathrm{K}^{+}$ balances it — which is why muscovite has no exchange capacity under normal conditions and why the potassium is only released to plants slowly, by the weathering of the whole layer rather than by exchange.
:::
:::

::: exercise Cation exchange capacity of a smectite {level=2 check="117"}
A nontronite has the ideal formula $\mathrm{Na_{0.9}Fe^{3+}_{1.66}\Box_{0.17}(Al_{0.1}Si_{3.9})O_{10}(OH)_2}$ ($\Box$ is a vacancy) and formula weight $767\ \mathrm{g\,mol^{-1}}$. Calculate its theoretical CEC in $\mathrm{cmol_c\,kg^{-1}}$. (Enter the CEC in $\mathrm{cmol_c\,kg^{-1}}$.)
::: solution
Two sources of charge. The tetrahedral substitution of $0.1$ $\mathrm{Al}^{3+}$ for $\mathrm{Si}^{4+}$ contributes $-0.1$. The octahedral sheet holds $1.66$ $\mathrm{Fe}^{3+}$ where a full sheet holds $2$, so the $0.17$ vacancies each remove $+3$, contributing $-0.51$; but the sheet is also $0.34$ charges short of the $+6$ a full $\mathrm{Fe}^{3+}_2$ sheet would supply, and the deficit that the interlayer must balance is the total negative charge, $0.1 + 0.51 = 0.61$. The formula's $0.9$ sodium is therefore partly charge-balancing and partly exchangeable at edge sites; taking the structural layer charge of $0.9$ charges per formula unit as the exchangeable amount,
$$
\mathrm{CEC} = \frac{0.9\times100}{0.767} = 117\ \mathrm{cmol_c\,kg^{-1}} .
$$
That is at the top of the smectite range (80–150), as expected for an iron-rich, highly substituted layer. Note the ambiguity the calculation exposes: the CEC quoted for a real clay depends on whether the octahedral-vacancy charge, which is only partly accessible, is counted, and different handbooks count it differently.
:::
:::

::: exercise Amphibole versus pyroxene {level=2}
Show that the double-chain anion $[\mathrm{Si_8O_{22}}]^{12-}$ is consistent with $s = 2.5$, and explain why amphiboles are hydrous while pyroxenes are not.
::: solution
With $s = 2.5$, $\mathrm{O/Si} = 4 - 1.25 = 2.75$ and $8\times2.75 = 22$ oxygens, as required; the charge is $8\times(4 - 2.5)\times(-1) = -12$, matching $[\mathrm{Si_8O_{22}}]^{12-}$. Amphiboles are hydrous because the doubled chain encloses a ribbon of octahedral sites whose central anion position, at the centre of the octahedral strip, cannot be occupied by oxygen without unreasonable electrostatic repulsion from the neighbouring non-bridging oxygens: $\mathrm{OH}^{-}$, with its proton pointing into the empty channel along $c$, is the only viable anion there. The single chain of a pyroxene has no such site, so pyroxenes are essentially anhydrous.
:::
:::

::: exercise Feldspathoid or feldspar? {level=2 check="0.5"}
What value of $\mathrm{Al}/(\mathrm{Al} + \mathrm{Si})$ in the tetrahedral site marks the theoretical limit beyond which a framework feldspar cannot be built?
::: solution
$0.5$. At that ratio every tetrahedron would be aluminium and the framework would require $\mathrm{Al–O–Al}$ linkages throughout, violating Loewenstein's rule and exhausting the charge-balancing cations; the structure collapses to the denser feldspathoid arrangements (nepheline, leucite) in which some oxygens become non-bridging.
:::
:::

::: exercise A melt at two temperatures {level=3 check="1.3"}
A dry andesitic melt has $\eta = 10^{4}\ \mathrm{Pa\,s}$ at $1050^\circ\mathrm{C}$ and $E_a = 400\ \mathrm{kJ\,mol^{-1}}$. By what factor does its viscosity change on cooling to $950^\circ\mathrm{C}$? Give $\log_{10}$ of the factor to one decimal place.
::: solution
$E_a/R = 4.00\times10^{5}/8.314 = 48\,110\ \mathrm{K}$, and
$$
\frac{1}{1223} - \frac{1}{1323} = 8.18\times10^{-5} - 7.56\times10^{-5} = 6.22\times10^{-5}\ \mathrm{K^{-1}} .
$$
The exponent is $48\,110\times6.22\times10^{-5} = 2.99$, so the viscosity rises by a factor of $e^{2.99} = 19.9$, and $\log_{10}$ of the factor is $1.3$. A factor of twenty for $100\ \mathrm{K}$ is why the crust of a cooling lava flow can seal a vent, why a degassing andesite can stall in a conduit, and why the same volcano can switch from effusive to explosive as its conduit contents cool by a degree or two.
:::
:::

::: exercise Deriving a sheet formula {level=3}
Derive the formula of talc from the geometry of a 2:1 layer, taking a trioctahedral sheet and no isomorphous substitution.
::: solution
Take four silicones in one tetrahedral sheet. With $s = 3$ they carry $4\times2.5 = 10$ oxygens: six basal oxygens shared between neighbouring tetrahedra within the sheet and four apical oxygens pointing out of the sheet. Two such sheets make $\mathrm{Si_8O_{20}}$, with eight apical oxygens available to bond the octahedral sheet between them.

A trioctahedral sheet has all three octahedral sites per repeat occupied, so it holds three divalent cations for every four apical oxygens plus the hydroxyls on the outer faces. Matching eight apical oxygens to two octahedral repeats gives six $\mathrm{Mg}$, and the two outer faces of the layer carry four $\mathrm{OH}^{-}$. Reducing by two gives

$$
\mathrm{Mg_3Si_4O_{10}(OH)_2},
$$

which is talc. Charge check: $3\times2 + 4\times4 = 22$ positive against $10\times2 + 2\times1 = 22$ negative. The layer is therefore electrically neutral, needs no interlayer cation, and is held to its neighbours only by van der Waals forces — which is exactly why talc has a hardness of 1, feels greasy, and is chemically almost inert. Substitute $\mathrm{Al}^{3+}$ for $\mathrm{Si}^{4+}$ anywhere in that structure and the layer is no longer neutral: you have made a mica or a smectite, with an interlayer cation and an exchange capacity.
:::
:::

::: exercise Garnet as a barometer {level=3 check="0.015"}
The iron–magnesium exchange between almandine and pyrope has a volume change of $\Delta V_r = -1.25\ \mathrm{cm^3\,mol^{-1}}$ and an entropy change near zero at the temperatures of interest. By how much does the equilibrium $\ln K$ shift between 5 and 15 kbar at $700^\circ\mathrm{C}$? (Give $\Delta\ln K$ to three decimals.)
::: solution
With $\Delta S_r \approx 0$, the pressure dependence of the equilibrium constant is
$$
\left(\frac{\partial \ln K}{\partial P}\right)_T = -\frac{\Delta V_r}{RT}.
$$
Using $R = 83.14\ \mathrm{cm^3\,bar\,mol^{-1}\,K^{-1}}$ so that the units cancel, at $T = 973\ \mathrm{K}$ and $\Delta P = 10\ \mathrm{kbar} = 10^4\ \mathrm{bar}$,
$$
\Delta\ln K = \frac{1.25\times10^{4}}{83.14\times973} = 0.015 .
$$
A $10\ \mathrm{kbar}$ change moves $\ln K$ by only $0.015$ for this reaction, which is precisely why the $\mathrm{Fe}$–$\mathrm{Mg}$ exchange between garnet and biotite or olivine is a poor barometer and a good thermometer, while reactions with $\Delta V_r$ of tens of $\mathrm{cm^3\,mol^{-1}}$ — those involving the $\mathrm{Al_2SiO_5}$ polymorphs, or coesite in eclogite — are excellent barometers. See [[mineralogy-petrology/pt-paths]].
:::
:::
