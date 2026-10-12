A basalt and a granite are both made by melting, and neither is made by melting the other. That single fact, established in a series of furnace experiments between 1914 and 1928 by Norman L. Bowen, is the foundation of igneous petrology: rocks melt *partially*, the first drops of liquid have a different composition from the rock they came from, and the residue left behind controls what melts next. Everything about the diversity of igneous rocks — why the ocean floor is basalt and the continents are andesite and granite, why a single magma chamber can produce a layered intrusion — follows from the geometry of a few phase diagrams.

A phase diagram is not a picture of a rock. It is a map of the equilibrium states of a chemical system, and its value is that it tells you, for a given composition and temperature, how many phases can exist, what they are, and what they contain. Rocks are not in equilibrium, and the diagrams are read with that in mind: they tell you what the rock would do if it had time, and the departures from that are the texture.

## Phases, components and the phase rule

::: definition Phase, component and system {#def-phase}
A **phase** is a physically distinct, homogeneous part of a system with a definite composition and structure: olivine crystals, a silicate melt, a vapour bubble, each is a phase. A **component** is a chemically independent constituent needed to define the composition of every phase; a **system** is the set of components chosen. The **forsterite–fayalite** system $\mathrm{Mg_2SiO_4}\!-\!\mathrm{Fe_2SiO_4}$ has two components; the **diopside–anorthite** system $\mathrm{CaMgSi_2O_6}\!-\!\mathrm{CaAl_2Si_2O_8}$ has two; a natural basalt, treated as $\mathrm{SiO_2}$, $\mathrm{TiO_2}$, $\mathrm{Al_2O_3}$, $\mathrm{Cr_2O_3}$, $\mathrm{FeO}$, $\mathrm{MnO}$, $\mathrm{MgO}$, $\mathrm{CaO}$, $\mathrm{Na_2O}$, $\mathrm{K_2O}$, $\mathrm{P_2O_5}$, $\mathrm{H_2O}$, has twelve, and is beyond any drawing.
:::

::: theorem Gibbs's phase rule {#thm-phase-rule}
For a system of $C$ components in which $P$ phases coexist in equilibrium, the number of **degrees of freedom** — independent variables (temperature, pressure and composition) that may be varied without changing the number of phases — is
$$
F = C - P + 2 .
$$
For a **condensed system**, in which no vapour phase occurs and pressure is fixed (usually at 1 bar), this becomes $F = C - P + 1$.
:::

::: proof
Specify a system by naming its phases and, within each, the amount of every component except one, since the mole fractions sum to one: that is $P(C - 1)$ composition variables, plus $T$ and $P$, giving $P(C-1) + 2$ variables in total. Equilibrium requires the chemical potential of each component to be equal in every phase, $\mu_i^{(1)} = \mu_i^{(2)} = \cdots = \mu_i^{(P)}$, which is $(P-1)$ independent equations for each of the $C$ components, or $C(P-1)$ equations in all. The number of variables that can still be chosen freely is therefore
$$
F = P(C-1) + 2 - C(P-1) = C - P + 2 .
$$
Fixing pressure removes one variable and one equation is unaffected, giving the condensed form. The rule is not an approximation: it is a count, and its power in petrology is that it says when an assemblage is *invariant* — when a rock's mineral assemblage pins its pressure and temperature, which is the basis of [[mineralogy-petrology/pt-paths]].
:::

::: example Counting degrees of freedom {#ex-phase-rule}
How many degrees of freedom does (a) dry forsterite at 1 bar, (b) forsterite in equilibrium with its melt at 1 bar, (c) a rock of fixed bulk composition containing olivine, orthopyroxene, clinopyroxene, spinel and melt, (d) a peridotite containing olivine, orthopyroxene, clinopyroxene, spinel and a vapour?
::: solution
(a) One component ($\mathrm{Mg_2SiO_4}$), one phase, pressure fixed: $F = 1 - 1 + 1 = 1$. Temperature can be anything up to the melting point.
(b) One component, two phases, pressure fixed: $F = 1 - 2 + 1 = 0$. The melting point is a single temperature — $1890^\circ\mathrm{C}$ at 1 bar — and this is what "the" melting point means.
(c) Take a simplified four-component system ($\mathrm{Mg_2SiO_4}$, $\mathrm{Fe_2SiO_4}$, $\mathrm{MgSiO_3}$, $\mathrm{CaMgSi_2O_6}$) with five phases: $F = 4 - 5 + 1 = 0$. Five phases in a four-component system at fixed pressure can exist at only one temperature and one set of phase compositions — which is why a five-phase assemblage is a good thermometer and barometer, and why five-phase rocks are rare.
(d) With a vapour present the pressure is no longer free if the vapour is a pure $\mathrm{H_2O}$ phase: adding the vapour adds a phase, so $F$ drops by one. This is why the appearance of a fluid phase in a metamorphic rock so often marks an isograd, and why "vapour-absent" and "vapour-present" experiments give different reaction curves.
:::
:::

## The binary eutectic

::: definition Eutectic, liquidus and solidus {#def-eutectic}
In a two-component system the **liquidus** is the surface (a line in a binary diagram) above which the system is entirely liquid, and the **solidus** that below which it is entirely solid. A **simple eutectic** system is one in which the two phases that crystallise are the pure endmembers, so that the liquidus curves meet at a single **eutectic point** of temperature $T_E$ and composition $X_E$, below which nothing melts. Between liquidus and solidus the system is a **mush**: liquid plus one or two crystalline phases.
:::

::: proposition The lever rule {#prop-lever}
In a two-phase region of a binary diagram, if a system of bulk composition $X_0$ contains phases of composition $X_\alpha$ and $X_\beta$, the **weight fractions** of the two phases are
$$
w_\alpha = \frac{X_\beta - X_0}{X_\beta - X_\alpha}, \qquad w_\beta = \frac{X_0 - X_\alpha}{X_\beta - X_\alpha},
$$
so that the two phases are present in amounts inversely proportional to the lengths of the two arms of the tie line about the bulk composition.
:::

::: proof
Mass balance for the component being plotted: one unit of system contains $w_\alpha + w_\beta = 1$ of the two phases and $X_0 = w_\alpha X_\alpha + w_\beta X_\beta$ of the component. Substituting $w_\beta = 1 - w_\alpha$ gives $X_0 = X_\beta - w_\alpha(X_\beta - X_\alpha)$, which rearranges to the first expression; the second follows by symmetry. The rule is only mass balance, which is why it applies unchanged to ternary diagrams (where the tie line becomes a tie line within a triangle) and to any two-phase mixture, whether or not the phases are in equilibrium.
:::

::: example Crystallising a diopside–anorthite melt {#ex-di-an}
In the system $\mathrm{CaMgSi_2O_6}\!-\!\mathrm{CaAl_2Si_2O_8}$ at 1 bar, anorthite melts at $1553^\circ\mathrm{C}$, diopside at $1391^\circ\mathrm{C}$, and the eutectic lies at $58\ \mathrm{wt}\%$ diopside and $1274^\circ\mathrm{C}$. Take a melt of composition $\mathrm{Di}_{40}\mathrm{An}_{60}$ and describe what happens on cooling. Then find the proportions of liquid and plagioclase at $1350^\circ\mathrm{C}$, where the liquid has reached $\mathrm{Di}_{55}\mathrm{An}_{45}$ and the crystallising plagioclase is $\mathrm{An}_{95}$.
::: solution
The bulk composition lies on the anorthite side of the eutectic, so the first phase to appear is **plagioclase**, at about $1440^\circ\mathrm{C}$ on the liquidus. As plagioclase (calcium-rich, near $\mathrm{An}_{95}$) separates, the liquid is depleted in $\mathrm{CaAl_2Si_2O_8}$ and moves *down the liquidus towards the eutectic*, becoming progressively richer in the diopside component. At $1274^\circ\mathrm{C}$ the liquid reaches the eutectic composition, $\mathrm{Di}_{58}\mathrm{An}_{42}$, and thereafter **both** plagioclase and diopside crystallise together at constant temperature until the liquid is gone. The rock is a hypidiomorphic aggregate of plagioclase phenocrysts in a fine intergrowth of plagioclase and diopside — a gabbro, and specifically the texture Bowen called *eutectic*.

At $1350^\circ\mathrm{C}$ the tie line runs, in diopside content, from the crystallising plagioclase at $X_\text{xtal} = 5$ (the plagioclase is $\mathrm{An}_{95}$, so it carries only $5\%$ of the diopside component) to the liquid at $X_\text{liq} = 55$, with the bulk at $X_0 = 40$:
$$
w_\text{plag} = \frac{X_\text{liq} - X_0}{X_\text{liq} - X_\text{xtal}} = \frac{55 - 40}{55 - 5} = 0.30, \qquad
w_\text{liq} = \frac{X_0 - X_\text{xtal}}{X_\text{liq} - X_\text{xtal}} = \frac{40 - 5}{50} = 0.70 .
$$
Thirty per cent plagioclase, seventy per cent liquid. Two checks worth making every time. The component balance closes: $0.30\times5 + 0.70\times55 = 1.5 + 38.5 = 40$, the bulk composition. And the geometry says the same thing: the bulk at 40 lies nearer the liquid at 55 than the crystal at 5 does, and the phase whose composition is *nearer* the bulk is the *more* abundant one. Draw the tie line to scale once and the algebra stops being a source of error.

Notice also what the numbers say about the rock: at $1350^\circ\mathrm{C}$ it is still seventy per cent liquid, and the plagioclase that has formed so far is only thirty per cent of it. Most of the crystallisation happens in the last few tens of degrees, which is why igneous rocks are dominated by the phases that crystallised last and lowest.
:::
:::

::: widget plot
f: (55-x)/(55-5); (x-5)/(55-5)
x: 5, 55
y: -0.05, 1.05
hlines: 0.5
vlines: 40
labels: \text{fraction plagioclase}; \text{fraction liquid}
caption: The two arms of the lever rule for the diopside–anorthite example, plotted against the bulk diopside content of the system at a fixed temperature. The vertical line marks the bulk composition $\mathrm{Di}_{40}$ of [[#ex-di-an]], where the curves give $0.30$ plagioclase and $0.70$ liquid. Note the crossing at $X_0 = 30$, where the two phases are equally abundant, and that outside the interval $5$–$55$ the fractions are negative — which is not an error but a statement that the chosen bulk composition cannot lie in this two-phase field at all. That is the most common mistake made with a lever rule, and the plot shows it immediately.
:::

## Solid solution, coring and reaction

Few real systems are simple eutectics. When the two endmembers form a **continuous solid solution** the diagram changes qualitatively: there is no eutectic point, and between liquidus and solidus the liquid and the crystalline solution coexist with *different* compositions.

::: definition Partition coefficient and the crystallisation path {#def-partition}
For a component $i$ distributed between a crystalline solution and a liquid, the **Nernst distribution coefficient** is
$$
K_D^{i} = \frac{X_i^\text{solid}/X_j^\text{solid}}{X_i^\text{liquid}/X_j^\text{liquid}} .
$$
If $K_D < 1$ the component is **incompatible** and concentrates in the liquid; if $K_D > 1$ it is **compatible** and enters the crystal. For a binary solid-solution system the liquidus and solidus are related by $K_D$ at every temperature, and the first crystal to form is always more richly endowed in the compatible component than the bulk.
:::

Two consequences dominate igneous textures. **Coring (normal zoning):** if crystals are not re-homogenised by diffusion, the first-formed core is more calcic (or more magnesian) than the rim, and the rock preserves a frozen record of the crystallisation path. **Bowen's reaction series:** in a discontinuous series, a phase stable over a limited range reacts with the liquid to form the next phase — olivine to orthopyroxene to clinopyroxene to amphibole to biotite — and the rock is left with reaction rims, embayed crystals and a mineral assemblage that is not the equilibrium one.

::: example Zoning in a plagioclase crystal {#ex-zoning}
A plagioclase crystal in a basalt has an $\mathrm{An}_{88}$ core and an $\mathrm{An}_{55}$ rim in a matrix of $\mathrm{An}_{40}$ glass. What does that say about the crystallisation history, and what would you expect to find if the rock had been held just below the solidus for a million years?
::: solution
The crystal grew as it was cooled: the core, which formed first, is in equilibrium with a liquid from which calcium and aluminium had not yet been removed, and the rim with a liquid progressively depleted in them. The glass at $\mathrm{An}_{40}$ is the residual liquid, more sodic than any part of the crystal, exactly as the solidus curve requires. The sequence core-to-rim-to-glass is a monotonic path down the solidus, and its slope is a crude thermometer.

If the rock had instead been held hot, volume diffusion in the feldspar would have flattened the profile. At $900^\circ\mathrm{C}$ the diffusion coefficient of calcium in plagioclase is of order $10^{-21}\ \mathrm{m^2\,s^{-1}}$, and the diffusion length over $10^6$ years ($3\times10^{13}\ \mathrm{s}$) is
$$
L = \sqrt{Dt} = \sqrt{10^{-21}\times3\times10^{13}} = 5.5\times10^{-4}\ \mathrm{m} = 0.55\ \mathrm{mm}.
$$
A crystal $1\ \mathrm{mm}$ across would be substantially homogenised and the zoning largely erased; a crystal $5\ \mathrm{mm}$ across would keep its core composition and lose only its rim. Zoning is therefore a **thermochronometer**, and the width of the profile, fitted to the diffusion equation, gives the time since the last heating event — the method of [[mineralogy-petrology/pt-paths]].
:::
:::

::: quiz
A melt of composition $\mathrm{Di}_{70}\mathrm{An}_{30}$ in the diopside–anorthite eutectic system is cooled slowly. Which pair describes the rock it forms?
- [ ] Plagioclase phenocrysts in a eutectic intergrowth, because it is on the anorthite side of the eutectic.
- [x] Diopside phenocrysts in a eutectic intergrowth, because it is on the diopside side of the eutectic.
- [ ] A fine eutectic intergrowth only, because every composition crystallises at the eutectic temperature.
- [ ] A layered rock, because the two phases separate by gravity.
::: solution
The eutectic is at $\mathrm{Di}_{58}$, so a composition of $\mathrm{Di}_{70}$ lies on the **diopside** side: diopside crystallises alone while the liquid moves down the liquidus towards $\mathrm{Di}_{58}$, and the remaining liquid then solidifies as a eutectic intergrowth of both phases. Only the exact eutectic composition gives an intergrowth with no phenocrysts, and layering requires a magma body and time, not merely a composition.
:::
:::

::: warning A eutectic is not a minimum, and a minimum is not a melting point
Three points get confused constantly. A **eutectic** is a composition at which two (or more) phases crystallise together from the liquid at the lowest melting temperature in the system; the liquid disappears at that temperature. A **solid-solution minimum** is a composition at which the liquidus passes through a minimum but only one phase crystallises, so the liquid never has to have that composition and the rock need not be a fine intergrowth. And a **peritectic** is a *reaction* point: a solid plus liquid combine to make a different solid, so the first phase to appear is consumed rather than accumulating. In the system $\mathrm{Mg_2SiO_4}\!-\!\mathrm{SiO_2}$ there is no eutectic between forsterite and silica at all — enstatite forms peritectically at $1557^\circ\mathrm{C}$, which is why a silica-saturated mantle melt never leaves olivine and quartz coexisting, and why the reaction $\mathrm{Forsterite} + \mathrm{Silica} \to \mathrm{Enstatite}$ is one of the most important reactions in the Earth.
:::

## Melting a rock: solidus, liquidus and the three ways to do it

A rock is a multi-component mixture, so it does not melt at a temperature but over a **range**, from the **solidus** (first drop of liquid) to the **liquidus** (last crystal gone). The first liquid is always the most silica-rich, most hydrous and most enriched in incompatible elements that the system can produce, because it forms at the lowest-melting eutectic available in the local assemblage.

::: example Which melts first? {#ex-first-melt}
A wet granodiorite with quartz, plagioclase, K-feldspar, biotite and hornblende is heated slowly at 5 kbar with an abundant fluid present. Which assemblage melts first, and roughly when?
::: solution
Melting begins at the lowest-temperature reaction involving the phases present, and in a hydrous granitic system that is normally a **flux-melting reaction of a hydrous mineral**: biotite and hornblende break down before the feldspars and quartz react. The first drops are granitic in composition — the "minimum melt" of the $\mathrm{Na_2O}\!-\!\mathrm{K_2O}\!-\!\mathrm{CaO}\!-\!\mathrm{Al_2O_3}\!-\!\mathrm{SiO_2}\!-\!\mathrm{H_2O}$ system — and at 5 kbar with water-saturated conditions the solidus lies near $700\ ^\circ\mathrm{C}$, falling to about $660\ ^\circ\mathrm{C}$ at 10 kbar and rising again at higher pressure as water-rich fluids become less stable.

Two consequences that matter in the field. First, the melt is close to the **granite minimum**, which is why so many granites have near-minimum compositions and why "granite minimum" thermobarometry works at all. Second, the melt fraction is small unless the temperature rises well above the solidus: at $750\ ^\circ\mathrm{C}$ a granodiorite may hold only a few per cent liquid, which is enough to make it partially molten and mechanically weak but not enough to segregate a magma. Extractable magma needs roughly 20–25 % melt, the fraction at which crystals stop touching and the mush becomes mobile.
:::
:::

There are only three ways to melt rock, and each leaves a distinguishable signature.

**Decompression melting.** The solidus of peridotite rises with pressure at about $10$–$13\ ^\circ\mathrm{C\,GPa^{-1}}$ for olivine and $5\ ^\circ\mathrm{C\,GPa^{-1}}$ for garnet-bearing assemblages, while a rising parcel of mantle cools adiabatically at only about $0.3\ ^\circ\mathrm{C\,km^{-1}}$ ($10\ ^\circ\mathrm{C\,GPa^{-1}}$). A mantle upwelling therefore crosses its own solidus, and melts without gaining heat. This is what happens at mid-ocean ridges and mantle plumes, and it produces basalt.

**Flux melting.** Water and carbon dioxide depress the solidus by hundreds of degrees: a peridotite containing a few per cent of dissolved water melts at $1100$–$1200\ ^\circ\mathrm{C}$ at 2 GPa instead of $1700\ ^\circ\mathrm{C}$ dry. The water comes from a subducting slab. This is what makes island arcs andesitic.

**Heat-transfer melting.** A large intrusion of hot mafic magma into cold crust melts it. This is how most volumetrically large silicic provinces and many batholiths are thought to have been generated, and it is why mafic underplating and granitic magmatism are so often partners in time.

::: example How much melt does a ridge make? {#ex-decompression}
Mantle at a mid-ocean ridge rises and decompresses adiabatically at $10\ ^\circ\mathrm{C\,GPa^{-1}}$ from $3\ \mathrm{GPa}$ to the surface. Take the dry spinel-peridotite solidus as $T_s(P) = 1200 + 130\,P$ in $^\circ\mathrm{C}$ and GPa, and the potential temperature as $\theta_p = 1350^\circ\mathrm{C}$. At what pressure does melting begin, and roughly what melt fraction results?
::: solution
The adiabat from a potential temperature $\theta_p = 1350^\circ\mathrm{C}$ is $T(P) = 1350 + 10\,P$. Melting begins where the adiabat meets the solidus:
$$
1350 + 10P = 1200 + 130P \quad\Longrightarrow\quad 150 = 120P \quad\Longrightarrow\quad P = 1.25\ \mathrm{GPa}.
$$
Melting therefore starts at about $1.25\ \mathrm{GPa}$, some $38\ \mathrm{km}$ deep, and continues to the surface. The melt fraction is set by how much enthalpy is available between the adiabat and the solidus. The excess temperature grows linearly from $0$ at $1.25\ \mathrm{GPa}$ to $150\ \mathrm{K}$ at the surface, so its mean over the melting column is $75\ \mathrm{K}$; with a latent heat of fusion of about $L = 400\ \mathrm{kJ\,kg^{-1}}$ and a heat capacity $c_p = 1300\ \mathrm{J\,kg^{-1}\,K^{-1}}$,
$$
F \approx \frac{c_p\,\overline{\Delta T}}{L} = \frac{1300\times75}{4\times10^{5}} = 0.24 .
$$
About a quarter of the mantle melts — consistent with the 20–30 % extracted beneath ridges, and with the fact that a 60-km-thick oceanic crust requires roughly that fraction from a 200-km-thick melting region.
:::
:::

## Trace elements: melting as a separation process

::: proposition Batch and fractional melting {#prop-melting-eqns}
Let $C_0$ be the concentration of a trace element in the source, $D_0 = \sum_i w_i K_D^i$ the bulk distribution coefficient between the source minerals and the melt, and $F$ the melt fraction. Then for **batch (equilibrium) melting**
$$
\frac{C_L}{C_0} = \frac{1}{D_0 + F(1 - D_0)},
$$
and for **fractional melting**, in which each increment of melt is removed as soon as it forms,
$$
\frac{C_L}{C_0} = \frac{1}{D_0}\,(1 - F)^{(1/D_0) - 1}, \qquad
\frac{C_S}{C_0} = (1 - F)^{(1/D_0) - 1}.
$$
For a strongly incompatible element ($D_0 \ll 1$) at small $F$, the batch concentration tends to $1/(D_0 + F)$ and both curves diverge most strongly at the smallest melt fractions.
:::

::: proof
**Batch.** One unit of source contains $F$ of liquid and $1-F$ of solid, in equilibrium, so $C_S = D_0 C_L$. Mass balance gives $C_0 = FC_L + (1-F)C_S = C_L[F + (1-F)D_0]$, which is the batch result.

**Fractional.** The residual solid holds $(1-F)C_S$ of the element; removing an increment $\mathrm{d}F$ of liquid of composition $C_L = C_S/D_0$ gives
$$
\mathrm{d}\left[(1-F)C_S\right] = -\frac{C_S}{D_0}\,\mathrm{d}F
\quad\Longrightarrow\quad
(1-F)\,\mathrm{d}C_S = C_S\,\frac{D_0 - 1}{D_0}\,\mathrm{d}F .
$$
Separating and integrating from $C_S = C_0$ at $F = 0$,
$$
\ln\frac{C_S}{C_0} = \frac{D_0-1}{D_0}\int_0^F\frac{\mathrm{d}F}{1-F} = \frac{1-D_0}{D_0}\ln(1-F),
$$
which is the solid curve; dividing by $D_0$ gives the liquid. Note the asymmetry with fractional *crystallisation*, where the corresponding result is $C_L/C_0 = D^{\,F^{(1/D)-1}}$ with $F$ the fraction of liquid remaining: the two are often confused because both are Rayleigh processes, but the mass being removed is the opposite phase.
:::

::: example Enrichment by partial melting {#ex-batch}
An incompatible element has $D_0 = 0.01$ in a spinel-peridotite source. Find $C_L/C_0$ for batch melting at $F = 0.001$, $0.01$ and $0.20$, and the same for fractional melting at $F = 0.01$.
::: solution
Batch: $C_L/C_0 = 1/[0.01 + F(0.99)]$.
$$
F = 0.001:\ \frac{1}{0.01 + 0.00099} = 90.9; \qquad
F = 0.01:\ \frac{1}{0.01 + 0.0099} = 50.2; \qquad
F = 0.20:\ \frac{1}{0.01 + 0.198} = 4.78 .
$$
Fractional at $F = 0.01$:
$$
\frac{C_L}{C_0} = \frac{1}{0.01}(0.99)^{99} = 100\times0.370 = 37.0 .
$$
Three lessons. The enrichment is enormous at tiny melt fractions — a rock melting by one part in a thousand makes a liquid ninety times richer in its incompatible elements than the source. It falls off as the inverse of $F$ once $F \gg D_0$, so the most extreme enrichments require the smallest degrees of melting. And fractional melting gives *less* enrichment than batch at the same $F$, because the early, most enriched liquids are removed and cannot be further concentrated; the difference between the two curves at low $F$ is one of the main ways geochemists decide how melting happened.
:::
:::

::: widget plot
f: 1/(d + x*(1-d)); (1/d)*(1-x)^((1/d)-1)
x: 0.0005, 0.05
y: 0, 120
sliders: d=0.01:0.001:0.5:0.001
labels: \text{batch}; \text{fractional}
caption: Enrichment $C_L/C_0$ of an incompatible element with $D_0 = 0.01$ against melt fraction, for batch and fractional melting. Both curves are steep at the smallest $F$ and both fall roughly as $1/F$; the fractional curve lies below because the earliest liquids are lost. Move the slider to $D_0 = 0.5$ — a mildly incompatible element — and watch both curves flatten: an element with $D_0 = 0.5$ is only enriched by a factor of about two even at $F = 0.001$, which is why the most fractionated trace-element signatures come from the most incompatible elements.
:::

::: history
Josiah Willard Gibbs (Gibbs) set out the phase rule in 1876 in the *Transactions of the Connecticut Academy*, in a paper on the equilibrium of heterogeneous substances that went unread for two decades; Hendrik Roozeboom (Roozeboom) supplied the graphical method and applied it to salt systems in the 1880s; and it was through physical metallurgy — the iron–carbon diagram worked out by J. A. Roberts-Austen and the alloy tables of the early twentieth century — that the method reached geology. Norman L. Bowen (Bowen) brought it to petrology in a series of Carnegie Institution studies beginning in 1913: the binary systems diopside–anorthite and forsterite–silica, the reaction series, and in 1928 *The Evolution of the Igneous Rocks*, which argued that the whole igneous suite could be derived from a basaltic parent by partial melting and crystallisation differentiation. The experimental method — the piston-cylinder apparatus to a few gigapascals from the 1960s, the multi-anvil press to 25 GPa, and internally-heated pressure vessels for hydrous systems — turned the diagrams into quantitative thermometers and made the petrology of the mantle possible. The second half of this chapter, the trace-element arithmetic, came in the 1970s with the modelling of equilibrium and fractional melting by Graham and Frey, Hart and Zindler, and Allègre and Ben Othman.
:::

## Where this leads

Phase diagrams are the grammar of the rest of the petrology course: [[mineralogy-petrology/magma-evolution]] applies them to real magmas, [[mineralogy-petrology/igneous-settings]] reads the resulting chemistry back into plate tectonics, and [[mineralogy-petrology/metamorphic-reactions]] is the same geometry in the pressure–temperature plane instead of the temperature–composition plane. The thermodynamics behind the diagrams is in [[geochemistry/reactions]], and the melting of the mantle that makes basalt is worked out in the context of mantle convection in [[geophysics/heat-flow]].

::: summary
- The phase rule $F = C - P + 2$ is a count, not an approximation; in a condensed system at fixed pressure it is $F = C - P + 1$, and it tells you when an assemblage pins the pressure and temperature.
- In a simple eutectic the liquid moves down the liquidus towards the eutectic composition while a single phase crystallises, then both phases crystallise together at constant temperature.
- The lever rule is mass balance: phase proportions are the inverse ratios of the tie-line arms about the bulk composition.
- Solid solution replaces the eutectic with a two-phase gap between liquidus and solidus, and produces zoning; diffusion over long times erases it, which makes zoning a thermochronometer.
- Rocks melt over a range, and the first liquid is always the most fusible one available. There are only three ways to melt: decompression, flux, and heat transfer.
- Trace elements obey the batch and fractional melting equations; the most extreme enrichments record the smallest melt fractions, and the shape of the pattern records how melting happened.
:::

## Exercises

::: exercise Degrees of freedom {level=1 check="0"}
In a two-component condensed system at fixed pressure, three phases coexist. How many degrees of freedom are there?
::: solution
$F = C - P + 1 = 2 - 3 + 1 = 0$. The assemblage is invariant: it exists at one temperature and one composition, which is what a eutectic point is.
:::
:::

::: exercise The lever rule {level=1 check="0.4"}
In a binary eutectic, a system of bulk composition 40 % B lies in a two-phase field where the liquid contains 20 % B and the crystal 80 % B. What fraction of the system is liquid?
::: solution
$w_\text{liq} = (X_\text{xtal} - X_0)/(X_\text{xtal} - X_\text{liq}) = (80 - 40)/(80 - 20) = 40/60 = 0.40$.
:::
:::

::: exercise Melting point of a pure substance {level=1 check="1"}
Why does a pure mineral at fixed pressure have a sharp melting point while a rock does not?
::: solution
For one component and two phases at fixed pressure, $F = 1 - 2 + 1 = 0$: no variable can be changed, so melting occurs at a single temperature. A rock has many components, so $F \ge 1$ with liquid and solid present and the equilibrium temperature depends on composition — which changes continuously as melting proceeds. Hence a solidus and a liquidus rather than a melting point.
:::
:::

::: exercise Reading a eutectic {level=2}
In the diopside–anorthite system, a rock of composition $\mathrm{Di}_{58}\mathrm{An}_{42}$ and one of $\mathrm{Di}_{80}\mathrm{An}_{20}$ are both cooled slowly. Compare their textures.
::: solution
The first is exactly the eutectic composition: it crystallises entirely at $1274^\circ\mathrm{C}$, plagioclase and diopside appearing together, and gives a fine, equigranular, intimate intergrowth with no phenocrysts. The second lies on the diopside side of the eutectic, so diopside crystallises first over some $120\ \mathrm{K}$ of cooling, forming conspicuous grains, and the residual liquid then solidifies as a eutectic intergrowth at $1274^\circ\mathrm{C}$. The textures differ in exactly the way the phase diagram predicts: poikilitic or ophitic in the second, granular eutectic in the first — and this is how the diagram was originally located, by looking at rocks.
:::
:::

::: exercise Partition coefficient {level=2 check="115"}
Nickel partitions between olivine and basaltic liquid with $K_D^{\mathrm{Ni}} = (\mathrm{Ni}/\mathrm{Mg})_\text{ol}/(\mathrm{Ni}/\mathrm{Mg})_\text{liq} = 1.6$ at $1300^\circ\mathrm{C}$, the ratios being by mass. A liquid contains $8.0\ \mathrm{wt}\%$ MgO and $12\ \mathrm{ppm}$ Ni. What is the Ni content, in ppm, of olivine in equilibrium with it, taking the olivine to contain $48\ \mathrm{wt}\%$ MgO? (Enter the Ni content in ppm.)
::: solution
The liquid ratio is $(\mathrm{Ni}/\mathrm{Mg})_\text{liq} = 12/8.0 = 1.5\ \mathrm{ppm}$ of Ni per $\mathrm{wt}\%$ of MgO. The olivine in equilibrium with it must have
$$
(\mathrm{Ni}/\mathrm{Mg})_\text{ol} = 1.6\times1.5 = 2.4\ \mathrm{ppm\ per\ wt\%},
\qquad
\mathrm{Ni}_\text{ol} = 2.4\times48 = 115\ \mathrm{ppm}.
$$
Natural magnesian olivines with 48–50 wt% MgO do carry 1500–4000 ppm Ni, so a liquid with 12 ppm Ni is somewhat evolved rather than primitive: a primary mantle melt with 15 wt% MgO would carry about 150 ppm Ni and would be in equilibrium with olivine holding some 1400 ppm. This is exactly the calculation used to test whether a basalt is a primary melt, and it is why olivine Ni and Mg# are plotted together in every petrology paper.
:::
:::

::: exercise Enrichment at a mid-ocean ridge {level=2 check="10.3"}
An incompatible element has $D_0 = 0.05$ in MORB-source peridotite. Using batch melting, find $C_L/C_0$ at $F = 0.05$ and at $F = 0.30$. (Give the ratio at $F = 0.05$.)
::: solution
$C_L/C_0 = 1/[0.05 + 0.05\times0.95] = 1/0.0975 = 10.3$ at $F = 0.05$, and $1/[0.05 + 0.30\times0.95] = 1/0.335 = 3.0$ at $F = 0.30$. Ridge basalts are depleted precisely because they are the product of large-degree melting, whereas ocean-island basalts, from smaller degrees of melting deeper in the garnet field, are enriched.
:::
:::

::: exercise Which melting model? {level=2}
Two models predict the concentration of an incompatible element in a melt. What other observation would distinguish them, and why?
::: solution
Look at the **ratio of two incompatible elements with different $D_0$**, and at the **major-element composition** of the melt. Batch and fractional melting fractionate element pairs differently at low $F$: fractional melting produces liquids that are more extreme in the most incompatible element relative to a slightly less incompatible one, because the earliest liquid is removed and never re-equilibrates. Major elements constrain $F$ independently, since the melt's $\mathrm{MgO}$ and $\mathrm{SiO_2}$ record how much olivine and pyroxene were left behind. Combining the two — a trace-element ratio that requires a very small $F$ with a major-element composition that requires a large one — is the classic evidence for porous (channelised) flow rather than either end-member model.
:::
:::

::: exercise Wet versus dry {level=2 check="500"}
The dry peridotite solidus at 2 GPa is about $1700^\circ\mathrm{C}$; a peridotite saturated with an $\mathrm{H_2O}$-rich fluid melts at about $1200^\circ\mathrm{C}$ at the same pressure. By how many degrees does water depress the solidus, and why does that matter for arcs?
::: solution
About $500\ ^\circ\mathrm{C}$. Water enters the melt as $\mathrm{OH}^{-}$, breaks $\mathrm{Si–O–Si}$ bridges, and drastically lowers the activity of the silicate liquid relative to the solid, so melting becomes favourable at much lower temperature. In a subduction zone the slab dehydrates between 80 and 120 km depth, the water rises into the cooler mantle wedge above it, and flux melting begins there — which is why arc volcanoes sit about 100 km behind the trench, and why arc magmas are wet, oxidised and andesitic.
:::
:::

::: exercise A peritectic reaction {level=3}
Write the forsterite–silica peritectic reaction in terms of the mineral names, and explain why it makes the Earth's upper mantle silica-undersaturated and the crust silica-saturated.
::: solution
$$
\mathrm{Forsterite} + \mathrm{Silica\ (in\ liquid)} \longrightarrow \mathrm{Enstatite}, \qquad
\mathrm{Mg_2SiO_4} + \mathrm{SiO_2} \longrightarrow \mathrm{Mg_2Si_2O_6},
$$
at $1557^\circ\mathrm{C}$ and 1 bar. The atoms balance: two magnesium, two silicon and six oxygens on each side. The reaction consumes free silica, so any melt made by melting a spinel-lherzolite (60 % olivine, 20 % orthopyroxene, 15 % garnet or spinel) is immediately buffered away from silica-saturation by reaction with the olivine it passes through. The mantle is therefore strongly silica-undersaturated, and its melts are basaltic and olivine-normative. The crust, by contrast, is the product of many such reactions taken to completion, of fractional crystallisation that removes magnesium and iron, and of dehydration — and it ends up silica-saturated to oversaturated, with quartz as a modal mineral in more than half of it.
:::
:::

::: exercise Derive the batch equation for two components {level=3}
For a binary eutectic with a solid phase of composition $X_S$ and a liquid of composition $X_L$, show that the melt fraction produced by equilibrium (batch) melting of a source $X_0$ is $F = (X_0 - X_S)/(X_L - X_S)$, and reconcile this with the lever rule and with the trace-element equation.
::: solution
Mass balance on the component: $X_0 = FX_L + (1-F)X_S$, so $F = (X_0 - X_S)/(X_L - X_S)$. This *is* the lever rule, written for the liquid fraction rather than derived from it — the two are the same statement.

To reconcile it with $C_L/C_0 = 1/[D_0 + F(1-D_0)]$, write the distribution coefficient for the trace element as $D_0 = C_S/C_L$ and note that the trace element is dilute enough that it does not change $X_S$, $X_L$ or $F$: the major-element lever rule fixes $F$ from the phase compositions, and the trace-element equation then gives the concentration in the liquid at that $F$. The two equations are used in sequence, not simultaneously — which is why a petrologist can compute a melt fraction from major elements and then use it to interpret trace elements, and why the whole method fails if the trace element is concentrated enough to change the phase relations (above a few per cent, which is where "trace" chemistry stops and major-element petrology begins).
:::
:::
