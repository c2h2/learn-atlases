Purity is a claim, not a feeling. A solid that looks white and crystalline may be ninety per cent product and ten per cent by-product — most organic by-products are white and crystalline too, and the eye cannot see one molecule of impurity in a million, which is exactly the level at which a melting point moves and a yield lies. The honest evidence of purity is physical: a sharp melting point, a single spot on a chromatography plate, one peak in a chromatogram ([[laboratory-methods/identifying-compounds]], [[laboratory-methods/chromatography-basics]]). Between the crude flask and that evidence stand the operations of this chapter, and every one rests on the same idea: **a separation is only possible if two things differ in some physical property, and every purification exploits exactly one such difference.** Filtration exploits particle size; distillation, volatility; recrystallisation and extraction, solubility — and, in acid–base extraction, acidity itself. Before starting any purification you should be able to name the property you are leaning on; if you cannot, you are not purifying anything, only moving the mixture around more expensively.

The operations here are the daily working equipment of every organic, analytical, physical and biological laboratory: the same filtration that saves a precipitate in gravimetric analysis ([[analytical-chemistry/classical-analysis]]), the same extraction that cleans up a reaction before chromatography, the same distillation that makes every solvent in the building. They are also hazardous when done carelessly — the solvents are volatile and most are extremely flammable, and distillation involves hot glassware and pressure differences across glass. This chapter describes the operations and the principles behind them; **doing them in a laboratory requires supervision, a risk assessment and the hazard knowledge of** [[laboratory-methods/lab-safety]].

## Filtration

Filtration separates a solid from a liquid by **particle size**: the pores of a filter pass molecules of dissolved solute and solvent but retain particles too large to enter them. Everything else in the technique is detail.

**Gravity filtration** pours the mixture onto paper in a funnel and lets gravity do the work. A paper folded into a **fluted** (pleated) pattern filters much faster than a smooth cone: the pleats touch the glass only along their ridges, leaving air channels so the filtrate is not held back by a partial vacuum, and the wetted area is several times larger. Fluted paper is therefore the choice when you want the *liquid* — a hot solution being freed of dust or insoluble impurities before crystallisation, where a stemless funnel and pre-warmed glass keep the product from crystallising on the cold paper. A smooth **cone** filter is slower but collects the solid as a compact cake at the point of the cone, where it can be scraped off and washed — the choice when you want the *solid* and can wait.

**Vacuum filtration** (suction filtration, on a **Büchner funnel**) replaces gravity with a pressure difference. A filter paper is cut to sit flat on the perforated plate, covering every hole but not overlapping the wall — a paper that touches the wall lets fine crystals slip down the gap, and a paper with uncovered holes lets them through. The loose paper is first wetted with a little of the solvent it is about to filter, the suction is switched on to seat it against the plate, and only then is the mixture poured on, followed by a rinse of the flask. A Büchner cake comes out far drier than a gravity cake, and the reason is worth understanding because it is the reason for the whole technique: a freshly filtered solid holds a film of liquid between its crystals by capillary action, and gravity cannot pull that film out — no more than you can drain a wet sponge by holding it upright. Suction drives a steady stream of *air* through the cake, and that air carries the capillary liquid away with it, so a few minutes of pulling air through does what an hour of draining cannot.

**Decantation** is filtration without a filter: the solid is allowed to settle and the liquid is poured off — the coarsest of the three, used when the crystals are heavy and few, or when the liquid is the product. In gravimetric work a precipitate is washed by repeated decantation, each fresh portion of wash water carrying its share of the mother liquor's dissolved ions out with it ([[analytical-chemistry/classical-analysis]]).

## Recrystallisation

::: definition Recrystallisation {#def-recrystallisation}
**Recrystallisation** purifies a crystalline solid by dissolving it in a hot solvent and letting the solution cool so that the solid crystallises again, purer. The method exploits the **steep solubility–temperature curve** of most organic solids: solubility is often ten times higher near the solvent's boiling point than at $0\ ^\circ\mathrm{C}$, so a solution saturated hot is grossly supersaturated cold and most of the solid must come out. Impurities are left behind two ways: soluble ones, present in smaller amount than the product, stay dissolved even cold because their concentration never reaches saturation, while insoluble ones are filtered off hot. The liquid drained from the crystals — the **mother liquor** — is where the impurities end up.
:::

Everything depends on the solvent. The ideal recrystallisation solvent (a) dissolves the solid readily when boiling but barely at $0$–$10\ ^\circ\mathrm{C}$; (b) does not react with it — no esterifying an acid, no dissolving it by acid–base reaction; (c) dissolves impurities either always (so they never saturate the cold solution) or never (so hot filtration removes them); (d) is volatile enough to dry off the crystals below their melting point, so the product dries rather than melts into its own solvent; and (e) is safe and cheap. Water is the model solvent when it works — non-flammable, cheap, steep solubility curves — and for solids water will not serve, ethanol, ethoxyethane (diethyl ether) and hexane are common choices, each bought at the price of extreme flammability: none may be used near a naked flame, and all need the fume-cupboard habits of [[laboratory-methods/lab-safety]].

::: algorithm Recrystallisation {#alg-recrystallisation}
1. **Choose the solvent** by test-tube trial: a small spatula of solid should dissolve in a small volume of boiling solvent and crystallise again when the tube cools in water ([[#ex-solvent-choice]]).
2. **Dissolve in the minimum of boiling solvent.** Heat near the boiling point and add solvent in small portions, just until the solid dissolves; every excess cubic centimetre stays in the mother liquor and takes product with it. If a little solid refuses to dissolve even in excess boiling solvent, it is insoluble impurity — remove it in step 4, do not add more solvent.
3. **Treat with charcoal if needed.** For coloured impurities (conjugated, high-molar-mass molecules adsorbed on the crystals), stir in a *small* spatula-tip of activated charcoal and boil briefly; the charcoal adsorbs them. Expect foaming when the charcoal goes in, and never add it to a solvent already boiling violently.
4. **Filter hot** through fluted paper to remove the charcoal and any insoluble grit, using a pre-warmed funnel; crystals forming on the paper mid-filtration are product lost to impatience — re-warm.
5. **Cool slowly** to room temperature, then in ice. Slow cooling gives fewer, larger, purer crystals; ice finishes the job by lowering the product's solubility to almost nothing.
6. **Collect by Büchner filtration**, wash the cake with a few $\mathrm{cm^3}$ of **ice-cold** solvent — cold so that it washes away mother liquor without redissolving the crystals — and pull air through the cake.
7. **Dry to constant mass** ([[laboratory-methods/volumetric-technique]]) before anyone weighs a yield or trusts a melting point.
:::

Never evaporate the mother liquor to dryness to "get the rest": the extra solid it leaves is exactly the material that made the crude impure, and returning it to the product undoes the purification. The mother liquor is the method's waste stream; a recovery of eighty or ninety per cent with a sharp melting point beats a quantitative recovery of grey powder.

::: example Choosing a recrystallisation solvent {#ex-solvent-choice}
Crude aspirin-like compound $\mathrm{X}$ is contaminated with a coloured by-product $\mathrm{Y}$. Solubilities are measured as follows (grams of solute per $100\ \mathrm{cm^3}$ of solvent):

| | water, $20\ ^\circ\mathrm{C}$ | water, $100\ ^\circ\mathrm{C}$ | hexane, $20\ ^\circ\mathrm{C}$ | hexane, $69\ ^\circ\mathrm{C}$ (b.p.) |
|---|---|---|---|---|
| $\mathrm{X}$ | $0.4$ | $6.0$ | $0.1$ | $0.2$ |
| $\mathrm{Y}$ | $20$ | very soluble | $0.1$ | $0.3$ |

Which solvent do you recrystallise from, and what will remove $\mathrm{Y}$?
::: solution
Water. Compound $\mathrm{X}$ shows the required pattern — nearly insoluble cold ($0.4\ \mathrm{g}$ per $100\ \mathrm{cm^3}$), freely soluble boiling ($6.0\ \mathrm{g}$) — so a hot saturated solution gives back most of $\mathrm{X}$ on cooling. By-product $\mathrm{Y}$, present in small amount, is extremely soluble in *cold* water ($20\ \mathrm{g}$ per $100\ \mathrm{cm^3}$), so its concentration never reaches saturation and it stays in the mother liquor; no charcoal is even needed. Hexane fails the first test: $\mathrm{X}$ barely dissolves in it even boiling ($0.2\ \mathrm{g}$ per $100\ \mathrm{cm^3}$), so no practicable volume will dissolve the solid. Note the arithmetic of step 2 of [[#alg-recrystallisation]]: $3.0\ \mathrm{g}$ of $\mathrm{X}$ needs $50\ \mathrm{cm^3}$ of boiling water and no more.
:::
:::

::: example Maximum recovery from solubility data {#ex-recovery}
A compound dissolves $5.0\ \mathrm{g}$ per $100\ \mathrm{cm^3}$ at the solvent's boiling point and $0.50\ \mathrm{g}$ per $100\ \mathrm{cm^3}$ at $0\ ^\circ\mathrm{C}$. A $5.0\ \mathrm{g}$ sample is recrystallised from the minimum volume of solvent. What is the maximum recovery, and where does the rest go?
::: solution
The minimum volume of boiling solvent is $100\ \mathrm{cm^3}$, which just dissolves $5.0\ \mathrm{g}$. Cooled to $0\ ^\circ\mathrm{C}$, that same $100\ \mathrm{cm^3}$ holds only $0.50\ \mathrm{g}$, so the crystals are at most
$$
5.0\ \mathrm{g} - 0.50\ \mathrm{g} = 4.5\ \mathrm{g},
\qquad\text{a recovery of}\qquad
\frac{4.5\ \mathrm{g}}{5.0\ \mathrm{g}} \times 100 = 90\ \%.
$$
The missing $10\ \%$ is not sloppy technique — it is *in the mother liquor*, dissolved, even in a perfect operation. Recoveries below $100\ \%$ are therefore normal, and it is the *cold* solubility that sets the ceiling: had it been $0.25\ \mathrm{g}$ instead of $0.50\ \mathrm{g}$, the ceiling would be $95\ \%$. The real recovery sits a few per cent lower still, because crystals cling to glass and redissolve in the wash.
:::
:::

## Distillation

A liquid **boils** when its vapour pressure rises to equal the external pressure, so boiling point is not a property of the liquid alone but of liquid plus pressure — the lever that vacuum distillation pulls. For a mixture of two miscible liquids the connection is Raoult's law, $p_\mathrm{A} = x_\mathrm{A}\,p^\circ_\mathrm{A}$ ([[general-chemistry-2/liquids-solutions]]): the vapour above any boiling mixture is richer in the more volatile component than the liquid it came from, and distillation is the art of collecting that enriched vapour.

**Simple distillation** — flask, still head, condenser, receiver — takes one vaporisation–condensation step. It is the right tool when the boiling points are far apart (say $70\ \mathrm{K}$ or more), or when the goal is not to split two liquids but to remove one of them: taking off the solvent from a reaction mixture, or driving water out of a reaction. For closer boiling points it separates poorly, because a single equilibrium step enriches the vapour only so far.

**Fractional distillation** packs a column between flask and still head so that rising vapour repeatedly condenses on the packing, is re-heated by more vapour, and re-vaporises — each cycle an extra equilibrium step, each counted as one **theoretical plate**. A column of ten theoretical plates performs ten enrichments where a simple still performs one, and the boiling-point gap two liquids need before they can be split falls from tens of degrees to a few. Ethanol and water show both the power and the limit: their boiling points ($78$ and $100\ ^\circ\mathrm{C}$) are close enough that simple distillation barely enriches, while fractional distillation drives the distillate towards the ethanol-rich **azeotrope** (about $96\ \%$ ethanol by mass, boiling at $78.2\ ^\circ\mathrm{C}$, below ethanol's own boiling point — which is why ordinary distillation never reaches absolute alcohol); the azeotrope is exactly the departure from Raoult's law of [[general-chemistry-2/liquids-solutions]].

**Vacuum distillation** lowers the external pressure so that boiling happens far below the atmospheric boiling point: water boils at about $46\ ^\circ\mathrm{C}$ under $10\ \mathrm{kPa}$, and many organic liquids that boil above $200\ ^\circ\mathrm{C}$ — and begin to decompose there — distil below $100\ ^\circ\mathrm{C}$ at a few $\mathrm{kPa}$. It is the method for high-boiling or thermally fragile liquids, run behind the safety shield [[laboratory-methods/lab-safety]] demands, because a pressure difference across glass is a stored explosion.

**Steam distillation** separates water-immiscible organics below $100\ ^\circ\mathrm{C}$. For two *immiscible* liquids each exerts its own vapour pressure as if the other were not there, so the mixture boils when
$$
p^\circ_\mathrm{A} + p^\circ_{\mathrm{H_2O}} = p_\mathrm{atm},
$$
below the boiling point of either pure liquid. Because the vapour contains the two species in the ratio of their vapour pressures, the distillate's mass ratio is
$$
\frac{m_\mathrm{A}}{m_w} = \frac{p^\circ_\mathrm{A}\,M_\mathrm{A}}{p^\circ_w\,M_w},
$$
so even a barely volatile organic comes over in a useful amount, and the distillate separates into two layers in the receiver. This is how essential oils and other heat-sensitive natural products are isolated without roasting them.

::: warning Distillation safety is not optional {#warn-distillation}
Four rules, each earned by an explosion or a fire. **Never distil a flask to dryness**: non-volatile residues concentrate into a film on hot glass, and ethers (ethoxyethane, tetrahydrofuran, 1,4-dioxane) that have stood open form peroxides which are far less volatile than the ether and *explode on the last drop* — stop while liquid still covers the bottom. **Never heat a sealed system**: a distillation must breathe — an open joint to the atmosphere somewhere, never an airtight stopper — because heating a closed volume builds pressure until glass becomes shrapnel. **Add anti-bumping granules before heating, never after**: the porous granules feed a steady stream of small bubbles through the boiling liquid, but dropped into a liquid already hot and superheated they release their air all at once and trigger violent bumping that sprays hot liquid up the condenser. And keep naked flames away from the receiver when the distillate is flammable — ethoxyethane (b.p. $35\ ^\circ\mathrm{C}$) ignites on a hotplate's bare element across the bench.
:::

::: example Choosing the distillation method {#ex-distillation-choice}
Choose and justify a distillation method for each mixture: (a) ethanol from an aqueous solution, aiming for the strongest possible distillate; (b) a fragrant oil that boils at $254\ ^\circ\mathrm{C}$ and decomposes slowly near its boiling point; (c) a heat-sensitive natural product, water-immiscible, to be separated from plant tissue.
::: solution
(a) **Fractional distillation.** The boiling-point gap is only $22\ \mathrm{K}$, so a simple still barely enriches; a column of many theoretical plates drives the distillate towards the $96\ \%$ azeotrope, and no distillation goes beyond it. (b) **Vacuum distillation.** Reduced pressure moves the boiling point down away from the decomposition temperature — boiling follows pressure, not the other way round. (c) **Steam distillation.** With water the mixture boils below $100\ ^\circ\mathrm{C}$ however high the product's own boiling point, the product co-distils in the mass ratio above, and the residue never gets hot enough to char or destroy it. Each choice names its property difference: volatility gap in (a), pressure-dependence of boiling point in (b), immiscibility in (c).
:::
:::

## Liquid–liquid extraction

::: definition The distribution (partition) coefficient {#def-distribution}
When a solute $\mathrm{A}$ distributes itself between two immiscible phases — typically an organic solvent and water — that are in contact, it settles at equilibrium into a fixed ratio of concentrations, the **distribution (partition) coefficient**
$$
D = \frac{[\mathrm{A}]_\mathrm{org}}{[\mathrm{A}]_\mathrm{aq}}.
$$
$D$ is a genuine equilibrium constant for the transfer of $\mathrm{A}$ between the phases: it depends on $\mathrm{A}$, the two solvents and the temperature alone, not (for dilute solutions) on how much $\mathrm{A}$ you started with. A large $D$ means the solute prefers the organic layer; a small $D$ means it stays in the water. Shaking establishes the ratio, and the whole technique of extraction is repeated re-equilibration against fresh solvent ([[general-chemistry-2/liquids-solutions]]).
:::

::: proposition Fraction remaining after extraction {#prop-extraction}
Solute dissolved in an aqueous phase of volume $V_\mathrm{aq}$ is extracted once with an organic phase of volume $V_\mathrm{org}$. At equilibrium the fraction of solute remaining in the aqueous phase is
$$
f_1 = \frac{V_\mathrm{aq}}{D\,V_\mathrm{org} + V_\mathrm{aq}}.
$$
If instead the *same total volume* $V_\mathrm{org}$ is used for $n$ successive extractions with fresh portions of $V_\mathrm{org}/n$ each, the fraction remaining is
$$
f_n = \left(\frac{V_\mathrm{aq}}{D\,V_\mathrm{org}/n + V_\mathrm{aq}}\right)^{n}.
$$
Because $f_n$ falls as $n$ grows, **many small extractions beat one big one** with the same total volume of solvent.
:::

::: proof Mass balance and the definition of $D$ {#proof-extraction}
Let $m_0$ be the mass of solute initially in the water. After one extraction with $V_\mathrm{org}$, let $m_\mathrm{aq}$ remain in the water and $m_0 - m_\mathrm{aq}$ pass into the organic layer. The concentrations are $[\mathrm{A}]_\mathrm{aq} = m_\mathrm{aq}/V_\mathrm{aq}$ and $[\mathrm{A}]_\mathrm{org} = (m_0 - m_\mathrm{aq})/V_\mathrm{org}$, so the definition of $D$ gives
$$
D = \frac{(m_0 - m_\mathrm{aq})/V_\mathrm{org}}{m_\mathrm{aq}/V_\mathrm{aq}}
\qquad\Longrightarrow\qquad
m_0 - m_\mathrm{aq} = \frac{D\,V_\mathrm{org}}{V_\mathrm{aq}}\,m_\mathrm{aq}.
$$
Collecting the $m_\mathrm{aq}$ terms, $m_0 = m_\mathrm{aq}\left(1 + D\,V_\mathrm{org}/V_\mathrm{aq}\right)$, and dividing,
$$
f_1 = \frac{m_\mathrm{aq}}{m_0} = \frac{1}{1 + D\,V_\mathrm{org}/V_\mathrm{aq}} = \frac{V_\mathrm{aq}}{D\,V_\mathrm{org} + V_\mathrm{aq}}.
$$
For $n$ extractions, each fresh portion of solvent starts with no solute, so each multiplies whatever remains by the same factor with $V_\mathrm{org}$ replaced by $V_\mathrm{org}/n$; applying the one-step result $n$ times in succession (an induction on the number of portions) gives $f_n = \left(V_\mathrm{aq}/(D\,V_\mathrm{org}/n + V_\mathrm{aq})\right)^n$. The denominator of each factor shrinks more slowly than the exponent grows, so $f_n$ decreases with $n$: splitting the solvent always wins.
:::

::: widget plot
f: 1 - (2/(x+2))^n
x: 0, 10
y: 0, 1
sliders: n=1:1:5:1
labels: \text{fraction extracted}
caption: The fraction of a solute extracted from $100\ \mathrm{cm^3}$ of water by a total of $50\ \mathrm{cm^3}$ of organic solvent divided into $n$ portions set by the slider, against the distribution coefficient $D$. Even a poor $D = 1$ takes out a third in one portion and $70\ \%$ in three, while $D = 4$ reaches $96\ \%$ in three portions. For every $D > 0$ the curve rises with $n$: the same total volume of solvent always extracts more when it is divided into more portions, which is why chemists shake three times with small solvent instead of once with all of it.
:::

::: example One extraction or three {#ex-extraction-numbers}
A solute has $D = 4$ between ethoxyethane and water. A solution of $1.00\ \mathrm{g}$ of it in $100\ \mathrm{cm^3}$ of water is extracted (a) once with $50\ \mathrm{cm^3}$ of ethoxyethane; (b) three times with $16.7\ \mathrm{cm^3}$ each. What mass remains in the water in each case? (Ethoxyethane is extremely flammable and volatile — the fume cupboard and no flames, as always.)
::: solution
(a) One extraction, $f_1 = V_\mathrm{aq}/(D V_\mathrm{org} + V_\mathrm{aq})$:
$$
f_1 = \frac{100}{4 \times 50 + 100} = \frac{100}{300} = 0.333,
$$
so $1.00\ \mathrm{g} \times 0.333 = 0.33\ \mathrm{g}$ stays in the water and $0.67\ \mathrm{g}$ is extracted. (b) Three portions of $16.7\ \mathrm{cm^3}$:
$$
f_3 = \left(\frac{100}{4 \times 16.7 + 100}\right)^{3} = \left(\frac{100}{166.7}\right)^{3} = 0.600^{3} = 0.216,
$$
so $0.22\ \mathrm{g}$ remains and $78\ \%$ is extracted — $12$ percentage points more for the same $50\ \mathrm{cm^3}$ of solvent, because each fresh portion takes a fixed *fraction* of what the last left behind.
:::
:::

The technique lives in a **separatory funnel**: close the tap, add both layers, stopper, invert with the tap pointed away from people, and **vent often** — shaking warms the funnel in your hands and vaporises volatile solvent (ethoxyethane boils at $35\ ^\circ\mathrm{C}$), building pressure that will blow the stopper out of the top of your hand if you do not release it. Then clamp, let the layers part completely, run the lower layer out through the tap and pour the upper layer out through the top, so the two never re-mix in the tap bore. Which layer is which is a density question: water is $1.00\ \mathrm{g\,cm^{-3}}$, dichloromethane $1.33\ \mathrm{g\,cm^{-3}}$ (it sinks), ethoxyethane $0.71\ \mathrm{g\,cm^{-3}}$ (it floats). Two habits save separations: **retain both layers** until you know which carries your solute, and when in doubt add a drop of water and watch which layer it joins. Brine (concentrated aqueous sodium chloride) does two useful jobs — it **salts out** organic solute from the aqueous layer (the brine's ions make water a worse solvent for organics, raising $D$) and it thins stubborn emulsions. Emulsions — clouds of one liquid suspended in the other, common with detergent-like or tannin-rich mixtures — are beaten by patience, by brine, and by swirling instead of shaking; forcing one wastes more product than waiting ever did.

::: warning "The organic layer is always on top" is false {#warn-layer}
The organic layer is on top only when it is *less dense than water*, and half the teaching-laboratory solvents are not: dichloromethane ($1.33\ \mathrm{g\,cm^{-3}}$), chloroform and dichloroethane all sink, while ethoxyethane, hexane and toluene float. A student who drains "the aqueous layer" from a dichloromethane extraction because "water is always on the bottom" has poured the product down the sink with perfect technique. Density decides, not nationality of the solvent: check the density, or add a drop of water and watch where it goes — and until you have checked, keep both layers.
:::

::: quiz
After shaking ethoxyethane with water in a separatory funnel, the mixture has settled into two clear layers. What is the reliable way to decide which layer is the aqueous one?
- [x] Add a drop of water to the funnel and watch which layer the drop joins.
- [ ] Assume the upper layer, because ethers are always on top of water.
- [ ] Taste a tiny sample of each layer.
- [ ] Measure the volume of each layer, because the aqueous layer is always the larger.
::: solution
The drop of water: it merges with the layer it is the same liquid as, whatever the densities happen to be. "Ethers are always on top" happens to be true for ethoxyethane ($0.71\ \mathrm{g\,cm^{-3}}$) but fails for the halogenated solvents that sink ([[#warn-layer]]) — a rule right only by accident teaches the wrong habit. Layer volumes say nothing about identity, and tasting laboratory materials is prohibited absolutely, however innocent the chemicals sound ([[laboratory-methods/lab-safety]]).
:::
:::

## Drying

An organic layer that has been in contact with water is wet: microscopic droplets of water hang in it, and most organic solvents carry dissolved water of their own. Before the solvent is removed — and before the solution goes near a chromatography column or a reaction — the water must go, by shaking the layer with an **anhydrous drying agent**: a salt whose hydrates are stable, which binds the water into its crystal lattice.

| Drying agent | Speed | Capacity / $\mathrm{g\ H_2O}$ per $\mathrm{g}$ | Watch out for |
|---|---|---|---|
| $\mathrm{MgSO_4}$ | fast | $1.05$ (heptahydrate) | slightly acidic; fine for most work |
| $\mathrm{Na_2SO_4}$ | slow | $1.27$ (decahydrate) | needs time; greatest capacity |
| $\mathrm{CaCl_2}$ | fast | $0.97$ (hexahydrate) | **not for alcohols or amines** — it forms addition compounds with them |

The capacities are just the hydrate stoichiometries ($10 \times 18.02 / 142.04 = 1.27$ for the sodium sulfate decahydrate), so a spatula-tip binds far more water than a wet solution ever carries; the limit is contact, not capacity. The criterion is visual: add the powder in small portions, swirling, until a little extra no longer clumps but **flows like snow** through a now-clear solution (a wet solution of an organic in a water-immiscible solvent is faintly cloudy; clearing is the droplets disappearing). Let it stand a few minutes, decant or filter off the salt, and remove the solvent itself by evaporation or gentle distillation — never by hammering the product with heat it cannot take. The final product is dried **to constant mass** before it is weighed ([[laboratory-methods/volumetric-technique]]), because "dry" that has not been proven to stop drying is an opinion.

::: example Choosing a drying agent {#ex-drying-choice}
You have extracted (a) an ethoxyethane solution of a neutral hydrocarbon product, and (b) an ethoxyethane solution of an amine product, from aqueous layers. Which drying agent for each, and why not calcium chloride for (b)?
::: solution
(a) Any of the three: $\mathrm{MgSO_4}$ is the default — fast, high-capacity, unreactive toward hydrocarbons. (b) $\mathrm{MgSO_4}$ or $\mathrm{Na_2SO_4}$, **never** $\mathrm{CaCl_2}$: calcium chloride holds alcohols and amines as addition compounds, so it would dry the solution by removing the solute. The rule: the drying agent may attack the water but must not attack the product — when in doubt, magnesium or sodium sulfate, and sodium sulfate's greater capacity wins slow jobs if you give it the time.
:::
:::

::: history
Distillation is the oldest separation. The alembic stills of the Hellenistic alchemists of first-century Alexandria already exploited the behaviour this chapter turns into technique: heat a mixture, and something escapes before the rest. The Arabic name of the apparatus gave us the word *alcohol* by way of *al-ghūl*, "the spirit" — the volatile thing that escapes the liquid and is recaptured in the cooled neck, which is, in one image, the whole of distillation. The operation slept for centuries as an apothecary's curiosity until the nineteenth century made it quantitative and continuous: Liebig's condenser, introduced by Justus von Liebig in the 1820s, cooled vapour efficiently in a water-jacketed tube instead of a long swan-neck leaking spirit into the laboratory air, turning distillation into a laboratory tool that lost nothing; and the petroleum industry's fractionating columns — a tower of trays fed with crude oil, running day after day — turned one flask into a continuous separation, the industrial twin of the theoretical plate. The other operations are older than chemistry: washing clay to purify lye, recrystallising sugar, and shaking oils out of water with alcohol are all medieval, and all of them are this chapter.
:::

## Where this leads

The partition coefficient of this chapter, done a thousand times in one pass, is chromatography: [[laboratory-methods/chromatography-basics]] develops the idea on paper and thin-layer plates, and [[analytical-chemistry/chromatography]] does it with columns, detectors and numbers. The purity claim of the opening paragraph is proved by melting point and mixed melting point in [[laboratory-methods/identifying-compounds]], and every yield here is finally a mass dried to constant mass — [[laboratory-methods/volumetric-technique]]. The concentration arithmetic behind the extraction calculations is [[general-chemistry-1/solutions-reactions]], the vapour-pressure and Raoult foundations are [[general-chemistry-2/liquids-solutions]], and the equilibrium constants hiding in solubility and salting out are [[general-chemistry-2/solubility-equilibria]]; the filtration discipline of a gravimetric precipitate is [[analytical-chemistry/classical-analysis]], and every solvent here is judged for hazard by [[laboratory-methods/lab-safety]].

::: summary
- Every separation exploits exactly one property difference — size, volatility, solubility, acidity, affinity — and you must be able to name it before you start.
- Filtration sorts by particle size; a Büchner cake is drier than a gravity cake because suction drives *air* through the capillary liquid between the crystals, which gravity cannot do.
- Recrystallisation exploits the steep solubility–temperature curve: dissolve in the *minimum* of boiling solvent, cool, filter, wash with ice-cold solvent; the mother liquor keeps the impurities, so never evaporate it to dryness.
- A liquid boils when its vapour pressure equals the external pressure; fractional distillation multiplies vaporisation–condensation cycles (theoretical plates), vacuum distillation lowers the boiling point, and steam distillation carries water-immiscible organics over below $100\ ^\circ\mathrm{C}$.
- Never distil to dryness (peroxide-forming ethers explode on the last drop), never heat a sealed system, and add anti-bumping granules before heating, never after.
- Extraction obeys the distribution coefficient $D = [\mathrm{A}]_\mathrm{org}/[\mathrm{A}]_\mathrm{aq}$: the fraction left in the water after $n$ portions is $\left(V_\mathrm{aq}/(D\,V_\mathrm{org}/n + V_\mathrm{aq})\right)^n$, so many small extractions beat one big one.
- The organic layer is not always on top — density decides; vent the separatory funnel often, keep both layers until you know, and dry the organic layer to flowing, clear snow with a drying agent that cannot attack the product.
:::

## Exercises

::: exercise Name the property difference {level=1}
For each operation, name the single physical property difference it exploits: (a) filtering sand from water through filter paper; (b) recrystallising benzoic acid from water; (c) distilling ethanol from a fermented aqueous broth; (d) shaking iodine water with ethoxyethane to pull the iodine into the organic layer.
::: solution
(a) Particle size — dissolved molecules and water pass the filter's pores, sand grains cannot. (b) Solubility, specifically its steep temperature dependence: benzoic acid dissolves freely in boiling water and barely in cold, so it returns as crystals while more-soluble impurities stay in the mother liquor. (c) Volatility (boiling point): ethanol's vapour pressure is higher at every temperature, so the vapour — and the distillate — is ethanol-rich ([[general-chemistry-2/liquids-solutions]]). (d) The distribution coefficient: iodine is far more soluble in ethoxyethane than in water, so $D \gg 1$ and most of it ends in the organic layer.
:::
:::

::: exercise Maximum recovery {level=1 check="95.0"}
A compound dissolves $6.0\ \mathrm{g}$ per $100\ \mathrm{cm^3}$ at the solvent's boiling point and $0.30\ \mathrm{g}$ per $100\ \mathrm{cm^3}$ at $0\ ^\circ\mathrm{C}$. A $6.00\ \mathrm{g}$ sample is recrystallised from $100\ \mathrm{cm^3}$ of solvent and cooled to $0\ ^\circ\mathrm{C}$. What is the maximum percentage recovery? (Enter the percentage recovery.)
::: solution
The boiling solvent just dissolves the sample; at $0\ ^\circ\mathrm{C}$ the $100\ \mathrm{cm^3}$ of mother liquor retains $0.30\ \mathrm{g}$. Crystals: $6.00 - 0.30 = 5.70\ \mathrm{g}$, so recovery $= 5.70/6.00 \times 100 = 95.0\ \%$ ([[#ex-recovery]]). Anything beyond $95.0\ \%$ would require evaporating mother liquor — which returns the impurities.
:::
:::

::: exercise Which layer is the organic one? {level=1}
A separatory funnel holds a dichloromethane layer and an aqueous layer. Which is the organic layer, top or bottom, and how do you confirm it without any measurements?
::: solution
Dichloromethane has density $1.33\ \mathrm{g\,cm^{-3}}$, greater than water's $1.00\ \mathrm{g\,cm^{-3}}$, so the organic layer is the **bottom** one ([[#warn-layer]]). Confirmation: let the layers settle, then add a drop of water and watch which layer it joins — it merges with the aqueous layer whatever the densities are. Never decide by assuming; halogenated solvents sink.
:::
:::

::: exercise Two smaller extractions {level=2 check="0.25"}
The solute of [[#ex-extraction-numbers]] ($D = 4$ between ethoxyethane and water) sits in $100\ \mathrm{cm^3}$ of water. It is extracted twice with $25\ \mathrm{cm^3}$ of ethoxyethane each time. What fraction of the solute remains in the water? (Enter the fraction remaining.)
::: solution
Each extraction leaves the fraction $V_\mathrm{aq}/(D V_\mathrm{org} + V_\mathrm{aq}) = 100/(4 \times 25 + 100) = 100/200 = 0.50$, so two extractions leave $0.50^2 = 0.25$ — a quarter, against the third left by one $50\ \mathrm{cm^3}$ portion ([[#prop-extraction]]). Same total solvent, better extraction: the argument of the widget above, in numbers.
:::
:::

::: exercise Steam distillation mass ratio {level=2 check="1.73"}
A water-immiscible organic $\mathrm{A}$ ($M_\mathrm{A} = 157.0\ \mathrm{g\,mol^{-1}}$) is steam-distilled. At the temperature at which the mixture boils under $760\ \mathrm{mmHg}$ total pressure, the vapour pressures are $p^\circ_\mathrm{A} = 126\ \mathrm{mmHg}$ and $p^\circ_w = 634\ \mathrm{mmHg}$. What is the mass ratio of organic to water in the distillate? (Enter the mass ratio $m_\mathrm{A}/m_w$.)
::: solution
For immiscible liquids each exerts its own vapour pressure, so the vapour mole ratio is $n_\mathrm{A}/n_w = p^\circ_\mathrm{A}/p^\circ_w$ and the mass ratio is
$$
\frac{m_\mathrm{A}}{m_w} = \frac{p^\circ_\mathrm{A} M_\mathrm{A}}{p^\circ_w M_w} = \frac{126 \times 157.0}{634 \times 18.02} = \frac{19\,782}{11\,425} = 1.73 .
$$
The distillate is roughly two-thirds organic by mass — steam distillation is a real separation, not a trace method — and the mixture boils below $100\ ^\circ\mathrm{C}$ because $126 + 634 = 760\ \mathrm{mmHg}$ at that temperature, far below the organic's own boiling point.
:::
:::

::: exercise Choose the purification route {level=2}
Crude acetylsalicylic acid (aspirin) from a synthesis is a white solid contaminated with a small amount of sand and a trace of a coloured, high-molar-mass by-product. A classmate proposes sublimation; another proposes column chromatography. Choose a route and justify it against both alternatives.
::: solution
**Recrystallisation from water** (or aqueous ethanol) is the route. The contaminants are exactly the two kinds the method answers: sand is insoluble and leaves at the hot filtration (step 4 of [[#alg-recrystallisation]]), and the coloured by-product, present in trace amount and more soluble than the product, stays in the mother liquor — with charcoal if the colour is stubborn. Sublimation exploits volatility instead, but aspirin is only weakly volatile and decomposes on strong heating, so the needed property difference is not there; sublimation earns its keep for caffeine or iodine. Chromatography would work, but it is the most laborious, solvent-consuming method in the laboratory and is reserved for mixtures recrystallisation cannot handle — a sledgehammer on a walnut. Choose the cheapest operation whose property difference actually fits the mixture.
:::
:::

::: exercise Derive the $n$-extraction formula {level=3}
Derive the expression $f_n = \left(V_\mathrm{aq}/(D\,V_\mathrm{org}/n + V_\mathrm{aq})\right)^n$ for the fraction of solute remaining in $V_\mathrm{aq}$ of water after $n$ extractions with fresh portions of $V_\mathrm{org}/n$, starting from the mass balance of a single extraction. Then prove that $f_n$ decreases as $n$ increases, and explain in one sentence why the result does not depend on how much solute you started with.
::: hint
Write the one-portion result as $f_1 = 1/(1 + D V_\mathrm{org}/V_\mathrm{aq})$ first; for the monotonicity, set $a = D V_\mathrm{org}/(n V_\mathrm{aq})$ and compare $(1+a)^{n}$ for successive $n$ with the binomial expansion or with the inequality between arithmetic and geometric means.
:::
::: solution
One portion of volume $V_\mathrm{org}/n$: mass balance $m_0 = m_\mathrm{aq} + m_\mathrm{org}$ with $D = (m_\mathrm{org}/(V_\mathrm{org}/n))/(m_\mathrm{aq}/V_\mathrm{aq})$ gives $m_\mathrm{org} = (D V_\mathrm{org}/(n V_\mathrm{aq})) m_\mathrm{aq}$, hence $f_1 = 1/(1 + D V_\mathrm{org}/(n V_\mathrm{aq}))$. Each fresh portion starts with no solute in the organic phase, so it multiplies what remains by the same factor, and $n$ portions give $f_n = (1 + D V_\mathrm{org}/(n V_\mathrm{aq}))^{-n}$. Write $a = D V_\mathrm{org}/(n V_\mathrm{aq})$: $(1+a)^n$ with $a \propto 1/n$ increases as $n$ grows (every term of the binomial expansion $1 + na + \tfrac{n(n-1)}{2}a^2 + \cdots$ increases in $n$ at fixed $D V_\mathrm{org}/V_\mathrm{aq}$), so its reciprocal $f_n$ decreases. The starting mass cancels because $D$ is an equilibrium constant — both concentrations scale together with the amount of solute — so the *fraction* extracted is fixed by $D$ and the volume ratio alone, as [[#def-distribution]] promises.
:::
:::

::: exercise Separate a three-component mixture {level=3}
A mixture of benzoic acid (an acid), a naphthalene-like neutral compound, and an amine-like base is dissolved in dichloromethane. Design a separation that recovers all three components, using only the dichloromethane solution, dilute aqueous hydrochloric acid, dilute aqueous sodium hydroxide, dilute aqueous sodium hydrogencarbonate, water, drying agent and solvent-removal steps. Give the reasoning — which species moves where, and why — for each extraction.
::: hint
Acidity is the property difference: each acid–base reaction converts a neutral organic into an ionic salt, and an ionic salt has $D \ll 1$ — it abandons the organic layer for the water. Plan which component you pull out first and how you get it back.
:::
::: solution
**Step 1 — remove the base.** Extract with dilute hydrochloric acid: the amine takes a proton and becomes an ammonium salt — ionic, water-soluble — so it moves into the aqueous layer while the acid and the neutral compound stay in the dichloromethane (the dense lower layer — drain it from the bottom, [[#warn-layer]]). Recover the amine by making this aqueous layer basic again with dilute sodium hydroxide (hydrogencarbonate is not strong enough to free the amine): the free amine returns, and is extracted into fresh dichloromethane, dried and concentrated. **Step 2 — remove the acid.** Extract the original organic layer with aqueous sodium hydrogencarbonate: benzoic acid ($\mathrm{p}K_\mathrm{a} \approx 4.2$) is stronger than carbonic acid, so it is deprotonated to the ionic, water-soluble benzoate and leaves; the neutral stays behind. Acidify this aqueous layer with dilute hydrochloric acid: benzoic acid, un-ionised and barely soluble in cold water, precipitates and is collected by Büchner filtration. **Step 3 — recover the neutral.** Dry the remaining dichloromethane layer over $\mathrm{MgSO_4}$ and evaporate the solvent; the neutral compound is what is left. Every move is the same trick: neutral species stay in the organic phase, ionic ones go into the water, and an acid–base reaction switches a species between the two states on demand. (All of it with dilute reagents, in the fume cupboard, under supervision — dichloromethane is harmful; see [[laboratory-methods/lab-safety]].)
:::
:::
